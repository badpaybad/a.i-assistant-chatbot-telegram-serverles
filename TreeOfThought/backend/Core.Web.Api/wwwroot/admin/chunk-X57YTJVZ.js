import {
  NzProgressComponent,
  NzProgressModule
} from "./chunk-K72AAJ74.js";
import {
  FirebaseService
} from "./chunk-CHGYR3B5.js";
import {
  AppNotificationService,
  CommonModule,
  Directionality,
  ENTER,
  FocusMonitor,
  FormsModule,
  HttpClient,
  HttpClientService,
  LEFT_ARROW,
  NG_VALUE_ACCESSOR,
  NZ_FORM_SIZE,
  NgControlStatus,
  NgModel,
  NzButtonComponent,
  NzButtonModule,
  NzColDirective,
  NzConfigService,
  NzGridModule,
  NzIconDirective,
  NzIconModule,
  NzOutletModule,
  NzRowDirective,
  NzSpinModule,
  NzStringTemplateOutletDirective,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzWaveModule,
  RIGHT_ARROW,
  SPACE,
  WithConfig,
  fromEventOutsideAngular,
  takeUntilDestroyed
} from "./chunk-ZZKC72UK.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  Injectable,
  Input,
  NgModule,
  NgZone,
  ViewChild,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
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
  __publicField
} from "./chunk-MYGOUE3E.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-switch.mjs
var _c0 = ["switchElement"];
function NzSwitchComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 3);
  }
}
function NzSwitchComponent_Conditional_5_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzCheckedChildren);
  }
}
function NzSwitchComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzSwitchComponent_Conditional_5_ng_container_0_Template, 2, 1, "ng-container", 6);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzCheckedChildren);
  }
}
function NzSwitchComponent_Conditional_6_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzUnCheckedChildren);
  }
}
function NzSwitchComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzSwitchComponent_Conditional_6_ng_container_0_Template, 2, 1, "ng-container", 6);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzUnCheckedChildren);
  }
}
var NZ_CONFIG_MODULE_NAME = "switch";
var NzSwitchComponent = (() => {
  var _a;
  let _nzSize_decorators;
  let _nzSize_initializers = [];
  let _nzSize_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME);
      __publicField(this, "nzConfigService", inject(NzConfigService));
      __publicField(this, "el", inject(ElementRef).nativeElement);
      __publicField(this, "ngZone", inject(NgZone));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "focusMonitor", inject(FocusMonitor));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "isChecked", false);
      __publicField(this, "onChange", () => {
      });
      __publicField(this, "onTouched", () => {
      });
      __publicField(this, "switchElement");
      __publicField(this, "nzLoading", false);
      __publicField(this, "nzDisabled", false);
      __publicField(this, "nzControl", false);
      __publicField(this, "nzCheckedChildren", null);
      __publicField(this, "nzUnCheckedChildren", null);
      __publicField(this, "nzSize", __runInitializers(this, _nzSize_initializers, "default"));
      __publicField(this, "nzId", (__runInitializers(this, _nzSize_extraInitializers), null));
      __publicField(this, "dir", inject(Directionality).valueSignal);
      __publicField(this, "isNzDisableFirstChange", true);
      __publicField(this, "size", signal(this.nzSize, ...ngDevMode ? [{
        debugName: "size"
      }] : []));
      __publicField(this, "formSize", inject(NZ_FORM_SIZE, {
        optional: true
      }));
      __publicField(this, "finalSize", computed(() => {
        var _a2;
        return ((_a2 = this.formSize) == null ? void 0 : _a2.call(this)) || this.size();
      }, ...ngDevMode ? [{
        debugName: "finalSize"
      }] : []));
      this.destroyRef.onDestroy(() => {
        this.focusMonitor.stopMonitoring(this.switchElement.nativeElement);
      });
    }
    updateValue(value) {
      if (this.isChecked !== value) {
        this.isChecked = value;
        this.onChange(this.isChecked);
      }
    }
    focus() {
      this.focusMonitor.focusVia(this.switchElement.nativeElement, "keyboard");
    }
    blur() {
      this.switchElement.nativeElement.blur();
    }
    ngOnChanges(changes) {
      const {
        nzSize
      } = changes;
      if (nzSize) {
        this.size.set(nzSize.currentValue);
      }
    }
    ngOnInit() {
      fromEventOutsideAngular(this.el, "click").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
        event.preventDefault();
        if (this.nzControl || this.nzDisabled || this.nzLoading) {
          return;
        }
        this.ngZone.run(() => {
          this.updateValue(!this.isChecked);
          this.cdr.markForCheck();
        });
      });
      fromEventOutsideAngular(this.switchElement.nativeElement, "keydown").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
        if (this.nzControl || this.nzDisabled || this.nzLoading) {
          return;
        }
        const {
          keyCode
        } = event;
        if (keyCode !== LEFT_ARROW && keyCode !== RIGHT_ARROW && keyCode !== SPACE && keyCode !== ENTER) {
          return;
        }
        event.preventDefault();
        this.ngZone.run(() => {
          if (keyCode === LEFT_ARROW) {
            this.updateValue(false);
          } else if (keyCode === RIGHT_ARROW) {
            this.updateValue(true);
          } else if (keyCode === SPACE || keyCode === ENTER) {
            this.updateValue(!this.isChecked);
          }
          this.cdr.markForCheck();
        });
      });
    }
    ngAfterViewInit() {
      this.focusMonitor.monitor(this.switchElement.nativeElement, true).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((focusOrigin) => {
        if (!focusOrigin) {
          Promise.resolve().then(() => this.onTouched());
        }
      });
    }
    writeValue(value) {
      this.isChecked = value;
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
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzSize_decorators = [WithConfig()];
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
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzSwitchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-switch"]],
    viewQuery: function NzSwitchComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.switchElement = _t.first);
      }
    },
    inputs: {
      nzLoading: [2, "nzLoading", "nzLoading", booleanAttribute],
      nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
      nzControl: [2, "nzControl", "nzControl", booleanAttribute],
      nzCheckedChildren: "nzCheckedChildren",
      nzUnCheckedChildren: "nzUnCheckedChildren",
      nzSize: "nzSize",
      nzId: "nzId"
    },
    exportAs: ["nzSwitch"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _a),
      multi: true
    }]), \u0275\u0275NgOnChangesFeature],
    decls: 8,
    vars: 15,
    consts: [["switchElement", ""], ["nz-wave", "", "type", "button", 1, "ant-switch", 3, "disabled", "nzWaveExtraNode"], [1, "ant-switch-handle"], ["nzType", "loading", 1, "ant-switch-loading-icon"], [1, "ant-switch-inner"], [1, "ant-click-animating-node"], [4, "nzStringTemplateOutlet"]],
    template: function NzSwitchComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "button", 1, 0)(2, "span", 2);
        \u0275\u0275conditionalCreate(3, NzSwitchComponent_Conditional_3_Template, 1, 0, "nz-icon", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 4);
        \u0275\u0275conditionalCreate(5, NzSwitchComponent_Conditional_5_Template, 1, 1, "ng-container")(6, NzSwitchComponent_Conditional_6_Template, 1, 1, "ng-container");
        \u0275\u0275elementEnd();
        \u0275\u0275element(7, "div", 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275classProp("ant-switch-checked", ctx.isChecked)("ant-switch-loading", ctx.nzLoading)("ant-switch-disabled", ctx.nzDisabled)("ant-switch-small", ctx.finalSize() === "small")("ant-switch-rtl", ctx.dir() === "rtl");
        \u0275\u0275property("disabled", ctx.nzDisabled)("nzWaveExtraNode", true);
        \u0275\u0275attribute("id", ctx.nzId);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.nzLoading ? 3 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.isChecked ? 5 : 6);
      }
    },
    dependencies: [NzWaveModule, NzWaveDirective, NzIconModule, NzIconDirective, NzOutletModule, NzStringTemplateOutletDirective],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSwitchComponent, [{
    type: Component,
    args: [{
      selector: "nz-switch",
      exportAs: "nzSwitch",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzSwitchComponent),
        multi: true
      }],
      template: `
    <button
      nz-wave
      type="button"
      class="ant-switch"
      #switchElement
      [attr.id]="nzId"
      [disabled]="nzDisabled"
      [class.ant-switch-checked]="isChecked"
      [class.ant-switch-loading]="nzLoading"
      [class.ant-switch-disabled]="nzDisabled"
      [class.ant-switch-small]="finalSize() === 'small'"
      [class.ant-switch-rtl]="dir() === 'rtl'"
      [nzWaveExtraNode]="true"
    >
      <span class="ant-switch-handle">
        @if (nzLoading) {
          <nz-icon nzType="loading" class="ant-switch-loading-icon" />
        }
      </span>
      <span class="ant-switch-inner">
        @if (isChecked) {
          <ng-container *nzStringTemplateOutlet="nzCheckedChildren">{{ nzCheckedChildren }}</ng-container>
        } @else {
          <ng-container *nzStringTemplateOutlet="nzUnCheckedChildren">{{ nzUnCheckedChildren }}</ng-container>
        }
      </span>
      <div class="ant-click-animating-node"></div>
    </button>
  `,
      imports: [NzWaveModule, NzIconModule, NzOutletModule]
    }]
  }], () => [], {
    switchElement: [{
      type: ViewChild,
      args: ["switchElement", {
        static: true
      }]
    }],
    nzLoading: [{
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
    nzControl: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCheckedChildren: [{
      type: Input
    }],
    nzUnCheckedChildren: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzId: [{
      type: Input
    }]
  });
})();
var _NzSwitchModule = class _NzSwitchModule {
};
__publicField(_NzSwitchModule, "\u0275fac", function NzSwitchModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSwitchModule)();
});
__publicField(_NzSwitchModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzSwitchModule,
  imports: [NzSwitchComponent],
  exports: [NzSwitchComponent]
}));
__publicField(_NzSwitchModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzSwitchComponent]
}));
var NzSwitchModule = _NzSwitchModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSwitchModule, [{
    type: NgModule,
    args: [{
      imports: [NzSwitchComponent],
      exports: [NzSwitchComponent]
    }]
  }], null, null);
})();

// projects/tot/nhan-dien-khuon-mat/src/lib/services/nhan-dien-khuon-mat.service.ts
var _NhanDienKhuonMatService = class _NhanDienKhuonMatService {
  constructor() {
    this.http = inject(HttpClientService);
    this.rawHttp = inject(HttpClient);
  }
  /**
   * Loads the static facefinder cascade classifier binary from assets
   */
  loadModel() {
    return this.rawHttp.get("/assets/models/facefinder", { responseType: "arraybuffer" });
  }
  /**
   * Saves the original image and selected face crops to the server GCS and database.
   */
  saveSession(originalFile, croppedFaces, trackingId) {
    const formData = new FormData();
    formData.append("originalFile", originalFile);
    croppedFaces.forEach((face, idx) => {
      const faceFile = new File([face.blob], `face_${idx}.jpg`, { type: "image/jpeg" });
      formData.append("croppedFiles", faceFile);
      formData.append("boundingBoxes", face.boundingBox);
    });
    return this.http.post("/api/face-detection/save", formData, { trackingId });
  }
};
_NhanDienKhuonMatService.\u0275fac = function NhanDienKhuonMatService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NhanDienKhuonMatService)();
};
_NhanDienKhuonMatService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NhanDienKhuonMatService, factory: _NhanDienKhuonMatService.\u0275fac, providedIn: "root" });
var NhanDienKhuonMatService = _NhanDienKhuonMatService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NhanDienKhuonMatService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// projects/tot/nhan-dien-khuon-mat/src/lib/components/nhan-dien-khuon-mat/nhan-dien-khuon-mat.ts
var _forTrack0 = ($index, $item) => $item.id;
function NhanDienKhuonMatComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_Conditional_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetAll());
    });
    \u0275\u0275element(1, "span", 13);
    \u0275\u0275text(2, " X\xF3a l\xE0m l\u1EA1i ");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 14);
    \u0275\u0275listener("dragover", function NhanDienKhuonMatComponent_Conditional_10_Template_div_dragover_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDragOver($event));
    })("dragleave", function NhanDienKhuonMatComponent_Conditional_10_Template_div_dragleave_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDragLeave($event));
    })("drop", function NhanDienKhuonMatComponent_Conditional_10_Template_div_drop_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDrop($event));
    })("click", function NhanDienKhuonMatComponent_Conditional_10_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const folderInput_r4 = \u0275\u0275reference(11);
      return \u0275\u0275resetView(folderInput_r4.click());
    });
    \u0275\u0275elementStart(2, "div", 15);
    \u0275\u0275element(3, "span", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 17);
    \u0275\u0275text(5, "K\xE9o & th\u1EA3 th\u01B0 m\u1EE5c \u1EA3nh c\u1EE7a b\u1EA1n t\u1EA1i \u0111\xE2y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 18);
    \u0275\u0275text(7, "Ho\u1EB7c nh\u1EA5p chu\u1ED9t \u0111\u1EC3 ch\u1ECDn th\u01B0 m\u1EE5c t\u1EEB m\xE1y t\xEDnh c\u1EE7a b\u1EA1n (h\u1ED7 tr\u1EE3 \u0111\u1ECDc \u0111\u1EC7 quy th\u01B0 m\u1EE5c con)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 19);
    \u0275\u0275text(9, " Ch\u1ECDn th\u01B0 m\u1EE5c \u1EA3nh ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 20, 0);
    \u0275\u0275listener("change", function NhanDienKhuonMatComponent_Conditional_10_Template_input_change_10_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFolderSelected($event));
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("drag-active", ctx_r1.isDragActive);
  }
}
function NhanDienKhuonMatComponent_Conditional_11_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 34)(1, "div", 35);
    \u0275\u0275elementStart(2, "div", 36);
    \u0275\u0275element(3, "span", 37);
    \u0275\u0275text(4, " \u0110ang qu\xE9t... ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.currentScanImgUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275property("nzSpin", true);
  }
}
function NhanDienKhuonMatComponent_Conditional_11_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275text(1, " \u0110ang chu\u1EA9n b\u1ECB qu\xE9t... ");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 21)(2, "div", 22)(3, "div", 23);
    \u0275\u0275conditionalCreate(4, NhanDienKhuonMatComponent_Conditional_11_Conditional_4_Template, 5, 2)(5, NhanDienKhuonMatComponent_Conditional_11_Conditional_5_Template, 2, 0, "div", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 25)(7, "h3", 26);
    \u0275\u0275text(8, "\u0110ang qu\xE9t \u1EA3nh & nh\u1EADn di\u1EC7n khu\xF4n m\u1EB7t...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 27);
    \u0275\u0275text(10, " H\u1EC7 th\u1ED1ng \u0111ang ch\u1EA1y thu\u1EADt to\xE1n ");
    \u0275\u0275elementStart(11, "strong");
    \u0275\u0275text(12, "pico.js");
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " \u0111\u1EC3 \u0111\u1ECBnh v\u1ECB khu\xF4n m\u1EB7t tr\xEAn t\u1EEBng t\u1EC7p tin \u1EA3nh m\u1ED9t c\xE1ch tu\u1EA7n t\u1EF1. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 28)(15, "div", 29)(16, "span");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(20, "nz-progress", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 31)(22, "div");
    \u0275\u0275element(23, "span", 32);
    \u0275\u0275text(24, " \u1EA2nh g\u1ED1c: ");
    \u0275\u0275elementStart(25, "strong");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div");
    \u0275\u0275element(28, "span", 33);
    \u0275\u0275text(29, " \u0110\xE3 ph\xE1t hi\u1EC7n: ");
    \u0275\u0275elementStart(30, "strong");
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzGutter", 24);
    \u0275\u0275advance();
    \u0275\u0275property("nzXs", 24)("nzMd", 10);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.currentScanImgUrl ? 4 : 5);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzXs", 24)("nzMd", 14);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate2("Ti\u1EBFn tr\xECnh: ", ctx_r1.scannedCount, " / ", ctx_r1.totalFilesToProcess, " t\u1EC7p tin");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.scanPercent, "%");
    \u0275\u0275advance();
    \u0275\u0275property("nzPercent", ctx_r1.scanPercent)("nzStrokeWidth", 10);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.totalFilesToProcess);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.totalDetectedFacesCount, " m\u1EB7t");
  }
}
function NhanDienKhuonMatComponent_Conditional_12_For_6_Conditional_0_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 50);
    \u0275\u0275element(2, "img", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 52);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "nz-switch", 53);
    \u0275\u0275twoWayListener("ngModelChange", function NhanDienKhuonMatComponent_Conditional_12_For_6_Conditional_0_For_11_Template_nz_switch_ngModelChange_5_listener($event) {
      const face_r6 = \u0275\u0275restoreView(_r5).$implicit;
      \u0275\u0275twoWayBindingSet(face_r6.selected, $event) || (face_r6.selected = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const face_r6 = ctx.$implicit;
    const \u0275$index_138_r7 = ctx.$index;
    \u0275\u0275classProp("excluded", !face_r6.selected);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", face_r6.croppedUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" M\u1EB7t #", \u0275$index_138_r7 + 1, " ");
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", face_r6.selected);
  }
}
function NhanDienKhuonMatComponent_Conditional_12_For_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "div", 42);
    \u0275\u0275element(2, "canvas", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 44)(4, "div", 3)(5, "h4", 45);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 46);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 47);
    \u0275\u0275repeaterCreate(10, NhanDienKhuonMatComponent_Conditional_12_For_6_Conditional_0_For_11_Template, 6, 5, "div", 48, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const photo_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("id", "canvas_" + photo_r8.id);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", photo_r8.fileName, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" T\xECm th\u1EA5y ", photo_r8.faces.length, " khu\xF4n m\u1EB7t ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(photo_r8.faces);
  }
}
function NhanDienKhuonMatComponent_Conditional_12_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NhanDienKhuonMatComponent_Conditional_12_For_6_Conditional_0_Template, 12, 3, "div", 41);
  }
  if (rf & 2) {
    const photo_r8 = ctx.$implicit;
    \u0275\u0275conditional(photo_r8.faces.length > 0 ? 0 : -1);
  }
}
function NhanDienKhuonMatComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "h3", 38);
    \u0275\u0275element(2, "span", 39);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 40);
    \u0275\u0275repeaterCreate(5, NhanDienKhuonMatComponent_Conditional_12_For_6_Template, 1, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" K\u1EBFt Qu\u1EA3 Qu\xE9t & Xem Tr\u01B0\u1EDBc Khu\xF4n M\u1EB7t (", ctx_r1.getPhotosWithFacesCount(), " \u1EA3nh c\xF3 m\u1EB7t) ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.processedPhotos);
  }
}
function NhanDienKhuonMatComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 54);
    \u0275\u0275element(2, "span", 55);
    \u0275\u0275elementStart(3, "div")(4, "div", 56);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 57);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "button", 58);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_Conditional_13_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.uploadAndSave());
    });
    \u0275\u0275text(9, " L\u01B0u tr\u1EEF l\xEAn Server ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" \u0110\xE3 ch\u1ECDn ", ctx_r1.getSelectedFacesCount(), " khu\xF4n m\u1EB7t \u0111\u1EC3 l\u01B0u tr\u1EEF ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" T\u1EEB ", ctx_r1.getSelectedOriginalPhotosCount(), " t\u1EC7p tin \u1EA3nh g\u1ED1c kh\xE1c nhau ");
    \u0275\u0275advance();
    \u0275\u0275property("nzLoading", ctx_r1.isUploading);
  }
}
function NhanDienKhuonMatComponent_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275element(1, "nz-progress", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2", 62);
    \u0275\u0275text(3, "\u0110ang \u0111\u1ED3ng b\u1ED9 d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 63);
    \u0275\u0275text(5, " \u0110ang t\u1EA3i \u1EA3nh g\u1ED1c v\xE0 c\xE1c khu\xF4n m\u1EB7t \u0111\xE3 ch\u1ECDn l\xEAn Google Cloud Storage. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 64);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzPercent", ctx_r1.uploadPercent)("nzStrokeWidth", 8)("nzWidth", 120)("nzFormat", ctx_r1.uploadProgressFormat);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2(" \u0110ang x\u1EED l\xFD \u1EA3nh: ", ctx_r1.currentUploadIndex, " / ", ctx_r1.totalUploadCount, " ");
  }
}
function NhanDienKhuonMatComponent_Conditional_14_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 65);
    \u0275\u0275element(1, "span", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "h2", 67);
    \u0275\u0275text(3, "T\u1EA3i L\xEAn Th\xE0nh C\xF4ng!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 68);
    \u0275\u0275text(5, " \u0110\xE3 l\u01B0u tr\u1EEF th\xE0nh c\xF4ng to\xE0n b\u1ED9 \u1EA3nh g\u1ED1c v\xE0 c\xE1c khu\xF4n m\u1EB7t \u0111\u01B0\u1EE3c ch\u1ECDn v\xE0o h\u1EC7 th\u1ED1ng l\u01B0u tr\u1EEF t\u1EADp trung. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 69);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_Conditional_14_Conditional_3_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeSuccessView());
    });
    \u0275\u0275text(7, " Ho\xE0n t\u1EA5t & Ti\u1EBFp t\u1EE5c qu\xE9t m\u1EDBi ");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 59);
    \u0275\u0275conditionalCreate(2, NhanDienKhuonMatComponent_Conditional_14_Conditional_2_Template, 8, 6)(3, NhanDienKhuonMatComponent_Conditional_14_Conditional_3_Template, 8, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.uploadSuccess ? 2 : 3);
  }
}
var _NhanDienKhuonMatComponent = class _NhanDienKhuonMatComponent {
  constructor() {
    this.service = inject(NhanDienKhuonMatService);
    this.firebase = inject(FirebaseService);
    this.notification = inject(AppNotificationService);
    this.cdr = inject(ChangeDetectorRef);
    this.faceDetection = null;
    this.mediaPipeLoaded = false;
    this.unsubscribes = [];
    this.isDragActive = false;
    this.isProcessing = false;
    this.totalFilesToProcess = 0;
    this.scannedCount = 0;
    this.scanPercent = 0;
    this.totalDetectedFacesCount = 0;
    this.currentScanImgUrl = null;
    this.processedPhotos = [];
    this.isUploading = false;
    this.uploadPercent = 0;
    this.currentUploadIndex = 0;
    this.totalUploadCount = 0;
    this.uploadSuccess = false;
    this.uploadProgressFormat = (percent) => {
      return percent === 100 ? "Xong" : `${percent}%`;
    };
  }
  ngOnInit() {
    this.loadMediaPipeScripts().then(() => this.initializeMediaPipe()).catch((err) => {
      this.notification.error("L\u1ED7i t\u1EA3i MediaPipe", "Kh\xF4ng th\u1EC3 t\u1EA3i th\u01B0 vi\u1EC7n MediaPipe Face Detection t\u1EEB CDN.");
      console.error(err);
    });
  }
  ngOnDestroy() {
    this.cleanupUnsubscribes();
    if (this.currentScanImgUrl) {
      URL.revokeObjectURL(this.currentScanImgUrl);
    }
    this.processedPhotos.forEach((photo) => {
      photo.faces.forEach((face) => URL.revokeObjectURL(face.croppedUrl));
    });
  }
  ngAfterViewChecked() {
    this.drawOriginalCanvases();
  }
  cleanupUnsubscribes() {
    this.unsubscribes.forEach((unsub) => unsub());
    this.unsubscribes = [];
  }
  /**
   * Loads the MediaPipe Face Detection scripts from jsdelivr CDN dynamically
   */
  loadMediaPipeScripts() {
    if (window.FaceDetection) {
      this.mediaPipeLoaded = true;
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/face_detection.js";
      script.crossOrigin = "anonymous";
      script.onload = () => {
        this.mediaPipeLoaded = true;
        resolve();
      };
      script.onerror = (e) => reject(new Error("Kh\xF4ng th\u1EC3 t\u1EA3i th\u01B0 vi\u1EC7n MediaPipe Face Detection."));
      document.head.appendChild(script);
    });
  }
  /**
   * Initializes the MediaPipe FaceDetection class with its configurations
   */
  initializeMediaPipe() {
    try {
      const FaceDetectionClass = window.FaceDetection;
      if (!FaceDetectionClass) {
        throw new Error("FaceDetection class not found on window object.");
      }
      this.faceDetection = new FaceDetectionClass({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`
      });
      this.faceDetection.setOptions({
        model: "short",
        minDetectionConfidence: 0.55
      });
    } catch (e) {
      this.notification.error("Kh\u1EDFi t\u1EA1o th\u1EA5t b\u1EA1i", "Kh\xF4ng th\u1EC3 kh\u1EDFi t\u1EA1o m\xF4 h\xECnh MediaPipe.");
      console.error(e);
    }
  }
  /**
   * Dropzone Drag / Drop Events
   */
  onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = true;
  }
  onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = false;
  }
  async onDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragActive = false;
    if (!event.dataTransfer || event.dataTransfer.items.length === 0)
      return;
    const files = [];
    const items = event.dataTransfer.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file") {
        const entry = item.webkitGetAsEntry();
        if (entry) {
          const entryFiles = await this.getFilesFromDroppedEntry(entry);
          files.push(...entryFiles);
        }
      }
    }
    if (files.length > 0) {
      this.startFaceDetectionQueue(files);
    } else {
      this.notification.warning("Kh\xF4ng t\xECm th\u1EA5y t\u1EC7p \u1EA3nh", "Vui l\xF2ng k\xE9o th\u1EA3 th\u01B0 m\u1EE5c ch\u1EE9a t\u1EC7p tin h\xECnh \u1EA3nh.");
    }
  }
  /**
   * Folder Selection Event via browser input directory pick
   */
  onFolderSelected(event) {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0)
      return;
    const files = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type.startsWith("image/")) {
        files.push(file);
      }
    }
    if (files.length > 0) {
      this.startFaceDetectionQueue(files);
    } else {
      this.notification.warning("Kh\xF4ng t\xECm th\u1EA5y t\u1EC7p \u1EA3nh", "Th\u01B0 m\u1EE5c \u0111\u01B0\u1EE3c ch\u1ECDn kh\xF4ng ch\u1EE9a t\u1EC7p tin h\xECnh \u1EA3nh h\u1EE3p l\u1EC7.");
    }
  }
  /**
   * Recursively traverses dropped directories under FileSystem Entry API
   */
  async getFilesFromDroppedEntry(entry) {
    const files = [];
    const traverse = async (ent) => {
      if (ent.isFile) {
        const file = await new Promise((resolve, reject) => ent.file(resolve, reject));
        if (file.type.startsWith("image/")) {
          files.push(file);
        }
      } else if (ent.isDirectory) {
        const reader = ent.createReader();
        const entries = await new Promise((resolve) => {
          reader.readEntries(resolve);
        });
        for (const child of entries) {
          await traverse(child);
        }
      }
    };
    await traverse(entry);
    return files;
  }
  /**
   * Triggers sequential processing queue for local face detection
   */
  async startFaceDetectionQueue(files) {
    if (!this.faceDetection) {
      this.notification.warning("\u0110ang t\u1EA3i m\xF4 h\xECnh", "Vui l\xF2ng \u0111\u1EE3i gi\xE2y l\xE1t trong khi m\xF4 h\xECnh MediaPipe \u0111ang kh\u1EDFi \u0111\u1ED9ng.");
      return;
    }
    this.isProcessing = true;
    this.totalFilesToProcess = files.length;
    this.scannedCount = 0;
    this.scanPercent = 0;
    this.totalDetectedFacesCount = 0;
    this.processedPhotos = [];
    this.cdr.detectChanges();
    for (const file of files) {
      await this.processSingleImage(file);
      this.scannedCount++;
      this.scanPercent = Math.round(this.scannedCount / this.totalFilesToProcess * 100);
      this.cdr.detectChanges();
    }
    this.isProcessing = false;
    this.currentScanImgUrl = null;
    this.cdr.detectChanges();
    if (this.totalDetectedFacesCount > 0) {
      this.notification.success("Ho\xE0n th\xE0nh qu\xE9t", `Qu\xE1 tr\xECnh qu\xE9t ho\xE0n t\u1EA5t! T\xECm th\u1EA5y t\u1ED5ng c\u1ED9ng ${this.totalDetectedFacesCount} khu\xF4n m\u1EB7t t\u1EEB ${this.getPhotosWithFacesCount()} \u1EA3nh.`);
    } else {
      this.notification.info("Kh\xF4ng c\xF3 khu\xF4n m\u1EB7t", "\u0110\xE3 qu\xE9t xong nh\u01B0ng kh\xF4ng t\xECm th\u1EA5y khu\xF4n m\u1EB7t n\xE0o trong th\u01B0 m\u1EE5c.");
    }
  }
  /**
   * Promisify MediaPipe's callback-based face detection
   */
  detectFacesMediaPipe(image) {
    return new Promise((resolve) => {
      this.faceDetection.onResults((results) => {
        resolve(results.detections || []);
      });
      this.faceDetection.send({ image });
    });
  }
  /**
   * Uses HTML5 Canvas offscreen pipeline to scale and crop face regions using MediaPipe Face Detection
   */
  async processSingleImage(file) {
    const objectUrl = URL.createObjectURL(file);
    this.currentScanImgUrl = objectUrl;
    this.cdr.detectChanges();
    try {
      const img = new Image();
      img.src = objectUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      const detections = await this.detectFacesMediaPipe(img);
      const faces = [];
      if (detections.length > 0) {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        for (let i = 0; i < detections.length; ++i) {
          const det = detections[i];
          const bbox = det.boundingBox;
          const w = bbox.width * img.width;
          const h = bbox.height * img.height;
          const x = (bbox.xCenter - bbox.width / 2) * img.width;
          const y = (bbox.yCenter - bbox.height / 2) * img.height;
          const pad = w * 0.15;
          const cropX = Math.max(0, x - pad);
          const cropY = Math.max(0, y - pad);
          const cropSize = Math.min(img.width - cropX, img.height - cropY, w + pad * 2);
          const faceCanvas = document.createElement("canvas");
          faceCanvas.width = 150;
          faceCanvas.height = 150;
          const faceCtx = faceCanvas.getContext("2d");
          faceCtx.drawImage(canvas, cropX, cropY, cropSize, cropSize, 0, 0, 150, 150);
          const faceBlob = await new Promise((resolve, reject) => {
            faceCanvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Kh\xF4ng th\u1EC3 tr\xEDch xu\u1EA5t \u1EA3nh khu\xF4n m\u1EB7t."));
              }
            }, "image/jpeg", 0.95);
          });
          const croppedUrl = URL.createObjectURL(faceBlob);
          const bboxJson = JSON.stringify({
            x: Math.round(cropX),
            y: Math.round(cropY),
            w: Math.round(cropSize),
            h: Math.round(cropSize)
          });
          faces.push({
            id: "face_" + Math.random().toString(36).substr(2, 9),
            boundingBox: bboxJson,
            croppedUrl,
            blob: faceBlob,
            selected: true
            // Default is selected to keep
          });
          this.totalDetectedFacesCount++;
        }
      }
      if (faces.length > 0) {
        this.processedPhotos.push({
          id: "photo_" + Math.random().toString(36).substr(2, 9),
          fileName: file.name,
          file,
          faces,
          canvasDrawn: false
        });
      }
    } catch (e) {
      console.error("Error processing image t\u1EC7p tin: " + file.name, e);
    }
  }
  /**
   * Renders original image on UI card preview canvas with green bounding boxes
   */
  drawOriginalCanvases() {
    this.processedPhotos.forEach((photo) => {
      if (photo.canvasDrawn)
        return;
      const canvas = document.getElementById("canvas_" + photo.id);
      if (!canvas)
        return;
      photo.canvasDrawn = true;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = URL.createObjectURL(photo.file);
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        photo.faces.forEach((face) => {
          const box = JSON.parse(face.boundingBox);
          ctx.strokeStyle = "#00ffcc";
          ctx.lineWidth = Math.max(3, Math.round(img.width * 5e-3));
          ctx.strokeRect(box.x, box.y, box.w, box.h);
        });
        URL.revokeObjectURL(img.src);
      };
    });
  }
  /**
   * Helper Stats Calculations
   */
  getPhotosWithFacesCount() {
    return this.processedPhotos.filter((p) => p.faces.length > 0).length;
  }
  getSelectedFacesCount() {
    let count = 0;
    this.processedPhotos.forEach((p) => {
      count += p.faces.filter((f) => f.selected).length;
    });
    return count;
  }
  getSelectedOriginalPhotosCount() {
    return this.processedPhotos.filter((p) => p.faces.some((f) => f.selected)).length;
  }
  resetAll() {
    this.processedPhotos.forEach((photo) => {
      photo.faces.forEach((face) => URL.revokeObjectURL(face.croppedUrl));
    });
    this.processedPhotos = [];
    this.totalDetectedFacesCount = 0;
    this.cdr.detectChanges();
  }
  closeSuccessView() {
    this.uploadSuccess = false;
    this.isUploading = false;
    this.resetAll();
  }
  /**
   * Iterates through selected face sessions and uploads multipart data asynchronously.
   * Tracks completion through Firestore Realtime event subscription via subscribeToRequestId
   */
  async uploadAndSave() {
    const photosToUpload = this.processedPhotos.filter((p) => p.faces.some((f) => f.selected));
    if (photosToUpload.length === 0)
      return;
    this.isUploading = true;
    this.uploadSuccess = false;
    this.totalUploadCount = photosToUpload.length;
    this.currentUploadIndex = 0;
    this.uploadPercent = 0;
    this.cdr.detectChanges();
    this.cleanupUnsubscribes();
    try {
      for (let i = 0; i < photosToUpload.length; i++) {
        const photo = photosToUpload[i];
        const selectedFaces = photo.faces.filter((f) => f.selected);
        this.currentUploadIndex = i + 1;
        this.uploadPercent = Math.round(i / this.totalUploadCount * 100);
        this.cdr.detectChanges();
        const trackingId = this.generateUuid();
        await new Promise((resolve, reject) => {
          const unsub = this.firebase.subscribeToRequestId(trackingId, (eventData) => {
            if (eventData.status === "Completed") {
              resolve();
            } else {
              reject(new Error(eventData.message || "L\u1ED7i l\u01B0u tr\u1EEF \u1EA3nh g\u1ED1c ho\u1EB7c khu\xF4n m\u1EB7t."));
            }
          });
          this.unsubscribes.push(unsub);
          this.service.saveSession(photo.file, selectedFaces, trackingId).catch((err) => {
            reject(err);
          });
        });
      }
      this.uploadPercent = 100;
      this.uploadSuccess = true;
      this.cdr.detectChanges();
      this.notification.success("Th\xE0nh c\xF4ng", "\u0110\xE3 l\u01B0u tr\u1EEF th\xE0nh c\xF4ng phi\xEAn nh\u1EADn di\u1EC7n khu\xF4n m\u1EB7t!");
    } catch (err) {
      this.isUploading = false;
      this.notification.error("L\u1ED7i t\u1EA3i l\xEAn", err.message || "\u0110\xE3 x\u1EA3y ra s\u1EF1 c\u1ED1 trong qu\xE1 tr\xECnh l\u01B0u tr\u1EEF.");
      console.error(err);
    }
  }
  generateUuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
};
_NhanDienKhuonMatComponent.\u0275fac = function NhanDienKhuonMatComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NhanDienKhuonMatComponent)();
};
_NhanDienKhuonMatComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NhanDienKhuonMatComponent, selectors: [["tot-nhan-dien-khuon-mat"]], decls: 15, vars: 6, consts: [["folderInput", ""], [1, "premium-container"], [1, "glass-header"], [2, "display", "flex", "justify-content", "space-between", "align-items", "center"], [2, "margin", "0", "font-size", "24px", "font-weight", "700", "background", "linear-gradient(135deg, #262626, #595959)", "-webkit-background-clip", "text", "-webkit-text-fill-color", "transparent"], [2, "margin", "4px 0 0 0", "color", "#8c8c8c", "font-size", "13px"], ["nz-button", "", "nzType", "default", 2, "border-radius", "8px"], [1, "glass-card-premium", "animate-fade-in", 2, "padding", "40px"], [1, "glass-card-premium", "animate-fade-in", 2, "margin-bottom", "24px"], [1, "glass-card-premium", "animate-fade-in", 2, "padding", "24px"], [1, "sticky-actions-bar", "animate-fade-in"], [1, "upload-modal-overlay"], ["nz-button", "", "nzType", "default", 2, "border-radius", "8px", 3, "click"], ["nz-icon", "", "nzType", "clear"], [1, "dropzone-container", 3, "dragover", "dragleave", "drop", "click"], [1, "dropzone-icon-wrapper"], ["nz-icon", "", "nzType", "folder-add", "nzTheme", "outline"], [1, "dropzone-title"], [1, "dropzone-subtitle"], ["nz-button", "", "nzType", "primary", 2, "border-radius", "8px", "height", "40px", "font-weight", "600"], ["type", "file", "webkitdirectory", "", "directory", "", "multiple", "", 2, "display", "none", 3, "change"], ["nz-row", "", "nzAlign", "middle", 3, "nzGutter"], ["nz-col", "", 2, "text-align", "center", "margin-bottom", "16px", 3, "nzXs", "nzMd"], [1, "scanning-visual-box"], [2, "display", "flex", "height", "100%", "align-items", "center", "justify-content", "center", "color", "#8c8c8c"], ["nz-col", "", 3, "nzXs", "nzMd"], [2, "font-weight", "600", "margin-bottom", "8px"], [2, "color", "#595959", "font-size", "14px", "margin-bottom", "16px"], [2, "margin-bottom", "20px"], [2, "display", "flex", "justify-content", "space-between", "font-weight", "500", "font-size", "13px", "margin-bottom", "6px"], ["nzStatus", "active", 2, "width", "100%", 3, "nzPercent", "nzStrokeWidth"], [2, "display", "flex", "gap", "24px", "color", "#8c8c8c", "font-size", "13px"], ["nz-icon", "", "nzType", "picture", 2, "margin-right", "4px"], ["nz-icon", "", "nzType", "smile", 2, "margin-right", "4px", "color", "#52c41a"], ["alt", "Scanning current", 1, "scanning-img", 3, "src"], [1, "scanner-laser"], [1, "scanning-overlay-status"], ["nz-icon", "", "nzType", "scan", 3, "nzSpin"], [2, "font-weight", "700", "margin-bottom", "20px", "border-bottom", "2px solid #f0f0f0", "padding-bottom", "12px", "display", "flex", "align-items", "center"], ["nz-icon", "", "nzType", "smile", "nzTheme", "twotone", "nzTwotoneColor", "#1890ff", 2, "margin-right", "8px"], [2, "max-height", "65vh", "overflow-y", "auto", "padding-right", "8px"], [1, "review-item-container", "animate-fade-in"], [1, "review-left-canvas-wrapper"], [1, "review-canvas", 3, "id"], [1, "review-right-faces"], [2, "margin", "0", "font-weight", "600", "color", "#262626"], [2, "font-size", "12px", "color", "#8c8c8c", "background", "#f5f5f5", "padding", "2px 8px", "border-radius", "4px"], [1, "faces-grid"], [1, "face-card", 3, "excluded"], [1, "face-card"], [1, "face-img-wrapper"], ["alt", "Face crop", 1, "face-cropped-img", 3, "src"], [2, "font-size", "11px", "color", "#8c8c8c", "font-weight", "500"], ["nzCheckedChildren", "L\u01B0u", "nzUnCheckedChildren", "B\u1ECF", 1, "face-card-toggle", 3, "ngModelChange", "ngModel"], [2, "display", "flex", "align-items", "center", "gap", "12px"], ["nz-icon", "", "nzType", "check-circle", "nzTheme", "twotone", "nzTwotoneColor", "#52c41a", 2, "font-size", "20px"], [2, "font-weight", "600", "color", "#262626", "font-size", "14px"], [2, "font-size", "12px", "color", "#8c8c8c"], ["nz-button", "", "nzSize", "large", 1, "glowing-btn", 3, "click", "nzLoading"], [1, "progress-card"], [2, "margin-bottom", "24px"], ["nzType", "circle", 3, "nzPercent", "nzStrokeWidth", "nzWidth", "nzFormat"], [2, "font-weight", "700", "margin-bottom", "8px", "color", "#262626"], [2, "color", "#8c8c8c", "font-size", "14px", "margin-bottom", "0"], [2, "margin-top", "16px", "font-weight", "500", "font-size", "13px", "color", "#1890ff"], [1, "success-checkmark-wrapper"], ["nz-icon", "", "nzType", "check", 1, "success-icon-animated"], [2, "font-weight", "700", "margin-bottom", "8px", "color", "#52c41a"], [2, "color", "#595959", "font-size", "14px", "margin-bottom", "24px"], ["nz-button", "", "nzType", "primary", "nzSize", "large", 2, "border-radius", "8px", "width", "100%", "font-weight", "600", 3, "click"]], template: function NhanDienKhuonMatComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div")(4, "h1", 4);
    \u0275\u0275text(5, " Nh\u1EADn Di\u1EC7n Khu\xF4n M\u1EB7t ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 5);
    \u0275\u0275text(7, " T\u1EA3i th\u01B0 m\u1EE5c \u1EA3nh l\xEAn \u0111\u1EC3 qu\xE9t v\xE0 nh\u1EADn di\u1EC7n khu\xF4n m\u1EB7t t\u1EF1 \u0111\u1ED9ng ngay tr\xEAn tr\xECnh duy\u1EC7t ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div");
    \u0275\u0275conditionalCreate(9, NhanDienKhuonMatComponent_Conditional_9_Template, 3, 0, "button", 6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(10, NhanDienKhuonMatComponent_Conditional_10_Template, 12, 2, "div", 7);
    \u0275\u0275conditionalCreate(11, NhanDienKhuonMatComponent_Conditional_11_Template, 32, 13, "div", 8);
    \u0275\u0275conditionalCreate(12, NhanDienKhuonMatComponent_Conditional_12_Template, 7, 1, "div", 9);
    \u0275\u0275conditionalCreate(13, NhanDienKhuonMatComponent_Conditional_13_Template, 10, 3, "div", 10);
    \u0275\u0275conditionalCreate(14, NhanDienKhuonMatComponent_Conditional_14_Template, 4, 1, "div", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(9);
    \u0275\u0275conditional(ctx.processedPhotos.length > 0 && !ctx.isProcessing ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx.isProcessing && ctx.processedPhotos.length === 0 ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isProcessing ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.processedPhotos.length > 0 ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.processedPhotos.length > 0 && !ctx.isProcessing && ctx.getSelectedFacesCount() > 0 ? 13 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isUploading ? 14 : -1);
  }
}, dependencies: [
  CommonModule,
  FormsModule,
  NgControlStatus,
  NgModel,
  NzButtonModule,
  NzButtonComponent,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzProgressModule,
  NzProgressComponent,
  NzSwitchModule,
  NzSwitchComponent,
  NzGridModule,
  NzColDirective,
  NzRowDirective,
  NzIconModule,
  NzIconDirective,
  NzSpinModule
], styles: ["\n.premium-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 1400px;\n  margin: 0 auto;\n  min-height: 80vh;\n  animation: _ngcontent-%COMP%_fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.glass-header[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.7);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.4);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.08);\n  margin-bottom: 24px;\n  padding: 20px 24px;\n}\n.glass-card-premium[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.65);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.4);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.06);\n  padding: 24px;\n  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);\n  overflow: hidden;\n  position: relative;\n}\n.glass-card-premium[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 16px 48px 0 rgba(31, 38, 135, 0.12);\n  border-color: rgba(24, 144, 255, 0.4);\n}\n.dropzone-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  border: 2px dashed rgba(24, 144, 255, 0.3);\n  border-radius: 16px;\n  padding: 60px 40px;\n  background: rgba(24, 144, 255, 0.02);\n  cursor: pointer;\n  transition: all 0.3s ease;\n  min-height: 280px;\n}\n.dropzone-container[_ngcontent-%COMP%]:hover, \n.dropzone-container.drag-active[_ngcontent-%COMP%] {\n  border-color: #1890ff;\n  background: rgba(24, 144, 255, 0.06);\n  box-shadow: 0 0 20px rgba(24, 144, 255, 0.1) inset;\n}\n.dropzone-icon-wrapper[_ngcontent-%COMP%] {\n  font-size: 48px;\n  color: #1890ff;\n  margin-bottom: 16px;\n  animation: _ngcontent-%COMP%_floatIcon 3s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_floatIcon {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-8px);\n  }\n}\n.dropzone-title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #262626;\n  margin-bottom: 8px;\n}\n.dropzone-subtitle[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #8c8c8c;\n  margin-bottom: 24px;\n  text-align: center;\n}\n.scanning-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(24, 144, 255, 0.3);\n  background: rgba(0, 0, 0, 0.02);\n}\n.scanning-visual-box[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  max-width: 400px;\n  height: 250px;\n  margin: 0 auto;\n  border-radius: 8px;\n  overflow: hidden;\n  border: 1px solid #d9d9d9;\n  background: #1f1f1f;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.scanning-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  opacity: 0.85;\n}\n.scanner-laser[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      #00f2fe,\n      #4facfe,\n      transparent);\n  box-shadow: 0 0 12px #00f2fe, 0 0 4px #4facfe;\n  animation: _ngcontent-%COMP%_laserScan 2.2s linear infinite;\n  z-index: 10;\n}\n@keyframes _ngcontent-%COMP%_laserScan {\n  0% {\n    top: 0%;\n  }\n  50% {\n    top: 100%;\n  }\n  100% {\n    top: 0%;\n  }\n}\n.scanning-overlay-status[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 12px;\n  left: 12px;\n  background: rgba(0, 0, 0, 0.7);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  color: #fff;\n  padding: 4px 10px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 500;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}\n.review-item-container[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 350px 1fr;\n  gap: 24px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  padding-bottom: 24px;\n  margin-bottom: 24px;\n}\n@media (max-width: 900px) {\n  .review-item-container[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.review-left-canvas-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  background: #141414;\n  border-radius: 12px;\n  overflow: hidden;\n  height: 260px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.review-canvas[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 100%;\n  object-fit: contain;\n}\n.review-right-faces[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.faces-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));\n  gap: 16px;\n  margin-top: 12px;\n}\n.face-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #f0f0f0;\n  border-radius: 12px;\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);\n}\n.face-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(31, 38, 135, 0.08);\n  border-color: rgba(24, 144, 255, 0.2);\n}\n.face-card.excluded[_ngcontent-%COMP%] {\n  opacity: 0.55;\n  background: #fafafa;\n}\n.face-img-wrapper[_ngcontent-%COMP%] {\n  width: 90px;\n  height: 90px;\n  border-radius: 50%;\n  overflow: hidden;\n  border: 2px solid #fff;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);\n  margin-bottom: 12px;\n  background: #fafafa;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.face-cropped-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.face-card-toggle[_ngcontent-%COMP%] {\n  transform: scale(0.9);\n  margin-top: 6px;\n}\n.neon-box[_ngcontent-%COMP%] {\n  position: absolute;\n  border: 2px solid #00ffcc;\n  box-shadow: 0 0 8px #00ffcc, 0 0 2px #00ffcc inset;\n  pointer-events: none;\n}\n.sticky-actions-bar[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 24px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 100;\n  width: 90%;\n  max-width: 800px;\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid rgba(255, 255, 255, 0.4);\n  box-shadow: 0 12px 40px rgba(31, 38, 135, 0.15);\n  border-radius: 20px;\n  padding: 14px 28px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  animation: _ngcontent-%COMP%_slideUpBar 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n}\n@keyframes _ngcontent-%COMP%_slideUpBar {\n  from {\n    transform: translate(-50%, 60px);\n    opacity: 0;\n  }\n  to {\n    transform: translate(-50%, 0);\n    opacity: 1;\n  }\n}\n.glowing-btn[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #0072ff,\n      #00c6ff);\n  border: none;\n  color: #fff;\n  font-weight: 600;\n  padding: 0 24px;\n  height: 42px;\n  border-radius: 8px;\n  box-shadow: 0 4px 15px rgba(0, 114, 255, 0.3);\n  transition: all 0.3s ease;\n}\n.glowing-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 114, 255, 0.45);\n  background:\n    linear-gradient(\n      135deg,\n      #0080ff,\n      #00d0ff);\n}\n.glowing-btn[_ngcontent-%COMP%]:disabled {\n  background: #d9d9d9;\n  box-shadow: none;\n  color: rgba(0, 0, 0, 0.25);\n}\n.upload-modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.5);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.progress-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 480px;\n  background: #ffffff;\n  border-radius: 20px;\n  padding: 40px;\n  text-align: center;\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);\n  animation: _ngcontent-%COMP%_scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n}\n@keyframes _ngcontent-%COMP%_scaleUp {\n  from {\n    transform: scale(0.9);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n.success-checkmark-wrapper[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background: rgba(82, 196, 26, 0.1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 24px;\n}\n.success-icon-animated[_ngcontent-%COMP%] {\n  font-size: 40px;\n  color: #52c41a;\n  animation: _ngcontent-%COMP%_popCheck 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n}\n@keyframes _ngcontent-%COMP%_popCheck {\n  0% {\n    transform: scale(0);\n  }\n  70% {\n    transform: scale(1.2);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n/*# sourceMappingURL=nhan-dien-khuon-mat.css.map */"] });
var NhanDienKhuonMatComponent = _NhanDienKhuonMatComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NhanDienKhuonMatComponent, [{
    type: Component,
    args: [{ selector: "tot-nhan-dien-khuon-mat", standalone: true, imports: [
      CommonModule,
      FormsModule,
      NzButtonModule,
      NzProgressModule,
      NzSwitchModule,
      NzGridModule,
      NzIconModule,
      NzSpinModule
    ], template: `<div class="premium-container">
  <!-- 1. Header Area -->
  <div class="glass-header">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h1 style="margin: 0; font-size: 24px; font-weight: 700; background: linear-gradient(135deg, #262626, #595959); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          Nh\u1EADn Di\u1EC7n Khu\xF4n M\u1EB7t
        </h1>
        <p style="margin: 4px 0 0 0; color: #8c8c8c; font-size: 13px;">
          T\u1EA3i th\u01B0 m\u1EE5c \u1EA3nh l\xEAn \u0111\u1EC3 qu\xE9t v\xE0 nh\u1EADn di\u1EC7n khu\xF4n m\u1EB7t t\u1EF1 \u0111\u1ED9ng ngay tr\xEAn tr\xECnh duy\u1EC7t
        </p>
      </div>
      <div>
        @if (processedPhotos.length > 0 && !isProcessing) {
          <button nz-button nzType="default" (click)="resetAll()" style="border-radius: 8px;">
            <span nz-icon nzType="clear"></span> X\xF3a l\xE0m l\u1EA1i
          </button>
        }
      </div>
    </div>
  </div>

  <!-- 2. Dropzone View (Initial State) -->
  @if (!isProcessing && processedPhotos.length === 0) {
    <div class="glass-card-premium animate-fade-in" style="padding: 40px;">
      <div 
        class="dropzone-container" 
        [class.drag-active]="isDragActive"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
        (click)="folderInput.click()"
      >
        <div class="dropzone-icon-wrapper">
          <span nz-icon nzType="folder-add" nzTheme="outline"></span>
        </div>
        <div class="dropzone-title">K\xE9o & th\u1EA3 th\u01B0 m\u1EE5c \u1EA3nh c\u1EE7a b\u1EA1n t\u1EA1i \u0111\xE2y</div>
        <div class="dropzone-subtitle">Ho\u1EB7c nh\u1EA5p chu\u1ED9t \u0111\u1EC3 ch\u1ECDn th\u01B0 m\u1EE5c t\u1EEB m\xE1y t\xEDnh c\u1EE7a b\u1EA1n (h\u1ED7 tr\u1EE3 \u0111\u1ECDc \u0111\u1EC7 quy th\u01B0 m\u1EE5c con)</div>
        <button nz-button nzType="primary" style="border-radius: 8px; height: 40px; font-weight: 600;">
          Ch\u1ECDn th\u01B0 m\u1EE5c \u1EA3nh
        </button>
        <input 
          #folderInput 
          type="file" 
          webkitdirectory 
          directory 
          multiple 
          style="display: none;" 
          (change)="onFolderSelected($event)"
        />
      </div>
    </div>
  }

  <!-- 3. Local Processing/Scanning View -->
  @if (isProcessing) {
    <div class="glass-card-premium animate-fade-in" style="margin-bottom: 24px;">
      <div nz-row [nzGutter]="24" nzAlign="middle">
        <!-- Scanning Visual Left -->
        <div nz-col [nzXs]="24" [nzMd]="10" style="text-align: center; margin-bottom: 16px;">
          <div class="scanning-visual-box">
            @if (currentScanImgUrl) {
              <img [src]="currentScanImgUrl" class="scanning-img" alt="Scanning current" />
              <div class="scanner-laser"></div>
              <div class="scanning-overlay-status">
                <span nz-icon nzType="scan" [nzSpin]="true"></span> \u0110ang qu\xE9t...
              </div>
            } @else {
              <div style="display: flex; height: 100%; align-items: center; justify-content: center; color: #8c8c8c;">
                \u0110ang chu\u1EA9n b\u1ECB qu\xE9t...
              </div>
            }
          </div>
        </div>

        <!-- Progress Description Right -->
        <div nz-col [nzXs]="24" [nzMd]="14">
          <h3 style="font-weight: 600; margin-bottom: 8px;">\u0110ang qu\xE9t \u1EA3nh & nh\u1EADn di\u1EC7n khu\xF4n m\u1EB7t...</h3>
          <p style="color: #595959; font-size: 14px; margin-bottom: 16px;">
            H\u1EC7 th\u1ED1ng \u0111ang ch\u1EA1y thu\u1EADt to\xE1n <strong>pico.js</strong> \u0111\u1EC3 \u0111\u1ECBnh v\u1ECB khu\xF4n m\u1EB7t tr\xEAn t\u1EEBng t\u1EC7p tin \u1EA3nh m\u1ED9t c\xE1ch tu\u1EA7n t\u1EF1.
          </p>

          <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; font-weight: 500; font-size: 13px; margin-bottom: 6px;">
              <span>Ti\u1EBFn tr\xECnh: {{ scannedCount }} / {{ totalFilesToProcess }} t\u1EC7p tin</span>
              <span>{{ scanPercent }}%</span>
            </div>
            <nz-progress [nzPercent]="scanPercent" nzStatus="active" [nzStrokeWidth]="10" style="width: 100%;"></nz-progress>
          </div>

          <div style="display: flex; gap: 24px; color: #8c8c8c; font-size: 13px;">
            <div>
              <span nz-icon nzType="picture" style="margin-right: 4px;"></span> \u1EA2nh g\u1ED1c: <strong>{{ totalFilesToProcess }}</strong>
            </div>
            <div>
              <span nz-icon nzType="smile" style="margin-right: 4px; color: #52c41a;"></span> \u0110\xE3 ph\xE1t hi\u1EC7n: <strong>{{ totalDetectedFacesCount }} m\u1EB7t</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  <!-- 4. Scanned List & Review Grid -->
  @if (processedPhotos.length > 0) {
    <div class="glass-card-premium animate-fade-in" style="padding: 24px;">
      <h3 style="font-weight: 700; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 12px; display: flex; align-items: center;">
        <span nz-icon nzType="smile" nzTheme="twotone" nzTwotoneColor="#1890ff" style="margin-right: 8px;"></span>
        K\u1EBFt Qu\u1EA3 Qu\xE9t & Xem Tr\u01B0\u1EDBc Khu\xF4n M\u1EB7t ({{ getPhotosWithFacesCount() }} \u1EA3nh c\xF3 m\u1EB7t)
      </h3>

      <div style="max-height: 65vh; overflow-y: auto; padding-right: 8px;">
        @for (photo of processedPhotos; track photo.id) {
          @if (photo.faces.length > 0) {
            <div class="review-item-container animate-fade-in">
              <!-- Left Column: Source Image Canvas Drawing with Bounding Box overlays -->
              <div class="review-left-canvas-wrapper">
                <canvas 
                  [id]="'canvas_' + photo.id" 
                  class="review-canvas"
                ></canvas>
              </div>

              <!-- Right Column: Crop Grid review toggles -->
              <div class="review-right-faces">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <h4 style="margin: 0; font-weight: 600; color: #262626;">
                    {{ photo.fileName }}
                  </h4>
                  <span style="font-size: 12px; color: #8c8c8c; background: #f5f5f5; padding: 2px 8px; border-radius: 4px;">
                    T\xECm th\u1EA5y {{ photo.faces.length }} khu\xF4n m\u1EB7t
                  </span>
                </div>

                <div class="faces-grid">
                  @for (face of photo.faces; track face.id; let idx = $index) {
                    <div class="face-card" [class.excluded]="!face.selected">
                      <div class="face-img-wrapper">
                        <img [src]="face.croppedUrl" class="face-cropped-img" alt="Face crop" />
                      </div>
                      <span style="font-size: 11px; color: #8c8c8c; font-weight: 500;">
                        M\u1EB7t #{{ idx + 1 }}
                      </span>
                      <nz-switch 
                        class="face-card-toggle"
                        [(ngModel)]="face.selected"
                        nzCheckedChildren="L\u01B0u"
                        nzUnCheckedChildren="B\u1ECF"
                      ></nz-switch>
                    </div>
                  }
                </div>
              </div>
            </div>
          }
        }
      </div>
    </div>
  }

  <!-- 5. Floating Bottom Actions Bar -->
  @if (processedPhotos.length > 0 && !isProcessing && getSelectedFacesCount() > 0) {
    <div class="sticky-actions-bar animate-fade-in">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span nz-icon nzType="check-circle" nzTheme="twotone" nzTwotoneColor="#52c41a" style="font-size: 20px;"></span>
        <div>
          <div style="font-weight: 600; color: #262626; font-size: 14px;">
            \u0110\xE3 ch\u1ECDn {{ getSelectedFacesCount() }} khu\xF4n m\u1EB7t \u0111\u1EC3 l\u01B0u tr\u1EEF
          </div>
          <div style="font-size: 12px; color: #8c8c8c;">
            T\u1EEB {{ getSelectedOriginalPhotosCount() }} t\u1EC7p tin \u1EA3nh g\u1ED1c kh\xE1c nhau
          </div>
        </div>
      </div>
      <button 
        nz-button 
        nzSize="large" 
        class="glowing-btn"
        [nzLoading]="isUploading"
        (click)="uploadAndSave()"
      >
        L\u01B0u tr\u1EEF l\xEAn Server
      </button>
    </div>
  }

  <!-- 6. Upload Progress Modal -->
  @if (isUploading) {
    <div class="upload-modal-overlay">
      <div class="progress-card">
        @if (!uploadSuccess) {
          <div style="margin-bottom: 24px;">
            <nz-progress 
              nzType="circle" 
              [nzPercent]="uploadPercent" 
              [nzStrokeWidth]="8"
              [nzWidth]="120"
              [nzFormat]="uploadProgressFormat"
            ></nz-progress>
          </div>
          <h2 style="font-weight: 700; margin-bottom: 8px; color: #262626;">\u0110ang \u0111\u1ED3ng b\u1ED9 d\u1EEF li\u1EC7u...</h2>
          <p style="color: #8c8c8c; font-size: 14px; margin-bottom: 0;">
            \u0110ang t\u1EA3i \u1EA3nh g\u1ED1c v\xE0 c\xE1c khu\xF4n m\u1EB7t \u0111\xE3 ch\u1ECDn l\xEAn Google Cloud Storage.
          </p>
          <div style="margin-top: 16px; font-weight: 500; font-size: 13px; color: #1890ff;">
            \u0110ang x\u1EED l\xFD \u1EA3nh: {{ currentUploadIndex }} / {{ totalUploadCount }}
          </div>
        } @else {
          <!-- Complete Screen inside progress card -->
          <div class="success-checkmark-wrapper">
            <span nz-icon nzType="check" class="success-icon-animated"></span>
          </div>
          <h2 style="font-weight: 700; margin-bottom: 8px; color: #52c41a;">T\u1EA3i L\xEAn Th\xE0nh C\xF4ng!</h2>
          <p style="color: #595959; font-size: 14px; margin-bottom: 24px;">
            \u0110\xE3 l\u01B0u tr\u1EEF th\xE0nh c\xF4ng to\xE0n b\u1ED9 \u1EA3nh g\u1ED1c v\xE0 c\xE1c khu\xF4n m\u1EB7t \u0111\u01B0\u1EE3c ch\u1ECDn v\xE0o h\u1EC7 th\u1ED1ng l\u01B0u tr\u1EEF t\u1EADp trung.
          </p>
          <button 
            nz-button 
            nzType="primary" 
            nzSize="large" 
            (click)="closeSuccessView()"
            style="border-radius: 8px; width: 100%; font-weight: 600;"
          >
            Ho\xE0n t\u1EA5t & Ti\u1EBFp t\u1EE5c qu\xE9t m\u1EDBi
          </button>
        }
      </div>
    </div>
  }
</div>
`, styles: ["/* projects/tot/nhan-dien-khuon-mat/src/lib/components/nhan-dien-khuon-mat/nhan-dien-khuon-mat.css */\n.premium-container {\n  padding: 24px;\n  max-width: 1400px;\n  margin: 0 auto;\n  min-height: 80vh;\n  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.glass-header {\n  background: rgba(255, 255, 255, 0.7);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.4);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.08);\n  margin-bottom: 24px;\n  padding: 20px 24px;\n}\n.glass-card-premium {\n  background: rgba(255, 255, 255, 0.65);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.4);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.06);\n  padding: 24px;\n  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);\n  overflow: hidden;\n  position: relative;\n}\n.glass-card-premium:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 16px 48px 0 rgba(31, 38, 135, 0.12);\n  border-color: rgba(24, 144, 255, 0.4);\n}\n.dropzone-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  border: 2px dashed rgba(24, 144, 255, 0.3);\n  border-radius: 16px;\n  padding: 60px 40px;\n  background: rgba(24, 144, 255, 0.02);\n  cursor: pointer;\n  transition: all 0.3s ease;\n  min-height: 280px;\n}\n.dropzone-container:hover,\n.dropzone-container.drag-active {\n  border-color: #1890ff;\n  background: rgba(24, 144, 255, 0.06);\n  box-shadow: 0 0 20px rgba(24, 144, 255, 0.1) inset;\n}\n.dropzone-icon-wrapper {\n  font-size: 48px;\n  color: #1890ff;\n  margin-bottom: 16px;\n  animation: floatIcon 3s ease-in-out infinite;\n}\n@keyframes floatIcon {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-8px);\n  }\n}\n.dropzone-title {\n  font-size: 18px;\n  font-weight: 600;\n  color: #262626;\n  margin-bottom: 8px;\n}\n.dropzone-subtitle {\n  font-size: 14px;\n  color: #8c8c8c;\n  margin-bottom: 24px;\n  text-align: center;\n}\n.scanning-card {\n  border: 1px solid rgba(24, 144, 255, 0.3);\n  background: rgba(0, 0, 0, 0.02);\n}\n.scanning-visual-box {\n  position: relative;\n  width: 100%;\n  max-width: 400px;\n  height: 250px;\n  margin: 0 auto;\n  border-radius: 8px;\n  overflow: hidden;\n  border: 1px solid #d9d9d9;\n  background: #1f1f1f;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.scanning-img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  opacity: 0.85;\n}\n.scanner-laser {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      #00f2fe,\n      #4facfe,\n      transparent);\n  box-shadow: 0 0 12px #00f2fe, 0 0 4px #4facfe;\n  animation: laserScan 2.2s linear infinite;\n  z-index: 10;\n}\n@keyframes laserScan {\n  0% {\n    top: 0%;\n  }\n  50% {\n    top: 100%;\n  }\n  100% {\n    top: 0%;\n  }\n}\n.scanning-overlay-status {\n  position: absolute;\n  bottom: 12px;\n  left: 12px;\n  background: rgba(0, 0, 0, 0.7);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  color: #fff;\n  padding: 4px 10px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 500;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}\n.review-item-container {\n  display: grid;\n  grid-template-columns: 350px 1fr;\n  gap: 24px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  padding-bottom: 24px;\n  margin-bottom: 24px;\n}\n@media (max-width: 900px) {\n  .review-item-container {\n    grid-template-columns: 1fr;\n  }\n}\n.review-left-canvas-wrapper {\n  position: relative;\n  background: #141414;\n  border-radius: 12px;\n  overflow: hidden;\n  height: 260px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.review-canvas {\n  max-width: 100%;\n  max-height: 100%;\n  object-fit: contain;\n}\n.review-right-faces {\n  display: flex;\n  flex-direction: column;\n}\n.faces-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));\n  gap: 16px;\n  margin-top: 12px;\n}\n.face-card {\n  background: #ffffff;\n  border: 1px solid #f0f0f0;\n  border-radius: 12px;\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);\n}\n.face-card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(31, 38, 135, 0.08);\n  border-color: rgba(24, 144, 255, 0.2);\n}\n.face-card.excluded {\n  opacity: 0.55;\n  background: #fafafa;\n}\n.face-img-wrapper {\n  width: 90px;\n  height: 90px;\n  border-radius: 50%;\n  overflow: hidden;\n  border: 2px solid #fff;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);\n  margin-bottom: 12px;\n  background: #fafafa;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.face-cropped-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.face-card-toggle {\n  transform: scale(0.9);\n  margin-top: 6px;\n}\n.neon-box {\n  position: absolute;\n  border: 2px solid #00ffcc;\n  box-shadow: 0 0 8px #00ffcc, 0 0 2px #00ffcc inset;\n  pointer-events: none;\n}\n.sticky-actions-bar {\n  position: fixed;\n  bottom: 24px;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 100;\n  width: 90%;\n  max-width: 800px;\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid rgba(255, 255, 255, 0.4);\n  box-shadow: 0 12px 40px rgba(31, 38, 135, 0.15);\n  border-radius: 20px;\n  padding: 14px 28px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  animation: slideUpBar 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n}\n@keyframes slideUpBar {\n  from {\n    transform: translate(-50%, 60px);\n    opacity: 0;\n  }\n  to {\n    transform: translate(-50%, 0);\n    opacity: 1;\n  }\n}\n.glowing-btn {\n  background:\n    linear-gradient(\n      135deg,\n      #0072ff,\n      #00c6ff);\n  border: none;\n  color: #fff;\n  font-weight: 600;\n  padding: 0 24px;\n  height: 42px;\n  border-radius: 8px;\n  box-shadow: 0 4px 15px rgba(0, 114, 255, 0.3);\n  transition: all 0.3s ease;\n}\n.glowing-btn:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 114, 255, 0.45);\n  background:\n    linear-gradient(\n      135deg,\n      #0080ff,\n      #00d0ff);\n}\n.glowing-btn:disabled {\n  background: #d9d9d9;\n  box-shadow: none;\n  color: rgba(0, 0, 0, 0.25);\n}\n.upload-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.5);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  z-index: 1000;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.progress-card {\n  width: 100%;\n  max-width: 480px;\n  background: #ffffff;\n  border-radius: 20px;\n  padding: 40px;\n  text-align: center;\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);\n  animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n}\n@keyframes scaleUp {\n  from {\n    transform: scale(0.9);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n.success-checkmark-wrapper {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background: rgba(82, 196, 26, 0.1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 24px;\n}\n.success-icon-animated {\n  font-size: 40px;\n  color: #52c41a;\n  animation: popCheck 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n}\n@keyframes popCheck {\n  0% {\n    transform: scale(0);\n  }\n  70% {\n    transform: scale(1.2);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n/*# sourceMappingURL=nhan-dien-khuon-mat.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NhanDienKhuonMatComponent, { className: "NhanDienKhuonMatComponent", filePath: "projects/tot/nhan-dien-khuon-mat/src/lib/components/nhan-dien-khuon-mat/nhan-dien-khuon-mat.ts", lineNumber: 46 });
})();

// projects/tot/nhan-dien-khuon-mat/src/lib/nhan-dien-khuon-mat.providers.ts
function provideNhanDienKhuonMat() {
  return [
    NhanDienKhuonMatService
  ];
}

export {
  NhanDienKhuonMatService,
  NhanDienKhuonMatComponent,
  provideNhanDienKhuonMat
};
//# sourceMappingURL=chunk-X57YTJVZ.js.map
