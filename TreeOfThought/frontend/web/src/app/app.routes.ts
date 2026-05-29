import { Routes } from '@angular/router';
import { APP_CLAIMS, claimGuard } from '@tot/core';


import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';

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
            loadComponent: () => import('@tot/cqrs-dashboard').then(m => m.DashboardComponent),
            // canActivate: [claimGuard(APP_CLAIMS.CQRS_DASHBOARD.VIEW)]
          },
          { 
            path: 'tracing/:id', 
            loadComponent: () => import('@tot/cqrs-dashboard').then(m => m.TracingComponent),
            // canActivate: [claimGuard(APP_CLAIMS.CQRS_DASHBOARD.VIEW)],
            data: { breadcrumb: 'Tracing' }
          },
          { 
            path: 'messages/:queueName', 
            loadComponent: () => import('@tot/cqrs-dashboard').then(m => m.MessageListComponent),
            // canActivate: [claimGuard(APP_CLAIMS.CQRS_DASHBOARD.VIEW)],
            data: { breadcrumb: 'Messages' }
          }
        ]
      },
      {
        path: 'modules/test',
        data: { breadcrumb: 'Mô-đun thử nghiệm' },
        children: [
          { 
            path: 'cqrs', 
            loadComponent: () => import('@tot/business-test').then(m => m.CqrsTestComponent),
            data: { breadcrumb: 'CQRS Test' }
          },
          { 
            path: 'firestore', 
            loadComponent: () => import('@tot/business-test').then(m => m.FirestoreTestComponent),
            data: { breadcrumb: 'Firestore Test' }
          },
          { 
            path: 'fcm', 
            loadComponent: () => import('@tot/business-test').then(m => m.FcmTestComponent),
            data: { breadcrumb: 'FCM Test' }
          },
          { 
            path: 'editor', 
            loadComponent: () => import('@tot/business-test').then(m => m.EditorTestComponent),
            data: { breadcrumb: 'Editor Test' }
          },
          { 
            path: 'editor-tinymce', 
            loadComponent: () => import('@tot/business-test').then(m => m.EditorTinymceTestComponent),
            data: { breadcrumb: 'Editor TinyMCE Test' }
          }
        ]
      },
      {
        path: 'modules/core-infra-auth',
        data: { breadcrumb: 'Core Infra Auth' },
        children: [
          {
            path: 'users',
            loadComponent: () => import('@tot/business-oidc').then(m => m.UserListComponent),
            canActivate: [claimGuard(APP_CLAIMS.AUTH.VIEW_USERS)],
            data: { breadcrumb: 'Người dùng' }
          },
          {
            path: 'roles',
            loadComponent: () => import('@tot/business-oidc').then(m => m.RoleListComponent),
            canActivate: [claimGuard(APP_CLAIMS.AUTH.VIEW_ROLES)],
            data: { breadcrumb: 'Vai trò' }
          },
          {
            path: 'claims',
            loadComponent: () => import('@tot/business-oidc').then(m => m.ClaimSyncComponent),
            canActivate: [claimGuard(APP_CLAIMS.AUTH.VIEW_CLAIMS)],
            data: { breadcrumb: 'Quyền' }
          },
          {
            path: 'acl',
            loadComponent: () => import('@tot/business-oidc').then(m => m.AclListComponent),
            canActivate: [claimGuard(APP_CLAIMS.AUTH.MANAGE_ACL)],
            data: { breadcrumb: 'Quản lý ACL' }
          },
          {
            path: 'change-password',
            loadComponent: () => import('@tot/business-oidc').then(m => m.ChangePasswordComponent),
            data: { breadcrumb: 'Đổi mật khẩu' }
          },
          {
            path: 'notify',
            loadComponent: () => import('@tot/business-oidc').then(m => m.NotifyComponent),
            canActivate: [claimGuard(APP_CLAIMS.AUTH.VIEW_USERS)],
            data: { breadcrumb: 'Gửi thông báo' }
          },
          {
            path: 'authorize-info',
            loadComponent: () => import('@tot/business-oidc').then(m => m.AuthorizeInfoComponent),
            data: { breadcrumb: 'Thông tin phân quyền' }
          }
        ]
      },
      {
        path: 'modules/files-folders',
        data: { breadcrumb: 'Quản lý tài liệu' },
        loadComponent: () => import('@tot/business-files').then(m => m.FilesFolders)
      },
      {
        path: 'modules/nhan-dien-khuon-mat',
        data: { breadcrumb: 'Nhận diện khuôn mặt' },
        children: [
          {
            path: 'sessions',
            data: { breadcrumb: 'Phiên thu thập ảnh' },
            loadComponent: () => import('@tot/nhan-dien-khuon-mat').then(m => m.NhanDienKhuonMatComponent)
          },
          {
            path: 'training',
            data: { breadcrumb: 'Đào tạo nhận dạng' },
            loadComponent: () => import('@tot/nhan-dien-khuon-mat').then(m => m.TrainingComponent)
          },
          {
            path: 'camera',
            data: { breadcrumb: 'Camera nhận dạng' },
            loadComponent: () => import('@tot/nhan-dien-khuon-mat').then(m => m.CameraComponent)
          },
          {
            path: '',
            redirectTo: 'sessions',
            pathMatch: 'full'
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
