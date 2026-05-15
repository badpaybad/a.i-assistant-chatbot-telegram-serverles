import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormModule
} from "./chunk-LU2YYR2M.js";
import "./chunk-SHYS2JTL.js";
import "./chunk-NRPLV2GT.js";
import {
  NzColDirective,
  NzRowDirective
} from "./chunk-VO7LFQ3A.js";
import {
  NzCardComponent,
  NzCardModule
} from "./chunk-T7PAMWZ4.js";
import {
  NzInputDirective,
  NzInputModule
} from "./chunk-QVFRY7SZ.js";
import {
  AppNotificationService,
  CommonModule,
  DefaultValueAccessor,
  FormControlName,
  FormGroupDirective,
  HttpClientService,
  NgControlStatus,
  NgControlStatusGroup,
  NgIf,
  NonNullableFormBuilder,
  NzButtonComponent,
  NzButtonModule,
  NzTransitionPatchDirective,
  NzWaveDirective,
  ReactiveFormsModule,
  TranslateModule,
  TranslatePipe,
  TranslateService,
  Validators,
  ɵNgNoValidate
} from "./chunk-BV7BATNO.js";
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
  ɵɵlistener,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵreference,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-2BQMWOA2.js";
import "./chunk-MYGOUE3E.js";

// src/app/modules/core-infra-auth/change-password/change-password.component.ts
function ChangePasswordComponent_ng_template_19_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
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
    \u0275\u0275pipe(2, "translate");
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
    \u0275\u0275pipe(2, "translate");
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
    \u0275\u0275pipe(2, "translate");
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
    this.translate = inject(TranslateService);
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
        this.notification.success(this.translate.instant("Th\xE0nh c\xF4ng"), this.translate.instant("\u0110\u1ED5i m\u1EADt kh\u1EA9u th\xE0nh c\xF4ng"));
        this.validateForm.reset();
      } catch (e) {
        console.error(e);
        this.notification.error(this.translate.instant("Th\u1EA5t b\u1EA1i"), ((_a = e.error) == null ? void 0 : _a.message) || this.translate.instant("\u0110\u1ED5i m\u1EADt kh\u1EA9u th\u1EA5t b\u1EA1i"));
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
_ChangePasswordComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ChangePasswordComponent, selectors: [["app-change-password"]], decls: 35, vars: 39, consts: [["passwordErrorTpl", ""], ["confirmErrorTpl", ""], [1, "change-password-container"], [3, "nzTitle"], ["nz-form", "", 3, "ngSubmit", "formGroup"], ["nzRequired", "", 3, "nzSpan"], [3, "nzSpan", "nzErrorTip"], ["nz-input", "", "type", "password", "formControlName", "oldPassword", 3, "placeholder"], ["nz-input", "", "type", "password", "formControlName", "newPassword", 3, "placeholder"], ["nz-input", "", "type", "password", "formControlName", "confirmPassword", 3, "placeholder"], [3, "nzOffset", "nzSpan"], ["nz-button", "", "nzType", "primary", 3, "nzLoading"], [4, "ngIf"]], template: function ChangePasswordComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "nz-card", 3);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementStart(3, "form", 4);
    \u0275\u0275listener("ngSubmit", function ChangePasswordComponent_Template_form_ngSubmit_3_listener() {
      return ctx.submitForm();
    });
    \u0275\u0275elementStart(4, "nz-form-item")(5, "nz-form-label", 5);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "nz-form-control", 6);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275element(10, "input", 7);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "nz-form-item")(13, "nz-form-label", 5);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "nz-form-control", 6);
    \u0275\u0275element(17, "input", 8);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275template(19, ChangePasswordComponent_ng_template_19_Template, 2, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "nz-form-item")(22, "nz-form-label", 5);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "nz-form-control", 6);
    \u0275\u0275element(26, "input", 9);
    \u0275\u0275pipe(27, "translate");
    \u0275\u0275template(28, ChangePasswordComponent_ng_template_28_Template, 2, 2, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "nz-form-item")(31, "nz-form-control", 10)(32, "button", 11);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "translate");
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
    \u0275\u0275property("nzLoading", ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(34, 37, "L\u01B0u"));
  }
}, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, NzFormModule, NzColDirective, NzRowDirective, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent, NzInputModule, NzInputDirective, NzButtonModule, NzButtonComponent, NzTransitionPatchDirective, NzWaveDirective, NzCardModule, NzCardComponent, TranslateModule, TranslatePipe], styles: ["\n.change-password-container[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 24px auto;\n}\nnz-card[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=change-password.component.css.map */"] });
var ChangePasswordComponent = _ChangePasswordComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChangePasswordComponent, [{
    type: Component,
    args: [{ selector: "app-change-password", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      NzFormModule,
      NzInputModule,
      NzButtonModule,
      NzCardModule,
      TranslateModule
    ], template: `<div class="change-password-container">
  <nz-card [nzTitle]="'\u0110\u1ED5i m\u1EADt kh\u1EA9u' | translate">
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSpan]="6" nzRequired>{{ 'M\u1EADt kh\u1EA9u c\u0169' | translate }}</nz-form-label>
        <nz-form-control [nzSpan]="14" [nzErrorTip]="'Vui l\xF2ng nh\u1EADp m\u1EADt kh\u1EA9u c\u0169!' | translate">
          <input nz-input type="password" formControlName="oldPassword" [placeholder]="'M\u1EADt kh\u1EA9u c\u0169' | translate" />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSpan]="6" nzRequired>{{ 'M\u1EADt kh\u1EA9u m\u1EDBi' | translate }}</nz-form-label>
        <nz-form-control [nzSpan]="14" [nzErrorTip]="passwordErrorTpl">
          <input nz-input type="password" formControlName="newPassword" [placeholder]="'M\u1EADt kh\u1EA9u m\u1EDBi' | translate" />
          <ng-template #passwordErrorTpl let-control>
            <ng-container *ngIf="control.hasError('required')">{{ 'Vui l\xF2ng nh\u1EADp m\u1EADt kh\u1EA9u m\u1EDBi!' | translate }}</ng-container>
            <ng-container *ngIf="control.hasError('minlength')">{{ 'M\u1EADt kh\u1EA9u ph\u1EA3i c\xF3 \xEDt nh\u1EA5t 6 k\xFD t\u1EF1' | translate }}</ng-container>
          </ng-template>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSpan]="6" nzRequired>{{ 'X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi' | translate }}</nz-form-label>
        <nz-form-control [nzSpan]="14" [nzErrorTip]="confirmErrorTpl">
          <input nz-input type="password" formControlName="confirmPassword" [placeholder]="'X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi' | translate" />
          <ng-template #confirmErrorTpl let-control>
            <ng-container *ngIf="control.hasError('required')">{{ 'Vui l\xF2ng x\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi!' | translate }}</ng-container>
            <ng-container *ngIf="control.hasError('confirm')">{{ 'M\u1EADt kh\u1EA9u kh\xF4ng kh\u1EDBp' | translate }}</ng-container>
          </ng-template>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-control [nzOffset]="6" [nzSpan]="14">
          <button nz-button nzType="primary" [nzLoading]="loading">{{ 'L\u01B0u' | translate }}</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  </nz-card>
</div>
`, styles: ["/* src/app/modules/core-infra-auth/change-password/change-password.component.css */\n.change-password-container {\n  max-width: 800px;\n  margin: 24px auto;\n}\nnz-card {\n  width: 100%;\n}\n/*# sourceMappingURL=change-password.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ChangePasswordComponent, { className: "ChangePasswordComponent", filePath: "src/app/modules/core-infra-auth/change-password/change-password.component.ts", lineNumber: 27 });
})();
export {
  ChangePasswordComponent
};
//# sourceMappingURL=chunk-QVIA53DQ.js.map
