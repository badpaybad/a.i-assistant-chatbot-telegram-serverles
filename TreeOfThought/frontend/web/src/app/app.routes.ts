import { Routes } from '@angular/router';
import { permissionGuard } from './core/auth/permission.guard';
import { APP_PERMISSIONS } from './core/auth/permissions.config';

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
        canActivate: [permissionGuard(APP_PERMISSIONS.CQRS_DASHBOARD.VIEW)]
      },
      { 
        path: 'modules/cqrs-dashboard/tracing/:id', 
        component: TracingComponent,
        canActivate: [permissionGuard(APP_PERMISSIONS.CQRS_DASHBOARD.VIEW)]
      },
      { 
        path: 'modules/cqrs-dashboard/messages/:queueName', 
        component: MessageListComponent,
        canActivate: [permissionGuard(APP_PERMISSIONS.CQRS_DASHBOARD.VIEW)]
      },
      { 
        path: 'modules/test/firestore', 
        loadComponent: () => import('./modules/test/firestore-test/firestore-test.component').then(m => m.FirestoreTestComponent) 
      },
      { 
        path: 'modules/test/fcm', 
        loadComponent: () => import('./modules/test/fcm-test/fcm-test.component').then(m => m.FcmTestComponent) 
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
