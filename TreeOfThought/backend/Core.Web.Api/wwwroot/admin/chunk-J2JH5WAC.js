import {
  NzIconDirective,
  NzIconModule,
  WithConfig,
  toCssPixel
} from "./chunk-LJSHPVT7.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewChild,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  afterEveryRender,
  inject,
  input,
  numberAttribute,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
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
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-2BQMWOA2.js";
import {
  __publicField
} from "./chunk-MYGOUE3E.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-avatar.mjs
var _c0 = ["textEl"];
var _c1 = ["*"];
function NzAvatarComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("nzType", ctx_r0.nzIcon);
  }
}
function NzAvatarComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 4);
    \u0275\u0275listener("error", function NzAvatarComponent_Conditional_1_Template_img_error_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.imgError($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.nzSrc, \u0275\u0275sanitizeUrl);
    \u0275\u0275attribute("srcset", ctx_r0.nzSrcSet)("alt", ctx_r0.nzAlt)("loading", ctx_r0.nzLoading() || "eager")("fetchpriority", ctx_r0.nzFetchPriority() || "auto");
  }
}
function NzAvatarComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 3, 0);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.nzText);
  }
}
var NZ_CONFIG_MODULE_NAME = "avatar";
var NzAvatarComponent = (() => {
  var _a;
  let _nzShape_decorators;
  let _nzShape_initializers = [];
  let _nzShape_extraInitializers = [];
  let _nzSize_decorators;
  let _nzSize_initializers = [];
  let _nzSize_extraInitializers = [];
  let _nzGap_decorators;
  let _nzGap_initializers = [];
  let _nzGap_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME);
      __publicField(this, "nzShape", __runInitializers(this, _nzShape_initializers, "circle"));
      __publicField(this, "nzSize", (__runInitializers(this, _nzShape_extraInitializers), __runInitializers(this, _nzSize_initializers, "default")));
      __publicField(this, "nzGap", (__runInitializers(this, _nzSize_extraInitializers), __runInitializers(this, _nzGap_initializers, 4)));
      __publicField(this, "nzText", __runInitializers(this, _nzGap_extraInitializers));
      __publicField(this, "nzSrc");
      __publicField(this, "nzSrcSet");
      __publicField(this, "nzAlt");
      __publicField(this, "nzIcon");
      __publicField(this, "nzLoading", input(...ngDevMode ? [void 0, {
        debugName: "nzLoading"
      }] : []));
      __publicField(this, "nzFetchPriority", input(...ngDevMode ? [void 0, {
        debugName: "nzFetchPriority"
      }] : []));
      __publicField(this, "nzError", new EventEmitter());
      __publicField(this, "hasText", false);
      __publicField(this, "hasSrc", true);
      __publicField(this, "hasIcon", false);
      __publicField(this, "customSize", null);
      __publicField(this, "textEl");
      __publicField(this, "el", inject(ElementRef).nativeElement);
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      afterEveryRender(() => this.calcStringSize());
    }
    imgError(event) {
      this.nzError.emit(event);
      if (!event.defaultPrevented) {
        this.hasSrc = false;
        this.hasIcon = false;
        this.hasText = false;
        if (this.nzIcon) {
          this.hasIcon = true;
        } else if (this.nzText) {
          this.hasText = true;
        }
        this.cdr.detectChanges();
        this.setSizeStyle();
        this.calcStringSize();
      }
    }
    ngOnChanges() {
      this.hasText = !this.nzSrc && !!this.nzText;
      this.hasIcon = !this.nzSrc && !!this.nzIcon;
      this.hasSrc = !!this.nzSrc;
      this.setSizeStyle();
      this.calcStringSize();
    }
    calcStringSize() {
      var _a2, _b, _c;
      if (!this.hasText || !this.textEl) {
        return;
      }
      const textEl = this.textEl.nativeElement;
      const childrenWidth = textEl.offsetWidth;
      const avatarWidth = (_c = (_b = (_a2 = this.el).getBoundingClientRect) == null ? void 0 : _b.call(_a2).width) != null ? _c : 0;
      const offset = this.nzGap * 2 < avatarWidth ? this.nzGap * 2 : 8;
      const scale = avatarWidth - offset < childrenWidth ? (avatarWidth - offset) / childrenWidth : 1;
      textEl.style.transform = `scale(${scale}) translateX(-50%)`;
      textEl.style.lineHeight = this.customSize || "";
    }
    setSizeStyle() {
      if (typeof this.nzSize === "number") {
        this.customSize = toCssPixel(this.nzSize);
      } else {
        this.customSize = null;
      }
      this.cdr.markForCheck();
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzShape_decorators = [WithConfig()];
    _nzSize_decorators = [WithConfig()];
    _nzGap_decorators = [WithConfig()];
    __esDecorate(null, null, _nzShape_decorators, {
      kind: "field",
      name: "nzShape",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzShape" in obj,
        get: (obj) => obj.nzShape,
        set: (obj, value) => {
          obj.nzShape = value;
        }
      },
      metadata: _metadata
    }, _nzShape_initializers, _nzShape_extraInitializers);
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
    __esDecorate(null, null, _nzGap_decorators, {
      kind: "field",
      name: "nzGap",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzGap" in obj,
        get: (obj) => obj.nzGap,
        set: (obj, value) => {
          obj.nzGap = value;
        }
      },
      metadata: _metadata
    }, _nzGap_initializers, _nzGap_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzAvatarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-avatar"]],
    viewQuery: function NzAvatarComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.textEl = _t.first);
      }
    },
    hostAttrs: [1, "ant-avatar"],
    hostVars: 20,
    hostBindings: function NzAvatarComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275styleProp("width", ctx.customSize)("height", ctx.customSize)("line-height", ctx.customSize)("font-size", ctx.hasIcon && ctx.customSize ? ctx.nzSize / 2 : null, "px");
        \u0275\u0275classProp("ant-avatar-lg", ctx.nzSize === "large")("ant-avatar-sm", ctx.nzSize === "small")("ant-avatar-square", ctx.nzShape === "square")("ant-avatar-circle", ctx.nzShape === "circle")("ant-avatar-icon", ctx.nzIcon)("ant-avatar-image", ctx.hasSrc);
      }
    },
    inputs: {
      nzShape: "nzShape",
      nzSize: "nzSize",
      nzGap: [2, "nzGap", "nzGap", numberAttribute],
      nzText: "nzText",
      nzSrc: "nzSrc",
      nzSrcSet: "nzSrcSet",
      nzAlt: "nzAlt",
      nzIcon: "nzIcon",
      nzLoading: [1, "nzLoading"],
      nzFetchPriority: [1, "nzFetchPriority"]
    },
    outputs: {
      nzError: "nzError"
    },
    exportAs: ["nzAvatar"],
    features: [\u0275\u0275NgOnChangesFeature],
    ngContentSelectors: _c1,
    decls: 4,
    vars: 1,
    consts: [["textEl", ""], [3, "nzType"], [3, "src"], [1, "ant-avatar-string"], [3, "error", "src"]],
    template: function NzAvatarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275conditionalCreate(0, NzAvatarComponent_Conditional_0_Template, 1, 1, "nz-icon", 1)(1, NzAvatarComponent_Conditional_1_Template, 1, 5, "img", 2)(2, NzAvatarComponent_Conditional_2_Template, 3, 1, "span", 3);
        \u0275\u0275projection(3);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.nzIcon && ctx.hasIcon ? 0 : ctx.nzSrc && ctx.hasSrc ? 1 : ctx.nzText && ctx.hasText ? 2 : -1);
      }
    },
    dependencies: [NzIconModule, NzIconDirective],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzAvatarComponent, [{
    type: Component,
    args: [{
      selector: "nz-avatar",
      exportAs: "nzAvatar",
      imports: [NzIconModule],
      template: `
    @if (nzIcon && hasIcon) {
      <nz-icon [nzType]="nzIcon" />
    } @else if (nzSrc && hasSrc) {
      <img
        [src]="nzSrc"
        [attr.srcset]="nzSrcSet"
        [attr.alt]="nzAlt"
        [attr.loading]="nzLoading() || 'eager'"
        [attr.fetchpriority]="nzFetchPriority() || 'auto'"
        (error)="imgError($event)"
      />
    } @else if (nzText && hasText) {
      <span class="ant-avatar-string" #textEl>{{ nzText }}</span>
    }
    <ng-content />
  `,
      host: {
        class: "ant-avatar",
        "[class.ant-avatar-lg]": `nzSize === 'large'`,
        "[class.ant-avatar-sm]": `nzSize === 'small'`,
        "[class.ant-avatar-square]": `nzShape === 'square'`,
        "[class.ant-avatar-circle]": `nzShape === 'circle'`,
        "[class.ant-avatar-icon]": `nzIcon`,
        "[class.ant-avatar-image]": `hasSrc `,
        "[style.width]": "customSize",
        "[style.height]": "customSize",
        "[style.line-height]": "customSize",
        // nzSize type is number when customSize is true
        "[style.font-size.px]": "(hasIcon && customSize) ? $any(nzSize) / 2 : null"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], () => [], {
    nzShape: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzGap: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzText: [{
      type: Input
    }],
    nzSrc: [{
      type: Input
    }],
    nzSrcSet: [{
      type: Input
    }],
    nzAlt: [{
      type: Input
    }],
    nzIcon: [{
      type: Input
    }],
    nzLoading: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzLoading",
        required: false
      }]
    }],
    nzFetchPriority: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzFetchPriority",
        required: false
      }]
    }],
    nzError: [{
      type: Output
    }],
    textEl: [{
      type: ViewChild,
      args: ["textEl", {
        static: false
      }]
    }]
  });
})();
var _NzAvatarGroupComponent = class _NzAvatarGroupComponent {
};
__publicField(_NzAvatarGroupComponent, "\u0275fac", function NzAvatarGroupComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzAvatarGroupComponent)();
});
__publicField(_NzAvatarGroupComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzAvatarGroupComponent,
  selectors: [["nz-avatar-group"]],
  hostAttrs: [1, "ant-avatar-group"],
  exportAs: ["nzAvatarGroup"],
  ngContentSelectors: _c1,
  decls: 1,
  vars: 0,
  template: function NzAvatarGroupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzAvatarGroupComponent = _NzAvatarGroupComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzAvatarGroupComponent, [{
    type: Component,
    args: [{
      selector: "nz-avatar-group",
      exportAs: "nzAvatarGroup",
      template: `<ng-content />`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        class: "ant-avatar-group"
      }
    }]
  }], null, null);
})();
var _NzAvatarModule = class _NzAvatarModule {
};
__publicField(_NzAvatarModule, "\u0275fac", function NzAvatarModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzAvatarModule)();
});
__publicField(_NzAvatarModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzAvatarModule,
  imports: [NzAvatarComponent, NzAvatarGroupComponent],
  exports: [NzAvatarComponent, NzAvatarGroupComponent]
}));
__publicField(_NzAvatarModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzAvatarComponent]
}));
var NzAvatarModule = _NzAvatarModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzAvatarModule, [{
    type: NgModule,
    args: [{
      exports: [NzAvatarComponent, NzAvatarGroupComponent],
      imports: [NzAvatarComponent, NzAvatarGroupComponent]
    }]
  }], null, null);
})();

export {
  NzAvatarComponent,
  NzAvatarModule
};
//# sourceMappingURL=chunk-J2JH5WAC.js.map
