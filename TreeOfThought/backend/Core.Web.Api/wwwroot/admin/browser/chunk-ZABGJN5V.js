import {
  coerceElement
} from "./chunk-OCLTPTCJ.js";
import {
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  Observable,
  Output,
  Subject,
  booleanAttribute,
  inject,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-6BQPXFZE.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-cdk-resize-observer.mjs
var NzResizeObserverFactory = class _NzResizeObserverFactory {
  create(callback) {
    return typeof ResizeObserver === "undefined" ? null : new ResizeObserver(callback);
  }
  static \u0275fac = function NzResizeObserverFactory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzResizeObserverFactory)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _NzResizeObserverFactory,
    factory: _NzResizeObserverFactory.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzResizeObserverFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var NzResizeObserver = class _NzResizeObserver {
  nzResizeObserverFactory = inject(NzResizeObserverFactory);
  destroyRef = inject(DestroyRef);
  /** Keeps track of the existing ResizeObservers so they can be reused. */
  observedElements = /* @__PURE__ */ new Map();
  constructor() {
    this.destroyRef.onDestroy(() => this.observedElements.forEach((_, element) => this.cleanupObserver(element)));
  }
  observe(elementOrRef) {
    const element = coerceElement(elementOrRef);
    return new Observable((observer) => {
      const stream = this.observeElement(element);
      const subscription = stream.subscribe(observer);
      return () => {
        subscription.unsubscribe();
        this.unobserveElement(element);
      };
    });
  }
  /**
   * Observes the given element by using the existing ResizeObserver if available, or creating a
   * new one if not.
   */
  observeElement(element) {
    if (!this.observedElements.has(element)) {
      const stream = new Subject();
      const observer = this.nzResizeObserverFactory.create((mutations) => stream.next(mutations));
      if (observer) {
        observer.observe(element);
      }
      this.observedElements.set(element, {
        observer,
        stream,
        count: 1
      });
    } else {
      this.observedElements.get(element).count++;
    }
    return this.observedElements.get(element).stream;
  }
  /**
   * Un-observes the given element and cleans up the underlying ResizeObserver if nobody else is
   * observing this element.
   */
  unobserveElement(element) {
    if (this.observedElements.has(element)) {
      this.observedElements.get(element).count--;
      if (!this.observedElements.get(element).count) {
        this.cleanupObserver(element);
      }
    }
  }
  /** Clean up the underlying ResizeObserver for the specified element. */
  cleanupObserver(element) {
    if (this.observedElements.has(element)) {
      const {
        observer,
        stream
      } = this.observedElements.get(element);
      if (observer) {
        observer.disconnect();
      }
      stream.complete();
      this.observedElements.delete(element);
    }
  }
  static \u0275fac = function NzResizeObserver_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzResizeObserver)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _NzResizeObserver,
    factory: _NzResizeObserver.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzResizeObserver, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var NzResizeObserverDirective = class _NzResizeObserverDirective {
  nzResizeObserver = inject(NzResizeObserver);
  elementRef = inject(ElementRef);
  destroyRef = inject(DestroyRef);
  nzResizeObserve = new EventEmitter();
  nzResizeObserverDisabled = false;
  currentSubscription = null;
  subscribe() {
    this.unsubscribe();
    this.currentSubscription = this.nzResizeObserver.observe(this.elementRef).subscribe(this.nzResizeObserve);
  }
  unsubscribe() {
    this.currentSubscription?.unsubscribe();
  }
  constructor() {
    this.destroyRef.onDestroy(() => this.unsubscribe());
  }
  ngAfterContentInit() {
    if (!this.currentSubscription && !this.nzResizeObserverDisabled) {
      this.subscribe();
    }
  }
  ngOnChanges(changes) {
    const {
      nzResizeObserve
    } = changes;
    if (nzResizeObserve) {
      if (this.nzResizeObserverDisabled) {
        this.unsubscribe();
      } else {
        this.subscribe();
      }
    }
  }
  static \u0275fac = function NzResizeObserverDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzResizeObserverDirective)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _NzResizeObserverDirective,
    selectors: [["", "nzResizeObserver", ""]],
    inputs: {
      nzResizeObserverDisabled: [2, "nzResizeObserverDisabled", "nzResizeObserverDisabled", booleanAttribute]
    },
    outputs: {
      nzResizeObserve: "nzResizeObserve"
    },
    features: [\u0275\u0275ProvidersFeature([NzResizeObserverFactory]), \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzResizeObserverDirective, [{
    type: Directive,
    args: [{
      selector: "[nzResizeObserver]",
      providers: [NzResizeObserverFactory]
    }]
  }], () => [], {
    nzResizeObserve: [{
      type: Output
    }],
    nzResizeObserverDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var NzResizeObserverModule = class _NzResizeObserverModule {
  static \u0275fac = function NzResizeObserverModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NzResizeObserverModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _NzResizeObserverModule,
    imports: [NzResizeObserverDirective],
    exports: [NzResizeObserverDirective]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzResizeObserverModule, [{
    type: NgModule,
    args: [{
      imports: [NzResizeObserverDirective],
      exports: [NzResizeObserverDirective]
    }]
  }], null, null);
})();

export {
  NzResizeObserver
};
//# sourceMappingURL=chunk-ZABGJN5V.js.map
