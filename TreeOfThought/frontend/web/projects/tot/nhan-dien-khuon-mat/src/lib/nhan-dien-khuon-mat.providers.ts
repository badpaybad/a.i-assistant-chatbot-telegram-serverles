import { Provider } from '@angular/core';
import { NhanDienKhuonMatService } from './services/nhan-dien-khuon-mat.service';

export function provideNhanDienKhuonMat(): Provider[] {
  return [
    NhanDienKhuonMatService
  ];
}
