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
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { AuthManagementService } from '../services/auth-management.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppSelectComponent } from '../../../shared';
import { ADMIN_CLAIM, ADMIN_ROLE } from '../../../core/auth/claims.config';

@Component({
  selector: 'app-role-list',
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
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzCardModule,
    TranslateModule,
    AppSelectComponent
  ],
  template: `
    <div class="page-header">
      <h2>{{ 'Vai trò' | translate }}</h2>
      <button nz-button nzType="primary" (click)="showCreateModal()">
        <span nz-icon nzType="plus"></span> {{ 'Thêm mới' | translate }}
      </button>
    </div>

    <nz-card class="search-card" [nzTitle]="'Tìm kiếm' | translate">
      <div nz-row [nzGutter]="[16, 16]">
        <div nz-col [nzSpan]="8">
          <input nz-input [(ngModel)]="searchQuery.keyword" [placeholder]="'Tên vai trò, mô tả' | translate" (keyup.enter)="loadRoles()" />
        </div>
        <div nz-col [nzSpan]="10">
          <app-select
            apiUrl="/api/AuthManagement/claims"
            [placeholder]="'Quyền' | translate"
            mode="multiple"
            [(ngModel)]="searchQuery.claimIds"
            (valueChange)="loadRoles()"
          ></app-select>
        </div>
        <div nz-col [nzSpan]="6" class="search-actions">
          <nz-space>
            <button *nzSpaceItem nz-button nzType="primary" (click)="loadRoles()">{{ 'Tìm kiếm' | translate }}</button>
            <button *nzSpaceItem nz-button (click)="resetSearch()">{{ 'Đặt lại' | translate }}</button>
          </nz-space>
        </div>
      </div>
    </nz-card>

    <nz-table #basicTable [nzData]="roles" [nzLoading]="loading">
      <thead>
        <tr>
          <th nzWidth="200px">{{ 'Vai trò' | translate }}</th>
          <th>{{ 'Mô tả' | translate }}</th>
          <th>{{ 'Quyền' | translate }}</th>
          <th nzWidth="150px">{{ 'Hành động' | translate }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of basicTable.data">
          <td><strong>{{ data.name }}</strong></td>
          <td>{{ data.description }}</td>
          <td>
            <div class="claim-tags">
              <nz-tag *ngFor="let claim of data.claims" nzColor="blue" 
                      [nzMode]="(data.name?.toLowerCase() === ADMIN_ROLE.toLowerCase() && claim.name?.toLowerCase() === ADMIN_CLAIM.toLowerCase()) ? 'default' : 'closeable'" 
                      (nzOnClose)="removeClaim(data, claim)">
                {{ claim.name }}
              </nz-tag>
              <button nz-button nzType="dashed" nzSize="small" (click)="showClaimModal(data)">
                <span nz-icon nzType="plus"></span>
              </button>
            </div>
          </td>
          <td>
            <nz-space>
              <button *nzSpaceItem nz-button nzType="primary" nzSize="small" (click)="showEditModal(data)">{{ 'Sửa' | translate }}</button>
              <button *nzSpaceItem nz-button nzType="primary" nzDanger nzSize="small" 
                      [disabled]="data.name?.toLowerCase() === ADMIN_ROLE.toLowerCase()"
                      (click)="deleteRole(data)">{{ 'Xóa' | translate }}</button>
            </nz-space>
          </td>
        </tr>
      </tbody>
    </nz-table>

    <!-- Modal Thêm/Sửa Vai trò -->
    <nz-modal [(nzVisible)]="isRoleModalVisible" [nzTitle]="(editingRole ? 'Sửa vai trò' : 'Thêm mới') | translate" (nzOnCancel)="isRoleModalVisible = false" (nzOnOk)="saveRole()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Vai trò' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="roleForm.name" name="name" [placeholder]="'Vai trò' | translate" [disabled]="!!editingRole && editingRole.name?.toLowerCase() === ADMIN_ROLE.toLowerCase()" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>{{ 'Mô tả' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="roleForm.description" name="description" [placeholder]="'Mô tả' | translate" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>{{ 'Quyền' | translate }}</nz-form-label>
            <nz-form-control>
              <app-select
                apiUrl="/api/AuthManagement/claims"
                [placeholder]="'Chọn quyền' | translate"
                mode="multiple"
                [(ngModel)]="roleForm.claimIds"
                name="claimIds"
              ></app-select>
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>

    <!-- Modal gán nhanh (Giữ nguyên) -->
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
    .search-card {
      margin-bottom: 16px;
    }
    .search-actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .claim-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    nz-tag {
      margin-bottom: 4px;
    }
  `]
})
export class RoleListComponent implements OnInit {
  private authMgmt = inject(AuthManagementService);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);
  private translate = inject(TranslateService);
  
  ADMIN_ROLE = ADMIN_ROLE;
  ADMIN_CLAIM = ADMIN_CLAIM;

  roles: any[] = [];
  loading = false;
  
  isRoleModalVisible = false;
  isClaimModalVisible = false;
  
  selectedRole: any = null;
  selectedClaimIds: string[] = [];

  editingRole: any = null;
  roleForm: any = {
    name: '',
    description: '',
    claimIds: []
  };

  searchQuery: any = {
    keyword: '',
    claimIds: []
  };

  ngOnInit(): void {
    this.loadRoles();
  }

  async loadRoles() {
    this.loading = true;
    try {
      const params: any = {};
      if (this.searchQuery.keyword) params.keyword = this.searchQuery.keyword;
      if (this.searchQuery.claimIds && this.searchQuery.claimIds.length > 0) {
        params.claimIds = this.searchQuery.claimIds;
      }
      this.roles = await this.authMgmt.getRoles(params);
    } catch (e) {
      this.message.error(this.translate.instant('Lỗi khi tải vai trò'));
    } finally {
      this.loading = false;
    }
  }

  resetSearch() {
    this.searchQuery = {
      keyword: '',
      claimIds: []
    };
    this.loadRoles();
  }

  showCreateModal() {
    this.editingRole = null;
    this.roleForm = {
      name: '',
      description: '',
      claimIds: []
    };
    this.isRoleModalVisible = true;
  }

  showEditModal(role: any) {
    this.editingRole = role;
    this.roleForm = {
      name: role.name,
      description: role.description,
      claimIds: role.claims?.map((c: any) => c.id) || []
    };
    this.isRoleModalVisible = true;
  }

  async saveRole() {
    if (!this.roleForm.name) {
      this.message.warning(this.translate.instant('Vui lòng nhập tên vai trò'));
      return;
    }

    try {
      if (this.editingRole) {
        await this.authMgmt.updateRole(this.editingRole.id, this.roleForm);
        // Batch assign claims after update
        await this.authMgmt.assignClaimsToRole(this.editingRole.id, this.roleForm.claimIds);
        this.message.success(this.translate.instant('Cập nhật vai trò thành công'));
      } else {
        const newRole: any = await this.authMgmt.createRole(this.roleForm);
        // Assign claims for new role
        if (newRole && newRole.id) {
          await this.authMgmt.assignClaimsToRole(newRole.id, this.roleForm.claimIds);
        }
        this.message.success(this.translate.instant('Thêm vai trò thành công'));
      }
      this.isRoleModalVisible = false;
      this.loadRoles();
    } catch (e) {
      this.message.error(this.translate.instant('Lỗi khi lưu vai trò'));
    }
  }

  showClaimModal(role: any) {
    this.selectedRole = role;
    this.selectedClaimIds = role.claims?.map((c: any) => c.id) || [];
    this.isClaimModalVisible = true;
  }

  async assignClaim() {
    try {
      await this.authMgmt.assignClaimsToRole(this.selectedRole.id, this.selectedClaimIds);
      this.message.success(this.translate.instant('Cập nhật quyền thành công'));
      this.isClaimModalVisible = false;
      this.loadRoles();
    } catch (e) {
      this.message.error(this.translate.instant('Cập nhật quyền thất bại'));
    }
  }

  async removeClaim(role: any, claim: any) {
    this.modal.confirm({
      nzTitle: `${this.translate.instant('Xác nhận')}?`,
      nzContent: `${this.translate.instant('Xóa')} ${claim.name} ${this.translate.instant('khỏi')} ${role.name}?`,
      nzOnOk: async () => {
        try {
          await this.authMgmt.removeClaimFromRole(role.id, claim.id);
          this.message.success(this.translate.instant('Xóa quyền thành công'));
          this.loadRoles();
        } catch (e) {
          this.message.error(this.translate.instant('Xóa quyền thất bại'));
        }
      }
    });
  }

  async deleteRole(role: any) {
    if (role.name?.toLowerCase() === ADMIN_ROLE.toLowerCase()) {
      this.message.warning(this.translate.instant(`Không thể xóa vai trò ${ADMIN_ROLE}`));
      return;
    }

    this.modal.confirm({
      nzTitle: `${this.translate.instant('Xác nhận xóa vai trò')} ${role.name}?`,
      nzContent: this.translate.instant('Hành động này không thể hoàn tác'),
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.authMgmt.deleteRole(role.id);
          this.message.success(this.translate.instant('Xóa vai trò thành công'));
          this.loadRoles();
        } catch (e: any) {
          this.message.error(e.error?.message || this.translate.instant('Xóa vai trò thất bại'));
        }
      }
    });
  }
}
