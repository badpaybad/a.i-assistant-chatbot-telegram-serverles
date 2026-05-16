import {
  FirebaseService
} from "./chunk-GYMFUDA3.js";
import {
  HttpClientService,
  Router
} from "./chunk-N6TJV4UP.js";
import {
  BehaviorSubject,
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-ZYJZNBYG.js";

// projects/tot/core/src/lib/auth/claims.config.ts
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

// projects/tot/core/src/lib/auth/auth.service.ts
var _AuthService = class _AuthService {
  constructor() {
    this.http = inject(HttpClientService);
    this.firebase = inject(FirebaseService);
    this.router = inject(Router);
    this.authStatusSubject = new BehaviorSubject(this.hasToken());
    this.authStatus$ = this.authStatusSubject.asObservable();
    this.claimsUpdatedSubject = new BehaviorSubject(void 0);
    this.claimsUpdated$ = this.claimsUpdatedSubject.asObservable();
    this.ssoCompleteSubject = new BehaviorSubject(false);
    this.ssoComplete$ = this.ssoCompleteSubject.asObservable();
    this.currentUserSubject = new BehaviorSubject(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.user$ = this.firebase.user$;
    const savedUser = this.getCurrentUser();
    if (savedUser) {
      this.currentUserSubject.next(savedUser);
    }
    if (this.hasToken()) {
      this.syncClaims();
    }
    this.handleRedirectCallback();
  }
  async handleRedirectCallback() {
    try {
      const user = await this.firebase.handleRedirectResult();
      if (user) {
        console.log("[Auth] Redirect result found, completing SSO login...");
        const provider = localStorage.getItem("sso_provider") || "unknown";
        await this.processSsoUser(provider, user);
        localStorage.removeItem("sso_provider");
        this.ssoCompleteSubject.next(true);
      }
    } catch (e) {
      console.error("[Auth] Error handling redirect callback", e);
    }
  }
  hasToken() {
    return !!localStorage.getItem("jwt_token");
  }
  async login(credentials) {
    const response = await this.http.post("/api/auth/login", credentials);
    const { token, firebaseToken } = response;
    await this.saveSession(token, firebaseToken);
    return response;
  }
  async signup(data) {
    const response = await this.http.post("/api/auth/signup", data);
    return response;
  }
  async ssoLogin(provider) {
    localStorage.setItem("sso_provider", provider);
    let user;
    switch (provider) {
      case "google":
        user = await this.firebase.loginWithGoogle();
        break;
      case "facebook":
        user = await this.firebase.loginWithFacebook();
        break;
      case "ms":
        user = await this.firebase.loginWithMicrosoft();
        break;
      default:
        throw new Error("Unsupported provider");
    }
    if (user) {
      await this.processSsoUser(provider, user);
      localStorage.removeItem("sso_provider");
      return true;
    }
    return false;
  }
  async processSsoUser(provider, user) {
    const idToken = await user.getIdToken();
    const response = await this.http.post("/api/auth/sso", {
      provider,
      idToken,
      ssoId: user.uid,
      email: user.email,
      displayName: user.displayName
    });
    const { token, firebaseToken } = response;
    await this.saveSession(token, firebaseToken);
    return response;
  }
  async saveSession(token, firebaseToken) {
    localStorage.setItem("jwt_token", token);
    this.authStatusSubject.next(true);
    if (firebaseToken) {
      await this.firebase.loginWithCustomToken(firebaseToken);
    }
    await this.syncClaims();
  }
  async logout() {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("claims");
    localStorage.removeItem("roles");
    localStorage.removeItem("user_profile");
    this.authStatusSubject.next(false);
    this.currentUserSubject.next(null);
    this.claimsUpdatedSubject.next();
    await this.firebase.logout();
    this.router.navigate(["/auth/login"]);
  }
  async syncClaims() {
    try {
      const localVersion = localStorage.getItem("claims_version");
      if (localVersion !== CLAIMS_VERSION) {
        await this.http.post("/api/auth/claims/sync", {
          version: CLAIMS_VERSION,
          claims: ALL_CLAIMS
        });
        localStorage.setItem("claims_version", CLAIMS_VERSION);
      }
      const response = await this.http.get("/api/auth/me");
      const claims = response.claims || response.permissions || response.Claims || response.Permissions || [];
      const roles = response.roles || response.Roles || [];
      localStorage.setItem("claims", JSON.stringify(claims));
      localStorage.setItem("roles", JSON.stringify(roles));
      localStorage.setItem("user_profile", JSON.stringify(response));
      this.currentUserSubject.next(response);
      this.claimsUpdatedSubject.next();
    } catch (e) {
      console.error("Failed to sync claims", e);
      if (e.status === 404 || e.status === 401) {
        await this.logout();
      }
    }
  }
  hasClaim(claimOrClaims, mode = "OR") {
    const rawClaims = localStorage.getItem("claims");
    const rawRoles = localStorage.getItem("roles");
    try {
      const userClaims = rawClaims && rawClaims !== "undefined" ? JSON.parse(rawClaims) : [];
      const userRoles = rawRoles && rawRoles !== "undefined" ? JSON.parse(rawRoles) : [];
      if (!Array.isArray(userClaims) && !Array.isArray(userRoles))
        return false;
      const isAdmin = userRoles.some((r) => r.toLowerCase() === ADMIN_ROLE.toLowerCase()) || userClaims.some((c) => c.toLowerCase() === ADMIN_CLAIM.toLowerCase());
      if (isAdmin)
        return true;
      const claimsToCheck = Array.isArray(claimOrClaims) ? claimOrClaims.filter((c) => !!c) : claimOrClaims ? [claimOrClaims] : [];
      if (claimsToCheck.length === 0) {
        return this.isLoggedIn();
      }
      if (mode === "OR") {
        return claimsToCheck.some((c) => userClaims.includes(c));
      } else {
        return claimsToCheck.every((c) => userClaims.includes(c));
      }
    } catch (e) {
      console.error("Error parsing claims/roles from localStorage", e);
      return false;
    }
  }
  isLoggedIn() {
    return !!localStorage.getItem("jwt_token");
  }
  getCurrentUser() {
    const user = localStorage.getItem("user_profile");
    return user ? JSON.parse(user) : null;
  }
};
_AuthService.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthService)();
};
_AuthService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
var AuthService = _AuthService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  APP_CLAIMS,
  ALL_CLAIMS,
  ADMIN_CLAIM,
  ADMIN_ROLE,
  CLAIMS_VERSION,
  AuthService
};
//# sourceMappingURL=chunk-KGI6TSZN.js.map
