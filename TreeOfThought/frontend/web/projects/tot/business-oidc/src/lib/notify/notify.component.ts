import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { AuthManagementService } from '../services/auth-management.service';
import { TotButtonComponent, TotTableComponent, TotTableColumn, TotCellDirective } from '@tot/shared';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { FirebaseService, AuthService } from '@tot/core';

@Component({
  selector: 'tot-notify',
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
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzAvatarModule,
    TotButtonComponent,
    TotTableComponent,
    TotCellDirective,
    TranslocoModule
  ],
  template: `
    <div class="page-header">
      <h2>{{ 'Gửi thông báo FCM' | transloco }}</h2>
    </div>

    <nz-card class="search-card" [nzTitle]="'Tìm kiếm người dùng' | transloco">
      <div nz-row [nzGutter]="[16, 16]" nzAlign="middle">
        <div nz-col [nzSpan]="18">
          <nz-input-group [nzSuffix]="suffixIconSearch">
            <input 
              type="text" 
              nz-input 
              [(ngModel)]="searchKeyword" 
              [placeholder]="'Tìm theo Username hoặc Email' | transloco" 
              (keyup.enter)="search()" 
            />
          </nz-input-group>
          <ng-template #suffixIconSearch>
            <span nz-icon nzType="search"></span>
          </ng-template>
        </div>
        <div nz-col [nzSpan]="6" class="search-actions">
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
      [frontPagination]="false"
      [pageIndex]="pageIndex"
      [pageSize]="pageSize"
      [total]="totalUsers"
      (queryParamsChange)="onQueryParamsChange($event)"
    >
      <ng-template totCell="avatar" let-data>
        <nz-avatar [nzSrc]="data.avatarUrl" nzIcon="user" [nzSize]="40"></nz-avatar>
      </ng-template>

      <ng-template totCell="user" let-data>
        <div class="user-cell">
          <strong>{{ data.displayName }}</strong>
          <span class="sub-text">{{ data.username }}</span>
        </div>
      </ng-template>

      <ng-template totCell="action" let-data>
        <tot-button nzType="primary" nzSize="small" (click)="openSendModal(data)">
          <span nz-icon nzType="notification"></span> {{ 'Gửi thông báo' | transloco }}
        </tot-button>
      </ng-template>
    </tot-table>

    <!-- Modal gửi thông báo FCM -->
    <nz-modal 
      [(nzVisible)]="isModalVisible" 
      [nzTitle]="modalTitle" 
      [nzOkText]="'Gửi' | transloco" 
      [nzCancelText]="'Hủy' | transloco"
      [nzOkLoading]="sending"
      (nzOnCancel)="closeModal()" 
      (nzOnOk)="send()"
    >
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Chọn thiết bị nhận' | transloco }}</nz-form-label>
            <nz-form-control [nzErrorTip]="'Vui lòng chọn thiết bị nhận' | transloco">
              <nz-select 
                [(ngModel)]="payload.fcmToken" 
                name="fcmToken" 
                [nzPlaceHolder]="'Vui lòng chọn thiết bị' | transloco" 
                [nzLoading]="loadingTokens"
                style="width: 100%"
              >
                <nz-option 
                  *ngFor="let t of fcmTokens" 
                  [nzValue]="t.fcmToken" 
                  [nzLabel]="getDeviceLabel(t)"
                ></nz-option>
              </nz-select>
              <div *ngIf="!loadingTokens && fcmTokens.length === 0" class="no-devices-warning">
                <span nz-icon nzType="warning" nzTheme="outline"></span> 
                {{ 'Người dùng này chưa đăng ký thiết bị nhận thông báo nào.' | transloco }}
              </div>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Tiêu đề thông báo' | transloco }}</nz-form-label>
            <nz-form-control [nzErrorTip]="'Vui lòng nhập tiêu đề' | transloco">
              <input 
                nz-input 
                [(ngModel)]="payload.title" 
                name="title" 
                [placeholder]="'Nhập tiêu đề' | transloco" 
                required 
              />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Nội dung thông báo' | transloco }}</nz-form-label>
            <nz-form-control [nzErrorTip]="'Vui lòng nhập nội dung' | transloco">
              <textarea 
                nz-input 
                [(ngModel)]="payload.body" 
                name="body" 
                [nzAutosize]="{ minRows: 3, maxRows: 6 }" 
                [placeholder]="'Nhập nội dung thông báo' | transloco" 
                required
              ></textarea>
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>
  `,
  styles: [`
    .page-header {
      margin-bottom: 16px;
    }
    .search-card {
      margin-bottom: 16px;
    }
    .search-actions {
      display: flex;
      justify-content: flex-end;
    }
    .user-cell {
      display: flex;
      flex-direction: column;
    }
    .sub-text {
      font-size: 12px;
      color: #888;
    }
    .no-devices-warning {
      color: #faad14;
      font-size: 13px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
  `]
})
export class NotifyComponent implements OnInit {
  private authMgmt = inject(AuthManagementService);
  private message = inject(NzMessageService);
  private translate = inject(TranslocoService);
  private cdr = inject(ChangeDetectorRef);
  private firebase = inject(FirebaseService);
  private auth = inject(AuthService);

  users: any[] = [];
  loading = false;
  
  pageIndex = 1;
  pageSize = 10;
  totalUsers = 0;
  searchKeyword = '';

  userColumns: TotTableColumn[] = [];

  // Modal State
  isModalVisible = false;
  modalTitle = '';
  selectedUser: any = null;
  loadingTokens = false;
  sending = false;
  fcmTokens: any[] = [];
  currentToken: string | null = null;
  
  payload = {
    fcmToken: '',
    title: '',
    body: ''
  };

  ngOnInit(): void {
    this.userColumns = [
      { title: 'Avatar', key: 'avatar', width: '80px' },
      { title: 'Người dùng', key: 'user' },
      { title: 'Email', key: 'email' },
      { title: 'Hành động', key: 'action', width: '180px', right: true }
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
      if (this.searchKeyword) {
        params.keyword = this.searchKeyword.trim();
      }

      const res: any = await this.authMgmt.getUsers(params);
      this.users = res.items || [];
      this.totalUsers = res.total || 0;
    } catch (e) {
      this.message.error(this.translate.translate('Lỗi khi tải danh sách người dùng'));
    } finally {
      this.loading = false;
      this.cdr.markForCheck();
    }
  }

  search() {
    this.pageIndex = 1;
    this.loadUsers();
  }

  resetSearch() {
    this.searchKeyword = '';
    this.pageIndex = 1;
    this.loadUsers();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadUsers();
  }

  async openSendModal(user: any) {
    this.selectedUser = user;
    this.modalTitle = `${this.translate.translate('Gửi thông báo tới')} ${user.displayName}`;
    this.fcmTokens = [];
    this.payload = {
      fcmToken: '',
      title: '',
      body: ''
    };
    this.isModalVisible = true;
    this.loadingTokens = true;

    try {
      try {
        this.currentToken = await this.firebase.getFCMToken();
      } catch (e) {
        console.warn('Failed to get current FCM token', e);
        this.currentToken = null;
      }

      const tokens: any = await this.authMgmt.getUserFcmTokens(user.id);
      this.fcmTokens = tokens ? [...tokens] : [];

      const currentUser = this.auth.getCurrentUser();
      const isSelf = currentUser && currentUser.id === user.id;

      if (this.currentToken && isSelf) {
        const hasCurrentToken = this.fcmTokens.some(t => t.fcmToken === this.currentToken);
        if (!hasCurrentToken) {
          this.fcmTokens.unshift({
            fcmToken: this.currentToken,
            deviceId: 'Thiết bị hiện tại (Chưa lưu)',
            appType: 'web'
          });
        }
      }

      if (this.fcmTokens.length > 0) {
        const currentTokenObj = this.fcmTokens.find(t => t.fcmToken === this.currentToken);
        this.payload.fcmToken = currentTokenObj ? currentTokenObj.fcmToken : this.fcmTokens[0].fcmToken;
      }
    } catch (e) {
      this.message.error(this.translate.translate('Lỗi khi tải danh sách thiết bị nhận'));
    } finally {
      this.loadingTokens = false;
      this.cdr.markForCheck();
    }
  }

  closeModal() {
    this.isModalVisible = false;
    this.selectedUser = null;
  }

  getDeviceLabel(token: any): string {
    const isCurrent = this.currentToken && token.fcmToken === this.currentToken;
    const currentSuffix = isCurrent ? ` (${this.translate.translate('Thiết bị hiện tại')})` : '';
    const appTypeLabel = token.appType ? ` (${token.appType})` : '';
    if (token.deviceId) {
      return `Thiết bị: ${token.deviceId}${appTypeLabel}${currentSuffix}`;
    }
    return `Token: ${token.fcmToken.substring(0, 15)}...${appTypeLabel}${currentSuffix}`;
  }

  send() {
    if (!this.payload.fcmToken) {
      this.message.warning(this.translate.translate('Vui lòng chọn thiết bị nhận'));
      return;
    }
    if (!this.payload.title.trim()) {
      this.message.warning(this.translate.translate('Vui lòng nhập tiêu đề'));
      return;
    }
    if (!this.payload.body.trim()) {
      this.message.warning(this.translate.translate('Vui lòng nhập nội dung'));
      return;
    }

    this.sending = true;
    try {
      this.authMgmt.sendNotification({
        fcmToken: this.payload.fcmToken,
        title: this.payload.title.trim(),
        body: this.payload.body.trim()
      }, (data: any) => {
        this.sending = false;
        if (data.status === 'Completed') {
          this.message.success(data.message || this.translate.translate('Gửi thông báo thành công'));
          this.closeModal();
        } else if (data.status === 'Error') {
          this.message.error(data.message || this.translate.translate('Gửi thông báo thất bại'));
        }
        this.cdr.markForCheck();
      });
    } catch (e) {
      this.sending = false;
      this.message.error(this.translate.translate('Gửi thông báo thất bại'));
      this.cdr.markForCheck();
    }
  }
}
