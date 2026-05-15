import {
  Directionality,
  NzIconDirective,
  NzIconModule,
  isPresetColor,
  isStatusColor,
  presetColors,
  statusColors,
  takeUntilDestroyed
} from "./chunk-BV7BATNO.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  Renderer2,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp
} from "./chunk-2BQMWOA2.js";
import {
  __publicField
} from "./chunk-MYGOUE3E.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-tag.mjs
var _c0 = ["*"];
function NzTagComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-icon", 1);
    \u0275\u0275listener("click", function NzTagComponent_Conditional_1_Template_nz_icon_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeTag($event));
    });
    \u0275\u0275elementEnd();
  }
}
var _NzTagComponent = class _NzTagComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "renderer", inject(Renderer2));
    __publicField(this, "el", inject(ElementRef).nativeElement);
    __publicField(this, "directionality", inject(Directionality));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "nzMode", "default");
    __publicField(this, "nzColor");
    __publicField(this, "nzChecked", false);
    __publicField(this, "nzBordered", true);
    __publicField(this, "nzOnClose", new EventEmitter());
    __publicField(this, "nzCheckedChange", new EventEmitter());
    __publicField(this, "dir", "ltr");
    __publicField(this, "isPresetColor", false);
  }
  updateCheckedStatus() {
    if (this.nzMode === "checkable") {
      this.nzChecked = !this.nzChecked;
      this.nzCheckedChange.emit(this.nzChecked);
    }
  }
  closeTag(e) {
    this.nzOnClose.emit(e);
    if (!e.defaultPrevented) {
      this.renderer.removeChild(this.renderer.parentNode(this.el), this.el);
    }
  }
  clearPresetColor() {
    const regexp = new RegExp(`(ant-tag-(?:${[...presetColors, ...statusColors].join("|")}))`, "g");
    const classname = this.el.classList.toString();
    const matches = [];
    let match = regexp.exec(classname);
    while (match !== null) {
      matches.push(match[1]);
      match = regexp.exec(classname);
    }
    this.el.classList.remove(...matches);
  }
  setPresetColor() {
    this.clearPresetColor();
    if (!this.nzColor) {
      this.isPresetColor = false;
    } else {
      this.isPresetColor = isPresetColor(this.nzColor) || isStatusColor(this.nzColor);
    }
    if (this.isPresetColor) {
      this.el.classList.add(`ant-tag-${this.nzColor}`);
    }
  }
  ngOnInit() {
    var _a;
    (_a = this.directionality.change) == null ? void 0 : _a.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
  }
  ngOnChanges(changes) {
    const {
      nzColor
    } = changes;
    if (nzColor) {
      this.setPresetColor();
    }
  }
};
__publicField(_NzTagComponent, "\u0275fac", function NzTagComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTagComponent)();
});
__publicField(_NzTagComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTagComponent,
  selectors: [["nz-tag"]],
  hostAttrs: [1, "ant-tag"],
  hostVars: 12,
  hostBindings: function NzTagComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("click", function NzTagComponent_click_HostBindingHandler() {
        return ctx.updateCheckedStatus();
      });
    }
    if (rf & 2) {
      \u0275\u0275styleProp("background-color", ctx.isPresetColor ? "" : ctx.nzColor);
      \u0275\u0275classProp("ant-tag-has-color", ctx.nzColor && !ctx.isPresetColor)("ant-tag-checkable", ctx.nzMode === "checkable")("ant-tag-checkable-checked", ctx.nzChecked)("ant-tag-rtl", ctx.dir === "rtl")("ant-tag-borderless", !ctx.nzBordered);
    }
  },
  inputs: {
    nzMode: "nzMode",
    nzColor: "nzColor",
    nzChecked: [2, "nzChecked", "nzChecked", booleanAttribute],
    nzBordered: [2, "nzBordered", "nzBordered", booleanAttribute]
  },
  outputs: {
    nzOnClose: "nzOnClose",
    nzCheckedChange: "nzCheckedChange"
  },
  exportAs: ["nzTag"],
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c0,
  decls: 2,
  vars: 1,
  consts: [["nzType", "close", "tabindex", "-1", 1, "ant-tag-close-icon"], ["nzType", "close", "tabindex", "-1", 1, "ant-tag-close-icon", 3, "click"]],
  template: function NzTagComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
      \u0275\u0275conditionalCreate(1, NzTagComponent_Conditional_1_Template, 1, 0, "nz-icon", 0);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzMode === "closeable" ? 1 : -1);
    }
  },
  dependencies: [NzIconModule, NzIconDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTagComponent = _NzTagComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTagComponent, [{
    type: Component,
    args: [{
      selector: "nz-tag",
      exportAs: "nzTag",
      template: `
    <ng-content />
    @if (nzMode === 'closeable') {
      <nz-icon nzType="close" class="ant-tag-close-icon" tabindex="-1" (click)="closeTag($event)" />
    }
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        class: "ant-tag",
        "[style.background-color]": `isPresetColor ? '' : nzColor`,
        "[class.ant-tag-has-color]": `nzColor && !isPresetColor`,
        "[class.ant-tag-checkable]": `nzMode === 'checkable'`,
        "[class.ant-tag-checkable-checked]": `nzChecked`,
        "[class.ant-tag-rtl]": `dir === 'rtl'`,
        "[class.ant-tag-borderless]": `!nzBordered`,
        "(click)": "updateCheckedStatus()"
      },
      imports: [NzIconModule]
    }]
  }], null, {
    nzMode: [{
      type: Input
    }],
    nzColor: [{
      type: Input
    }],
    nzChecked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzBordered: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOnClose: [{
      type: Output
    }],
    nzCheckedChange: [{
      type: Output
    }]
  });
})();
var _NzTagModule = class _NzTagModule {
};
__publicField(_NzTagModule, "\u0275fac", function NzTagModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTagModule)();
});
__publicField(_NzTagModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzTagModule,
  imports: [NzTagComponent],
  exports: [NzTagComponent]
}));
__publicField(_NzTagModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzTagComponent]
}));
var NzTagModule = _NzTagModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTagModule, [{
    type: NgModule,
    args: [{
      imports: [NzTagComponent],
      exports: [NzTagComponent]
    }]
  }], null, null);
})();

export {
  NzTagComponent,
  NzTagModule
};
//# sourceMappingURL=chunk-GVGPR4NJ.js.map
