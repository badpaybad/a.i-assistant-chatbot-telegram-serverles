import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { AuthManagementService } from '../services/auth-management.service';
import { ALL_CLAIMS, CLAIMS_VERSION } from '@tot/core';
import { TotAutocompleteComponent, TotButtonComponent, TotTableComponent, TotTableColumn, TotCellDirective } from '@tot/shared';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzSpaceModule,
    NzModalModule,
    NzSelectModule,
    NzInputModule,
    NzDatePickerModule,
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzCheckboxModule,
    NzAvatarModule,
    TotAutocompleteComponent,
    TotButtonComponent,
    TotTableComponent,
    TotCellDirective,
    TranslocoModule
  ],
  template: `
    <div class="page-header">
      <nz-space>
        <tot-button *nzSpaceItem [loading]="syncingClaims" nzType="default" (click)="syncClaims()">
          <span nz-icon nzType="sync"></span> {{ 'Sync Claims (BE)' | transloco }}
        </tot-button>
      </nz-space>
    </div>

    <ng-template #userExtraTpl>
      <nz-space>
        <tot-button *nzSpaceItem nzType="primary" (click)="showCreateModal()">
          <span nz-icon nzType="plus"></span> {{ 'Thêm người dùng' | transloco }}
        </tot-button>
        <tot-button *nzSpaceItem [loading]="loading" (click)="loadUsers()">
          <span nz-icon nzType="reload"></span> {{ 'Đồng bộ' | transloco }}
        </tot-button>
      </nz-space>
    </ng-template>

    <nz-card class="search-card" [nzTitle]="'Tìm kiếm' | transloco">
      <div nz-row [nzGutter]="[16, 16]">
        <div nz-col [nzSpan]="6">
          <nz-input-group [nzSuffix]="suffixIconSearch">
            <input type="text" nz-input [(ngModel)]="searchQuery.keyword" [placeholder]="'Username, DisplayName, Email' | transloco" (keyup.enter)="search()" />
          </nz-input-group>
          <ng-template #suffixIconSearch>
            <span nz-icon nzType="search"></span>
          </ng-template>
        </div>
        <div nz-col [nzSpan]="6">
          <nz-select [(ngModel)]="searchQuery.isEmailVerified" [nzPlaceHolder]="'Trạng thái' | transloco" nzAllowClear style="width: 100%">
            <nz-option [nzValue]="true" [nzLabel]="'Đã xác minh' | transloco"></nz-option>
            <nz-option [nzValue]="false" [nzLabel]="'Đang chờ' | transloco"></nz-option>
          </nz-select>
        </div>
        <div nz-col [nzSpan]="6">
          <tot-autocomplete
            apiUrl="/api/AuthManagement/roles"
            [placeholder]="'Vai trò' | transloco"
            mode="multiple"
            [(ngModel)]="searchQuery.roleIds"
            (valueChange)="search()"
          ></tot-autocomplete>
        </div>
        <div nz-col [nzSpan]="6">
          <tot-autocomplete
            apiUrl="/api/AuthManagement/claims"
            [placeholder]="'Quyền' | transloco"
            mode="multiple"
            [(ngModel)]="searchQuery.claimIds"
            (valueChange)="search()"
          ></tot-autocomplete>
        </div>
        <div nz-col [nzSpan]="8">
          <nz-range-picker [(ngModel)]="searchQuery.dateRange" style="width: 100%"></nz-range-picker>
        </div>
        <div nz-col [nzSpan]="4">
          <nz-select [(ngModel)]="searchQuery.ssoProvider" [nzPlaceHolder]="'SSO Provider' | transloco" nzAllowClear style="width: 100%">
            <nz-option nzValue="google" nzLabel="Google"></nz-option>
            <nz-option nzValue="ms" nzLabel="Microsoft"></nz-option>
            <nz-option nzValue="facebook" nzLabel="Facebook"></nz-option>
          </nz-select>
        </div>
        <div nz-col [nzSpan]="4">
          <input nz-input [(ngModel)]="searchQuery.ssoId" [placeholder]="'SSO ID' | transloco" (keyup.enter)="search()" />
        </div>
        <div nz-col [nzSpan]="8" class="search-actions">
          <nz-space>
            <tot-button *nzSpaceItem nzType="primary" (click)="search()">{{ 'Tìm kiếm' | transloco }}</tot-button>
            <tot-button *nzSpaceItem (click)="resetSearch()">{{ 'Đặt lại' | transloco }}</tot-button>
          </nz-space>
        </div>
      </div>
    </nz-card>

    <tot-table 
      [data]="users" 
      [columns]="userColumns" 
      [loading]="loading" 
      [title]="'Danh sách người dùng' | transloco"
      [extra]="userExtraTpl"
      [frontPagination]="false"
      [pageIndex]="pageIndex"
      [pageSize]="pageSize"
      [total]="totalUsers"
      [scroll]="{ x: '1300px' }"
      (pageIndexChange)="pageIndex = $event; loadUsers()"
      (pageSizeChange)="pageSize = $event; pageIndex = 1; loadUsers()"
    >
      <ng-template totCell="avatar" let-data>
        <div class="avatar-wrapper" (click)="selectedUserForAvatar = data; avatarInput.click()">
          <nz-avatar [nzSrc]="data.avatarUrl" nzIcon="user" [nzSize]="48" class="user-avatar"></nz-avatar>
          <div class="avatar-mask">
            <span nz-icon nzType="camera"></span>
          </div>
        </div>
      </ng-template>

      <ng-template totCell="user" let-data>
        <div class="user-cell">
          <strong>{{ data.displayName }}</strong>
          <span class="sub-text">{{ data.username }}</span>
        </div>
      </ng-template>

      <ng-template totCell="status" let-data>
        <nz-tag [nzColor]="data.isEmailVerified ? 'success' : 'warning'">
          {{ (data.isEmailVerified ? 'Đã xác minh' : 'Đang chờ') | transloco }}
        </nz-tag>
      </ng-template>

      <ng-template totCell="roles" let-data>
        <nz-tag *ngFor="let role of data.roles" nzColor="blue" 
                [nzMode]="(data.username?.toLowerCase() === 'admin' && role.name?.toLowerCase() === 'admin') ? 'default' : 'closeable'" 
                (nzOnClose)="removeRole($event, data, role)">
          {{ role.name }}
        </nz-tag>
        <tot-button nzType="dashed" nzSize="small" (click)="showRoleModal(data)">
          <span nz-icon nzType="plus"></span>
        </tot-button>
      </ng-template>

      <ng-template totCell="claims" let-data>
        <nz-tag *ngFor="let claim of data.directClaims" nzColor="purple" 
                [nzMode]="(data.username?.toLowerCase() === 'admin' && claim.name?.toLowerCase() === 'admin') ? 'default' : 'closeable'" 
                (nzOnClose)="removeClaim($event, data, claim)">
          {{ claim.name }}
        </nz-tag>
        <tot-button nzType="dashed" nzSize="small" (click)="showClaimModal(data)">
          <span nz-icon nzType="plus"></span>
        </tot-button>
      </ng-template>

      <ng-template totCell="createdAt" let-data>
        {{ data.createdAt | date:'dd/MM/yyyy HH:mm' }}
      </ng-template>

      <ng-template totCell="updatedAt" let-data>
        {{ data.updatedAt | date:'dd/MM/yyyy HH:mm' }}
      </ng-template>

      <ng-template totCell="action" let-data>
        <div style="display: flex; gap: 4px; flex-direction: column;">
          <tot-button nzType="primary" nzSize="small" (click)="showEditModal(data)">{{ 'Sửa' | transloco }}</tot-button>
          <tot-button nzType="primary" [nzDanger]="true" nzSize="small" 
                  [disabled]="data.username?.toLowerCase() === 'admin'"
                  (click)="deleteUser(data)">{{ 'Xóa' | transloco }}</tot-button>
        </div>
      </ng-template>
    </tot-table>

    <input type="file" #avatarInput style="display: none" (change)="onFileSelected($event)" accept="image/*" />

    <!-- Modal Thêm/Sửa Người dùng -->
    <nz-modal [(nzVisible)]="isUserModalVisible" [nzTitle]="(editingUser ? 'Sửa người dùng' : 'Thêm người dùng') | transloco" (nzOnCancel)="isUserModalVisible = false" (nzOnOk)="saveUser()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Tên đăng nhập' | transloco }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="userForm.username" name="username" [disabled]="!!editingUser" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item *ngIf="!editingUser">
            <nz-form-label nzRequired>{{ 'Mật khẩu' | transloco }}</nz-form-label>
            <nz-form-control>
              <input nz-input type="password" [(ngModel)]="userForm.password" name="password" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Tên hiển thị' | transloco }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="userForm.displayName" name="displayName" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Email' | transloco }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="userForm.email" name="email" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control>
              <label nz-checkbox [(ngModel)]="userForm.isEmailVerified" name="isEmailVerified">{{ 'Đã xác minh email' | transloco }}</label>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>{{ 'Vai trò' | transloco }}</nz-form-label>
            <nz-form-control>
              <tot-autocomplete
                apiUrl="/api/AuthManagement/roles"
                [placeholder]="'Chọn vai trò' | transloco"
                mode="multiple"
                [(ngModel)]="userForm.roleIds"
                name="roleIds"
              ></tot-autocomplete>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>{{ 'Quyền trực tiếp' | transloco }}</nz-form-label>
            <nz-form-control>
              <tot-autocomplete
                apiUrl="/api/AuthManagement/claims"
                [placeholder]="'Chọn quyền' | transloco"
                mode="multiple"
                [(ngModel)]="userForm.claimIds"
                name="claimIds"
              ></tot-autocomplete>
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>

    <!-- Các Modal gán nhanh -->
    <nz-modal [(nzVisible)]="isRoleModalVisible" [nzTitle]="'Vai trò' | transloco" (nzOnCancel)="isRoleModalVisible = false" (nzOnOk)="assignRole()">
      <ng-container *nzModalContent>
        <tot-autocomplete
          apiUrl="/api/AuthManagement/roles"
          [placeholder]="'Vui lòng chọn' | transloco"
          mode="multiple"
          [(ngModel)]="selectedRoleIds"
        ></tot-autocomplete>
      </ng-container>
    </nz-modal>

    <nz-modal [(nzVisible)]="isClaimModalVisible" [nzTitle]="'Quyền' | transloco" (nzOnCancel)="isClaimModalVisible = false" (nzOnOk)="assignClaim()">
      <ng-container *nzModalContent>
        <tot-autocomplete
          apiUrl="/api/AuthManagement/claims"
          [placeholder]="'Vui lòng chọn' | transloco"
          mode="multiple"
          [(ngModel)]="selectedClaimIds"
        ></tot-autocomplete>
      </ng-container>
    </nz-modal>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .search-card {
      margin-bottom: 16px;
    }
    .search-actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .user-cell {
      display: flex;
      flex-direction: column;
    }
    .sub-text {
      font-size: 12px;
      color: #888;
    }
    nz-tag {
      margin-bottom: 4px;
    }
    .avatar-wrapper {
      position: relative;
      cursor: pointer;
      display: inline-block;
      border-radius: 50%;
      overflow: hidden;
      width: 48px;
      height: 48px;
    }
    .avatar-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s;
      font-size: 18px;
    }
    .avatar-wrapper:hover .avatar-mask {
      opacity: 1;
    }
    .user-avatar {
      border: 1px solid #f0f0f0;
    }
  `]
})
export class UserListComponent implements OnInit {
  private authMgmt = inject(AuthManagementService);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);
  private translate = inject(TranslocoService);
  private cdr = inject(ChangeDetectorRef);

  users: any[] = [];
  loading = false;
  syncingClaims = false;
  
  pageIndex = 1;
  pageSize = 10;
  totalUsers = 0;
  
  isRoleModalVisible = false;
  isClaimModalVisible = false;
  isUserModalVisible = false;
  
  selectedUser: any = null;
  selectedUserForAvatar: any = null;
  selectedRoleIds: string[] = [];
  selectedClaimIds: string[] = [];

  editingUser: any = null;
  userForm: any = {
    username: '',
    password: '',
    displayName: '',
    email: '',
    isEmailVerified: false,
    roleIds: [],
    claimIds: []
  };

  searchQuery: any = {
    keyword: '',
    isEmailVerified: null,
    roleIds: [],
    claimIds: [],
    dateRange: [],
    ssoProvider: '',
    ssoId: ''
  };

  @ViewChild('userExtraTpl', { static: true }) userExtraTpl!: TemplateRef<any>;

  userColumns: TotTableColumn[] = [];

  ngOnInit(): void {
    this.userColumns = [
      { title: 'Avatar', key: 'avatar', width: '80px' },
      { title: 'Người dùng', key: 'user' },
      { title: 'Email', key: 'email' },
      { title: 'Trạng thái', key: 'status' },
      { title: 'Vai trò', key: 'roles' },
      { title: 'Quyền', key: 'claims' },
      { title: 'Ngày tạo', key: 'createdAt' },
      { title: 'Cập nhật', key: 'updatedAt' },
      { title: 'Hành động', key: 'action', width: '150px', right: true }
    ];
    this.loadUsers();
  }

  async loadUsers() {
    this.loading = true;
    try {
      const params: any = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      if (this.searchQuery.keyword) params.keyword = this.searchQuery.keyword;
      if (this.searchQuery.isEmailVerified !== null && this.searchQuery.isEmailVerified !== undefined) {
        params.isEmailVerified = this.searchQuery.isEmailVerified;
      }
      if (this.searchQuery.ssoProvider) params.ssoProvider = this.searchQuery.ssoProvider;
      if (this.searchQuery.ssoId) params.ssoId = this.searchQuery.ssoId;
      
      if (this.searchQuery.roleIds && this.searchQuery.roleIds.length > 0) {
        params.roleIds = this.searchQuery.roleIds;
      }
      if (this.searchQuery.claimIds && this.searchQuery.claimIds.length > 0) {
        params.claimIds = this.searchQuery.claimIds;
      }
      if (this.searchQuery.dateRange && this.searchQuery.dateRange.length === 2) {
        params.startDate = this.searchQuery.dateRange[0]?.toISOString();
        params.endDate = this.searchQuery.dateRange[1]?.toISOString();
      }

      const res: any = await this.authMgmt.getUsers(params);
      this.users = res.items || [];
      this.totalUsers = res.total || 0;
    } catch (e) {
      this.message.error(this.translate.translate('Lỗi khi tải người dùng'));
    } finally {
      this.loading = false;
    }
  }

  search() {
    this.pageIndex = 1;
    this.loadUsers();
  }


  resetSearch() {
    this.pageIndex = 1;
    this.searchQuery = {
      keyword: '',
      isEmailVerified: null,
      roleIds: [],
      claimIds: [],
      dateRange: [],
      ssoProvider: '',
      ssoId: ''
    };
    this.loadUsers();
  }

  showCreateModal() {
    this.editingUser = null;
    this.userForm = {
      username: '',
      password: '',
      displayName: '',
      email: '',
      isEmailVerified: false,
      roleIds: [],
      claimIds: []
    };
    this.isUserModalVisible = true;
  }

  showEditModal(user: any) {
    this.editingUser = user;
    this.userForm = {
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      roleIds: user.roles?.map((r: any) => r.id) || [],
      claimIds: user.directClaims?.map((c: any) => c.id) || []
    };
    this.isUserModalVisible = true;
  }

  saveUser() {
    if (!this.userForm.username || !this.userForm.displayName || !this.userForm.email || (!this.editingUser && !this.userForm.password)) {
      this.message.warning(this.translate.translate('Vui lòng nhập đầy đủ thông tin bắt buộc'));
      return;
    }

    this.loading = true;
    try {
      if (this.editingUser) {
        this.authMgmt.updateUser(this.editingUser.id, this.userForm, (data: any) => {
          this.loading = false;
          if (data.status === 'Completed') {
            this.message.success(this.translate.translate('Cập nhật người dùng thành công'));
            this.isUserModalVisible = false;
            this.loadUsers();
          } else if (data.status === 'Error') {
            this.message.error(data.message || this.translate.translate('Lỗi khi cập nhật người dùng'));
          }
        });
      } else {
        this.authMgmt.createUser(this.userForm, (data: any) => {
          this.loading = false;
          if (data.status === 'Completed') {
            this.message.success(this.translate.translate('Thêm người dùng thành công'));
            this.isUserModalVisible = false;
            this.loadUsers();
          } else if (data.status === 'Error') {
            this.message.error(data.message || this.translate.translate('Lỗi khi thêm người dùng'));
          }
        });
      }
    } catch (e) {
      this.loading = false;
      this.message.error(this.translate.translate('Lỗi khi lưu người dùng'));
    }
  }

  showRoleModal(user: any) {
    this.selectedUser = user;
    this.selectedRoleIds = user.roles?.map((r: any) => r.id) || [];
    this.isRoleModalVisible = true;
  }

  assignRole() {
    this.authMgmt.assignRolesToUser(this.selectedUser.id, this.selectedRoleIds, (data: any) => {
      if (data.status === 'Completed') {
        this.message.success(this.translate.translate('Cập nhật vai trò thành công'));
        this.isRoleModalVisible = false;
        this.loadUsers();
      } else if (data.status === 'Error') {
        this.message.error(data.message || this.translate.translate('Cập nhật vai trò thất bại'));
      }
    });
  }

  async removeRole(event: MouseEvent, user: any, role: any) {
    event.preventDefault();
    this.modal.confirm({
      nzTitle: `${this.translate.translate('Xác nhận')}?`,
      nzContent: `${this.translate.translate('Xóa')} ${role.name} ${this.translate.translate('khỏi')} ${user.username}?`,
      nzOnOk: () => {
        this.authMgmt.removeRoleFromUser(user.id, role.id, (data: any) => {
          if (data.status === 'Completed') {
            this.message.success(this.translate.translate('Xóa vai trò thành công'));
            this.loadUsers();
          } else if (data.status === 'Error') {
            this.message.error(data.message || this.translate.translate('Xóa vai trò thất bại'));
          }
        });
      }
    });
  }

  showClaimModal(user: any) {
    this.selectedUser = user;
    this.selectedClaimIds = user.directClaims?.map((c: any) => c.id) || [];
    this.isClaimModalVisible = true;
  }

  assignClaim() {
    this.authMgmt.assignClaimsToUser(this.selectedUser.id, this.selectedClaimIds, (data: any) => {
      if (data.status === 'Completed') {
        this.message.success(this.translate.translate('Cập nhật quyền thành công'));
        this.isClaimModalVisible = false;
        this.loadUsers();
      } else if (data.status === 'Error') {
        this.message.error(data.message || this.translate.translate('Cập nhật quyền thất bại'));
      }
    });
  }

  async removeClaim(event: MouseEvent, user: any, claim: any) {
    event.preventDefault();
    this.modal.confirm({
      nzTitle: `${this.translate.translate('Xác nhận')}?`,
      nzContent: `${this.translate.translate('Xóa')} ${claim.name} ${this.translate.translate('khỏi')} ${user.username}?`,
      nzOnOk: () => {
        this.authMgmt.removeClaimFromUser(user.id, claim.id, (data: any) => {
          if (data.status === 'Completed') {
            this.message.success(this.translate.translate('Xóa quyền thành công'));
            this.loadUsers();
          } else if (data.status === 'Error') {
            this.message.error(data.message || this.translate.translate('Xóa quyền thất bại'));
          }
        });
      }
    });
  }

  async deleteUser(user: any) {
    if (user.username?.toLowerCase() === 'admin') {
      this.message.warning(this.translate.translate('Không thể xóa tài khoản admin'));
      return;
    }

    this.modal.confirm({
      nzTitle: `${this.translate.translate('Xác nhận xóa người dùng')} ${user.username}?`,
      nzContent: this.translate.translate('Hành động này không thể hoàn tác'),
      nzOkDanger: true,
      nzOnOk: () => {
        this.authMgmt.deleteUser(user.id, (data: any) => {
          if (data.status === 'Completed') {
            this.message.success(this.translate.translate('Xóa người dùng thành công'));
            this.loadUsers();
          } else if (data.status === 'Error') {
            this.message.error(data.message || this.translate.translate('Xóa người dùng thất bại'));
          }
        });
      }
    });
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file || !this.selectedUserForAvatar) return;

    const loadingMsg = this.message.loading(this.translate.translate('Đang tải lên...'), { nzDuration: 0 }).messageId;
    try {
      this.authMgmt.uploadAvatar(this.selectedUserForAvatar.id, file, (data: any) => {
        this.message.remove(loadingMsg);
        if (data.status === 'Completed') {
          this.message.success(this.translate.translate('Cập nhật ảnh đại diện thành công'));
          const index = this.users.findIndex(u => u.id === this.selectedUserForAvatar.id);
          if (index !== -1) {
            this.users[index] = { ...this.users[index], avatarUrl: data.data };
            this.users = [...this.users];
            this.cdr.detectChanges();
          }
        } else if (data.status === 'Error') {
          this.message.error(data.message || this.translate.translate('Lỗi khi tải lên ảnh đại diện'));
        }
      });
    } catch (e) {
      this.message.remove(loadingMsg);
      this.message.error(this.translate.translate('Lỗi khi tải lên ảnh đại diện'));
    } finally {
      event.target.value = ''; // Reset file input
    }
  }

  async syncClaims() {
    this.syncingClaims = true;
    try {
      await this.authMgmt.syncClaims(CLAIMS_VERSION, ALL_CLAIMS);
      this.message.success(this.translate.translate('Đồng bộ quyền thành công'));
      await this.loadUsers();
    } catch (e: any) {
      this.message.error(e?.message || this.translate.translate('Đồng bộ quyền thất bại'));
    } finally {
      this.syncingClaims = false;
    }
  }
}
