import {
  TotAutocompleteComponent
} from "./chunk-UAF4BG7N.js";
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
  NzButtonComponent,
  NzButtonModule,
  NzCardComponent,
  NzCardModule,
  NzCellAlignDirective,
  NzCheckboxComponent,
  NzCheckboxModule,
  NzColDirective,
  NzConfigService,
  NzDividerModule,
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
  NzNoAnimationDirective,
  NzOutletModule,
  NzRowDirective,
  NzSpinComponent,
  NzSpinModule,
  NzStringTemplateOutletDirective,
  NzTableCellDirective,
  NzTableComponent,
  NzTableModule,
  NzTagComponent,
  NzTagModule,
  NzTbodyComponent,
  NzThMeasureDirective,
  NzTheadComponent,
  NzTooltipDirective,
  NzTooltipModule,
  NzTrDirective,
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
  onConfigChangeEventForComponent,
  takeUntilDestroyed,
  withAnimationCheck
} from "./chunk-UCSEFF56.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  ViewChild,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  afterNextRender,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
  numberAttribute,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
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
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementContainer,
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
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction4,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
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
  ɵɵviewQuery,
  ɵɵviewQuerySignal
} from "./chunk-J5J5AFBH.js";
import {
  __publicField,
  __spreadProps,
  __spreadValues
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
  getUsers(keyword) {
    return this.http.get(`/api/face-detection/users?keyword=${keyword}`);
  }
  addFaceDefinition(userId, originalImageId, force = false) {
    return this.http.post("/api/face-detection/definitions", { userId, originalImageId, force });
  }
  getUserDefinitions(userId) {
    return this.http.get(`/api/face-detection/users/${userId}/definitions`);
  }
  deleteFaceDefinition(definitionId) {
    return this.http.delete(`/api/face-detection/definitions/${definitionId}`);
  }
  // === TRAINING METHODS ===
  getUsersWithDefinitions() {
    return this.http.get("/api/face-detection/users-with-definitions");
  }
  getTrainingFolders() {
    return this.http.get("/api/face-detection/training-folders");
  }
  extractEmbeddings(folderName) {
    return this.http.post(`/api/face-detection/training-folders/${encodeURIComponent(folderName)}/extract-embeddings`);
  }
  /**
   * Tạo một EventSource SSE để stream log đào tạo từ server về trình duyệt.
   * Caller chịu trách nhiệm đóng EventSource khi không dùng nữa.
   */
  streamTraining(userIds) {
    var _a, _b, _c;
    const baseUrl = (_b = (_a = window.env) == null ? void 0 : _a.API_BASE_URL) != null ? _b : "";
    const token = (_c = localStorage.getItem("jwt_token")) != null ? _c : "";
    const idsParam = encodeURIComponent(userIds.join(","));
    const url = `${baseUrl}/api/face-detection/train/stream?userIds=${idsParam}&access_token=${token}`;
    return new EventSource(url);
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
var _c3 = () => ({ title: "T\xEAn file \u1EA3nh g\u1ED1c", key: "fileName", width: "35%" });
var _c4 = () => ({ title: "H\xECnh \u1EA3nh", key: "imagePreview", width: "25%" });
var _c5 = () => ({ title: "Th\u1EDDi gian \u0111\u1ECBnh ngh\u0129a", key: "createdAt", width: "25%" });
var _c6 = () => ({ title: "Thao t\xE1c", key: "action", width: "15%", align: "center" });
var _c7 = (a0, a1, a2, a3) => [a0, a1, a2, a3];
function NhanDienKhuonMatComponent_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "label", 41)(2, "input", 42);
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
    \u0275\u0275element(3, "span", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "img", 44);
    \u0275\u0275elementStart(5, "span", 45);
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
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275element(1, "i", 53);
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
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275text(1, "\u0110ang ch\u1EDD qu\xE9t...");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_ng_template_34_nz_tag_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 55);
    \u0275\u0275text(1, "L\u1ED7i x\u1EED l\xFD t\u1EC7p");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_ng_template_34_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275element(1, "i", 57);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Kh\xF4ng c\xF3 \u1EA3nh khu\xF4n m\u1EB7t");
    \u0275\u0275elementEnd()();
  }
}
function NhanDienKhuonMatComponent_ng_template_34_div_5_div_1_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275element(1, "i", 65);
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_ng_template_34_div_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_34_div_5_div_1_Template_div_click_0_listener() {
      const face_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const data_r5 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleFaceSelection(data_r5, face_r7));
    });
    \u0275\u0275element(1, "img", 61);
    \u0275\u0275template(2, NhanDienKhuonMatComponent_ng_template_34_div_5_div_1_div_2_Template, 2, 0, "div", 62);
    \u0275\u0275elementStart(3, "div", 63);
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
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275template(1, NhanDienKhuonMatComponent_ng_template_34_div_5_div_1_Template, 5, 6, "div", 59);
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
    \u0275\u0275elementStart(0, "div", 46);
    \u0275\u0275template(1, NhanDienKhuonMatComponent_ng_template_34_div_1_Template, 4, 1, "div", 47)(2, NhanDienKhuonMatComponent_ng_template_34_span_2_Template, 2, 0, "span", 48)(3, NhanDienKhuonMatComponent_ng_template_34_nz_tag_3_Template, 2, 0, "nz-tag", 49)(4, NhanDienKhuonMatComponent_ng_template_34_div_4_Template, 4, 0, "div", 50)(5, NhanDienKhuonMatComponent_ng_template_34_div_5_Template, 2, 1, "div", 51);
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
    \u0275\u0275elementStart(0, "span", 66);
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
    \u0275\u0275elementStart(0, "tot-button", 67);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_36_Template_tot_button_click_0_listener($event) {
      const data_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.removeQueueItem(data_r11, $event));
    });
    \u0275\u0275element(1, "i", 68);
    \u0275\u0275text(2, " X\xF3a ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("nzDanger", true);
  }
}
function NhanDienKhuonMatComponent_ng_template_37_nz_tag_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 72);
    \u0275\u0275element(1, "i", 73);
    \u0275\u0275text(2, " \u0110ang t\u1EA3i MediaPipe AI... ");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_ng_template_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275element(1, "i", 70);
    \u0275\u0275text(2, " Danh s\xE1ch file c\u1EE7a phi\xEAn \u0111ang l\xE0m vi\u1EC7c ");
    \u0275\u0275template(3, NhanDienKhuonMatComponent_ng_template_37_nz_tag_3_Template, 3, 0, "nz-tag", 71);
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
    \u0275\u0275element(0, "i", 77);
  }
}
function NhanDienKhuonMatComponent_ng_template_39_tot_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 75);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_39_tot_button_0_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.saveFaceDetectionSession());
    });
    \u0275\u0275template(1, NhanDienKhuonMatComponent_ng_template_39_tot_button_0_i_1_Template, 1, 0, "i", 76);
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
    \u0275\u0275template(0, NhanDienKhuonMatComponent_ng_template_39_tot_button_0_Template, 3, 3, "tot-button", 74);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("ngIf", ctx_r3.queue.length > 0);
  }
}
function NhanDienKhuonMatComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 78)(1, "div", 79);
    \u0275\u0275element(2, "nz-spin", 80);
    \u0275\u0275elementStart(3, "h3", 81);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 82);
    \u0275\u0275element(6, "i", 83);
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
    \u0275\u0275elementStart(0, "div", 86)(1, "span", 87);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "tot-button", 88);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_44_div_0_Template_tot_button_click_3_listener() {
      \u0275\u0275restoreView(_r13);
      const data_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.inlineRenameSession(data_r14));
    });
    \u0275\u0275element(4, "i", 89);
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
    \u0275\u0275elementStart(0, "div", 90)(1, "input", 91);
    \u0275\u0275twoWayListener("ngModelChange", function NhanDienKhuonMatComponent_ng_template_44_div_1_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r15);
      const data_r14 = \u0275\u0275nextContext().$implicit;
      \u0275\u0275twoWayBindingSet(data_r14.tempName, $event) || (data_r14.tempName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "tot-button", 92);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_44_div_1_Template_tot_button_click_2_listener() {
      \u0275\u0275restoreView(_r15);
      const data_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.saveInlineRename(data_r14));
    });
    \u0275\u0275element(3, "i", 93);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "tot-button", 94);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_44_div_1_Template_tot_button_click_4_listener() {
      \u0275\u0275restoreView(_r15);
      const data_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.cancelInlineRename(data_r14));
    });
    \u0275\u0275element(5, "i", 95);
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
    \u0275\u0275template(0, NhanDienKhuonMatComponent_ng_template_44_div_0_Template, 5, 1, "div", 84)(1, NhanDienKhuonMatComponent_ng_template_44_div_1_Template, 6, 1, "div", 85);
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
    \u0275\u0275elementStart(0, "nz-tag", 96);
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
    \u0275\u0275elementStart(0, "nz-tag", 97);
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
    \u0275\u0275elementStart(0, "div", 98)(1, "tot-button", 92);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_47_Template_tot_button_click_1_listener() {
      const data_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openSessionDetails(data_r19));
    });
    \u0275\u0275element(2, "i", 99);
    \u0275\u0275text(3, " Xem Chi Ti\u1EBFt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "tot-button", 94);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_47_Template_tot_button_click_4_listener() {
      const data_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.selectFaceDefinition(data_r19));
    });
    \u0275\u0275element(5, "i", 100);
    \u0275\u0275text(6, " Ch\u1ECDn \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "tot-button", 101);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_47_Template_tot_button_click_7_listener($event) {
      const data_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.deleteSession(data_r19, $event));
    });
    \u0275\u0275element(8, "i", 68);
    \u0275\u0275text(9, " X\xF3a ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275property("nzDanger", true);
  }
}
function NhanDienKhuonMatComponent_ng_template_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275element(1, "i", 102);
    \u0275\u0275text(2, " L\u1ECBch S\u1EED C\xE1c Phi\xEAn Upload");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_ng_template_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 103);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_ng_template_50_Template_tot_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.loadSessionsHistory());
    });
    \u0275\u0275element(1, "i", 104);
    \u0275\u0275text(2, " L\xE0m m\u1EDBi l\u1ECBch s\u1EED ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("loading", ctx_r3.loadingSessions);
  }
}
function NhanDienKhuonMatComponent_div_52_ng_template_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 113);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r22 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(data_r22.fileName);
  }
}
function NhanDienKhuonMatComponent_div_52_ng_template_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114);
    \u0275\u0275element(1, "img", 115);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r23 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", data_r23.url, \u0275\u0275sanitizeUrl);
  }
}
function NhanDienKhuonMatComponent_div_52_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 116)(1, "tot-autocomplete", 117);
    \u0275\u0275twoWayListener("ngModelChange", function NhanDienKhuonMatComponent_div_52_ng_template_15_Template_tot_autocomplete_ngModelChange_1_listener($event) {
      const data_r25 = \u0275\u0275restoreView(_r24).$implicit;
      \u0275\u0275twoWayBindingSet(data_r25.selectedUserId, $event) || (data_r25.selectedUserId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "tot-button", 118);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_div_52_ng_template_15_Template_tot_button_click_2_listener() {
      const data_r25 = \u0275\u0275restoreView(_r24).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.addFaceDefinition(data_r25));
    });
    \u0275\u0275element(3, "i", 119);
    \u0275\u0275text(4, " G\xE1n cho user ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "tot-button", 120);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_div_52_ng_template_15_Template_tot_button_click_5_listener() {
      const data_r25 = \u0275\u0275restoreView(_r24).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.viewUserDefinitions(data_r25.selectedUserId));
    });
    \u0275\u0275element(6, "i", 121);
    \u0275\u0275text(7, " Xem user \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r25 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("apiUrl", "/api/face-detection/users")("labelField", "displayName")("valueField", "id");
    \u0275\u0275twoWayProperty("ngModel", data_r25.selectedUserId);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !data_r25.selectedUserId);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !data_r25.selectedUserId);
  }
}
function NhanDienKhuonMatComponent_div_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 105)(1, "div", 106)(2, "div", 107)(3, "span", 69);
    \u0275\u0275element(4, "i", 108);
    \u0275\u0275text(5, " \u0110\u1ECBnh Ngh\u0129a Khu\xF4n M\u1EB7t Cho Phi\xEAn: ");
    \u0275\u0275elementStart(6, "strong", 109);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 107)(9, "tot-button", 94);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_div_52_Template_tot_button_click_9_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.selectedSessionForDef = null);
    });
    \u0275\u0275element(10, "i", 95);
    \u0275\u0275text(11, " \u0110\xF3ng v\xF9ng l\xE0m vi\u1EC7c ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tot-table", 110);
    \u0275\u0275template(13, NhanDienKhuonMatComponent_div_52_ng_template_13_Template, 2, 1, "ng-template", 111)(14, NhanDienKhuonMatComponent_div_52_ng_template_14_Template, 2, 1, "ng-template", 112)(15, NhanDienKhuonMatComponent_div_52_ng_template_15_Template, 8, 6, "ng-template", 30);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzJustify", "space-between")("nzAlign", "middle");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r3.selectedSessionForDef.name);
    \u0275\u0275advance(5);
    \u0275\u0275property("data", ctx_r3.sessionImagesForDef)("columns", ctx_r3.faceDefColumns)("loading", ctx_r3.loadingSessionImages)("nzSize", "middle")("frontPagination", true)("showPagination", ctx_r3.sessionImagesForDef.length > 5)("pageSize", 5);
  }
}
function NhanDienKhuonMatComponent_div_54_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 125);
    \u0275\u0275element(1, "nz-spin", 80);
    \u0275\u0275elementStart(2, "p", 126);
    \u0275\u0275text(3, "\u0110ang t\u1EA3i c\u1EA5u tr\xFAc t\u1EC7p t\u1EEB server...");
    \u0275\u0275elementEnd()();
  }
}
function NhanDienKhuonMatComponent_div_54_div_2_div_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 143);
    \u0275\u0275text(1, " Kh\xF4ng c\xF3 khu\xF4n m\u1EB7t n\xE0o \u0111\u01B0\u1EE3c l\u01B0u trong t\u1EC7p \u1EA3nh n\xE0y ");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_div_54_div_2_div_1_div_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 144)(1, "div", 145)(2, "div", 146);
    \u0275\u0275element(3, "img", 147);
    \u0275\u0275elementStart(4, "tot-button", 148);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_div_54_div_2_div_1_div_25_Template_tot_button_click_4_listener() {
      const face_r29 = \u0275\u0275restoreView(_r28).$implicit;
      const img_r27 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.deleteDetailCroppedFace(face_r29, img_r27));
    });
    \u0275\u0275element(5, "i", 149);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 150)(7, "span", 151);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const face_r29 = ctx.$implicit;
    \u0275\u0275property("nzXs", 12)("nzSm", 8)("nzMd", 6);
    \u0275\u0275advance(3);
    \u0275\u0275property("src", face_r29.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("nzDanger", true);
    \u0275\u0275advance(3);
    \u0275\u0275property("nzTooltipTitle", face_r29.boundingBox);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("BBox: ", face_r29.boundingBox);
  }
}
function NhanDienKhuonMatComponent_div_54_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 129)(1, "div", 106)(2, "div", 107)(3, "span", 130);
    \u0275\u0275element(4, "i", 131);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "nz-tag", 132);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 133);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 107)(12, "tot-button", 101);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_div_54_div_2_div_1_Template_tot_button_click_12_listener() {
      const img_r27 = \u0275\u0275restoreView(_r26).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.deleteDetailOriginalImage(img_r27));
    });
    \u0275\u0275element(13, "i", 68);
    \u0275\u0275text(14, " X\xF3a \u1EA3nh g\u1ED1c & crops ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 134)(16, "div", 135)(17, "div", 136);
    \u0275\u0275element(18, "img", 137);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 138)(20, "div", 139)(21, "h4", 140);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, NhanDienKhuonMatComponent_div_54_div_2_div_1_div_23_Template, 2, 0, "div", 141);
    \u0275\u0275elementStart(24, "div", 134);
    \u0275\u0275template(25, NhanDienKhuonMatComponent_div_54_div_2_div_1_div_25_Template, 9, 7, "div", 142);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const img_r27 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("nzJustify", "space-between")("nzAlign", "middle");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", img_r27.fileName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("K\xEDch th\u01B0\u1EDBc: ", ctx_r3.formatBytes(img_r27.size));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 16, img_r27.createdAt, "dd/MM/yyyy HH:mm:ss"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzDanger", true);
    \u0275\u0275advance(3);
    \u0275\u0275property("nzGutter", 24);
    \u0275\u0275advance();
    \u0275\u0275property("nzXs", 24)("nzMd", 8);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", img_r27.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("nzXs", 24)("nzMd", 16);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Khu\xF4n m\u1EB7t \u0111\xE3 tr\xEDch xu\u1EA5t (", img_r27.croppedFaces.length, ")");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", img_r27.croppedFaces.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("nzGutter", \u0275\u0275pureFunction0(19, _c2));
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", img_r27.croppedFaces);
  }
}
function NhanDienKhuonMatComponent_div_54_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 127);
    \u0275\u0275template(1, NhanDienKhuonMatComponent_div_54_div_2_div_1_Template, 26, 20, "div", 128);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.selectedSessionDetails.images);
  }
}
function NhanDienKhuonMatComponent_div_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 122);
    \u0275\u0275template(1, NhanDienKhuonMatComponent_div_54_div_1_Template, 4, 0, "div", 123)(2, NhanDienKhuonMatComponent_div_54_div_2_Template, 2, 1, "div", 124);
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
function NhanDienKhuonMatComponent_div_56_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 155);
    \u0275\u0275element(1, "nz-spin", 80);
    \u0275\u0275elementStart(2, "p", 126);
    \u0275\u0275text(3, "\u0110ang t\u1EA3i danh s\xE1ch \u0111\u1ECBnh ngh\u0129a...");
    \u0275\u0275elementEnd()();
  }
}
function NhanDienKhuonMatComponent_div_56_div_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 165);
    \u0275\u0275element(1, "img", 166);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r3.selectedUserDefData.user.avatarUrl, \u0275\u0275sanitizeUrl);
  }
}
function NhanDienKhuonMatComponent_div_56_div_2_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 167);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (ctx_r3.selectedUserDefData.user.displayName || ctx_r3.selectedUserDefData.user.username)[0].toUpperCase(), " ");
  }
}
function NhanDienKhuonMatComponent_div_56_div_2_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 168);
    \u0275\u0275text(1, " Ch\u01B0a c\xF3 h\xECnh \u1EA3nh nh\u1EADn di\u1EC7n khu\xF4n m\u1EB7t n\xE0o \u0111\u01B0\u1EE3c \u0111\u1ECBnh ngh\u0129a cho user n\xE0y. ");
    \u0275\u0275elementEnd();
  }
}
function NhanDienKhuonMatComponent_div_56_div_2_tot_table_11_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 113);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r30 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((data_r30.image == null ? null : data_r30.image.fileName) || "\u1EA2nh g\u1ED1c");
  }
}
function NhanDienKhuonMatComponent_div_56_div_2_tot_table_11_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 171);
    \u0275\u0275element(1, "img", 115);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r31 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", data_r31.image == null ? null : data_r31.image.url, \u0275\u0275sanitizeUrl);
  }
}
function NhanDienKhuonMatComponent_div_56_div_2_tot_table_11_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 161);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const data_r32 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, data_r32.createdAt, "dd/MM/yyyy HH:mm"));
  }
}
function NhanDienKhuonMatComponent_div_56_div_2_tot_table_11_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tot-button", 67);
    \u0275\u0275listener("click", function NhanDienKhuonMatComponent_div_56_div_2_tot_table_11_ng_template_4_Template_tot_button_click_0_listener() {
      const data_r34 = \u0275\u0275restoreView(_r33).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r3.deleteUserFaceDefinition(data_r34.id));
    });
    \u0275\u0275element(1, "i", 68);
    \u0275\u0275text(2, " X\xF3a ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("nzDanger", true);
  }
}
function NhanDienKhuonMatComponent_div_56_div_2_tot_table_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tot-table", 169);
    \u0275\u0275template(1, NhanDienKhuonMatComponent_div_56_div_2_tot_table_11_ng_template_1_Template, 2, 1, "ng-template", 111)(2, NhanDienKhuonMatComponent_div_56_div_2_tot_table_11_ng_template_2_Template, 2, 1, "ng-template", 112)(3, NhanDienKhuonMatComponent_div_56_div_2_tot_table_11_ng_template_3_Template, 3, 4, "ng-template", 170)(4, NhanDienKhuonMatComponent_div_56_div_2_tot_table_11_ng_template_4_Template, 3, 1, "ng-template", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275property("data", ctx_r3.selectedUserDefData.definitions)("columns", \u0275\u0275pureFunction4(9, _c7, \u0275\u0275pureFunction0(5, _c3), \u0275\u0275pureFunction0(6, _c4), \u0275\u0275pureFunction0(7, _c5), \u0275\u0275pureFunction0(8, _c6)))("nzSize", "middle")("frontPagination", true)("pageSize", 5);
  }
}
function NhanDienKhuonMatComponent_div_56_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 156)(1, "div", 157);
    \u0275\u0275template(2, NhanDienKhuonMatComponent_div_56_div_2_div_2_Template, 2, 1, "div", 158)(3, NhanDienKhuonMatComponent_div_56_div_2_div_3_Template, 2, 1, "div", 159);
    \u0275\u0275elementStart(4, "div")(5, "h4", 160);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 161);
    \u0275\u0275element(8, "i", 162);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(10, NhanDienKhuonMatComponent_div_56_div_2_div_10_Template, 2, 0, "div", 163)(11, NhanDienKhuonMatComponent_div_56_div_2_tot_table_11_Template, 5, 14, "tot-table", 164);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.selectedUserDefData.user.avatarUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r3.selectedUserDefData.user.avatarUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r3.selectedUserDefData.user.displayName, " (", ctx_r3.selectedUserDefData.user.username, ")");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Email: ", ctx_r3.selectedUserDefData.user.email);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.selectedUserDefData.definitions.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.selectedUserDefData.definitions.length > 0);
  }
}
function NhanDienKhuonMatComponent_div_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 152);
    \u0275\u0275template(1, NhanDienKhuonMatComponent_div_56_div_1_Template, 4, 0, "div", 153)(2, NhanDienKhuonMatComponent_div_56_div_2_Template, 12, 7, "div", 154);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.loadingUserDefs);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r3.loadingUserDefs && ctx_r3.selectedUserDefData);
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
    this.selectedSessionForDef = null;
    this.sessionImagesForDef = [];
    this.loadingSessionImages = false;
    this.faceDefColumns = [];
    this.showUserDefModal = false;
    this.selectedUserDefData = null;
    this.loadingUserDefs = false;
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
      { title: "H\xE0nh \u0111\u1ED9ng", key: "action", width: "320px", right: true }
    ];
    this.faceDefColumns = [
      { title: "T\xEAn \u1EA3nh g\u1ED1c", key: "fileName", width: "25%" },
      { title: "H\xECnh \u1EA3nh", key: "imagePreview", width: "20%" },
      { title: "H\xE0nh \u0111\u1ED9ng \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t", key: "action", width: "55%" }
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
    const input2 = event.target;
    if (input2.files) {
      this.addFilesToQueue(Array.from(input2.files));
      input2.value = "";
    }
  }
  onFolderSelected(event) {
    const input2 = event.target;
    if (input2.files) {
      this.addFilesToQueue(Array.from(input2.files));
      input2.value = "";
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
  // --- Face Definition Actions ---
  async selectFaceDefinition(session) {
    this.selectedSessionForDef = session;
    this.loadingSessionImages = true;
    this.sessionImagesForDef = [];
    setTimeout(() => {
      const element = document.querySelector(".face-def-panel");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    try {
      const details = await this.api.getSessionDetails(session.id);
      this.sessionImagesForDef = ((details == null ? void 0 : details.images) || []).map((img) => __spreadProps(__spreadValues({}, img), {
        selectedUserId: null
      }));
    } catch (error) {
      this.message.error("L\u1ED7i khi t\u1EA3i danh s\xE1ch \u1EA3nh c\u1EE7a phi\xEAn upload.");
      this.selectedSessionForDef = null;
    } finally {
      this.loadingSessionImages = false;
    }
  }
  async addFaceDefinition(image, force = false) {
    var _a;
    if (!image.selectedUserId) {
      this.message.warning("Vui l\xF2ng ch\u1ECDn user tr\u01B0\u1EDBc.");
      return;
    }
    try {
      const res = await this.api.addFaceDefinition(image.selectedUserId, image.id, force);
      this.message.success("\u0110\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t cho user th\xE0nh c\xF4ng.");
    } catch (error) {
      if (error.status === 409) {
        const errorData = error.error;
        this.modal.confirm({
          nzTitle: "X\xE1c nh\u1EADn g\xE1n \u0111\xE8 \u0111\u1ECBnh ngh\u0129a?",
          nzContent: errorData.message || "\u1EA2nh n\xE0y \u0111\xE3 \u0111\u01B0\u1EE3c \u0111\u1ECBnh ngh\u0129a cho user kh\xE1c. B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n g\xE1n \u0111\xE8 cho user hi\u1EC7n t\u1EA1i kh\xF4ng?",
          nzOkText: "\u0110\u1ED3ng \xFD",
          nzCancelText: "H\u1EE7y",
          nzOkDanger: true,
          nzOnOk: () => {
            this.addFaceDefinition(image, true);
          }
        });
      } else {
        this.message.error(((_a = error.error) == null ? void 0 : _a.message) || "L\u1ED7i khi \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t.");
      }
    }
  }
  async viewUserDefinitions(userId) {
    if (!userId) {
      this.message.warning("Vui l\xF2ng ch\u1ECDn user tr\u01B0\u1EDBc.");
      return;
    }
    this.loadingUserDefs = true;
    this.showUserDefModal = true;
    this.selectedUserDefData = null;
    try {
      const res = await this.api.getUserDefinitions(userId);
      this.selectedUserDefData = res;
    } catch (error) {
      this.message.error("L\u1ED7i khi t\u1EA3i danh s\xE1ch khu\xF4n m\u1EB7t \u0111\u1ECBnh ngh\u0129a c\u1EE7a user.");
      this.showUserDefModal = false;
    } finally {
      this.loadingUserDefs = false;
    }
  }
  async deleteUserFaceDefinition(defId) {
    this.modal.confirm({
      nzTitle: "X\xE1c nh\u1EADn x\xF3a \u1EA3nh kh\u1ECFi user?",
      nzContent: "H\xE0nh \u0111\u1ED9ng n\xE0y s\u1EBD g\u1EE1 \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t n\xE0y kh\u1ECFi user.",
      nzOkDanger: true,
      nzOnOk: async () => {
        var _a;
        try {
          await this.api.deleteFaceDefinition(defId);
          this.message.success("X\xF3a \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t th\xE0nh c\xF4ng.");
          if ((_a = this.selectedUserDefData) == null ? void 0 : _a.definitions) {
            this.selectedUserDefData.definitions = this.selectedUserDefData.definitions.filter((d) => d.id !== defId);
          }
        } catch (error) {
          this.message.error("L\u1ED7i khi x\xF3a \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t.");
        }
      }
    });
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
}, decls: 57, vars: 43, consts: [["fileInput", ""], ["folderInput", ""], ["activeTableTitleTpl", ""], ["activeTableExtraTpl", ""], ["tableTitleTpl", ""], ["tableExtraTpl", ""], [1, "face-recognition-container"], [1, "workspace-header", 2, "margin-bottom", "24px", "border-bottom", "1px solid #f0f0f0", "padding-bottom", "16px"], [1, "gradient-title", 2, "font-size", "24px", "font-weight", "600", "margin", "0", "color", "#262626"], ["nz-icon", "", "nzType", "scan", "nzTheme", "outline", 2, "color", "#1890ff", "margin-right", "8px"], [1, "subtitle", 2, "color", "#8c8c8c", "margin", "4px 0 0 0", "font-size", "13px"], ["nz-row", "", 2, "margin-bottom", "24px", 3, "nzGutter"], ["nz-col", "", 3, "nzXs", "nzLg"], ["nzTitle", "Nh\u1EADp t\xEAn phi\xEAn \u0111ang l\xE0m vi\u1EC7c", 2, "height", "100%", "border-radius", "8px", 3, "nzBordered"], ["nz-input", "", "placeholder", "Nh\u1EADp t\xEAn phi\xEAn l\xE0m vi\u1EC7c...", 2, "border-radius", "6px", 3, "ngModelChange", "ngModel", "disabled"], ["nz-col", "", 3, "nzXs", "nzMd", "nzLg"], [1, "dropzone-card", "file-zone", 2, "border", "2px dashed #1890ff", "border-radius", "8px", "padding", "20px", "text-align", "center", "cursor", "pointer", "background", "#fafafa", "height", "100%", "display", "flex", "flex-direction", "column", "justify-content", "center", "align-items", "center", "min-height", "116px", "transition", "background 0.3s", 3, "dragover", "drop", "click"], [1, "dropzone-content"], ["nz-icon", "", "nzType", "file-image", 1, "drop-icon", 2, "font-size", "28px", "color", "#1890ff", "margin-bottom", "8px"], [1, "drop-text", 2, "font-weight", "600", "margin", "0", "font-size", "14px", "color", "#262626"], [1, "drop-subtext", 2, "font-size", "12px", "color", "#8c8c8c", "display", "block", "margin-top", "4px"], ["type", "file", "multiple", "", 2, "display", "none", 3, "change"], [1, "dropzone-card", "folder-zone", 2, "border", "2px dashed #722ed1", "border-radius", "8px", "padding", "20px", "text-align", "center", "cursor", "pointer", "background", "#fafafa", "height", "100%", "display", "flex", "flex-direction", "column", "justify-content", "center", "align-items", "center", "min-height", "116px", "transition", "background 0.3s", 3, "dragover", "drop", "click"], ["nz-icon", "", "nzType", "folder-open", 1, "drop-icon", 2, "font-size", "28px", "color", "#722ed1", "margin-bottom", "8px"], ["type", "file", "webkitdirectory", "", "directory", "", "multiple", "", 2, "display", "none", 3, "change"], [2, "margin-bottom", "24px", "position", "relative"], [1, "active-session-table", 3, "pageIndexChange", "pageSizeChange", "data", "columns", "loading", "nzSize", "frontPagination", "showPagination", "total", "pageIndex", "pageSize", "title", "extra"], ["totCell", "name"], ["totCell", "detectedFaces"], ["totCell", "simulatedPath"], ["totCell", "action"], ["class", "progress-bar-overlay", "style", "position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255, 255, 255, 0.85); display: flex; justify-content: center; align-items: center; z-index: 10;", 4, "ngIf"], [1, "workspace-card", "history-panel", 2, "margin-bottom", "24px"], [3, "pageIndexChange", "pageSizeChange", "data", "columns", "loading", "nzSize", "frontPagination", "total", "pageIndex", "pageSize", "title", "extra"], ["totCell", "imageCount"], ["totCell", "faceCount"], ["class", "workspace-card face-def-panel", "style", "margin-bottom: 24px; border: 1px solid #1890ff; border-radius: 8px; padding: 20px; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);", 4, "ngIf"], [1, "premium-modal", 3, "nzVisibleChange", "nzOnCancel", "nzVisible", "nzTitle", "nzWidth", "nzFooter"], ["class", "modal-content-wrapper", "style", "padding: 12px 0;", 4, "nzModalContent"], ["style", "padding: 12px 0;", 4, "nzModalContent"], [1, "file-name-cell", 2, "display", "flex", "align-items", "center", "gap", "12px"], [1, "custom-checkbox", 2, "position", "relative", "display", "inline-block", "width", "16px", "height", "16px", "cursor", "pointer", "user-select", "none"], ["type", "checkbox", 2, "position", "absolute", "opacity", "0", "cursor", "pointer", "height", "0", "width", "0", 3, "ngModelChange", "change", "ngModel"], [1, "checkmark", 2, "position", "absolute", "top", "0", "left", "0", "height", "16px", "width", "16px", "background-color", "#fff", "border", "1px solid #d9d9d9", "border-radius", "4px"], ["alt", "preview", 1, "table-thumb", 2, "width", "40px", "height", "40px", "border-radius", "6px", "object-fit", "cover", "border", "1px solid #f0f0f0", 3, "src"], ["nz-tooltip", "", 1, "table-file-name", 2, "font-weight", "500", "color", "#262626", "white-space", "nowrap", "overflow", "hidden", "text-overflow", "ellipsis", "max-width", "220px", 3, "nzTooltipTitle"], [1, "detected-faces-cell", 2, "display", "flex", "align-items", "center", "min-height", "40px"], ["class", "scanning-inline", "style", "display: flex; align-items: center; gap: 8px; color: #1890ff; font-weight: 500; font-size: 13px;", 4, "ngIf"], ["class", "text-muted", "style", "color: #bfbfbf; font-style: italic; font-size: 13px;", 4, "ngIf"], ["nzColor", "error", 4, "ngIf"], ["class", "no-faces-label", "style", "display: flex; align-items: center; gap: 6px; color: #fa8c16; font-weight: 500; font-size: 13px; background: #fffbe6; padding: 4px 10px; border-radius: 4px; border: 1px solid #ffe58f;", 4, "ngIf"], ["class", "avatar-crops-inline-grid", "style", "display: flex; gap: 8px; flex-wrap: wrap;", 4, "ngIf"], [1, "scanning-inline", 2, "display", "flex", "align-items", "center", "gap", "8px", "color", "#1890ff", "font-weight", "500", "font-size", "13px"], ["nz-icon", "", "nzType", "loading", 1, "spin-icon"], [1, "text-muted", 2, "color", "#bfbfbf", "font-style", "italic", "font-size", "13px"], ["nzColor", "error"], [1, "no-faces-label", 2, "display", "flex", "align-items", "center", "gap", "6px", "color", "#fa8c16", "font-weight", "500", "font-size", "13px", "background", "#fffbe6", "padding", "4px 10px", "border-radius", "4px", "border", "1px solid #ffe58f"], ["nz-icon", "", "nzType", "info-circle", "nzTheme", "fill", 1, "warning-icon"], [1, "avatar-crops-inline-grid", 2, "display", "flex", "gap", "8px", "flex-wrap", "wrap"], ["class", "avatar-crop-card", "nz-tooltip", "", "style", "position: relative; width: 44px; height: 44px; border-radius: 6px; overflow: hidden; border: 2px solid #f0f0f0; cursor: pointer; transition: all 0.2s; background: #fafafa;", 3, "selected", "nzTooltipTitle", "click", 4, "ngFor", "ngForOf"], ["nz-tooltip", "", 1, "avatar-crop-card", 2, "position", "relative", "width", "44px", "height", "44px", "border-radius", "6px", "overflow", "hidden", "border", "2px solid #f0f0f0", "cursor", "pointer", "transition", "all 0.2s", "background", "#fafafa", 3, "click", "nzTooltipTitle"], ["alt", "face", 2, "width", "100%", "height", "100%", "object-fit", "cover", 3, "src"], ["class", "checkmark-overlay-mini", "style", "position: absolute; top: 2px; right: 2px; font-size: 11px; color: #1890ff;", 4, "ngIf"], [1, "avatar-index-badge", 2, "position", "absolute", "bottom", "2px", "left", "2px", "background", "rgba(0, 0, 0, 0.6)", "color", "#fff", "font-size", "9px", "padding", "1px 3px", "border-radius", "2px"], [1, "checkmark-overlay-mini", 2, "position", "absolute", "top", "2px", "right", "2px", "font-size", "11px", "color", "#1890ff"], ["nz-icon", "", "nzType", "check-circle", "nzTheme", "fill"], [1, "simulated-path", 2, "font-family", "monospace", "font-size", "12px", "color", "#595959", "background", "#fafafa", "padding", "3px 8px", "border-radius", "4px", "border", "1px solid #f0f0f0"], ["nzType", "link", 3, "click", "nzDanger"], ["nz-icon", "", "nzType", "delete"], [1, "card-title", 2, "font-size", "16px", "font-weight", "600", "color", "#262626"], ["nz-icon", "", "nzType", "unordered-list", 2, "margin-right", "8px"], ["nzColor", "processing", "style", "margin-left: 8px;", 4, "ngIf"], ["nzColor", "processing", 2, "margin-left", "8px"], ["nz-icon", "", "nzType", "loading"], ["nzType", "primary", 3, "loading", "disabled", "click", 4, "ngIf"], ["nzType", "primary", 3, "click", "loading", "disabled"], ["nz-icon", "", "nzType", "save", 4, "ngIf"], ["nz-icon", "", "nzType", "save"], [1, "progress-bar-overlay", 2, "position", "absolute", "top", "0", "left", "0", "width", "100%", "height", "100%", "background", "rgba(255, 255, 255, 0.85)", "display", "flex", "justify-content", "center", "align-items", "center", "z-index", "10"], [1, "progress-box", 2, "text-align", "center"], ["nzSimple", "", "nzSize", "large"], [2, "margin-top", "16px", "color", "#1890ff", "font-size", "15px", "font-weight", "500"], [1, "realtime-badge", 2, "font-size", "12px", "color", "#722ed1", "margin", "4px 0 0 0"], ["nz-icon", "", "nzType", "sync", "nzSpin", ""], ["class", "session-name-view", "style", "display: flex; align-items: center; gap: 8px;", 4, "ngIf"], ["class", "session-name-edit", "style", "display: flex; align-items: center; gap: 4px;", 4, "ngIf"], [1, "session-name-view", 2, "display", "flex", "align-items", "center", "gap", "8px"], [1, "s-name", 2, "font-weight", "500", "color", "#262626"], ["nzType", "text", 2, "padding", "0 4px", "color", "#8c8c8c", 3, "click"], ["nz-icon", "", "nzType", "edit"], [1, "session-name-edit", 2, "display", "flex", "align-items", "center", "gap", "4px"], ["nz-input", "", 2, "border-radius", "4px", "width", "180px", "padding", "4px 8px", 3, "ngModelChange", "ngModel"], ["nzType", "primary", "nzSize", "small", 3, "click"], ["nz-icon", "", "nzType", "check"], ["nzType", "default", "nzSize", "small", 3, "click"], ["nz-icon", "", "nzType", "close"], ["nzColor", "blue"], ["nzColor", "purple"], [1, "action-buttons-group", 2, "display", "flex", "gap", "8px"], ["nz-icon", "", "nzType", "eye"], ["nz-icon", "", "nzType", "smile"], ["nzType", "default", "nzSize", "small", 3, "click", "nzDanger"], ["nz-icon", "", "nzType", "history", 2, "margin-right", "8px"], ["nzType", "default", 3, "click", "loading"], ["nz-icon", "", "nzType", "reload"], [1, "workspace-card", "face-def-panel", 2, "margin-bottom", "24px", "border", "1px solid #1890ff", "border-radius", "8px", "padding", "20px", "background", "#fff", "box-shadow", "0 4px 12px rgba(0,0,0,0.05)"], ["nz-row", "", 2, "border-bottom", "1px solid #f0f0f0", "padding-bottom", "12px", "margin-bottom", "16px", 3, "nzJustify", "nzAlign"], ["nz-col", ""], ["nz-icon", "", "nzType", "smile", 2, "margin-right", "8px", "color", "#1890ff"], [2, "color", "#1890ff"], [3, "data", "columns", "loading", "nzSize", "frontPagination", "showPagination", "pageSize"], ["totCell", "fileName"], ["totCell", "imagePreview"], [2, "font-weight", "500", "color", "#262626"], [2, "width", "60px", "height", "60px", "border-radius", "6px", "overflow", "hidden", "border", "1px solid #f0f0f0", "background", "#fafafa", "display", "flex", "justify-content", "center", "align-items", "center"], ["alt", "preview", 2, "max-width", "100%", "max-height", "100%", "object-fit", "contain", 3, "src"], [2, "display", "flex", "align-items", "center", "gap", "12px"], ["placeholder", "T\xECm ch\u1ECDn user...", 2, "width", "220px", "display", "inline-block", 3, "ngModelChange", "apiUrl", "labelField", "valueField", "ngModel"], ["nzType", "primary", "nzSize", "small", 3, "click", "disabled"], ["nz-icon", "", "nzType", "plus"], ["nzType", "default", "nzSize", "small", 3, "click", "disabled"], ["nz-icon", "", "nzType", "solution"], [1, "modal-content-wrapper", 2, "padding", "12px 0"], ["class", "modal-spinner", "style", "text-align: center; padding: 40px 0;", 4, "ngIf"], ["class", "modal-body custom-scrollbar", "style", "max-height: 550px; overflow-y: auto; padding: 0 12px;", 4, "ngIf"], [1, "modal-spinner", 2, "text-align", "center", "padding", "40px 0"], [2, "margin-top", "12px", "color", "#8c8c8c"], [1, "modal-body", "custom-scrollbar", 2, "max-height", "550px", "overflow-y", "auto", "padding", "0 12px"], ["class", "details-image-card", "style", "margin-bottom: 24px; border: 1px solid #f0f0f0; border-radius: 8px; padding: 16px; background: #fff;", 4, "ngFor", "ngForOf"], [1, "details-image-card", 2, "margin-bottom", "24px", "border", "1px solid #f0f0f0", "border-radius", "8px", "padding", "16px", "background", "#fff"], [1, "file-name", 2, "font-weight", "600", "font-size", "15px", "color", "#262626"], ["nz-icon", "", "nzType", "file-image", 2, "color", "#1890ff"], ["nzColor", "blue", 2, "margin-left", "8px"], [1, "upload-time", 2, "color", "#8c8c8c", "font-size", "12px", "margin-left", "8px"], ["nz-row", "", 3, "nzGutter"], ["nz-col", "", 2, "margin-bottom", "16px", 3, "nzXs", "nzMd"], [1, "original-image-preview", 2, "border", "1px solid #f0f0f0", "border-radius", "8px", "overflow", "hidden", "background", "#fafafa", "display", "flex", "justify-content", "center", "align-items", "center", "height", "180px"], ["alt", "original-img", 2, "max-width", "100%", "max-height", "100%", "object-fit", "contain", 3, "src"], ["nz-col", "", 3, "nzXs", "nzMd"], [1, "cropped-faces-detail-panel"], [2, "margin-top", "0", "margin-bottom", "12px", "font-weight", "600", "color", "#262626"], ["class", "no-crops-placeholder", "style", "color: #8c8c8c; font-style: italic; font-size: 13px;", 4, "ngIf"], ["nz-col", "", 3, "nzXs", "nzSm", "nzMd", 4, "ngFor", "ngForOf"], [1, "no-crops-placeholder", 2, "color", "#8c8c8c", "font-style", "italic", "font-size", "13px"], ["nz-col", "", 3, "nzXs", "nzSm", "nzMd"], [1, "detail-crop-avatar-card", 2, "border", "1px solid #f0f0f0", "border-radius", "8px", "padding", "12px", "text-align", "center", "background", "#fafafa", "position", "relative"], [1, "avatar-img-box", 2, "width", "64px", "height", "64px", "border-radius", "50%", "overflow", "hidden", "margin", "0 auto 8px auto", "position", "relative", "border", "2px solid #e6f7ff"], ["alt", "crop-face", 2, "width", "100%", "height", "100%", "object-fit", "cover", 3, "src"], ["nzType", "text", "nz-tooltip", "", "nzTooltipTitle", "X\xF3a \u1EA3nh khu\xF4n m\u1EB7t crop n\xE0y", 1, "delete-avatar-btn", 2, "position", "absolute", "top", "0", "left", "0", "width", "100%", "height", "100%", "background", "rgba(255, 255, 255, 0.7)", "opacity", "0", "display", "flex", "justify-content", "center", "align-items", "center", "transition", "opacity 0.2s", "border", "none", "font-size", "20px", 3, "click", "nzDanger"], ["nz-icon", "", "nzType", "close-circle", "nzTheme", "fill", 2, "color", "#ff4d4f"], [1, "avatar-meta", 2, "font-size", "11px", "color", "#8c8c8c"], ["nz-tooltip", "", 1, "bbox-json", 2, "display", "block", "font-family", "monospace", "overflow", "hidden", "text-overflow", "ellipsis", "white-space", "nowrap", 3, "nzTooltipTitle"], [2, "padding", "12px 0"], ["style", "text-align: center; padding: 40px 0;", 4, "ngIf"], ["style", "max-height: 500px; overflow-y: auto; padding: 0 12px;", 4, "ngIf"], [2, "text-align", "center", "padding", "40px 0"], [2, "max-height", "500px", "overflow-y", "auto", "padding", "0 12px"], [2, "background", "#e6f7ff", "border", "1px solid #91d5ff", "border-radius", "8px", "padding", "12px 16px", "margin-bottom", "20px", "display", "flex", "align-items", "center", "gap", "16px"], ["style", "width: 48px; height: 48px; border-radius: 50%; overflow: hidden; border: 2px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1);", 4, "ngIf"], ["style", "width: 48px; height: 48px; border-radius: 50%; background: #1890ff; color: #fff; display: flex; justify-content: center; align-items: center; font-size: 20px; font-weight: 600;", 4, "ngIf"], [2, "margin", "0", "font-size", "15px", "font-weight", "600", "color", "#262626"], [2, "font-size", "12px", "color", "#595959"], ["nz-icon", "", "nzType", "mail"], ["style", "text-align: center; color: #8c8c8c; padding: 40px 0; font-style: italic;", 4, "ngIf"], [3, "data", "columns", "nzSize", "frontPagination", "pageSize", 4, "ngIf"], [2, "width", "48px", "height", "48px", "border-radius", "50%", "overflow", "hidden", "border", "2px solid #fff", "box-shadow", "0 2px 8px rgba(0,0,0,0.1)"], ["alt", "avatar", 2, "width", "100%", "height", "100%", "object-fit", "cover", 3, "src"], [2, "width", "48px", "height", "48px", "border-radius", "50%", "background", "#1890ff", "color", "#fff", "display", "flex", "justify-content", "center", "align-items", "center", "font-size", "20px", "font-weight", "600"], [2, "text-align", "center", "color", "#8c8c8c", "padding", "40px 0", "font-style", "italic"], [3, "data", "columns", "nzSize", "frontPagination", "pageSize"], ["totCell", "createdAt"], [2, "width", "50px", "height", "50px", "border-radius", "4px", "overflow", "hidden", "border", "1px solid #f0f0f0", "background", "#fafafa", "display", "flex", "justify-content", "center", "align-items", "center"]], template: function NhanDienKhuonMatComponent_Template(rf, ctx) {
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
    \u0275\u0275template(44, NhanDienKhuonMatComponent_ng_template_44_Template, 2, 2, "ng-template", 27)(45, NhanDienKhuonMatComponent_ng_template_45_Template, 2, 1, "ng-template", 34)(46, NhanDienKhuonMatComponent_ng_template_46_Template, 2, 1, "ng-template", 35)(47, NhanDienKhuonMatComponent_ng_template_47_Template, 10, 1, "ng-template", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275template(48, NhanDienKhuonMatComponent_ng_template_48_Template, 3, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor)(50, NhanDienKhuonMatComponent_ng_template_50_Template, 3, 1, "ng-template", null, 5, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275template(52, NhanDienKhuonMatComponent_div_52_Template, 16, 10, "div", 36);
    \u0275\u0275elementStart(53, "nz-modal", 37);
    \u0275\u0275twoWayListener("nzVisibleChange", function NhanDienKhuonMatComponent_Template_nz_modal_nzVisibleChange_53_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.showDetailsModal, $event) || (ctx.showDetailsModal = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function NhanDienKhuonMatComponent_Template_nz_modal_nzOnCancel_53_listener() {
      return ctx.closeDetailsModal();
    });
    \u0275\u0275template(54, NhanDienKhuonMatComponent_div_54_Template, 3, 2, "div", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "nz-modal", 37);
    \u0275\u0275twoWayListener("nzVisibleChange", function NhanDienKhuonMatComponent_Template_nz_modal_nzVisibleChange_55_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.showUserDefModal, $event) || (ctx.showUserDefModal = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function NhanDienKhuonMatComponent_Template_nz_modal_nzOnCancel_55_listener() {
      return ctx.showUserDefModal = false;
    });
    \u0275\u0275template(56, NhanDienKhuonMatComponent_div_56_Template, 3, 2, "div", 39);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const activeTableTitleTpl_r35 = \u0275\u0275reference(38);
    const activeTableExtraTpl_r36 = \u0275\u0275reference(40);
    const tableTitleTpl_r37 = \u0275\u0275reference(49);
    const tableExtraTpl_r38 = \u0275\u0275reference(51);
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
    \u0275\u0275property("data", ctx.paginatedQueue)("columns", ctx.activeColumns)("loading", ctx.loadingDetector)("nzSize", "middle")("frontPagination", false)("showPagination", ctx.queue.length > 0)("total", ctx.queue.length)("pageIndex", ctx.activePageIndex)("pageSize", ctx.activePageSize)("title", activeTableTitleTpl_r35)("extra", activeTableExtraTpl_r36);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx.savingSession);
    \u0275\u0275advance(2);
    \u0275\u0275property("data", ctx.sessionsList)("columns", ctx.historyColumns)("loading", ctx.loadingSessions)("nzSize", "middle")("frontPagination", false)("total", ctx.totalSessions)("pageIndex", ctx.pageIndex)("pageSize", ctx.pageSize)("title", tableTitleTpl_r37)("extra", tableExtraTpl_r38);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", ctx.selectedSessionForDef);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("nzVisible", ctx.showDetailsModal);
    \u0275\u0275property("nzTitle", "S\u01A1 \u0111\u1ED3 chi ti\u1EBFt phi\xEAn: " + ((ctx.selectedSessionDetails == null ? null : ctx.selectedSessionDetails.name) || ""))("nzWidth", 900)("nzFooter", null);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("nzVisible", ctx.showUserDefModal);
    \u0275\u0275property("nzTitle", "Danh s\xE1ch \u1EA3nh \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t: " + ((ctx.selectedUserDefData == null ? null : ctx.selectedUserDefData.user == null ? null : ctx.selectedUserDefData.user.displayName) || (ctx.selectedUserDefData == null ? null : ctx.selectedUserDefData.user == null ? null : ctx.selectedUserDefData.user.username) || ""))("nzWidth", 800)("nzFooter", null);
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
  TotAutocompleteComponent,
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
      TotCellDirective,
      TotAutocompleteComponent
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
          <tot-button nzType="default" nzSize="small" (click)="selectFaceDefinition(data)">
            <i nz-icon nzType="smile"></i> Ch\u1ECDn \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t
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

  <!-- SECTION 4: FACE DEFINITION PANEL (Hi\u1EC3n th\u1ECB khi click n\xFAt Ch\u1ECDn \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t) -->
  <div *ngIf="selectedSessionForDef" class="workspace-card face-def-panel" style="margin-bottom: 24px; border: 1px solid #1890ff; border-radius: 8px; padding: 20px; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div nz-row [nzJustify]="'space-between'" [nzAlign]="'middle'" style="border-bottom: 1px solid #f0f0f0; padding-bottom: 12px; margin-bottom: 16px;">
      <div nz-col>
        <span class="card-title" style="font-size: 16px; font-weight: 600; color: #262626;">
          <i nz-icon nzType="smile" style="margin-right: 8px; color: #1890ff;"></i> \u0110\u1ECBnh Ngh\u0129a Khu\xF4n M\u1EB7t Cho Phi\xEAn: <strong style="color: #1890ff;">{{ selectedSessionForDef.name }}</strong>
        </span>
      </div>
      <div nz-col>
        <tot-button nzType="default" nzSize="small" (click)="selectedSessionForDef = null">
          <i nz-icon nzType="close"></i> \u0110\xF3ng v\xF9ng l\xE0m vi\u1EC7c
        </tot-button>
      </div>
    </div>

    <tot-table 
      [data]="sessionImagesForDef" 
      [columns]="faceDefColumns" 
      [loading]="loadingSessionImages" 
      [nzSize]="'middle'"
      [frontPagination]="true"
      [showPagination]="sessionImagesForDef.length > 5"
      [pageSize]="5"
    >
      <ng-template totCell="fileName" let-data>
        <span style="font-weight: 500; color: #262626;">{{ data.fileName }}</span>
      </ng-template>

      <ng-template totCell="imagePreview" let-data>
        <div style="width: 60px; height: 60px; border-radius: 6px; overflow: hidden; border: 1px solid #f0f0f0; background: #fafafa; display: flex; justify-content: center; align-items: center;">
          <img [src]="data.url" alt="preview" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>
      </ng-template>

      <ng-template totCell="action" let-data>
        <div style="display: flex; align-items: center; gap: 12px;">
          <!-- Autocomplete user -->
          <tot-autocomplete
            [apiUrl]="'/api/face-detection/users'"
            [labelField]="'displayName'"
            [valueField]="'id'"
            [(ngModel)]="data.selectedUserId"
            placeholder="T\xECm ch\u1ECDn user..."
            style="width: 220px; display: inline-block;"
          ></tot-autocomplete>

          <!-- Add definition button -->
          <tot-button 
            nzType="primary" 
            nzSize="small" 
            [disabled]="!data.selectedUserId" 
            (click)="addFaceDefinition(data)"
          >
            <i nz-icon nzType="plus"></i> G\xE1n cho user
          </tot-button>

          <!-- View definitions button -->
          <tot-button 
            nzType="default" 
            nzSize="small" 
            [disabled]="!data.selectedUserId" 
            (click)="viewUserDefinitions(data.selectedUserId)"
          >
            <i nz-icon nzType="solution"></i> Xem user \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t
          </tot-button>
        </div>
      </ng-template>
    </tot-table>
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

  <!-- MODAL SHOW DANH S\xC1CH KHU\xD4N M\u1EB6T \u0110\u1ECANH NGH\u0128A C\u1EE6A USER -->
  <nz-modal [(nzVisible)]="showUserDefModal" 
            [nzTitle]="'Danh s\xE1ch \u1EA3nh \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t: ' + (selectedUserDefData?.user?.displayName || selectedUserDefData?.user?.username || '')" 
            [nzWidth]="800" 
            (nzOnCancel)="showUserDefModal = false" 
            [nzFooter]="null"
            class="premium-modal">
    <div *nzModalContent style="padding: 12px 0;">
      <div *ngIf="loadingUserDefs" style="text-align: center; padding: 40px 0;">
        <nz-spin nzSimple nzSize="large"></nz-spin>
        <p style="margin-top: 12px; color: #8c8c8c;">\u0110ang t\u1EA3i danh s\xE1ch \u0111\u1ECBnh ngh\u0129a...</p>
      </div>

      <div *ngIf="!loadingUserDefs && selectedUserDefData" style="max-height: 500px; overflow-y: auto; padding: 0 12px;">
        <!-- User Info Panel -->
        <div style="background: #e6f7ff; border: 1px solid #91d5ff; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; display: flex; align-items: center; gap: 16px;">
          <div *ngIf="selectedUserDefData.user.avatarUrl" style="width: 48px; height: 48px; border-radius: 50%; overflow: hidden; border: 2px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <img [src]="selectedUserDefData.user.avatarUrl" alt="avatar" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div *ngIf="!selectedUserDefData.user.avatarUrl" style="width: 48px; height: 48px; border-radius: 50%; background: #1890ff; color: #fff; display: flex; justify-content: center; align-items: center; font-size: 20px; font-weight: 600;">
            {{ (selectedUserDefData.user.displayName || selectedUserDefData.user.username)[0].toUpperCase() }}
          </div>
          <div>
            <h4 style="margin: 0; font-size: 15px; font-weight: 600; color: #262626;">{{ selectedUserDefData.user.displayName }} ({{ selectedUserDefData.user.username }})</h4>
            <span style="font-size: 12px; color: #595959;"><i nz-icon nzType="mail"></i> Email: {{ selectedUserDefData.user.email }}</span>
          </div>
        </div>

        <!-- Face list table -->
        <div *ngIf="selectedUserDefData.definitions.length === 0" style="text-align: center; color: #8c8c8c; padding: 40px 0; font-style: italic;">
          Ch\u01B0a c\xF3 h\xECnh \u1EA3nh nh\u1EADn di\u1EC7n khu\xF4n m\u1EB7t n\xE0o \u0111\u01B0\u1EE3c \u0111\u1ECBnh ngh\u0129a cho user n\xE0y.
        </div>

        <tot-table 
          *ngIf="selectedUserDefData.definitions.length > 0"
          [data]="selectedUserDefData.definitions" 
          [columns]="[
            { title: 'T\xEAn file \u1EA3nh g\u1ED1c', key: 'fileName', width: '35%' },
            { title: 'H\xECnh \u1EA3nh', key: 'imagePreview', width: '25%' },
            { title: 'Th\u1EDDi gian \u0111\u1ECBnh ngh\u0129a', key: 'createdAt', width: '25%' },
            { title: 'Thao t\xE1c', key: 'action', width: '15%', align: 'center' }
          ]"
          [nzSize]="'middle'"
          [frontPagination]="true"
          [pageSize]="5"
        >
          <ng-template totCell="fileName" let-data>
            <span style="font-weight: 500; color: #262626;">{{ data.image?.fileName || '\u1EA2nh g\u1ED1c' }}</span>
          </ng-template>

          <ng-template totCell="imagePreview" let-data>
            <div style="width: 50px; height: 50px; border-radius: 4px; overflow: hidden; border: 1px solid #f0f0f0; background: #fafafa; display: flex; justify-content: center; align-items: center;">
              <img [src]="data.image?.url" alt="preview" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            </div>
          </ng-template>

          <ng-template totCell="createdAt" let-data>
            <span style="font-size: 12px; color: #595959;">{{ data.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
          </ng-template>

          <ng-template totCell="action" let-data>
            <tot-button nzType="link" [nzDanger]="true" (click)="deleteUserFaceDefinition(data.id)">
              <i nz-icon nzType="delete"></i> X\xF3a
            </tot-button>
          </ng-template>
        </tot-table>
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NhanDienKhuonMatComponent, { className: "NhanDienKhuonMatComponent", filePath: "projects/tot/nhan-dien-khuon-mat/src/lib/nhan-dien-khuon-mat.component.ts", lineNumber: 64 });
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-badge.mjs
function NzBadgeSupComponent_Conditional_0_For_1_Conditional_1_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = ctx.$implicit;
    const \u0275$index_2_r2 = \u0275\u0275nextContext(2).$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("current", p_r1 === ctx_r2.countArray[\u0275$index_2_r2]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r1, " ");
  }
}
function NzBadgeSupComponent_Conditional_0_For_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, NzBadgeSupComponent_Conditional_0_For_1_Conditional_1_For_1_Template, 2, 3, "p", 2, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275repeater(ctx_r2.countSingleArray);
  }
}
function NzBadgeSupComponent_Conditional_0_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 1);
    \u0275\u0275conditionalCreate(1, NzBadgeSupComponent_Conditional_0_For_1_Conditional_1_Template, 2, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_2_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("transform", "translateY(" + -ctx_r2.countArray[\u0275$index_2_r2] * 100 + "%)");
    \u0275\u0275property("nzNoAnimation", !!(ctx_r2.noAnimation == null ? null : ctx_r2.noAnimation.nzNoAnimation == null ? null : ctx_r2.noAnimation.nzNoAnimation()));
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r2.nzDot && ctx_r2.countArray[\u0275$index_2_r2] !== void 0 ? 1 : -1);
  }
}
function NzBadgeSupComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, NzBadgeSupComponent_Conditional_0_For_1_Template, 2, 4, "span", 0, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.maxNumberArray);
  }
}
function NzBadgeSupComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r2.nzOverflowCount, "+ ");
  }
}
var _c03 = ["*"];
function NzBadgeComponent_Conditional_0_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzText);
  }
}
function NzBadgeComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 1);
    \u0275\u0275elementStart(1, "span", 2);
    \u0275\u0275template(2, NzBadgeComponent_Conditional_0_ng_container_2_Template, 2, 1, "ng-container", 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r0.mergedStyle);
    \u0275\u0275classMap((ctx_r0.nzStatus || ctx_r0.presetColor) && "ant-badge-status-" + (ctx_r0.nzStatus || ctx_r0.presetColor));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzText);
  }
}
function NzBadgeComponent_ng_container_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-badge-sup", 3);
    \u0275\u0275animateLeave(function NzBadgeComponent_ng_container_2_Conditional_1_Template_animateleave_cb() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.supAnimationLeave());
    });
    \u0275\u0275animateEnter(function NzBadgeComponent_ng_container_2_Conditional_1_Template_animateenter_cb() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.supAnimationEnter());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("isPresetColor", ctx_r0.nzStatus || ctx_r0.presetColor)("nzColor", ctx_r0.nzStatus || ctx_r0.presetColor || ctx_r0.nzColor)("nzOffset", ctx_r0.nzOffset)("nzSize", ctx_r0.nzSize)("nzTitle", ctx_r0.nzTitle)("nzStyle", ctx_r0.mergedStyle)("nzDot", ctx_r0.nzDot)("nzCount", ctx_r0.nzCount)("nzOverflowCount", ctx_r0.nzOverflowCount);
  }
}
function NzBadgeComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275conditionalCreate(1, NzBadgeComponent_ng_container_2_Conditional_1_Template, 1, 9, "nz-badge-sup", 3);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showSup ? 1 : -1);
  }
}
function NzRibbonComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 3);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.nzText);
  }
}
var _NzBadgeSupComponent = class _NzBadgeSupComponent {
  constructor() {
    __publicField(this, "noAnimation", inject(NzNoAnimationDirective, {
      host: true,
      optional: true
    }));
    __publicField(this, "nzOffset");
    __publicField(this, "nzTitle");
    __publicField(this, "nzStyle", null);
    __publicField(this, "nzDot", false);
    __publicField(this, "nzOverflowCount", 99);
    __publicField(this, "nzCount");
    __publicField(this, "nzSize", "default");
    __publicField(this, "isPresetColor", false);
    __publicField(this, "nzColor");
    __publicField(this, "maxNumberArray", []);
    __publicField(this, "countArray", []);
    __publicField(this, "count", 0);
    __publicField(this, "countSingleArray", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }
  generateMaxNumberArray() {
    this.maxNumberArray = this.nzOverflowCount.toString().split("").map((value, index) => `${value}-${index}`);
  }
  ngOnInit() {
    this.generateMaxNumberArray();
  }
  ngOnChanges(changes) {
    const {
      nzOverflowCount,
      nzCount
    } = changes;
    if (nzCount && typeof nzCount.currentValue === "number") {
      this.count = Math.max(0, nzCount.currentValue);
      this.countArray = this.count.toString().split("").map((item) => +item);
    }
    if (nzOverflowCount) {
      this.generateMaxNumberArray();
    }
  }
};
__publicField(_NzBadgeSupComponent, "\u0275fac", function NzBadgeSupComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzBadgeSupComponent)();
});
__publicField(_NzBadgeSupComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzBadgeSupComponent,
  selectors: [["nz-badge-sup"]],
  hostAttrs: [1, "ant-scroll-number"],
  hostVars: 17,
  hostBindings: function NzBadgeSupComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275attribute("title", ctx.nzTitle === null ? "" : ctx.nzTitle || ctx.nzCount);
      \u0275\u0275styleMap(ctx.nzStyle);
      \u0275\u0275classMap(ctx.isPresetColor ? "ant-badge-status-" + ctx.nzColor : "");
      \u0275\u0275styleProp("right", ctx.nzOffset && ctx.nzOffset[0] ? -ctx.nzOffset[0] : null, "px")("margin-top", ctx.nzOffset && ctx.nzOffset[1] ? ctx.nzOffset[1] : null, "px");
      \u0275\u0275classProp("ant-badge-count", !ctx.nzDot)("ant-badge-count-sm", ctx.nzSize === "small")("ant-badge-dot", ctx.nzDot)("ant-badge-multiple-words", ctx.countArray.length >= 2);
    }
  },
  inputs: {
    nzOffset: "nzOffset",
    nzTitle: "nzTitle",
    nzStyle: "nzStyle",
    nzDot: "nzDot",
    nzOverflowCount: [2, "nzOverflowCount", "nzOverflowCount", numberAttribute],
    nzCount: "nzCount",
    nzSize: "nzSize",
    isPresetColor: [2, "isPresetColor", "isPresetColor", booleanAttribute],
    nzColor: "nzColor"
  },
  exportAs: ["nzBadgeSup"],
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 2,
  vars: 1,
  consts: [[1, "ant-scroll-number-only", 3, "nzNoAnimation", "transform"], [1, "ant-scroll-number-only", 3, "nzNoAnimation"], [1, "ant-scroll-number-only-unit", 3, "current"], [1, "ant-scroll-number-only-unit"]],
  template: function NzBadgeSupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzBadgeSupComponent_Conditional_0_Template, 2, 0)(1, NzBadgeSupComponent_Conditional_1_Template, 1, 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.count <= ctx.nzOverflowCount ? 0 : 1);
    }
  },
  dependencies: [NzNoAnimationDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzBadgeSupComponent = _NzBadgeSupComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzBadgeSupComponent, [{
    type: Component,
    args: [{
      selector: "nz-badge-sup",
      exportAs: "nzBadgeSup",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NzNoAnimationDirective],
      template: `
    @if (count <= nzOverflowCount) {
      @for (n of maxNumberArray; track n; let i = $index) {
        <span
          [nzNoAnimation]="!!noAnimation?.nzNoAnimation?.()"
          class="ant-scroll-number-only"
          [style.transform]="'translateY(' + -countArray[i] * 100 + '%)'"
        >
          @if (!nzDot && countArray[i] !== undefined) {
            @for (p of countSingleArray; track p) {
              <p class="ant-scroll-number-only-unit" [class.current]="p === countArray[i]">
                {{ p }}
              </p>
            }
          }
        </span>
      }
    } @else {
      {{ nzOverflowCount }}+
    }
  `,
      host: {
        class: "ant-scroll-number",
        "[class]": `isPresetColor ? ('ant-badge-status-' + nzColor) : ''`,
        "[attr.title]": `nzTitle === null ? '' : nzTitle || nzCount`,
        "[style]": `nzStyle`,
        "[style.right.px]": `nzOffset && nzOffset[0] ? -nzOffset[0] : null`,
        "[style.margin-top.px]": `nzOffset && nzOffset[1] ? nzOffset[1] : null`,
        "[class.ant-badge-count]": `!nzDot`,
        "[class.ant-badge-count-sm]": `nzSize === 'small'`,
        "[class.ant-badge-dot]": `nzDot`,
        "[class.ant-badge-multiple-words]": `countArray.length >= 2`
      }
    }]
  }], null, {
    nzOffset: [{
      type: Input
    }],
    nzTitle: [{
      type: Input
    }],
    nzStyle: [{
      type: Input
    }],
    nzDot: [{
      type: Input
    }],
    nzOverflowCount: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzCount: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    isPresetColor: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzColor: [{
      type: Input
    }]
  });
})();
var badgePresetColors = ["pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"];
var NZ_CONFIG_MODULE_NAME2 = "badge";
var NzBadgeComponent = (() => {
  var _a;
  let _nzOverflowCount_decorators;
  let _nzOverflowCount_initializers = [];
  let _nzOverflowCount_extraInitializers = [];
  let _nzColor_decorators;
  let _nzColor_initializers = [];
  let _nzColor_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "dir", inject(Directionality).valueSignal);
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME2);
      __publicField(this, "showSup", false);
      __publicField(this, "supAnimationEnter", withAnimationCheck(() => "ant-badge-zoom-enter"));
      __publicField(this, "supAnimationLeave", withAnimationCheck(() => "ant-badge-zoom-leave"));
      __publicField(this, "presetColor", null);
      __publicField(this, "nzShowZero", false);
      __publicField(this, "nzShowDot", true);
      __publicField(this, "nzStandalone", false);
      __publicField(this, "nzDot", false);
      __publicField(this, "nzOverflowCount", __runInitializers(this, _nzOverflowCount_initializers, 99));
      __publicField(this, "nzColor", (__runInitializers(this, _nzOverflowCount_extraInitializers), __runInitializers(this, _nzColor_initializers, void 0)));
      __publicField(this, "nzStyle", (__runInitializers(this, _nzColor_extraInitializers), null));
      __publicField(this, "nzText", null);
      __publicField(this, "nzTitle");
      __publicField(this, "nzStatus");
      __publicField(this, "nzCount");
      __publicField(this, "nzOffset");
      __publicField(this, "nzSize", "default");
    }
    get mergedStyle() {
      var _a2;
      return __spreadValues({
        backgroundColor: !this.presetColor && this.nzColor
      }, (_a2 = this.nzStyle) != null ? _a2 : {});
    }
    ngOnChanges(changes) {
      const {
        nzColor,
        nzShowDot,
        nzDot,
        nzCount,
        nzShowZero
      } = changes;
      if (nzColor) {
        this.presetColor = this.nzColor && badgePresetColors.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
      }
      if (nzShowDot || nzDot || nzCount || nzShowZero) {
        this.showSup = this.nzShowDot && this.nzDot || typeof this.nzCount === "number" && (this.nzCount > 0 || this.nzShowZero);
      }
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzOverflowCount_decorators = [WithConfig()];
    _nzColor_decorators = [WithConfig()];
    __esDecorate(null, null, _nzOverflowCount_decorators, {
      kind: "field",
      name: "nzOverflowCount",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzOverflowCount" in obj,
        get: (obj) => obj.nzOverflowCount,
        set: (obj, value) => {
          obj.nzOverflowCount = value;
        }
      },
      metadata: _metadata
    }, _nzOverflowCount_initializers, _nzOverflowCount_extraInitializers);
    __esDecorate(null, null, _nzColor_decorators, {
      kind: "field",
      name: "nzColor",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzColor" in obj,
        get: (obj) => obj.nzColor,
        set: (obj, value) => {
          obj.nzColor = value;
        }
      },
      metadata: _metadata
    }, _nzColor_initializers, _nzColor_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzBadgeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-badge"]],
    hostAttrs: [1, "ant-badge"],
    hostVars: 6,
    hostBindings: function NzBadgeComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-badge-status", ctx.nzStatus)("ant-badge-not-a-wrapper", !!(ctx.nzStandalone || (ctx.nzStatus || ctx.nzColor) && !ctx.showSup && !ctx.nzCount))("ant-badge-rtl", ctx.dir() === "rtl");
      }
    },
    inputs: {
      nzShowZero: [2, "nzShowZero", "nzShowZero", booleanAttribute],
      nzShowDot: [2, "nzShowDot", "nzShowDot", booleanAttribute],
      nzStandalone: [2, "nzStandalone", "nzStandalone", booleanAttribute],
      nzDot: [2, "nzDot", "nzDot", booleanAttribute],
      nzOverflowCount: "nzOverflowCount",
      nzColor: "nzColor",
      nzStyle: "nzStyle",
      nzText: "nzText",
      nzTitle: "nzTitle",
      nzStatus: "nzStatus",
      nzCount: "nzCount",
      nzOffset: "nzOffset",
      nzSize: "nzSize"
    },
    exportAs: ["nzBadge"],
    features: [\u0275\u0275NgOnChangesFeature],
    ngContentSelectors: _c03,
    decls: 3,
    vars: 2,
    consts: [[4, "nzStringTemplateOutlet"], [1, "ant-badge-status-dot"], [1, "ant-badge-status-text"], [3, "isPresetColor", "nzColor", "nzOffset", "nzSize", "nzTitle", "nzStyle", "nzDot", "nzCount", "nzOverflowCount"]],
    template: function NzBadgeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275conditionalCreate(0, NzBadgeComponent_Conditional_0_Template, 3, 5);
        \u0275\u0275projection(1);
        \u0275\u0275template(2, NzBadgeComponent_ng_container_2_Template, 2, 1, "ng-container", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional((ctx.nzStatus || ctx.nzColor) && !ctx.showSup && !ctx.nzCount ? 0 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("nzStringTemplateOutlet", ctx.nzCount);
      }
    },
    dependencies: [NzBadgeSupComponent, NzOutletModule, NzStringTemplateOutletDirective],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzBadgeComponent, [{
    type: Component,
    args: [{
      selector: "nz-badge",
      exportAs: "nzBadge",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NzBadgeSupComponent, NzOutletModule],
      template: `
    @if ((nzStatus || nzColor) && !showSup && !nzCount) {
      <span
        class="ant-badge-status-dot"
        [class]="(nzStatus || presetColor) && 'ant-badge-status-' + (nzStatus || presetColor)"
        [style]="mergedStyle"
      ></span>
      <span class="ant-badge-status-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    }
    <ng-content />
    <ng-container *nzStringTemplateOutlet="nzCount">
      @if (showSup) {
        <nz-badge-sup
          [isPresetColor]="nzStatus || presetColor"
          [nzColor]="nzStatus || presetColor || nzColor"
          [nzOffset]="nzOffset"
          [nzSize]="nzSize"
          [nzTitle]="nzTitle"
          [nzStyle]="mergedStyle"
          [nzDot]="nzDot"
          [nzCount]="nzCount"
          [nzOverflowCount]="nzOverflowCount"
          [animate.enter]="supAnimationEnter()"
          [animate.leave]="supAnimationLeave()"
        />
      }
    </ng-container>
  `,
      host: {
        class: "ant-badge",
        "[class.ant-badge-status]": "nzStatus",
        "[class.ant-badge-not-a-wrapper]": "!!(nzStandalone || ((nzStatus || nzColor) && !showSup && !nzCount))",
        "[class.ant-badge-rtl]": 'dir() === "rtl"'
      }
    }]
  }], null, {
    nzShowZero: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowDot: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzStandalone: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDot: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOverflowCount: [{
      type: Input
    }],
    nzColor: [{
      type: Input
    }],
    nzStyle: [{
      type: Input
    }],
    nzText: [{
      type: Input
    }],
    nzTitle: [{
      type: Input
    }],
    nzStatus: [{
      type: Input
    }],
    nzCount: [{
      type: Input
    }],
    nzOffset: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }]
  });
})();
var _NzRibbonComponent = class _NzRibbonComponent {
  constructor() {
    __publicField(this, "nzColor");
    __publicField(this, "nzPlacement", "end");
    __publicField(this, "nzText", null);
    __publicField(this, "presetColor", null);
  }
  ngOnChanges(changes) {
    const {
      nzColor
    } = changes;
    if (nzColor) {
      this.presetColor = this.nzColor && badgePresetColors.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
    }
  }
};
__publicField(_NzRibbonComponent, "\u0275fac", function NzRibbonComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzRibbonComponent)();
});
__publicField(_NzRibbonComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzRibbonComponent,
  selectors: [["nz-ribbon"]],
  hostAttrs: [1, "ant-ribbon-wrapper"],
  inputs: {
    nzColor: "nzColor",
    nzPlacement: "nzPlacement",
    nzText: "nzText"
  },
  exportAs: ["nzRibbon"],
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c03,
  decls: 4,
  vars: 11,
  consts: [[1, "ant-ribbon"], [4, "nzStringTemplateOutlet"], [1, "ant-ribbon-corner"], [1, "ant-ribbon-text"]],
  template: function NzRibbonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
      \u0275\u0275elementStart(1, "div", 0);
      \u0275\u0275template(2, NzRibbonComponent_ng_container_2_Template, 3, 1, "ng-container", 1);
      \u0275\u0275element(3, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.presetColor && "ant-ribbon-color-" + ctx.presetColor);
      \u0275\u0275styleProp("background-color", !ctx.presetColor && ctx.nzColor);
      \u0275\u0275classProp("ant-ribbon-placement-end", ctx.nzPlacement === "end")("ant-ribbon-placement-start", ctx.nzPlacement === "start");
      \u0275\u0275advance();
      \u0275\u0275property("nzStringTemplateOutlet", ctx.nzText);
      \u0275\u0275advance();
      \u0275\u0275styleProp("color", !ctx.presetColor && ctx.nzColor);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzRibbonComponent = _NzRibbonComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRibbonComponent, [{
    type: Component,
    args: [{
      selector: "nz-ribbon",
      exportAs: "nzRibbon",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [NzOutletModule],
      template: `
    <ng-content />
    <div
      class="ant-ribbon"
      [class]="presetColor && 'ant-ribbon-color-' + presetColor"
      [class.ant-ribbon-placement-end]="nzPlacement === 'end'"
      [class.ant-ribbon-placement-start]="nzPlacement === 'start'"
      [style.background-color]="!presetColor && nzColor"
    >
      <ng-container *nzStringTemplateOutlet="nzText">
        <span class="ant-ribbon-text">{{ nzText }}</span>
      </ng-container>
      <div class="ant-ribbon-corner" [style.color]="!presetColor && nzColor"></div>
    </div>
  `,
      host: {
        class: "ant-ribbon-wrapper"
      }
    }]
  }], null, {
    nzColor: [{
      type: Input
    }],
    nzPlacement: [{
      type: Input
    }],
    nzText: [{
      type: Input
    }]
  });
})();
var _NzBadgeModule = class _NzBadgeModule {
};
__publicField(_NzBadgeModule, "\u0275fac", function NzBadgeModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzBadgeModule)();
});
__publicField(_NzBadgeModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzBadgeModule,
  imports: [NzBadgeComponent, NzRibbonComponent],
  exports: [NzBadgeComponent, NzRibbonComponent]
}));
__publicField(_NzBadgeModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzBadgeComponent, NzRibbonComponent]
}));
var NzBadgeModule = _NzBadgeModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzBadgeModule, [{
    type: NgModule,
    args: [{
      exports: [NzBadgeComponent, NzRibbonComponent],
      imports: [NzBadgeComponent, NzRibbonComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-alert.mjs
var _c04 = ["track1"];
var _c12 = ["track2"];
var _c22 = ["*"];
function NzAlertComponent_Conditional_0_Conditional_1_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NzAlertComponent_Conditional_0_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzAlertComponent_Conditional_0_Conditional_1_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 7);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzIcon);
  }
}
function NzAlertComponent_Conditional_0_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 6);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("nzType", ctx_r1.nzIconType || ctx_r1.inferredIconType)("nzTheme", ctx_r1.iconTheme);
  }
}
function NzAlertComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275conditionalCreate(1, NzAlertComponent_Conditional_0_Conditional_1_Conditional_1_Template, 1, 1, "ng-container")(2, NzAlertComponent_Conditional_0_Conditional_1_Conditional_2_Template, 1, 2, "nz-icon", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.nzIcon ? 1 : 2);
  }
}
function NzAlertComponent_Conditional_0_Conditional_2_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.nzMessage);
  }
}
function NzAlertComponent_Conditional_0_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275template(1, NzAlertComponent_Conditional_0_Conditional_2_Conditional_1_ng_container_1_Template, 2, 1, "ng-container", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzMessage);
  }
}
function NzAlertComponent_Conditional_0_Conditional_2_Conditional_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.nzDescription);
  }
}
function NzAlertComponent_Conditional_0_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275template(1, NzAlertComponent_Conditional_0_Conditional_2_Conditional_2_ng_container_1_Template, 2, 1, "ng-container", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzDescription);
  }
}
function NzAlertComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275conditionalCreate(1, NzAlertComponent_Conditional_0_Conditional_2_Conditional_1_Template, 2, 1, "span", 8);
    \u0275\u0275conditionalCreate(2, NzAlertComponent_Conditional_0_Conditional_2_Conditional_2_Template, 2, 1, "span", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.nzMessage ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.nzDescription ? 2 : -1);
  }
}
function NzAlertComponent_Conditional_0_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.nzAction);
  }
}
function NzAlertComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275template(1, NzAlertComponent_Conditional_0_Conditional_3_ng_container_1_Template, 2, 1, "ng-container", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzAction);
  }
}
function NzAlertComponent_Conditional_0_Conditional_4_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.nzCloseText);
  }
}
function NzAlertComponent_Conditional_0_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzAlertComponent_Conditional_0_Conditional_4_Conditional_1_ng_container_0_Template, 3, 1, "ng-container", 7);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzCloseText);
  }
}
function NzAlertComponent_Conditional_0_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 11);
  }
}
function NzAlertComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function NzAlertComponent_Conditional_0_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.closeAlert());
    });
    \u0275\u0275conditionalCreate(1, NzAlertComponent_Conditional_0_Conditional_4_Conditional_1_Template, 1, 1, "ng-container")(2, NzAlertComponent_Conditional_0_Conditional_4_Conditional_2_Template, 1, 0, "nz-icon", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.nzCloseText ? 1 : 2);
  }
}
function NzAlertComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275animateLeaveListener(function NzAlertComponent_Conditional_0_Template_div_animateleave_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onLeaveAnimationDone($event));
    });
    \u0275\u0275conditionalCreate(1, NzAlertComponent_Conditional_0_Conditional_1_Template, 3, 1, "div", 2);
    \u0275\u0275conditionalCreate(2, NzAlertComponent_Conditional_0_Conditional_2_Template, 3, 2, "div", 3);
    \u0275\u0275conditionalCreate(3, NzAlertComponent_Conditional_0_Conditional_3_Template, 2, 1, "div", 4);
    \u0275\u0275conditionalCreate(4, NzAlertComponent_Conditional_0_Conditional_4_Template, 3, 1, "button", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("ant-alert-rtl", ctx_r1.dir === "rtl")("ant-alert-success", ctx_r1.nzType === "success")("ant-alert-info", ctx_r1.nzType === "info")("ant-alert-warning", ctx_r1.nzType === "warning")("ant-alert-error", ctx_r1.nzType === "error")("ant-alert-no-icon", !ctx_r1.nzShowIcon)("ant-alert-banner", ctx_r1.nzBanner)("ant-alert-closable", ctx_r1.nzCloseable)("ant-alert-with-description", !!ctx_r1.nzDescription);
    \u0275\u0275property("nzNoAnimation", ctx_r1.nzNoAnimation);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.nzShowIcon ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.nzMessage || ctx_r1.nzDescription ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.nzAction ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.nzCloseable || ctx_r1.nzCloseText ? 4 : -1);
  }
}
var _NzAlertMarqueeComponent = class _NzAlertMarqueeComponent {
  constructor() {
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "nzPauseOnHover", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzPauseOnHover"
    } : {}), {
      transform: booleanAttribute
    })));
    __publicField(this, "nzSpeed", input(50, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzSpeed"
    } : {}), {
      transform: numberAttribute
    })));
    __publicField(this, "track1Ref", viewChild.required("track1"));
    __publicField(this, "track2Ref", viewChild.required("track2"));
    __publicField(this, "trackWidth", signal(0, ...ngDevMode ? [{
      debugName: "trackWidth"
    }] : []));
    __publicField(this, "animationDuration", computed(() => {
      const width = this.trackWidth();
      const speed = this.nzSpeed();
      return width > 0 && speed > 0 ? width / speed : 20;
    }, ...ngDevMode ? [{
      debugName: "animationDuration"
    }] : []));
    __publicField(this, "class", computed(() => ({
      "ant-alert-marquee": true,
      "ant-alert-marquee-pause-on-hover": this.nzPauseOnHover()
    }), ...ngDevMode ? [{
      debugName: "class"
    }] : []));
    afterNextRender(() => {
      const track1 = this.track1Ref().nativeElement;
      const track2 = this.track2Ref().nativeElement;
      const updateWidth = () => {
        this.trackWidth.set(track1.offsetWidth);
      };
      Array.from(track1.childNodes).forEach((node) => {
        track2.appendChild(node.cloneNode(true));
      });
      updateWidth();
      if (typeof ResizeObserver !== "undefined") {
        const resizeObserver = new ResizeObserver(updateWidth);
        resizeObserver.observe(track1);
        this.destroyRef.onDestroy(() => resizeObserver.disconnect());
      }
    });
  }
};
__publicField(_NzAlertMarqueeComponent, "\u0275fac", function NzAlertMarqueeComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzAlertMarqueeComponent)();
});
__publicField(_NzAlertMarqueeComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzAlertMarqueeComponent,
  selectors: [["nz-alert-marquee"]],
  viewQuery: function NzAlertMarqueeComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.track1Ref, _c04, 5)(ctx.track2Ref, _c12, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  },
  hostVars: 2,
  hostBindings: function NzAlertMarqueeComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classMap(ctx.class());
    }
  },
  inputs: {
    nzPauseOnHover: [1, "nzPauseOnHover"],
    nzSpeed: [1, "nzSpeed"]
  },
  ngContentSelectors: _c22,
  decls: 5,
  vars: 4,
  consts: [["track1", ""], ["track2", ""], [1, "ant-alert-marquee-track"], ["aria-hidden", "true", 1, "ant-alert-marquee-track"]],
  template: function NzAlertMarqueeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domElementStart(0, "div", 2, 0);
      \u0275\u0275projection(2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElement(3, "div", 3, 1);
    }
    if (rf & 2) {
      \u0275\u0275styleProp("animation-duration", ctx.animationDuration(), "s");
      \u0275\u0275advance(3);
      \u0275\u0275styleProp("animation-duration", ctx.animationDuration(), "s");
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzAlertMarqueeComponent = _NzAlertMarqueeComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzAlertMarqueeComponent, [{
    type: Component,
    args: [{
      selector: "nz-alert-marquee",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <div #track1 class="ant-alert-marquee-track" [style.animation-duration.s]="animationDuration()">
      <ng-content />
    </div>
    <div
      #track2
      class="ant-alert-marquee-track"
      aria-hidden="true"
      [style.animation-duration.s]="animationDuration()"
    ></div>
  `,
      host: {
        "[class]": "class()"
      }
    }]
  }], () => [], {
    nzPauseOnHover: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzPauseOnHover",
        required: false
      }]
    }],
    nzSpeed: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzSpeed",
        required: false
      }]
    }],
    track1Ref: [{
      type: ViewChild,
      args: ["track1", {
        isSignal: true
      }]
    }],
    track2Ref: [{
      type: ViewChild,
      args: ["track2", {
        isSignal: true
      }]
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME3 = "alert";
var NzAlertComponent = (() => {
  var _a;
  let _nzCloseable_decorators;
  let _nzCloseable_initializers = [];
  let _nzCloseable_extraInitializers = [];
  let _nzShowIcon_decorators;
  let _nzShowIcon_initializers = [];
  let _nzShowIcon_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "directionality", inject(Directionality));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "animationType", inject(ANIMATION_MODULE_TYPE, {
        optional: true
      }));
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME3);
      __publicField(this, "nzAction", null);
      __publicField(this, "nzCloseText", null);
      __publicField(this, "nzIconType", null);
      __publicField(this, "nzMessage", null);
      __publicField(this, "nzDescription", null);
      __publicField(this, "nzType", "info");
      __publicField(this, "nzCloseable", __runInitializers(this, _nzCloseable_initializers, false));
      __publicField(this, "nzShowIcon", (__runInitializers(this, _nzCloseable_extraInitializers), __runInitializers(this, _nzShowIcon_initializers, false)));
      __publicField(this, "nzBanner", (__runInitializers(this, _nzShowIcon_extraInitializers), false));
      __publicField(this, "nzNoAnimation", false);
      __publicField(this, "nzIcon", null);
      __publicField(this, "nzOnClose", new EventEmitter());
      __publicField(this, "closed", false);
      __publicField(this, "iconTheme", "fill");
      __publicField(this, "inferredIconType", "info-circle");
      __publicField(this, "dir", "ltr");
      __publicField(this, "isTypeSet", false);
      __publicField(this, "isShowIconSet", false);
      onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME3, () => this.cdr.markForCheck());
    }
    ngOnInit() {
      var _a2;
      (_a2 = this.directionality.change) == null ? void 0 : _a2.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
      this.dir = this.directionality.value;
    }
    closeAlert() {
      this.closed = true;
      if (this.nzNoAnimation || this.animationType === "NoopAnimations") {
        this.nzOnClose.emit(true);
      }
    }
    onLeaveAnimationDone(event) {
      const element = event.target;
      if (this.nzNoAnimation || this.animationType === "NoopAnimations") {
        event.animationComplete();
        return;
      }
      element.classList.add("ant-alert-motion-leave", "ant-alert-motion-leave-active");
      const onTransitionEnd = () => {
        element.removeEventListener("transitionend", onTransitionEnd);
        this.nzOnClose.emit(true);
        event.animationComplete();
      };
      element.addEventListener("transitionend", onTransitionEnd);
    }
    ngOnChanges(changes) {
      const {
        nzShowIcon,
        nzDescription,
        nzType,
        nzBanner
      } = changes;
      if (nzShowIcon) {
        this.isShowIconSet = true;
      }
      if (nzType) {
        this.isTypeSet = true;
        switch (this.nzType) {
          case "error":
            this.inferredIconType = "close-circle";
            break;
          case "success":
            this.inferredIconType = "check-circle";
            break;
          case "info":
            this.inferredIconType = "info-circle";
            break;
          case "warning":
            this.inferredIconType = "exclamation-circle";
            break;
        }
      }
      if (nzDescription) {
        this.iconTheme = this.nzDescription ? "outline" : "fill";
      }
      if (nzBanner) {
        if (!this.isTypeSet) {
          this.nzType = "warning";
        }
        if (!this.isShowIconSet) {
          this.nzShowIcon = true;
        }
      }
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzCloseable_decorators = [WithConfig()];
    _nzShowIcon_decorators = [WithConfig()];
    __esDecorate(null, null, _nzCloseable_decorators, {
      kind: "field",
      name: "nzCloseable",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzCloseable" in obj,
        get: (obj) => obj.nzCloseable,
        set: (obj, value) => {
          obj.nzCloseable = value;
        }
      },
      metadata: _metadata
    }, _nzCloseable_initializers, _nzCloseable_extraInitializers);
    __esDecorate(null, null, _nzShowIcon_decorators, {
      kind: "field",
      name: "nzShowIcon",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzShowIcon" in obj,
        get: (obj) => obj.nzShowIcon,
        set: (obj, value) => {
          obj.nzShowIcon = value;
        }
      },
      metadata: _metadata
    }, _nzShowIcon_initializers, _nzShowIcon_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzAlertComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-alert"]],
    inputs: {
      nzAction: "nzAction",
      nzCloseText: "nzCloseText",
      nzIconType: "nzIconType",
      nzMessage: "nzMessage",
      nzDescription: "nzDescription",
      nzType: "nzType",
      nzCloseable: [2, "nzCloseable", "nzCloseable", booleanAttribute],
      nzShowIcon: [2, "nzShowIcon", "nzShowIcon", booleanAttribute],
      nzBanner: [2, "nzBanner", "nzBanner", booleanAttribute],
      nzNoAnimation: [2, "nzNoAnimation", "nzNoAnimation", booleanAttribute],
      nzIcon: "nzIcon"
    },
    outputs: {
      nzOnClose: "nzOnClose"
    },
    exportAs: ["nzAlert"],
    features: [\u0275\u0275NgOnChangesFeature],
    decls: 1,
    vars: 1,
    consts: [[1, "ant-alert", 3, "nzNoAnimation", "ant-alert-rtl", "ant-alert-success", "ant-alert-info", "ant-alert-warning", "ant-alert-error", "ant-alert-no-icon", "ant-alert-banner", "ant-alert-closable", "ant-alert-with-description"], [1, "ant-alert", 3, "nzNoAnimation"], [1, "ant-alert-icon"], [1, "ant-alert-content"], [1, "ant-alert-action"], ["type", "button", "tabindex", "0", 1, "ant-alert-close-icon"], [3, "nzType", "nzTheme"], [4, "nzStringTemplateOutlet"], [1, "ant-alert-message"], [1, "ant-alert-description"], ["type", "button", "tabindex", "0", 1, "ant-alert-close-icon", 3, "click"], ["nzType", "close"], [1, "ant-alert-close-text"]],
    template: function NzAlertComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, NzAlertComponent_Conditional_0_Template, 5, 23, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(!ctx.closed ? 0 : -1);
      }
    },
    dependencies: [NzIconModule, NzIconDirective, NzOutletModule, NzStringTemplateOutletDirective, NzNoAnimationDirective],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzAlertComponent, [{
    type: Component,
    args: [{
      selector: "nz-alert",
      exportAs: "nzAlert",
      imports: [NzIconModule, NzOutletModule, NzNoAnimationDirective],
      template: `
    @if (!closed) {
      <div
        class="ant-alert"
        [nzNoAnimation]="nzNoAnimation"
        [class.ant-alert-rtl]="dir === 'rtl'"
        [class.ant-alert-success]="nzType === 'success'"
        [class.ant-alert-info]="nzType === 'info'"
        [class.ant-alert-warning]="nzType === 'warning'"
        [class.ant-alert-error]="nzType === 'error'"
        [class.ant-alert-no-icon]="!nzShowIcon"
        [class.ant-alert-banner]="nzBanner"
        [class.ant-alert-closable]="nzCloseable"
        [class.ant-alert-with-description]="!!nzDescription"
        (animate.leave)="onLeaveAnimationDone($event)"
      >
        @if (nzShowIcon) {
          <div class="ant-alert-icon">
            @if (nzIcon) {
              <ng-container *nzStringTemplateOutlet="nzIcon" />
            } @else {
              <nz-icon [nzType]="nzIconType || inferredIconType" [nzTheme]="iconTheme" />
            }
          </div>
        }

        @if (nzMessage || nzDescription) {
          <div class="ant-alert-content">
            @if (nzMessage) {
              <span class="ant-alert-message">
                <ng-container *nzStringTemplateOutlet="nzMessage">{{ nzMessage }}</ng-container>
              </span>
            }
            @if (nzDescription) {
              <span class="ant-alert-description">
                <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
              </span>
            }
          </div>
        }

        @if (nzAction) {
          <div class="ant-alert-action">
            <ng-container *nzStringTemplateOutlet="nzAction">{{ nzAction }}</ng-container>
          </div>
        }

        @if (nzCloseable || nzCloseText) {
          <button type="button" tabindex="0" class="ant-alert-close-icon" (click)="closeAlert()">
            @if (nzCloseText) {
              <ng-container *nzStringTemplateOutlet="nzCloseText">
                <span class="ant-alert-close-text">{{ nzCloseText }}</span>
              </ng-container>
            } @else {
              <nz-icon nzType="close" />
            }
          </button>
        }
      </div>
    }
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], () => [], {
    nzAction: [{
      type: Input
    }],
    nzCloseText: [{
      type: Input
    }],
    nzIconType: [{
      type: Input
    }],
    nzMessage: [{
      type: Input
    }],
    nzDescription: [{
      type: Input
    }],
    nzType: [{
      type: Input
    }],
    nzCloseable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowIcon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzBanner: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzNoAnimation: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzIcon: [{
      type: Input
    }],
    nzOnClose: [{
      type: Output
    }]
  });
})();
var _NzAlertModule = class _NzAlertModule {
};
__publicField(_NzAlertModule, "\u0275fac", function NzAlertModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzAlertModule)();
});
__publicField(_NzAlertModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzAlertModule,
  imports: [NzAlertComponent, NzAlertMarqueeComponent],
  exports: [NzAlertComponent, NzAlertMarqueeComponent]
}));
__publicField(_NzAlertModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzAlertComponent]
}));
var NzAlertModule = _NzAlertModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzAlertModule, [{
    type: NgModule,
    args: [{
      exports: [NzAlertComponent, NzAlertMarqueeComponent],
      imports: [NzAlertComponent, NzAlertMarqueeComponent]
    }]
  }], null, null);
})();

// projects/tot/nhan-dien-khuon-mat/src/lib/training/training.component.ts
var _c05 = () => ({ backgroundColor: "#52c41a" });
function TrainingComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275element(1, "span", 31);
    \u0275\u0275text(2, "\xA0 Ch\u1ECDn User \u0111\u1EC3 \u0110\xE0o T\u1EA1o");
    \u0275\u0275elementEnd();
  }
}
function TrainingComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "button", 33);
    \u0275\u0275listener("click", function TrainingComponent_ng_template_4_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.selectAll());
    });
    \u0275\u0275text(2, "Ch\u1ECDn t\u1EA5t c\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 34);
    \u0275\u0275listener("click", function TrainingComponent_ng_template_4_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deselectAll());
    });
    \u0275\u0275text(4, "B\u1ECF ch\u1ECDn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 34);
    \u0275\u0275listener("click", function TrainingComponent_ng_template_4_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadUsersWithDefinitions());
    });
    \u0275\u0275element(6, "span", 35);
    \u0275\u0275elementEnd()();
  }
}
function TrainingComponent_tr_17_img_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 46);
  }
  if (rf & 2) {
    const user_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", user_r4.avatarUrl, \u0275\u0275sanitizeUrl);
  }
}
function TrainingComponent_tr_17_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (user_r4.displayName || user_r4.username || "U").charAt(0).toUpperCase(), " ");
  }
}
function TrainingComponent_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 36);
    \u0275\u0275listener("click", function TrainingComponent_tr_17_Template_tr_click_0_listener() {
      const user_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleUserSelection(user_r4.id));
    });
    \u0275\u0275elementStart(1, "td", 37);
    \u0275\u0275listener("click", function TrainingComponent_tr_17_Template_td_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "label", 38);
    \u0275\u0275listener("nzCheckedChange", function TrainingComponent_tr_17_Template_label_nzCheckedChange_2_listener() {
      const user_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleUserSelection(user_r4.id));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td")(4, "div", 39);
    \u0275\u0275template(5, TrainingComponent_tr_17_img_5_Template, 1, 1, "img", 40)(6, TrainingComponent_tr_17_div_6_Template, 2, 1, "div", 41);
    \u0275\u0275elementStart(7, "div")(8, "div", 42);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 43);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275element(13, "nz-badge", 44);
    \u0275\u0275elementStart(14, "span", 45);
    \u0275\u0275text(15, "\xA0 \u1EA3nh \u0111\u1ECBnh ngh\u0129a");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected-row", ctx_r1.isUserSelected(user_r4.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzChecked", ctx_r1.isUserSelected(user_r4.id));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", user_r4.avatarUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !user_r4.avatarUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r4.displayName || user_r4.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r4.email);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzCount", user_r4.definitionCount)("nzStyle", \u0275\u0275pureFunction0(9, _c05));
  }
}
function TrainingComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275element(1, "span", 49);
    \u0275\u0275elementStart(2, "div", 50);
    \u0275\u0275text(3, "Ch\u01B0a c\xF3 user n\xE0o c\xF3 khu\xF4n m\u1EB7t \u0111\u01B0\u1EE3c \u0111\u1ECBnh ngh\u0129a.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 51);
    \u0275\u0275text(5, "Vui l\xF2ng \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t cho user tr\u01B0\u1EDBc khi \u0111\xE0o t\u1EA1o.");
    \u0275\u0275elementEnd()();
  }
}
function TrainingComponent_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275element(1, "span", 52);
    \u0275\u0275text(2, "\xA0 \u0110i\u1EC1u Khi\u1EC3n \u0110\xE0o T\u1EA1o");
    \u0275\u0275elementEnd();
  }
}
function TrainingComponent_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275element(1, "nz-spin", 54);
    \u0275\u0275elementStart(2, "span", 55);
    \u0275\u0275text(3, "\u0110ang \u0111\xE0o t\u1EA1o...");
    \u0275\u0275elementEnd()();
  }
}
function TrainingComponent_div_33_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61)(1, "nz-tag", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u2705 Ho\xE0n t\u1EA5t: ", ctx_r1.trainingDoneFolder);
  }
}
function TrainingComponent_div_33_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("log-line " + ctx_r1.getLogLineClass(line_r5));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", line_r5, " ");
  }
}
function TrainingComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "div", 57)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, TrainingComponent_div_33_span_4_Template, 3, 1, "span", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 59);
    \u0275\u0275template(6, TrainingComponent_div_33_div_6_Template, 2, 3, "div", 60);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4CB} Log \u0111\xE0o t\u1EA1o (", ctx_r1.trainingLogs.length, " d\xF2ng)");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.trainingDoneFolder);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.trainingLogs);
  }
}
function TrainingComponent_ng_template_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275element(1, "span", 63);
    \u0275\u0275text(2, "\xA0 K\u1EBFt Qu\u1EA3 \u0110\xE0o T\u1EA1o & Tr\xEDch Xu\u1EA5t Embedding");
    \u0275\u0275elementEnd();
  }
}
function TrainingComponent_ng_template_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function TrainingComponent_ng_template_37_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadTrainingFolders());
    });
    \u0275\u0275element(1, "span", 35);
    \u0275\u0275text(2, " L\xE0m m\u1EDBi ");
    \u0275\u0275elementEnd();
  }
}
function TrainingComponent_tr_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275element(2, "span", 64);
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td", 65)(6, "nz-tag", 18);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 65)(9, "button", 66);
    \u0275\u0275listener("click", function TrainingComponent_tr_50_Template_button_click_9_listener() {
      const folder_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.extractEmbeddings(folder_r8));
    });
    \u0275\u0275element(10, "span", 67);
    \u0275\u0275text(11, " Tr\xEDch xu\u1EA5t Embedding ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const folder_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(folder_r8.folderName);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzColor", folder_r8.hasBestModel ? "success" : "warning");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", folder_r8.hasBestModel ? "\u2705 C\xF3 best model" : "\u23F3 Ch\u01B0a c\xF3 model", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !folder_r8.hasBestModel || ctx_r1.extractingFolder === folder_r8.folderName)("nzLoading", ctx_r1.extractingFolder === folder_r8.folderName);
  }
}
function TrainingComponent_ng_template_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48);
    \u0275\u0275element(1, "span", 68);
    \u0275\u0275elementStart(2, "div", 50);
    \u0275\u0275text(3, "Ch\u01B0a c\xF3 phi\xEAn \u0111\xE0o t\u1EA1o n\xE0o.");
    \u0275\u0275elementEnd()();
  }
}
function TrainingComponent_nz_alert_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-alert", 69);
  }
}
var _TrainingComponent = class _TrainingComponent {
  constructor() {
    this.api = inject(NhanDienKhuonMatService);
    this.message = inject(NzMessageService);
    this.modal = inject(NzModalService);
    this.usersWithDefs = [];
    this.loadingUsers = false;
    this.selectedUserIds = /* @__PURE__ */ new Set();
    this.isTraining = false;
    this.trainingLogs = [];
    this.eventSource = null;
    this.trainingDoneFolder = null;
    this.trainingFolders = [];
    this.loadingFolders = false;
    this.extractingFolder = null;
  }
  ngOnInit() {
    this.loadUsersWithDefinitions();
    this.loadTrainingFolders();
  }
  ngOnDestroy() {
    this.closeEventSource();
  }
  async loadUsersWithDefinitions() {
    this.loadingUsers = true;
    try {
      const result = await this.api.getUsersWithDefinitions();
      this.usersWithDefs = result || [];
    } catch (error) {
      this.message.error("L\u1ED7i khi t\u1EA3i danh s\xE1ch user c\xF3 \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t.");
    } finally {
      this.loadingUsers = false;
    }
  }
  async loadTrainingFolders() {
    this.loadingFolders = true;
    try {
      const result = await this.api.getTrainingFolders();
      this.trainingFolders = result || [];
    } catch (error) {
      this.message.error("L\u1ED7i khi t\u1EA3i danh s\xE1ch phi\xEAn \u0111\xE0o t\u1EA1o.");
    } finally {
      this.loadingFolders = false;
    }
  }
  toggleUserSelection(userId) {
    if (this.selectedUserIds.has(userId)) {
      this.selectedUserIds.delete(userId);
    } else {
      this.selectedUserIds.add(userId);
    }
    this.selectedUserIds = new Set(this.selectedUserIds);
  }
  isUserSelected(userId) {
    return this.selectedUserIds.has(userId);
  }
  selectAll() {
    this.selectedUserIds = new Set(this.usersWithDefs.map((u) => u.id));
  }
  deselectAll() {
    this.selectedUserIds = /* @__PURE__ */ new Set();
  }
  startTraining() {
    if (this.selectedUserIds.size === 0) {
      this.message.warning("Vui l\xF2ng ch\u1ECDn \xEDt nh\u1EA5t m\u1ED9t user \u0111\u1EC3 \u0111\xE0o t\u1EA1o.");
      return;
    }
    if (this.isTraining) {
      this.message.warning("Ti\u1EBFn tr\xECnh \u0111\xE0o t\u1EA1o \u0111ang ch\u1EA1y. Vui l\xF2ng ch\u1EDD ho\u1EB7c h\u1EE7y.");
      return;
    }
    this.trainingLogs = [];
    this.trainingDoneFolder = null;
    this.isTraining = true;
    const userIds = Array.from(this.selectedUserIds);
    this.eventSource = this.api.streamTraining(userIds);
    this.eventSource.onmessage = (event) => {
      const line = event.data || "";
      this.trainingLogs = [...this.trainingLogs, line];
      setTimeout(() => {
        const logEl = document.getElementById("training-log-panel");
        if (logEl)
          logEl.scrollTop = logEl.scrollHeight;
      }, 50);
      if (line.startsWith("[DONE]")) {
        const parts = line.split(" ");
        if (parts.length >= 2) {
          this.trainingDoneFolder = parts[1].trim();
        }
        this.finishTraining();
      }
      if (line.startsWith("[ERROR]") && !this.trainingDoneFolder) {
        this.isTraining = false;
        this.closeEventSource();
      }
    };
    this.eventSource.onerror = () => {
      if (this.isTraining) {
        this.trainingLogs = [...this.trainingLogs, "[SYSTEM] K\u1EBFt n\u1ED1i SSE b\u1ECB gi\xE1n \u0111o\u1EA1n ho\u1EB7c \u0111\xE0o t\u1EA1o ho\xE0n t\u1EA5t."];
        this.finishTraining();
      }
    };
  }
  cancelTraining() {
    this.modal.confirm({
      nzTitle: "X\xE1c nh\u1EADn h\u1EE7y \u0111\xE0o t\u1EA1o?",
      nzContent: "H\xE0nh \u0111\u1ED9ng n\xE0y s\u1EBD ng\u1EAFt k\u1EBFt n\u1ED1i SSE v\xE0 d\u1EEBng ti\u1EBFn tr\xECnh \u0111\xE0o t\u1EA1o.",
      nzOkDanger: true,
      nzOnOk: () => {
        this.closeEventSource();
        this.isTraining = false;
        this.trainingLogs = [...this.trainingLogs, "[SYSTEM] \u0110\xE0o t\u1EA1o \u0111\xE3 b\u1ECB h\u1EE7y b\u1EDFi ng\u01B0\u1EDDi d\xF9ng."];
      }
    });
  }
  finishTraining() {
    this.isTraining = false;
    this.closeEventSource();
    if (this.trainingDoneFolder) {
      this.message.success(`\u0110\xE0o t\u1EA1o ho\xE0n t\u1EA5t! Th\u01B0 m\u1EE5c: ${this.trainingDoneFolder}`);
      this.loadTrainingFolders();
    }
  }
  closeEventSource() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
  async extractEmbeddings(folder) {
    var _a;
    if (!folder.hasBestModel) {
      this.message.warning("Th\u01B0 m\u1EE5c n\xE0y kh\xF4ng c\xF3 m\xF4 h\xECnh t\u1ED1t nh\u1EA5t (arcface_model_best.onnx) \u0111\u1EC3 tr\xEDch xu\u1EA5t.");
      return;
    }
    this.extractingFolder = folder.folderName;
    try {
      const result = await this.api.extractEmbeddings(folder.folderName);
      this.message.success(`Tr\xEDch xu\u1EA5t ho\xE0n t\u1EA5t: ${result.processedCount} embedding, ${result.errorCount} l\u1ED7i.`);
    } catch (error) {
      this.message.error(((_a = error == null ? void 0 : error.error) == null ? void 0 : _a.message) || "L\u1ED7i khi tr\xEDch xu\u1EA5t embedding.");
    } finally {
      this.extractingFolder = null;
    }
  }
  getLogLineClass(line) {
    if (line.startsWith("[ERROR]"))
      return "log-error";
    if (line.startsWith("[WARN]") || line.startsWith("[STDERR]"))
      return "log-warn";
    if (line.startsWith("[SUCCESS]") || line.startsWith("[DONE]"))
      return "log-success";
    if (line.startsWith("[CMD]"))
      return "log-cmd";
    if (line.startsWith("[SYSTEM]"))
      return "log-system";
    return "log-info";
  }
};
_TrainingComponent.\u0275fac = function TrainingComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TrainingComponent)();
};
_TrainingComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TrainingComponent, selectors: [["tot-nhan-dien-training"]], decls: 54, vars: 22, consts: [["userSelectTitle", ""], ["userSelectActions", ""], ["userTable", ""], ["emptyUserTemplate", ""], ["trainingControlTitle", ""], ["foldersTitle", ""], ["foldersActions", ""], ["emptyFolderTemplate", ""], [1, "training-page"], [1, "section-card", 3, "nzTitle", "nzExtra"], [3, "nzSpinning"], ["nzSize", "small", 1, "user-table", 3, "nzData", "nzShowPagination", "nzNoResult"], ["nzWidth", "48px"], ["nzWidth", "160px"], ["class", "user-row", 3, "selected-row", "click", 4, "ngFor", "ngForOf"], [1, "section-card", 3, "nzTitle"], [1, "training-controls"], [1, "selected-info"], [3, "nzColor"], ["class", "training-status-indicator", 4, "ngIf"], [1, "control-buttons"], ["label", "B\u1EAFt \u0111\u1EA7u \u0111\xE0o t\u1EA1o", "icon", "play-circle", 3, "click", "disabled"], ["nz-button", "", "nzType", "default", "nzDanger", "", 2, "margin-left", "12px", 3, "click", "disabled"], ["nz-icon", "", "nzType", "stop"], ["class", "log-container", 4, "ngIf"], ["nzSize", "small", 1, "folders-table", 3, "nzData", "nzShowPagination", "nzNoResult"], ["nzWidth", "160px", "nzAlign", "center"], ["nzWidth", "180px", "nzAlign", "center"], [4, "ngFor", "ngForOf"], ["nzType", "info", "nzShowIcon", "", "nzMessage", "H\u01B0\u1EDBng d\u1EABn", "nzDescription", "Sau khi \u0111\xE0o t\u1EA1o ho\xE0n t\u1EA5t, nh\u1EA5n 'Tr\xEDch xu\u1EA5t Embedding' \u0111\u1EC3 l\u01B0u vector \u0111\u1EB7c tr\u01B0ng v\xE0o database. C\xE1c embedding n\xE0y s\u1EBD \u0111\u01B0\u1EE3c d\xF9ng cho nh\u1EADn di\u1EC7n th\u1EDDi gian th\u1EF1c.", "style", "margin-top: 16px;", 4, "ngIf"], [1, "card-title-icon"], ["nz-icon", "", "nzType", "team", "nzTheme", "outline"], [1, "card-actions-row"], ["nz-button", "", "nzSize", "small", 3, "click"], ["nz-button", "", "nzSize", "small", 2, "margin-left", "8px", 3, "click"], ["nz-icon", "", "nzType", "reload"], [1, "user-row", 3, "click"], [3, "click"], ["nz-checkbox", "", 3, "nzCheckedChange", "nzChecked"], [1, "user-info"], ["class", "user-avatar", "alt", "avatar", 3, "src", 4, "ngIf"], ["class", "user-avatar-placeholder", 4, "ngIf"], [1, "user-name"], [1, "user-email"], [3, "nzCount", "nzStyle"], [1, "def-count-label"], ["alt", "avatar", 1, "user-avatar", 3, "src"], [1, "user-avatar-placeholder"], [1, "empty-state"], ["nz-icon", "", "nzType", "user-add", "nzTheme", "outline", 2, "font-size", "36px", "color", "#bbb"], [2, "margin-top", "8px", "color", "#999"], [2, "font-size", "12px", "color", "#ccc"], ["nz-icon", "", "nzType", "thunderbolt", "nzTheme", "outline"], [1, "training-status-indicator"], ["nzSimple", "", "nzSize", "small"], [1, "training-running-text"], [1, "log-container"], [1, "log-header"], ["class", "done-badge", 4, "ngIf"], ["id", "training-log-panel", 1, "log-panel"], [3, "class", 4, "ngFor", "ngForOf"], [1, "done-badge"], ["nzColor", "success"], ["nz-icon", "", "nzType", "folder-open", "nzTheme", "outline"], ["nz-icon", "", "nzType", "calendar", 2, "margin-right", "6px", "color", "#1890ff"], ["nzAlign", "center"], ["nz-button", "", "nzType", "primary", "nzSize", "small", 3, "click", "disabled", "nzLoading"], ["nz-icon", "", "nzType", "database"], ["nz-icon", "", "nzType", "inbox", "nzTheme", "outline", 2, "font-size", "36px", "color", "#bbb"], ["nzType", "info", "nzShowIcon", "", "nzMessage", "H\u01B0\u1EDBng d\u1EABn", "nzDescription", "Sau khi \u0111\xE0o t\u1EA1o ho\xE0n t\u1EA5t, nh\u1EA5n 'Tr\xEDch xu\u1EA5t Embedding' \u0111\u1EC3 l\u01B0u vector \u0111\u1EB7c tr\u01B0ng v\xE0o database. C\xE1c embedding n\xE0y s\u1EBD \u0111\u01B0\u1EE3c d\xF9ng cho nh\u1EADn di\u1EC7n th\u1EDDi gian th\u1EF1c.", 2, "margin-top", "16px"]], template: function TrainingComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "nz-card", 9);
    \u0275\u0275template(2, TrainingComponent_ng_template_2_Template, 3, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(4, TrainingComponent_ng_template_4_Template, 7, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(6, "nz-spin", 10)(7, "nz-table", 11, 2)(9, "thead")(10, "tr");
    \u0275\u0275element(11, "th", 12);
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "User");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 13);
    \u0275\u0275text(15, "S\u1ED1 \u1EA3nh \u0111\u1ECBnh ngh\u0129a");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275template(17, TrainingComponent_tr_17_Template, 16, 10, "tr", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(18, TrainingComponent_ng_template_18_Template, 6, 0, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "nz-card", 15);
    \u0275\u0275template(21, TrainingComponent_ng_template_21_Template, 3, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(23, "div", 16)(24, "div", 17)(25, "nz-tag", 18);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, TrainingComponent_span_27_Template, 4, 0, "span", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 20)(29, "tot-button", 21);
    \u0275\u0275listener("click", function TrainingComponent_Template_tot_button_click_29_listener() {
      return ctx.startTraining();
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 22);
    \u0275\u0275listener("click", function TrainingComponent_Template_button_click_30_listener() {
      return ctx.cancelTraining();
    });
    \u0275\u0275element(31, "span", 23);
    \u0275\u0275text(32, " H\u1EE7y \u0111\xE0o t\u1EA1o ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(33, TrainingComponent_div_33_Template, 7, 3, "div", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "nz-card", 9);
    \u0275\u0275template(35, TrainingComponent_ng_template_35_Template, 3, 0, "ng-template", null, 5, \u0275\u0275templateRefExtractor)(37, TrainingComponent_ng_template_37_Template, 3, 0, "ng-template", null, 6, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(39, "nz-spin", 10)(40, "nz-table", 25)(41, "thead")(42, "tr")(43, "th");
    \u0275\u0275text(44, "Th\u01B0 m\u1EE5c (Ng\xE0y)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "th", 26);
    \u0275\u0275text(46, "Tr\u1EA1ng th\xE1i m\xF4 h\xECnh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "th", 27);
    \u0275\u0275text(48, "H\xE0nh \u0111\u1ED9ng");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(49, "tbody");
    \u0275\u0275template(50, TrainingComponent_tr_50_Template, 12, 5, "tr", 28);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(51, TrainingComponent_ng_template_51_Template, 4, 0, "ng-template", null, 7, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275template(53, TrainingComponent_nz_alert_53_Template, 1, 0, "nz-alert", 29);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const userSelectTitle_r9 = \u0275\u0275reference(3);
    const userSelectActions_r10 = \u0275\u0275reference(5);
    const userTable_r11 = \u0275\u0275reference(8);
    const emptyUserTemplate_r12 = \u0275\u0275reference(19);
    const trainingControlTitle_r13 = \u0275\u0275reference(22);
    const foldersTitle_r14 = \u0275\u0275reference(36);
    const foldersActions_r15 = \u0275\u0275reference(38);
    const emptyFolderTemplate_r16 = \u0275\u0275reference(52);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", userSelectTitle_r9)("nzExtra", userSelectActions_r10);
    \u0275\u0275advance(5);
    \u0275\u0275property("nzSpinning", ctx.loadingUsers);
    \u0275\u0275advance();
    \u0275\u0275property("nzData", ctx.usersWithDefs)("nzShowPagination", false)("nzNoResult", emptyUserTemplate_r12);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", userTable_r11.data);
    \u0275\u0275advance(3);
    \u0275\u0275property("nzTitle", trainingControlTitle_r13);
    \u0275\u0275advance(5);
    \u0275\u0275property("nzColor", ctx.selectedUserIds.size > 0 ? "blue" : "default");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx.selectedUserIds.size, " user \u0111\u01B0\u1EE3c ch\u1ECDn ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isTraining);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx.isTraining || ctx.selectedUserIds.size === 0);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx.isTraining);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx.trainingLogs.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", foldersTitle_r14)("nzExtra", foldersActions_r15);
    \u0275\u0275advance(5);
    \u0275\u0275property("nzSpinning", ctx.loadingFolders);
    \u0275\u0275advance();
    \u0275\u0275property("nzData", ctx.trainingFolders)("nzShowPagination", false)("nzNoResult", emptyFolderTemplate_r16);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx.trainingFolders);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx.trainingFolders.length > 0);
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  FormsModule,
  NzButtonModule,
  NzButtonComponent,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzCardModule,
  NzCardComponent,
  NzTagModule,
  NzTagComponent,
  NzSpinModule,
  NzSpinComponent,
  NzTableModule,
  NzTableComponent,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTheadComponent,
  NzTbodyComponent,
  NzTrDirective,
  NzCellAlignDirective,
  NzCheckboxModule,
  NzCheckboxComponent,
  NzModalModule,
  NzIconModule,
  NzIconDirective,
  NzDividerModule,
  NzBadgeModule,
  NzBadgeComponent,
  NzAlertModule,
  NzAlertComponent,
  TotButtonComponent
], styles: ['\n.training-page[_ngcontent-%COMP%] {\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  max-width: 1100px;\n  margin: 0 auto;\n}\n.card-title-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  font-weight: 600;\n  font-size: 15px;\n  gap: 4px;\n}\n.card-actions-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.user-table[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  overflow: hidden;\n}\n.user-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background 0.15s ease;\n}\n.user-row[_ngcontent-%COMP%]:hover {\n  background: #f0f7ff !important;\n}\n.selected-row[_ngcontent-%COMP%] {\n  background: #e6f4ff !important;\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid #d0e9ff;\n}\n.user-avatar-placeholder[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #1890ff,\n      #096dd9);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 15px;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  color: #262626;\n}\n.user-email[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #8c8c8c;\n}\n.def-count-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #595959;\n}\n.training-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.selected-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.control-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.training-status-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.training-running-text[_ngcontent-%COMP%] {\n  color: #1890ff;\n  font-weight: 600;\n  animation: _ngcontent-%COMP%_pulse 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.log-container[_ngcontent-%COMP%] {\n  border: 1px solid #d9d9d9;\n  border-radius: 8px;\n  overflow: hidden;\n  margin-top: 4px;\n}\n.log-header[_ngcontent-%COMP%] {\n  background: #fafafa;\n  border-bottom: 1px solid #d9d9d9;\n  padding: 8px 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 13px;\n  color: #595959;\n}\n.done-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.log-panel[_ngcontent-%COMP%] {\n  background: #0d1117;\n  height: 360px;\n  overflow-y: auto;\n  padding: 12px;\n  font-family:\n    "Consolas",\n    "Monaco",\n    "Courier New",\n    monospace;\n  font-size: 12.5px;\n  line-height: 1.7;\n  scroll-behavior: smooth;\n}\n.log-line[_ngcontent-%COMP%] {\n  display: block;\n  word-break: break-all;\n  padding: 1px 0;\n}\n.log-error[_ngcontent-%COMP%] {\n  color: #ff7875;\n}\n.log-warn[_ngcontent-%COMP%] {\n  color: #ffa940;\n}\n.log-success[_ngcontent-%COMP%] {\n  color: #73d13d;\n  font-weight: 600;\n}\n.log-cmd[_ngcontent-%COMP%] {\n  color: #69c0ff;\n  font-style: italic;\n}\n.log-system[_ngcontent-%COMP%] {\n  color: #b37feb;\n}\n.log-info[_ngcontent-%COMP%] {\n  color: #e6e6e6;\n}\n.folders-table[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  overflow: hidden;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 28px 0;\n}\n.section-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);\n  border: 1px solid #f0f0f0;\n}\n/*# sourceMappingURL=training.component.css.map */'] });
var TrainingComponent = _TrainingComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrainingComponent, [{
    type: Component,
    args: [{ selector: "tot-nhan-dien-training", standalone: true, imports: [
      CommonModule,
      FormsModule,
      NzButtonModule,
      NzCardModule,
      NzTagModule,
      NzSpinModule,
      NzTableModule,
      NzCheckboxModule,
      NzModalModule,
      NzIconModule,
      NzDividerModule,
      NzBadgeModule,
      NzAlertModule,
      TotButtonComponent
    ], template: `<div class="training-page">

  <!-- ========================== SECTION 1: Ch\u1ECDn User \u0110\xE0o T\u1EA1o ========================== -->
  <nz-card class="section-card" [nzTitle]="userSelectTitle" [nzExtra]="userSelectActions">
    <ng-template #userSelectTitle>
      <span class="card-title-icon"><span nz-icon nzType="team" nzTheme="outline"></span>&nbsp; Ch\u1ECDn User \u0111\u1EC3 \u0110\xE0o T\u1EA1o</span>
    </ng-template>
    <ng-template #userSelectActions>
      <div class="card-actions-row">
        <button nz-button nzSize="small" (click)="selectAll()">Ch\u1ECDn t\u1EA5t c\u1EA3</button>
        <button nz-button nzSize="small" (click)="deselectAll()" style="margin-left: 8px;">B\u1ECF ch\u1ECDn</button>
        <button nz-button nzSize="small" (click)="loadUsersWithDefinitions()" style="margin-left: 8px;">
          <span nz-icon nzType="reload"></span>
        </button>
      </div>
    </ng-template>

    <nz-spin [nzSpinning]="loadingUsers">
      <nz-table
        #userTable
        [nzData]="usersWithDefs"
        [nzShowPagination]="false"
        nzSize="small"
        [nzNoResult]="emptyUserTemplate"
        class="user-table">
        <thead>
          <tr>
            <th nzWidth="48px"></th>
            <th>User</th>
            <th nzWidth="160px">S\u1ED1 \u1EA3nh \u0111\u1ECBnh ngh\u0129a</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of userTable.data"
              [class.selected-row]="isUserSelected(user.id)"
              (click)="toggleUserSelection(user.id)"
              class="user-row">
            <td (click)="$event.stopPropagation()">
              <label nz-checkbox
                     [nzChecked]="isUserSelected(user.id)"
                     (nzCheckedChange)="toggleUserSelection(user.id)">
              </label>
            </td>
            <td>
              <div class="user-info">
                <img *ngIf="user.avatarUrl" [src]="user.avatarUrl" class="user-avatar" alt="avatar" />
                <div *ngIf="!user.avatarUrl" class="user-avatar-placeholder">
                  {{ (user.displayName || user.username || 'U').charAt(0).toUpperCase() }}
                </div>
                <div>
                  <div class="user-name">{{ user.displayName || user.username }}</div>
                  <div class="user-email">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td>
              <nz-badge [nzCount]="user.definitionCount" [nzStyle]="{ backgroundColor: '#52c41a' }"></nz-badge>
              <span class="def-count-label">&nbsp; \u1EA3nh \u0111\u1ECBnh ngh\u0129a</span>
            </td>
          </tr>
        </tbody>
      </nz-table>
      <ng-template #emptyUserTemplate>
        <div class="empty-state">
          <span nz-icon nzType="user-add" nzTheme="outline" style="font-size: 36px; color: #bbb;"></span>
          <div style="margin-top: 8px; color: #999;">Ch\u01B0a c\xF3 user n\xE0o c\xF3 khu\xF4n m\u1EB7t \u0111\u01B0\u1EE3c \u0111\u1ECBnh ngh\u0129a.</div>
          <div style="font-size: 12px; color: #ccc;">Vui l\xF2ng \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t cho user tr\u01B0\u1EDBc khi \u0111\xE0o t\u1EA1o.</div>
        </div>
      </ng-template>
    </nz-spin>
  </nz-card>

  <!-- ========================== SECTION 2: \u0110i\u1EC1u khi\u1EC3n \u0110\xE0o T\u1EA1o ========================== -->
  <nz-card class="section-card" [nzTitle]="trainingControlTitle">
    <ng-template #trainingControlTitle>
      <span class="card-title-icon"><span nz-icon nzType="thunderbolt" nzTheme="outline"></span>&nbsp; \u0110i\u1EC1u Khi\u1EC3n \u0110\xE0o T\u1EA1o</span>
    </ng-template>

    <div class="training-controls">
      <div class="selected-info">
        <nz-tag [nzColor]="selectedUserIds.size > 0 ? 'blue' : 'default'">
          {{ selectedUserIds.size }} user \u0111\u01B0\u1EE3c ch\u1ECDn
        </nz-tag>
        <span *ngIf="isTraining" class="training-status-indicator">
          <nz-spin nzSimple nzSize="small"></nz-spin>
          <span class="training-running-text">\u0110ang \u0111\xE0o t\u1EA1o...</span>
        </span>
      </div>

      <div class="control-buttons">
        <tot-button
          label="B\u1EAFt \u0111\u1EA7u \u0111\xE0o t\u1EA1o"
          icon="play-circle"
          [disabled]="isTraining || selectedUserIds.size === 0"
          (click)="startTraining()">
        </tot-button>
        <button
          nz-button
          nzType="default"
          nzDanger
          [disabled]="!isTraining"
          (click)="cancelTraining()"
          style="margin-left: 12px;">
          <span nz-icon nzType="stop"></span>
          H\u1EE7y \u0111\xE0o t\u1EA1o
        </button>
      </div>
    </div>

    <!-- Log Panel -->
    <div *ngIf="trainingLogs.length > 0" class="log-container">
      <div class="log-header">
        <span>\u{1F4CB} Log \u0111\xE0o t\u1EA1o ({{ trainingLogs.length }} d\xF2ng)</span>
        <span *ngIf="trainingDoneFolder" class="done-badge">
          <nz-tag nzColor="success">\u2705 Ho\xE0n t\u1EA5t: {{ trainingDoneFolder }}</nz-tag>
        </span>
      </div>
      <div id="training-log-panel" class="log-panel">
        <div *ngFor="let line of trainingLogs" [class]="'log-line ' + getLogLineClass(line)">
          {{ line }}
        </div>
      </div>
    </div>
  </nz-card>

  <!-- ========================== SECTION 3: Qu\u1EA3n l\xFD K\u1EBFt Qu\u1EA3 \u0110\xE0o T\u1EA1o ========================== -->
  <nz-card class="section-card" [nzTitle]="foldersTitle" [nzExtra]="foldersActions">
    <ng-template #foldersTitle>
      <span class="card-title-icon"><span nz-icon nzType="folder-open" nzTheme="outline"></span>&nbsp; K\u1EBFt Qu\u1EA3 \u0110\xE0o T\u1EA1o & Tr\xEDch Xu\u1EA5t Embedding</span>
    </ng-template>
    <ng-template #foldersActions>
      <button nz-button nzSize="small" (click)="loadTrainingFolders()">
        <span nz-icon nzType="reload"></span> L\xE0m m\u1EDBi
      </button>
    </ng-template>

    <nz-spin [nzSpinning]="loadingFolders">
      <nz-table
        [nzData]="trainingFolders"
        [nzShowPagination]="false"
        nzSize="small"
        [nzNoResult]="emptyFolderTemplate"
        class="folders-table">
        <thead>
          <tr>
            <th>Th\u01B0 m\u1EE5c (Ng\xE0y)</th>
            <th nzWidth="160px" nzAlign="center">Tr\u1EA1ng th\xE1i m\xF4 h\xECnh</th>
            <th nzWidth="180px" nzAlign="center">H\xE0nh \u0111\u1ED9ng</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let folder of trainingFolders">
            <td>
              <span nz-icon nzType="calendar" style="margin-right: 6px; color: #1890ff;"></span>
              <strong>{{ folder.folderName }}</strong>
            </td>
            <td nzAlign="center">
              <nz-tag [nzColor]="folder.hasBestModel ? 'success' : 'warning'">
                {{ folder.hasBestModel ? '\u2705 C\xF3 best model' : '\u23F3 Ch\u01B0a c\xF3 model' }}
              </nz-tag>
            </td>
            <td nzAlign="center">
              <button
                nz-button
                nzType="primary"
                nzSize="small"
                [disabled]="!folder.hasBestModel || extractingFolder === folder.folderName"
                [nzLoading]="extractingFolder === folder.folderName"
                (click)="extractEmbeddings(folder)">
                <span nz-icon nzType="database"></span>
                Tr\xEDch xu\u1EA5t Embedding
              </button>
            </td>
          </tr>
        </tbody>
      </nz-table>
      <ng-template #emptyFolderTemplate>
        <div class="empty-state">
          <span nz-icon nzType="inbox" nzTheme="outline" style="font-size: 36px; color: #bbb;"></span>
          <div style="margin-top: 8px; color: #999;">Ch\u01B0a c\xF3 phi\xEAn \u0111\xE0o t\u1EA1o n\xE0o.</div>
        </div>
      </ng-template>
    </nz-spin>

    <nz-alert
      *ngIf="trainingFolders.length > 0"
      nzType="info"
      nzShowIcon
      nzMessage="H\u01B0\u1EDBng d\u1EABn"
      nzDescription="Sau khi \u0111\xE0o t\u1EA1o ho\xE0n t\u1EA5t, nh\u1EA5n 'Tr\xEDch xu\u1EA5t Embedding' \u0111\u1EC3 l\u01B0u vector \u0111\u1EB7c tr\u01B0ng v\xE0o database. C\xE1c embedding n\xE0y s\u1EBD \u0111\u01B0\u1EE3c d\xF9ng cho nh\u1EADn di\u1EC7n th\u1EDDi gian th\u1EF1c."
      style="margin-top: 16px;">
    </nz-alert>
  </nz-card>

</div>
`, styles: ['/* projects/tot/nhan-dien-khuon-mat/src/lib/training/training.component.css */\n.training-page {\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  max-width: 1100px;\n  margin: 0 auto;\n}\n.card-title-icon {\n  display: flex;\n  align-items: center;\n  font-weight: 600;\n  font-size: 15px;\n  gap: 4px;\n}\n.card-actions-row {\n  display: flex;\n  align-items: center;\n}\n.user-table {\n  border-radius: 8px;\n  overflow: hidden;\n}\n.user-row {\n  cursor: pointer;\n  transition: background 0.15s ease;\n}\n.user-row:hover {\n  background: #f0f7ff !important;\n}\n.selected-row {\n  background: #e6f4ff !important;\n}\n.user-info {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.user-avatar {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid #d0e9ff;\n}\n.user-avatar-placeholder {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #1890ff,\n      #096dd9);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 15px;\n}\n.user-name {\n  font-weight: 600;\n  font-size: 14px;\n  color: #262626;\n}\n.user-email {\n  font-size: 12px;\n  color: #8c8c8c;\n}\n.def-count-label {\n  font-size: 12px;\n  color: #595959;\n}\n.training-controls {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.selected-info {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.control-buttons {\n  display: flex;\n  align-items: center;\n}\n.training-status-indicator {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.training-running-text {\n  color: #1890ff;\n  font-weight: 600;\n  animation: pulse 1.5s ease-in-out infinite;\n}\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.log-container {\n  border: 1px solid #d9d9d9;\n  border-radius: 8px;\n  overflow: hidden;\n  margin-top: 4px;\n}\n.log-header {\n  background: #fafafa;\n  border-bottom: 1px solid #d9d9d9;\n  padding: 8px 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 13px;\n  color: #595959;\n}\n.done-badge {\n  display: flex;\n  align-items: center;\n}\n.log-panel {\n  background: #0d1117;\n  height: 360px;\n  overflow-y: auto;\n  padding: 12px;\n  font-family:\n    "Consolas",\n    "Monaco",\n    "Courier New",\n    monospace;\n  font-size: 12.5px;\n  line-height: 1.7;\n  scroll-behavior: smooth;\n}\n.log-line {\n  display: block;\n  word-break: break-all;\n  padding: 1px 0;\n}\n.log-error {\n  color: #ff7875;\n}\n.log-warn {\n  color: #ffa940;\n}\n.log-success {\n  color: #73d13d;\n  font-weight: 600;\n}\n.log-cmd {\n  color: #69c0ff;\n  font-style: italic;\n}\n.log-system {\n  color: #b37feb;\n}\n.log-info {\n  color: #e6e6e6;\n}\n.folders-table {\n  border-radius: 8px;\n  overflow: hidden;\n}\n.empty-state {\n  text-align: center;\n  padding: 28px 0;\n}\n.section-card {\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);\n  border: 1px solid #f0f0f0;\n}\n/*# sourceMappingURL=training.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TrainingComponent, { className: "TrainingComponent", filePath: "projects/tot/nhan-dien-khuon-mat/src/lib/training/training.component.ts", lineNumber: 41 });
})();

export {
  provideNhanDienKhuonMat,
  NhanDienKhuonMatService,
  NhanDienKhuonMatComponent,
  TrainingComponent
};
//# sourceMappingURL=chunk-ROIGWPLG.js.map
