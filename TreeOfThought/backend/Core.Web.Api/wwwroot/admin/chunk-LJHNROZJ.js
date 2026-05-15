import {
  coerceCssPixelValue,
  requestAnimationFrame
} from "./chunk-UBWGFO7R.js";
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
} from "./chunk-UJ2IZ7EW.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-653SOEEV.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-animation.mjs
var NZ_NO_ANIMATION_CLASS = "nz-animate-disabled";
var NzNoAnimationDirective = class _NzNoAnimationDirective {
  animationType = inject(ANIMATION_MODULE_TYPE, {
    optional: true
  });
  nzNoAnimation = input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "nzNoAnimation"
  } : {}), {
    transform: booleanAttribute
  }));
  static \u0275fac = function NzNoAnimationDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzNoAnimationDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
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
  });
};
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
var NzNoAnimationModule = class _NzNoAnimationModule {
  static \u0275fac = function NzNoAnimationModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzNoAnimationModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _NzNoAnimationModule,
    imports: [NzNoAnimationDirective],
    exports: [NzNoAnimationDirective]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
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
var NzAnimationCollapseDirective = class _NzAnimationCollapseDirective {
  elementRef = inject(ElementRef);
  noAnimation = inject(NzNoAnimationDirective, {
    optional: true,
    host: true
  });
  animationEnabled = isAnimationEnabled(() => !this.noAnimation?.nzNoAnimation());
  open = input(false, ...ngDevMode ? [{
    debugName: "open"
  }] : []);
  leavedClassName = input("", ...ngDevMode ? [{
    debugName: "leavedClassName"
  }] : []);
  firstRender = true;
  constructor() {
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
  static \u0275fac = function NzAnimationCollapseDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzAnimationCollapseDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
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
  });
};
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
var NzAnimationTreeCollapseService = class _NzAnimationTreeCollapseService {
  firstRender = true;
  virtualScroll = false;
  animationDone$ = new Subject();
  constructor() {
    this.animationDone$.pipe(debounceTime(50), take(1)).subscribe(() => {
      this.firstRender = false;
    });
  }
  static \u0275fac = function NzAnimationTreeCollapseService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzAnimationTreeCollapseService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _NzAnimationTreeCollapseService,
    factory: _NzAnimationTreeCollapseService.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzAnimationTreeCollapseService, [{
    type: Injectable
  }], () => [], null);
})();
var NzAnimationTreeCollapseDirective = class _NzAnimationTreeCollapseDirective {
  treeCollapseService = inject(NzAnimationTreeCollapseService, {
    optional: true
  });
  noAnimation = inject(NzNoAnimationDirective, {
    optional: true,
    host: true
  });
  // should disable animation in virtual scrolling
  animationEnabled = isAnimationEnabled(() => !this.noAnimation?.nzNoAnimation() && !(this.treeCollapseService?.virtualScroll ?? false));
  get firstRender() {
    return this.treeCollapseService?.firstRender ?? false;
  }
  onAnimationEnter(event) {
    if (!this.animationEnabled() || this.firstRender) {
      this.treeCollapseService?.animationDone$.next();
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
  static \u0275fac = function NzAnimationTreeCollapseDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzAnimationTreeCollapseDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
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
  });
};
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
//# sourceMappingURL=chunk-LJHNROZJ.js.map
