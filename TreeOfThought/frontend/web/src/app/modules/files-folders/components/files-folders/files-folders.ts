import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FolderTreeComponent } from '../folder-tree/folder-tree';
import { FileExplorerComponent } from '../file-explorer/file-explorer';

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
  selectedFolderId: string | null = null;

  onFolderSelected(folderId: string | null): void {
    this.selectedFolderId = folderId;
  }
}
