import {
  NzResizeObserver
} from "./chunk-FNOQULRR.js";
import {
  Directionality,
  Location,
  NzConfigService,
  NzIconDirective,
  NzIconModule,
  NzOutletModule,
  NzStringTemplateOutletDirective,
  WithConfig,
  takeUntilDestroyed
} from "./chunk-XU754HJP.js";
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
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  inject,
  map,
  setClassMetadata,
  ɵɵadvance,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-2BQMWOA2.js";
import {
  __publicField
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

export {
  NzPageHeaderExtraDirective,
  NzPageHeaderComponent,
  NzPageHeaderModule
};
//# sourceMappingURL=chunk-TM6ATDTX.js.map
