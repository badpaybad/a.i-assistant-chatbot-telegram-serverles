import {
  DEFAULT_TOOLTIP_POSITIONS,
  NzConnectedOverlayDirective,
  NzI18nModule,
  NzI18nPipe,
  NzI18nService,
  NzNoAnimationDirective,
  NzOverlayModule,
  POSITION_MAP,
  TOOLTIP_OFFSET_MAP,
  getPlacementName,
  isAnimationEnabled,
  setConnectedPositionOffset,
  withAnimationCheck
} from "./chunk-RGWSEG6V.js";
import {
  NzGridModule
} from "./chunk-U7OJRUBM.js";
import {
  AbstractControl,
  CdkConnectedOverlay,
  Directionality,
  FormControlDirective,
  FormControlName,
  NZ_FORM_SIZE,
  NZ_FORM_VARIANT,
  NgControl,
  NgModel,
  NgTemplateOutlet,
  NzConfigService,
  NzFormStatusService,
  NzIconDirective,
  NzIconModule,
  NzOutletModule,
  NzStringTemplateOutletDirective,
  OverlayModule,
  WithConfig,
  _getEventTarget,
  isNotNil,
  isPlatformBrowser,
  isPresetColor,
  isTemplateRef,
  takeUntilDestroyed,
  toBoolean
} from "./chunk-OCLTPTCJ.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  PLATFORM_ID,
  Renderer2,
  Subject,
  Subscription,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  asapScheduler,
  booleanAttribute,
  computed,
  delay,
  distinctUntilChanged,
  filter,
  inject,
  input,
  map,
  setClassMetadata,
  startWith,
  tap,
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
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
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
  ɵɵstyleMap,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-6BQPXFZE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-653SOEEV.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-tooltip.mjs
var _c0 = ["overlay"];
function NzTooltipComponent_ng_template_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.nzTitle);
  }
}
function NzTooltipComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275animateLeave(function NzTooltipComponent_ng_template_0_Template_animateleave_cb() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.zoomAnimationLeave());
    });
    \u0275\u0275animateEnter(function NzTooltipComponent_ng_template_0_Template_animateenter_cb() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.zoomAnimationEnter());
    });
    \u0275\u0275element(1, "div", 3);
    \u0275\u0275elementStart(2, "div", 4)(3, "div", 5);
    \u0275\u0275template(4, NzTooltipComponent_ng_template_0_ng_container_4_Template, 2, 1, "ng-container", 6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r1.nzOverlayStyle);
    \u0275\u0275classMap(ctx_r1._classMap);
    \u0275\u0275classProp("ant-tooltip-rtl", ctx_r1.dir() === "rtl");
    \u0275\u0275property("nzNoAnimation", !!(ctx_r1.noAnimation == null ? null : ctx_r1.noAnimation.nzNoAnimation == null ? null : ctx_r1.noAnimation.nzNoAnimation()));
    \u0275\u0275advance();
    \u0275\u0275styleMap(ctx_r1._arrowStyleMap);
    \u0275\u0275advance(2);
    \u0275\u0275styleMap(ctx_r1._contentStyleMap);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzTitle)("nzStringTemplateOutletContext", ctx_r1.nzTitleContext);
  }
}
var NzTooltipBaseDirective = class _NzTooltipBaseDirective {
  componentType;
  config;
  /** @deprecated Default is false, and customization is no longer supported. This will be removed in v22.0.0. */
  cdkConnectedOverlayPush = false;
  visibleChange = new EventEmitter();
  /**
   * This true title that would be used in other parts on this component.
   */
  get _title() {
    return this.title || this.directiveTitle || null;
  }
  get _content() {
    return this.content || this.directiveContent || null;
  }
  get _trigger() {
    return typeof this.trigger !== "undefined" ? this.trigger : "hover";
  }
  get _placement() {
    const p = this.placement;
    return Array.isArray(p) && p.length > 0 ? p : typeof p === "string" && p ? [p] : ["top"];
  }
  get _visible() {
    return (typeof this.visible !== "undefined" ? this.visible : this.internalVisible) || false;
  }
  get _mouseEnterDelay() {
    return this.mouseEnterDelay || 0.15;
  }
  get _mouseLeaveDelay() {
    return this.mouseLeaveDelay || 0.1;
  }
  get _overlayClassName() {
    return this.overlayClassName || null;
  }
  get _overlayStyle() {
    return this.overlayStyle || null;
  }
  get _overlayClickable() {
    return this.overlayClickable ?? true;
  }
  internalVisible = false;
  getProxyPropertyMap() {
    return {
      noAnimation: ["noAnimation", () => !!this.noAnimation]
    };
  }
  component;
  destroy$ = new Subject();
  triggerDisposables = [];
  delayTimer;
  elementRef = inject(ElementRef);
  hostView = inject(ViewContainerRef);
  renderer = inject(Renderer2);
  noAnimation = inject(NzNoAnimationDirective, {
    host: true,
    optional: true
  });
  nzConfigService = inject(NzConfigService);
  destroyRef = inject(DestroyRef);
  platformId = inject(PLATFORM_ID);
  constructor(componentType) {
    this.componentType = componentType;
    this.destroyRef.onDestroy(() => {
      this.clearTogglingTimer();
      this.removeTriggerListeners();
    });
  }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createComponent();
      this.registerTriggers();
    }
  }
  ngOnChanges(changes) {
    const {
      trigger
    } = changes;
    if (trigger && !trigger.isFirstChange()) {
      this.registerTriggers();
    }
    if (this.component) {
      this.updatePropertiesByChanges(changes);
    }
  }
  show() {
    this.component?.show();
  }
  hide() {
    this.component?.hide();
  }
  /**
   * Force the component to update its position.
   */
  updatePosition() {
    if (this.component) {
      this.component.updatePosition();
    }
  }
  /**
   * Create a dynamic tooltip component. This method can be overridden.
   */
  createComponent() {
    const componentRef = this.hostView.createComponent(this.componentType);
    this.component = componentRef.instance;
    this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), componentRef.location.nativeElement);
    this.component.setOverlayOrigin(this.origin || this.elementRef);
    this.initProperties();
    const visibleChange$ = this.component.nzVisibleChange.pipe(distinctUntilChanged());
    visibleChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((visible) => {
      this.internalVisible = visible;
      this.visibleChange.emit(visible);
    });
    visibleChange$.pipe(filter(Boolean), delay(0, asapScheduler), filter(() => Boolean(this.component?.overlay?.overlayRef)), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.component?.updatePosition();
    });
  }
  registerTriggers() {
    const el = this.elementRef.nativeElement;
    const trigger = this.trigger;
    this.removeTriggerListeners();
    if (trigger === "hover") {
      let overlayElement;
      this.triggerDisposables.push(this.renderer.listen(el, "mouseenter", () => {
        this.delayEnterLeave(true, true, this._mouseEnterDelay);
      }));
      this.triggerDisposables.push(this.renderer.listen(el, "mouseleave", () => {
        this.delayEnterLeave(true, false, this._mouseLeaveDelay);
        if (this.component?.overlay.overlayRef && !overlayElement) {
          overlayElement = this.component.overlay.overlayRef.overlayElement;
          this.triggerDisposables.push(this.renderer.listen(overlayElement, "mouseenter", () => {
            this.delayEnterLeave(false, true, this._mouseEnterDelay);
          }));
          this.triggerDisposables.push(this.renderer.listen(overlayElement, "mouseleave", () => {
            this.delayEnterLeave(false, false, this._mouseLeaveDelay);
          }));
        }
      }));
    } else if (trigger === "focus") {
      this.triggerDisposables.push(this.renderer.listen(el, "focusin", () => this.show()));
      this.triggerDisposables.push(this.renderer.listen(el, "focusout", () => this.hide()));
    } else if (trigger === "click") {
      this.triggerDisposables.push(this.renderer.listen(el, "click", (e) => {
        e.preventDefault();
        this.show();
      }));
    }
  }
  updatePropertiesByChanges(changes) {
    this.updatePropertiesByKeys(Object.keys(changes));
  }
  updatePropertiesByKeys(keys) {
    const mappingProperties = __spreadValues({
      // common mappings
      title: ["nzTitle", () => this._title],
      directiveTitle: ["nzTitle", () => this._title],
      content: ["nzContent", () => this._content],
      directiveContent: ["nzContent", () => this._content],
      trigger: ["nzTrigger", () => this._trigger],
      placement: ["nzPlacement", () => this._placement],
      visible: ["nzVisible", () => this._visible],
      mouseEnterDelay: ["nzMouseEnterDelay", () => this._mouseEnterDelay],
      mouseLeaveDelay: ["nzMouseLeaveDelay", () => this._mouseLeaveDelay],
      overlayClassName: ["nzOverlayClassName", () => this._overlayClassName],
      overlayStyle: ["nzOverlayStyle", () => this._overlayStyle],
      overlayClickable: ["nzOverlayClickable", () => this._overlayClickable],
      arrowPointAtCenter: ["nzArrowPointAtCenter", () => this.arrowPointAtCenter],
      cdkConnectedOverlayPush: ["cdkConnectedOverlayPush", () => this.cdkConnectedOverlayPush]
    }, this.getProxyPropertyMap());
    (keys || Object.keys(mappingProperties).filter((key) => !key.startsWith("directive"))).forEach((property) => {
      if (mappingProperties[property]) {
        const [name, valueFn] = mappingProperties[property];
        this.updateComponentValue(name, valueFn());
      }
    });
    this.component?.updateByDirective();
  }
  initProperties() {
    this.updatePropertiesByKeys();
  }
  updateComponentValue(key, value) {
    if (typeof value !== "undefined") {
      this.component[key] = value;
    }
  }
  delayEnterLeave(isOrigin, isEnter, delay2 = -1) {
    if (this.delayTimer) {
      this.clearTogglingTimer();
    } else if (delay2 > 0) {
      this.delayTimer = setTimeout(() => {
        this.delayTimer = void 0;
        isEnter ? this.show() : this.hide();
      }, delay2 * 1e3);
    } else {
      isEnter && isOrigin ? this.show() : this.hide();
    }
  }
  removeTriggerListeners() {
    this.triggerDisposables.forEach((dispose) => dispose());
    this.triggerDisposables.length = 0;
  }
  clearTogglingTimer() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = void 0;
    }
  }
  static \u0275fac = function NzTooltipBaseDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTooltipBaseDirective)(\u0275\u0275directiveInject(Type));
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NzTooltipBaseDirective,
    features: [\u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTooltipBaseDirective, [{
    type: Directive
  }], () => [{
    type: Type
  }], null);
})();
var NzTooltipBaseComponent = class _NzTooltipBaseComponent {
  overlay;
  noAnimation = inject(NzNoAnimationDirective, {
    host: true,
    optional: true
  });
  dir = inject(Directionality).valueSignal;
  cdr = inject(ChangeDetectorRef);
  elementRef = inject(ElementRef);
  destroyRef = inject(DestroyRef);
  nzTitle = null;
  nzContent = null;
  nzArrowPointAtCenter = false;
  nzOverlayClassName;
  nzOverlayStyle = {};
  nzOverlayClickable = true;
  nzBackdrop = false;
  nzMouseEnterDelay;
  nzMouseLeaveDelay;
  /** @deprecated Default is false, and customization is no longer supported. This will be removed in v22.0.0. */
  cdkConnectedOverlayPush = false;
  nzVisibleChange = new Subject();
  set nzVisible(value) {
    const visible = toBoolean(value);
    if (this._visible !== visible) {
      this._visible = visible;
      this.nzVisibleChange.next(visible);
    }
  }
  get nzVisible() {
    return this._visible;
  }
  _visible = false;
  set nzTrigger(value) {
    this._trigger = value;
  }
  get nzTrigger() {
    return this._trigger;
  }
  _trigger = "hover";
  set nzPlacement(value) {
    const preferredPosition = value.map((placement) => setConnectedPositionOffset(POSITION_MAP[placement], TOOLTIP_OFFSET_MAP[placement]));
    this._positions = [...preferredPosition, ...DEFAULT_TOOLTIP_POSITIONS];
  }
  preferredPlacement = "top";
  origin;
  _classMap = {};
  _prefix = "ant-tooltip";
  _positions = [...DEFAULT_TOOLTIP_POSITIONS];
  constructor() {
    this.destroyRef.onDestroy(() => {
      this.nzVisibleChange.complete();
    });
  }
  show() {
    if (this.nzVisible) {
      return;
    }
    if (!this.isEmpty()) {
      this.nzVisible = true;
      this.nzVisibleChange.next(true);
      this.cdr.detectChanges();
    }
    if (this.origin && this.overlay && this.overlay.overlayRef && this.overlay.overlayRef.getDirection() === "rtl") {
      this.overlay.overlayRef.setDirection("ltr");
    }
  }
  hide() {
    if (!this.nzVisible) {
      return;
    }
    this.nzVisible = false;
    this.nzVisibleChange.next(false);
    this.cdr.detectChanges();
  }
  updateByDirective() {
    this.updateStyles();
    this.cdr.detectChanges();
    Promise.resolve().then(() => {
      this.updatePosition();
      this.updateVisibilityByTitle();
    });
  }
  /**
   * Force the component to update its position.
   */
  updatePosition() {
    if (this.origin && this.overlay && this.overlay.overlayRef) {
      this.overlay.overlayRef.updatePosition();
    }
  }
  onPositionChange(position) {
    this.preferredPlacement = getPlacementName(position);
    this.updateStyles();
    this.cdr.detectChanges();
  }
  setOverlayOrigin(origin) {
    this.origin = origin;
    this.cdr.markForCheck();
  }
  onClickOutside(event) {
    if (!this.nzOverlayClickable) {
      return;
    }
    const target = _getEventTarget(event);
    if (!this.origin.nativeElement.contains(target) && this.nzTrigger !== null) {
      this.hide();
    }
  }
  /**
   * Hide the component while the content is empty.
   */
  updateVisibilityByTitle() {
    if (this.isEmpty()) {
      this.hide();
    }
  }
  updateStyles() {
    this._classMap = __spreadProps(__spreadValues({}, this.transformClassListToMap(this.nzOverlayClassName)), {
      [`${this._prefix}-placement-${this.preferredPlacement}`]: true
    });
  }
  transformClassListToMap(klass) {
    const result = {};
    const classes = klass !== null ? klass.split(/\s+/) : [];
    classes.forEach((className) => result[className] = true);
    return result;
  }
  static \u0275fac = function NzTooltipBaseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTooltipBaseComponent)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NzTooltipBaseComponent,
    viewQuery: function NzTooltipBaseComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.overlay = _t.first);
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTooltipBaseComponent, [{
    type: Directive
  }], () => [], {
    overlay: [{
      type: ViewChild,
      args: ["overlay", {
        static: false
      }]
    }]
  });
})();
function isTooltipEmpty(value) {
  return value instanceof TemplateRef ? false : value === "" || !isNotNil(value);
}
var NzTooltipDirective = class _NzTooltipDirective extends NzTooltipBaseDirective {
  /* eslint-disable @angular-eslint/no-input-rename, @angular-eslint/no-output-rename */
  title;
  titleContext = null;
  directiveTitle;
  trigger = "hover";
  placement = "top";
  origin;
  visible;
  mouseEnterDelay;
  mouseLeaveDelay;
  overlayClassName;
  overlayStyle;
  arrowPointAtCenter;
  /** @deprecated Default is false, and customization is no longer supported. This will be removed in v22.0.0. */
  cdkConnectedOverlayPush = false;
  nzTooltipColor;
  directiveContent = null;
  content = null;
  overlayClickable;
  visibleChange = new EventEmitter();
  constructor() {
    super(NzTooltipComponent);
  }
  getProxyPropertyMap() {
    return __spreadProps(__spreadValues({}, super.getProxyPropertyMap()), {
      nzTooltipColor: ["nzColor", () => this.nzTooltipColor],
      titleContext: ["nzTitleContext", () => this.titleContext]
    });
  }
  static \u0275fac = function NzTooltipDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTooltipDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NzTooltipDirective,
    selectors: [["", "nz-tooltip", ""]],
    hostVars: 2,
    hostBindings: function NzTooltipDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-tooltip-open", ctx.visible);
      }
    },
    inputs: {
      title: [0, "nzTooltipTitle", "title"],
      titleContext: [0, "nzTooltipTitleContext", "titleContext"],
      directiveTitle: [0, "nz-tooltip", "directiveTitle"],
      trigger: [0, "nzTooltipTrigger", "trigger"],
      placement: [0, "nzTooltipPlacement", "placement"],
      origin: [0, "nzTooltipOrigin", "origin"],
      visible: [0, "nzTooltipVisible", "visible"],
      mouseEnterDelay: [0, "nzTooltipMouseEnterDelay", "mouseEnterDelay"],
      mouseLeaveDelay: [0, "nzTooltipMouseLeaveDelay", "mouseLeaveDelay"],
      overlayClassName: [0, "nzTooltipOverlayClassName", "overlayClassName"],
      overlayStyle: [0, "nzTooltipOverlayStyle", "overlayStyle"],
      arrowPointAtCenter: [2, "nzTooltipArrowPointAtCenter", "arrowPointAtCenter", booleanAttribute],
      cdkConnectedOverlayPush: [2, "cdkConnectedOverlayPush", "cdkConnectedOverlayPush", booleanAttribute],
      nzTooltipColor: "nzTooltipColor"
    },
    outputs: {
      visibleChange: "nzTooltipVisibleChange"
    },
    exportAs: ["nzTooltip"],
    features: [\u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTooltipDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-tooltip]",
      exportAs: "nzTooltip",
      host: {
        "[class.ant-tooltip-open]": "visible"
      }
    }]
  }], () => [], {
    title: [{
      type: Input,
      args: ["nzTooltipTitle"]
    }],
    titleContext: [{
      type: Input,
      args: ["nzTooltipTitleContext"]
    }],
    directiveTitle: [{
      type: Input,
      args: ["nz-tooltip"]
    }],
    trigger: [{
      type: Input,
      args: ["nzTooltipTrigger"]
    }],
    placement: [{
      type: Input,
      args: ["nzTooltipPlacement"]
    }],
    origin: [{
      type: Input,
      args: ["nzTooltipOrigin"]
    }],
    visible: [{
      type: Input,
      args: ["nzTooltipVisible"]
    }],
    mouseEnterDelay: [{
      type: Input,
      args: ["nzTooltipMouseEnterDelay"]
    }],
    mouseLeaveDelay: [{
      type: Input,
      args: ["nzTooltipMouseLeaveDelay"]
    }],
    overlayClassName: [{
      type: Input,
      args: ["nzTooltipOverlayClassName"]
    }],
    overlayStyle: [{
      type: Input,
      args: ["nzTooltipOverlayStyle"]
    }],
    arrowPointAtCenter: [{
      type: Input,
      args: [{
        alias: "nzTooltipArrowPointAtCenter",
        transform: booleanAttribute
      }]
    }],
    cdkConnectedOverlayPush: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzTooltipColor: [{
      type: Input
    }],
    visibleChange: [{
      type: Output,
      args: ["nzTooltipVisibleChange"]
    }]
  });
})();
var NzTooltipComponent = class _NzTooltipComponent extends NzTooltipBaseComponent {
  _animationPrefix = "ant-zoom-big-fast";
  nzTitle = null;
  nzTitleContext = null;
  nzColor;
  _arrowStyleMap = {};
  _contentStyleMap = {};
  zoomAnimationEnter = withAnimationCheck(() => `${this._animationPrefix}-enter ${this._animationPrefix}-enter-active`);
  zoomAnimationLeave = withAnimationCheck(() => `${this._animationPrefix}-leave ${this._animationPrefix}-leave-active`);
  isEmpty() {
    return isTooltipEmpty(this.nzTitle);
  }
  updateStyles() {
    const isColorPreset = this.nzColor && isPresetColor(this.nzColor);
    this._classMap = __spreadProps(__spreadValues({}, this.transformClassListToMap(this.nzOverlayClassName)), {
      [`${this._prefix}-placement-${this.preferredPlacement}`]: true,
      [`${this._prefix}-${this.nzColor}`]: isColorPreset
    });
    this._contentStyleMap = {
      backgroundColor: !!this.nzColor && !isColorPreset ? this.nzColor : null
    };
    this._arrowStyleMap = {
      "--antd-arrow-background-color": !!this.nzColor && !isColorPreset ? this.nzColor : null
    };
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275NzTooltipComponent_BaseFactory;
    return function NzTooltipComponent_Factory(__ngFactoryType__) {
      return (\u0275NzTooltipComponent_BaseFactory || (\u0275NzTooltipComponent_BaseFactory = \u0275\u0275getInheritedFactory(_NzTooltipComponent)))(__ngFactoryType__ || _NzTooltipComponent);
    };
  })();
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _NzTooltipComponent,
    selectors: [["nz-tooltip"]],
    exportAs: ["nzTooltipComponent"],
    features: [\u0275\u0275InheritDefinitionFeature],
    decls: 2,
    vars: 5,
    consts: [["overlay", "cdkConnectedOverlay"], ["cdkConnectedOverlay", "", "nzConnectedOverlay", "", 3, "overlayOutsideClick", "detach", "positionChange", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPush", "nzArrowPointAtCenter"], [1, "ant-tooltip", 3, "nzNoAnimation"], [1, "ant-tooltip-arrow"], [1, "ant-tooltip-content"], [1, "ant-tooltip-inner"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"]],
    template: function NzTooltipComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, NzTooltipComponent_ng_template_0_Template, 5, 13, "ng-template", 1, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275listener("overlayOutsideClick", function NzTooltipComponent_Template_ng_template_overlayOutsideClick_0_listener($event) {
          return ctx.onClickOutside($event);
        })("detach", function NzTooltipComponent_Template_ng_template_detach_0_listener() {
          return ctx.hide();
        })("positionChange", function NzTooltipComponent_Template_ng_template_positionChange_0_listener($event) {
          return ctx.onPositionChange($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275property("cdkConnectedOverlayOrigin", ctx.origin)("cdkConnectedOverlayOpen", ctx._visible)("cdkConnectedOverlayPositions", ctx._positions)("cdkConnectedOverlayPush", ctx.cdkConnectedOverlayPush)("nzArrowPointAtCenter", ctx.nzArrowPointAtCenter);
      }
    },
    dependencies: [OverlayModule, CdkConnectedOverlay, NzNoAnimationDirective, NzOutletModule, NzStringTemplateOutletDirective, NzOverlayModule, NzConnectedOverlayDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTooltipComponent, [{
    type: Component,
    args: [{
      selector: "nz-tooltip",
      exportAs: "nzTooltipComponent",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayPush]="cdkConnectedOverlayPush"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="ant-tooltip"
        [class.ant-tooltip-rtl]="dir() === 'rtl'"
        [class]="_classMap"
        [style]="nzOverlayStyle"
        [nzNoAnimation]="!!noAnimation?.nzNoAnimation?.()"
        [animate.enter]="zoomAnimationEnter()"
        [animate.leave]="zoomAnimationLeave()"
      >
        <div class="ant-tooltip-arrow" [style]="_arrowStyleMap"></div>
        <div class="ant-tooltip-content">
          <div class="ant-tooltip-inner" [style]="_contentStyleMap">
            <ng-container *nzStringTemplateOutlet="nzTitle; context: nzTitleContext">{{ nzTitle }}</ng-container>
          </div>
        </div>
      </div>
    </ng-template>
  `,
      imports: [OverlayModule, NzNoAnimationDirective, NzOutletModule, NzOverlayModule]
    }]
  }], null, null);
})();
var NzTooltipModule = class _NzTooltipModule {
  static \u0275fac = function NzTooltipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzTooltipModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _NzTooltipModule,
    imports: [NzTooltipComponent, NzTooltipDirective],
    exports: [NzTooltipComponent, NzTooltipDirective]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [NzTooltipComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTooltipModule, [{
    type: NgModule,
    args: [{
      imports: [NzTooltipComponent, NzTooltipDirective],
      exports: [NzTooltipComponent, NzTooltipDirective]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-form.mjs
var _c02 = ["*"];
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
var NzFormItemComponent = class _NzFormItemComponent {
  cdr = inject(ChangeDetectorRef);
  status = "";
  hasFeedback = false;
  withHelpClass = false;
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
  static \u0275fac = function NzFormItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzFormItemComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
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
    ngContentSelectors: _c02,
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
  });
};
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
  return class NzFormDirective2 {
    static {
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
      if (_metadata) Object.defineProperty(this, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata
      });
    }
    destroyRef = inject(DestroyRef);
    _nzModuleName = NZ_CONFIG_MODULE_NAME;
    nzLayout = "horizontal";
    nzNoColon = __runInitializers(this, _nzNoColon_initializers, false);
    nzAutoTips = (__runInitializers(this, _nzNoColon_extraInitializers), __runInitializers(this, _nzAutoTips_initializers, {}));
    nzDisableAutoTips = (__runInitializers(this, _nzAutoTips_extraInitializers), false);
    nzTooltipIcon = __runInitializers(this, _nzTooltipIcon_initializers, DefaultTooltipIcon);
    nzLabelAlign = (__runInitializers(this, _nzTooltipIcon_extraInitializers), "right");
    nzLabelWrap = __runInitializers(this, _nzLabelWrap_initializers, false);
    nzSize = (__runInitializers(this, _nzLabelWrap_extraInitializers), input(...ngDevMode ? [void 0, {
      debugName: "nzSize"
    }] : []));
    nzVariant = input("outlined", ...ngDevMode ? [{
      debugName: "nzVariant"
    }] : []);
    nzRequiredMark = input(true, ...ngDevMode ? [{
      debugName: "nzRequiredMark"
    }] : []);
    dir = inject(Directionality).valueSignal;
    inputChanges$ = new Subject();
    getInputObservable(changeType) {
      return this.inputChanges$.pipe(filter((changes) => changeType in changes), map((value) => value[changeType]));
    }
    constructor() {
      this.destroyRef.onDestroy(() => {
        this.inputChanges$.complete();
      });
    }
    ngOnChanges(changes) {
      this.inputChanges$.next(changes);
    }
    static \u0275fac = function NzFormDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || NzFormDirective2)();
    };
    static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: NzFormDirective2,
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
        useFactory: () => inject(NzFormDirective2).nzSize
      }, {
        provide: NZ_FORM_VARIANT,
        useFactory: () => inject(NzFormDirective2).nzVariant
      }]), \u0275\u0275NgOnChangesFeature]
    });
  };
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
var NzFormControlComponent = class _NzFormControlComponent {
  cdr = inject(ChangeDetectorRef);
  i18n = inject(NzI18nService);
  nzFormStatusService = inject(NzFormStatusService);
  destroyRef = inject(DestroyRef);
  _hasFeedback = false;
  validateChanges = Subscription.EMPTY;
  validateString = null;
  localeId;
  autoErrorTip;
  get disableAutoTips() {
    return this.nzDisableAutoTips !== void 0 ? toBoolean(this.nzDisableAutoTips) : !!this.nzFormDirective?.nzDisableAutoTips;
  }
  noAnimation = inject(NzNoAnimationDirective, {
    optional: true,
    host: true
  });
  animationEnabled = isAnimationEnabled(() => !this.noAnimation?.nzNoAnimation());
  nzValidateAnimationEnter = withAnimationCheck(() => "ant-form-validate_animation-enter");
  nzValidateAnimationLeave = withAnimationCheck(() => "ant-form-validate_animation-leave");
  status = "";
  validateControl = null;
  innerTip = null;
  defaultValidateControl;
  nzSuccessTip;
  nzWarningTip;
  nzErrorTip;
  nzValidatingTip;
  nzExtra;
  nzAutoTips = {};
  nzDisableAutoTips;
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
    if (this.validateControl) {
      const errors = this.validateControl.errors || {};
      let autoErrorTip = "";
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          autoErrorTip = errors[key]?.[this.localeId] ?? this.nzAutoTips?.[this.localeId]?.[key] ?? this.nzAutoTips.default?.[key] ?? this.nzFormDirective?.nzAutoTips?.[this.localeId]?.[key] ?? this.nzFormDirective?.nzAutoTips.default?.[key];
        }
        if (autoErrorTip) {
          break;
        }
      }
      this.autoErrorTip = autoErrorTip;
    }
  }
  subscribeAutoTips(observable) {
    observable?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (!this.disableAutoTips) {
        this.updateAutoErrorTip();
        this.setStatus();
        this.cdr.markForCheck();
      }
    });
  }
  nzFormItemComponent = inject(NzFormItemComponent, {
    host: true,
    optional: true
  });
  nzFormDirective = inject(NzFormDirective, {
    optional: true
  });
  constructor() {
    this.subscribeAutoTips(this.i18n.localeChange.pipe(tap((locale) => this.localeId = locale.locale)));
    this.subscribeAutoTips(this.nzFormDirective?.getInputObservable("nzAutoTips"));
    this.subscribeAutoTips(this.nzFormDirective?.getInputObservable("nzDisableAutoTips").pipe(filter(() => this.nzDisableAutoTips === void 0)));
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
  static \u0275fac = function NzFormControlComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzFormControlComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
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
    ngContentSelectors: _c02,
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
  });
};
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
var NzFormLabelComponent = class _NzFormLabelComponent {
  cdr = inject(ChangeDetectorRef);
  nzFor;
  nzRequired = false;
  set nzNoColon(value) {
    this.noColon = value;
  }
  get nzNoColon() {
    return this.noColon !== "default" ? this.noColon : !!this.nzFormDirective?.nzNoColon;
  }
  noColon = "default";
  nzTooltipTitle;
  set nzTooltipIcon(value) {
    this._tooltipIcon = toTooltipIcon(value);
  }
  // due to 'get' and 'set' accessor must have the same type, so it was renamed to `tooltipIcon`
  get tooltipIcon() {
    return this._tooltipIcon !== "default" ? this._tooltipIcon : toTooltipIcon(this.nzFormDirective?.nzTooltipIcon || DefaultTooltipIcon);
  }
  _tooltipIcon = "default";
  set nzLabelAlign(value) {
    this.labelAlign = value;
  }
  get nzLabelAlign() {
    return this.labelAlign !== "default" ? this.labelAlign : this.nzFormDirective?.nzLabelAlign || "right";
  }
  labelAlign = "default";
  set nzLabelWrap(value) {
    this.labelWrap = value;
  }
  get nzLabelWrap() {
    return this.labelWrap !== "default" ? this.labelWrap : !!this.nzFormDirective?.nzLabelWrap;
  }
  labelWrap = "default";
  nzFormDirective = inject(NzFormDirective, {
    skipSelf: true,
    optional: true
  });
  nzRequiredMark = this.nzFormDirective?.nzRequiredMark;
  isNzRequiredMarkTemplate = computed(() => isTemplateRef(this.nzRequiredMark?.()), ...ngDevMode ? [{
    debugName: "isNzRequiredMarkTemplate"
  }] : []);
  constructor() {
    if (this.nzFormDirective) {
      this.nzFormDirective.getInputObservable("nzNoColon").pipe(filter(() => this.noColon === "default"), takeUntilDestroyed()).subscribe(() => this.cdr.markForCheck());
      this.nzFormDirective.getInputObservable("nzTooltipIcon").pipe(filter(() => this._tooltipIcon === "default"), takeUntilDestroyed()).subscribe(() => this.cdr.markForCheck());
      this.nzFormDirective.getInputObservable("nzLabelAlign").pipe(filter(() => this.labelAlign === "default"), takeUntilDestroyed()).subscribe(() => this.cdr.markForCheck());
      this.nzFormDirective.getInputObservable("nzLabelWrap").pipe(filter(() => this.labelWrap === "default"), takeUntilDestroyed()).subscribe(() => this.cdr.markForCheck());
    }
  }
  static \u0275fac = function NzFormLabelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzFormLabelComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
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
    ngContentSelectors: _c02,
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
  });
};
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
var NzFormSplitComponent = class _NzFormSplitComponent {
  static \u0275fac = function NzFormSplitComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzFormSplitComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _NzFormSplitComponent,
    selectors: [["nz-form-split"]],
    hostAttrs: [1, "ant-form-split"],
    exportAs: ["nzFormSplit"],
    ngContentSelectors: _c02,
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
  });
};
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
var NzFormTextComponent = class _NzFormTextComponent {
  static \u0275fac = function NzFormTextComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzFormTextComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _NzFormTextComponent,
    selectors: [["nz-form-text"]],
    hostAttrs: [1, "ant-form-text"],
    exportAs: ["nzFormText"],
    ngContentSelectors: _c02,
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
  });
};
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
var NzFormModule = class _NzFormModule {
  static \u0275fac = function NzFormModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzFormModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _NzFormModule,
    imports: [NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent, NzFormTextComponent, NzFormSplitComponent],
    exports: [NzGridModule, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent, NzFormTextComponent, NzFormSplitComponent]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [NzFormLabelComponent, NzFormControlComponent, NzGridModule]
  });
};
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
  NzTooltipBaseDirective,
  isTooltipEmpty,
  NzTooltipDirective,
  NzTooltipComponent,
  NzTooltipModule,
  NzFormItemComponent,
  NzFormDirective,
  NzFormControlComponent,
  NzFormLabelComponent,
  NzFormModule
};
//# sourceMappingURL=chunk-RT7X43H5.js.map
