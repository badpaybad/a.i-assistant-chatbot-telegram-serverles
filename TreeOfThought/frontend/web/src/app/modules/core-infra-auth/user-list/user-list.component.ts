import { Component, OnInit, inject } from '@angular/core';
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
import { AppSelectComponent } from '../../../shared';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    AppSelectComponent,
    TranslateModule
  ],
  template: `
    <div class="page-header">
      <h2>{{ 'Danh sách người dùng' | translate }}</h2>
      <nz-space>
        <button *nzSpaceItem nz-button nzType="primary" (click)="showCreateModal()">
          <span nz-icon nzType="plus"></span> {{ 'Thêm người dùng' | translate }}
        </button>
        <button *nzSpaceItem nz-button (click)="loadUsers()">
          <span nz-icon nzType="reload"></span> {{ 'Đồng bộ' | translate }}
        </button>
      </nz-space>
    </div>

    <nz-card class="search-card" [nzTitle]="'Tìm kiếm' | translate">
      <div nz-row [nzGutter]="[16, 16]">
        <div nz-col [nzSpan]="6">
          <nz-input-group [nzSuffix]="suffixIconSearch">
            <input type="text" nz-input [(ngModel)]="searchQuery.keyword" [placeholder]="'Username, DisplayName, Email' | translate" (keyup.enter)="loadUsers()" />
          </nz-input-group>
          <ng-template #suffixIconSearch>
            <span nz-icon nzType="search"></span>
          </ng-template>
        </div>
        <div nz-col [nzSpan]="6">
          <nz-select [(ngModel)]="searchQuery.isEmailVerified" [nzPlaceHolder]="'Trạng thái' | translate" nzAllowClear style="width: 100%">
            <nz-option [nzValue]="true" [nzLabel]="'Đã xác minh' | translate"></nz-option>
            <nz-option [nzValue]="false" [nzLabel]="'Đang chờ' | translate"></nz-option>
          </nz-select>
        </div>
        <div nz-col [nzSpan]="6">
          <app-select
            apiUrl="/api/AuthManagement/roles"
            [placeholder]="'Vai trò' | translate"
            mode="multiple"
            [(ngModel)]="searchQuery.roleIds"
            (valueChange)="loadUsers()"
          ></app-select>
        </div>
        <div nz-col [nzSpan]="6">
          <app-select
            apiUrl="/api/AuthManagement/claims"
            [placeholder]="'Quyền' | translate"
            mode="multiple"
            [(ngModel)]="searchQuery.claimIds"
            (valueChange)="loadUsers()"
          ></app-select>
        </div>
        <div nz-col [nzSpan]="8">
          <nz-range-picker [(ngModel)]="searchQuery.dateRange" style="width: 100%"></nz-range-picker>
        </div>
        <div nz-col [nzSpan]="4">
          <nz-select [(ngModel)]="searchQuery.ssoProvider" [nzPlaceHolder]="'SSO Provider' | translate" nzAllowClear style="width: 100%">
            <nz-option nzValue="google" nzLabel="Google"></nz-option>
            <nz-option nzValue="ms" nzLabel="Microsoft"></nz-option>
            <nz-option nzValue="facebook" nzLabel="Facebook"></nz-option>
          </nz-select>
        </div>
        <div nz-col [nzSpan]="4">
          <input nz-input [(ngModel)]="searchQuery.ssoId" [placeholder]="'SSO ID' | translate" (keyup.enter)="loadUsers()" />
        </div>
        <div nz-col [nzSpan]="8" class="search-actions">
          <nz-space>
            <button *nzSpaceItem nz-button nzType="primary" (click)="loadUsers()">{{ 'Tìm kiếm' | translate }}</button>
            <button *nzSpaceItem nz-button (click)="resetSearch()">{{ 'Đặt lại' | translate }}</button>
          </nz-space>
        </div>
      </div>
    </nz-card>

    <nz-table #basicTable [nzData]="users" [nzLoading]="loading">
      <thead>
        <tr>
          <th nzWidth="80px">{{ 'Avatar' | translate }}</th>
          <th>{{ 'Người dùng' | translate }}</th>
          <th>{{ 'Email' | translate }}</th>
          <th>{{ 'Trạng thái' | translate }}</th>
          <th>{{ 'Vai trò' | translate }}</th>
          <th>{{ 'Quyền' | translate }}</th>
          <th>{{ 'Ngày tạo' | translate }}</th>
          <th>{{ 'Cập nhật' | translate }}</th>
          <th nzWidth="150px">{{ 'Hành động' | translate }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of basicTable.data">
          <td>
            <div class="avatar-wrapper" (click)="avatarInput.click(); selectedUserForAvatar = data">
              <nz-avatar [nzSrc]="data.avatarUrl" nzIcon="user" [nzSize]="48" class="user-avatar"></nz-avatar>
              <div class="avatar-mask">
                <span nz-icon nzType="camera"></span>
              </div>
            </div>
          </td>
          <td>
            <div class="user-cell">
              <strong>{{ data.displayName }}</strong>
              <span class="sub-text">{{ data.username }}</span>
            </div>
          </td>
          <td>{{ data.email }}</td>
          <td>
            <nz-tag [nzColor]="data.isEmailVerified ? 'success' : 'warning'">
              {{ (data.isEmailVerified ? 'Đã xác minh' : 'Đang chờ') | translate }}
            </nz-tag>
          </td>
          <td>
            <nz-tag *ngFor="let role of data.roles" nzColor="blue" 
                    [nzMode]="(data.username?.toLowerCase() === 'admin' && role.name?.toLowerCase() === 'admin') ? 'default' : 'closeable'" 
                    (nzOnClose)="removeRole(data, role)">
              {{ role.name }}
            </nz-tag>
            <button nz-button nzType="dashed" nzSize="small" (click)="showRoleModal(data)">
              <span nz-icon nzType="plus"></span>
            </button>
          </td>
          <td>
            <nz-tag *ngFor="let claim of data.directClaims" nzColor="purple" 
                    [nzMode]="(data.username?.toLowerCase() === 'admin' && claim.name?.toLowerCase() === 'admin') ? 'default' : 'closeable'" 
                    (nzOnClose)="removeClaim(data, claim)">
              {{ claim.name }}
            </nz-tag>
            <button nz-button nzType="dashed" nzSize="small" (click)="showClaimModal(data)">
              <span nz-icon nzType="plus"></span>
            </button>
          </td>
          <td>{{ data.createdAt | date:'dd/MM/yyyy HH:mm' }}</td>
          <td>{{ data.updatedAt | date:'dd/MM/yyyy HH:mm' }}</td>
          <td>
            <nz-space>
              <button *nzSpaceItem nz-button nzType="primary" nzSize="small" (click)="showEditModal(data)">{{ 'Sửa' | translate }}</button>
              <button *nzSpaceItem nz-button nzType="primary" nzDanger nzSize="small" 
                      [disabled]="data.username?.toLowerCase() === 'admin'"
                      (click)="deleteUser(data)">{{ 'Xóa' | translate }}</button>
            </nz-space>
          </td>
        </tr>
      </tbody>
    </nz-table>

    <input type="file" #avatarInput style="display: none" (change)="onFileSelected($event)" accept="image/*" />

    <!-- Modal Thêm/Sửa Người dùng -->
    <nz-modal [(nzVisible)]="isUserModalVisible" [nzTitle]="(editingUser ? 'Sửa người dùng' : 'Thêm người dùng') | translate" (nzOnCancel)="isUserModalVisible = false" (nzOnOk)="saveUser()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Tên đăng nhập' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="userForm.username" name="username" [disabled]="!!editingUser" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item *ngIf="!editingUser">
            <nz-form-label nzRequired>{{ 'Mật khẩu' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input type="password" [(ngModel)]="userForm.password" name="password" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Tên hiển thị' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="userForm.displayName" name="displayName" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Email' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="userForm.email" name="email" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control>
              <label nz-checkbox [(ngModel)]="userForm.isEmailVerified" name="isEmailVerified">{{ 'Đã xác minh email' | translate }}</label>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>{{ 'Vai trò' | translate }}</nz-form-label>
            <nz-form-control>
              <app-select
                apiUrl="/api/AuthManagement/roles"
                [placeholder]="'Chọn vai trò' | translate"
                mode="multiple"
                [(ngModel)]="userForm.roleIds"
                name="roleIds"
              ></app-select>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>{{ 'Quyền trực tiếp' | translate }}</nz-form-label>
            <nz-form-control>
              <app-select
                apiUrl="/api/AuthManagement/claims"
                [placeholder]="'Chọn quyền' | translate"
                mode="multiple"
                [(ngModel)]="userForm.claimIds"
                name="claimIds"
              ></app-select>
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>

    <!-- Các Modal gán nhanh -->
    <nz-modal [(nzVisible)]="isRoleModalVisible" [nzTitle]="'Vai trò' | translate" (nzOnCancel)="isRoleModalVisible = false" (nzOnOk)="assignRole()">
      <ng-container *nzModalContent>
        <app-select
          apiUrl="/api/AuthManagement/roles"
          [placeholder]="'Vui lòng chọn' | translate"
          mode="multiple"
          [(ngModel)]="selectedRoleIds"
        ></app-select>
      </ng-container>
    </nz-modal>

    <nz-modal [(nzVisible)]="isClaimModalVisible" [nzTitle]="'Quyền' | translate" (nzOnCancel)="isClaimModalVisible = false" (nzOnOk)="assignClaim()">
      <ng-container *nzModalContent>
        <app-select
          apiUrl="/api/AuthManagement/claims"
          [placeholder]="'Vui lòng chọn' | translate"
          mode="multiple"
          [(ngModel)]="selectedClaimIds"
        ></app-select>
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
  private translate = inject(TranslateService);

  users: any[] = [];
  loading = false;
  
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

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    this.loading = true;
    try {
      const params: any = {};
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

      this.users = await this.authMgmt.getUsers(params);
    } catch (e) {
      this.message.error(this.translate.instant('Lỗi khi tải người dùng'));
    } finally {
      this.loading = false;
    }
  }

  resetSearch() {
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

  async saveUser() {
    if (!this.userForm.username || !this.userForm.displayName || !this.userForm.email || (!this.editingUser && !this.userForm.password)) {
      this.message.warning(this.translate.instant('Vui lòng nhập đầy đủ thông tin bắt buộc'));
      return;
    }

    try {
      if (this.editingUser) {
        await this.authMgmt.updateUser(this.editingUser.id, this.userForm);
        // Batch assign roles/claims after update
        await this.authMgmt.assignRolesToUser(this.editingUser.id, this.userForm.roleIds);
        await this.authMgmt.assignClaimsToUser(this.editingUser.id, this.userForm.claimIds);
        this.message.success(this.translate.instant('Cập nhật người dùng thành công'));
      } else {
        const newUser: any = await this.authMgmt.createUser(this.userForm);
        // Assign roles/claims for new user
        if (newUser && newUser.id) {
          await this.authMgmt.assignRolesToUser(newUser.id, this.userForm.roleIds);
          await this.authMgmt.assignClaimsToUser(newUser.id, this.userForm.claimIds);
        }
        this.message.success(this.translate.instant('Thêm người dùng thành công'));
      }
      this.isUserModalVisible = false;
      this.loadUsers();
    } catch (e) {
      this.message.error(this.translate.instant('Lỗi khi lưu người dùng'));
    }
  }

  showRoleModal(user: any) {
    this.selectedUser = user;
    this.selectedRoleIds = user.roles?.map((r: any) => r.id) || [];
    this.isRoleModalVisible = true;
  }

  async assignRole() {
    try {
      await this.authMgmt.assignRolesToUser(this.selectedUser.id, this.selectedRoleIds);
      this.message.success(this.translate.instant('Cập nhật vai trò thành công'));
      this.isRoleModalVisible = false;
      this.loadUsers();
    } catch (e) {
      this.message.error(this.translate.instant('Cập nhật vai trò thất bại'));
    }
  }

  async removeRole(user: any, role: any) {
    this.modal.confirm({
      nzTitle: `${this.translate.instant('Xác nhận')}?`,
      nzContent: `${this.translate.instant('Xóa')} ${role.name} ${this.translate.instant('khỏi')} ${user.username}?`,
      nzOnOk: async () => {
        try {
          await this.authMgmt.removeRoleFromUser(user.id, role.id);
          this.message.success(this.translate.instant('Xóa vai trò thành công'));
          this.loadUsers();
        } catch (e) {
          this.message.error(this.translate.instant('Xóa vai trò thất bại'));
        }
      }
    });
  }

  showClaimModal(user: any) {
    this.selectedUser = user;
    this.selectedClaimIds = user.directClaims?.map((c: any) => c.id) || [];
    this.isClaimModalVisible = true;
  }

  async assignClaim() {
    try {
      await this.authMgmt.assignClaimsToUser(this.selectedUser.id, this.selectedClaimIds);
      this.message.success(this.translate.instant('Cập nhật quyền thành công'));
      this.isClaimModalVisible = false;
      this.loadUsers();
    } catch (e) {
      this.message.error(this.translate.instant('Cập nhật quyền thất bại'));
    }
  }

  async removeClaim(user: any, claim: any) {
    this.modal.confirm({
      nzTitle: `${this.translate.instant('Xác nhận')}?`,
      nzContent: `${this.translate.instant('Xóa')} ${claim.name} ${this.translate.instant('khỏi')} ${user.username}?`,
      nzOnOk: async () => {
        try {
          await this.authMgmt.removeClaimFromUser(user.id, claim.id);
          this.message.success(this.translate.instant('Xóa quyền thành công'));
          this.loadUsers();
        } catch (e) {
          this.message.error(this.translate.instant('Xóa quyền thất bại'));
        }
      }
    });
  }

  async deleteUser(user: any) {
    if (user.username?.toLowerCase() === 'admin') {
      this.message.warning(this.translate.instant('Không thể xóa tài khoản admin'));
      return;
    }

    this.modal.confirm({
      nzTitle: `${this.translate.instant('Xác nhận xóa người dùng')} ${user.username}?`,
      nzContent: this.translate.instant('Hành động này không thể hoàn tác'),
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.authMgmt.deleteUser(user.id);
          this.message.success(this.translate.instant('Xóa người dùng thành công'));
          this.loadUsers();
        } catch (e: any) {
          this.message.error(e.error?.message || this.translate.instant('Xóa người dùng thất bại'));
        }
      }
    });
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file || !this.selectedUserForAvatar) return;

    const loadingMsg = this.message.loading(this.translate.instant('Đang tải lên...'), { nzDuration: 0 }).messageId;
    try {
      const result: any = await this.authMgmt.uploadAvatar(this.selectedUserForAvatar.id, file);
      this.selectedUserForAvatar.avatarUrl = result.url;
      this.message.success(this.translate.instant('Cập nhật ảnh đại diện thành công'));
      
      // Update the user in the list locally to avoid full reload
      const index = this.users.findIndex(u => u.id === this.selectedUserForAvatar.id);
      if (index !== -1) {
        this.users[index].avatarUrl = result.url;
      }
    } catch (e) {
      this.message.error(this.translate.instant('Lỗi khi tải lên ảnh đại diện'));
    } finally {
      this.message.remove(loadingMsg);
      event.target.value = ''; // Reset file input
    }
  }
}
