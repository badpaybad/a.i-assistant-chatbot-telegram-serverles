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
        component: DashboardComponent,
        canActivate: [claimGuard(APP_CLAIMS.CQRS_DASHBOARD.VIEW)]
      },
      { 
        path: 'modules/cqrs-dashboard/tracing/:id', 
        component: TracingComponent,
        canActivate: [claimGuard(APP_CLAIMS.CQRS_DASHBOARD.VIEW)]
      },
      { 
        path: 'modules/cqrs-dashboard/messages/:queueName', 
        component: MessageListComponent,
        canActivate: [claimGuard(APP_CLAIMS.CQRS_DASHBOARD.VIEW)]
      },
      { 
        path: 'modules/test/firestore', 
        loadComponent: () => import('./modules/test/firestore-test/firestore-test.component').then(m => m.FirestoreTestComponent) 
      },
      { 
        path: 'modules/test/fcm', 
        loadComponent: () => import('./modules/test/fcm-test/fcm-test.component').then(m => m.FcmTestComponent) 
      },
      {
        path: 'modules/core-infra-auth/users',
        loadComponent: () => import('./modules/core-infra-auth/user-list/user-list.component').then(m => m.UserListComponent),
        canActivate: [claimGuard(APP_CLAIMS.AUTH.VIEW_USERS)]
      },
      {
        path: 'modules/core-infra-auth/roles',
        loadComponent: () => import('./modules/core-infra-auth/role-list/role-list.component').then(m => m.RoleListComponent),
        canActivate: [claimGuard(APP_CLAIMS.AUTH.VIEW_ROLES)]
      },
      {
        path: 'modules/core-infra-auth/claims',
        loadComponent: () => import('./modules/core-infra-auth/claim-sync/claim-sync.component').then(m => m.ClaimSyncComponent),
        canActivate: [claimGuard(APP_CLAIMS.AUTH.VIEW_CLAIMS)]
      },
      {
        path: 'modules/core-infra-auth/acl',
        loadComponent: () => import('./modules/core-infra-auth/acl-list/acl-list.component').then(m => m.AclListComponent),
        canActivate: [claimGuard(APP_CLAIMS.AUTH.MANAGE_ACL)]
      },
      {
        path: 'modules/core-infra-auth/change-password',
        loadComponent: () => import('./modules/core-infra-auth/change-password/change-password.component').then(m => m.ChangePasswordComponent)
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
