import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HttpClient } from '@angular/common/http';
import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  Autosave,
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersEssentials,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Underline,
  Undo,
  GeneralHtmlSupport
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import { EditorService } from '../../services/editor.service';
import { HttpClientService } from '../../../core/http/http-client.service';
import { FilesFoldersPlugin, GcsUploadAdapterPlugin, Base64ImagePlugin } from './plugins';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { FileSelectModalComponent } from '../file-select-modal/file-select-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, CKEditorModule, NzModalModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppEditorComponent),
      multi: true
    }
  ],
  template: `
    <div class="editor-wrapper">
      <ckeditor
        [editor]="Editor"
        [config]="config"
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)"
        (ready)="onReady($event)"
      ></ckeditor>
    </div>
  `,
  styles: [`
    .editor-wrapper {
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
    :host ::ng-deep .ck-editor__editable {
      min-height: 300px;
    }
  `]
})
export class AppEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  public Editor = ClassicEditor;
  public value: string = '';
  private subscription = new Subscription();

  @Input() placeholder: string = 'Nhập nội dung...';

  public config: any = {
    toolbar: [
      'sourceEditing', '|',
      'undo', 'redo', '|',
      'heading', '|',
      'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
      'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code', '|',
      'alignment', '|',
      'link', 'insertImage', 'insertBase64Image', 'mediaEmbed', 'filesFolders', 'insertTable', 'blockQuote', 'codeBlock', 'horizontalLine', 'specialCharacters', 'highlight', '|',
      'bulletedList', 'numberedList', 'outdent', 'indent'
    ],
    plugins: [
      AccessibilityHelp, Alignment, Autoformat, Autosave, BlockQuote, Bold, Code, CodeBlock, Essentials,
      FontBackgroundColor, FontColor, FontFamily, FontSize, Heading, Highlight, HorizontalLine,
      ImageBlock, ImageCaption, ImageInline, ImageInsert, ImageInsertViaUrl,
      ImageResize, ImageStyle, ImageTextAlternative, ImageToolbar, ImageUpload,
      Indent, IndentBlock, Italic, Link, List, MediaEmbed, Paragraph, PasteFromOffice,
      SelectAll, SourceEditing, SpecialCharacters, SpecialCharactersEssentials, Strikethrough, Subscript, Superscript,
      Table, TableCaption, TableCellProperties, 
      TableProperties, TableToolbar, TextTransformation, Underline, Undo,
      GeneralHtmlSupport,
      FilesFoldersPlugin, GcsUploadAdapterPlugin, Base64ImagePlugin
    ],
    htmlSupport: {
      allow: [
        {
          name: /.*/,
          attributes: true,
          classes: true,
          styles: true
        }
      ]
    },
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
      ]
    },
    image: {
      toolbar: [
        'toggleImageCaption', 'imageTextAlternative', '|',
        'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|',
        'resizeImage'
      ]
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    },
    placeholder: '',
    licenseKey: 'GPL',
    editorService: null as any, // Will be set in ngOnInit
    httpClient: null as any, // Will be set in ngOnInit
    httpClientService: null as any // Will be set in ngOnInit
  };

  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(
    private editorService: EditorService,
    private modalService: NzModalService,
    private http: HttpClient,
    private httpService: HttpClientService
  ) {}

  ngOnInit(): void {
    this.config.editorService = this.editorService;
    this.config.httpClient = this.http;
    this.config.httpClientService = this.httpService;
    this.config.placeholder = this.placeholder;

    this.subscription.add(
      this.editorService.modalRequest$.subscribe(request => {
        if (request.type === 'file-select') {
          const modal = this.modalService.create({
            nzTitle: 'Chọn File',
            nzContent: FileSelectModalComponent,
            nzWidth: 800,
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

  onReady(editor: any): void {
    // Customizations after ready if needed
  }

  onValueChange(val: string): void {
    // Basic XSS protection: remove <script> tags
    const sanitized = val ? val.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "") : "";
    this.value = sanitized;
    this.onChange(sanitized);
  }

  // ControlValueAccessor methods
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
    // Implement if needed
  }
}
