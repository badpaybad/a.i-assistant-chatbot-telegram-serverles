export const ADMIN_CLAIM = 'be.admin';
export const ADMIN_ROLE = 'Admin';

export const APP_CLAIMS = {
  CQRS_DASHBOARD: {
    VIEW: 'fe.cqrs:dashboard:view',
    MANAGE_WORKERS: 'fe.cqrs:dashboard:manage_workers',
    RETRY_MESSAGES: 'fe.cqrs:dashboard:retry_messages'
  },
  TEST_MODULE: {
    VIEW: 'fe.test:view',
    FIRE_COMMANDS: 'fe.test:fire_commands'
  },
  AUTH: {
    VIEW_ROLES: 'fe.auth:roles:view',
    MANAGE_ROLES: 'fe.auth:roles:manage',
    VIEW_CLAIMS: 'fe.auth:claims:view',
    MANAGE_CLAIMS: 'fe.auth:claims:manage',
    VIEW_USERS: 'fe.auth:users:view',
    MANAGE_USERS: 'fe.auth:users:manage',
    MANAGE_ACL: 'fe.auth:acl:manage'
  }
};

export const ALL_CLAIMS = [
  APP_CLAIMS.CQRS_DASHBOARD.VIEW,
  APP_CLAIMS.CQRS_DASHBOARD.MANAGE_WORKERS,
  APP_CLAIMS.CQRS_DASHBOARD.RETRY_MESSAGES,
  APP_CLAIMS.TEST_MODULE.VIEW,
  APP_CLAIMS.TEST_MODULE.FIRE_COMMANDS,
  APP_CLAIMS.AUTH.VIEW_ROLES,
  APP_CLAIMS.AUTH.MANAGE_ROLES,
  APP_CLAIMS.AUTH.VIEW_CLAIMS,
  APP_CLAIMS.AUTH.MANAGE_CLAIMS,
  APP_CLAIMS.AUTH.VIEW_USERS,
  APP_CLAIMS.AUTH.MANAGE_USERS,
  APP_CLAIMS.AUTH.MANAGE_ACL,
];

export const CLAIMS_VERSION = '1.3.0';
