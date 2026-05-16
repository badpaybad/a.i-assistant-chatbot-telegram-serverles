import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  CheckboxControlValueAccessor,
  ConnectionPositionPair,
  Directionality,
  ESCAPE,
  FocusMonitor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NavigationEnd,
  NgControlStatus,
  NgModel,
  NgTemplateOutlet,
  NzAnimationCollapseDirective,
  NzConfigService,
  NzFormStatusService,
  NzIconDirective,
  NzIconModule,
  NzNoAnimationDirective,
  NzOutletModule,
  NzStringTemplateOutletDirective,
  OverlayModule,
  POSITION_MAP,
  Platform,
  Router,
  RouterLink,
  SLIDE_ANIMATION_CLASS,
  TOOLTIP_OFFSET_MAP,
  TemplatePortal,
  WithConfig,
  createCloseScrollStrategy,
  createFlexibleConnectedPositionStrategy,
  createOverlayRef,
  createRepositionScrollStrategy,
  fromEventOutsideAngular,
  generateClassName,
  getClassListFromValue,
  getPlacementName,
  hasModifierKey,
  numberAttributeWithZeroFallback,
  setConnectedPositionOffset,
  slideAnimationEnter,
  slideAnimationLeave,
  takeUntilDestroyed,
  toSignal,
  withAnimationCheck
} from "./chunk-XU754HJP.js";
import {
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DestroyRef,
  Directive,
  EMPTY,
  ElementRef,
  EventEmitter,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  afterNextRender,
  auditTime,
  booleanAttribute,
  combineLatest,
  computed,
  distinctUntilChanged,
  effect,
  filter,
  first,
  forwardRef,
  fromEvent,
  inject,
  input,
  linkedSignal,
  map,
  merge,
  mergeMap,
  output,
  setClassMetadata,
  signal,
  startWith,
  switchMap,
  untracked,
  ɵɵHostDirectivesFeature,
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
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
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
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
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

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-checkbox.mjs
var _c0 = ["inputElement"];
var _c1 = ["nz-checkbox", ""];
var _c2 = ["*"];
var _forTrack0 = ($index, $item) => $item.value;
function NzCheckboxGroupComponent_ProjectionFallback_0_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 0);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nzValue", option_r1.value)("nzName", ctx_r1.nzName())("nzDisabled", option_r1.disabled || ctx_r1.finalDisabled());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", option_r1.label, " ");
  }
}
function NzCheckboxGroupComponent_ProjectionFallback_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, NzCheckboxGroupComponent_ProjectionFallback_0_For_1_Template, 2, 4, "label", 0, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.normalizedOptions());
  }
}
var NZ_CHECKBOX_GROUP = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "nz-checkbox-group" : "");
var _NzCheckboxComponent = class _NzCheckboxComponent {
  constructor() {
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "focusMonitor", inject(FocusMonitor));
    __publicField(this, "directionality", inject(Directionality));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "checkboxGroupComponent", inject(NZ_CHECKBOX_GROUP, {
      optional: true
    }));
    __publicField(this, "nzFormStatusService", inject(NzFormStatusService, {
      optional: true
    }));
    __publicField(this, "dir", "ltr");
    __publicField(this, "isNzDisableFirstChange", true);
    __publicField(this, "onChange", () => {
    });
    __publicField(this, "onTouched", () => {
    });
    __publicField(this, "inputElement");
    __publicField(this, "nzCheckedChange", new EventEmitter());
    __publicField(this, "nzValue", null);
    __publicField(this, "nzAutoFocus", false);
    __publicField(this, "nzDisabled", false);
    __publicField(this, "nzIndeterminate", false);
    __publicField(this, "nzChecked", false);
    __publicField(this, "nzId", null);
    __publicField(this, "nzName", null);
    this.destroyRef.onDestroy(() => {
      this.focusMonitor.stopMonitoring(this.elementRef);
    });
    if (this.checkboxGroupComponent) {
      effect(() => {
        const values = this.checkboxGroupComponent.value() || [];
        this.setValue(values.includes(this.nzValue));
        this.cdr.markForCheck();
      });
    }
  }
  innerCheckedChange(checked) {
    var _a, _b;
    if (!this.nzDisabled && !((_a = this.checkboxGroupComponent) == null ? void 0 : _a.finalDisabled())) {
      this.setValue(checked);
      (_b = this.checkboxGroupComponent) == null ? void 0 : _b.onCheckedChange(this.nzValue, checked);
    }
  }
  writeValue(value) {
    this.nzChecked = value;
    this.cdr.markForCheck();
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(disabled) {
    this.nzDisabled = this.isNzDisableFirstChange && this.nzDisabled || disabled;
    this.isNzDisableFirstChange = false;
    this.cdr.markForCheck();
  }
  focus() {
    this.focusMonitor.focusVia(this.inputElement, "keyboard");
  }
  blur() {
    this.inputElement.nativeElement.blur();
  }
  ngOnInit() {
    this.focusMonitor.monitor(this.elementRef, true).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((focusOrigin) => {
      if (!focusOrigin) {
        Promise.resolve().then(() => this.onTouched());
      }
    });
    this.directionality.change.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
    fromEventOutsideAngular(this.elementRef.nativeElement, "click").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      event.preventDefault();
      this.focus();
      if (this.nzDisabled) {
        return;
      }
      this.ngZone.run(() => {
        this.innerCheckedChange(!this.nzChecked);
        this.cdr.markForCheck();
      });
    });
    fromEventOutsideAngular(this.inputElement.nativeElement, "click").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => event.stopPropagation());
  }
  ngAfterViewInit() {
    if (this.nzAutoFocus) {
      this.focus();
    }
  }
  setValue(value) {
    this.nzChecked = value;
    this.onChange(value);
    this.nzCheckedChange.emit(value);
  }
};
__publicField(_NzCheckboxComponent, "\u0275fac", function NzCheckboxComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzCheckboxComponent)();
});
__publicField(_NzCheckboxComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzCheckboxComponent,
  selectors: [["", "nz-checkbox", ""]],
  viewQuery: function NzCheckboxComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.inputElement = _t.first);
    }
  },
  hostAttrs: [1, "ant-checkbox-wrapper"],
  hostVars: 10,
  hostBindings: function NzCheckboxComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-checkbox-group-item", !!ctx.checkboxGroupComponent)("ant-checkbox-wrapper-in-form-item", !!ctx.nzFormStatusService)("ant-checkbox-wrapper-checked", ctx.nzChecked)("ant-checkbox-wrapper-disabled", ctx.nzDisabled || (ctx.checkboxGroupComponent == null ? null : ctx.checkboxGroupComponent.finalDisabled()))("ant-checkbox-rtl", ctx.dir === "rtl");
    }
  },
  inputs: {
    nzValue: "nzValue",
    nzAutoFocus: [2, "nzAutoFocus", "nzAutoFocus", booleanAttribute],
    nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
    nzIndeterminate: [2, "nzIndeterminate", "nzIndeterminate", booleanAttribute],
    nzChecked: [2, "nzChecked", "nzChecked", booleanAttribute],
    nzId: "nzId",
    nzName: "nzName"
  },
  outputs: {
    nzCheckedChange: "nzCheckedChange"
  },
  exportAs: ["nzCheckbox"],
  features: [\u0275\u0275ProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _NzCheckboxComponent),
    multi: true
  }])],
  attrs: _c1,
  ngContentSelectors: _c2,
  decls: 6,
  vars: 12,
  consts: [["inputElement", ""], [1, "ant-checkbox"], ["type", "checkbox", 1, "ant-checkbox-input", 3, "ngModelChange", "checked", "ngModel", "disabled"], [1, "ant-checkbox-inner"]],
  template: function NzCheckboxComponent_Template(rf, ctx) {
    var _a;
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "span", 1)(1, "input", 2, 0);
      \u0275\u0275listener("ngModelChange", function NzCheckboxComponent_Template_input_ngModelChange_1_listener($event) {
        return ctx.innerCheckedChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "span", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "span");
      \u0275\u0275projection(5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("ant-checkbox-checked", ctx.nzChecked && !ctx.nzIndeterminate)("ant-checkbox-disabled", ctx.nzDisabled || (ctx.checkboxGroupComponent == null ? null : ctx.checkboxGroupComponent.finalDisabled()))("ant-checkbox-indeterminate", ctx.nzIndeterminate);
      \u0275\u0275advance();
      \u0275\u0275property("checked", ctx.nzChecked)("ngModel", ctx.nzChecked)("disabled", ctx.nzDisabled || ((_a = ctx.checkboxGroupComponent == null ? null : ctx.checkboxGroupComponent.finalDisabled()) != null ? _a : false));
      \u0275\u0275attribute("autofocus", ctx.nzAutoFocus ? "autofocus" : null)("id", ctx.nzId)("name", ctx.nzName || (ctx.checkboxGroupComponent == null ? null : ctx.checkboxGroupComponent.nzName()));
    }
  },
  dependencies: [FormsModule, CheckboxControlValueAccessor, NgControlStatus, NgModel],
  encapsulation: 2,
  changeDetection: 0
}));
var NzCheckboxComponent = _NzCheckboxComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCheckboxComponent, [{
    type: Component,
    args: [{
      selector: "[nz-checkbox]",
      exportAs: "nzCheckbox",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <span
      class="ant-checkbox"
      [class.ant-checkbox-checked]="nzChecked && !nzIndeterminate"
      [class.ant-checkbox-disabled]="nzDisabled || checkboxGroupComponent?.finalDisabled()"
      [class.ant-checkbox-indeterminate]="nzIndeterminate"
    >
      <input
        #inputElement
        type="checkbox"
        class="ant-checkbox-input"
        [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
        [attr.id]="nzId"
        [attr.name]="nzName || checkboxGroupComponent?.nzName()"
        [checked]="nzChecked"
        [ngModel]="nzChecked"
        [disabled]="nzDisabled || (checkboxGroupComponent?.finalDisabled() ?? false)"
        (ngModelChange)="innerCheckedChange($event)"
      />
      <span class="ant-checkbox-inner"></span>
    </span>
    <span><ng-content /></span>
  `,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzCheckboxComponent),
        multi: true
      }],
      host: {
        class: "ant-checkbox-wrapper",
        "[class.ant-checkbox-group-item]": "!!checkboxGroupComponent",
        "[class.ant-checkbox-wrapper-in-form-item]": "!!nzFormStatusService",
        "[class.ant-checkbox-wrapper-checked]": "nzChecked",
        "[class.ant-checkbox-wrapper-disabled]": "nzDisabled || checkboxGroupComponent?.finalDisabled()",
        "[class.ant-checkbox-rtl]": `dir === 'rtl'`
      },
      imports: [FormsModule]
    }]
  }], () => [], {
    inputElement: [{
      type: ViewChild,
      args: ["inputElement", {
        static: true
      }]
    }],
    nzCheckedChange: [{
      type: Output
    }],
    nzValue: [{
      type: Input
    }],
    nzAutoFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzIndeterminate: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzChecked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzId: [{
      type: Input
    }],
    nzName: [{
      type: Input
    }]
  });
})();
var _NzCheckboxGroupComponent = class _NzCheckboxGroupComponent {
  constructor() {
    __publicField(this, "onChange", () => {
    });
    __publicField(this, "onTouched", () => {
    });
    __publicField(this, "isDisabledFirstChange", true);
    __publicField(this, "directionality", inject(Directionality));
    __publicField(this, "nzName", input(null, ...ngDevMode ? [{
      debugName: "nzName"
    }] : []));
    __publicField(this, "nzDisabled", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzDisabled"
    } : {}), {
      transform: booleanAttribute
    })));
    __publicField(this, "nzOptions", input([], ...ngDevMode ? [{
      debugName: "nzOptions"
    }] : []));
    __publicField(this, "value", signal(null, ...ngDevMode ? [{
      debugName: "value"
    }] : []));
    __publicField(this, "finalDisabled", linkedSignal(() => this.nzDisabled(), ...ngDevMode ? [{
      debugName: "finalDisabled"
    }] : []));
    __publicField(this, "dir", toSignal(this.directionality.change, {
      initialValue: this.directionality.value
    }));
    __publicField(this, "normalizedOptions", computed(() => normalizeOptions(this.nzOptions()), ...ngDevMode ? [{
      debugName: "normalizedOptions"
    }] : []));
    const elementRef = inject(ElementRef);
    const focusMonitor = inject(FocusMonitor);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      focusMonitor.monitor(elementRef, true).pipe(takeUntilDestroyed(destroyRef)).subscribe((focusOrigin) => {
        if (!focusOrigin) {
          this.onTouched();
        }
      });
      destroyRef.onDestroy(() => {
        focusMonitor.stopMonitoring(elementRef);
      });
    });
  }
  writeValue(value) {
    untracked(() => {
      this.value.set(value);
    });
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(disabled) {
    untracked(() => {
      this.finalDisabled.set(this.isDisabledFirstChange && this.nzDisabled() || disabled);
    });
    this.isDisabledFirstChange = false;
  }
  onCheckedChange(optionValue, checked) {
    if (this.finalDisabled()) return;
    this.value.update((value) => {
      if (checked) {
        return (value == null ? void 0 : value.concat(optionValue)) || [optionValue];
      } else {
        return (value == null ? void 0 : value.filter((val) => val !== optionValue)) || [];
      }
    });
    this.onChange(this.value());
  }
};
__publicField(_NzCheckboxGroupComponent, "\u0275fac", function NzCheckboxGroupComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzCheckboxGroupComponent)();
});
__publicField(_NzCheckboxGroupComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzCheckboxGroupComponent,
  selectors: [["nz-checkbox-group"]],
  hostAttrs: [1, "ant-checkbox-group"],
  hostVars: 2,
  hostBindings: function NzCheckboxGroupComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-checkbox-group-rtl", ctx.dir() === "rtl");
    }
  },
  inputs: {
    nzName: [1, "nzName"],
    nzDisabled: [1, "nzDisabled"],
    nzOptions: [1, "nzOptions"]
  },
  exportAs: ["nzCheckboxGroup"],
  features: [\u0275\u0275ProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _NzCheckboxGroupComponent),
    multi: true
  }, {
    provide: NZ_CHECKBOX_GROUP,
    useExisting: forwardRef(() => _NzCheckboxGroupComponent)
  }])],
  ngContentSelectors: _c2,
  decls: 2,
  vars: 0,
  consts: [["nz-checkbox", "", 3, "nzValue", "nzName", "nzDisabled"]],
  template: function NzCheckboxGroupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0, 0, null, NzCheckboxGroupComponent_ProjectionFallback_0_Template, 2, 0);
    }
  },
  dependencies: [NzCheckboxComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzCheckboxGroupComponent = _NzCheckboxGroupComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCheckboxGroupComponent, [{
    type: Component,
    args: [{
      selector: "nz-checkbox-group",
      exportAs: "nzCheckboxGroup",
      imports: [NzCheckboxComponent],
      template: `
    <ng-content>
      @for (option of normalizedOptions(); track option.value) {
        <label
          nz-checkbox
          [nzValue]="option.value"
          [nzName]="nzName()"
          [nzDisabled]="option.disabled || finalDisabled()"
        >
          {{ option.label }}
        </label>
      }
    </ng-content>
  `,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzCheckboxGroupComponent),
        multi: true
      }, {
        provide: NZ_CHECKBOX_GROUP,
        useExisting: forwardRef(() => NzCheckboxGroupComponent)
      }],
      host: {
        class: "ant-checkbox-group",
        "[class.ant-checkbox-group-rtl]": `dir() === 'rtl'`
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], () => [], {
    nzName: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzName",
        required: false
      }]
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzDisabled",
        required: false
      }]
    }],
    nzOptions: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzOptions",
        required: false
      }]
    }]
  });
})();
function normalizeOptions(value) {
  return value.map((item) => {
    if (typeof item === "string" || typeof item === "number") {
      return {
        label: `${item}`,
        value: item
      };
    }
    return item;
  });
}
var _NzCheckboxModule = class _NzCheckboxModule {
};
__publicField(_NzCheckboxModule, "\u0275fac", function NzCheckboxModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzCheckboxModule)();
});
__publicField(_NzCheckboxModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzCheckboxModule,
  imports: [NzCheckboxComponent, NzCheckboxGroupComponent],
  exports: [NzCheckboxComponent, NzCheckboxGroupComponent]
}));
__publicField(_NzCheckboxModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzCheckboxComponent, NzCheckboxGroupComponent]
}));
var NzCheckboxModule = _NzCheckboxModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCheckboxModule, [{
    type: NgModule,
    args: [{
      imports: [NzCheckboxComponent, NzCheckboxGroupComponent],
      exports: [NzCheckboxComponent, NzCheckboxGroupComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-divider.mjs
function NzDividerComponent_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzText);
  }
}
function NzDividerComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 0);
    \u0275\u0275template(1, NzDividerComponent_Conditional_0_ng_container_1_Template, 2, 1, "ng-container", 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzText);
  }
}
var _NzDividerComponent = class _NzDividerComponent {
  constructor() {
    __publicField(this, "nzText");
    __publicField(this, "nzType", "horizontal");
    __publicField(this, "nzOrientation", "center");
    __publicField(this, "nzVariant", "solid");
    __publicField(this, "nzSize");
    __publicField(this, "nzDashed", false);
    __publicField(this, "nzPlain", false);
  }
};
__publicField(_NzDividerComponent, "\u0275fac", function NzDividerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzDividerComponent)();
});
__publicField(_NzDividerComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzDividerComponent,
  selectors: [["nz-divider"]],
  hostAttrs: [1, "ant-divider"],
  hostVars: 22,
  hostBindings: function NzDividerComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-divider-horizontal", ctx.nzType === "horizontal")("ant-divider-vertical", ctx.nzType === "vertical")("ant-divider-with-text", ctx.nzText)("ant-divider-plain", ctx.nzPlain)("ant-divider-with-text-left", ctx.nzText && ctx.nzOrientation === "left")("ant-divider-with-text-right", ctx.nzText && ctx.nzOrientation === "right")("ant-divider-with-text-center", ctx.nzText && ctx.nzOrientation === "center")("ant-divider-dashed", ctx.nzDashed || ctx.nzVariant === "dashed")("ant-divider-dotted", ctx.nzVariant === "dotted")("ant-divider-sm", ctx.nzSize === "small")("ant-divider-md", ctx.nzSize === "middle");
    }
  },
  inputs: {
    nzText: "nzText",
    nzType: "nzType",
    nzOrientation: "nzOrientation",
    nzVariant: "nzVariant",
    nzSize: "nzSize",
    nzDashed: [2, "nzDashed", "nzDashed", booleanAttribute],
    nzPlain: [2, "nzPlain", "nzPlain", booleanAttribute]
  },
  exportAs: ["nzDivider"],
  decls: 1,
  vars: 1,
  consts: [[1, "ant-divider-inner-text"], [4, "nzStringTemplateOutlet"]],
  template: function NzDividerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzDividerComponent_Conditional_0_Template, 2, 1, "span", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.nzText ? 0 : -1);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzDividerComponent = _NzDividerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDividerComponent, [{
    type: Component,
    args: [{
      selector: "nz-divider",
      exportAs: "nzDivider",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (nzText) {
      <span class="ant-divider-inner-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    }
  `,
      host: {
        class: "ant-divider",
        "[class.ant-divider-horizontal]": `nzType === 'horizontal'`,
        "[class.ant-divider-vertical]": `nzType === 'vertical'`,
        "[class.ant-divider-with-text]": `nzText`,
        "[class.ant-divider-plain]": `nzPlain`,
        "[class.ant-divider-with-text-left]": `nzText && nzOrientation === 'left'`,
        "[class.ant-divider-with-text-right]": `nzText && nzOrientation === 'right'`,
        "[class.ant-divider-with-text-center]": `nzText && nzOrientation === 'center'`,
        "[class.ant-divider-dashed]": `nzDashed || nzVariant === 'dashed'`,
        "[class.ant-divider-dotted]": `nzVariant === 'dotted'`,
        "[class.ant-divider-sm]": `nzSize === 'small'`,
        "[class.ant-divider-md]": `nzSize === 'middle'`
      },
      imports: [NzOutletModule]
    }]
  }], null, {
    nzText: [{
      type: Input
    }],
    nzType: [{
      type: Input
    }],
    nzOrientation: [{
      type: Input
    }],
    nzVariant: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzDashed: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzPlain: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzDividerModule = class _NzDividerModule {
};
__publicField(_NzDividerModule, "\u0275fac", function NzDividerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzDividerModule)();
});
__publicField(_NzDividerModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzDividerModule,
  imports: [NzDividerComponent],
  exports: [NzDividerComponent]
}));
__publicField(_NzDividerModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzDividerComponent]
}));
var NzDividerModule = _NzDividerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDividerModule, [{
    type: NgModule,
    args: [{
      imports: [NzDividerComponent],
      exports: [NzDividerComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-menu.mjs
var _c02 = ["nz-menu-item", ""];
var _c12 = ["*"];
var _c22 = ["nz-submenu-inline-child", ""];
var _c3 = ["nz-submenu-none-inline-child", ""];
var _c4 = ["nz-submenu-title", ""];
function NzSubMenuTitleComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("nzType", ctx_r0.nzIcon);
  }
}
function NzSubMenuTitleComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.nzTitle);
  }
}
function NzSubMenuTitleComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275element(1, "nz-icon", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzType", ctx_r0.dir() === "rtl" ? "left" : "right");
  }
}
function NzSubMenuTitleComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 3);
  }
}
var _c5 = ["nz-submenu", ""];
var _c6 = [[["", "title", ""]], "*"];
var _c7 = ["[title]", "*"];
function NzSubMenuComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function NzSubMenuComponent_Conditional_3_ng_template_1_Template(rf, ctx) {
}
function NzSubMenuComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275template(1, NzSubMenuComponent_Conditional_3_ng_template_1_Template, 0, 0, "ng-template", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const subMenuTemplate_r2 = \u0275\u0275reference(6);
    \u0275\u0275property("open", ctx_r0.nzOpen)("menuClass", ctx_r0.nzMenuClassName);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", subMenuTemplate_r2);
  }
}
function NzSubMenuComponent_Conditional_4_ng_template_0_ng_template_1_Template(rf, ctx) {
}
function NzSubMenuComponent_Conditional_4_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275listener("subMenuMouseState", function NzSubMenuComponent_Conditional_4_ng_template_0_Template_div_subMenuMouseState_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.setMouseEnterState($event));
    });
    \u0275\u0275template(1, NzSubMenuComponent_Conditional_4_ng_template_0_ng_template_1_Template, 0, 0, "ng-template", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    const subMenuTemplate_r2 = \u0275\u0275reference(6);
    \u0275\u0275property("theme", ctx_r0.theme)("mode", ctx_r0.mode)("open", ctx_r0.nzOpen)("position", ctx_r0.position)("menuClass", ctx_r0.nzMenuClassName)("nzDisabled", ctx_r0.nzDisabled)("nzTriggerSubMenuAction", ctx_r0.nzTriggerSubMenuAction)("nzNoAnimation", ctx_r0.noAnimation == null ? null : ctx_r0.noAnimation.nzNoAnimation == null ? null : ctx_r0.noAnimation.nzNoAnimation());
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", subMenuTemplate_r2);
  }
}
function NzSubMenuComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275template(0, NzSubMenuComponent_Conditional_4_ng_template_0_Template, 2, 9, "ng-template", 6);
    \u0275\u0275listener("positionChange", function NzSubMenuComponent_Conditional_4_Template_ng_template_positionChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPositionChange($event));
    })("overlayOutsideClick", function NzSubMenuComponent_Conditional_4_Template_ng_template_overlayOutsideClick_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setMouseEnterState(false));
    });
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const origin_r5 = \u0275\u0275reference(1);
    \u0275\u0275property("cdkConnectedOverlayPositions", ctx_r0.overlayPositions)("cdkConnectedOverlayOrigin", origin_r5)("cdkConnectedOverlayWidth", ctx_r0.triggerWidth)("cdkConnectedOverlayOpen", ctx_r0.nzOpen);
  }
}
function NzSubMenuComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 1);
  }
}
var _c8 = ["titleElement"];
var _c9 = ["nz-menu-group", ""];
var _c10 = ["*", [["", "title", ""]]];
var _c11 = ["*", "[title]"];
function NzMenuGroupComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzTitle);
  }
}
function NzMenuGroupComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 1);
  }
}
var _MenuService = class _MenuService {
  constructor() {
    /** all descendant menu click **/
    __publicField(this, "descendantMenuItemClick$", new Subject());
    /** child menu item click **/
    __publicField(this, "childMenuItemClick$", new Subject());
    __publicField(this, "theme$", new BehaviorSubject("light"));
    __publicField(this, "mode$", new BehaviorSubject("vertical"));
    __publicField(this, "inlineIndent$", new BehaviorSubject(24));
    __publicField(this, "isChildSubMenuOpen$", new BehaviorSubject(false));
  }
  onDescendantMenuItemClick(menu) {
    this.descendantMenuItemClick$.next(menu);
  }
  onChildMenuItemClick(menu) {
    this.childMenuItemClick$.next(menu);
  }
  setMode(mode) {
    this.mode$.next(mode);
  }
  setTheme(theme) {
    this.theme$.next(theme);
  }
  setInlineIndent(indent) {
    this.inlineIndent$.next(indent);
  }
};
__publicField(_MenuService, "\u0275fac", function MenuService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MenuService)();
});
__publicField(_MenuService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _MenuService,
  factory: _MenuService.\u0275fac
}));
var MenuService = _MenuService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuService, [{
    type: Injectable
  }], null, null);
})();
var NzIsMenuInsideDropdownToken = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "nz-is-in-dropdown-menu" : "");
var NzMenuServiceLocalToken = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "nz-menu-service-local" : "");
var _NzSubmenuService = class _NzSubmenuService {
  constructor() {
    __publicField(this, "nzMenuService", inject(MenuService));
    __publicField(this, "isMenuInsideDropdown", inject(NzIsMenuInsideDropdownToken));
    __publicField(this, "nzHostSubmenuService", inject(_NzSubmenuService, {
      optional: true,
      skipSelf: true
    }));
    __publicField(this, "mode$", this.nzMenuService.mode$.pipe(map((mode) => {
      if (mode === "inline") {
        return "inline";
      } else if (mode === "vertical" || this.nzHostSubmenuService) {
        return "vertical";
      } else {
        return "horizontal";
      }
    })));
    __publicField(this, "level", 1);
    __publicField(this, "isCurrentSubMenuOpen$", new BehaviorSubject(false));
    __publicField(this, "isChildSubMenuOpen$", new BehaviorSubject(false));
    /** submenu title & overlay mouse enter status **/
    __publicField(this, "isMouseEnterTitleOrOverlay$", new Subject());
    __publicField(this, "childMenuItemClick$", new Subject());
    if (this.nzHostSubmenuService) {
      this.level = this.nzHostSubmenuService.level + 1;
    }
    const isClosedByMenuItemClick = this.childMenuItemClick$.pipe(mergeMap(() => this.mode$), filter((mode) => mode !== "inline" || this.isMenuInsideDropdown), map(() => false));
    const isCurrentSubmenuOpen$ = merge(this.isMouseEnterTitleOrOverlay$, isClosedByMenuItemClick);
    const isSubMenuOpenWithDebounce$ = combineLatest([this.isChildSubMenuOpen$, isCurrentSubmenuOpen$]).pipe(map(([isChildSubMenuOpen, isCurrentSubmenuOpen]) => isChildSubMenuOpen || isCurrentSubmenuOpen), auditTime(150));
    isSubMenuOpenWithDebounce$.pipe(distinctUntilChanged(), takeUntilDestroyed()).subscribe((data) => {
      this.setOpenStateWithoutDebounce(data);
      if (this.nzHostSubmenuService) {
        this.nzHostSubmenuService.isChildSubMenuOpen$.next(data);
      } else {
        this.nzMenuService.isChildSubMenuOpen$.next(data);
      }
    });
  }
  /**
   * menu item inside submenu clicked
   */
  onChildMenuItemClick(menu) {
    this.childMenuItemClick$.next(menu);
  }
  setOpenStateWithoutDebounce(value) {
    this.isCurrentSubMenuOpen$.next(value);
  }
  setMouseEnterTitleOrOverlayState(value) {
    this.isMouseEnterTitleOrOverlay$.next(value);
  }
};
__publicField(_NzSubmenuService, "\u0275fac", function NzSubmenuService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSubmenuService)();
});
__publicField(_NzSubmenuService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _NzSubmenuService,
  factory: _NzSubmenuService.\u0275fac
}));
var NzSubmenuService = _NzSubmenuService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSubmenuService, [{
    type: Injectable
  }], () => [], null);
})();
var _NzMenuItemComponent = class _NzMenuItemComponent {
  constructor() {
    __publicField(this, "nzMenuService", inject(MenuService));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "nzSubmenuService", inject(NzSubmenuService, {
      optional: true
    }));
    __publicField(this, "routerLink", inject(RouterLink, {
      optional: true
    }));
    __publicField(this, "router", inject(Router, {
      optional: true
    }));
    __publicField(this, "isMenuInsideDropdown", inject(NzIsMenuInsideDropdownToken));
    __publicField(this, "level", this.nzSubmenuService ? this.nzSubmenuService.level + 1 : 1);
    __publicField(this, "selected$", new Subject());
    __publicField(this, "inlinePaddingLeft", null);
    __publicField(this, "nzPaddingLeft");
    __publicField(this, "nzDisabled", false);
    __publicField(this, "nzSelected", false);
    __publicField(this, "nzDanger", false);
    __publicField(this, "nzMatchRouterExact", false);
    __publicField(this, "nzMatchRouter", false);
    __publicField(this, "listOfRouterLink");
    var _a;
    (_a = this.router) == null ? void 0 : _a.events.pipe(takeUntilDestroyed(), filter((e) => e instanceof NavigationEnd)).subscribe(() => this.updateRouterActive());
  }
  /** clear all item selected status except this */
  clickMenuItem(e) {
    if (this.nzDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.nzMenuService.onDescendantMenuItemClick(this);
    if (this.nzSubmenuService) {
      this.nzSubmenuService.onChildMenuItemClick(this);
    } else {
      this.nzMenuService.onChildMenuItemClick(this);
    }
  }
  setSelectedState(value) {
    this.nzSelected = value;
    this.selected$.next(value);
  }
  updateRouterActive() {
    if (!this.listOfRouterLink || !this.router || !this.router.navigated || !this.nzMatchRouter) {
      return;
    }
    Promise.resolve().then(() => {
      const hasActiveLinks = this.hasActiveLinks();
      if (this.nzSelected !== hasActiveLinks) {
        this.nzSelected = hasActiveLinks;
        this.setSelectedState(this.nzSelected);
        this.cdr.markForCheck();
      }
    });
  }
  hasActiveLinks() {
    const isActiveCheckFn = this.isLinkActive(this.router);
    return this.routerLink && isActiveCheckFn(this.routerLink) || this.listOfRouterLink.some(isActiveCheckFn);
  }
  isLinkActive(router) {
    return (link) => router.isActive(link.urlTree || "", {
      paths: this.nzMatchRouterExact ? "exact" : "subset",
      queryParams: this.nzMatchRouterExact ? "exact" : "subset",
      fragment: "ignored",
      matrixParams: "ignored"
    });
  }
  ngOnInit() {
    combineLatest([this.nzMenuService.mode$, this.nzMenuService.inlineIndent$]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(([mode, inlineIndent]) => {
      this.inlinePaddingLeft = mode === "inline" ? this.level * inlineIndent : null;
    });
  }
  ngAfterContentInit() {
    this.listOfRouterLink.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.updateRouterActive());
    this.updateRouterActive();
  }
  ngOnChanges(changes) {
    const {
      nzSelected
    } = changes;
    if (nzSelected) {
      this.setSelectedState(this.nzSelected);
    }
  }
};
__publicField(_NzMenuItemComponent, "\u0275fac", function NzMenuItemComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzMenuItemComponent)();
});
__publicField(_NzMenuItemComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzMenuItemComponent,
  selectors: [["", "nz-menu-item", ""]],
  contentQueries: function NzMenuItemComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, RouterLink, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfRouterLink = _t);
    }
  },
  hostVars: 18,
  hostBindings: function NzMenuItemComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function NzMenuItemComponent_click_HostBindingHandler($event) {
        return ctx.clickMenuItem($event);
      });
    }
    if (rf & 2) {
      \u0275\u0275styleProp("padding-inline-start", ctx.nzPaddingLeft || ctx.inlinePaddingLeft, "px");
      \u0275\u0275classProp("ant-dropdown-menu-item", ctx.isMenuInsideDropdown)("ant-dropdown-menu-item-selected", ctx.isMenuInsideDropdown && ctx.nzSelected)("ant-dropdown-menu-item-danger", ctx.isMenuInsideDropdown && ctx.nzDanger)("ant-dropdown-menu-item-disabled", ctx.isMenuInsideDropdown && ctx.nzDisabled)("ant-menu-item", !ctx.isMenuInsideDropdown)("ant-menu-item-selected", !ctx.isMenuInsideDropdown && ctx.nzSelected)("ant-menu-item-danger", !ctx.isMenuInsideDropdown && ctx.nzDanger)("ant-menu-item-disabled", !ctx.isMenuInsideDropdown && ctx.nzDisabled);
    }
  },
  inputs: {
    nzPaddingLeft: [2, "nzPaddingLeft", "nzPaddingLeft", numberAttributeWithZeroFallback],
    nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
    nzSelected: [2, "nzSelected", "nzSelected", booleanAttribute],
    nzDanger: [2, "nzDanger", "nzDanger", booleanAttribute],
    nzMatchRouterExact: [2, "nzMatchRouterExact", "nzMatchRouterExact", booleanAttribute],
    nzMatchRouter: [2, "nzMatchRouter", "nzMatchRouter", booleanAttribute]
  },
  exportAs: ["nzMenuItem"],
  features: [\u0275\u0275NgOnChangesFeature],
  attrs: _c02,
  ngContentSelectors: _c12,
  decls: 2,
  vars: 0,
  consts: [[1, "ant-menu-title-content"]],
  template: function NzMenuItemComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "span", 0);
      \u0275\u0275projection(1);
      \u0275\u0275domElementEnd();
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzMenuItemComponent = _NzMenuItemComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzMenuItemComponent, [{
    type: Component,
    args: [{
      selector: "[nz-menu-item]",
      exportAs: "nzMenuItem",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <span class="ant-menu-title-content">
      <ng-content />
    </span>
  `,
      host: {
        "[class.ant-dropdown-menu-item]": `isMenuInsideDropdown`,
        "[class.ant-dropdown-menu-item-selected]": `isMenuInsideDropdown && nzSelected`,
        "[class.ant-dropdown-menu-item-danger]": `isMenuInsideDropdown && nzDanger`,
        "[class.ant-dropdown-menu-item-disabled]": `isMenuInsideDropdown && nzDisabled`,
        "[class.ant-menu-item]": `!isMenuInsideDropdown`,
        "[class.ant-menu-item-selected]": `!isMenuInsideDropdown && nzSelected`,
        "[class.ant-menu-item-danger]": `!isMenuInsideDropdown && nzDanger`,
        "[class.ant-menu-item-disabled]": `!isMenuInsideDropdown && nzDisabled`,
        "[style.padding-inline-start.px]": "nzPaddingLeft || inlinePaddingLeft",
        "(click)": "clickMenuItem($event)"
      }
    }]
  }], () => [], {
    nzPaddingLeft: [{
      type: Input,
      args: [{
        transform: numberAttributeWithZeroFallback
      }]
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSelected: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDanger: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzMatchRouterExact: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzMatchRouter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    listOfRouterLink: [{
      type: ContentChildren,
      args: [RouterLink, {
        descendants: true
      }]
    }]
  });
})();
var MENU_PREFIX$1 = "ant-menu";
var _NzSubmenuInlineChildComponent = class _NzSubmenuInlineChildComponent {
  constructor() {
    __publicField(this, "dir", inject(Directionality).valueSignal);
    __publicField(this, "menuClass", input("", ...ngDevMode ? [{
      debugName: "menuClass"
    }] : []));
    __publicField(this, "open", input(false, ...ngDevMode ? [{
      debugName: "open"
    }] : []));
    __publicField(this, "leavedClassName", input(generateClassName(MENU_PREFIX$1, "submenu-hidden"), ...ngDevMode ? [{
      debugName: "leavedClassName"
    }] : []));
    __publicField(this, "mergedClass", computed(() => {
      const customCls = getClassListFromValue(this.menuClass()) || [];
      const cls = [MENU_PREFIX$1, generateClassName(MENU_PREFIX$1, "inline"), generateClassName(MENU_PREFIX$1, "sub"), ...customCls];
      if (this.dir() === "rtl") {
        cls.push(generateClassName(MENU_PREFIX$1, "rtl"));
      }
      return cls;
    }, ...ngDevMode ? [{
      debugName: "mergedClass"
    }] : []));
  }
};
__publicField(_NzSubmenuInlineChildComponent, "\u0275fac", function NzSubmenuInlineChildComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSubmenuInlineChildComponent)();
});
__publicField(_NzSubmenuInlineChildComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSubmenuInlineChildComponent,
  selectors: [["", "nz-submenu-inline-child", ""]],
  hostVars: 2,
  hostBindings: function NzSubmenuInlineChildComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classMap(ctx.mergedClass());
    }
  },
  inputs: {
    menuClass: [1, "menuClass"],
    open: [1, "open"],
    leavedClassName: [1, "leavedClassName"]
  },
  exportAs: ["nzSubmenuInlineChild"],
  features: [\u0275\u0275HostDirectivesFeature([{
    directive: NzAnimationCollapseDirective,
    inputs: ["open", "open", "leavedClassName", "leavedClassName"]
  }])],
  attrs: _c22,
  ngContentSelectors: _c12,
  decls: 1,
  vars: 0,
  template: function NzSubmenuInlineChildComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzSubmenuInlineChildComponent = _NzSubmenuInlineChildComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSubmenuInlineChildComponent, [{
    type: Component,
    args: [{
      selector: "[nz-submenu-inline-child]",
      exportAs: "nzSubmenuInlineChild",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<ng-content />`,
      hostDirectives: [{
        directive: NzAnimationCollapseDirective,
        inputs: ["open", "leavedClassName"]
      }],
      host: {
        "[class]": "mergedClass()"
      }
    }]
  }], null, {
    menuClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "menuClass",
        required: false
      }]
    }],
    open: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "open",
        required: false
      }]
    }],
    leavedClassName: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "leavedClassName",
        required: false
      }]
    }]
  });
})();
var ANT_PREFIX = "ant";
var MENU_PREFIX = `${ANT_PREFIX}-menu`;
var SUBMENU_PREFIX = `${MENU_PREFIX}-submenu`;
var DROPDOWN_PREFIX = `${ANT_PREFIX}-dropdown`;
var ANIMATION_PREFIX = `${ANT_PREFIX}-zoom-big`;
var ANIMATION_CLASS = {
  vertical: {
    enter: `${ANIMATION_PREFIX}-enter ${ANIMATION_PREFIX}-enter-active`,
    leave: `${ANIMATION_PREFIX}-leave ${ANIMATION_PREFIX}-leave-active`
  },
  horizontal: SLIDE_ANIMATION_CLASS
};
var _NzSubmenuNoneInlineChildComponent = class _NzSubmenuNoneInlineChildComponent {
  constructor() {
    __publicField(this, "isMenuInsideDropdown", inject(NzIsMenuInsideDropdownToken));
    __publicField(this, "dir", inject(Directionality).valueSignal);
    __publicField(this, "menuClass", input("", ...ngDevMode ? [{
      debugName: "menuClass"
    }] : []));
    __publicField(this, "theme", input("light", ...ngDevMode ? [{
      debugName: "theme"
    }] : []));
    __publicField(this, "mode", input("vertical", ...ngDevMode ? [{
      debugName: "mode"
    }] : []));
    __publicField(this, "position", input("right", ...ngDevMode ? [{
      debugName: "position"
    }] : []));
    __publicField(this, "open", input(false, ...ngDevMode ? [{
      debugName: "open"
    }] : []));
    __publicField(this, "nzDisabled", input(false, ...ngDevMode ? [{
      debugName: "nzDisabled"
    }] : []));
    __publicField(this, "nzTriggerSubMenuAction", input("hover", ...ngDevMode ? [{
      debugName: "nzTriggerSubMenuAction"
    }] : []));
    __publicField(this, "subMenuMouseState", output());
    __publicField(this, "animationEnter", withAnimationCheck(() => ANIMATION_CLASS[this.mode()].enter));
    __publicField(this, "animationLeave", withAnimationCheck(() => ANIMATION_CLASS[this.mode()].leave));
    __publicField(this, "submenuClass", computed(() => {
      const cls = [SUBMENU_PREFIX, generateClassName(SUBMENU_PREFIX, "popup"), generateClassName(MENU_PREFIX, this.theme() === "dark" ? "dark" : "light")];
      const mode = this.mode();
      const position = this.position() === "left" ? "left" : "right";
      if (mode === "horizontal") {
        cls.push(generateClassName(SUBMENU_PREFIX, "placement-bottom"));
      } else if (mode === "vertical") {
        cls.push(generateClassName(SUBMENU_PREFIX, `placement-${position}`));
      }
      if (this.dir() === "rtl") {
        cls.push(generateClassName(SUBMENU_PREFIX, "rtl"));
      }
      return cls;
    }, ...ngDevMode ? [{
      debugName: "submenuClass"
    }] : []));
    __publicField(this, "mergedMenuClass", computed(() => {
      const cls = getClassListFromValue(this.menuClass()) || [];
      if (this.isMenuInsideDropdown) {
        cls.push(generateClassName(DROPDOWN_PREFIX, "menu"), generateClassName(DROPDOWN_PREFIX, "menu-sub"), generateClassName(DROPDOWN_PREFIX, "menu-vertical"));
      } else {
        cls.push(MENU_PREFIX, generateClassName(MENU_PREFIX, "sub"), generateClassName(MENU_PREFIX, "vertical"));
      }
      if (this.dir() === "rtl") {
        cls.push(generateClassName(MENU_PREFIX, "rtl"));
      }
      return cls;
    }, ...ngDevMode ? [{
      debugName: "mergedMenuClass"
    }] : []));
  }
  setMouseState(state) {
    if (!this.nzDisabled() && this.nzTriggerSubMenuAction() === "hover") {
      this.subMenuMouseState.emit(state);
    }
  }
};
__publicField(_NzSubmenuNoneInlineChildComponent, "\u0275fac", function NzSubmenuNoneInlineChildComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSubmenuNoneInlineChildComponent)();
});
__publicField(_NzSubmenuNoneInlineChildComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSubmenuNoneInlineChildComponent,
  selectors: [["", "nz-submenu-none-inline-child", ""]],
  hostVars: 2,
  hostBindings: function NzSubmenuNoneInlineChildComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("mouseenter", function NzSubmenuNoneInlineChildComponent_mouseenter_HostBindingHandler() {
        return ctx.setMouseState(true);
      })("mouseleave", function NzSubmenuNoneInlineChildComponent_mouseleave_HostBindingHandler() {
        return ctx.setMouseState(false);
      });
      \u0275\u0275animateEnter(function NzSubmenuNoneInlineChildComponent_HostBindings_animateenter_cb() {
        return ctx.animationEnter();
      });
      \u0275\u0275animateLeave(function NzSubmenuNoneInlineChildComponent_HostBindings_animateleave_cb() {
        return ctx.animationLeave();
      });
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.submenuClass());
    }
  },
  inputs: {
    menuClass: [1, "menuClass"],
    theme: [1, "theme"],
    mode: [1, "mode"],
    position: [1, "position"],
    open: [1, "open"],
    nzDisabled: [1, "nzDisabled"],
    nzTriggerSubMenuAction: [1, "nzTriggerSubMenuAction"]
  },
  outputs: {
    subMenuMouseState: "subMenuMouseState"
  },
  exportAs: ["nzSubmenuNoneInlineChild"],
  attrs: _c3,
  ngContentSelectors: _c12,
  decls: 2,
  vars: 2,
  template: function NzSubmenuNoneInlineChildComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "div");
      \u0275\u0275projection(1);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.mergedMenuClass());
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzSubmenuNoneInlineChildComponent = _NzSubmenuNoneInlineChildComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSubmenuNoneInlineChildComponent, [{
    type: Component,
    args: [{
      selector: "[nz-submenu-none-inline-child]",
      exportAs: "nzSubmenuNoneInlineChild",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <div [class]="mergedMenuClass()">
      <ng-content />
    </div>
  `,
      host: {
        "[class]": "submenuClass()",
        "(mouseenter)": "setMouseState(true)",
        "(mouseleave)": "setMouseState(false)",
        "[animate.enter]": `animationEnter()`,
        "[animate.leave]": `animationLeave()`
      }
    }]
  }], null, {
    menuClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "menuClass",
        required: false
      }]
    }],
    theme: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "theme",
        required: false
      }]
    }],
    mode: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "mode",
        required: false
      }]
    }],
    position: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "position",
        required: false
      }]
    }],
    open: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "open",
        required: false
      }]
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzDisabled",
        required: false
      }]
    }],
    nzTriggerSubMenuAction: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzTriggerSubMenuAction",
        required: false
      }]
    }],
    subMenuMouseState: [{
      type: Output,
      args: ["subMenuMouseState"]
    }]
  });
})();
var _NzSubMenuTitleComponent = class _NzSubMenuTitleComponent {
  constructor() {
    __publicField(this, "isMenuInsideDropdown", inject(NzIsMenuInsideDropdownToken));
    __publicField(this, "dir", inject(Directionality).valueSignal);
    __publicField(this, "nzIcon", null);
    __publicField(this, "nzTitle", null);
    __publicField(this, "nzDisabled", false);
    __publicField(this, "paddingLeft", null);
    __publicField(this, "mode", "vertical");
    __publicField(this, "nzTriggerSubMenuAction", "hover");
    __publicField(this, "toggleSubMenu", new EventEmitter());
    __publicField(this, "subMenuMouseState", new EventEmitter());
  }
  setMouseState(state) {
    if (!this.nzDisabled && this.nzTriggerSubMenuAction === "hover") {
      this.subMenuMouseState.next(state);
    }
  }
  clickTitle() {
    if ((this.mode === "inline" || this.nzTriggerSubMenuAction === "click") && !this.nzDisabled) {
      this.subMenuMouseState.next(true);
      this.toggleSubMenu.emit();
    }
  }
};
__publicField(_NzSubMenuTitleComponent, "\u0275fac", function NzSubMenuTitleComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSubMenuTitleComponent)();
});
__publicField(_NzSubMenuTitleComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSubMenuTitleComponent,
  selectors: [["", "nz-submenu-title", ""]],
  hostVars: 6,
  hostBindings: function NzSubMenuTitleComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function NzSubMenuTitleComponent_click_HostBindingHandler() {
        return ctx.clickTitle();
      })("mouseenter", function NzSubMenuTitleComponent_mouseenter_HostBindingHandler() {
        return ctx.setMouseState(true);
      })("mouseleave", function NzSubMenuTitleComponent_mouseleave_HostBindingHandler() {
        return ctx.setMouseState(false);
      });
    }
    if (rf & 2) {
      \u0275\u0275styleProp("padding-inline-start", ctx.paddingLeft, "px");
      \u0275\u0275classProp("ant-dropdown-menu-submenu-title", ctx.isMenuInsideDropdown)("ant-menu-submenu-title", !ctx.isMenuInsideDropdown);
    }
  },
  inputs: {
    nzIcon: "nzIcon",
    nzTitle: "nzTitle",
    nzDisabled: "nzDisabled",
    paddingLeft: "paddingLeft",
    mode: "mode",
    nzTriggerSubMenuAction: "nzTriggerSubMenuAction"
  },
  outputs: {
    toggleSubMenu: "toggleSubMenu",
    subMenuMouseState: "subMenuMouseState"
  },
  exportAs: ["nzSubmenuTitle"],
  attrs: _c4,
  ngContentSelectors: _c12,
  decls: 5,
  vars: 3,
  consts: [[3, "nzType"], [4, "nzStringTemplateOutlet"], [1, "ant-dropdown-menu-submenu-expand-icon"], [1, "ant-menu-submenu-arrow"], [1, "ant-menu-title-content"], [1, "ant-dropdown-menu-submenu-arrow-icon", 3, "nzType"]],
  template: function NzSubMenuTitleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275conditionalCreate(0, NzSubMenuTitleComponent_Conditional_0_Template, 1, 1, "nz-icon", 0);
      \u0275\u0275template(1, NzSubMenuTitleComponent_ng_container_1_Template, 3, 1, "ng-container", 1);
      \u0275\u0275projection(2);
      \u0275\u0275conditionalCreate(3, NzSubMenuTitleComponent_Conditional_3_Template, 2, 1, "span", 2)(4, NzSubMenuTitleComponent_Conditional_4_Template, 1, 0, "span", 3);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.nzIcon ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("nzStringTemplateOutlet", ctx.nzTitle);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isMenuInsideDropdown ? 3 : 4);
    }
  },
  dependencies: [NzIconModule, NzIconDirective, NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzSubMenuTitleComponent = _NzSubMenuTitleComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSubMenuTitleComponent, [{
    type: Component,
    args: [{
      selector: "[nz-submenu-title]",
      exportAs: "nzSubmenuTitle",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (nzIcon) {
      <nz-icon [nzType]="nzIcon" />
    }
    <ng-container *nzStringTemplateOutlet="nzTitle">
      <span class="ant-menu-title-content">{{ nzTitle }}</span>
    </ng-container>
    <ng-content />
    @if (isMenuInsideDropdown) {
      <span class="ant-dropdown-menu-submenu-expand-icon">
        <nz-icon [nzType]="dir() === 'rtl' ? 'left' : 'right'" class="ant-dropdown-menu-submenu-arrow-icon" />
      </span>
    } @else {
      <span class="ant-menu-submenu-arrow"></span>
    }
  `,
      host: {
        "[class.ant-dropdown-menu-submenu-title]": "isMenuInsideDropdown",
        "[class.ant-menu-submenu-title]": "!isMenuInsideDropdown",
        "[style.padding-inline-start.px]": "paddingLeft",
        "(click)": "clickTitle()",
        "(mouseenter)": "setMouseState(true)",
        "(mouseleave)": "setMouseState(false)"
      },
      imports: [NzIconModule, NzOutletModule]
    }]
  }], null, {
    nzIcon: [{
      type: Input
    }],
    nzTitle: [{
      type: Input
    }],
    nzDisabled: [{
      type: Input
    }],
    paddingLeft: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    nzTriggerSubMenuAction: [{
      type: Input
    }],
    toggleSubMenu: [{
      type: Output
    }],
    subMenuMouseState: [{
      type: Output
    }]
  });
})();
var listOfVerticalPositions = [POSITION_MAP.rightTop, POSITION_MAP.right, POSITION_MAP.rightBottom, POSITION_MAP.leftTop, POSITION_MAP.left, POSITION_MAP.leftBottom];
var listOfHorizontalPositions = [POSITION_MAP.bottomLeft, POSITION_MAP.bottomRight, POSITION_MAP.topRight, POSITION_MAP.topLeft];
var _NzSubMenuComponent = class _NzSubMenuComponent {
  constructor() {
    __publicField(this, "nzSubmenuService", inject(NzSubmenuService));
    __publicField(this, "isMenuInsideDropdown", inject(NzIsMenuInsideDropdownToken));
    __publicField(this, "noAnimation", inject(NzNoAnimationDirective, {
      optional: true,
      host: true
    }));
    __publicField(this, "dir", inject(Directionality).valueSignal);
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "nzMenuService", inject(MenuService));
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "platform", inject(Platform));
    __publicField(this, "nzMenuClassName", "");
    __publicField(this, "nzPaddingLeft", null);
    __publicField(this, "nzTitle", null);
    __publicField(this, "nzIcon", null);
    __publicField(this, "nzTriggerSubMenuAction", "hover");
    __publicField(this, "nzOpen", false);
    __publicField(this, "nzDisabled", false);
    __publicField(this, "nzPlacement", "bottomLeft");
    __publicField(this, "nzOpenChange", new EventEmitter());
    __publicField(this, "cdkOverlayOrigin", null);
    // fix errors about circular dependency
    // Can't construct a query for the property ... since the query selector wasn't defined
    __publicField(this, "listOfNzSubMenuComponent", null);
    __publicField(this, "listOfNzMenuItemDirective", null);
    __publicField(this, "level", this.nzSubmenuService.level);
    __publicField(this, "position", "right");
    __publicField(this, "triggerWidth", null);
    __publicField(this, "theme", "light");
    __publicField(this, "mode", "vertical");
    __publicField(this, "inlinePaddingLeft", null);
    __publicField(this, "overlayPositions", listOfVerticalPositions);
    __publicField(this, "isSelected", false);
    __publicField(this, "isActive", false);
  }
  /** set the submenu host open status directly **/
  setOpenStateWithoutDebounce(open) {
    this.nzSubmenuService.setOpenStateWithoutDebounce(open);
  }
  toggleSubMenu() {
    this.setOpenStateWithoutDebounce(!this.nzOpen);
  }
  setMouseEnterState(value) {
    this.isActive = value;
    if (this.mode !== "inline") {
      this.nzSubmenuService.setMouseEnterTitleOrOverlayState(value);
    }
  }
  setTriggerWidth() {
    if (this.mode === "horizontal" && this.platform.isBrowser && this.cdkOverlayOrigin && this.nzPlacement === "bottomLeft") {
      this.triggerWidth = this.cdkOverlayOrigin.nativeElement.getBoundingClientRect().width;
    }
  }
  onPositionChange(position) {
    const placement = getPlacementName(position);
    if (placement === "rightTop" || placement === "rightBottom" || placement === "right") {
      this.position = "right";
    } else if (placement === "leftTop" || placement === "leftBottom" || placement === "left") {
      this.position = "left";
    }
  }
  ngOnInit() {
    this.nzMenuService.theme$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((theme) => {
      this.theme = theme;
      this.cdr.markForCheck();
    });
    this.nzSubmenuService.mode$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((mode) => {
      this.mode = mode;
      if (mode === "horizontal") {
        this.overlayPositions = [POSITION_MAP[this.nzPlacement], ...listOfHorizontalPositions];
      } else if (mode === "vertical") {
        this.overlayPositions = listOfVerticalPositions;
      }
      this.cdr.markForCheck();
    });
    combineLatest([this.nzSubmenuService.mode$, this.nzMenuService.inlineIndent$]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(([mode, inlineIndent]) => {
      this.inlinePaddingLeft = mode === "inline" ? this.level * inlineIndent : null;
      this.cdr.markForCheck();
    });
    this.nzSubmenuService.isCurrentSubMenuOpen$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((open) => {
      this.isActive = open;
      if (open !== this.nzOpen) {
        this.setTriggerWidth();
        this.nzOpen = open;
        this.nzOpenChange.emit(this.nzOpen);
        this.cdr.markForCheck();
      }
    });
  }
  ngAfterContentInit() {
    this.setTriggerWidth();
    const listOfNzMenuItemDirective = this.listOfNzMenuItemDirective;
    const changes = listOfNzMenuItemDirective.changes;
    const mergedObservable = merge(changes, ...listOfNzMenuItemDirective.map((menu) => menu.selected$));
    changes.pipe(startWith(listOfNzMenuItemDirective), switchMap(() => mergedObservable), startWith(true), map(() => listOfNzMenuItemDirective.some((e) => e.nzSelected)), takeUntilDestroyed(this.destroyRef)).subscribe((selected) => {
      this.isSelected = selected;
      this.cdr.markForCheck();
    });
  }
  ngOnChanges(changes) {
    const {
      nzOpen
    } = changes;
    if (nzOpen) {
      this.nzSubmenuService.setOpenStateWithoutDebounce(this.nzOpen);
      this.setTriggerWidth();
    }
  }
};
__publicField(_NzSubMenuComponent, "\u0275fac", function NzSubMenuComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSubMenuComponent)();
});
__publicField(_NzSubMenuComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSubMenuComponent,
  selectors: [["", "nz-submenu", ""]],
  contentQueries: function NzSubMenuComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, _NzSubMenuComponent, 5)(dirIndex, NzMenuItemComponent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfNzSubMenuComponent = _t);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfNzMenuItemDirective = _t);
    }
  },
  viewQuery: function NzSubMenuComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(CdkOverlayOrigin, 7, ElementRef);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.cdkOverlayOrigin = _t.first);
    }
  },
  hostVars: 34,
  hostBindings: function NzSubMenuComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-dropdown-menu-submenu", ctx.isMenuInsideDropdown)("ant-dropdown-menu-submenu-disabled", ctx.isMenuInsideDropdown && ctx.nzDisabled)("ant-dropdown-menu-submenu-open", ctx.isMenuInsideDropdown && ctx.nzOpen)("ant-dropdown-menu-submenu-selected", ctx.isMenuInsideDropdown && ctx.isSelected)("ant-dropdown-menu-submenu-vertical", ctx.isMenuInsideDropdown && ctx.mode === "vertical")("ant-dropdown-menu-submenu-horizontal", ctx.isMenuInsideDropdown && ctx.mode === "horizontal")("ant-dropdown-menu-submenu-inline", ctx.isMenuInsideDropdown && ctx.mode === "inline")("ant-dropdown-menu-submenu-active", ctx.isMenuInsideDropdown && ctx.isActive)("ant-menu-submenu", !ctx.isMenuInsideDropdown)("ant-menu-submenu-disabled", !ctx.isMenuInsideDropdown && ctx.nzDisabled)("ant-menu-submenu-open", !ctx.isMenuInsideDropdown && ctx.nzOpen)("ant-menu-submenu-selected", !ctx.isMenuInsideDropdown && ctx.isSelected)("ant-menu-submenu-vertical", !ctx.isMenuInsideDropdown && ctx.mode === "vertical")("ant-menu-submenu-horizontal", !ctx.isMenuInsideDropdown && ctx.mode === "horizontal")("ant-menu-submenu-inline", !ctx.isMenuInsideDropdown && ctx.mode === "inline")("ant-menu-submenu-active", !ctx.isMenuInsideDropdown && ctx.isActive)("ant-menu-submenu-rtl", ctx.dir() === "rtl");
    }
  },
  inputs: {
    nzMenuClassName: "nzMenuClassName",
    nzPaddingLeft: "nzPaddingLeft",
    nzTitle: "nzTitle",
    nzIcon: "nzIcon",
    nzTriggerSubMenuAction: "nzTriggerSubMenuAction",
    nzOpen: [2, "nzOpen", "nzOpen", booleanAttribute],
    nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
    nzPlacement: "nzPlacement"
  },
  outputs: {
    nzOpenChange: "nzOpenChange"
  },
  exportAs: ["nzSubmenu"],
  features: [\u0275\u0275ProvidersFeature([NzSubmenuService]), \u0275\u0275NgOnChangesFeature],
  attrs: _c5,
  ngContentSelectors: _c7,
  decls: 7,
  vars: 8,
  consts: [["origin", "cdkOverlayOrigin"], ["subMenuTemplate", ""], ["nz-submenu-title", "", "cdkOverlayOrigin", "", 3, "subMenuMouseState", "toggleSubMenu", "nzIcon", "nzTitle", "mode", "nzDisabled", "paddingLeft", "nzTriggerSubMenuAction"], ["nz-submenu-inline-child", "", "leavedClassName", "ant-menu-submenu-hidden", 3, "open", "menuClass"], ["cdkConnectedOverlay", "", "cdkConnectedOverlayTransformOriginOn", ".ant-menu-submenu", 3, "cdkConnectedOverlayPositions", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayWidth", "cdkConnectedOverlayOpen"], [3, "ngTemplateOutlet"], ["cdkConnectedOverlay", "", "cdkConnectedOverlayTransformOriginOn", ".ant-menu-submenu", 3, "positionChange", "overlayOutsideClick", "cdkConnectedOverlayPositions", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayWidth", "cdkConnectedOverlayOpen"], ["nz-submenu-none-inline-child", "", 3, "subMenuMouseState", "theme", "mode", "open", "position", "menuClass", "nzDisabled", "nzTriggerSubMenuAction", "nzNoAnimation"]],
  template: function NzSubMenuComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c6);
      \u0275\u0275elementStart(0, "div", 2, 0);
      \u0275\u0275listener("subMenuMouseState", function NzSubMenuComponent_Template_div_subMenuMouseState_0_listener($event) {
        return ctx.setMouseEnterState($event);
      })("toggleSubMenu", function NzSubMenuComponent_Template_div_toggleSubMenu_0_listener() {
        return ctx.toggleSubMenu();
      });
      \u0275\u0275conditionalCreate(2, NzSubMenuComponent_Conditional_2_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(3, NzSubMenuComponent_Conditional_3_Template, 2, 3, "div", 3)(4, NzSubMenuComponent_Conditional_4_Template, 1, 4, null, 4);
      \u0275\u0275template(5, NzSubMenuComponent_ng_template_5_Template, 1, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275property("nzIcon", ctx.nzIcon)("nzTitle", ctx.nzTitle)("mode", ctx.mode)("nzDisabled", ctx.nzDisabled)("paddingLeft", ctx.nzPaddingLeft || ctx.inlinePaddingLeft)("nzTriggerSubMenuAction", ctx.nzTriggerSubMenuAction);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.nzTitle ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.mode === "inline" ? 3 : 4);
    }
  },
  dependencies: [NgTemplateOutlet, NzSubMenuTitleComponent, NzSubmenuInlineChildComponent, NzNoAnimationDirective, NzSubmenuNoneInlineChildComponent, OverlayModule, CdkConnectedOverlay, CdkOverlayOrigin],
  encapsulation: 2,
  changeDetection: 0
}));
var NzSubMenuComponent = _NzSubMenuComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSubMenuComponent, [{
    type: Component,
    args: [{
      selector: "[nz-submenu]",
      exportAs: "nzSubmenu",
      providers: [NzSubmenuService],
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <div
      nz-submenu-title
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [nzIcon]="nzIcon"
      [nzTitle]="nzTitle"
      [mode]="mode"
      [nzDisabled]="nzDisabled"
      [paddingLeft]="nzPaddingLeft || inlinePaddingLeft"
      [nzTriggerSubMenuAction]="nzTriggerSubMenuAction"
      (subMenuMouseState)="setMouseEnterState($event)"
      (toggleSubMenu)="toggleSubMenu()"
    >
      @if (!nzTitle) {
        <ng-content select="[title]" />
      }
    </div>
    @if (mode === 'inline') {
      <div
        nz-submenu-inline-child
        [open]="nzOpen"
        [menuClass]="nzMenuClassName"
        leavedClassName="ant-menu-submenu-hidden"
      >
        <ng-template [ngTemplateOutlet]="subMenuTemplate" />
      </div>
    } @else {
      <ng-template
        cdkConnectedOverlay
        (positionChange)="onPositionChange($event)"
        [cdkConnectedOverlayPositions]="overlayPositions"
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayWidth]="triggerWidth!"
        [cdkConnectedOverlayOpen]="nzOpen"
        cdkConnectedOverlayTransformOriginOn=".ant-menu-submenu"
        (overlayOutsideClick)="setMouseEnterState(false)"
      >
        <div
          nz-submenu-none-inline-child
          [theme]="theme"
          [mode]="mode"
          [open]="nzOpen"
          [position]="position"
          [menuClass]="nzMenuClassName"
          [nzDisabled]="nzDisabled"
          [nzTriggerSubMenuAction]="nzTriggerSubMenuAction"
          [nzNoAnimation]="noAnimation?.nzNoAnimation?.()"
          (subMenuMouseState)="setMouseEnterState($event)"
        >
          <ng-template [ngTemplateOutlet]="subMenuTemplate" />
        </div>
      </ng-template>
    }

    <ng-template #subMenuTemplate>
      <ng-content />
    </ng-template>
  `,
      host: {
        "[class.ant-dropdown-menu-submenu]": `isMenuInsideDropdown`,
        "[class.ant-dropdown-menu-submenu-disabled]": `isMenuInsideDropdown && nzDisabled`,
        "[class.ant-dropdown-menu-submenu-open]": `isMenuInsideDropdown && nzOpen`,
        "[class.ant-dropdown-menu-submenu-selected]": `isMenuInsideDropdown && isSelected`,
        "[class.ant-dropdown-menu-submenu-vertical]": `isMenuInsideDropdown && mode === 'vertical'`,
        "[class.ant-dropdown-menu-submenu-horizontal]": `isMenuInsideDropdown && mode === 'horizontal'`,
        "[class.ant-dropdown-menu-submenu-inline]": `isMenuInsideDropdown && mode === 'inline'`,
        "[class.ant-dropdown-menu-submenu-active]": `isMenuInsideDropdown && isActive`,
        "[class.ant-menu-submenu]": `!isMenuInsideDropdown`,
        "[class.ant-menu-submenu-disabled]": `!isMenuInsideDropdown && nzDisabled`,
        "[class.ant-menu-submenu-open]": `!isMenuInsideDropdown && nzOpen`,
        "[class.ant-menu-submenu-selected]": `!isMenuInsideDropdown && isSelected`,
        "[class.ant-menu-submenu-vertical]": `!isMenuInsideDropdown && mode === 'vertical'`,
        "[class.ant-menu-submenu-horizontal]": `!isMenuInsideDropdown && mode === 'horizontal'`,
        "[class.ant-menu-submenu-inline]": `!isMenuInsideDropdown && mode === 'inline'`,
        "[class.ant-menu-submenu-active]": `!isMenuInsideDropdown && isActive`,
        "[class.ant-menu-submenu-rtl]": `dir() === 'rtl'`
      },
      imports: [NgTemplateOutlet, NzSubMenuTitleComponent, NzSubmenuInlineChildComponent, NzNoAnimationDirective, NzSubmenuNoneInlineChildComponent, OverlayModule]
    }]
  }], null, {
    nzMenuClassName: [{
      type: Input
    }],
    nzPaddingLeft: [{
      type: Input
    }],
    nzTitle: [{
      type: Input
    }],
    nzIcon: [{
      type: Input
    }],
    nzTriggerSubMenuAction: [{
      type: Input
    }],
    nzOpen: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzPlacement: [{
      type: Input
    }],
    nzOpenChange: [{
      type: Output
    }],
    cdkOverlayOrigin: [{
      type: ViewChild,
      args: [CdkOverlayOrigin, {
        static: true,
        read: ElementRef
      }]
    }],
    listOfNzSubMenuComponent: [{
      type: ContentChildren,
      args: [forwardRef(() => NzSubMenuComponent), {
        descendants: true
      }]
    }],
    listOfNzMenuItemDirective: [{
      type: ContentChildren,
      args: [NzMenuItemComponent, {
        descendants: true
      }]
    }]
  });
})();
function MenuServiceFactory() {
  const serviceInsideDropdown = inject(MenuService, {
    skipSelf: true,
    optional: true
  });
  const serviceOutsideDropdown = inject(NzMenuServiceLocalToken);
  return serviceInsideDropdown != null ? serviceInsideDropdown : serviceOutsideDropdown;
}
function MenuDropdownTokenFactory() {
  const isMenuInsideDropdownToken = inject(NzIsMenuInsideDropdownToken, {
    skipSelf: true,
    optional: true
  });
  return isMenuInsideDropdownToken != null ? isMenuInsideDropdownToken : false;
}
var _NzMenuDirective = class _NzMenuDirective {
  constructor() {
    __publicField(this, "nzMenuService", inject(MenuService));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "dir", inject(Directionality).valueSignal);
    __publicField(this, "isMenuInsideDropdown", inject(NzIsMenuInsideDropdownToken));
    __publicField(this, "listOfNzMenuItemDirective");
    __publicField(this, "listOfNzSubMenuComponent");
    __publicField(this, "nzInlineIndent", 24);
    __publicField(this, "nzTheme", "light");
    __publicField(this, "nzMode", "vertical");
    __publicField(this, "nzInlineCollapsed", false);
    __publicField(this, "nzSelectable", !this.isMenuInsideDropdown);
    __publicField(this, "nzClick", new EventEmitter());
    __publicField(this, "actualMode", "vertical");
    __publicField(this, "inlineCollapsed$", new BehaviorSubject(this.nzInlineCollapsed));
    __publicField(this, "mode$", new BehaviorSubject(this.nzMode));
    __publicField(this, "listOfOpenedNzSubMenuComponent", []);
  }
  setInlineCollapsed(inlineCollapsed) {
    this.nzInlineCollapsed = inlineCollapsed;
    this.inlineCollapsed$.next(inlineCollapsed);
  }
  updateInlineCollapse() {
    if (this.listOfNzMenuItemDirective) {
      if (this.nzInlineCollapsed) {
        this.listOfOpenedNzSubMenuComponent = this.listOfNzSubMenuComponent.filter((submenu) => submenu.nzOpen);
        this.listOfNzSubMenuComponent.forEach((submenu) => submenu.setOpenStateWithoutDebounce(false));
      } else {
        this.listOfOpenedNzSubMenuComponent.forEach((submenu) => submenu.setOpenStateWithoutDebounce(true));
        this.listOfOpenedNzSubMenuComponent = [];
      }
    }
  }
  ngOnInit() {
    combineLatest([this.inlineCollapsed$, this.mode$]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(([inlineCollapsed, mode]) => {
      this.actualMode = inlineCollapsed ? "vertical" : mode;
      this.nzMenuService.setMode(this.actualMode);
      this.cdr.markForCheck();
    });
    this.nzMenuService.descendantMenuItemClick$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((menu) => {
      this.nzClick.emit(menu);
      if (this.nzSelectable && !menu.nzMatchRouter) {
        this.listOfNzMenuItemDirective.forEach((item) => item.setSelectedState(item === menu));
      }
    });
  }
  ngAfterContentInit() {
    this.inlineCollapsed$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.updateInlineCollapse();
      this.cdr.markForCheck();
    });
  }
  ngOnChanges(changes) {
    const {
      nzInlineCollapsed,
      nzInlineIndent,
      nzTheme,
      nzMode
    } = changes;
    if (nzInlineCollapsed) {
      this.inlineCollapsed$.next(this.nzInlineCollapsed);
    }
    if (nzInlineIndent) {
      this.nzMenuService.setInlineIndent(this.nzInlineIndent);
    }
    if (nzTheme) {
      this.nzMenuService.setTheme(this.nzTheme);
    }
    if (nzMode) {
      this.mode$.next(this.nzMode);
      if (!nzMode.isFirstChange() && this.listOfNzSubMenuComponent) {
        this.listOfNzSubMenuComponent.forEach((submenu) => submenu.setOpenStateWithoutDebounce(false));
      }
    }
  }
};
__publicField(_NzMenuDirective, "\u0275fac", function NzMenuDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzMenuDirective)();
});
__publicField(_NzMenuDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzMenuDirective,
  selectors: [["", "nz-menu", ""]],
  contentQueries: function NzMenuDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzMenuItemComponent, 5)(dirIndex, NzSubMenuComponent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfNzMenuItemDirective = _t);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfNzSubMenuComponent = _t);
    }
  },
  hostVars: 34,
  hostBindings: function NzMenuDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-dropdown-menu", ctx.isMenuInsideDropdown)("ant-dropdown-menu-root", ctx.isMenuInsideDropdown)("ant-dropdown-menu-light", ctx.isMenuInsideDropdown && ctx.nzTheme === "light")("ant-dropdown-menu-dark", ctx.isMenuInsideDropdown && ctx.nzTheme === "dark")("ant-dropdown-menu-vertical", ctx.isMenuInsideDropdown && ctx.actualMode === "vertical")("ant-dropdown-menu-horizontal", ctx.isMenuInsideDropdown && ctx.actualMode === "horizontal")("ant-dropdown-menu-inline", ctx.isMenuInsideDropdown && ctx.actualMode === "inline")("ant-dropdown-menu-inline-collapsed", ctx.isMenuInsideDropdown && ctx.nzInlineCollapsed)("ant-menu", !ctx.isMenuInsideDropdown)("ant-menu-root", !ctx.isMenuInsideDropdown)("ant-menu-light", !ctx.isMenuInsideDropdown && ctx.nzTheme === "light")("ant-menu-dark", !ctx.isMenuInsideDropdown && ctx.nzTheme === "dark")("ant-menu-vertical", !ctx.isMenuInsideDropdown && ctx.actualMode === "vertical")("ant-menu-horizontal", !ctx.isMenuInsideDropdown && ctx.actualMode === "horizontal")("ant-menu-inline", !ctx.isMenuInsideDropdown && ctx.actualMode === "inline")("ant-menu-inline-collapsed", !ctx.isMenuInsideDropdown && ctx.nzInlineCollapsed)("ant-menu-rtl", ctx.dir() === "rtl");
    }
  },
  inputs: {
    nzInlineIndent: "nzInlineIndent",
    nzTheme: "nzTheme",
    nzMode: "nzMode",
    nzInlineCollapsed: [2, "nzInlineCollapsed", "nzInlineCollapsed", booleanAttribute],
    nzSelectable: [2, "nzSelectable", "nzSelectable", booleanAttribute]
  },
  outputs: {
    nzClick: "nzClick"
  },
  exportAs: ["nzMenu"],
  features: [\u0275\u0275ProvidersFeature([
    {
      provide: NzMenuServiceLocalToken,
      useClass: MenuService
    },
    /** use the top level service **/
    {
      provide: MenuService,
      useFactory: MenuServiceFactory
    },
    /** check if menu inside dropdown-menu component **/
    {
      provide: NzIsMenuInsideDropdownToken,
      useFactory: MenuDropdownTokenFactory
    }
  ]), \u0275\u0275NgOnChangesFeature]
}));
var NzMenuDirective = _NzMenuDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzMenuDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-menu]",
      exportAs: "nzMenu",
      providers: [
        {
          provide: NzMenuServiceLocalToken,
          useClass: MenuService
        },
        /** use the top level service **/
        {
          provide: MenuService,
          useFactory: MenuServiceFactory
        },
        /** check if menu inside dropdown-menu component **/
        {
          provide: NzIsMenuInsideDropdownToken,
          useFactory: MenuDropdownTokenFactory
        }
      ],
      host: {
        "[class.ant-dropdown-menu]": `isMenuInsideDropdown`,
        "[class.ant-dropdown-menu-root]": `isMenuInsideDropdown`,
        "[class.ant-dropdown-menu-light]": `isMenuInsideDropdown && nzTheme === 'light'`,
        "[class.ant-dropdown-menu-dark]": `isMenuInsideDropdown && nzTheme === 'dark'`,
        "[class.ant-dropdown-menu-vertical]": `isMenuInsideDropdown && actualMode === 'vertical'`,
        "[class.ant-dropdown-menu-horizontal]": `isMenuInsideDropdown && actualMode === 'horizontal'`,
        "[class.ant-dropdown-menu-inline]": `isMenuInsideDropdown && actualMode === 'inline'`,
        "[class.ant-dropdown-menu-inline-collapsed]": `isMenuInsideDropdown && nzInlineCollapsed`,
        "[class.ant-menu]": `!isMenuInsideDropdown`,
        "[class.ant-menu-root]": `!isMenuInsideDropdown`,
        "[class.ant-menu-light]": `!isMenuInsideDropdown && nzTheme === 'light'`,
        "[class.ant-menu-dark]": `!isMenuInsideDropdown && nzTheme === 'dark'`,
        "[class.ant-menu-vertical]": `!isMenuInsideDropdown && actualMode === 'vertical'`,
        "[class.ant-menu-horizontal]": `!isMenuInsideDropdown && actualMode === 'horizontal'`,
        "[class.ant-menu-inline]": `!isMenuInsideDropdown && actualMode === 'inline'`,
        "[class.ant-menu-inline-collapsed]": `!isMenuInsideDropdown && nzInlineCollapsed`,
        "[class.ant-menu-rtl]": `dir() === 'rtl'`
      }
    }]
  }], null, {
    listOfNzMenuItemDirective: [{
      type: ContentChildren,
      args: [NzMenuItemComponent, {
        descendants: true
      }]
    }],
    listOfNzSubMenuComponent: [{
      type: ContentChildren,
      args: [NzSubMenuComponent, {
        descendants: true
      }]
    }],
    nzInlineIndent: [{
      type: Input
    }],
    nzTheme: [{
      type: Input
    }],
    nzMode: [{
      type: Input
    }],
    nzInlineCollapsed: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSelectable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzClick: [{
      type: Output
    }]
  });
})();
function MenuGroupFactory() {
  const isMenuInsideDropdownToken = inject(NzIsMenuInsideDropdownToken, {
    optional: true,
    skipSelf: true
  });
  return isMenuInsideDropdownToken != null ? isMenuInsideDropdownToken : false;
}
var _NzMenuGroupComponent = class _NzMenuGroupComponent {
  constructor() {
    __publicField(this, "renderer", inject(Renderer2));
    __publicField(this, "isMenuInsideDropdown", inject(NzIsMenuInsideDropdownToken));
    __publicField(this, "nzTitle");
    __publicField(this, "titleElement");
  }
  ngAfterViewInit() {
    const ulElement = this.titleElement.nativeElement.nextElementSibling;
    if (ulElement) {
      const className = this.isMenuInsideDropdown ? "ant-dropdown-menu-item-group-list" : "ant-menu-item-group-list";
      this.renderer.addClass(ulElement, className);
    }
  }
};
__publicField(_NzMenuGroupComponent, "\u0275fac", function NzMenuGroupComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzMenuGroupComponent)();
});
__publicField(_NzMenuGroupComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzMenuGroupComponent,
  selectors: [["", "nz-menu-group", ""]],
  viewQuery: function NzMenuGroupComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c8, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.titleElement = _t.first);
    }
  },
  hostVars: 4,
  hostBindings: function NzMenuGroupComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-menu-item-group", !ctx.isMenuInsideDropdown)("ant-dropdown-menu-item-group", ctx.isMenuInsideDropdown);
    }
  },
  inputs: {
    nzTitle: "nzTitle"
  },
  exportAs: ["nzMenuGroup"],
  features: [\u0275\u0275ProvidersFeature([
    /** check if menu inside dropdown-menu component **/
    {
      provide: NzIsMenuInsideDropdownToken,
      useFactory: MenuGroupFactory
    }
  ])],
  attrs: _c9,
  ngContentSelectors: _c11,
  decls: 5,
  vars: 6,
  consts: [["titleElement", ""], [4, "nzStringTemplateOutlet"]],
  template: function NzMenuGroupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c10);
      \u0275\u0275elementStart(0, "div", null, 0);
      \u0275\u0275template(2, NzMenuGroupComponent_ng_container_2_Template, 2, 1, "ng-container", 1);
      \u0275\u0275conditionalCreate(3, NzMenuGroupComponent_Conditional_3_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275projection(4);
    }
    if (rf & 2) {
      \u0275\u0275classProp("ant-menu-item-group-title", !ctx.isMenuInsideDropdown)("ant-dropdown-menu-item-group-title", ctx.isMenuInsideDropdown);
      \u0275\u0275advance(2);
      \u0275\u0275property("nzStringTemplateOutlet", ctx.nzTitle);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.nzTitle ? 3 : -1);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzMenuGroupComponent = _NzMenuGroupComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzMenuGroupComponent, [{
    type: Component,
    args: [{
      selector: "[nz-menu-group]",
      exportAs: "nzMenuGroup",
      providers: [
        /** check if menu inside dropdown-menu component **/
        {
          provide: NzIsMenuInsideDropdownToken,
          useFactory: MenuGroupFactory
        }
      ],
      template: `
    <div
      [class.ant-menu-item-group-title]="!isMenuInsideDropdown"
      [class.ant-dropdown-menu-item-group-title]="isMenuInsideDropdown"
      #titleElement
    >
      <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      @if (!nzTitle) {
        <ng-content select="[title]" />
      }
    </div>
    <ng-content />
  `,
      imports: [NzOutletModule],
      host: {
        "[class.ant-menu-item-group]": "!isMenuInsideDropdown",
        "[class.ant-dropdown-menu-item-group]": "isMenuInsideDropdown"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], null, {
    nzTitle: [{
      type: Input
    }],
    titleElement: [{
      type: ViewChild,
      args: ["titleElement"]
    }]
  });
})();
var _NzMenuDividerDirective = class _NzMenuDividerDirective {
};
__publicField(_NzMenuDividerDirective, "\u0275fac", function NzMenuDividerDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzMenuDividerDirective)();
});
__publicField(_NzMenuDividerDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzMenuDividerDirective,
  selectors: [["", "nz-menu-divider", ""]],
  hostAttrs: [1, "ant-dropdown-menu-item-divider"],
  exportAs: ["nzMenuDivider"]
}));
var NzMenuDividerDirective = _NzMenuDividerDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzMenuDividerDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-menu-divider]",
      exportAs: "nzMenuDivider",
      host: {
        class: "ant-dropdown-menu-item-divider"
      }
    }]
  }], null, null);
})();
var _NzMenuModule = class _NzMenuModule {
};
__publicField(_NzMenuModule, "\u0275fac", function NzMenuModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzMenuModule)();
});
__publicField(_NzMenuModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzMenuModule,
  imports: [NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent, NzMenuDividerDirective, NzMenuGroupComponent, NzSubMenuTitleComponent, NzSubmenuInlineChildComponent, NzSubmenuNoneInlineChildComponent],
  exports: [NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent, NzMenuDividerDirective, NzMenuGroupComponent]
}));
__publicField(_NzMenuModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzSubMenuComponent, NzMenuGroupComponent, NzSubMenuTitleComponent]
}));
var NzMenuModule = _NzMenuModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzMenuModule, [{
    type: NgModule,
    args: [{
      imports: [NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent, NzMenuDividerDirective, NzMenuGroupComponent, NzSubMenuTitleComponent, NzSubmenuInlineChildComponent, NzSubmenuNoneInlineChildComponent],
      exports: [NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent, NzMenuDividerDirective, NzMenuGroupComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-dropdown.mjs
var _c03 = ["*"];
function NzDropdownMenuComponent_ng_template_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 1);
  }
}
function NzDropdownMenuComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275animateLeave(function NzDropdownMenuComponent_ng_template_0_Template_animateleave_cb() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dropdownAnimationLeave());
    });
    \u0275\u0275animateEnter(function NzDropdownMenuComponent_ng_template_0_Template_animateenter_cb() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.dropdownAnimationEnter());
    });
    \u0275\u0275animateLeaveListener(function NzDropdownMenuComponent_ng_template_0_Template_div_animateleave_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAnimationEvent($event));
    });
    \u0275\u0275listener("mouseenter", function NzDropdownMenuComponent_ng_template_0_Template_div_mouseenter_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setMouseState(true));
    })("mouseleave", function NzDropdownMenuComponent_ng_template_0_Template_div_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setMouseState(false));
    });
    \u0275\u0275conditionalCreate(1, NzDropdownMenuComponent_ng_template_0_Conditional_1_Template, 1, 0, "div", 1);
    \u0275\u0275projection(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r1.nzOverlayStyle);
    \u0275\u0275classMap(ctx_r1.nzOverlayClassName);
    \u0275\u0275classProp("ant-dropdown-rtl", ctx_r1.dir === "rtl")("ant-dropdown-show-arrow", ctx_r1.nzArrow)("ant-dropdown-placement-bottomLeft", ctx_r1.placement === "bottomLeft")("ant-dropdown-placement-bottomRight", ctx_r1.placement === "bottomRight")("ant-dropdown-placement-bottom", ctx_r1.placement === "bottom")("ant-dropdown-placement-topLeft", ctx_r1.placement === "topLeft")("ant-dropdown-placement-topRight", ctx_r1.placement === "topRight")("ant-dropdown-placement-top", ctx_r1.placement === "top");
    \u0275\u0275property("nzNoAnimation", !!(ctx_r1.noAnimation == null ? null : ctx_r1.noAnimation.nzNoAnimation == null ? null : ctx_r1.noAnimation.nzNoAnimation()));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.nzArrow ? 1 : -1);
  }
}
var NZ_CONFIG_MODULE_NAME = "dropdown";
var listOfPositions = ["bottomLeft", "bottomRight", "topRight", "topLeft"];
var normalizePlacementForClass = (p) => {
  if (p === "topCenter") {
    return "top";
  }
  if (p === "bottomCenter") {
    return "bottom";
  }
  return p;
};
var NzDropdownDirective = (() => {
  var _a;
  let _nzBackdrop_decorators;
  let _nzBackdrop_initializers = [];
  let _nzBackdrop_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "nzConfigService", inject(NzConfigService));
      __publicField(this, "renderer", inject(Renderer2));
      __publicField(this, "viewContainerRef", inject(ViewContainerRef));
      __publicField(this, "platform", inject(Platform));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME);
      __publicField(this, "elementRef", inject(ElementRef));
      __publicField(this, "injector", inject(Injector));
      __publicField(this, "portal");
      __publicField(this, "overlayRef", null);
      __publicField(this, "inputVisible$", new BehaviorSubject(false));
      __publicField(this, "nzTrigger$", new BehaviorSubject("hover"));
      __publicField(this, "overlayClose$", new Subject());
      __publicField(this, "nzDropdownMenu", null);
      __publicField(this, "nzTrigger", "hover");
      __publicField(this, "nzMatchWidthElement", null);
      __publicField(this, "nzBackdrop", __runInitializers(this, _nzBackdrop_initializers, false));
      __publicField(this, "nzClickHide", (__runInitializers(this, _nzBackdrop_extraInitializers), true));
      __publicField(this, "nzDisabled", false);
      __publicField(this, "nzVisible", false);
      __publicField(this, "nzArrow", false);
      __publicField(this, "nzOverlayClassName", "");
      __publicField(this, "nzOverlayStyle", {});
      __publicField(this, "nzPlacement", "bottomLeft");
      __publicField(this, "nzVisibleChange", new EventEmitter());
      this.destroyRef.onDestroy(() => {
        var _a2;
        (_a2 = this.overlayRef) == null ? void 0 : _a2.dispose();
        this.overlayRef = null;
      });
    }
    setDropdownMenuValue(key, value) {
      var _a2;
      (_a2 = this.nzDropdownMenu) == null ? void 0 : _a2.setValue(key, value);
    }
    ngAfterViewInit() {
      if (this.nzDropdownMenu) {
        const nativeElement = this.elementRef.nativeElement;
        const hostMouseState$ = merge(fromEvent(nativeElement, "mouseenter").pipe(map(() => true)), fromEvent(nativeElement, "mouseleave").pipe(map(() => false)));
        const menuMouseState$ = this.nzDropdownMenu.mouseState$;
        const mergedMouseState$ = merge(menuMouseState$, hostMouseState$);
        const hostClickState$ = fromEvent(nativeElement, "click").pipe(map(() => !this.nzVisible));
        const visibleStateByTrigger$ = this.nzTrigger$.pipe(switchMap((trigger) => {
          if (trigger === "hover") {
            return mergedMouseState$;
          } else if (trigger === "click") {
            return hostClickState$;
          } else {
            return EMPTY;
          }
        }));
        const descendantMenuItemClick$ = this.nzDropdownMenu.descendantMenuItemClick$.pipe(filter(() => this.nzClickHide), map(() => false));
        const domTriggerVisible$ = merge(visibleStateByTrigger$, descendantMenuItemClick$, this.overlayClose$).pipe(filter(() => !this.nzDisabled));
        const visible$ = merge(this.inputVisible$, domTriggerVisible$);
        combineLatest([visible$, this.nzDropdownMenu.isChildSubMenuOpen$]).pipe(map(([visible, sub]) => visible || sub), auditTime(150), distinctUntilChanged(), filter(() => this.platform.isBrowser), takeUntilDestroyed(this.destroyRef)).subscribe((visible) => {
          var _a2;
          const element = this.nzMatchWidthElement ? this.nzMatchWidthElement.nativeElement : nativeElement;
          const triggerWidth = element.getBoundingClientRect().width;
          if (this.nzVisible !== visible) {
            this.nzVisibleChange.emit(visible);
          }
          this.nzVisible = visible;
          if (visible) {
            const positionStrategy = createFlexibleConnectedPositionStrategy(this.injector, this.elementRef.nativeElement).withLockedPosition().withTransformOriginOn(".ant-dropdown");
            positionStrategy.positionChanges.pipe(filter(() => Boolean(this.overlayRef)), map((change) => getPlacementName(change)), takeUntilDestroyed(this.destroyRef)).subscribe((placement) => {
              if (placement) {
                this.setDropdownMenuValue("placement", normalizePlacementForClass(placement));
              }
            });
            if (!this.overlayRef) {
              this.overlayRef = createOverlayRef(this.injector, {
                positionStrategy,
                minWidth: triggerWidth,
                disposeOnNavigation: true,
                hasBackdrop: this.nzBackdrop && this.nzTrigger === "click",
                scrollStrategy: createRepositionScrollStrategy(this.injector)
              });
              merge(this.overlayRef.backdropClick(), this.overlayRef.detachments(), this.overlayRef.outsidePointerEvents().pipe(filter((e) => !this.elementRef.nativeElement.contains(e.target))), this.overlayRef.keydownEvents().pipe(filter((e) => e.keyCode === ESCAPE && !hasModifierKey(e)))).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
                this.overlayClose$.next(false);
              });
            } else {
              const overlayConfig = this.overlayRef.getConfig();
              overlayConfig.minWidth = triggerWidth;
            }
            const positions = [this.nzPlacement, ...listOfPositions].map((position) => {
              return this.nzArrow ? setConnectedPositionOffset(POSITION_MAP[position], TOOLTIP_OFFSET_MAP[position]) : POSITION_MAP[position];
            });
            positionStrategy.withPositions(positions);
            if (!this.portal || this.portal.templateRef !== this.nzDropdownMenu.templateRef) {
              this.portal = new TemplatePortal(this.nzDropdownMenu.templateRef, this.viewContainerRef);
            }
            this.setDropdownMenuValue("nzArrow", this.nzArrow);
            this.setDropdownMenuValue("placement", normalizePlacementForClass(this.nzPlacement));
            this.overlayRef.attach(this.portal);
          } else {
            (_a2 = this.overlayRef) == null ? void 0 : _a2.detach();
          }
        });
        this.nzDropdownMenu.animationStateChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
          var _a2;
          (_a2 = this.overlayRef) == null ? void 0 : _a2.dispose();
          this.overlayRef = null;
          event.animationComplete();
        });
      }
    }
    ngOnChanges(changes) {
      const {
        nzVisible,
        nzDisabled,
        nzOverlayClassName,
        nzOverlayStyle,
        nzTrigger,
        nzArrow,
        nzPlacement
      } = changes;
      if (nzTrigger) {
        this.nzTrigger$.next(this.nzTrigger);
      }
      if (nzVisible) {
        this.inputVisible$.next(this.nzVisible);
      }
      if (nzDisabled) {
        const nativeElement = this.elementRef.nativeElement;
        if (this.nzDisabled) {
          this.renderer.setAttribute(nativeElement, "disabled", "");
          this.inputVisible$.next(false);
        } else {
          this.renderer.removeAttribute(nativeElement, "disabled");
        }
      }
      if (nzOverlayClassName) {
        this.setDropdownMenuValue("nzOverlayClassName", this.nzOverlayClassName);
      }
      if (nzOverlayStyle) {
        this.setDropdownMenuValue("nzOverlayStyle", this.nzOverlayStyle);
      }
      if (nzArrow) {
        this.setDropdownMenuValue("nzArrow", this.nzArrow);
      }
      if (nzPlacement) {
        this.setDropdownMenuValue("placement", normalizePlacementForClass(this.nzPlacement));
      }
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzBackdrop_decorators = [WithConfig()];
    __esDecorate(null, null, _nzBackdrop_decorators, {
      kind: "field",
      name: "nzBackdrop",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzBackdrop" in obj,
        get: (obj) => obj.nzBackdrop,
        set: (obj, value) => {
          obj.nzBackdrop = value;
        }
      },
      metadata: _metadata
    }, _nzBackdrop_initializers, _nzBackdrop_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzDropdownDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _a,
    selectors: [["", "nz-dropdown", ""]],
    hostAttrs: [1, "ant-dropdown-trigger"],
    inputs: {
      nzDropdownMenu: "nzDropdownMenu",
      nzTrigger: "nzTrigger",
      nzMatchWidthElement: "nzMatchWidthElement",
      nzBackdrop: [2, "nzBackdrop", "nzBackdrop", booleanAttribute],
      nzClickHide: [2, "nzClickHide", "nzClickHide", booleanAttribute],
      nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
      nzVisible: [2, "nzVisible", "nzVisible", booleanAttribute],
      nzArrow: [2, "nzArrow", "nzArrow", booleanAttribute],
      nzOverlayClassName: "nzOverlayClassName",
      nzOverlayStyle: "nzOverlayStyle",
      nzPlacement: "nzPlacement"
    },
    outputs: {
      nzVisibleChange: "nzVisibleChange"
    },
    exportAs: ["nzDropdown"],
    features: [\u0275\u0275NgOnChangesFeature]
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDropdownDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-dropdown]",
      exportAs: "nzDropdown",
      host: {
        class: "ant-dropdown-trigger"
      }
    }]
  }], () => [], {
    nzDropdownMenu: [{
      type: Input
    }],
    nzTrigger: [{
      type: Input
    }],
    nzMatchWidthElement: [{
      type: Input
    }],
    nzBackdrop: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzClickHide: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzVisible: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzArrow: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOverlayClassName: [{
      type: Input
    }],
    nzOverlayStyle: [{
      type: Input
    }],
    nzPlacement: [{
      type: Input
    }],
    nzVisibleChange: [{
      type: Output
    }]
  });
})();
var _NzContextMenuServiceModule = class _NzContextMenuServiceModule {
};
__publicField(_NzContextMenuServiceModule, "\u0275fac", function NzContextMenuServiceModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzContextMenuServiceModule)();
});
__publicField(_NzContextMenuServiceModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzContextMenuServiceModule
}));
__publicField(_NzContextMenuServiceModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({}));
var NzContextMenuServiceModule = _NzContextMenuServiceModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzContextMenuServiceModule, [{
    type: NgModule
  }], null, null);
})();
var _NzDropdownADirective = class _NzDropdownADirective {
};
__publicField(_NzDropdownADirective, "\u0275fac", function NzDropdownADirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzDropdownADirective)();
});
__publicField(_NzDropdownADirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzDropdownADirective,
  selectors: [["a", "nz-dropdown", ""]],
  hostAttrs: [1, "ant-dropdown-link"]
}));
var NzDropdownADirective = _NzDropdownADirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDropdownADirective, [{
    type: Directive,
    args: [{
      selector: "a[nz-dropdown]",
      host: {
        class: "ant-dropdown-link"
      }
    }]
  }], null, null);
})();
var _NzDropdownMenuComponent = class _NzDropdownMenuComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "renderer", inject(Renderer2));
    __publicField(this, "viewContainerRef", inject(ViewContainerRef));
    __publicField(this, "directionality", inject(Directionality));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "noAnimation", inject(NzNoAnimationDirective, {
      host: true,
      optional: true
    }));
    __publicField(this, "nzMenuService", inject(MenuService));
    __publicField(this, "isChildSubMenuOpen$", this.nzMenuService.isChildSubMenuOpen$);
    __publicField(this, "descendantMenuItemClick$", this.nzMenuService.descendantMenuItemClick$);
    __publicField(this, "mouseState$", new BehaviorSubject(false));
    __publicField(this, "animationStateChange$", new EventEmitter());
    __publicField(this, "templateRef");
    __publicField(this, "nzOverlayClassName", "");
    __publicField(this, "nzOverlayStyle", {});
    __publicField(this, "nzArrow", false);
    __publicField(this, "placement", "bottomLeft");
    __publicField(this, "dir", "ltr");
    __publicField(this, "dropdownAnimationEnter", slideAnimationEnter());
    __publicField(this, "dropdownAnimationLeave", slideAnimationLeave());
  }
  onAnimationEvent(event) {
    const element = event.target;
    const onAnimationEnd = () => {
      element.removeEventListener("animationend", onAnimationEnd);
      this.animationStateChange$.emit(event);
    };
    element.addEventListener("animationend", onAnimationEnd);
  }
  setMouseState(visible) {
    this.mouseState$.next(visible);
  }
  setValue(key, value) {
    this[key] = value;
    this.cdr.markForCheck();
  }
  ngOnInit() {
    var _a;
    (_a = this.directionality.change) == null ? void 0 : _a.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
  }
  ngAfterContentInit() {
    this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
  }
};
__publicField(_NzDropdownMenuComponent, "\u0275fac", function NzDropdownMenuComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzDropdownMenuComponent)();
});
__publicField(_NzDropdownMenuComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzDropdownMenuComponent,
  selectors: [["nz-dropdown-menu"]],
  viewQuery: function NzDropdownMenuComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(TemplateRef, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templateRef = _t.first);
    }
  },
  exportAs: ["nzDropdownMenu"],
  features: [\u0275\u0275ProvidersFeature([
    MenuService,
    /** menu is inside dropdown-menu component **/
    {
      provide: NzIsMenuInsideDropdownToken,
      useValue: true
    }
  ])],
  ngContentSelectors: _c03,
  decls: 1,
  vars: 0,
  consts: [[1, "ant-dropdown", 3, "mouseenter", "mouseleave", "nzNoAnimation"], [1, "ant-dropdown-arrow"]],
  template: function NzDropdownMenuComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275template(0, NzDropdownMenuComponent_ng_template_0_Template, 3, 22, "ng-template");
    }
  },
  dependencies: [NzNoAnimationDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzDropdownMenuComponent = _NzDropdownMenuComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDropdownMenuComponent, [{
    type: Component,
    args: [{
      selector: `nz-dropdown-menu`,
      exportAs: `nzDropdownMenu`,
      providers: [
        MenuService,
        /** menu is inside dropdown-menu component **/
        {
          provide: NzIsMenuInsideDropdownToken,
          useValue: true
        }
      ],
      template: `
    <ng-template>
      <div
        class="ant-dropdown"
        [class.ant-dropdown-rtl]="dir === 'rtl'"
        [class.ant-dropdown-show-arrow]="nzArrow"
        [class.ant-dropdown-placement-bottomLeft]="placement === 'bottomLeft'"
        [class.ant-dropdown-placement-bottomRight]="placement === 'bottomRight'"
        [class.ant-dropdown-placement-bottom]="placement === 'bottom'"
        [class.ant-dropdown-placement-topLeft]="placement === 'topLeft'"
        [class.ant-dropdown-placement-topRight]="placement === 'topRight'"
        [class.ant-dropdown-placement-top]="placement === 'top'"
        [class]="nzOverlayClassName"
        [style]="nzOverlayStyle"
        [animate.enter]="dropdownAnimationEnter()"
        [animate.leave]="dropdownAnimationLeave()"
        (animate.leave)="onAnimationEvent($event)"
        [nzNoAnimation]="!!noAnimation?.nzNoAnimation?.()"
        (mouseenter)="setMouseState(true)"
        (mouseleave)="setMouseState(false)"
      >
        @if (nzArrow) {
          <div class="ant-dropdown-arrow"></div>
        }
        <ng-content />
      </div>
    </ng-template>
  `,
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NzNoAnimationDirective]
    }]
  }], null, {
    templateRef: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }]
  });
})();
var _NzDropdownModule = class _NzDropdownModule {
};
__publicField(_NzDropdownModule, "\u0275fac", function NzDropdownModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzDropdownModule)();
});
__publicField(_NzDropdownModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzDropdownModule,
  imports: [NzDropdownDirective, NzDropdownADirective, NzDropdownMenuComponent, NzContextMenuServiceModule],
  exports: [NzMenuModule, NzDropdownDirective, NzDropdownADirective, NzDropdownMenuComponent]
}));
__publicField(_NzDropdownModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzContextMenuServiceModule, NzMenuModule]
}));
var NzDropdownModule = _NzDropdownModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDropdownModule, [{
    type: NgModule,
    args: [{
      imports: [NzDropdownDirective, NzDropdownADirective, NzDropdownMenuComponent, NzContextMenuServiceModule],
      exports: [NzMenuModule, NzDropdownDirective, NzDropdownADirective, NzDropdownMenuComponent]
    }]
  }], null, null);
})();
var NzDropDownModule = NzDropdownModule;
var LIST_OF_POSITIONS = [new ConnectionPositionPair({
  originX: "start",
  originY: "top"
}, {
  overlayX: "start",
  overlayY: "top"
}), new ConnectionPositionPair({
  originX: "start",
  originY: "top"
}, {
  overlayX: "start",
  overlayY: "bottom"
}), new ConnectionPositionPair({
  originX: "start",
  originY: "top"
}, {
  overlayX: "end",
  overlayY: "bottom"
}), new ConnectionPositionPair({
  originX: "start",
  originY: "top"
}, {
  overlayX: "end",
  overlayY: "top"
})];
var _NzContextMenuService = class _NzContextMenuService {
  constructor() {
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "injector", inject(Injector));
    __publicField(this, "overlayRef", null);
    __publicField(this, "closeSubscription", Subscription.EMPTY);
  }
  create($event, nzDropdownMenuComponent) {
    this.close(true);
    const {
      x,
      y
    } = $event;
    if ($event instanceof MouseEvent) {
      $event.preventDefault();
    }
    this.overlayRef = createOverlayRef(this.injector, {
      positionStrategy: createFlexibleConnectedPositionStrategy(this.injector, {
        x,
        y
      }).withPositions(LIST_OF_POSITIONS).withTransformOriginOn(".ant-dropdown"),
      disposeOnNavigation: true,
      scrollStrategy: createCloseScrollStrategy(this.injector)
    });
    this.closeSubscription = new Subscription();
    this.closeSubscription.add(nzDropdownMenuComponent.descendantMenuItemClick$.subscribe(() => this.close()));
    this.closeSubscription.add(merge(fromEventOutsideAngular(document, "click").pipe(
      filter((event) => !!this.overlayRef && !this.overlayRef.overlayElement.contains(event.target)),
      /** handle firefox contextmenu event **/
      filter((event) => event.button !== 2)
    ), fromEventOutsideAngular(document, "keydown").pipe(filter((event) => event.key === "Escape"))).pipe(first()).subscribe(() => this.ngZone.run(() => this.close())));
    return this.overlayRef.attach(new TemplatePortal(nzDropdownMenuComponent.templateRef, nzDropdownMenuComponent.viewContainerRef));
  }
  close(clear = false) {
    if (this.overlayRef) {
      this.overlayRef.detach();
      if (clear) {
        this.overlayRef.dispose();
      }
      this.overlayRef = null;
      this.closeSubscription.unsubscribe();
    }
  }
};
__publicField(_NzContextMenuService, "\u0275fac", function NzContextMenuService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzContextMenuService)();
});
__publicField(_NzContextMenuService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _NzContextMenuService,
  factory: _NzContextMenuService.\u0275fac,
  providedIn: NzContextMenuServiceModule
}));
var NzContextMenuService = _NzContextMenuService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzContextMenuService, [{
    type: Injectable,
    args: [{
      providedIn: NzContextMenuServiceModule
    }]
  }], null, null);
})();

export {
  NzMenuItemComponent,
  NzSubMenuComponent,
  NzMenuDirective,
  NzMenuDividerDirective,
  NzMenuModule,
  NzDropdownDirective,
  NzDropdownADirective,
  NzDropdownMenuComponent,
  NzDropdownModule,
  NzDropDownModule,
  NzContextMenuService,
  NzCheckboxComponent,
  NzCheckboxGroupComponent,
  NzCheckboxModule,
  NzDividerComponent,
  NzDividerModule
};
//# sourceMappingURL=chunk-YA5VTMF5.js.map
