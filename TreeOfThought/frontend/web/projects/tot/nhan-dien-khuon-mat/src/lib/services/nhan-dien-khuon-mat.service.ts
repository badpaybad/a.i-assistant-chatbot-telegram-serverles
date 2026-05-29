import { Injectable, inject } from '@angular/core';
import { HttpClientService } from '@tot/core';

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
}
