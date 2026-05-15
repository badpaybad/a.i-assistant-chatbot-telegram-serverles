// src/app/core/auth/claims.config.ts
var AUTH_CONFIG = {
  ADMIN_CLAIM: "be.admin",
  ADMIN_ROLE: "Admin",
  CLAIMS_VERSION: "1.3.0"
};
var APP_CLAIMS = {
  CQRS_DASHBOARD: {
    VIEW: "fe.cqrs:dashboard:view",
    MANAGE_WORKERS: "fe.cqrs:dashboard:manage_workers",
    RETRY_MESSAGES: "fe.cqrs:dashboard:retry_messages"
  },
  TEST_MODULE: {
    VIEW: "fe.test:view",
    FIRE_COMMANDS: "fe.test:fire_commands"
  },
  AUTH: {
    VIEW_ROLES: "fe.auth:roles:view",
    MANAGE_ROLES: "fe.auth:roles:manage",
    VIEW_CLAIMS: "fe.auth:claims:view",
    MANAGE_CLAIMS: "fe.auth:claims:manage",
    VIEW_USERS: "fe.auth:users:view",
    MANAGE_USERS: "fe.auth:users:manage",
    MANAGE_ACL: "fe.auth:acl:manage"
  },
  FILES_FOLDERS: {
    VIEW: "fe.files_folders:view"
  }
};
var ALL_CLAIMS = Object.values(APP_CLAIMS).flatMap((module) => Object.values(module));
var ADMIN_CLAIM = AUTH_CONFIG.ADMIN_CLAIM;
var ADMIN_ROLE = AUTH_CONFIG.ADMIN_ROLE;
var CLAIMS_VERSION = AUTH_CONFIG.CLAIMS_VERSION;

export {
  APP_CLAIMS,
  ALL_CLAIMS,
  ADMIN_CLAIM,
  ADMIN_ROLE,
  CLAIMS_VERSION
};
//# sourceMappingURL=chunk-F6TGNGA2.js.map
