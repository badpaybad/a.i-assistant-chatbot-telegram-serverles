// This is an Angular TypeScript file (not C#).
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from '@tot/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhanDienKhuonMatService {
  private http = inject(HttpClientService);
  private rawHttp = inject(HttpClient);

  /**
   * Loads the static facefinder cascade classifier binary from assets
   */
  loadModel(): Observable<ArrayBuffer> {
    return this.rawHttp.get('/assets/models/facefinder', { responseType: 'arraybuffer' });
  }

  /**
   * Saves the original image and selected face crops to the server GCS and database.
   */
  saveSession(
    originalFile: File,
    croppedFaces: { blob: Blob; boundingBox: string }[],
    trackingId: string
  ): Promise<any> {
    const formData = new FormData();
    formData.append('originalFile', originalFile);

    croppedFaces.forEach((face, idx) => {
      // Wrap the cropped blob into a File object
      const faceFile = new File([face.blob], `face_${idx}.jpg`, { type: 'image/jpeg' });
      formData.append('croppedFiles', faceFile);
      formData.append('boundingBoxes', face.boundingBox);
    });

    return this.http.post('/api/face-detection/save', formData, { trackingId });
  }
}
