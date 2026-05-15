import {
  NzOutletModule,
  NzStringTemplateOutletDirective
} from "./chunk-BV7BATNO.js";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  ViewEncapsulation,
  booleanAttribute,
  setClassMetadata,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-2BQMWOA2.js";
import {
  __publicField
} from "./chunk-MYGOUE3E.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-divider.mjs
function NzDividerComponent_Conditional_0_ng_container_1_Template(rf, ctx) {
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
function NzDividerComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 0);
    \u0275\u0275template(1, NzDividerComponent_Conditional_0_ng_container_1_Template, 2, 1, "ng-container", 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzText);
  }
}
var _NzDividerComponent = class _NzDividerComponent {
  constructor() {
    __publicField(this, "nzText");
    __publicField(this, "nzType", "horizontal");
    __publicField(this, "nzOrientation", "center");
    __publicField(this, "nzVariant", "solid");
    __publicField(this, "nzSize");
    __publicField(this, "nzDashed", false);
    __publicField(this, "nzPlain", false);
  }
};
__publicField(_NzDividerComponent, "\u0275fac", function NzDividerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzDividerComponent)();
});
__publicField(_NzDividerComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzDividerComponent,
  selectors: [["nz-divider"]],
  hostAttrs: [1, "ant-divider"],
  hostVars: 22,
  hostBindings: function NzDividerComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-divider-horizontal", ctx.nzType === "horizontal")("ant-divider-vertical", ctx.nzType === "vertical")("ant-divider-with-text", ctx.nzText)("ant-divider-plain", ctx.nzPlain)("ant-divider-with-text-left", ctx.nzText && ctx.nzOrientation === "left")("ant-divider-with-text-right", ctx.nzText && ctx.nzOrientation === "right")("ant-divider-with-text-center", ctx.nzText && ctx.nzOrientation === "center")("ant-divider-dashed", ctx.nzDashed || ctx.nzVariant === "dashed")("ant-divider-dotted", ctx.nzVariant === "dotted")("ant-divider-sm", ctx.nzSize === "small")("ant-divider-md", ctx.nzSize === "middle");
    }
  },
  inputs: {
    nzText: "nzText",
    nzType: "nzType",
    nzOrientation: "nzOrientation",
    nzVariant: "nzVariant",
    nzSize: "nzSize",
    nzDashed: [2, "nzDashed", "nzDashed", booleanAttribute],
    nzPlain: [2, "nzPlain", "nzPlain", booleanAttribute]
  },
  exportAs: ["nzDivider"],
  decls: 1,
  vars: 1,
  consts: [[1, "ant-divider-inner-text"], [4, "nzStringTemplateOutlet"]],
  template: function NzDividerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzDividerComponent_Conditional_0_Template, 2, 1, "span", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.nzText ? 0 : -1);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzDividerComponent = _NzDividerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDividerComponent, [{
    type: Component,
    args: [{
      selector: "nz-divider",
      exportAs: "nzDivider",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    @if (nzText) {
      <span class="ant-divider-inner-text">
        <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      </span>
    }
  `,
      host: {
        class: "ant-divider",
        "[class.ant-divider-horizontal]": `nzType === 'horizontal'`,
        "[class.ant-divider-vertical]": `nzType === 'vertical'`,
        "[class.ant-divider-with-text]": `nzText`,
        "[class.ant-divider-plain]": `nzPlain`,
        "[class.ant-divider-with-text-left]": `nzText && nzOrientation === 'left'`,
        "[class.ant-divider-with-text-right]": `nzText && nzOrientation === 'right'`,
        "[class.ant-divider-with-text-center]": `nzText && nzOrientation === 'center'`,
        "[class.ant-divider-dashed]": `nzDashed || nzVariant === 'dashed'`,
        "[class.ant-divider-dotted]": `nzVariant === 'dotted'`,
        "[class.ant-divider-sm]": `nzSize === 'small'`,
        "[class.ant-divider-md]": `nzSize === 'middle'`
      },
      imports: [NzOutletModule]
    }]
  }], null, {
    nzText: [{
      type: Input
    }],
    nzType: [{
      type: Input
    }],
    nzOrientation: [{
      type: Input
    }],
    nzVariant: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzDashed: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzPlain: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzDividerModule = class _NzDividerModule {
};
__publicField(_NzDividerModule, "\u0275fac", function NzDividerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzDividerModule)();
});
__publicField(_NzDividerModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzDividerModule,
  imports: [NzDividerComponent],
  exports: [NzDividerComponent]
}));
__publicField(_NzDividerModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzDividerComponent]
}));
var NzDividerModule = _NzDividerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDividerModule, [{
    type: NgModule,
    args: [{
      imports: [NzDividerComponent],
      exports: [NzDividerComponent]
    }]
  }], null, null);
})();

export {
  NzDividerComponent,
  NzDividerModule
};
//# sourceMappingURL=chunk-VMXZFLQI.js.map
