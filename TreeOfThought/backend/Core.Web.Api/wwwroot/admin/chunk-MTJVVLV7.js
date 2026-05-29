import {
  TotAutocompleteComponent
} from "./chunk-3QJVCMLC.js";
import {
  CheckboxControlValueAccessor,
  CommonModule,
  DOWN_ARROW,
  DatePipe,
  DecimalPipe,
  DefaultValueAccessor,
  Directionality,
  ENTER,
  FocusMonitor,
  FormsModule,
  HttpClientService,
  LEFT_ARROW,
  NG_VALUE_ACCESSOR,
  NZ_FORM_SIZE,
  NZ_FORM_VARIANT,
  NZ_SPACE_COMPACT_ITEM_TYPE,
  NZ_SPACE_COMPACT_SIZE,
  NgControlStatus,
  NgForOf,
  NgIf,
  NgModel,
  NgTemplateOutlet,
  NzButtonComponent,
  NzButtonModule,
  NzCardComponent,
  NzCardModule,
  NzCellAlignDirective,
  NzCheckboxComponent,
  NzCheckboxModule,
  NzColDirective,
  NzConfigService,
  NzDividerComponent,
  NzDividerModule,
  NzFormItemFeedbackIconComponent,
  NzFormStatusService,
  NzGridModule,
  NzIconDirective,
  NzIconModule,
  NzInputAddonAfterDirective,
  NzInputAddonBeforeDirective,
  NzInputDirective,
  NzInputModule,
  NzInputPrefixDirective,
  NzInputSuffixDirective,
  NzMessageService,
  NzModalComponent,
  NzModalContentDirective,
  NzModalModule,
  NzModalService,
  NzNoAnimationDirective,
  NzOutletModule,
  NzRowDirective,
  NzSpaceCompactItemDirective,
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
  Platform,
  RIGHT_ARROW,
  SPACE,
  TotButtonComponent,
  TotCellDirective,
  TotTableComponent,
  UP_ARROW,
  WithConfig,
  arraysEqual,
  ensureNumberInRange,
  fromEventOutsideAngular,
  getElementOffset,
  getPercent,
  getPrecision,
  getStatusClassNames,
  getVariantClassNames,
  isNil,
  isNotNil,
  numberAttributeWithZeroFallback,
  onConfigChangeEventForComponent,
  silentEvent,
  takeUntilDestroyed,
  triggerFocus,
  withAnimationCheck
} from "./chunk-E3D7IGGX.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Injectable,
  Injector,
  Input,
  NgModule,
  NgZone,
  Output,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChild,
  distinctUntilChanged,
  filter,
  forwardRef,
  fromEvent,
  inject,
  input,
  linkedSignal,
  map,
  merge,
  numberAttribute,
  output,
  setClassMetadata,
  signal,
  takeUntil,
  tap,
  untracked,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵHostDirectivesFeature,
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
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomProperty,
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
  ɵɵpureFunction1,
  ɵɵpureFunction4,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery,
  ɵɵviewQuerySignal
} from "./chunk-KKYHHXIP.js";
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
  // === EMBEDDINGS MANAGEMENT METHODS ===
  getEmbeddings() {
    return this.http.get("/api/face-detection/embeddings");
  }
  deleteEmbedding(id) {
    return this.http.delete(`/api/face-detection/embeddings/${id}`);
  }
  deleteUserEmbeddings(userId) {
    return this.http.delete(`/api/face-detection/embeddings/user/${userId}`);
  }
  compareEmbedding(id, file, threshold) {
    const formData = new FormData();
    formData.append("image", file);
    const query = threshold !== void 0 && threshold !== null ? `?threshold=${threshold}` : "";
    return this.http.post(`/api/face-detection/embeddings/${id}/compare${query}`, formData);
  }
  compareGlobal(file, threshold) {
    const formData = new FormData();
    formData.append("image", file);
    const query = threshold !== void 0 && threshold !== null ? `?threshold=${threshold}` : "";
    return this.http.post(`/api/face-detection/compare-global${query}`, formData);
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

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-slider.mjs
var _c05 = ["handle"];
var _c13 = (a0) => ({
  $implicit: a0
});
var _forTrack0 = ($index, $item) => $item.value;
function NzSliderMarksComponent_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span", 1);
  }
  if (rf & 2) {
    const attr_r1 = ctx.$implicit;
    \u0275\u0275styleMap(attr_r1.style);
    \u0275\u0275classProp("ant-slider-mark-active", attr_r1.active);
    \u0275\u0275domProperty("innerHTML", attr_r1.label, \u0275\u0275sanitizeHtml);
  }
}
function NzSliderStepComponent_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span", 1);
  }
  if (rf & 2) {
    const step_r1 = ctx.$implicit;
    \u0275\u0275styleMap(step_r1.style);
    \u0275\u0275classProp("ant-slider-dot-active", step_r1.active);
  }
}
function NzSliderComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-slider-step", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("vertical", ctx_r0.nzVertical)("min", ctx_r0.nzMin)("max", ctx_r0.nzMax)("lowerBound", ctx_r0.bounds.lower)("upperBound", ctx_r0.bounds.upper)("marksArray", ctx_r0.marksArray)("included", ctx_r0.nzIncluded)("reverse", ctx_r0.nzReverse);
  }
}
function NzSliderComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-slider-handle", 4);
    \u0275\u0275listener("focusin", function NzSliderComponent_For_4_Template_nz_slider_handle_focusin_0_listener() {
      const $index_r3 = \u0275\u0275restoreView(_r2).$index;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onHandleFocusIn($index_r3));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const handle_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("vertical", ctx_r0.nzVertical)("reverse", ctx_r0.nzReverse)("offset", handle_r4.offset)("value", handle_r4.value)("active", handle_r4.active)("tooltipFormatter", ctx_r0.nzTipFormatter)("tooltipVisible", ctx_r0.nzTooltipVisible)("tooltipPlacement", ctx_r0.nzTooltipPlacement)("dragging", ctx_r0.dragging())("dir", ctx_r0.dir);
  }
}
function NzSliderComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-slider-marks", 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("vertical", ctx_r0.nzVertical)("min", ctx_r0.nzMin)("max", ctx_r0.nzMax)("lowerBound", ctx_r0.bounds.lower)("upperBound", ctx_r0.bounds.upper)("marksArray", ctx_r0.marksArray)("included", ctx_r0.nzIncluded)("reverse", ctx_r0.nzReverse);
  }
}
var _NzSliderHandleComponent = class _NzSliderHandleComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "handleEl");
    __publicField(this, "tooltip");
    __publicField(this, "vertical");
    __publicField(this, "reverse");
    __publicField(this, "offset");
    __publicField(this, "value");
    __publicField(this, "tooltipVisible", "default");
    __publicField(this, "tooltipPlacement");
    __publicField(this, "tooltipFormatter");
    __publicField(this, "active", false);
    __publicField(this, "dir", "ltr");
    __publicField(this, "dragging");
    __publicField(this, "tooltipTitle");
    __publicField(this, "style", {});
    __publicField(this, "enterHandle", () => {
      if (!this.dragging) {
        this.toggleTooltip(true);
        this.updateTooltipPosition();
        this.cdr.detectChanges();
      }
    });
    __publicField(this, "leaveHandle", () => {
      if (!this.dragging) {
        this.toggleTooltip(false);
        this.cdr.detectChanges();
      }
    });
  }
  ngOnChanges(changes) {
    const {
      offset,
      value,
      active,
      tooltipVisible,
      reverse,
      dir
    } = changes;
    if (offset || reverse || dir) {
      this.updateStyle();
    }
    if (value) {
      this.updateTooltipTitle();
      this.updateTooltipPosition();
    }
    if (active) {
      if (active.currentValue) {
        this.toggleTooltip(true);
      } else {
        this.toggleTooltip(false);
      }
    }
    if ((tooltipVisible == null ? void 0 : tooltipVisible.currentValue) === "always") {
      Promise.resolve().then(() => this.toggleTooltip(true, true));
    }
  }
  focus() {
    var _a;
    (_a = this.handleEl) == null ? void 0 : _a.nativeElement.focus();
  }
  toggleTooltip(show, force = false) {
    var _a, _b;
    if (!force && (this.tooltipVisible !== "default" || !this.tooltip)) {
      return;
    }
    if (show) {
      (_a = this.tooltip) == null ? void 0 : _a.show();
    } else {
      (_b = this.tooltip) == null ? void 0 : _b.hide();
    }
  }
  updateTooltipTitle() {
    if (this.tooltipFormatter) {
      this.tooltipTitle = typeof this.tooltipFormatter === "function" ? this.tooltipFormatter(this.value) : this.tooltipFormatter;
    } else {
      this.tooltipTitle = `${this.value}`;
    }
  }
  updateTooltipPosition() {
    if (this.tooltip) {
      Promise.resolve().then(() => {
        var _a;
        return (_a = this.tooltip) == null ? void 0 : _a.updatePosition();
      });
    }
  }
  updateStyle() {
    if (this.vertical) {
      this.style = {
        [this.reverse ? "top" : "bottom"]: `${this.offset}%`,
        [this.reverse ? "bottom" : "top"]: "auto",
        transform: this.reverse ? null : `translateY(+50%)`
      };
    } else {
      this.style = __spreadProps(__spreadValues({}, this.getHorizontalStylePosition()), {
        transform: `translateX(${this.reverse ? this.dir === "rtl" ? "-" : "+" : this.dir === "rtl" ? "+" : "-"}50%)`
      });
    }
    this.cdr.markForCheck();
  }
  getHorizontalStylePosition() {
    let left = this.reverse ? "auto" : `${this.offset}%`;
    let right = this.reverse ? `${this.offset}%` : "auto";
    if (this.dir === "rtl") {
      [left, right] = [right, left];
    }
    return {
      left,
      right
    };
  }
};
__publicField(_NzSliderHandleComponent, "\u0275fac", function NzSliderHandleComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSliderHandleComponent)();
});
__publicField(_NzSliderHandleComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSliderHandleComponent,
  selectors: [["nz-slider-handle"]],
  viewQuery: function NzSliderHandleComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c05, 5)(NzTooltipDirective, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.handleEl = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tooltip = _t.first);
    }
  },
  hostBindings: function NzSliderHandleComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("mouseenter", function NzSliderHandleComponent_mouseenter_HostBindingHandler() {
        return ctx.enterHandle();
      })("mouseleave", function NzSliderHandleComponent_mouseleave_HostBindingHandler() {
        return ctx.leaveHandle();
      });
    }
  },
  inputs: {
    vertical: [2, "vertical", "vertical", booleanAttribute],
    reverse: [2, "reverse", "reverse", booleanAttribute],
    offset: [2, "offset", "offset", numberAttributeWithZeroFallback],
    value: [2, "value", "value", numberAttributeWithZeroFallback],
    tooltipVisible: "tooltipVisible",
    tooltipPlacement: "tooltipPlacement",
    tooltipFormatter: "tooltipFormatter",
    active: [2, "active", "active", booleanAttribute],
    dir: "dir",
    dragging: "dragging"
  },
  exportAs: ["nzSliderHandle"],
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 2,
  vars: 8,
  consts: [["handle", ""], ["tabindex", "0", "nz-tooltip", "", 1, "ant-slider-handle", 3, "nzTooltipTitle", "nzTooltipTitleContext", "nzTooltipTrigger", "nzTooltipPlacement"]],
  template: function NzSliderHandleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "div", 1, 0);
    }
    if (rf & 2) {
      \u0275\u0275styleMap(ctx.style);
      \u0275\u0275property("nzTooltipTitle", ctx.tooltipFormatter === null || ctx.tooltipVisible === "never" ? null : ctx.tooltipTitle)("nzTooltipTitleContext", \u0275\u0275pureFunction1(6, _c13, ctx.value))("nzTooltipTrigger", null)("nzTooltipPlacement", ctx.tooltipPlacement);
    }
  },
  dependencies: [NzTooltipModule, NzTooltipDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzSliderHandleComponent = _NzSliderHandleComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSliderHandleComponent, [{
    type: Component,
    args: [{
      selector: "nz-slider-handle",
      exportAs: "nzSliderHandle",
      template: `
    <div
      #handle
      class="ant-slider-handle"
      tabindex="0"
      nz-tooltip
      [style]="style"
      [nzTooltipTitle]="tooltipFormatter === null || tooltipVisible === 'never' ? null : tooltipTitle"
      [nzTooltipTitleContext]="{ $implicit: value }"
      [nzTooltipTrigger]="null"
      [nzTooltipPlacement]="tooltipPlacement"
    ></div>
  `,
      host: {
        "(mouseenter)": "enterHandle()",
        "(mouseleave)": "leaveHandle()"
      },
      imports: [NzTooltipModule],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], null, {
    handleEl: [{
      type: ViewChild,
      args: ["handle", {
        static: false
      }]
    }],
    tooltip: [{
      type: ViewChild,
      args: [NzTooltipDirective, {
        static: false
      }]
    }],
    vertical: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    reverse: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    offset: [{
      type: Input,
      args: [{
        transform: numberAttributeWithZeroFallback
      }]
    }],
    value: [{
      type: Input,
      args: [{
        transform: numberAttributeWithZeroFallback
      }]
    }],
    tooltipVisible: [{
      type: Input
    }],
    tooltipPlacement: [{
      type: Input
    }],
    tooltipFormatter: [{
      type: Input
    }],
    active: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    dir: [{
      type: Input
    }],
    dragging: [{
      type: Input
    }]
  });
})();
var _NzSliderMarksComponent = class _NzSliderMarksComponent {
  constructor() {
    __publicField(this, "lowerBound", null);
    __publicField(this, "upperBound", null);
    __publicField(this, "marksArray", []);
    __publicField(this, "min");
    __publicField(this, "max");
    __publicField(this, "vertical", false);
    __publicField(this, "included", false);
    __publicField(this, "reverse");
    __publicField(this, "marks", []);
  }
  ngOnChanges(changes) {
    const {
      marksArray,
      lowerBound,
      upperBound,
      reverse
    } = changes;
    if (marksArray || reverse) {
      this.buildMarks();
    }
    if (marksArray || lowerBound || upperBound || reverse) {
      this.togglePointActive();
    }
  }
  buildMarks() {
    const range = this.max - this.min;
    this.marks = this.marksArray.map((mark) => {
      const {
        value,
        offset,
        config
      } = mark;
      const style = this.getMarkStyles(value, range, config);
      const label = isConfigObject(config) ? config.label : config;
      return {
        label,
        offset,
        style,
        value,
        config,
        active: false
      };
    });
  }
  getMarkStyles(value, range, config) {
    let style;
    const markValue = this.reverse ? this.max + this.min - value : value;
    if (this.vertical) {
      style = {
        marginBottom: "-50%",
        bottom: `${(markValue - this.min) / range * 100}%`
      };
    } else {
      style = {
        transform: `translate3d(-50%, 0, 0)`,
        left: `${(markValue - this.min) / range * 100}%`
      };
    }
    if (isConfigObject(config) && config.style) {
      style = __spreadValues(__spreadValues({}, style), config.style);
    }
    return style;
  }
  togglePointActive() {
    if (this.marks && this.lowerBound !== null && this.upperBound !== null) {
      this.marks.forEach((mark) => {
        const value = mark.value;
        mark.active = this.included ? value <= this.upperBound && value >= this.lowerBound : value === this.upperBound;
      });
    }
  }
};
__publicField(_NzSliderMarksComponent, "\u0275fac", function NzSliderMarksComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSliderMarksComponent)();
});
__publicField(_NzSliderMarksComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSliderMarksComponent,
  selectors: [["nz-slider-marks"]],
  hostAttrs: [1, "ant-slider-mark"],
  inputs: {
    lowerBound: "lowerBound",
    upperBound: "upperBound",
    marksArray: "marksArray",
    min: [2, "min", "min", numberAttribute],
    max: [2, "max", "max", numberAttribute],
    vertical: [2, "vertical", "vertical", booleanAttribute],
    included: [2, "included", "included", booleanAttribute],
    reverse: [2, "reverse", "reverse", booleanAttribute]
  },
  exportAs: ["nzSliderMarks"],
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 2,
  vars: 0,
  consts: [[1, "ant-slider-mark-text", 3, "ant-slider-mark-active", "style", "innerHTML"], [1, "ant-slider-mark-text", 3, "innerHTML"]],
  template: function NzSliderMarksComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275repeaterCreate(0, NzSliderMarksComponent_For_1_Template, 1, 5, "span", 0, _forTrack0);
    }
    if (rf & 2) {
      \u0275\u0275repeater(ctx.marks);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzSliderMarksComponent = _NzSliderMarksComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSliderMarksComponent, [{
    type: Component,
    args: [{
      selector: "nz-slider-marks",
      exportAs: "nzSliderMarks",
      template: `
    @for (attr of marks; track attr.value) {
      <span
        class="ant-slider-mark-text"
        [class.ant-slider-mark-active]="attr.active"
        [style]="attr.style"
        [innerHTML]="attr.label"
      ></span>
    }
  `,
      host: {
        class: "ant-slider-mark"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], null, {
    lowerBound: [{
      type: Input
    }],
    upperBound: [{
      type: Input
    }],
    marksArray: [{
      type: Input
    }],
    min: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    max: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    vertical: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    included: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    reverse: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
function isConfigObject(config) {
  return typeof config !== "string";
}
var _NzSliderStepComponent = class _NzSliderStepComponent {
  constructor() {
    __publicField(this, "lowerBound", null);
    __publicField(this, "upperBound", null);
    __publicField(this, "marksArray", []);
    __publicField(this, "min");
    __publicField(this, "max");
    __publicField(this, "vertical", false);
    __publicField(this, "included", false);
    __publicField(this, "reverse");
    __publicField(this, "steps", []);
  }
  ngOnChanges(changes) {
    const {
      marksArray,
      lowerBound,
      upperBound,
      reverse
    } = changes;
    if (marksArray || reverse) {
      this.buildSteps();
    }
    if (marksArray || lowerBound || upperBound || reverse) {
      this.togglePointActive();
    }
  }
  buildSteps() {
    const orient = this.vertical ? "bottom" : "left";
    this.steps = this.marksArray.map((mark) => {
      const {
        value,
        config
      } = mark;
      let offset = mark.offset;
      const range = this.max - this.min;
      if (this.reverse) {
        offset = (this.max - value) / range * 100;
      }
      return {
        value,
        offset,
        config,
        active: false,
        style: {
          [orient]: `${offset}%`,
          transform: this.vertical ? "translateY(50%)" : "translateX(-50%)"
        }
      };
    });
  }
  togglePointActive() {
    if (this.steps && this.lowerBound !== null && this.upperBound !== null) {
      this.steps.forEach((step) => {
        const value = step.value;
        step.active = this.included ? value <= this.upperBound && value >= this.lowerBound : value === this.upperBound;
      });
    }
  }
};
__publicField(_NzSliderStepComponent, "\u0275fac", function NzSliderStepComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSliderStepComponent)();
});
__publicField(_NzSliderStepComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSliderStepComponent,
  selectors: [["nz-slider-step"]],
  hostAttrs: [1, "ant-slider-step"],
  inputs: {
    lowerBound: "lowerBound",
    upperBound: "upperBound",
    marksArray: "marksArray",
    min: [2, "min", "min", numberAttribute],
    max: [2, "max", "max", numberAttribute],
    vertical: [2, "vertical", "vertical", booleanAttribute],
    included: [2, "included", "included", booleanAttribute],
    reverse: [2, "reverse", "reverse", booleanAttribute]
  },
  exportAs: ["nzSliderStep"],
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 2,
  vars: 0,
  consts: [[1, "ant-slider-dot", 3, "ant-slider-dot-active", "style"], [1, "ant-slider-dot"]],
  template: function NzSliderStepComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275repeaterCreate(0, NzSliderStepComponent_For_1_Template, 1, 4, "span", 0, _forTrack0);
    }
    if (rf & 2) {
      \u0275\u0275repeater(ctx.steps);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzSliderStepComponent = _NzSliderStepComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSliderStepComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-slider-step",
      exportAs: "nzSliderStep",
      template: `
    @for (step of steps; track step.value) {
      <span class="ant-slider-dot" [class.ant-slider-dot-active]="step.active" [style]="step.style!"></span>
    }
  `,
      host: {
        class: "ant-slider-step"
      }
    }]
  }], null, {
    lowerBound: [{
      type: Input
    }],
    upperBound: [{
      type: Input
    }],
    marksArray: [{
      type: Input
    }],
    min: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    max: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    vertical: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    included: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    reverse: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzSliderTrackComponent = class _NzSliderTrackComponent {
  constructor() {
    __publicField(this, "offset", 0);
    __publicField(this, "reverse", false);
    __publicField(this, "dir", "ltr");
    __publicField(this, "length", 0);
    __publicField(this, "vertical", false);
    __publicField(this, "included", false);
    __publicField(this, "style", {});
  }
  ngOnChanges() {
    const visibility = this.included ? "visible" : "hidden";
    if (this.vertical) {
      this.style = {
        [this.reverse ? "top" : "bottom"]: `${this.offset}%`,
        [this.reverse ? "bottom" : "top"]: "auto",
        height: `${this.length}%`,
        visibility
      };
    } else {
      this.style = __spreadProps(__spreadValues({}, this.getHorizontalStylePosition()), {
        width: `${this.length}%`,
        visibility
      });
    }
  }
  getHorizontalStylePosition() {
    let left = this.reverse ? "auto" : `${this.offset}%`;
    let right = this.reverse ? `${this.offset}%` : "auto";
    if (this.dir === "rtl") {
      [left, right] = [right, left];
    }
    return {
      left,
      right
    };
  }
};
__publicField(_NzSliderTrackComponent, "\u0275fac", function NzSliderTrackComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSliderTrackComponent)();
});
__publicField(_NzSliderTrackComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSliderTrackComponent,
  selectors: [["nz-slider-track"]],
  inputs: {
    offset: [2, "offset", "offset", numberAttribute],
    reverse: [2, "reverse", "reverse", booleanAttribute],
    dir: "dir",
    length: [2, "length", "length", numberAttribute],
    vertical: [2, "vertical", "vertical", booleanAttribute],
    included: [2, "included", "included", booleanAttribute]
  },
  exportAs: ["nzSliderTrack"],
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 1,
  vars: 2,
  consts: [[1, "ant-slider-track"]],
  template: function NzSliderTrackComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElement(0, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275styleMap(ctx.style);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzSliderTrackComponent = _NzSliderTrackComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSliderTrackComponent, [{
    type: Component,
    args: [{
      selector: "nz-slider-track",
      exportAs: "nzSliderTrack",
      template: `<div class="ant-slider-track" [style]="style"></div>`,
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, {
    offset: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    reverse: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    dir: [{
      type: Input
    }],
    length: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    vertical: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    included: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzSliderComponent = class _NzSliderComponent {
  constructor() {
    __publicField(this, "slider", inject(ElementRef));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "platform", inject(Platform));
    __publicField(this, "directionality", inject(Directionality));
    __publicField(this, "handlerComponents");
    __publicField(this, "nzDisabled", false);
    __publicField(this, "nzDots", false);
    __publicField(this, "nzIncluded", true);
    __publicField(this, "nzRange", false);
    __publicField(this, "nzVertical", false);
    __publicField(this, "nzReverse", false);
    __publicField(this, "nzDefaultValue");
    __publicField(this, "nzMarks", null);
    __publicField(this, "nzMax", 100);
    __publicField(this, "nzMin", 0);
    __publicField(this, "nzStep", 1);
    __publicField(this, "nzTooltipVisible", "default");
    __publicField(this, "nzTooltipPlacement", "top");
    __publicField(this, "nzTipFormatter");
    __publicField(this, "nzOnAfterChange", new EventEmitter());
    __publicField(this, "value", null);
    __publicField(this, "cacheSliderStart", null);
    __publicField(this, "cacheSliderLength", null);
    __publicField(this, "activeValueIndex");
    // Current activated handle's index ONLY for range=true
    __publicField(this, "track", {
      offset: null,
      length: null
    });
    // Track's offset and length
    __publicField(this, "handles", []);
    // Handles' offset
    __publicField(this, "marksArray", null);
    // "steps" in array type with more data & FILTER out the invalid mark
    __publicField(this, "bounds", {
      lower: null,
      upper: null
    });
    // now for nz-slider-step
    __publicField(this, "dir", "ltr");
    __publicField(this, "dragging", signal(false, ...ngDevMode ? [{
      debugName: "dragging"
    }] : []));
    __publicField(this, "dragStart$");
    __publicField(this, "dragMove$");
    __publicField(this, "dragEnd$");
    __publicField(this, "dragStart_");
    __publicField(this, "dragMove_");
    __publicField(this, "dragEnd_");
    __publicField(this, "isNzDisableFirstChange", true);
  }
  ngOnInit() {
    var _a;
    this.dir = this.directionality.value;
    (_a = this.directionality.change) == null ? void 0 : _a.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
      this.updateTrackAndHandles();
      this.onValueChange(this.getValue(true));
    });
    this.handles = generateHandlers(this.nzRange ? 2 : 1);
    this.marksArray = this.nzMarks ? this.generateMarkItems(this.nzMarks) : null;
    this.bindDraggingHandlers();
    this.toggleDragDisabled(this.nzDisabled);
    if (this.getValue() === null) {
      this.setValue(this.formatValue(null));
    }
  }
  ngOnChanges(changes) {
    const {
      nzDisabled,
      nzMarks,
      nzRange
    } = changes;
    if (nzDisabled && !nzDisabled.firstChange) {
      this.toggleDragDisabled(nzDisabled.currentValue);
    } else if (nzMarks && !nzMarks.firstChange) {
      this.marksArray = this.nzMarks ? this.generateMarkItems(this.nzMarks) : null;
    } else if (nzRange && !nzRange.firstChange) {
      this.handles = generateHandlers(nzRange.currentValue ? 2 : 1);
      this.setValue(this.formatValue(null));
    }
  }
  writeValue(val) {
    this.setValue(val, true);
  }
  onValueChange(_value) {
  }
  onTouched() {
  }
  registerOnChange(fn) {
    this.onValueChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.nzDisabled = this.isNzDisableFirstChange && this.nzDisabled || isDisabled;
    this.isNzDisableFirstChange = false;
    this.toggleDragDisabled(this.nzDisabled);
    this.cdr.markForCheck();
  }
  /**
   * Event handler is only triggered when a slider handler is focused.
   */
  onKeyDown(e) {
    if (this.nzDisabled) {
      return;
    }
    const code = e.keyCode;
    const isIncrease = code === RIGHT_ARROW || code === UP_ARROW;
    const isDecrease = code === LEFT_ARROW || code === DOWN_ARROW;
    if (!(isIncrease || isDecrease)) {
      return;
    }
    e.preventDefault();
    const step = (isDecrease ? -this.nzStep : this.nzStep) * (this.nzReverse ? -1 : 1) * (this.dir === "rtl" ? -1 : 1);
    const newVal = this.nzRange ? this.value[this.activeValueIndex] + step : this.value + step;
    this.setActiveValue(ensureNumberInRange(newVal, this.nzMin, this.nzMax));
    this.nzOnAfterChange.emit(this.getValue(true));
  }
  onHandleFocusIn(index) {
    this.activeValueIndex = index;
  }
  setValue(value, isWriteValue = false) {
    if (isWriteValue) {
      this.value = this.formatValue(value);
      this.updateTrackAndHandles();
    } else if (!valuesEqual(this.value, value)) {
      this.value = value;
      this.updateTrackAndHandles();
      this.onValueChange(this.getValue(true));
    }
  }
  getValue(cloneAndSort = false) {
    if (cloneAndSort && this.value && isValueRange(this.value)) {
      return [...this.value].sort((a, b) => a - b);
    }
    return this.value;
  }
  /**
   * Clone & sort current value and convert them to offsets, then return the new one.
   */
  getValueToOffset(value) {
    let normalizedValue = value;
    if (typeof normalizedValue === "undefined") {
      normalizedValue = this.getValue(true);
    }
    return isValueRange(normalizedValue) ? normalizedValue.map((val) => this.valueToOffset(val)) : this.valueToOffset(normalizedValue);
  }
  /**
   * Find the closest value to be activated.
   */
  setActiveValueIndex(pointerValue) {
    const value = this.getValue();
    if (isValueRange(value)) {
      let minimal = null;
      let gap;
      let activeIndex = -1;
      value.forEach((val, index) => {
        gap = Math.abs(pointerValue - val);
        if (minimal === null || gap < minimal) {
          minimal = gap;
          activeIndex = index;
        }
      });
      this.activeValueIndex = activeIndex;
      this.handlerComponents.toArray()[activeIndex].focus();
    } else {
      this.handlerComponents.toArray()[0].focus();
    }
  }
  setActiveValue(pointerValue) {
    if (isValueRange(this.value)) {
      const newValue = [...this.value];
      newValue[this.activeValueIndex] = pointerValue;
      this.setValue(newValue);
    } else {
      this.setValue(pointerValue);
    }
  }
  /**
   * Update track and handles' position and length.
   */
  updateTrackAndHandles() {
    const value = this.getValue();
    const offset = this.getValueToOffset(value);
    const valueSorted = this.getValue(true);
    const offsetSorted = this.getValueToOffset(valueSorted);
    const boundParts = isValueRange(valueSorted) ? valueSorted : [0, valueSorted];
    const trackParts = isValueRange(offsetSorted) ? [offsetSorted[0], offsetSorted[1] - offsetSorted[0]] : [0, offsetSorted];
    this.handles.forEach((handle, index) => {
      handle.offset = isValueRange(offset) ? offset[index] : offset;
      handle.value = isValueRange(value) ? value[index] : value || 0;
    });
    [this.bounds.lower, this.bounds.upper] = boundParts;
    [this.track.offset, this.track.length] = trackParts;
    this.cdr.markForCheck();
  }
  onDragStart(value) {
    this.toggleDragMoving(true);
    this.cacheSliderProperty();
    this.setActiveValueIndex(this.getLogicalValue(value));
    this.setActiveValue(this.getLogicalValue(value));
    this.showHandleTooltip(this.nzRange ? this.activeValueIndex : 0);
  }
  onDragMove(value) {
    this.setActiveValue(this.getLogicalValue(value));
    this.cdr.markForCheck();
  }
  getLogicalValue(value) {
    if (this.nzReverse) {
      if (!this.nzVertical && this.dir === "rtl") {
        return value;
      }
      return this.nzMax - value + this.nzMin;
    }
    if (!this.nzVertical && this.dir === "rtl") {
      return this.nzMax - value + this.nzMin;
    }
    return value;
  }
  onDragEnd() {
    this.nzOnAfterChange.emit(this.getValue(true));
    this.toggleDragMoving(false);
    this.cacheSliderProperty(true);
    this.hideAllHandleTooltip();
    this.cdr.markForCheck();
  }
  /**
   * Create user interactions handles.
   */
  bindDraggingHandlers() {
    if (!this.platform.isBrowser) {
      return;
    }
    const pluckFunc = (keys) => (event) => keys.reduce((acc, key) => acc[key] || acc, event);
    const sliderDOM = this.slider.nativeElement;
    const orientField = this.nzVertical ? "pageY" : "pageX";
    const mouse = {
      start: "mousedown",
      move: "mousemove",
      end: "mouseup",
      pluckKey: [orientField]
    };
    const touch = {
      start: "touchstart",
      move: "touchmove",
      end: "touchend",
      pluckKey: ["touches", "0", orientField],
      filter: (e) => e instanceof TouchEvent
    };
    [mouse, touch].forEach((source) => {
      const {
        start,
        move,
        end,
        pluckKey,
        filter: filterFunc = () => true
      } = source;
      source.startPlucked$ = fromEvent(sliderDOM, start).pipe(filter(filterFunc), tap(silentEvent), map(pluckFunc(pluckKey)), map((position) => this.findClosestValue(position)));
      source.end$ = fromEvent(document, end);
      source.moveResolved$ = fromEvent(document, move).pipe(filter(filterFunc), tap(silentEvent), map(pluckFunc(pluckKey)), distinctUntilChanged(), map((position) => this.findClosestValue(position)), distinctUntilChanged(), takeUntil(source.end$));
    });
    this.dragStart$ = merge(mouse.startPlucked$, touch.startPlucked$);
    this.dragMove$ = merge(mouse.moveResolved$, touch.moveResolved$);
    this.dragEnd$ = merge(mouse.end$, touch.end$);
  }
  subscribeDrag(periods = ["start", "move", "end"]) {
    if (periods.indexOf("start") !== -1 && this.dragStart$ && !this.dragStart_) {
      this.dragStart_ = this.dragStart$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(this.onDragStart.bind(this));
    }
    if (periods.indexOf("move") !== -1 && this.dragMove$ && !this.dragMove_) {
      this.dragMove_ = this.dragMove$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(this.onDragMove.bind(this));
    }
    if (periods.indexOf("end") !== -1 && this.dragEnd$ && !this.dragEnd_) {
      this.dragEnd_ = this.dragEnd$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(this.onDragEnd.bind(this));
    }
  }
  unsubscribeDrag(periods = ["start", "move", "end"]) {
    var _a, _b, _c;
    if (periods.includes("start")) {
      (_a = this.dragStart_) == null ? void 0 : _a.unsubscribe();
      this.dragStart_ = null;
    }
    if (periods.includes("move")) {
      (_b = this.dragMove_) == null ? void 0 : _b.unsubscribe();
      this.dragMove_ = null;
    }
    if (periods.includes("end")) {
      (_c = this.dragEnd_) == null ? void 0 : _c.unsubscribe();
      this.dragEnd_ = null;
    }
  }
  toggleDragMoving(movable) {
    const periods = ["move", "end"];
    if (movable) {
      this.dragging.set(true);
      this.subscribeDrag(periods);
    } else {
      this.dragging.set(false);
      this.unsubscribeDrag(periods);
    }
  }
  toggleDragDisabled(disabled) {
    if (disabled) {
      this.unsubscribeDrag();
    } else {
      this.subscribeDrag(["start"]);
    }
  }
  findClosestValue(position) {
    const sliderStart = this.getSliderStartPosition();
    const sliderLength = this.getSliderLength();
    const ratio = ensureNumberInRange((position - sliderStart) / sliderLength, 0, 1);
    const val = (this.nzMax - this.nzMin) * (this.nzVertical ? 1 - ratio : ratio) + this.nzMin;
    const points = this.nzMarks === null ? [] : Object.keys(this.nzMarks).map(parseFloat).sort((a, b) => a - b);
    if (this.nzStep !== 0 && !this.nzDots) {
      const closestOne = Math.round(val / this.nzStep) * this.nzStep;
      points.push(closestOne);
    }
    const gaps = points.map((point) => Math.abs(val - point));
    const closest = points[gaps.indexOf(Math.min(...gaps))];
    return this.nzStep === 0 ? closest : parseFloat(closest.toFixed(getPrecision(this.nzStep)));
  }
  valueToOffset(value) {
    return getPercent(this.nzMin, this.nzMax, value);
  }
  getSliderStartPosition() {
    if (this.cacheSliderStart !== null) {
      return this.cacheSliderStart;
    }
    const offset = getElementOffset(this.slider.nativeElement);
    return this.nzVertical ? offset.top : offset.left;
  }
  getSliderLength() {
    if (this.cacheSliderLength !== null) {
      return this.cacheSliderLength;
    }
    const sliderDOM = this.slider.nativeElement;
    return this.nzVertical ? sliderDOM.clientHeight : sliderDOM.clientWidth;
  }
  /**
   * Cache DOM layout/reflow operations for performance (may not necessary?)
   */
  cacheSliderProperty(remove = false) {
    this.cacheSliderStart = remove ? null : this.getSliderStartPosition();
    this.cacheSliderLength = remove ? null : this.getSliderLength();
  }
  formatValue(value) {
    if (isNil(value)) {
      return this.nzRange ? [this.nzMin, this.nzMax] : this.nzMin;
    } else if (assertValueValid(value, this.nzRange)) {
      return isValueRange(value) ? value.map((val) => ensureNumberInRange(val, this.nzMin, this.nzMax)) : ensureNumberInRange(value, this.nzMin, this.nzMax);
    } else {
      return this.nzDefaultValue ? this.nzDefaultValue : this.nzRange ? [this.nzMin, this.nzMax] : this.nzMin;
    }
  }
  /**
   * Show one handle's tooltip and hide others'.
   */
  showHandleTooltip(handleIndex = 0) {
    this.handles.forEach((handle, index) => handle.active = index === handleIndex);
  }
  hideAllHandleTooltip() {
    this.handles.forEach((handle) => handle.active = false);
  }
  generateMarkItems(marks) {
    const marksArray = [];
    for (const key in marks) {
      if (marks.hasOwnProperty(key)) {
        const mark = marks[key];
        const val = typeof key === "number" ? key : parseFloat(key);
        if (val >= this.nzMin && val <= this.nzMax) {
          marksArray.push({
            value: val,
            offset: this.valueToOffset(val),
            config: mark
          });
        }
      }
    }
    return marksArray.length ? marksArray : null;
  }
};
__publicField(_NzSliderComponent, "\u0275fac", function NzSliderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSliderComponent)();
});
__publicField(_NzSliderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSliderComponent,
  selectors: [["nz-slider"]],
  viewQuery: function NzSliderComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(NzSliderHandleComponent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.handlerComponents = _t);
    }
  },
  hostAttrs: [1, "ant-slider"],
  hostVars: 8,
  hostBindings: function NzSliderComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown", function NzSliderComponent_keydown_HostBindingHandler($event) {
        return ctx.onKeyDown($event);
      });
    }
    if (rf & 2) {
      \u0275\u0275classProp("ant-slider-rtl", ctx.dir === "rtl")("ant-slider-disabled", ctx.nzDisabled)("ant-slider-vertical", ctx.nzVertical)("ant-slider-with-marks", ctx.marksArray);
    }
  },
  inputs: {
    nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
    nzDots: [2, "nzDots", "nzDots", booleanAttribute],
    nzIncluded: [2, "nzIncluded", "nzIncluded", booleanAttribute],
    nzRange: [2, "nzRange", "nzRange", booleanAttribute],
    nzVertical: [2, "nzVertical", "nzVertical", booleanAttribute],
    nzReverse: [2, "nzReverse", "nzReverse", booleanAttribute],
    nzDefaultValue: "nzDefaultValue",
    nzMarks: "nzMarks",
    nzMax: [2, "nzMax", "nzMax", numberAttribute],
    nzMin: [2, "nzMin", "nzMin", numberAttribute],
    nzStep: [2, "nzStep", "nzStep", numberAttributeWithZeroFallback],
    nzTooltipVisible: "nzTooltipVisible",
    nzTooltipPlacement: "nzTooltipPlacement",
    nzTipFormatter: "nzTipFormatter"
  },
  outputs: {
    nzOnAfterChange: "nzOnAfterChange"
  },
  exportAs: ["nzSlider"],
  features: [\u0275\u0275ProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _NzSliderComponent),
    multi: true
  }]), \u0275\u0275NgOnChangesFeature],
  decls: 6,
  vars: 8,
  consts: [[1, "ant-slider-rail"], [3, "vertical", "included", "offset", "length", "reverse", "dir"], [3, "vertical", "min", "max", "lowerBound", "upperBound", "marksArray", "included", "reverse"], [3, "vertical", "reverse", "offset", "value", "active", "tooltipFormatter", "tooltipVisible", "tooltipPlacement", "dragging", "dir"], [3, "focusin", "vertical", "reverse", "offset", "value", "active", "tooltipFormatter", "tooltipVisible", "tooltipPlacement", "dragging", "dir"]],
  template: function NzSliderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "div", 0)(1, "nz-slider-track", 1);
      \u0275\u0275conditionalCreate(2, NzSliderComponent_Conditional_2_Template, 1, 8, "nz-slider-step", 2);
      \u0275\u0275repeaterCreate(3, NzSliderComponent_For_4_Template, 1, 10, "nz-slider-handle", 3, _forTrack0);
      \u0275\u0275conditionalCreate(5, NzSliderComponent_Conditional_5_Template, 1, 8, "nz-slider-marks", 2);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("vertical", ctx.nzVertical)("included", ctx.nzIncluded)("offset", ctx.track.offset)("length", ctx.track.length)("reverse", ctx.nzReverse)("dir", ctx.dir);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.marksArray ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.handles);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.marksArray ? 5 : -1);
    }
  },
  dependencies: [NzSliderTrackComponent, NzSliderStepComponent, NzSliderHandleComponent, NzSliderMarksComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzSliderComponent = _NzSliderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSliderComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-slider",
      exportAs: "nzSlider",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzSliderComponent),
        multi: true
      }],
      template: `
    <div class="ant-slider-rail"></div>
    <nz-slider-track
      [vertical]="nzVertical"
      [included]="nzIncluded"
      [offset]="track.offset!"
      [length]="track.length!"
      [reverse]="nzReverse"
      [dir]="dir"
    />
    @if (marksArray) {
      <nz-slider-step
        [vertical]="nzVertical"
        [min]="nzMin"
        [max]="nzMax"
        [lowerBound]="$any(bounds.lower)"
        [upperBound]="$any(bounds.upper)"
        [marksArray]="marksArray"
        [included]="nzIncluded"
        [reverse]="nzReverse"
      />
    }
    @for (handle of handles; track handle.value) {
      <nz-slider-handle
        [vertical]="nzVertical"
        [reverse]="nzReverse"
        [offset]="handle.offset!"
        [value]="handle.value!"
        [active]="handle.active"
        [tooltipFormatter]="nzTipFormatter"
        [tooltipVisible]="nzTooltipVisible"
        [tooltipPlacement]="nzTooltipPlacement"
        [dragging]="dragging()"
        [dir]="dir"
        (focusin)="onHandleFocusIn($index)"
      />
    }
    @if (marksArray) {
      <nz-slider-marks
        [vertical]="nzVertical"
        [min]="nzMin"
        [max]="nzMax"
        [lowerBound]="$any(bounds.lower)"
        [upperBound]="$any(bounds.upper)"
        [marksArray]="marksArray"
        [included]="nzIncluded"
        [reverse]="nzReverse"
      />
    }
  `,
      imports: [NzSliderTrackComponent, NzSliderStepComponent, NzSliderHandleComponent, NzSliderMarksComponent],
      host: {
        class: "ant-slider",
        "[class.ant-slider-rtl]": `dir === 'rtl'`,
        "[class.ant-slider-disabled]": "nzDisabled",
        "[class.ant-slider-vertical]": "nzVertical",
        "[class.ant-slider-with-marks]": "marksArray",
        "(keydown)": "onKeyDown($event)"
      }
    }]
  }], null, {
    handlerComponents: [{
      type: ViewChildren,
      args: [NzSliderHandleComponent]
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDots: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzIncluded: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzRange: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzVertical: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzReverse: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDefaultValue: [{
      type: Input
    }],
    nzMarks: [{
      type: Input
    }],
    nzMax: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzMin: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzStep: [{
      type: Input,
      args: [{
        transform: numberAttributeWithZeroFallback
      }]
    }],
    nzTooltipVisible: [{
      type: Input
    }],
    nzTooltipPlacement: [{
      type: Input
    }],
    nzTipFormatter: [{
      type: Input
    }],
    nzOnAfterChange: [{
      type: Output
    }]
  });
})();
function getValueTypeNotMatchError() {
  return new Error(`The "nzRange" can't match the "ngModel"'s type, please check these properties: "nzRange", "ngModel", "nzDefaultValue".`);
}
function isValueRange(value) {
  if (value instanceof Array) {
    return value.length === 2;
  } else {
    return false;
  }
}
function generateHandlers(amount) {
  return Array(amount).fill(0).map(() => ({
    offset: null,
    value: null,
    active: false
  }));
}
function assertValueValid(value, isRange) {
  if (!isValueRange(value) && isNaN(value) || isValueRange(value) && value.some((v) => isNaN(v))) {
    return false;
  }
  return assertValueTypeMatch(value, isRange);
}
function assertValueTypeMatch(value, isRange = false) {
  if (isValueRange(value) !== isRange) {
    throw getValueTypeNotMatchError();
  }
  return true;
}
function valuesEqual(valA, valB) {
  if (typeof valA !== typeof valB) {
    return false;
  }
  return isValueRange(valA) && isValueRange(valB) ? arraysEqual(valA, valB) : valA === valB;
}
var _NzSliderModule = class _NzSliderModule {
};
__publicField(_NzSliderModule, "\u0275fac", function NzSliderModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSliderModule)();
});
__publicField(_NzSliderModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzSliderModule,
  imports: [NzSliderComponent, NzSliderTrackComponent, NzSliderHandleComponent, NzSliderStepComponent, NzSliderMarksComponent],
  exports: [NzSliderComponent, NzSliderTrackComponent, NzSliderHandleComponent, NzSliderStepComponent, NzSliderMarksComponent]
}));
__publicField(_NzSliderModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzSliderComponent, NzSliderHandleComponent]
}));
var NzSliderModule = _NzSliderModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSliderModule, [{
    type: NgModule,
    args: [{
      imports: [NzSliderComponent, NzSliderTrackComponent, NzSliderHandleComponent, NzSliderStepComponent, NzSliderMarksComponent],
      exports: [NzSliderComponent, NzSliderTrackComponent, NzSliderHandleComponent, NzSliderStepComponent, NzSliderMarksComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-input-number.mjs
var _c06 = ["input"];
var _c14 = ["inputNumberHost"];
var _c23 = [[["", "nzInputAddonBefore", ""]], [["", "nzInputAddonAfter", ""]], [["", "nzInputPrefix", ""]], [["", "nzInputSuffix", ""]], [["", "nzInputNumberUpIcon", ""]], [["", "nzInputNumberDownIcon", ""]]];
var _c32 = ["[nzInputAddonBefore]", "[nzInputAddonAfter]", "[nzInputPrefix]", "[nzInputSuffix]", "[nzInputNumberUpIcon]", "[nzInputNumberDownIcon]"];
function NzInputNumberComponent_Conditional_0_ng_template_0_Template(rf, ctx) {
}
function NzInputNumberComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzInputNumberComponent_Conditional_0_ng_template_0_Template, 0, 0, "ng-template", 8);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const inputNumberWithAddonInner_r1 = \u0275\u0275reference(4);
    \u0275\u0275property("ngTemplateOutlet", inputNumberWithAddonInner_r1);
  }
}
function NzInputNumberComponent_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function NzInputNumberComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzInputNumberComponent_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 8);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const inputNumberWithAffixInner_r2 = \u0275\u0275reference(8);
    \u0275\u0275property("ngTemplateOutlet", inputNumberWithAffixInner_r2);
  }
}
function NzInputNumberComponent_Conditional_2_ng_template_0_Template(rf, ctx) {
}
function NzInputNumberComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzInputNumberComponent_Conditional_2_ng_template_0_Template, 0, 0, "ng-template", 8);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const inputNumberInner_r3 = \u0275\u0275reference(12);
    \u0275\u0275property("ngTemplateOutlet", inputNumberInner_r3);
  }
}
function NzInputNumberComponent_ng_template_3_Conditional_1_ProjectionFallback_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate(ctx_r3.nzAddonBefore());
  }
}
function NzInputNumberComponent_ng_template_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275projection(1, 0, null, NzInputNumberComponent_ng_template_3_Conditional_1_ProjectionFallback_1_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
}
function NzInputNumberComponent_ng_template_3_Conditional_2_ng_template_0_Template(rf, ctx) {
}
function NzInputNumberComponent_ng_template_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzInputNumberComponent_ng_template_3_Conditional_2_ng_template_0_Template, 0, 0, "ng-template", 8);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const inputNumberWithAffix_r5 = \u0275\u0275reference(6);
    \u0275\u0275property("ngTemplateOutlet", inputNumberWithAffix_r5);
  }
}
function NzInputNumberComponent_ng_template_3_Conditional_3_ng_template_0_Template(rf, ctx) {
}
function NzInputNumberComponent_ng_template_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzInputNumberComponent_ng_template_3_Conditional_3_ng_template_0_Template, 0, 0, "ng-template", 8);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const inputNumber_r6 = \u0275\u0275reference(10);
    \u0275\u0275property("ngTemplateOutlet", inputNumber_r6);
  }
}
function NzInputNumberComponent_ng_template_3_Conditional_4_ProjectionFallback_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate(ctx_r3.nzAddonAfter());
  }
}
function NzInputNumberComponent_ng_template_3_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275projection(1, 1, null, NzInputNumberComponent_ng_template_3_Conditional_4_ProjectionFallback_1_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
}
function NzInputNumberComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275conditionalCreate(1, NzInputNumberComponent_ng_template_3_Conditional_1_Template, 3, 0, "div", 10);
    \u0275\u0275conditionalCreate(2, NzInputNumberComponent_ng_template_3_Conditional_2_Template, 1, 1, null, 8)(3, NzInputNumberComponent_ng_template_3_Conditional_3_Template, 1, 1, null, 8);
    \u0275\u0275conditionalCreate(4, NzInputNumberComponent_ng_template_3_Conditional_4_Template, 3, 0, "div", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.hasAddonBefore() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.hasAffix() ? 2 : 3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.hasAddonAfter() ? 4 : -1);
  }
}
function NzInputNumberComponent_ng_template_5_ng_template_1_Template(rf, ctx) {
}
function NzInputNumberComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, NzInputNumberComponent_ng_template_5_ng_template_1_Template, 0, 0, "ng-template", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const inputNumberWithAffixInner_r2 = \u0275\u0275reference(8);
    \u0275\u0275classMap(ctx_r3.affixWrapperClass());
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", inputNumberWithAffixInner_r2);
  }
}
function NzInputNumberComponent_ng_template_7_Conditional_0_ProjectionFallback_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate(ctx_r3.nzPrefix());
  }
}
function NzInputNumberComponent_ng_template_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275projection(1, 2, null, NzInputNumberComponent_ng_template_7_Conditional_0_ProjectionFallback_1_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
}
function NzInputNumberComponent_ng_template_7_ng_template_1_Template(rf, ctx) {
}
function NzInputNumberComponent_ng_template_7_Conditional_2_ProjectionFallback_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate(ctx_r3.nzSuffix());
  }
}
function NzInputNumberComponent_ng_template_7_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-form-item-feedback-icon", 13);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275property("status", ctx_r3.finalStatus());
  }
}
function NzInputNumberComponent_ng_template_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275projection(1, 3, null, NzInputNumberComponent_ng_template_7_Conditional_2_ProjectionFallback_1_Template, 1, 1);
    \u0275\u0275conditionalCreate(3, NzInputNumberComponent_ng_template_7_Conditional_2_Conditional_3_Template, 1, 1, "nz-form-item-feedback-icon", 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r3.hasFeedback() && ctx_r3.finalStatus() ? 3 : -1);
  }
}
function NzInputNumberComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzInputNumberComponent_ng_template_7_Conditional_0_Template, 3, 0, "span", 11);
    \u0275\u0275template(1, NzInputNumberComponent_ng_template_7_ng_template_1_Template, 0, 0, "ng-template", 8);
    \u0275\u0275conditionalCreate(2, NzInputNumberComponent_ng_template_7_Conditional_2_Template, 4, 1, "span", 12);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const inputNumber_r6 = \u0275\u0275reference(10);
    \u0275\u0275conditional(ctx_r3.hasPrefix() ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", inputNumber_r6);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.hasSuffix() ? 2 : -1);
  }
}
function NzInputNumberComponent_ng_template_9_ng_template_2_Template(rf, ctx) {
}
function NzInputNumberComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", null, 5);
    \u0275\u0275template(2, NzInputNumberComponent_ng_template_9_ng_template_2_Template, 0, 0, "ng-template", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    const inputNumberInner_r3 = \u0275\u0275reference(12);
    \u0275\u0275classMap(ctx_r3.inputNumberClass());
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", inputNumberInner_r3);
  }
}
function NzInputNumberComponent_ng_template_11_Conditional_0_ProjectionFallback_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 20);
  }
}
function NzInputNumberComponent_ng_template_11_Conditional_0_ProjectionFallback_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 21);
  }
}
function NzInputNumberComponent_ng_template_11_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17, 7);
    \u0275\u0275listener("mouseup", function NzInputNumberComponent_ng_template_11_Conditional_0_Template_div_mouseup_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.stopAutoStep());
    })("mouseleave", function NzInputNumberComponent_ng_template_11_Conditional_0_Template_div_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.stopAutoStep());
    });
    \u0275\u0275elementStart(2, "span", 18);
    \u0275\u0275listener("mousedown", function NzInputNumberComponent_ng_template_11_Conditional_0_Template_span_mousedown_2_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onStepMouseDown($event, true));
    });
    \u0275\u0275projection(3, 4, null, NzInputNumberComponent_ng_template_11_Conditional_0_ProjectionFallback_3_Template, 1, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 19);
    \u0275\u0275listener("mousedown", function NzInputNumberComponent_ng_template_11_Conditional_0_Template_span_mousedown_5_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onStepMouseDown($event, false));
    });
    \u0275\u0275projection(6, 5, null, NzInputNumberComponent_ng_template_11_Conditional_0_ProjectionFallback_6_Template, 1, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("ant-input-number-handler-up-disabled", ctx_r3.upDisabled());
    \u0275\u0275attribute("aria-disabled", ctx_r3.upDisabled());
    \u0275\u0275advance(3);
    \u0275\u0275classProp("ant-input-number-handler-down-disabled", ctx_r3.downDisabled());
    \u0275\u0275attribute("aria-disabled", ctx_r3.downDisabled());
  }
}
function NzInputNumberComponent_ng_template_11_Template(rf, ctx) {
  var _a;
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, NzInputNumberComponent_ng_template_11_Conditional_0_Template, 8, 6, "div", 14);
    \u0275\u0275elementStart(1, "div", 15)(2, "input", 16, 6);
    \u0275\u0275listener("input", function NzInputNumberComponent_ng_template_11_Template_input_input_2_listener() {
      \u0275\u0275restoreView(_r7);
      const input_r9 = \u0275\u0275reference(3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onInput(input_r9.value));
    })("wheel", function NzInputNumberComponent_ng_template_11_Template_input_wheel_2_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onWheel($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r3.nzControls() ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r3.displayValue())("placeholder", (_a = ctx_r3.nzPlaceHolder()) != null ? _a : "")("disabled", ctx_r3.finalDisabled())("readOnly", ctx_r3.nzReadOnly());
    \u0275\u0275attribute("aria-valuemin", ctx_r3.nzMin())("aria-valuemax", ctx_r3.nzMax())("id", ctx_r3.nzId())("step", ctx_r3.nzStep())("value", ctx_r3.displayValue());
  }
}
var _NzInputNumberComponent = class _NzInputNumberComponent {
  constructor() {
    __publicField(this, "nzId", input(null, ...ngDevMode ? [{
      debugName: "nzId"
    }] : []));
    __publicField(this, "nzSize", input("default", ...ngDevMode ? [{
      debugName: "nzSize"
    }] : []));
    __publicField(this, "nzPlaceHolder", input(null, ...ngDevMode ? [{
      debugName: "nzPlaceHolder"
    }] : []));
    __publicField(this, "nzStatus", input("", ...ngDevMode ? [{
      debugName: "nzStatus"
    }] : []));
    __publicField(this, "nzVariant", input(...ngDevMode ? [void 0, {
      debugName: "nzVariant"
    }] : []));
    __publicField(this, "nzStep", input(1, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzStep"
    } : {}), {
      transform: numberAttribute
    })));
    __publicField(this, "nzMin", input(Number.MIN_SAFE_INTEGER, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzMin"
    } : {}), {
      transform: numberAttribute
    })));
    __publicField(this, "nzMax", input(Number.MAX_SAFE_INTEGER, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzMax"
    } : {}), {
      transform: numberAttribute
    })));
    __publicField(this, "nzPrecision", input(null, ...ngDevMode ? [{
      debugName: "nzPrecision"
    }] : []));
    __publicField(this, "nzParser", input(...ngDevMode ? [void 0, {
      debugName: "nzParser"
    }] : []));
    __publicField(this, "nzFormatter", input(...ngDevMode ? [void 0, {
      debugName: "nzFormatter"
    }] : []));
    __publicField(this, "nzDisabled", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzDisabled"
    } : {}), {
      transform: booleanAttribute
    })));
    __publicField(this, "nzReadOnly", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzReadOnly"
    } : {}), {
      transform: booleanAttribute
    })));
    __publicField(this, "nzAutoFocus", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzAutoFocus"
    } : {}), {
      transform: booleanAttribute
    })));
    __publicField(this, "nzKeyboard", input(true, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzKeyboard"
    } : {}), {
      transform: booleanAttribute
    })));
    __publicField(this, "nzControls", input(true, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzControls"
    } : {}), {
      transform: booleanAttribute
    })));
    __publicField(this, "nzChangeOnWheel", input(true, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "nzChangeOnWheel"
    } : {}), {
      transform: booleanAttribute
    })));
    __publicField(this, "nzPrefix", input(...ngDevMode ? [void 0, {
      debugName: "nzPrefix"
    }] : []));
    __publicField(this, "nzSuffix", input(...ngDevMode ? [void 0, {
      debugName: "nzSuffix"
    }] : []));
    __publicField(this, "nzAddonBefore", input(...ngDevMode ? [void 0, {
      debugName: "nzAddonBefore"
    }] : []));
    __publicField(this, "nzAddonAfter", input(...ngDevMode ? [void 0, {
      debugName: "nzAddonAfter"
    }] : []));
    __publicField(this, "nzBlur", output());
    __publicField(this, "nzFocus", output());
    __publicField(this, "nzOnStep", output());
    __publicField(this, "onChange", () => {
    });
    __publicField(this, "onTouched", () => {
    });
    __publicField(this, "isDisabledFirstChange", true);
    __publicField(this, "compactSize", inject(NZ_SPACE_COMPACT_SIZE, {
      optional: true
    }));
    __publicField(this, "inputRef", viewChild.required("input"));
    __publicField(this, "hostRef", viewChild("inputNumberHost", ...ngDevMode ? [{
      debugName: "hostRef"
    }] : []));
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "injector", inject(Injector));
    __publicField(this, "focusMonitor", inject(FocusMonitor));
    __publicField(this, "directionality", inject(Directionality));
    __publicField(this, "nzFormStatusService", inject(NzFormStatusService, {
      optional: true
    }));
    __publicField(this, "autoStepTimer", null);
    __publicField(this, "defaultFormatter", (value) => {
      const precision = this.nzPrecision();
      if (isNotNil(precision)) {
        return value.toFixed(precision);
      }
      return value.toString();
    });
    __publicField(this, "value", signal(null, ...ngDevMode ? [{
      debugName: "value"
    }] : []));
    __publicField(this, "displayValue", signal("", ...ngDevMode ? [{
      debugName: "displayValue"
    }] : []));
    __publicField(this, "formSize", inject(NZ_FORM_SIZE, {
      optional: true
    }));
    __publicField(this, "formVariant", inject(NZ_FORM_VARIANT, {
      optional: true
    }));
    __publicField(this, "dir", inject(Directionality).valueSignal);
    __publicField(this, "focused", signal(false, ...ngDevMode ? [{
      debugName: "focused"
    }] : []));
    __publicField(this, "hasFeedback", signal(false, ...ngDevMode ? [{
      debugName: "hasFeedback"
    }] : []));
    __publicField(this, "finalStatus", linkedSignal(() => this.nzStatus(), ...ngDevMode ? [{
      debugName: "finalStatus"
    }] : []));
    __publicField(this, "finalDisabled", linkedSignal(() => this.nzDisabled(), ...ngDevMode ? [{
      debugName: "finalDisabled"
    }] : []));
    __publicField(this, "prefix", contentChild(NzInputPrefixDirective, ...ngDevMode ? [{
      debugName: "prefix"
    }] : []));
    __publicField(this, "suffix", contentChild(NzInputSuffixDirective, ...ngDevMode ? [{
      debugName: "suffix"
    }] : []));
    __publicField(this, "addonBefore", contentChild(NzInputAddonBeforeDirective, ...ngDevMode ? [{
      debugName: "addonBefore"
    }] : []));
    __publicField(this, "addonAfter", contentChild(NzInputAddonAfterDirective, ...ngDevMode ? [{
      debugName: "addonAfter"
    }] : []));
    __publicField(this, "hasPrefix", computed(() => !!this.nzPrefix() || !!this.prefix(), ...ngDevMode ? [{
      debugName: "hasPrefix"
    }] : []));
    __publicField(this, "hasSuffix", computed(() => !!this.nzSuffix() || !!this.suffix() || this.hasFeedback(), ...ngDevMode ? [{
      debugName: "hasSuffix"
    }] : []));
    __publicField(this, "hasAffix", computed(() => this.hasPrefix() || this.hasSuffix(), ...ngDevMode ? [{
      debugName: "hasAffix"
    }] : []));
    __publicField(this, "hasAddonBefore", computed(() => !!this.nzAddonBefore() || !!this.addonBefore(), ...ngDevMode ? [{
      debugName: "hasAddonBefore"
    }] : []));
    __publicField(this, "hasAddonAfter", computed(() => !!this.nzAddonAfter() || !!this.addonAfter(), ...ngDevMode ? [{
      debugName: "hasAddonAfter"
    }] : []));
    __publicField(this, "hasAddon", computed(() => this.hasAddonBefore() || this.hasAddonAfter(), ...ngDevMode ? [{
      debugName: "hasAddon"
    }] : []));
    __publicField(this, "class", computed(() => {
      if (this.hasAddon()) {
        return this.groupWrapperClass();
      }
      if (this.hasAffix()) {
        return this.affixWrapperClass();
      }
      return this.inputNumberClass();
    }, ...ngDevMode ? [{
      debugName: "class"
    }] : []));
    __publicField(this, "inputNumberClass", computed(() => {
      return __spreadValues(__spreadValues({
        "ant-input-number": true,
        "ant-input-number-lg": this.finalSize() === "large",
        "ant-input-number-sm": this.finalSize() === "small",
        "ant-input-number-disabled": this.finalDisabled(),
        "ant-input-number-readonly": this.nzReadOnly(),
        "ant-input-number-focused": this.focused(),
        "ant-input-number-rtl": this.dir() === "rtl",
        "ant-input-number-in-form-item": !!this.nzFormStatusService,
        "ant-input-number-out-of-range": this.value() !== null && !isInRange(this.value(), this.nzMin(), this.nzMax())
      }, getVariantClassNames("ant-input-number", this.finalVariant())), getStatusClassNames("ant-input-number", this.finalStatus(), this.hasFeedback()));
    }, ...ngDevMode ? [{
      debugName: "inputNumberClass"
    }] : []));
    __publicField(this, "affixWrapperClass", computed(() => {
      return __spreadValues(__spreadValues({
        "ant-input-number-affix-wrapper": true,
        "ant-input-number-affix-wrapper-disabled": this.finalDisabled(),
        "ant-input-number-affix-wrapper-readonly": this.nzReadOnly(),
        "ant-input-number-affix-wrapper-focused": this.focused(),
        "ant-input-number-affix-wrapper-rtl": this.dir() === "rtl"
      }, getStatusClassNames("ant-input-number-affix-wrapper", this.finalStatus(), this.hasFeedback())), getVariantClassNames("ant-input-number-affix-wrapper", this.finalVariant()));
    }, ...ngDevMode ? [{
      debugName: "affixWrapperClass"
    }] : []));
    __publicField(this, "groupWrapperClass", computed(() => {
      return __spreadValues(__spreadValues({
        "ant-input-number-group-wrapper": true,
        "ant-input-number-group-wrapper-rtl": this.dir() === "rtl"
      }, getStatusClassNames("ant-input-number-group-wrapper", this.finalStatus(), this.hasFeedback())), getVariantClassNames("ant-input-number-group-wrapper", this.finalVariant()));
    }, ...ngDevMode ? [{
      debugName: "groupWrapperClass"
    }] : []));
    __publicField(this, "finalSize", computed(() => {
      var _a;
      if ((_a = this.formSize) == null ? void 0 : _a.call(this)) {
        return this.formSize();
      }
      if (this.compactSize) {
        return this.compactSize();
      }
      return this.nzSize();
    }, ...ngDevMode ? [{
      debugName: "finalSize"
    }] : []));
    __publicField(this, "finalVariant", computed(() => {
      var _a;
      return this.nzVariant() || ((_a = this.formVariant) == null ? void 0 : _a.call(this)) || "outlined";
    }, ...ngDevMode ? [{
      debugName: "finalVariant"
    }] : []));
    __publicField(this, "upDisabled", computed(() => {
      return !isNil(this.value()) && this.value() >= this.nzMax();
    }, ...ngDevMode ? [{
      debugName: "upDisabled"
    }] : []));
    __publicField(this, "downDisabled", computed(() => {
      return !isNil(this.value()) && this.value() <= this.nzMin();
    }, ...ngDevMode ? [{
      debugName: "downDisabled"
    }] : []));
    var _a;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const hostRef = this.hostRef();
      const element = hostRef ? hostRef : this.elementRef;
      this.focusMonitor.monitor(element, true).pipe(takeUntilDestroyed(destroyRef)).subscribe((origin) => {
        this.focused.set(!!origin);
        if (origin) {
          this.nzFocus.emit();
        } else {
          this.fixValue();
          this.onTouched();
          this.nzBlur.emit();
        }
      });
      destroyRef.onDestroy(() => {
        this.focusMonitor.stopMonitoring(element);
      });
    });
    (_a = this.nzFormStatusService) == null ? void 0 : _a.formStatusChanges.pipe(takeUntilDestroyed()).subscribe(({
      status,
      hasFeedback
    }) => {
      this.finalStatus.set(status);
      this.hasFeedback.set(hasFeedback);
    });
  }
  ngOnInit() {
    if (this.nzAutoFocus()) {
      afterNextRender(() => this.focus(), {
        injector: this.injector
      });
    }
  }
  writeValue(value) {
    if (isNil(value)) value = null;
    untracked(() => {
      this.value.set(value);
      this.setValue(value);
    });
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(disabled) {
    untracked(() => {
      this.finalDisabled.set(this.isDisabledFirstChange && this.nzDisabled() || disabled);
    });
    this.isDisabledFirstChange = false;
  }
  focus(options) {
    triggerFocus(this.inputRef().nativeElement, options);
  }
  blur() {
    this.inputRef().nativeElement.blur();
  }
  step(event, up, emitter) {
    if (up && this.upDisabled() || !up && this.downDisabled()) {
      return;
    }
    let step = event.shiftKey ? this.nzStep() * 10 : this.nzStep();
    if (!up) {
      step = -step;
    }
    const places = getDecimalPlaces(step);
    const multiple = 10 ** places;
    const nextValue = getRangeValue(
      // Convert floating point numbers to integers to avoid floating point math errors
      (Math.round((this.value() || 0) * multiple) + Math.round(step * multiple)) / multiple,
      this.nzMin(),
      this.nzMax(),
      this.nzPrecision()
    );
    this.setValue(nextValue);
    this.nzOnStep.emit({
      type: up ? "up" : "down",
      value: this.value(),
      offset: this.nzStep(),
      emitter
    });
    this.focus();
  }
  setValue(value) {
    var _a;
    const formatter = (_a = this.nzFormatter()) != null ? _a : this.defaultFormatter;
    const precision = this.nzPrecision();
    if (isNotNil(precision)) {
      value && (value = +value.toFixed(precision));
    }
    const formattedValue = isNil(value) ? "" : formatter(value);
    this.displayValue.set(formattedValue);
    this.updateValue(value);
  }
  setValueByTyping(value) {
    var _a;
    this.displayValue.set(value);
    if (value === "") {
      this.updateValue(null);
      return;
    }
    const parser = (_a = this.nzParser()) != null ? _a : defaultParser;
    const parsedValue = parser(value);
    if (isNotCompleteNumber(value) || Number.isNaN(parsedValue)) {
      return;
    }
    const formatter = this.nzFormatter();
    if (formatter) {
      const formattedValue = formatter(parsedValue);
      this.displayValue.set(formattedValue);
    }
    if (!isInRange(parsedValue, this.nzMin(), this.nzMax())) {
      return;
    }
    this.updateValue(parsedValue);
  }
  updateValue(value) {
    if (this.value() !== value) {
      this.value.set(value);
      this.onChange(value);
    }
  }
  fixValue() {
    var _a;
    const displayValue = this.displayValue();
    if (displayValue === "") {
      return;
    }
    const parser = (_a = this.nzParser()) != null ? _a : defaultParser;
    let fixedValue = parser(displayValue);
    if (Number.isNaN(fixedValue)) {
      fixedValue = this.value();
    } else {
      const precision = this.nzPrecision();
      if (isNotNil(precision) && getDecimalPlaces(fixedValue) !== precision) {
        fixedValue = +fixedValue.toFixed(precision);
      }
      if (!isInRange(fixedValue, this.nzMin(), this.nzMax())) {
        fixedValue = getRangeValue(fixedValue, this.nzMin(), this.nzMax(), precision);
      }
    }
    this.setValue(fixedValue);
  }
  stopAutoStep() {
    if (this.autoStepTimer !== null) {
      clearTimeout(this.autoStepTimer);
      this.autoStepTimer = null;
    }
  }
  onStepMouseDown(event, up) {
    event.preventDefault();
    this.stopAutoStep();
    this.step(event, up, "handler");
    const loopStep = () => {
      this.step(event, up, "handler");
      this.autoStepTimer = setTimeout(loopStep, STEP_INTERVAL);
    };
    this.autoStepTimer = setTimeout(loopStep, STEP_DELAY);
  }
  onKeyDown(event) {
    switch (event.keyCode) {
      case UP_ARROW:
        event.preventDefault();
        this.nzKeyboard() && this.step(event, true, "keyboard");
        break;
      case DOWN_ARROW:
        event.preventDefault();
        this.nzKeyboard() && this.step(event, false, "keyboard");
        break;
      case ENTER:
        this.fixValue();
        break;
    }
  }
  onInput(value) {
    this.setValueByTyping(value);
  }
  onWheel(event) {
    if (this.nzDisabled() || !this.nzChangeOnWheel()) {
      return;
    }
    event.preventDefault();
    this.step(event, event.deltaY < 0, "wheel");
  }
};
__publicField(_NzInputNumberComponent, "\u0275fac", function NzInputNumberComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputNumberComponent)();
});
__publicField(_NzInputNumberComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzInputNumberComponent,
  selectors: [["nz-input-number"]],
  contentQueries: function NzInputNumberComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuerySignal(dirIndex, ctx.prefix, NzInputPrefixDirective, 5)(dirIndex, ctx.suffix, NzInputSuffixDirective, 5)(dirIndex, ctx.addonBefore, NzInputAddonBeforeDirective, 5)(dirIndex, ctx.addonAfter, NzInputAddonAfterDirective, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(4);
    }
  },
  viewQuery: function NzInputNumberComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuerySignal(ctx.inputRef, _c06, 5)(ctx.hostRef, _c14, 5);
    }
    if (rf & 2) {
      \u0275\u0275queryAdvance(2);
    }
  },
  hostVars: 2,
  hostBindings: function NzInputNumberComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown", function NzInputNumberComponent_keydown_HostBindingHandler($event) {
        return ctx.onKeyDown($event);
      });
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.class());
    }
  },
  inputs: {
    nzId: [1, "nzId"],
    nzSize: [1, "nzSize"],
    nzPlaceHolder: [1, "nzPlaceHolder"],
    nzStatus: [1, "nzStatus"],
    nzVariant: [1, "nzVariant"],
    nzStep: [1, "nzStep"],
    nzMin: [1, "nzMin"],
    nzMax: [1, "nzMax"],
    nzPrecision: [1, "nzPrecision"],
    nzParser: [1, "nzParser"],
    nzFormatter: [1, "nzFormatter"],
    nzDisabled: [1, "nzDisabled"],
    nzReadOnly: [1, "nzReadOnly"],
    nzAutoFocus: [1, "nzAutoFocus"],
    nzKeyboard: [1, "nzKeyboard"],
    nzControls: [1, "nzControls"],
    nzChangeOnWheel: [1, "nzChangeOnWheel"],
    nzPrefix: [1, "nzPrefix"],
    nzSuffix: [1, "nzSuffix"],
    nzAddonBefore: [1, "nzAddonBefore"],
    nzAddonAfter: [1, "nzAddonAfter"]
  },
  outputs: {
    nzBlur: "nzBlur",
    nzFocus: "nzFocus",
    nzOnStep: "nzOnStep"
  },
  exportAs: ["nzInputNumber"],
  features: [\u0275\u0275ProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _NzInputNumberComponent),
    multi: true
  }, {
    provide: NZ_SPACE_COMPACT_ITEM_TYPE,
    useValue: "input-number"
  }]), \u0275\u0275HostDirectivesFeature([NzSpaceCompactItemDirective])],
  ngContentSelectors: _c32,
  decls: 13,
  vars: 1,
  consts: [["inputNumberWithAddonInner", ""], ["inputNumberWithAffix", ""], ["inputNumberWithAffixInner", ""], ["inputNumber", ""], ["inputNumberInner", ""], ["inputNumberHost", ""], ["input", ""], ["handlers", ""], [3, "ngTemplateOutlet"], [1, "ant-input-number-wrapper", "ant-input-number-group"], [1, "ant-input-number-group-addon"], [1, "ant-input-number-prefix"], [1, "ant-input-number-suffix"], [3, "status"], [1, "ant-input-number-handler-wrap"], [1, "ant-input-number-input-wrap"], ["autocomplete", "off", "role", "spinbutton", 1, "ant-input-number-input", 3, "input", "wheel", "value", "placeholder", "disabled", "readOnly"], [1, "ant-input-number-handler-wrap", 3, "mouseup", "mouseleave"], ["role", "button", "unselectable", "on", 1, "ant-input-number-handler", "ant-input-number-handler-up", 3, "mousedown"], ["role", "button", "unselectable", "on", 1, "ant-input-number-handler", "ant-input-number-handler-down", 3, "mousedown"], ["nzType", "up", 1, "ant-input-number-handler-up-inner"], ["nzType", "down", 1, "ant-input-number-handler-down-inner"]],
  template: function NzInputNumberComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c23);
      \u0275\u0275conditionalCreate(0, NzInputNumberComponent_Conditional_0_Template, 1, 1, null, 8)(1, NzInputNumberComponent_Conditional_1_Template, 1, 1, null, 8)(2, NzInputNumberComponent_Conditional_2_Template, 1, 1, null, 8);
      \u0275\u0275template(3, NzInputNumberComponent_ng_template_3_Template, 5, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(5, NzInputNumberComponent_ng_template_5_Template, 2, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(7, NzInputNumberComponent_ng_template_7_Template, 3, 3, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(9, NzInputNumberComponent_ng_template_9_Template, 3, 3, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(11, NzInputNumberComponent_ng_template_11_Template, 4, 10, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.hasAddon() ? 0 : ctx.hasAffix() ? 1 : 2);
    }
  },
  dependencies: [NzIconModule, NzIconDirective, NzFormItemFeedbackIconComponent, NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var NzInputNumberComponent = _NzInputNumberComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputNumberComponent, [{
    type: Component,
    args: [{
      selector: "nz-input-number",
      exportAs: "nzInputNumber",
      imports: [NzIconModule, NzFormItemFeedbackIconComponent, NgTemplateOutlet],
      template: `
    @if (hasAddon()) {
      <ng-template [ngTemplateOutlet]="inputNumberWithAddonInner" />
    } @else if (hasAffix()) {
      <ng-template [ngTemplateOutlet]="inputNumberWithAffixInner" />
    } @else {
      <ng-template [ngTemplateOutlet]="inputNumberInner" />
    }

    <ng-template #inputNumberWithAddonInner>
      <div class="ant-input-number-wrapper ant-input-number-group">
        @if (hasAddonBefore()) {
          <div class="ant-input-number-group-addon">
            <ng-content select="[nzInputAddonBefore]">{{ nzAddonBefore() }}</ng-content>
          </div>
        }

        @if (hasAffix()) {
          <ng-template [ngTemplateOutlet]="inputNumberWithAffix" />
        } @else {
          <ng-template [ngTemplateOutlet]="inputNumber" />
        }

        @if (hasAddonAfter()) {
          <div class="ant-input-number-group-addon">
            <ng-content select="[nzInputAddonAfter]">{{ nzAddonAfter() }}</ng-content>
          </div>
        }
      </div>
    </ng-template>

    <ng-template #inputNumberWithAffix>
      <div [class]="affixWrapperClass()">
        <ng-template [ngTemplateOutlet]="inputNumberWithAffixInner" />
      </div>
    </ng-template>

    <ng-template #inputNumberWithAffixInner>
      @if (hasPrefix()) {
        <span class="ant-input-number-prefix">
          <ng-content select="[nzInputPrefix]">{{ nzPrefix() }}</ng-content>
        </span>
      }
      <ng-template [ngTemplateOutlet]="inputNumber" />
      @if (hasSuffix()) {
        <span class="ant-input-number-suffix">
          <ng-content select="[nzInputSuffix]">{{ nzSuffix() }}</ng-content>
          @if (hasFeedback() && finalStatus()) {
            <nz-form-item-feedback-icon [status]="finalStatus()" />
          }
        </span>
      }
    </ng-template>

    <ng-template #inputNumber>
      <div #inputNumberHost [class]="inputNumberClass()">
        <ng-template [ngTemplateOutlet]="inputNumberInner" />
      </div>
    </ng-template>

    <ng-template #inputNumberInner>
      @if (nzControls()) {
        <div #handlers class="ant-input-number-handler-wrap" (mouseup)="stopAutoStep()" (mouseleave)="stopAutoStep()">
          <span
            role="button"
            unselectable="on"
            class="ant-input-number-handler ant-input-number-handler-up"
            [class.ant-input-number-handler-up-disabled]="upDisabled()"
            [attr.aria-disabled]="upDisabled()"
            (mousedown)="onStepMouseDown($event, true)"
          >
            <ng-content select="[nzInputNumberUpIcon]">
              <nz-icon nzType="up" class="ant-input-number-handler-up-inner" />
            </ng-content>
          </span>
          <span
            role="button"
            unselectable="on"
            class="ant-input-number-handler ant-input-number-handler-down"
            [class.ant-input-number-handler-down-disabled]="downDisabled()"
            [attr.aria-disabled]="downDisabled()"
            (mousedown)="onStepMouseDown($event, false)"
          >
            <ng-content select="[nzInputNumberDownIcon]">
              <nz-icon nzType="down" class="ant-input-number-handler-down-inner" />
            </ng-content>
          </span>
        </div>
      }

      <div class="ant-input-number-input-wrap">
        <input
          #input
          autocomplete="off"
          role="spinbutton"
          class="ant-input-number-input"
          [attr.aria-valuemin]="nzMin()"
          [attr.aria-valuemax]="nzMax()"
          [attr.id]="nzId()"
          [attr.step]="nzStep()"
          [attr.value]="displayValue()"
          [value]="displayValue()"
          [placeholder]="nzPlaceHolder() ?? ''"
          [disabled]="finalDisabled()"
          [readOnly]="nzReadOnly()"
          (input)="onInput(input.value)"
          (wheel)="onWheel($event)"
        />
      </div>
    </ng-template>
  `,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzInputNumberComponent),
        multi: true
      }, {
        provide: NZ_SPACE_COMPACT_ITEM_TYPE,
        useValue: "input-number"
      }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class]": "class()",
        "(keydown)": "onKeyDown($event)"
      },
      hostDirectives: [NzSpaceCompactItemDirective]
    }]
  }], () => [], {
    nzId: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzId",
        required: false
      }]
    }],
    nzSize: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzSize",
        required: false
      }]
    }],
    nzPlaceHolder: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzPlaceHolder",
        required: false
      }]
    }],
    nzStatus: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzStatus",
        required: false
      }]
    }],
    nzVariant: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzVariant",
        required: false
      }]
    }],
    nzStep: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzStep",
        required: false
      }]
    }],
    nzMin: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzMin",
        required: false
      }]
    }],
    nzMax: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzMax",
        required: false
      }]
    }],
    nzPrecision: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzPrecision",
        required: false
      }]
    }],
    nzParser: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzParser",
        required: false
      }]
    }],
    nzFormatter: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzFormatter",
        required: false
      }]
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzDisabled",
        required: false
      }]
    }],
    nzReadOnly: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzReadOnly",
        required: false
      }]
    }],
    nzAutoFocus: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzAutoFocus",
        required: false
      }]
    }],
    nzKeyboard: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzKeyboard",
        required: false
      }]
    }],
    nzControls: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzControls",
        required: false
      }]
    }],
    nzChangeOnWheel: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzChangeOnWheel",
        required: false
      }]
    }],
    nzPrefix: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzPrefix",
        required: false
      }]
    }],
    nzSuffix: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzSuffix",
        required: false
      }]
    }],
    nzAddonBefore: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzAddonBefore",
        required: false
      }]
    }],
    nzAddonAfter: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzAddonAfter",
        required: false
      }]
    }],
    nzBlur: [{
      type: Output,
      args: ["nzBlur"]
    }],
    nzFocus: [{
      type: Output,
      args: ["nzFocus"]
    }],
    nzOnStep: [{
      type: Output,
      args: ["nzOnStep"]
    }],
    inputRef: [{
      type: ViewChild,
      args: ["input", {
        isSignal: true
      }]
    }],
    hostRef: [{
      type: ViewChild,
      args: ["inputNumberHost", {
        isSignal: true
      }]
    }],
    prefix: [{
      type: ContentChild,
      args: [forwardRef(() => NzInputPrefixDirective), {
        isSignal: true
      }]
    }],
    suffix: [{
      type: ContentChild,
      args: [forwardRef(() => NzInputSuffixDirective), {
        isSignal: true
      }]
    }],
    addonBefore: [{
      type: ContentChild,
      args: [forwardRef(() => NzInputAddonBeforeDirective), {
        isSignal: true
      }]
    }],
    addonAfter: [{
      type: ContentChild,
      args: [forwardRef(() => NzInputAddonAfterDirective), {
        isSignal: true
      }]
    }]
  });
})();
var STEP_INTERVAL = 200;
var STEP_DELAY = 600;
function defaultParser(value) {
  const parsedValue = value.trim().replace(/,/g, "").replace(/。/g, ".");
  if (parsedValue.length) {
    return +parsedValue;
  }
  return NaN;
}
function isInRange(value, min, max) {
  return value >= min && value <= max;
}
function getRangeValue(value, min, max, precision = null) {
  if (precision === null) {
    if (value < min) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
  }
  const fixedValue = +value.toFixed(precision);
  const multiple = Math.pow(10, precision);
  if (fixedValue < min) {
    return Math.ceil(min * multiple) / multiple;
  }
  if (fixedValue > max) {
    return Math.floor(max * multiple) / multiple;
  }
  return fixedValue;
}
function getDecimalPlaces(num) {
  var _a;
  return ((_a = num.toString().split(".")[1]) == null ? void 0 : _a.length) || 0;
}
function isNotCompleteNumber(value) {
  return /[.。](\d*0)?$/.test(value.toString());
}
var _NzInputNumberModule = class _NzInputNumberModule {
};
__publicField(_NzInputNumberModule, "\u0275fac", function NzInputNumberModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzInputNumberModule)();
});
__publicField(_NzInputNumberModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzInputNumberModule,
  imports: [NzInputNumberComponent, NzInputAddonBeforeDirective, NzInputAddonAfterDirective, NzInputPrefixDirective, NzInputSuffixDirective],
  exports: [NzInputNumberComponent, NzInputAddonBeforeDirective, NzInputAddonAfterDirective, NzInputPrefixDirective, NzInputSuffixDirective]
}));
__publicField(_NzInputNumberModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzInputNumberComponent]
}));
var NzInputNumberModule = _NzInputNumberModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzInputNumberModule, [{
    type: NgModule,
    args: [{
      imports: [NzInputNumberComponent, NzInputAddonBeforeDirective, NzInputAddonAfterDirective, NzInputPrefixDirective, NzInputSuffixDirective],
      exports: [NzInputNumberComponent, NzInputAddonBeforeDirective, NzInputAddonAfterDirective, NzInputPrefixDirective, NzInputSuffixDirective]
    }]
  }], null, null);
})();

// projects/tot/nhan-dien-khuon-mat/src/lib/training/training.component.ts
var _c07 = () => ({ backgroundColor: "#52c41a" });
function TrainingComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275element(1, "span", 43);
    \u0275\u0275text(2, "\xA0 Ch\u1ECDn User \u0111\u1EC3 \u0110\xE0o T\u1EA1o");
    \u0275\u0275elementEnd();
  }
}
function TrainingComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 44)(1, "button", 45);
    \u0275\u0275listener("click", function TrainingComponent_ng_template_4_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectAll());
    });
    \u0275\u0275text(2, "Ch\u1ECDn t\u1EA5t c\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 46);
    \u0275\u0275listener("click", function TrainingComponent_ng_template_4_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deselectAll());
    });
    \u0275\u0275text(4, "B\u1ECF ch\u1ECDn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 46);
    \u0275\u0275listener("click", function TrainingComponent_ng_template_4_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadUsersWithDefinitions());
    });
    \u0275\u0275element(6, "span", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 48);
    \u0275\u0275listener("click", function TrainingComponent_ng_template_4_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.startTraining());
    });
    \u0275\u0275element(8, "span", 49);
    \u0275\u0275text(9, " \u0110\xE0o t\u1EA1o ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r2.isTraining || ctx_r2.selectedUserIds.size === 0);
  }
}
function TrainingComponent_tr_21_img_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 66);
  }
  if (rf & 2) {
    const user_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", user_r5.avatarUrl, \u0275\u0275sanitizeUrl);
  }
}
function TrainingComponent_tr_21_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const user_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (user_r5.displayName || user_r5.username || "U").charAt(0).toUpperCase(), " ");
  }
}
function TrainingComponent_tr_21_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68);
    \u0275\u0275element(1, "img", 69);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const faceUrl_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", faceUrl_r6, \u0275\u0275sanitizeUrl);
  }
}
function TrainingComponent_tr_21_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275text(1, " Kh\xF4ng c\xF3 \u1EA3nh ");
    \u0275\u0275elementEnd();
  }
}
function TrainingComponent_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 50);
    \u0275\u0275listener("click", function TrainingComponent_tr_21_Template_tr_click_0_listener() {
      const user_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleUserSelection(user_r5.id));
    });
    \u0275\u0275elementStart(1, "td", 51);
    \u0275\u0275listener("click", function TrainingComponent_tr_21_Template_td_click_1_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(2, "label", 52);
    \u0275\u0275listener("nzCheckedChange", function TrainingComponent_tr_21_Template_label_nzCheckedChange_2_listener() {
      const user_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleUserSelection(user_r5.id));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "td")(4, "div", 53);
    \u0275\u0275template(5, TrainingComponent_tr_21_img_5_Template, 1, 1, "img", 54)(6, TrainingComponent_tr_21_div_6_Template, 2, 1, "div", 55);
    \u0275\u0275elementStart(7, "div")(8, "div", 56);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 57);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "td")(13, "div", 58);
    \u0275\u0275template(14, TrainingComponent_tr_21_div_14_Template, 2, 1, "div", 59)(15, TrainingComponent_tr_21_div_15_Template, 2, 0, "div", 60);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td");
    \u0275\u0275element(17, "nz-badge", 61);
    \u0275\u0275elementStart(18, "span", 62);
    \u0275\u0275text(19, "\xA0 \u1EA3nh \u0111\u1ECBnh ngh\u0129a");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "td", 63);
    \u0275\u0275listener("click", function TrainingComponent_tr_21_Template_td_click_20_listener($event) {
      return $event.stopPropagation();
    });
    \u0275\u0275elementStart(21, "button", 64);
    \u0275\u0275listener("click", function TrainingComponent_tr_21_Template_button_click_21_listener() {
      const user_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openFaceDefModal(user_r5));
    });
    \u0275\u0275element(22, "span", 65);
    \u0275\u0275text(23, " Th\xEAm \u1EA3nh \u0111\u1ECBnh ngh\u0129a ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected-row", ctx_r2.isUserSelected(user_r5.id));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzChecked", ctx_r2.isUserSelected(user_r5.id));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", user_r5.avatarUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !user_r5.avatarUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r5.displayName || user_r5.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r5.email);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", user_r5.faceUrls);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !user_r5.faceUrls || user_r5.faceUrls.length === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzCount", user_r5.definitionCount)("nzStyle", \u0275\u0275pureFunction0(11, _c07));
  }
}
function TrainingComponent_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275element(1, "span", 72);
    \u0275\u0275elementStart(2, "div", 73);
    \u0275\u0275text(3, "Ch\u01B0a c\xF3 user n\xE0o c\xF3 khu\xF4n m\u1EB7t \u0111\u01B0\u1EE3c \u0111\u1ECBnh ngh\u0129a.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 74);
    \u0275\u0275text(5, "Vui l\xF2ng \u0111\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t cho user tr\u01B0\u1EDBc khi \u0111\xE0o t\u1EA1o.");
    \u0275\u0275elementEnd()();
  }
}
function TrainingComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275element(1, "span", 75);
    \u0275\u0275text(2, "\xA0 \u0110i\u1EC1u Khi\u1EC3n \u0110\xE0o T\u1EA1o");
    \u0275\u0275elementEnd();
  }
}
function TrainingComponent_span_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275element(1, "nz-spin", 77);
    \u0275\u0275elementStart(2, "span", 78);
    \u0275\u0275text(3, "\u0110ang \u0111\xE0o t\u1EA1o...");
    \u0275\u0275elementEnd()();
  }
}
function TrainingComponent_div_37_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84)(1, "nz-tag", 85);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u2705 Ho\xE0n t\u1EA5t: ", ctx_r2.trainingDoneFolder);
  }
}
function TrainingComponent_div_37_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const line_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("log-line " + ctx_r2.getLogLineClass(line_r7));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", line_r7, " ");
  }
}
function TrainingComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 79)(1, "div", 80)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, TrainingComponent_div_37_span_4_Template, 3, 1, "span", 81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 82);
    \u0275\u0275template(6, TrainingComponent_div_37_div_6_Template, 2, 3, "div", 83);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("\u{1F4CB} Log \u0111\xE0o t\u1EA1o (", ctx_r2.trainingLogs.length, " d\xF2ng)");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.trainingDoneFolder);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.trainingLogs);
  }
}
function TrainingComponent_ng_template_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275element(1, "span", 86);
    \u0275\u0275text(2, "\xA0 K\u1EBFt Qu\u1EA3 \u0110\xE0o T\u1EA1o & Tr\xEDch Xu\u1EA5t Embedding");
    \u0275\u0275elementEnd();
  }
}
function TrainingComponent_ng_template_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function TrainingComponent_ng_template_41_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadTrainingFolders());
    });
    \u0275\u0275element(1, "span", 47);
    \u0275\u0275text(2, " L\xE0m m\u1EDBi ");
    \u0275\u0275elementEnd();
  }
}
function TrainingComponent_tr_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275element(2, "span", 87);
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td", 88)(6, "nz-tag", 26);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 88)(9, "button", 89);
    \u0275\u0275listener("click", function TrainingComponent_tr_54_Template_button_click_9_listener() {
      const folder_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.extractEmbeddings(folder_r10));
    });
    \u0275\u0275element(10, "span", 90);
    \u0275\u0275text(11, " Tr\xEDch xu\u1EA5t Embedding ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const folder_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(folder_r10.folderName);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzColor", folder_r10.hasBestModel ? "success" : "warning");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", folder_r10.hasBestModel ? "\u2705 C\xF3 best model" : "\u23F3 Ch\u01B0a c\xF3 model", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !folder_r10.hasBestModel || ctx_r2.extractingFolder === folder_r10.folderName)("nzLoading", ctx_r2.extractingFolder === folder_r10.folderName);
  }
}
function TrainingComponent_ng_template_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275element(1, "span", 91);
    \u0275\u0275elementStart(2, "div", 73);
    \u0275\u0275text(3, "Ch\u01B0a c\xF3 phi\xEAn \u0111\xE0o t\u1EA1o n\xE0o.");
    \u0275\u0275elementEnd()();
  }
}
function TrainingComponent_nz_alert_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-alert", 92);
  }
}
function TrainingComponent_ng_template_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275element(1, "span", 93);
    \u0275\u0275text(2, "\xA0 Danh S\xE1ch Khu\xF4n M\u1EB7t \u0110\xE3 C\xF3 Embedding");
    \u0275\u0275elementEnd();
  }
}
function TrainingComponent_ng_template_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function TrainingComponent_ng_template_61_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.loadEmbeddings());
    });
    \u0275\u0275element(1, "span", 47);
    \u0275\u0275text(2, " L\xE0m m\u1EDBi ");
    \u0275\u0275elementEnd();
  }
}
function TrainingComponent_tr_75_img_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 66);
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", item_r13.user.avatarUrl, \u0275\u0275sanitizeUrl);
  }
}
function TrainingComponent_tr_75_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (item_r13.user.displayName || item_r13.user.username || "U").charAt(0).toUpperCase(), " ");
  }
}
function TrainingComponent_tr_75_div_12_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 115);
    \u0275\u0275element(1, "span", 116);
    \u0275\u0275text(2, " Ngu\u1ED3n: ");
    \u0275\u0275elementStart(3, "code");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const emb_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(emb_r15.inputImagePath.split("/").pop());
  }
}
function TrainingComponent_tr_75_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 98)(1, "div", 99);
    \u0275\u0275element(2, "img", 100);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 101)(4, "div", 102)(5, "nz-tag", 103);
    \u0275\u0275text(6, "ONNX");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 104);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 105);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 106)(13, "code", 107);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275pipe(16, "number");
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 108)(19, "button", 109);
    \u0275\u0275listener("click", function TrainingComponent_tr_75_div_12_Template_button_click_19_listener() {
      const emb_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.copyEmbedding(emb_r15.embedding));
    });
    \u0275\u0275element(20, "span", 110);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 111);
    \u0275\u0275listener("click", function TrainingComponent_tr_75_div_12_Template_button_click_21_listener() {
      const emb_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const item_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openCompareModal(emb_r15, item_r13.user));
    });
    \u0275\u0275element(22, "span", 112);
    \u0275\u0275text(23, " Ki\u1EC3m tra ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 113);
    \u0275\u0275listener("click", function TrainingComponent_tr_75_div_12_Template_button_click_24_listener() {
      const emb_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.deleteEmbedding(emb_r15.id));
    });
    \u0275\u0275element(25, "span", 97);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(26, TrainingComponent_tr_75_div_12_div_26_Template, 5, 1, "div", 114);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const emb_r15 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", "/api/face-detection/embeddings/" + emb_r15.id + "/image", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 8, emb_r15.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzTooltipTitle", emb_r15.bestModelPath);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Model: ", emb_r15.bestModelPath ? emb_r15.bestModelPath.split("/").pop() : "N/A", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3(" [", \u0275\u0275pipeBind2(15, 11, emb_r15.embedding[0], "1.4-4"), ", ", \u0275\u0275pipeBind2(16, 14, emb_r15.embedding[1], "1.4-4"), ", ", \u0275\u0275pipeBind2(17, 17, emb_r15.embedding[2], "1.4-4"), ", ...] (512 dims) ");
    \u0275\u0275advance(12);
    \u0275\u0275property("ngIf", emb_r15.inputImagePath);
  }
}
function TrainingComponent_tr_75_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 53);
    \u0275\u0275template(3, TrainingComponent_tr_75_img_3_Template, 1, 1, "img", 54)(4, TrainingComponent_tr_75_div_4_Template, 2, 1, "div", 55);
    \u0275\u0275elementStart(5, "div")(6, "div", 56);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 57);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "td")(11, "div", 94);
    \u0275\u0275template(12, TrainingComponent_tr_75_div_12_Template, 27, 20, "div", 95);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 88)(14, "button", 96);
    \u0275\u0275listener("click", function TrainingComponent_tr_75_Template_button_click_14_listener() {
      const item_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.deleteUserEmbeddings(item_r13.user.id));
    });
    \u0275\u0275element(15, "span", 97);
    \u0275\u0275text(16, " X\xF3a s\u1EA1ch ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r13 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", item_r13.user.avatarUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !item_r13.user.avatarUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r13.user.displayName || item_r13.user.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r13.user.email);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", item_r13.embeddings);
  }
}
function TrainingComponent_ng_template_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275element(1, "span", 117);
    \u0275\u0275elementStart(2, "div", 73);
    \u0275\u0275text(3, "Ch\u01B0a c\xF3 vector embedding n\xE0o \u0111\u01B0\u1EE3c tr\xEDch xu\u1EA5t.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 74);
    \u0275\u0275text(5, "Hu\u1EA5n luy\u1EC7n xong v\xE0 b\u1EA5m 'Tr\xEDch xu\u1EA5t' \u0111\u1EC3 t\u1EA1o d\u1EEF li\u1EC7u.");
    \u0275\u0275elementEnd()();
  }
}
function TrainingComponent_ng_template_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 118);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\xA0 Ki\u1EC3m Tra \u0110\u1ED1i S\xE1nh Khu\xF4n M\u1EB7t (HNSW + Inner Product)");
    \u0275\u0275elementEnd();
  }
}
function TrainingComponent_div_81_div_1_img_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 146);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("src", ctx_r2.targetEmbeddingUser.avatarUrl, \u0275\u0275sanitizeUrl);
  }
}
function TrainingComponent_div_81_div_1_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 147);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (ctx_r2.targetEmbeddingUser.displayName || ctx_r2.targetEmbeddingUser.username || "U").charAt(0).toUpperCase(), " ");
  }
}
function TrainingComponent_div_81_div_1_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 148);
    \u0275\u0275element(1, "span", 149);
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275text(3, "Ch\u01B0a c\xF3 \u1EA3nh ch\xE2n dung c\u0103n ch\u1EC9nh");
    \u0275\u0275elementEnd()();
  }
}
function TrainingComponent_div_81_div_1_div_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 150);
    \u0275\u0275element(1, "img", 151);
    \u0275\u0275elementStart(2, "div", 152);
    \u0275\u0275text(3, "\u1EA2nh \u0111\xE3 c\u0103n ch\u1EC9nh 112x112");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r2.compareFilePreview, \u0275\u0275sanitizeUrl);
  }
}
function TrainingComponent_div_81_div_1_div_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 153);
    \u0275\u0275element(1, "nz-spin", 154);
    \u0275\u0275elementStart(2, "div", 155);
    \u0275\u0275text(3, "\u0110ang x\u1EED l\xFD ph\xE2n t\xEDch v\xE0 so kh\u1EDBp HNSW...");
    \u0275\u0275elementEnd()();
  }
}
function TrainingComponent_div_81_div_1_div_36_tr_35_img_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 66);
  }
  if (rf & 2) {
    const match_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", match_r18.avatarUrl, \u0275\u0275sanitizeUrl);
  }
}
function TrainingComponent_div_81_div_1_div_36_tr_35_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const match_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (match_r18.displayName || match_r18.username || "U").charAt(0).toUpperCase(), " ");
  }
}
function TrainingComponent_div_81_div_1_div_36_tr_35_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "nz-tag", 103);
    \u0275\u0275text(2, "\u0110\xEDch");
    \u0275\u0275elementEnd()();
  }
}
function TrainingComponent_div_81_div_1_div_36_tr_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td")(5, "div", 53);
    \u0275\u0275template(6, TrainingComponent_div_81_div_1_div_36_tr_35_img_6_Template, 1, 1, "img", 54)(7, TrainingComponent_div_81_div_1_div_36_tr_35_div_7_Template, 2, 1, "div", 55);
    \u0275\u0275elementStart(8, "div")(9, "div", 56);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, TrainingComponent_div_81_div_1_div_36_tr_35_div_11_Template, 3, 0, "div", 168);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "td", 88)(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 88);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 88)(20, "nz-tag", 26);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const match_r18 = ctx.$implicit;
    const idx_r19 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("target-row", match_r18.isTarget)("matched-row", match_r18.cosineSimilarity >= ctx_r2.compareThreshold);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("#", idx_r19 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", match_r18.avatarUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !match_r18.avatarUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(match_r18.displayName || match_r18.username);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", match_r18.isTarget);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 13, match_r18.cosineSimilarity, "1.4-4"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 16, match_r18.l2Distance, "1.4-4"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzColor", match_r18.cosineSimilarity >= ctx_r2.compareThreshold ? "success" : "default");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", match_r18.cosineSimilarity >= ctx_r2.compareThreshold ? "Kh\u1EDBp" : "Kh\xF4ng kh\u1EDBp", " ");
  }
}
function TrainingComponent_div_81_div_1_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 156);
    \u0275\u0275element(1, "nz-divider", 157);
    \u0275\u0275elementStart(2, "div", 158)(3, "div", 159);
    \u0275\u0275element(4, "span", 160);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "div", 161);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 162);
    \u0275\u0275text(9, " \u0110\u1ED9 t\u01B0\u01A1ng \u0111\u1ED3ng l\u1EDBn nh\u1EA5t v\u1EDBi user ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, " l\xE0: ");
    \u0275\u0275elementStart(13, "strong");
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 163)(19, "div", 164);
    \u0275\u0275text(20, "\u{1F4CB} B\u1EA3ng x\u1EBFp h\u1EA1ng t\u01B0\u01A1ng \u0111\u1ED3ng ch\xE9o (T\u1EEB cao xu\u1ED1ng th\u1EA5p s\u1EED d\u1EE5ng HNSW):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "nz-table", 165)(22, "thead")(23, "tr")(24, "th", 166);
    \u0275\u0275text(25, "H\u1EA1ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th");
    \u0275\u0275text(27, "Ng\u01B0\u1EDDi d\xF9ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "th", 88);
    \u0275\u0275text(29, "Cosine Similarity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "th", 88);
    \u0275\u0275text(31, "Kho\u1EA3ng c\xE1ch L2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "th", 88);
    \u0275\u0275text(33, "Tr\u1EA1ng th\xE1i");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "tbody");
    \u0275\u0275template(35, TrainingComponent_div_81_div_1_div_36_tr_35_Template, 22, 19, "tr", 167);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("matched", (ctx_r2.compareResults.targetUserBestMatch == null ? null : ctx_r2.compareResults.targetUserBestMatch.cosineSimilarity) >= ctx_r2.compareThreshold);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzType", (ctx_r2.compareResults.targetUserBestMatch == null ? null : ctx_r2.compareResults.targetUserBestMatch.cosineSimilarity) >= ctx_r2.compareThreshold ? "check-circle" : "close-circle");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (ctx_r2.compareResults.targetUserBestMatch == null ? null : ctx_r2.compareResults.targetUserBestMatch.cosineSimilarity) >= ctx_r2.compareThreshold ? "\u2705 X\xE1c th\u1EF1c tr\xF9ng kh\u1EDBp!" : "\u274C Kh\xF4ng kh\u1EDBp v\u1EDBi ng\u01B0\u1EDDi d\xF9ng \u0111\xEDch!", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.targetEmbeddingUser.displayName || ctx_r2.targetEmbeddingUser.username);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(15, 11, ctx_r2.compareResults.targetUserBestMatch == null ? null : ctx_r2.compareResults.targetUserBestMatch.cosineSimilarity, "1.4-4"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" (Kho\u1EA3ng c\xE1ch L2: ", \u0275\u0275pipeBind2(17, 14, ctx_r2.compareResults.targetUserBestMatch == null ? null : ctx_r2.compareResults.targetUserBestMatch.l2Distance, "1.4-4"), "). Ng\u01B0\u1EE1ng y\xEAu c\u1EA7u: ", ctx_r2.compareThreshold, " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("nzData", ctx_r2.compareResults.allMatches)("nzShowPagination", false);
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", ctx_r2.compareResults.allMatches);
  }
}
function TrainingComponent_div_81_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 121)(2, "div", 122);
    \u0275\u0275text(3, "\u{1F3AF} Embedding \u0111\xEDch c\u1EA7n ki\u1EC3m tra:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 123);
    \u0275\u0275template(5, TrainingComponent_div_81_div_1_img_5_Template, 1, 1, "img", 124)(6, TrainingComponent_div_81_div_1_div_6_Template, 2, 1, "div", 125);
    \u0275\u0275elementStart(7, "div")(8, "div", 126);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 127);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "div", 128)(13, "div", 129)(14, "span");
    \u0275\u0275text(15, "Ng\u01B0\u1EE1ng so s\xE1nh t\u1ED1i thi\u1EC3u (Cosine Similarity):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "strong");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 130)(19, "nz-slider", 131);
    \u0275\u0275twoWayListener("ngModelChange", function TrainingComponent_div_81_div_1_Template_nz_slider_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.compareThreshold, $event) || (ctx_r2.compareThreshold = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "nz-input-number", 132);
    \u0275\u0275twoWayListener("ngModelChange", function TrainingComponent_div_81_div_1_Template_nz_input_number_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.compareThreshold, $event) || (ctx_r2.compareThreshold = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 133)(22, "div", 134)(23, "div", 135);
    \u0275\u0275listener("click", function TrainingComponent_div_81_div_1_Template_div_click_23_listener() {
      \u0275\u0275restoreView(_r16);
      const testFileInput_r17 = \u0275\u0275reference(30);
      return \u0275\u0275resetView(testFileInput_r17.click());
    })("dragover", function TrainingComponent_div_81_div_1_Template_div_dragover_23_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onDragOver($event));
    })("drop", function TrainingComponent_div_81_div_1_Template_div_drop_23_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onCompareFileDrop($event));
    });
    \u0275\u0275element(24, "span", 136);
    \u0275\u0275elementStart(25, "div", 137);
    \u0275\u0275text(26, "Nh\u1EA5n \u0111\u1EC3 ch\u1ECDn ho\u1EB7c k\xE9o th\u1EA3 \u1EA3nh ch\xE2n dung ki\u1EC3m tra");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 138);
    \u0275\u0275text(28, "T\u1EF1 \u0111\u1ED9ng ph\xE1t hi\u1EC7n & c\u0103n ch\u1EC9nh (Face Alignment 112x112) b\u1EB1ng MediaPipe");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "input", 139, 14);
    \u0275\u0275listener("change", function TrainingComponent_div_81_div_1_Template_input_change_29_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onCompareFileSelected($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 140)(32, "div", 141);
    \u0275\u0275template(33, TrainingComponent_div_81_div_1_div_33_Template, 4, 0, "div", 142)(34, TrainingComponent_div_81_div_1_div_34_Template, 4, 1, "div", 143);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(35, TrainingComponent_div_81_div_1_div_35_Template, 4, 0, "div", 144)(36, TrainingComponent_div_81_div_1_div_36_Template, 36, 17, "div", 145);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r2.targetEmbeddingUser.avatarUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.targetEmbeddingUser.avatarUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.targetEmbeddingUser.displayName || ctx_r2.targetEmbeddingUser.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.targetEmbeddingUser.email);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.compareThreshold);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzMin", 0)("nzMax", 1)("nzStep", 0.01);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.compareThreshold);
    \u0275\u0275advance();
    \u0275\u0275property("nzMin", 0)("nzMax", 1)("nzStep", 0.01);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.compareThreshold);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngIf", !ctx_r2.compareFilePreview);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.compareFilePreview);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isComparing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.compareResults && !ctx_r2.isComparing);
  }
}
function TrainingComponent_div_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 119);
    \u0275\u0275template(1, TrainingComponent_div_81_div_1_Template, 37, 17, "div", 120);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.targetEmbeddingUser);
  }
}
function TrainingComponent_ng_template_82_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 169);
    \u0275\u0275listener("click", function TrainingComponent_ng_template_82_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeCompareModal());
    });
    \u0275\u0275text(1, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 170);
    \u0275\u0275listener("click", function TrainingComponent_ng_template_82_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.executeComparison());
    });
    \u0275\u0275element(3, "span", 171);
    \u0275\u0275text(4, " B\u1EAFt \u0111\u1EA7u so kh\u1EDBp ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r2.selectedCompareFile || ctx_r2.isComparing)("nzLoading", ctx_r2.isComparing);
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
    this.embeddingsList = [];
    this.loadingEmbeddings = false;
    this.showCompareModal = false;
    this.targetEmbeddingId = null;
    this.targetEmbeddingUser = null;
    this.compareThreshold = 0.6;
    this.selectedCompareFile = null;
    this.compareFilePreview = null;
    this.isComparing = false;
    this.compareResults = null;
    this.loadingDetector = false;
    this.detectorReady = false;
    this.faceDetector = null;
  }
  ngOnInit() {
    this.loadUsersWithDefinitions();
    this.loadTrainingFolders();
    this.loadEmbeddings();
    this.initMediaPipe();
  }
  ngOnDestroy() {
    this.closeEventSource();
    if (this.compareFilePreview) {
      URL.revokeObjectURL(this.compareFilePreview);
    }
  }
  // --- Khởi tạo MediaPipe trên Client-side ---
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
      console.error("[MediaPipe] Init Failed in Training Component: ", error);
      this.message.error("Kh\xF4ng th\u1EC3 kh\u1EDFi t\u1EA1o m\xF4 h\xECnh ph\xE1t hi\u1EC7n khu\xF4n m\u1EB7t MediaPipe \u1EDF Client.");
    } finally {
      this.loadingDetector = false;
    }
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
  async loadEmbeddings() {
    this.loadingEmbeddings = true;
    try {
      const result = await this.api.getEmbeddings();
      this.embeddingsList = result || [];
    } catch (error) {
      this.message.error("L\u1ED7i khi t\u1EA3i danh s\xE1ch vector embedding \u0111\xE3 l\u01B0u.");
    } finally {
      this.loadingEmbeddings = false;
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
      this.loadEmbeddings();
    } catch (error) {
      this.message.error(((_a = error == null ? void 0 : error.error) == null ? void 0 : _a.message) || "L\u1ED7i khi tr\xEDch xu\u1EA5t embedding.");
    } finally {
      this.extractingFolder = null;
    }
  }
  // --- Thêm ảnh định nghĩa khuôn mặt qua Modal chứa NhanDienKhuonMatComponent ---
  openFaceDefModal(user) {
    const modalRef = this.modal.create({
      nzTitle: `\u0110\u1ECBnh ngh\u0129a khu\xF4n m\u1EB7t cho: ${user.displayName || user.username}`,
      nzContent: NhanDienKhuonMatComponent,
      nzWidth: 1100,
      nzFooter: null,
      nzBodyStyle: { padding: "12px" }
    });
    modalRef.afterClose.subscribe(() => {
      this.loadUsersWithDefinitions();
    });
  }
  // --- Quản lý Xóa Vector Embedding ---
  async deleteUserEmbeddings(userId) {
    this.modal.confirm({
      nzTitle: "X\xE1c nh\u1EADn x\xF3a t\u1EA5t c\u1EA3 embedding c\u1EE7a user?",
      nzContent: "H\xE0nh \u0111\u1ED9ng n\xE0y s\u1EBD x\xF3a to\xE0n b\u1ED9 vector \u0111\u1EB7c tr\u01B0ng c\u1EE7a user n\xE0y trong database. Thao t\xE1c n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c!",
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.api.deleteUserEmbeddings(userId);
          this.message.success("\u0110\xE3 x\xF3a to\xE0n b\u1ED9 embedding c\u1EE7a user th\xE0nh c\xF4ng.");
          this.loadEmbeddings();
          this.loadUsersWithDefinitions();
        } catch (error) {
          this.message.error("L\u1ED7i khi x\xF3a embedding c\u1EE7a user.");
        }
      }
    });
  }
  async deleteEmbedding(id) {
    this.modal.confirm({
      nzTitle: "X\xE1c nh\u1EADn x\xF3a embedding n\xE0y?",
      nzContent: "X\xF3a vector \u0111\u1EB7c tr\u01B0ng n\xE0y kh\u1ECFi database.",
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.api.deleteEmbedding(id);
          this.message.success("\u0110\xE3 x\xF3a embedding th\xE0nh c\xF4ng.");
          this.loadEmbeddings();
          this.loadUsersWithDefinitions();
        } catch (error) {
          this.message.error("L\u1ED7i khi x\xF3a embedding.");
        }
      }
    });
  }
  copyEmbedding(emb) {
    const str = JSON.stringify(emb);
    navigator.clipboard.writeText(str).then(() => {
      this.message.success("\u0110\xE3 copy vector embedding v\xE0o clipboard.");
    }, () => {
      this.message.error("Kh\xF4ng th\u1EC3 copy vector.");
    });
  }
  // --- Kiểm tra Đối sánh khuôn mặt & Face Alignment ở Client ---
  openCompareModal(embedding, user) {
    this.targetEmbeddingId = embedding.id;
    this.targetEmbeddingUser = user;
    this.compareThreshold = 0.6;
    this.selectedCompareFile = null;
    this.compareFilePreview = null;
    this.compareResults = null;
    this.showCompareModal = true;
  }
  closeCompareModal() {
    this.showCompareModal = false;
    this.targetEmbeddingId = null;
    this.targetEmbeddingUser = null;
    this.selectedCompareFile = null;
    if (this.compareFilePreview) {
      URL.revokeObjectURL(this.compareFilePreview);
      this.compareFilePreview = null;
    }
    this.compareResults = null;
  }
  async onCompareFileSelected(event) {
    const input2 = event.target;
    if (input2.files && input2.files[0]) {
      const file = input2.files[0];
      await this.processAndAlignTestFile(file);
      input2.value = "";
    }
  }
  onDragOver(event) {
    event.preventDefault();
  }
  async onCompareFileDrop(event) {
    var _a;
    event.preventDefault();
    if (((_a = event.dataTransfer) == null ? void 0 : _a.files) && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        await this.processAndAlignTestFile(file);
      } else {
        this.message.warning("Vui l\xF2ng ch\u1EC9 k\xE9o th\u1EA3 t\u1EC7p h\xECnh \u1EA3nh.");
      }
    }
  }
  async processAndAlignTestFile(file) {
    if (!this.detectorReady || !this.faceDetector) {
      this.message.warning("MediaPipe \u0111ang t\u1EA3i. Vui l\xF2ng ch\u1EDD v\xE0i gi\xE2y.");
      await this.initMediaPipe();
      if (!this.detectorReady)
        return;
    }
    this.isComparing = true;
    const tempUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = async () => {
      try {
        const result = this.faceDetector.detect(img);
        const detections = result.detections || [];
        if (detections.length === 0) {
          this.message.error("Kh\xF4ng t\xECm th\u1EA5y khu\xF4n m\u1EB7t trong \u1EA3nh ki\u1EC3m tra. Vui l\xF2ng ch\u1ECDn \u1EA3nh r\xF5 khu\xF4n m\u1EB7t.");
          URL.revokeObjectURL(tempUrl);
          this.isComparing = false;
          return;
        }
        const det = detections[0];
        const keypoints = det.keypoints || [];
        if (keypoints.length < 2) {
          this.message.error("Kh\xF4ng ph\xE1t hi\u1EC7n \u0111\u1EE7 m\u1ED1c m\u1EAFt \u0111\u1EC3 t\u1EF1 \u0111\u1ED9ng c\u0103n ch\u1EC9nh (Face Alignment).");
          URL.revokeObjectURL(tempUrl);
          this.isComparing = false;
          return;
        }
        const eyeLeft = { x: keypoints[0].x * img.width, y: keypoints[0].y * img.height };
        const eyeRight = { x: keypoints[1].x * img.width, y: keypoints[1].y * img.height };
        const alignedCanvas = this.alignFaceBrowser(img, eyeLeft, eyeRight);
        alignedCanvas.toBlob((blob) => {
          if (blob) {
            this.selectedCompareFile = new File([blob], "aligned_face.jpg", { type: "image/jpeg" });
            if (this.compareFilePreview) {
              URL.revokeObjectURL(this.compareFilePreview);
            }
            this.compareFilePreview = URL.createObjectURL(blob);
            this.message.success("\u0110\xE3 nh\u1EADn di\u1EC7n khu\xF4n m\u1EB7t v\xE0 t\u1EF1 \u0111\u1ED9ng c\u0103n ch\u1EC9nh Affine 112x112 th\xE0nh c\xF4ng!");
          } else {
            this.message.error("C\u0103n ch\u1EC9nh th\u1EA5t b\u1EA1i khi t\u1EA1o Blob canvas.");
          }
          URL.revokeObjectURL(tempUrl);
          this.isComparing = false;
        }, "image/jpeg", 0.95);
      } catch (err) {
        console.error("L\u1ED7i khi c\u0103n ch\u1EC9nh b\u1EB1ng MediaPipe: ", err);
        this.message.error("G\u1EB7p l\u1ED7i trong ti\u1EBFn tr\xECnh ph\xE2n t\xEDch MediaPipe.");
        URL.revokeObjectURL(tempUrl);
        this.isComparing = false;
      }
    };
    img.onerror = () => {
      this.message.error("Kh\xF4ng th\u1EC3 n\u1EA1p t\u1EC7p tin h\xECnh \u1EA3nh.");
      URL.revokeObjectURL(tempUrl);
      this.isComparing = false;
    };
    img.src = tempUrl;
  }
  alignFaceBrowser(imageEl, eyeLeft, eyeRight) {
    const canvas = document.createElement("canvas");
    canvas.width = 112;
    canvas.height = 112;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      throw new Error("Kh\xF4ng th\u1EC3 kh\u1EDFi t\u1EA1o Canvas 2D Context");
    const cx = (eyeLeft.x + eyeRight.x) / 2;
    const cy = (eyeLeft.y + eyeRight.y) / 2;
    const dx = eyeRight.x - eyeLeft.x;
    const dy = eyeRight.y - eyeLeft.y;
    const currentDist = Math.sqrt(dx * dx + dy * dy);
    const angleRad = Math.atan2(dy, dx);
    const targetDist = 35.2372;
    const tx = 55.9132;
    const ty = 51.59885;
    const scale = targetDist / currentDist;
    ctx.save();
    ctx.translate(tx, ty);
    ctx.scale(scale, scale);
    ctx.rotate(-angleRad);
    ctx.translate(-cx, -cy);
    ctx.drawImage(imageEl, 0, 0);
    ctx.restore();
    return canvas;
  }
  async executeComparison() {
    var _a;
    if (!this.targetEmbeddingId || !this.selectedCompareFile) {
      this.message.warning("Vui l\xF2ng ch\u1ECDn ho\u1EB7c k\xE9o th\u1EA3 t\u1EC7p h\xECnh \u1EA3nh h\u1EE3p l\u1EC7 \u0111\u1EC3 ki\u1EC3m tra.");
      return;
    }
    this.isComparing = true;
    this.compareResults = null;
    try {
      const result = await this.api.compareEmbedding(this.targetEmbeddingId, this.selectedCompareFile, this.compareThreshold);
      this.compareResults = result;
      this.message.success("\u0110\xE3 ho\xE0n t\u1EA5t \u0111\u1ED1i s\xE1nh so kh\u1EDBp HNSW Inner Product.");
    } catch (error) {
      this.message.error(((_a = error == null ? void 0 : error.error) == null ? void 0 : _a.message) || "L\u1ED7i \u0111\u1ED1i s\xE1nh m\xE1y ch\u1EE7.");
    } finally {
      this.isComparing = false;
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
_TrainingComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TrainingComponent, selectors: [["tot-nhan-dien-training"]], decls: 84, vars: 33, consts: [["userSelectTitle", ""], ["userSelectActions", ""], ["userTable", ""], ["emptyUserTemplate", ""], ["trainingControlTitle", ""], ["foldersTitle", ""], ["foldersActions", ""], ["emptyFolderTemplate", ""], ["embeddingsTitle", ""], ["embeddingsActions", ""], ["embeddingsTable", ""], ["emptyEmbeddingsTemplate", ""], ["compareModalTitle", ""], ["compareModalFooter", ""], ["testFileInput", ""], [1, "training-page"], [1, "section-card", 3, "nzTitle", "nzExtra"], [3, "nzSpinning"], ["nzSize", "small", 1, "user-table", 3, "nzData", "nzShowPagination", "nzNoResult"], ["nzWidth", "48px"], ["nzWidth", "160px"], ["nzWidth", "150px", "nzAlign", "center"], ["class", "user-row", 3, "selected-row", "click", 4, "ngFor", "ngForOf"], [1, "section-card", 3, "nzTitle"], [1, "training-controls"], [1, "selected-info"], [3, "nzColor"], ["class", "training-status-indicator", 4, "ngIf"], [1, "control-buttons"], ["label", "B\u1EAFt \u0111\u1EA7u \u0111\xE0o t\u1EA1o", "icon", "play-circle", 3, "click", "disabled"], ["nz-button", "", "nzType", "default", "nzDanger", "", 2, "margin-left", "12px", 3, "click", "disabled"], ["nz-icon", "", "nzType", "stop"], ["class", "log-container", 4, "ngIf"], ["nzSize", "small", 1, "folders-table", 3, "nzData", "nzShowPagination", "nzNoResult"], ["nzWidth", "160px", "nzAlign", "center"], ["nzWidth", "180px", "nzAlign", "center"], [4, "ngFor", "ngForOf"], ["nzType", "info", "nzShowIcon", "", "nzMessage", "H\u01B0\u1EDBng d\u1EABn", "nzDescription", "Sau khi \u0111\xE0o t\u1EA1o ho\xE0n t\u1EA5t, nh\u1EA5n 'Tr\xEDch xu\u1EA5t Embedding' \u0111\u1EC3 l\u01B0u vector \u0111\u1EB7c tr\u01B0ng v\xE0o database. C\xE1c embedding n\xE0y s\u1EBD \u0111\u01B0\u1EE3c d\xF9ng cho nh\u1EADn di\u1EC7n th\u1EDDi gian th\u1EF1c.", "style", "margin-top: 16px;", 4, "ngIf"], [1, "section-card", 2, "margin-top", "24px", 3, "nzTitle", "nzExtra"], ["nzSize", "small", 1, "embeddings-table", 3, "nzData", "nzShowPagination", "nzNoResult"], [3, "nzVisibleChange", "nzOnCancel", "nzVisible", "nzTitle", "nzWidth", "nzFooter"], ["class", "compare-modal-content", 4, "nzModalContent"], [1, "card-title-icon"], ["nz-icon", "", "nzType", "team", "nzTheme", "outline"], [1, "card-actions-row"], ["nz-button", "", "nzSize", "small", 3, "click"], ["nz-button", "", "nzSize", "small", 2, "margin-left", "8px", 3, "click"], ["nz-icon", "", "nzType", "reload"], ["nz-button", "", "nzType", "primary", "nzSize", "small", 2, "margin-left", "8px", 3, "click", "disabled"], ["nz-icon", "", "nzType", "play-circle"], [1, "user-row", 3, "click"], [3, "click"], ["nz-checkbox", "", 3, "nzCheckedChange", "nzChecked"], [1, "user-info"], ["class", "user-avatar", "alt", "avatar", 3, "src", 4, "ngIf"], ["class", "user-avatar-placeholder", 4, "ngIf"], [1, "user-name"], [1, "user-email"], [1, "defined-faces-list", 2, "display", "flex", "gap", "6px", "flex-wrap", "wrap"], ["class", "defined-face-thumbnail", "style", "width: 38px; height: 38px; border-radius: 4px; overflow: hidden; border: 1.5px solid #d9d9d9; background: #fafafa; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.04);", 4, "ngFor", "ngForOf"], ["style", "color: #bbb; font-size: 12px; font-style: italic;", 4, "ngIf"], [3, "nzCount", "nzStyle"], [1, "def-count-label"], ["nzAlign", "center", 3, "click"], ["nz-button", "", "nzSize", "small", "nzType", "default", 3, "click"], ["nz-icon", "", "nzType", "user-add"], ["alt", "avatar", 1, "user-avatar", 3, "src"], [1, "user-avatar-placeholder"], [1, "defined-face-thumbnail", 2, "width", "38px", "height", "38px", "border-radius", "4px", "overflow", "hidden", "border", "1.5px solid #d9d9d9", "background", "#fafafa", "display", "flex", "justify-content", "center", "align-items", "center", "box-shadow", "0 2px 4px rgba(0,0,0,0.04)"], ["alt", "Face", "onerror", "this.src='https://placehold.co/38x38?text=Face'", 2, "width", "100%", "height", "100%", "object-fit", "cover", 3, "src"], [2, "color", "#bbb", "font-size", "12px", "font-style", "italic"], [1, "empty-state"], ["nz-icon", "", "nzType", "user-add", "nzTheme", "outline", 2, "font-size", "36px", "color", "#bbb"], [2, "margin-top", "8px", "color", "#999"], [2, "font-size", "12px", "color", "#ccc"], ["nz-icon", "", "nzType", "thunderbolt", "nzTheme", "outline"], [1, "training-status-indicator"], ["nzSimple", "", "nzSize", "small"], [1, "training-running-text"], [1, "log-container"], [1, "log-header"], ["class", "done-badge", 4, "ngIf"], ["id", "training-log-panel", 1, "log-panel"], [3, "class", 4, "ngFor", "ngForOf"], [1, "done-badge"], ["nzColor", "success"], ["nz-icon", "", "nzType", "folder-open", "nzTheme", "outline"], ["nz-icon", "", "nzType", "calendar", 2, "margin-right", "6px", "color", "#1890ff"], ["nzAlign", "center"], ["nz-button", "", "nzType", "primary", "nzSize", "small", 3, "click", "disabled", "nzLoading"], ["nz-icon", "", "nzType", "database"], ["nz-icon", "", "nzType", "inbox", "nzTheme", "outline", 2, "font-size", "36px", "color", "#bbb"], ["nzType", "info", "nzShowIcon", "", "nzMessage", "H\u01B0\u1EDBng d\u1EABn", "nzDescription", "Sau khi \u0111\xE0o t\u1EA1o ho\xE0n t\u1EA5t, nh\u1EA5n 'Tr\xEDch xu\u1EA5t Embedding' \u0111\u1EC3 l\u01B0u vector \u0111\u1EB7c tr\u01B0ng v\xE0o database. C\xE1c embedding n\xE0y s\u1EBD \u0111\u01B0\u1EE3c d\xF9ng cho nh\u1EADn di\u1EC7n th\u1EDDi gian th\u1EF1c.", 2, "margin-top", "16px"], ["nz-icon", "", "nzType", "idcard", "nzTheme", "outline"], [1, "emb-list"], ["class", "emb-item", "style", "display: flex; gap: 14px; align-items: flex-start;", 4, "ngFor", "ngForOf"], ["nz-button", "", "nzType", "default", "nzDanger", "", "nzSize", "small", 3, "click"], ["nz-icon", "", "nzType", "delete"], [1, "emb-item", 2, "display", "flex", "gap", "14px", "align-items", "flex-start"], [1, "emb-face-preview", 2, "width", "52px", "height", "52px", "border-radius", "6px", "overflow", "hidden", "border", "1.5px solid #d9d9d9", "background", "#fafafa", "display", "flex", "justify-content", "center", "align-items", "center", "flex-shrink", "0", "box-shadow", "0 2px 6px rgba(0,0,0,0.05)"], ["alt", "Aligned Face", "onerror", "this.src='https://placehold.co/52x52?text=No+Img'", 2, "width", "100%", "height", "100%", "object-fit", "cover", 3, "src"], [2, "flex", "1", "min-width", "0"], [1, "emb-meta"], ["nzColor", "blue"], [1, "emb-date"], ["nz-tooltip", "", 1, "emb-model", 3, "nzTooltipTitle"], [1, "emb-vector-row"], [1, "vector-preview"], [1, "emb-buttons"], ["nz-button", "", "nzSize", "small", "nzType", "text", "nz-tooltip", "", "nzTooltipTitle", "Copy vector", 3, "click"], ["nz-icon", "", "nzType", "copy"], ["nz-button", "", "nzSize", "small", "nzType", "text", "nz-tooltip", "", "nzTooltipTitle", "Ki\u1EC3m tra \u0111\u1ED1i s\xE1nh", 3, "click"], ["nz-icon", "", "nzType", "safety-certificate", 2, "color", "#52c41a"], ["nz-button", "", "nzSize", "small", "nzType", "text", "nzDanger", "", "nz-tooltip", "", "nzTooltipTitle", "X\xF3a embedding", 3, "click"], ["class", "emb-source-path", 4, "ngIf"], [1, "emb-source-path"], ["nz-icon", "", "nzType", "file-image"], ["nz-icon", "", "nzType", "database", "nzTheme", "outline", 2, "font-size", "36px", "color", "#bbb"], ["nz-icon", "", "nzType", "safety-certificate", "nzTheme", "outline", 2, "color", "#1890ff"], [1, "compare-modal-content"], [4, "ngIf"], [1, "target-user-card"], [1, "card-label"], [1, "user-profile-row"], ["class", "user-avatar large", "alt", "avatar", 3, "src", 4, "ngIf"], ["class", "user-avatar-placeholder large", 4, "ngIf"], [1, "user-name-large"], [1, "user-email-large"], [1, "threshold-panel"], [1, "slider-label"], [1, "slider-control-row"], [2, "flex", "1", "margin-right", "16px", 3, "ngModelChange", "nzMin", "nzMax", "nzStep", "ngModel"], ["nzSize", "small", 3, "ngModelChange", "nzMin", "nzMax", "nzStep", "ngModel"], [1, "image-upload-workspace"], [1, "workspace-col", "upload-col"], [1, "upload-zone", 3, "click", "dragover", "drop"], ["nz-icon", "", "nzType", "upload", 2, "font-size", "32px", "color", "#1890ff"], [1, "upload-text"], [1, "upload-hint"], ["type", "file", "accept", "image/*", 2, "display", "none", 3, "change"], [1, "workspace-col", "preview-col"], [1, "preview-box"], ["class", "no-preview", 4, "ngIf"], ["class", "aligned-preview", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], ["class", "compare-results-area", 4, "ngIf"], ["alt", "avatar", 1, "user-avatar", "large", 3, "src"], [1, "user-avatar-placeholder", "large"], [1, "no-preview"], ["nz-icon", "", "nzType", "picture", 2, "font-size", "36px", "color", "#ccc"], [1, "aligned-preview"], ["alt", "Aligned Face Preview", 1, "aligned-img", 3, "src"], [1, "aligned-label"], [1, "loading-container"], ["nzSimple", "", "nzSize", "large"], [1, "loading-msg"], [1, "compare-results-area"], ["nzText", "K\u1EBFt qu\u1EA3 so kh\u1EDBp"], [1, "best-match-banner"], [1, "banner-icon"], ["nz-icon", "", "nzTheme", "outline", 3, "nzType"], [1, "banner-title"], [1, "banner-desc"], [1, "ranking-list-section", 2, "margin-top", "16px"], [1, "section-sub-title"], ["nzSize", "small", 1, "ranking-table", 3, "nzData", "nzShowPagination"], ["nzWidth", "60px"], [3, "target-row", "matched-row", 4, "ngFor", "ngForOf"], ["class", "user-email", 4, "ngIf"], ["nz-button", "", "nzType", "default", 3, "click"], ["nz-button", "", "nzType", "primary", 3, "click", "disabled", "nzLoading"], ["nz-icon", "", "nzType", "thunderbolt"]], template: function TrainingComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "nz-card", 16);
    \u0275\u0275template(2, TrainingComponent_ng_template_2_Template, 3, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(4, TrainingComponent_ng_template_4_Template, 10, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(6, "nz-spin", 17)(7, "nz-table", 18, 2)(9, "thead")(10, "tr");
    \u0275\u0275element(11, "th", 19);
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "User");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th");
    \u0275\u0275text(15, "\u1EA2nh khu\xF4n m\u1EB7t \u0111\xE3 \u0111\u1ECBnh ngh\u0129a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 20);
    \u0275\u0275text(17, "S\u1ED1 \u1EA3nh \u0111\u1ECBnh ngh\u0129a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 21);
    \u0275\u0275text(19, "H\xE0nh \u0111\u1ED9ng");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody");
    \u0275\u0275template(21, TrainingComponent_tr_21_Template, 24, 12, "tr", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(22, TrainingComponent_ng_template_22_Template, 6, 0, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "nz-card", 23);
    \u0275\u0275template(25, TrainingComponent_ng_template_25_Template, 3, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(27, "div", 24)(28, "div", 25)(29, "nz-tag", 26);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275template(31, TrainingComponent_span_31_Template, 4, 0, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 28)(33, "tot-button", 29);
    \u0275\u0275listener("click", function TrainingComponent_Template_tot_button_click_33_listener() {
      return ctx.startTraining();
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 30);
    \u0275\u0275listener("click", function TrainingComponent_Template_button_click_34_listener() {
      return ctx.cancelTraining();
    });
    \u0275\u0275element(35, "span", 31);
    \u0275\u0275text(36, " H\u1EE7y \u0111\xE0o t\u1EA1o ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(37, TrainingComponent_div_37_Template, 7, 3, "div", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "nz-card", 16);
    \u0275\u0275template(39, TrainingComponent_ng_template_39_Template, 3, 0, "ng-template", null, 5, \u0275\u0275templateRefExtractor)(41, TrainingComponent_ng_template_41_Template, 3, 0, "ng-template", null, 6, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(43, "nz-spin", 17)(44, "nz-table", 33)(45, "thead")(46, "tr")(47, "th");
    \u0275\u0275text(48, "Th\u01B0 m\u1EE5c (Ng\xE0y)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "th", 34);
    \u0275\u0275text(50, "Tr\u1EA1ng th\xE1i m\xF4 h\xECnh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "th", 35);
    \u0275\u0275text(52, "H\xE0nh \u0111\u1ED9ng");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(53, "tbody");
    \u0275\u0275template(54, TrainingComponent_tr_54_Template, 12, 5, "tr", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(55, TrainingComponent_ng_template_55_Template, 4, 0, "ng-template", null, 7, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275template(57, TrainingComponent_nz_alert_57_Template, 1, 0, "nz-alert", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "nz-card", 38);
    \u0275\u0275template(59, TrainingComponent_ng_template_59_Template, 3, 0, "ng-template", null, 8, \u0275\u0275templateRefExtractor)(61, TrainingComponent_ng_template_61_Template, 3, 0, "ng-template", null, 9, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(63, "nz-spin", 17)(64, "nz-table", 39, 10)(66, "thead")(67, "tr")(68, "th");
    \u0275\u0275text(69, "Ng\u01B0\u1EDDi d\xF9ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "th");
    \u0275\u0275text(71, "Danh s\xE1ch Vector Embedding");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(72, "th", 21);
    \u0275\u0275text(73, "H\xE0nh \u0111\u1ED9ng User");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(74, "tbody");
    \u0275\u0275template(75, TrainingComponent_tr_75_Template, 17, 5, "tr", 36);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(76, TrainingComponent_ng_template_76_Template, 6, 0, "ng-template", null, 11, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "nz-modal", 40);
    \u0275\u0275twoWayListener("nzVisibleChange", function TrainingComponent_Template_nz_modal_nzVisibleChange_78_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.showCompareModal, $event) || (ctx.showCompareModal = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("nzOnCancel", function TrainingComponent_Template_nz_modal_nzOnCancel_78_listener() {
      return ctx.closeCompareModal();
    });
    \u0275\u0275template(79, TrainingComponent_ng_template_79_Template, 3, 0, "ng-template", null, 12, \u0275\u0275templateRefExtractor)(81, TrainingComponent_div_81_Template, 2, 1, "div", 41)(82, TrainingComponent_ng_template_82_Template, 5, 2, "ng-template", null, 13, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const userSelectTitle_r21 = \u0275\u0275reference(3);
    const userSelectActions_r22 = \u0275\u0275reference(5);
    const userTable_r23 = \u0275\u0275reference(8);
    const emptyUserTemplate_r24 = \u0275\u0275reference(23);
    const trainingControlTitle_r25 = \u0275\u0275reference(26);
    const foldersTitle_r26 = \u0275\u0275reference(40);
    const foldersActions_r27 = \u0275\u0275reference(42);
    const emptyFolderTemplate_r28 = \u0275\u0275reference(56);
    const embeddingsTitle_r29 = \u0275\u0275reference(60);
    const embeddingsActions_r30 = \u0275\u0275reference(62);
    const embeddingsTable_r31 = \u0275\u0275reference(65);
    const emptyEmbeddingsTemplate_r32 = \u0275\u0275reference(77);
    const compareModalTitle_r33 = \u0275\u0275reference(80);
    const compareModalFooter_r34 = \u0275\u0275reference(83);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", userSelectTitle_r21)("nzExtra", userSelectActions_r22);
    \u0275\u0275advance(5);
    \u0275\u0275property("nzSpinning", ctx.loadingUsers);
    \u0275\u0275advance();
    \u0275\u0275property("nzData", ctx.usersWithDefs)("nzShowPagination", false)("nzNoResult", emptyUserTemplate_r24);
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", userTable_r23.data);
    \u0275\u0275advance(3);
    \u0275\u0275property("nzTitle", trainingControlTitle_r25);
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
    \u0275\u0275property("nzTitle", foldersTitle_r26)("nzExtra", foldersActions_r27);
    \u0275\u0275advance(5);
    \u0275\u0275property("nzSpinning", ctx.loadingFolders);
    \u0275\u0275advance();
    \u0275\u0275property("nzData", ctx.trainingFolders)("nzShowPagination", false)("nzNoResult", emptyFolderTemplate_r28);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngForOf", ctx.trainingFolders);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx.trainingFolders.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", embeddingsTitle_r29)("nzExtra", embeddingsActions_r30);
    \u0275\u0275advance(5);
    \u0275\u0275property("nzSpinning", ctx.loadingEmbeddings);
    \u0275\u0275advance();
    \u0275\u0275property("nzData", ctx.embeddingsList)("nzShowPagination", false)("nzNoResult", emptyEmbeddingsTemplate_r32);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngForOf", embeddingsTable_r31.data);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("nzVisible", ctx.showCompareModal);
    \u0275\u0275property("nzTitle", compareModalTitle_r33)("nzWidth", 850)("nzFooter", compareModalFooter_r34);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgControlStatus, NgModel, NzButtonModule, NzButtonComponent, NzTransitionPatchDirective, NzWaveDirective, NzCardModule, NzCardComponent, NzTagModule, NzTagComponent, NzSpinModule, NzSpinComponent, NzTableModule, NzTableComponent, NzTableCellDirective, NzThMeasureDirective, NzTheadComponent, NzTbodyComponent, NzTrDirective, NzCellAlignDirective, NzCheckboxModule, NzCheckboxComponent, NzModalModule, NzModalComponent, NzModalContentDirective, NzIconModule, NzIconDirective, NzDividerModule, NzDividerComponent, NzBadgeModule, NzBadgeComponent, NzAlertModule, NzAlertComponent, NzSliderModule, NzSliderComponent, NzInputNumberModule, NzInputNumberComponent, NzTooltipModule, NzTooltipDirective, TotButtonComponent, DecimalPipe, DatePipe], styles: ['\n.training-page[_ngcontent-%COMP%] {\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  max-width: 1100px;\n  margin: 0 auto;\n}\n.card-title-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  font-weight: 600;\n  font-size: 15px;\n  gap: 4px;\n}\n.card-actions-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.user-table[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  overflow: hidden;\n}\n.user-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background 0.15s ease;\n}\n.user-row[_ngcontent-%COMP%]:hover {\n  background: #f0f7ff !important;\n}\n.selected-row[_ngcontent-%COMP%] {\n  background: #e6f4ff !important;\n}\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid #d0e9ff;\n}\n.user-avatar-placeholder[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #1890ff,\n      #096dd9);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 15px;\n}\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  color: #262626;\n}\n.user-email[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #8c8c8c;\n}\n.def-count-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #595959;\n}\n.training-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.selected-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.control-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.training-status-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.training-running-text[_ngcontent-%COMP%] {\n  color: #1890ff;\n  font-weight: 600;\n  animation: _ngcontent-%COMP%_pulse 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.log-container[_ngcontent-%COMP%] {\n  border: 1px solid #d9d9d9;\n  border-radius: 8px;\n  overflow: hidden;\n  margin-top: 4px;\n}\n.log-header[_ngcontent-%COMP%] {\n  background: #fafafa;\n  border-bottom: 1px solid #d9d9d9;\n  padding: 8px 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 13px;\n  color: #595959;\n}\n.done-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.log-panel[_ngcontent-%COMP%] {\n  background: #0d1117;\n  height: 360px;\n  overflow-y: auto;\n  padding: 12px;\n  font-family:\n    "Consolas",\n    "Monaco",\n    "Courier New",\n    monospace;\n  font-size: 12.5px;\n  line-height: 1.7;\n  scroll-behavior: smooth;\n}\n.log-line[_ngcontent-%COMP%] {\n  display: block;\n  word-break: break-all;\n  padding: 1px 0;\n}\n.log-error[_ngcontent-%COMP%] {\n  color: #ff7875;\n}\n.log-warn[_ngcontent-%COMP%] {\n  color: #ffa940;\n}\n.log-success[_ngcontent-%COMP%] {\n  color: #73d13d;\n  font-weight: 600;\n}\n.log-cmd[_ngcontent-%COMP%] {\n  color: #69c0ff;\n  font-style: italic;\n}\n.log-system[_ngcontent-%COMP%] {\n  color: #b37feb;\n}\n.log-info[_ngcontent-%COMP%] {\n  color: #e6e6e6;\n}\n.folders-table[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  overflow: hidden;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 28px 0;\n}\n.section-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);\n  border: 1px solid #f0f0f0;\n}\n.embeddings-table[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  overflow: hidden;\n}\n.emb-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.emb-item[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.6);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  border: 1px solid #e8e8e8;\n  border-radius: 8px;\n  padding: 10px 12px;\n  transition: all 0.2s ease;\n}\n.emb-item[_ngcontent-%COMP%]:hover {\n  border-color: #1890ff;\n  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.1);\n}\n.emb-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 6px;\n  font-size: 11px;\n}\n.emb-date[_ngcontent-%COMP%] {\n  color: #8c8c8c;\n}\n.emb-model[_ngcontent-%COMP%] {\n  color: #595959;\n  background: #f5f5f5;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-family: monospace;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 250px;\n}\n.emb-vector-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}\n.vector-preview[_ngcontent-%COMP%] {\n  font-family:\n    "Consolas",\n    "Courier New",\n    monospace;\n  background: #fafafa;\n  border: 1px solid #f0f0f0;\n  border-radius: 4px;\n  padding: 4px 8px;\n  font-size: 12px;\n  color: #1f1f1f;\n  flex: 1;\n}\n.emb-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.emb-source-path[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #8c8c8c;\n  margin-top: 6px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.emb-source-path[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  background: #f9f9f9;\n  padding: 1px 4px;\n  border-radius: 3px;\n  font-size: 10.5px;\n}\n.compare-modal-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.target-user-card[_ngcontent-%COMP%] {\n  background: #f0f7ff;\n  border: 1px solid #bae7ff;\n  border-radius: 8px;\n  padding: 12px 16px;\n}\n.card-label[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #0050b3;\n  font-weight: 600;\n  margin-bottom: 8px;\n}\n.user-profile-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.user-avatar.large[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border: 2.5px solid #1890ff;\n}\n.user-avatar-placeholder.large[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  font-size: 20px;\n}\n.user-name-large[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 16px;\n  color: #002c8c;\n}\n.user-email-large[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #595959;\n}\n.threshold-panel[_ngcontent-%COMP%] {\n  background: #fafafa;\n  border: 1px solid #f0f0f0;\n  border-radius: 8px;\n  padding: 12px 16px;\n}\n.slider-label[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 13px;\n  color: #262626;\n  margin-bottom: 6px;\n}\n.slider-control-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.image-upload-workspace[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.workspace-col[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n}\n.upload-zone[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 140px;\n  border: 2px dashed #1890ff;\n  border-radius: 8px;\n  background: #fafafa;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  padding: 16px;\n}\n.upload-zone[_ngcontent-%COMP%]:hover {\n  background: #e6f7ff;\n  border-color: #096dd9;\n}\n.upload-text[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #262626;\n  margin-top: 8px;\n  font-size: 13px;\n}\n.upload-hint[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #8c8c8c;\n  margin-top: 4px;\n  text-align: center;\n}\n.preview-box[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 140px;\n  border: 1px solid #d9d9d9;\n  border-radius: 8px;\n  background: #fafafa;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n}\n.no-preview[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #bfbfbf;\n  font-size: 12px;\n}\n.no-preview[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  margin-top: 6px;\n}\n.aligned-preview[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.aligned-img[_ngcontent-%COMP%] {\n  width: 90px;\n  height: 90px;\n  border-radius: 8px;\n  border: 2px solid #52c41a;\n  object-fit: cover;\n}\n.aligned-label[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  color: #52c41a;\n  font-weight: 600;\n}\n.loading-container[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 24px 0;\n}\n.loading-msg[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  color: #1890ff;\n  font-weight: 600;\n}\n.best-match-banner[_ngcontent-%COMP%] {\n  background: #fff2f0;\n  border: 1px solid #ffccc7;\n  border-radius: 8px;\n  padding: 12px 16px;\n  display: flex;\n  gap: 12px;\n}\n.best-match-banner.matched[_ngcontent-%COMP%] {\n  background: #f6ffed;\n  border: 1px solid #b7eb8f;\n}\n.banner-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #ff4d4f;\n  margin-top: 2px;\n}\n.best-match-banner.matched[_ngcontent-%COMP%]   .banner-icon[_ngcontent-%COMP%] {\n  color: #52c41a;\n}\n.banner-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14.5px;\n  color: #d32029;\n}\n.best-match-banner.matched[_ngcontent-%COMP%]   .banner-title[_ngcontent-%COMP%] {\n  color: #389e0d;\n}\n.banner-desc[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #595959;\n  margin-top: 4px;\n}\n.section-sub-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 13px;\n  color: #262626;\n  margin-bottom: 8px;\n}\n.ranking-table[_ngcontent-%COMP%] {\n  border: 1px solid #f0f0f0;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.ranking-table[_ngcontent-%COMP%]   tr.target-row[_ngcontent-%COMP%] {\n  background: rgba(24, 144, 255, 0.05) !important;\n}\n.ranking-table[_ngcontent-%COMP%]   tr.target-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-top: 1px solid #91d5ff;\n  border-bottom: 1px solid #91d5ff;\n}\n.ranking-table[_ngcontent-%COMP%]   tr.matched-row[_ngcontent-%COMP%] {\n  background: rgba(82, 196, 26, 0.03);\n}\n/*# sourceMappingURL=training.component.css.map */'] });
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
      NzSliderModule,
      NzInputNumberModule,
      NzTooltipModule,
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
        <button
          nz-button
          nzType="primary"
          nzSize="small"
          [disabled]="isTraining || selectedUserIds.size === 0"
          (click)="startTraining()"
          style="margin-left: 8px;">
          <span nz-icon nzType="play-circle"></span> \u0110\xE0o t\u1EA1o
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
            <th>\u1EA2nh khu\xF4n m\u1EB7t \u0111\xE3 \u0111\u1ECBnh ngh\u0129a</th>
            <th nzWidth="160px">S\u1ED1 \u1EA3nh \u0111\u1ECBnh ngh\u0129a</th>
            <th nzWidth="150px" nzAlign="center">H\xE0nh \u0111\u1ED9ng</th>
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
              <div class="defined-faces-list" style="display: flex; gap: 6px; flex-wrap: wrap;">
                <div *ngFor="let faceUrl of user.faceUrls" class="defined-face-thumbnail" style="width: 38px; height: 38px; border-radius: 4px; overflow: hidden; border: 1.5px solid #d9d9d9; background: #fafafa; display: flex; justify-content: center; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
                  <img [src]="faceUrl" alt="Face" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://placehold.co/38x38?text=Face'" />
                </div>
                <div *ngIf="!user.faceUrls || user.faceUrls.length === 0" style="color: #bbb; font-size: 12px; font-style: italic;">
                  Kh\xF4ng c\xF3 \u1EA3nh
                </div>
              </div>
            </td>
            <td>
              <nz-badge [nzCount]="user.definitionCount" [nzStyle]="{ backgroundColor: '#52c41a' }"></nz-badge>
              <span class="def-count-label">&nbsp; \u1EA3nh \u0111\u1ECBnh ngh\u0129a</span>
            </td>
            <td nzAlign="center" (click)="$event.stopPropagation()">
              <button nz-button nzSize="small" nzType="default" (click)="openFaceDefModal(user)">
                <span nz-icon nzType="user-add"></span> Th\xEAm \u1EA3nh \u0111\u1ECBnh ngh\u0129a
              </button>
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

  <!-- ========================== SECTION 4: Danh S\xE1ch Khu\xF4n M\u1EB7t \u0110\xE3 C\xF3 Embedding ========================== -->
  <nz-card class="section-card" [nzTitle]="embeddingsTitle" [nzExtra]="embeddingsActions" style="margin-top: 24px;">
    <ng-template #embeddingsTitle>
      <span class="card-title-icon"><span nz-icon nzType="idcard" nzTheme="outline"></span>&nbsp; Danh S\xE1ch Khu\xF4n M\u1EB7t \u0110\xE3 C\xF3 Embedding</span>
    </ng-template>
    <ng-template #embeddingsActions>
      <button nz-button nzSize="small" (click)="loadEmbeddings()">
        <span nz-icon nzType="reload"></span> L\xE0m m\u1EDBi
      </button>
    </ng-template>

    <nz-spin [nzSpinning]="loadingEmbeddings">
      <nz-table
        #embeddingsTable
        [nzData]="embeddingsList"
        [nzShowPagination]="false"
        nzSize="small"
        [nzNoResult]="emptyEmbeddingsTemplate"
        class="embeddings-table">
        <thead>
          <tr>
            <th>Ng\u01B0\u1EDDi d\xF9ng</th>
            <th>Danh s\xE1ch Vector Embedding</th>
            <th nzWidth="150px" nzAlign="center">H\xE0nh \u0111\u1ED9ng User</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of embeddingsTable.data">
            <td>
              <div class="user-info">
                <img *ngIf="item.user.avatarUrl" [src]="item.user.avatarUrl" class="user-avatar" alt="avatar" />
                <div *ngIf="!item.user.avatarUrl" class="user-avatar-placeholder">
                  {{ (item.user.displayName || item.user.username || 'U').charAt(0).toUpperCase() }}
                </div>
                <div>
                  <div class="user-name">{{ item.user.displayName || item.user.username }}</div>
                  <div class="user-email">{{ item.user.email }}</div>
                </div>
              </div>
            </td>
            <td>
              <div class="emb-list">
                <div *ngFor="let emb of item.embeddings" class="emb-item" style="display: flex; gap: 14px; align-items: flex-start;">
                  <!-- Aligned Face Image Preview -->
                  <div class="emb-face-preview" style="width: 52px; height: 52px; border-radius: 6px; overflow: hidden; border: 1.5px solid #d9d9d9; background: #fafafa; display: flex; justify-content: center; align-items: center; flex-shrink: 0; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
                    <img [src]="'/api/face-detection/embeddings/' + emb.id + '/image'" alt="Aligned Face" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://placehold.co/52x52?text=No+Img'" />
                  </div>

                  <div style="flex: 1; min-width: 0;">
                    <div class="emb-meta">
                      <nz-tag nzColor="blue">ONNX</nz-tag>
                      <span class="emb-date">{{ emb.createdAt | date:'dd/MM/yyyy HH:mm' }}</span>
                      <span class="emb-model" nz-tooltip [nzTooltipTitle]="emb.bestModelPath">
                        Model: {{ emb.bestModelPath ? emb.bestModelPath.split('/').pop() : 'N/A' }}
                      </span>
                    </div>
                    <div class="emb-vector-row">
                      <code class="vector-preview">
                        [{{ emb.embedding[0] | number:'1.4-4' }}, {{ emb.embedding[1] | number:'1.4-4' }}, {{ emb.embedding[2] | number:'1.4-4' }}, ...] (512 dims)
                      </code>
                      <div class="emb-buttons">
                        <button nz-button nzSize="small" nzType="text" (click)="copyEmbedding(emb.embedding)" nz-tooltip nzTooltipTitle="Copy vector">
                          <span nz-icon nzType="copy"></span>
                        </button>
                        <button nz-button nzSize="small" nzType="text" (click)="openCompareModal(emb, item.user)" nz-tooltip nzTooltipTitle="Ki\u1EC3m tra \u0111\u1ED1i s\xE1nh">
                          <span nz-icon nzType="safety-certificate" style="color: #52c41a;"></span> Ki\u1EC3m tra
                        </button>
                        <button nz-button nzSize="small" nzType="text" nzDanger (click)="deleteEmbedding(emb.id)" nz-tooltip nzTooltipTitle="X\xF3a embedding">
                          <span nz-icon nzType="delete"></span>
                        </button>
                      </div>
                    </div>
                    <div *ngIf="emb.inputImagePath" class="emb-source-path">
                      <span nz-icon nzType="file-image"></span> Ngu\u1ED3n: <code>{{ emb.inputImagePath.split('/').pop() }}</code>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td nzAlign="center">
              <button nz-button nzType="default" nzDanger nzSize="small" (click)="deleteUserEmbeddings(item.user.id)">
                <span nz-icon nzType="delete"></span> X\xF3a s\u1EA1ch
              </button>
            </td>
          </tr>
        </tbody>
      </nz-table>
      <ng-template #emptyEmbeddingsTemplate>
        <div class="empty-state">
          <span nz-icon nzType="database" nzTheme="outline" style="font-size: 36px; color: #bbb;"></span>
          <div style="margin-top: 8px; color: #999;">Ch\u01B0a c\xF3 vector embedding n\xE0o \u0111\u01B0\u1EE3c tr\xEDch xu\u1EA5t.</div>
          <div style="font-size: 12px; color: #ccc;">Hu\u1EA5n luy\u1EC7n xong v\xE0 b\u1EA5m 'Tr\xEDch xu\u1EA5t' \u0111\u1EC3 t\u1EA1o d\u1EEF li\u1EC7u.</div>
        </div>
      </ng-template>
    </nz-spin>
  </nz-card>

  <!-- ========================== MODAL: KI\u1EC2M TRA \u0110\u1ED0I S\xC1NH KHU\xD4N M\u1EB6T ========================== -->
  <nz-modal
    [(nzVisible)]="showCompareModal"
    [nzTitle]="compareModalTitle"
    [nzWidth]="850"
    (nzOnCancel)="closeCompareModal()"
    [nzFooter]="compareModalFooter">
    
    <ng-template #compareModalTitle>
      <span nz-icon nzType="safety-certificate" nzTheme="outline" style="color: #1890ff;"></span>
      <span>&nbsp; Ki\u1EC3m Tra \u0110\u1ED1i S\xE1nh Khu\xF4n M\u1EB7t (HNSW + Inner Product)</span>
    </ng-template>

    <div *nzModalContent class="compare-modal-content">
      <div *ngIf="targetEmbeddingUser">
        <!-- Target User Box -->
        <div class="target-user-card">
          <div class="card-label">\u{1F3AF} Embedding \u0111\xEDch c\u1EA7n ki\u1EC3m tra:</div>
          <div class="user-profile-row">
            <img *ngIf="targetEmbeddingUser.avatarUrl" [src]="targetEmbeddingUser.avatarUrl" class="user-avatar large" alt="avatar" />
            <div *ngIf="!targetEmbeddingUser.avatarUrl" class="user-avatar-placeholder large">
              {{ (targetEmbeddingUser.displayName || targetEmbeddingUser.username || 'U').charAt(0).toUpperCase() }}
            </div>
            <div>
              <div class="user-name-large">{{ targetEmbeddingUser.displayName || targetEmbeddingUser.username }}</div>
              <div class="user-email-large">{{ targetEmbeddingUser.email }}</div>
            </div>
          </div>
        </div>

        <!-- Threshold Slider -->
        <div class="threshold-panel">
          <div class="slider-label">
            <span>Ng\u01B0\u1EE1ng so s\xE1nh t\u1ED1i thi\u1EC3u (Cosine Similarity):</span>
            <strong>{{ compareThreshold }}</strong>
          </div>
          <div class="slider-control-row">
            <nz-slider [nzMin]="0" [nzMax]="1" [nzStep]="0.01" [(ngModel)]="compareThreshold" style="flex: 1; margin-right: 16px;"></nz-slider>
            <nz-input-number [nzMin]="0" [nzMax]="1" [nzStep]="0.01" [(ngModel)]="compareThreshold" nzSize="small"></nz-input-number>
          </div>
        </div>

        <!-- Upload Test Image & Alignment -->
        <div class="image-upload-workspace">
          <div class="workspace-col upload-col">
            <div class="upload-zone" (click)="testFileInput.click()" (dragover)="onDragOver($event)" (drop)="onCompareFileDrop($event)">
              <span nz-icon nzType="upload" style="font-size: 32px; color: #1890ff;"></span>
              <div class="upload-text">Nh\u1EA5n \u0111\u1EC3 ch\u1ECDn ho\u1EB7c k\xE9o th\u1EA3 \u1EA3nh ch\xE2n dung ki\u1EC3m tra</div>
              <div class="upload-hint">T\u1EF1 \u0111\u1ED9ng ph\xE1t hi\u1EC7n & c\u0103n ch\u1EC9nh (Face Alignment 112x112) b\u1EB1ng MediaPipe</div>
            </div>
            <input #testFileInput type="file" (change)="onCompareFileSelected($event)" accept="image/*" style="display: none;" />
          </div>
          <div class="workspace-col preview-col">
            <div class="preview-box">
              <div *ngIf="!compareFilePreview" class="no-preview">
                <span nz-icon nzType="picture" style="font-size: 36px; color: #ccc;"></span>
                <div>Ch\u01B0a c\xF3 \u1EA3nh ch\xE2n dung c\u0103n ch\u1EC9nh</div>
              </div>
              <div *ngIf="compareFilePreview" class="aligned-preview">
                <img [src]="compareFilePreview" class="aligned-img" alt="Aligned Face Preview" />
                <div class="aligned-label">\u1EA2nh \u0111\xE3 c\u0103n ch\u1EC9nh 112x112</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading comparison -->
        <div *ngIf="isComparing" class="loading-container">
          <nz-spin nzSimple nzSize="large"></nz-spin>
          <div class="loading-msg">\u0110ang x\u1EED l\xFD ph\xE2n t\xEDch v\xE0 so kh\u1EDBp HNSW...</div>
        </div>

        <!-- Compare Results -->
        <div *ngIf="compareResults && !isComparing" class="compare-results-area">
          <nz-divider nzText="K\u1EBFt qu\u1EA3 so kh\u1EDBp"></nz-divider>

          <!-- Top Target Result Match Badge -->
          <div class="best-match-banner" [class.matched]="compareResults.targetUserBestMatch?.cosineSimilarity >= compareThreshold">
            <div class="banner-icon">
              <span nz-icon [nzType]="compareResults.targetUserBestMatch?.cosineSimilarity >= compareThreshold ? 'check-circle' : 'close-circle'" nzTheme="outline"></span>
            </div>
            <div>
              <div class="banner-title">
                {{ compareResults.targetUserBestMatch?.cosineSimilarity >= compareThreshold ? '\u2705 X\xE1c th\u1EF1c tr\xF9ng kh\u1EDBp!' : '\u274C Kh\xF4ng kh\u1EDBp v\u1EDBi ng\u01B0\u1EDDi d\xF9ng \u0111\xEDch!' }}
              </div>
              <div class="banner-desc">
                \u0110\u1ED9 t\u01B0\u01A1ng \u0111\u1ED3ng l\u1EDBn nh\u1EA5t v\u1EDBi user <strong>{{ targetEmbeddingUser.displayName || targetEmbeddingUser.username }}</strong> l\xE0:
                <strong>{{ compareResults.targetUserBestMatch?.cosineSimilarity | number:'1.4-4' }}</strong>
                (Kho\u1EA3ng c\xE1ch L2: {{ compareResults.targetUserBestMatch?.l2Distance | number:'1.4-4' }}). Ng\u01B0\u1EE1ng y\xEAu c\u1EA7u: {{ compareThreshold }}
              </div>
            </div>
          </div>

          <!-- Ranking list -->
          <div class="ranking-list-section" style="margin-top: 16px;">
            <div class="section-sub-title">\u{1F4CB} B\u1EA3ng x\u1EBFp h\u1EA1ng t\u01B0\u01A1ng \u0111\u1ED3ng ch\xE9o (T\u1EEB cao xu\u1ED1ng th\u1EA5p s\u1EED d\u1EE5ng HNSW):</div>
            <nz-table [nzData]="compareResults.allMatches" [nzShowPagination]="false" nzSize="small" class="ranking-table">
              <thead>
                <tr>
                  <th nzWidth="60px">H\u1EA1ng</th>
                  <th>Ng\u01B0\u1EDDi d\xF9ng</th>
                  <th nzAlign="center">Cosine Similarity</th>
                  <th nzAlign="center">Kho\u1EA3ng c\xE1ch L2</th>
                  <th nzAlign="center">Tr\u1EA1ng th\xE1i</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let match of compareResults.allMatches; let idx = index" [class.target-row]="match.isTarget" [class.matched-row]="match.cosineSimilarity >= compareThreshold">
                  <td><strong>#{{ idx + 1 }}</strong></td>
                  <td>
                    <div class="user-info">
                      <img *ngIf="match.avatarUrl" [src]="match.avatarUrl" class="user-avatar" alt="avatar" />
                      <div *ngIf="!match.avatarUrl" class="user-avatar-placeholder">
                        {{ (match.displayName || match.username || 'U').charAt(0).toUpperCase() }}
                      </div>
                      <div>
                        <div class="user-name">{{ match.displayName || match.username }}</div>
                        <div class="user-email" *ngIf="match.isTarget"><nz-tag nzColor="blue">\u0110\xEDch</nz-tag></div>
                      </div>
                    </div>
                  </td>
                  <td nzAlign="center"><strong>{{ match.cosineSimilarity | number:'1.4-4' }}</strong></td>
                  <td nzAlign="center">{{ match.l2Distance | number:'1.4-4' }}</td>
                  <td nzAlign="center">
                    <nz-tag [nzColor]="match.cosineSimilarity >= compareThreshold ? 'success' : 'default'">
                      {{ match.cosineSimilarity >= compareThreshold ? 'Kh\u1EDBp' : 'Kh\xF4ng kh\u1EDBp' }}
                    </nz-tag>
                  </td>
                </tr>
              </tbody>
            </nz-table>
          </div>
        </div>
      </div>
    </div>

    <ng-template #compareModalFooter>
      <button nz-button nzType="default" (click)="closeCompareModal()">\u0110\xF3ng</button>
      <button
        nz-button
        nzType="primary"
        [disabled]="!selectedCompareFile || isComparing"
        [nzLoading]="isComparing"
        (click)="executeComparison()">
        <span nz-icon nzType="thunderbolt"></span> B\u1EAFt \u0111\u1EA7u so kh\u1EDBp
      </button>
    </ng-template>
  </nz-modal>

</div>
`, styles: ['/* projects/tot/nhan-dien-khuon-mat/src/lib/training/training.component.css */\n.training-page {\n  padding: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  max-width: 1100px;\n  margin: 0 auto;\n}\n.card-title-icon {\n  display: flex;\n  align-items: center;\n  font-weight: 600;\n  font-size: 15px;\n  gap: 4px;\n}\n.card-actions-row {\n  display: flex;\n  align-items: center;\n}\n.user-table {\n  border-radius: 8px;\n  overflow: hidden;\n}\n.user-row {\n  cursor: pointer;\n  transition: background 0.15s ease;\n}\n.user-row:hover {\n  background: #f0f7ff !important;\n}\n.selected-row {\n  background: #e6f4ff !important;\n}\n.user-info {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.user-avatar {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid #d0e9ff;\n}\n.user-avatar-placeholder {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #1890ff,\n      #096dd9);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 15px;\n}\n.user-name {\n  font-weight: 600;\n  font-size: 14px;\n  color: #262626;\n}\n.user-email {\n  font-size: 12px;\n  color: #8c8c8c;\n}\n.def-count-label {\n  font-size: 12px;\n  color: #595959;\n}\n.training-controls {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.selected-info {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.control-buttons {\n  display: flex;\n  align-items: center;\n}\n.training-status-indicator {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.training-running-text {\n  color: #1890ff;\n  font-weight: 600;\n  animation: pulse 1.5s ease-in-out infinite;\n}\n@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.4;\n  }\n}\n.log-container {\n  border: 1px solid #d9d9d9;\n  border-radius: 8px;\n  overflow: hidden;\n  margin-top: 4px;\n}\n.log-header {\n  background: #fafafa;\n  border-bottom: 1px solid #d9d9d9;\n  padding: 8px 12px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 13px;\n  color: #595959;\n}\n.done-badge {\n  display: flex;\n  align-items: center;\n}\n.log-panel {\n  background: #0d1117;\n  height: 360px;\n  overflow-y: auto;\n  padding: 12px;\n  font-family:\n    "Consolas",\n    "Monaco",\n    "Courier New",\n    monospace;\n  font-size: 12.5px;\n  line-height: 1.7;\n  scroll-behavior: smooth;\n}\n.log-line {\n  display: block;\n  word-break: break-all;\n  padding: 1px 0;\n}\n.log-error {\n  color: #ff7875;\n}\n.log-warn {\n  color: #ffa940;\n}\n.log-success {\n  color: #73d13d;\n  font-weight: 600;\n}\n.log-cmd {\n  color: #69c0ff;\n  font-style: italic;\n}\n.log-system {\n  color: #b37feb;\n}\n.log-info {\n  color: #e6e6e6;\n}\n.folders-table {\n  border-radius: 8px;\n  overflow: hidden;\n}\n.empty-state {\n  text-align: center;\n  padding: 28px 0;\n}\n.section-card {\n  border-radius: 12px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);\n  border: 1px solid #f0f0f0;\n}\n.embeddings-table {\n  border-radius: 8px;\n  overflow: hidden;\n}\n.emb-list {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.emb-item {\n  background: rgba(255, 255, 255, 0.6);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  border: 1px solid #e8e8e8;\n  border-radius: 8px;\n  padding: 10px 12px;\n  transition: all 0.2s ease;\n}\n.emb-item:hover {\n  border-color: #1890ff;\n  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.1);\n}\n.emb-meta {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 6px;\n  font-size: 11px;\n}\n.emb-date {\n  color: #8c8c8c;\n}\n.emb-model {\n  color: #595959;\n  background: #f5f5f5;\n  padding: 2px 6px;\n  border-radius: 4px;\n  font-family: monospace;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 250px;\n}\n.emb-vector-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}\n.vector-preview {\n  font-family:\n    "Consolas",\n    "Courier New",\n    monospace;\n  background: #fafafa;\n  border: 1px solid #f0f0f0;\n  border-radius: 4px;\n  padding: 4px 8px;\n  font-size: 12px;\n  color: #1f1f1f;\n  flex: 1;\n}\n.emb-buttons {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.emb-source-path {\n  font-size: 11px;\n  color: #8c8c8c;\n  margin-top: 6px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.emb-source-path code {\n  background: #f9f9f9;\n  padding: 1px 4px;\n  border-radius: 3px;\n  font-size: 10.5px;\n}\n.compare-modal-content {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.target-user-card {\n  background: #f0f7ff;\n  border: 1px solid #bae7ff;\n  border-radius: 8px;\n  padding: 12px 16px;\n}\n.card-label {\n  font-size: 11.5px;\n  color: #0050b3;\n  font-weight: 600;\n  margin-bottom: 8px;\n}\n.user-profile-row {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.user-avatar.large {\n  width: 52px;\n  height: 52px;\n  border: 2.5px solid #1890ff;\n}\n.user-avatar-placeholder.large {\n  width: 52px;\n  height: 52px;\n  font-size: 20px;\n}\n.user-name-large {\n  font-weight: 700;\n  font-size: 16px;\n  color: #002c8c;\n}\n.user-email-large {\n  font-size: 13px;\n  color: #595959;\n}\n.threshold-panel {\n  background: #fafafa;\n  border: 1px solid #f0f0f0;\n  border-radius: 8px;\n  padding: 12px 16px;\n}\n.slider-label {\n  display: flex;\n  justify-content: space-between;\n  font-size: 13px;\n  color: #262626;\n  margin-bottom: 6px;\n}\n.slider-control-row {\n  display: flex;\n  align-items: center;\n}\n.image-upload-workspace {\n  display: flex;\n  gap: 16px;\n}\n.workspace-col {\n  flex: 1;\n  display: flex;\n}\n.upload-zone {\n  width: 100%;\n  height: 140px;\n  border: 2px dashed #1890ff;\n  border-radius: 8px;\n  background: #fafafa;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  padding: 16px;\n}\n.upload-zone:hover {\n  background: #e6f7ff;\n  border-color: #096dd9;\n}\n.upload-text {\n  font-weight: 600;\n  color: #262626;\n  margin-top: 8px;\n  font-size: 13px;\n}\n.upload-hint {\n  font-size: 11px;\n  color: #8c8c8c;\n  margin-top: 4px;\n  text-align: center;\n}\n.preview-box {\n  width: 100%;\n  height: 140px;\n  border: 1px solid #d9d9d9;\n  border-radius: 8px;\n  background: #fafafa;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n}\n.no-preview {\n  text-align: center;\n  color: #bfbfbf;\n  font-size: 12px;\n}\n.no-preview div {\n  margin-top: 6px;\n}\n.aligned-preview {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.aligned-img {\n  width: 90px;\n  height: 90px;\n  border-radius: 8px;\n  border: 2px solid #52c41a;\n  object-fit: cover;\n}\n.aligned-label {\n  font-size: 10.5px;\n  color: #52c41a;\n  font-weight: 600;\n}\n.loading-container {\n  text-align: center;\n  padding: 24px 0;\n}\n.loading-msg {\n  margin-top: 10px;\n  color: #1890ff;\n  font-weight: 600;\n}\n.best-match-banner {\n  background: #fff2f0;\n  border: 1px solid #ffccc7;\n  border-radius: 8px;\n  padding: 12px 16px;\n  display: flex;\n  gap: 12px;\n}\n.best-match-banner.matched {\n  background: #f6ffed;\n  border: 1px solid #b7eb8f;\n}\n.banner-icon {\n  font-size: 24px;\n  color: #ff4d4f;\n  margin-top: 2px;\n}\n.best-match-banner.matched .banner-icon {\n  color: #52c41a;\n}\n.banner-title {\n  font-weight: 700;\n  font-size: 14.5px;\n  color: #d32029;\n}\n.best-match-banner.matched .banner-title {\n  color: #389e0d;\n}\n.banner-desc {\n  font-size: 12.5px;\n  color: #595959;\n  margin-top: 4px;\n}\n.section-sub-title {\n  font-weight: 600;\n  font-size: 13px;\n  color: #262626;\n  margin-bottom: 8px;\n}\n.ranking-table {\n  border: 1px solid #f0f0f0;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.ranking-table tr.target-row {\n  background: rgba(24, 144, 255, 0.05) !important;\n}\n.ranking-table tr.target-row td {\n  border-top: 1px solid #91d5ff;\n  border-bottom: 1px solid #91d5ff;\n}\n.ranking-table tr.matched-row {\n  background: rgba(82, 196, 26, 0.03);\n}\n/*# sourceMappingURL=training.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TrainingComponent, { className: "TrainingComponent", filePath: "projects/tot/nhan-dien-khuon-mat/src/lib/training/training.component.ts", lineNumber: 48 });
})();

// projects/tot/nhan-dien-khuon-mat/src/lib/camera/camera.component.ts
var _c08 = ["videoElement"];
var _c15 = ["canvasOverlay"];
var _c24 = ["alignedCanvas"];
function CameraComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "nz-spin", 8);
    \u0275\u0275elementStart(2, "div", 9);
    \u0275\u0275text(3, "\u0110ang n\u1EA1p m\xF4 h\xECnh nh\u1EADn d\u1EA1ng khu\xF4n m\u1EB7t MediaPipe (BlazeFace)...");
    \u0275\u0275elementEnd()();
  }
}
function CameraComponent_div_2_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 49);
  }
}
function CameraComponent_div_2_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 50);
  }
}
function CameraComponent_div_2_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51);
    \u0275\u0275element(1, "span", 52);
    \u0275\u0275elementStart(2, "div", 53);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 54);
    \u0275\u0275listener("click", function CameraComponent_div_2_div_13_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.startCamera());
    });
    \u0275\u0275text(5, "Th\u1EED l\u1EA1i");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.cameraError);
  }
}
function CameraComponent_div_2_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 55);
  }
}
function CameraComponent_div_2_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275element(1, "span", 57);
    \u0275\u0275elementEnd();
  }
}
function CameraComponent_div_2_img_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 58);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r2.alignedPreviewUrl, \u0275\u0275sanitizeUrl);
  }
}
function CameraComponent_div_2_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275element(1, "nz-spin", 60);
    \u0275\u0275elementEnd();
  }
}
function CameraComponent_div_2_div_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61);
    \u0275\u0275element(1, "nz-spin", 8);
    \u0275\u0275elementStart(2, "div", 62);
    \u0275\u0275text(3, "\u0110ang so kh\u1EDBp vector \u0111\u1EB7c tr\u01B0ng...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 63);
    \u0275\u0275text(5, "\u0110ang so s\xE1nh embedding 512-chi\u1EC1u v\u1EDBi PostgreSQL HNSW");
    \u0275\u0275elementEnd()();
  }
}
function CameraComponent_div_2_div_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275element(1, "span", 65);
    \u0275\u0275elementStart(2, "div", 66);
    \u0275\u0275text(3, "\u0110ang qu\xE9t t\xECm khu\xF4n m\u1EB7t...");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 63);
    \u0275\u0275text(5, "Vui l\xF2ng \u0111\u1EE9ng th\u1EB3ng tr\u01B0\u1EDBc camera \u0111\u1EC3 b\u1EAFt \u0111\u1EA7u \u0111\u1ED1i s\xE1nh t\u1EF1 \u0111\u1ED9ng.");
    \u0275\u0275elementEnd()();
  }
}
function CameraComponent_div_2_div_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275element(1, "span", 67);
    \u0275\u0275elementStart(2, "div", 68);
    \u0275\u0275text(3, "Khu\xF4n m\u1EB7t qu\xE1 nh\u1ECF ho\u1EB7c qu\xE1 xa!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 63);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Khu\xF4n m\u1EB7t ph\xE1t hi\u1EC7n \u0111\u01B0\u1EE3c nh\u1ECF h\u01A1n ng\u01B0\u1EE1ng ", ctx_r2.minFaceWidthPx, "px. H\xE3y l\u1EA1i g\u1EA7n camera h\u01A1n ho\u1EB7c h\u1EA1 th\u1EA5p ng\u01B0\u1EE1ng k\xEDch th\u01B0\u1EDBc.");
  }
}
function CameraComponent_div_2_div_61_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73);
    \u0275\u0275element(1, "span", 74);
    \u0275\u0275text(2, "\xA0 G\u1EE3i \xFD: G\u1EA7n gi\u1ED1ng nh\u1EA5t v\u1EDBi ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.compareResults.bestMatch.displayName || ctx_r2.compareResults.bestMatch.username);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", \u0275\u0275pipeBind2(6, 2, ctx_r2.compareResults.bestMatch.cosineSimilarity, "1.2-2"), "). H\xE3y h\u1EA1 th\u1EA5p ng\u01B0\u1EE1ng so s\xE1nh n\u1EBFu mu\u1ED1n ki\u1EC3m tra. ");
  }
}
function CameraComponent_div_2_div_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275element(1, "span", 70);
    \u0275\u0275elementStart(2, "div", 71);
    \u0275\u0275text(3, "Khu\xF4n m\u1EB7t ch\u01B0a \u0111\u01B0\u1EE3c \u0111\u0103ng k\xFD!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 63);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, CameraComponent_div_2_div_61_div_6_Template, 7, 5, "div", 72);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u0110\u1ED9 t\u01B0\u01A1ng \u0111\u1ED3ng l\u1EDBn nh\u1EA5t t\xECm th\u1EA5y d\u01B0\u1EDBi ng\u01B0\u1EE1ng t\u1ED1i thi\u1EC3u ", ctx_r2.compareThreshold, ".");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.compareResults == null ? null : ctx_r2.compareResults.bestMatch);
  }
}
function CameraComponent_div_2_div_62_img_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 97);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275property("src", ctx_r2.bestMatchUser.avatarUrl, \u0275\u0275sanitizeUrl);
  }
}
function CameraComponent_div_2_div_62_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 98);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (ctx_r2.bestMatchUser.displayName || ctx_r2.bestMatchUser.username || "U").charAt(0).toUpperCase(), " ");
  }
}
function CameraComponent_div_2_div_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 75)(1, "div", 76);
    \u0275\u0275element(2, "span", 77);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\xA0 X\xC1C TH\u1EF0C TH\xC0NH C\xD4NG!");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 78)(6, "div", 79);
    \u0275\u0275template(7, CameraComponent_div_2_div_62_img_7_Template, 1, 1, "img", 80)(8, CameraComponent_div_2_div_62_div_8_Template, 2, 1, "div", 81);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 82)(10, "div", 83);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 84);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 85)(15, "nz-tag", 86);
    \u0275\u0275text(16, "\u0110\xE3 \u0110\u0103ng K\xFD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 87);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(19, "div", 88)(20, "div", 89)(21, "div", 90)(22, "span");
    \u0275\u0275text(23, "\u0110\u1ED9 t\u01B0\u01A1ng \u0111\u1ED3ng (Cosine Similarity):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "strong", 91);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 92);
    \u0275\u0275element(28, "div", 93);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 94)(30, "div", 90)(31, "span");
    \u0275\u0275text(32, "Kho\u1EA3ng c\xE1ch L2 (Euclidean Distance):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "strong", 95);
    \u0275\u0275text(34);
    \u0275\u0275pipe(35, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 92);
    \u0275\u0275element(37, "div", 96);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r2.bestMatchUser.avatarUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.bestMatchUser.avatarUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.bestMatchUser.displayName || ctx_r2.bestMatchUser.username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.bestMatchUser.email);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("\u0110\xE3 kh\u1EDBp: ", ctx_r2.scanRateMs, "ms");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(26, 11, ctx_r2.bestMatchUser.cosineSimilarity, "1.4-4"));
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", ctx_r2.bestMatchUser.cosineSimilarity * 100, "%");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(35, 14, ctx_r2.bestMatchUser.l2Distance, "1.4-4"));
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", (2 - ctx_r2.bestMatchUser.l2Distance) * 50, "%");
  }
}
function CameraComponent_div_2_div_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275element(1, "span", 99);
    \u0275\u0275elementStart(2, "div", 66);
    \u0275\u0275text(3, "Camera Ch\u01B0a K\xEDch Ho\u1EA1t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 63);
    \u0275\u0275text(5, 'Nh\u1EA5p v\xE0o "M\u1EDF camera" \u1EDF b\u1EA3ng b\xEAn tr\xE1i \u0111\u1EC3 kh\u1EDFi \u0111\u1ED9ng qu\xE9t \u0111\u1ED1i s\xE1nh khu\xF4n m\u1EB7t.');
    \u0275\u0275elementEnd()();
  }
}
function CameraComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 11)(2, "div", 12);
    \u0275\u0275element(3, "span", 13);
    \u0275\u0275elementStart(4, "span", 14);
    \u0275\u0275text(5, "\xA0 Live Camera Scanner");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, CameraComponent_div_2_span_6_Template, 1, 0, "span", 15)(7, CameraComponent_div_2_span_7_Template, 1, 0, "span", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 17);
    \u0275\u0275element(9, "video", 18, 0)(11, "canvas", 19, 1);
    \u0275\u0275template(13, CameraComponent_div_2_div_13_Template, 6, 1, "div", 20)(14, CameraComponent_div_2_div_14_Template, 1, 0, "div", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 22)(16, "button", 23);
    \u0275\u0275listener("click", function CameraComponent_div_2_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleScanning());
    });
    \u0275\u0275element(17, "span", 24);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 25);
    \u0275\u0275listener("click", function CameraComponent_div_2_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cameraActive ? ctx_r2.stopCamera() : ctx_r2.startCamera());
    });
    \u0275\u0275element(20, "span", 24);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(22, "canvas", 26, 2);
    \u0275\u0275elementStart(24, "div", 27)(25, "div", 28);
    \u0275\u0275text(26, "Khung c\u0103n ch\u1EC9nh Affine (MediaPipe 112x112):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 29);
    \u0275\u0275template(28, CameraComponent_div_2_div_28_Template, 2, 0, "div", 30)(29, CameraComponent_div_2_img_29_Template, 1, 1, "img", 31)(30, CameraComponent_div_2_div_30_Template, 2, 0, "div", 32);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 33)(32, "div", 34);
    \u0275\u0275element(33, "span", 35);
    \u0275\u0275elementStart(34, "span", 14);
    \u0275\u0275text(35, "\xA0 K\u1EBFt Qu\u1EA3 Nh\u1EADn D\u1EA1ng (HNSW)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "div", 36)(37, "div", 37)(38, "span");
    \u0275\u0275text(39, "Ng\u01B0\u1EE1ng nh\u1EADn d\u1EA1ng t\u1ED1i thi\u1EC3u (Cosine Similarity):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "strong", 38);
    \u0275\u0275text(41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 39)(43, "nz-slider", 40);
    \u0275\u0275twoWayListener("ngModelChange", function CameraComponent_div_2_Template_nz_slider_ngModelChange_43_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.compareThreshold, $event) || (ctx_r2.compareThreshold = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "nz-input-number", 41);
    \u0275\u0275twoWayListener("ngModelChange", function CameraComponent_div_2_Template_nz_input_number_ngModelChange_44_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.compareThreshold, $event) || (ctx_r2.compareThreshold = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "div", 42)(46, "div", 37)(47, "span");
    \u0275\u0275text(48, "K\xEDch th\u01B0\u1EDBc t\u1ED1i thi\u1EC3u khu\xF4n m\u1EB7t (px r\u1ED9ng, l\u1ECDc m\u1EB7t xa/nh\u1ECF):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "strong", 38);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 39)(52, "nz-slider", 40);
    \u0275\u0275twoWayListener("ngModelChange", function CameraComponent_div_2_Template_nz_slider_ngModelChange_52_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.minFaceWidthPx, $event) || (ctx_r2.minFaceWidthPx = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "nz-input-number", 41);
    \u0275\u0275twoWayListener("ngModelChange", function CameraComponent_div_2_Template_nz_input_number_ngModelChange_53_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.minFaceWidthPx, $event) || (ctx_r2.minFaceWidthPx = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "div", 43);
    \u0275\u0275text(55, "\u{1F4A1} T\u0103ng ng\u01B0\u1EE1ng n\xE0y n\u1EBFu khung h\xECnh c\xF3 nhi\u1EC1u ng\u01B0\u1EDDi \u2014 ch\u1EC9 nh\u1EADn d\u1EA1ng khu\xF4n m\u1EB7t \u0111\u1EE7 g\u1EA7n.");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(56, "nz-divider");
    \u0275\u0275elementStart(57, "div", 44);
    \u0275\u0275template(58, CameraComponent_div_2_div_58_Template, 6, 0, "div", 45)(59, CameraComponent_div_2_div_59_Template, 6, 0, "div", 46)(60, CameraComponent_div_2_div_60_Template, 6, 1, "div", 46)(61, CameraComponent_div_2_div_61_Template, 7, 2, "div", 47)(62, CameraComponent_div_2_div_62_Template, 38, 17, "div", 48)(63, CameraComponent_div_2_div_63_Template, 6, 0, "div", 46);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r2.isScanning);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.isScanning);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("inactive", !ctx_r2.cameraActive);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r2.cameraError);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.cameraActive && ctx_r2.isScanning);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzType", ctx_r2.isScanning ? "default" : "primary")("nzDanger", ctx_r2.isScanning)("disabled", !ctx_r2.cameraActive);
    \u0275\u0275advance();
    \u0275\u0275property("nzType", ctx_r2.isScanning ? "pause-circle" : "play-circle");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.isScanning ? "T\u1EA1m d\u1EEBng" : "B\u1EAFt \u0111\u1EA7u qu\xE9t", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("nzType", ctx_r2.cameraActive ? "poweroff" : "reload");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.cameraActive ? "T\u1EAFt camera" : "M\u1EDF camera", " ");
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", !ctx_r2.alignedPreviewUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.alignedPreviewUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.isComparing);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r2.compareThreshold);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzMin", 0.3)("nzMax", 0.9)("nzStep", 0.01);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.compareThreshold);
    \u0275\u0275advance();
    \u0275\u0275property("nzMin", 0.3)("nzMax", 0.9)("nzStep", 0.01);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.compareThreshold);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", ctx_r2.minFaceWidthPx, "px");
    \u0275\u0275advance(2);
    \u0275\u0275property("nzMin", 20)("nzMax", 300)("nzStep", 5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.minFaceWidthPx);
    \u0275\u0275advance();
    \u0275\u0275property("nzMin", 20)("nzMax", 300)("nzStep", 5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.minFaceWidthPx);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r2.isComparing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.noFaceDetected && !ctx_r2.isComparing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.faceTooSmall && !ctx_r2.noFaceDetected && !ctx_r2.isComparing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.belowThreshold && !ctx_r2.noFaceDetected && !ctx_r2.isComparing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.bestMatchUser && !ctx_r2.noFaceDetected && !ctx_r2.isComparing);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.cameraActive && !ctx_r2.loadingDetector);
  }
}
function CameraComponent_div_3_div_10_img_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 119);
  }
  if (rf & 2) {
    const entry_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", entry_r5.previewUrl, \u0275\u0275sanitizeUrl);
  }
}
function CameraComponent_div_3_div_10_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 120);
  }
}
function CameraComponent_div_3_div_10_div_7_img_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 127);
  }
  if (rf & 2) {
    const entry_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("src", entry_r5.avatarUrl, \u0275\u0275sanitizeUrl);
  }
}
function CameraComponent_div_3_div_10_div_7_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 128);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((entry_r5.displayName || "U").charAt(0).toUpperCase());
  }
}
function CameraComponent_div_3_div_10_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 121);
    \u0275\u0275template(2, CameraComponent_div_3_div_10_div_7_img_2_Template, 1, 1, "img", 122)(3, CameraComponent_div_3_div_10_div_7_div_3_Template, 2, 1, "div", 123);
    \u0275\u0275elementStart(4, "div", 124)(5, "div", 125);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 126);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const entry_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", entry_r5.avatarUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !entry_r5.avatarUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(entry_r5.displayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r5.email);
  }
}
function CameraComponent_div_3_div_10_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 129);
    \u0275\u0275element(1, "span", 130);
    \u0275\u0275elementStart(2, "span", 131);
    \u0275\u0275text(3, "Kh\xF4ng kh\u1EDBp");
    \u0275\u0275elementEnd()();
  }
}
function CameraComponent_div_3_div_10_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "nz-tag", 132);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 1, entry_r5.cosineSimilarity, "1.3-3"));
  }
}
function CameraComponent_div_3_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 109)(1, "div", 110);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 111);
    \u0275\u0275template(4, CameraComponent_div_3_div_10_img_4_Template, 1, 1, "img", 112)(5, CameraComponent_div_3_div_10_span_5_Template, 1, 0, "span", 113);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 114);
    \u0275\u0275template(7, CameraComponent_div_3_div_10_div_7_Template, 9, 4, "div", 115)(8, CameraComponent_div_3_div_10_div_8_Template, 4, 0, "div", 116);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 117);
    \u0275\u0275template(10, CameraComponent_div_3_div_10_div_10_Template, 4, 4, "div", 115);
    \u0275\u0275elementStart(11, "div", 118);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const entry_r5 = ctx.$implicit;
    const i_r6 = ctx.index;
    \u0275\u0275classProp("history-matched", entry_r5.matched)("history-unmatched", !entry_r5.matched);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("#", i_r6 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", entry_r5.previewUrl);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !entry_r5.previewUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", entry_r5.matched);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !entry_r5.matched);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", entry_r5.matched);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(13, 11, entry_r5.timestamp, "HH:mm:ss"));
  }
}
function CameraComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 100)(1, "div", 101);
    \u0275\u0275element(2, "span", 102);
    \u0275\u0275elementStart(3, "span", 103);
    \u0275\u0275text(4, "\xA0 L\u1ECBch S\u1EED Nh\u1EADn Di\u1EC7n ");
    \u0275\u0275element(5, "nz-badge", 104);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 105);
    \u0275\u0275listener("click", function CameraComponent_div_3_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.clearHistory());
    });
    \u0275\u0275element(7, "span", 106);
    \u0275\u0275text(8, " X\xF3a l\u1ECBch s\u1EED ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 107);
    \u0275\u0275template(10, CameraComponent_div_3_div_10_Template, 14, 14, "div", 108);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("nzCount", ctx_r2.recognitionHistory.length);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r2.recognitionHistory);
  }
}
var _CameraComponent = class _CameraComponent {
  constructor() {
    this.api = inject(NhanDienKhuonMatService);
    this.message = inject(NzMessageService);
    this.stream = null;
    this.cameraActive = false;
    this.cameraError = null;
    this.loadingDetector = false;
    this.detectorReady = false;
    this.faceDetector = null;
    this.scanTimer = null;
    this.isScanning = false;
    this.scanRateMs = 800;
    this.compareThreshold = 0.5;
    this.minFaceWidthPx = 80;
    this.isComparing = false;
    this.compareResults = null;
    this.bestMatchUser = null;
    this.noFaceDetected = false;
    this.belowThreshold = false;
    this.faceTooSmall = false;
    this.alignedPreviewUrl = null;
    this.recognitionHistory = [];
  }
  ngOnInit() {
    this.initMediaPipe();
  }
  ngOnDestroy() {
    this.stopCamera();
    this.stopScanning();
    if (this.alignedPreviewUrl) {
      URL.revokeObjectURL(this.alignedPreviewUrl);
    }
  }
  // --- Khởi tạo MediaPipe BlazeFace Detector ---
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
      this.startCamera();
    } catch (error) {
      console.error("[MediaPipe Camera] Init Failed: ", error);
      this.message.error("Kh\xF4ng th\u1EC3 kh\u1EDFi t\u1EA1o m\xF4 h\xECnh ph\xE1t hi\u1EC7n khu\xF4n m\u1EB7t BlazeFace \u1EDF Client.");
    } finally {
      this.loadingDetector = false;
    }
  }
  // --- Kích hoạt Webcam ---
  async startCamera() {
    this.cameraError = null;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
        audio: false
      });
      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.stream;
        this.videoElement.nativeElement.onloadedmetadata = () => {
          this.videoElement.nativeElement.play();
          this.cameraActive = true;
          this.startScanning();
        };
      }
    } catch (err) {
      console.error("[Webcam] Access Failed: ", err);
      this.cameraError = "Kh\xF4ng th\u1EC3 truy c\u1EADp camera. Vui l\xF2ng c\u1EA5p quy\u1EC1n camera trong tr\xECnh duy\u1EC7t ho\u1EB7c s\u1EED d\u1EE5ng giao th\u1EE9c HTTPS/Localhost.";
      this.message.error("L\u1ED7i k\xEDch ho\u1EA1t Webcam.");
    }
  }
  // --- Tắt Webcam ---
  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    this.cameraActive = false;
    this.stopScanning();
    this.clearOverlay();
  }
  // --- Quản lý chu trình tự động quét ---
  startScanning() {
    if (!this.detectorReady || !this.cameraActive)
      return;
    this.isScanning = true;
    this.scanTimer = setInterval(() => {
      this.processVideoFrame();
    }, this.scanRateMs);
  }
  stopScanning() {
    this.isScanning = false;
    if (this.scanTimer) {
      clearInterval(this.scanTimer);
      this.scanTimer = null;
    }
  }
  toggleScanning() {
    if (this.isScanning) {
      this.stopScanning();
    } else {
      this.startScanning();
    }
  }
  // --- Vẽ khung quét nhấp nháy trên canvas đè lên video ---
  drawTargetOutline(bbox) {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasOverlay.nativeElement;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    if (canvas.width !== video.clientWidth || canvas.height !== video.clientHeight) {
      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scaleX = canvas.width / video.videoWidth;
    const scaleY = canvas.height / video.videoHeight;
    const x = bbox.originX * scaleX;
    const y = bbox.originY * scaleY;
    const w = bbox.width * scaleX;
    const h = bbox.height * scaleY;
    ctx.strokeStyle = this.bestMatchUser ? "#52c41a" : "#1890ff";
    ctx.lineWidth = 3;
    const cornerLength = Math.min(w, h) * 0.25;
    ctx.beginPath();
    ctx.moveTo(x + cornerLength, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + cornerLength);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + w - cornerLength, y);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w, y + cornerLength);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y + h - cornerLength);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x + cornerLength, y + h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + w - cornerLength, y + h);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + w, y + h - cornerLength);
    ctx.stroke();
    ctx.fillStyle = this.bestMatchUser ? "rgba(82, 196, 26, 0.15)" : "rgba(24, 144, 255, 0.1)";
    ctx.fillRect(x, y, w, h);
  }
  clearOverlay() {
    if (this.canvasOverlay && this.canvasOverlay.nativeElement) {
      const canvas = this.canvasOverlay.nativeElement;
      const ctx = canvas.getContext("2d");
      if (ctx)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  // --- Trích xuất ảnh và so khớp từ luồng video ---
  async processVideoFrame() {
    if (!this.detectorReady || !this.faceDetector || this.isComparing || !this.cameraActive)
      return;
    const video = this.videoElement.nativeElement;
    if (video.paused || video.ended)
      return;
    try {
      const detections = this.faceDetector.detect(video).detections || [];
      if (detections.length === 0) {
        this.noFaceDetected = true;
        this.faceTooSmall = false;
        this.clearOverlay();
        return;
      }
      this.noFaceDetected = false;
      const largeEnoughDetections = detections.filter((d) => d.boundingBox.width >= this.minFaceWidthPx);
      if (largeEnoughDetections.length === 0) {
        this.faceTooSmall = true;
        this.clearOverlay();
        return;
      }
      this.faceTooSmall = false;
      const det = largeEnoughDetections.reduce((best, cur) => cur.boundingBox.width > best.boundingBox.width ? cur : best);
      this.drawTargetOutline(det.boundingBox);
      const keypoints = det.keypoints || [];
      if (keypoints.length < 2)
        return;
      this.isComparing = true;
      const eyeLeft = {
        x: keypoints[0].x * video.videoWidth,
        y: keypoints[0].y * video.videoHeight
      };
      const eyeRight = {
        x: keypoints[1].x * video.videoWidth,
        y: keypoints[1].y * video.videoHeight
      };
      const paddedBlob = this.cropFaceWithPadding(video, det.boundingBox, 0.6);
      const alignedCanvasEl = this.alignedCanvas.nativeElement;
      this.alignFaceBrowser(video, eyeLeft, eyeRight, alignedCanvasEl);
      alignedCanvasEl.toBlob(async (previewBlob) => {
        if (previewBlob) {
          if (this.alignedPreviewUrl)
            URL.revokeObjectURL(this.alignedPreviewUrl);
          this.alignedPreviewUrl = URL.createObjectURL(previewBlob);
        }
      }, "image/jpeg", 0.9);
      if (!paddedBlob) {
        this.isComparing = false;
        return;
      }
      const file = new File([paddedBlob], "face_padded.jpg", { type: "image/jpeg" });
      try {
        const result = await this.api.compareGlobal(file, this.compareThreshold);
        this.compareResults = result;
        const snapshotUrl = this.alignedPreviewUrl;
        if (result && result.bestMatch) {
          this.bestMatchUser = result.bestMatch;
          this.belowThreshold = false;
          this.addToHistory(result.bestMatch, snapshotUrl, true);
        } else {
          this.bestMatchUser = null;
          this.belowThreshold = true;
          this.addToHistory(null, snapshotUrl, false);
        }
      } catch (err) {
        console.error("L\u1ED7i so kh\u1EDBp m\xE1y ch\u1EE7: ", err);
        this.bestMatchUser = null;
      } finally {
        this.isComparing = false;
      }
    } catch (err) {
      console.error("[Scanner Frame] Error: ", err);
      this.isComparing = false;
    }
  }
  /**
   * Crop khuôn mặt với padding lớn từ video stream.
   * Padding = 0.6 nghĩa là mỗi cạnh được mở rộng thêm 60% chiều rộng bbox.
   * Điều này giúp server có đủ vùng để detect + align chính xác.
   */
  cropFaceWithPadding(video, bbox, paddingFactor) {
    const padX = bbox.width * paddingFactor;
    const padY = bbox.height * paddingFactor;
    const x = Math.max(0, bbox.originX - padX);
    const y = Math.max(0, bbox.originY - padY);
    const w = Math.min(video.videoWidth - x, bbox.width + padX * 2);
    const h = Math.min(video.videoHeight - y, bbox.height + padY * 2);
    const maxDim = 256;
    const scale = Math.min(maxDim / w, maxDim / h, 1);
    const outW = Math.round(w * scale);
    const outH = Math.round(h * scale);
    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = outW;
    cropCanvas.height = outH;
    const ctx = cropCanvas.getContext("2d");
    if (!ctx)
      return null;
    ctx.drawImage(video, x, y, w, h, 0, 0, outW, outH);
    let resultBlob = null;
    const dataUrl = cropCanvas.toDataURL("image/jpeg", 0.9);
    const byteString = atob(dataUrl.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    resultBlob = new Blob([ab], { type: "image/jpeg" });
    return resultBlob;
  }
  // --- Thuật toán căn chỉnh mắt Affine ---
  alignFaceBrowser(videoEl, eyeLeft, eyeRight, canvas) {
    canvas.width = 112;
    canvas.height = 112;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      throw new Error("Kh\xF4ng th\u1EC3 kh\u1EDFi t\u1EA1o Canvas 2D Context");
    const cx = (eyeLeft.x + eyeRight.x) / 2;
    const cy = (eyeLeft.y + eyeRight.y) / 2;
    const dx = eyeRight.x - eyeLeft.x;
    const dy = eyeRight.y - eyeLeft.y;
    const currentDist = Math.sqrt(dx * dx + dy * dy);
    const angleRad = Math.atan2(dy, dx);
    const targetDist = 35.2372;
    const tx = 55.9132;
    const ty = 51.59885;
    const scale = targetDist / currentDist;
    ctx.save();
    ctx.translate(tx, ty);
    ctx.scale(scale, scale);
    ctx.rotate(-angleRad);
    ctx.translate(-cx, -cy);
    ctx.drawImage(videoEl, 0, 0);
    ctx.restore();
  }
  // --- Thêm kết quả vào lịch sử nhận diện ---
  addToHistory(bestMatch, previewUrl, matched) {
    var _a, _b;
    const entry = {
      timestamp: /* @__PURE__ */ new Date(),
      previewUrl: previewUrl ? previewUrl : null,
      matched,
      displayName: (bestMatch == null ? void 0 : bestMatch.displayName) || (bestMatch == null ? void 0 : bestMatch.username) || "---",
      email: (bestMatch == null ? void 0 : bestMatch.email) || "",
      avatarUrl: (bestMatch == null ? void 0 : bestMatch.avatarUrl) || "",
      cosineSimilarity: (_a = bestMatch == null ? void 0 : bestMatch.cosineSimilarity) != null ? _a : 0,
      l2Distance: (_b = bestMatch == null ? void 0 : bestMatch.l2Distance) != null ? _b : 0
    };
    this.recognitionHistory = [entry, ...this.recognitionHistory].slice(0, 5);
  }
  clearHistory() {
    this.recognitionHistory = [];
  }
};
_CameraComponent.\u0275fac = function CameraComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CameraComponent)();
};
_CameraComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CameraComponent, selectors: [["tot-nhan-dien-camera"]], viewQuery: function CameraComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c08, 5)(_c15, 5)(_c24, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.videoElement = _t.first);
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.canvasOverlay = _t.first);
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.alignedCanvas = _t.first);
  }
}, decls: 4, vars: 3, consts: [["videoElement", ""], ["canvasOverlay", ""], ["alignedCanvas", ""], [1, "camera-recognition-page"], ["class", "MP-loading-overlay", 4, "ngIf"], ["class", "recognition-grid", 4, "ngIf"], ["class", "history-section", 4, "ngIf"], [1, "MP-loading-overlay"], ["nzSimple", "", "nzSize", "large"], [1, "loading-text"], [1, "recognition-grid"], [1, "viewport-card"], [1, "viewport-header"], ["nz-icon", "", "nzType", "video-camera", 2, "color", "#1890ff", "font-size", "18px"], [1, "header-title"], ["class", "status-dot pulsing-green", "nz-tooltip", "", "nzTooltipTitle", "\u0110ang ho\u1EA1t \u0111\u1ED9ng qu\xE9t li\xEAn t\u1EE5c", 4, "ngIf"], ["class", "status-dot dot-yellow", "nz-tooltip", "", "nzTooltipTitle", "\u0110\xE3 t\u1EA1m d\u1EEBng", 4, "ngIf"], [1, "camera-viewport-container"], ["autoplay", "", "playsinline", "", "muted", "", 1, "webcam-feed"], [1, "canvas-overlay"], ["class", "camera-error-overlay", 4, "ngIf"], ["class", "scanline-sweep", 4, "ngIf"], [1, "viewport-controls"], ["nz-button", "", 2, "width", "140px", 3, "click", "nzType", "nzDanger", "disabled"], ["nz-icon", "", 3, "nzType"], ["nz-button", "", "nzType", "default", 2, "margin-left", "12px", 3, "click"], [2, "display", "none"], [1, "aligned-face-preview-section"], [1, "preview-title"], [1, "preview-box"], ["class", "no-preview-thumbnail", 4, "ngIf"], ["class", "face-crop-img", "alt", "Aligned Crop", 3, "src", 4, "ngIf"], ["class", "preview-status", 4, "ngIf"], [1, "results-card"], [1, "results-header"], ["nz-icon", "", "nzType", "security-scan", 2, "color", "#1890ff", "font-size", "18px"], [1, "threshold-panel-container"], [1, "slider-label"], [1, "threshold-val"], [1, "slider-control-row"], [2, "flex", "1", "margin-right", "12px", 3, "ngModelChange", "nzMin", "nzMax", "nzStep", "ngModel"], ["nzSize", "small", 3, "ngModelChange", "nzMin", "nzMax", "nzStep", "ngModel"], [1, "threshold-panel-container", 2, "margin-top", "10px"], [2, "font-size", "11px", "color", "#8c8c8c", "margin-top", "4px"], [1, "state-container"], ["class", "scanning-state-card active-eval", 4, "ngIf"], ["class", "scanning-state-card", 4, "ngIf"], ["class", "scanning-state-card alert-fail", 4, "ngIf"], ["class", "match-success-card", 4, "ngIf"], ["nz-tooltip", "", "nzTooltipTitle", "\u0110ang ho\u1EA1t \u0111\u1ED9ng qu\xE9t li\xEAn t\u1EE5c", 1, "status-dot", "pulsing-green"], ["nz-tooltip", "", "nzTooltipTitle", "\u0110\xE3 t\u1EA1m d\u1EEBng", 1, "status-dot", "dot-yellow"], [1, "camera-error-overlay"], ["nz-icon", "", "nzType", "warning", 2, "font-size", "42px", "color", "#ff4d4f"], [1, "error-msg"], ["nz-button", "", "nzType", "primary", 2, "margin-top", "12px", 3, "click"], [1, "scanline-sweep"], [1, "no-preview-thumbnail"], ["nz-icon", "", "nzType", "scan", 2, "font-size", "20px", "color", "#ccc"], ["alt", "Aligned Crop", 1, "face-crop-img", 3, "src"], [1, "preview-status"], ["nzSimple", "", "nzSize", "small"], [1, "scanning-state-card", "active-eval"], [1, "state-title", "pulsing-text"], [1, "state-hint"], [1, "scanning-state-card"], ["nz-icon", "", "nzType", "user", 1, "state-icon", "gray-pulse"], [1, "state-title"], ["nz-icon", "", "nzType", "shrink", 1, "state-icon", 2, "color", "#faad14"], [1, "state-title", 2, "color", "#d46b08"], [1, "scanning-state-card", "alert-fail"], ["nz-icon", "", "nzType", "warning", 1, "state-icon", "text-red", "shadow-pulse"], [1, "state-title", "text-red"], ["class", "failed-best-match-snippet", 4, "ngIf"], [1, "failed-best-match-snippet"], ["nz-icon", "", "nzType", "info-circle"], [1, "match-success-card"], [1, "success-banner"], ["nz-icon", "", "nzType", "check-circle", "nzTheme", "fill", 1, "success-check-icon"], [1, "matched-profile-content"], [1, "profile-avatar-wrapper"], ["class", "matched-profile-avatar", "alt", "avatar", 3, "src", 4, "ngIf"], ["class", "matched-profile-avatar-placeholder", 4, "ngIf"], [1, "profile-details-text"], [1, "matched-name"], [1, "matched-email"], [1, "matched-meta"], ["nzColor", "success"], [1, "matched-timestamp"], [1, "stats-panel"], [1, "stat-progress-item"], [1, "stat-header"], [1, "stat-number", "text-green"], [1, "progress-bar-track"], [1, "progress-bar-fill", "green-fill"], [1, "stat-progress-item", 2, "margin-top", "12px"], [1, "stat-number", "text-blue"], [1, "progress-bar-fill", "blue-fill"], ["alt", "avatar", 1, "matched-profile-avatar", 3, "src"], [1, "matched-profile-avatar-placeholder"], ["nz-icon", "", "nzType", "video-camera", 1, "state-icon", "icon-blue"], [1, "history-section"], [1, "history-header"], ["nz-icon", "", "nzType", "history", 2, "color", "#722ed1", "font-size", "16px"], [1, "history-title"], ["nzColor", "#722ed1", 2, "margin-left", "6px", 3, "nzCount"], ["nz-button", "", "nzType", "text", "nzSize", "small", 2, "margin-left", "auto", "color", "#8c8c8c", "font-size", "11px", 3, "click"], ["nz-icon", "", "nzType", "delete"], [1, "history-list"], ["class", "history-item", 3, "history-matched", "history-unmatched", 4, "ngFor", "ngForOf"], [1, "history-item"], [1, "history-index"], [1, "history-thumbnail"], ["alt", "Face snap", "class", "history-thumb-img", 3, "src", 4, "ngIf"], ["nz-icon", "", "nzType", "scan", "style", "font-size: 18px; color: #ccc;", 4, "ngIf"], [1, "history-profile"], [4, "ngIf"], ["class", "history-no-match", 4, "ngIf"], [1, "history-metrics"], [1, "history-time"], ["alt", "Face snap", 1, "history-thumb-img", 3, "src"], ["nz-icon", "", "nzType", "scan", 2, "font-size", "18px", "color", "#ccc"], [1, "history-avatar-row"], ["class", "history-avatar", "alt", "avatar", 3, "src", 4, "ngIf"], ["class", "history-avatar-placeholder", 4, "ngIf"], [1, "history-name-block"], [1, "history-name"], [1, "history-email"], ["alt", "avatar", 1, "history-avatar", 3, "src"], [1, "history-avatar-placeholder"], [1, "history-no-match"], ["nz-icon", "", "nzType", "stop", 2, "color", "#ff4d4f", "font-size", "14px"], [2, "margin-left", "6px", "font-size", "12px", "color", "#ff4d4f", "font-weight", "600"], ["nzColor", "success", 2, "font-size", "10.5px"]], template: function CameraComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275template(1, CameraComponent_div_1_Template, 4, 0, "div", 4)(2, CameraComponent_div_2_Template, 64, 40, "div", 5)(3, CameraComponent_div_3_Template, 11, 2, "div", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.loadingDetector);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.loadingDetector);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.recognitionHistory.length > 0);
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  FormsModule,
  NgControlStatus,
  NgModel,
  NzButtonModule,
  NzButtonComponent,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzCardModule,
  NzTagModule,
  NzTagComponent,
  NzSpinModule,
  NzSpinComponent,
  NzSliderModule,
  NzSliderComponent,
  NzInputNumberModule,
  NzInputNumberComponent,
  NzIconModule,
  NzIconDirective,
  NzDividerModule,
  NzDividerComponent,
  NzAlertModule,
  NzBadgeModule,
  NzBadgeComponent,
  DecimalPipe,
  DatePipe
], styles: ["\n.camera-recognition-page[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 1100px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.MP-loading-overlay[_ngcontent-%COMP%] {\n  height: 400px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n  background: rgba(255, 255, 255, 0.8);\n  border: 1px solid #f0f0f0;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);\n}\n.loading-text[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  color: #1890ff;\n  animation: _ngcontent-%COMP%_MPpulse 1.8s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_MPpulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n.recognition-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.1fr 0.9fr;\n  gap: 24px;\n  align-items: start;\n}\n@media (max-width: 800px) {\n  .recognition-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.viewport-card[_ngcontent-%COMP%], \n.results-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #f0f0f0;\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.viewport-header[_ngcontent-%COMP%], \n.results-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid #f0f0f0;\n  padding-bottom: 12px;\n  margin-bottom: 4px;\n}\n.header-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 15px;\n  color: #1f1f1f;\n  flex: 1;\n}\n.status-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  margin-left: 8px;\n}\n.pulsing-green[_ngcontent-%COMP%] {\n  background: #52c41a;\n  box-shadow: 0 0 0 0 rgba(82, 196, 26, 0.7);\n  animation: _ngcontent-%COMP%_greenPulse 1.6s infinite;\n}\n.dot-yellow[_ngcontent-%COMP%] {\n  background: #faad14;\n}\n@keyframes _ngcontent-%COMP%_greenPulse {\n  0% {\n    transform: scale(0.95);\n    box-shadow: 0 0 0 0 rgba(82, 196, 26, 0.7);\n  }\n  70% {\n    transform: scale(1);\n    box-shadow: 0 0 0 6px rgba(82, 196, 26, 0);\n  }\n  100% {\n    transform: scale(0.95);\n    box-shadow: 0 0 0 0 rgba(82, 196, 26, 0);\n  }\n}\n.camera-viewport-container[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 4 / 3;\n  background: #141414;\n  border-radius: 8px;\n  overflow: hidden;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);\n}\n.webcam-feed[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transform: scaleX(-1);\n  transition: opacity 0.3s ease;\n}\n.webcam-feed.inactive[_ngcontent-%COMP%] {\n  opacity: 0.1;\n}\n.canvas-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  transform: scaleX(-1);\n}\n.camera-error-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(255, 255, 255, 0.95);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 24px;\n  text-align: center;\n}\n.error-msg[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  font-weight: 500;\n  color: #ff4d4f;\n  font-size: 13px;\n  max-width: 320px;\n}\n.scanline-sweep[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 3px;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(24, 144, 255, 0),\n      #1890ff,\n      rgba(24, 144, 255, 0));\n  box-shadow: 0 0 8px #1890ff;\n  animation: _ngcontent-%COMP%_sweepLine 3s linear infinite;\n  pointer-events: none;\n}\n@keyframes _ngcontent-%COMP%_sweepLine {\n  0% {\n    top: 0%;\n  }\n  50% {\n    top: 100%;\n  }\n  100% {\n    top: 0%;\n  }\n}\n.viewport-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-top: 4px;\n}\n.aligned-face-preview-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  background: #fafafa;\n  border: 1px solid #f0f0f0;\n  border-radius: 8px;\n  padding: 10px 14px;\n  margin-top: 4px;\n}\n.preview-title[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #595959;\n}\n.preview-box[_ngcontent-%COMP%] {\n  position: relative;\n  width: 48px;\n  height: 48px;\n  border-radius: 4px;\n  overflow: hidden;\n  border: 1.5px solid #d9d9d9;\n  background: #fafafa;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  flex-shrink: 0;\n}\n.no-preview-thumbnail[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: #ccc;\n}\n.face-crop-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.preview-status[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(255, 255, 255, 0.7);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.threshold-panel-container[_ngcontent-%COMP%] {\n  background: #fafafa;\n  border: 1px solid #f0f0f0;\n  border-radius: 8px;\n  padding: 12px 14px;\n}\n.slider-label[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 12.5px;\n  color: #595959;\n  margin-bottom: 4px;\n}\n.threshold-val[_ngcontent-%COMP%] {\n  color: #1890ff;\n  font-weight: 700;\n  font-size: 13.5px;\n}\n.slider-control-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.state-container[_ngcontent-%COMP%] {\n  min-height: 220px;\n  display: flex;\n  flex-direction: column;\n}\n.scanning-state-card[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  padding: 24px;\n  background: rgba(250, 250, 250, 0.6);\n  border: 1.5px dashed #d9d9d9;\n  border-radius: 8px;\n  transition: all 0.2s ease;\n}\n.scanning-state-card.active-eval[_ngcontent-%COMP%] {\n  background: rgba(230, 247, 255, 0.2);\n  border-color: #1890ff;\n  border-style: solid;\n}\n.scanning-state-card.alert-fail[_ngcontent-%COMP%] {\n  background: rgba(255, 241, 240, 0.6);\n  border-color: #ff4d4f;\n  border-style: solid;\n  box-shadow: 0 4px 12px rgba(255, 77, 79, 0.04);\n}\n.state-icon[_ngcontent-%COMP%] {\n  font-size: 38px;\n  margin-bottom: 12px;\n}\n.icon-blue[_ngcontent-%COMP%] {\n  color: #1890ff;\n}\n.text-red[_ngcontent-%COMP%] {\n  color: #ff4d4f;\n}\n.gray-pulse[_ngcontent-%COMP%] {\n  color: #bfbfbf;\n  animation: _ngcontent-%COMP%_grayPulseKey 1.5s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_grayPulseKey {\n  0%, 100% {\n    transform: scale(1);\n    color: #bfbfbf;\n  }\n  50% {\n    transform: scale(1.1);\n    color: #1890ff;\n  }\n}\n.shadow-pulse[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_redWarningPulse 1.6s infinite;\n}\n@keyframes _ngcontent-%COMP%_redWarningPulse {\n  0% {\n    transform: scale(1);\n    filter: drop-shadow(0 0 0 rgba(255, 77, 79, 0.4));\n  }\n  50% {\n    transform: scale(1.1);\n    filter: drop-shadow(0 0 6px rgba(255, 77, 79, 0.6));\n  }\n  100% {\n    transform: scale(1);\n    filter: drop-shadow(0 0 0 rgba(255, 77, 79, 0));\n  }\n}\n.state-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14.5px;\n  color: #262626;\n  margin-bottom: 4px;\n}\n.state-hint[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #8c8c8c;\n  max-width: 250px;\n  line-height: 1.5;\n}\n.pulsing-text[_ngcontent-%COMP%] {\n  color: #1890ff;\n  animation: _ngcontent-%COMP%_pulseScan 1.2s ease-in-out infinite;\n}\n@keyframes _ngcontent-%COMP%_pulseScan {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n.failed-best-match-snippet[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  background: #ffffff;\n  border: 1.5px solid #ffccc7;\n  border-radius: 6px;\n  padding: 8px 10px;\n  font-size: 11.5px;\n  color: #595959;\n  line-height: 1.5;\n}\n.match-success-card[_ngcontent-%COMP%] {\n  flex: 1;\n  background: #f6ffed;\n  border: 1.5px solid #b7eb8f;\n  border-radius: 8px;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  box-shadow: 0 4px 12px rgba(82, 196, 26, 0.08);\n  animation: _ngcontent-%COMP%_slideInUp 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_slideInUp {\n  0% {\n    transform: translateY(10px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.success-banner[_ngcontent-%COMP%] {\n  background: #52c41a;\n  color: white;\n  border-radius: 4px;\n  padding: 6px 12px;\n  font-weight: 700;\n  font-size: 12px;\n  letter-spacing: 0.5px;\n  display: flex;\n  align-items: center;\n  box-shadow: 0 2px 4px rgba(82, 196, 26, 0.2);\n}\n.success-check-icon[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.matched-profile-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  background: white;\n  border: 1px solid #e8e8e8;\n  border-radius: 6px;\n  padding: 12px;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);\n}\n.profile-avatar-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  flex-shrink: 0;\n}\n.matched-profile-avatar[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid #52c41a;\n  box-shadow: 0 2px 6px rgba(82, 196, 26, 0.2);\n}\n.matched-profile-avatar-placeholder[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #52c41a,\n      #389e0d);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 18px;\n  box-shadow: 0 2px 6px rgba(82, 196, 26, 0.2);\n}\n.profile-details-text[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.matched-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 15px;\n  color: #262626;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.matched-email[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #8c8c8c;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  margin-top: 1px;\n}\n.matched-meta[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.matched-timestamp[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  color: #8c8c8c;\n}\n.stats-panel[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid #e8e8e8;\n  border-radius: 6px;\n  padding: 12px;\n}\n.stat-progress-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.stat-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 11.5px;\n  color: #595959;\n}\n.stat-number[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 12px;\n}\n.text-green[_ngcontent-%COMP%] {\n  color: #52c41a;\n}\n.text-blue[_ngcontent-%COMP%] {\n  color: #1890ff;\n}\n.progress-bar-track[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 6px;\n  background: #f0f0f0;\n  border-radius: 3px;\n  overflow: hidden;\n}\n.progress-bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 3px;\n  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.green-fill[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      to right,\n      #73d13d,\n      #52c41a);\n}\n.blue-fill[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      to right,\n      #40a9ff,\n      #1890ff);\n}\n.history-section[_ngcontent-%COMP%] {\n  background: #ffffff;\n  border: 1px solid #f0f0f0;\n  border-radius: 12px;\n  padding: 16px 20px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);\n  margin-top: 4px;\n}\n.history-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 12px;\n  border-bottom: 1px solid #f0f0f0;\n  padding-bottom: 10px;\n}\n.history-title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 14px;\n  color: #1f1f1f;\n}\n.history-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.history-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: #fafafa;\n  border: 1.5px solid #f0f0f0;\n  border-radius: 8px;\n  padding: 8px 12px;\n  transition: all 0.2s ease;\n}\n.history-item.history-matched[_ngcontent-%COMP%] {\n  border-color: #b7eb8f;\n  background: #f6ffed;\n}\n.history-item.history-unmatched[_ngcontent-%COMP%] {\n  border-color: #ffccc7;\n  background: #fff1f0;\n}\n.history-index[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: #8c8c8c;\n  width: 22px;\n  flex-shrink: 0;\n}\n.history-thumbnail[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 6px;\n  overflow: hidden;\n  background: #f0f0f0;\n  border: 1px solid #d9d9d9;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.history-thumb-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.history-profile[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.history-avatar-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.history-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 1.5px solid #52c41a;\n  flex-shrink: 0;\n}\n.history-avatar-placeholder[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #52c41a,\n      #389e0d);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 13px;\n  flex-shrink: 0;\n}\n.history-name-block[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n.history-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 12.5px;\n  color: #262626;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.history-email[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  color: #8c8c8c;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.history-no-match[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.history-metrics[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.history-time[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #bfbfbf;\n  font-family: monospace;\n}\n/*# sourceMappingURL=camera.component.css.map */"] });
var CameraComponent = _CameraComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CameraComponent, [{
    type: Component,
    args: [{ selector: "tot-nhan-dien-camera", standalone: true, imports: [
      CommonModule,
      FormsModule,
      NzButtonModule,
      NzCardModule,
      NzTagModule,
      NzSpinModule,
      NzSliderModule,
      NzInputNumberModule,
      NzIconModule,
      NzDividerModule,
      NzAlertModule,
      NzBadgeModule,
      TotButtonComponent,
      DatePipe
    ], template: `<div class="camera-recognition-page">
  
  <!-- Loading state when loading model -->
  <div *ngIf="loadingDetector" class="MP-loading-overlay">
    <nz-spin nzSimple nzSize="large"></nz-spin>
    <div class="loading-text">\u0110ang n\u1EA1p m\xF4 h\xECnh nh\u1EADn d\u1EA1ng khu\xF4n m\u1EB7t MediaPipe (BlazeFace)...</div>
  </div>

  <div *ngIf="!loadingDetector" class="recognition-grid">
    
    <!-- LEFT PANEL: Webcam Stream & Alignment Preview -->
    <div class="viewport-card">
      <div class="viewport-header">
        <span nz-icon nzType="video-camera" style="color: #1890ff; font-size: 18px;"></span>
        <span class="header-title">&nbsp; Live Camera Scanner</span>
        <span *ngIf="isScanning" class="status-dot pulsing-green" nz-tooltip nzTooltipTitle="\u0110ang ho\u1EA1t \u0111\u1ED9ng qu\xE9t li\xEAn t\u1EE5c"></span>
        <span *ngIf="!isScanning" class="status-dot dot-yellow" nz-tooltip nzTooltipTitle="\u0110\xE3 t\u1EA1m d\u1EEBng"></span>
      </div>

      <div class="camera-viewport-container">
        <!-- Live Webcam Video Stream -->
        <video #videoElement autoplay playsinline muted class="webcam-feed" [class.inactive]="!cameraActive"></video>

        <!-- Canvas overlay for drawing Bounding Box targeting brackets -->
        <canvas #canvasOverlay class="canvas-overlay"></canvas>

        <!-- Webcam error / permissions overlay -->
        <div *ngIf="cameraError" class="camera-error-overlay">
          <span nz-icon nzType="warning" style="font-size: 42px; color: #ff4d4f;"></span>
          <div class="error-msg">{{ cameraError }}</div>
          <button nz-button nzType="primary" (click)="startCamera()" style="margin-top: 12px;">Th\u1EED l\u1EA1i</button>
        </div>

        <!-- Scanning scanline sweep effect -->
        <div *ngIf="cameraActive && isScanning" class="scanline-sweep"></div>
      </div>

      <!-- Live Controls row directly under the stream -->
      <div class="viewport-controls">
        <button
          nz-button
          [nzType]="isScanning ? 'default' : 'primary'"
          [nzDanger]="isScanning"
          (click)="toggleScanning()"
          [disabled]="!cameraActive"
          style="width: 140px;">
          <span nz-icon [nzType]="isScanning ? 'pause-circle' : 'play-circle'"></span>
          {{ isScanning ? 'T\u1EA1m d\u1EEBng' : 'B\u1EAFt \u0111\u1EA7u qu\xE9t' }}
        </button>

        <button
          nz-button
          nzType="default"
          (click)="cameraActive ? stopCamera() : startCamera()"
          style="margin-left: 12px;">
          <span nz-icon [nzType]="cameraActive ? 'poweroff' : 'reload'"></span>
          {{ cameraActive ? 'T\u1EAFt camera' : 'M\u1EDF camera' }}
        </button>
      </div>

      <!-- Hidden canvas used for face crop alignment -->
      <canvas #alignedCanvas style="display: none;"></canvas>

      <!-- Miniature aligned crop view -->
      <div class="aligned-face-preview-section">
        <div class="preview-title">Khung c\u0103n ch\u1EC9nh Affine (MediaPipe 112x112):</div>
        <div class="preview-box">
          <div *ngIf="!alignedPreviewUrl" class="no-preview-thumbnail">
            <span nz-icon nzType="scan" style="font-size: 20px; color: #ccc;"></span>
          </div>
          <img *ngIf="alignedPreviewUrl" [src]="alignedPreviewUrl" class="face-crop-img" alt="Aligned Crop" />
          <div class="preview-status" *ngIf="isComparing">
            <nz-spin nzSimple nzSize="small"></nz-spin>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT PANEL: Settings & Face Comparison Match Results -->
    <div class="results-card">
      <div class="results-header">
        <span nz-icon nzType="security-scan" style="color: #1890ff; font-size: 18px;"></span>
        <span class="header-title">&nbsp; K\u1EBFt Qu\u1EA3 Nh\u1EADn D\u1EA1ng (HNSW)</span>
      </div>

      <!-- Cosine Similarity Threshold Slider -->
      <div class="threshold-panel-container">
        <div class="slider-label">
          <span>Ng\u01B0\u1EE1ng nh\u1EADn d\u1EA1ng t\u1ED1i thi\u1EC3u (Cosine Similarity):</span>
          <strong class="threshold-val">{{ compareThreshold }}</strong>
        </div>
        <div class="slider-control-row">
          <nz-slider [nzMin]="0.3" [nzMax]="0.9" [nzStep]="0.01" [(ngModel)]="compareThreshold" style="flex: 1; margin-right: 12px;"></nz-slider>
          <nz-input-number [nzMin]="0.3" [nzMax]="0.9" [nzStep]="0.01" [(ngModel)]="compareThreshold" nzSize="small"></nz-input-number>
        </div>
      </div>

      <!-- Face Size (Width) Threshold Slider -->
      <div class="threshold-panel-container" style="margin-top: 10px;">
        <div class="slider-label">
          <span>K\xEDch th\u01B0\u1EDBc t\u1ED1i thi\u1EC3u khu\xF4n m\u1EB7t (px r\u1ED9ng, l\u1ECDc m\u1EB7t xa/nh\u1ECF):</span>
          <strong class="threshold-val">{{ minFaceWidthPx }}px</strong>
        </div>
        <div class="slider-control-row">
          <nz-slider [nzMin]="20" [nzMax]="300" [nzStep]="5" [(ngModel)]="minFaceWidthPx" style="flex: 1; margin-right: 12px;"></nz-slider>
          <nz-input-number [nzMin]="20" [nzMax]="300" [nzStep]="5" [(ngModel)]="minFaceWidthPx" nzSize="small"></nz-input-number>
        </div>
        <div style="font-size: 11px; color: #8c8c8c; margin-top: 4px;">\u{1F4A1} T\u0103ng ng\u01B0\u1EE1ng n\xE0y n\u1EBFu khung h\xECnh c\xF3 nhi\u1EC1u ng\u01B0\u1EDDi \u2014 ch\u1EC9 nh\u1EADn d\u1EA1ng khu\xF4n m\u1EB7t \u0111\u1EE7 g\u1EA7n.</div>
      </div>

      <nz-divider></nz-divider>

      <!-- DYNAMIC STATE MATCH CARDS -->
      <div class="state-container">
        
        <!-- Comparing Loading state -->
        <div *ngIf="isComparing" class="scanning-state-card active-eval">
          <nz-spin nzSimple nzSize="large"></nz-spin>
          <div class="state-title pulsing-text">\u0110ang so kh\u1EDBp vector \u0111\u1EB7c tr\u01B0ng...</div>
          <div class="state-hint">\u0110ang so s\xE1nh embedding 512-chi\u1EC1u v\u1EDBi PostgreSQL HNSW</div>
        </div>

        <!-- No face detected in webcam view -->
        <div *ngIf="noFaceDetected && !isComparing" class="scanning-state-card">
          <span nz-icon nzType="user" class="state-icon gray-pulse"></span>
          <div class="state-title">\u0110ang qu\xE9t t\xECm khu\xF4n m\u1EB7t...</div>
          <div class="state-hint">Vui l\xF2ng \u0111\u1EE9ng th\u1EB3ng tr\u01B0\u1EDBc camera \u0111\u1EC3 b\u1EAFt \u0111\u1EA7u \u0111\u1ED1i s\xE1nh t\u1EF1 \u0111\u1ED9ng.</div>
        </div>

        <!-- Face detected but too small/far (below minFaceWidthPx) -->
        <div *ngIf="faceTooSmall && !noFaceDetected && !isComparing" class="scanning-state-card">
          <span nz-icon nzType="shrink" class="state-icon" style="color: #faad14;"></span>
          <div class="state-title" style="color: #d46b08;">Khu\xF4n m\u1EB7t qu\xE1 nh\u1ECF ho\u1EB7c qu\xE1 xa!</div>
          <div class="state-hint">Khu\xF4n m\u1EB7t ph\xE1t hi\u1EC7n \u0111\u01B0\u1EE3c nh\u1ECF h\u01A1n ng\u01B0\u1EE1ng {{ minFaceWidthPx }}px. H\xE3y l\u1EA1i g\u1EA7n camera h\u01A1n ho\u1EB7c h\u1EA1 th\u1EA5p ng\u01B0\u1EE1ng k\xEDch th\u01B0\u1EDBc.</div>
        </div>

        <!-- Face detected but similarity score falls below required threshold -->
        <div *ngIf="belowThreshold && !noFaceDetected && !isComparing" class="scanning-state-card alert-fail">
          <span nz-icon nzType="warning" class="state-icon text-red shadow-pulse"></span>
          <div class="state-title text-red">Khu\xF4n m\u1EB7t ch\u01B0a \u0111\u01B0\u1EE3c \u0111\u0103ng k\xFD!</div>
          <div class="state-hint">\u0110\u1ED9 t\u01B0\u01A1ng \u0111\u1ED3ng l\u1EDBn nh\u1EA5t t\xECm th\u1EA5y d\u01B0\u1EDBi ng\u01B0\u1EE1ng t\u1ED1i thi\u1EC3u {{ compareThreshold }}.</div>
          
          <div *ngIf="compareResults?.bestMatch" class="failed-best-match-snippet">
            <span nz-icon nzType="info-circle"></span>&nbsp; G\u1EE3i \xFD: G\u1EA7n gi\u1ED1ng nh\u1EA5t v\u1EDBi 
            <strong>{{ compareResults.bestMatch.displayName || compareResults.bestMatch.username }}</strong> 
            ({{ compareResults.bestMatch.cosineSimilarity | number:'1.2-2' }}). H\xE3y h\u1EA1 th\u1EA5p ng\u01B0\u1EE1ng so s\xE1nh n\u1EBFu mu\u1ED1n ki\u1EC3m tra.
          </div>
        </div>

        <!-- Successful Match found! -->
        <div *ngIf="bestMatchUser && !noFaceDetected && !isComparing" class="match-success-card">
          <div class="success-banner">
            <span nz-icon nzType="check-circle" nzTheme="fill" class="success-check-icon"></span>
            <span>&nbsp; X\xC1C TH\u1EF0C TH\xC0NH C\xD4NG!</span>
          </div>

          <!-- Premium Matched Profile details -->
          <div class="matched-profile-content">
            <div class="profile-avatar-wrapper">
              <img *ngIf="bestMatchUser.avatarUrl" [src]="bestMatchUser.avatarUrl" class="matched-profile-avatar" alt="avatar" />
              <div *ngIf="!bestMatchUser.avatarUrl" class="matched-profile-avatar-placeholder">
                {{ (bestMatchUser.displayName || bestMatchUser.username || 'U').charAt(0).toUpperCase() }}
              </div>
            </div>

            <div class="profile-details-text">
              <div class="matched-name">{{ bestMatchUser.displayName || bestMatchUser.username }}</div>
              <div class="matched-email">{{ bestMatchUser.email }}</div>
              <div class="matched-meta">
                <nz-tag nzColor="success">\u0110\xE3 \u0110\u0103ng K\xFD</nz-tag>
                <span class="matched-timestamp">\u0110\xE3 kh\u1EDBp: {{ scanRateMs }}ms</span>
              </div>
            </div>
          </div>

          <!-- Matching stats progress bars -->
          <div class="stats-panel">
            <div class="stat-progress-item">
              <div class="stat-header">
                <span>\u0110\u1ED9 t\u01B0\u01A1ng \u0111\u1ED3ng (Cosine Similarity):</span>
                <strong class="stat-number text-green">{{ bestMatchUser.cosineSimilarity | number:'1.4-4' }}</strong>
              </div>
              <div class="progress-bar-track">
                <div class="progress-bar-fill green-fill" [style.width.%]="bestMatchUser.cosineSimilarity * 100"></div>
              </div>
            </div>

            <div class="stat-progress-item" style="margin-top: 12px;">
              <div class="stat-header">
                <span>Kho\u1EA3ng c\xE1ch L2 (Euclidean Distance):</span>
                <strong class="stat-number text-blue">{{ bestMatchUser.l2Distance | number:'1.4-4' }}</strong>
              </div>
              <div class="progress-bar-track">
                <!-- Euclidean distance max is 2.0 (for unit vectors), lower is closer. Show reverse bar. -->
                <div class="progress-bar-fill blue-fill" [style.width.%]="(2.0 - bestMatchUser.l2Distance) * 50"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Waiting state / initial state -->
        <div *ngIf="!cameraActive && !loadingDetector" class="scanning-state-card">
          <span nz-icon nzType="video-camera" class="state-icon icon-blue"></span>
          <div class="state-title">Camera Ch\u01B0a K\xEDch Ho\u1EA1t</div>
          <div class="state-hint">Nh\u1EA5p v\xE0o "M\u1EDF camera" \u1EDF b\u1EA3ng b\xEAn tr\xE1i \u0111\u1EC3 kh\u1EDFi \u0111\u1ED9ng qu\xE9t \u0111\u1ED1i s\xE1nh khu\xF4n m\u1EB7t.</div>
        </div>

      </div>

    </div>

  </div>

  <!-- RECOGNITION HISTORY SECTION (5 k\u1EBFt qu\u1EA3 g\u1EA7n nh\u1EA5t) -->
  <div *ngIf="recognitionHistory.length > 0" class="history-section">
    <div class="history-header">
      <span nz-icon nzType="history" style="color: #722ed1; font-size: 16px;"></span>
      <span class="history-title">&nbsp; L\u1ECBch S\u1EED Nh\u1EADn Di\u1EC7n <nz-badge [nzCount]="recognitionHistory.length" nzColor="#722ed1" style="margin-left:6px;"></nz-badge></span>
      <button nz-button nzType="text" nzSize="small" (click)="clearHistory()" style="margin-left: auto; color: #8c8c8c; font-size: 11px;">
        <span nz-icon nzType="delete"></span> X\xF3a l\u1ECBch s\u1EED
      </button>
    </div>

    <div class="history-list">
      <div *ngFor="let entry of recognitionHistory; let i = index" class="history-item" [class.history-matched]="entry.matched" [class.history-unmatched]="!entry.matched">
        <!-- Index badge -->
        <div class="history-index">#{{ i + 1 }}</div>

        <!-- Face snapshot thumbnail -->
        <div class="history-thumbnail">
          <img *ngIf="entry.previewUrl" [src]="entry.previewUrl" alt="Face snap" class="history-thumb-img" />
          <span *ngIf="!entry.previewUrl" nz-icon nzType="scan" style="font-size: 18px; color: #ccc;"></span>
        </div>

        <!-- Match result: avatar + name -->
        <div class="history-profile">
          <div *ngIf="entry.matched">
            <div class="history-avatar-row">
              <img *ngIf="entry.avatarUrl" [src]="entry.avatarUrl" class="history-avatar" alt="avatar" />
              <div *ngIf="!entry.avatarUrl" class="history-avatar-placeholder">{{ (entry.displayName || 'U').charAt(0).toUpperCase() }}</div>
              <div class="history-name-block">
                <div class="history-name">{{ entry.displayName }}</div>
                <div class="history-email">{{ entry.email }}</div>
              </div>
            </div>
          </div>
          <div *ngIf="!entry.matched" class="history-no-match">
            <span nz-icon nzType="stop" style="color: #ff4d4f; font-size: 14px;"></span>
            <span style="margin-left: 6px; font-size: 12px; color: #ff4d4f; font-weight: 600;">Kh\xF4ng kh\u1EDBp</span>
          </div>
        </div>

        <!-- Metrics -->
        <div class="history-metrics">
          <div *ngIf="entry.matched">
            <nz-tag nzColor="success" style="font-size: 10.5px;">{{ entry.cosineSimilarity | number:'1.3-3' }}</nz-tag>
          </div>
          <div class="history-time">{{ entry.timestamp | date:'HH:mm:ss' }}</div>
        </div>
      </div>
    </div>
  </div>

</div>
`, styles: ["/* projects/tot/nhan-dien-khuon-mat/src/lib/camera/camera.component.css */\n.camera-recognition-page {\n  padding: 24px;\n  max-width: 1100px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.MP-loading-overlay {\n  height: 400px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n  background: rgba(255, 255, 255, 0.8);\n  border: 1px solid #f0f0f0;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);\n}\n.loading-text {\n  font-weight: 600;\n  font-size: 14px;\n  color: #1890ff;\n  animation: MPpulse 1.8s ease-in-out infinite;\n}\n@keyframes MPpulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n.recognition-grid {\n  display: grid;\n  grid-template-columns: 1.1fr 0.9fr;\n  gap: 24px;\n  align-items: start;\n}\n@media (max-width: 800px) {\n  .recognition-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.viewport-card,\n.results-card {\n  background: #ffffff;\n  border: 1px solid #f0f0f0;\n  border-radius: 12px;\n  padding: 20px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.viewport-header,\n.results-header {\n  display: flex;\n  align-items: center;\n  border-bottom: 1px solid #f0f0f0;\n  padding-bottom: 12px;\n  margin-bottom: 4px;\n}\n.header-title {\n  font-weight: 700;\n  font-size: 15px;\n  color: #1f1f1f;\n  flex: 1;\n}\n.status-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  margin-left: 8px;\n}\n.pulsing-green {\n  background: #52c41a;\n  box-shadow: 0 0 0 0 rgba(82, 196, 26, 0.7);\n  animation: greenPulse 1.6s infinite;\n}\n.dot-yellow {\n  background: #faad14;\n}\n@keyframes greenPulse {\n  0% {\n    transform: scale(0.95);\n    box-shadow: 0 0 0 0 rgba(82, 196, 26, 0.7);\n  }\n  70% {\n    transform: scale(1);\n    box-shadow: 0 0 0 6px rgba(82, 196, 26, 0);\n  }\n  100% {\n    transform: scale(0.95);\n    box-shadow: 0 0 0 0 rgba(82, 196, 26, 0);\n  }\n}\n.camera-viewport-container {\n  position: relative;\n  width: 100%;\n  aspect-ratio: 4 / 3;\n  background: #141414;\n  border-radius: 8px;\n  overflow: hidden;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);\n}\n.webcam-feed {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transform: scaleX(-1);\n  transition: opacity 0.3s ease;\n}\n.webcam-feed.inactive {\n  opacity: 0.1;\n}\n.canvas-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  transform: scaleX(-1);\n}\n.camera-error-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(255, 255, 255, 0.95);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 24px;\n  text-align: center;\n}\n.error-msg {\n  margin-top: 12px;\n  font-weight: 500;\n  color: #ff4d4f;\n  font-size: 13px;\n  max-width: 320px;\n}\n.scanline-sweep {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 3px;\n  background:\n    linear-gradient(\n      to bottom,\n      rgba(24, 144, 255, 0),\n      #1890ff,\n      rgba(24, 144, 255, 0));\n  box-shadow: 0 0 8px #1890ff;\n  animation: sweepLine 3s linear infinite;\n  pointer-events: none;\n}\n@keyframes sweepLine {\n  0% {\n    top: 0%;\n  }\n  50% {\n    top: 100%;\n  }\n  100% {\n    top: 0%;\n  }\n}\n.viewport-controls {\n  display: flex;\n  align-items: center;\n  margin-top: 4px;\n}\n.aligned-face-preview-section {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  background: #fafafa;\n  border: 1px solid #f0f0f0;\n  border-radius: 8px;\n  padding: 10px 14px;\n  margin-top: 4px;\n}\n.preview-title {\n  font-size: 12px;\n  font-weight: 600;\n  color: #595959;\n}\n.preview-box {\n  position: relative;\n  width: 48px;\n  height: 48px;\n  border-radius: 4px;\n  overflow: hidden;\n  border: 1.5px solid #d9d9d9;\n  background: #fafafa;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  flex-shrink: 0;\n}\n.no-preview-thumbnail {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: #ccc;\n}\n.face-crop-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.preview-status {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(255, 255, 255, 0.7);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.threshold-panel-container {\n  background: #fafafa;\n  border: 1px solid #f0f0f0;\n  border-radius: 8px;\n  padding: 12px 14px;\n}\n.slider-label {\n  display: flex;\n  justify-content: space-between;\n  font-size: 12.5px;\n  color: #595959;\n  margin-bottom: 4px;\n}\n.threshold-val {\n  color: #1890ff;\n  font-weight: 700;\n  font-size: 13.5px;\n}\n.slider-control-row {\n  display: flex;\n  align-items: center;\n}\n.state-container {\n  min-height: 220px;\n  display: flex;\n  flex-direction: column;\n}\n.scanning-state-card {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  padding: 24px;\n  background: rgba(250, 250, 250, 0.6);\n  border: 1.5px dashed #d9d9d9;\n  border-radius: 8px;\n  transition: all 0.2s ease;\n}\n.scanning-state-card.active-eval {\n  background: rgba(230, 247, 255, 0.2);\n  border-color: #1890ff;\n  border-style: solid;\n}\n.scanning-state-card.alert-fail {\n  background: rgba(255, 241, 240, 0.6);\n  border-color: #ff4d4f;\n  border-style: solid;\n  box-shadow: 0 4px 12px rgba(255, 77, 79, 0.04);\n}\n.state-icon {\n  font-size: 38px;\n  margin-bottom: 12px;\n}\n.icon-blue {\n  color: #1890ff;\n}\n.text-red {\n  color: #ff4d4f;\n}\n.gray-pulse {\n  color: #bfbfbf;\n  animation: grayPulseKey 1.5s ease-in-out infinite;\n}\n@keyframes grayPulseKey {\n  0%, 100% {\n    transform: scale(1);\n    color: #bfbfbf;\n  }\n  50% {\n    transform: scale(1.1);\n    color: #1890ff;\n  }\n}\n.shadow-pulse {\n  animation: redWarningPulse 1.6s infinite;\n}\n@keyframes redWarningPulse {\n  0% {\n    transform: scale(1);\n    filter: drop-shadow(0 0 0 rgba(255, 77, 79, 0.4));\n  }\n  50% {\n    transform: scale(1.1);\n    filter: drop-shadow(0 0 6px rgba(255, 77, 79, 0.6));\n  }\n  100% {\n    transform: scale(1);\n    filter: drop-shadow(0 0 0 rgba(255, 77, 79, 0));\n  }\n}\n.state-title {\n  font-weight: 700;\n  font-size: 14.5px;\n  color: #262626;\n  margin-bottom: 4px;\n}\n.state-hint {\n  font-size: 12px;\n  color: #8c8c8c;\n  max-width: 250px;\n  line-height: 1.5;\n}\n.pulsing-text {\n  color: #1890ff;\n  animation: pulseScan 1.2s ease-in-out infinite;\n}\n@keyframes pulseScan {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n.failed-best-match-snippet {\n  margin-top: 14px;\n  background: #ffffff;\n  border: 1.5px solid #ffccc7;\n  border-radius: 6px;\n  padding: 8px 10px;\n  font-size: 11.5px;\n  color: #595959;\n  line-height: 1.5;\n}\n.match-success-card {\n  flex: 1;\n  background: #f6ffed;\n  border: 1.5px solid #b7eb8f;\n  border-radius: 8px;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  box-shadow: 0 4px 12px rgba(82, 196, 26, 0.08);\n  animation: slideInUp 0.3s ease;\n}\n@keyframes slideInUp {\n  0% {\n    transform: translateY(10px);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.success-banner {\n  background: #52c41a;\n  color: white;\n  border-radius: 4px;\n  padding: 6px 12px;\n  font-weight: 700;\n  font-size: 12px;\n  letter-spacing: 0.5px;\n  display: flex;\n  align-items: center;\n  box-shadow: 0 2px 4px rgba(82, 196, 26, 0.2);\n}\n.success-check-icon {\n  font-size: 15px;\n}\n.matched-profile-content {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  background: white;\n  border: 1px solid #e8e8e8;\n  border-radius: 6px;\n  padding: 12px;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);\n}\n.profile-avatar-wrapper {\n  position: relative;\n  flex-shrink: 0;\n}\n.matched-profile-avatar {\n  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 2px solid #52c41a;\n  box-shadow: 0 2px 6px rgba(82, 196, 26, 0.2);\n}\n.matched-profile-avatar-placeholder {\n  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #52c41a,\n      #389e0d);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 18px;\n  box-shadow: 0 2px 6px rgba(82, 196, 26, 0.2);\n}\n.profile-details-text {\n  flex: 1;\n  min-width: 0;\n}\n.matched-name {\n  font-weight: 700;\n  font-size: 15px;\n  color: #262626;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.matched-email {\n  font-size: 12px;\n  color: #8c8c8c;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  margin-top: 1px;\n}\n.matched-meta {\n  margin-top: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.matched-timestamp {\n  font-size: 10.5px;\n  color: #8c8c8c;\n}\n.stats-panel {\n  background: white;\n  border: 1px solid #e8e8e8;\n  border-radius: 6px;\n  padding: 12px;\n}\n.stat-progress-item {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.stat-header {\n  display: flex;\n  justify-content: space-between;\n  font-size: 11.5px;\n  color: #595959;\n}\n.stat-number {\n  font-weight: 700;\n  font-size: 12px;\n}\n.text-green {\n  color: #52c41a;\n}\n.text-blue {\n  color: #1890ff;\n}\n.progress-bar-track {\n  width: 100%;\n  height: 6px;\n  background: #f0f0f0;\n  border-radius: 3px;\n  overflow: hidden;\n}\n.progress-bar-fill {\n  height: 100%;\n  border-radius: 3px;\n  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.green-fill {\n  background:\n    linear-gradient(\n      to right,\n      #73d13d,\n      #52c41a);\n}\n.blue-fill {\n  background:\n    linear-gradient(\n      to right,\n      #40a9ff,\n      #1890ff);\n}\n.history-section {\n  background: #ffffff;\n  border: 1px solid #f0f0f0;\n  border-radius: 12px;\n  padding: 16px 20px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);\n  margin-top: 4px;\n}\n.history-header {\n  display: flex;\n  align-items: center;\n  margin-bottom: 12px;\n  border-bottom: 1px solid #f0f0f0;\n  padding-bottom: 10px;\n}\n.history-title {\n  font-weight: 700;\n  font-size: 14px;\n  color: #1f1f1f;\n}\n.history-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.history-item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: #fafafa;\n  border: 1.5px solid #f0f0f0;\n  border-radius: 8px;\n  padding: 8px 12px;\n  transition: all 0.2s ease;\n}\n.history-item.history-matched {\n  border-color: #b7eb8f;\n  background: #f6ffed;\n}\n.history-item.history-unmatched {\n  border-color: #ffccc7;\n  background: #fff1f0;\n}\n.history-index {\n  font-size: 11px;\n  font-weight: 700;\n  color: #8c8c8c;\n  width: 22px;\n  flex-shrink: 0;\n}\n.history-thumbnail {\n  width: 44px;\n  height: 44px;\n  border-radius: 6px;\n  overflow: hidden;\n  background: #f0f0f0;\n  border: 1px solid #d9d9d9;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.history-thumb-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.history-profile {\n  flex: 1;\n  min-width: 0;\n}\n.history-avatar-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.history-avatar {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  object-fit: cover;\n  border: 1.5px solid #52c41a;\n  flex-shrink: 0;\n}\n.history-avatar-placeholder {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      #52c41a,\n      #389e0d);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 13px;\n  flex-shrink: 0;\n}\n.history-name-block {\n  min-width: 0;\n}\n.history-name {\n  font-weight: 600;\n  font-size: 12.5px;\n  color: #262626;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.history-email {\n  font-size: 10.5px;\n  color: #8c8c8c;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.history-no-match {\n  display: flex;\n  align-items: center;\n}\n.history-metrics {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.history-time {\n  font-size: 10px;\n  color: #bfbfbf;\n  font-family: monospace;\n}\n/*# sourceMappingURL=camera.component.css.map */\n"] }]
  }], null, { videoElement: [{
    type: ViewChild,
    args: ["videoElement"]
  }], canvasOverlay: [{
    type: ViewChild,
    args: ["canvasOverlay"]
  }], alignedCanvas: [{
    type: ViewChild,
    args: ["alignedCanvas"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CameraComponent, { className: "CameraComponent", filePath: "projects/tot/nhan-dien-khuon-mat/src/lib/camera/camera.component.ts", lineNumber: 40 });
})();

export {
  provideNhanDienKhuonMat,
  NhanDienKhuonMatService,
  NhanDienKhuonMatComponent,
  TrainingComponent,
  CameraComponent
};
//# sourceMappingURL=chunk-MTJVVLV7.js.map
