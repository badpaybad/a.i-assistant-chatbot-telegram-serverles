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
}
