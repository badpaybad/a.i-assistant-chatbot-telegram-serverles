import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AuthManagementService } from '../services/auth-management.service';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { TotAutocompleteComponent, TotButtonComponent, TotTableComponent, TotTableColumn, TotCellDirective } from '@tot/shared';
import { ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-acl-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzSpaceModule,
    NzModalModule,
    NzSelectModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzCardModule,
    NzRadioModule,
    NzTagModule,
    NzDividerModule,
    TranslocoModule,
    TotAutocompleteComponent,
    TotButtonComponent,
    TotTableComponent,
    TotCellDirective
  ],
  template: `
    <div class="page-header">
      <h2>{{ 'Quản lý ACL' | transloco }}</h2>
      <nz-card class="filter-card">
        <div class="filter-box">
          <div class="filter-item">
            <span class="label">{{ 'Loại tài nguyên' | transloco }}:</span>
            <input nz-input [(ngModel)]="filter.resourceType" [placeholder]="'Ví dụ: order' | transloco" style="width: 150px" />
          </div>
          <div class="filter-item">
            <span class="label">{{ 'ID tài nguyên' | transloco }}:</span>
            <input nz-input [(ngModel)]="filter.resourceId" [placeholder]="'Ví dụ: 123 hoặc *' | transloco" style="width: 150px" />
          </div>
          <tot-button nzType="primary" (click)="loadAcl()">
            <span nz-icon nzType="search"></span> {{ 'Tìm kiếm...' | transloco }}
          </tot-button>
          <tot-button nzType="default" (click)="showCreateModal()">
            <span nz-icon nzType="plus"></span> {{ 'Thêm mới' | transloco }}
          </tot-button>
        </div>
      </nz-card>
    </div>

    <tot-table 
      [data]="aclEntries" 
      [columns]="aclColumns" 
      [loading]="loading" 
      [title]="'Danh sách ACL' | transloco" 
      [frontPagination]="false"
      [pageIndex]="pageIndex"
      [pageSize]="pageSize"
      [total]="totalAcl"
      [scroll]="{ x: '1000px' }"
      (queryParamsChange)="onQueryParamsChange($event)"
    >
      <ng-template totCell="subject" let-data>
        <div *ngIf="data.userId" class="subject-info">
          <span nz-icon nzType="user"></span>
          <span>{{ 'Người dùng' | transloco }}: <strong>{{ data.userId }}</strong></span>
        </div>
        <div *ngIf="data.roleId" class="subject-info">
          <span nz-icon nzType="team"></span>
          <span>{{ 'Vai trò' | transloco }}: <strong>{{ data.roleId }}</strong></span>
        </div>
      </ng-template>

      <ng-template totCell="resource" let-data>
        <nz-tag>{{ data.resourceType }}</nz-tag>
        <code>{{ data.resourceId }}</code>
      </ng-template>

      <ng-template totCell="mask" let-data>
        <div class="mask-display">
          <span class="mask-value">{{ data.permissionMask }}</span>
          <div class="mask-details">
            <nz-tag *ngIf="hasMask(data.permissionMask, 1)" nzColor="blue">{{ 'Đọc' | transloco }}</nz-tag>
            <nz-tag *ngIf="hasMask(data.permissionMask, 2)" nzColor="green">{{ 'Ghi' | transloco }}</nz-tag>
            <nz-tag *ngIf="hasMask(data.permissionMask, 4)" nzColor="red">{{ 'Xóa' | transloco }}</nz-tag>
            <nz-tag *ngIf="hasMask(data.permissionMask, 8)" nzColor="orange">{{ 'Chia sẻ' | transloco }}</nz-tag>
          </div>
        </div>
      </ng-template>

      <ng-template totCell="action" let-data>
        <tot-button nzType="primary" [nzDanger]="true" nzSize="small" (click)="deleteAcl(data.id)">{{ 'Xóa' | transloco }}</tot-button>
      </ng-template>
    </tot-table>

    <nz-modal [(nzVisible)]="isCreateModalVisible" [nzTitle]="'Thêm mới' | transloco" (nzOnCancel)="isCreateModalVisible = false" (nzOnOk)="createAcl()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'Loại đối tượng' | transloco }}</nz-form-label>
            <nz-form-control>
              <nz-radio-group [(ngModel)]="newEntry.subjectType" name="subjectType">
                <label nz-radio nzValue="user">{{ 'Người dùng' | transloco }}</label>
                <label nz-radio nzValue="role">{{ 'Vai trò' | transloco }}</label>
              </nz-radio-group>
            </nz-form-control>
          </nz-form-item>
          
          <nz-form-item *ngIf="newEntry.subjectType === 'user'">
            <nz-form-label [nzSpan]="null">{{ 'Người dùng' | transloco }}</nz-form-label>
            <nz-form-control>
              <tot-autocomplete
                apiUrl="/api/AuthManagement/users"
                [placeholder]="'Tìm kiếm...' | transloco"
                labelField="username"
                [(ngModel)]="newEntry.userId"
                name="userId"
              ></tot-autocomplete>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item *ngIf="newEntry.subjectType === 'role'">
            <nz-form-label [nzSpan]="null">{{ 'Vai trò' | transloco }}</nz-form-label>
            <nz-form-control>
              <tot-autocomplete
                apiUrl="/api/AuthManagement/roles"
                [placeholder]="'Tìm kiếm...' | transloco"
                [(ngModel)]="newEntry.roleId"
                name="roleId"
              ></tot-autocomplete>
            </nz-form-control>
          </nz-form-item>

          <nz-divider></nz-divider>

          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'Tài nguyên' | transloco }}</nz-form-label>
            <nz-form-control>
              <div style="display: flex; gap: 8px;">
                <input nz-input [(ngModel)]="newEntry.resourceType" name="resType" [placeholder]="'Loại' | transloco" style="width: 120px" />
                <input nz-input [(ngModel)]="newEntry.resourceId" name="resId" [placeholder]="'ID hoặc *' | transloco" style="flex: 1" />
              </div>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'Mức độ truy cập' | transloco }}</nz-form-label>
            <nz-form-control>
              <nz-checkbox-group [(ngModel)]="accessOptions" name="perms"></nz-checkbox-group>
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>
  `,
  styles: [`
    .page-header {
      margin-bottom: 24px;
    }
    .filter-card {
      margin-top: 16px;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
    }
    .filter-box {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .filter-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .label {
      font-weight: 500;
    }
    .subject-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .mask-display {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .mask-value {
      font-family: monospace;
      font-weight: bold;
      background: #f0f2f5;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .mask-details {
      display: flex;
      gap: 4px;
    }
  `]
})
export class AclListComponent implements OnInit {
  private authMgmt = inject(AuthManagementService);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);
  private translate = inject(TranslocoService);

  aclEntries: any[] = [];
  loading = false;
  
  pageIndex = 1;
  pageSize = 10;
  totalAcl = 0;
  
  filter = { resourceType: '', resourceId: '' };
  
  isCreateModalVisible = false;
  newEntry: any = { subjectType: 'user', userId: '', roleId: '', resourceType: '', resourceId: '', permissionMask: 0 };
  
  availableUsers: any[] = [];
  availableRoles: any[] = [];
  
  accessOptions = [
    { label: 'Read (1)', value: 1, checked: false },
    { label: 'Write (2)', value: 2, checked: false },
    { label: 'Delete (4)', value: 4, checked: false },
    { label: 'Share (8)', value: 8, checked: false }
  ];

  aclColumns: TotTableColumn[] = [];

  ngOnInit(): void {
    this.aclColumns = [
      { title: 'Đối tượng', key: 'subject' },
      { title: 'Tài nguyên', key: 'resource' },
      { title: 'Mặt nạ quyền', key: 'mask' },
      { title: 'Hành động', key: 'action', width: '120px', right: true }
    ];
    this.loadMetadata();
  }

  async loadMetadata() {
    try {
      const usersRes: any = await this.authMgmt.getUsers();
      this.availableUsers = usersRes.items || [];
      const rolesRes: any = await this.authMgmt.getRoles();
      this.availableRoles = rolesRes.items || [];
    } catch (e) {}
  }

  hasMask(mask: number, bit: number): boolean {
    return (mask & bit) === bit;
  }

  async loadAcl() {
    if (!this.filter.resourceType || !this.filter.resourceId) {
      this.message.warning(this.translate.translate('Vui lòng nhập đầy đủ thông tin'));
      return;
    }
    this.loading = true;
    try {
      const res: any = await this.authMgmt.getAcl(this.filter.resourceType, this.filter.resourceId, this.pageIndex, this.pageSize);
      this.aclEntries = res.items || [];
      this.totalAcl = res.total || 0;
    } catch (e) {
      this.message.error(this.translate.translate('Lỗi khi tải danh sách ACL'));
    } finally {
      this.loading = false;
    }
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex, pageSize } = params;
    if (this.pageIndex === pageIndex && this.pageSize === pageSize) {
      return;
    }
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    if (this.filter.resourceType && this.filter.resourceId) {
      this.loadAcl();
    }
  }

  showCreateModal() {
    this.newEntry = { subjectType: 'user', userId: '', roleId: '', resourceType: this.filter.resourceType, resourceId: this.filter.resourceId, permissionMask: 0 };
    this.accessOptions.forEach(o => {
      o.checked = false;
      o.label = this.translate.translate(o.label.split(' (')[0]) + ' (' + o.value + ')';
    });
    this.isCreateModalVisible = true;
  }

  async createAcl() {
    const mask = this.accessOptions.filter(o => o.checked).reduce((acc, curr) => acc + curr.value, 0);
    this.newEntry.permissionMask = mask;
    
    if (this.newEntry.subjectType === 'user' && !this.newEntry.userId) return;
    if (this.newEntry.subjectType === 'role' && !this.newEntry.roleId) return;
    
    const payload = {
      userId: this.newEntry.subjectType === 'user' ? this.newEntry.userId : null,
      roleId: this.newEntry.subjectType === 'role' ? this.newEntry.roleId : null,
      resourceType: this.newEntry.resourceType,
      resourceId: this.newEntry.resourceId,
      permissionMask: this.newEntry.permissionMask
    };

    try {
      this.authMgmt.addAcl(payload, (data: any) => {
        if (data.status === 'Completed') {
          this.message.success(data.message || this.translate.translate('Thêm ACL thành công'));
          this.isCreateModalVisible = false;
          if (this.filter.resourceType === payload.resourceType && this.filter.resourceId === payload.resourceId) {
            this.loadAcl();
          }
        } else if (data.status === 'Error') {
          this.message.error(data.message || this.translate.translate('Thêm ACL thất bại'));
        }
      });
    } catch (e) {
      this.message.error(this.translate.translate('Thêm ACL thất bại'));
    }
  }

  deleteAcl(id: string) {
    this.modal.confirm({
      nzTitle: `${this.translate.translate('Xác nhận')}?`,
      nzContent: `${this.translate.translate('Xóa')} ACL entry?`,
      nzOnOk: () => {
        this.authMgmt.removeAcl(id, (data: any) => {
          if (data.status === 'Completed') {
            this.message.success(data.message || this.translate.translate('Xóa ACL thành công'));
            this.loadAcl();
          } else if (data.status === 'Error') {
            this.message.error(data.message || this.translate.translate('Xóa ACL thất bại'));
          }
        });
      }
    });
  }
}
