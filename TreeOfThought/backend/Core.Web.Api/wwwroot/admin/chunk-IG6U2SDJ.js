import {
  Directionality,
  NgTemplateOutlet,
  NzBreakpointEnum,
  NzBreakpointService,
  NzConfigService,
  NzOutletModule,
  NzStringTemplateOutletDirective,
  WithConfig,
  gridResponsiveMap,
  takeUntilDestroyed,
  warn
} from "./chunk-OAJITSIB.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  DestroyRef,
  Input,
  NgModule,
  Subject,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  auditTime,
  booleanAttribute,
  inject,
  merge,
  numberAttribute,
  setClassMetadata,
  startWith,
  switchMap,
  tap,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomTemplate,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-XW2QAALF.js";
import {
  __publicField
} from "./chunk-MYGOUE3E.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-descriptions.mjs
var _c0 = ["*"];
function NzDescriptionsItemComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function NzDescriptionsComponent_Conditional_0_Conditional_1_ng_container_1_Template(rf, ctx) {
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
function NzDescriptionsComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275template(1, NzDescriptionsComponent_Conditional_0_Conditional_1_ng_container_1_Template, 2, 1, "ng-container", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzTitle);
  }
}
function NzDescriptionsComponent_Conditional_0_Conditional_2_ng_container_1_Template(rf, ctx) {
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
function NzDescriptionsComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275template(1, NzDescriptionsComponent_Conditional_0_Conditional_2_ng_container_1_Template, 2, 1, "ng-container", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzExtra);
  }
}
function NzDescriptionsComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275conditionalCreate(1, NzDescriptionsComponent_Conditional_0_Conditional_1_Template, 2, 1, "div", 2);
    \u0275\u0275conditionalCreate(2, NzDescriptionsComponent_Conditional_0_Conditional_2_Template, 2, 1, "div", 3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzTitle ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzExtra ? 2 : -1);
  }
}
function NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.title, " ");
  }
}
function NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_0_ng_template_5_Template(rf, ctx) {
}
function NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 6)(1, "div", 7)(2, "span", 8);
    \u0275\u0275template(3, NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_0_ng_container_3_Template, 2, 1, "ng-container", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 9);
    \u0275\u0275template(5, NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_0_ng_template_5_Template, 0, 0, "ng-template", 10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275property("colSpan", item_r2.span);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("ant-descriptions-item-no-colon", !ctx_r0.nzColon);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", item_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", item_r2.content);
  }
}
function NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.title, " ");
  }
}
function NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_1_ng_template_3_Template(rf, ctx) {
}
function NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 8);
    \u0275\u0275template(1, NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_1_ng_container_1_Template, 2, 1, "ng-container", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "td", 11);
    \u0275\u0275template(3, NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_1_ng_template_3_Template, 0, 0, "ng-template", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", item_r2.title);
    \u0275\u0275advance();
    \u0275\u0275property("colSpan", item_r2.span * 2 - 1);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", item_r2.content);
  }
}
function NzDescriptionsComponent_Conditional_4_For_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_0_Template, 6, 5, "td", 6)(1, NzDescriptionsComponent_Conditional_4_For_1_For_2_Conditional_1_Template, 4, 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(!ctx_r0.nzBordered ? 0 : 1);
  }
}
function NzDescriptionsComponent_Conditional_4_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 5);
    \u0275\u0275repeaterCreate(1, NzDescriptionsComponent_Conditional_4_For_1_For_2_Template, 2, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r3);
  }
}
function NzDescriptionsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, NzDescriptionsComponent_Conditional_4_For_1_Template, 3, 0, "tr", 5, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r0.itemMatrix);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r4.title, " ");
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 6)(1, "div", 7)(2, "span", 8);
    \u0275\u0275template(3, NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_2_ng_container_3_Template, 2, 1, "ng-container", 4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("colSpan", item_r4.span);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("ant-descriptions-item-no-colon", !ctx_r0.nzColon);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", item_r4.title);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_5_ng_template_3_Template(rf, ctx) {
}
function NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 6)(1, "div", 7)(2, "span", 9);
    \u0275\u0275template(3, NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_5_ng_template_3_Template, 0, 0, "ng-template", 10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275property("colSpan", item_r5.span);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngTemplateOutlet", item_r5.content);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 5);
    \u0275\u0275repeaterCreate(1, NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_2_Template, 4, 4, "td", 6, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "tr", 5);
    \u0275\u0275repeaterCreate(4, NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_For_5_Template, 4, 2, "td", 6, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r6);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(row_r6);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, NzDescriptionsComponent_Conditional_5_Conditional_0_For_1_Template, 6, 0, null, null, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r0.itemMatrix);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.title, " ");
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 12);
    \u0275\u0275template(1, NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_2_ng_container_1_Template, 2, 1, "ng-container", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275property("colSpan", item_r7.span);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", item_r7.title);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_5_ng_template_1_Template(rf, ctx) {
}
function NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 11);
    \u0275\u0275template(1, NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_5_ng_template_1_Template, 0, 0, "ng-template", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275property("colSpan", item_r8.span);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", item_r8.content);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 5);
    \u0275\u0275repeaterCreate(1, NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_2_Template, 2, 2, "td", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "tr", 5);
    \u0275\u0275repeaterCreate(4, NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_For_5_Template, 2, 2, "td", 11, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r9);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(row_r9);
  }
}
function NzDescriptionsComponent_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, NzDescriptionsComponent_Conditional_5_Conditional_1_For_1_Template, 6, 0, null, null, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r0.itemMatrix);
  }
}
function NzDescriptionsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzDescriptionsComponent_Conditional_5_Conditional_0_Template, 2, 0)(1, NzDescriptionsComponent_Conditional_5_Conditional_1_Template, 2, 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r0.nzBordered ? 0 : 1);
  }
}
var _NzDescriptionsItemComponent = class _NzDescriptionsItemComponent {
  constructor() {
    __publicField(this, "content");
    __publicField(this, "nzSpan", 1);
    __publicField(this, "nzTitle", "");
    __publicField(this, "inputChange$", new Subject());
  }
  ngOnChanges() {
    this.inputChange$.next();
  }
  ngOnDestroy() {
    this.inputChange$.complete();
  }
};
__publicField(_NzDescriptionsItemComponent, "\u0275fac", function NzDescriptionsItemComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzDescriptionsItemComponent)();
});
__publicField(_NzDescriptionsItemComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzDescriptionsItemComponent,
  selectors: [["nz-descriptions-item"]],
  viewQuery: function NzDescriptionsItemComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(TemplateRef, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.content = _t.first);
    }
  },
  inputs: {
    nzSpan: [2, "nzSpan", "nzSpan", numberAttribute],
    nzTitle: "nzTitle"
  },
  exportAs: ["nzDescriptionsItem"],
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function NzDescriptionsItemComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275domTemplate(0, NzDescriptionsItemComponent_ng_template_0_Template, 1, 0, "ng-template");
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzDescriptionsItemComponent = _NzDescriptionsItemComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDescriptionsItemComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-descriptions-item",
      template: `
    <ng-template>
      <ng-content />
    </ng-template>
  `,
      exportAs: "nzDescriptionsItem"
    }]
  }], null, {
    content: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }],
    nzSpan: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzTitle: [{
      type: Input
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME = "descriptions";
var defaultColumnMap = {
  xxl: 3,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1
};
var NzDescriptionsComponent = (() => {
  var _a;
  let _nzBordered_decorators;
  let _nzBordered_initializers = [];
  let _nzBordered_extraInitializers = [];
  let _nzColumn_decorators;
  let _nzColumn_initializers = [];
  let _nzColumn_extraInitializers = [];
  let _nzSize_decorators;
  let _nzSize_initializers = [];
  let _nzSize_extraInitializers = [];
  let _nzColon_decorators;
  let _nzColon_initializers = [];
  let _nzColon_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "nzConfigService", inject(NzConfigService));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "breakpointService", inject(NzBreakpointService));
      __publicField(this, "directionality", inject(Directionality));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME);
      __publicField(this, "items");
      __publicField(this, "nzBordered", __runInitializers(this, _nzBordered_initializers, false));
      __publicField(this, "nzLayout", (__runInitializers(this, _nzBordered_extraInitializers), "horizontal"));
      __publicField(this, "nzColumn", __runInitializers(this, _nzColumn_initializers, defaultColumnMap));
      __publicField(this, "nzSize", (__runInitializers(this, _nzColumn_extraInitializers), __runInitializers(this, _nzSize_initializers, "default")));
      __publicField(this, "nzTitle", (__runInitializers(this, _nzSize_extraInitializers), ""));
      __publicField(this, "nzExtra");
      __publicField(this, "nzColon", __runInitializers(this, _nzColon_initializers, true));
      __publicField(this, "itemMatrix", (__runInitializers(this, _nzColon_extraInitializers), []));
      __publicField(this, "realColumn", 3);
      __publicField(this, "dir", "ltr");
      __publicField(this, "breakpoint", NzBreakpointEnum.md);
    }
    ngOnInit() {
      var _a2;
      this.dir = this.directionality.value;
      (_a2 = this.directionality.change) == null ? void 0 : _a2.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
        this.dir = direction;
      });
    }
    ngOnChanges(changes) {
      if (changes.nzColumn) {
        this.prepareMatrix();
      }
    }
    ngAfterContentInit() {
      const contentChange$ = this.items.changes.pipe(startWith(this.items));
      merge(contentChange$, contentChange$.pipe(switchMap(() => merge(...this.items.map((i) => i.inputChange$)).pipe(auditTime(16)))), this.breakpointService.subscribe(gridResponsiveMap).pipe(tap((bp) => this.breakpoint = bp))).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.prepareMatrix();
        this.cdr.markForCheck();
      });
    }
    /**
     * Prepare the render matrix according to description items' spans.
     */
    prepareMatrix() {
      if (!this.items) {
        return;
      }
      let currentRow = [];
      let width = 0;
      const column = this.realColumn = this.getColumn();
      const items = this.items.toArray();
      const length = items.length;
      const matrix = [];
      const flushRow = () => {
        matrix.push(currentRow);
        currentRow = [];
        width = 0;
      };
      for (let i = 0; i < length; i++) {
        const item = items[i];
        const {
          nzTitle: title,
          content,
          nzSpan: span
        } = item;
        width += span;
        if (width >= column) {
          if (width > column) {
            warn(`"nzColumn" is ${column} but we have row length ${width}`);
          }
          currentRow.push({
            title,
            content,
            span: column - (width - span)
          });
          flushRow();
        } else if (i === length - 1) {
          currentRow.push({
            title,
            content,
            span: column - (width - span)
          });
          flushRow();
        } else {
          currentRow.push({
            title,
            content,
            span
          });
        }
      }
      this.itemMatrix = matrix;
    }
    getColumn() {
      if (typeof this.nzColumn !== "number") {
        return this.nzColumn[this.breakpoint];
      }
      return this.nzColumn;
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzBordered_decorators = [WithConfig()];
    _nzColumn_decorators = [WithConfig()];
    _nzSize_decorators = [WithConfig()];
    _nzColon_decorators = [WithConfig()];
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
    __esDecorate(null, null, _nzColumn_decorators, {
      kind: "field",
      name: "nzColumn",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzColumn" in obj,
        get: (obj) => obj.nzColumn,
        set: (obj, value) => {
          obj.nzColumn = value;
        }
      },
      metadata: _metadata
    }, _nzColumn_initializers, _nzColumn_extraInitializers);
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
    __esDecorate(null, null, _nzColon_decorators, {
      kind: "field",
      name: "nzColon",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzColon" in obj,
        get: (obj) => obj.nzColon,
        set: (obj, value) => {
          obj.nzColon = value;
        }
      },
      metadata: _metadata
    }, _nzColon_initializers, _nzColon_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzDescriptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-descriptions"]],
    contentQueries: function NzDescriptionsComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, NzDescriptionsItemComponent, 4);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.items = _t);
      }
    },
    hostAttrs: [1, "ant-descriptions"],
    hostVars: 8,
    hostBindings: function NzDescriptionsComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-descriptions-bordered", ctx.nzBordered)("ant-descriptions-middle", ctx.nzSize === "middle")("ant-descriptions-small", ctx.nzSize === "small")("ant-descriptions-rtl", ctx.dir === "rtl");
      }
    },
    inputs: {
      nzBordered: [2, "nzBordered", "nzBordered", booleanAttribute],
      nzLayout: "nzLayout",
      nzColumn: "nzColumn",
      nzSize: "nzSize",
      nzTitle: "nzTitle",
      nzExtra: "nzExtra",
      nzColon: [2, "nzColon", "nzColon", booleanAttribute]
    },
    exportAs: ["nzDescriptions"],
    features: [\u0275\u0275NgOnChangesFeature],
    decls: 6,
    vars: 3,
    consts: [[1, "ant-descriptions-header"], [1, "ant-descriptions-view"], [1, "ant-descriptions-title"], [1, "ant-descriptions-extra"], [4, "nzStringTemplateOutlet"], [1, "ant-descriptions-row"], [1, "ant-descriptions-item", 3, "colSpan"], [1, "ant-descriptions-item-container"], [1, "ant-descriptions-item-label"], [1, "ant-descriptions-item-content"], [3, "ngTemplateOutlet"], [1, "ant-descriptions-item-content", 3, "colSpan"], [1, "ant-descriptions-item-label", 3, "colSpan"]],
    template: function NzDescriptionsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, NzDescriptionsComponent_Conditional_0_Template, 3, 2, "div", 0);
        \u0275\u0275elementStart(1, "div", 1)(2, "table")(3, "tbody");
        \u0275\u0275conditionalCreate(4, NzDescriptionsComponent_Conditional_4_Template, 2, 0);
        \u0275\u0275conditionalCreate(5, NzDescriptionsComponent_Conditional_5_Template, 2, 1);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.nzTitle || ctx.nzExtra ? 0 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.nzLayout === "horizontal" ? 4 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.nzLayout === "vertical" ? 5 : -1);
      }
    },
    dependencies: [NzOutletModule, NzStringTemplateOutletDirective, NgTemplateOutlet],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDescriptionsComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      selector: "nz-descriptions",
      exportAs: "nzDescriptions",
      template: `
    @if (nzTitle || nzExtra) {
      <div class="ant-descriptions-header">
        @if (nzTitle) {
          <div class="ant-descriptions-title">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </div>
        }
        @if (nzExtra) {
          <div class="ant-descriptions-extra">
            <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
          </div>
        }
      </div>
    }

    <div class="ant-descriptions-view">
      <table>
        <tbody>
          @if (nzLayout === 'horizontal') {
            @for (row of itemMatrix; track row; let i = $index) {
              <tr class="ant-descriptions-row">
                @for (item of row; track item; let isLast = $last) {
                  @if (!nzBordered) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-label" [class.ant-descriptions-item-no-colon]="!nzColon">
                          <ng-container *nzStringTemplateOutlet="item.title">
                            {{ item.title }}
                          </ng-container>
                        </span>
                        <span class="ant-descriptions-item-content">
                          <ng-template [ngTemplateOutlet]="item.content" />
                        </span>
                      </div>
                    </td>
                  } @else {
                    <td class="ant-descriptions-item-label">
                      <ng-container *nzStringTemplateOutlet="item.title">
                        {{ item.title }}
                      </ng-container>
                    </td>
                    <td class="ant-descriptions-item-content" [colSpan]="item.span * 2 - 1">
                      <ng-template [ngTemplateOutlet]="item.content" />
                    </td>
                  }
                }
              </tr>
            }
          }

          @if (nzLayout === 'vertical') {
            @if (!nzBordered) {
              @for (row of itemMatrix; track row; let i = $index) {
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-label" [class.ant-descriptions-item-no-colon]="!nzColon">
                          <ng-container *nzStringTemplateOutlet="item.title">
                            {{ item.title }}
                          </ng-container>
                        </span>
                      </div>
                    </td>
                  }
                </tr>
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item" [colSpan]="item.span">
                      <div class="ant-descriptions-item-container">
                        <span class="ant-descriptions-item-content">
                          <ng-template [ngTemplateOutlet]="item.content" />
                        </span>
                      </div>
                    </td>
                  }
                </tr>
              }
            } @else {
              @for (row of itemMatrix; track row; let i = $index) {
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item-label" [colSpan]="item.span">
                      <ng-container *nzStringTemplateOutlet="item.title">
                        {{ item.title }}
                      </ng-container>
                    </td>
                  }
                </tr>
                <tr class="ant-descriptions-row">
                  @for (item of row; track item; let isLast = $last) {
                    <td class="ant-descriptions-item-content" [colSpan]="item.span">
                      <ng-template [ngTemplateOutlet]="item.content" />
                    </td>
                  }
                </tr>
              }
            }
          }
        </tbody>
      </table>
    </div>
  `,
      host: {
        class: "ant-descriptions",
        "[class.ant-descriptions-bordered]": "nzBordered",
        "[class.ant-descriptions-middle]": 'nzSize === "middle"',
        "[class.ant-descriptions-small]": 'nzSize === "small"',
        "[class.ant-descriptions-rtl]": 'dir === "rtl"'
      },
      imports: [NzOutletModule, NgTemplateOutlet]
    }]
  }], null, {
    items: [{
      type: ContentChildren,
      args: [NzDescriptionsItemComponent]
    }],
    nzBordered: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzLayout: [{
      type: Input
    }],
    nzColumn: [{
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
    nzColon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzDescriptionsModule = class _NzDescriptionsModule {
};
__publicField(_NzDescriptionsModule, "\u0275fac", function NzDescriptionsModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzDescriptionsModule)();
});
__publicField(_NzDescriptionsModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzDescriptionsModule,
  imports: [NzDescriptionsComponent, NzDescriptionsItemComponent],
  exports: [NzDescriptionsComponent, NzDescriptionsItemComponent]
}));
__publicField(_NzDescriptionsModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzDescriptionsComponent]
}));
var NzDescriptionsModule = _NzDescriptionsModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDescriptionsModule, [{
    type: NgModule,
    args: [{
      imports: [NzDescriptionsComponent, NzDescriptionsItemComponent],
      exports: [NzDescriptionsComponent, NzDescriptionsItemComponent]
    }]
  }], null, null);
})();

export {
  NzDescriptionsItemComponent,
  NzDescriptionsComponent,
  NzDescriptionsModule
};
//# sourceMappingURL=chunk-IG6U2SDJ.js.map
