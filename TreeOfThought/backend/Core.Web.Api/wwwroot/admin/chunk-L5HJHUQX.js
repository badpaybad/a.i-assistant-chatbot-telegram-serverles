import {
  AppSelectComponent
} from "./chunk-LPRNKFLI.js";
import {
  AuthManagementService
} from "./chunk-ODG5SUFC.js";
import {
  NzAvatarComponent,
  NzAvatarModule
} from "./chunk-J2JH5WAC.js";
import {
  NzCardComponent,
  NzCardModule
} from "./chunk-7RCWUD7A.js";
import {
  NzDatePickerComponent,
  NzDatePickerModule,
  NzRangePickerComponent
} from "./chunk-IZR5ZOPP.js";
import {
  NzModalComponent,
  NzModalContentDirective,
  NzModalModule,
  NzModalService
} from "./chunk-BEUTVBBR.js";
import {
  NzTagComponent,
  NzTagModule
} from "./chunk-LMDRMSXW.js";
import {
  NzCheckboxComponent,
  NzCheckboxModule,
  NzOptionComponent,
  NzSelectComponent,
  NzSelectModule,
  NzTableCellDirective,
  NzTableComponent,
  NzTableModule,
  NzTbodyComponent,
  NzThMeasureDirective,
  NzTheadComponent,
  NzTrDirective
} from "./chunk-F5V5UTFR.js";
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormModule
} from "./chunk-AWLOCL4K.js";
import "./chunk-SPKOZRRR.js";
import {
  NzColDirective,
  NzGridModule,
  NzRowDirective
} from "./chunk-7NOM6P4G.js";
import "./chunk-KMAEKJDE.js";
import {
  NzInputDirective,
  NzInputGroupComponent,
  NzInputGroupWhitSuffixOrPrefixDirective,
  NzInputModule
} from "./chunk-OCV5YBAO.js";
import {
  CommonModule,
  DatePipe,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgForm,
  NgIf,
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
} from "./chunk-LJSHPVT7.js";
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
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2BQMWOA2.js";
import "./chunk-MYGOUE3E.js";

// src/app/modules/core-infra-auth/user-list/user-list.component.ts
var _c0 = () => [16, 16];
function UserListComponent_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function UserListComponent_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showCreateModal());
    });
    \u0275\u0275element(1, "span", 29);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "Th\xEAm ng\u01B0\u1EDDi d\xF9ng"), " ");
  }
}
function UserListComponent_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function UserListComponent_button_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadUsers());
    });
    \u0275\u0275element(1, "span", 31);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "\u0110\u1ED3ng b\u1ED9"), " ");
  }
}
function UserListComponent_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 32);
  }
}
function UserListComponent_button_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function UserListComponent_button_42_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadUsers());
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
function UserListComponent_button_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 30);
    \u0275\u0275listener("click", function UserListComponent_button_43_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
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
function UserListComponent_tr_76_nz_tag_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-tag", 45);
    \u0275\u0275listener("nzOnClose", function UserListComponent_tr_76_nz_tag_19_Template_nz_tag_nzOnClose_0_listener() {
      const role_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const data_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeRole(data_r8, role_r11));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r11 = ctx.$implicit;
    const data_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("nzMode", (data_r8.username == null ? null : data_r8.username.toLowerCase()) === "admin" && (role_r11.name == null ? null : role_r11.name.toLowerCase()) === "admin" ? "default" : "closeable");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", role_r11.name, " ");
  }
}
function UserListComponent_tr_76_nz_tag_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-tag", 46);
    \u0275\u0275listener("nzOnClose", function UserListComponent_tr_76_nz_tag_23_Template_nz_tag_nzOnClose_0_listener() {
      const claim_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const data_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.removeClaim(data_r8, claim_r13));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const claim_r13 = ctx.$implicit;
    const data_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("nzMode", (data_r8.username == null ? null : data_r8.username.toLowerCase()) === "admin" && (claim_r13.name == null ? null : claim_r13.name.toLowerCase()) === "admin" ? "default" : "closeable");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", claim_r13.name, " ");
  }
}
function UserListComponent_tr_76_button_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 47);
    \u0275\u0275listener("click", function UserListComponent_tr_76_button_34_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r14);
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
function UserListComponent_tr_76_button_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function UserListComponent_tr_76_button_35_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const data_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteUser(data_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("disabled", (data_r8.username == null ? null : data_r8.username.toLowerCase()) === "admin");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 2, "X\xF3a"));
  }
}
function UserListComponent_tr_76_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 33);
    \u0275\u0275listener("click", function UserListComponent_tr_76_Template_div_click_2_listener() {
      const data_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      const avatarInput_r9 = \u0275\u0275reference(78);
      avatarInput_r9.click();
      return \u0275\u0275resetView(ctx_r2.selectedUserForAvatar = data_r8);
    });
    \u0275\u0275element(3, "nz-avatar", 34);
    \u0275\u0275elementStart(4, "div", 35);
    \u0275\u0275element(5, "span", 36);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "td")(7, "div", 37)(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 38);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "nz-tag", 39);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "td");
    \u0275\u0275template(19, UserListComponent_tr_76_nz_tag_19_Template, 2, 2, "nz-tag", 40);
    \u0275\u0275elementStart(20, "button", 41);
    \u0275\u0275listener("click", function UserListComponent_tr_76_Template_button_click_20_listener() {
      const data_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showRoleModal(data_r8));
    });
    \u0275\u0275element(21, "span", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "td");
    \u0275\u0275template(23, UserListComponent_tr_76_nz_tag_23_Template, 2, 2, "nz-tag", 42);
    \u0275\u0275elementStart(24, "button", 41);
    \u0275\u0275listener("click", function UserListComponent_tr_76_Template_button_click_24_listener() {
      const data_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showClaimModal(data_r8));
    });
    \u0275\u0275element(25, "span", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "td");
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "td");
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "td")(33, "nz-space");
    \u0275\u0275template(34, UserListComponent_tr_76_button_34_Template, 3, 3, "button", 43)(35, UserListComponent_tr_76_button_35_Template, 3, 4, "button", 44);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r8 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275property("nzSrc", data_r8.avatarUrl)("nzSize", 48);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(data_r8.displayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r8.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r8.email);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzColor", data_r8.isEmailVerified ? "success" : "warning");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(17, 11, data_r8.isEmailVerified ? "\u0110\xE3 x\xE1c minh" : "\u0110ang ch\u1EDD"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", data_r8.roles);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", data_r8.directClaims);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(28, 13, data_r8.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(31, 16, data_r8.updatedAt, "dd/MM/yyyy HH:mm"));
  }
}
function UserListComponent_ng_container_81_nz_form_item_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-form-item")(1, "nz-form-label", 50);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "nz-form-control")(5, "input", 58);
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_81_nz_form_item_8_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r17);
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
function UserListComponent_ng_container_81_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "form", 49)(2, "nz-form-item")(3, "nz-form-label", 50);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "nz-form-control")(7, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_81_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.userForm.username, $event) || (ctx_r2.userForm.username = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(8, UserListComponent_ng_container_81_nz_form_item_8_Template, 6, 4, "nz-form-item", 52);
    \u0275\u0275elementStart(9, "nz-form-item")(10, "nz-form-label", 50);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "nz-form-control")(14, "input", 53);
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_81_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.userForm.displayName, $event) || (ctx_r2.userForm.displayName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "nz-form-item")(16, "nz-form-label", 50);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "nz-form-control")(20, "input", 54);
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_81_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.userForm.email, $event) || (ctx_r2.userForm.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "nz-form-item")(22, "nz-form-control")(23, "label", 55);
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_81_Template_label_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.userForm.isEmailVerified, $event) || (ctx_r2.userForm.isEmailVerified = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "nz-form-item")(27, "nz-form-label");
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "nz-form-control")(31, "app-select", 56);
    \u0275\u0275pipe(32, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_81_Template_app_select_ngModelChange_31_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.userForm.roleIds, $event) || (ctx_r2.userForm.roleIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "nz-form-item")(34, "nz-form-label");
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "nz-form-control")(38, "app-select", 57);
    \u0275\u0275pipe(39, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_81_Template_app_select_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r16);
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
function UserListComponent_ng_container_84_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-select", 59);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_84_Template_app_select_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r18);
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
function UserListComponent_ng_container_87_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "app-select", 60);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_ng_container_87_Template_app_select_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r19);
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
    this.translate = inject(TranslateService);
    this.users = [];
    this.loading = false;
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
  }
  ngOnInit() {
    this.loadUsers();
  }
  async loadUsers() {
    var _a, _b;
    this.loading = true;
    try {
      const params = {};
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
      this.users = await this.authMgmt.getUsers(params);
    } catch (e) {
      this.message.error(this.translate.instant("L\u1ED7i khi t\u1EA3i ng\u01B0\u1EDDi d\xF9ng"));
    } finally {
      this.loading = false;
    }
  }
  resetSearch() {
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
      this.message.warning(this.translate.instant("Vui l\xF2ng nh\u1EADp \u0111\u1EA7y \u0111\u1EE7 th\xF4ng tin b\u1EAFt bu\u1ED9c"));
      return;
    }
    try {
      if (this.editingUser) {
        await this.authMgmt.updateUser(this.editingUser.id, this.userForm);
        await this.authMgmt.assignRolesToUser(this.editingUser.id, this.userForm.roleIds);
        await this.authMgmt.assignClaimsToUser(this.editingUser.id, this.userForm.claimIds);
        this.message.success(this.translate.instant("C\u1EADp nh\u1EADt ng\u01B0\u1EDDi d\xF9ng th\xE0nh c\xF4ng"));
      } else {
        const newUser = await this.authMgmt.createUser(this.userForm);
        if (newUser && newUser.id) {
          await this.authMgmt.assignRolesToUser(newUser.id, this.userForm.roleIds);
          await this.authMgmt.assignClaimsToUser(newUser.id, this.userForm.claimIds);
        }
        this.message.success(this.translate.instant("Th\xEAm ng\u01B0\u1EDDi d\xF9ng th\xE0nh c\xF4ng"));
      }
      this.isUserModalVisible = false;
      this.loadUsers();
    } catch (e) {
      this.message.error(this.translate.instant("L\u1ED7i khi l\u01B0u ng\u01B0\u1EDDi d\xF9ng"));
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
      this.message.success(this.translate.instant("C\u1EADp nh\u1EADt vai tr\xF2 th\xE0nh c\xF4ng"));
      this.isRoleModalVisible = false;
      this.loadUsers();
    } catch (e) {
      this.message.error(this.translate.instant("C\u1EADp nh\u1EADt vai tr\xF2 th\u1EA5t b\u1EA1i"));
    }
  }
  async removeRole(user, role) {
    this.modal.confirm({
      nzTitle: `${this.translate.instant("X\xE1c nh\u1EADn")}?`,
      nzContent: `${this.translate.instant("X\xF3a")} ${role.name} ${this.translate.instant("kh\u1ECFi")} ${user.username}?`,
      nzOnOk: async () => {
        try {
          await this.authMgmt.removeRoleFromUser(user.id, role.id);
          this.message.success(this.translate.instant("X\xF3a vai tr\xF2 th\xE0nh c\xF4ng"));
          this.loadUsers();
        } catch (e) {
          this.message.error(this.translate.instant("X\xF3a vai tr\xF2 th\u1EA5t b\u1EA1i"));
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
      this.message.success(this.translate.instant("C\u1EADp nh\u1EADt quy\u1EC1n th\xE0nh c\xF4ng"));
      this.isClaimModalVisible = false;
      this.loadUsers();
    } catch (e) {
      this.message.error(this.translate.instant("C\u1EADp nh\u1EADt quy\u1EC1n th\u1EA5t b\u1EA1i"));
    }
  }
  async removeClaim(user, claim) {
    this.modal.confirm({
      nzTitle: `${this.translate.instant("X\xE1c nh\u1EADn")}?`,
      nzContent: `${this.translate.instant("X\xF3a")} ${claim.name} ${this.translate.instant("kh\u1ECFi")} ${user.username}?`,
      nzOnOk: async () => {
        try {
          await this.authMgmt.removeClaimFromUser(user.id, claim.id);
          this.message.success(this.translate.instant("X\xF3a quy\u1EC1n th\xE0nh c\xF4ng"));
          this.loadUsers();
        } catch (e) {
          this.message.error(this.translate.instant("X\xF3a quy\u1EC1n th\u1EA5t b\u1EA1i"));
        }
      }
    });
  }
  async deleteUser(user) {
    var _a;
    if (((_a = user.username) == null ? void 0 : _a.toLowerCase()) === "admin") {
      this.message.warning(this.translate.instant("Kh\xF4ng th\u1EC3 x\xF3a t\xE0i kho\u1EA3n admin"));
      return;
    }
    this.modal.confirm({
      nzTitle: `${this.translate.instant("X\xE1c nh\u1EADn x\xF3a ng\u01B0\u1EDDi d\xF9ng")} ${user.username}?`,
      nzContent: this.translate.instant("H\xE0nh \u0111\u1ED9ng n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c"),
      nzOkDanger: true,
      nzOnOk: async () => {
        var _a2;
        try {
          await this.authMgmt.deleteUser(user.id);
          this.message.success(this.translate.instant("X\xF3a ng\u01B0\u1EDDi d\xF9ng th\xE0nh c\xF4ng"));
          this.loadUsers();
        } catch (e) {
          this.message.error(((_a2 = e.error) == null ? void 0 : _a2.message) || this.translate.instant("X\xF3a ng\u01B0\u1EDDi d\xF9ng th\u1EA5t b\u1EA1i"));
        }
      }
    });
  }
  async onFileSelected(event) {
    const file = event.target.files[0];
    if (!file || !this.selectedUserForAvatar)
      return;
    const loadingMsg = this.message.loading(this.translate.instant("\u0110ang t\u1EA3i l\xEAn..."), { nzDuration: 0 }).messageId;
    try {
      const result = await this.authMgmt.uploadAvatar(this.selectedUserForAvatar.id, file);
      this.selectedUserForAvatar.avatarUrl = result.url;
      this.message.success(this.translate.instant("C\u1EADp nh\u1EADt \u1EA3nh \u0111\u1EA1i di\u1EC7n th\xE0nh c\xF4ng"));
      const index = this.users.findIndex((u) => u.id === this.selectedUserForAvatar.id);
      if (index !== -1) {
        this.users[index].avatarUrl = result.url;
      }
    } catch (e) {
      this.message.error(this.translate.instant("L\u1ED7i khi t\u1EA3i l\xEAn \u1EA3nh \u0111\u1EA1i di\u1EC7n"));
    } finally {
      this.message.remove(loadingMsg);
      event.target.value = "";
    }
  }
};
_UserListComponent.\u0275fac = function UserListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UserListComponent)();
};
_UserListComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserListComponent, selectors: [["app-user-list"]], decls: 88, vars: 92, consts: [["suffixIconSearch", ""], ["basicTable", ""], ["avatarInput", ""], [1, "page-header"], ["nz-button", "", "nzType", "primary", 3, "click", 4, "nzSpaceItem"], ["nz-button", "", 3, "click", 4, "nzSpaceItem"], [1, "search-card", 3, "nzTitle"], ["nz-row", "", 3, "nzGutter"], ["nz-col", "", 3, "nzSpan"], [3, "nzSuffix"], ["type", "text", "nz-input", "", 3, "ngModelChange", "keyup.enter", "ngModel", "placeholder"], ["nzAllowClear", "", 2, "width", "100%", 3, "ngModelChange", "ngModel", "nzPlaceHolder"], [3, "nzValue", "nzLabel"], ["apiUrl", "/api/AuthManagement/roles", "mode", "multiple", 3, "ngModelChange", "valueChange", "placeholder", "ngModel"], ["apiUrl", "/api/AuthManagement/claims", "mode", "multiple", 3, "ngModelChange", "valueChange", "placeholder", "ngModel"], [2, "width", "100%", 3, "ngModelChange", "ngModel"], ["nzValue", "google", "nzLabel", "Google"], ["nzValue", "ms", "nzLabel", "Microsoft"], ["nzValue", "facebook", "nzLabel", "Facebook"], ["nz-input", "", 3, "ngModelChange", "keyup.enter", "ngModel", "placeholder"], ["nz-col", "", 1, "search-actions", 3, "nzSpan"], [3, "nzData", "nzLoading"], ["nzWidth", "80px"], ["nzWidth", "150px"], [4, "ngFor", "ngForOf"], ["type", "file", "accept", "image/*", 2, "display", "none", 3, "change"], [3, "nzVisibleChange", "nzOnCancel", "nzOnOk", "nzVisible", "nzTitle"], [4, "nzModalContent"], ["nz-button", "", "nzType", "primary", 3, "click"], ["nz-icon", "", "nzType", "plus"], ["nz-button", "", 3, "click"], ["nz-icon", "", "nzType", "reload"], ["nz-icon", "", "nzType", "search"], [1, "avatar-wrapper", 3, "click"], ["nzIcon", "user", 1, "user-avatar", 3, "nzSrc", "nzSize"], [1, "avatar-mask"], ["nz-icon", "", "nzType", "camera"], [1, "user-cell"], [1, "sub-text"], [3, "nzColor"], ["nzColor", "blue", 3, "nzMode", "nzOnClose", 4, "ngFor", "ngForOf"], ["nz-button", "", "nzType", "dashed", "nzSize", "small", 3, "click"], ["nzColor", "purple", 3, "nzMode", "nzOnClose", 4, "ngFor", "ngForOf"], ["nz-button", "", "nzType", "primary", "nzSize", "small", 3, "click", 4, "nzSpaceItem"], ["nz-button", "", "nzType", "primary", "nzDanger", "", "nzSize", "small", 3, "disabled", "click", 4, "nzSpaceItem"], ["nzColor", "blue", 3, "nzOnClose", "nzMode"], ["nzColor", "purple", 3, "nzOnClose", "nzMode"], ["nz-button", "", "nzType", "primary", "nzSize", "small", 3, "click"], ["nz-button", "", "nzType", "primary", "nzDanger", "", "nzSize", "small", 3, "click", "disabled"], ["nz-form", "", "nzLayout", "vertical"], ["nzRequired", ""], ["nz-input", "", "name", "username", 3, "ngModelChange", "ngModel", "disabled"], [4, "ngIf"], ["nz-input", "", "name", "displayName", 3, "ngModelChange", "ngModel"], ["nz-input", "", "name", "email", 3, "ngModelChange", "ngModel"], ["nz-checkbox", "", "name", "isEmailVerified", 3, "ngModelChange", "ngModel"], ["apiUrl", "/api/AuthManagement/roles", "mode", "multiple", "name", "roleIds", 3, "ngModelChange", "placeholder", "ngModel"], ["apiUrl", "/api/AuthManagement/claims", "mode", "multiple", "name", "claimIds", 3, "ngModelChange", "placeholder", "ngModel"], ["nz-input", "", "type", "password", "name", "password", 3, "ngModelChange", "ngModel"], ["apiUrl", "/api/AuthManagement/roles", "mode", "multiple", 3, "ngModelChange", "placeholder", "ngModel"], ["apiUrl", "/api/AuthManagement/claims", "mode", "multiple", 3, "ngModelChange", "placeholder", "ngModel"]], template: function UserListComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "nz-space");
    \u0275\u0275template(5, UserListComponent_button_5_Template, 4, 3, "button", 4)(6, UserListComponent_button_6_Template, 4, 3, "button", 5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "nz-card", 6);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementStart(9, "div", 7)(10, "div", 8)(11, "nz-input-group", 9)(12, "input", 10);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.keyword, $event) || (ctx.searchQuery.keyword = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function UserListComponent_Template_input_keyup_enter_12_listener() {
      return ctx.loadUsers();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, UserListComponent_ng_template_14_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 8)(17, "nz-select", 11);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_nz_select_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.isEmailVerified, $event) || (ctx.searchQuery.isEmailVerified = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275element(19, "nz-option", 12);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275element(21, "nz-option", 12);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 8)(24, "app-select", 13);
    \u0275\u0275pipe(25, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_app_select_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.roleIds, $event) || (ctx.searchQuery.roleIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("valueChange", function UserListComponent_Template_app_select_valueChange_24_listener() {
      return ctx.loadUsers();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 8)(27, "app-select", 14);
    \u0275\u0275pipe(28, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_app_select_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.claimIds, $event) || (ctx.searchQuery.claimIds = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("valueChange", function UserListComponent_Template_app_select_valueChange_27_listener() {
      return ctx.loadUsers();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 8)(30, "nz-range-picker", 15);
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_nz_range_picker_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.dateRange, $event) || (ctx.searchQuery.dateRange = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 8)(32, "nz-select", 11);
    \u0275\u0275pipe(33, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_nz_select_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.ssoProvider, $event) || (ctx.searchQuery.ssoProvider = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275element(34, "nz-option", 16)(35, "nz-option", 17)(36, "nz-option", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 8)(38, "input", 19);
    \u0275\u0275pipe(39, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function UserListComponent_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery.ssoId, $event) || (ctx.searchQuery.ssoId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function UserListComponent_Template_input_keyup_enter_38_listener() {
      return ctx.loadUsers();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div", 20)(41, "nz-space");
    \u0275\u0275template(42, UserListComponent_button_42_Template, 3, 3, "button", 4)(43, UserListComponent_button_43_Template, 3, 3, "button", 5);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(44, "nz-table", 21, 1)(46, "thead")(47, "tr")(48, "th", 22);
    \u0275\u0275text(49);
    \u0275\u0275pipe(50, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "th");
    \u0275\u0275text(52);
    \u0275\u0275pipe(53, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "th");
    \u0275\u0275text(55);
    \u0275\u0275pipe(56, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "th");
    \u0275\u0275text(58);
    \u0275\u0275pipe(59, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "th");
    \u0275\u0275text(61);
    \u0275\u0275pipe(62, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "th");
    \u0275\u0275text(64);
    \u0275\u0275pipe(65, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "th");
    \u0275\u0275text(67);
    \u0275\u0275pipe(68, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "th");
    \u0275\u0275text(70);
    \u0275\u0275pipe(71, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "th", 23);
    \u0275\u0275text(73);
    \u0275\u0275pipe(74, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(75, "tbody");
    \u0275\u0275template(76, UserListComponent_tr_76_Template, 36, 19, "tr", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(77, "input", 25, 2);
    \u0275\u0275listener("change", function UserListComponent_Template_input_change_77_listener($event) {
      return ctx.onFileSelected($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "nz-modal", 26);
    \u0275\u0275pipe(80, "translate");
    \u0275\u0275twoWayListener("nzVisibleChange", function UserListComponent_Template_nz_modal_nzVisibleChange_79_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.isUserModalVisible, $event) || (ctx.isUserModalVisible = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function UserListComponent_Template_nz_modal_nzOnCancel_79_listener() {
      return ctx.isUserModalVisible = false;
    })("nzOnOk", function UserListComponent_Template_nz_modal_nzOnOk_79_listener() {
      return ctx.saveUser();
    });
    \u0275\u0275template(81, UserListComponent_ng_container_81_Template, 40, 32, "ng-container", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "nz-modal", 26);
    \u0275\u0275pipe(83, "translate");
    \u0275\u0275twoWayListener("nzVisibleChange", function UserListComponent_Template_nz_modal_nzVisibleChange_82_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.isRoleModalVisible, $event) || (ctx.isRoleModalVisible = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function UserListComponent_Template_nz_modal_nzOnCancel_82_listener() {
      return ctx.isRoleModalVisible = false;
    })("nzOnOk", function UserListComponent_Template_nz_modal_nzOnOk_82_listener() {
      return ctx.assignRole();
    });
    \u0275\u0275template(84, UserListComponent_ng_container_84_Template, 3, 4, "ng-container", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "nz-modal", 26);
    \u0275\u0275pipe(86, "translate");
    \u0275\u0275twoWayListener("nzVisibleChange", function UserListComponent_Template_nz_modal_nzVisibleChange_85_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.isClaimModalVisible, $event) || (ctx.isClaimModalVisible = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function UserListComponent_Template_nz_modal_nzOnCancel_85_listener() {
      return ctx.isClaimModalVisible = false;
    })("nzOnOk", function UserListComponent_Template_nz_modal_nzOnOk_85_listener() {
      return ctx.assignClaim();
    });
    \u0275\u0275template(87, UserListComponent_ng_container_87_Template, 3, 4, "ng-container", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const suffixIconSearch_r20 = \u0275\u0275reference(15);
    const basicTable_r21 = \u0275\u0275reference(45);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 47, "Danh s\xE1ch ng\u01B0\u1EDDi d\xF9ng"));
    \u0275\u0275advance(5);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(8, 49, "T\xECm ki\u1EBFm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzGutter", \u0275\u0275pureFunction0(91, _c0));
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance();
    \u0275\u0275property("nzSuffix", suffixIconSearch_r20);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.keyword);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(13, 51, "Username, DisplayName, Email"));
    \u0275\u0275advance(4);
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.isEmailVerified);
    \u0275\u0275property("nzPlaceHolder", \u0275\u0275pipeBind1(18, 53, "Tr\u1EA1ng th\xE1i"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzValue", true)("nzLabel", \u0275\u0275pipeBind1(20, 55, "\u0110\xE3 x\xE1c minh"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzValue", false)("nzLabel", \u0275\u0275pipeBind1(22, 57, "\u0110ang ch\u1EDD"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(25, 59, "Vai tr\xF2"));
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.roleIds);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance();
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(28, 61, "Quy\u1EC1n"));
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.claimIds);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 8);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.dateRange);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 4);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.ssoProvider);
    \u0275\u0275property("nzPlaceHolder", \u0275\u0275pipeBind1(33, 63, "SSO Provider"));
    \u0275\u0275advance(5);
    \u0275\u0275property("nzSpan", 4);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery.ssoId);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(39, 65, "SSO ID"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 8);
    \u0275\u0275advance(4);
    \u0275\u0275property("nzData", ctx.users)("nzLoading", ctx.loading);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(50, 67, "Avatar"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(53, 69, "Ng\u01B0\u1EDDi d\xF9ng"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(56, 71, "Email"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(59, 73, "Tr\u1EA1ng th\xE1i"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(62, 75, "Vai tr\xF2"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(65, 77, "Quy\u1EC1n"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(68, 79, "Ng\xE0y t\u1EA1o"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(71, 81, "C\u1EADp nh\u1EADt"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(74, 83, "H\xE0nh \u0111\u1ED9ng"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", basicTable_r21.data);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("nzVisible", ctx.isUserModalVisible);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(80, 85, ctx.editingUser ? "S\u1EEDa ng\u01B0\u1EDDi d\xF9ng" : "Th\xEAm ng\u01B0\u1EDDi d\xF9ng"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("nzVisible", ctx.isRoleModalVisible);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(83, 87, "Vai tr\xF2"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("nzVisible", ctx.isClaimModalVisible);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(86, 89, "Quy\u1EC1n"));
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
  AppSelectComponent,
  TranslateModule,
  DatePipe,
  TranslatePipe
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
      AppSelectComponent,
      TranslateModule
    ], template: `
    <div class="page-header">
      <h2>{{ 'Danh s\xE1ch ng\u01B0\u1EDDi d\xF9ng' | translate }}</h2>
      <nz-space>
        <button *nzSpaceItem nz-button nzType="primary" (click)="showCreateModal()">
          <span nz-icon nzType="plus"></span> {{ 'Th\xEAm ng\u01B0\u1EDDi d\xF9ng' | translate }}
        </button>
        <button *nzSpaceItem nz-button (click)="loadUsers()">
          <span nz-icon nzType="reload"></span> {{ '\u0110\u1ED3ng b\u1ED9' | translate }}
        </button>
      </nz-space>
    </div>

    <nz-card class="search-card" [nzTitle]="'T\xECm ki\u1EBFm' | translate">
      <div nz-row [nzGutter]="[16, 16]">
        <div nz-col [nzSpan]="6">
          <nz-input-group [nzSuffix]="suffixIconSearch">
            <input type="text" nz-input [(ngModel)]="searchQuery.keyword" [placeholder]="'Username, DisplayName, Email' | translate" (keyup.enter)="loadUsers()" />
          </nz-input-group>
          <ng-template #suffixIconSearch>
            <span nz-icon nzType="search"></span>
          </ng-template>
        </div>
        <div nz-col [nzSpan]="6">
          <nz-select [(ngModel)]="searchQuery.isEmailVerified" [nzPlaceHolder]="'Tr\u1EA1ng th\xE1i' | translate" nzAllowClear style="width: 100%">
            <nz-option [nzValue]="true" [nzLabel]="'\u0110\xE3 x\xE1c minh' | translate"></nz-option>
            <nz-option [nzValue]="false" [nzLabel]="'\u0110ang ch\u1EDD' | translate"></nz-option>
          </nz-select>
        </div>
        <div nz-col [nzSpan]="6">
          <app-select
            apiUrl="/api/AuthManagement/roles"
            [placeholder]="'Vai tr\xF2' | translate"
            mode="multiple"
            [(ngModel)]="searchQuery.roleIds"
            (valueChange)="loadUsers()"
          ></app-select>
        </div>
        <div nz-col [nzSpan]="6">
          <app-select
            apiUrl="/api/AuthManagement/claims"
            [placeholder]="'Quy\u1EC1n' | translate"
            mode="multiple"
            [(ngModel)]="searchQuery.claimIds"
            (valueChange)="loadUsers()"
          ></app-select>
        </div>
        <div nz-col [nzSpan]="8">
          <nz-range-picker [(ngModel)]="searchQuery.dateRange" style="width: 100%"></nz-range-picker>
        </div>
        <div nz-col [nzSpan]="4">
          <nz-select [(ngModel)]="searchQuery.ssoProvider" [nzPlaceHolder]="'SSO Provider' | translate" nzAllowClear style="width: 100%">
            <nz-option nzValue="google" nzLabel="Google"></nz-option>
            <nz-option nzValue="ms" nzLabel="Microsoft"></nz-option>
            <nz-option nzValue="facebook" nzLabel="Facebook"></nz-option>
          </nz-select>
        </div>
        <div nz-col [nzSpan]="4">
          <input nz-input [(ngModel)]="searchQuery.ssoId" [placeholder]="'SSO ID' | translate" (keyup.enter)="loadUsers()" />
        </div>
        <div nz-col [nzSpan]="8" class="search-actions">
          <nz-space>
            <button *nzSpaceItem nz-button nzType="primary" (click)="loadUsers()">{{ 'T\xECm ki\u1EBFm' | translate }}</button>
            <button *nzSpaceItem nz-button (click)="resetSearch()">{{ '\u0110\u1EB7t l\u1EA1i' | translate }}</button>
          </nz-space>
        </div>
      </div>
    </nz-card>

    <nz-table #basicTable [nzData]="users" [nzLoading]="loading">
      <thead>
        <tr>
          <th nzWidth="80px">{{ 'Avatar' | translate }}</th>
          <th>{{ 'Ng\u01B0\u1EDDi d\xF9ng' | translate }}</th>
          <th>{{ 'Email' | translate }}</th>
          <th>{{ 'Tr\u1EA1ng th\xE1i' | translate }}</th>
          <th>{{ 'Vai tr\xF2' | translate }}</th>
          <th>{{ 'Quy\u1EC1n' | translate }}</th>
          <th>{{ 'Ng\xE0y t\u1EA1o' | translate }}</th>
          <th>{{ 'C\u1EADp nh\u1EADt' | translate }}</th>
          <th nzWidth="150px">{{ 'H\xE0nh \u0111\u1ED9ng' | translate }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of basicTable.data">
          <td>
            <div class="avatar-wrapper" (click)="avatarInput.click(); selectedUserForAvatar = data">
              <nz-avatar [nzSrc]="data.avatarUrl" nzIcon="user" [nzSize]="48" class="user-avatar"></nz-avatar>
              <div class="avatar-mask">
                <span nz-icon nzType="camera"></span>
              </div>
            </div>
          </td>
          <td>
            <div class="user-cell">
              <strong>{{ data.displayName }}</strong>
              <span class="sub-text">{{ data.username }}</span>
            </div>
          </td>
          <td>{{ data.email }}</td>
          <td>
            <nz-tag [nzColor]="data.isEmailVerified ? 'success' : 'warning'">
              {{ (data.isEmailVerified ? '\u0110\xE3 x\xE1c minh' : '\u0110ang ch\u1EDD') | translate }}
            </nz-tag>
          </td>
          <td>
            <nz-tag *ngFor="let role of data.roles" nzColor="blue" 
                    [nzMode]="(data.username?.toLowerCase() === 'admin' && role.name?.toLowerCase() === 'admin') ? 'default' : 'closeable'" 
                    (nzOnClose)="removeRole(data, role)">
              {{ role.name }}
            </nz-tag>
            <button nz-button nzType="dashed" nzSize="small" (click)="showRoleModal(data)">
              <span nz-icon nzType="plus"></span>
            </button>
          </td>
          <td>
            <nz-tag *ngFor="let claim of data.directClaims" nzColor="purple" 
                    [nzMode]="(data.username?.toLowerCase() === 'admin' && claim.name?.toLowerCase() === 'admin') ? 'default' : 'closeable'" 
                    (nzOnClose)="removeClaim(data, claim)">
              {{ claim.name }}
            </nz-tag>
            <button nz-button nzType="dashed" nzSize="small" (click)="showClaimModal(data)">
              <span nz-icon nzType="plus"></span>
            </button>
          </td>
          <td>{{ data.createdAt | date:'dd/MM/yyyy HH:mm' }}</td>
          <td>{{ data.updatedAt | date:'dd/MM/yyyy HH:mm' }}</td>
          <td>
            <nz-space>
              <button *nzSpaceItem nz-button nzType="primary" nzSize="small" (click)="showEditModal(data)">{{ 'S\u1EEDa' | translate }}</button>
              <button *nzSpaceItem nz-button nzType="primary" nzDanger nzSize="small" 
                      [disabled]="data.username?.toLowerCase() === 'admin'"
                      (click)="deleteUser(data)">{{ 'X\xF3a' | translate }}</button>
            </nz-space>
          </td>
        </tr>
      </tbody>
    </nz-table>

    <input type="file" #avatarInput style="display: none" (change)="onFileSelected($event)" accept="image/*" />

    <!-- Modal Th\xEAm/S\u1EEDa Ng\u01B0\u1EDDi d\xF9ng -->
    <nz-modal [(nzVisible)]="isUserModalVisible" [nzTitle]="(editingUser ? 'S\u1EEDa ng\u01B0\u1EDDi d\xF9ng' : 'Th\xEAm ng\u01B0\u1EDDi d\xF9ng') | translate" (nzOnCancel)="isUserModalVisible = false" (nzOnOk)="saveUser()">
      <ng-container *nzModalContent>
        <form nz-form nzLayout="vertical">
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'T\xEAn \u0111\u0103ng nh\u1EADp' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="userForm.username" name="username" [disabled]="!!editingUser" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item *ngIf="!editingUser">
            <nz-form-label nzRequired>{{ 'M\u1EADt kh\u1EA9u' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input type="password" [(ngModel)]="userForm.password" name="password" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'T\xEAn hi\u1EC3n th\u1ECB' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="userForm.displayName" name="displayName" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label nzRequired>{{ 'Email' | translate }}</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="userForm.email" name="email" />
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-control>
              <label nz-checkbox [(ngModel)]="userForm.isEmailVerified" name="isEmailVerified">{{ '\u0110\xE3 x\xE1c minh email' | translate }}</label>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>{{ 'Vai tr\xF2' | translate }}</nz-form-label>
            <nz-form-control>
              <app-select
                apiUrl="/api/AuthManagement/roles"
                [placeholder]="'Ch\u1ECDn vai tr\xF2' | translate"
                mode="multiple"
                [(ngModel)]="userForm.roleIds"
                name="roleIds"
              ></app-select>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>{{ 'Quy\u1EC1n tr\u1EF1c ti\u1EBFp' | translate }}</nz-form-label>
            <nz-form-control>
              <app-select
                apiUrl="/api/AuthManagement/claims"
                [placeholder]="'Ch\u1ECDn quy\u1EC1n' | translate"
                mode="multiple"
                [(ngModel)]="userForm.claimIds"
                name="claimIds"
              ></app-select>
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>

    <!-- C\xE1c Modal g\xE1n nhanh -->
    <nz-modal [(nzVisible)]="isRoleModalVisible" [nzTitle]="'Vai tr\xF2' | translate" (nzOnCancel)="isRoleModalVisible = false" (nzOnOk)="assignRole()">
      <ng-container *nzModalContent>
        <app-select
          apiUrl="/api/AuthManagement/roles"
          [placeholder]="'Vui l\xF2ng ch\u1ECDn' | translate"
          mode="multiple"
          [(ngModel)]="selectedRoleIds"
        ></app-select>
      </ng-container>
    </nz-modal>

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
  `, styles: ["/* angular:styles/component:css;86100bbd9790674ad4dc8b2db5e831b9421d449ed6ac30a7b6ab39229fef823f;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/src/app/modules/core-infra-auth/user-list/user-list.component.ts */\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.search-card {\n  margin-bottom: 16px;\n}\n.search-actions {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n.user-cell {\n  display: flex;\n  flex-direction: column;\n}\n.sub-text {\n  font-size: 12px;\n  color: #888;\n}\nnz-tag {\n  margin-bottom: 4px;\n}\n.avatar-wrapper {\n  position: relative;\n  cursor: pointer;\n  display: inline-block;\n  border-radius: 50%;\n  overflow: hidden;\n  width: 48px;\n  height: 48px;\n}\n.avatar-mask {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.4);\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  transition: opacity 0.3s;\n  font-size: 18px;\n}\n.avatar-wrapper:hover .avatar-mask {\n  opacity: 1;\n}\n.user-avatar {\n  border: 1px solid #f0f0f0;\n}\n/*# sourceMappingURL=user-list.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserListComponent, { className: "UserListComponent", filePath: "src/app/modules/core-infra-auth/user-list/user-list.component.ts", lineNumber: 329 });
})();
export {
  UserListComponent
};
//# sourceMappingURL=chunk-L5HJHUQX.js.map
