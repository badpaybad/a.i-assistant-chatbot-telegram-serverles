import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClientService } from '@tot/core';

@Injectable({
  providedIn: 'root'
})
export class FilesFoldersService {
  private http = inject(HttpClientService);
  private refreshSubject = new Subject<void>();
  private selectFolderSubject = new Subject<string | null>();

  refresh$ = this.refreshSubject.asObservable();
  selectFolder$ = this.selectFolderSubject.asObservable();

  notifyRefresh(delayMs: number = 0) {
    if (delayMs > 0) {
      setTimeout(() => this.refreshSubject.next(), delayMs);
    } else {
      this.refreshSubject.next();
    }
  }

  notifySelectFolder(folderId: string | null) {
    this.selectFolderSubject.next(folderId);
  }

  getFolderTree() {
    return this.http.get('/api/folders/tree');
  }

  getFolderContent(folderId: string | null, pageIndex: number = 1, pageSize: number = 10) {
    const baseUrl = folderId ? `/api/folders/${folderId}/content` : '/api/folders/root/content';
    const path = `${baseUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get(path);
  }

  createFolder(name: string, parentId: string | null, callback?: (data: any) => void) {
    return this.http.post('/api/folders', { name, parentId }, callback);
  }
 
  deleteFolder(folderId: string, callback?: (data: any) => void) {
    return this.http.delete(`/api/folders/${folderId}`, callback);
  }
 
  moveFolder(folderId: string, newParentId: string | null, callback?: (data: any) => void) {
    return this.http.post('/api/folders/move', { folderId, newParentId }, callback);
  }
 
  renameFolder(folderId: string, newName: string, callback?: (data: any) => void) {
    return this.http.patch(`/api/folders/${folderId}/rename`, { newName }, callback);
  }
 
  uploadFile(folderId: string | null, file: File, callback?: (data: any) => void) {
    const formData = new FormData();
    if (folderId) {
      formData.append('folderId', folderId);
    }
    formData.append('file', file);
    return this.http.post('/api/files/upload', formData, callback);
  }
 
  deleteFile(fileId: string, callback?: (data: any) => void) {
    return this.http.delete(`/api/files/${fileId}`, callback);
  }
 
  moveFile(fileId: string, newFolderId: string, callback?: (data: any) => void) {
    return this.http.post('/api/files/move', { fileId, newFolderId }, callback);
  }
 
  renameFile(fileId: string, newName: string, callback?: (data: any) => void) {
    return this.http.patch(`/api/files/${fileId}/rename`, { newName }, callback);
  }
 
  setFilePermission(fileId: string, permission: number, shareCode?: string, expiredAt?: string, callback?: (data: any) => void) {
    return this.http.post('/api/files/permission', { fileId, permission, shareCode, expiredAt }, callback);
  }

  getShareUrl(fileId: string, durationHours: number = 24) {
    return this.http.get(`/api/files/${fileId}/share-url?durationHours=${durationHours}`);
  }

  getFileDetail(fileId: string) {
    return this.http.get(`/api/files/${fileId}`);
  }

  searchFiles(query: string) {
    return this.http.get(`/api/files/search?query=${query}`);
  }
}
