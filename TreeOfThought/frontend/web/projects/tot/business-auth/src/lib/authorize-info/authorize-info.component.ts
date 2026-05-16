import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ADMIN_CLAIM, ADMIN_ROLE, APP_CLAIMS, AuthService, CLAIMS_VERSION } from '@tot/core';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-authorize-info',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTableModule,
    NzTagModule,
    NzDescriptionsModule,
    NzTabsModule,
    NzIconModule,
    TranslateModule
  ],
  template: `
    <div class="authorize-info-container">
      <div class="page-header">
        <h2>{{ 'Thông tin phân quyền' | translate }}</h2>
        <p class="subtitle">{{ 'Tổng quan về cơ chế phân quyền đang được áp dụng' | translate }}</p>
      </div>

      <nz-tabs>
        <nz-tab [nzTitle]="'Quyền của tôi' | translate">
          <div class="tab-content">
            <nz-card [nzTitle]="'Thông tin người dùng' | translate" class="info-card">
              <nz-descriptions [nzColumn]="1" nzBordered>
                <nz-descriptions-item [nzTitle]="'Vai trò (Roles)' | translate">
                  <nz-tag *ngFor="let role of userRoles" [nzColor]="role === ADMIN_ROLE ? 'gold' : 'blue'">
                    {{ role }}
                  </nz-tag>
                  <span *ngIf="userRoles.length === 0" class="empty-text">{{ 'Không có vai trò' | translate }}</span>
                </nz-descriptions-item>
                <nz-descriptions-item [nzTitle]="'Quyền hạn (Claims)' | translate">
                  <div class="claims-list">
                    <nz-tag *ngFor="let claim of userClaims" [nzColor]="claim === ADMIN_CLAIM ? 'volcano' : 'green'">
                      {{ claim }}
                    </nz-tag>
                  </div>
                  <span *ngIf="userClaims.length === 0" class="empty-text">{{ 'Không có quyền hạn' | translate }}</span>
                </nz-descriptions-item>
              </nz-descriptions>
            </nz-card>

            <nz-card [nzTitle]="'Trạng thái Admin' | translate" class="info-card" *ngIf="isAdmin">
              <div class="admin-notice">
                <span nz-icon nzType="safety-certificate" nzTheme="twotone" [nzTwotoneColor]="'#52c41a'"></span>
                <p><strong>{{ 'Bạn đang có quyền Admin tối cao.' | translate }}</strong></p>
                <p>{{ 'Hệ thống sẽ bỏ qua mọi bước kiểm tra quyền hạn và cho phép bạn truy cập tất cả các tính năng.' | translate }}</p>
              </div>
            </nz-card>
          </div>
        </nz-tab>

        <nz-tab [nzTitle]="'Cấu hình ứng dụng' | translate">
          <div class="tab-content">
            <nz-card [nzTitle]="'Phiên bản cấu hình' | translate" class="info-card">
              <p>{{ 'Phiên bản hiện tại:' | translate }} <strong>{{ version }}</strong></p>
              <p>{{ 'Admin Claim:' | translate }} <nz-tag nzColor="volcano">{{ adminClaim }}</nz-tag></p>
            </nz-card>

            <nz-card [nzTitle]="'Danh sách Quyền hạn định nghĩa trong FE' | translate" class="info-card">
              <nz-table #basicTable [nzData]="appClaimsList" nzSize="small" [nzPageSize]="50">
                <thead>
                  <tr>
                    <th>{{ 'Mô-đun' | translate }}</th>
                    <th>{{ 'Hành động' | translate }}</th>
                    <th>{{ 'Giá trị Claim' | translate }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let data of basicTable.data">
                    <td><strong>{{ data.module }}</strong></td>
                    <td>{{ data.action }}</td>
                    <td><code>{{ data.value }}</code></td>
                  </tr>
                </tbody>
              </nz-table>
            </nz-card>
          </div>
        </nz-tab>
      </nz-tabs>

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
  `]
})
export class AuthorizeInfoComponent implements OnInit {
  private authService = inject(AuthService);

  userRoles: string[] = [];
  userClaims: string[] = [];
  isAdmin = false;
  version = CLAIMS_VERSION;
  adminClaim = ADMIN_CLAIM;
  ADMIN_ROLE = ADMIN_ROLE;
  ADMIN_CLAIM = ADMIN_CLAIM;

  appClaimsList: Array<{ module: string, action: string, value: string }> = [];

  ngOnInit(): void {
    this.loadUserData();
    this.processAppClaims();
  }

  private loadUserData() {
    const rawRoles = localStorage.getItem('roles');
    const rawClaims = localStorage.getItem('claims');

    if (rawRoles) {
      try { this.userRoles = JSON.parse(rawRoles); } catch (e) {}
    }
    if (rawClaims) {
      try { this.userClaims = JSON.parse(rawClaims); } catch (e) {}
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
}
