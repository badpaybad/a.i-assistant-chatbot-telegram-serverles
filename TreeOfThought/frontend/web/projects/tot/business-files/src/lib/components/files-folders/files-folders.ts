import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FolderTreeComponent } from '../folder-tree/folder-tree';
import { FileExplorerComponent } from '../file-explorer/file-explorer';
import { ComponentRegistryService, REGISTRY_KEYS } from '@tot/core';

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

  constructor(private registry: ComponentRegistryService) {
    // Component is registered eagerly via provideBusinessFiles() in app.config.ts
  }

  selectedFolderId: string | null = null;
  isTreeCollapsed = false;

  onFolderSelected(folderId: string | null): void {
    this.selectedFolderId = folderId;
  }

  onFolderCreated(): void {
    if (this.folderTree) this.folderTree.loadTree();
    if (this.fileExplorer) this.fileExplorer.loadContent();
  }

  onToggleTree(): void {
    this.isTreeCollapsed = !this.isTreeCollapsed;
  }
}
