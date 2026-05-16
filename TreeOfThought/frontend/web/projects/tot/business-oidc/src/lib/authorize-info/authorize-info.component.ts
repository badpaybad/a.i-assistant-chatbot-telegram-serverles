import { Component, OnInit, inject, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ADMIN_CLAIM, ADMIN_ROLE, APP_CLAIMS, AuthService, CLAIMS_VERSION } from '@tot/core';

import { TranslocoModule } from '@jsverse/transloco';
import { TotTableComponent, TotTableColumn } from '@tot/shared';

@Component({
  selector: 'app-authorize-info',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTagModule,
    NzDescriptionsModule,
    NzTabsModule,
    NzIconModule,
    TranslocoModule,
    TotTableComponent
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

        <nz-tab [nzTitle]="'Cấu hình ứng dụng' | transloco">
          <div class="tab-content">
            <nz-card [nzTitle]="'Phiên bản cấu hình' | transloco" class="info-card">
              <p>{{ 'Phiên bản hiện tại:' | transloco }} <strong>{{ version }}</strong></p>
              <p>{{ 'Admin Claim:' | transloco }} <nz-tag nzColor="volcano">{{ adminClaim }}</nz-tag></p>
            </nz-card>

            <tot-table 
              [title]="'Danh sách Quyền hạn định nghĩa trong FE' | transloco" 
              [data]="appClaimsList" 
              [columns]="claimsColumns"
              [pageSize]="10"
            >
              <ng-template #valueTpl let-data>
                <code>{{ data.value }}</code>
              </ng-template>
            </tot-table>
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
export class AuthorizeInfoComponent implements OnInit, AfterViewInit {
  private authService = inject(AuthService);

  @ViewChild('valueTpl', { static: true }) valueTpl!: TemplateRef<any>;

  userRoles: string[] = [];
  userClaims: string[] = [];
  isAdmin = false;
  version = CLAIMS_VERSION;
  adminClaim = ADMIN_CLAIM;
  ADMIN_ROLE = ADMIN_ROLE;
  ADMIN_CLAIM = ADMIN_CLAIM;

  appClaimsList: Array<{ module: string, action: string, value: string }> = [];
  claimsColumns: TotTableColumn[] = [];

  ngOnInit(): void {
    this.loadUserData();
    this.processAppClaims();
  }

  ngAfterViewInit(): void {
    this.claimsColumns = [
      { title: 'Mô-đun', key: 'module', sortable: true },
      { title: 'Hành động', key: 'action', sortable: true },
      { title: 'Giá trị Claim', key: 'value', template: this.valueTpl }
    ];
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
