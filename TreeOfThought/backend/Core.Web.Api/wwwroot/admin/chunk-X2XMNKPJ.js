import {
  FirebaseService
} from "./chunk-3NZ5Q47C.js";
import {
  ADMIN_CLAIM,
  ADMIN_ROLE,
  ALL_CLAIMS,
  CLAIMS_VERSION
} from "./chunk-F6TGNGA2.js";
import {
  Directionality,
  HttpClientService,
  NgTemplateOutlet,
  NzBreakpointEnum,
  NzBreakpointService,
  NzConfigService,
  NzOutletModule,
  NzStringTemplateOutletDirective,
  Router,
  WithConfig,
  gridResponsiveMap,
  takeUntilDestroyed,
  warn
} from "./chunk-UBWGFO7R.js";
import {
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DestroyRef,
  Injectable,
  Input,
  NgModule,
  Subject,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  auditTime,
  booleanAttribute,
  inject,
  merge,
  numberAttribute,
  setClassMetadata,
  startWith,
  switchMap,
  tap,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomTemplate,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-UJ2IZ7EW.js";

// src/app/core/auth/auth.service.ts
var AuthService = class _AuthService {
  http = inject(HttpClientService);
  firebase = inject(FirebaseService);
  router = inject(Router);
  authStatusSubject = new BehaviorSubject(this.hasToken());
  authStatus$ = this.authStatusSubject.asObservable();
  user$ = this.firebase.user$;
  constructor() {
    if (this.hasToken()) {
      this.syncClaims();
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
    this.authStatusSubject.next(false);
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
      const claims = response.claims || response.Claims || [];
      const roles = response.roles || response.Roles || [];
      localStorage.setItem("claims", JSON.stringify(claims));
      localStorage.setItem("roles", JSON.stringify(roles));
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
    if (!rawClaims || rawClaims === "undefined")
      return false;
    try {
      const userClaims = JSON.parse(rawClaims) || [];
      const userRoles = rawRoles ? JSON.parse(rawRoles) : [];
      if (!Array.isArray(userClaims))
        return false;
      if (userRoles.includes(ADMIN_ROLE) || userClaims.includes(ADMIN_CLAIM))
        return true;
      const claimsToCheck = Array.isArray(claimOrClaims) ? claimOrClaims.filter((c) => !!c) : claimOrClaims ? [claimOrClaims] : [];
      if (claimsToCheck.length === 0) {
        return true;
      }
      if (mode === "OR") {
        return claimsToCheck.some((c) => userClaims.includes(c));
      } else {
        return claimsToCheck.every((c) => userClaims.includes(c));
      }
    } catch (e) {
      console.error("Error parsing claims from localStorage", e);
      return false;
    }
  }
  isLoggedIn() {
    return !!localStorage.getItem("jwt_token");
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-descriptions.mjs
var _c0 = ["*"];
function NzDescriptionsItemComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function NzDescriptionsComponent_Conditional_0_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzTitle);
  }
}
function NzDescriptionsComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275template(1, NzDescriptionsComponent_Conditional_0_Conditional_1_ng_container_1_Template, 2, 1, "ng-container", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzTitle);
  }
}
function NzDescriptionsComponent_Conditional_0_Conditional_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzExtra);
  }
}
function NzDescriptionsComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275template(1, NzDescriptionsComponent_Conditional_0_Conditional_2_ng_container_1_Template, 2, 1, "ng-container", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzExtra);
  }
}
function NzDescriptionsComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275conditionalCreate(1, NzDescriptionsComponent_Conditional_0_Conditional_1_Template, 2, 1, "div", 2);
    \u0275\u0275conditionalCreate(2, NzDescriptionsComponent_Conditional_0_Conditional_2_Template, 2, 1, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzTitle ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzExtra ? 2 : -1);
  }
}
function NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.title, " ");
  }
}
function NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_0_ng_template_5_Template(rf, ctx) {
}
function NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 6)(1, "div", 7)(2, "span", 8);
    \u0275\u0275template(3, NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_0_ng_container_3_Template, 2, 1, "ng-container", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 9);
    \u0275\u0275template(5, NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_0_ng_template_5_Template, 0, 0, "ng-template", 10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("colSpan", item_r2.span);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("ant-descriptions-item-no-colon", !ctx_r0.nzColon);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", item_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", item_r2.content);
  }
}
function NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.title, " ");
  }
}
function NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_1_ng_template_3_Template(rf, ctx) {
}
function NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 8);
    \u0275\u0275template(1, NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_1_ng_container_1_Template, 2, 1, "ng-container", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "td", 11);
    \u0275\u0275template(3, NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_1_ng_template_3_Template, 0, 0, "ng-template", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", item_r2.title);
    \u0275\u0275advance();
    \u0275\u0275property("colSpan", item_r2.span * 2 - 1);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", item_r2.content);
  }
}
function NzDescriptionsComponent_Conditional_4_For_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_0_Template, 6, 5, "td", 6)(1, NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_1_Template, 4, 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(!ctx_r0.nzBordered ? 0 : 1);
  }
}
function NzDescriptionsComponent_Conditional_4_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 5);
    \u0275\u0275repeaterCreate(1, NzDescriptionsComponent_Conditional_4_For_1_For_2_Template, 2, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r3);
  }
}
function NzDescriptionsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, NzDescriptionsComponent_Conditional_4_For_1_Template, 3, 0, "tr", 5, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r0.itemMatrix);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r4.title, " ");
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 6)(1, "div", 7)(2, "span", 8);
    \u0275\u0275template(3, NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_2_ng_container_3_Template, 2, 1, "ng-container", 4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("colSpan", item_r4.span);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("ant-descriptions-item-no-colon", !ctx_r0.nzColon);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", item_r4.title);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_5_ng_template_3_Template(rf, ctx) {
}
function NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 6)(1, "div", 7)(2, "span", 9);
    \u0275\u0275template(3, NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_5_ng_template_3_Template, 0, 0, "ng-template", 10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275property("colSpan", item_r5.span);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngTemplateOutlet", item_r5.content);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 5);
    \u0275\u0275repeaterCreate(1, NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_2_Template, 4, 4, "td", 6, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "tr", 5);
    \u0275\u0275repeaterCreate(4, NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_5_Template, 4, 2, "td", 6, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r6);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(row_r6);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_Template, 6, 0, null, null, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r0.itemMatrix);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.title, " ");
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 12);
    \u0275\u0275template(1, NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_2_ng_container_1_Template, 2, 1, "ng-container", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275property("colSpan", item_r7.span);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", item_r7.title);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_5_ng_template_1_Template(rf, ctx) {
}
function NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 11);
    \u0275\u0275template(1, NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_5_ng_template_1_Template, 0, 0, "ng-template", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275property("colSpan", item_r8.span);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", item_r8.content);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 5);
    \u0275\u0275repeaterCreate(1, NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_2_Template, 2, 2, "td", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "tr", 5);
    \u0275\u0275repeaterCreate(4, NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_5_Template, 2, 2, "td", 11, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r9);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(row_r9);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_Template, 6, 0, null, null, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r0.itemMatrix);
  }
}
function NzDescriptionsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzDescriptionsComponent_Conditional_5_Conditional_0_Template, 2, 0)(1, NzDescriptionsComponent_Conditional_5_Conditional_1_Template, 2, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r0.nzBordered ? 0 : 1);
  }
}
var NzDescriptionsItemComponent = class _NzDescriptionsItemComponent {
  content;
  nzSpan = 1;
  nzTitle = "";
  inputChange$ = new Subject();
  ngOnChanges() {
    this.inputChange$.next();
  }
  ngOnDestroy() {
    this.inputChange$.complete();
  }
  static \u0275fac = function NzDescriptionsItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzDescriptionsItemComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _NzDescriptionsItemComponent,
    selectors: [["nz-descriptions-item"]],
    viewQuery: function NzDescriptionsItemComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(TemplateRef, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.content = _t.first);
      }
    },
    inputs: {
      nzSpan: [2, "nzSpan", "nzSpan", numberAttribute],
      nzTitle: "nzTitle"
    },
    exportAs: ["nzDescriptionsItem"],
    features: [\u0275\u0275NgOnChangesFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function NzDescriptionsItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275domTemplate(0, NzDescriptionsItemComponent_ng_template_0_Template, 1, 0, "ng-template");
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDescriptionsItemComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-descriptions-item",
      template: `
    <ng-template>
      <ng-content />
    </ng-template>
  `,
      exportAs: "nzDescriptionsItem"
    }]
  }], null, {
    content: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }],
    nzSpan: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzTitle: [{
      type: Input
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME = "descriptions";
var defaultColumnMap = {
  xxl: 3,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1
};
var NzDescriptionsComponent = (() => {
  let _nzBordered_decorators;
  let _nzBordered_initializers = [];
  let _nzBordered_extraInitializers = [];
  let _nzColumn_decorators;
  let _nzColumn_initializers = [];
  let _nzColumn_extraInitializers = [];
  let _nzSize_decorators;
  let _nzSize_initializers = [];
  let _nzSize_extraInitializers = [];
  let _nzColon_decorators;
  let _nzColon_initializers = [];
  let _nzColon_extraInitializers = [];
  return class NzDescriptionsComponent2 {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
      _nzBordered_decorators = [WithConfig()];
      _nzColumn_decorators = [WithConfig()];
      _nzSize_decorators = [WithConfig()];
      _nzColon_decorators = [WithConfig()];
      __esDecorate(null, null, _nzBordered_decorators, {
        kind: "field",
        name: "nzBordered",
        static: false,
        private: false,
        access: {
          has: (obj) => "nzBordered" in obj,
          get: (obj) => obj.nzBordered,
          set: (obj, value) => {
            obj.nzBordered = value;
          }
        },
        metadata: _metadata
      }, _nzBordered_initializers, _nzBordered_extraInitializers);
      __esDecorate(null, null, _nzColumn_decorators, {
        kind: "field",
        name: "nzColumn",
        static: false,
        private: false,
        access: {
          has: (obj) => "nzColumn" in obj,
          get: (obj) => obj.nzColumn,
          set: (obj, value) => {
            obj.nzColumn = value;
          }
        },
        metadata: _metadata
      }, _nzColumn_initializers, _nzColumn_extraInitializers);
      __esDecorate(null, null, _nzSize_decorators, {
        kind: "field",
        name: "nzSize",
        static: false,
        private: false,
        access: {
          has: (obj) => "nzSize" in obj,
          get: (obj) => obj.nzSize,
          set: (obj, value) => {
            obj.nzSize = value;
          }
        },
        metadata: _metadata
      }, _nzSize_initializers, _nzSize_extraInitializers);
      __esDecorate(null, null, _nzColon_decorators, {
        kind: "field",
        name: "nzColon",
        static: false,
        private: false,
        access: {
          has: (obj) => "nzColon" in obj,
          get: (obj) => obj.nzColon,
          set: (obj, value) => {
            obj.nzColon = value;
          }
        },
        metadata: _metadata
      }, _nzColon_initializers, _nzColon_extraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata
      });
    }
    nzConfigService = inject(NzConfigService);
    cdr = inject(ChangeDetectorRef);
    breakpointService = inject(NzBreakpointService);
    directionality = inject(Directionality);
    destroyRef = inject(DestroyRef);
    _nzModuleName = NZ_CONFIG_MODULE_NAME;
    items;
    nzBordered = __runInitializers(this, _nzBordered_initializers, false);
    nzLayout = (__runInitializers(this, _nzBordered_extraInitializers), "horizontal");
    nzColumn = __runInitializers(this, _nzColumn_initializers, defaultColumnMap);
    nzSize = (__runInitializers(this, _nzColumn_extraInitializers), __runInitializers(this, _nzSize_initializers, "default"));
    nzTitle = (__runInitializers(this, _nzSize_extraInitializers), "");
    nzExtra;
    nzColon = __runInitializers(this, _nzColon_initializers, true);
    itemMatrix = (__runInitializers(this, _nzColon_extraInitializers), []);
    realColumn = 3;
    dir = "ltr";
    breakpoint = NzBreakpointEnum.md;
    ngOnInit() {
      this.dir = this.directionality.value;
      this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
        this.dir = direction;
      });
    }
    ngOnChanges(changes) {
      if (changes.nzColumn) {
        this.prepareMatrix();
      }
    }
    ngAfterContentInit() {
      const contentChange$ = this.items.changes.pipe(startWith(this.items));
      merge(contentChange$, contentChange$.pipe(switchMap(() => merge(...this.items.map((i) => i.inputChange$)).pipe(auditTime(16)))), this.breakpointService.subscribe(gridResponsiveMap).pipe(tap((bp) => this.breakpoint = bp))).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.prepareMatrix();
        this.cdr.markForCheck();
      });
    }
    /**
     * Prepare the render matrix according to description items' spans.
     */
    prepareMatrix() {
      if (!this.items) {
        return;
      }
      let currentRow = [];
      let width = 0;
      const column = this.realColumn = this.getColumn();
      const items = this.items.toArray();
      const length = items.length;
      const matrix = [];
      const flushRow = () => {
        matrix.push(currentRow);
        currentRow = [];
        width = 0;
      };
      for (let i = 0; i < length; i++) {
        const item = items[i];
        const {
          nzTitle: title,
          content,
          nzSpan: span
        } = item;
        width += span;
        if (width >= column) {
          if (width > column) {
            warn(`"nzColumn" is ${column} but we have row length ${width}`);
          }
          currentRow.push({
            title,
            content,
            span: column - (width - span)
          });
          flushRow();
        } else if (i === length - 1) {
          currentRow.push({
            title,
            content,
            span: column - (width - span)
          });
          flushRow();
        } else {
          currentRow.push({
            title,
            content,
            span
          });
        }
      }
      this.itemMatrix = matrix;
    }
    getColumn() {
      if (typeof this.nzColumn !== "number") {
        return this.nzColumn[this.breakpoint];
      }
      return this.nzColumn;
    }
    static \u0275fac = function NzDescriptionsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || NzDescriptionsComponent2)();
    };
    static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: NzDescriptionsComponent2,
      selectors: [["nz-descriptions"]],
      contentQueries: function NzDescriptionsComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, NzDescriptionsItemComponent, 4);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.items = _t);
        }
      },
      hostAttrs: [1, "ant-descriptions"],
      hostVars: 8,
      hostBindings: function NzDescriptionsComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classProp("ant-descriptions-bordered", ctx.nzBordered)("ant-descriptions-middle", ctx.nzSize === "middle")("ant-descriptions-small", ctx.nzSize === "small")("ant-descriptions-rtl", ctx.dir === "rtl");
        }
      },
      inputs: {
        nzBordered: [2, "nzBordered", "nzBordered", booleanAttribute],
        nzLayout: "nzLayout",
        nzColumn: "nzColumn",
        nzSize: "nzSize",
        nzTitle: "nzTitle",
        nzExtra: "nzExtra",
        nzColon: [2, "nzColon", "nzColon", booleanAttribute]
      },
      exportAs: ["nzDescriptions"],
      features: [\u0275\u0275NgOnChangesFeature],
      decls: 6,
      vars: 3,
      consts: [[1, "ant-descriptions-header"], [1, "ant-descriptions-view"], [1, "ant-descriptions-title"], [1, "ant-descriptions-extra"], [4, "nzStringTemplateOutlet"], [1, "ant-descriptions-row"], [1, "ant-descriptions-item", 3, "colSpan"], [1, "ant-descriptions-item-container"], [1, "ant-descriptions-item-label"], [1, "ant-descriptions-item-content"], [3, "ngTemplateOutlet"], [1, "ant-descriptions-item-content", 3, "colSpan"], [1, "ant-descriptions-item-label", 3, "colSpan"]],
      template: function NzDescriptionsComponent_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275conditionalCreate(0, NzDescriptionsComponent_Conditional_0_Template, 3, 2, "div", 0);
          \u0275\u0275elementStart(1, "div", 1)(2, "table")(3, "tbody");
          \u0275\u0275conditionalCreate(4, NzDescriptionsComponent_Conditional_4_Template, 2, 0);
          \u0275\u0275conditionalCreate(5, NzDescriptionsComponent_Conditional_5_Template, 2, 1);
          \u0275\u0275elementEnd()()();
        }
        if (rf & 2) {
          \u0275\u0275conditional(ctx.nzTitle || ctx.nzExtra ? 0 : -1);
          \u0275\u0275advance(4);
          \u0275\u0275conditional(ctx.nzLayout === "horizontal" ? 4 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.nzLayout === "vertical" ? 5 : -1);
        }
      },
      dependencies: [NzOutletModule, NzStringTemplateOutletDirective, NgTemplateOutlet],
      encapsulation: 2,
      changeDetection: 0
    });
  };
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDescriptionsComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-descriptions",
      exportAs: "nzDescriptions",
      template: `
    @if (nzTitle || nzExtra) {
      <div class="ant-descriptions-header">
        @if (nzTitle) {
          <div class="ant-descriptions-title">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </div>
        }
        @if (nzExtra) {
          <div class="ant-descriptions-extra">
            <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
          </div>
        }
      </div>
    }

    <div class="ant-descriptions-view">
      <table>
        <tbody>
          @if (nzLayout === 'horizontal') {
            @for (row of itemMatrix; track row; let i = $index) {
              <tr class="ant-descriptions-row">
                @for (item of row; track item; let isLast = $last) {
                  @if (!nzBordered) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-label" [class.ant-descriptions-item-no-colon]="!nzColon">
                          <ng-container *nzStringTemplateOutlet="item.title">
                            {{ item.title }}
                          </ng-container>
                        </span>
                        <span class="ant-descriptions-item-content">
                          <ng-template [ngTemplateOutlet]="item.content" />
                        </span>
                      </div>
                    </td>
                  } @else {
                    <td class="ant-descriptions-item-label">
                      <ng-container *nzStringTemplateOutlet="item.title">
                        {{ item.title }}
                      </ng-container>
                    </td>
                    <td class="ant-descriptions-item-content" [colSpan]="item.span * 2 - 1">
                      <ng-template [ngTemplateOutlet]="item.content" />
                    </td>
                  }
                }
              </tr>
            }
          }

          @if (nzLayout === 'vertical') {
            @if (!nzBordered) {
              @for (row of itemMatrix; track row; let i = $index) {
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-label" [class.ant-descriptions-item-no-colon]="!nzColon">
                          <ng-container *nzStringTemplateOutlet="item.title">
                            {{ item.title }}
                          </ng-container>
                        </span>
                      </div>
                    </td>
                  }
                </tr>
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-content">
                          <ng-template [ngTemplateOutlet]="item.content" />
                        </span>
                      </div>
                    </td>
                  }
                </tr>
              }
            } @else {
              @for (row of itemMatrix; track row; let i = $index) {
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item-label" [colSpan]="item.span">
                      <ng-container *nzStringTemplateOutlet="item.title">
                        {{ item.title }}
                      </ng-container>
                    </td>
                  }
                </tr>
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item-content" [colSpan]="item.span">
                      <ng-template [ngTemplateOutlet]="item.content" />
                    </td>
                  }
                </tr>
              }
            }
          }
        </tbody>
      </table>
    </div>
  `,
      host: {
        class: "ant-descriptions",
        "[class.ant-descriptions-bordered]": "nzBordered",
        "[class.ant-descriptions-middle]": 'nzSize === "middle"',
        "[class.ant-descriptions-small]": 'nzSize === "small"',
        "[class.ant-descriptions-rtl]": 'dir === "rtl"'
      },
      imports: [NzOutletModule, NgTemplateOutlet]
    }]
  }], null, {
    items: [{
      type: ContentChildren,
      args: [NzDescriptionsItemComponent]
    }],
    nzBordered: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzLayout: [{
      type: Input
    }],
    nzColumn: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzTitle: [{
      type: Input
    }],
    nzExtra: [{
      type: Input
    }],
    nzColon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var NzDescriptionsModule = class _NzDescriptionsModule {
  static \u0275fac = function NzDescriptionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzDescriptionsModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _NzDescriptionsModule,
    imports: [NzDescriptionsComponent, NzDescriptionsItemComponent],
    exports: [NzDescriptionsComponent, NzDescriptionsItemComponent]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [NzDescriptionsComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDescriptionsModule, [{
    type: NgModule,
    args: [{
      imports: [NzDescriptionsComponent, NzDescriptionsItemComponent],
      exports: [NzDescriptionsComponent, NzDescriptionsItemComponent]
    }]
  }], null, null);
})();

export {
  AuthService,
  NzDescriptionsItemComponent,
  NzDescriptionsComponent,
  NzDescriptionsModule
};
//# sourceMappingURL=chunk-X2XMNKPJ.js.map
