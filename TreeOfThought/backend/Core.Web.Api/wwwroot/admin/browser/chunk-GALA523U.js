import {
  ADMIN_CLAIM,
  ADMIN_ROLE
} from "./chunk-F6TGNGA2.js";
import {
  AppSelectComponent
} from "./chunk-57N72VMR.js";
import {
  AuthManagementService
} from "./chunk-YFIQBVX6.js";
import {
  NzCardComponent,
  NzCardModule
} from "./chunk-DTXUN2ZB.js";
import {
  NzModalComponent,
  NzModalContentDirective,
  NzModalModule,
  NzModalService
} from "./chunk-HETG7ZKO.js";
import {
  NzTagComponent,
  NzTagModule
} from "./chunk-HI5JUCTF.js";
import {
  NzSelectModule,
  NzTableCellDirective,
  NzTableComponent,
  NzTableModule,
  NzTbodyComponent,
  NzThMeasureDirective,
  NzTheadComponent,
  NzTrDirective
} from "./chunk-7CHXQ4AO.js";
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormModule
} from "./chunk-RT7X43H5.js";
import "./chunk-RGWSEG6V.js";
import {
  NzColDirective,
  NzGridModule,
  NzRowDirective
} from "./chunk-U7OJRUBM.js";
import "./chunk-ZABGJN5V.js";
import {
  NzInputDirective,
  NzInputModule
} from "./chunk-JPMEC3PG.js";
import {
  CommonModule,
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
  NzMessageService,
  NzSpaceComponent,
  NzSpaceItemDirective,
  NzSpaceModule,
  NzTransitionPatchDirective,
  NzWaveDirective,
  TranslateModule,
  TranslatePipe,
  TranslateService,
  ɵNgNoValidate
} from "./chunk-OCLTPTCJ.js";
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
} from "./chunk-6BQPXFZE.js";
import "./chunk-653SOEEV.js";

// src/app/modules/core-infra-auth/role-list/role-list.component.ts
var _c0 = () => [16, 16];
function RoleListComponent_button_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275listener("click", function RoleListComponent_button_19_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadRoles());
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
function RoleListComponent_button_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function RoleListComponent_button_20_Template_button_click_0_listener() {
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
function RoleListComponent_tr_38_nz_tag_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-tag", 24);
    \u0275\u0275listener("nzOnClose", function RoleListComponent_tr_38_nz_tag_8_Template_nz_tag_nzOnClose_0_listener() {
      const claim_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const data_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeClaim(data_r8, claim_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const claim_r7 = ctx.$implicit;
    const data_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("nzMode", (data_r8.name == null ? null : data_r8.name.toLowerCase()) === ctx_r2.ADMIN_ROLE.toLowerCase() && (claim_r7.name == null ? null : claim_r7.name.toLowerCase()) === ctx_r2.ADMIN_CLAIM.toLowerCase() ? "default" : "closeable");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", claim_r7.name, " ");
  }
}
function RoleListComponent_tr_38_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function RoleListComponent_tr_38_button_13_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const data_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal(data_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "S\u1EEDa"));
  }
}
function RoleListComponent_tr_38_button_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function RoleListComponent_tr_38_button_14_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const data_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteRole(data_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", (data_r8.name == null ? null : data_r8.name.toLowerCase()) === ctx_r2.ADMIN_ROLE.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 2, "X\xF3a"));
  }
}
function RoleListComponent_tr_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "div", 19);
    \u0275\u0275template(8, RoleListComponent_tr_38_nz_tag_8_Template, 2, 2, "nz-tag", 20);
    \u0275\u0275elementStart(9, "button", 21);
    \u0275\u0275listener("click", function RoleListComponent_tr_38_Template_button_click_9_listener() {
      const data_r8 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showClaimModal(data_r8));
    });
    \u0275\u0275element(10, "span", 3);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "td")(12, "nz-space");
    \u0275\u0275template(13, RoleListComponent_tr_38_button_13_Template, 3, 3, "button", 22)(14, RoleListComponent_tr_38_button_14_Template, 3, 4, "button", 23);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r8 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(data_r8.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r8.description);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", data_r8.claims);
  }
}
function RoleListComponent_ng_container_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "form", 27)(2, "nz-form-item")(3, "nz-form-label", 28);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "nz-form-control")(7, "input", 29);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function RoleListComponent_ng_container_41_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.roleForm.name, $event) || (ctx_r2.roleForm.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "nz-form-item")(10, "nz-form-label");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "nz-form-control")(14, "input", 30);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function RoleListComponent_ng_container_41_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.roleForm.description, $event) || (ctx_r2.roleForm.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "nz-form-item")(17, "nz-form-label");
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "nz-form-control")(21, "app-select", 31);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function RoleListComponent_ng_container_41_Template_app_select_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r11);
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
function RoleListComponent_ng_container_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-select", 32);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function RoleListComponent_ng_container_44_Template_app_select_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r12);
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
var RoleListComponent = class _RoleListComponent {
  constructor() {
    this.authMgmt = inject(AuthManagementService);
    this.message = inject(NzMessageService);
    this.modal = inject(NzModalService);
    this.translate = inject(TranslateService);
    this.ADMIN_ROLE = ADMIN_ROLE;
    this.ADMIN_CLAIM = ADMIN_CLAIM;
    this.roles = [];
    this.loading = false;
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
  }
  ngOnInit() {
    this.loadRoles();
  }
  async loadRoles() {
    this.loading = true;
    try {
      const params = {};
      if (this.searchQuery.keyword)
        params.keyword = this.searchQuery.keyword;
      if (this.searchQuery.claimIds && this.searchQuery.claimIds.length > 0) {
        params.claimIds = this.searchQuery.claimIds;
      }
      this.roles = await this.authMgmt.getRoles(params);
    } catch (e) {
      this.message.error(this.translate.instant("L\u1ED7i khi t\u1EA3i vai tr\xF2"));
    } finally {
      this.loading = false;
    }
  }
  resetSearch() {
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
    this.editingRole = role;
    this.roleForm = {
      name: role.name,
      description: role.description,
      claimIds: role.claims?.map((c) => c.id) || []
    };
    this.isRoleModalVisible = true;
  }
  async saveRole() {
    if (!this.roleForm.name) {
      this.message.warning(this.translate.instant("Vui l\xF2ng nh\u1EADp t\xEAn vai tr\xF2"));
      return;
    }
    try {
      if (this.editingRole) {
        await this.authMgmt.updateRole(this.editingRole.id, this.roleForm);
        await this.authMgmt.assignClaimsToRole(this.editingRole.id, this.roleForm.claimIds);
        this.message.success(this.translate.instant("C\u1EADp nh\u1EADt vai tr\xF2 th\xE0nh c\xF4ng"));
      } else {
        const newRole = await this.authMgmt.createRole(this.roleForm);
        if (newRole && newRole.id) {
          await this.authMgmt.assignClaimsToRole(newRole.id, this.roleForm.claimIds);
        }
        this.message.success(this.translate.instant("Th\xEAm vai tr\xF2 th\xE0nh c\xF4ng"));
      }
      this.isRoleModalVisible = false;
      this.loadRoles();
    } catch (e) {
      this.message.error(this.translate.instant("L\u1ED7i khi l\u01B0u vai tr\xF2"));
    }
  }
  showClaimModal(role) {
    this.selectedRole = role;
    this.selectedClaimIds = role.claims?.map((c) => c.id) || [];
    this.isClaimModalVisible = true;
  }
  async assignClaim() {
    try {
      await this.authMgmt.assignClaimsToRole(this.selectedRole.id, this.selectedClaimIds);
      this.message.success(this.translate.instant("C\u1EADp nh\u1EADt quy\u1EC1n th\xE0nh c\xF4ng"));
      this.isClaimModalVisible = false;
      this.loadRoles();
    } catch (e) {
      this.message.error(this.translate.instant("C\u1EADp nh\u1EADt quy\u1EC1n th\u1EA5t b\u1EA1i"));
    }
  }
  async removeClaim(role, claim) {
    this.modal.confirm({
      nzTitle: `${this.translate.instant("X\xE1c nh\u1EADn")}?`,
      nzContent: `${this.translate.instant("X\xF3a")} ${claim.name} ${this.translate.instant("kh\u1ECFi")} ${role.name}?`,
      nzOnOk: async () => {
        try {
          await this.authMgmt.removeClaimFromRole(role.id, claim.id);
          this.message.success(this.translate.instant("X\xF3a quy\u1EC1n th\xE0nh c\xF4ng"));
          this.loadRoles();
        } catch (e) {
          this.message.error(this.translate.instant("X\xF3a quy\u1EC1n th\u1EA5t b\u1EA1i"));
        }
      }
    });
  }
  async deleteRole(role) {
    if (role.name?.toLowerCase() === ADMIN_ROLE.toLowerCase()) {
      this.message.warning(this.translate.instant(`Kh\xF4ng th\u1EC3 x\xF3a vai tr\xF2 ${ADMIN_ROLE}`));
      return;
    }
    this.modal.confirm({
      nzTitle: `${this.translate.instant("X\xE1c nh\u1EADn x\xF3a vai tr\xF2")} ${role.name}?`,
      nzContent: this.translate.instant("H\xE0nh \u0111\u1ED9ng n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c"),
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.authMgmt.deleteRole(role.id);
          this.message.success(this.translate.instant("X\xF3a vai tr\xF2 th\xE0nh c\xF4ng"));
          this.loadRoles();
        } catch (e) {
          this.message.error(e.error?.message || this.translate.instant("X\xF3a vai tr\xF2 th\u1EA5t b\u1EA1i"));
        }
      }
    });
  }
  static {
    this.\u0275fac = function RoleListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RoleListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RoleListComponent, selectors: [["app-role-list"]], decls: 45, vars: 45, consts: [["basicTable", ""], [1, "page-header"], ["nz-button", "", "nzType", "primary", 3, "click"], ["nz-icon", "", "nzType", "plus"], [1, "search-card", 3, "nzTitle"], ["nz-row", "", 3, "nzGutter"], ["nz-col", "", 3, "nzSpan"], ["nz-input", "", 3, "ngModelChange", "keyup.enter", "ngModel", "placeholder"], ["apiUrl", "/api/AuthManagement/claims", "mode", "multiple", 3, "ngModelChange", "valueChange", "placeholder", "ngModel"], ["nz-col", "", 1, "search-actions", 3, "nzSpan"], ["nz-button", "", "nzType", "primary", 3, "click", 4, "nzSpaceItem"], ["nz-button", "", 3, "click", 4, "nzSpaceItem"], [3, "nzData", "nzLoading"], ["nzWidth", "200px"], ["nzWidth", "150px"], [4, "ngFor", "ngForOf"], [3, "nzVisibleChange", "nzOnCancel", "nzOnOk", "nzVisible", "nzTitle"], [4, "nzModalContent"], ["nz-button", "", 3, "click"], [1, "claim-tags"], ["nzColor", "blue", 3, "nzMode", "nzOnClose", 4, "ngFor", "ngForOf"], ["nz-button", "", "nzType", "dashed", "nzSize", "small", 3, "click"], ["nz-button", "", "nzType", "primary", "nzSize", "small", 3, "click", 4, "nzSpaceItem"], ["nz-button", "", "nzType", "primary", "nzDanger", "", "nzSize", "small", 3, "disabled", "click", 4, "nzSpaceItem"], ["nzColor", "blue", 3, "nzOnClose", "nzMode"], ["nz-button", "", "nzType", "primary", "nzSize", "small", 3, "click"], ["nz-button", "", "nzType", "primary", "nzDanger", "", "nzSize", "small", 3, "click", "disabled"], ["nz-form", "", "nzLayout", "vertical"], ["nzRequired", ""], ["nz-input", "", "name", "name", 3, "ngModelChange", "ngModel", "placeholder", "disabled"], ["nz-input", "", "name", "description", 3, "ngModelChange", "ngModel", "placeholder"], ["apiUrl", "/api/AuthManagement/claims", "mode", "multiple", "name", "claimIds", 3, "ngModelChange", "placeholder", "ngModel"], ["apiUrl", "/api/AuthManagement/claims", "mode", "multiple", 3, "ngModelChange", "placeholder", "ngModel"]], template: function RoleListComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "h2");
        \u0275\u0275text(2);
        \u0275\u0275pipe(3, "translate");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "button", 2);
        \u0275\u0275listener("click", function RoleListComponent_Template_button_click_4_listener() {
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
        \u0275\u0275twoWayListener("ngModelChange", function RoleListComponent_Template_input_ngModelChange_12_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.searchQuery.keyword, $event) || (ctx.searchQuery.keyword = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("keyup.enter", function RoleListComponent_Template_input_keyup_enter_12_listener() {
          return ctx.loadRoles();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "div", 6)(15, "app-select", 8);
        \u0275\u0275pipe(16, "translate");
        \u0275\u0275twoWayListener("ngModelChange", function RoleListComponent_Template_app_select_ngModelChange_15_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.searchQuery.claimIds, $event) || (ctx.searchQuery.claimIds = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("valueChange", function RoleListComponent_Template_app_select_valueChange_15_listener() {
          return ctx.loadRoles();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "div", 9)(18, "nz-space");
        \u0275\u0275template(19, RoleListComponent_button_19_Template, 3, 3, "button", 10)(20, RoleListComponent_button_20_Template, 3, 3, "button", 11);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(21, "nz-table", 12, 0)(23, "thead")(24, "tr")(25, "th", 13);
        \u0275\u0275text(26);
        \u0275\u0275pipe(27, "translate");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "th");
        \u0275\u0275text(29);
        \u0275\u0275pipe(30, "translate");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "th");
        \u0275\u0275text(32);
        \u0275\u0275pipe(33, "translate");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "th", 14);
        \u0275\u0275text(35);
        \u0275\u0275pipe(36, "translate");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(37, "tbody");
        \u0275\u0275template(38, RoleListComponent_tr_38_Template, 15, 3, "tr", 15);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(39, "nz-modal", 16);
        \u0275\u0275pipe(40, "translate");
        \u0275\u0275twoWayListener("nzVisibleChange", function RoleListComponent_Template_nz_modal_nzVisibleChange_39_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.isRoleModalVisible, $event) || (ctx.isRoleModalVisible = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("nzOnCancel", function RoleListComponent_Template_nz_modal_nzOnCancel_39_listener() {
          return ctx.isRoleModalVisible = false;
        })("nzOnOk", function RoleListComponent_Template_nz_modal_nzOnOk_39_listener() {
          return ctx.saveRole();
        });
        \u0275\u0275template(41, RoleListComponent_ng_container_41_Template, 23, 22, "ng-container", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "nz-modal", 16);
        \u0275\u0275pipe(43, "translate");
        \u0275\u0275twoWayListener("nzVisibleChange", function RoleListComponent_Template_nz_modal_nzVisibleChange_42_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.isClaimModalVisible, $event) || (ctx.isClaimModalVisible = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("nzOnCancel", function RoleListComponent_Template_nz_modal_nzOnCancel_42_listener() {
          return ctx.isClaimModalVisible = false;
        })("nzOnOk", function RoleListComponent_Template_nz_modal_nzOnOk_42_listener() {
          return ctx.assignClaim();
        });
        \u0275\u0275template(44, RoleListComponent_ng_container_44_Template, 3, 4, "ng-container", 17);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const basicTable_r13 = \u0275\u0275reference(22);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 22, "Vai tr\xF2"));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 24, "Th\xEAm m\u1EDBi"), " ");
        \u0275\u0275advance(2);
        \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(9, 26, "T\xECm ki\u1EBFm"));
        \u0275\u0275advance(2);
        \u0275\u0275property("nzGutter", \u0275\u0275pureFunction0(44, _c0));
        \u0275\u0275advance();
        \u0275\u0275property("nzSpan", 8);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.keyword);
        \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(13, 28, "T\xEAn vai tr\xF2, m\xF4 t\u1EA3"));
        \u0275\u0275advance(2);
        \u0275\u0275property("nzSpan", 10);
        \u0275\u0275advance();
        \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(16, 30, "Quy\u1EC1n"));
        \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.claimIds);
        \u0275\u0275advance(2);
        \u0275\u0275property("nzSpan", 6);
        \u0275\u0275advance(4);
        \u0275\u0275property("nzData", ctx.roles)("nzLoading", ctx.loading);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(27, 32, "Vai tr\xF2"));
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(30, 34, "M\xF4 t\u1EA3"));
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(33, 36, "Quy\u1EC1n"));
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(36, 38, "H\xE0nh \u0111\u1ED9ng"));
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", basicTable_r13.data);
        \u0275\u0275advance();
        \u0275\u0275twoWayProperty("nzVisible", ctx.isRoleModalVisible);
        \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(40, 40, ctx.editingRole ? "S\u1EEDa vai tr\xF2" : "Th\xEAm m\u1EDBi"));
        \u0275\u0275advance(3);
        \u0275\u0275twoWayProperty("nzVisible", ctx.isClaimModalVisible);
        \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(43, 42, "Quy\u1EC1n"));
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
      NzTableComponent,
      NzTableCellDirective,
      NzThMeasureDirective,
      NzTheadComponent,
      NzTbodyComponent,
      NzTrDirective,
      NzButtonModule,
      NzButtonComponent,
      NzTransitionPatchDirective,
      NzWaveDirective,
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
      TranslateModule,
      AppSelectComponent,
      TranslatePipe
    ], styles: ["\n.search-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.search-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n.claim-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\nnz-tag[_ngcontent-%COMP%] {\n  margin-bottom: 4px;\n}\n/*# sourceMappingURL=role-list.component.css.map */"] });
  }
};
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
      TranslateModule,
      AppSelectComponent
    ], template: `
    <div class="page-header">
      <h2>{{ 'Vai tr\xF2' | translate }}</h2>
      <button nz-button nzType="primary" (click)="showCreateModal()">
        <span nz-icon nzType="plus"></span> {{ 'Th\xEAm m\u1EDBi' | translate }}
      </button>
    </div>

    <nz-card class="search-card" [nzTitle]="'T\xECm ki\u1EBFm' | translate">
      <div nz-row [nzGutter]="[16, 16]">
        <div nz-col [nzSpan]="8">
          <input nz-input [(ngModel)]="searchQuery.keyword" [placeholder]="'T\xEAn vai tr\xF2, m\xF4 t\u1EA3' | translate" (keyup.enter)="loadRoles()" />
        </div>
        <div nz-col [nzSpan]="10">
          <app-select
            apiUrl="/api/AuthManagement/claims"
            [placeholder]="'Quy\u1EC1n' | translate"
            mode="multiple"
            [(ngModel)]="searchQuery.claimIds"
            (valueChange)="loadRoles()"
          ></app-select>
        </div>
        <div nz-col [nzSpan]="6" class="search-actions">
          <nz-space>
            <button *nzSpaceItem nz-button nzType="primary" (click)="loadRoles()">{{ 'T\xECm ki\u1EBFm' | translate }}</button>
            <button *nzSpaceItem nz-button (click)="resetSearch()">{{ '\u0110\u1EB7t l\u1EA1i' | translate }}</button>
          </nz-space>
        </div>
      </div>
    </nz-card>

    <nz-table #basicTable [nzData]="roles" [nzLoading]="loading">
      <thead>
        <tr>
          <th nzWidth="200px">{{ 'Vai tr\xF2' | translate }}</th>
          <th>{{ 'M\xF4 t\u1EA3' | translate }}</th>
          <th>{{ 'Quy\u1EC1n' | translate }}</th>
          <th nzWidth="150px">{{ 'H\xE0nh \u0111\u1ED9ng' | translate }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of basicTable.data">
          <td><strong>{{ data.name }}</strong></td>
          <td>{{ data.description }}</td>
          <td>
            <div class="claim-tags">
              <nz-tag *ngFor="let claim of data.claims" nzColor="blue" 
                      [nzMode]="(data.name?.toLowerCase() === ADMIN_ROLE.toLowerCase() && claim.name?.toLowerCase() === ADMIN_CLAIM.toLowerCase()) ? 'default' : 'closeable'" 
                      (nzOnClose)="removeClaim(data, claim)">
                {{ claim.name }}
              </nz-tag>
              <button nz-button nzType="dashed" nzSize="small" (click)="showClaimModal(data)">
                <span nz-icon nzType="plus"></span>
              </button>
            </div>
          </td>
          <td>
            <nz-space>
              <button *nzSpaceItem nz-button nzType="primary" nzSize="small" (click)="showEditModal(data)">{{ 'S\u1EEDa' | translate }}</button>
              <button *nzSpaceItem nz-button nzType="primary" nzDanger nzSize="small" 
                      [disabled]="data.name?.toLowerCase() === ADMIN_ROLE.toLowerCase()"
                      (click)="deleteRole(data)">{{ 'X\xF3a' | translate }}</button>
            </nz-space>
          </td>
        </tr>
      </tbody>
    </nz-table>

    <!-- Modal Th\xEAm/S\u1EEDa Vai tr\xF2 -->
    <nz-modal [(nzVisible)]="isRoleModalVisible" [nzTitle]="(editingRole ? 'S\u1EEDa vai tr\xF2' : 'Th\xEAm m\u1EDBi') | translate" (nzOnCancel)="isRoleModalVisible = false" (nzOnOk)="saveRole()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Vai tr\xF2' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="roleForm.name" name="name" [placeholder]="'Vai tr\xF2' | translate" [disabled]="!!editingRole && editingRole.name?.toLowerCase() === ADMIN_ROLE.toLowerCase()" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>{{ 'M\xF4 t\u1EA3' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="roleForm.description" name="description" [placeholder]="'M\xF4 t\u1EA3' | translate" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>{{ 'Quy\u1EC1n' | translate }}</nz-form-label>
            <nz-form-control>
              <app-select
                apiUrl="/api/AuthManagement/claims"
                [placeholder]="'Ch\u1ECDn quy\u1EC1n' | translate"
                mode="multiple"
                [(ngModel)]="roleForm.claimIds"
                name="claimIds"
              ></app-select>
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>

    <!-- Modal g\xE1n nhanh (Gi\u1EEF nguy\xEAn) -->
    <nz-modal [(nzVisible)]="isClaimModalVisible" [nzTitle]="'Quy\u1EC1n' | translate" (nzOnCancel)="isClaimModalVisible = false" (nzOnOk)="assignClaim()">
      <ng-container *nzModalContent>
        <app-select
          apiUrl="/api/AuthManagement/claims"
          [placeholder]="'Vui l\xF2ng ch\u1ECDn' | translate"
          mode="multiple"
          [(ngModel)]="selectedClaimIds"
        ></app-select>
      </ng-container>
    </nz-modal>
  `, styles: ["/* angular:styles/component:css;c1be7f8108080fb46e612cf4a6008186d841b4d04e7d60fb3d8e4ffe93bbf65f;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/src/app/modules/core-infra-auth/role-list/role-list.component.ts */\n.search-card {\n  margin-bottom: 16px;\n}\n.search-actions {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n.claim-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\nnz-tag {\n  margin-bottom: 4px;\n}\n/*# sourceMappingURL=role-list.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RoleListComponent, { className: "RoleListComponent", filePath: "src/app/modules/core-infra-auth/role-list/role-list.component.ts", lineNumber: 172 });
})();
export {
  RoleListComponent
};
//# sourceMappingURL=chunk-GALA523U.js.map
