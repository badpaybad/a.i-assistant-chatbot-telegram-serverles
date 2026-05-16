import {
  AsyncPipe,
  BACKSPACE,
  COMPOSITION_BUFFER_MODE,
  CandyDate,
  CdkConnectedOverlay,
  CdkFixedSizeVirtualScroll,
  CdkOverlayOrigin,
  CdkPortalOutlet,
  CdkScrollable,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  CheckboxControlValueAccessor,
  ComponentPortal,
  ConnectionPositionPair,
  DATE_PICKER_POSITION_MAP,
  DEFAULT_DATE_PICKER_POSITIONS,
  DOWN_ARROW,
  DateHelperService,
  DecimalPipe,
  DefaultValueAccessor,
  Directionality,
  ENTER,
  ESCAPE,
  FocusMonitor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NZ_FORM_SIZE,
  NZ_FORM_VARIANT,
  NZ_SPACE_COMPACT_ITEM_TYPE,
  NZ_SPACE_COMPACT_SIZE,
  NavigationEnd,
  NgControlStatus,
  NgModel,
  NgTemplateOutlet,
  NzAnimationCollapseDirective,
  NzBreakpointEnum,
  NzBreakpointService,
  NzButtonComponent,
  NzButtonModule,
  NzConfigService,
  NzConnectedOverlayDirective,
  NzFormItemFeedbackIconComponent,
  NzFormNoStatusService,
  NzFormStatusService,
  NzI18nModule,
  NzI18nPipe,
  NzI18nService,
  NzIconDirective,
  NzIconModule,
  NzNoAnimationDirective,
  NzOutletModule,
  NzOverlayModule,
  NzResizeObserver,
  NzResizeService,
  NzSpaceCompactItemDirective,
  NzStringTemplateOutletDirective,
  NzTransitionPatchDirective,
  NzWaveDirective,
  OverlayModule,
  POSITION_MAP,
  Platform,
  PortalModule,
  Router,
  RouterLink,
  SLIDE_ANIMATION_CLASS,
  SPACE,
  ScrollingModule,
  TAB,
  TOOLTIP_OFFSET_MAP,
  TemplatePortal,
  UP_ARROW,
  WithConfig,
  _getEventTarget,
  arraysEqual,
  cancelAnimationFrame,
  cloneDate,
  createCloseScrollStrategy,
  createFlexibleConnectedPositionStrategy,
  createOverlayRef,
  createRepositionScrollStrategy,
  fromEventOutsideAngular,
  generateClassName,
  getClassListFromValue,
  getPlacementName,
  getStatusClassNames,
  gridResponsiveMap,
  hasModifierKey,
  isNil,
  isNotNil,
  isPlatformBrowser,
  isPresetColor,
  isStatusColor,
  isValid,
  measureScrollbar,
  normalizeRangeValue,
  numberAttributeWithInfinityFallback,
  numberAttributeWithZeroFallback,
  onConfigChangeEventForComponent,
  presetColors,
  requestAnimationFrame,
  setConnectedPositionOffset,
  slideAnimationEnter,
  slideAnimationLeave,
  startOfQuarter,
  statusColors,
  takeUntilDestroyed,
  toBoolean,
  toNumber,
  toSignal,
  valueFunctionProp,
  warn,
  withAnimationCheck,
  wrongSortOrder
} from "./chunk-KYB65WBY.js";
import {
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DOCUMENT,
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
  Observable,
  Output,
  PLATFORM_ID,
  Renderer2,
  ReplaySubject,
  Subject,
  Subscription,
  TemplateRef,
  Type,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  afterNextRender,
  auditTime,
  booleanAttribute,
  combineLatest,
  computed,
  debounceTime,
  delay,
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
  numberAttribute,
  of,
  output,
  setClassMetadata,
  signal,
  skip,
  startWith,
  switchMap,
  untracked,
  withLatestFrom,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵanimateEnter,
  ɵɵanimateLeave,
  ɵɵanimateLeaveListener,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcomponentInstance,
  ɵɵconditional,
  ɵɵconditionalBranchCreate,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵinterpolate,
  ɵɵinterpolate1,
  ɵɵinterpolate2,
  ɵɵinterpolate4,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-ZYJZNBYG.js";
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

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-radio.mjs
var _c02 = ["*"];
var _c12 = ["inputElement"];
var _c22 = ["nz-radio", ""];
var _NzRadioService = class _NzRadioService {
  constructor() {
    __publicField(this, "selected$", new ReplaySubject(1));
    __publicField(this, "touched$", new Subject());
    __publicField(this, "disabled$", new ReplaySubject(1));
    __publicField(this, "name$", new ReplaySubject(1));
  }
  touch() {
    this.touched$.next();
  }
  select(value) {
    this.selected$.next(value);
  }
  setDisabled(value) {
    this.disabled$.next(value);
  }
  setName(value) {
    this.name$.next(value);
  }
};
__publicField(_NzRadioService, "\u0275fac", function NzRadioService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzRadioService)();
});
__publicField(_NzRadioService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _NzRadioService,
  factory: _NzRadioService.\u0275fac
}));
var NzRadioService = _NzRadioService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRadioService, [{
    type: Injectable
  }], null, null);
})();
var _NzRadioGroupComponent = class _NzRadioGroupComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "nzRadioService", inject(NzRadioService));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "nzFormSize", inject(NZ_FORM_SIZE, {
      optional: true
    }));
    __publicField(this, "value", null);
    __publicField(this, "isNzDisableFirstChange", true);
    __publicField(this, "onChange", () => {
    });
    __publicField(this, "onTouched", () => {
    });
    __publicField(this, "nzDisabled", false);
    __publicField(this, "nzButtonStyle", "outline");
    __publicField(this, "nzSize", "default");
    __publicField(this, "nzName", null);
    __publicField(this, "dir", inject(Directionality).valueSignal);
    __publicField(this, "size", signal(this.nzSize, ...ngDevMode ? [{
      debugName: "size"
    }] : []));
    __publicField(this, "finalSize", computed(() => {
      var _a;
      return ((_a = this.nzFormSize) == null ? void 0 : _a.call(this)) || this.size();
    }, ...ngDevMode ? [{
      debugName: "finalSize"
    }] : []));
  }
  ngOnInit() {
    this.nzRadioService.selected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      if (this.value !== value) {
        this.value = value;
        this.onChange(this.value);
      }
    });
    this.nzRadioService.touched$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      Promise.resolve().then(() => this.onTouched());
    });
  }
  ngOnChanges(changes) {
    const {
      nzDisabled,
      nzName,
      nzSize
    } = changes;
    if (nzDisabled) {
      this.nzRadioService.setDisabled(this.nzDisabled);
    }
    if (nzName) {
      this.nzRadioService.setName(this.nzName);
    }
    if (nzSize) {
      this.size.set(this.nzSize);
    }
  }
  writeValue(value) {
    this.value = value;
    this.nzRadioService.select(value);
    this.cdr.markForCheck();
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.nzDisabled = this.isNzDisableFirstChange && this.nzDisabled || isDisabled;
    this.isNzDisableFirstChange = false;
    this.nzRadioService.setDisabled(this.nzDisabled);
    this.cdr.markForCheck();
  }
};
__publicField(_NzRadioGroupComponent, "\u0275fac", function NzRadioGroupComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzRadioGroupComponent)();
});
__publicField(_NzRadioGroupComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzRadioGroupComponent,
  selectors: [["nz-radio-group"]],
  hostAttrs: [1, "ant-radio-group"],
  hostVars: 8,
  hostBindings: function NzRadioGroupComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-radio-group-large", ctx.finalSize() === "large")("ant-radio-group-small", ctx.finalSize() === "small")("ant-radio-group-solid", ctx.nzButtonStyle === "solid")("ant-radio-group-rtl", ctx.dir() === "rtl");
    }
  },
  inputs: {
    nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
    nzButtonStyle: "nzButtonStyle",
    nzSize: "nzSize",
    nzName: "nzName"
  },
  exportAs: ["nzRadioGroup"],
  features: [\u0275\u0275ProvidersFeature([NzRadioService, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _NzRadioGroupComponent),
    multi: true
  }]), \u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function NzRadioGroupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzRadioGroupComponent = _NzRadioGroupComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRadioGroupComponent, [{
    type: Component,
    args: [{
      selector: "nz-radio-group",
      exportAs: "nzRadioGroup",
      template: `<ng-content />`,
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [NzRadioService, {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzRadioGroupComponent),
        multi: true
      }],
      host: {
        class: "ant-radio-group",
        "[class.ant-radio-group-large]": `finalSize() === 'large'`,
        "[class.ant-radio-group-small]": `finalSize() === 'small'`,
        "[class.ant-radio-group-solid]": `nzButtonStyle === 'solid'`,
        "[class.ant-radio-group-rtl]": `dir() === 'rtl'`
      }
    }]
  }], null, {
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzButtonStyle: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzName: [{
      type: Input
    }]
  });
})();
var _NzRadioComponent = class _NzRadioComponent {
  constructor() {
    __publicField(this, "directionality", inject(Directionality));
    __publicField(this, "nzRadioService", inject(NzRadioService, {
      optional: true
    }));
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "focusMonitor", inject(FocusMonitor));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "nzFormStatusService", inject(NzFormStatusService, {
      optional: true
    }));
    __publicField(this, "isNgModel", false);
    __publicField(this, "isNzDisableFirstChange", true);
    __publicField(this, "isChecked", false);
    __publicField(this, "name", null);
    __publicField(this, "onChange", () => {
    });
    __publicField(this, "onTouched", () => {
    });
    __publicField(this, "inputElement");
    __publicField(this, "nzValue", null);
    __publicField(this, "nzDisabled", false);
    __publicField(this, "nzAutoFocus", false);
    __publicField(this, "isRadioButton", false);
    __publicField(this, "dir", "ltr");
    this.destroyRef.onDestroy(() => {
      this.focusMonitor.stopMonitoring(this.elementRef);
    });
  }
  focus() {
    this.focusMonitor.focusVia(this.inputElement, "keyboard");
  }
  blur() {
    this.inputElement.nativeElement.blur();
  }
  setDisabledState(disabled) {
    this.nzDisabled = this.isNzDisableFirstChange && this.nzDisabled || disabled;
    this.isNzDisableFirstChange = false;
    this.cdr.markForCheck();
  }
  writeValue(value) {
    this.isChecked = value;
    this.cdr.markForCheck();
  }
  registerOnChange(fn) {
    this.isNgModel = true;
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  ngOnInit() {
    if (this.nzRadioService) {
      this.nzRadioService.name$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((name) => {
        this.name = name;
        this.cdr.markForCheck();
      });
      this.nzRadioService.disabled$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((disabled) => {
        this.nzDisabled = this.isNzDisableFirstChange && this.nzDisabled || disabled;
        this.isNzDisableFirstChange = false;
        this.cdr.markForCheck();
      });
      this.nzRadioService.selected$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
        const isChecked = this.isChecked;
        this.isChecked = this.nzValue === value;
        if (this.isNgModel && isChecked !== this.isChecked && // We're only intereted if `isChecked` has been changed to `false` value to emit `false` to the ascendant form,
        // since we already emit `true` within the `setupClickListener`.
        this.isChecked === false) {
          this.onChange(false);
        }
        this.cdr.markForCheck();
      });
    }
    this.focusMonitor.monitor(this.elementRef, true).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((focusOrigin) => {
      if (!focusOrigin) {
        Promise.resolve().then(() => this.onTouched());
        if (this.nzRadioService) {
          this.nzRadioService.touch();
        }
      }
    });
    this.directionality.change.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
    this.setupClickListener();
  }
  ngAfterViewInit() {
    if (this.nzAutoFocus) {
      this.focus();
    }
  }
  setupClickListener() {
    fromEventOutsideAngular(this.elementRef.nativeElement, "click").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      event.stopPropagation();
      event.preventDefault();
      if (this.nzDisabled || this.isChecked) {
        return;
      }
      this.ngZone.run(() => {
        var _a;
        this.focus();
        (_a = this.nzRadioService) == null ? void 0 : _a.select(this.nzValue);
        if (this.isNgModel) {
          this.isChecked = true;
          this.onChange(true);
        }
        this.cdr.markForCheck();
      });
    });
  }
};
__publicField(_NzRadioComponent, "\u0275fac", function NzRadioComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzRadioComponent)();
});
__publicField(_NzRadioComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzRadioComponent,
  selectors: [["", "nz-radio", ""], ["", "nz-radio-button", ""]],
  viewQuery: function NzRadioComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c12, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.inputElement = _t.first);
    }
  },
  hostVars: 18,
  hostBindings: function NzRadioComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-radio-wrapper-in-form-item", !!ctx.nzFormStatusService)("ant-radio-wrapper", !ctx.isRadioButton)("ant-radio-button-wrapper", ctx.isRadioButton)("ant-radio-wrapper-checked", ctx.isChecked && !ctx.isRadioButton)("ant-radio-button-wrapper-checked", ctx.isChecked && ctx.isRadioButton)("ant-radio-wrapper-disabled", ctx.nzDisabled && !ctx.isRadioButton)("ant-radio-button-wrapper-disabled", ctx.nzDisabled && ctx.isRadioButton)("ant-radio-wrapper-rtl", !ctx.isRadioButton && ctx.dir === "rtl")("ant-radio-button-wrapper-rtl", ctx.isRadioButton && ctx.dir === "rtl");
    }
  },
  inputs: {
    nzValue: "nzValue",
    nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
    nzAutoFocus: [2, "nzAutoFocus", "nzAutoFocus", booleanAttribute],
    isRadioButton: [2, "nz-radio-button", "isRadioButton", booleanAttribute]
  },
  exportAs: ["nzRadio"],
  features: [\u0275\u0275ProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _NzRadioComponent),
    multi: true
  }])],
  attrs: _c22,
  ngContentSelectors: _c02,
  decls: 6,
  vars: 24,
  consts: [["inputElement", ""], ["type", "radio", 3, "disabled", "checked"]],
  template: function NzRadioComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "span");
      \u0275\u0275domElement(1, "input", 1, 0)(3, "span");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(4, "span");
      \u0275\u0275projection(5);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classProp("ant-radio", !ctx.isRadioButton)("ant-radio-checked", ctx.isChecked && !ctx.isRadioButton)("ant-radio-disabled", ctx.nzDisabled && !ctx.isRadioButton)("ant-radio-button", ctx.isRadioButton)("ant-radio-button-checked", ctx.isChecked && ctx.isRadioButton)("ant-radio-button-disabled", ctx.nzDisabled && ctx.isRadioButton);
      \u0275\u0275advance();
      \u0275\u0275classProp("ant-radio-input", !ctx.isRadioButton)("ant-radio-button-input", ctx.isRadioButton);
      \u0275\u0275domProperty("disabled", ctx.nzDisabled)("checked", ctx.isChecked);
      \u0275\u0275attribute("autofocus", ctx.nzAutoFocus ? "autofocus" : null)("name", ctx.name);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("ant-radio-inner", !ctx.isRadioButton)("ant-radio-button-inner", ctx.isRadioButton);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzRadioComponent = _NzRadioComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRadioComponent, [{
    type: Component,
    args: [{
      selector: "[nz-radio],[nz-radio-button]",
      exportAs: "nzRadio",
      template: `
    <span
      [class.ant-radio]="!isRadioButton"
      [class.ant-radio-checked]="isChecked && !isRadioButton"
      [class.ant-radio-disabled]="nzDisabled && !isRadioButton"
      [class.ant-radio-button]="isRadioButton"
      [class.ant-radio-button-checked]="isChecked && isRadioButton"
      [class.ant-radio-button-disabled]="nzDisabled && isRadioButton"
    >
      <input
        #inputElement
        type="radio"
        [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
        [class.ant-radio-input]="!isRadioButton"
        [class.ant-radio-button-input]="isRadioButton"
        [disabled]="nzDisabled"
        [checked]="isChecked"
        [attr.name]="name"
      />
      <span [class.ant-radio-inner]="!isRadioButton" [class.ant-radio-button-inner]="isRadioButton"></span>
    </span>
    <span><ng-content /></span>
  `,
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzRadioComponent),
        multi: true
      }],
      host: {
        "[class.ant-radio-wrapper-in-form-item]": "!!nzFormStatusService",
        "[class.ant-radio-wrapper]": "!isRadioButton",
        "[class.ant-radio-button-wrapper]": "isRadioButton",
        "[class.ant-radio-wrapper-checked]": "isChecked && !isRadioButton",
        "[class.ant-radio-button-wrapper-checked]": "isChecked && isRadioButton",
        "[class.ant-radio-wrapper-disabled]": "nzDisabled && !isRadioButton",
        "[class.ant-radio-button-wrapper-disabled]": "nzDisabled && isRadioButton",
        "[class.ant-radio-wrapper-rtl]": `!isRadioButton && dir === 'rtl'`,
        "[class.ant-radio-button-wrapper-rtl]": `isRadioButton && dir === 'rtl'`
      }
    }]
  }], () => [], {
    inputElement: [{
      type: ViewChild,
      args: ["inputElement", {
        static: true
      }]
    }],
    nzValue: [{
      type: Input
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAutoFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isRadioButton: [{
      type: Input,
      args: [{
        alias: "nz-radio-button",
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzRadioModule = class _NzRadioModule {
};
__publicField(_NzRadioModule, "\u0275fac", function NzRadioModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzRadioModule)();
});
__publicField(_NzRadioModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzRadioModule,
  imports: [NzRadioComponent, NzRadioGroupComponent],
  exports: [NzRadioComponent, NzRadioGroupComponent]
}));
__publicField(_NzRadioModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({}));
var NzRadioModule = _NzRadioModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRadioModule, [{
    type: NgModule,
    args: [{
      imports: [NzRadioComponent, NzRadioGroupComponent],
      exports: [NzRadioComponent, NzRadioGroupComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-empty.mjs
function NzEmptyComponent_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "img", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r0.nzNotFoundImage, \u0275\u0275sanitizeUrl)("alt", ctx_r0.isContentString ? ctx_r0.nzNotFoundContent : "empty");
  }
}
function NzEmptyComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzEmptyComponent_Conditional_1_ng_container_0_Template, 2, 2, "ng-container", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzNotFoundImage);
  }
}
function NzEmptyComponent_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-empty-simple");
  }
}
function NzEmptyComponent_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-empty-default");
  }
}
function NzEmptyComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzEmptyComponent_Conditional_2_Conditional_0_Template, 1, 0, "nz-empty-simple")(1, NzEmptyComponent_Conditional_2_Conditional_1_Template, 1, 0, "nz-empty-default");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.nzNotFoundImage === "simple" ? 0 : 1);
  }
}
function NzEmptyComponent_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.isContentString ? ctx_r0.nzNotFoundContent : ctx_r0.locale["description"], " ");
  }
}
function NzEmptyComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 1);
    \u0275\u0275template(1, NzEmptyComponent_Conditional_3_ng_container_1_Template, 2, 1, "ng-container", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzNotFoundContent);
  }
}
function NzEmptyComponent_Conditional_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.nzNotFoundFooter, " ");
  }
}
function NzEmptyComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275template(1, NzEmptyComponent_Conditional_4_ng_container_1_Template, 2, 1, "ng-container", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzNotFoundFooter);
  }
}
var _c03 = (a0) => ({
  $implicit: a0
});
function NzEmbedEmptyComponent_Conditional_0_Conditional_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.content);
  }
}
function NzEmbedEmptyComponent_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzEmbedEmptyComponent_Conditional_0_Conditional_0_ng_container_0_Template, 2, 1, "ng-container", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.content)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c03, ctx_r0.nzComponentName));
  }
}
function NzEmbedEmptyComponent_Conditional_0_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function NzEmbedEmptyComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzEmbedEmptyComponent_Conditional_0_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("cdkPortalOutlet", ctx_r0.contentPortal);
  }
}
function NzEmbedEmptyComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzEmbedEmptyComponent_Conditional_0_Conditional_0_Template, 1, 4, "ng-container")(1, NzEmbedEmptyComponent_Conditional_0_Conditional_1_Template, 1, 1, null, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.contentType === "template" || ctx_r0.contentType === "string" ? 0 : 1);
  }
}
function NzEmbedEmptyComponent_Conditional_1_Conditional_0_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-empty", 2);
  }
}
function NzEmbedEmptyComponent_Conditional_1_Conditional_0_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-empty", 3);
  }
}
function NzEmbedEmptyComponent_Conditional_1_Conditional_0_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-empty");
  }
}
function NzEmbedEmptyComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzEmbedEmptyComponent_Conditional_1_Conditional_0_Case_0_Template, 1, 0, "nz-empty", 2)(1, NzEmbedEmptyComponent_Conditional_1_Conditional_0_Case_1_Template, 1, 0, "nz-empty", 3)(2, NzEmbedEmptyComponent_Conditional_1_Conditional_0_Case_2_Template, 1, 0, "nz-empty");
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional((tmp_2_0 = ctx_r0.size) === "normal" ? 0 : tmp_2_0 === "small" ? 1 : 2);
  }
}
function NzEmbedEmptyComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzEmbedEmptyComponent_Conditional_1_Conditional_0_Template, 3, 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.specificContent !== null ? 0 : -1);
  }
}
var NZ_EMPTY_COMPONENT_NAME = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "nz-empty-component-name" : "");
var _NzEmptyDefaultComponent = class _NzEmptyDefaultComponent {
};
__publicField(_NzEmptyDefaultComponent, "\u0275fac", function NzEmptyDefaultComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzEmptyDefaultComponent)();
});
__publicField(_NzEmptyDefaultComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzEmptyDefaultComponent,
  selectors: [["nz-empty-default"]],
  exportAs: ["nzEmptyDefault"],
  decls: 12,
  vars: 0,
  consts: [["width", "184", "height", "152", "viewBox", "0 0 184 152", "xmlns", "http://www.w3.org/2000/svg", 1, "ant-empty-img-default"], ["fill", "none", "fill-rule", "evenodd"], ["transform", "translate(24 31.67)"], ["cx", "67.797", "cy", "106.89", "rx", "67.797", "ry", "12.668", 1, "ant-empty-img-default-ellipse"], ["d", "M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z", 1, "ant-empty-img-default-path-1"], ["d", "M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z", "transform", "translate(13.56)", 1, "ant-empty-img-default-path-2"], ["d", "M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z", 1, "ant-empty-img-default-path-3"], ["d", "M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z", 1, "ant-empty-img-default-path-4"], ["d", "M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z", 1, "ant-empty-img-default-path-5"], ["transform", "translate(149.65 15.383)", 1, "ant-empty-img-default-g"], ["cx", "20.654", "cy", "3.167", "rx", "2.849", "ry", "2.815"], ["d", "M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"]],
  template: function NzEmptyDefaultComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0)(1, "g", 1)(2, "g", 2);
      \u0275\u0275domElement(3, "ellipse", 3)(4, "path", 4)(5, "path", 5)(6, "path", 6)(7, "path", 7);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElement(8, "path", 8);
      \u0275\u0275domElementStart(9, "g", 9);
      \u0275\u0275domElement(10, "ellipse", 10)(11, "path", 11);
      \u0275\u0275domElementEnd()()();
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzEmptyDefaultComponent = _NzEmptyDefaultComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzEmptyDefaultComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-empty-default",
      exportAs: "nzEmptyDefault",
      template: `
    <svg
      class="ant-empty-img-default"
      width="184"
      height="152"
      viewBox="0 0 184 152"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(24 31.67)">
          <ellipse class="ant-empty-img-default-ellipse" cx="67.797" cy="106.89" rx="67.797" ry="12.668" />
          <path
            class="ant-empty-img-default-path-1"
            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
          />
          <path
            class="ant-empty-img-default-path-2"
            d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
            transform="translate(13.56)"
          />
          <path
            class="ant-empty-img-default-path-3"
            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
          />
          <path
            class="ant-empty-img-default-path-4"
            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
          />
        </g>
        <path
          class="ant-empty-img-default-path-5"
          d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
        />
        <g class="ant-empty-img-default-g" transform="translate(149.65 15.383)">
          <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
          <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
        </g>
      </g>
    </svg>
  `
    }]
  }], null, null);
})();
var _NzEmptySimpleComponent = class _NzEmptySimpleComponent {
};
__publicField(_NzEmptySimpleComponent, "\u0275fac", function NzEmptySimpleComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzEmptySimpleComponent)();
});
__publicField(_NzEmptySimpleComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzEmptySimpleComponent,
  selectors: [["nz-empty-simple"]],
  exportAs: ["nzEmptySimple"],
  decls: 6,
  vars: 0,
  consts: [["width", "64", "height", "41", "viewBox", "0 0 64 41", "xmlns", "http://www.w3.org/2000/svg", 1, "ant-empty-img-simple"], ["transform", "translate(0 1)", "fill", "none", "fill-rule", "evenodd"], ["cx", "32", "cy", "33", "rx", "32", "ry", "7", 1, "ant-empty-img-simple-ellipse"], ["fill-rule", "nonzero", 1, "ant-empty-img-simple-g"], ["d", "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"], ["d", "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z", 1, "ant-empty-img-simple-path"]],
  template: function NzEmptySimpleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(0, "svg", 0)(1, "g", 1);
      \u0275\u0275domElement(2, "ellipse", 2);
      \u0275\u0275domElementStart(3, "g", 3);
      \u0275\u0275domElement(4, "path", 4)(5, "path", 5);
      \u0275\u0275domElementEnd()()();
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzEmptySimpleComponent = _NzEmptySimpleComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzEmptySimpleComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-empty-simple",
      exportAs: "nzEmptySimple",
      template: `
    <svg class="ant-empty-img-simple" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
        <ellipse class="ant-empty-img-simple-ellipse" cx="32" cy="33" rx="32" ry="7" />
        <g class="ant-empty-img-simple-g" fill-rule="nonzero">
          <path
            d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
          />
          <path
            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
            class="ant-empty-img-simple-path"
          />
        </g>
      </g>
    </svg>
  `
    }]
  }], null, null);
})();
var NzEmptyDefaultImages = ["default", "simple"];
var _NzEmptyComponent = class _NzEmptyComponent {
  constructor() {
    __publicField(this, "i18n", inject(NzI18nService));
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "nzNotFoundImage", "default");
    __publicField(this, "nzNotFoundContent");
    __publicField(this, "nzNotFoundFooter");
    __publicField(this, "isContentString", false);
    __publicField(this, "isImageBuildIn", true);
    __publicField(this, "locale");
  }
  ngOnChanges(changes) {
    const {
      nzNotFoundContent,
      nzNotFoundImage
    } = changes;
    if (nzNotFoundContent) {
      const content = nzNotFoundContent.currentValue;
      this.isContentString = typeof content === "string";
    }
    if (nzNotFoundImage) {
      const image = nzNotFoundImage.currentValue || "default";
      this.isImageBuildIn = NzEmptyDefaultImages.findIndex((i) => i === image) > -1;
    }
  }
  ngOnInit() {
    this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.locale = this.i18n.getLocaleData("Empty");
      this.cdr.markForCheck();
    });
  }
};
__publicField(_NzEmptyComponent, "\u0275fac", function NzEmptyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzEmptyComponent)();
});
__publicField(_NzEmptyComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzEmptyComponent,
  selectors: [["nz-empty"]],
  hostAttrs: [1, "ant-empty"],
  inputs: {
    nzNotFoundImage: "nzNotFoundImage",
    nzNotFoundContent: "nzNotFoundContent",
    nzNotFoundFooter: "nzNotFoundFooter"
  },
  exportAs: ["nzEmpty"],
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 5,
  vars: 3,
  consts: [[1, "ant-empty-image"], [1, "ant-empty-description"], [1, "ant-empty-footer"], [4, "nzStringTemplateOutlet"], [3, "src", "alt"]],
  template: function NzEmptyComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, NzEmptyComponent_Conditional_1_Template, 1, 1, "ng-container")(2, NzEmptyComponent_Conditional_2_Template, 2, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(3, NzEmptyComponent_Conditional_3_Template, 2, 1, "p", 1);
      \u0275\u0275conditionalCreate(4, NzEmptyComponent_Conditional_4_Template, 2, 1, "div", 2);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isImageBuildIn ? 1 : 2);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.nzNotFoundContent !== null ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzNotFoundFooter ? 4 : -1);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective, NzEmptyDefaultComponent, NzEmptySimpleComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzEmptyComponent = _NzEmptyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzEmptyComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-empty",
      exportAs: "nzEmpty",
      template: `
    <div class="ant-empty-image">
      @if (!isImageBuildIn) {
        <ng-container *nzStringTemplateOutlet="nzNotFoundImage">
          <img [src]="nzNotFoundImage" [alt]="isContentString ? nzNotFoundContent : 'empty'" />
        </ng-container>
      } @else {
        @if (nzNotFoundImage === 'simple') {
          <nz-empty-simple />
        } @else {
          <nz-empty-default />
        }
      }
    </div>
    @if (nzNotFoundContent !== null) {
      <p class="ant-empty-description">
        <ng-container *nzStringTemplateOutlet="nzNotFoundContent">
          {{ isContentString ? nzNotFoundContent : locale['description'] }}
        </ng-container>
      </p>
    }

    @if (nzNotFoundFooter) {
      <div class="ant-empty-footer">
        <ng-container *nzStringTemplateOutlet="nzNotFoundFooter">
          {{ nzNotFoundFooter }}
        </ng-container>
      </div>
    }
  `,
      host: {
        class: "ant-empty"
      },
      imports: [NzOutletModule, NzEmptyDefaultComponent, NzEmptySimpleComponent]
    }]
  }], null, {
    nzNotFoundImage: [{
      type: Input
    }],
    nzNotFoundContent: [{
      type: Input
    }],
    nzNotFoundFooter: [{
      type: Input
    }]
  });
})();
function getEmptySize(componentName) {
  switch (componentName) {
    case "table":
    case "list":
      return "normal";
    case "select":
    case "tree-select":
    case "cascader":
    case "transfer":
      return "small";
    default:
      return "";
  }
}
var _NzEmbedEmptyComponent = class _NzEmbedEmptyComponent {
  constructor() {
    __publicField(this, "configService", inject(NzConfigService));
    __publicField(this, "viewContainerRef", inject(ViewContainerRef));
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "injector", inject(Injector));
    __publicField(this, "nzComponentName");
    __publicField(this, "specificContent");
    __publicField(this, "content");
    __publicField(this, "contentType", "string");
    __publicField(this, "contentPortal");
    __publicField(this, "size", "");
    onConfigChangeEventForComponent("empty", () => {
      this.content = this.specificContent || this.getUserDefaultEmptyContent();
      this.renderEmpty();
    });
  }
  ngOnChanges(changes) {
    if (changes.nzComponentName) {
      this.size = getEmptySize(changes.nzComponentName.currentValue);
    }
    if (changes.specificContent && !changes.specificContent.isFirstChange()) {
      this.content = changes.specificContent.currentValue;
      this.renderEmpty();
    }
  }
  ngOnInit() {
    this.content = this.specificContent || this.getUserDefaultEmptyContent();
    this.renderEmpty();
  }
  renderEmpty() {
    const content = this.content;
    if (typeof content === "string") {
      this.contentType = "string";
    } else if (content instanceof TemplateRef) {
      this.contentType = "template";
      this.contentPortal = void 0;
    } else if (content instanceof Type) {
      const injector = Injector.create({
        parent: this.injector,
        providers: [{
          provide: NZ_EMPTY_COMPONENT_NAME,
          useValue: this.nzComponentName
        }]
      });
      this.contentType = "component";
      this.contentPortal = new ComponentPortal(content, this.viewContainerRef, injector);
    } else {
      this.contentType = "string";
      this.contentPortal = void 0;
    }
    this.cdr.detectChanges();
  }
  getUserDefaultEmptyContent() {
    return (this.configService.getConfigForComponent("empty") || {}).nzDefaultEmptyContent;
  }
};
__publicField(_NzEmbedEmptyComponent, "\u0275fac", function NzEmbedEmptyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzEmbedEmptyComponent)();
});
__publicField(_NzEmbedEmptyComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzEmbedEmptyComponent,
  selectors: [["nz-embed-empty"]],
  inputs: {
    nzComponentName: "nzComponentName",
    specificContent: "specificContent"
  },
  exportAs: ["nzEmbedEmpty"],
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 2,
  vars: 1,
  consts: [[3, "cdkPortalOutlet"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], ["nzNotFoundImage", "simple", 1, "ant-empty-normal"], ["nzNotFoundImage", "simple", 1, "ant-empty-small"]],
  template: function NzEmbedEmptyComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzEmbedEmptyComponent_Conditional_0_Template, 2, 1)(1, NzEmbedEmptyComponent_Conditional_1_Template, 1, 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.content ? 0 : 1);
    }
  },
  dependencies: [NzEmptyComponent, PortalModule, CdkPortalOutlet, NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzEmbedEmptyComponent = _NzEmbedEmptyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzEmbedEmptyComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-embed-empty",
      exportAs: "nzEmbedEmpty",
      template: `
    @if (content) {
      @if (contentType === 'template' || contentType === 'string') {
        <ng-container *nzStringTemplateOutlet="content; context: { $implicit: this.nzComponentName }">{{
          content
        }}</ng-container>
      } @else {
        <ng-template [cdkPortalOutlet]="contentPortal" />
      }
    } @else {
      @if (specificContent !== null) {
        @switch (size) {
          @case ('normal') {
            <nz-empty class="ant-empty-normal" nzNotFoundImage="simple" />
          }
          @case ('small') {
            <nz-empty class="ant-empty-small" nzNotFoundImage="simple" />
          }
          @default {
            <nz-empty />
          }
        }
      }
    }
  `,
      imports: [NzEmptyComponent, PortalModule, NzOutletModule]
    }]
  }], () => [], {
    nzComponentName: [{
      type: Input
    }],
    specificContent: [{
      type: Input
    }]
  });
})();
var _NzEmptyModule = class _NzEmptyModule {
};
__publicField(_NzEmptyModule, "\u0275fac", function NzEmptyModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzEmptyModule)();
});
__publicField(_NzEmptyModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzEmptyModule,
  imports: [NzEmptyComponent, NzEmbedEmptyComponent, NzEmptyDefaultComponent, NzEmptySimpleComponent],
  exports: [NzEmptyComponent, NzEmbedEmptyComponent]
}));
__publicField(_NzEmptyModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzEmptyComponent, NzEmbedEmptyComponent]
}));
var NzEmptyModule = _NzEmptyModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzEmptyModule, [{
    type: NgModule,
    args: [{
      imports: [NzEmptyComponent, NzEmbedEmptyComponent, NzEmptyDefaultComponent, NzEmptySimpleComponent],
      exports: [NzEmptyComponent, NzEmbedEmptyComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-select.mjs
var _c04 = ["*"];
function NzOptionItemGroupComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzLabel);
  }
}
function NzOptionItemComponent_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function NzOptionItemComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzOptionItemComponent_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.template);
  }
}
function NzOptionItemComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r0.label, " ");
  }
}
function NzOptionItemComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 3);
  }
}
function NzOptionItemComponent_Conditional_3_Conditional_2_ng_template_0_Template(rf, ctx) {
}
function NzOptionItemComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzOptionItemComponent_Conditional_3_Conditional_2_ng_template_0_Template, 0, 0, "ng-template", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.icon);
  }
}
function NzOptionItemComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275conditionalCreate(1, NzOptionItemComponent_Conditional_3_Conditional_1_Template, 1, 0, "nz-icon", 3)(2, NzOptionItemComponent_Conditional_3_Conditional_2_Template, 1, 1, null, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.icon ? 1 : 2);
  }
}
function NzOptionContainerComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "nz-embed-empty", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("specificContent", ctx_r0.notFoundContent);
  }
}
function NzOptionContainerComponent_ng_template_3_Case_0_Template(rf, ctx) {
  var _a;
  if (rf & 1) {
    \u0275\u0275element(0, "nz-option-item-group", 5);
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("nzLabel", (_a = item_r2.groupLabel) != null ? _a : null);
  }
}
function NzOptionContainerComponent_ng_template_3_Case_1_Template(rf, ctx) {
  var _a;
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-option-item", 7);
    \u0275\u0275listener("itemHover", function NzOptionContainerComponent_ng_template_3_Case_1_Template_nz_option_item_itemHover_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onItemHover($event));
    })("itemClick", function NzOptionContainerComponent_ng_template_3_Case_1_Template_nz_option_item_itemClick_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onItemClick($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("icon", ctx_r0.menuItemSelectedIcon)("customContent", item_r2.nzCustomContent)("template", (_a = item_r2.template) != null ? _a : null)("grouped", !!item_r2.groupLabel)("disabled", item_r2.nzDisabled || ctx_r0.isMaxMultipleCountReached && !ctx_r0.listOfSelectedValue.includes(item_r2["nzValue"]))("showState", ctx_r0.mode === "tags" || ctx_r0.mode === "multiple")("title", item_r2.nzTitle)("label", item_r2.nzLabel)("compareWith", ctx_r0.compareWith)("activatedValue", ctx_r0.activatedValue)("listOfSelectedValue", ctx_r0.listOfSelectedValue)("value", item_r2.nzValue);
  }
}
function NzOptionContainerComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzOptionContainerComponent_ng_template_3_Case_0_Template, 1, 1, "nz-option-item-group", 5)(1, NzOptionContainerComponent_ng_template_3_Case_1_Template, 1, 12, "nz-option-item", 6);
  }
  if (rf & 2) {
    let tmp_2_0;
    const item_r2 = ctx.$implicit;
    \u0275\u0275conditional((tmp_2_0 = item_r2.type) === "group" ? 0 : tmp_2_0 === "item" ? 1 : -1);
  }
}
function NzOptionContainerComponent_ng_template_4_Template(rf, ctx) {
}
function NzOptionComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function NzSelectArrowComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r0.listOfValue.length, " / ", ctx_r0.nzMaxMultipleCount);
  }
}
function NzSelectArrowComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 0);
  }
}
function NzSelectArrowComponent_Conditional_2_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 2);
  }
}
function NzSelectArrowComponent_Conditional_2_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 3);
  }
}
function NzSelectArrowComponent_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzSelectArrowComponent_Conditional_2_Conditional_0_Conditional_0_Template, 1, 0, "nz-icon", 2)(1, NzSelectArrowComponent_Conditional_2_Conditional_0_Conditional_1_Template, 1, 0, "nz-icon", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r0.search ? 0 : 1);
  }
}
function NzSelectArrowComponent_Conditional_2_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "nz-icon", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const suffixIcon_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzType", suffixIcon_r2);
  }
}
function NzSelectArrowComponent_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzSelectArrowComponent_Conditional_2_Conditional_1_ng_container_0_Template, 2, 1, "ng-container", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.suffixIcon);
  }
}
function NzSelectArrowComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzSelectArrowComponent_Conditional_2_Conditional_0_Template, 2, 1)(1, NzSelectArrowComponent_Conditional_2_Conditional_1_Template, 1, 1, "ng-container");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.showArrow && !ctx_r0.suffixIcon ? 0 : 1);
  }
}
function NzSelectArrowComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.feedbackIcon);
  }
}
function NzSelectClearComponent_Conditional_0_ng_template_0_Template(rf, ctx) {
}
function NzSelectClearComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzSelectClearComponent_Conditional_0_ng_template_0_Template, 0, 0, "ng-template", 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.clearIcon);
  }
}
function NzSelectClearComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 1);
  }
}
function NzSelectItemComponent_ng_container_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ant-select-selection-item-content", ctx_r0.deletable);
    \u0275\u0275property("innerHTML", ctx_r0.label, \u0275\u0275sanitizeHtml);
  }
}
function NzSelectItemComponent_ng_container_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ant-select-selection-item-content", ctx_r0.deletable);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.label);
  }
}
function NzSelectItemComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275conditionalCreate(1, NzSelectItemComponent_ng_container_0_Conditional_1_Template, 1, 3, "span", 2)(2, NzSelectItemComponent_ng_container_0_Conditional_2_Template, 2, 3, "span", 3);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.displayLabelInHtml ? 1 : 2);
  }
}
function NzSelectItemComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 6);
  }
}
function NzSelectItemComponent_Conditional_1_Conditional_2_ng_template_0_Template(rf, ctx) {
}
function NzSelectItemComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzSelectItemComponent_Conditional_1_Conditional_2_ng_template_0_Template, 0, 0, "ng-template", 7);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.removeIcon);
  }
}
function NzSelectItemComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275listener("click", function NzSelectItemComponent_Conditional_1_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDelete($event));
    });
    \u0275\u0275conditionalCreate(1, NzSelectItemComponent_Conditional_1_Conditional_1_Template, 1, 0, "nz-icon", 6)(2, NzSelectItemComponent_Conditional_1_Conditional_2_Template, 1, 1, null, 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.removeIcon ? 1 : 2);
  }
}
function NzSelectPlaceholderComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.placeholder, " ");
  }
}
var _c13 = ["inputElement"];
var _c23 = ["mirrorElement"];
function NzSelectSearchComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 3, 1);
  }
}
var _forTrack02 = ($index, $item) => $item.nzValue;
function NzSelectTopControlComponent_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.prefix);
  }
}
function NzSelectTopControlComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275template(1, NzSelectTopControlComponent_Conditional_0_ng_container_1_Template, 2, 1, "ng-container", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.prefix);
  }
}
function NzSelectTopControlComponent_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-select-item", 6);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("removeIcon", ctx_r0.removeIcon)("label", ctx_r0.listOfTopItem[0].nzLabel)("contentTemplateOutlet", ctx_r0.customTemplate)("contentTemplateOutletContext", ctx_r0.listOfTopItem[0]);
  }
}
function NzSelectTopControlComponent_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-select-search", 5);
    \u0275\u0275listener("isComposingChange", function NzSelectTopControlComponent_Case_2_Template_nz_select_search_isComposingChange_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.isComposingChange($event));
    })("valueChange", function NzSelectTopControlComponent_Case_2_Template_nz_select_search_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onInputValueChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(1, NzSelectTopControlComponent_Case_2_Conditional_1_Template, 1, 4, "nz-select-item", 6);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("nzId", ctx_r0.nzId)("disabled", ctx_r0.disabled)("value", ctx_r0.inputValue)("showInput", ctx_r0.showSearch)("mirrorSync", false)("autofocus", ctx_r0.autofocus)("focusTrigger", ctx_r0.open);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isShowSingleLabel ? 1 : -1);
  }
}
function NzSelectTopControlComponent_Case_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "nz-select-item", 10);
    \u0275\u0275listener("delete", function NzSelectTopControlComponent_Case_3_For_2_Template_nz_select_item_delete_1_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onDeleteItem(item_r5.contentTemplateOutletContext));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("removeIcon", ctx_r0.removeIcon)("label", item_r5.nzLabel)("disabled", item_r5.nzDisabled || ctx_r0.disabled)("contentTemplateOutlet", item_r5.contentTemplateOutlet)("contentTemplateOutletContext", item_r5.contentTemplateOutletContext);
  }
}
function NzSelectTopControlComponent_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275repeaterCreate(1, NzSelectTopControlComponent_Case_3_For_2_Template, 2, 5, "div", 7, _forTrack02);
    \u0275\u0275elementStart(3, "div", 8)(4, "nz-select-search", 9);
    \u0275\u0275listener("isComposingChange", function NzSelectTopControlComponent_Case_3_Template_nz_select_search_isComposingChange_4_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.isComposingChange($event));
    })("valueChange", function NzSelectTopControlComponent_Case_3_Template_nz_select_search_valueChange_4_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onInputValueChange($event));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.listOfSlicedItem);
    \u0275\u0275advance(3);
    \u0275\u0275property("nzId", ctx_r0.nzId)("disabled", ctx_r0.disabled)("value", ctx_r0.inputValue)("autofocus", ctx_r0.autofocus)("showInput", true)("mirrorSync", true)("focusTrigger", ctx_r0.open);
  }
}
function NzSelectTopControlComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-select-placeholder", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("placeholder", ctx_r0.placeHolder);
  }
}
function NzSelectComponent_Conditional_2_ng_template_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-form-item-feedback-icon", 6);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("status", ctx_r0.status);
  }
}
function NzSelectComponent_Conditional_2_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzSelectComponent_Conditional_2_ng_template_1_Conditional_0_Template, 1, 1, "nz-form-item-feedback-icon", 6);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r0.hasFeedback && !!ctx_r0.status ? 0 : -1);
  }
}
function NzSelectComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-select-arrow", 3);
    \u0275\u0275template(1, NzSelectComponent_Conditional_2_ng_template_1_Template, 1, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const feedbackIconTpl_r2 = \u0275\u0275reference(2);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("showArrow", ctx_r0.nzShowArrow)("loading", ctx_r0.nzLoading)("search", ctx_r0.nzOpen && ctx_r0.nzShowSearch)("suffixIcon", ctx_r0.nzSuffixIcon)("feedbackIcon", feedbackIconTpl_r2)("nzMaxMultipleCount", ctx_r0.nzMaxMultipleCount)("listOfValue", ctx_r0.listOfValue)("isMaxMultipleCountSet", ctx_r0.isMaxMultipleCountSet);
  }
}
function NzSelectComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-select-clear", 7);
    \u0275\u0275listener("clear", function NzSelectComponent_Conditional_3_Template_nz_select_clear_clear_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onClearSelection());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("clearIcon", ctx_r0.nzClearIcon);
  }
}
function NzSelectComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-option-container", 8);
    \u0275\u0275animateLeave(function NzSelectComponent_ng_template_4_Template_animateleave_cb() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.selectAnimationLeave());
    });
    \u0275\u0275animateEnter(function NzSelectComponent_ng_template_4_Template_animateenter_cb() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.selectAnimationEnter());
    });
    \u0275\u0275listener("keydown", function NzSelectComponent_ng_template_4_Template_nz_option_container_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onKeyDown($event));
    })("itemClick", function NzSelectComponent_ng_template_4_Template_nz_option_container_itemClick_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onItemClick($event));
    })("scrollToBottom", function NzSelectComponent_ng_template_4_Template_nz_option_container_scrollToBottom_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.nzScrollToBottom.emit());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r0.nzDropdownStyle);
    \u0275\u0275classProp("ant-select-dropdown-placement-bottomLeft", ctx_r0.dropdownPosition === "bottomLeft")("ant-select-dropdown-placement-topLeft", ctx_r0.dropdownPosition === "topLeft")("ant-select-dropdown-placement-bottomRight", ctx_r0.dropdownPosition === "bottomRight")("ant-select-dropdown-placement-topRight", ctx_r0.dropdownPosition === "topRight");
    \u0275\u0275property("itemSize", ctx_r0.nzOptionHeightPx)("maxItemLength", ctx_r0.nzOptionOverflowSize)("matchWidth", ctx_r0.nzDropdownMatchSelectWidth)("nzNoAnimation", !!(ctx_r0.noAnimation == null ? null : ctx_r0.noAnimation.nzNoAnimation == null ? null : ctx_r0.noAnimation.nzNoAnimation()))("listOfContainerItem", ctx_r0.listOfContainerItem)("menuItemSelectedIcon", ctx_r0.nzMenuItemSelectedIcon)("notFoundContent", ctx_r0.nzNotFoundContent)("activatedValue", ctx_r0.activatedValue)("listOfSelectedValue", ctx_r0.listOfValue)("dropdownRender", ctx_r0.nzDropdownRender)("compareWith", ctx_r0.compareWith)("mode", ctx_r0.nzMode)("isMaxMultipleCountReached", ctx_r0.isMaxMultipleCountReached);
  }
}
var _NzOptionGroupComponent = class _NzOptionGroupComponent {
  constructor() {
    __publicField(this, "nzLabel", null);
    __publicField(this, "changes", new Subject());
  }
  ngOnChanges() {
    this.changes.next();
  }
};
__publicField(_NzOptionGroupComponent, "\u0275fac", function NzOptionGroupComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzOptionGroupComponent)();
});
__publicField(_NzOptionGroupComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzOptionGroupComponent,
  selectors: [["nz-option-group"]],
  inputs: {
    nzLabel: "nzLabel"
  },
  exportAs: ["nzOptionGroup"],
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c04,
  decls: 1,
  vars: 0,
  template: function NzOptionGroupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzOptionGroupComponent = _NzOptionGroupComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzOptionGroupComponent, [{
    type: Component,
    args: [{
      selector: "nz-option-group",
      exportAs: "nzOptionGroup",
      template: `<ng-content />`,
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, {
    nzLabel: [{
      type: Input
    }]
  });
})();
var _NzOptionItemGroupComponent = class _NzOptionItemGroupComponent {
  constructor() {
    __publicField(this, "nzLabel", null);
  }
};
__publicField(_NzOptionItemGroupComponent, "\u0275fac", function NzOptionItemGroupComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzOptionItemGroupComponent)();
});
__publicField(_NzOptionItemGroupComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzOptionItemGroupComponent,
  selectors: [["nz-option-item-group"]],
  hostAttrs: [1, "ant-select-item", "ant-select-item-group"],
  inputs: {
    nzLabel: "nzLabel"
  },
  decls: 1,
  vars: 1,
  consts: [[4, "nzStringTemplateOutlet"]],
  template: function NzOptionItemGroupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzOptionItemGroupComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("nzStringTemplateOutlet", ctx.nzLabel);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzOptionItemGroupComponent = _NzOptionItemGroupComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzOptionItemGroupComponent, [{
    type: Component,
    args: [{
      selector: "nz-option-item-group",
      template: `<ng-container *nzStringTemplateOutlet="nzLabel">{{ nzLabel }}</ng-container>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "ant-select-item ant-select-item-group"
      },
      imports: [NzOutletModule]
    }]
  }], null, {
    nzLabel: [{
      type: Input
    }]
  });
})();
var _NzOptionItemComponent = class _NzOptionItemComponent {
  constructor() {
    __publicField(this, "el", inject(ElementRef).nativeElement);
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "selected", false);
    __publicField(this, "activated", false);
    __publicField(this, "grouped", false);
    __publicField(this, "customContent", false);
    __publicField(this, "template", null);
    __publicField(this, "disabled", false);
    __publicField(this, "showState", false);
    __publicField(this, "title");
    __publicField(this, "label", null);
    __publicField(this, "value", null);
    __publicField(this, "activatedValue", null);
    __publicField(this, "listOfSelectedValue", []);
    __publicField(this, "icon", null);
    __publicField(this, "compareWith");
    __publicField(this, "itemClick", new EventEmitter());
    __publicField(this, "itemHover", new EventEmitter());
  }
  ngOnChanges(changes) {
    const {
      value,
      activatedValue,
      listOfSelectedValue
    } = changes;
    if (value || listOfSelectedValue) {
      this.selected = this.listOfSelectedValue.some((v) => this.compareWith(v, this.value));
    }
    if (value || activatedValue) {
      this.activated = this.compareWith(this.activatedValue, this.value);
    }
  }
  ngOnInit() {
    fromEventOutsideAngular(this.el, "click").pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (!this.disabled) {
        this.ngZone.run(() => this.itemClick.emit(this.value));
      }
    });
    fromEventOutsideAngular(this.el, "mouseenter").pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (!this.disabled) {
        this.ngZone.run(() => this.itemHover.emit(this.value));
      }
    });
  }
};
__publicField(_NzOptionItemComponent, "\u0275fac", function NzOptionItemComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzOptionItemComponent)();
});
__publicField(_NzOptionItemComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzOptionItemComponent,
  selectors: [["nz-option-item"]],
  hostAttrs: [1, "ant-select-item", "ant-select-item-option"],
  hostVars: 9,
  hostBindings: function NzOptionItemComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275attribute("title", ctx.title);
      \u0275\u0275classProp("ant-select-item-option-grouped", ctx.grouped)("ant-select-item-option-selected", ctx.selected && !ctx.disabled)("ant-select-item-option-disabled", ctx.disabled)("ant-select-item-option-active", ctx.activated && !ctx.disabled);
    }
  },
  inputs: {
    grouped: "grouped",
    customContent: [2, "customContent", "customContent", booleanAttribute],
    template: "template",
    disabled: "disabled",
    showState: "showState",
    title: "title",
    label: "label",
    value: "value",
    activatedValue: "activatedValue",
    listOfSelectedValue: "listOfSelectedValue",
    icon: "icon",
    compareWith: "compareWith"
  },
  outputs: {
    itemClick: "itemClick",
    itemHover: "itemHover"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 4,
  vars: 2,
  consts: [[1, "ant-select-item-option-content"], [3, "ngTemplateOutlet"], ["unselectable", "on", 1, "ant-select-item-option-state"], ["nzType", "check", 1, "ant-select-selected-icon"]],
  template: function NzOptionItemComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, NzOptionItemComponent_Conditional_1_Template, 1, 1, null, 1)(2, NzOptionItemComponent_Conditional_2_Template, 1, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(3, NzOptionItemComponent_Conditional_3_Template, 3, 1, "div", 2);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.customContent ? 1 : 2);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showState && ctx.selected ? 3 : -1);
    }
  },
  dependencies: [NgTemplateOutlet, NzIconModule, NzIconDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzOptionItemComponent = _NzOptionItemComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzOptionItemComponent, [{
    type: Component,
    args: [{
      selector: "nz-option-item",
      template: `
    <div class="ant-select-item-option-content">
      @if (customContent) {
        <ng-template [ngTemplateOutlet]="template" />
      } @else {
        {{ label }}
      }
    </div>
    @if (showState && selected) {
      <div class="ant-select-item-option-state" unselectable="on">
        @if (!icon) {
          <nz-icon nzType="check" class="ant-select-selected-icon" />
        } @else {
          <ng-template [ngTemplateOutlet]="icon" />
        }
      </div>
    }
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "ant-select-item ant-select-item-option",
        "[attr.title]": "title",
        "[class.ant-select-item-option-grouped]": "grouped",
        "[class.ant-select-item-option-selected]": "selected && !disabled",
        "[class.ant-select-item-option-disabled]": "disabled",
        "[class.ant-select-item-option-active]": "activated && !disabled"
      },
      imports: [NgTemplateOutlet, NzIconModule]
    }]
  }], null, {
    grouped: [{
      type: Input
    }],
    customContent: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    template: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    showState: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    activatedValue: [{
      type: Input
    }],
    listOfSelectedValue: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    compareWith: [{
      type: Input
    }],
    itemClick: [{
      type: Output
    }],
    itemHover: [{
      type: Output
    }]
  });
})();
var _NzOptionContainerComponent = class _NzOptionContainerComponent {
  constructor() {
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "platformId", inject(PLATFORM_ID));
    __publicField(this, "notFoundContent");
    __publicField(this, "menuItemSelectedIcon", null);
    __publicField(this, "dropdownRender", null);
    __publicField(this, "activatedValue", null);
    __publicField(this, "listOfSelectedValue", []);
    __publicField(this, "compareWith");
    __publicField(this, "mode", "default");
    __publicField(this, "matchWidth", true);
    __publicField(this, "itemSize", 32);
    __publicField(this, "maxItemLength", 8);
    __publicField(this, "isMaxMultipleCountReached", false);
    __publicField(this, "listOfContainerItem", []);
    __publicField(this, "itemClick", new EventEmitter());
    __publicField(this, "scrollToBottom", new EventEmitter());
    __publicField(this, "cdkVirtualScrollViewport");
    __publicField(this, "scrolledIndex", 0);
  }
  onItemClick(value) {
    this.itemClick.emit(value);
  }
  onItemHover(value) {
    this.activatedValue = value;
  }
  trackValue(_index, option) {
    return option.key;
  }
  onScrolledIndexChange(index) {
    const isAtBottom = this.listOfContainerItem.length - index <= this.maxItemLength + 1;
    const wasAtBottom = this.listOfContainerItem.length - this.scrolledIndex <= this.maxItemLength + 1;
    if (isAtBottom && !wasAtBottom) {
      this.scrollToBottom.emit();
    }
    this.scrolledIndex = index;
  }
  scrollToActivatedValue() {
    const index = this.listOfContainerItem.findIndex((item) => this.compareWith(item.key, this.activatedValue));
    if (index < this.scrolledIndex || index >= this.scrolledIndex + this.maxItemLength) {
      this.cdkVirtualScrollViewport.scrollToIndex(index || 0);
    }
  }
  ngOnChanges(changes) {
    const {
      listOfContainerItem,
      activatedValue
    } = changes;
    if (listOfContainerItem || activatedValue) {
      this.scrollToActivatedValue();
    }
  }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => setTimeout(() => this.scrollToActivatedValue()));
    }
  }
};
__publicField(_NzOptionContainerComponent, "\u0275fac", function NzOptionContainerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzOptionContainerComponent)();
});
__publicField(_NzOptionContainerComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzOptionContainerComponent,
  selectors: [["nz-option-container"]],
  viewQuery: function NzOptionContainerComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(CdkVirtualScrollViewport, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.cdkVirtualScrollViewport = _t.first);
    }
  },
  hostAttrs: [1, "ant-select-dropdown"],
  inputs: {
    notFoundContent: "notFoundContent",
    menuItemSelectedIcon: "menuItemSelectedIcon",
    dropdownRender: "dropdownRender",
    activatedValue: "activatedValue",
    listOfSelectedValue: "listOfSelectedValue",
    compareWith: "compareWith",
    mode: "mode",
    matchWidth: "matchWidth",
    itemSize: "itemSize",
    maxItemLength: "maxItemLength",
    isMaxMultipleCountReached: "isMaxMultipleCountReached",
    listOfContainerItem: "listOfContainerItem"
  },
  outputs: {
    itemClick: "itemClick",
    scrollToBottom: "scrollToBottom"
  },
  exportAs: ["nzOptionContainer"],
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 5,
  vars: 14,
  consts: [[1, "ant-select-item-empty"], [3, "scrolledIndexChange", "itemSize", "maxBufferPx", "minBufferPx"], ["cdkVirtualFor", "", 3, "cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplateCacheSize"], [3, "ngTemplateOutlet"], ["nzComponentName", "select", 3, "specificContent"], [3, "nzLabel"], [3, "icon", "customContent", "template", "grouped", "disabled", "showState", "title", "label", "compareWith", "activatedValue", "listOfSelectedValue", "value"], [3, "itemHover", "itemClick", "icon", "customContent", "template", "grouped", "disabled", "showState", "title", "label", "compareWith", "activatedValue", "listOfSelectedValue", "value"]],
  template: function NzOptionContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div");
      \u0275\u0275conditionalCreate(1, NzOptionContainerComponent_Conditional_1_Template, 2, 1, "div", 0);
      \u0275\u0275elementStart(2, "cdk-virtual-scroll-viewport", 1);
      \u0275\u0275listener("scrolledIndexChange", function NzOptionContainerComponent_Template_cdk_virtual_scroll_viewport_scrolledIndexChange_2_listener($event) {
        return ctx.onScrolledIndexChange($event);
      });
      \u0275\u0275template(3, NzOptionContainerComponent_ng_template_3_Template, 2, 1, "ng-template", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, NzOptionContainerComponent_ng_template_4_Template, 0, 0, "ng-template", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.listOfContainerItem.length === 0 ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275styleProp("height", ctx.listOfContainerItem.length * ctx.itemSize, "px")("max-height", ctx.itemSize * ctx.maxItemLength, "px");
      \u0275\u0275classProp("full-width", !ctx.matchWidth);
      \u0275\u0275property("itemSize", ctx.itemSize)("maxBufferPx", ctx.itemSize * ctx.maxItemLength)("minBufferPx", ctx.itemSize * ctx.maxItemLength);
      \u0275\u0275advance();
      \u0275\u0275property("cdkVirtualForOf", ctx.listOfContainerItem)("cdkVirtualForTrackBy", ctx.trackValue)("cdkVirtualForTemplateCacheSize", 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngTemplateOutlet", ctx.dropdownRender);
    }
  },
  dependencies: [NzEmptyModule, NzEmbedEmptyComponent, NzOptionItemGroupComponent, NzOptionItemComponent, NgTemplateOutlet, OverlayModule, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, NzOverlayModule],
  encapsulation: 2,
  changeDetection: 0
}));
var NzOptionContainerComponent = _NzOptionContainerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzOptionContainerComponent, [{
    type: Component,
    args: [{
      selector: "nz-option-container",
      exportAs: "nzOptionContainer",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <div>
      @if (listOfContainerItem.length === 0) {
        <div class="ant-select-item-empty">
          <nz-embed-empty nzComponentName="select" [specificContent]="notFoundContent!" />
        </div>
      }
      <cdk-virtual-scroll-viewport
        [class.full-width]="!matchWidth"
        [itemSize]="itemSize"
        [maxBufferPx]="itemSize * maxItemLength"
        [minBufferPx]="itemSize * maxItemLength"
        (scrolledIndexChange)="onScrolledIndexChange($event)"
        [style.height.px]="listOfContainerItem.length * itemSize"
        [style.max-height.px]="itemSize * maxItemLength"
      >
        <ng-template
          cdkVirtualFor
          [cdkVirtualForOf]="listOfContainerItem"
          [cdkVirtualForTrackBy]="trackValue"
          [cdkVirtualForTemplateCacheSize]="0"
          let-item
        >
          @switch (item.type) {
            @case ('group') {
              <nz-option-item-group [nzLabel]="item.groupLabel ?? null" />
            }
            @case ('item') {
              <nz-option-item
                [icon]="menuItemSelectedIcon"
                [customContent]="item.nzCustomContent"
                [template]="item.template ?? null"
                [grouped]="!!item.groupLabel"
                [disabled]="
                  item.nzDisabled || (isMaxMultipleCountReached && !listOfSelectedValue.includes(item['nzValue']))
                "
                [showState]="mode === 'tags' || mode === 'multiple'"
                [title]="item.nzTitle"
                [label]="item.nzLabel"
                [compareWith]="compareWith"
                [activatedValue]="activatedValue"
                [listOfSelectedValue]="listOfSelectedValue"
                [value]="item.nzValue"
                (itemHover)="onItemHover($event)"
                (itemClick)="onItemClick($event)"
              />
            }
          }
        </ng-template>
      </cdk-virtual-scroll-viewport>
      <ng-template [ngTemplateOutlet]="dropdownRender" />
    </div>
  `,
      host: {
        class: "ant-select-dropdown"
      },
      imports: [NzEmptyModule, NzOptionItemGroupComponent, NzOptionItemComponent, NgTemplateOutlet, OverlayModule, NzOverlayModule]
    }]
  }], null, {
    notFoundContent: [{
      type: Input
    }],
    menuItemSelectedIcon: [{
      type: Input
    }],
    dropdownRender: [{
      type: Input
    }],
    activatedValue: [{
      type: Input
    }],
    listOfSelectedValue: [{
      type: Input
    }],
    compareWith: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    matchWidth: [{
      type: Input
    }],
    itemSize: [{
      type: Input
    }],
    maxItemLength: [{
      type: Input
    }],
    isMaxMultipleCountReached: [{
      type: Input
    }],
    listOfContainerItem: [{
      type: Input
    }],
    itemClick: [{
      type: Output
    }],
    scrollToBottom: [{
      type: Output
    }],
    cdkVirtualScrollViewport: [{
      type: ViewChild,
      args: [CdkVirtualScrollViewport, {
        static: true
      }]
    }]
  });
})();
var _NzOptionComponent = class _NzOptionComponent {
  constructor() {
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "nzOptionGroupComponent", inject(NzOptionGroupComponent, {
      optional: true
    }));
    __publicField(this, "changes", new Subject());
    __publicField(this, "groupLabel", null);
    __publicField(this, "template");
    __publicField(this, "nzTitle");
    __publicField(this, "nzLabel", null);
    __publicField(this, "nzValue", null);
    __publicField(this, "nzKey");
    __publicField(this, "nzDisabled", false);
    __publicField(this, "nzHide", false);
    __publicField(this, "nzCustomContent", false);
  }
  ngOnInit() {
    var _a;
    (_a = this.nzOptionGroupComponent) == null ? void 0 : _a.changes.pipe(startWith(true), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      var _a2;
      this.groupLabel = (_a2 = this.nzOptionGroupComponent) == null ? void 0 : _a2.nzLabel;
    });
  }
  ngOnChanges() {
    this.changes.next();
  }
};
__publicField(_NzOptionComponent, "\u0275fac", function NzOptionComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzOptionComponent)();
});
__publicField(_NzOptionComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzOptionComponent,
  selectors: [["nz-option"]],
  viewQuery: function NzOptionComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(TemplateRef, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.template = _t.first);
    }
  },
  inputs: {
    nzTitle: "nzTitle",
    nzLabel: "nzLabel",
    nzValue: "nzValue",
    nzKey: "nzKey",
    nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
    nzHide: [2, "nzHide", "nzHide", booleanAttribute],
    nzCustomContent: [2, "nzCustomContent", "nzCustomContent", booleanAttribute]
  },
  exportAs: ["nzOption"],
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c04,
  decls: 1,
  vars: 0,
  template: function NzOptionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domTemplate(0, NzOptionComponent_ng_template_0_Template, 1, 0, "ng-template");
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzOptionComponent = _NzOptionComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzOptionComponent, [{
    type: Component,
    args: [{
      selector: "nz-option",
      exportAs: "nzOption",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <ng-template>
      <ng-content />
    </ng-template>
  `
    }]
  }], null, {
    template: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }],
    nzTitle: [{
      type: Input
    }],
    nzLabel: [{
      type: Input
    }],
    nzValue: [{
      type: Input
    }],
    nzKey: [{
      type: Input
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzHide: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCustomContent: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzSelectArrowComponent = class _NzSelectArrowComponent {
  constructor() {
    __publicField(this, "listOfValue", []);
    __publicField(this, "loading", false);
    __publicField(this, "search", false);
    __publicField(this, "showArrow", false);
    __publicField(this, "isMaxMultipleCountSet", false);
    __publicField(this, "suffixIcon", null);
    __publicField(this, "feedbackIcon", null);
    __publicField(this, "nzMaxMultipleCount", Infinity);
  }
};
__publicField(_NzSelectArrowComponent, "\u0275fac", function NzSelectArrowComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSelectArrowComponent)();
});
__publicField(_NzSelectArrowComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSelectArrowComponent,
  selectors: [["nz-select-arrow"]],
  hostAttrs: [1, "ant-select-arrow"],
  hostVars: 2,
  hostBindings: function NzSelectArrowComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-select-arrow-loading", ctx.loading);
    }
  },
  inputs: {
    listOfValue: "listOfValue",
    loading: "loading",
    search: "search",
    showArrow: "showArrow",
    isMaxMultipleCountSet: "isMaxMultipleCountSet",
    suffixIcon: "suffixIcon",
    feedbackIcon: "feedbackIcon",
    nzMaxMultipleCount: [2, "nzMaxMultipleCount", "nzMaxMultipleCount", numberAttributeWithInfinityFallback]
  },
  decls: 4,
  vars: 3,
  consts: [["nzType", "loading"], [4, "nzStringTemplateOutlet"], ["nzType", "search"], ["nzType", "down"], [3, "nzType"]],
  template: function NzSelectArrowComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzSelectArrowComponent_Conditional_0_Template, 2, 2, "span");
      \u0275\u0275conditionalCreate(1, NzSelectArrowComponent_Conditional_1_Template, 1, 0, "nz-icon", 0)(2, NzSelectArrowComponent_Conditional_2_Template, 2, 1);
      \u0275\u0275template(3, NzSelectArrowComponent_ng_container_3_Template, 2, 1, "ng-container", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.isMaxMultipleCountSet ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 1 : 2);
      \u0275\u0275advance(2);
      \u0275\u0275property("nzStringTemplateOutlet", ctx.feedbackIcon);
    }
  },
  dependencies: [NzIconModule, NzIconDirective, NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzSelectArrowComponent = _NzSelectArrowComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSelectArrowComponent, [{
    type: Component,
    args: [{
      selector: "nz-select-arrow",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (isMaxMultipleCountSet) {
      <span>{{ listOfValue.length }} / {{ nzMaxMultipleCount }}</span>
    }
    @if (loading) {
      <nz-icon nzType="loading" />
    } @else {
      @if (showArrow && !suffixIcon) {
        @if (search) {
          <nz-icon nzType="search" />
        } @else {
          <nz-icon nzType="down" />
        }
      } @else {
        <ng-container *nzStringTemplateOutlet="suffixIcon; let suffixIcon">
          <nz-icon [nzType]="suffixIcon" />
        </ng-container>
      }
    }
    <ng-container *nzStringTemplateOutlet="feedbackIcon">{{ feedbackIcon }}</ng-container>
  `,
      host: {
        class: "ant-select-arrow",
        "[class.ant-select-arrow-loading]": "loading"
      },
      imports: [NzIconModule, NzOutletModule]
    }]
  }], null, {
    listOfValue: [{
      type: Input
    }],
    loading: [{
      type: Input
    }],
    search: [{
      type: Input
    }],
    showArrow: [{
      type: Input
    }],
    isMaxMultipleCountSet: [{
      type: Input
    }],
    suffixIcon: [{
      type: Input
    }],
    feedbackIcon: [{
      type: Input
    }],
    nzMaxMultipleCount: [{
      type: Input,
      args: [{
        transform: numberAttributeWithInfinityFallback
      }]
    }]
  });
})();
var _NzSelectClearComponent = class _NzSelectClearComponent {
  constructor() {
    __publicField(this, "clearIcon", null);
    __publicField(this, "clear", new EventEmitter());
  }
  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.clear.emit(e);
  }
};
__publicField(_NzSelectClearComponent, "\u0275fac", function NzSelectClearComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSelectClearComponent)();
});
__publicField(_NzSelectClearComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSelectClearComponent,
  selectors: [["nz-select-clear"]],
  hostAttrs: [1, "ant-select-clear"],
  hostBindings: function NzSelectClearComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function NzSelectClearComponent_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
  },
  inputs: {
    clearIcon: "clearIcon"
  },
  outputs: {
    clear: "clear"
  },
  decls: 2,
  vars: 1,
  consts: [[3, "ngTemplateOutlet"], ["nzType", "close-circle", "nzTheme", "fill", 1, "ant-select-close-icon"]],
  template: function NzSelectClearComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzSelectClearComponent_Conditional_0_Template, 1, 1, null, 0)(1, NzSelectClearComponent_Conditional_1_Template, 1, 0, "nz-icon", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.clearIcon ? 0 : 1);
    }
  },
  dependencies: [NgTemplateOutlet, NzIconModule, NzIconDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzSelectClearComponent = _NzSelectClearComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSelectClearComponent, [{
    type: Component,
    args: [{
      selector: "nz-select-clear",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (clearIcon) {
      <ng-template [ngTemplateOutlet]="clearIcon" />
    } @else {
      <nz-icon nzType="close-circle" nzTheme="fill" class="ant-select-close-icon" />
    }
  `,
      host: {
        class: "ant-select-clear",
        "(click)": "onClick($event)"
      },
      imports: [NgTemplateOutlet, NzIconModule]
    }]
  }], null, {
    clearIcon: [{
      type: Input
    }],
    clear: [{
      type: Output
    }]
  });
})();
var _NzSelectItemComponent = class _NzSelectItemComponent {
  constructor() {
    __publicField(this, "disabled", false);
    __publicField(this, "label", null);
    /**
     * @internal Internally used, please do not use it directly.
     * @description Whether the label is in HTML format.
     */
    __publicField(this, "displayLabelInHtml", false);
    __publicField(this, "deletable", false);
    __publicField(this, "removeIcon", null);
    __publicField(this, "contentTemplateOutletContext", null);
    __publicField(this, "contentTemplateOutlet", null);
    __publicField(this, "delete", new EventEmitter());
  }
  get templateOutletContext() {
    return __spreadValues({
      $implicit: this.contentTemplateOutletContext
    }, this.contentTemplateOutletContext);
  }
  onDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.disabled) {
      this.delete.next(e);
    }
  }
};
__publicField(_NzSelectItemComponent, "\u0275fac", function NzSelectItemComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSelectItemComponent)();
});
__publicField(_NzSelectItemComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSelectItemComponent,
  selectors: [["nz-select-item"]],
  hostAttrs: [1, "ant-select-selection-item"],
  hostVars: 3,
  hostBindings: function NzSelectItemComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275attribute("title", ctx.label);
      \u0275\u0275classProp("ant-select-selection-item-disabled", ctx.disabled);
    }
  },
  inputs: {
    disabled: [2, "disabled", "disabled", booleanAttribute],
    label: "label",
    displayLabelInHtml: [2, "displayLabelInHtml", "displayLabelInHtml", booleanAttribute],
    deletable: [2, "deletable", "deletable", booleanAttribute],
    removeIcon: "removeIcon",
    contentTemplateOutletContext: "contentTemplateOutletContext",
    contentTemplateOutlet: "contentTemplateOutlet"
  },
  outputs: {
    delete: "delete"
  },
  decls: 2,
  vars: 3,
  consts: [[4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [1, "ant-select-selection-item-remove"], [3, "ant-select-selection-item-content", "innerHTML"], [3, "ant-select-selection-item-content"], [3, "innerHTML"], [1, "ant-select-selection-item-remove", 3, "click"], ["nzType", "close"], [3, "ngTemplateOutlet"]],
  template: function NzSelectItemComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzSelectItemComponent_ng_container_0_Template, 3, 1, "ng-container", 0);
      \u0275\u0275conditionalCreate(1, NzSelectItemComponent_Conditional_1_Template, 3, 1, "span", 1);
    }
    if (rf & 2) {
      \u0275\u0275property("nzStringTemplateOutlet", ctx.contentTemplateOutlet)("nzStringTemplateOutletContext", ctx.templateOutletContext);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.deletable && !ctx.disabled ? 1 : -1);
    }
  },
  dependencies: [NgTemplateOutlet, NzOutletModule, NzStringTemplateOutletDirective, NzIconModule, NzIconDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzSelectItemComponent = _NzSelectItemComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSelectItemComponent, [{
    type: Component,
    args: [{
      selector: "nz-select-item",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <ng-container *nzStringTemplateOutlet="contentTemplateOutlet; context: templateOutletContext">
      @if (displayLabelInHtml) {
        <span [class.ant-select-selection-item-content]="deletable" [innerHTML]="label"></span>
      } @else {
        <span [class.ant-select-selection-item-content]="deletable">{{ label }}</span>
      }
    </ng-container>
    @if (deletable && !disabled) {
      <span class="ant-select-selection-item-remove" (click)="onDelete($event)">
        @if (!removeIcon) {
          <nz-icon nzType="close" />
        } @else {
          <ng-template [ngTemplateOutlet]="removeIcon" />
        }
      </span>
    }
  `,
      host: {
        class: "ant-select-selection-item",
        "[attr.title]": "label",
        "[class.ant-select-selection-item-disabled]": "disabled"
      },
      imports: [NgTemplateOutlet, NzOutletModule, NzIconModule]
    }]
  }], null, {
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    label: [{
      type: Input
    }],
    displayLabelInHtml: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    deletable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    removeIcon: [{
      type: Input
    }],
    contentTemplateOutletContext: [{
      type: Input
    }],
    contentTemplateOutlet: [{
      type: Input
    }],
    delete: [{
      type: Output
    }]
  });
})();
var _NzSelectPlaceholderComponent = class _NzSelectPlaceholderComponent {
  constructor() {
    __publicField(this, "placeholder", null);
  }
};
__publicField(_NzSelectPlaceholderComponent, "\u0275fac", function NzSelectPlaceholderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSelectPlaceholderComponent)();
});
__publicField(_NzSelectPlaceholderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSelectPlaceholderComponent,
  selectors: [["nz-select-placeholder"]],
  hostAttrs: [1, "ant-select-selection-placeholder"],
  inputs: {
    placeholder: "placeholder"
  },
  decls: 1,
  vars: 1,
  consts: [[4, "nzStringTemplateOutlet"]],
  template: function NzSelectPlaceholderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzSelectPlaceholderComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("nzStringTemplateOutlet", ctx.placeholder);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzSelectPlaceholderComponent = _NzSelectPlaceholderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSelectPlaceholderComponent, [{
    type: Component,
    args: [{
      selector: "nz-select-placeholder",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <ng-container *nzStringTemplateOutlet="placeholder">
      {{ placeholder }}
    </ng-container>
  `,
      host: {
        class: "ant-select-selection-placeholder"
      },
      imports: [NzOutletModule]
    }]
  }], null, {
    placeholder: [{
      type: Input
    }]
  });
})();
var _NzSelectSearchComponent = class _NzSelectSearchComponent {
  constructor() {
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "renderer", inject(Renderer2));
    __publicField(this, "focusMonitor", inject(FocusMonitor));
    __publicField(this, "nzId", null);
    __publicField(this, "disabled", false);
    __publicField(this, "mirrorSync", false);
    __publicField(this, "showInput", true);
    __publicField(this, "focusTrigger", false);
    __publicField(this, "value", "");
    __publicField(this, "autofocus", false);
    __publicField(this, "valueChange", new EventEmitter());
    __publicField(this, "isComposingChange", new EventEmitter());
    __publicField(this, "inputElement");
    __publicField(this, "mirrorElement");
    afterNextRender(() => {
      if (this.mirrorSync) {
        this.syncMirrorWidth();
      }
      if (this.autofocus) {
        this.focus();
      }
    });
  }
  setCompositionState(isComposing) {
    this.isComposingChange.next(isComposing);
  }
  onValueChange(value) {
    this.value = value;
    this.valueChange.next(value);
    if (this.mirrorSync) {
      this.syncMirrorWidth();
    }
  }
  clearInputValue() {
    const inputDOM = this.inputElement.nativeElement;
    inputDOM.value = "";
    this.onValueChange("");
  }
  syncMirrorWidth() {
    const mirrorDOM = this.mirrorElement.nativeElement;
    const hostDOM = this.elementRef.nativeElement;
    const inputDOM = this.inputElement.nativeElement;
    this.renderer.removeStyle(hostDOM, "width");
    this.renderer.setProperty(mirrorDOM, "textContent", `${inputDOM.value}\xA0`);
    this.renderer.setStyle(hostDOM, "width", `${mirrorDOM.scrollWidth}px`);
  }
  focus() {
    this.focusMonitor.focusVia(this.inputElement, "keyboard");
  }
  blur() {
    this.inputElement.nativeElement.blur();
  }
  ngOnChanges(changes) {
    const inputDOM = this.inputElement.nativeElement;
    const {
      focusTrigger,
      showInput
    } = changes;
    if (showInput) {
      if (this.showInput) {
        this.renderer.removeAttribute(inputDOM, "readonly");
      } else {
        this.renderer.setAttribute(inputDOM, "readonly", "readonly");
      }
    }
    if (focusTrigger && focusTrigger.currentValue === true && focusTrigger.previousValue === false) {
      inputDOM.focus();
    }
  }
};
__publicField(_NzSelectSearchComponent, "\u0275fac", function NzSelectSearchComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSelectSearchComponent)();
});
__publicField(_NzSelectSearchComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSelectSearchComponent,
  selectors: [["nz-select-search"]],
  viewQuery: function NzSelectSearchComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c13, 7)(_c23, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.inputElement = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.mirrorElement = _t.first);
    }
  },
  hostAttrs: [1, "ant-select-selection-search"],
  hostVars: 2,
  hostBindings: function NzSelectSearchComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("width", ctx.mirrorSync ? 0 : null, "px");
    }
  },
  inputs: {
    nzId: "nzId",
    disabled: "disabled",
    mirrorSync: "mirrorSync",
    showInput: "showInput",
    focusTrigger: "focusTrigger",
    value: "value",
    autofocus: "autofocus"
  },
  outputs: {
    valueChange: "valueChange",
    isComposingChange: "isComposingChange"
  },
  features: [\u0275\u0275ProvidersFeature([{
    provide: COMPOSITION_BUFFER_MODE,
    useValue: false
  }]), \u0275\u0275NgOnChangesFeature],
  decls: 3,
  vars: 7,
  consts: [["inputElement", ""], ["mirrorElement", ""], ["autocomplete", "off", 1, "ant-select-selection-search-input", 3, "ngModelChange", "compositionstart", "compositionend", "ngModel", "disabled"], [1, "ant-select-selection-search-mirror"]],
  template: function NzSelectSearchComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "input", 2, 0);
      \u0275\u0275listener("ngModelChange", function NzSelectSearchComponent_Template_input_ngModelChange_0_listener($event) {
        return ctx.onValueChange($event);
      })("compositionstart", function NzSelectSearchComponent_Template_input_compositionstart_0_listener() {
        return ctx.setCompositionState(true);
      })("compositionend", function NzSelectSearchComponent_Template_input_compositionend_0_listener() {
        return ctx.setCompositionState(false);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(2, NzSelectSearchComponent_Conditional_2_Template, 2, 0, "span", 3);
    }
    if (rf & 2) {
      \u0275\u0275styleProp("opacity", ctx.showInput ? null : 0);
      \u0275\u0275property("ngModel", ctx.value)("disabled", ctx.disabled);
      \u0275\u0275attribute("id", ctx.nzId)("autofocus", ctx.autofocus ? "autofocus" : null);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.mirrorSync ? 2 : -1);
    }
  },
  dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel],
  encapsulation: 2,
  changeDetection: 0
}));
var NzSelectSearchComponent = _NzSelectSearchComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSelectSearchComponent, [{
    type: Component,
    args: [{
      selector: "nz-select-search",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <input
      #inputElement
      [attr.id]="nzId"
      autocomplete="off"
      class="ant-select-selection-search-input"
      [ngModel]="value"
      [attr.autofocus]="autofocus ? 'autofocus' : null"
      [disabled]="disabled"
      [style.opacity]="showInput ? null : 0"
      (ngModelChange)="onValueChange($event)"
      (compositionstart)="setCompositionState(true)"
      (compositionend)="setCompositionState(false)"
    />
    @if (mirrorSync) {
      <span #mirrorElement class="ant-select-selection-search-mirror"></span>
    }
  `,
      host: {
        class: "ant-select-selection-search",
        "[style.width.px]": "mirrorSync ? 0 : null"
      },
      providers: [{
        provide: COMPOSITION_BUFFER_MODE,
        useValue: false
      }],
      imports: [FormsModule]
    }]
  }], () => [], {
    nzId: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    mirrorSync: [{
      type: Input
    }],
    showInput: [{
      type: Input
    }],
    focusTrigger: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    autofocus: [{
      type: Input
    }],
    valueChange: [{
      type: Output
    }],
    isComposingChange: [{
      type: Output
    }],
    inputElement: [{
      type: ViewChild,
      args: ["inputElement", {
        static: true
      }]
    }],
    mirrorElement: [{
      type: ViewChild,
      args: ["mirrorElement", {
        static: false
      }]
    }]
  });
})();
var _NzSelectTopControlComponent = class _NzSelectTopControlComponent {
  constructor() {
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "noAnimation", inject(NzNoAnimationDirective, {
      host: true,
      optional: true
    }));
    __publicField(this, "nzId", null);
    __publicField(this, "showSearch", false);
    __publicField(this, "placeHolder", null);
    __publicField(this, "open", false);
    __publicField(this, "maxTagCount", Infinity);
    __publicField(this, "autofocus", false);
    __publicField(this, "disabled", false);
    __publicField(this, "mode", "default");
    __publicField(this, "customTemplate", null);
    __publicField(this, "maxTagPlaceholder", null);
    __publicField(this, "removeIcon", null);
    __publicField(this, "listOfTopItem", []);
    __publicField(this, "tokenSeparators", []);
    __publicField(this, "prefix", null);
    __publicField(this, "tokenize", new EventEmitter());
    __publicField(this, "inputValueChange", new EventEmitter());
    __publicField(this, "deleteItem", new EventEmitter());
    __publicField(this, "nzSelectSearchComponent");
    __publicField(this, "listOfSlicedItem", []);
    __publicField(this, "isShowPlaceholder", true);
    __publicField(this, "isShowSingleLabel", false);
    __publicField(this, "isComposing", false);
    __publicField(this, "inputValue", null);
  }
  updateTemplateVariable() {
    const isSelectedValueEmpty = this.listOfTopItem.length === 0;
    this.isShowPlaceholder = isSelectedValueEmpty && !this.isComposing && !this.inputValue;
    this.isShowSingleLabel = !isSelectedValueEmpty && !this.isComposing && !this.inputValue;
  }
  isComposingChange(isComposing) {
    this.isComposing = isComposing;
    this.updateTemplateVariable();
  }
  onInputValueChange(value) {
    if (value !== this.inputValue) {
      this.inputValue = value;
      this.updateTemplateVariable();
      this.inputValueChange.emit(value);
      this.tokenSeparate(value, this.tokenSeparators);
    }
  }
  tokenSeparate(inputValue, tokenSeparators) {
    const includesSeparators = (str, separators) => {
      for (let i = 0; i < separators.length; ++i) {
        if (str.lastIndexOf(separators[i]) > 0) {
          return true;
        }
      }
      return false;
    };
    const splitBySeparators = (str, separators) => {
      const reg = new RegExp(`[${separators.join()}]`);
      const array = str.split(reg).filter((token) => token);
      return [...new Set(array)];
    };
    if (inputValue && inputValue.length && tokenSeparators.length && this.mode !== "default" && includesSeparators(inputValue, tokenSeparators)) {
      const listOfLabel = splitBySeparators(inputValue, tokenSeparators);
      this.tokenize.next(listOfLabel);
    }
  }
  clearInputValue() {
    var _a;
    (_a = this.nzSelectSearchComponent) == null ? void 0 : _a.clearInputValue();
  }
  focus() {
    var _a;
    (_a = this.nzSelectSearchComponent) == null ? void 0 : _a.focus();
  }
  blur() {
    var _a;
    (_a = this.nzSelectSearchComponent) == null ? void 0 : _a.blur();
  }
  onDeleteItem(item) {
    if (!this.disabled && !item.nzDisabled) {
      this.deleteItem.next(item);
    }
  }
  ngOnChanges(changes) {
    const {
      listOfTopItem,
      maxTagCount,
      customTemplate,
      maxTagPlaceholder
    } = changes;
    if (listOfTopItem) {
      this.updateTemplateVariable();
    }
    if (listOfTopItem || maxTagCount || customTemplate || maxTagPlaceholder) {
      const listOfSlicedItem = this.listOfTopItem.slice(0, this.maxTagCount).map((o) => ({
        nzLabel: o.nzLabel,
        nzValue: o.nzValue,
        nzDisabled: o.nzDisabled,
        contentTemplateOutlet: this.customTemplate,
        contentTemplateOutletContext: o
      }));
      if (this.listOfTopItem.length > this.maxTagCount) {
        const exceededLabel = `+ ${this.listOfTopItem.length - this.maxTagCount} ...`;
        const listOfSelectedValue = this.listOfTopItem.map((item) => item.nzValue);
        const exceededItem = {
          nzLabel: exceededLabel,
          nzValue: "$$__nz_exceeded_item",
          nzDisabled: true,
          contentTemplateOutlet: this.maxTagPlaceholder,
          contentTemplateOutletContext: listOfSelectedValue.slice(this.maxTagCount)
        };
        listOfSlicedItem.push(exceededItem);
      }
      this.listOfSlicedItem = listOfSlicedItem;
    }
  }
  ngOnInit() {
    fromEventOutsideAngular(this.elementRef.nativeElement, "click").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event.target !== this.nzSelectSearchComponent.inputElement.nativeElement) {
        this.nzSelectSearchComponent.focus();
      }
    });
    fromEventOutsideAngular(this.elementRef.nativeElement, "keydown").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event.target instanceof HTMLInputElement) {
        const inputValue = event.target.value;
        if (event.keyCode === BACKSPACE && this.mode !== "default" && !inputValue && this.listOfTopItem.length > 0) {
          event.preventDefault();
          this.ngZone.run(() => this.onDeleteItem(this.listOfTopItem[this.listOfTopItem.length - 1]));
        }
      }
    });
  }
};
__publicField(_NzSelectTopControlComponent, "\u0275fac", function NzSelectTopControlComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSelectTopControlComponent)();
});
__publicField(_NzSelectTopControlComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSelectTopControlComponent,
  selectors: [["nz-select-top-control"]],
  viewQuery: function NzSelectTopControlComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(NzSelectSearchComponent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzSelectSearchComponent = _t.first);
    }
  },
  hostAttrs: [1, "ant-select-selector"],
  inputs: {
    nzId: "nzId",
    showSearch: "showSearch",
    placeHolder: "placeHolder",
    open: "open",
    maxTagCount: [2, "maxTagCount", "maxTagCount", numberAttribute],
    autofocus: "autofocus",
    disabled: "disabled",
    mode: "mode",
    customTemplate: "customTemplate",
    maxTagPlaceholder: "maxTagPlaceholder",
    removeIcon: "removeIcon",
    listOfTopItem: "listOfTopItem",
    tokenSeparators: "tokenSeparators",
    prefix: "prefix"
  },
  outputs: {
    tokenize: "tokenize",
    inputValueChange: "inputValueChange",
    deleteItem: "deleteItem"
  },
  exportAs: ["nzSelectTopControl"],
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 5,
  vars: 3,
  consts: [[1, "ant-select-prefix"], [1, "ant-select-selection-wrap"], [1, "ant-select-selection-overflow"], [3, "placeholder"], [4, "nzStringTemplateOutlet"], [3, "isComposingChange", "valueChange", "nzId", "disabled", "value", "showInput", "mirrorSync", "autofocus", "focusTrigger"], [3, "removeIcon", "label", "contentTemplateOutlet", "contentTemplateOutletContext"], [1, "ant-select-selection-overflow-item"], [1, "ant-select-selection-overflow-item", "ant-select-selection-overflow-item-suffix"], [3, "isComposingChange", "valueChange", "nzId", "disabled", "value", "autofocus", "showInput", "mirrorSync", "focusTrigger"], ["deletable", "", 3, "delete", "removeIcon", "label", "disabled", "contentTemplateOutlet", "contentTemplateOutletContext"]],
  template: function NzSelectTopControlComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzSelectTopControlComponent_Conditional_0_Template, 2, 1, "div", 0);
      \u0275\u0275elementStart(1, "span", 1);
      \u0275\u0275conditionalCreate(2, NzSelectTopControlComponent_Case_2_Template, 2, 8)(3, NzSelectTopControlComponent_Case_3_Template, 5, 7, "div", 2);
      \u0275\u0275conditionalCreate(4, NzSelectTopControlComponent_Conditional_4_Template, 1, 1, "nz-select-placeholder", 3);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      \u0275\u0275conditional(ctx.prefix ? 0 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_1_0 = ctx.mode) === "default" ? 2 : 3);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isShowPlaceholder ? 4 : -1);
    }
  },
  dependencies: [NzSelectSearchComponent, NzSelectItemComponent, NzSelectPlaceholderComponent, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzSelectTopControlComponent = _NzSelectTopControlComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSelectTopControlComponent, [{
    type: Component,
    args: [{
      selector: "nz-select-top-control",
      exportAs: "nzSelectTopControl",
      imports: [NzSelectSearchComponent, NzSelectItemComponent, NzSelectPlaceholderComponent, NzStringTemplateOutletDirective],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @if (prefix) {
      <div class="ant-select-prefix">
        <ng-container *nzStringTemplateOutlet="prefix">{{ prefix }}</ng-container>
      </div>
    }
    <span class="ant-select-selection-wrap">
      <!--single mode-->
      @switch (mode) {
        @case ('default') {
          <nz-select-search
            [nzId]="nzId"
            [disabled]="disabled"
            [value]="inputValue!"
            [showInput]="showSearch"
            [mirrorSync]="false"
            [autofocus]="autofocus"
            [focusTrigger]="open"
            (isComposingChange)="isComposingChange($event)"
            (valueChange)="onInputValueChange($event)"
          />
          @if (isShowSingleLabel) {
            <nz-select-item
              [removeIcon]="removeIcon"
              [label]="listOfTopItem[0].nzLabel"
              [contentTemplateOutlet]="customTemplate"
              [contentTemplateOutletContext]="listOfTopItem[0]"
            />
          }
        }
        @default {
          <div class="ant-select-selection-overflow">
            <!--multiple or tags mode-->
            @for (item of listOfSlicedItem; track item.nzValue) {
              <div class="ant-select-selection-overflow-item">
                <nz-select-item
                  [removeIcon]="removeIcon"
                  [label]="item.nzLabel"
                  [disabled]="item.nzDisabled || disabled"
                  [contentTemplateOutlet]="item.contentTemplateOutlet"
                  deletable
                  [contentTemplateOutletContext]="item.contentTemplateOutletContext"
                  (delete)="onDeleteItem(item.contentTemplateOutletContext)"
                />
              </div>
            }
            <div class="ant-select-selection-overflow-item ant-select-selection-overflow-item-suffix">
              <nz-select-search
                [nzId]="nzId"
                [disabled]="disabled"
                [value]="inputValue!"
                [autofocus]="autofocus"
                [showInput]="true"
                [mirrorSync]="true"
                [focusTrigger]="open"
                (isComposingChange)="isComposingChange($event)"
                (valueChange)="onInputValueChange($event)"
              />
            </div>
          </div>
        }
      }
      @if (isShowPlaceholder) {
        <nz-select-placeholder [placeholder]="placeHolder" />
      }
    </span>
  `,
      host: {
        class: "ant-select-selector"
      }
    }]
  }], null, {
    nzId: [{
      type: Input
    }],
    showSearch: [{
      type: Input
    }],
    placeHolder: [{
      type: Input
    }],
    open: [{
      type: Input
    }],
    maxTagCount: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    autofocus: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    customTemplate: [{
      type: Input
    }],
    maxTagPlaceholder: [{
      type: Input
    }],
    removeIcon: [{
      type: Input
    }],
    listOfTopItem: [{
      type: Input
    }],
    tokenSeparators: [{
      type: Input
    }],
    prefix: [{
      type: Input
    }],
    tokenize: [{
      type: Output
    }],
    inputValueChange: [{
      type: Output
    }],
    deleteItem: [{
      type: Output
    }],
    nzSelectSearchComponent: [{
      type: ViewChild,
      args: [NzSelectSearchComponent]
    }]
  });
})();
var defaultFilterOption = (searchValue, item) => {
  if (item && item.nzLabel) {
    return item.nzLabel.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  } else {
    return false;
  }
};
var NZ_CONFIG_MODULE_NAME = "select";
var NzSelectComponent = (() => {
  var _a;
  let _nzVariant_decorators;
  let _nzVariant_initializers = [];
  let _nzVariant_extraInitializers = [];
  let _nzOptionHeightPx_decorators;
  let _nzOptionHeightPx_initializers = [];
  let _nzOptionHeightPx_extraInitializers = [];
  let _nzSuffixIcon_decorators;
  let _nzSuffixIcon_initializers = [];
  let _nzSuffixIcon_extraInitializers = [];
  let _nzBackdrop_decorators;
  let _nzBackdrop_initializers = [];
  let _nzBackdrop_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME);
      __publicField(this, "ngZone", inject(NgZone));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "host", inject(ElementRef));
      __publicField(this, "renderer", inject(Renderer2));
      __publicField(this, "platform", inject(Platform));
      __publicField(this, "focusMonitor", inject(FocusMonitor));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "noAnimation", inject(NzNoAnimationDirective, {
        host: true,
        optional: true
      }));
      __publicField(this, "nzFormStatusService", inject(NzFormStatusService, {
        optional: true
      }));
      __publicField(this, "nzFormNoStatusService", inject(NzFormNoStatusService, {
        optional: true
      }));
      __publicField(this, "nzId", null);
      __publicField(this, "nzSize", "default");
      __publicField(this, "nzStatus", "");
      __publicField(this, "nzVariant", __runInitializers(this, _nzVariant_initializers, void 0));
      __publicField(this, "nzOptionHeightPx", (__runInitializers(this, _nzVariant_extraInitializers), __runInitializers(this, _nzOptionHeightPx_initializers, 32)));
      __publicField(this, "nzOptionOverflowSize", (__runInitializers(this, _nzOptionHeightPx_extraInitializers), 8));
      __publicField(this, "nzDropdownClassName", null);
      __publicField(this, "nzDropdownMatchSelectWidth", true);
      __publicField(this, "nzDropdownStyle", null);
      __publicField(this, "nzNotFoundContent");
      __publicField(this, "nzPlaceHolder", null);
      __publicField(this, "nzPlacement", null);
      __publicField(this, "nzMaxTagCount", Infinity);
      __publicField(this, "nzDropdownRender", null);
      __publicField(this, "nzCustomTemplate", null);
      __publicField(this, "nzPrefix", null);
      __publicField(this, "nzSuffixIcon", __runInitializers(this, _nzSuffixIcon_initializers, null));
      __publicField(this, "nzClearIcon", (__runInitializers(this, _nzSuffixIcon_extraInitializers), null));
      __publicField(this, "nzRemoveIcon", null);
      __publicField(this, "nzMenuItemSelectedIcon", null);
      __publicField(this, "nzTokenSeparators", []);
      __publicField(this, "nzMaxTagPlaceholder", null);
      __publicField(this, "nzMaxMultipleCount", Infinity);
      __publicField(this, "nzMode", "default");
      __publicField(this, "nzFilterOption", defaultFilterOption);
      __publicField(this, "compareWith", (o1, o2) => o1 === o2);
      __publicField(this, "nzAllowClear", false);
      __publicField(this, "nzShowSearch", false);
      __publicField(this, "nzLoading", false);
      __publicField(this, "nzAutoFocus", false);
      __publicField(this, "nzAutoClearSearchValue", true);
      __publicField(this, "nzServerSearch", false);
      __publicField(this, "nzDisabled", false);
      __publicField(this, "nzOpen", false);
      __publicField(this, "nzSelectOnTab", false);
      __publicField(this, "nzBackdrop", __runInitializers(this, _nzBackdrop_initializers, false));
      __publicField(this, "nzOptions", (__runInitializers(this, _nzBackdrop_extraInitializers), []));
      __publicField(this, "nzShowArrow", true);
      __publicField(this, "nzOnSearch", new EventEmitter());
      __publicField(this, "nzScrollToBottom", new EventEmitter());
      __publicField(this, "nzOpenChange", new EventEmitter());
      __publicField(this, "nzBlur", new EventEmitter());
      __publicField(this, "nzFocus", new EventEmitter());
      __publicField(this, "nzOnClear", output());
      __publicField(this, "originElement");
      __publicField(this, "cdkConnectedOverlay");
      __publicField(this, "nzSelectTopControlComponent");
      __publicField(this, "listOfNzOptionComponent");
      __publicField(this, "listOfNzOptionGroupComponent");
      __publicField(this, "nzOptionGroupComponentElement");
      __publicField(this, "nzSelectTopControlComponentElement");
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
        return this.variant() || ((_a2 = this.formVariant) == null ? void 0 : _a2.call(this)) || "outlined";
      }, ...ngDevMode ? [{
        debugName: "finalVariant"
      }] : []));
      __publicField(this, "size", signal(this.nzSize, ...ngDevMode ? [{
        debugName: "size"
      }] : []));
      __publicField(this, "variant", signal(this.nzVariant, ...ngDevMode ? [{
        debugName: "variant"
      }] : []));
      __publicField(this, "formSize", inject(NZ_FORM_SIZE, {
        optional: true
      }));
      __publicField(this, "formVariant", inject(NZ_FORM_VARIANT, {
        optional: true
      }));
      __publicField(this, "compactSize", inject(NZ_SPACE_COMPACT_SIZE, {
        optional: true
      }));
      __publicField(this, "listOfValue$", new BehaviorSubject([]));
      __publicField(this, "listOfTemplateItem$", new BehaviorSubject([]));
      __publicField(this, "listOfTagAndTemplateItem", []);
      __publicField(this, "searchValue", "");
      __publicField(this, "isReactiveDriven", false);
      __publicField(this, "value");
      __publicField(this, "requestId", -1);
      __publicField(this, "isNzDisableFirstChange", true);
      __publicField(this, "onChange", () => {
      });
      __publicField(this, "onTouched", () => {
      });
      __publicField(this, "dropdownPosition", "bottomLeft");
      __publicField(this, "triggerWidth", null);
      __publicField(this, "listOfContainerItem", []);
      __publicField(this, "listOfTopItem", []);
      __publicField(this, "activatedValue", null);
      __publicField(this, "listOfValue", []);
      __publicField(this, "focused", false);
      __publicField(this, "dir", inject(Directionality).valueSignal);
      __publicField(this, "positions", []);
      __publicField(this, "selectAnimationEnter", slideAnimationEnter());
      __publicField(this, "selectAnimationLeave", slideAnimationLeave());
      // status
      __publicField(this, "prefixCls", "ant-select");
      __publicField(this, "statusCls", {});
      __publicField(this, "status", "");
      __publicField(this, "hasFeedback", false);
      this.destroyRef.onDestroy(() => {
        cancelAnimationFrame(this.requestId);
        this.focusMonitor.stopMonitoring(this.host);
      });
      onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME, () => {
        this.size.set(this.nzSize);
        this.cdr.markForCheck();
      });
    }
    get showArrow() {
      return this.nzShowArrow || !!this.nzSuffixIcon;
    }
    get isMultiple() {
      return this.nzMode === "multiple" || this.nzMode === "tags";
    }
    get isMaxMultipleCountSet() {
      return this.isMultiple && this.nzMaxMultipleCount !== Infinity;
    }
    get isMaxMultipleCountReached() {
      return this.nzMaxMultipleCount !== Infinity && this.listOfValue.length === this.nzMaxMultipleCount;
    }
    generateTagItem(value) {
      return {
        nzValue: value,
        nzLabel: value,
        type: "item"
      };
    }
    onItemClick(value) {
      this.activatedValue = value;
      if (this.nzMode === "default") {
        if (this.listOfValue.length === 0 || !this.compareWith(this.listOfValue[0], value)) {
          this.updateListOfValue([value]);
        }
        this.setOpenState(false);
      } else {
        const targetIndex = this.listOfValue.findIndex((o) => this.compareWith(o, value));
        if (targetIndex !== -1) {
          const listOfValueAfterRemoved = this.listOfValue.filter((_, i) => i !== targetIndex);
          this.updateListOfValue(listOfValueAfterRemoved);
        } else if (this.listOfValue.length < this.nzMaxMultipleCount) {
          const listOfValueAfterAdded = [...this.listOfValue, value];
          this.updateListOfValue(listOfValueAfterAdded);
        }
        this.focus();
        if (this.nzAutoClearSearchValue) {
          this.clearInput();
        }
      }
    }
    onItemDelete(item) {
      const listOfSelectedValue = this.listOfValue.filter((v) => !this.compareWith(v, item.nzValue));
      this.updateListOfValue(listOfSelectedValue);
      this.clearInput();
    }
    updateListOfContainerItem() {
      let listOfContainerItem = this.listOfTagAndTemplateItem.filter((item) => !item.nzHide).filter((item) => {
        if (!this.nzServerSearch && this.searchValue) {
          return this.nzFilterOption(this.searchValue, item);
        } else {
          return true;
        }
      });
      if (this.nzMode === "tags" && this.searchValue) {
        const matchedItem = this.listOfTagAndTemplateItem.find((item) => item.nzLabel === this.searchValue);
        if (!matchedItem) {
          const tagItem = this.generateTagItem(this.searchValue);
          listOfContainerItem = [tagItem, ...listOfContainerItem];
          this.activatedValue = tagItem.nzValue;
        } else {
          this.activatedValue = matchedItem.nzValue;
        }
      }
      const activatedItem = listOfContainerItem.find((item) => item.nzLabel === this.searchValue) || listOfContainerItem.find((item) => this.compareWith(item.nzValue, this.activatedValue)) || listOfContainerItem.find((item) => this.compareWith(item.nzValue, this.listOfValue[0])) || listOfContainerItem[0];
      this.activatedValue = activatedItem && activatedItem.nzValue || null;
      let listOfGroupLabel = [];
      if (this.isReactiveDriven) {
        listOfGroupLabel = [...new Set(this.nzOptions.filter((o) => o.groupLabel).map((o) => o.groupLabel))];
      } else {
        if (this.listOfNzOptionGroupComponent) {
          listOfGroupLabel = this.listOfNzOptionGroupComponent.map((o) => o.nzLabel);
        }
      }
      listOfGroupLabel.forEach((label) => {
        const index = listOfContainerItem.findIndex((item) => label === item.groupLabel);
        if (index > -1) {
          const groupItem = {
            groupLabel: label,
            type: "group",
            key: label
          };
          listOfContainerItem.splice(index, 0, groupItem);
        }
      });
      this.listOfContainerItem = [...listOfContainerItem];
      this.updateCdkConnectedOverlayPositions();
    }
    clearInput() {
      this.nzSelectTopControlComponent.clearInputValue();
    }
    updateListOfValue(listOfValue) {
      const covertListToModel = (list, mode) => {
        if (mode === "default") {
          if (list.length > 0) {
            return list[0];
          } else {
            return null;
          }
        } else {
          return list;
        }
      };
      const model = covertListToModel(listOfValue, this.nzMode);
      if (this.value !== model) {
        this.listOfValue = listOfValue;
        this.listOfValue$.next(listOfValue);
        this.value = model;
        this.onChange(this.value);
      }
    }
    onTokenSeparate(listOfLabel) {
      const listOfMatchedValue = this.listOfTagAndTemplateItem.filter((item) => listOfLabel.findIndex((label) => label === item.nzLabel) !== -1).map((item) => item.nzValue).filter((item) => this.listOfValue.findIndex((v) => this.compareWith(v, item)) === -1);
      const limitWithinMaxCount = (value) => this.isMaxMultipleCountSet ? value.slice(0, this.nzMaxMultipleCount) : value;
      if (this.nzMode === "multiple") {
        const updateValue = limitWithinMaxCount([...this.listOfValue, ...listOfMatchedValue]);
        this.updateListOfValue(updateValue);
      } else if (this.nzMode === "tags") {
        const listOfUnMatchedLabel = listOfLabel.filter((label) => this.listOfTagAndTemplateItem.findIndex((item) => item.nzLabel === label) === -1);
        const updateValue = limitWithinMaxCount([...this.listOfValue, ...listOfMatchedValue, ...listOfUnMatchedLabel]);
        this.updateListOfValue(updateValue);
      }
      this.clearInput();
    }
    onKeyDown(e) {
      if (this.nzDisabled) {
        return;
      }
      const listOfFilteredOptionNotDisabled = this.listOfContainerItem.filter((item) => item.type === "item").filter((item) => !item.nzDisabled);
      const activatedIndex = listOfFilteredOptionNotDisabled.findIndex((item) => this.compareWith(item.nzValue, this.activatedValue));
      switch (e.keyCode) {
        case UP_ARROW:
          e.preventDefault();
          if (this.nzOpen && listOfFilteredOptionNotDisabled.length > 0) {
            const preIndex = activatedIndex > 0 ? activatedIndex - 1 : listOfFilteredOptionNotDisabled.length - 1;
            this.activatedValue = listOfFilteredOptionNotDisabled[preIndex].nzValue;
          }
          break;
        case DOWN_ARROW:
          e.preventDefault();
          if (this.nzOpen && listOfFilteredOptionNotDisabled.length > 0) {
            const nextIndex = activatedIndex < listOfFilteredOptionNotDisabled.length - 1 ? activatedIndex + 1 : 0;
            this.activatedValue = listOfFilteredOptionNotDisabled[nextIndex].nzValue;
          } else {
            this.setOpenState(true);
          }
          break;
        case ENTER:
          e.preventDefault();
          if (this.nzOpen) {
            if (isNotNil(this.activatedValue) && activatedIndex !== -1) {
              this.onItemClick(this.activatedValue);
            }
          } else {
            this.setOpenState(true);
          }
          break;
        case SPACE:
          if (!this.nzOpen) {
            this.setOpenState(true);
            e.preventDefault();
          }
          break;
        case TAB:
          if (this.nzSelectOnTab) {
            if (this.nzOpen) {
              e.preventDefault();
              if (isNotNil(this.activatedValue)) {
                this.onItemClick(this.activatedValue);
              }
            }
          } else {
            this.setOpenState(false);
          }
          break;
        case ESCAPE:
          break;
        default:
          if (!this.nzOpen) {
            this.setOpenState(true);
          }
      }
    }
    setOpenState(value) {
      if (this.nzOpen !== value) {
        this.nzOpen = value;
        this.nzOpenChange.emit(value);
        this.onOpenChange();
        this.cdr.markForCheck();
      }
    }
    onOpenChange() {
      this.updateCdkConnectedOverlayStatus();
      if (this.nzAutoClearSearchValue || !this.isMultiple) {
        this.clearInput();
      }
    }
    onInputValueChange(value) {
      this.searchValue = value;
      this.updateListOfContainerItem();
      this.nzOnSearch.emit(value);
      this.updateCdkConnectedOverlayPositions();
    }
    onClearSelection() {
      this.updateListOfValue([]);
      this.nzOnClear.emit();
    }
    onClickOutside(event) {
      const target = _getEventTarget(event);
      if (!this.host.nativeElement.contains(target)) {
        this.setOpenState(false);
      }
    }
    focus() {
      this.nzSelectTopControlComponent.focus();
    }
    blur() {
      this.nzSelectTopControlComponent.blur();
    }
    onPositionChange(position) {
      const placement = getPlacementName(position);
      this.dropdownPosition = placement;
    }
    updateCdkConnectedOverlayStatus() {
      if (this.platform.isBrowser && this.originElement.nativeElement) {
        const triggerWidth = this.triggerWidth;
        cancelAnimationFrame(this.requestId);
        this.requestId = requestAnimationFrame(() => {
          this.triggerWidth = this.originElement.nativeElement.getBoundingClientRect().width;
          if (triggerWidth !== this.triggerWidth) {
            this.cdr.detectChanges();
          }
        });
      }
    }
    updateCdkConnectedOverlayPositions() {
      requestAnimationFrame(() => {
        var _a2, _b;
        (_b = (_a2 = this.cdkConnectedOverlay) == null ? void 0 : _a2.overlayRef) == null ? void 0 : _b.updatePosition();
      });
    }
    writeValue(modelValue) {
      if (this.value !== modelValue) {
        this.value = modelValue;
        const covertModelToList = (model, mode) => {
          if (model === null || model === void 0) {
            return [];
          } else if (mode === "default") {
            return [model];
          } else {
            return model;
          }
        };
        const listOfValue = covertModelToList(modelValue, this.nzMode);
        this.listOfValue = listOfValue;
        this.listOfValue$.next(listOfValue);
        this.cdr.markForCheck();
      }
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
      if (this.nzDisabled) {
        this.setOpenState(false);
      }
      this.cdr.markForCheck();
    }
    ngOnChanges({
      nzOpen,
      nzDisabled,
      nzOptions,
      nzStatus,
      nzPlacement,
      nzSize,
      nzVariant
    }) {
      if (nzOpen) {
        this.onOpenChange();
      }
      if (nzDisabled && this.nzDisabled) {
        this.setOpenState(false);
      }
      if (nzOptions) {
        this.isReactiveDriven = true;
        const listOfOptions = this.nzOptions || [];
        const listOfTransformedItem = listOfOptions.map((item) => {
          return {
            template: item.label instanceof TemplateRef ? item.label : null,
            nzTitle: this.getTitle(item.title, item.label),
            nzLabel: typeof item.label === "string" || typeof item.label === "number" ? item.label : null,
            nzValue: item.value,
            nzDisabled: item.disabled || false,
            nzHide: item.hide || false,
            nzCustomContent: item.label instanceof TemplateRef,
            groupLabel: item.groupLabel || null,
            type: "item",
            key: item.key === void 0 ? item.value : item.key
          };
        });
        this.listOfTemplateItem$.next(listOfTransformedItem);
      }
      if (nzStatus) {
        this.setStatusStyles(this.nzStatus, this.hasFeedback);
      }
      if (nzPlacement) {
        const {
          currentValue
        } = nzPlacement;
        this.dropdownPosition = currentValue;
        const listOfPlacement = ["bottomLeft", "topLeft", "bottomRight", "topRight"];
        if (currentValue && listOfPlacement.includes(currentValue)) {
          this.positions = [POSITION_MAP[currentValue]];
        } else {
          this.positions = listOfPlacement.map((e) => POSITION_MAP[e]);
        }
      }
      if (nzSize) {
        this.size.set(nzSize.currentValue);
      }
      if (nzVariant) {
        this.variant.set(nzVariant.currentValue);
      }
    }
    ngOnInit() {
      var _a2;
      (_a2 = this.nzFormStatusService) == null ? void 0 : _a2.formStatusChanges.pipe(distinctUntilChanged((pre, cur) => {
        return pre.status === cur.status && pre.hasFeedback === cur.hasFeedback;
      }), withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : of(false)), map(([{
        status,
        hasFeedback
      }, noStatus]) => ({
        status: noStatus ? "" : status,
        hasFeedback
      })), takeUntilDestroyed(this.destroyRef)).subscribe(({
        status,
        hasFeedback
      }) => {
        this.setStatusStyles(status, hasFeedback);
      });
      this.focusMonitor.monitor(this.host, true).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((focusOrigin) => {
        if (!focusOrigin) {
          this.focused = false;
          this.cdr.markForCheck();
          this.nzBlur.emit();
          Promise.resolve().then(() => {
            this.onTouched();
          });
        } else {
          this.focused = true;
          this.cdr.markForCheck();
          this.nzFocus.emit();
        }
      });
      combineLatest([this.listOfValue$, this.listOfTemplateItem$]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(([listOfSelectedValue, listOfTemplateItem]) => {
        const listOfTagItem = listOfSelectedValue.filter(() => this.nzMode === "tags").filter((value) => listOfTemplateItem.findIndex((o) => this.compareWith(o.nzValue, value)) === -1).map((value) => this.listOfTopItem.find((o) => this.compareWith(o.nzValue, value)) || this.generateTagItem(value));
        this.listOfTagAndTemplateItem = [...listOfTemplateItem, ...listOfTagItem];
        this.listOfTopItem = this.listOfValue.map((v) => [...this.listOfTagAndTemplateItem, ...this.listOfTopItem].find((item) => this.compareWith(v, item.nzValue))).filter((item) => !!item);
        this.updateListOfContainerItem();
      });
      fromEventOutsideAngular(this.host.nativeElement, "click").pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        if (this.nzOpen && this.nzShowSearch || this.nzDisabled) {
          return;
        }
        this.ngZone.run(() => this.setOpenState(!this.nzOpen));
      });
      this.cdkConnectedOverlay.overlayKeydown.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
        if (event.keyCode === ESCAPE) {
          this.setOpenState(false);
        }
      });
    }
    ngAfterContentInit() {
      if (!this.isReactiveDriven) {
        merge(this.listOfNzOptionGroupComponent.changes, this.listOfNzOptionComponent.changes).pipe(startWith(true), switchMap(() => merge(...[this.listOfNzOptionComponent.changes, this.listOfNzOptionGroupComponent.changes, ...this.listOfNzOptionComponent.map((option) => option.changes), ...this.listOfNzOptionGroupComponent.map((option) => option.changes)]).pipe(startWith(true))), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          const listOfOptionInterface = this.listOfNzOptionComponent.toArray().map((item) => {
            const {
              template,
              nzLabel,
              nzValue,
              nzKey,
              nzDisabled,
              nzHide,
              nzCustomContent,
              groupLabel
            } = item;
            return {
              template,
              nzLabel,
              nzValue,
              nzDisabled,
              nzHide,
              nzCustomContent,
              groupLabel,
              nzTitle: this.getTitle(item.nzTitle, item.nzLabel),
              type: "item",
              key: nzKey === void 0 ? nzValue : nzKey
            };
          });
          this.listOfTemplateItem$.next(listOfOptionInterface);
          this.cdr.markForCheck();
        });
      }
    }
    setStatusStyles(status, hasFeedback) {
      this.status = status;
      this.hasFeedback = hasFeedback;
      this.cdr.markForCheck();
      this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
      Object.keys(this.statusCls).forEach((status2) => {
        if (this.statusCls[status2]) {
          this.renderer.addClass(this.host.nativeElement, status2);
        } else {
          this.renderer.removeClass(this.host.nativeElement, status2);
        }
      });
    }
    getTitle(title, label) {
      let rawTitle = void 0;
      if (title === void 0) {
        if (typeof label === "string" || typeof label === "number") {
          rawTitle = label.toString();
        }
      } else if (typeof title === "string" || typeof title === "number") {
        rawTitle = title.toString();
      }
      return rawTitle;
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzVariant_decorators = [WithConfig()];
    _nzOptionHeightPx_decorators = [WithConfig()];
    _nzSuffixIcon_decorators = [WithConfig()];
    _nzBackdrop_decorators = [WithConfig()];
    __esDecorate(null, null, _nzVariant_decorators, {
      kind: "field",
      name: "nzVariant",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzVariant" in obj,
        get: (obj) => obj.nzVariant,
        set: (obj, value) => {
          obj.nzVariant = value;
        }
      },
      metadata: _metadata
    }, _nzVariant_initializers, _nzVariant_extraInitializers);
    __esDecorate(null, null, _nzOptionHeightPx_decorators, {
      kind: "field",
      name: "nzOptionHeightPx",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzOptionHeightPx" in obj,
        get: (obj) => obj.nzOptionHeightPx,
        set: (obj, value) => {
          obj.nzOptionHeightPx = value;
        }
      },
      metadata: _metadata
    }, _nzOptionHeightPx_initializers, _nzOptionHeightPx_extraInitializers);
    __esDecorate(null, null, _nzSuffixIcon_decorators, {
      kind: "field",
      name: "nzSuffixIcon",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSuffixIcon" in obj,
        get: (obj) => obj.nzSuffixIcon,
        set: (obj, value) => {
          obj.nzSuffixIcon = value;
        }
      },
      metadata: _metadata
    }, _nzSuffixIcon_initializers, _nzSuffixIcon_extraInitializers);
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
  })(), __publicField(_a, "\u0275fac", function NzSelectComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-select"]],
    contentQueries: function NzSelectComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, NzOptionComponent, 5)(dirIndex, NzOptionGroupComponent, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfNzOptionComponent = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfNzOptionGroupComponent = _t);
      }
    },
    viewQuery: function NzSelectComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(CdkOverlayOrigin, 7, ElementRef)(CdkConnectedOverlay, 7)(NzSelectTopControlComponent, 7)(NzOptionGroupComponent, 7, ElementRef)(NzSelectTopControlComponent, 7, ElementRef);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.originElement = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.cdkConnectedOverlay = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzSelectTopControlComponent = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzOptionGroupComponentElement = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzSelectTopControlComponentElement = _t.first);
      }
    },
    hostAttrs: [1, "ant-select"],
    hostVars: 30,
    hostBindings: function NzSelectComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-select-in-form-item", !!ctx.nzFormStatusService)("ant-select-lg", ctx.finalSize() === "large")("ant-select-sm", ctx.finalSize() === "small")("ant-select-show-arrow", ctx.showArrow)("ant-select-disabled", ctx.nzDisabled)("ant-select-show-search", (ctx.nzShowSearch || ctx.nzMode !== "default") && !ctx.nzDisabled)("ant-select-allow-clear", ctx.nzAllowClear)("ant-select-borderless", ctx.finalVariant() === "borderless")("ant-select-filled", ctx.finalVariant() === "filled")("ant-select-underlined", ctx.finalVariant() === "underlined")("ant-select-open", ctx.nzOpen)("ant-select-focused", ctx.nzOpen || ctx.focused)("ant-select-single", ctx.nzMode === "default")("ant-select-multiple", ctx.nzMode !== "default")("ant-select-rtl", ctx.dir() === "rtl");
      }
    },
    inputs: {
      nzId: "nzId",
      nzSize: "nzSize",
      nzStatus: "nzStatus",
      nzVariant: "nzVariant",
      nzOptionHeightPx: "nzOptionHeightPx",
      nzOptionOverflowSize: "nzOptionOverflowSize",
      nzDropdownClassName: "nzDropdownClassName",
      nzDropdownMatchSelectWidth: "nzDropdownMatchSelectWidth",
      nzDropdownStyle: "nzDropdownStyle",
      nzNotFoundContent: "nzNotFoundContent",
      nzPlaceHolder: "nzPlaceHolder",
      nzPlacement: "nzPlacement",
      nzMaxTagCount: "nzMaxTagCount",
      nzDropdownRender: "nzDropdownRender",
      nzCustomTemplate: "nzCustomTemplate",
      nzPrefix: "nzPrefix",
      nzSuffixIcon: "nzSuffixIcon",
      nzClearIcon: "nzClearIcon",
      nzRemoveIcon: "nzRemoveIcon",
      nzMenuItemSelectedIcon: "nzMenuItemSelectedIcon",
      nzTokenSeparators: "nzTokenSeparators",
      nzMaxTagPlaceholder: "nzMaxTagPlaceholder",
      nzMaxMultipleCount: [2, "nzMaxMultipleCount", "nzMaxMultipleCount", numberAttributeWithInfinityFallback],
      nzMode: "nzMode",
      nzFilterOption: "nzFilterOption",
      compareWith: "compareWith",
      nzAllowClear: [2, "nzAllowClear", "nzAllowClear", booleanAttribute],
      nzShowSearch: [2, "nzShowSearch", "nzShowSearch", booleanAttribute],
      nzLoading: [2, "nzLoading", "nzLoading", booleanAttribute],
      nzAutoFocus: [2, "nzAutoFocus", "nzAutoFocus", booleanAttribute],
      nzAutoClearSearchValue: [2, "nzAutoClearSearchValue", "nzAutoClearSearchValue", booleanAttribute],
      nzServerSearch: [2, "nzServerSearch", "nzServerSearch", booleanAttribute],
      nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
      nzOpen: [2, "nzOpen", "nzOpen", booleanAttribute],
      nzSelectOnTab: [2, "nzSelectOnTab", "nzSelectOnTab", booleanAttribute],
      nzBackdrop: [2, "nzBackdrop", "nzBackdrop", booleanAttribute],
      nzOptions: "nzOptions",
      nzShowArrow: [2, "nzShowArrow", "nzShowArrow", booleanAttribute]
    },
    outputs: {
      nzOnSearch: "nzOnSearch",
      nzScrollToBottom: "nzScrollToBottom",
      nzOpenChange: "nzOpenChange",
      nzBlur: "nzBlur",
      nzFocus: "nzFocus",
      nzOnClear: "nzOnClear"
    },
    exportAs: ["nzSelect"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _a),
      multi: true
    }, {
      provide: NZ_SPACE_COMPACT_ITEM_TYPE,
      useValue: "select"
    }]), \u0275\u0275HostDirectivesFeature([NzSpaceCompactItemDirective]), \u0275\u0275NgOnChangesFeature],
    decls: 5,
    vars: 24,
    consts: [["origin", "cdkOverlayOrigin"], ["feedbackIconTpl", ""], ["cdkOverlayOrigin", "", 3, "inputValueChange", "tokenize", "deleteItem", "keydown", "nzId", "open", "disabled", "mode", "nzNoAnimation", "maxTagPlaceholder", "removeIcon", "placeHolder", "maxTagCount", "customTemplate", "tokenSeparators", "showSearch", "autofocus", "listOfTopItem", "prefix"], [3, "showArrow", "loading", "search", "suffixIcon", "feedbackIcon", "nzMaxMultipleCount", "listOfValue", "isMaxMultipleCountSet"], [3, "clearIcon"], ["cdkConnectedOverlay", "", "nzConnectedOverlay", "", "cdkConnectedOverlayTransformOriginOn", ".ant-select-dropdown", 3, "overlayOutsideClick", "detach", "positionChange", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayWidth", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayOpen", "cdkConnectedOverlayPositions"], [3, "status"], [3, "clear", "clearIcon"], [3, "keydown", "itemClick", "scrollToBottom", "itemSize", "maxItemLength", "matchWidth", "nzNoAnimation", "listOfContainerItem", "menuItemSelectedIcon", "notFoundContent", "activatedValue", "listOfSelectedValue", "dropdownRender", "compareWith", "mode", "isMaxMultipleCountReached"]],
    template: function NzSelectComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "nz-select-top-control", 2, 0);
        \u0275\u0275listener("inputValueChange", function NzSelectComponent_Template_nz_select_top_control_inputValueChange_0_listener($event) {
          return ctx.onInputValueChange($event);
        })("tokenize", function NzSelectComponent_Template_nz_select_top_control_tokenize_0_listener($event) {
          return ctx.onTokenSeparate($event);
        })("deleteItem", function NzSelectComponent_Template_nz_select_top_control_deleteItem_0_listener($event) {
          return ctx.onItemDelete($event);
        })("keydown", function NzSelectComponent_Template_nz_select_top_control_keydown_0_listener($event) {
          return ctx.onKeyDown($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(2, NzSelectComponent_Conditional_2_Template, 3, 8, "nz-select-arrow", 3);
        \u0275\u0275conditionalCreate(3, NzSelectComponent_Conditional_3_Template, 1, 1, "nz-select-clear", 4);
        \u0275\u0275template(4, NzSelectComponent_ng_template_4_Template, 1, 23, "ng-template", 5);
        \u0275\u0275listener("overlayOutsideClick", function NzSelectComponent_Template_ng_template_overlayOutsideClick_4_listener($event) {
          return ctx.onClickOutside($event);
        })("detach", function NzSelectComponent_Template_ng_template_detach_4_listener() {
          return ctx.setOpenState(false);
        })("positionChange", function NzSelectComponent_Template_ng_template_positionChange_4_listener($event) {
          return ctx.onPositionChange($event);
        });
      }
      if (rf & 2) {
        const origin_r5 = \u0275\u0275reference(1);
        \u0275\u0275property("nzId", ctx.nzId)("open", ctx.nzOpen)("disabled", ctx.nzDisabled)("mode", ctx.nzMode)("nzNoAnimation", ctx.noAnimation == null ? null : ctx.noAnimation.nzNoAnimation == null ? null : ctx.noAnimation.nzNoAnimation())("maxTagPlaceholder", ctx.nzMaxTagPlaceholder)("removeIcon", ctx.nzRemoveIcon)("placeHolder", ctx.nzPlaceHolder)("maxTagCount", ctx.nzMaxTagCount)("customTemplate", ctx.nzCustomTemplate)("tokenSeparators", ctx.nzTokenSeparators)("showSearch", ctx.nzShowSearch)("autofocus", ctx.nzAutoFocus)("listOfTopItem", ctx.listOfTopItem)("prefix", ctx.nzPrefix);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.showArrow || ctx.hasFeedback && !!ctx.status || ctx.isMaxMultipleCountSet ? 2 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.nzAllowClear && !ctx.nzDisabled && ctx.listOfValue.length ? 3 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("cdkConnectedOverlayHasBackdrop", ctx.nzBackdrop)("cdkConnectedOverlayMinWidth", ctx.nzDropdownMatchSelectWidth ? null : ctx.triggerWidth)("cdkConnectedOverlayWidth", ctx.nzDropdownMatchSelectWidth ? ctx.triggerWidth : null)("cdkConnectedOverlayOrigin", origin_r5)("cdkConnectedOverlayPanelClass", ctx.nzDropdownClassName)("cdkConnectedOverlayOpen", ctx.nzOpen)("cdkConnectedOverlayPositions", ctx.positions);
      }
    },
    dependencies: [NzSelectTopControlComponent, CdkOverlayOrigin, NzNoAnimationDirective, NzSelectArrowComponent, NzFormItemFeedbackIconComponent, NzSelectClearComponent, CdkConnectedOverlay, NzOverlayModule, NzConnectedOverlayDirective, NzOptionContainerComponent],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSelectComponent, [{
    type: Component,
    args: [{
      selector: "nz-select",
      exportAs: "nzSelect",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzSelectComponent),
        multi: true
      }, {
        provide: NZ_SPACE_COMPACT_ITEM_TYPE,
        useValue: "select"
      }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <nz-select-top-control
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [nzId]="nzId"
      [open]="nzOpen"
      [disabled]="nzDisabled"
      [mode]="nzMode"
      [nzNoAnimation]="noAnimation?.nzNoAnimation?.()"
      [maxTagPlaceholder]="nzMaxTagPlaceholder"
      [removeIcon]="nzRemoveIcon"
      [placeHolder]="nzPlaceHolder"
      [maxTagCount]="nzMaxTagCount"
      [customTemplate]="nzCustomTemplate"
      [tokenSeparators]="nzTokenSeparators"
      [showSearch]="nzShowSearch"
      [autofocus]="nzAutoFocus"
      [listOfTopItem]="listOfTopItem"
      [prefix]="nzPrefix"
      (inputValueChange)="onInputValueChange($event)"
      (tokenize)="onTokenSeparate($event)"
      (deleteItem)="onItemDelete($event)"
      (keydown)="onKeyDown($event)"
    />
    @if (showArrow || (hasFeedback && !!status) || isMaxMultipleCountSet) {
      <nz-select-arrow
        [showArrow]="nzShowArrow"
        [loading]="nzLoading"
        [search]="nzOpen && nzShowSearch"
        [suffixIcon]="nzSuffixIcon"
        [feedbackIcon]="feedbackIconTpl"
        [nzMaxMultipleCount]="nzMaxMultipleCount"
        [listOfValue]="listOfValue"
        [isMaxMultipleCountSet]="isMaxMultipleCountSet"
      >
        <ng-template #feedbackIconTpl>
          @if (hasFeedback && !!status) {
            <nz-form-item-feedback-icon [status]="status" />
          }
        </ng-template>
      </nz-select-arrow>
    }

    @if (nzAllowClear && !nzDisabled && listOfValue.length) {
      <nz-select-clear [clearIcon]="nzClearIcon" (clear)="onClearSelection()" />
    }
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayMinWidth]="$any(nzDropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(nzDropdownMatchSelectWidth ? triggerWidth : null)"
      [cdkConnectedOverlayOrigin]="origin"
      cdkConnectedOverlayTransformOriginOn=".ant-select-dropdown"
      [cdkConnectedOverlayPanelClass]="nzDropdownClassName!"
      [cdkConnectedOverlayOpen]="nzOpen"
      [cdkConnectedOverlayPositions]="positions"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="setOpenState(false)"
      (positionChange)="onPositionChange($event)"
    >
      <nz-option-container
        [style]="nzDropdownStyle"
        [itemSize]="nzOptionHeightPx"
        [maxItemLength]="nzOptionOverflowSize"
        [matchWidth]="nzDropdownMatchSelectWidth"
        [class.ant-select-dropdown-placement-bottomLeft]="dropdownPosition === 'bottomLeft'"
        [class.ant-select-dropdown-placement-topLeft]="dropdownPosition === 'topLeft'"
        [class.ant-select-dropdown-placement-bottomRight]="dropdownPosition === 'bottomRight'"
        [class.ant-select-dropdown-placement-topRight]="dropdownPosition === 'topRight'"
        [animate.enter]="selectAnimationEnter()"
        [animate.leave]="selectAnimationLeave()"
        [nzNoAnimation]="!!noAnimation?.nzNoAnimation?.()"
        [listOfContainerItem]="listOfContainerItem"
        [menuItemSelectedIcon]="nzMenuItemSelectedIcon"
        [notFoundContent]="nzNotFoundContent"
        [activatedValue]="activatedValue"
        [listOfSelectedValue]="listOfValue"
        [dropdownRender]="nzDropdownRender"
        [compareWith]="compareWith"
        [mode]="nzMode"
        [isMaxMultipleCountReached]="isMaxMultipleCountReached"
        (keydown)="onKeyDown($event)"
        (itemClick)="onItemClick($event)"
        (scrollToBottom)="nzScrollToBottom.emit()"
      />
    </ng-template>
  `,
      host: {
        class: "ant-select",
        "[class.ant-select-in-form-item]": "!!nzFormStatusService",
        "[class.ant-select-lg]": 'finalSize() === "large"',
        "[class.ant-select-sm]": 'finalSize() === "small"',
        "[class.ant-select-show-arrow]": `showArrow`,
        "[class.ant-select-disabled]": "nzDisabled",
        "[class.ant-select-show-search]": `(nzShowSearch || nzMode !== 'default') && !nzDisabled`,
        "[class.ant-select-allow-clear]": "nzAllowClear",
        "[class.ant-select-borderless]": `finalVariant() === 'borderless'`,
        "[class.ant-select-filled]": `finalVariant() === 'filled'`,
        "[class.ant-select-underlined]": `finalVariant() === 'underlined'`,
        "[class.ant-select-open]": "nzOpen",
        "[class.ant-select-focused]": "nzOpen || focused",
        "[class.ant-select-single]": `nzMode === 'default'`,
        "[class.ant-select-multiple]": `nzMode !== 'default'`,
        "[class.ant-select-rtl]": `dir() === 'rtl'`
      },
      hostDirectives: [NzSpaceCompactItemDirective],
      imports: [NzSelectTopControlComponent, CdkOverlayOrigin, NzNoAnimationDirective, NzSelectArrowComponent, NzFormItemFeedbackIconComponent, NzSelectClearComponent, CdkConnectedOverlay, NzOverlayModule, NzOptionContainerComponent]
    }]
  }], () => [], {
    nzId: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzStatus: [{
      type: Input
    }],
    nzVariant: [{
      type: Input
    }],
    nzOptionHeightPx: [{
      type: Input
    }],
    nzOptionOverflowSize: [{
      type: Input
    }],
    nzDropdownClassName: [{
      type: Input
    }],
    nzDropdownMatchSelectWidth: [{
      type: Input
    }],
    nzDropdownStyle: [{
      type: Input
    }],
    nzNotFoundContent: [{
      type: Input
    }],
    nzPlaceHolder: [{
      type: Input
    }],
    nzPlacement: [{
      type: Input
    }],
    nzMaxTagCount: [{
      type: Input
    }],
    nzDropdownRender: [{
      type: Input
    }],
    nzCustomTemplate: [{
      type: Input
    }],
    nzPrefix: [{
      type: Input
    }],
    nzSuffixIcon: [{
      type: Input
    }],
    nzClearIcon: [{
      type: Input
    }],
    nzRemoveIcon: [{
      type: Input
    }],
    nzMenuItemSelectedIcon: [{
      type: Input
    }],
    nzTokenSeparators: [{
      type: Input
    }],
    nzMaxTagPlaceholder: [{
      type: Input
    }],
    nzMaxMultipleCount: [{
      type: Input,
      args: [{
        transform: numberAttributeWithInfinityFallback
      }]
    }],
    nzMode: [{
      type: Input
    }],
    nzFilterOption: [{
      type: Input
    }],
    compareWith: [{
      type: Input
    }],
    nzAllowClear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowSearch: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzLoading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAutoFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAutoClearSearchValue: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzServerSearch: [{
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
    nzOpen: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSelectOnTab: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzBackdrop: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOptions: [{
      type: Input
    }],
    nzShowArrow: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOnSearch: [{
      type: Output
    }],
    nzScrollToBottom: [{
      type: Output
    }],
    nzOpenChange: [{
      type: Output
    }],
    nzBlur: [{
      type: Output
    }],
    nzFocus: [{
      type: Output
    }],
    nzOnClear: [{
      type: Output,
      args: ["nzOnClear"]
    }],
    originElement: [{
      type: ViewChild,
      args: [CdkOverlayOrigin, {
        static: true,
        read: ElementRef
      }]
    }],
    cdkConnectedOverlay: [{
      type: ViewChild,
      args: [CdkConnectedOverlay, {
        static: true
      }]
    }],
    nzSelectTopControlComponent: [{
      type: ViewChild,
      args: [NzSelectTopControlComponent, {
        static: true
      }]
    }],
    listOfNzOptionComponent: [{
      type: ContentChildren,
      args: [NzOptionComponent, {
        descendants: true
      }]
    }],
    listOfNzOptionGroupComponent: [{
      type: ContentChildren,
      args: [NzOptionGroupComponent, {
        descendants: true
      }]
    }],
    nzOptionGroupComponentElement: [{
      type: ViewChild,
      args: [NzOptionGroupComponent, {
        static: true,
        read: ElementRef
      }]
    }],
    nzSelectTopControlComponentElement: [{
      type: ViewChild,
      args: [NzSelectTopControlComponent, {
        static: true,
        read: ElementRef
      }]
    }]
  });
})();
var _NzSelectModule = class _NzSelectModule {
};
__publicField(_NzSelectModule, "\u0275fac", function NzSelectModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSelectModule)();
});
__publicField(_NzSelectModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzSelectModule,
  imports: [NzOptionComponent, NzSelectComponent, NzOptionContainerComponent, NzOptionGroupComponent, NzOptionItemComponent, NzSelectTopControlComponent, NzSelectSearchComponent, NzSelectItemComponent, NzSelectClearComponent, NzSelectArrowComponent, NzSelectPlaceholderComponent, NzOptionItemGroupComponent],
  exports: [NzOptionComponent, NzSelectComponent, NzOptionGroupComponent, NzSelectArrowComponent, NzSelectClearComponent, NzSelectItemComponent, NzSelectPlaceholderComponent, NzSelectSearchComponent]
}));
__publicField(_NzSelectModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzSelectComponent, NzOptionContainerComponent, NzOptionItemComponent, NzSelectTopControlComponent, NzSelectSearchComponent, NzSelectItemComponent, NzSelectClearComponent, NzSelectArrowComponent, NzSelectPlaceholderComponent, NzOptionItemGroupComponent]
}));
var NzSelectModule = _NzSelectModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSelectModule, [{
    type: NgModule,
    args: [{
      imports: [NzOptionComponent, NzSelectComponent, NzOptionContainerComponent, NzOptionGroupComponent, NzOptionItemComponent, NzSelectTopControlComponent, NzSelectSearchComponent, NzSelectItemComponent, NzSelectClearComponent, NzSelectArrowComponent, NzSelectPlaceholderComponent, NzOptionItemGroupComponent],
      exports: [NzOptionComponent, NzSelectComponent, NzOptionGroupComponent, NzSelectArrowComponent, NzSelectClearComponent, NzSelectItemComponent, NzSelectPlaceholderComponent, NzSelectSearchComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-menu.mjs
var _c05 = ["nz-menu-item", ""];
var _c14 = ["*"];
var _c24 = ["nz-submenu-inline-child", ""];
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
  attrs: _c05,
  ngContentSelectors: _c14,
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
  attrs: _c24,
  ngContentSelectors: _c14,
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
  ngContentSelectors: _c14,
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
  ngContentSelectors: _c14,
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
var _c06 = ["*"];
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
var NZ_CONFIG_MODULE_NAME2 = "dropdown";
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
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME2);
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
  ngContentSelectors: _c06,
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

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-pagination.mjs
var _c07 = ["nz-pagination-item", ""];
var _c15 = (a0, a1) => ({
  $implicit: a0,
  page: a1
});
function NzPaginationItemComponent_ng_template_0_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r1 = \u0275\u0275nextContext().page;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(page_r1);
  }
}
function NzPaginationItemComponent_ng_template_0_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 4);
  }
}
function NzPaginationItemComponent_ng_template_0_Case_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 5);
  }
}
function NzPaginationItemComponent_ng_template_0_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275conditionalCreate(1, NzPaginationItemComponent_ng_template_0_Case_1_Conditional_1_Template, 1, 0, "nz-icon", 4)(2, NzPaginationItemComponent_ng_template_0_Case_1_Conditional_2_Template, 1, 0, "nz-icon", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.disabled);
    \u0275\u0275attribute("title", ctx_r1.locale.prev_page);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.direction === "rtl" ? 1 : 2);
  }
}
function NzPaginationItemComponent_ng_template_0_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 5);
  }
}
function NzPaginationItemComponent_ng_template_0_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 4);
  }
}
function NzPaginationItemComponent_ng_template_0_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275conditionalCreate(1, NzPaginationItemComponent_ng_template_0_Case_2_Conditional_1_Template, 1, 0, "nz-icon", 5)(2, NzPaginationItemComponent_ng_template_0_Case_2_Conditional_2_Template, 1, 0, "nz-icon", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r1.disabled);
    \u0275\u0275attribute("title", ctx_r1.locale.next_page);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.direction === "rtl" ? 1 : 2);
  }
}
function NzPaginationItemComponent_ng_template_0_Case_3_Case_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 8);
  }
}
function NzPaginationItemComponent_ng_template_0_Case_3_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 9);
  }
}
function NzPaginationItemComponent_ng_template_0_Case_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzPaginationItemComponent_ng_template_0_Case_3_Case_2_Conditional_0_Template, 1, 0, "nz-icon", 8)(1, NzPaginationItemComponent_ng_template_0_Case_3_Case_2_Conditional_1_Template, 1, 0, "nz-icon", 9);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r1.direction === "rtl" ? 0 : 1);
  }
}
function NzPaginationItemComponent_ng_template_0_Case_3_Case_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 9);
  }
}
function NzPaginationItemComponent_ng_template_0_Case_3_Case_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 8);
  }
}
function NzPaginationItemComponent_ng_template_0_Case_3_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzPaginationItemComponent_ng_template_0_Case_3_Case_3_Conditional_0_Template, 1, 0, "nz-icon", 9)(1, NzPaginationItemComponent_ng_template_0_Case_3_Case_3_Conditional_1_Template, 1, 0, "nz-icon", 8);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r1.direction === "rtl" ? 0 : 1);
  }
}
function NzPaginationItemComponent_ng_template_0_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 3)(1, "div", 6);
    \u0275\u0275conditionalCreate(2, NzPaginationItemComponent_ng_template_0_Case_3_Case_2_Template, 2, 1)(3, NzPaginationItemComponent_ng_template_0_Case_3_Case_3_Template, 2, 1);
    \u0275\u0275elementStart(4, "span", 7);
    \u0275\u0275text(5, "\u2022\u2022\u2022");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const type_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_5_0 = type_r3) === "prev_5" ? 2 : tmp_5_0 === "next_5" ? 3 : -1);
  }
}
function NzPaginationItemComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzPaginationItemComponent_ng_template_0_Case_0_Template, 2, 1, "a")(1, NzPaginationItemComponent_ng_template_0_Case_1_Template, 3, 3, "button", 2)(2, NzPaginationItemComponent_ng_template_0_Case_2_Template, 3, 3, "button", 2)(3, NzPaginationItemComponent_ng_template_0_Case_3_Template, 6, 1, "a", 3);
  }
  if (rf & 2) {
    let tmp_4_0;
    const type_r3 = ctx.$implicit;
    \u0275\u0275conditional((tmp_4_0 = type_r3) === "page" ? 0 : tmp_4_0 === "prev" ? 1 : tmp_4_0 === "next" ? 2 : 3);
  }
}
function NzPaginationItemComponent_ng_template_2_Template(rf, ctx) {
}
var _c25 = ["nz-pagination-options", ""];
var _forTrack03 = ($index, $item) => $item.value;
function NzPaginationOptionsComponent_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-option", 3);
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    \u0275\u0275property("nzLabel", option_r3.label)("nzValue", option_r3.value);
  }
}
function NzPaginationOptionsComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-select", 2);
    \u0275\u0275listener("ngModelChange", function NzPaginationOptionsComponent_Conditional_0_Template_nz_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPageSizeChange($event));
    });
    \u0275\u0275repeaterCreate(1, NzPaginationOptionsComponent_Conditional_0_For_2_Template, 1, 2, "nz-option", 3, _forTrack03);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("nzDisabled", ctx_r1.disabled)("nzSize", ctx_r1.nzSize)("ngModel", ctx_r1.pageSize);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.listOfPageSizeOption);
  }
}
function NzPaginationOptionsComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementStart(2, "input", 4);
    \u0275\u0275listener("keydown.enter", function NzPaginationOptionsComponent_Conditional_1_Template_input_keydown_enter_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.jumpToPageViaInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.locale.jump_to, " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.disabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.locale.page, " ");
  }
}
var _c32 = ["containerTemplate"];
var _c42 = (a0, a1) => ({
  $implicit: a0,
  range: a1
});
function NzPaginationDefaultComponent_ng_template_0_Conditional_1_ng_template_1_Template(rf, ctx) {
}
function NzPaginationDefaultComponent_ng_template_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 1);
    \u0275\u0275template(1, NzPaginationDefaultComponent_ng_template_0_Conditional_1_ng_template_1_Template, 0, 0, "ng-template", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.showTotal)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c42, ctx_r0.total, ctx_r0.ranges));
  }
}
function NzPaginationDefaultComponent_ng_template_0_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 5);
    \u0275\u0275listener("gotoIndex", function NzPaginationDefaultComponent_ng_template_0_For_3_Template_li_gotoIndex_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.jumpPage($event));
    })("diffIndex", function NzPaginationDefaultComponent_ng_template_0_For_3_Template_li_diffIndex_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.jumpDiff($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const page_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("locale", ctx_r0.locale)("type", page_r3.type)("index", page_r3.index)("disabled", !!page_r3.disabled)("itemRender", ctx_r0.itemRender)("active", ctx_r0.pageIndex === page_r3.index)("direction", ctx_r0.dir);
  }
}
function NzPaginationDefaultComponent_ng_template_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 6);
    \u0275\u0275listener("pageIndexChange", function NzPaginationDefaultComponent_ng_template_0_Conditional_4_Template_li_pageIndexChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onPageIndexChange($event));
    })("pageSizeChange", function NzPaginationDefaultComponent_ng_template_0_Conditional_4_Template_li_pageSizeChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onPageSizeChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("total", ctx_r0.total)("locale", ctx_r0.locale)("disabled", ctx_r0.disabled)("nzSize", ctx_r0.nzSize)("showSizeChanger", ctx_r0.showSizeChanger)("showQuickJumper", ctx_r0.showQuickJumper)("pageIndex", ctx_r0.pageIndex)("pageSize", ctx_r0.pageSize)("pageSizeOptions", ctx_r0.pageSizeOptions);
  }
}
function NzPaginationDefaultComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul");
    \u0275\u0275conditionalCreate(1, NzPaginationDefaultComponent_ng_template_0_Conditional_1_Template, 2, 5, "li", 1);
    \u0275\u0275repeaterCreate(2, NzPaginationDefaultComponent_ng_template_0_For_3_Template, 1, 7, "li", 2, \u0275\u0275componentInstance().trackByPageItem, true);
    \u0275\u0275conditionalCreate(4, NzPaginationDefaultComponent_ng_template_0_Conditional_4_Template, 1, 9, "li", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showTotal ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.listOfPageItem);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.showQuickJumper || ctx_r0.showSizeChanger ? 4 : -1);
  }
}
function NzPaginationSimpleComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ul")(1, "li", 1);
    \u0275\u0275listener("click", function NzPaginationSimpleComponent_ng_template_0_Template_li_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.prePage());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "li", 2)(3, "input", 3);
    \u0275\u0275listener("keydown.enter", function NzPaginationSimpleComponent_ng_template_0_Template_input_keydown_enter_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.jumpToPageViaInput($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 4);
    \u0275\u0275text(5, "/");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "li", 5);
    \u0275\u0275listener("click", function NzPaginationSimpleComponent_ng_template_0_Template_li_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nextPage());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("locale", ctx_r1.locale)("disabled", ctx_r1.isFirstIndex)("direction", ctx_r1.dir)("itemRender", ctx_r1.itemRender);
    \u0275\u0275attribute("title", ctx_r1.locale.prev_page);
    \u0275\u0275advance();
    \u0275\u0275attribute("title", ctx_r1.pageIndex + "/" + ctx_r1.lastIndex);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.disabled)("value", ctx_r1.pageIndex);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.lastIndex, " ");
    \u0275\u0275advance();
    \u0275\u0275property("locale", ctx_r1.locale)("disabled", ctx_r1.isLastIndex)("direction", ctx_r1.dir)("itemRender", ctx_r1.itemRender);
    \u0275\u0275attribute("title", ctx_r1.locale == null ? null : ctx_r1.locale.next_page);
  }
}
function NzPaginationComponent_Conditional_0_Conditional_0_ng_template_0_Template(rf, ctx) {
}
function NzPaginationComponent_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzPaginationComponent_Conditional_0_Conditional_0_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const simplePagination_r1 = \u0275\u0275reference(2);
    \u0275\u0275property("ngTemplateOutlet", simplePagination_r1.template);
  }
}
function NzPaginationComponent_Conditional_0_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function NzPaginationComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzPaginationComponent_Conditional_0_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const defaultPagination_r2 = \u0275\u0275reference(4);
    \u0275\u0275property("ngTemplateOutlet", defaultPagination_r2.template);
  }
}
function NzPaginationComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzPaginationComponent_Conditional_0_Conditional_0_Template, 1, 1, null, 4)(1, NzPaginationComponent_Conditional_0_Conditional_1_Template, 1, 1, null, 4);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.nzSimple ? 0 : 1);
  }
}
var _NzPaginationItemComponent = class _NzPaginationItemComponent {
  constructor() {
    __publicField(this, "active", false);
    __publicField(this, "locale");
    __publicField(this, "index", null);
    __publicField(this, "disabled", false);
    __publicField(this, "direction", "ltr");
    __publicField(this, "type", null);
    __publicField(this, "itemRender", null);
    __publicField(this, "diffIndex", new EventEmitter());
    __publicField(this, "gotoIndex", new EventEmitter());
    __publicField(this, "title", null);
  }
  clickItem() {
    if (!this.disabled) {
      if (this.type === "page") {
        this.gotoIndex.emit(this.index);
      } else {
        this.diffIndex.emit({
          next: 1,
          prev: -1,
          prev_5: -5,
          next_5: 5
        }[this.type]);
      }
    }
  }
  ngOnChanges(changes) {
    var _a, _b, _c, _d;
    const {
      locale,
      index,
      type
    } = changes;
    if (locale || index || type) {
      this.title = {
        page: `${this.index}`,
        next: (_a = this.locale) == null ? void 0 : _a.next_page,
        prev: (_b = this.locale) == null ? void 0 : _b.prev_page,
        prev_5: (_c = this.locale) == null ? void 0 : _c.prev_5,
        next_5: (_d = this.locale) == null ? void 0 : _d.next_5
      }[this.type];
    }
  }
};
__publicField(_NzPaginationItemComponent, "\u0275fac", function NzPaginationItemComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPaginationItemComponent)();
});
__publicField(_NzPaginationItemComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzPaginationItemComponent,
  selectors: [["li", "nz-pagination-item", ""]],
  hostVars: 19,
  hostBindings: function NzPaginationItemComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function NzPaginationItemComponent_click_HostBindingHandler() {
        return ctx.clickItem();
      });
    }
    if (rf & 2) {
      \u0275\u0275attribute("title", ctx.title);
      \u0275\u0275classProp("ant-pagination-prev", ctx.type === "prev")("ant-pagination-next", ctx.type === "next")("ant-pagination-item", ctx.type === "page")("ant-pagination-jump-prev", ctx.type === "prev_5")("ant-pagination-jump-prev-custom-icon", ctx.type === "prev_5")("ant-pagination-jump-next", ctx.type === "next_5")("ant-pagination-jump-next-custom-icon", ctx.type === "next_5")("ant-pagination-disabled", ctx.disabled)("ant-pagination-item-active", ctx.active);
    }
  },
  inputs: {
    active: "active",
    locale: "locale",
    index: "index",
    disabled: "disabled",
    direction: "direction",
    type: "type",
    itemRender: "itemRender"
  },
  outputs: {
    diffIndex: "diffIndex",
    gotoIndex: "gotoIndex"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  attrs: _c07,
  decls: 3,
  vars: 5,
  consts: [["renderItemTemplate", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["type", "button", 1, "ant-pagination-item-link", 3, "disabled"], [1, "ant-pagination-item-link"], ["nzType", "right"], ["nzType", "left"], [1, "ant-pagination-item-container"], [1, "ant-pagination-item-ellipsis"], ["nzType", "double-right", 1, "ant-pagination-item-link-icon"], ["nzType", "double-left", 1, "ant-pagination-item-link-icon"]],
  template: function NzPaginationItemComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzPaginationItemComponent_ng_template_0_Template, 4, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(2, NzPaginationItemComponent_ng_template_2_Template, 0, 0, "ng-template", 1);
    }
    if (rf & 2) {
      const renderItemTemplate_r4 = \u0275\u0275reference(1);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngTemplateOutlet", ctx.itemRender || renderItemTemplate_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c15, ctx.type, ctx.index));
    }
  },
  dependencies: [NzIconModule, NzIconDirective, NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var NzPaginationItemComponent = _NzPaginationItemComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPaginationItemComponent, [{
    type: Component,
    args: [{
      selector: "li[nz-pagination-item]",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <ng-template #renderItemTemplate let-type let-page="page">
      @switch (type) {
        @case ('page') {
          <a>{{ page }}</a>
        }
        @case ('prev') {
          <button type="button" [disabled]="disabled" [attr.title]="locale.prev_page" class="ant-pagination-item-link">
            @if (direction === 'rtl') {
              <nz-icon nzType="right" />
            } @else {
              <nz-icon nzType="left" />
            }
          </button>
        }
        @case ('next') {
          <button type="button" [disabled]="disabled" [attr.title]="locale.next_page" class="ant-pagination-item-link">
            @if (direction === 'rtl') {
              <nz-icon nzType="left" />
            } @else {
              <nz-icon nzType="right" />
            }
          </button>
        }
        @default {
          <a class="ant-pagination-item-link">
            <div class="ant-pagination-item-container">
              @switch (type) {
                @case ('prev_5') {
                  @if (direction === 'rtl') {
                    <nz-icon nzType="double-right" class="ant-pagination-item-link-icon" />
                  } @else {
                    <nz-icon nzType="double-left" class="ant-pagination-item-link-icon" />
                  }
                }
                @case ('next_5') {
                  @if (direction === 'rtl') {
                    <nz-icon nzType="double-left" class="ant-pagination-item-link-icon" />
                  } @else {
                    <nz-icon nzType="double-right" class="ant-pagination-item-link-icon" />
                  }
                }
              }
              <span class="ant-pagination-item-ellipsis">\u2022\u2022\u2022</span>
            </div>
          </a>
        }
      }
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="itemRender || renderItemTemplate"
      [ngTemplateOutletContext]="{ $implicit: type, page: index }"
    />
  `,
      host: {
        "[class.ant-pagination-prev]": `type === 'prev'`,
        "[class.ant-pagination-next]": `type === 'next'`,
        "[class.ant-pagination-item]": `type === 'page'`,
        "[class.ant-pagination-jump-prev]": `type === 'prev_5'`,
        "[class.ant-pagination-jump-prev-custom-icon]": `type === 'prev_5'`,
        "[class.ant-pagination-jump-next]": `type === 'next_5'`,
        "[class.ant-pagination-jump-next-custom-icon]": `type === 'next_5'`,
        "[class.ant-pagination-disabled]": "disabled",
        "[class.ant-pagination-item-active]": "active",
        "[attr.title]": "title",
        "(click)": "clickItem()"
      },
      imports: [NzIconModule, NgTemplateOutlet]
    }]
  }], null, {
    active: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    index: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    direction: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    itemRender: [{
      type: Input
    }],
    diffIndex: [{
      type: Output
    }],
    gotoIndex: [{
      type: Output
    }]
  });
})();
var _NzPaginationOptionsComponent = class _NzPaginationOptionsComponent {
  constructor() {
    __publicField(this, "nzSize", "default");
    __publicField(this, "disabled", false);
    __publicField(this, "showSizeChanger", false);
    __publicField(this, "showQuickJumper", false);
    __publicField(this, "locale");
    __publicField(this, "total", 0);
    __publicField(this, "pageIndex", 1);
    __publicField(this, "pageSize", 10);
    __publicField(this, "pageSizeOptions", []);
    __publicField(this, "pageIndexChange", new EventEmitter());
    __publicField(this, "pageSizeChange", new EventEmitter());
    __publicField(this, "listOfPageSizeOption", []);
  }
  onPageSizeChange(size) {
    if (this.pageSize !== size) {
      this.pageSizeChange.next(size);
    }
  }
  jumpToPageViaInput($event) {
    const target = $event.target;
    const index = Math.floor(toNumber(target.value, this.pageIndex));
    this.pageIndexChange.next(index);
    target.value = "";
  }
  ngOnChanges(changes) {
    const {
      pageSize,
      pageSizeOptions,
      locale
    } = changes;
    if (pageSize || pageSizeOptions || locale) {
      this.listOfPageSizeOption = [.../* @__PURE__ */ new Set([...this.pageSizeOptions, this.pageSize])].map((item) => ({
        value: item,
        label: `${item} ${this.locale.items_per_page}`
      }));
    }
  }
};
__publicField(_NzPaginationOptionsComponent, "\u0275fac", function NzPaginationOptionsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPaginationOptionsComponent)();
});
__publicField(_NzPaginationOptionsComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzPaginationOptionsComponent,
  selectors: [["li", "nz-pagination-options", ""]],
  hostAttrs: [1, "ant-pagination-options"],
  inputs: {
    nzSize: "nzSize",
    disabled: "disabled",
    showSizeChanger: "showSizeChanger",
    showQuickJumper: "showQuickJumper",
    locale: "locale",
    total: "total",
    pageIndex: "pageIndex",
    pageSize: "pageSize",
    pageSizeOptions: "pageSizeOptions"
  },
  outputs: {
    pageIndexChange: "pageIndexChange",
    pageSizeChange: "pageSizeChange"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  attrs: _c25,
  decls: 2,
  vars: 2,
  consts: [[1, "ant-pagination-options-size-changer", 3, "nzDisabled", "nzSize", "ngModel"], [1, "ant-pagination-options-quick-jumper"], [1, "ant-pagination-options-size-changer", 3, "ngModelChange", "nzDisabled", "nzSize", "ngModel"], [3, "nzLabel", "nzValue"], [3, "keydown.enter", "disabled"]],
  template: function NzPaginationOptionsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzPaginationOptionsComponent_Conditional_0_Template, 3, 3, "nz-select", 0);
      \u0275\u0275conditionalCreate(1, NzPaginationOptionsComponent_Conditional_1_Template, 4, 3, "div", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.showSizeChanger ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showQuickJumper ? 1 : -1);
    }
  },
  dependencies: [NzSelectModule, NzOptionComponent, NzSelectComponent, FormsModule, NgControlStatus, NgModel],
  encapsulation: 2,
  changeDetection: 0
}));
var NzPaginationOptionsComponent = _NzPaginationOptionsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPaginationOptionsComponent, [{
    type: Component,
    args: [{
      selector: "li[nz-pagination-options]",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (showSizeChanger) {
      <nz-select
        class="ant-pagination-options-size-changer"
        [nzDisabled]="disabled"
        [nzSize]="nzSize"
        [ngModel]="pageSize"
        (ngModelChange)="onPageSizeChange($event)"
      >
        @for (option of listOfPageSizeOption; track option.value) {
          <nz-option [nzLabel]="option.label" [nzValue]="option.value" />
        }
      </nz-select>
    }

    @if (showQuickJumper) {
      <div class="ant-pagination-options-quick-jumper">
        {{ locale.jump_to }}
        <input [disabled]="disabled" (keydown.enter)="jumpToPageViaInput($event)" />
        {{ locale.page }}
      </div>
    }
  `,
      host: {
        class: "ant-pagination-options"
      },
      imports: [NzSelectModule, FormsModule]
    }]
  }], null, {
    nzSize: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    showSizeChanger: [{
      type: Input
    }],
    showQuickJumper: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    total: [{
      type: Input
    }],
    pageIndex: [{
      type: Input
    }],
    pageSize: [{
      type: Input
    }],
    pageSizeOptions: [{
      type: Input
    }],
    pageIndexChange: [{
      type: Output
    }],
    pageSizeChange: [{
      type: Output
    }]
  });
})();
var _NzPaginationDefaultComponent = class _NzPaginationDefaultComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "directionality", inject(Directionality));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "template");
    __publicField(this, "nzSize", "default");
    __publicField(this, "itemRender", null);
    __publicField(this, "showTotal", null);
    __publicField(this, "disabled", false);
    __publicField(this, "locale");
    __publicField(this, "showSizeChanger", false);
    __publicField(this, "showQuickJumper", false);
    __publicField(this, "total", 0);
    __publicField(this, "pageIndex", 1);
    __publicField(this, "pageSize", 10);
    __publicField(this, "pageSizeOptions", [10, 20, 30, 40]);
    __publicField(this, "pageIndexChange", new EventEmitter());
    __publicField(this, "pageSizeChange", new EventEmitter());
    __publicField(this, "ranges", [0, 0]);
    __publicField(this, "listOfPageItem", []);
    __publicField(this, "dir", "ltr");
    const el = inject(ElementRef).nativeElement;
    const renderer = inject(Renderer2);
    renderer.removeChild(renderer.parentNode(el), el);
  }
  ngOnInit() {
    var _a;
    (_a = this.directionality.change) == null ? void 0 : _a.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
  }
  jumpPage(index) {
    this.onPageIndexChange(index);
  }
  jumpDiff(diff) {
    this.jumpPage(this.pageIndex + diff);
  }
  trackByPageItem(_, value) {
    return `${value.type}-${value.index}`;
  }
  onPageIndexChange(index) {
    this.pageIndexChange.next(index);
  }
  onPageSizeChange(size) {
    this.pageSizeChange.next(size);
  }
  getLastIndex(total, pageSize) {
    return Math.ceil(total / pageSize);
  }
  buildIndexes() {
    const lastIndex = this.getLastIndex(this.total, this.pageSize);
    this.listOfPageItem = this.getListOfPageItem(this.pageIndex, lastIndex);
  }
  getListOfPageItem(pageIndex, lastIndex) {
    const concatWithPrevNext = (listOfPage) => {
      const prevItem = {
        type: "prev",
        disabled: pageIndex === 1
      };
      const nextItem = {
        type: "next",
        disabled: pageIndex === lastIndex
      };
      return [prevItem, ...listOfPage, nextItem];
    };
    const generatePage = (start, end) => {
      const list = [];
      for (let i = start; i <= end; i++) {
        list.push({
          index: i,
          type: "page"
        });
      }
      return list;
    };
    if (lastIndex <= 9) {
      return concatWithPrevNext(generatePage(1, lastIndex));
    } else {
      const generateRangeItem = (selected, last) => {
        let listOfRange = [];
        const prevFiveItem = {
          type: "prev_5"
        };
        const nextFiveItem = {
          type: "next_5"
        };
        const firstPageItem = generatePage(1, 1);
        const lastPageItem = generatePage(lastIndex, lastIndex);
        if (selected < 5) {
          const maxLeft = selected === 4 ? 6 : 5;
          listOfRange = [...generatePage(2, maxLeft), nextFiveItem];
        } else if (selected < last - 3) {
          listOfRange = [prevFiveItem, ...generatePage(selected - 2, selected + 2), nextFiveItem];
        } else {
          const minRight = selected === last - 3 ? last - 5 : last - 4;
          listOfRange = [prevFiveItem, ...generatePage(minRight, last - 1)];
        }
        return [...firstPageItem, ...listOfRange, ...lastPageItem];
      };
      return concatWithPrevNext(generateRangeItem(pageIndex, lastIndex));
    }
  }
  ngOnChanges(changes) {
    const {
      pageIndex,
      pageSize,
      total
    } = changes;
    if (pageIndex || pageSize || total) {
      this.ranges = [(this.pageIndex - 1) * this.pageSize + 1, Math.min(this.pageIndex * this.pageSize, this.total)];
      this.buildIndexes();
    }
  }
};
__publicField(_NzPaginationDefaultComponent, "\u0275fac", function NzPaginationDefaultComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPaginationDefaultComponent)();
});
__publicField(_NzPaginationDefaultComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzPaginationDefaultComponent,
  selectors: [["nz-pagination-default"]],
  viewQuery: function NzPaginationDefaultComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c32, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.template = _t.first);
    }
  },
  hostVars: 2,
  hostBindings: function NzPaginationDefaultComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-pagination-rtl", ctx.dir === "rtl");
    }
  },
  inputs: {
    nzSize: "nzSize",
    itemRender: "itemRender",
    showTotal: "showTotal",
    disabled: "disabled",
    locale: "locale",
    showSizeChanger: "showSizeChanger",
    showQuickJumper: "showQuickJumper",
    total: "total",
    pageIndex: "pageIndex",
    pageSize: "pageSize",
    pageSizeOptions: "pageSizeOptions"
  },
  outputs: {
    pageIndexChange: "pageIndexChange",
    pageSizeChange: "pageSizeChange"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 2,
  vars: 0,
  consts: [["containerTemplate", ""], [1, "ant-pagination-total-text"], ["nz-pagination-item", "", 3, "locale", "type", "index", "disabled", "itemRender", "active", "direction"], ["nz-pagination-options", "", 3, "total", "locale", "disabled", "nzSize", "showSizeChanger", "showQuickJumper", "pageIndex", "pageSize", "pageSizeOptions"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["nz-pagination-item", "", 3, "gotoIndex", "diffIndex", "locale", "type", "index", "disabled", "itemRender", "active", "direction"], ["nz-pagination-options", "", 3, "pageIndexChange", "pageSizeChange", "total", "locale", "disabled", "nzSize", "showSizeChanger", "showQuickJumper", "pageIndex", "pageSize", "pageSizeOptions"]],
  template: function NzPaginationDefaultComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzPaginationDefaultComponent_ng_template_0_Template, 5, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
  },
  dependencies: [NgTemplateOutlet, NzPaginationItemComponent, NzPaginationOptionsComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzPaginationDefaultComponent = _NzPaginationDefaultComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPaginationDefaultComponent, [{
    type: Component,
    args: [{
      selector: "nz-pagination-default",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <ng-template #containerTemplate>
      <ul>
        @if (showTotal) {
          <li class="ant-pagination-total-text">
            <ng-template
              [ngTemplateOutlet]="showTotal"
              [ngTemplateOutletContext]="{ $implicit: total, range: ranges }"
            />
          </li>
        }

        @for (page of listOfPageItem; track trackByPageItem($index, page)) {
          <li
            nz-pagination-item
            [locale]="locale"
            [type]="page.type"
            [index]="page.index"
            [disabled]="!!page.disabled"
            [itemRender]="itemRender"
            [active]="pageIndex === page.index"
            (gotoIndex)="jumpPage($event)"
            (diffIndex)="jumpDiff($event)"
            [direction]="dir"
          ></li>
        }

        @if (showQuickJumper || showSizeChanger) {
          <li
            nz-pagination-options
            [total]="total"
            [locale]="locale"
            [disabled]="disabled"
            [nzSize]="nzSize"
            [showSizeChanger]="showSizeChanger"
            [showQuickJumper]="showQuickJumper"
            [pageIndex]="pageIndex"
            [pageSize]="pageSize"
            [pageSizeOptions]="pageSizeOptions"
            (pageIndexChange)="onPageIndexChange($event)"
            (pageSizeChange)="onPageSizeChange($event)"
          ></li>
        }
      </ul>
    </ng-template>
  `,
      imports: [NgTemplateOutlet, NzPaginationItemComponent, NzPaginationOptionsComponent],
      host: {
        "[class.ant-pagination-rtl]": "dir === 'rtl'"
      }
    }]
  }], () => [], {
    template: [{
      type: ViewChild,
      args: ["containerTemplate", {
        static: true
      }]
    }],
    nzSize: [{
      type: Input
    }],
    itemRender: [{
      type: Input
    }],
    showTotal: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    showSizeChanger: [{
      type: Input
    }],
    showQuickJumper: [{
      type: Input
    }],
    total: [{
      type: Input
    }],
    pageIndex: [{
      type: Input
    }],
    pageSize: [{
      type: Input
    }],
    pageSizeOptions: [{
      type: Input
    }],
    pageIndexChange: [{
      type: Output
    }],
    pageSizeChange: [{
      type: Output
    }]
  });
})();
var _NzPaginationSimpleComponent = class _NzPaginationSimpleComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "directionality", inject(Directionality));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "template");
    __publicField(this, "itemRender", null);
    __publicField(this, "disabled", false);
    __publicField(this, "locale");
    __publicField(this, "total", 0);
    __publicField(this, "pageIndex", 1);
    __publicField(this, "pageSize", 10);
    __publicField(this, "pageIndexChange", new EventEmitter());
    __publicField(this, "lastIndex", 0);
    __publicField(this, "isFirstIndex", false);
    __publicField(this, "isLastIndex", false);
    __publicField(this, "dir", "ltr");
    const el = inject(ElementRef).nativeElement;
    const renderer = inject(Renderer2);
    renderer.removeChild(renderer.parentNode(el), el);
  }
  ngOnInit() {
    var _a;
    (_a = this.directionality.change) == null ? void 0 : _a.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
  }
  jumpToPageViaInput($event) {
    const target = $event.target;
    const index = toNumber(target.value, this.pageIndex);
    this.onPageIndexChange(index);
    target.value = `${this.pageIndex}`;
  }
  prePage() {
    this.onPageIndexChange(this.pageIndex - 1);
  }
  nextPage() {
    this.onPageIndexChange(this.pageIndex + 1);
  }
  onPageIndexChange(index) {
    this.pageIndexChange.next(index);
  }
  updateBindingValue() {
    this.lastIndex = Math.ceil(this.total / this.pageSize);
    this.isFirstIndex = this.pageIndex === 1;
    this.isLastIndex = this.pageIndex === this.lastIndex;
  }
  ngOnChanges(changes) {
    const {
      pageIndex,
      total,
      pageSize
    } = changes;
    if (pageIndex || total || pageSize) {
      this.updateBindingValue();
    }
  }
};
__publicField(_NzPaginationSimpleComponent, "\u0275fac", function NzPaginationSimpleComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPaginationSimpleComponent)();
});
__publicField(_NzPaginationSimpleComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzPaginationSimpleComponent,
  selectors: [["nz-pagination-simple"]],
  viewQuery: function NzPaginationSimpleComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c32, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.template = _t.first);
    }
  },
  hostVars: 2,
  hostBindings: function NzPaginationSimpleComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-pagination-rtl", ctx.dir === "rtl");
    }
  },
  inputs: {
    itemRender: "itemRender",
    disabled: "disabled",
    locale: "locale",
    total: "total",
    pageIndex: "pageIndex",
    pageSize: "pageSize"
  },
  outputs: {
    pageIndexChange: "pageIndexChange"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 2,
  vars: 0,
  consts: [["containerTemplate", ""], ["nz-pagination-item", "", "type", "prev", 3, "click", "locale", "disabled", "direction", "itemRender"], [1, "ant-pagination-simple-pager"], ["size", "3", 3, "keydown.enter", "disabled", "value"], [1, "ant-pagination-slash"], ["nz-pagination-item", "", "type", "next", 3, "click", "locale", "disabled", "direction", "itemRender"]],
  template: function NzPaginationSimpleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzPaginationSimpleComponent_ng_template_0_Template, 8, 14, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
  },
  dependencies: [NzPaginationItemComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzPaginationSimpleComponent = _NzPaginationSimpleComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPaginationSimpleComponent, [{
    type: Component,
    args: [{
      selector: "nz-pagination-simple",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <ng-template #containerTemplate>
      <ul>
        <li
          nz-pagination-item
          [locale]="locale"
          [attr.title]="locale.prev_page"
          [disabled]="isFirstIndex"
          [direction]="dir"
          (click)="prePage()"
          type="prev"
          [itemRender]="itemRender"
        ></li>
        <li [attr.title]="pageIndex + '/' + lastIndex" class="ant-pagination-simple-pager">
          <input [disabled]="disabled" [value]="pageIndex" (keydown.enter)="jumpToPageViaInput($event)" size="3" />
          <span class="ant-pagination-slash">/</span>
          {{ lastIndex }}
        </li>
        <li
          nz-pagination-item
          [locale]="locale"
          [attr.title]="locale?.next_page"
          [disabled]="isLastIndex"
          [direction]="dir"
          (click)="nextPage()"
          type="next"
          [itemRender]="itemRender"
        ></li>
      </ul>
    </ng-template>
  `,
      imports: [NzPaginationItemComponent],
      host: {
        "[class.ant-pagination-rtl]": "dir === 'rtl'"
      }
    }]
  }], () => [], {
    template: [{
      type: ViewChild,
      args: ["containerTemplate", {
        static: true
      }]
    }],
    itemRender: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    total: [{
      type: Input
    }],
    pageIndex: [{
      type: Input
    }],
    pageSize: [{
      type: Input
    }],
    pageIndexChange: [{
      type: Output
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME3 = "pagination";
var NzPaginationComponent = (() => {
  var _a;
  let _nzSize_decorators;
  let _nzSize_initializers = [];
  let _nzSize_extraInitializers = [];
  let _nzPageSizeOptions_decorators;
  let _nzPageSizeOptions_initializers = [];
  let _nzPageSizeOptions_extraInitializers = [];
  let _nzShowSizeChanger_decorators;
  let _nzShowSizeChanger_initializers = [];
  let _nzShowSizeChanger_extraInitializers = [];
  let _nzShowQuickJumper_decorators;
  let _nzShowQuickJumper_initializers = [];
  let _nzShowQuickJumper_extraInitializers = [];
  let _nzSimple_decorators;
  let _nzSimple_initializers = [];
  let _nzSimple_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME3);
      __publicField(this, "i18n", inject(NzI18nService));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "breakpointService", inject(NzBreakpointService));
      __publicField(this, "nzConfigService", inject(NzConfigService));
      __publicField(this, "directionality", inject(Directionality));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "nzPageSizeChange", new EventEmitter());
      __publicField(this, "nzPageIndexChange", new EventEmitter());
      __publicField(this, "nzShowTotal", null);
      __publicField(this, "nzItemRender", null);
      __publicField(this, "nzSize", __runInitializers(this, _nzSize_initializers, "default"));
      __publicField(this, "nzPageSizeOptions", (__runInitializers(this, _nzSize_extraInitializers), __runInitializers(this, _nzPageSizeOptions_initializers, [10, 20, 30, 40])));
      __publicField(this, "nzShowSizeChanger", (__runInitializers(this, _nzPageSizeOptions_extraInitializers), __runInitializers(this, _nzShowSizeChanger_initializers, false)));
      __publicField(this, "nzShowQuickJumper", (__runInitializers(this, _nzShowSizeChanger_extraInitializers), __runInitializers(this, _nzShowQuickJumper_initializers, false)));
      __publicField(this, "nzSimple", (__runInitializers(this, _nzShowQuickJumper_extraInitializers), __runInitializers(this, _nzSimple_initializers, false)));
      __publicField(this, "nzDisabled", (__runInitializers(this, _nzSimple_extraInitializers), false));
      __publicField(this, "nzResponsive", false);
      __publicField(this, "nzHideOnSinglePage", false);
      __publicField(this, "nzTotal", 0);
      __publicField(this, "nzPageIndex", 1);
      __publicField(this, "nzPageSize", 10);
      __publicField(this, "nzAlign", input("start", ...ngDevMode ? [{
        debugName: "nzAlign"
      }] : []));
      __publicField(this, "showPagination", true);
      __publicField(this, "locale");
      __publicField(this, "size", "default");
      __publicField(this, "dir", "ltr");
      __publicField(this, "total$", new ReplaySubject(1));
    }
    validatePageIndex(value, lastIndex) {
      if (value > lastIndex) {
        return lastIndex;
      } else if (value < 1) {
        return 1;
      } else {
        return value;
      }
    }
    onPageIndexChange(index) {
      const lastIndex = this.getLastIndex(this.nzTotal, this.nzPageSize);
      const validIndex = this.validatePageIndex(index, lastIndex);
      if (validIndex !== this.nzPageIndex && !this.nzDisabled) {
        this.nzPageIndex = validIndex;
        this.nzPageIndexChange.emit(this.nzPageIndex);
      }
    }
    onPageSizeChange(size) {
      this.nzPageSize = size;
      this.nzPageSizeChange.emit(size);
      const lastIndex = this.getLastIndex(this.nzTotal, this.nzPageSize);
      if (this.nzPageIndex > lastIndex) {
        this.onPageIndexChange(lastIndex);
      }
    }
    onTotalChange(total) {
      const lastIndex = this.getLastIndex(total, this.nzPageSize);
      if (this.nzPageIndex > lastIndex) {
        Promise.resolve().then(() => {
          this.onPageIndexChange(lastIndex);
          this.cdr.markForCheck();
        });
      }
    }
    getLastIndex(total, pageSize) {
      return Math.ceil(total / pageSize);
    }
    ngOnInit() {
      var _a2;
      this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.locale = this.i18n.getLocaleData("Pagination");
        this.cdr.markForCheck();
      });
      this.total$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((total) => {
        this.onTotalChange(total);
      });
      this.breakpointService.subscribe(gridResponsiveMap).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((bp) => {
        if (this.nzResponsive) {
          this.size = bp === NzBreakpointEnum.xs ? "small" : "default";
          this.cdr.markForCheck();
        }
      });
      (_a2 = this.directionality.change) == null ? void 0 : _a2.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
      this.dir = this.directionality.value;
    }
    ngOnChanges(changes) {
      const {
        nzHideOnSinglePage,
        nzTotal,
        nzPageSize,
        nzSize
      } = changes;
      if (nzTotal) {
        this.total$.next(this.nzTotal);
      }
      if (nzHideOnSinglePage || nzTotal || nzPageSize) {
        this.showPagination = this.nzHideOnSinglePage && this.nzTotal > this.nzPageSize || this.nzTotal > 0 && !this.nzHideOnSinglePage;
      }
      if (nzSize) {
        this.size = nzSize.currentValue;
      }
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzSize_decorators = [WithConfig()];
    _nzPageSizeOptions_decorators = [WithConfig()];
    _nzShowSizeChanger_decorators = [WithConfig()];
    _nzShowQuickJumper_decorators = [WithConfig()];
    _nzSimple_decorators = [WithConfig()];
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
    __esDecorate(null, null, _nzPageSizeOptions_decorators, {
      kind: "field",
      name: "nzPageSizeOptions",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzPageSizeOptions" in obj,
        get: (obj) => obj.nzPageSizeOptions,
        set: (obj, value) => {
          obj.nzPageSizeOptions = value;
        }
      },
      metadata: _metadata
    }, _nzPageSizeOptions_initializers, _nzPageSizeOptions_extraInitializers);
    __esDecorate(null, null, _nzShowSizeChanger_decorators, {
      kind: "field",
      name: "nzShowSizeChanger",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzShowSizeChanger" in obj,
        get: (obj) => obj.nzShowSizeChanger,
        set: (obj, value) => {
          obj.nzShowSizeChanger = value;
        }
      },
      metadata: _metadata
    }, _nzShowSizeChanger_initializers, _nzShowSizeChanger_extraInitializers);
    __esDecorate(null, null, _nzShowQuickJumper_decorators, {
      kind: "field",
      name: "nzShowQuickJumper",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzShowQuickJumper" in obj,
        get: (obj) => obj.nzShowQuickJumper,
        set: (obj, value) => {
          obj.nzShowQuickJumper = value;
        }
      },
      metadata: _metadata
    }, _nzShowQuickJumper_initializers, _nzShowQuickJumper_extraInitializers);
    __esDecorate(null, null, _nzSimple_decorators, {
      kind: "field",
      name: "nzSimple",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSimple" in obj,
        get: (obj) => obj.nzSimple,
        set: (obj, value) => {
          obj.nzSimple = value;
        }
      },
      metadata: _metadata
    }, _nzSimple_initializers, _nzSimple_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzPaginationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-pagination"]],
    hostAttrs: [1, "ant-pagination"],
    hostVars: 14,
    hostBindings: function NzPaginationComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-pagination-simple", ctx.nzSimple)("ant-pagination-disabled", ctx.nzDisabled)("ant-pagination-mini", !ctx.nzSimple && ctx.size === "small")("ant-pagination-rtl", ctx.dir === "rtl")("ant-pagination-start", ctx.nzAlign() === "start")("ant-pagination-center", ctx.nzAlign() === "center")("ant-pagination-end", ctx.nzAlign() === "end");
      }
    },
    inputs: {
      nzShowTotal: "nzShowTotal",
      nzItemRender: "nzItemRender",
      nzSize: "nzSize",
      nzPageSizeOptions: "nzPageSizeOptions",
      nzShowSizeChanger: [2, "nzShowSizeChanger", "nzShowSizeChanger", booleanAttribute],
      nzShowQuickJumper: [2, "nzShowQuickJumper", "nzShowQuickJumper", booleanAttribute],
      nzSimple: [2, "nzSimple", "nzSimple", booleanAttribute],
      nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
      nzResponsive: [2, "nzResponsive", "nzResponsive", booleanAttribute],
      nzHideOnSinglePage: [2, "nzHideOnSinglePage", "nzHideOnSinglePage", booleanAttribute],
      nzTotal: [2, "nzTotal", "nzTotal", numberAttribute],
      nzPageIndex: [2, "nzPageIndex", "nzPageIndex", numberAttribute],
      nzPageSize: [2, "nzPageSize", "nzPageSize", numberAttribute],
      nzAlign: [1, "nzAlign"]
    },
    outputs: {
      nzPageSizeChange: "nzPageSizeChange",
      nzPageIndexChange: "nzPageIndexChange"
    },
    exportAs: ["nzPagination"],
    features: [\u0275\u0275NgOnChangesFeature],
    decls: 5,
    vars: 18,
    consts: [["simplePagination", ""], ["defaultPagination", ""], [3, "pageIndexChange", "disabled", "itemRender", "locale", "pageSize", "total", "pageIndex"], [3, "pageIndexChange", "pageSizeChange", "nzSize", "itemRender", "showTotal", "disabled", "locale", "showSizeChanger", "showQuickJumper", "total", "pageIndex", "pageSize", "pageSizeOptions"], [3, "ngTemplateOutlet"]],
    template: function NzPaginationComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, NzPaginationComponent_Conditional_0_Template, 2, 1);
        \u0275\u0275elementStart(1, "nz-pagination-simple", 2, 0);
        \u0275\u0275listener("pageIndexChange", function NzPaginationComponent_Template_nz_pagination_simple_pageIndexChange_1_listener($event) {
          return ctx.onPageIndexChange($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "nz-pagination-default", 3, 1);
        \u0275\u0275listener("pageIndexChange", function NzPaginationComponent_Template_nz_pagination_default_pageIndexChange_3_listener($event) {
          return ctx.onPageIndexChange($event);
        })("pageSizeChange", function NzPaginationComponent_Template_nz_pagination_default_pageSizeChange_3_listener($event) {
          return ctx.onPageSizeChange($event);
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.showPagination ? 0 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.nzDisabled)("itemRender", ctx.nzItemRender)("locale", ctx.locale)("pageSize", ctx.nzPageSize)("total", ctx.nzTotal)("pageIndex", ctx.nzPageIndex);
        \u0275\u0275advance(2);
        \u0275\u0275property("nzSize", ctx.size)("itemRender", ctx.nzItemRender)("showTotal", ctx.nzShowTotal)("disabled", ctx.nzDisabled)("locale", ctx.locale)("showSizeChanger", ctx.nzShowSizeChanger)("showQuickJumper", ctx.nzShowQuickJumper)("total", ctx.nzTotal)("pageIndex", ctx.nzPageIndex)("pageSize", ctx.nzPageSize)("pageSizeOptions", ctx.nzPageSizeOptions);
      }
    },
    dependencies: [NgTemplateOutlet, NzPaginationSimpleComponent, NzPaginationDefaultComponent],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPaginationComponent, [{
    type: Component,
    args: [{
      selector: "nz-pagination",
      exportAs: "nzPagination",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (showPagination) {
      @if (nzSimple) {
        <ng-template [ngTemplateOutlet]="simplePagination.template" />
      } @else {
        <ng-template [ngTemplateOutlet]="defaultPagination.template" />
      }
    }

    <nz-pagination-simple
      #simplePagination
      [disabled]="nzDisabled"
      [itemRender]="nzItemRender"
      [locale]="locale"
      [pageSize]="nzPageSize"
      [total]="nzTotal"
      [pageIndex]="nzPageIndex"
      (pageIndexChange)="onPageIndexChange($event)"
    />
    <nz-pagination-default
      #defaultPagination
      [nzSize]="size"
      [itemRender]="nzItemRender"
      [showTotal]="nzShowTotal"
      [disabled]="nzDisabled"
      [locale]="locale"
      [showSizeChanger]="nzShowSizeChanger"
      [showQuickJumper]="nzShowQuickJumper"
      [total]="nzTotal"
      [pageIndex]="nzPageIndex"
      [pageSize]="nzPageSize"
      [pageSizeOptions]="nzPageSizeOptions"
      (pageIndexChange)="onPageIndexChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
    />
  `,
      host: {
        class: "ant-pagination",
        "[class.ant-pagination-simple]": "nzSimple",
        "[class.ant-pagination-disabled]": "nzDisabled",
        "[class.ant-pagination-mini]": `!nzSimple && size === 'small'`,
        "[class.ant-pagination-rtl]": `dir === 'rtl'`,
        "[class.ant-pagination-start]": 'nzAlign() === "start"',
        "[class.ant-pagination-center]": 'nzAlign() === "center"',
        "[class.ant-pagination-end]": 'nzAlign() === "end"'
      },
      imports: [NgTemplateOutlet, NzPaginationSimpleComponent, NzPaginationDefaultComponent]
    }]
  }], null, {
    nzPageSizeChange: [{
      type: Output
    }],
    nzPageIndexChange: [{
      type: Output
    }],
    nzShowTotal: [{
      type: Input
    }],
    nzItemRender: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzPageSizeOptions: [{
      type: Input
    }],
    nzShowSizeChanger: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowQuickJumper: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSimple: [{
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
    nzResponsive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzHideOnSinglePage: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzTotal: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzPageIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzPageSize: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzAlign: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzAlign",
        required: false
      }]
    }]
  });
})();
var _NzPaginationModule = class _NzPaginationModule {
};
__publicField(_NzPaginationModule, "\u0275fac", function NzPaginationModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPaginationModule)();
});
__publicField(_NzPaginationModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzPaginationModule,
  imports: [NzPaginationComponent, NzPaginationSimpleComponent, NzPaginationOptionsComponent, NzPaginationItemComponent, NzPaginationDefaultComponent],
  exports: [NzPaginationComponent]
}));
__publicField(_NzPaginationModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzPaginationComponent, NzPaginationSimpleComponent, NzPaginationOptionsComponent, NzPaginationItemComponent, NzPaginationDefaultComponent]
}));
var NzPaginationModule = _NzPaginationModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPaginationModule, [{
    type: NgModule,
    args: [{
      imports: [NzPaginationComponent, NzPaginationSimpleComponent, NzPaginationOptionsComponent, NzPaginationItemComponent, NzPaginationDefaultComponent],
      exports: [NzPaginationComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-spin.mjs
var _c08 = ["*"];
function NzSpinComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275element(1, "i", 3)(2, "i", 3)(3, "i", 3)(4, "i", 3);
    \u0275\u0275elementEnd();
  }
}
function NzSpinComponent_Conditional_2_ng_template_2_Template(rf, ctx) {
}
function NzSpinComponent_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzTip);
  }
}
function NzSpinComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 4);
    \u0275\u0275template(2, NzSpinComponent_Conditional_2_ng_template_2_Template, 0, 0, "ng-template", 5);
    \u0275\u0275conditionalCreate(3, NzSpinComponent_Conditional_2_Conditional_3_Template, 2, 1, "div", 6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const defaultTemplate_r2 = \u0275\u0275reference(1);
    \u0275\u0275advance();
    \u0275\u0275classProp("ant-spin-rtl", ctx_r0.dir === "rtl")("ant-spin-lg", ctx_r0.nzSize === "large")("ant-spin-sm", ctx_r0.nzSize === "small")("ant-spin-show-text", ctx_r0.nzTip);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.nzIndicator || defaultTemplate_r2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzTip ? 3 : -1);
  }
}
function NzSpinComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275projection(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("ant-spin-blur", ctx_r0.isLoading());
  }
}
var NZ_CONFIG_MODULE_NAME4 = "spin";
var NzSpinComponent = (() => {
  var _a;
  let _nzIndicator_decorators;
  let _nzIndicator_initializers = [];
  let _nzIndicator_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME4);
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "directionality", inject(Directionality));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "nzIndicator", __runInitializers(this, _nzIndicator_initializers, null));
      __publicField(this, "nzSize", (__runInitializers(this, _nzIndicator_extraInitializers), "default"));
      __publicField(this, "nzTip", null);
      __publicField(this, "nzDelay", 0);
      __publicField(this, "nzSimple", false);
      __publicField(this, "nzSpinning", true);
      __publicField(this, "spinning$", new BehaviorSubject(this.nzSpinning));
      __publicField(this, "delay$", new ReplaySubject(1));
      __publicField(this, "isLoading", signal(false, ...ngDevMode ? [{
        debugName: "isLoading"
      }] : []));
      __publicField(this, "dir", "ltr");
      onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME4, () => this.cdr.markForCheck());
    }
    ngOnInit() {
      var _a2;
      this.delay$.pipe(startWith(this.nzDelay), distinctUntilChanged(), switchMap((delay2) => (
        // This construct is used to reduce RxJS dependencies.
        // It previously used `debounce(() => timer())`, but consumers may not
        // use these RxJS functions at all, causing them to still be bundled
        // into the main bundle unnecessarily.
        this.spinning$.pipe(switchMap((spinning) => {
          if (delay2 === 0 || !spinning) {
            return of(spinning);
          }
          return new Observable((subscriber) => {
            const timeoutId = setTimeout(() => subscriber.next(spinning), delay2);
            return () => clearTimeout(timeoutId);
          });
        }))
      )), takeUntilDestroyed(this.destroyRef)).subscribe((isLoading) => {
        this.isLoading.set(isLoading);
      });
      (_a2 = this.directionality.change) == null ? void 0 : _a2.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
      this.dir = this.directionality.value;
    }
    ngOnChanges(changes) {
      const {
        nzSpinning,
        nzDelay
      } = changes;
      if (nzSpinning) {
        this.spinning$.next(this.nzSpinning);
      }
      if (nzDelay) {
        this.delay$.next(this.nzDelay);
      }
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzIndicator_decorators = [WithConfig()];
    __esDecorate(null, null, _nzIndicator_decorators, {
      kind: "field",
      name: "nzIndicator",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzIndicator" in obj,
        get: (obj) => obj.nzIndicator,
        set: (obj, value) => {
          obj.nzIndicator = value;
        }
      },
      metadata: _metadata
    }, _nzIndicator_initializers, _nzIndicator_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzSpinComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-spin"]],
    hostVars: 2,
    hostBindings: function NzSpinComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-spin-nested-loading", !ctx.nzSimple);
      }
    },
    inputs: {
      nzIndicator: "nzIndicator",
      nzSize: "nzSize",
      nzTip: "nzTip",
      nzDelay: [2, "nzDelay", "nzDelay", numberAttribute],
      nzSimple: [2, "nzSimple", "nzSimple", booleanAttribute],
      nzSpinning: [2, "nzSpinning", "nzSpinning", booleanAttribute]
    },
    exportAs: ["nzSpin"],
    features: [\u0275\u0275NgOnChangesFeature],
    ngContentSelectors: _c08,
    decls: 4,
    vars: 2,
    consts: [["defaultTemplate", ""], [1, "ant-spin-container", 3, "ant-spin-blur"], [1, "ant-spin-dot", "ant-spin-dot-spin"], [1, "ant-spin-dot-item"], [1, "ant-spin", "ant-spin-spinning"], [3, "ngTemplateOutlet"], [1, "ant-spin-text"], [1, "ant-spin-container"]],
    template: function NzSpinComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275template(0, NzSpinComponent_ng_template_0_Template, 5, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275conditionalCreate(2, NzSpinComponent_Conditional_2_Template, 4, 10, "div");
        \u0275\u0275conditionalCreate(3, NzSpinComponent_Conditional_3_Template, 2, 2, "div", 1);
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.isLoading() ? 2 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.nzSimple ? 3 : -1);
      }
    },
    dependencies: [NgTemplateOutlet],
    encapsulation: 2
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSpinComponent, [{
    type: Component,
    args: [{
      selector: "nz-spin",
      exportAs: "nzSpin",
      encapsulation: ViewEncapsulation.None,
      template: `
    <ng-template #defaultTemplate>
      <span class="ant-spin-dot ant-spin-dot-spin">
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
      </span>
    </ng-template>
    @if (isLoading()) {
      <div>
        <div
          class="ant-spin ant-spin-spinning"
          [class.ant-spin-rtl]="dir === 'rtl'"
          [class.ant-spin-lg]="nzSize === 'large'"
          [class.ant-spin-sm]="nzSize === 'small'"
          [class.ant-spin-show-text]="nzTip"
        >
          <ng-template [ngTemplateOutlet]="nzIndicator || defaultTemplate" />
          @if (nzTip) {
            <div class="ant-spin-text">{{ nzTip }}</div>
          }
        </div>
      </div>
    }
    @if (!nzSimple) {
      <div class="ant-spin-container" [class.ant-spin-blur]="isLoading()">
        <ng-content />
      </div>
    }
  `,
      host: {
        "[class.ant-spin-nested-loading]": "!nzSimple"
      },
      imports: [NgTemplateOutlet]
    }]
  }], () => [], {
    nzIndicator: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzTip: [{
      type: Input
    }],
    nzDelay: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzSimple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSpinning: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzSpinModule = class _NzSpinModule {
};
__publicField(_NzSpinModule, "\u0275fac", function NzSpinModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSpinModule)();
});
__publicField(_NzSpinModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzSpinModule,
  imports: [NzSpinComponent],
  exports: [NzSpinComponent]
}));
__publicField(_NzSpinModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({}));
var NzSpinModule = _NzSpinModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSpinModule, [{
    type: NgModule,
    args: [{
      imports: [NzSpinComponent],
      exports: [NzSpinComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-table.mjs
var _c09 = ["*"];
var _forTrack04 = ($index, $item) => $item.value;
function NzTableFilterComponent_ng_template_1_Template(rf, ctx) {
}
function NzTableFilterComponent_Conditional_2_For_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 14);
    \u0275\u0275listener("ngModelChange", function NzTableFilterComponent_Conditional_2_For_7_Conditional_1_Template_label_ngModelChange_0_listener() {
      \u0275\u0275restoreView(_r5);
      const f_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.check(f_r4));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngModel", f_r4.checked);
  }
}
function NzTableFilterComponent_Conditional_2_For_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 15);
    \u0275\u0275listener("ngModelChange", function NzTableFilterComponent_Conditional_2_For_7_Conditional_2_Template_label_ngModelChange_0_listener() {
      \u0275\u0275restoreView(_r6);
      const f_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.check(f_r4));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const f_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngModel", f_r4.checked);
  }
}
function NzTableFilterComponent_Conditional_2_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 11);
    \u0275\u0275listener("click", function NzTableFilterComponent_Conditional_2_For_7_Template_li_click_0_listener() {
      const f_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.check(f_r4));
    });
    \u0275\u0275conditionalCreate(1, NzTableFilterComponent_Conditional_2_For_7_Conditional_1_Template, 1, 1, "label", 12)(2, NzTableFilterComponent_Conditional_2_For_7_Conditional_2_Template, 1, 1, "label", 13);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const f_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nzSelected", f_r4.checked);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.filterMultiple ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(f_r4.text);
  }
}
function NzTableFilterComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-filter-trigger", 3);
    \u0275\u0275listener("nzVisibleChange", function NzTableFilterComponent_Conditional_2_Template_nz_filter_trigger_nzVisibleChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onVisibleChange($event));
    });
    \u0275\u0275element(1, "nz-icon", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "nz-dropdown-menu", null, 0)(4, "div", 5)(5, "ul", 6);
    \u0275\u0275repeaterCreate(6, NzTableFilterComponent_Conditional_2_For_7_Template, 5, 3, "li", 7, _forTrack04);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 8)(9, "button", 9);
    \u0275\u0275listener("click", function NzTableFilterComponent_Conditional_2_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.reset());
    });
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 10);
    \u0275\u0275listener("click", function NzTableFilterComponent_Conditional_2_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirm());
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const filterMenu_r7 = \u0275\u0275reference(3);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("nzVisible", ctx_r1.isVisible)("nzActive", ctx_r1.isChecked)("nzDropdownMenu", filterMenu_r7);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.listOfParsedFilter);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r1.isChecked);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.locale.filterReset, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.locale.filterConfirm);
  }
}
function NzTableFilterComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 2);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.extraTemplate);
  }
}
function NzTableSelectionComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 3);
    \u0275\u0275listener("ngModelChange", function NzTableSelectionComponent_Conditional_0_Template_label_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCheckedChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("ant-table-selection-select-all-custom", ctx_r1.showRowSelection);
    \u0275\u0275property("ngModel", ctx_r1.checked)("nzDisabled", ctx_r1.disabled)("nzIndeterminate", ctx_r1.indeterminate);
    \u0275\u0275attribute("aria-label", ctx_r1.label);
  }
}
function NzTableSelectionComponent_Conditional_1_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 8);
    \u0275\u0275listener("click", function NzTableSelectionComponent_Conditional_1_For_7_Template_li_click_0_listener() {
      const selection_r4 = \u0275\u0275restoreView(_r3).$implicit;
      return \u0275\u0275resetView(selection_r4.onSelect());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const selection_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", selection_r4.text, " ");
  }
}
function NzTableSelectionComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "span", 4);
    \u0275\u0275element(2, "nz-icon", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "nz-dropdown-menu", null, 0)(5, "ul", 6);
    \u0275\u0275repeaterCreate(6, NzTableSelectionComponent_Conditional_1_For_7_Template, 2, 1, "li", 7, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const selectionMenu_r5 = \u0275\u0275reference(4);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzDropdownMenu", selectionMenu_r5);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.listOfSelections);
  }
}
function NzTableSortersComponent_ng_template_1_Template(rf, ctx) {
}
function NzTableSortersComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 6);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r0.sortOrder === "ascend");
  }
}
function NzTableSortersComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 7);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r0.sortOrder === "descend");
  }
}
var _c16 = ["nzChecked", ""];
function NzTdAddOnComponent_Conditional_0_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function NzTdAddOnComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTdAddOnComponent_Conditional_0_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.nzExpandIcon);
  }
}
function NzTdAddOnComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 4);
    \u0275\u0275listener("expandChange", function NzTdAddOnComponent_Conditional_0_Conditional_2_Template_button_expandChange_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onExpandChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("expand", ctx_r0.nzExpand)("spaceMode", !ctx_r0.nzShowExpand);
  }
}
function NzTdAddOnComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-row-indent", 1);
    \u0275\u0275conditionalCreate(1, NzTdAddOnComponent_Conditional_0_Conditional_1_Template, 1, 1, null, 2)(2, NzTdAddOnComponent_Conditional_0_Conditional_2_Template, 1, 2, "button", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("indentSize", ctx_r0.nzIndentSize);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzExpandIcon ? 1 : 2);
  }
}
function NzTdAddOnComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 5);
    \u0275\u0275listener("ngModelChange", function NzTdAddOnComponent_Conditional_1_Template_label_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCheckedChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("nzDisabled", ctx_r0.nzDisabled)("ngModel", ctx_r0.nzChecked)("nzIndeterminate", ctx_r0.nzIndeterminate);
    \u0275\u0275attribute("aria-label", ctx_r0.nzLabel);
  }
}
var _c26 = ["nzColumnKey", ""];
var _c33 = [[["", "nz-th-extra", ""]], [["nz-filter-trigger"]], "*"];
var _c43 = ["[nz-th-extra]", "nz-filter-trigger", "*"];
function NzThAddOnComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-table-filter", 6);
    \u0275\u0275listener("filterChange", function NzThAddOnComponent_Conditional_0_Template_nz_table_filter_filterChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFilterValueChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    const notFilterTemplate_r3 = \u0275\u0275reference(3);
    const extraTemplate_r4 = \u0275\u0275reference(5);
    \u0275\u0275property("contentTemplate", notFilterTemplate_r3)("extraTemplate", extraTemplate_r4)("customFilter", ctx_r1.nzCustomFilter)("filterMultiple", ctx_r1.nzFilterMultiple)("listOfFilter", ctx_r1.nzFilters);
  }
}
function NzThAddOnComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 5);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const notFilterTemplate_r3 = \u0275\u0275reference(3);
    \u0275\u0275property("ngTemplateOutlet", notFilterTemplate_r3);
  }
}
function NzThAddOnComponent_ng_template_2_ng_template_0_Template(rf, ctx) {
}
function NzThAddOnComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzThAddOnComponent_ng_template_2_ng_template_0_Template, 0, 0, "ng-template", 5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    const sortTemplate_r5 = \u0275\u0275reference(7);
    const contentTemplate_r6 = \u0275\u0275reference(9);
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.nzShowSort ? sortTemplate_r5 : contentTemplate_r6);
  }
}
function NzThAddOnComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
    \u0275\u0275projection(1, 1);
  }
}
function NzThAddOnComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-table-sorters", 7);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    const contentTemplate_r6 = \u0275\u0275reference(9);
    \u0275\u0275property("sortOrder", ctx_r1.sortOrder)("sortDirections", ctx_r1.sortDirections)("contentTemplate", contentTemplate_r6);
  }
}
function NzThAddOnComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 2);
  }
}
var _c52 = ["nzSelections", ""];
var _c62 = ["nz-table-content", ""];
function NzTableContentComponent_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "col");
  }
  if (rf & 2) {
    const width_r1 = ctx.$implicit;
    \u0275\u0275styleProp("width", width_r1)("min-width", width_r1);
  }
}
function NzTableContentComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "colgroup");
    \u0275\u0275repeaterCreate(1, NzTableContentComponent_Conditional_0_For_2_Template, 1, 4, "col", 3, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.listOfColWidth);
  }
}
function NzTableContentComponent_Conditional_1_ng_template_1_Template(rf, ctx) {
}
function NzTableContentComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "thead", 0);
    \u0275\u0275template(1, NzTableContentComponent_Conditional_1_ng_template_1_Template, 0, 0, "ng-template", 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.theadTemplate);
  }
}
function NzTableContentComponent_ng_template_2_Template(rf, ctx) {
}
function NzTableContentComponent_Conditional_4_ng_template_1_Template(rf, ctx) {
}
function NzTableContentComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tfoot", 2);
    \u0275\u0275template(1, NzTableContentComponent_Conditional_4_ng_template_1_Template, 0, 0, "ng-template", 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r1.tfootTemplate);
  }
}
var _c72 = ["tdElement"];
var _c82 = ["nz-table-fixed-row", ""];
function NzTableFixedRowComponent_Conditional_2_ng_template_2_Template(rf, ctx) {
}
function NzTableFixedRowComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275pipe(1, "async");
    \u0275\u0275template(2, NzTableFixedRowComponent_Conditional_2_ng_template_2_Template, 0, 0, "ng-template", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const contentTemplate_r2 = \u0275\u0275reference(6);
    \u0275\u0275styleProp("width", \u0275\u0275pipeBind1(1, 3, ctx_r0.hostWidth$), "px");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", contentTemplate_r2);
  }
}
function NzTableFixedRowComponent_Conditional_4_ng_template_0_Template(rf, ctx) {
}
function NzTableFixedRowComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTableFixedRowComponent_Conditional_4_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const contentTemplate_r2 = \u0275\u0275reference(6);
    \u0275\u0275property("ngTemplateOutlet", contentTemplate_r2);
  }
}
function NzTableFixedRowComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
var _c92 = ["nz-table-measure-row", ""];
function NzTrMeasureComponent_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "td", 1, 0);
  }
}
function NzTbodyComponent_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 2);
    \u0275\u0275listener("listOfAutoWidth", function NzTbodyComponent_Conditional_0_Conditional_0_Template_tr_listOfAutoWidth_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onListOfAutoWidthChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const listOfMeasureColumn_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("listOfMeasureColumn", listOfMeasureColumn_r3);
  }
}
function NzTbodyComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTbodyComponent_Conditional_0_Conditional_0_Template, 1, 1, "tr", 1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.isInsideTable && ctx.length ? 0 : -1);
  }
}
function NzTbodyComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 0);
    \u0275\u0275element(1, "nz-embed-empty", 3);
    \u0275\u0275pipe(2, "async");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("specificContent", \u0275\u0275pipeBind1(2, 1, ctx_r1.noResult$));
  }
}
var _c102 = ["tableHeaderElement"];
var _c112 = ["tableBodyElement"];
var _c122 = ["tableFootElement"];
var _c132 = (a0, a1) => ({
  $implicit: a0,
  index: a1
});
function NzTableInnerScrollComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9, 1);
    \u0275\u0275element(2, "table", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleMap(ctx_r0.bodyStyleMap);
    \u0275\u0275advance(2);
    \u0275\u0275property("scrollX", ctx_r0.scrollX)("listOfColWidth", ctx_r0.listOfColWidth)("contentTemplate", ctx_r0.contentTemplate);
  }
}
function NzTableInnerScrollComponent_Conditional_0_Conditional_4_ng_container_4_ng_template_1_Template(rf, ctx) {
}
function NzTableInnerScrollComponent_Conditional_0_Conditional_4_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, NzTableInnerScrollComponent_Conditional_0_Conditional_4_ng_container_4_ng_template_1_Template, 0, 0, "ng-template", 14);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.virtualTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c132, item_r2, i_r3));
  }
}
function NzTableInnerScrollComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "cdk-virtual-scroll-viewport", 11, 1)(2, "table", 12)(3, "tbody");
    \u0275\u0275template(4, NzTableInnerScrollComponent_Conditional_0_Conditional_4_ng_container_4_Template, 2, 5, "ng-container", 13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("height", ctx_r0.data.length ? ctx_r0.scrollY : ctx_r0.noDataVirtualHeight);
    \u0275\u0275property("itemSize", ctx_r0.virtualItemSize)("maxBufferPx", ctx_r0.virtualMaxBufferPx)("minBufferPx", ctx_r0.virtualMinBufferPx);
    \u0275\u0275advance(2);
    \u0275\u0275property("scrollX", ctx_r0.scrollX)("listOfColWidth", ctx_r0.listOfColWidth);
    \u0275\u0275advance(2);
    \u0275\u0275property("cdkVirtualForOf", ctx_r0.data)("cdkVirtualForTrackBy", ctx_r0.virtualForTrackBy);
  }
}
function NzTableInnerScrollComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15, 2);
    \u0275\u0275element(2, "table", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleMap(ctx_r0.headerStyleMap);
    \u0275\u0275advance(2);
    \u0275\u0275property("scrollX", ctx_r0.scrollX)("listOfColWidth", ctx_r0.listOfColWidth)("tfootTemplate", ctx_r0.tfootTemplate);
  }
}
function NzTableInnerScrollComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4, 0);
    \u0275\u0275element(2, "table", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, NzTableInnerScrollComponent_Conditional_0_Conditional_3_Template, 3, 5, "div", 6)(4, NzTableInnerScrollComponent_Conditional_0_Conditional_4_Template, 5, 9, "cdk-virtual-scroll-viewport", 7);
    \u0275\u0275conditionalCreate(5, NzTableInnerScrollComponent_Conditional_0_Conditional_5_Template, 3, 5, "div", 8);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r0.headerStyleMap);
    \u0275\u0275advance(2);
    \u0275\u0275property("scrollX", ctx_r0.scrollX)("listOfColWidth", ctx_r0.listOfColWidth)("theadTemplate", ctx_r0.theadTemplate)("tfootTemplate", ctx_r0.tfootFixed === "top" ? ctx_r0.tfootTemplate : null);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.virtualTemplate ? 3 : 4);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.tfootFixed === "bottom" ? 5 : -1);
  }
}
function NzTableInnerScrollComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17, 1);
    \u0275\u0275element(2, "table", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r0.bodyStyleMap);
    \u0275\u0275advance(2);
    \u0275\u0275property("scrollX", ctx_r0.scrollX)("listOfColWidth", ctx_r0.listOfColWidth)("theadTemplate", ctx_r0.theadTemplate)("contentTemplate", ctx_r0.contentTemplate)("tfootTemplate", ctx_r0.tfootTemplate);
  }
}
function NzTableTitleFooterComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.title);
  }
}
function NzTableTitleFooterComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.footer);
  }
}
function NzTableComponent_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function NzTableComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTableComponent_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const paginationTemplate_r1 = \u0275\u0275reference(10);
    \u0275\u0275property("ngTemplateOutlet", paginationTemplate_r1);
  }
}
function NzTableComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-table-title-footer", 6);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("title", ctx_r1.nzTitle);
  }
}
function NzTableComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-table-inner-scroll", 7);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    const tableMainElement_r3 = \u0275\u0275reference(3);
    const contentTemplate_r4 = \u0275\u0275reference(12);
    \u0275\u0275property("data", ctx_r1.data)("scrollX", ctx_r1.scrollX)("scrollY", ctx_r1.scrollY)("contentTemplate", contentTemplate_r4)("listOfColWidth", ctx_r1.listOfAutoColWidth)("theadTemplate", ctx_r1.theadTemplate)("tfootTemplate", ctx_r1.tfootTemplate)("tfootFixed", ctx_r1.tfootFixed)("verticalScrollBarWidth", ctx_r1.verticalScrollBarWidth)("virtualTemplate", ctx_r1.nzVirtualScrollDirective ? ctx_r1.nzVirtualScrollDirective.templateRef : null)("virtualItemSize", ctx_r1.nzVirtualItemSize)("virtualMaxBufferPx", ctx_r1.nzVirtualMaxBufferPx)("virtualMinBufferPx", ctx_r1.nzVirtualMinBufferPx)("tableMainElement", tableMainElement_r3)("virtualForTrackBy", ctx_r1.nzVirtualForTrackBy)("noDataVirtualHeight", ctx_r1.noDataVirtualHeight);
  }
}
function NzTableComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-table-inner-default", 8);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    const contentTemplate_r4 = \u0275\u0275reference(12);
    \u0275\u0275property("tableLayout", ctx_r1.nzTableLayout)("listOfColWidth", ctx_r1.listOfManualColWidth)("theadTemplate", ctx_r1.theadTemplate)("contentTemplate", contentTemplate_r4)("tfootTemplate", ctx_r1.tfootTemplate);
  }
}
function NzTableComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-table-title-footer", 9);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("footer", ctx_r1.nzFooter);
  }
}
function NzTableComponent_Conditional_8_ng_template_0_Template(rf, ctx) {
}
function NzTableComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTableComponent_Conditional_8_ng_template_0_Template, 0, 0, "ng-template", 4);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const paginationTemplate_r1 = \u0275\u0275reference(10);
    \u0275\u0275property("ngTemplateOutlet", paginationTemplate_r1);
  }
}
function NzTableComponent_ng_template_9_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-pagination", 11);
    \u0275\u0275listener("nzPageSizeChange", function NzTableComponent_ng_template_9_Conditional_0_Template_nz_pagination_nzPageSizeChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPageSizeChange($event));
    })("nzPageIndexChange", function NzTableComponent_ng_template_9_Conditional_0_Template_nz_pagination_nzPageIndexChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onPageIndexChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("hidden", !ctx_r1.showPagination)("nzShowSizeChanger", ctx_r1.nzShowSizeChanger)("nzPageSizeOptions", ctx_r1.nzPageSizeOptions)("nzItemRender", ctx_r1.nzItemRender)("nzShowQuickJumper", ctx_r1.nzShowQuickJumper)("nzHideOnSinglePage", ctx_r1.nzHideOnSinglePage)("nzShowTotal", ctx_r1.nzShowTotal)("nzSize", ctx_r1.nzPaginationType === "small" ? "small" : ctx_r1.nzSize === "default" ? "default" : "small")("nzPageSize", ctx_r1.nzPageSize)("nzTotal", ctx_r1.nzTotal)("nzSimple", ctx_r1.nzSimple)("nzPageIndex", ctx_r1.nzPageIndex);
  }
}
function NzTableComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTableComponent_ng_template_9_Conditional_0_Template, 1, 12, "nz-pagination", 10);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.nzShowPagination && ctx_r1.data.length ? 0 : -1);
  }
}
function NzTableComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
var _c142 = ["contentTemplate"];
var _c152 = ["nzSummary", ""];
function NzTfootSummaryComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function NzTfootSummaryComponent_Conditional_2_ng_template_0_Template(rf, ctx) {
}
function NzTfootSummaryComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTfootSummaryComponent_Conditional_2_ng_template_0_Template, 0, 0, "ng-template", 1);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const contentTemplate_r1 = \u0275\u0275reference(1);
    \u0275\u0275property("ngTemplateOutlet", contentTemplate_r1);
  }
}
function NzTheadComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function NzTheadComponent_Conditional_2_ng_template_0_Template(rf, ctx) {
}
function NzTheadComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTheadComponent_Conditional_2_ng_template_0_Template, 0, 0, "ng-template", 1);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const contentTemplate_r1 = \u0275\u0275reference(1);
    \u0275\u0275property("ngTemplateOutlet", contentTemplate_r1);
  }
}
var NZ_CONFIG_MODULE_NAME$2 = "filterTrigger";
var NzFilterTriggerComponent = (() => {
  var _a;
  let _nzBackdrop_decorators;
  let _nzBackdrop_initializers = [];
  let _nzBackdrop_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME$2);
      __publicField(this, "nzConfigService", inject(NzConfigService));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "nzActive", false);
      __publicField(this, "nzDropdownMenu");
      __publicField(this, "nzVisible", false);
      __publicField(this, "nzBackdrop", __runInitializers(this, _nzBackdrop_initializers, false));
      __publicField(this, "nzVisibleChange", (__runInitializers(this, _nzBackdrop_extraInitializers), new EventEmitter()));
      __publicField(this, "nzDropdown");
    }
    onVisibleChange(visible) {
      this.nzVisible = visible;
      this.nzVisibleChange.next(visible);
    }
    hide() {
      this.nzVisible = false;
      this.cdr.markForCheck();
    }
    show() {
      this.nzVisible = true;
      this.cdr.markForCheck();
    }
    ngOnInit() {
      fromEventOutsideAngular(this.nzDropdown.nativeElement, "click").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => event.stopPropagation());
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
  })(), __publicField(_a, "\u0275fac", function NzFilterTriggerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-filter-trigger"]],
    viewQuery: function NzFilterTriggerComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(NzDropdownDirective, 7, ElementRef);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzDropdown = _t.first);
      }
    },
    inputs: {
      nzActive: "nzActive",
      nzDropdownMenu: "nzDropdownMenu",
      nzVisible: "nzVisible",
      nzBackdrop: [2, "nzBackdrop", "nzBackdrop", booleanAttribute]
    },
    outputs: {
      nzVisibleChange: "nzVisibleChange"
    },
    exportAs: ["nzFilterTrigger"],
    ngContentSelectors: _c09,
    decls: 2,
    vars: 8,
    consts: [["nz-dropdown", "", "nzTrigger", "click", "nzPlacement", "bottomRight", 1, "ant-table-filter-trigger", 3, "nzVisibleChange", "nzBackdrop", "nzClickHide", "nzDropdownMenu", "nzVisible"]],
    template: function NzFilterTriggerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "span", 0);
        \u0275\u0275listener("nzVisibleChange", function NzFilterTriggerComponent_Template_span_nzVisibleChange_0_listener($event) {
          return ctx.onVisibleChange($event);
        });
        \u0275\u0275projection(1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classProp("active", ctx.nzActive)("ant-table-filter-open", ctx.nzVisible);
        \u0275\u0275property("nzBackdrop", ctx.nzBackdrop)("nzClickHide", false)("nzDropdownMenu", ctx.nzDropdownMenu)("nzVisible", ctx.nzVisible);
      }
    },
    dependencies: [NzDropdownModule, NzDropdownDirective],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzFilterTriggerComponent, [{
    type: Component,
    args: [{
      selector: "nz-filter-trigger",
      exportAs: `nzFilterTrigger`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <span
      nz-dropdown
      class="ant-table-filter-trigger"
      nzTrigger="click"
      nzPlacement="bottomRight"
      [nzBackdrop]="nzBackdrop"
      [nzClickHide]="false"
      [nzDropdownMenu]="nzDropdownMenu"
      [class.active]="nzActive"
      [class.ant-table-filter-open]="nzVisible"
      [nzVisible]="nzVisible"
      (nzVisibleChange)="onVisibleChange($event)"
    >
      <ng-content />
    </span>
  `,
      imports: [NzDropdownModule]
    }]
  }], null, {
    nzActive: [{
      type: Input
    }],
    nzDropdownMenu: [{
      type: Input
    }],
    nzVisible: [{
      type: Input
    }],
    nzBackdrop: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzVisibleChange: [{
      type: Output
    }],
    nzDropdown: [{
      type: ViewChild,
      args: [NzDropdownDirective, {
        static: true,
        read: ElementRef
      }]
    }]
  });
})();
var _NzTableFilterComponent = class _NzTableFilterComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "i18n", inject(NzI18nService));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "contentTemplate", null);
    __publicField(this, "customFilter", false);
    __publicField(this, "extraTemplate", null);
    __publicField(this, "filterMultiple", true);
    __publicField(this, "listOfFilter", []);
    __publicField(this, "filterChange", new EventEmitter());
    __publicField(this, "locale");
    __publicField(this, "isChecked", false);
    __publicField(this, "isVisible", false);
    __publicField(this, "listOfParsedFilter", []);
    __publicField(this, "listOfChecked", []);
  }
  check(filter2) {
    if (this.filterMultiple) {
      this.listOfParsedFilter = this.listOfParsedFilter.map((item) => {
        if (item === filter2) {
          return __spreadProps(__spreadValues({}, item), {
            checked: !filter2.checked
          });
        } else {
          return item;
        }
      });
      filter2.checked = !filter2.checked;
    } else {
      this.listOfParsedFilter = this.listOfParsedFilter.map((item) => __spreadProps(__spreadValues({}, item), {
        checked: item === filter2
      }));
    }
    this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
  }
  confirm() {
    this.isVisible = false;
    this.emitFilterData();
  }
  reset() {
    this.isVisible = false;
    this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter, true);
    this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    this.emitFilterData();
  }
  onVisibleChange(value) {
    this.isVisible = value;
    if (!value) {
      this.emitFilterData();
    } else {
      this.listOfChecked = this.listOfParsedFilter.filter((item) => item.checked).map((item) => item.value);
    }
  }
  emitFilterData() {
    const listOfChecked = this.listOfParsedFilter.filter((item) => item.checked).map((item) => item.value);
    if (!arraysEqual(this.listOfChecked, listOfChecked)) {
      if (this.filterMultiple) {
        this.filterChange.emit(listOfChecked);
      } else {
        this.filterChange.emit(listOfChecked.length > 0 ? listOfChecked[0] : null);
      }
    }
  }
  parseListOfFilter(listOfFilter, reset) {
    return listOfFilter.map((item) => {
      const checked = reset ? false : !!item.byDefault;
      return {
        text: item.text,
        value: item.value,
        checked
      };
    });
  }
  getCheckedStatus(listOfParsedFilter) {
    return listOfParsedFilter.some((item) => item.checked);
  }
  ngOnInit() {
    this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.locale = this.i18n.getLocaleData("Table");
      this.cdr.markForCheck();
    });
  }
  ngOnChanges(changes) {
    const {
      listOfFilter
    } = changes;
    if (listOfFilter && this.listOfFilter && this.listOfFilter.length) {
      this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter);
      this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    }
  }
};
__publicField(_NzTableFilterComponent, "\u0275fac", function NzTableFilterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTableFilterComponent)();
});
__publicField(_NzTableFilterComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTableFilterComponent,
  selectors: [["nz-table-filter"]],
  hostAttrs: [1, "ant-table-filter-column"],
  inputs: {
    contentTemplate: "contentTemplate",
    customFilter: "customFilter",
    extraTemplate: "extraTemplate",
    filterMultiple: "filterMultiple",
    listOfFilter: "listOfFilter"
  },
  outputs: {
    filterChange: "filterChange"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 4,
  vars: 2,
  consts: [["filterMenu", "nzDropdownMenu"], [1, "ant-table-column-title"], [3, "ngTemplateOutlet"], [3, "nzVisibleChange", "nzVisible", "nzActive", "nzDropdownMenu"], ["nzType", "filter", "nzTheme", "fill"], [1, "ant-table-filter-dropdown"], ["nz-menu", ""], ["nz-menu-item", "", 3, "nzSelected"], [1, "ant-table-filter-dropdown-btns"], ["nz-button", "", "nzType", "link", "nzSize", "small", 3, "click", "disabled"], ["nz-button", "", "nzType", "primary", "nzSize", "small", 3, "click"], ["nz-menu-item", "", 3, "click", "nzSelected"], ["nz-radio", "", 3, "ngModel"], ["nz-checkbox", "", 3, "ngModel"], ["nz-radio", "", 3, "ngModelChange", "ngModel"], ["nz-checkbox", "", 3, "ngModelChange", "ngModel"]],
  template: function NzTableFilterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "span", 1);
      \u0275\u0275template(1, NzTableFilterComponent_ng_template_1_Template, 0, 0, "ng-template", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(2, NzTableFilterComponent_Conditional_2_Template, 13, 6)(3, NzTableFilterComponent_Conditional_3_Template, 1, 1, "ng-container", 2);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngTemplateOutlet", ctx.contentTemplate);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.customFilter ? 2 : 3);
    }
  },
  dependencies: [NgTemplateOutlet, NzFilterTriggerComponent, NzIconModule, NzIconDirective, NzDropdownModule, NzMenuDirective, NzMenuItemComponent, NzDropdownMenuComponent, NzRadioComponent, NzCheckboxModule, NzCheckboxComponent, FormsModule, NgControlStatus, NgModel, NzButtonModule, NzButtonComponent, NzTransitionPatchDirective, NzWaveDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTableFilterComponent = _NzTableFilterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableFilterComponent, [{
    type: Component,
    args: [{
      selector: "nz-table-filter",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <span class="ant-table-column-title">
      <ng-template [ngTemplateOutlet]="contentTemplate" />
    </span>
    @if (!customFilter) {
      <nz-filter-trigger
        [nzVisible]="isVisible"
        [nzActive]="isChecked"
        [nzDropdownMenu]="filterMenu"
        (nzVisibleChange)="onVisibleChange($event)"
      >
        <nz-icon nzType="filter" nzTheme="fill" />
      </nz-filter-trigger>
      <nz-dropdown-menu #filterMenu="nzDropdownMenu">
        <div class="ant-table-filter-dropdown">
          <ul nz-menu>
            @for (f of listOfParsedFilter; track f.value) {
              <li nz-menu-item [nzSelected]="f.checked" (click)="check(f)">
                @if (!filterMultiple) {
                  <label nz-radio [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
                } @else {
                  <label nz-checkbox [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
                }
                <span>{{ f.text }}</span>
              </li>
            }
          </ul>
          <div class="ant-table-filter-dropdown-btns">
            <button nz-button nzType="link" nzSize="small" (click)="reset()" [disabled]="!isChecked">
              {{ locale.filterReset }}
            </button>
            <button nz-button nzType="primary" nzSize="small" (click)="confirm()">{{ locale.filterConfirm }}</button>
          </div>
        </div>
      </nz-dropdown-menu>
    } @else {
      <ng-container [ngTemplateOutlet]="extraTemplate" />
    }
  `,
      host: {
        class: "ant-table-filter-column"
      },
      imports: [NgTemplateOutlet, NzFilterTriggerComponent, NzIconModule, NzDropdownModule, NzRadioComponent, NzCheckboxModule, FormsModule, NzButtonModule]
    }]
  }], null, {
    contentTemplate: [{
      type: Input
    }],
    customFilter: [{
      type: Input
    }],
    extraTemplate: [{
      type: Input
    }],
    filterMultiple: [{
      type: Input
    }],
    listOfFilter: [{
      type: Input
    }],
    filterChange: [{
      type: Output
    }]
  });
})();
var _NzRowExpandButtonDirective = class _NzRowExpandButtonDirective {
  constructor() {
    __publicField(this, "expand", false);
    __publicField(this, "spaceMode", false);
    __publicField(this, "expandChange", new EventEmitter());
  }
  onHostClick() {
    if (!this.spaceMode) {
      this.expand = !this.expand;
      this.expandChange.next(this.expand);
    }
  }
};
__publicField(_NzRowExpandButtonDirective, "\u0275fac", function NzRowExpandButtonDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzRowExpandButtonDirective)();
});
__publicField(_NzRowExpandButtonDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzRowExpandButtonDirective,
  selectors: [["button", "nz-row-expand-button", ""]],
  hostAttrs: [1, "ant-table-row-expand-icon"],
  hostVars: 7,
  hostBindings: function NzRowExpandButtonDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function NzRowExpandButtonDirective_click_HostBindingHandler() {
        return ctx.onHostClick();
      });
    }
    if (rf & 2) {
      \u0275\u0275domProperty("type", "button");
      \u0275\u0275classProp("ant-table-row-expand-icon-expanded", !ctx.spaceMode && ctx.expand === true)("ant-table-row-expand-icon-collapsed", !ctx.spaceMode && ctx.expand === false)("ant-table-row-expand-icon-spaced", ctx.spaceMode);
    }
  },
  inputs: {
    expand: "expand",
    spaceMode: "spaceMode"
  },
  outputs: {
    expandChange: "expandChange"
  }
}));
var NzRowExpandButtonDirective = _NzRowExpandButtonDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRowExpandButtonDirective, [{
    type: Directive,
    args: [{
      selector: "button[nz-row-expand-button]",
      host: {
        class: "ant-table-row-expand-icon",
        "[type]": `'button'`,
        "[class.ant-table-row-expand-icon-expanded]": `!spaceMode && expand === true`,
        "[class.ant-table-row-expand-icon-collapsed]": `!spaceMode && expand === false`,
        "[class.ant-table-row-expand-icon-spaced]": "spaceMode",
        "(click)": "onHostClick()"
      }
    }]
  }], null, {
    expand: [{
      type: Input
    }],
    spaceMode: [{
      type: Input
    }],
    expandChange: [{
      type: Output
    }]
  });
})();
var _NzRowIndentDirective = class _NzRowIndentDirective {
  constructor() {
    __publicField(this, "indentSize", 0);
  }
};
__publicField(_NzRowIndentDirective, "\u0275fac", function NzRowIndentDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzRowIndentDirective)();
});
__publicField(_NzRowIndentDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzRowIndentDirective,
  selectors: [["nz-row-indent"]],
  hostAttrs: [1, "ant-table-row-indent"],
  hostVars: 2,
  hostBindings: function NzRowIndentDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("padding-left", ctx.indentSize, "px");
    }
  },
  inputs: {
    indentSize: "indentSize"
  }
}));
var NzRowIndentDirective = _NzRowIndentDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRowIndentDirective, [{
    type: Directive,
    args: [{
      selector: "nz-row-indent",
      host: {
        class: "ant-table-row-indent",
        "[style.padding-left.px]": "indentSize"
      }
    }]
  }], null, {
    indentSize: [{
      type: Input
    }]
  });
})();
var _NzTableSelectionComponent = class _NzTableSelectionComponent {
  constructor() {
    __publicField(this, "listOfSelections", []);
    __publicField(this, "checked", false);
    __publicField(this, "disabled", false);
    __publicField(this, "indeterminate", false);
    __publicField(this, "label", null);
    __publicField(this, "showCheckbox", false);
    __publicField(this, "showRowSelection", false);
    __publicField(this, "checkedChange", new EventEmitter());
  }
  onCheckedChange(checked) {
    this.checked = checked;
    this.checkedChange.emit(checked);
  }
};
__publicField(_NzTableSelectionComponent, "\u0275fac", function NzTableSelectionComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTableSelectionComponent)();
});
__publicField(_NzTableSelectionComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTableSelectionComponent,
  selectors: [["nz-table-selection"]],
  hostAttrs: [1, "ant-table-selection"],
  inputs: {
    listOfSelections: "listOfSelections",
    checked: "checked",
    disabled: "disabled",
    indeterminate: "indeterminate",
    label: "label",
    showCheckbox: "showCheckbox",
    showRowSelection: "showRowSelection"
  },
  outputs: {
    checkedChange: "checkedChange"
  },
  decls: 2,
  vars: 2,
  consts: [["selectionMenu", "nzDropdownMenu"], ["nz-checkbox", "", 3, "ant-table-selection-select-all-custom", "ngModel", "nzDisabled", "nzIndeterminate"], [1, "ant-table-selection-extra"], ["nz-checkbox", "", 3, "ngModelChange", "ngModel", "nzDisabled", "nzIndeterminate"], ["nz-dropdown", "", "nzPlacement", "bottomLeft", 1, "ant-table-selection-down", 3, "nzDropdownMenu"], ["nzType", "down"], ["nz-menu", "", 1, "ant-table-selection-menu"], ["nz-menu-item", ""], ["nz-menu-item", "", 3, "click"]],
  template: function NzTableSelectionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzTableSelectionComponent_Conditional_0_Template, 1, 6, "label", 1);
      \u0275\u0275conditionalCreate(1, NzTableSelectionComponent_Conditional_1_Template, 8, 1, "div", 2);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.showCheckbox ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showRowSelection ? 1 : -1);
    }
  },
  dependencies: [FormsModule, NgControlStatus, NgModel, NzCheckboxModule, NzCheckboxComponent, NzDropdownModule, NzMenuDirective, NzMenuItemComponent, NzDropdownDirective, NzDropdownMenuComponent, NzIconModule, NzIconDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTableSelectionComponent = _NzTableSelectionComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableSelectionComponent, [{
    type: Component,
    args: [{
      selector: "nz-table-selection",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @if (showCheckbox) {
      <label
        nz-checkbox
        [class.ant-table-selection-select-all-custom]="showRowSelection"
        [ngModel]="checked"
        [nzDisabled]="disabled"
        [nzIndeterminate]="indeterminate"
        [attr.aria-label]="label"
        (ngModelChange)="onCheckedChange($event)"
      ></label>
    }
    @if (showRowSelection) {
      <div class="ant-table-selection-extra">
        <span nz-dropdown class="ant-table-selection-down" nzPlacement="bottomLeft" [nzDropdownMenu]="selectionMenu">
          <nz-icon nzType="down" />
        </span>
        <nz-dropdown-menu #selectionMenu="nzDropdownMenu">
          <ul nz-menu class="ant-table-selection-menu">
            @for (selection of listOfSelections; track selection) {
              <li nz-menu-item (click)="selection.onSelect()">
                {{ selection.text }}
              </li>
            }
          </ul>
        </nz-dropdown-menu>
      </div>
    }
  `,
      host: {
        class: "ant-table-selection"
      },
      imports: [FormsModule, NzCheckboxModule, NzDropdownModule, NzIconModule]
    }]
  }], null, {
    listOfSelections: [{
      type: Input
    }],
    checked: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    indeterminate: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    showCheckbox: [{
      type: Input
    }],
    showRowSelection: [{
      type: Input
    }],
    checkedChange: [{
      type: Output
    }]
  });
})();
var _NzTableSortersComponent = class _NzTableSortersComponent {
  constructor() {
    __publicField(this, "sortDirections", ["ascend", "descend", null]);
    __publicField(this, "sortOrder", null);
    __publicField(this, "contentTemplate", null);
    __publicField(this, "isUp", false);
    __publicField(this, "isDown", false);
  }
  ngOnChanges(changes) {
    const {
      sortDirections
    } = changes;
    if (sortDirections) {
      this.isUp = this.sortDirections.indexOf("ascend") !== -1;
      this.isDown = this.sortDirections.indexOf("descend") !== -1;
    }
  }
};
__publicField(_NzTableSortersComponent, "\u0275fac", function NzTableSortersComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTableSortersComponent)();
});
__publicField(_NzTableSortersComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTableSortersComponent,
  selectors: [["nz-table-sorters"]],
  hostAttrs: [1, "ant-table-column-sorters"],
  inputs: {
    sortDirections: "sortDirections",
    sortOrder: "sortOrder",
    contentTemplate: "contentTemplate"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 6,
  vars: 5,
  consts: [[1, "ant-table-column-title"], [3, "ngTemplateOutlet"], [1, "ant-table-column-sorter"], [1, "ant-table-column-sorter-inner"], ["nzType", "caret-up", 1, "ant-table-column-sorter-up", 3, "active"], ["nzType", "caret-down", 1, "ant-table-column-sorter-down", 3, "active"], ["nzType", "caret-up", 1, "ant-table-column-sorter-up"], ["nzType", "caret-down", 1, "ant-table-column-sorter-down"]],
  template: function NzTableSortersComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "span", 0);
      \u0275\u0275template(1, NzTableSortersComponent_ng_template_1_Template, 0, 0, "ng-template", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(2, "span", 2)(3, "span", 3);
      \u0275\u0275conditionalCreate(4, NzTableSortersComponent_Conditional_4_Template, 1, 2, "nz-icon", 4);
      \u0275\u0275conditionalCreate(5, NzTableSortersComponent_Conditional_5_Template, 1, 2, "nz-icon", 5);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("ngTemplateOutlet", ctx.contentTemplate);
      \u0275\u0275advance();
      \u0275\u0275classProp("ant-table-column-sorter-full", ctx.isDown && ctx.isUp);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isUp ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isDown ? 5 : -1);
    }
  },
  dependencies: [NzIconModule, NzIconDirective, NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTableSortersComponent = _NzTableSortersComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableSortersComponent, [{
    type: Component,
    args: [{
      selector: "nz-table-sorters",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <span class="ant-table-column-title"><ng-template [ngTemplateOutlet]="contentTemplate" /></span>
    <span class="ant-table-column-sorter" [class.ant-table-column-sorter-full]="isDown && isUp">
      <span class="ant-table-column-sorter-inner">
        @if (isUp) {
          <nz-icon nzType="caret-up" class="ant-table-column-sorter-up" [class.active]="sortOrder === 'ascend'" />
        }
        @if (isDown) {
          <nz-icon nzType="caret-down" class="ant-table-column-sorter-down" [class.active]="sortOrder === 'descend'" />
        }
      </span>
    </span>
  `,
      host: {
        class: "ant-table-column-sorters"
      },
      imports: [NzIconModule, NgTemplateOutlet]
    }]
  }], null, {
    sortDirections: [{
      type: Input
    }],
    sortOrder: [{
      type: Input
    }],
    contentTemplate: [{
      type: Input
    }]
  });
})();
var _NzCellFixedDirective = class _NzCellFixedDirective {
  constructor() {
    __publicField(this, "renderer", inject(Renderer2));
    __publicField(this, "el", inject(ElementRef).nativeElement);
    __publicField(this, "nzRight", false);
    __publicField(this, "nzLeft", false);
    __publicField(this, "colspan", null);
    __publicField(this, "colSpan", null);
    __publicField(this, "changes$", new Subject());
    __publicField(this, "isAutoLeft", false);
    __publicField(this, "isAutoRight", false);
    __publicField(this, "isFixedLeft", false);
    __publicField(this, "isFixedRight", false);
    __publicField(this, "isFixed", false);
  }
  setAutoLeftWidth(autoLeft) {
    this.renderer.setStyle(this.el, "left", autoLeft);
  }
  setAutoRightWidth(autoRight) {
    this.renderer.setStyle(this.el, "right", autoRight);
  }
  setIsFirstRight(isFirstRight) {
    this.setFixClass(isFirstRight, "ant-table-cell-fix-right-first");
  }
  setIsLastLeft(isLastLeft) {
    this.setFixClass(isLastLeft, "ant-table-cell-fix-left-last");
  }
  setFixClass(flag, className) {
    this.renderer.removeClass(this.el, className);
    if (flag) {
      this.renderer.addClass(this.el, className);
    }
  }
  ngOnChanges() {
    this.setIsFirstRight(false);
    this.setIsLastLeft(false);
    this.isAutoLeft = this.nzLeft === "" || this.nzLeft === true;
    this.isAutoRight = this.nzRight === "" || this.nzRight === true;
    this.isFixedLeft = this.nzLeft !== false;
    this.isFixedRight = this.nzRight !== false;
    this.isFixed = this.isFixedLeft || this.isFixedRight;
    const validatePx = (value) => {
      if (typeof value === "string" && value !== "") {
        return value;
      } else {
        return null;
      }
    };
    this.setAutoLeftWidth(validatePx(this.nzLeft));
    this.setAutoRightWidth(validatePx(this.nzRight));
    this.changes$.next();
  }
};
__publicField(_NzCellFixedDirective, "\u0275fac", function NzCellFixedDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzCellFixedDirective)();
});
__publicField(_NzCellFixedDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzCellFixedDirective,
  selectors: [["td", "nzRight", ""], ["th", "nzRight", ""], ["td", "nzLeft", ""], ["th", "nzLeft", ""]],
  hostVars: 6,
  hostBindings: function NzCellFixedDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("position", ctx.isFixed ? "sticky" : null);
      \u0275\u0275classProp("ant-table-cell-fix-right", ctx.isFixedRight)("ant-table-cell-fix-left", ctx.isFixedLeft);
    }
  },
  inputs: {
    nzRight: "nzRight",
    nzLeft: "nzLeft",
    colspan: "colspan",
    colSpan: "colSpan"
  },
  features: [\u0275\u0275NgOnChangesFeature]
}));
var NzCellFixedDirective = _NzCellFixedDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCellFixedDirective, [{
    type: Directive,
    args: [{
      selector: "td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]",
      host: {
        "[class.ant-table-cell-fix-right]": `isFixedRight`,
        "[class.ant-table-cell-fix-left]": `isFixedLeft`,
        "[style.position]": `isFixed? 'sticky' : null`
      }
    }]
  }], null, {
    nzRight: [{
      type: Input
    }],
    nzLeft: [{
      type: Input
    }],
    colspan: [{
      type: Input
    }],
    colSpan: [{
      type: Input
    }]
  });
})();
var _NzTableStyleService = class _NzTableStyleService {
  constructor() {
    __publicField(this, "theadTemplate$", new ReplaySubject(1));
    __publicField(this, "tfootTemplate$", new ReplaySubject(1));
    __publicField(this, "tfootFixed$", new ReplaySubject(1));
    __publicField(this, "hasFixLeft$", new ReplaySubject(1));
    __publicField(this, "hasFixRight$", new ReplaySubject(1));
    __publicField(this, "hostWidth$", new ReplaySubject(1));
    __publicField(this, "columnCount$", new ReplaySubject(1));
    __publicField(this, "showEmpty$", new ReplaySubject(1));
    __publicField(this, "noResult$", new ReplaySubject(1));
    __publicField(this, "listOfThWidthConfigPx$", new BehaviorSubject([]));
    __publicField(this, "tableWidthConfigPx$", new BehaviorSubject([]));
    __publicField(this, "manualWidthConfigPx$", combineLatest([this.tableWidthConfigPx$, this.listOfThWidthConfigPx$]).pipe(map(([widthConfig, listOfWidth]) => widthConfig.length ? widthConfig : listOfWidth)));
    __publicField(this, "listOfAutoWidthPx$", new ReplaySubject(1));
    __publicField(this, "listOfListOfThWidthPx$", merge(
      /** init with manual width **/
      this.manualWidthConfigPx$,
      combineLatest([this.listOfAutoWidthPx$, this.manualWidthConfigPx$]).pipe(map(([autoWidth, manualWidth]) => {
        if (autoWidth.length === manualWidth.length) {
          return autoWidth.map((width, index) => {
            if (width === "0px") {
              return manualWidth[index] || null;
            } else {
              return manualWidth[index] || width;
            }
          });
        } else {
          return manualWidth;
        }
      }))
    ));
    __publicField(this, "listOfMeasureColumn$", new ReplaySubject(1));
    __publicField(this, "listOfListOfThWidth$", this.listOfAutoWidthPx$.pipe(map((list) => list.map((width) => parseInt(width, 10)))));
    __publicField(this, "enableAutoMeasure$", new ReplaySubject(1));
  }
  setTheadTemplate(template) {
    this.theadTemplate$.next(template);
  }
  setTfootTemplate(template) {
    this.tfootTemplate$.next(template);
  }
  setTfootFixed(fixed) {
    this.tfootFixed$.next(fixed);
  }
  setHasFixLeft(hasFixLeft) {
    this.hasFixLeft$.next(hasFixLeft);
  }
  setHasFixRight(hasFixRight) {
    this.hasFixRight$.next(hasFixRight);
  }
  setTableWidthConfig(widthConfig) {
    this.tableWidthConfigPx$.next(widthConfig);
  }
  setListOfTh(listOfTh) {
    let columnCount = 0;
    listOfTh.forEach((th) => {
      columnCount += th.colspan && +th.colspan || th.colSpan && +th.colSpan || 1;
    });
    const listOfThPx = listOfTh.map((item) => item.nzWidth);
    this.columnCount$.next(columnCount);
    this.listOfThWidthConfigPx$.next(listOfThPx);
  }
  setListOfMeasureColumn(listOfTh) {
    const listOfKeys = [];
    listOfTh.forEach((th) => {
      const length = th.colspan && +th.colspan || th.colSpan && +th.colSpan || 1;
      for (let i = 0; i < length; i++) {
        listOfKeys.push(`measure_key_${i}`);
      }
    });
    this.listOfMeasureColumn$.next(listOfKeys);
  }
  setListOfAutoWidth(listOfAutoWidth) {
    this.listOfAutoWidthPx$.next(listOfAutoWidth.map((width) => `${width}px`));
  }
  setShowEmpty(showEmpty) {
    this.showEmpty$.next(showEmpty);
  }
  setNoResult(noResult) {
    this.noResult$.next(noResult);
  }
  setScroll(scrollX, scrollY) {
    const enableAutoMeasure = !!(scrollX || scrollY);
    if (!enableAutoMeasure) {
      this.setListOfAutoWidth([]);
    }
    this.enableAutoMeasure$.next(enableAutoMeasure);
  }
};
__publicField(_NzTableStyleService, "\u0275fac", function NzTableStyleService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTableStyleService)();
});
__publicField(_NzTableStyleService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _NzTableStyleService,
  factory: _NzTableStyleService.\u0275fac
}));
var NzTableStyleService = _NzTableStyleService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableStyleService, [{
    type: Injectable
  }], null, null);
})();
var _NzTableCellDirective = class _NzTableCellDirective {
  constructor() {
    __publicField(this, "isInsideTable", !!inject(NzTableStyleService, {
      optional: true
    }));
  }
};
__publicField(_NzTableCellDirective, "\u0275fac", function NzTableCellDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTableCellDirective)();
});
__publicField(_NzTableCellDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTableCellDirective,
  selectors: [["th", 9, "nz-disable-th"], ["td", 9, "nz-disable-td"]],
  hostVars: 2,
  hostBindings: function NzTableCellDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-table-cell", ctx.isInsideTable);
    }
  }
}));
var NzTableCellDirective = _NzTableCellDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableCellDirective, [{
    type: Directive,
    args: [{
      selector: "th:not(.nz-disable-th), td:not(.nz-disable-td)",
      host: {
        "[class.ant-table-cell]": "isInsideTable"
      }
    }]
  }], null, null);
})();
var _NzTableDataService = class _NzTableDataService {
  constructor() {
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "pageIndex$", new BehaviorSubject(1));
    __publicField(this, "frontPagination$", new BehaviorSubject(true));
    __publicField(this, "pageSize$", new BehaviorSubject(10));
    __publicField(this, "listOfData$", new BehaviorSubject([]));
    __publicField(this, "listOfCustomColumn$", new BehaviorSubject([]));
    __publicField(this, "pageIndexDistinct$", this.pageIndex$.pipe(distinctUntilChanged()));
    __publicField(this, "pageSizeDistinct$", this.pageSize$.pipe(distinctUntilChanged()));
    __publicField(this, "listOfCalcOperator$", new BehaviorSubject([]));
    __publicField(this, "queryParams$", combineLatest([this.pageIndexDistinct$, this.pageSizeDistinct$, this.listOfCalcOperator$]).pipe(debounceTime(0), skip(1), map(([pageIndex, pageSize, listOfCalc]) => ({
      pageIndex,
      pageSize,
      sort: listOfCalc.filter((item) => item.sortFn).map((item) => ({
        key: item.key,
        value: item.sortOrder
      })),
      filter: listOfCalc.filter((item) => item.filterFn).map((item) => ({
        key: item.key,
        value: item.filterValue
      }))
    }))));
    __publicField(this, "listOfDataAfterCalc$", combineLatest([this.listOfData$, this.listOfCalcOperator$]).pipe(map(([listOfData, listOfCalcOperator]) => {
      let listOfDataAfterCalc = [...listOfData];
      const listOfFilterOperator = listOfCalcOperator.filter((item) => {
        const {
          filterValue,
          filterFn
        } = item;
        const isReset = filterValue === null || filterValue === void 0 || Array.isArray(filterValue) && filterValue.length === 0;
        return !isReset && typeof filterFn === "function";
      });
      for (const item of listOfFilterOperator) {
        const {
          filterFn,
          filterValue
        } = item;
        listOfDataAfterCalc = listOfDataAfterCalc.filter((data) => filterFn(filterValue, data));
      }
      const listOfSortOperator = listOfCalcOperator.filter((item) => item.sortOrder !== null && typeof item.sortFn === "function").sort((a, b) => +b.sortPriority - +a.sortPriority);
      if (listOfCalcOperator.length) {
        listOfDataAfterCalc.sort((record1, record2) => {
          for (const item of listOfSortOperator) {
            const {
              sortFn,
              sortOrder
            } = item;
            if (sortFn && sortOrder) {
              const compareResult = sortFn(record1, record2, sortOrder);
              if (compareResult !== 0) {
                return sortOrder === "ascend" ? compareResult : -compareResult;
              }
            }
          }
          return 0;
        });
      }
      return listOfDataAfterCalc;
    })));
    __publicField(this, "listOfFrontEndCurrentPageData$", combineLatest([this.pageIndexDistinct$, this.pageSizeDistinct$, this.listOfDataAfterCalc$]).pipe(takeUntilDestroyed(this.destroyRef), filter((value) => {
      const [pageIndex, pageSize, listOfData] = value;
      const maxPageIndex = Math.ceil(listOfData.length / pageSize) || 1;
      return pageIndex <= maxPageIndex;
    }), map(([pageIndex, pageSize, listOfData]) => listOfData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize))));
    __publicField(this, "listOfCurrentPageData$", this.frontPagination$.pipe(switchMap((pagination) => pagination ? this.listOfFrontEndCurrentPageData$ : this.listOfDataAfterCalc$)));
    __publicField(this, "total$", this.frontPagination$.pipe(switchMap((pagination) => pagination ? this.listOfDataAfterCalc$ : this.listOfData$), map((list) => list.length), distinctUntilChanged()));
  }
  updatePageSize(size) {
    this.pageSize$.next(size);
  }
  updateFrontPagination(pagination) {
    this.frontPagination$.next(pagination);
  }
  updatePageIndex(index) {
    this.pageIndex$.next(index);
  }
  updateListOfData(list) {
    this.listOfData$.next(list);
  }
  updateListOfCustomColumn(list) {
    this.listOfCustomColumn$.next(list);
  }
};
__publicField(_NzTableDataService, "\u0275fac", function NzTableDataService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTableDataService)();
});
__publicField(_NzTableDataService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _NzTableDataService,
  factory: _NzTableDataService.\u0275fac
}));
var NzTableDataService = _NzTableDataService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableDataService, [{
    type: Injectable
  }], null, null);
})();
var _NzCustomColumnDirective = class _NzCustomColumnDirective {
  constructor() {
    __publicField(this, "el", inject(ElementRef).nativeElement);
    __publicField(this, "renderer", inject(Renderer2));
    __publicField(this, "nzTableDataService", inject(NzTableDataService));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "nzCellControl", null);
  }
  ngOnInit() {
    this.nzTableDataService.listOfCustomColumn$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((item) => {
      item.forEach((v, i) => {
        if (v.value === this.nzCellControl) {
          this.renderer.setStyle(this.el, "display", v.default ? "block" : "none");
          this.renderer.setStyle(this.el, "order", i);
          this.renderer.setStyle(this.el, "flex", v.fixWidth ? `1 0 ${v.width}px` : `1 1 ${v.width}px`);
        }
      });
    });
  }
};
__publicField(_NzCustomColumnDirective, "\u0275fac", function NzCustomColumnDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzCustomColumnDirective)();
});
__publicField(_NzCustomColumnDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzCustomColumnDirective,
  selectors: [["td", "nzCellControl", ""], ["th", "nzCellControl", ""]],
  inputs: {
    nzCellControl: "nzCellControl"
  }
}));
var NzCustomColumnDirective = _NzCustomColumnDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCustomColumnDirective, [{
    type: Directive,
    args: [{
      selector: "td[nzCellControl],th[nzCellControl]"
    }]
  }], null, {
    nzCellControl: [{
      type: Input
    }]
  });
})();
var _NzTdAddOnComponent = class _NzTdAddOnComponent {
  constructor() {
    __publicField(this, "nzChecked", false);
    __publicField(this, "nzDisabled", false);
    __publicField(this, "nzIndeterminate", false);
    __publicField(this, "nzLabel", null);
    __publicField(this, "nzIndentSize", 0);
    __publicField(this, "nzShowExpand", false);
    __publicField(this, "nzShowCheckbox", false);
    __publicField(this, "nzExpand", false);
    __publicField(this, "nzExpandIcon", null);
    __publicField(this, "nzCheckedChange", new EventEmitter());
    __publicField(this, "nzExpandChange", new EventEmitter());
    __publicField(this, "isNzShowExpandChanged", false);
    __publicField(this, "isNzShowCheckboxChanged", false);
  }
  onCheckedChange(checked) {
    this.nzChecked = checked;
    this.nzCheckedChange.emit(checked);
  }
  onExpandChange(expand) {
    this.nzExpand = expand;
    this.nzExpandChange.emit(expand);
  }
  ngOnChanges(changes) {
    const isFirstChange = (value) => value && value.firstChange && value.currentValue !== void 0;
    const {
      nzExpand,
      nzChecked,
      nzShowExpand,
      nzShowCheckbox
    } = changes;
    if (nzShowExpand) {
      this.isNzShowExpandChanged = true;
    }
    if (nzShowCheckbox) {
      this.isNzShowCheckboxChanged = true;
    }
    if (isFirstChange(nzExpand) && !this.isNzShowExpandChanged) {
      this.nzShowExpand = true;
    }
    if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
      this.nzShowCheckbox = true;
    }
  }
};
__publicField(_NzTdAddOnComponent, "\u0275fac", function NzTdAddOnComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTdAddOnComponent)();
});
__publicField(_NzTdAddOnComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTdAddOnComponent,
  selectors: [["td", "nzChecked", ""], ["td", "nzDisabled", ""], ["td", "nzIndeterminate", ""], ["td", "nzIndentSize", ""], ["td", "nzExpand", ""], ["td", "nzShowExpand", ""], ["td", "nzShowCheckbox", ""]],
  hostVars: 4,
  hostBindings: function NzTdAddOnComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-table-cell-with-append", ctx.nzShowExpand || ctx.nzIndentSize > 0)("ant-table-selection-column", ctx.nzShowCheckbox);
    }
  },
  inputs: {
    nzChecked: "nzChecked",
    nzDisabled: "nzDisabled",
    nzIndeterminate: "nzIndeterminate",
    nzLabel: "nzLabel",
    nzIndentSize: "nzIndentSize",
    nzShowExpand: [2, "nzShowExpand", "nzShowExpand", booleanAttribute],
    nzShowCheckbox: [2, "nzShowCheckbox", "nzShowCheckbox", booleanAttribute],
    nzExpand: [2, "nzExpand", "nzExpand", booleanAttribute],
    nzExpandIcon: "nzExpandIcon"
  },
  outputs: {
    nzCheckedChange: "nzCheckedChange",
    nzExpandChange: "nzExpandChange"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  attrs: _c16,
  ngContentSelectors: _c09,
  decls: 3,
  vars: 2,
  consts: [["nz-checkbox", "", 3, "nzDisabled", "ngModel", "nzIndeterminate"], [3, "indentSize"], [3, "ngTemplateOutlet"], ["nz-row-expand-button", "", 3, "expand", "spaceMode"], ["nz-row-expand-button", "", 3, "expandChange", "expand", "spaceMode"], ["nz-checkbox", "", 3, "ngModelChange", "nzDisabled", "ngModel", "nzIndeterminate"]],
  template: function NzTdAddOnComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275conditionalCreate(0, NzTdAddOnComponent_Conditional_0_Template, 3, 2);
      \u0275\u0275conditionalCreate(1, NzTdAddOnComponent_Conditional_1_Template, 1, 4, "label", 0);
      \u0275\u0275projection(2);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.nzShowExpand || ctx.nzIndentSize > 0 ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzShowCheckbox ? 1 : -1);
    }
  },
  dependencies: [NzRowIndentDirective, NzRowExpandButtonDirective, NgTemplateOutlet, NzCheckboxModule, NzCheckboxComponent, FormsModule, NgControlStatus, NgModel],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTdAddOnComponent = _NzTdAddOnComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTdAddOnComponent, [{
    type: Component,
    args: [{
      selector: "td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @if (nzShowExpand || nzIndentSize > 0) {
      <nz-row-indent [indentSize]="nzIndentSize" />
      @if (nzExpandIcon) {
        <ng-template [ngTemplateOutlet]="nzExpandIcon" />
      } @else {
        <button
          nz-row-expand-button
          [expand]="nzExpand"
          (expandChange)="onExpandChange($event)"
          [spaceMode]="!nzShowExpand"
        ></button>
      }
    }
    @if (nzShowCheckbox) {
      <label
        nz-checkbox
        [nzDisabled]="nzDisabled"
        [ngModel]="nzChecked"
        [nzIndeterminate]="nzIndeterminate"
        [attr.aria-label]="nzLabel"
        (ngModelChange)="onCheckedChange($event)"
      ></label>
    }
    <ng-content />
  `,
      host: {
        "[class.ant-table-cell-with-append]": `nzShowExpand || nzIndentSize > 0`,
        "[class.ant-table-selection-column]": `nzShowCheckbox`
      },
      imports: [NzRowIndentDirective, NzRowExpandButtonDirective, NgTemplateOutlet, NzCheckboxModule, FormsModule]
    }]
  }], null, {
    nzChecked: [{
      type: Input
    }],
    nzDisabled: [{
      type: Input
    }],
    nzIndeterminate: [{
      type: Input
    }],
    nzLabel: [{
      type: Input
    }],
    nzIndentSize: [{
      type: Input
    }],
    nzShowExpand: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowCheckbox: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzExpand: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzExpandIcon: [{
      type: Input
    }],
    nzCheckedChange: [{
      type: Output
    }],
    nzExpandChange: [{
      type: Output
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME$1 = "table";
var NzThAddOnComponent = (() => {
  var _a;
  let _nzSortDirections_decorators;
  let _nzSortDirections_initializers = [];
  let _nzSortDirections_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME$1);
      __publicField(this, "nzConfigService", inject(NzConfigService));
      __publicField(this, "el", inject(ElementRef).nativeElement);
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "ngZone", inject(NgZone));
      __publicField(this, "manualClickOrder$", new Subject());
      __publicField(this, "calcOperatorChange$", new Subject());
      __publicField(this, "nzFilterValue", null);
      __publicField(this, "sortOrder", null);
      __publicField(this, "sortDirections", ["ascend", "descend", null]);
      __publicField(this, "sortOrderChange$", new Subject());
      __publicField(this, "isNzShowSortChanged", false);
      __publicField(this, "isNzShowFilterChanged", false);
      __publicField(this, "nzColumnKey");
      __publicField(this, "nzFilterMultiple", true);
      __publicField(this, "nzSortOrder", null);
      __publicField(this, "nzSortPriority", false);
      __publicField(this, "nzSortDirections", __runInitializers(this, _nzSortDirections_initializers, ["ascend", "descend", null]));
      __publicField(this, "nzFilters", (__runInitializers(this, _nzSortDirections_extraInitializers), []));
      __publicField(this, "nzSortFn", null);
      __publicField(this, "nzFilterFn", null);
      __publicField(this, "nzShowSort", false);
      __publicField(this, "nzShowFilter", false);
      __publicField(this, "nzCustomFilter", false);
      __publicField(this, "nzCheckedChange", new EventEmitter());
      __publicField(this, "nzSortOrderChange", new EventEmitter());
      __publicField(this, "nzFilterChange", new EventEmitter());
    }
    getNextSortDirection(sortDirections, current) {
      const index = sortDirections.indexOf(current);
      if (index === sortDirections.length - 1) {
        return sortDirections[0];
      } else {
        return sortDirections[index + 1];
      }
    }
    setSortOrder(order) {
      this.sortOrderChange$.next(order);
    }
    clearSortOrder() {
      if (this.sortOrder !== null) {
        this.setSortOrder(null);
      }
    }
    onFilterValueChange(value) {
      this.nzFilterChange.emit(value);
      this.nzFilterValue = value;
      this.updateCalcOperator();
    }
    updateCalcOperator() {
      this.calcOperatorChange$.next();
    }
    ngOnInit() {
      fromEventOutsideAngular(this.el, "click").pipe(filter(() => this.nzShowSort), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        const nextOrder = this.getNextSortDirection(this.sortDirections, this.sortOrder);
        this.ngZone.run(() => {
          this.setSortOrder(nextOrder);
          this.manualClickOrder$.next(this);
        });
      });
      this.sortOrderChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((order) => {
        if (this.sortOrder !== order) {
          this.sortOrder = order;
          this.nzSortOrderChange.emit(order);
        }
        this.updateCalcOperator();
        this.cdr.markForCheck();
      });
    }
    ngOnChanges(changes) {
      const {
        nzSortDirections,
        nzFilters,
        nzSortOrder,
        nzSortFn,
        nzFilterFn,
        nzSortPriority,
        nzFilterMultiple,
        nzShowSort,
        nzShowFilter
      } = changes;
      if (nzSortDirections) {
        if (this.nzSortDirections && this.nzSortDirections.length) {
          this.sortDirections = this.nzSortDirections;
        }
      }
      if (nzSortOrder) {
        this.sortOrder = this.nzSortOrder;
        this.setSortOrder(this.nzSortOrder);
      }
      if (nzShowSort) {
        this.isNzShowSortChanged = true;
      }
      if (nzShowFilter) {
        this.isNzShowFilterChanged = true;
      }
      const isFirstChange = (value) => value && value.firstChange && value.currentValue !== void 0;
      if ((isFirstChange(nzSortOrder) || isFirstChange(nzSortFn)) && !this.isNzShowSortChanged) {
        this.nzShowSort = true;
      }
      if (isFirstChange(nzFilters) && !this.isNzShowFilterChanged) {
        this.nzShowFilter = true;
      }
      if ((nzFilters || nzFilterMultiple) && this.nzShowFilter) {
        const listOfValue = this.nzFilters.filter((item) => item.byDefault).map((item) => item.value);
        this.nzFilterValue = this.nzFilterMultiple ? listOfValue : listOfValue[0] || null;
      }
      if (nzSortFn || nzFilterFn || nzSortPriority || nzFilters) {
        this.updateCalcOperator();
      }
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzSortDirections_decorators = [WithConfig()];
    __esDecorate(null, null, _nzSortDirections_decorators, {
      kind: "field",
      name: "nzSortDirections",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSortDirections" in obj,
        get: (obj) => obj.nzSortDirections,
        set: (obj, value) => {
          obj.nzSortDirections = value;
        }
      },
      metadata: _metadata
    }, _nzSortDirections_initializers, _nzSortDirections_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzThAddOnComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["th", "nzColumnKey", ""], ["th", "nzSortFn", ""], ["th", "nzSortOrder", ""], ["th", "nzFilters", ""], ["th", "nzShowSort", ""], ["th", "nzShowFilter", ""], ["th", "nzCustomFilter", ""]],
    hostVars: 4,
    hostBindings: function NzThAddOnComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-table-column-has-sorters", ctx.nzShowSort)("ant-table-column-sort", ctx.sortOrder === "descend" || ctx.sortOrder === "ascend");
      }
    },
    inputs: {
      nzColumnKey: "nzColumnKey",
      nzFilterMultiple: "nzFilterMultiple",
      nzSortOrder: "nzSortOrder",
      nzSortPriority: "nzSortPriority",
      nzSortDirections: "nzSortDirections",
      nzFilters: "nzFilters",
      nzSortFn: "nzSortFn",
      nzFilterFn: "nzFilterFn",
      nzShowSort: [2, "nzShowSort", "nzShowSort", booleanAttribute],
      nzShowFilter: [2, "nzShowFilter", "nzShowFilter", booleanAttribute],
      nzCustomFilter: [2, "nzCustomFilter", "nzCustomFilter", booleanAttribute]
    },
    outputs: {
      nzCheckedChange: "nzCheckedChange",
      nzSortOrderChange: "nzSortOrderChange",
      nzFilterChange: "nzFilterChange"
    },
    features: [\u0275\u0275NgOnChangesFeature],
    attrs: _c26,
    ngContentSelectors: _c43,
    decls: 10,
    vars: 1,
    consts: [["notFilterTemplate", ""], ["extraTemplate", ""], ["sortTemplate", ""], ["contentTemplate", ""], [3, "contentTemplate", "extraTemplate", "customFilter", "filterMultiple", "listOfFilter"], [3, "ngTemplateOutlet"], [3, "filterChange", "contentTemplate", "extraTemplate", "customFilter", "filterMultiple", "listOfFilter"], [3, "sortOrder", "sortDirections", "contentTemplate"]],
    template: function NzThAddOnComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c33);
        \u0275\u0275conditionalCreate(0, NzThAddOnComponent_Conditional_0_Template, 1, 5, "nz-table-filter", 4)(1, NzThAddOnComponent_Conditional_1_Template, 1, 1, "ng-container", 5);
        \u0275\u0275template(2, NzThAddOnComponent_ng_template_2_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(4, NzThAddOnComponent_ng_template_4_Template, 2, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(6, NzThAddOnComponent_ng_template_6_Template, 1, 3, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(8, NzThAddOnComponent_ng_template_8_Template, 1, 0, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.nzShowFilter || ctx.nzCustomFilter ? 0 : 1);
      }
    },
    dependencies: [NzTableFilterComponent, NgTemplateOutlet, NzTableSortersComponent],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzThAddOnComponent, [{
    type: Component,
    args: [{
      selector: "th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (nzShowFilter || nzCustomFilter) {
      <nz-table-filter
        [contentTemplate]="notFilterTemplate"
        [extraTemplate]="extraTemplate"
        [customFilter]="nzCustomFilter"
        [filterMultiple]="nzFilterMultiple"
        [listOfFilter]="nzFilters"
        (filterChange)="onFilterValueChange($event)"
      />
    } @else {
      <ng-container [ngTemplateOutlet]="notFilterTemplate" />
    }
    <ng-template #notFilterTemplate>
      <ng-template [ngTemplateOutlet]="nzShowSort ? sortTemplate : contentTemplate" />
    </ng-template>
    <ng-template #extraTemplate>
      <ng-content select="[nz-th-extra]" />
      <ng-content select="nz-filter-trigger" />
    </ng-template>
    <ng-template #sortTemplate>
      <nz-table-sorters [sortOrder]="sortOrder" [sortDirections]="sortDirections" [contentTemplate]="contentTemplate" />
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
  `,
      host: {
        "[class.ant-table-column-has-sorters]": "nzShowSort",
        "[class.ant-table-column-sort]": `sortOrder === 'descend' || sortOrder === 'ascend'`
      },
      imports: [NzTableFilterComponent, NgTemplateOutlet, NzTableSortersComponent]
    }]
  }], null, {
    nzColumnKey: [{
      type: Input
    }],
    nzFilterMultiple: [{
      type: Input
    }],
    nzSortOrder: [{
      type: Input
    }],
    nzSortPriority: [{
      type: Input
    }],
    nzSortDirections: [{
      type: Input
    }],
    nzFilters: [{
      type: Input
    }],
    nzSortFn: [{
      type: Input
    }],
    nzFilterFn: [{
      type: Input
    }],
    nzShowSort: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowFilter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCustomFilter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCheckedChange: [{
      type: Output
    }],
    nzSortOrderChange: [{
      type: Output
    }],
    nzFilterChange: [{
      type: Output
    }]
  });
})();
var _NzThMeasureDirective = class _NzThMeasureDirective {
  constructor() {
    __publicField(this, "renderer", inject(Renderer2));
    __publicField(this, "el", inject(ElementRef).nativeElement);
    __publicField(this, "changes$", new Subject());
    __publicField(this, "nzWidth", null);
    __publicField(this, "colspan", null);
    __publicField(this, "colSpan", null);
    __publicField(this, "rowspan", null);
    __publicField(this, "rowSpan", null);
  }
  ngOnChanges(changes) {
    const {
      nzWidth,
      colspan,
      rowspan,
      colSpan,
      rowSpan
    } = changes;
    if (colspan || colSpan) {
      const col = this.colspan || this.colSpan;
      if (!isNil(col)) {
        this.renderer.setAttribute(this.el, "colspan", `${col}`);
      } else {
        this.renderer.removeAttribute(this.el, "colspan");
      }
    }
    if (rowspan || rowSpan) {
      const row = this.rowspan || this.rowSpan;
      if (!isNil(row)) {
        this.renderer.setAttribute(this.el, "rowspan", `${row}`);
      } else {
        this.renderer.removeAttribute(this.el, "rowspan");
      }
    }
    if (nzWidth || colspan) {
      this.changes$.next();
    }
  }
};
__publicField(_NzThMeasureDirective, "\u0275fac", function NzThMeasureDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzThMeasureDirective)();
});
__publicField(_NzThMeasureDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzThMeasureDirective,
  selectors: [["th"]],
  inputs: {
    nzWidth: "nzWidth",
    colspan: "colspan",
    colSpan: "colSpan",
    rowspan: "rowspan",
    rowSpan: "rowSpan"
  },
  features: [\u0275\u0275NgOnChangesFeature]
}));
var NzThMeasureDirective = _NzThMeasureDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzThMeasureDirective, [{
    type: Directive,
    args: [{
      selector: "th"
    }]
  }], null, {
    nzWidth: [{
      type: Input
    }],
    colspan: [{
      type: Input
    }],
    colSpan: [{
      type: Input
    }],
    rowspan: [{
      type: Input
    }],
    rowSpan: [{
      type: Input
    }]
  });
})();
var _NzThSelectionComponent = class _NzThSelectionComponent {
  constructor() {
    __publicField(this, "nzSelections", []);
    __publicField(this, "nzChecked", false);
    __publicField(this, "nzDisabled", false);
    __publicField(this, "nzIndeterminate", false);
    __publicField(this, "nzLabel", null);
    __publicField(this, "nzShowCheckbox", false);
    __publicField(this, "nzShowRowSelection", false);
    __publicField(this, "nzCheckedChange", new EventEmitter());
    __publicField(this, "isNzShowExpandChanged", false);
    __publicField(this, "isNzShowCheckboxChanged", false);
  }
  onCheckedChange(checked) {
    this.nzChecked = checked;
    this.nzCheckedChange.emit(checked);
  }
  ngOnChanges(changes) {
    const isFirstChange = (value) => value && value.firstChange && value.currentValue !== void 0;
    const {
      nzChecked,
      nzSelections,
      nzShowExpand,
      nzShowCheckbox
    } = changes;
    if (nzShowExpand) {
      this.isNzShowExpandChanged = true;
    }
    if (nzShowCheckbox) {
      this.isNzShowCheckboxChanged = true;
    }
    if (isFirstChange(nzSelections) && !this.isNzShowExpandChanged) {
      this.nzShowRowSelection = true;
    }
    if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
      this.nzShowCheckbox = true;
    }
  }
};
__publicField(_NzThSelectionComponent, "\u0275fac", function NzThSelectionComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzThSelectionComponent)();
});
__publicField(_NzThSelectionComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzThSelectionComponent,
  selectors: [["th", "nzSelections", ""], ["th", "nzChecked", ""], ["th", "nzShowCheckbox", ""], ["th", "nzShowRowSelection", ""]],
  hostAttrs: [1, "ant-table-selection-column"],
  inputs: {
    nzSelections: "nzSelections",
    nzChecked: [2, "nzChecked", "nzChecked", booleanAttribute],
    nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
    nzIndeterminate: "nzIndeterminate",
    nzLabel: "nzLabel",
    nzShowCheckbox: [2, "nzShowCheckbox", "nzShowCheckbox", booleanAttribute],
    nzShowRowSelection: [2, "nzShowRowSelection", "nzShowRowSelection", booleanAttribute]
  },
  outputs: {
    nzCheckedChange: "nzCheckedChange"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  attrs: _c52,
  ngContentSelectors: _c09,
  decls: 2,
  vars: 7,
  consts: [[3, "checkedChange", "checked", "disabled", "indeterminate", "label", "listOfSelections", "showCheckbox", "showRowSelection"]],
  template: function NzThSelectionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "nz-table-selection", 0);
      \u0275\u0275listener("checkedChange", function NzThSelectionComponent_Template_nz_table_selection_checkedChange_0_listener($event) {
        return ctx.onCheckedChange($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275projection(1);
    }
    if (rf & 2) {
      \u0275\u0275property("checked", ctx.nzChecked)("disabled", ctx.nzDisabled)("indeterminate", ctx.nzIndeterminate)("label", ctx.nzLabel)("listOfSelections", ctx.nzSelections)("showCheckbox", ctx.nzShowCheckbox)("showRowSelection", ctx.nzShowRowSelection);
    }
  },
  dependencies: [NzTableSelectionComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzThSelectionComponent = _NzThSelectionComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzThSelectionComponent, [{
    type: Component,
    args: [{
      selector: "th[nzSelections],th[nzChecked],th[nzShowCheckbox],th[nzShowRowSelection]",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <nz-table-selection
      [checked]="nzChecked"
      [disabled]="nzDisabled"
      [indeterminate]="nzIndeterminate"
      [label]="nzLabel"
      [listOfSelections]="nzSelections"
      [showCheckbox]="nzShowCheckbox"
      [showRowSelection]="nzShowRowSelection"
      (checkedChange)="onCheckedChange($event)"
    />
    <ng-content />
  `,
      host: {
        class: "ant-table-selection-column"
      },
      imports: [NzTableSelectionComponent]
    }]
  }], null, {
    nzSelections: [{
      type: Input
    }],
    nzChecked: [{
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
      type: Input
    }],
    nzLabel: [{
      type: Input
    }],
    nzShowCheckbox: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowRowSelection: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCheckedChange: [{
      type: Output
    }]
  });
})();
var _NzCellAlignDirective = class _NzCellAlignDirective {
  constructor() {
    __publicField(this, "nzAlign", null);
  }
};
__publicField(_NzCellAlignDirective, "\u0275fac", function NzCellAlignDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzCellAlignDirective)();
});
__publicField(_NzCellAlignDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzCellAlignDirective,
  selectors: [["th", "nzAlign", ""], ["td", "nzAlign", ""]],
  hostVars: 2,
  hostBindings: function NzCellAlignDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("text-align", ctx.nzAlign);
    }
  },
  inputs: {
    nzAlign: "nzAlign"
  }
}));
var NzCellAlignDirective = _NzCellAlignDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCellAlignDirective, [{
    type: Directive,
    args: [{
      selector: "th[nzAlign],td[nzAlign]",
      host: {
        "[style.text-align]": "nzAlign"
      }
    }]
  }], null, {
    nzAlign: [{
      type: Input
    }]
  });
})();
var _NzCellEllipsisDirective = class _NzCellEllipsisDirective {
  constructor() {
    __publicField(this, "nzEllipsis", true);
  }
};
__publicField(_NzCellEllipsisDirective, "\u0275fac", function NzCellEllipsisDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzCellEllipsisDirective)();
});
__publicField(_NzCellEllipsisDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzCellEllipsisDirective,
  selectors: [["th", "nzEllipsis", ""], ["td", "nzEllipsis", ""]],
  hostVars: 2,
  hostBindings: function NzCellEllipsisDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-table-cell-ellipsis", ctx.nzEllipsis);
    }
  },
  inputs: {
    nzEllipsis: [2, "nzEllipsis", "nzEllipsis", booleanAttribute]
  }
}));
var NzCellEllipsisDirective = _NzCellEllipsisDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCellEllipsisDirective, [{
    type: Directive,
    args: [{
      selector: "th[nzEllipsis],td[nzEllipsis]",
      host: {
        "[class.ant-table-cell-ellipsis]": "nzEllipsis"
      }
    }]
  }], null, {
    nzEllipsis: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzCellBreakWordDirective = class _NzCellBreakWordDirective {
  constructor() {
    __publicField(this, "nzBreakWord", true);
  }
};
__publicField(_NzCellBreakWordDirective, "\u0275fac", function NzCellBreakWordDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzCellBreakWordDirective)();
});
__publicField(_NzCellBreakWordDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzCellBreakWordDirective,
  selectors: [["th", "nzBreakWord", ""], ["td", "nzBreakWord", ""]],
  hostVars: 2,
  hostBindings: function NzCellBreakWordDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("word-break", ctx.nzBreakWord ? "break-all" : "");
    }
  },
  inputs: {
    nzBreakWord: [2, "nzBreakWord", "nzBreakWord", booleanAttribute]
  }
}));
var NzCellBreakWordDirective = _NzCellBreakWordDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCellBreakWordDirective, [{
    type: Directive,
    args: [{
      selector: "th[nzBreakWord],td[nzBreakWord]",
      host: {
        "[style.word-break]": `nzBreakWord ? 'break-all' : ''`
      }
    }]
  }], null, {
    nzBreakWord: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzTableContentComponent = class _NzTableContentComponent {
  constructor() {
    __publicField(this, "tableLayout", "auto");
    __publicField(this, "theadTemplate", null);
    __publicField(this, "contentTemplate", null);
    __publicField(this, "tfootTemplate", null);
    __publicField(this, "listOfColWidth", []);
    __publicField(this, "scrollX", null);
  }
};
__publicField(_NzTableContentComponent, "\u0275fac", function NzTableContentComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTableContentComponent)();
});
__publicField(_NzTableContentComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTableContentComponent,
  selectors: [["table", "nz-table-content", ""]],
  hostVars: 8,
  hostBindings: function NzTableContentComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("table-layout", ctx.tableLayout)("width", ctx.scrollX)("min-width", ctx.scrollX ? "100%" : null);
      \u0275\u0275classProp("ant-table-fixed", ctx.scrollX);
    }
  },
  inputs: {
    tableLayout: "tableLayout",
    theadTemplate: "theadTemplate",
    contentTemplate: "contentTemplate",
    tfootTemplate: "tfootTemplate",
    listOfColWidth: "listOfColWidth",
    scrollX: "scrollX"
  },
  attrs: _c62,
  ngContentSelectors: _c09,
  decls: 5,
  vars: 4,
  consts: [[1, "ant-table-thead"], [3, "ngTemplateOutlet"], [1, "ant-table-summary"], [3, "width", "minWidth"]],
  template: function NzTableContentComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275conditionalCreate(0, NzTableContentComponent_Conditional_0_Template, 3, 0, "colgroup");
      \u0275\u0275conditionalCreate(1, NzTableContentComponent_Conditional_1_Template, 2, 1, "thead", 0);
      \u0275\u0275template(2, NzTableContentComponent_ng_template_2_Template, 0, 0, "ng-template", 1);
      \u0275\u0275projection(3);
      \u0275\u0275conditionalCreate(4, NzTableContentComponent_Conditional_4_Template, 2, 1, "tfoot", 2);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.listOfColWidth.length > 0 ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.theadTemplate ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("ngTemplateOutlet", ctx.contentTemplate);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.tfootTemplate ? 4 : -1);
    }
  },
  dependencies: [NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTableContentComponent = _NzTableContentComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableContentComponent, [{
    type: Component,
    args: [{
      selector: "table[nz-table-content]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @if (listOfColWidth.length > 0) {
      <colgroup>
        @for (width of listOfColWidth; track $index) {
          <col [style.width]="width" [style.minWidth]="width" />
        }
      </colgroup>
    }
    @if (theadTemplate) {
      <thead class="ant-table-thead">
        <ng-template [ngTemplateOutlet]="theadTemplate" />
      </thead>
    }
    <ng-template [ngTemplateOutlet]="contentTemplate" />
    <ng-content />
    @if (tfootTemplate) {
      <tfoot class="ant-table-summary">
        <ng-template [ngTemplateOutlet]="tfootTemplate" />
      </tfoot>
    }
  `,
      host: {
        "[style.table-layout]": "tableLayout",
        "[class.ant-table-fixed]": "scrollX",
        "[style.width]": "scrollX",
        "[style.min-width]": `scrollX ? '100%' : null`
      },
      imports: [NgTemplateOutlet]
    }]
  }], null, {
    tableLayout: [{
      type: Input
    }],
    theadTemplate: [{
      type: Input
    }],
    contentTemplate: [{
      type: Input
    }],
    tfootTemplate: [{
      type: Input
    }],
    listOfColWidth: [{
      type: Input
    }],
    scrollX: [{
      type: Input
    }]
  });
})();
var _NzTableFixedRowComponent = class _NzTableFixedRowComponent {
  constructor() {
    __publicField(this, "nzTableStyleService", inject(NzTableStyleService));
    __publicField(this, "renderer", inject(Renderer2));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "tdElement");
    __publicField(this, "hostWidth$", new BehaviorSubject(null));
    __publicField(this, "enableAutoMeasure$", new BehaviorSubject(false));
  }
  ngOnInit() {
    if (this.nzTableStyleService) {
      const {
        enableAutoMeasure$,
        hostWidth$
      } = this.nzTableStyleService;
      enableAutoMeasure$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(this.enableAutoMeasure$);
      hostWidth$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(this.hostWidth$);
    }
  }
  ngAfterViewInit() {
    this.nzTableStyleService.columnCount$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((count) => {
      this.renderer.setAttribute(this.tdElement.nativeElement, "colspan", `${count}`);
    });
  }
};
__publicField(_NzTableFixedRowComponent, "\u0275fac", function NzTableFixedRowComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTableFixedRowComponent)();
});
__publicField(_NzTableFixedRowComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTableFixedRowComponent,
  selectors: [["tr", "nz-table-fixed-row", ""], ["tr", "nzExpand", ""]],
  viewQuery: function NzTableFixedRowComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c72, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tdElement = _t.first);
    }
  },
  attrs: _c82,
  ngContentSelectors: _c09,
  decls: 7,
  vars: 3,
  consts: [["tdElement", ""], ["contentTemplate", ""], [1, "nz-disable-td", "ant-table-cell"], [1, "ant-table-expanded-row-fixed", 2, "position", "sticky", "left", "0", "overflow", "hidden", 3, "width"], [3, "ngTemplateOutlet"], [1, "ant-table-expanded-row-fixed", 2, "position", "sticky", "left", "0", "overflow", "hidden"]],
  template: function NzTableFixedRowComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "td", 2, 0);
      \u0275\u0275conditionalCreate(2, NzTableFixedRowComponent_Conditional_2_Template, 3, 5, "div", 3);
      \u0275\u0275pipe(3, "async");
      \u0275\u0275conditionalBranchCreate(4, NzTableFixedRowComponent_Conditional_4_Template, 1, 1, null, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275template(5, NzTableFixedRowComponent_ng_template_5_Template, 1, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(\u0275\u0275pipeBind1(3, 1, ctx.enableAutoMeasure$) ? 2 : 4);
    }
  },
  dependencies: [NgTemplateOutlet, AsyncPipe],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTableFixedRowComponent = _NzTableFixedRowComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableFixedRowComponent, [{
    type: Component,
    args: [{
      selector: "tr[nz-table-fixed-row], tr[nzExpand]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <td class="nz-disable-td ant-table-cell" #tdElement>
      @if (enableAutoMeasure$ | async) {
        <div
          class="ant-table-expanded-row-fixed"
          style="position: sticky; left: 0; overflow: hidden;"
          [style.width.px]="hostWidth$ | async"
        >
          <ng-template [ngTemplateOutlet]="contentTemplate" />
        </div>
      } @else {
        <ng-template [ngTemplateOutlet]="contentTemplate" />
      }
    </td>
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
  `,
      imports: [AsyncPipe, NgTemplateOutlet]
    }]
  }], null, {
    tdElement: [{
      type: ViewChild,
      args: ["tdElement", {
        static: true
      }]
    }]
  });
})();
var _NzTableInnerDefaultComponent = class _NzTableInnerDefaultComponent {
  constructor() {
    __publicField(this, "tableLayout", "auto");
    __publicField(this, "listOfColWidth", []);
    __publicField(this, "theadTemplate", null);
    __publicField(this, "contentTemplate", null);
    __publicField(this, "tfootTemplate", null);
  }
};
__publicField(_NzTableInnerDefaultComponent, "\u0275fac", function NzTableInnerDefaultComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTableInnerDefaultComponent)();
});
__publicField(_NzTableInnerDefaultComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTableInnerDefaultComponent,
  selectors: [["nz-table-inner-default"]],
  hostAttrs: [1, "ant-table-container"],
  inputs: {
    tableLayout: "tableLayout",
    listOfColWidth: "listOfColWidth",
    theadTemplate: "theadTemplate",
    contentTemplate: "contentTemplate",
    tfootTemplate: "tfootTemplate"
  },
  decls: 2,
  vars: 5,
  consts: [[1, "ant-table-content"], ["nz-table-content", "", 3, "contentTemplate", "tableLayout", "listOfColWidth", "theadTemplate", "tfootTemplate"]],
  template: function NzTableInnerDefaultComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "table", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("contentTemplate", ctx.contentTemplate)("tableLayout", ctx.tableLayout)("listOfColWidth", ctx.listOfColWidth)("theadTemplate", ctx.theadTemplate)("tfootTemplate", ctx.tfootTemplate);
    }
  },
  dependencies: [NzTableContentComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTableInnerDefaultComponent = _NzTableInnerDefaultComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableInnerDefaultComponent, [{
    type: Component,
    args: [{
      selector: "nz-table-inner-default",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <div class="ant-table-content">
      <table
        nz-table-content
        [contentTemplate]="contentTemplate"
        [tableLayout]="tableLayout"
        [listOfColWidth]="listOfColWidth"
        [theadTemplate]="theadTemplate"
        [tfootTemplate]="tfootTemplate"
      ></table>
    </div>
  `,
      host: {
        class: "ant-table-container"
      },
      imports: [NzTableContentComponent]
    }]
  }], null, {
    tableLayout: [{
      type: Input
    }],
    listOfColWidth: [{
      type: Input
    }],
    theadTemplate: [{
      type: Input
    }],
    contentTemplate: [{
      type: Input
    }],
    tfootTemplate: [{
      type: Input
    }]
  });
})();
var _NzTrMeasureComponent = class _NzTrMeasureComponent {
  constructor() {
    __publicField(this, "nzResizeObserver", inject(NzResizeObserver));
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "listOfMeasureColumn", []);
    __publicField(this, "listOfAutoWidth", new EventEmitter());
    __publicField(this, "listOfTdElement");
  }
  ngAfterViewInit() {
    this.listOfTdElement.changes.pipe(startWith(this.listOfTdElement)).pipe(switchMap((list) => combineLatest(list.toArray().map((item) => this.nzResizeObserver.observe(item).pipe(map(([entry]) => {
      const {
        width
      } = entry.target.getBoundingClientRect();
      return Math.floor(width);
    }))))), debounceTime(16), takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      if (this.ngZone instanceof NgZone && NgZone.isInAngularZone()) {
        this.listOfAutoWidth.next(data);
      } else {
        this.ngZone.run(() => this.listOfAutoWidth.next(data));
      }
    });
  }
};
__publicField(_NzTrMeasureComponent, "\u0275fac", function NzTrMeasureComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTrMeasureComponent)();
});
__publicField(_NzTrMeasureComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTrMeasureComponent,
  selectors: [["tr", "nz-table-measure-row", ""]],
  viewQuery: function NzTrMeasureComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c72, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfTdElement = _t);
    }
  },
  hostAttrs: [1, "ant-table-measure-now"],
  inputs: {
    listOfMeasureColumn: "listOfMeasureColumn"
  },
  outputs: {
    listOfAutoWidth: "listOfAutoWidth"
  },
  attrs: _c92,
  decls: 2,
  vars: 0,
  consts: [["tdElement", ""], [1, "nz-disable-td", 2, "padding", "0", "border", "0", "height", "0"]],
  template: function NzTrMeasureComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275repeaterCreate(0, NzTrMeasureComponent_For_1_Template, 2, 0, "td", 1, \u0275\u0275repeaterTrackByIndex);
    }
    if (rf & 2) {
      \u0275\u0275repeater(ctx.listOfMeasureColumn);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzTrMeasureComponent = _NzTrMeasureComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTrMeasureComponent, [{
    type: Component,
    args: [{
      selector: "tr[nz-table-measure-row]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @for (th of listOfMeasureColumn; track $index) {
      <td #tdElement class="nz-disable-td" style="padding: 0; border: 0; height: 0;"></td>
    }
  `,
      host: {
        class: "ant-table-measure-now"
      }
    }]
  }], null, {
    listOfMeasureColumn: [{
      type: Input
    }],
    listOfAutoWidth: [{
      type: Output
    }],
    listOfTdElement: [{
      type: ViewChildren,
      args: ["tdElement"]
    }]
  });
})();
var _NzTbodyComponent = class _NzTbodyComponent {
  constructor() {
    __publicField(this, "showEmpty$", new BehaviorSubject(false));
    __publicField(this, "noResult$", new BehaviorSubject(void 0));
    __publicField(this, "listOfMeasureColumn$", new BehaviorSubject([]));
    __publicField(this, "nzTableStyleService", inject(NzTableStyleService, {
      optional: true
    }));
    __publicField(this, "isInsideTable", !!this.nzTableStyleService);
    if (this.nzTableStyleService) {
      const {
        showEmpty$,
        noResult$,
        listOfMeasureColumn$
      } = this.nzTableStyleService;
      noResult$.pipe(takeUntilDestroyed()).subscribe(this.noResult$);
      listOfMeasureColumn$.pipe(takeUntilDestroyed()).subscribe(this.listOfMeasureColumn$);
      showEmpty$.pipe(takeUntilDestroyed()).subscribe(this.showEmpty$);
    }
  }
  onListOfAutoWidthChange(listOfAutoWidth) {
    var _a;
    (_a = this.nzTableStyleService) == null ? void 0 : _a.setListOfAutoWidth(listOfAutoWidth);
  }
};
__publicField(_NzTbodyComponent, "\u0275fac", function NzTbodyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTbodyComponent)();
});
__publicField(_NzTbodyComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTbodyComponent,
  selectors: [["tbody"]],
  hostVars: 2,
  hostBindings: function NzTbodyComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-table-tbody", ctx.isInsideTable);
    }
  },
  ngContentSelectors: _c09,
  decls: 5,
  vars: 6,
  consts: [["nz-table-fixed-row", "", 1, "ant-table-placeholder"], ["nz-table-measure-row", "", 3, "listOfMeasureColumn"], ["nz-table-measure-row", "", 3, "listOfAutoWidth", "listOfMeasureColumn"], ["nzComponentName", "table", 3, "specificContent"]],
  template: function NzTbodyComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275conditionalCreate(0, NzTbodyComponent_Conditional_0_Template, 1, 1);
      \u0275\u0275pipe(1, "async");
      \u0275\u0275projection(2);
      \u0275\u0275conditionalCreate(3, NzTbodyComponent_Conditional_3_Template, 3, 3, "tr", 0);
      \u0275\u0275pipe(4, "async");
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional((tmp_0_0 = \u0275\u0275pipeBind1(1, 2, ctx.listOfMeasureColumn$)) ? 0 : -1, tmp_0_0);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(\u0275\u0275pipeBind1(4, 4, ctx.showEmpty$) ? 3 : -1);
    }
  },
  dependencies: [NzTrMeasureComponent, NzTableFixedRowComponent, NzEmptyModule, NzEmbedEmptyComponent, AsyncPipe],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTbodyComponent = _NzTbodyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTbodyComponent, [{
    type: Component,
    args: [{
      selector: "tbody",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @if (listOfMeasureColumn$ | async; as listOfMeasureColumn) {
      @if (isInsideTable && listOfMeasureColumn.length) {
        <tr
          nz-table-measure-row
          [listOfMeasureColumn]="listOfMeasureColumn"
          (listOfAutoWidth)="onListOfAutoWidthChange($event)"
        ></tr>
      }
    }
    <ng-content />
    @if (showEmpty$ | async) {
      <tr class="ant-table-placeholder" nz-table-fixed-row>
        <nz-embed-empty nzComponentName="table" [specificContent]="(noResult$ | async)!" />
      </tr>
    }
  `,
      host: {
        "[class.ant-table-tbody]": "isInsideTable"
      },
      imports: [AsyncPipe, NzTrMeasureComponent, NzTableFixedRowComponent, NzEmptyModule]
    }]
  }], () => [], null);
})();
var _NzTableInnerScrollComponent = class _NzTableInnerScrollComponent {
  constructor() {
    __publicField(this, "renderer", inject(Renderer2));
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "platform", inject(Platform));
    __publicField(this, "resizeService", inject(NzResizeService));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "data", []);
    __publicField(this, "scrollX", null);
    __publicField(this, "scrollY", null);
    __publicField(this, "contentTemplate", null);
    __publicField(this, "widthConfig", []);
    __publicField(this, "listOfColWidth", []);
    __publicField(this, "theadTemplate", null);
    __publicField(this, "tfootTemplate", null);
    __publicField(this, "tfootFixed", null);
    __publicField(this, "virtualTemplate", null);
    __publicField(this, "virtualItemSize", 0);
    __publicField(this, "virtualMaxBufferPx", 200);
    __publicField(this, "virtualMinBufferPx", 100);
    __publicField(this, "tableMainElement");
    __publicField(this, "virtualForTrackBy", (index) => index);
    __publicField(this, "tableHeaderElement");
    __publicField(this, "tableBodyElement");
    __publicField(this, "tableFootElement");
    __publicField(this, "cdkVirtualScrollViewport");
    __publicField(this, "headerStyleMap", {});
    __publicField(this, "bodyStyleMap", {});
    __publicField(this, "verticalScrollBarWidth", 0);
    __publicField(this, "noDataVirtualHeight", "182px");
    __publicField(this, "data$", new Subject());
    __publicField(this, "scroll$", new Subject());
    this.destroyRef.onDestroy(() => {
      this.setScrollPositionClassName(true);
    });
  }
  setScrollPositionClassName(clear = false) {
    const {
      scrollWidth,
      scrollLeft,
      clientWidth
    } = this.tableBodyElement.nativeElement;
    const leftClassName = "ant-table-ping-left";
    const rightClassName = "ant-table-ping-right";
    if (scrollWidth === clientWidth && scrollWidth !== 0 || clear) {
      this.renderer.removeClass(this.tableMainElement, leftClassName);
      this.renderer.removeClass(this.tableMainElement, rightClassName);
    } else if (scrollLeft === 0) {
      this.renderer.removeClass(this.tableMainElement, leftClassName);
      this.renderer.addClass(this.tableMainElement, rightClassName);
    } else if (scrollWidth === scrollLeft + clientWidth) {
      this.renderer.removeClass(this.tableMainElement, rightClassName);
      this.renderer.addClass(this.tableMainElement, leftClassName);
    } else {
      this.renderer.addClass(this.tableMainElement, leftClassName);
      this.renderer.addClass(this.tableMainElement, rightClassName);
    }
  }
  ngOnChanges(changes) {
    const {
      scrollX,
      scrollY,
      data
    } = changes;
    if (scrollX || scrollY) {
      const hasVerticalScrollBar = this.verticalScrollBarWidth !== 0;
      this.headerStyleMap = {
        overflowX: "hidden",
        overflowY: this.scrollY && hasVerticalScrollBar ? "scroll" : "hidden"
      };
      this.bodyStyleMap = {
        overflowY: this.scrollY ? "scroll" : "hidden",
        overflowX: this.scrollX ? "auto" : null,
        maxHeight: this.scrollY
      };
      this.ngZone.runOutsideAngular(() => this.scroll$.next());
    }
    if (data) {
      this.ngZone.runOutsideAngular(() => this.data$.next());
    }
  }
  ngAfterViewInit() {
    if (this.platform.isBrowser) {
      const scrollEvent$ = this.scroll$.pipe(startWith(null), delay(0), switchMap(() => fromEventOutsideAngular(this.tableBodyElement.nativeElement, "scroll").pipe(startWith(true))));
      const resize$ = this.resizeService.connect();
      merge(scrollEvent$, resize$, this.data$, this.scroll$).pipe(startWith(true), delay(0), takeUntilDestroyed(this.destroyRef)).subscribe(() => this.setScrollPositionClassName());
      scrollEvent$.pipe(filter(() => !!this.scrollY)).subscribe(() => {
        this.tableHeaderElement.nativeElement.scrollLeft = this.tableBodyElement.nativeElement.scrollLeft;
        if (this.tableFootElement) {
          this.tableFootElement.nativeElement.scrollLeft = this.tableBodyElement.nativeElement.scrollLeft;
        }
      });
    }
  }
};
__publicField(_NzTableInnerScrollComponent, "\u0275fac", function NzTableInnerScrollComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTableInnerScrollComponent)();
});
__publicField(_NzTableInnerScrollComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTableInnerScrollComponent,
  selectors: [["nz-table-inner-scroll"]],
  viewQuery: function NzTableInnerScrollComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c102, 5, ElementRef)(_c112, 5, ElementRef)(_c122, 5, ElementRef)(CdkVirtualScrollViewport, 5, CdkVirtualScrollViewport);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableHeaderElement = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableBodyElement = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tableFootElement = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.cdkVirtualScrollViewport = _t.first);
    }
  },
  hostAttrs: [1, "ant-table-container"],
  inputs: {
    data: "data",
    scrollX: "scrollX",
    scrollY: "scrollY",
    contentTemplate: "contentTemplate",
    widthConfig: "widthConfig",
    listOfColWidth: "listOfColWidth",
    theadTemplate: "theadTemplate",
    tfootTemplate: "tfootTemplate",
    tfootFixed: "tfootFixed",
    virtualTemplate: "virtualTemplate",
    virtualItemSize: "virtualItemSize",
    virtualMaxBufferPx: "virtualMaxBufferPx",
    virtualMinBufferPx: "virtualMinBufferPx",
    tableMainElement: "tableMainElement",
    virtualForTrackBy: "virtualForTrackBy",
    verticalScrollBarWidth: "verticalScrollBarWidth",
    noDataVirtualHeight: "noDataVirtualHeight"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 2,
  vars: 1,
  consts: [["tableHeaderElement", ""], ["tableBodyElement", ""], ["tableFootElement", ""], [1, "ant-table-content", 3, "style"], [1, "ant-table-header", "nz-table-hide-scrollbar"], ["nz-table-content", "", "tableLayout", "fixed", 3, "scrollX", "listOfColWidth", "theadTemplate", "tfootTemplate"], ["cdkScrollable", "", 1, "ant-table-body", 3, "style"], [3, "itemSize", "maxBufferPx", "minBufferPx", "height"], [1, "ant-table-summary", 3, "style"], ["cdkScrollable", "", 1, "ant-table-body"], ["nz-table-content", "", "tableLayout", "fixed", 3, "scrollX", "listOfColWidth", "contentTemplate"], [3, "itemSize", "maxBufferPx", "minBufferPx"], ["nz-table-content", "", "tableLayout", "fixed", 3, "scrollX", "listOfColWidth"], [4, "cdkVirtualFor", "cdkVirtualForOf", "cdkVirtualForTrackBy"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "ant-table-summary"], ["nz-table-content", "", "tableLayout", "fixed", 3, "scrollX", "listOfColWidth", "tfootTemplate"], [1, "ant-table-content"], ["nz-table-content", "", "tableLayout", "fixed", 3, "scrollX", "listOfColWidth", "theadTemplate", "contentTemplate", "tfootTemplate"]],
  template: function NzTableInnerScrollComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzTableInnerScrollComponent_Conditional_0_Template, 6, 8)(1, NzTableInnerScrollComponent_Conditional_1_Template, 3, 7, "div", 3);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.scrollY ? 0 : 1);
    }
  },
  dependencies: [NzTableContentComponent, ScrollingModule, CdkScrollable, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, NgTemplateOutlet, NzTbodyComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTableInnerScrollComponent = _NzTableInnerScrollComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableInnerScrollComponent, [{
    type: Component,
    args: [{
      selector: "nz-table-inner-scroll",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @if (scrollY) {
      <div #tableHeaderElement [style]="headerStyleMap" class="ant-table-header nz-table-hide-scrollbar">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
          [tfootTemplate]="tfootFixed === 'top' ? tfootTemplate : null"
        ></table>
      </div>
      @if (!virtualTemplate) {
        <div #tableBodyElement cdkScrollable class="ant-table-body" [style]="bodyStyleMap">
          <table
            nz-table-content
            tableLayout="fixed"
            [scrollX]="scrollX"
            [listOfColWidth]="listOfColWidth"
            [contentTemplate]="contentTemplate"
          ></table>
        </div>
      } @else {
        <cdk-virtual-scroll-viewport
          #tableBodyElement
          [itemSize]="virtualItemSize"
          [maxBufferPx]="virtualMaxBufferPx"
          [minBufferPx]="virtualMinBufferPx"
          [style.height]="data.length ? scrollY : noDataVirtualHeight"
        >
          <table nz-table-content tableLayout="fixed" [scrollX]="scrollX" [listOfColWidth]="listOfColWidth">
            <tbody>
              <ng-container *cdkVirtualFor="let item of data; let i = index; trackBy: virtualForTrackBy">
                <ng-template
                  [ngTemplateOutlet]="virtualTemplate"
                  [ngTemplateOutletContext]="{ $implicit: item, index: i }"
                />
              </ng-container>
            </tbody>
          </table>
        </cdk-virtual-scroll-viewport>
      }
      @if (tfootFixed === 'bottom') {
        <div #tableFootElement class="ant-table-summary" [style]="headerStyleMap">
          <table
            nz-table-content
            tableLayout="fixed"
            [scrollX]="scrollX"
            [listOfColWidth]="listOfColWidth"
            [tfootTemplate]="tfootTemplate"
          ></table>
        </div>
      }
    } @else {
      <div class="ant-table-content" #tableBodyElement [style]="bodyStyleMap">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
          [contentTemplate]="contentTemplate"
          [tfootTemplate]="tfootTemplate"
        ></table>
      </div>
    }
  `,
      host: {
        class: "ant-table-container"
      },
      imports: [NzTableContentComponent, ScrollingModule, NgTemplateOutlet, NzTbodyComponent]
    }]
  }], () => [], {
    data: [{
      type: Input
    }],
    scrollX: [{
      type: Input
    }],
    scrollY: [{
      type: Input
    }],
    contentTemplate: [{
      type: Input
    }],
    widthConfig: [{
      type: Input
    }],
    listOfColWidth: [{
      type: Input
    }],
    theadTemplate: [{
      type: Input
    }],
    tfootTemplate: [{
      type: Input
    }],
    tfootFixed: [{
      type: Input
    }],
    virtualTemplate: [{
      type: Input
    }],
    virtualItemSize: [{
      type: Input
    }],
    virtualMaxBufferPx: [{
      type: Input
    }],
    virtualMinBufferPx: [{
      type: Input
    }],
    tableMainElement: [{
      type: Input
    }],
    virtualForTrackBy: [{
      type: Input
    }],
    tableHeaderElement: [{
      type: ViewChild,
      args: ["tableHeaderElement", {
        read: ElementRef
      }]
    }],
    tableBodyElement: [{
      type: ViewChild,
      args: ["tableBodyElement", {
        read: ElementRef
      }]
    }],
    tableFootElement: [{
      type: ViewChild,
      args: ["tableFootElement", {
        read: ElementRef
      }]
    }],
    cdkVirtualScrollViewport: [{
      type: ViewChild,
      args: [CdkVirtualScrollViewport, {
        read: CdkVirtualScrollViewport
      }]
    }],
    verticalScrollBarWidth: [{
      type: Input
    }],
    noDataVirtualHeight: [{
      type: Input
    }]
  });
})();
var _NzTableVirtualScrollDirective = class _NzTableVirtualScrollDirective {
  constructor() {
    __publicField(this, "templateRef", inject(TemplateRef));
  }
  static ngTemplateContextGuard(_dir, _ctx) {
    return true;
  }
};
__publicField(_NzTableVirtualScrollDirective, "\u0275fac", function NzTableVirtualScrollDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTableVirtualScrollDirective)();
});
__publicField(_NzTableVirtualScrollDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTableVirtualScrollDirective,
  selectors: [["", "nz-virtual-scroll", ""]],
  exportAs: ["nzVirtualScroll"]
}));
var NzTableVirtualScrollDirective = _NzTableVirtualScrollDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableVirtualScrollDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-virtual-scroll]",
      exportAs: "nzVirtualScroll"
    }]
  }], null, null);
})();
var _NzTableTitleFooterComponent = class _NzTableTitleFooterComponent {
  constructor() {
    __publicField(this, "title", null);
    __publicField(this, "footer", null);
  }
};
__publicField(_NzTableTitleFooterComponent, "\u0275fac", function NzTableTitleFooterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTableTitleFooterComponent)();
});
__publicField(_NzTableTitleFooterComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTableTitleFooterComponent,
  selectors: [["nz-table-title-footer"]],
  hostVars: 4,
  hostBindings: function NzTableTitleFooterComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-table-title", ctx.title !== null)("ant-table-footer", ctx.footer !== null);
    }
  },
  inputs: {
    title: "title",
    footer: "footer"
  },
  decls: 2,
  vars: 2,
  consts: [[4, "nzStringTemplateOutlet"]],
  template: function NzTableTitleFooterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzTableTitleFooterComponent_ng_container_0_Template, 2, 1, "ng-container", 0)(1, NzTableTitleFooterComponent_ng_container_1_Template, 2, 1, "ng-container", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("nzStringTemplateOutlet", ctx.title);
      \u0275\u0275advance();
      \u0275\u0275property("nzStringTemplateOutlet", ctx.footer);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTableTitleFooterComponent = _NzTableTitleFooterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableTitleFooterComponent, [{
    type: Component,
    args: [{
      selector: "nz-table-title-footer",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
    <ng-container *nzStringTemplateOutlet="footer">{{ footer }}</ng-container>
  `,
      host: {
        "[class.ant-table-title]": `title !== null`,
        "[class.ant-table-footer]": `footer !== null`
      },
      imports: [NzOutletModule]
    }]
  }], null, {
    title: [{
      type: Input
    }],
    footer: [{
      type: Input
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME5 = "table";
var NzTableComponent = (() => {
  var _a;
  let _nzLoadingIndicator_decorators;
  let _nzLoadingIndicator_initializers = [];
  let _nzLoadingIndicator_extraInitializers = [];
  let _nzBordered_decorators;
  let _nzBordered_initializers = [];
  let _nzBordered_extraInitializers = [];
  let _nzSize_decorators;
  let _nzSize_initializers = [];
  let _nzSize_extraInitializers = [];
  let _nzShowSizeChanger_decorators;
  let _nzShowSizeChanger_initializers = [];
  let _nzShowSizeChanger_extraInitializers = [];
  let _nzHideOnSinglePage_decorators;
  let _nzHideOnSinglePage_initializers = [];
  let _nzHideOnSinglePage_extraInitializers = [];
  let _nzShowQuickJumper_decorators;
  let _nzShowQuickJumper_initializers = [];
  let _nzShowQuickJumper_extraInitializers = [];
  let _nzSimple_decorators;
  let _nzSimple_initializers = [];
  let _nzSimple_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME5);
      __publicField(this, "elementRef", inject(ElementRef));
      __publicField(this, "nzResizeObserver", inject(NzResizeObserver));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "nzTableStyleService", inject(NzTableStyleService));
      __publicField(this, "nzTableDataService", inject(NzTableDataService));
      __publicField(this, "directionality", inject(Directionality));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "nzTableLayout", "auto");
      __publicField(this, "nzShowTotal", null);
      __publicField(this, "nzItemRender", null);
      __publicField(this, "nzTitle", null);
      __publicField(this, "nzFooter", null);
      __publicField(this, "nzNoResult");
      __publicField(this, "nzPageSizeOptions", [10, 20, 30, 40, 50]);
      __publicField(this, "nzVirtualItemSize", 0);
      __publicField(this, "nzVirtualMaxBufferPx", 200);
      __publicField(this, "nzVirtualMinBufferPx", 100);
      __publicField(this, "nzVirtualForTrackBy", (index) => index);
      __publicField(this, "nzLoadingDelay", 0);
      __publicField(this, "nzPageIndex", 1);
      __publicField(this, "nzPageSize", 10);
      __publicField(this, "nzTotal", 0);
      __publicField(this, "nzWidthConfig", []);
      __publicField(this, "nzData", []);
      __publicField(this, "nzCustomColumn", []);
      __publicField(this, "nzPaginationPosition", "bottom");
      __publicField(this, "nzScroll", {
        x: null,
        y: null
      });
      __publicField(this, "noDataVirtualHeight", "182px");
      __publicField(this, "nzPaginationType", "default");
      __publicField(this, "nzFrontPagination", true);
      __publicField(this, "nzTemplateMode", false);
      __publicField(this, "nzShowPagination", true);
      __publicField(this, "nzLoading", false);
      __publicField(this, "nzOuterBordered", false);
      __publicField(this, "nzLoadingIndicator", __runInitializers(this, _nzLoadingIndicator_initializers, null));
      __publicField(this, "nzBordered", (__runInitializers(this, _nzLoadingIndicator_extraInitializers), __runInitializers(this, _nzBordered_initializers, false)));
      __publicField(this, "nzSize", (__runInitializers(this, _nzBordered_extraInitializers), __runInitializers(this, _nzSize_initializers, "default")));
      __publicField(this, "nzShowSizeChanger", (__runInitializers(this, _nzSize_extraInitializers), __runInitializers(this, _nzShowSizeChanger_initializers, false)));
      __publicField(this, "nzHideOnSinglePage", (__runInitializers(this, _nzShowSizeChanger_extraInitializers), __runInitializers(this, _nzHideOnSinglePage_initializers, false)));
      __publicField(this, "nzShowQuickJumper", (__runInitializers(this, _nzHideOnSinglePage_extraInitializers), __runInitializers(this, _nzShowQuickJumper_initializers, false)));
      __publicField(this, "nzSimple", (__runInitializers(this, _nzShowQuickJumper_extraInitializers), __runInitializers(this, _nzSimple_initializers, false)));
      __publicField(this, "nzPageSizeChange", (__runInitializers(this, _nzSimple_extraInitializers), new EventEmitter()));
      __publicField(this, "nzPageIndexChange", new EventEmitter());
      __publicField(this, "nzQueryParams", new EventEmitter());
      __publicField(this, "nzCurrentPageDataChange", new EventEmitter());
      __publicField(this, "nzCustomColumnChange", new EventEmitter());
      /** public data for ngFor tr */
      __publicField(this, "data", []);
      __publicField(this, "cdkVirtualScrollViewport");
      __publicField(this, "scrollX", null);
      __publicField(this, "scrollY", null);
      __publicField(this, "theadTemplate", null);
      __publicField(this, "tfootTemplate", null);
      __publicField(this, "tfootFixed", null);
      __publicField(this, "listOfAutoColWidth", []);
      __publicField(this, "listOfManualColWidth", []);
      __publicField(this, "hasFixLeft", false);
      __publicField(this, "hasFixRight", false);
      __publicField(this, "showPagination", true);
      __publicField(this, "templateMode$", new BehaviorSubject(false));
      __publicField(this, "dir", "ltr");
      __publicField(this, "nzVirtualScrollDirective");
      __publicField(this, "nzTableInnerScrollComponent");
      __publicField(this, "verticalScrollBarWidth", 0);
      onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME5, () => this.cdr.markForCheck());
    }
    onPageSizeChange(size) {
      this.nzTableDataService.updatePageSize(size);
    }
    onPageIndexChange(index) {
      this.nzTableDataService.updatePageIndex(index);
    }
    ngOnInit() {
      var _a2;
      const {
        pageIndexDistinct$,
        pageSizeDistinct$,
        listOfCurrentPageData$,
        total$,
        queryParams$,
        listOfCustomColumn$
      } = this.nzTableDataService;
      const {
        theadTemplate$,
        tfootTemplate$,
        tfootFixed$,
        hasFixLeft$,
        hasFixRight$
      } = this.nzTableStyleService;
      this.dir = this.directionality.value;
      (_a2 = this.directionality.change) == null ? void 0 : _a2.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
      queryParams$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(this.nzQueryParams);
      pageIndexDistinct$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((pageIndex) => {
        if (pageIndex !== this.nzPageIndex) {
          this.nzPageIndex = pageIndex;
          this.nzPageIndexChange.next(pageIndex);
        }
      });
      pageSizeDistinct$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((pageSize) => {
        if (pageSize !== this.nzPageSize) {
          this.nzPageSize = pageSize;
          this.nzPageSizeChange.next(pageSize);
        }
      });
      total$.pipe(takeUntilDestroyed(this.destroyRef), filter((total) => this.nzFrontPagination && total !== this.nzTotal)).subscribe((total) => {
        this.nzTotal = total;
        this.cdr.markForCheck();
      });
      listOfCurrentPageData$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
        this.data = data;
        this.nzCurrentPageDataChange.next(data);
        this.cdr.markForCheck();
      });
      listOfCustomColumn$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
        this.nzCustomColumn = data;
        this.nzCustomColumnChange.next(data);
        this.cdr.markForCheck();
      });
      theadTemplate$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((theadTemplate) => {
        this.theadTemplate = theadTemplate;
        this.cdr.markForCheck();
      });
      combineLatest([tfootTemplate$, tfootFixed$]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(([tfootTemplate, tfootFixed]) => {
        this.tfootTemplate = tfootTemplate;
        this.tfootFixed = tfootFixed;
        this.cdr.markForCheck();
      });
      hasFixLeft$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((hasFixLeft) => {
        this.hasFixLeft = hasFixLeft;
        this.cdr.markForCheck();
      });
      hasFixRight$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((hasFixRight) => {
        this.hasFixRight = hasFixRight;
        this.cdr.markForCheck();
      });
      combineLatest([total$, this.templateMode$]).pipe(map(([total, templateMode]) => total === 0 && !templateMode), takeUntilDestroyed(this.destroyRef)).subscribe((empty) => {
        this.nzTableStyleService.setShowEmpty(empty);
      });
      this.verticalScrollBarWidth = measureScrollbar("vertical");
      this.nzTableStyleService.listOfListOfThWidthPx$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((listOfWidth) => {
        this.listOfAutoColWidth = listOfWidth;
        this.cdr.markForCheck();
      });
      this.nzTableStyleService.manualWidthConfigPx$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((listOfWidth) => {
        this.listOfManualColWidth = listOfWidth;
        this.cdr.markForCheck();
      });
    }
    ngOnChanges(changes) {
      const {
        nzScroll,
        nzPageIndex,
        nzPageSize,
        nzFrontPagination,
        nzData,
        nzCustomColumn,
        nzWidthConfig,
        nzNoResult,
        nzTemplateMode
      } = changes;
      if (nzPageIndex) {
        this.nzTableDataService.updatePageIndex(this.nzPageIndex);
      }
      if (nzPageSize) {
        this.nzTableDataService.updatePageSize(this.nzPageSize);
      }
      if (nzData) {
        this.nzData = this.nzData || [];
        this.nzTableDataService.updateListOfData(this.nzData);
      }
      if (nzCustomColumn) {
        this.nzCustomColumn = this.nzCustomColumn || [];
        this.nzTableDataService.updateListOfCustomColumn(this.nzCustomColumn);
      }
      if (nzFrontPagination) {
        this.nzTableDataService.updateFrontPagination(this.nzFrontPagination);
      }
      if (nzScroll) {
        this.setScrollOnChanges();
      }
      if (nzWidthConfig) {
        this.nzTableStyleService.setTableWidthConfig(this.nzWidthConfig);
      }
      if (nzTemplateMode) {
        this.templateMode$.next(this.nzTemplateMode);
      }
      if (nzNoResult) {
        this.nzTableStyleService.setNoResult(this.nzNoResult);
      }
      this.updateShowPagination();
    }
    ngAfterViewInit() {
      this.nzResizeObserver.observe(this.elementRef).pipe(map(([entry]) => {
        const {
          width
        } = entry.target.getBoundingClientRect();
        const scrollBarWidth = this.scrollY ? this.verticalScrollBarWidth : 0;
        return Math.floor(width - scrollBarWidth);
      }), takeUntilDestroyed(this.destroyRef)).subscribe(this.nzTableStyleService.hostWidth$);
      if (this.nzTableInnerScrollComponent && this.nzTableInnerScrollComponent.cdkVirtualScrollViewport) {
        this.cdkVirtualScrollViewport = this.nzTableInnerScrollComponent.cdkVirtualScrollViewport;
      }
    }
    setScrollOnChanges() {
      this.scrollX = this.nzScroll && this.nzScroll.x || null;
      this.scrollY = this.nzScroll && this.nzScroll.y || null;
      this.nzTableStyleService.setScroll(this.scrollX, this.scrollY);
    }
    updateShowPagination() {
      this.showPagination = this.nzHideOnSinglePage && this.nzData.length > this.nzPageSize || this.nzData.length > 0 && !this.nzHideOnSinglePage || !this.nzFrontPagination && this.nzTotal > this.nzPageSize;
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzLoadingIndicator_decorators = [WithConfig()];
    _nzBordered_decorators = [WithConfig()];
    _nzSize_decorators = [WithConfig()];
    _nzShowSizeChanger_decorators = [WithConfig()];
    _nzHideOnSinglePage_decorators = [WithConfig()];
    _nzShowQuickJumper_decorators = [WithConfig()];
    _nzSimple_decorators = [WithConfig()];
    __esDecorate(null, null, _nzLoadingIndicator_decorators, {
      kind: "field",
      name: "nzLoadingIndicator",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzLoadingIndicator" in obj,
        get: (obj) => obj.nzLoadingIndicator,
        set: (obj, value) => {
          obj.nzLoadingIndicator = value;
        }
      },
      metadata: _metadata
    }, _nzLoadingIndicator_initializers, _nzLoadingIndicator_extraInitializers);
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
    __esDecorate(null, null, _nzShowSizeChanger_decorators, {
      kind: "field",
      name: "nzShowSizeChanger",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzShowSizeChanger" in obj,
        get: (obj) => obj.nzShowSizeChanger,
        set: (obj, value) => {
          obj.nzShowSizeChanger = value;
        }
      },
      metadata: _metadata
    }, _nzShowSizeChanger_initializers, _nzShowSizeChanger_extraInitializers);
    __esDecorate(null, null, _nzHideOnSinglePage_decorators, {
      kind: "field",
      name: "nzHideOnSinglePage",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzHideOnSinglePage" in obj,
        get: (obj) => obj.nzHideOnSinglePage,
        set: (obj, value) => {
          obj.nzHideOnSinglePage = value;
        }
      },
      metadata: _metadata
    }, _nzHideOnSinglePage_initializers, _nzHideOnSinglePage_extraInitializers);
    __esDecorate(null, null, _nzShowQuickJumper_decorators, {
      kind: "field",
      name: "nzShowQuickJumper",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzShowQuickJumper" in obj,
        get: (obj) => obj.nzShowQuickJumper,
        set: (obj, value) => {
          obj.nzShowQuickJumper = value;
        }
      },
      metadata: _metadata
    }, _nzShowQuickJumper_initializers, _nzShowQuickJumper_extraInitializers);
    __esDecorate(null, null, _nzSimple_decorators, {
      kind: "field",
      name: "nzSimple",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSimple" in obj,
        get: (obj) => obj.nzSimple,
        set: (obj, value) => {
          obj.nzSimple = value;
        }
      },
      metadata: _metadata
    }, _nzSimple_initializers, _nzSimple_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzTableComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-table"]],
    contentQueries: function NzTableComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, NzTableVirtualScrollDirective, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzVirtualScrollDirective = _t.first);
      }
    },
    viewQuery: function NzTableComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(NzTableInnerScrollComponent, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzTableInnerScrollComponent = _t.first);
      }
    },
    hostAttrs: [1, "ant-table-wrapper"],
    hostVars: 4,
    hostBindings: function NzTableComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-table-wrapper-rtl", ctx.dir === "rtl")("ant-table-custom-column", ctx.nzCustomColumn.length);
      }
    },
    inputs: {
      nzTableLayout: "nzTableLayout",
      nzShowTotal: "nzShowTotal",
      nzItemRender: "nzItemRender",
      nzTitle: "nzTitle",
      nzFooter: "nzFooter",
      nzNoResult: "nzNoResult",
      nzPageSizeOptions: "nzPageSizeOptions",
      nzVirtualItemSize: "nzVirtualItemSize",
      nzVirtualMaxBufferPx: "nzVirtualMaxBufferPx",
      nzVirtualMinBufferPx: "nzVirtualMinBufferPx",
      nzVirtualForTrackBy: "nzVirtualForTrackBy",
      nzLoadingDelay: "nzLoadingDelay",
      nzPageIndex: "nzPageIndex",
      nzPageSize: "nzPageSize",
      nzTotal: "nzTotal",
      nzWidthConfig: "nzWidthConfig",
      nzData: "nzData",
      nzCustomColumn: "nzCustomColumn",
      nzPaginationPosition: "nzPaginationPosition",
      nzScroll: "nzScroll",
      noDataVirtualHeight: "noDataVirtualHeight",
      nzPaginationType: "nzPaginationType",
      nzFrontPagination: [2, "nzFrontPagination", "nzFrontPagination", booleanAttribute],
      nzTemplateMode: [2, "nzTemplateMode", "nzTemplateMode", booleanAttribute],
      nzShowPagination: [2, "nzShowPagination", "nzShowPagination", booleanAttribute],
      nzLoading: [2, "nzLoading", "nzLoading", booleanAttribute],
      nzOuterBordered: [2, "nzOuterBordered", "nzOuterBordered", booleanAttribute],
      nzLoadingIndicator: "nzLoadingIndicator",
      nzBordered: [2, "nzBordered", "nzBordered", booleanAttribute],
      nzSize: "nzSize",
      nzShowSizeChanger: [2, "nzShowSizeChanger", "nzShowSizeChanger", booleanAttribute],
      nzHideOnSinglePage: [2, "nzHideOnSinglePage", "nzHideOnSinglePage", booleanAttribute],
      nzShowQuickJumper: [2, "nzShowQuickJumper", "nzShowQuickJumper", booleanAttribute],
      nzSimple: [2, "nzSimple", "nzSimple", booleanAttribute]
    },
    outputs: {
      nzPageSizeChange: "nzPageSizeChange",
      nzPageIndexChange: "nzPageIndexChange",
      nzQueryParams: "nzQueryParams",
      nzCurrentPageDataChange: "nzCurrentPageDataChange",
      nzCustomColumnChange: "nzCustomColumnChange"
    },
    exportAs: ["nzTable"],
    features: [\u0275\u0275ProvidersFeature([NzTableStyleService, NzTableDataService]), \u0275\u0275NgOnChangesFeature],
    ngContentSelectors: _c09,
    decls: 13,
    vars: 26,
    consts: [["tableMainElement", ""], ["paginationTemplate", ""], ["contentTemplate", ""], [3, "nzDelay", "nzSpinning", "nzIndicator"], [3, "ngTemplateOutlet"], [1, "ant-table"], [3, "title"], [3, "data", "scrollX", "scrollY", "contentTemplate", "listOfColWidth", "theadTemplate", "tfootTemplate", "tfootFixed", "verticalScrollBarWidth", "virtualTemplate", "virtualItemSize", "virtualMaxBufferPx", "virtualMinBufferPx", "tableMainElement", "virtualForTrackBy", "noDataVirtualHeight"], [3, "tableLayout", "listOfColWidth", "theadTemplate", "contentTemplate", "tfootTemplate"], [3, "footer"], [1, "ant-table-pagination", "ant-table-pagination-right", 3, "hidden", "nzShowSizeChanger", "nzPageSizeOptions", "nzItemRender", "nzShowQuickJumper", "nzHideOnSinglePage", "nzShowTotal", "nzSize", "nzPageSize", "nzTotal", "nzSimple", "nzPageIndex"], [1, "ant-table-pagination", "ant-table-pagination-right", 3, "nzPageSizeChange", "nzPageIndexChange", "hidden", "nzShowSizeChanger", "nzPageSizeOptions", "nzItemRender", "nzShowQuickJumper", "nzHideOnSinglePage", "nzShowTotal", "nzSize", "nzPageSize", "nzTotal", "nzSimple", "nzPageIndex"]],
    template: function NzTableComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "nz-spin", 3);
        \u0275\u0275conditionalCreate(1, NzTableComponent_Conditional_1_Template, 1, 1, null, 4);
        \u0275\u0275elementStart(2, "div", 5, 0);
        \u0275\u0275conditionalCreate(4, NzTableComponent_Conditional_4_Template, 1, 1, "nz-table-title-footer", 6);
        \u0275\u0275conditionalCreate(5, NzTableComponent_Conditional_5_Template, 1, 16, "nz-table-inner-scroll", 7)(6, NzTableComponent_Conditional_6_Template, 1, 5, "nz-table-inner-default", 8);
        \u0275\u0275conditionalCreate(7, NzTableComponent_Conditional_7_Template, 1, 1, "nz-table-title-footer", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(8, NzTableComponent_Conditional_8_Template, 1, 1, null, 4);
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, NzTableComponent_ng_template_9_Template, 1, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(11, NzTableComponent_ng_template_11_Template, 1, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
      }
      if (rf & 2) {
        \u0275\u0275property("nzDelay", ctx.nzLoadingDelay)("nzSpinning", ctx.nzLoading)("nzIndicator", ctx.nzLoadingIndicator);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.nzPaginationPosition === "both" || ctx.nzPaginationPosition === "top" ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275classProp("ant-table-rtl", ctx.dir === "rtl")("ant-table-fixed-header", ctx.nzData.length && ctx.scrollY)("ant-table-fixed-column", ctx.scrollX)("ant-table-has-fix-left", ctx.hasFixLeft)("ant-table-has-fix-right", ctx.hasFixRight)("ant-table-bordered", ctx.nzBordered)("nz-table-out-bordered", ctx.nzOuterBordered && !ctx.nzBordered)("ant-table-middle", ctx.nzSize === "middle")("ant-table-small", ctx.nzSize === "small");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.nzTitle ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.scrollY || ctx.scrollX ? 5 : 6);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.nzFooter ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.nzPaginationPosition === "both" || ctx.nzPaginationPosition === "bottom" ? 8 : -1);
      }
    },
    dependencies: [NzSpinComponent, NgTemplateOutlet, NzTableTitleFooterComponent, NzTableInnerScrollComponent, NzTableInnerDefaultComponent, NzPaginationModule, NzPaginationComponent],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableComponent, [{
    type: Component,
    args: [{
      selector: "nz-table",
      exportAs: "nzTable",
      providers: [NzTableStyleService, NzTableDataService],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <nz-spin [nzDelay]="nzLoadingDelay" [nzSpinning]="nzLoading" [nzIndicator]="nzLoadingIndicator">
      @if (nzPaginationPosition === 'both' || nzPaginationPosition === 'top') {
        <ng-template [ngTemplateOutlet]="paginationTemplate" />
      }
      <div
        #tableMainElement
        class="ant-table"
        [class.ant-table-rtl]="dir === 'rtl'"
        [class.ant-table-fixed-header]="nzData.length && scrollY"
        [class.ant-table-fixed-column]="scrollX"
        [class.ant-table-has-fix-left]="hasFixLeft"
        [class.ant-table-has-fix-right]="hasFixRight"
        [class.ant-table-bordered]="nzBordered"
        [class.nz-table-out-bordered]="nzOuterBordered && !nzBordered"
        [class.ant-table-middle]="nzSize === 'middle'"
        [class.ant-table-small]="nzSize === 'small'"
      >
        @if (nzTitle) {
          <nz-table-title-footer [title]="nzTitle" />
        }
        @if (scrollY || scrollX) {
          <nz-table-inner-scroll
            [data]="data"
            [scrollX]="scrollX"
            [scrollY]="scrollY"
            [contentTemplate]="contentTemplate"
            [listOfColWidth]="listOfAutoColWidth"
            [theadTemplate]="theadTemplate"
            [tfootTemplate]="tfootTemplate"
            [tfootFixed]="tfootFixed"
            [verticalScrollBarWidth]="verticalScrollBarWidth"
            [virtualTemplate]="nzVirtualScrollDirective ? nzVirtualScrollDirective.templateRef : null"
            [virtualItemSize]="nzVirtualItemSize"
            [virtualMaxBufferPx]="nzVirtualMaxBufferPx"
            [virtualMinBufferPx]="nzVirtualMinBufferPx"
            [tableMainElement]="tableMainElement"
            [virtualForTrackBy]="nzVirtualForTrackBy"
            [noDataVirtualHeight]="noDataVirtualHeight"
          />
        } @else {
          <nz-table-inner-default
            [tableLayout]="nzTableLayout"
            [listOfColWidth]="listOfManualColWidth"
            [theadTemplate]="theadTemplate"
            [contentTemplate]="contentTemplate"
            [tfootTemplate]="tfootTemplate"
          />
        }
        @if (nzFooter) {
          <nz-table-title-footer [footer]="nzFooter" />
        }
      </div>
      @if (nzPaginationPosition === 'both' || nzPaginationPosition === 'bottom') {
        <ng-template [ngTemplateOutlet]="paginationTemplate" />
      }
    </nz-spin>
    <ng-template #paginationTemplate>
      @if (nzShowPagination && data.length) {
        <nz-pagination
          [hidden]="!showPagination"
          class="ant-table-pagination ant-table-pagination-right"
          [nzShowSizeChanger]="nzShowSizeChanger"
          [nzPageSizeOptions]="nzPageSizeOptions"
          [nzItemRender]="nzItemRender!"
          [nzShowQuickJumper]="nzShowQuickJumper"
          [nzHideOnSinglePage]="nzHideOnSinglePage"
          [nzShowTotal]="nzShowTotal"
          [nzSize]="nzPaginationType === 'small' ? 'small' : nzSize === 'default' ? 'default' : 'small'"
          [nzPageSize]="nzPageSize"
          [nzTotal]="nzTotal"
          [nzSimple]="nzSimple"
          [nzPageIndex]="nzPageIndex"
          (nzPageSizeChange)="onPageSizeChange($event)"
          (nzPageIndexChange)="onPageIndexChange($event)"
        />
      }
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
  `,
      host: {
        class: "ant-table-wrapper",
        "[class.ant-table-wrapper-rtl]": 'dir === "rtl"',
        "[class.ant-table-custom-column]": `nzCustomColumn.length`
      },
      imports: [NzSpinComponent, NgTemplateOutlet, NzTableTitleFooterComponent, NzTableInnerScrollComponent, NzTableInnerDefaultComponent, NzPaginationModule]
    }]
  }], () => [], {
    nzTableLayout: [{
      type: Input
    }],
    nzShowTotal: [{
      type: Input
    }],
    nzItemRender: [{
      type: Input
    }],
    nzTitle: [{
      type: Input
    }],
    nzFooter: [{
      type: Input
    }],
    nzNoResult: [{
      type: Input
    }],
    nzPageSizeOptions: [{
      type: Input
    }],
    nzVirtualItemSize: [{
      type: Input
    }],
    nzVirtualMaxBufferPx: [{
      type: Input
    }],
    nzVirtualMinBufferPx: [{
      type: Input
    }],
    nzVirtualForTrackBy: [{
      type: Input
    }],
    nzLoadingDelay: [{
      type: Input
    }],
    nzPageIndex: [{
      type: Input
    }],
    nzPageSize: [{
      type: Input
    }],
    nzTotal: [{
      type: Input
    }],
    nzWidthConfig: [{
      type: Input
    }],
    nzData: [{
      type: Input
    }],
    nzCustomColumn: [{
      type: Input
    }],
    nzPaginationPosition: [{
      type: Input
    }],
    nzScroll: [{
      type: Input
    }],
    noDataVirtualHeight: [{
      type: Input
    }],
    nzPaginationType: [{
      type: Input
    }],
    nzFrontPagination: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzTemplateMode: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowPagination: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzLoading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOuterBordered: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzLoadingIndicator: [{
      type: Input
    }],
    nzBordered: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSize: [{
      type: Input
    }],
    nzShowSizeChanger: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzHideOnSinglePage: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowQuickJumper: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSimple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzPageSizeChange: [{
      type: Output
    }],
    nzPageIndexChange: [{
      type: Output
    }],
    nzQueryParams: [{
      type: Output
    }],
    nzCurrentPageDataChange: [{
      type: Output
    }],
    nzCustomColumnChange: [{
      type: Output
    }],
    nzVirtualScrollDirective: [{
      type: ContentChild,
      args: [NzTableVirtualScrollDirective, {
        static: false
      }]
    }],
    nzTableInnerScrollComponent: [{
      type: ViewChild,
      args: [NzTableInnerScrollComponent]
    }]
  });
})();
function fixedAttribute(value) {
  return value === "top" || value === "bottom" ? value : booleanAttribute(value) ? "bottom" : null;
}
var _NzTfootSummaryComponent = class _NzTfootSummaryComponent {
  constructor() {
    __publicField(this, "nzFixed", null);
    __publicField(this, "templateRef");
    __publicField(this, "nzTableStyleService", inject(NzTableStyleService, {
      optional: true
    }));
    __publicField(this, "isInsideTable", !!this.nzTableStyleService);
  }
  ngOnInit() {
    var _a;
    (_a = this.nzTableStyleService) == null ? void 0 : _a.setTfootTemplate(this.templateRef);
  }
  ngOnChanges(changes) {
    var _a;
    const {
      nzFixed
    } = changes;
    (_a = this.nzTableStyleService) == null ? void 0 : _a.setTfootFixed(nzFixed.currentValue);
  }
};
__publicField(_NzTfootSummaryComponent, "\u0275fac", function NzTfootSummaryComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTfootSummaryComponent)();
});
__publicField(_NzTfootSummaryComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTfootSummaryComponent,
  selectors: [["tfoot", "nzSummary", ""]],
  viewQuery: function NzTfootSummaryComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c142, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templateRef = _t.first);
    }
  },
  hostVars: 2,
  hostBindings: function NzTfootSummaryComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-table-summary", !ctx.isInsideTable || !ctx.nzFixed);
    }
  },
  inputs: {
    nzFixed: [2, "nzFixed", "nzFixed", fixedAttribute]
  },
  features: [\u0275\u0275NgOnChangesFeature],
  attrs: _c152,
  ngContentSelectors: _c09,
  decls: 3,
  vars: 1,
  consts: [["contentTemplate", ""], [3, "ngTemplateOutlet"]],
  template: function NzTfootSummaryComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275template(0, NzTfootSummaryComponent_ng_template_0_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275conditionalCreate(2, NzTfootSummaryComponent_Conditional_2_Template, 1, 1, null, 1);
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.isInsideTable || !ctx.nzFixed ? 2 : -1);
    }
  },
  dependencies: [NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTfootSummaryComponent = _NzTfootSummaryComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTfootSummaryComponent, [{
    type: Component,
    args: [{
      selector: "tfoot[nzSummary]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
    @if (!isInsideTable || !nzFixed) {
      <ng-template [ngTemplateOutlet]="contentTemplate" />
    }
  `,
      imports: [NgTemplateOutlet],
      host: {
        "[class.ant-table-summary]": "!isInsideTable || !nzFixed"
      }
    }]
  }], null, {
    nzFixed: [{
      type: Input,
      args: [{
        transform: fixedAttribute
      }]
    }],
    templateRef: [{
      type: ViewChild,
      args: ["contentTemplate", {
        static: true
      }]
    }]
  });
})();
var _NzTrDirective = class _NzTrDirective {
  constructor() {
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "listOfNzThDirective");
    __publicField(this, "listOfCellFixedDirective");
    __publicField(this, "listOfFixedColumns$", new ReplaySubject(1));
    __publicField(this, "listOfColumns$", new ReplaySubject(1));
    __publicField(this, "listOfFixedColumnsChanges$", this.listOfFixedColumns$.pipe(switchMap((list) => merge(this.listOfFixedColumns$, ...list.map((c) => c.changes$)).pipe(mergeMap(() => this.listOfFixedColumns$))), takeUntilDestroyed(this.destroyRef)));
    __publicField(this, "listOfFixedLeftColumnChanges$", this.listOfFixedColumnsChanges$.pipe(map((list) => list.filter((item) => item.nzLeft !== false))));
    __publicField(this, "listOfFixedRightColumnChanges$", this.listOfFixedColumnsChanges$.pipe(map((list) => list.filter((item) => item.nzRight !== false))));
    __publicField(this, "listOfColumnsChanges$", this.listOfColumns$.pipe(switchMap((list) => merge(this.listOfColumns$, ...list.map((c) => c.changes$)).pipe(mergeMap(() => this.listOfColumns$))), takeUntilDestroyed(this.destroyRef)));
    __publicField(this, "nzTableStyleService", inject(NzTableStyleService, {
      optional: true
    }));
    __publicField(this, "isInsideTable", !!this.nzTableStyleService);
  }
  ngAfterContentInit() {
    if (this.nzTableStyleService) {
      this.listOfCellFixedDirective.changes.pipe(startWith(this.listOfCellFixedDirective), takeUntilDestroyed(this.destroyRef)).subscribe(this.listOfFixedColumns$);
      this.listOfNzThDirective.changes.pipe(startWith(this.listOfNzThDirective), takeUntilDestroyed(this.destroyRef)).subscribe(this.listOfColumns$);
      this.listOfFixedLeftColumnChanges$.subscribe((listOfFixedLeft) => {
        listOfFixedLeft.forEach((cell) => cell.setIsLastLeft(cell === listOfFixedLeft[listOfFixedLeft.length - 1]));
      });
      this.listOfFixedRightColumnChanges$.subscribe((listOfFixedRight) => {
        listOfFixedRight.forEach((cell) => cell.setIsFirstRight(cell === listOfFixedRight[0]));
      });
      combineLatest([this.nzTableStyleService.listOfListOfThWidth$, this.listOfFixedLeftColumnChanges$]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(([listOfAutoWidth, listOfLeftCell]) => {
        listOfLeftCell.forEach((cell, index) => {
          if (cell.isAutoLeft) {
            const currentArray = listOfLeftCell.slice(0, index);
            const count = currentArray.reduce((pre, cur) => pre + (cur.colspan || cur.colSpan || 1), 0);
            const width = listOfAutoWidth.slice(0, count).reduce((pre, cur) => pre + cur, 0);
            cell.setAutoLeftWidth(`${width}px`);
          }
        });
      });
      combineLatest([this.nzTableStyleService.listOfListOfThWidth$, this.listOfFixedRightColumnChanges$]).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(([listOfAutoWidth, listOfRightCell]) => {
        listOfRightCell.forEach((_, index) => {
          const cell = listOfRightCell[listOfRightCell.length - index - 1];
          if (cell.isAutoRight) {
            const currentArray = listOfRightCell.slice(listOfRightCell.length - index, listOfRightCell.length);
            const count = currentArray.reduce((pre, cur) => pre + (cur.colspan || cur.colSpan || 1), 0);
            const width = listOfAutoWidth.slice(listOfAutoWidth.length - count, listOfAutoWidth.length).reduce((pre, cur) => pre + cur, 0);
            cell.setAutoRightWidth(`${width}px`);
          }
        });
      });
    }
  }
};
__publicField(_NzTrDirective, "\u0275fac", function NzTrDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTrDirective)();
});
__publicField(_NzTrDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTrDirective,
  selectors: [["tr", 3, "nz-table-measure-row", "", 3, "nzExpand", "", 3, "nz-table-fixed-row", ""]],
  contentQueries: function NzTrDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzThMeasureDirective, 4)(dirIndex, NzCellFixedDirective, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfNzThDirective = _t);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfCellFixedDirective = _t);
    }
  },
  hostVars: 2,
  hostBindings: function NzTrDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-table-row", ctx.isInsideTable);
    }
  }
}));
var NzTrDirective = _NzTrDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTrDirective, [{
    type: Directive,
    args: [{
      selector: "tr:not([nz-table-measure-row]):not([nzExpand]):not([nz-table-fixed-row])",
      host: {
        "[class.ant-table-row]": "isInsideTable"
      }
    }]
  }], null, {
    listOfNzThDirective: [{
      type: ContentChildren,
      args: [NzThMeasureDirective]
    }],
    listOfCellFixedDirective: [{
      type: ContentChildren,
      args: [NzCellFixedDirective]
    }]
  });
})();
var _NzTheadComponent = class _NzTheadComponent {
  constructor() {
    __publicField(this, "nzTableStyleService", inject(NzTableStyleService, {
      optional: true
    }));
    __publicField(this, "nzTableDataService", inject(NzTableDataService, {
      optional: true
    }));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "el", inject(ElementRef).nativeElement);
    __publicField(this, "renderer", inject(Renderer2));
    __publicField(this, "isInsideTable", !!this.nzTableStyleService);
    __publicField(this, "templateRef");
    __publicField(this, "listOfNzTrDirective");
    __publicField(this, "listOfNzThAddOnComponent");
    __publicField(this, "nzSortOrderChange", new EventEmitter());
  }
  ngOnInit() {
    if (this.nzTableStyleService) {
      this.nzTableStyleService.setTheadTemplate(this.templateRef);
    }
  }
  ngAfterContentInit() {
    if (this.nzTableStyleService) {
      const firstTableRow$ = this.listOfNzTrDirective.changes.pipe(startWith(this.listOfNzTrDirective), map((item) => item && item.first), takeUntilDestroyed(this.destroyRef));
      const listOfColumnsChanges$ = firstTableRow$.pipe(switchMap((firstTableRow) => firstTableRow ? firstTableRow.listOfColumnsChanges$ : EMPTY));
      listOfColumnsChanges$.subscribe((data) => this.nzTableStyleService.setListOfTh(data));
      this.nzTableStyleService.enableAutoMeasure$.pipe(switchMap((enable) => enable ? listOfColumnsChanges$ : of([]))).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => this.nzTableStyleService.setListOfMeasureColumn(data));
      const listOfFixedLeftColumnChanges$ = firstTableRow$.pipe(switchMap((firstTr) => firstTr ? firstTr.listOfFixedLeftColumnChanges$ : EMPTY));
      const listOfFixedRightColumnChanges$ = firstTableRow$.pipe(switchMap((firstTr) => firstTr ? firstTr.listOfFixedRightColumnChanges$ : EMPTY));
      listOfFixedLeftColumnChanges$.subscribe((listOfFixedLeftColumn) => {
        this.nzTableStyleService.setHasFixLeft(listOfFixedLeftColumn.length !== 0);
      });
      listOfFixedRightColumnChanges$.subscribe((listOfFixedRightColumn) => {
        this.nzTableStyleService.setHasFixRight(listOfFixedRightColumn.length !== 0);
      });
    }
    if (this.nzTableDataService) {
      const listOfColumn$ = this.listOfNzThAddOnComponent.changes.pipe(startWith(this.listOfNzThAddOnComponent));
      const manualSort$ = listOfColumn$.pipe(switchMap(() => merge(...this.listOfNzThAddOnComponent.map((th) => th.manualClickOrder$))), takeUntilDestroyed(this.destroyRef));
      manualSort$.subscribe((data) => {
        const emitValue = {
          key: data.nzColumnKey,
          value: data.sortOrder
        };
        this.nzSortOrderChange.emit(emitValue);
        if (data.nzSortFn && data.nzSortPriority === false) {
          this.listOfNzThAddOnComponent.filter((th) => th !== data).forEach((th) => th.clearSortOrder());
        }
      });
      const listOfCalcOperator$ = listOfColumn$.pipe(
        switchMap((list) => merge(listOfColumn$, ...list.map((c) => c.calcOperatorChange$)).pipe(mergeMap(() => listOfColumn$))),
        map((list) => list.filter((item) => !!item.nzSortFn || !!item.nzFilterFn).map((item) => {
          const {
            nzSortFn,
            sortOrder,
            nzFilterFn,
            nzFilterValue,
            nzSortPriority,
            nzColumnKey
          } = item;
          return {
            key: nzColumnKey,
            sortFn: nzSortFn,
            sortPriority: nzSortPriority,
            sortOrder,
            filterFn: nzFilterFn,
            filterValue: nzFilterValue
          };
        })),
        // TODO: after checked error here
        delay(0),
        takeUntilDestroyed(this.destroyRef)
      );
      listOfCalcOperator$.subscribe((list) => {
        var _a;
        (_a = this.nzTableDataService) == null ? void 0 : _a.listOfCalcOperator$.next(list);
      });
    }
  }
  ngAfterViewInit() {
    if (this.nzTableStyleService) {
      this.renderer.removeChild(this.renderer.parentNode(this.el), this.el);
    }
  }
};
__publicField(_NzTheadComponent, "\u0275fac", function NzTheadComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTheadComponent)();
});
__publicField(_NzTheadComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTheadComponent,
  selectors: [["thead", 9, "ant-table-thead"]],
  contentQueries: function NzTheadComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzTrDirective, 5)(dirIndex, NzThAddOnComponent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfNzTrDirective = _t);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfNzThAddOnComponent = _t);
    }
  },
  viewQuery: function NzTheadComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c142, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templateRef = _t.first);
    }
  },
  outputs: {
    nzSortOrderChange: "nzSortOrderChange"
  },
  ngContentSelectors: _c09,
  decls: 3,
  vars: 1,
  consts: [["contentTemplate", ""], [3, "ngTemplateOutlet"]],
  template: function NzTheadComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275template(0, NzTheadComponent_ng_template_0_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275conditionalCreate(2, NzTheadComponent_Conditional_2_Template, 1, 1, null, 1);
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.isInsideTable ? 2 : -1);
    }
  },
  dependencies: [NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTheadComponent = _NzTheadComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTheadComponent, [{
    type: Component,
    args: [{
      selector: "thead:not(.ant-table-thead)",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
    @if (!isInsideTable) {
      <ng-template [ngTemplateOutlet]="contentTemplate" />
    }
  `,
      imports: [NgTemplateOutlet]
    }]
  }], null, {
    templateRef: [{
      type: ViewChild,
      args: ["contentTemplate", {
        static: true
      }]
    }],
    listOfNzTrDirective: [{
      type: ContentChildren,
      args: [NzTrDirective, {
        descendants: true
      }]
    }],
    listOfNzThAddOnComponent: [{
      type: ContentChildren,
      args: [NzThAddOnComponent, {
        descendants: true
      }]
    }],
    nzSortOrderChange: [{
      type: Output
    }]
  });
})();
var _NzTrExpandDirective = class _NzTrExpandDirective {
  constructor() {
    __publicField(this, "nzExpand", true);
  }
};
__publicField(_NzTrExpandDirective, "\u0275fac", function NzTrExpandDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTrExpandDirective)();
});
__publicField(_NzTrExpandDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTrExpandDirective,
  selectors: [["tr", "nzExpand", ""]],
  hostAttrs: [1, "ant-table-expanded-row"],
  hostVars: 1,
  hostBindings: function NzTrExpandDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275domProperty("hidden", !ctx.nzExpand);
    }
  },
  inputs: {
    nzExpand: [2, "nzExpand", "nzExpand", booleanAttribute]
  }
}));
var NzTrExpandDirective = _NzTrExpandDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTrExpandDirective, [{
    type: Directive,
    args: [{
      selector: "tr[nzExpand]",
      host: {
        class: "ant-table-expanded-row",
        "[hidden]": `!nzExpand`
      }
    }]
  }], null, {
    nzExpand: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzTableModule = class _NzTableModule {
};
__publicField(_NzTableModule, "\u0275fac", function NzTableModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTableModule)();
});
__publicField(_NzTableModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzTableModule,
  imports: [NzTableComponent, NzThAddOnComponent, NzTableCellDirective, NzThMeasureDirective, NzTdAddOnComponent, NzTheadComponent, NzTbodyComponent, NzTrDirective, NzTrExpandDirective, NzTfootSummaryComponent, NzTableVirtualScrollDirective, NzCellFixedDirective, NzCustomColumnDirective, NzTableContentComponent, NzTableTitleFooterComponent, NzTableInnerDefaultComponent, NzTableInnerScrollComponent, NzTrMeasureComponent, NzRowIndentDirective, NzRowExpandButtonDirective, NzCellBreakWordDirective, NzCellAlignDirective, NzTableSortersComponent, NzTableFilterComponent, NzTableSelectionComponent, NzCellEllipsisDirective, NzFilterTriggerComponent, NzTableFixedRowComponent, NzThSelectionComponent],
  exports: [NzTableComponent, NzThAddOnComponent, NzTableCellDirective, NzThMeasureDirective, NzTdAddOnComponent, NzTheadComponent, NzTbodyComponent, NzTrDirective, NzTableVirtualScrollDirective, NzCellFixedDirective, NzCustomColumnDirective, NzFilterTriggerComponent, NzTrExpandDirective, NzTfootSummaryComponent, NzCellBreakWordDirective, NzCellAlignDirective, NzCellEllipsisDirective, NzTableFixedRowComponent, NzThSelectionComponent]
}));
__publicField(_NzTableModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzTableComponent, NzThAddOnComponent, NzTdAddOnComponent, NzTbodyComponent, NzTableTitleFooterComponent, NzTableInnerScrollComponent, NzTableSortersComponent, NzTableFilterComponent, NzTableSelectionComponent, NzFilterTriggerComponent, NzThSelectionComponent]
}));
var NzTableModule = _NzTableModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTableModule, [{
    type: NgModule,
    args: [{
      imports: [NzTableComponent, NzThAddOnComponent, NzTableCellDirective, NzThMeasureDirective, NzTdAddOnComponent, NzTheadComponent, NzTbodyComponent, NzTrDirective, NzTrExpandDirective, NzTfootSummaryComponent, NzTableVirtualScrollDirective, NzCellFixedDirective, NzCustomColumnDirective, NzTableContentComponent, NzTableTitleFooterComponent, NzTableInnerDefaultComponent, NzTableInnerScrollComponent, NzTrMeasureComponent, NzRowIndentDirective, NzRowExpandButtonDirective, NzCellBreakWordDirective, NzCellAlignDirective, NzTableSortersComponent, NzTableFilterComponent, NzTableSelectionComponent, NzCellEllipsisDirective, NzFilterTriggerComponent, NzTableFixedRowComponent, NzThSelectionComponent],
      exports: [NzTableComponent, NzThAddOnComponent, NzTableCellDirective, NzThMeasureDirective, NzTdAddOnComponent, NzTheadComponent, NzTbodyComponent, NzTrDirective, NzTableVirtualScrollDirective, NzCellFixedDirective, NzCustomColumnDirective, NzFilterTriggerComponent, NzTrExpandDirective, NzTfootSummaryComponent, NzCellBreakWordDirective, NzCellAlignDirective, NzCellEllipsisDirective, NzTableFixedRowComponent, NzThSelectionComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-tag.mjs
var _c010 = ["*"];
function NzTagComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-icon", 1);
    \u0275\u0275listener("click", function NzTagComponent_Conditional_1_Template_nz_icon_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeTag($event));
    });
    \u0275\u0275elementEnd();
  }
}
var _NzTagComponent = class _NzTagComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "renderer", inject(Renderer2));
    __publicField(this, "el", inject(ElementRef).nativeElement);
    __publicField(this, "directionality", inject(Directionality));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "nzMode", "default");
    __publicField(this, "nzColor");
    __publicField(this, "nzChecked", false);
    __publicField(this, "nzBordered", true);
    __publicField(this, "nzOnClose", new EventEmitter());
    __publicField(this, "nzCheckedChange", new EventEmitter());
    __publicField(this, "dir", "ltr");
    __publicField(this, "isPresetColor", false);
  }
  updateCheckedStatus() {
    if (this.nzMode === "checkable") {
      this.nzChecked = !this.nzChecked;
      this.nzCheckedChange.emit(this.nzChecked);
    }
  }
  closeTag(e) {
    this.nzOnClose.emit(e);
    if (!e.defaultPrevented) {
      this.renderer.removeChild(this.renderer.parentNode(this.el), this.el);
    }
  }
  clearPresetColor() {
    const regexp = new RegExp(`(ant-tag-(?:${[...presetColors, ...statusColors].join("|")}))`, "g");
    const classname = this.el.classList.toString();
    const matches = [];
    let match = regexp.exec(classname);
    while (match !== null) {
      matches.push(match[1]);
      match = regexp.exec(classname);
    }
    this.el.classList.remove(...matches);
  }
  setPresetColor() {
    this.clearPresetColor();
    if (!this.nzColor) {
      this.isPresetColor = false;
    } else {
      this.isPresetColor = isPresetColor(this.nzColor) || isStatusColor(this.nzColor);
    }
    if (this.isPresetColor) {
      this.el.classList.add(`ant-tag-${this.nzColor}`);
    }
  }
  ngOnInit() {
    var _a;
    (_a = this.directionality.change) == null ? void 0 : _a.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
  }
  ngOnChanges(changes) {
    const {
      nzColor
    } = changes;
    if (nzColor) {
      this.setPresetColor();
    }
  }
};
__publicField(_NzTagComponent, "\u0275fac", function NzTagComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTagComponent)();
});
__publicField(_NzTagComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTagComponent,
  selectors: [["nz-tag"]],
  hostAttrs: [1, "ant-tag"],
  hostVars: 12,
  hostBindings: function NzTagComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function NzTagComponent_click_HostBindingHandler() {
        return ctx.updateCheckedStatus();
      });
    }
    if (rf & 2) {
      \u0275\u0275styleProp("background-color", ctx.isPresetColor ? "" : ctx.nzColor);
      \u0275\u0275classProp("ant-tag-has-color", ctx.nzColor && !ctx.isPresetColor)("ant-tag-checkable", ctx.nzMode === "checkable")("ant-tag-checkable-checked", ctx.nzChecked)("ant-tag-rtl", ctx.dir === "rtl")("ant-tag-borderless", !ctx.nzBordered);
    }
  },
  inputs: {
    nzMode: "nzMode",
    nzColor: "nzColor",
    nzChecked: [2, "nzChecked", "nzChecked", booleanAttribute],
    nzBordered: [2, "nzBordered", "nzBordered", booleanAttribute]
  },
  outputs: {
    nzOnClose: "nzOnClose",
    nzCheckedChange: "nzCheckedChange"
  },
  exportAs: ["nzTag"],
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c010,
  decls: 2,
  vars: 1,
  consts: [["nzType", "close", "tabindex", "-1", 1, "ant-tag-close-icon"], ["nzType", "close", "tabindex", "-1", 1, "ant-tag-close-icon", 3, "click"]],
  template: function NzTagComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
      \u0275\u0275conditionalCreate(1, NzTagComponent_Conditional_1_Template, 1, 0, "nz-icon", 0);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzMode === "closeable" ? 1 : -1);
    }
  },
  dependencies: [NzIconModule, NzIconDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTagComponent = _NzTagComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTagComponent, [{
    type: Component,
    args: [{
      selector: "nz-tag",
      exportAs: "nzTag",
      template: `
    <ng-content />
    @if (nzMode === 'closeable') {
      <nz-icon nzType="close" class="ant-tag-close-icon" tabindex="-1" (click)="closeTag($event)" />
    }
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "ant-tag",
        "[style.background-color]": `isPresetColor ? '' : nzColor`,
        "[class.ant-tag-has-color]": `nzColor && !isPresetColor`,
        "[class.ant-tag-checkable]": `nzMode === 'checkable'`,
        "[class.ant-tag-checkable-checked]": `nzChecked`,
        "[class.ant-tag-rtl]": `dir === 'rtl'`,
        "[class.ant-tag-borderless]": `!nzBordered`,
        "(click)": "updateCheckedStatus()"
      },
      imports: [NzIconModule]
    }]
  }], null, {
    nzMode: [{
      type: Input
    }],
    nzColor: [{
      type: Input
    }],
    nzChecked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzBordered: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOnClose: [{
      type: Output
    }],
    nzCheckedChange: [{
      type: Output
    }]
  });
})();
var _NzTagModule = class _NzTagModule {
};
__publicField(_NzTagModule, "\u0275fac", function NzTagModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTagModule)();
});
__publicField(_NzTagModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzTagModule,
  imports: [NzTagComponent],
  exports: [NzTagComponent]
}));
__publicField(_NzTagModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzTagComponent]
}));
var NzTagModule = _NzTagModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTagModule, [{
    type: NgModule,
    args: [{
      imports: [NzTagComponent],
      exports: [NzTagComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-time-picker.mjs
var _c011 = ["hourListElement"];
var _c17 = ["minuteListElement"];
var _c27 = ["secondListElement"];
var _c34 = ["use12HoursListElement"];
function NzTimePickerPanelComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.dateHelper.format(ctx_r0.time == null ? null : ctx_r0.time.value, ctx_r0.format) || "\xA0");
  }
}
function NzTimePickerPanelComponent_Conditional_2_For_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 10);
    \u0275\u0275listener("click", function NzTimePickerPanelComponent_Conditional_2_For_3_Conditional_0_Template_li_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const hour_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectHour(hour_r3));
    });
    \u0275\u0275elementStart(1, "div", 11);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const hour_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ant-picker-time-panel-cell-selected", ctx_r0.isSelectedHour(hour_r3))("ant-picker-time-panel-cell-disabled", hour_r3.disabled);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 5, hour_r3.index, "2.0-0"));
  }
}
function NzTimePickerPanelComponent_Conditional_2_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTimePickerPanelComponent_Conditional_2_For_3_Conditional_0_Template, 4, 8, "li", 9);
  }
  if (rf & 2) {
    const hour_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!(ctx_r0.nzHideDisabledOptions && hour_r3.disabled) ? 0 : -1);
  }
}
function NzTimePickerPanelComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 6, 0);
    \u0275\u0275repeaterCreate(2, NzTimePickerPanelComponent_Conditional_2_For_3_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.hourRange);
  }
}
function NzTimePickerPanelComponent_Conditional_3_For_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 10);
    \u0275\u0275listener("click", function NzTimePickerPanelComponent_Conditional_3_For_3_Conditional_0_Template_li_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const minute_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectMinute(minute_r5));
    });
    \u0275\u0275elementStart(1, "div", 11);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const minute_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ant-picker-time-panel-cell-selected", ctx_r0.isSelectedMinute(minute_r5))("ant-picker-time-panel-cell-disabled", minute_r5.disabled);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 5, minute_r5.index, "2.0-0"));
  }
}
function NzTimePickerPanelComponent_Conditional_3_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTimePickerPanelComponent_Conditional_3_For_3_Conditional_0_Template, 4, 8, "li", 9);
  }
  if (rf & 2) {
    const minute_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!(ctx_r0.nzHideDisabledOptions && minute_r5.disabled) ? 0 : -1);
  }
}
function NzTimePickerPanelComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 6, 1);
    \u0275\u0275repeaterCreate(2, NzTimePickerPanelComponent_Conditional_3_For_3_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.minuteRange);
  }
}
function NzTimePickerPanelComponent_Conditional_4_For_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 10);
    \u0275\u0275listener("click", function NzTimePickerPanelComponent_Conditional_4_For_3_Conditional_0_Template_li_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const second_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectSecond(second_r7));
    });
    \u0275\u0275elementStart(1, "div", 11);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const second_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ant-picker-time-panel-cell-selected", ctx_r0.isSelectedSecond(second_r7))("ant-picker-time-panel-cell-disabled", second_r7.disabled);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 5, second_r7.index, "2.0-0"));
  }
}
function NzTimePickerPanelComponent_Conditional_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTimePickerPanelComponent_Conditional_4_For_3_Conditional_0_Template, 4, 8, "li", 9);
  }
  if (rf & 2) {
    const second_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!(ctx_r0.nzHideDisabledOptions && second_r7.disabled) ? 0 : -1);
  }
}
function NzTimePickerPanelComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 6, 2);
    \u0275\u0275repeaterCreate(2, NzTimePickerPanelComponent_Conditional_4_For_3_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.secondRange);
  }
}
function NzTimePickerPanelComponent_Conditional_5_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 10);
    \u0275\u0275listener("click", function NzTimePickerPanelComponent_Conditional_5_For_3_Template_li_click_0_listener() {
      const range_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.select12Hours(range_r9));
    });
    \u0275\u0275elementStart(1, "div", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const range_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ant-picker-time-panel-cell-selected", ctx_r0.isSelected12Hours(range_r9));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(range_r9.value);
  }
}
function NzTimePickerPanelComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 6, 3);
    \u0275\u0275repeaterCreate(2, NzTimePickerPanelComponent_Conditional_5_For_3_Template, 3, 3, "li", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.use12HoursRange);
  }
}
function NzTimePickerPanelComponent_Conditional_6_Conditional_1_ng_template_1_Template(rf, ctx) {
}
function NzTimePickerPanelComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275template(1, NzTimePickerPanelComponent_Conditional_6_Conditional_1_ng_template_1_Template, 0, 0, "ng-template", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.nzAddOn);
  }
}
function NzTimePickerPanelComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275conditionalCreate(1, NzTimePickerPanelComponent_Conditional_6_Conditional_1_Template, 2, 1, "div", 13);
    \u0275\u0275elementStart(2, "ul", 14)(3, "li", 15)(4, "a", 16);
    \u0275\u0275listener("click", function NzTimePickerPanelComponent_Conditional_6_Template_a_click_4_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onClickNow());
    });
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "nzI18n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "li", 17)(8, "button", 18);
    \u0275\u0275listener("click", function NzTimePickerPanelComponent_Conditional_6_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onClickOk());
    });
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "nzI18n");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzAddOn ? 1 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.nzNowText || \u0275\u0275pipeBind1(6, 3, "Calendar.lang.now"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.nzOkText || \u0275\u0275pipeBind1(10, 5, "Calendar.lang.ok"), " ");
  }
}
var _c44 = ["inputElement"];
function NzTimePickerComponent_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const prefix_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(prefix_r2);
  }
}
function NzTimePickerComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 1);
    \u0275\u0275template(1, NzTimePickerComponent_Conditional_0_ng_container_1_Template, 2, 1, "ng-container", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx);
  }
}
function NzTimePickerComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "nz-icon", 9);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const suffixIcon_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzType", suffixIcon_r3);
  }
}
function NzTimePickerComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-form-item-feedback-icon", 6);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("status", ctx_r3.status);
  }
}
function NzTimePickerComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275listener("click", function NzTimePickerComponent_Conditional_8_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onClickClearBtn($event));
    });
    \u0275\u0275element(1, "nz-icon", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r3.nzClearText)("title", ctx_r3.nzClearText);
  }
}
function NzTimePickerComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275animateLeave(function NzTimePickerComponent_ng_template_9_Template_animateleave_cb() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.timepickerAnimationLeave());
    });
    \u0275\u0275animateEnter(function NzTimePickerComponent_ng_template_9_Template_animateenter_cb() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.timepickerAnimationEnter());
    });
    \u0275\u0275elementStart(1, "div", 13)(2, "div", 14)(3, "nz-time-picker-panel", 15);
    \u0275\u0275pipe(4, "async");
    \u0275\u0275twoWayListener("ngModelChange", function NzTimePickerComponent_ng_template_9_Template_nz_time_picker_panel_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.value, $event) || (ctx_r3.value = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function NzTimePickerComponent_ng_template_9_Template_nz_time_picker_panel_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onPanelValueChange($event));
    })("closePanel", function NzTimePickerComponent_ng_template_9_Template_nz_time_picker_panel_closePanel_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closePanel());
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r3.dropdownTimePickerClass());
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r3.nzPopupClassName);
    \u0275\u0275property("format", ctx_r3.nzFormat)("nzHourStep", ctx_r3.nzHourStep)("nzMinuteStep", ctx_r3.nzMinuteStep)("nzSecondStep", ctx_r3.nzSecondStep)("nzDisabledHours", ctx_r3.nzDisabledHours)("nzDisabledMinutes", ctx_r3.nzDisabledMinutes)("nzDisabledSeconds", ctx_r3.nzDisabledSeconds)("nzPlaceHolder", ctx_r3.nzPlaceHolder || \u0275\u0275pipeBind1(4, 21, ctx_r3.i18nPlaceHolder$))("nzHideDisabledOptions", ctx_r3.nzHideDisabledOptions)("nzUse12Hours", ctx_r3.nzUse12Hours)("nzDefaultOpenValue", ctx_r3.nzDefaultOpenValue)("nzAddOn", ctx_r3.nzAddOn)("nzClearText", ctx_r3.nzClearText)("nzNowText", ctx_r3.nzNowText)("nzOkText", ctx_r3.nzOkText)("nzAllowEmpty", ctx_r3.nzAllowEmpty);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.value);
  }
}
var TimeHolder = class {
  constructor() {
    __publicField(this, "selected12Hours");
    __publicField(this, "_value");
    __publicField(this, "_use12Hours", false);
    __publicField(this, "_defaultOpenValue");
    __publicField(this, "_changes", new Subject());
  }
  setMinutes(value, disabled) {
    if (!disabled) {
      this.initValue();
      this.value.setMinutes(value);
      this.update();
    }
    return this;
  }
  setHours(value, disabled) {
    if (!disabled) {
      this.initValue();
      if (this._use12Hours) {
        if (this.selected12Hours === "PM" && value !== 12) {
          this.value.setHours(value + 12);
        } else if (this.selected12Hours === "AM" && value === 12) {
          this.value.setHours(0);
        } else {
          this.value.setHours(value);
        }
      } else {
        this.value.setHours(value);
      }
      this.update();
    }
    return this;
  }
  setSeconds(value, disabled) {
    if (!disabled) {
      this.initValue();
      this.value.setSeconds(value);
      this.update();
    }
    return this;
  }
  setUse12Hours(value) {
    this._use12Hours = value;
    return this;
  }
  get changes() {
    return this._changes.asObservable();
  }
  setValue(value, use12Hours) {
    if (isNotNil(use12Hours)) {
      this._use12Hours = use12Hours;
    }
    if (value !== this.value) {
      this._value = value;
      if (isNotNil(this.value)) {
        if (this._use12Hours && isNotNil(this.hours)) {
          this.selected12Hours = this.hours >= 12 ? "PM" : "AM";
        }
      } else {
        this._clear();
      }
    }
    return this;
  }
  initValue() {
    if (isNil(this.value)) {
      this.setValue(/* @__PURE__ */ new Date(), this._use12Hours);
    }
  }
  clear() {
    this._clear();
    this.update();
  }
  get isEmpty() {
    return !(isNotNil(this.hours) || isNotNil(this.minutes) || isNotNil(this.seconds));
  }
  _clear() {
    this._value = void 0;
    this.selected12Hours = void 0;
  }
  update() {
    if (this.isEmpty) {
      this._value = void 0;
    } else {
      if (isNotNil(this.hours)) {
        this.value.setHours(this.hours);
      }
      if (isNotNil(this.minutes)) {
        this.value.setMinutes(this.minutes);
      }
      if (isNotNil(this.seconds)) {
        this.value.setSeconds(this.seconds);
      }
      if (this._use12Hours) {
        if (this.selected12Hours === "PM" && this.hours < 12) {
          this.value.setHours(this.hours + 12);
        }
        if (this.selected12Hours === "AM" && this.hours >= 12) {
          this.value.setHours(this.hours - 12);
        }
      }
    }
    this.changed();
  }
  changed() {
    this._changes.next(this.value);
  }
  /**
   * @description
   * UI view hours
   * Get viewHours which is selected in `time-picker-panel` and its range is [12, 1, 2, ..., 11]
   */
  get viewHours() {
    return this._use12Hours && isNotNil(this.hours) ? this.calculateViewHour(this.hours) : this.hours;
  }
  setSelected12Hours(value) {
    if (value.toUpperCase() !== this.selected12Hours) {
      this.selected12Hours = value.toUpperCase();
      this.update();
    }
  }
  get value() {
    return this._value || this._defaultOpenValue;
  }
  get hours() {
    var _a;
    return (_a = this.value) == null ? void 0 : _a.getHours();
  }
  get minutes() {
    var _a;
    return (_a = this.value) == null ? void 0 : _a.getMinutes();
  }
  get seconds() {
    var _a;
    return (_a = this.value) == null ? void 0 : _a.getSeconds();
  }
  setDefaultOpenValue(value) {
    this._defaultOpenValue = value;
    return this;
  }
  calculateViewHour(value) {
    const selected12Hours = this.selected12Hours;
    if (selected12Hours === "PM" && value > 12) {
      return value - 12;
    }
    if (selected12Hours === "AM" && value === 0) {
      return 12;
    }
    return value;
  }
};
function makeRange(length, step = 1, start = 0) {
  return new Array(Math.ceil(length / step)).fill(0).map((_, i) => (i + start) * step);
}
var _NzTimePickerPanelComponent = class _NzTimePickerPanelComponent {
  constructor() {
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "_nzHourStep", 1);
    __publicField(this, "_nzMinuteStep", 1);
    __publicField(this, "_nzSecondStep", 1);
    __publicField(this, "onChange");
    __publicField(this, "onTouch");
    __publicField(this, "_format", "HH:mm:ss");
    __publicField(this, "_disabledHours", () => []);
    __publicField(this, "_disabledMinutes", () => []);
    __publicField(this, "_disabledSeconds", () => []);
    __publicField(this, "_allowEmpty", true);
    __publicField(this, "time", new TimeHolder());
    __publicField(this, "hourEnabled", true);
    __publicField(this, "minuteEnabled", true);
    __publicField(this, "secondEnabled", true);
    __publicField(this, "firstScrolled", false);
    __publicField(this, "enabledColumns", 3);
    __publicField(this, "hourRange");
    __publicField(this, "minuteRange");
    __publicField(this, "secondRange");
    __publicField(this, "use12HoursRange");
    __publicField(this, "hourListElement");
    __publicField(this, "minuteListElement");
    __publicField(this, "secondListElement");
    __publicField(this, "use12HoursListElement");
    __publicField(this, "nzInDatePicker", false);
    // If inside a date-picker, more diff works need to be done
    __publicField(this, "nzAddOn");
    __publicField(this, "nzHideDisabledOptions", false);
    __publicField(this, "nzClearText");
    __publicField(this, "nzNowText");
    __publicField(this, "nzOkText");
    __publicField(this, "nzPlaceHolder");
    __publicField(this, "nzUse12Hours", false);
    __publicField(this, "nzDefaultOpenValue");
    __publicField(this, "closePanel", new EventEmitter());
  }
  set nzAllowEmpty(value) {
    this._allowEmpty = value;
  }
  get nzAllowEmpty() {
    return this._allowEmpty;
  }
  set nzDisabledHours(value) {
    this._disabledHours = value;
    if (this._disabledHours) {
      this.buildHours();
    }
  }
  get nzDisabledHours() {
    return this._disabledHours;
  }
  set nzDisabledMinutes(value) {
    if (isNotNil(value)) {
      this._disabledMinutes = value;
      this.buildMinutes();
    }
  }
  get nzDisabledMinutes() {
    return this._disabledMinutes;
  }
  set nzDisabledSeconds(value) {
    if (isNotNil(value)) {
      this._disabledSeconds = value;
      this.buildSeconds();
    }
  }
  get nzDisabledSeconds() {
    return this._disabledSeconds;
  }
  set format(value) {
    if (isNotNil(value)) {
      this._format = value;
      this.enabledColumns = 0;
      const charSet = new Set(value);
      this.hourEnabled = charSet.has("H") || charSet.has("h");
      this.minuteEnabled = charSet.has("m");
      this.secondEnabled = charSet.has("s");
      if (this.hourEnabled) {
        this.enabledColumns++;
      }
      if (this.minuteEnabled) {
        this.enabledColumns++;
      }
      if (this.secondEnabled) {
        this.enabledColumns++;
      }
      if (this.nzUse12Hours) {
        this.build12Hours();
      }
    }
  }
  get format() {
    return this._format;
  }
  set nzHourStep(value) {
    this._nzHourStep = value || 1;
    this.buildHours();
  }
  get nzHourStep() {
    return this._nzHourStep;
  }
  set nzMinuteStep(value) {
    this._nzMinuteStep = value || 1;
    this.buildMinutes();
  }
  get nzMinuteStep() {
    return this._nzMinuteStep;
  }
  set nzSecondStep(value) {
    this._nzSecondStep = value || 1;
    this.buildSeconds();
  }
  get nzSecondStep() {
    return this._nzSecondStep;
  }
  buildHours() {
    var _a;
    let hourRanges = 24;
    let disabledHours = (_a = this.nzDisabledHours) == null ? void 0 : _a.call(this);
    let startIndex = 0;
    if (this.nzUse12Hours) {
      hourRanges = 12;
      if (disabledHours) {
        if (this.time.selected12Hours === "PM") {
          disabledHours = disabledHours.filter((i) => i >= 12).map((i) => i > 12 ? i - 12 : i);
        } else {
          disabledHours = disabledHours.filter((i) => i < 12 || i === 24).map((i) => i === 24 || i === 0 ? 12 : i);
        }
      }
      startIndex = 1;
    }
    this.hourRange = makeRange(hourRanges, this.nzHourStep, startIndex).map((r) => ({
      index: r,
      disabled: !!disabledHours && disabledHours.indexOf(r) !== -1
    }));
    if (this.nzUse12Hours && this.hourRange[this.hourRange.length - 1].index === 12) {
      const temp = [...this.hourRange];
      temp.unshift(temp[temp.length - 1]);
      temp.splice(temp.length - 1, 1);
      this.hourRange = temp;
    }
  }
  buildMinutes() {
    this.minuteRange = makeRange(60, this.nzMinuteStep).map((r) => ({
      index: r,
      disabled: !!this.nzDisabledMinutes && this.nzDisabledMinutes(this.time.hours).indexOf(r) !== -1
    }));
  }
  buildSeconds() {
    this.secondRange = makeRange(60, this.nzSecondStep).map((r) => ({
      index: r,
      disabled: !!this.nzDisabledSeconds && this.nzDisabledSeconds(this.time.hours, this.time.minutes).indexOf(r) !== -1
    }));
  }
  build12Hours() {
    const isUpperFormat = this._format.includes("A");
    this.use12HoursRange = [{
      index: 0,
      value: isUpperFormat ? "AM" : "am"
    }, {
      index: 1,
      value: isUpperFormat ? "PM" : "pm"
    }];
  }
  buildTimes() {
    this.buildHours();
    this.buildMinutes();
    this.buildSeconds();
    this.build12Hours();
  }
  scrollToTime(delay2 = 0) {
    if (this.hourEnabled && this.hourListElement) {
      this.scrollToSelected(this.hourListElement.nativeElement, this.time.viewHours, delay2, "hour");
    }
    if (this.minuteEnabled && this.minuteListElement) {
      this.scrollToSelected(this.minuteListElement.nativeElement, this.time.minutes, delay2, "minute");
    }
    if (this.secondEnabled && this.secondListElement) {
      this.scrollToSelected(this.secondListElement.nativeElement, this.time.seconds, delay2, "second");
    }
    if (this.nzUse12Hours && this.use12HoursListElement) {
      const selectedHours = this.time.selected12Hours;
      const index = selectedHours === "AM" ? 0 : 1;
      this.scrollToSelected(this.use12HoursListElement.nativeElement, index, delay2, "12-hour");
    }
  }
  selectHour(hour) {
    this.time.setHours(hour.index, hour.disabled);
    if (this._disabledMinutes) {
      this.buildMinutes();
    }
    if (this._disabledSeconds || this._disabledMinutes) {
      this.buildSeconds();
    }
  }
  selectMinute(minute) {
    this.time.setMinutes(minute.index, minute.disabled);
    if (this._disabledSeconds) {
      this.buildSeconds();
    }
  }
  selectSecond(second) {
    this.time.setSeconds(second.index, second.disabled);
  }
  select12Hours(value) {
    this.time.setSelected12Hours(value.value);
    if (this._disabledHours) {
      this.buildHours();
    }
    if (this._disabledMinutes) {
      this.buildMinutes();
    }
    if (this._disabledSeconds) {
      this.buildSeconds();
    }
  }
  scrollToSelected(instance, index, duration = 0, unit) {
    if (!instance) {
      return;
    }
    const transIndex = this.translateIndex(index, unit);
    const currentOption = instance.children[transIndex] || instance.children[0];
    this.scrollTo(instance, currentOption.offsetTop, duration);
  }
  translateIndex(index, unit) {
    var _a, _b, _c;
    if (unit === "hour") {
      return this.calcIndex((_a = this.nzDisabledHours) == null ? void 0 : _a.call(this), this.hourRange.map((item) => item.index).indexOf(index));
    } else if (unit === "minute") {
      return this.calcIndex((_b = this.nzDisabledMinutes) == null ? void 0 : _b.call(this, this.time.hours), this.minuteRange.map((item) => item.index).indexOf(index));
    } else if (unit === "second") {
      return this.calcIndex((_c = this.nzDisabledSeconds) == null ? void 0 : _c.call(this, this.time.hours, this.time.minutes), this.secondRange.map((item) => item.index).indexOf(index));
    } else {
      return this.calcIndex([], this.use12HoursRange.map((item) => item.index).indexOf(index));
    }
  }
  scrollTo(element, to, duration) {
    if (duration <= 0) {
      element.scrollTop = to;
      return;
    }
    const difference = to - element.scrollTop;
    const perTick = difference / duration * 10;
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) {
          return;
        }
        this.scrollTo(element, to, duration - 10);
      });
    });
  }
  calcIndex(array, index) {
    if ((array == null ? void 0 : array.length) && this.nzHideDisabledOptions) {
      return index - array.reduce((pre, value) => pre + (value < index ? 1 : 0), 0);
    } else {
      return index;
    }
  }
  changed() {
    if (this.onChange) {
      this.onChange(this.time.value);
    }
  }
  touched() {
    if (this.onTouch) {
      this.onTouch();
    }
  }
  timeDisabled(value) {
    var _a, _b, _c, _d, _e, _f;
    const hour = value.getHours();
    const minute = value.getMinutes();
    const second = value.getSeconds();
    return ((_b = (_a = this.nzDisabledHours) == null ? void 0 : _a.call(this).indexOf(hour)) != null ? _b : -1) > -1 || ((_d = (_c = this.nzDisabledMinutes) == null ? void 0 : _c.call(this, hour).indexOf(minute)) != null ? _d : -1) > -1 || ((_f = (_e = this.nzDisabledSeconds) == null ? void 0 : _e.call(this, hour, minute).indexOf(second)) != null ? _f : -1) > -1;
  }
  onClickNow() {
    const now = /* @__PURE__ */ new Date();
    if (this.timeDisabled(now)) {
      return;
    }
    this.time.setValue(now);
    this.changed();
    this.closePanel.emit();
  }
  onClickOk() {
    this.time.setValue(this.time.value, this.nzUse12Hours);
    this.changed();
    this.closePanel.emit();
  }
  isSelectedHour(hour) {
    return hour.index === this.time.viewHours;
  }
  isSelectedMinute(minute) {
    return minute.index === this.time.minutes;
  }
  isSelectedSecond(second) {
    return second.index === this.time.seconds;
  }
  isSelected12Hours(value) {
    return value.value.toUpperCase() === this.time.selected12Hours;
  }
  ngOnInit() {
    this.time.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.changed();
      this.touched();
      this.scrollToTime(120);
    });
    this.buildTimes();
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.scrollToTime();
        this.firstScrolled = true;
      });
    });
    fromEventOutsideAngular(this.elementRef.nativeElement, "mousedown").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      event.preventDefault();
    });
  }
  ngOnChanges(changes) {
    const {
      nzUse12Hours,
      nzDefaultOpenValue
    } = changes;
    if (!(nzUse12Hours == null ? void 0 : nzUse12Hours.previousValue) && (nzUse12Hours == null ? void 0 : nzUse12Hours.currentValue)) {
      this.build12Hours();
      this.enabledColumns++;
    }
    if (nzDefaultOpenValue == null ? void 0 : nzDefaultOpenValue.currentValue) {
      this.time.setDefaultOpenValue(this.nzDefaultOpenValue || /* @__PURE__ */ new Date());
    }
  }
  writeValue(value) {
    this.time.setValue(value, this.nzUse12Hours);
    this.buildTimes();
    if (value && this.firstScrolled) {
      this.scrollToTime(120);
    }
    this.cdr.markForCheck();
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouch = fn;
  }
};
__publicField(_NzTimePickerPanelComponent, "\u0275fac", function NzTimePickerPanelComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTimePickerPanelComponent)();
});
__publicField(_NzTimePickerPanelComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTimePickerPanelComponent,
  selectors: [["nz-time-picker-panel"]],
  viewQuery: function NzTimePickerPanelComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c011, 5)(_c17, 5)(_c27, 5)(_c34, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.hourListElement = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.minuteListElement = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.secondListElement = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.use12HoursListElement = _t.first);
    }
  },
  hostAttrs: [1, "ant-picker-time-panel"],
  hostVars: 12,
  hostBindings: function NzTimePickerPanelComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-picker-time-panel-column-0", ctx.enabledColumns === 0 && !ctx.nzInDatePicker)("ant-picker-time-panel-column-1", ctx.enabledColumns === 1 && !ctx.nzInDatePicker)("ant-picker-time-panel-column-2", ctx.enabledColumns === 2 && !ctx.nzInDatePicker)("ant-picker-time-panel-column-3", ctx.enabledColumns === 3 && !ctx.nzInDatePicker)("ant-picker-time-panel-narrow", ctx.enabledColumns < 3)("ant-picker-time-panel-placement-bottomLeft", !ctx.nzInDatePicker);
    }
  },
  inputs: {
    nzInDatePicker: [2, "nzInDatePicker", "nzInDatePicker", booleanAttribute],
    nzAddOn: "nzAddOn",
    nzHideDisabledOptions: "nzHideDisabledOptions",
    nzClearText: "nzClearText",
    nzNowText: "nzNowText",
    nzOkText: "nzOkText",
    nzPlaceHolder: "nzPlaceHolder",
    nzUse12Hours: [2, "nzUse12Hours", "nzUse12Hours", booleanAttribute],
    nzDefaultOpenValue: "nzDefaultOpenValue",
    nzAllowEmpty: [2, "nzAllowEmpty", "nzAllowEmpty", booleanAttribute],
    nzDisabledHours: "nzDisabledHours",
    nzDisabledMinutes: "nzDisabledMinutes",
    nzDisabledSeconds: "nzDisabledSeconds",
    format: "format",
    nzHourStep: [2, "nzHourStep", "nzHourStep", numberAttribute],
    nzMinuteStep: [2, "nzMinuteStep", "nzMinuteStep", numberAttribute],
    nzSecondStep: [2, "nzSecondStep", "nzSecondStep", numberAttribute]
  },
  outputs: {
    closePanel: "closePanel"
  },
  exportAs: ["nzTimePickerPanel"],
  features: [\u0275\u0275ProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _NzTimePickerPanelComponent),
    multi: true
  }]), \u0275\u0275NgOnChangesFeature],
  decls: 7,
  vars: 6,
  consts: [["hourListElement", ""], ["minuteListElement", ""], ["secondListElement", ""], ["use12HoursListElement", ""], [1, "ant-picker-header"], [1, "ant-picker-content"], [1, "ant-picker-time-panel-column", 2, "position", "relative"], [1, "ant-picker-footer"], [1, "ant-picker-header-view"], [1, "ant-picker-time-panel-cell", 3, "ant-picker-time-panel-cell-selected", "ant-picker-time-panel-cell-disabled"], [1, "ant-picker-time-panel-cell", 3, "click"], [1, "ant-picker-time-panel-cell-inner"], [1, "ant-picker-time-panel-cell", 3, "ant-picker-time-panel-cell-selected"], [1, "ant-picker-footer-extra"], [1, "ant-picker-ranges"], [1, "ant-picker-now"], [3, "click"], [1, "ant-picker-ok"], ["nz-button", "", "type", "button", "nzSize", "small", "nzType", "primary", 3, "click"], [3, "ngTemplateOutlet"]],
  template: function NzTimePickerPanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzTimePickerPanelComponent_Conditional_0_Template, 3, 1, "div", 4);
      \u0275\u0275elementStart(1, "div", 5);
      \u0275\u0275conditionalCreate(2, NzTimePickerPanelComponent_Conditional_2_Template, 4, 0, "ul", 6);
      \u0275\u0275conditionalCreate(3, NzTimePickerPanelComponent_Conditional_3_Template, 4, 0, "ul", 6);
      \u0275\u0275conditionalCreate(4, NzTimePickerPanelComponent_Conditional_4_Template, 4, 0, "ul", 6);
      \u0275\u0275conditionalCreate(5, NzTimePickerPanelComponent_Conditional_5_Template, 4, 0, "ul", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, NzTimePickerPanelComponent_Conditional_6_Template, 11, 7, "div", 7);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.nzInDatePicker ? 0 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.hourEnabled ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.minuteEnabled ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.secondEnabled ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzUse12Hours ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.nzInDatePicker ? 6 : -1);
    }
  },
  dependencies: [NgTemplateOutlet, NzI18nModule, NzButtonModule, NzButtonComponent, NzTransitionPatchDirective, NzWaveDirective, DecimalPipe, NzI18nPipe],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTimePickerPanelComponent = _NzTimePickerPanelComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTimePickerPanelComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "nz-time-picker-panel",
      exportAs: "nzTimePickerPanel",
      template: `
    @if (nzInDatePicker) {
      <div class="ant-picker-header">
        <div class="ant-picker-header-view">{{ dateHelper.format($any(time?.value), format) || '&nbsp;' }}</div>
      </div>
    }
    <div class="ant-picker-content">
      @if (hourEnabled) {
        <ul #hourListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (hour of hourRange; track $index) {
            @if (!(nzHideDisabledOptions && hour.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectHour(hour)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedHour(hour)"
                [class.ant-picker-time-panel-cell-disabled]="hour.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ hour.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (minuteEnabled) {
        <ul #minuteListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (minute of minuteRange; track $index) {
            @if (!(nzHideDisabledOptions && minute.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectMinute(minute)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedMinute(minute)"
                [class.ant-picker-time-panel-cell-disabled]="minute.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ minute.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (secondEnabled) {
        <ul #secondListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (second of secondRange; track $index) {
            @if (!(nzHideDisabledOptions && second.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectSecond(second)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedSecond(second)"
                [class.ant-picker-time-panel-cell-disabled]="second.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ second.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (nzUse12Hours) {
        <ul #use12HoursListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (range of use12HoursRange; track range) {
            <li
              (click)="select12Hours(range)"
              class="ant-picker-time-panel-cell"
              [class.ant-picker-time-panel-cell-selected]="isSelected12Hours(range)"
            >
              <div class="ant-picker-time-panel-cell-inner">{{ range.value }}</div>
            </li>
          }
        </ul>
      }
    </div>
    @if (!nzInDatePicker) {
      <div class="ant-picker-footer">
        @if (nzAddOn) {
          <div class="ant-picker-footer-extra">
            <ng-template [ngTemplateOutlet]="nzAddOn" />
          </div>
        }
        <ul class="ant-picker-ranges">
          <li class="ant-picker-now">
            <a (click)="onClickNow()">
              {{ nzNowText || ('Calendar.lang.now' | nzI18n) }}
            </a>
          </li>
          <li class="ant-picker-ok">
            <button nz-button type="button" nzSize="small" nzType="primary" (click)="onClickOk()">
              {{ nzOkText || ('Calendar.lang.ok' | nzI18n) }}
            </button>
          </li>
        </ul>
      </div>
    }
  `,
      host: {
        class: "ant-picker-time-panel",
        "[class.ant-picker-time-panel-column-0]": `enabledColumns === 0 && !nzInDatePicker`,
        "[class.ant-picker-time-panel-column-1]": `enabledColumns === 1 && !nzInDatePicker`,
        "[class.ant-picker-time-panel-column-2]": `enabledColumns === 2 && !nzInDatePicker`,
        "[class.ant-picker-time-panel-column-3]": `enabledColumns === 3 && !nzInDatePicker`,
        "[class.ant-picker-time-panel-narrow]": `enabledColumns < 3`,
        "[class.ant-picker-time-panel-placement-bottomLeft]": `!nzInDatePicker`
      },
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzTimePickerPanelComponent),
        multi: true
      }],
      imports: [DecimalPipe, NgTemplateOutlet, NzI18nModule, NzButtonModule]
    }]
  }], null, {
    hourListElement: [{
      type: ViewChild,
      args: ["hourListElement", {
        static: false
      }]
    }],
    minuteListElement: [{
      type: ViewChild,
      args: ["minuteListElement", {
        static: false
      }]
    }],
    secondListElement: [{
      type: ViewChild,
      args: ["secondListElement", {
        static: false
      }]
    }],
    use12HoursListElement: [{
      type: ViewChild,
      args: ["use12HoursListElement", {
        static: false
      }]
    }],
    nzInDatePicker: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAddOn: [{
      type: Input
    }],
    nzHideDisabledOptions: [{
      type: Input
    }],
    nzClearText: [{
      type: Input
    }],
    nzNowText: [{
      type: Input
    }],
    nzOkText: [{
      type: Input
    }],
    nzPlaceHolder: [{
      type: Input
    }],
    nzUse12Hours: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDefaultOpenValue: [{
      type: Input
    }],
    closePanel: [{
      type: Output
    }],
    nzAllowEmpty: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDisabledHours: [{
      type: Input
    }],
    nzDisabledMinutes: [{
      type: Input
    }],
    nzDisabledSeconds: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    nzHourStep: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzMinuteStep: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzSecondStep: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME6 = "timePicker";
var NzTimePickerComponent = (() => {
  var _a;
  let _nzVariant_decorators;
  let _nzVariant_initializers = [];
  let _nzVariant_extraInitializers = [];
  let _nzHourStep_decorators;
  let _nzHourStep_initializers = [];
  let _nzHourStep_extraInitializers = [];
  let _nzMinuteStep_decorators;
  let _nzMinuteStep_initializers = [];
  let _nzMinuteStep_extraInitializers = [];
  let _nzSecondStep_decorators;
  let _nzSecondStep_initializers = [];
  let _nzSecondStep_extraInitializers = [];
  let _nzClearText_decorators;
  let _nzClearText_initializers = [];
  let _nzClearText_extraInitializers = [];
  let _nzNowText_decorators;
  let _nzNowText_initializers = [];
  let _nzNowText_extraInitializers = [];
  let _nzOkText_decorators;
  let _nzOkText_initializers = [];
  let _nzOkText_extraInitializers = [];
  let _nzPopupClassName_decorators;
  let _nzPopupClassName_initializers = [];
  let _nzPopupClassName_extraInitializers = [];
  let _nzFormat_decorators;
  let _nzFormat_initializers = [];
  let _nzFormat_extraInitializers = [];
  let _nzUse12Hours_decorators;
  let _nzUse12Hours_initializers = [];
  let _nzUse12Hours_extraInitializers = [];
  let _nzSuffixIcon_decorators;
  let _nzSuffixIcon_initializers = [];
  let _nzSuffixIcon_extraInitializers = [];
  let _nzAllowEmpty_decorators;
  let _nzAllowEmpty_initializers = [];
  let _nzAllowEmpty_extraInitializers = [];
  let _nzBackdrop_decorators;
  let _nzBackdrop_initializers = [];
  let _nzBackdrop_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME6);
      __publicField(this, "nzConfigService", inject(NzConfigService));
      __publicField(this, "i18n", inject(NzI18nService));
      __publicField(this, "elementRef", inject(ElementRef));
      __publicField(this, "renderer", inject(Renderer2));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "dateHelper", inject(DateHelperService));
      __publicField(this, "platform", inject(Platform));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "dir", inject(Directionality).valueSignal);
      __publicField(this, "_onChange");
      __publicField(this, "_onTouched");
      __publicField(this, "isNzDisableFirstChange", true);
      __publicField(this, "isInit", false);
      __publicField(this, "focused", false);
      __publicField(this, "inputValue", "");
      __publicField(this, "value", null);
      __publicField(this, "preValue", null);
      __publicField(this, "inputSize");
      __publicField(this, "i18nPlaceHolder$", of(void 0));
      // status
      __publicField(this, "prefixCls", "ant-picker");
      __publicField(this, "statusCls", {});
      __publicField(this, "status", "");
      __publicField(this, "hasFeedback", false);
      __publicField(this, "inputRef");
      __publicField(this, "nzId", null);
      __publicField(this, "nzSize", "default");
      __publicField(this, "nzStatus", "");
      __publicField(this, "nzVariant", __runInitializers(this, _nzVariant_initializers, void 0));
      __publicField(this, "nzHourStep", (__runInitializers(this, _nzVariant_extraInitializers), __runInitializers(this, _nzHourStep_initializers, 1)));
      __publicField(this, "nzMinuteStep", (__runInitializers(this, _nzHourStep_extraInitializers), __runInitializers(this, _nzMinuteStep_initializers, 1)));
      __publicField(this, "nzSecondStep", (__runInitializers(this, _nzMinuteStep_extraInitializers), __runInitializers(this, _nzSecondStep_initializers, 1)));
      __publicField(this, "nzClearText", (__runInitializers(this, _nzSecondStep_extraInitializers), __runInitializers(this, _nzClearText_initializers, "clear")));
      __publicField(this, "nzNowText", (__runInitializers(this, _nzClearText_extraInitializers), __runInitializers(this, _nzNowText_initializers, "")));
      __publicField(this, "nzOkText", (__runInitializers(this, _nzNowText_extraInitializers), __runInitializers(this, _nzOkText_initializers, "")));
      __publicField(this, "nzPopupClassName", (__runInitializers(this, _nzOkText_extraInitializers), __runInitializers(this, _nzPopupClassName_initializers, "")));
      __publicField(this, "nzPlaceHolder", (__runInitializers(this, _nzPopupClassName_extraInitializers), ""));
      __publicField(this, "nzAddOn");
      __publicField(this, "nzDefaultOpenValue");
      __publicField(this, "nzDisabledHours");
      __publicField(this, "nzDisabledMinutes");
      __publicField(this, "nzDisabledSeconds");
      __publicField(this, "nzFormat", __runInitializers(this, _nzFormat_initializers, "HH:mm:ss"));
      __publicField(this, "nzOpen", (__runInitializers(this, _nzFormat_extraInitializers), false));
      __publicField(this, "nzUse12Hours", __runInitializers(this, _nzUse12Hours_initializers, false));
      __publicField(this, "nzSuffixIcon", (__runInitializers(this, _nzUse12Hours_extraInitializers), __runInitializers(this, _nzSuffixIcon_initializers, "clock-circle")));
      __publicField(this, "nzOpenChange", (__runInitializers(this, _nzSuffixIcon_extraInitializers), new EventEmitter()));
      __publicField(this, "nzHideDisabledOptions", false);
      __publicField(this, "nzAllowEmpty", __runInitializers(this, _nzAllowEmpty_initializers, true));
      __publicField(this, "nzDisabled", (__runInitializers(this, _nzAllowEmpty_extraInitializers), false));
      __publicField(this, "nzAutoFocus", false);
      __publicField(this, "nzBackdrop", __runInitializers(this, _nzBackdrop_initializers, false));
      __publicField(this, "nzInputReadOnly", (__runInitializers(this, _nzBackdrop_extraInitializers), false));
      __publicField(this, "formSize", inject(NZ_FORM_SIZE, {
        optional: true
      }));
      __publicField(this, "formVariant", inject(NZ_FORM_VARIANT, {
        optional: true
      }));
      __publicField(this, "hasConfirmed", false);
      __publicField(this, "nzPrefix", input(...ngDevMode ? [void 0, {
        debugName: "nzPrefix"
      }] : []));
      __publicField(this, "nzNeedConfirm", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
        debugName: "nzNeedConfirm"
      } : {}), {
        transform: booleanAttribute
      })));
      __publicField(this, "nzPlacement", input("bottomLeft", ...ngDevMode ? [{
        debugName: "nzPlacement"
      }] : []));
      __publicField(this, "currentPosition", linkedSignal(() => DATE_PICKER_POSITION_MAP[this.nzPlacement()], ...ngDevMode ? [{
        debugName: "currentPosition"
      }] : []));
      __publicField(this, "overlayPositions", computed(() => [this.currentPosition(), ...DEFAULT_DATE_PICKER_POSITIONS], ...ngDevMode ? [{
        debugName: "overlayPositions"
      }] : []));
      __publicField(this, "timepickerAnimationEnter", slideAnimationEnter());
      __publicField(this, "timepickerAnimationLeave", slideAnimationLeave());
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
        return this.variant() || ((_a2 = this.formVariant) == null ? void 0 : _a2.call(this)) || "outlined";
      }, ...ngDevMode ? [{
        debugName: "finalVariant"
      }] : []));
      __publicField(this, "dropdownTimePickerClass", computed(() => {
        const classList = [this.generateClass("dropdown")];
        const {
          originX,
          originY
        } = this.currentPosition();
        const dir = this.dir();
        if (originX === "start" && originY === "bottom") {
          classList.push(this.generateClass("dropdown-placement-bottomLeft"));
        } else if (originX === "start" && originY === "top") {
          classList.push(this.generateClass("dropdown-placement-topLeft"));
        } else if (originX === "end" && originY === "bottom") {
          classList.push(this.generateClass("dropdown-placement-bottomRight"));
        } else if (originX === "end" && originY === "top") {
          classList.push(this.generateClass("dropdown-placement-topRight"));
        }
        if (dir === "rtl") {
          classList.push(this.generateClass("dropdown-rtl"));
        }
        return classList;
      }, ...ngDevMode ? [{
        debugName: "dropdownTimePickerClass"
      }] : []));
      __publicField(this, "size", signal(this.nzSize, ...ngDevMode ? [{
        debugName: "size"
      }] : []));
      __publicField(this, "variant", signal(this.nzVariant, ...ngDevMode ? [{
        debugName: "variant"
      }] : []));
      __publicField(this, "compactSize", inject(NZ_SPACE_COMPACT_SIZE, {
        optional: true
      }));
      __publicField(this, "nzFormStatusService", inject(NzFormStatusService, {
        optional: true
      }));
      __publicField(this, "nzFormNoStatusService", inject(NzFormNoStatusService, {
        optional: true
      }));
    }
    get origin() {
      return this.elementRef;
    }
    emitValue(value) {
      this.setValue(value, true);
      if (this._onChange) {
        this._onChange(this.value);
      }
      if (this._onTouched) {
        this._onTouched();
      }
    }
    setValue(value, syncPreValue = false) {
      if (syncPreValue) {
        this.preValue = isValid(value) ? new Date(value) : null;
      }
      this.value = isValid(value) ? new Date(value) : null;
      this.inputValue = this.dateHelper.format(value, this.nzFormat);
      this.cdr.markForCheck();
    }
    open() {
      if (this.nzDisabled || this.nzOpen) {
        return;
      }
      this.focus();
      this.nzOpen = true;
      this.nzOpenChange.emit(this.nzOpen);
    }
    close() {
      this.nzOpen = false;
      this.cdr.markForCheck();
      this.nzOpenChange.emit(this.nzOpen);
    }
    updateAutoFocus() {
      if (this.isInit && !this.nzDisabled) {
        if (this.nzAutoFocus) {
          this.renderer.setAttribute(this.inputRef.nativeElement, "autofocus", "autofocus");
        } else {
          this.renderer.removeAttribute(this.inputRef.nativeElement, "autofocus");
        }
      }
    }
    onClickClearBtn(event) {
      event.stopPropagation();
      this.emitValue(null);
    }
    onClickOutside(event) {
      const target = _getEventTarget(event);
      if (!this.elementRef.nativeElement.contains(target)) {
        this.setCurrentValueAndClose();
      }
    }
    onFocus(value) {
      this.focused = value;
      if (!value) {
        if (this.checkTimeValid(this.value)) {
          this.setCurrentValueAndClose();
        } else {
          this.setValue(this.preValue);
          this.close();
        }
      }
    }
    focus() {
      if (this.inputRef.nativeElement) {
        this.inputRef.nativeElement.focus();
      }
    }
    blur() {
      if (this.inputRef.nativeElement) {
        this.inputRef.nativeElement.blur();
      }
    }
    onKeyupEsc() {
      this.setValue(this.preValue);
    }
    onKeyupEnter() {
      if (this.nzOpen && isValid(this.value)) {
        this.setCurrentValueAndClose();
      } else if (!this.nzOpen) {
        this.open();
      }
    }
    onInputChange(str) {
      if (!this.platform.TRIDENT && document.activeElement === this.inputRef.nativeElement) {
        this.open();
        this.parseTimeString(str);
      }
    }
    onPanelValueChange(value) {
      this.setValue(value);
      this.focus();
    }
    closePanel() {
      this.hasConfirmed = true;
      this.inputRef.nativeElement.blur();
    }
    setCurrentValueAndClose() {
      if (this.hasConfirmed || !this.nzNeedConfirm()) {
        this.emitValue(this.value);
        this.hasConfirmed = false;
      } else {
        this.setValue(this.preValue);
      }
      this.close();
    }
    onPositionChange(position) {
      this.currentPosition.set(position.connectionPair);
    }
    ngOnInit() {
      var _a2;
      (_a2 = this.nzFormStatusService) == null ? void 0 : _a2.formStatusChanges.pipe(distinctUntilChanged((pre, cur) => pre.status === cur.status && pre.hasFeedback === cur.hasFeedback), withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : of(false)), map(([{
        status,
        hasFeedback
      }, noStatus]) => ({
        status: noStatus ? "" : status,
        hasFeedback
      })), takeUntilDestroyed(this.destroyRef)).subscribe(({
        status,
        hasFeedback
      }) => {
        this.setStatusStyles(status, hasFeedback);
      });
      this.inputSize = Math.max(8, this.nzFormat.length) + 2;
      this.i18nPlaceHolder$ = this.i18n.localeChange.pipe(map((nzLocale) => nzLocale.TimePicker.placeholder));
    }
    ngOnChanges({
      nzUse12Hours,
      nzFormat,
      nzDisabled,
      nzAutoFocus,
      nzStatus,
      nzSize,
      nzVariant
    }) {
      if (nzUse12Hours && !nzUse12Hours.previousValue && nzUse12Hours.currentValue && !nzFormat) {
        this.nzFormat = "h:mm:ss a";
      }
      if (nzDisabled) {
        const value = nzDisabled.currentValue;
        const input2 = this.inputRef.nativeElement;
        if (value) {
          this.renderer.setAttribute(input2, "disabled", "");
        } else {
          this.renderer.removeAttribute(input2, "disabled");
        }
      }
      if (nzAutoFocus) {
        this.updateAutoFocus();
      }
      if (nzStatus) {
        this.setStatusStyles(this.nzStatus, this.hasFeedback);
      }
      if (nzSize) {
        this.size.set(nzSize.currentValue);
      }
      if (nzVariant) {
        this.variant.set(nzVariant.currentValue);
      }
    }
    parseTimeString(str) {
      const value = this.dateHelper.parseTime(str, this.nzFormat) || null;
      if (isValid(value)) {
        this.value = value;
        this.cdr.markForCheck();
      }
    }
    ngAfterViewInit() {
      this.isInit = true;
      this.updateAutoFocus();
    }
    writeValue(time) {
      let result;
      if (time instanceof Date) {
        result = time;
      } else if (isNil(time)) {
        result = null;
      } else {
        warn('Non-Date type is not recommended for time-picker, use "Date" type.');
        result = new Date(time);
      }
      this.setValue(result, true);
    }
    registerOnChange(fn) {
      this._onChange = fn;
    }
    registerOnTouched(fn) {
      this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
      this.nzDisabled = this.isNzDisableFirstChange && this.nzDisabled || isDisabled;
      this.isNzDisableFirstChange = false;
      this.cdr.markForCheck();
    }
    checkTimeValid(value) {
      var _a2, _b, _c;
      if (!value) {
        return true;
      }
      const disabledHours = (_a2 = this.nzDisabledHours) == null ? void 0 : _a2.call(this);
      const disabledMinutes = (_b = this.nzDisabledMinutes) == null ? void 0 : _b.call(this, value.getHours());
      const disabledSeconds = (_c = this.nzDisabledSeconds) == null ? void 0 : _c.call(this, value.getHours(), value.getMinutes());
      return !((disabledHours == null ? void 0 : disabledHours.includes(value.getHours())) || (disabledMinutes == null ? void 0 : disabledMinutes.includes(value.getMinutes())) || (disabledSeconds == null ? void 0 : disabledSeconds.includes(value.getSeconds())));
    }
    setStatusStyles(status, hasFeedback) {
      this.status = status;
      this.hasFeedback = hasFeedback;
      this.cdr.markForCheck();
      this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
      Object.keys(this.statusCls).forEach((status2) => {
        if (this.statusCls[status2]) {
          this.renderer.addClass(this.elementRef.nativeElement, status2);
        } else {
          this.renderer.removeClass(this.elementRef.nativeElement, status2);
        }
      });
    }
    generateClass(suffix) {
      return generateClassName(this.prefixCls, suffix);
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzVariant_decorators = [WithConfig()];
    _nzHourStep_decorators = [WithConfig()];
    _nzMinuteStep_decorators = [WithConfig()];
    _nzSecondStep_decorators = [WithConfig()];
    _nzClearText_decorators = [WithConfig()];
    _nzNowText_decorators = [WithConfig()];
    _nzOkText_decorators = [WithConfig()];
    _nzPopupClassName_decorators = [WithConfig()];
    _nzFormat_decorators = [WithConfig()];
    _nzUse12Hours_decorators = [WithConfig()];
    _nzSuffixIcon_decorators = [WithConfig()];
    _nzAllowEmpty_decorators = [WithConfig()];
    _nzBackdrop_decorators = [WithConfig()];
    __esDecorate(null, null, _nzVariant_decorators, {
      kind: "field",
      name: "nzVariant",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzVariant" in obj,
        get: (obj) => obj.nzVariant,
        set: (obj, value) => {
          obj.nzVariant = value;
        }
      },
      metadata: _metadata
    }, _nzVariant_initializers, _nzVariant_extraInitializers);
    __esDecorate(null, null, _nzHourStep_decorators, {
      kind: "field",
      name: "nzHourStep",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzHourStep" in obj,
        get: (obj) => obj.nzHourStep,
        set: (obj, value) => {
          obj.nzHourStep = value;
        }
      },
      metadata: _metadata
    }, _nzHourStep_initializers, _nzHourStep_extraInitializers);
    __esDecorate(null, null, _nzMinuteStep_decorators, {
      kind: "field",
      name: "nzMinuteStep",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzMinuteStep" in obj,
        get: (obj) => obj.nzMinuteStep,
        set: (obj, value) => {
          obj.nzMinuteStep = value;
        }
      },
      metadata: _metadata
    }, _nzMinuteStep_initializers, _nzMinuteStep_extraInitializers);
    __esDecorate(null, null, _nzSecondStep_decorators, {
      kind: "field",
      name: "nzSecondStep",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSecondStep" in obj,
        get: (obj) => obj.nzSecondStep,
        set: (obj, value) => {
          obj.nzSecondStep = value;
        }
      },
      metadata: _metadata
    }, _nzSecondStep_initializers, _nzSecondStep_extraInitializers);
    __esDecorate(null, null, _nzClearText_decorators, {
      kind: "field",
      name: "nzClearText",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzClearText" in obj,
        get: (obj) => obj.nzClearText,
        set: (obj, value) => {
          obj.nzClearText = value;
        }
      },
      metadata: _metadata
    }, _nzClearText_initializers, _nzClearText_extraInitializers);
    __esDecorate(null, null, _nzNowText_decorators, {
      kind: "field",
      name: "nzNowText",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzNowText" in obj,
        get: (obj) => obj.nzNowText,
        set: (obj, value) => {
          obj.nzNowText = value;
        }
      },
      metadata: _metadata
    }, _nzNowText_initializers, _nzNowText_extraInitializers);
    __esDecorate(null, null, _nzOkText_decorators, {
      kind: "field",
      name: "nzOkText",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzOkText" in obj,
        get: (obj) => obj.nzOkText,
        set: (obj, value) => {
          obj.nzOkText = value;
        }
      },
      metadata: _metadata
    }, _nzOkText_initializers, _nzOkText_extraInitializers);
    __esDecorate(null, null, _nzPopupClassName_decorators, {
      kind: "field",
      name: "nzPopupClassName",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzPopupClassName" in obj,
        get: (obj) => obj.nzPopupClassName,
        set: (obj, value) => {
          obj.nzPopupClassName = value;
        }
      },
      metadata: _metadata
    }, _nzPopupClassName_initializers, _nzPopupClassName_extraInitializers);
    __esDecorate(null, null, _nzFormat_decorators, {
      kind: "field",
      name: "nzFormat",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzFormat" in obj,
        get: (obj) => obj.nzFormat,
        set: (obj, value) => {
          obj.nzFormat = value;
        }
      },
      metadata: _metadata
    }, _nzFormat_initializers, _nzFormat_extraInitializers);
    __esDecorate(null, null, _nzUse12Hours_decorators, {
      kind: "field",
      name: "nzUse12Hours",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzUse12Hours" in obj,
        get: (obj) => obj.nzUse12Hours,
        set: (obj, value) => {
          obj.nzUse12Hours = value;
        }
      },
      metadata: _metadata
    }, _nzUse12Hours_initializers, _nzUse12Hours_extraInitializers);
    __esDecorate(null, null, _nzSuffixIcon_decorators, {
      kind: "field",
      name: "nzSuffixIcon",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSuffixIcon" in obj,
        get: (obj) => obj.nzSuffixIcon,
        set: (obj, value) => {
          obj.nzSuffixIcon = value;
        }
      },
      metadata: _metadata
    }, _nzSuffixIcon_initializers, _nzSuffixIcon_extraInitializers);
    __esDecorate(null, null, _nzAllowEmpty_decorators, {
      kind: "field",
      name: "nzAllowEmpty",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzAllowEmpty" in obj,
        get: (obj) => obj.nzAllowEmpty,
        set: (obj, value) => {
          obj.nzAllowEmpty = value;
        }
      },
      metadata: _metadata
    }, _nzAllowEmpty_initializers, _nzAllowEmpty_extraInitializers);
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
  })(), __publicField(_a, "\u0275fac", function NzTimePickerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-time-picker"]],
    viewQuery: function NzTimePickerComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c44, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.inputRef = _t.first);
      }
    },
    hostAttrs: [1, "ant-picker"],
    hostVars: 16,
    hostBindings: function NzTimePickerComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function NzTimePickerComponent_click_HostBindingHandler() {
          return ctx.open();
        });
      }
      if (rf & 2) {
        \u0275\u0275classProp("ant-picker-large", ctx.finalSize() === "large")("ant-picker-small", ctx.finalSize() === "small")("ant-picker-disabled", ctx.nzDisabled)("ant-picker-focused", ctx.focused)("ant-picker-rtl", ctx.dir() === "rtl")("ant-picker-borderless", ctx.finalVariant() === "borderless")("ant-picker-filled", ctx.finalVariant() === "filled")("ant-picker-underlined", ctx.finalVariant() === "underlined");
      }
    },
    inputs: {
      nzId: "nzId",
      nzSize: "nzSize",
      nzStatus: "nzStatus",
      nzVariant: "nzVariant",
      nzHourStep: "nzHourStep",
      nzMinuteStep: "nzMinuteStep",
      nzSecondStep: "nzSecondStep",
      nzClearText: "nzClearText",
      nzNowText: "nzNowText",
      nzOkText: "nzOkText",
      nzPopupClassName: "nzPopupClassName",
      nzPlaceHolder: "nzPlaceHolder",
      nzAddOn: "nzAddOn",
      nzDefaultOpenValue: "nzDefaultOpenValue",
      nzDisabledHours: "nzDisabledHours",
      nzDisabledMinutes: "nzDisabledMinutes",
      nzDisabledSeconds: "nzDisabledSeconds",
      nzFormat: "nzFormat",
      nzOpen: "nzOpen",
      nzUse12Hours: [2, "nzUse12Hours", "nzUse12Hours", booleanAttribute],
      nzSuffixIcon: "nzSuffixIcon",
      nzHideDisabledOptions: [2, "nzHideDisabledOptions", "nzHideDisabledOptions", booleanAttribute],
      nzAllowEmpty: [2, "nzAllowEmpty", "nzAllowEmpty", booleanAttribute],
      nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
      nzAutoFocus: [2, "nzAutoFocus", "nzAutoFocus", booleanAttribute],
      nzBackdrop: "nzBackdrop",
      nzInputReadOnly: [2, "nzInputReadOnly", "nzInputReadOnly", booleanAttribute],
      nzPrefix: [1, "nzPrefix"],
      nzNeedConfirm: [1, "nzNeedConfirm"],
      nzPlacement: [1, "nzPlacement"]
    },
    outputs: {
      nzOpenChange: "nzOpenChange"
    },
    exportAs: ["nzTimePicker"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _a),
      multi: true
    }, {
      provide: NZ_SPACE_COMPACT_ITEM_TYPE,
      useValue: "picker"
    }]), \u0275\u0275HostDirectivesFeature([NzSpaceCompactItemDirective]), \u0275\u0275NgOnChangesFeature],
    decls: 10,
    vars: 16,
    consts: [["inputElement", ""], [1, "ant-picker-prefix"], [1, "ant-picker-input"], ["type", "text", "autocomplete", "off", 3, "ngModelChange", "focus", "blur", "keyup.enter", "keyup.escape", "size", "placeholder", "ngModel", "disabled", "readOnly"], [1, "ant-picker-suffix"], [4, "nzStringTemplateOutlet"], [3, "status"], [1, "ant-picker-clear"], ["cdkConnectedOverlay", "", "nzConnectedOverlay", "", "cdkConnectedOverlayTransformOriginOn", ".ant-picker-dropdown", 3, "detach", "overlayOutsideClick", "positionChange", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayPositions", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen"], [3, "nzType"], [1, "ant-picker-clear", 3, "click"], ["nzType", "close-circle", "nzTheme", "fill"], [2, "position", "relative"], [1, "ant-picker-panel-container"], ["tabindex", "-1", 1, "ant-picker-panel"], [3, "ngModelChange", "closePanel", "format", "nzHourStep", "nzMinuteStep", "nzSecondStep", "nzDisabledHours", "nzDisabledMinutes", "nzDisabledSeconds", "nzPlaceHolder", "nzHideDisabledOptions", "nzUse12Hours", "nzDefaultOpenValue", "nzAddOn", "nzClearText", "nzNowText", "nzOkText", "nzAllowEmpty", "ngModel"]],
    template: function NzTimePickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275conditionalCreate(0, NzTimePickerComponent_Conditional_0_Template, 2, 1, "span", 1);
        \u0275\u0275elementStart(1, "div", 2)(2, "input", 3, 0);
        \u0275\u0275pipe(4, "async");
        \u0275\u0275twoWayListener("ngModelChange", function NzTimePickerComponent_Template_input_ngModelChange_2_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.inputValue, $event) || (ctx.inputValue = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("focus", function NzTimePickerComponent_Template_input_focus_2_listener() {
          return ctx.onFocus(true);
        })("blur", function NzTimePickerComponent_Template_input_blur_2_listener() {
          return ctx.onFocus(false);
        })("keyup.enter", function NzTimePickerComponent_Template_input_keyup_enter_2_listener() {
          return ctx.onKeyupEnter();
        })("keyup.escape", function NzTimePickerComponent_Template_input_keyup_escape_2_listener() {
          return ctx.onKeyupEsc();
        })("ngModelChange", function NzTimePickerComponent_Template_input_ngModelChange_2_listener($event) {
          return ctx.onInputChange($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "span", 4);
        \u0275\u0275template(6, NzTimePickerComponent_ng_container_6_Template, 2, 1, "ng-container", 5);
        \u0275\u0275conditionalCreate(7, NzTimePickerComponent_Conditional_7_Template, 1, 1, "nz-form-item-feedback-icon", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(8, NzTimePickerComponent_Conditional_8_Template, 2, 2, "span", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, NzTimePickerComponent_ng_template_9_Template, 5, 23, "ng-template", 8);
        \u0275\u0275listener("detach", function NzTimePickerComponent_Template_ng_template_detach_9_listener() {
          return ctx.close();
        })("overlayOutsideClick", function NzTimePickerComponent_Template_ng_template_overlayOutsideClick_9_listener($event) {
          return ctx.onClickOutside($event);
        })("positionChange", function NzTimePickerComponent_Template_ng_template_positionChange_9_listener($event) {
          return ctx.onPositionChange($event);
        });
      }
      if (rf & 2) {
        let tmp_1_0;
        \u0275\u0275conditional((tmp_1_0 = ctx.nzPrefix()) ? 0 : -1, tmp_1_0);
        \u0275\u0275advance(2);
        \u0275\u0275property("size", ctx.inputSize)("placeholder", ctx.nzPlaceHolder || \u0275\u0275pipeBind1(4, 14, ctx.i18nPlaceHolder$));
        \u0275\u0275twoWayProperty("ngModel", ctx.inputValue);
        \u0275\u0275property("disabled", ctx.nzDisabled)("readOnly", ctx.nzInputReadOnly);
        \u0275\u0275attribute("id", ctx.nzId);
        \u0275\u0275advance(4);
        \u0275\u0275property("nzStringTemplateOutlet", ctx.nzSuffixIcon);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.hasFeedback && !!ctx.status ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.nzAllowEmpty && !ctx.nzDisabled && ctx.value ? 8 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("cdkConnectedOverlayHasBackdrop", ctx.nzBackdrop)("cdkConnectedOverlayPositions", ctx.overlayPositions())("cdkConnectedOverlayOrigin", ctx.origin)("cdkConnectedOverlayOpen", ctx.nzOpen);
      }
    },
    dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, NzOutletModule, NzStringTemplateOutletDirective, NzIconModule, NzIconDirective, NzFormItemFeedbackIconComponent, NzTimePickerPanelComponent, NzOverlayModule, NzConnectedOverlayDirective, OverlayModule, CdkConnectedOverlay, AsyncPipe],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTimePickerComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "nz-time-picker",
      exportAs: "nzTimePicker",
      template: `
    @if (nzPrefix(); as prefix) {
      <span class="ant-picker-prefix">
        <ng-container *nzStringTemplateOutlet="prefix">{{ prefix }}</ng-container>
      </span>
    }
    <div class="ant-picker-input">
      <input
        #inputElement
        [attr.id]="nzId"
        type="text"
        [size]="inputSize"
        autocomplete="off"
        [placeholder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
        [(ngModel)]="inputValue"
        [disabled]="nzDisabled"
        [readOnly]="nzInputReadOnly"
        (focus)="onFocus(true)"
        (blur)="onFocus(false)"
        (keyup.enter)="onKeyupEnter()"
        (keyup.escape)="onKeyupEsc()"
        (ngModelChange)="onInputChange($event)"
      />
      <span class="ant-picker-suffix">
        <ng-container *nzStringTemplateOutlet="nzSuffixIcon; let suffixIcon">
          <nz-icon [nzType]="suffixIcon" />
        </ng-container>
        @if (hasFeedback && !!status) {
          <nz-form-item-feedback-icon [status]="status" />
        }
      </span>
      @if (nzAllowEmpty && !nzDisabled && value) {
        <span class="ant-picker-clear" (click)="onClickClearBtn($event)">
          <nz-icon nzType="close-circle" nzTheme="fill" [attr.aria-label]="nzClearText" [attr.title]="nzClearText" />
        </span>
      }
    </div>

    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      cdkConnectedOverlayTransformOriginOn=".ant-picker-dropdown"
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayPositions]="overlayPositions()"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="nzOpen"
      (detach)="close()"
      (overlayOutsideClick)="onClickOutside($event)"
      (positionChange)="onPositionChange($event)"
    >
      <div
        [animate.enter]="timepickerAnimationEnter()"
        [animate.leave]="timepickerAnimationLeave()"
        [class]="dropdownTimePickerClass()"
        style="position: relative"
      >
        <div class="ant-picker-panel-container">
          <div tabindex="-1" class="ant-picker-panel">
            <nz-time-picker-panel
              [class]="nzPopupClassName"
              [format]="nzFormat"
              [nzHourStep]="nzHourStep"
              [nzMinuteStep]="nzMinuteStep"
              [nzSecondStep]="nzSecondStep"
              [nzDisabledHours]="nzDisabledHours"
              [nzDisabledMinutes]="nzDisabledMinutes"
              [nzDisabledSeconds]="nzDisabledSeconds"
              [nzPlaceHolder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
              [nzHideDisabledOptions]="nzHideDisabledOptions"
              [nzUse12Hours]="nzUse12Hours"
              [nzDefaultOpenValue]="nzDefaultOpenValue"
              [nzAddOn]="nzAddOn"
              [nzClearText]="nzClearText"
              [nzNowText]="nzNowText"
              [nzOkText]="nzOkText"
              [nzAllowEmpty]="nzAllowEmpty"
              [(ngModel)]="value"
              (ngModelChange)="onPanelValueChange($event)"
              (closePanel)="closePanel()"
            />
          </div>
        </div>
      </div>
    </ng-template>
  `,
      host: {
        class: "ant-picker",
        "[class.ant-picker-large]": `finalSize() === 'large'`,
        "[class.ant-picker-small]": `finalSize() === 'small'`,
        "[class.ant-picker-disabled]": `nzDisabled`,
        "[class.ant-picker-focused]": `focused`,
        "[class.ant-picker-rtl]": `dir() === 'rtl'`,
        "[class.ant-picker-borderless]": `finalVariant() === 'borderless'`,
        "[class.ant-picker-filled]": `finalVariant() === 'filled'`,
        "[class.ant-picker-underlined]": `finalVariant() === 'underlined'`,
        "(click)": "open()"
      },
      hostDirectives: [NzSpaceCompactItemDirective],
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzTimePickerComponent),
        multi: true
      }, {
        provide: NZ_SPACE_COMPACT_ITEM_TYPE,
        useValue: "picker"
      }],
      imports: [AsyncPipe, FormsModule, NzOutletModule, NzIconModule, NzFormItemFeedbackIconComponent, NzTimePickerPanelComponent, NzOverlayModule, OverlayModule]
    }]
  }], null, {
    inputRef: [{
      type: ViewChild,
      args: ["inputElement", {
        static: true
      }]
    }],
    nzId: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzStatus: [{
      type: Input
    }],
    nzVariant: [{
      type: Input
    }],
    nzHourStep: [{
      type: Input
    }],
    nzMinuteStep: [{
      type: Input
    }],
    nzSecondStep: [{
      type: Input
    }],
    nzClearText: [{
      type: Input
    }],
    nzNowText: [{
      type: Input
    }],
    nzOkText: [{
      type: Input
    }],
    nzPopupClassName: [{
      type: Input
    }],
    nzPlaceHolder: [{
      type: Input
    }],
    nzAddOn: [{
      type: Input
    }],
    nzDefaultOpenValue: [{
      type: Input
    }],
    nzDisabledHours: [{
      type: Input
    }],
    nzDisabledMinutes: [{
      type: Input
    }],
    nzDisabledSeconds: [{
      type: Input
    }],
    nzFormat: [{
      type: Input
    }],
    nzOpen: [{
      type: Input
    }],
    nzUse12Hours: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSuffixIcon: [{
      type: Input
    }],
    nzOpenChange: [{
      type: Output
    }],
    nzHideDisabledOptions: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAllowEmpty: [{
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
    nzAutoFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzBackdrop: [{
      type: Input
    }],
    nzInputReadOnly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
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
    nzNeedConfirm: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzNeedConfirm",
        required: false
      }]
    }],
    nzPlacement: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzPlacement",
        required: false
      }]
    }]
  });
})();
var _NzTimePickerModule = class _NzTimePickerModule {
};
__publicField(_NzTimePickerModule, "\u0275fac", function NzTimePickerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTimePickerModule)();
});
__publicField(_NzTimePickerModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzTimePickerModule,
  imports: [NzTimePickerComponent, NzTimePickerPanelComponent],
  exports: [NzTimePickerPanelComponent, NzTimePickerComponent]
}));
__publicField(_NzTimePickerModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzTimePickerComponent, NzTimePickerPanelComponent]
}));
var NzTimePickerModule = _NzTimePickerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTimePickerModule, [{
    type: NgModule,
    args: [{
      imports: [NzTimePickerComponent, NzTimePickerPanelComponent],
      exports: [NzTimePickerPanelComponent, NzTimePickerComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-date-picker.mjs
function CalendarFooterComponent_Conditional_1_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate(ctx_r0.extraFooter);
  }
}
function CalendarFooterComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, CalendarFooterComponent_Conditional_1_ng_template_1_Template, 1, 1, "ng-template", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-footer-extra"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.extraFooter);
  }
}
function CalendarFooterComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 3);
    \u0275\u0275listener("click", function CalendarFooterComponent_Conditional_2_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.isTodayDisabled ? null : ctx_r0.onClickToday());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate2("", ctx_r0.prefixCls, "-today-btn ", ctx_r0.isTodayDisabled ? ctx_r0.prefixCls + "-today-btn-disabled" : ""));
    \u0275\u0275property("title", \u0275\u0275interpolate(ctx_r0.todayTitle));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.locale.today, " ");
  }
}
function CalendarFooterComponent_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function CalendarFooterComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "a", 5);
    \u0275\u0275listener("click", function CalendarFooterComponent_Conditional_3_Conditional_2_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.isTodayDisabled ? null : ctx_r0.onClickToday());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-now"));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-now-btn"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.locale.now, " ");
  }
}
function CalendarFooterComponent_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 6);
    \u0275\u0275listener("click", function CalendarFooterComponent_Conditional_3_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.okDisabled ? null : ctx_r0.clickOk.emit());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-ok"));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.okDisabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.locale.ok, " ");
  }
}
function CalendarFooterComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul");
    \u0275\u0275template(1, CalendarFooterComponent_Conditional_3_ng_container_1_Template, 1, 0, "ng-container", 4);
    \u0275\u0275conditionalCreate(2, CalendarFooterComponent_Conditional_3_Conditional_2_Template, 3, 7, "li", 0);
    \u0275\u0275conditionalCreate(3, CalendarFooterComponent_Conditional_3_Conditional_3_Template, 3, 5, "li", 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-ranges"));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.rangeQuickSelector);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showNow ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasTimePicker ? 3 : -1);
  }
}
function _forTrack05($index, $item) {
  return this.trackBySelector($item);
}
function DecadeHeaderComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function DecadeHeaderComponent_For_7_Template_button_click_0_listener() {
      const selector_r2 = \u0275\u0275restoreView(_r1).$implicit;
      return \u0275\u0275resetView(selector_r2.onClick());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const selector_r2 = ctx.$implicit;
    \u0275\u0275classMap(selector_r2.className);
    \u0275\u0275domProperty("title", \u0275\u0275interpolate(selector_r2.title || null));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", selector_r2.label, " ");
  }
}
var _c012 = (a0) => ({
  $implicit: a0
});
var _forTrack1 = ($index, $item) => $item.trackByIndex;
function DecadeTableComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 3);
  }
}
function DecadeTableComponent_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r1 = ctx.$implicit;
    \u0275\u0275property("title", cell_r1.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r1.content);
  }
}
function DecadeTableComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "thead")(1, "tr", 2);
    \u0275\u0275conditionalCreate(2, DecadeTableComponent_Conditional_1_Conditional_2_Template, 1, 0, "th", 3);
    \u0275\u0275repeaterCreate(3, DecadeTableComponent_Conditional_1_For_4_Template, 2, 2, "th", 4, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showWeek ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.headRow);
  }
}
function DecadeTableComponent_For_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-week"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r3.weekNum);
  }
}
function DecadeTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function DecadeTableComponent_For_4_For_3_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DecadeTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template, 1, 1, "ng-template", 10);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c012, cell_r5.value));
  }
}
function DecadeTableComponent_For_4_For_3_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-inner"));
    \u0275\u0275attribute("aria-selected", cell_r5.isSelected)("aria-disabled", cell_r5.isDisabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.content, " ");
  }
}
function DecadeTableComponent_For_4_For_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DecadeTableComponent_For_4_For_3_Case_1_Conditional_0_Template, 1, 4, null, 10)(1, DecadeTableComponent_For_4_For_3_Case_1_Conditional_1_Template, 2, 6, "div", 11);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(cell_r5.cellRender ? 0 : 1);
  }
}
function DecadeTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.fullCellRender, " ");
  }
}
function DecadeTableComponent_For_4_For_3_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DecadeTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template, 2, 1, "ng-container", 12);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.fullCellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c012, cell_r5.value));
  }
}
function DecadeTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function DecadeTableComponent_For_4_For_3_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275template(3, DecadeTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template, 2, 1, "ng-container", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-value"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cell_r5.content);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-content"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(9, _c012, cell_r5.value));
  }
}
function DecadeTableComponent_For_4_For_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, DecadeTableComponent_For_4_For_3_Case_2_Conditional_1_Template, 1, 4, "ng-container")(2, DecadeTableComponent_For_4_For_3_Case_2_Conditional_2_Template, 4, 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date ant-picker-cell-inner"));
    \u0275\u0275classProp("ant-picker-calendar-date-today", cell_r5.isToday);
    \u0275\u0275advance();
    \u0275\u0275conditional(cell_r5.fullCellRender ? 1 : 2);
  }
}
function DecadeTableComponent_For_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 8);
    \u0275\u0275listener("click", function DecadeTableComponent_For_4_For_3_Template_td_click_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.isDisabled ? null : cell_r5.onClick());
    })("mouseenter", function DecadeTableComponent_For_4_For_3_Template_td_mouseenter_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.onMouseEnter());
    });
    \u0275\u0275conditionalCreate(1, DecadeTableComponent_For_4_For_3_Case_1_Template, 2, 1)(2, DecadeTableComponent_For_4_For_3_Case_2_Template, 3, 6, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const cell_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(cell_r5.classMap);
    \u0275\u0275property("title", cell_r5.title);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = ctx_r1.prefixCls) === "ant-picker" ? 1 : tmp_22_0 === "ant-picker-calendar" ? 2 : -1);
  }
}
function DecadeTableComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 2);
    \u0275\u0275conditionalCreate(1, DecadeTableComponent_For_4_Conditional_1_Template, 2, 4, "td", 5);
    \u0275\u0275repeaterCreate(2, DecadeTableComponent_For_4_For_3_Template, 3, 4, "td", 6, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275classMap(row_r3.classMap);
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r3.weekNum ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r3.dateCells);
  }
}
function YearHeaderComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function YearHeaderComponent_For_7_Template_button_click_0_listener() {
      const selector_r2 = \u0275\u0275restoreView(_r1).$implicit;
      return \u0275\u0275resetView(selector_r2.onClick());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const selector_r2 = ctx.$implicit;
    \u0275\u0275classMap(selector_r2.className);
    \u0275\u0275domProperty("title", \u0275\u0275interpolate(selector_r2.title || null));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", selector_r2.label, " ");
  }
}
function YearTableComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 3);
  }
}
function YearTableComponent_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r1 = ctx.$implicit;
    \u0275\u0275property("title", cell_r1.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r1.content);
  }
}
function YearTableComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "thead")(1, "tr", 2);
    \u0275\u0275conditionalCreate(2, YearTableComponent_Conditional_1_Conditional_2_Template, 1, 0, "th", 3);
    \u0275\u0275repeaterCreate(3, YearTableComponent_Conditional_1_For_4_Template, 2, 2, "th", 4, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showWeek ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.headRow);
  }
}
function YearTableComponent_For_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-week"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r3.weekNum);
  }
}
function YearTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function YearTableComponent_For_4_For_3_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, YearTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template, 1, 1, "ng-template", 10);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c012, cell_r5.value));
  }
}
function YearTableComponent_For_4_For_3_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-inner"));
    \u0275\u0275attribute("aria-selected", cell_r5.isSelected)("aria-disabled", cell_r5.isDisabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.content, " ");
  }
}
function YearTableComponent_For_4_For_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, YearTableComponent_For_4_For_3_Case_1_Conditional_0_Template, 1, 4, null, 10)(1, YearTableComponent_For_4_For_3_Case_1_Conditional_1_Template, 2, 6, "div", 11);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(cell_r5.cellRender ? 0 : 1);
  }
}
function YearTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.fullCellRender, " ");
  }
}
function YearTableComponent_For_4_For_3_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, YearTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template, 2, 1, "ng-container", 12);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.fullCellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c012, cell_r5.value));
  }
}
function YearTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function YearTableComponent_For_4_For_3_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275template(3, YearTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template, 2, 1, "ng-container", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-value"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cell_r5.content);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-content"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(9, _c012, cell_r5.value));
  }
}
function YearTableComponent_For_4_For_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, YearTableComponent_For_4_For_3_Case_2_Conditional_1_Template, 1, 4, "ng-container")(2, YearTableComponent_For_4_For_3_Case_2_Conditional_2_Template, 4, 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date ant-picker-cell-inner"));
    \u0275\u0275classProp("ant-picker-calendar-date-today", cell_r5.isToday);
    \u0275\u0275advance();
    \u0275\u0275conditional(cell_r5.fullCellRender ? 1 : 2);
  }
}
function YearTableComponent_For_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 8);
    \u0275\u0275listener("click", function YearTableComponent_For_4_For_3_Template_td_click_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.isDisabled ? null : cell_r5.onClick());
    })("mouseenter", function YearTableComponent_For_4_For_3_Template_td_mouseenter_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.onMouseEnter());
    });
    \u0275\u0275conditionalCreate(1, YearTableComponent_For_4_For_3_Case_1_Template, 2, 1)(2, YearTableComponent_For_4_For_3_Case_2_Template, 3, 6, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const cell_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(cell_r5.classMap);
    \u0275\u0275property("title", cell_r5.title);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = ctx_r1.prefixCls) === "ant-picker" ? 1 : tmp_22_0 === "ant-picker-calendar" ? 2 : -1);
  }
}
function YearTableComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 2);
    \u0275\u0275conditionalCreate(1, YearTableComponent_For_4_Conditional_1_Template, 2, 4, "td", 5);
    \u0275\u0275repeaterCreate(2, YearTableComponent_For_4_For_3_Template, 3, 4, "td", 6, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275classMap(row_r3.classMap);
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r3.weekNum ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r3.dateCells);
  }
}
function QuarterHeaderComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function QuarterHeaderComponent_For_7_Template_button_click_0_listener() {
      const selector_r2 = \u0275\u0275restoreView(_r1).$implicit;
      return \u0275\u0275resetView(selector_r2.onClick());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const selector_r2 = ctx.$implicit;
    \u0275\u0275classMap(selector_r2.className);
    \u0275\u0275domProperty("title", \u0275\u0275interpolate(selector_r2.title || null));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", selector_r2.label, " ");
  }
}
function QuarterTableComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 3);
  }
}
function QuarterTableComponent_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r1 = ctx.$implicit;
    \u0275\u0275property("title", cell_r1.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r1.content);
  }
}
function QuarterTableComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "thead")(1, "tr", 2);
    \u0275\u0275conditionalCreate(2, QuarterTableComponent_Conditional_1_Conditional_2_Template, 1, 0, "th", 3);
    \u0275\u0275repeaterCreate(3, QuarterTableComponent_Conditional_1_For_4_Template, 2, 2, "th", 4, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showWeek ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.headRow);
  }
}
function QuarterTableComponent_For_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-week"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r3.weekNum);
  }
}
function QuarterTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function QuarterTableComponent_For_4_For_3_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, QuarterTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template, 1, 1, "ng-template", 10);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c012, cell_r5.value));
  }
}
function QuarterTableComponent_For_4_For_3_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-inner"));
    \u0275\u0275attribute("aria-selected", cell_r5.isSelected)("aria-disabled", cell_r5.isDisabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.content, " ");
  }
}
function QuarterTableComponent_For_4_For_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, QuarterTableComponent_For_4_For_3_Case_1_Conditional_0_Template, 1, 4, null, 10)(1, QuarterTableComponent_For_4_For_3_Case_1_Conditional_1_Template, 2, 6, "div", 11);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(cell_r5.cellRender ? 0 : 1);
  }
}
function QuarterTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.fullCellRender, " ");
  }
}
function QuarterTableComponent_For_4_For_3_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, QuarterTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template, 2, 1, "ng-container", 12);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.fullCellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c012, cell_r5.value));
  }
}
function QuarterTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function QuarterTableComponent_For_4_For_3_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275template(3, QuarterTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template, 2, 1, "ng-container", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-value"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cell_r5.content);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-content"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(9, _c012, cell_r5.value));
  }
}
function QuarterTableComponent_For_4_For_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, QuarterTableComponent_For_4_For_3_Case_2_Conditional_1_Template, 1, 4, "ng-container")(2, QuarterTableComponent_For_4_For_3_Case_2_Conditional_2_Template, 4, 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date ant-picker-cell-inner"));
    \u0275\u0275classProp("ant-picker-calendar-date-today", cell_r5.isToday);
    \u0275\u0275advance();
    \u0275\u0275conditional(cell_r5.fullCellRender ? 1 : 2);
  }
}
function QuarterTableComponent_For_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 8);
    \u0275\u0275listener("click", function QuarterTableComponent_For_4_For_3_Template_td_click_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.isDisabled ? null : cell_r5.onClick());
    })("mouseenter", function QuarterTableComponent_For_4_For_3_Template_td_mouseenter_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.onMouseEnter());
    });
    \u0275\u0275conditionalCreate(1, QuarterTableComponent_For_4_For_3_Case_1_Template, 2, 1)(2, QuarterTableComponent_For_4_For_3_Case_2_Template, 3, 6, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const cell_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(cell_r5.classMap);
    \u0275\u0275property("title", cell_r5.title);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = ctx_r1.prefixCls) === "ant-picker" ? 1 : tmp_22_0 === "ant-picker-calendar" ? 2 : -1);
  }
}
function QuarterTableComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 2);
    \u0275\u0275conditionalCreate(1, QuarterTableComponent_For_4_Conditional_1_Template, 2, 4, "td", 5);
    \u0275\u0275repeaterCreate(2, QuarterTableComponent_For_4_For_3_Template, 3, 4, "td", 6, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275classMap(row_r3.classMap);
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r3.weekNum ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r3.dateCells);
  }
}
function MonthHeaderComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function MonthHeaderComponent_For_7_Template_button_click_0_listener() {
      const selector_r2 = \u0275\u0275restoreView(_r1).$implicit;
      return \u0275\u0275resetView(selector_r2.onClick());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const selector_r2 = ctx.$implicit;
    \u0275\u0275classMap(selector_r2.className);
    \u0275\u0275domProperty("title", \u0275\u0275interpolate(selector_r2.title || null));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", selector_r2.label, " ");
  }
}
function MonthTableComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 3);
  }
}
function MonthTableComponent_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r1 = ctx.$implicit;
    \u0275\u0275property("title", cell_r1.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r1.content);
  }
}
function MonthTableComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "thead")(1, "tr", 2);
    \u0275\u0275conditionalCreate(2, MonthTableComponent_Conditional_1_Conditional_2_Template, 1, 0, "th", 3);
    \u0275\u0275repeaterCreate(3, MonthTableComponent_Conditional_1_For_4_Template, 2, 2, "th", 4, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showWeek ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.headRow);
  }
}
function MonthTableComponent_For_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-week"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r3.weekNum);
  }
}
function MonthTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function MonthTableComponent_For_4_For_3_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MonthTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template, 1, 1, "ng-template", 10);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c012, cell_r5.value));
  }
}
function MonthTableComponent_For_4_For_3_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-inner"));
    \u0275\u0275attribute("aria-selected", cell_r5.isSelected)("aria-disabled", cell_r5.isDisabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.content, " ");
  }
}
function MonthTableComponent_For_4_For_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, MonthTableComponent_For_4_For_3_Case_1_Conditional_0_Template, 1, 4, null, 10)(1, MonthTableComponent_For_4_For_3_Case_1_Conditional_1_Template, 2, 6, "div", 11);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(cell_r5.cellRender ? 0 : 1);
  }
}
function MonthTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.fullCellRender, " ");
  }
}
function MonthTableComponent_For_4_For_3_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MonthTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template, 2, 1, "ng-container", 12);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.fullCellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c012, cell_r5.value));
  }
}
function MonthTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function MonthTableComponent_For_4_For_3_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275template(3, MonthTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template, 2, 1, "ng-container", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-value"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cell_r5.content);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-content"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(9, _c012, cell_r5.value));
  }
}
function MonthTableComponent_For_4_For_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, MonthTableComponent_For_4_For_3_Case_2_Conditional_1_Template, 1, 4, "ng-container")(2, MonthTableComponent_For_4_For_3_Case_2_Conditional_2_Template, 4, 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date ant-picker-cell-inner"));
    \u0275\u0275classProp("ant-picker-calendar-date-today", cell_r5.isToday);
    \u0275\u0275advance();
    \u0275\u0275conditional(cell_r5.fullCellRender ? 1 : 2);
  }
}
function MonthTableComponent_For_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 8);
    \u0275\u0275listener("click", function MonthTableComponent_For_4_For_3_Template_td_click_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.isDisabled ? null : cell_r5.onClick());
    })("mouseenter", function MonthTableComponent_For_4_For_3_Template_td_mouseenter_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.onMouseEnter());
    });
    \u0275\u0275conditionalCreate(1, MonthTableComponent_For_4_For_3_Case_1_Template, 2, 1)(2, MonthTableComponent_For_4_For_3_Case_2_Template, 3, 6, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const cell_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(cell_r5.classMap);
    \u0275\u0275property("title", cell_r5.title);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = ctx_r1.prefixCls) === "ant-picker" ? 1 : tmp_22_0 === "ant-picker-calendar" ? 2 : -1);
  }
}
function MonthTableComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 2);
    \u0275\u0275conditionalCreate(1, MonthTableComponent_For_4_Conditional_1_Template, 2, 4, "td", 5);
    \u0275\u0275repeaterCreate(2, MonthTableComponent_For_4_For_3_Template, 3, 4, "td", 6, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275classMap(row_r3.classMap);
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r3.weekNum ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r3.dateCells);
  }
}
function DateHeaderComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function DateHeaderComponent_For_7_Template_button_click_0_listener() {
      const selector_r2 = \u0275\u0275restoreView(_r1).$implicit;
      return \u0275\u0275resetView(selector_r2.onClick());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const selector_r2 = ctx.$implicit;
    \u0275\u0275classMap(selector_r2.className);
    \u0275\u0275domProperty("title", \u0275\u0275interpolate(selector_r2.title || null));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", selector_r2.label, " ");
  }
}
function DateTableComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 3);
  }
}
function DateTableComponent_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r1 = ctx.$implicit;
    \u0275\u0275property("title", cell_r1.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r1.content);
  }
}
function DateTableComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "thead")(1, "tr", 2);
    \u0275\u0275conditionalCreate(2, DateTableComponent_Conditional_1_Conditional_2_Template, 1, 0, "th", 3);
    \u0275\u0275repeaterCreate(3, DateTableComponent_Conditional_1_For_4_Template, 2, 2, "th", 4, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showWeek ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.headRow);
  }
}
function DateTableComponent_For_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-week"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r3.weekNum);
  }
}
function DateTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function DateTableComponent_For_4_For_3_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DateTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template, 1, 1, "ng-template", 10);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c012, cell_r5.value));
  }
}
function DateTableComponent_For_4_For_3_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-inner"));
    \u0275\u0275attribute("aria-selected", cell_r5.isSelected)("aria-disabled", cell_r5.isDisabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.content, " ");
  }
}
function DateTableComponent_For_4_For_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DateTableComponent_For_4_For_3_Case_1_Conditional_0_Template, 1, 4, null, 10)(1, DateTableComponent_For_4_For_3_Case_1_Conditional_1_Template, 2, 6, "div", 11);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(cell_r5.cellRender ? 0 : 1);
  }
}
function DateTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.fullCellRender, " ");
  }
}
function DateTableComponent_For_4_For_3_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DateTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template, 2, 1, "ng-container", 12);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.fullCellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c012, cell_r5.value));
  }
}
function DateTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function DateTableComponent_For_4_For_3_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275template(3, DateTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template, 2, 1, "ng-container", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-value"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cell_r5.content);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-content"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(9, _c012, cell_r5.value));
  }
}
function DateTableComponent_For_4_For_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, DateTableComponent_For_4_For_3_Case_2_Conditional_1_Template, 1, 4, "ng-container")(2, DateTableComponent_For_4_For_3_Case_2_Conditional_2_Template, 4, 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date ant-picker-cell-inner"));
    \u0275\u0275classProp("ant-picker-calendar-date-today", cell_r5.isToday);
    \u0275\u0275advance();
    \u0275\u0275conditional(cell_r5.fullCellRender ? 1 : 2);
  }
}
function DateTableComponent_For_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 8);
    \u0275\u0275listener("click", function DateTableComponent_For_4_For_3_Template_td_click_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.isDisabled ? null : cell_r5.onClick());
    })("mouseenter", function DateTableComponent_For_4_For_3_Template_td_mouseenter_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.onMouseEnter());
    });
    \u0275\u0275conditionalCreate(1, DateTableComponent_For_4_For_3_Case_1_Template, 2, 1)(2, DateTableComponent_For_4_For_3_Case_2_Template, 3, 6, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const cell_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(cell_r5.classMap);
    \u0275\u0275property("title", cell_r5.title);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = ctx_r1.prefixCls) === "ant-picker" ? 1 : tmp_22_0 === "ant-picker-calendar" ? 2 : -1);
  }
}
function DateTableComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 2);
    \u0275\u0275conditionalCreate(1, DateTableComponent_For_4_Conditional_1_Template, 2, 4, "td", 5);
    \u0275\u0275repeaterCreate(2, DateTableComponent_For_4_For_3_Template, 3, 4, "td", 6, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275classMap(row_r3.classMap);
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r3.weekNum ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r3.dateCells);
  }
}
function InnerPopupComponent_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "decade-header", 2);
    \u0275\u0275twoWayListener("valueChange", function InnerPopupComponent_Case_2_Template_decade_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.activeDate, $event) || (ctx_r1.activeDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("panelChange", function InnerPopupComponent_Case_2_Template_decade_header_panelChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.panelChange.emit($event));
    })("valueChange", function InnerPopupComponent_Case_2_Template_decade_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.headerChange.emit($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div")(2, "decade-table", 3);
    \u0275\u0275listener("valueChange", function InnerPopupComponent_Case_2_Template_decade_table_valueChange_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onChooseDecade($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("value", ctx_r1.activeDate);
    \u0275\u0275property("locale", ctx_r1.locale)("showSuperPreBtn", ctx_r1.enablePrevNext("prev", "decade"))("showSuperNextBtn", ctx_r1.enablePrevNext("next", "decade"))("showNextBtn", false)("showPreBtn", false);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-body"));
    \u0275\u0275advance();
    \u0275\u0275property("activeDate", ctx_r1.activeDate)("value", ctx_r1.value)("locale", ctx_r1.locale)("disabledDate", ctx_r1.disabledDate);
  }
}
function InnerPopupComponent_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "year-header", 2);
    \u0275\u0275twoWayListener("valueChange", function InnerPopupComponent_Case_3_Template_year_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.activeDate, $event) || (ctx_r1.activeDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("panelChange", function InnerPopupComponent_Case_3_Template_year_header_panelChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.panelChange.emit($event));
    })("valueChange", function InnerPopupComponent_Case_3_Template_year_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.headerChange.emit($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div")(2, "year-table", 4);
    \u0275\u0275listener("valueChange", function InnerPopupComponent_Case_3_Template_year_table_valueChange_2_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onChooseYear($event));
    })("cellHover", function InnerPopupComponent_Case_3_Template_year_table_cellHover_2_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cellHover.emit($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("value", ctx_r1.activeDate);
    \u0275\u0275property("locale", ctx_r1.locale)("showSuperPreBtn", ctx_r1.enablePrevNext("prev", "year"))("showSuperNextBtn", ctx_r1.enablePrevNext("next", "year"))("showNextBtn", false)("showPreBtn", false);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-body"));
    \u0275\u0275advance();
    \u0275\u0275property("activeDate", ctx_r1.activeDate)("value", ctx_r1.value)("locale", ctx_r1.locale)("disabledDate", ctx_r1.disabledDate)("selectedValue", ctx_r1.selectedValue)("hoverValue", ctx_r1.hoverValue);
  }
}
function InnerPopupComponent_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "month-header", 2);
    \u0275\u0275twoWayListener("valueChange", function InnerPopupComponent_Case_4_Template_month_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.activeDate, $event) || (ctx_r1.activeDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("panelChange", function InnerPopupComponent_Case_4_Template_month_header_panelChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.panelChange.emit($event));
    })("valueChange", function InnerPopupComponent_Case_4_Template_month_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.headerChange.emit($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div")(2, "month-table", 5);
    \u0275\u0275listener("valueChange", function InnerPopupComponent_Case_4_Template_month_table_valueChange_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onChooseMonth($event));
    })("cellHover", function InnerPopupComponent_Case_4_Template_month_table_cellHover_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cellHover.emit($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("value", ctx_r1.activeDate);
    \u0275\u0275property("locale", ctx_r1.locale)("showSuperPreBtn", ctx_r1.enablePrevNext("prev", "month"))("showSuperNextBtn", ctx_r1.enablePrevNext("next", "month"))("showNextBtn", false)("showPreBtn", false);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-body"));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.value)("activeDate", ctx_r1.activeDate)("locale", ctx_r1.locale)("disabledDate", ctx_r1.disabledDate)("selectedValue", ctx_r1.selectedValue)("hoverValue", ctx_r1.hoverValue);
  }
}
function InnerPopupComponent_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "quarter-header", 2);
    \u0275\u0275twoWayListener("valueChange", function InnerPopupComponent_Case_5_Template_quarter_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.activeDate, $event) || (ctx_r1.activeDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("panelChange", function InnerPopupComponent_Case_5_Template_quarter_header_panelChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.panelChange.emit($event));
    })("valueChange", function InnerPopupComponent_Case_5_Template_quarter_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.headerChange.emit($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div")(2, "quarter-table", 6);
    \u0275\u0275listener("valueChange", function InnerPopupComponent_Case_5_Template_quarter_table_valueChange_2_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onChooseQuarter($event));
    })("cellHover", function InnerPopupComponent_Case_5_Template_quarter_table_cellHover_2_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cellHover.emit($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("value", ctx_r1.activeDate);
    \u0275\u0275property("locale", ctx_r1.locale)("showSuperPreBtn", ctx_r1.enablePrevNext("prev", "month"))("showSuperNextBtn", ctx_r1.enablePrevNext("next", "month"))("showNextBtn", false)("showPreBtn", false);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-body"));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.value)("activeDate", ctx_r1.activeDate)("locale", ctx_r1.locale)("disabledDate", ctx_r1.disabledDate)("selectedValue", ctx_r1.selectedValue)("hoverValue", ctx_r1.hoverValue)("cellRender", ctx_r1.dateRender);
  }
}
function InnerPopupComponent_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "date-header", 7);
    \u0275\u0275twoWayListener("valueChange", function InnerPopupComponent_Case_6_Template_date_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.activeDate, $event) || (ctx_r1.activeDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("panelChange", function InnerPopupComponent_Case_6_Template_date_header_panelChange_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.panelChange.emit($event));
    })("valueChange", function InnerPopupComponent_Case_6_Template_date_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.headerChange.emit($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div")(2, "date-table", 8);
    \u0275\u0275listener("valueChange", function InnerPopupComponent_Case_6_Template_date_table_valueChange_2_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSelectDate($event));
    })("cellHover", function InnerPopupComponent_Case_6_Template_date_table_cellHover_2_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cellHover.emit($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("value", ctx_r1.activeDate);
    \u0275\u0275property("locale", ctx_r1.locale)("showSuperPreBtn", ctx_r1.panelMode === "week" ? ctx_r1.enablePrevNext("prev", "week") : ctx_r1.enablePrevNext("prev", "date"))("showSuperNextBtn", ctx_r1.panelMode === "week" ? ctx_r1.enablePrevNext("next", "week") : ctx_r1.enablePrevNext("next", "date"))("showPreBtn", ctx_r1.panelMode === "week" ? ctx_r1.enablePrevNext("prev", "week") : ctx_r1.enablePrevNext("prev", "date"))("showNextBtn", ctx_r1.panelMode === "week" ? ctx_r1.enablePrevNext("next", "week") : ctx_r1.enablePrevNext("next", "date"));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-body"));
    \u0275\u0275advance();
    \u0275\u0275property("locale", ctx_r1.locale)("showWeek", ctx_r1.showWeek)("value", ctx_r1.value)("activeDate", ctx_r1.activeDate)("disabledDate", ctx_r1.disabledDate)("cellRender", ctx_r1.dateRender)("selectedValue", ctx_r1.selectedValue)("hoverValue", ctx_r1.hoverValue)("canSelectWeek", ctx_r1.panelMode === "week")("format", ctx_r1.format);
  }
}
function InnerPopupComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-time-picker-panel", 9);
    \u0275\u0275listener("ngModelChange", function InnerPopupComponent_Conditional_7_Template_nz_time_picker_panel_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSelectTime($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("nzInDatePicker", true)("ngModel", ctx_r1.value == null ? null : ctx_r1.value.nativeDate)("format", ctx_r1.timeOptions.nzFormat)("nzHourStep", ctx_r1.timeOptions.nzHourStep)("nzMinuteStep", ctx_r1.timeOptions.nzMinuteStep)("nzSecondStep", ctx_r1.timeOptions.nzSecondStep)("nzDisabledHours", ctx_r1.timeOptions.nzDisabledHours)("nzDisabledMinutes", ctx_r1.timeOptions.nzDisabledMinutes)("nzDisabledSeconds", ctx_r1.timeOptions.nzDisabledSeconds)("nzHideDisabledOptions", !!ctx_r1.timeOptions.nzHideDisabledOptions)("nzDefaultOpenValue", ctx_r1.timeOptions.nzDefaultOpenValue)("nzUse12Hours", !!ctx_r1.timeOptions.nzUse12Hours)("nzAddOn", ctx_r1.timeOptions.nzAddOn);
  }
}
var _c18 = (a0) => ({
  partType: a0
});
var _c28 = () => ({
  partType: "left"
});
var _c35 = () => ({
  partType: "right"
});
function DateRangePopupComponent_Conditional_0_Conditional_4_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function DateRangePopupComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DateRangePopupComponent_Conditional_0_Conditional_4_ng_container_0_Template, 1, 0, "ng-container", 5);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    const tplInnerPopup_r2 = \u0275\u0275reference(3);
    \u0275\u0275property("ngTemplateOutlet", tplInnerPopup_r2)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c18, ctx_r0.datePickerService.activeInput));
  }
}
function DateRangePopupComponent_Conditional_0_Conditional_5_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function DateRangePopupComponent_Conditional_0_Conditional_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function DateRangePopupComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DateRangePopupComponent_Conditional_0_Conditional_5_ng_container_0_Template, 1, 0, "ng-container", 5)(1, DateRangePopupComponent_Conditional_0_Conditional_5_ng_container_1_Template, 1, 0, "ng-container", 5);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const tplInnerPopup_r2 = \u0275\u0275reference(3);
    \u0275\u0275property("ngTemplateOutlet", tplInnerPopup_r2)("ngTemplateOutletContext", \u0275\u0275pureFunction0(4, _c28));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", tplInnerPopup_r2)("ngTemplateOutletContext", \u0275\u0275pureFunction0(5, _c35));
  }
}
function DateRangePopupComponent_Conditional_0_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function DateRangePopupComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "div");
    \u0275\u0275elementStart(2, "div")(3, "div");
    \u0275\u0275conditionalCreate(4, DateRangePopupComponent_Conditional_0_Conditional_4_Template, 1, 4, "ng-container")(5, DateRangePopupComponent_Conditional_0_Conditional_5_Template, 2, 6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, DateRangePopupComponent_Conditional_0_ng_container_6_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const tplFooter_r3 = \u0275\u0275reference(5);
    \u0275\u0275classMap(\u0275\u0275interpolate2("", ctx_r0.prefixCls, "-range-wrapper ", ctx_r0.prefixCls, "-date-range-wrapper"));
    \u0275\u0275advance();
    \u0275\u0275styleMap(ctx_r0.arrowPosition);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-range-arrow"));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate2("", ctx_r0.prefixCls, "-panel-container ", ctx_r0.showWeek ? ctx_r0.prefixCls + "-week-number" : ""));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-panels"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasTimePicker ? 4 : 5);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", tplFooter_r3);
  }
}
function DateRangePopupComponent_Conditional_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function DateRangePopupComponent_Conditional_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function DateRangePopupComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 6);
    \u0275\u0275template(2, DateRangePopupComponent_Conditional_1_ng_container_2_Template, 1, 0, "ng-container", 4)(3, DateRangePopupComponent_Conditional_1_ng_container_3_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const tplInnerPopup_r2 = \u0275\u0275reference(3);
    const tplFooter_r3 = \u0275\u0275reference(5);
    \u0275\u0275classMap(\u0275\u0275interpolate4("", ctx_r0.prefixCls, "-panel-container ", ctx_r0.showWeek ? ctx_r0.prefixCls + "-week-number" : "", " ", ctx_r0.hasTimePicker ? ctx_r0.prefixCls + "-time" : "", " ", ctx_r0.isRange ? ctx_r0.prefixCls + "-range" : ""));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-panel"));
    \u0275\u0275classProp("ant-picker-panel-rtl", ctx_r0.dir === "rtl");
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", tplInnerPopup_r2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", tplFooter_r3);
  }
}
function DateRangePopupComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "inner-popup", 7);
    \u0275\u0275listener("panelChange", function DateRangePopupComponent_ng_template_2_Template_inner_popup_panelChange_1_listener($event) {
      const partType_r5 = \u0275\u0275restoreView(_r4).partType;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPanelModeChange($event, partType_r5));
    })("cellHover", function DateRangePopupComponent_ng_template_2_Template_inner_popup_cellHover_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCellHover($event));
    })("selectDate", function DateRangePopupComponent_ng_template_2_Template_inner_popup_selectDate_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.changeValueFromSelect($event, !ctx_r0.showTime));
    })("selectTime", function DateRangePopupComponent_ng_template_2_Template_inner_popup_selectTime_1_listener($event) {
      const partType_r5 = \u0275\u0275restoreView(_r4).partType;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSelectTime($event, partType_r5));
    })("headerChange", function DateRangePopupComponent_ng_template_2_Template_inner_popup_headerChange_1_listener($event) {
      const partType_r5 = \u0275\u0275restoreView(_r4).partType;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onActiveDateChange($event, partType_r5));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const partType_r5 = ctx.partType;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-panel"));
    \u0275\u0275classProp("ant-picker-panel-rtl", ctx_r0.dir === "rtl");
    \u0275\u0275advance();
    \u0275\u0275property("showWeek", ctx_r0.showWeek)("endPanelMode", ctx_r0.getPanelMode(ctx_r0.endPanelMode, partType_r5))("partType", partType_r5)("locale", ctx_r0.locale)("showTimePicker", ctx_r0.hasTimePicker)("timeOptions", ctx_r0.getTimeOptions(partType_r5))("panelMode", ctx_r0.getPanelMode(ctx_r0.panelMode, partType_r5))("activeDate", ctx_r0.getActiveDate(partType_r5))("value", ctx_r0.getValue(partType_r5))("disabledDate", ctx_r0.disabledDate)("dateRender", ctx_r0.dateRender)("selectedValue", ctx_r0.datePickerService == null ? null : ctx_r0.datePickerService.value)("hoverValue", ctx_r0.hoverValue)("format", ctx_r0.format);
  }
}
function DateRangePopupComponent_ng_template_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "calendar-footer", 9);
    \u0275\u0275listener("clickOk", function DateRangePopupComponent_ng_template_4_Conditional_0_Template_calendar_footer_clickOk_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onClickOk());
    })("clickToday", function DateRangePopupComponent_ng_template_4_Conditional_0_Template_calendar_footer_clickToday_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onClickToday($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    const tplRangeQuickSelector_r7 = \u0275\u0275reference(7);
    \u0275\u0275property("locale", ctx_r0.locale)("isRange", ctx_r0.isRange)("showToday", ctx_r0.showToday)("showNow", ctx_r0.showNow)("hasTimePicker", ctx_r0.hasTimePicker)("okDisabled", !ctx_r0.isAllowed(ctx_r0.datePickerService == null ? null : ctx_r0.datePickerService.value))("extraFooter", ctx_r0.extraFooter)("rangeQuickSelector", ctx_r0.ranges ? tplRangeQuickSelector_r7 : null);
  }
}
function DateRangePopupComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DateRangePopupComponent_ng_template_4_Conditional_0_Template, 1, 8, "calendar-footer", 8);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.hasFooter ? 0 : -1);
  }
}
function DateRangePopupComponent_ng_template_6_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 10);
    \u0275\u0275listener("click", function DateRangePopupComponent_ng_template_6_For_1_Template_li_click_0_listener() {
      const name_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onClickPresetRange(ctx_r0.ranges[name_r9]));
    })("mouseenter", function DateRangePopupComponent_ng_template_6_For_1_Template_li_mouseenter_0_listener() {
      const name_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onHoverPresetRange(ctx_r0.ranges[name_r9]));
    })("mouseleave", function DateRangePopupComponent_ng_template_6_For_1_Template_li_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onPresetRangeMouseLeave());
    });
    \u0275\u0275elementStart(1, "span", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const name_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-preset"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(name_r9);
  }
}
function DateRangePopupComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DateRangePopupComponent_ng_template_6_For_1_Template, 3, 4, "li", 3, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r0.getObjectKeys(ctx_r0.ranges));
  }
}
var _c45 = ["separatorElement"];
var _c53 = ["pickerInput"];
var _c63 = ["rangePickerInput"];
function NzDatePickerComponent_Conditional_0_Conditional_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "input", 9, 3);
    \u0275\u0275twoWayListener("ngModelChange", function NzDatePickerComponent_Conditional_0_Conditional_0_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.inputValue, $event) || (ctx_r1.inputValue = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("focus", function NzDatePickerComponent_Conditional_0_Conditional_0_Template_input_focus_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onFocus($event));
    })("focusout", function NzDatePickerComponent_Conditional_0_Conditional_0_Template_input_focusout_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onFocusout($event));
    })("ngModelChange", function NzDatePickerComponent_Conditional_0_Conditional_0_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onInputChange($event));
    })("keyup.enter", function NzDatePickerComponent_Conditional_0_Conditional_0_Template_input_keyup_enter_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onKeyupEnter($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, NzDatePickerComponent_Conditional_0_Conditional_0_ng_container_3_Template, 1, 0, "ng-container", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    const tplRightRest_r3 = \u0275\u0275reference(5);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-input"));
    \u0275\u0275advance();
    \u0275\u0275classProp("ant-input-disabled", ctx_r1.nzDisabled);
    \u0275\u0275property("placeholder", \u0275\u0275interpolate(ctx_r1.getPlaceholder()))("disabled", ctx_r1.nzDisabled)("readOnly", ctx_r1.nzInputReadOnly);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.inputValue);
    \u0275\u0275property("size", ctx_r1.inputSize);
    \u0275\u0275attribute("id", ctx_r1.nzId);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", tplRightRest_r3);
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.nzSeparator, " ");
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 13);
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275conditionalCreate(1, NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_5_Conditional_1_Template, 1, 1)(2, NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_5_Conditional_2_Template, 1, 0, "nz-icon", 13);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.nzSeparator ? 1 : 2);
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", null, 4)(4, "span");
    \u0275\u0275template(5, NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_5_Template, 3, 1, "ng-container", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div");
    \u0275\u0275template(7, NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_7_Template, 1, 0, "ng-container", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_8_Template, 1, 0, "ng-container", 10);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    const tplRangeInput_r4 = \u0275\u0275reference(3);
    const tplRightRest_r3 = \u0275\u0275reference(5);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-input"));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", tplRangeInput_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction0(18, _c28));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-range-separator"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-separator"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzSeparator);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-input"));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", tplRangeInput_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction0(19, _c35));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", tplRightRest_r3);
  }
}
function NzDatePickerComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzDatePickerComponent_Conditional_0_Conditional_0_Template, 4, 13, "div", 8)(1, NzDatePickerComponent_Conditional_0_Conditional_1_Template, 9, 20);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r1.isRange ? 0 : 1);
  }
}
function NzDatePickerComponent_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function NzDatePickerComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzDatePickerComponent_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 6);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const inlineMode_r5 = \u0275\u0275reference(7);
    \u0275\u0275property("ngTemplateOutlet", inlineMode_r5);
  }
}
function NzDatePickerComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 14, 5);
    \u0275\u0275listener("click", function NzDatePickerComponent_ng_template_2_Template_input_click_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClickInputBox($event));
    })("focusout", function NzDatePickerComponent_ng_template_2_Template_input_focusout_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFocusout($event));
    })("focus", function NzDatePickerComponent_ng_template_2_Template_input_focus_0_listener($event) {
      const partType_r7 = \u0275\u0275restoreView(_r6).partType;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFocus($event, partType_r7));
    })("keyup.enter", function NzDatePickerComponent_ng_template_2_Template_input_keyup_enter_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onKeyupEnter($event));
    });
    \u0275\u0275twoWayListener("ngModelChange", function NzDatePickerComponent_ng_template_2_Template_input_ngModelChange_0_listener($event) {
      const partType_r7 = \u0275\u0275restoreView(_r6).partType;
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.inputValue[ctx_r1.datePickerService.getActiveIndex(partType_r7)], $event) || (ctx_r1.inputValue[ctx_r1.datePickerService.getActiveIndex(partType_r7)] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function NzDatePickerComponent_ng_template_2_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onInputChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const partType_r7 = ctx.partType;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("placeholder", \u0275\u0275interpolate(ctx_r1.getPlaceholder(partType_r7)))("disabled", ctx_r1.nzDisabled)("readOnly", ctx_r1.nzInputReadOnly)("size", ctx_r1.inputSize);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.inputValue[ctx_r1.datePickerService.getActiveIndex(partType_r7)]);
    \u0275\u0275attribute("id", ctx_r1.nzId);
  }
}
function NzDatePickerComponent_ng_template_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275listener("click", function NzDatePickerComponent_ng_template_4_Conditional_1_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onClickClear($event));
    });
    \u0275\u0275element(1, "nz-icon", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-clear"));
  }
}
function NzDatePickerComponent_ng_template_4_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "nz-icon", 18);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const suffixIcon_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzType", suffixIcon_r9);
  }
}
function NzDatePickerComponent_ng_template_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-form-item-feedback-icon", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("status", ctx_r1.status);
  }
}
function NzDatePickerComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div");
    \u0275\u0275conditionalCreate(1, NzDatePickerComponent_ng_template_4_Conditional_1_Template, 2, 3, "span", 8);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275template(3, NzDatePickerComponent_ng_template_4_ng_container_3_Template, 2, 1, "ng-container", 12);
    \u0275\u0275conditionalCreate(4, NzDatePickerComponent_ng_template_4_Conditional_4_Template, 1, 1, "nz-form-item-feedback-icon", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r1.activeBarStyle);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-active-bar"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showClear ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-suffix"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzSuffixIcon);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.hasFeedback && !!ctx_r1.status ? 4 : -1);
  }
}
function NzDatePickerComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275animateLeave(function NzDatePickerComponent_ng_template_6_Template_animateleave_cb() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(!ctx_r1.nzInline() && ctx_r1.datepickerAnimationLeave());
    });
    \u0275\u0275animateEnter(function NzDatePickerComponent_ng_template_6_Template_animateenter_cb() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(!ctx_r1.nzInline() && ctx_r1.datepickerAnimationEnter());
    });
    \u0275\u0275elementStart(1, "date-range-popup", 19);
    \u0275\u0275listener("panelModeChange", function NzDatePickerComponent_ng_template_6_Template_date_range_popup_panelModeChange_1_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPanelModeChange($event));
    })("calendarChange", function NzDatePickerComponent_ng_template_6_Template_date_range_popup_calendarChange_1_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCalendarChange($event));
    })("resultOk", function NzDatePickerComponent_ng_template_6_Template_date_range_popup_resultOk_1_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onResultOk());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r1.nzPopupStyle);
    \u0275\u0275classMap(ctx_r1.dropdownClass());
    \u0275\u0275classProp("ant-picker-dropdown-range", !ctx_r1.nzInline() && ctx_r1.isRange)("ant-picker-active-left", ctx_r1.datePickerService.activeInput === "left")("ant-picker-active-right", ctx_r1.datePickerService.activeInput === "right");
    \u0275\u0275advance();
    \u0275\u0275property("isRange", ctx_r1.isRange)("inline", ctx_r1.nzInline())("defaultPickerValue", ctx_r1.nzDefaultPickerValue)("showWeek", ctx_r1.nzShowWeekNumber || ctx_r1.nzMode === "week")("panelMode", ctx_r1.panelMode)("locale", ctx_r1.nzLocale == null ? null : ctx_r1.nzLocale.lang)("showToday", ctx_r1.nzMode === "date" && ctx_r1.nzShowToday && !ctx_r1.isRange && !ctx_r1.nzShowTime)("showNow", ctx_r1.nzMode === "date" && ctx_r1.nzShowNow && !ctx_r1.isRange && !!ctx_r1.nzShowTime)("showTime", ctx_r1.nzShowTime)("dateRender", ctx_r1.nzDateRender)("disabledDate", ctx_r1.nzDisabledDate)("disabledTime", ctx_r1.nzDisabledTime)("extraFooter", ctx_r1.extraFooter)("ranges", ctx_r1.nzRanges)("dir", ctx_r1.dir())("format", ctx_r1.nzFormat);
  }
}
function NzDatePickerComponent_ng_template_8_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NzDatePickerComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzDatePickerComponent_ng_template_8_ng_container_0_Template, 1, 0, "ng-container", 10);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const inlineMode_r5 = \u0275\u0275reference(7);
    \u0275\u0275property("ngTemplateOutlet", inlineMode_r5);
  }
}
var PREFIX_CLASS = "ant-picker";
var defaultDisabledTime = {
  nzDisabledHours() {
    return [];
  },
  nzDisabledMinutes() {
    return [];
  },
  nzDisabledSeconds() {
    return [];
  }
};
function getTimeConfig(value, disabledTime) {
  let disabledTimeConfig = disabledTime ? disabledTime(value && value.nativeDate) : {};
  disabledTimeConfig = __spreadValues(__spreadValues({}, defaultDisabledTime), disabledTimeConfig);
  return disabledTimeConfig;
}
function isTimeValidByConfig(value, disabledTimeConfig) {
  let invalidTime = false;
  if (value) {
    const hour = value.getHours();
    const minutes = value.getMinutes();
    const seconds = value.getSeconds();
    const disabledHours = disabledTimeConfig.nzDisabledHours();
    if (disabledHours.indexOf(hour) === -1) {
      const disabledMinutes = disabledTimeConfig.nzDisabledMinutes(hour);
      if (disabledMinutes.indexOf(minutes) === -1) {
        const disabledSeconds = disabledTimeConfig.nzDisabledSeconds(hour, minutes);
        invalidTime = disabledSeconds.indexOf(seconds) !== -1;
      } else {
        invalidTime = true;
      }
    } else {
      invalidTime = true;
    }
  }
  return !invalidTime;
}
function isTimeValid(value, disabledTime) {
  const disabledTimeConfig = getTimeConfig(value, disabledTime);
  return isTimeValidByConfig(value, disabledTimeConfig);
}
function isAllowedDate(value, disabledDate, disabledTime) {
  if (!value) {
    return false;
  }
  if (disabledDate) {
    if (disabledDate(value.nativeDate)) {
      return false;
    }
  }
  if (disabledTime) {
    if (!isTimeValid(value, disabledTime)) {
      return false;
    }
  }
  return true;
}
function transCompatFormat(format) {
  return format && format.replace(/Y/g, "y").replace(/D/g, "d");
}
var _CalendarFooterComponent = class _CalendarFooterComponent {
  constructor() {
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "locale");
    __publicField(this, "showToday", false);
    __publicField(this, "showNow", false);
    __publicField(this, "hasTimePicker", false);
    __publicField(this, "isRange", false);
    __publicField(this, "okDisabled", false);
    __publicField(this, "disabledDate");
    __publicField(this, "extraFooter");
    __publicField(this, "rangeQuickSelector", null);
    __publicField(this, "clickOk", new EventEmitter());
    __publicField(this, "clickToday", new EventEmitter());
    __publicField(this, "prefixCls", PREFIX_CLASS);
    __publicField(this, "isTodayDisabled", false);
    __publicField(this, "todayTitle", "");
  }
  ngOnChanges(changes) {
    const now = /* @__PURE__ */ new Date();
    if (changes.disabledDate) {
      this.isTodayDisabled = !!(this.disabledDate && this.disabledDate(now));
    }
    if (changes.locale) {
      const dateFormat = transCompatFormat(this.locale.dateFormat);
      this.todayTitle = this.dateHelper.format(now, dateFormat);
    }
  }
  onClickToday() {
    const now = new CandyDate();
    this.clickToday.emit(now.clone());
  }
};
__publicField(_CalendarFooterComponent, "\u0275fac", function CalendarFooterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarFooterComponent)();
});
__publicField(_CalendarFooterComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _CalendarFooterComponent,
  selectors: [["calendar-footer"]],
  inputs: {
    locale: "locale",
    showToday: [2, "showToday", "showToday", booleanAttribute],
    showNow: [2, "showNow", "showNow", booleanAttribute],
    hasTimePicker: [2, "hasTimePicker", "hasTimePicker", booleanAttribute],
    isRange: [2, "isRange", "isRange", booleanAttribute],
    okDisabled: [2, "okDisabled", "okDisabled", booleanAttribute],
    disabledDate: "disabledDate",
    extraFooter: "extraFooter",
    rangeQuickSelector: "rangeQuickSelector"
  },
  outputs: {
    clickOk: "clickOk",
    clickToday: "clickToday"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 4,
  vars: 6,
  consts: [[3, "class"], ["role", "button", 3, "class", "title"], [3, "nzStringTemplateOutlet"], ["role", "button", 3, "click", "title"], [4, "ngTemplateOutlet"], [3, "click"], ["nz-button", "", "type", "button", "nzType", "primary", "nzSize", "small", 3, "click", "disabled"]],
  template: function CalendarFooterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div");
      \u0275\u0275conditionalCreate(1, CalendarFooterComponent_Conditional_1_Template, 2, 4, "div", 0);
      \u0275\u0275conditionalCreate(2, CalendarFooterComponent_Conditional_2_Template, 2, 7, "a", 1);
      \u0275\u0275conditionalCreate(3, CalendarFooterComponent_Conditional_3_Template, 4, 6, "ul", 0);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-footer"));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.extraFooter ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showToday ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasTimePicker || ctx.rangeQuickSelector ? 3 : -1);
    }
  },
  dependencies: [NgTemplateOutlet, NzButtonModule, NzButtonComponent, NzTransitionPatchDirective, NzWaveDirective, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var CalendarFooterComponent = _CalendarFooterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarFooterComponent, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "calendar-footer",
      imports: [NgTemplateOutlet, NzButtonModule, NzStringTemplateOutletDirective],
      template: `
    <div class="{{ prefixCls }}-footer">
      @if (extraFooter) {
        <div class="{{ prefixCls }}-footer-extra">
          <ng-template [nzStringTemplateOutlet]="extraFooter">{{ extraFooter }}</ng-template>
        </div>
      }

      @if (showToday) {
        <a
          class="{{ prefixCls }}-today-btn {{ isTodayDisabled ? prefixCls + '-today-btn-disabled' : '' }}"
          role="button"
          (click)="isTodayDisabled ? null : onClickToday()"
          title="{{ todayTitle }}"
        >
          {{ locale.today }}
        </a>
      }

      @if (hasTimePicker || rangeQuickSelector) {
        <ul class="{{ prefixCls }}-ranges">
          <ng-container *ngTemplateOutlet="rangeQuickSelector" />
          @if (showNow) {
            <li class="{{ prefixCls }}-now">
              <a class="{{ prefixCls }}-now-btn" (click)="isTodayDisabled ? null : onClickToday()">
                {{ locale.now }}
              </a>
            </li>
          }

          @if (hasTimePicker) {
            <li class="{{ prefixCls }}-ok">
              <button
                nz-button
                type="button"
                nzType="primary"
                nzSize="small"
                [disabled]="okDisabled"
                (click)="okDisabled ? null : clickOk.emit()"
              >
                {{ locale.ok }}
              </button>
            </li>
          }
        </ul>
      }
    </div>
  `,
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, {
    locale: [{
      type: Input
    }],
    showToday: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showNow: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hasTimePicker: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isRange: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    okDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabledDate: [{
      type: Input
    }],
    extraFooter: [{
      type: Input
    }],
    rangeQuickSelector: [{
      type: Input
    }],
    clickOk: [{
      type: Output
    }],
    clickToday: [{
      type: Output
    }]
  });
})();
var _DatePickerService = class _DatePickerService {
  constructor() {
    __publicField(this, "initialValue");
    __publicField(this, "value");
    __publicField(this, "activeDate");
    __publicField(this, "activeInput", "left");
    __publicField(this, "arrowLeft", 0);
    __publicField(this, "isRange", false);
    __publicField(this, "valueChange$", new ReplaySubject(1));
    __publicField(this, "emitValue$", new Subject());
    __publicField(this, "inputPartChange$", new Subject());
  }
  initValue(reset = false) {
    if (reset) {
      this.initialValue = this.isRange ? [] : null;
    }
    this.setValue(this.initialValue);
  }
  hasValue(value = this.value) {
    if (Array.isArray(value)) {
      return !!value[0] || !!value[1];
    } else {
      return !!value;
    }
  }
  makeValue(value) {
    if (this.isRange) {
      return value ? value.map((val) => new CandyDate(val)) : [];
    } else {
      return value ? new CandyDate(value) : null;
    }
  }
  setActiveDate(value, hasTimePicker = false, mode = "month") {
    const parentPanels = {
      date: "month",
      month: "year",
      quarter: "year",
      year: "decade"
    };
    if (this.isRange) {
      this.activeDate = normalizeRangeValue(value, hasTimePicker, parentPanels[mode], this.activeInput);
    } else {
      this.activeDate = cloneDate(value);
    }
  }
  setValue(value) {
    this.value = value;
    this.valueChange$.next(this.value);
  }
  getActiveIndex(part = this.activeInput) {
    return {
      left: 0,
      right: 1
    }[part];
  }
  ngOnDestroy() {
    this.valueChange$.complete();
    this.emitValue$.complete();
    this.inputPartChange$.complete();
  }
};
__publicField(_DatePickerService, "\u0275fac", function DatePickerService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DatePickerService)();
});
__publicField(_DatePickerService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _DatePickerService,
  factory: _DatePickerService.\u0275fac
}));
var DatePickerService = _DatePickerService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatePickerService, [{
    type: Injectable
  }], null, null);
})();
var _AbstractPanelHeader = class _AbstractPanelHeader {
  constructor() {
    __publicField(this, "prefixCls", `ant-picker-header`);
    __publicField(this, "selectors", []);
    __publicField(this, "mode");
    __publicField(this, "value");
    __publicField(this, "locale");
    __publicField(this, "showSuperPreBtn", true);
    __publicField(this, "showSuperNextBtn", true);
    __publicField(this, "showPreBtn", true);
    __publicField(this, "showNextBtn", true);
    __publicField(this, "panelChange", new EventEmitter());
    __publicField(this, "valueChange", new EventEmitter());
  }
  superPreviousTitle() {
    return this.locale.previousYear;
  }
  previousTitle() {
    return this.locale.previousMonth;
  }
  superNextTitle() {
    return this.locale.nextYear;
  }
  nextTitle() {
    return this.locale.nextMonth;
  }
  superPrevious() {
    this.changeValue(this.value.addYears(-1));
  }
  superNext() {
    this.changeValue(this.value.addYears(1));
  }
  previous() {
    this.changeValue(this.value.addMonths(-1));
  }
  next() {
    this.changeValue(this.value.addMonths(1));
  }
  changeValue(value) {
    if (this.value !== value) {
      this.value = value;
      this.valueChange.emit(this.value);
      this.changeMode(this.mode);
      this.render();
    }
  }
  changeMode(mode) {
    this.panelChange.emit({
      mode,
      date: this.value.nativeDate
    });
  }
  render() {
    if (this.value) {
      this.selectors = this.getSelectors();
    }
  }
  ngOnInit() {
    if (!this.value) {
      this.value = new CandyDate();
    }
    this.selectors = this.getSelectors();
  }
  ngOnChanges(changes) {
    if (changes.value || changes.locale) {
      this.render();
    }
  }
  trackBySelector(selector) {
    return `${selector.title}-${selector.label}`;
  }
};
__publicField(_AbstractPanelHeader, "\u0275fac", function AbstractPanelHeader_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AbstractPanelHeader)();
});
__publicField(_AbstractPanelHeader, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _AbstractPanelHeader,
  inputs: {
    value: "value",
    locale: "locale",
    showSuperPreBtn: [2, "showSuperPreBtn", "showSuperPreBtn", booleanAttribute],
    showSuperNextBtn: [2, "showSuperNextBtn", "showSuperNextBtn", booleanAttribute],
    showPreBtn: [2, "showPreBtn", "showPreBtn", booleanAttribute],
    showNextBtn: [2, "showNextBtn", "showNextBtn", booleanAttribute]
  },
  outputs: {
    panelChange: "panelChange",
    valueChange: "valueChange"
  },
  features: [\u0275\u0275NgOnChangesFeature]
}));
var AbstractPanelHeader = _AbstractPanelHeader;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractPanelHeader, [{
    type: Directive
  }], null, {
    value: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    showSuperPreBtn: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showSuperNextBtn: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showPreBtn: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showNextBtn: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    panelChange: [{
      type: Output
    }],
    valueChange: [{
      type: Output
    }]
  });
})();
var _DecadeHeaderComponent = class _DecadeHeaderComponent extends AbstractPanelHeader {
  constructor() {
    super(...arguments);
    __publicField(this, "mode", "decade");
  }
  previous() {
  }
  next() {
  }
  get startYear() {
    return parseInt(`${this.value.getYear() / 100}`, 10) * 100;
  }
  get endYear() {
    return this.startYear + 99;
  }
  superPrevious() {
    this.changeValue(this.value.addYears(-100));
  }
  superNext() {
    this.changeValue(this.value.addYears(100));
  }
  getSelectors() {
    return [{
      className: `${this.prefixCls}-decade-btn`,
      title: "",
      onClick: () => {
      },
      label: `${this.startYear}-${this.endYear}`
    }];
  }
};
__publicField(_DecadeHeaderComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275DecadeHeaderComponent_BaseFactory;
  return function DecadeHeaderComponent_Factory(__ngFactoryType__) {
    return (\u0275DecadeHeaderComponent_BaseFactory || (\u0275DecadeHeaderComponent_BaseFactory = \u0275\u0275getInheritedFactory(_DecadeHeaderComponent)))(__ngFactoryType__ || _DecadeHeaderComponent);
  };
})());
__publicField(_DecadeHeaderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _DecadeHeaderComponent,
  selectors: [["decade-header"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 12,
  vars: 33,
  consts: [["role", "button", "type", "button", "tabindex", "-1", 3, "click", "title"], [1, "ant-picker-super-prev-icon"], [1, "ant-picker-prev-icon"], ["role", "button", "type", "button", 3, "class", "title"], [1, "ant-picker-next-icon"], [1, "ant-picker-super-next-icon"], ["role", "button", "type", "button", 3, "click", "title"]],
  template: function DecadeHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div")(1, "button", 0);
      \u0275\u0275domListener("click", function DecadeHeaderComponent_Template_button_click_1_listener() {
        return ctx.superPrevious();
      });
      \u0275\u0275domElement(2, "span", 1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "button", 0);
      \u0275\u0275domListener("click", function DecadeHeaderComponent_Template_button_click_3_listener() {
        return ctx.previous();
      });
      \u0275\u0275domElement(4, "span", 2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "div");
      \u0275\u0275repeaterCreate(6, DecadeHeaderComponent_For_7_Template, 2, 5, "button", 3, _forTrack05, true);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "button", 0);
      \u0275\u0275domListener("click", function DecadeHeaderComponent_Template_button_click_8_listener() {
        return ctx.next();
      });
      \u0275\u0275domElement(9, "span", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "button", 0);
      \u0275\u0275domListener("click", function DecadeHeaderComponent_Template_button_click_10_listener() {
        return ctx.superNext();
      });
      \u0275\u0275domElement(11, "span", 5);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.prefixCls);
      \u0275\u0275advance();
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superPreviousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.previousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-view"));
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.selectors);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.nextTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superNextTitle()));
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var DecadeHeaderComponent = _DecadeHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DecadeHeaderComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "decade-header",
      template: `<div class="{{ prefixCls }}">
  <button
    [style.visibility]="showSuperPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-prev-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superPreviousTitle() }}"
    (click)="superPrevious()"
  >
    <span class="ant-picker-super-prev-icon"></span>
  </button>
  <button
    [style.visibility]="showPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-prev-btn"
    role="button"
    type="button"
    title="{{ previousTitle() }}"
    tabindex="-1"
    (click)="previous()"
  >
    <span class="ant-picker-prev-icon"></span>
  </button>

  <div class="{{ prefixCls }}-view">
    @for (selector of selectors; track trackBySelector(selector)) {
      <button
        class="{{ selector.className }}"
        role="button"
        type="button"
        title="{{ selector.title || null }}"
        (click)="selector.onClick()"
      >
        {{ selector.label }}
      </button>
    }
  </div>
  <button
    [style.visibility]="showNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ nextTitle() }}"
    (click)="next()"
  >
    <span class="ant-picker-next-icon"></span>
  </button>
  <button
    [style.visibility]="showSuperNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superNextTitle() }}"
    (click)="superNext()"
  >
    <span class="ant-picker-super-next-icon"></span>
  </button>
</div>
`
    }]
  }], null, null);
})();
var _AbstractTable = class _AbstractTable {
  constructor() {
    __publicField(this, "headRow", []);
    __publicField(this, "bodyRows", []);
    __publicField(this, "MAX_ROW", 6);
    __publicField(this, "MAX_COL", 7);
    __publicField(this, "prefixCls", "ant-picker");
    __publicField(this, "value");
    __publicField(this, "locale");
    __publicField(this, "activeDate", new CandyDate());
    __publicField(this, "showWeek", false);
    __publicField(this, "selectedValue", []);
    // Range ONLY
    __publicField(this, "hoverValue", []);
    // Range ONLY
    __publicField(this, "disabledDate");
    __publicField(this, "cellRender");
    __publicField(this, "fullCellRender");
    __publicField(this, "canSelectWeek", false);
    __publicField(this, "valueChange", new EventEmitter());
    __publicField(this, "cellHover", new EventEmitter());
  }
  // Emitted when hover on a day by mouse enter
  render() {
    if (this.activeDate) {
      this.headRow = this.makeHeadRow();
      this.bodyRows = this.makeBodyRows();
    }
  }
  hasRangeValue() {
    var _a, _b;
    return ((_a = this.selectedValue) == null ? void 0 : _a.length) > 0 || ((_b = this.hoverValue) == null ? void 0 : _b.length) > 0;
  }
  getClassMap(cell) {
    return {
      [`ant-picker-cell`]: true,
      [`ant-picker-cell-in-view`]: true,
      [`ant-picker-cell-selected`]: cell.isSelected,
      [`ant-picker-cell-disabled`]: cell.isDisabled,
      [`ant-picker-cell-in-range`]: !!cell.isInSelectedRange,
      [`ant-picker-cell-range-start`]: !!cell.isSelectedStart,
      [`ant-picker-cell-range-end`]: !!cell.isSelectedEnd,
      [`ant-picker-cell-range-start-single`]: !!cell.isStartSingle,
      [`ant-picker-cell-range-end-single`]: !!cell.isEndSingle,
      [`ant-picker-cell-range-hover`]: !!cell.isInHoverRange,
      [`ant-picker-cell-range-hover-start`]: !!cell.isHoverStart,
      [`ant-picker-cell-range-hover-end`]: !!cell.isHoverEnd,
      [`ant-picker-cell-range-hover-edge-start`]: !!cell.isFirstCellInPanel,
      [`ant-picker-cell-range-hover-edge-end`]: !!cell.isLastCellInPanel,
      [`ant-picker-cell-range-start-near-hover`]: !!cell.isRangeStartNearHover,
      [`ant-picker-cell-range-end-near-hover`]: !!cell.isRangeEndNearHover
    };
  }
  ngOnInit() {
    this.render();
  }
  ngOnChanges(changes) {
    if (changes.activeDate && !changes.activeDate.currentValue) {
      this.activeDate = new CandyDate();
    }
    if (changes.disabledDate || changes.locale || changes.showWeek || changes.selectWeek || this.isDateRealChange(changes.activeDate) || this.isDateRealChange(changes.value) || this.isDateRealChange(changes.selectedValue) || this.isDateRealChange(changes.hoverValue)) {
      this.render();
    }
  }
  isDateRealChange(change) {
    if (change) {
      const previousValue = change.previousValue;
      const currentValue = change.currentValue;
      if (Array.isArray(currentValue)) {
        return !Array.isArray(previousValue) || currentValue.length !== previousValue.length || currentValue.some((value, index) => {
          const previousCandyDate = previousValue[index];
          return previousCandyDate instanceof CandyDate ? previousCandyDate.isSameDay(value) : previousCandyDate !== value;
        });
      } else {
        return !this.isSameDate(previousValue, currentValue);
      }
    }
    return false;
  }
  isSameDate(left, right) {
    return !left && !right || left && right && right.isSameDay(left);
  }
};
__publicField(_AbstractTable, "\u0275fac", function AbstractTable_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AbstractTable)();
});
__publicField(_AbstractTable, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _AbstractTable,
  inputs: {
    prefixCls: "prefixCls",
    value: "value",
    locale: "locale",
    activeDate: "activeDate",
    showWeek: [2, "showWeek", "showWeek", booleanAttribute],
    selectedValue: "selectedValue",
    hoverValue: "hoverValue",
    disabledDate: "disabledDate",
    cellRender: "cellRender",
    fullCellRender: "fullCellRender",
    canSelectWeek: [2, "canSelectWeek", "canSelectWeek", booleanAttribute]
  },
  outputs: {
    valueChange: "valueChange",
    cellHover: "cellHover"
  },
  features: [\u0275\u0275NgOnChangesFeature]
}));
var AbstractTable = _AbstractTable;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractTable, [{
    type: Directive
  }], null, {
    prefixCls: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    activeDate: [{
      type: Input
    }],
    showWeek: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectedValue: [{
      type: Input
    }],
    hoverValue: [{
      type: Input
    }],
    disabledDate: [{
      type: Input
    }],
    cellRender: [{
      type: Input
    }],
    fullCellRender: [{
      type: Input
    }],
    canSelectWeek: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    valueChange: [{
      type: Output
    }],
    cellHover: [{
      type: Output
    }]
  });
})();
var MAX_ROW = 4;
var MAX_COL = 3;
var _DecadeTableComponent = class _DecadeTableComponent extends AbstractTable {
  get startYear() {
    return parseInt(`${this.activeDate.getYear() / 100}`, 10) * 100;
  }
  get endYear() {
    return this.startYear + 99;
  }
  makeHeadRow() {
    return [];
  }
  makeBodyRows() {
    const decades = [];
    const currentYear = this.value && this.value.getYear();
    const startYear = this.startYear;
    const endYear = this.endYear;
    const previousYear = startYear - 10;
    let index = 0;
    for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
      const row = {
        dateCells: [],
        trackByIndex: rowIndex
      };
      for (let colIndex = 0; colIndex < MAX_COL; colIndex++) {
        const start = previousYear + index * 10;
        const end = previousYear + index * 10 + 9;
        const content = `${start}-${end}`;
        const cell = {
          trackByIndex: colIndex,
          value: this.activeDate.setYear(start).nativeDate,
          content,
          title: content,
          isDisabled: false,
          isSelected: currentYear >= start && currentYear <= end,
          isLowerThanStart: end < startYear,
          isBiggerThanEnd: start > endYear,
          classMap: {},
          onClick() {
          },
          onMouseEnter() {
          }
        };
        cell.classMap = this.getClassMap(cell);
        cell.onClick = () => this.chooseDecade(start);
        index++;
        row.dateCells.push(cell);
      }
      decades.push(row);
    }
    return decades;
  }
  getClassMap(cell) {
    return {
      [`${this.prefixCls}-cell`]: true,
      [`${this.prefixCls}-cell-in-view`]: !cell.isBiggerThanEnd && !cell.isLowerThanStart,
      [`${this.prefixCls}-cell-selected`]: cell.isSelected,
      [`${this.prefixCls}-cell-disabled`]: cell.isDisabled
    };
  }
  chooseDecade(year) {
    this.value = this.activeDate.setYear(year);
    this.valueChange.emit(this.value);
  }
};
__publicField(_DecadeTableComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275DecadeTableComponent_BaseFactory;
  return function DecadeTableComponent_Factory(__ngFactoryType__) {
    return (\u0275DecadeTableComponent_BaseFactory || (\u0275DecadeTableComponent_BaseFactory = \u0275\u0275getInheritedFactory(_DecadeTableComponent)))(__ngFactoryType__ || _DecadeTableComponent);
  };
})());
__publicField(_DecadeTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _DecadeTableComponent,
  selectors: [["decade-table"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 5,
  vars: 1,
  consts: [["cellspacing", "0", "role", "grid", 1, "ant-picker-content"], ["role", "row", 3, "class"], ["role", "row"], ["role", "columnheader"], ["role", "columnheader", 3, "title"], ["role", "gridcell", 3, "class"], ["role", "gridcell", 3, "title", "class"], ["role", "gridcell"], ["role", "gridcell", 3, "click", "mouseenter", "title"], [3, "class", "ant-picker-calendar-date-today"], [3, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [3, "class"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"]],
  template: function DecadeTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "table", 0);
      \u0275\u0275conditionalCreate(1, DecadeTableComponent_Conditional_1_Template, 5, 1, "thead");
      \u0275\u0275elementStart(2, "tbody");
      \u0275\u0275repeaterCreate(3, DecadeTableComponent_For_4_Template, 4, 3, "tr", 1, _forTrack1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.headRow && ctx.headRow.length > 0 ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.bodyRows);
    }
  },
  dependencies: [NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var DecadeTableComponent = _DecadeTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DecadeTableComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "decade-table",
      imports: [NzStringTemplateOutletDirective],
      template: `<table class="ant-picker-content" cellspacing="0" role="grid">
  @if (headRow && headRow.length > 0) {
    <thead>
      <tr role="row">
        @if (showWeek) {
          <th role="columnheader"></th>
        }
        @for (cell of headRow; track $index) {
          <th role="columnheader" [title]="cell.title"> {{ cell.content }}</th>
        }
      </tr>
    </thead>
  }

  <tbody>
    @for (row of bodyRows; track row.trackByIndex) {
      <tr [class]="row.classMap!" role="row">
        @if (row.weekNum) {
          <td role="gridcell" class="{{ prefixCls }}-cell-week"> {{ row.weekNum }}</td>
        }
        @for (cell of row.dateCells; track cell.trackByIndex) {
          <td
            [title]="cell.title"
            role="gridcell"
            [class]="cell.classMap!"
            (click)="cell.isDisabled ? null : cell.onClick()"
            (mouseenter)="cell.onMouseEnter()"
          >
            @switch (prefixCls) {
              @case ('ant-picker') {
                @if (cell.cellRender) {
                  <ng-template
                    [nzStringTemplateOutlet]="cell.cellRender"
                    [nzStringTemplateOutletContext]="{ $implicit: cell.value }"
                  >
                    {{ cell.cellRender }}
                  </ng-template>
                } @else {
                  <div
                    class="{{ prefixCls }}-cell-inner"
                    [attr.aria-selected]="cell.isSelected"
                    [attr.aria-disabled]="cell.isDisabled"
                  >
                    {{ cell.content }}
                  </div>
                }
              }
              @case ('ant-picker-calendar') {
                <div
                  class="{{ prefixCls }}-date ant-picker-cell-inner"
                  [class.ant-picker-calendar-date-today]="cell.isToday"
                >
                  @if (cell.fullCellRender) {
                    <ng-container *nzStringTemplateOutlet="cell.fullCellRender; context: { $implicit: cell.value }">
                      {{ cell.fullCellRender }}
                    </ng-container>
                  } @else {
                    <div class="{{ prefixCls }}-date-value">{{ cell.content }}</div>
                    <div class="{{ prefixCls }}-date-content">
                      <ng-container *nzStringTemplateOutlet="cell.cellRender; context: { $implicit: cell.value }">
                        {{ cell.cellRender }}
                      </ng-container>
                    </div>
                  }
                </div>
              }
            }
          </td>
        }
      </tr>
    }
  </tbody>
</table>
`
    }]
  }], null, null);
})();
var _YearHeaderComponent = class _YearHeaderComponent extends AbstractPanelHeader {
  constructor() {
    super(...arguments);
    __publicField(this, "mode", "year");
  }
  get startYear() {
    return parseInt(`${this.value.getYear() / 10}`, 10) * 10;
  }
  get endYear() {
    return this.startYear + 9;
  }
  superPrevious() {
    this.changeValue(this.value.addYears(-10));
  }
  superNext() {
    this.changeValue(this.value.addYears(10));
  }
  getSelectors() {
    return [{
      className: `${this.prefixCls}-year-btn`,
      title: "",
      onClick: () => {
        this.mode = "decade";
        this.changeMode("decade");
      },
      label: `${this.startYear}-${this.endYear}`
    }];
  }
};
__publicField(_YearHeaderComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275YearHeaderComponent_BaseFactory;
  return function YearHeaderComponent_Factory(__ngFactoryType__) {
    return (\u0275YearHeaderComponent_BaseFactory || (\u0275YearHeaderComponent_BaseFactory = \u0275\u0275getInheritedFactory(_YearHeaderComponent)))(__ngFactoryType__ || _YearHeaderComponent);
  };
})());
__publicField(_YearHeaderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _YearHeaderComponent,
  selectors: [["year-header"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 12,
  vars: 33,
  consts: [["role", "button", "type", "button", "tabindex", "-1", 3, "click", "title"], [1, "ant-picker-super-prev-icon"], [1, "ant-picker-prev-icon"], ["role", "button", "type", "button", 3, "class", "title"], [1, "ant-picker-next-icon"], [1, "ant-picker-super-next-icon"], ["role", "button", "type", "button", 3, "click", "title"]],
  template: function YearHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div")(1, "button", 0);
      \u0275\u0275domListener("click", function YearHeaderComponent_Template_button_click_1_listener() {
        return ctx.superPrevious();
      });
      \u0275\u0275domElement(2, "span", 1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "button", 0);
      \u0275\u0275domListener("click", function YearHeaderComponent_Template_button_click_3_listener() {
        return ctx.previous();
      });
      \u0275\u0275domElement(4, "span", 2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "div");
      \u0275\u0275repeaterCreate(6, YearHeaderComponent_For_7_Template, 2, 5, "button", 3, _forTrack05, true);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "button", 0);
      \u0275\u0275domListener("click", function YearHeaderComponent_Template_button_click_8_listener() {
        return ctx.next();
      });
      \u0275\u0275domElement(9, "span", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "button", 0);
      \u0275\u0275domListener("click", function YearHeaderComponent_Template_button_click_10_listener() {
        return ctx.superNext();
      });
      \u0275\u0275domElement(11, "span", 5);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.prefixCls);
      \u0275\u0275advance();
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superPreviousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.previousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-view"));
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.selectors);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.nextTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superNextTitle()));
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var YearHeaderComponent = _YearHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YearHeaderComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "year-header",
      template: `<div class="{{ prefixCls }}">
  <button
    [style.visibility]="showSuperPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-prev-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superPreviousTitle() }}"
    (click)="superPrevious()"
  >
    <span class="ant-picker-super-prev-icon"></span>
  </button>
  <button
    [style.visibility]="showPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-prev-btn"
    role="button"
    type="button"
    title="{{ previousTitle() }}"
    tabindex="-1"
    (click)="previous()"
  >
    <span class="ant-picker-prev-icon"></span>
  </button>

  <div class="{{ prefixCls }}-view">
    @for (selector of selectors; track trackBySelector(selector)) {
      <button
        class="{{ selector.className }}"
        role="button"
        type="button"
        title="{{ selector.title || null }}"
        (click)="selector.onClick()"
      >
        {{ selector.label }}
      </button>
    }
  </div>
  <button
    [style.visibility]="showNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ nextTitle() }}"
    (click)="next()"
  >
    <span class="ant-picker-next-icon"></span>
  </button>
  <button
    [style.visibility]="showSuperNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superNextTitle() }}"
    (click)="superNext()"
  >
    <span class="ant-picker-super-next-icon"></span>
  </button>
</div>
`
    }]
  }], null, null);
})();
var _YearTableComponent = class _YearTableComponent extends AbstractTable {
  constructor() {
    super(...arguments);
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "MAX_ROW", 4);
    __publicField(this, "MAX_COL", 3);
  }
  makeHeadRow() {
    return [];
  }
  makeBodyRows() {
    const currentYear = this.activeDate && this.activeDate.getYear();
    const startYear = parseInt(`${currentYear / 10}`, 10) * 10;
    const endYear = startYear + 9;
    const previousYear = startYear - 1;
    const years = [];
    let yearValue = 0;
    for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
      const row = {
        dateCells: [],
        trackByIndex: rowIndex
      };
      for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
        const yearNum = previousYear + yearValue;
        const year = this.activeDate.setYear(yearNum);
        const content = this.dateHelper.format(year.nativeDate, "yyyy");
        const isDisabled = this.isDisabledYear(year);
        const cell = {
          trackByIndex: colIndex,
          value: year.nativeDate,
          isDisabled,
          isSameDecade: yearNum >= startYear && yearNum <= endYear,
          isSelected: yearNum === (this.value && this.value.getYear()),
          content,
          title: content,
          classMap: {},
          isLastCellInPanel: year.getYear() === endYear,
          isFirstCellInPanel: year.getYear() === startYear,
          cellRender: valueFunctionProp(this.cellRender, year),
          // Customized content
          fullCellRender: valueFunctionProp(this.fullCellRender, year),
          onClick: () => this.chooseYear(cell.value.getFullYear()),
          // don't use yearValue here,
          onMouseEnter: () => this.cellHover.emit(year)
        };
        this.addCellProperty(cell, year);
        row.dateCells.push(cell);
        yearValue++;
      }
      years.push(row);
    }
    return years;
  }
  getClassMap(cell) {
    return __spreadProps(__spreadValues({}, super.getClassMap(cell)), {
      [`ant-picker-cell-in-view`]: !!cell.isSameDecade
    });
  }
  isDisabledYear(year) {
    if (!this.disabledDate) {
      return false;
    }
    const firstOfMonth = year.setMonth(0).setDate(1);
    for (let date = firstOfMonth; date.getYear() === year.getYear(); date = date.addDays(1)) {
      if (!this.disabledDate(date.nativeDate)) {
        return false;
      }
    }
    return true;
  }
  addCellProperty(cell, year) {
    if (this.hasRangeValue()) {
      const [startHover, endHover] = this.hoverValue;
      const [startSelected, endSelected] = this.selectedValue;
      if (startSelected == null ? void 0 : startSelected.isSameYear(year)) {
        cell.isSelectedStart = true;
        cell.isSelected = true;
      }
      if (endSelected == null ? void 0 : endSelected.isSameYear(year)) {
        cell.isSelectedEnd = true;
        cell.isSelected = true;
      }
      if (startHover && endHover) {
        cell.isHoverStart = startHover.isSameYear(year);
        cell.isHoverEnd = endHover.isSameYear(year);
        cell.isInHoverRange = startHover.isBeforeYear(year) && year.isBeforeYear(endHover);
      }
      cell.isStartSingle = startSelected && !endSelected;
      cell.isEndSingle = !startSelected && endSelected;
      cell.isInSelectedRange = (startSelected == null ? void 0 : startSelected.isBeforeYear(year)) && (year == null ? void 0 : year.isBeforeYear(endSelected));
      cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
      cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
    } else if (year.isSameYear(this.value)) {
      cell.isSelected = true;
    }
    cell.classMap = this.getClassMap(cell);
  }
  chooseYear(year) {
    this.value = this.activeDate.setYear(year);
    this.valueChange.emit(this.value);
    this.render();
  }
};
__publicField(_YearTableComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275YearTableComponent_BaseFactory;
  return function YearTableComponent_Factory(__ngFactoryType__) {
    return (\u0275YearTableComponent_BaseFactory || (\u0275YearTableComponent_BaseFactory = \u0275\u0275getInheritedFactory(_YearTableComponent)))(__ngFactoryType__ || _YearTableComponent);
  };
})());
__publicField(_YearTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _YearTableComponent,
  selectors: [["year-table"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 5,
  vars: 1,
  consts: [["cellspacing", "0", "role", "grid", 1, "ant-picker-content"], ["role", "row", 3, "class"], ["role", "row"], ["role", "columnheader"], ["role", "columnheader", 3, "title"], ["role", "gridcell", 3, "class"], ["role", "gridcell", 3, "title", "class"], ["role", "gridcell"], ["role", "gridcell", 3, "click", "mouseenter", "title"], [3, "class", "ant-picker-calendar-date-today"], [3, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [3, "class"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"]],
  template: function YearTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "table", 0);
      \u0275\u0275conditionalCreate(1, YearTableComponent_Conditional_1_Template, 5, 1, "thead");
      \u0275\u0275elementStart(2, "tbody");
      \u0275\u0275repeaterCreate(3, YearTableComponent_For_4_Template, 4, 3, "tr", 1, _forTrack1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.headRow && ctx.headRow.length > 0 ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.bodyRows);
    }
  },
  dependencies: [NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var YearTableComponent = _YearTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YearTableComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "year-table",
      imports: [NzStringTemplateOutletDirective],
      template: `<table class="ant-picker-content" cellspacing="0" role="grid">
  @if (headRow && headRow.length > 0) {
    <thead>
      <tr role="row">
        @if (showWeek) {
          <th role="columnheader"></th>
        }
        @for (cell of headRow; track $index) {
          <th role="columnheader" [title]="cell.title"> {{ cell.content }}</th>
        }
      </tr>
    </thead>
  }

  <tbody>
    @for (row of bodyRows; track row.trackByIndex) {
      <tr [class]="row.classMap!" role="row">
        @if (row.weekNum) {
          <td role="gridcell" class="{{ prefixCls }}-cell-week"> {{ row.weekNum }}</td>
        }
        @for (cell of row.dateCells; track cell.trackByIndex) {
          <td
            [title]="cell.title"
            role="gridcell"
            [class]="cell.classMap!"
            (click)="cell.isDisabled ? null : cell.onClick()"
            (mouseenter)="cell.onMouseEnter()"
          >
            @switch (prefixCls) {
              @case ('ant-picker') {
                @if (cell.cellRender) {
                  <ng-template
                    [nzStringTemplateOutlet]="cell.cellRender"
                    [nzStringTemplateOutletContext]="{ $implicit: cell.value }"
                  >
                    {{ cell.cellRender }}
                  </ng-template>
                } @else {
                  <div
                    class="{{ prefixCls }}-cell-inner"
                    [attr.aria-selected]="cell.isSelected"
                    [attr.aria-disabled]="cell.isDisabled"
                  >
                    {{ cell.content }}
                  </div>
                }
              }
              @case ('ant-picker-calendar') {
                <div
                  class="{{ prefixCls }}-date ant-picker-cell-inner"
                  [class.ant-picker-calendar-date-today]="cell.isToday"
                >
                  @if (cell.fullCellRender) {
                    <ng-container *nzStringTemplateOutlet="cell.fullCellRender; context: { $implicit: cell.value }">
                      {{ cell.fullCellRender }}
                    </ng-container>
                  } @else {
                    <div class="{{ prefixCls }}-date-value">{{ cell.content }}</div>
                    <div class="{{ prefixCls }}-date-content">
                      <ng-container *nzStringTemplateOutlet="cell.cellRender; context: { $implicit: cell.value }">
                        {{ cell.cellRender }}
                      </ng-container>
                    </div>
                  }
                </div>
              }
            }
          </td>
        }
      </tr>
    }
  </tbody>
</table>
`
    }]
  }], null, null);
})();
var _QuarterHeaderComponent = class _QuarterHeaderComponent extends AbstractPanelHeader {
  constructor() {
    super(...arguments);
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "mode", "quarter");
  }
  getSelectors() {
    return [{
      className: `${this.prefixCls}-quarter-btn`,
      title: this.locale.yearSelect,
      onClick: () => {
        this.mode = "year";
        this.changeMode("year");
      },
      label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
    }];
  }
};
__publicField(_QuarterHeaderComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275QuarterHeaderComponent_BaseFactory;
  return function QuarterHeaderComponent_Factory(__ngFactoryType__) {
    return (\u0275QuarterHeaderComponent_BaseFactory || (\u0275QuarterHeaderComponent_BaseFactory = \u0275\u0275getInheritedFactory(_QuarterHeaderComponent)))(__ngFactoryType__ || _QuarterHeaderComponent);
  };
})());
__publicField(_QuarterHeaderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _QuarterHeaderComponent,
  selectors: [["quarter-header"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 12,
  vars: 33,
  consts: [["role", "button", "type", "button", "tabindex", "-1", 3, "click", "title"], [1, "ant-picker-super-prev-icon"], [1, "ant-picker-prev-icon"], ["role", "button", "type", "button", 3, "class", "title"], [1, "ant-picker-next-icon"], [1, "ant-picker-super-next-icon"], ["role", "button", "type", "button", 3, "click", "title"]],
  template: function QuarterHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div")(1, "button", 0);
      \u0275\u0275domListener("click", function QuarterHeaderComponent_Template_button_click_1_listener() {
        return ctx.superPrevious();
      });
      \u0275\u0275domElement(2, "span", 1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "button", 0);
      \u0275\u0275domListener("click", function QuarterHeaderComponent_Template_button_click_3_listener() {
        return ctx.previous();
      });
      \u0275\u0275domElement(4, "span", 2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "div");
      \u0275\u0275repeaterCreate(6, QuarterHeaderComponent_For_7_Template, 2, 5, "button", 3, _forTrack05, true);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "button", 0);
      \u0275\u0275domListener("click", function QuarterHeaderComponent_Template_button_click_8_listener() {
        return ctx.next();
      });
      \u0275\u0275domElement(9, "span", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "button", 0);
      \u0275\u0275domListener("click", function QuarterHeaderComponent_Template_button_click_10_listener() {
        return ctx.superNext();
      });
      \u0275\u0275domElement(11, "span", 5);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.prefixCls);
      \u0275\u0275advance();
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superPreviousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.previousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-view"));
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.selectors);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.nextTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superNextTitle()));
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var QuarterHeaderComponent = _QuarterHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuarterHeaderComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "quarter-header",
      template: `<div class="{{ prefixCls }}">
  <button
    [style.visibility]="showSuperPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-prev-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superPreviousTitle() }}"
    (click)="superPrevious()"
  >
    <span class="ant-picker-super-prev-icon"></span>
  </button>
  <button
    [style.visibility]="showPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-prev-btn"
    role="button"
    type="button"
    title="{{ previousTitle() }}"
    tabindex="-1"
    (click)="previous()"
  >
    <span class="ant-picker-prev-icon"></span>
  </button>

  <div class="{{ prefixCls }}-view">
    @for (selector of selectors; track trackBySelector(selector)) {
      <button
        class="{{ selector.className }}"
        role="button"
        type="button"
        title="{{ selector.title || null }}"
        (click)="selector.onClick()"
      >
        {{ selector.label }}
      </button>
    }
  </div>
  <button
    [style.visibility]="showNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ nextTitle() }}"
    (click)="next()"
  >
    <span class="ant-picker-next-icon"></span>
  </button>
  <button
    [style.visibility]="showSuperNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superNextTitle() }}"
    (click)="superNext()"
  >
    <span class="ant-picker-super-next-icon"></span>
  </button>
</div>
`
    }]
  }], null, null);
})();
var _QuarterTableComponent = class _QuarterTableComponent extends AbstractTable {
  constructor() {
    super(...arguments);
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "MAX_ROW", 1);
    __publicField(this, "MAX_COL", 4);
  }
  changeValueFromInside(value) {
    this.activeDate = value.clone();
    this.valueChange.emit(this.activeDate);
    if (!this.activeDate.isSameQuarter(this.value)) {
      this.render();
    }
  }
  makeHeadRow() {
    return [];
  }
  makeBodyRows() {
    const dateCells = [];
    const months = [{
      dateCells,
      trackByIndex: 0
    }];
    let quarterValue = 1;
    for (let colIndex = 1; colIndex <= this.MAX_COL; colIndex++, quarterValue++) {
      const date = this.activeDate.setQuarter(quarterValue);
      const isDisabled = this.isDisabledQuarter(date);
      const content = this.dateHelper.format(date.nativeDate, "[Q]Q");
      const cell = {
        trackByIndex: colIndex,
        value: date.nativeDate,
        isDisabled,
        isSelected: date.isSameQuarter(this.value),
        content,
        title: content,
        classMap: {},
        cellRender: valueFunctionProp(this.cellRender, date),
        fullCellRender: valueFunctionProp(this.fullCellRender, date),
        onClick: () => this.changeValueFromInside(date),
        onMouseEnter: () => this.cellHover.emit(date)
      };
      this.addCellProperty(cell, date);
      dateCells.push(cell);
    }
    return months;
  }
  isDisabledQuarter(quarter) {
    if (!this.disabledDate) {
      return false;
    }
    const firstDayOfQuarter = new CandyDate(startOfQuarter(quarter.nativeDate));
    for (let date = firstDayOfQuarter; date.getQuarter() === quarter.getQuarter(); date = date.addMonths(1)) {
      if (!this.disabledDate(date.nativeDate)) {
        return false;
      }
    }
    return true;
  }
  addCellProperty(cell, month) {
    if (this.hasRangeValue()) {
      const [startHover, endHover] = this.hoverValue;
      const [startSelected, endSelected] = this.selectedValue;
      if (startSelected == null ? void 0 : startSelected.isSameQuarter(month)) {
        cell.isSelectedStart = true;
        cell.isSelected = true;
      }
      if (endSelected == null ? void 0 : endSelected.isSameQuarter(month)) {
        cell.isSelectedEnd = true;
        cell.isSelected = true;
      }
      if (startHover && endHover) {
        cell.isHoverStart = startHover.isSameQuarter(month);
        cell.isHoverEnd = endHover.isSameQuarter(month);
        cell.isLastCellInPanel = month.getQuarter() === 4;
        cell.isFirstCellInPanel = month.getQuarter() === 1;
        cell.isInHoverRange = startHover.isBeforeQuarter(month) && month.isBeforeQuarter(endHover);
      }
      cell.isStartSingle = startSelected && !endSelected;
      cell.isEndSingle = !startSelected && endSelected;
      cell.isInSelectedRange = (startSelected == null ? void 0 : startSelected.isBeforeQuarter(month)) && (month == null ? void 0 : month.isBeforeQuarter(endSelected));
      cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
      cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
    } else if (month.isSameQuarter(this.value)) {
      cell.isSelected = true;
    }
    cell.classMap = this.getClassMap(cell);
  }
};
__publicField(_QuarterTableComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275QuarterTableComponent_BaseFactory;
  return function QuarterTableComponent_Factory(__ngFactoryType__) {
    return (\u0275QuarterTableComponent_BaseFactory || (\u0275QuarterTableComponent_BaseFactory = \u0275\u0275getInheritedFactory(_QuarterTableComponent)))(__ngFactoryType__ || _QuarterTableComponent);
  };
})());
__publicField(_QuarterTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _QuarterTableComponent,
  selectors: [["quarter-table"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 5,
  vars: 1,
  consts: [["cellspacing", "0", "role", "grid", 1, "ant-picker-content"], ["role", "row", 3, "class"], ["role", "row"], ["role", "columnheader"], ["role", "columnheader", 3, "title"], ["role", "gridcell", 3, "class"], ["role", "gridcell", 3, "title", "class"], ["role", "gridcell"], ["role", "gridcell", 3, "click", "mouseenter", "title"], [3, "class", "ant-picker-calendar-date-today"], [3, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [3, "class"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"]],
  template: function QuarterTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "table", 0);
      \u0275\u0275conditionalCreate(1, QuarterTableComponent_Conditional_1_Template, 5, 1, "thead");
      \u0275\u0275elementStart(2, "tbody");
      \u0275\u0275repeaterCreate(3, QuarterTableComponent_For_4_Template, 4, 3, "tr", 1, _forTrack1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.headRow && ctx.headRow.length > 0 ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.bodyRows);
    }
  },
  dependencies: [NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var QuarterTableComponent = _QuarterTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuarterTableComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "quarter-table",
      imports: [NzStringTemplateOutletDirective],
      template: `<table class="ant-picker-content" cellspacing="0" role="grid">
  @if (headRow && headRow.length > 0) {
    <thead>
      <tr role="row">
        @if (showWeek) {
          <th role="columnheader"></th>
        }
        @for (cell of headRow; track $index) {
          <th role="columnheader" [title]="cell.title"> {{ cell.content }}</th>
        }
      </tr>
    </thead>
  }

  <tbody>
    @for (row of bodyRows; track row.trackByIndex) {
      <tr [class]="row.classMap!" role="row">
        @if (row.weekNum) {
          <td role="gridcell" class="{{ prefixCls }}-cell-week"> {{ row.weekNum }}</td>
        }
        @for (cell of row.dateCells; track cell.trackByIndex) {
          <td
            [title]="cell.title"
            role="gridcell"
            [class]="cell.classMap!"
            (click)="cell.isDisabled ? null : cell.onClick()"
            (mouseenter)="cell.onMouseEnter()"
          >
            @switch (prefixCls) {
              @case ('ant-picker') {
                @if (cell.cellRender) {
                  <ng-template
                    [nzStringTemplateOutlet]="cell.cellRender"
                    [nzStringTemplateOutletContext]="{ $implicit: cell.value }"
                  >
                    {{ cell.cellRender }}
                  </ng-template>
                } @else {
                  <div
                    class="{{ prefixCls }}-cell-inner"
                    [attr.aria-selected]="cell.isSelected"
                    [attr.aria-disabled]="cell.isDisabled"
                  >
                    {{ cell.content }}
                  </div>
                }
              }
              @case ('ant-picker-calendar') {
                <div
                  class="{{ prefixCls }}-date ant-picker-cell-inner"
                  [class.ant-picker-calendar-date-today]="cell.isToday"
                >
                  @if (cell.fullCellRender) {
                    <ng-container *nzStringTemplateOutlet="cell.fullCellRender; context: { $implicit: cell.value }">
                      {{ cell.fullCellRender }}
                    </ng-container>
                  } @else {
                    <div class="{{ prefixCls }}-date-value">{{ cell.content }}</div>
                    <div class="{{ prefixCls }}-date-content">
                      <ng-container *nzStringTemplateOutlet="cell.cellRender; context: { $implicit: cell.value }">
                        {{ cell.cellRender }}
                      </ng-container>
                    </div>
                  }
                </div>
              }
            }
          </td>
        }
      </tr>
    }
  </tbody>
</table>
`
    }]
  }], null, null);
})();
var _MonthHeaderComponent = class _MonthHeaderComponent extends AbstractPanelHeader {
  constructor() {
    super(...arguments);
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "mode", "month");
  }
  getSelectors() {
    return [{
      className: `${this.prefixCls}-month-btn`,
      title: this.locale.yearSelect,
      onClick: () => {
        this.mode = "year";
        this.changeMode("year");
      },
      label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
    }];
  }
};
__publicField(_MonthHeaderComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275MonthHeaderComponent_BaseFactory;
  return function MonthHeaderComponent_Factory(__ngFactoryType__) {
    return (\u0275MonthHeaderComponent_BaseFactory || (\u0275MonthHeaderComponent_BaseFactory = \u0275\u0275getInheritedFactory(_MonthHeaderComponent)))(__ngFactoryType__ || _MonthHeaderComponent);
  };
})());
__publicField(_MonthHeaderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MonthHeaderComponent,
  selectors: [["month-header"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 12,
  vars: 33,
  consts: [["role", "button", "type", "button", "tabindex", "-1", 3, "click", "title"], [1, "ant-picker-super-prev-icon"], [1, "ant-picker-prev-icon"], ["role", "button", "type", "button", 3, "class", "title"], [1, "ant-picker-next-icon"], [1, "ant-picker-super-next-icon"], ["role", "button", "type", "button", 3, "click", "title"]],
  template: function MonthHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div")(1, "button", 0);
      \u0275\u0275domListener("click", function MonthHeaderComponent_Template_button_click_1_listener() {
        return ctx.superPrevious();
      });
      \u0275\u0275domElement(2, "span", 1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "button", 0);
      \u0275\u0275domListener("click", function MonthHeaderComponent_Template_button_click_3_listener() {
        return ctx.previous();
      });
      \u0275\u0275domElement(4, "span", 2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "div");
      \u0275\u0275repeaterCreate(6, MonthHeaderComponent_For_7_Template, 2, 5, "button", 3, _forTrack05, true);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "button", 0);
      \u0275\u0275domListener("click", function MonthHeaderComponent_Template_button_click_8_listener() {
        return ctx.next();
      });
      \u0275\u0275domElement(9, "span", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "button", 0);
      \u0275\u0275domListener("click", function MonthHeaderComponent_Template_button_click_10_listener() {
        return ctx.superNext();
      });
      \u0275\u0275domElement(11, "span", 5);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.prefixCls);
      \u0275\u0275advance();
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superPreviousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.previousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-view"));
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.selectors);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.nextTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superNextTitle()));
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var MonthHeaderComponent = _MonthHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MonthHeaderComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "month-header",
      template: `<div class="{{ prefixCls }}">
  <button
    [style.visibility]="showSuperPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-prev-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superPreviousTitle() }}"
    (click)="superPrevious()"
  >
    <span class="ant-picker-super-prev-icon"></span>
  </button>
  <button
    [style.visibility]="showPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-prev-btn"
    role="button"
    type="button"
    title="{{ previousTitle() }}"
    tabindex="-1"
    (click)="previous()"
  >
    <span class="ant-picker-prev-icon"></span>
  </button>

  <div class="{{ prefixCls }}-view">
    @for (selector of selectors; track trackBySelector(selector)) {
      <button
        class="{{ selector.className }}"
        role="button"
        type="button"
        title="{{ selector.title || null }}"
        (click)="selector.onClick()"
      >
        {{ selector.label }}
      </button>
    }
  </div>
  <button
    [style.visibility]="showNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ nextTitle() }}"
    (click)="next()"
  >
    <span class="ant-picker-next-icon"></span>
  </button>
  <button
    [style.visibility]="showSuperNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superNextTitle() }}"
    (click)="superNext()"
  >
    <span class="ant-picker-super-next-icon"></span>
  </button>
</div>
`
    }]
  }], null, null);
})();
var _MonthTableComponent = class _MonthTableComponent extends AbstractTable {
  constructor() {
    super(...arguments);
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "MAX_ROW", 4);
    __publicField(this, "MAX_COL", 3);
  }
  makeHeadRow() {
    return [];
  }
  makeBodyRows() {
    const months = [];
    let monthValue = 0;
    for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
      const row = {
        dateCells: [],
        trackByIndex: rowIndex
      };
      for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
        const month = this.activeDate.setMonth(monthValue);
        const isDisabled = this.isDisabledMonth(month);
        const content = this.dateHelper.format(month.nativeDate, "MMM");
        const cell = {
          trackByIndex: colIndex,
          value: month.nativeDate,
          isDisabled,
          isSelected: month.isSameMonth(this.value),
          content,
          title: content,
          classMap: {},
          cellRender: valueFunctionProp(this.cellRender, month),
          // Customized content
          fullCellRender: valueFunctionProp(this.fullCellRender, month),
          onClick: () => this.chooseMonth(cell.value.getMonth()),
          // don't use monthValue here,
          onMouseEnter: () => this.cellHover.emit(month)
        };
        this.addCellProperty(cell, month);
        row.dateCells.push(cell);
        monthValue++;
      }
      months.push(row);
    }
    return months;
  }
  isDisabledMonth(month) {
    if (!this.disabledDate) {
      return false;
    }
    const firstOfMonth = month.setDate(1);
    for (let date = firstOfMonth; date.getMonth() === month.getMonth(); date = date.addDays(1)) {
      if (!this.disabledDate(date.nativeDate)) {
        return false;
      }
    }
    return true;
  }
  addCellProperty(cell, month) {
    if (this.hasRangeValue()) {
      const [startHover, endHover] = this.hoverValue;
      const [startSelected, endSelected] = this.selectedValue;
      if (startSelected == null ? void 0 : startSelected.isSameMonth(month)) {
        cell.isSelectedStart = true;
        cell.isSelected = true;
      }
      if (endSelected == null ? void 0 : endSelected.isSameMonth(month)) {
        cell.isSelectedEnd = true;
        cell.isSelected = true;
      }
      if (startHover && endHover) {
        cell.isHoverStart = startHover.isSameMonth(month);
        cell.isHoverEnd = endHover.isSameMonth(month);
        cell.isLastCellInPanel = month.getMonth() === 11;
        cell.isFirstCellInPanel = month.getMonth() === 0;
        cell.isInHoverRange = startHover.isBeforeMonth(month) && month.isBeforeMonth(endHover);
      }
      cell.isStartSingle = startSelected && !endSelected;
      cell.isEndSingle = !startSelected && endSelected;
      cell.isInSelectedRange = (startSelected == null ? void 0 : startSelected.isBeforeMonth(month)) && (month == null ? void 0 : month.isBeforeMonth(endSelected));
      cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
      cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
    } else if (month.isSameMonth(this.value)) {
      cell.isSelected = true;
    }
    cell.classMap = this.getClassMap(cell);
  }
  chooseMonth(month) {
    this.value = this.activeDate.setMonth(month);
    this.valueChange.emit(this.value);
  }
};
__publicField(_MonthTableComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275MonthTableComponent_BaseFactory;
  return function MonthTableComponent_Factory(__ngFactoryType__) {
    return (\u0275MonthTableComponent_BaseFactory || (\u0275MonthTableComponent_BaseFactory = \u0275\u0275getInheritedFactory(_MonthTableComponent)))(__ngFactoryType__ || _MonthTableComponent);
  };
})());
__publicField(_MonthTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MonthTableComponent,
  selectors: [["month-table"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 5,
  vars: 1,
  consts: [["cellspacing", "0", "role", "grid", 1, "ant-picker-content"], ["role", "row", 3, "class"], ["role", "row"], ["role", "columnheader"], ["role", "columnheader", 3, "title"], ["role", "gridcell", 3, "class"], ["role", "gridcell", 3, "title", "class"], ["role", "gridcell"], ["role", "gridcell", 3, "click", "mouseenter", "title"], [3, "class", "ant-picker-calendar-date-today"], [3, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [3, "class"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"]],
  template: function MonthTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "table", 0);
      \u0275\u0275conditionalCreate(1, MonthTableComponent_Conditional_1_Template, 5, 1, "thead");
      \u0275\u0275elementStart(2, "tbody");
      \u0275\u0275repeaterCreate(3, MonthTableComponent_For_4_Template, 4, 3, "tr", 1, _forTrack1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.headRow && ctx.headRow.length > 0 ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.bodyRows);
    }
  },
  dependencies: [NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var MonthTableComponent = _MonthTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MonthTableComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "month-table",
      imports: [NzStringTemplateOutletDirective],
      template: `<table class="ant-picker-content" cellspacing="0" role="grid">
  @if (headRow && headRow.length > 0) {
    <thead>
      <tr role="row">
        @if (showWeek) {
          <th role="columnheader"></th>
        }
        @for (cell of headRow; track $index) {
          <th role="columnheader" [title]="cell.title"> {{ cell.content }}</th>
        }
      </tr>
    </thead>
  }

  <tbody>
    @for (row of bodyRows; track row.trackByIndex) {
      <tr [class]="row.classMap!" role="row">
        @if (row.weekNum) {
          <td role="gridcell" class="{{ prefixCls }}-cell-week"> {{ row.weekNum }}</td>
        }
        @for (cell of row.dateCells; track cell.trackByIndex) {
          <td
            [title]="cell.title"
            role="gridcell"
            [class]="cell.classMap!"
            (click)="cell.isDisabled ? null : cell.onClick()"
            (mouseenter)="cell.onMouseEnter()"
          >
            @switch (prefixCls) {
              @case ('ant-picker') {
                @if (cell.cellRender) {
                  <ng-template
                    [nzStringTemplateOutlet]="cell.cellRender"
                    [nzStringTemplateOutletContext]="{ $implicit: cell.value }"
                  >
                    {{ cell.cellRender }}
                  </ng-template>
                } @else {
                  <div
                    class="{{ prefixCls }}-cell-inner"
                    [attr.aria-selected]="cell.isSelected"
                    [attr.aria-disabled]="cell.isDisabled"
                  >
                    {{ cell.content }}
                  </div>
                }
              }
              @case ('ant-picker-calendar') {
                <div
                  class="{{ prefixCls }}-date ant-picker-cell-inner"
                  [class.ant-picker-calendar-date-today]="cell.isToday"
                >
                  @if (cell.fullCellRender) {
                    <ng-container *nzStringTemplateOutlet="cell.fullCellRender; context: { $implicit: cell.value }">
                      {{ cell.fullCellRender }}
                    </ng-container>
                  } @else {
                    <div class="{{ prefixCls }}-date-value">{{ cell.content }}</div>
                    <div class="{{ prefixCls }}-date-content">
                      <ng-container *nzStringTemplateOutlet="cell.cellRender; context: { $implicit: cell.value }">
                        {{ cell.cellRender }}
                      </ng-container>
                    </div>
                  }
                </div>
              }
            }
          </td>
        }
      </tr>
    }
  </tbody>
</table>
`
    }]
  }], null, null);
})();
var _DateHeaderComponent = class _DateHeaderComponent extends AbstractPanelHeader {
  constructor() {
    super(...arguments);
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "mode", "date");
  }
  getSelectors() {
    return [{
      className: `${this.prefixCls}-year-btn`,
      title: this.locale.yearSelect,
      onClick: () => {
        this.mode = "year";
        this.changeMode("year");
      },
      label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
    }, {
      className: `${this.prefixCls}-month-btn`,
      title: this.locale.monthSelect,
      onClick: () => {
        this.mode = "month";
        this.changeMode("month");
      },
      label: this.dateHelper.format(this.value.nativeDate, this.locale.monthFormat || "MMM")
    }];
  }
};
__publicField(_DateHeaderComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275DateHeaderComponent_BaseFactory;
  return function DateHeaderComponent_Factory(__ngFactoryType__) {
    return (\u0275DateHeaderComponent_BaseFactory || (\u0275DateHeaderComponent_BaseFactory = \u0275\u0275getInheritedFactory(_DateHeaderComponent)))(__ngFactoryType__ || _DateHeaderComponent);
  };
})());
__publicField(_DateHeaderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _DateHeaderComponent,
  selectors: [["date-header"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 12,
  vars: 33,
  consts: [["role", "button", "type", "button", "tabindex", "-1", 3, "click", "title"], [1, "ant-picker-super-prev-icon"], [1, "ant-picker-prev-icon"], ["role", "button", "type", "button", 3, "class", "title"], [1, "ant-picker-next-icon"], [1, "ant-picker-super-next-icon"], ["role", "button", "type", "button", 3, "click", "title"]],
  template: function DateHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div")(1, "button", 0);
      \u0275\u0275domListener("click", function DateHeaderComponent_Template_button_click_1_listener() {
        return ctx.superPrevious();
      });
      \u0275\u0275domElement(2, "span", 1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "button", 0);
      \u0275\u0275domListener("click", function DateHeaderComponent_Template_button_click_3_listener() {
        return ctx.previous();
      });
      \u0275\u0275domElement(4, "span", 2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "div");
      \u0275\u0275repeaterCreate(6, DateHeaderComponent_For_7_Template, 2, 5, "button", 3, _forTrack05, true);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "button", 0);
      \u0275\u0275domListener("click", function DateHeaderComponent_Template_button_click_8_listener() {
        return ctx.next();
      });
      \u0275\u0275domElement(9, "span", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "button", 0);
      \u0275\u0275domListener("click", function DateHeaderComponent_Template_button_click_10_listener() {
        return ctx.superNext();
      });
      \u0275\u0275domElement(11, "span", 5);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.prefixCls);
      \u0275\u0275advance();
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superPreviousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.previousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-view"));
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.selectors);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.nextTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superNextTitle()));
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var DateHeaderComponent = _DateHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DateHeaderComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "date-header",
      template: `<div class="{{ prefixCls }}">
  <button
    [style.visibility]="showSuperPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-prev-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superPreviousTitle() }}"
    (click)="superPrevious()"
  >
    <span class="ant-picker-super-prev-icon"></span>
  </button>
  <button
    [style.visibility]="showPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-prev-btn"
    role="button"
    type="button"
    title="{{ previousTitle() }}"
    tabindex="-1"
    (click)="previous()"
  >
    <span class="ant-picker-prev-icon"></span>
  </button>

  <div class="{{ prefixCls }}-view">
    @for (selector of selectors; track trackBySelector(selector)) {
      <button
        class="{{ selector.className }}"
        role="button"
        type="button"
        title="{{ selector.title || null }}"
        (click)="selector.onClick()"
      >
        {{ selector.label }}
      </button>
    }
  </div>
  <button
    [style.visibility]="showNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ nextTitle() }}"
    (click)="next()"
  >
    <span class="ant-picker-next-icon"></span>
  </button>
  <button
    [style.visibility]="showSuperNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superNextTitle() }}"
    (click)="superNext()"
  >
    <span class="ant-picker-super-next-icon"></span>
  </button>
</div>
`
    }]
  }], null, null);
})();
var _DateTableComponent = class _DateTableComponent extends AbstractTable {
  constructor() {
    super(...arguments);
    __publicField(this, "format");
    __publicField(this, "i18n", inject(NzI18nService));
    __publicField(this, "dateHelper", inject(DateHelperService));
  }
  changeValueFromInside(value) {
    this.activeDate = this.activeDate.setYear(value.getYear()).setMonth(value.getMonth()).setDate(value.getDate());
    this.valueChange.emit(this.activeDate);
    if (!this.activeDate.isSameMonth(this.value)) {
      this.render();
    }
  }
  makeHeadRow() {
    const weekDays = [];
    const start = this.activeDate.calendarStart({
      weekStartsOn: this.dateHelper.getFirstDayOfWeek()
    });
    for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
      const day = start.addDays(colIndex);
      weekDays.push({
        trackByIndex: null,
        value: day.nativeDate,
        title: this.dateHelper.format(day.nativeDate, "E"),
        // eg. Tue
        content: this.dateHelper.format(day.nativeDate, this.getVeryShortWeekFormat()),
        // eg. Tu,
        isSelected: false,
        isDisabled: false,
        onClick() {
        },
        onMouseEnter() {
        }
      });
    }
    return weekDays;
  }
  getVeryShortWeekFormat() {
    return this.i18n.getLocaleId().toLowerCase().indexOf("zh") === 0 ? "EEEEE" : "EEEEEE";
  }
  makeBodyRows() {
    var _a;
    const weekRows = [];
    const firstDayOfMonth = this.activeDate.calendarStart({
      weekStartsOn: this.dateHelper.getFirstDayOfWeek()
    });
    for (let week = 0; week < this.MAX_ROW; week++) {
      const weekStart = firstDayOfMonth.addDays(week * 7);
      const row = {
        isActive: false,
        dateCells: [],
        trackByIndex: week
      };
      for (let day = 0; day < 7; day++) {
        const date = weekStart.addDays(day);
        const dateFormat = transCompatFormat((_a = this.format) != null ? _a : this.i18n.getLocaleData("DatePicker.lang.dateFormat", "YYYY-MM-DD"));
        const title = this.dateHelper.format(date.nativeDate, dateFormat);
        const label = this.dateHelper.format(date.nativeDate, "dd");
        const cell = {
          trackByIndex: day,
          value: date.nativeDate,
          label,
          isSelected: false,
          isDisabled: false,
          isToday: false,
          title,
          cellRender: valueFunctionProp(this.cellRender, date),
          // Customized content
          fullCellRender: valueFunctionProp(this.fullCellRender, date),
          content: `${date.getDate()}`,
          onClick: () => this.changeValueFromInside(date),
          onMouseEnter: () => this.cellHover.emit(date)
        };
        this.addCellProperty(cell, date);
        if (this.showWeek && !row.weekNum) {
          row.weekNum = this.dateHelper.getISOWeek(date.nativeDate);
        }
        if (date.isSameDay(this.value)) {
          row.isActive = date.isSameDay(this.value);
        }
        row.dateCells.push(cell);
      }
      row.classMap = {
        [`ant-picker-week-panel-row`]: this.canSelectWeek,
        [`ant-picker-week-panel-row-selected`]: this.canSelectWeek && row.isActive
      };
      weekRows.push(row);
    }
    return weekRows;
  }
  addCellProperty(cell, date) {
    var _a;
    if (this.hasRangeValue() && !this.canSelectWeek) {
      const [startHover, endHover] = this.hoverValue;
      const [startSelected, endSelected] = this.selectedValue;
      if (startSelected == null ? void 0 : startSelected.isSameDay(date)) {
        cell.isSelectedStart = true;
        cell.isSelected = true;
      }
      if (endSelected == null ? void 0 : endSelected.isSameDay(date)) {
        cell.isSelectedEnd = true;
        cell.isSelected = true;
      }
      if (startHover && endHover) {
        cell.isHoverStart = startHover.isSameDay(date);
        cell.isHoverEnd = endHover.isSameDay(date);
        cell.isLastCellInPanel = date.isLastDayOfMonth();
        cell.isFirstCellInPanel = date.isFirstDayOfMonth();
        cell.isInHoverRange = startHover.isBeforeDay(date) && date.isBeforeDay(endHover);
      }
      cell.isStartSingle = startSelected && !endSelected;
      cell.isEndSingle = !startSelected && endSelected;
      cell.isInSelectedRange = (startSelected == null ? void 0 : startSelected.isBeforeDay(date)) && date.isBeforeDay(endSelected);
      cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
      cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
    }
    cell.isToday = date.isToday();
    cell.isSelected = date.isSameDay(this.value);
    cell.isDisabled = !!((_a = this.disabledDate) == null ? void 0 : _a.call(this, date.nativeDate));
    cell.classMap = this.getClassMap(cell);
  }
  getClassMap(cell) {
    const date = new CandyDate(cell.value);
    return __spreadProps(__spreadValues({}, super.getClassMap(cell)), {
      [`ant-picker-cell-today`]: !!cell.isToday,
      [`ant-picker-cell-in-view`]: date.isSameMonth(this.activeDate)
    });
  }
};
__publicField(_DateTableComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275DateTableComponent_BaseFactory;
  return function DateTableComponent_Factory(__ngFactoryType__) {
    return (\u0275DateTableComponent_BaseFactory || (\u0275DateTableComponent_BaseFactory = \u0275\u0275getInheritedFactory(_DateTableComponent)))(__ngFactoryType__ || _DateTableComponent);
  };
})());
__publicField(_DateTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _DateTableComponent,
  selectors: [["date-table"]],
  inputs: {
    format: "format"
  },
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 5,
  vars: 1,
  consts: [["cellspacing", "0", "role", "grid", 1, "ant-picker-content"], ["role", "row", 3, "class"], ["role", "row"], ["role", "columnheader"], ["role", "columnheader", 3, "title"], ["role", "gridcell", 3, "class"], ["role", "gridcell", 3, "title", "class"], ["role", "gridcell"], ["role", "gridcell", 3, "click", "mouseenter", "title"], [3, "class", "ant-picker-calendar-date-today"], [3, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [3, "class"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"]],
  template: function DateTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "table", 0);
      \u0275\u0275conditionalCreate(1, DateTableComponent_Conditional_1_Template, 5, 1, "thead");
      \u0275\u0275elementStart(2, "tbody");
      \u0275\u0275repeaterCreate(3, DateTableComponent_For_4_Template, 4, 3, "tr", 1, _forTrack1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.headRow && ctx.headRow.length > 0 ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.bodyRows);
    }
  },
  dependencies: [NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var DateTableComponent = _DateTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DateTableComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "date-table",
      imports: [NzStringTemplateOutletDirective],
      template: `<table class="ant-picker-content" cellspacing="0" role="grid">
  @if (headRow && headRow.length > 0) {
    <thead>
      <tr role="row">
        @if (showWeek) {
          <th role="columnheader"></th>
        }
        @for (cell of headRow; track $index) {
          <th role="columnheader" [title]="cell.title"> {{ cell.content }}</th>
        }
      </tr>
    </thead>
  }

  <tbody>
    @for (row of bodyRows; track row.trackByIndex) {
      <tr [class]="row.classMap!" role="row">
        @if (row.weekNum) {
          <td role="gridcell" class="{{ prefixCls }}-cell-week"> {{ row.weekNum }}</td>
        }
        @for (cell of row.dateCells; track cell.trackByIndex) {
          <td
            [title]="cell.title"
            role="gridcell"
            [class]="cell.classMap!"
            (click)="cell.isDisabled ? null : cell.onClick()"
            (mouseenter)="cell.onMouseEnter()"
          >
            @switch (prefixCls) {
              @case ('ant-picker') {
                @if (cell.cellRender) {
                  <ng-template
                    [nzStringTemplateOutlet]="cell.cellRender"
                    [nzStringTemplateOutletContext]="{ $implicit: cell.value }"
                  >
                    {{ cell.cellRender }}
                  </ng-template>
                } @else {
                  <div
                    class="{{ prefixCls }}-cell-inner"
                    [attr.aria-selected]="cell.isSelected"
                    [attr.aria-disabled]="cell.isDisabled"
                  >
                    {{ cell.content }}
                  </div>
                }
              }
              @case ('ant-picker-calendar') {
                <div
                  class="{{ prefixCls }}-date ant-picker-cell-inner"
                  [class.ant-picker-calendar-date-today]="cell.isToday"
                >
                  @if (cell.fullCellRender) {
                    <ng-container *nzStringTemplateOutlet="cell.fullCellRender; context: { $implicit: cell.value }">
                      {{ cell.fullCellRender }}
                    </ng-container>
                  } @else {
                    <div class="{{ prefixCls }}-date-value">{{ cell.content }}</div>
                    <div class="{{ prefixCls }}-date-content">
                      <ng-container *nzStringTemplateOutlet="cell.cellRender; context: { $implicit: cell.value }">
                        {{ cell.cellRender }}
                      </ng-container>
                    </div>
                  }
                </div>
              }
            }
          </td>
        }
      </tr>
    }
  </tbody>
</table>
`
    }]
  }], null, {
    format: [{
      type: Input
    }]
  });
})();
var _LibPackerModule = class _LibPackerModule {
};
__publicField(_LibPackerModule, "\u0275fac", function LibPackerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LibPackerModule)();
});
__publicField(_LibPackerModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _LibPackerModule,
  imports: [DateHeaderComponent, DateTableComponent, DecadeHeaderComponent, DecadeTableComponent, MonthHeaderComponent, MonthTableComponent, YearHeaderComponent, YearTableComponent, QuarterHeaderComponent, QuarterTableComponent],
  exports: [DateHeaderComponent, DateTableComponent, DecadeHeaderComponent, DecadeTableComponent, MonthHeaderComponent, MonthTableComponent, YearHeaderComponent, YearTableComponent, QuarterHeaderComponent, QuarterTableComponent]
}));
__publicField(_LibPackerModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({}));
var LibPackerModule = _LibPackerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LibPackerModule, [{
    type: NgModule,
    args: [{
      imports: [DateHeaderComponent, DateTableComponent, DecadeHeaderComponent, DecadeTableComponent, MonthHeaderComponent, MonthTableComponent, YearHeaderComponent, YearTableComponent, QuarterHeaderComponent, QuarterTableComponent],
      exports: [DateHeaderComponent, DateTableComponent, DecadeHeaderComponent, DecadeTableComponent, MonthHeaderComponent, MonthTableComponent, YearHeaderComponent, YearTableComponent, QuarterHeaderComponent, QuarterTableComponent]
    }]
  }], null, null);
})();
var _InnerPopupComponent = class _InnerPopupComponent {
  constructor() {
    __publicField(this, "activeDate");
    __publicField(this, "endPanelMode");
    __publicField(this, "panelMode");
    __publicField(this, "showWeek");
    __publicField(this, "locale");
    __publicField(this, "showTimePicker");
    __publicField(this, "timeOptions");
    __publicField(this, "disabledDate");
    __publicField(this, "dateRender");
    __publicField(this, "selectedValue");
    // Range ONLY
    __publicField(this, "hoverValue");
    // Range ONLY
    __publicField(this, "value");
    __publicField(this, "partType");
    __publicField(this, "format");
    __publicField(this, "panelChange", new EventEmitter());
    // TODO: name is not proper
    __publicField(this, "headerChange", new EventEmitter());
    // Emitted when user changed the header's value
    __publicField(this, "selectDate", new EventEmitter());
    // Emitted when the date is selected by click the date panel
    __publicField(this, "selectTime", new EventEmitter());
    __publicField(this, "cellHover", new EventEmitter());
    // Emitted when hover on a day by mouse enter
    __publicField(this, "prefixCls", PREFIX_CLASS);
  }
  /**
   * Hide "next" arrow in left panel,
   * hide "prev" arrow in right panel
   *
   * @param direction
   * @param panelMode
   */
  enablePrevNext(direction, panelMode) {
    return !(!this.showTimePicker && panelMode === this.endPanelMode && (this.partType === "left" && direction === "next" || this.partType === "right" && direction === "prev"));
  }
  onLeave() {
    this.cellHover.emit(null);
  }
  onSelectTime(date) {
    this.selectTime.emit(new CandyDate(date));
  }
  // The value real changed to outside
  onSelectDate(date) {
    const value = date instanceof CandyDate ? date : new CandyDate(date);
    const timeValue = this.timeOptions && this.timeOptions.nzDefaultOpenValue;
    if (!this.value && timeValue) {
      value.setHms(timeValue.getHours(), timeValue.getMinutes(), timeValue.getSeconds());
    }
    this.selectDate.emit(value);
  }
  onChooseMonth(value) {
    this.activeDate = this.activeDate.setMonth(value.getMonth());
    if (this.endPanelMode === "month") {
      this.value = value;
      this.selectDate.emit(value);
    } else {
      this.headerChange.emit(value);
      this.panelChange.emit({
        mode: this.endPanelMode,
        date: value.nativeDate
      });
    }
  }
  onChooseQuarter(value) {
    this.activeDate = this.activeDate.setQuarter(value.getQuarter());
    this.value = value;
    this.selectDate.emit(value);
  }
  onChooseYear(value) {
    this.activeDate = this.activeDate.setYear(value.getYear());
    if (this.endPanelMode === "year") {
      this.value = value;
      this.selectDate.emit(value);
    } else {
      this.headerChange.emit(value);
      this.panelChange.emit({
        mode: this.endPanelMode,
        date: value.nativeDate
      });
    }
  }
  onChooseDecade(value) {
    this.activeDate = this.activeDate.setYear(value.getYear());
    if (this.endPanelMode === "decade") {
      this.value = value;
      this.selectDate.emit(value);
    } else {
      this.headerChange.emit(value);
      this.panelChange.emit({
        mode: "year",
        date: value.nativeDate
      });
    }
  }
  ngOnChanges(changes) {
    if (changes.activeDate && !changes.activeDate.currentValue) {
      this.activeDate = new CandyDate();
    }
    if (changes.panelMode && changes.panelMode.currentValue === "time") {
      this.panelMode = "date";
    }
  }
};
__publicField(_InnerPopupComponent, "\u0275fac", function InnerPopupComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _InnerPopupComponent)();
});
__publicField(_InnerPopupComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _InnerPopupComponent,
  selectors: [["inner-popup"]],
  inputs: {
    activeDate: "activeDate",
    endPanelMode: "endPanelMode",
    panelMode: "panelMode",
    showWeek: [2, "showWeek", "showWeek", booleanAttribute],
    locale: "locale",
    showTimePicker: [2, "showTimePicker", "showTimePicker", booleanAttribute],
    timeOptions: "timeOptions",
    disabledDate: "disabledDate",
    dateRender: "dateRender",
    selectedValue: "selectedValue",
    hoverValue: "hoverValue",
    value: "value",
    partType: "partType",
    format: "format"
  },
  outputs: {
    panelChange: "panelChange",
    headerChange: "headerChange",
    selectDate: "selectDate",
    selectTime: "selectTime",
    cellHover: "cellHover"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 8,
  vars: 8,
  consts: [[3, "mouseleave"], [3, "nzInDatePicker", "ngModel", "format", "nzHourStep", "nzMinuteStep", "nzSecondStep", "nzDisabledHours", "nzDisabledMinutes", "nzDisabledSeconds", "nzHideDisabledOptions", "nzDefaultOpenValue", "nzUse12Hours", "nzAddOn"], [3, "valueChange", "panelChange", "value", "locale", "showSuperPreBtn", "showSuperNextBtn", "showNextBtn", "showPreBtn"], [3, "valueChange", "activeDate", "value", "locale", "disabledDate"], [3, "valueChange", "cellHover", "activeDate", "value", "locale", "disabledDate", "selectedValue", "hoverValue"], [3, "valueChange", "cellHover", "value", "activeDate", "locale", "disabledDate", "selectedValue", "hoverValue"], [3, "valueChange", "cellHover", "value", "activeDate", "locale", "disabledDate", "selectedValue", "hoverValue", "cellRender"], [3, "valueChange", "panelChange", "value", "locale", "showSuperPreBtn", "showSuperNextBtn", "showPreBtn", "showNextBtn"], [3, "valueChange", "cellHover", "locale", "showWeek", "value", "activeDate", "disabledDate", "cellRender", "selectedValue", "hoverValue", "canSelectWeek", "format"], [3, "ngModelChange", "nzInDatePicker", "ngModel", "format", "nzHourStep", "nzMinuteStep", "nzSecondStep", "nzDisabledHours", "nzDisabledMinutes", "nzDisabledSeconds", "nzHideDisabledOptions", "nzDefaultOpenValue", "nzUse12Hours", "nzAddOn"]],
  template: function InnerPopupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("mouseleave", function InnerPopupComponent_Template_div_mouseleave_0_listener() {
        return ctx.onLeave();
      });
      \u0275\u0275elementStart(1, "div");
      \u0275\u0275conditionalCreate(2, InnerPopupComponent_Case_2_Template, 3, 13)(3, InnerPopupComponent_Case_3_Template, 3, 15)(4, InnerPopupComponent_Case_4_Template, 3, 15)(5, InnerPopupComponent_Case_5_Template, 3, 16)(6, InnerPopupComponent_Case_6_Template, 3, 19);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(7, InnerPopupComponent_Conditional_7_Template, 1, 13, "nz-time-picker-panel", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275classProp("ant-picker-datetime-panel", ctx.showTimePicker);
      \u0275\u0275advance();
      \u0275\u0275classMap(\u0275\u0275interpolate2("", ctx.prefixCls, "-", ctx.panelMode, "-panel"));
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_2_0 = ctx.panelMode) === "decade" ? 2 : tmp_2_0 === "year" ? 3 : tmp_2_0 === "month" ? 4 : tmp_2_0 === "quarter" ? 5 : 6);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.showTimePicker && ctx.timeOptions ? 7 : -1);
    }
  },
  dependencies: [LibPackerModule, DateHeaderComponent, DateTableComponent, DecadeHeaderComponent, DecadeTableComponent, MonthHeaderComponent, MonthTableComponent, YearHeaderComponent, YearTableComponent, QuarterHeaderComponent, QuarterTableComponent, NzTimePickerModule, NzTimePickerPanelComponent, FormsModule, NgControlStatus, NgModel],
  encapsulation: 2,
  changeDetection: 0
}));
var InnerPopupComponent = _InnerPopupComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InnerPopupComponent, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "inner-popup",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <div (mouseleave)="onLeave()" [class.ant-picker-datetime-panel]="showTimePicker">
      <div class="{{ prefixCls }}-{{ panelMode }}-panel">
        @switch (panelMode) {
          @case ('decade') {
            <decade-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'decade')"
              [showSuperNextBtn]="enablePrevNext('next', 'decade')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <decade-table
                [activeDate]="activeDate"
                [value]="value"
                [locale]="locale"
                (valueChange)="onChooseDecade($event)"
                [disabledDate]="disabledDate"
              />
            </div>
          }
          @case ('year') {
            <year-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'year')"
              [showSuperNextBtn]="enablePrevNext('next', 'year')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <year-table
                [activeDate]="activeDate"
                [value]="value"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseYear($event)"
                (cellHover)="cellHover.emit($event)"
              />
            </div>
          }
          @case ('month') {
            <month-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'month')"
              [showSuperNextBtn]="enablePrevNext('next', 'month')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <month-table
                [value]="value"
                [activeDate]="activeDate"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseMonth($event)"
                (cellHover)="cellHover.emit($event)"
              />
            </div>
          }
          @case ('quarter') {
            <quarter-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'month')"
              [showSuperNextBtn]="enablePrevNext('next', 'month')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <quarter-table
                [value]="value"
                [activeDate]="activeDate"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseQuarter($event)"
                (cellHover)="cellHover.emit($event)"
                [cellRender]="dateRender"
              />
            </div>
          }
          @default {
            <date-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="panelMode === 'week' ? enablePrevNext('prev', 'week') : enablePrevNext('prev', 'date')"
              [showSuperNextBtn]="
                panelMode === 'week' ? enablePrevNext('next', 'week') : enablePrevNext('next', 'date')
              "
              [showPreBtn]="panelMode === 'week' ? enablePrevNext('prev', 'week') : enablePrevNext('prev', 'date')"
              [showNextBtn]="panelMode === 'week' ? enablePrevNext('next', 'week') : enablePrevNext('next', 'date')"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <date-table
                [locale]="locale"
                [showWeek]="showWeek"
                [value]="value"
                [activeDate]="activeDate"
                [disabledDate]="disabledDate"
                [cellRender]="dateRender"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                [canSelectWeek]="panelMode === 'week'"
                [format]="format"
                (valueChange)="onSelectDate($event)"
                (cellHover)="cellHover.emit($event)"
              />
            </div>
          }
        }
      </div>
      @if (showTimePicker && timeOptions) {
        <nz-time-picker-panel
          [nzInDatePicker]="true"
          [ngModel]="value?.nativeDate"
          (ngModelChange)="onSelectTime($event)"
          [format]="$any(timeOptions.nzFormat)"
          [nzHourStep]="$any(timeOptions.nzHourStep)"
          [nzMinuteStep]="$any(timeOptions.nzMinuteStep)"
          [nzSecondStep]="$any(timeOptions.nzSecondStep)"
          [nzDisabledHours]="$any(timeOptions.nzDisabledHours)"
          [nzDisabledMinutes]="$any(timeOptions.nzDisabledMinutes)"
          [nzDisabledSeconds]="$any(timeOptions.nzDisabledSeconds)"
          [nzHideDisabledOptions]="!!timeOptions.nzHideDisabledOptions"
          [nzDefaultOpenValue]="$any(timeOptions.nzDefaultOpenValue)"
          [nzUse12Hours]="!!timeOptions.nzUse12Hours"
          [nzAddOn]="$any(timeOptions.nzAddOn)"
        />
      }
    </div>
  `,
      imports: [LibPackerModule, NzTimePickerModule, FormsModule]
    }]
  }], null, {
    activeDate: [{
      type: Input
    }],
    endPanelMode: [{
      type: Input
    }],
    panelMode: [{
      type: Input
    }],
    showWeek: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    locale: [{
      type: Input
    }],
    showTimePicker: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    timeOptions: [{
      type: Input
    }],
    disabledDate: [{
      type: Input
    }],
    dateRender: [{
      type: Input
    }],
    selectedValue: [{
      type: Input
    }],
    hoverValue: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    partType: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    panelChange: [{
      type: Output
    }],
    headerChange: [{
      type: Output
    }],
    selectDate: [{
      type: Output
    }],
    selectTime: [{
      type: Output
    }],
    cellHover: [{
      type: Output
    }]
  });
})();
var _DateRangePopupComponent = class _DateRangePopupComponent {
  constructor() {
    __publicField(this, "datePickerService", inject(DatePickerService));
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "host", inject(ElementRef));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "isRange");
    __publicField(this, "inline", false);
    __publicField(this, "showWeek");
    __publicField(this, "locale");
    __publicField(this, "disabledDate");
    __publicField(this, "disabledTime");
    // This will lead to rebuild time options
    __publicField(this, "showToday");
    __publicField(this, "showNow");
    __publicField(this, "showTime");
    __publicField(this, "extraFooter");
    __publicField(this, "ranges");
    __publicField(this, "dateRender");
    __publicField(this, "panelMode");
    __publicField(this, "defaultPickerValue");
    __publicField(this, "dir", "ltr");
    __publicField(this, "format");
    __publicField(this, "panelModeChange", new EventEmitter());
    __publicField(this, "calendarChange", new EventEmitter());
    __publicField(this, "resultOk", new EventEmitter());
    // Emitted when done with date selecting
    __publicField(this, "prefixCls", PREFIX_CLASS);
    __publicField(this, "endPanelMode", "date");
    __publicField(this, "timeOptions", null);
    __publicField(this, "hoverValue", []);
    // Range ONLY
    __publicField(this, "checkedPartArr", [false, false]);
    __publicField(this, "disabledStartTime", (value) => this.disabledTime && this.disabledTime(value, "start"));
    __publicField(this, "disabledEndTime", (value) => this.disabledTime && this.disabledTime(value, "end"));
  }
  get hasTimePicker() {
    return !!this.showTime;
  }
  get hasFooter() {
    return this.showToday || this.hasTimePicker || !!this.extraFooter || !!this.ranges;
  }
  get arrowPosition() {
    var _a, _b;
    return this.dir === "rtl" ? {
      right: `${(_a = this.datePickerService) == null ? void 0 : _a.arrowLeft}px`
    } : {
      left: `${(_b = this.datePickerService) == null ? void 0 : _b.arrowLeft}px`
    };
  }
  ngOnInit() {
    merge(this.datePickerService.valueChange$, this.datePickerService.inputPartChange$).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.updateActiveDate();
      this.cdr.markForCheck();
    });
    fromEventOutsideAngular(this.host.nativeElement, "mousedown").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => event.preventDefault());
  }
  ngOnChanges(changes) {
    if (changes.showTime || changes.disabledTime) {
      if (this.showTime) {
        this.buildTimeOptions();
      }
    }
    if (changes.panelMode) {
      this.endPanelMode = this.panelMode;
    }
    if (changes.defaultPickerValue) {
      this.updateActiveDate();
    }
  }
  updateActiveDate() {
    const activeDate = this.datePickerService.hasValue() ? this.datePickerService.value : this.datePickerService.makeValue(this.defaultPickerValue);
    this.datePickerService.setActiveDate(activeDate, this.hasTimePicker, this.getPanelMode(this.endPanelMode));
  }
  onClickOk() {
    const inputIndex = {
      left: 0,
      right: 1
    }[this.datePickerService.activeInput];
    const value = this.isRange ? this.datePickerService.value[inputIndex] : this.datePickerService.value;
    this.changeValueFromSelect(value);
    this.resultOk.emit();
  }
  onClickToday(value) {
    this.changeValueFromSelect(value, !this.showTime);
  }
  onCellHover(value) {
    if (!this.isRange) {
      return;
    }
    if (value === null) {
      this.hoverValue = [];
      return;
    }
    const otherInputIndex = {
      left: 1,
      right: 0
    }[this.datePickerService.activeInput];
    const base = this.datePickerService.value[otherInputIndex];
    if (base) {
      if (base.isBeforeDay(value)) {
        this.hoverValue = [base, value];
      } else {
        this.hoverValue = [value, base];
      }
    }
  }
  onPanelModeChange(panelChangeEvent, partType) {
    if (this.isRange) {
      const index = this.datePickerService.getActiveIndex(partType);
      if (index === 0) {
        this.panelMode = [panelChangeEvent.mode, this.panelMode[1]];
      } else {
        this.panelMode = [this.panelMode[0], panelChangeEvent.mode];
      }
      this.panelModeChange.emit({
        mode: this.panelMode,
        date: this.datePickerService.activeDate.map((d) => d.nativeDate)
      });
    } else {
      this.panelMode = panelChangeEvent.mode;
      this.panelModeChange.emit({
        mode: this.panelMode,
        date: panelChangeEvent.date
      });
    }
  }
  onActiveDateChange(value, partType) {
    if (this.isRange) {
      const activeDate = [];
      activeDate[this.datePickerService.getActiveIndex(partType)] = value;
      this.datePickerService.setActiveDate(activeDate, this.hasTimePicker, this.getPanelMode(this.endPanelMode, partType));
    } else {
      this.datePickerService.setActiveDate(value);
    }
  }
  onSelectTime(value, partType) {
    if (this.isRange) {
      const newValue = cloneDate(this.datePickerService.value);
      const index = this.datePickerService.getActiveIndex(partType);
      newValue[index] = this.overrideHms(value, newValue[index]);
      this.datePickerService.setValue(newValue);
    } else {
      const newValue = this.overrideHms(value, this.datePickerService.value);
      this.datePickerService.setValue(newValue);
    }
    this.datePickerService.inputPartChange$.next(null);
    this.buildTimeOptions();
  }
  changeValueFromSelect(value, emitValue = true) {
    if (this.isRange) {
      const selectedValue = cloneDate(this.datePickerService.value);
      const checkedPart = this.datePickerService.activeInput;
      let nextPart = checkedPart;
      selectedValue[this.datePickerService.getActiveIndex(checkedPart)] = value;
      this.checkedPartArr[this.datePickerService.getActiveIndex(checkedPart)] = true;
      this.hoverValue = selectedValue;
      if (emitValue) {
        if (this.inline) {
          nextPart = this.reversedPart(checkedPart);
          if (nextPart === "right") {
            selectedValue[this.datePickerService.getActiveIndex(nextPart)] = null;
            this.checkedPartArr[this.datePickerService.getActiveIndex(nextPart)] = false;
          }
          this.datePickerService.setValue(selectedValue);
          this.calendarChange.emit(selectedValue);
          if (this.isBothAllowed(selectedValue) && this.checkedPartArr[0] && this.checkedPartArr[1]) {
            this.clearHoverValue();
            this.datePickerService.emitValue$.next();
          }
        } else {
          if (wrongSortOrder(selectedValue)) {
            selectedValue.reverse();
          }
          this.datePickerService.setValue(selectedValue);
          if (this.isBothAllowed(selectedValue) && this.checkedPartArr[0] && this.checkedPartArr[1]) {
            this.calendarChange.emit(selectedValue);
            this.clearHoverValue();
            this.datePickerService.emitValue$.next();
          } else if (this.isAllowed(selectedValue)) {
            nextPart = this.reversedPart(checkedPart);
            this.calendarChange.emit([value.clone()]);
          }
        }
      } else {
        this.datePickerService.setValue(selectedValue);
      }
      this.datePickerService.inputPartChange$.next(nextPart);
    } else {
      this.datePickerService.setValue(value);
      this.datePickerService.inputPartChange$.next(null);
      if (emitValue && this.isAllowed(value)) {
        this.datePickerService.emitValue$.next();
      }
    }
    this.buildTimeOptions();
  }
  reversedPart(part) {
    return part === "left" ? "right" : "left";
  }
  getPanelMode(panelMode, partType) {
    if (this.isRange) {
      return panelMode[this.datePickerService.getActiveIndex(partType)];
    } else {
      return panelMode;
    }
  }
  // Get single value or part value of a range
  getValue(partType) {
    if (this.isRange) {
      return (this.datePickerService.value || [])[this.datePickerService.getActiveIndex(partType)];
    } else {
      return this.datePickerService.value;
    }
  }
  getActiveDate(partType) {
    if (this.isRange) {
      return this.datePickerService.activeDate[this.datePickerService.getActiveIndex(partType)];
    } else {
      return this.datePickerService.activeDate;
    }
  }
  isOneAllowed(selectedValue) {
    const index = this.datePickerService.getActiveIndex();
    const disabledTimeArr = [this.disabledStartTime, this.disabledEndTime];
    return isAllowedDate(selectedValue[index], this.disabledDate, disabledTimeArr[index]);
  }
  isBothAllowed(selectedValue) {
    return isAllowedDate(selectedValue[0], this.disabledDate, this.disabledStartTime) && isAllowedDate(selectedValue[1], this.disabledDate, this.disabledEndTime);
  }
  isAllowed(value, isBoth = false) {
    if (this.isRange) {
      return isBoth ? this.isBothAllowed(value) : this.isOneAllowed(value);
    } else {
      return isAllowedDate(value, this.disabledDate, this.disabledTime);
    }
  }
  getTimeOptions(partType) {
    if (this.showTime && this.timeOptions) {
      return this.timeOptions instanceof Array ? this.timeOptions[this.datePickerService.getActiveIndex(partType)] : this.timeOptions;
    }
    return null;
  }
  onClickPresetRange(val) {
    const value = typeof val === "function" ? val() : val;
    if (value) {
      this.datePickerService.setValue([new CandyDate(value[0]), new CandyDate(value[1])]);
      this.datePickerService.emitValue$.next();
    }
  }
  onPresetRangeMouseLeave() {
    this.clearHoverValue();
  }
  onHoverPresetRange(val) {
    if (typeof val !== "function") {
      this.hoverValue = [new CandyDate(val[0]), new CandyDate(val[1])];
    }
  }
  getObjectKeys(obj) {
    return obj ? Object.keys(obj) : [];
  }
  show(partType) {
    const hide = this.showTime && this.isRange && this.datePickerService.activeInput !== partType;
    return !hide;
  }
  clearHoverValue() {
    this.hoverValue = [];
  }
  buildTimeOptions() {
    if (this.showTime) {
      const showTime = typeof this.showTime === "object" ? this.showTime : {};
      if (this.isRange) {
        const value = this.datePickerService.value;
        this.timeOptions = [this.overrideTimeOptions(showTime, value[0], "start"), this.overrideTimeOptions(showTime, value[1], "end")];
      } else {
        this.timeOptions = this.overrideTimeOptions(showTime, this.datePickerService.value);
      }
    } else {
      this.timeOptions = null;
    }
  }
  overrideTimeOptions(origin, value, partial) {
    let disabledTimeFn;
    if (partial) {
      disabledTimeFn = partial === "start" ? this.disabledStartTime : this.disabledEndTime;
    } else {
      disabledTimeFn = this.disabledTime;
    }
    return __spreadValues(__spreadValues({}, origin), getTimeConfig(value, disabledTimeFn));
  }
  overrideHms(newValue, oldValue) {
    newValue = newValue || new CandyDate();
    oldValue = oldValue || new CandyDate();
    return oldValue.setHms(newValue.getHours(), newValue.getMinutes(), newValue.getSeconds());
  }
};
__publicField(_DateRangePopupComponent, "\u0275fac", function DateRangePopupComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DateRangePopupComponent)();
});
__publicField(_DateRangePopupComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _DateRangePopupComponent,
  selectors: [["date-range-popup"]],
  inputs: {
    isRange: [2, "isRange", "isRange", booleanAttribute],
    inline: [2, "inline", "inline", booleanAttribute],
    showWeek: [2, "showWeek", "showWeek", booleanAttribute],
    locale: "locale",
    disabledDate: "disabledDate",
    disabledTime: "disabledTime",
    showToday: [2, "showToday", "showToday", booleanAttribute],
    showNow: [2, "showNow", "showNow", booleanAttribute],
    showTime: "showTime",
    extraFooter: "extraFooter",
    ranges: "ranges",
    dateRender: "dateRender",
    panelMode: "panelMode",
    defaultPickerValue: "defaultPickerValue",
    dir: "dir",
    format: "format"
  },
  outputs: {
    panelModeChange: "panelModeChange",
    calendarChange: "calendarChange",
    resultOk: "resultOk"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 8,
  vars: 1,
  consts: [["tplInnerPopup", ""], ["tplFooter", ""], ["tplRangeQuickSelector", ""], [3, "class"], [4, "ngTemplateOutlet"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["tabindex", "-1"], [3, "panelChange", "cellHover", "selectDate", "selectTime", "headerChange", "showWeek", "endPanelMode", "partType", "locale", "showTimePicker", "timeOptions", "panelMode", "activeDate", "value", "disabledDate", "dateRender", "selectedValue", "hoverValue", "format"], [3, "locale", "isRange", "showToday", "showNow", "hasTimePicker", "okDisabled", "extraFooter", "rangeQuickSelector"], [3, "clickOk", "clickToday", "locale", "isRange", "showToday", "showNow", "hasTimePicker", "okDisabled", "extraFooter", "rangeQuickSelector"], [3, "click", "mouseenter", "mouseleave"], [1, "ant-tag", "ant-tag-blue"]],
  template: function DateRangePopupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, DateRangePopupComponent_Conditional_0_Template, 7, 18, "div", 3)(1, DateRangePopupComponent_Conditional_1_Template, 4, 13, "div", 3);
      \u0275\u0275template(2, DateRangePopupComponent_ng_template_2_Template, 2, 19, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(4, DateRangePopupComponent_ng_template_4_Template, 1, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(6, DateRangePopupComponent_ng_template_6_Template, 2, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.isRange ? 0 : 1);
    }
  },
  dependencies: [InnerPopupComponent, NgTemplateOutlet, CalendarFooterComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var DateRangePopupComponent = _DateRangePopupComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DateRangePopupComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "date-range-popup",
      template: `
    @if (isRange) {
      <div class="{{ prefixCls }}-range-wrapper {{ prefixCls }}-date-range-wrapper">
        <div class="{{ prefixCls }}-range-arrow" [style]="arrowPosition"></div>
        <div class="{{ prefixCls }}-panel-container {{ showWeek ? prefixCls + '-week-number' : '' }}">
          <div class="{{ prefixCls }}-panels">
            @if (hasTimePicker) {
              <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: datePickerService.activeInput }" />
            } @else {
              <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: 'left' }" />
              <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: 'right' }" />
            }
          </div>
          <ng-container *ngTemplateOutlet="tplFooter" />
        </div>
      </div>
    } @else {
      <div
        class="{{ prefixCls }}-panel-container {{ showWeek ? prefixCls + '-week-number' : '' }} {{
          hasTimePicker ? prefixCls + '-time' : ''
        }} {{ isRange ? prefixCls + '-range' : '' }}"
      >
        <div class="{{ prefixCls }}-panel" [class.ant-picker-panel-rtl]="dir === 'rtl'" tabindex="-1">
          <!-- Single ONLY -->
          <ng-container *ngTemplateOutlet="tplInnerPopup" />
          <ng-container *ngTemplateOutlet="tplFooter" />
        </div>
      </div>
    }

    <ng-template #tplInnerPopup let-partType="partType">
      <div class="{{ prefixCls }}-panel" [class.ant-picker-panel-rtl]="dir === 'rtl'">
        <!-- TODO(@wenqi73) [selectedValue] [hoverValue] types-->
        <inner-popup
          [showWeek]="showWeek"
          [endPanelMode]="getPanelMode(endPanelMode, partType)"
          [partType]="partType"
          [locale]="locale!"
          [showTimePicker]="hasTimePicker"
          [timeOptions]="getTimeOptions(partType)"
          [panelMode]="getPanelMode(panelMode, partType)"
          (panelChange)="onPanelModeChange($event, partType)"
          [activeDate]="getActiveDate(partType)"
          [value]="getValue(partType)"
          [disabledDate]="disabledDate"
          [dateRender]="dateRender"
          [selectedValue]="$any(datePickerService?.value)"
          [hoverValue]="$any(hoverValue)"
          [format]="format"
          (cellHover)="onCellHover($event)"
          (selectDate)="changeValueFromSelect($event, !showTime)"
          (selectTime)="onSelectTime($event, partType)"
          (headerChange)="onActiveDateChange($event, partType)"
        />
      </div>
    </ng-template>

    <ng-template #tplFooter>
      @if (hasFooter) {
        <calendar-footer
          [locale]="locale!"
          [isRange]="isRange"
          [showToday]="showToday"
          [showNow]="showNow"
          [hasTimePicker]="hasTimePicker"
          [okDisabled]="!isAllowed($any(datePickerService?.value))"
          [extraFooter]="extraFooter"
          [rangeQuickSelector]="ranges ? tplRangeQuickSelector : null"
          (clickOk)="onClickOk()"
          (clickToday)="onClickToday($event)"
        />
      }
    </ng-template>

    <!-- Range ONLY: Range Quick Selector -->
    <ng-template #tplRangeQuickSelector>
      @for (name of getObjectKeys(ranges); track name) {
        <li
          class="{{ prefixCls }}-preset"
          (click)="onClickPresetRange(ranges![name])"
          (mouseenter)="onHoverPresetRange(ranges![name])"
          (mouseleave)="onPresetRangeMouseLeave()"
        >
          <span class="ant-tag ant-tag-blue">{{ name }}</span>
        </li>
      }
    </ng-template>
  `,
      imports: [InnerPopupComponent, NgTemplateOutlet, CalendarFooterComponent]
    }]
  }], null, {
    isRange: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    inline: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showWeek: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    locale: [{
      type: Input
    }],
    disabledDate: [{
      type: Input
    }],
    disabledTime: [{
      type: Input
    }],
    showToday: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showNow: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showTime: [{
      type: Input
    }],
    extraFooter: [{
      type: Input
    }],
    ranges: [{
      type: Input
    }],
    dateRender: [{
      type: Input
    }],
    panelMode: [{
      type: Input
    }],
    defaultPickerValue: [{
      type: Input
    }],
    dir: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    panelModeChange: [{
      type: Output
    }],
    calendarChange: [{
      type: Output
    }],
    resultOk: [{
      type: Output
    }]
  });
})();
var POPUP_STYLE_PATCH = {
  position: "relative"
};
var NZ_CONFIG_MODULE_NAME7 = "datePicker";
var NzDatePickerComponent = (() => {
  var _a;
  let _nzVariant_decorators;
  let _nzVariant_initializers = [];
  let _nzVariant_extraInitializers = [];
  let _nzSeparator_decorators;
  let _nzSeparator_initializers = [];
  let _nzSeparator_extraInitializers = [];
  let _nzSuffixIcon_decorators;
  let _nzSuffixIcon_initializers = [];
  let _nzSuffixIcon_extraInitializers = [];
  let _nzBackdrop_decorators;
  let _nzBackdrop_initializers = [];
  let _nzBackdrop_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "nzConfigService", inject(NzConfigService));
      __publicField(this, "datePickerService", inject(DatePickerService));
      __publicField(this, "i18n", inject(NzI18nService));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "renderer", inject(Renderer2));
      __publicField(this, "elementRef", inject(ElementRef));
      __publicField(this, "dateHelper", inject(DateHelperService));
      __publicField(this, "nzResizeObserver", inject(NzResizeObserver));
      __publicField(this, "platform", inject(Platform));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "dir", inject(Directionality).valueSignal);
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME7);
      __publicField(this, "isRange", false);
      // Indicate whether the value is a range value
      __publicField(this, "extraFooter");
      // status
      __publicField(this, "statusCls", {});
      __publicField(this, "status", "");
      __publicField(this, "hasFeedback", false);
      __publicField(this, "panelMode", "date");
      __publicField(this, "isCustomPlaceHolder", false);
      __publicField(this, "isCustomFormat", false);
      __publicField(this, "showTime", false);
      __publicField(this, "isNzDisableFirstChange", true);
      // --- Common API
      __publicField(this, "nzInline", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
        debugName: "nzInline"
      } : {}), {
        transform: booleanAttribute
      })));
      __publicField(this, "nzAllowClear", true);
      __publicField(this, "nzAutoFocus", false);
      __publicField(this, "nzDisabled", false);
      __publicField(this, "nzInputReadOnly", false);
      __publicField(this, "nzOpen");
      __publicField(this, "nzDisabledDate");
      __publicField(this, "nzLocale");
      __publicField(this, "nzPlaceHolder", "");
      __publicField(this, "nzPopupStyle", POPUP_STYLE_PATCH);
      __publicField(this, "nzDropdownClassName", input(...ngDevMode ? [void 0, {
        debugName: "nzDropdownClassName"
      }] : []));
      __publicField(this, "nzSize", "default");
      __publicField(this, "nzStatus", "");
      __publicField(this, "nzFormat");
      __publicField(this, "nzVariant", __runInitializers(this, _nzVariant_initializers, void 0));
      __publicField(this, "nzDateRender", __runInitializers(this, _nzVariant_extraInitializers));
      __publicField(this, "nzDisabledTime");
      __publicField(this, "nzRenderExtraFooter");
      __publicField(this, "nzShowToday", true);
      __publicField(this, "nzMode", "date");
      __publicField(this, "nzShowNow", true);
      __publicField(this, "nzRanges");
      __publicField(this, "nzDefaultPickerValue", null);
      __publicField(this, "nzSeparator", __runInitializers(this, _nzSeparator_initializers, void 0));
      __publicField(this, "nzSuffixIcon", (__runInitializers(this, _nzSeparator_extraInitializers), __runInitializers(this, _nzSuffixIcon_initializers, "calendar")));
      __publicField(this, "nzBackdrop", (__runInitializers(this, _nzSuffixIcon_extraInitializers), __runInitializers(this, _nzBackdrop_initializers, false)));
      __publicField(this, "nzId", (__runInitializers(this, _nzBackdrop_extraInitializers), null));
      __publicField(this, "nzPlacement", "bottomLeft");
      __publicField(this, "nzShowWeekNumber", false);
      __publicField(this, "nzOnPanelChange", new EventEmitter());
      __publicField(this, "nzOnCalendarChange", new EventEmitter());
      __publicField(this, "nzOnOk", new EventEmitter());
      __publicField(this, "nzOnOpenChange", new EventEmitter());
      // ------------------------------------------------------------------------
      // Input API Start
      // ------------------------------------------------------------------------
      __publicField(this, "cdkConnectedOverlay");
      __publicField(this, "panel");
      __publicField(this, "separatorElement");
      __publicField(this, "pickerInput");
      __publicField(this, "rangePickerInputs");
      __publicField(this, "inputSize", 12);
      __publicField(this, "inputWidth");
      __publicField(this, "prefixCls", PREFIX_CLASS);
      __publicField(this, "inputValue");
      __publicField(this, "activeBarStyle", {});
      __publicField(this, "overlayOpen", false);
      // Available when "nzOpen" = undefined
      __publicField(this, "overlayPositions", [...DEFAULT_DATE_PICKER_POSITIONS]);
      __publicField(this, "currentPosition", signal({
        originX: "start",
        originY: "bottom"
      }, ...ngDevMode ? [{
        debugName: "currentPosition"
      }] : []));
      __publicField(this, "datepickerAnimationEnter", slideAnimationEnter());
      __publicField(this, "datepickerAnimationLeave", slideAnimationLeave());
      __publicField(this, "dropdownClass", computed(() => {
        const cls = [];
        if (!this.nzInline()) {
          cls.push(this.generateClass("dropdown"));
          const customCls = this.nzDropdownClassName();
          if (customCls) {
            cls.push(customCls);
          }
          const {
            originX,
            originY
          } = this.currentPosition();
          if (originX === "start" && originY === "bottom") {
            cls.push(this.generateClass("dropdown-placement-bottomLeft"));
          } else if (originX === "start" && originY === "top") {
            cls.push(this.generateClass("dropdown-placement-topLeft"));
          } else if (originX === "end" && originY === "bottom") {
            cls.push(this.generateClass("dropdown-placement-bottomRight"));
          } else if (originX === "end" && originY === "top") {
            cls.push(this.generateClass("dropdown-placement-topRight"));
          }
          if (this.dir() === "rtl") {
            cls.push(this.generateClass("dropdown-rtl"));
          }
        }
        return cls;
      }, ...ngDevMode ? [{
        debugName: "dropdownClass"
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
        return this.variant() || ((_a2 = this.formVariant) == null ? void 0 : _a2.call(this)) || "outlined";
      }, ...ngDevMode ? [{
        debugName: "finalVariant"
      }] : []));
      __publicField(this, "size", signal(this.nzSize, ...ngDevMode ? [{
        debugName: "size"
      }] : []));
      __publicField(this, "variant", signal(this.nzVariant, ...ngDevMode ? [{
        debugName: "variant"
      }] : []));
      __publicField(this, "formSize", inject(NZ_FORM_SIZE, {
        optional: true
      }));
      __publicField(this, "formVariant", inject(NZ_FORM_VARIANT, {
        optional: true
      }));
      __publicField(this, "compactSize", inject(NZ_SPACE_COMPACT_SIZE, {
        optional: true
      }));
      __publicField(this, "document", inject(DOCUMENT));
      __publicField(this, "nzFormStatusService", inject(NzFormStatusService, {
        optional: true
      }));
      __publicField(this, "nzFormNoStatusService", inject(NzFormNoStatusService, {
        optional: true
      }));
      // ------------------------------------------------------------------------
      // | Control value accessor implements
      // ------------------------------------------------------------------------
      // NOTE: onChangeFn/onTouchedFn will not be assigned if user not use as ngModel
      __publicField(this, "onChangeFn", () => void 0);
      __publicField(this, "onTouchedFn", () => void 0);
    }
    get nzShowTime() {
      return this.showTime;
    }
    set nzShowTime(value) {
      this.showTime = typeof value === "object" ? value : toBoolean(value);
    }
    get origin() {
      return this.elementRef;
    }
    get realOpenState() {
      return this.isOpenHandledByUser() ? !!this.nzOpen : this.overlayOpen;
    }
    ngAfterViewInit() {
      if (this.nzAutoFocus) {
        this.focus();
      }
      if (this.isRange && this.platform.isBrowser) {
        this.nzResizeObserver.observe(this.elementRef).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.updateInputWidthAndArrowLeft();
        });
      }
      this.datePickerService.inputPartChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((partType) => {
        if (partType) {
          this.datePickerService.activeInput = partType;
        }
        this.focus();
        this.updateInputWidthAndArrowLeft();
      });
      if (this.platform.isBrowser) {
        fromEventOutsideAngular(this.elementRef.nativeElement, "mousedown").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
          if (event.target.tagName.toLowerCase() !== "input") {
            event.preventDefault();
          }
        });
      }
    }
    updateInputWidthAndArrowLeft() {
      var _a2, _b, _c;
      this.inputWidth = ((_b = (_a2 = this.rangePickerInputs) == null ? void 0 : _a2.first) == null ? void 0 : _b.nativeElement.offsetWidth) || 0;
      const baseStyle = {
        position: "absolute",
        width: `${this.inputWidth}px`
      };
      this.datePickerService.arrowLeft = this.datePickerService.activeInput === "left" ? 0 : this.inputWidth + ((_c = this.separatorElement) == null ? void 0 : _c.nativeElement.offsetWidth) || 0;
      if (this.dir() === "rtl") {
        this.activeBarStyle = __spreadProps(__spreadValues({}, baseStyle), {
          right: `${this.datePickerService.arrowLeft}px`
        });
      } else {
        this.activeBarStyle = __spreadProps(__spreadValues({}, baseStyle), {
          left: `${this.datePickerService.arrowLeft}px`
        });
      }
      this.cdr.markForCheck();
    }
    getInput(partType) {
      var _a2, _b;
      if (this.nzInline()) {
        return void 0;
      }
      return this.isRange ? partType === "left" ? (_a2 = this.rangePickerInputs) == null ? void 0 : _a2.first.nativeElement : (_b = this.rangePickerInputs) == null ? void 0 : _b.last.nativeElement : this.pickerInput.nativeElement;
    }
    focus() {
      const activeInputElement = this.getInput(this.datePickerService.activeInput);
      if (this.document.activeElement !== activeInputElement) {
        activeInputElement == null ? void 0 : activeInputElement.focus();
      }
    }
    onFocus(event, partType) {
      event.preventDefault();
      if (partType) {
        this.datePickerService.inputPartChange$.next(partType);
      }
      this.renderClass(true);
    }
    // blur event has not the relatedTarget in IE11, use focusout instead.
    onFocusout(event) {
      event.preventDefault();
      this.onTouchedFn();
      if (!this.elementRef.nativeElement.contains(event.relatedTarget)) {
        this.checkAndClose();
      }
      this.renderClass(false);
    }
    // Show overlay content
    open() {
      if (this.nzInline()) {
        return;
      }
      if (!this.realOpenState && !this.nzDisabled) {
        this.updateInputWidthAndArrowLeft();
        this.overlayOpen = true;
        this.nzOnOpenChange.emit(true);
        this.focus();
        this.cdr.markForCheck();
      }
    }
    close() {
      if (this.nzInline()) {
        return;
      }
      if (this.realOpenState) {
        this.overlayOpen = false;
        this.nzOnOpenChange.emit(false);
      }
    }
    get showClear() {
      return !this.nzDisabled && !this.isEmptyValue(this.datePickerService.value) && this.nzAllowClear;
    }
    checkAndClose() {
      if (!this.realOpenState) {
        return;
      }
      if (this.panel.isAllowed(this.datePickerService.value, true)) {
        if (Array.isArray(this.datePickerService.value) && wrongSortOrder(this.datePickerService.value)) {
          const index = this.datePickerService.getActiveIndex();
          const value = this.datePickerService.value[index];
          this.panel.changeValueFromSelect(value, true);
          return;
        }
        this.updateInputValue();
        this.datePickerService.emitValue$.next();
      } else {
        this.datePickerService.setValue(this.datePickerService.initialValue);
        this.close();
      }
    }
    onClickInputBox(event) {
      event.stopPropagation();
      this.focus();
      if (!this.isOpenHandledByUser()) {
        this.open();
      }
    }
    onOverlayKeydown(event) {
      if (event.keyCode === ESCAPE) {
        this.datePickerService.initValue();
      }
    }
    onPositionChange(position) {
      this.currentPosition.set(position.connectionPair);
    }
    onClickClear(event) {
      event.preventDefault();
      event.stopPropagation();
      this.datePickerService.initValue(true);
      this.datePickerService.emitValue$.next();
    }
    updateInputValue() {
      const newValue = this.datePickerService.value;
      if (this.isRange) {
        this.inputValue = newValue ? newValue.map((v) => this.formatValue(v)) : ["", ""];
      } else {
        this.inputValue = this.formatValue(newValue);
      }
      this.cdr.markForCheck();
    }
    formatValue(value) {
      return this.dateHelper.format(value && value.nativeDate, this.nzFormat);
    }
    onInputChange(value, isEnter = false) {
      if (!this.platform.TRIDENT && this.document.activeElement === this.getInput(this.datePickerService.activeInput) && !this.realOpenState) {
        this.open();
        return;
      }
      const date = this.checkValidDate(value);
      if (date && this.realOpenState) {
        this.panel.changeValueFromSelect(date, isEnter);
      }
    }
    onKeyupEnter(event) {
      this.onInputChange(event.target.value, true);
    }
    checkValidDate(value) {
      const date = new CandyDate(this.dateHelper.parseDate(value, this.nzFormat));
      if (!date.isValid() || value !== this.dateHelper.format(date.nativeDate, this.nzFormat)) {
        return null;
      }
      return date;
    }
    getPlaceholder(partType) {
      return this.isRange ? this.nzPlaceHolder[this.datePickerService.getActiveIndex(partType)] : this.nzPlaceHolder;
    }
    isEmptyValue(value) {
      if (value === null) {
        return true;
      } else if (this.isRange) {
        return !value || !Array.isArray(value) || value.every((val) => !val);
      } else {
        return !value;
      }
    }
    // Whether open state is permanently controlled by user himself
    isOpenHandledByUser() {
      return this.nzOpen !== void 0;
    }
    // ------------------------------------------------------------------------
    // Input API End
    // ------------------------------------------------------------------------
    ngOnInit() {
      var _a2;
      (_a2 = this.nzFormStatusService) == null ? void 0 : _a2.formStatusChanges.pipe(distinctUntilChanged((pre, cur) => {
        return pre.status === cur.status && pre.hasFeedback === cur.hasFeedback;
      }), withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : of(false)), map(([{
        status,
        hasFeedback
      }, noStatus]) => ({
        status: noStatus ? "" : status,
        hasFeedback
      })), takeUntilDestroyed(this.destroyRef)).subscribe(({
        status,
        hasFeedback
      }) => {
        this.setStatusStyles(status, hasFeedback);
      });
      if (!this.nzLocale) {
        this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.setLocale());
      }
      this.datePickerService.isRange = this.isRange;
      this.datePickerService.initValue(true);
      this.datePickerService.emitValue$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        var _a3, _b, _c, _d;
        const granularityComparison = this.showTime ? "second" : "day";
        const value = this.datePickerService.value;
        const datePickerPreviousValue = this.datePickerService.initialValue;
        if (!this.isRange && (value == null ? void 0 : value.isSame(datePickerPreviousValue == null ? void 0 : datePickerPreviousValue.nativeDate, granularityComparison))) {
          this.onTouchedFn();
          return this.close();
        }
        if (this.isRange) {
          const [previousStartDate, previousEndDate] = datePickerPreviousValue;
          const [currentStartDate, currentEndDate] = value;
          if ((previousStartDate == null ? void 0 : previousStartDate.isSame(currentStartDate == null ? void 0 : currentStartDate.nativeDate, granularityComparison)) && (previousEndDate == null ? void 0 : previousEndDate.isSame(currentEndDate == null ? void 0 : currentEndDate.nativeDate, granularityComparison))) {
            this.onTouchedFn();
            return this.close();
          }
        }
        this.datePickerService.initialValue = cloneDate(value);
        if (this.isRange) {
          const vAsRange = value;
          if (vAsRange.length) {
            this.onChangeFn([(_b = (_a3 = vAsRange[0]) == null ? void 0 : _a3.nativeDate) != null ? _b : null, (_d = (_c = vAsRange[1]) == null ? void 0 : _c.nativeDate) != null ? _d : null]);
          } else {
            this.onChangeFn([]);
          }
        } else {
          if (value) {
            this.onChangeFn(value.nativeDate);
          } else {
            this.onChangeFn(null);
          }
        }
        this.onTouchedFn();
        this.close();
      });
      this.inputValue = this.isRange ? ["", ""] : "";
      this.setModeAndFormat();
      this.datePickerService.valueChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.updateInputValue();
      });
    }
    ngOnChanges({
      nzStatus,
      nzPlacement,
      nzPopupStyle,
      nzPlaceHolder,
      nzLocale,
      nzFormat,
      nzRenderExtraFooter,
      nzMode,
      nzSize,
      nzVariant
    }) {
      if (nzPopupStyle) {
        this.nzPopupStyle = this.nzPopupStyle ? __spreadValues(__spreadValues({}, this.nzPopupStyle), POPUP_STYLE_PATCH) : POPUP_STYLE_PATCH;
      }
      if (nzPlaceHolder == null ? void 0 : nzPlaceHolder.currentValue) {
        this.isCustomPlaceHolder = true;
      }
      if (nzFormat == null ? void 0 : nzFormat.currentValue) {
        this.isCustomFormat = true;
        this.updateInputValue();
      }
      if (nzLocale) {
        this.setDefaultPlaceHolder();
      }
      if (nzRenderExtraFooter) {
        this.extraFooter = valueFunctionProp(this.nzRenderExtraFooter);
      }
      if (nzMode) {
        this.setDefaultPlaceHolder();
        this.setModeAndFormat();
      }
      if (nzStatus) {
        this.setStatusStyles(this.nzStatus, this.hasFeedback);
      }
      if (nzPlacement) {
        this.setPlacement(this.nzPlacement);
      }
      if (nzSize) {
        this.size.set(nzSize.currentValue);
      }
      if (nzVariant) {
        this.variant.set(nzVariant.currentValue);
      }
    }
    setModeAndFormat() {
      const inputFormats = {
        year: "yyyy",
        quarter: "yyyy-[Q]Q",
        month: "yyyy-MM",
        week: "YYYY-ww",
        date: this.nzShowTime ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd"
      };
      if (!this.nzMode) {
        this.nzMode = "date";
      }
      this.panelMode = this.isRange ? [this.nzMode, this.nzMode] : this.nzMode;
      if (!this.isCustomFormat) {
        this.nzFormat = inputFormats[this.nzMode];
      }
      this.inputSize = Math.max(10, this.nzFormat.length) + 2;
      this.updateInputValue();
    }
    /**
     * Triggered when overlayOpen changes (different with realOpenState)
     *
     * @param open The overlayOpen in picker component
     */
    onOpenChange(open) {
      this.nzOnOpenChange.emit(open);
    }
    writeValue(value) {
      this.setValue(value);
      this.cdr.markForCheck();
    }
    registerOnChange(fn) {
      this.onChangeFn = fn;
    }
    registerOnTouched(fn) {
      this.onTouchedFn = fn;
    }
    setDisabledState(isDisabled) {
      this.nzDisabled = this.isNzDisableFirstChange && this.nzDisabled || isDisabled;
      this.cdr.markForCheck();
      this.isNzDisableFirstChange = false;
    }
    // ------------------------------------------------------------------------
    // | Internal methods
    // ------------------------------------------------------------------------
    // Reload locale from i18n with side effects
    setLocale() {
      this.nzLocale = this.i18n.getLocaleData("DatePicker", {});
      this.setDefaultPlaceHolder();
      this.cdr.markForCheck();
    }
    setDefaultPlaceHolder() {
      if (!this.isCustomPlaceHolder && this.nzLocale) {
        const defaultPlaceholder = {
          year: this.getPropertyOfLocale("yearPlaceholder"),
          quarter: this.getPropertyOfLocale("quarterPlaceholder"),
          month: this.getPropertyOfLocale("monthPlaceholder"),
          week: this.getPropertyOfLocale("weekPlaceholder"),
          date: this.getPropertyOfLocale("placeholder")
        };
        const defaultRangePlaceholder = {
          year: this.getPropertyOfLocale("rangeYearPlaceholder"),
          quarter: this.getPropertyOfLocale("rangeQuarterPlaceholder"),
          month: this.getPropertyOfLocale("rangeMonthPlaceholder"),
          week: this.getPropertyOfLocale("rangeWeekPlaceholder"),
          date: this.getPropertyOfLocale("rangePlaceholder")
        };
        this.nzPlaceHolder = this.isRange ? defaultRangePlaceholder[this.nzMode] : defaultPlaceholder[this.nzMode];
      }
    }
    getPropertyOfLocale(type) {
      return this.nzLocale.lang[type] || this.i18n.getLocaleData(`DatePicker.lang.${type}`);
    }
    // Safe way of setting value with default
    setValue(value) {
      const newValue = this.datePickerService.makeValue(value);
      this.datePickerService.setValue(newValue);
      this.datePickerService.initialValue = cloneDate(newValue);
      this.cdr.detectChanges();
    }
    renderClass(value) {
      if (value) {
        this.renderer.addClass(this.elementRef.nativeElement, "ant-picker-focused");
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, "ant-picker-focused");
      }
    }
    onPanelModeChange(panelChange) {
      this.nzOnPanelChange.emit(panelChange);
    }
    // Emit nzOnCalendarChange when select date by nz-range-picker
    onCalendarChange(value) {
      if (this.isRange && Array.isArray(value)) {
        const rangeValue = value.filter((x) => x instanceof CandyDate).map((x) => x.nativeDate);
        this.nzOnCalendarChange.emit(rangeValue);
      }
    }
    onResultOk() {
      var _a2, _b;
      if (this.isRange) {
        const value = this.datePickerService.value;
        if (value.length) {
          this.nzOnOk.emit([((_a2 = value[0]) == null ? void 0 : _a2.nativeDate) || null, ((_b = value[1]) == null ? void 0 : _b.nativeDate) || null]);
        } else {
          this.nzOnOk.emit([]);
        }
      } else {
        if (this.datePickerService.value) {
          this.nzOnOk.emit(this.datePickerService.value.nativeDate);
        } else {
          this.nzOnOk.emit(null);
        }
      }
    }
    // status
    setStatusStyles(status, hasFeedback) {
      this.status = status;
      this.hasFeedback = hasFeedback;
      this.cdr.markForCheck();
      this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
      Object.keys(this.statusCls).forEach((status2) => {
        if (this.statusCls[status2]) {
          this.renderer.addClass(this.elementRef.nativeElement, status2);
        } else {
          this.renderer.removeClass(this.elementRef.nativeElement, status2);
        }
      });
    }
    setPlacement(placement) {
      const position = DATE_PICKER_POSITION_MAP[placement];
      this.overlayPositions = [position, ...DEFAULT_DATE_PICKER_POSITIONS];
      this.currentPosition.set(position);
    }
    generateClass(suffix) {
      return generateClassName(this.prefixCls, suffix);
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzVariant_decorators = [WithConfig()];
    _nzSeparator_decorators = [WithConfig()];
    _nzSuffixIcon_decorators = [WithConfig()];
    _nzBackdrop_decorators = [WithConfig()];
    __esDecorate(null, null, _nzVariant_decorators, {
      kind: "field",
      name: "nzVariant",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzVariant" in obj,
        get: (obj) => obj.nzVariant,
        set: (obj, value) => {
          obj.nzVariant = value;
        }
      },
      metadata: _metadata
    }, _nzVariant_initializers, _nzVariant_extraInitializers);
    __esDecorate(null, null, _nzSeparator_decorators, {
      kind: "field",
      name: "nzSeparator",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSeparator" in obj,
        get: (obj) => obj.nzSeparator,
        set: (obj, value) => {
          obj.nzSeparator = value;
        }
      },
      metadata: _metadata
    }, _nzSeparator_initializers, _nzSeparator_extraInitializers);
    __esDecorate(null, null, _nzSuffixIcon_decorators, {
      kind: "field",
      name: "nzSuffixIcon",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSuffixIcon" in obj,
        get: (obj) => obj.nzSuffixIcon,
        set: (obj, value) => {
          obj.nzSuffixIcon = value;
        }
      },
      metadata: _metadata
    }, _nzSuffixIcon_initializers, _nzSuffixIcon_extraInitializers);
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
  })(), __publicField(_a, "ngAcceptInputType_nzShowTime"), __publicField(_a, "ngAcceptInputType_nzMode"), __publicField(_a, "\u0275fac", function NzDatePickerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-date-picker"], ["nz-week-picker"], ["nz-month-picker"], ["nz-quarter-picker"], ["nz-year-picker"], ["nz-range-picker"]],
    viewQuery: function NzDatePickerComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(CdkConnectedOverlay, 5)(DateRangePopupComponent, 5)(_c45, 5)(_c53, 5)(_c63, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.cdkConnectedOverlay = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.panel = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.separatorElement = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.pickerInput = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.rangePickerInputs = _t);
      }
    },
    hostVars: 20,
    hostBindings: function NzDatePickerComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function NzDatePickerComponent_click_HostBindingHandler($event) {
          return ctx.onClickInputBox($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275classProp("ant-picker", true)("ant-picker-range", ctx.isRange)("ant-picker-large", ctx.finalSize() === "large")("ant-picker-small", ctx.finalSize() === "small")("ant-picker-disabled", ctx.nzDisabled)("ant-picker-rtl", ctx.dir() === "rtl")("ant-picker-borderless", ctx.finalVariant() === "borderless")("ant-picker-filled", ctx.finalVariant() === "filled")("ant-picker-underlined", ctx.finalVariant() === "underlined")("ant-picker-inline", ctx.nzInline());
      }
    },
    inputs: {
      nzInline: [1, "nzInline"],
      nzAllowClear: [2, "nzAllowClear", "nzAllowClear", booleanAttribute],
      nzAutoFocus: [2, "nzAutoFocus", "nzAutoFocus", booleanAttribute],
      nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
      nzInputReadOnly: [2, "nzInputReadOnly", "nzInputReadOnly", booleanAttribute],
      nzOpen: [2, "nzOpen", "nzOpen", booleanAttribute],
      nzDisabledDate: "nzDisabledDate",
      nzLocale: "nzLocale",
      nzPlaceHolder: "nzPlaceHolder",
      nzPopupStyle: "nzPopupStyle",
      nzDropdownClassName: [1, "nzDropdownClassName"],
      nzSize: "nzSize",
      nzStatus: "nzStatus",
      nzFormat: "nzFormat",
      nzVariant: "nzVariant",
      nzDateRender: "nzDateRender",
      nzDisabledTime: "nzDisabledTime",
      nzRenderExtraFooter: "nzRenderExtraFooter",
      nzShowToday: [2, "nzShowToday", "nzShowToday", booleanAttribute],
      nzMode: "nzMode",
      nzShowNow: [2, "nzShowNow", "nzShowNow", booleanAttribute],
      nzRanges: "nzRanges",
      nzDefaultPickerValue: "nzDefaultPickerValue",
      nzSeparator: "nzSeparator",
      nzSuffixIcon: "nzSuffixIcon",
      nzBackdrop: "nzBackdrop",
      nzId: "nzId",
      nzPlacement: "nzPlacement",
      nzShowWeekNumber: [2, "nzShowWeekNumber", "nzShowWeekNumber", booleanAttribute],
      nzShowTime: "nzShowTime"
    },
    outputs: {
      nzOnPanelChange: "nzOnPanelChange",
      nzOnCalendarChange: "nzOnCalendarChange",
      nzOnOk: "nzOnOk",
      nzOnOpenChange: "nzOnOpenChange"
    },
    exportAs: ["nzDatePicker"],
    features: [\u0275\u0275ProvidersFeature([DatePickerService, {
      provide: NZ_SPACE_COMPACT_ITEM_TYPE,
      useValue: "picker"
    }, {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => _a)
    }]), \u0275\u0275HostDirectivesFeature([NzSpaceCompactItemDirective]), \u0275\u0275NgOnChangesFeature],
    decls: 9,
    vars: 7,
    consts: [["tplRangeInput", ""], ["tplRightRest", ""], ["inlineMode", ""], ["pickerInput", ""], ["separatorElement", ""], ["rangePickerInput", ""], [3, "ngTemplateOutlet"], ["cdkConnectedOverlay", "", "nzConnectedOverlay", "", 3, "positionChange", "detach", "overlayKeydown", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen", "cdkConnectedOverlayPositions"], [3, "class"], ["autocomplete", "off", 3, "ngModelChange", "focus", "focusout", "keyup.enter", "disabled", "readOnly", "ngModel", "placeholder", "size"], [4, "ngTemplateOutlet"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "nzStringTemplateOutlet"], ["nzType", "swap-right", "nzTheme", "outline"], ["autocomplete", "off", 3, "click", "focusout", "focus", "keyup.enter", "ngModelChange", "disabled", "readOnly", "size", "ngModel", "placeholder"], [3, "status"], [3, "click"], ["nzType", "close-circle", "nzTheme", "fill"], [3, "nzType"], [3, "panelModeChange", "calendarChange", "resultOk", "isRange", "inline", "defaultPickerValue", "showWeek", "panelMode", "locale", "showToday", "showNow", "showTime", "dateRender", "disabledDate", "disabledTime", "extraFooter", "ranges", "dir", "format"]],
    template: function NzDatePickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, NzDatePickerComponent_Conditional_0_Template, 2, 1)(1, NzDatePickerComponent_Conditional_1_Template, 1, 1, null, 6);
        \u0275\u0275template(2, NzDatePickerComponent_ng_template_2_Template, 2, 7, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(4, NzDatePickerComponent_ng_template_4_Template, 5, 11, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(6, NzDatePickerComponent_ng_template_6_Template, 2, 26, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(8, NzDatePickerComponent_ng_template_8_Template, 1, 1, "ng-template", 7);
        \u0275\u0275listener("positionChange", function NzDatePickerComponent_Template_ng_template_positionChange_8_listener($event) {
          return ctx.onPositionChange($event);
        })("detach", function NzDatePickerComponent_Template_ng_template_detach_8_listener() {
          return ctx.close();
        })("overlayKeydown", function NzDatePickerComponent_Template_ng_template_overlayKeydown_8_listener($event) {
          return ctx.onOverlayKeydown($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275conditional(!ctx.nzInline() ? 0 : 1);
        \u0275\u0275advance(8);
        \u0275\u0275property("cdkConnectedOverlayTransformOriginOn", \u0275\u0275interpolate1(".", ctx.prefixCls, "-dropdown"))("cdkConnectedOverlayHasBackdrop", ctx.nzBackdrop)("cdkConnectedOverlayOrigin", ctx.origin)("cdkConnectedOverlayOpen", ctx.realOpenState)("cdkConnectedOverlayPositions", ctx.overlayPositions);
      }
    },
    dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, NgTemplateOutlet, NzOutletModule, NzStringTemplateOutletDirective, NzIconModule, NzIconDirective, NzFormItemFeedbackIconComponent, DateRangePopupComponent, CdkConnectedOverlay, NzOverlayModule, NzConnectedOverlayDirective],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDatePickerComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "nz-date-picker,nz-week-picker,nz-month-picker,nz-quarter-picker,nz-year-picker,nz-range-picker",
      exportAs: "nzDatePicker",
      template: `
    @if (!nzInline()) {
      @if (!isRange) {
        <div class="{{ prefixCls }}-input">
          <input
            #pickerInput
            [attr.id]="nzId"
            [class.ant-input-disabled]="nzDisabled"
            [disabled]="nzDisabled"
            [readOnly]="nzInputReadOnly"
            [(ngModel)]="inputValue"
            placeholder="{{ getPlaceholder() }}"
            [size]="inputSize"
            autocomplete="off"
            (focus)="onFocus($event)"
            (focusout)="onFocusout($event)"
            (ngModelChange)="onInputChange($event)"
            (keyup.enter)="onKeyupEnter($event)"
          />
          <ng-container *ngTemplateOutlet="tplRightRest" />
        </div>
      } @else {
        <div class="{{ prefixCls }}-input">
          <ng-container *ngTemplateOutlet="tplRangeInput; context: { partType: 'left' }" />
        </div>
        <div #separatorElement class="{{ prefixCls }}-range-separator">
          <span class="{{ prefixCls }}-separator">
            <ng-container *nzStringTemplateOutlet="nzSeparator; let separator">
              @if (nzSeparator) {
                {{ nzSeparator }}
              } @else {
                <nz-icon nzType="swap-right" nzTheme="outline" />
              }
            </ng-container>
          </span>
        </div>
        <div class="{{ prefixCls }}-input">
          <ng-container *ngTemplateOutlet="tplRangeInput; context: { partType: 'right' }" />
        </div>
        <ng-container *ngTemplateOutlet="tplRightRest" />
      }
    } @else {
      <ng-template [ngTemplateOutlet]="inlineMode" />
    }
    <!-- Input for Range ONLY -->
    <ng-template #tplRangeInput let-partType="partType">
      <input
        #rangePickerInput
        [attr.id]="nzId"
        [disabled]="nzDisabled"
        [readOnly]="nzInputReadOnly"
        [size]="inputSize"
        autocomplete="off"
        (click)="onClickInputBox($event)"
        (focusout)="onFocusout($event)"
        (focus)="onFocus($event, partType)"
        (keyup.enter)="onKeyupEnter($event)"
        [(ngModel)]="inputValue[datePickerService.getActiveIndex(partType)]"
        (ngModelChange)="onInputChange($event)"
        placeholder="{{ getPlaceholder(partType) }}"
      />
    </ng-template>

    <!-- Right operator icons -->
    <ng-template #tplRightRest>
      <div class="{{ prefixCls }}-active-bar" [style]="activeBarStyle"></div>
      @if (showClear) {
        <span class="{{ prefixCls }}-clear" (click)="onClickClear($event)">
          <nz-icon nzType="close-circle" nzTheme="fill" />
        </span>
      }

      <span class="{{ prefixCls }}-suffix">
        <ng-container *nzStringTemplateOutlet="nzSuffixIcon; let suffixIcon">
          <nz-icon [nzType]="suffixIcon" />
        </ng-container>
        @if (hasFeedback && !!status) {
          <nz-form-item-feedback-icon [status]="status" />
        }
      </span>
    </ng-template>

    <ng-template #inlineMode>
      <div
        [class]="dropdownClass()"
        [class.ant-picker-dropdown-range]="!nzInline() && isRange"
        [class.ant-picker-active-left]="datePickerService.activeInput === 'left'"
        [class.ant-picker-active-right]="datePickerService.activeInput === 'right'"
        [style]="nzPopupStyle"
        [animate.enter]="$any(!nzInline() && datepickerAnimationEnter())"
        [animate.leave]="$any(!nzInline() && datepickerAnimationLeave())"
      >
        <date-range-popup
          [isRange]="isRange"
          [inline]="nzInline()"
          [defaultPickerValue]="nzDefaultPickerValue"
          [showWeek]="nzShowWeekNumber || nzMode === 'week'"
          [panelMode]="panelMode"
          (panelModeChange)="onPanelModeChange($event)"
          (calendarChange)="onCalendarChange($event)"
          [locale]="nzLocale?.lang!"
          [showToday]="nzMode === 'date' && nzShowToday && !isRange && !nzShowTime"
          [showNow]="nzMode === 'date' && nzShowNow && !isRange && !!nzShowTime"
          [showTime]="nzShowTime"
          [dateRender]="nzDateRender"
          [disabledDate]="nzDisabledDate"
          [disabledTime]="nzDisabledTime"
          [extraFooter]="extraFooter"
          [ranges]="nzRanges"
          [dir]="dir()"
          [format]="nzFormat"
          (resultOk)="onResultOk()"
        />
      </div>
    </ng-template>

    <!-- Overlay -->
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      cdkConnectedOverlayTransformOriginOn=".{{ prefixCls }}-dropdown"
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="realOpenState"
      [cdkConnectedOverlayPositions]="overlayPositions"
      (positionChange)="onPositionChange($event)"
      (detach)="close()"
      (overlayKeydown)="onOverlayKeydown($event)"
    >
      <ng-container *ngTemplateOutlet="inlineMode" />
    </ng-template>
  `,
      host: {
        "[class.ant-picker]": `true`,
        "[class.ant-picker-range]": `isRange`,
        "[class.ant-picker-large]": `finalSize() === 'large'`,
        "[class.ant-picker-small]": `finalSize() === 'small'`,
        "[class.ant-picker-disabled]": `nzDisabled`,
        "[class.ant-picker-rtl]": `dir() === 'rtl'`,
        "[class.ant-picker-borderless]": `finalVariant() === 'borderless'`,
        "[class.ant-picker-filled]": `finalVariant() === 'filled'`,
        "[class.ant-picker-underlined]": `finalVariant() === 'underlined'`,
        "[class.ant-picker-inline]": `nzInline()`,
        "(click)": "onClickInputBox($event)"
      },
      hostDirectives: [NzSpaceCompactItemDirective],
      providers: [DatePickerService, {
        provide: NZ_SPACE_COMPACT_ITEM_TYPE,
        useValue: "picker"
      }, {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => NzDatePickerComponent)
      }],
      imports: [FormsModule, NgTemplateOutlet, NzOutletModule, NzIconModule, NzFormItemFeedbackIconComponent, DateRangePopupComponent, CdkConnectedOverlay, NzOverlayModule]
    }]
  }], null, {
    nzInline: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzInline",
        required: false
      }]
    }],
    nzAllowClear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
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
    nzInputReadOnly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOpen: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDisabledDate: [{
      type: Input
    }],
    nzLocale: [{
      type: Input
    }],
    nzPlaceHolder: [{
      type: Input
    }],
    nzPopupStyle: [{
      type: Input
    }],
    nzDropdownClassName: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzDropdownClassName",
        required: false
      }]
    }],
    nzSize: [{
      type: Input
    }],
    nzStatus: [{
      type: Input
    }],
    nzFormat: [{
      type: Input
    }],
    nzVariant: [{
      type: Input
    }],
    nzDateRender: [{
      type: Input
    }],
    nzDisabledTime: [{
      type: Input
    }],
    nzRenderExtraFooter: [{
      type: Input
    }],
    nzShowToday: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzMode: [{
      type: Input
    }],
    nzShowNow: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzRanges: [{
      type: Input
    }],
    nzDefaultPickerValue: [{
      type: Input
    }],
    nzSeparator: [{
      type: Input
    }],
    nzSuffixIcon: [{
      type: Input
    }],
    nzBackdrop: [{
      type: Input
    }],
    nzId: [{
      type: Input
    }],
    nzPlacement: [{
      type: Input
    }],
    nzShowWeekNumber: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOnPanelChange: [{
      type: Output
    }],
    nzOnCalendarChange: [{
      type: Output
    }],
    nzOnOk: [{
      type: Output
    }],
    nzOnOpenChange: [{
      type: Output
    }],
    nzShowTime: [{
      type: Input
    }],
    cdkConnectedOverlay: [{
      type: ViewChild,
      args: [CdkConnectedOverlay, {
        static: false
      }]
    }],
    panel: [{
      type: ViewChild,
      args: [DateRangePopupComponent, {
        static: false
      }]
    }],
    separatorElement: [{
      type: ViewChild,
      args: ["separatorElement", {
        static: false
      }]
    }],
    pickerInput: [{
      type: ViewChild,
      args: ["pickerInput", {
        static: false
      }]
    }],
    rangePickerInputs: [{
      type: ViewChildren,
      args: ["rangePickerInput"]
    }]
  });
})();
var _NzMonthPickerComponent = class _NzMonthPickerComponent {
  constructor() {
    __publicField(this, "datePicker", inject(NzDatePickerComponent, {
      host: true
    }));
    this.datePicker.nzMode = "month";
  }
};
__publicField(_NzMonthPickerComponent, "\u0275fac", function NzMonthPickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzMonthPickerComponent)();
});
__publicField(_NzMonthPickerComponent, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzMonthPickerComponent,
  selectors: [["nz-month-picker"]],
  exportAs: ["nzMonthPicker"]
}));
var NzMonthPickerComponent = _NzMonthPickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzMonthPickerComponent, [{
    type: Directive,
    args: [{
      selector: "nz-month-picker",
      exportAs: "nzMonthPicker"
    }]
  }], () => [], null);
})();
var _NzQuarterPickerComponent = class _NzQuarterPickerComponent {
  constructor() {
    __publicField(this, "datePicker", inject(NzDatePickerComponent, {
      host: true
    }));
    this.datePicker.nzMode = "quarter";
  }
};
__publicField(_NzQuarterPickerComponent, "\u0275fac", function NzQuarterPickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzQuarterPickerComponent)();
});
__publicField(_NzQuarterPickerComponent, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzQuarterPickerComponent,
  selectors: [["nz-quarter-picker"]],
  exportAs: ["nzQuarterPicker"]
}));
var NzQuarterPickerComponent = _NzQuarterPickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzQuarterPickerComponent, [{
    type: Directive,
    args: [{
      selector: "nz-quarter-picker",
      exportAs: "nzQuarterPicker"
    }]
  }], () => [], null);
})();
var _NzRangePickerComponent = class _NzRangePickerComponent {
  constructor() {
    __publicField(this, "datePicker", inject(NzDatePickerComponent, {
      host: true
    }));
    this.datePicker.isRange = true;
  }
};
__publicField(_NzRangePickerComponent, "\u0275fac", function NzRangePickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzRangePickerComponent)();
});
__publicField(_NzRangePickerComponent, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzRangePickerComponent,
  selectors: [["nz-range-picker"]],
  exportAs: ["nzRangePicker"]
}));
var NzRangePickerComponent = _NzRangePickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRangePickerComponent, [{
    type: Directive,
    args: [{
      selector: "nz-range-picker",
      exportAs: "nzRangePicker"
    }]
  }], () => [], null);
})();
var _NzWeekPickerComponent = class _NzWeekPickerComponent {
  constructor() {
    __publicField(this, "datePicker", inject(NzDatePickerComponent, {
      host: true
    }));
    this.datePicker.nzMode = "week";
  }
};
__publicField(_NzWeekPickerComponent, "\u0275fac", function NzWeekPickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzWeekPickerComponent)();
});
__publicField(_NzWeekPickerComponent, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzWeekPickerComponent,
  selectors: [["nz-week-picker"]],
  exportAs: ["nzWeekPicker"]
}));
var NzWeekPickerComponent = _NzWeekPickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzWeekPickerComponent, [{
    type: Directive,
    args: [{
      selector: "nz-week-picker",
      exportAs: "nzWeekPicker"
    }]
  }], () => [], null);
})();
var _NzYearPickerComponent = class _NzYearPickerComponent {
  constructor() {
    __publicField(this, "datePicker", inject(NzDatePickerComponent, {
      host: true
    }));
    this.datePicker.nzMode = "year";
  }
};
__publicField(_NzYearPickerComponent, "\u0275fac", function NzYearPickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzYearPickerComponent)();
});
__publicField(_NzYearPickerComponent, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzYearPickerComponent,
  selectors: [["nz-year-picker"]],
  exportAs: ["nzYearPicker"]
}));
var NzYearPickerComponent = _NzYearPickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzYearPickerComponent, [{
    type: Directive,
    args: [{
      selector: "nz-year-picker",
      exportAs: "nzYearPicker"
    }]
  }], () => [], null);
})();
var _NzDatePickerModule = class _NzDatePickerModule {
};
__publicField(_NzDatePickerModule, "\u0275fac", function NzDatePickerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzDatePickerModule)();
});
__publicField(_NzDatePickerModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzDatePickerModule,
  imports: [NzDatePickerComponent, NzMonthPickerComponent, NzYearPickerComponent, NzWeekPickerComponent, NzRangePickerComponent, CalendarFooterComponent, InnerPopupComponent, DateRangePopupComponent, NzQuarterPickerComponent],
  exports: [NzDatePickerComponent, NzRangePickerComponent, NzMonthPickerComponent, NzYearPickerComponent, NzWeekPickerComponent, NzQuarterPickerComponent]
}));
__publicField(_NzDatePickerModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzDatePickerComponent, CalendarFooterComponent, InnerPopupComponent, DateRangePopupComponent]
}));
var NzDatePickerModule = _NzDatePickerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDatePickerModule, [{
    type: NgModule,
    args: [{
      imports: [NzDatePickerComponent, NzMonthPickerComponent, NzYearPickerComponent, NzWeekPickerComponent, NzRangePickerComponent, CalendarFooterComponent, InnerPopupComponent, DateRangePopupComponent, NzQuarterPickerComponent],
      exports: [NzDatePickerComponent, NzRangePickerComponent, NzMonthPickerComponent, NzYearPickerComponent, NzWeekPickerComponent, NzQuarterPickerComponent]
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
  NzDividerModule,
  NzRadioGroupComponent,
  NzRadioComponent,
  NzRadioModule,
  NzEmptyComponent,
  NzEmbedEmptyComponent,
  NzEmptyModule,
  NzOptionComponent,
  NzSelectComponent,
  NzSelectModule,
  NzSpinComponent,
  NzSpinModule,
  NzCellFixedDirective,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTableFixedRowComponent,
  NzTbodyComponent,
  NzTableComponent,
  NzTrDirective,
  NzTheadComponent,
  NzTrExpandDirective,
  NzTableModule,
  NzTagComponent,
  NzTagModule,
  NzDatePickerComponent,
  NzRangePickerComponent,
  NzDatePickerModule
};
//# sourceMappingURL=chunk-SYOZIKP7.js.map
