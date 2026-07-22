import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ADMIN_CLAIM, ADMIN_ROLE, APP_CLAIMS, AuthService, CLAIMS_VERSION, AppNotificationService } from '@tot/core';

import { TranslocoModule } from '@jsverse/transloco';
import { TotTableComponent, TotTableColumn, TotCellDirective } from '@tot/shared';

@Component({
  selector: 'app-authorize-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzTagModule,
    NzDescriptionsModule,
    NzTabsModule,
    NzIconModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzDividerModule,
    TranslocoModule,
    TotTableComponent,
    TotCellDirective
  ],
  template: `
    <div class="authorize-info-container">
      <div class="page-header">
        <h2>{{ 'Thông tin phân quyền' | transloco }}</h2>
        <p class="subtitle">{{ 'Tổng quan về cơ chế phân quyền đang được áp dụng' | transloco }}</p>
      </div>

      <nz-tabs>
        <nz-tab [nzTitle]="'Quyền của tôi' | transloco">
          <div class="tab-content">
            <nz-card [nzTitle]="'Thông tin người dùng' | transloco" class="info-card">
              <nz-descriptions [nzColumn]="1" nzBordered>
                <nz-descriptions-item [nzTitle]="'Vai trò (Roles)' | transloco">
                  <nz-tag *ngFor="let role of userRoles" [nzColor]="role === ADMIN_ROLE ? 'gold' : 'blue'">
                    {{ role }}
                  </nz-tag>
                  <span *ngIf="userRoles.length === 0" class="empty-text">{{ 'Không có vai trò' | transloco }}</span>
                </nz-descriptions-item>
                <nz-descriptions-item [nzTitle]="'Quyền hạn (Claims)' | transloco">
                  <div class="claims-list">
                    <nz-tag *ngFor="let claim of userClaims" [nzColor]="claim === ADMIN_CLAIM ? 'volcano' : 'green'">
                      {{ claim }}
                    </nz-tag>
                  </div>
                  <span *ngIf="userClaims.length === 0" class="empty-text">{{ 'Không có quyền hạn' | transloco }}</span>
                </nz-descriptions-item>
              </nz-descriptions>
            </nz-card>

            <nz-card [nzTitle]="'Trạng thái Admin' | transloco" class="info-card" *ngIf="isAdmin">
              <div class="admin-notice">
                <span nz-icon nzType="safety-certificate" nzTheme="twotone" [nzTwotoneColor]="'#52c41a'"></span>
                <p><strong>{{ 'Bạn đang có quyền Admin tối cao.' | transloco }}</strong></p>
                <p>{{ 'Hệ thống sẽ bỏ qua mọi bước kiểm tra quyền hạn và cho phép bạn truy cập tất cả các tính năng.' | transloco }}</p>
              </div>
            </nz-card>
          </div>
        </nz-tab>

        <nz-tab [nzTitle]="'Bảo mật & MFA' | transloco">
          <div class="tab-content mfa-tab">
            <!-- Case 1: MFA is enabled -->
            <div *ngIf="isMfaEnabled" class="mfa-enabled-container animate-fade-in">
              <nz-card class="info-card premium-card text-center" [nzBordered]="false">
                <div class="mfa-success-icon">
                  <span nz-icon nzType="check-circle" nzTheme="fill" class="green-icon"></span>
                </div>
                <h3 class="mfa-status-title">{{ 'Xác thực 2 lớp (MFA) đang hoạt động' | transloco }}</h3>
                <p class="mfa-status-desc">
                  {{ 'Tài khoản của bạn được bảo vệ bằng lớp bảo mật bổ sung. Khi đăng nhập, bạn cần nhập mã xác thực OTP từ thiết bị.' | transloco }}
                </p>
                <div class="mfa-provider-badge">
                  <span class="label">{{ 'Phương thức hiện tại:' | transloco }}</span>
                  <nz-tag nzColor="success" class="mfa-tag">
                    <span nz-icon [nzType]="preferredMfaProvider === 'Totp' ? 'key' : preferredMfaProvider === 'Sms' ? 'phone' : 'mail'"></span>
                    &nbsp;{{ (preferredMfaProvider === 'Totp' ? 'Ứng dụng Authenticator' : preferredMfaProvider === 'Sms' ? 'Tin nhắn SMS' : 'Email OTP') | transloco }}
                  </nz-tag>
                </div>
                <div class="mfa-actions">
                  <button nz-button nzType="primary" nzDanger (click)="showDisableModal()" [nzLoading]="loading" class="premium-button">
                    <span nz-icon nzType="stop"></span> {{ 'Tắt xác thực 2 lớp' | transloco }}
                  </button>
                </div>
              </nz-card>
            </div>

            <!-- Case 2: MFA is disabled -->
            <div *ngIf="!isMfaEnabled" class="mfa-disabled-container animate-fade-in">
              
              <!-- Step 0: Select Provider -->
              <div *ngIf="mfaSetupStep === 0">
                <nz-card [nzTitle]="'Kích hoạt Xác thực 2 lớp' | transloco" class="info-card">
                  <p class="mfa-intro-text">
                    {{ 'Xác thực 2 lớp (MFA) bổ sung thêm một bước bảo mật khi đăng nhập, yêu cầu mã OTP từ ứng dụng điện thoại hoặc qua SMS/Email.' | transloco }}
                  </p>
                  
                  <div class="provider-selector-section">
                    <label class="provider-label"><strong>{{ 'Chọn phương thức xác thực:' | transloco }}</strong></label>
                    <nz-select [(ngModel)]="selectedProvider" style="width: 100%; max-width: 400px; margin-top: 8px; display: block;" class="premium-select">
                      <nz-option nzValue="Totp" [nzLabel]="'Ứng dụng xác thực (Google/Microsoft Authenticator)' | transloco"></nz-option>
                      <nz-option nzValue="Sms" [nzLabel]="'Tin nhắn SMS OTP' | transloco"></nz-option>
                      <nz-option nzValue="Email" [nzLabel]="'Email OTP' | transloco"></nz-option>
                    </nz-select>
                  </div>

                  <div style="margin-top: 24px;">
                    <button nz-button nzType="primary" (click)="setupMfa()" [nzLoading]="loading" class="premium-button">
                      {{ 'Bắt đầu thiết lập' | transloco }} <span nz-icon nzType="arrow-right"></span>
                    </button>
                  </div>
                </nz-card>
              </div>

              <!-- Step 1: Scan QR / Receive Code & Verify -->
              <div *ngIf="mfaSetupStep === 1">
                <nz-card [nzTitle]="'Thiết lập phương thức xác thực' | transloco" class="info-card">
                  
                  <!-- TOTP setup details -->
                  <div *ngIf="selectedProvider === 'Totp'" class="totp-setup-flow">
                    <p>{{ 'Bước 1: Quét mã QR dưới đây bằng ứng dụng xác thực của bạn (ví dụ: Google Authenticator, Microsoft Authenticator hoặc Authy).' | transloco }}</p>
                    <div class="qr-code-wrapper text-center">
                      <img [src]="getQrCodeUrl(mfaSetupResult?.qrCodeUri)" alt="MFA QR Code" class="mfa-qr-img" />
                    </div>
                    
                    <p style="margin-top: 16px;">{{ 'Hoặc nhập khóa bí mật này thủ công vào ứng dụng:' | transloco }}</p>
                    <div class="secret-key-box">
                      <code>{{ mfaSetupResult?.secretKey }}</code>
                    </div>
                  </div>

                  <!-- SMS / Email setup details -->
                  <div *ngIf="selectedProvider !== 'Totp'" class="out-of-band-setup-flow">
                    <p>{{ 'Mã xác thực OTP đã được gửi đến thiết bị của bạn:' | transloco }}</p>
                    <div class="destination-box">
                      <span nz-icon [nzType]="selectedProvider === 'Sms' ? 'phone' : 'mail'"></span>
                      <strong>{{ mfaSetupResult?.destination }}</strong>
                    </div>
                    <p class="helper-text">{{ 'Vui lòng kiểm tra console log / thiết bị và nhập mã OTP 6 số để hoàn tất kích hoạt.' | transloco }}</p>
                  </div>

                  <nz-divider></nz-divider>

                  <div class="otp-verification-section">
                    <label><strong>{{ 'Bước 2: Nhập mã xác thực để kích hoạt:' | transloco }}</strong></label>
                    <div style="margin-top: 8px; max-width: 300px;">
                      <input nz-input [(ngModel)]="otpCode" [placeholder]="'Nhập mã OTP' | transloco" class="premium-input" style="text-align: center; font-size: 18px; letter-spacing: 4px;" maxlength="8" />
                    </div>
                  </div>

                  <div style="margin-top: 24px;" class="setup-actions">
                    <button nz-button nzType="primary" (click)="verifyAndEnableMfa()" [nzLoading]="loading" class="premium-button" style="margin-right: 12px;">
                      {{ 'Kích hoạt' | transloco }} <span nz-icon nzType="check"></span>
                    </button>
                    <button nz-button nzType="default" (click)="cancelMfaSetup()" [disabled]="loading" class="premium-button">
                      {{ 'Hủy' | transloco }}
                    </button>
                  </div>
                </nz-card>
              </div>

              <!-- Step 2: Show Backup Codes -->
              <div *ngIf="mfaSetupStep === 2">
                <nz-card [nzTitle]="'Kích hoạt thành công!' | transloco" class="info-card premium-card">
                  <div class="success-notice">
                    <span nz-icon nzType="check-circle" nzTheme="twotone" [nzTwotoneColor]="'#52c41a'"></span>
                    <h4>{{ 'Lưu lại các mã khôi phục dự phòng' | transloco }}</h4>
                  </div>
                  
                  <div class="backup-codes-warning">
                    <p class="warning-text">
                      <strong>{{ 'QUAN TRỌNG: Hãy sao chép hoặc tải các mã này về máy.' | transloco }}</strong> 
                      {{ 'Chúng chỉ được hiển thị MỘT LẦN DUY NHẤT. Nếu bạn mất điện thoại hoặc không nhận được OTP, bạn có thể dùng các mã này để đăng nhập.' | transloco }}
                    </p>
                  </div>

                  <div class="backup-codes-grid">
                    <div *ngFor="let code of backupCodes" class="backup-code-item">
                      <code>{{ code }}</code>
                    </div>
                  </div>

                  <div class="backup-actions text-center" style="margin-top: 24px;">
                    <button nz-button nzType="default" (click)="copyBackupCodes()" class="premium-button" style="margin-right: 12px;">
                      <span nz-icon nzType="copy"></span> {{ 'Sao chép tất cả' | transloco }}
                    </button>
                    <button nz-button nzType="default" (click)="downloadBackupCodes()" class="premium-button" style="margin-right: 12px;">
                      <span nz-icon nzType="download"></span> {{ 'Tải file txt' | transloco }}
                    </button>
                    <button nz-button nzType="primary" (click)="finishMfaSetup()" class="premium-button">
                      {{ 'Hoàn tất' | transloco }}
                    </button>
                  </div>
                </nz-card>
              </div>

            </div>
          </div>
        </nz-tab>

        <nz-tab [nzTitle]="'Cấu hình ứng dụng' | transloco">
          <div class="tab-content">
            <nz-card [nzTitle]="'Phiên bản cấu hình' | transloco" class="info-card">
              <p>{{ 'Phiên bản hiện tại:' | transloco }} <strong>{{ version }}</strong></p>
              <p>{{ 'Admin Claim:' | transloco }} <nz-tag nzColor="volcano">{{ adminClaim }}</nz-tag></p>
            </nz-card>

            <tot-table 
              [title]="'Danh sách Quyền hạn định nghĩa trong FE' | transloco" 
              [data]="pagedClaims" 
              [columns]="claimsColumns"
              [total]="appClaimsList.length"
              [pageIndex]="pageIndex"
              [pageSize]="pageSize"
              [frontPagination]="false"
              (pageIndexChange)="pageIndex = $event"
              (pageSizeChange)="pageSize = $event; pageIndex = 1"
            >
              <ng-template totCell="value" let-data>
                <code>{{ data.value }}</code>
              </ng-template>
            </tot-table>
          </div>
        </nz-tab>
      </nz-tabs>

      <!-- Modal disable MFA -->
      <nz-modal
        [(nzVisible)]="disableModalVisible"
        [nzTitle]="'Tắt xác thực 2 lớp (MFA)' | transloco"
        [nzContent]="modalContent"
        [nzFooter]="modalFooter"
        (nzOnCancel)="closeDisableModal()"
      >
        <ng-template #modalContent>
          <p>{{ 'Để tắt xác thực 2 lớp, vui lòng nhập mã xác thực OTP hiện tại hoặc một mã khôi phục dự phòng:' | transloco }}</p>
          <div style="margin-top: 16px;">
            <input nz-input [(ngModel)]="disableCode" [placeholder]="'Nhập mã OTP hoặc mã dự phòng' | transloco" class="premium-input" style="text-align: center; font-size: 16px;" maxlength="10" />
          </div>
        </ng-template>
        <ng-template #modalFooter>
          <button nz-button nzType="default" (click)="closeDisableModal()" [disabled]="loading">{{ 'Hủy' | transloco }}</button>
          <button nz-button nzType="primary" nzDanger (click)="disableMfa()" [nzLoading]="loading">{{ 'Xác nhận tắt' | transloco }}</button>
        </ng-template>
      </nz-modal>
    </div>
  `,
  styles: [`
    .authorize-info-container {
      padding: 0;
    }
    .page-header {
      margin-bottom: 24px;
    }
    .subtitle {
      color: rgba(0, 0, 0, 0.45);
      margin-top: -16px;
    }
    .tab-content {
      padding: 16px 0;
    }
    .info-card {
      margin-bottom: 24px;
    }
    .claims-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .empty-text {
      color: rgba(0, 0, 0, 0.25);
      font-style: italic;
    }
    .admin-notice {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 16px;
    }
    .admin-notice span {
      font-size: 48px;
      margin-bottom: 16px;
    }
    code {
      background: #f5f5f5;
      padding: 2px 4px;
      border-radius: 4px;
      font-size: 12px;
    }
    .mfa-tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .mfa-enabled-container, .mfa-disabled-container {
      width: 100%;
      max-width: 600px;
    }
    .text-center {
      text-align: center;
    }
    .green-icon {
      font-size: 64px;
      color: #52c41a;
      margin-bottom: 16px;
    }
    .mfa-status-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .mfa-status-desc {
      color: rgba(0, 0, 0, 0.45);
      margin-bottom: 24px;
      line-height: 1.5;
    }
    .mfa-provider-badge {
      margin-bottom: 24px;
      background: rgba(0, 0, 0, 0.02);
      padding: 12px;
      border-radius: 8px;
      border: 1px dashed rgba(0, 0, 0, 0.1);
      display: inline-block;
      width: 100%;
      box-sizing: border-box;
    }
    .mfa-provider-badge .label {
      margin-right: 8px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }
    .provider-selector-section {
      margin-top: 16px;
    }
    .provider-label {
      font-size: 14px;
    }
    .mfa-intro-text {
      color: rgba(0, 0, 0, 0.65);
      line-height: 1.6;
    }
    .qr-code-wrapper {
      background: white;
      padding: 16px;
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      display: inline-block;
      margin: 16px 0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .mfa-qr-img {
      width: 200px;
      height: 200px;
      display: block;
    }
    .secret-key-box, .destination-box {
      background: #fafafa;
      border: 1px solid #f0f0f0;
      padding: 12px;
      border-radius: 6px;
      font-size: 16px;
      letter-spacing: 1px;
      margin: 12px 0;
      display: inline-block;
    }
    .destination-box {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #1890ff;
      justify-content: center;
    }
    .helper-text {
      color: rgba(0, 0, 0, 0.45);
      font-size: 13px;
      margin-top: 8px;
    }
    .success-notice {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .success-notice span {
      font-size: 32px;
    }
    .success-notice h4 {
      margin: 0;
      font-size: 18px;
      color: #52c41a;
    }
    .backup-codes-warning {
      background: #fffbe6;
      border: 1px solid #ffe58f;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 24px;
    }
    .warning-text {
      color: #d46b08;
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
    }
    .backup-codes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 12px;
      margin-bottom: 24px;
    }
    .backup-code-item {
      background: #f5f5f5;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      padding: 10px;
      text-align: center;
      font-size: 15px;
      font-weight: bold;
    }
    .backup-code-item code {
      background: transparent;
      padding: 0;
    }
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class AuthorizeInfoComponent implements OnInit {
  private authService = inject(AuthService);
  private notification = inject(AppNotificationService);

  userRoles: string[] = [];
  userClaims: string[] = [];
  isAdmin = false;
  version = CLAIMS_VERSION;
  adminClaim = ADMIN_CLAIM;
  ADMIN_ROLE = ADMIN_ROLE;
  ADMIN_CLAIM = ADMIN_CLAIM;

  pageIndex = 1;
  pageSize = 10;

  // MFA Properties
  isMfaEnabled = false;
  preferredMfaProvider = '';
  selectedProvider = 'Totp';
  mfaSetupStep = 0; // 0: select provider, 1: setup/verify, 2: backup codes show
  mfaSetupResult: any = null;
  otpCode = '';
  disableCode = '';
  disableModalVisible = false;
  backupCodes: string[] = [];
  loading = false;

  get pagedClaims(): Array<{ module: string, action: string, value: string }> {
    const start = (this.pageIndex - 1) * this.pageSize;
    return this.appClaimsList.slice(start, start + this.pageSize);
  }

  appClaimsList: Array<{ module: string, action: string, value: string }> = [];
  claimsColumns: TotTableColumn[] = [];

  ngOnInit(): void {
    this.claimsColumns = [
      { title: 'Mô-đun', key: 'module', sortable: true },
      { title: 'Hành động', key: 'action', sortable: true },
      { title: 'Giá trị Claim', key: 'value' }
    ];
    this.loadUserData();
    this.processAppClaims();
  }

  private loadUserData() {
    const rawRoles = localStorage.getItem('roles');
    const rawClaims = localStorage.getItem('claims');
    const userProfileRaw = localStorage.getItem('user_profile');

    if (rawRoles) {
      try { this.userRoles = JSON.parse(rawRoles); } catch (e) {}
    }
    if (rawClaims) {
      try { this.userClaims = JSON.parse(rawClaims); } catch (e) {}
    }

    if (userProfileRaw) {
      try {
        const profile = JSON.parse(userProfileRaw);
        this.isMfaEnabled = !!profile.isMfaEnabled;
        this.preferredMfaProvider = profile.preferredMfaProvider || '';
      } catch (e) {}
    }

    this.isAdmin = this.authService.hasClaim(ADMIN_CLAIM);
  }

  private processAppClaims() {
    for (const [module, actions] of Object.entries(APP_CLAIMS)) {
      for (const [action, value] of Object.entries(actions as any)) {
        this.appClaimsList.push({
          module,
          action,
          value: value as string
        });
      }
    }
  }

  async setupMfa() {
    this.loading = true;
    try {
      const res = await this.authService.setupMfa(this.selectedProvider);
      this.mfaSetupResult = res;
      this.mfaSetupStep = 1;
      this.otpCode = '';
      this.notification.success(
        'MFA',
        'Khởi tạo thiết lập MFA thành công.'
      );
    } catch (e: any) {
      console.error(e);
      this.notification.error('Lỗi', e.error?.message || 'Không thể thiết lập MFA');
    } finally {
      this.loading = false;
    }
  }

  async verifyAndEnableMfa() {
    if (!this.otpCode) {
      this.notification.warning('Cảnh báo', 'Vui lòng nhập mã OTP để xác nhận.');
      return;
    }
    this.loading = true;
    try {
      const res = await this.authService.enableMfa(this.selectedProvider, this.otpCode);
      this.backupCodes = res.backupCodes || [];
      this.mfaSetupStep = 2; // Show backup codes
      
      // Re-sync profile to update isMfaEnabled & preferredMfaProvider
      await this.authService.syncClaims();
      this.loadUserData();

      this.notification.success('Thành công', 'MFA đã được kích hoạt thành công.');
    } catch (e: any) {
      console.error(e);
      this.notification.error('Lỗi', e.error?.message || 'Mã OTP không chính xác');
    } finally {
      this.loading = false;
    }
  }

  cancelMfaSetup() {
    this.mfaSetupStep = 0;
    this.mfaSetupResult = null;
    this.otpCode = '';
  }

  finishMfaSetup() {
    this.mfaSetupStep = 0;
    this.mfaSetupResult = null;
    this.otpCode = '';
    this.backupCodes = [];
  }

  showDisableModal() {
    this.disableModalVisible = true;
    this.disableCode = '';
  }

  closeDisableModal() {
    this.disableModalVisible = false;
    this.disableCode = '';
  }

  async disableMfa() {
    if (!this.disableCode) {
      this.notification.warning('Cảnh báo', 'Vui lòng nhập mã xác thực hoặc mã dự phòng.');
      return;
    }
    this.loading = true;
    try {
      await this.authService.disableMfa(this.disableCode);
      this.disableModalVisible = false;
      
      // Re-sync profile
      await this.authService.syncClaims();
      this.loadUserData();

      this.notification.success('Thành công', 'MFA đã được tắt thành công.');
    } catch (e: any) {
      console.error(e);
      this.notification.error('Lỗi', e.error?.message || 'Mã xác thực không chính xác');
    } finally {
      this.loading = false;
    }
  }

  downloadBackupCodes() {
    const username = this.authService.getCurrentUser()?.preferred_username || 'user';
    const text = `MÃ KHÔI PHỤC DỰ PHÒNG MFA - TREE OF THOUGHT\n\n` +
      `Tài khoản: ${username}\n` +
      `Ngày tạo: ${new Date().toLocaleString()}\n\n` +
      `Danh sách mã dự phòng (Mỗi mã chỉ sử dụng 1 lần):\n` +
      this.backupCodes.map((c, i) => `${i + 1}. ${c}`).join('\n') +
      `\n\nHãy lưu trữ tệp tin này ở nơi an toàn.`;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mfa-backup-codes-${username}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  copyBackupCodes() {
    const text = this.backupCodes.join('\n');
    navigator.clipboard.writeText(text).then(() => {
      this.notification.success('Thành công', 'Đã sao chép các mã dự phòng vào clipboard.');
    });
  }

  getQrCodeUrl(uri: string): string {
    if (!uri) return '';
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(uri)}`;
  }
}
