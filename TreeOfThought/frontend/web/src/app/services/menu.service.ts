import { Injectable } from '@angular/core';

export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  claim?: string | string[];
  children?: MenuItem[];
  open?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItems: MenuItem[] = [
    {
      label: 'CQRS Dashboard',
      icon: 'dashboard',
      route: '/modules/cqrs-dashboard',
      claim: 'fe.cqrs:dashboard:view'
    },
    {
      label: 'Quản trị hệ thống',
      icon: 'lock',
      claim: ['fe.auth:users:view', 'fe.auth:roles:view'],
      children: [
        { label: 'Người dùng', route: '/modules/core-infra-auth/users', claim: 'fe.auth:users:view' },
        { label: 'Vai trò', route: '/modules/core-infra-auth/roles', claim: 'fe.auth:roles:view' },
        { label: 'Quyền hạn', route: '/modules/core-infra-auth/claims', claim: 'fe.auth:claims:view' },
        { label: 'Quản lý ACL', route: '/modules/core-infra-auth/acl', claim: 'fe.auth:acl:manage' },
        { label: 'Đổi mật khẩu', route: '/modules/core-infra-auth/change-password' },
        { label: 'Thông tin phân quyền', route: '/modules/core-infra-auth/authorize-info' }
      ]
    },
    {
      label: 'Tài liệu',
      icon: 'folder',
      route: '/modules/files-folders',
      claim: 'fe.files_folders:view'
    },
    {
      label: 'Thử nghiệm',
      icon: 'experiment',
      claim: 'fe.test:view',
      children: [
        { label: 'Firestore', route: '/modules/test/firestore' },
        { label: 'FCM', route: '/modules/test/fcm' },
        { label: 'CQRS', route: '/modules/cqrs-dashboard/cqrs' },
        { label: 'Editor', route: '/modules/test/editor' }
      ]
    }
  ];

  getMenu(): MenuItem[] {
    return this.menuItems;
  }
}
