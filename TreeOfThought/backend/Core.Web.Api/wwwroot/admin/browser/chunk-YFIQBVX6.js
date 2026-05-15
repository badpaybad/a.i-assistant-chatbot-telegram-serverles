import {
  HttpClientService
} from "./chunk-OCLTPTCJ.js";
import {
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-6BQPXFZE.js";

// src/app/modules/core-infra-auth/services/auth-management.service.ts
var AuthManagementService = class _AuthManagementService {
  constructor() {
    this.http = inject(HttpClientService);
    this.BASE_URL = "/api/AuthManagement";
  }
  // User Management
  getUsers(params) {
    return this.http.get(`${this.BASE_URL}/users`, { params });
  }
  createUser(user) {
    return this.http.post(`${this.BASE_URL}/users`, user);
  }
  updateUser(userId, user) {
    return this.http.put(`${this.BASE_URL}/users/${userId}`, user);
  }
  assignRoleToUser(userId, roleId) {
    return this.http.post(`${this.BASE_URL}/users/${userId}/roles/${roleId}`);
  }
  assignRolesToUser(userId, roleIds) {
    return this.http.post(`${this.BASE_URL}/users/${userId}/roles/batch`, roleIds);
  }
  removeRoleFromUser(userId, roleId) {
    return this.http.delete(`${this.BASE_URL}/users/${userId}/roles/${roleId}`);
  }
  assignClaimToUser(userId, claimId) {
    return this.http.post(`${this.BASE_URL}/users/${userId}/claims/${claimId}`);
  }
  assignClaimsToUser(userId, claimIds) {
    return this.http.post(`${this.BASE_URL}/users/${userId}/claims/batch`, claimIds);
  }
  removeClaimFromUser(userId, claimId) {
    return this.http.delete(`${this.BASE_URL}/users/${userId}/claims/${claimId}`);
  }
  deleteUser(userId) {
    return this.http.delete(`${this.BASE_URL}/users/${userId}`);
  }
  uploadAvatar(userId, file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.BASE_URL}/users/${userId}/avatar`, formData);
  }
  // Role Management
  getRoles(params) {
    return this.http.get(`${this.BASE_URL}/roles`, { params });
  }
  createRole(role) {
    return this.http.post(`${this.BASE_URL}/roles`, role);
  }
  updateRole(roleId, role) {
    return this.http.put(`${this.BASE_URL}/roles/${roleId}`, role);
  }
  deleteRole(roleId) {
    return this.http.delete(`${this.BASE_URL}/roles/${roleId}`);
  }
  assignClaimToRole(roleId, claimId) {
    return this.http.post(`${this.BASE_URL}/roles/${roleId}/claims/${claimId}`);
  }
  assignClaimsToRole(roleId, claimIds) {
    return this.http.post(`${this.BASE_URL}/roles/${roleId}/claims/batch`, claimIds);
  }
  removeClaimFromRole(roleId, claimId) {
    return this.http.delete(`${this.BASE_URL}/roles/${roleId}/claims/${claimId}`);
  }
  // Claim Management
  getClaims(params) {
    return this.http.get(`${this.BASE_URL}/claims`, { params });
  }
  createClaim(claim) {
    return this.http.post(`${this.BASE_URL}/claims`, claim);
  }
  updateClaim(claimId, claim) {
    return this.http.put(`${this.BASE_URL}/claims/${claimId}`, claim);
  }
  deleteClaim(claimId) {
    return this.http.delete(`${this.BASE_URL}/claims/${claimId}`);
  }
  syncClaims(version, claims) {
    return this.http.post("/api/Auth/claims/sync", { version, claims });
  }
  // ACL Management
  getAcl(resourceType, resourceId) {
    return this.http.get(`${this.BASE_URL}/acl`, { params: { resourceType, resourceId } });
  }
  addAcl(entry) {
    return this.http.post(`${this.BASE_URL}/acl`, entry);
  }
  removeAcl(id) {
    return this.http.delete(`${this.BASE_URL}/acl/${id}`);
  }
  changePassword(data) {
    return this.http.post("/api/Auth/change-password", data);
  }
  static {
    this.\u0275fac = function AuthManagementService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthManagementService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthManagementService, factory: _AuthManagementService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthManagementService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  AuthManagementService
};
//# sourceMappingURL=chunk-YFIQBVX6.js.map
