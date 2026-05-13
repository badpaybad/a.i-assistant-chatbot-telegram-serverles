import { Routes } from '@angular/router';
import { claimGuard } from './core/auth/claim.guard';
import { APP_CLAIMS } from './core/auth/claims.config';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { DashboardComponent } from './modules/cqrs-dashboard/dashboard/dashboard.component';
import { TracingComponent } from './modules/cqrs-dashboard/tracing/tracing.component';
import { MessageListComponent } from './modules/cqrs-dashboard/message-list/message-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'modules/cqrs-dashboard', pathMatch: 'full' },
      {
        path: 'modules/cqrs-dashboard',
        data: { breadcrumb: 'CQRS Dashboard' },
        children: [
          { 
            path: '', 
            component: DashboardComponent,
            canActivate: [claimGuard(APP_CLAIMS.CQRS_DASHBOARD.VIEW)]
          },
          { 
            path: 'tracing/:id', 
            component: TracingComponent,
            canActivate: [claimGuard(APP_CLAIMS.CQRS_DASHBOARD.VIEW)],
            data: { breadcrumb: 'Tracing' }
          },
          { 
            path: 'messages/:queueName', 
            component: MessageListComponent,
            canActivate: [claimGuard(APP_CLAIMS.CQRS_DASHBOARD.VIEW)],
            data: { breadcrumb: 'Messages' }
          }
        ]
      },
      {
        path: 'modules/test',
        data: { breadcrumb: 'Mô-đun thử nghiệm' },
        children: [
          { 
            path: 'firestore', 
            loadComponent: () => import('./modules/test/firestore-test/firestore-test.component').then(m => m.FirestoreTestComponent),
            data: { breadcrumb: 'Firestore Test' }
          },
          { 
            path: 'fcm', 
            loadComponent: () => import('./modules/test/fcm-test/fcm-test.component').then(m => m.FcmTestComponent),
            data: { breadcrumb: 'FCM Test' }
          },
          { 
            path: 'cqrs', 
            loadComponent: () => import('./modules/cqrs-dashboard/cqrs-test/cqrs-test.component').then(m => m.CqrsTestComponent),
            data: { breadcrumb: 'CQRS Test' }
          }
        ]
      },
      {
        path: 'modules/core-infra-auth',
        data: { breadcrumb: 'Core Infra Auth' },
        children: [
          {
            path: 'users',
            loadComponent: () => import('./modules/core-infra-auth/user-list/user-list.component').then(m => m.UserListComponent),
            canActivate: [claimGuard(APP_CLAIMS.AUTH.VIEW_USERS)],
            data: { breadcrumb: 'Người dùng' }
          },
          {
            path: 'roles',
            loadComponent: () => import('./modules/core-infra-auth/role-list/role-list.component').then(m => m.RoleListComponent),
            canActivate: [claimGuard(APP_CLAIMS.AUTH.VIEW_ROLES)],
            data: { breadcrumb: 'Vai trò' }
          },
          {
            path: 'claims',
            loadComponent: () => import('./modules/core-infra-auth/claim-sync/claim-sync.component').then(m => m.ClaimSyncComponent),
            canActivate: [claimGuard(APP_CLAIMS.AUTH.VIEW_CLAIMS)],
            data: { breadcrumb: 'Quyền' }
          },
          {
            path: 'acl',
            loadComponent: () => import('./modules/core-infra-auth/acl-list/acl-list.component').then(m => m.AclListComponent),
            canActivate: [claimGuard(APP_CLAIMS.AUTH.MANAGE_ACL)],
            data: { breadcrumb: 'Quản lý ACL' }
          },
          {
            path: 'change-password',
            loadComponent: () => import('./modules/core-infra-auth/change-password/change-password.component').then(m => m.ChangePasswordComponent),
            data: { breadcrumb: 'Đổi mật khẩu' }
          },
          {
            path: 'authorize-info',
            loadComponent: () => import('./modules/core-infra-auth/authorize-info/authorize-info.component').then(m => m.AuthorizeInfoComponent),
            data: { breadcrumb: 'Thông tin phân quyền' }
          }

        ]
      }

    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ]
  }
];
