import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface EditorModalRequest {
  id: string;
  type: 'file-select';
  resolve: (data: any) => void;
  reject: (reason?: any) => void;
}

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private modalRequestSubject = new Subject<EditorModalRequest>();
  modalRequest$ = this.modalRequestSubject.asObservable();

  requestModal(type: 'file-select'): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modalRequestSubject.next({
        id: Math.random().toString(36).substring(7),
        type,
        resolve,
        reject
      });
    });
  }
}
