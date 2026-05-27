import {
  NzDescriptionsModule
} from "./chunk-T5YXM77X.js";
import {
  NzAvatarComponent,
  NzAvatarModule
} from "./chunk-YMCJDCZ3.js";
import {
  NzDatePickerComponent,
  NzDatePickerModule,
  NzDividerComponent,
  NzDividerModule
} from "./chunk-4HIMW5LK.js";
import {
  ActivatedRoute,
  AppNotificationService,
  CommonModule,
  DatePipe,
  DefaultValueAccessor,
  Directionality,
  FormsModule,
  HttpClientService,
  Location,
  NZ_MODAL_DATA,
  NgControlStatus,
  NgForOf,
  NgIf,
  NgModel,
  NgSwitch,
  NgSwitchCase,
  NgTemplateOutlet,
  NumberSymbol,
  NzButtonComponent,
  NzButtonModule,
  NzCardComponent,
  NzCardModule,
  NzCellAlignDirective,
  NzColDirective,
  NzConfigService,
  NzEmbedEmptyComponent,
  NzEmptyComponent,
  NzEmptyModule,
  NzGridModule,
  NzIconDirective,
  NzIconModule,
  NzInputDirective,
  NzInputGroupComponent,
  NzInputGroupWhitSuffixOrPrefixDirective,
  NzInputModule,
  NzModalModule,
  NzModalService,
  NzOptionComponent,
  NzOutletModule,
  NzRadioComponent,
  NzRadioGroupComponent,
  NzRadioModule,
  NzResizeObserver,
  NzRowDirective,
  NzSelectComponent,
  NzSelectModule,
  NzSkeletonComponent,
  NzSkeletonModule,
  NzSpaceModule,
  NzSpinComponent,
  NzSpinModule,
  NzStringTemplateOutletDirective,
  NzTableCellDirective,
  NzTableComponent,
  NzTableFixedRowComponent,
  NzTableModule,
  NzTagComponent,
  NzTagModule,
  NzTbodyComponent,
  NzThMeasureDirective,
  NzTheadComponent,
  NzTooltipDirective,
  NzTooltipModule,
  NzTrDirective,
  NzTrExpandDirective,
  NzTransitionPatchDirective,
  NzWaveDirective,
  Platform,
  RouterLink,
  SlicePipe,
  TotButtonComponent,
  TotCellDirective,
  TotTableComponent,
  TranslocoModule,
  TranslocoPipe,
  TranslocoService,
  UpperCasePipe,
  WithConfig,
  fromEventOutsideAngular,
  getLocaleNumberSymbol,
  isNotNil,
  numberAttributeWithZeroFallback,
  onConfigChangeEventForComponent,
  padStart,
  takeUntilDestroyed,
  timeUnits,
  toBoolean
} from "./chunk-VOXRLNOH.js";
import {
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Injectable,
  Input,
  LOCALE_ID,
  NgModule,
  NgZone,
  Output,
  Pipe,
  ReplaySubject,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  booleanAttribute,
  defer,
  filter,
  from,
  inject,
  interval,
  map,
  merge,
  mergeMap,
  numberAttribute,
  of,
  setClassMetadata,
  startWith,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
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
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
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
} from "./chunk-FOY232A2.js";
import {
  __objRest,
  __publicField,
  __spreadValues
} from "./chunk-MYGOUE3E.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-page-header.mjs
var _c0 = [[["nz-breadcrumb", "nz-page-header-breadcrumb", ""]], [["nz-avatar", "nz-page-header-avatar", ""]], [["nz-page-header-tags"], ["", "nz-page-header-tags", ""]], [["nz-page-header-extra"], ["", "nz-page-header-extra", ""]], [["nz-page-header-content"], ["", "nz-page-header-content", ""]], [["nz-page-header-footer"], ["", "nz-page-header-footer", ""]], [["nz-page-header-title"], ["", "nz-page-header-title", ""]], [["nz-page-header-subtitle"], ["", "nz-page-header-subtitle", ""]]];
var _c1 = ["nz-breadcrumb[nz-page-header-breadcrumb]", "nz-avatar[nz-page-header-avatar]", "nz-page-header-tags, [nz-page-header-tags]", "nz-page-header-extra, [nz-page-header-extra]", "nz-page-header-content, [nz-page-header-content]", "nz-page-header-footer, [nz-page-header-footer]", "nz-page-header-title, [nz-page-header-title]", "nz-page-header-subtitle, [nz-page-header-subtitle]"];
function NzPageHeaderComponent_Conditional_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "nz-icon", 8);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const backIcon_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzType", backIcon_r3 || ctx_r1.getBackIcon());
  }
}
function NzPageHeaderComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275listener("click", function NzPageHeaderComponent_Conditional_3_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBack());
    });
    \u0275\u0275elementStart(1, "div", 6);
    \u0275\u0275template(2, NzPageHeaderComponent_Conditional_3_ng_container_2_Template, 2, 1, "ng-container", 7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzBackIcon);
  }
}
function NzPageHeaderComponent_Conditional_5_ng_container_1_Template(rf, ctx) {
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
function NzPageHeaderComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 3);
    \u0275\u0275template(1, NzPageHeaderComponent_Conditional_5_ng_container_1_Template, 2, 1, "ng-container", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzTitle);
  }
}
function NzPageHeaderComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 6);
  }
}
function NzPageHeaderComponent_Conditional_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.nzSubtitle);
  }
}
function NzPageHeaderComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 4);
    \u0275\u0275template(1, NzPageHeaderComponent_Conditional_7_ng_container_1_Template, 2, 1, "ng-container", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzSubtitle);
  }
}
function NzPageHeaderComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 7);
  }
}
var _NzPageHeaderTitleDirective = class _NzPageHeaderTitleDirective {
};
__publicField(_NzPageHeaderTitleDirective, "\u0275fac", function NzPageHeaderTitleDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPageHeaderTitleDirective)();
});
__publicField(_NzPageHeaderTitleDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzPageHeaderTitleDirective,
  selectors: [["nz-page-header-title"], ["", "nz-page-header-title", ""]],
  hostAttrs: [1, "ant-page-header-heading-title"],
  exportAs: ["nzPageHeaderTitle"]
}));
var NzPageHeaderTitleDirective = _NzPageHeaderTitleDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPageHeaderTitleDirective, [{
    type: Directive,
    args: [{
      selector: "nz-page-header-title, [nz-page-header-title]",
      exportAs: "nzPageHeaderTitle",
      host: {
        class: "ant-page-header-heading-title"
      }
    }]
  }], null, null);
})();
var _NzPageHeaderSubtitleDirective = class _NzPageHeaderSubtitleDirective {
};
__publicField(_NzPageHeaderSubtitleDirective, "\u0275fac", function NzPageHeaderSubtitleDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPageHeaderSubtitleDirective)();
});
__publicField(_NzPageHeaderSubtitleDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzPageHeaderSubtitleDirective,
  selectors: [["nz-page-header-subtitle"], ["", "nz-page-header-subtitle", ""]],
  hostAttrs: [1, "ant-page-header-heading-sub-title"],
  exportAs: ["nzPageHeaderSubtitle"]
}));
var NzPageHeaderSubtitleDirective = _NzPageHeaderSubtitleDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPageHeaderSubtitleDirective, [{
    type: Directive,
    args: [{
      selector: "nz-page-header-subtitle, [nz-page-header-subtitle]",
      exportAs: "nzPageHeaderSubtitle",
      host: {
        class: "ant-page-header-heading-sub-title"
      }
    }]
  }], null, null);
})();
var _NzPageHeaderContentDirective = class _NzPageHeaderContentDirective {
};
__publicField(_NzPageHeaderContentDirective, "\u0275fac", function NzPageHeaderContentDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPageHeaderContentDirective)();
});
__publicField(_NzPageHeaderContentDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzPageHeaderContentDirective,
  selectors: [["nz-page-header-content"], ["", "nz-page-header-content", ""]],
  hostAttrs: [1, "ant-page-header-content"],
  exportAs: ["nzPageHeaderContent"]
}));
var NzPageHeaderContentDirective = _NzPageHeaderContentDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPageHeaderContentDirective, [{
    type: Directive,
    args: [{
      selector: "nz-page-header-content, [nz-page-header-content]",
      exportAs: "nzPageHeaderContent",
      host: {
        class: "ant-page-header-content"
      }
    }]
  }], null, null);
})();
var _NzPageHeaderTagDirective = class _NzPageHeaderTagDirective {
};
__publicField(_NzPageHeaderTagDirective, "\u0275fac", function NzPageHeaderTagDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPageHeaderTagDirective)();
});
__publicField(_NzPageHeaderTagDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzPageHeaderTagDirective,
  selectors: [["nz-page-header-tags"], ["", "nz-page-header-tags", ""]],
  hostAttrs: [1, "ant-page-header-heading-tags"],
  exportAs: ["nzPageHeaderTags"]
}));
var NzPageHeaderTagDirective = _NzPageHeaderTagDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPageHeaderTagDirective, [{
    type: Directive,
    args: [{
      selector: "nz-page-header-tags, [nz-page-header-tags]",
      exportAs: "nzPageHeaderTags",
      host: {
        class: "ant-page-header-heading-tags"
      }
    }]
  }], null, null);
})();
var _NzPageHeaderExtraDirective = class _NzPageHeaderExtraDirective {
};
__publicField(_NzPageHeaderExtraDirective, "\u0275fac", function NzPageHeaderExtraDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPageHeaderExtraDirective)();
});
__publicField(_NzPageHeaderExtraDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzPageHeaderExtraDirective,
  selectors: [["nz-page-header-extra"], ["", "nz-page-header-extra", ""]],
  hostAttrs: [1, "ant-page-header-heading-extra"],
  exportAs: ["nzPageHeaderExtra"]
}));
var NzPageHeaderExtraDirective = _NzPageHeaderExtraDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPageHeaderExtraDirective, [{
    type: Directive,
    args: [{
      selector: "nz-page-header-extra, [nz-page-header-extra]",
      exportAs: "nzPageHeaderExtra",
      host: {
        class: "ant-page-header-heading-extra"
      }
    }]
  }], null, null);
})();
var _NzPageHeaderFooterDirective = class _NzPageHeaderFooterDirective {
};
__publicField(_NzPageHeaderFooterDirective, "\u0275fac", function NzPageHeaderFooterDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPageHeaderFooterDirective)();
});
__publicField(_NzPageHeaderFooterDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzPageHeaderFooterDirective,
  selectors: [["nz-page-header-footer"], ["", "nz-page-header-footer", ""]],
  hostAttrs: [1, "ant-page-header-footer"],
  exportAs: ["nzPageHeaderFooter"]
}));
var NzPageHeaderFooterDirective = _NzPageHeaderFooterDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPageHeaderFooterDirective, [{
    type: Directive,
    args: [{
      selector: "nz-page-header-footer, [nz-page-header-footer]",
      exportAs: "nzPageHeaderFooter",
      host: {
        class: "ant-page-header-footer"
      }
    }]
  }], null, null);
})();
var _NzPageHeaderBreadcrumbDirective = class _NzPageHeaderBreadcrumbDirective {
};
__publicField(_NzPageHeaderBreadcrumbDirective, "\u0275fac", function NzPageHeaderBreadcrumbDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPageHeaderBreadcrumbDirective)();
});
__publicField(_NzPageHeaderBreadcrumbDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzPageHeaderBreadcrumbDirective,
  selectors: [["nz-breadcrumb", "nz-page-header-breadcrumb", ""]],
  exportAs: ["nzPageHeaderBreadcrumb"]
}));
var NzPageHeaderBreadcrumbDirective = _NzPageHeaderBreadcrumbDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPageHeaderBreadcrumbDirective, [{
    type: Directive,
    args: [{
      selector: "nz-breadcrumb[nz-page-header-breadcrumb]",
      exportAs: "nzPageHeaderBreadcrumb"
    }]
  }], null, null);
})();
var _NzPageHeaderAvatarDirective = class _NzPageHeaderAvatarDirective {
};
__publicField(_NzPageHeaderAvatarDirective, "\u0275fac", function NzPageHeaderAvatarDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPageHeaderAvatarDirective)();
});
__publicField(_NzPageHeaderAvatarDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzPageHeaderAvatarDirective,
  selectors: [["nz-avatar", "nz-page-header-avatar", ""]],
  exportAs: ["nzPageHeaderAvatar"]
}));
var NzPageHeaderAvatarDirective = _NzPageHeaderAvatarDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPageHeaderAvatarDirective, [{
    type: Directive,
    args: [{
      selector: "nz-avatar[nz-page-header-avatar]",
      exportAs: "nzPageHeaderAvatar"
    }]
  }], null, null);
})();
var NZ_CONFIG_MODULE_NAME = "pageHeader";
var NzPageHeaderComponent = (() => {
  var _a;
  let _nzGhost_decorators;
  let _nzGhost_initializers = [];
  let _nzGhost_extraInitializers = [];
  return _a = class {
    constructor(nzConfigService, elementRef, nzResizeObserver, cdr, directionality) {
      __publicField(this, "nzConfigService");
      __publicField(this, "elementRef");
      __publicField(this, "nzResizeObserver");
      __publicField(this, "cdr");
      __publicField(this, "directionality");
      __publicField(this, "location", inject(Location));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME);
      __publicField(this, "nzBackIcon", null);
      __publicField(this, "nzTitle");
      __publicField(this, "nzSubtitle");
      __publicField(this, "nzGhost", __runInitializers(this, _nzGhost_initializers, true));
      __publicField(this, "nzBack", (__runInitializers(this, _nzGhost_extraInitializers), new EventEmitter()));
      __publicField(this, "nzPageHeaderFooter");
      __publicField(this, "nzPageHeaderBreadcrumb");
      __publicField(this, "compact", false);
      __publicField(this, "dir", "ltr");
      __publicField(this, "enableBackButton", true);
      this.nzConfigService = nzConfigService;
      this.elementRef = elementRef;
      this.nzResizeObserver = nzResizeObserver;
      this.cdr = cdr;
      this.directionality = directionality;
    }
    ngOnInit() {
      var _a2;
      (_a2 = this.directionality.change) == null ? void 0 : _a2.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
      this.dir = this.directionality.value;
    }
    ngAfterViewInit() {
      var _a2;
      if (!this.nzBack.observers.length) {
        this.enableBackButton = ((_a2 = this.location.getState()) == null ? void 0 : _a2.navigationId) > 1;
        const subscription = this.location.subscribe(() => {
          this.enableBackButton = true;
          this.cdr.detectChanges();
        });
        this.destroyRef.onDestroy(() => subscription.unsubscribe());
      }
      this.nzResizeObserver.observe(this.elementRef).pipe(map(([entry]) => entry.contentRect.width), takeUntilDestroyed(this.destroyRef)).subscribe((width) => {
        this.compact = width < 768;
        this.cdr.markForCheck();
      });
    }
    onBack() {
      if (this.nzBack.observers.length) {
        this.nzBack.emit();
      } else {
        this.location.back();
      }
    }
    getBackIcon() {
      if (this.dir === "rtl") {
        return "arrow-right";
      }
      return "arrow-left";
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzGhost_decorators = [WithConfig()];
    __esDecorate(null, null, _nzGhost_decorators, {
      kind: "field",
      name: "nzGhost",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzGhost" in obj,
        get: (obj) => obj.nzGhost,
        set: (obj, value) => {
          obj.nzGhost = value;
        }
      },
      metadata: _metadata
    }, _nzGhost_initializers, _nzGhost_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzPageHeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)(\u0275\u0275directiveInject(NzConfigService), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NzResizeObserver), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(Directionality));
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-page-header"]],
    contentQueries: function NzPageHeaderComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, NzPageHeaderFooterDirective, 5)(dirIndex, NzPageHeaderBreadcrumbDirective, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzPageHeaderFooter = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzPageHeaderBreadcrumb = _t.first);
      }
    },
    hostAttrs: [1, "ant-page-header"],
    hostVars: 10,
    hostBindings: function NzPageHeaderComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("has-footer", ctx.nzPageHeaderFooter)("ant-page-header-ghost", ctx.nzGhost)("has-breadcrumb", ctx.nzPageHeaderBreadcrumb)("ant-page-header-compact", ctx.compact)("ant-page-header-rtl", ctx.dir === "rtl");
      }
    },
    inputs: {
      nzBackIcon: "nzBackIcon",
      nzTitle: "nzTitle",
      nzSubtitle: "nzSubtitle",
      nzGhost: "nzGhost"
    },
    outputs: {
      nzBack: "nzBack"
    },
    exportAs: ["nzPageHeader"],
    ngContentSelectors: _c1,
    decls: 13,
    vars: 3,
    consts: [[1, "ant-page-header-heading"], [1, "ant-page-header-heading-left"], [1, "ant-page-header-back"], [1, "ant-page-header-heading-title"], [1, "ant-page-header-heading-sub-title"], [1, "ant-page-header-back", 3, "click"], ["role", "button", "tabindex", "0", 1, "ant-page-header-back-button"], [4, "nzStringTemplateOutlet"], ["nzTheme", "outline", 3, "nzType"]],
    template: function NzPageHeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c0);
        \u0275\u0275projection(0);
        \u0275\u0275elementStart(1, "div", 0)(2, "div", 1);
        \u0275\u0275conditionalCreate(3, NzPageHeaderComponent_Conditional_3_Template, 3, 1, "div", 2);
        \u0275\u0275projection(4, 1);
        \u0275\u0275conditionalCreate(5, NzPageHeaderComponent_Conditional_5_Template, 2, 1, "span", 3)(6, NzPageHeaderComponent_Conditional_6_Template, 1, 0);
        \u0275\u0275conditionalCreate(7, NzPageHeaderComponent_Conditional_7_Template, 2, 1, "span", 4)(8, NzPageHeaderComponent_Conditional_8_Template, 1, 0);
        \u0275\u0275projection(9, 2);
        \u0275\u0275elementEnd();
        \u0275\u0275projection(10, 3);
        \u0275\u0275elementEnd();
        \u0275\u0275projection(11, 4);
        \u0275\u0275projection(12, 5);
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.nzBackIcon !== null && ctx.enableBackButton ? 3 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.nzTitle ? 5 : 6);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.nzSubtitle ? 7 : 8);
      }
    },
    dependencies: [NzOutletModule, NzStringTemplateOutletDirective, NzIconModule, NzIconDirective],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPageHeaderComponent, [{
    type: Component,
    args: [{
      selector: "nz-page-header",
      exportAs: "nzPageHeader",
      template: `
    <ng-content select="nz-breadcrumb[nz-page-header-breadcrumb]" />

    <div class="ant-page-header-heading">
      <div class="ant-page-header-heading-left">
        <!--back-->
        @if (nzBackIcon !== null && enableBackButton) {
          <div (click)="onBack()" class="ant-page-header-back">
            <div role="button" tabindex="0" class="ant-page-header-back-button">
              <ng-container *nzStringTemplateOutlet="nzBackIcon; let backIcon">
                <nz-icon [nzType]="backIcon || getBackIcon()" nzTheme="outline" />
              </ng-container>
            </div>
          </div>
        }

        <!--avatar-->
        <ng-content select="nz-avatar[nz-page-header-avatar]" />
        <!--title-->
        @if (nzTitle) {
          <span class="ant-page-header-heading-title">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </span>
        } @else {
          <ng-content select="nz-page-header-title, [nz-page-header-title]" />
        }

        <!--subtitle-->
        @if (nzSubtitle) {
          <span class="ant-page-header-heading-sub-title">
            <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
          </span>
        } @else {
          <ng-content select="nz-page-header-subtitle, [nz-page-header-subtitle]" />
        }
        <ng-content select="nz-page-header-tags, [nz-page-header-tags]" />
      </div>

      <ng-content select="nz-page-header-extra, [nz-page-header-extra]" />
    </div>

    <ng-content select="nz-page-header-content, [nz-page-header-content]" />
    <ng-content select="nz-page-header-footer, [nz-page-header-footer]" />
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "ant-page-header",
        "[class.has-footer]": "nzPageHeaderFooter",
        "[class.ant-page-header-ghost]": "nzGhost",
        "[class.has-breadcrumb]": "nzPageHeaderBreadcrumb",
        "[class.ant-page-header-compact]": "compact",
        "[class.ant-page-header-rtl]": `dir === 'rtl'`
      },
      imports: [NzOutletModule, NzIconModule]
    }]
  }], () => [{
    type: NzConfigService
  }, {
    type: ElementRef
  }, {
    type: NzResizeObserver
  }, {
    type: ChangeDetectorRef
  }, {
    type: Directionality
  }], {
    nzBackIcon: [{
      type: Input
    }],
    nzTitle: [{
      type: Input
    }],
    nzSubtitle: [{
      type: Input
    }],
    nzGhost: [{
      type: Input
    }],
    nzBack: [{
      type: Output
    }],
    nzPageHeaderFooter: [{
      type: ContentChild,
      args: [NzPageHeaderFooterDirective, {
        static: false
      }]
    }],
    nzPageHeaderBreadcrumb: [{
      type: ContentChild,
      args: [NzPageHeaderBreadcrumbDirective, {
        static: false
      }]
    }]
  });
})();
var NzPageHeaderCells = [NzPageHeaderTitleDirective, NzPageHeaderSubtitleDirective, NzPageHeaderContentDirective, NzPageHeaderTagDirective, NzPageHeaderExtraDirective, NzPageHeaderFooterDirective, NzPageHeaderBreadcrumbDirective, NzPageHeaderAvatarDirective];
var _NzPageHeaderModule = class _NzPageHeaderModule {
};
__publicField(_NzPageHeaderModule, "\u0275fac", function NzPageHeaderModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPageHeaderModule)();
});
__publicField(_NzPageHeaderModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzPageHeaderModule,
  imports: [NzPageHeaderComponent, NzPageHeaderTitleDirective, NzPageHeaderSubtitleDirective, NzPageHeaderContentDirective, NzPageHeaderTagDirective, NzPageHeaderExtraDirective, NzPageHeaderFooterDirective, NzPageHeaderBreadcrumbDirective, NzPageHeaderAvatarDirective],
  exports: [NzPageHeaderComponent, NzPageHeaderTitleDirective, NzPageHeaderSubtitleDirective, NzPageHeaderContentDirective, NzPageHeaderTagDirective, NzPageHeaderExtraDirective, NzPageHeaderFooterDirective, NzPageHeaderBreadcrumbDirective, NzPageHeaderAvatarDirective]
}));
__publicField(_NzPageHeaderModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzPageHeaderComponent]
}));
var NzPageHeaderModule = _NzPageHeaderModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPageHeaderModule, [{
    type: NgModule,
    args: [{
      imports: [NzPageHeaderComponent, NzPageHeaderCells],
      exports: [NzPageHeaderComponent, NzPageHeaderCells]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-pipe.mjs
var _NzTimeRangePipe = class _NzTimeRangePipe {
  transform(value, format = "HH:mm:ss") {
    let duration = Number(value || 0);
    return timeUnits.reduce((current, [name, unit]) => {
      if (current.indexOf(name) !== -1) {
        const v = Math.floor(duration / unit);
        duration -= v * unit;
        return current.replace(new RegExp(`${name}+`, "g"), (match) => padStart(v.toString(), match.length, "0"));
      }
      return current;
    }, format);
  }
};
__publicField(_NzTimeRangePipe, "\u0275fac", function NzTimeRangePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTimeRangePipe)();
});
__publicField(_NzTimeRangePipe, "\u0275pipe", /* @__PURE__ */ \u0275\u0275definePipe({
  name: "nzTimeRange",
  type: _NzTimeRangePipe,
  pure: true
}));
var NzTimeRangePipe = _NzTimeRangePipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTimeRangePipe, [{
    type: Pipe,
    args: [{
      name: "nzTimeRange"
    }]
  }], null, null);
})();
var _NzPipesModule = class _NzPipesModule {
};
__publicField(_NzPipesModule, "\u0275fac", function NzPipesModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPipesModule)();
});
__publicField(_NzPipesModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzPipesModule,
  imports: [NzTimeRangePipe],
  exports: [NzTimeRangePipe]
}));
__publicField(_NzPipesModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({}));
var NzPipesModule = _NzPipesModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPipesModule, [{
    type: NgModule,
    args: [{
      imports: [NzTimeRangePipe],
      exports: [NzTimeRangePipe]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-statistic.mjs
var _c02 = (a0) => ({
  $implicit: a0
});
function NzStatisticContentValueComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.nzValueTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, ctx_r0.nzValue));
  }
}
function NzStatisticContentValueComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 1);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.displayInt);
  }
}
function NzStatisticContentValueComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.displayDecimal);
  }
}
function NzStatisticContentValueComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzStatisticContentValueComponent_Conditional_1_Conditional_0_Template, 2, 1, "span", 1);
    \u0275\u0275conditionalCreate(1, NzStatisticContentValueComponent_Conditional_1_Conditional_1_Template, 2, 1, "span", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.displayInt ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.displayDecimal ? 1 : -1);
  }
}
function NzStatisticComponent_ng_container_1_Template(rf, ctx) {
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
function NzStatisticComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-skeleton", 2);
  }
  if (rf & 2) {
    \u0275\u0275property("nzParagraph", false);
  }
}
function NzStatisticComponent_Conditional_3_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzPrefix);
  }
}
function NzStatisticComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275template(1, NzStatisticComponent_Conditional_3_Conditional_1_ng_container_1_Template, 2, 1, "ng-container", 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzPrefix);
  }
}
function NzStatisticComponent_Conditional_3_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzSuffix);
  }
}
function NzStatisticComponent_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275template(1, NzStatisticComponent_Conditional_3_Conditional_3_ng_container_1_Template, 2, 1, "ng-container", 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzSuffix);
  }
}
function NzStatisticComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275conditionalCreate(1, NzStatisticComponent_Conditional_3_Conditional_1_Template, 2, 1, "span", 5);
    \u0275\u0275element(2, "nz-statistic-content-value", 6);
    \u0275\u0275conditionalCreate(3, NzStatisticComponent_Conditional_3_Conditional_3_Template, 2, 1, "span", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r0.nzValueStyle);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzPrefix ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", ctx_r0.nzValue)("nzValueTemplate", ctx_r0.nzValueTemplate);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzSuffix ? 3 : -1);
  }
}
function NzCountdownComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "nzTimeRange");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(1, 1, ctx_r0.diff, ctx_r0.nzFormat));
  }
}
var _NzStatisticContentValueComponent = class _NzStatisticContentValueComponent {
  constructor() {
    __publicField(this, "nzValue");
    __publicField(this, "nzValueTemplate");
    __publicField(this, "displayInt", "");
    __publicField(this, "displayDecimal", "");
    __publicField(this, "locale_id", inject(LOCALE_ID));
  }
  ngOnChanges() {
    this.formatNumber();
  }
  formatNumber() {
    const decimalSeparator = typeof this.nzValue === "number" ? "." : getLocaleNumberSymbol(this.locale_id, NumberSymbol.Decimal);
    const value = String(this.nzValue);
    const [int, decimal] = value.split(decimalSeparator);
    this.displayInt = int;
    this.displayDecimal = decimal ? `${decimalSeparator}${decimal}` : "";
  }
};
__publicField(_NzStatisticContentValueComponent, "\u0275fac", function NzStatisticContentValueComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzStatisticContentValueComponent)();
});
__publicField(_NzStatisticContentValueComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzStatisticContentValueComponent,
  selectors: [["nz-statistic-content-value"]],
  hostAttrs: [1, "ant-statistic-content-value"],
  inputs: {
    nzValue: "nzValue",
    nzValueTemplate: "nzValueTemplate"
  },
  exportAs: ["nzStatisticContentValue"],
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 2,
  vars: 1,
  consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "ant-statistic-content-value-int"], [1, "ant-statistic-content-value-decimal"]],
  template: function NzStatisticContentValueComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzStatisticContentValueComponent_Conditional_0_Template, 1, 4, "ng-container", 0)(1, NzStatisticContentValueComponent_Conditional_1_Template, 2, 2);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.nzValueTemplate ? 0 : 1);
    }
  },
  dependencies: [NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var NzStatisticContentValueComponent = _NzStatisticContentValueComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzStatisticContentValueComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-statistic-content-value",
      exportAs: "nzStatisticContentValue",
      template: `
    @if (nzValueTemplate) {
      <ng-container [ngTemplateOutlet]="nzValueTemplate" [ngTemplateOutletContext]="{ $implicit: nzValue }" />
    } @else {
      @if (displayInt) {
        <span class="ant-statistic-content-value-int">{{ displayInt }}</span>
      }
      @if (displayDecimal) {
        <span class="ant-statistic-content-value-decimal">{{ displayDecimal }}</span>
      }
    }
  `,
      imports: [NgTemplateOutlet],
      host: {
        class: "ant-statistic-content-value"
      }
    }]
  }], null, {
    nzValue: [{
      type: Input
    }],
    nzValueTemplate: [{
      type: Input
    }]
  });
})();
var _NzStatisticComponent = class _NzStatisticComponent {
  constructor() {
    __publicField(this, "nzPrefix");
    __publicField(this, "nzSuffix");
    __publicField(this, "nzTitle");
    __publicField(this, "nzValue");
    __publicField(this, "nzValueStyle", {});
    __publicField(this, "nzValueTemplate");
    __publicField(this, "nzLoading", false);
    __publicField(this, "dir", "ltr");
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "directionality", inject(Directionality));
  }
  ngOnInit() {
    var _a;
    (_a = this.directionality.change) == null ? void 0 : _a.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
  }
};
__publicField(_NzStatisticComponent, "\u0275fac", function NzStatisticComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzStatisticComponent)();
});
__publicField(_NzStatisticComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzStatisticComponent,
  selectors: [["nz-statistic"]],
  hostAttrs: [1, "ant-statistic"],
  hostVars: 2,
  hostBindings: function NzStatisticComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-statistic-rtl", ctx.dir === "rtl");
    }
  },
  inputs: {
    nzPrefix: "nzPrefix",
    nzSuffix: "nzSuffix",
    nzTitle: "nzTitle",
    nzValue: "nzValue",
    nzValueStyle: "nzValueStyle",
    nzValueTemplate: "nzValueTemplate",
    nzLoading: [2, "nzLoading", "nzLoading", booleanAttribute]
  },
  exportAs: ["nzStatistic"],
  decls: 4,
  vars: 2,
  consts: [[1, "ant-statistic-title"], [4, "nzStringTemplateOutlet"], [1, "ant-statistic-skeleton", 3, "nzParagraph"], [1, "ant-statistic-content", 3, "style"], [1, "ant-statistic-content"], [1, "ant-statistic-content-prefix"], [3, "nzValue", "nzValueTemplate"], [1, "ant-statistic-content-suffix"]],
  template: function NzStatisticComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, NzStatisticComponent_ng_container_1_Template, 2, 1, "ng-container", 1);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(2, NzStatisticComponent_Conditional_2_Template, 1, 1, "nz-skeleton", 2)(3, NzStatisticComponent_Conditional_3_Template, 4, 6, "div", 3);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("nzStringTemplateOutlet", ctx.nzTitle);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzLoading ? 2 : 3);
    }
  },
  dependencies: [NzSkeletonModule, NzSkeletonComponent, NzStatisticContentValueComponent, NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzStatisticComponent = _NzStatisticComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzStatisticComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-statistic",
      exportAs: "nzStatistic",
      template: `
    <div class="ant-statistic-title">
      <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
    </div>
    @if (nzLoading) {
      <nz-skeleton class="ant-statistic-skeleton" [nzParagraph]="false" />
    } @else {
      <div class="ant-statistic-content" [style]="nzValueStyle">
        @if (nzPrefix) {
          <span class="ant-statistic-content-prefix">
            <ng-container *nzStringTemplateOutlet="nzPrefix">{{ nzPrefix }}</ng-container>
          </span>
        }
        <nz-statistic-content-value [nzValue]="nzValue" [nzValueTemplate]="nzValueTemplate" />
        @if (nzSuffix) {
          <span class="ant-statistic-content-suffix">
            <ng-container *nzStringTemplateOutlet="nzSuffix">{{ nzSuffix }}</ng-container>
          </span>
        }
      </div>
    }
  `,
      host: {
        class: "ant-statistic",
        "[class.ant-statistic-rtl]": `dir === 'rtl'`
      },
      imports: [NzSkeletonModule, NzStatisticContentValueComponent, NzOutletModule]
    }]
  }], null, {
    nzPrefix: [{
      type: Input
    }],
    nzSuffix: [{
      type: Input
    }],
    nzTitle: [{
      type: Input
    }],
    nzValue: [{
      type: Input
    }],
    nzValueStyle: [{
      type: Input
    }],
    nzValueTemplate: [{
      type: Input
    }],
    nzLoading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var REFRESH_INTERVAL = 1e3 / 30;
var _NzCountdownComponent = class _NzCountdownComponent extends NzStatisticComponent {
  constructor() {
    super();
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "platform", inject(Platform));
    __publicField(this, "nzFormat", "HH:mm:ss");
    __publicField(this, "nzCountdownFinish", new EventEmitter());
    __publicField(this, "diff");
    __publicField(this, "target", 0);
    __publicField(this, "intervalId", null);
    this.destroyRef.onDestroy(() => {
      this.stopTimer();
    });
  }
  ngOnChanges(changes) {
    const {
      nzValue
    } = changes;
    if (nzValue) {
      this.target = Number(nzValue.currentValue);
      if (!nzValue.isFirstChange()) {
        this.syncTimer();
      }
    }
  }
  ngOnInit() {
    super.ngOnInit();
    this.syncTimer();
  }
  syncTimer() {
    if (this.target >= Date.now()) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }
  startTimer() {
    if (this.platform.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        this.stopTimer();
        this.intervalId = setInterval(() => {
          this.updateValue();
          this.cdr.detectChanges();
        }, REFRESH_INTERVAL);
      });
    }
  }
  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  /**
   * Update time that should be displayed on the screen.
   */
  updateValue() {
    this.diff = Math.max(this.target - Date.now(), 0);
    if (this.diff === 0) {
      this.stopTimer();
      if (this.nzCountdownFinish.observers.length) {
        this.ngZone.run(() => this.nzCountdownFinish.emit());
      }
    }
  }
};
__publicField(_NzCountdownComponent, "\u0275fac", function NzCountdownComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzCountdownComponent)();
});
__publicField(_NzCountdownComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzCountdownComponent,
  selectors: [["nz-countdown"]],
  inputs: {
    nzFormat: "nzFormat"
  },
  outputs: {
    nzCountdownFinish: "nzCountdownFinish"
  },
  exportAs: ["nzCountdown"],
  features: [\u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature],
  decls: 3,
  vars: 6,
  consts: [["countDownTpl", ""], [3, "nzValue", "nzValueStyle", "nzValueTemplate", "nzTitle", "nzPrefix", "nzSuffix"]],
  template: function NzCountdownComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "nz-statistic", 1);
      \u0275\u0275template(1, NzCountdownComponent_ng_template_1_Template, 2, 4, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const countDownTpl_r2 = \u0275\u0275reference(2);
      \u0275\u0275property("nzValue", ctx.diff)("nzValueStyle", ctx.nzValueStyle)("nzValueTemplate", ctx.nzValueTemplate || countDownTpl_r2)("nzTitle", ctx.nzTitle)("nzPrefix", ctx.nzPrefix)("nzSuffix", ctx.nzSuffix);
    }
  },
  dependencies: [NzStatisticComponent, NzPipesModule, NzTimeRangePipe],
  encapsulation: 2,
  changeDetection: 0
}));
var NzCountdownComponent = _NzCountdownComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCountdownComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-countdown",
      exportAs: "nzCountdown",
      template: `
    <nz-statistic
      [nzValue]="diff"
      [nzValueStyle]="nzValueStyle"
      [nzValueTemplate]="nzValueTemplate || countDownTpl"
      [nzTitle]="nzTitle"
      [nzPrefix]="nzPrefix"
      [nzSuffix]="nzSuffix"
    />

    <ng-template #countDownTpl>{{ diff | nzTimeRange: nzFormat }}</ng-template>
  `,
      imports: [NzStatisticComponent, NzPipesModule]
    }]
  }], () => [], {
    nzFormat: [{
      type: Input
    }],
    nzCountdownFinish: [{
      type: Output
    }]
  });
})();
var _NzStatisticModule = class _NzStatisticModule {
};
__publicField(_NzStatisticModule, "\u0275fac", function NzStatisticModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzStatisticModule)();
});
__publicField(_NzStatisticModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzStatisticModule,
  imports: [NzStatisticComponent, NzCountdownComponent, NzStatisticContentValueComponent],
  exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticContentValueComponent]
}));
__publicField(_NzStatisticModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzStatisticComponent, NzCountdownComponent]
}));
var NzStatisticModule = _NzStatisticModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzStatisticModule, [{
    type: NgModule,
    args: [{
      imports: [NzStatisticComponent, NzCountdownComponent, NzStatisticContentValueComponent],
      exports: [NzStatisticComponent, NzCountdownComponent, NzStatisticContentValueComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-list.mjs
var _c03 = ["*"];
function NzListItemMetaAvatarComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-avatar", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("nzSrc", ctx_r0.nzSrc);
  }
}
function NzListItemMetaAvatarComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
var _c12 = [[["nz-list-item-meta-avatar"]], [["nz-list-item-meta-title"]], [["nz-list-item-meta-description"]]];
var _c2 = ["nz-list-item-meta-avatar", "nz-list-item-meta-title", "nz-list-item-meta-description"];
function NzListItemMetaComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-list-item-meta-avatar", 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("nzSrc", ctx_r0.avatarStr);
  }
}
function NzListItemMetaComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-list-item-meta-avatar");
    \u0275\u0275elementContainer(1, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.avatarTpl);
  }
}
function NzListItemMetaComponent_Conditional_3_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzTitle);
  }
}
function NzListItemMetaComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-list-item-meta-title");
    \u0275\u0275template(1, NzListItemMetaComponent_Conditional_3_Conditional_1_ng_container_1_Template, 2, 1, "ng-container", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzTitle);
  }
}
function NzListItemMetaComponent_Conditional_3_Conditional_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzDescription);
  }
}
function NzListItemMetaComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-list-item-meta-description");
    \u0275\u0275template(1, NzListItemMetaComponent_Conditional_3_Conditional_2_ng_container_1_Template, 2, 1, "ng-container", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzDescription);
  }
}
function NzListItemMetaComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275conditionalCreate(1, NzListItemMetaComponent_Conditional_3_Conditional_1_Template, 2, 1, "nz-list-item-meta-title");
    \u0275\u0275conditionalCreate(2, NzListItemMetaComponent_Conditional_3_Conditional_2_Template, 2, 1, "nz-list-item-meta-description");
    \u0275\u0275projection(3, 1);
    \u0275\u0275projection(4, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzTitle && !ctx_r0.titleComponent ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzDescription && !ctx_r0.descriptionComponent ? 2 : -1);
  }
}
function NzListItemActionComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
var _c3 = ["nz-list-item-actions", ""];
function NzListItemActionsComponent_For_1_ng_template_1_Template(rf, ctx) {
}
function NzListItemActionsComponent_For_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "em", 1);
  }
}
function NzListItemActionsComponent_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275template(1, NzListItemActionsComponent_For_1_ng_template_1_Template, 0, 0, "ng-template", 0);
    \u0275\u0275conditionalCreate(2, NzListItemActionsComponent_For_1_Conditional_2_Template, 1, 0, "em", 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r1 = ctx.$implicit;
    const \u0275$index_1_r2 = ctx.$index;
    const \u0275$count_1_r3 = ctx.$count;
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", i_r1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!(\u0275$index_1_r2 === \u0275$count_1_r3 - 1) ? 2 : -1);
  }
}
var _c4 = [[["nz-list-header"]], [["nz-list-footer"], ["", "nz-list-footer", ""]], [["nz-list-load-more"], ["", "nz-list-load-more", ""]], [["nz-list-pagination"], ["", "nz-list-pagination", ""]], "*"];
var _c5 = ["nz-list-header", "nz-list-footer, [nz-list-footer]", "nz-list-load-more, [nz-list-load-more]", "nz-list-pagination, [nz-list-pagination]", "*"];
var _c6 = (a0, a1) => ({
  $implicit: a0,
  index: a1
});
function NzListComponent_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzHeader);
  }
}
function NzListComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-list-header");
    \u0275\u0275template(1, NzListComponent_Conditional_0_ng_container_1_Template, 2, 1, "ng-container", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzHeader);
  }
}
function NzListComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div");
  }
  if (rf & 2) {
    \u0275\u0275styleProp("min-height", 53, "px");
  }
}
function NzListComponent_Conditional_5_For_2_ng_template_1_Template(rf, ctx) {
}
function NzListComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275template(1, NzListComponent_Conditional_5_For_2_ng_template_1_Template, 0, 0, "ng-template", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const $index_r3 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nzSpan", ctx_r0.nzGrid.span || null)("nzXs", ctx_r0.nzGrid.xs || null)("nzSm", ctx_r0.nzGrid.sm || null)("nzMd", ctx_r0.nzGrid.md || null)("nzLg", ctx_r0.nzGrid.lg || null)("nzXl", ctx_r0.nzGrid.xl || null)("nzXXl", ctx_r0.nzGrid.xxl || null);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.nzRenderItem)("ngTemplateOutletContext", \u0275\u0275pureFunction2(9, _c6, item_r2, $index_r3));
  }
}
function NzListComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275repeaterCreate(1, NzListComponent_Conditional_5_For_2_Template, 2, 12, "div", 7, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("nzGutter", ctx_r0.nzGrid.gutter || null);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.nzDataSource);
  }
}
function NzListComponent_Conditional_6_For_2_ng_template_1_Template(rf, ctx) {
}
function NzListComponent_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, NzListComponent_Conditional_6_For_2_ng_template_1_Template, 0, 0, "ng-template", 8);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const $index_r5 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.nzRenderItem)("ngTemplateOutletContext", \u0275\u0275pureFunction2(2, _c6, item_r4, $index_r5));
  }
}
function NzListComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275repeaterCreate(1, NzListComponent_Conditional_6_For_2_Template, 2, 5, "ng-container", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275projection(3, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.nzDataSource);
  }
}
function NzListComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-list-empty", 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("nzNoResult", ctx_r0.nzNoResult);
  }
}
function NzListComponent_Conditional_8_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzFooter);
  }
}
function NzListComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-list-footer");
    \u0275\u0275template(1, NzListComponent_Conditional_8_ng_container_1_Template, 2, 1, "ng-container", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzFooter);
  }
}
function NzListComponent_ng_template_10_Template(rf, ctx) {
}
function NzListComponent_Conditional_12_ng_template_1_Template(rf, ctx) {
}
function NzListComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-list-pagination");
    \u0275\u0275template(1, NzListComponent_Conditional_12_ng_template_1_Template, 0, 0, "ng-template", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.nzPagination);
  }
}
var _c7 = [[["nz-list-item-actions"], ["", "nz-list-item-actions", ""]], [["nz-list-item-meta"], ["", "nz-list-item-meta", ""]], "*", [["nz-list-item-extra"], ["", "nz-list-item-extra", ""]]];
var _c8 = ["nz-list-item-actions, [nz-list-item-actions]", "nz-list-item-meta, [nz-list-item-meta]", "*", "nz-list-item-extra, [nz-list-item-extra]"];
function NzListItemComponent_ng_template_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ul", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nzActions", ctx_r0.nzActions);
  }
}
function NzListItemComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzListItemComponent_ng_template_0_Conditional_0_Template, 1, 1, "ul", 3);
    \u0275\u0275projection(1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.nzActions && ctx_r0.nzActions.length > 0 ? 0 : -1);
  }
}
function NzListItemComponent_ng_template_2_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzContent);
  }
}
function NzListItemComponent_ng_template_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzListItemComponent_ng_template_2_Conditional_2_ng_container_0_Template, 2, 1, "ng-container", 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzContent);
  }
}
function NzListItemComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 1);
    \u0275\u0275projection(1, 2);
    \u0275\u0275conditionalCreate(2, NzListItemComponent_ng_template_2_Conditional_2_Template, 1, 1, "ng-container");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.nzContent ? 2 : -1);
  }
}
function NzListItemComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 3);
  }
}
function NzListItemComponent_Conditional_6_ng_template_1_Template(rf, ctx) {
}
function NzListItemComponent_Conditional_6_ng_template_2_Template(rf, ctx) {
}
function NzListItemComponent_Conditional_6_Conditional_3_ng_template_1_Template(rf, ctx) {
}
function NzListItemComponent_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-list-item-extra");
    \u0275\u0275template(1, NzListItemComponent_Conditional_6_Conditional_3_ng_template_1_Template, 0, 0, "ng-template", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.nzExtra);
  }
}
function NzListItemComponent_Conditional_6_ng_template_4_Template(rf, ctx) {
}
function NzListItemComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275template(1, NzListItemComponent_Conditional_6_ng_template_1_Template, 0, 0, "ng-template", 6)(2, NzListItemComponent_Conditional_6_ng_template_2_Template, 0, 0, "ng-template", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(3, NzListItemComponent_Conditional_6_Conditional_3_Template, 2, 1, "nz-list-item-extra");
    \u0275\u0275template(4, NzListItemComponent_Conditional_6_ng_template_4_Template, 0, 0, "ng-template", 6);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const actionsTpl_r2 = \u0275\u0275reference(1);
    const contentTpl_r3 = \u0275\u0275reference(3);
    const extraTpl_r4 = \u0275\u0275reference(5);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", contentTpl_r3);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", actionsTpl_r2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzExtra ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", extraTpl_r4);
  }
}
function NzListItemComponent_Conditional_7_ng_template_0_Template(rf, ctx) {
}
function NzListItemComponent_Conditional_7_ng_template_1_Template(rf, ctx) {
}
function NzListItemComponent_Conditional_7_ng_template_2_Template(rf, ctx) {
}
function NzListItemComponent_Conditional_7_ng_template_3_Template(rf, ctx) {
}
function NzListItemComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzListItemComponent_Conditional_7_ng_template_0_Template, 0, 0, "ng-template", 6)(1, NzListItemComponent_Conditional_7_ng_template_1_Template, 0, 0, "ng-template", 6)(2, NzListItemComponent_Conditional_7_ng_template_2_Template, 0, 0, "ng-template", 6)(3, NzListItemComponent_Conditional_7_ng_template_3_Template, 0, 0, "ng-template", 6);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const actionsTpl_r2 = \u0275\u0275reference(1);
    const contentTpl_r3 = \u0275\u0275reference(3);
    const extraTpl_r4 = \u0275\u0275reference(5);
    \u0275\u0275property("ngTemplateOutlet", contentTpl_r3);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.nzExtra);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", extraTpl_r4);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", actionsTpl_r2);
  }
}
var _NzListItemMetaTitleComponent = class _NzListItemMetaTitleComponent {
};
__publicField(_NzListItemMetaTitleComponent, "\u0275fac", function NzListItemMetaTitleComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListItemMetaTitleComponent)();
});
__publicField(_NzListItemMetaTitleComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzListItemMetaTitleComponent,
  selectors: [["nz-list-item-meta-title"]],
  exportAs: ["nzListItemMetaTitle"],
  ngContentSelectors: _c03,
  decls: 2,
  vars: 0,
  consts: [[1, "ant-list-item-meta-title"]],
  template: function NzListItemMetaTitleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "h4", 0);
      \u0275\u0275projection(1);
      \u0275\u0275domElementEnd();
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzListItemMetaTitleComponent = _NzListItemMetaTitleComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListItemMetaTitleComponent, [{
    type: Component,
    args: [{
      selector: "nz-list-item-meta-title",
      exportAs: "nzListItemMetaTitle",
      template: `
    <h4 class="ant-list-item-meta-title">
      <ng-content />
    </h4>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, null);
})();
var _NzListItemMetaDescriptionComponent = class _NzListItemMetaDescriptionComponent {
};
__publicField(_NzListItemMetaDescriptionComponent, "\u0275fac", function NzListItemMetaDescriptionComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListItemMetaDescriptionComponent)();
});
__publicField(_NzListItemMetaDescriptionComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzListItemMetaDescriptionComponent,
  selectors: [["nz-list-item-meta-description"]],
  exportAs: ["nzListItemMetaDescription"],
  ngContentSelectors: _c03,
  decls: 2,
  vars: 0,
  consts: [[1, "ant-list-item-meta-description"]],
  template: function NzListItemMetaDescriptionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "div", 0);
      \u0275\u0275projection(1);
      \u0275\u0275domElementEnd();
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzListItemMetaDescriptionComponent = _NzListItemMetaDescriptionComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListItemMetaDescriptionComponent, [{
    type: Component,
    args: [{
      selector: "nz-list-item-meta-description",
      exportAs: "nzListItemMetaDescription",
      template: `
    <div class="ant-list-item-meta-description">
      <ng-content />
    </div>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, null);
})();
var _NzListItemMetaAvatarComponent = class _NzListItemMetaAvatarComponent {
  constructor() {
    __publicField(this, "nzSrc");
  }
};
__publicField(_NzListItemMetaAvatarComponent, "\u0275fac", function NzListItemMetaAvatarComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListItemMetaAvatarComponent)();
});
__publicField(_NzListItemMetaAvatarComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzListItemMetaAvatarComponent,
  selectors: [["nz-list-item-meta-avatar"]],
  inputs: {
    nzSrc: "nzSrc"
  },
  exportAs: ["nzListItemMetaAvatar"],
  ngContentSelectors: _c03,
  decls: 3,
  vars: 1,
  consts: [[1, "ant-list-item-meta-avatar"], [3, "nzSrc"]],
  template: function NzListItemMetaAvatarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275conditionalCreate(1, NzListItemMetaAvatarComponent_Conditional_1_Template, 1, 1, "nz-avatar", 1)(2, NzListItemMetaAvatarComponent_Conditional_2_Template, 1, 0);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzSrc ? 1 : 2);
    }
  },
  dependencies: [NzAvatarModule, NzAvatarComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzListItemMetaAvatarComponent = _NzListItemMetaAvatarComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListItemMetaAvatarComponent, [{
    type: Component,
    args: [{
      selector: "nz-list-item-meta-avatar",
      exportAs: "nzListItemMetaAvatar",
      template: `
    <div class="ant-list-item-meta-avatar">
      @if (nzSrc) {
        <nz-avatar [nzSrc]="nzSrc" />
      } @else {
        <ng-content />
      }
    </div>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NzAvatarModule]
    }]
  }], null, {
    nzSrc: [{
      type: Input
    }]
  });
})();
var _NzListItemMetaComponent = class _NzListItemMetaComponent {
  constructor() {
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "avatarStr", "");
    __publicField(this, "avatarTpl");
    __publicField(this, "nzTitle");
    __publicField(this, "nzDescription");
    __publicField(this, "descriptionComponent");
    __publicField(this, "titleComponent");
  }
  set nzAvatar(value) {
    if (value instanceof TemplateRef) {
      this.avatarStr = "";
      this.avatarTpl = value;
    } else {
      this.avatarStr = value;
    }
  }
};
__publicField(_NzListItemMetaComponent, "\u0275fac", function NzListItemMetaComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListItemMetaComponent)();
});
__publicField(_NzListItemMetaComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzListItemMetaComponent,
  selectors: [["nz-list-item-meta"], ["", "nz-list-item-meta", ""]],
  contentQueries: function NzListItemMetaComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzListItemMetaDescriptionComponent, 5)(dirIndex, NzListItemMetaTitleComponent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.descriptionComponent = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.titleComponent = _t.first);
    }
  },
  hostAttrs: [1, "ant-list-item-meta"],
  inputs: {
    nzAvatar: "nzAvatar",
    nzTitle: "nzTitle",
    nzDescription: "nzDescription"
  },
  exportAs: ["nzListItemMeta"],
  ngContentSelectors: _c2,
  decls: 4,
  vars: 3,
  consts: [[3, "nzSrc"], [1, "ant-list-item-meta-content"], [3, "ngTemplateOutlet"], [4, "nzStringTemplateOutlet"]],
  template: function NzListItemMetaComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c12);
      \u0275\u0275conditionalCreate(0, NzListItemMetaComponent_Conditional_0_Template, 1, 1, "nz-list-item-meta-avatar", 0);
      \u0275\u0275conditionalCreate(1, NzListItemMetaComponent_Conditional_1_Template, 2, 1, "nz-list-item-meta-avatar");
      \u0275\u0275projection(2);
      \u0275\u0275conditionalCreate(3, NzListItemMetaComponent_Conditional_3_Template, 5, 2, "div", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.avatarStr ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.avatarTpl ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.nzTitle || ctx.nzDescription || ctx.descriptionComponent || ctx.titleComponent ? 3 : -1);
    }
  },
  dependencies: [NzListItemMetaAvatarComponent, NgTemplateOutlet, NzListItemMetaTitleComponent, NzOutletModule, NzStringTemplateOutletDirective, NzListItemMetaDescriptionComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzListItemMetaComponent = _NzListItemMetaComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListItemMetaComponent, [{
    type: Component,
    args: [{
      selector: "nz-list-item-meta, [nz-list-item-meta]",
      exportAs: "nzListItemMeta",
      template: `
    <!--Old API Start-->
    @if (avatarStr) {
      <nz-list-item-meta-avatar [nzSrc]="avatarStr" />
    }

    @if (avatarTpl) {
      <nz-list-item-meta-avatar>
        <ng-container [ngTemplateOutlet]="avatarTpl" />
      </nz-list-item-meta-avatar>
    }

    <!--Old API End-->

    <ng-content select="nz-list-item-meta-avatar" />

    @if (nzTitle || nzDescription || descriptionComponent || titleComponent) {
      <div class="ant-list-item-meta-content">
        <!--Old API Start-->

        @if (nzTitle && !titleComponent) {
          <nz-list-item-meta-title>
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </nz-list-item-meta-title>
        }

        @if (nzDescription && !descriptionComponent) {
          <nz-list-item-meta-description>
            <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
          </nz-list-item-meta-description>
        }
        <!--Old API End-->

        <ng-content select="nz-list-item-meta-title" />
        <ng-content select="nz-list-item-meta-description" />
      </div>
    }
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "ant-list-item-meta"
      },
      imports: [NzListItemMetaAvatarComponent, NgTemplateOutlet, NzListItemMetaTitleComponent, NzOutletModule, NzListItemMetaDescriptionComponent]
    }]
  }], null, {
    nzAvatar: [{
      type: Input
    }],
    nzTitle: [{
      type: Input
    }],
    nzDescription: [{
      type: Input
    }],
    descriptionComponent: [{
      type: ContentChild,
      args: [NzListItemMetaDescriptionComponent]
    }],
    titleComponent: [{
      type: ContentChild,
      args: [NzListItemMetaTitleComponent]
    }]
  });
})();
var _NzListItemExtraComponent = class _NzListItemExtraComponent {
};
__publicField(_NzListItemExtraComponent, "\u0275fac", function NzListItemExtraComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListItemExtraComponent)();
});
__publicField(_NzListItemExtraComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzListItemExtraComponent,
  selectors: [["nz-list-item-extra"], ["", "nz-list-item-extra", ""]],
  hostAttrs: [1, "ant-list-item-extra"],
  exportAs: ["nzListItemExtra"],
  ngContentSelectors: _c03,
  decls: 1,
  vars: 0,
  template: function NzListItemExtraComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzListItemExtraComponent = _NzListItemExtraComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListItemExtraComponent, [{
    type: Component,
    args: [{
      selector: "nz-list-item-extra, [nz-list-item-extra]",
      exportAs: "nzListItemExtra",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<ng-content />`,
      host: {
        class: "ant-list-item-extra"
      }
    }]
  }], null, null);
})();
var _NzListItemActionComponent = class _NzListItemActionComponent {
  constructor() {
    __publicField(this, "templateRef");
  }
};
__publicField(_NzListItemActionComponent, "\u0275fac", function NzListItemActionComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListItemActionComponent)();
});
__publicField(_NzListItemActionComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzListItemActionComponent,
  selectors: [["nz-list-item-action"]],
  viewQuery: function NzListItemActionComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(TemplateRef, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.templateRef = _t.first);
    }
  },
  exportAs: ["nzListItemAction"],
  ngContentSelectors: _c03,
  decls: 1,
  vars: 0,
  template: function NzListItemActionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domTemplate(0, NzListItemActionComponent_ng_template_0_Template, 1, 0, "ng-template");
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzListItemActionComponent = _NzListItemActionComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListItemActionComponent, [{
    type: Component,
    args: [{
      selector: "nz-list-item-action",
      exportAs: "nzListItemAction",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<ng-template><ng-content /></ng-template>`
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
var _NzListItemActionsComponent = class _NzListItemActionsComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "nzActions", []);
    __publicField(this, "nzListItemActions");
    __publicField(this, "actions", []);
    __publicField(this, "inputActionChanges$", new Subject());
    __publicField(this, "contentChildrenChanges$", defer(() => {
      if (this.nzListItemActions) {
        return of(null);
      }
      return this.initialized.pipe(mergeMap(() => this.nzListItemActions.changes.pipe(startWith(this.nzListItemActions))));
    }));
    __publicField(this, "initialized", new Subject());
    merge(this.contentChildrenChanges$, this.inputActionChanges$).pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.nzActions.length) {
        this.actions = this.nzActions;
      } else {
        this.actions = this.nzListItemActions.map((action) => action.templateRef);
      }
      this.cdr.detectChanges();
    });
  }
  ngOnChanges() {
    this.inputActionChanges$.next(null);
  }
  ngAfterContentInit() {
    this.initialized.next();
    this.initialized.complete();
  }
};
__publicField(_NzListItemActionsComponent, "\u0275fac", function NzListItemActionsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListItemActionsComponent)();
});
__publicField(_NzListItemActionsComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzListItemActionsComponent,
  selectors: [["ul", "nz-list-item-actions", ""]],
  contentQueries: function NzListItemActionsComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzListItemActionComponent, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzListItemActions = _t);
    }
  },
  hostAttrs: [1, "ant-list-item-action"],
  inputs: {
    nzActions: "nzActions"
  },
  exportAs: ["nzListItemActions"],
  features: [\u0275\u0275NgOnChangesFeature],
  attrs: _c3,
  decls: 2,
  vars: 0,
  consts: [[3, "ngTemplateOutlet"], [1, "ant-list-item-action-split"]],
  template: function NzListItemActionsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275repeaterCreate(0, NzListItemActionsComponent_For_1_Template, 3, 2, "li", null, \u0275\u0275repeaterTrackByIdentity);
    }
    if (rf & 2) {
      \u0275\u0275repeater(ctx.actions);
    }
  },
  dependencies: [NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var NzListItemActionsComponent = _NzListItemActionsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListItemActionsComponent, [{
    type: Component,
    args: [{
      selector: "ul[nz-list-item-actions]",
      exportAs: "nzListItemActions",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @for (i of actions; track i) {
      <li>
        <ng-template [ngTemplateOutlet]="i" />
        @if (!$last) {
          <em class="ant-list-item-action-split"></em>
        }
      </li>
    }
  `,
      host: {
        class: "ant-list-item-action"
      },
      imports: [NgTemplateOutlet]
    }]
  }], () => [], {
    nzActions: [{
      type: Input
    }],
    nzListItemActions: [{
      type: ContentChildren,
      args: [NzListItemActionComponent]
    }]
  });
})();
var _NzListEmptyComponent = class _NzListEmptyComponent {
  constructor() {
    __publicField(this, "nzNoResult");
  }
};
__publicField(_NzListEmptyComponent, "\u0275fac", function NzListEmptyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListEmptyComponent)();
});
__publicField(_NzListEmptyComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzListEmptyComponent,
  selectors: [["nz-list-empty"]],
  hostAttrs: [1, "ant-list-empty-text"],
  inputs: {
    nzNoResult: "nzNoResult"
  },
  exportAs: ["nzListHeader"],
  decls: 1,
  vars: 1,
  consts: [["nzComponentName", "list", 3, "specificContent"]],
  template: function NzListEmptyComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "nz-embed-empty", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("specificContent", ctx.nzNoResult);
    }
  },
  dependencies: [NzEmptyModule, NzEmbedEmptyComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzListEmptyComponent = _NzListEmptyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListEmptyComponent, [{
    type: Component,
    args: [{
      selector: "nz-list-empty",
      exportAs: "nzListHeader",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<nz-embed-empty nzComponentName="list" [specificContent]="nzNoResult" />`,
      host: {
        class: "ant-list-empty-text"
      },
      imports: [NzEmptyModule]
    }]
  }], null, {
    nzNoResult: [{
      type: Input
    }]
  });
})();
var _NzListHeaderComponent = class _NzListHeaderComponent {
};
__publicField(_NzListHeaderComponent, "\u0275fac", function NzListHeaderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListHeaderComponent)();
});
__publicField(_NzListHeaderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzListHeaderComponent,
  selectors: [["nz-list-header"]],
  hostAttrs: [1, "ant-list-header"],
  exportAs: ["nzListHeader"],
  ngContentSelectors: _c03,
  decls: 1,
  vars: 0,
  template: function NzListHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzListHeaderComponent = _NzListHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListHeaderComponent, [{
    type: Component,
    args: [{
      selector: "nz-list-header",
      exportAs: "nzListHeader",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<ng-content />`,
      host: {
        class: "ant-list-header"
      }
    }]
  }], null, null);
})();
var _NzListFooterComponent = class _NzListFooterComponent {
};
__publicField(_NzListFooterComponent, "\u0275fac", function NzListFooterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListFooterComponent)();
});
__publicField(_NzListFooterComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzListFooterComponent,
  selectors: [["nz-list-footer"]],
  hostAttrs: [1, "ant-list-footer"],
  exportAs: ["nzListFooter"],
  ngContentSelectors: _c03,
  decls: 1,
  vars: 0,
  template: function NzListFooterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzListFooterComponent = _NzListFooterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListFooterComponent, [{
    type: Component,
    args: [{
      selector: "nz-list-footer",
      exportAs: "nzListFooter",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<ng-content />`,
      host: {
        class: "ant-list-footer"
      }
    }]
  }], null, null);
})();
var _NzListPaginationComponent = class _NzListPaginationComponent {
};
__publicField(_NzListPaginationComponent, "\u0275fac", function NzListPaginationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListPaginationComponent)();
});
__publicField(_NzListPaginationComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzListPaginationComponent,
  selectors: [["nz-list-pagination"]],
  hostAttrs: [1, "ant-list-pagination"],
  exportAs: ["nzListPagination"],
  ngContentSelectors: _c03,
  decls: 1,
  vars: 0,
  template: function NzListPaginationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzListPaginationComponent = _NzListPaginationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListPaginationComponent, [{
    type: Component,
    args: [{
      selector: "nz-list-pagination",
      exportAs: "nzListPagination",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<ng-content />`,
      host: {
        class: "ant-list-pagination"
      }
    }]
  }], null, null);
})();
var _NzListLoadMoreDirective = class _NzListLoadMoreDirective {
};
__publicField(_NzListLoadMoreDirective, "\u0275fac", function NzListLoadMoreDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListLoadMoreDirective)();
});
__publicField(_NzListLoadMoreDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzListLoadMoreDirective,
  selectors: [["nz-list-load-more"]],
  exportAs: ["nzListLoadMoreDirective"]
}));
var NzListLoadMoreDirective = _NzListLoadMoreDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListLoadMoreDirective, [{
    type: Directive,
    args: [{
      selector: "nz-list-load-more",
      exportAs: "nzListLoadMoreDirective"
    }]
  }], null, null);
})();
var _NzListGridDirective = class _NzListGridDirective {
};
__publicField(_NzListGridDirective, "\u0275fac", function NzListGridDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListGridDirective)();
});
__publicField(_NzListGridDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzListGridDirective,
  selectors: [["nz-list", "nzGrid", ""]],
  hostAttrs: [1, "ant-list-grid"]
}));
var NzListGridDirective = _NzListGridDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListGridDirective, [{
    type: Directive,
    args: [{
      selector: "nz-list[nzGrid]",
      host: {
        class: "ant-list-grid"
      }
    }]
  }], null, null);
})();
var _NzListComponent = class _NzListComponent {
  constructor() {
    __publicField(this, "directionality", inject(Directionality));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "nzDataSource");
    __publicField(this, "nzBordered", false);
    __publicField(this, "nzGrid", "");
    __publicField(this, "nzHeader");
    __publicField(this, "nzFooter");
    __publicField(this, "nzItemLayout", "horizontal");
    __publicField(this, "nzRenderItem", null);
    __publicField(this, "nzLoading", false);
    __publicField(this, "nzLoadMore", null);
    __publicField(this, "nzPagination");
    __publicField(this, "nzSize", "default");
    __publicField(this, "nzSplit", true);
    __publicField(this, "nzNoResult");
    __publicField(this, "nzListFooterComponent");
    __publicField(this, "nzListPaginationComponent");
    __publicField(this, "nzListLoadMoreDirective");
    __publicField(this, "hasSomethingAfterLastItem", false);
    __publicField(this, "dir", "ltr");
    __publicField(this, "itemLayoutNotifySource", new BehaviorSubject(this.nzItemLayout));
    this.destroyRef.onDestroy(() => this.itemLayoutNotifySource.unsubscribe());
  }
  get itemLayoutNotify$() {
    return this.itemLayoutNotifySource.asObservable();
  }
  ngOnInit() {
    var _a;
    this.dir = this.directionality.value;
    (_a = this.directionality.change) == null ? void 0 : _a.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
    });
  }
  getSomethingAfterLastItem() {
    return !!(this.nzLoadMore || this.nzPagination || this.nzFooter || this.nzListFooterComponent || this.nzListPaginationComponent || this.nzListLoadMoreDirective);
  }
  ngOnChanges(changes) {
    if (changes.nzItemLayout) {
      this.itemLayoutNotifySource.next(this.nzItemLayout);
    }
  }
  ngAfterContentInit() {
    this.hasSomethingAfterLastItem = this.getSomethingAfterLastItem();
  }
};
__publicField(_NzListComponent, "\u0275fac", function NzListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListComponent)();
});
__publicField(_NzListComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzListComponent,
  selectors: [["nz-list"], ["", "nz-list", ""]],
  contentQueries: function NzListComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzListFooterComponent, 5)(dirIndex, NzListPaginationComponent, 5)(dirIndex, NzListLoadMoreDirective, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzListFooterComponent = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzListPaginationComponent = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzListLoadMoreDirective = _t.first);
    }
  },
  hostAttrs: [1, "ant-list"],
  hostVars: 16,
  hostBindings: function NzListComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-list-rtl", ctx.dir === "rtl")("ant-list-vertical", ctx.nzItemLayout === "vertical")("ant-list-lg", ctx.nzSize === "large")("ant-list-sm", ctx.nzSize === "small")("ant-list-split", ctx.nzSplit)("ant-list-bordered", ctx.nzBordered)("ant-list-loading", ctx.nzLoading)("ant-list-something-after-last-item", ctx.hasSomethingAfterLastItem);
    }
  },
  inputs: {
    nzDataSource: "nzDataSource",
    nzBordered: [2, "nzBordered", "nzBordered", booleanAttribute],
    nzGrid: "nzGrid",
    nzHeader: "nzHeader",
    nzFooter: "nzFooter",
    nzItemLayout: "nzItemLayout",
    nzRenderItem: "nzRenderItem",
    nzLoading: [2, "nzLoading", "nzLoading", booleanAttribute],
    nzLoadMore: "nzLoadMore",
    nzPagination: "nzPagination",
    nzSize: "nzSize",
    nzSplit: [2, "nzSplit", "nzSplit", booleanAttribute],
    nzNoResult: "nzNoResult"
  },
  exportAs: ["nzList"],
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c5,
  decls: 14,
  vars: 8,
  consts: [[3, "nzSpinning"], [3, "min-height"], ["nz-row", "", 3, "nzGutter"], [1, "ant-list-items"], [3, "nzNoResult"], [3, "ngTemplateOutlet"], [4, "nzStringTemplateOutlet"], ["nz-col", "", 3, "nzSpan", "nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]],
  template: function NzListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c4);
      \u0275\u0275conditionalCreate(0, NzListComponent_Conditional_0_Template, 2, 1, "nz-list-header");
      \u0275\u0275projection(1);
      \u0275\u0275elementStart(2, "nz-spin", 0);
      \u0275\u0275elementContainerStart(3);
      \u0275\u0275conditionalCreate(4, NzListComponent_Conditional_4_Template, 1, 2, "div", 1);
      \u0275\u0275conditionalCreate(5, NzListComponent_Conditional_5_Template, 3, 1, "div", 2)(6, NzListComponent_Conditional_6_Template, 4, 0, "div", 3);
      \u0275\u0275conditionalCreate(7, NzListComponent_Conditional_7_Template, 1, 1, "nz-list-empty", 4);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(8, NzListComponent_Conditional_8_Template, 2, 1, "nz-list-footer");
      \u0275\u0275projection(9, 1);
      \u0275\u0275template(10, NzListComponent_ng_template_10_Template, 0, 0, "ng-template", 5);
      \u0275\u0275projection(11, 2);
      \u0275\u0275conditionalCreate(12, NzListComponent_Conditional_12_Template, 2, 1, "nz-list-pagination");
      \u0275\u0275projection(13, 3);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.nzHeader ? 0 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("nzSpinning", ctx.nzLoading);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.nzLoading && ctx.nzDataSource && ctx.nzDataSource.length === 0 ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzGrid && ctx.nzDataSource ? 5 : 6);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.nzLoading && ctx.nzDataSource && ctx.nzDataSource.length === 0 ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzFooter ? 8 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngTemplateOutlet", ctx.nzLoadMore);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.nzPagination ? 12 : -1);
    }
  },
  dependencies: [NgTemplateOutlet, NzListHeaderComponent, NzOutletModule, NzStringTemplateOutletDirective, NzSpinModule, NzSpinComponent, NzGridModule, NzColDirective, NzRowDirective, NzListEmptyComponent, NzListFooterComponent, NzListPaginationComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzListComponent = _NzListComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListComponent, [{
    type: Component,
    args: [{
      selector: "nz-list, [nz-list]",
      exportAs: "nzList",
      template: `
    @if (nzHeader) {
      <nz-list-header>
        <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
      </nz-list-header>
    }

    <ng-content select="nz-list-header" />

    <nz-spin [nzSpinning]="nzLoading">
      <ng-container>
        @if (nzLoading && nzDataSource && nzDataSource.length === 0) {
          <div [style.min-height.px]="53"></div>
        }
        @if (nzGrid && nzDataSource) {
          <div nz-row [nzGutter]="nzGrid.gutter || null">
            @for (item of nzDataSource; track item) {
              <div
                nz-col
                [nzSpan]="nzGrid.span || null"
                [nzXs]="nzGrid.xs || null"
                [nzSm]="nzGrid.sm || null"
                [nzMd]="nzGrid.md || null"
                [nzLg]="nzGrid.lg || null"
                [nzXl]="nzGrid.xl || null"
                [nzXXl]="nzGrid.xxl || null"
              >
                <ng-template
                  [ngTemplateOutlet]="nzRenderItem"
                  [ngTemplateOutletContext]="{ $implicit: item, index: $index }"
                />
              </div>
            }
          </div>
        } @else {
          <div class="ant-list-items">
            @for (item of nzDataSource; track item) {
              <ng-container>
                <ng-template
                  [ngTemplateOutlet]="nzRenderItem"
                  [ngTemplateOutletContext]="{ $implicit: item, index: $index }"
                />
              </ng-container>
            }
            <ng-content />
          </div>
        }

        @if (!nzLoading && nzDataSource && nzDataSource.length === 0) {
          <nz-list-empty [nzNoResult]="nzNoResult" />
        }
      </ng-container>
    </nz-spin>

    @if (nzFooter) {
      <nz-list-footer>
        <ng-container *nzStringTemplateOutlet="nzFooter">{{ nzFooter }}</ng-container>
      </nz-list-footer>
    }

    <ng-content select="nz-list-footer, [nz-list-footer]" />

    <ng-template [ngTemplateOutlet]="nzLoadMore" />
    <ng-content select="nz-list-load-more, [nz-list-load-more]" />

    @if (nzPagination) {
      <nz-list-pagination>
        <ng-template [ngTemplateOutlet]="nzPagination" />
      </nz-list-pagination>
    }

    <ng-content select="nz-list-pagination, [nz-list-pagination]" />
  `,
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        class: "ant-list",
        "[class.ant-list-rtl]": `dir === 'rtl'`,
        "[class.ant-list-vertical]": 'nzItemLayout === "vertical"',
        "[class.ant-list-lg]": 'nzSize === "large"',
        "[class.ant-list-sm]": 'nzSize === "small"',
        "[class.ant-list-split]": "nzSplit",
        "[class.ant-list-bordered]": "nzBordered",
        "[class.ant-list-loading]": "nzLoading",
        "[class.ant-list-something-after-last-item]": "hasSomethingAfterLastItem"
      },
      imports: [NgTemplateOutlet, NzListHeaderComponent, NzOutletModule, NzSpinModule, NzGridModule, NzListEmptyComponent, NzListFooterComponent, NzListPaginationComponent]
    }]
  }], () => [], {
    nzDataSource: [{
      type: Input
    }],
    nzBordered: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzGrid: [{
      type: Input
    }],
    nzHeader: [{
      type: Input
    }],
    nzFooter: [{
      type: Input
    }],
    nzItemLayout: [{
      type: Input
    }],
    nzRenderItem: [{
      type: Input
    }],
    nzLoading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzLoadMore: [{
      type: Input
    }],
    nzPagination: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzSplit: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzNoResult: [{
      type: Input
    }],
    nzListFooterComponent: [{
      type: ContentChild,
      args: [NzListFooterComponent]
    }],
    nzListPaginationComponent: [{
      type: ContentChild,
      args: [NzListPaginationComponent]
    }],
    nzListLoadMoreDirective: [{
      type: ContentChild,
      args: [NzListLoadMoreDirective]
    }]
  });
})();
var _NzListItemComponent = class _NzListItemComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "parentComp", inject(NzListComponent));
    __publicField(this, "nzActions", []);
    __publicField(this, "nzContent");
    __publicField(this, "nzExtra", null);
    __publicField(this, "nzNoFlex", false);
    __publicField(this, "listItemExtraDirective");
    __publicField(this, "itemLayout");
  }
  get isVerticalAndExtra() {
    return this.itemLayout === "vertical" && (!!this.listItemExtraDirective || !!this.nzExtra);
  }
  ngAfterViewInit() {
    this.parentComp.itemLayoutNotify$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((val) => {
      this.itemLayout = val;
      this.cdr.detectChanges();
    });
  }
};
__publicField(_NzListItemComponent, "\u0275fac", function NzListItemComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListItemComponent)();
});
__publicField(_NzListItemComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzListItemComponent,
  selectors: [["nz-list-item"], ["", "nz-list-item", ""]],
  contentQueries: function NzListItemComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzListItemExtraComponent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listItemExtraDirective = _t.first);
    }
  },
  hostAttrs: [1, "ant-list-item"],
  hostVars: 2,
  hostBindings: function NzListItemComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-list-item-no-flex", ctx.nzNoFlex);
    }
  },
  inputs: {
    nzActions: "nzActions",
    nzContent: "nzContent",
    nzExtra: "nzExtra",
    nzNoFlex: [2, "nzNoFlex", "nzNoFlex", booleanAttribute]
  },
  exportAs: ["nzListItem"],
  ngContentSelectors: _c8,
  decls: 8,
  vars: 1,
  consts: [["actionsTpl", ""], ["contentTpl", ""], ["extraTpl", ""], ["nz-list-item-actions", "", 3, "nzActions"], [4, "nzStringTemplateOutlet"], [1, "ant-list-item-main"], [3, "ngTemplateOutlet"]],
  template: function NzListItemComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c7);
      \u0275\u0275template(0, NzListItemComponent_ng_template_0_Template, 2, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(2, NzListItemComponent_ng_template_2_Template, 3, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(4, NzListItemComponent_ng_template_4_Template, 1, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
      \u0275\u0275conditionalCreate(6, NzListItemComponent_Conditional_6_Template, 5, 4)(7, NzListItemComponent_Conditional_7_Template, 4, 4);
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.isVerticalAndExtra ? 6 : 7);
    }
  },
  dependencies: [NzListItemActionsComponent, NzOutletModule, NzStringTemplateOutletDirective, NgTemplateOutlet, NzListItemExtraComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzListItemComponent = _NzListItemComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListItemComponent, [{
    type: Component,
    args: [{
      selector: "nz-list-item, [nz-list-item]",
      exportAs: "nzListItem",
      template: `
    <ng-template #actionsTpl>
      @if (nzActions && nzActions.length > 0) {
        <ul nz-list-item-actions [nzActions]="nzActions"></ul>
      }
      <ng-content select="nz-list-item-actions, [nz-list-item-actions]" />
    </ng-template>
    <ng-template #contentTpl>
      <ng-content select="nz-list-item-meta, [nz-list-item-meta]" />
      <ng-content />
      @if (nzContent) {
        <ng-container *nzStringTemplateOutlet="nzContent">{{ nzContent }}</ng-container>
      }
    </ng-template>
    <ng-template #extraTpl>
      <ng-content select="nz-list-item-extra, [nz-list-item-extra]" />
    </ng-template>

    @if (isVerticalAndExtra) {
      <div class="ant-list-item-main">
        <ng-template [ngTemplateOutlet]="contentTpl" />
        <ng-template [ngTemplateOutlet]="actionsTpl" />
      </div>
      @if (nzExtra) {
        <nz-list-item-extra>
          <ng-template [ngTemplateOutlet]="nzExtra" />
        </nz-list-item-extra>
      }
      <ng-template [ngTemplateOutlet]="extraTpl" />
    } @else {
      <ng-template [ngTemplateOutlet]="contentTpl" />
      <ng-template [ngTemplateOutlet]="nzExtra" />
      <ng-template [ngTemplateOutlet]="extraTpl" />
      <ng-template [ngTemplateOutlet]="actionsTpl" />
    }
  `,
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        class: "ant-list-item"
      },
      imports: [NzListItemActionsComponent, NzOutletModule, NgTemplateOutlet, NzListItemExtraComponent]
    }]
  }], null, {
    nzActions: [{
      type: Input
    }],
    nzContent: [{
      type: Input
    }],
    nzExtra: [{
      type: Input
    }],
    nzNoFlex: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }, {
      type: HostBinding,
      args: ["class.ant-list-item-no-flex"]
    }],
    listItemExtraDirective: [{
      type: ContentChild,
      args: [NzListItemExtraComponent]
    }]
  });
})();
var DIRECTIVES = [NzListComponent, NzListHeaderComponent, NzListFooterComponent, NzListPaginationComponent, NzListEmptyComponent, NzListItemComponent, NzListItemMetaComponent, NzListItemMetaTitleComponent, NzListItemMetaDescriptionComponent, NzListItemMetaAvatarComponent, NzListItemActionsComponent, NzListItemActionComponent, NzListItemExtraComponent, NzListLoadMoreDirective, NzListGridDirective];
var _NzListModule = class _NzListModule {
};
__publicField(_NzListModule, "\u0275fac", function NzListModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzListModule)();
});
__publicField(_NzListModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzListModule,
  imports: [NzListComponent, NzListHeaderComponent, NzListFooterComponent, NzListPaginationComponent, NzListEmptyComponent, NzListItemComponent, NzListItemMetaComponent, NzListItemMetaTitleComponent, NzListItemMetaDescriptionComponent, NzListItemMetaAvatarComponent, NzListItemActionsComponent, NzListItemActionComponent, NzListItemExtraComponent, NzListLoadMoreDirective, NzListGridDirective],
  exports: [NzListComponent, NzListHeaderComponent, NzListFooterComponent, NzListPaginationComponent, NzListEmptyComponent, NzListItemComponent, NzListItemMetaComponent, NzListItemMetaTitleComponent, NzListItemMetaDescriptionComponent, NzListItemMetaAvatarComponent, NzListItemActionsComponent, NzListItemActionComponent, NzListItemExtraComponent, NzListLoadMoreDirective, NzListGridDirective]
}));
__publicField(_NzListModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzListComponent, NzListEmptyComponent, NzListItemComponent, NzListItemMetaComponent, NzListItemMetaAvatarComponent]
}));
var NzListModule = _NzListModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzListModule, [{
    type: NgModule,
    args: [{
      imports: [DIRECTIVES],
      exports: [DIRECTIVES]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-progress.mjs
var _c04 = (a0) => ({
  $implicit: a0
});
function NzProgressComponent_ng_template_0_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("nzType", ctx_r0.icon);
  }
}
function NzProgressComponent_ng_template_0_Conditional_0_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const formatter_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", formatter_r2(ctx_r0.nzPercent), " ");
  }
}
function NzProgressComponent_ng_template_0_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzProgressComponent_ng_template_0_Conditional_0_Conditional_2_ng_container_0_Template, 2, 1, "ng-container", 4);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.formatter)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c04, ctx_r0.nzPercent));
  }
}
function NzProgressComponent_ng_template_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275conditionalCreate(1, NzProgressComponent_ng_template_0_Conditional_0_Conditional_1_Template, 1, 1, "nz-icon", 3)(2, NzProgressComponent_ng_template_0_Conditional_0_Conditional_2_Template, 1, 4, "ng-container");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.status === "exception" || ctx_r0.status === "success") && !ctx_r0.nzFormat ? 1 : 2);
  }
}
function NzProgressComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzProgressComponent_ng_template_0_Conditional_0_Template, 3, 1, "span", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.nzShowInfo ? 0 : -1);
  }
}
function NzProgressComponent_Conditional_3_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 8);
  }
  if (rf & 2) {
    const step_r3 = ctx.$implicit;
    \u0275\u0275styleMap(step_r3);
  }
}
function NzProgressComponent_Conditional_3_Conditional_1_ng_template_3_Template(rf, ctx) {
}
function NzProgressComponent_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275repeaterCreate(1, NzProgressComponent_Conditional_3_Conditional_1_For_2_Template, 1, 2, "div", 6, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275template(3, NzProgressComponent_Conditional_3_Conditional_1_ng_template_3_Template, 0, 0, "ng-template", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    const progressInfoTemplate_r4 = \u0275\u0275reference(1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.steps);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", progressInfoTemplate_r4);
  }
}
function NzProgressComponent_Conditional_3_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 13);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("width", ctx_r0.nzSuccessPercent, "%")("border-radius", ctx_r0.nzStrokeLinecap === "round" ? "100px" : "0")("height", ctx_r0.strokeWidth, "px");
  }
}
function NzProgressComponent_Conditional_3_Conditional_2_ng_template_4_Template(rf, ctx) {
}
function NzProgressComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10);
    \u0275\u0275element(2, "div", 11);
    \u0275\u0275conditionalCreate(3, NzProgressComponent_Conditional_3_Conditional_2_Conditional_3_Template, 1, 6, "div", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, NzProgressComponent_Conditional_3_Conditional_2_ng_template_4_Template, 0, 0, "ng-template", 7);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    const progressInfoTemplate_r4 = \u0275\u0275reference(1);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r0.nzPercent, "%")("border-radius", ctx_r0.nzStrokeLinecap === "round" ? "100px" : "0")("background", !ctx_r0.isGradient ? ctx_r0.nzStrokeColor : null)("background-image", ctx_r0.isGradient ? ctx_r0.lineGradient : null)("height", ctx_r0.strokeWidth, "px");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzSuccessPercent || ctx_r0.nzSuccessPercent === 0 ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", progressInfoTemplate_r4);
  }
}
function NzProgressComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, NzProgressComponent_Conditional_3_Conditional_1_Template, 4, 1, "div", 5)(2, NzProgressComponent_Conditional_3_Conditional_2_Template, 5, 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isSteps ? 1 : 2);
  }
}
function NzProgressComponent_Conditional_4_Conditional_2_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "stop");
  }
  if (rf & 2) {
    const i_r5 = ctx.$implicit;
    \u0275\u0275attribute("offset", i_r5.offset)("stop-color", i_r5.color);
  }
}
function NzProgressComponent_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "defs")(1, "linearGradient", 17);
    \u0275\u0275repeaterCreate(2, NzProgressComponent_Conditional_4_Conditional_2_For_3_Template, 1, 2, ":svg:stop", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("id", "gradient-" + ctx_r0.gradientId);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.circleGradient);
  }
}
function NzProgressComponent_Conditional_4_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "path", 18);
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleMap(p_r6.strokePathStyle);
    \u0275\u0275attribute("d", ctx_r0.pathString)("stroke-linecap", ctx_r0.nzStrokeLinecap)("stroke", p_r6.stroke)("stroke-width", ctx_r0.nzPercent ? ctx_r0.strokeWidth : 0);
  }
}
function NzProgressComponent_Conditional_4_ng_template_6_Template(rf, ctx) {
}
function NzProgressComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 14);
    \u0275\u0275conditionalCreate(2, NzProgressComponent_Conditional_4_Conditional_2_Template, 4, 1, ":svg:defs");
    \u0275\u0275element(3, "path", 15);
    \u0275\u0275repeaterCreate(4, NzProgressComponent_Conditional_4_For_5_Template, 1, 6, ":svg:path", 16, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, NzProgressComponent_Conditional_4_ng_template_6_Template, 0, 0, "ng-template", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const progressInfoTemplate_r4 = \u0275\u0275reference(1);
    \u0275\u0275styleProp("width", ctx_r0.nzWidth, "px")("height", ctx_r0.nzWidth, "px")("font-size", ctx_r0.nzWidth * 0.15 + 6, "px");
    \u0275\u0275classProp("ant-progress-circle-gradient", ctx_r0.isGradient);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isGradient ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275styleMap(ctx_r0.trailPathStyle);
    \u0275\u0275attribute("stroke-width", ctx_r0.strokeWidth)("d", ctx_r0.pathString);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.progressCirclePath);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", progressInfoTemplate_r4);
  }
}
function stripPercentToNumber(percent) {
  return +percent.replace("%", "");
}
var sortGradient = (gradients) => {
  let tempArr = [];
  Object.keys(gradients).forEach((key) => {
    const value = gradients[key];
    const formatKey = stripPercentToNumber(key);
    if (!isNaN(formatKey)) {
      tempArr.push({
        key: formatKey,
        value
      });
    }
  });
  tempArr = tempArr.sort((a, b) => a.key - b.key);
  return tempArr;
};
var handleCircleGradient = (strokeColor) => sortGradient(strokeColor).map(({
  key,
  value
}) => ({
  offset: `${key}%`,
  color: value
}));
var handleLinearGradient = (strokeColor) => {
  const _a = strokeColor, {
    from: from2 = "#1890ff",
    to = "#1890ff",
    direction = "to right"
  } = _a, rest = __objRest(_a, [
    "from",
    "to",
    "direction"
  ]);
  if (Object.keys(rest).length !== 0) {
    const sortedGradients = sortGradient(rest).map(({
      key,
      value
    }) => `${value} ${key}%`).join(", ");
    return `linear-gradient(${direction}, ${sortedGradients})`;
  }
  return `linear-gradient(${direction}, ${from2}, ${to})`;
};
var gradientIdSeed = 0;
var NZ_CONFIG_MODULE_NAME2 = "progress";
var statusIconNameMap = /* @__PURE__ */ new Map([["success", "check"], ["exception", "close"]]);
var statusColorMap = /* @__PURE__ */ new Map([["normal", "#108ee9"], ["exception", "#ff5500"], ["success", "#87d068"]]);
var defaultFormatter = (p) => `${p}%`;
var NzProgressComponent = (() => {
  var _a;
  let _nzShowInfo_decorators;
  let _nzShowInfo_initializers = [];
  let _nzShowInfo_extraInitializers = [];
  let _nzStrokeColor_decorators;
  let _nzStrokeColor_initializers = [];
  let _nzStrokeColor_extraInitializers = [];
  let _nzSize_decorators;
  let _nzSize_initializers = [];
  let _nzSize_extraInitializers = [];
  let _nzStrokeWidth_decorators;
  let _nzStrokeWidth_initializers = [];
  let _nzStrokeWidth_extraInitializers = [];
  let _nzGapDegree_decorators;
  let _nzGapDegree_initializers = [];
  let _nzGapDegree_extraInitializers = [];
  let _nzGapPosition_decorators;
  let _nzGapPosition_initializers = [];
  let _nzGapPosition_extraInitializers = [];
  let _nzStrokeLinecap_decorators;
  let _nzStrokeLinecap_initializers = [];
  let _nzStrokeLinecap_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME2);
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "directionality", inject(Directionality));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "nzShowInfo", __runInitializers(this, _nzShowInfo_initializers, true));
      __publicField(this, "nzWidth", (__runInitializers(this, _nzShowInfo_extraInitializers), 132));
      __publicField(this, "nzStrokeColor", __runInitializers(this, _nzStrokeColor_initializers, void 0));
      __publicField(this, "nzSize", (__runInitializers(this, _nzStrokeColor_extraInitializers), __runInitializers(this, _nzSize_initializers, "default")));
      __publicField(this, "nzFormat", __runInitializers(this, _nzSize_extraInitializers));
      __publicField(this, "nzSuccessPercent");
      __publicField(this, "nzPercent", 0);
      __publicField(this, "nzStrokeWidth", __runInitializers(this, _nzStrokeWidth_initializers, void 0));
      __publicField(this, "nzGapDegree", (__runInitializers(this, _nzStrokeWidth_extraInitializers), __runInitializers(this, _nzGapDegree_initializers, void 0)));
      __publicField(this, "nzStatus", __runInitializers(this, _nzGapDegree_extraInitializers));
      __publicField(this, "nzType", "line");
      __publicField(this, "nzGapPosition", __runInitializers(this, _nzGapPosition_initializers, "top"));
      __publicField(this, "nzStrokeLinecap", (__runInitializers(this, _nzGapPosition_extraInitializers), __runInitializers(this, _nzStrokeLinecap_initializers, "round")));
      __publicField(this, "nzSteps", (__runInitializers(this, _nzStrokeLinecap_extraInitializers), 0));
      __publicField(this, "steps", []);
      /** Gradient style when `nzType` is `line`. */
      __publicField(this, "lineGradient", null);
      /** If user uses gradient color. */
      __publicField(this, "isGradient", false);
      /** If the linear progress is a step progress. */
      __publicField(this, "isSteps", false);
      /**
       * Each progress whose `nzType` is circle or dashboard should have unique id to
       * define `<linearGradient>`.
       */
      __publicField(this, "gradientId", gradientIdSeed++);
      /** Paths to rendered in the template. */
      __publicField(this, "progressCirclePath", []);
      __publicField(this, "circleGradient");
      __publicField(this, "trailPathStyle", null);
      __publicField(this, "pathString");
      __publicField(this, "icon");
      __publicField(this, "dir", "ltr");
      __publicField(this, "cachedStatus", "normal");
      __publicField(this, "inferredStatus", "normal");
      onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME2, () => {
        this.updateIcon();
        this.setStrokeColor();
        this.getCirclePaths();
      });
    }
    get formatter() {
      return this.nzFormat || defaultFormatter;
    }
    get status() {
      return this.nzStatus || this.inferredStatus;
    }
    get strokeWidth() {
      return this.nzStrokeWidth || (this.nzType === "line" && this.nzSize !== "small" ? 8 : 6);
    }
    get isCircleStyle() {
      return this.nzType === "circle" || this.nzType === "dashboard";
    }
    ngOnChanges(changes) {
      const {
        nzSteps,
        nzGapPosition,
        nzStrokeLinecap,
        nzStrokeColor,
        nzGapDegree,
        nzType,
        nzStatus,
        nzPercent,
        nzSuccessPercent,
        nzStrokeWidth
      } = changes;
      if (nzStatus) {
        this.cachedStatus = this.nzStatus || this.cachedStatus;
      }
      if (nzPercent || nzSuccessPercent) {
        const fillAll = parseInt(this.nzPercent.toString(), 10) >= 100;
        if (fillAll) {
          if (isNotNil(this.nzSuccessPercent) && this.nzSuccessPercent >= 100 || this.nzSuccessPercent === void 0) {
            this.inferredStatus = "success";
          }
        } else {
          this.inferredStatus = this.cachedStatus;
        }
      }
      if (nzStatus || nzPercent || nzSuccessPercent || nzStrokeColor) {
        this.updateIcon();
      }
      if (nzStrokeColor) {
        this.setStrokeColor();
      }
      if (nzGapPosition || nzStrokeLinecap || nzGapDegree || nzType || nzPercent || nzStrokeColor || nzStrokeColor) {
        this.getCirclePaths();
      }
      if (nzPercent || nzSteps || nzStrokeWidth) {
        this.isSteps = this.nzSteps > 0;
        if (this.isSteps) {
          this.getSteps();
        }
      }
    }
    ngOnInit() {
      var _a2;
      (_a2 = this.directionality.change) == null ? void 0 : _a2.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
      this.dir = this.directionality.value;
    }
    updateIcon() {
      const ret = statusIconNameMap.get(this.status);
      this.icon = ret ? ret + (this.isCircleStyle ? "-o" : "-circle-fill") : "";
    }
    /**
     * Calculate step render configs.
     */
    getSteps() {
      const current = Math.floor(this.nzSteps * (this.nzPercent / 100));
      const stepWidth = this.nzSize === "small" ? 2 : 14;
      const steps = [];
      for (let i = 0; i < this.nzSteps; i++) {
        let color;
        if (i <= current - 1) {
          color = this.nzStrokeColor;
        }
        const stepStyle = {
          backgroundColor: `${color}`,
          width: `${stepWidth}px`,
          height: `${this.strokeWidth}px`
        };
        steps.push(stepStyle);
      }
      this.steps = steps;
    }
    /**
     * Calculate paths when the type is circle or dashboard.
     */
    getCirclePaths() {
      if (!this.isCircleStyle) {
        return;
      }
      const values = isNotNil(this.nzSuccessPercent) ? [this.nzSuccessPercent, this.nzPercent] : [this.nzPercent];
      const radius = 50 - this.strokeWidth / 2;
      const gapPosition = this.nzGapPosition || (this.nzType === "circle" ? "top" : "bottom");
      const len = Math.PI * 2 * radius;
      const gapDegree = this.nzGapDegree || (this.nzType === "circle" ? 0 : 75);
      let beginPositionX = 0;
      let beginPositionY = -radius;
      let endPositionX = 0;
      let endPositionY = radius * -2;
      switch (gapPosition) {
        case "left":
          beginPositionX = -radius;
          beginPositionY = 0;
          endPositionX = radius * 2;
          endPositionY = 0;
          break;
        case "right":
          beginPositionX = radius;
          beginPositionY = 0;
          endPositionX = radius * -2;
          endPositionY = 0;
          break;
        case "bottom":
          beginPositionY = radius;
          endPositionY = radius * 2;
          break;
        default:
      }
      this.pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
       a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
       a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
      this.trailPathStyle = {
        strokeDasharray: `${len - gapDegree}px ${len}px`,
        strokeDashoffset: `-${gapDegree / 2}px`,
        transition: "stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s"
      };
      this.progressCirclePath = values.map((value, index) => {
        const isSuccessPercent = values.length === 2 && index === 0;
        return {
          stroke: this.isGradient && !isSuccessPercent ? `url(#gradient-${this.gradientId})` : null,
          strokePathStyle: {
            stroke: !this.isGradient ? isSuccessPercent ? statusColorMap.get("success") : this.nzStrokeColor : null,
            transition: "stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s",
            strokeDasharray: `${(value || 0) / 100 * (len - gapDegree)}px ${len}px`,
            strokeDashoffset: `-${gapDegree / 2}px`
          }
        };
      }).reverse();
    }
    setStrokeColor() {
      const color = this.nzStrokeColor;
      const isGradient = this.isGradient = !!color && typeof color !== "string";
      if (isGradient && !this.isCircleStyle) {
        this.lineGradient = handleLinearGradient(color);
      } else if (isGradient && this.isCircleStyle) {
        this.circleGradient = handleCircleGradient(this.nzStrokeColor);
      } else {
        this.lineGradient = null;
        this.circleGradient = [];
      }
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzShowInfo_decorators = [WithConfig()];
    _nzStrokeColor_decorators = [WithConfig()];
    _nzSize_decorators = [WithConfig()];
    _nzStrokeWidth_decorators = [WithConfig()];
    _nzGapDegree_decorators = [WithConfig()];
    _nzGapPosition_decorators = [WithConfig()];
    _nzStrokeLinecap_decorators = [WithConfig()];
    __esDecorate(null, null, _nzShowInfo_decorators, {
      kind: "field",
      name: "nzShowInfo",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzShowInfo" in obj,
        get: (obj) => obj.nzShowInfo,
        set: (obj, value) => {
          obj.nzShowInfo = value;
        }
      },
      metadata: _metadata
    }, _nzShowInfo_initializers, _nzShowInfo_extraInitializers);
    __esDecorate(null, null, _nzStrokeColor_decorators, {
      kind: "field",
      name: "nzStrokeColor",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzStrokeColor" in obj,
        get: (obj) => obj.nzStrokeColor,
        set: (obj, value) => {
          obj.nzStrokeColor = value;
        }
      },
      metadata: _metadata
    }, _nzStrokeColor_initializers, _nzStrokeColor_extraInitializers);
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
    __esDecorate(null, null, _nzStrokeWidth_decorators, {
      kind: "field",
      name: "nzStrokeWidth",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzStrokeWidth" in obj,
        get: (obj) => obj.nzStrokeWidth,
        set: (obj, value) => {
          obj.nzStrokeWidth = value;
        }
      },
      metadata: _metadata
    }, _nzStrokeWidth_initializers, _nzStrokeWidth_extraInitializers);
    __esDecorate(null, null, _nzGapDegree_decorators, {
      kind: "field",
      name: "nzGapDegree",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzGapDegree" in obj,
        get: (obj) => obj.nzGapDegree,
        set: (obj, value) => {
          obj.nzGapDegree = value;
        }
      },
      metadata: _metadata
    }, _nzGapDegree_initializers, _nzGapDegree_extraInitializers);
    __esDecorate(null, null, _nzGapPosition_decorators, {
      kind: "field",
      name: "nzGapPosition",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzGapPosition" in obj,
        get: (obj) => obj.nzGapPosition,
        set: (obj, value) => {
          obj.nzGapPosition = value;
        }
      },
      metadata: _metadata
    }, _nzGapPosition_initializers, _nzGapPosition_extraInitializers);
    __esDecorate(null, null, _nzStrokeLinecap_decorators, {
      kind: "field",
      name: "nzStrokeLinecap",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzStrokeLinecap" in obj,
        get: (obj) => obj.nzStrokeLinecap,
        set: (obj, value) => {
          obj.nzStrokeLinecap = value;
        }
      },
      metadata: _metadata
    }, _nzStrokeLinecap_initializers, _nzStrokeLinecap_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzProgressComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-progress"]],
    inputs: {
      nzShowInfo: "nzShowInfo",
      nzWidth: "nzWidth",
      nzStrokeColor: "nzStrokeColor",
      nzSize: "nzSize",
      nzFormat: "nzFormat",
      nzSuccessPercent: [2, "nzSuccessPercent", "nzSuccessPercent", numberAttributeWithZeroFallback],
      nzPercent: [2, "nzPercent", "nzPercent", numberAttribute],
      nzStrokeWidth: [2, "nzStrokeWidth", "nzStrokeWidth", numberAttributeWithZeroFallback],
      nzGapDegree: [2, "nzGapDegree", "nzGapDegree", numberAttributeWithZeroFallback],
      nzStatus: "nzStatus",
      nzType: "nzType",
      nzGapPosition: "nzGapPosition",
      nzStrokeLinecap: "nzStrokeLinecap",
      nzSteps: [2, "nzSteps", "nzSteps", numberAttribute]
    },
    exportAs: ["nzProgress"],
    features: [\u0275\u0275NgOnChangesFeature],
    decls: 5,
    vars: 18,
    consts: [["progressInfoTemplate", ""], [1, "ant-progress-inner", 3, "width", "height", "fontSize", "ant-progress-circle-gradient"], [1, "ant-progress-text"], [3, "nzType"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [1, "ant-progress-steps-outer"], [1, "ant-progress-steps-item", 3, "style"], [3, "ngTemplateOutlet"], [1, "ant-progress-steps-item"], [1, "ant-progress-outer"], [1, "ant-progress-inner"], [1, "ant-progress-bg"], [1, "ant-progress-success-bg", 3, "width", "border-radius", "height"], [1, "ant-progress-success-bg"], ["viewBox", "0 0 100 100", 1, "ant-progress-circle"], ["stroke", "#f3f3f3", "fill-opacity", "0", 1, "ant-progress-circle-trail"], ["fill-opacity", "0", 1, "ant-progress-circle-path", 3, "style"], ["x1", "100%", "y1", "0%", "x2", "0%", "y2", "0%", 3, "id"], ["fill-opacity", "0", 1, "ant-progress-circle-path"]],
    template: function NzProgressComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, NzProgressComponent_ng_template_0_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(2, "div");
        \u0275\u0275conditionalCreate(3, NzProgressComponent_Conditional_3_Template, 3, 1, "div");
        \u0275\u0275conditionalCreate(4, NzProgressComponent_Conditional_4_Template, 7, 14, "div", 1);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275classMap("ant-progress ant-progress-status-" + ctx.status);
        \u0275\u0275classProp("ant-progress-line", ctx.nzType === "line")("ant-progress-small", ctx.nzSize === "small")("ant-progress-default", ctx.nzSize === "default")("ant-progress-show-info", ctx.nzShowInfo)("ant-progress-circle", ctx.isCircleStyle)("ant-progress-steps", ctx.isSteps)("ant-progress-rtl", ctx.dir === "rtl");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.nzType === "line" ? 3 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isCircleStyle ? 4 : -1);
      }
    },
    dependencies: [NzIconModule, NzIconDirective, NzOutletModule, NzStringTemplateOutletDirective, NgTemplateOutlet],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzProgressComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-progress",
      exportAs: "nzProgress",
      imports: [NzIconModule, NzOutletModule, NgTemplateOutlet],
      template: `
    <ng-template #progressInfoTemplate>
      @if (nzShowInfo) {
        <span class="ant-progress-text">
          @if ((status === 'exception' || status === 'success') && !nzFormat) {
            <nz-icon [nzType]="icon" />
          } @else {
            <ng-container *nzStringTemplateOutlet="formatter; context: { $implicit: nzPercent }; let formatter">
              {{ formatter(nzPercent) }}
            </ng-container>
          }
        </span>
      }
    </ng-template>

    <div
      [class]="'ant-progress ant-progress-status-' + status"
      [class.ant-progress-line]="nzType === 'line'"
      [class.ant-progress-small]="nzSize === 'small'"
      [class.ant-progress-default]="nzSize === 'default'"
      [class.ant-progress-show-info]="nzShowInfo"
      [class.ant-progress-circle]="isCircleStyle"
      [class.ant-progress-steps]="isSteps"
      [class.ant-progress-rtl]="dir === 'rtl'"
    >
      @if (nzType === 'line') {
        <div>
          <!-- normal line style -->
          @if (isSteps) {
            <div class="ant-progress-steps-outer">
              @for (step of steps; track $index) {
                <div class="ant-progress-steps-item" [style]="step"></div>
              }
              <ng-template [ngTemplateOutlet]="progressInfoTemplate" />
            </div>
          } @else {
            <div class="ant-progress-outer">
              <div class="ant-progress-inner">
                <div
                  class="ant-progress-bg"
                  [style.width.%]="nzPercent"
                  [style.border-radius]="nzStrokeLinecap === 'round' ? '100px' : '0'"
                  [style.background]="!isGradient ? nzStrokeColor : null"
                  [style.background-image]="isGradient ? lineGradient : null"
                  [style.height.px]="strokeWidth"
                ></div>
                @if (nzSuccessPercent || nzSuccessPercent === 0) {
                  <div
                    class="ant-progress-success-bg"
                    [style.width.%]="nzSuccessPercent"
                    [style.border-radius]="nzStrokeLinecap === 'round' ? '100px' : '0'"
                    [style.height.px]="strokeWidth"
                  ></div>
                }
              </div>
            </div>
            <ng-template [ngTemplateOutlet]="progressInfoTemplate" />
          }
        </div>
      }
      <!-- line progress -->

      <!-- circle / dashboard progress -->

      @if (isCircleStyle) {
        <div
          [style.width.px]="this.nzWidth"
          [style.height.px]="this.nzWidth"
          [style.fontSize.px]="this.nzWidth * 0.15 + 6"
          class="ant-progress-inner"
          [class.ant-progress-circle-gradient]="isGradient"
        >
          <svg class="ant-progress-circle " viewBox="0 0 100 100">
            @if (isGradient) {
              <defs>
                <linearGradient [id]="'gradient-' + gradientId" x1="100%" y1="0%" x2="0%" y2="0%">
                  @for (i of circleGradient; track $index) {
                    <stop [attr.offset]="i.offset" [attr.stop-color]="i.color" />
                  }
                </linearGradient>
              </defs>
            }

            <path
              class="ant-progress-circle-trail"
              stroke="#f3f3f3"
              fill-opacity="0"
              [attr.stroke-width]="strokeWidth"
              [attr.d]="pathString"
              [style]="trailPathStyle"
            />
            @for (p of progressCirclePath; track $index) {
              <path
                class="ant-progress-circle-path"
                fill-opacity="0"
                [attr.d]="pathString"
                [attr.stroke-linecap]="nzStrokeLinecap"
                [attr.stroke]="p.stroke"
                [attr.stroke-width]="nzPercent ? strokeWidth : 0"
                [style]="p.strokePathStyle"
              />
            }
          </svg>
          <ng-template [ngTemplateOutlet]="progressInfoTemplate" />
        </div>
      }
    </div>
  `
    }]
  }], () => [], {
    nzShowInfo: [{
      type: Input
    }],
    nzWidth: [{
      type: Input
    }],
    nzStrokeColor: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzFormat: [{
      type: Input
    }],
    nzSuccessPercent: [{
      type: Input,
      args: [{
        transform: numberAttributeWithZeroFallback
      }]
    }],
    nzPercent: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzStrokeWidth: [{
      type: Input,
      args: [{
        transform: numberAttributeWithZeroFallback
      }]
    }],
    nzGapDegree: [{
      type: Input,
      args: [{
        transform: numberAttributeWithZeroFallback
      }]
    }],
    nzStatus: [{
      type: Input
    }],
    nzType: [{
      type: Input
    }],
    nzGapPosition: [{
      type: Input
    }],
    nzStrokeLinecap: [{
      type: Input
    }],
    nzSteps: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }]
  });
})();
var _NzProgressModule = class _NzProgressModule {
};
__publicField(_NzProgressModule, "\u0275fac", function NzProgressModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzProgressModule)();
});
__publicField(_NzProgressModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzProgressModule,
  imports: [NzProgressComponent],
  exports: [NzProgressComponent]
}));
__publicField(_NzProgressModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzProgressComponent]
}));
var NzProgressModule = _NzProgressModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzProgressModule, [{
    type: NgModule,
    args: [{
      imports: [NzProgressComponent],
      exports: [NzProgressComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-timeline.mjs
var _c05 = ["template"];
var _c13 = ["*"];
function NzTimelineItemComponent_ng_template_0_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzLabel);
  }
}
function NzTimelineItemComponent_ng_template_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275template(1, NzTimelineItemComponent_ng_template_0_Conditional_1_ng_container_1_Template, 2, 1, "ng-container", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzLabel);
  }
}
function NzTimelineItemComponent_ng_template_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzDot);
  }
}
function NzTimelineItemComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 1);
    \u0275\u0275conditionalCreate(1, NzTimelineItemComponent_ng_template_0_Conditional_1_Template, 2, 1, "div", 2);
    \u0275\u0275element(2, "div", 3);
    \u0275\u0275elementStart(3, "div", 4);
    \u0275\u0275template(4, NzTimelineItemComponent_ng_template_0_ng_container_4_Template, 2, 1, "ng-container", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 6);
    \u0275\u0275projection(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("ant-timeline-item-right", (ctx_r0.nzPosition || ctx_r0.position) === "right")("ant-timeline-item-left", (ctx_r0.nzPosition || ctx_r0.position) === "left")("ant-timeline-item-last", ctx_r0.isLast);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzLabel ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("border-color", ctx_r0.borderColor);
    \u0275\u0275classProp("ant-timeline-item-head-red", ctx_r0.nzColor === "red")("ant-timeline-item-head-blue", ctx_r0.nzColor === "blue")("ant-timeline-item-head-green", ctx_r0.nzColor === "green")("ant-timeline-item-head-gray", ctx_r0.nzColor === "gray")("ant-timeline-item-head-custom", !!ctx_r0.nzDot);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzDot);
  }
}
function NzTimelineComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 2);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const pendingTemplate_r1 = \u0275\u0275reference(6);
    \u0275\u0275property("ngTemplateOutlet", pendingTemplate_r1);
  }
}
function NzTimelineComponent_For_3_ng_template_0_Template(rf, ctx) {
}
function NzTimelineComponent_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTimelineComponent_For_3_ng_template_0_Template, 0, 0, "ng-template", 2);
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275property("ngTemplateOutlet", item_r2.template);
  }
}
function NzTimelineComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 2);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const pendingTemplate_r1 = \u0275\u0275reference(6);
    \u0275\u0275property("ngTemplateOutlet", pendingTemplate_r1);
  }
}
function NzTimelineComponent_ng_template_5_Conditional_0_ng_container_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 8);
  }
}
function NzTimelineComponent_ng_template_5_Conditional_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275conditionalCreate(2, NzTimelineComponent_ng_template_5_Conditional_0_ng_container_3_Conditional_2_Template, 1, 0, "nz-icon", 8);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.nzPendingDot, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.nzPendingDot ? 2 : -1);
  }
}
function NzTimelineComponent_ng_template_5_Conditional_0_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isPendingBoolean ? "" : ctx_r2.nzPending, " ");
  }
}
function NzTimelineComponent_ng_template_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 3);
    \u0275\u0275element(1, "div", 4);
    \u0275\u0275elementStart(2, "div", 5);
    \u0275\u0275template(3, NzTimelineComponent_ng_template_5_Conditional_0_ng_container_3_Template, 3, 2, "ng-container", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 7);
    \u0275\u0275template(5, NzTimelineComponent_ng_template_5_Conditional_0_ng_container_5_Template, 2, 1, "ng-container", 6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r2.nzPendingDot);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r2.nzPending);
  }
}
function NzTimelineComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTimelineComponent_ng_template_5_Conditional_0_Template, 6, 2, "li", 3);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.nzPending ? 0 : -1);
  }
}
var _TimelineService = class _TimelineService {
  constructor() {
    __publicField(this, "check$", new ReplaySubject(1));
  }
  markForCheck() {
    this.check$.next();
  }
};
__publicField(_TimelineService, "\u0275fac", function TimelineService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TimelineService)();
});
__publicField(_TimelineService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _TimelineService,
  factory: _TimelineService.\u0275fac
}));
var TimelineService = _TimelineService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimelineService, [{
    type: Injectable
  }], null, null);
})();
var TimelineTimeDefaultColors = ["red", "blue", "green", "grey", "gray"];
function isDefaultColor(color) {
  return TimelineTimeDefaultColors.findIndex((i) => i === color) !== -1;
}
var _NzTimelineItemComponent = class _NzTimelineItemComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "timelineService", inject(TimelineService));
    __publicField(this, "template");
    __publicField(this, "nzPosition");
    __publicField(this, "nzColor", "blue");
    __publicField(this, "nzDot");
    __publicField(this, "nzLabel");
    __publicField(this, "isLast", false);
    __publicField(this, "borderColor", null);
    __publicField(this, "position");
  }
  ngOnChanges(changes) {
    this.timelineService.markForCheck();
    const {
      nzColor
    } = changes;
    if (nzColor) {
      this.updateCustomColor();
    }
  }
  detectChanges() {
    this.cdr.detectChanges();
  }
  updateCustomColor() {
    this.borderColor = isDefaultColor(this.nzColor) ? null : this.nzColor;
  }
};
__publicField(_NzTimelineItemComponent, "\u0275fac", function NzTimelineItemComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTimelineItemComponent)();
});
__publicField(_NzTimelineItemComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTimelineItemComponent,
  selectors: [["nz-timeline-item"], ["", "nz-timeline-item", ""]],
  viewQuery: function NzTimelineItemComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c05, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.template = _t.first);
    }
  },
  inputs: {
    nzPosition: "nzPosition",
    nzColor: "nzColor",
    nzDot: "nzDot",
    nzLabel: "nzLabel"
  },
  exportAs: ["nzTimelineItem"],
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c13,
  decls: 2,
  vars: 0,
  consts: [["template", ""], [1, "ant-timeline-item"], [1, "ant-timeline-item-label"], [1, "ant-timeline-item-tail"], [1, "ant-timeline-item-head"], [4, "nzStringTemplateOutlet"], [1, "ant-timeline-item-content"]],
  template: function NzTimelineItemComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275template(0, NzTimelineItemComponent_ng_template_0_Template, 7, 20, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTimelineItemComponent = _NzTimelineItemComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTimelineItemComponent, [{
    type: Component,
    args: [{
      selector: "nz-timeline-item, [nz-timeline-item]",
      exportAs: "nzTimelineItem",
      template: `
    <ng-template #template>
      <li
        class="ant-timeline-item"
        [class.ant-timeline-item-right]="(nzPosition || position) === 'right'"
        [class.ant-timeline-item-left]="(nzPosition || position) === 'left'"
        [class.ant-timeline-item-last]="isLast"
      >
        @if (nzLabel) {
          <div class="ant-timeline-item-label">
            <ng-container *nzStringTemplateOutlet="nzLabel">{{ nzLabel }}</ng-container>
          </div>
        }
        <div class="ant-timeline-item-tail"></div>
        <div
          class="ant-timeline-item-head"
          [class.ant-timeline-item-head-red]="nzColor === 'red'"
          [class.ant-timeline-item-head-blue]="nzColor === 'blue'"
          [class.ant-timeline-item-head-green]="nzColor === 'green'"
          [class.ant-timeline-item-head-gray]="nzColor === 'gray'"
          [class.ant-timeline-item-head-custom]="!!nzDot"
          [style.border-color]="borderColor"
        >
          <ng-container *nzStringTemplateOutlet="nzDot">{{ nzDot }}</ng-container>
        </div>
        <div class="ant-timeline-item-content">
          <ng-content />
        </div>
      </li>
    </ng-template>
  `,
      imports: [NzOutletModule],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], null, {
    template: [{
      type: ViewChild,
      args: ["template", {
        static: false
      }]
    }],
    nzPosition: [{
      type: Input
    }],
    nzColor: [{
      type: Input
    }],
    nzDot: [{
      type: Input
    }],
    nzLabel: [{
      type: Input
    }]
  });
})();
var _NzTimelineComponent = class _NzTimelineComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "timelineService", inject(TimelineService));
    __publicField(this, "directionality", inject(Directionality));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "listOfItems");
    __publicField(this, "nzMode", "left");
    __publicField(this, "nzPending");
    __publicField(this, "nzPendingDot");
    __publicField(this, "nzReverse", false);
    __publicField(this, "isPendingBoolean", false);
    __publicField(this, "timelineItems", []);
    __publicField(this, "dir", "ltr");
    __publicField(this, "hasLabelItem", false);
  }
  ngOnChanges(changes) {
    const {
      nzMode,
      nzReverse,
      nzPending
    } = changes;
    if (simpleChangeActivated(nzMode) || simpleChangeActivated(nzReverse)) {
      this.updateChildren();
    }
    if (nzPending) {
      this.isPendingBoolean = nzPending.currentValue === true;
    }
  }
  ngOnInit() {
    var _a;
    this.timelineService.check$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.cdr.markForCheck();
    });
    (_a = this.directionality.change) == null ? void 0 : _a.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
  }
  ngAfterContentInit() {
    this.updateChildren();
    this.listOfItems.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.updateChildren();
    });
  }
  updateChildren() {
    if (this.listOfItems && this.listOfItems.length) {
      const length = this.listOfItems.length;
      let hasLabelItem = false;
      this.listOfItems.forEach((item, index) => {
        item.isLast = !this.nzReverse ? index === length - 1 : index === 0;
        item.position = getInferredTimelineItemPosition(index, this.nzMode);
        if (!hasLabelItem && item.nzLabel) {
          hasLabelItem = true;
        }
        item.detectChanges();
      });
      this.timelineItems = this.nzReverse ? this.listOfItems.toArray().reverse() : this.listOfItems.toArray();
      this.hasLabelItem = hasLabelItem;
    } else {
      this.timelineItems = [];
      this.hasLabelItem = false;
    }
    this.cdr.markForCheck();
  }
};
__publicField(_NzTimelineComponent, "\u0275fac", function NzTimelineComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTimelineComponent)();
});
__publicField(_NzTimelineComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTimelineComponent,
  selectors: [["nz-timeline"]],
  contentQueries: function NzTimelineComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzTimelineItemComponent, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfItems = _t);
    }
  },
  inputs: {
    nzMode: "nzMode",
    nzPending: "nzPending",
    nzPendingDot: "nzPendingDot",
    nzReverse: [2, "nzReverse", "nzReverse", booleanAttribute]
  },
  exportAs: ["nzTimeline"],
  features: [\u0275\u0275ProvidersFeature([TimelineService]), \u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c13,
  decls: 8,
  vars: 14,
  consts: [["pendingTemplate", ""], [1, "ant-timeline"], [3, "ngTemplateOutlet"], [1, "ant-timeline-item", "ant-timeline-item-pending"], [1, "ant-timeline-item-tail"], [1, "ant-timeline-item-head", "ant-timeline-item-head-custom", "ant-timeline-item-head-blue"], [4, "nzStringTemplateOutlet"], [1, "ant-timeline-item-content"], ["nzType", "loading"]],
  template: function NzTimelineComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "ul", 1);
      \u0275\u0275conditionalCreate(1, NzTimelineComponent_Conditional_1_Template, 1, 1, "ng-container", 2);
      \u0275\u0275repeaterCreate(2, NzTimelineComponent_For_3_Template, 1, 1, null, 2, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275conditionalCreate(4, NzTimelineComponent_Conditional_4_Template, 1, 1, "ng-container", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275template(5, NzTimelineComponent_ng_template_5_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275projection(7);
    }
    if (rf & 2) {
      \u0275\u0275classProp("ant-timeline-label", ctx.hasLabelItem)("ant-timeline-right", !ctx.hasLabelItem && ctx.nzMode === "right")("ant-timeline-alternate", ctx.nzMode === "alternate" || ctx.nzMode === "custom")("ant-timeline-pending", !!ctx.nzPending)("ant-timeline-reverse", ctx.nzReverse)("ant-timeline-rtl", ctx.dir === "rtl");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzReverse ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.timelineItems);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.nzReverse ? 4 : -1);
    }
  },
  dependencies: [NgTemplateOutlet, NzOutletModule, NzStringTemplateOutletDirective, NzIconModule, NzIconDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTimelineComponent = _NzTimelineComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTimelineComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-timeline",
      providers: [TimelineService],
      exportAs: "nzTimeline",
      template: `
    <ul
      class="ant-timeline"
      [class.ant-timeline-label]="hasLabelItem"
      [class.ant-timeline-right]="!hasLabelItem && nzMode === 'right'"
      [class.ant-timeline-alternate]="nzMode === 'alternate' || nzMode === 'custom'"
      [class.ant-timeline-pending]="!!nzPending"
      [class.ant-timeline-reverse]="nzReverse"
      [class.ant-timeline-rtl]="dir === 'rtl'"
    >
      <!-- pending dot (reversed) -->
      @if (nzReverse) {
        <ng-container [ngTemplateOutlet]="pendingTemplate" />
      }
      <!-- timeline items -->
      @for (item of timelineItems; track item) {
        <ng-template [ngTemplateOutlet]="item.template" />
      }
      @if (!nzReverse) {
        <ng-container [ngTemplateOutlet]="pendingTemplate" />
      }
      <!-- pending dot -->
    </ul>
    <ng-template #pendingTemplate>
      @if (nzPending) {
        <li class="ant-timeline-item ant-timeline-item-pending">
          <div class="ant-timeline-item-tail"></div>
          <div class="ant-timeline-item-head ant-timeline-item-head-custom ant-timeline-item-head-blue">
            <ng-container *nzStringTemplateOutlet="nzPendingDot">
              {{ nzPendingDot }}
              @if (!nzPendingDot) {
                <nz-icon nzType="loading" />
              }
            </ng-container>
          </div>
          <div class="ant-timeline-item-content">
            <ng-container *nzStringTemplateOutlet="nzPending">
              {{ isPendingBoolean ? '' : nzPending }}
            </ng-container>
          </div>
        </li>
      }
    </ng-template>
    <!-- Grasp items -->
    <ng-content />
  `,
      imports: [NgTemplateOutlet, NzOutletModule, NzIconModule]
    }]
  }], null, {
    listOfItems: [{
      type: ContentChildren,
      args: [NzTimelineItemComponent]
    }],
    nzMode: [{
      type: Input
    }],
    nzPending: [{
      type: Input
    }],
    nzPendingDot: [{
      type: Input
    }],
    nzReverse: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
function simpleChangeActivated(simpleChange) {
  return !!(simpleChange && (simpleChange.previousValue !== simpleChange.currentValue || simpleChange.isFirstChange()));
}
function getInferredTimelineItemPosition(index, mode) {
  if (mode === "custom") {
    return void 0;
  } else if (mode === "left" || mode === "right") {
    return mode;
  } else {
    return mode === "alternate" && index % 2 === 0 ? "left" : "right";
  }
}
var _NzTimelineModule = class _NzTimelineModule {
};
__publicField(_NzTimelineModule, "\u0275fac", function NzTimelineModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTimelineModule)();
});
__publicField(_NzTimelineModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzTimelineModule,
  imports: [NzTimelineItemComponent, NzTimelineComponent],
  exports: [NzTimelineItemComponent, NzTimelineComponent]
}));
__publicField(_NzTimelineModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzTimelineItemComponent, NzTimelineComponent]
}));
var NzTimelineModule = _NzTimelineModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTimelineModule, [{
    type: NgModule,
    args: [{
      imports: [NzTimelineItemComponent, NzTimelineComponent],
      exports: [NzTimelineItemComponent, NzTimelineComponent]
    }]
  }], null, null);
})();

// projects/tot/cqrs-dashboard/src/lib/services/dashboard.service.ts
var _DashboardService = class _DashboardService {
  constructor() {
    this.http = inject(HttpClientService);
  }
  getStats() {
    return from(this.http.get("/api/cqrs/dashboard/stats"));
  }
  getQueues() {
    return from(this.http.get("/api/cqrs/dashboard/queues"));
  }
  getMessages(queueName, page = 1, pageSize = 10) {
    return from(this.http.get(`/api/cqrs/dashboard/messages/${queueName}?page=${page}&pageSize=${pageSize}`));
  }
  retryCommand(queueName, messageJson) {
    return from(this.http.post("/api/cqrs/dashboard/retry", { queueName, messageJson }));
  }
  pushMessage(queueName, messageJson) {
    return from(this.http.post("/api/cqrs/dashboard/push", { queueName, messageJson }));
  }
  removeFromDeadLetter(queueName, messageJson) {
    return from(this.http.delete(`/api/cqrs/dashboard/dead-letter/${queueName}?messageJson=${encodeURIComponent(messageJson)}`));
  }
  getTracking(trackingId) {
    return from(this.http.get(`/api/cqrs/dashboard/tracking/${trackingId}`));
  }
  getRecentTracking(params) {
    const query = Object.keys(params).filter((k) => params[k] !== null && params[k] !== void 0 && params[k] !== "").map((k) => `${k}=${encodeURIComponent(params[k])}`).join("&");
    return from(this.http.get(`/api/cqrs/dashboard/tracking/recent?${query}`));
  }
  resendTracking(trackingId) {
    return from(this.http.post(`/api/cqrs/dashboard/tracking/${trackingId}/resend`, {}));
  }
  deleteTracking(trackingId) {
    return from(this.http.delete(`/api/cqrs/dashboard/tracking/${trackingId}`));
  }
  stopWorker(workerId) {
    return from(this.http.post(`/api/cqrs/dashboard/workers/${workerId}/stop`, {}));
  }
  startWorker(workerId) {
    return from(this.http.post(`/api/cqrs/dashboard/workers/${workerId}/start`, {}));
  }
  sendTestCommand(data, callback) {
    return from(this.http.post("/api/Test/cqrs/sample-command", { data }, callback));
  }
  sendTestEvent(data, callback) {
    return from(this.http.post("/api/Test/cqrs/sample-event", { data }, callback));
  }
  getLastActivity() {
    return from(this.http.get("/api/cqrs/dashboard/last-activity"));
  }
};
_DashboardService.\u0275fac = function DashboardService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardService)();
};
_DashboardService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardService, factory: _DashboardService.\u0275fac, providedIn: "root" });
var DashboardService = _DashboardService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// projects/tot/cqrs-dashboard/src/lib/message-list/message-list.component.ts
function MessageListComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const data_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, ctx_r1.getTime(data_r1), "yyyy-MM-dd HH:mm:ss"), " ");
  }
}
function MessageListComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275listener("click", function MessageListComponent_ng_template_3_Template_div_click_0_listener() {
      const data_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleExpand(data_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "slice");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind3(2, 2, data_r4.raw, 0, 100), "", data_r4.raw.length > 100 ? "..." : "", " ");
  }
}
function MessageListComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 9);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("nzColor", ctx_r1.getStatus(data_r5) === "error" ? "error" : ctx_r1.getStatus(data_r5) === "processing" ? "processing" : "default");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, ctx_r1.getStatus(data_r5)), " ");
  }
}
function MessageListComponent_ng_template_5_tot_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 15);
    \u0275\u0275listener("click", function MessageListComponent_ng_template_5_tot_button_1_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const data_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resend(data_r8));
    });
    \u0275\u0275element(1, "i", 16);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "G\u1EEDi l\u1EA1i"), " ");
  }
}
function MessageListComponent_ng_template_5_tot_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 17);
    \u0275\u0275listener("click", function MessageListComponent_ng_template_5_tot_button_2_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const data_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.delete(data_r8));
    });
    \u0275\u0275element(1, "i", 18);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("nzDanger", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 2, "X\xF3a"), " ");
  }
}
function MessageListComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275template(1, MessageListComponent_ng_template_5_tot_button_1_Template, 4, 3, "tot-button", 11)(2, MessageListComponent_ng_template_5_tot_button_2_Template, 4, 4, "tot-button", 12);
    \u0275\u0275elementStart(3, "tot-button", 13);
    \u0275\u0275listener("click", function MessageListComponent_ng_template_5_Template_tot_button_click_3_listener() {
      const data_r8 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleExpand(data_r8));
    });
    \u0275\u0275element(4, "i", 14);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "transloco");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.queueName.endsWith(":dead"));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.queueName.endsWith(":dead"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzType", data_r8.expand ? "up" : "down");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 4, "Chi ti\u1EBFt"), " ");
  }
}
function MessageListComponent_ng_template_6_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 34);
    \u0275\u0275element(2, "i", 35);
    \u0275\u0275text(3, " Error Details:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 36);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(data_r11.parsed._error);
  }
}
function MessageListComponent_ng_template_6_nz_timeline_21_nz_timeline_item_1_nz_tag_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("nzColor", step_r12.status.toLowerCase() === "success" ? "success" : "error");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", step_r12.status, " ");
  }
}
function MessageListComponent_ng_template_6_nz_timeline_21_nz_timeline_item_1_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 45);
    \u0275\u0275text(2, "Source:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "code", 46);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.shortenNamespace(step_r12.sourceComponent));
  }
}
function MessageListComponent_ng_template_6_nz_timeline_21_nz_timeline_item_1_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 45);
    \u0275\u0275text(2, "Handler:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "code", 47);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.shortenNamespace(step_r12.handlerOrEventName));
  }
}
function MessageListComponent_ng_template_6_nz_timeline_21_nz_timeline_item_1_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 45);
    \u0275\u0275text(2, "Worker:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "code", 48);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(step_r12.workerName);
  }
}
function MessageListComponent_ng_template_6_nz_timeline_21_nz_timeline_item_1_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275element(1, "i", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", step_r12.details);
  }
}
function MessageListComponent_ng_template_6_nz_timeline_21_nz_timeline_item_1_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(step_r12.details);
  }
}
function MessageListComponent_ng_template_6_nz_timeline_21_nz_timeline_item_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-timeline-item", 9)(1, "div", 38)(2, "span", 39);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "nz-tag", 9);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, MessageListComponent_ng_template_6_nz_timeline_21_nz_timeline_item_1_nz_tag_7_Template, 2, 2, "nz-tag", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 41);
    \u0275\u0275template(9, MessageListComponent_ng_template_6_nz_timeline_21_nz_timeline_item_1_div_9_Template, 5, 1, "div", 42)(10, MessageListComponent_ng_template_6_nz_timeline_21_nz_timeline_item_1_div_10_Template, 5, 1, "div", 42)(11, MessageListComponent_ng_template_6_nz_timeline_21_nz_timeline_item_1_div_11_Template, 5, 1, "div", 42)(12, MessageListComponent_ng_template_6_nz_timeline_21_nz_timeline_item_1_div_12_Template, 3, 1, "div", 43)(13, MessageListComponent_ng_template_6_nz_timeline_21_nz_timeline_item_1_div_13_Template, 2, 1, "div", 44);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r12 = ctx.$implicit;
    \u0275\u0275property("nzColor", (step_r12.status == null ? null : step_r12.status.toLowerCase()) === "error" ? "red" : (step_r12.status == null ? null : step_r12.status.toLowerCase()) === "success" ? "green" : "blue");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(4, 10, step_r12.timestamp || step_r12.time, "yyyy-MM-dd HH:mm:ss.SSS"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("nzColor", step_r12.step === "send" ? "blue" : step_r12.step === "dequeue" ? "orange" : step_r12.step === "done" ? "green" : "default");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", step_r12.step, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", step_r12.status);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", step_r12.sourceComponent);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", step_r12.handlerOrEventName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", step_r12.workerName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", step_r12.details && (step_r12.status == null ? null : step_r12.status.toLowerCase()) !== "error");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (step_r12.status == null ? null : step_r12.status.toLowerCase()) === "error");
  }
}
function MessageListComponent_ng_template_6_nz_timeline_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-timeline");
    \u0275\u0275template(1, MessageListComponent_ng_template_6_nz_timeline_21_nz_timeline_item_1_Template, 14, 13, "nz-timeline-item", 37);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", data_r11.history);
  }
}
function MessageListComponent_ng_template_6_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275element(1, "i", 53);
    \u0275\u0275elementStart(2, "p", 54);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "transloco");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 1, "\u0110ang t\u1EA3i l\u1ECBch s\u1EED chi ti\u1EBFt..."));
  }
}
function MessageListComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 20)(2, "div", 21)(3, "div", 22)(4, "span", 23);
    \u0275\u0275element(5, "i", 24);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "tot-button", 25);
    \u0275\u0275listener("click", function MessageListComponent_ng_template_6_Template_tot_button_click_8_listener() {
      const data_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.copyToClipboard(data_r11.raw));
    });
    \u0275\u0275element(9, "i", 26);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "transloco");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "pre", 27);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, MessageListComponent_ng_template_6_div_14_Template, 6, 1, "div", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 21)(16, "h4", 29);
    \u0275\u0275element(17, "i", 30);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 31);
    \u0275\u0275template(21, MessageListComponent_ng_template_6_nz_timeline_21_Template, 2, 1, "nz-timeline", 32)(22, MessageListComponent_ng_template_6_ng_template_22_Template, 5, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const data_r11 = ctx.$implicit;
    const loadingHistory_r13 = \u0275\u0275reference(23);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzGutter", 16);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 10);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 10, "D\u1EEF li\u1EC7u Tin nh\u1EAFn (Payload)"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(11, 12, "Sao ch\xE9p"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatJson(data_r11.parsed));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r11.parsed._error);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 14);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 14, "L\u1ECBch s\u1EED d\xF2ng th\u1EDDi gian s\u1EF1 ki\u1EC7n (Tracking)"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", data_r11.history && data_r11.history.length > 0)("ngIfElse", loadingHistory_r13);
  }
}
var _MessageListComponent = class _MessageListComponent {
  constructor() {
    this.dashboardService = inject(DashboardService);
    this.notification = inject(AppNotificationService);
    this.modal = inject(NzModalService);
    this.translate = inject(TranslocoService);
    this.modalData = inject(NZ_MODAL_DATA, { optional: true });
    this.queueName = "";
    this.messages = [];
    this.loading = false;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.total = 0;
    this.msgColumns = [];
  }
  ngOnInit() {
    var _a;
    this.msgColumns = [
      { title: "Th\u1EDDi gian", key: "time", width: "180px", left: "0px" },
      { title: "N\u1ED9i dung tin nh\u1EAFn", key: "content" },
      { title: "Tr\u1EA1ng th\xE1i", key: "status", width: "120px" },
      { title: "H\xE0nh \u0111\u1ED9ng", key: "action", width: "200px", right: "0px" }
    ];
    this.queueName = this.inputQueueName || ((_a = this.modalData) == null ? void 0 : _a.inputQueueName) || "";
    if (this.queueName) {
      this.loadMessages();
    }
  }
  loadMessages() {
    this.loading = true;
    this.dashboardService.getMessages(this.queueName, this.pageIndex, this.pageSize).subscribe({
      next: (res) => {
        this.messages = res.items.map((m) => {
          try {
            return {
              raw: m,
              parsed: JSON.parse(m),
              expand: false
            };
          } catch {
            return {
              raw: m,
              parsed: m,
              expand: false
            };
          }
        });
        this.total = res.total;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notification.error(this.translate.translate("L\u1ED7i"), this.translate.translate("Kh\xF4ng th\u1EC3 t\u1EA3i danh s\xE1ch tin nh\u1EAFn"));
      }
    });
  }
  onQueryParamsChange(params) {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadMessages();
  }
  formatJson(json) {
    return JSON.stringify(json, null, 2);
  }
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.notification.success(this.translate.translate("Th\xE0nh c\xF4ng"), this.translate.translate("\u0110\xE3 sao ch\xE9p v\xE0o b\u1ED9 nh\u1EDB t\u1EA1m"));
    });
  }
  resend(item) {
    this.modal.confirm({
      nzTitle: this.translate.translate("X\xE1c nh\u1EADn g\u1EEDi l\u1EA1i"),
      nzContent: this.translate.translate("B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n g\u1EEDi l\u1EA1i tin nh\u1EAFn n\xE0y v\xE0o h\xE0ng \u0111\u1EE3i g\u1ED1c?"),
      nzOnOk: () => {
        this.dashboardService.retryCommand(this.queueName, item.raw).subscribe(() => {
          this.notification.success(this.translate.translate("Th\xE0nh c\xF4ng"), this.translate.translate("Tin nh\u1EAFn \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi l\u1EA1i"));
          this.loadMessages();
        });
      }
    });
  }
  delete(item) {
    this.modal.confirm({
      nzTitle: this.translate.translate("X\xE1c nh\u1EADn x\xF3a"),
      nzContent: this.translate.translate("B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a tin nh\u1EAFn n\xE0y kh\u1ECFi h\xE0ng \u0111\u1EE3i?"),
      nzOnOk: () => {
        this.dashboardService.removeFromDeadLetter(this.queueName, item.raw).subscribe(() => {
          this.notification.success(this.translate.translate("Th\xE0nh c\xF4ng"), this.translate.translate("\u0110\xE3 x\xF3a tin nh\u1EAFn"));
          this.loadMessages();
        });
      }
    });
  }
  getStatus(item) {
    var _a;
    if ((_a = item.parsed) == null ? void 0 : _a._status)
      return item.parsed._status;
    if (this.queueName.endsWith(":dead"))
      return "error";
    if (this.queueName.endsWith(":processing"))
      return "processing";
    return "pending";
  }
  getTime(item) {
    var _a, _b, _c;
    if ((_a = item.parsed) == null ? void 0 : _a._failedAt)
      return item.parsed._failedAt;
    if ((_b = item.parsed) == null ? void 0 : _b.Timestamp)
      return item.parsed.Timestamp;
    if ((_c = item.parsed) == null ? void 0 : _c._timestamp)
      return item.parsed._timestamp;
    return "";
  }
  onRowExpand(event) {
    var _a;
    if (event.expanded && ((_a = event.item.parsed) == null ? void 0 : _a._trackingId) && (!event.item.history || event.item.history.length === 0)) {
      this.dashboardService.getTracking(event.item.parsed._trackingId).subscribe({
        next: (history) => {
          event.item.history = history;
        },
        error: () => {
          this.notification.error(this.translate.translate("L\u1ED7i"), this.translate.translate("Kh\xF4ng th\u1EC3 t\u1EA3i l\u1ECBch s\u1EED chi ti\u1EBFt cho ID n\xE0y"));
        }
      });
    }
  }
  toggleExpand(item) {
    item.expand = !item.expand;
    this.onRowExpand({ item, expanded: item.expand });
  }
  shortenNamespace(name) {
    if (!name)
      return "-";
    const parts = name.split(".");
    return parts[parts.length - 1];
  }
};
_MessageListComponent.\u0275fac = function MessageListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MessageListComponent)();
};
_MessageListComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MessageListComponent, selectors: [["app-message-list"]], inputs: { inputQueueName: "inputQueueName" }, decls: 8, vars: 8, consts: [["expandTpl", ""], ["loadingHistory", ""], [1, "message-list-container"], [3, "queryParamsChange", "expandChange", "data", "columns", "loading", "total", "pageIndex", "pageSize", "frontPagination", "expandTemplate"], ["totCell", "time"], ["totCell", "content"], ["totCell", "status"], ["totCell", "action"], [1, "msg-preview", 3, "click"], [3, "nzColor"], [2, "display", "flex", "gap", "8px"], ["nzType", "primary", "nzSize", "small", 3, "click", 4, "ngIf"], ["nzSize", "small", 3, "nzDanger", "click", 4, "ngIf"], ["nzSize", "small", 3, "click"], ["nz-icon", "", 3, "nzType"], ["nzType", "primary", "nzSize", "small", 3, "click"], ["nz-icon", "", "nzType", "rollback"], ["nzSize", "small", 3, "click", "nzDanger"], ["nz-icon", "", "nzType", "delete"], [1, "json-viewer-container", 2, "background", "#fff", "padding", "20px", "border-radius", "6px", "width", "100%", "border", "1px solid #f0f0f0"], ["nz-row", "", 3, "nzGutter"], ["nz-col", "", 3, "nzSpan"], [2, "display", "flex", "justify-content", "space-between", "margin-bottom", "8px", "align-items", "center"], [2, "font-weight", "bold", "color", "#1890ff", "font-size", "14px"], ["nz-icon", "", "nzType", "code"], ["nzType", "default", "nzSize", "small", 3, "click"], ["nz-icon", "", "nzType", "copy"], [2, "margin", "0", "color", "#333", "background", "#fafafa", "border", "1px solid #d9d9d9", "padding", "12px", "border-radius", "4px", "font-size", "12px", "overflow", "auto", "max-height", "400px", "font-family", "monospace", "white-space", "pre-wrap", "word-break", "break-all"], ["style", "margin-top: 12px; padding: 12px; background: #fff1f0; border-left: 4px solid #ff4d4f; border-radius: 4px; border: 1px solid #ffa39e; border-left-width: 4px;", 4, "ngIf"], [2, "font-weight", "bold", "color", "#1890ff", "font-size", "14px", "margin-bottom", "16px"], ["nz-icon", "", "nzType", "history"], [1, "timeline-wrapper", 2, "max-height", "400px", "overflow-y", "auto", "padding-right", "8px"], [4, "ngIf", "ngIfElse"], [2, "margin-top", "12px", "padding", "12px", "background", "#fff1f0", "border-left", "4px solid #ff4d4f", "border-radius", "4px", "border", "1px solid #ffa39e", "border-left-width", "4px"], [2, "font-weight", "bold", "color", "#cf1322", "margin-bottom", "4px"], ["nz-icon", "", "nzType", "warning"], [2, "color", "#ff4d4f", "font-family", "monospace", "font-size", "11px"], [3, "nzColor", 4, "ngFor", "ngForOf"], [2, "display", "flex", "align-items", "center", "gap", "8px", "margin-bottom", "4px"], [2, "font-weight", "bold", "font-family", "monospace", "font-size", "11px", "color", "#888"], [3, "nzColor", 4, "ngIf"], [2, "background", "#fafafa", "padding", "8px", "border-radius", "4px", "border-left", "3px solid #d9d9d9", "margin-bottom", "8px", "font-size", "11px"], [4, "ngIf"], ["style", "margin-top: 4px; color: #555;", 4, "ngIf"], ["style", "margin-top: 4px; color: #cf1322; font-family: monospace; font-size: 11px; white-space: pre-wrap; word-break: break-all;", 4, "ngIf"], [2, "color", "#666"], [2, "color", "#c41d7f"], [2, "color", "#389e0d"], [2, "color", "#d46b08"], [2, "margin-top", "4px", "color", "#555"], ["nz-icon", "", "nzType", "info-circle", 2, "color", "#1890ff"], [2, "margin-top", "4px", "color", "#cf1322", "font-family", "monospace", "font-size", "11px", "white-space", "pre-wrap", "word-break", "break-all"], [2, "display", "flex", "flex-direction", "column", "align-items", "center", "justify-content", "center", "height", "150px", "color", "#999"], ["nz-icon", "", "nzType", "loading", 2, "font-size", "24px", "color", "#1890ff", "margin-bottom", "8px"], [2, "font-size", "12px"]], template: function MessageListComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "tot-table", 3);
    \u0275\u0275listener("queryParamsChange", function MessageListComponent_Template_tot_table_queryParamsChange_1_listener($event) {
      return ctx.onQueryParamsChange($event);
    })("expandChange", function MessageListComponent_Template_tot_table_expandChange_1_listener($event) {
      return ctx.onRowExpand($event);
    });
    \u0275\u0275template(2, MessageListComponent_ng_template_2_Template, 2, 4, "ng-template", 4)(3, MessageListComponent_ng_template_3_Template, 3, 6, "ng-template", 5)(4, MessageListComponent_ng_template_4_Template, 3, 4, "ng-template", 6)(5, MessageListComponent_ng_template_5_Template, 7, 6, "ng-template", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, MessageListComponent_ng_template_6_Template, 24, 16, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const expandTpl_r14 = \u0275\u0275reference(7);
    \u0275\u0275advance();
    \u0275\u0275property("data", ctx.messages)("columns", ctx.msgColumns)("loading", ctx.loading)("total", ctx.total)("pageIndex", ctx.pageIndex)("pageSize", ctx.pageSize)("frontPagination", false)("expandTemplate", expandTpl_r14);
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  NzTableModule,
  NzButtonModule,
  NzTransitionPatchDirective,
  NzIconModule,
  NzIconDirective,
  NzTagModule,
  NzTagComponent,
  NzTimelineModule,
  NzTimelineItemComponent,
  NzTimelineComponent,
  NzTooltipModule,
  NzGridModule,
  NzColDirective,
  NzRowDirective,
  TranslocoModule,
  TotButtonComponent,
  TotTableComponent,
  TotCellDirective,
  SlicePipe,
  DatePipe,
  TranslocoPipe
], styles: ["\n.message-list-content[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.msg-cell[_ngcontent-%COMP%] {\n  font-family: monospace;\n  color: #555;\n}\n.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #999;\n}\n/*# sourceMappingURL=message-list.component.css.map */", "\n.msg-preview[_ngcontent-%COMP%] {\n  cursor: pointer;\n  font-family: monospace;\n  font-size: 12px;\n  color: #999;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 500px;\n}\n.msg-preview[_ngcontent-%COMP%]:hover {\n  color: #1890ff;\n}\n/*# sourceMappingURL=message-list.component.css.map */"] });
var MessageListComponent = _MessageListComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageListComponent, [{
    type: Component,
    args: [{ selector: "app-message-list", standalone: true, imports: [
      CommonModule,
      NzTableModule,
      NzButtonModule,
      NzIconModule,
      NzTagModule,
      NzTimelineModule,
      NzTooltipModule,
      NzGridModule,
      TranslocoModule,
      TotButtonComponent,
      TotTableComponent,
      TotCellDirective
    ], template: `<div class="message-list-container">
  <tot-table 
    [data]="messages" 
    [columns]="msgColumns" 
    [loading]="loading" 
    [total]="total" 
    [pageIndex]="pageIndex" 
    [pageSize]="pageSize" 
    [frontPagination]="false"
    [expandTemplate]="expandTpl"
    (queryParamsChange)="onQueryParamsChange($event)"
    (expandChange)="onRowExpand($event)"
  >
    <ng-template totCell="time" let-data>
      {{ getTime(data) | date:'yyyy-MM-dd HH:mm:ss' }}
    </ng-template>

    <ng-template totCell="content" let-data>
      <div class="msg-preview" (click)="toggleExpand(data)">
        {{ data.raw | slice:0:100 }}{{ data.raw.length > 100 ? '...' : '' }}
      </div>
    </ng-template>

    <ng-template totCell="status" let-data>
      <nz-tag [nzColor]="getStatus(data) === 'error' ? 'error' : getStatus(data) === 'processing' ? 'processing' : 'default'">
        {{ getStatus(data) | transloco }}
      </nz-tag>
    </ng-template>

    <ng-template totCell="action" let-data>
      <div style="display: flex; gap: 8px;">
        <tot-button *ngIf="queueName.endsWith(':dead')" nzType="primary" nzSize="small" (click)="resend(data)">
          <i nz-icon nzType="rollback"></i> {{ 'G\u1EEDi l\u1EA1i' | transloco }}
        </tot-button>
        <tot-button *ngIf="queueName.endsWith(':dead')" [nzDanger]="true" nzSize="small" (click)="delete(data)">
          <i nz-icon nzType="delete"></i> {{ 'X\xF3a' | transloco }}
        </tot-button>
        <tot-button nzSize="small" (click)="toggleExpand(data)">
          <i nz-icon [nzType]="data.expand ? 'up' : 'down'"></i> {{ 'Chi ti\u1EBFt' | transloco }}
        </tot-button>
      </div>
    </ng-template>
  </tot-table>

  <ng-template #expandTpl let-data>
    <div class="json-viewer-container" style="background: #fff; padding: 20px; border-radius: 6px; width: 100%; border: 1px solid #f0f0f0;">
      <div nz-row [nzGutter]="16">
        <!-- Left: prettified JSON -->
        <div nz-col [nzSpan]="10">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; align-items: center;">
            <span style="font-weight: bold; color: #1890ff; font-size: 14px;">
              <i nz-icon nzType="code"></i> {{ 'D\u1EEF li\u1EC7u Tin nh\u1EAFn (Payload)' | transloco }}
            </span>
            <tot-button nzType="default" nzSize="small" (click)="copyToClipboard(data.raw)">
              <i nz-icon nzType="copy"></i> {{ 'Sao ch\xE9p' | transloco }}
            </tot-button>
          </div>
          <pre style="margin: 0; color: #333; background: #fafafa; border: 1px solid #d9d9d9; padding: 12px; border-radius: 4px; font-size: 12px; overflow: auto; max-height: 400px; font-family: monospace; white-space: pre-wrap; word-break: break-all;">{{ formatJson(data.parsed) }}</pre>
          
          <div *ngIf="data.parsed._error" style="margin-top: 12px; padding: 12px; background: #fff1f0; border-left: 4px solid #ff4d4f; border-radius: 4px; border: 1px solid #ffa39e; border-left-width: 4px;">
            <div style="font-weight: bold; color: #cf1322; margin-bottom: 4px;"><i nz-icon nzType="warning"></i> Error Details:</div>
            <div style="color: #ff4d4f; font-family: monospace; font-size: 11px;">{{ data.parsed._error }}</div>
          </div>
        </div>

        <!-- Right: event sequential logs timeline trace -->
        <div nz-col [nzSpan]="14">
          <h4 style="font-weight: bold; color: #1890ff; font-size: 14px; margin-bottom: 16px;">
            <i nz-icon nzType="history"></i> {{ 'L\u1ECBch s\u1EED d\xF2ng th\u1EDDi gian s\u1EF1 ki\u1EC7n (Tracking)' | transloco }}
          </h4>
          
          <div class="timeline-wrapper" style="max-height: 400px; overflow-y: auto; padding-right: 8px;">
            <nz-timeline *ngIf="data.history && data.history.length > 0; else loadingHistory">
              <nz-timeline-item 
                *ngFor="let step of data.history" 
                [nzColor]="step.status?.toLowerCase() === 'error' ? 'red' : step.status?.toLowerCase() === 'success' ? 'green' : 'blue'"
              >
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span style="font-weight: bold; font-family: monospace; font-size: 11px; color: #888;">
                    {{ (step.timestamp || step.time) | date:'yyyy-MM-dd HH:mm:ss.SSS' }}
                  </span>
                  <nz-tag [nzColor]="step.step === 'send' ? 'blue' : step.step === 'dequeue' ? 'orange' : step.step === 'done' ? 'green' : 'default'">
                    {{ step.step }}
                  </nz-tag>
                  <nz-tag *ngIf="step.status" [nzColor]="step.status.toLowerCase() === 'success' ? 'success' : 'error'">
                    {{ step.status }}
                  </nz-tag>
                </div>

                <div style="background: #fafafa; padding: 8px; border-radius: 4px; border-left: 3px solid #d9d9d9; margin-bottom: 8px; font-size: 11px;">
                  <div *ngIf="step.sourceComponent"><span style="color: #666;">Source:</span> <code style="color: #c41d7f;">{{ shortenNamespace(step.sourceComponent) }}</code></div>
                  <div *ngIf="step.handlerOrEventName"><span style="color: #666;">Handler:</span> <code style="color: #389e0d;">{{ shortenNamespace(step.handlerOrEventName) }}</code></div>
                  <div *ngIf="step.workerName"><span style="color: #666;">Worker:</span> <code style="color: #d46b08;">{{ step.workerName }}</code></div>
                  <div *ngIf="step.details && step.status?.toLowerCase() !== 'error'" style="margin-top: 4px; color: #555;"><i nz-icon nzType="info-circle" style="color: #1890ff;"></i> {{ step.details }}</div>
                  <div *ngIf="step.status?.toLowerCase() === 'error'" style="margin-top: 4px; color: #cf1322; font-family: monospace; font-size: 11px; white-space: pre-wrap; word-break: break-all;">{{ step.details }}</div>
                </div>
              </nz-timeline-item>
            </nz-timeline>
            
            <ng-template #loadingHistory>
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 150px; color: #999;">
                <i nz-icon nzType="loading" style="font-size: 24px; color: #1890ff; margin-bottom: 8px;"></i>
                <p style="font-size: 12px;">{{ '\u0110ang t\u1EA3i l\u1ECBch s\u1EED chi ti\u1EBFt...' | transloco }}</p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  </ng-template>
</div>

<style>
  .msg-preview {
    cursor: pointer;
    font-family: monospace;
    font-size: 12px;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 500px;
  }
  .msg-preview:hover {
    color: #1890ff;
  }
</style>
`, styles: ["/* projects/tot/cqrs-dashboard/src/lib/message-list/message-list.component.css */\n.message-list-content {\n  padding: 24px;\n}\n.msg-cell {\n  font-family: monospace;\n  color: #555;\n}\n.no-data {\n  text-align: center;\n  padding: 40px;\n  color: #999;\n}\n/*# sourceMappingURL=message-list.component.css.map */\n", "/* angular:styles/component:css;83e7dd69ca1ef731ee791253815c857391ef19343f8043d076218784555af8e1;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/projects/tot/cqrs-dashboard/src/lib/message-list/message-list.component.html */\n.msg-preview {\n  cursor: pointer;\n  font-family: monospace;\n  font-size: 12px;\n  color: #999;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 500px;\n}\n.msg-preview:hover {\n  color: #1890ff;\n}\n/*# sourceMappingURL=message-list.component.css.map */\n"] }]
  }], null, { inputQueueName: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MessageListComponent, { className: "MessageListComponent", filePath: "projects/tot/cqrs-dashboard/src/lib/message-list/message-list.component.ts", lineNumber: 37 });
})();

// projects/tot/cqrs-dashboard/src/lib/topic-detail/topic-detail.component.ts
function TopicDetailComponent_div_1_ng_container_20_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275element(1, "app-message-list", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sub_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("inputQueueName", ctx_r2.showInProgress ? sub_r2.queueName.replace("sub_queue:", "sub_proc:") : sub_r2.queueName);
  }
}
function TopicDetailComponent_div_1_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "tr")(2, "td")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td")(6, "code");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 5)(9, "nz-tag", 8);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 5)(12, "nz-tag", 9);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td", 5)(15, "nz-tag", 8);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td", 5)(18, "nz-tag", 9);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "td", 5)(21, "button", 10);
    \u0275\u0275listener("click", function TopicDetailComponent_div_1_ng_container_20_Template_button_click_21_listener() {
      const sub_r2 = \u0275\u0275restoreView(_r1).$implicit;
      return \u0275\u0275resetView(sub_r2.expand = !sub_r2.expand);
    });
    \u0275\u0275element(22, "i", 11);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "transloco");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "tr", 12);
    \u0275\u0275template(26, TopicDetailComponent_div_1_ng_container_20_div_26_Template, 2, 1, "div", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const sub_r2 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(sub_r2.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sub_r2.queueName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sub_r2.sendSuccessCount || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sub_r2.sendErrorCount || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sub_r2.doneSuccessCount || 0);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(sub_r2.doneErrorCount || 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("nzType", sub_r2.expand ? "up" : "down");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(24, 10, sub_r2.expand ? "Thu g\u1ECDn" : "Xem chi ti\u1EBFt"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("nzExpand", sub_r2.expand);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", sub_r2.expand);
  }
}
function TopicDetailComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "nz-table", 4, 1)(3, "thead")(4, "tr")(5, "th");
    \u0275\u0275text(6, "Subscriber");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Queue Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 5);
    \u0275\u0275text(10, "Send Success");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 5);
    \u0275\u0275text(12, "Send Error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 5);
    \u0275\u0275text(14, "Done Success");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 5);
    \u0275\u0275text(16, "Done Error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 6);
    \u0275\u0275text(18, "H\xE0nh \u0111\u1ED9ng");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275template(20, TopicDetailComponent_div_1_ng_container_20_Template, 27, 12, "ng-container", 7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const subTable_r4 = \u0275\u0275reference(2);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzData", ctx_r2.topic.subscribers)("nzFrontPagination", false)("nzShowPagination", false);
    \u0275\u0275advance(19);
    \u0275\u0275property("ngForOf", subTable_r4.data);
  }
}
function TopicDetailComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "i", 17);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "transloco");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 1, "Kh\xF4ng c\xF3 subscriber n\xE0o cho topic n\xE0y"));
  }
}
var _TopicDetailComponent = class _TopicDetailComponent {
  constructor() {
    this.modalData = inject(NZ_MODAL_DATA);
    this.topic = this.modalData.topic;
    this.showInProgress = this.modalData.showInProgress || false;
  }
  ngOnInit() {
    if (this.topic.subscribers) {
      this.topic.subscribers.forEach((sub) => {
        sub.expand = false;
      });
    }
  }
};
_TopicDetailComponent.\u0275fac = function TopicDetailComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TopicDetailComponent)();
};
_TopicDetailComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TopicDetailComponent, selectors: [["app-topic-detail"]], decls: 4, vars: 2, consts: [["noSubs", ""], ["subTable", ""], [1, "topic-detail-container"], [4, "ngIf", "ngIfElse"], ["nzSize", "middle", 3, "nzData", "nzFrontPagination", "nzShowPagination"], ["nzAlign", "center"], ["nzAlign", "center", "nzWidth", "150px"], [4, "ngFor", "ngForOf"], ["nzColor", "success"], ["nzColor", "error"], ["nz-button", "", "nzType", "primary", "nzGhost", "", "nzSize", "small", 3, "click"], ["nz-icon", "", 3, "nzType"], [3, "nzExpand"], ["style", "padding: 16px; background: #fafafa; border-radius: 4px;", 4, "ngIf"], [2, "padding", "16px", "background", "#fafafa", "border-radius", "4px"], [3, "inputQueueName"], [2, "text-align", "center", "padding", "48px 0", "color", "#999"], ["nz-icon", "", "nzType", "info-circle", 2, "font-size", "32px", "margin-bottom", "12px", "color", "#1890ff"]], template: function TopicDetailComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275template(1, TopicDetailComponent_div_1_Template, 21, 4, "div", 3)(2, TopicDetailComponent_ng_template_2_Template, 5, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const noSubs_r5 = \u0275\u0275reference(3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.topic.subscribers && ctx.topic.subscribers.length > 0)("ngIfElse", noSubs_r5);
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  NzTableModule,
  NzTableComponent,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTheadComponent,
  NzTbodyComponent,
  NzTrDirective,
  NzTrExpandDirective,
  NzCellAlignDirective,
  NzTableFixedRowComponent,
  NzTagModule,
  NzTagComponent,
  NzButtonModule,
  NzButtonComponent,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzIconModule,
  NzIconDirective,
  FormsModule,
  TranslocoModule,
  MessageListComponent,
  TranslocoPipe
], styles: ["\n.topic-detail-container[_ngcontent-%COMP%] {\n  min-height: 400px;\n}\n/*# sourceMappingURL=topic-detail.component.css.map */"] });
var TopicDetailComponent = _TopicDetailComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TopicDetailComponent, [{
    type: Component,
    args: [{ selector: "app-topic-detail", standalone: true, imports: [
      CommonModule,
      NzTableModule,
      NzTagModule,
      NzButtonModule,
      NzIconModule,
      FormsModule,
      TranslocoModule,
      MessageListComponent
    ], template: `
    <div class="topic-detail-container">
      <div *ngIf="topic.subscribers && topic.subscribers.length > 0; else noSubs">
        <nz-table #subTable [nzData]="topic.subscribers" nzSize="middle" [nzFrontPagination]="false" [nzShowPagination]="false">
          <thead>
            <tr>
              <th>Subscriber</th>
              <th>Queue Name</th>
              <th nzAlign="center">Send Success</th>
              <th nzAlign="center">Send Error</th>
              <th nzAlign="center">Done Success</th>
              <th nzAlign="center">Done Error</th>
              <th nzAlign="center" nzWidth="150px">H\xE0nh \u0111\u1ED9ng</th>
            </tr>
          </thead>
          <tbody>
            <ng-container *ngFor="let sub of subTable.data">
              <tr>
                <td><strong>{{ sub.name }}</strong></td>
                <td><code>{{ sub.queueName }}</code></td>
                <td nzAlign="center"><nz-tag nzColor="success">{{ sub.sendSuccessCount || 0 }}</nz-tag></td>
                <td nzAlign="center"><nz-tag nzColor="error">{{ sub.sendErrorCount || 0 }}</nz-tag></td>
                <td nzAlign="center"><nz-tag nzColor="success">{{ sub.doneSuccessCount || 0 }}</nz-tag></td>
                <td nzAlign="center"><nz-tag nzColor="error">{{ sub.doneErrorCount || 0 }}</nz-tag></td>
                <td nzAlign="center">
                  <button nz-button nzType="primary" nzGhost nzSize="small" (click)="sub.expand = !sub.expand">
                    <i nz-icon [nzType]="sub.expand ? 'up' : 'down'"></i>
                    {{ (sub.expand ? 'Thu g\u1ECDn' : 'Xem chi ti\u1EBFt') | transloco }}
                  </button>
                </td>
              </tr>
              <tr [nzExpand]="sub.expand">
                <div *ngIf="sub.expand" style="padding: 16px; background: #fafafa; border-radius: 4px;">
                  <app-message-list [inputQueueName]="showInProgress ? sub.queueName.replace('sub_queue:', 'sub_proc:') : sub.queueName"></app-message-list>
                </div>
              </tr>
            </ng-container>
          </tbody>
        </nz-table>
      </div>
      <ng-template #noSubs>
        <div style="text-align: center; padding: 48px 0; color: #999;">
          <i nz-icon nzType="info-circle" style="font-size: 32px; margin-bottom: 12px; color: #1890ff;"></i>
          <p>{{ 'Kh\xF4ng c\xF3 subscriber n\xE0o cho topic n\xE0y' | transloco }}</p>
        </div>
      </ng-template>
    </div>
  `, styles: ["/* angular:styles/component:css;0070e35dc6a0f2c9e08fc83dcb214cbeb92a2d4b0d320c393e09e02b9801fc82;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/projects/tot/cqrs-dashboard/src/lib/topic-detail/topic-detail.component.ts */\n.topic-detail-container {\n  min-height: 400px;\n}\n/*# sourceMappingURL=topic-detail.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TopicDetailComponent, { className: "TopicDetailComponent", filePath: "projects/tot/cqrs-dashboard/src/lib/topic-detail/topic-detail.component.ts", lineNumber: 80 });
})();

// projects/tot/cqrs-dashboard/src/lib/dashboard/dashboard.component.ts
var _c06 = () => ({ color: "#52c41a" });
var _c14 = () => ({ color: "#ff4d4f" });
var _c22 = () => ({ color: "#2f54eb" });
var _c32 = () => ({ color: "#f5222d" });
var _c42 = () => ({ color: "#bfbfbf" });
var _c52 = () => ({ color: "#13c2c2" });
var _c62 = () => ({ x: "1300px" });
var _c72 = () => ({ x: "1000px" });
function DashboardComponent_nz_option_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-option", 36);
    \u0275\u0275pipe(1, "transloco");
  }
  if (rf & 2) {
    const i_r2 = ctx.$implicit;
    \u0275\u0275property("nzLabel", \u0275\u0275pipeBind1(1, 2, i_r2.label))("nzValue", i_r2.value);
  }
}
function DashboardComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275element(1, "i", 25);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "H\xE0ng \u0111\u1EE3i (Queue)"), " ");
  }
}
function DashboardComponent_ng_template_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275element(1, "i", 27);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "Ch\u1EE7 \u0111\u1EC1 (Topic)"), " ");
  }
}
function DashboardComponent_ng_template_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 39);
    \u0275\u0275element(1, "i", 31);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "Tr\u1EA1ng th\xE1i Workers"), " ");
  }
}
function DashboardComponent_div_87_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r3.activeCount);
  }
}
function DashboardComponent_div_87_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r4.sendSuccessCount);
  }
}
function DashboardComponent_div_87_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r5.sendErrorCount);
  }
}
function DashboardComponent_div_87_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r6.doneSuccessCount);
  }
}
function DashboardComponent_div_87_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r7.doneErrorCount);
  }
}
function DashboardComponent_div_87_ng_template_9_nz_tag_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(w_r8);
  }
}
function DashboardComponent_div_87_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275template(1, DashboardComponent_div_87_ng_template_9_nz_tag_1_Template, 2, 1, "nz-tag", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", data_r9.workers);
  }
}
function DashboardComponent_div_87_ng_template_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "span", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 59);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const h_r10 = ctx.$implicit;
    const ctx_r10 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("nz-tooltip", h_r10.handlerName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r10.shortenNamespace(h_r10.handlerName));
    \u0275\u0275advance();
    \u0275\u0275property("nz-tooltip", h_r10.messageName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r10.shortenNamespace(h_r10.messageName));
  }
}
function DashboardComponent_div_87_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275template(1, DashboardComponent_div_87_ng_template_10_div_1_Template, 5, 4, "div", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r12 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", data_r12.handlers);
  }
}
function DashboardComponent_div_87_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60)(1, "tot-button", 61);
    \u0275\u0275listener("click", function DashboardComponent_div_87_ng_template_11_Template_tot_button_click_1_listener() {
      const data_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r10 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r10.viewDetails(data_r14));
    });
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "tot-button", 62);
    \u0275\u0275listener("click", function DashboardComponent_div_87_ng_template_11_Template_tot_button_click_4_listener() {
      const data_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r10 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r10.viewInProgress(data_r14));
    });
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "transloco");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("nzGhost", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 3, "Chi ti\u1EBFt"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 5, "Xem \u0111ang x\u1EED l\xFD"), " ");
  }
}
function DashboardComponent_div_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "nz-card", 40);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementStart(3, "tot-table", 41);
    \u0275\u0275template(4, DashboardComponent_div_87_ng_template_4_Template, 2, 1, "ng-template", 42)(5, DashboardComponent_div_87_ng_template_5_Template, 2, 1, "ng-template", 43)(6, DashboardComponent_div_87_ng_template_6_Template, 2, 1, "ng-template", 44)(7, DashboardComponent_div_87_ng_template_7_Template, 2, 1, "ng-template", 45)(8, DashboardComponent_div_87_ng_template_8_Template, 2, 1, "ng-template", 46)(9, DashboardComponent_div_87_ng_template_9_Template, 2, 1, "ng-template", 47)(10, DashboardComponent_div_87_ng_template_10_Template, 2, 1, "ng-template", 48)(11, DashboardComponent_div_87_ng_template_11_Template, 7, 7, "ng-template", 49);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r10 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(2, 8, "Danh s\xE1ch H\xE0ng \u0111\u1EE3i (Queue)"));
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r10.allQueues)("columns", ctx_r10.queueColumns)("loading", ctx_r10.loading)("pageSize", 10)("frontPagination", true)("showPagination", true)("scroll", \u0275\u0275pureFunction0(10, _c62));
  }
}
function DashboardComponent_div_88_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r15 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r15.activeCount);
  }
}
function DashboardComponent_div_88_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r16.sendSuccessCount);
  }
}
function DashboardComponent_div_88_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r17 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r17.sendErrorCount);
  }
}
function DashboardComponent_div_88_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 51);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r18 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r18.doneSuccessCount);
  }
}
function DashboardComponent_div_88_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r19 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r19.doneErrorCount);
  }
}
function DashboardComponent_div_88_ng_template_9_nz_tag_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const w_r20 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(w_r20);
  }
}
function DashboardComponent_div_88_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275template(1, DashboardComponent_div_88_ng_template_9_nz_tag_1_Template, 2, 1, "nz-tag", 54);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r21 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", data_r21.workers);
  }
}
function DashboardComponent_div_88_ng_template_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "span", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 59);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const h_r22 = ctx.$implicit;
    const ctx_r10 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("nz-tooltip", h_r22.handlerName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r10.shortenNamespace(h_r22.handlerName));
    \u0275\u0275advance();
    \u0275\u0275property("nz-tooltip", h_r22.messageName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r10.shortenNamespace(h_r22.messageName));
  }
}
function DashboardComponent_div_88_ng_template_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275template(1, DashboardComponent_div_88_ng_template_10_div_1_Template, 5, 4, "div", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r23 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", data_r23.handlers);
  }
}
function DashboardComponent_div_88_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60)(1, "tot-button", 61);
    \u0275\u0275listener("click", function DashboardComponent_div_88_ng_template_11_Template_tot_button_click_1_listener() {
      const data_r25 = \u0275\u0275restoreView(_r24).$implicit;
      const ctx_r10 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r10.viewDetails(data_r25));
    });
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "tot-button", 62);
    \u0275\u0275listener("click", function DashboardComponent_div_88_ng_template_11_Template_tot_button_click_4_listener() {
      const data_r25 = \u0275\u0275restoreView(_r24).$implicit;
      const ctx_r10 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r10.viewInProgress(data_r25));
    });
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "transloco");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("nzGhost", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 3, "Chi ti\u1EBFt"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 5, "Xem \u0111ang x\u1EED l\xFD"), " ");
  }
}
function DashboardComponent_div_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "nz-card", 40);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementStart(3, "tot-table", 41);
    \u0275\u0275template(4, DashboardComponent_div_88_ng_template_4_Template, 2, 1, "ng-template", 42)(5, DashboardComponent_div_88_ng_template_5_Template, 2, 1, "ng-template", 43)(6, DashboardComponent_div_88_ng_template_6_Template, 2, 1, "ng-template", 44)(7, DashboardComponent_div_88_ng_template_7_Template, 2, 1, "ng-template", 45)(8, DashboardComponent_div_88_ng_template_8_Template, 2, 1, "ng-template", 46)(9, DashboardComponent_div_88_ng_template_9_Template, 2, 1, "ng-template", 47)(10, DashboardComponent_div_88_ng_template_10_Template, 2, 1, "ng-template", 48)(11, DashboardComponent_div_88_ng_template_11_Template, 7, 7, "ng-template", 49);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r10 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(2, 8, "Danh s\xE1ch Ch\u1EE7 \u0111\u1EC1 (Topic)"));
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r10.allTopics)("columns", ctx_r10.topicColumns)("loading", ctx_r10.loading)("pageSize", 10)("frontPagination", true)("showPagination", true)("scroll", \u0275\u0275pureFunction0(10, _c62));
  }
}
function DashboardComponent_div_89_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 81);
  }
}
function DashboardComponent_div_89_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r27 = ctx.$implicit;
    \u0275\u0275property("title", data_r27.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r27.id);
  }
}
function DashboardComponent_div_89_ng_template_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 83);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r28 = ctx.$implicit;
    \u0275\u0275property("nzColor", (data_r28.status == null ? null : data_r28.status.toLowerCase()) === "success" ? "success" : (data_r28.status == null ? null : data_r28.status.toLowerCase()) === "error" ? "error" : "processing");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, (data_r28.status == null ? null : data_r28.status.toLowerCase()) === "success" ? "Th\xE0nh c\xF4ng" : (data_r28.status == null ? null : data_r28.status.toLowerCase()) === "error" ? "L\u1ED7i" : "\u0110ang ch\u1EA1y"), " ");
  }
}
function DashboardComponent_div_89_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 83);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r29 = ctx.$implicit;
    \u0275\u0275property("nzColor", data_r29.step === "send" ? "blue" : data_r29.step === "dequeue" ? "orange" : data_r29.step === "done" ? "green" : "default");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", data_r29.step, " ");
  }
}
function DashboardComponent_div_89_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r30 = ctx.$implicit;
    const ctx_r10 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nz-tooltip", data_r30.sourceComponent);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r10.shortenNamespace(data_r30.sourceComponent), " ");
  }
}
function DashboardComponent_div_89_ng_template_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 85);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r31 = ctx.$implicit;
    const ctx_r10 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nz-tooltip", data_r31.queueOrTopic);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r10.shortenNamespace(data_r31.queueOrTopic));
  }
}
function DashboardComponent_div_89_ng_template_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r32 = ctx.$implicit;
    const ctx_r10 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nz-tooltip", data_r32.handler);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r10.shortenNamespace(data_r32.handler), " ");
  }
}
function DashboardComponent_div_89_ng_template_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const data_r33 = ctx.$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, data_r33.time, "yyyy-MM-dd HH:mm:ss"), " ");
  }
}
function DashboardComponent_div_89_ng_template_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60)(1, "tot-button", 86);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275listener("click", function DashboardComponent_div_89_ng_template_38_Template_tot_button_click_1_listener() {
      const data_r35 = \u0275\u0275restoreView(_r34).$implicit;
      const ctx_r10 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r10.retryTracking(data_r35));
    });
    \u0275\u0275element(3, "i", 87);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "tot-button", 88);
    \u0275\u0275pipe(7, "transloco");
    \u0275\u0275listener("click", function DashboardComponent_div_89_ng_template_38_Template_tot_button_click_6_listener() {
      const data_r35 = \u0275\u0275restoreView(_r34).$implicit;
      const ctx_r10 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r10.deleteTracking(data_r35));
    });
    \u0275\u0275element(8, "i", 89);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "tot-button", 90);
    \u0275\u0275listener("click", function DashboardComponent_div_89_ng_template_38_Template_tot_button_click_11_listener() {
      const data_r35 = \u0275\u0275restoreView(_r34).$implicit;
      const ctx_r10 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r10.toggleExpand(data_r35));
    });
    \u0275\u0275element(12, "i", 91);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "transloco");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r35 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzTooltipTitle", \u0275\u0275pipeBind1(2, 7, "G\u1EEDi l\u1EA1i"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 9, "G\u1EEDi l\u1EA1i"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("nzDanger", true)("nzTooltipTitle", \u0275\u0275pipeBind1(7, 11, "X\xF3a"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 13, "X\xF3a"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("nzType", data_r35.expand ? "up" : "down");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(14, 15, "Payload"), " ");
  }
}
function DashboardComponent_div_89_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "nz-card", 40);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementStart(3, "div", 63)(4, "div", 19)(5, "div", 17)(6, "nz-input-group", 64)(7, "input", 65);
    \u0275\u0275pipe(8, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_div_89_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r10 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r10.filters.trackingId, $event) || (ctx_r10.filters.trackingId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function DashboardComponent_div_89_Template_input_ngModelChange_7_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r10 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r10.onFilterChange());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, DashboardComponent_div_89_ng_template_9_Template, 1, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 17)(12, "nz-select", 66);
    \u0275\u0275pipe(13, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_div_89_Template_nz_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r10 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r10.filters.status, $event) || (ctx_r10.filters.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function DashboardComponent_div_89_Template_nz_select_ngModelChange_12_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r10 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r10.onFilterChange());
    });
    \u0275\u0275element(14, "nz-option", 67);
    \u0275\u0275pipe(15, "transloco");
    \u0275\u0275element(16, "nz-option", 68);
    \u0275\u0275pipe(17, "transloco");
    \u0275\u0275element(18, "nz-option", 69);
    \u0275\u0275pipe(19, "transloco");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 17)(21, "div", 70)(22, "nz-date-picker", 71);
    \u0275\u0275pipe(23, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_div_89_Template_nz_date_picker_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r10 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r10.filters.fromDate, $event) || (ctx_r10.filters.fromDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function DashboardComponent_div_89_Template_nz_date_picker_ngModelChange_22_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r10 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r10.onFilterChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "nz-date-picker", 71);
    \u0275\u0275pipe(25, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_div_89_Template_nz_date_picker_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r10 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r10.filters.toDate, $event) || (ctx_r10.filters.toDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function DashboardComponent_div_89_Template_nz_date_picker_ngModelChange_24_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r10 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r10.onFilterChange());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 17)(27, "tot-button", 72);
    \u0275\u0275listener("click", function DashboardComponent_div_89_Template_tot_button_click_27_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r10 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r10.resetFilters());
    });
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "transloco");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(30, "tot-table", 73);
    \u0275\u0275listener("queryParamsChange", function DashboardComponent_div_89_Template_tot_table_queryParamsChange_30_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r10 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r10.onQueryParamsChange($event));
    })("expandChange", function DashboardComponent_div_89_Template_tot_table_expandChange_30_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r10 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r10.onRowExpand($event));
    });
    \u0275\u0275template(31, DashboardComponent_div_89_ng_template_31_Template, 2, 2, "ng-template", 74)(32, DashboardComponent_div_89_ng_template_32_Template, 3, 4, "ng-template", 75)(33, DashboardComponent_div_89_ng_template_33_Template, 2, 2, "ng-template", 76)(34, DashboardComponent_div_89_ng_template_34_Template, 2, 2, "ng-template", 77)(35, DashboardComponent_div_89_ng_template_35_Template, 2, 2, "ng-template", 78)(36, DashboardComponent_div_89_ng_template_36_Template, 2, 2, "ng-template", 79)(37, DashboardComponent_div_89_ng_template_37_Template, 2, 4, "ng-template", 80)(38, DashboardComponent_div_89_ng_template_38_Template, 15, 17, "ng-template", 49);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const prefixSearch_r36 = \u0275\u0275reference(10);
    const ctx_r10 = \u0275\u0275nextContext();
    const expandTpl_r37 = \u0275\u0275reference(93);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(2, 29, "L\u1ECBch s\u1EED th\u1EF1c thi"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzGutter", 16);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 5);
    \u0275\u0275advance();
    \u0275\u0275property("nzPrefix", prefixSearch_r36);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r10.filters.trackingId);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(8, 31, "Tracking ID"));
    \u0275\u0275advance(4);
    \u0275\u0275property("nzSpan", 4);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r10.filters.status);
    \u0275\u0275property("nzPlaceHolder", \u0275\u0275pipeBind1(13, 33, "Tr\u1EA1ng th\xE1i"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzLabel", \u0275\u0275pipeBind1(15, 35, "Th\xE0nh c\xF4ng"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzLabel", \u0275\u0275pipeBind1(17, 37, "L\u1ED7i"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzLabel", \u0275\u0275pipeBind1(19, 39, "\u0110ang x\u1EED l\xFD"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 10);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r10.filters.fromDate);
    \u0275\u0275property("nzPlaceHolder", \u0275\u0275pipeBind1(23, 41, "B\u1EAFt \u0111\u1EA7u"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r10.filters.toDate);
    \u0275\u0275property("nzPlaceHolder", \u0275\u0275pipeBind1(25, 43, "K\u1EBFt th\xFAc"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 5);
    \u0275\u0275advance();
    \u0275\u0275property("nzBlock", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(29, 45, "\u0110\u1EB7t l\u1EA1i b\u1ED9 l\u1ECDc"));
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r10.recentTracking)("columns", ctx_r10.trackingColumns)("loading", ctx_r10.loading)("total", ctx_r10.totalTracking)("pageIndex", ctx_r10.pageIndex)("pageSize", ctx_r10.pageSize)("frontPagination", false)("expandTemplate", expandTpl_r37)("scroll", \u0275\u0275pureFunction0(47, _c62));
  }
}
function DashboardComponent_div_90_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 83);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r38 = ctx.$implicit;
    \u0275\u0275property("nzColor", data_r38.status === "Running" ? "success" : "default");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, data_r38.status === "Running" ? "\u0110ang ch\u1EA1y" : "\u0110\xE3 d\u1EEBng"), " ");
  }
}
function DashboardComponent_div_90_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 96);
    \u0275\u0275listener("click", function DashboardComponent_div_90_ng_template_5_Template_tot_button_click_0_listener() {
      const data_r40 = \u0275\u0275restoreView(_r39).$implicit;
      const ctx_r10 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r10.toggleWorker(data_r40.id, data_r40.status));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r40 = ctx.$implicit;
    \u0275\u0275property("nzType", data_r40.status === "Running" ? "default" : "primary")("nzDanger", data_r40.status === "Running");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 3, data_r40.status === "Running" ? "D\u1EEBng" : "Kh\u1EDFi ch\u1EA1y"), " ");
  }
}
function DashboardComponent_div_90_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-list-item")(1, "span", 97);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "nz-tag", 98);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "transloco");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r41 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r41.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r41.count, " ", \u0275\u0275pipeBind1(5, 3, "l\u1ED7i"));
  }
}
function DashboardComponent_div_90_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 99);
    \u0275\u0275element(1, "i", 100);
    \u0275\u0275elementStart(2, "p", 101);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "transloco");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 1, "Kh\xF4ng c\xF3 l\u1ED7i n\xE0o \u0111\u01B0\u1EE3c ghi nh\u1EADn"));
  }
}
function DashboardComponent_div_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "nz-card", 40);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementStart(3, "tot-table", 92);
    \u0275\u0275template(4, DashboardComponent_div_90_ng_template_4_Template, 3, 4, "ng-template", 75)(5, DashboardComponent_div_90_ng_template_5_Template, 3, 5, "ng-template", 49);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "nz-card", 93);
    \u0275\u0275pipe(7, "transloco");
    \u0275\u0275elementStart(8, "div", 19)(9, "div", 17)(10, "nz-list", 94);
    \u0275\u0275template(11, DashboardComponent_div_90_ng_template_11_Template, 6, 5, "ng-template", null, 5, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 17);
    \u0275\u0275template(14, DashboardComponent_div_90_div_14_Template, 5, 3, "div", 95);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const errorItem_r42 = \u0275\u0275reference(12);
    const ctx_r10 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(2, 14, "Gi\xE1m s\xE1t ti\u1EBFn tr\xECnh (Workers)"));
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r10.workerList)("columns", ctx_r10.workerColumns)("pageSize", 10)("frontPagination", true)("showPagination", true)("scroll", \u0275\u0275pureFunction0(18, _c72));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(7, 16, "Ph\xE2n t\xEDch l\u1ED7i"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzGutter", 16);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 12);
    \u0275\u0275advance();
    \u0275\u0275property("nzDataSource", ctx_r10.errorStats)("nzRenderItem", errorItem_r42);
    \u0275\u0275advance(3);
    \u0275\u0275property("nzSpan", 12);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r10.errorStats.length === 0);
  }
}
function DashboardComponent_div_91_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 83);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r43 = ctx.$implicit;
    \u0275\u0275property("nzColor", data_r43.type === "Command" ? "blue" : data_r43.type === "Topic" ? "purple" : "cyan");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, data_r43.type), " ");
  }
}
function DashboardComponent_div_91_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 105);
    \u0275\u0275pipe(1, "date");
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 106);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r44 = ctx.$implicit;
    \u0275\u0275property("nz-tooltip", \u0275\u0275pipeBind2(1, 3, data_r44.lastActive, "yyyy-MM-dd HH:mm:ss.SSS"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 6, data_r44.lastActive, "yyyy-MM-dd HH:mm:ss"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" (", \u0275\u0275pipeBind2(6, 9, data_r44.lastActive, "HH:mm:ss"), ") ");
  }
}
function DashboardComponent_div_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "nz-card", 40);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementStart(3, "tot-table", 102);
    \u0275\u0275template(4, DashboardComponent_div_91_ng_template_4_Template, 3, 4, "ng-template", 103)(5, DashboardComponent_div_91_ng_template_5_Template, 7, 12, "ng-template", 104);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r10 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(2, 6, "Danh s\xE1ch th\u1EDDi gian ho\u1EA1t \u0111\u1ED9ng l\u1EA7n cu\u1ED1i"));
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx_r10.lastActivityList)("columns", ctx_r10.activityColumns)("pageSize", 10)("frontPagination", true)("showPagination", true);
  }
}
function DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_nz_tag_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 83);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r47 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("nzColor", step_r47.status.toLowerCase() === "success" ? "success" : step_r47.status.toLowerCase() === "error" ? "error" : "processing");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", step_r47.status, " ");
  }
}
function DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 125)(1, "span", 126);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "code", 127);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r47 = \u0275\u0275nextContext().$implicit;
    const ctx_r10 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(3, 3, "Ngu\u1ED3n ph\xE1t (Source)"), ": ");
    \u0275\u0275advance(2);
    \u0275\u0275property("nz-tooltip", step_r47.sourceComponent);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r10.shortenNamespace(step_r47.sourceComponent));
  }
}
function DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 125)(1, "span", 126);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "code", 128);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r47 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(3, 2, "H\xE0ng \u0111\u1EE3i / Ch\u1EE7 \u0111\u1EC1"), ": ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r47.queueOrTopicName);
  }
}
function DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_11_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 131);
    \u0275\u0275text(1, " (Queue: ");
    \u0275\u0275elementStart(2, "code");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, ") ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r47 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r47.destinationQueueName);
  }
}
function DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 125)(1, "span", 126);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "code", 129);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_11_span_6_Template, 5, 1, "span", 130);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r47 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(3, 3, "Subscriber"), ": ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r47.subscriberName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", step_r47.destinationQueueName);
  }
}
function DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 125)(1, "span", 126);
    \u0275\u0275text(2, "Worker ID: ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "code", 132);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r47 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(step_r47.workerName);
  }
}
function DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 125)(1, "span", 126);
    \u0275\u0275text(2, "Handler: ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "code", 133);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r47 = \u0275\u0275nextContext().$implicit;
    const ctx_r10 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275property("nz-tooltip", step_r47.handlerOrEventName);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r10.shortenNamespace(step_r47.handlerOrEventName));
  }
}
function DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 134);
    \u0275\u0275element(1, "i", 135);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r47 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", step_r47.details, " ");
  }
}
function DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r48 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 136)(1, "div", 137)(2, "span", 138);
    \u0275\u0275element(3, "i", 139);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "tot-button", 140);
    \u0275\u0275listener("click", function DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_15_Template_tot_button_click_6_listener() {
      \u0275\u0275restoreView(_r48);
      const step_r47 = \u0275\u0275nextContext().$implicit;
      const ctx_r10 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r10.copyToClipboard(step_r47.details));
    });
    \u0275\u0275element(7, "i", 112);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "transloco");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "pre", 141);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r47 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 4, "Chi ti\u1EBFt l\u1ED7i (Stack Trace)"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzDanger", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(9, 6, "Sao ch\xE9p l\u1ED7i"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r47.details);
  }
}
function DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-timeline-item", 83)(1, "div", 118)(2, "span", 119);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "nz-tag", 83);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_nz_tag_7_Template, 2, 2, "nz-tag", 120);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 121);
    \u0275\u0275template(9, DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_9_Template, 6, 5, "div", 122)(10, DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_10_Template, 6, 4, "div", 122)(11, DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_11_Template, 7, 5, "div", 122)(12, DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_12_Template, 5, 1, "div", 122)(13, DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_13_Template, 5, 2, "div", 122)(14, DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_14_Template, 3, 1, "div", 123)(15, DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_div_15_Template, 12, 8, "div", 124);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const step_r47 = ctx.$implicit;
    \u0275\u0275property("nzColor", (step_r47.status == null ? null : step_r47.status.toLowerCase()) === "error" ? "red" : (step_r47.status == null ? null : step_r47.status.toLowerCase()) === "success" ? "green" : "blue");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(4, 12, step_r47.timestamp || step_r47.time, "yyyy-MM-dd HH:mm:ss.SSS"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("nzColor", step_r47.step === "send" ? "blue" : step_r47.step === "dequeue" ? "orange" : step_r47.step === "done" ? "green" : "default");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", step_r47.step, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", step_r47.status);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", step_r47.sourceComponent);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", step_r47.queueOrTopicName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", step_r47.subscriberName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", step_r47.workerName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", step_r47.handlerOrEventName);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", step_r47.details && (step_r47.status == null ? null : step_r47.status.toLowerCase()) !== "error");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", (step_r47.status == null ? null : step_r47.status.toLowerCase()) === "error");
  }
}
function DashboardComponent_ng_template_92_nz_timeline_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-timeline");
    \u0275\u0275template(1, DashboardComponent_ng_template_92_nz_timeline_20_nz_timeline_item_1_Template, 16, 15, "nz-timeline-item", 117);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r46 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", data_r46.history);
  }
}
function DashboardComponent_ng_template_92_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 142);
    \u0275\u0275element(1, "i", 143);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "transloco");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 1, "\u0110ang t\u1EA3i l\u1ECBch s\u1EED chi ti\u1EBFt..."));
  }
}
function DashboardComponent_ng_template_92_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 107)(1, "div", 19)(2, "div", 17)(3, "div", 108)(4, "span", 109);
    \u0275\u0275element(5, "i", 110);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "tot-button", 111);
    \u0275\u0275listener("click", function DashboardComponent_ng_template_92_Template_tot_button_click_8_listener() {
      const data_r46 = \u0275\u0275restoreView(_r45).$implicit;
      const ctx_r10 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r10.copyToClipboard(data_r46.content));
    });
    \u0275\u0275element(9, "i", 112);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "transloco");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "pre", 113);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 17)(15, "h4", 114);
    \u0275\u0275element(16, "i", 29);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 115);
    \u0275\u0275template(20, DashboardComponent_ng_template_92_nz_timeline_20_Template, 2, 1, "nz-timeline", 116)(21, DashboardComponent_ng_template_92_ng_template_21_Template, 5, 3, "ng-template", null, 6, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const data_r46 = ctx.$implicit;
    const loadingHistory_r49 = \u0275\u0275reference(22);
    const ctx_r10 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzGutter", 24);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 10);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 9, "D\u1EEF li\u1EC7u Tin nh\u1EAFn (Payload)"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(11, 11, "Sao ch\xE9p"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r10.formatJson(data_r46.content));
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 14);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(18, 13, "L\u1ECBch s\u1EED d\xF2ng th\u1EDDi gian s\u1EF1 ki\u1EC7n"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", data_r46.history && data_r46.history.length > 0)("ngIfElse", loadingHistory_r49);
  }
}
var _DashboardComponent = class _DashboardComponent {
  constructor() {
    this.dashboardService = inject(DashboardService);
    this.notification = inject(AppNotificationService);
    this.translate = inject(TranslocoService);
    this.modal = inject(NzModalService);
    this.stats = { stats: {}, workerStatus: [] };
    this.queues = [];
    this.allQueues = [];
    this.allTopics = [];
    this.recentTracking = [];
    this.totalTracking = 0;
    this.workerList = [];
    this.errorStats = [];
    this.lastActivityList = [];
    this.loading = false;
    this.activeTab = "queues";
    this.refreshInterval = 0;
    this.refreshIntervals = [
      { label: "0s (Manual)", value: 0 },
      { label: "1s", value: 1e3 },
      { label: "5s", value: 5e3 },
      { label: "10s", value: 1e4 },
      { label: "30s", value: 3e4 },
      { label: "1m", value: 6e4 },
      { label: "5m", value: 3e5 },
      { label: "10m", value: 6e5 },
      { label: "30m", value: 18e5 },
      { label: "1h", value: 36e5 }
    ];
    this.pageIndex = 1;
    this.pageSize = 10;
    this.filters = {
      trackingId: "",
      content: "",
      status: "",
      fromDate: null,
      toDate: null,
      queueOrTopic: "",
      handler: "",
      worker: ""
    };
    this.trackingColumns = [];
    this.queueColumns = [];
    this.topicColumns = [];
    this.workerColumns = [];
    this.activityColumns = [];
    this.destroy$ = new Subject();
  }
  ngOnInit() {
    this.initColumns();
    this.refresh();
  }
  initColumns() {
    this.trackingColumns = [
      { title: "Tracking ID", key: "id", width: "280px" },
      { title: "Tr\u1EA1ng th\xE1i", key: "status", width: "120px", align: "center" },
      { title: "B\u01B0\u1EDBc", key: "step", width: "120px", align: "center" },
      { title: "Ngu\u1ED3n ph\xE1t (Source)", key: "sourceComponent", width: "180px" },
      { title: "K\xEAnh nh\u1EADn (Queue/Topic)", key: "queueOrTopic", width: "180px" },
      { title: "Handler", key: "handler", width: "180px" },
      { title: "Th\u1EDDi gian", key: "time", width: "160px" },
      { title: "H\xE0nh \u0111\u1ED9ng", key: "action", width: "120px", right: true }
    ];
    this.queueColumns = [
      { title: "T\xEAn h\xE0ng \u0111\u1EE3i (Queue)", key: "name", width: "220px", left: true },
      { title: "\u0110ang x\u1EED l\xFD", key: "activeCount", width: "100px", align: "center" },
      { title: "G\u1EEDi TC (Send OK)", key: "sendSuccessCount", width: "120px", align: "center" },
      { title: "G\u1EEDi l\u1ED7i (Send Err)", key: "sendErrorCount", width: "120px", align: "center" },
      { title: "X\u1EED l\xFD TC (Done OK)", key: "doneSuccessCount", width: "120px", align: "center" },
      { title: "X\u1EED l\xFD l\u1ED7i (Done Err)", key: "doneErrorCount", width: "120px", align: "center" },
      { title: "Workers", key: "workers", width: "150px" },
      { title: "Handlers", key: "handlers", width: "200px" },
      { title: "H\xE0nh \u0111\u1ED9ng", key: "action", width: "150px", right: true }
    ];
    this.topicColumns = [
      { title: "T\xEAn ch\u1EE7 \u0111\u1EC1 (Topic)", key: "name", width: "220px", left: true },
      { title: "\u0110ang x\u1EED l\xFD", key: "activeCount", width: "100px", align: "center" },
      { title: "G\u1EEDi TC (Send OK)", key: "sendSuccessCount", width: "120px", align: "center" },
      { title: "G\u1EEDi l\u1ED7i (Send Err)", key: "sendErrorCount", width: "120px", align: "center" },
      { title: "X\u1EED l\xFD TC (Done OK)", key: "doneSuccessCount", width: "120px", align: "center" },
      { title: "X\u1EED l\xFD l\u1ED7i (Done Err)", key: "doneErrorCount", width: "120px", align: "center" },
      { title: "Workers", key: "workers", width: "150px" },
      { title: "Handlers", key: "handlers", width: "200px" },
      { title: "H\xE0nh \u0111\u1ED9ng", key: "action", width: "150px", right: true }
    ];
    this.workerColumns = [
      { title: "T\xEAn Worker", key: "id", width: "200px", left: true },
      { title: "Tr\u1EA1ng th\xE1i", key: "status", width: "120px", align: "center" },
      { title: "Lo\u1EA1i", key: "type", width: "100px", align: "center" },
      { title: "Chi ti\u1EBFt \u0111\xEDch", key: "queueOrTopicName", width: "380px" },
      { title: "H\xE0nh \u0111\u1ED9ng", key: "action", width: "150px", right: true }
    ];
    this.activityColumns = [
      { title: "Lo\u1EA1i", key: "type", width: "120px" },
      { title: "T\xEAn queue / topic", key: "mainName" },
      { title: "Subscriber", key: "subscriberName" },
      { title: "Ho\u1EA1t \u0111\u1ED9ng cu\u1ED1i", key: "lastActive", width: "250px" }
    ];
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onRefreshIntervalChange() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    if (this.refreshInterval > 0) {
      this.refreshSubscription = interval(this.refreshInterval).pipe(takeUntil(this.destroy$)).subscribe(() => this.refresh(true));
    }
  }
  refresh(isAuto = false) {
    if (!isAuto)
      this.loading = true;
    this.dashboardService.getStats().subscribe((res) => {
      this.stats = res;
      this.updateComputedStats();
    });
    this.dashboardService.getQueues().subscribe((res) => {
      this.queues = res;
      this.allQueues = res.filter((q) => q.type === "Queue");
      this.allTopics = res.filter((q) => q.type === "Topic");
      if (!isAuto)
        this.loading = false;
    });
    this.dashboardService.getLastActivity().subscribe((res) => {
      this.lastActivityList = res;
    });
    this.loadTracking();
  }
  loadTracking() {
    const params = __spreadValues({
      page: this.pageIndex,
      pageSize: this.pageSize
    }, this.filters);
    if (params.fromDate)
      params.fromDate = params.fromDate.toISOString();
    if (params.toDate)
      params.toDate = params.toDate.toISOString();
    this.dashboardService.getRecentTracking(params).subscribe((res) => {
      this.recentTracking = res.items;
      this.totalTracking = res.total;
    });
  }
  onFilterChange() {
    this.pageIndex = 1;
    this.loadTracking();
  }
  resetFilters() {
    this.filters = {
      trackingId: "",
      content: "",
      status: "",
      fromDate: null,
      toDate: null,
      queueOrTopic: "",
      handler: "",
      worker: ""
    };
    this.onFilterChange();
  }
  onQueryParamsChange(params) {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadTracking();
  }
  get runningWorkersCount() {
    return this.workerList.filter((w) => w.status === "Running").length;
  }
  get stoppedWorkersCount() {
    return this.workerList.filter((w) => w.status !== "Running").length;
  }
  updateComputedStats() {
    this.workerList = this.stats.workerStatus;
    this.errorStats = Object.entries(this.stats.stats).filter(([key]) => key.startsWith("error:")).map(([key, value]) => ({
      name: key.replace("error:", ""),
      count: value
    })).sort((a, b) => b.count - a.count);
  }
  toggleWorker(workerId, currentStatus) {
    const action = currentStatus === "Running" ? this.dashboardService.stopWorker(workerId) : this.dashboardService.startWorker(workerId);
    action.subscribe(() => {
      const key = currentStatus === "Running" ? "NOTIFICATIONS.WORKER_STOPPED" : "NOTIFICATIONS.WORKER_STARTED";
      this.notification.success(this.translate.translate("Th\xE0nh c\xF4ng"), this.translate.translate(key, { id: workerId }));
      this.refresh();
    });
  }
  viewDetails(queue) {
    if (queue.type === "Topic") {
      this.modal.create({
        nzTitle: `${this.translate.translate("Chi ti\u1EBFt Topic")}: ${queue.name}`,
        nzContent: TopicDetailComponent,
        nzData: { topic: queue },
        nzWidth: "80%",
        nzFooter: null
      });
    } else {
      this.modal.create({
        nzTitle: `${this.translate.translate("Chi ti\u1EBFt H\xE0ng \u0111\u1EE3i")}: ${queue.name}`,
        nzContent: MessageListComponent,
        nzData: { inputQueueName: queue.name },
        nzWidth: "80%",
        nzFooter: null
      });
    }
  }
  viewInProgress(queue) {
    if (queue.type === "Topic") {
      this.modal.create({
        nzTitle: `${this.translate.translate("\u0110ang x\u1EED l\xFD Topic")}: ${queue.name}`,
        nzContent: TopicDetailComponent,
        nzData: { topic: queue, showInProgress: true },
        nzWidth: "80%",
        nzFooter: null
      });
    } else {
      this.modal.create({
        nzTitle: `${this.translate.translate("\u0110ang x\u1EED l\xFD H\xE0ng \u0111\u1EE3i")}: ${queue.name}`,
        nzContent: MessageListComponent,
        nzData: { inputQueueName: `${queue.name}:processing` },
        nzWidth: "80%",
        nzFooter: null
      });
    }
  }
  formatJson(json) {
    if (!json)
      return "";
    try {
      const obj = typeof json === "string" ? JSON.parse(json) : json;
      return JSON.stringify(obj, null, 2);
    } catch {
      return json;
    }
  }
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.notification.success(this.translate.translate("Th\xE0nh c\xF4ng"), this.translate.translate("\u0110\xE3 sao ch\xE9p v\xE0o b\u1ED9 nh\u1EDB t\u1EA1m"));
    });
  }
  retryTracking(item) {
    this.modal.confirm({
      nzTitle: this.translate.translate("X\xE1c nh\u1EADn g\u1EEDi l\u1EA1i"),
      nzContent: this.translate.translate("B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n g\u1EEDi l\u1EA1i tin nh\u1EAFn n\xE0y?"),
      nzOnOk: () => {
        this.dashboardService.resendTracking(item.id).subscribe({
          next: () => {
            this.notification.success(this.translate.translate("Th\xE0nh c\xF4ng"), this.translate.translate("Tin nh\u1EAFn \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi l\u1EA1i"));
            this.refresh();
          },
          error: (err) => {
            var _a;
            this.notification.error(this.translate.translate("Th\u1EA5t b\u1EA1i"), ((_a = err.error) == null ? void 0 : _a.message) || "L\u1ED7i khi g\u1EEDi l\u1EA1i tin nh\u1EAFn");
          }
        });
      }
    });
  }
  deleteTracking(item) {
    this.modal.confirm({
      nzTitle: this.translate.translate("X\xE1c nh\u1EADn x\xF3a"),
      nzContent: this.translate.translate("B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a message n\xE0y? (D\u1EEF li\u1EC7u log tracking s\u1EBD b\u1ECB x\xF3a)"),
      nzOnOk: () => {
        this.dashboardService.deleteTracking(item.id).subscribe(() => {
          this.notification.success(this.translate.translate("Th\xE0nh c\xF4ng"), this.translate.translate("\u0110\xE3 x\xF3a log message"));
          this.loadTracking();
        });
      }
    });
  }
  onRowExpand(event) {
    if (event.expanded && (!event.item.history || event.item.history.length === 0)) {
      this.dashboardService.getTracking(event.item.id).subscribe({
        next: (history) => {
          event.item.history = history;
        },
        error: () => {
          this.notification.error(this.translate.translate("L\u1ED7i"), this.translate.translate("Kh\xF4ng th\u1EC3 t\u1EA3i l\u1ECBch s\u1EED chi ti\u1EBFt cho ID n\xE0y"));
        }
      });
    }
  }
  toggleExpand(item) {
    item.expand = !item.expand;
    this.onRowExpand({ item, expanded: item.expand });
  }
  shortenNamespace(name) {
    if (!name)
      return "-";
    const parts = name.split(".");
    return parts[parts.length - 1];
  }
  calculateLoad(length) {
    if (length <= 0)
      return 0;
    const max = 100;
    const percent = length / max * 100;
    return Math.min(percent, 100);
  }
};
_DashboardComponent.\u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardComponent)();
};
_DashboardComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 94, vars: 121, consts: [["titleQueue", ""], ["titleTopic", ""], ["titleWorkers", ""], ["expandTpl", ""], ["prefixSearch", ""], ["errorItem", ""], ["loadingHistory", ""], [1, "dashboard-container"], [1, "site-page-header", 3, "nzTitle"], [2, "display", "flex", "align-items", "center", "gap", "16px"], [2, "display", "flex", "align-items", "center", "gap", "8px"], [2, "color", "#999"], [2, "width", "120px", 3, "ngModelChange", "ngModel"], [3, "nzLabel", "nzValue", 4, "ngFor", "ngForOf"], ["nzType", "primary", 3, "click", "loading"], ["nz-icon", "", "nzType", "reload"], ["nz-row", "", 1, "stats-row", 2, "margin-bottom", "24px", 3, "nzGutter"], ["nz-col", "", 3, "nzSpan"], ["nzHoverable", "", 3, "nzTitle"], ["nz-row", "", 3, "nzGutter"], ["nz-col", "", 2, "margin-bottom", "8px", 3, "nzSpan"], [3, "nzValue", "nzTitle", "nzValueStyle"], [1, "tab-actions", 2, "margin-bottom", "16px", "display", "flex", "justify-content", "center"], ["nzButtonStyle", "solid", "nzSize", "large", 3, "ngModelChange", "ngModel"], ["nz-radio-button", "", "nzValue", "queues"], ["nz-icon", "", "nzType", "database"], ["nz-radio-button", "", "nzValue", "topics"], ["nz-icon", "", "nzType", "cluster"], ["nz-radio-button", "", "nzValue", "tracking"], ["nz-icon", "", "nzType", "history"], ["nz-radio-button", "", "nzValue", "workers"], ["nz-icon", "", "nzType", "api"], ["nz-radio-button", "", "nzValue", "activity"], ["nz-icon", "", "nzType", "clock-circle"], [3, "ngSwitch"], [4, "ngSwitchCase"], [3, "nzLabel", "nzValue"], [2, "font-weight", "bold", "color", "#1890ff"], [2, "font-weight", "bold", "color", "#722ed1"], [2, "font-weight", "bold", "color", "#13c2c2"], [3, "nzTitle"], [3, "data", "columns", "loading", "pageSize", "frontPagination", "showPagination", "scroll"], ["totCell", "activeCount"], ["totCell", "sendSuccessCount"], ["totCell", "sendErrorCount"], ["totCell", "doneSuccessCount"], ["totCell", "doneErrorCount"], ["totCell", "workers"], ["totCell", "handlers"], ["totCell", "action"], ["nzColor", "processing"], ["nzColor", "success"], ["nzColor", "error"], [1, "worker-tags"], ["nzColor", "processing", 4, "ngFor", "ngForOf"], [1, "handler-grid"], ["class", "handler-tag-item", 4, "ngFor", "ngForOf"], [1, "handler-tag-item"], [1, "h-name", 3, "nz-tooltip"], [1, "m-name", 3, "nz-tooltip"], [2, "display", "flex", "gap", "4px", "flex-direction", "column"], ["nzType", "primary", "nzSize", "small", 3, "click", "nzGhost"], ["nzType", "default", "nzSize", "small", 3, "click"], [1, "filters-container", 2, "margin-bottom", "24px"], [3, "nzPrefix"], ["type", "text", "nz-input", "", 3, "ngModelChange", "ngModel", "placeholder"], ["nzAllowClear", "", 2, "width", "100%", 3, "ngModelChange", "ngModel", "nzPlaceHolder"], ["nzValue", "success", 3, "nzLabel"], ["nzValue", "error", 3, "nzLabel"], ["nzValue", "processing", 3, "nzLabel"], [2, "display", "flex", "gap", "8px"], [2, "flex", "1", 3, "ngModelChange", "ngModel", "nzPlaceHolder"], [3, "click", "nzBlock"], [3, "queryParamsChange", "expandChange", "data", "columns", "loading", "total", "pageIndex", "pageSize", "frontPagination", "expandTemplate", "scroll"], ["totCell", "id"], ["totCell", "status"], ["totCell", "step"], ["totCell", "sourceComponent"], ["totCell", "queueOrTopic"], ["totCell", "handler"], ["totCell", "time"], ["nz-icon", "", "nzType", "search"], [1, "id-text", 3, "title"], [3, "nzColor"], [1, "namespace-text", 3, "nz-tooltip"], [1, "queue-name", 3, "nz-tooltip"], ["nzSize", "small", "nzType", "link", "nz-tooltip", "", 3, "click", "nzTooltipTitle"], ["nz-icon", "", "nzType", "rollback"], ["nzSize", "small", "nzType", "link", "nz-tooltip", "", 3, "click", "nzDanger", "nzTooltipTitle"], ["nz-icon", "", "nzType", "delete"], ["nzSize", "small", "nzType", "link", 3, "click"], ["nz-icon", "", 3, "nzType"], [3, "data", "columns", "pageSize", "frontPagination", "showPagination", "scroll"], [2, "margin-top", "24px", 3, "nzTitle"], ["nzBordered", "", 3, "nzDataSource", "nzRenderItem"], ["class", "empty-state", 4, "ngIf"], [3, "click", "nzType", "nzDanger"], [2, "color", "#ff4d4f", "font-weight", "bold"], ["nzColor", "red"], [1, "empty-state"], ["nz-icon", "", "nzType", "check-circle", 2, "font-size", "48px", "color", "#52c41a"], [2, "margin-top", "16px"], ["nzSize", "middle", 3, "data", "columns", "pageSize", "frontPagination", "showPagination"], ["totCell", "type"], ["totCell", "lastActive"], [3, "nz-tooltip"], [2, "color", "#999", "font-size", "12px", "margin-left", "8px"], [1, "json-viewer-container", 2, "width", "100%", "padding", "24px", "border-radius", "8px", "border", "1px solid #f0f0f0", "background", "#fff"], [1, "json-header", 2, "margin-bottom", "12px", "display", "flex", "justify-content", "space-between", "align-items", "center"], [2, "font-weight", "600", "font-size", "14px", "color", "#1890ff"], ["nz-icon", "", "nzType", "code"], ["nzSize", "small", "nzType", "default", 3, "click"], ["nz-icon", "", "nzType", "copy"], [1, "json-content", 2, "max-height", "480px", "border-radius", "6px", "box-shadow", "inset 0 2px 8px rgba(0,0,0,0.15)"], [2, "font-weight", "600", "font-size", "15px", "margin-bottom", "20px", "color", "#1890ff"], [1, "timeline-wrapper", 2, "max-height", "480px", "overflow-y", "auto", "padding-right", "8px"], [4, "ngIf", "ngIfElse"], [3, "nzColor", 4, "ngFor", "ngForOf"], [2, "display", "flex", "align-items", "center", "gap", "12px", "margin-bottom", "6px"], [2, "font-weight", "bold", "font-family", "monospace", "font-size", "12px", "color", "#888"], [3, "nzColor", 4, "ngIf"], [1, "timeline-body-content", 2, "background", "rgba(0,0,0,0.02)", "padding", "12px", "border-radius", "6px", "border-left", "3px solid #d9d9d9", "margin-bottom", "12px"], ["class", "context-row", "style", "margin-bottom: 4px; font-size: 12px;", 4, "ngIf"], ["class", "details-row", "style", "margin-top: 6px; font-size: 12px; color: #555;", 4, "ngIf"], ["class", "error-detail-banner", "style", "margin-top: 8px; padding: 12px; background: #fff1f0; border: 1px solid #ffa39e; border-radius: 4px; border-left: 4px solid #ff4d4f;", 4, "ngIf"], [1, "context-row", 2, "margin-bottom", "4px", "font-size", "12px"], [2, "color", "#666", "font-weight", "500"], [2, "color", "#c41d7f", 3, "nz-tooltip"], [2, "color", "#096dd9"], [2, "color", "#722ed1"], ["style", "color: #888; font-size: 11px; margin-left: 6px;", 4, "ngIf"], [2, "color", "#888", "font-size", "11px", "margin-left", "6px"], [2, "color", "#d46b08"], [2, "color", "#389e0d", 3, "nz-tooltip"], [1, "details-row", 2, "margin-top", "6px", "font-size", "12px", "color", "#555"], ["nz-icon", "", "nzType", "info-circle", 2, "color", "#1890ff", "margin-right", "4px"], [1, "error-detail-banner", 2, "margin-top", "8px", "padding", "12px", "background", "#fff1f0", "border", "1px solid #ffa39e", "border-radius", "4px", "border-left", "4px solid #ff4d4f"], [2, "display", "flex", "justify-content", "space-between", "align-items", "center", "margin-bottom", "6px"], [2, "font-weight", "600", "color", "#cf1322"], ["nz-icon", "", "nzType", "warning", "nzTheme", "fill"], ["nzSize", "small", "nzType", "default", 3, "click", "nzDanger"], [2, "margin", "0", "padding", "8px", "background", "#141414", "color", "#ffccc7", "font-size", "11px", "max-height", "200px", "overflow", "auto", "border-radius", "4px", "font-family", "'Consolas', monospace", "white-space", "pre-wrap", "word-break", "break-all"], [2, "display", "flex", "flex-direction", "column", "align-items", "center", "justify-content", "center", "height", "200px", "color", "#999"], ["nz-icon", "", "nzType", "loading", 2, "font-size", "32px", "color", "#1890ff", "margin-bottom", "12px"]], template: function DashboardComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "nz-page-header", 8);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementStart(3, "nz-page-header-extra")(4, "div", 9)(5, "div", 10)(6, "span", 11);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "nz-select", 12);
    \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_nz_select_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.refreshInterval, $event) || (ctx.refreshInterval = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function DashboardComponent_Template_nz_select_ngModelChange_9_listener() {
      return ctx.onRefreshIntervalChange();
    });
    \u0275\u0275template(10, DashboardComponent_nz_option_10_Template, 2, 4, "nz-option", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "tot-button", 14);
    \u0275\u0275listener("click", function DashboardComponent_Template_tot_button_click_11_listener() {
      return ctx.refresh();
    });
    \u0275\u0275element(12, "i", 15);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "transloco");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(15, "div", 16)(16, "div", 17)(17, "nz-card", 18);
    \u0275\u0275template(18, DashboardComponent_ng_template_18_Template, 4, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(20, "div", 19)(21, "div", 20);
    \u0275\u0275element(22, "nz-statistic", 21);
    \u0275\u0275pipe(23, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 20);
    \u0275\u0275element(25, "nz-statistic", 21);
    \u0275\u0275pipe(26, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 17);
    \u0275\u0275element(28, "nz-statistic", 21);
    \u0275\u0275pipe(29, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 17);
    \u0275\u0275element(31, "nz-statistic", 21);
    \u0275\u0275pipe(32, "transloco");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(33, "div", 17)(34, "nz-card", 18);
    \u0275\u0275template(35, DashboardComponent_ng_template_35_Template, 4, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(37, "div", 19)(38, "div", 20);
    \u0275\u0275element(39, "nz-statistic", 21);
    \u0275\u0275pipe(40, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 20);
    \u0275\u0275element(42, "nz-statistic", 21);
    \u0275\u0275pipe(43, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 17);
    \u0275\u0275element(45, "nz-statistic", 21);
    \u0275\u0275pipe(46, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 17);
    \u0275\u0275element(48, "nz-statistic", 21);
    \u0275\u0275pipe(49, "transloco");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(50, "div", 17)(51, "nz-card", 18);
    \u0275\u0275template(52, DashboardComponent_ng_template_52_Template, 4, 3, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(54, "div", 19)(55, "div", 20);
    \u0275\u0275element(56, "nz-statistic", 21);
    \u0275\u0275pipe(57, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div", 20);
    \u0275\u0275element(59, "nz-statistic", 21);
    \u0275\u0275pipe(60, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "div", 17);
    \u0275\u0275element(62, "nz-statistic", 21);
    \u0275\u0275pipe(63, "transloco");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(64, "div", 22)(65, "nz-radio-group", 23);
    \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_Template_nz_radio_group_ngModelChange_65_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.activeTab, $event) || (ctx.activeTab = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(66, "label", 24);
    \u0275\u0275element(67, "i", 25);
    \u0275\u0275text(68);
    \u0275\u0275pipe(69, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "label", 26);
    \u0275\u0275element(71, "i", 27);
    \u0275\u0275text(72);
    \u0275\u0275pipe(73, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "label", 28);
    \u0275\u0275element(75, "i", 29);
    \u0275\u0275text(76);
    \u0275\u0275pipe(77, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "label", 30);
    \u0275\u0275element(79, "i", 31);
    \u0275\u0275text(80);
    \u0275\u0275pipe(81, "transloco");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "label", 32);
    \u0275\u0275element(83, "i", 33);
    \u0275\u0275text(84);
    \u0275\u0275pipe(85, "transloco");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerStart(86, 34);
    \u0275\u0275template(87, DashboardComponent_div_87_Template, 12, 11, "div", 35)(88, DashboardComponent_div_88_Template, 12, 11, "div", 35)(89, DashboardComponent_div_89_Template, 39, 48, "div", 35)(90, DashboardComponent_div_90_Template, 15, 19, "div", 35)(91, DashboardComponent_div_91_Template, 6, 8, "div", 35);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(92, DashboardComponent_ng_template_92_Template, 23, 15, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const titleQueue_r50 = \u0275\u0275reference(19);
    const titleTopic_r51 = \u0275\u0275reference(36);
    const titleWorkers_r52 = \u0275\u0275reference(53);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(2, 72, "CQRS Dashboard"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(8, 74, "T\u1EF1 \u0111\u1ED9ng l\xE0m m\u1EDBi"), ":");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx.refreshInterval);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.refreshIntervals);
    \u0275\u0275advance();
    \u0275\u0275property("loading", ctx.loading);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(14, 76, "L\xE0m m\u1EDBi"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("nzGutter", 16);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 9);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", titleQueue_r50);
    \u0275\u0275advance(3);
    \u0275\u0275property("nzGutter", 16);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 12);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", ctx.stats.stats["queue_send_success"] || 0)("nzTitle", \u0275\u0275pipeBind1(23, 78, "G\u1EEDi th\xE0nh c\xF4ng"))("nzValueStyle", \u0275\u0275pureFunction0(110, _c06));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 12);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", ctx.stats.stats["queue_send_error"] || 0)("nzTitle", \u0275\u0275pipeBind1(26, 80, "G\u1EEDi l\u1ED7i"))("nzValueStyle", \u0275\u0275pureFunction0(111, _c14));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 12);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", ctx.stats.stats["queue_done_success"] || 0)("nzTitle", \u0275\u0275pipeBind1(29, 82, "X\u1EED l\xFD th\xE0nh c\xF4ng"))("nzValueStyle", \u0275\u0275pureFunction0(112, _c22));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 12);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", ctx.stats.stats["queue_done_error"] || 0)("nzTitle", \u0275\u0275pipeBind1(32, 84, "X\u1EED l\xFD l\u1ED7i"))("nzValueStyle", \u0275\u0275pureFunction0(113, _c32));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 9);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", titleTopic_r51);
    \u0275\u0275advance(3);
    \u0275\u0275property("nzGutter", 16);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 12);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", ctx.stats.stats["topic_send_success"] || 0)("nzTitle", \u0275\u0275pipeBind1(40, 86, "G\u1EEDi th\xE0nh c\xF4ng"))("nzValueStyle", \u0275\u0275pureFunction0(114, _c06));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 12);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", ctx.stats.stats["topic_send_error"] || 0)("nzTitle", \u0275\u0275pipeBind1(43, 88, "G\u1EEDi l\u1ED7i"))("nzValueStyle", \u0275\u0275pureFunction0(115, _c14));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 12);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", ctx.stats.stats["topic_done_success"] || 0)("nzTitle", \u0275\u0275pipeBind1(46, 90, "X\u1EED l\xFD th\xE0nh c\xF4ng"))("nzValueStyle", \u0275\u0275pureFunction0(116, _c22));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 12);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", ctx.stats.stats["topic_done_error"] || 0)("nzTitle", \u0275\u0275pipeBind1(49, 92, "X\u1EED l\xFD l\u1ED7i"))("nzValueStyle", \u0275\u0275pureFunction0(117, _c32));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 6);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", titleWorkers_r52);
    \u0275\u0275advance(3);
    \u0275\u0275property("nzGutter", 16);
    \u0275\u0275advance();
    \u0275\u0275property("nzSpan", 12);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", ctx.runningWorkersCount)("nzTitle", \u0275\u0275pipeBind1(57, 94, "\u0110ang ch\u1EA1y"))("nzValueStyle", \u0275\u0275pureFunction0(118, _c06));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 12);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", ctx.stoppedWorkersCount)("nzTitle", \u0275\u0275pipeBind1(60, 96, "\u0110\xE3 d\u1EEBng"))("nzValueStyle", \u0275\u0275pureFunction0(119, _c42));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 24);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", ctx.workerList.length)("nzTitle", \u0275\u0275pipeBind1(63, 98, "T\u1ED5ng s\u1ED1"))("nzValueStyle", \u0275\u0275pureFunction0(120, _c52));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx.activeTab);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(69, 100, "H\xE0ng \u0111\u1EE3i (Queue)"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(73, 102, "Ch\u1EE7 \u0111\u1EC1 (Topic)"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(77, 104, "Theo d\xF5i g\u1EA7n \u0111\xE2y"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(81, 106, "Tr\u1EA1ng th\xE1i Workers"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(85, 108, "Ho\u1EA1t \u0111\u1ED9ng cu\u1ED1i"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngSwitch", ctx.activeTab);
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "queues");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "topics");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "tracking");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "workers");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "activity");
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NzPageHeaderModule,
  NzPageHeaderComponent,
  NzPageHeaderExtraDirective,
  NzButtonModule,
  NzTransitionPatchDirective,
  NzCardModule,
  NzCardComponent,
  NzStatisticModule,
  NzStatisticComponent,
  NzTableModule,
  NzTagModule,
  NzTagComponent,
  NzDividerModule,
  NzGridModule,
  NzColDirective,
  NzRowDirective,
  NzIconModule,
  NzIconDirective,
  NzListModule,
  NzListComponent,
  NzListItemComponent,
  NzInputModule,
  NzInputDirective,
  NzInputGroupComponent,
  NzInputGroupWhitSuffixOrPrefixDirective,
  NzProgressModule,
  NzModalModule,
  NzSpaceModule,
  NzSelectModule,
  NzOptionComponent,
  NzSelectComponent,
  NzDatePickerModule,
  NzDatePickerComponent,
  NzTooltipModule,
  NzTooltipDirective,
  NzRadioModule,
  NzRadioComponent,
  NzRadioGroupComponent,
  NzTimelineModule,
  NzTimelineItemComponent,
  NzTimelineComponent,
  FormsModule,
  DefaultValueAccessor,
  NgControlStatus,
  NgModel,
  TranslocoModule,
  TotButtonComponent,
  TotTableComponent,
  TotCellDirective,
  DatePipe,
  TranslocoPipe
], styles: ['\n.dashboard-container[_ngcontent-%COMP%] {\n  padding: 0;\n}\nnz-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\n.queue-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1890ff;\n  font-family: "Consolas", monospace;\n}\n.worker-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\n.handler-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.handler-item[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.handler-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #52c41a;\n}\n.message-name[_ngcontent-%COMP%] {\n  color: #999;\n  margin-left: 4px;\n}\n.filters-container[_ngcontent-%COMP%] {\n  background: #fbfbfb;\n  padding: 16px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  border: 1px solid #f0f0f0;\n}\n.id-text[_ngcontent-%COMP%] {\n  font-family: monospace;\n  font-size: 11px;\n  color: #666;\n  background: #f5f5f5;\n  padding: 2px 4px;\n  border-radius: 3px;\n  cursor: help;\n}\n.meta-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #666;\n  word-break: break-all;\n}\n.json-viewer-container[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: #fdfdfd;\n  border: 1px solid #f0f0f0;\n  border-top: none;\n}\n.json-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n  font-weight: bold;\n  color: #1890ff;\n}\n.json-content[_ngcontent-%COMP%] {\n  background: #1e1e1e;\n  color: #d4d4d4;\n  padding: 16px;\n  border-radius: 4px;\n  font-family: "Consolas", monospace;\n  font-size: 12px;\n  max-height: 400px;\n  overflow: auto;\n  margin: 0;\n}\n[nz-theme="dark"][_nghost-%COMP%]   .json-viewer-container[_ngcontent-%COMP%], [nz-theme="dark"]   [_nghost-%COMP%]   .json-viewer-container[_ngcontent-%COMP%] {\n  background: #141414;\n  border-color: #303030;\n}\n[nz-theme="dark"][_nghost-%COMP%]   .filters-container[_ngcontent-%COMP%], [nz-theme="dark"]   [_nghost-%COMP%]   .filters-container[_ngcontent-%COMP%] {\n  background: #1f1f1f;\n  border-color: #303030;\n}\n[nz-theme="dark"][_nghost-%COMP%]   .id-text[_ngcontent-%COMP%], [nz-theme="dark"]   [_nghost-%COMP%]   .id-text[_ngcontent-%COMP%] {\n  background: #262626;\n  color: #aaa;\n}\n.handler-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.handler-tag-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  padding: 4px 8px;\n  background: #f6f8fa;\n  border-radius: 4px;\n  border-left: 3px solid #52c41a;\n  font-size: 12px;\n}\n.h-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2c3e50;\n}\n.m-name[_ngcontent-%COMP%] {\n  color: #7f8c8d;\n  font-family: "Consolas", monospace;\n  font-size: 11px;\n}\n[nz-theme="dark"][_nghost-%COMP%]   .handler-tag-item[_ngcontent-%COMP%], [nz-theme="dark"]   [_nghost-%COMP%]   .handler-tag-item[_ngcontent-%COMP%] {\n  background: #262626;\n  border-left-color: #3f8600;\n}\n[nz-theme="dark"][_nghost-%COMP%]   .h-name[_ngcontent-%COMP%], [nz-theme="dark"]   [_nghost-%COMP%]   .h-name[_ngcontent-%COMP%] {\n  color: #ecf0f1;\n}\n[nz-theme="dark"][_nghost-%COMP%]   .m-name[_ngcontent-%COMP%], [nz-theme="dark"]   [_nghost-%COMP%]   .m-name[_ngcontent-%COMP%] {\n  color: #bdc3c7;\n}\n.namespace-text[_ngcontent-%COMP%] {\n  font-family: "Consolas", monospace;\n  font-size: 11px;\n  background: rgba(24, 144, 255, 0.05);\n  color: #1890ff;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid rgba(24, 144, 255, 0.15);\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  max-width: 160px;\n  display: inline-block;\n  cursor: help;\n  vertical-align: middle;\n}\n[nz-theme="dark"][_nghost-%COMP%]   .namespace-text[_ngcontent-%COMP%], [nz-theme="dark"]   [_nghost-%COMP%]   .namespace-text[_ngcontent-%COMP%] {\n  background: rgba(24, 144, 255, 0.08);\n  border-color: rgba(24, 144, 255, 0.25);\n  color: #177ddc;\n}\n.context-row[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  font-family: "Consolas", monospace;\n  padding: 2px 5px;\n  border-radius: 3px;\n  font-size: 11px;\n  background: rgba(0, 0, 0, 0.04);\n}\n[nz-theme="dark"][_nghost-%COMP%]   .context-row[_ngcontent-%COMP%]   code[_ngcontent-%COMP%], [nz-theme="dark"]   [_nghost-%COMP%]   .context-row[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.08);\n}\n.timeline-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.timeline-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.timeline-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(0, 0, 0, 0.15);\n  border-radius: 3px;\n}\n.timeline-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: rgba(0, 0, 0, 0.3);\n}\n[nz-theme="dark"][_nghost-%COMP%]   .timeline-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, [nz-theme="dark"]   [_nghost-%COMP%]   .timeline-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.2);\n}\n[nz-theme="dark"][_nghost-%COMP%]   .timeline-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover, [nz-theme="dark"]   [_nghost-%COMP%]   .timeline-wrapper[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.4);\n}\n[nz-theme="dark"][_nghost-%COMP%]   .json-viewer-container[_ngcontent-%COMP%], [nz-theme="dark"]   [_nghost-%COMP%]   .json-viewer-container[_ngcontent-%COMP%] {\n  background: #141414 !important;\n  border-color: #303030 !important;\n}\n[nz-theme="dark"][_nghost-%COMP%]   .timeline-body-content[_ngcontent-%COMP%], [nz-theme="dark"]   [_nghost-%COMP%]   .timeline-body-content[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.02) !important;\n  border-left-color: #434343 !important;\n}\n[nz-theme="dark"][_nghost-%COMP%]   .error-detail-banner[_ngcontent-%COMP%], [nz-theme="dark"]   [_nghost-%COMP%]   .error-detail-banner[_ngcontent-%COMP%] {\n  background: #2a1215 !important;\n  border-color: #5c0011 !important;\n  border-left-color: #a61d24 !important;\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] });
var DashboardComponent = _DashboardComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [
      CommonModule,
      NzPageHeaderModule,
      NzButtonModule,
      NzCardModule,
      NzStatisticModule,
      NzTableModule,
      NzTagModule,
      NzDividerModule,
      NzGridModule,
      NzIconModule,
      NzListModule,
      NzInputModule,
      NzProgressModule,
      NzModalModule,
      NzSpaceModule,
      NzSelectModule,
      NzDatePickerModule,
      NzTooltipModule,
      NzRadioModule,
      NzTimelineModule,
      FormsModule,
      TranslocoModule,
      TotButtonComponent,
      TotTableComponent,
      TotCellDirective
    ], template: `<div class="dashboard-container">
  <nz-page-header class="site-page-header" [nzTitle]="'CQRS Dashboard' | transloco">
    <nz-page-header-extra>
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: #999;">{{ 'T\u1EF1 \u0111\u1ED9ng l\xE0m m\u1EDBi' | transloco }}:</span>
          <nz-select [(ngModel)]="refreshInterval" (ngModelChange)="onRefreshIntervalChange()" style="width: 120px;">
            <nz-option *ngFor="let i of refreshIntervals" [nzLabel]="i.label | transloco" [nzValue]="i.value"></nz-option>
          </nz-select>
        </div>
        <tot-button nzType="primary" (click)="refresh()" [loading]="loading">
          <i nz-icon nzType="reload"></i> {{ 'L\xE0m m\u1EDBi' | transloco }}
        </tot-button>
      </div>
    </nz-page-header-extra>
  </nz-page-header>

  <div nz-row [nzGutter]="16" class="stats-row" style="margin-bottom: 24px;">
    <!-- Queue Overview -->
    <div nz-col [nzSpan]="9">
      <nz-card [nzTitle]="titleQueue" nzHoverable>
        <ng-template #titleQueue>
          <span style="font-weight: bold; color: #1890ff;">
            <i nz-icon nzType="database"></i> {{ 'H\xE0ng \u0111\u1EE3i (Queue)' | transloco }}
          </span>
        </ng-template>
        <div nz-row [nzGutter]="16">
          <div nz-col [nzSpan]="12" style="margin-bottom: 8px;">
            <nz-statistic [nzValue]="stats.stats['queue_send_success'] || 0" [nzTitle]="'G\u1EEDi th\xE0nh c\xF4ng' | transloco" [nzValueStyle]="{ color: '#52c41a' }"></nz-statistic>
          </div>
          <div nz-col [nzSpan]="12" style="margin-bottom: 8px;">
            <nz-statistic [nzValue]="stats.stats['queue_send_error'] || 0" [nzTitle]="'G\u1EEDi l\u1ED7i' | transloco" [nzValueStyle]="{ color: '#ff4d4f' }"></nz-statistic>
          </div>
          <div nz-col [nzSpan]="12">
            <nz-statistic [nzValue]="stats.stats['queue_done_success'] || 0" [nzTitle]="'X\u1EED l\xFD th\xE0nh c\xF4ng' | transloco" [nzValueStyle]="{ color: '#2f54eb' }"></nz-statistic>
          </div>
          <div nz-col [nzSpan]="12">
            <nz-statistic [nzValue]="stats.stats['queue_done_error'] || 0" [nzTitle]="'X\u1EED l\xFD l\u1ED7i' | transloco" [nzValueStyle]="{ color: '#f5222d' }"></nz-statistic>
          </div>
        </div>
      </nz-card>
    </div>

    <!-- Topic Overview -->
    <div nz-col [nzSpan]="9">
      <nz-card [nzTitle]="titleTopic" nzHoverable>
        <ng-template #titleTopic>
          <span style="font-weight: bold; color: #722ed1;">
            <i nz-icon nzType="cluster"></i> {{ 'Ch\u1EE7 \u0111\u1EC1 (Topic)' | transloco }}
          </span>
        </ng-template>
        <div nz-row [nzGutter]="16">
          <div nz-col [nzSpan]="12" style="margin-bottom: 8px;">
            <nz-statistic [nzValue]="stats.stats['topic_send_success'] || 0" [nzTitle]="'G\u1EEDi th\xE0nh c\xF4ng' | transloco" [nzValueStyle]="{ color: '#52c41a' }"></nz-statistic>
          </div>
          <div nz-col [nzSpan]="12" style="margin-bottom: 8px;">
            <nz-statistic [nzValue]="stats.stats['topic_send_error'] || 0" [nzTitle]="'G\u1EEDi l\u1ED7i' | transloco" [nzValueStyle]="{ color: '#ff4d4f' }"></nz-statistic>
          </div>
          <div nz-col [nzSpan]="12">
            <nz-statistic [nzValue]="stats.stats['topic_done_success'] || 0" [nzTitle]="'X\u1EED l\xFD th\xE0nh c\xF4ng' | transloco" [nzValueStyle]="{ color: '#2f54eb' }"></nz-statistic>
          </div>
          <div nz-col [nzSpan]="12">
            <nz-statistic [nzValue]="stats.stats['topic_done_error'] || 0" [nzTitle]="'X\u1EED l\xFD l\u1ED7i' | transloco" [nzValueStyle]="{ color: '#f5222d' }"></nz-statistic>
          </div>
        </div>
      </nz-card>
    </div>

    <!-- Workers Overview -->
    <div nz-col [nzSpan]="6">
      <nz-card [nzTitle]="titleWorkers" nzHoverable>
        <ng-template #titleWorkers>
          <span style="font-weight: bold; color: #13c2c2;">
            <i nz-icon nzType="api"></i> {{ 'Tr\u1EA1ng th\xE1i Workers' | transloco }}
          </span>
        </ng-template>
        <div nz-row [nzGutter]="16">
          <div nz-col [nzSpan]="12" style="margin-bottom: 8px;">
            <nz-statistic [nzValue]="runningWorkersCount" [nzTitle]="'\u0110ang ch\u1EA1y' | transloco" [nzValueStyle]="{ color: '#52c41a' }"></nz-statistic>
          </div>
          <div nz-col [nzSpan]="12" style="margin-bottom: 8px;">
            <nz-statistic [nzValue]="stoppedWorkersCount" [nzTitle]="'\u0110\xE3 d\u1EEBng' | transloco" [nzValueStyle]="{ color: '#bfbfbf' }"></nz-statistic>
          </div>
          <div nz-col [nzSpan]="24">
            <nz-statistic [nzValue]="workerList.length" [nzTitle]="'T\u1ED5ng s\u1ED1' | transloco" [nzValueStyle]="{ color: '#13c2c2' }"></nz-statistic>
          </div>
        </div>
      </nz-card>
    </div>
  </div>

  <div class="tab-actions" style="margin-bottom: 16px; display: flex; justify-content: center;">
    <nz-radio-group [(ngModel)]="activeTab" nzButtonStyle="solid" nzSize="large">
      <label nz-radio-button nzValue="queues"><i nz-icon nzType="database"></i> {{ 'H\xE0ng \u0111\u1EE3i (Queue)' | transloco }}</label>
      <label nz-radio-button nzValue="topics"><i nz-icon nzType="cluster"></i> {{ 'Ch\u1EE7 \u0111\u1EC1 (Topic)' | transloco }}</label>
      <label nz-radio-button nzValue="tracking"><i nz-icon nzType="history"></i> {{ 'Theo d\xF5i g\u1EA7n \u0111\xE2y' | transloco }}</label>
      <label nz-radio-button nzValue="workers"><i nz-icon nzType="api"></i> {{ 'Tr\u1EA1ng th\xE1i Workers' | transloco }}</label>
      <label nz-radio-button nzValue="activity"><i nz-icon nzType="clock-circle"></i> {{ 'Ho\u1EA1t \u0111\u1ED9ng cu\u1ED1i' | transloco }}</label>
    </nz-radio-group>
  </div>

  <ng-container [ngSwitch]="activeTab">
    <div *ngSwitchCase="'queues'">
      <nz-card [nzTitle]="'Danh s\xE1ch H\xE0ng \u0111\u1EE3i (Queue)' | transloco">
        <tot-table
          [data]="allQueues"
          [columns]="queueColumns"
          [loading]="loading"
          [pageSize]="10"
          [frontPagination]="true"
          [showPagination]="true"
          [scroll]="{ x: '1300px' }"
        >
          <ng-template totCell="activeCount" let-data>
            <nz-tag nzColor="processing">{{ data.activeCount }}</nz-tag>
          </ng-template>

          <ng-template totCell="sendSuccessCount" let-data>
            <nz-tag nzColor="success">{{ data.sendSuccessCount }}</nz-tag>
          </ng-template>

          <ng-template totCell="sendErrorCount" let-data>
            <nz-tag nzColor="error">{{ data.sendErrorCount }}</nz-tag>
          </ng-template>

          <ng-template totCell="doneSuccessCount" let-data>
            <nz-tag nzColor="success">{{ data.doneSuccessCount }}</nz-tag>
          </ng-template>

          <ng-template totCell="doneErrorCount" let-data>
            <nz-tag nzColor="error">{{ data.doneErrorCount }}</nz-tag>
          </ng-template>

          <ng-template totCell="workers" let-data>
            <div class="worker-tags">
              <nz-tag *ngFor="let w of data.workers" nzColor="processing">{{ w }}</nz-tag>
            </div>
          </ng-template>

          <ng-template totCell="handlers" let-data>
            <div class="handler-grid">
              <div *ngFor="let h of data.handlers" class="handler-tag-item">
                <span class="h-name" [nz-tooltip]="h.handlerName">{{ shortenNamespace(h.handlerName) }}</span>
                <span class="m-name" [nz-tooltip]="h.messageName">{{ shortenNamespace(h.messageName) }}</span>
              </div>
            </div>
          </ng-template>

          <ng-template totCell="action" let-data>
            <div style="display: flex; gap: 4px; flex-direction: column;">
              <tot-button nzType="primary" [nzGhost]="true" nzSize="small" (click)="viewDetails(data)">
                {{ 'Chi ti\u1EBFt' | transloco }}
              </tot-button>
              <tot-button nzType="default" nzSize="small" (click)="viewInProgress(data)">
                {{ 'Xem \u0111ang x\u1EED l\xFD' | transloco }}
              </tot-button>
            </div>
          </ng-template>
        </tot-table>
      </nz-card>
    </div>

    <div *ngSwitchCase="'topics'">
      <nz-card [nzTitle]="'Danh s\xE1ch Ch\u1EE7 \u0111\u1EC1 (Topic)' | transloco">
        <tot-table
          [data]="allTopics"
          [columns]="topicColumns"
          [loading]="loading"
          [pageSize]="10"
          [frontPagination]="true"
          [showPagination]="true"
          [scroll]="{ x: '1300px' }"
        >
          <ng-template totCell="activeCount" let-data>
            <nz-tag nzColor="processing">{{ data.activeCount }}</nz-tag>
          </ng-template>

          <ng-template totCell="sendSuccessCount" let-data>
            <nz-tag nzColor="success">{{ data.sendSuccessCount }}</nz-tag>
          </ng-template>

          <ng-template totCell="sendErrorCount" let-data>
            <nz-tag nzColor="error">{{ data.sendErrorCount }}</nz-tag>
          </ng-template>

          <ng-template totCell="doneSuccessCount" let-data>
            <nz-tag nzColor="success">{{ data.doneSuccessCount }}</nz-tag>
          </ng-template>

          <ng-template totCell="doneErrorCount" let-data>
            <nz-tag nzColor="error">{{ data.doneErrorCount }}</nz-tag>
          </ng-template>

          <ng-template totCell="workers" let-data>
            <div class="worker-tags">
              <nz-tag *ngFor="let w of data.workers" nzColor="processing">{{ w }}</nz-tag>
            </div>
          </ng-template>

          <ng-template totCell="handlers" let-data>
            <div class="handler-grid">
              <div *ngFor="let h of data.handlers" class="handler-tag-item">
                <span class="h-name" [nz-tooltip]="h.handlerName">{{ shortenNamespace(h.handlerName) }}</span>
                <span class="m-name" [nz-tooltip]="h.messageName">{{ shortenNamespace(h.messageName) }}</span>
              </div>
            </div>
          </ng-template>

          <ng-template totCell="action" let-data>
            <div style="display: flex; gap: 4px; flex-direction: column;">
              <tot-button nzType="primary" [nzGhost]="true" nzSize="small" (click)="viewDetails(data)">
                {{ 'Chi ti\u1EBFt' | transloco }}
              </tot-button>
              <tot-button nzType="default" nzSize="small" (click)="viewInProgress(data)">
                {{ 'Xem \u0111ang x\u1EED l\xFD' | transloco }}
              </tot-button>
            </div>
          </ng-template>
        </tot-table>
      </nz-card>
    </div>

    <div *ngSwitchCase="'tracking'">
      <nz-card [nzTitle]="'L\u1ECBch s\u1EED th\u1EF1c thi' | transloco">
        <div class="filters-container" style="margin-bottom: 24px;">
          <div nz-row [nzGutter]="16">
            <div nz-col [nzSpan]="5">
              <nz-input-group [nzPrefix]="prefixSearch">
                <input type="text" nz-input [(ngModel)]="filters.trackingId" (ngModelChange)="onFilterChange()" [placeholder]="'Tracking ID' | transloco" />
              </nz-input-group>
              <ng-template #prefixSearch><i nz-icon nzType="search"></i></ng-template>
            </div>
            <div nz-col [nzSpan]="4">
              <nz-select [(ngModel)]="filters.status" (ngModelChange)="onFilterChange()" [nzPlaceHolder]="'Tr\u1EA1ng th\xE1i' | transloco" style="width: 100%;" nzAllowClear>
                <nz-option nzValue="success" [nzLabel]="'Th\xE0nh c\xF4ng' | transloco"></nz-option>
                <nz-option nzValue="error" [nzLabel]="'L\u1ED7i' | transloco"></nz-option>
                <nz-option nzValue="processing" [nzLabel]="'\u0110ang x\u1EED l\xFD' | transloco"></nz-option>
              </nz-select>
            </div>
            <div nz-col [nzSpan]="10">
              <div style="display: flex; gap: 8px;">
                <nz-date-picker [(ngModel)]="filters.fromDate" (ngModelChange)="onFilterChange()" [nzPlaceHolder]="'B\u1EAFt \u0111\u1EA7u' | transloco" style="flex: 1;"></nz-date-picker>
                <nz-date-picker [(ngModel)]="filters.toDate" (ngModelChange)="onFilterChange()" [nzPlaceHolder]="'K\u1EBFt th\xFAc' | transloco" style="flex: 1;"></nz-date-picker>
              </div>
            </div>
            <div nz-col [nzSpan]="5">
              <tot-button [nzBlock]="true" (click)="resetFilters()">{{ '\u0110\u1EB7t l\u1EA1i b\u1ED9 l\u1ECDc' | transloco }}</tot-button>
            </div>
          </div>
        </div>

        <tot-table 
          [data]="recentTracking" 
          [columns]="trackingColumns" 
          [loading]="loading" 
          [total]="totalTracking" 
          [pageIndex]="pageIndex" 
          [pageSize]="pageSize" 
          [frontPagination]="false"
          [expandTemplate]="expandTpl"
          [scroll]="{ x: '1300px' }"
          (queryParamsChange)="onQueryParamsChange($event)"
          (expandChange)="onRowExpand($event)"
        >
          <ng-template totCell="id" let-data>
            <span class="id-text" [title]="data.id">{{ data.id }}</span>
          </ng-template>

          <ng-template totCell="status" let-data>
            <nz-tag [nzColor]="data.status?.toLowerCase() === 'success' ? 'success' : data.status?.toLowerCase() === 'error' ? 'error' : 'processing'">
              {{ (data.status?.toLowerCase() === 'success' ? 'Th\xE0nh c\xF4ng' : data.status?.toLowerCase() === 'error' ? 'L\u1ED7i' : '\u0110ang ch\u1EA1y') | transloco }}
            </nz-tag>
          </ng-template>

          <ng-template totCell="step" let-data>
            <nz-tag [nzColor]="data.step === 'send' ? 'blue' : data.step === 'dequeue' ? 'orange' : data.step === 'done' ? 'green' : 'default'">
              {{ data.step }}
            </nz-tag>
          </ng-template>

          <ng-template totCell="sourceComponent" let-data>
            <span class="namespace-text" [nz-tooltip]="data.sourceComponent">
              {{ shortenNamespace(data.sourceComponent) }}
            </span>
          </ng-template>

          <ng-template totCell="queueOrTopic" let-data>
            <span class="queue-name" [nz-tooltip]="data.queueOrTopic">{{ shortenNamespace(data.queueOrTopic) }}</span>
          </ng-template>

          <ng-template totCell="handler" let-data>
            <span class="namespace-text" [nz-tooltip]="data.handler">
              {{ shortenNamespace(data.handler) }}
            </span>
          </ng-template>

          <ng-template totCell="time" let-data>
            {{ data.time | date:'yyyy-MM-dd HH:mm:ss' }}
          </ng-template>

          <ng-template totCell="action" let-data>
            <div style="display: flex; gap: 4px; flex-direction: column;">
              <tot-button nzSize="small" nzType="link" (click)="retryTracking(data)" nz-tooltip [nzTooltipTitle]="'G\u1EEDi l\u1EA1i' | transloco">
                <i nz-icon nzType="rollback"></i> {{ 'G\u1EEDi l\u1EA1i' | transloco }}
              </tot-button>
              <tot-button nzSize="small" nzType="link" [nzDanger]="true" (click)="deleteTracking(data)" nz-tooltip [nzTooltipTitle]="'X\xF3a' | transloco">
                <i nz-icon nzType="delete"></i> {{ 'X\xF3a' | transloco }}
              </tot-button>
              <tot-button nzSize="small" nzType="link" (click)="toggleExpand(data)">
                <i nz-icon [nzType]="data.expand ? 'up' : 'down'"></i> {{ 'Payload' | transloco }}
              </tot-button>
            </div>
          </ng-template>
        </tot-table>
      </nz-card>
    </div>

    <div *ngSwitchCase="'workers'">
      <nz-card [nzTitle]="'Gi\xE1m s\xE1t ti\u1EBFn tr\xECnh (Workers)' | transloco">
        <tot-table
          [data]="workerList"
          [columns]="workerColumns"
          [pageSize]="10"
          [frontPagination]="true"
          [showPagination]="true"
          [scroll]="{ x: '1000px' }"
        >
          <ng-template totCell="status" let-data>
            <nz-tag [nzColor]="data.status === 'Running' ? 'success' : 'default'">
              {{ (data.status === 'Running' ? '\u0110ang ch\u1EA1y' : '\u0110\xE3 d\u1EEBng') | transloco }}
            </nz-tag>
          </ng-template>

          <ng-template totCell="action" let-data>
            <tot-button [nzType]="data.status === 'Running' ? 'default' : 'primary'" (click)="toggleWorker(data.id, data.status)" [nzDanger]="data.status === 'Running'">
              {{ (data.status === 'Running' ? 'D\u1EEBng' : 'Kh\u1EDFi ch\u1EA1y') | transloco }}
            </tot-button>
          </ng-template>
        </tot-table>
      </nz-card>

      <nz-card [nzTitle]="'Ph\xE2n t\xEDch l\u1ED7i' | transloco" style="margin-top: 24px;">
        <div nz-row [nzGutter]="16">
          <div nz-col [nzSpan]="12">
            <nz-list [nzDataSource]="errorStats" [nzRenderItem]="errorItem" nzBordered>
              <ng-template #errorItem let-item>
                <nz-list-item>
                  <span style="color: #ff4d4f; font-weight: bold;">{{ item.name }}</span>
                  <nz-tag nzColor="red">{{ item.count }} {{ 'l\u1ED7i' | transloco }}</nz-tag>
                </nz-list-item>
              </ng-template>
            </nz-list>
          </div>
          <div nz-col [nzSpan]="12">
            <div class="empty-state" *ngIf="errorStats.length === 0">
              <i nz-icon nzType="check-circle" style="font-size: 48px; color: #52c41a;"></i>
              <p style="margin-top: 16px;">{{ 'Kh\xF4ng c\xF3 l\u1ED7i n\xE0o \u0111\u01B0\u1EE3c ghi nh\u1EADn' | transloco }}</p>
            </div>
          </div>
        </div>
      </nz-card>
    </div>

    <div *ngSwitchCase="'activity'">
      <nz-card [nzTitle]="'Danh s\xE1ch th\u1EDDi gian ho\u1EA1t \u0111\u1ED9ng l\u1EA7n cu\u1ED1i' | transloco">
        <tot-table
          [data]="lastActivityList"
          [columns]="activityColumns"
          [pageSize]="10"
          [frontPagination]="true"
          [showPagination]="true"
          nzSize="middle"
        >
          <ng-template totCell="type" let-data>
            <nz-tag [nzColor]="data.type === 'Command' ? 'blue' : data.type === 'Topic' ? 'purple' : 'cyan'">
              {{ data.type | transloco }}
            </nz-tag>
          </ng-template>

          <ng-template totCell="lastActive" let-data>
            <span [nz-tooltip]="data.lastActive | date:'yyyy-MM-dd HH:mm:ss.SSS'">
              {{ data.lastActive | date:'yyyy-MM-dd HH:mm:ss' }}
            </span>
            <span style="color: #999; font-size: 12px; margin-left: 8px;">
              ({{ data.lastActive | date:'HH:mm:ss' }})
            </span>
          </ng-template>
        </tot-table>
      </nz-card>
    </div>
  </ng-container>

  <ng-template #expandTpl let-data>
    <div class="json-viewer-container" style="width: 100%; padding: 24px; border-radius: 8px; border: 1px solid #f0f0f0; background: #fff;">
      <div nz-row [nzGutter]="24">
        <!-- Left: Prettified JSON Payload -->
        <div nz-col [nzSpan]="10">
          <div class="json-header" style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 600; font-size: 14px; color: #1890ff;">
              <i nz-icon nzType="code"></i> {{ 'D\u1EEF li\u1EC7u Tin nh\u1EAFn (Payload)' | transloco }}
            </span>
            <tot-button nzSize="small" nzType="default" (click)="copyToClipboard(data.content)">
              <i nz-icon nzType="copy"></i> {{ 'Sao ch\xE9p' | transloco }}
            </tot-button>
          </div>
          <pre class="json-content" style="max-height: 480px; border-radius: 6px; box-shadow: inset 0 2px 8px rgba(0,0,0,0.15);">{{ formatJson(data.content) }}</pre>
        </div>

        <!-- Right: Sequential Flow Timeline -->
        <div nz-col [nzSpan]="14">
          <h4 style="font-weight: 600; font-size: 15px; margin-bottom: 20px; color: #1890ff;">
            <i nz-icon nzType="history"></i> {{ 'L\u1ECBch s\u1EED d\xF2ng th\u1EDDi gian s\u1EF1 ki\u1EC7n' | transloco }}
          </h4>
          
          <div class="timeline-wrapper" style="max-height: 480px; overflow-y: auto; padding-right: 8px;">
            <nz-timeline *ngIf="data.history && data.history.length > 0; else loadingHistory">
              <nz-timeline-item 
                *ngFor="let step of data.history" 
                [nzColor]="step.status?.toLowerCase() === 'error' ? 'red' : step.status?.toLowerCase() === 'success' ? 'green' : 'blue'"
              >
                <!-- Timeline Header: Time + Step Tag -->
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
                  <span style="font-weight: bold; font-family: monospace; font-size: 12px; color: #888;">
                    {{ (step.timestamp || step.time) | date:'yyyy-MM-dd HH:mm:ss.SSS' }}
                  </span>
                  <nz-tag [nzColor]="step.step === 'send' ? 'blue' : step.step === 'dequeue' ? 'orange' : step.step === 'done' ? 'green' : 'default'">
                    {{ step.step }}
                  </nz-tag>
                  <nz-tag *ngIf="step.status" [nzColor]="step.status.toLowerCase() === 'success' ? 'success' : step.status.toLowerCase() === 'error' ? 'error' : 'processing'">
                    {{ step.status }}
                  </nz-tag>
                </div>

                <!-- Timeline Body: Context & Qualified Entities -->
                <div class="timeline-body-content" style="background: rgba(0,0,0,0.02); padding: 12px; border-radius: 6px; border-left: 3px solid #d9d9d9; margin-bottom: 12px;">
                  <!-- Source Component -->
                  <div *ngIf="step.sourceComponent" class="context-row" style="margin-bottom: 4px; font-size: 12px;">
                    <span style="color: #666; font-weight: 500;">{{ 'Ngu\u1ED3n ph\xE1t (Source)' | transloco }}: </span>
                    <code style="color: #c41d7f;" [nz-tooltip]="step.sourceComponent">{{ shortenNamespace(step.sourceComponent) }}</code>
                  </div>
                  
                  <!-- Topic/Queue Details -->
                  <div *ngIf="step.queueOrTopicName" class="context-row" style="margin-bottom: 4px; font-size: 12px;">
                    <span style="color: #666; font-weight: 500;">{{ 'H\xE0ng \u0111\u1EE3i / Ch\u1EE7 \u0111\u1EC1' | transloco }}: </span>
                    <code style="color: #096dd9;">{{ step.queueOrTopicName }}</code>
                  </div>

                  <!-- Subscriber and Destination Queue Details -->
                  <div *ngIf="step.subscriberName" class="context-row" style="margin-bottom: 4px; font-size: 12px;">
                    <span style="color: #666; font-weight: 500;">{{ 'Subscriber' | transloco }}: </span>
                    <code style="color: #722ed1;">{{ step.subscriberName }}</code>
                    <span *ngIf="step.destinationQueueName" style="color: #888; font-size: 11px; margin-left: 6px;">
                      (Queue: <code>{{ step.destinationQueueName }}</code>)
                    </span>
                  </div>

                  <!-- Worker -->
                  <div *ngIf="step.workerName" class="context-row" style="margin-bottom: 4px; font-size: 12px;">
                    <span style="color: #666; font-weight: 500;">Worker ID: </span>
                    <code style="color: #d46b08;">{{ step.workerName }}</code>
                  </div>

                  <!-- Handler -->
                  <div *ngIf="step.handlerOrEventName" class="context-row" style="margin-bottom: 4px; font-size: 12px;">
                    <span style="color: #666; font-weight: 500;">Handler: </span>
                    <code style="color: #389e0d;" [nz-tooltip]="step.handlerOrEventName">{{ shortenNamespace(step.handlerOrEventName) }}</code>
                  </div>

                  <!-- Step Description / Details -->
                  <div *ngIf="step.details && step.status?.toLowerCase() !== 'error'" class="details-row" style="margin-top: 6px; font-size: 12px; color: #555;">
                    <i nz-icon nzType="info-circle" style="color: #1890ff; margin-right: 4px;"></i> {{ step.details }}
                  </div>

                  <!-- Error Warning Banner -->
                  <div *ngIf="step.status?.toLowerCase() === 'error'" class="error-detail-banner" style="margin-top: 8px; padding: 12px; background: #fff1f0; border: 1px solid #ffa39e; border-radius: 4px; border-left: 4px solid #ff4d4f;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <span style="font-weight: 600; color: #cf1322;"><i nz-icon nzType="warning" nzTheme="fill"></i> {{ 'Chi ti\u1EBFt l\u1ED7i (Stack Trace)' | transloco }}</span>
                      <tot-button nzSize="small" nzType="default" [nzDanger]="true" (click)="copyToClipboard(step.details)">
                        <i nz-icon nzType="copy"></i> {{ 'Sao ch\xE9p l\u1ED7i' | transloco }}
                      </tot-button>
                    </div>
                    <pre style="margin: 0; padding: 8px; background: #141414; color: #ffccc7; font-size: 11px; max-height: 200px; overflow: auto; border-radius: 4px; font-family: 'Consolas', monospace; white-space: pre-wrap; word-break: break-all;">{{ step.details }}</pre>
                  </div>
                </div>
              </nz-timeline-item>
            </nz-timeline>
            
            <ng-template #loadingHistory>
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; color: #999;">
                <i nz-icon nzType="loading" style="font-size: 32px; color: #1890ff; margin-bottom: 12px;"></i>
                <p>{{ '\u0110ang t\u1EA3i l\u1ECBch s\u1EED chi ti\u1EBFt...' | transloco }}</p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  </ng-template>
</div>
`, styles: ['/* projects/tot/cqrs-dashboard/src/lib/dashboard/dashboard.component.css */\n.dashboard-container {\n  padding: 0;\n}\nnz-card {\n  margin-bottom: 24px;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\n.queue-name {\n  font-weight: 600;\n  color: #1890ff;\n  font-family: "Consolas", monospace;\n}\n.worker-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\n.handler-list {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.handler-item {\n  font-size: 12px;\n}\n.handler-name {\n  font-weight: 500;\n  color: #52c41a;\n}\n.message-name {\n  color: #999;\n  margin-left: 4px;\n}\n.filters-container {\n  background: #fbfbfb;\n  padding: 16px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  border: 1px solid #f0f0f0;\n}\n.id-text {\n  font-family: monospace;\n  font-size: 11px;\n  color: #666;\n  background: #f5f5f5;\n  padding: 2px 4px;\n  border-radius: 3px;\n  cursor: help;\n}\n.meta-text {\n  font-size: 12px;\n  color: #666;\n  word-break: break-all;\n}\n.json-viewer-container {\n  padding: 16px;\n  background: #fdfdfd;\n  border: 1px solid #f0f0f0;\n  border-top: none;\n}\n.json-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n  font-weight: bold;\n  color: #1890ff;\n}\n.json-content {\n  background: #1e1e1e;\n  color: #d4d4d4;\n  padding: 16px;\n  border-radius: 4px;\n  font-family: "Consolas", monospace;\n  font-size: 12px;\n  max-height: 400px;\n  overflow: auto;\n  margin: 0;\n}\n:host-context([nz-theme="dark"]) .json-viewer-container {\n  background: #141414;\n  border-color: #303030;\n}\n:host-context([nz-theme="dark"]) .filters-container {\n  background: #1f1f1f;\n  border-color: #303030;\n}\n:host-context([nz-theme="dark"]) .id-text {\n  background: #262626;\n  color: #aaa;\n}\n.handler-grid {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.handler-tag-item {\n  display: flex;\n  flex-direction: column;\n  padding: 4px 8px;\n  background: #f6f8fa;\n  border-radius: 4px;\n  border-left: 3px solid #52c41a;\n  font-size: 12px;\n}\n.h-name {\n  font-weight: 600;\n  color: #2c3e50;\n}\n.m-name {\n  color: #7f8c8d;\n  font-family: "Consolas", monospace;\n  font-size: 11px;\n}\n:host-context([nz-theme="dark"]) .handler-tag-item {\n  background: #262626;\n  border-left-color: #3f8600;\n}\n:host-context([nz-theme="dark"]) .h-name {\n  color: #ecf0f1;\n}\n:host-context([nz-theme="dark"]) .m-name {\n  color: #bdc3c7;\n}\n.namespace-text {\n  font-family: "Consolas", monospace;\n  font-size: 11px;\n  background: rgba(24, 144, 255, 0.05);\n  color: #1890ff;\n  padding: 2px 6px;\n  border-radius: 4px;\n  border: 1px solid rgba(24, 144, 255, 0.15);\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  max-width: 160px;\n  display: inline-block;\n  cursor: help;\n  vertical-align: middle;\n}\n:host-context([nz-theme="dark"]) .namespace-text {\n  background: rgba(24, 144, 255, 0.08);\n  border-color: rgba(24, 144, 255, 0.25);\n  color: #177ddc;\n}\n.context-row code {\n  font-family: "Consolas", monospace;\n  padding: 2px 5px;\n  border-radius: 3px;\n  font-size: 11px;\n  background: rgba(0, 0, 0, 0.04);\n}\n:host-context([nz-theme="dark"]) .context-row code {\n  background: rgba(255, 255, 255, 0.08);\n}\n.timeline-wrapper::-webkit-scrollbar {\n  width: 6px;\n}\n.timeline-wrapper::-webkit-scrollbar-track {\n  background: transparent;\n}\n.timeline-wrapper::-webkit-scrollbar-thumb {\n  background: rgba(0, 0, 0, 0.15);\n  border-radius: 3px;\n}\n.timeline-wrapper::-webkit-scrollbar-thumb:hover {\n  background: rgba(0, 0, 0, 0.3);\n}\n:host-context([nz-theme="dark"]) .timeline-wrapper::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.2);\n}\n:host-context([nz-theme="dark"]) .timeline-wrapper::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.4);\n}\n:host-context([nz-theme="dark"]) .json-viewer-container {\n  background: #141414 !important;\n  border-color: #303030 !important;\n}\n:host-context([nz-theme="dark"]) .timeline-body-content {\n  background: rgba(255, 255, 255, 0.02) !important;\n  border-left-color: #434343 !important;\n}\n:host-context([nz-theme="dark"]) .error-detail-banner {\n  background: #2a1215 !important;\n  border-color: #5c0011 !important;\n  border-left-color: #a61d24 !important;\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "projects/tot/cqrs-dashboard/src/lib/dashboard/dashboard.component.ts", lineNumber: 65 });
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-steps.mjs
var _c07 = ["processDotTemplate"];
var _c15 = ["itemContainer"];
var _c23 = (a0, a1, a2) => ({
  $implicit: a0,
  status: a1,
  index: a2
});
function NzStepComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 3);
  }
}
function NzStepComponent_Conditional_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "nz-progress", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzPercent", ctx_r0.nzPercentage)("nzWidth", ctx_r0.nzSize === "small" ? 32 : 40)("nzFormat", ctx_r0.nullProcessFormat)("nzStrokeWidth", 4);
  }
}
function NzStepComponent_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275element(1, "nz-icon", 13);
    \u0275\u0275elementEnd();
  }
}
function NzStepComponent_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275element(1, "nz-icon", 14);
    \u0275\u0275elementEnd();
  }
}
function NzStepComponent_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.index + 1, " ");
  }
}
function NzStepComponent_Conditional_4_Conditional_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "nz-icon", 15);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const icon_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzType", icon_r2);
  }
}
function NzStepComponent_Conditional_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275template(1, NzStepComponent_Conditional_4_Conditional_4_ng_container_1_Template, 2, 1, "ng-container", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzIcon);
  }
}
function NzStepComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzStepComponent_Conditional_4_Conditional_0_Template, 2, 4, "div", 11);
    \u0275\u0275conditionalCreate(1, NzStepComponent_Conditional_4_Conditional_1_Template, 2, 0, "span", 5);
    \u0275\u0275conditionalCreate(2, NzStepComponent_Conditional_4_Conditional_2_Template, 2, 0, "span", 5);
    \u0275\u0275conditionalCreate(3, NzStepComponent_Conditional_4_Conditional_3_Template, 2, 1, "span", 5);
    \u0275\u0275conditionalCreate(4, NzStepComponent_Conditional_4_Conditional_4_Template, 2, 1, "span", 5);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.showProgress ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzStatus === "finish" && !ctx_r0.nzIcon ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzStatus === "error" ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.nzStatus === "process" || ctx_r0.nzStatus === "wait") && !ctx_r0.nzIcon ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzIcon ? 4 : -1);
  }
}
function NzStepComponent_Conditional_5_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 17);
  }
}
function NzStepComponent_Conditional_5_ng_template_3_Template(rf, ctx) {
}
function NzStepComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 5);
    \u0275\u0275template(1, NzStepComponent_Conditional_5_ng_template_1_Template, 1, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(3, NzStepComponent_Conditional_5_ng_template_3_Template, 0, 0, "ng-template", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const processDotTemplate_r3 = \u0275\u0275reference(2);
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.customProcessTemplate || processDotTemplate_r3)("ngTemplateOutletContext", \u0275\u0275pureFunction3(2, _c23, processDotTemplate_r3, ctx_r0.nzStatus, ctx_r0.index));
  }
}
function NzStepComponent_ng_container_8_Template(rf, ctx) {
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
function NzStepComponent_Conditional_9_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzSubtitle);
  }
}
function NzStepComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275template(1, NzStepComponent_Conditional_9_ng_container_1_Template, 2, 1, "ng-container", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzSubtitle);
  }
}
function NzStepComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzDescription);
  }
}
var _c33 = ["*"];
var _NzStepComponent = class _NzStepComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "processDotTemplate");
    __publicField(this, "itemContainer");
    __publicField(this, "nzTitle");
    __publicField(this, "nzSubtitle");
    __publicField(this, "nzDescription");
    __publicField(this, "nzDisabled", false);
    __publicField(this, "nzPercentage", null);
    __publicField(this, "nzSize", "default");
    __publicField(this, "isCustomStatus", false);
    __publicField(this, "_status", "wait");
    __publicField(this, "oldAPIIcon", true);
    __publicField(this, "_icon");
    __publicField(this, "customProcessTemplate");
    // Set by parent.
    __publicField(this, "direction", "horizontal");
    __publicField(this, "index", 0);
    __publicField(this, "last", false);
    __publicField(this, "outStatus", "process");
    __publicField(this, "showProcessDot", false);
    __publicField(this, "clickable", false);
    __publicField(this, "clickOutsideAngular$", new Subject());
    __publicField(this, "nullProcessFormat", () => null);
    __publicField(this, "_currentIndex", 0);
  }
  get nzStatus() {
    return this._status;
  }
  set nzStatus(status) {
    this._status = status;
    this.isCustomStatus = true;
  }
  get nzIcon() {
    return this._icon;
  }
  set nzIcon(value) {
    if (!(value instanceof TemplateRef)) {
      this.oldAPIIcon = typeof value === "string" && value.indexOf("anticon") > -1;
    }
    this._icon = value;
  }
  get showProgress() {
    return this.nzPercentage !== null && !this.nzIcon && this.nzStatus === "process" && this.nzPercentage >= 0 && this.nzPercentage <= 100;
  }
  get currentIndex() {
    return this._currentIndex;
  }
  set currentIndex(current) {
    this._currentIndex = current;
    if (!this.isCustomStatus) {
      this._status = current > this.index ? "finish" : current === this.index ? this.outStatus || "" : "wait";
    }
  }
  ngOnInit() {
    fromEventOutsideAngular(this.itemContainer.nativeElement, "click").pipe(filter(() => this.clickable && this.currentIndex !== this.index && !this.nzDisabled), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.clickOutsideAngular$.next(this.index);
    });
  }
  enable() {
    this.nzDisabled = false;
    this.cdr.markForCheck();
  }
  disable() {
    this.nzDisabled = true;
    this.cdr.markForCheck();
  }
  markForCheck() {
    this.cdr.markForCheck();
  }
};
__publicField(_NzStepComponent, "\u0275fac", function NzStepComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzStepComponent)();
});
__publicField(_NzStepComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzStepComponent,
  selectors: [["nz-step"]],
  viewQuery: function NzStepComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c07, 5)(_c15, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.processDotTemplate = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.itemContainer = _t.first);
    }
  },
  hostAttrs: [1, "ant-steps-item"],
  hostVars: 16,
  hostBindings: function NzStepComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-steps-item-wait", ctx.nzStatus === "wait")("ant-steps-item-process", ctx.nzStatus === "process")("ant-steps-item-finish", ctx.nzStatus === "finish")("ant-steps-item-error", ctx.nzStatus === "error")("ant-steps-item-active", ctx.currentIndex === ctx.index)("ant-steps-item-disabled", ctx.nzDisabled)("ant-steps-item-custom", !!ctx.nzIcon)("ant-steps-next-error", ctx.outStatus === "error" && ctx.currentIndex === ctx.index + 1);
    }
  },
  inputs: {
    nzTitle: "nzTitle",
    nzSubtitle: "nzSubtitle",
    nzDescription: "nzDescription",
    nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
    nzPercentage: "nzPercentage",
    nzSize: "nzSize",
    nzStatus: "nzStatus",
    nzIcon: "nzIcon"
  },
  exportAs: ["nzStep"],
  decls: 12,
  vars: 8,
  consts: [["itemContainer", ""], ["processDotTemplate", ""], [1, "ant-steps-item-container", 3, "tabindex"], [1, "ant-steps-item-tail"], [1, "ant-steps-item-icon"], [1, "ant-steps-icon"], [1, "ant-steps-item-content"], [1, "ant-steps-item-title"], [4, "nzStringTemplateOutlet"], [1, "ant-steps-item-subtitle"], [1, "ant-steps-item-description"], [1, "ant-steps-progress-icon"], ["nzType", "circle", 3, "nzPercent", "nzWidth", "nzFormat", "nzStrokeWidth"], ["nzType", "check"], ["nzType", "close"], [3, "nzType"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "ant-steps-icon-dot"]],
  template: function NzStepComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2, 0);
      \u0275\u0275conditionalCreate(2, NzStepComponent_Conditional_2_Template, 1, 0, "div", 3);
      \u0275\u0275elementStart(3, "div", 4);
      \u0275\u0275conditionalCreate(4, NzStepComponent_Conditional_4_Template, 5, 5);
      \u0275\u0275conditionalCreate(5, NzStepComponent_Conditional_5_Template, 4, 6, "span", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 6)(7, "div", 7);
      \u0275\u0275template(8, NzStepComponent_ng_container_8_Template, 2, 1, "ng-container", 8);
      \u0275\u0275conditionalCreate(9, NzStepComponent_Conditional_9_Template, 2, 1, "div", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 10);
      \u0275\u0275template(11, NzStepComponent_ng_container_11_Template, 2, 1, "ng-container", 8);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275property("tabindex", ctx.clickable && !ctx.nzDisabled ? 0 : null);
      \u0275\u0275attribute("role", ctx.clickable && !ctx.nzDisabled ? "button" : null);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.last ? 2 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(!ctx.showProcessDot ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showProcessDot ? 5 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275property("nzStringTemplateOutlet", ctx.nzTitle);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzSubtitle ? 9 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("nzStringTemplateOutlet", ctx.nzDescription);
    }
  },
  dependencies: [NzProgressModule, NzProgressComponent, NzIconModule, NzIconDirective, NzOutletModule, NzStringTemplateOutletDirective, NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var NzStepComponent = _NzStepComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzStepComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-step",
      exportAs: "nzStep",
      template: `
    <div
      #itemContainer
      class="ant-steps-item-container"
      [attr.role]="clickable && !nzDisabled ? 'button' : null"
      [tabindex]="clickable && !nzDisabled ? 0 : null"
    >
      @if (!last) {
        <div class="ant-steps-item-tail"></div>
      }
      <div class="ant-steps-item-icon">
        @if (!showProcessDot) {
          @if (showProgress) {
            <div class="ant-steps-progress-icon">
              <nz-progress
                [nzPercent]="nzPercentage"
                nzType="circle"
                [nzWidth]="nzSize === 'small' ? 32 : 40"
                [nzFormat]="nullProcessFormat"
                [nzStrokeWidth]="4"
              />
            </div>
          }
          @if (nzStatus === 'finish' && !nzIcon) {
            <span class="ant-steps-icon"><nz-icon nzType="check" /></span>
          }
          @if (nzStatus === 'error') {
            <span class="ant-steps-icon"><nz-icon nzType="close" /></span>
          }
          @if ((nzStatus === 'process' || nzStatus === 'wait') && !nzIcon) {
            <span class="ant-steps-icon">
              {{ index + 1 }}
            </span>
          }
          @if (nzIcon) {
            <span class="ant-steps-icon">
              <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
                <nz-icon [nzType]="icon" />
              </ng-container>
            </span>
          }
        }
        @if (showProcessDot) {
          <span class="ant-steps-icon">
            <ng-template #processDotTemplate>
              <span class="ant-steps-icon-dot"></span>
            </ng-template>
            <ng-template
              [ngTemplateOutlet]="customProcessTemplate || processDotTemplate"
              [ngTemplateOutletContext]="{
                $implicit: processDotTemplate,
                status: nzStatus,
                index: index
              }"
            />
          </span>
        }
      </div>
      <div class="ant-steps-item-content">
        <div class="ant-steps-item-title">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          @if (nzSubtitle) {
            <div class="ant-steps-item-subtitle">
              <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
            </div>
          }
        </div>
        <div class="ant-steps-item-description">
          <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
        </div>
      </div>
    </div>
  `,
      host: {
        class: "ant-steps-item",
        "[class.ant-steps-item-wait]": 'nzStatus === "wait"',
        "[class.ant-steps-item-process]": 'nzStatus === "process"',
        "[class.ant-steps-item-finish]": 'nzStatus === "finish"',
        "[class.ant-steps-item-error]": 'nzStatus === "error"',
        "[class.ant-steps-item-active]": "currentIndex === index",
        "[class.ant-steps-item-disabled]": "nzDisabled",
        "[class.ant-steps-item-custom]": "!!nzIcon",
        "[class.ant-steps-next-error]": '(outStatus === "error") && (currentIndex === index + 1)'
      },
      imports: [NzProgressModule, NzIconModule, NzOutletModule, NgTemplateOutlet]
    }]
  }], null, {
    processDotTemplate: [{
      type: ViewChild,
      args: ["processDotTemplate", {
        static: false
      }]
    }],
    itemContainer: [{
      type: ViewChild,
      args: ["itemContainer", {
        static: true
      }]
    }],
    nzTitle: [{
      type: Input
    }],
    nzSubtitle: [{
      type: Input
    }],
    nzDescription: [{
      type: Input
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzPercentage: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzStatus: [{
      type: Input
    }],
    nzIcon: [{
      type: Input
    }]
  });
})();
var _NzStepsComponent = class _NzStepsComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "directionality", inject(Directionality));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "steps");
    __publicField(this, "nzCurrent", 0);
    __publicField(this, "nzDirection", "horizontal");
    __publicField(this, "nzLabelPlacement", "horizontal");
    __publicField(this, "nzType", "default");
    __publicField(this, "nzSize", "default");
    __publicField(this, "nzStartIndex", 0);
    __publicField(this, "nzStatus", "process");
    __publicField(this, "nzIndexChange", new EventEmitter());
    __publicField(this, "indexChangeSubscription", Subscription.EMPTY);
    __publicField(this, "showProcessDot", false);
    __publicField(this, "showProgress", false);
    __publicField(this, "customProcessDotTemplate");
    __publicField(this, "dir", "ltr");
  }
  set nzProgressDot(value) {
    if (value instanceof TemplateRef) {
      this.showProcessDot = true;
      this.customProcessDotTemplate = value;
    } else {
      this.showProcessDot = toBoolean(value);
    }
    this.updateChildrenSteps();
  }
  ngOnChanges(changes) {
    const {
      nzStartIndex,
      nzDirection,
      nzStatus,
      nzCurrent,
      nzSize
    } = changes;
    if (nzStartIndex || nzDirection || nzStatus || nzCurrent || nzSize) {
      this.updateChildrenSteps();
    }
  }
  ngOnInit() {
    var _a;
    (_a = this.directionality.change) == null ? void 0 : _a.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
    this.updateChildrenSteps();
  }
  ngAfterContentInit() {
    if (this.steps) {
      this.steps.changes.pipe(startWith(null), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.updateHostProgressClass();
        this.updateChildrenSteps();
      });
    }
  }
  updateHostProgressClass() {
    if (this.steps && !this.showProcessDot) {
      this.showProgress = !!this.steps.toArray().find((step) => step.nzPercentage !== null);
    }
  }
  updateChildrenSteps() {
    if (this.steps) {
      const length = this.steps.length;
      this.steps.toArray().forEach((step, index) => {
        Promise.resolve().then(() => {
          step.nzSize = this.nzSize;
          step.outStatus = this.nzStatus;
          step.showProcessDot = this.showProcessDot;
          if (this.customProcessDotTemplate) {
            step.customProcessTemplate = this.customProcessDotTemplate;
          }
          step.clickable = this.nzIndexChange.observers.length > 0;
          step.direction = this.nzDirection;
          step.index = index + this.nzStartIndex;
          step.currentIndex = this.nzCurrent;
          step.last = length === index + 1;
          step.markForCheck();
        });
      });
      this.indexChangeSubscription.unsubscribe();
      this.indexChangeSubscription = merge(...this.steps.map((step) => step.clickOutsideAngular$)).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((index) => {
        if (this.nzIndexChange.observers.length) {
          this.ngZone.run(() => this.nzIndexChange.emit(index));
        }
      });
    }
  }
};
__publicField(_NzStepsComponent, "ngAcceptInputType_nzProgressDot");
__publicField(_NzStepsComponent, "\u0275fac", function NzStepsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzStepsComponent)();
});
__publicField(_NzStepsComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzStepsComponent,
  selectors: [["nz-steps"]],
  contentQueries: function NzStepsComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzStepComponent, 4);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.steps = _t);
    }
  },
  hostAttrs: [1, "ant-steps"],
  hostVars: 18,
  hostBindings: function NzStepsComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-steps-horizontal", ctx.nzDirection === "horizontal")("ant-steps-vertical", ctx.nzDirection === "vertical")("ant-steps-label-horizontal", ctx.nzDirection === "horizontal")("ant-steps-label-vertical", (ctx.showProcessDot || ctx.nzLabelPlacement === "vertical") && ctx.nzDirection === "horizontal")("ant-steps-dot", ctx.showProcessDot)("ant-steps-small", ctx.nzSize === "small")("ant-steps-navigation", ctx.nzType === "navigation")("ant-steps-rtl", ctx.dir === "rtl")("ant-steps-with-progress", ctx.showProgress);
    }
  },
  inputs: {
    nzCurrent: "nzCurrent",
    nzDirection: "nzDirection",
    nzLabelPlacement: "nzLabelPlacement",
    nzType: "nzType",
    nzSize: "nzSize",
    nzStartIndex: "nzStartIndex",
    nzStatus: "nzStatus",
    nzProgressDot: "nzProgressDot"
  },
  outputs: {
    nzIndexChange: "nzIndexChange"
  },
  exportAs: ["nzSteps"],
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c33,
  decls: 1,
  vars: 0,
  template: function NzStepsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzStepsComponent = _NzStepsComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzStepsComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-steps",
      exportAs: "nzSteps",
      template: `<ng-content />`,
      host: {
        class: "ant-steps",
        "[class.ant-steps-horizontal]": `nzDirection === 'horizontal'`,
        "[class.ant-steps-vertical]": `nzDirection === 'vertical'`,
        "[class.ant-steps-label-horizontal]": `nzDirection === 'horizontal'`,
        "[class.ant-steps-label-vertical]": `(showProcessDot || nzLabelPlacement === 'vertical') && nzDirection === 'horizontal'`,
        "[class.ant-steps-dot]": "showProcessDot",
        "[class.ant-steps-small]": `nzSize === 'small'`,
        "[class.ant-steps-navigation]": `nzType === 'navigation'`,
        "[class.ant-steps-rtl]": `dir === 'rtl'`,
        "[class.ant-steps-with-progress]": "showProgress"
      }
    }]
  }], null, {
    steps: [{
      type: ContentChildren,
      args: [NzStepComponent]
    }],
    nzCurrent: [{
      type: Input
    }],
    nzDirection: [{
      type: Input
    }],
    nzLabelPlacement: [{
      type: Input
    }],
    nzType: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzStartIndex: [{
      type: Input
    }],
    nzStatus: [{
      type: Input
    }],
    nzProgressDot: [{
      type: Input
    }],
    nzIndexChange: [{
      type: Output
    }]
  });
})();
var _NzStepsModule = class _NzStepsModule {
};
__publicField(_NzStepsModule, "\u0275fac", function NzStepsModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzStepsModule)();
});
__publicField(_NzStepsModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzStepsModule,
  imports: [NzStepsComponent, NzStepComponent],
  exports: [NzStepsComponent, NzStepComponent]
}));
__publicField(_NzStepsModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzStepComponent]
}));
var NzStepsModule = _NzStepsModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzStepsModule, [{
    type: NgModule,
    args: [{
      imports: [NzStepsComponent, NzStepComponent],
      exports: [NzStepsComponent, NzStepComponent]
    }]
  }], null, null);
})();

// projects/tot/cqrs-dashboard/src/lib/tracing/tracing.component.ts
var _c08 = () => ["/modules/cqrs-dashboard"];
function TracingComponent_div_9_ng_container_1_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275element(1, "div", 22)(2, "span", 23);
    \u0275\u0275elementEnd();
  }
}
function TracingComponent_div_9_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 11)(2, "div", 12);
    \u0275\u0275element(3, "span", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 15)(7, "p", 16);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 17);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 18)(13, "nz-tag", 19);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "transloco");
    \u0275\u0275pipe(16, "uppercase");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(17, TracingComponent_div_9_ng_container_1_div_17_Template, 3, 0, "div", 20);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const log_r1 = ctx.$implicit;
    const last_r2 = ctx.last;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.getStepStatus(log_r1.step, log_r1.status));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzType", ctx_r2.getStepIcon(log_r1.step, log_r1.status));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(log_r1.step);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 9, log_r1.time, "HH:mm:ss"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(log_r1.details);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzColor", ctx_r2.getStepStatus(log_r1.step, log_r1.status) === "error" ? "red" : "blue");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 14, \u0275\u0275pipeBind1(15, 12, ctx_r2.getStepStatus(log_r1.step, log_r1.status) === "error" ? "L\u1ED7i" : "Th\xE0nh c\xF4ng")), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !last_r2);
  }
}
function TracingComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275template(1, TracingComponent_div_9_ng_container_1_Template, 18, 16, "ng-container", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.history);
  }
}
function TracingComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275element(1, "nz-empty", 25);
    \u0275\u0275pipe(2, "transloco");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("nzNotFoundContent", \u0275\u0275pipeBind1(2, 1, "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u theo d\xF5i cho ID n\xE0y."));
  }
}
function TracingComponent_nz_timeline_item_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-timeline-item", 26)(1, "p")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " - ");
    \u0275\u0275elementStart(6, "nz-tag");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r4 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("nzColor", ctx_r2.getStepStatus(log_r4.step, log_r4.status) === "error" ? "red" : "green");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(4, 4, log_r4.time, "HH:mm:ss"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(log_r4.step);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(log_r4.details);
  }
}
var _TracingComponent = class _TracingComponent {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.dashboardService = inject(DashboardService);
    this.notification = inject(AppNotificationService);
    this.translate = inject(TranslocoService);
    this.trackingId = "";
    this.history = [];
    this.loading = false;
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.trackingId = params["id"];
      if (this.trackingId) {
        this.fetchTracking();
      }
    });
  }
  fetchTracking() {
    this.loading = true;
    this.dashboardService.getTracking(this.trackingId).subscribe({
      next: (res) => {
        this.history = res;
        this.loading = false;
      },
      error: () => {
        this.notification.error(this.translate.translate("Th\u1EA5t b\u1EA1i"), this.translate.translate("L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u theo d\xF5i"));
        this.loading = false;
      }
    });
  }
  getStepStatus(step, status) {
    if (!step)
      return "wait";
    const s = (status || "").toLowerCase();
    if (s === "error" || s === "fail")
      return "error";
    if (s === "success" || s === "finish")
      return "finish";
    const stepLower = step.toLowerCase();
    if (stepLower === "send")
      return "finish";
    if (stepLower === "dequeue")
      return "process";
    if (stepLower === "done")
      return "finish";
    return "wait";
  }
  getStepIcon(step, status) {
    if (!step)
      return "info-circle";
    const s = (status || "").toLowerCase();
    if (s === "error" || s === "fail")
      return "close-circle";
    const stepLower = step.toLowerCase();
    if (stepLower === "send")
      return "export";
    if (stepLower === "dequeue")
      return "import";
    if (stepLower === "done")
      return "check-circle";
    return "info-circle";
  }
};
_TracingComponent.\u0275fac = function TracingComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TracingComponent)();
};
_TracingComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TracingComponent, selectors: [["app-tracing"]], decls: 16, vars: 18, consts: [[3, "nzBack", "nzTitle", "nzSubtitle"], ["nzType", "default", 3, "routerLink"], [1, "tracing-content", "animate-fade-in"], [1, "glass-card", 3, "nzTitle"], ["class", "flow-container", 4, "ngIf"], ["class", "no-data", 4, "ngIf"], [3, "nzText"], [1, "glass-card"], [3, "nzColor", 4, "ngFor", "ngForOf"], [1, "flow-container"], [4, "ngFor", "ngForOf"], [1, "flow-node"], [1, "node-icon"], ["nz-icon", "", 3, "nzType"], [1, "node-title"], [1, "node-details"], [1, "node-time"], [2, "font-size", "11px", "margin", "0", "line-height", "1.2"], [1, "node-badge"], ["nzMode", "checkable", 3, "nzColor"], ["class", "flow-arrow", 4, "ngIf"], [1, "flow-arrow"], [1, "arrow-line"], ["nz-icon", "", "nzType", "right", "nzTheme", "outline", 1, "arrow-head"], [1, "no-data"], ["nzNotFoundImage", "simple", 3, "nzNotFoundContent"], [3, "nzColor"]], template: function TracingComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-page-header", 0);
    \u0275\u0275pipe(1, "transloco");
    \u0275\u0275listener("nzBack", function TracingComponent_Template_nz_page_header_nzBack_0_listener() {
      return true;
    });
    \u0275\u0275elementStart(2, "nz-page-header-extra")(3, "tot-button", 1);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "transloco");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 2)(7, "nz-card", 3);
    \u0275\u0275pipe(8, "transloco");
    \u0275\u0275template(9, TracingComponent_div_9_Template, 2, 1, "div", 4)(10, TracingComponent_div_10_Template, 3, 3, "div", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "nz-divider", 6);
    \u0275\u0275pipe(12, "transloco");
    \u0275\u0275elementStart(13, "nz-card", 7)(14, "nz-timeline");
    \u0275\u0275template(15, TracingComponent_nz_timeline_item_15_Template, 10, 7, "nz-timeline-item", 8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(1, 9, "Theo d\xF5i lu\u1ED3ng tin nh\u1EAFn"))("nzSubtitle", ctx.trackingId);
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(17, _c08));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 11, "Quay l\u1EA1i Dashboard"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(8, 13, "Lu\u1ED3ng \u0111\u1ED3 th\u1ECB tr\u1EF1c quan"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.history.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.history.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("nzText", \u0275\u0275pipeBind1(12, 15, "L\u1ECBch s\u1EED d\xF2ng th\u1EDDi gian s\u1EF1 ki\u1EC7n"));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx.history);
  }
}, dependencies: [
  TotButtonComponent,
  CommonModule,
  NgForOf,
  NgIf,
  RouterLink,
  NzPageHeaderModule,
  NzPageHeaderComponent,
  NzPageHeaderExtraDirective,
  NzStepsModule,
  NzCardModule,
  NzCardComponent,
  NzDescriptionsModule,
  NzTimelineModule,
  NzTimelineItemComponent,
  NzTimelineComponent,
  NzTagModule,
  NzTagComponent,
  NzIconModule,
  NzIconDirective,
  NzDividerModule,
  NzDividerComponent,
  NzEmptyModule,
  NzEmptyComponent,
  TranslocoModule,
  UpperCasePipe,
  DatePipe,
  TranslocoPipe
], styles: ["\n.tracing-content[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.flow-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 40px 0;\n  overflow-x: auto;\n}\n.flow-node[_ngcontent-%COMP%] {\n  min-width: 180px;\n  max-width: 250px;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n  border: 1px solid #e8e8e8;\n  position: relative;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n  transition: all 0.3s ease;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.flow-node[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  transform: translateY(-4px);\n}\n.flow-node.finish[_ngcontent-%COMP%] {\n  border-top: 4px solid #52c41a;\n}\n.flow-node.error[_ngcontent-%COMP%] {\n  border-top: 4px solid #f5222d;\n}\n.flow-node.process[_ngcontent-%COMP%] {\n  border-top: 4px solid #1890ff;\n}\n.flow-node.wait[_ngcontent-%COMP%] {\n  border-top: 4px solid #faad14;\n}\n.node-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin-bottom: 8px;\n  color: #1890ff;\n}\n.flow-node.finish[_ngcontent-%COMP%]   .node-icon[_ngcontent-%COMP%] {\n  color: #52c41a;\n}\n.flow-node.error[_ngcontent-%COMP%]   .node-icon[_ngcontent-%COMP%] {\n  color: #f5222d;\n}\n.node-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin-bottom: 8px;\n  display: block;\n}\n.node-time[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #8c8c8c;\n  margin-bottom: 4px;\n}\n.flow-arrow[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin: 0 12px;\n  flex: 1;\n  min-width: 60px;\n}\n.arrow-line[_ngcontent-%COMP%] {\n  height: 2px;\n  background: #d9d9d9;\n  flex: 1;\n}\n.arrow-head[_ngcontent-%COMP%] {\n  color: #d9d9d9;\n  margin-left: -4px;\n}\n.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #8c8c8c;\n}\n/*# sourceMappingURL=tracing.component.css.map */"] });
var TracingComponent = _TracingComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TracingComponent, [{
    type: Component,
    args: [{ selector: "app-tracing", standalone: true, imports: [
      TotButtonComponent,
      CommonModule,
      RouterLink,
      NzPageHeaderModule,
      NzStepsModule,
      NzCardModule,
      NzDescriptionsModule,
      NzTimelineModule,
      NzTagModule,
      NzIconModule,
      NzDividerModule,
      NzEmptyModule,
      TranslocoModule
    ], template: `<nz-page-header [nzTitle]="'Theo d\xF5i lu\u1ED3ng tin nh\u1EAFn' | transloco" [nzSubtitle]="trackingId" (nzBack)="true">
  <nz-page-header-extra>
    <tot-button nzType="default" [routerLink]="['/modules/cqrs-dashboard']">{{ 'Quay l\u1EA1i Dashboard' | transloco }}</tot-button>
  </nz-page-header-extra>
</nz-page-header>

<div class="tracing-content animate-fade-in">
  <nz-card [nzTitle]="'Lu\u1ED3ng \u0111\u1ED3 th\u1ECB tr\u1EF1c quan' | transloco" class="glass-card">
    <div class="flow-container" *ngIf="history.length > 0">
      <ng-container *ngFor="let log of history; let last = last">
        <div class="flow-node" [class]="getStepStatus(log.step, log.status)">
          <div class="node-icon">
            <span nz-icon [nzType]="getStepIcon(log.step, log.status)"></span>
          </div>
          <span class="node-title">{{ log.step }}</span>
          <div class="node-details">
            <p class="node-time">{{ log.time | date:'HH:mm:ss' }}</p>
            <p style="font-size: 11px; margin: 0; line-height: 1.2;">{{ log.details }}</p>
          </div>
          <div class="node-badge">
            <nz-tag [nzColor]="getStepStatus(log.step, log.status) === 'error' ? 'red' : 'blue'" nzMode="checkable">
              {{ (getStepStatus(log.step, log.status) === 'error' ? 'L\u1ED7i' : 'Th\xE0nh c\xF4ng') | transloco | uppercase }}
            </nz-tag>
          </div>
        </div>
        <div class="flow-arrow" *ngIf="!last">
          <div class="arrow-line"></div>
          <span nz-icon nzType="right" nzTheme="outline" class="arrow-head"></span>
        </div>
      </ng-container>
    </div>

    <div *ngIf="history.length === 0" class="no-data">
      <nz-empty nzNotFoundImage="simple" [nzNotFoundContent]="'Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u theo d\xF5i cho ID n\xE0y.' | transloco"></nz-empty>
    </div>
  </nz-card>

  <nz-divider [nzText]="'L\u1ECBch s\u1EED d\xF2ng th\u1EDDi gian s\u1EF1 ki\u1EC7n' | transloco"></nz-divider>

  <nz-card class="glass-card">
    <nz-timeline>
      <nz-timeline-item 
        *ngFor="let log of history" 
        [nzColor]="getStepStatus(log.step, log.status) === 'error' ? 'red' : 'green'">
        <p><strong>{{ log.time | date:'HH:mm:ss' }}</strong> - <nz-tag>{{ log.step }}</nz-tag></p>
        <p>{{ log.details }}</p>
      </nz-timeline-item>
    </nz-timeline>
  </nz-card>
</div>
`, styles: ["/* projects/tot/cqrs-dashboard/src/lib/tracing/tracing.component.css */\n.tracing-content {\n  padding: 24px;\n}\n.flow-container {\n  display: flex;\n  align-items: center;\n  padding: 40px 0;\n  overflow-x: auto;\n}\n.flow-node {\n  min-width: 180px;\n  max-width: 250px;\n  padding: 16px;\n  background: white;\n  border-radius: 8px;\n  border: 1px solid #e8e8e8;\n  position: relative;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n  transition: all 0.3s ease;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.flow-node:hover {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  transform: translateY(-4px);\n}\n.flow-node.finish {\n  border-top: 4px solid #52c41a;\n}\n.flow-node.error {\n  border-top: 4px solid #f5222d;\n}\n.flow-node.process {\n  border-top: 4px solid #1890ff;\n}\n.flow-node.wait {\n  border-top: 4px solid #faad14;\n}\n.node-icon {\n  font-size: 24px;\n  margin-bottom: 8px;\n  color: #1890ff;\n}\n.flow-node.finish .node-icon {\n  color: #52c41a;\n}\n.flow-node.error .node-icon {\n  color: #f5222d;\n}\n.node-title {\n  font-weight: 600;\n  margin-bottom: 8px;\n  display: block;\n}\n.node-time {\n  font-size: 11px;\n  color: #8c8c8c;\n  margin-bottom: 4px;\n}\n.flow-arrow {\n  display: flex;\n  align-items: center;\n  margin: 0 12px;\n  flex: 1;\n  min-width: 60px;\n}\n.arrow-line {\n  height: 2px;\n  background: #d9d9d9;\n  flex: 1;\n}\n.arrow-head {\n  color: #d9d9d9;\n  margin-left: -4px;\n}\n.no-data {\n  text-align: center;\n  padding: 40px;\n  color: #8c8c8c;\n}\n/*# sourceMappingURL=tracing.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TracingComponent, { className: "TracingComponent", filePath: "projects/tot/cqrs-dashboard/src/lib/tracing/tracing.component.ts", lineNumber: 39 });
})();

export {
  NzPageHeaderComponent,
  NzPageHeaderModule,
  NzTimelineItemComponent,
  NzTimelineComponent,
  NzTimelineModule,
  DashboardService,
  MessageListComponent,
  TopicDetailComponent,
  DashboardComponent,
  TracingComponent
};
//# sourceMappingURL=chunk-PV63VAZI.js.map
