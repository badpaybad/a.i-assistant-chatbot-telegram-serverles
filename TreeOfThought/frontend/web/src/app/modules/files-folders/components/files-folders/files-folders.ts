import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FolderTreeComponent } from '../folder-tree/folder-tree';
import { FileExplorerComponent } from '../file-explorer/file-explorer';
import { ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-files-folders',
  standalone: true,
  imports: [
    NzLayoutModule,
    FolderTreeComponent,
    FileExplorerComponent
  ],
  templateUrl: './files-folders.html',
  styleUrl: './files-folders.css',
})
export class FilesFolders {
  @ViewChild(FolderTreeComponent) folderTree!: FolderTreeComponent;
  @ViewChild(FileExplorerComponent) fileExplorer!: FileExplorerComponent;
  
  @Input() selectionMode = false;
  @Output() fileSelected = new EventEmitter<any>();

  selectedFolderId: string | null = null;

  onFolderSelected(folderId: string | null): void {
    this.selectedFolderId = folderId;
  }

  onFolderCreated(): void {
    if (this.folderTree) this.folderTree.loadTree();
    if (this.fileExplorer) this.fileExplorer.loadContent();
  }
}
