import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
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
    NzDividerModule
  ],
  template: `
    <div class="page-header">
      <h2>ACL Management</h2>
      <nz-card class="filter-card">
        <div class="filter-box">
          <div class="filter-item">
            <span class="label">Resource Type:</span>
            <input nz-input [(ngModel)]="filter.resourceType" placeholder="e.g. order" style="width: 150px" />
          </div>
          <div class="filter-item">
            <span class="label">Resource Id:</span>
            <input nz-input [(ngModel)]="filter.resourceId" placeholder="e.g. 123 or *" style="width: 150px" />
          </div>
          <button nz-button nzType="primary" (click)="loadAcl()">
            <span nz-icon nzType="search"></span> Search
          </button>
          <button nz-button nzType="default" (click)="showCreateModal()">
            <span nz-icon nzType="plus"></span> Add Entry
          </button>
        </div>
      </nz-card>
    </div>

    <nz-table #basicTable [nzData]="aclEntries" [nzLoading]="loading">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Resource</th>
          <th>Access Mask</th>
          <th nzWidth="100px">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of basicTable.data">
          <td>
            <div *ngIf="data.userId" class="subject-info">
              <span nz-icon nzType="user"></span>
              <span>User: <strong>{{ data.userId }}</strong></span>
            </div>
            <div *ngIf="data.roleId" class="subject-info">
              <span nz-icon nzType="team"></span>
              <span>Role: <strong>{{ data.roleId }}</strong></span>
            </div>
          </td>
          <td>
            <nz-tag>{{ data.resourceType }}</nz-tag>
            <code>{{ data.resourceId }}</code>
          </td>
          <td>
            <div class="mask-display">
              <span class="mask-value">{{ data.permissionMask }}</span>
              <div class="mask-details">
                <nz-tag *ngIf="hasMask(data.permissionMask, 1)" nzColor="blue">Read</nz-tag>
                <nz-tag *ngIf="hasMask(data.permissionMask, 2)" nzColor="green">Write</nz-tag>
                <nz-tag *ngIf="hasMask(data.permissionMask, 4)" nzColor="red">Delete</nz-tag>
                <nz-tag *ngIf="hasMask(data.permissionMask, 8)" nzColor="orange">Share</nz-tag>
              </div>
            </div>
          </td>
          <td>
            <button nz-button nzType="primary" nzDanger nzSize="small" (click)="deleteAcl(data.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </nz-table>

    <nz-modal [(nzVisible)]="isCreateModalVisible" nzTitle="Add ACL Entry" (nzOnCancel)="isCreateModalVisible = false" (nzOnOk)="createAcl()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label [nzSpan]="null">Subject Type</nz-form-label>
            <nz-form-control>
              <nz-radio-group [(ngModel)]="newEntry.subjectType" name="subjectType">
                <label nz-radio nzValue="user">User</label>
                <label nz-radio nzValue="role">Role</label>
              </nz-radio-group>
            </nz-form-control>
          </nz-form-item>
          
          <nz-form-item *ngIf="newEntry.subjectType === 'user'">
            <nz-form-label [nzSpan]="null">Select User</nz-form-label>
            <nz-form-control>
              <nz-select [(ngModel)]="newEntry.userId" name="userId" nzShowSearch nzPlaceHolder="Search user by username">
                <nz-option *ngFor="let u of availableUsers" [nzValue]="u.id" [nzLabel]="u.username + ' (' + u.displayName + ')'"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item *ngIf="newEntry.subjectType === 'role'">
            <nz-form-label [nzSpan]="null">Select Role</nz-form-label>
            <nz-form-control>
              <nz-select [(ngModel)]="newEntry.roleId" name="roleId" nzShowSearch nzPlaceHolder="Search role by name">
                <nz-option *ngFor="let r of availableRoles" [nzValue]="r.id" [nzLabel]="r.name"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-divider></nz-divider>

          <nz-form-item>
            <nz-form-label [nzSpan]="null">Resource</nz-form-label>
            <nz-form-control>
              <div style="display: flex; gap: 8px;">
                <input nz-input [(ngModel)]="newEntry.resourceType" name="resType" placeholder="Type" style="width: 120px" />
                <input nz-input [(ngModel)]="newEntry.resourceId" name="resId" placeholder="ID or *" style="flex: 1" />
              </div>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="null">Access Levels</nz-form-label>
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

  aclEntries: any[] = [];
  loading = false;
  
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

  ngOnInit(): void {
    this.loadMetadata();
  }

  async loadMetadata() {
    try {
      this.availableUsers = await this.authMgmt.getUsers();
      this.availableRoles = await this.authMgmt.getRoles();
    } catch (e) {}
  }

  hasMask(mask: number, bit: number): boolean {
    return (mask & bit) === bit;
  }

  async loadAcl() {
    if (!this.filter.resourceType || !this.filter.resourceId) {
      this.message.warning('Please enter both Resource Type and Resource Id');
      return;
    }
    this.loading = true;
    try {
      this.aclEntries = await this.authMgmt.getAcl(this.filter.resourceType, this.filter.resourceId);
    } catch (e) {
      this.message.error('Failed to load ACL entries');
    } finally {
      this.loading = false;
    }
  }

  showCreateModal() {
    this.newEntry = { subjectType: 'user', userId: '', roleId: '', resourceType: this.filter.resourceType, resourceId: this.filter.resourceId, permissionMask: 0 };
    this.accessOptions.forEach(o => o.checked = false);
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
      await this.authMgmt.addAcl(payload);
      this.message.success('ACL entry added successfully');
      this.isCreateModalVisible = false;
      if (this.filter.resourceType === payload.resourceType && this.filter.resourceId === payload.resourceId) {
        this.loadAcl();
      }
    } catch (e) {
      this.message.error('Failed to add ACL entry');
    }
  }

  async deleteAcl(id: string) {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this ACL entry?',
      nzOnOk: async () => {
        try {
          await this.authMgmt.removeAcl(id);
          this.message.success('ACL entry deleted successfully');
          this.loadAcl();
        } catch (e) {
          this.message.error('Failed to delete ACL entry');
        }
      }
    });
  }
}
