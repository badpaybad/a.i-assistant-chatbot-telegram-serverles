import { Component, EventEmitter, OnInit, Output, ViewChild, inject, OnDestroy } from '@angular/core';
import { FilesFoldersService } from '../../services/files-folders.service';
import { NzFormatEmitEvent, NzTreeNodeOptions, NzTreeModule, NzTreeNode, NzTreeComponent } from 'ng-zorro-antd/tree';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule, NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateFolderPopoverComponent } from '../create-folder-popover/create-folder-popover.component';
import { Subscription } from 'rxjs';
import { RenamePopoverComponent } from '../rename-popover/rename-popover.component';

@Component({
  selector: 'app-folder-tree',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTreeModule,
    NzModalModule,
    NzInputModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    NzTooltipModule,
    NzPopoverModule,
    CreateFolderPopoverComponent,
    RenamePopoverComponent
  ],
  templateUrl: './folder-tree.html',
  styleUrl: './folder-tree.css',
})
export class FolderTreeComponent implements OnInit, OnDestroy {
  @Output() folderSelected = new EventEmitter<string | null>();
  @Output() folderCreated = new EventEmitter<void>();
  @ViewChild('treeComponent', { static: false }) treeComponent!: NzTreeComponent;
  @ViewChild(CreateFolderPopoverComponent) createPopover!: CreateFolderPopoverComponent;

  private filesFoldersService = inject(FilesFoldersService);
  private nzContextMenuService = inject(NzContextMenuService);
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);

  nodes: NzTreeNodeOptions[] = [
    {
      title: 'Tài liệu của tôi',
      key: 'root',
      expanded: true,
      selected: true,
      icon: 'folder-open',
      children: []
    }
  ];

  selectedNodeKey: string = 'root';
  createPopoverVisible = false;
  newFolderName = '';
  creating = false;
  contextNode: NzTreeNode | null = null;

  // Rename properties
  renamingNode: NzTreeNode | null = null;
  renamePopoverVisibleId: string | null = null;

  private refreshSub?: Subscription;
  private selectFolderSub?: Subscription;

  get currentFolderName(): string {
    if (this.contextNode) return this.contextNode.title;
    const selectedNode = this.treeComponent?.getSelectedNodeList()[0];
    return selectedNode ? selectedNode.title : 'Tài liệu của tôi';
  }

  get selectedParentId(): string | null {
    if (this.contextNode) return this.contextNode.key === 'root' ? null : this.contextNode.key;
    const selectedNode = this.treeComponent?.getSelectedNodeList()[0];
    if (!selectedNode) return null;
    return selectedNode.key === 'root' ? null : selectedNode.key;
  }

  ngOnInit(): void {
    this.loadTree();
    this.refreshSub = this.filesFoldersService.refresh$.subscribe(() => {
      this.loadTree();
    });

    this.selectFolderSub = this.filesFoldersService.selectFolder$.subscribe((folderId) => {
      this.selectAndExpandFolder(folderId);
    });

    // Default selection
    setTimeout(() => {
      this.folderSelected.emit(null);
    }, 0);
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
    this.selectFolderSub?.unsubscribe();
  }

  async loadTree(): Promise<void> {
    try {
      const folders: any = await this.filesFoldersService.getFolderTree();
      this.nodes[0].children = this.mapFoldersToNodes(folders);
      this.nodes[0].selected = this.selectedNodeKey === 'root';
      this.nodes = [...this.nodes];
    } catch (error) {
      console.error('Failed to load folder tree', error);
    }
  }

  private mapFoldersToNodes(folders: any[]): NzTreeNodeOptions[] {
    return folders.map(f => ({
      title: f.name,
      key: f.id,
      isLeaf: !f.children || f.children.length === 0,
      selected: this.selectedNodeKey === f.id,
      children: f.children ? this.mapFoldersToNodes(f.children) : []
    }));
  }

  onEvent(event: NzFormatEmitEvent): void {
    if (event.eventName === 'click') {
      const node = event.node;
      if (node) {
        this.selectedNodeKey = node.key;
        this.folderSelected.emit(node.key === 'root' ? null : node.key);
      }
    }
  }

  onContextMenu(event: NzFormatEmitEvent, menu: NzDropdownMenuComponent): void {
    this.contextNode = event.node || null;
    this.nzContextMenuService.create(event.event as MouseEvent, menu);
  }

  openCreatePopoverFromContext(): void {
    if (this.contextNode) {
      this.selectedNodeKey = this.contextNode.key;
      this.folderSelected.emit(this.selectedNodeKey === 'root' ? null : this.selectedNodeKey);
      this.createPopover.open();
    }
  }

  deleteFolder(node: NzTreeNode): void {
    if (node.key === 'root') return;

    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: `Bạn có chắc chắn muốn xóa thư mục "${node.title}" và toàn bộ nội dung bên trong?`,
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.filesFoldersService.deleteFolder(node.key);
          this.message.success('Đã gửi yêu cầu xóa thư mục');
          this.filesFoldersService.notifyRefresh();
        } catch (error) {
          this.message.error('Lỗi khi xóa thư mục');
        }
      }
    });
  }

  renameFolder(node: NzTreeNode): void {
    if (node.key === 'root') return;
    this.renamingNode = node;
    this.renamePopoverVisibleId = node.key;
  }

  onRenamed(trackingId: string): void {
    this.renamePopoverVisibleId = null;
    if (trackingId) {
      this.filesFoldersService.notifyRefresh();
    }
  }

  onRenameCancelled(): void {
    this.renamePopoverVisibleId = null;
    this.renamingNode = null;
  }

  private selectAndExpandFolder(folderId: string | null): void {
    const key = folderId || 'root';
    this.selectedNodeKey = key;
    
    // Find node in tree
    const node = this.treeComponent.getTreeNodeByKey(key);
    if (node) {
      // Select the node
      node.isSelected = true;
      this.selectedNodeKey = key;
      
      // Expand all parents
      let parent = node.getParentNode();
      while (parent) {
        parent.isExpanded = true;
        parent = parent.getParentNode();
      }

      // Notify parent/Explorer
      this.folderSelected.emit(folderId);
    } else {
      // If node not found (might not be loaded if tree is lazy?)
      // But our tree is not lazy, we load the whole tree in loadTree().
      // However, loadTree might still be in progress.
      console.warn('Folder node not found:', key);
    }
  }
}
