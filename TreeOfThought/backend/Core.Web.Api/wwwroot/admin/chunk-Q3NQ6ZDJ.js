import {
  AbstractControl,
  Directionality,
  FormControlDirective,
  FormControlName,
  NZ_FORM_SIZE,
  NZ_FORM_VARIANT,
  NgControl,
  NgModel,
  NgTemplateOutlet,
  NzFormStatusService,
  NzGridModule,
  NzI18nModule,
  NzI18nPipe,
  NzI18nService,
  NzIconDirective,
  NzIconModule,
  NzNoAnimationDirective,
  NzOutletModule,
  NzStringTemplateOutletDirective,
  NzTooltipDirective,
  WithConfig,
  isAnimationEnabled,
  isTemplateRef,
  takeUntilDestroyed,
  toBoolean,
  withAnimationCheck
} from "./chunk-IZ4YJLPT.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DestroyRef,
  Directive,
  Input,
  NgModule,
  Subject,
  Subscription,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  booleanAttribute,
  computed,
  filter,
  inject,
  input,
  map,
  setClassMetadata,
  startWith,
  tap,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵanimateEnter,
  ɵɵanimateLeave,
  ɵɵanimateLeaveListener,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-KKYHHXIP.js";
import {
  __publicField,
  __spreadValues
} from "./chunk-MYGOUE3E.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-form.mjs
var _c0 = ["*"];
var _c1 = (a0) => [a0];
var _c2 = (a0) => ({
  $implicit: a0
});
function NzFormControlComponent_Conditional_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.innerTip);
  }
}
function NzFormControlComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275animateLeave(function NzFormControlComponent_Conditional_3_Template_animateleave_cb() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nzValidateAnimationLeave());
    });
    \u0275\u0275animateEnter(function NzFormControlComponent_Conditional_3_Template_animateenter_cb() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nzValidateAnimationEnter());
    });
    \u0275\u0275animateLeaveListener(function NzFormControlComponent_Conditional_3_Template_div_animateleave_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAnimationLeave($event));
    });
    \u0275\u0275elementStart(1, "div", 4);
    \u0275\u0275template(2, NzFormControlComponent_Conditional_3_ng_container_2_Template, 2, 1, "ng-container", 5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275pureFunction1(4, _c1, "ant-form-item-explain-" + ctx_r1.status));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.innerTip)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(6, _c2, ctx_r1.validateControl));
  }
}
function NzFormControlComponent_Conditional_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.nzExtra);
  }
}
function NzFormControlComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275template(1, NzFormControlComponent_Conditional_4_ng_container_1_Template, 2, 1, "ng-container", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzExtra);
  }
}
var _c3 = (a0, a1) => ({
  required: a0,
  $implicit: a1
});
function NzFormLabelComponent_ng_template_1_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "nz-icon", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const tooltipIconType_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("nzType", tooltipIconType_r1)("nzTheme", ctx_r1.tooltipIcon.theme);
  }
}
function NzFormLabelComponent_ng_template_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 1);
    \u0275\u0275template(1, NzFormLabelComponent_ng_template_1_Conditional_1_ng_container_1_Template, 2, 2, "ng-container", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nzTooltipTitle", ctx_r1.nzTooltipTitle);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.tooltipIcon.type);
  }
}
function NzFormLabelComponent_ng_template_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "nzI18n");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "Form.optional"));
  }
}
function NzFormLabelComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
    \u0275\u0275conditionalCreate(1, NzFormLabelComponent_ng_template_1_Conditional_1_Template, 2, 2, "span", 1);
    \u0275\u0275conditionalCreate(2, NzFormLabelComponent_ng_template_1_Conditional_2_Template, 3, 3, "span", 2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.nzTooltipTitle ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.nzRequiredMark == null ? null : ctx_r1.nzRequiredMark()) === "optional" && !ctx_r1.nzRequired ? 2 : -1);
  }
}
function NzFormLabelComponent_Conditional_3_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NzFormLabelComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzFormLabelComponent_Conditional_3_ng_container_0_Template, 1, 0, "ng-container", 5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    const labelTemplate_r3 = \u0275\u0275reference(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.nzRequiredMark())("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c3, ctx_r1.nzRequired, labelTemplate_r3));
  }
}
function NzFormLabelComponent_Conditional_4_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NzFormLabelComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzFormLabelComponent_Conditional_4_ng_container_0_Template, 1, 0, "ng-container", 6);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const labelTemplate_r3 = \u0275\u0275reference(2);
    \u0275\u0275property("ngTemplateOutlet", labelTemplate_r3);
  }
}
var _NzFormItemComponent = class _NzFormItemComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "status", "");
    __publicField(this, "hasFeedback", false);
    __publicField(this, "withHelpClass", false);
  }
  setWithHelpViaTips(value) {
    this.withHelpClass = value;
    this.cdr.markForCheck();
  }
  setStatus(status) {
    this.status = status;
    this.cdr.markForCheck();
  }
  setHasFeedback(hasFeedback) {
    this.hasFeedback = hasFeedback;
    this.cdr.markForCheck();
  }
};
__publicField(_NzFormItemComponent, "\u0275fac", function NzFormItemComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzFormItemComponent)();
});
__publicField(_NzFormItemComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzFormItemComponent,
  selectors: [["nz-form-item"]],
  hostAttrs: [1, "ant-form-item"],
  hostVars: 12,
  hostBindings: function NzFormItemComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-form-item-has-success", ctx.status === "success")("ant-form-item-has-warning", ctx.status === "warning")("ant-form-item-has-error", ctx.status === "error")("ant-form-item-is-validating", ctx.status === "validating")("ant-form-item-has-feedback", ctx.hasFeedback && ctx.status)("ant-form-item-with-help", ctx.withHelpClass);
    }
  },
  exportAs: ["nzFormItem"],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function NzFormItemComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzFormItemComponent = _NzFormItemComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormItemComponent, [{
    type: Component,
    args: [{
      selector: "nz-form-item",
      exportAs: "nzFormItem",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "ant-form-item",
        "[class.ant-form-item-has-success]": 'status === "success"',
        "[class.ant-form-item-has-warning]": 'status === "warning"',
        "[class.ant-form-item-has-error]": 'status === "error"',
        "[class.ant-form-item-is-validating]": 'status === "validating"',
        "[class.ant-form-item-has-feedback]": "hasFeedback && status",
        "[class.ant-form-item-with-help]": "withHelpClass"
      },
      template: `<ng-content />`
    }]
  }], null, null);
})();
var NZ_CONFIG_MODULE_NAME = "form";
var DefaultTooltipIcon = {
  type: "question-circle",
  theme: "outline"
};
var NzFormDirective = (() => {
  var _a2;
  let _nzNoColon_decorators;
  let _nzNoColon_initializers = [];
  let _nzNoColon_extraInitializers = [];
  let _nzAutoTips_decorators;
  let _nzAutoTips_initializers = [];
  let _nzAutoTips_extraInitializers = [];
  let _nzTooltipIcon_decorators;
  let _nzTooltipIcon_initializers = [];
  let _nzTooltipIcon_extraInitializers = [];
  let _nzLabelWrap_decorators;
  let _nzLabelWrap_initializers = [];
  let _nzLabelWrap_extraInitializers = [];
  return _a2 = class {
    constructor() {
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME);
      __publicField(this, "nzLayout", "horizontal");
      __publicField(this, "nzNoColon", __runInitializers(this, _nzNoColon_initializers, false));
      __publicField(this, "nzAutoTips", (__runInitializers(this, _nzNoColon_extraInitializers), __runInitializers(this, _nzAutoTips_initializers, {})));
      __publicField(this, "nzDisableAutoTips", (__runInitializers(this, _nzAutoTips_extraInitializers), false));
      __publicField(this, "nzTooltipIcon", __runInitializers(this, _nzTooltipIcon_initializers, DefaultTooltipIcon));
      __publicField(this, "nzLabelAlign", (__runInitializers(this, _nzTooltipIcon_extraInitializers), "right"));
      __publicField(this, "nzLabelWrap", __runInitializers(this, _nzLabelWrap_initializers, false));
      __publicField(this, "nzSize", (__runInitializers(this, _nzLabelWrap_extraInitializers), input(...ngDevMode ? [void 0, {
        debugName: "nzSize"
      }] : [])));
      __publicField(this, "nzVariant", input("outlined", ...ngDevMode ? [{
        debugName: "nzVariant"
      }] : []));
      __publicField(this, "nzRequiredMark", input(true, ...ngDevMode ? [{
        debugName: "nzRequiredMark"
      }] : []));
      __publicField(this, "dir", inject(Directionality).valueSignal);
      __publicField(this, "inputChanges$", new Subject());
      this.destroyRef.onDestroy(() => {
        this.inputChanges$.complete();
      });
    }
    getInputObservable(changeType) {
      return this.inputChanges$.pipe(filter((changes) => changeType in changes), map((value) => value[changeType]));
    }
    ngOnChanges(changes) {
      this.inputChanges$.next(changes);
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzNoColon_decorators = [WithConfig()];
    _nzAutoTips_decorators = [WithConfig()];
    _nzTooltipIcon_decorators = [WithConfig()];
    _nzLabelWrap_decorators = [WithConfig()];
    __esDecorate(null, null, _nzNoColon_decorators, {
      kind: "field",
      name: "nzNoColon",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzNoColon" in obj,
        get: (obj) => obj.nzNoColon,
        set: (obj, value) => {
          obj.nzNoColon = value;
        }
      },
      metadata: _metadata
    }, _nzNoColon_initializers, _nzNoColon_extraInitializers);
    __esDecorate(null, null, _nzAutoTips_decorators, {
      kind: "field",
      name: "nzAutoTips",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzAutoTips" in obj,
        get: (obj) => obj.nzAutoTips,
        set: (obj, value) => {
          obj.nzAutoTips = value;
        }
      },
      metadata: _metadata
    }, _nzAutoTips_initializers, _nzAutoTips_extraInitializers);
    __esDecorate(null, null, _nzTooltipIcon_decorators, {
      kind: "field",
      name: "nzTooltipIcon",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzTooltipIcon" in obj,
        get: (obj) => obj.nzTooltipIcon,
        set: (obj, value) => {
          obj.nzTooltipIcon = value;
        }
      },
      metadata: _metadata
    }, _nzTooltipIcon_initializers, _nzTooltipIcon_extraInitializers);
    __esDecorate(null, null, _nzLabelWrap_decorators, {
      kind: "field",
      name: "nzLabelWrap",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzLabelWrap" in obj,
        get: (obj) => obj.nzLabelWrap,
        set: (obj, value) => {
          obj.nzLabelWrap = value;
        }
      },
      metadata: _metadata
    }, _nzLabelWrap_initializers, _nzLabelWrap_extraInitializers);
    if (_metadata) Object.defineProperty(_a2, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a2, "\u0275fac", function NzFormDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a2)();
  }), __publicField(_a2, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _a2,
    selectors: [["", "nz-form", ""]],
    hostAttrs: [1, "ant-form"],
    hostVars: 12,
    hostBindings: function NzFormDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-form-horizontal", ctx.nzLayout === "horizontal")("ant-form-vertical", ctx.nzLayout === "vertical")("ant-form-inline", ctx.nzLayout === "inline")("ant-form-rtl", ctx.dir() === "rtl")("ant-form-small", ctx.nzSize() === "small")("ant-form-large", ctx.nzSize() === "large");
      }
    },
    inputs: {
      nzLayout: "nzLayout",
      nzNoColon: [2, "nzNoColon", "nzNoColon", booleanAttribute],
      nzAutoTips: "nzAutoTips",
      nzDisableAutoTips: [2, "nzDisableAutoTips", "nzDisableAutoTips", booleanAttribute],
      nzTooltipIcon: "nzTooltipIcon",
      nzLabelAlign: "nzLabelAlign",
      nzLabelWrap: [2, "nzLabelWrap", "nzLabelWrap", booleanAttribute],
      nzSize: [1, "nzSize"],
      nzVariant: [1, "nzVariant"],
      nzRequiredMark: [1, "nzRequiredMark"]
    },
    exportAs: ["nzForm"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: NZ_FORM_SIZE,
      useFactory: () => inject(_a2).nzSize
    }, {
      provide: NZ_FORM_VARIANT,
      useFactory: () => inject(_a2).nzVariant
    }]), \u0275\u0275NgOnChangesFeature]
  })), _a2;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-form]",
      exportAs: "nzForm",
      host: {
        class: "ant-form",
        "[class.ant-form-horizontal]": `nzLayout === 'horizontal'`,
        "[class.ant-form-vertical]": `nzLayout === 'vertical'`,
        "[class.ant-form-inline]": `nzLayout === 'inline'`,
        "[class.ant-form-rtl]": `dir() === 'rtl'`,
        "[class.ant-form-small]": `nzSize() === 'small'`,
        "[class.ant-form-large]": `nzSize() === 'large'`
      },
      providers: [{
        provide: NZ_FORM_SIZE,
        useFactory: () => inject(NzFormDirective).nzSize
      }, {
        provide: NZ_FORM_VARIANT,
        useFactory: () => inject(NzFormDirective).nzVariant
      }]
    }]
  }], () => [], {
    nzLayout: [{
      type: Input
    }],
    nzNoColon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAutoTips: [{
      type: Input
    }],
    nzDisableAutoTips: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzTooltipIcon: [{
      type: Input
    }],
    nzLabelAlign: [{
      type: Input
    }],
    nzLabelWrap: [{
      type: Input,
      args: [{
        transform: booleanAttribute
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
    nzVariant: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzVariant",
        required: false
      }]
    }],
    nzRequiredMark: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzRequiredMark",
        required: false
      }]
    }]
  });
})();
var _NzFormControlComponent = class _NzFormControlComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "i18n", inject(NzI18nService));
    __publicField(this, "nzFormStatusService", inject(NzFormStatusService));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "_hasFeedback", false);
    __publicField(this, "validateChanges", Subscription.EMPTY);
    __publicField(this, "validateString", null);
    __publicField(this, "localeId");
    __publicField(this, "autoErrorTip");
    __publicField(this, "noAnimation", inject(NzNoAnimationDirective, {
      optional: true,
      host: true
    }));
    __publicField(this, "animationEnabled", isAnimationEnabled(() => {
      var _a2;
      return !((_a2 = this.noAnimation) == null ? void 0 : _a2.nzNoAnimation());
    }));
    __publicField(this, "nzValidateAnimationEnter", withAnimationCheck(() => "ant-form-validate_animation-enter"));
    __publicField(this, "nzValidateAnimationLeave", withAnimationCheck(() => "ant-form-validate_animation-leave"));
    __publicField(this, "status", "");
    __publicField(this, "validateControl", null);
    __publicField(this, "innerTip", null);
    __publicField(this, "defaultValidateControl");
    __publicField(this, "nzSuccessTip");
    __publicField(this, "nzWarningTip");
    __publicField(this, "nzErrorTip");
    __publicField(this, "nzValidatingTip");
    __publicField(this, "nzExtra");
    __publicField(this, "nzAutoTips", {});
    __publicField(this, "nzDisableAutoTips");
    __publicField(this, "nzFormItemComponent", inject(NzFormItemComponent, {
      host: true,
      optional: true
    }));
    __publicField(this, "nzFormDirective", inject(NzFormDirective, {
      optional: true
    }));
    var _a2, _b;
    this.subscribeAutoTips(this.i18n.localeChange.pipe(tap((locale) => this.localeId = locale.locale)));
    this.subscribeAutoTips((_a2 = this.nzFormDirective) == null ? void 0 : _a2.getInputObservable("nzAutoTips"));
    this.subscribeAutoTips((_b = this.nzFormDirective) == null ? void 0 : _b.getInputObservable("nzDisableAutoTips").pipe(filter(() => this.nzDisableAutoTips === void 0)));
  }
  get disableAutoTips() {
    var _a2;
    return this.nzDisableAutoTips !== void 0 ? toBoolean(this.nzDisableAutoTips) : !!((_a2 = this.nzFormDirective) == null ? void 0 : _a2.nzDisableAutoTips);
  }
  set nzHasFeedback(value) {
    this._hasFeedback = value;
    this.nzFormStatusService.formStatusChanges.next({
      status: this.status,
      hasFeedback: this._hasFeedback
    });
    if (this.nzFormItemComponent) {
      this.nzFormItemComponent.setHasFeedback(this._hasFeedback);
    }
  }
  get nzHasFeedback() {
    return this._hasFeedback;
  }
  set nzValidateStatus(value) {
    if (value instanceof AbstractControl || value instanceof NgModel) {
      this.validateControl = value;
      this.validateString = null;
      this.watchControl();
    } else if (value instanceof FormControlName) {
      this.validateControl = value.control;
      this.validateString = null;
      this.watchControl();
    } else {
      this.validateString = value;
      this.validateControl = null;
      this.setStatus();
    }
  }
  watchControl() {
    this.validateChanges.unsubscribe();
    if (this.validateControl && this.validateControl.statusChanges) {
      this.validateChanges = this.validateControl.statusChanges.pipe(startWith(null), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        if (!this.disableAutoTips) {
          this.updateAutoErrorTip();
        }
        this.setStatus();
        this.cdr.markForCheck();
      });
    }
  }
  setStatus() {
    this.status = this.getControlStatus(this.validateString);
    this.innerTip = this.getInnerTip(this.status);
    this.nzFormStatusService.formStatusChanges.next({
      status: this.status,
      hasFeedback: this.nzHasFeedback
    });
    if (this.nzFormItemComponent) {
      this.nzFormItemComponent.setWithHelpViaTips(!!this.innerTip);
      this.nzFormItemComponent.setStatus(this.status);
    }
  }
  getControlStatus(validateString) {
    let status;
    if (validateString === "warning" || this.validateControlStatus("INVALID", "warning")) {
      status = "warning";
    } else if (validateString === "error" || this.validateControlStatus("INVALID")) {
      status = "error";
    } else if (validateString === "validating" || validateString === "pending" || this.validateControlStatus("PENDING")) {
      status = "validating";
    } else if (validateString === "success" || this.validateControlStatus("VALID")) {
      status = "success";
    } else {
      status = "";
    }
    return status;
  }
  validateControlStatus(validStatus, statusType) {
    if (!this.validateControl) {
      return false;
    } else {
      const {
        dirty,
        touched,
        status
      } = this.validateControl;
      return (!!dirty || !!touched) && (statusType ? this.validateControl.hasError(statusType) : status === validStatus);
    }
  }
  getInnerTip(status) {
    switch (status) {
      case "error":
        return !this.disableAutoTips && this.autoErrorTip || this.nzErrorTip || null;
      case "validating":
        return this.nzValidatingTip || null;
      case "success":
        return this.nzSuccessTip || null;
      case "warning":
        return this.nzWarningTip || null;
      default:
        return null;
    }
  }
  updateAutoErrorTip() {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
    if (this.validateControl) {
      const errors = this.validateControl.errors || {};
      let autoErrorTip = "";
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          autoErrorTip = (_m = (_j = (_f = (_d = (_a2 = errors[key]) == null ? void 0 : _a2[this.localeId]) != null ? _d : (_c = (_b = this.nzAutoTips) == null ? void 0 : _b[this.localeId]) == null ? void 0 : _c[key]) != null ? _f : (_e = this.nzAutoTips.default) == null ? void 0 : _e[key]) != null ? _j : (_i = (_h = (_g = this.nzFormDirective) == null ? void 0 : _g.nzAutoTips) == null ? void 0 : _h[this.localeId]) == null ? void 0 : _i[key]) != null ? _m : (_l = (_k = this.nzFormDirective) == null ? void 0 : _k.nzAutoTips.default) == null ? void 0 : _l[key];
        }
        if (autoErrorTip) {
          break;
        }
      }
      this.autoErrorTip = autoErrorTip;
    }
  }
  subscribeAutoTips(observable) {
    observable == null ? void 0 : observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (!this.disableAutoTips) {
        this.updateAutoErrorTip();
        this.setStatus();
        this.cdr.markForCheck();
      }
    });
  }
  ngOnChanges(changes) {
    const {
      nzDisableAutoTips,
      nzAutoTips,
      nzSuccessTip,
      nzWarningTip,
      nzErrorTip,
      nzValidatingTip
    } = changes;
    if (nzDisableAutoTips || nzAutoTips) {
      this.updateAutoErrorTip();
      this.setStatus();
    } else if (nzSuccessTip || nzWarningTip || nzErrorTip || nzValidatingTip) {
      this.setStatus();
    }
  }
  ngOnInit() {
    this.setStatus();
  }
  ngAfterContentInit() {
    if (!this.validateControl && !this.validateString) {
      if (this.defaultValidateControl instanceof FormControlDirective) {
        this.nzValidateStatus = this.defaultValidateControl.control;
      } else {
        this.nzValidateStatus = this.defaultValidateControl;
      }
    }
  }
  onAnimationLeave(event) {
    if (!this.animationEnabled()) {
      return event.animationComplete();
    }
    const element = event.target;
    const onTransitionEnd = () => {
      element.removeEventListener("transitionend", onTransitionEnd);
      event.animationComplete();
    };
    element.addEventListener("transitionend", onTransitionEnd);
  }
};
__publicField(_NzFormControlComponent, "\u0275fac", function NzFormControlComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzFormControlComponent)();
});
__publicField(_NzFormControlComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzFormControlComponent,
  selectors: [["nz-form-control"]],
  contentQueries: function NzFormControlComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NgControl, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.defaultValidateControl = _t.first);
    }
  },
  hostAttrs: [1, "ant-form-item-control"],
  inputs: {
    nzSuccessTip: "nzSuccessTip",
    nzWarningTip: "nzWarningTip",
    nzErrorTip: "nzErrorTip",
    nzValidatingTip: "nzValidatingTip",
    nzExtra: "nzExtra",
    nzAutoTips: "nzAutoTips",
    nzDisableAutoTips: [2, "nzDisableAutoTips", "nzDisableAutoTips", booleanAttribute],
    nzHasFeedback: [2, "nzHasFeedback", "nzHasFeedback", booleanAttribute],
    nzValidateStatus: "nzValidateStatus"
  },
  exportAs: ["nzFormControl"],
  features: [\u0275\u0275ProvidersFeature([NzFormStatusService]), \u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c0,
  decls: 5,
  vars: 2,
  consts: [[1, "ant-form-item-control-input"], [1, "ant-form-item-control-input-content"], [1, "ant-form-item-explain", "ant-form-item-explain-connected"], [1, "ant-form-item-extra"], ["role", "alert"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [4, "nzStringTemplateOutlet"]],
  template: function NzFormControlComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275projection(2);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(3, NzFormControlComponent_Conditional_3_Template, 3, 8, "div", 2);
      \u0275\u0275conditionalCreate(4, NzFormControlComponent_Conditional_4_Template, 2, 1, "div", 3);
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.innerTip ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzExtra ? 4 : -1);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzFormControlComponent = _NzFormControlComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormControlComponent, [{
    type: Component,
    args: [{
      selector: "nz-form-control",
      exportAs: "nzFormControl",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <div class="ant-form-item-control-input">
      <div class="ant-form-item-control-input-content">
        <ng-content />
      </div>
    </div>
    @if (innerTip) {
      <div
        [animate.enter]="nzValidateAnimationEnter()"
        [animate.leave]="nzValidateAnimationLeave()"
        (animate.leave)="onAnimationLeave($event)"
        class="ant-form-item-explain ant-form-item-explain-connected"
      >
        <div role="alert" [class]="['ant-form-item-explain-' + status]">
          <ng-container *nzStringTemplateOutlet="innerTip; context: { $implicit: validateControl }">{{
            innerTip
          }}</ng-container>
        </div>
      </div>
    }

    @if (nzExtra) {
      <div class="ant-form-item-extra">
        <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
      </div>
    }
  `,
      providers: [NzFormStatusService],
      host: {
        class: "ant-form-item-control"
      },
      imports: [NzOutletModule]
    }]
  }], () => [], {
    defaultValidateControl: [{
      type: ContentChild,
      args: [NgControl, {
        static: false
      }]
    }],
    nzSuccessTip: [{
      type: Input
    }],
    nzWarningTip: [{
      type: Input
    }],
    nzErrorTip: [{
      type: Input
    }],
    nzValidatingTip: [{
      type: Input
    }],
    nzExtra: [{
      type: Input
    }],
    nzAutoTips: [{
      type: Input
    }],
    nzDisableAutoTips: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzHasFeedback: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzValidateStatus: [{
      type: Input
    }]
  });
})();
function toTooltipIcon(value) {
  const icon = typeof value === "string" ? {
    type: value
  } : value;
  return __spreadValues(__spreadValues({}, DefaultTooltipIcon), icon);
}
var _a;
var _NzFormLabelComponent = class _NzFormLabelComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "nzFor");
    __publicField(this, "nzRequired", false);
    __publicField(this, "noColon", "default");
    __publicField(this, "nzTooltipTitle");
    __publicField(this, "_tooltipIcon", "default");
    __publicField(this, "labelAlign", "default");
    __publicField(this, "labelWrap", "default");
    __publicField(this, "nzFormDirective", inject(NzFormDirective, {
      skipSelf: true,
      optional: true
    }));
    __publicField(this, "nzRequiredMark", (_a = this.nzFormDirective) == null ? void 0 : _a.nzRequiredMark);
    __publicField(this, "isNzRequiredMarkTemplate", computed(() => {
      var _a2;
      return isTemplateRef((_a2 = this.nzRequiredMark) == null ? void 0 : _a2.call(this));
    }, ...ngDevMode ? [{
      debugName: "isNzRequiredMarkTemplate"
    }] : []));
    if (this.nzFormDirective) {
      this.nzFormDirective.getInputObservable("nzNoColon").pipe(filter(() => this.noColon === "default"), takeUntilDestroyed()).subscribe(() => this.cdr.markForCheck());
      this.nzFormDirective.getInputObservable("nzTooltipIcon").pipe(filter(() => this._tooltipIcon === "default"), takeUntilDestroyed()).subscribe(() => this.cdr.markForCheck());
      this.nzFormDirective.getInputObservable("nzLabelAlign").pipe(filter(() => this.labelAlign === "default"), takeUntilDestroyed()).subscribe(() => this.cdr.markForCheck());
      this.nzFormDirective.getInputObservable("nzLabelWrap").pipe(filter(() => this.labelWrap === "default"), takeUntilDestroyed()).subscribe(() => this.cdr.markForCheck());
    }
  }
  set nzNoColon(value) {
    this.noColon = value;
  }
  get nzNoColon() {
    var _a2;
    return this.noColon !== "default" ? this.noColon : !!((_a2 = this.nzFormDirective) == null ? void 0 : _a2.nzNoColon);
  }
  set nzTooltipIcon(value) {
    this._tooltipIcon = toTooltipIcon(value);
  }
  // due to 'get' and 'set' accessor must have the same type, so it was renamed to `tooltipIcon`
  get tooltipIcon() {
    var _a2;
    return this._tooltipIcon !== "default" ? this._tooltipIcon : toTooltipIcon(((_a2 = this.nzFormDirective) == null ? void 0 : _a2.nzTooltipIcon) || DefaultTooltipIcon);
  }
  set nzLabelAlign(value) {
    this.labelAlign = value;
  }
  get nzLabelAlign() {
    var _a2;
    return this.labelAlign !== "default" ? this.labelAlign : ((_a2 = this.nzFormDirective) == null ? void 0 : _a2.nzLabelAlign) || "right";
  }
  set nzLabelWrap(value) {
    this.labelWrap = value;
  }
  get nzLabelWrap() {
    var _a2;
    return this.labelWrap !== "default" ? this.labelWrap : !!((_a2 = this.nzFormDirective) == null ? void 0 : _a2.nzLabelWrap);
  }
};
__publicField(_NzFormLabelComponent, "\u0275fac", function NzFormLabelComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzFormLabelComponent)();
});
__publicField(_NzFormLabelComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzFormLabelComponent,
  selectors: [["nz-form-label"]],
  hostAttrs: [1, "ant-form-item-label"],
  hostVars: 4,
  hostBindings: function NzFormLabelComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-form-item-label-left", ctx.nzLabelAlign === "left")("ant-form-item-label-wrap", ctx.nzLabelWrap);
    }
  },
  inputs: {
    nzFor: "nzFor",
    nzRequired: [2, "nzRequired", "nzRequired", booleanAttribute],
    nzNoColon: [2, "nzNoColon", "nzNoColon", booleanAttribute],
    nzTooltipTitle: "nzTooltipTitle",
    nzTooltipIcon: "nzTooltipIcon",
    nzLabelAlign: "nzLabelAlign",
    nzLabelWrap: [2, "nzLabelWrap", "nzLabelWrap", booleanAttribute]
  },
  exportAs: ["nzFormLabel"],
  ngContentSelectors: _c0,
  decls: 5,
  vars: 10,
  consts: [["labelTemplate", ""], ["nz-tooltip", "", 1, "ant-form-item-tooltip", 3, "nzTooltipTitle"], [1, "ant-form-item-optional"], [4, "nzStringTemplateOutlet"], [3, "nzType", "nzTheme"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "ngTemplateOutlet"]],
  template: function NzFormLabelComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "label");
      \u0275\u0275template(1, NzFormLabelComponent_ng_template_1_Template, 3, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275conditionalCreate(3, NzFormLabelComponent_Conditional_3_Template, 1, 5, "ng-container")(4, NzFormLabelComponent_Conditional_4_Template, 1, 1, "ng-container");
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("ant-form-item-no-colon", ctx.nzNoColon)("ant-form-item-required", ctx.nzRequired)("ant-form-item-required-mark-optional", (ctx.nzRequiredMark == null ? null : ctx.nzRequiredMark()) === "optional" || ctx.isNzRequiredMarkTemplate())("ant-form-item-required-mark-hidden", (ctx.nzRequiredMark == null ? null : ctx.nzRequiredMark()) === false);
      \u0275\u0275attribute("for", ctx.nzFor);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.isNzRequiredMarkTemplate() ? 3 : 4);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective, NzTooltipDirective, NzIconModule, NzIconDirective, NgTemplateOutlet, NzI18nModule, NzI18nPipe],
  encapsulation: 2,
  changeDetection: 0
}));
var NzFormLabelComponent = _NzFormLabelComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormLabelComponent, [{
    type: Component,
    args: [{
      selector: "nz-form-label",
      exportAs: "nzFormLabel",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <label
      [attr.for]="nzFor"
      [class.ant-form-item-no-colon]="nzNoColon"
      [class.ant-form-item-required]="nzRequired"
      [class.ant-form-item-required-mark-optional]="nzRequiredMark?.() === 'optional' || isNzRequiredMarkTemplate()"
      [class.ant-form-item-required-mark-hidden]="nzRequiredMark?.() === false"
    >
      <ng-template #labelTemplate>
        <ng-content />
        @if (nzTooltipTitle) {
          <span class="ant-form-item-tooltip" nz-tooltip [nzTooltipTitle]="nzTooltipTitle">
            <ng-container *nzStringTemplateOutlet="tooltipIcon.type; let tooltipIconType">
              <nz-icon [nzType]="tooltipIconType" [nzTheme]="tooltipIcon.theme" />
            </ng-container>
          </span>
        }
        @if (nzRequiredMark?.() === 'optional' && !nzRequired) {
          <span class="ant-form-item-optional">{{ 'Form.optional' | nzI18n }}</span>
        }
      </ng-template>

      @if (isNzRequiredMarkTemplate()) {
        <ng-container
          *ngTemplateOutlet="$any(nzRequiredMark!()); context: { required: nzRequired, $implicit: labelTemplate }"
        />
      } @else {
        <ng-container *ngTemplateOutlet="labelTemplate" />
      }
    </label>
  `,
      host: {
        class: "ant-form-item-label",
        "[class.ant-form-item-label-left]": `nzLabelAlign === 'left'`,
        "[class.ant-form-item-label-wrap]": `nzLabelWrap`
      },
      imports: [NzOutletModule, NzTooltipDirective, NzIconModule, NgTemplateOutlet, NzI18nModule]
    }]
  }], () => [], {
    nzFor: [{
      type: Input
    }],
    nzRequired: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzNoColon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzTooltipTitle: [{
      type: Input
    }],
    nzTooltipIcon: [{
      type: Input
    }],
    nzLabelAlign: [{
      type: Input
    }],
    nzLabelWrap: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzFormSplitComponent = class _NzFormSplitComponent {
};
__publicField(_NzFormSplitComponent, "\u0275fac", function NzFormSplitComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzFormSplitComponent)();
});
__publicField(_NzFormSplitComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzFormSplitComponent,
  selectors: [["nz-form-split"]],
  hostAttrs: [1, "ant-form-split"],
  exportAs: ["nzFormSplit"],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function NzFormSplitComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzFormSplitComponent = _NzFormSplitComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormSplitComponent, [{
    type: Component,
    args: [{
      selector: "nz-form-split",
      exportAs: "nzFormSplit",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<ng-content />`,
      host: {
        class: "ant-form-split"
      }
    }]
  }], null, null);
})();
var _NzFormTextComponent = class _NzFormTextComponent {
};
__publicField(_NzFormTextComponent, "\u0275fac", function NzFormTextComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzFormTextComponent)();
});
__publicField(_NzFormTextComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzFormTextComponent,
  selectors: [["nz-form-text"]],
  hostAttrs: [1, "ant-form-text"],
  exportAs: ["nzFormText"],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function NzFormTextComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzFormTextComponent = _NzFormTextComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormTextComponent, [{
    type: Component,
    args: [{
      selector: "nz-form-text",
      exportAs: "nzFormText",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `<ng-content />`,
      host: {
        class: "ant-form-text"
      }
    }]
  }], null, null);
})();
var _NzFormModule = class _NzFormModule {
};
__publicField(_NzFormModule, "\u0275fac", function NzFormModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzFormModule)();
});
__publicField(_NzFormModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzFormModule,
  imports: [NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent, NzFormTextComponent, NzFormSplitComponent],
  exports: [NzGridModule, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent, NzFormTextComponent, NzFormSplitComponent]
}));
__publicField(_NzFormModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzFormLabelComponent, NzFormControlComponent, NzGridModule]
}));
var NzFormModule = _NzFormModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFormModule, [{
    type: NgModule,
    args: [{
      imports: [NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent, NzFormTextComponent, NzFormSplitComponent],
      exports: [NzGridModule, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent, NzFormTextComponent, NzFormSplitComponent]
    }]
  }], null, null);
})();

export {
  NzFormItemComponent,
  NzFormDirective,
  NzFormControlComponent,
  NzFormLabelComponent,
  NzFormModule
};
//# sourceMappingURL=chunk-Q3NQ6ZDJ.js.map
