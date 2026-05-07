export const APP_PERMISSIONS = {
  CQRS_DASHBOARD: {
    VIEW: 'cqrs:dashboard:view',
    MANAGE_WORKERS: 'cqrs:dashboard:manage_workers',
    RETRY_MESSAGES: 'cqrs:dashboard:retry_messages'
  },
  TEST_MODULE: {
    VIEW: 'test:view',
    FIRE_COMMANDS: 'test:fire_commands'
  },
  USER: {
    VIEW: 'user:view',
    MANAGE: 'user:manage'
  }
};

export const ALL_PERMISSIONS = [
  APP_PERMISSIONS.CQRS_DASHBOARD.VIEW,
  APP_PERMISSIONS.CQRS_DASHBOARD.MANAGE_WORKERS,
  APP_PERMISSIONS.CQRS_DASHBOARD.RETRY_MESSAGES,
  APP_PERMISSIONS.TEST_MODULE.VIEW,
  APP_PERMISSIONS.TEST_MODULE.FIRE_COMMANDS,
  APP_PERMISSIONS.USER.VIEW,
  APP_PERMISSIONS.USER.MANAGE
];

export const PERMISSIONS_VERSION = '1.0.2';
