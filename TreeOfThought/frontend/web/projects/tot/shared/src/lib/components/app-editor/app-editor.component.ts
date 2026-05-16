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

// @ts-ignore
import MathType from '@wiris/mathtype-ckeditor5/dist/index.js'; // Math & Chem plugins v2
// import Math from 'ckeditor5-math/src/math';
// import AutoMath from 'ckeditor5-math/src/automath';

import { EditorService } from '../../services/editor.service';
import { HttpClientService } from '@tot/core';
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
      'MathType', 'ChemType', /*'math',*/ '|',
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
      MathType,
      // Math, AutoMath,
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
    editorService: null as any,
    httpClient: null as any,
    httpClientService: null as any
  };

  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(
    private editorService: EditorService,
    private modalService: NzModalService,
    private http: HttpClient,
    private httpService: HttpClientService
  ) {
    this.loadMathJax();
  }

  private loadMathJax() {
    if (!(window as any).MathJax) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }

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

  onReady(editor: any): void {
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
  }
}
