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
    AppSelectComponent,
    TranslateModule
  ],
  template: `
    <div class="page-header">
      <h2>{{ 'Danh sách người dùng' | translate }}</h2>
      <button nz-button nzType="primary" (click)="loadUsers()">
        <span nz-icon nzType="reload"></span> {{ 'Đồng bộ' | translate }}
      </button>
    </div>

    <nz-table #basicTable [nzData]="users" [nzLoading]="loading">
      <thead>
        <tr>
          <th>{{ 'Người dùng' | translate }}</th>
          <th>{{ 'Trạng thái' | translate }}</th>
          <th>{{ 'Vai trò' | translate }}</th>
          <th>{{ 'Quyền' | translate }}</th>
          <th nzWidth="120px">{{ 'Hành động' | translate }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of basicTable.data">
          <td>
            <div class="user-cell">
              <strong>{{ data.displayName }}</strong>
              <span class="sub-text">{{ data.username }} | {{ data.email }}</span>
            </div>
          </td>
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
          <td>
            <nz-space>
              <button *nzSpaceItem nz-button nzType="primary" nzDanger nzSize="small" 
                      [disabled]="data.username?.toLowerCase() === 'admin'"
                      (click)="deleteUser(data)">{{ 'Xóa' | translate }}</button>
            </nz-space>
          </td>
        </tr>
      </tbody>
    </nz-table>

    <nz-modal [(nzVisible)]="isRoleModalVisible" [nzTitle]="'Vai trò' | translate" (nzOnCancel)="isRoleModalVisible = false" (nzOnOk)="assignRole()">
      <ng-container *nzModalContent>
        <app-select
          apiUrl="/api/AuthManagement/roles"
          [placeholder]="'Vui lòng chọn' | translate"
          [(ngModel)]="selectedRoleId"
        ></app-select>
      </ng-container>
    </nz-modal>

    <nz-modal [(nzVisible)]="isClaimModalVisible" [nzTitle]="'Quyền' | translate" (nzOnCancel)="isClaimModalVisible = false" (nzOnOk)="assignClaim()">
      <ng-container *nzModalContent>
        <app-select
          apiUrl="/api/AuthManagement/claims"
          [placeholder]="'Vui lòng chọn' | translate"
          [(ngModel)]="selectedClaimId"
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
  `]
})
export class UserListComponent implements OnInit {
  private authMgmt = inject(AuthManagementService);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);
  private translate = inject(TranslateService);

  users: any[] = [];
  loading = false;
  
  availableRoles: any[] = [];
  availableClaims: any[] = [];
  
  isRoleModalVisible = false;
  isClaimModalVisible = false;
  
  selectedUser: any = null;
  selectedRoleId: string = '';
  selectedClaimId: string = '';

  ngOnInit(): void {
    this.loadUsers();
    this.loadMetadata();
  }

  async loadUsers() {
    this.loading = true;
    try {
      this.users = await this.authMgmt.getUsers();
    } catch (e) {
      this.message.error(this.translate.instant('Lỗi khi tải người dùng'));
    } finally {
      this.loading = false;
    }
  }

  async loadMetadata() {
    try {
      this.availableRoles = await this.authMgmt.getRoles();
      this.availableClaims = await this.authMgmt.getClaims();
    } catch (e) {
      console.error('Failed to load metadata', e);
    }
  }

  showRoleModal(user: any) {
    this.selectedUser = user;
    this.selectedRoleId = '';
    this.isRoleModalVisible = true;
  }

  async assignRole() {
    if (!this.selectedRoleId) return;
    try {
      await this.authMgmt.assignRoleToUser(this.selectedUser.id, this.selectedRoleId);
      this.message.success(this.translate.instant('Gán vai trò thành công'));
      this.isRoleModalVisible = false;
      this.loadUsers();
    } catch (e) {
      this.message.error(this.translate.instant('Gán vai trò thất bại'));
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
    this.selectedClaimId = '';
    this.isClaimModalVisible = true;
  }

  async assignClaim() {
    if (!this.selectedClaimId) return;
    try {
      await this.authMgmt.assignClaimToUser(this.selectedUser.id, this.selectedClaimId);
      this.message.success(this.translate.instant('Gán quyền thành công'));
      this.isClaimModalVisible = false;
      this.loadUsers();
    } catch (e) {
      this.message.error(this.translate.instant('Gán quyền thất bại'));
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
}
