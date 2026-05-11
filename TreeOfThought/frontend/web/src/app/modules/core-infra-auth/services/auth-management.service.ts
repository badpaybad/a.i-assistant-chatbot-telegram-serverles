import { Injectable, inject } from '@angular/core';
import { HttpClientService } from '../../../core/http/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthManagementService {
  private http = inject(HttpClientService);
  private readonly BASE_URL = '/api/AuthManagement';

  // User Management
  getUsers() {
    return this.http.get(`${this.BASE_URL}/users`);
  }

  assignRoleToUser(userId: string, roleId: string) {
    return this.http.post(`${this.BASE_URL}/users/${userId}/roles/${roleId}`);
  }

  removeRoleFromUser(userId: string, roleId: string) {
    return this.http.delete(`${this.BASE_URL}/users/${userId}/roles/${roleId}`);
  }

  assignClaimToUser(userId: string, claimId: string) {
    return this.http.post(`${this.BASE_URL}/users/${userId}/claims/${claimId}`);
  }

  removeClaimFromUser(userId: string, claimId: string) {
    return this.http.delete(`${this.BASE_URL}/users/${userId}/claims/${claimId}`);
  }

  // Role Management
  getRoles() {
    return this.http.get(`${this.BASE_URL}/roles`);
  }

  createRole(role: any) {
    return this.http.post(`${this.BASE_URL}/roles`, role);
  }

  assignClaimToRole(roleId: string, claimId: string) {
    return this.http.post(`${this.BASE_URL}/roles/${roleId}/claims/${claimId}`);
  }

  removeClaimFromRole(roleId: string, claimId: string) {
    return this.http.delete(`${this.BASE_URL}/roles/${roleId}/claims/${claimId}`);
  }

  // Claim Management
  getClaims() {
    return this.http.get(`${this.BASE_URL}/claims`);
  }

  createClaim(claim: any) {
    return this.http.post(`${this.BASE_URL}/claims`, claim);
  }

  syncClaims(version: string, claims: string[]) {
    return this.http.post('/api/Auth/claims/sync', { version, claims });
  }

  // ACL Management
  getAcl(resourceType: string, resourceId: string) {
    return this.http.get(`${this.BASE_URL}/acl`, { params: { resourceType, resourceId } });
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
