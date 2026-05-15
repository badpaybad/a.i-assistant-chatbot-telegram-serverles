import {
  NzDatePickerComponent,
  NzDatePickerModule,
  NzRangePickerComponent
} from "./chunk-N67LIGDP.js";
import {
  ADMIN_CLAIM,
  ALL_CLAIMS,
  CLAIMS_VERSION
} from "./chunk-F6TGNGA2.js";
import {
  AuthManagementService
} from "./chunk-WLTVB63T.js";
import {
  NzTableCellDirective,
  NzTableComponent,
  NzTableModule,
  NzTbodyComponent,
  NzThMeasureDirective,
  NzTheadComponent,
  NzTrDirective
} from "./chunk-MMWJDA4K.js";
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormModule
} from "./chunk-ZP2E5FZJ.js";
import "./chunk-DI76EDHS.js";
import "./chunk-5HQ52OJW.js";
import {
  NzModalComponent,
  NzModalContentDirective,
  NzModalModule,
  NzModalService
} from "./chunk-RO4CJ46N.js";
import "./chunk-STVBHBPJ.js";
import "./chunk-ZX5WOUY2.js";
import {
  NzColDirective,
  NzGridModule,
  NzRowDirective
} from "./chunk-VTSHLNMQ.js";
import {
  NzCardComponent,
  NzCardModule
} from "./chunk-TEVLHC4P.js";
import {
  NzInputDirective,
  NzInputModule
} from "./chunk-2IS6VVE2.js";
import {
  AppNotificationService,
  CommonModule,
  DatePipe,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgForm,
  NgModel,
  NzButtonComponent,
  NzButtonModule,
  NzIconDirective,
  NzIconModule,
  NzSpaceComponent,
  NzSpaceItemDirective,
  NzSpaceModule,
  NzTransitionPatchDirective,
  NzWaveDirective,
  TranslateModule,
  TranslatePipe,
  TranslateService,
  ɵNgNoValidate
} from "./chunk-W3A2S6TY.js";
import {
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2BQMWOA2.js";
import "./chunk-MYGOUE3E.js";

// src/app/modules/core-infra-auth/claim-sync/claim-sync.component.ts
var _c0 = () => [16, 16];
function ClaimSyncComponent_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275listener("click", function ClaimSyncComponent_button_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadClaims());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "T\xECm ki\u1EBFm"));
  }
}
function ClaimSyncComponent_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function ClaimSyncComponent_button_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.resetSearch());
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "\u0110\u1EB7t l\u1EA1i"));
  }
}
function ClaimSyncComponent_tr_51_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function ClaimSyncComponent_tr_51_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const data_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteClaim(data_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", (data_r6.name == null ? null : data_r6.name.toLowerCase()) === ctx_r2.ADMIN_CLAIM);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 2, "X\xF3a"));
  }
}
function ClaimSyncComponent_tr_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td")(9, "nz-space");
    \u0275\u0275template(10, ClaimSyncComponent_tr_51_button_10_Template, 3, 4, "button", 22);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r6.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 3, data_r6.createdAt, "short"));
  }
}
function ClaimSyncComponent_ng_container_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "form", 24)(2, "nz-form-item")(3, "nz-form-label", 25);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "nz-form-control")(7, "input", 26);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function ClaimSyncComponent_ng_container_54_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newClaim.name, $event) || (ctx_r2.newClaim.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "nz-form-item")(10, "nz-form-label", 25);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "nz-form-control")(14, "input", 27);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function ClaimSyncComponent_ng_container_54_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r7);
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
    this.translate = inject(TranslateService);
    this.version = CLAIMS_VERSION;
    this.claims = ALL_CLAIMS;
    this.claimsCount = ALL_CLAIMS.length;
    this.ADMIN_CLAIM = ADMIN_CLAIM;
    this.existingClaims = [];
    this.loading = false;
    this.isCreateModalVisible = false;
    this.newClaim = { name: "", description: "" };
    this.searchQuery = {
      keyword: "",
      dateRange: []
    };
  }
  ngOnInit() {
    this.loadClaims();
  }
  async loadClaims() {
    var _a, _b;
    this.loading = true;
    try {
      const params = {};
      if (this.searchQuery.keyword)
        params.keyword = this.searchQuery.keyword;
      if (this.searchQuery.dateRange && this.searchQuery.dateRange.length === 2) {
        params.startDate = (_a = this.searchQuery.dateRange[0]) == null ? void 0 : _a.toISOString();
        params.endDate = (_b = this.searchQuery.dateRange[1]) == null ? void 0 : _b.toISOString();
      }
      this.existingClaims = await this.authMgmt.getClaims(params);
    } catch (e) {
      this.notification.error(this.translate.instant("Th\u1EA5t b\u1EA1i"), this.translate.instant("Kh\xF4ng th\u1EC3 t\u1EA3i danh s\xE1ch quy\u1EC1n"));
    } finally {
      this.loading = false;
    }
  }
  resetSearch() {
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
      this.notification.success(this.translate.instant("Th\xE0nh c\xF4ng"), this.translate.instant("\u0110\u1ED3ng b\u1ED9 quy\u1EC1n th\xE0nh c\xF4ng"));
      this.loadClaims();
    } catch (e) {
      this.notification.error(this.translate.instant("Th\u1EA5t b\u1EA1i"), this.translate.instant("\u0110\u1ED3ng b\u1ED9 quy\u1EC1n th\u1EA5t b\u1EA1i"));
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
      this.notification.success(this.translate.instant("Th\xE0nh c\xF4ng"), this.translate.instant("Th\xEAm quy\u1EC1n th\xE0nh c\xF4ng"));
      this.isCreateModalVisible = false;
      this.loadClaims();
    } catch (e) {
      this.notification.error(this.translate.instant("Th\u1EA5t b\u1EA1i"), this.translate.instant("Th\xEAm quy\u1EC1n th\u1EA5t b\u1EA1i"));
    }
  }
  async deleteClaim(claim) {
    var _a;
    if (((_a = claim.name) == null ? void 0 : _a.toLowerCase()) === ADMIN_CLAIM) {
      this.notification.warning(this.translate.instant("C\u1EA3nh b\xE1o"), `${this.translate.instant("Kh\xF4ng th\u1EC3 x\xF3a quy\u1EC1n")} ${ADMIN_CLAIM}`);
      return;
    }
    this.modal.confirm({
      nzTitle: `${this.translate.instant("X\xE1c nh\u1EADn x\xF3a quy\u1EC1n")} ${claim.name}?`,
      nzContent: this.translate.instant("H\xE0nh \u0111\u1ED9ng n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c"),
      nzOkDanger: true,
      nzOnOk: async () => {
        var _a2;
        try {
          await this.authMgmt.deleteClaim(claim.id);
          this.notification.success(this.translate.instant("Th\xE0nh c\xF4ng"), this.translate.instant("X\xF3a quy\u1EC1n th\xE0nh c\xF4ng"));
          this.loadClaims();
        } catch (e) {
          this.notification.error(this.translate.instant("Th\u1EA5t b\u1EA1i"), ((_a2 = e.error) == null ? void 0 : _a2.message) || this.translate.instant("X\xF3a quy\u1EC1n th\u1EA5t b\u1EA1i"));
        }
      }
    });
  }
};
_ClaimSyncComponent.\u0275fac = function ClaimSyncComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ClaimSyncComponent)();
};
_ClaimSyncComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ClaimSyncComponent, selectors: [["app-claim-sync"]], decls: 55, vars: 47, consts: [["basicTable", ""], [1, "page-header"], ["nz-button", "", "nzType", "primary", 3, "click"], ["nz-icon", "", "nzType", "plus"], [1, "search-card", 3, "nzTitle"], ["nz-row", "", 3, "nzGutter"], ["nz-col", "", 3, "nzSpan"], ["nz-input", "", 3, "ngModelChange", "keyup.enter", "ngModel", "placeholder"], [2, "width", "100%", 3, "ngModelChange", "ngModel"], ["nz-col", "", 1, "search-actions", 3, "nzSpan"], ["nz-button", "", "nzType", "primary", 3, "click", 4, "nzSpaceItem"], ["nz-button", "", 3, "click", 4, "nzSpaceItem"], [2, "margin-bottom", "16px", 3, "nzTitle"], [1, "sync-actions"], ["nz-button", "", "nzType", "primary", 3, "click", "nzLoading"], ["nz-icon", "", "nzType", "sync"], [3, "nzData", "nzLoading"], ["nzWidth", "120px"], [4, "ngFor", "ngForOf"], [3, "nzVisibleChange", "nzOnCancel", "nzOnOk", "nzVisible", "nzTitle"], [4, "nzModalContent"], ["nz-button", "", 3, "click"], ["nz-button", "", "nzType", "primary", "nzDanger", "", "nzSize", "small", 3, "disabled", "click", 4, "nzSpaceItem"], ["nz-button", "", "nzType", "primary", "nzDanger", "", "nzSize", "small", 3, "click", "disabled"], ["nz-form", "", "nzLayout", "vertical"], [3, "nzSpan"], ["nz-input", "", "name", "name", 3, "ngModelChange", "ngModel", "placeholder"], ["nz-input", "", "name", "description", 3, "ngModelChange", "ngModel", "placeholder"]], template: function ClaimSyncComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 2);
    \u0275\u0275listener("click", function ClaimSyncComponent_Template_button_click_4_listener() {
      return ctx.showCreateModal();
    });
    \u0275\u0275element(5, "span", 3);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "nz-card", 4);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementStart(10, "div", 5)(11, "div", 6)(12, "input", 7);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function ClaimSyncComponent_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.keyword, $event) || (ctx.searchQuery.keyword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function ClaimSyncComponent_Template_input_keyup_enter_12_listener() {
      return ctx.loadClaims();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 6)(15, "nz-range-picker", 8);
    \u0275\u0275twoWayListener("ngModelChange", function ClaimSyncComponent_Template_nz_range_picker_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.dateRange, $event) || (ctx.searchQuery.dateRange = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 9)(17, "nz-space");
    \u0275\u0275template(18, ClaimSyncComponent_button_18_Template, 3, 3, "button", 10)(19, ClaimSyncComponent_button_19_Template, 3, 3, "button", 11);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(20, "nz-card", 12);
    \u0275\u0275pipe(21, "translate");
    \u0275\u0275elementStart(22, "p");
    \u0275\u0275text(23, "Version: ");
    \u0275\u0275elementStart(24, "strong");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275text(26, " | Count: ");
    \u0275\u0275elementStart(27, "strong");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 13)(30, "button", 14);
    \u0275\u0275listener("click", function ClaimSyncComponent_Template_button_click_30_listener() {
      return ctx.sync();
    });
    \u0275\u0275element(31, "span", 15);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "nz-table", 16, 0)(36, "thead")(37, "tr")(38, "th");
    \u0275\u0275text(39);
    \u0275\u0275pipe(40, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "th");
    \u0275\u0275text(42);
    \u0275\u0275pipe(43, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "th");
    \u0275\u0275text(45);
    \u0275\u0275pipe(46, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "th", 17);
    \u0275\u0275text(48);
    \u0275\u0275pipe(49, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(50, "tbody");
    \u0275\u0275template(51, ClaimSyncComponent_tr_51_Template, 11, 6, "tr", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "nz-modal", 19);
    \u0275\u0275pipe(53, "translate");
    \u0275\u0275twoWayListener("nzVisibleChange", function ClaimSyncComponent_Template_nz_modal_nzVisibleChange_52_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.isCreateModalVisible, $event) || (ctx.isCreateModalVisible = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function ClaimSyncComponent_Template_nz_modal_nzOnCancel_52_listener() {
      return ctx.isCreateModalVisible = false;
    })("nzOnOk", function ClaimSyncComponent_Template_nz_modal_nzOnOk_52_listener() {
      return ctx.createClaim();
    });
    \u0275\u0275template(54, ClaimSyncComponent_ng_container_54_Template, 16, 16, "ng-container", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const basicTable_r8 = \u0275\u0275reference(35);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 24, "Quy\u1EC1n"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 26, "Th\xEAm m\u1EDBi"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(9, 28, "T\xECm ki\u1EBFm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzGutter", \u0275\u0275pureFunction0(46, _c0));
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 10);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.keyword);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(13, 30, "T\xEAn quy\u1EC1n, m\xF4 t\u1EA3"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 8);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.dateRange);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance(4);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(21, 32, "\u0110\u1ED3ng b\u1ED9 quy\u1EC1n"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.version);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.claimsCount);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzLoading", ctx.loading);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(33, 34, "\u0110\u1ED3ng b\u1ED9"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("nzData", ctx.existingClaims)("nzLoading", ctx.loading);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(40, 36, "Quy\u1EC1n"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(43, 38, "M\xF4 t\u1EA3"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(46, 40, "Ng\xE0y t\u1EA1o"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(49, 42, "H\xE0nh \u0111\u1ED9ng"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", basicTable_r8.data);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("nzVisible", ctx.isCreateModalVisible);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(53, 44, "Th\xEAm m\u1EDBi"));
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
  NzButtonModule,
  NzButtonComponent,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzIconModule,
  NzIconDirective,
  NzCardModule,
  NzCardComponent,
  NzTableModule,
  NzTableComponent,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTheadComponent,
  NzTbodyComponent,
  NzTrDirective,
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
  TranslateModule,
  DatePipe,
  TranslatePipe
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
      TranslateModule
    ], template: `
    <div class="page-header">
      <h2>{{ 'Quy\u1EC1n' | translate }}</h2>
      <button nz-button nzType="primary" (click)="showCreateModal()">
        <span nz-icon nzType="plus"></span> {{ 'Th\xEAm m\u1EDBi' | translate }}
      </button>
    </div>

    <nz-card [nzTitle]="'T\xECm ki\u1EBFm' | translate" class="search-card">
      <div nz-row [nzGutter]="[16, 16]">
        <div nz-col [nzSpan]="10">
          <input nz-input [(ngModel)]="searchQuery.keyword" [placeholder]="'T\xEAn quy\u1EC1n, m\xF4 t\u1EA3' | translate" (keyup.enter)="loadClaims()" />
        </div>
        <div nz-col [nzSpan]="8">
          <nz-range-picker [(ngModel)]="searchQuery.dateRange" style="width: 100%"></nz-range-picker>
        </div>
        <div nz-col [nzSpan]="6" class="search-actions">
          <nz-space>
            <button *nzSpaceItem nz-button nzType="primary" (click)="loadClaims()">{{ 'T\xECm ki\u1EBFm' | translate }}</button>
            <button *nzSpaceItem nz-button (click)="resetSearch()">{{ '\u0110\u1EB7t l\u1EA1i' | translate }}</button>
          </nz-space>
        </div>
      </div>
    </nz-card>

    <nz-card [nzTitle]="'\u0110\u1ED3ng b\u1ED9 quy\u1EC1n' | translate" style="margin-bottom: 16px;">
      <p>Version: <strong>{{ version }}</strong> | Count: <strong>{{ claimsCount }}</strong></p>
      <div class="sync-actions">
        <button nz-button nzType="primary" (click)="sync()" [nzLoading]="loading">
          <span nz-icon nzType="sync"></span> {{ '\u0110\u1ED3ng b\u1ED9' | translate }}
        </button>
      </div>
    </nz-card>

    <nz-table #basicTable [nzData]="existingClaims" [nzLoading]="loading">
      <thead>
        <tr>
          <th>{{ 'Quy\u1EC1n' | translate }}</th>
          <th>{{ 'M\xF4 t\u1EA3' | translate }}</th>
          <th>{{ 'Ng\xE0y t\u1EA1o' | translate }}</th>
          <th nzWidth="120px">{{ 'H\xE0nh \u0111\u1ED9ng' | translate }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of basicTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.description }}</td>
          <td>{{ data.createdAt | date:'short' }}</td>
          <td>
            <nz-space>
              <button *nzSpaceItem nz-button nzType="primary" nzDanger nzSize="small" 
                      [disabled]="data.name?.toLowerCase() === ADMIN_CLAIM"
                      (click)="deleteClaim(data)">{{ 'X\xF3a' | translate }}</button>
            </nz-space>
          </td>
        </tr>
      </tbody>
    </nz-table>

    <nz-modal [(nzVisible)]="isCreateModalVisible" [nzTitle]="'Th\xEAm m\u1EDBi' | translate" (nzOnCancel)="isCreateModalVisible = false" (nzOnOk)="createClaim()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'Quy\u1EC1n' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="newClaim.name" name="name" [placeholder]="'Quy\u1EC1n' | translate" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label [nzSpan]="null">{{ 'M\xF4 t\u1EA3' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="newClaim.description" name="description" [placeholder]="'M\xF4 t\u1EA3' | translate" />
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>
  `, styles: ["/* angular:styles/component:css;3d6c087fef029db6e15f3bdfeb8f2744819840f4d2bfb03dd85b6d0cde160fe1;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/src/app/modules/core-infra-auth/claim-sync/claim-sync.component.ts */\n.search-card {\n  margin-bottom: 16px;\n}\n.search-actions {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n.sync-actions {\n  margin-top: 8px;\n}\n/*# sourceMappingURL=claim-sync.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ClaimSyncComponent, { className: "ClaimSyncComponent", filePath: "src/app/modules/core-infra-auth/claim-sync/claim-sync.component.ts", lineNumber: 129 });
})();
export {
  ClaimSyncComponent
};
//# sourceMappingURL=chunk-2SJFWFMC.js.map
