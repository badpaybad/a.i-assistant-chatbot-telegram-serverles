import { Injectable, inject } from '@angular/core';
import { HttpClientService } from '../../../core/http/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FilesFoldersService {
  private http = inject(HttpClientService);

  getFolderTree() {
    return this.http.get('/api/folders/tree');
  }

  getFolderContent(folderId: string | null, pageIndex: number = 1, pageSize: number = 10) {
    const baseUrl = folderId ? `/api/folders/${folderId}/content` : '/api/folders/root/content';
    const path = `${baseUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get(path);
  }

  createFolder(name: string, parentId: string | null) {
    return this.http.post('/api/folders', { name, parentId });
  }

  deleteFolder(folderId: string) {
    return this.http.delete(`/api/folders/${folderId}`);
  }

  moveFolder(folderId: string, newParentId: string | null) {
    return this.http.post('/api/folders/move', { folderId, newParentId });
  }

  uploadFile(folderId: string, file: File) {
    const formData = new FormData();
    formData.append('folderId', folderId);
    formData.append('file', file);
    return this.http.post('/api/files/upload', formData);
  }

  deleteFile(fileId: string) {
    return this.http.delete(`/api/files/${fileId}`);
  }

  moveFile(fileId: string, newFolderId: string) {
    return this.http.post('/api/files/move', { fileId, newFolderId });
  }

  setFilePermission(fileId: string, permission: number, shareCode?: string, expiredAt?: string) {
    return this.http.post('/api/files/permission', { fileId, permission, shareCode, expiredAt });
  }

  getShareUrl(fileId: string, durationHours: number = 24) {
    return this.http.get(`/api/files/${fileId}/share-url?durationHours=${durationHours}`);
  }

  getFileDetail(fileId: string) {
    return this.http.get(`/api/files/${fileId}`);
  }
}
