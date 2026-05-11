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
import { AuthManagementService } from '../services/auth-management.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppSelectComponent } from '../../../shared';

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

    <nz-table #basicTable [nzData]="roles" [nzLoading]="loading">
      <thead>
        <tr>
          <th nzWidth="200px">{{ 'Vai trò' | translate }}</th>
          <th>Description</th>
          <th>{{ 'Quyền' | translate }}</th>
          <th nzWidth="120px">{{ 'Hành động' | translate }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of basicTable.data">
          <td><strong>{{ data.name }}</strong></td>
          <td>{{ data.description }}</td>
          <td>
            <div class="claim-tags">
              <nz-tag *ngFor="let claim of data.claims" nzColor="blue" nzMode="closeable" (nzOnClose)="removeClaim(data, claim)">
                {{ claim.name }}
              </nz-tag>
              <button nz-button nzType="dashed" nzSize="small" (click)="showClaimModal(data)">
                <span nz-icon nzType="plus"></span>
              </button>
            </div>
          </td>
          <td>
            <nz-space>
              <button *nzSpaceItem nz-button nzType="primary" nzDanger nzSize="small" (click)="deleteRole(data)">{{ 'Xóa' | translate }}</button>
            </nz-space>
          </td>
        </tr>
      </tbody>
    </nz-table>

    <nz-modal [(nzVisible)]="isCreateModalVisible" [nzTitle]="'Thêm mới' | translate" (nzOnCancel)="isCreateModalVisible = false" (nzOnOk)="createRole()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'Vai trò' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="newRole.name" name="name" placeholder="e.g. manager" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSpan]="null">Description</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="newRole.description" name="description" placeholder="Role description" />
            </nz-form-control>
          </nz-form-item>
        </form>
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

  roles: any[] = [];
  loading = false;
  
  availableClaims: any[] = [];
  
  isCreateModalVisible = false;
  isClaimModalVisible = false;
  
  newRole = { name: '', description: '' };
  selectedRole: any = null;
  selectedClaimId = '';

  ngOnInit(): void {
    this.loadRoles();
    this.loadMetadata();
  }

  async loadRoles() {
    this.loading = true;
    try {
      this.roles = await this.authMgmt.getRoles();
    } catch (e) {
      this.message.error('Failed to load roles');
    } finally {
      this.loading = false;
    }
  }

  async loadMetadata() {
    try {
      this.availableClaims = await this.authMgmt.getClaims();
    } catch (e) {
      console.error('Failed to load metadata', e);
    }
  }

  showCreateModal() {
    this.newRole = { name: '', description: '' };
    this.isCreateModalVisible = true;
  }

  async createRole() {
    if (!this.newRole.name) return;
    try {
      await this.authMgmt.createRole(this.newRole);
      this.message.success('Role created successfully');
      this.isCreateModalVisible = false;
      this.loadRoles();
    } catch (e) {
      this.message.error('Failed to create role');
    }
  }

  showClaimModal(role: any) {
    this.selectedRole = role;
    this.selectedClaimId = '';
    this.isClaimModalVisible = true;
  }

  async assignClaim() {
    if (!this.selectedClaimId) return;
    try {
      await this.authMgmt.assignClaimToRole(this.selectedRole.id, this.selectedClaimId);
      this.message.success('Claim assigned successfully');
      this.isClaimModalVisible = false;
      this.loadRoles();
    } catch (e) {
      this.message.error('Failed to assign claim');
    }
  }

  async removeClaim(role: any, claim: any) {
    this.modal.confirm({
      nzTitle: `${this.translate.instant('Xác nhận')}?`,
      nzContent: `${this.translate.instant('Xóa')} ${claim.name} ${this.translate.instant('khỏi')} ${role.name}?`,
      nzOnOk: async () => {
        try {
          await this.authMgmt.removeClaimFromRole(role.id, claim.id);
          this.message.success('Claim removed successfully');
          this.loadRoles();
        } catch (e) {
          this.message.error('Failed to remove claim');
        }
      }
    });
  }

  async deleteRole(role: any) {
    this.modal.confirm({
      nzTitle: `${this.translate.instant('Xác nhận')}?`,
      nzContent: `${this.translate.instant('Xóa')} ${role.name}?`,
      nzOkDanger: true,
      nzOnOk: async () => {
        this.message.info('Role deletion not yet fully implemented');
      }
    });
  }
}
