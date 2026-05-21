import {
  ADMIN_CLAIM,
  ADMIN_ROLE,
  ALL_CLAIMS,
  APP_CLAIMS,
  AuthService,
  CLAIMS_VERSION,
  TotInputComponent
} from "./chunk-4OJCKPON.js";
import {
  NzDescriptionsComponent,
  NzDescriptionsItemComponent,
  NzDescriptionsModule
} from "./chunk-5GYSHPO5.js";
import {
  NzAvatarComponent,
  NzAvatarModule
} from "./chunk-V6SMJRWP.js";
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormModule
} from "./chunk-FDGA4VMS.js";
import {
  NzColDirective,
  NzDatePickerComponent,
  NzDatePickerModule,
  NzDividerComponent,
  NzDividerModule,
  NzGridModule,
  NzRangePickerComponent,
  NzRowDirective
} from "./chunk-FY72G7LH.js";
import "./chunk-ICEMZKP7.js";
import "./chunk-IRGOCD6C.js";
import {
  A11yModule,
  AppNotificationService,
  CdkMonitorFocus,
  CommonModule,
  DOWN_ARROW,
  DatePipe,
  DefaultValueAccessor,
  Directionality,
  ENTER,
  FocusKeyManager,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  HttpClientService,
  LEFT_ARROW,
  NG_VALUE_ACCESSOR,
  NavigationEnd,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgForm,
  NgIf,
  NgModel,
  NgTemplateOutlet,
  NonNullableFormBuilder,
  NzAutosizeDirective,
  NzButtonModule,
  NzCardComponent,
  NzCardModule,
  NzCheckboxComponent,
  NzCheckboxGroupComponent,
  NzCheckboxModule,
  NzConfigService,
  NzDropdownDirective,
  NzDropdownMenuComponent,
  NzDropdownModule,
  NzIconDirective,
  NzIconModule,
  NzInputDirective,
  NzInputGroupComponent,
  NzInputGroupWhitSuffixOrPrefixDirective,
  NzInputModule,
  NzMenuDirective,
  NzMenuItemComponent,
  NzMenuModule,
  NzMessageService,
  NzModalComponent,
  NzModalContentDirective,
  NzModalModule,
  NzModalService,
  NzOptionComponent,
  NzOutletModule,
  NzRadioComponent,
  NzRadioGroupComponent,
  NzRadioModule,
  NzResizeObserver,
  NzSelectComponent,
  NzSelectModule,
  NzSpaceComponent,
  NzSpaceItemDirective,
  NzSpaceModule,
  NzSpinComponent,
  NzSpinModule,
  NzStringTemplateOutletDirective,
  NzTableModule,
  NzTagComponent,
  NzTagModule,
  NzTransitionPatchDirective,
  PREFIX,
  RIGHT_ARROW,
  ReactiveFormsModule,
  RequiredValidator,
  Router,
  RouterLink,
  SPACE,
  TotButtonComponent,
  TotCellDirective,
  TotTableComponent,
  TranslocoModule,
  TranslocoPipe,
  TranslocoService,
  UP_ARROW,
  Validators,
  ViewportRuler,
  WithConfig,
  coerceCssPixelValue,
  coerceNumberProperty,
  fromEventOutsideAngular,
  generateClassName,
  hasModifierKey,
  isAnimationEnabled,
  isNil,
  requestAnimationFrame,
  takeUntilDestroyed,
  wrapIntoObservable,
  ɵNgNoValidate
} from "./chunk-H2M3TIKJ.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Output,
  QueryList,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  animationFrameScheduler,
  asapScheduler,
  auditTime,
  booleanAttribute,
  computed,
  contentChildren,
  debounceTime,
  delay,
  distinctUntilChanged,
  effect,
  filter,
  first,
  forwardRef,
  inject,
  input,
  merge,
  of,
  setClassMetadata,
  signal,
  startWith,
  takeUntil,
  untracked,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-FOY232A2.js";
import {
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-MYGOUE3E.js";

// projects/tot/business-oidc/src/lib/services/auth-management.service.ts
var _AuthManagementService = class _AuthManagementService {
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
  getAcl(resourceType, resourceId, pageIndex, pageSize) {
    const params = { resourceType, resourceId };
    if (pageIndex)
      params.pageIndex = pageIndex;
    if (pageSize)
      params.pageSize = pageSize;
    return this.http.get(`${this.BASE_URL}/acl`, { params });
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
  getUserFcmTokens(userId) {
    return this.http.get(`${this.BASE_URL}/users/${userId}/fcm-tokens`);
  }
  sendNotification(payload) {
    return this.http.post(`${this.BASE_URL}/users/send-notification`, payload);
  }
};
_AuthManagementService.\u0275fac = function AuthManagementService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthManagementService)();
};
_AuthManagementService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthManagementService, factory: _AuthManagementService.\u0275fac, providedIn: "root" });
var AuthManagementService = _AuthManagementService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthManagementService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// projects/tot/shared/src/lib/components/tot-autocomplete/tot-autocomplete.component.ts
function TotAutocompleteComponent_ng_container_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "label", 5);
    \u0275\u0275listener("click", function TotAutocompleteComponent_ng_container_2_ng_container_2_Template_label_click_1_listener($event) {
      return $event.preventDefault();
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 6);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzChecked", ctx_r1.isSelected(item_r1));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getFieldValue(item_r1, ctx_r1.labelField));
  }
}
function TotAutocompleteComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "nz-option", 3);
    \u0275\u0275template(2, TotAutocompleteComponent_ng_container_2_ng_container_2_Template, 4, 2, "ng-container", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzLabel", ctx_r1.getFieldValue(item_r1, ctx_r1.labelField))("nzValue", ctx_r1.getFieldValue(item_r1, ctx_r1.valueField))("nzCustomContent", ctx_r1.mode === "multiple");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.mode === "multiple");
  }
}
function TotAutocompleteComponent_nz_option_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-option", 7);
    \u0275\u0275element(1, "nz-spin", 8);
    \u0275\u0275elementEnd();
  }
}
var _TotAutocompleteComponent = class _TotAutocompleteComponent {
  constructor() {
    this.httpService = inject(HttpClientService);
    this.destroy$ = new Subject();
    this.search$ = new Subject();
    this.apiUrl = "";
    this.params = {};
    this.mode = "default";
    this.placeholder = "Vui l\xF2ng ch\u1ECDn";
    this.labelField = "name";
    this.valueField = "id";
    this.pageSize = 10;
    this.valueChange = new EventEmitter();
    this.options = [];
    this.selectedValue = null;
    this.loading = false;
    this.pageIndex = 1;
    this.hasMore = true;
    this.searchTerm = "";
    this.onChange = () => {
    };
    this.onTouched = () => {
    };
  }
  getCacheKey() {
    const paramsStr = JSON.stringify(this.params || {});
    return `tot_autocomplete_cache_${this.apiUrl}_${paramsStr}`;
  }
  getCache() {
    try {
      const data = sessionStorage.getItem(this.getCacheKey());
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }
  setCache(data) {
    try {
      sessionStorage.setItem(this.getCacheKey(), JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to save to sessionStorage", e);
    }
  }
  ngOnInit() {
    this.search$.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((term) => {
      this.searchTerm = term;
      this.resetAndFetch();
    });
    const cached = this.getCache();
    if (cached.length > 0) {
      this.options = cached.slice(0, this.pageSize);
      this.hasMore = cached.length > this.options.length;
    } else {
      this.fetchData();
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  // ControlValueAccessor methods
  writeValue(value) {
    this.selectedValue = value;
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
  }
  onValueChange(value) {
    this.selectedValue = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }
  onSearch(value) {
    this.search$.next(value);
  }
  onScrollToBottom() {
    if (this.loading)
      return;
    const cached = this.getCache();
    if (!this.searchTerm && cached.length > this.options.length) {
      this.pageIndex++;
      this.options = cached.slice(0, this.pageIndex * this.pageSize);
      this.hasMore = cached.length > this.options.length;
      return;
    }
    if (this.hasMore) {
      this.pageIndex++;
      this.fetchData();
    }
  }
  resetAndFetch() {
    this.pageIndex = 1;
    this.options = [];
    this.hasMore = true;
    this.fetchData();
  }
  async fetchData() {
    var _a;
    if (!this.apiUrl || this.loading)
      return;
    this.loading = true;
    try {
      const queryParams = __spreadProps(__spreadValues({}, this.params), {
        keyword: this.searchTerm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      const res = await this.httpService.get(this.apiUrl, { params: queryParams });
      const newItems = Array.isArray(res) ? res : (res == null ? void 0 : res.items) || [];
      const total = (_a = res == null ? void 0 : res.total) != null ? _a : 0;
      let allCached = this.getCache();
      newItems.forEach((item) => {
        const val = this.getFieldValue(item, this.valueField);
        if (!allCached.find((c) => this.getFieldValue(c, this.valueField) === val)) {
          allCached.push(item);
        }
      });
      this.setCache(allCached);
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        this.options = allCached.filter((item) => this.getFieldValue(item, this.labelField).toLowerCase().includes(term));
        this.hasMore = false;
      } else {
        this.options = allCached.slice(0, this.pageIndex * this.pageSize);
        if (Array.isArray(res)) {
          this.hasMore = allCached.length > this.options.length;
        } else {
          this.hasMore = this.options.length < total || allCached.length > this.options.length;
        }
      }
    } catch (error) {
      console.error("Error fetching select options:", error);
    } finally {
      this.loading = false;
    }
  }
  // Helper to get nested properties if field is like 'user.name'
  getFieldValue(item, field) {
    if (!item)
      return "";
    return field.split(".").reduce((obj, key) => obj == null ? void 0 : obj[key], item) || "";
  }
  isSelected(item) {
    if (this.selectedValue === null || this.selectedValue === void 0)
      return false;
    const itemValue = this.getFieldValue(item, this.valueField);
    if (this.mode === "multiple" && Array.isArray(this.selectedValue)) {
      return this.selectedValue.includes(itemValue);
    }
    return this.selectedValue === itemValue;
  }
};
_TotAutocompleteComponent.\u0275fac = function TotAutocompleteComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TotAutocompleteComponent)();
};
_TotAutocompleteComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TotAutocompleteComponent, selectors: [["tot-autocomplete"]], inputs: { apiUrl: "apiUrl", params: "params", mode: "mode", placeholder: "placeholder", labelField: "labelField", valueField: "valueField", pageSize: "pageSize" }, outputs: { valueChange: "valueChange" }, features: [\u0275\u0275ProvidersFeature([
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _TotAutocompleteComponent),
    multi: true
  }
])], decls: 4, vars: 11, consts: [[2, "width", "100%", 3, "ngModelChange", "nzOnSearch", "nzScrollToBottom", "nzMode", "nzPlaceHolder", "nzLoading", "nzShowSearch", "nzServerSearch", "ngModel", "nzAllowClear"], [4, "ngFor", "ngForOf"], ["nzDisabled", "", "nzCustomContent", "", 4, "ngIf"], [3, "nzLabel", "nzValue", "nzCustomContent"], [4, "ngIf"], ["nz-checkbox", "", 3, "click", "nzChecked"], [2, "margin-left", "8px"], ["nzDisabled", "", "nzCustomContent", ""], ["nzSimple", ""]], template: function TotAutocompleteComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-select", 0);
    \u0275\u0275pipe(1, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function TotAutocompleteComponent_Template_nz_select_ngModelChange_0_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.selectedValue, $event) || (ctx.selectedValue = $event);
      return $event;
    });
    \u0275\u0275listener("ngModelChange", function TotAutocompleteComponent_Template_nz_select_ngModelChange_0_listener($event) {
      return ctx.onValueChange($event);
    })("nzOnSearch", function TotAutocompleteComponent_Template_nz_select_nzOnSearch_0_listener($event) {
      return ctx.onSearch($event);
    })("nzScrollToBottom", function TotAutocompleteComponent_Template_nz_select_nzScrollToBottom_0_listener() {
      return ctx.onScrollToBottom();
    });
    \u0275\u0275template(2, TotAutocompleteComponent_ng_container_2_Template, 3, 4, "ng-container", 1)(3, TotAutocompleteComponent_nz_option_3_Template, 2, 0, "nz-option", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("nzMode", ctx.mode)("nzPlaceHolder", \u0275\u0275pipeBind1(1, 9, ctx.placeholder))("nzLoading", ctx.loading)("nzShowSearch", true)("nzServerSearch", true);
    \u0275\u0275twoWayProperty("ngModel", ctx.selectedValue);
    \u0275\u0275property("nzAllowClear", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx.options);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.loading);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgControlStatus, NgModel, NzSelectModule, NzOptionComponent, NzSelectComponent, NzCheckboxModule, NzCheckboxComponent, NzSpinModule, NzSpinComponent, TranslocoModule, TranslocoPipe], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n  .ant-select-item-option-content {\n  display: flex;\n  align-items: center;\n}\n  .ant-select-item-option-selected label[nz-checkbox] .ant-checkbox-inner {\n  background-color: #1890ff;\n  border-color: #1890ff;\n}\n/*# sourceMappingURL=tot-autocomplete.component.css.map */"] });
var TotAutocompleteComponent = _TotAutocompleteComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TotAutocompleteComponent, [{
    type: Component,
    args: [{ selector: "tot-autocomplete", standalone: true, imports: [CommonModule, FormsModule, NzSelectModule, NzCheckboxModule, NzSpinModule, TranslocoModule], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TotAutocompleteComponent),
        multi: true
      }
    ], template: `<nz-select
  [nzMode]="mode"
  [nzPlaceHolder]="placeholder | transloco"
  [nzLoading]="loading"
  [nzShowSearch]="true"
  [nzServerSearch]="true"
  [(ngModel)]="selectedValue"
  (ngModelChange)="onValueChange($event)"
  (nzOnSearch)="onSearch($event)"
  (nzScrollToBottom)="onScrollToBottom()"
  [nzAllowClear]="true"
  style="width: 100%;"
>
  <ng-container *ngFor="let item of options">
    <nz-option
      [nzLabel]="getFieldValue(item, labelField)"
      [nzValue]="getFieldValue(item, valueField)"
      [nzCustomContent]="mode === 'multiple'"
    >
      <ng-container *ngIf="mode === 'multiple'">
        <label nz-checkbox [nzChecked]="isSelected(item)" (click)="$event.preventDefault()"></label>
        <span style="margin-left: 8px;">{{ getFieldValue(item, labelField) }}</span>
      </ng-container>
    </nz-option>
  </ng-container>

  <nz-option *ngIf="loading" nzDisabled nzCustomContent>
    <nz-spin nzSimple></nz-spin>
  </nz-option>
</nz-select>
`, styles: ["/* projects/tot/shared/src/lib/components/tot-autocomplete/tot-autocomplete.component.css */\n:host {\n  display: block;\n  width: 100%;\n}\n::ng-deep .ant-select-item-option-content {\n  display: flex;\n  align-items: center;\n}\n::ng-deep .ant-select-item-option-selected label[nz-checkbox] .ant-checkbox-inner {\n  background-color: #1890ff;\n  border-color: #1890ff;\n}\n/*# sourceMappingURL=tot-autocomplete.component.css.map */\n"] }]
  }], null, { apiUrl: [{
    type: Input
  }], params: [{
    type: Input
  }], mode: [{
    type: Input
  }], placeholder: [{
    type: Input
  }], labelField: [{
    type: Input
  }], valueField: [{
    type: Input
  }], pageSize: [{
    type: Input
  }], valueChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TotAutocompleteComponent, { className: "TotAutocompleteComponent", filePath: "projects/tot/shared/src/lib/components/tot-autocomplete/tot-autocomplete.component.ts", lineNumber: 25 });
})();

// projects/tot/business-oidc/src/lib/user-list/user-list.component.ts
var _c0 = ["userExtraTpl"];
var _c1 = () => [16, 16];
function UserListComponent_tot_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 34);
    \u0275\u0275listener("click", function UserListComponent_tot_button_2_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.syncClaims());
    });
    \u0275\u0275element(1, "span", 35);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("loading", ctx_r2.syncingClaims);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 2, "Sync Claims (BE)"), " ");
  }
}
function UserListComponent_ng_template_3_tot_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 37);
    \u0275\u0275listener("click", function UserListComponent_ng_template_3_tot_button_1_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.showCreateModal());
    });
    \u0275\u0275element(1, "span", 38);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "Th\xEAm ng\u01B0\u1EDDi d\xF9ng"), " ");
  }
}
function UserListComponent_ng_template_3_tot_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 39);
    \u0275\u0275listener("click", function UserListComponent_ng_template_3_tot_button_2_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.loadUsers());
    });
    \u0275\u0275element(1, "span", 40);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("loading", ctx_r2.loading);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 2, "\u0110\u1ED3ng b\u1ED9"), " ");
  }
}
function UserListComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-space");
    \u0275\u0275template(1, UserListComponent_ng_template_3_tot_button_1_Template, 4, 3, "tot-button", 20)(2, UserListComponent_ng_template_3_tot_button_2_Template, 4, 4, "tot-button", 36);
    \u0275\u0275elementEnd();
  }
}
function UserListComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 41);
  }
}
function UserListComponent_tot_button_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 37);
    \u0275\u0275listener("click", function UserListComponent_tot_button_40_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.search());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "T\xECm ki\u1EBFm"));
  }
}
function UserListComponent_tot_button_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 42);
    \u0275\u0275listener("click", function UserListComponent_tot_button_41_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.resetSearch());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "\u0110\u1EB7t l\u1EA1i"));
  }
}
function UserListComponent_ng_template_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275listener("click", function UserListComponent_ng_template_44_Template_div_click_0_listener() {
      const data_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      const avatarInput_r10 = \u0275\u0275reference(53);
      ctx_r2.selectedUserForAvatar = data_r9;
      return \u0275\u0275resetView(avatarInput_r10.click());
    });
    \u0275\u0275element(1, "nz-avatar", 44);
    \u0275\u0275elementStart(2, "div", 45);
    \u0275\u0275element(3, "span", 46);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzSrc", data_r9.avatarUrl)("nzSize", 48);
  }
}
function UserListComponent_ng_template_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r11.displayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r11.username);
  }
}
function UserListComponent_ng_template_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 49);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r12 = ctx.$implicit;
    \u0275\u0275property("nzColor", data_r12.isEmailVerified ? "success" : "warning");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, data_r12.isEmailVerified ? "\u0110\xE3 x\xE1c minh" : "\u0110ang ch\u1EDD"), " ");
  }
}
function UserListComponent_ng_template_47_nz_tag_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-tag", 52);
    \u0275\u0275listener("nzOnClose", function UserListComponent_ng_template_47_nz_tag_0_Template_nz_tag_nzOnClose_0_listener($event) {
      const role_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const data_r16 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeRole($event, data_r16, role_r15));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r15 = ctx.$implicit;
    const data_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("nzMode", (data_r16.username == null ? null : data_r16.username.toLowerCase()) === "admin" && (role_r15.name == null ? null : role_r15.name.toLowerCase()) === "admin" ? "default" : "closeable");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", role_r15.name, " ");
  }
}
function UserListComponent_ng_template_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275template(0, UserListComponent_ng_template_47_nz_tag_0_Template, 2, 2, "nz-tag", 50);
    \u0275\u0275elementStart(1, "tot-button", 51);
    \u0275\u0275listener("click", function UserListComponent_ng_template_47_Template_tot_button_click_1_listener() {
      const data_r16 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showRoleModal(data_r16));
    });
    \u0275\u0275element(2, "span", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r16 = ctx.$implicit;
    \u0275\u0275property("ngForOf", data_r16.roles);
  }
}
function UserListComponent_ng_template_48_nz_tag_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-tag", 54);
    \u0275\u0275listener("nzOnClose", function UserListComponent_ng_template_48_nz_tag_0_Template_nz_tag_nzOnClose_0_listener($event) {
      const claim_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const data_r20 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeClaim($event, data_r20, claim_r19));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const claim_r19 = ctx.$implicit;
    const data_r20 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("nzMode", (data_r20.username == null ? null : data_r20.username.toLowerCase()) === "admin" && (claim_r19.name == null ? null : claim_r19.name.toLowerCase()) === "admin" ? "default" : "closeable");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", claim_r19.name, " ");
  }
}
function UserListComponent_ng_template_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275template(0, UserListComponent_ng_template_48_nz_tag_0_Template, 2, 2, "nz-tag", 53);
    \u0275\u0275elementStart(1, "tot-button", 51);
    \u0275\u0275listener("click", function UserListComponent_ng_template_48_Template_tot_button_click_1_listener() {
      const data_r20 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showClaimModal(data_r20));
    });
    \u0275\u0275element(2, "span", 38);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r20 = ctx.$implicit;
    \u0275\u0275property("ngForOf", data_r20.directClaims);
  }
}
function UserListComponent_ng_template_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const data_r21 = ctx.$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, data_r21.createdAt, "dd/MM/yyyy HH:mm"), " ");
  }
}
function UserListComponent_ng_template_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const data_r22 = ctx.$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, data_r22.updatedAt, "dd/MM/yyyy HH:mm"), " ");
  }
}
function UserListComponent_ng_template_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 55)(1, "tot-button", 56);
    \u0275\u0275listener("click", function UserListComponent_ng_template_51_Template_tot_button_click_1_listener() {
      const data_r24 = \u0275\u0275restoreView(_r23).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal(data_r24));
    });
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "tot-button", 57);
    \u0275\u0275listener("click", function UserListComponent_ng_template_51_Template_tot_button_click_4_listener() {
      const data_r24 = \u0275\u0275restoreView(_r23).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteUser(data_r24));
    });
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "transloco");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r24 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 4, "S\u1EEDa"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzDanger", true)("disabled", (data_r24.username == null ? null : data_r24.username.toLowerCase()) === "admin");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 6, "X\xF3a"));
  }
}
function UserListComponent_ng_container_56_nz_form_item_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-form-item")(1, "nz-form-label", 59);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "nz-form-control")(5, "input", 67);
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_56_nz_form_item_8_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.userForm.password, $event) || (ctx_r2.userForm.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "M\u1EADt kh\u1EA9u"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.userForm.password);
  }
}
function UserListComponent_ng_container_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "form", 58)(2, "nz-form-item")(3, "nz-form-label", 59);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "nz-form-control")(7, "input", 60);
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_56_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.userForm.username, $event) || (ctx_r2.userForm.username = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(8, UserListComponent_ng_container_56_nz_form_item_8_Template, 6, 4, "nz-form-item", 61);
    \u0275\u0275elementStart(9, "nz-form-item")(10, "nz-form-label", 59);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "nz-form-control")(14, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_56_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.userForm.displayName, $event) || (ctx_r2.userForm.displayName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "nz-form-item")(16, "nz-form-label", 59);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "nz-form-control")(20, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_56_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.userForm.email, $event) || (ctx_r2.userForm.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "nz-form-item")(22, "nz-form-control")(23, "label", 64);
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_56_Template_label_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.userForm.isEmailVerified, $event) || (ctx_r2.userForm.isEmailVerified = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "transloco");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "nz-form-item")(27, "nz-form-label");
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "nz-form-control")(31, "tot-autocomplete", 65);
    \u0275\u0275pipe(32, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_56_Template_tot_autocomplete_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.userForm.roleIds, $event) || (ctx_r2.userForm.roleIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "nz-form-item")(34, "nz-form-label");
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "nz-form-control")(38, "tot-autocomplete", 66);
    \u0275\u0275pipe(39, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_56_Template_tot_autocomplete_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r25);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.userForm.claimIds, $event) || (ctx_r2.userForm.claimIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 16, "T\xEAn \u0111\u0103ng nh\u1EADp"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.userForm.username);
    \u0275\u0275property("disabled", !!ctx_r2.editingUser);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.editingUser);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 18, "T\xEAn hi\u1EC3n th\u1ECB"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.userForm.displayName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(18, 20, "Email"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.userForm.email);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.userForm.isEmailVerified);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(25, 22, "\u0110\xE3 x\xE1c minh email"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(29, 24, "Vai tr\xF2"));
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(32, 26, "Ch\u1ECDn vai tr\xF2"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.userForm.roleIds);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(36, 28, "Quy\u1EC1n tr\u1EF1c ti\u1EBFp"));
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(39, 30, "Ch\u1ECDn quy\u1EC1n"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.userForm.claimIds);
  }
}
function UserListComponent_ng_container_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "tot-autocomplete", 68);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_59_Template_tot_autocomplete_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r27);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedRoleIds, $event) || (ctx_r2.selectedRoleIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(2, 2, "Vui l\xF2ng ch\u1ECDn"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedRoleIds);
  }
}
function UserListComponent_ng_container_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "tot-autocomplete", 69);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_62_Template_tot_autocomplete_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedClaimIds, $event) || (ctx_r2.selectedClaimIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(2, 2, "Vui l\xF2ng ch\u1ECDn"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedClaimIds);
  }
}
var _UserListComponent = class _UserListComponent {
  constructor() {
    this.authMgmt = inject(AuthManagementService);
    this.message = inject(NzMessageService);
    this.modal = inject(NzModalService);
    this.translate = inject(TranslocoService);
    this.cdr = inject(ChangeDetectorRef);
    this.users = [];
    this.loading = false;
    this.syncingClaims = false;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.totalUsers = 0;
    this.isRoleModalVisible = false;
    this.isClaimModalVisible = false;
    this.isUserModalVisible = false;
    this.selectedUser = null;
    this.selectedUserForAvatar = null;
    this.selectedRoleIds = [];
    this.selectedClaimIds = [];
    this.editingUser = null;
    this.userForm = {
      username: "",
      password: "",
      displayName: "",
      email: "",
      isEmailVerified: false,
      roleIds: [],
      claimIds: []
    };
    this.searchQuery = {
      keyword: "",
      isEmailVerified: null,
      roleIds: [],
      claimIds: [],
      dateRange: [],
      ssoProvider: "",
      ssoId: ""
    };
    this.userColumns = [];
  }
  ngOnInit() {
    this.userColumns = [
      { title: "Avatar", key: "avatar", width: "80px" },
      { title: "Ng\u01B0\u1EDDi d\xF9ng", key: "user" },
      { title: "Email", key: "email" },
      { title: "Tr\u1EA1ng th\xE1i", key: "status" },
      { title: "Vai tr\xF2", key: "roles" },
      { title: "Quy\u1EC1n", key: "claims" },
      { title: "Ng\xE0y t\u1EA1o", key: "createdAt" },
      { title: "C\u1EADp nh\u1EADt", key: "updatedAt" },
      { title: "H\xE0nh \u0111\u1ED9ng", key: "action", width: "150px", right: true }
    ];
    this.loadUsers();
  }
  async loadUsers() {
    var _a, _b;
    this.loading = true;
    try {
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      if (this.searchQuery.keyword)
        params.keyword = this.searchQuery.keyword;
      if (this.searchQuery.isEmailVerified !== null && this.searchQuery.isEmailVerified !== void 0) {
        params.isEmailVerified = this.searchQuery.isEmailVerified;
      }
      if (this.searchQuery.ssoProvider)
        params.ssoProvider = this.searchQuery.ssoProvider;
      if (this.searchQuery.ssoId)
        params.ssoId = this.searchQuery.ssoId;
      if (this.searchQuery.roleIds && this.searchQuery.roleIds.length > 0) {
        params.roleIds = this.searchQuery.roleIds;
      }
      if (this.searchQuery.claimIds && this.searchQuery.claimIds.length > 0) {
        params.claimIds = this.searchQuery.claimIds;
      }
      if (this.searchQuery.dateRange && this.searchQuery.dateRange.length === 2) {
        params.startDate = (_a = this.searchQuery.dateRange[0]) == null ? void 0 : _a.toISOString();
        params.endDate = (_b = this.searchQuery.dateRange[1]) == null ? void 0 : _b.toISOString();
      }
      const res = await this.authMgmt.getUsers(params);
      this.users = res.items || [];
      this.totalUsers = res.total || 0;
    } catch (e) {
      this.message.error(this.translate.translate("L\u1ED7i khi t\u1EA3i ng\u01B0\u1EDDi d\xF9ng"));
    } finally {
      this.loading = false;
    }
  }
  search() {
    this.pageIndex = 1;
    this.loadUsers();
  }
  onQueryParamsChange(params) {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadUsers();
  }
  resetSearch() {
    this.pageIndex = 1;
    this.searchQuery = {
      keyword: "",
      isEmailVerified: null,
      roleIds: [],
      claimIds: [],
      dateRange: [],
      ssoProvider: "",
      ssoId: ""
    };
    this.loadUsers();
  }
  showCreateModal() {
    this.editingUser = null;
    this.userForm = {
      username: "",
      password: "",
      displayName: "",
      email: "",
      isEmailVerified: false,
      roleIds: [],
      claimIds: []
    };
    this.isUserModalVisible = true;
  }
  showEditModal(user) {
    var _a, _b;
    this.editingUser = user;
    this.userForm = {
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      roleIds: ((_a = user.roles) == null ? void 0 : _a.map((r) => r.id)) || [],
      claimIds: ((_b = user.directClaims) == null ? void 0 : _b.map((c) => c.id)) || []
    };
    this.isUserModalVisible = true;
  }
  async saveUser() {
    if (!this.userForm.username || !this.userForm.displayName || !this.userForm.email || !this.editingUser && !this.userForm.password) {
      this.message.warning(this.translate.translate("Vui l\xF2ng nh\u1EADp \u0111\u1EA7y \u0111\u1EE7 th\xF4ng tin b\u1EAFt bu\u1ED9c"));
      return;
    }
    try {
      if (this.editingUser) {
        await this.authMgmt.updateUser(this.editingUser.id, this.userForm);
        await this.authMgmt.assignRolesToUser(this.editingUser.id, this.userForm.roleIds);
        await this.authMgmt.assignClaimsToUser(this.editingUser.id, this.userForm.claimIds);
        this.message.success(this.translate.translate("C\u1EADp nh\u1EADt ng\u01B0\u1EDDi d\xF9ng th\xE0nh c\xF4ng"));
      } else {
        const newUser = await this.authMgmt.createUser(this.userForm);
        if (newUser && newUser.id) {
          await this.authMgmt.assignRolesToUser(newUser.id, this.userForm.roleIds);
          await this.authMgmt.assignClaimsToUser(newUser.id, this.userForm.claimIds);
        }
        this.message.success(this.translate.translate("Th\xEAm ng\u01B0\u1EDDi d\xF9ng th\xE0nh c\xF4ng"));
      }
      this.isUserModalVisible = false;
      this.loadUsers();
    } catch (e) {
      this.message.error(this.translate.translate("L\u1ED7i khi l\u01B0u ng\u01B0\u1EDDi d\xF9ng"));
    }
  }
  showRoleModal(user) {
    var _a;
    this.selectedUser = user;
    this.selectedRoleIds = ((_a = user.roles) == null ? void 0 : _a.map((r) => r.id)) || [];
    this.isRoleModalVisible = true;
  }
  async assignRole() {
    try {
      await this.authMgmt.assignRolesToUser(this.selectedUser.id, this.selectedRoleIds);
      this.message.success(this.translate.translate("C\u1EADp nh\u1EADt vai tr\xF2 th\xE0nh c\xF4ng"));
      this.isRoleModalVisible = false;
      this.loadUsers();
    } catch (e) {
      this.message.error(this.translate.translate("C\u1EADp nh\u1EADt vai tr\xF2 th\u1EA5t b\u1EA1i"));
    }
  }
  async removeRole(event, user, role) {
    event.preventDefault();
    this.modal.confirm({
      nzTitle: `${this.translate.translate("X\xE1c nh\u1EADn")}?`,
      nzContent: `${this.translate.translate("X\xF3a")} ${role.name} ${this.translate.translate("kh\u1ECFi")} ${user.username}?`,
      nzOnOk: async () => {
        try {
          await this.authMgmt.removeRoleFromUser(user.id, role.id);
          this.message.success(this.translate.translate("X\xF3a vai tr\xF2 th\xE0nh c\xF4ng"));
          this.loadUsers();
        } catch (e) {
          this.message.error(this.translate.translate("X\xF3a vai tr\xF2 th\u1EA5t b\u1EA1i"));
        }
      }
    });
  }
  showClaimModal(user) {
    var _a;
    this.selectedUser = user;
    this.selectedClaimIds = ((_a = user.directClaims) == null ? void 0 : _a.map((c) => c.id)) || [];
    this.isClaimModalVisible = true;
  }
  async assignClaim() {
    try {
      await this.authMgmt.assignClaimsToUser(this.selectedUser.id, this.selectedClaimIds);
      this.message.success(this.translate.translate("C\u1EADp nh\u1EADt quy\u1EC1n th\xE0nh c\xF4ng"));
      this.isClaimModalVisible = false;
      this.loadUsers();
    } catch (e) {
      this.message.error(this.translate.translate("C\u1EADp nh\u1EADt quy\u1EC1n th\u1EA5t b\u1EA1i"));
    }
  }
  async removeClaim(event, user, claim) {
    event.preventDefault();
    this.modal.confirm({
      nzTitle: `${this.translate.translate("X\xE1c nh\u1EADn")}?`,
      nzContent: `${this.translate.translate("X\xF3a")} ${claim.name} ${this.translate.translate("kh\u1ECFi")} ${user.username}?`,
      nzOnOk: async () => {
        try {
          await this.authMgmt.removeClaimFromUser(user.id, claim.id);
          this.message.success(this.translate.translate("X\xF3a quy\u1EC1n th\xE0nh c\xF4ng"));
          this.loadUsers();
        } catch (e) {
          this.message.error(this.translate.translate("X\xF3a quy\u1EC1n th\u1EA5t b\u1EA1i"));
        }
      }
    });
  }
  async deleteUser(user) {
    var _a;
    if (((_a = user.username) == null ? void 0 : _a.toLowerCase()) === "admin") {
      this.message.warning(this.translate.translate("Kh\xF4ng th\u1EC3 x\xF3a t\xE0i kho\u1EA3n admin"));
      return;
    }
    this.modal.confirm({
      nzTitle: `${this.translate.translate("X\xE1c nh\u1EADn x\xF3a ng\u01B0\u1EDDi d\xF9ng")} ${user.username}?`,
      nzContent: this.translate.translate("H\xE0nh \u0111\u1ED9ng n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c"),
      nzOkDanger: true,
      nzOnOk: async () => {
        var _a2;
        try {
          await this.authMgmt.deleteUser(user.id);
          this.message.success(this.translate.translate("X\xF3a ng\u01B0\u1EDDi d\xF9ng th\xE0nh c\xF4ng"));
          this.loadUsers();
        } catch (e) {
          this.message.error(((_a2 = e.error) == null ? void 0 : _a2.message) || this.translate.translate("X\xF3a ng\u01B0\u1EDDi d\xF9ng th\u1EA5t b\u1EA1i"));
        }
      }
    });
  }
  async onFileSelected(event) {
    const file = event.target.files[0];
    if (!file || !this.selectedUserForAvatar)
      return;
    const loadingMsg = this.message.loading(this.translate.translate("\u0110ang t\u1EA3i l\xEAn..."), { nzDuration: 0 }).messageId;
    try {
      const result = await this.authMgmt.uploadAvatar(this.selectedUserForAvatar.id, file);
      this.message.success(this.translate.translate("C\u1EADp nh\u1EADt \u1EA3nh \u0111\u1EA1i di\u1EC7n th\xE0nh c\xF4ng"));
      const index = this.users.findIndex((u) => u.id === this.selectedUserForAvatar.id);
      if (index !== -1) {
        this.users[index] = __spreadProps(__spreadValues({}, this.users[index]), { avatarUrl: result.url });
        this.users = [...this.users];
        this.cdr.detectChanges();
      }
    } catch (e) {
      this.message.error(this.translate.translate("L\u1ED7i khi t\u1EA3i l\xEAn \u1EA3nh \u0111\u1EA1i di\u1EC7n"));
    } finally {
      this.message.remove(loadingMsg);
      event.target.value = "";
    }
  }
  async syncClaims() {
    this.syncingClaims = true;
    try {
      const version = (/* @__PURE__ */ new Date()).getTime().toString();
      await this.authMgmt.syncClaims(version, []);
      this.message.success(this.translate.translate("\u0110\u1ED3ng b\u1ED9 quy\u1EC1n th\xE0nh c\xF4ng"));
    } catch (e) {
      this.message.error(this.translate.translate("\u0110\u1ED3ng b\u1ED9 quy\u1EC1n th\u1EA5t b\u1EA1i"));
    } finally {
      this.syncingClaims = false;
    }
  }
};
_UserListComponent.\u0275fac = function UserListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UserListComponent)();
};
_UserListComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserListComponent, selectors: [["app-user-list"]], viewQuery: function UserListComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c0, 7);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.userExtraTpl = _t.first);
  }
}, decls: 63, vars: 70, consts: [["userExtraTpl", ""], ["suffixIconSearch", ""], ["avatarInput", ""], [1, "page-header"], ["nzType", "default", 3, "loading", "click", 4, "nzSpaceItem"], [1, "search-card", 3, "nzTitle"], ["nz-row", "", 3, "nzGutter"], ["nz-col", "", 3, "nzSpan"], [3, "nzSuffix"], ["type", "text", "nz-input", "", 3, "ngModelChange", "keyup.enter", "ngModel", "placeholder"], ["nzAllowClear", "", 2, "width", "100%", 3, "ngModelChange", "ngModel", "nzPlaceHolder"], [3, "nzValue", "nzLabel"], ["apiUrl", "/api/AuthManagement/roles", "mode", "multiple", 3, "ngModelChange", "valueChange", "placeholder", "ngModel"], ["apiUrl", "/api/AuthManagement/claims", "mode", "multiple", 3, "ngModelChange", "valueChange", "placeholder", "ngModel"], [2, "width", "100%", 3, "ngModelChange", "ngModel"], ["nzValue", "google", "nzLabel", "Google"], ["nzValue", "ms", "nzLabel", "Microsoft"], ["nzValue", "facebook", "nzLabel", "Facebook"], ["nz-input", "", 3, "ngModelChange", "keyup.enter", "ngModel", "placeholder"], ["nz-col", "", 1, "search-actions", 3, "nzSpan"], ["nzType", "primary", 3, "click", 4, "nzSpaceItem"], [3, "click", 4, "nzSpaceItem"], [3, "queryParamsChange", "data", "columns", "loading", "title", "extra", "frontPagination", "pageIndex", "pageSize", "total"], ["totCell", "avatar"], ["totCell", "user"], ["totCell", "status"], ["totCell", "roles"], ["totCell", "claims"], ["totCell", "createdAt"], ["totCell", "updatedAt"], ["totCell", "action"], ["type", "file", "accept", "image/*", 2, "display", "none", 3, "change"], [3, "nzVisibleChange", "nzOnCancel", "nzOnOk", "nzVisible", "nzTitle"], [4, "nzModalContent"], ["nzType", "default", 3, "click", "loading"], ["nz-icon", "", "nzType", "sync"], [3, "loading", "click", 4, "nzSpaceItem"], ["nzType", "primary", 3, "click"], ["nz-icon", "", "nzType", "plus"], [3, "click", "loading"], ["nz-icon", "", "nzType", "reload"], ["nz-icon", "", "nzType", "search"], [3, "click"], [1, "avatar-wrapper", 3, "click"], ["nzIcon", "user", 1, "user-avatar", 3, "nzSrc", "nzSize"], [1, "avatar-mask"], ["nz-icon", "", "nzType", "camera"], [1, "user-cell"], [1, "sub-text"], [3, "nzColor"], ["nzColor", "blue", 3, "nzMode", "nzOnClose", 4, "ngFor", "ngForOf"], ["nzType", "dashed", "nzSize", "small", 3, "click"], ["nzColor", "blue", 3, "nzOnClose", "nzMode"], ["nzColor", "purple", 3, "nzMode", "nzOnClose", 4, "ngFor", "ngForOf"], ["nzColor", "purple", 3, "nzOnClose", "nzMode"], [2, "display", "flex", "gap", "4px", "flex-direction", "column"], ["nzType", "primary", "nzSize", "small", 3, "click"], ["nzType", "primary", "nzSize", "small", 3, "click", "nzDanger", "disabled"], ["nz-form", "", "nzLayout", "vertical"], ["nzRequired", ""], ["nz-input", "", "name", "username", 3, "ngModelChange", "ngModel", "disabled"], [4, "ngIf"], ["nz-input", "", "name", "displayName", 3, "ngModelChange", "ngModel"], ["nz-input", "", "name", "email", 3, "ngModelChange", "ngModel"], ["nz-checkbox", "", "name", "isEmailVerified", 3, "ngModelChange", "ngModel"], ["apiUrl", "/api/AuthManagement/roles", "mode", "multiple", "name", "roleIds", 3, "ngModelChange", "placeholder", "ngModel"], ["apiUrl", "/api/AuthManagement/claims", "mode", "multiple", "name", "claimIds", 3, "ngModelChange", "placeholder", "ngModel"], ["nz-input", "", "type", "password", "name", "password", 3, "ngModelChange", "ngModel"], ["apiUrl", "/api/AuthManagement/roles", "mode", "multiple", 3, "ngModelChange", "placeholder", "ngModel"], ["apiUrl", "/api/AuthManagement/claims", "mode", "multiple", 3, "ngModelChange", "placeholder", "ngModel"]], template: function UserListComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "nz-space");
    \u0275\u0275template(2, UserListComponent_tot_button_2_Template, 4, 4, "tot-button", 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(3, UserListComponent_ng_template_3_Template, 3, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(5, "nz-card", 5);
    \u0275\u0275pipe(6, "transloco");
    \u0275\u0275elementStart(7, "div", 6)(8, "div", 7)(9, "nz-input-group", 8)(10, "input", 9);
    \u0275\u0275pipe(11, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.keyword, $event) || (ctx.searchQuery.keyword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function UserListComponent_Template_input_keyup_enter_10_listener() {
      return ctx.search();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(12, UserListComponent_ng_template_12_Template, 1, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 7)(15, "nz-select", 10);
    \u0275\u0275pipe(16, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_nz_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.isEmailVerified, $event) || (ctx.searchQuery.isEmailVerified = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275element(17, "nz-option", 11);
    \u0275\u0275pipe(18, "transloco");
    \u0275\u0275element(19, "nz-option", 11);
    \u0275\u0275pipe(20, "transloco");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 7)(22, "tot-autocomplete", 12);
    \u0275\u0275pipe(23, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_tot_autocomplete_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.roleIds, $event) || (ctx.searchQuery.roleIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("valueChange", function UserListComponent_Template_tot_autocomplete_valueChange_22_listener() {
      return ctx.search();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 7)(25, "tot-autocomplete", 13);
    \u0275\u0275pipe(26, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_tot_autocomplete_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.claimIds, $event) || (ctx.searchQuery.claimIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("valueChange", function UserListComponent_Template_tot_autocomplete_valueChange_25_listener() {
      return ctx.search();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 7)(28, "nz-range-picker", 14);
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_nz_range_picker_ngModelChange_28_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.dateRange, $event) || (ctx.searchQuery.dateRange = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 7)(30, "nz-select", 10);
    \u0275\u0275pipe(31, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_nz_select_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.ssoProvider, $event) || (ctx.searchQuery.ssoProvider = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275element(32, "nz-option", 15)(33, "nz-option", 16)(34, "nz-option", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "div", 7)(36, "input", 18);
    \u0275\u0275pipe(37, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.ssoId, $event) || (ctx.searchQuery.ssoId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function UserListComponent_Template_input_keyup_enter_36_listener() {
      return ctx.search();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(38, "div", 19)(39, "nz-space");
    \u0275\u0275template(40, UserListComponent_tot_button_40_Template, 3, 3, "tot-button", 20)(41, UserListComponent_tot_button_41_Template, 3, 3, "tot-button", 21);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(42, "tot-table", 22);
    \u0275\u0275pipe(43, "transloco");
    \u0275\u0275listener("queryParamsChange", function UserListComponent_Template_tot_table_queryParamsChange_42_listener($event) {
      return ctx.onQueryParamsChange($event);
    });
    \u0275\u0275template(44, UserListComponent_ng_template_44_Template, 4, 2, "ng-template", 23)(45, UserListComponent_ng_template_45_Template, 5, 2, "ng-template", 24)(46, UserListComponent_ng_template_46_Template, 3, 4, "ng-template", 25)(47, UserListComponent_ng_template_47_Template, 3, 1, "ng-template", 26)(48, UserListComponent_ng_template_48_Template, 3, 1, "ng-template", 27)(49, UserListComponent_ng_template_49_Template, 2, 4, "ng-template", 28)(50, UserListComponent_ng_template_50_Template, 2, 4, "ng-template", 29)(51, UserListComponent_ng_template_51_Template, 7, 8, "ng-template", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "input", 31, 2);
    \u0275\u0275listener("change", function UserListComponent_Template_input_change_52_listener($event) {
      return ctx.onFileSelected($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "nz-modal", 32);
    \u0275\u0275pipe(55, "transloco");
    \u0275\u0275twoWayListener("nzVisibleChange", function UserListComponent_Template_nz_modal_nzVisibleChange_54_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.isUserModalVisible, $event) || (ctx.isUserModalVisible = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function UserListComponent_Template_nz_modal_nzOnCancel_54_listener() {
      return ctx.isUserModalVisible = false;
    })("nzOnOk", function UserListComponent_Template_nz_modal_nzOnOk_54_listener() {
      return ctx.saveUser();
    });
    \u0275\u0275template(56, UserListComponent_ng_container_56_Template, 40, 32, "ng-container", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "nz-modal", 32);
    \u0275\u0275pipe(58, "transloco");
    \u0275\u0275twoWayListener("nzVisibleChange", function UserListComponent_Template_nz_modal_nzVisibleChange_57_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.isRoleModalVisible, $event) || (ctx.isRoleModalVisible = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function UserListComponent_Template_nz_modal_nzOnCancel_57_listener() {
      return ctx.isRoleModalVisible = false;
    })("nzOnOk", function UserListComponent_Template_nz_modal_nzOnOk_57_listener() {
      return ctx.assignRole();
    });
    \u0275\u0275template(59, UserListComponent_ng_container_59_Template, 3, 4, "ng-container", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "nz-modal", 32);
    \u0275\u0275pipe(61, "transloco");
    \u0275\u0275twoWayListener("nzVisibleChange", function UserListComponent_Template_nz_modal_nzVisibleChange_60_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.isClaimModalVisible, $event) || (ctx.isClaimModalVisible = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function UserListComponent_Template_nz_modal_nzOnCancel_60_listener() {
      return ctx.isClaimModalVisible = false;
    })("nzOnOk", function UserListComponent_Template_nz_modal_nzOnOk_60_listener() {
      return ctx.assignClaim();
    });
    \u0275\u0275template(62, UserListComponent_ng_container_62_Template, 3, 4, "ng-container", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const userExtraTpl_r29 = \u0275\u0275reference(4);
    const suffixIconSearch_r30 = \u0275\u0275reference(13);
    \u0275\u0275advance(5);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(6, 43, "T\xECm ki\u1EBFm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzGutter", \u0275\u0275pureFunction0(69, _c1));
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance();
    \u0275\u0275property("nzSuffix", suffixIconSearch_r30);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.keyword);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(11, 45, "Username, DisplayName, Email"));
    \u0275\u0275advance(4);
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.isEmailVerified);
    \u0275\u0275property("nzPlaceHolder", \u0275\u0275pipeBind1(16, 47, "Tr\u1EA1ng th\xE1i"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzValue", true)("nzLabel", \u0275\u0275pipeBind1(18, 49, "\u0110\xE3 x\xE1c minh"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzValue", false)("nzLabel", \u0275\u0275pipeBind1(20, 51, "\u0110ang ch\u1EDD"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(23, 53, "Vai tr\xF2"));
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.roleIds);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(26, 55, "Quy\u1EC1n"));
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.claimIds);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 8);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.dateRange);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 4);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.ssoProvider);
    \u0275\u0275property("nzPlaceHolder", \u0275\u0275pipeBind1(31, 57, "SSO Provider"));
    \u0275\u0275advance(5);
    \u0275\u0275property("nzSpan", 4);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.ssoId);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(37, 59, "SSO ID"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 8);
    \u0275\u0275advance(4);
    \u0275\u0275property("data", ctx.users)("columns", ctx.userColumns)("loading", ctx.loading)("title", \u0275\u0275pipeBind1(43, 61, "Danh s\xE1ch ng\u01B0\u1EDDi d\xF9ng"))("extra", userExtraTpl_r29)("frontPagination", false)("pageIndex", ctx.pageIndex)("pageSize", ctx.pageSize)("total", ctx.totalUsers);
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("nzVisible", ctx.isUserModalVisible);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(55, 63, ctx.editingUser ? "S\u1EEDa ng\u01B0\u1EDDi d\xF9ng" : "Th\xEAm ng\u01B0\u1EDDi d\xF9ng"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("nzVisible", ctx.isRoleModalVisible);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(58, 65, "Vai tr\xF2"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("nzVisible", ctx.isClaimModalVisible);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(61, 67, "Quy\u1EC1n"));
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  FormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgForm,
  NzTableModule,
  NzButtonModule,
  NzTransitionPatchDirective,
  NzIconModule,
  NzIconDirective,
  NzTagModule,
  NzTagComponent,
  NzSpaceModule,
  NzSpaceComponent,
  NzSpaceItemDirective,
  NzModalModule,
  NzModalComponent,
  NzModalContentDirective,
  NzSelectModule,
  NzOptionComponent,
  NzSelectComponent,
  NzInputModule,
  NzInputDirective,
  NzInputGroupComponent,
  NzInputGroupWhitSuffixOrPrefixDirective,
  NzDatePickerModule,
  NzDatePickerComponent,
  NzRangePickerComponent,
  NzGridModule,
  NzColDirective,
  NzRowDirective,
  NzCardModule,
  NzCardComponent,
  NzFormModule,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormControlComponent,
  NzCheckboxModule,
  NzCheckboxComponent,
  NzAvatarModule,
  NzAvatarComponent,
  TotAutocompleteComponent,
  TotButtonComponent,
  TotTableComponent,
  TotCellDirective,
  TranslocoModule,
  DatePipe,
  TranslocoPipe
], styles: ["\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.search-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.search-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n.user-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.sub-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #888;\n}\nnz-tag[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n.avatar-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  cursor: pointer;\n  display: inline-block;\n  border-radius: 50%;\n  overflow: hidden;\n  width: 48px;\n  height: 48px;\n}\n.avatar-mask[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.4);\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  transition: opacity 0.3s;\n  font-size: 18px;\n}\n.avatar-wrapper[_ngcontent-%COMP%]:hover   .avatar-mask[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  border: 1px solid #f0f0f0;\n}\n/*# sourceMappingURL=user-list.component.css.map */"] });
var UserListComponent = _UserListComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserListComponent, [{
    type: Component,
    args: [{ selector: "app-user-list", standalone: true, imports: [
      CommonModule,
      FormsModule,
      NzTableModule,
      NzButtonModule,
      NzIconModule,
      NzTagModule,
      NzSpaceModule,
      NzModalModule,
      NzSelectModule,
      NzInputModule,
      NzDatePickerModule,
      NzGridModule,
      NzCardModule,
      NzFormModule,
      NzCheckboxModule,
      NzAvatarModule,
      TotAutocompleteComponent,
      TotButtonComponent,
      TotTableComponent,
      TotCellDirective,
      TranslocoModule
    ], template: `
    <div class="page-header">
      <nz-space>
        <tot-button *nzSpaceItem [loading]="syncingClaims" nzType="default" (click)="syncClaims()">
          <span nz-icon nzType="sync"></span> {{ 'Sync Claims (BE)' | transloco }}
        </tot-button>
      </nz-space>
    </div>

    <ng-template #userExtraTpl>
      <nz-space>
        <tot-button *nzSpaceItem nzType="primary" (click)="showCreateModal()">
          <span nz-icon nzType="plus"></span> {{ 'Th\xEAm ng\u01B0\u1EDDi d\xF9ng' | transloco }}
        </tot-button>
        <tot-button *nzSpaceItem [loading]="loading" (click)="loadUsers()">
          <span nz-icon nzType="reload"></span> {{ '\u0110\u1ED3ng b\u1ED9' | transloco }}
        </tot-button>
      </nz-space>
    </ng-template>

    <nz-card class="search-card" [nzTitle]="'T\xECm ki\u1EBFm' | transloco">
      <div nz-row [nzGutter]="[16, 16]">
        <div nz-col [nzSpan]="6">
          <nz-input-group [nzSuffix]="suffixIconSearch">
            <input type="text" nz-input [(ngModel)]="searchQuery.keyword" [placeholder]="'Username, DisplayName, Email' | transloco" (keyup.enter)="search()" />
          </nz-input-group>
          <ng-template #suffixIconSearch>
            <span nz-icon nzType="search"></span>
          </ng-template>
        </div>
        <div nz-col [nzSpan]="6">
          <nz-select [(ngModel)]="searchQuery.isEmailVerified" [nzPlaceHolder]="'Tr\u1EA1ng th\xE1i' | transloco" nzAllowClear style="width: 100%">
            <nz-option [nzValue]="true" [nzLabel]="'\u0110\xE3 x\xE1c minh' | transloco"></nz-option>
            <nz-option [nzValue]="false" [nzLabel]="'\u0110ang ch\u1EDD' | transloco"></nz-option>
          </nz-select>
        </div>
        <div nz-col [nzSpan]="6">
          <tot-autocomplete
            apiUrl="/api/AuthManagement/roles"
            [placeholder]="'Vai tr\xF2' | transloco"
            mode="multiple"
            [(ngModel)]="searchQuery.roleIds"
            (valueChange)="search()"
          ></tot-autocomplete>
        </div>
        <div nz-col [nzSpan]="6">
          <tot-autocomplete
            apiUrl="/api/AuthManagement/claims"
            [placeholder]="'Quy\u1EC1n' | transloco"
            mode="multiple"
            [(ngModel)]="searchQuery.claimIds"
            (valueChange)="search()"
          ></tot-autocomplete>
        </div>
        <div nz-col [nzSpan]="8">
          <nz-range-picker [(ngModel)]="searchQuery.dateRange" style="width: 100%"></nz-range-picker>
        </div>
        <div nz-col [nzSpan]="4">
          <nz-select [(ngModel)]="searchQuery.ssoProvider" [nzPlaceHolder]="'SSO Provider' | transloco" nzAllowClear style="width: 100%">
            <nz-option nzValue="google" nzLabel="Google"></nz-option>
            <nz-option nzValue="ms" nzLabel="Microsoft"></nz-option>
            <nz-option nzValue="facebook" nzLabel="Facebook"></nz-option>
          </nz-select>
        </div>
        <div nz-col [nzSpan]="4">
          <input nz-input [(ngModel)]="searchQuery.ssoId" [placeholder]="'SSO ID' | transloco" (keyup.enter)="search()" />
        </div>
        <div nz-col [nzSpan]="8" class="search-actions">
          <nz-space>
            <tot-button *nzSpaceItem nzType="primary" (click)="search()">{{ 'T\xECm ki\u1EBFm' | transloco }}</tot-button>
            <tot-button *nzSpaceItem (click)="resetSearch()">{{ '\u0110\u1EB7t l\u1EA1i' | transloco }}</tot-button>
          </nz-space>
        </div>
      </div>
    </nz-card>

    <tot-table 
      [data]="users" 
      [columns]="userColumns" 
      [loading]="loading" 
      [title]="'Danh s\xE1ch ng\u01B0\u1EDDi d\xF9ng' | transloco"
      [extra]="userExtraTpl"
      [frontPagination]="false"
      [pageIndex]="pageIndex"
      [pageSize]="pageSize"
      [total]="totalUsers"
      (queryParamsChange)="onQueryParamsChange($event)"
    >
      <ng-template totCell="avatar" let-data>
        <div class="avatar-wrapper" (click)="selectedUserForAvatar = data; avatarInput.click()">
          <nz-avatar [nzSrc]="data.avatarUrl" nzIcon="user" [nzSize]="48" class="user-avatar"></nz-avatar>
          <div class="avatar-mask">
            <span nz-icon nzType="camera"></span>
          </div>
        </div>
      </ng-template>

      <ng-template totCell="user" let-data>
        <div class="user-cell">
          <strong>{{ data.displayName }}</strong>
          <span class="sub-text">{{ data.username }}</span>
        </div>
      </ng-template>

      <ng-template totCell="status" let-data>
        <nz-tag [nzColor]="data.isEmailVerified ? 'success' : 'warning'">
          {{ (data.isEmailVerified ? '\u0110\xE3 x\xE1c minh' : '\u0110ang ch\u1EDD') | transloco }}
        </nz-tag>
      </ng-template>

      <ng-template totCell="roles" let-data>
        <nz-tag *ngFor="let role of data.roles" nzColor="blue" 
                [nzMode]="(data.username?.toLowerCase() === 'admin' && role.name?.toLowerCase() === 'admin') ? 'default' : 'closeable'" 
                (nzOnClose)="removeRole($event, data, role)">
          {{ role.name }}
        </nz-tag>
        <tot-button nzType="dashed" nzSize="small" (click)="showRoleModal(data)">
          <span nz-icon nzType="plus"></span>
        </tot-button>
      </ng-template>

      <ng-template totCell="claims" let-data>
        <nz-tag *ngFor="let claim of data.directClaims" nzColor="purple" 
                [nzMode]="(data.username?.toLowerCase() === 'admin' && claim.name?.toLowerCase() === 'admin') ? 'default' : 'closeable'" 
                (nzOnClose)="removeClaim($event, data, claim)">
          {{ claim.name }}
        </nz-tag>
        <tot-button nzType="dashed" nzSize="small" (click)="showClaimModal(data)">
          <span nz-icon nzType="plus"></span>
        </tot-button>
      </ng-template>

      <ng-template totCell="createdAt" let-data>
        {{ data.createdAt | date:'dd/MM/yyyy HH:mm' }}
      </ng-template>

      <ng-template totCell="updatedAt" let-data>
        {{ data.updatedAt | date:'dd/MM/yyyy HH:mm' }}
      </ng-template>

      <ng-template totCell="action" let-data>
        <div style="display: flex; gap: 4px; flex-direction: column;">
          <tot-button nzType="primary" nzSize="small" (click)="showEditModal(data)">{{ 'S\u1EEDa' | transloco }}</tot-button>
          <tot-button nzType="primary" [nzDanger]="true" nzSize="small" 
                  [disabled]="data.username?.toLowerCase() === 'admin'"
                  (click)="deleteUser(data)">{{ 'X\xF3a' | transloco }}</tot-button>
        </div>
      </ng-template>
    </tot-table>

    <input type="file" #avatarInput style="display: none" (change)="onFileSelected($event)" accept="image/*" />

    <!-- Modal Th\xEAm/S\u1EEDa Ng\u01B0\u1EDDi d\xF9ng -->
    <nz-modal [(nzVisible)]="isUserModalVisible" [nzTitle]="(editingUser ? 'S\u1EEDa ng\u01B0\u1EDDi d\xF9ng' : 'Th\xEAm ng\u01B0\u1EDDi d\xF9ng') | transloco" (nzOnCancel)="isUserModalVisible = false" (nzOnOk)="saveUser()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'T\xEAn \u0111\u0103ng nh\u1EADp' | transloco }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="userForm.username" name="username" [disabled]="!!editingUser" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item *ngIf="!editingUser">
            <nz-form-label nzRequired>{{ 'M\u1EADt kh\u1EA9u' | transloco }}</nz-form-label>
            <nz-form-control>
              <input nz-input type="password" [(ngModel)]="userForm.password" name="password" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'T\xEAn hi\u1EC3n th\u1ECB' | transloco }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="userForm.displayName" name="displayName" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Email' | transloco }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="userForm.email" name="email" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control>
              <label nz-checkbox [(ngModel)]="userForm.isEmailVerified" name="isEmailVerified">{{ '\u0110\xE3 x\xE1c minh email' | transloco }}</label>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>{{ 'Vai tr\xF2' | transloco }}</nz-form-label>
            <nz-form-control>
              <tot-autocomplete
                apiUrl="/api/AuthManagement/roles"
                [placeholder]="'Ch\u1ECDn vai tr\xF2' | transloco"
                mode="multiple"
                [(ngModel)]="userForm.roleIds"
                name="roleIds"
              ></tot-autocomplete>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>{{ 'Quy\u1EC1n tr\u1EF1c ti\u1EBFp' | transloco }}</nz-form-label>
            <nz-form-control>
              <tot-autocomplete
                apiUrl="/api/AuthManagement/claims"
                [placeholder]="'Ch\u1ECDn quy\u1EC1n' | transloco"
                mode="multiple"
                [(ngModel)]="userForm.claimIds"
                name="claimIds"
              ></tot-autocomplete>
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>

    <!-- C\xE1c Modal g\xE1n nhanh -->
    <nz-modal [(nzVisible)]="isRoleModalVisible" [nzTitle]="'Vai tr\xF2' | transloco" (nzOnCancel)="isRoleModalVisible = false" (nzOnOk)="assignRole()">
      <ng-container *nzModalContent>
        <tot-autocomplete
          apiUrl="/api/AuthManagement/roles"
          [placeholder]="'Vui l\xF2ng ch\u1ECDn' | transloco"
          mode="multiple"
          [(ngModel)]="selectedRoleIds"
        ></tot-autocomplete>
      </ng-container>
    </nz-modal>

    <nz-modal [(nzVisible)]="isClaimModalVisible" [nzTitle]="'Quy\u1EC1n' | transloco" (nzOnCancel)="isClaimModalVisible = false" (nzOnOk)="assignClaim()">
      <ng-container *nzModalContent>
        <tot-autocomplete
          apiUrl="/api/AuthManagement/claims"
          [placeholder]="'Vui l\xF2ng ch\u1ECDn' | transloco"
          mode="multiple"
          [(ngModel)]="selectedClaimIds"
        ></tot-autocomplete>
      </ng-container>
    </nz-modal>
  `, styles: ["/* angular:styles/component:css;86100bbd9790674ad4dc8b2db5e831b9421d449ed6ac30a7b6ab39229fef823f;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/projects/tot/business-oidc/src/lib/user-list/user-list.component.ts */\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.search-card {\n  margin-bottom: 16px;\n}\n.search-actions {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n.user-cell {\n  display: flex;\n  flex-direction: column;\n}\n.sub-text {\n  font-size: 12px;\n  color: #888;\n}\nnz-tag {\n  margin-bottom: 4px;\n}\n.avatar-wrapper {\n  position: relative;\n  cursor: pointer;\n  display: inline-block;\n  border-radius: 50%;\n  overflow: hidden;\n  width: 48px;\n  height: 48px;\n}\n.avatar-mask {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.4);\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  transition: opacity 0.3s;\n  font-size: 18px;\n}\n.avatar-wrapper:hover .avatar-mask {\n  opacity: 1;\n}\n.user-avatar {\n  border: 1px solid #f0f0f0;\n}\n/*# sourceMappingURL=user-list.component.css.map */\n"] }]
  }], null, { userExtraTpl: [{
    type: ViewChild,
    args: ["userExtraTpl", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserListComponent, { className: "UserListComponent", filePath: "projects/tot/business-oidc/src/lib/user-list/user-list.component.ts", lineNumber: 344 });
})();

// projects/tot/business-oidc/src/lib/role-list/role-list.component.ts
var _c02 = ["roleExtraTpl"];
var _c12 = () => [16, 16];
function RoleListComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 15);
    \u0275\u0275listener("click", function RoleListComponent_ng_template_0_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showCreateModal());
    });
    \u0275\u0275element(1, "span", 16);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "Th\xEAm m\u1EDBi"), " ");
  }
}
function RoleListComponent_tot_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 15);
    \u0275\u0275listener("click", function RoleListComponent_tot_button_13_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.search());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "T\xECm ki\u1EBFm"));
  }
}
function RoleListComponent_tot_button_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 17);
    \u0275\u0275listener("click", function RoleListComponent_tot_button_14_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.resetSearch());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "\u0110\u1EB7t l\u1EA1i"));
  }
}
function RoleListComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "strong");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r6.name);
  }
}
function RoleListComponent_ng_template_18_nz_tag_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-tag", 21);
    \u0275\u0275listener("nzOnClose", function RoleListComponent_ng_template_18_nz_tag_1_Template_nz_tag_nzOnClose_0_listener($event) {
      const claim_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const data_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeClaim($event, data_r10, claim_r9));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const claim_r9 = ctx.$implicit;
    const data_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("nzMode", (data_r10.name == null ? null : data_r10.name.toLowerCase()) === ctx_r2.ADMIN_ROLE.toLowerCase() && (claim_r9.name == null ? null : claim_r9.name.toLowerCase()) === ctx_r2.ADMIN_CLAIM.toLowerCase() ? "default" : "closeable");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", claim_r9.name, " ");
  }
}
function RoleListComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275template(1, RoleListComponent_ng_template_18_nz_tag_1_Template, 2, 2, "nz-tag", 19);
    \u0275\u0275elementStart(2, "tot-button", 20);
    \u0275\u0275listener("click", function RoleListComponent_ng_template_18_Template_tot_button_click_2_listener() {
      const data_r10 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showClaimModal(data_r10));
    });
    \u0275\u0275element(3, "span", 16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r10 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", data_r10.claims);
  }
}
function RoleListComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "tot-button", 23);
    \u0275\u0275listener("click", function RoleListComponent_ng_template_19_Template_tot_button_click_1_listener() {
      const data_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal(data_r12));
    });
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "tot-button", 24);
    \u0275\u0275listener("click", function RoleListComponent_ng_template_19_Template_tot_button_click_4_listener() {
      const data_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteRole(data_r12));
    });
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "transloco");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r12 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 4, "S\u1EEDa"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzDanger", true)("disabled", (data_r12.name == null ? null : data_r12.name.toLowerCase()) === ctx_r2.ADMIN_ROLE.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 6, "X\xF3a"));
  }
}
function RoleListComponent_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "form", 25)(2, "nz-form-item")(3, "nz-form-label", 26);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "nz-form-control")(7, "input", 27);
    \u0275\u0275pipe(8, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function RoleListComponent_ng_container_22_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.roleForm.name, $event) || (ctx_r2.roleForm.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "nz-form-item")(10, "nz-form-label");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "nz-form-control")(14, "input", 28);
    \u0275\u0275pipe(15, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function RoleListComponent_ng_container_22_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.roleForm.description, $event) || (ctx_r2.roleForm.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "nz-form-item")(17, "nz-form-label");
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "nz-form-control")(21, "tot-autocomplete", 29);
    \u0275\u0275pipe(22, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function RoleListComponent_ng_container_22_Template_tot_autocomplete_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.roleForm.claimIds, $event) || (ctx_r2.roleForm.claimIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 10, "Vai tr\xF2"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.roleForm.name);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(8, 12, "Vai tr\xF2"))("disabled", !!ctx_r2.editingRole && (ctx_r2.editingRole.name == null ? null : ctx_r2.editingRole.name.toLowerCase()) === ctx_r2.ADMIN_ROLE.toLowerCase());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 14, "M\xF4 t\u1EA3"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.roleForm.description);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(15, 16, "M\xF4 t\u1EA3"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(19, 18, "Quy\u1EC1n"));
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(22, 20, "Ch\u1ECDn quy\u1EC1n"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.roleForm.claimIds);
  }
}
function RoleListComponent_ng_container_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "tot-autocomplete", 30);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function RoleListComponent_ng_container_25_Template_tot_autocomplete_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedClaimIds, $event) || (ctx_r2.selectedClaimIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(2, 2, "Vui l\xF2ng ch\u1ECDn"));
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedClaimIds);
  }
}
var _RoleListComponent = class _RoleListComponent {
  constructor() {
    this.authMgmt = inject(AuthManagementService);
    this.message = inject(NzMessageService);
    this.modal = inject(NzModalService);
    this.translate = inject(TranslocoService);
    this.ADMIN_ROLE = ADMIN_ROLE;
    this.ADMIN_CLAIM = ADMIN_CLAIM;
    this.roles = [];
    this.loading = false;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.totalRoles = 0;
    this.isRoleModalVisible = false;
    this.isClaimModalVisible = false;
    this.selectedRole = null;
    this.selectedClaimIds = [];
    this.editingRole = null;
    this.roleForm = {
      name: "",
      description: "",
      claimIds: []
    };
    this.searchQuery = {
      keyword: "",
      claimIds: []
    };
    this.roleColumns = [];
  }
  ngOnInit() {
    this.roleColumns = [
      { title: "Vai tr\xF2", key: "role", width: "200px" },
      { title: "M\xF4 t\u1EA3", key: "description" },
      { title: "Quy\u1EC1n", key: "claims" },
      { title: "H\xE0nh \u0111\u1ED9ng", key: "action", width: "150px", right: true }
    ];
    this.loadRoles();
  }
  async loadRoles() {
    this.loading = true;
    try {
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      if (this.searchQuery.keyword)
        params.keyword = this.searchQuery.keyword;
      if (this.searchQuery.claimIds && this.searchQuery.claimIds.length > 0) {
        params.claimIds = this.searchQuery.claimIds;
      }
      const res = await this.authMgmt.getRoles(params);
      this.roles = res.items || [];
      this.totalRoles = res.total || 0;
    } catch (e) {
      this.message.error(this.translate.translate("L\u1ED7i khi t\u1EA3i vai tr\xF2"));
    } finally {
      this.loading = false;
    }
  }
  search() {
    this.pageIndex = 1;
    this.loadRoles();
  }
  onQueryParamsChange(params) {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadRoles();
  }
  resetSearch() {
    this.pageIndex = 1;
    this.searchQuery = {
      keyword: "",
      claimIds: []
    };
    this.loadRoles();
  }
  showCreateModal() {
    this.editingRole = null;
    this.roleForm = {
      name: "",
      description: "",
      claimIds: []
    };
    this.isRoleModalVisible = true;
  }
  showEditModal(role) {
    var _a;
    this.editingRole = role;
    this.roleForm = {
      name: role.name,
      description: role.description,
      claimIds: ((_a = role.claims) == null ? void 0 : _a.map((c) => c.id)) || []
    };
    this.isRoleModalVisible = true;
  }
  async saveRole() {
    if (!this.roleForm.name) {
      this.message.warning(this.translate.translate("Vui l\xF2ng nh\u1EADp t\xEAn vai tr\xF2"));
      return;
    }
    try {
      if (this.editingRole) {
        await this.authMgmt.updateRole(this.editingRole.id, this.roleForm);
        await this.authMgmt.assignClaimsToRole(this.editingRole.id, this.roleForm.claimIds);
        this.message.success(this.translate.translate("C\u1EADp nh\u1EADt vai tr\xF2 th\xE0nh c\xF4ng"));
      } else {
        const newRole = await this.authMgmt.createRole(this.roleForm);
        if (newRole && newRole.id) {
          await this.authMgmt.assignClaimsToRole(newRole.id, this.roleForm.claimIds);
        }
        this.message.success(this.translate.translate("Th\xEAm vai tr\xF2 th\xE0nh c\xF4ng"));
      }
      this.isRoleModalVisible = false;
      this.loadRoles();
    } catch (e) {
      this.message.error(this.translate.translate("L\u1ED7i khi l\u01B0u vai tr\xF2"));
    }
  }
  showClaimModal(role) {
    var _a;
    this.selectedRole = role;
    this.selectedClaimIds = ((_a = role.claims) == null ? void 0 : _a.map((c) => c.id)) || [];
    this.isClaimModalVisible = true;
  }
  async assignClaim() {
    try {
      await this.authMgmt.assignClaimsToRole(this.selectedRole.id, this.selectedClaimIds);
      this.message.success(this.translate.translate("C\u1EADp nh\u1EADt quy\u1EC1n th\xE0nh c\xF4ng"));
      this.isClaimModalVisible = false;
      this.loadRoles();
    } catch (e) {
      this.message.error(this.translate.translate("C\u1EADp nh\u1EADt quy\u1EC1n th\u1EA5t b\u1EA1i"));
    }
  }
  async removeClaim(event, role, claim) {
    event.preventDefault();
    this.modal.confirm({
      nzTitle: `${this.translate.translate("X\xE1c nh\u1EADn")}?`,
      nzContent: `${this.translate.translate("X\xF3a")} ${claim.name} ${this.translate.translate("kh\u1ECFi")} ${role.name}?`,
      nzOnOk: async () => {
        try {
          await this.authMgmt.removeClaimFromRole(role.id, claim.id);
          this.message.success(this.translate.translate("X\xF3a quy\u1EC1n th\xE0nh c\xF4ng"));
          this.loadRoles();
        } catch (e) {
          this.message.error(this.translate.translate("X\xF3a quy\u1EC1n th\u1EA5t b\u1EA1i"));
        }
      }
    });
  }
  async deleteRole(role) {
    var _a;
    if (((_a = role.name) == null ? void 0 : _a.toLowerCase()) === ADMIN_ROLE.toLowerCase()) {
      this.message.warning(this.translate.translate(`Kh\xF4ng th\u1EC3 x\xF3a vai tr\xF2 ${ADMIN_ROLE}`));
      return;
    }
    this.modal.confirm({
      nzTitle: `${this.translate.translate("X\xE1c nh\u1EADn x\xF3a vai tr\xF2")} ${role.name}?`,
      nzContent: this.translate.translate("H\xE0nh \u0111\u1ED9ng n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c"),
      nzOkDanger: true,
      nzOnOk: async () => {
        var _a2;
        try {
          await this.authMgmt.deleteRole(role.id);
          this.message.success(this.translate.translate("X\xF3a vai tr\xF2 th\xE0nh c\xF4ng"));
          this.loadRoles();
        } catch (e) {
          this.message.error(((_a2 = e.error) == null ? void 0 : _a2.message) || this.translate.translate("X\xF3a vai tr\xF2 th\u1EA5t b\u1EA1i"));
        }
      }
    });
  }
};
_RoleListComponent.\u0275fac = function RoleListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RoleListComponent)();
};
_RoleListComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RoleListComponent, selectors: [["app-role-list"]], viewQuery: function RoleListComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c02, 7);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.roleExtraTpl = _t.first);
  }
}, decls: 26, vars: 35, consts: [["roleExtraTpl", ""], [1, "search-card", 3, "nzTitle"], ["nz-row", "", 3, "nzGutter"], ["nz-col", "", 3, "nzSpan"], ["nz-input", "", 3, "ngModelChange", "keyup.enter", "ngModel", "placeholder"], ["apiUrl", "/api/AuthManagement/claims", "mode", "multiple", 3, "ngModelChange", "valueChange", "placeholder", "ngModel"], ["nz-col", "", 1, "search-actions", 3, "nzSpan"], ["nzType", "primary", 3, "click", 4, "nzSpaceItem"], [3, "click", 4, "nzSpaceItem"], [3, "queryParamsChange", "data", "columns", "loading", "title", "extra", "frontPagination", "pageIndex", "pageSize", "total"], ["totCell", "role"], ["totCell", "claims"], ["totCell", "action"], [3, "nzVisibleChange", "nzOnCancel", "nzOnOk", "nzVisible", "nzTitle"], [4, "nzModalContent"], ["nzType", "primary", 3, "click"], ["nz-icon", "", "nzType", "plus"], [3, "click"], [1, "claim-tags"], ["nzColor", "blue", 3, "nzMode", "nzOnClose", 4, "ngFor", "ngForOf"], ["nzType", "dashed", "nzSize", "small", 3, "click"], ["nzColor", "blue", 3, "nzOnClose", "nzMode"], [2, "display", "flex", "gap", "4px", "flex-direction", "column"], ["nzType", "primary", "nzSize", "small", 3, "click"], ["nzType", "primary", "nzSize", "small", 3, "click", "nzDanger", "disabled"], ["nz-form", "", "nzLayout", "vertical"], ["nzRequired", ""], ["nz-input", "", "name", "name", 3, "ngModelChange", "ngModel", "placeholder", "disabled"], ["nz-input", "", "name", "description", 3, "ngModelChange", "ngModel", "placeholder"], ["apiUrl", "/api/AuthManagement/claims", "mode", "multiple", "name", "claimIds", 3, "ngModelChange", "placeholder", "ngModel"], ["apiUrl", "/api/AuthManagement/claims", "mode", "multiple", 3, "ngModelChange", "placeholder", "ngModel"]], template: function RoleListComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275template(0, RoleListComponent_ng_template_0_Template, 4, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(2, "nz-card", 1);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementStart(4, "div", 2)(5, "div", 3)(6, "input", 4);
    \u0275\u0275pipe(7, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function RoleListComponent_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.keyword, $event) || (ctx.searchQuery.keyword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function RoleListComponent_Template_input_keyup_enter_6_listener() {
      return ctx.search();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 3)(9, "tot-autocomplete", 5);
    \u0275\u0275pipe(10, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function RoleListComponent_Template_tot_autocomplete_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.claimIds, $event) || (ctx.searchQuery.claimIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("valueChange", function RoleListComponent_Template_tot_autocomplete_valueChange_9_listener() {
      return ctx.search();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 6)(12, "nz-space");
    \u0275\u0275template(13, RoleListComponent_tot_button_13_Template, 3, 3, "tot-button", 7)(14, RoleListComponent_tot_button_14_Template, 3, 3, "tot-button", 8);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(15, "tot-table", 9);
    \u0275\u0275pipe(16, "transloco");
    \u0275\u0275listener("queryParamsChange", function RoleListComponent_Template_tot_table_queryParamsChange_15_listener($event) {
      return ctx.onQueryParamsChange($event);
    });
    \u0275\u0275template(17, RoleListComponent_ng_template_17_Template, 2, 1, "ng-template", 10)(18, RoleListComponent_ng_template_18_Template, 4, 1, "ng-template", 11)(19, RoleListComponent_ng_template_19_Template, 7, 8, "ng-template", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "nz-modal", 13);
    \u0275\u0275pipe(21, "transloco");
    \u0275\u0275twoWayListener("nzVisibleChange", function RoleListComponent_Template_nz_modal_nzVisibleChange_20_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.isRoleModalVisible, $event) || (ctx.isRoleModalVisible = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function RoleListComponent_Template_nz_modal_nzOnCancel_20_listener() {
      return ctx.isRoleModalVisible = false;
    })("nzOnOk", function RoleListComponent_Template_nz_modal_nzOnOk_20_listener() {
      return ctx.saveRole();
    });
    \u0275\u0275template(22, RoleListComponent_ng_container_22_Template, 23, 22, "ng-container", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "nz-modal", 13);
    \u0275\u0275pipe(24, "transloco");
    \u0275\u0275twoWayListener("nzVisibleChange", function RoleListComponent_Template_nz_modal_nzVisibleChange_23_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.isClaimModalVisible, $event) || (ctx.isClaimModalVisible = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function RoleListComponent_Template_nz_modal_nzOnCancel_23_listener() {
      return ctx.isClaimModalVisible = false;
    })("nzOnOk", function RoleListComponent_Template_nz_modal_nzOnOk_23_listener() {
      return ctx.assignClaim();
    });
    \u0275\u0275template(25, RoleListComponent_ng_container_25_Template, 3, 4, "ng-container", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const roleExtraTpl_r15 = \u0275\u0275reference(1);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(3, 22, "T\xECm ki\u1EBFm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzGutter", \u0275\u0275pureFunction0(34, _c12));
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 8);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.keyword);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(7, 24, "T\xEAn vai tr\xF2, m\xF4 t\u1EA3"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 10);
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(10, 26, "Quy\u1EC1n"));
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.claimIds);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance(4);
    \u0275\u0275property("data", ctx.roles)("columns", ctx.roleColumns)("loading", ctx.loading)("title", \u0275\u0275pipeBind1(16, 28, "Vai tr\xF2"))("extra", roleExtraTpl_r15)("frontPagination", false)("pageIndex", ctx.pageIndex)("pageSize", ctx.pageSize)("total", ctx.totalRoles);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("nzVisible", ctx.isRoleModalVisible);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(21, 30, ctx.editingRole ? "S\u1EEDa vai tr\xF2" : "Th\xEAm m\u1EDBi"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("nzVisible", ctx.isClaimModalVisible);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(24, 32, "Quy\u1EC1n"));
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  FormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgForm,
  NzTableModule,
  NzButtonModule,
  NzTransitionPatchDirective,
  NzIconModule,
  NzIconDirective,
  NzTagModule,
  NzTagComponent,
  NzSpaceModule,
  NzSpaceComponent,
  NzSpaceItemDirective,
  NzModalModule,
  NzModalComponent,
  NzModalContentDirective,
  NzSelectModule,
  NzFormModule,
  NzColDirective,
  NzRowDirective,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormControlComponent,
  NzInputModule,
  NzInputDirective,
  NzGridModule,
  NzCardModule,
  NzCardComponent,
  TranslocoModule,
  TotAutocompleteComponent,
  TotButtonComponent,
  TotTableComponent,
  TotCellDirective,
  TranslocoPipe
], styles: ["\n.search-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.search-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n.claim-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\nnz-tag[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n/*# sourceMappingURL=role-list.component.css.map */"] });
var RoleListComponent = _RoleListComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoleListComponent, [{
    type: Component,
    args: [{ selector: "app-role-list", standalone: true, imports: [
      CommonModule,
      FormsModule,
      NzTableModule,
      NzButtonModule,
      NzIconModule,
      NzTagModule,
      NzSpaceModule,
      NzModalModule,
      NzSelectModule,
      NzFormModule,
      NzInputModule,
      NzGridModule,
      NzCardModule,
      TranslocoModule,
      TotAutocompleteComponent,
      TotButtonComponent,
      TotTableComponent,
      TotCellDirective
    ], template: `
    <ng-template #roleExtraTpl>
      <tot-button nzType="primary" (click)="showCreateModal()">
        <span nz-icon nzType="plus"></span> {{ 'Th\xEAm m\u1EDBi' | transloco }}
      </tot-button>
    </ng-template>

    <nz-card class="search-card" [nzTitle]="'T\xECm ki\u1EBFm' | transloco">
      <div nz-row [nzGutter]="[16, 16]">
        <div nz-col [nzSpan]="8">
          <input nz-input [(ngModel)]="searchQuery.keyword" [placeholder]="'T\xEAn vai tr\xF2, m\xF4 t\u1EA3' | transloco" (keyup.enter)="search()" />
        </div>
        <div nz-col [nzSpan]="10">
          <tot-autocomplete
            apiUrl="/api/AuthManagement/claims"
            [placeholder]="'Quy\u1EC1n' | transloco"
            mode="multiple"
            [(ngModel)]="searchQuery.claimIds"
            (valueChange)="search()"
          ></tot-autocomplete>
        </div>
        <div nz-col [nzSpan]="6" class="search-actions">
          <nz-space>
            <tot-button *nzSpaceItem nzType="primary" (click)="search()">{{ 'T\xECm ki\u1EBFm' | transloco }}</tot-button>
            <tot-button *nzSpaceItem (click)="resetSearch()">{{ '\u0110\u1EB7t l\u1EA1i' | transloco }}</tot-button>
          </nz-space>
        </div>
      </div>
    </nz-card>

    <tot-table 
      [data]="roles" 
      [columns]="roleColumns" 
      [loading]="loading"
      [title]="'Vai tr\xF2' | transloco"
      [extra]="roleExtraTpl"
      [frontPagination]="false"
      [pageIndex]="pageIndex"
      [pageSize]="pageSize"
      [total]="totalRoles"
      (queryParamsChange)="onQueryParamsChange($event)"
    >
      <ng-template totCell="role" let-data>
        <strong>{{ data.name }}</strong>
      </ng-template>

      <ng-template totCell="claims" let-data>
        <div class="claim-tags">
          <nz-tag *ngFor="let claim of data.claims" nzColor="blue" 
                  [nzMode]="(data.name?.toLowerCase() === ADMIN_ROLE.toLowerCase() && claim.name?.toLowerCase() === ADMIN_CLAIM.toLowerCase()) ? 'default' : 'closeable'" 
                  (nzOnClose)="removeClaim($event, data, claim)">
            {{ claim.name }}
          </nz-tag>
          <tot-button nzType="dashed" nzSize="small" (click)="showClaimModal(data)">
            <span nz-icon nzType="plus"></span>
          </tot-button>
        </div>
      </ng-template>

      <ng-template totCell="action" let-data>
        <div style="display: flex; gap: 4px; flex-direction: column;">
          <tot-button nzType="primary" nzSize="small" (click)="showEditModal(data)">{{ 'S\u1EEDa' | transloco }}</tot-button>
          <tot-button nzType="primary" [nzDanger]="true" nzSize="small" 
                  [disabled]="data.name?.toLowerCase() === ADMIN_ROLE.toLowerCase()"
                  (click)="deleteRole(data)">{{ 'X\xF3a' | transloco }}</tot-button>
        </div>
      </ng-template>
    </tot-table>

    <!-- Modal Th\xEAm/S\u1EEDa Vai tr\xF2 -->
    <nz-modal [(nzVisible)]="isRoleModalVisible" [nzTitle]="(editingRole ? 'S\u1EEDa vai tr\xF2' : 'Th\xEAm m\u1EDBi') | transloco" (nzOnCancel)="isRoleModalVisible = false" (nzOnOk)="saveRole()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Vai tr\xF2' | transloco }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="roleForm.name" name="name" [placeholder]="'Vai tr\xF2' | transloco" [disabled]="!!editingRole && editingRole.name?.toLowerCase() === ADMIN_ROLE.toLowerCase()" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>{{ 'M\xF4 t\u1EA3' | transloco }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="roleForm.description" name="description" [placeholder]="'M\xF4 t\u1EA3' | transloco" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>{{ 'Quy\u1EC1n' | transloco }}</nz-form-label>
            <nz-form-control>
              <tot-autocomplete
                apiUrl="/api/AuthManagement/claims"
                [placeholder]="'Ch\u1ECDn quy\u1EC1n' | transloco"
                mode="multiple"
                [(ngModel)]="roleForm.claimIds"
                name="claimIds"
              ></tot-autocomplete>
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>

    <!-- Modal g\xE1n nhanh (Gi\u1EEF nguy\xEAn) -->
    <nz-modal [(nzVisible)]="isClaimModalVisible" [nzTitle]="'Quy\u1EC1n' | transloco" (nzOnCancel)="isClaimModalVisible = false" (nzOnOk)="assignClaim()">
      <ng-container *nzModalContent>
        <tot-autocomplete
          apiUrl="/api/AuthManagement/claims"
          [placeholder]="'Vui l\xF2ng ch\u1ECDn' | transloco"
          mode="multiple"
          [(ngModel)]="selectedClaimIds"
        ></tot-autocomplete>
      </ng-container>
    </nz-modal>
  `, styles: ["/* angular:styles/component:css;c1be7f8108080fb46e612cf4a6008186d841b4d04e7d60fb3d8e4ffe93bbf65f;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/projects/tot/business-oidc/src/lib/role-list/role-list.component.ts */\n.search-card {\n  margin-bottom: 16px;\n}\n.search-actions {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n.claim-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\nnz-tag {\n  margin-bottom: 4px;\n}\n/*# sourceMappingURL=role-list.component.css.map */\n"] }]
  }], null, { roleExtraTpl: [{
    type: ViewChild,
    args: ["roleExtraTpl", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RoleListComponent, { className: "RoleListComponent", filePath: "projects/tot/business-oidc/src/lib/role-list/role-list.component.ts", lineNumber: 177 });
})();

// projects/tot/business-oidc/src/lib/acl-list/acl-list.component.ts
function AclListComponent_ng_template_28_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275element(1, "span", 19);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "transloco");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(4, 2, "Ng\u01B0\u1EDDi d\xF9ng"), ": ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(data_r1.userId);
  }
}
function AclListComponent_ng_template_28_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18);
    \u0275\u0275element(1, "span", 20);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "transloco");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(4, 2, "Vai tr\xF2"), ": ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(data_r1.roleId);
  }
}
function AclListComponent_ng_template_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, AclListComponent_ng_template_28_div_0_Template, 7, 4, "div", 17)(1, AclListComponent_ng_template_28_div_1_Template, 7, 4, "div", 17);
  }
  if (rf & 2) {
    const data_r1 = ctx.$implicit;
    \u0275\u0275property("ngIf", data_r1.userId);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r1.roleId);
  }
}
function AclListComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "code");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r2.resourceType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r2.resourceId);
  }
}
function AclListComponent_ng_template_30_nz_tag_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 28);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "\u0110\u1ECDc"));
  }
}
function AclListComponent_ng_template_30_nz_tag_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 29);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "Ghi"));
  }
}
function AclListComponent_ng_template_30_nz_tag_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 30);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "X\xF3a"));
  }
}
function AclListComponent_ng_template_30_nz_tag_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 31);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "Chia s\u1EBB"));
  }
}
function AclListComponent_ng_template_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "span", 22);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 23);
    \u0275\u0275template(4, AclListComponent_ng_template_30_nz_tag_4_Template, 3, 3, "nz-tag", 24)(5, AclListComponent_ng_template_30_nz_tag_5_Template, 3, 3, "nz-tag", 25)(6, AclListComponent_ng_template_30_nz_tag_6_Template, 3, 3, "nz-tag", 26)(7, AclListComponent_ng_template_30_nz_tag_7_Template, 3, 3, "nz-tag", 27);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r3.permissionMask);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.hasMask(data_r3.permissionMask, 1));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.hasMask(data_r3.permissionMask, 2));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.hasMask(data_r3.permissionMask, 4));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.hasMask(data_r3.permissionMask, 8));
  }
}
function AclListComponent_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 32);
    \u0275\u0275listener("click", function AclListComponent_ng_template_31_Template_tot_button_click_0_listener() {
      const data_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.deleteAcl(data_r6.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("nzDanger", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 2, "X\xF3a"));
  }
}
function AclListComponent_ng_container_34_nz_form_item_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-form-item")(1, "nz-form-label", 34);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "nz-form-control")(5, "tot-autocomplete", 43);
    \u0275\u0275pipe(6, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function AclListComponent_ng_container_34_nz_form_item_14_Template_tot_autocomplete_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.newEntry.userId, $event) || (ctx_r3.newEntry.userId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 4, "Ng\u01B0\u1EDDi d\xF9ng"));
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(6, 6, "T\xECm ki\u1EBFm..."));
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newEntry.userId);
  }
}
function AclListComponent_ng_container_34_nz_form_item_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-form-item")(1, "nz-form-label", 34);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "nz-form-control")(5, "tot-autocomplete", 44);
    \u0275\u0275pipe(6, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function AclListComponent_ng_container_34_nz_form_item_15_Template_tot_autocomplete_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.newEntry.roleId, $event) || (ctx_r3.newEntry.roleId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 4, "Vai tr\xF2"));
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(6, 6, "T\xECm ki\u1EBFm..."));
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newEntry.roleId);
  }
}
function AclListComponent_ng_container_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "form", 33)(2, "nz-form-item")(3, "nz-form-label", 34);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "nz-form-control")(7, "nz-radio-group", 35);
    \u0275\u0275twoWayListener("ngModelChange", function AclListComponent_ng_container_34_Template_nz_radio_group_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newEntry.subjectType, $event) || (ctx_r3.newEntry.subjectType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(8, "label", 36);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "label", 37);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "transloco");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(14, AclListComponent_ng_container_34_nz_form_item_14_Template, 7, 8, "nz-form-item", 38)(15, AclListComponent_ng_container_34_nz_form_item_15_Template, 7, 8, "nz-form-item", 38);
    \u0275\u0275element(16, "nz-divider");
    \u0275\u0275elementStart(17, "nz-form-item")(18, "nz-form-label", 34);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "nz-form-control")(22, "div", 39)(23, "input", 40);
    \u0275\u0275pipe(24, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function AclListComponent_ng_container_34_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newEntry.resourceType, $event) || (ctx_r3.newEntry.resourceType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 41);
    \u0275\u0275pipe(26, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function AclListComponent_ng_container_34_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.newEntry.resourceId, $event) || (ctx_r3.newEntry.resourceId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(27, "nz-form-item")(28, "nz-form-label", 34);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "nz-form-control")(32, "nz-checkbox-group", 42);
    \u0275\u0275twoWayListener("ngModelChange", function AclListComponent_ng_container_34_Template_nz_checkbox_group_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.accessOptions, $event) || (ctx_r3.accessOptions = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("nzSpan", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 16, "Lo\u1EA1i \u0111\u1ED1i t\u01B0\u1EE3ng"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newEntry.subjectType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 18, "Ng\u01B0\u1EDDi d\xF9ng"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 20, "Vai tr\xF2"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.newEntry.subjectType === "user");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.newEntry.subjectType === "role");
    \u0275\u0275advance(3);
    \u0275\u0275property("nzSpan", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 22, "T\xE0i nguy\xEAn"));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newEntry.resourceType);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(24, 24, "Lo\u1EA1i"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.newEntry.resourceId);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(26, 26, "ID ho\u1EB7c *"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzSpan", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(30, 28, "M\u1EE9c \u0111\u1ED9 truy c\u1EADp"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.accessOptions);
  }
}
var _AclListComponent = class _AclListComponent {
  constructor() {
    this.authMgmt = inject(AuthManagementService);
    this.message = inject(NzMessageService);
    this.modal = inject(NzModalService);
    this.translate = inject(TranslocoService);
    this.aclEntries = [];
    this.loading = false;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.totalAcl = 0;
    this.filter = { resourceType: "", resourceId: "" };
    this.isCreateModalVisible = false;
    this.newEntry = { subjectType: "user", userId: "", roleId: "", resourceType: "", resourceId: "", permissionMask: 0 };
    this.availableUsers = [];
    this.availableRoles = [];
    this.accessOptions = [
      { label: "Read (1)", value: 1, checked: false },
      { label: "Write (2)", value: 2, checked: false },
      { label: "Delete (4)", value: 4, checked: false },
      { label: "Share (8)", value: 8, checked: false }
    ];
    this.aclColumns = [];
  }
  ngOnInit() {
    this.aclColumns = [
      { title: "\u0110\u1ED1i t\u01B0\u1EE3ng", key: "subject" },
      { title: "T\xE0i nguy\xEAn", key: "resource" },
      { title: "M\u1EB7t n\u1EA1 quy\u1EC1n", key: "mask" },
      { title: "H\xE0nh \u0111\u1ED9ng", key: "action", width: "120px", right: true }
    ];
    this.loadMetadata();
  }
  async loadMetadata() {
    try {
      const usersRes = await this.authMgmt.getUsers();
      this.availableUsers = usersRes.items || [];
      const rolesRes = await this.authMgmt.getRoles();
      this.availableRoles = rolesRes.items || [];
    } catch (e) {
    }
  }
  hasMask(mask, bit) {
    return (mask & bit) === bit;
  }
  async loadAcl() {
    if (!this.filter.resourceType || !this.filter.resourceId) {
      this.message.warning(this.translate.translate("Vui l\xF2ng nh\u1EADp \u0111\u1EA7y \u0111\u1EE7 th\xF4ng tin"));
      return;
    }
    this.loading = true;
    try {
      const res = await this.authMgmt.getAcl(this.filter.resourceType, this.filter.resourceId, this.pageIndex, this.pageSize);
      this.aclEntries = res.items || [];
      this.totalAcl = res.total || 0;
    } catch (e) {
      this.message.error(this.translate.translate("L\u1ED7i khi t\u1EA3i danh s\xE1ch ACL"));
    } finally {
      this.loading = false;
    }
  }
  onQueryParamsChange(params) {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadAcl();
  }
  showCreateModal() {
    this.newEntry = { subjectType: "user", userId: "", roleId: "", resourceType: this.filter.resourceType, resourceId: this.filter.resourceId, permissionMask: 0 };
    this.accessOptions.forEach((o) => {
      o.checked = false;
      o.label = this.translate.translate(o.label.split(" (")[0]) + " (" + o.value + ")";
    });
    this.isCreateModalVisible = true;
  }
  async createAcl() {
    const mask = this.accessOptions.filter((o) => o.checked).reduce((acc, curr) => acc + curr.value, 0);
    this.newEntry.permissionMask = mask;
    if (this.newEntry.subjectType === "user" && !this.newEntry.userId)
      return;
    if (this.newEntry.subjectType === "role" && !this.newEntry.roleId)
      return;
    const payload = {
      userId: this.newEntry.subjectType === "user" ? this.newEntry.userId : null,
      roleId: this.newEntry.subjectType === "role" ? this.newEntry.roleId : null,
      resourceType: this.newEntry.resourceType,
      resourceId: this.newEntry.resourceId,
      permissionMask: this.newEntry.permissionMask
    };
    try {
      await this.authMgmt.addAcl(payload);
      this.message.success(this.translate.translate("Th\xEAm ACL th\xE0nh c\xF4ng"));
      this.isCreateModalVisible = false;
      if (this.filter.resourceType === payload.resourceType && this.filter.resourceId === payload.resourceId) {
        this.loadAcl();
      }
    } catch (e) {
      this.message.error(this.translate.translate("Th\xEAm ACL th\u1EA5t b\u1EA1i"));
    }
  }
  async deleteAcl(id) {
    this.modal.confirm({
      nzTitle: `${this.translate.translate("X\xE1c nh\u1EADn")}?`,
      nzContent: `${this.translate.translate("X\xF3a")} ACL entry?`,
      nzOnOk: async () => {
        try {
          await this.authMgmt.removeAcl(id);
          this.message.success(this.translate.translate("X\xF3a ACL th\xE0nh c\xF4ng"));
          this.loadAcl();
        } catch (e) {
          this.message.error(this.translate.translate("X\xF3a ACL th\u1EA5t b\u1EA1i"));
        }
      }
    });
  }
};
_AclListComponent.\u0275fac = function AclListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AclListComponent)();
};
_AclListComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AclListComponent, selectors: [["app-acl-list"]], decls: 35, vars: 37, consts: [[1, "page-header"], [1, "filter-card"], [1, "filter-box"], [1, "filter-item"], [1, "label"], ["nz-input", "", 2, "width", "150px", 3, "ngModelChange", "ngModel", "placeholder"], ["nzType", "primary", 3, "click"], ["nz-icon", "", "nzType", "search"], ["nzType", "default", 3, "click"], ["nz-icon", "", "nzType", "plus"], [3, "queryParamsChange", "data", "columns", "loading", "title", "frontPagination", "pageIndex", "pageSize", "total"], ["totCell", "subject"], ["totCell", "resource"], ["totCell", "mask"], ["totCell", "action"], [3, "nzVisibleChange", "nzOnCancel", "nzOnOk", "nzVisible", "nzTitle"], [4, "nzModalContent"], ["class", "subject-info", 4, "ngIf"], [1, "subject-info"], ["nz-icon", "", "nzType", "user"], ["nz-icon", "", "nzType", "team"], [1, "mask-display"], [1, "mask-value"], [1, "mask-details"], ["nzColor", "blue", 4, "ngIf"], ["nzColor", "green", 4, "ngIf"], ["nzColor", "red", 4, "ngIf"], ["nzColor", "orange", 4, "ngIf"], ["nzColor", "blue"], ["nzColor", "green"], ["nzColor", "red"], ["nzColor", "orange"], ["nzType", "primary", "nzSize", "small", 3, "click", "nzDanger"], ["nz-form", "", "nzLayout", "vertical"], [3, "nzSpan"], ["name", "subjectType", 3, "ngModelChange", "ngModel"], ["nz-radio", "", "nzValue", "user"], ["nz-radio", "", "nzValue", "role"], [4, "ngIf"], [2, "display", "flex", "gap", "8px"], ["nz-input", "", "name", "resType", 2, "width", "120px", 3, "ngModelChange", "ngModel", "placeholder"], ["nz-input", "", "name", "resId", 2, "flex", "1", 3, "ngModelChange", "ngModel", "placeholder"], ["name", "perms", 3, "ngModelChange", "ngModel"], ["apiUrl", "/api/AuthManagement/users", "labelField", "username", "name", "userId", 3, "ngModelChange", "placeholder", "ngModel"], ["apiUrl", "/api/AuthManagement/roles", "name", "roleId", 3, "ngModelChange", "placeholder", "ngModel"]], template: function AclListComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "nz-card", 1)(5, "div", 2)(6, "div", 3)(7, "span", 4);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 5);
    \u0275\u0275pipe(11, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function AclListComponent_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.filter.resourceType, $event) || (ctx.filter.resourceType = $event);
      return $event;
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 3)(13, "span", 4);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 5);
    \u0275\u0275pipe(17, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function AclListComponent_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.filter.resourceId, $event) || (ctx.filter.resourceId = $event);
      return $event;
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "tot-button", 6);
    \u0275\u0275listener("click", function AclListComponent_Template_tot_button_click_18_listener() {
      return ctx.loadAcl();
    });
    \u0275\u0275element(19, "span", 7);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "tot-button", 8);
    \u0275\u0275listener("click", function AclListComponent_Template_tot_button_click_22_listener() {
      return ctx.showCreateModal();
    });
    \u0275\u0275element(23, "span", 9);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "transloco");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(26, "tot-table", 10);
    \u0275\u0275pipe(27, "transloco");
    \u0275\u0275listener("queryParamsChange", function AclListComponent_Template_tot_table_queryParamsChange_26_listener($event) {
      return ctx.onQueryParamsChange($event);
    });
    \u0275\u0275template(28, AclListComponent_ng_template_28_Template, 2, 2, "ng-template", 11)(29, AclListComponent_ng_template_29_Template, 4, 2, "ng-template", 12)(30, AclListComponent_ng_template_30_Template, 8, 5, "ng-template", 13)(31, AclListComponent_ng_template_31_Template, 3, 4, "ng-template", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "nz-modal", 15);
    \u0275\u0275pipe(33, "transloco");
    \u0275\u0275twoWayListener("nzVisibleChange", function AclListComponent_Template_nz_modal_nzVisibleChange_32_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.isCreateModalVisible, $event) || (ctx.isCreateModalVisible = $event);
      return $event;
    });
    \u0275\u0275listener("nzOnCancel", function AclListComponent_Template_nz_modal_nzOnCancel_32_listener() {
      return ctx.isCreateModalVisible = false;
    })("nzOnOk", function AclListComponent_Template_nz_modal_nzOnOk_32_listener() {
      return ctx.createAcl();
    });
    \u0275\u0275template(34, AclListComponent_ng_container_34_Template, 33, 30, "ng-container", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 19, "Qu\u1EA3n l\xFD ACL"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(9, 21, "Lo\u1EA1i t\xE0i nguy\xEAn"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx.filter.resourceType);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(11, 23, "V\xED d\u1EE5: order"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(15, 25, "ID t\xE0i nguy\xEAn"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx.filter.resourceId);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(17, 27, "V\xED d\u1EE5: 123 ho\u1EB7c *"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(21, 29, "T\xECm ki\u1EBFm..."), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(25, 31, "Th\xEAm m\u1EDBi"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx.aclEntries)("columns", ctx.aclColumns)("loading", ctx.loading)("title", \u0275\u0275pipeBind1(27, 33, "Danh s\xE1ch ACL"))("frontPagination", false)("pageIndex", ctx.pageIndex)("pageSize", ctx.pageSize)("total", ctx.totalAcl);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("nzVisible", ctx.isCreateModalVisible);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(33, 35, "Th\xEAm m\u1EDBi"));
  }
}, dependencies: [
  CommonModule,
  NgIf,
  FormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgForm,
  NzTableModule,
  NzButtonModule,
  NzTransitionPatchDirective,
  NzIconModule,
  NzIconDirective,
  NzSpaceModule,
  NzModalModule,
  NzModalComponent,
  NzModalContentDirective,
  NzSelectModule,
  NzFormModule,
  NzColDirective,
  NzRowDirective,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormControlComponent,
  NzInputModule,
  NzInputDirective,
  NzCheckboxModule,
  NzCheckboxGroupComponent,
  NzCardModule,
  NzCardComponent,
  NzRadioModule,
  NzRadioComponent,
  NzRadioGroupComponent,
  NzTagModule,
  NzTagComponent,
  NzDividerModule,
  NzDividerComponent,
  TranslocoModule,
  TotAutocompleteComponent,
  TotButtonComponent,
  TotTableComponent,
  TotCellDirective,
  TranslocoPipe
], styles: ["\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.filter-card[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  background: rgba(255, 255, 255, 0.7);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.filter-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.filter-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.label[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.subject-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.mask-display[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.mask-value[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-weight: bold;\n  background: #f0f2f5;\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.mask-details[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n/*# sourceMappingURL=acl-list.component.css.map */"] });
var AclListComponent = _AclListComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AclListComponent, [{
    type: Component,
    args: [{ selector: "app-acl-list", standalone: true, imports: [
      CommonModule,
      FormsModule,
      NzTableModule,
      NzButtonModule,
      NzIconModule,
      NzSpaceModule,
      NzModalModule,
      NzSelectModule,
      NzFormModule,
      NzInputModule,
      NzCheckboxModule,
      NzCardModule,
      NzRadioModule,
      NzTagModule,
      NzDividerModule,
      TranslocoModule,
      TotAutocompleteComponent,
      TotButtonComponent,
      TotTableComponent,
      TotCellDirective
    ], template: `
    <div class="page-header">
      <h2>{{ 'Qu\u1EA3n l\xFD ACL' | transloco }}</h2>
      <nz-card class="filter-card">
        <div class="filter-box">
          <div class="filter-item">
            <span class="label">{{ 'Lo\u1EA1i t\xE0i nguy\xEAn' | transloco }}:</span>
            <input nz-input [(ngModel)]="filter.resourceType" [placeholder]="'V\xED d\u1EE5: order' | transloco" style="width: 150px" />
          </div>
          <div class="filter-item">
            <span class="label">{{ 'ID t\xE0i nguy\xEAn' | transloco }}:</span>
            <input nz-input [(ngModel)]="filter.resourceId" [placeholder]="'V\xED d\u1EE5: 123 ho\u1EB7c *' | transloco" style="width: 150px" />
          </div>
          <tot-button nzType="primary" (click)="loadAcl()">
            <span nz-icon nzType="search"></span> {{ 'T\xECm ki\u1EBFm...' | transloco }}
          </tot-button>
          <tot-button nzType="default" (click)="showCreateModal()">
            <span nz-icon nzType="plus"></span> {{ 'Th\xEAm m\u1EDBi' | transloco }}
          </tot-button>
        </div>
      </nz-card>
    </div>

    <tot-table 
      [data]="aclEntries" 
      [columns]="aclColumns" 
      [loading]="loading" 
      [title]="'Danh s\xE1ch ACL' | transloco" 
      [frontPagination]="false"
      [pageIndex]="pageIndex"
      [pageSize]="pageSize"
      [total]="totalAcl"
      (queryParamsChange)="onQueryParamsChange($event)"
    >
      <ng-template totCell="subject" let-data>
        <div *ngIf="data.userId" class="subject-info">
          <span nz-icon nzType="user"></span>
          <span>{{ 'Ng\u01B0\u1EDDi d\xF9ng' | transloco }}: <strong>{{ data.userId }}</strong></span>
        </div>
        <div *ngIf="data.roleId" class="subject-info">
          <span nz-icon nzType="team"></span>
          <span>{{ 'Vai tr\xF2' | transloco }}: <strong>{{ data.roleId }}</strong></span>
        </div>
      </ng-template>

      <ng-template totCell="resource" let-data>
        <nz-tag>{{ data.resourceType }}</nz-tag>
        <code>{{ data.resourceId }}</code>
      </ng-template>

      <ng-template totCell="mask" let-data>
        <div class="mask-display">
          <span class="mask-value">{{ data.permissionMask }}</span>
          <div class="mask-details">
            <nz-tag *ngIf="hasMask(data.permissionMask, 1)" nzColor="blue">{{ '\u0110\u1ECDc' | transloco }}</nz-tag>
            <nz-tag *ngIf="hasMask(data.permissionMask, 2)" nzColor="green">{{ 'Ghi' | transloco }}</nz-tag>
            <nz-tag *ngIf="hasMask(data.permissionMask, 4)" nzColor="red">{{ 'X\xF3a' | transloco }}</nz-tag>
            <nz-tag *ngIf="hasMask(data.permissionMask, 8)" nzColor="orange">{{ 'Chia s\u1EBB' | transloco }}</nz-tag>
          </div>
        </div>
      </ng-template>

      <ng-template totCell="action" let-data>
        <tot-button nzType="primary" [nzDanger]="true" nzSize="small" (click)="deleteAcl(data.id)">{{ 'X\xF3a' | transloco }}</tot-button>
      </ng-template>
    </tot-table>

    <nz-modal [(nzVisible)]="isCreateModalVisible" [nzTitle]="'Th\xEAm m\u1EDBi' | transloco" (nzOnCancel)="isCreateModalVisible = false" (nzOnOk)="createAcl()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'Lo\u1EA1i \u0111\u1ED1i t\u01B0\u1EE3ng' | transloco }}</nz-form-label>
            <nz-form-control>
              <nz-radio-group [(ngModel)]="newEntry.subjectType" name="subjectType">
                <label nz-radio nzValue="user">{{ 'Ng\u01B0\u1EDDi d\xF9ng' | transloco }}</label>
                <label nz-radio nzValue="role">{{ 'Vai tr\xF2' | transloco }}</label>
              </nz-radio-group>
            </nz-form-control>
          </nz-form-item>
          
          <nz-form-item *ngIf="newEntry.subjectType === 'user'">
            <nz-form-label [nzSpan]="null">{{ 'Ng\u01B0\u1EDDi d\xF9ng' | transloco }}</nz-form-label>
            <nz-form-control>
              <tot-autocomplete
                apiUrl="/api/AuthManagement/users"
                [placeholder]="'T\xECm ki\u1EBFm...' | transloco"
                labelField="username"
                [(ngModel)]="newEntry.userId"
                name="userId"
              ></tot-autocomplete>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item *ngIf="newEntry.subjectType === 'role'">
            <nz-form-label [nzSpan]="null">{{ 'Vai tr\xF2' | transloco }}</nz-form-label>
            <nz-form-control>
              <tot-autocomplete
                apiUrl="/api/AuthManagement/roles"
                [placeholder]="'T\xECm ki\u1EBFm...' | transloco"
                [(ngModel)]="newEntry.roleId"
                name="roleId"
              ></tot-autocomplete>
            </nz-form-control>
          </nz-form-item>

          <nz-divider></nz-divider>

          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'T\xE0i nguy\xEAn' | transloco }}</nz-form-label>
            <nz-form-control>
              <div style="display: flex; gap: 8px;">
                <input nz-input [(ngModel)]="newEntry.resourceType" name="resType" [placeholder]="'Lo\u1EA1i' | transloco" style="width: 120px" />
                <input nz-input [(ngModel)]="newEntry.resourceId" name="resId" [placeholder]="'ID ho\u1EB7c *' | transloco" style="flex: 1" />
              </div>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'M\u1EE9c \u0111\u1ED9 truy c\u1EADp' | transloco }}</nz-form-label>
            <nz-form-control>
              <nz-checkbox-group [(ngModel)]="accessOptions" name="perms"></nz-checkbox-group>
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>
  `, styles: ["/* angular:styles/component:css;0b341135562a1eed7d039abbd27d40d4437d1cd0412b7ce500c8b8eb3356cda9;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/projects/tot/business-oidc/src/lib/acl-list/acl-list.component.ts */\n.page-header {\n  margin-bottom: 24px;\n}\n.filter-card {\n  margin-top: 16px;\n  background: rgba(255, 255, 255, 0.7);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n.filter-box {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.filter-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.label {\n  font-weight: 500;\n}\n.subject-info {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.mask-display {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.mask-value {\n  font-family: monospace;\n  font-weight: bold;\n  background: #f0f2f5;\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.mask-details {\n  display: flex;\n  gap: 4px;\n}\n/*# sourceMappingURL=acl-list.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AclListComponent, { className: "AclListComponent", filePath: "projects/tot/business-oidc/src/lib/acl-list/acl-list.component.ts", lineNumber: 221 });
})();

// projects/tot/business-oidc/src/lib/claim-sync/claim-sync.component.ts
var _c03 = ["actionsTpl"];
var _c13 = ["dateTpl"];
var _c2 = () => [16, 16];
function ClaimSyncComponent_tot_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 3);
    \u0275\u0275listener("click", function ClaimSyncComponent_tot_button_18_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.search());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "T\xECm ki\u1EBFm"));
  }
}
function ClaimSyncComponent_tot_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 20);
    \u0275\u0275listener("click", function ClaimSyncComponent_tot_button_19_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.resetSearch());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "\u0110\u1EB7t l\u1EA1i"));
  }
}
function ClaimSyncComponent_ng_template_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "tot-button", 22);
    \u0275\u0275listener("click", function ClaimSyncComponent_ng_template_36_Template_tot_button_click_1_listener() {
      const data_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteClaim(data_r6));
    });
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzDanger", true)("disabled", (data_r6.name == null ? null : data_r6.name.toLowerCase()) === ctx_r2.ADMIN_CLAIM);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 3, "X\xF3a"));
  }
}
function ClaimSyncComponent_ng_template_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const data_r7 = ctx.$implicit;
    const key_r8 = ctx.key;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, data_r7[key_r8], "short"), " ");
  }
}
function ClaimSyncComponent_ng_container_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "form", 23)(2, "nz-form-item")(3, "nz-form-label", 24);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "nz-form-control")(7, "input", 25);
    \u0275\u0275pipe(8, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function ClaimSyncComponent_ng_container_42_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newClaim.name, $event) || (ctx_r2.newClaim.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "nz-form-item")(10, "nz-form-label", 24);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "nz-form-control")(14, "input", 26);
    \u0275\u0275pipe(15, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function ClaimSyncComponent_ng_container_42_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newClaim.description, $event) || (ctx_r2.newClaim.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("nzSpan", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 8, "Quy\u1EC1n"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newClaim.name);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(8, 10, "Quy\u1EC1n"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzSpan", null);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 12, "M\xF4 t\u1EA3"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newClaim.description);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(15, 14, "M\xF4 t\u1EA3"));
  }
}
var _ClaimSyncComponent = class _ClaimSyncComponent {
  constructor() {
    this.authMgmt = inject(AuthManagementService);
    this.notification = inject(AppNotificationService);
    this.modal = inject(NzModalService);
    this.translate = inject(TranslocoService);
    this.version = CLAIMS_VERSION;
    this.claims = ALL_CLAIMS;
    this.claimsCount = ALL_CLAIMS.length;
    this.ADMIN_CLAIM = ADMIN_CLAIM;
    this.existingClaims = [];
    this.loading = false;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.totalClaims = 0;
    this.isCreateModalVisible = false;
    this.newClaim = { name: "", description: "" };
    this.searchQuery = {
      keyword: "",
      dateRange: []
    };
    this.claimColumns = [];
  }
  ngOnInit() {
    this.claimColumns = [
      { title: "Quy\u1EC1n", key: "name" },
      { title: "M\xF4 t\u1EA3", key: "description" },
      { title: "Ng\xE0y t\u1EA1o", key: "createdAt", template: this.dateTpl },
      { title: "H\xE0nh \u0111\u1ED9ng", width: "120px", template: this.actionsTpl, right: true }
    ];
    this.loadClaims();
  }
  async loadClaims() {
    var _a, _b;
    this.loading = true;
    try {
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      if (this.searchQuery.keyword)
        params.keyword = this.searchQuery.keyword;
      if (this.searchQuery.dateRange && this.searchQuery.dateRange.length === 2) {
        params.startDate = (_a = this.searchQuery.dateRange[0]) == null ? void 0 : _a.toISOString();
        params.endDate = (_b = this.searchQuery.dateRange[1]) == null ? void 0 : _b.toISOString();
      }
      const res = await this.authMgmt.getClaims(params);
      this.existingClaims = res.items || [];
      this.totalClaims = res.total || 0;
    } catch (e) {
      this.notification.error(this.translate.translate("Th\u1EA5t b\u1EA1i"), this.translate.translate("Kh\xF4ng th\u1EC3 t\u1EA3i danh s\xE1ch quy\u1EC1n"));
    } finally {
      this.loading = false;
    }
  }
  search() {
    this.pageIndex = 1;
    this.loadClaims();
  }
  onQueryParamsChange(params) {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadClaims();
  }
  resetSearch() {
    this.pageIndex = 1;
    this.searchQuery = {
      keyword: "",
      dateRange: []
    };
    this.loadClaims();
  }
  async sync() {
    this.loading = true;
    try {
      await this.authMgmt.syncClaims(this.version, this.claims);
      this.notification.success(this.translate.translate("Th\xE0nh c\xF4ng"), this.translate.translate("\u0110\u1ED3ng b\u1ED9 quy\u1EC1n th\xE0nh c\xF4ng"));
      this.loadClaims();
    } catch (e) {
      this.notification.error(this.translate.translate("Th\u1EA5t b\u1EA1i"), this.translate.translate("\u0110\u1ED3ng b\u1ED9 quy\u1EC1n th\u1EA5t b\u1EA1i"));
    } finally {
      this.loading = false;
    }
  }
  showCreateModal() {
    this.newClaim = { name: "", description: "" };
    this.isCreateModalVisible = true;
  }
  async createClaim() {
    if (!this.newClaim.name)
      return;
    try {
      await this.authMgmt.createClaim(this.newClaim);
      this.notification.success(this.translate.translate("Th\xE0nh c\xF4ng"), this.translate.translate("Th\xEAm quy\u1EC1n th\xE0nh c\xF4ng"));
      this.isCreateModalVisible = false;
      this.loadClaims();
    } catch (e) {
      this.notification.error(this.translate.translate("Th\u1EA5t b\u1EA1i"), this.translate.translate("Th\xEAm quy\u1EC1n th\u1EA5t b\u1EA1i"));
    }
  }
  async deleteClaim(claim) {
    var _a;
    if (((_a = claim.name) == null ? void 0 : _a.toLowerCase()) === ADMIN_CLAIM) {
      this.notification.warning(this.translate.translate("C\u1EA3nh b\xE1o"), `${this.translate.translate("Kh\xF4ng th\u1EC3 x\xF3a quy\u1EC1n")} ${ADMIN_CLAIM}`);
      return;
    }
    this.modal.confirm({
      nzTitle: `${this.translate.translate("X\xE1c nh\u1EADn x\xF3a quy\u1EC1n")} ${claim.name}?`,
      nzContent: this.translate.translate("H\xE0nh \u0111\u1ED9ng n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c"),
      nzOkDanger: true,
      nzOnOk: async () => {
        var _a2;
        try {
          await this.authMgmt.deleteClaim(claim.id);
          this.notification.success(this.translate.translate("Th\xE0nh c\xF4ng"), this.translate.translate("X\xF3a quy\u1EC1n th\xE0nh c\xF4ng"));
          this.loadClaims();
        } catch (e) {
          this.notification.error(this.translate.translate("Th\u1EA5t b\u1EA1i"), ((_a2 = e.error) == null ? void 0 : _a2.message) || this.translate.translate("X\xF3a quy\u1EC1n th\u1EA5t b\u1EA1i"));
        }
      }
    });
  }
};
_ClaimSyncComponent.\u0275fac = function ClaimSyncComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ClaimSyncComponent)();
};
_ClaimSyncComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClaimSyncComponent, selectors: [["app-claim-sync"]], viewQuery: function ClaimSyncComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c03, 7)(_c13, 7);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.actionsTpl = _t.first);
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.dateTpl = _t.first);
  }
}, decls: 43, vars: 42, consts: [["actionsTpl", ""], ["dateTpl", ""], [1, "page-header"], ["nzType", "primary", 3, "click"], ["nz-icon", "", "nzType", "plus"], [1, "search-card", 3, "nzTitle"], ["nz-row", "", 3, "nzGutter"], ["nz-col", "", 3, "nzSpan"], ["nz-input", "", 3, "ngModelChange", "keyup.enter", "ngModel", "placeholder"], [2, "width", "100%", 3, "ngModelChange", "ngModel"], ["nz-col", "", 1, "search-actions", 3, "nzSpan"], ["nzType", "primary", 3, "click", 4, "nzSpaceItem"], [3, "click", 4, "nzSpaceItem"], [2, "margin-bottom", "16px", 3, "nzTitle"], [1, "sync-actions"], ["nzType", "primary", 3, "click", "loading"], ["nz-icon", "", "nzType", "sync"], [3, "queryParamsChange", "data", "columns", "loading", "title", "frontPagination", "pageIndex", "pageSize", "total"], [3, "nzVisibleChange", "nzOnCancel", "nzOnOk", "nzVisible", "nzTitle"], [4, "nzModalContent"], [3, "click"], [2, "display", "flex", "gap", "4px", "flex-direction", "column"], ["nzType", "primary", "nzSize", "small", 3, "click", "nzDanger", "disabled"], ["nz-form", "", "nzLayout", "vertical"], [3, "nzSpan"], ["nz-input", "", "name", "name", 3, "ngModelChange", "ngModel", "placeholder"], ["nz-input", "", "name", "description", 3, "ngModelChange", "ngModel", "placeholder"]], template: function ClaimSyncComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "tot-button", 3);
    \u0275\u0275listener("click", function ClaimSyncComponent_Template_tot_button_click_4_listener() {
      return ctx.showCreateModal();
    });
    \u0275\u0275element(5, "span", 4);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "transloco");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "nz-card", 5);
    \u0275\u0275pipe(9, "transloco");
    \u0275\u0275elementStart(10, "div", 6)(11, "div", 7)(12, "input", 8);
    \u0275\u0275pipe(13, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function ClaimSyncComponent_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.keyword, $event) || (ctx.searchQuery.keyword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function ClaimSyncComponent_Template_input_keyup_enter_12_listener() {
      return ctx.search();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 7)(15, "nz-range-picker", 9);
    \u0275\u0275twoWayListener("ngModelChange", function ClaimSyncComponent_Template_nz_range_picker_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.dateRange, $event) || (ctx.searchQuery.dateRange = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 10)(17, "nz-space");
    \u0275\u0275template(18, ClaimSyncComponent_tot_button_18_Template, 3, 3, "tot-button", 11)(19, ClaimSyncComponent_tot_button_19_Template, 3, 3, "tot-button", 12);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(20, "nz-card", 13);
    \u0275\u0275pipe(21, "transloco");
    \u0275\u0275elementStart(22, "p");
    \u0275\u0275text(23, "Version: ");
    \u0275\u0275elementStart(24, "strong");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275text(26, " | Count: ");
    \u0275\u0275elementStart(27, "strong");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 14)(30, "tot-button", 15);
    \u0275\u0275listener("click", function ClaimSyncComponent_Template_tot_button_click_30_listener() {
      return ctx.sync();
    });
    \u0275\u0275element(31, "span", 16);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "transloco");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "tot-table", 17);
    \u0275\u0275pipe(35, "transloco");
    \u0275\u0275listener("queryParamsChange", function ClaimSyncComponent_Template_tot_table_queryParamsChange_34_listener($event) {
      return ctx.onQueryParamsChange($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(36, ClaimSyncComponent_ng_template_36_Template, 4, 5, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(38, ClaimSyncComponent_ng_template_38_Template, 2, 4, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(40, "nz-modal", 18);
    \u0275\u0275pipe(41, "transloco");
    \u0275\u0275twoWayListener("nzVisibleChange", function ClaimSyncComponent_Template_nz_modal_nzVisibleChange_40_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.isCreateModalVisible, $event) || (ctx.isCreateModalVisible = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function ClaimSyncComponent_Template_nz_modal_nzOnCancel_40_listener() {
      return ctx.isCreateModalVisible = false;
    })("nzOnOk", function ClaimSyncComponent_Template_nz_modal_nzOnOk_40_listener() {
      return ctx.createClaim();
    });
    \u0275\u0275template(42, ClaimSyncComponent_ng_container_42_Template, 16, 16, "ng-container", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 25, "Quy\u1EC1n"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 27, "Th\xEAm m\u1EDBi"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(9, 29, "T\xECm ki\u1EBFm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzGutter", \u0275\u0275pureFunction0(41, _c2));
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 10);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.keyword);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(13, 31, "T\xEAn quy\u1EC1n, m\xF4 t\u1EA3"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 8);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.dateRange);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance(4);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(21, 33, "\u0110\u1ED3ng b\u1ED9 quy\u1EC1n"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.version);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.claimsCount);
    \u0275\u0275advance(2);
    \u0275\u0275property("loading", ctx.loading);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(33, 35, "\u0110\u1ED3ng b\u1ED9"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx.existingClaims)("columns", ctx.claimColumns)("loading", ctx.loading)("title", \u0275\u0275pipeBind1(35, 37, "Danh s\xE1ch quy\u1EC1n"))("frontPagination", false)("pageIndex", ctx.pageIndex)("pageSize", ctx.pageSize)("total", ctx.totalClaims);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("nzVisible", ctx.isCreateModalVisible);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(41, 39, "Th\xEAm m\u1EDBi"));
  }
}, dependencies: [
  CommonModule,
  FormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgForm,
  NzButtonModule,
  NzTransitionPatchDirective,
  NzIconModule,
  NzIconDirective,
  NzCardModule,
  NzCardComponent,
  NzTableModule,
  NzModalModule,
  NzModalComponent,
  NzModalContentDirective,
  NzFormModule,
  NzColDirective,
  NzRowDirective,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormControlComponent,
  NzInputModule,
  NzInputDirective,
  NzSpaceModule,
  NzSpaceComponent,
  NzSpaceItemDirective,
  NzDatePickerModule,
  NzDatePickerComponent,
  NzRangePickerComponent,
  NzGridModule,
  TranslocoModule,
  TotButtonComponent,
  TotTableComponent,
  DatePipe,
  TranslocoPipe
], styles: ["\n.search-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.search-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n.sync-actions[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n/*# sourceMappingURL=claim-sync.component.css.map */"] });
var ClaimSyncComponent = _ClaimSyncComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClaimSyncComponent, [{
    type: Component,
    args: [{ selector: "app-claim-sync", standalone: true, imports: [
      CommonModule,
      FormsModule,
      NzButtonModule,
      NzIconModule,
      NzCardModule,
      NzTableModule,
      NzModalModule,
      NzFormModule,
      NzInputModule,
      NzSpaceModule,
      NzDatePickerModule,
      NzGridModule,
      TranslocoModule,
      TotButtonComponent,
      TotTableComponent
    ], template: `
    <div class="page-header">
      <h2>{{ 'Quy\u1EC1n' | transloco }}</h2>
      <tot-button nzType="primary" (click)="showCreateModal()">
        <span nz-icon nzType="plus"></span> {{ 'Th\xEAm m\u1EDBi' | transloco }}
      </tot-button>
    </div>

    <nz-card [nzTitle]="'T\xECm ki\u1EBFm' | transloco" class="search-card">
      <div nz-row [nzGutter]="[16, 16]">
        <div nz-col [nzSpan]="10">
          <input nz-input [(ngModel)]="searchQuery.keyword" [placeholder]="'T\xEAn quy\u1EC1n, m\xF4 t\u1EA3' | transloco" (keyup.enter)="search()" />
        </div>
        <div nz-col [nzSpan]="8">
          <nz-range-picker [(ngModel)]="searchQuery.dateRange" style="width: 100%"></nz-range-picker>
        </div>
        <div nz-col [nzSpan]="6" class="search-actions">
          <nz-space>
            <tot-button *nzSpaceItem  nzType="primary" (click)="search()">{{ 'T\xECm ki\u1EBFm' | transloco }}</tot-button>
            <tot-button *nzSpaceItem  (click)="resetSearch()">{{ '\u0110\u1EB7t l\u1EA1i' | transloco }}</tot-button>
          </nz-space>
        </div>
      </div>
    </nz-card>

    <nz-card [nzTitle]="'\u0110\u1ED3ng b\u1ED9 quy\u1EC1n' | transloco" style="margin-bottom: 16px;">
      <p>Version: <strong>{{ version }}</strong> | Count: <strong>{{ claimsCount }}</strong></p>
      <div class="sync-actions">
        <tot-button nzType="primary" (click)="sync()" [loading]="loading">
          <span nz-icon nzType="sync"></span> {{ '\u0110\u1ED3ng b\u1ED9' | transloco }}
        </tot-button>
      </div>
    </nz-card>

    <tot-table 
      [data]="existingClaims" 
      [columns]="claimColumns" 
      [loading]="loading" 
      [title]="'Danh s\xE1ch quy\u1EC1n' | transloco" 
      [frontPagination]="false"
      [pageIndex]="pageIndex"
      [pageSize]="pageSize"
      [total]="totalClaims"
      (queryParamsChange)="onQueryParamsChange($event)"
    ></tot-table>

    <ng-template #actionsTpl let-data>
      <div style="display: flex; gap: 4px; flex-direction: column;">
        <tot-button nzType="primary" [nzDanger]="true" nzSize="small" 
                [disabled]="data.name?.toLowerCase() === ADMIN_CLAIM"
                (click)="deleteClaim(data)">{{ 'X\xF3a' | transloco }}</tot-button>
      </div>
    </ng-template>

    <ng-template #dateTpl let-data let-key="key">
      {{ data[key] | date:'short' }}
    </ng-template>

    <nz-modal [(nzVisible)]="isCreateModalVisible" [nzTitle]="'Th\xEAm m\u1EDBi' | transloco" (nzOnCancel)="isCreateModalVisible = false" (nzOnOk)="createClaim()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'Quy\u1EC1n' | transloco }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="newClaim.name" name="name" [placeholder]="'Quy\u1EC1n' | transloco" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'M\xF4 t\u1EA3' | transloco }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="newClaim.description" name="description" [placeholder]="'M\xF4 t\u1EA3' | transloco" />
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>
  `, styles: ["/* angular:styles/component:css;3d6c087fef029db6e15f3bdfeb8f2744819840f4d2bfb03dd85b6d0cde160fe1;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/projects/tot/business-oidc/src/lib/claim-sync/claim-sync.component.ts */\n.search-card {\n  margin-bottom: 16px;\n}\n.search-actions {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n.sync-actions {\n  margin-top: 8px;\n}\n/*# sourceMappingURL=claim-sync.component.css.map */\n"] }]
  }], null, { actionsTpl: [{
    type: ViewChild,
    args: ["actionsTpl", { static: true }]
  }], dateTpl: [{
    type: ViewChild,
    args: ["dateTpl", { static: true }]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClaimSyncComponent, { className: "ClaimSyncComponent", filePath: "projects/tot/business-oidc/src/lib/claim-sync/claim-sync.component.ts", lineNumber: 131 });
})();

// projects/tot/business-oidc/src/lib/change-password/change-password.component.ts
function ChangePasswordComponent_ng_template_19_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "Vui l\xF2ng nh\u1EADp m\u1EADt kh\u1EA9u m\u1EDBi!"));
  }
}
function ChangePasswordComponent_ng_template_19_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "M\u1EADt kh\u1EA9u ph\u1EA3i c\xF3 \xEDt nh\u1EA5t 6 k\xFD t\u1EF1"));
  }
}
function ChangePasswordComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ChangePasswordComponent_ng_template_19_ng_container_0_Template, 3, 3, "ng-container", 12)(1, ChangePasswordComponent_ng_template_19_ng_container_1_Template, 3, 3, "ng-container", 12);
  }
  if (rf & 2) {
    const control_r1 = ctx.$implicit;
    \u0275\u0275property("ngIf", control_r1.hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", control_r1.hasError("minlength"));
  }
}
function ChangePasswordComponent_ng_template_28_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "Vui l\xF2ng x\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi!"));
  }
}
function ChangePasswordComponent_ng_template_28_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "M\u1EADt kh\u1EA9u kh\xF4ng kh\u1EDBp"));
  }
}
function ChangePasswordComponent_ng_template_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ChangePasswordComponent_ng_template_28_ng_container_0_Template, 3, 3, "ng-container", 12)(1, ChangePasswordComponent_ng_template_28_ng_container_1_Template, 3, 3, "ng-container", 12);
  }
  if (rf & 2) {
    const control_r2 = ctx.$implicit;
    \u0275\u0275property("ngIf", control_r2.hasError("required"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", control_r2.hasError("confirm"));
  }
}
var _ChangePasswordComponent = class _ChangePasswordComponent {
  constructor() {
    this.fb = inject(NonNullableFormBuilder);
    this.http = inject(HttpClientService);
    this.notification = inject(AppNotificationService);
    this.translate = inject(TranslocoService);
    this.loading = false;
    this.confirmationValidator = (control) => {
      var _a;
      if (!control.value) {
        return { required: true };
      } else if (control.value !== ((_a = this.validateForm) == null ? void 0 : _a.controls.newPassword.value)) {
        return { confirm: true, error: true };
      }
      return {};
    };
    this.validateForm = this.fb.group({
      oldPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required, (c) => this.confirmationValidator(c)]]
    });
  }
  async submitForm() {
    var _a;
    if (this.validateForm.valid) {
      this.loading = true;
      try {
        await this.http.post("/api/auth/change-password", this.validateForm.value);
        this.notification.success(this.translate.translate("Th\xE0nh c\xF4ng"), this.translate.translate("\u0110\u1ED5i m\u1EADt kh\u1EA9u th\xE0nh c\xF4ng"));
        this.validateForm.reset();
      } catch (e) {
        console.error(e);
        this.notification.error(this.translate.translate("Th\u1EA5t b\u1EA1i"), ((_a = e.error) == null ? void 0 : _a.message) || this.translate.translate("\u0110\u1ED5i m\u1EADt kh\u1EA9u th\u1EA5t b\u1EA1i"));
      } finally {
        this.loading = false;
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
};
_ChangePasswordComponent.\u0275fac = function ChangePasswordComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ChangePasswordComponent)();
};
_ChangePasswordComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChangePasswordComponent, selectors: [["app-change-password"]], decls: 35, vars: 39, consts: [["passwordErrorTpl", ""], ["confirmErrorTpl", ""], [1, "change-password-container"], [3, "nzTitle"], ["nz-form", "", 3, "ngSubmit", "formGroup"], ["nzRequired", "", 3, "nzSpan"], [3, "nzSpan", "nzErrorTip"], ["type", "password", "formControlName", "oldPassword", 3, "placeholder"], ["type", "password", "formControlName", "newPassword", 3, "placeholder"], ["type", "password", "formControlName", "confirmPassword", 3, "placeholder"], [3, "nzOffset", "nzSpan"], ["nzType", "primary", 3, "loading"], [4, "ngIf"]], template: function ChangePasswordComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "nz-card", 3);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementStart(3, "form", 4);
    \u0275\u0275listener("ngSubmit", function ChangePasswordComponent_Template_form_ngSubmit_3_listener() {
      return ctx.submitForm();
    });
    \u0275\u0275elementStart(4, "nz-form-item")(5, "nz-form-label", 5);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "nz-form-control", 6);
    \u0275\u0275pipe(9, "transloco");
    \u0275\u0275element(10, "tot-input", 7);
    \u0275\u0275pipe(11, "transloco");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "nz-form-item")(13, "nz-form-label", 5);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "nz-form-control", 6);
    \u0275\u0275element(17, "tot-input", 8);
    \u0275\u0275pipe(18, "transloco");
    \u0275\u0275template(19, ChangePasswordComponent_ng_template_19_Template, 2, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "nz-form-item")(22, "nz-form-label", 5);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "nz-form-control", 6);
    \u0275\u0275element(26, "tot-input", 9);
    \u0275\u0275pipe(27, "transloco");
    \u0275\u0275template(28, ChangePasswordComponent_ng_template_28_Template, 2, 2, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "nz-form-item")(31, "nz-form-control", 10)(32, "tot-button", 11);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "transloco");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const passwordErrorTpl_r3 = \u0275\u0275reference(20);
    const confirmErrorTpl_r4 = \u0275\u0275reference(29);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(2, 21, "\u0110\u1ED5i m\u1EADt kh\u1EA9u"));
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx.validateForm);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 23, "M\u1EADt kh\u1EA9u c\u0169"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 14)("nzErrorTip", \u0275\u0275pipeBind1(9, 25, "Vui l\xF2ng nh\u1EADp m\u1EADt kh\u1EA9u c\u0169!"));
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(11, 27, "M\u1EADt kh\u1EA9u c\u0169"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(15, 29, "M\u1EADt kh\u1EA9u m\u1EDBi"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 14)("nzErrorTip", passwordErrorTpl_r3);
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(18, 31, "M\u1EADt kh\u1EA9u m\u1EDBi"));
    \u0275\u0275advance(5);
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(24, 33, "X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 14)("nzErrorTip", confirmErrorTpl_r4);
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(27, 35, "X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi"));
    \u0275\u0275advance(5);
    \u0275\u0275property("nzOffset", 6)("nzSpan", 14);
    \u0275\u0275advance();
    \u0275\u0275property("loading", ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(34, 37, "L\u01B0u"));
  }
}, dependencies: [
  TotButtonComponent,
  TotInputComponent,
  CommonModule,
  NgIf,
  ReactiveFormsModule,
  \u0275NgNoValidate,
  NgControlStatus,
  NgControlStatusGroup,
  FormGroupDirective,
  FormControlName,
  NzFormModule,
  NzColDirective,
  NzRowDirective,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormControlComponent,
  NzInputModule,
  NzButtonModule,
  NzCardModule,
  NzCardComponent,
  TranslocoModule,
  TranslocoPipe
], styles: ["\n.change-password-container[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 24px auto;\n}\nnz-card[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=change-password.component.css.map */"] });
var ChangePasswordComponent = _ChangePasswordComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChangePasswordComponent, [{
    type: Component,
    args: [{ selector: "app-change-password", standalone: true, imports: [
      TotButtonComponent,
      TotInputComponent,
      CommonModule,
      ReactiveFormsModule,
      NzFormModule,
      NzInputModule,
      NzButtonModule,
      NzCardModule,
      TranslocoModule
    ], template: `<div class="change-password-container">
  <nz-card [nzTitle]="'\u0110\u1ED5i m\u1EADt kh\u1EA9u' | transloco">
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSpan]="6" nzRequired>{{ 'M\u1EADt kh\u1EA9u c\u0169' | transloco }}</nz-form-label>
        <nz-form-control [nzSpan]="14" [nzErrorTip]="'Vui l\xF2ng nh\u1EADp m\u1EADt kh\u1EA9u c\u0169!' | transloco">
          <tot-input type="password" formControlName="oldPassword" [placeholder]="'M\u1EADt kh\u1EA9u c\u0169' | transloco"></tot-input>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSpan]="6" nzRequired>{{ 'M\u1EADt kh\u1EA9u m\u1EDBi' | transloco }}</nz-form-label>
        <nz-form-control [nzSpan]="14" [nzErrorTip]="passwordErrorTpl">
          <tot-input type="password" formControlName="newPassword" [placeholder]="'M\u1EADt kh\u1EA9u m\u1EDBi' | transloco"></tot-input>
          <ng-template #passwordErrorTpl let-control>
            <ng-container *ngIf="control.hasError('required')">{{ 'Vui l\xF2ng nh\u1EADp m\u1EADt kh\u1EA9u m\u1EDBi!' | transloco }}</ng-container>
            <ng-container *ngIf="control.hasError('minlength')">{{ 'M\u1EADt kh\u1EA9u ph\u1EA3i c\xF3 \xEDt nh\u1EA5t 6 k\xFD t\u1EF1' | transloco }}</ng-container>
          </ng-template>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSpan]="6" nzRequired>{{ 'X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi' | transloco }}</nz-form-label>
        <nz-form-control [nzSpan]="14" [nzErrorTip]="confirmErrorTpl">
          <tot-input type="password" formControlName="confirmPassword" [placeholder]="'X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi' | transloco"></tot-input>
          <ng-template #confirmErrorTpl let-control>
            <ng-container *ngIf="control.hasError('required')">{{ 'Vui l\xF2ng x\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi!' | transloco }}</ng-container>
            <ng-container *ngIf="control.hasError('confirm')">{{ 'M\u1EADt kh\u1EA9u kh\xF4ng kh\u1EDBp' | transloco }}</ng-container>
          </ng-template>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-control [nzOffset]="6" [nzSpan]="14">
          <tot-button nzType="primary" [loading]="loading">{{ 'L\u01B0u' | transloco }}</tot-button>
        </nz-form-control>
      </nz-form-item>
    </form>
  </nz-card>
</div>
`, styles: ["/* projects/tot/business-oidc/src/lib/change-password/change-password.component.css */\n.change-password-container {\n  max-width: 800px;\n  margin: 24px auto;\n}\nnz-card {\n  width: 100%;\n}\n/*# sourceMappingURL=change-password.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChangePasswordComponent, { className: "ChangePasswordComponent", filePath: "projects/tot/business-oidc/src/lib/change-password/change-password.component.ts", lineNumber: 30 });
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-tabs.mjs
function NzTabAddButtonComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "nz-icon", 1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const icon_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzType", icon_r1);
  }
}
var _c04 = ["nz-tab-body", ""];
function NzTabBodyComponent_ng_template_0_Template(rf, ctx) {
}
function NzTabCloseButtonComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "nz-icon", 1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const icon_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzType", icon_r1);
  }
}
var _c14 = () => ({
  minWidth: "46px"
});
var _c22 = () => ({
  visible: false
});
function NzTabNavOperationComponent_Conditional_5_For_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.tab.label, " ");
  }
}
function NzTabNavOperationComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 7);
    \u0275\u0275listener("click", function NzTabNavOperationComponent_Conditional_5_For_2_Template_li_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onSelect(item_r2));
    })("contextmenu", function NzTabNavOperationComponent_Conditional_5_For_2_Template_li_contextmenu_0_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onContextmenu(item_r2, $event));
    });
    \u0275\u0275template(1, NzTabNavOperationComponent_Conditional_5_For_2_ng_container_1_Template, 2, 1, "ng-container", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275classProp("ant-tabs-dropdown-menu-item-disabled", item_r2.disabled);
    \u0275\u0275property("nzSelected", item_r2.active)("nzDisabled", item_r2.disabled);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", item_r2.tab.label)("nzStringTemplateOutletContext", \u0275\u0275pureFunction0(6, _c22));
  }
}
function NzTabNavOperationComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 4);
    \u0275\u0275repeaterCreate(1, NzTabNavOperationComponent_Conditional_5_For_2_Template, 2, 7, "li", 6, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.items);
  }
}
function NzTabNavOperationComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function NzTabNavOperationComponent_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addClicked.emit());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("addIcon", ctx_r2.addIcon);
  }
}
var _c3 = ["navWrap"];
var _c4 = ["navList"];
var _c5 = ["*"];
function NzTabNavBarComponent_Conditional_0_ng_template_1_Template(rf, ctx) {
}
function NzTabNavBarComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275template(1, NzTabNavBarComponent_Conditional_0_ng_template_1_Template, 0, 0, "ng-template", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.startExtraContent().templateRef);
  }
}
function NzTabNavBarComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function NzTabNavBarComponent_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.addClicked.emit());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("addIcon", ctx_r0.addIcon);
    \u0275\u0275attribute("tabindex", -1);
  }
}
function NzTabNavBarComponent_Conditional_9_ng_template_1_Template(rf, ctx) {
}
function NzTabNavBarComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275template(1, NzTabNavBarComponent_Conditional_9_ng_template_1_Template, 0, 0, "ng-template", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.endExtraContent().templateRef);
  }
}
function NzTabNavBarComponent_Conditional_10_ng_template_1_Template(rf, ctx) {
}
function NzTabNavBarComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275template(1, NzTabNavBarComponent_Conditional_10_ng_template_1_Template, 0, 0, "ng-template", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.extraTemplate);
  }
}
var _c6 = ["contentTemplate"];
var _c7 = [[["", "nz-tab-link", ""]], "*"];
var _c8 = ["[nz-tab-link]", "*"];
function NzTabComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function NzTabComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 1);
  }
}
var _c9 = () => ({
  visible: true
});
function NzTabsComponent_Conditional_0_For_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const tab_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r5.label, " ");
  }
}
function NzTabsComponent_Conditional_0_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function NzTabsComponent_Conditional_0_For_2_Conditional_3_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const $index_r6 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onClose($index_r6, $event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("closeIcon", tab_r5.nzCloseIcon);
  }
}
function NzTabsComponent_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275listener("click", function NzTabsComponent_Conditional_0_For_2_Template_div_click_0_listener($event) {
      const ctx_r3 = \u0275\u0275restoreView(_r3);
      const tab_r5 = ctx_r3.$implicit;
      const $index_r6 = ctx_r3.$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clickNavItem(tab_r5, $index_r6, $event));
    })("contextmenu", function NzTabsComponent_Conditional_0_For_2_Template_div_contextmenu_0_listener($event) {
      const tab_r5 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.contextmenuNavItem(tab_r5, $event));
    });
    \u0275\u0275elementStart(1, "button", 7);
    \u0275\u0275template(2, NzTabsComponent_Conditional_0_For_2_ng_container_2_Template, 2, 1, "ng-container", 8);
    \u0275\u0275conditionalCreate(3, NzTabsComponent_Conditional_0_For_2_Conditional_3_Template, 1, 1, "button", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tab_r5 = ctx.$implicit;
    const $index_r6 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("margin-right", ctx_r1.position === "horizontal" ? ctx_r1.nzTabBarGutter : null, "px")("margin-bottom", ctx_r1.position === "vertical" ? ctx_r1.nzTabBarGutter : null, "px");
    \u0275\u0275classProp("ant-tabs-tab-active", ctx_r1.nzSelectedIndex === $index_r6)("ant-tabs-tab-disabled", tab_r5.nzDisabled);
    \u0275\u0275advance();
    \u0275\u0275property("id", ctx_r1.getTabContentId($index_r6))("disabled", tab_r5.nzDisabled)("tab", tab_r5)("active", ctx_r1.nzSelectedIndex === $index_r6);
    \u0275\u0275attribute("tabIndex", ctx_r1.getTabIndex(tab_r5, $index_r6))("aria-disabled", tab_r5.nzDisabled)("aria-selected", ctx_r1.nzSelectedIndex === $index_r6 && !ctx_r1.nzHideAll)("aria-controls", ctx_r1.getTabContentId($index_r6));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", tab_r5.label)("nzStringTemplateOutletContext", \u0275\u0275pureFunction0(19, _c9));
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r5.nzClosable && ctx_r1.closable && !tab_r5.nzDisabled ? 3 : -1);
  }
}
function NzTabsComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-tabs-nav", 4);
    \u0275\u0275listener("tabScroll", function NzTabsComponent_Conditional_0_Template_nz_tabs_nav_tabScroll_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nzTabListScroll.emit($event));
    })("selectFocusedIndex", function NzTabsComponent_Conditional_0_Template_nz_tabs_nav_selectFocusedIndex_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setSelectedIndex($event));
    })("addClicked", function NzTabsComponent_Conditional_0_Template_nz_tabs_nav_addClicked_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAdd());
    });
    \u0275\u0275repeaterCreate(1, NzTabsComponent_Conditional_0_For_2_Template, 4, 20, "div", 5, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r1.nzTabBarStyle);
    \u0275\u0275property("selectedIndex", ctx_r1.nzSelectedIndex || 0)("inkBarAnimated", ctx_r1.inkBarAnimated)("addable", ctx_r1.addable)("addIcon", ctx_r1.nzAddIcon)("hideBar", ctx_r1.nzHideAll)("position", ctx_r1.position)("extraTemplate", ctx_r1.nzTabBarExtraContent)("extraContents", ctx_r1.extraContents())("indicator", ctx_r1.nzIndicator());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.tabs);
  }
}
function NzTabsComponent_Conditional_3_For_1_Conditional_0_ng_template_0_Template(rf, ctx) {
}
function NzTabsComponent_Conditional_3_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTabsComponent_Conditional_3_For_1_Conditional_0_ng_template_0_Template, 0, 0, "ng-template", 11);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const tabpaneTmpl_r8 = \u0275\u0275reference(4);
    \u0275\u0275property("ngTemplateOutlet", tabpaneTmpl_r8);
  }
}
function NzTabsComponent_Conditional_3_For_1_Conditional_1_Conditional_0_ng_template_0_Template(rf, ctx) {
}
function NzTabsComponent_Conditional_3_For_1_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTabsComponent_Conditional_3_For_1_Conditional_1_Conditional_0_ng_template_0_Template, 0, 0, "ng-template", 11);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const tabpaneTmpl_r8 = \u0275\u0275reference(4);
    \u0275\u0275property("ngTemplateOutlet", tabpaneTmpl_r8);
  }
}
function NzTabsComponent_Conditional_3_For_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTabsComponent_Conditional_3_For_1_Conditional_1_Conditional_0_Template, 1, 1, null, 11);
  }
  if (rf & 2) {
    const $index_r9 = \u0275\u0275nextContext().$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.nzSelectedIndex === $index_r9 ? 0 : -1);
  }
}
function NzTabsComponent_Conditional_3_For_1_Conditional_2_Conditional_0_ng_template_0_Template(rf, ctx) {
}
function NzTabsComponent_Conditional_3_For_1_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTabsComponent_Conditional_3_For_1_Conditional_2_Conditional_0_ng_template_0_Template, 0, 0, "ng-template", 11);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const tabpaneTmpl_r8 = \u0275\u0275reference(4);
    \u0275\u0275property("ngTemplateOutlet", tabpaneTmpl_r8);
  }
}
function NzTabsComponent_Conditional_3_For_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTabsComponent_Conditional_3_For_1_Conditional_2_Conditional_0_Template, 1, 1, null, 11);
  }
  if (rf & 2) {
    const ctx_r9 = \u0275\u0275nextContext();
    const tab_r11 = ctx_r9.$implicit;
    const $index_r9 = ctx_r9.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.nzSelectedIndex === $index_r9 || tab_r11.hasBeenActive ? 0 : -1);
  }
}
function NzTabsComponent_Conditional_3_For_1_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 12);
  }
  if (rf & 2) {
    const ctx_r9 = \u0275\u0275nextContext();
    const tab_r11 = ctx_r9.$implicit;
    const $index_r9 = ctx_r9.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("id", ctx_r1.getTabContentId($index_r9))("active", ctx_r1.nzSelectedIndex === $index_r9)("content", tab_r11.content)("animated", ctx_r1.tabPaneAnimated);
    \u0275\u0275attribute("aria-labelledby", ctx_r1.getTabContentId($index_r9));
  }
}
function NzTabsComponent_Conditional_3_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTabsComponent_Conditional_3_For_1_Conditional_0_Template, 1, 1, null, 11)(1, NzTabsComponent_Conditional_3_For_1_Conditional_1_Template, 1, 1)(2, NzTabsComponent_Conditional_3_For_1_Conditional_2_Template, 1, 1);
    \u0275\u0275template(3, NzTabsComponent_Conditional_3_For_1_ng_template_3_Template, 1, 5, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    const tab_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(tab_r11.nzForceRender ? 0 : ctx_r1.nzDestroyInactiveTabPane ? 1 : 2);
  }
}
function NzTabsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, NzTabsComponent_Conditional_3_For_1_Template, 5, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.tabs);
  }
}
var NzTabChangeEvent = class {
  constructor() {
    __publicField(this, "index");
    __publicField(this, "tab");
  }
};
var _NzTabAddButtonComponent = class _NzTabAddButtonComponent {
  constructor() {
    __publicField(this, "addIcon", "plus");
    __publicField(this, "element", inject(ElementRef).nativeElement);
  }
  getElementWidth() {
    var _a;
    return ((_a = this.element) == null ? void 0 : _a.offsetWidth) || 0;
  }
  getElementHeight() {
    var _a;
    return ((_a = this.element) == null ? void 0 : _a.offsetHeight) || 0;
  }
};
__publicField(_NzTabAddButtonComponent, "\u0275fac", function NzTabAddButtonComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabAddButtonComponent)();
});
__publicField(_NzTabAddButtonComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTabAddButtonComponent,
  selectors: [["nz-tab-add-button"], ["button", "nz-tab-add-button", ""]],
  hostAttrs: ["aria-label", "Add tab", "type", "button", 1, "ant-tabs-nav-add"],
  inputs: {
    addIcon: "addIcon"
  },
  decls: 1,
  vars: 1,
  consts: [[4, "nzStringTemplateOutlet"], ["nzTheme", "outline", 3, "nzType"]],
  template: function NzTabAddButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzTabAddButtonComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("nzStringTemplateOutlet", ctx.addIcon);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective, NzIconModule, NzIconDirective],
  encapsulation: 2
}));
var NzTabAddButtonComponent = _NzTabAddButtonComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabAddButtonComponent, [{
    type: Component,
    args: [{
      selector: "nz-tab-add-button, button[nz-tab-add-button]",
      template: `
    <ng-container *nzStringTemplateOutlet="addIcon; let icon">
      <nz-icon [nzType]="icon" nzTheme="outline" />
    </ng-container>
  `,
      host: {
        class: "ant-tabs-nav-add",
        "aria-label": "Add tab",
        type: "button"
      },
      imports: [NzOutletModule, NzIconModule]
    }]
  }], null, {
    addIcon: [{
      type: Input
    }]
  });
})();
var _NzTabBarExtraContentDirective = class _NzTabBarExtraContentDirective {
  constructor() {
    __publicField(this, "position", input("end", __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "position"
    } : {}), {
      alias: "nzTabBarExtraContent"
    })));
    __publicField(this, "templateRef", inject(TemplateRef));
  }
};
__publicField(_NzTabBarExtraContentDirective, "\u0275fac", function NzTabBarExtraContentDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabBarExtraContentDirective)();
});
__publicField(_NzTabBarExtraContentDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTabBarExtraContentDirective,
  selectors: [["", "nzTabBarExtraContent", "", 5, "nz-tabs"]],
  inputs: {
    position: [1, "nzTabBarExtraContent", "position"]
  }
}));
var NzTabBarExtraContentDirective = _NzTabBarExtraContentDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabBarExtraContentDirective, [{
    type: Directive,
    args: [{
      selector: "[nzTabBarExtraContent]:not(nz-tabs)"
    }]
  }], null, {
    position: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzTabBarExtraContent",
        required: false
      }]
    }]
  });
})();
var CLASS_NAME = "ant-tabs-tabpane";
var ANIMATION_PREFIX = "ant-tabs-switch";
var ANIMATION_CLASS_MAP = {
  "enter-start": [generateClassName(ANIMATION_PREFIX, "enter"), generateClassName(ANIMATION_PREFIX, "enter-start")],
  "enter-active": [generateClassName(ANIMATION_PREFIX, "enter"), generateClassName(ANIMATION_PREFIX, "enter-active")],
  "leave-start": [generateClassName(ANIMATION_PREFIX, "leave"), generateClassName(ANIMATION_PREFIX, "leave-start")],
  "leave-active": [generateClassName(ANIMATION_PREFIX, "leave"), generateClassName(ANIMATION_PREFIX, "leave-active")],
  // If animation is enabled, we should hide the tabpane after the leave animation is done
  hidden: [generateClassName(CLASS_NAME, "hidden")],
  void: []
};
var _NzTabBodyComponent = class _NzTabBodyComponent {
  constructor() {
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "content", input(null, ...ngDevMode ? [{
      debugName: "content"
    }] : []));
    __publicField(this, "active", input(false, ...ngDevMode ? [{
      debugName: "active"
    }] : []));
    __publicField(this, "animated", input(true, ...ngDevMode ? [{
      debugName: "animated"
    }] : []));
    __publicField(this, "_animationState", signal("void", ...ngDevMode ? [{
      debugName: "_animationState"
    }] : []));
    __publicField(this, "_animationEnabled", isAnimationEnabled(() => this.animated()));
    __publicField(this, "class", computed(() => {
      const cls = [CLASS_NAME];
      if (this._animationEnabled()) {
        cls.push(...ANIMATION_CLASS_MAP[this._animationState()]);
      } else if (!this.active()) {
        cls.push(generateClassName(CLASS_NAME, "hidden"));
      }
      return cls;
    }, ...ngDevMode ? [{
      debugName: "class"
    }] : []));
    effect(() => {
      if (!this._animationEnabled()) {
        return;
      }
      if (!this.active()) {
        untracked(() => this._animationState.set("leave-start"));
        requestAnimationFrame(() => {
          this._animationState.set("leave-active");
        });
      } else {
        untracked(() => this._animationState.set("enter-start"));
        requestAnimationFrame(() => {
          this._animationState.set("enter-active");
        });
      }
    });
  }
  _onTransitionEnd(event) {
    if (event.target !== this.elementRef.nativeElement) {
      return;
    }
    const currentState = this._animationState();
    if (currentState === "enter-active") {
      this._animationState.set("void");
    } else if (currentState === "leave-active") {
      this._animationState.set("hidden");
    }
  }
};
__publicField(_NzTabBodyComponent, "\u0275fac", function NzTabBodyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabBodyComponent)();
});
__publicField(_NzTabBodyComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTabBodyComponent,
  selectors: [["", "nz-tab-body", ""]],
  hostVars: 6,
  hostBindings: function NzTabBodyComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("transitionend", function NzTabBodyComponent_transitionend_HostBindingHandler($event) {
        return ctx._onTransitionEnd($event);
      });
    }
    if (rf & 2) {
      \u0275\u0275attribute("tabindex", ctx.active() ? 0 : -1)("aria-hidden", !ctx.active());
      \u0275\u0275classMap(ctx.class());
      \u0275\u0275classProp("ant-tabs-tabpane-active", ctx.active());
    }
  },
  inputs: {
    content: [1, "content"],
    active: [1, "active"],
    animated: [1, "animated"]
  },
  exportAs: ["nzTabBody"],
  attrs: _c04,
  decls: 1,
  vars: 1,
  consts: [[3, "ngTemplateOutlet"]],
  template: function NzTabBodyComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzTabBodyComponent_ng_template_0_Template, 0, 0, "ng-template", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngTemplateOutlet", ctx.content());
    }
  },
  dependencies: [NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTabBodyComponent = _NzTabBodyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabBodyComponent, [{
    type: Component,
    args: [{
      selector: "[nz-tab-body]",
      exportAs: "nzTabBody",
      imports: [NgTemplateOutlet],
      template: `<ng-template [ngTemplateOutlet]="content()" />`,
      host: {
        "[class]": "class()",
        "[class.ant-tabs-tabpane-active]": "active()",
        "[attr.tabindex]": "active() ? 0 : -1",
        "[attr.aria-hidden]": "!active()",
        "(transitionend)": "_onTransitionEnd($event)"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], () => [], {
    content: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "content",
        required: false
      }]
    }],
    active: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "active",
        required: false
      }]
    }],
    animated: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "animated",
        required: false
      }]
    }]
  });
})();
var _NzTabCloseButtonComponent = class _NzTabCloseButtonComponent {
  constructor() {
    __publicField(this, "closeIcon", "close");
  }
};
__publicField(_NzTabCloseButtonComponent, "\u0275fac", function NzTabCloseButtonComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabCloseButtonComponent)();
});
__publicField(_NzTabCloseButtonComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTabCloseButtonComponent,
  selectors: [["nz-tab-close-button"], ["button", "nz-tab-close-button", ""]],
  hostAttrs: ["aria-label", "Close tab", "type", "button", 1, "ant-tabs-tab-remove"],
  inputs: {
    closeIcon: "closeIcon"
  },
  decls: 1,
  vars: 1,
  consts: [[4, "nzStringTemplateOutlet"], ["nzTheme", "outline", 3, "nzType"]],
  template: function NzTabCloseButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzTabCloseButtonComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("nzStringTemplateOutlet", ctx.closeIcon);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective, NzIconModule, NzIconDirective],
  encapsulation: 2
}));
var NzTabCloseButtonComponent = _NzTabCloseButtonComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabCloseButtonComponent, [{
    type: Component,
    args: [{
      selector: "nz-tab-close-button, button[nz-tab-close-button]",
      template: `
    <ng-container *nzStringTemplateOutlet="closeIcon; let icon">
      <nz-icon [nzType]="icon" nzTheme="outline" />
    </ng-container>
  `,
      host: {
        class: "ant-tabs-tab-remove",
        "aria-label": "Close tab",
        type: "button"
      },
      imports: [NzOutletModule, NzIconModule]
    }]
  }], null, {
    closeIcon: [{
      type: Input
    }]
  });
})();
var _NzTabLinkTemplateDirective = class _NzTabLinkTemplateDirective {
  constructor() {
    __publicField(this, "templateRef", inject(TemplateRef, {
      host: true
    }));
  }
};
__publicField(_NzTabLinkTemplateDirective, "\u0275fac", function NzTabLinkTemplateDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabLinkTemplateDirective)();
});
__publicField(_NzTabLinkTemplateDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTabLinkTemplateDirective,
  selectors: [["ng-template", "nzTabLink", ""]],
  exportAs: ["nzTabLinkTemplate"]
}));
var NzTabLinkTemplateDirective = _NzTabLinkTemplateDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabLinkTemplateDirective, [{
    type: Directive,
    args: [{
      selector: "ng-template[nzTabLink]",
      exportAs: "nzTabLinkTemplate"
    }]
  }], null, null);
})();
var _NzTabLinkDirective = class _NzTabLinkDirective {
  constructor() {
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "routerLink", inject(RouterLink, {
      self: true,
      optional: true
    }));
  }
};
__publicField(_NzTabLinkDirective, "\u0275fac", function NzTabLinkDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabLinkDirective)();
});
__publicField(_NzTabLinkDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTabLinkDirective,
  selectors: [["a", "nz-tab-link", ""]],
  exportAs: ["nzTabLink"]
}));
var NzTabLinkDirective = _NzTabLinkDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabLinkDirective, [{
    type: Directive,
    args: [{
      selector: "a[nz-tab-link]",
      exportAs: "nzTabLink"
    }]
  }], null, null);
})();
var _NzTabNavItemDirective = class _NzTabNavItemDirective {
  constructor() {
    __publicField(this, "disabled", false);
    __publicField(this, "tab");
    __publicField(this, "active", false);
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "el", this.elementRef.nativeElement);
    __publicField(this, "parentElement", this.el.parentElement);
  }
  focus() {
    this.el.focus({
      preventScroll: true
    });
  }
  get width() {
    return this.parentElement.offsetWidth;
  }
  get height() {
    return this.parentElement.offsetHeight;
  }
  get left() {
    return this.parentElement.offsetLeft;
  }
  get top() {
    return this.parentElement.offsetTop;
  }
};
__publicField(_NzTabNavItemDirective, "\u0275fac", function NzTabNavItemDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabNavItemDirective)();
});
__publicField(_NzTabNavItemDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTabNavItemDirective,
  selectors: [["", "nzTabNavItem", ""]],
  inputs: {
    disabled: [2, "disabled", "disabled", booleanAttribute],
    tab: "tab",
    active: [2, "active", "active", booleanAttribute]
  }
}));
var NzTabNavItemDirective = _NzTabNavItemDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabNavItemDirective, [{
    type: Directive,
    args: [{
      selector: "[nzTabNavItem]"
    }]
  }], null, {
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tab: [{
      type: Input
    }],
    active: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzTabNavOperationComponent = class _NzTabNavOperationComponent {
  constructor() {
    __publicField(this, "items", []);
    __publicField(this, "addable", false);
    __publicField(this, "addIcon", "plus");
    __publicField(this, "addClicked", new EventEmitter());
    __publicField(this, "selected", new EventEmitter());
    __publicField(this, "closeAnimationWaitTimeoutId");
    __publicField(this, "menuOpened", false);
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "element", inject(ElementRef).nativeElement);
  }
  onSelect(item) {
    if (!item.disabled) {
      item.tab.nzClick.emit();
      this.selected.emit(item);
    }
  }
  onContextmenu(item, e) {
    if (!item.disabled) {
      item.tab.nzContextmenu.emit(e);
    }
  }
  showItems() {
    clearTimeout(this.closeAnimationWaitTimeoutId);
    this.menuOpened = true;
    this.cdr.markForCheck();
  }
  menuVisChange(visible) {
    if (!visible) {
      this.closeAnimationWaitTimeoutId = setTimeout(() => {
        this.menuOpened = false;
        this.cdr.markForCheck();
      }, 150);
    }
  }
  getElementWidth() {
    var _a;
    return ((_a = this.element) == null ? void 0 : _a.offsetWidth) || 0;
  }
  getElementHeight() {
    var _a;
    return ((_a = this.element) == null ? void 0 : _a.offsetHeight) || 0;
  }
  ngOnDestroy() {
    clearTimeout(this.closeAnimationWaitTimeoutId);
  }
};
__publicField(_NzTabNavOperationComponent, "\u0275fac", function NzTabNavOperationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabNavOperationComponent)();
});
__publicField(_NzTabNavOperationComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTabNavOperationComponent,
  selectors: [["nz-tab-nav-operation"]],
  hostAttrs: [1, "ant-tabs-nav-operations"],
  hostVars: 2,
  hostBindings: function NzTabNavOperationComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-tabs-nav-operations-hidden", ctx.items.length === 0);
    }
  },
  inputs: {
    items: "items",
    addable: [2, "addable", "addable", booleanAttribute],
    addIcon: "addIcon"
  },
  outputs: {
    addClicked: "addClicked",
    selected: "selected"
  },
  exportAs: ["nzTabNavOperation"],
  decls: 7,
  vars: 6,
  consts: [["dropdownTrigger", "nzDropdown"], ["menu", "nzDropdownMenu"], ["nz-dropdown", "", "type", "button", "tabindex", "-1", "aria-hidden", "true", "nzOverlayClassName", "nz-tabs-dropdown", 1, "ant-tabs-nav-more", 3, "nzVisibleChange", "mouseenter", "nzDropdownMenu", "nzOverlayStyle", "nzMatchWidthElement"], ["nzType", "ellipsis"], ["nz-menu", ""], ["nz-tab-add-button", "", 3, "addIcon"], ["nz-menu-item", "", 1, "ant-tabs-dropdown-menu-item", 3, "ant-tabs-dropdown-menu-item-disabled", "nzSelected", "nzDisabled"], ["nz-menu-item", "", 1, "ant-tabs-dropdown-menu-item", 3, "click", "contextmenu", "nzSelected", "nzDisabled"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], ["nz-tab-add-button", "", 3, "click", "addIcon"]],
  template: function NzTabNavOperationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "button", 2, 0);
      \u0275\u0275listener("nzVisibleChange", function NzTabNavOperationComponent_Template_button_nzVisibleChange_0_listener($event) {
        return ctx.menuVisChange($event);
      })("mouseenter", function NzTabNavOperationComponent_Template_button_mouseenter_0_listener() {
        return ctx.showItems();
      });
      \u0275\u0275element(2, "nz-icon", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "nz-dropdown-menu", null, 1);
      \u0275\u0275conditionalCreate(5, NzTabNavOperationComponent_Conditional_5_Template, 3, 0, "ul", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, NzTabNavOperationComponent_Conditional_6_Template, 1, 1, "button", 5);
    }
    if (rf & 2) {
      const menu_r5 = \u0275\u0275reference(4);
      \u0275\u0275property("nzDropdownMenu", menu_r5)("nzOverlayStyle", \u0275\u0275pureFunction0(5, _c14))("nzMatchWidthElement", null);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.menuOpened ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.addable ? 6 : -1);
    }
  },
  dependencies: [NzDropdownModule, NzMenuDirective, NzMenuItemComponent, NzDropdownDirective, NzDropdownMenuComponent, NzIconModule, NzIconDirective, NzOutletModule, NzStringTemplateOutletDirective, NzTabAddButtonComponent, NzMenuModule],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTabNavOperationComponent = _NzTabNavOperationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabNavOperationComponent, [{
    type: Component,
    args: [{
      selector: "nz-tab-nav-operation",
      exportAs: "nzTabNavOperation",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <button
      nz-dropdown
      class="ant-tabs-nav-more"
      type="button"
      tabindex="-1"
      aria-hidden="true"
      nzOverlayClassName="nz-tabs-dropdown"
      #dropdownTrigger="nzDropdown"
      [nzDropdownMenu]="menu"
      [nzOverlayStyle]="{ minWidth: '46px' }"
      [nzMatchWidthElement]="null"
      (nzVisibleChange)="menuVisChange($event)"
      (mouseenter)="showItems()"
    >
      <nz-icon nzType="ellipsis" />
    </button>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      @if (menuOpened) {
        <ul nz-menu>
          @for (item of items; track item) {
            <li
              nz-menu-item
              class="ant-tabs-dropdown-menu-item"
              [class.ant-tabs-dropdown-menu-item-disabled]="item.disabled"
              [nzSelected]="item.active"
              [nzDisabled]="item.disabled"
              (click)="onSelect(item)"
              (contextmenu)="onContextmenu(item, $event)"
            >
              <ng-container *nzStringTemplateOutlet="item.tab.label; context: { visible: false }">
                {{ item.tab.label }}
              </ng-container>
            </li>
          }
        </ul>
      }
    </nz-dropdown-menu>
    @if (addable) {
      <button nz-tab-add-button [addIcon]="addIcon" (click)="addClicked.emit()"></button>
    }
  `,
      host: {
        class: "ant-tabs-nav-operations",
        "[class.ant-tabs-nav-operations-hidden]": "items.length === 0"
      },
      imports: [NzDropdownModule, NzIconModule, NzOutletModule, NzTabAddButtonComponent, NzMenuModule]
    }]
  }], null, {
    items: [{
      type: Input
    }],
    addable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    addIcon: [{
      type: Input
    }],
    addClicked: [{
      type: Output
    }],
    selected: [{
      type: Output
    }]
  });
})();
var MIN_SWIPE_DISTANCE = 0.1;
var STOP_SWIPE_DISTANCE = 0.01;
var REFRESH_INTERVAL = 20;
var SPEED_OFF_MULTIPLE = 0.995 ** REFRESH_INTERVAL;
var _NzTabScrollListDirective = class _NzTabScrollListDirective {
  constructor() {
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "el", inject(ElementRef).nativeElement);
    __publicField(this, "lastWheelDirection", null);
    __publicField(this, "lastWheelTimestamp", 0);
    __publicField(this, "lastTimestamp", 0);
    __publicField(this, "lastTimeDiff", 0);
    __publicField(this, "lastMixedWheel", 0);
    __publicField(this, "lastWheelPrevent", false);
    __publicField(this, "touchPosition", null);
    __publicField(this, "lastOffset", null);
    __publicField(this, "motion", -1);
    __publicField(this, "offsetChange", new EventEmitter());
    __publicField(this, "tabScroll", new EventEmitter());
    __publicField(this, "onTouchEnd", (e) => {
      if (!this.touchPosition) {
        return;
      }
      const lastOffset = this.lastOffset;
      const lastTimeDiff = this.lastTimeDiff;
      this.lastOffset = this.touchPosition = null;
      if (lastOffset) {
        const distanceX = lastOffset.x / lastTimeDiff;
        const distanceY = lastOffset.y / lastTimeDiff;
        const absX = Math.abs(distanceX);
        const absY = Math.abs(distanceY);
        if (Math.max(absX, absY) < MIN_SWIPE_DISTANCE) {
          return;
        }
        let currentX = distanceX;
        let currentY = distanceY;
        this.motion = window.setInterval(() => {
          if (Math.abs(currentX) < STOP_SWIPE_DISTANCE && Math.abs(currentY) < STOP_SWIPE_DISTANCE) {
            window.clearInterval(this.motion);
            return;
          }
          currentX *= SPEED_OFF_MULTIPLE;
          currentY *= SPEED_OFF_MULTIPLE;
          this.onOffset(currentX * REFRESH_INTERVAL, currentY * REFRESH_INTERVAL, e);
        }, REFRESH_INTERVAL);
      }
    });
    __publicField(this, "onTouchMove", (e) => {
      if (!this.touchPosition) {
        return;
      }
      e.preventDefault();
      const {
        screenX,
        screenY
      } = e.touches[0];
      const offsetX = screenX - this.touchPosition.x;
      const offsetY = screenY - this.touchPosition.y;
      this.onOffset(offsetX, offsetY, e);
      const now = Date.now();
      this.lastTimeDiff = now - this.lastTimestamp;
      this.lastTimestamp = now;
      this.lastOffset = {
        x: offsetX,
        y: offsetY
      };
      this.touchPosition = {
        x: screenX,
        y: screenY
      };
    });
    __publicField(this, "onTouchStart", (e) => {
      const {
        screenX,
        screenY
      } = e.touches[0];
      this.touchPosition = {
        x: screenX,
        y: screenY
      };
      window.clearInterval(this.motion);
    });
    __publicField(this, "onWheel", (e) => {
      const {
        deltaX,
        deltaY
      } = e;
      let mixed;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      if (absX === absY) {
        mixed = this.lastWheelDirection === "x" ? deltaX : deltaY;
      } else if (absX > absY) {
        mixed = deltaX;
        this.lastWheelDirection = "x";
      } else {
        mixed = deltaY;
        this.lastWheelDirection = "y";
      }
      const now = Date.now();
      const absMixed = Math.abs(mixed);
      if (now - this.lastWheelTimestamp > 100 || absMixed - this.lastMixedWheel > 10) {
        this.lastWheelPrevent = false;
      }
      this.onOffset(-mixed, -mixed, e);
      if (e.defaultPrevented || this.lastWheelPrevent) {
        this.lastWheelPrevent = true;
      }
      this.lastWheelTimestamp = now;
      this.lastMixedWheel = absMixed;
    });
  }
  ngOnInit() {
    const wheel$ = fromEventOutsideAngular(this.el, "wheel");
    const touchstart$ = fromEventOutsideAngular(this.el, "touchstart");
    const touchmove$ = fromEventOutsideAngular(this.el, "touchmove");
    const touchend$ = fromEventOutsideAngular(this.el, "touchend");
    this.subscribeWrap("wheel", wheel$, this.onWheel);
    this.subscribeWrap("touchstart", touchstart$, this.onTouchStart);
    this.subscribeWrap("touchmove", touchmove$, this.onTouchMove);
    this.subscribeWrap("touchend", touchend$, this.onTouchEnd);
  }
  subscribeWrap(type, observable, handler) {
    return observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      this.tabScroll.emit({
        type,
        event
      });
      if (!event.defaultPrevented) {
        handler(event);
      }
    });
  }
  onOffset(x, y, event) {
    if (this.offsetChange.observers.length) {
      this.ngZone.run(() => {
        this.offsetChange.emit({
          x,
          y,
          event
        });
      });
    }
  }
};
__publicField(_NzTabScrollListDirective, "\u0275fac", function NzTabScrollListDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabScrollListDirective)();
});
__publicField(_NzTabScrollListDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTabScrollListDirective,
  selectors: [["", "nzTabScrollList", ""]],
  outputs: {
    offsetChange: "offsetChange",
    tabScroll: "tabScroll"
  }
}));
var NzTabScrollListDirective = _NzTabScrollListDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabScrollListDirective, [{
    type: Directive,
    args: [{
      selector: "[nzTabScrollList]"
    }]
  }], null, {
    offsetChange: [{
      type: Output
    }],
    tabScroll: [{
      type: Output
    }]
  });
})();
var _NzTabsInkBarDirective = class _NzTabsInkBarDirective {
  constructor() {
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "el", inject(ElementRef).nativeElement);
    __publicField(this, "directionality", inject(Directionality).valueSignal);
    __publicField(this, "position", input("horizontal", ...ngDevMode ? [{
      debugName: "position"
    }] : []));
    __publicField(this, "animated", input(true, ...ngDevMode ? [{
      debugName: "animated"
    }] : []));
    __publicField(this, "indicator", input(...ngDevMode ? [void 0, {
      debugName: "indicator"
    }] : []));
    __publicField(this, "animationEnabled", isAnimationEnabled(() => this.animated()));
  }
  alignToElement(element) {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.setStyles(element));
    });
  }
  setStyles(element) {
    var _a, _b, _c, _d;
    const {
      size,
      align
    } = this.indicator() || {};
    if (this.position() === "horizontal") {
      this.el.style.top = "";
      this.el.style.height = "";
      this.el.style.width = coerceCssPixelValue(size ? typeof size === "number" ? size : size((_a = element == null ? void 0 : element.offsetWidth) != null ? _a : 0) : (_b = element == null ? void 0 : element.offsetWidth) != null ? _b : 0);
      this.el.style.left = this.setIndicatorPosition(element, align);
    } else {
      this.el.style.left = "";
      this.el.style.width = "";
      this.el.style.height = coerceCssPixelValue(!isNil(size) ? typeof size === "number" ? size : size((_c = element == null ? void 0 : element.offsetHeight) != null ? _c : 0) : (_d = element == null ? void 0 : element.offsetHeight) != null ? _d : 0);
      this.el.style.top = this.setIndicatorPosition(element, align);
    }
  }
  setIndicatorPosition(element, align = "start") {
    var _a, _b, _c, _d;
    const isHorizontal = this.position() === "horizontal";
    const itemOffset = isHorizontal ? (_a = element == null ? void 0 : element.offsetLeft) != null ? _a : 0 : (_b = element == null ? void 0 : element.offsetTop) != null ? _b : 0;
    const itemSize = isHorizontal ? (_c = element == null ? void 0 : element.offsetWidth) != null ? _c : 0 : (_d = element == null ? void 0 : element.offsetHeight) != null ? _d : 0;
    const indicatorSize = isHorizontal ? this.el.offsetWidth : this.el.offsetHeight;
    const isRtl = isHorizontal && this.directionality() === "rtl";
    const resolvedAlign = isRtl && align !== "center" ? align === "start" ? "end" : "start" : align;
    switch (resolvedAlign) {
      case "start":
        return coerceCssPixelValue(itemOffset);
      case "end":
        return coerceCssPixelValue(itemOffset + itemSize - (indicatorSize || 0));
      case "center":
        return coerceCssPixelValue(itemOffset + (itemSize - (indicatorSize || 0)) / 2);
    }
  }
};
__publicField(_NzTabsInkBarDirective, "\u0275fac", function NzTabsInkBarDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabsInkBarDirective)();
});
__publicField(_NzTabsInkBarDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTabsInkBarDirective,
  selectors: [["nz-tabs-ink-bar"], ["", "nz-tabs-ink-bar", ""]],
  hostAttrs: [1, "ant-tabs-ink-bar"],
  hostVars: 2,
  hostBindings: function NzTabsInkBarDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-tabs-ink-bar-animated", ctx.animationEnabled());
    }
  },
  inputs: {
    position: [1, "position"],
    animated: [1, "animated"],
    indicator: [1, "indicator"]
  }
}));
var NzTabsInkBarDirective = _NzTabsInkBarDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabsInkBarDirective, [{
    type: Directive,
    args: [{
      selector: "nz-tabs-ink-bar, [nz-tabs-ink-bar]",
      host: {
        class: "ant-tabs-ink-bar",
        "[class.ant-tabs-ink-bar-animated]": "animationEnabled()"
      }
    }]
  }], null, {
    position: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "position",
        required: false
      }]
    }],
    animated: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "animated",
        required: false
      }]
    }],
    indicator: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "indicator",
        required: false
      }]
    }]
  });
})();
var RESIZE_SCHEDULER = typeof requestAnimationFrame !== "undefined" ? animationFrameScheduler : asapScheduler;
var CSS_TRANSFORM_TIME = 150;
var _NzTabNavBarComponent = class _NzTabNavBarComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "viewportRuler", inject(ViewportRuler));
    __publicField(this, "nzResizeObserver", inject(NzResizeObserver));
    __publicField(this, "dir", inject(Directionality));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "indexFocused", new EventEmitter());
    __publicField(this, "selectFocusedIndex", new EventEmitter());
    __publicField(this, "addClicked", new EventEmitter());
    __publicField(this, "tabScroll", new EventEmitter());
    __publicField(this, "position", "horizontal");
    __publicField(this, "addable", false);
    __publicField(this, "hideBar", false);
    __publicField(this, "addIcon", "plus");
    __publicField(this, "inkBarAnimated", true);
    __publicField(this, "extraTemplate");
    __publicField(this, "extraContents", input.required(...ngDevMode ? [{
      debugName: "extraContents"
    }] : []));
    __publicField(this, "indicator", input(...ngDevMode ? [void 0, {
      debugName: "indicator"
    }] : []));
    __publicField(this, "startExtraContent", computed(() => this.extraContents().find((item) => item.position() === "start"), ...ngDevMode ? [{
      debugName: "startExtraContent"
    }] : []));
    __publicField(this, "endExtraContent", computed(() => this.extraContents().find((item) => item.position() === "end"), ...ngDevMode ? [{
      debugName: "endExtraContent"
    }] : []));
    __publicField(this, "navWrapRef");
    __publicField(this, "navListRef");
    __publicField(this, "operationRef");
    __publicField(this, "addBtnRef");
    __publicField(this, "inkBar");
    __publicField(this, "items");
    __publicField(this, "translate", null);
    __publicField(this, "transformX", 0);
    __publicField(this, "transformY", 0);
    __publicField(this, "pingLeft", false);
    __publicField(this, "pingRight", false);
    __publicField(this, "pingTop", false);
    __publicField(this, "pingBottom", false);
    __publicField(this, "hiddenItems", []);
    __publicField(this, "keyManager");
    __publicField(this, "_selectedIndex", 0);
    __publicField(this, "wrapperWidth", 0);
    __publicField(this, "wrapperHeight", 0);
    __publicField(this, "scrollListWidth", 0);
    __publicField(this, "scrollListHeight", 0);
    __publicField(this, "operationWidth", 0);
    __publicField(this, "operationHeight", 0);
    __publicField(this, "addButtonWidth", 0);
    __publicField(this, "addButtonHeight", 0);
    __publicField(this, "selectedIndexChanged", false);
    __publicField(this, "lockAnimationTimeoutId");
    __publicField(this, "cssTransformTimeWaitingId");
    this.destroyRef.onDestroy(() => {
      clearTimeout(this.lockAnimationTimeoutId);
      clearTimeout(this.cssTransformTimeWaitingId);
    });
  }
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(value) {
    const newValue = coerceNumberProperty(value);
    if (this._selectedIndex !== newValue) {
      this._selectedIndex = value;
      this.selectedIndexChanged = true;
      if (this.keyManager) {
        this.keyManager.updateActiveItem(value);
      }
    }
  }
  /** Tracks which element has focus; used for keyboard navigation */
  get focusIndex() {
    return this.keyManager ? this.keyManager.activeItemIndex : 0;
  }
  /** When the focus index is set, we must manually send focus to the correct label */
  set focusIndex(value) {
    if (!this.isValidIndex(value) || this.focusIndex === value || !this.keyManager) {
      return;
    }
    this.keyManager.setActiveItem(value);
  }
  get showAddButton() {
    return this.hiddenItems.length === 0 && this.addable;
  }
  ngAfterViewInit() {
    const dirChange = this.dir ? this.dir.change.asObservable() : of(null);
    const resize = this.viewportRuler.change(150);
    const realign = () => {
      this.updateScrollListPosition();
      this.alignInkBarToSelectedTab();
    };
    this.keyManager = new FocusKeyManager(this.items).withHorizontalOrientation(this.getLayoutDirection()).withWrap();
    this.keyManager.updateActiveItem(this.selectedIndex);
    requestAnimationFrame(realign);
    merge(this.nzResizeObserver.observe(this.navWrapRef), this.nzResizeObserver.observe(this.navListRef)).pipe(takeUntilDestroyed(this.destroyRef), auditTime(16, RESIZE_SCHEDULER)).subscribe(() => {
      realign();
    });
    merge(dirChange, resize, this.items.changes).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      Promise.resolve().then(realign);
      this.keyManager.withHorizontalOrientation(this.getLayoutDirection());
    });
    this.keyManager.change.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((newFocusIndex) => {
      this.indexFocused.emit(newFocusIndex);
      this.scrollToTab(this.keyManager.activeItem);
    });
  }
  ngAfterContentChecked() {
    if (this.selectedIndexChanged) {
      this.updateScrollListPosition();
      this.alignInkBarToSelectedTab();
      this.selectedIndexChanged = false;
      this.cdr.markForCheck();
    }
  }
  onSelectedFromMenu(tab) {
    const tabIndex = this.items.toArray().findIndex((e) => e === tab);
    if (tabIndex !== -1) {
      this.keyManager.updateActiveItem(tabIndex);
      if (this.focusIndex !== this.selectedIndex) {
        this.selectFocusedIndex.emit(this.focusIndex);
        this.scrollToTab(tab);
      }
    }
  }
  onOffsetChange(e) {
    if (this.position === "horizontal") {
      if (!this.lockAnimationTimeoutId) {
        if (this.transformX >= 0 && e.x > 0) {
          return;
        }
        if (this.transformX <= this.wrapperWidth - this.scrollListWidth && e.x < 0) {
          return;
        }
      }
      e.event.preventDefault();
      this.transformX = this.clampTransformX(this.transformX + e.x);
      this.setTransform(this.transformX, 0);
    } else {
      if (!this.lockAnimationTimeoutId) {
        if (this.transformY >= 0 && e.y > 0) {
          return;
        }
        if (this.transformY <= this.wrapperHeight - this.scrollListHeight && e.y < 0) {
          return;
        }
      }
      e.event.preventDefault();
      this.transformY = this.clampTransformY(this.transformY + e.y);
      this.setTransform(0, this.transformY);
    }
    this.lockAnimation();
    this.setVisibleRange();
    this.setPingStatus();
  }
  handleKeydown(event) {
    const inNavigationList = this.navWrapRef.nativeElement.contains(event.target);
    if (hasModifierKey(event) || !inNavigationList) {
      return;
    }
    switch (event.keyCode) {
      case LEFT_ARROW:
      case UP_ARROW:
      case RIGHT_ARROW:
      case DOWN_ARROW:
        this.lockAnimation();
        this.keyManager.onKeydown(event);
        break;
      case ENTER:
      case SPACE:
        if (this.focusIndex !== this.selectedIndex) {
          this.selectFocusedIndex.emit(this.focusIndex);
        }
        break;
      default:
        this.keyManager.onKeydown(event);
    }
  }
  isValidIndex(index) {
    if (!this.items) {
      return true;
    }
    const tab = this.items ? this.items.toArray()[index] : null;
    return !!tab && !tab.disabled;
  }
  scrollToTab(tab) {
    if (!this.items.find((e) => e === tab)) {
      return;
    }
    const tabs = this.items.toArray();
    if (this.position === "horizontal") {
      let newTransform = this.transformX;
      if (this.getLayoutDirection() === "rtl") {
        const right = tabs[0].left + tabs[0].width - tab.left - tab.width;
        if (right < this.transformX) {
          newTransform = right;
        } else if (right + tab.width > this.transformX + this.wrapperWidth) {
          newTransform = right + tab.width - this.wrapperWidth;
        }
      } else if (tab.left < -this.transformX) {
        newTransform = -tab.left;
      } else if (tab.left + tab.width > -this.transformX + this.wrapperWidth) {
        newTransform = -(tab.left + tab.width - this.wrapperWidth);
      }
      this.transformX = newTransform;
      this.transformY = 0;
      this.setTransform(newTransform, 0);
    } else {
      let newTransform = this.transformY;
      if (tab.top < -this.transformY) {
        newTransform = -tab.top;
      } else if (tab.top + tab.height > -this.transformY + this.wrapperHeight) {
        newTransform = -(tab.top + tab.height - this.wrapperHeight);
      }
      this.transformY = newTransform;
      this.transformX = 0;
      this.setTransform(0, newTransform);
    }
    clearTimeout(this.cssTransformTimeWaitingId);
    this.cssTransformTimeWaitingId = setTimeout(() => {
      this.setVisibleRange();
    }, CSS_TRANSFORM_TIME);
  }
  lockAnimation() {
    if (!this.lockAnimationTimeoutId) {
      this.ngZone.runOutsideAngular(() => {
        this.navListRef.nativeElement.style.transition = "none";
        this.lockAnimationTimeoutId = setTimeout(() => {
          this.navListRef.nativeElement.style.transition = "";
          this.lockAnimationTimeoutId = void 0;
        }, CSS_TRANSFORM_TIME);
      });
    }
  }
  setTransform(x, y) {
    this.navListRef.nativeElement.style.transform = `translate(${x}px, ${y}px)`;
  }
  clampTransformX(transform) {
    const scrollWidth = this.wrapperWidth - this.scrollListWidth;
    if (this.getLayoutDirection() === "rtl") {
      return Math.max(Math.min(scrollWidth, transform), 0);
    } else {
      return Math.min(Math.max(scrollWidth, transform), 0);
    }
  }
  clampTransformY(transform) {
    return Math.min(Math.max(this.wrapperHeight - this.scrollListHeight, transform), 0);
  }
  updateScrollListPosition() {
    this.resetSizes();
    this.transformX = this.clampTransformX(this.transformX);
    this.transformY = this.clampTransformY(this.transformY);
    this.setVisibleRange();
    this.setPingStatus();
    if (this.keyManager) {
      this.keyManager.updateActiveItem(this.keyManager.activeItemIndex);
      if (this.keyManager.activeItem) {
        this.scrollToTab(this.keyManager.activeItem);
      }
    }
  }
  resetSizes() {
    this.addButtonWidth = this.addBtnRef ? this.addBtnRef.getElementWidth() : 0;
    this.addButtonHeight = this.addBtnRef ? this.addBtnRef.getElementHeight() : 0;
    this.operationWidth = this.operationRef.getElementWidth();
    this.operationHeight = this.operationRef.getElementHeight();
    this.wrapperWidth = this.navWrapRef.nativeElement.offsetWidth || 0;
    this.wrapperHeight = this.navWrapRef.nativeElement.offsetHeight || 0;
    this.scrollListHeight = this.navListRef.nativeElement.offsetHeight || 0;
    this.scrollListWidth = this.navListRef.nativeElement.offsetWidth || 0;
  }
  alignInkBarToSelectedTab() {
    const selectedItem = this.items && this.items.length ? this.items.toArray()[this.selectedIndex] : null;
    const selectedItemElement = selectedItem ? selectedItem.elementRef.nativeElement : null;
    if (selectedItemElement) {
      this.inkBar.alignToElement(selectedItemElement.parentElement);
    }
  }
  setPingStatus() {
    const ping = {
      top: false,
      right: false,
      bottom: false,
      left: false
    };
    const navWrap = this.navWrapRef.nativeElement;
    if (this.position === "horizontal") {
      if (this.getLayoutDirection() === "rtl") {
        ping.right = this.transformX > 0;
        ping.left = this.transformX + this.wrapperWidth < this.scrollListWidth;
      } else {
        ping.left = this.transformX < 0;
        ping.right = -this.transformX + this.wrapperWidth < this.scrollListWidth;
      }
    } else {
      ping.top = this.transformY < 0;
      ping.bottom = -this.transformY + this.wrapperHeight < this.scrollListHeight;
    }
    Object.keys(ping).forEach((pos) => {
      const className = `ant-tabs-nav-wrap-ping-${pos}`;
      if (ping[pos]) {
        navWrap.classList.add(className);
      } else {
        navWrap.classList.remove(className);
      }
    });
  }
  setVisibleRange() {
    let unit;
    let position;
    let transformSize;
    let basicSize;
    let tabContentSize;
    let addSize;
    const tabs = this.items.toArray();
    const DEFAULT_SIZE = {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      right: 0
    };
    const getOffset = (index) => {
      let offset;
      const size = tabs[index] || DEFAULT_SIZE;
      if (position === "right") {
        offset = tabs[0].left + tabs[0].width - tabs[index].left - tabs[index].width;
      } else {
        offset = size[position];
      }
      return offset;
    };
    if (this.position === "horizontal") {
      unit = "width";
      basicSize = this.wrapperWidth;
      tabContentSize = this.scrollListWidth - (this.hiddenItems.length ? this.operationWidth : 0);
      addSize = this.addButtonWidth;
      transformSize = Math.abs(this.transformX);
      if (this.getLayoutDirection() === "rtl") {
        position = "right";
        this.pingRight = this.transformX > 0;
        this.pingLeft = this.transformX + this.wrapperWidth < this.scrollListWidth;
      } else {
        this.pingLeft = this.transformX < 0;
        this.pingRight = -this.transformX + this.wrapperWidth < this.scrollListWidth;
        position = "left";
      }
    } else {
      unit = "height";
      basicSize = this.wrapperHeight;
      tabContentSize = this.scrollListHeight - (this.hiddenItems.length ? this.operationHeight : 0);
      addSize = this.addButtonHeight;
      position = "top";
      transformSize = -this.transformY;
      this.pingTop = this.transformY < 0;
      this.pingBottom = -this.transformY + this.wrapperHeight < this.scrollListHeight;
    }
    let mergedBasicSize = basicSize;
    if (tabContentSize + addSize > basicSize) {
      mergedBasicSize = basicSize - addSize;
    }
    if (!tabs.length) {
      this.hiddenItems = [];
      this.cdr.markForCheck();
      return;
    }
    const len = tabs.length;
    let endIndex = len;
    for (let i = 0; i < len; i += 1) {
      const offset = getOffset(i);
      const size = tabs[i] || DEFAULT_SIZE;
      if (offset + size[unit] > transformSize + mergedBasicSize) {
        endIndex = i - 1;
        break;
      }
    }
    let startIndex = 0;
    for (let i = len - 1; i >= 0; i -= 1) {
      const offset = getOffset(i);
      if (offset < transformSize) {
        startIndex = i + 1;
        break;
      }
    }
    const startHiddenTabs = tabs.slice(0, startIndex);
    const endHiddenTabs = tabs.slice(endIndex + 1);
    this.hiddenItems = [...startHiddenTabs, ...endHiddenTabs];
    this.cdr.markForCheck();
  }
  getLayoutDirection() {
    return this.dir && this.dir.value === "rtl" ? "rtl" : "ltr";
  }
  ngOnChanges(changes) {
    const {
      position,
      indicator
    } = changes;
    if (position && !position.isFirstChange()) {
      this.updateScrollListPosition();
    }
    if (position && !position.isFirstChange() || indicator && !indicator.isFirstChange()) {
      this.alignInkBarToSelectedTab();
      this.lockAnimation();
    }
  }
};
__publicField(_NzTabNavBarComponent, "\u0275fac", function NzTabNavBarComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabNavBarComponent)();
});
__publicField(_NzTabNavBarComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTabNavBarComponent,
  selectors: [["nz-tabs-nav"]],
  contentQueries: function NzTabNavBarComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzTabNavItemDirective, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.items = _t);
    }
  },
  viewQuery: function NzTabNavBarComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c3, 7)(_c4, 7)(NzTabNavOperationComponent, 7)(NzTabAddButtonComponent, 5)(NzTabsInkBarDirective, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.navWrapRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.navListRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.operationRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.addBtnRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.inkBar = _t.first);
    }
  },
  hostAttrs: [1, "ant-tabs-nav"],
  hostBindings: function NzTabNavBarComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown", function NzTabNavBarComponent_keydown_HostBindingHandler($event) {
        return ctx.handleKeydown($event);
      });
    }
  },
  inputs: {
    position: "position",
    addable: [2, "addable", "addable", booleanAttribute],
    hideBar: [2, "hideBar", "hideBar", booleanAttribute],
    addIcon: "addIcon",
    inkBarAnimated: "inkBarAnimated",
    extraTemplate: "extraTemplate",
    extraContents: [1, "extraContents"],
    indicator: [1, "indicator"],
    selectedIndex: "selectedIndex"
  },
  outputs: {
    indexFocused: "indexFocused",
    selectFocusedIndex: "selectFocusedIndex",
    addClicked: "addClicked",
    tabScroll: "tabScroll"
  },
  exportAs: ["nzTabsNav"],
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c5,
  decls: 11,
  vars: 18,
  consts: [["navWrap", ""], ["navList", ""], [1, "ant-tabs-extra-content"], [1, "ant-tabs-nav-wrap"], ["nzTabScrollList", "", "role", "tablist", 1, "ant-tabs-nav-list", 3, "offsetChange", "tabScroll"], ["role", "tab", "nz-tab-add-button", "", 3, "addIcon"], ["nz-tabs-ink-bar", "", 3, "hidden", "position", "animated", "indicator"], [3, "addClicked", "selected", "addIcon", "addable", "items"], [3, "ngTemplateOutlet"], ["role", "tab", "nz-tab-add-button", "", 3, "click", "addIcon"]],
  template: function NzTabNavBarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275conditionalCreate(0, NzTabNavBarComponent_Conditional_0_Template, 2, 1, "div", 2);
      \u0275\u0275elementStart(1, "div", 3, 0)(3, "div", 4, 1);
      \u0275\u0275listener("offsetChange", function NzTabNavBarComponent_Template_div_offsetChange_3_listener($event) {
        return ctx.onOffsetChange($event);
      })("tabScroll", function NzTabNavBarComponent_Template_div_tabScroll_3_listener($event) {
        return ctx.tabScroll.emit($event);
      });
      \u0275\u0275projection(5);
      \u0275\u0275conditionalCreate(6, NzTabNavBarComponent_Conditional_6_Template, 1, 2, "button", 5);
      \u0275\u0275element(7, "div", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "nz-tab-nav-operation", 7);
      \u0275\u0275listener("addClicked", function NzTabNavBarComponent_Template_nz_tab_nav_operation_addClicked_8_listener() {
        return ctx.addClicked.emit();
      })("selected", function NzTabNavBarComponent_Template_nz_tab_nav_operation_selected_8_listener($event) {
        return ctx.onSelectedFromMenu($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(9, NzTabNavBarComponent_Conditional_9_Template, 2, 1, "div", 2)(10, NzTabNavBarComponent_Conditional_10_Template, 2, 1, "div", 2);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.startExtraContent() ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("ant-tabs-nav-wrap-ping-left", ctx.pingLeft)("ant-tabs-nav-wrap-ping-right", ctx.pingRight)("ant-tabs-nav-wrap-ping-top", ctx.pingTop)("ant-tabs-nav-wrap-ping-bottom", ctx.pingBottom);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.showAddButton ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("hidden", ctx.hideBar)("position", ctx.position)("animated", ctx.inkBarAnimated)("indicator", ctx.indicator());
      \u0275\u0275advance();
      \u0275\u0275property("addIcon", ctx.addIcon)("addable", ctx.addable)("items", ctx.hiddenItems);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.endExtraContent() ? 9 : ctx.extraTemplate ? 10 : -1);
    }
  },
  dependencies: [NzTabScrollListDirective, NzTabAddButtonComponent, NzTabsInkBarDirective, NzTabNavOperationComponent, NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTabNavBarComponent = _NzTabNavBarComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabNavBarComponent, [{
    type: Component,
    args: [{
      selector: "nz-tabs-nav",
      exportAs: "nzTabsNav",
      imports: [NzTabScrollListDirective, NzTabAddButtonComponent, NzTabsInkBarDirective, NzTabNavOperationComponent, NgTemplateOutlet],
      template: `
    @if (startExtraContent()) {
      <div class="ant-tabs-extra-content">
        <ng-template [ngTemplateOutlet]="startExtraContent()!.templateRef" />
      </div>
    }
    <div
      class="ant-tabs-nav-wrap"
      [class.ant-tabs-nav-wrap-ping-left]="pingLeft"
      [class.ant-tabs-nav-wrap-ping-right]="pingRight"
      [class.ant-tabs-nav-wrap-ping-top]="pingTop"
      [class.ant-tabs-nav-wrap-ping-bottom]="pingBottom"
      #navWrap
    >
      <div
        class="ant-tabs-nav-list"
        #navList
        nzTabScrollList
        (offsetChange)="onOffsetChange($event)"
        (tabScroll)="tabScroll.emit($event)"
        role="tablist"
      >
        <ng-content />
        @if (showAddButton) {
          <button
            role="tab"
            [attr.tabindex]="-1"
            nz-tab-add-button
            [addIcon]="addIcon"
            (click)="addClicked.emit()"
          ></button>
        }
        <div
          nz-tabs-ink-bar
          [hidden]="hideBar"
          [position]="position"
          [animated]="inkBarAnimated"
          [indicator]="indicator()"
        ></div>
      </div>
    </div>
    <nz-tab-nav-operation
      (addClicked)="addClicked.emit()"
      (selected)="onSelectedFromMenu($event)"
      [addIcon]="addIcon"
      [addable]="addable"
      [items]="hiddenItems"
    />
    @if (endExtraContent()) {
      <div class="ant-tabs-extra-content">
        <ng-template [ngTemplateOutlet]="endExtraContent()!.templateRef" />
      </div>
    } @else if (extraTemplate) {
      <div class="ant-tabs-extra-content">
        <ng-template [ngTemplateOutlet]="extraTemplate" />
      </div>
    }
  `,
      host: {
        class: "ant-tabs-nav",
        "(keydown)": "handleKeydown($event)"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], () => [], {
    indexFocused: [{
      type: Output
    }],
    selectFocusedIndex: [{
      type: Output
    }],
    addClicked: [{
      type: Output
    }],
    tabScroll: [{
      type: Output
    }],
    position: [{
      type: Input
    }],
    addable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideBar: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    addIcon: [{
      type: Input
    }],
    inkBarAnimated: [{
      type: Input
    }],
    extraTemplate: [{
      type: Input
    }],
    extraContents: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "extraContents",
        required: true
      }]
    }],
    indicator: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "indicator",
        required: false
      }]
    }],
    selectedIndex: [{
      type: Input
    }],
    navWrapRef: [{
      type: ViewChild,
      args: ["navWrap", {
        static: true
      }]
    }],
    navListRef: [{
      type: ViewChild,
      args: ["navList", {
        static: true
      }]
    }],
    operationRef: [{
      type: ViewChild,
      args: [NzTabNavOperationComponent, {
        static: true
      }]
    }],
    addBtnRef: [{
      type: ViewChild,
      args: [NzTabAddButtonComponent, {
        static: false
      }]
    }],
    inkBar: [{
      type: ViewChild,
      args: [NzTabsInkBarDirective, {
        static: true
      }]
    }],
    items: [{
      type: ContentChildren,
      args: [NzTabNavItemDirective, {
        descendants: true
      }]
    }]
  });
})();
var _NzTabDirective = class _NzTabDirective {
};
__publicField(_NzTabDirective, "\u0275fac", function NzTabDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabDirective)();
});
__publicField(_NzTabDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTabDirective,
  selectors: [["", "nz-tab", ""]],
  exportAs: ["nzTab"]
}));
var NzTabDirective = _NzTabDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-tab]",
      exportAs: "nzTab"
    }]
  }], null, null);
})();
var NZ_TAB_SET = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "nz-tabs" : "");
var _NzTabComponent = class _NzTabComponent {
  constructor() {
    __publicField(this, "nzTitle", "");
    __publicField(this, "nzClosable", false);
    __publicField(this, "nzCloseIcon", "close");
    __publicField(this, "nzDisabled", false);
    __publicField(this, "nzForceRender", false);
    __publicField(this, "nzSelect", new EventEmitter());
    __publicField(this, "nzDeselect", new EventEmitter());
    __publicField(this, "nzClick", new EventEmitter());
    __publicField(this, "nzContextmenu", new EventEmitter());
    __publicField(this, "nzTabLinkTemplateDirective");
    __publicField(this, "template", null);
    __publicField(this, "linkDirective");
    __publicField(this, "contentTemplate");
    __publicField(this, "isActive", false);
    __publicField(this, "hasBeenActive", false);
    __publicField(this, "position", null);
    __publicField(this, "origin", null);
    __publicField(this, "closestTabSet", inject(NZ_TAB_SET));
    __publicField(this, "stateChanges", new Subject());
  }
  get content() {
    return this.template || this.contentTemplate;
  }
  get label() {
    var _a;
    return this.nzTitle || ((_a = this.nzTabLinkTemplateDirective) == null ? void 0 : _a.templateRef);
  }
  ngOnChanges(changes) {
    const {
      nzTitle,
      nzDisabled,
      nzForceRender
    } = changes;
    if (nzTitle || nzDisabled || nzForceRender) {
      this.stateChanges.next();
    }
  }
  ngOnDestroy() {
    this.stateChanges.complete();
  }
  setActive(active) {
    this.isActive = active;
    if (active) {
      this.hasBeenActive = true;
    }
  }
};
__publicField(_NzTabComponent, "\u0275fac", function NzTabComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabComponent)();
});
__publicField(_NzTabComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTabComponent,
  selectors: [["nz-tab"]],
  contentQueries: function NzTabComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzTabLinkTemplateDirective, 5)(dirIndex, NzTabDirective, 5, TemplateRef)(dirIndex, NzTabLinkDirective, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzTabLinkTemplateDirective = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.template = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.linkDirective = _t.first);
    }
  },
  viewQuery: function NzTabComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c6, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.contentTemplate = _t.first);
    }
  },
  inputs: {
    nzTitle: "nzTitle",
    nzClosable: [2, "nzClosable", "nzClosable", booleanAttribute],
    nzCloseIcon: "nzCloseIcon",
    nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
    nzForceRender: [2, "nzForceRender", "nzForceRender", booleanAttribute]
  },
  outputs: {
    nzSelect: "nzSelect",
    nzDeselect: "nzDeselect",
    nzClick: "nzClick",
    nzContextmenu: "nzContextmenu"
  },
  exportAs: ["nzTab"],
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c8,
  decls: 4,
  vars: 0,
  consts: [["tabLinkTemplate", ""], ["contentTemplate", ""]],
  template: function NzTabComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c7);
      \u0275\u0275domTemplate(0, NzTabComponent_ng_template_0_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(2, NzTabComponent_ng_template_2_Template, 1, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzTabComponent = _NzTabComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabComponent, [{
    type: Component,
    args: [{
      selector: "nz-tab",
      exportAs: "nzTab",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <ng-template #tabLinkTemplate>
      <ng-content select="[nz-tab-link]" />
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
  `
    }]
  }], null, {
    nzTitle: [{
      type: Input
    }],
    nzClosable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCloseIcon: [{
      type: Input
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzForceRender: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSelect: [{
      type: Output
    }],
    nzDeselect: [{
      type: Output
    }],
    nzClick: [{
      type: Output
    }],
    nzContextmenu: [{
      type: Output
    }],
    nzTabLinkTemplateDirective: [{
      type: ContentChild,
      args: [NzTabLinkTemplateDirective, {
        static: false
      }]
    }],
    template: [{
      type: ContentChild,
      args: [NzTabDirective, {
        static: false,
        read: TemplateRef
      }]
    }],
    linkDirective: [{
      type: ContentChild,
      args: [NzTabLinkDirective, {
        static: false
      }]
    }],
    contentTemplate: [{
      type: ViewChild,
      args: ["contentTemplate", {
        static: true
      }]
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME = "tabs";
var nextId = 0;
var NzTabsComponent = (() => {
  var _a;
  let _nzType_decorators;
  let _nzType_initializers = [];
  let _nzType_extraInitializers = [];
  let _nzSize_decorators;
  let _nzSize_initializers = [];
  let _nzSize_extraInitializers = [];
  let _nzAnimated_decorators;
  let _nzAnimated_initializers = [];
  let _nzAnimated_extraInitializers = [];
  let _nzTabBarGutter_decorators;
  let _nzTabBarGutter_initializers = [];
  let _nzTabBarGutter_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME);
      __publicField(this, "nzConfigService", inject(NzConfigService));
      __publicField(this, "ngZone", inject(NgZone));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "directionality", inject(Directionality));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "nzTabPosition", "top");
      __publicField(this, "nzTabBarExtraContent");
      __publicField(this, "nzCanDeactivate", null);
      __publicField(this, "nzAddIcon", "plus");
      __publicField(this, "nzTabBarStyle", null);
      __publicField(this, "nzType", __runInitializers(this, _nzType_initializers, "line"));
      __publicField(this, "nzSize", (__runInitializers(this, _nzType_extraInitializers), __runInitializers(this, _nzSize_initializers, "default")));
      __publicField(this, "nzAnimated", (__runInitializers(this, _nzSize_extraInitializers), __runInitializers(this, _nzAnimated_initializers, true)));
      __publicField(this, "nzTabBarGutter", (__runInitializers(this, _nzAnimated_extraInitializers), __runInitializers(this, _nzTabBarGutter_initializers, void 0)));
      __publicField(this, "nzHideAdd", (__runInitializers(this, _nzTabBarGutter_extraInitializers), false));
      __publicField(this, "nzCentered", false);
      __publicField(this, "nzHideAll", false);
      __publicField(this, "nzLinkRouter", false);
      __publicField(this, "nzLinkExact", true);
      __publicField(this, "nzDestroyInactiveTabPane", false);
      __publicField(this, "nzIndicator", input(...ngDevMode ? [void 0, {
        debugName: "nzIndicator"
      }] : []));
      __publicField(this, "nzSelectChange", new EventEmitter(true));
      __publicField(this, "nzSelectedIndexChange", new EventEmitter());
      __publicField(this, "nzTabListScroll", new EventEmitter());
      __publicField(this, "nzClose", new EventEmitter());
      __publicField(this, "nzAdd", new EventEmitter());
      // Pick up only direct descendants under ivy rendering engine
      // We filter out only the tabs that belong to this tab set in `tabs`.
      __publicField(this, "allTabs", new QueryList());
      __publicField(this, "tabLinks", new QueryList());
      __publicField(this, "tabNavBarRef");
      // All the direct tabs for this tab set
      __publicField(this, "tabs", new QueryList());
      __publicField(this, "extraContents", contentChildren(NzTabBarExtraContentDirective, ...ngDevMode ? [{
        debugName: "extraContents"
      }] : []));
      __publicField(this, "dir", "ltr");
      __publicField(this, "tabSetId");
      __publicField(this, "indexToSelect", 0);
      __publicField(this, "selectedIndex", null);
      __publicField(this, "tabLabelSubscription", Subscription.EMPTY);
      __publicField(this, "canDeactivateSubscription", Subscription.EMPTY);
      __publicField(this, "router", inject(Router, {
        optional: true
      }));
      this.tabSetId = nextId++;
      this.destroyRef.onDestroy(() => {
        this.tabs.destroy();
        this.tabLabelSubscription.unsubscribe();
        this.canDeactivateSubscription.unsubscribe();
      });
    }
    get nzSelectedIndex() {
      return this.selectedIndex;
    }
    set nzSelectedIndex(value) {
      this.indexToSelect = coerceNumberProperty(value, null);
    }
    get position() {
      return ["top", "bottom"].indexOf(this.nzTabPosition) === -1 ? "vertical" : "horizontal";
    }
    get addable() {
      return this.nzType === "editable-card" && !this.nzHideAdd;
    }
    get closable() {
      return this.nzType === "editable-card";
    }
    get line() {
      return this.nzType === "line";
    }
    get inkBarAnimated() {
      return this.line && (typeof this.nzAnimated === "boolean" ? this.nzAnimated : this.nzAnimated.inkBar);
    }
    get tabPaneAnimated() {
      return typeof this.nzAnimated === "boolean" ? this.nzAnimated : this.nzAnimated.tabPane;
    }
    ngOnInit() {
      var _a2;
      this.dir = this.directionality.value;
      (_a2 = this.directionality.change) == null ? void 0 : _a2.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
    }
    ngAfterContentInit() {
      this.ngZone.runOutsideAngular(() => {
        Promise.resolve().then(() => this.setUpRouter());
      });
      this.subscribeToTabLabels();
      this.subscribeToAllTabChanges();
      this.tabs.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        const indexToSelect = this.clampTabIndex(this.indexToSelect);
        if (indexToSelect === this.selectedIndex) {
          const tabs = this.tabs.toArray();
          for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].isActive) {
              this.indexToSelect = this.selectedIndex = i;
              break;
            }
          }
        }
        this.subscribeToTabLabels();
        this.cdr.markForCheck();
      });
    }
    ngAfterContentChecked() {
      const indexToSelect = this.indexToSelect = this.clampTabIndex(this.indexToSelect);
      if (this.selectedIndex !== indexToSelect) {
        const isFirstRun = this.selectedIndex == null;
        if (!isFirstRun) {
          this.nzSelectChange.emit(this.createChangeEvent(indexToSelect));
        }
        Promise.resolve().then(() => {
          this.tabs.forEach((tab, index) => tab.setActive(index === indexToSelect));
          if (!isFirstRun) {
            this.nzSelectedIndexChange.emit(indexToSelect);
          }
        });
      }
      this.tabs.forEach((tab, index) => {
        tab.position = index - indexToSelect;
        if (this.selectedIndex != null && tab.position === 0 && !tab.origin) {
          tab.origin = indexToSelect - this.selectedIndex;
        }
      });
      if (this.selectedIndex !== indexToSelect) {
        this.selectedIndex = indexToSelect;
        this.cdr.markForCheck();
      }
    }
    onClose(index, e) {
      e.preventDefault();
      e.stopPropagation();
      this.nzClose.emit({
        index
      });
    }
    onAdd() {
      this.nzAdd.emit();
    }
    clampTabIndex(index) {
      return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
    }
    createChangeEvent(index) {
      const event = new NzTabChangeEvent();
      event.index = index;
      if (this.tabs && this.tabs.length) {
        event.tab = this.tabs.toArray()[index];
        this.tabs.forEach((tab, i) => {
          if (i !== index) {
            tab.nzDeselect.emit();
          }
        });
        event.tab.nzSelect.emit();
      }
      return event;
    }
    subscribeToTabLabels() {
      if (this.tabLabelSubscription) {
        this.tabLabelSubscription.unsubscribe();
      }
      this.tabLabelSubscription = merge(...this.tabs.map((tab) => tab.stateChanges)).subscribe(() => this.cdr.markForCheck());
    }
    subscribeToAllTabChanges() {
      this.allTabs.changes.pipe(startWith(this.allTabs)).subscribe((tabs) => {
        this.tabs.reset(tabs.filter((tab) => tab.closestTabSet === this));
        this.tabs.notifyOnChanges();
      });
    }
    canDeactivateFun(pre, next) {
      if (typeof this.nzCanDeactivate === "function") {
        const observable = wrapIntoObservable(this.nzCanDeactivate(pre, next));
        return observable.pipe(first(), takeUntilDestroyed(this.destroyRef));
      } else {
        return of(true);
      }
    }
    clickNavItem(tab, index, e) {
      if (!tab.nzDisabled) {
        tab.nzClick.emit();
        if (!this.isRouterLinkClickEvent(index, e)) {
          this.setSelectedIndex(index);
        }
      }
    }
    isRouterLinkClickEvent(index, event) {
      var _a2, _b;
      const target = event.target;
      if (this.nzLinkRouter) {
        return !!((_b = (_a2 = this.tabs.toArray()[index]) == null ? void 0 : _a2.linkDirective) == null ? void 0 : _b.elementRef.nativeElement.contains(target));
      } else {
        return false;
      }
    }
    contextmenuNavItem(tab, e) {
      if (!tab.nzDisabled) {
        tab.nzContextmenu.emit(e);
      }
    }
    setSelectedIndex(index) {
      this.canDeactivateSubscription.unsubscribe();
      this.canDeactivateSubscription = this.canDeactivateFun(this.selectedIndex, index).subscribe((can) => {
        if (can) {
          this.nzSelectedIndex = index;
          this.tabNavBarRef.focusIndex = index;
          this.cdr.markForCheck();
        }
      });
    }
    getTabIndex(tab, index) {
      if (tab.nzDisabled) {
        return null;
      }
      return this.selectedIndex === index ? 0 : -1;
    }
    getTabContentId(i) {
      return `nz-tabs-${this.tabSetId}-tab-${i}`;
    }
    setUpRouter() {
      if (this.nzLinkRouter) {
        if (!this.router) {
          throw new Error(`${PREFIX} you should import 'RouterModule' if you want to use 'nzLinkRouter'!`);
        }
        merge(this.router.events.pipe(filter((e) => e instanceof NavigationEnd)), this.tabLinks.changes).pipe(startWith(true), delay(0), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.updateRouterActive();
          this.cdr.markForCheck();
        });
      }
    }
    updateRouterActive() {
      var _a2;
      if ((_a2 = this.router) == null ? void 0 : _a2.navigated) {
        const index = this.findShouldActiveTabIndex();
        if (index !== this.selectedIndex) {
          this.setSelectedIndex(index);
        }
        Promise.resolve().then(() => this.nzHideAll = index === -1);
      }
    }
    findShouldActiveTabIndex() {
      const tabs = this.tabs.toArray();
      const isActive = this.isLinkActive(this.router);
      return tabs.findIndex((tab) => {
        const c = tab.linkDirective;
        return c ? isActive(c.routerLink) : false;
      });
    }
    isLinkActive(router) {
      return (link) => link ? !!(router == null ? void 0 : router.isActive(link.urlTree || "", {
        paths: this.nzLinkExact ? "exact" : "subset",
        queryParams: this.nzLinkExact ? "exact" : "subset",
        fragment: "ignored",
        matrixParams: "ignored"
      })) : false;
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzType_decorators = [WithConfig()];
    _nzSize_decorators = [WithConfig()];
    _nzAnimated_decorators = [WithConfig()];
    _nzTabBarGutter_decorators = [WithConfig()];
    __esDecorate(null, null, _nzType_decorators, {
      kind: "field",
      name: "nzType",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzType" in obj,
        get: (obj) => obj.nzType,
        set: (obj, value) => {
          obj.nzType = value;
        }
      },
      metadata: _metadata
    }, _nzType_initializers, _nzType_extraInitializers);
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
    __esDecorate(null, null, _nzAnimated_decorators, {
      kind: "field",
      name: "nzAnimated",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzAnimated" in obj,
        get: (obj) => obj.nzAnimated,
        set: (obj, value) => {
          obj.nzAnimated = value;
        }
      },
      metadata: _metadata
    }, _nzAnimated_initializers, _nzAnimated_extraInitializers);
    __esDecorate(null, null, _nzTabBarGutter_decorators, {
      kind: "field",
      name: "nzTabBarGutter",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzTabBarGutter" in obj,
        get: (obj) => obj.nzTabBarGutter,
        set: (obj, value) => {
          obj.nzTabBarGutter = value;
        }
      },
      metadata: _metadata
    }, _nzTabBarGutter_initializers, _nzTabBarGutter_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzTabsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-tabs"]],
    contentQueries: function NzTabsComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuerySignal(dirIndex, ctx.extraContents, NzTabBarExtraContentDirective, 4);
        \u0275\u0275contentQuery(dirIndex, NzTabComponent, 5)(dirIndex, NzTabLinkDirective, 5);
      }
      if (rf & 2) {
        \u0275\u0275queryAdvance();
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.allTabs = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tabLinks = _t);
      }
    },
    viewQuery: function NzTabsComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(NzTabNavBarComponent, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tabNavBarRef = _t.first);
      }
    },
    hostAttrs: [1, "ant-tabs"],
    hostVars: 24,
    hostBindings: function NzTabsComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-tabs-card", ctx.nzType === "card" || ctx.nzType === "editable-card")("ant-tabs-editable", ctx.nzType === "editable-card")("ant-tabs-editable-card", ctx.nzType === "editable-card")("ant-tabs-centered", ctx.nzCentered)("ant-tabs-rtl", ctx.dir === "rtl")("ant-tabs-top", ctx.nzTabPosition === "top")("ant-tabs-bottom", ctx.nzTabPosition === "bottom")("ant-tabs-left", ctx.nzTabPosition === "left")("ant-tabs-right", ctx.nzTabPosition === "right")("ant-tabs-default", ctx.nzSize === "default")("ant-tabs-small", ctx.nzSize === "small")("ant-tabs-large", ctx.nzSize === "large");
      }
    },
    inputs: {
      nzSelectedIndex: "nzSelectedIndex",
      nzTabPosition: "nzTabPosition",
      nzTabBarExtraContent: "nzTabBarExtraContent",
      nzCanDeactivate: "nzCanDeactivate",
      nzAddIcon: "nzAddIcon",
      nzTabBarStyle: "nzTabBarStyle",
      nzType: "nzType",
      nzSize: "nzSize",
      nzAnimated: "nzAnimated",
      nzTabBarGutter: "nzTabBarGutter",
      nzHideAdd: [2, "nzHideAdd", "nzHideAdd", booleanAttribute],
      nzCentered: [2, "nzCentered", "nzCentered", booleanAttribute],
      nzHideAll: [2, "nzHideAll", "nzHideAll", booleanAttribute],
      nzLinkRouter: [2, "nzLinkRouter", "nzLinkRouter", booleanAttribute],
      nzLinkExact: [2, "nzLinkExact", "nzLinkExact", booleanAttribute],
      nzDestroyInactiveTabPane: [2, "nzDestroyInactiveTabPane", "nzDestroyInactiveTabPane", booleanAttribute],
      nzIndicator: [1, "nzIndicator"]
    },
    outputs: {
      nzSelectChange: "nzSelectChange",
      nzSelectedIndexChange: "nzSelectedIndexChange",
      nzTabListScroll: "nzTabListScroll",
      nzClose: "nzClose",
      nzAdd: "nzAdd"
    },
    exportAs: ["nzTabs"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: NZ_TAB_SET,
      useExisting: forwardRef(() => _a)
    }])],
    decls: 4,
    vars: 12,
    consts: [["tabpaneTmpl", ""], [3, "style", "selectedIndex", "inkBarAnimated", "addable", "addIcon", "hideBar", "position", "extraTemplate", "extraContents", "indicator"], [1, "ant-tabs-content-holder"], [1, "ant-tabs-content"], [3, "tabScroll", "selectFocusedIndex", "addClicked", "selectedIndex", "inkBarAnimated", "addable", "addIcon", "hideBar", "position", "extraTemplate", "extraContents", "indicator"], [1, "ant-tabs-tab", 3, "margin-right", "margin-bottom", "ant-tabs-tab-active", "ant-tabs-tab-disabled"], [1, "ant-tabs-tab", 3, "click", "contextmenu"], ["type", "button", "role", "tab", "nzTabNavItem", "", "cdkMonitorElementFocus", "", 1, "ant-tabs-tab-btn", 3, "id", "disabled", "tab", "active"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], ["type", "button", "nz-tab-close-button", "", 3, "closeIcon"], ["type", "button", "nz-tab-close-button", "", 3, "click", "closeIcon"], [3, "ngTemplateOutlet"], ["role", "tabpanel", "nz-tab-body", "", 3, "id", "active", "content", "animated"]],
    template: function NzTabsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, NzTabsComponent_Conditional_0_Template, 3, 11, "nz-tabs-nav", 1);
        \u0275\u0275elementStart(1, "div", 2)(2, "div", 3);
        \u0275\u0275conditionalCreate(3, NzTabsComponent_Conditional_3_Template, 2, 0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.tabs.length || ctx.addable ? 0 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("ant-tabs-content-top", ctx.nzTabPosition === "top")("ant-tabs-content-bottom", ctx.nzTabPosition === "bottom")("ant-tabs-content-left", ctx.nzTabPosition === "left")("ant-tabs-content-right", ctx.nzTabPosition === "right")("ant-tabs-content-animated", ctx.tabPaneAnimated);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.nzHideAll ? 3 : -1);
      }
    },
    dependencies: [NzTabNavBarComponent, NgTemplateOutlet, NzTabNavItemDirective, A11yModule, CdkMonitorFocus, NzOutletModule, NzStringTemplateOutletDirective, NzTabCloseButtonComponent, NzTabBodyComponent],
    encapsulation: 2
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabsComponent, [{
    type: Component,
    args: [{
      selector: "nz-tabs",
      exportAs: "nzTabs",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.Default,
      providers: [{
        provide: NZ_TAB_SET,
        useExisting: forwardRef(() => NzTabsComponent)
      }],
      template: `
    @if (tabs.length || addable) {
      <nz-tabs-nav
        [style]="nzTabBarStyle"
        [selectedIndex]="nzSelectedIndex || 0"
        [inkBarAnimated]="inkBarAnimated"
        [addable]="addable"
        [addIcon]="nzAddIcon"
        [hideBar]="nzHideAll"
        [position]="position"
        [extraTemplate]="nzTabBarExtraContent"
        [extraContents]="extraContents()"
        [indicator]="nzIndicator()"
        (tabScroll)="nzTabListScroll.emit($event)"
        (selectFocusedIndex)="setSelectedIndex($event)"
        (addClicked)="onAdd()"
      >
        @for (tab of tabs; track tab) {
          <div
            class="ant-tabs-tab"
            [style.margin-right.px]="position === 'horizontal' ? nzTabBarGutter : null"
            [style.margin-bottom.px]="position === 'vertical' ? nzTabBarGutter : null"
            [class.ant-tabs-tab-active]="nzSelectedIndex === $index"
            [class.ant-tabs-tab-disabled]="tab.nzDisabled"
            (click)="clickNavItem(tab, $index, $event)"
            (contextmenu)="contextmenuNavItem(tab, $event)"
          >
            <button
              type="button"
              role="tab"
              [id]="getTabContentId($index)"
              [attr.tabIndex]="getTabIndex(tab, $index)"
              [attr.aria-disabled]="tab.nzDisabled"
              [attr.aria-selected]="nzSelectedIndex === $index && !nzHideAll"
              [attr.aria-controls]="getTabContentId($index)"
              [disabled]="tab.nzDisabled"
              [tab]="tab"
              [active]="nzSelectedIndex === $index"
              class="ant-tabs-tab-btn"
              nzTabNavItem
              cdkMonitorElementFocus
            >
              <ng-container *nzStringTemplateOutlet="tab.label; context: { visible: true }">
                {{ tab.label }}
              </ng-container>
              @if (tab.nzClosable && closable && !tab.nzDisabled) {
                <button
                  type="button"
                  nz-tab-close-button
                  [closeIcon]="tab.nzCloseIcon"
                  (click)="onClose($index, $event)"
                ></button>
              }
            </button>
          </div>
        }
      </nz-tabs-nav>
    }
    <div class="ant-tabs-content-holder">
      <div
        class="ant-tabs-content"
        [class.ant-tabs-content-top]="nzTabPosition === 'top'"
        [class.ant-tabs-content-bottom]="nzTabPosition === 'bottom'"
        [class.ant-tabs-content-left]="nzTabPosition === 'left'"
        [class.ant-tabs-content-right]="nzTabPosition === 'right'"
        [class.ant-tabs-content-animated]="tabPaneAnimated"
      >
        @if (!nzHideAll) {
          @for (tab of tabs; track tab) {
            @if (tab.nzForceRender) {
              <ng-template [ngTemplateOutlet]="tabpaneTmpl" />
            } @else if (nzDestroyInactiveTabPane) {
              @if (nzSelectedIndex === $index) {
                <ng-template [ngTemplateOutlet]="tabpaneTmpl" />
              }
            } @else {
              @if (nzSelectedIndex === $index || tab.hasBeenActive) {
                <ng-template [ngTemplateOutlet]="tabpaneTmpl" />
              }
            }

            <ng-template #tabpaneTmpl>
              <div
                role="tabpanel"
                [id]="getTabContentId($index)"
                [attr.aria-labelledby]="getTabContentId($index)"
                nz-tab-body
                [active]="nzSelectedIndex === $index"
                [content]="tab.content"
                [animated]="tabPaneAnimated"
              ></div>
            </ng-template>
          }
        }
      </div>
    </div>
  `,
      host: {
        class: "ant-tabs",
        "[class.ant-tabs-card]": `nzType === 'card' || nzType === 'editable-card'`,
        "[class.ant-tabs-editable]": `nzType === 'editable-card'`,
        "[class.ant-tabs-editable-card]": `nzType === 'editable-card'`,
        "[class.ant-tabs-centered]": `nzCentered`,
        "[class.ant-tabs-rtl]": `dir === 'rtl'`,
        "[class.ant-tabs-top]": `nzTabPosition === 'top'`,
        "[class.ant-tabs-bottom]": `nzTabPosition === 'bottom'`,
        "[class.ant-tabs-left]": `nzTabPosition === 'left'`,
        "[class.ant-tabs-right]": `nzTabPosition === 'right'`,
        "[class.ant-tabs-default]": `nzSize === 'default'`,
        "[class.ant-tabs-small]": `nzSize === 'small'`,
        "[class.ant-tabs-large]": `nzSize === 'large'`
      },
      imports: [NzTabNavBarComponent, NgTemplateOutlet, NzTabNavItemDirective, A11yModule, NzOutletModule, NzTabCloseButtonComponent, NzTabBodyComponent]
    }]
  }], () => [], {
    nzSelectedIndex: [{
      type: Input
    }],
    nzTabPosition: [{
      type: Input
    }],
    nzTabBarExtraContent: [{
      type: Input
    }],
    nzCanDeactivate: [{
      type: Input
    }],
    nzAddIcon: [{
      type: Input
    }],
    nzTabBarStyle: [{
      type: Input
    }],
    nzType: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzAnimated: [{
      type: Input
    }],
    nzTabBarGutter: [{
      type: Input
    }],
    nzHideAdd: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCentered: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzHideAll: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzLinkRouter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzLinkExact: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDestroyInactiveTabPane: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzIndicator: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzIndicator",
        required: false
      }]
    }],
    nzSelectChange: [{
      type: Output
    }],
    nzSelectedIndexChange: [{
      type: Output
    }],
    nzTabListScroll: [{
      type: Output
    }],
    nzClose: [{
      type: Output
    }],
    nzAdd: [{
      type: Output
    }],
    allTabs: [{
      type: ContentChildren,
      args: [NzTabComponent, {
        descendants: true
      }]
    }],
    tabLinks: [{
      type: ContentChildren,
      args: [NzTabLinkDirective, {
        descendants: true
      }]
    }],
    tabNavBarRef: [{
      type: ViewChild,
      args: [NzTabNavBarComponent, {
        static: false
      }]
    }],
    extraContents: [{
      type: ContentChildren,
      args: [forwardRef(() => NzTabBarExtraContentDirective), {
        isSignal: true
      }]
    }]
  });
})();
var DIRECTIVES = [NzTabsComponent, NzTabComponent, NzTabNavBarComponent, NzTabNavItemDirective, NzTabsInkBarDirective, NzTabScrollListDirective, NzTabNavOperationComponent, NzTabAddButtonComponent, NzTabCloseButtonComponent, NzTabDirective, NzTabBodyComponent, NzTabLinkDirective, NzTabLinkTemplateDirective, NzTabBarExtraContentDirective];
var _NzTabsModule = class _NzTabsModule {
};
__publicField(_NzTabsModule, "\u0275fac", function NzTabsModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabsModule)();
});
__publicField(_NzTabsModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzTabsModule,
  imports: [NzTabsComponent, NzTabComponent, NzTabNavBarComponent, NzTabNavItemDirective, NzTabsInkBarDirective, NzTabScrollListDirective, NzTabNavOperationComponent, NzTabAddButtonComponent, NzTabCloseButtonComponent, NzTabDirective, NzTabBodyComponent, NzTabLinkDirective, NzTabLinkTemplateDirective, NzTabBarExtraContentDirective],
  exports: [NzTabsComponent, NzTabComponent, NzTabNavBarComponent, NzTabNavItemDirective, NzTabsInkBarDirective, NzTabScrollListDirective, NzTabNavOperationComponent, NzTabAddButtonComponent, NzTabCloseButtonComponent, NzTabDirective, NzTabBodyComponent, NzTabLinkDirective, NzTabLinkTemplateDirective, NzTabBarExtraContentDirective]
}));
__publicField(_NzTabsModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzTabsComponent, NzTabNavBarComponent, NzTabNavOperationComponent, NzTabAddButtonComponent, NzTabCloseButtonComponent]
}));
var NzTabsModule = _NzTabsModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabsModule, [{
    type: NgModule,
    args: [{
      imports: [DIRECTIVES],
      exports: [DIRECTIVES]
    }]
  }], null, null);
})();

// projects/tot/business-oidc/src/lib/authorize-info/authorize-info.component.ts
function AuthorizeInfoComponent_nz_tag_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("nzColor", role_r1 === ctx_r1.ADMIN_ROLE ? "gold" : "blue");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", role_r1, " ");
  }
}
function AuthorizeInfoComponent_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "Kh\xF4ng c\xF3 vai tr\xF2"));
  }
}
function AuthorizeInfoComponent_nz_tag_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 14);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const claim_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("nzColor", claim_r3 === ctx_r1.ADMIN_CLAIM ? "volcano" : "green");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", claim_r3, " ");
  }
}
function AuthorizeInfoComponent_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 15);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "Kh\xF4ng c\xF3 quy\u1EC1n h\u1EA1n"));
  }
}
function AuthorizeInfoComponent_nz_card_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-card", 5);
    \u0275\u0275pipe(1, "transloco");
    \u0275\u0275elementStart(2, "div", 16);
    \u0275\u0275element(3, "span", 17);
    \u0275\u0275elementStart(4, "p")(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "transloco");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "transloco");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(1, 4, "Tr\u1EA1ng th\xE1i Admin"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzTwotoneColor", "#52c41a");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 6, "B\u1EA1n \u0111ang c\xF3 quy\u1EC1n Admin t\u1ED1i cao."));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 8, "H\u1EC7 th\u1ED1ng s\u1EBD b\u1ECF qua m\u1ECDi b\u01B0\u1EDBc ki\u1EC3m tra quy\u1EC1n h\u1EA1n v\xE0 cho ph\xE9p b\u1EA1n truy c\u1EADp t\u1EA5t c\u1EA3 c\xE1c t\xEDnh n\u0103ng."));
  }
}
function AuthorizeInfoComponent_ng_template_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "code");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r4.value);
  }
}
var _AuthorizeInfoComponent = class _AuthorizeInfoComponent {
  constructor() {
    this.authService = inject(AuthService);
    this.userRoles = [];
    this.userClaims = [];
    this.isAdmin = false;
    this.version = CLAIMS_VERSION;
    this.adminClaim = ADMIN_CLAIM;
    this.ADMIN_ROLE = ADMIN_ROLE;
    this.ADMIN_CLAIM = ADMIN_CLAIM;
    this.appClaimsList = [];
    this.claimsColumns = [];
  }
  ngOnInit() {
    this.claimsColumns = [
      { title: "M\xF4-\u0111un", key: "module", sortable: true },
      { title: "H\xE0nh \u0111\u1ED9ng", key: "action", sortable: true },
      { title: "Gi\xE1 tr\u1ECB Claim", key: "value" }
    ];
    this.loadUserData();
    this.processAppClaims();
  }
  loadUserData() {
    const rawRoles = localStorage.getItem("roles");
    const rawClaims = localStorage.getItem("claims");
    if (rawRoles) {
      try {
        this.userRoles = JSON.parse(rawRoles);
      } catch (e) {
      }
    }
    if (rawClaims) {
      try {
        this.userClaims = JSON.parse(rawClaims);
      } catch (e) {
      }
    }
    this.isAdmin = this.authService.hasClaim(ADMIN_CLAIM);
  }
  processAppClaims() {
    for (const [module, actions] of Object.entries(APP_CLAIMS)) {
      for (const [action, value] of Object.entries(actions)) {
        this.appClaimsList.push({
          module,
          action,
          value
        });
      }
    }
  }
};
_AuthorizeInfoComponent.\u0275fac = function AuthorizeInfoComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthorizeInfoComponent)();
};
_AuthorizeInfoComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthorizeInfoComponent, selectors: [["app-authorize-info"]], decls: 43, vars: 44, consts: [[1, "authorize-info-container"], [1, "page-header"], [1, "subtitle"], [3, "nzTitle"], [1, "tab-content"], [1, "info-card", 3, "nzTitle"], ["nzBordered", "", 3, "nzColumn"], [3, "nzColor", 4, "ngFor", "ngForOf"], ["class", "empty-text", 4, "ngIf"], [1, "claims-list"], ["class", "info-card", 3, "nzTitle", 4, "ngIf"], ["nzColor", "volcano"], [3, "title", "data", "columns", "pageSize"], ["totCell", "value"], [3, "nzColor"], [1, "empty-text"], [1, "admin-notice"], ["nz-icon", "", "nzType", "safety-certificate", "nzTheme", "twotone", 3, "nzTwotoneColor"]], template: function AuthorizeInfoComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 2);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "transloco");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "nz-tabs")(9, "nz-tab", 3);
    \u0275\u0275pipe(10, "transloco");
    \u0275\u0275elementStart(11, "div", 4)(12, "nz-card", 5);
    \u0275\u0275pipe(13, "transloco");
    \u0275\u0275elementStart(14, "nz-descriptions", 6)(15, "nz-descriptions-item", 3);
    \u0275\u0275pipe(16, "transloco");
    \u0275\u0275template(17, AuthorizeInfoComponent_nz_tag_17_Template, 2, 2, "nz-tag", 7)(18, AuthorizeInfoComponent_span_18_Template, 3, 3, "span", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "nz-descriptions-item", 3);
    \u0275\u0275pipe(20, "transloco");
    \u0275\u0275elementStart(21, "div", 9);
    \u0275\u0275template(22, AuthorizeInfoComponent_nz_tag_22_Template, 2, 2, "nz-tag", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, AuthorizeInfoComponent_span_23_Template, 3, 3, "span", 8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(24, AuthorizeInfoComponent_nz_card_24_Template, 11, 10, "nz-card", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "nz-tab", 3);
    \u0275\u0275pipe(26, "transloco");
    \u0275\u0275elementStart(27, "div", 4)(28, "nz-card", 5);
    \u0275\u0275pipe(29, "transloco");
    \u0275\u0275elementStart(30, "p");
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "transloco");
    \u0275\u0275elementStart(33, "strong");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "p");
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "transloco");
    \u0275\u0275elementStart(38, "nz-tag", 11);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "tot-table", 12);
    \u0275\u0275pipe(41, "transloco");
    \u0275\u0275template(42, AuthorizeInfoComponent_ng_template_42_Template, 2, 1, "ng-template", 13);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 22, "Th\xF4ng tin ph\xE2n quy\u1EC1n"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 24, "T\u1ED5ng quan v\u1EC1 c\u01A1 ch\u1EBF ph\xE2n quy\u1EC1n \u0111ang \u0111\u01B0\u1EE3c \xE1p d\u1EE5ng"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(10, 26, "Quy\u1EC1n c\u1EE7a t\xF4i"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(13, 28, "Th\xF4ng tin ng\u01B0\u1EDDi d\xF9ng"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzColumn", 1);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(16, 30, "Vai tr\xF2 (Roles)"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx.userRoles);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.userRoles.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(20, 32, "Quy\u1EC1n h\u1EA1n (Claims)"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx.userClaims);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.userClaims.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isAdmin);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(26, 34, "C\u1EA5u h\xECnh \u1EE9ng d\u1EE5ng"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(29, 36, "Phi\xEAn b\u1EA3n c\u1EA5u h\xECnh"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(32, 38, "Phi\xEAn b\u1EA3n hi\u1EC7n t\u1EA1i:"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.version);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(37, 40, "Admin Claim:"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.adminClaim);
    \u0275\u0275advance();
    \u0275\u0275property("title", \u0275\u0275pipeBind1(41, 42, "Danh s\xE1ch Quy\u1EC1n h\u1EA1n \u0111\u1ECBnh ngh\u0129a trong FE"))("data", ctx.appClaimsList)("columns", ctx.claimsColumns)("pageSize", 10);
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  NzCardModule,
  NzCardComponent,
  NzTagModule,
  NzTagComponent,
  NzDescriptionsModule,
  NzDescriptionsComponent,
  NzDescriptionsItemComponent,
  NzTabsModule,
  NzTabsComponent,
  NzTabComponent,
  NzIconModule,
  NzIconDirective,
  TranslocoModule,
  TotTableComponent,
  TotCellDirective,
  TranslocoPipe
], styles: ["\n.authorize-info-container[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.45);\n  margin-top: -16px;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 16px 0;\n}\n.info-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.claims-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.empty-text[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.25);\n  font-style: italic;\n}\n.admin-notice[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 16px;\n}\n.admin-notice[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n}\ncode[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  padding: 2px 4px;\n  border-radius: 4px;\n  font-size: 12px;\n}\n/*# sourceMappingURL=authorize-info.component.css.map */"] });
var AuthorizeInfoComponent = _AuthorizeInfoComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthorizeInfoComponent, [{
    type: Component,
    args: [{ selector: "app-authorize-info", standalone: true, imports: [
      CommonModule,
      NzCardModule,
      NzTagModule,
      NzDescriptionsModule,
      NzTabsModule,
      NzIconModule,
      TranslocoModule,
      TotTableComponent,
      TotCellDirective
    ], template: `
    <div class="authorize-info-container">
      <div class="page-header">
        <h2>{{ 'Th\xF4ng tin ph\xE2n quy\u1EC1n' | transloco }}</h2>
        <p class="subtitle">{{ 'T\u1ED5ng quan v\u1EC1 c\u01A1 ch\u1EBF ph\xE2n quy\u1EC1n \u0111ang \u0111\u01B0\u1EE3c \xE1p d\u1EE5ng' | transloco }}</p>
      </div>

      <nz-tabs>
        <nz-tab [nzTitle]="'Quy\u1EC1n c\u1EE7a t\xF4i' | transloco">
          <div class="tab-content">
            <nz-card [nzTitle]="'Th\xF4ng tin ng\u01B0\u1EDDi d\xF9ng' | transloco" class="info-card">
              <nz-descriptions [nzColumn]="1" nzBordered>
                <nz-descriptions-item [nzTitle]="'Vai tr\xF2 (Roles)' | transloco">
                  <nz-tag *ngFor="let role of userRoles" [nzColor]="role === ADMIN_ROLE ? 'gold' : 'blue'">
                    {{ role }}
                  </nz-tag>
                  <span *ngIf="userRoles.length === 0" class="empty-text">{{ 'Kh\xF4ng c\xF3 vai tr\xF2' | transloco }}</span>
                </nz-descriptions-item>
                <nz-descriptions-item [nzTitle]="'Quy\u1EC1n h\u1EA1n (Claims)' | transloco">
                  <div class="claims-list">
                    <nz-tag *ngFor="let claim of userClaims" [nzColor]="claim === ADMIN_CLAIM ? 'volcano' : 'green'">
                      {{ claim }}
                    </nz-tag>
                  </div>
                  <span *ngIf="userClaims.length === 0" class="empty-text">{{ 'Kh\xF4ng c\xF3 quy\u1EC1n h\u1EA1n' | transloco }}</span>
                </nz-descriptions-item>
              </nz-descriptions>
            </nz-card>

            <nz-card [nzTitle]="'Tr\u1EA1ng th\xE1i Admin' | transloco" class="info-card" *ngIf="isAdmin">
              <div class="admin-notice">
                <span nz-icon nzType="safety-certificate" nzTheme="twotone" [nzTwotoneColor]="'#52c41a'"></span>
                <p><strong>{{ 'B\u1EA1n \u0111ang c\xF3 quy\u1EC1n Admin t\u1ED1i cao.' | transloco }}</strong></p>
                <p>{{ 'H\u1EC7 th\u1ED1ng s\u1EBD b\u1ECF qua m\u1ECDi b\u01B0\u1EDBc ki\u1EC3m tra quy\u1EC1n h\u1EA1n v\xE0 cho ph\xE9p b\u1EA1n truy c\u1EADp t\u1EA5t c\u1EA3 c\xE1c t\xEDnh n\u0103ng.' | transloco }}</p>
              </div>
            </nz-card>
          </div>
        </nz-tab>

        <nz-tab [nzTitle]="'C\u1EA5u h\xECnh \u1EE9ng d\u1EE5ng' | transloco">
          <div class="tab-content">
            <nz-card [nzTitle]="'Phi\xEAn b\u1EA3n c\u1EA5u h\xECnh' | transloco" class="info-card">
              <p>{{ 'Phi\xEAn b\u1EA3n hi\u1EC7n t\u1EA1i:' | transloco }} <strong>{{ version }}</strong></p>
              <p>{{ 'Admin Claim:' | transloco }} <nz-tag nzColor="volcano">{{ adminClaim }}</nz-tag></p>
            </nz-card>

            <tot-table 
              [title]="'Danh s\xE1ch Quy\u1EC1n h\u1EA1n \u0111\u1ECBnh ngh\u0129a trong FE' | transloco" 
              [data]="appClaimsList" 
              [columns]="claimsColumns"
              [pageSize]="10"
            >
              <ng-template totCell="value" let-data>
                <code>{{ data.value }}</code>
              </ng-template>
            </tot-table>
          </div>
        </nz-tab>
      </nz-tabs>

    </div>
  `, styles: ["/* angular:styles/component:css;70efadc8f01df98a16b477d44f79bf19b355eff90c2a62fef78074449633cbfa;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/projects/tot/business-oidc/src/lib/authorize-info/authorize-info.component.ts */\n.authorize-info-container {\n  padding: 0;\n}\n.page-header {\n  margin-bottom: 24px;\n}\n.subtitle {\n  color: rgba(0, 0, 0, 0.45);\n  margin-top: -16px;\n}\n.tab-content {\n  padding: 16px 0;\n}\n.info-card {\n  margin-bottom: 24px;\n}\n.claims-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.empty-text {\n  color: rgba(0, 0, 0, 0.25);\n  font-style: italic;\n}\n.admin-notice {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 16px;\n}\n.admin-notice span {\n  font-size: 48px;\n  margin-bottom: 16px;\n}\ncode {\n  background: #f5f5f5;\n  padding: 2px 4px;\n  border-radius: 4px;\n  font-size: 12px;\n}\n/*# sourceMappingURL=authorize-info.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthorizeInfoComponent, { className: "AuthorizeInfoComponent", filePath: "projects/tot/business-oidc/src/lib/authorize-info/authorize-info.component.ts", lineNumber: 134 });
})();

// projects/tot/business-oidc/src/lib/notify/notify.component.ts
var _c05 = () => [16, 16];
var _c15 = () => ({ minRows: 3, maxRows: 6 });
function NotifyComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 16);
  }
}
function NotifyComponent_tot_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 17);
    \u0275\u0275listener("click", function NotifyComponent_tot_button_15_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.search());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "T\xECm ki\u1EBFm"));
  }
}
function NotifyComponent_tot_button_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 18);
    \u0275\u0275listener("click", function NotifyComponent_tot_button_16_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.resetSearch());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "\u0110\u1EB7t l\u1EA1i"));
  }
}
function NotifyComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-avatar", 19);
  }
  if (rf & 2) {
    const data_r5 = ctx.$implicit;
    \u0275\u0275property("nzSrc", data_r5.avatarUrl)("nzSize", 40);
  }
}
function NotifyComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 21);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r6.displayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r6.username);
  }
}
function NotifyComponent_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 22);
    \u0275\u0275listener("click", function NotifyComponent_ng_template_21_Template_tot_button_click_0_listener() {
      const data_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openSendModal(data_r8));
    });
    \u0275\u0275element(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "G\u1EEDi th\xF4ng b\xE1o"), " ");
  }
}
function NotifyComponent_ng_container_25_nz_option_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-option", 32);
  }
  if (rf & 2) {
    const t_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nzValue", t_r10.fcmToken)("nzLabel", ctx_r2.getDeviceLabel(t_r10));
  }
}
function NotifyComponent_ng_container_25_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275element(1, "span", 34);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "Ng\u01B0\u1EDDi d\xF9ng n\xE0y ch\u01B0a \u0111\u0103ng k\xFD thi\u1EBFt b\u1ECB nh\u1EADn th\xF4ng b\xE1o n\xE0o."), " ");
  }
}
function NotifyComponent_ng_container_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "form", 24)(2, "nz-form-item")(3, "nz-form-label", 25);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "nz-form-control", 26);
    \u0275\u0275pipe(7, "transloco");
    \u0275\u0275elementStart(8, "nz-select", 27);
    \u0275\u0275pipe(9, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function NotifyComponent_ng_container_25_Template_nz_select_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.payload.fcmToken, $event) || (ctx_r2.payload.fcmToken = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(10, NotifyComponent_ng_container_25_nz_option_10_Template, 1, 2, "nz-option", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, NotifyComponent_ng_container_25_div_11_Template, 4, 3, "div", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "nz-form-item")(13, "nz-form-label", 25);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "nz-form-control", 26);
    \u0275\u0275pipe(17, "transloco");
    \u0275\u0275elementStart(18, "input", 30);
    \u0275\u0275pipe(19, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function NotifyComponent_ng_container_25_Template_input_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.payload.title, $event) || (ctx_r2.payload.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "nz-form-item")(21, "nz-form-label", 25);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "nz-form-control", 26);
    \u0275\u0275pipe(25, "transloco");
    \u0275\u0275elementStart(26, "textarea", 31);
    \u0275\u0275pipe(27, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function NotifyComponent_ng_container_25_Template_textarea_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.payload.body, $event) || (ctx_r2.payload.body = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 16, "Ch\u1ECDn thi\u1EBFt b\u1ECB nh\u1EADn"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzErrorTip", \u0275\u0275pipeBind1(7, 18, "Vui l\xF2ng ch\u1ECDn thi\u1EBFt b\u1ECB nh\u1EADn"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.payload.fcmToken);
    \u0275\u0275property("nzPlaceHolder", \u0275\u0275pipeBind1(9, 20, "Vui l\xF2ng ch\u1ECDn thi\u1EBFt b\u1ECB"))("nzLoading", ctx_r2.loadingTokens);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.fcmTokens);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.loadingTokens && ctx_r2.fcmTokens.length === 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(15, 22, "Ti\xEAu \u0111\u1EC1 th\xF4ng b\xE1o"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzErrorTip", \u0275\u0275pipeBind1(17, 24, "Vui l\xF2ng nh\u1EADp ti\xEAu \u0111\u1EC1"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.payload.title);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(19, 26, "Nh\u1EADp ti\xEAu \u0111\u1EC1"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 28, "N\u1ED9i dung th\xF4ng b\xE1o"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzErrorTip", \u0275\u0275pipeBind1(25, 30, "Vui l\xF2ng nh\u1EADp n\u1ED9i dung"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.payload.body);
    \u0275\u0275property("nzAutosize", \u0275\u0275pureFunction0(34, _c15))("placeholder", \u0275\u0275pipeBind1(27, 32, "Nh\u1EADp n\u1ED9i dung th\xF4ng b\xE1o"));
  }
}
var _NotifyComponent = class _NotifyComponent {
  constructor() {
    this.authMgmt = inject(AuthManagementService);
    this.message = inject(NzMessageService);
    this.translate = inject(TranslocoService);
    this.cdr = inject(ChangeDetectorRef);
    this.users = [];
    this.loading = false;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.totalUsers = 0;
    this.searchKeyword = "";
    this.userColumns = [];
    this.isModalVisible = false;
    this.modalTitle = "";
    this.selectedUser = null;
    this.loadingTokens = false;
    this.sending = false;
    this.fcmTokens = [];
    this.payload = {
      fcmToken: "",
      title: "",
      body: ""
    };
  }
  ngOnInit() {
    this.userColumns = [
      { title: "Avatar", key: "avatar", width: "80px" },
      { title: "Ng\u01B0\u1EDDi d\xF9ng", key: "user" },
      { title: "Email", key: "email" },
      { title: "H\xE0nh \u0111\u1ED9ng", key: "action", width: "180px", right: true }
    ];
    this.loadUsers();
  }
  async loadUsers() {
    this.loading = true;
    try {
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      if (this.searchKeyword) {
        params.keyword = this.searchKeyword.trim();
      }
      const res = await this.authMgmt.getUsers(params);
      this.users = res.items || [];
      this.totalUsers = res.total || 0;
    } catch (e) {
      this.message.error(this.translate.translate("L\u1ED7i khi t\u1EA3i danh s\xE1ch ng\u01B0\u1EDDi d\xF9ng"));
    } finally {
      this.loading = false;
      this.cdr.markForCheck();
    }
  }
  search() {
    this.pageIndex = 1;
    this.loadUsers();
  }
  resetSearch() {
    this.searchKeyword = "";
    this.pageIndex = 1;
    this.loadUsers();
  }
  onQueryParamsChange(params) {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadUsers();
  }
  async openSendModal(user) {
    this.selectedUser = user;
    this.modalTitle = `${this.translate.translate("G\u1EEDi th\xF4ng b\xE1o t\u1EDBi")} ${user.displayName}`;
    this.fcmTokens = [];
    this.payload = {
      fcmToken: "",
      title: "",
      body: ""
    };
    this.isModalVisible = true;
    this.loadingTokens = true;
    try {
      const tokens = await this.authMgmt.getUserFcmTokens(user.id);
      this.fcmTokens = tokens || [];
      if (this.fcmTokens.length > 0) {
        this.payload.fcmToken = this.fcmTokens[0].fcmToken;
      }
    } catch (e) {
      this.message.error(this.translate.translate("L\u1ED7i khi t\u1EA3i danh s\xE1ch thi\u1EBFt b\u1ECB nh\u1EADn"));
    } finally {
      this.loadingTokens = false;
      this.cdr.markForCheck();
    }
  }
  closeModal() {
    this.isModalVisible = false;
    this.selectedUser = null;
  }
  getDeviceLabel(token) {
    const appTypeLabel = token.appType ? ` (${token.appType})` : "";
    if (token.deviceId) {
      return `Thi\u1EBFt b\u1ECB: ${token.deviceId}${appTypeLabel}`;
    }
    return `Token: ${token.fcmToken.substring(0, 15)}...${appTypeLabel}`;
  }
  async send() {
    if (!this.payload.fcmToken) {
      this.message.warning(this.translate.translate("Vui l\xF2ng ch\u1ECDn thi\u1EBFt b\u1ECB nh\u1EADn"));
      return;
    }
    if (!this.payload.title.trim()) {
      this.message.warning(this.translate.translate("Vui l\xF2ng nh\u1EADp ti\xEAu \u0111\u1EC1"));
      return;
    }
    if (!this.payload.body.trim()) {
      this.message.warning(this.translate.translate("Vui l\xF2ng nh\u1EADp n\u1ED9i dung"));
      return;
    }
    this.sending = true;
    try {
      await this.authMgmt.sendNotification({
        fcmToken: this.payload.fcmToken,
        title: this.payload.title.trim(),
        body: this.payload.body.trim()
      });
      this.message.success(this.translate.translate("G\u1EEDi th\xF4ng b\xE1o th\xE0nh c\xF4ng"));
      this.closeModal();
    } catch (e) {
      this.message.error(this.translate.translate("G\u1EEDi th\xF4ng b\xE1o th\u1EA5t b\u1EA1i"));
    } finally {
      this.sending = false;
      this.cdr.markForCheck();
    }
  }
};
_NotifyComponent.\u0275fac = function NotifyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NotifyComponent)();
};
_NotifyComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotifyComponent, selectors: [["tot-notify"]], decls: 26, vars: 34, consts: [["suffixIconSearch", ""], [1, "page-header"], [1, "search-card", 3, "nzTitle"], ["nz-row", "", "nzAlign", "middle", 3, "nzGutter"], ["nz-col", "", 3, "nzSpan"], [3, "nzSuffix"], ["type", "text", "nz-input", "", 3, "ngModelChange", "keyup.enter", "ngModel", "placeholder"], ["nz-col", "", 1, "search-actions", 3, "nzSpan"], ["nzType", "primary", 3, "click", 4, "nzSpaceItem"], [3, "click", 4, "nzSpaceItem"], [3, "queryParamsChange", "data", "columns", "loading", "title", "frontPagination", "pageIndex", "pageSize", "total"], ["totCell", "avatar"], ["totCell", "user"], ["totCell", "action"], [3, "nzVisibleChange", "nzOnCancel", "nzOnOk", "nzVisible", "nzTitle", "nzOkText", "nzCancelText", "nzOkLoading"], [4, "nzModalContent"], ["nz-icon", "", "nzType", "search"], ["nzType", "primary", 3, "click"], [3, "click"], ["nzIcon", "user", 3, "nzSrc", "nzSize"], [1, "user-cell"], [1, "sub-text"], ["nzType", "primary", "nzSize", "small", 3, "click"], ["nz-icon", "", "nzType", "notification"], ["nz-form", "", "nzLayout", "vertical"], ["nzRequired", ""], [3, "nzErrorTip"], ["name", "fcmToken", 2, "width", "100%", 3, "ngModelChange", "ngModel", "nzPlaceHolder", "nzLoading"], [3, "nzValue", "nzLabel", 4, "ngFor", "ngForOf"], ["class", "no-devices-warning", 4, "ngIf"], ["nz-input", "", "name", "title", "required", "", 3, "ngModelChange", "ngModel", "placeholder"], ["nz-input", "", "name", "body", "required", "", 3, "ngModelChange", "ngModel", "nzAutosize", "placeholder"], [3, "nzValue", "nzLabel"], [1, "no-devices-warning"], ["nz-icon", "", "nzType", "warning", "nzTheme", "outline"]], template: function NotifyComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "nz-card", 2);
    \u0275\u0275pipe(5, "transloco");
    \u0275\u0275elementStart(6, "div", 3)(7, "div", 4)(8, "nz-input-group", 5)(9, "input", 6);
    \u0275\u0275pipe(10, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function NotifyComponent_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchKeyword, $event) || (ctx.searchKeyword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function NotifyComponent_Template_input_keyup_enter_9_listener() {
      return ctx.search();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, NotifyComponent_ng_template_11_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 7)(14, "nz-space");
    \u0275\u0275template(15, NotifyComponent_tot_button_15_Template, 3, 3, "tot-button", 8)(16, NotifyComponent_tot_button_16_Template, 3, 3, "tot-button", 9);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "tot-table", 10);
    \u0275\u0275pipe(18, "transloco");
    \u0275\u0275listener("queryParamsChange", function NotifyComponent_Template_tot_table_queryParamsChange_17_listener($event) {
      return ctx.onQueryParamsChange($event);
    });
    \u0275\u0275template(19, NotifyComponent_ng_template_19_Template, 1, 2, "ng-template", 11)(20, NotifyComponent_ng_template_20_Template, 5, 2, "ng-template", 12)(21, NotifyComponent_ng_template_21_Template, 4, 3, "ng-template", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "nz-modal", 14);
    \u0275\u0275pipe(23, "transloco");
    \u0275\u0275pipe(24, "transloco");
    \u0275\u0275twoWayListener("nzVisibleChange", function NotifyComponent_Template_nz_modal_nzVisibleChange_22_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.isModalVisible, $event) || (ctx.isModalVisible = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function NotifyComponent_Template_nz_modal_nzOnCancel_22_listener() {
      return ctx.closeModal();
    })("nzOnOk", function NotifyComponent_Template_nz_modal_nzOnOk_22_listener() {
      return ctx.send();
    });
    \u0275\u0275template(25, NotifyComponent_ng_container_25_Template, 28, 35, "ng-container", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const suffixIconSearch_r11 = \u0275\u0275reference(12);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 21, "G\u1EEDi th\xF4ng b\xE1o FCM"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(5, 23, "T\xECm ki\u1EBFm ng\u01B0\u1EDDi d\xF9ng"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzGutter", \u0275\u0275pureFunction0(33, _c05));
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 18);
    \u0275\u0275advance();
    \u0275\u0275property("nzSuffix", suffixIconSearch_r11);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchKeyword);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(10, 25, "T\xECm theo Username ho\u1EB7c Email"));
    \u0275\u0275advance(4);
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance(4);
    \u0275\u0275property("data", ctx.users)("columns", ctx.userColumns)("loading", ctx.loading)("title", \u0275\u0275pipeBind1(18, 27, "Danh s\xE1ch ng\u01B0\u1EDDi d\xF9ng"))("frontPagination", false)("pageIndex", ctx.pageIndex)("pageSize", ctx.pageSize)("total", ctx.totalUsers);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("nzVisible", ctx.isModalVisible);
    \u0275\u0275property("nzTitle", ctx.modalTitle)("nzOkText", \u0275\u0275pipeBind1(23, 29, "G\u1EEDi"))("nzCancelText", \u0275\u0275pipeBind1(24, 31, "H\u1EE7y"))("nzOkLoading", ctx.sending);
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  FormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  RequiredValidator,
  NgModel,
  NgForm,
  NzTableModule,
  NzButtonModule,
  NzTransitionPatchDirective,
  NzIconModule,
  NzIconDirective,
  NzTagModule,
  NzSpaceModule,
  NzSpaceComponent,
  NzSpaceItemDirective,
  NzModalModule,
  NzModalComponent,
  NzModalContentDirective,
  NzSelectModule,
  NzOptionComponent,
  NzSelectComponent,
  NzInputModule,
  NzInputDirective,
  NzInputGroupComponent,
  NzAutosizeDirective,
  NzInputGroupWhitSuffixOrPrefixDirective,
  NzGridModule,
  NzColDirective,
  NzRowDirective,
  NzCardModule,
  NzCardComponent,
  NzFormModule,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormControlComponent,
  NzAvatarModule,
  NzAvatarComponent,
  TotButtonComponent,
  TotTableComponent,
  TotCellDirective,
  TranslocoModule,
  TranslocoPipe
], styles: ["\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.search-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.search-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n.user-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.sub-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #888;\n}\n.no-devices-warning[_ngcontent-%COMP%] {\n  color: #faad14;\n  font-size: 13px;\n  margin-top: 8px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n/*# sourceMappingURL=notify.component.css.map */"] });
var NotifyComponent = _NotifyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotifyComponent, [{
    type: Component,
    args: [{ selector: "tot-notify", standalone: true, imports: [
      CommonModule,
      FormsModule,
      NzTableModule,
      NzButtonModule,
      NzIconModule,
      NzTagModule,
      NzSpaceModule,
      NzModalModule,
      NzSelectModule,
      NzInputModule,
      NzGridModule,
      NzCardModule,
      NzFormModule,
      NzAvatarModule,
      TotButtonComponent,
      TotTableComponent,
      TotCellDirective,
      TranslocoModule
    ], template: `
    <div class="page-header">
      <h2>{{ 'G\u1EEDi th\xF4ng b\xE1o FCM' | transloco }}</h2>
    </div>

    <nz-card class="search-card" [nzTitle]="'T\xECm ki\u1EBFm ng\u01B0\u1EDDi d\xF9ng' | transloco">
      <div nz-row [nzGutter]="[16, 16]" nzAlign="middle">
        <div nz-col [nzSpan]="18">
          <nz-input-group [nzSuffix]="suffixIconSearch">
            <input 
              type="text" 
              nz-input 
              [(ngModel)]="searchKeyword" 
              [placeholder]="'T\xECm theo Username ho\u1EB7c Email' | transloco" 
              (keyup.enter)="search()" 
            />
          </nz-input-group>
          <ng-template #suffixIconSearch>
            <span nz-icon nzType="search"></span>
          </ng-template>
        </div>
        <div nz-col [nzSpan]="6" class="search-actions">
          <nz-space>
            <tot-button *nzSpaceItem nzType="primary" (click)="search()">{{ 'T\xECm ki\u1EBFm' | transloco }}</tot-button>
            <tot-button *nzSpaceItem (click)="resetSearch()">{{ '\u0110\u1EB7t l\u1EA1i' | transloco }}</tot-button>
          </nz-space>
        </div>
      </div>
    </nz-card>

    <tot-table 
      [data]="users" 
      [columns]="userColumns" 
      [loading]="loading" 
      [title]="'Danh s\xE1ch ng\u01B0\u1EDDi d\xF9ng' | transloco"
      [frontPagination]="false"
      [pageIndex]="pageIndex"
      [pageSize]="pageSize"
      [total]="totalUsers"
      (queryParamsChange)="onQueryParamsChange($event)"
    >
      <ng-template totCell="avatar" let-data>
        <nz-avatar [nzSrc]="data.avatarUrl" nzIcon="user" [nzSize]="40"></nz-avatar>
      </ng-template>

      <ng-template totCell="user" let-data>
        <div class="user-cell">
          <strong>{{ data.displayName }}</strong>
          <span class="sub-text">{{ data.username }}</span>
        </div>
      </ng-template>

      <ng-template totCell="action" let-data>
        <tot-button nzType="primary" nzSize="small" (click)="openSendModal(data)">
          <span nz-icon nzType="notification"></span> {{ 'G\u1EEDi th\xF4ng b\xE1o' | transloco }}
        </tot-button>
      </ng-template>
    </tot-table>

    <!-- Modal g\u1EEDi th\xF4ng b\xE1o FCM -->
    <nz-modal 
      [(nzVisible)]="isModalVisible" 
      [nzTitle]="modalTitle" 
      [nzOkText]="'G\u1EEDi' | transloco" 
      [nzCancelText]="'H\u1EE7y' | transloco"
      [nzOkLoading]="sending"
      (nzOnCancel)="closeModal()" 
      (nzOnOk)="send()"
    >
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Ch\u1ECDn thi\u1EBFt b\u1ECB nh\u1EADn' | transloco }}</nz-form-label>
            <nz-form-control [nzErrorTip]="'Vui l\xF2ng ch\u1ECDn thi\u1EBFt b\u1ECB nh\u1EADn' | transloco">
              <nz-select 
                [(ngModel)]="payload.fcmToken" 
                name="fcmToken" 
                [nzPlaceHolder]="'Vui l\xF2ng ch\u1ECDn thi\u1EBFt b\u1ECB' | transloco" 
                [nzLoading]="loadingTokens"
                style="width: 100%"
              >
                <nz-option 
                  *ngFor="let t of fcmTokens" 
                  [nzValue]="t.fcmToken" 
                  [nzLabel]="getDeviceLabel(t)"
                ></nz-option>
              </nz-select>
              <div *ngIf="!loadingTokens && fcmTokens.length === 0" class="no-devices-warning">
                <span nz-icon nzType="warning" nzTheme="outline"></span> 
                {{ 'Ng\u01B0\u1EDDi d\xF9ng n\xE0y ch\u01B0a \u0111\u0103ng k\xFD thi\u1EBFt b\u1ECB nh\u1EADn th\xF4ng b\xE1o n\xE0o.' | transloco }}
              </div>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Ti\xEAu \u0111\u1EC1 th\xF4ng b\xE1o' | transloco }}</nz-form-label>
            <nz-form-control [nzErrorTip]="'Vui l\xF2ng nh\u1EADp ti\xEAu \u0111\u1EC1' | transloco">
              <input 
                nz-input 
                [(ngModel)]="payload.title" 
                name="title" 
                [placeholder]="'Nh\u1EADp ti\xEAu \u0111\u1EC1' | transloco" 
                required 
              />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label nzRequired>{{ 'N\u1ED9i dung th\xF4ng b\xE1o' | transloco }}</nz-form-label>
            <nz-form-control [nzErrorTip]="'Vui l\xF2ng nh\u1EADp n\u1ED9i dung' | transloco">
              <textarea 
                nz-input 
                [(ngModel)]="payload.body" 
                name="body" 
                [nzAutosize]="{ minRows: 3, maxRows: 6 }" 
                [placeholder]="'Nh\u1EADp n\u1ED9i dung th\xF4ng b\xE1o' | transloco" 
                required
              ></textarea>
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>
  `, styles: ["/* angular:styles/component:css;33fa087d22e9625d5997abe7ce2fe82d8769f91bf7c5e84b2ada89978e9ce1bd;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/projects/tot/business-oidc/src/lib/notify/notify.component.ts */\n.page-header {\n  margin-bottom: 16px;\n}\n.search-card {\n  margin-bottom: 16px;\n}\n.search-actions {\n  display: flex;\n  justify-content: flex-end;\n}\n.user-cell {\n  display: flex;\n  flex-direction: column;\n}\n.sub-text {\n  font-size: 12px;\n  color: #888;\n}\n.no-devices-warning {\n  color: #faad14;\n  font-size: 13px;\n  margin-top: 8px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n/*# sourceMappingURL=notify.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotifyComponent, { className: "NotifyComponent", filePath: "projects/tot/business-oidc/src/lib/notify/notify.component.ts", lineNumber: 197 });
})();
export {
  AclListComponent,
  AuthManagementService,
  AuthorizeInfoComponent,
  ChangePasswordComponent,
  ClaimSyncComponent,
  NotifyComponent,
  RoleListComponent,
  UserListComponent
};
//# sourceMappingURL=chunk-ALVT6ABQ.js.map
