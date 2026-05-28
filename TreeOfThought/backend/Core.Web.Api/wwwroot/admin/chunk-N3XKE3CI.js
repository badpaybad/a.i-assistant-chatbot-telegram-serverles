import {
  CheckboxControlValueAccessor,
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
  NzButtonModule,
  NzCardComponent,
  NzCardModule,
  NzColDirective,
  NzConfigService,
  NzGridModule,
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
  NzRowDirective,
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
} from "./chunk-LQBQWILW.js";
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
  ɵɵpureFunction0,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-WZGQWE45.js";
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
  saveSession(sessionId, sessionName, originalFile, croppedFiles, boundingBoxes, callback) {
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
    return this.http.post("/api/face-detection/save", formData, callback);
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
var _c2 = () => [12, 12];
function NhanDienKhuonMatComponent_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38)(1, "label", 39)(2, "input", 40);
    \u0275\u0275twoWayListener("ngModelChange", function NhanDienKhuonMatComponent_ng_template_33_Template_input_ngModelChange_2_listener($event) {
      const data_r3 = \u0275\u0275restoreView(_r2).$implicit;
      \u0275\u0275twoWayBindingSet(data_r3.selected, $event) || (data_r3.selected = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function NhanDienKhuonMatComponent_ng_template_33_Template_input_change_2_listener() {
      const data_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleOriginalSelection(data_r3));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "span", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "img", 42);
    \u0275\u0275elementStart(5, "span", 43);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", data_r3.selected);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", data_r3.thumbnailUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("nzTooltipTitle", data_r3.name);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r3.name);
  }
}
function NhanDienKhuonMatComponent_ng_template_34_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275element(1, "i", 51);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u0110ang ph\xE2n t\xEDch khu\xF4n m\u1EB7t... ", data_r5.progress, "%");
  }
}
function NhanDienKhuonMatComponent_ng_template_34_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1, "\u0110ang ch\u1EDD qu\xE9t...");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_ng_template_34_nz_tag_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 53);
    \u0275\u0275text(1, "L\u1ED7i x\u1EED l\xFD t\u1EC7p");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_ng_template_34_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275element(1, "i", 55);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Kh\xF4ng c\xF3 \u1EA3nh khu\xF4n m\u1EB7t");
    \u0275\u0275elementEnd()();
  }
}
function NhanDienKhuonMatComponent_ng_template_34_div_5_div_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275element(1, "i", 63);
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_ng_template_34_div_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_34_div_5_div_1_Template_div_click_0_listener() {
      const face_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const data_r5 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleFaceSelection(data_r5, face_r7));
    });
    \u0275\u0275element(1, "img", 59);
    \u0275\u0275template(2, NhanDienKhuonMatComponent_ng_template_34_div_5_div_1_div_2_Template, 2, 0, "div", 60);
    \u0275\u0275elementStart(3, "div", 61);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const face_r7 = ctx.$implicit;
    const idx_r8 = ctx.index;
    \u0275\u0275classProp("selected", face_r7.selected);
    \u0275\u0275property("nzTooltipTitle", "M\u1EB7t #" + (idx_r8 + 1) + " - T\u1ECDa \u0111\u1ED9: [" + face_r7.boundingBox.x + "," + face_r7.boundingBox.y + "]");
    \u0275\u0275advance();
    \u0275\u0275property("src", face_r7.croppedUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", face_r7.selected);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", idx_r8 + 1);
  }
}
function NhanDienKhuonMatComponent_ng_template_34_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275template(1, NhanDienKhuonMatComponent_ng_template_34_div_5_div_1_Template, 5, 6, "div", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", data_r5.detectedFaces);
  }
}
function NhanDienKhuonMatComponent_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44);
    \u0275\u0275template(1, NhanDienKhuonMatComponent_ng_template_34_div_1_Template, 4, 1, "div", 45)(2, NhanDienKhuonMatComponent_ng_template_34_span_2_Template, 2, 0, "span", 46)(3, NhanDienKhuonMatComponent_ng_template_34_nz_tag_3_Template, 2, 0, "nz-tag", 47)(4, NhanDienKhuonMatComponent_ng_template_34_div_4_Template, 4, 0, "div", 48)(5, NhanDienKhuonMatComponent_ng_template_34_div_5_Template, 2, 1, "div", 49);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r5.status === "Scanning");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r5.status === "Waiting");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r5.status === "Error");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r5.status === "NoFace");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r5.status === "Success" && data_r5.detectedFaces.length > 0);
  }
}
function NhanDienKhuonMatComponent_ng_template_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 64);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("/work/", data_r9.name);
  }
}
function NhanDienKhuonMatComponent_ng_template_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 65);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_36_Template_tot_button_click_0_listener($event) {
      const data_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.removeQueueItem(data_r11, $event));
    });
    \u0275\u0275element(1, "i", 66);
    \u0275\u0275text(2, " X\xF3a ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("nzDanger", true);
  }
}
function NhanDienKhuonMatComponent_ng_template_37_nz_tag_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 70);
    \u0275\u0275element(1, "i", 71);
    \u0275\u0275text(2, " \u0110ang t\u1EA3i MediaPipe AI... ");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_ng_template_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275element(1, "i", 68);
    \u0275\u0275text(2, " Danh s\xE1ch file c\u1EE7a phi\xEAn \u0111ang l\xE0m vi\u1EC7c ");
    \u0275\u0275template(3, NhanDienKhuonMatComponent_ng_template_37_nz_tag_3_Template, 3, 0, "nz-tag", 69);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r3.loadingDetector);
  }
}
function NhanDienKhuonMatComponent_ng_template_39_tot_button_0_i_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 75);
  }
}
function NhanDienKhuonMatComponent_ng_template_39_tot_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 73);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_39_tot_button_0_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.saveFaceDetectionSession());
    });
    \u0275\u0275template(1, NhanDienKhuonMatComponent_ng_template_39_tot_button_0_i_1_Template, 1, 0, "i", 74);
    \u0275\u0275text(2, " L\u01B0u phi\xEAn l\xE0m vi\u1EC7c ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("loading", ctx_r3.savingSession)("disabled", ctx_r3.savingSession);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r3.savingSession);
  }
}
function NhanDienKhuonMatComponent_ng_template_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NhanDienKhuonMatComponent_ng_template_39_tot_button_0_Template, 3, 3, "tot-button", 72);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("ngIf", ctx_r3.queue.length > 0);
  }
}
function NhanDienKhuonMatComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76)(1, "div", 77);
    \u0275\u0275element(2, "nz-spin", 78);
    \u0275\u0275elementStart(3, "h3", 79);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 80);
    \u0275\u0275element(6, "i", 81);
    \u0275\u0275text(7, " \u0110\u1ED3ng b\u1ED9 realtime qua Firebase Cloud Firestore...");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.uploadProgressText);
  }
}
function NhanDienKhuonMatComponent_ng_template_44_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 84)(1, "span", 85);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "tot-button", 86);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_44_div_0_Template_tot_button_click_3_listener() {
      \u0275\u0275restoreView(_r13);
      const data_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.inlineRenameSession(data_r14));
    });
    \u0275\u0275element(4, "i", 87);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r14.name);
  }
}
function NhanDienKhuonMatComponent_ng_template_44_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 88)(1, "input", 89);
    \u0275\u0275twoWayListener("ngModelChange", function NhanDienKhuonMatComponent_ng_template_44_div_1_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r15);
      const data_r14 = \u0275\u0275nextContext().$implicit;
      \u0275\u0275twoWayBindingSet(data_r14.tempName, $event) || (data_r14.tempName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "tot-button", 90);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_44_div_1_Template_tot_button_click_2_listener() {
      \u0275\u0275restoreView(_r15);
      const data_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.saveInlineRename(data_r14));
    });
    \u0275\u0275element(3, "i", 91);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "tot-button", 92);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_44_div_1_Template_tot_button_click_4_listener() {
      \u0275\u0275restoreView(_r15);
      const data_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.cancelInlineRename(data_r14));
    });
    \u0275\u0275element(5, "i", 93);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", data_r14.tempName);
  }
}
function NhanDienKhuonMatComponent_ng_template_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NhanDienKhuonMatComponent_ng_template_44_div_0_Template, 5, 1, "div", 82)(1, NhanDienKhuonMatComponent_ng_template_44_div_1_Template, 6, 1, "div", 83);
  }
  if (rf & 2) {
    const data_r14 = ctx.$implicit;
    \u0275\u0275property("ngIf", !data_r14.isEditing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", data_r14.isEditing);
  }
}
function NhanDienKhuonMatComponent_ng_template_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 94);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", data_r16.imageCount, " \u1EA3nh g\u1ED1c");
  }
}
function NhanDienKhuonMatComponent_ng_template_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 95);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r17 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", data_r17.faceCount, " khu\xF4n m\u1EB7t");
  }
}
function NhanDienKhuonMatComponent_ng_template_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 96)(1, "tot-button", 90);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_47_Template_tot_button_click_1_listener() {
      const data_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openSessionDetails(data_r19));
    });
    \u0275\u0275element(2, "i", 97);
    \u0275\u0275text(3, " Xem Chi Ti\u1EBFt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "tot-button", 98);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_47_Template_tot_button_click_4_listener($event) {
      const data_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.deleteSession(data_r19, $event));
    });
    \u0275\u0275element(5, "i", 66);
    \u0275\u0275text(6, " X\xF3a ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275property("nzDanger", true);
  }
}
function NhanDienKhuonMatComponent_ng_template_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275element(1, "i", 99);
    \u0275\u0275text(2, " L\u1ECBch S\u1EED C\xE1c Phi\xEAn Upload");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_ng_template_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 100);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_50_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.loadSessionsHistory());
    });
    \u0275\u0275element(1, "i", 101);
    \u0275\u0275text(2, " L\xE0m m\u1EDBi l\u1ECBch s\u1EED ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("loading", ctx_r3.loadingSessions);
  }
}
function NhanDienKhuonMatComponent_div_53_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 105);
    \u0275\u0275element(1, "nz-spin", 78);
    \u0275\u0275elementStart(2, "p", 106);
    \u0275\u0275text(3, "\u0110ang t\u1EA3i c\u1EA5u tr\xFAc t\u1EC7p t\u1EEB server...");
    \u0275\u0275elementEnd()();
  }
}
function NhanDienKhuonMatComponent_div_53_div_2_div_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 125);
    \u0275\u0275text(1, " Kh\xF4ng c\xF3 khu\xF4n m\u1EB7t n\xE0o \u0111\u01B0\u1EE3c l\u01B0u trong t\u1EC7p \u1EA3nh n\xE0y ");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_div_53_div_2_div_1_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 126)(1, "div", 127)(2, "div", 128);
    \u0275\u0275element(3, "img", 129);
    \u0275\u0275elementStart(4, "tot-button", 130);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_div_53_div_2_div_1_div_25_Template_tot_button_click_4_listener() {
      const face_r24 = \u0275\u0275restoreView(_r23).$implicit;
      const img_r22 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.deleteDetailCroppedFace(face_r24, img_r22));
    });
    \u0275\u0275element(5, "i", 131);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 132)(7, "span", 133);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const face_r24 = ctx.$implicit;
    \u0275\u0275property("nzXs", 12)("nzSm", 8)("nzMd", 6);
    \u0275\u0275advance(3);
    \u0275\u0275property("src", face_r24.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("nzDanger", true);
    \u0275\u0275advance(3);
    \u0275\u0275property("nzTooltipTitle", face_r24.boundingBox);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("BBox: ", face_r24.boundingBox);
  }
}
function NhanDienKhuonMatComponent_div_53_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 109)(1, "div", 110)(2, "div", 111)(3, "span", 112);
    \u0275\u0275element(4, "i", 113);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "nz-tag", 114);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 115);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 111)(12, "tot-button", 98);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_div_53_div_2_div_1_Template_tot_button_click_12_listener() {
      const img_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.deleteDetailOriginalImage(img_r22));
    });
    \u0275\u0275element(13, "i", 66);
    \u0275\u0275text(14, " X\xF3a \u1EA3nh g\u1ED1c & crops ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 116)(16, "div", 117)(17, "div", 118);
    \u0275\u0275element(18, "img", 119);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 120)(20, "div", 121)(21, "h4", 122);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, NhanDienKhuonMatComponent_div_53_div_2_div_1_div_23_Template, 2, 0, "div", 123);
    \u0275\u0275elementStart(24, "div", 116);
    \u0275\u0275template(25, NhanDienKhuonMatComponent_div_53_div_2_div_1_div_25_Template, 9, 7, "div", 124);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const img_r22 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("nzJustify", "space-between")("nzAlign", "middle");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", img_r22.fileName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("K\xEDch th\u01B0\u1EDBc: ", ctx_r3.formatBytes(img_r22.size));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 16, img_r22.createdAt, "dd/MM/yyyy HH:mm:ss"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzDanger", true);
    \u0275\u0275advance(3);
    \u0275\u0275property("nzGutter", 24);
    \u0275\u0275advance();
    \u0275\u0275property("nzXs", 24)("nzMd", 8);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", img_r22.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("nzXs", 24)("nzMd", 16);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Khu\xF4n m\u1EB7t \u0111\xE3 tr\xEDch xu\u1EA5t (", img_r22.croppedFaces.length, ")");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", img_r22.croppedFaces.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("nzGutter", \u0275\u0275pureFunction0(19, _c2));
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", img_r22.croppedFaces);
  }
}
function NhanDienKhuonMatComponent_div_53_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 107);
    \u0275\u0275template(1, NhanDienKhuonMatComponent_div_53_div_2_div_1_Template, 26, 20, "div", 108);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.selectedSessionDetails.images);
  }
}
function NhanDienKhuonMatComponent_div_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 102);
    \u0275\u0275template(1, NhanDienKhuonMatComponent_div_53_div_1_Template, 4, 0, "div", 103)(2, NhanDienKhuonMatComponent_div_53_div_2_Template, 2, 1, "div", 104);
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
    this.message = inject(NzMessageService);
    this.modal = inject(NzModalService);
    this.sessionId = crypto.randomUUID();
    this.sessionName = "";
    this.queue = [];
    this.loadingDetector = false;
    this.detectorReady = false;
    this.faceDetector = null;
    this.savingSession = false;
    this.uploadTrackingId = null;
    this.uploadProgressText = "";
    this.activePageIndex = 1;
    this.activePageSize = 5;
    this.activeColumns = [];
    this.sessionsList = [];
    this.loadingSessions = false;
    this.historyColumns = [];
    this.totalSessions = 0;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.selectedSessionDetails = null;
    this.loadingDetails = false;
    this.showDetailsModal = false;
  }
  get paginatedQueue() {
    const start = (this.activePageIndex - 1) * this.activePageSize;
    return this.queue.slice(start, start + this.activePageSize);
  }
  ngOnInit() {
    this.setDefaultSessionName();
    this.initColumns();
    this.loadSessionsHistory();
    this.initMediaPipe();
  }
  initColumns() {
    this.activeColumns = [
      { title: "T\xEAn file", key: "name", width: "30%" },
      { title: "Khu\xF4n m\u1EB7t trong \u1EA3nh", key: "detectedFaces", width: "40%" },
      { title: "\u0110\u01B0\u1EDDng d\u1EABn file", key: "simulatedPath", width: "20%" },
      { title: "H\xE0nh \u0111\u1ED9ng", key: "action", width: "10%", align: "center" }
    ];
    this.historyColumns = [
      { title: "T\xEAn phi\xEAn", key: "name" },
      { title: "S\u1ED1 l\u01B0\u1EE3ng \u1EA3nh", key: "imageCount", width: "150px" },
      { title: "S\u1ED1 l\u01B0\u1EE3ng khu\xF4n m\u1EB7t", key: "faceCount", width: "200px" },
      { title: "H\xE0nh \u0111\u1ED9ng", key: "action", width: "200px", right: true }
    ];
  }
  ngOnDestroy() {
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
  onFileDrop(event) {
    var _a, _b;
    event.preventDefault();
    if ((_a = event.dataTransfer) == null ? void 0 : _a.items) {
      const files = [];
      const items = Array.from(event.dataTransfer.items);
      const promises = items.map((item) => {
        const entry = item.webkitGetAsEntry();
        if (entry && entry.isFile) {
          return new Promise((resolve) => {
            entry.file((f) => {
              if (f.type.startsWith("image/")) {
                files.push(f);
              }
              resolve();
            }, () => resolve());
          });
        }
        return Promise.resolve();
      });
      Promise.all(promises).then(() => {
        if (files.length > 0) {
          this.addFilesToQueue(files);
        } else {
          this.message.warning("Kh\xF4ng t\xECm th\u1EA5y t\u1EC7p \u1EA3nh n\xE0o h\u1EE3p l\u1EC7.");
        }
      });
    } else if ((_b = event.dataTransfer) == null ? void 0 : _b.files) {
      this.addFilesToQueue(Array.from(event.dataTransfer.files));
    }
  }
  onFolderDrop(event) {
    var _a;
    event.preventDefault();
    if ((_a = event.dataTransfer) == null ? void 0 : _a.items) {
      const files = [];
      const items = Array.from(event.dataTransfer.items);
      const traversePromises = items.map((item) => {
        const entry = item.webkitGetAsEntry();
        if (entry) {
          return this.traverseEntryRecursive(entry, files);
        }
        return Promise.resolve();
      });
      Promise.all(traversePromises).then(() => {
        if (files.length > 0) {
          this.addFilesToQueue(files);
        } else {
          this.message.warning("Kh\xF4ng t\xECm th\u1EA5y t\u1EC7p \u1EA3nh n\xE0o trong th\u01B0 m\u1EE5c \u0111\u01B0\u1EE3c k\xE9o th\u1EA3.");
        }
      });
    }
  }
  async traverseEntryRecursive(entry, fileList) {
    if (entry.isFile) {
      const file = await new Promise((resolve, reject) => {
        entry.file(resolve, reject);
      });
      if (file.type.startsWith("image/")) {
        fileList.push(file);
      }
    } else if (entry.isDirectory) {
      const reader = entry.createReader();
      const entries = await new Promise((resolve, reject) => {
        reader.readEntries(resolve, reject);
      });
      for (const childEntry of entries) {
        await this.traverseEntryRecursive(childEntry, fileList);
      }
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
  toggleFaceSelection(item, face) {
    face.selected = !face.selected;
  }
  toggleOriginalSelection(item) {
    item.selected = !item.selected;
  }
  removeQueueItem(item, event) {
    event.stopPropagation();
    URL.revokeObjectURL(item.thumbnailUrl);
    item.detectedFaces.forEach((f) => URL.revokeObjectURL(f.croppedUrl));
    this.queue = this.queue.filter((i) => i.id !== item.id);
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
        await new Promise(async (resolve, reject) => {
          try {
            const result = await this.api.saveSession(this.sessionId, this.sessionName, item.file, croppedFiles, bboxes, (data) => {
              if (data.status === "Completed") {
                resolve();
              } else if (data.status === "Error") {
                reject(new Error(data.message || "X\u1EED l\xFD l\u01B0u tr\u1EEF th\u1EA5t b\u1EA1i."));
              }
            });
            if (result && result.trackingId) {
              this.uploadTrackingId = result.trackingId;
            }
          } catch (err) {
            reject(err);
          }
        });
      }
      this.message.success("T\u1EA3i l\xEAn to\xE0n b\u1ED9 t\u1EC7p th\xE0nh c\xF4ng!");
      this.completeSessionSave();
    } catch (error) {
      console.error("[Save Session] API Failed: ", error);
      this.message.error(error.message || ((_a = error.error) == null ? void 0 : _a.message) || "L\u1ED7i k\u1EBFt n\u1ED1i ho\u1EB7c x\u1EED l\xFD ph\xEDa m\xE1y ch\u1EE7.");
      this.savingSession = false;
      this.uploadTrackingId = null;
      this.loadSessionsHistory();
    }
  }
  completeSessionSave() {
    this.savingSession = false;
    this.uploadTrackingId = null;
    this.resetWorkspace();
    this.loadSessionsHistory();
  }
  resetWorkspace() {
    this.queue.forEach((item) => URL.revokeObjectURL(item.thumbnailUrl));
    this.queue = [];
    this.sessionId = crypto.randomUUID();
    this.activePageIndex = 1;
    this.setDefaultSessionName();
    this.message.info("Kh\xF4ng gian l\xE0m vi\u1EC7c \u0111\xE3 \u0111\u01B0\u1EE3c reset.");
  }
  // --- Historical Sessions & Actions ---
  async loadSessionsHistory() {
    try {
      this.loadingSessions = true;
      const result = await this.api.getSessions(this.pageIndex, this.pageSize);
      this.sessionsList = (result == null ? void 0 : result.items) || [];
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
    this.showDetailsModal = true;
    try {
      const details = await this.api.getSessionDetails(session.id);
      this.selectedSessionDetails = details;
    } catch (error) {
      this.message.error("L\u1ED7i khi t\u1EA3i chi ti\u1EBFt phi\xEAn upload.");
      this.showDetailsModal = false;
      this.selectedSessionDetails = null;
    } finally {
      this.loadingDetails = false;
    }
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
    \u0275\u0275viewQuery(_c02, 5)(_c1, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInput = _t.first);
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.folderInput = _t.first);
  }
}, decls: 54, vars: 38, consts: [["fileInput", ""], ["folderInput", ""], ["activeTableTitleTpl", ""], ["activeTableExtraTpl", ""], ["tableTitleTpl", ""], ["tableExtraTpl", ""], [1, "face-recognition-container"], [1, "workspace-header", 2, "margin-bottom", "24px", "border-bottom", "1px solid #f0f0f0", "padding-bottom", "16px"], [1, "gradient-title", 2, "font-size", "24px", "font-weight", "600", "margin", "0", "color", "#262626"], ["nz-icon", "", "nzType", "scan", "nzTheme", "outline", 2, "color", "#1890ff", "margin-right", "8px"], [1, "subtitle", 2, "color", "#8c8c8c", "margin", "4px 0 0 0", "font-size", "13px"], ["nz-row", "", 2, "margin-bottom", "24px", 3, "nzGutter"], ["nz-col", "", 3, "nzXs", "nzLg"], ["nzTitle", "Nh\u1EADp t\xEAn phi\xEAn \u0111ang l\xE0m vi\u1EC7c", 2, "height", "100%", "border-radius", "8px", 3, "nzBordered"], ["nz-input", "", "placeholder", "Nh\u1EADp t\xEAn phi\xEAn l\xE0m vi\u1EC7c...", 2, "border-radius", "6px", 3, "ngModelChange", "ngModel", "disabled"], ["nz-col", "", 3, "nzXs", "nzMd", "nzLg"], [1, "dropzone-card", "file-zone", 2, "border", "2px dashed #1890ff", "border-radius", "8px", "padding", "20px", "text-align", "center", "cursor", "pointer", "background", "#fafafa", "height", "100%", "display", "flex", "flex-direction", "column", "justify-content", "center", "align-items", "center", "min-height", "116px", "transition", "background 0.3s", 3, "dragover", "drop", "click"], [1, "dropzone-content"], ["nz-icon", "", "nzType", "file-image", 1, "drop-icon", 2, "font-size", "28px", "color", "#1890ff", "margin-bottom", "8px"], [1, "drop-text", 2, "font-weight", "600", "margin", "0", "font-size", "14px", "color", "#262626"], [1, "drop-subtext", 2, "font-size", "12px", "color", "#8c8c8c", "display", "block", "margin-top", "4px"], ["type", "file", "multiple", "", 2, "display", "none", 3, "change"], [1, "dropzone-card", "folder-zone", 2, "border", "2px dashed #722ed1", "border-radius", "8px", "padding", "20px", "text-align", "center", "cursor", "pointer", "background", "#fafafa", "height", "100%", "display", "flex", "flex-direction", "column", "justify-content", "center", "align-items", "center", "min-height", "116px", "transition", "background 0.3s", 3, "dragover", "drop", "click"], ["nz-icon", "", "nzType", "folder-open", 1, "drop-icon", 2, "font-size", "28px", "color", "#722ed1", "margin-bottom", "8px"], ["type", "file", "webkitdirectory", "", "directory", "", "multiple", "", 2, "display", "none", 3, "change"], [2, "margin-bottom", "24px", "position", "relative"], [1, "active-session-table", 3, "pageIndexChange", "pageSizeChange", "data", "columns", "loading", "nzSize", "frontPagination", "showPagination", "total", "pageIndex", "pageSize", "title", "extra"], ["totCell", "name"], ["totCell", "detectedFaces"], ["totCell", "simulatedPath"], ["totCell", "action"], ["class", "progress-bar-overlay", "style", "position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255, 255, 255, 0.85); display: flex; justify-content: center; align-items: center; z-index: 10;", 4, "ngIf"], [1, "workspace-card", "history-panel", 2, "margin-bottom", "24px"], [3, "pageIndexChange", "pageSizeChange", "data", "columns", "loading", "nzSize", "frontPagination", "total", "pageIndex", "pageSize", "title", "extra"], ["totCell", "imageCount"], ["totCell", "faceCount"], [1, "premium-modal", 3, "nzVisibleChange", "nzOnCancel", "nzVisible", "nzTitle", "nzWidth", "nzFooter"], ["class", "modal-content-wrapper", "style", "padding: 12px 0;", 4, "nzModalContent"], [1, "file-name-cell", 2, "display", "flex", "align-items", "center", "gap", "12px"], [1, "custom-checkbox", 2, "position", "relative", "display", "inline-block", "width", "16px", "height", "16px", "cursor", "pointer", "user-select", "none"], ["type", "checkbox", 2, "position", "absolute", "opacity", "0", "cursor", "pointer", "height", "0", "width", "0", 3, "ngModelChange", "change", "ngModel"], [1, "checkmark", 2, "position", "absolute", "top", "0", "left", "0", "height", "16px", "width", "16px", "background-color", "#fff", "border", "1px solid #d9d9d9", "border-radius", "4px"], ["alt", "preview", 1, "table-thumb", 2, "width", "40px", "height", "40px", "border-radius", "6px", "object-fit", "cover", "border", "1px solid #f0f0f0", 3, "src"], ["nz-tooltip", "", 1, "table-file-name", 2, "font-weight", "500", "color", "#262626", "white-space", "nowrap", "overflow", "hidden", "text-overflow", "ellipsis", "max-width", "220px", 3, "nzTooltipTitle"], [1, "detected-faces-cell", 2, "display", "flex", "align-items", "center", "min-height", "40px"], ["class", "scanning-inline", "style", "display: flex; align-items: center; gap: 8px; color: #1890ff; font-weight: 500; font-size: 13px;", 4, "ngIf"], ["class", "text-muted", "style", "color: #bfbfbf; font-style: italic; font-size: 13px;", 4, "ngIf"], ["nzColor", "error", 4, "ngIf"], ["class", "no-faces-label", "style", "display: flex; align-items: center; gap: 6px; color: #fa8c16; font-weight: 500; font-size: 13px; background: #fffbe6; padding: 4px 10px; border-radius: 4px; border: 1px solid #ffe58f;", 4, "ngIf"], ["class", "avatar-crops-inline-grid", "style", "display: flex; gap: 8px; flex-wrap: wrap;", 4, "ngIf"], [1, "scanning-inline", 2, "display", "flex", "align-items", "center", "gap", "8px", "color", "#1890ff", "font-weight", "500", "font-size", "13px"], ["nz-icon", "", "nzType", "loading", 1, "spin-icon"], [1, "text-muted", 2, "color", "#bfbfbf", "font-style", "italic", "font-size", "13px"], ["nzColor", "error"], [1, "no-faces-label", 2, "display", "flex", "align-items", "center", "gap", "6px", "color", "#fa8c16", "font-weight", "500", "font-size", "13px", "background", "#fffbe6", "padding", "4px 10px", "border-radius", "4px", "border", "1px solid #ffe58f"], ["nz-icon", "", "nzType", "info-circle", "nzTheme", "fill", 1, "warning-icon"], [1, "avatar-crops-inline-grid", 2, "display", "flex", "gap", "8px", "flex-wrap", "wrap"], ["class", "avatar-crop-card", "nz-tooltip", "", "style", "position: relative; width: 44px; height: 44px; border-radius: 6px; overflow: hidden; border: 2px solid #f0f0f0; cursor: pointer; transition: all 0.2s; background: #fafafa;", 3, "selected", "nzTooltipTitle", "click", 4, "ngFor", "ngForOf"], ["nz-tooltip", "", 1, "avatar-crop-card", 2, "position", "relative", "width", "44px", "height", "44px", "border-radius", "6px", "overflow", "hidden", "border", "2px solid #f0f0f0", "cursor", "pointer", "transition", "all 0.2s", "background", "#fafafa", 3, "click", "nzTooltipTitle"], ["alt", "face", 2, "width", "100%", "height", "100%", "object-fit", "cover", 3, "src"], ["class", "checkmark-overlay-mini", "style", "position: absolute; top: 2px; right: 2px; font-size: 11px; color: #1890ff;", 4, "ngIf"], [1, "avatar-index-badge", 2, "position", "absolute", "bottom", "2px", "left", "2px", "background", "rgba(0, 0, 0, 0.6)", "color", "#fff", "font-size", "9px", "padding", "1px 3px", "border-radius", "2px"], [1, "checkmark-overlay-mini", 2, "position", "absolute", "top", "2px", "right", "2px", "font-size", "11px", "color", "#1890ff"], ["nz-icon", "", "nzType", "check-circle", "nzTheme", "fill"], [1, "simulated-path", 2, "font-family", "monospace", "font-size", "12px", "color", "#595959", "background", "#fafafa", "padding", "3px 8px", "border-radius", "4px", "border", "1px solid #f0f0f0"], ["nzType", "link", 3, "click", "nzDanger"], ["nz-icon", "", "nzType", "delete"], [1, "card-title", 2, "font-size", "16px", "font-weight", "600", "color", "#262626"], ["nz-icon", "", "nzType", "unordered-list", 2, "margin-right", "8px"], ["nzColor", "processing", "style", "margin-left: 8px;", 4, "ngIf"], ["nzColor", "processing", 2, "margin-left", "8px"], ["nz-icon", "", "nzType", "loading"], ["nzType", "primary", 3, "loading", "disabled", "click", 4, "ngIf"], ["nzType", "primary", 3, "click", "loading", "disabled"], ["nz-icon", "", "nzType", "save", 4, "ngIf"], ["nz-icon", "", "nzType", "save"], [1, "progress-bar-overlay", 2, "position", "absolute", "top", "0", "left", "0", "width", "100%", "height", "100%", "background", "rgba(255, 255, 255, 0.85)", "display", "flex", "justify-content", "center", "align-items", "center", "z-index", "10"], [1, "progress-box", 2, "text-align", "center"], ["nzSimple", "", "nzSize", "large"], [2, "margin-top", "16px", "color", "#1890ff", "font-size", "15px", "font-weight", "500"], [1, "realtime-badge", 2, "font-size", "12px", "color", "#722ed1", "margin", "4px 0 0 0"], ["nz-icon", "", "nzType", "sync", "nzSpin", ""], ["class", "session-name-view", "style", "display: flex; align-items: center; gap: 8px;", 4, "ngIf"], ["class", "session-name-edit", "style", "display: flex; align-items: center; gap: 4px;", 4, "ngIf"], [1, "session-name-view", 2, "display", "flex", "align-items", "center", "gap", "8px"], [1, "s-name", 2, "font-weight", "500", "color", "#262626"], ["nzType", "text", 2, "padding", "0 4px", "color", "#8c8c8c", 3, "click"], ["nz-icon", "", "nzType", "edit"], [1, "session-name-edit", 2, "display", "flex", "align-items", "center", "gap", "4px"], ["nz-input", "", 2, "border-radius", "4px", "width", "180px", "padding", "4px 8px", 3, "ngModelChange", "ngModel"], ["nzType", "primary", "nzSize", "small", 3, "click"], ["nz-icon", "", "nzType", "check"], ["nzType", "default", "nzSize", "small", 3, "click"], ["nz-icon", "", "nzType", "close"], ["nzColor", "blue"], ["nzColor", "purple"], [1, "action-buttons-group", 2, "display", "flex", "gap", "8px"], ["nz-icon", "", "nzType", "eye"], ["nzType", "default", "nzSize", "small", 3, "click", "nzDanger"], ["nz-icon", "", "nzType", "history", 2, "margin-right", "8px"], ["nzType", "default", 3, "click", "loading"], ["nz-icon", "", "nzType", "reload"], [1, "modal-content-wrapper", 2, "padding", "12px 0"], ["class", "modal-spinner", "style", "text-align: center; padding: 40px 0;", 4, "ngIf"], ["class", "modal-body custom-scrollbar", "style", "max-height: 550px; overflow-y: auto; padding: 0 12px;", 4, "ngIf"], [1, "modal-spinner", 2, "text-align", "center", "padding", "40px 0"], [2, "margin-top", "12px", "color", "#8c8c8c"], [1, "modal-body", "custom-scrollbar", 2, "max-height", "550px", "overflow-y", "auto", "padding", "0 12px"], ["class", "details-image-card", "style", "margin-bottom: 24px; border: 1px solid #f0f0f0; border-radius: 8px; padding: 16px; background: #fff;", 4, "ngFor", "ngForOf"], [1, "details-image-card", 2, "margin-bottom", "24px", "border", "1px solid #f0f0f0", "border-radius", "8px", "padding", "16px", "background", "#fff"], ["nz-row", "", 2, "border-bottom", "1px solid #f0f0f0", "padding-bottom", "12px", "margin-bottom", "16px", 3, "nzJustify", "nzAlign"], ["nz-col", ""], [1, "file-name", 2, "font-weight", "600", "font-size", "15px", "color", "#262626"], ["nz-icon", "", "nzType", "file-image", 2, "color", "#1890ff"], ["nzColor", "blue", 2, "margin-left", "8px"], [1, "upload-time", 2, "color", "#8c8c8c", "font-size", "12px", "margin-left", "8px"], ["nz-row", "", 3, "nzGutter"], ["nz-col", "", 2, "margin-bottom", "16px", 3, "nzXs", "nzMd"], [1, "original-image-preview", 2, "border", "1px solid #f0f0f0", "border-radius", "8px", "overflow", "hidden", "background", "#fafafa", "display", "flex", "justify-content", "center", "align-items", "center", "height", "180px"], ["alt", "original-img", 2, "max-width", "100%", "max-height", "100%", "object-fit", "contain", 3, "src"], ["nz-col", "", 3, "nzXs", "nzMd"], [1, "cropped-faces-detail-panel"], [2, "margin-top", "0", "margin-bottom", "12px", "font-weight", "600", "color", "#262626"], ["class", "no-crops-placeholder", "style", "color: #8c8c8c; font-style: italic; font-size: 13px;", 4, "ngIf"], ["nz-col", "", 3, "nzXs", "nzSm", "nzMd", 4, "ngFor", "ngForOf"], [1, "no-crops-placeholder", 2, "color", "#8c8c8c", "font-style", "italic", "font-size", "13px"], ["nz-col", "", 3, "nzXs", "nzSm", "nzMd"], [1, "detail-crop-avatar-card", 2, "border", "1px solid #f0f0f0", "border-radius", "8px", "padding", "12px", "text-align", "center", "background", "#fafafa", "position", "relative"], [1, "avatar-img-box", 2, "width", "64px", "height", "64px", "border-radius", "50%", "overflow", "hidden", "margin", "0 auto 8px auto", "position", "relative", "border", "2px solid #e6f7ff"], ["alt", "crop-face", 2, "width", "100%", "height", "100%", "object-fit", "cover", 3, "src"], ["nzType", "text", "nz-tooltip", "", "nzTooltipTitle", "X\xF3a \u1EA3nh khu\xF4n m\u1EB7t crop n\xE0y", 1, "delete-avatar-btn", 2, "position", "absolute", "top", "0", "left", "0", "width", "100%", "height", "100%", "background", "rgba(255, 255, 255, 0.7)", "opacity", "0", "display", "flex", "justify-content", "center", "align-items", "center", "transition", "opacity 0.2s", "border", "none", "font-size", "20px", 3, "click", "nzDanger"], ["nz-icon", "", "nzType", "close-circle", "nzTheme", "fill", 2, "color", "#ff4d4f"], [1, "avatar-meta", 2, "font-size", "11px", "color", "#8c8c8c"], ["nz-tooltip", "", 1, "bbox-json", 2, "display", "block", "font-family", "monospace", "overflow", "hidden", "text-overflow", "ellipsis", "white-space", "nowrap", 3, "nzTooltipTitle"]], template: function NhanDienKhuonMatComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "h1", 8);
    \u0275\u0275element(3, "i", 9);
    \u0275\u0275text(4, " Nh\u1EADn Di\u1EC7n & Tr\xEDch Xu\u1EA5t Khu\xF4n M\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 10);
    \u0275\u0275text(6, "H\u1EC7 th\u1ED1ng ph\xE2n t\xEDch v\xE0 qu\u1EA3n l\xFD phi\xEAn nh\u1EADn di\u1EC7n khu\xF4n m\u1EB7t ch\u1EA1y tr\u1EF1c ti\u1EBFp tr\xEAn Tr\xECnh duy\u1EC7t (Edge AI)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 11)(8, "div", 12)(9, "nz-card", 13)(10, "input", 14);
    \u0275\u0275twoWayListener("ngModelChange", function NhanDienKhuonMatComponent_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.sessionName, $event) || (ctx.sessionName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 15)(12, "div", 16);
    \u0275\u0275listener("dragover", function NhanDienKhuonMatComponent_Template_div_dragover_12_listener($event) {
      return ctx.onDragOver($event);
    })("drop", function NhanDienKhuonMatComponent_Template_div_drop_12_listener($event) {
      return ctx.onFileDrop($event);
    })("click", function NhanDienKhuonMatComponent_Template_div_click_12_listener() {
      return ctx.triggerFileInput();
    });
    \u0275\u0275elementStart(13, "div", 17);
    \u0275\u0275element(14, "i", 18);
    \u0275\u0275elementStart(15, "p", 19);
    \u0275\u0275text(16, "Ch\u1ECDn file ho\u1EB7c k\xE9o th\u1EA3 file");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 20);
    \u0275\u0275text(18, "Nh\u1EA5p ho\u1EB7c k\xE9o th\u1EA3 nhi\u1EC1u t\u1EC7p \u1EA3nh v\xE0o \u0111\xE2y");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "input", 21, 0);
    \u0275\u0275listener("change", function NhanDienKhuonMatComponent_Template_input_change_19_listener($event) {
      return ctx.onFilesSelected($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 15)(22, "div", 22);
    \u0275\u0275listener("dragover", function NhanDienKhuonMatComponent_Template_div_dragover_22_listener($event) {
      return ctx.onDragOver($event);
    })("drop", function NhanDienKhuonMatComponent_Template_div_drop_22_listener($event) {
      return ctx.onFolderDrop($event);
    })("click", function NhanDienKhuonMatComponent_Template_div_click_22_listener() {
      return ctx.triggerFolderInput();
    });
    \u0275\u0275elementStart(23, "div", 17);
    \u0275\u0275element(24, "i", 23);
    \u0275\u0275elementStart(25, "p", 19);
    \u0275\u0275text(26, "Ch\u1ECDn folder ho\u1EB7c k\xE9o th\u1EA3 folder");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 20);
    \u0275\u0275text(28, "Nh\u1EA5p ho\u1EB7c k\xE9o th\u1EA3 c\u1EA3 folder \u1EA3nh v\xE0o \u0111\xE2y");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "input", 24, 1);
    \u0275\u0275listener("change", function NhanDienKhuonMatComponent_Template_input_change_29_listener($event) {
      return ctx.onFolderSelected($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(31, "div", 25)(32, "tot-table", 26);
    \u0275\u0275listener("pageIndexChange", function NhanDienKhuonMatComponent_Template_tot_table_pageIndexChange_32_listener($event) {
      return ctx.activePageIndex = $event;
    })("pageSizeChange", function NhanDienKhuonMatComponent_Template_tot_table_pageSizeChange_32_listener($event) {
      \u0275\u0275restoreView(_r1);
      ctx.activePageSize = $event;
      return \u0275\u0275resetView(ctx.activePageIndex = 1);
    });
    \u0275\u0275template(33, NhanDienKhuonMatComponent_ng_template_33_Template, 7, 4, "ng-template", 27)(34, NhanDienKhuonMatComponent_ng_template_34_Template, 6, 5, "ng-template", 28)(35, NhanDienKhuonMatComponent_ng_template_35_Template, 2, 1, "ng-template", 29)(36, NhanDienKhuonMatComponent_ng_template_36_Template, 3, 1, "ng-template", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, NhanDienKhuonMatComponent_ng_template_37_Template, 4, 1, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(39, NhanDienKhuonMatComponent_ng_template_39_Template, 1, 1, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(41, NhanDienKhuonMatComponent_div_41_Template, 8, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "div", 32)(43, "tot-table", 33);
    \u0275\u0275listener("pageIndexChange", function NhanDienKhuonMatComponent_Template_tot_table_pageIndexChange_43_listener($event) {
      \u0275\u0275restoreView(_r1);
      ctx.pageIndex = $event;
      return \u0275\u0275resetView(ctx.loadSessionsHistory());
    })("pageSizeChange", function NhanDienKhuonMatComponent_Template_tot_table_pageSizeChange_43_listener($event) {
      \u0275\u0275restoreView(_r1);
      ctx.pageSize = $event;
      ctx.pageIndex = 1;
      return \u0275\u0275resetView(ctx.loadSessionsHistory());
    });
    \u0275\u0275template(44, NhanDienKhuonMatComponent_ng_template_44_Template, 2, 2, "ng-template", 27)(45, NhanDienKhuonMatComponent_ng_template_45_Template, 2, 1, "ng-template", 34)(46, NhanDienKhuonMatComponent_ng_template_46_Template, 2, 1, "ng-template", 35)(47, NhanDienKhuonMatComponent_ng_template_47_Template, 7, 1, "ng-template", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275template(48, NhanDienKhuonMatComponent_ng_template_48_Template, 3, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor)(50, NhanDienKhuonMatComponent_ng_template_50_Template, 3, 1, "ng-template", null, 5, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "nz-modal", 36);
    \u0275\u0275twoWayListener("nzVisibleChange", function NhanDienKhuonMatComponent_Template_nz_modal_nzVisibleChange_52_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.showDetailsModal, $event) || (ctx.showDetailsModal = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function NhanDienKhuonMatComponent_Template_nz_modal_nzOnCancel_52_listener() {
      return ctx.closeDetailsModal();
    });
    \u0275\u0275template(53, NhanDienKhuonMatComponent_div_53_Template, 3, 2, "div", 37);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const activeTableTitleTpl_r25 = \u0275\u0275reference(38);
    const activeTableExtraTpl_r26 = \u0275\u0275reference(40);
    const tableTitleTpl_r27 = \u0275\u0275reference(49);
    const tableExtraTpl_r28 = \u0275\u0275reference(51);
    \u0275\u0275advance(7);
    \u0275\u0275property("nzGutter", 24);
    \u0275\u0275advance();
    \u0275\u0275property("nzXs", 24)("nzLg", 8);
    \u0275\u0275advance();
    \u0275\u0275property("nzBordered", true);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.sessionName);
    \u0275\u0275property("disabled", ctx.savingSession);
    \u0275\u0275advance();
    \u0275\u0275property("nzXs", 24)("nzMd", 12)("nzLg", 8);
    \u0275\u0275advance(10);
    \u0275\u0275property("nzXs", 24)("nzMd", 12)("nzLg", 8);
    \u0275\u0275advance(11);
    \u0275\u0275property("data", ctx.paginatedQueue)("columns", ctx.activeColumns)("loading", ctx.loadingDetector)("nzSize", "middle")("frontPagination", false)("showPagination", ctx.queue.length > 0)("total", ctx.queue.length)("pageIndex", ctx.activePageIndex)("pageSize", ctx.activePageSize)("title", activeTableTitleTpl_r25)("extra", activeTableExtraTpl_r26);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx.savingSession);
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx.sessionsList)("columns", ctx.historyColumns)("loading", ctx.loadingSessions)("nzSize", "middle")("frontPagination", false)("total", ctx.totalSessions)("pageIndex", ctx.pageIndex)("pageSize", ctx.pageSize)("title", tableTitleTpl_r27)("extra", tableExtraTpl_r28);
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("nzVisible", ctx.showDetailsModal);
    \u0275\u0275property("nzTitle", "S\u01A1 \u0111\u1ED3 chi ti\u1EBFt phi\xEAn: " + ((ctx.selectedSessionDetails == null ? null : ctx.selectedSessionDetails.name) || ""))("nzWidth", 900)("nzFooter", null);
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  FormsModule,
  DefaultValueAccessor,
  CheckboxControlValueAccessor,
  NgControlStatus,
  NgModel,
  NzButtonModule,
  NzTransitionPatchDirective,
  NzInputModule,
  NzInputDirective,
  NzTableModule,
  NzModalModule,
  NzModalComponent,
  NzModalContentDirective,
  NzIconModule,
  NzIconDirective,
  NzCardModule,
  NzCardComponent,
  NzTagModule,
  NzTagComponent,
  NzSpinModule,
  NzSpinComponent,
  NzSwitchModule,
  NzTooltipModule,
  NzTooltipDirective,
  NzGridModule,
  NzColDirective,
  NzRowDirective,
  TotButtonComponent,
  TotTableComponent,
  TotCellDirective,
  DatePipe
], styles: ['@import "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap";\n\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family:\n    "Outfit",\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n  padding: 24px;\n}\n.face-recognition-container[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.dropzone-card[_ngcontent-%COMP%] {\n  transition: all 0.3s ease;\n}\n.dropzone-card.file-zone[_ngcontent-%COMP%]:hover {\n  background: #e6f7ff !important;\n  border-color: #40a9ff !important;\n}\n.dropzone-card.folder-zone[_ngcontent-%COMP%]:hover {\n  background: #f9f0ff !important;\n  border-color: #9254de !important;\n}\n.dropzone-card[_ngcontent-%COMP%]   .drop-icon[_ngcontent-%COMP%] {\n  transition: transform 0.3s ease;\n}\n.dropzone-card[_ngcontent-%COMP%]:hover   .drop-icon[_ngcontent-%COMP%] {\n  transform: translateY(-2px);\n}\n.custom-checkbox[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.custom-checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: absolute;\n  opacity: 0;\n  cursor: pointer;\n  height: 0;\n  width: 0;\n}\n.checkmark[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 16px;\n  width: 16px;\n  background-color: #fff;\n  border: 1px solid #d9d9d9;\n  border-radius: 4px;\n  transition: all 0.2s ease;\n}\n.custom-checkbox[_ngcontent-%COMP%]:hover   input[_ngcontent-%COMP%]    ~ .checkmark[_ngcontent-%COMP%] {\n  border-color: #1890ff;\n}\n.custom-checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    ~ .checkmark[_ngcontent-%COMP%] {\n  background-color: #1890ff;\n  border-color: #1890ff;\n}\n.checkmark[_ngcontent-%COMP%]:after {\n  content: "";\n  position: absolute;\n  display: none;\n}\n.custom-checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    ~ .checkmark[_ngcontent-%COMP%]:after {\n  display: block;\n}\n.custom-checkbox[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%]:after {\n  left: 5px;\n  top: 2px;\n  width: 4px;\n  height: 8px;\n  border: solid #ffffff;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n.avatar-crop-card[_ngcontent-%COMP%] {\n  transition: all 0.2s ease;\n}\n.avatar-crop-card[_ngcontent-%COMP%]:hover {\n  transform: scale(1.08);\n  border-color: #1890ff !important;\n  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);\n}\n.avatar-crop-card.selected[_ngcontent-%COMP%] {\n  border-color: #1890ff !important;\n  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);\n}\n.avatar-img-box[_ngcontent-%COMP%]:hover   .delete-avatar-btn[_ngcontent-%COMP%] {\n  opacity: 1 !important;\n}\n.details-image-card[_ngcontent-%COMP%] {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  transition: box-shadow 0.3s;\n}\n.details-image-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: rgba(0, 0, 0, 0.02);\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 4px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: rgba(24, 144, 255, 0.3);\n}\n.spin-icon[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_loadingCircle 1s infinite linear;\n}\n@keyframes _ngcontent-%COMP%_loadingCircle {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=nhan-dien-khuon-mat.component.css.map */'] });
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
      NzGridModule,
      TotButtonComponent,
      TotTableComponent,
      TotCellDirective
    ], template: `<div class="face-recognition-container">
  <!-- Top Workspace Title -->
  <div class="workspace-header" style="margin-bottom: 24px; border-bottom: 1px solid #f0f0f0; padding-bottom: 16px;">
    <h1 class="gradient-title" style="font-size: 24px; font-weight: 600; margin: 0; color: #262626;"><i nz-icon nzType="scan" nzTheme="outline" style="color: #1890ff; margin-right: 8px;"></i> Nh\u1EADn Di\u1EC7n & Tr\xEDch Xu\u1EA5t Khu\xF4n M\u1EB7t</h1>
    <p class="subtitle" style="color: #8c8c8c; margin: 4px 0 0 0; font-size: 13px;">H\u1EC7 th\u1ED1ng ph\xE2n t\xEDch v\xE0 qu\u1EA3n l\xFD phi\xEAn nh\u1EADn di\u1EC7n khu\xF4n m\u1EB7t ch\u1EA1y tr\u1EF1c ti\u1EBFp tr\xEAn Tr\xECnh duy\u1EC7t (Edge AI)</p>
  </div>

  <!-- SECTION 1: Top Panels (Session Name, File Dropzone, Folder Dropzone) -->
  <div nz-row [nzGutter]="24" style="margin-bottom: 24px;">
    <!-- Left column: Input session name -->
    <div nz-col [nzXs]="24" [nzLg]="8">
      <nz-card nzTitle="Nh\u1EADp t\xEAn phi\xEAn \u0111ang l\xE0m vi\u1EC7c" [nzBordered]="true" style="height: 100%; border-radius: 8px;">
        <input nz-input [(ngModel)]="sessionName" placeholder="Nh\u1EADp t\xEAn phi\xEAn l\xE0m vi\u1EC7c..." [disabled]="savingSession" style="border-radius: 6px;">
      </nz-card>
    </div>

    <!-- Middle column: File Dropzone -->
    <div nz-col [nzXs]="24" [nzMd]="12" [nzLg]="8">
      <div class="dropzone-card file-zone" (dragover)="onDragOver($event)" (drop)="onFileDrop($event)" (click)="triggerFileInput()" style="border: 2px dashed #1890ff; border-radius: 8px; padding: 20px; text-align: center; cursor: pointer; background: #fafafa; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 116px; transition: background 0.3s;">
        <div class="dropzone-content">
          <i nz-icon nzType="file-image" class="drop-icon" style="font-size: 28px; color: #1890ff; margin-bottom: 8px;"></i>
          <p class="drop-text" style="font-weight: 600; margin: 0; font-size: 14px; color: #262626;">Ch\u1ECDn file ho\u1EB7c k\xE9o th\u1EA3 file</p>
          <span class="drop-subtext" style="font-size: 12px; color: #8c8c8c; display: block; margin-top: 4px;">Nh\u1EA5p ho\u1EB7c k\xE9o th\u1EA3 nhi\u1EC1u t\u1EC7p \u1EA3nh v\xE0o \u0111\xE2y</span>
        </div>
        <input type="file" multiple (change)="onFilesSelected($event)" #fileInput style="display:none">
      </div>
    </div>

    <!-- Right column: Folder Dropzone -->
    <div nz-col [nzXs]="24" [nzMd]="12" [nzLg]="8">
      <div class="dropzone-card folder-zone" (dragover)="onDragOver($event)" (drop)="onFolderDrop($event)" (click)="triggerFolderInput()" style="border: 2px dashed #722ed1; border-radius: 8px; padding: 20px; text-align: center; cursor: pointer; background: #fafafa; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 116px; transition: background 0.3s;">
        <div class="dropzone-content">
          <i nz-icon nzType="folder-open" class="drop-icon" style="font-size: 28px; color: #722ed1; margin-bottom: 8px;"></i>
          <p class="drop-text" style="font-weight: 600; margin: 0; font-size: 14px; color: #262626;">Ch\u1ECDn folder ho\u1EB7c k\xE9o th\u1EA3 folder</p>
          <span class="drop-subtext" style="font-size: 12px; color: #8c8c8c; display: block; margin-top: 4px;">Nh\u1EA5p ho\u1EB7c k\xE9o th\u1EA3 c\u1EA3 folder \u1EA3nh v\xE0o \u0111\xE2y</span>
        </div>
        <input type="file" webkitdirectory directory multiple (change)="onFolderSelected($event)" #folderInput style="display:none">
      </div>
    </div>
  </div>

  <!-- SECTION 2: Active Working Session File List (Danh s\xE1ch file c\u1EE7a phi\xEAn \u0111ang l\xE0m vi\u1EC7c) -->
  <div style="margin-bottom: 24px; position: relative;">
    <tot-table 
      [data]="paginatedQueue" 
      [columns]="activeColumns"
      [loading]="loadingDetector"
      [nzSize]="'middle'"
      [frontPagination]="false"
      [showPagination]="queue.length > 0"
      [total]="queue.length"
      [pageIndex]="activePageIndex"
      [pageSize]="activePageSize"
      (pageIndexChange)="activePageIndex = $event"
      (pageSizeChange)="activePageSize = $event; activePageIndex = 1"
      [title]="activeTableTitleTpl"
      [extra]="activeTableExtraTpl"
      class="active-session-table"
    >
      <ng-template totCell="name" let-data>
        <div class="file-name-cell" style="display: flex; align-items: center; gap: 12px;">
          <label class="custom-checkbox" style="position: relative; display: inline-block; width: 16px; height: 16px; cursor: pointer; user-select: none;">
            <input type="checkbox" [(ngModel)]="data.selected" (change)="toggleOriginalSelection(data)" style="position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0;">
            <span class="checkmark" style="position: absolute; top: 0; left: 0; height: 16px; width: 16px; background-color: #fff; border: 1px solid #d9d9d9; border-radius: 4px;"></span>
          </label>
          <img [src]="data.thumbnailUrl" class="table-thumb" alt="preview" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover; border: 1px solid #f0f0f0;">
          <span class="table-file-name" [nzTooltipTitle]="data.name" nz-tooltip style="font-weight: 500; color: #262626; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px;">{{ data.name }}</span>
        </div>
      </ng-template>

      <ng-template totCell="detectedFaces" let-data>
        <div class="detected-faces-cell" style="display: flex; align-items: center; min-height: 40px;">
          <!-- Scanning Loader -->
          <div *ngIf="data.status === 'Scanning'" class="scanning-inline" style="display: flex; align-items: center; gap: 8px; color: #1890ff; font-weight: 500; font-size: 13px;">
            <i nz-icon nzType="loading" class="spin-icon"></i>
            <span>\u0110ang ph\xE2n t\xEDch khu\xF4n m\u1EB7t... {{ data.progress }}%</span>
          </div>

          <!-- Waiting State -->
          <span *ngIf="data.status === 'Waiting'" class="text-muted" style="color: #bfbfbf; font-style: italic; font-size: 13px;">\u0110ang ch\u1EDD qu\xE9t...</span>

          <!-- Error State -->
          <nz-tag *ngIf="data.status === 'Error'" nzColor="error">L\u1ED7i x\u1EED l\xFD t\u1EC7p</nz-tag>

          <!-- No faces found -->
          <div *ngIf="data.status === 'NoFace'" class="no-faces-label" style="display: flex; align-items: center; gap: 6px; color: #fa8c16; font-weight: 500; font-size: 13px; background: #fffbe6; padding: 4px 10px; border-radius: 4px; border: 1px solid #ffe58f;">
            <i nz-icon nzType="info-circle" nzTheme="fill" class="warning-icon"></i>
            <span>Kh\xF4ng c\xF3 \u1EA3nh khu\xF4n m\u1EB7t</span>
          </div>

          <!-- Crop Avatars Grid list -->
          <div *ngIf="data.status === 'Success' && data.detectedFaces.length > 0" class="avatar-crops-inline-grid" style="display: flex; gap: 8px; flex-wrap: wrap;">
            <div *ngFor="let face of data.detectedFaces; let idx = index" 
                 class="avatar-crop-card"
                 [class.selected]="face.selected"
                 (click)="toggleFaceSelection(data, face)"
                 [nzTooltipTitle]="'M\u1EB7t #' + (idx + 1) + ' - T\u1ECDa \u0111\u1ED9: [' + face.boundingBox.x + ',' + face.boundingBox.y + ']'" 
                 nz-tooltip
                 style="position: relative; width: 44px; height: 44px; border-radius: 6px; overflow: hidden; border: 2px solid #f0f0f0; cursor: pointer; transition: all 0.2s; background: #fafafa;">
              <img [src]="face.croppedUrl" alt="face" style="width: 100%; height: 100%; object-fit: cover;">
              <div class="checkmark-overlay-mini" *ngIf="face.selected" style="position: absolute; top: 2px; right: 2px; font-size: 11px; color: #1890ff;">
                <i nz-icon nzType="check-circle" nzTheme="fill"></i>
              </div>
              <div class="avatar-index-badge" style="position: absolute; bottom: 2px; left: 2px; background: rgba(0, 0, 0, 0.6); color: #fff; font-size: 9px; padding: 1px 3px; border-radius: 2px;">#{{ idx + 1 }}</div>
            </div>
          </div>
        </div>
      </ng-template>

      <ng-template totCell="simulatedPath" let-data>
        <span class="simulated-path" style="font-family: monospace; font-size: 12px; color: #595959; background: #fafafa; padding: 3px 8px; border-radius: 4px; border: 1px solid #f0f0f0;">/work/{{ data.name }}</span>
      </ng-template>

      <ng-template totCell="action" let-data>
        <tot-button nzType="link" [nzDanger]="true" (click)="removeQueueItem(data, $event)">
          <i nz-icon nzType="delete"></i> X\xF3a
        </tot-button>
      </ng-template>
    </tot-table>

    <ng-template #activeTableTitleTpl>
      <span class="card-title" style="font-size: 16px; font-weight: 600; color: #262626;">
        <i nz-icon nzType="unordered-list" style="margin-right: 8px;"></i> Danh s\xE1ch file c\u1EE7a phi\xEAn \u0111ang l\xE0m vi\u1EC7c
        <nz-tag nzColor="processing" *ngIf="loadingDetector" style="margin-left: 8px;">
          <i nz-icon nzType="loading"></i> \u0110ang t\u1EA3i MediaPipe AI...
        </nz-tag>
      </span>
    </ng-template>

    <ng-template #activeTableExtraTpl>
      <tot-button *ngIf="queue.length > 0" nzType="primary" (click)="saveFaceDetectionSession()" [loading]="savingSession" [disabled]="savingSession">
        <i nz-icon nzType="save" *ngIf="!savingSession"></i> L\u01B0u phi\xEAn l\xE0m vi\u1EC7c
      </tot-button>
    </ng-template>

    <!-- Progress Saving Overlay -->
    <div class="progress-bar-overlay" *ngIf="savingSession" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255, 255, 255, 0.85); display: flex; justify-content: center; align-items: center; z-index: 10;">
      <div class="progress-box" style="text-align: center;">
        <nz-spin nzSimple nzSize="large"></nz-spin>
        <h3 style="margin-top: 16px; color: #1890ff; font-size: 15px; font-weight: 500;">{{ uploadProgressText }}</h3>
        <p class="realtime-badge" style="font-size: 12px; color: #722ed1; margin: 4px 0 0 0;"><i nz-icon nzType="sync" nzSpin></i> \u0110\u1ED3ng b\u1ED9 realtime qua Firebase Cloud Firestore...</p>
      </div>
    </div>
  </div>

  <!-- SECTION 3: HISTORICAL MANAGEMENT LIST (Danh s\xE1ch c\xE1c phi\xEAn) -->
  <div class="workspace-card history-panel" style="margin-bottom: 24px;">
    <tot-table 
      [data]="sessionsList" 
      [columns]="historyColumns" 
      [loading]="loadingSessions" 
      [nzSize]="'middle'"
      [frontPagination]="false"
      [total]="totalSessions"
      [pageIndex]="pageIndex"
      [pageSize]="pageSize"
      (pageIndexChange)="pageIndex = $event; loadSessionsHistory()"
      (pageSizeChange)="pageSize = $event; pageIndex = 1; loadSessionsHistory()"
      [title]="tableTitleTpl"
      [extra]="tableExtraTpl"
    >
      <ng-template totCell="name" let-data>
        <div *ngIf="!data.isEditing" class="session-name-view" style="display: flex; align-items: center; gap: 8px;">
          <span class="s-name" style="font-weight: 500; color: #262626;">{{ data.name }}</span>
          <tot-button nzType="text" (click)="inlineRenameSession(data)" style="padding: 0 4px; color: #8c8c8c;">
            <i nz-icon nzType="edit"></i>
          </tot-button>
        </div>
        <div *ngIf="data.isEditing" class="session-name-edit" style="display: flex; align-items: center; gap: 4px;">
          <input nz-input [(ngModel)]="data.tempName" style="border-radius: 4px; width: 180px; padding: 4px 8px;">
          <tot-button nzType="primary" nzSize="small" (click)="saveInlineRename(data)"><i nz-icon nzType="check"></i></tot-button>
          <tot-button nzType="default" nzSize="small" (click)="cancelInlineRename(data)"><i nz-icon nzType="close"></i></tot-button>
        </div>
      </ng-template>

      <ng-template totCell="imageCount" let-data>
        <nz-tag nzColor="blue">{{ data.imageCount }} \u1EA3nh g\u1ED1c</nz-tag>
      </ng-template>

      <ng-template totCell="faceCount" let-data>
        <nz-tag nzColor="purple">{{ data.faceCount }} khu\xF4n m\u1EB7t</nz-tag>
      </ng-template>

      <ng-template totCell="action" let-data>
        <div class="action-buttons-group" style="display: flex; gap: 8px;">
          <tot-button nzType="primary" nzSize="small" (click)="openSessionDetails(data)">
            <i nz-icon nzType="eye"></i> Xem Chi Ti\u1EBFt
          </tot-button>
          <tot-button nzType="default" [nzDanger]="true" nzSize="small" (click)="deleteSession(data, $event)">
            <i nz-icon nzType="delete"></i> X\xF3a
          </tot-button>
        </div>
      </ng-template>
    </tot-table>

    <ng-template #tableTitleTpl>
      <span class="card-title" style="font-size: 16px; font-weight: 600; color: #262626;"><i nz-icon nzType="history" style="margin-right: 8px;"></i> L\u1ECBch S\u1EED C\xE1c Phi\xEAn Upload</span>
    </ng-template>

    <ng-template #tableExtraTpl>
      <tot-button nzType="default" (click)="loadSessionsHistory()" [loading]="loadingSessions">
        <i nz-icon nzType="reload"></i> L\xE0m m\u1EDBi l\u1ECBch s\u1EED
      </tot-button>
    </ng-template>
  </div>

  <!-- DETAILED MODAL LAYOUT -->
  <nz-modal [(nzVisible)]="showDetailsModal" 
            [nzTitle]="'S\u01A1 \u0111\u1ED3 chi ti\u1EBFt phi\xEAn: ' + (selectedSessionDetails?.name || '')" 
            [nzWidth]="900" 
            (nzOnCancel)="closeDetailsModal()" 
            [nzFooter]="null"
            class="premium-modal">
    <div *nzModalContent class="modal-content-wrapper" style="padding: 12px 0;">
      <div *ngIf="loadingDetails" class="modal-spinner" style="text-align: center; padding: 40px 0;">
        <nz-spin nzSimple nzSize="large"></nz-spin>
        <p style="margin-top: 12px; color: #8c8c8c;">\u0110ang t\u1EA3i c\u1EA5u tr\xFAc t\u1EC7p t\u1EEB server...</p>
      </div>

      <div *ngIf="!loadingDetails && selectedSessionDetails" class="modal-body custom-scrollbar" style="max-height: 550px; overflow-y: auto; padding: 0 12px;">
        <div *ngFor="let img of selectedSessionDetails.images" class="details-image-card" style="margin-bottom: 24px; border: 1px solid #f0f0f0; border-radius: 8px; padding: 16px; background: #fff;">
          <div nz-row [nzJustify]="'space-between'" [nzAlign]="'middle'" style="border-bottom: 1px solid #f0f0f0; padding-bottom: 12px; margin-bottom: 16px;">
            <div nz-col>
              <span class="file-name" style="font-weight: 600; font-size: 15px; color: #262626;"><i nz-icon nzType="file-image" style="color: #1890ff;"></i> {{ img.fileName }}</span>
              <nz-tag nzColor="blue" style="margin-left: 8px;">K\xEDch th\u01B0\u1EDBc: {{ formatBytes(img.size) }}</nz-tag>
              <span class="upload-time" style="color: #8c8c8c; font-size: 12px; margin-left: 8px;">{{ img.createdAt | date:'dd/MM/yyyy HH:mm:ss' }}</span>
            </div>
            <div nz-col>
              <tot-button nzType="default" [nzDanger]="true" nzSize="small" (click)="deleteDetailOriginalImage(img)">
                <i nz-icon nzType="delete"></i> X\xF3a \u1EA3nh g\u1ED1c & crops
              </tot-button>
            </div>
          </div>

          <div nz-row [nzGutter]="24">
            <!-- Original image preview -->
            <div nz-col [nzXs]="24" [nzMd]="8" style="margin-bottom: 16px;">
              <div class="original-image-preview" style="border: 1px solid #f0f0f0; border-radius: 8px; overflow: hidden; background: #fafafa; display: flex; justify-content: center; align-items: center; height: 180px;">
                <img [src]="img.url" alt="original-img" style="max-width: 100%; max-height: 100%; object-fit: contain;">
              </div>
            </div>

            <!-- Cropped faces panel inside details -->
            <div nz-col [nzXs]="24" [nzMd]="16">
              <div class="cropped-faces-detail-panel">
                <h4 style="margin-top: 0; margin-bottom: 12px; font-weight: 600; color: #262626;">Khu\xF4n m\u1EB7t \u0111\xE3 tr\xEDch xu\u1EA5t ({{ img.croppedFaces.length }})</h4>
                
                <div *ngIf="img.croppedFaces.length === 0" class="no-crops-placeholder" style="color: #8c8c8c; font-style: italic; font-size: 13px;">
                  Kh\xF4ng c\xF3 khu\xF4n m\u1EB7t n\xE0o \u0111\u01B0\u1EE3c l\u01B0u trong t\u1EC7p \u1EA3nh n\xE0y
                </div>

                <div nz-row [nzGutter]="[12, 12]">
                  <div nz-col *ngFor="let face of img.croppedFaces" [nzXs]="12" [nzSm]="8" [nzMd]="6">
                    <div class="detail-crop-avatar-card" style="border: 1px solid #f0f0f0; border-radius: 8px; padding: 12px; text-align: center; background: #fafafa; position: relative;">
                      <div class="avatar-img-box" style="width: 64px; height: 64px; border-radius: 50%; overflow: hidden; margin: 0 auto 8px auto; position: relative; border: 2px solid #e6f7ff;">
                        <img [src]="face.url" alt="crop-face" style="width: 100%; height: 100%; object-fit: cover;">
                        <tot-button nzType="text" [nzDanger]="true" (click)="deleteDetailCroppedFace(face, img)" class="delete-avatar-btn" nz-tooltip nzTooltipTitle="X\xF3a \u1EA3nh khu\xF4n m\u1EB7t crop n\xE0y" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255, 255, 255, 0.7); opacity: 0; display: flex; justify-content: center; align-items: center; transition: opacity 0.2s; border: none; font-size: 20px;">
                          <i nz-icon nzType="close-circle" nzTheme="fill" style="color: #ff4d4f;"></i>
                        </tot-button>
                      </div>
                      <div class="avatar-meta" style="font-size: 11px; color: #8c8c8c;">
                        <span class="bbox-json" [nzTooltipTitle]="face.boundingBox" nz-tooltip style="display: block; font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">BBox: {{ face.boundingBox }}</span>
                      </div>
                    </div>
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
`, styles: ['@import "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap";\n\n/* projects/tot/nhan-dien-khuon-mat/src/lib/nhan-dien-khuon-mat.component.css */\n:host {\n  display: block;\n  font-family:\n    "Outfit",\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    Roboto,\n    sans-serif;\n  padding: 24px;\n}\n.face-recognition-container {\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.dropzone-card {\n  transition: all 0.3s ease;\n}\n.dropzone-card.file-zone:hover {\n  background: #e6f7ff !important;\n  border-color: #40a9ff !important;\n}\n.dropzone-card.folder-zone:hover {\n  background: #f9f0ff !important;\n  border-color: #9254de !important;\n}\n.dropzone-card .drop-icon {\n  transition: transform 0.3s ease;\n}\n.dropzone-card:hover .drop-icon {\n  transform: translateY(-2px);\n}\n.custom-checkbox {\n  position: relative;\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.custom-checkbox input {\n  position: absolute;\n  opacity: 0;\n  cursor: pointer;\n  height: 0;\n  width: 0;\n}\n.checkmark {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 16px;\n  width: 16px;\n  background-color: #fff;\n  border: 1px solid #d9d9d9;\n  border-radius: 4px;\n  transition: all 0.2s ease;\n}\n.custom-checkbox:hover input ~ .checkmark {\n  border-color: #1890ff;\n}\n.custom-checkbox input:checked ~ .checkmark {\n  background-color: #1890ff;\n  border-color: #1890ff;\n}\n.checkmark:after {\n  content: "";\n  position: absolute;\n  display: none;\n}\n.custom-checkbox input:checked ~ .checkmark:after {\n  display: block;\n}\n.custom-checkbox .checkmark:after {\n  left: 5px;\n  top: 2px;\n  width: 4px;\n  height: 8px;\n  border: solid #ffffff;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n.avatar-crop-card {\n  transition: all 0.2s ease;\n}\n.avatar-crop-card:hover {\n  transform: scale(1.08);\n  border-color: #1890ff !important;\n  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);\n}\n.avatar-crop-card.selected {\n  border-color: #1890ff !important;\n  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);\n}\n.avatar-img-box:hover .delete-avatar-btn {\n  opacity: 1 !important;\n}\n.details-image-card {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  transition: box-shadow 0.3s;\n}\n.details-image-card:hover {\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);\n}\n.custom-scrollbar::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n.custom-scrollbar::-webkit-scrollbar-track {\n  background: rgba(0, 0, 0, 0.02);\n}\n.custom-scrollbar::-webkit-scrollbar-thumb {\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 4px;\n}\n.custom-scrollbar::-webkit-scrollbar-thumb:hover {\n  background: rgba(24, 144, 255, 0.3);\n}\n.spin-icon {\n  animation: loadingCircle 1s infinite linear;\n}\n@keyframes loadingCircle {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=nhan-dien-khuon-mat.component.css.map */\n'] }]
  }], null, { fileInput: [{
    type: ViewChild,
    args: ["fileInput"]
  }], folderInput: [{
    type: ViewChild,
    args: ["folderInput"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NhanDienKhuonMatComponent, { className: "NhanDienKhuonMatComponent", filePath: "projects/tot/nhan-dien-khuon-mat/src/lib/nhan-dien-khuon-mat.component.ts", lineNumber: 63 });
})();

export {
  provideNhanDienKhuonMat,
  NhanDienKhuonMatService,
  NhanDienKhuonMatComponent
};
//# sourceMappingURL=chunk-N3XKE3CI.js.map
