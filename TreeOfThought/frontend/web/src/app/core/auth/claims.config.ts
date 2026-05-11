export const APP_CLAIMS = {
  CQRS_DASHBOARD: {
    VIEW: 'cqrs:dashboard:view',
    MANAGE_WORKERS: 'cqrs:dashboard:manage_workers',
    RETRY_MESSAGES: 'cqrs:dashboard:retry_messages'
  },
  TEST_MODULE: {
    VIEW: 'test:view',
    FIRE_COMMANDS: 'test:fire_commands'
  },
  AUTH: {
    VIEW_ROLES: 'auth:roles:view',
    MANAGE_ROLES: 'auth:roles:manage',
    VIEW_CLAIMS: 'auth:claims:view',
    MANAGE_CLAIMS: 'auth:claims:manage',
    VIEW_USERS: 'auth:users:view',
    MANAGE_USERS: 'auth:users:manage',
    MANAGE_ACL: 'auth:acl:manage'
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

export const CLAIMS_VERSION = '1.2.0';
