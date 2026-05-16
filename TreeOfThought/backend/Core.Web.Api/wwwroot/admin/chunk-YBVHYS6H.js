import {
  BidiModule,
  Directionality,
  NgTemplateOutlet,
  NzOutletModule,
  NzStringTemplateOutletDirective,
  WithConfig,
  onConfigChangeEventForComponent,
  takeUntilDestroyed,
  toCssPixel
} from "./chunk-BGEVR36A.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DestroyRef,
  Directive,
  Input,
  NgModule,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  booleanAttribute,
  inject,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomTemplate,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-ZYJZNBYG.js";
import {
  __publicField,
  __spreadValues
} from "./chunk-MYGOUE3E.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-skeleton.mjs
var _c0 = ["nzType", "button"];
var _c1 = ["nzType", "avatar"];
var _c2 = ["nzType", "input"];
var _c3 = ["nzType", "image"];
var _c4 = ["*"];
function NzSkeletonComponent_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "nz-skeleton-element", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzSize", ctx_r0.avatar.size || "default")("nzShape", ctx_r0.avatar.shape || "circle");
  }
}
function NzSkeletonComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "h3", 5);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("width", ctx_r0.toCSSUnit(ctx_r0.title.width));
  }
}
function NzSkeletonComponent_Conditional_0_Conditional_3_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "li");
  }
  if (rf & 2) {
    const $index_r2 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275styleProp("width", ctx_r0.toCSSUnit(ctx_r0.widthList[$index_r2]));
  }
}
function NzSkeletonComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 3);
    \u0275\u0275repeaterCreate(1, NzSkeletonComponent_Conditional_0_Conditional_3_For_2_Template, 1, 2, "li", 6, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.rowsList);
  }
}
function NzSkeletonComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzSkeletonComponent_Conditional_0_Conditional_0_Template, 2, 2, "div", 0);
    \u0275\u0275elementStart(1, "div", 1);
    \u0275\u0275conditionalCreate(2, NzSkeletonComponent_Conditional_0_Conditional_2_Template, 1, 2, "h3", 2);
    \u0275\u0275conditionalCreate(3, NzSkeletonComponent_Conditional_0_Conditional_3_Template, 3, 0, "ul", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!!ctx_r0.nzAvatar ? 0 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!!ctx_r0.nzTitle ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!!ctx_r0.nzParagraph ? 3 : -1);
  }
}
function NzSkeletonComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
var _NzSkeletonElementDirective = class _NzSkeletonElementDirective {
  constructor() {
    __publicField(this, "nzActive", false);
    __publicField(this, "nzType");
    __publicField(this, "nzBlock", false);
  }
};
__publicField(_NzSkeletonElementDirective, "\u0275fac", function NzSkeletonElementDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSkeletonElementDirective)();
});
__publicField(_NzSkeletonElementDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzSkeletonElementDirective,
  selectors: [["nz-skeleton-element"]],
  hostAttrs: [1, "ant-skeleton", "ant-skeleton-element"],
  hostVars: 4,
  hostBindings: function NzSkeletonElementDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-skeleton-active", ctx.nzActive)("ant-skeleton-block", ctx.nzBlock);
    }
  },
  inputs: {
    nzActive: [2, "nzActive", "nzActive", booleanAttribute],
    nzType: "nzType",
    nzBlock: [2, "nzBlock", "nzBlock", booleanAttribute]
  }
}));
var NzSkeletonElementDirective = _NzSkeletonElementDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSkeletonElementDirective, [{
    type: Directive,
    args: [{
      selector: "nz-skeleton-element",
      host: {
        class: "ant-skeleton ant-skeleton-element",
        "[class.ant-skeleton-active]": "nzActive",
        "[class.ant-skeleton-block]": "nzBlock"
      }
    }]
  }], null, {
    nzActive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzType: [{
      type: Input
    }],
    nzBlock: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzSkeletonElementButtonComponent = class _NzSkeletonElementButtonComponent {
  constructor() {
    __publicField(this, "nzShape", "default");
    __publicField(this, "nzSize", "default");
  }
};
__publicField(_NzSkeletonElementButtonComponent, "\u0275fac", function NzSkeletonElementButtonComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSkeletonElementButtonComponent)();
});
__publicField(_NzSkeletonElementButtonComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSkeletonElementButtonComponent,
  selectors: [["nz-skeleton-element", "nzType", "button"]],
  inputs: {
    nzShape: "nzShape",
    nzSize: "nzSize"
  },
  attrs: _c0,
  decls: 1,
  vars: 10,
  consts: [[1, "ant-skeleton-button"]],
  template: function NzSkeletonElementButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElement(0, "span", 0);
    }
    if (rf & 2) {
      \u0275\u0275classProp("ant-skeleton-button-square", ctx.nzShape === "square")("ant-skeleton-button-round", ctx.nzShape === "round")("ant-skeleton-button-circle", ctx.nzShape === "circle")("ant-skeleton-button-lg", ctx.nzSize === "large")("ant-skeleton-button-sm", ctx.nzSize === "small");
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzSkeletonElementButtonComponent = _NzSkeletonElementButtonComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSkeletonElementButtonComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: 'nz-skeleton-element[nzType="button"]',
      template: `
    <span
      class="ant-skeleton-button"
      [class.ant-skeleton-button-square]="nzShape === 'square'"
      [class.ant-skeleton-button-round]="nzShape === 'round'"
      [class.ant-skeleton-button-circle]="nzShape === 'circle'"
      [class.ant-skeleton-button-lg]="nzSize === 'large'"
      [class.ant-skeleton-button-sm]="nzSize === 'small'"
    ></span>
  `
    }]
  }], null, {
    nzShape: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }]
  });
})();
var _NzSkeletonElementAvatarComponent = class _NzSkeletonElementAvatarComponent {
  constructor() {
    __publicField(this, "nzShape", "circle");
    __publicField(this, "nzSize", "default");
    __publicField(this, "styleMap", {});
  }
  ngOnChanges(changes) {
    if (changes.nzSize && typeof this.nzSize === "number") {
      const sideLength = `${this.nzSize}px`;
      this.styleMap = {
        width: sideLength,
        height: sideLength,
        "line-height": sideLength
      };
    } else {
      this.styleMap = {};
    }
  }
};
__publicField(_NzSkeletonElementAvatarComponent, "\u0275fac", function NzSkeletonElementAvatarComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSkeletonElementAvatarComponent)();
});
__publicField(_NzSkeletonElementAvatarComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSkeletonElementAvatarComponent,
  selectors: [["nz-skeleton-element", "nzType", "avatar"]],
  inputs: {
    nzShape: "nzShape",
    nzSize: "nzSize"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  attrs: _c1,
  decls: 1,
  vars: 10,
  consts: [[1, "ant-skeleton-avatar"]],
  template: function NzSkeletonElementAvatarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElement(0, "span", 0);
    }
    if (rf & 2) {
      \u0275\u0275styleMap(ctx.styleMap);
      \u0275\u0275classProp("ant-skeleton-avatar-square", ctx.nzShape === "square")("ant-skeleton-avatar-circle", ctx.nzShape === "circle")("ant-skeleton-avatar-lg", ctx.nzSize === "large")("ant-skeleton-avatar-sm", ctx.nzSize === "small");
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzSkeletonElementAvatarComponent = _NzSkeletonElementAvatarComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSkeletonElementAvatarComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: 'nz-skeleton-element[nzType="avatar"]',
      template: `
    <span
      class="ant-skeleton-avatar"
      [class.ant-skeleton-avatar-square]="nzShape === 'square'"
      [class.ant-skeleton-avatar-circle]="nzShape === 'circle'"
      [class.ant-skeleton-avatar-lg]="nzSize === 'large'"
      [class.ant-skeleton-avatar-sm]="nzSize === 'small'"
      [style]="styleMap"
    ></span>
  `
    }]
  }], null, {
    nzShape: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }]
  });
})();
var _NzSkeletonElementInputComponent = class _NzSkeletonElementInputComponent {
  constructor() {
    __publicField(this, "nzSize", "default");
  }
};
__publicField(_NzSkeletonElementInputComponent, "\u0275fac", function NzSkeletonElementInputComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSkeletonElementInputComponent)();
});
__publicField(_NzSkeletonElementInputComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSkeletonElementInputComponent,
  selectors: [["nz-skeleton-element", "nzType", "input"]],
  inputs: {
    nzSize: "nzSize"
  },
  attrs: _c2,
  decls: 1,
  vars: 4,
  consts: [[1, "ant-skeleton-input"]],
  template: function NzSkeletonElementInputComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElement(0, "span", 0);
    }
    if (rf & 2) {
      \u0275\u0275classProp("ant-skeleton-input-lg", ctx.nzSize === "large")("ant-skeleton-input-sm", ctx.nzSize === "small");
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzSkeletonElementInputComponent = _NzSkeletonElementInputComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSkeletonElementInputComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: 'nz-skeleton-element[nzType="input"]',
      template: `
    <span
      class="ant-skeleton-input"
      [class.ant-skeleton-input-lg]="nzSize === 'large'"
      [class.ant-skeleton-input-sm]="nzSize === 'small'"
    ></span>
  `
    }]
  }], null, {
    nzSize: [{
      type: Input
    }]
  });
})();
var _NzSkeletonElementImageComponent = class _NzSkeletonElementImageComponent {
};
__publicField(_NzSkeletonElementImageComponent, "\u0275fac", function NzSkeletonElementImageComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSkeletonElementImageComponent)();
});
__publicField(_NzSkeletonElementImageComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSkeletonElementImageComponent,
  selectors: [["nz-skeleton-element", "nzType", "image"]],
  attrs: _c3,
  decls: 3,
  vars: 0,
  consts: [[1, "ant-skeleton-image"], ["viewBox", "0 0 1098 1024", "xmlns", "http://www.w3.org/2000/svg", 1, "ant-skeleton-image-svg"], ["d", "M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z", 1, "ant-skeleton-image-path"]],
  template: function NzSkeletonElementImageComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "span", 0);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(1, "svg", 1);
      \u0275\u0275domElement(2, "path", 2);
      \u0275\u0275domElementEnd()();
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzSkeletonElementImageComponent = _NzSkeletonElementImageComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSkeletonElementImageComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: 'nz-skeleton-element[nzType="image"]',
      template: `
    <span class="ant-skeleton-image">
      <svg class="ant-skeleton-image-svg" viewBox="0 0 1098 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z"
          class="ant-skeleton-image-path"
        />
      </svg>
    </span>
  `
    }]
  }], null, null);
})();
var _NzSkeletonComponent = class _NzSkeletonComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "nzActive", false);
    __publicField(this, "nzLoading", true);
    __publicField(this, "nzRound", false);
    __publicField(this, "nzTitle", true);
    __publicField(this, "nzAvatar", false);
    __publicField(this, "nzParagraph", true);
    __publicField(this, "title");
    __publicField(this, "avatar");
    __publicField(this, "paragraph");
    __publicField(this, "rowsList", []);
    __publicField(this, "widthList", []);
  }
  toCSSUnit(value = "") {
    return toCssPixel(value);
  }
  getTitleProps() {
    const hasAvatar = !!this.nzAvatar;
    const hasParagraph = !!this.nzParagraph;
    let width = "";
    if (!hasAvatar && hasParagraph) {
      width = "38%";
    } else if (hasAvatar && hasParagraph) {
      width = "50%";
    }
    return __spreadValues({
      width
    }, this.getProps(this.nzTitle));
  }
  getAvatarProps() {
    const shape = !!this.nzTitle && !this.nzParagraph ? "square" : "circle";
    const size = "large";
    return __spreadValues({
      shape,
      size
    }, this.getProps(this.nzAvatar));
  }
  getParagraphProps() {
    const hasAvatar = !!this.nzAvatar;
    const hasTitle = !!this.nzTitle;
    const basicProps = {};
    if (!hasAvatar || !hasTitle) {
      basicProps.width = "61%";
    }
    if (!hasAvatar && hasTitle) {
      basicProps.rows = 3;
    } else {
      basicProps.rows = 2;
    }
    return __spreadValues(__spreadValues({}, basicProps), this.getProps(this.nzParagraph));
  }
  getProps(prop) {
    return prop && typeof prop === "object" ? prop : {};
  }
  getWidthList() {
    const {
      width,
      rows
    } = this.paragraph;
    let widthList = [];
    if (width && Array.isArray(width)) {
      widthList = width;
    } else if (width && !Array.isArray(width)) {
      widthList = [];
      widthList[rows - 1] = width;
    }
    return widthList;
  }
  updateProps() {
    this.title = this.getTitleProps();
    this.avatar = this.getAvatarProps();
    this.paragraph = this.getParagraphProps();
    this.rowsList = [...Array(this.paragraph.rows)];
    this.widthList = this.getWidthList();
    this.cdr.markForCheck();
  }
  ngOnInit() {
    this.updateProps();
  }
  ngOnChanges(changes) {
    if (changes.nzTitle || changes.nzAvatar || changes.nzParagraph) {
      this.updateProps();
    }
  }
};
__publicField(_NzSkeletonComponent, "\u0275fac", function NzSkeletonComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSkeletonComponent)();
});
__publicField(_NzSkeletonComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzSkeletonComponent,
  selectors: [["nz-skeleton"]],
  hostAttrs: [1, "ant-skeleton"],
  hostVars: 6,
  hostBindings: function NzSkeletonComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-skeleton-with-avatar", !!ctx.nzAvatar)("ant-skeleton-active", ctx.nzActive)("ant-skeleton-round", ctx.nzRound);
    }
  },
  inputs: {
    nzActive: [2, "nzActive", "nzActive", booleanAttribute],
    nzLoading: [2, "nzLoading", "nzLoading", booleanAttribute],
    nzRound: [2, "nzRound", "nzRound", booleanAttribute],
    nzTitle: "nzTitle",
    nzAvatar: "nzAvatar",
    nzParagraph: "nzParagraph"
  },
  exportAs: ["nzSkeleton"],
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c4,
  decls: 2,
  vars: 1,
  consts: [[1, "ant-skeleton-header"], [1, "ant-skeleton-content"], [1, "ant-skeleton-title", 3, "width"], [1, "ant-skeleton-paragraph"], ["nzType", "avatar", 3, "nzSize", "nzShape"], [1, "ant-skeleton-title"], [3, "width"]],
  template: function NzSkeletonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275conditionalCreate(0, NzSkeletonComponent_Conditional_0_Template, 4, 3)(1, NzSkeletonComponent_Conditional_1_Template, 1, 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.nzLoading ? 0 : 1);
    }
  },
  dependencies: [NzSkeletonElementDirective, NzSkeletonElementAvatarComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzSkeletonComponent = _NzSkeletonComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSkeletonComponent, [{
    type: Component,
    args: [{
      selector: "nz-skeleton",
      exportAs: "nzSkeleton",
      host: {
        class: "ant-skeleton",
        "[class.ant-skeleton-with-avatar]": "!!nzAvatar",
        "[class.ant-skeleton-active]": "nzActive",
        "[class.ant-skeleton-round]": "nzRound"
      },
      template: `
    @if (nzLoading) {
      @if (!!nzAvatar) {
        <div class="ant-skeleton-header">
          <nz-skeleton-element
            nzType="avatar"
            [nzSize]="avatar.size || 'default'"
            [nzShape]="avatar.shape || 'circle'"
          />
        </div>
      }
      <div class="ant-skeleton-content">
        @if (!!nzTitle) {
          <h3 class="ant-skeleton-title" [style.width]="toCSSUnit(title.width)"></h3>
        }
        @if (!!nzParagraph) {
          <ul class="ant-skeleton-paragraph">
            @for (row of rowsList; track row) {
              <li [style.width]="toCSSUnit(widthList[$index])"></li>
            }
          </ul>
        }
      </div>
    } @else {
      <ng-content />
    }
  `,
      imports: [NzSkeletonElementDirective, NzSkeletonElementAvatarComponent],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], null, {
    nzActive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzLoading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzRound: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzTitle: [{
      type: Input
    }],
    nzAvatar: [{
      type: Input
    }],
    nzParagraph: [{
      type: Input
    }]
  });
})();
var _NzSkeletonModule = class _NzSkeletonModule {
};
__publicField(_NzSkeletonModule, "\u0275fac", function NzSkeletonModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzSkeletonModule)();
});
__publicField(_NzSkeletonModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzSkeletonModule,
  imports: [NzSkeletonElementDirective, NzSkeletonComponent, NzSkeletonElementButtonComponent, NzSkeletonElementAvatarComponent, NzSkeletonElementImageComponent, NzSkeletonElementInputComponent],
  exports: [NzSkeletonElementDirective, NzSkeletonComponent, NzSkeletonElementButtonComponent, NzSkeletonElementAvatarComponent, NzSkeletonElementImageComponent, NzSkeletonElementInputComponent]
}));
__publicField(_NzSkeletonModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({}));
var NzSkeletonModule = _NzSkeletonModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzSkeletonModule, [{
    type: NgModule,
    args: [{
      imports: [NzSkeletonElementDirective, NzSkeletonComponent, NzSkeletonElementButtonComponent, NzSkeletonElementAvatarComponent, NzSkeletonElementImageComponent, NzSkeletonElementInputComponent],
      exports: [NzSkeletonElementDirective, NzSkeletonComponent, NzSkeletonElementButtonComponent, NzSkeletonElementAvatarComponent, NzSkeletonElementImageComponent, NzSkeletonElementInputComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-card.mjs
function NzCardMetaComponent_Conditional_0_ng_template_1_Template(rf, ctx) {
}
function NzCardMetaComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275template(1, NzCardMetaComponent_Conditional_0_ng_template_1_Template, 0, 0, "ng-template", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.nzAvatar);
  }
}
function NzCardMetaComponent_Conditional_1_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzTitle);
  }
}
function NzCardMetaComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275template(1, NzCardMetaComponent_Conditional_1_Conditional_1_ng_container_1_Template, 2, 1, "ng-container", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzTitle);
  }
}
function NzCardMetaComponent_Conditional_1_Conditional_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzDescription);
  }
}
function NzCardMetaComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275template(1, NzCardMetaComponent_Conditional_1_Conditional_2_ng_container_1_Template, 2, 1, "ng-container", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzDescription);
  }
}
function NzCardMetaComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275conditionalCreate(1, NzCardMetaComponent_Conditional_1_Conditional_1_Template, 2, 1, "div", 3);
    \u0275\u0275conditionalCreate(2, NzCardMetaComponent_Conditional_1_Conditional_2_Template, 2, 1, "div", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzTitle ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzDescription ? 2 : -1);
  }
}
var _c02 = ["*"];
function NzCardTabComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
var _c12 = () => ({
  rows: 4
});
function NzCardComponent_Conditional_0_Conditional_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzTitle);
  }
}
function NzCardComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275template(1, NzCardComponent_Conditional_0_Conditional_2_ng_container_1_Template, 2, 1, "ng-container", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzTitle);
  }
}
function NzCardComponent_Conditional_0_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.nzExtra);
  }
}
function NzCardComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275template(1, NzCardComponent_Conditional_0_Conditional_3_ng_container_1_Template, 2, 1, "ng-container", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzExtra);
  }
}
function NzCardComponent_Conditional_0_Conditional_4_ng_template_0_Template(rf, ctx) {
}
function NzCardComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzCardComponent_Conditional_0_Conditional_4_ng_template_0_Template, 0, 0, "ng-template", 8);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.listOfNzCardTabComponent.template);
  }
}
function NzCardComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 5);
    \u0275\u0275conditionalCreate(2, NzCardComponent_Conditional_0_Conditional_2_Template, 2, 1, "div", 6);
    \u0275\u0275conditionalCreate(3, NzCardComponent_Conditional_0_Conditional_3_Template, 2, 1, "div", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, NzCardComponent_Conditional_0_Conditional_4_Template, 1, 1, null, 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.nzTitle ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzExtra ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.listOfNzCardTabComponent ? 4 : -1);
  }
}
function NzCardComponent_Conditional_1_ng_template_1_Template(rf, ctx) {
}
function NzCardComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275template(1, NzCardComponent_Conditional_1_ng_template_1_Template, 0, 0, "ng-template", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.nzCover);
  }
}
function NzCardComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-skeleton", 3);
  }
  if (rf & 2) {
    \u0275\u0275property("nzActive", true)("nzTitle", false)("nzParagraph", \u0275\u0275pureFunction0(3, _c12));
  }
}
function NzCardComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function NzCardComponent_Conditional_5_For_2_ng_template_2_Template(rf, ctx) {
}
function NzCardComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li")(1, "span");
    \u0275\u0275template(2, NzCardComponent_Conditional_5_For_2_ng_template_2_Template, 0, 0, "ng-template", 8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const action_r2 = ctx.$implicit;
    const $count_r3 = ctx.$count;
    \u0275\u0275styleProp("width", 100 / $count_r3, "%");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", action_r2);
  }
}
function NzCardComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 4);
    \u0275\u0275repeaterCreate(1, NzCardComponent_Conditional_5_For_2_Template, 3, 3, "li", 10, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.nzActions);
  }
}
var _NzCardGridDirective = class _NzCardGridDirective {
  constructor() {
    __publicField(this, "nzHoverable", true);
  }
};
__publicField(_NzCardGridDirective, "\u0275fac", function NzCardGridDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzCardGridDirective)();
});
__publicField(_NzCardGridDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzCardGridDirective,
  selectors: [["", "nz-card-grid", ""]],
  hostAttrs: [1, "ant-card-grid"],
  hostVars: 2,
  hostBindings: function NzCardGridDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-card-hoverable", ctx.nzHoverable);
    }
  },
  inputs: {
    nzHoverable: [2, "nzHoverable", "nzHoverable", booleanAttribute]
  },
  exportAs: ["nzCardGrid"]
}));
var NzCardGridDirective = _NzCardGridDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCardGridDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-card-grid]",
      exportAs: "nzCardGrid",
      host: {
        class: "ant-card-grid",
        "[class.ant-card-hoverable]": "nzHoverable"
      }
    }]
  }], null, {
    nzHoverable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzCardMetaComponent = class _NzCardMetaComponent {
  constructor() {
    __publicField(this, "nzTitle", null);
    __publicField(this, "nzDescription", null);
    __publicField(this, "nzAvatar", null);
  }
};
__publicField(_NzCardMetaComponent, "\u0275fac", function NzCardMetaComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzCardMetaComponent)();
});
__publicField(_NzCardMetaComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzCardMetaComponent,
  selectors: [["nz-card-meta"]],
  hostAttrs: [1, "ant-card-meta"],
  inputs: {
    nzTitle: "nzTitle",
    nzDescription: "nzDescription",
    nzAvatar: "nzAvatar"
  },
  exportAs: ["nzCardMeta"],
  decls: 2,
  vars: 2,
  consts: [[1, "ant-card-meta-avatar"], [1, "ant-card-meta-detail"], [3, "ngTemplateOutlet"], [1, "ant-card-meta-title"], [1, "ant-card-meta-description"], [4, "nzStringTemplateOutlet"]],
  template: function NzCardMetaComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzCardMetaComponent_Conditional_0_Template, 2, 1, "div", 0);
      \u0275\u0275conditionalCreate(1, NzCardMetaComponent_Conditional_1_Template, 3, 2, "div", 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.nzAvatar ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzTitle || ctx.nzDescription ? 1 : -1);
    }
  },
  dependencies: [NgTemplateOutlet, NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzCardMetaComponent = _NzCardMetaComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCardMetaComponent, [{
    type: Component,
    args: [{
      selector: "nz-card-meta",
      exportAs: "nzCardMeta",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @if (nzAvatar) {
      <div class="ant-card-meta-avatar">
        <ng-template [ngTemplateOutlet]="nzAvatar" />
      </div>
    }

    @if (nzTitle || nzDescription) {
      <div class="ant-card-meta-detail">
        @if (nzTitle) {
          <div class="ant-card-meta-title">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </div>
        }
        @if (nzDescription) {
          <div class="ant-card-meta-description">
            <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
          </div>
        }
      </div>
    }
  `,
      host: {
        class: "ant-card-meta"
      },
      imports: [NgTemplateOutlet, NzOutletModule]
    }]
  }], null, {
    nzTitle: [{
      type: Input
    }],
    nzDescription: [{
      type: Input
    }],
    nzAvatar: [{
      type: Input
    }]
  });
})();
var _NzCardTabComponent = class _NzCardTabComponent {
  constructor() {
    __publicField(this, "template");
  }
};
__publicField(_NzCardTabComponent, "\u0275fac", function NzCardTabComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzCardTabComponent)();
});
__publicField(_NzCardTabComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzCardTabComponent,
  selectors: [["nz-card-tab"]],
  viewQuery: function NzCardTabComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(TemplateRef, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.template = _t.first);
    }
  },
  exportAs: ["nzCardTab"],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function NzCardTabComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domTemplate(0, NzCardTabComponent_ng_template_0_Template, 1, 0, "ng-template");
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzCardTabComponent = _NzCardTabComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCardTabComponent, [{
    type: Component,
    args: [{
      selector: "nz-card-tab",
      exportAs: "nzCardTab",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <ng-template>
      <ng-content />
    </ng-template>
  `
    }]
  }], null, {
    template: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME = "card";
var NzCardComponent = (() => {
  var _a;
  let _nzBordered_decorators;
  let _nzBordered_initializers = [];
  let _nzBordered_extraInitializers = [];
  let _nzHoverable_decorators;
  let _nzHoverable_initializers = [];
  let _nzHoverable_extraInitializers = [];
  let _nzSize_decorators;
  let _nzSize_initializers = [];
  let _nzSize_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "directionality", inject(Directionality));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME);
      __publicField(this, "nzBordered", __runInitializers(this, _nzBordered_initializers, true));
      __publicField(this, "nzLoading", (__runInitializers(this, _nzBordered_extraInitializers), false));
      __publicField(this, "nzHoverable", __runInitializers(this, _nzHoverable_initializers, false));
      __publicField(this, "nzBodyStyle", (__runInitializers(this, _nzHoverable_extraInitializers), null));
      __publicField(this, "nzCover");
      __publicField(this, "nzActions", []);
      __publicField(this, "nzType", null);
      __publicField(this, "nzSize", __runInitializers(this, _nzSize_initializers, "default"));
      __publicField(this, "nzTitle", __runInitializers(this, _nzSize_extraInitializers));
      __publicField(this, "nzExtra");
      __publicField(this, "listOfNzCardTabComponent");
      __publicField(this, "listOfNzCardGridDirective");
      __publicField(this, "dir", "ltr");
      onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME, () => this.cdr.markForCheck());
    }
    ngOnInit() {
      var _a2;
      (_a2 = this.directionality.change) == null ? void 0 : _a2.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
      this.dir = this.directionality.value;
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzBordered_decorators = [WithConfig()];
    _nzHoverable_decorators = [WithConfig()];
    _nzSize_decorators = [WithConfig()];
    __esDecorate(null, null, _nzBordered_decorators, {
      kind: "field",
      name: "nzBordered",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzBordered" in obj,
        get: (obj) => obj.nzBordered,
        set: (obj, value) => {
          obj.nzBordered = value;
        }
      },
      metadata: _metadata
    }, _nzBordered_initializers, _nzBordered_extraInitializers);
    __esDecorate(null, null, _nzHoverable_decorators, {
      kind: "field",
      name: "nzHoverable",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzHoverable" in obj,
        get: (obj) => obj.nzHoverable,
        set: (obj, value) => {
          obj.nzHoverable = value;
        }
      },
      metadata: _metadata
    }, _nzHoverable_initializers, _nzHoverable_extraInitializers);
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
  })(), __publicField(_a, "\u0275fac", function NzCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-card"]],
    contentQueries: function NzCardComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, NzCardTabComponent, 5)(dirIndex, NzCardGridDirective, 4);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfNzCardTabComponent = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.listOfNzCardGridDirective = _t);
      }
    },
    hostAttrs: [1, "ant-card"],
    hostVars: 16,
    hostBindings: function NzCardComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-card-loading", ctx.nzLoading)("ant-card-bordered", ctx.nzBordered)("ant-card-hoverable", ctx.nzHoverable)("ant-card-small", ctx.nzSize === "small")("ant-card-contain-grid", ctx.listOfNzCardGridDirective && ctx.listOfNzCardGridDirective.length)("ant-card-type-inner", ctx.nzType === "inner")("ant-card-contain-tabs", !!ctx.listOfNzCardTabComponent)("ant-card-rtl", ctx.dir === "rtl");
      }
    },
    inputs: {
      nzBordered: [2, "nzBordered", "nzBordered", booleanAttribute],
      nzLoading: [2, "nzLoading", "nzLoading", booleanAttribute],
      nzHoverable: [2, "nzHoverable", "nzHoverable", booleanAttribute],
      nzBodyStyle: "nzBodyStyle",
      nzCover: "nzCover",
      nzActions: "nzActions",
      nzType: "nzType",
      nzSize: "nzSize",
      nzTitle: "nzTitle",
      nzExtra: "nzExtra"
    },
    exportAs: ["nzCard"],
    ngContentSelectors: _c02,
    decls: 6,
    vars: 6,
    consts: [[1, "ant-card-head"], [1, "ant-card-cover"], [1, "ant-card-body"], [3, "nzActive", "nzTitle", "nzParagraph"], [1, "ant-card-actions"], [1, "ant-card-head-wrapper"], [1, "ant-card-head-title"], [1, "ant-card-extra"], [3, "ngTemplateOutlet"], [4, "nzStringTemplateOutlet"], [3, "width"]],
    template: function NzCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275conditionalCreate(0, NzCardComponent_Conditional_0_Template, 5, 3, "div", 0);
        \u0275\u0275conditionalCreate(1, NzCardComponent_Conditional_1_Template, 2, 1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2);
        \u0275\u0275conditionalCreate(3, NzCardComponent_Conditional_3_Template, 1, 4, "nz-skeleton", 3)(4, NzCardComponent_Conditional_4_Template, 1, 0);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(5, NzCardComponent_Conditional_5_Template, 3, 0, "ul", 4);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.nzTitle || ctx.nzExtra || ctx.listOfNzCardTabComponent ? 0 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.nzCover ? 1 : -1);
        \u0275\u0275advance();
        \u0275\u0275styleMap(ctx.nzBodyStyle);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.nzLoading ? 3 : 4);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.nzActions.length ? 5 : -1);
      }
    },
    dependencies: [NzOutletModule, NzStringTemplateOutletDirective, NgTemplateOutlet, NzSkeletonModule, NzSkeletonComponent],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCardComponent, [{
    type: Component,
    args: [{
      selector: "nz-card",
      exportAs: "nzCard",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    @if (nzTitle || nzExtra || listOfNzCardTabComponent) {
      <div class="ant-card-head">
        <div class="ant-card-head-wrapper">
          @if (nzTitle) {
            <div class="ant-card-head-title">
              <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
            </div>
          }
          @if (nzExtra) {
            <div class="ant-card-extra">
              <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
            </div>
          }
        </div>
        @if (listOfNzCardTabComponent) {
          <ng-template [ngTemplateOutlet]="listOfNzCardTabComponent.template" />
        }
      </div>
    }

    @if (nzCover) {
      <div class="ant-card-cover">
        <ng-template [ngTemplateOutlet]="nzCover" />
      </div>
    }

    <div class="ant-card-body" [style]="nzBodyStyle">
      @if (nzLoading) {
        <nz-skeleton [nzActive]="true" [nzTitle]="false" [nzParagraph]="{ rows: 4 }" />
      } @else {
        <ng-content />
      }
    </div>
    @if (nzActions.length) {
      <ul class="ant-card-actions">
        @for (action of nzActions; track $index) {
          <li [style.width.%]="100 / $count">
            <span><ng-template [ngTemplateOutlet]="action" /></span>
          </li>
        }
      </ul>
    }
  `,
      host: {
        class: "ant-card",
        "[class.ant-card-loading]": "nzLoading",
        "[class.ant-card-bordered]": "nzBordered",
        "[class.ant-card-hoverable]": "nzHoverable",
        "[class.ant-card-small]": 'nzSize === "small"',
        "[class.ant-card-contain-grid]": "listOfNzCardGridDirective && listOfNzCardGridDirective.length",
        "[class.ant-card-type-inner]": 'nzType === "inner"',
        "[class.ant-card-contain-tabs]": "!!listOfNzCardTabComponent",
        "[class.ant-card-rtl]": `dir === 'rtl'`
      },
      imports: [NzOutletModule, NgTemplateOutlet, NzSkeletonModule]
    }]
  }], () => [], {
    nzBordered: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzLoading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzHoverable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzBodyStyle: [{
      type: Input
    }],
    nzCover: [{
      type: Input
    }],
    nzActions: [{
      type: Input
    }],
    nzType: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzTitle: [{
      type: Input
    }],
    nzExtra: [{
      type: Input
    }],
    listOfNzCardTabComponent: [{
      type: ContentChild,
      args: [NzCardTabComponent, {
        static: false
      }]
    }],
    listOfNzCardGridDirective: [{
      type: ContentChildren,
      args: [NzCardGridDirective]
    }]
  });
})();
var _NzCardModule = class _NzCardModule {
};
__publicField(_NzCardModule, "\u0275fac", function NzCardModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzCardModule)();
});
__publicField(_NzCardModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzCardModule,
  imports: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardTabComponent],
  exports: [BidiModule, NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardTabComponent]
}));
__publicField(_NzCardModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzCardComponent, NzCardMetaComponent, BidiModule]
}));
var NzCardModule = _NzCardModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCardModule, [{
    type: NgModule,
    args: [{
      imports: [NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardTabComponent],
      exports: [BidiModule, NzCardComponent, NzCardGridDirective, NzCardMetaComponent, NzCardTabComponent]
    }]
  }], null, null);
})();

export {
  NzSkeletonComponent,
  NzSkeletonModule,
  NzCardComponent,
  NzCardModule
};
//# sourceMappingURL=chunk-YBVHYS6H.js.map
