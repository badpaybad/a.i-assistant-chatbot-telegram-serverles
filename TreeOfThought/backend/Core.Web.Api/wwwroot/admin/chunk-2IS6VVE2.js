import {
  BACKSPACE,
  DefaultValueAccessor,
  Directionality,
  FocusMonitor,
  FormBuilder,
  FormControlDirective,
  LEFT_ARROW,
  MaxLengthValidator,
  NG_VALUE_ACCESSOR,
  NZ_FORM_SIZE,
  NZ_FORM_VARIANT,
  NZ_SPACE_COMPACT_ITEM_TYPE,
  NZ_SPACE_COMPACT_SIZE,
  NgControl,
  NgControlStatus,
  NgTemplateOutlet,
  NzButtonComponent,
  NzButtonModule,
  NzFormItemFeedbackIconComponent,
  NzFormNoStatusService,
  NzFormStatusService,
  NzIconDirective,
  NzIconModule,
  NzOutletModule,
  NzResizeService,
  NzSpaceCompactItemDirective,
  NzStringTemplateOutletDirective,
  NzTransitionPatchDirective,
  NzWaveDirective,
  Platform,
  RIGHT_ARROW,
  ReactiveFormsModule,
  Validators,
  getStatusClassNames,
  getVariantClassNames,
  isNotNil,
  isNumberFinite,
  takeUntilDestroyed,
  toObservable,
  toSignal,
  triggerFocus
} from "./chunk-W3A2S6TY.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DestroyRef,
  Directive,
  EMPTY,
  ElementRef,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  TemplateRef,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChild,
  distinctUntilChanged,
  effect,
  forwardRef,
  inject,
  input,
  isDevMode,
  linkedSignal,
  map,
  merge,
  mergeMap,
  model,
  numberAttribute,
  output,
  setClassMetadata,
  signal,
  startWith,
  switchMap,
  tap,
  ɵɵHostDirectivesFeature,
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
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreadContextLet,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstoreLet,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-2BQMWOA2.js";
import {
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-MYGOUE3E.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-input.mjs
var _c0 = ["nz-input-group-slot", ""];
var _c1 = ["*"];
function NzInputGroupSlotComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("nzType", ctx_r0.icon);
  }
}
function NzInputGroupSlotComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.template);
  }
}
function NzInputGroupComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("icon", ctx_r0.nzAddOnBeforeIcon)("template", ctx_r0.nzAddOnBefore);
  }
}
function NzInputGroupComponent_Conditional_0_Conditional_2_ng_template_1_Template(rf, ctx) {
}
function NzInputGroupComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275template(1, NzInputGroupComponent_Conditional_0_Conditional_2_ng_template_1_Template, 0, 0, "ng-template", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    const affixTemplate_r2 = \u0275\u0275reference(3);
    \u0275\u0275classMap(ctx_r0.affixInGroupStatusCls);
    \u0275\u0275classProp("ant-input-affix-wrapper-disabled", ctx_r0.disabled)("ant-input-affix-wrapper-sm", ctx_r0.isSmall)("ant-input-affix-wrapper-lg", ctx_r0.isLarge)("ant-input-affix-wrapper-focused", ctx_r0.focused);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", affixTemplate_r2);
  }
}
function NzInputGroupComponent_Conditional_0_Conditional_3_ng_template_0_Template(rf, ctx) {
}
function NzInputGroupComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzInputGroupComponent_Conditional_0_Conditional_3_ng_template_0_Template, 0, 0, "ng-template", 5);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const contentTemplate_r3 = \u0275\u0275reference(5);
    \u0275\u0275property("ngTemplateOutlet", contentTemplate_r3);
  }
}
function NzInputGroupComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("icon", ctx_r0.nzAddOnAfterIcon)("template", ctx_r0.nzAddOnAfter);
  }
}
function NzInputGroupComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275conditionalCreate(1, NzInputGroupComponent_Conditional_0_Conditional_1_Template, 1, 2, "span", 3);
    \u0275\u0275conditionalCreate(2, NzInputGroupComponent_Conditional_0_Conditional_2_Template, 2, 11, "span", 4)(3, NzInputGroupComponent_Conditional_0_Conditional_3_Template, 1, 1, null, 5);
    \u0275\u0275conditionalCreate(4, NzInputGroupComponent_Conditional_0_Conditional_4_Template, 1, 2, "span", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzAddOnBefore || ctx_r0.nzAddOnBeforeIcon ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isAffix || ctx_r0.hasFeedback ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.nzAddOnAfter || ctx_r0.nzAddOnAfterIcon ? 4 : -1);
  }
}
function NzInputGroupComponent_Conditional_1_Conditional_0_ng_template_0_Template(rf, ctx) {
}
function NzInputGroupComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzInputGroupComponent_Conditional_1_Conditional_0_ng_template_0_Template, 0, 0, "ng-template", 5);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const affixTemplate_r2 = \u0275\u0275reference(3);
    \u0275\u0275property("ngTemplateOutlet", affixTemplate_r2);
  }
}
function NzInputGroupComponent_Conditional_1_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function NzInputGroupComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzInputGroupComponent_Conditional_1_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 5);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const contentTemplate_r3 = \u0275\u0275reference(5);
    \u0275\u0275property("ngTemplateOutlet", contentTemplate_r3);
  }
}
function NzInputGroupComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzInputGroupComponent_Conditional_1_Conditional_0_Template, 1, 1, null, 5)(1, NzInputGroupComponent_Conditional_1_Conditional_1_Template, 1, 1, null, 5);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.isAffix ? 0 : 1);
  }
}
function NzInputGroupComponent_ng_template_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 7);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("icon", ctx_r0.nzPrefixIcon)("template", ctx_r0.nzPrefix);
  }
}
function NzInputGroupComponent_ng_template_2_ng_template_1_Template(rf, ctx) {
}
function NzInputGroupComponent_ng_template_2_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-form-item-feedback-icon", 9);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("status", ctx_r0.status);
  }
}
function NzInputGroupComponent_ng_template_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275conditionalCreate(1, NzInputGroupComponent_ng_template_2_Conditional_2_Conditional_1_Template, 1, 1, "nz-form-item-feedback-icon", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("icon", ctx_r0.nzSuffixIcon)("template", ctx_r0.nzSuffix);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isFeedback ? 1 : -1);
  }
}
function NzInputGroupComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzInputGroupComponent_ng_template_2_Conditional_0_Template, 1, 2, "span", 7);
    \u0275\u0275template(1, NzInputGroupComponent_ng_template_2_ng_template_1_Template, 0, 0, "ng-template", 5);
    \u0275\u0275conditionalCreate(2, NzInputGroupComponent_ng_template_2_Conditional_2_Template, 2, 3, "span", 8);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const contentTemplate_r3 = \u0275\u0275reference(5);
    \u0275\u0275conditional(ctx_r0.nzPrefix || ctx_r0.nzPrefixIcon ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", contentTemplate_r3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzSuffix || ctx_r0.nzSuffixIcon || ctx_r0.isFeedback ? 2 : -1);
  }
}
function NzInputGroupComponent_ng_template_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275element(1, "nz-form-item-feedback-icon", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("status", ctx_r0.status);
  }
}
function NzInputGroupComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
    \u0275\u0275conditionalCreate(1, NzInputGroupComponent_ng_template_4_Conditional_1_Template, 2, 1, "span", 10);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.isAddOn && !ctx_r0.isAffix && ctx_r0.isFeedback ? 1 : -1);
  }
}
var _c2 = ["otpInput"];
function NzInputOtpComponent_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 2, 0);
    \u0275\u0275listener("input", function NzInputOtpComponent_For_1_Template_input_input_0_listener($event) {
      const $index_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onInput($index_r2, $event));
    })("focus", function NzInputOtpComponent_For_1_Template_input_focus_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFocus($event));
    })("keydown", function NzInputOtpComponent_For_1_Template_input_keydown_0_listener($event) {
      const $index_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onKeyDown($index_r2, $event));
    })("paste", function NzInputOtpComponent_For_1_Template_input_paste_0_listener($event) {
      const $index_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPaste($index_r2, $event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("nzSize", ctx_r2.nzSize)("formControl", item_r4)("nzStatus", ctx_r2.nzStatus);
  }
}
var _c3 = [[["", "nzInputAddonBefore", ""]], [["", "nzInputAddonAfter", ""]], [["", "nzInputSearchEnterButton", ""]], [["", "nzInputPrefix", ""]], [["", "nzInputSuffix", ""]], [["", "nzInputClearIcon", ""]], [["", "nz-input", ""]]];
var _c4 = ["[nzInputAddonBefore]", "[nzInputAddonAfter]", "[nzInputSearchEnterButton]", "[nzInputPrefix]", "[nzInputSuffix]", "[nzInputClearIcon]", "[nz-input]"];
var _c5 = (a0) => ({
  $implicit: a0
});
function NzInputWrapperComponent_Conditional_0_ng_template_0_Template(rf, ctx) {
}
function NzInputWrapperComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzInputWrapperComponent_Conditional_0_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const inputWithAddonInner_r1 = \u0275\u0275reference(4);
    \u0275\u0275property("ngTemplateOutlet", inputWithAddonInner_r1);
  }
}
function NzInputWrapperComponent_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function NzInputWrapperComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzInputWrapperComponent_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const inputWithAffixInner_r2 = \u0275\u0275reference(8);
    \u0275\u0275property("ngTemplateOutlet", inputWithAffixInner_r2);
  }
}
function NzInputWrapperComponent_Conditional_2_ng_template_0_Template(rf, ctx) {
}
function NzInputWrapperComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzInputWrapperComponent_Conditional_2_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const input_r3 = \u0275\u0275reference(10);
    \u0275\u0275property("ngTemplateOutlet", input_r3);
  }
}
function NzInputWrapperComponent_ng_template_3_Conditional_1_ProjectionFallback_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate(ctx_r3.nzAddonBefore());
  }
}
function NzInputWrapperComponent_ng_template_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275projection(1, 0, null, NzInputWrapperComponent_ng_template_3_Conditional_1_ProjectionFallback_1_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
}
function NzInputWrapperComponent_ng_template_3_Conditional_2_ng_template_0_Template(rf, ctx) {
}
function NzInputWrapperComponent_ng_template_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzInputWrapperComponent_ng_template_3_Conditional_2_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const inputWithAffix_r5 = \u0275\u0275reference(6);
    \u0275\u0275property("ngTemplateOutlet", inputWithAffix_r5);
  }
}
function NzInputWrapperComponent_ng_template_3_Conditional_3_ng_template_0_Template(rf, ctx) {
}
function NzInputWrapperComponent_ng_template_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzInputWrapperComponent_ng_template_3_Conditional_3_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const input_r3 = \u0275\u0275reference(10);
    \u0275\u0275property("ngTemplateOutlet", input_r3);
  }
}
function NzInputWrapperComponent_ng_template_3_Conditional_4_Conditional_1_ProjectionFallback_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const nzEnterButton_r7 = \u0275\u0275readContextLet(0);
    \u0275\u0275textInterpolate1(" ", nzEnterButton_r7, " ");
  }
}
function NzInputWrapperComponent_ng_template_3_Conditional_4_Conditional_1_ProjectionFallback_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 9);
  }
}
function NzInputWrapperComponent_ng_template_3_Conditional_4_Conditional_1_ProjectionFallback_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzInputWrapperComponent_ng_template_3_Conditional_4_Conditional_1_ProjectionFallback_2_Conditional_0_Template, 1, 1)(1, NzInputWrapperComponent_ng_template_3_Conditional_4_Conditional_1_ProjectionFallback_2_Conditional_1_Template, 1, 0, "nz-icon", 9);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const nzEnterButton_r7 = \u0275\u0275readContextLet(0);
    \u0275\u0275conditional(nzEnterButton_r7 && typeof nzEnterButton_r7 === "string" ? 0 : 1);
  }
}
function NzInputWrapperComponent_ng_template_3_Conditional_4_Conditional_1_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275declareLet(0);
    \u0275\u0275elementStart(1, "button", 8);
    \u0275\u0275listener("click", function NzInputWrapperComponent_ng_template_3_Conditional_4_Conditional_1_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.inputSearchDir.search($event));
    });
    \u0275\u0275projection(2, 2, null, NzInputWrapperComponent_ng_template_3_Conditional_4_Conditional_1_ProjectionFallback_2_Template, 2, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    const nzEnterButton_r8 = \u0275\u0275storeLet(ctx_r3.inputSearchDir.nzEnterButton());
    const hasEnterButton_r9 = (_a2 = ctx_r3.inputSearchEnterButton()) != null ? _a2 : nzEnterButton_r8 !== false;
    \u0275\u0275advance();
    \u0275\u0275property("nzType", hasEnterButton_r9 ? "primary" : "default")("nzSize", ctx_r3.size())("nzLoading", ctx_r3.inputSearchDir.nzLoading());
  }
}
function NzInputWrapperComponent_ng_template_3_Conditional_4_ProjectionFallback_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate(ctx_r3.nzAddonAfter());
  }
}
function NzInputWrapperComponent_ng_template_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 6);
    \u0275\u0275conditionalCreate(1, NzInputWrapperComponent_ng_template_3_Conditional_4_Conditional_1_Template, 4, 4, "button", 7);
    \u0275\u0275projection(2, 1, null, NzInputWrapperComponent_ng_template_3_Conditional_4_ProjectionFallback_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.inputSearchDir ? 1 : -1);
  }
}
function NzInputWrapperComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275conditionalCreate(1, NzInputWrapperComponent_ng_template_3_Conditional_1_Template, 3, 0, "span", 6);
    \u0275\u0275conditionalCreate(2, NzInputWrapperComponent_ng_template_3_Conditional_2_Template, 1, 1, null, 4)(3, NzInputWrapperComponent_ng_template_3_Conditional_3_Template, 1, 1, null, 4);
    \u0275\u0275conditionalCreate(4, NzInputWrapperComponent_ng_template_3_Conditional_4_Template, 4, 1, "span", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.hasAddonBefore() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.hasAffix() ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.hasAddonAfter() ? 4 : -1);
  }
}
function NzInputWrapperComponent_ng_template_5_ng_template_1_Template(rf, ctx) {
}
function NzInputWrapperComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275template(1, NzInputWrapperComponent_ng_template_5_ng_template_1_Template, 0, 0, "ng-template", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const inputWithAffixInner_r2 = \u0275\u0275reference(8);
    \u0275\u0275classMap(ctx_r3.affixWrapperClass());
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", inputWithAffixInner_r2);
  }
}
function NzInputWrapperComponent_ng_template_7_Conditional_0_ProjectionFallback_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate(ctx_r3.nzPrefix());
  }
}
function NzInputWrapperComponent_ng_template_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275projection(1, 3, null, NzInputWrapperComponent_ng_template_7_Conditional_0_ProjectionFallback_1_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
}
function NzInputWrapperComponent_ng_template_7_ng_template_1_Template(rf, ctx) {
}
function NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_1_ProjectionFallback_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 17);
  }
}
function NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275listener("click", function NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_1_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r3 = \u0275\u0275nextContext(3);
      ctx_r3.clear();
      return \u0275\u0275resetView(ctx_r3.inputSearchDir == null ? null : ctx_r3.inputSearchDir.search($event, "clear"));
    });
    \u0275\u0275projection(1, 5, null, NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_1_ProjectionFallback_1_Template, 1, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("ant-input-clear-icon-has-suffix", ctx_r3.nzSuffix() || ctx_r3.suffix() || ctx_r3.hasFeedback() || (ctx_r3.inputPasswordDir == null ? null : ctx_r3.inputPasswordDir.nzVisibilityToggle()))("ant-input-clear-icon-hidden", !ctx_r3.inputDir().value() || ctx_r3.disabled() || ctx_r3.readOnly());
  }
}
function NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.dataCount());
  }
}
function NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_3_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_3_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 19);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(4);
    \u0275\u0275property("ngTemplateOutlet", ctx)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c5, ctx_r3.inputPasswordDir.nzVisible()));
  }
}
function NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 20);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(4);
    \u0275\u0275property("nzType", ctx_r3.inputPasswordDir.nzVisible() ? "eye" : "eye-invisible");
  }
}
function NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275listener("click", function NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_3_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.inputPasswordDir.toggleVisible());
    });
    \u0275\u0275conditionalCreate(1, NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_3_Conditional_1_Template, 1, 4, null, 19)(2, NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_3_Conditional_2_Template, 1, 1, "nz-icon", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_7_0;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_7_0 = ctx_r3.inputPasswordIconTmpl()) ? 1 : 2, tmp_7_0);
  }
}
function NzInputWrapperComponent_ng_template_7_Conditional_2_ProjectionFallback_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate(ctx_r3.nzSuffix());
  }
}
function NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-form-item-feedback-icon", 15);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275property("status", ctx_r3.status());
  }
}
function NzInputWrapperComponent_ng_template_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275conditionalCreate(1, NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_1_Template, 3, 4, "span", 12);
    \u0275\u0275conditionalCreate(2, NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_2_Template, 2, 1, "span", 13);
    \u0275\u0275conditionalCreate(3, NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_3_Template, 3, 1, "span", 14);
    \u0275\u0275projection(4, 4, null, NzInputWrapperComponent_ng_template_7_Conditional_2_ProjectionFallback_4_Template, 1, 1);
    \u0275\u0275conditionalCreate(6, NzInputWrapperComponent_ng_template_7_Conditional_2_Conditional_6_Template, 1, 1, "nz-form-item-feedback-icon", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.nzAllowClear() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.nzShowCount() ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.inputPasswordDir && ctx_r3.inputPasswordDir.nzVisibilityToggle() ? 3 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r3.hasFeedback() && ctx_r3.status() ? 6 : -1);
  }
}
function NzInputWrapperComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzInputWrapperComponent_ng_template_7_Conditional_0_Template, 3, 0, "span", 10);
    \u0275\u0275template(1, NzInputWrapperComponent_ng_template_7_ng_template_1_Template, 0, 0, "ng-template", 4);
    \u0275\u0275conditionalCreate(2, NzInputWrapperComponent_ng_template_7_Conditional_2_Template, 7, 4, "span", 11);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const input_r3 = \u0275\u0275reference(10);
    \u0275\u0275conditional(ctx_r3.hasPrefix() ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", input_r3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.hasSuffix() ? 2 : -1);
  }
}
function NzInputWrapperComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 6);
  }
}
var _c6 = [[["textarea", "nz-input", ""]]];
var _c7 = ["textarea[nz-input]"];
var _NzAutosizeDirective = class _NzAutosizeDirective {
  constructor() {
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "platform", inject(Platform));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "resizeService", inject(NzResizeService));
    __publicField(this, "el", inject(ElementRef).nativeElement);
    __publicField(this, "autosize", false);
    __publicField(this, "cachedLineHeight");
    __publicField(this, "previousValue");
    __publicField(this, "previousMinRows");
    __publicField(this, "minRows");
    __publicField(this, "maxRows");
    __publicField(this, "maxHeight", null);
    __publicField(this, "minHeight", null);
    __publicField(this, "inputGap", 10);
    __publicField(this, "destroyed", false);
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
    });
  }
  set nzAutosize(value) {
    const isAutoSizeType = (data) => typeof data !== "string" && typeof data !== "boolean" && (!!data.maxRows || !!data.minRows);
    if (typeof value === "string" || value === true) {
      this.autosize = true;
    } else if (isAutoSizeType(value)) {
      this.autosize = true;
      this.minRows = value.minRows;
      this.maxRows = value.maxRows;
      this.maxHeight = this.setMaxHeight();
      this.minHeight = this.setMinHeight();
    }
  }
  resizeToFitContent(force = false) {
    this.cacheTextareaLineHeight();
    if (!this.cachedLineHeight) {
      return;
    }
    const textarea = this.el;
    const value = textarea.value;
    if (!force && this.minRows === this.previousMinRows && value === this.previousValue) {
      return;
    }
    const placeholderText = textarea.placeholder;
    textarea.classList.add("nz-textarea-autosize-measuring");
    textarea.placeholder = "";
    let height = Math.round((textarea.scrollHeight - this.inputGap) / this.cachedLineHeight) * this.cachedLineHeight + this.inputGap;
    if (this.maxHeight !== null && height > this.maxHeight) {
      height = this.maxHeight;
    }
    if (this.minHeight !== null && height < this.minHeight) {
      height = this.minHeight;
    }
    textarea.style.height = `${height}px`;
    textarea.classList.remove("nz-textarea-autosize-measuring");
    textarea.placeholder = placeholderText;
    if (typeof requestAnimationFrame !== "undefined") {
      this.ngZone.runOutsideAngular(() => requestAnimationFrame(() => {
        const {
          selectionStart,
          selectionEnd
        } = textarea;
        if (!this.destroyed && document.activeElement === textarea) {
          textarea.setSelectionRange(selectionStart, selectionEnd);
        }
      }));
    }
    this.previousValue = value;
    this.previousMinRows = this.minRows;
  }
  cacheTextareaLineHeight() {
    if (this.cachedLineHeight >= 0 || !this.el.parentNode) {
      return;
    }
    const textareaClone = this.el.cloneNode(false);
    textareaClone.rows = 1;
    textareaClone.style.position = "absolute";
    textareaClone.style.visibility = "hidden";
    textareaClone.style.border = "none";
    textareaClone.style.padding = "0";
    textareaClone.style.height = "";
    textareaClone.style.minHeight = "";
    textareaClone.style.maxHeight = "";
    textareaClone.style.overflow = "hidden";
    this.el.parentNode.appendChild(textareaClone);
    this.cachedLineHeight = textareaClone.clientHeight - this.inputGap;
    this.el.parentNode.removeChild(textareaClone);
    this.maxHeight = this.setMaxHeight();
    this.minHeight = this.setMinHeight();
  }
  setMinHeight() {
    const minHeight = this.minRows && this.cachedLineHeight ? this.minRows * this.cachedLineHeight + this.inputGap : null;
    if (minHeight !== null) {
      this.el.style.minHeight = `${minHeight}px`;
    }
    return minHeight;
  }
  setMaxHeight() {
    const maxHeight = this.maxRows && this.cachedLineHeight ? this.maxRows * this.cachedLineHeight + this.inputGap : null;
    if (maxHeight !== null) {
      this.el.style.maxHeight = `${maxHeight}px`;
    }
    return maxHeight;
  }
  noopInputHandler() {
  }
  ngAfterViewInit() {
    if (this.autosize && this.platform.isBrowser) {
      this.resizeToFitContent();
      this.resizeService.connect().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.resizeToFitContent(true));
    }
  }
  ngDoCheck() {
    if (this.autosize && this.platform.isBrowser) {
      this.resizeToFitContent();
    }
  }
};
__publicField(_NzAutosizeDirective, "\u0275fac", function NzAutosizeDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzAutosizeDirective)();
});
__publicField(_NzAutosizeDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzAutosizeDirective,
  selectors: [["textarea", "nzAutosize", ""]],
  hostAttrs: ["rows", "1"],
  hostBindings: function NzAutosizeDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("input", function NzAutosizeDirective_input_HostBindingHandler() {
        return ctx.noopInputHandler();
      });
    }
  },
  inputs: {
    nzAutosize: "nzAutosize"
  },
  exportAs: ["nzAutosize"]
}));
var NzAutosizeDirective = _NzAutosizeDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzAutosizeDirective, [{
    type: Directive,
    args: [{
      selector: "textarea[nzAutosize]",
      exportAs: "nzAutosize",
      host: {
        // Textarea elements that have the directive applied should have a single row by default.
        // Browsers normally show two rows by default and therefore this limits the minRows binding.
        rows: "1",
        "(input)": "noopInputHandler()"
      }
    }]
  }], () => [], {
    nzAutosize: [{
      type: Input
    }]
  });
})();
var _NzInputAddonBeforeDirective = class _NzInputAddonBeforeDirective {
};
__publicField(_NzInputAddonBeforeDirective, "\u0275fac", function NzInputAddonBeforeDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputAddonBeforeDirective)();
});
__publicField(_NzInputAddonBeforeDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzInputAddonBeforeDirective,
  selectors: [["", "nzInputAddonBefore", ""]]
}));
var NzInputAddonBeforeDirective = _NzInputAddonBeforeDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputAddonBeforeDirective, [{
    type: Directive,
    args: [{
      selector: "[nzInputAddonBefore]"
    }]
  }], null, null);
})();
var _NzInputAddonAfterDirective = class _NzInputAddonAfterDirective {
};
__publicField(_NzInputAddonAfterDirective, "\u0275fac", function NzInputAddonAfterDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputAddonAfterDirective)();
});
__publicField(_NzInputAddonAfterDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzInputAddonAfterDirective,
  selectors: [["", "nzInputAddonAfter", ""]]
}));
var NzInputAddonAfterDirective = _NzInputAddonAfterDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputAddonAfterDirective, [{
    type: Directive,
    args: [{
      selector: "[nzInputAddonAfter]"
    }]
  }], null, null);
})();
var _NzInputPrefixDirective = class _NzInputPrefixDirective {
};
__publicField(_NzInputPrefixDirective, "\u0275fac", function NzInputPrefixDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputPrefixDirective)();
});
__publicField(_NzInputPrefixDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzInputPrefixDirective,
  selectors: [["", "nzInputPrefix", ""]]
}));
var NzInputPrefixDirective = _NzInputPrefixDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputPrefixDirective, [{
    type: Directive,
    args: [{
      selector: "[nzInputPrefix]"
    }]
  }], null, null);
})();
var _NzInputSuffixDirective = class _NzInputSuffixDirective {
};
__publicField(_NzInputSuffixDirective, "\u0275fac", function NzInputSuffixDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputSuffixDirective)();
});
__publicField(_NzInputSuffixDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzInputSuffixDirective,
  selectors: [["", "nzInputSuffix", ""]]
}));
var NzInputSuffixDirective = _NzInputSuffixDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputSuffixDirective, [{
    type: Directive,
    args: [{
      selector: "[nzInputSuffix]"
    }]
  }], null, null);
})();
var _NzInputGroupSlotComponent = class _NzInputGroupSlotComponent {
  constructor() {
    __publicField(this, "icon", null);
    __publicField(this, "type", null);
    __publicField(this, "template", null);
  }
};
__publicField(_NzInputGroupSlotComponent, "\u0275fac", function NzInputGroupSlotComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputGroupSlotComponent)();
});
__publicField(_NzInputGroupSlotComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzInputGroupSlotComponent,
  selectors: [["", "nz-input-group-slot", ""]],
  hostVars: 6,
  hostBindings: function NzInputGroupSlotComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-input-group-addon", ctx.type === "addon")("ant-input-prefix", ctx.type === "prefix")("ant-input-suffix", ctx.type === "suffix");
    }
  },
  inputs: {
    icon: "icon",
    type: "type",
    template: "template"
  },
  attrs: _c0,
  ngContentSelectors: _c1,
  decls: 3,
  vars: 2,
  consts: [[3, "nzType"], [4, "nzStringTemplateOutlet"]],
  template: function NzInputGroupSlotComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275conditionalCreate(0, NzInputGroupSlotComponent_Conditional_0_Template, 1, 1, "nz-icon", 0);
      \u0275\u0275template(1, NzInputGroupSlotComponent_ng_container_1_Template, 2, 1, "ng-container", 1);
      \u0275\u0275projection(2);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.icon ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("nzStringTemplateOutlet", ctx.template);
    }
  },
  dependencies: [NzIconModule, NzIconDirective, NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzInputGroupSlotComponent = _NzInputGroupSlotComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputGroupSlotComponent, [{
    type: Component,
    args: [{
      selector: "[nz-input-group-slot]",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (icon) {
      <nz-icon [nzType]="icon" />
    }
    <ng-container *nzStringTemplateOutlet="template">{{ template }}</ng-container>
    <ng-content />
  `,
      host: {
        "[class.ant-input-group-addon]": `type === 'addon'`,
        "[class.ant-input-prefix]": `type === 'prefix'`,
        "[class.ant-input-suffix]": `type === 'suffix'`
      },
      imports: [NzIconModule, NzOutletModule]
    }]
  }], null, {
    icon: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    template: [{
      type: Input
    }]
  });
})();
var _NzInputPasswordDirective = class _NzInputPasswordDirective {
  constructor() {
    __publicField(this, "nzVisibilityToggle", input(true, ...ngDevMode ? [{
      debugName: "nzVisibilityToggle"
    }] : []));
    __publicField(this, "nzVisible", model(false, ...ngDevMode ? [{
      debugName: "nzVisible"
    }] : []));
  }
  toggleVisible() {
    this.nzVisible.update((value) => !value);
  }
};
__publicField(_NzInputPasswordDirective, "\u0275fac", function NzInputPasswordDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputPasswordDirective)();
});
__publicField(_NzInputPasswordDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzInputPasswordDirective,
  selectors: [["nz-input-password"]],
  hostAttrs: [1, "ant-input-password"],
  inputs: {
    nzVisibilityToggle: [1, "nzVisibilityToggle"],
    nzVisible: [1, "nzVisible"]
  },
  outputs: {
    nzVisible: "nzVisibleChange"
  },
  exportAs: ["nzInputPassword"]
}));
var NzInputPasswordDirective = _NzInputPasswordDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputPasswordDirective, [{
    type: Directive,
    args: [{
      selector: "nz-input-password",
      exportAs: "nzInputPassword",
      host: {
        class: "ant-input-password"
      }
    }]
  }], null, {
    nzVisibilityToggle: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzVisibilityToggle",
        required: false
      }]
    }],
    nzVisible: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzVisible",
        required: false
      }]
    }, {
      type: Output,
      args: ["nzVisibleChange"]
    }]
  });
})();
var _NzInputPasswordIconDirective = class _NzInputPasswordIconDirective {
  /**
   * @internal
   */
  static ngTemplateContextGuard(_, context) {
    return true;
  }
};
__publicField(_NzInputPasswordIconDirective, "\u0275fac", function NzInputPasswordIconDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputPasswordIconDirective)();
});
__publicField(_NzInputPasswordIconDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzInputPasswordIconDirective,
  selectors: [["", "nzInputPasswordIcon", ""]]
}));
var NzInputPasswordIconDirective = _NzInputPasswordIconDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputPasswordIconDirective, [{
    type: Directive,
    args: [{
      selector: "[nzInputPasswordIcon]"
    }]
  }], null, null);
})();
var NZ_INPUT_WRAPPER = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "nz-input-wrapper" : "");
var NZ_INPUT_SEARCH = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "nz-input-search" : "");
var PREFIX_CLS = "ant-input";
var _a, _b;
var _NzInputDirective = class _NzInputDirective {
  constructor() {
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "compactSize", inject(NZ_SPACE_COMPACT_SIZE, {
      optional: true
    }));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "nzFormStatusService", inject(NzFormStatusService, {
      optional: true
    }));
    __publicField(this, "nzFormNoStatusService", inject(NzFormNoStatusService, {
      optional: true
    }));
    __publicField(this, "inputWrapper", inject(NZ_INPUT_WRAPPER, {
      host: true,
      optional: true
    }));
    __publicField(this, "focusMonitor", inject(FocusMonitor));
    __publicField(this, "hostView", inject(ViewContainerRef));
    __publicField(this, "inputPasswordDir", inject(NzInputPasswordDirective, {
      host: true,
      optional: true
    }));
    __publicField(this, "inputSearchDir", inject(NZ_INPUT_SEARCH, {
      host: true,
      optional: true
    }));
    __publicField(this, "ngControl", inject(NgControl, {
      self: true,
      optional: true
    }));
    __publicField(this, "value", signal(this.elementRef.nativeElement.value, ...ngDevMode ? [{
      debugName: "value"
    }] : []));
    __publicField(this, "nzVariant", input(...ngDevMode ? [void 0, {
      debugName: "nzVariant"
    }] : []));
    __publicField(this, "nzSize", input("default", ...ngDevMode ? [{
      debugName: "nzSize"
    }] : []));
    /**
     * @deprecated Will be removed in v22.
     */
    __publicField(this, "nzStepperless", input(true, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzStepperless"
    } : {}), {
      transform: booleanAttribute
    })));
    __publicField(this, "nzStatus", input("", ...ngDevMode ? [{
      debugName: "nzStatus"
    }] : []));
    __publicField(this, "disabled", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "disabled"
    } : {}), {
      transform: booleanAttribute
    })));
    __publicField(this, "readonly", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "readonly"
    } : {}), {
      transform: booleanAttribute
    })));
    __publicField(this, "controlDisabled", signal(false, ...ngDevMode ? [{
      debugName: "controlDisabled"
    }] : []));
    __publicField(this, "finalDisabled", this.ngControl ? this.controlDisabled : this.disabled);
    __publicField(this, "dir", inject(Directionality).valueSignal);
    // TODO: When the input group is removed, we can remove this.
    __publicField(this, "size", linkedSignal(this.nzSize, ...ngDevMode ? [{
      debugName: "size"
    }] : []));
    __publicField(this, "formSize", inject(NZ_FORM_SIZE, {
      optional: true
    }));
    __publicField(this, "formVariant", inject(NZ_FORM_VARIANT, {
      optional: true
    }));
    __publicField(this, "status", this.nzFormStatusService ? toSignal(this.nzFormStatusService.formStatusChanges.pipe(map((value) => value.status)), {
      initialValue: ""
    }) : this.nzStatus);
    __publicField(this, "hasFeedback", toSignal((_b = (_a = this.nzFormStatusService) == null ? void 0 : _a.formStatusChanges.pipe(map((value) => value.hasFeedback))) != null ? _b : EMPTY, {
      initialValue: false
    }));
    __publicField(this, "classes", computed(() => getStatusClassNames(PREFIX_CLS, this.status(), this.hasFeedback()), ...ngDevMode ? [{
      debugName: "classes"
    }] : []));
    __publicField(this, "type", computed(() => {
      if (this.inputPasswordDir) {
        return this.inputPasswordDir.nzVisible() ? "text" : "password";
      }
      if (this.inputSearchDir) {
        return "search";
      }
      return this.elementRef.nativeElement.getAttribute("type") || "text";
    }, ...ngDevMode ? [{
      debugName: "type"
    }] : []));
    __publicField(this, "focused", signal(false, ...ngDevMode ? [{
      debugName: "focused"
    }] : []));
    __publicField(this, "finalSize", computed(() => {
      var _a2;
      if ((_a2 = this.formSize) == null ? void 0 : _a2.call(this)) {
        return this.formSize();
      }
      if (this.compactSize) {
        return this.compactSize();
      }
      return this.size();
    }, ...ngDevMode ? [{
      debugName: "finalSize"
    }] : []));
    __publicField(this, "finalVariant", computed(() => {
      var _a2;
      return this.nzVariant() || ((_a2 = this.formVariant) == null ? void 0 : _a2.call(this)) || "outlined";
    }, ...ngDevMode ? [{
      debugName: "finalVariant"
    }] : []));
    __publicField(this, "feedbackRef", null);
    // TODO: When the input group is removed, we can remove this.
    __publicField(this, "disabled$", toObservable(this.finalDisabled));
    this.destroyRef.onDestroy(() => {
      this.focusMonitor.stopMonitoring(this.elementRef);
    });
    this.focusMonitor.monitor(this.elementRef, false).pipe(takeUntilDestroyed()).subscribe((origin) => this.focused.set(!!origin));
    effect(() => {
      this.renderFeedbackIcon();
    });
  }
  ngOnInit() {
    var _a2, _b2, _c, _d, _e, _f;
    (_b2 = (_a2 = this.ngControl) == null ? void 0 : _a2.statusChanges) == null ? void 0 : _b2.pipe(startWith(null), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.controlDisabled.set(!!this.ngControl.disabled);
    });
    (_f = (_c = this.ngControl) == null ? void 0 : _c.valueChanges) == null ? void 0 : _f.pipe(startWith((_e = (_d = this.ngControl) == null ? void 0 : _d.control) == null ? void 0 : _e.value), takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.value.set(value != null ? value : "");
    });
  }
  renderFeedbackIcon() {
    if (!this.status() || !this.hasFeedback() || this.inputWrapper || !!this.nzFormNoStatusService) {
      this.hostView.clear();
      this.feedbackRef = null;
      return;
    }
    this.feedbackRef = this.feedbackRef || this.hostView.createComponent(NzFormItemFeedbackIconComponent);
    this.feedbackRef.location.nativeElement.classList.add("ant-input-suffix");
    this.feedbackRef.instance.status = this.status();
    this.feedbackRef.instance.updateIcon();
  }
  focus(options) {
    triggerFocus(this.elementRef.nativeElement, options);
  }
  blur() {
    this.elementRef.nativeElement.blur();
  }
};
__publicField(_NzInputDirective, "\u0275fac", function NzInputDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputDirective)();
});
__publicField(_NzInputDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzInputDirective,
  selectors: [["input", "nz-input", ""], ["textarea", "nz-input", ""]],
  hostAttrs: [1, "ant-input"],
  hostVars: 23,
  hostBindings: function NzInputDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275attribute("type", ctx.type())("disabled", ctx.finalDisabled() || null)("readonly", ctx.readonly() || null);
      \u0275\u0275classMap(ctx.classes());
      \u0275\u0275classProp("ant-input-disabled", ctx.finalDisabled())("ant-input-borderless", ctx.finalVariant() === "borderless")("ant-input-filled", ctx.finalVariant() === "filled")("ant-input-underlined", ctx.finalVariant() === "underlined")("ant-input-lg", ctx.finalSize() === "large")("ant-input-sm", ctx.finalSize() === "small")("ant-input-rtl", ctx.dir() === "rtl")("ant-input-stepperless", ctx.nzStepperless())("ant-input-focused", ctx.focused());
    }
  },
  inputs: {
    nzVariant: [1, "nzVariant"],
    nzSize: [1, "nzSize"],
    nzStepperless: [1, "nzStepperless"],
    nzStatus: [1, "nzStatus"],
    disabled: [1, "disabled"],
    readonly: [1, "readonly"]
  },
  exportAs: ["nzInput"],
  features: [\u0275\u0275ProvidersFeature([{
    provide: NZ_SPACE_COMPACT_ITEM_TYPE,
    useValue: "input"
  }]), \u0275\u0275HostDirectivesFeature([NzSpaceCompactItemDirective])]
}));
var NzInputDirective = _NzInputDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputDirective, [{
    type: Directive,
    args: [{
      selector: "input[nz-input],textarea[nz-input]",
      exportAs: "nzInput",
      host: {
        class: "ant-input",
        "[attr.type]": "type()",
        "[class]": "classes()",
        "[class.ant-input-disabled]": "finalDisabled()",
        "[class.ant-input-borderless]": `finalVariant() === 'borderless'`,
        "[class.ant-input-filled]": `finalVariant() === 'filled'`,
        "[class.ant-input-underlined]": `finalVariant() === 'underlined'`,
        "[class.ant-input-lg]": `finalSize() === 'large'`,
        "[class.ant-input-sm]": `finalSize() === 'small'`,
        "[attr.disabled]": "finalDisabled() || null",
        "[attr.readonly]": "readonly() || null",
        "[class.ant-input-rtl]": `dir() === 'rtl'`,
        "[class.ant-input-stepperless]": `nzStepperless()`,
        "[class.ant-input-focused]": "focused()"
      },
      hostDirectives: [NzSpaceCompactItemDirective],
      providers: [{
        provide: NZ_SPACE_COMPACT_ITEM_TYPE,
        useValue: "input"
      }]
    }]
  }], () => [], {
    nzVariant: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzVariant",
        required: false
      }]
    }],
    nzSize: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzSize",
        required: false
      }]
    }],
    nzStepperless: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzStepperless",
        required: false
      }]
    }],
    nzStatus: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzStatus",
        required: false
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "disabled",
        required: false
      }]
    }],
    readonly: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "readonly",
        required: false
      }]
    }]
  });
})();
var _NzInputGroupWhitSuffixOrPrefixDirective = class _NzInputGroupWhitSuffixOrPrefixDirective {
  constructor() {
    __publicField(this, "elementRef", inject(ElementRef));
  }
};
__publicField(_NzInputGroupWhitSuffixOrPrefixDirective, "\u0275fac", function NzInputGroupWhitSuffixOrPrefixDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputGroupWhitSuffixOrPrefixDirective)();
});
__publicField(_NzInputGroupWhitSuffixOrPrefixDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzInputGroupWhitSuffixOrPrefixDirective,
  selectors: [["nz-input-group", "nzSuffix", ""], ["nz-input-group", "nzPrefix", ""]]
}));
var NzInputGroupWhitSuffixOrPrefixDirective = _NzInputGroupWhitSuffixOrPrefixDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputGroupWhitSuffixOrPrefixDirective, [{
    type: Directive,
    args: [{
      selector: `nz-input-group[nzSuffix], nz-input-group[nzPrefix]`
    }]
  }], null, null);
})();
var _NzInputGroupComponent = class _NzInputGroupComponent {
  constructor() {
    __publicField(this, "focusMonitor", inject(FocusMonitor));
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "renderer", inject(Renderer2));
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "directionality", inject(Directionality));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "nzFormStatusService", inject(NzFormStatusService, {
      optional: true
    }));
    __publicField(this, "nzFormNoStatusService", inject(NzFormNoStatusService, {
      optional: true
    }));
    __publicField(this, "listOfNzInputDirective");
    __publicField(this, "nzAddOnBeforeIcon", null);
    __publicField(this, "nzAddOnAfterIcon", null);
    __publicField(this, "nzPrefixIcon", null);
    __publicField(this, "nzSuffixIcon", null);
    __publicField(this, "nzAddOnBefore");
    __publicField(this, "nzAddOnAfter");
    __publicField(this, "nzPrefix");
    __publicField(this, "nzStatus", "");
    __publicField(this, "nzSuffix");
    __publicField(this, "nzSize", "default");
    __publicField(this, "nzSearch", false);
    __publicField(this, "isLarge", false);
    __publicField(this, "isSmall", false);
    __publicField(this, "isAffix", false);
    __publicField(this, "isAddOn", false);
    __publicField(this, "isFeedback", false);
    __publicField(this, "focused", false);
    __publicField(this, "disabled", false);
    __publicField(this, "dir", "ltr");
    // status
    __publicField(this, "prefixCls", "ant-input");
    __publicField(this, "affixStatusCls", {});
    __publicField(this, "groupStatusCls", {});
    __publicField(this, "affixInGroupStatusCls", {});
    __publicField(this, "status", "");
    __publicField(this, "hasFeedback", false);
    this.destroyRef.onDestroy(() => this.focusMonitor.stopMonitoring(this.elementRef));
  }
  updateChildrenInputSize() {
    if (this.listOfNzInputDirective) {
      this.listOfNzInputDirective.forEach((item) => item["size"].set(this.nzSize));
    }
  }
  ngOnInit() {
    var _a2, _b2;
    (_a2 = this.nzFormStatusService) == null ? void 0 : _a2.formStatusChanges.pipe(distinctUntilChanged((pre, cur) => pre.status === cur.status && pre.hasFeedback === cur.hasFeedback), takeUntilDestroyed(this.destroyRef)).subscribe(({
      status,
      hasFeedback
    }) => {
      this.setStatusStyles(status, hasFeedback);
    });
    this.focusMonitor.monitor(this.elementRef, true).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((focusOrigin) => {
      this.focused = !!focusOrigin;
      this.cdr.markForCheck();
    });
    this.dir = this.directionality.value;
    (_b2 = this.directionality.change) == null ? void 0 : _b2.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
    });
  }
  ngAfterContentInit() {
    this.updateChildrenInputSize();
    const listOfInputChange$ = this.listOfNzInputDirective.changes.pipe(startWith(this.listOfNzInputDirective));
    listOfInputChange$.pipe(switchMap((list) => merge(...[listOfInputChange$, ...list.map((input2) => input2.disabled$)])), mergeMap(() => listOfInputChange$), map((list) => list.some((input2) => input2.finalDisabled())), takeUntilDestroyed(this.destroyRef)).subscribe((disabled) => {
      this.disabled = disabled;
      this.cdr.markForCheck();
    });
  }
  ngOnChanges(changes) {
    var _a2, _b2;
    const {
      nzSize,
      nzSuffix,
      nzPrefix,
      nzPrefixIcon,
      nzSuffixIcon,
      nzAddOnAfter,
      nzAddOnBefore,
      nzAddOnAfterIcon,
      nzAddOnBeforeIcon,
      nzStatus
    } = changes;
    if (nzSize) {
      this.updateChildrenInputSize();
      this.isLarge = this.nzSize === "large";
      this.isSmall = this.nzSize === "small";
    }
    if (nzSuffix || nzPrefix || nzPrefixIcon || nzSuffixIcon) {
      this.isAffix = !!(this.nzSuffix || this.nzPrefix || this.nzPrefixIcon || this.nzSuffixIcon);
    }
    if (nzAddOnAfter || nzAddOnBefore || nzAddOnAfterIcon || nzAddOnBeforeIcon) {
      this.isAddOn = !!(this.nzAddOnAfter || this.nzAddOnBefore || this.nzAddOnAfterIcon || this.nzAddOnBeforeIcon);
      (_b2 = (_a2 = this.nzFormNoStatusService) == null ? void 0 : _a2.noFormStatus) == null ? void 0 : _b2.next(this.isAddOn);
    }
    if (nzStatus) {
      this.setStatusStyles(this.nzStatus, this.hasFeedback);
    }
  }
  setStatusStyles(status, hasFeedback) {
    this.status = status;
    this.hasFeedback = hasFeedback;
    this.isFeedback = !!status && hasFeedback;
    const baseAffix = !!(this.nzSuffix || this.nzPrefix || this.nzPrefixIcon || this.nzSuffixIcon);
    this.isAffix = baseAffix || !this.isAddOn && hasFeedback;
    this.affixInGroupStatusCls = this.isAffix || this.isFeedback ? this.affixStatusCls = getStatusClassNames(`${this.prefixCls}-affix-wrapper`, status, hasFeedback) : {};
    this.cdr.markForCheck();
    this.affixStatusCls = getStatusClassNames(`${this.prefixCls}-affix-wrapper`, this.isAddOn ? "" : status, this.isAddOn ? false : hasFeedback);
    this.groupStatusCls = getStatusClassNames(`${this.prefixCls}-group-wrapper`, this.isAddOn ? status : "", this.isAddOn ? hasFeedback : false);
    const statusCls = __spreadValues(__spreadValues({}, this.affixStatusCls), this.groupStatusCls);
    Object.keys(statusCls).forEach((status2) => {
      if (statusCls[status2]) {
        this.renderer.addClass(this.elementRef.nativeElement, status2);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, status2);
      }
    });
  }
};
__publicField(_NzInputGroupComponent, "\u0275fac", function NzInputGroupComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputGroupComponent)();
});
__publicField(_NzInputGroupComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzInputGroupComponent,
  selectors: [["nz-input-group"]],
  contentQueries: function NzInputGroupComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzInputDirective, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfNzInputDirective = _t);
    }
  },
  hostVars: 38,
  hostBindings: function NzInputGroupComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-input-search-enter-button", ctx.nzSearch)("ant-input-search", ctx.nzSearch)("ant-input-search-rtl", ctx.dir === "rtl")("ant-input-search-sm", ctx.nzSearch && ctx.isSmall)("ant-input-search-large", ctx.nzSearch && ctx.isLarge)("ant-input-group-wrapper", ctx.isAddOn)("ant-input-group-wrapper-rtl", ctx.dir === "rtl")("ant-input-group-wrapper-lg", ctx.isAddOn && ctx.isLarge)("ant-input-group-wrapper-sm", ctx.isAddOn && ctx.isSmall)("ant-input-affix-wrapper", ctx.isAffix && !ctx.isAddOn)("ant-input-affix-wrapper-rtl", ctx.dir === "rtl")("ant-input-affix-wrapper-focused", ctx.isAffix && ctx.focused)("ant-input-affix-wrapper-disabled", ctx.isAffix && ctx.disabled)("ant-input-affix-wrapper-lg", ctx.isAffix && !ctx.isAddOn && ctx.isLarge)("ant-input-affix-wrapper-sm", ctx.isAffix && !ctx.isAddOn && ctx.isSmall)("ant-input-group", !ctx.isAffix && !ctx.isAddOn)("ant-input-group-rtl", ctx.dir === "rtl")("ant-input-group-lg", !ctx.isAffix && !ctx.isAddOn && ctx.isLarge)("ant-input-group-sm", !ctx.isAffix && !ctx.isAddOn && ctx.isSmall);
    }
  },
  inputs: {
    nzAddOnBeforeIcon: "nzAddOnBeforeIcon",
    nzAddOnAfterIcon: "nzAddOnAfterIcon",
    nzPrefixIcon: "nzPrefixIcon",
    nzSuffixIcon: "nzSuffixIcon",
    nzAddOnBefore: "nzAddOnBefore",
    nzAddOnAfter: "nzAddOnAfter",
    nzPrefix: "nzPrefix",
    nzStatus: "nzStatus",
    nzSuffix: "nzSuffix",
    nzSize: "nzSize",
    nzSearch: [2, "nzSearch", "nzSearch", booleanAttribute]
  },
  exportAs: ["nzInputGroup"],
  features: [\u0275\u0275ProvidersFeature([NzFormNoStatusService, {
    provide: NZ_SPACE_COMPACT_ITEM_TYPE,
    useValue: "input"
  }]), \u0275\u0275HostDirectivesFeature([NzSpaceCompactItemDirective]), \u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c1,
  decls: 6,
  vars: 1,
  consts: [["affixTemplate", ""], ["contentTemplate", ""], [1, "ant-input-wrapper", "ant-input-group"], ["nz-input-group-slot", "", "type", "addon", 3, "icon", "template"], [1, "ant-input-affix-wrapper", 3, "ant-input-affix-wrapper-disabled", "ant-input-affix-wrapper-sm", "ant-input-affix-wrapper-lg", "ant-input-affix-wrapper-focused", "class"], [3, "ngTemplateOutlet"], [1, "ant-input-affix-wrapper"], ["nz-input-group-slot", "", "type", "prefix", 3, "icon", "template"], ["nz-input-group-slot", "", "type", "suffix", 3, "icon", "template"], [3, "status"], ["nz-input-group-slot", "", "type", "suffix"]],
  template: function NzInputGroupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275conditionalCreate(0, NzInputGroupComponent_Conditional_0_Template, 5, 3, "span", 2)(1, NzInputGroupComponent_Conditional_1_Template, 2, 1);
      \u0275\u0275template(2, NzInputGroupComponent_ng_template_2_Template, 3, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(4, NzInputGroupComponent_ng_template_4_Template, 2, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.isAddOn ? 0 : 1);
    }
  },
  dependencies: [NzInputGroupSlotComponent, NgTemplateOutlet, NzFormItemFeedbackIconComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzInputGroupComponent = _NzInputGroupComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputGroupComponent, [{
    type: Component,
    args: [{
      selector: "nz-input-group",
      exportAs: "nzInputGroup",
      imports: [NzInputGroupSlotComponent, NgTemplateOutlet, NzFormItemFeedbackIconComponent],
      encapsulation: ViewEncapsulation.None,
      providers: [NzFormNoStatusService, {
        provide: NZ_SPACE_COMPACT_ITEM_TYPE,
        useValue: "input"
      }],
      template: `
    @if (isAddOn) {
      <span class="ant-input-wrapper ant-input-group">
        @if (nzAddOnBefore || nzAddOnBeforeIcon) {
          <span nz-input-group-slot type="addon" [icon]="nzAddOnBeforeIcon" [template]="nzAddOnBefore"></span>
        }

        @if (isAffix || hasFeedback) {
          <span
            class="ant-input-affix-wrapper"
            [class.ant-input-affix-wrapper-disabled]="disabled"
            [class.ant-input-affix-wrapper-sm]="isSmall"
            [class.ant-input-affix-wrapper-lg]="isLarge"
            [class.ant-input-affix-wrapper-focused]="focused"
            [class]="affixInGroupStatusCls"
          >
            <ng-template [ngTemplateOutlet]="affixTemplate" />
          </span>
        } @else {
          <ng-template [ngTemplateOutlet]="contentTemplate" />
        }
        @if (nzAddOnAfter || nzAddOnAfterIcon) {
          <span nz-input-group-slot type="addon" [icon]="nzAddOnAfterIcon" [template]="nzAddOnAfter"></span>
        }
      </span>
    } @else {
      @if (isAffix) {
        <ng-template [ngTemplateOutlet]="affixTemplate" />
      } @else {
        <ng-template [ngTemplateOutlet]="contentTemplate" />
      }
    }

    <!-- affix template -->
    <ng-template #affixTemplate>
      @if (nzPrefix || nzPrefixIcon) {
        <span nz-input-group-slot type="prefix" [icon]="nzPrefixIcon" [template]="nzPrefix"></span>
      }
      <ng-template [ngTemplateOutlet]="contentTemplate" />
      @if (nzSuffix || nzSuffixIcon || isFeedback) {
        <span nz-input-group-slot type="suffix" [icon]="nzSuffixIcon" [template]="nzSuffix">
          @if (isFeedback) {
            <nz-form-item-feedback-icon [status]="status" />
          }
        </span>
      }
    </ng-template>

    <!-- content template -->
    <ng-template #contentTemplate>
      <ng-content />
      @if (!isAddOn && !isAffix && isFeedback) {
        <span nz-input-group-slot type="suffix">
          <nz-form-item-feedback-icon [status]="status" />
        </span>
      }
    </ng-template>
  `,
      host: {
        "[class.ant-input-search-enter-button]": `nzSearch`,
        "[class.ant-input-search]": `nzSearch`,
        "[class.ant-input-search-rtl]": `dir === 'rtl'`,
        "[class.ant-input-search-sm]": `nzSearch && isSmall`,
        "[class.ant-input-search-large]": `nzSearch && isLarge`,
        "[class.ant-input-group-wrapper]": `isAddOn`,
        "[class.ant-input-group-wrapper-rtl]": `dir === 'rtl'`,
        "[class.ant-input-group-wrapper-lg]": `isAddOn && isLarge`,
        "[class.ant-input-group-wrapper-sm]": `isAddOn && isSmall`,
        "[class.ant-input-affix-wrapper]": `isAffix && !isAddOn`,
        "[class.ant-input-affix-wrapper-rtl]": `dir === 'rtl'`,
        "[class.ant-input-affix-wrapper-focused]": `isAffix && focused`,
        "[class.ant-input-affix-wrapper-disabled]": `isAffix && disabled`,
        "[class.ant-input-affix-wrapper-lg]": `isAffix && !isAddOn && isLarge`,
        "[class.ant-input-affix-wrapper-sm]": `isAffix && !isAddOn && isSmall`,
        "[class.ant-input-group]": `!isAffix && !isAddOn`,
        "[class.ant-input-group-rtl]": `dir === 'rtl'`,
        "[class.ant-input-group-lg]": `!isAffix && !isAddOn && isLarge`,
        "[class.ant-input-group-sm]": `!isAffix && !isAddOn && isSmall`
      },
      hostDirectives: [NzSpaceCompactItemDirective],
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], () => [], {
    listOfNzInputDirective: [{
      type: ContentChildren,
      args: [NzInputDirective]
    }],
    nzAddOnBeforeIcon: [{
      type: Input
    }],
    nzAddOnAfterIcon: [{
      type: Input
    }],
    nzPrefixIcon: [{
      type: Input
    }],
    nzSuffixIcon: [{
      type: Input
    }],
    nzAddOnBefore: [{
      type: Input
    }],
    nzAddOnAfter: [{
      type: Input
    }],
    nzPrefix: [{
      type: Input
    }],
    nzStatus: [{
      type: Input
    }],
    nzSuffix: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzSearch: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzInputOtpComponent = class _NzInputOtpComponent {
  constructor() {
    __publicField(this, "formBuilder", inject(FormBuilder));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "otpInputs");
    __publicField(this, "nzLength", 6);
    __publicField(this, "nzSize", "default");
    __publicField(this, "disabled", false);
    __publicField(this, "nzStatus", "");
    __publicField(this, "nzFormatter", (value) => value);
    __publicField(this, "nzMask", null);
    __publicField(this, "otpArray");
    __publicField(this, "internalValue", []);
    __publicField(this, "onChangeCallback");
    __publicField(this, "onTouched", () => {
    });
    this.createFormArray();
  }
  ngOnChanges(changes) {
    var _a2;
    if ((_a2 = changes["nzLength"]) == null ? void 0 : _a2.currentValue) {
      this.createFormArray();
    }
    if (changes["disabled"]) {
      this.setDisabledState(this.disabled);
    }
  }
  onInput(index, event) {
    const inputElement = event.target;
    const nextInput = this.otpInputs.toArray()[index + 1];
    if (inputElement.value && nextInput) {
      nextInput.nativeElement.focus();
    } else if (!nextInput) {
      this.selectInputBox(index);
    }
  }
  onFocus(event) {
    const inputElement = event.target;
    inputElement.select();
  }
  onKeyDown(index, event) {
    const previousInput = this.otpInputs.toArray()[index - 1];
    if (event.keyCode === BACKSPACE) {
      event.preventDefault();
      this.internalValue[index] = "";
      this.otpArray.at(index).setValue("", {
        emitEvent: false
      });
      if (previousInput) {
        this.selectInputBox(index - 1);
      }
      this.emitValue();
    } else if (event.keyCode === LEFT_ARROW) {
      event.preventDefault();
      this.selectInputBox(index - 1);
    } else if (event.keyCode === RIGHT_ARROW) {
      event.preventDefault();
      this.selectInputBox(index + 1);
    }
  }
  writeValue(value) {
    if (!value) {
      this.otpArray.reset();
      return;
    }
    const controlValues = value.split("");
    this.internalValue = controlValues;
    controlValues.forEach((val, i) => {
      const formattedValue = this.nzFormatter(val);
      const value2 = this.nzMask ? this.nzMask : formattedValue;
      this.otpArray.at(i).setValue(value2, {
        emitEvent: false
      });
    });
  }
  registerOnChange(fn) {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    if (isDisabled) {
      this.otpArray.disable();
    } else {
      this.otpArray.enable();
    }
  }
  onPaste(index, event) {
    var _a2;
    const pastedText = ((_a2 = event.clipboardData) == null ? void 0 : _a2.getData("text")) || "";
    if (!pastedText) return;
    let currentIndex = index;
    for (const char of pastedText.split("")) {
      if (currentIndex < this.nzLength) {
        const formattedChar = this.nzFormatter(char);
        this.internalValue[currentIndex] = char;
        const maskedValue = this.nzMask ? this.nzMask : formattedChar;
        this.otpArray.at(currentIndex).setValue(maskedValue, {
          emitEvent: false
        });
        currentIndex++;
      } else {
        break;
      }
    }
    event.preventDefault();
    this.selectInputBox(currentIndex);
    this.emitValue();
  }
  createFormArray() {
    this.otpArray = this.formBuilder.array([]);
    this.internalValue = new Array(this.nzLength).fill("");
    for (let i = 0; i < this.nzLength; i++) {
      const control = this.formBuilder.nonNullable.control("", [Validators.required]);
      control.valueChanges.pipe(tap((value) => {
        var _a2;
        const unmaskedValue = this.nzFormatter(value);
        this.internalValue[i] = unmaskedValue;
        control.setValue((_a2 = this.nzMask) != null ? _a2 : unmaskedValue, {
          emitEvent: false
        });
        this.emitValue();
      }), takeUntilDestroyed(this.destroyRef)).subscribe();
      this.otpArray.push(control);
    }
  }
  emitValue() {
    const result = this.internalValue.join("");
    if (this.onChangeCallback) {
      this.onChangeCallback(result);
    }
  }
  selectInputBox(index) {
    const otpInputArray = this.otpInputs.toArray();
    if (index <= 0) index = 0;
    if (index >= otpInputArray.length) index = otpInputArray.length - 1;
    otpInputArray[index].nativeElement.select();
  }
};
__publicField(_NzInputOtpComponent, "\u0275fac", function NzInputOtpComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputOtpComponent)();
});
__publicField(_NzInputOtpComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzInputOtpComponent,
  selectors: [["nz-input-otp"]],
  viewQuery: function NzInputOtpComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c2, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.otpInputs = _t);
    }
  },
  hostAttrs: [1, "ant-otp"],
  inputs: {
    nzLength: [2, "nzLength", "nzLength", numberAttribute],
    nzSize: "nzSize",
    disabled: [2, "disabled", "disabled", booleanAttribute],
    nzStatus: "nzStatus",
    nzFormatter: "nzFormatter",
    nzMask: "nzMask"
  },
  exportAs: ["nzInputOtp"],
  features: [\u0275\u0275ProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _NzInputOtpComponent),
    multi: true
  }]), \u0275\u0275NgOnChangesFeature],
  decls: 2,
  vars: 0,
  consts: [["otpInput", ""], ["nz-input", "", "type", "text", "maxlength", "1", "size", "1", 1, "ant-otp-input", 3, "nzSize", "formControl", "nzStatus"], ["nz-input", "", "type", "text", "maxlength", "1", "size", "1", 1, "ant-otp-input", 3, "input", "focus", "keydown", "paste", "nzSize", "formControl", "nzStatus"]],
  template: function NzInputOtpComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275repeaterCreate(0, NzInputOtpComponent_For_1_Template, 2, 3, "input", 1, \u0275\u0275repeaterTrackByIndex);
    }
    if (rf & 2) {
      \u0275\u0275repeater(ctx.otpArray.controls);
    }
  },
  dependencies: [NzInputDirective, ReactiveFormsModule, DefaultValueAccessor, NgControlStatus, MaxLengthValidator, FormControlDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzInputOtpComponent = _NzInputOtpComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputOtpComponent, [{
    type: Component,
    args: [{
      selector: "nz-input-otp",
      exportAs: "nzInputOtp",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @for (item of otpArray.controls; track $index) {
      <input
        nz-input
        class="ant-otp-input"
        type="text"
        maxlength="1"
        size="1"
        [nzSize]="nzSize"
        [formControl]="item"
        [nzStatus]="nzStatus"
        (input)="onInput($index, $event)"
        (focus)="onFocus($event)"
        (keydown)="onKeyDown($index, $event)"
        (paste)="onPaste($index, $event)"
        #otpInput
      />
    }
  `,
      host: {
        class: "ant-otp"
      },
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzInputOtpComponent),
        multi: true
      }],
      imports: [NzInputDirective, ReactiveFormsModule]
    }]
  }], () => [], {
    otpInputs: [{
      type: ViewChildren,
      args: ["otpInput"]
    }],
    nzLength: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzSize: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzStatus: [{
      type: Input
    }],
    nzFormatter: [{
      type: Input
    }],
    nzMask: [{
      type: Input
    }]
  });
})();
var _NzInputSearchDirective = class _NzInputSearchDirective {
  constructor() {
    __publicField(this, "inputDir", contentChild.required(NzInputDirective));
    __publicField(this, "inputRef", contentChild.required(NzInputDirective, {
      read: ElementRef
    }));
    __publicField(this, "nzEnterButton", input(false, ...ngDevMode ? [{
      debugName: "nzEnterButton"
    }] : []));
    __publicField(this, "nzLoading", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzLoading"
    } : {}), {
      transform: booleanAttribute
    })));
    __publicField(this, "nzSearch", output());
    __publicField(this, "size", computed(() => this.inputDir().nzSize(), ...ngDevMode ? [{
      debugName: "size"
    }] : []));
  }
  search(event, source = "input") {
    if (!this.nzLoading()) {
      this.nzSearch.emit({
        value: this.inputRef().nativeElement.value,
        event,
        source
      });
    }
  }
  onEnter(event) {
    if (event.target === this.inputRef().nativeElement) {
      this.search(event);
    }
  }
};
__publicField(_NzInputSearchDirective, "\u0275fac", function NzInputSearchDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputSearchDirective)();
});
__publicField(_NzInputSearchDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzInputSearchDirective,
  selectors: [["nz-input-search"]],
  contentQueries: function NzInputSearchDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuerySignal(dirIndex, ctx.inputDir, NzInputDirective, 5)(dirIndex, ctx.inputRef, NzInputDirective, 5, ElementRef);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  },
  hostAttrs: [1, "ant-input-search"],
  hostVars: 6,
  hostBindings: function NzInputSearchDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown.enter", function NzInputSearchDirective_keydown_enter_HostBindingHandler($event) {
        return ctx.onEnter($event);
      });
    }
    if (rf & 2) {
      \u0275\u0275classProp("ant-input-search-large", ctx.size() === "large")("ant-input-search-small", ctx.size() === "small")("ant-input-search-with-button", ctx.nzEnterButton() !== false);
    }
  },
  inputs: {
    nzEnterButton: [1, "nzEnterButton"],
    nzLoading: [1, "nzLoading"]
  },
  outputs: {
    nzSearch: "nzSearch"
  },
  exportAs: ["nzInputSearch"],
  features: [\u0275\u0275ProvidersFeature([{
    provide: NZ_INPUT_SEARCH,
    useExisting: forwardRef(() => _NzInputSearchDirective)
  }])]
}));
var NzInputSearchDirective = _NzInputSearchDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputSearchDirective, [{
    type: Directive,
    args: [{
      selector: "nz-input-search",
      exportAs: "nzInputSearch",
      providers: [{
        provide: NZ_INPUT_SEARCH,
        useExisting: forwardRef(() => NzInputSearchDirective)
      }],
      host: {
        class: "ant-input-search",
        "[class.ant-input-search-large]": `size() === 'large'`,
        "[class.ant-input-search-small]": `size() === 'small'`,
        "[class.ant-input-search-with-button]": "nzEnterButton() !== false",
        "(keydown.enter)": "onEnter($any($event))"
      }
    }]
  }], null, {
    inputDir: [{
      type: ContentChild,
      args: [forwardRef(() => NzInputDirective), {
        isSignal: true
      }]
    }],
    inputRef: [{
      type: ContentChild,
      args: [forwardRef(() => NzInputDirective), __spreadProps(__spreadValues({}, {
        read: ElementRef
      }), {
        isSignal: true
      })]
    }],
    nzEnterButton: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzEnterButton",
        required: false
      }]
    }],
    nzLoading: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzLoading",
        required: false
      }]
    }],
    nzSearch: [{
      type: Output,
      args: ["nzSearch"]
    }]
  });
})();
var _NzInputSearchEnterButtonDirective = class _NzInputSearchEnterButtonDirective {
};
__publicField(_NzInputSearchEnterButtonDirective, "\u0275fac", function NzInputSearchEnterButtonDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputSearchEnterButtonDirective)();
});
__publicField(_NzInputSearchEnterButtonDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzInputSearchEnterButtonDirective,
  selectors: [["", "nzInputSearchEnterButton", ""]]
}));
var NzInputSearchEnterButtonDirective = _NzInputSearchEnterButtonDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputSearchEnterButtonDirective, [{
    type: Directive,
    args: [{
      selector: "[nzInputSearchEnterButton]"
    }]
  }], null, null);
})();
var _NzInputWrapperComponent = class _NzInputWrapperComponent {
  constructor() {
    __publicField(this, "focusMonitor", inject(FocusMonitor));
    __publicField(this, "inputPasswordDir", inject(NzInputPasswordDirective, {
      self: true,
      optional: true
    }));
    __publicField(this, "inputSearchDir", inject(NzInputSearchDirective, {
      self: true,
      optional: true
    }));
    __publicField(this, "inputRef", contentChild.required(NzInputDirective, {
      read: ElementRef
    }));
    __publicField(this, "inputDir", contentChild.required(NzInputDirective));
    __publicField(this, "prefix", contentChild(NzInputPrefixDirective, ...ngDevMode ? [{
      debugName: "prefix"
    }] : []));
    __publicField(this, "suffix", contentChild(NzInputSuffixDirective, ...ngDevMode ? [{
      debugName: "suffix"
    }] : []));
    __publicField(this, "addonBefore", contentChild(NzInputAddonBeforeDirective, ...ngDevMode ? [{
      debugName: "addonBefore"
    }] : []));
    __publicField(this, "addonAfter", contentChild(NzInputAddonAfterDirective, ...ngDevMode ? [{
      debugName: "addonAfter"
    }] : []));
    __publicField(this, "inputPasswordIconTmpl", contentChild(NzInputPasswordIconDirective, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "inputPasswordIconTmpl"
    } : {}), {
      read: TemplateRef
    })));
    __publicField(this, "inputSearchEnterButton", contentChild(NzInputSearchEnterButtonDirective, ...ngDevMode ? [{
      debugName: "inputSearchEnterButton"
    }] : []));
    __publicField(this, "nzAllowClear", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzAllowClear"
    } : {}), {
      transform: booleanAttribute
    })));
    __publicField(this, "nzPrefix", input(...ngDevMode ? [void 0, {
      debugName: "nzPrefix"
    }] : []));
    __publicField(this, "nzSuffix", input(...ngDevMode ? [void 0, {
      debugName: "nzSuffix"
    }] : []));
    __publicField(this, "nzAddonBefore", input(...ngDevMode ? [void 0, {
      debugName: "nzAddonBefore"
    }] : []));
    __publicField(this, "nzAddonAfter", input(...ngDevMode ? [void 0, {
      debugName: "nzAddonAfter"
    }] : []));
    __publicField(this, "nzShowCount", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzShowCount"
    } : {}), {
      transform: booleanAttribute
    })));
    __publicField(this, "nzCount", input(...ngDevMode ? [void 0, {
      debugName: "nzCount"
    }] : []));
    __publicField(this, "nzClear", output());
    __publicField(this, "size", computed(() => this.inputDir().nzSize(), ...ngDevMode ? [{
      debugName: "size"
    }] : []));
    __publicField(this, "variant", computed(() => this.inputDir().nzVariant(), ...ngDevMode ? [{
      debugName: "variant"
    }] : []));
    __publicField(this, "disabled", computed(() => this.inputDir().finalDisabled(), ...ngDevMode ? [{
      debugName: "disabled"
    }] : []));
    __publicField(this, "readOnly", computed(() => this.inputDir().readonly(), ...ngDevMode ? [{
      debugName: "readOnly"
    }] : []));
    __publicField(this, "status", computed(() => this.inputDir().status(), ...ngDevMode ? [{
      debugName: "status"
    }] : []));
    __publicField(this, "hasFeedback", computed(() => this.inputDir().hasFeedback(), ...ngDevMode ? [{
      debugName: "hasFeedback"
    }] : []));
    __publicField(this, "hasPrefix", computed(() => !!this.nzPrefix() || !!this.prefix(), ...ngDevMode ? [{
      debugName: "hasPrefix"
    }] : []));
    __publicField(this, "hasSuffix", computed(() => !!this.nzSuffix() || !!this.suffix() || this.nzAllowClear() || this.hasFeedback() || this.nzShowCount() || this.inputPasswordDir, ...ngDevMode ? [{
      debugName: "hasSuffix"
    }] : []));
    __publicField(this, "hasAffix", computed(() => this.hasPrefix() || this.hasSuffix(), ...ngDevMode ? [{
      debugName: "hasAffix"
    }] : []));
    __publicField(this, "hasAddonBefore", computed(() => !!this.nzAddonBefore() || !!this.addonBefore(), ...ngDevMode ? [{
      debugName: "hasAddonBefore"
    }] : []));
    __publicField(this, "hasAddonAfter", computed(() => !!this.nzAddonAfter() || !!this.addonAfter() || !!this.inputSearchDir, ...ngDevMode ? [{
      debugName: "hasAddonAfter"
    }] : []));
    __publicField(this, "hasAddon", computed(() => this.hasAddonBefore() || this.hasAddonAfter(), ...ngDevMode ? [{
      debugName: "hasAddon"
    }] : []));
    __publicField(this, "compactSize", inject(NZ_SPACE_COMPACT_SIZE, {
      optional: true
    }));
    __publicField(this, "dir", inject(Directionality).valueSignal);
    __publicField(this, "focused", signal(false, ...ngDevMode ? [{
      debugName: "focused"
    }] : []));
    __publicField(this, "isTextarea", computed(() => this.inputRef().nativeElement instanceof HTMLTextAreaElement, ...ngDevMode ? [{
      debugName: "isTextarea"
    }] : []));
    __publicField(this, "finalSize", computed(() => {
      if (this.compactSize) {
        return this.compactSize();
      }
      return this.size();
    }, ...ngDevMode ? [{
      debugName: "finalSize"
    }] : []));
    __publicField(this, "class", computed(() => {
      if (this.hasAddon()) {
        return this.groupWrapperClass();
      }
      if (this.hasAffix()) {
        return this.affixWrapperClass();
      }
      return null;
    }, ...ngDevMode ? [{
      debugName: "class"
    }] : []));
    __publicField(this, "affixWrapperClass", computed(() => {
      return __spreadValues(__spreadValues({
        "ant-input-affix-wrapper": true,
        "ant-input-affix-wrapper-lg": this.finalSize() === "large",
        "ant-input-affix-wrapper-sm": this.finalSize() === "small",
        "ant-input-affix-wrapper-disabled": this.disabled(),
        "ant-input-affix-wrapper-readonly": this.readOnly(),
        "ant-input-affix-wrapper-focused": this.focused(),
        "ant-input-affix-wrapper-rtl": this.dir() === "rtl"
      }, getStatusClassNames("ant-input-affix-wrapper", this.status(), this.hasFeedback())), getVariantClassNames("ant-input-affix-wrapper", this.variant()));
    }, ...ngDevMode ? [{
      debugName: "affixWrapperClass"
    }] : []));
    __publicField(this, "groupWrapperClass", computed(() => {
      return __spreadValues(__spreadValues({
        "ant-input-group-wrapper": true,
        "ant-input-group-wrapper-sm": this.finalSize() === "small",
        "ant-input-group-wrapper-lg": this.finalSize() === "large",
        "ant-input-group-wrapper-rtl": this.dir() === "rtl"
      }, getStatusClassNames("ant-input-group-wrapper", this.status(), this.hasFeedback())), getVariantClassNames("ant-input-group-wrapper", this.variant()));
    }, ...ngDevMode ? [{
      debugName: "groupWrapperClass"
    }] : []));
    __publicField(this, "inputValue", toSignal(toObservable(this.inputDir).pipe(switchMap((inputDir) => {
      var _a2;
      const ngControl = inputDir.ngControl;
      if (!ngControl) return EMPTY;
      return ((_a2 = ngControl.valueChanges) != null ? _a2 : EMPTY).pipe(startWith(ngControl.value));
    }))));
    __publicField(this, "formattedValue", computed(() => {
      var _a2;
      const countConfig = this.nzCount();
      const inputValue = this.inputValue();
      const countMax = (_a2 = countConfig == null ? void 0 : countConfig.max) != null ? _a2 : 0;
      const value = isNotNil(inputValue) ? String(inputValue) : "";
      let formattedValue = value;
      if (countConfig == null ? void 0 : countConfig.exceedFormatter) {
        formattedValue = countConfig.exceedFormatter(value, {
          max: countMax
        });
      }
      return formattedValue;
    }, ...ngDevMode ? [{
      debugName: "formattedValue"
    }] : []));
    __publicField(this, "computedCount", computed(() => {
      const countConfig = this.nzCount();
      const formattedValue = this.formattedValue();
      let computedCount = formattedValue.length;
      if (countConfig == null ? void 0 : countConfig.strategy) {
        computedCount = countConfig.strategy(formattedValue);
      }
      return computedCount;
    }, ...ngDevMode ? [{
      debugName: "computedCount"
    }] : []));
    __publicField(this, "dataCount", computed(() => {
      const countConfig = this.nzCount();
      const computedCount = this.computedCount();
      const countMax = countConfig == null ? void 0 : countConfig.max;
      return `${computedCount}${countMax ? `/${countMax}` : ``}`;
    }, ...ngDevMode ? [{
      debugName: "dataCount"
    }] : []));
    __publicField(this, "isOutOfRange", computed(() => {
      const countConfig = this.nzCount();
      const countMax = countConfig == null ? void 0 : countConfig.max;
      if (isNumberFinite(countMax)) {
        return this.computedCount() > countMax;
      }
      return false;
    }, ...ngDevMode ? [{
      debugName: "isOutOfRange"
    }] : []));
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const element = this.inputRef();
      this.focusMonitor.monitor(element).pipe(takeUntilDestroyed(destroyRef)).subscribe((origin) => {
        this.focused.set(!!origin);
      });
      destroyRef.onDestroy(() => {
        this.focusMonitor.stopMonitoring(element);
      });
    });
    effect(() => {
      var _a2, _b2;
      if (this.nzCount()) {
        const inputValue = this.inputValue();
        const formattedValue = this.formattedValue();
        if (isNotNil(inputValue) && formattedValue !== inputValue) {
          (_b2 = (_a2 = this.inputDir().ngControl) == null ? void 0 : _a2.control) == null ? void 0 : _b2.setValue(formattedValue);
        }
      }
    });
  }
  clear() {
    var _a2, _b2;
    (_b2 = (_a2 = this.inputDir().ngControl) == null ? void 0 : _a2.control) == null ? void 0 : _b2.setValue("");
    this.nzClear.emit();
  }
};
__publicField(_NzInputWrapperComponent, "\u0275fac", function NzInputWrapperComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputWrapperComponent)();
});
__publicField(_NzInputWrapperComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzInputWrapperComponent,
  selectors: [["nz-input-wrapper"], ["nz-input-password"], ["nz-input-search"]],
  contentQueries: function NzInputWrapperComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuerySignal(dirIndex, ctx.inputRef, NzInputDirective, 5, ElementRef)(dirIndex, ctx.inputDir, NzInputDirective, 5)(dirIndex, ctx.prefix, NzInputPrefixDirective, 5)(dirIndex, ctx.suffix, NzInputSuffixDirective, 5)(dirIndex, ctx.addonBefore, NzInputAddonBeforeDirective, 5)(dirIndex, ctx.addonAfter, NzInputAddonAfterDirective, 5)(dirIndex, ctx.inputPasswordIconTmpl, NzInputPasswordIconDirective, 5, TemplateRef)(dirIndex, ctx.inputSearchEnterButton, NzInputSearchEnterButtonDirective, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(8);
    }
  },
  hostVars: 8,
  hostBindings: function NzInputWrapperComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classMap(ctx.class());
      \u0275\u0275classProp("ant-input-disabled", ctx.disabled())("ant-input-out-of-range", ctx.nzShowCount() && ctx.isOutOfRange())("ant-input-affix-wrapper-textarea-with-clear-btn", ctx.nzAllowClear() && ctx.isTextarea());
    }
  },
  inputs: {
    nzAllowClear: [1, "nzAllowClear"],
    nzPrefix: [1, "nzPrefix"],
    nzSuffix: [1, "nzSuffix"],
    nzAddonBefore: [1, "nzAddonBefore"],
    nzAddonAfter: [1, "nzAddonAfter"],
    nzShowCount: [1, "nzShowCount"],
    nzCount: [1, "nzCount"]
  },
  outputs: {
    nzClear: "nzClear"
  },
  exportAs: ["nzInputWrapper"],
  features: [\u0275\u0275ProvidersFeature([{
    provide: NZ_SPACE_COMPACT_ITEM_TYPE,
    useValue: "input"
  }, {
    provide: NZ_INPUT_WRAPPER,
    useExisting: forwardRef(() => _NzInputWrapperComponent)
  }]), \u0275\u0275HostDirectivesFeature([NzSpaceCompactItemDirective])],
  ngContentSelectors: _c4,
  decls: 11,
  vars: 1,
  consts: [["inputWithAddonInner", ""], ["inputWithAffix", ""], ["inputWithAffixInner", ""], ["input", ""], [3, "ngTemplateOutlet"], [1, "ant-input-wrapper", "ant-input-group"], [1, "ant-input-group-addon"], ["nz-button", "", "type", "button", 1, "ant-input-search-button", 3, "nzType", "nzSize", "nzLoading"], ["nz-button", "", "type", "button", 1, "ant-input-search-button", 3, "click", "nzType", "nzSize", "nzLoading"], ["nzType", "search", "nzTheme", "outline"], [1, "ant-input-prefix"], [1, "ant-input-suffix"], ["role", "button", "tabindex", "-1", 1, "ant-input-clear-icon", 3, "ant-input-clear-icon-has-suffix", "ant-input-clear-icon-hidden"], [1, "ant-input-show-count-suffix"], ["role", "button", "tabindex", "-1", 1, "ant-input-password-icon"], [3, "status"], ["role", "button", "tabindex", "-1", 1, "ant-input-clear-icon", 3, "click"], ["nzType", "close-circle", "nzTheme", "fill"], ["role", "button", "tabindex", "-1", 1, "ant-input-password-icon", 3, "click"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["nzTheme", "outline", 3, "nzType"]],
  template: function NzInputWrapperComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c3);
      \u0275\u0275conditionalCreate(0, NzInputWrapperComponent_Conditional_0_Template, 1, 1, null, 4)(1, NzInputWrapperComponent_Conditional_1_Template, 1, 1, null, 4)(2, NzInputWrapperComponent_Conditional_2_Template, 1, 1, null, 4);
      \u0275\u0275template(3, NzInputWrapperComponent_ng_template_3_Template, 5, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(5, NzInputWrapperComponent_ng_template_5_Template, 2, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(7, NzInputWrapperComponent_ng_template_7_Template, 3, 3, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(9, NzInputWrapperComponent_ng_template_9_Template, 1, 0, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.hasAddon() ? 0 : ctx.hasAffix() ? 1 : 2);
    }
  },
  dependencies: [NzIconModule, NzIconDirective, NzButtonModule, NzButtonComponent, NzTransitionPatchDirective, NzWaveDirective, NzFormItemFeedbackIconComponent, NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var NzInputWrapperComponent = _NzInputWrapperComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputWrapperComponent, [{
    type: Component,
    args: [{
      selector: "nz-input-wrapper,nz-input-password,nz-input-search",
      exportAs: "nzInputWrapper",
      imports: [NzIconModule, NzButtonModule, NzFormItemFeedbackIconComponent, NgTemplateOutlet],
      template: `
    @if (hasAddon()) {
      <ng-template [ngTemplateOutlet]="inputWithAddonInner" />
    } @else if (hasAffix()) {
      <ng-template [ngTemplateOutlet]="inputWithAffixInner" />
    } @else {
      <ng-template [ngTemplateOutlet]="input" />
    }

    <ng-template #inputWithAddonInner>
      <span class="ant-input-wrapper ant-input-group">
        @if (hasAddonBefore()) {
          <span class="ant-input-group-addon">
            <ng-content select="[nzInputAddonBefore]">{{ nzAddonBefore() }}</ng-content>
          </span>
        }

        @if (hasAffix()) {
          <ng-template [ngTemplateOutlet]="inputWithAffix" />
        } @else {
          <ng-template [ngTemplateOutlet]="input" />
        }

        @if (hasAddonAfter()) {
          <span class="ant-input-group-addon">
            @if (inputSearchDir) {
              @let nzEnterButton = inputSearchDir.nzEnterButton();
              @let hasEnterButton = inputSearchEnterButton() ?? nzEnterButton !== false;
              <button
                nz-button
                [nzType]="hasEnterButton ? 'primary' : 'default'"
                [nzSize]="size()"
                [nzLoading]="inputSearchDir.nzLoading()"
                type="button"
                class="ant-input-search-button"
                (click)="inputSearchDir.search($event)"
              >
                <ng-content select="[nzInputSearchEnterButton]">
                  @if (nzEnterButton && typeof nzEnterButton === 'string') {
                    {{ nzEnterButton }}
                  } @else {
                    <nz-icon nzType="search" nzTheme="outline" />
                  }
                </ng-content>
              </button>
            }
            <ng-content select="[nzInputAddonAfter]">{{ nzAddonAfter() }}</ng-content>
          </span>
        }
      </span>
    </ng-template>

    <ng-template #inputWithAffix>
      <span [class]="affixWrapperClass()">
        <ng-template [ngTemplateOutlet]="inputWithAffixInner" />
      </span>
    </ng-template>

    <ng-template #inputWithAffixInner>
      @if (hasPrefix()) {
        <span class="ant-input-prefix">
          <ng-content select="[nzInputPrefix]">{{ nzPrefix() }}</ng-content>
        </span>
      }
      <ng-template [ngTemplateOutlet]="input" />
      @if (hasSuffix()) {
        <span class="ant-input-suffix">
          @if (nzAllowClear()) {
            <span
              class="ant-input-clear-icon"
              [class.ant-input-clear-icon-has-suffix]="
                nzSuffix() || suffix() || hasFeedback() || inputPasswordDir?.nzVisibilityToggle()
              "
              [class.ant-input-clear-icon-hidden]="!inputDir().value() || disabled() || readOnly()"
              role="button"
              tabindex="-1"
              (click)="clear(); inputSearchDir?.search($event, 'clear')"
            >
              <ng-content select="[nzInputClearIcon]">
                <nz-icon nzType="close-circle" nzTheme="fill" />
              </ng-content>
            </span>
          }
          @if (nzShowCount()) {
            <span class="ant-input-show-count-suffix">{{ dataCount() }}</span>
          }
          @if (inputPasswordDir && inputPasswordDir.nzVisibilityToggle()) {
            <span
              class="ant-input-password-icon"
              role="button"
              tabindex="-1"
              (click)="inputPasswordDir.toggleVisible()"
            >
              @if (inputPasswordIconTmpl(); as tmpl) {
                <ng-template
                  [ngTemplateOutlet]="tmpl"
                  [ngTemplateOutletContext]="{ $implicit: inputPasswordDir.nzVisible() }"
                />
              } @else {
                <nz-icon [nzType]="inputPasswordDir.nzVisible() ? 'eye' : 'eye-invisible'" nzTheme="outline" />
              }
            </span>
          }
          <ng-content select="[nzInputSuffix]">{{ nzSuffix() }}</ng-content>
          @if (hasFeedback() && status()) {
            <nz-form-item-feedback-icon [status]="status()" />
          }
        </span>
      }
    </ng-template>

    <ng-template #input>
      <ng-content select="[nz-input]" />
    </ng-template>
  `,
      providers: [{
        provide: NZ_SPACE_COMPACT_ITEM_TYPE,
        useValue: "input"
      }, {
        provide: NZ_INPUT_WRAPPER,
        useExisting: forwardRef(() => NzInputWrapperComponent)
      }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      hostDirectives: [NzSpaceCompactItemDirective],
      host: {
        "[class]": "class()",
        "[class.ant-input-disabled]": "disabled()",
        "[class.ant-input-out-of-range]": "nzShowCount() && isOutOfRange()",
        "[class.ant-input-affix-wrapper-textarea-with-clear-btn]": "nzAllowClear() && isTextarea()"
      }
    }]
  }], () => [], {
    inputRef: [{
      type: ContentChild,
      args: [forwardRef(() => NzInputDirective), __spreadProps(__spreadValues({}, {
        read: ElementRef
      }), {
        isSignal: true
      })]
    }],
    inputDir: [{
      type: ContentChild,
      args: [forwardRef(() => NzInputDirective), {
        isSignal: true
      }]
    }],
    prefix: [{
      type: ContentChild,
      args: [forwardRef(() => NzInputPrefixDirective), {
        isSignal: true
      }]
    }],
    suffix: [{
      type: ContentChild,
      args: [forwardRef(() => NzInputSuffixDirective), {
        isSignal: true
      }]
    }],
    addonBefore: [{
      type: ContentChild,
      args: [forwardRef(() => NzInputAddonBeforeDirective), {
        isSignal: true
      }]
    }],
    addonAfter: [{
      type: ContentChild,
      args: [forwardRef(() => NzInputAddonAfterDirective), {
        isSignal: true
      }]
    }],
    inputPasswordIconTmpl: [{
      type: ContentChild,
      args: [forwardRef(() => NzInputPasswordIconDirective), __spreadProps(__spreadValues({}, {
        read: TemplateRef
      }), {
        isSignal: true
      })]
    }],
    inputSearchEnterButton: [{
      type: ContentChild,
      args: [forwardRef(() => NzInputSearchEnterButtonDirective), {
        isSignal: true
      }]
    }],
    nzAllowClear: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzAllowClear",
        required: false
      }]
    }],
    nzPrefix: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzPrefix",
        required: false
      }]
    }],
    nzSuffix: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzSuffix",
        required: false
      }]
    }],
    nzAddonBefore: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzAddonBefore",
        required: false
      }]
    }],
    nzAddonAfter: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzAddonAfter",
        required: false
      }]
    }],
    nzShowCount: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzShowCount",
        required: false
      }]
    }],
    nzCount: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzCount",
        required: false
      }]
    }],
    nzClear: [{
      type: Output,
      args: ["nzClear"]
    }]
  });
})();
var _NzTextareaCountComponent = class _NzTextareaCountComponent {
  constructor() {
    __publicField(this, "renderer", inject(Renderer2));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "nzInputDirective");
    __publicField(this, "nzMaxCharacterCount", 0);
    __publicField(this, "nzComputeCharacterCount", (v) => v.length);
    __publicField(this, "nzFormatter", (c, m) => `${c}${m > 0 ? `/${m}` : ``}`);
  }
  ngAfterContentInit() {
    if (!this.nzInputDirective && isDevMode()) {
      throw new Error("[nz-textarea-count]: Could not find matching textarea[nz-input] child.");
    }
    if (this.nzInputDirective.ngControl) {
      const valueChanges = this.nzInputDirective.ngControl.valueChanges || EMPTY;
      valueChanges.pipe(takeUntilDestroyed(this.destroyRef), map(() => this.nzInputDirective.ngControl.value), startWith(this.nzInputDirective.ngControl.value)).subscribe((value) => {
        this.setDataCount(value);
      });
    }
  }
  setDataCount(value) {
    const inputValue = isNotNil(value) ? String(value) : "";
    const currentCount = this.nzComputeCharacterCount(inputValue);
    const dataCount = this.nzFormatter(currentCount, this.nzMaxCharacterCount);
    this.renderer.setAttribute(this.elementRef.nativeElement, "data-count", dataCount);
  }
};
__publicField(_NzTextareaCountComponent, "\u0275fac", function NzTextareaCountComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTextareaCountComponent)();
});
__publicField(_NzTextareaCountComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTextareaCountComponent,
  selectors: [["nz-textarea-count"]],
  contentQueries: function NzTextareaCountComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzInputDirective, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzInputDirective = _t.first);
    }
  },
  hostAttrs: [1, "ant-input-textarea-show-count"],
  inputs: {
    nzMaxCharacterCount: [2, "nzMaxCharacterCount", "nzMaxCharacterCount", numberAttribute],
    nzComputeCharacterCount: "nzComputeCharacterCount",
    nzFormatter: "nzFormatter"
  },
  ngContentSelectors: _c7,
  decls: 1,
  vars: 0,
  template: function NzTextareaCountComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c6);
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzTextareaCountComponent = _NzTextareaCountComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTextareaCountComponent, [{
    type: Component,
    args: [{
      selector: "nz-textarea-count",
      template: `<ng-content select="textarea[nz-input]" />`,
      host: {
        class: "ant-input-textarea-show-count"
      },
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, {
    nzInputDirective: [{
      type: ContentChild,
      args: [NzInputDirective, {
        static: true
      }]
    }],
    nzMaxCharacterCount: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzComputeCharacterCount: [{
      type: Input
    }],
    nzFormatter: [{
      type: Input
    }]
  });
})();
var _NzInputModule = class _NzInputModule {
};
__publicField(_NzInputModule, "\u0275fac", function NzInputModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputModule)();
});
__publicField(_NzInputModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzInputModule,
  imports: [NzTextareaCountComponent, NzInputDirective, NzInputWrapperComponent, NzInputPasswordDirective, NzInputPasswordIconDirective, NzInputSearchDirective, NzInputSearchEnterButtonDirective, NzInputAddonBeforeDirective, NzInputAddonAfterDirective, NzInputPrefixDirective, NzInputSuffixDirective, NzInputGroupComponent, NzAutosizeDirective, NzInputGroupSlotComponent, NzInputGroupWhitSuffixOrPrefixDirective, NzInputOtpComponent],
  exports: [NzTextareaCountComponent, NzInputDirective, NzInputWrapperComponent, NzInputPasswordDirective, NzInputPasswordIconDirective, NzInputSearchDirective, NzInputSearchEnterButtonDirective, NzInputAddonBeforeDirective, NzInputAddonAfterDirective, NzInputPrefixDirective, NzInputSuffixDirective, NzInputGroupComponent, NzAutosizeDirective, NzInputGroupWhitSuffixOrPrefixDirective, NzInputOtpComponent]
}));
__publicField(_NzInputModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzInputWrapperComponent, NzInputGroupComponent, NzInputGroupSlotComponent, NzInputOtpComponent]
}));
var NzInputModule = _NzInputModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputModule, [{
    type: NgModule,
    args: [{
      imports: [NzTextareaCountComponent, NzInputDirective, NzInputWrapperComponent, NzInputPasswordDirective, NzInputPasswordIconDirective, NzInputSearchDirective, NzInputSearchEnterButtonDirective, NzInputAddonBeforeDirective, NzInputAddonAfterDirective, NzInputPrefixDirective, NzInputSuffixDirective, NzInputGroupComponent, NzAutosizeDirective, NzInputGroupSlotComponent, NzInputGroupWhitSuffixOrPrefixDirective, NzInputOtpComponent],
      exports: [NzTextareaCountComponent, NzInputDirective, NzInputWrapperComponent, NzInputPasswordDirective, NzInputPasswordIconDirective, NzInputSearchDirective, NzInputSearchEnterButtonDirective, NzInputAddonBeforeDirective, NzInputAddonAfterDirective, NzInputPrefixDirective, NzInputSuffixDirective, NzInputGroupComponent, NzAutosizeDirective, NzInputGroupWhitSuffixOrPrefixDirective, NzInputOtpComponent]
    }]
  }], null, null);
})();

export {
  NzAutosizeDirective,
  NzInputDirective,
  NzInputGroupWhitSuffixOrPrefixDirective,
  NzInputGroupComponent,
  NzInputModule
};
//# sourceMappingURL=chunk-2IS6VVE2.js.map
