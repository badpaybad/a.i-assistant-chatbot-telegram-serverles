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

  createUser(user: any) {
    return this.http.post(`${this.BASE_URL}/users`, user);
  }

  updateUser(userId: string, user: any) {
    return this.http.put(`${this.BASE_URL}/users/${userId}`, user);
  }

  assignRoleToUser(userId: string, roleId: string) {
    return this.http.post(`${this.BASE_URL}/users/${userId}/roles/${roleId}`);
  }
  
  assignRolesToUser(userId: string, roleIds: string[]) {
    return this.http.post(`${this.BASE_URL}/users/${userId}/roles/batch`, roleIds);
  }

  removeRoleFromUser(userId: string, roleId: string) {
    return this.http.delete(`${this.BASE_URL}/users/${userId}/roles/${roleId}`);
  }

  assignClaimToUser(userId: string, claimId: string) {
    return this.http.post(`${this.BASE_URL}/users/${userId}/claims/${claimId}`);
  }
  
  assignClaimsToUser(userId: string, claimIds: string[]) {
    return this.http.post(`${this.BASE_URL}/users/${userId}/claims/batch`, claimIds);
  }

  removeClaimFromUser(userId: string, claimId: string) {
    return this.http.delete(`${this.BASE_URL}/users/${userId}/claims/${claimId}`);
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.BASE_URL}/users/${userId}`);
  }

  uploadAvatar(userId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.BASE_URL}/users/${userId}/avatar`, formData);
  }

  // Role Management
  getRoles(params?: any) {
    return this.http.get(`${this.BASE_URL}/roles`, { params });
  }

  createRole(role: any) {
    return this.http.post(`${this.BASE_URL}/roles`, role);
  }

  updateRole(roleId: string, role: any) {
    return this.http.put(`${this.BASE_URL}/roles/${roleId}`, role);
  }

  deleteRole(roleId: string) {
    return this.http.delete(`${this.BASE_URL}/roles/${roleId}`);
  }

  assignClaimToRole(roleId: string, claimId: string) {
    return this.http.post(`${this.BASE_URL}/roles/${roleId}/claims/${claimId}`);
  }
  
  assignClaimsToRole(roleId: string, claimIds: string[]) {
    return this.http.post(`${this.BASE_URL}/roles/${roleId}/claims/batch`, claimIds);
  }

  removeClaimFromRole(roleId: string, claimId: string) {
    return this.http.delete(`${this.BASE_URL}/roles/${roleId}/claims/${claimId}`);
  }

  // Claim Management
  getClaims(params?: any) {
    return this.http.get(`${this.BASE_URL}/claims`, { params });
  }

  createClaim(claim: any) {
    return this.http.post(`${this.BASE_URL}/claims`, claim);
  }

  updateClaim(claimId: string, claim: any) {
    return this.http.put(`${this.BASE_URL}/claims/${claimId}`, claim);
  }

  deleteClaim(claimId: string) {
    return this.http.delete(`${this.BASE_URL}/claims/${claimId}`);
  }

  syncClaims(version: string, claims: string[]) {
    return this.http.post('/api/Auth/claims/sync', { version, claims });
  }

  getAcl(resourceType: string, resourceId: string, pageIndex?: number, pageSize?: number) {
    const params: any = { resourceType, resourceId };
    if (pageIndex) params.pageIndex = pageIndex;
    if (pageSize) params.pageSize = pageSize;
    return this.http.get(`${this.BASE_URL}/acl`, { params });
  }

  addAcl(entry: any) {
    return this.http.post(`${this.BASE_URL}/acl`, entry);
  }

  removeAcl(id: string) {
    return this.http.delete(`${this.BASE_URL}/acl/${id}`);
  }

  changePassword(data: any) {
    return this.http.post('/api/Auth/change-password', data);
  }
}
