import {
  coerceCssPixelValue,
  requestAnimationFrame
} from "./chunk-W3A2S6TY.js";
import {
  ANIMATION_MODULE_TYPE,
  Directive,
  ElementRef,
  Injectable,
  Input,
  NgModule,
  Subject,
  assertInInjectionContext,
  booleanAttribute,
  computed,
  debounceTime,
  effect,
  inject,
  input,
  setClassMetadata,
  signal,
  take,
  ɵɵanimateEnterListener,
  ɵɵanimateLeaveListener,
  ɵɵclassProp,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵlistener
} from "./chunk-2BQMWOA2.js";
import {
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-MYGOUE3E.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-animation.mjs
var NZ_NO_ANIMATION_CLASS = "nz-animate-disabled";
var _NzNoAnimationDirective = class _NzNoAnimationDirective {
  constructor() {
    __publicField(this, "animationType", inject(ANIMATION_MODULE_TYPE, {
      optional: true
    }));
    __publicField(this, "nzNoAnimation", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzNoAnimation"
    } : {}), {
      transform: booleanAttribute
    })));
  }
};
__publicField(_NzNoAnimationDirective, "\u0275fac", function NzNoAnimationDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzNoAnimationDirective)();
});
__publicField(_NzNoAnimationDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzNoAnimationDirective,
  selectors: [["", "nzNoAnimation", ""]],
  hostVars: 2,
  hostBindings: function NzNoAnimationDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("nz-animate-disabled", ctx.nzNoAnimation() || ctx.animationType === "NoopAnimations");
    }
  },
  inputs: {
    nzNoAnimation: [1, "nzNoAnimation"]
  },
  exportAs: ["nzNoAnimation"]
}));
var NzNoAnimationDirective = _NzNoAnimationDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzNoAnimationDirective, [{
    type: Directive,
    args: [{
      selector: "[nzNoAnimation]",
      exportAs: "nzNoAnimation",
      host: {
        [`[class.${NZ_NO_ANIMATION_CLASS}]`]: `nzNoAnimation() || animationType === 'NoopAnimations'`
      }
    }]
  }], null, {
    nzNoAnimation: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzNoAnimation",
        required: false
      }]
    }]
  });
})();
var _NzNoAnimationModule = class _NzNoAnimationModule {
};
__publicField(_NzNoAnimationModule, "\u0275fac", function NzNoAnimationModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzNoAnimationModule)();
});
__publicField(_NzNoAnimationModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzNoAnimationModule,
  imports: [NzNoAnimationDirective],
  exports: [NzNoAnimationDirective]
}));
__publicField(_NzNoAnimationModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({}));
var NzNoAnimationModule = _NzNoAnimationModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzNoAnimationModule, [{
    type: NgModule,
    args: [{
      imports: [NzNoAnimationDirective],
      exports: [NzNoAnimationDirective]
    }]
  }], null, null);
})();
function _internalAnimationEnabled() {
  return inject(ANIMATION_MODULE_TYPE, {
    optional: true
  }) !== "NoopAnimations";
}
function isAnimationEnabled(getter) {
  if (typeof ngDevMode !== "undefined" && ngDevMode) {
    assertInInjectionContext(isAnimationEnabled);
  }
  return _internalAnimationEnabled() ? computed(getter) : signal(false);
}
function withAnimationCheck(classNameGetter) {
  if (typeof ngDevMode !== "undefined" && ngDevMode) {
    assertInInjectionContext(withAnimationCheck);
  }
  return _internalAnimationEnabled() ? computed(classNameGetter) : signal(NZ_NO_ANIMATION_CLASS);
}
var COLLAPSE_MOTION_CLASS = "ant-motion-collapse";
var _NzAnimationCollapseDirective = class _NzAnimationCollapseDirective {
  constructor() {
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "noAnimation", inject(NzNoAnimationDirective, {
      optional: true,
      host: true
    }));
    __publicField(this, "animationEnabled", isAnimationEnabled(() => {
      var _a;
      return !((_a = this.noAnimation) == null ? void 0 : _a.nzNoAnimation());
    }));
    __publicField(this, "open", input(false, ...ngDevMode ? [{
      debugName: "open"
    }] : []));
    __publicField(this, "leavedClassName", input("", ...ngDevMode ? [{
      debugName: "leavedClassName"
    }] : []));
    __publicField(this, "firstRender", true);
    effect(() => {
      const open = this.open();
      const animationEnabled = this.animationEnabled() && !this.firstRender;
      const element = this.elementRef.nativeElement;
      const leavedClassName = this.leavedClassName();
      if (open && leavedClassName) {
        element.classList.remove(leavedClassName);
      }
      if (animationEnabled) {
        element.classList.add(COLLAPSE_MOTION_CLASS);
        if (open) {
          requestAnimationFrame(() => {
            const scrollHeight = this.getActualScrollHeight(element);
            element.style.height = coerceCssPixelValue(scrollHeight);
            element.style.opacity = "1";
          });
        } else {
          const scrollHeight = this.getActualScrollHeight(element);
          element.style.height = coerceCssPixelValue(scrollHeight);
          requestAnimationFrame(() => {
            element.style.height = coerceCssPixelValue(0);
            element.style.opacity = "0";
          });
        }
      } else {
        if (open) {
          element.style.height = "auto";
          element.style.opacity = "1";
        } else {
          element.style.height = coerceCssPixelValue(0);
          element.style.opacity = "0";
          if (leavedClassName) {
            element.classList.add(leavedClassName);
          }
        }
      }
      this.firstRender = false;
    });
  }
  // Calculate height by summing up direct children's offsetHeight
  // This naturally excludes collapsed nested submenus since they have height: 0
  getActualScrollHeight(element) {
    return Array.from(element.children).reduce((acc, child) => acc + child.offsetHeight, 0);
  }
  onTransitionEnd(event) {
    if (!this.animationEnabled() || event.target !== this.elementRef.nativeElement) {
      return;
    }
    if (this.open()) {
      this.elementRef.nativeElement.style.height = "auto";
    } else if (this.leavedClassName()) {
      this.elementRef.nativeElement.classList.add(this.leavedClassName());
    }
    this.elementRef.nativeElement.classList.remove(COLLAPSE_MOTION_CLASS);
  }
};
__publicField(_NzAnimationCollapseDirective, "\u0275fac", function NzAnimationCollapseDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzAnimationCollapseDirective)();
});
__publicField(_NzAnimationCollapseDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzAnimationCollapseDirective,
  selectors: [["", "animation-collapse", ""]],
  hostBindings: function NzAnimationCollapseDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("transitionend", function NzAnimationCollapseDirective_transitionend_HostBindingHandler($event) {
        return ctx.onTransitionEnd($event);
      });
    }
  },
  inputs: {
    open: [1, "open"],
    leavedClassName: [1, "leavedClassName"]
  }
}));
var NzAnimationCollapseDirective = _NzAnimationCollapseDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzAnimationCollapseDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[animation-collapse]",
      host: {
        "(transitionend)": "onTransitionEnd($event)"
      }
    }]
  }], () => [], {
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
var _NzAnimationTreeCollapseService = class _NzAnimationTreeCollapseService {
  constructor() {
    __publicField(this, "firstRender", true);
    __publicField(this, "virtualScroll", false);
    __publicField(this, "animationDone$", new Subject());
    this.animationDone$.pipe(debounceTime(50), take(1)).subscribe(() => {
      this.firstRender = false;
    });
  }
};
__publicField(_NzAnimationTreeCollapseService, "\u0275fac", function NzAnimationTreeCollapseService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzAnimationTreeCollapseService)();
});
__publicField(_NzAnimationTreeCollapseService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _NzAnimationTreeCollapseService,
  factory: _NzAnimationTreeCollapseService.\u0275fac
}));
var NzAnimationTreeCollapseService = _NzAnimationTreeCollapseService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzAnimationTreeCollapseService, [{
    type: Injectable
  }], () => [], null);
})();
var _NzAnimationTreeCollapseDirective = class _NzAnimationTreeCollapseDirective {
  constructor() {
    __publicField(this, "treeCollapseService", inject(NzAnimationTreeCollapseService, {
      optional: true
    }));
    __publicField(this, "noAnimation", inject(NzNoAnimationDirective, {
      optional: true,
      host: true
    }));
    // should disable animation in virtual scrolling
    __publicField(this, "animationEnabled", isAnimationEnabled(() => {
      var _a, _b, _c;
      return !((_a = this.noAnimation) == null ? void 0 : _a.nzNoAnimation()) && !((_c = (_b = this.treeCollapseService) == null ? void 0 : _b.virtualScroll) != null ? _c : false);
    }));
  }
  get firstRender() {
    var _a, _b;
    return (_b = (_a = this.treeCollapseService) == null ? void 0 : _a.firstRender) != null ? _b : false;
  }
  onAnimationEnter(event) {
    var _a;
    if (!this.animationEnabled() || this.firstRender) {
      (_a = this.treeCollapseService) == null ? void 0 : _a.animationDone$.next();
      event.animationComplete();
      return;
    }
    const element = event.target;
    element.style.height = coerceCssPixelValue(0);
    element.style.opacity = "0";
    element.classList.add(COLLAPSE_MOTION_CLASS);
    const onTransitionEnd = (e) => {
      if (e.propertyName !== "height") {
        return;
      }
      element.removeEventListener("transitionend", onTransitionEnd);
      element.style.height = "auto";
      element.classList.remove(COLLAPSE_MOTION_CLASS);
      event.animationComplete();
    };
    requestAnimationFrame(() => {
      element.style.height = coerceCssPixelValue(element.scrollHeight);
      element.style.opacity = "1";
    });
    element.addEventListener("transitionend", onTransitionEnd);
  }
  onAnimationLeave(event) {
    if (!this.animationEnabled()) {
      event.animationComplete();
      return;
    }
    const element = event.target;
    element.style.height = coerceCssPixelValue(element.scrollHeight);
    element.style.opacity = "1";
    element.classList.add(COLLAPSE_MOTION_CLASS);
    const onTransitionEnd = (e) => {
      if (e.propertyName !== "height") {
        return;
      }
      element.removeEventListener("transitionend", onTransitionEnd);
      event.animationComplete();
    };
    requestAnimationFrame(() => {
      element.style.height = coerceCssPixelValue(0);
      element.style.opacity = "0";
      element.style.marginBottom = "0";
    });
    element.addEventListener("transitionend", onTransitionEnd);
  }
};
__publicField(_NzAnimationTreeCollapseDirective, "\u0275fac", function NzAnimationTreeCollapseDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzAnimationTreeCollapseDirective)();
});
__publicField(_NzAnimationTreeCollapseDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzAnimationTreeCollapseDirective,
  selectors: [["", "animation-tree-collapse", ""]],
  hostBindings: function NzAnimationTreeCollapseDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275animateEnterListener(function NzAnimationTreeCollapseDirective_animateenter_HostBindingHandler($event) {
        return ctx.onAnimationEnter($event);
      });
      \u0275\u0275animateLeaveListener(function NzAnimationTreeCollapseDirective_animateleave_HostBindingHandler($event) {
        return ctx.onAnimationLeave($event);
      });
    }
  }
}));
var NzAnimationTreeCollapseDirective = _NzAnimationTreeCollapseDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzAnimationTreeCollapseDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[animation-tree-collapse]",
      host: {
        "(animate.enter)": "onAnimationEnter($event)",
        "(animate.leave)": "onAnimationLeave($event)"
      }
    }]
  }], null, null);
})();
var SLIDE_ANIMATION_CLASS = {
  enter: "ant-slide-up-enter ant-slide-up-enter-active",
  leave: "ant-slide-up-leave ant-slide-up-leave-active"
};
var slideAnimationEnter = () => withAnimationCheck(() => SLIDE_ANIMATION_CLASS.enter);
var slideAnimationLeave = () => withAnimationCheck(() => SLIDE_ANIMATION_CLASS.leave);

export {
  NzNoAnimationDirective,
  isAnimationEnabled,
  withAnimationCheck,
  NzAnimationCollapseDirective,
  NzAnimationTreeCollapseService,
  NzAnimationTreeCollapseDirective,
  SLIDE_ANIMATION_CLASS,
  slideAnimationEnter,
  slideAnimationLeave
};
//# sourceMappingURL=chunk-DI76EDHS.js.map
