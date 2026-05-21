import {
  FirebaseService
} from "./chunk-XGF6A4WM.js";
import {
  CommonModule,
  FormsModule,
  HttpClientService,
  NG_VALUE_ACCESSOR,
  NgIf,
  NzIconDirective,
  NzIconModule,
  NzInputDirective,
  NzInputGroupComponent,
  NzInputGroupWhitSuffixOrPrefixDirective,
  NzInputModule,
  Router
} from "./chunk-H2M3TIKJ.js";
import {
  BehaviorSubject,
  Component,
  Injectable,
  Input,
  forwardRef,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor
} from "./chunk-FOY232A2.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-MYGOUE3E.js";

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
    let fcmToken = null;
    try {
      fcmToken = await this.firebase.getFCMToken();
    } catch (e) {
      console.warn("[Auth] Failed to get FCM token during login:", e);
    }
    let deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
      deviceId = "web_" + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("device_id", deviceId);
    }
    let appType = "admin";
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrl = urlParams.get("returnUrl");
      if (returnUrl) {
        let fullUrl = returnUrl;
        if (!returnUrl.startsWith("http")) {
          fullUrl = window.location.origin + (returnUrl.startsWith("/") ? "" : "/") + returnUrl;
        }
        const innerUrl = new URL(fullUrl);
        const innerParams = new URLSearchParams(innerUrl.search);
        const clientId = innerParams.get("client_id");
        if (clientId === "my_pc_assistant") {
          appType = "mobi android";
        }
      }
    } catch (e) {
      console.warn("[Auth] Failed to parse returnUrl for appType:", e);
    }
    const payload = __spreadProps(__spreadValues({}, credentials), {
      fcmToken: fcmToken || null,
      deviceId,
      appType
    });
    const response = await this.http.post("/api/auth/login", payload);
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
      this.registerFcmTokenGlobally();
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
  async registerFcmTokenGlobally() {
    try {
      const fcmToken = await this.firebase.getFCMToken();
      if (!fcmToken) {
        console.warn("[AuthService] No FCM Token available to register globally.");
        return;
      }
      let deviceId = localStorage.getItem("device_id");
      if (!deviceId) {
        deviceId = "web_" + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("device_id", deviceId);
      }
      let appType = "admin";
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get("returnUrl");
        if (returnUrl) {
          let fullUrl = returnUrl;
          if (!returnUrl.startsWith("http")) {
            fullUrl = window.location.origin + (returnUrl.startsWith("/") ? "" : "/") + returnUrl;
          }
          const innerUrl = new URL(fullUrl);
          const innerParams = new URLSearchParams(innerUrl.search);
          const clientId = innerParams.get("client_id");
          if (clientId === "my_pc_assistant") {
            appType = "mobi android";
          }
        }
      } catch (e) {
        console.warn("[AuthService] Failed to parse returnUrl for appType:", e);
      }
      const response = await this.http.post("/api/auth/register-fcm", {
        fcmToken,
        deviceId,
        appType
      });
      console.log("[AuthService] FCM Token registered globally successfully:", response);
    } catch (error) {
      console.warn("[AuthService] Failed to register FCM token globally:", error);
    }
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

// projects/tot/shared/src/lib/components/tot-input/tot-input.component.ts
function TotInputComponent_ng_container_0_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275listener("click", function TotInputComponent_ng_container_0_ng_template_3_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.passwordVisible = !ctx_r1.passwordVisible);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nzType", ctx_r1.passwordVisible ? "eye-invisible" : "eye");
  }
}
function TotInputComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "nz-input-group", 4)(2, "input", 5);
    \u0275\u0275listener("input", function TotInputComponent_ng_container_0_Template_input_input_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onInputChange($event));
    })("blur", function TotInputComponent_ng_container_0_Template_input_blur_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBlur());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(3, TotInputComponent_ng_container_0_ng_template_3_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const passwordSuffix_r4 = \u0275\u0275reference(4);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzPrefixIcon", ctx_r1.prefixIcon || void 0)("nzSuffix", passwordSuffix_r4);
    \u0275\u0275advance();
    \u0275\u0275property("type", ctx_r1.passwordVisible ? "text" : "password")("placeholder", ctx_r1.placeholder)("disabled", ctx_r1.disabled)("value", ctx_r1.value);
  }
}
function TotInputComponent_ng_container_1_nz_input_group_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-input-group", 8)(1, "input", 9);
    \u0275\u0275listener("input", function TotInputComponent_ng_container_1_nz_input_group_1_Template_input_input_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onInputChange($event));
    })("blur", function TotInputComponent_ng_container_1_nz_input_group_1_Template_input_blur_1_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onBlur());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nzPrefixIcon", ctx_r1.prefixIcon);
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", ctx_r1.placeholder)("disabled", ctx_r1.disabled)("value", ctx_r1.value);
  }
}
function TotInputComponent_ng_container_1_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 9);
    \u0275\u0275listener("input", function TotInputComponent_ng_container_1_ng_template_2_Template_input_input_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onInputChange($event));
    })("blur", function TotInputComponent_ng_container_1_ng_template_2_Template_input_blur_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onBlur());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("placeholder", ctx_r1.placeholder)("disabled", ctx_r1.disabled)("value", ctx_r1.value);
  }
}
function TotInputComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, TotInputComponent_ng_container_1_nz_input_group_1_Template, 2, 4, "nz-input-group", 7)(2, TotInputComponent_ng_container_1_ng_template_2_Template, 1, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const normalText_r7 = \u0275\u0275reference(3);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.prefixIcon)("ngIfElse", normalText_r7);
  }
}
function TotInputComponent_textarea_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "textarea", 10);
    \u0275\u0275listener("input", function TotInputComponent_textarea_2_Template_textarea_input_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onInputChange($event));
    })("blur", function TotInputComponent_textarea_2_Template_textarea_blur_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBlur());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("rows", ctx_r1.rows)("placeholder", ctx_r1.placeholder)("disabled", ctx_r1.disabled)("value", ctx_r1.value);
  }
}
var _TotInputComponent = class _TotInputComponent {
  constructor() {
    this.type = "text";
    this.placeholder = "";
    this.prefixIcon = null;
    this.rows = 4;
    this.disabled = false;
    this.value = "";
    this.passwordVisible = false;
    this.onChange = () => {
    };
    this.onTouched = () => {
    };
  }
  writeValue(value) {
    this.value = value || "";
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  onInputChange(event) {
    const val = event.target.value;
    this.value = val;
    this.onChange(val);
  }
  onBlur() {
    this.onTouched();
  }
};
_TotInputComponent.\u0275fac = function TotInputComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TotInputComponent)();
};
_TotInputComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TotInputComponent, selectors: [["tot-input"]], inputs: { type: "type", placeholder: "placeholder", prefixIcon: "prefixIcon", rows: "rows", disabled: "disabled" }, features: [\u0275\u0275ProvidersFeature([
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _TotInputComponent),
    multi: true
  }
])], decls: 3, vars: 3, consts: [["passwordSuffix", ""], ["normalText", ""], [4, "ngIf"], ["nz-input", "", 3, "rows", "placeholder", "disabled", "value", "input", "blur", 4, "ngIf"], [3, "nzPrefixIcon", "nzSuffix"], ["nz-input", "", 3, "input", "blur", "type", "placeholder", "disabled", "value"], ["nz-icon", "", 2, "cursor", "pointer", 3, "click", "nzType"], [3, "nzPrefixIcon", 4, "ngIf", "ngIfElse"], [3, "nzPrefixIcon"], ["type", "text", "nz-input", "", 3, "input", "blur", "placeholder", "disabled", "value"], ["nz-input", "", 3, "input", "blur", "rows", "placeholder", "disabled", "value"]], template: function TotInputComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, TotInputComponent_ng_container_0_Template, 5, 6, "ng-container", 2)(1, TotInputComponent_ng_container_1_Template, 4, 2, "ng-container", 2)(2, TotInputComponent_textarea_2_Template, 1, 4, "textarea", 3);
  }
  if (rf & 2) {
    \u0275\u0275property("ngIf", ctx.type === "password");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.type === "text");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.type === "textarea");
  }
}, dependencies: [CommonModule, NgIf, FormsModule, NzInputModule, NzInputDirective, NzInputGroupComponent, NzInputGroupWhitSuffixOrPrefixDirective, NzIconModule, NzIconDirective], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n/*# sourceMappingURL=tot-input.component.css.map */"] });
var TotInputComponent = _TotInputComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TotInputComponent, [{
    type: Component,
    args: [{ selector: "tot-input", standalone: true, imports: [CommonModule, FormsModule, NzInputModule, NzIconModule], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TotInputComponent),
        multi: true
      }
    ], template: `<!-- Tr\u01B0\u1EDDng M\u1EADt Kh\u1EA9u v\u1EDBi N\xFAt chuy\u1EC3n \u0111\u1ED5i m\u1EAFt \u1EA8n/Hi\u1EC7n -->
<ng-container *ngIf="type === 'password'">
  <nz-input-group [nzPrefixIcon]="prefixIcon || undefined" [nzSuffix]="passwordSuffix">
    <input
      [type]="passwordVisible ? 'text' : 'password'"
      nz-input
      [placeholder]="placeholder"
      [disabled]="disabled"
      [value]="value"
      (input)="onInputChange($event)"
      (blur)="onBlur()"
    />
  </nz-input-group>
  <ng-template #passwordSuffix>
    <span
      nz-icon
      [nzType]="passwordVisible ? 'eye-invisible' : 'eye'"
      (click)="passwordVisible = !passwordVisible"
      style="cursor: pointer;"
    ></span>
  </ng-template>
</ng-container>

<!-- Tr\u01B0\u1EDDng Nh\u1EADp V\u0103n B\u1EA3n Th\xF4ng Th\u01B0\u1EDDng -->
<ng-container *ngIf="type === 'text'">
  <nz-input-group *ngIf="prefixIcon; else normalText" [nzPrefixIcon]="prefixIcon">
    <input
      type="text"
      nz-input
      [placeholder]="placeholder"
      [disabled]="disabled"
      [value]="value"
      (input)="onInputChange($event)"
      (blur)="onBlur()"
    />
  </nz-input-group>
  <ng-template #normalText>
    <input
      type="text"
      nz-input
      [placeholder]="placeholder"
      [disabled]="disabled"
      [value]="value"
      (input)="onInputChange($event)"
      (blur)="onBlur()"
    />
  </ng-template>
</ng-container>

<!-- Tr\u01B0\u1EDDng Nh\u1EADp Area (Textarea) -->
<textarea
  *ngIf="type === 'textarea'"
  nz-input
  [rows]="rows"
  [placeholder]="placeholder"
  [disabled]="disabled"
  [value]="value"
  (input)="onInputChange($event)"
  (blur)="onBlur()"
></textarea>
`, styles: ["/* projects/tot/shared/src/lib/components/tot-input/tot-input.component.css */\n:host {\n  display: block;\n  width: 100%;\n}\n/*# sourceMappingURL=tot-input.component.css.map */\n"] }]
  }], null, { type: [{
    type: Input
  }], placeholder: [{
    type: Input
  }], prefixIcon: [{
    type: Input
  }], rows: [{
    type: Input
  }], disabled: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TotInputComponent, { className: "TotInputComponent", filePath: "projects/tot/shared/src/lib/components/tot-input/tot-input.component.ts", lineNumber: 21 });
})();

export {
  APP_CLAIMS,
  ALL_CLAIMS,
  ADMIN_CLAIM,
  ADMIN_ROLE,
  CLAIMS_VERSION,
  AuthService,
  TotInputComponent
};
//# sourceMappingURL=chunk-SQTK734B.js.map
