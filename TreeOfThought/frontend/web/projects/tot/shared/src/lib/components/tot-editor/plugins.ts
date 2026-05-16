import { Plugin, ButtonView } from 'ckeditor5';
import { EditorService } from '../../services/editor.service';
import { HttpClientService } from '@tot/core';
import { HttpEventType } from '@angular/common/http';

/**
 * Plugin to insert files/folders from the management module
 */
export class FilesFoldersPlugin extends Plugin {
  static get pluginName() {
    return 'FilesFolders';
  }

  init() {
    const editor = this.editor;
    const editorService = (editor.config.get('editorService') as EditorService);

    editor.ui.componentFactory.add('filesFolders', (locale) => {
      const button = new ButtonView(locale);

      button.set({
        label: 'Chèn từ Files',
        icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.414L14.586 4H10V2H4zm0 2h4v2h2V4h3.586L16 6.414V16H4V4zm6 6v2h2v-2h-2zm-3 0v2h2v-2H7zm6 3v2h2v-2h-2zm-3 0v2h2v-2h-2zm-3 0v2h2v-2H7z"/></svg>',
        tooltip: true
      });

      button.on('execute', () => {
        editorService.requestModal('file-select').then((files: any | any[]) => {
          if (!files) return;
          const filesToInsert = Array.isArray(files) ? files : [files];

          editor.model.change((writer) => {
            filesToInsert.forEach(file => {
              if (file.mimeType.startsWith('image/')) {
                editor.model.insertContent(
                  writer.createElement('imageBlock', {
                    src: file.url,
                    alt: file.name
                  }),
                  editor.model.document.selection.getFirstPosition()!
                );
              } else {
                const link = writer.createText(file.name, { linkHref: file.url });
                editor.model.insertContent(link, editor.model.document.selection.getFirstPosition()!);
              }
            });
          });
        });
      });

      return button;
    });
  }
}

/**
 * Plugin to insert local images as Base64
 */
export class Base64ImagePlugin extends Plugin {
  static get pluginName() {
    return 'Base64Image';
  }

  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add('insertBase64Image', (locale) => {
      const button = new ButtonView(locale);

      button.set({
        label: 'Chèn ảnh Base64',
        icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 9.2a1 1 0 1 0 0 2h1.8a1 1 0 1 0 0-2H11zm0-3.2a1 1 0 1 0 0 2h4.8a1 1 0 1 0 0-2H11zM2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 15.5v-11zM4.5 4a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-11zM11 12.4a1 1 0 1 0 0 2h4.8a1 1 0 1 0 0-2H11zM4.8 11.2l2.4-2.4 2.4 2.4-2.4 2.4-2.4-2.4z"/></svg>',
        tooltip: true
      });

      button.on('execute', () => {
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
              editor.model.change(writer => {
                const imageElement = writer.createElement('imageBlock', {
                  src: base64
                });
                editor.model.insertContent(imageElement, editor.model.document.selection.getFirstPosition()!);
              });
            };
            reader.readAsDataURL(file);
          });
        };
        input.click();
      });

      return button;
    });
  }
}

/**
 * Custom Upload Adapter for Google Cloud Storage using HttpClientService
 */
export class GcsUploadAdapter {
  loader: any;
  httpService: HttpClientService;
  private subscription: any;

  constructor(loader: any, httpService: HttpClientService) {
    this.loader = loader;
    this.httpService = httpService;
  }

  async upload() {
    const file = await this.loader.file;
    const formData = new FormData();
    formData.append('upload', file);

    return new Promise((resolve, reject) => {
      this.subscription = this.httpService.postObservable<any>('/api/Files/editor-upload', formData, {
        reportProgress: true,
        observe: 'events'
      }).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.loader.uploadTotal = event.total || 0;
            this.loader.uploaded = event.loaded;
          } else if (event.type === HttpEventType.Response) {
            resolve({
              default: event.body.url
            });
          }
        },
        error: (err: any) => {
          reject(err.message || `Couldn't upload file: ${file.name}.`);
        }
      });
    });
  }

  abort() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

export function GcsUploadAdapterPlugin(editor: any) {
  const httpService = editor.config.get('httpClientService');
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new GcsUploadAdapter(loader, httpService);
  };
}
