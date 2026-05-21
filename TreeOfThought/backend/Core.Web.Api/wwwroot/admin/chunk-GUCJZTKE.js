import {
  FirebaseService
} from "./chunk-ICEMZKP7.js";
import {
  CommonModule,
  DatePipe,
  DefaultValueAccessor,
  Directionality,
  ENTER,
  FocusMonitor,
  FormsModule,
  HttpClientService,
  LEFT_ARROW,
  NG_VALUE_ACCESSOR,
  NZ_FORM_SIZE,
  NgControlStatus,
  NgForOf,
  NgIf,
  NgModel,
  NzButtonComponent,
  NzButtonModule,
  NzCardModule,
  NzConfigService,
  NzIconDirective,
  NzIconModule,
  NzInputDirective,
  NzInputModule,
  NzMessageService,
  NzModalComponent,
  NzModalContentDirective,
  NzModalModule,
  NzModalService,
  NzOutletModule,
  NzSpinComponent,
  NzSpinModule,
  NzStringTemplateOutletDirective,
  NzTableModule,
  NzTagComponent,
  NzTagModule,
  NzTooltipDirective,
  NzTooltipModule,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzWaveModule,
  RIGHT_ARROW,
  SPACE,
  TotButtonComponent,
  TotCellDirective,
  TotTableComponent,
  WithConfig,
  fromEventOutsideAngular,
  takeUntilDestroyed
} from "./chunk-H2M3TIKJ.js";
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
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
  __publicField
} from "./chunk-MYGOUE3E.js";

// projects/tot/nhan-dien-khuon-mat/src/lib/nhan-dien-khuon-mat.providers.ts
function provideNhanDienKhuonMat() {
  return [];
}

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
  }
  saveSession(sessionId, sessionName, originalFile, croppedFiles, boundingBoxes) {
    const formData = new FormData();
    formData.append("sessionId", sessionId);
    formData.append("sessionName", sessionName);
    formData.append("originalFile", originalFile);
    croppedFiles.forEach((file) => {
      formData.append("croppedFiles", file);
    });
    boundingBoxes.forEach((bbox) => {
      formData.append("boundingBoxes", bbox);
    });
    return this.http.post("/api/face-detection/save", formData);
  }
  getSessions(pageIndex = 1, pageSize = 10) {
    return this.http.get(`/api/face-detection/sessions?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  getSessionDetails(sessionId) {
    return this.http.get(`/api/face-detection/sessions/${sessionId}`);
  }
  renameSession(sessionId, newName) {
    return this.http.put(`/api/face-detection/sessions/${sessionId}/rename`, { newName });
  }
  deleteSession(sessionId) {
    return this.http.delete(`/api/face-detection/sessions/${sessionId}`);
  }
  deleteOriginalImage(imageId) {
    return this.http.delete(`/api/face-detection/images/${imageId}`);
  }
  deleteCroppedFace(faceId) {
    return this.http.delete(`/api/face-detection/faces/${faceId}`);
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

// projects/tot/nhan-dien-khuon-mat/src/lib/nhan-dien-khuon-mat.component.ts
var _c02 = ["fileInput"];
var _c1 = ["folderInput"];
var _c2 = ["canvasContainer"];
function NhanDienKhuonMatComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275element(1, "i", 49);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Ch\u01B0a c\xF3 h\xECnh \u1EA3nh n\xE0o trong h\xE0ng \u0111\u1EE3i");
    \u0275\u0275elementEnd()();
  }
}
function NhanDienKhuonMatComponent_div_38_nz_tag_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 63);
    \u0275\u0275text(1, "\u0110ang ch\u1EDD...");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_div_38_nz_tag_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 64);
    \u0275\u0275element(1, "i", 65);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Qu\xE9t ", item_r3.progress, "% ");
  }
}
function NhanDienKhuonMatComponent_div_38_nz_tag_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 66);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u0110\xE3 tr\xEDch xu\u1EA5t (", item_r3.detectedFaces.length, ") ");
  }
}
function NhanDienKhuonMatComponent_div_38_nz_tag_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 67);
    \u0275\u0275text(1, "Kh\xF4ng t\xECm th\u1EA5y m\u1EB7t");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_div_38_nz_tag_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 68);
    \u0275\u0275text(1, "L\u1ED7i qu\xE9t");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_div_38_Template_div_click_0_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.selectQueueItem(item_r3));
    });
    \u0275\u0275element(1, "img", 51);
    \u0275\u0275elementStart(2, "div", 52)(3, "span", 53);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 54);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 55);
    \u0275\u0275template(8, NhanDienKhuonMatComponent_div_38_nz_tag_8_Template, 2, 0, "nz-tag", 56)(9, NhanDienKhuonMatComponent_div_38_nz_tag_9_Template, 3, 1, "nz-tag", 57)(10, NhanDienKhuonMatComponent_div_38_nz_tag_10_Template, 2, 1, "nz-tag", 58)(11, NhanDienKhuonMatComponent_div_38_nz_tag_11_Template, 2, 0, "nz-tag", 59)(12, NhanDienKhuonMatComponent_div_38_nz_tag_12_Template, 2, 0, "nz-tag", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 61);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_div_38_Template_button_click_13_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.removeQueueItem(item_r3, $event));
    });
    \u0275\u0275element(14, "i", 62);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", (ctx_r3.selectedQueueItem == null ? null : ctx_r3.selectedQueueItem.id) === item_r3.id);
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r3.thumbnailUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzTooltipTitle", item_r3.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatBytes(item_r3.size));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", item_r3.status === "Waiting");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r3.status === "Scanning");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r3.status === "Success");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r3.status === "NoFace");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", item_r3.status === "Error");
  }
}
function NhanDienKhuonMatComponent_span_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.selectedQueueItem.name);
  }
}
function NhanDienKhuonMatComponent_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275element(1, "i", 71);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Ch\u1ECDn m\u1ED9t t\u1EC7p t\u1EEB h\xE0ng \u0111\u1EE3i b\xEAn tr\xE1i \u0111\u1EC3 xem k\u1EBFt qu\u1EA3 tr\xEDch xu\u1EA5t chi ti\u1EBFt");
    \u0275\u0275elementEnd()();
  }
}
function NhanDienKhuonMatComponent_div_46_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 85)(1, "p");
    \u0275\u0275text(2, "Kh\xF4ng c\xF3 khu\xF4n m\u1EB7t n\xE0o \u0111\u01B0\u1EE3c ph\xE1t hi\u1EC7n t\u1EEB \u1EA3nh n\xE0y");
    \u0275\u0275elementEnd()();
  }
}
function NhanDienKhuonMatComponent_div_46_div_20_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 95);
    \u0275\u0275element(1, "i", 96);
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_div_46_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 86);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_div_46_div_20_Template_div_click_0_listener() {
      const face_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.toggleFaceSelection(ctx_r3.selectedQueueItem, face_r7));
    });
    \u0275\u0275elementStart(1, "div", 87);
    \u0275\u0275element(2, "img", 88);
    \u0275\u0275elementStart(3, "div", 89);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, NhanDienKhuonMatComponent_div_46_div_20_div_5_Template, 2, 0, "div", 90);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 91)(7, "span", 92);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 93);
    \u0275\u0275element(10, "input", 94);
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12, "L\u01B0u tr\u1EEF");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const face_r7 = ctx.$implicit;
    const idx_r8 = ctx.index;
    \u0275\u0275classProp("selected", face_r7.selected);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", face_r7.croppedUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("M\u1EB7t #", idx_r8 + 1);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", face_r7.selected);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("T\u1ECDa \u0111\u1ED9: [x:", face_r7.boundingBox.x, ", y:", face_r7.boundingBox.y, "]");
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", face_r7.selected);
  }
}
function NhanDienKhuonMatComponent_div_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 72)(1, "div", 73)(2, "div", 74)(3, "span");
    \u0275\u0275text(4, "Khung \u1EA3nh g\u1ED1c (V\u1EBD Bounding Box)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 75)(6, "span", 76);
    \u0275\u0275text(7, "\u0110\u01B0a v\xE0o phi\xEAn l\u01B0u tr\u1EEF:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "nz-switch", 77);
    \u0275\u0275twoWayListener("ngModelChange", function NhanDienKhuonMatComponent_div_46_Template_nz_switch_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.selectedQueueItem.selected, $event) || (ctx_r3.selectedQueueItem.selected = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function NhanDienKhuonMatComponent_div_46_Template_nz_switch_ngModelChange_8_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleOriginalSelection(ctx_r3.selectedQueueItem));
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "div", 78);
    \u0275\u0275element(10, "div", 79, 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 80)(13, "div", 74)(14, "span");
    \u0275\u0275text(15, "Danh s\xE1ch khu\xF4n m\u1EB7t \u0111\xE3 c\u1EAFt (K\xEDch th\u01B0\u1EDBc chu\u1EA9n 150x150)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "nz-tag", 81);
    \u0275\u0275text(17, "MediaPipe Local AI");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(18, NhanDienKhuonMatComponent_div_46_div_18_Template, 3, 0, "div", 82);
    \u0275\u0275elementStart(19, "div", 83);
    \u0275\u0275template(20, NhanDienKhuonMatComponent_div_46_div_20_Template, 13, 8, "div", 84);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.selectedQueueItem.selected);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", ctx_r3.selectedQueueItem.detectedFaces.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r3.selectedQueueItem.detectedFaces);
  }
}
function NhanDienKhuonMatComponent_div_47_i_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 106);
  }
}
function NhanDienKhuonMatComponent_div_47_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 107)(1, "div", 108);
    \u0275\u0275element(2, "nz-spin", 109);
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 110);
    \u0275\u0275element(6, "i", 111);
    \u0275\u0275text(7, " \u0110\u1ED3ng b\u1ED9 realtime qua Firebase Cloud Firestore...");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.uploadProgressText);
  }
}
function NhanDienKhuonMatComponent_div_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 97)(1, "div", 98)(2, "div", 99)(3, "label", 100);
    \u0275\u0275text(4, "T\xEAn phi\xEAn l\u01B0u tr\u1EEF:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 101);
    \u0275\u0275twoWayListener("ngModelChange", function NhanDienKhuonMatComponent_div_47_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.sessionName, $event) || (ctx_r3.sessionName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 102)(7, "button", 103);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_div_47_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.saveFaceDetectionSession());
    });
    \u0275\u0275template(8, NhanDienKhuonMatComponent_div_47_i_8_Template, 1, 0, "i", 104);
    \u0275\u0275text(9, " L\u01B0u tr\u1EEF l\xEAn Server ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(10, NhanDienKhuonMatComponent_div_47_div_10_Template, 8, 1, "div", 105);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.sessionName);
    \u0275\u0275property("disabled", ctx_r3.savingSession);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzLoading", ctx_r3.savingSession)("disabled", ctx_r3.savingSession);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r3.savingSession);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.savingSession);
  }
}
function NhanDienKhuonMatComponent_ng_template_50_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 114)(1, "span", 115);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 116);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_50_div_0_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r10);
      const data_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.inlineRenameSession(data_r11));
    });
    \u0275\u0275element(4, "i", 117);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r11.name);
  }
}
function NhanDienKhuonMatComponent_ng_template_50_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 118)(1, "input", 119);
    \u0275\u0275twoWayListener("ngModelChange", function NhanDienKhuonMatComponent_ng_template_50_div_1_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      const data_r11 = \u0275\u0275nextContext().$implicit;
      \u0275\u0275twoWayBindingSet(data_r11.tempName, $event) || (data_r11.tempName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 120);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_50_div_1_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r12);
      const data_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.saveInlineRename(data_r11));
    });
    \u0275\u0275element(3, "i", 121);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 122);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_50_div_1_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r12);
      const data_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.cancelInlineRename(data_r11));
    });
    \u0275\u0275element(5, "i", 123);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", data_r11.tempName);
  }
}
function NhanDienKhuonMatComponent_ng_template_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NhanDienKhuonMatComponent_ng_template_50_div_0_Template, 5, 1, "div", 112)(1, NhanDienKhuonMatComponent_ng_template_50_div_1_Template, 6, 1, "div", 113);
  }
  if (rf & 2) {
    const data_r11 = ctx.$implicit;
    \u0275\u0275property("ngIf", !data_r11.isEditing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r11.isEditing);
  }
}
function NhanDienKhuonMatComponent_ng_template_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "date");
  }
  if (rf & 2) {
    const data_r13 = ctx.$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, data_r13.createdAt, "dd/MM/yyyy HH:mm:ss"), " ");
  }
}
function NhanDienKhuonMatComponent_ng_template_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const data_r14 = ctx.$implicit;
    \u0275\u0275textInterpolate1(" ", data_r14.createdBy, " ");
  }
}
function NhanDienKhuonMatComponent_ng_template_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 124);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r15 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", data_r15.imageCount, " \u1EA3nh g\u1ED1c");
  }
}
function NhanDienKhuonMatComponent_ng_template_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 125)(1, "tot-button", 126);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_54_Template_tot_button_click_1_listener() {
      const data_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openSessionDetails(data_r17));
    });
    \u0275\u0275element(2, "i", 127);
    \u0275\u0275text(3, " Xem Chi Ti\u1EBFt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "tot-button", 128);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_54_Template_tot_button_click_4_listener($event) {
      const data_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.deleteSession(data_r17, $event));
    });
    \u0275\u0275element(5, "i", 62);
    \u0275\u0275text(6, " X\xF3a ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275property("nzDanger", true);
  }
}
function NhanDienKhuonMatComponent_ng_template_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 129);
    \u0275\u0275element(1, "i", 130);
    \u0275\u0275text(2, " L\u1ECBch S\u1EED C\xE1c Phi\xEAn Upload");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_ng_template_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 131);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_57_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.loadSessionsHistory());
    });
    \u0275\u0275element(1, "i", 132);
    \u0275\u0275text(2, " L\xE0m m\u1EDBi l\u1ECBch s\u1EED ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("nzLoading", ctx_r3.loadingSessions);
  }
}
function NhanDienKhuonMatComponent_div_60_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 136);
    \u0275\u0275element(1, "nz-spin", 109);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u0110ang t\u1EA3i c\u1EA5u tr\xFAc t\u1EC7p t\u1EEB server...");
    \u0275\u0275elementEnd()();
  }
}
function NhanDienKhuonMatComponent_div_60_div_2_div_1_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 153);
    \u0275\u0275text(1, " Kh\xF4ng c\xF3 khu\xF4n m\u1EB7t n\xE0o \u0111\u01B0\u1EE3c l\u01B0u trong t\u1EC7p \u1EA3nh n\xE0y ");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_div_60_div_2_div_1_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 154)(1, "div", 155);
    \u0275\u0275element(2, "img", 156);
    \u0275\u0275elementStart(3, "button", 157);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_div_60_div_2_div_1_div_22_Template_button_click_3_listener() {
      const face_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const img_r20 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.deleteDetailCroppedFace(face_r22, img_r20));
    });
    \u0275\u0275element(4, "i", 158);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 159)(6, "span");
    \u0275\u0275text(7, "Bounding Box:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 160);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const face_r22 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", face_r22.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(face_r22.boundingBox);
  }
}
function NhanDienKhuonMatComponent_div_60_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 139)(1, "div", 140)(2, "div", 141)(3, "span", 142);
    \u0275\u0275element(4, "i", 21);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "nz-tag", 143);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 144);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 145);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_div_60_div_2_div_1_Template_button_click_11_listener() {
      const img_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.deleteDetailOriginalImage(img_r20));
    });
    \u0275\u0275element(12, "i", 62);
    \u0275\u0275text(13, " X\xF3a \u1EA3nh g\u1ED1c & crops ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 146)(15, "div", 147);
    \u0275\u0275element(16, "img", 148);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 149)(18, "h4");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, NhanDienKhuonMatComponent_div_60_div_2_div_1_div_20_Template, 2, 0, "div", 150);
    \u0275\u0275elementStart(21, "div", 151);
    \u0275\u0275template(22, NhanDienKhuonMatComponent_div_60_div_2_div_1_div_22_Template, 10, 2, "div", 152);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const img_r20 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", img_r20.fileName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("K\xEDch th\u01B0\u1EDBc: ", ctx_r3.formatBytes(img_r20.size));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 7, img_r20.createdAt, "dd/MM/yyyy HH:mm:ss"));
    \u0275\u0275advance(7);
    \u0275\u0275property("src", img_r20.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Khu\xF4n m\u1EB7t \u0111\xE3 tr\xEDch xu\u1EA5t (", img_r20.croppedFaces.length, ")");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", img_r20.croppedFaces.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", img_r20.croppedFaces);
  }
}
function NhanDienKhuonMatComponent_div_60_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 137);
    \u0275\u0275template(1, NhanDienKhuonMatComponent_div_60_div_2_div_1_Template, 23, 10, "div", 138);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.selectedSessionDetails.images);
  }
}
function NhanDienKhuonMatComponent_div_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 133);
    \u0275\u0275template(1, NhanDienKhuonMatComponent_div_60_div_1_Template, 4, 0, "div", 134)(2, NhanDienKhuonMatComponent_div_60_div_2_Template, 2, 1, "div", 135);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.loadingDetails);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r3.loadingDetails && ctx_r3.selectedSessionDetails);
  }
}
var _NhanDienKhuonMatComponent = class _NhanDienKhuonMatComponent {
  constructor() {
    this.api = inject(NhanDienKhuonMatService);
    this.firebase = inject(FirebaseService);
    this.message = inject(NzMessageService);
    this.modal = inject(NzModalService);
    this.sessionId = crypto.randomUUID();
    this.sessionName = "";
    this.queue = [];
    this.selectedQueueItem = null;
    this.loadingDetector = false;
    this.detectorReady = false;
    this.faceDetector = null;
    this.savingSession = false;
    this.uploadTrackingId = null;
    this.uploadProgressText = "";
    this.sessionsList = [];
    this.loadingSessions = false;
    this.historyColumns = [];
    this.totalSessions = 0;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.selectedSessionDetails = null;
    this.loadingDetails = false;
    this.firestoreUnsubscribe = null;
    this.showDetailsModal = false;
  }
  ngOnInit() {
    this.setDefaultSessionName();
    this.initColumns();
    this.loadSessionsHistory();
    this.initMediaPipe();
  }
  initColumns() {
    this.historyColumns = [
      { title: "T\xEAn phi\xEAn upload", key: "name" },
      { title: "Th\u1EDDi gian t\u1EA1o", key: "createdAt", width: "200px" },
      { title: "Ng\u01B0\u1EDDi t\u1EA1o", key: "createdBy", width: "150px" },
      { title: "S\u1ED1 l\u01B0\u1EE3ng \u1EA3nh g\u1ED1c", key: "imageCount", width: "150px" },
      { title: "Thao t\xE1c", key: "action", width: "250px", right: true }
    ];
  }
  ngOnDestroy() {
    this.cleanupUnsubscribe();
    this.queue.forEach((item) => URL.revokeObjectURL(item.thumbnailUrl));
  }
  setDefaultSessionName() {
    const now = /* @__PURE__ */ new Date();
    const dateStr = now.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
    const timeStr = now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    this.sessionName = `Phi\xEAn ng\xE0y ${dateStr} l\xFAc ${timeStr}`;
  }
  async initMediaPipe() {
    try {
      this.loadingDetector = true;
      const visionUrl = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8";
      const vision = await Function(`return import("${visionUrl}")`)();
      const filesetResolver = await vision.FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm");
      this.faceDetector = await vision.FaceDetector.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
          delegate: "GPU"
        },
        runningMode: "IMAGE"
      });
      this.detectorReady = true;
    } catch (error) {
      console.error("[MediaPipe] Init Failed: ", error);
      this.message.error("Kh\xF4ng th\u1EC3 kh\u1EDFi t\u1EA1o m\xF4 h\xECnh ph\xE1t hi\u1EC7n khu\xF4n m\u1EB7t MediaPipe.");
    } finally {
      this.loadingDetector = false;
    }
  }
  // --- File Drag & Drop, Folder and File selectors ---
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
  triggerFolderInput() {
    this.folderInput.nativeElement.click();
  }
  onFilesSelected(event) {
    const input = event.target;
    if (input.files) {
      this.addFilesToQueue(Array.from(input.files));
      input.value = "";
    }
  }
  onFolderSelected(event) {
    const input = event.target;
    if (input.files) {
      this.addFilesToQueue(Array.from(input.files));
      input.value = "";
    }
  }
  onDragOver(event) {
    event.preventDefault();
  }
  onDrop(event) {
    var _a;
    event.preventDefault();
    if ((_a = event.dataTransfer) == null ? void 0 : _a.files) {
      this.addFilesToQueue(Array.from(event.dataTransfer.files));
    }
  }
  addFilesToQueue(files) {
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) {
      this.message.warning("Vui l\xF2ng ch\u1EC9 ch\u1ECDn c\xE1c t\u1EC7p tin h\xECnh \u1EA3nh.");
      return;
    }
    const items = imageFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      thumbnailUrl: URL.createObjectURL(file),
      status: "Waiting",
      progress: 0,
      detectedFaces: [],
      selected: true
    }));
    this.queue = [...this.queue, ...items];
    this.message.success(`\u0110\xE3 th\xEAm ${items.length} t\u1EC7p v\xE0o h\xE0ng \u0111\u1EE3i.`);
    this.processScanningQueue();
  }
  // --- Processing Scanning Queue with MediaPipe ---
  async processScanningQueue() {
    if (!this.detectorReady || !this.faceDetector)
      return;
    const item = this.queue.find((i) => i.status === "Waiting");
    if (!item)
      return;
    item.status = "Scanning";
    item.progress = 20;
    try {
      const img = new Image();
      img.onload = async () => {
        item.progress = 50;
        try {
          const result = this.faceDetector.detect(img);
          const detections = result.detections || [];
          item.progress = 80;
          if (detections.length === 0) {
            item.status = "NoFace";
            item.progress = 100;
            this.processScanningQueue();
          } else {
            const detectedFaces = [];
            for (let idx = 0; idx < detections.length; idx++) {
              const det = detections[idx];
              const bbox = det.boundingBox;
              const cropCanvas = document.createElement("canvas");
              cropCanvas.width = 150;
              cropCanvas.height = 150;
              const ctx = cropCanvas.getContext("2d");
              if (ctx) {
                const x = Math.max(0, bbox.originX);
                const y = Math.max(0, bbox.originY);
                const w = Math.min(bbox.width, img.width - x);
                const h = Math.min(bbox.height, img.height - y);
                ctx.drawImage(img, x, y, w, h, 0, 0, 150, 150);
                const blob = await new Promise((resolve) => {
                  cropCanvas.toBlob((b) => resolve(b), "image/jpeg", 0.95);
                });
                if (blob) {
                  detectedFaces.push({
                    id: crypto.randomUUID(),
                    boundingBox: {
                      x: Math.round(bbox.originX),
                      y: Math.round(bbox.originY),
                      w: Math.round(bbox.width),
                      h: Math.round(bbox.height)
                    },
                    croppedBlob: blob,
                    croppedUrl: URL.createObjectURL(blob),
                    selected: true
                  });
                }
              }
            }
            item.detectedFaces = detectedFaces;
            item.status = "Success";
            item.progress = 100;
            if (!this.selectedQueueItem) {
              this.selectQueueItem(item);
            }
            this.processScanningQueue();
          }
        } catch (err) {
          console.error("MediaPipe detection error: ", err);
          item.status = "Error";
          item.progress = 100;
          this.processScanningQueue();
        }
      };
      img.onerror = () => {
        item.status = "Error";
        item.progress = 100;
        this.processScanningQueue();
      };
      img.src = item.thumbnailUrl;
    } catch (err) {
      item.status = "Error";
      item.progress = 100;
      this.processScanningQueue();
    }
  }
  selectQueueItem(item) {
    this.selectedQueueItem = item;
    setTimeout(() => this.drawDetectionsOverlay(), 50);
  }
  drawDetectionsOverlay() {
    if (!this.selectedQueueItem || !this.canvasContainer)
      return;
    const container = this.canvasContainer.nativeElement;
    container.innerHTML = "";
    const img = new Image();
    img.src = this.selectedQueueItem.thumbnailUrl;
    img.className = "canvas-main-img";
    img.onload = () => {
      var _a;
      container.appendChild(img);
      const overlay = document.createElement("div");
      overlay.className = "canvas-overlay";
      container.appendChild(overlay);
      const renderedWidth = img.clientWidth;
      const renderedHeight = img.clientHeight;
      const scaleX = renderedWidth / img.naturalWidth;
      const scaleY = renderedHeight / img.naturalHeight;
      (_a = this.selectedQueueItem) == null ? void 0 : _a.detectedFaces.forEach((face, index) => {
        const box = face.boundingBox;
        const div = document.createElement("div");
        div.className = `neon-box ${face.selected ? "active" : "inactive"}`;
        div.style.left = `${box.x * scaleX}px`;
        div.style.top = `${box.y * scaleY}px`;
        div.style.width = `${box.w * scaleX}px`;
        div.style.height = `${box.h * scaleY}px`;
        const badge = document.createElement("span");
        badge.className = "box-badge";
        badge.innerText = `#${index + 1}`;
        div.appendChild(badge);
        overlay.appendChild(div);
      });
    };
  }
  toggleFaceSelection(item, face) {
    face.selected = !face.selected;
    this.drawDetectionsOverlay();
  }
  toggleOriginalSelection(item) {
    item.selected = !item.selected;
  }
  removeQueueItem(item, event) {
    var _a;
    event.stopPropagation();
    URL.revokeObjectURL(item.thumbnailUrl);
    item.detectedFaces.forEach((f) => URL.revokeObjectURL(f.croppedUrl));
    this.queue = this.queue.filter((i) => i.id !== item.id);
    if (((_a = this.selectedQueueItem) == null ? void 0 : _a.id) === item.id) {
      this.selectedQueueItem = this.queue.length > 0 ? this.queue[0] : null;
      if (this.selectedQueueItem) {
        this.selectQueueItem(this.selectedQueueItem);
      }
    }
  }
  // --- Realtime saving session via REST API & Firestore notification bus ---
  async saveFaceDetectionSession() {
    var _a;
    if (!this.sessionName.trim()) {
      this.message.warning("Vui l\xF2ng nh\u1EADp t\xEAn phi\xEAn l\xE0m vi\u1EC7c.");
      return;
    }
    const itemsToSave = this.queue.filter((item) => item.status === "Success" && item.selected);
    if (itemsToSave.length === 0) {
      this.message.warning("Kh\xF4ng c\xF3 h\xECnh \u1EA3nh h\u1EE3p l\u1EC7 ho\u1EB7c \u0111\u01B0\u1EE3c ch\u1ECDn n\xE0o \u0111\u1EC3 l\u01B0u tr\u1EEF.");
      return;
    }
    this.savingSession = true;
    this.uploadProgressText = "\u0110ang chu\u1EA9n b\u1ECB t\u1EC7p tin nh\u1ECB ph\xE2n...";
    try {
      for (let i = 0; i < itemsToSave.length; i++) {
        const item = itemsToSave[i];
        const selectedCrops = item.detectedFaces.filter((f) => f.selected);
        this.uploadProgressText = `\u0110ang t\u1EA3i l\xEAn \u1EA3nh g\u1ED1c v\xE0 ${selectedCrops.length} khu\xF4n m\u1EB7t (${i + 1}/${itemsToSave.length})...`;
        const croppedFiles = selectedCrops.map((crop, idx) => {
          return new File([crop.croppedBlob], `crop_${idx}.jpg`, { type: "image/jpeg" });
        });
        const bboxes = selectedCrops.map((crop) => JSON.stringify(crop.boundingBox));
        const result = await this.api.saveSession(this.sessionId, this.sessionName, item.file, croppedFiles, bboxes);
        if (result && result.trackingId) {
          this.uploadTrackingId = result.trackingId;
          await this.listenToRealtimeNotification(result.trackingId);
        }
      }
      this.message.success("T\u1EA3i l\xEAn to\xE0n b\u1ED9 t\u1EC7p th\xE0nh c\xF4ng!");
      this.completeSessionSave();
    } catch (error) {
      console.error("[Save Session] API Failed: ", error);
      this.message.error(error.message || ((_a = error.error) == null ? void 0 : _a.message) || "L\u1ED7i k\u1EBFt n\u1ED1i ho\u1EB7c x\u1EED l\xFD ph\xEDa m\xE1y ch\u1EE7.");
      this.savingSession = false;
      this.uploadTrackingId = null;
      this.cleanupUnsubscribe();
      this.loadSessionsHistory();
    }
  }
  listenToRealtimeNotification(trackingId) {
    return new Promise((resolve, reject) => {
      this.cleanupUnsubscribe();
      this.firestoreUnsubscribe = this.firebase.subscribeToRequestId(trackingId, (data) => {
        if (data.status === "Completed") {
          this.cleanupUnsubscribe();
          resolve();
        } else if (data.status === "Error") {
          this.cleanupUnsubscribe();
          reject(new Error(data.message || "X\u1EED l\xFD l\u01B0u tr\u1EEF th\u1EA5t b\u1EA1i."));
        }
      });
    });
  }
  completeSessionSave() {
    this.savingSession = false;
    this.uploadTrackingId = null;
    this.cleanupUnsubscribe();
    this.resetWorkspace();
    this.loadSessionsHistory();
  }
  cleanupUnsubscribe() {
    if (this.firestoreUnsubscribe) {
      this.firestoreUnsubscribe();
      this.firestoreUnsubscribe = null;
    }
  }
  resetWorkspace() {
    this.queue.forEach((item) => URL.revokeObjectURL(item.thumbnailUrl));
    this.queue = [];
    this.selectedQueueItem = null;
    this.sessionId = crypto.randomUUID();
    this.setDefaultSessionName();
    this.message.info("Kh\xF4ng gian l\xE0m vi\u1EC7c \u0111\xE3 \u0111\u01B0\u1EE3c reset.");
  }
  // --- Historical Sessions & Actions ---
  async loadSessionsHistory() {
    try {
      this.loadingSessions = true;
      const result = await this.api.getSessions(this.pageIndex, this.pageSize);
      this.sessionsList = (result == null ? void 0 : result.data) || [];
      this.totalSessions = (result == null ? void 0 : result.total) || 0;
    } catch (error) {
      console.error("L\u1ED7i khi t\u1EA3i l\u1ECBch s\u1EED phi\xEAn: ", error);
    } finally {
      this.loadingSessions = false;
    }
  }
  onQueryParamsChange(params) {
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;
    this.loadSessionsHistory();
  }
  inlineRenameSession(session) {
    session.isEditing = true;
    session.tempName = session.name;
  }
  async saveInlineRename(session) {
    if (!session.tempName.trim()) {
      this.message.warning("T\xEAn phi\xEAn kh\xF4ng \u0111\u01B0\u1EE3c b\u1ECF tr\u1ED1ng.");
      return;
    }
    try {
      await this.api.renameSession(session.id, session.tempName);
      session.name = session.tempName;
      session.isEditing = false;
      this.message.success("\u0110\u1ED5i t\xEAn phi\xEAn th\xE0nh c\xF4ng.");
    } catch (error) {
      this.message.error("Kh\xF4ng th\u1EC3 \u0111\u1ED5i t\xEAn phi\xEAn upload.");
    }
  }
  cancelInlineRename(session) {
    session.isEditing = false;
  }
  deleteSession(session, event) {
    event.stopPropagation();
    this.modal.confirm({
      nzTitle: "X\xE1c nh\u1EADn x\xF3a phi\xEAn?",
      nzContent: `H\xE0nh \u0111\u1ED9ng n\xE0y s\u1EBD x\xF3a phi\xEAn "${session.name}" c\xF9ng t\u1EA5t c\u1EA3 \u1EA3nh g\u1ED1c v\xE0 \u1EA3nh khu\xF4n m\u1EB7t crop t\u01B0\u01A1ng \u1EE9ng c\u1EA3 tr\xEAn m\xE1y ch\u1EE7 v\xE0 d\u1ECBch v\u1EE5 Google Cloud Storage. Thao t\xE1c n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c!`,
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.api.deleteSession(session.id);
          this.message.success("\u0110\xE3 x\xF3a phi\xEAn l\xE0m vi\u1EC7c th\xE0nh c\xF4ng.");
          this.loadSessionsHistory();
        } catch (error) {
          this.message.error("L\u1ED7i khi x\xF3a phi\xEAn upload.");
        }
      }
    });
  }
  // --- Details Modal Display & Sub-actions ---
  async openSessionDetails(session) {
    this.selectedSessionDetails = session;
    this.loadingDetails = true;
    const modalRef = this.modal.create({
      nzTitle: `Chi ti\u1EBFt phi\xEAn: ${session.name}`,
      nzContent: this.selectedSessionDetails ? void 0 : "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...",
      nzFooter: null,
      nzWidth: 900
    });
    try {
      const details = await this.api.getSessionDetails(session.id);
      this.selectedSessionDetails = details;
      modalRef.updateConfig({
        nzContent: this.buildDetailsTemplate()
      });
    } catch (error) {
      this.message.error("L\u1ED7i khi t\u1EA3i chi ti\u1EBFt phi\xEAn upload.");
      modalRef.close();
    } finally {
      this.loadingDetails = false;
    }
  }
  buildDetailsTemplate() {
    this.showDetailsModal = true;
    return null;
  }
  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedSessionDetails = null;
    this.loadSessionsHistory();
  }
  async deleteDetailOriginalImage(image) {
    this.modal.confirm({
      nzTitle: "X\xE1c nh\u1EADn x\xF3a \u1EA3nh g\u1ED1c?",
      nzContent: "X\xF3a \u1EA3nh g\u1ED1c n\xE0y s\u1EBD x\xF3a c\u1EA3 c\xE1c \u1EA3nh khu\xF4n m\u1EB7t crop t\u01B0\u01A1ng \u1EE9ng tr\xEAn c\u1EA3 GCS v\xE0 database.",
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.api.deleteOriginalImage(image.id);
          this.message.success("X\xF3a \u1EA3nh g\u1ED1c th\xE0nh c\xF4ng.");
          if (this.selectedSessionDetails) {
            this.selectedSessionDetails.images = this.selectedSessionDetails.images.filter((img) => img.id !== image.id);
            if (this.selectedSessionDetails.images.length === 0) {
              this.closeDetailsModal();
            }
          }
        } catch (error) {
          this.message.error("L\u1ED7i khi x\xF3a \u1EA3nh g\u1ED1c.");
        }
      }
    });
  }
  async deleteDetailCroppedFace(face, image) {
    this.modal.confirm({
      nzTitle: "X\xE1c nh\u1EADn x\xF3a \u1EA3nh khu\xF4n m\u1EB7t crop?",
      nzContent: "X\xF3a \u1EA3nh crop n\xE0y kh\u1ECFi h\u1EC7 th\u1ED1ng database v\xE0 GCS.",
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.api.deleteCroppedFace(face.id);
          this.message.success("X\xF3a \u1EA3nh khu\xF4n m\u1EB7t crop th\xE0nh c\xF4ng.");
          image.croppedFaces = image.croppedFaces.filter((f) => f.id !== face.id);
        } catch (error) {
          this.message.error("L\u1ED7i khi x\xF3a \u1EA3nh khu\xF4n m\u1EB7t crop.");
        }
      }
    });
  }
  formatBytes(bytes) {
    if (bytes === 0)
      return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
};
_NhanDienKhuonMatComponent.\u0275fac = function NhanDienKhuonMatComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NhanDienKhuonMatComponent)();
};
_NhanDienKhuonMatComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NhanDienKhuonMatComponent, selectors: [["tot-nhan-dien-khuon-mat"]], viewQuery: function NhanDienKhuonMatComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c02, 5)(_c1, 5)(_c2, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInput = _t.first);
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.folderInput = _t.first);
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.canvasContainer = _t.first);
  }
}, decls: 61, vars: 20, consts: [["fileInput", ""], ["folderInput", ""], ["tableTitleTpl", ""], ["tableExtraTpl", ""], ["canvasContainer", ""], [1, "face-recognition-container"], [1, "workspace-header"], [1, "header-content"], [1, "gradient-title"], ["nz-icon", "", "nzType", "scan", "nzTheme", "outline"], [1, "subtitle"], [1, "header-actions"], ["nz-button", "", "nzType", "default", 1, "glass-btn", 3, "click"], ["nz-icon", "", "nzType", "redo"], [1, "dual-workspace-grid"], [1, "workspace-card", "left-side"], [1, "card-header"], [1, "card-title"], ["nz-icon", "", "nzType", "unordered-list"], [1, "upload-options"], ["nz-button", "", "nzType", "primary", 1, "glow-btn", 3, "click"], ["nz-icon", "", "nzType", "file-image"], ["nz-icon", "", "nzType", "folder-open"], ["type", "file", "multiple", "", 2, "display", "none", 3, "change"], ["type", "file", "webkitdirectory", "", "directory", "", "multiple", "", 2, "display", "none", 3, "change"], [1, "drop-zone", 3, "dragover", "drop", "click"], [1, "drop-icon"], ["nz-icon", "", "nzType", "cloud-upload"], [1, "drop-text"], [1, "drop-subtext"], [1, "queue-list-container", "custom-scrollbar"], ["class", "empty-state", 4, "ngIf"], ["class", "queue-item", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "workspace-card", "right-side"], ["nz-icon", "", "nzType", "smile"], ["class", "current-selected-file", 4, "ngIf"], ["class", "no-selection-state", 4, "ngIf"], ["class", "results-viewer custom-scrollbar", 4, "ngIf"], ["class", "workspace-card save-session-panel", 4, "ngIf"], [1, "workspace-card", "history-panel"], [1, "glass-table", 3, "queryParamsChange", "data", "columns", "loading", "nzSize", "frontPagination", "total", "pageIndex", "pageSize", "title", "extra"], ["totCell", "name"], ["totCell", "createdAt"], ["totCell", "createdBy"], ["totCell", "imageCount"], ["totCell", "action"], [1, "premium-modal", 3, "nzVisibleChange", "nzOnCancel", "nzVisible", "nzTitle", "nzWidth", "nzFooter"], ["class", "modal-content-wrapper", 4, "nzModalContent"], [1, "empty-state"], ["nz-icon", "", "nzType", "inbox", 1, "empty-icon"], [1, "queue-item", 3, "click"], ["alt", "thumb", 1, "item-thumb", 3, "src"], [1, "item-meta"], ["nz-tooltip", "", 1, "item-name", 3, "nzTooltipTitle"], [1, "item-size"], [1, "item-status"], ["nzColor", "default", 4, "ngIf"], ["nzColor", "processing", 4, "ngIf"], ["nzColor", "success", 4, "ngIf"], ["nzColor", "warning", 4, "ngIf"], ["nzColor", "error", 4, "ngIf"], ["nz-button", "", "nzType", "text", "nzDanger", "", 1, "remove-btn", 3, "click"], ["nz-icon", "", "nzType", "delete"], ["nzColor", "default"], ["nzColor", "processing"], ["nz-icon", "", "nzType", "loading"], ["nzColor", "success"], ["nzColor", "warning"], ["nzColor", "error"], [1, "current-selected-file"], [1, "no-selection-state"], ["nz-icon", "", "nzType", "picture", 1, "large-icon"], [1, "results-viewer", "custom-scrollbar"], [1, "canvas-panel-wrapper"], [1, "panel-header"], [1, "select-option"], [1, "toggle-label"], [3, "ngModelChange", "ngModel"], [1, "image-viewport"], [1, "canvas-container"], [1, "faces-crop-panel"], ["nzColor", "purple"], ["class", "empty-faces-crop", 4, "ngIf"], [1, "crops-grid"], ["class", "crop-card", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "empty-faces-crop"], [1, "crop-card", 3, "click"], [1, "crop-image-wrapper"], ["alt", "face-crop", 3, "src"], [1, "crop-index-badge"], ["class", "checkmark-overlay", 4, "ngIf"], [1, "crop-meta"], [1, "bbox-coords"], [1, "select-checkbox"], ["type", "checkbox", "readonly", "", 3, "checked"], [1, "checkmark-overlay"], ["nz-icon", "", "nzType", "check-circle", "nzTheme", "fill"], [1, "workspace-card", "save-session-panel"], [1, "save-form"], [1, "input-group"], ["for", "sessionName"], ["nz-input", "", "id", "sessionName", "placeholder", "Nh\u1EADp t\xEAn phi\xEAn upload...", 1, "neon-input", 3, "ngModelChange", "ngModel", "disabled"], [1, "action-group"], ["nz-button", "", "nzType", "primary", 1, "glow-btn", "large-btn", 3, "click", "nzLoading", "disabled"], ["nz-icon", "", "nzType", "cloud-sync", 4, "ngIf"], ["class", "progress-bar-overlay", 4, "ngIf"], ["nz-icon", "", "nzType", "cloud-sync"], [1, "progress-bar-overlay"], [1, "progress-box"], ["nzSimple", "", "nzSize", "large"], [1, "realtime-badge"], ["nz-icon", "", "nzType", "sync", "nzSpin", ""], ["class", "session-name-view", 4, "ngIf"], ["class", "session-name-edit", 4, "ngIf"], [1, "session-name-view"], [1, "s-name"], ["nz-button", "", "nzType", "text", 1, "edit-btn", 3, "click"], ["nz-icon", "", "nzType", "edit"], [1, "session-name-edit"], ["nz-input", "", 1, "table-input", 3, "ngModelChange", "ngModel"], ["nz-button", "", "nzType", "primary", "nzSize", "small", 3, "click"], ["nz-icon", "", "nzType", "check"], ["nz-button", "", "nzType", "default", "nzSize", "small", 3, "click"], ["nz-icon", "", "nzType", "close"], ["nzColor", "geekblue"], [1, "action-buttons-group", "flex-vertical-stack"], ["nzType", "primary", "nzSize", "small", 1, "glow-btn", "full-width", 3, "click"], ["nz-icon", "", "nzType", "eye"], ["nzType", "default", "nzSize", "small", 1, "danger-btn", "full-width", 3, "click", "nzDanger"], [1, "card-title", 2, "color", "#fff", "font-size", "16px", "font-weight", "600"], ["nz-icon", "", "nzType", "history"], ["nz-button", "", "nzType", "default", 1, "glass-btn", 3, "click", "nzLoading"], ["nz-icon", "", "nzType", "reload"], [1, "modal-content-wrapper"], ["class", "modal-spinner", 4, "ngIf"], ["class", "modal-body custom-scrollbar", 4, "ngIf"], [1, "modal-spinner"], [1, "modal-body", "custom-scrollbar"], ["class", "details-image-card", 4, "ngFor", "ngForOf"], [1, "details-image-card"], [1, "img-card-header"], [1, "img-meta"], [1, "file-name"], ["nzColor", "blue"], [1, "upload-time"], ["nz-button", "", "nzType", "default", "nzDanger", "", "nzSize", "small", 1, "glass-danger-btn", 3, "click"], [1, "img-body-layout"], [1, "original-image-preview"], ["alt", "original-img", 1, "detail-main-img", 3, "src"], [1, "cropped-faces-detail-panel"], ["class", "no-crops-placeholder", 4, "ngIf"], [1, "detail-crops-grid"], ["class", "detail-crop-avatar-card", 4, "ngFor", "ngForOf"], [1, "no-crops-placeholder"], [1, "detail-crop-avatar-card"], [1, "avatar-img-box"], ["alt", "crop-face", 3, "src"], ["nz-button", "", "nzType", "text", "nzDanger", "", "nz-tooltip", "", "nzTooltipTitle", "X\xF3a \u1EA3nh khu\xF4n m\u1EB7t crop n\xE0y", 1, "delete-avatar-btn", 3, "click"], ["nz-icon", "", "nzType", "close-circle", "nzTheme", "fill"], [1, "avatar-meta"], [1, "bbox-json"]], template: function NhanDienKhuonMatComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div", 7)(3, "h1", 8);
    \u0275\u0275element(4, "i", 9);
    \u0275\u0275text(5, " Nh\u1EADn Di\u1EC7n & Tr\xEDch Xu\u1EA5t Khu\xF4n M\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 10);
    \u0275\u0275text(7, "H\u1EC7 th\u1ED1ng ph\xE2n t\xEDch v\xE0 tr\xEDch xu\u1EA5t khu\xF4n m\u1EB7t th\xF4ng minh ch\u1EA1y tr\u1EF1c ti\u1EBFp tr\xEAn Tr\xECnh duy\u1EC7t (Edge AI)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 11)(9, "button", 12);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_Template_button_click_9_listener() {
      return ctx.resetWorkspace();
    });
    \u0275\u0275element(10, "i", 13);
    \u0275\u0275text(11, " L\xE0m m\u1EDBi Workspace ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 14)(13, "div", 15)(14, "div", 16)(15, "span", 17);
    \u0275\u0275element(16, "i", 18);
    \u0275\u0275text(17, " H\xE0ng \u0110\u1EE3i Ngu\u1ED3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 19)(19, "button", 20);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_Template_button_click_19_listener() {
      return ctx.triggerFileInput();
    });
    \u0275\u0275element(20, "i", 21);
    \u0275\u0275text(21, " Ch\u1ECDn \u1EA2nh ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 12);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_Template_button_click_22_listener() {
      return ctx.triggerFolderInput();
    });
    \u0275\u0275element(23, "i", 22);
    \u0275\u0275text(24, " Ch\u1ECDn Th\u01B0 M\u1EE5c ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 23, 0);
    \u0275\u0275listener("change", function NhanDienKhuonMatComponent_Template_input_change_25_listener($event) {
      return ctx.onFilesSelected($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 24, 1);
    \u0275\u0275listener("change", function NhanDienKhuonMatComponent_Template_input_change_27_listener($event) {
      return ctx.onFolderSelected($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 25);
    \u0275\u0275listener("dragover", function NhanDienKhuonMatComponent_Template_div_dragover_29_listener($event) {
      return ctx.onDragOver($event);
    })("drop", function NhanDienKhuonMatComponent_Template_div_drop_29_listener($event) {
      return ctx.onDrop($event);
    })("click", function NhanDienKhuonMatComponent_Template_div_click_29_listener() {
      return ctx.triggerFileInput();
    });
    \u0275\u0275elementStart(30, "div", 26);
    \u0275\u0275element(31, "i", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p", 28);
    \u0275\u0275text(33, "K\xE9o th\u1EA3 t\u1EC7p tin \u1EA3nh ho\u1EB7c th\u01B0 m\u1EE5c v\xE0o \u0111\xE2y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span", 29);
    \u0275\u0275text(35, "H\u1ED7 tr\u1EE3 c\u1ED9ng d\u1ED3n danh s\xE1ch");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 30);
    \u0275\u0275template(37, NhanDienKhuonMatComponent_div_37_Template, 4, 0, "div", 31)(38, NhanDienKhuonMatComponent_div_38_Template, 15, 11, "div", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 33)(40, "div", 16)(41, "span", 17);
    \u0275\u0275element(42, "i", 34);
    \u0275\u0275text(43, " K\u1EBFt Qu\u1EA3 Qu\xE9t & Tr\xEDch Xu\u1EA5t");
    \u0275\u0275elementEnd();
    \u0275\u0275template(44, NhanDienKhuonMatComponent_span_44_Template, 2, 1, "span", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275template(45, NhanDienKhuonMatComponent_div_45_Template, 4, 0, "div", 36)(46, NhanDienKhuonMatComponent_div_46_Template, 21, 3, "div", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(47, NhanDienKhuonMatComponent_div_47_Template, 11, 6, "div", 38);
    \u0275\u0275elementStart(48, "div", 39)(49, "tot-table", 40);
    \u0275\u0275listener("queryParamsChange", function NhanDienKhuonMatComponent_Template_tot_table_queryParamsChange_49_listener($event) {
      return ctx.onQueryParamsChange($event);
    });
    \u0275\u0275template(50, NhanDienKhuonMatComponent_ng_template_50_Template, 2, 2, "ng-template", 41)(51, NhanDienKhuonMatComponent_ng_template_51_Template, 2, 4, "ng-template", 42)(52, NhanDienKhuonMatComponent_ng_template_52_Template, 1, 1, "ng-template", 43)(53, NhanDienKhuonMatComponent_ng_template_53_Template, 2, 1, "ng-template", 44)(54, NhanDienKhuonMatComponent_ng_template_54_Template, 7, 1, "ng-template", 45);
    \u0275\u0275elementEnd();
    \u0275\u0275template(55, NhanDienKhuonMatComponent_ng_template_55_Template, 3, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(57, NhanDienKhuonMatComponent_ng_template_57_Template, 3, 1, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "nz-modal", 46);
    \u0275\u0275twoWayListener("nzVisibleChange", function NhanDienKhuonMatComponent_Template_nz_modal_nzVisibleChange_59_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.showDetailsModal, $event) || (ctx.showDetailsModal = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function NhanDienKhuonMatComponent_Template_nz_modal_nzOnCancel_59_listener() {
      return ctx.closeDetailsModal();
    });
    \u0275\u0275template(60, NhanDienKhuonMatComponent_div_60_Template, 3, 2, "div", 47);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tableTitleTpl_r23 = \u0275\u0275reference(56);
    const tableExtraTpl_r24 = \u0275\u0275reference(58);
    \u0275\u0275advance(37);
    \u0275\u0275property("ngIf", ctx.queue.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.queue);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.selectedQueueItem);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.selectedQueueItem);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.selectedQueueItem);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.queue.length > 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx.sessionsList)("columns", ctx.historyColumns)("loading", ctx.loadingSessions)("nzSize", "middle")("frontPagination", false)("total", ctx.totalSessions)("pageIndex", ctx.pageIndex)("pageSize", ctx.pageSize)("title", tableTitleTpl_r23)("extra", tableExtraTpl_r24);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("nzVisible", ctx.showDetailsModal);
    \u0275\u0275property("nzTitle", "S\u01A1 \u0111\u1ED3 chi ti\u1EBFt phi\xEAn: " + ((ctx.selectedSessionDetails == null ? null : ctx.selectedSessionDetails.name) || ""))("nzWidth", 900)("nzFooter", null);
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  FormsModule,
  DefaultValueAccessor,
  NgControlStatus,
  NgModel,
  NzButtonModule,
  NzButtonComponent,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzInputModule,
  NzInputDirective,
  NzTableModule,
  NzModalModule,
  NzModalComponent,
  NzModalContentDirective,
  NzIconModule,
  NzIconDirective,
  NzCardModule,
  NzTagModule,
  NzTagComponent,
  NzSpinModule,
  NzSpinComponent,
  NzSwitchModule,
  NzSwitchComponent,
  NzTooltipModule,
  NzTooltipDirective,
  TotButtonComponent,
  TotTableComponent,
  TotCellDirective,
  DatePipe
], styles: ['@import "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap";\n\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family:\n    "Outfit",\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n  color: #E2E8F0;\n  background-color: #0F172A;\n  min-height: 100vh;\n  padding: 24px;\n}\n.face-recognition-container[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.workspace-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  padding-bottom: 20px;\n}\n.gradient-title[_ngcontent-%COMP%] {\n  font-size: 2.2rem;\n  font-weight: 700;\n  margin: 0;\n  background:\n    linear-gradient(\n      135deg,\n      #38BDF8 0%,\n      #818CF8 50%,\n      #C084FC 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  filter: drop-shadow(0 2px 10px rgba(56, 189, 248, 0.15));\n}\n.subtitle[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #94A3B8;\n  margin: 4px 0 0 0;\n}\n.workspace-card[_ngcontent-%COMP%] {\n  background: rgba(30, 41, 59, 0.65);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  overflow: hidden;\n}\n.workspace-card[_ngcontent-%COMP%]:hover {\n  border-color: rgba(56, 189, 248, 0.2);\n  box-shadow: 0 12px 40px 0 rgba(56, 189, 248, 0.08);\n}\n.card-header[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  background: rgba(15, 23, 42, 0.4);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.card-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #F8FAFC;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dual-workspace-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 420px 1fr;\n  gap: 24px;\n  height: 650px;\n}\n.left-side[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.upload-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.drop-zone[_ngcontent-%COMP%] {\n  margin: 16px;\n  padding: 24px;\n  border: 2px dashed rgba(56, 189, 248, 0.3);\n  border-radius: 12px;\n  text-align: center;\n  cursor: pointer;\n  background: rgba(56, 189, 248, 0.02);\n  transition: all 0.25s ease;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.drop-zone[_ngcontent-%COMP%]:hover {\n  background: rgba(56, 189, 248, 0.06);\n  border-color: #38BDF8;\n  box-shadow: inset 0 0 12px rgba(56, 189, 248, 0.1);\n}\n.drop-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: #38BDF8;\n  margin-bottom: 8px;\n  filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.4));\n  animation: _ngcontent-%COMP%_float 3s ease-in-out infinite;\n}\n.drop-text[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #F1F5F9;\n  margin: 0;\n}\n.drop-subtext[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #64748B;\n  margin-top: 4px;\n}\n.queue-list-container[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 0 16px 16px 16px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 250px;\n  color: #64748B;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin-bottom: 12px;\n}\n.queue-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n  border-radius: 10px;\n  background: rgba(15, 23, 42, 0.3);\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  margin-bottom: 10px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.queue-item[_ngcontent-%COMP%]:hover {\n  background: rgba(15, 23, 42, 0.6);\n  border-color: rgba(56, 189, 248, 0.2);\n  transform: translateY(-1px);\n}\n.queue-item.active[_ngcontent-%COMP%] {\n  background: rgba(56, 189, 248, 0.08);\n  border-color: rgba(56, 189, 248, 0.5);\n  box-shadow: 0 0 12px rgba(56, 189, 248, 0.08);\n}\n.item-thumb[_ngcontent-%COMP%] {\n  width: 50px;\n  height: 50px;\n  border-radius: 8px;\n  object-fit: cover;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.item-meta[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.item-name[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: #E2E8F0;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.item-size[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #64748B;\n}\n.item-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.remove-btn[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n.queue-item[_ngcontent-%COMP%]:hover   .remove-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.right-side[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.current-selected-file[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #38BDF8;\n  font-weight: 500;\n  background: rgba(56, 189, 248, 0.1);\n  padding: 4px 10px;\n  border-radius: 20px;\n  border: 1px solid rgba(56, 189, 248, 0.2);\n}\n.no-selection-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  flex: 1;\n  color: #64748B;\n}\n.large-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  margin-bottom: 16px;\n  opacity: 0.3;\n}\n.results-viewer[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.canvas-panel-wrapper[_ngcontent-%COMP%] {\n  background: rgba(15, 23, 42, 0.4);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: 12px;\n  overflow: hidden;\n}\n.panel-header[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  background: rgba(15, 23, 42, 0.6);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-weight: 500;\n  font-size: 0.9rem;\n  color: #CBD5E1;\n}\n.select-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.toggle-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #94A3B8;\n}\n.image-viewport[_ngcontent-%COMP%] {\n  padding: 16px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #020617;\n  min-height: 250px;\n  max-height: 380px;\n}\n.canvas-container[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 100%;\n  max-height: 350px;\n  display: inline-block;\n}\n.canvas-main-img[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 350px;\n  display: block;\n  border-radius: 6px;\n}\n.canvas-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n.neon-box[_ngcontent-%COMP%] {\n  position: absolute;\n  border: 2px solid #10B981;\n  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5), inset 0 0 10px rgba(16, 185, 129, 0.3);\n  pointer-events: auto;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.neon-box.active[_ngcontent-%COMP%] {\n  border-color: #38BDF8;\n  box-shadow: 0 0 12px rgba(56, 189, 248, 0.8), inset 0 0 12px rgba(56, 189, 248, 0.4);\n}\n.neon-box.inactive[_ngcontent-%COMP%] {\n  border-color: rgba(239, 68, 68, 0.6);\n  box-shadow: 0 0 8px rgba(239, 68, 68, 0.3);\n}\n.box-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -20px;\n  left: -2px;\n  background: #38BDF8;\n  color: #0F172A;\n  font-size: 0.65rem;\n  font-weight: 700;\n  padding: 1px 5px;\n  border-radius: 3px 3px 0 0;\n}\n.faces-crop-panel[_ngcontent-%COMP%] {\n  background: rgba(15, 23, 42, 0.4);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: 12px;\n  overflow: hidden;\n  padding-bottom: 16px;\n}\n.empty-faces-crop[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 30px;\n  color: #64748B;\n}\n.crops-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));\n  gap: 16px;\n  padding: 16px;\n}\n.crop-card[_ngcontent-%COMP%] {\n  background: rgba(30, 41, 59, 0.8);\n  border: 1px solid rgba(255, 255, 255, 0.06);\n  border-radius: 10px;\n  overflow: hidden;\n  cursor: pointer;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.crop-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  border-color: rgba(56, 189, 248, 0.3);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\n}\n.crop-card.selected[_ngcontent-%COMP%] {\n  border-color: #38BDF8;\n  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);\n}\n.crop-image-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  aspect-ratio: 1;\n  background: #020617;\n}\n.crop-image-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.3s ease;\n}\n.crop-card[_ngcontent-%COMP%]:hover   .crop-image-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  transform: scale(1.08);\n}\n.crop-index-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 6px;\n  left: 6px;\n  background: rgba(15, 23, 42, 0.85);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  color: #E2E8F0;\n  font-size: 0.7rem;\n  font-weight: 500;\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.checkmark-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 6px;\n  right: 6px;\n  font-size: 1.25rem;\n  color: #38BDF8;\n  filter: drop-shadow(0 0 4px rgba(15, 23, 42, 0.8));\n}\n.crop-meta[_ngcontent-%COMP%] {\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.bbox-coords[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  color: #64748B;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.select-checkbox[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: #CBD5E1;\n}\n.save-session-panel[_ngcontent-%COMP%] {\n  padding: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(30, 41, 59, 0.8) 0%,\n      rgba(15, 23, 42, 0.8) 100%);\n  position: relative;\n}\n.save-form[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n  flex-wrap: wrap;\n}\n.input-group[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 300px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.input-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #94A3B8;\n}\n.neon-input[_ngcontent-%COMP%] {\n  background: rgba(15, 23, 42, 0.6) !important;\n  border: 1px solid rgba(56, 189, 248, 0.2) !important;\n  color: #F8FAFC !important;\n  border-radius: 8px !important;\n  padding: 10px 14px !important;\n  transition: all 0.3s ease !important;\n}\n.neon-input[_ngcontent-%COMP%]:focus {\n  border-color: #38BDF8 !important;\n  box-shadow: 0 0 10px rgba(56, 189, 248, 0.25) !important;\n}\n.progress-bar-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(15, 23, 42, 0.92);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 10;\n}\n.progress-box[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.progress-box[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  color: #38BDF8;\n  font-size: 1.1rem;\n}\n.realtime-badge[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #818CF8;\n}\n.glow-btn[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #0284C7 0%,\n      #4F46E5 100%) !important;\n  border: none !important;\n  color: white !important;\n  font-weight: 600 !important;\n  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.25) !important;\n  transition: all 0.3s ease !important;\n}\n.glow-btn[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4) !important;\n}\n.glow-btn.large-btn[_ngcontent-%COMP%] {\n  padding: 12px 28px !important;\n  height: auto !important;\n  font-size: 1rem !important;\n  border-radius: 8px !important;\n}\n.glass-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.04) !important;\n  border: 1px solid rgba(255, 255, 255, 0.08) !important;\n  color: #CBD5E1 !important;\n  font-weight: 500 !important;\n  transition: all 0.2s ease !important;\n}\n.glass-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.08) !important;\n  color: white !important;\n}\n.danger-btn[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.1) !important;\n  border: 1px solid rgba(239, 68, 68, 0.2) !important;\n  color: #EF4444 !important;\n  font-weight: 500 !important;\n}\n.danger-btn[_ngcontent-%COMP%]:hover {\n  background: #EF4444 !important;\n  color: white !important;\n}\n.history-panel[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.glass-table[_ngcontent-%COMP%] {\n  background: transparent !important;\n}\n  .glass-table .ant-table {\n  background: transparent !important;\n  color: #E2E8F0 !important;\n}\n  .glass-table .ant-table-thead > tr > th {\n  background: rgba(15, 23, 42, 0.8) !important;\n  color: #94A3B8 !important;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n  font-weight: 600 !important;\n  font-size: 0.85rem !important;\n  text-transform: uppercase;\n}\n  .glass-table .ant-table-tbody > tr > td {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;\n  background: transparent !important;\n}\n  .glass-table .ant-table-tbody > tr:hover > td {\n  background: rgba(255, 255, 255, 0.02) !important;\n}\n.session-name-view[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.s-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #F1F5F9;\n}\n.edit-btn[_ngcontent-%COMP%] {\n  color: #64748B;\n  padding: 0 4px;\n}\n.edit-btn[_ngcontent-%COMP%]:hover {\n  color: #38BDF8;\n}\n.session-name-edit[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.table-input[_ngcontent-%COMP%] {\n  background: #0F172A !important;\n  border: 1px solid rgba(255, 255, 255, 0.1) !important;\n  color: white !important;\n  font-size: 0.9rem !important;\n}\n.action-buttons-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n}\n  .premium-modal .ant-modal-content {\n  background: #0F172A !important;\n  border: 1px solid rgba(255, 255, 255, 0.08) !important;\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5) !important;\n  border-radius: 16px !important;\n  color: #E2E8F0 !important;\n}\n  .premium-modal .ant-modal-header {\n  background: rgba(15, 23, 42, 0.8) !important;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n  border-radius: 16px 16px 0 0 !important;\n}\n  .premium-modal .ant-modal-title {\n  color: #F8FAFC !important;\n  font-weight: 700 !important;\n  font-size: 1.2rem !important;\n}\n  .premium-modal .ant-modal-close-icon {\n  color: #94A3B8 !important;\n}\n  .premium-modal .ant-modal-close-icon:hover {\n  color: white !important;\n}\n.modal-content-wrapper[_ngcontent-%COMP%] {\n  padding: 24px 0;\n}\n.modal-spinner[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 40px;\n  color: #64748B;\n}\n.modal-body[_ngcontent-%COMP%] {\n  max-height: 550px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding: 0 24px;\n}\n.details-image-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  background: rgba(15, 23, 42, 0.4);\n  border-radius: 12px;\n  overflow: hidden;\n}\n.img-card-header[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  background: rgba(15, 23, 42, 0.7);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.img-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.file-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #F1F5F9;\n}\n.upload-time[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #64748B;\n}\n.glass-danger-btn[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.05) !important;\n  border: 1px solid rgba(239, 68, 68, 0.15) !important;\n  color: #EF4444 !important;\n  transition: all 0.2s ease !important;\n}\n.glass-danger-btn[_ngcontent-%COMP%]:hover {\n  background: #EF4444 !important;\n  color: white !important;\n}\n.img-body-layout[_ngcontent-%COMP%] {\n  padding: 16px;\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  gap: 20px;\n}\n.original-image-preview[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  overflow: hidden;\n  background: #020617;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 180px;\n}\n.detail-main-img[_ngcontent-%COMP%] {\n  max-width: 100%;\n  max-height: 100%;\n  object-fit: contain;\n}\n.cropped-faces-detail-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.cropped-faces-detail-panel[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #CBD5E1;\n}\n.no-crops-placeholder[_ngcontent-%COMP%] {\n  color: #64748B;\n  font-style: italic;\n  font-size: 0.85rem;\n}\n.detail-crops-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));\n  gap: 12px;\n}\n.detail-crop-avatar-card[_ngcontent-%COMP%] {\n  background: rgba(15, 23, 42, 0.5);\n  border: 1px solid rgba(255, 255, 255, 0.04);\n  border-radius: 8px;\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n  padding: 8px;\n}\n.avatar-img-box[_ngcontent-%COMP%] {\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n  overflow: hidden;\n  margin: 0 auto 8px auto;\n  position: relative;\n  border: 2px solid rgba(56, 189, 248, 0.2);\n  transition: transform 0.2s ease;\n}\n.detail-crop-avatar-card[_ngcontent-%COMP%]:hover   .avatar-img-box[_ngcontent-%COMP%] {\n  transform: scale(1.05);\n  border-color: #38BDF8;\n}\n.avatar-img-box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.delete-avatar-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(15, 23, 42, 0.6) !important;\n  opacity: 0;\n  transition: opacity 0.2s ease !important;\n  border: none !important;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 50%;\n  font-size: 1.5rem !important;\n}\n.avatar-img-box[_ngcontent-%COMP%]:hover   .delete-avatar-btn[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.avatar-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  font-size: 0.65rem;\n  color: #64748B;\n}\n.bbox-json[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-family: monospace;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: rgba(15, 23, 42, 0.2);\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.08);\n  border-radius: 4px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: rgba(56, 189, 248, 0.3);\n}\n@keyframes _ngcontent-%COMP%_float {\n  0% {\n    transform: translateY(0px);\n  }\n  50% {\n    transform: translateY(-4px);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\n.flex-vertical-stack[_ngcontent-%COMP%] {\n  display: flex !important;\n  flex-direction: column !important;\n  gap: 6px !important;\n  align-items: stretch !important;\n  width: 100%;\n  padding: 4px 0;\n}\n.flex-vertical-stack[_ngcontent-%COMP%]   tot-button[_ngcontent-%COMP%] {\n  width: 100% !important;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100% !important;\n}\n  .glass-table .ant-table-cell {\n  white-space: normal !important;\n  word-break: break-word !important;\n}\n/*# sourceMappingURL=nhan-dien-khuon-mat.component.css.map */'] });
var NhanDienKhuonMatComponent = _NhanDienKhuonMatComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NhanDienKhuonMatComponent, [{
    type: Component,
    args: [{ selector: "tot-nhan-dien-khuon-mat", standalone: true, imports: [
      CommonModule,
      FormsModule,
      NzButtonModule,
      NzInputModule,
      NzTableModule,
      NzModalModule,
      NzIconModule,
      NzCardModule,
      NzTagModule,
      NzSpinModule,
      NzSwitchModule,
      NzTooltipModule,
      TotButtonComponent,
      TotTableComponent,
      TotCellDirective
    ], template: `<div class="face-recognition-container">
  <!-- Top premium title and hero stats -->
  <div class="workspace-header">
    <div class="header-content">
      <h1 class="gradient-title"><i nz-icon nzType="scan" nzTheme="outline"></i> Nh\u1EADn Di\u1EC7n & Tr\xEDch Xu\u1EA5t Khu\xF4n M\u1EB7t</h1>
      <p class="subtitle">H\u1EC7 th\u1ED1ng ph\xE2n t\xEDch v\xE0 tr\xEDch xu\u1EA5t khu\xF4n m\u1EB7t th\xF4ng minh ch\u1EA1y tr\u1EF1c ti\u1EBFp tr\xEAn Tr\xECnh duy\u1EC7t (Edge AI)</p>
    </div>
    <div class="header-actions">
      <button nz-button nzType="default" (click)="resetWorkspace()" class="glass-btn">
        <i nz-icon nzType="redo"></i> L\xE0m m\u1EDBi Workspace
      </button>
    </div>
  </div>

  <!-- Dual Workspace Section -->
  <div class="dual-workspace-grid">
    <!-- LEFT SIDE: File queue and loading/dropzone -->
    <div class="workspace-card left-side">
      <div class="card-header">
        <span class="card-title"><i nz-icon nzType="unordered-list"></i> H\xE0ng \u0110\u1EE3i Ngu\u1ED3n</span>
        <div class="upload-options">
          <button nz-button nzType="primary" (click)="triggerFileInput()" class="glow-btn">
            <i nz-icon nzType="file-image"></i> Ch\u1ECDn \u1EA2nh
          </button>
          <button nz-button nzType="default" (click)="triggerFolderInput()" class="glass-btn">
            <i nz-icon nzType="folder-open"></i> Ch\u1ECDn Th\u01B0 M\u1EE5c
          </button>
          <input type="file" multiple (change)="onFilesSelected($event)" #fileInput style="display:none">
          <input type="file" webkitdirectory directory multiple (change)="onFolderSelected($event)" #folderInput style="display:none">
        </div>
      </div>

      <!-- Drag & Drop Zone -->
      <div class="drop-zone" (dragover)="onDragOver($event)" (drop)="onDrop($event)" (click)="triggerFileInput()">
        <div class="drop-icon">
          <i nz-icon nzType="cloud-upload"></i>
        </div>
        <p class="drop-text">K\xE9o th\u1EA3 t\u1EC7p tin \u1EA3nh ho\u1EB7c th\u01B0 m\u1EE5c v\xE0o \u0111\xE2y</p>
        <span class="drop-subtext">H\u1ED7 tr\u1EE3 c\u1ED9ng d\u1ED3n danh s\xE1ch</span>
      </div>

      <!-- Queue list -->
      <div class="queue-list-container custom-scrollbar">
        <div *ngIf="queue.length === 0" class="empty-state">
          <i nz-icon nzType="inbox" class="empty-icon"></i>
          <p>Ch\u01B0a c\xF3 h\xECnh \u1EA3nh n\xE0o trong h\xE0ng \u0111\u1EE3i</p>
        </div>
        
        <div *ngFor="let item of queue" 
             class="queue-item" 
             [class.active]="selectedQueueItem?.id === item.id"
             (click)="selectQueueItem(item)">
          <img [src]="item.thumbnailUrl" class="item-thumb" alt="thumb">
          <div class="item-meta">
            <span class="item-name" [nzTooltipTitle]="item.name" nz-tooltip>{{ item.name }}</span>
            <span class="item-size">{{ formatBytes(item.size) }}</span>
          </div>
          <div class="item-status">
            <!-- Badges -->
            <nz-tag *ngIf="item.status === 'Waiting'" nzColor="default">\u0110ang ch\u1EDD...</nz-tag>
            <nz-tag *ngIf="item.status === 'Scanning'" nzColor="processing">
              <i nz-icon nzType="loading"></i> Qu\xE9t {{ item.progress }}%
            </nz-tag>
            <nz-tag *ngIf="item.status === 'Success'" nzColor="success">
              \u0110\xE3 tr\xEDch xu\u1EA5t ({{ item.detectedFaces.length }})
            </nz-tag>
            <nz-tag *ngIf="item.status === 'NoFace'" nzColor="warning">Kh\xF4ng t\xECm th\u1EA5y m\u1EB7t</nz-tag>
            <nz-tag *ngIf="item.status === 'Error'" nzColor="error">L\u1ED7i qu\xE9t</nz-tag>
          </div>
          <button nz-button nzType="text" nzDanger (click)="removeQueueItem(item, $event)" class="remove-btn">
            <i nz-icon nzType="delete"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- RIGHT SIDE: Target image canvas and cropped faces grid -->
    <div class="workspace-card right-side">
      <div class="card-header">
        <span class="card-title"><i nz-icon nzType="smile"></i> K\u1EBFt Qu\u1EA3 Qu\xE9t & Tr\xEDch Xu\u1EA5t</span>
        <span *ngIf="selectedQueueItem" class="current-selected-file">{{ selectedQueueItem.name }}</span>
      </div>

      <div *ngIf="!selectedQueueItem" class="no-selection-state">
        <i nz-icon nzType="picture" class="large-icon"></i>
        <p>Ch\u1ECDn m\u1ED9t t\u1EC7p t\u1EEB h\xE0ng \u0111\u1EE3i b\xEAn tr\xE1i \u0111\u1EC3 xem k\u1EBFt qu\u1EA3 tr\xEDch xu\u1EA5t chi ti\u1EBFt</p>
      </div>

      <div *ngIf="selectedQueueItem" class="results-viewer custom-scrollbar">
        <!-- Interactive Canvas Image with Neon Boxes -->
        <div class="canvas-panel-wrapper">
          <div class="panel-header">
            <span>Khung \u1EA3nh g\u1ED1c (V\u1EBD Bounding Box)</span>
            <div class="select-option">
              <span class="toggle-label">\u0110\u01B0a v\xE0o phi\xEAn l\u01B0u tr\u1EEF:</span>
              <nz-switch [(ngModel)]="selectedQueueItem.selected" (ngModelChange)="toggleOriginalSelection(selectedQueueItem)"></nz-switch>
            </div>
          </div>
          
          <div class="image-viewport">
            <div #canvasContainer class="canvas-container">
              <!-- Dynamically injected Image and divs from TypeScript -->
            </div>
          </div>
        </div>

        <!-- Face crops grid list -->
        <div class="faces-crop-panel">
          <div class="panel-header">
            <span>Danh s\xE1ch khu\xF4n m\u1EB7t \u0111\xE3 c\u1EAFt (K\xEDch th\u01B0\u1EDBc chu\u1EA9n 150x150)</span>
            <nz-tag nzColor="purple">MediaPipe Local AI</nz-tag>
          </div>

          <div *ngIf="selectedQueueItem.detectedFaces.length === 0" class="empty-faces-crop">
            <p>Kh\xF4ng c\xF3 khu\xF4n m\u1EB7t n\xE0o \u0111\u01B0\u1EE3c ph\xE1t hi\u1EC7n t\u1EEB \u1EA3nh n\xE0y</p>
          </div>

          <div class="crops-grid">
            <div *ngFor="let face of selectedQueueItem.detectedFaces; let idx = index" 
                 class="crop-card" 
                 [class.selected]="face.selected"
                 (click)="toggleFaceSelection(selectedQueueItem, face)">
              <div class="crop-image-wrapper">
                <img [src]="face.croppedUrl" alt="face-crop">
                <div class="crop-index-badge">M\u1EB7t #{{ idx + 1 }}</div>
                <div class="checkmark-overlay" *ngIf="face.selected">
                  <i nz-icon nzType="check-circle" nzTheme="fill"></i>
                </div>
              </div>
              <div class="crop-meta">
                <span class="bbox-coords">T\u1ECDa \u0111\u1ED9: [x:{{ face.boundingBox.x }}, y:{{ face.boundingBox.y }}]</span>
                <div class="select-checkbox">
                  <input type="checkbox" [checked]="face.selected" readonly>
                  <span>L\u01B0u tr\u1EEF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom Save Settings Panel -->
  <div class="workspace-card save-session-panel" *ngIf="queue.length > 0">
    <div class="save-form">
      <div class="input-group">
        <label for="sessionName">T\xEAn phi\xEAn l\u01B0u tr\u1EEF:</label>
        <input nz-input id="sessionName" [(ngModel)]="sessionName" placeholder="Nh\u1EADp t\xEAn phi\xEAn upload..." class="neon-input" [disabled]="savingSession">
      </div>
      <div class="action-group">
        <button nz-button nzType="primary" (click)="saveFaceDetectionSession()" class="glow-btn large-btn" [nzLoading]="savingSession" [disabled]="savingSession">
          <i nz-icon nzType="cloud-sync" *ngIf="!savingSession"></i> L\u01B0u tr\u1EEF l\xEAn Server
        </button>
      </div>
    </div>

    <!-- Progress display for API Firestore save notifications -->
    <div class="progress-bar-overlay" *ngIf="savingSession">
      <div class="progress-box">
        <nz-spin nzSimple nzSize="large"></nz-spin>
        <h3>{{ uploadProgressText }}</h3>
        <p class="realtime-badge"><i nz-icon nzType="sync" nzSpin></i> \u0110\u1ED3ng b\u1ED9 realtime qua Firebase Cloud Firestore...</p>
      </div>
    </div>
  </div>

  <!-- HISTORICAL MANAGEMENT LIST -->
  <div class="workspace-card history-panel">
    <tot-table 
      [data]="sessionsList" 
      [columns]="historyColumns" 
      [loading]="loadingSessions" 
      [nzSize]="'middle'"
      [frontPagination]="false"
      [total]="totalSessions"
      [pageIndex]="pageIndex"
      [pageSize]="pageSize"
      (queryParamsChange)="onQueryParamsChange($event)"
      [title]="tableTitleTpl"
      [extra]="tableExtraTpl"
      class="glass-table"
    >
      <ng-template totCell="name" let-data>
        <div *ngIf="!data.isEditing" class="session-name-view">
          <span class="s-name">{{ data.name }}</span>
          <button nz-button nzType="text" (click)="inlineRenameSession(data)" class="edit-btn">
            <i nz-icon nzType="edit"></i>
          </button>
        </div>
        <div *ngIf="data.isEditing" class="session-name-edit">
          <input nz-input [(ngModel)]="data.tempName" class="table-input">
          <button nz-button nzType="primary" nzSize="small" (click)="saveInlineRename(data)"><i nz-icon nzType="check"></i></button>
          <button nz-button nzType="default" nzSize="small" (click)="cancelInlineRename(data)"><i nz-icon nzType="close"></i></button>
        </div>
      </ng-template>

      <ng-template totCell="createdAt" let-data>
        {{ data.createdAt | date:'dd/MM/yyyy HH:mm:ss' }}
      </ng-template>

      <ng-template totCell="createdBy" let-data>
        {{ data.createdBy }}
      </ng-template>

      <ng-template totCell="imageCount" let-data>
        <nz-tag nzColor="geekblue">{{ data.imageCount }} \u1EA3nh g\u1ED1c</nz-tag>
      </ng-template>

      <ng-template totCell="action" let-data>
        <div class="action-buttons-group flex-vertical-stack">
          <tot-button nzType="primary" nzSize="small" (click)="openSessionDetails(data)" class="glow-btn full-width">
            <i nz-icon nzType="eye"></i> Xem Chi Ti\u1EBFt
          </tot-button>
          <tot-button nzType="default" [nzDanger]="true" nzSize="small" (click)="deleteSession(data, $event)" class="danger-btn full-width">
            <i nz-icon nzType="delete"></i> X\xF3a
          </tot-button>
        </div>
      </ng-template>
    </tot-table>

    <ng-template #tableTitleTpl>
      <span class="card-title" style="color: #fff; font-size: 16px; font-weight: 600;"><i nz-icon nzType="history"></i> L\u1ECBch S\u1EED C\xE1c Phi\xEAn Upload</span>
    </ng-template>

    <ng-template #tableExtraTpl>
      <button nz-button nzType="default" (click)="loadSessionsHistory()" class="glass-btn" [nzLoading]="loadingSessions">
        <i nz-icon nzType="reload"></i> L\xE0m m\u1EDBi l\u1ECBch s\u1EED
      </button>
    </ng-template>
  </div>

  <!-- DETAILED MODAL LAYOUT -->
  <nz-modal [(nzVisible)]="showDetailsModal" 
            [nzTitle]="'S\u01A1 \u0111\u1ED3 chi ti\u1EBFt phi\xEAn: ' + (selectedSessionDetails?.name || '')" 
            [nzWidth]="900" 
            (nzOnCancel)="closeDetailsModal()" 
            [nzFooter]="null"
            class="premium-modal">
    <div *nzModalContent class="modal-content-wrapper">
      <div *ngIf="loadingDetails" class="modal-spinner">
        <nz-spin nzSimple nzSize="large"></nz-spin>
        <p>\u0110ang t\u1EA3i c\u1EA5u tr\xFAc t\u1EC7p t\u1EEB server...</p>
      </div>

      <div *ngIf="!loadingDetails && selectedSessionDetails" class="modal-body custom-scrollbar">
        <div *ngFor="let img of selectedSessionDetails.images" class="details-image-card">
          <div class="img-card-header">
            <div class="img-meta">
              <span class="file-name"><i nz-icon nzType="file-image"></i> {{ img.fileName }}</span>
              <nz-tag nzColor="blue">K\xEDch th\u01B0\u1EDBc: {{ formatBytes(img.size) }}</nz-tag>
              <span class="upload-time">{{ img.createdAt | date:'dd/MM/yyyy HH:mm:ss' }}</span>
            </div>
            <button nz-button nzType="default" nzDanger nzSize="small" (click)="deleteDetailOriginalImage(img)" class="glass-danger-btn">
              <i nz-icon nzType="delete"></i> X\xF3a \u1EA3nh g\u1ED1c & crops
            </button>
          </div>

          <div class="img-body-layout">
            <!-- Original image preview -->
            <div class="original-image-preview">
              <img [src]="img.url" alt="original-img" class="detail-main-img">
            </div>

            <!-- Cropped faces panel inside details -->
            <div class="cropped-faces-detail-panel">
              <h4>Khu\xF4n m\u1EB7t \u0111\xE3 tr\xEDch xu\u1EA5t ({{ img.croppedFaces.length }})</h4>
              
              <div *ngIf="img.croppedFaces.length === 0" class="no-crops-placeholder">
                Kh\xF4ng c\xF3 khu\xF4n m\u1EB7t n\xE0o \u0111\u01B0\u1EE3c l\u01B0u trong t\u1EC7p \u1EA3nh n\xE0y
              </div>

              <div class="detail-crops-grid">
                <div *ngFor="let face of img.croppedFaces" class="detail-crop-avatar-card">
                  <div class="avatar-img-box">
                    <img [src]="face.url" alt="crop-face">
                    <button nz-button nzType="text" nzDanger (click)="deleteDetailCroppedFace(face, img)" class="delete-avatar-btn" nz-tooltip nzTooltipTitle="X\xF3a \u1EA3nh khu\xF4n m\u1EB7t crop n\xE0y">
                      <i nz-icon nzType="close-circle" nzTheme="fill"></i>
                    </button>
                  </div>
                  <div class="avatar-meta">
                    <span>Bounding Box:</span>
                    <span class="bbox-json">{{ face.boundingBox }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nz-modal>
</div>
`, styles: ['@import "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap";\n\n/* projects/tot/nhan-dien-khuon-mat/src/lib/nhan-dien-khuon-mat.component.css */\n:host {\n  display: block;\n  font-family:\n    "Outfit",\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n  color: #E2E8F0;\n  background-color: #0F172A;\n  min-height: 100vh;\n  padding: 24px;\n}\n.face-recognition-container {\n  max-width: 1400px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.workspace-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  padding-bottom: 20px;\n}\n.gradient-title {\n  font-size: 2.2rem;\n  font-weight: 700;\n  margin: 0;\n  background:\n    linear-gradient(\n      135deg,\n      #38BDF8 0%,\n      #818CF8 50%,\n      #C084FC 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  filter: drop-shadow(0 2px 10px rgba(56, 189, 248, 0.15));\n}\n.subtitle {\n  font-size: 0.95rem;\n  color: #94A3B8;\n  margin: 4px 0 0 0;\n}\n.workspace-card {\n  background: rgba(30, 41, 59, 0.65);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  overflow: hidden;\n}\n.workspace-card:hover {\n  border-color: rgba(56, 189, 248, 0.2);\n  box-shadow: 0 12px 40px 0 rgba(56, 189, 248, 0.08);\n}\n.card-header {\n  padding: 16px 20px;\n  background: rgba(15, 23, 42, 0.4);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.card-title {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #F8FAFC;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.dual-workspace-grid {\n  display: grid;\n  grid-template-columns: 420px 1fr;\n  gap: 24px;\n  height: 650px;\n}\n.left-side {\n  display: flex;\n  flex-direction: column;\n}\n.upload-options {\n  display: flex;\n  gap: 8px;\n}\n.drop-zone {\n  margin: 16px;\n  padding: 24px;\n  border: 2px dashed rgba(56, 189, 248, 0.3);\n  border-radius: 12px;\n  text-align: center;\n  cursor: pointer;\n  background: rgba(56, 189, 248, 0.02);\n  transition: all 0.25s ease;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.drop-zone:hover {\n  background: rgba(56, 189, 248, 0.06);\n  border-color: #38BDF8;\n  box-shadow: inset 0 0 12px rgba(56, 189, 248, 0.1);\n}\n.drop-icon {\n  font-size: 2rem;\n  color: #38BDF8;\n  margin-bottom: 8px;\n  filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.4));\n  animation: float 3s ease-in-out infinite;\n}\n.drop-text {\n  font-weight: 500;\n  color: #F1F5F9;\n  margin: 0;\n}\n.drop-subtext {\n  font-size: 0.8rem;\n  color: #64748B;\n  margin-top: 4px;\n}\n.queue-list-container {\n  flex: 1;\n  overflow-y: auto;\n  padding: 0 16px 16px 16px;\n}\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 250px;\n  color: #64748B;\n}\n.empty-icon {\n  font-size: 3rem;\n  margin-bottom: 12px;\n}\n.queue-item {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n  border-radius: 10px;\n  background: rgba(15, 23, 42, 0.3);\n  border: 1px solid rgba(255, 255, 255, 0.03);\n  margin-bottom: 10px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.queue-item:hover {\n  background: rgba(15, 23, 42, 0.6);\n  border-color: rgba(56, 189, 248, 0.2);\n  transform: translateY(-1px);\n}\n.queue-item.active {\n  background: rgba(56, 189, 248, 0.08);\n  border-color: rgba(56, 189, 248, 0.5);\n  box-shadow: 0 0 12px rgba(56, 189, 248, 0.08);\n}\n.item-thumb {\n  width: 50px;\n  height: 50px;\n  border-radius: 8px;\n  object-fit: cover;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.item-meta {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n}\n.item-name {\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: #E2E8F0;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.item-size {\n  font-size: 0.75rem;\n  color: #64748B;\n}\n.item-status {\n  display: flex;\n  align-items: center;\n}\n.remove-btn {\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n.queue-item:hover .remove-btn {\n  opacity: 1;\n}\n.right-side {\n  display: flex;\n  flex-direction: column;\n}\n.current-selected-file {\n  font-size: 0.85rem;\n  color: #38BDF8;\n  font-weight: 500;\n  background: rgba(56, 189, 248, 0.1);\n  padding: 4px 10px;\n  border-radius: 20px;\n  border: 1px solid rgba(56, 189, 248, 0.2);\n}\n.no-selection-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  flex: 1;\n  color: #64748B;\n}\n.large-icon {\n  font-size: 4rem;\n  margin-bottom: 16px;\n  opacity: 0.3;\n}\n.results-viewer {\n  flex: 1;\n  overflow-y: auto;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.canvas-panel-wrapper {\n  background: rgba(15, 23, 42, 0.4);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: 12px;\n  overflow: hidden;\n}\n.panel-header {\n  padding: 12px 16px;\n  background: rgba(15, 23, 42, 0.6);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-weight: 500;\n  font-size: 0.9rem;\n  color: #CBD5E1;\n}\n.select-option {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.toggle-label {\n  font-size: 0.8rem;\n  color: #94A3B8;\n}\n.image-viewport {\n  padding: 16px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #020617;\n  min-height: 250px;\n  max-height: 380px;\n}\n.canvas-container {\n  position: relative;\n  max-width: 100%;\n  max-height: 350px;\n  display: inline-block;\n}\n.canvas-main-img {\n  max-width: 100%;\n  max-height: 350px;\n  display: block;\n  border-radius: 6px;\n}\n.canvas-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n.neon-box {\n  position: absolute;\n  border: 2px solid #10B981;\n  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5), inset 0 0 10px rgba(16, 185, 129, 0.3);\n  pointer-events: auto;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.neon-box.active {\n  border-color: #38BDF8;\n  box-shadow: 0 0 12px rgba(56, 189, 248, 0.8), inset 0 0 12px rgba(56, 189, 248, 0.4);\n}\n.neon-box.inactive {\n  border-color: rgba(239, 68, 68, 0.6);\n  box-shadow: 0 0 8px rgba(239, 68, 68, 0.3);\n}\n.box-badge {\n  position: absolute;\n  top: -20px;\n  left: -2px;\n  background: #38BDF8;\n  color: #0F172A;\n  font-size: 0.65rem;\n  font-weight: 700;\n  padding: 1px 5px;\n  border-radius: 3px 3px 0 0;\n}\n.faces-crop-panel {\n  background: rgba(15, 23, 42, 0.4);\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: 12px;\n  overflow: hidden;\n  padding-bottom: 16px;\n}\n.empty-faces-crop {\n  text-align: center;\n  padding: 30px;\n  color: #64748B;\n}\n.crops-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));\n  gap: 16px;\n  padding: 16px;\n}\n.crop-card {\n  background: rgba(30, 41, 59, 0.8);\n  border: 1px solid rgba(255, 255, 255, 0.06);\n  border-radius: 10px;\n  overflow: hidden;\n  cursor: pointer;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.crop-card:hover {\n  transform: translateY(-2px);\n  border-color: rgba(56, 189, 248, 0.3);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\n}\n.crop-card.selected {\n  border-color: #38BDF8;\n  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);\n}\n.crop-image-wrapper {\n  position: relative;\n  aspect-ratio: 1;\n  background: #020617;\n}\n.crop-image-wrapper img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.3s ease;\n}\n.crop-card:hover .crop-image-wrapper img {\n  transform: scale(1.08);\n}\n.crop-index-badge {\n  position: absolute;\n  bottom: 6px;\n  left: 6px;\n  background: rgba(15, 23, 42, 0.85);\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n  color: #E2E8F0;\n  font-size: 0.7rem;\n  font-weight: 500;\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.checkmark-overlay {\n  position: absolute;\n  top: 6px;\n  right: 6px;\n  font-size: 1.25rem;\n  color: #38BDF8;\n  filter: drop-shadow(0 0 4px rgba(15, 23, 42, 0.8));\n}\n.crop-meta {\n  padding: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.bbox-coords {\n  font-size: 0.65rem;\n  color: #64748B;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.select-checkbox {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: #CBD5E1;\n}\n.save-session-panel {\n  padding: 20px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(30, 41, 59, 0.8) 0%,\n      rgba(15, 23, 42, 0.8) 100%);\n  position: relative;\n}\n.save-form {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n  flex-wrap: wrap;\n}\n.input-group {\n  flex: 1;\n  min-width: 300px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.input-group label {\n  font-weight: 600;\n  color: #94A3B8;\n}\n.neon-input {\n  background: rgba(15, 23, 42, 0.6) !important;\n  border: 1px solid rgba(56, 189, 248, 0.2) !important;\n  color: #F8FAFC !important;\n  border-radius: 8px !important;\n  padding: 10px 14px !important;\n  transition: all 0.3s ease !important;\n}\n.neon-input:focus {\n  border-color: #38BDF8 !important;\n  box-shadow: 0 0 10px rgba(56, 189, 248, 0.25) !important;\n}\n.progress-bar-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(15, 23, 42, 0.92);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 10;\n}\n.progress-box {\n  text-align: center;\n}\n.progress-box h3 {\n  margin-top: 16px;\n  color: #38BDF8;\n  font-size: 1.1rem;\n}\n.realtime-badge {\n  font-size: 0.8rem;\n  color: #818CF8;\n}\n.glow-btn {\n  background:\n    linear-gradient(\n      135deg,\n      #0284C7 0%,\n      #4F46E5 100%) !important;\n  border: none !important;\n  color: white !important;\n  font-weight: 600 !important;\n  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.25) !important;\n  transition: all 0.3s ease !important;\n}\n.glow-btn:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4) !important;\n}\n.glow-btn.large-btn {\n  padding: 12px 28px !important;\n  height: auto !important;\n  font-size: 1rem !important;\n  border-radius: 8px !important;\n}\n.glass-btn {\n  background: rgba(255, 255, 255, 0.04) !important;\n  border: 1px solid rgba(255, 255, 255, 0.08) !important;\n  color: #CBD5E1 !important;\n  font-weight: 500 !important;\n  transition: all 0.2s ease !important;\n}\n.glass-btn:hover {\n  background: rgba(255, 255, 255, 0.08) !important;\n  color: white !important;\n}\n.danger-btn {\n  background: rgba(239, 68, 68, 0.1) !important;\n  border: 1px solid rgba(239, 68, 68, 0.2) !important;\n  color: #EF4444 !important;\n  font-weight: 500 !important;\n}\n.danger-btn:hover {\n  background: #EF4444 !important;\n  color: white !important;\n}\n.history-panel {\n  padding: 20px;\n}\n.glass-table {\n  background: transparent !important;\n}\n::ng-deep .glass-table .ant-table {\n  background: transparent !important;\n  color: #E2E8F0 !important;\n}\n::ng-deep .glass-table .ant-table-thead > tr > th {\n  background: rgba(15, 23, 42, 0.8) !important;\n  color: #94A3B8 !important;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n  font-weight: 600 !important;\n  font-size: 0.85rem !important;\n  text-transform: uppercase;\n}\n::ng-deep .glass-table .ant-table-tbody > tr > td {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;\n  background: transparent !important;\n}\n::ng-deep .glass-table .ant-table-tbody > tr:hover > td {\n  background: rgba(255, 255, 255, 0.02) !important;\n}\n.session-name-view {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.s-name {\n  font-weight: 600;\n  color: #F1F5F9;\n}\n.edit-btn {\n  color: #64748B;\n  padding: 0 4px;\n}\n.edit-btn:hover {\n  color: #38BDF8;\n}\n.session-name-edit {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.table-input {\n  background: #0F172A !important;\n  border: 1px solid rgba(255, 255, 255, 0.1) !important;\n  color: white !important;\n  font-size: 0.9rem !important;\n}\n.action-buttons-group {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n}\n::ng-deep .premium-modal .ant-modal-content {\n  background: #0F172A !important;\n  border: 1px solid rgba(255, 255, 255, 0.08) !important;\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5) !important;\n  border-radius: 16px !important;\n  color: #E2E8F0 !important;\n}\n::ng-deep .premium-modal .ant-modal-header {\n  background: rgba(15, 23, 42, 0.8) !important;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n  border-radius: 16px 16px 0 0 !important;\n}\n::ng-deep .premium-modal .ant-modal-title {\n  color: #F8FAFC !important;\n  font-weight: 700 !important;\n  font-size: 1.2rem !important;\n}\n::ng-deep .premium-modal .ant-modal-close-icon {\n  color: #94A3B8 !important;\n}\n::ng-deep .premium-modal .ant-modal-close-icon:hover {\n  color: white !important;\n}\n.modal-content-wrapper {\n  padding: 24px 0;\n}\n.modal-spinner {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n  padding: 40px;\n  color: #64748B;\n}\n.modal-body {\n  max-height: 550px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding: 0 24px;\n}\n.details-image-card {\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  background: rgba(15, 23, 42, 0.4);\n  border-radius: 12px;\n  overflow: hidden;\n}\n.img-card-header {\n  padding: 12px 16px;\n  background: rgba(15, 23, 42, 0.7);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.img-meta {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.file-name {\n  font-weight: 600;\n  color: #F1F5F9;\n}\n.upload-time {\n  font-size: 0.8rem;\n  color: #64748B;\n}\n.glass-danger-btn {\n  background: rgba(239, 68, 68, 0.05) !important;\n  border: 1px solid rgba(239, 68, 68, 0.15) !important;\n  color: #EF4444 !important;\n  transition: all 0.2s ease !important;\n}\n.glass-danger-btn:hover {\n  background: #EF4444 !important;\n  color: white !important;\n}\n.img-body-layout {\n  padding: 16px;\n  display: grid;\n  grid-template-columns: 200px 1fr;\n  gap: 20px;\n}\n.original-image-preview {\n  border-radius: 8px;\n  overflow: hidden;\n  background: #020617;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 180px;\n}\n.detail-main-img {\n  max-width: 100%;\n  max-height: 100%;\n  object-fit: contain;\n}\n.cropped-faces-detail-panel {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.cropped-faces-detail-panel h4 {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #CBD5E1;\n}\n.no-crops-placeholder {\n  color: #64748B;\n  font-style: italic;\n  font-size: 0.85rem;\n}\n.detail-crops-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));\n  gap: 12px;\n}\n.detail-crop-avatar-card {\n  background: rgba(15, 23, 42, 0.5);\n  border: 1px solid rgba(255, 255, 255, 0.04);\n  border-radius: 8px;\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n  padding: 8px;\n}\n.avatar-img-box {\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n  overflow: hidden;\n  margin: 0 auto 8px auto;\n  position: relative;\n  border: 2px solid rgba(56, 189, 248, 0.2);\n  transition: transform 0.2s ease;\n}\n.detail-crop-avatar-card:hover .avatar-img-box {\n  transform: scale(1.05);\n  border-color: #38BDF8;\n}\n.avatar-img-box img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.delete-avatar-btn {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(15, 23, 42, 0.6) !important;\n  opacity: 0;\n  transition: opacity 0.2s ease !important;\n  border: none !important;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 50%;\n  font-size: 1.5rem !important;\n}\n.avatar-img-box:hover .delete-avatar-btn {\n  opacity: 1;\n}\n.avatar-meta {\n  display: flex;\n  flex-direction: column;\n  font-size: 0.65rem;\n  color: #64748B;\n}\n.bbox-json {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-family: monospace;\n}\n.custom-scrollbar::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scrollbar::-webkit-scrollbar-track {\n  background: rgba(15, 23, 42, 0.2);\n}\n.custom-scrollbar::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.08);\n  border-radius: 4px;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb:hover {\n  background: rgba(56, 189, 248, 0.3);\n}\n@keyframes float {\n  0% {\n    transform: translateY(0px);\n  }\n  50% {\n    transform: translateY(-4px);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\n.flex-vertical-stack {\n  display: flex !important;\n  flex-direction: column !important;\n  gap: 6px !important;\n  align-items: stretch !important;\n  width: 100%;\n  padding: 4px 0;\n}\n.flex-vertical-stack tot-button {\n  width: 100% !important;\n}\n.full-width {\n  width: 100% !important;\n}\n::ng-deep .glass-table .ant-table-cell {\n  white-space: normal !important;\n  word-break: break-word !important;\n}\n/*# sourceMappingURL=nhan-dien-khuon-mat.component.css.map */\n'] }]
  }], null, { fileInput: [{
    type: ViewChild,
    args: ["fileInput"]
  }], folderInput: [{
    type: ViewChild,
    args: ["folderInput"]
  }], canvasContainer: [{
    type: ViewChild,
    args: ["canvasContainer"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NhanDienKhuonMatComponent, { className: "NhanDienKhuonMatComponent", filePath: "projects/tot/nhan-dien-khuon-mat/src/lib/nhan-dien-khuon-mat.component.ts", lineNumber: 60 });
})();

export {
  provideNhanDienKhuonMat,
  NhanDienKhuonMatService,
  NhanDienKhuonMatComponent
};
//# sourceMappingURL=chunk-GUCJZTKE.js.map
