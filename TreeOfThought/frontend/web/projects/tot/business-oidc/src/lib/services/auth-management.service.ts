import { Injectable, inject } from '@angular/core';
import { HttpClientService } from '@tot/core';

@Injectable({
  providedIn: 'root'
})
export class AuthManagementService {
  private http = inject(HttpClientService);
  private readonly BASE_URL = '/api/AuthManagement';

  // User Management
  getUsers(params?: any) {
    return this.http.get(`${this.BASE_URL}/users`, { params });
  }

  createUser(user: any, callback?: (data: any) => void) {
    return this.http.post(`${this.BASE_URL}/users`, user, callback);
  }

  updateUser(userId: string, user: any, callback?: (data: any) => void) {
    return this.http.put(`${this.BASE_URL}/users/${userId}`, user, callback);
  }

  assignRoleToUser(userId: string, roleId: string, callback?: (data: any) => void) {
    return this.http.post(`${this.BASE_URL}/users/${userId}/roles/${roleId}`, null, callback);
  }
  
  assignRolesToUser(userId: string, roleIds: string[], callback?: (data: any) => void) {
    return this.http.post(`${this.BASE_URL}/users/${userId}/roles/batch`, roleIds, callback);
  }

  removeRoleFromUser(userId: string, roleId: string, callback?: (data: any) => void) {
    return this.http.delete(`${this.BASE_URL}/users/${userId}/roles/${roleId}`, callback);
  }

  assignClaimToUser(userId: string, claimId: string, callback?: (data: any) => void) {
    return this.http.post(`${this.BASE_URL}/users/${userId}/claims/${claimId}`, null, callback);
  }
  
  assignClaimsToUser(userId: string, claimIds: string[], callback?: (data: any) => void) {
    return this.http.post(`${this.BASE_URL}/users/${userId}/claims/batch`, claimIds, callback);
  }

  removeClaimFromUser(userId: string, claimId: string, callback?: (data: any) => void) {
    return this.http.delete(`${this.BASE_URL}/users/${userId}/claims/${claimId}`, callback);
  }

  deleteUser(userId: string, callback?: (data: any) => void) {
    return this.http.delete(`${this.BASE_URL}/users/${userId}`, callback);
  }

  uploadAvatar(userId: string, file: File, callback?: (data: any) => void) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.BASE_URL}/users/${userId}/avatar`, formData, callback);
  }

  // Role Management
  getRoles(params?: any) {
    return this.http.get(`${this.BASE_URL}/roles`, { params });
  }

  createRole(role: any, callback?: (data: any) => void) {
    return this.http.post(`${this.BASE_URL}/roles`, role, callback);
  }

  updateRole(roleId: string, role: any, callback?: (data: any) => void) {
    return this.http.put(`${this.BASE_URL}/roles/${roleId}`, role, callback);
  }

  deleteRole(roleId: string, callback?: (data: any) => void) {
    return this.http.delete(`${this.BASE_URL}/roles/${roleId}`, callback);
  }

  assignClaimToRole(roleId: string, claimId: string, callback?: (data: any) => void) {
    return this.http.post(`${this.BASE_URL}/roles/${roleId}/claims/${claimId}`, null, callback);
  }
  
  assignClaimsToRole(roleId: string, claimIds: string[], callback?: (data: any) => void) {
    return this.http.post(`${this.BASE_URL}/roles/${roleId}/claims/batch`, claimIds, callback);
  }

  removeClaimFromRole(roleId: string, claimId: string, callback?: (data: any) => void) {
    return this.http.delete(`${this.BASE_URL}/roles/${roleId}/claims/${claimId}`, callback);
  }

  // Claim Management
  getClaims(params?: any) {
    return this.http.get(`${this.BASE_URL}/claims`, { params });
  }

  createClaim(claim: any, callback?: (data: any) => void) {
    return this.http.post(`${this.BASE_URL}/claims`, claim, callback);
  }

  updateClaim(claimId: string, claim: any, callback?: (data: any) => void) {
    return this.http.put(`${this.BASE_URL}/claims/${claimId}`, claim, callback);
  }

  deleteClaim(claimId: string, callback?: (data: any) => void) {
    return this.http.delete(`${this.BASE_URL}/claims/${claimId}`, callback);
  }

  syncClaims(version: string, claims: string[], callback?: (data: any) => void) {
    return this.http.post('/api/Auth/claims/sync', { version, claims }, callback);
  }

  getAcl(resourceType: string, resourceId: string, pageIndex?: number, pageSize?: number) {
    const params: any = { resourceType, resourceId };
    if (pageIndex) params.pageIndex = pageIndex;
    if (pageSize) params.pageSize = pageSize;
    return this.http.get(`${this.BASE_URL}/acl`, { params });
  }

  addAcl(entry: any, callback?: (data: any) => void) {
    return this.http.post(`${this.BASE_URL}/acl`, entry, callback);
  }

  removeAcl(id: string, callback?: (data: any) => void) {
    return this.http.delete(`${this.BASE_URL}/acl/${id}`, callback);
  }

  changePassword(data: any, callback?: (data: any) => void) {
    return this.http.post('/api/Auth/change-password', data, callback);
  }

  getUserFcmTokens(userId: string) {
    return this.http.get(`${this.BASE_URL}/users/${userId}/fcm-tokens`);
  }

  sendNotification(payload: { fcmToken: string; title: string; body: string }, callback?: (data: any) => void) {
    return this.http.post(`${this.BASE_URL}/users/send-notification`, payload, callback);
  }
}
