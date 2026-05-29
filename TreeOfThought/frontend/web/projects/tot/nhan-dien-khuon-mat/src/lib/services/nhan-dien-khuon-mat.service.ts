import { Injectable, inject } from '@angular/core';
import { HttpClientService } from '@tot/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhanDienKhuonMatService {
  private http = inject(HttpClientService);

  saveSession(sessionId: string, sessionName: string, originalFile: File, croppedFiles: File[], boundingBoxes: string[], callback?: (data: any) => void) {
    const formData = new FormData();
    formData.append('sessionId', sessionId);
    formData.append('sessionName', sessionName);
    formData.append('originalFile', originalFile);

    croppedFiles.forEach(file => {
      formData.append('croppedFiles', file);
    });

    boundingBoxes.forEach(bbox => {
      formData.append('boundingBoxes', bbox);
    });

    return this.http.post('/api/face-detection/save', formData, callback);
  }

  getSessions(pageIndex: number = 1, pageSize: number = 10) {
    return this.http.get(`/api/face-detection/sessions?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getSessionDetails(sessionId: string) {
    return this.http.get(`/api/face-detection/sessions/${sessionId}`);
  }

  renameSession(sessionId: string, newName: string) {
    return this.http.put(`/api/face-detection/sessions/${sessionId}/rename`, { newName });
  }

  deleteSession(sessionId: string) {
    return this.http.delete(`/api/face-detection/sessions/${sessionId}`);
  }

  deleteOriginalImage(imageId: string) {
    return this.http.delete(`/api/face-detection/images/${imageId}`);
  }

  deleteCroppedFace(faceId: string) {
    return this.http.delete(`/api/face-detection/faces/${faceId}`);
  }

  getUsers(keyword: string) {
    return this.http.get(`/api/face-detection/users?keyword=${keyword}`);
  }

  addFaceDefinition(userId: string, originalImageId: string, force: boolean = false) {
    return this.http.post('/api/face-detection/definitions', { userId, originalImageId, force });
  }

  getUserDefinitions(userId: string) {
    return this.http.get(`/api/face-detection/users/${userId}/definitions`);
  }

  deleteFaceDefinition(definitionId: string) {
    return this.http.delete(`/api/face-detection/definitions/${definitionId}`);
  }

  // === TRAINING METHODS ===

  getUsersWithDefinitions() {
    return this.http.get('/api/face-detection/users-with-definitions');
  }

  getTrainingFolders() {
    return this.http.get('/api/face-detection/training-folders');
  }

  extractEmbeddings(folderName: string) {
    return this.http.post(`/api/face-detection/training-folders/${encodeURIComponent(folderName)}/extract-embeddings`);
  }

  /**
   * Tạo một EventSource SSE để stream log đào tạo từ server về trình duyệt.
   * Caller chịu trách nhiệm đóng EventSource khi không dùng nữa.
   */
  streamTraining(userIds: string[]): EventSource {
    const baseUrl = (window as any).env?.API_BASE_URL ?? '';
    const token = localStorage.getItem('jwt_token') ?? '';
    const idsParam = encodeURIComponent(userIds.join(','));
    // EventSource không hỗ trợ custom headers → truyền token qua query param
    // Backend nên được cấu hình để chấp nhận Bearer token từ query param cho SSE
    const url = `${baseUrl}/api/face-detection/train/stream?userIds=${idsParam}&access_token=${token}`;
    return new EventSource(url);
  }

  // === EMBEDDINGS MANAGEMENT METHODS ===

  getEmbeddings() {
    return this.http.get('/api/face-detection/embeddings');
  }

  deleteEmbedding(id: string) {
    return this.http.delete(`/api/face-detection/embeddings/${id}`);
  }

  deleteUserEmbeddings(userId: string) {
    return this.http.delete(`/api/face-detection/embeddings/user/${userId}`);
  }

  compareEmbedding(id: string, file: File, threshold?: number) {
    const formData = new FormData();
    formData.append('image', file);
    const query = threshold !== undefined && threshold !== null ? `?threshold=${threshold}` : '';
    return this.http.post(`/api/face-detection/embeddings/${id}/compare${query}`, formData);
  }

  compareGlobal(file: File, threshold?: number) {
    const formData = new FormData();
    formData.append('image', file);
    const query = threshold !== undefined && threshold !== null ? `?threshold=${threshold}` : '';
    return this.http.post(`/api/face-detection/compare-global${query}`, formData);
  }

  compareGlobalStream(file: File, threshold: number, eyeLeftX: number, eyeLeftY: number, eyeRightX: number, eyeRightY: number, padX: number, padY: number, clientScale: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('eyeLeftX', eyeLeftX.toString());
    formData.append('eyeLeftY', eyeLeftY.toString());
    formData.append('eyeRightX', eyeRightX.toString());
    formData.append('eyeRightY', eyeRightY.toString());
    formData.append('padX', padX.toString());
    formData.append('padY', padY.toString());
    formData.append('clientScale', clientScale.toString());

    const baseUrl = (window as any).env?.API_BASE_URL ?? '';
    const token = localStorage.getItem('jwt_token') ?? '';
    const url = `${baseUrl}/api/face-detection/compare-global-stream?threshold=${threshold}`;

    return new Observable<any>(observer => {
      const controller = new AbortController();

      fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
        signal: controller.signal
      }).then(async response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('ReadableStream not supported.');
        }

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('data:')) {
              const dataContent = trimmed.substring(5).trim();
              try {
                const parsed = JSON.parse(dataContent);
                observer.next(parsed);
              } catch (e) {
                observer.next({ status: 'raw', raw: dataContent });
              }
            }
          }
        }
        observer.complete();
      }).catch(err => {
        if (err.name !== 'AbortError') {
          observer.error(err);
        }
      });

      return () => {
        controller.abort();
      };
    });
  }

  reloadCache() {
    return this.http.post('/api/face-detection/reload-cache', {});
  }
}

