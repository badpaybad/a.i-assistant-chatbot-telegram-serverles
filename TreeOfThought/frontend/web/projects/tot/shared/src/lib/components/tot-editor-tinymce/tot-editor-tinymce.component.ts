import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { EditorService } from '../../services/editor.service';
import { HttpClientService } from '@tot/core';
import { TotFileSelectModalComponent } from '../tot-file-select-modal/tot-file-select-modal.component';

@Component({
  selector: 'tot-editor-tinymce',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorComponent, NzModalModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TotEditorTinymceComponent),
      multi: true
    },
    {
      provide: TINYMCE_SCRIPT_SRC,
      useValue: 'tinymce/tinymce.min.js'
    }
  ],
  template: `
    <div class="editor-wrapper">
      <editor
        [init]="initConfig"
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)"
      ></editor>
    </div>
  `,
  styles: [`
    .editor-wrapper {
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
    :host ::ng-deep .tox-tinymce {
      border: none !important;
      min-height: 300px;
    }
  `]
})
export class TotEditorTinymceComponent implements OnInit, OnDestroy, ControlValueAccessor {
  public value: string = '';
  public initConfig: any = {};
  
  private subscription = new Subscription();

  @Input() placeholder: string = 'Nhập nội dung...';

  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(
    private editorService: EditorService,
    private modalService: NzModalService,
    private httpService: HttpClientService
  ) {
    this.setupConfig();
  }

  private setupConfig(): void {
    // Resolve dynamic base_url according to app's baseHref
    const baseHref = document.getElementsByTagName('base')[0]?.getAttribute('href') || '/';
    const tinymceBaseUrl = `${baseHref}tinymce`.replace(/\/+/g, '/');

    this.initConfig = {
      base_url: tinymceBaseUrl,
      suffix: '.min',
      height: 400,
      menubar: false,
      placeholder: this.placeholder,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'wordcount'
      ],
      toolbar: [
        'undo redo | blocks | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | ' +
        'link image insertBase64Image filesfolders media table | bullist numlist outdent indent | code fullscreen'
      ].join(' '),
      license_key: 'gpl',
      images_upload_handler: (blobInfo: any, progress: (percent: number) => void): Promise<string> => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('upload', blobInfo.blob(), blobInfo.filename());

          this.httpService.postObservable<any>('/api/Files/editor-upload', formData, {
            reportProgress: true,
            observe: 'events'
          }).subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                const percent = Math.round((event.loaded / (event.total || 1)) * 100);
                progress(percent);
              } else if (event.type === HttpEventType.Response) {
                if (event.body && event.body.url) {
                  resolve(event.body.url);
                } else {
                  reject('Không nhận được URL từ phản hồi tải lên.');
                }
              }
            },
            error: (err: any) => {
              reject(err.message || 'Tải ảnh lên thất bại.');
            }
          });
        });
      },
      setup: (editor: any) => {
        // Register filesfolders plugin button
        editor.ui.registry.addButton('filesfolders', {
          icon: 'gallery',
          tooltip: 'Chèn từ Files-Folders',
          onAction: () => {
            this.editorService.requestModal('file-select').then((files: any | any[]) => {
              if (!files) return;
              const filesToInsert = Array.isArray(files) ? files : [files];

              filesToInsert.forEach(file => {
                if (file.mimeType.startsWith('image/')) {
                  editor.insertContent(`<img src="${file.url}" alt="${file.name}" style="max-width: 100%;" />`);
                } else {
                  editor.insertContent(`<a href="${file.url}" target="_blank">${file.name}</a>`);
                }
              });
            }).catch(() => {});
          }
        });

        // Register insertBase64Image custom button
        editor.ui.registry.addButton('insertBase64Image', {
          icon: 'image',
          tooltip: 'Chèn ảnh Base64',
          onAction: () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.multiple = true;
            input.onchange = (e: any) => {
              const files = Array.from(e.target.files) as File[];
              files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (readerEvent: any) => {
                  const base64 = readerEvent.target.result;
                  editor.insertContent(`<img src="${base64}" style="max-width: 100%;" />`);
                };
                reader.readAsDataURL(file);
              });
            };
            input.click();
          }
        });
      }
    };
  }

  ngOnInit(): void {
    // Dynamic placeholder update in case config changes
    if (this.initConfig) {
      this.initConfig.placeholder = this.placeholder;
    }

    this.subscription.add(
      this.editorService.modalRequest$.subscribe(request => {
        if (request.type === 'file-select') {
          const modal = this.modalService.create({
            nzTitle: 'Chọn File',
            nzContent: TotFileSelectModalComponent,
            nzWidth: 1000,
            nzFooter: null
          });

          modal.afterClose.subscribe(result => {
            if (result) {
              request.resolve(result);
            } else {
              request.reject();
            }
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onValueChange(val: string): void {
    const sanitized = val ? val.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "") : "";
    this.value = sanitized;
    this.onChange(sanitized);
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optionally handle disabled state
  }
}
