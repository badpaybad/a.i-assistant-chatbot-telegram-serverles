import {
  AuthService,
  NzDescriptionsComponent,
  NzDescriptionsItemComponent,
  NzDescriptionsModule
} from "./chunk-ZRIWJIC7.js";
import {
  ADMIN_CLAIM,
  ADMIN_ROLE,
  APP_CLAIMS,
  CLAIMS_VERSION
} from "./chunk-F6TGNGA2.js";
import "./chunk-WEPRVIH2.js";
import "./chunk-IRGOCD6C.js";
import {
  NzCardComponent,
  NzCardModule
} from "./chunk-T7PAMWZ4.js";
import {
  NzTagComponent,
  NzTagModule
} from "./chunk-GVGPR4NJ.js";
import {
  NzDropdownDirective,
  NzDropdownMenuComponent,
  NzDropdownModule,
  NzMenuDirective,
  NzMenuItemComponent,
  NzMenuModule,
  NzTableCellDirective,
  NzTableComponent,
  NzTableModule,
  NzTbodyComponent,
  NzThMeasureDirective,
  NzTheadComponent,
  NzTrDirective
} from "./chunk-QZ7FOKZW.js";
import {
  isAnimationEnabled
} from "./chunk-QA53ID2Z.js";
import {
  NzResizeObserver
} from "./chunk-FVBTWRWW.js";
import {
  A11yModule,
  CdkMonitorFocus,
  CommonModule,
  DOWN_ARROW,
  Directionality,
  ENTER,
  FocusKeyManager,
  LEFT_ARROW,
  NavigationEnd,
  NgForOf,
  NgIf,
  NgTemplateOutlet,
  NzConfigService,
  NzIconDirective,
  NzIconModule,
  NzOutletModule,
  NzStringTemplateOutletDirective,
  PREFIX,
  RIGHT_ARROW,
  Router,
  RouterLink,
  SPACE,
  TranslateModule,
  TranslatePipe,
  UP_ARROW,
  ViewportRuler,
  WithConfig,
  coerceCssPixelValue,
  coerceNumberProperty,
  fromEventOutsideAngular,
  generateClassName,
  hasModifierKey,
  isNil,
  requestAnimationFrame,
  takeUntilDestroyed,
  wrapIntoObservable
} from "./chunk-BV7BATNO.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Output,
  QueryList,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  animationFrameScheduler,
  asapScheduler,
  auditTime,
  booleanAttribute,
  computed,
  contentChildren,
  delay,
  effect,
  filter,
  first,
  forwardRef,
  inject,
  input,
  merge,
  of,
  setClassMetadata,
  signal,
  startWith,
  untracked,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵcontentQuerySignal,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomTemplate,
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
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-2BQMWOA2.js";
import {
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-MYGOUE3E.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-tabs.mjs
function NzTabAddButtonComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "nz-icon", 1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const icon_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzType", icon_r1);
  }
}
var _c0 = ["nz-tab-body", ""];
function NzTabBodyComponent_ng_template_0_Template(rf, ctx) {
}
function NzTabCloseButtonComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "nz-icon", 1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const icon_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzType", icon_r1);
  }
}
var _c1 = () => ({
  minWidth: "46px"
});
var _c2 = () => ({
  visible: false
});
function NzTabNavOperationComponent_Conditional_5_For_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.tab.label, " ");
  }
}
function NzTabNavOperationComponent_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 7);
    \u0275\u0275listener("click", function NzTabNavOperationComponent_Conditional_5_For_2_Template_li_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onSelect(item_r2));
    })("contextmenu", function NzTabNavOperationComponent_Conditional_5_For_2_Template_li_contextmenu_0_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onContextmenu(item_r2, $event));
    });
    \u0275\u0275template(1, NzTabNavOperationComponent_Conditional_5_For_2_ng_container_1_Template, 2, 1, "ng-container", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275classProp("ant-tabs-dropdown-menu-item-disabled", item_r2.disabled);
    \u0275\u0275property("nzSelected", item_r2.active)("nzDisabled", item_r2.disabled);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", item_r2.tab.label)("nzStringTemplateOutletContext", \u0275\u0275pureFunction0(6, _c2));
  }
}
function NzTabNavOperationComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 4);
    \u0275\u0275repeaterCreate(1, NzTabNavOperationComponent_Conditional_5_For_2_Template, 2, 7, "li", 6, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.items);
  }
}
function NzTabNavOperationComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function NzTabNavOperationComponent_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addClicked.emit());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("addIcon", ctx_r2.addIcon);
  }
}
var _c3 = ["navWrap"];
var _c4 = ["navList"];
var _c5 = ["*"];
function NzTabNavBarComponent_Conditional_0_ng_template_1_Template(rf, ctx) {
}
function NzTabNavBarComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275template(1, NzTabNavBarComponent_Conditional_0_ng_template_1_Template, 0, 0, "ng-template", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.startExtraContent().templateRef);
  }
}
function NzTabNavBarComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 9);
    \u0275\u0275listener("click", function NzTabNavBarComponent_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.addClicked.emit());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("addIcon", ctx_r0.addIcon);
    \u0275\u0275attribute("tabindex", -1);
  }
}
function NzTabNavBarComponent_Conditional_9_ng_template_1_Template(rf, ctx) {
}
function NzTabNavBarComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275template(1, NzTabNavBarComponent_Conditional_9_ng_template_1_Template, 0, 0, "ng-template", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.endExtraContent().templateRef);
  }
}
function NzTabNavBarComponent_Conditional_10_ng_template_1_Template(rf, ctx) {
}
function NzTabNavBarComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275template(1, NzTabNavBarComponent_Conditional_10_ng_template_1_Template, 0, 0, "ng-template", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.extraTemplate);
  }
}
var _c6 = ["contentTemplate"];
var _c7 = [[["", "nz-tab-link", ""]], "*"];
var _c8 = ["[nz-tab-link]", "*"];
function NzTabComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function NzTabComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 1);
  }
}
var _c9 = () => ({
  visible: true
});
function NzTabsComponent_Conditional_0_For_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const tab_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tab_r5.label, " ");
  }
}
function NzTabsComponent_Conditional_0_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function NzTabsComponent_Conditional_0_For_2_Conditional_3_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const $index_r6 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onClose($index_r6, $event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tab_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("closeIcon", tab_r5.nzCloseIcon);
  }
}
function NzTabsComponent_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275listener("click", function NzTabsComponent_Conditional_0_For_2_Template_div_click_0_listener($event) {
      const ctx_r3 = \u0275\u0275restoreView(_r3);
      const tab_r5 = ctx_r3.$implicit;
      const $index_r6 = ctx_r3.$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clickNavItem(tab_r5, $index_r6, $event));
    })("contextmenu", function NzTabsComponent_Conditional_0_For_2_Template_div_contextmenu_0_listener($event) {
      const tab_r5 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.contextmenuNavItem(tab_r5, $event));
    });
    \u0275\u0275elementStart(1, "button", 7);
    \u0275\u0275template(2, NzTabsComponent_Conditional_0_For_2_ng_container_2_Template, 2, 1, "ng-container", 8);
    \u0275\u0275conditionalCreate(3, NzTabsComponent_Conditional_0_For_2_Conditional_3_Template, 1, 1, "button", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tab_r5 = ctx.$implicit;
    const $index_r6 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275styleProp("margin-right", ctx_r1.position === "horizontal" ? ctx_r1.nzTabBarGutter : null, "px")("margin-bottom", ctx_r1.position === "vertical" ? ctx_r1.nzTabBarGutter : null, "px");
    \u0275\u0275classProp("ant-tabs-tab-active", ctx_r1.nzSelectedIndex === $index_r6)("ant-tabs-tab-disabled", tab_r5.nzDisabled);
    \u0275\u0275advance();
    \u0275\u0275property("id", ctx_r1.getTabContentId($index_r6))("disabled", tab_r5.nzDisabled)("tab", tab_r5)("active", ctx_r1.nzSelectedIndex === $index_r6);
    \u0275\u0275attribute("tabIndex", ctx_r1.getTabIndex(tab_r5, $index_r6))("aria-disabled", tab_r5.nzDisabled)("aria-selected", ctx_r1.nzSelectedIndex === $index_r6 && !ctx_r1.nzHideAll)("aria-controls", ctx_r1.getTabContentId($index_r6));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", tab_r5.label)("nzStringTemplateOutletContext", \u0275\u0275pureFunction0(19, _c9));
    \u0275\u0275advance();
    \u0275\u0275conditional(tab_r5.nzClosable && ctx_r1.closable && !tab_r5.nzDisabled ? 3 : -1);
  }
}
function NzTabsComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-tabs-nav", 4);
    \u0275\u0275listener("tabScroll", function NzTabsComponent_Conditional_0_Template_nz_tabs_nav_tabScroll_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.nzTabListScroll.emit($event));
    })("selectFocusedIndex", function NzTabsComponent_Conditional_0_Template_nz_tabs_nav_selectFocusedIndex_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setSelectedIndex($event));
    })("addClicked", function NzTabsComponent_Conditional_0_Template_nz_tabs_nav_addClicked_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAdd());
    });
    \u0275\u0275repeaterCreate(1, NzTabsComponent_Conditional_0_For_2_Template, 4, 20, "div", 5, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r1.nzTabBarStyle);
    \u0275\u0275property("selectedIndex", ctx_r1.nzSelectedIndex || 0)("inkBarAnimated", ctx_r1.inkBarAnimated)("addable", ctx_r1.addable)("addIcon", ctx_r1.nzAddIcon)("hideBar", ctx_r1.nzHideAll)("position", ctx_r1.position)("extraTemplate", ctx_r1.nzTabBarExtraContent)("extraContents", ctx_r1.extraContents())("indicator", ctx_r1.nzIndicator());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.tabs);
  }
}
function NzTabsComponent_Conditional_3_For_1_Conditional_0_ng_template_0_Template(rf, ctx) {
}
function NzTabsComponent_Conditional_3_For_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTabsComponent_Conditional_3_For_1_Conditional_0_ng_template_0_Template, 0, 0, "ng-template", 11);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const tabpaneTmpl_r8 = \u0275\u0275reference(4);
    \u0275\u0275property("ngTemplateOutlet", tabpaneTmpl_r8);
  }
}
function NzTabsComponent_Conditional_3_For_1_Conditional_1_Conditional_0_ng_template_0_Template(rf, ctx) {
}
function NzTabsComponent_Conditional_3_For_1_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTabsComponent_Conditional_3_For_1_Conditional_1_Conditional_0_ng_template_0_Template, 0, 0, "ng-template", 11);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const tabpaneTmpl_r8 = \u0275\u0275reference(4);
    \u0275\u0275property("ngTemplateOutlet", tabpaneTmpl_r8);
  }
}
function NzTabsComponent_Conditional_3_For_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTabsComponent_Conditional_3_For_1_Conditional_1_Conditional_0_Template, 1, 1, null, 11);
  }
  if (rf & 2) {
    const $index_r9 = \u0275\u0275nextContext().$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.nzSelectedIndex === $index_r9 ? 0 : -1);
  }
}
function NzTabsComponent_Conditional_3_For_1_Conditional_2_Conditional_0_ng_template_0_Template(rf, ctx) {
}
function NzTabsComponent_Conditional_3_For_1_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTabsComponent_Conditional_3_For_1_Conditional_2_Conditional_0_ng_template_0_Template, 0, 0, "ng-template", 11);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const tabpaneTmpl_r8 = \u0275\u0275reference(4);
    \u0275\u0275property("ngTemplateOutlet", tabpaneTmpl_r8);
  }
}
function NzTabsComponent_Conditional_3_For_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTabsComponent_Conditional_3_For_1_Conditional_2_Conditional_0_Template, 1, 1, null, 11);
  }
  if (rf & 2) {
    const ctx_r9 = \u0275\u0275nextContext();
    const tab_r11 = ctx_r9.$implicit;
    const $index_r9 = ctx_r9.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.nzSelectedIndex === $index_r9 || tab_r11.hasBeenActive ? 0 : -1);
  }
}
function NzTabsComponent_Conditional_3_For_1_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 12);
  }
  if (rf & 2) {
    const ctx_r9 = \u0275\u0275nextContext();
    const tab_r11 = ctx_r9.$implicit;
    const $index_r9 = ctx_r9.$index;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("id", ctx_r1.getTabContentId($index_r9))("active", ctx_r1.nzSelectedIndex === $index_r9)("content", tab_r11.content)("animated", ctx_r1.tabPaneAnimated);
    \u0275\u0275attribute("aria-labelledby", ctx_r1.getTabContentId($index_r9));
  }
}
function NzTabsComponent_Conditional_3_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTabsComponent_Conditional_3_For_1_Conditional_0_Template, 1, 1, null, 11)(1, NzTabsComponent_Conditional_3_For_1_Conditional_1_Template, 1, 1)(2, NzTabsComponent_Conditional_3_For_1_Conditional_2_Template, 1, 1);
    \u0275\u0275template(3, NzTabsComponent_Conditional_3_For_1_ng_template_3_Template, 1, 5, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    const tab_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(tab_r11.nzForceRender ? 0 : ctx_r1.nzDestroyInactiveTabPane ? 1 : 2);
  }
}
function NzTabsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, NzTabsComponent_Conditional_3_For_1_Template, 5, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.tabs);
  }
}
var NzTabChangeEvent = class {
  constructor() {
    __publicField(this, "index");
    __publicField(this, "tab");
  }
};
var _NzTabAddButtonComponent = class _NzTabAddButtonComponent {
  constructor() {
    __publicField(this, "addIcon", "plus");
    __publicField(this, "element", inject(ElementRef).nativeElement);
  }
  getElementWidth() {
    var _a;
    return ((_a = this.element) == null ? void 0 : _a.offsetWidth) || 0;
  }
  getElementHeight() {
    var _a;
    return ((_a = this.element) == null ? void 0 : _a.offsetHeight) || 0;
  }
};
__publicField(_NzTabAddButtonComponent, "\u0275fac", function NzTabAddButtonComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabAddButtonComponent)();
});
__publicField(_NzTabAddButtonComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTabAddButtonComponent,
  selectors: [["nz-tab-add-button"], ["button", "nz-tab-add-button", ""]],
  hostAttrs: ["aria-label", "Add tab", "type", "button", 1, "ant-tabs-nav-add"],
  inputs: {
    addIcon: "addIcon"
  },
  decls: 1,
  vars: 1,
  consts: [[4, "nzStringTemplateOutlet"], ["nzTheme", "outline", 3, "nzType"]],
  template: function NzTabAddButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzTabAddButtonComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("nzStringTemplateOutlet", ctx.addIcon);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective, NzIconModule, NzIconDirective],
  encapsulation: 2
}));
var NzTabAddButtonComponent = _NzTabAddButtonComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabAddButtonComponent, [{
    type: Component,
    args: [{
      selector: "nz-tab-add-button, button[nz-tab-add-button]",
      template: `
    <ng-container *nzStringTemplateOutlet="addIcon; let icon">
      <nz-icon [nzType]="icon" nzTheme="outline" />
    </ng-container>
  `,
      host: {
        class: "ant-tabs-nav-add",
        "aria-label": "Add tab",
        type: "button"
      },
      imports: [NzOutletModule, NzIconModule]
    }]
  }], null, {
    addIcon: [{
      type: Input
    }]
  });
})();
var _NzTabBarExtraContentDirective = class _NzTabBarExtraContentDirective {
  constructor() {
    __publicField(this, "position", input("end", __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "position"
    } : {}), {
      alias: "nzTabBarExtraContent"
    })));
    __publicField(this, "templateRef", inject(TemplateRef));
  }
};
__publicField(_NzTabBarExtraContentDirective, "\u0275fac", function NzTabBarExtraContentDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabBarExtraContentDirective)();
});
__publicField(_NzTabBarExtraContentDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTabBarExtraContentDirective,
  selectors: [["", "nzTabBarExtraContent", "", 5, "nz-tabs"]],
  inputs: {
    position: [1, "nzTabBarExtraContent", "position"]
  }
}));
var NzTabBarExtraContentDirective = _NzTabBarExtraContentDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabBarExtraContentDirective, [{
    type: Directive,
    args: [{
      selector: "[nzTabBarExtraContent]:not(nz-tabs)"
    }]
  }], null, {
    position: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzTabBarExtraContent",
        required: false
      }]
    }]
  });
})();
var CLASS_NAME = "ant-tabs-tabpane";
var ANIMATION_PREFIX = "ant-tabs-switch";
var ANIMATION_CLASS_MAP = {
  "enter-start": [generateClassName(ANIMATION_PREFIX, "enter"), generateClassName(ANIMATION_PREFIX, "enter-start")],
  "enter-active": [generateClassName(ANIMATION_PREFIX, "enter"), generateClassName(ANIMATION_PREFIX, "enter-active")],
  "leave-start": [generateClassName(ANIMATION_PREFIX, "leave"), generateClassName(ANIMATION_PREFIX, "leave-start")],
  "leave-active": [generateClassName(ANIMATION_PREFIX, "leave"), generateClassName(ANIMATION_PREFIX, "leave-active")],
  // If animation is enabled, we should hide the tabpane after the leave animation is done
  hidden: [generateClassName(CLASS_NAME, "hidden")],
  void: []
};
var _NzTabBodyComponent = class _NzTabBodyComponent {
  constructor() {
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "content", input(null, ...ngDevMode ? [{
      debugName: "content"
    }] : []));
    __publicField(this, "active", input(false, ...ngDevMode ? [{
      debugName: "active"
    }] : []));
    __publicField(this, "animated", input(true, ...ngDevMode ? [{
      debugName: "animated"
    }] : []));
    __publicField(this, "_animationState", signal("void", ...ngDevMode ? [{
      debugName: "_animationState"
    }] : []));
    __publicField(this, "_animationEnabled", isAnimationEnabled(() => this.animated()));
    __publicField(this, "class", computed(() => {
      const cls = [CLASS_NAME];
      if (this._animationEnabled()) {
        cls.push(...ANIMATION_CLASS_MAP[this._animationState()]);
      } else if (!this.active()) {
        cls.push(generateClassName(CLASS_NAME, "hidden"));
      }
      return cls;
    }, ...ngDevMode ? [{
      debugName: "class"
    }] : []));
    effect(() => {
      if (!this._animationEnabled()) {
        return;
      }
      if (!this.active()) {
        untracked(() => this._animationState.set("leave-start"));
        requestAnimationFrame(() => {
          this._animationState.set("leave-active");
        });
      } else {
        untracked(() => this._animationState.set("enter-start"));
        requestAnimationFrame(() => {
          this._animationState.set("enter-active");
        });
      }
    });
  }
  _onTransitionEnd(event) {
    if (event.target !== this.elementRef.nativeElement) {
      return;
    }
    const currentState = this._animationState();
    if (currentState === "enter-active") {
      this._animationState.set("void");
    } else if (currentState === "leave-active") {
      this._animationState.set("hidden");
    }
  }
};
__publicField(_NzTabBodyComponent, "\u0275fac", function NzTabBodyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabBodyComponent)();
});
__publicField(_NzTabBodyComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTabBodyComponent,
  selectors: [["", "nz-tab-body", ""]],
  hostVars: 6,
  hostBindings: function NzTabBodyComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("transitionend", function NzTabBodyComponent_transitionend_HostBindingHandler($event) {
        return ctx._onTransitionEnd($event);
      });
    }
    if (rf & 2) {
      \u0275\u0275attribute("tabindex", ctx.active() ? 0 : -1)("aria-hidden", !ctx.active());
      \u0275\u0275classMap(ctx.class());
      \u0275\u0275classProp("ant-tabs-tabpane-active", ctx.active());
    }
  },
  inputs: {
    content: [1, "content"],
    active: [1, "active"],
    animated: [1, "animated"]
  },
  exportAs: ["nzTabBody"],
  attrs: _c0,
  decls: 1,
  vars: 1,
  consts: [[3, "ngTemplateOutlet"]],
  template: function NzTabBodyComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzTabBodyComponent_ng_template_0_Template, 0, 0, "ng-template", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("ngTemplateOutlet", ctx.content());
    }
  },
  dependencies: [NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTabBodyComponent = _NzTabBodyComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabBodyComponent, [{
    type: Component,
    args: [{
      selector: "[nz-tab-body]",
      exportAs: "nzTabBody",
      imports: [NgTemplateOutlet],
      template: `<ng-template [ngTemplateOutlet]="content()" />`,
      host: {
        "[class]": "class()",
        "[class.ant-tabs-tabpane-active]": "active()",
        "[attr.tabindex]": "active() ? 0 : -1",
        "[attr.aria-hidden]": "!active()",
        "(transitionend)": "_onTransitionEnd($event)"
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], () => [], {
    content: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "content",
        required: false
      }]
    }],
    active: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "active",
        required: false
      }]
    }],
    animated: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "animated",
        required: false
      }]
    }]
  });
})();
var _NzTabCloseButtonComponent = class _NzTabCloseButtonComponent {
  constructor() {
    __publicField(this, "closeIcon", "close");
  }
};
__publicField(_NzTabCloseButtonComponent, "\u0275fac", function NzTabCloseButtonComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabCloseButtonComponent)();
});
__publicField(_NzTabCloseButtonComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTabCloseButtonComponent,
  selectors: [["nz-tab-close-button"], ["button", "nz-tab-close-button", ""]],
  hostAttrs: ["aria-label", "Close tab", "type", "button", 1, "ant-tabs-tab-remove"],
  inputs: {
    closeIcon: "closeIcon"
  },
  decls: 1,
  vars: 1,
  consts: [[4, "nzStringTemplateOutlet"], ["nzTheme", "outline", 3, "nzType"]],
  template: function NzTabCloseButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzTabCloseButtonComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
    }
    if (rf & 2) {
      \u0275\u0275property("nzStringTemplateOutlet", ctx.closeIcon);
    }
  },
  dependencies: [NzOutletModule, NzStringTemplateOutletDirective, NzIconModule, NzIconDirective],
  encapsulation: 2
}));
var NzTabCloseButtonComponent = _NzTabCloseButtonComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabCloseButtonComponent, [{
    type: Component,
    args: [{
      selector: "nz-tab-close-button, button[nz-tab-close-button]",
      template: `
    <ng-container *nzStringTemplateOutlet="closeIcon; let icon">
      <nz-icon [nzType]="icon" nzTheme="outline" />
    </ng-container>
  `,
      host: {
        class: "ant-tabs-tab-remove",
        "aria-label": "Close tab",
        type: "button"
      },
      imports: [NzOutletModule, NzIconModule]
    }]
  }], null, {
    closeIcon: [{
      type: Input
    }]
  });
})();
var _NzTabLinkTemplateDirective = class _NzTabLinkTemplateDirective {
  constructor() {
    __publicField(this, "templateRef", inject(TemplateRef, {
      host: true
    }));
  }
};
__publicField(_NzTabLinkTemplateDirective, "\u0275fac", function NzTabLinkTemplateDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabLinkTemplateDirective)();
});
__publicField(_NzTabLinkTemplateDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTabLinkTemplateDirective,
  selectors: [["ng-template", "nzTabLink", ""]],
  exportAs: ["nzTabLinkTemplate"]
}));
var NzTabLinkTemplateDirective = _NzTabLinkTemplateDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabLinkTemplateDirective, [{
    type: Directive,
    args: [{
      selector: "ng-template[nzTabLink]",
      exportAs: "nzTabLinkTemplate"
    }]
  }], null, null);
})();
var _NzTabLinkDirective = class _NzTabLinkDirective {
  constructor() {
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "routerLink", inject(RouterLink, {
      self: true,
      optional: true
    }));
  }
};
__publicField(_NzTabLinkDirective, "\u0275fac", function NzTabLinkDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabLinkDirective)();
});
__publicField(_NzTabLinkDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTabLinkDirective,
  selectors: [["a", "nz-tab-link", ""]],
  exportAs: ["nzTabLink"]
}));
var NzTabLinkDirective = _NzTabLinkDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabLinkDirective, [{
    type: Directive,
    args: [{
      selector: "a[nz-tab-link]",
      exportAs: "nzTabLink"
    }]
  }], null, null);
})();
var _NzTabNavItemDirective = class _NzTabNavItemDirective {
  constructor() {
    __publicField(this, "disabled", false);
    __publicField(this, "tab");
    __publicField(this, "active", false);
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "el", this.elementRef.nativeElement);
    __publicField(this, "parentElement", this.el.parentElement);
  }
  focus() {
    this.el.focus({
      preventScroll: true
    });
  }
  get width() {
    return this.parentElement.offsetWidth;
  }
  get height() {
    return this.parentElement.offsetHeight;
  }
  get left() {
    return this.parentElement.offsetLeft;
  }
  get top() {
    return this.parentElement.offsetTop;
  }
};
__publicField(_NzTabNavItemDirective, "\u0275fac", function NzTabNavItemDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabNavItemDirective)();
});
__publicField(_NzTabNavItemDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTabNavItemDirective,
  selectors: [["", "nzTabNavItem", ""]],
  inputs: {
    disabled: [2, "disabled", "disabled", booleanAttribute],
    tab: "tab",
    active: [2, "active", "active", booleanAttribute]
  }
}));
var NzTabNavItemDirective = _NzTabNavItemDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabNavItemDirective, [{
    type: Directive,
    args: [{
      selector: "[nzTabNavItem]"
    }]
  }], null, {
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tab: [{
      type: Input
    }],
    active: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzTabNavOperationComponent = class _NzTabNavOperationComponent {
  constructor() {
    __publicField(this, "items", []);
    __publicField(this, "addable", false);
    __publicField(this, "addIcon", "plus");
    __publicField(this, "addClicked", new EventEmitter());
    __publicField(this, "selected", new EventEmitter());
    __publicField(this, "closeAnimationWaitTimeoutId");
    __publicField(this, "menuOpened", false);
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "element", inject(ElementRef).nativeElement);
  }
  onSelect(item) {
    if (!item.disabled) {
      item.tab.nzClick.emit();
      this.selected.emit(item);
    }
  }
  onContextmenu(item, e) {
    if (!item.disabled) {
      item.tab.nzContextmenu.emit(e);
    }
  }
  showItems() {
    clearTimeout(this.closeAnimationWaitTimeoutId);
    this.menuOpened = true;
    this.cdr.markForCheck();
  }
  menuVisChange(visible) {
    if (!visible) {
      this.closeAnimationWaitTimeoutId = setTimeout(() => {
        this.menuOpened = false;
        this.cdr.markForCheck();
      }, 150);
    }
  }
  getElementWidth() {
    var _a;
    return ((_a = this.element) == null ? void 0 : _a.offsetWidth) || 0;
  }
  getElementHeight() {
    var _a;
    return ((_a = this.element) == null ? void 0 : _a.offsetHeight) || 0;
  }
  ngOnDestroy() {
    clearTimeout(this.closeAnimationWaitTimeoutId);
  }
};
__publicField(_NzTabNavOperationComponent, "\u0275fac", function NzTabNavOperationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabNavOperationComponent)();
});
__publicField(_NzTabNavOperationComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTabNavOperationComponent,
  selectors: [["nz-tab-nav-operation"]],
  hostAttrs: [1, "ant-tabs-nav-operations"],
  hostVars: 2,
  hostBindings: function NzTabNavOperationComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-tabs-nav-operations-hidden", ctx.items.length === 0);
    }
  },
  inputs: {
    items: "items",
    addable: [2, "addable", "addable", booleanAttribute],
    addIcon: "addIcon"
  },
  outputs: {
    addClicked: "addClicked",
    selected: "selected"
  },
  exportAs: ["nzTabNavOperation"],
  decls: 7,
  vars: 6,
  consts: [["dropdownTrigger", "nzDropdown"], ["menu", "nzDropdownMenu"], ["nz-dropdown", "", "type", "button", "tabindex", "-1", "aria-hidden", "true", "nzOverlayClassName", "nz-tabs-dropdown", 1, "ant-tabs-nav-more", 3, "nzVisibleChange", "mouseenter", "nzDropdownMenu", "nzOverlayStyle", "nzMatchWidthElement"], ["nzType", "ellipsis"], ["nz-menu", ""], ["nz-tab-add-button", "", 3, "addIcon"], ["nz-menu-item", "", 1, "ant-tabs-dropdown-menu-item", 3, "ant-tabs-dropdown-menu-item-disabled", "nzSelected", "nzDisabled"], ["nz-menu-item", "", 1, "ant-tabs-dropdown-menu-item", 3, "click", "contextmenu", "nzSelected", "nzDisabled"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], ["nz-tab-add-button", "", 3, "click", "addIcon"]],
  template: function NzTabNavOperationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "button", 2, 0);
      \u0275\u0275listener("nzVisibleChange", function NzTabNavOperationComponent_Template_button_nzVisibleChange_0_listener($event) {
        return ctx.menuVisChange($event);
      })("mouseenter", function NzTabNavOperationComponent_Template_button_mouseenter_0_listener() {
        return ctx.showItems();
      });
      \u0275\u0275element(2, "nz-icon", 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "nz-dropdown-menu", null, 1);
      \u0275\u0275conditionalCreate(5, NzTabNavOperationComponent_Conditional_5_Template, 3, 0, "ul", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, NzTabNavOperationComponent_Conditional_6_Template, 1, 1, "button", 5);
    }
    if (rf & 2) {
      const menu_r5 = \u0275\u0275reference(4);
      \u0275\u0275property("nzDropdownMenu", menu_r5)("nzOverlayStyle", \u0275\u0275pureFunction0(5, _c1))("nzMatchWidthElement", null);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.menuOpened ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.addable ? 6 : -1);
    }
  },
  dependencies: [NzDropdownModule, NzMenuDirective, NzMenuItemComponent, NzDropdownDirective, NzDropdownMenuComponent, NzIconModule, NzIconDirective, NzOutletModule, NzStringTemplateOutletDirective, NzTabAddButtonComponent, NzMenuModule],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTabNavOperationComponent = _NzTabNavOperationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabNavOperationComponent, [{
    type: Component,
    args: [{
      selector: "nz-tab-nav-operation",
      exportAs: "nzTabNavOperation",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <button
      nz-dropdown
      class="ant-tabs-nav-more"
      type="button"
      tabindex="-1"
      aria-hidden="true"
      nzOverlayClassName="nz-tabs-dropdown"
      #dropdownTrigger="nzDropdown"
      [nzDropdownMenu]="menu"
      [nzOverlayStyle]="{ minWidth: '46px' }"
      [nzMatchWidthElement]="null"
      (nzVisibleChange)="menuVisChange($event)"
      (mouseenter)="showItems()"
    >
      <nz-icon nzType="ellipsis" />
    </button>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      @if (menuOpened) {
        <ul nz-menu>
          @for (item of items; track item) {
            <li
              nz-menu-item
              class="ant-tabs-dropdown-menu-item"
              [class.ant-tabs-dropdown-menu-item-disabled]="item.disabled"
              [nzSelected]="item.active"
              [nzDisabled]="item.disabled"
              (click)="onSelect(item)"
              (contextmenu)="onContextmenu(item, $event)"
            >
              <ng-container *nzStringTemplateOutlet="item.tab.label; context: { visible: false }">
                {{ item.tab.label }}
              </ng-container>
            </li>
          }
        </ul>
      }
    </nz-dropdown-menu>
    @if (addable) {
      <button nz-tab-add-button [addIcon]="addIcon" (click)="addClicked.emit()"></button>
    }
  `,
      host: {
        class: "ant-tabs-nav-operations",
        "[class.ant-tabs-nav-operations-hidden]": "items.length === 0"
      },
      imports: [NzDropdownModule, NzIconModule, NzOutletModule, NzTabAddButtonComponent, NzMenuModule]
    }]
  }], null, {
    items: [{
      type: Input
    }],
    addable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    addIcon: [{
      type: Input
    }],
    addClicked: [{
      type: Output
    }],
    selected: [{
      type: Output
    }]
  });
})();
var MIN_SWIPE_DISTANCE = 0.1;
var STOP_SWIPE_DISTANCE = 0.01;
var REFRESH_INTERVAL = 20;
var SPEED_OFF_MULTIPLE = 0.995 ** REFRESH_INTERVAL;
var _NzTabScrollListDirective = class _NzTabScrollListDirective {
  constructor() {
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "el", inject(ElementRef).nativeElement);
    __publicField(this, "lastWheelDirection", null);
    __publicField(this, "lastWheelTimestamp", 0);
    __publicField(this, "lastTimestamp", 0);
    __publicField(this, "lastTimeDiff", 0);
    __publicField(this, "lastMixedWheel", 0);
    __publicField(this, "lastWheelPrevent", false);
    __publicField(this, "touchPosition", null);
    __publicField(this, "lastOffset", null);
    __publicField(this, "motion", -1);
    __publicField(this, "offsetChange", new EventEmitter());
    __publicField(this, "tabScroll", new EventEmitter());
    __publicField(this, "onTouchEnd", (e) => {
      if (!this.touchPosition) {
        return;
      }
      const lastOffset = this.lastOffset;
      const lastTimeDiff = this.lastTimeDiff;
      this.lastOffset = this.touchPosition = null;
      if (lastOffset) {
        const distanceX = lastOffset.x / lastTimeDiff;
        const distanceY = lastOffset.y / lastTimeDiff;
        const absX = Math.abs(distanceX);
        const absY = Math.abs(distanceY);
        if (Math.max(absX, absY) < MIN_SWIPE_DISTANCE) {
          return;
        }
        let currentX = distanceX;
        let currentY = distanceY;
        this.motion = window.setInterval(() => {
          if (Math.abs(currentX) < STOP_SWIPE_DISTANCE && Math.abs(currentY) < STOP_SWIPE_DISTANCE) {
            window.clearInterval(this.motion);
            return;
          }
          currentX *= SPEED_OFF_MULTIPLE;
          currentY *= SPEED_OFF_MULTIPLE;
          this.onOffset(currentX * REFRESH_INTERVAL, currentY * REFRESH_INTERVAL, e);
        }, REFRESH_INTERVAL);
      }
    });
    __publicField(this, "onTouchMove", (e) => {
      if (!this.touchPosition) {
        return;
      }
      e.preventDefault();
      const {
        screenX,
        screenY
      } = e.touches[0];
      const offsetX = screenX - this.touchPosition.x;
      const offsetY = screenY - this.touchPosition.y;
      this.onOffset(offsetX, offsetY, e);
      const now = Date.now();
      this.lastTimeDiff = now - this.lastTimestamp;
      this.lastTimestamp = now;
      this.lastOffset = {
        x: offsetX,
        y: offsetY
      };
      this.touchPosition = {
        x: screenX,
        y: screenY
      };
    });
    __publicField(this, "onTouchStart", (e) => {
      const {
        screenX,
        screenY
      } = e.touches[0];
      this.touchPosition = {
        x: screenX,
        y: screenY
      };
      window.clearInterval(this.motion);
    });
    __publicField(this, "onWheel", (e) => {
      const {
        deltaX,
        deltaY
      } = e;
      let mixed;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      if (absX === absY) {
        mixed = this.lastWheelDirection === "x" ? deltaX : deltaY;
      } else if (absX > absY) {
        mixed = deltaX;
        this.lastWheelDirection = "x";
      } else {
        mixed = deltaY;
        this.lastWheelDirection = "y";
      }
      const now = Date.now();
      const absMixed = Math.abs(mixed);
      if (now - this.lastWheelTimestamp > 100 || absMixed - this.lastMixedWheel > 10) {
        this.lastWheelPrevent = false;
      }
      this.onOffset(-mixed, -mixed, e);
      if (e.defaultPrevented || this.lastWheelPrevent) {
        this.lastWheelPrevent = true;
      }
      this.lastWheelTimestamp = now;
      this.lastMixedWheel = absMixed;
    });
  }
  ngOnInit() {
    const wheel$ = fromEventOutsideAngular(this.el, "wheel");
    const touchstart$ = fromEventOutsideAngular(this.el, "touchstart");
    const touchmove$ = fromEventOutsideAngular(this.el, "touchmove");
    const touchend$ = fromEventOutsideAngular(this.el, "touchend");
    this.subscribeWrap("wheel", wheel$, this.onWheel);
    this.subscribeWrap("touchstart", touchstart$, this.onTouchStart);
    this.subscribeWrap("touchmove", touchmove$, this.onTouchMove);
    this.subscribeWrap("touchend", touchend$, this.onTouchEnd);
  }
  subscribeWrap(type, observable, handler) {
    return observable.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      this.tabScroll.emit({
        type,
        event
      });
      if (!event.defaultPrevented) {
        handler(event);
      }
    });
  }
  onOffset(x, y, event) {
    if (this.offsetChange.observers.length) {
      this.ngZone.run(() => {
        this.offsetChange.emit({
          x,
          y,
          event
        });
      });
    }
  }
};
__publicField(_NzTabScrollListDirective, "\u0275fac", function NzTabScrollListDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabScrollListDirective)();
});
__publicField(_NzTabScrollListDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTabScrollListDirective,
  selectors: [["", "nzTabScrollList", ""]],
  outputs: {
    offsetChange: "offsetChange",
    tabScroll: "tabScroll"
  }
}));
var NzTabScrollListDirective = _NzTabScrollListDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabScrollListDirective, [{
    type: Directive,
    args: [{
      selector: "[nzTabScrollList]"
    }]
  }], null, {
    offsetChange: [{
      type: Output
    }],
    tabScroll: [{
      type: Output
    }]
  });
})();
var _NzTabsInkBarDirective = class _NzTabsInkBarDirective {
  constructor() {
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "el", inject(ElementRef).nativeElement);
    __publicField(this, "directionality", inject(Directionality).valueSignal);
    __publicField(this, "position", input("horizontal", ...ngDevMode ? [{
      debugName: "position"
    }] : []));
    __publicField(this, "animated", input(true, ...ngDevMode ? [{
      debugName: "animated"
    }] : []));
    __publicField(this, "indicator", input(...ngDevMode ? [void 0, {
      debugName: "indicator"
    }] : []));
    __publicField(this, "animationEnabled", isAnimationEnabled(() => this.animated()));
  }
  alignToElement(element) {
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.setStyles(element));
    });
  }
  setStyles(element) {
    var _a, _b, _c, _d;
    const {
      size,
      align
    } = this.indicator() || {};
    if (this.position() === "horizontal") {
      this.el.style.top = "";
      this.el.style.height = "";
      this.el.style.width = coerceCssPixelValue(size ? typeof size === "number" ? size : size((_a = element == null ? void 0 : element.offsetWidth) != null ? _a : 0) : (_b = element == null ? void 0 : element.offsetWidth) != null ? _b : 0);
      this.el.style.left = this.setIndicatorPosition(element, align);
    } else {
      this.el.style.left = "";
      this.el.style.width = "";
      this.el.style.height = coerceCssPixelValue(!isNil(size) ? typeof size === "number" ? size : size((_c = element == null ? void 0 : element.offsetHeight) != null ? _c : 0) : (_d = element == null ? void 0 : element.offsetHeight) != null ? _d : 0);
      this.el.style.top = this.setIndicatorPosition(element, align);
    }
  }
  setIndicatorPosition(element, align = "start") {
    var _a, _b, _c, _d;
    const isHorizontal = this.position() === "horizontal";
    const itemOffset = isHorizontal ? (_a = element == null ? void 0 : element.offsetLeft) != null ? _a : 0 : (_b = element == null ? void 0 : element.offsetTop) != null ? _b : 0;
    const itemSize = isHorizontal ? (_c = element == null ? void 0 : element.offsetWidth) != null ? _c : 0 : (_d = element == null ? void 0 : element.offsetHeight) != null ? _d : 0;
    const indicatorSize = isHorizontal ? this.el.offsetWidth : this.el.offsetHeight;
    const isRtl = isHorizontal && this.directionality() === "rtl";
    const resolvedAlign = isRtl && align !== "center" ? align === "start" ? "end" : "start" : align;
    switch (resolvedAlign) {
      case "start":
        return coerceCssPixelValue(itemOffset);
      case "end":
        return coerceCssPixelValue(itemOffset + itemSize - (indicatorSize || 0));
      case "center":
        return coerceCssPixelValue(itemOffset + (itemSize - (indicatorSize || 0)) / 2);
    }
  }
};
__publicField(_NzTabsInkBarDirective, "\u0275fac", function NzTabsInkBarDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabsInkBarDirective)();
});
__publicField(_NzTabsInkBarDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTabsInkBarDirective,
  selectors: [["nz-tabs-ink-bar"], ["", "nz-tabs-ink-bar", ""]],
  hostAttrs: [1, "ant-tabs-ink-bar"],
  hostVars: 2,
  hostBindings: function NzTabsInkBarDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-tabs-ink-bar-animated", ctx.animationEnabled());
    }
  },
  inputs: {
    position: [1, "position"],
    animated: [1, "animated"],
    indicator: [1, "indicator"]
  }
}));
var NzTabsInkBarDirective = _NzTabsInkBarDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabsInkBarDirective, [{
    type: Directive,
    args: [{
      selector: "nz-tabs-ink-bar, [nz-tabs-ink-bar]",
      host: {
        class: "ant-tabs-ink-bar",
        "[class.ant-tabs-ink-bar-animated]": "animationEnabled()"
      }
    }]
  }], null, {
    position: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "position",
        required: false
      }]
    }],
    animated: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "animated",
        required: false
      }]
    }],
    indicator: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "indicator",
        required: false
      }]
    }]
  });
})();
var RESIZE_SCHEDULER = typeof requestAnimationFrame !== "undefined" ? animationFrameScheduler : asapScheduler;
var CSS_TRANSFORM_TIME = 150;
var _NzTabNavBarComponent = class _NzTabNavBarComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "viewportRuler", inject(ViewportRuler));
    __publicField(this, "nzResizeObserver", inject(NzResizeObserver));
    __publicField(this, "dir", inject(Directionality));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "indexFocused", new EventEmitter());
    __publicField(this, "selectFocusedIndex", new EventEmitter());
    __publicField(this, "addClicked", new EventEmitter());
    __publicField(this, "tabScroll", new EventEmitter());
    __publicField(this, "position", "horizontal");
    __publicField(this, "addable", false);
    __publicField(this, "hideBar", false);
    __publicField(this, "addIcon", "plus");
    __publicField(this, "inkBarAnimated", true);
    __publicField(this, "extraTemplate");
    __publicField(this, "extraContents", input.required(...ngDevMode ? [{
      debugName: "extraContents"
    }] : []));
    __publicField(this, "indicator", input(...ngDevMode ? [void 0, {
      debugName: "indicator"
    }] : []));
    __publicField(this, "startExtraContent", computed(() => this.extraContents().find((item) => item.position() === "start"), ...ngDevMode ? [{
      debugName: "startExtraContent"
    }] : []));
    __publicField(this, "endExtraContent", computed(() => this.extraContents().find((item) => item.position() === "end"), ...ngDevMode ? [{
      debugName: "endExtraContent"
    }] : []));
    __publicField(this, "navWrapRef");
    __publicField(this, "navListRef");
    __publicField(this, "operationRef");
    __publicField(this, "addBtnRef");
    __publicField(this, "inkBar");
    __publicField(this, "items");
    __publicField(this, "translate", null);
    __publicField(this, "transformX", 0);
    __publicField(this, "transformY", 0);
    __publicField(this, "pingLeft", false);
    __publicField(this, "pingRight", false);
    __publicField(this, "pingTop", false);
    __publicField(this, "pingBottom", false);
    __publicField(this, "hiddenItems", []);
    __publicField(this, "keyManager");
    __publicField(this, "_selectedIndex", 0);
    __publicField(this, "wrapperWidth", 0);
    __publicField(this, "wrapperHeight", 0);
    __publicField(this, "scrollListWidth", 0);
    __publicField(this, "scrollListHeight", 0);
    __publicField(this, "operationWidth", 0);
    __publicField(this, "operationHeight", 0);
    __publicField(this, "addButtonWidth", 0);
    __publicField(this, "addButtonHeight", 0);
    __publicField(this, "selectedIndexChanged", false);
    __publicField(this, "lockAnimationTimeoutId");
    __publicField(this, "cssTransformTimeWaitingId");
    this.destroyRef.onDestroy(() => {
      clearTimeout(this.lockAnimationTimeoutId);
      clearTimeout(this.cssTransformTimeWaitingId);
    });
  }
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(value) {
    const newValue = coerceNumberProperty(value);
    if (this._selectedIndex !== newValue) {
      this._selectedIndex = value;
      this.selectedIndexChanged = true;
      if (this.keyManager) {
        this.keyManager.updateActiveItem(value);
      }
    }
  }
  /** Tracks which element has focus; used for keyboard navigation */
  get focusIndex() {
    return this.keyManager ? this.keyManager.activeItemIndex : 0;
  }
  /** When the focus index is set, we must manually send focus to the correct label */
  set focusIndex(value) {
    if (!this.isValidIndex(value) || this.focusIndex === value || !this.keyManager) {
      return;
    }
    this.keyManager.setActiveItem(value);
  }
  get showAddButton() {
    return this.hiddenItems.length === 0 && this.addable;
  }
  ngAfterViewInit() {
    const dirChange = this.dir ? this.dir.change.asObservable() : of(null);
    const resize = this.viewportRuler.change(150);
    const realign = () => {
      this.updateScrollListPosition();
      this.alignInkBarToSelectedTab();
    };
    this.keyManager = new FocusKeyManager(this.items).withHorizontalOrientation(this.getLayoutDirection()).withWrap();
    this.keyManager.updateActiveItem(this.selectedIndex);
    requestAnimationFrame(realign);
    merge(this.nzResizeObserver.observe(this.navWrapRef), this.nzResizeObserver.observe(this.navListRef)).pipe(takeUntilDestroyed(this.destroyRef), auditTime(16, RESIZE_SCHEDULER)).subscribe(() => {
      realign();
    });
    merge(dirChange, resize, this.items.changes).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      Promise.resolve().then(realign);
      this.keyManager.withHorizontalOrientation(this.getLayoutDirection());
    });
    this.keyManager.change.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((newFocusIndex) => {
      this.indexFocused.emit(newFocusIndex);
      this.scrollToTab(this.keyManager.activeItem);
    });
  }
  ngAfterContentChecked() {
    if (this.selectedIndexChanged) {
      this.updateScrollListPosition();
      this.alignInkBarToSelectedTab();
      this.selectedIndexChanged = false;
      this.cdr.markForCheck();
    }
  }
  onSelectedFromMenu(tab) {
    const tabIndex = this.items.toArray().findIndex((e) => e === tab);
    if (tabIndex !== -1) {
      this.keyManager.updateActiveItem(tabIndex);
      if (this.focusIndex !== this.selectedIndex) {
        this.selectFocusedIndex.emit(this.focusIndex);
        this.scrollToTab(tab);
      }
    }
  }
  onOffsetChange(e) {
    if (this.position === "horizontal") {
      if (!this.lockAnimationTimeoutId) {
        if (this.transformX >= 0 && e.x > 0) {
          return;
        }
        if (this.transformX <= this.wrapperWidth - this.scrollListWidth && e.x < 0) {
          return;
        }
      }
      e.event.preventDefault();
      this.transformX = this.clampTransformX(this.transformX + e.x);
      this.setTransform(this.transformX, 0);
    } else {
      if (!this.lockAnimationTimeoutId) {
        if (this.transformY >= 0 && e.y > 0) {
          return;
        }
        if (this.transformY <= this.wrapperHeight - this.scrollListHeight && e.y < 0) {
          return;
        }
      }
      e.event.preventDefault();
      this.transformY = this.clampTransformY(this.transformY + e.y);
      this.setTransform(0, this.transformY);
    }
    this.lockAnimation();
    this.setVisibleRange();
    this.setPingStatus();
  }
  handleKeydown(event) {
    const inNavigationList = this.navWrapRef.nativeElement.contains(event.target);
    if (hasModifierKey(event) || !inNavigationList) {
      return;
    }
    switch (event.keyCode) {
      case LEFT_ARROW:
      case UP_ARROW:
      case RIGHT_ARROW:
      case DOWN_ARROW:
        this.lockAnimation();
        this.keyManager.onKeydown(event);
        break;
      case ENTER:
      case SPACE:
        if (this.focusIndex !== this.selectedIndex) {
          this.selectFocusedIndex.emit(this.focusIndex);
        }
        break;
      default:
        this.keyManager.onKeydown(event);
    }
  }
  isValidIndex(index) {
    if (!this.items) {
      return true;
    }
    const tab = this.items ? this.items.toArray()[index] : null;
    return !!tab && !tab.disabled;
  }
  scrollToTab(tab) {
    if (!this.items.find((e) => e === tab)) {
      return;
    }
    const tabs = this.items.toArray();
    if (this.position === "horizontal") {
      let newTransform = this.transformX;
      if (this.getLayoutDirection() === "rtl") {
        const right = tabs[0].left + tabs[0].width - tab.left - tab.width;
        if (right < this.transformX) {
          newTransform = right;
        } else if (right + tab.width > this.transformX + this.wrapperWidth) {
          newTransform = right + tab.width - this.wrapperWidth;
        }
      } else if (tab.left < -this.transformX) {
        newTransform = -tab.left;
      } else if (tab.left + tab.width > -this.transformX + this.wrapperWidth) {
        newTransform = -(tab.left + tab.width - this.wrapperWidth);
      }
      this.transformX = newTransform;
      this.transformY = 0;
      this.setTransform(newTransform, 0);
    } else {
      let newTransform = this.transformY;
      if (tab.top < -this.transformY) {
        newTransform = -tab.top;
      } else if (tab.top + tab.height > -this.transformY + this.wrapperHeight) {
        newTransform = -(tab.top + tab.height - this.wrapperHeight);
      }
      this.transformY = newTransform;
      this.transformX = 0;
      this.setTransform(0, newTransform);
    }
    clearTimeout(this.cssTransformTimeWaitingId);
    this.cssTransformTimeWaitingId = setTimeout(() => {
      this.setVisibleRange();
    }, CSS_TRANSFORM_TIME);
  }
  lockAnimation() {
    if (!this.lockAnimationTimeoutId) {
      this.ngZone.runOutsideAngular(() => {
        this.navListRef.nativeElement.style.transition = "none";
        this.lockAnimationTimeoutId = setTimeout(() => {
          this.navListRef.nativeElement.style.transition = "";
          this.lockAnimationTimeoutId = void 0;
        }, CSS_TRANSFORM_TIME);
      });
    }
  }
  setTransform(x, y) {
    this.navListRef.nativeElement.style.transform = `translate(${x}px, ${y}px)`;
  }
  clampTransformX(transform) {
    const scrollWidth = this.wrapperWidth - this.scrollListWidth;
    if (this.getLayoutDirection() === "rtl") {
      return Math.max(Math.min(scrollWidth, transform), 0);
    } else {
      return Math.min(Math.max(scrollWidth, transform), 0);
    }
  }
  clampTransformY(transform) {
    return Math.min(Math.max(this.wrapperHeight - this.scrollListHeight, transform), 0);
  }
  updateScrollListPosition() {
    this.resetSizes();
    this.transformX = this.clampTransformX(this.transformX);
    this.transformY = this.clampTransformY(this.transformY);
    this.setVisibleRange();
    this.setPingStatus();
    if (this.keyManager) {
      this.keyManager.updateActiveItem(this.keyManager.activeItemIndex);
      if (this.keyManager.activeItem) {
        this.scrollToTab(this.keyManager.activeItem);
      }
    }
  }
  resetSizes() {
    this.addButtonWidth = this.addBtnRef ? this.addBtnRef.getElementWidth() : 0;
    this.addButtonHeight = this.addBtnRef ? this.addBtnRef.getElementHeight() : 0;
    this.operationWidth = this.operationRef.getElementWidth();
    this.operationHeight = this.operationRef.getElementHeight();
    this.wrapperWidth = this.navWrapRef.nativeElement.offsetWidth || 0;
    this.wrapperHeight = this.navWrapRef.nativeElement.offsetHeight || 0;
    this.scrollListHeight = this.navListRef.nativeElement.offsetHeight || 0;
    this.scrollListWidth = this.navListRef.nativeElement.offsetWidth || 0;
  }
  alignInkBarToSelectedTab() {
    const selectedItem = this.items && this.items.length ? this.items.toArray()[this.selectedIndex] : null;
    const selectedItemElement = selectedItem ? selectedItem.elementRef.nativeElement : null;
    if (selectedItemElement) {
      this.inkBar.alignToElement(selectedItemElement.parentElement);
    }
  }
  setPingStatus() {
    const ping = {
      top: false,
      right: false,
      bottom: false,
      left: false
    };
    const navWrap = this.navWrapRef.nativeElement;
    if (this.position === "horizontal") {
      if (this.getLayoutDirection() === "rtl") {
        ping.right = this.transformX > 0;
        ping.left = this.transformX + this.wrapperWidth < this.scrollListWidth;
      } else {
        ping.left = this.transformX < 0;
        ping.right = -this.transformX + this.wrapperWidth < this.scrollListWidth;
      }
    } else {
      ping.top = this.transformY < 0;
      ping.bottom = -this.transformY + this.wrapperHeight < this.scrollListHeight;
    }
    Object.keys(ping).forEach((pos) => {
      const className = `ant-tabs-nav-wrap-ping-${pos}`;
      if (ping[pos]) {
        navWrap.classList.add(className);
      } else {
        navWrap.classList.remove(className);
      }
    });
  }
  setVisibleRange() {
    let unit;
    let position;
    let transformSize;
    let basicSize;
    let tabContentSize;
    let addSize;
    const tabs = this.items.toArray();
    const DEFAULT_SIZE = {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      right: 0
    };
    const getOffset = (index) => {
      let offset;
      const size = tabs[index] || DEFAULT_SIZE;
      if (position === "right") {
        offset = tabs[0].left + tabs[0].width - tabs[index].left - tabs[index].width;
      } else {
        offset = size[position];
      }
      return offset;
    };
    if (this.position === "horizontal") {
      unit = "width";
      basicSize = this.wrapperWidth;
      tabContentSize = this.scrollListWidth - (this.hiddenItems.length ? this.operationWidth : 0);
      addSize = this.addButtonWidth;
      transformSize = Math.abs(this.transformX);
      if (this.getLayoutDirection() === "rtl") {
        position = "right";
        this.pingRight = this.transformX > 0;
        this.pingLeft = this.transformX + this.wrapperWidth < this.scrollListWidth;
      } else {
        this.pingLeft = this.transformX < 0;
        this.pingRight = -this.transformX + this.wrapperWidth < this.scrollListWidth;
        position = "left";
      }
    } else {
      unit = "height";
      basicSize = this.wrapperHeight;
      tabContentSize = this.scrollListHeight - (this.hiddenItems.length ? this.operationHeight : 0);
      addSize = this.addButtonHeight;
      position = "top";
      transformSize = -this.transformY;
      this.pingTop = this.transformY < 0;
      this.pingBottom = -this.transformY + this.wrapperHeight < this.scrollListHeight;
    }
    let mergedBasicSize = basicSize;
    if (tabContentSize + addSize > basicSize) {
      mergedBasicSize = basicSize - addSize;
    }
    if (!tabs.length) {
      this.hiddenItems = [];
      this.cdr.markForCheck();
      return;
    }
    const len = tabs.length;
    let endIndex = len;
    for (let i = 0; i < len; i += 1) {
      const offset = getOffset(i);
      const size = tabs[i] || DEFAULT_SIZE;
      if (offset + size[unit] > transformSize + mergedBasicSize) {
        endIndex = i - 1;
        break;
      }
    }
    let startIndex = 0;
    for (let i = len - 1; i >= 0; i -= 1) {
      const offset = getOffset(i);
      if (offset < transformSize) {
        startIndex = i + 1;
        break;
      }
    }
    const startHiddenTabs = tabs.slice(0, startIndex);
    const endHiddenTabs = tabs.slice(endIndex + 1);
    this.hiddenItems = [...startHiddenTabs, ...endHiddenTabs];
    this.cdr.markForCheck();
  }
  getLayoutDirection() {
    return this.dir && this.dir.value === "rtl" ? "rtl" : "ltr";
  }
  ngOnChanges(changes) {
    const {
      position,
      indicator
    } = changes;
    if (position && !position.isFirstChange()) {
      this.updateScrollListPosition();
    }
    if (position && !position.isFirstChange() || indicator && !indicator.isFirstChange()) {
      this.alignInkBarToSelectedTab();
      this.lockAnimation();
    }
  }
};
__publicField(_NzTabNavBarComponent, "\u0275fac", function NzTabNavBarComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabNavBarComponent)();
});
__publicField(_NzTabNavBarComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTabNavBarComponent,
  selectors: [["nz-tabs-nav"]],
  contentQueries: function NzTabNavBarComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzTabNavItemDirective, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.items = _t);
    }
  },
  viewQuery: function NzTabNavBarComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c3, 7)(_c4, 7)(NzTabNavOperationComponent, 7)(NzTabAddButtonComponent, 5)(NzTabsInkBarDirective, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.navWrapRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.navListRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.operationRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.addBtnRef = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.inkBar = _t.first);
    }
  },
  hostAttrs: [1, "ant-tabs-nav"],
  hostBindings: function NzTabNavBarComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown", function NzTabNavBarComponent_keydown_HostBindingHandler($event) {
        return ctx.handleKeydown($event);
      });
    }
  },
  inputs: {
    position: "position",
    addable: [2, "addable", "addable", booleanAttribute],
    hideBar: [2, "hideBar", "hideBar", booleanAttribute],
    addIcon: "addIcon",
    inkBarAnimated: "inkBarAnimated",
    extraTemplate: "extraTemplate",
    extraContents: [1, "extraContents"],
    indicator: [1, "indicator"],
    selectedIndex: "selectedIndex"
  },
  outputs: {
    indexFocused: "indexFocused",
    selectFocusedIndex: "selectFocusedIndex",
    addClicked: "addClicked",
    tabScroll: "tabScroll"
  },
  exportAs: ["nzTabsNav"],
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c5,
  decls: 11,
  vars: 18,
  consts: [["navWrap", ""], ["navList", ""], [1, "ant-tabs-extra-content"], [1, "ant-tabs-nav-wrap"], ["nzTabScrollList", "", "role", "tablist", 1, "ant-tabs-nav-list", 3, "offsetChange", "tabScroll"], ["role", "tab", "nz-tab-add-button", "", 3, "addIcon"], ["nz-tabs-ink-bar", "", 3, "hidden", "position", "animated", "indicator"], [3, "addClicked", "selected", "addIcon", "addable", "items"], [3, "ngTemplateOutlet"], ["role", "tab", "nz-tab-add-button", "", 3, "click", "addIcon"]],
  template: function NzTabNavBarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275conditionalCreate(0, NzTabNavBarComponent_Conditional_0_Template, 2, 1, "div", 2);
      \u0275\u0275elementStart(1, "div", 3, 0)(3, "div", 4, 1);
      \u0275\u0275listener("offsetChange", function NzTabNavBarComponent_Template_div_offsetChange_3_listener($event) {
        return ctx.onOffsetChange($event);
      })("tabScroll", function NzTabNavBarComponent_Template_div_tabScroll_3_listener($event) {
        return ctx.tabScroll.emit($event);
      });
      \u0275\u0275projection(5);
      \u0275\u0275conditionalCreate(6, NzTabNavBarComponent_Conditional_6_Template, 1, 2, "button", 5);
      \u0275\u0275element(7, "div", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "nz-tab-nav-operation", 7);
      \u0275\u0275listener("addClicked", function NzTabNavBarComponent_Template_nz_tab_nav_operation_addClicked_8_listener() {
        return ctx.addClicked.emit();
      })("selected", function NzTabNavBarComponent_Template_nz_tab_nav_operation_selected_8_listener($event) {
        return ctx.onSelectedFromMenu($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(9, NzTabNavBarComponent_Conditional_9_Template, 2, 1, "div", 2)(10, NzTabNavBarComponent_Conditional_10_Template, 2, 1, "div", 2);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.startExtraContent() ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275classProp("ant-tabs-nav-wrap-ping-left", ctx.pingLeft)("ant-tabs-nav-wrap-ping-right", ctx.pingRight)("ant-tabs-nav-wrap-ping-top", ctx.pingTop)("ant-tabs-nav-wrap-ping-bottom", ctx.pingBottom);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.showAddButton ? 6 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("hidden", ctx.hideBar)("position", ctx.position)("animated", ctx.inkBarAnimated)("indicator", ctx.indicator());
      \u0275\u0275advance();
      \u0275\u0275property("addIcon", ctx.addIcon)("addable", ctx.addable)("items", ctx.hiddenItems);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.endExtraContent() ? 9 : ctx.extraTemplate ? 10 : -1);
    }
  },
  dependencies: [NzTabScrollListDirective, NzTabAddButtonComponent, NzTabsInkBarDirective, NzTabNavOperationComponent, NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTabNavBarComponent = _NzTabNavBarComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabNavBarComponent, [{
    type: Component,
    args: [{
      selector: "nz-tabs-nav",
      exportAs: "nzTabsNav",
      imports: [NzTabScrollListDirective, NzTabAddButtonComponent, NzTabsInkBarDirective, NzTabNavOperationComponent, NgTemplateOutlet],
      template: `
    @if (startExtraContent()) {
      <div class="ant-tabs-extra-content">
        <ng-template [ngTemplateOutlet]="startExtraContent()!.templateRef" />
      </div>
    }
    <div
      class="ant-tabs-nav-wrap"
      [class.ant-tabs-nav-wrap-ping-left]="pingLeft"
      [class.ant-tabs-nav-wrap-ping-right]="pingRight"
      [class.ant-tabs-nav-wrap-ping-top]="pingTop"
      [class.ant-tabs-nav-wrap-ping-bottom]="pingBottom"
      #navWrap
    >
      <div
        class="ant-tabs-nav-list"
        #navList
        nzTabScrollList
        (offsetChange)="onOffsetChange($event)"
        (tabScroll)="tabScroll.emit($event)"
        role="tablist"
      >
        <ng-content />
        @if (showAddButton) {
          <button
            role="tab"
            [attr.tabindex]="-1"
            nz-tab-add-button
            [addIcon]="addIcon"
            (click)="addClicked.emit()"
          ></button>
        }
        <div
          nz-tabs-ink-bar
          [hidden]="hideBar"
          [position]="position"
          [animated]="inkBarAnimated"
          [indicator]="indicator()"
        ></div>
      </div>
    </div>
    <nz-tab-nav-operation
      (addClicked)="addClicked.emit()"
      (selected)="onSelectedFromMenu($event)"
      [addIcon]="addIcon"
      [addable]="addable"
      [items]="hiddenItems"
    />
    @if (endExtraContent()) {
      <div class="ant-tabs-extra-content">
        <ng-template [ngTemplateOutlet]="endExtraContent()!.templateRef" />
      </div>
    } @else if (extraTemplate) {
      <div class="ant-tabs-extra-content">
        <ng-template [ngTemplateOutlet]="extraTemplate" />
      </div>
    }
  `,
      host: {
        class: "ant-tabs-nav",
        "(keydown)": "handleKeydown($event)"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None
    }]
  }], () => [], {
    indexFocused: [{
      type: Output
    }],
    selectFocusedIndex: [{
      type: Output
    }],
    addClicked: [{
      type: Output
    }],
    tabScroll: [{
      type: Output
    }],
    position: [{
      type: Input
    }],
    addable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideBar: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    addIcon: [{
      type: Input
    }],
    inkBarAnimated: [{
      type: Input
    }],
    extraTemplate: [{
      type: Input
    }],
    extraContents: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "extraContents",
        required: true
      }]
    }],
    indicator: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "indicator",
        required: false
      }]
    }],
    selectedIndex: [{
      type: Input
    }],
    navWrapRef: [{
      type: ViewChild,
      args: ["navWrap", {
        static: true
      }]
    }],
    navListRef: [{
      type: ViewChild,
      args: ["navList", {
        static: true
      }]
    }],
    operationRef: [{
      type: ViewChild,
      args: [NzTabNavOperationComponent, {
        static: true
      }]
    }],
    addBtnRef: [{
      type: ViewChild,
      args: [NzTabAddButtonComponent, {
        static: false
      }]
    }],
    inkBar: [{
      type: ViewChild,
      args: [NzTabsInkBarDirective, {
        static: true
      }]
    }],
    items: [{
      type: ContentChildren,
      args: [NzTabNavItemDirective, {
        descendants: true
      }]
    }]
  });
})();
var _NzTabDirective = class _NzTabDirective {
};
__publicField(_NzTabDirective, "\u0275fac", function NzTabDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabDirective)();
});
__publicField(_NzTabDirective, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzTabDirective,
  selectors: [["", "nz-tab", ""]],
  exportAs: ["nzTab"]
}));
var NzTabDirective = _NzTabDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-tab]",
      exportAs: "nzTab"
    }]
  }], null, null);
})();
var NZ_TAB_SET = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "nz-tabs" : "");
var _NzTabComponent = class _NzTabComponent {
  constructor() {
    __publicField(this, "nzTitle", "");
    __publicField(this, "nzClosable", false);
    __publicField(this, "nzCloseIcon", "close");
    __publicField(this, "nzDisabled", false);
    __publicField(this, "nzForceRender", false);
    __publicField(this, "nzSelect", new EventEmitter());
    __publicField(this, "nzDeselect", new EventEmitter());
    __publicField(this, "nzClick", new EventEmitter());
    __publicField(this, "nzContextmenu", new EventEmitter());
    __publicField(this, "nzTabLinkTemplateDirective");
    __publicField(this, "template", null);
    __publicField(this, "linkDirective");
    __publicField(this, "contentTemplate");
    __publicField(this, "isActive", false);
    __publicField(this, "hasBeenActive", false);
    __publicField(this, "position", null);
    __publicField(this, "origin", null);
    __publicField(this, "closestTabSet", inject(NZ_TAB_SET));
    __publicField(this, "stateChanges", new Subject());
  }
  get content() {
    return this.template || this.contentTemplate;
  }
  get label() {
    var _a;
    return this.nzTitle || ((_a = this.nzTabLinkTemplateDirective) == null ? void 0 : _a.templateRef);
  }
  ngOnChanges(changes) {
    const {
      nzTitle,
      nzDisabled,
      nzForceRender
    } = changes;
    if (nzTitle || nzDisabled || nzForceRender) {
      this.stateChanges.next();
    }
  }
  ngOnDestroy() {
    this.stateChanges.complete();
  }
  setActive(active) {
    this.isActive = active;
    if (active) {
      this.hasBeenActive = true;
    }
  }
};
__publicField(_NzTabComponent, "\u0275fac", function NzTabComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabComponent)();
});
__publicField(_NzTabComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTabComponent,
  selectors: [["nz-tab"]],
  contentQueries: function NzTabComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, NzTabLinkTemplateDirective, 5)(dirIndex, NzTabDirective, 5, TemplateRef)(dirIndex, NzTabLinkDirective, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzTabLinkTemplateDirective = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.template = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.linkDirective = _t.first);
    }
  },
  viewQuery: function NzTabComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c6, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.contentTemplate = _t.first);
    }
  },
  inputs: {
    nzTitle: "nzTitle",
    nzClosable: [2, "nzClosable", "nzClosable", booleanAttribute],
    nzCloseIcon: "nzCloseIcon",
    nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
    nzForceRender: [2, "nzForceRender", "nzForceRender", booleanAttribute]
  },
  outputs: {
    nzSelect: "nzSelect",
    nzDeselect: "nzDeselect",
    nzClick: "nzClick",
    nzContextmenu: "nzContextmenu"
  },
  exportAs: ["nzTab"],
  features: [\u0275\u0275NgOnChangesFeature],
  ngContentSelectors: _c8,
  decls: 4,
  vars: 0,
  consts: [["tabLinkTemplate", ""], ["contentTemplate", ""]],
  template: function NzTabComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c7);
      \u0275\u0275domTemplate(0, NzTabComponent_ng_template_0_Template, 1, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(2, NzTabComponent_ng_template_2_Template, 1, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzTabComponent = _NzTabComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabComponent, [{
    type: Component,
    args: [{
      selector: "nz-tab",
      exportAs: "nzTab",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <ng-template #tabLinkTemplate>
      <ng-content select="[nz-tab-link]" />
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
  `
    }]
  }], null, {
    nzTitle: [{
      type: Input
    }],
    nzClosable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCloseIcon: [{
      type: Input
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzForceRender: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSelect: [{
      type: Output
    }],
    nzDeselect: [{
      type: Output
    }],
    nzClick: [{
      type: Output
    }],
    nzContextmenu: [{
      type: Output
    }],
    nzTabLinkTemplateDirective: [{
      type: ContentChild,
      args: [NzTabLinkTemplateDirective, {
        static: false
      }]
    }],
    template: [{
      type: ContentChild,
      args: [NzTabDirective, {
        static: false,
        read: TemplateRef
      }]
    }],
    linkDirective: [{
      type: ContentChild,
      args: [NzTabLinkDirective, {
        static: false
      }]
    }],
    contentTemplate: [{
      type: ViewChild,
      args: ["contentTemplate", {
        static: true
      }]
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME = "tabs";
var nextId = 0;
var NzTabsComponent = (() => {
  var _a;
  let _nzType_decorators;
  let _nzType_initializers = [];
  let _nzType_extraInitializers = [];
  let _nzSize_decorators;
  let _nzSize_initializers = [];
  let _nzSize_extraInitializers = [];
  let _nzAnimated_decorators;
  let _nzAnimated_initializers = [];
  let _nzAnimated_extraInitializers = [];
  let _nzTabBarGutter_decorators;
  let _nzTabBarGutter_initializers = [];
  let _nzTabBarGutter_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME);
      __publicField(this, "nzConfigService", inject(NzConfigService));
      __publicField(this, "ngZone", inject(NgZone));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "directionality", inject(Directionality));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "nzTabPosition", "top");
      __publicField(this, "nzTabBarExtraContent");
      __publicField(this, "nzCanDeactivate", null);
      __publicField(this, "nzAddIcon", "plus");
      __publicField(this, "nzTabBarStyle", null);
      __publicField(this, "nzType", __runInitializers(this, _nzType_initializers, "line"));
      __publicField(this, "nzSize", (__runInitializers(this, _nzType_extraInitializers), __runInitializers(this, _nzSize_initializers, "default")));
      __publicField(this, "nzAnimated", (__runInitializers(this, _nzSize_extraInitializers), __runInitializers(this, _nzAnimated_initializers, true)));
      __publicField(this, "nzTabBarGutter", (__runInitializers(this, _nzAnimated_extraInitializers), __runInitializers(this, _nzTabBarGutter_initializers, void 0)));
      __publicField(this, "nzHideAdd", (__runInitializers(this, _nzTabBarGutter_extraInitializers), false));
      __publicField(this, "nzCentered", false);
      __publicField(this, "nzHideAll", false);
      __publicField(this, "nzLinkRouter", false);
      __publicField(this, "nzLinkExact", true);
      __publicField(this, "nzDestroyInactiveTabPane", false);
      __publicField(this, "nzIndicator", input(...ngDevMode ? [void 0, {
        debugName: "nzIndicator"
      }] : []));
      __publicField(this, "nzSelectChange", new EventEmitter(true));
      __publicField(this, "nzSelectedIndexChange", new EventEmitter());
      __publicField(this, "nzTabListScroll", new EventEmitter());
      __publicField(this, "nzClose", new EventEmitter());
      __publicField(this, "nzAdd", new EventEmitter());
      // Pick up only direct descendants under ivy rendering engine
      // We filter out only the tabs that belong to this tab set in `tabs`.
      __publicField(this, "allTabs", new QueryList());
      __publicField(this, "tabLinks", new QueryList());
      __publicField(this, "tabNavBarRef");
      // All the direct tabs for this tab set
      __publicField(this, "tabs", new QueryList());
      __publicField(this, "extraContents", contentChildren(NzTabBarExtraContentDirective, ...ngDevMode ? [{
        debugName: "extraContents"
      }] : []));
      __publicField(this, "dir", "ltr");
      __publicField(this, "tabSetId");
      __publicField(this, "indexToSelect", 0);
      __publicField(this, "selectedIndex", null);
      __publicField(this, "tabLabelSubscription", Subscription.EMPTY);
      __publicField(this, "canDeactivateSubscription", Subscription.EMPTY);
      __publicField(this, "router", inject(Router, {
        optional: true
      }));
      this.tabSetId = nextId++;
      this.destroyRef.onDestroy(() => {
        this.tabs.destroy();
        this.tabLabelSubscription.unsubscribe();
        this.canDeactivateSubscription.unsubscribe();
      });
    }
    get nzSelectedIndex() {
      return this.selectedIndex;
    }
    set nzSelectedIndex(value) {
      this.indexToSelect = coerceNumberProperty(value, null);
    }
    get position() {
      return ["top", "bottom"].indexOf(this.nzTabPosition) === -1 ? "vertical" : "horizontal";
    }
    get addable() {
      return this.nzType === "editable-card" && !this.nzHideAdd;
    }
    get closable() {
      return this.nzType === "editable-card";
    }
    get line() {
      return this.nzType === "line";
    }
    get inkBarAnimated() {
      return this.line && (typeof this.nzAnimated === "boolean" ? this.nzAnimated : this.nzAnimated.inkBar);
    }
    get tabPaneAnimated() {
      return typeof this.nzAnimated === "boolean" ? this.nzAnimated : this.nzAnimated.tabPane;
    }
    ngOnInit() {
      var _a2;
      this.dir = this.directionality.value;
      (_a2 = this.directionality.change) == null ? void 0 : _a2.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
    }
    ngAfterContentInit() {
      this.ngZone.runOutsideAngular(() => {
        Promise.resolve().then(() => this.setUpRouter());
      });
      this.subscribeToTabLabels();
      this.subscribeToAllTabChanges();
      this.tabs.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        const indexToSelect = this.clampTabIndex(this.indexToSelect);
        if (indexToSelect === this.selectedIndex) {
          const tabs = this.tabs.toArray();
          for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].isActive) {
              this.indexToSelect = this.selectedIndex = i;
              break;
            }
          }
        }
        this.subscribeToTabLabels();
        this.cdr.markForCheck();
      });
    }
    ngAfterContentChecked() {
      const indexToSelect = this.indexToSelect = this.clampTabIndex(this.indexToSelect);
      if (this.selectedIndex !== indexToSelect) {
        const isFirstRun = this.selectedIndex == null;
        if (!isFirstRun) {
          this.nzSelectChange.emit(this.createChangeEvent(indexToSelect));
        }
        Promise.resolve().then(() => {
          this.tabs.forEach((tab, index) => tab.setActive(index === indexToSelect));
          if (!isFirstRun) {
            this.nzSelectedIndexChange.emit(indexToSelect);
          }
        });
      }
      this.tabs.forEach((tab, index) => {
        tab.position = index - indexToSelect;
        if (this.selectedIndex != null && tab.position === 0 && !tab.origin) {
          tab.origin = indexToSelect - this.selectedIndex;
        }
      });
      if (this.selectedIndex !== indexToSelect) {
        this.selectedIndex = indexToSelect;
        this.cdr.markForCheck();
      }
    }
    onClose(index, e) {
      e.preventDefault();
      e.stopPropagation();
      this.nzClose.emit({
        index
      });
    }
    onAdd() {
      this.nzAdd.emit();
    }
    clampTabIndex(index) {
      return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
    }
    createChangeEvent(index) {
      const event = new NzTabChangeEvent();
      event.index = index;
      if (this.tabs && this.tabs.length) {
        event.tab = this.tabs.toArray()[index];
        this.tabs.forEach((tab, i) => {
          if (i !== index) {
            tab.nzDeselect.emit();
          }
        });
        event.tab.nzSelect.emit();
      }
      return event;
    }
    subscribeToTabLabels() {
      if (this.tabLabelSubscription) {
        this.tabLabelSubscription.unsubscribe();
      }
      this.tabLabelSubscription = merge(...this.tabs.map((tab) => tab.stateChanges)).subscribe(() => this.cdr.markForCheck());
    }
    subscribeToAllTabChanges() {
      this.allTabs.changes.pipe(startWith(this.allTabs)).subscribe((tabs) => {
        this.tabs.reset(tabs.filter((tab) => tab.closestTabSet === this));
        this.tabs.notifyOnChanges();
      });
    }
    canDeactivateFun(pre, next) {
      if (typeof this.nzCanDeactivate === "function") {
        const observable = wrapIntoObservable(this.nzCanDeactivate(pre, next));
        return observable.pipe(first(), takeUntilDestroyed(this.destroyRef));
      } else {
        return of(true);
      }
    }
    clickNavItem(tab, index, e) {
      if (!tab.nzDisabled) {
        tab.nzClick.emit();
        if (!this.isRouterLinkClickEvent(index, e)) {
          this.setSelectedIndex(index);
        }
      }
    }
    isRouterLinkClickEvent(index, event) {
      var _a2, _b;
      const target = event.target;
      if (this.nzLinkRouter) {
        return !!((_b = (_a2 = this.tabs.toArray()[index]) == null ? void 0 : _a2.linkDirective) == null ? void 0 : _b.elementRef.nativeElement.contains(target));
      } else {
        return false;
      }
    }
    contextmenuNavItem(tab, e) {
      if (!tab.nzDisabled) {
        tab.nzContextmenu.emit(e);
      }
    }
    setSelectedIndex(index) {
      this.canDeactivateSubscription.unsubscribe();
      this.canDeactivateSubscription = this.canDeactivateFun(this.selectedIndex, index).subscribe((can) => {
        if (can) {
          this.nzSelectedIndex = index;
          this.tabNavBarRef.focusIndex = index;
          this.cdr.markForCheck();
        }
      });
    }
    getTabIndex(tab, index) {
      if (tab.nzDisabled) {
        return null;
      }
      return this.selectedIndex === index ? 0 : -1;
    }
    getTabContentId(i) {
      return `nz-tabs-${this.tabSetId}-tab-${i}`;
    }
    setUpRouter() {
      if (this.nzLinkRouter) {
        if (!this.router) {
          throw new Error(`${PREFIX} you should import 'RouterModule' if you want to use 'nzLinkRouter'!`);
        }
        merge(this.router.events.pipe(filter((e) => e instanceof NavigationEnd)), this.tabLinks.changes).pipe(startWith(true), delay(0), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.updateRouterActive();
          this.cdr.markForCheck();
        });
      }
    }
    updateRouterActive() {
      var _a2;
      if ((_a2 = this.router) == null ? void 0 : _a2.navigated) {
        const index = this.findShouldActiveTabIndex();
        if (index !== this.selectedIndex) {
          this.setSelectedIndex(index);
        }
        Promise.resolve().then(() => this.nzHideAll = index === -1);
      }
    }
    findShouldActiveTabIndex() {
      const tabs = this.tabs.toArray();
      const isActive = this.isLinkActive(this.router);
      return tabs.findIndex((tab) => {
        const c = tab.linkDirective;
        return c ? isActive(c.routerLink) : false;
      });
    }
    isLinkActive(router) {
      return (link) => link ? !!(router == null ? void 0 : router.isActive(link.urlTree || "", {
        paths: this.nzLinkExact ? "exact" : "subset",
        queryParams: this.nzLinkExact ? "exact" : "subset",
        fragment: "ignored",
        matrixParams: "ignored"
      })) : false;
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzType_decorators = [WithConfig()];
    _nzSize_decorators = [WithConfig()];
    _nzAnimated_decorators = [WithConfig()];
    _nzTabBarGutter_decorators = [WithConfig()];
    __esDecorate(null, null, _nzType_decorators, {
      kind: "field",
      name: "nzType",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzType" in obj,
        get: (obj) => obj.nzType,
        set: (obj, value) => {
          obj.nzType = value;
        }
      },
      metadata: _metadata
    }, _nzType_initializers, _nzType_extraInitializers);
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
    __esDecorate(null, null, _nzAnimated_decorators, {
      kind: "field",
      name: "nzAnimated",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzAnimated" in obj,
        get: (obj) => obj.nzAnimated,
        set: (obj, value) => {
          obj.nzAnimated = value;
        }
      },
      metadata: _metadata
    }, _nzAnimated_initializers, _nzAnimated_extraInitializers);
    __esDecorate(null, null, _nzTabBarGutter_decorators, {
      kind: "field",
      name: "nzTabBarGutter",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzTabBarGutter" in obj,
        get: (obj) => obj.nzTabBarGutter,
        set: (obj, value) => {
          obj.nzTabBarGutter = value;
        }
      },
      metadata: _metadata
    }, _nzTabBarGutter_initializers, _nzTabBarGutter_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzTabsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-tabs"]],
    contentQueries: function NzTabsComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuerySignal(dirIndex, ctx.extraContents, NzTabBarExtraContentDirective, 4);
        \u0275\u0275contentQuery(dirIndex, NzTabComponent, 5)(dirIndex, NzTabLinkDirective, 5);
      }
      if (rf & 2) {
        \u0275\u0275queryAdvance();
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.allTabs = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tabLinks = _t);
      }
    },
    viewQuery: function NzTabsComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(NzTabNavBarComponent, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.tabNavBarRef = _t.first);
      }
    },
    hostAttrs: [1, "ant-tabs"],
    hostVars: 24,
    hostBindings: function NzTabsComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-tabs-card", ctx.nzType === "card" || ctx.nzType === "editable-card")("ant-tabs-editable", ctx.nzType === "editable-card")("ant-tabs-editable-card", ctx.nzType === "editable-card")("ant-tabs-centered", ctx.nzCentered)("ant-tabs-rtl", ctx.dir === "rtl")("ant-tabs-top", ctx.nzTabPosition === "top")("ant-tabs-bottom", ctx.nzTabPosition === "bottom")("ant-tabs-left", ctx.nzTabPosition === "left")("ant-tabs-right", ctx.nzTabPosition === "right")("ant-tabs-default", ctx.nzSize === "default")("ant-tabs-small", ctx.nzSize === "small")("ant-tabs-large", ctx.nzSize === "large");
      }
    },
    inputs: {
      nzSelectedIndex: "nzSelectedIndex",
      nzTabPosition: "nzTabPosition",
      nzTabBarExtraContent: "nzTabBarExtraContent",
      nzCanDeactivate: "nzCanDeactivate",
      nzAddIcon: "nzAddIcon",
      nzTabBarStyle: "nzTabBarStyle",
      nzType: "nzType",
      nzSize: "nzSize",
      nzAnimated: "nzAnimated",
      nzTabBarGutter: "nzTabBarGutter",
      nzHideAdd: [2, "nzHideAdd", "nzHideAdd", booleanAttribute],
      nzCentered: [2, "nzCentered", "nzCentered", booleanAttribute],
      nzHideAll: [2, "nzHideAll", "nzHideAll", booleanAttribute],
      nzLinkRouter: [2, "nzLinkRouter", "nzLinkRouter", booleanAttribute],
      nzLinkExact: [2, "nzLinkExact", "nzLinkExact", booleanAttribute],
      nzDestroyInactiveTabPane: [2, "nzDestroyInactiveTabPane", "nzDestroyInactiveTabPane", booleanAttribute],
      nzIndicator: [1, "nzIndicator"]
    },
    outputs: {
      nzSelectChange: "nzSelectChange",
      nzSelectedIndexChange: "nzSelectedIndexChange",
      nzTabListScroll: "nzTabListScroll",
      nzClose: "nzClose",
      nzAdd: "nzAdd"
    },
    exportAs: ["nzTabs"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: NZ_TAB_SET,
      useExisting: forwardRef(() => _a)
    }])],
    decls: 4,
    vars: 12,
    consts: [["tabpaneTmpl", ""], [3, "style", "selectedIndex", "inkBarAnimated", "addable", "addIcon", "hideBar", "position", "extraTemplate", "extraContents", "indicator"], [1, "ant-tabs-content-holder"], [1, "ant-tabs-content"], [3, "tabScroll", "selectFocusedIndex", "addClicked", "selectedIndex", "inkBarAnimated", "addable", "addIcon", "hideBar", "position", "extraTemplate", "extraContents", "indicator"], [1, "ant-tabs-tab", 3, "margin-right", "margin-bottom", "ant-tabs-tab-active", "ant-tabs-tab-disabled"], [1, "ant-tabs-tab", 3, "click", "contextmenu"], ["type", "button", "role", "tab", "nzTabNavItem", "", "cdkMonitorElementFocus", "", 1, "ant-tabs-tab-btn", 3, "id", "disabled", "tab", "active"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], ["type", "button", "nz-tab-close-button", "", 3, "closeIcon"], ["type", "button", "nz-tab-close-button", "", 3, "click", "closeIcon"], [3, "ngTemplateOutlet"], ["role", "tabpanel", "nz-tab-body", "", 3, "id", "active", "content", "animated"]],
    template: function NzTabsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, NzTabsComponent_Conditional_0_Template, 3, 11, "nz-tabs-nav", 1);
        \u0275\u0275elementStart(1, "div", 2)(2, "div", 3);
        \u0275\u0275conditionalCreate(3, NzTabsComponent_Conditional_3_Template, 2, 0);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.tabs.length || ctx.addable ? 0 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275classProp("ant-tabs-content-top", ctx.nzTabPosition === "top")("ant-tabs-content-bottom", ctx.nzTabPosition === "bottom")("ant-tabs-content-left", ctx.nzTabPosition === "left")("ant-tabs-content-right", ctx.nzTabPosition === "right")("ant-tabs-content-animated", ctx.tabPaneAnimated);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.nzHideAll ? 3 : -1);
      }
    },
    dependencies: [NzTabNavBarComponent, NgTemplateOutlet, NzTabNavItemDirective, A11yModule, CdkMonitorFocus, NzOutletModule, NzStringTemplateOutletDirective, NzTabCloseButtonComponent, NzTabBodyComponent],
    encapsulation: 2
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabsComponent, [{
    type: Component,
    args: [{
      selector: "nz-tabs",
      exportAs: "nzTabs",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.Default,
      providers: [{
        provide: NZ_TAB_SET,
        useExisting: forwardRef(() => NzTabsComponent)
      }],
      template: `
    @if (tabs.length || addable) {
      <nz-tabs-nav
        [style]="nzTabBarStyle"
        [selectedIndex]="nzSelectedIndex || 0"
        [inkBarAnimated]="inkBarAnimated"
        [addable]="addable"
        [addIcon]="nzAddIcon"
        [hideBar]="nzHideAll"
        [position]="position"
        [extraTemplate]="nzTabBarExtraContent"
        [extraContents]="extraContents()"
        [indicator]="nzIndicator()"
        (tabScroll)="nzTabListScroll.emit($event)"
        (selectFocusedIndex)="setSelectedIndex($event)"
        (addClicked)="onAdd()"
      >
        @for (tab of tabs; track tab) {
          <div
            class="ant-tabs-tab"
            [style.margin-right.px]="position === 'horizontal' ? nzTabBarGutter : null"
            [style.margin-bottom.px]="position === 'vertical' ? nzTabBarGutter : null"
            [class.ant-tabs-tab-active]="nzSelectedIndex === $index"
            [class.ant-tabs-tab-disabled]="tab.nzDisabled"
            (click)="clickNavItem(tab, $index, $event)"
            (contextmenu)="contextmenuNavItem(tab, $event)"
          >
            <button
              type="button"
              role="tab"
              [id]="getTabContentId($index)"
              [attr.tabIndex]="getTabIndex(tab, $index)"
              [attr.aria-disabled]="tab.nzDisabled"
              [attr.aria-selected]="nzSelectedIndex === $index && !nzHideAll"
              [attr.aria-controls]="getTabContentId($index)"
              [disabled]="tab.nzDisabled"
              [tab]="tab"
              [active]="nzSelectedIndex === $index"
              class="ant-tabs-tab-btn"
              nzTabNavItem
              cdkMonitorElementFocus
            >
              <ng-container *nzStringTemplateOutlet="tab.label; context: { visible: true }">
                {{ tab.label }}
              </ng-container>
              @if (tab.nzClosable && closable && !tab.nzDisabled) {
                <button
                  type="button"
                  nz-tab-close-button
                  [closeIcon]="tab.nzCloseIcon"
                  (click)="onClose($index, $event)"
                ></button>
              }
            </button>
          </div>
        }
      </nz-tabs-nav>
    }
    <div class="ant-tabs-content-holder">
      <div
        class="ant-tabs-content"
        [class.ant-tabs-content-top]="nzTabPosition === 'top'"
        [class.ant-tabs-content-bottom]="nzTabPosition === 'bottom'"
        [class.ant-tabs-content-left]="nzTabPosition === 'left'"
        [class.ant-tabs-content-right]="nzTabPosition === 'right'"
        [class.ant-tabs-content-animated]="tabPaneAnimated"
      >
        @if (!nzHideAll) {
          @for (tab of tabs; track tab) {
            @if (tab.nzForceRender) {
              <ng-template [ngTemplateOutlet]="tabpaneTmpl" />
            } @else if (nzDestroyInactiveTabPane) {
              @if (nzSelectedIndex === $index) {
                <ng-template [ngTemplateOutlet]="tabpaneTmpl" />
              }
            } @else {
              @if (nzSelectedIndex === $index || tab.hasBeenActive) {
                <ng-template [ngTemplateOutlet]="tabpaneTmpl" />
              }
            }

            <ng-template #tabpaneTmpl>
              <div
                role="tabpanel"
                [id]="getTabContentId($index)"
                [attr.aria-labelledby]="getTabContentId($index)"
                nz-tab-body
                [active]="nzSelectedIndex === $index"
                [content]="tab.content"
                [animated]="tabPaneAnimated"
              ></div>
            </ng-template>
          }
        }
      </div>
    </div>
  `,
      host: {
        class: "ant-tabs",
        "[class.ant-tabs-card]": `nzType === 'card' || nzType === 'editable-card'`,
        "[class.ant-tabs-editable]": `nzType === 'editable-card'`,
        "[class.ant-tabs-editable-card]": `nzType === 'editable-card'`,
        "[class.ant-tabs-centered]": `nzCentered`,
        "[class.ant-tabs-rtl]": `dir === 'rtl'`,
        "[class.ant-tabs-top]": `nzTabPosition === 'top'`,
        "[class.ant-tabs-bottom]": `nzTabPosition === 'bottom'`,
        "[class.ant-tabs-left]": `nzTabPosition === 'left'`,
        "[class.ant-tabs-right]": `nzTabPosition === 'right'`,
        "[class.ant-tabs-default]": `nzSize === 'default'`,
        "[class.ant-tabs-small]": `nzSize === 'small'`,
        "[class.ant-tabs-large]": `nzSize === 'large'`
      },
      imports: [NzTabNavBarComponent, NgTemplateOutlet, NzTabNavItemDirective, A11yModule, NzOutletModule, NzTabCloseButtonComponent, NzTabBodyComponent]
    }]
  }], () => [], {
    nzSelectedIndex: [{
      type: Input
    }],
    nzTabPosition: [{
      type: Input
    }],
    nzTabBarExtraContent: [{
      type: Input
    }],
    nzCanDeactivate: [{
      type: Input
    }],
    nzAddIcon: [{
      type: Input
    }],
    nzTabBarStyle: [{
      type: Input
    }],
    nzType: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzAnimated: [{
      type: Input
    }],
    nzTabBarGutter: [{
      type: Input
    }],
    nzHideAdd: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCentered: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzHideAll: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzLinkRouter: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzLinkExact: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDestroyInactiveTabPane: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzIndicator: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzIndicator",
        required: false
      }]
    }],
    nzSelectChange: [{
      type: Output
    }],
    nzSelectedIndexChange: [{
      type: Output
    }],
    nzTabListScroll: [{
      type: Output
    }],
    nzClose: [{
      type: Output
    }],
    nzAdd: [{
      type: Output
    }],
    allTabs: [{
      type: ContentChildren,
      args: [NzTabComponent, {
        descendants: true
      }]
    }],
    tabLinks: [{
      type: ContentChildren,
      args: [NzTabLinkDirective, {
        descendants: true
      }]
    }],
    tabNavBarRef: [{
      type: ViewChild,
      args: [NzTabNavBarComponent, {
        static: false
      }]
    }],
    extraContents: [{
      type: ContentChildren,
      args: [forwardRef(() => NzTabBarExtraContentDirective), {
        isSignal: true
      }]
    }]
  });
})();
var DIRECTIVES = [NzTabsComponent, NzTabComponent, NzTabNavBarComponent, NzTabNavItemDirective, NzTabsInkBarDirective, NzTabScrollListDirective, NzTabNavOperationComponent, NzTabAddButtonComponent, NzTabCloseButtonComponent, NzTabDirective, NzTabBodyComponent, NzTabLinkDirective, NzTabLinkTemplateDirective, NzTabBarExtraContentDirective];
var _NzTabsModule = class _NzTabsModule {
};
__publicField(_NzTabsModule, "\u0275fac", function NzTabsModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTabsModule)();
});
__publicField(_NzTabsModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzTabsModule,
  imports: [NzTabsComponent, NzTabComponent, NzTabNavBarComponent, NzTabNavItemDirective, NzTabsInkBarDirective, NzTabScrollListDirective, NzTabNavOperationComponent, NzTabAddButtonComponent, NzTabCloseButtonComponent, NzTabDirective, NzTabBodyComponent, NzTabLinkDirective, NzTabLinkTemplateDirective, NzTabBarExtraContentDirective],
  exports: [NzTabsComponent, NzTabComponent, NzTabNavBarComponent, NzTabNavItemDirective, NzTabsInkBarDirective, NzTabScrollListDirective, NzTabNavOperationComponent, NzTabAddButtonComponent, NzTabCloseButtonComponent, NzTabDirective, NzTabBodyComponent, NzTabLinkDirective, NzTabLinkTemplateDirective, NzTabBarExtraContentDirective]
}));
__publicField(_NzTabsModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzTabsComponent, NzTabNavBarComponent, NzTabNavOperationComponent, NzTabAddButtonComponent, NzTabCloseButtonComponent]
}));
var NzTabsModule = _NzTabsModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTabsModule, [{
    type: NgModule,
    args: [{
      imports: [DIRECTIVES],
      exports: [DIRECTIVES]
    }]
  }], null, null);
})();

// src/app/modules/core-infra-auth/authorize-info/authorize-info.component.ts
function AuthorizeInfoComponent_nz_tag_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("nzColor", role_r1 === ctx_r1.ADMIN_ROLE ? "gold" : "blue");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", role_r1, " ");
  }
}
function AuthorizeInfoComponent_span_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "Kh\xF4ng c\xF3 vai tr\xF2"));
  }
}
function AuthorizeInfoComponent_nz_tag_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-tag", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const claim_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("nzColor", claim_r3 === ctx_r1.ADMIN_CLAIM ? "volcano" : "green");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", claim_r3, " ");
  }
}
function AuthorizeInfoComponent_span_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "Kh\xF4ng c\xF3 quy\u1EC1n h\u1EA1n"));
  }
}
function AuthorizeInfoComponent_nz_card_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-card", 6);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275elementStart(2, "div", 17);
    \u0275\u0275element(3, "span", 18);
    \u0275\u0275elementStart(4, "p")(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(1, 4, "Tr\u1EA1ng th\xE1i Admin"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzTwotoneColor", "#52c41a");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 6, "B\u1EA1n \u0111ang c\xF3 quy\u1EC1n Admin t\u1ED1i cao."));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 8, "H\u1EC7 th\u1ED1ng s\u1EBD b\u1ECF qua m\u1ECDi b\u01B0\u1EDBc ki\u1EC3m tra quy\u1EC1n h\u1EA1n v\xE0 cho ph\xE9p b\u1EA1n truy c\u1EADp t\u1EA5t c\u1EA3 c\xE1c t\xEDnh n\u0103ng."));
  }
}
function AuthorizeInfoComponent_tr_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td")(7, "code");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r4 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(data_r4.module);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(data_r4.action);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(data_r4.value);
  }
}
var _AuthorizeInfoComponent = class _AuthorizeInfoComponent {
  constructor() {
    this.authService = inject(AuthService);
    this.userRoles = [];
    this.userClaims = [];
    this.isAdmin = false;
    this.version = CLAIMS_VERSION;
    this.adminClaim = ADMIN_CLAIM;
    this.ADMIN_ROLE = ADMIN_ROLE;
    this.ADMIN_CLAIM = ADMIN_CLAIM;
    this.appClaimsList = [];
  }
  ngOnInit() {
    this.loadUserData();
    this.processAppClaims();
  }
  loadUserData() {
    const rawRoles = localStorage.getItem("roles");
    const rawClaims = localStorage.getItem("claims");
    if (rawRoles) {
      try {
        this.userRoles = JSON.parse(rawRoles);
      } catch (e) {
      }
    }
    if (rawClaims) {
      try {
        this.userClaims = JSON.parse(rawClaims);
      } catch (e) {
      }
    }
    this.isAdmin = this.authService.hasClaim(ADMIN_CLAIM);
  }
  processAppClaims() {
    for (const [module, actions] of Object.entries(APP_CLAIMS)) {
      for (const [action, value] of Object.entries(actions)) {
        this.appClaimsList.push({
          module,
          action,
          value
        });
      }
    }
  }
};
_AuthorizeInfoComponent.\u0275fac = function AuthorizeInfoComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthorizeInfoComponent)();
};
_AuthorizeInfoComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthorizeInfoComponent, selectors: [["app-authorize-info"]], decls: 57, vars: 53, consts: [["basicTable", ""], [1, "authorize-info-container"], [1, "page-header"], [1, "subtitle"], [3, "nzTitle"], [1, "tab-content"], [1, "info-card", 3, "nzTitle"], ["nzBordered", "", 3, "nzColumn"], [3, "nzColor", 4, "ngFor", "ngForOf"], ["class", "empty-text", 4, "ngIf"], [1, "claims-list"], ["class", "info-card", 3, "nzTitle", 4, "ngIf"], ["nzColor", "volcano"], ["nzSize", "small", 3, "nzData", "nzPageSize"], [4, "ngFor", "ngForOf"], [3, "nzColor"], [1, "empty-text"], [1, "admin-notice"], ["nz-icon", "", "nzType", "safety-certificate", "nzTheme", "twotone", 3, "nzTwotoneColor"]], template: function AuthorizeInfoComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 3);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "nz-tabs")(9, "nz-tab", 4);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementStart(11, "div", 5)(12, "nz-card", 6);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementStart(14, "nz-descriptions", 7)(15, "nz-descriptions-item", 4);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275template(17, AuthorizeInfoComponent_nz_tag_17_Template, 2, 2, "nz-tag", 8)(18, AuthorizeInfoComponent_span_18_Template, 3, 3, "span", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "nz-descriptions-item", 4);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementStart(21, "div", 10);
    \u0275\u0275template(22, AuthorizeInfoComponent_nz_tag_22_Template, 2, 2, "nz-tag", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, AuthorizeInfoComponent_span_23_Template, 3, 3, "span", 9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(24, AuthorizeInfoComponent_nz_card_24_Template, 11, 10, "nz-card", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "nz-tab", 4);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275elementStart(27, "div", 5)(28, "nz-card", 6);
    \u0275\u0275pipe(29, "translate");
    \u0275\u0275elementStart(30, "p");
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "translate");
    \u0275\u0275elementStart(33, "strong");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "p");
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "translate");
    \u0275\u0275elementStart(38, "nz-tag", 12);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "nz-card", 6);
    \u0275\u0275pipe(41, "translate");
    \u0275\u0275elementStart(42, "nz-table", 13, 0)(44, "thead")(45, "tr")(46, "th");
    \u0275\u0275text(47);
    \u0275\u0275pipe(48, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "th");
    \u0275\u0275text(50);
    \u0275\u0275pipe(51, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "th");
    \u0275\u0275text(53);
    \u0275\u0275pipe(54, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(55, "tbody");
    \u0275\u0275template(56, AuthorizeInfoComponent_tr_56_Template, 9, 3, "tr", 14);
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const basicTable_r5 = \u0275\u0275reference(43);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 25, "Th\xF4ng tin ph\xE2n quy\u1EC1n"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 27, "T\u1ED5ng quan v\u1EC1 c\u01A1 ch\u1EBF ph\xE2n quy\u1EC1n \u0111ang \u0111\u01B0\u1EE3c \xE1p d\u1EE5ng"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(10, 29, "Quy\u1EC1n c\u1EE7a t\xF4i"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(13, 31, "Th\xF4ng tin ng\u01B0\u1EDDi d\xF9ng"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzColumn", 1);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(16, 33, "Vai tr\xF2 (Roles)"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx.userRoles);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.userRoles.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(20, 35, "Quy\u1EC1n h\u1EA1n (Claims)"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx.userClaims);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.userClaims.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.isAdmin);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(26, 37, "C\u1EA5u h\xECnh \u1EE9ng d\u1EE5ng"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(29, 39, "Phi\xEAn b\u1EA3n c\u1EA5u h\xECnh"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(32, 41, "Phi\xEAn b\u1EA3n hi\u1EC7n t\u1EA1i:"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.version);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(37, 43, "Admin Claim:"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.adminClaim);
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(41, 45, "Danh s\xE1ch Quy\u1EC1n h\u1EA1n \u0111\u1ECBnh ngh\u0129a trong FE"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzData", ctx.appClaimsList)("nzPageSize", 50);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(48, 47, "M\xF4-\u0111un"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(51, 49, "H\xE0nh \u0111\u1ED9ng"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(54, 51, "Gi\xE1 tr\u1ECB Claim"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", basicTable_r5.data);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, NzCardModule, NzCardComponent, NzTableModule, NzTableComponent, NzTableCellDirective, NzThMeasureDirective, NzTheadComponent, NzTbodyComponent, NzTrDirective, NzTagModule, NzTagComponent, NzDescriptionsModule, NzDescriptionsComponent, NzDescriptionsItemComponent, NzTabsModule, NzTabsComponent, NzTabComponent, NzIconModule, NzIconDirective, TranslateModule, TranslatePipe], styles: ["\n.authorize-info-container[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.subtitle[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.45);\n  margin-top: -16px;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 16px 0;\n}\n.info-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.claims-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.empty-text[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.25);\n  font-style: italic;\n}\n.admin-notice[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 16px;\n}\n.admin-notice[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 48px;\n  margin-bottom: 16px;\n}\ncode[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  padding: 2px 4px;\n  border-radius: 4px;\n  font-size: 12px;\n}\n/*# sourceMappingURL=authorize-info.component.css.map */"] });
var AuthorizeInfoComponent = _AuthorizeInfoComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthorizeInfoComponent, [{
    type: Component,
    args: [{ selector: "app-authorize-info", standalone: true, imports: [
      CommonModule,
      NzCardModule,
      NzTableModule,
      NzTagModule,
      NzDescriptionsModule,
      NzTabsModule,
      NzIconModule,
      TranslateModule
    ], template: `
    <div class="authorize-info-container">
      <div class="page-header">
        <h2>{{ 'Th\xF4ng tin ph\xE2n quy\u1EC1n' | translate }}</h2>
        <p class="subtitle">{{ 'T\u1ED5ng quan v\u1EC1 c\u01A1 ch\u1EBF ph\xE2n quy\u1EC1n \u0111ang \u0111\u01B0\u1EE3c \xE1p d\u1EE5ng' | translate }}</p>
      </div>

      <nz-tabs>
        <nz-tab [nzTitle]="'Quy\u1EC1n c\u1EE7a t\xF4i' | translate">
          <div class="tab-content">
            <nz-card [nzTitle]="'Th\xF4ng tin ng\u01B0\u1EDDi d\xF9ng' | translate" class="info-card">
              <nz-descriptions [nzColumn]="1" nzBordered>
                <nz-descriptions-item [nzTitle]="'Vai tr\xF2 (Roles)' | translate">
                  <nz-tag *ngFor="let role of userRoles" [nzColor]="role === ADMIN_ROLE ? 'gold' : 'blue'">
                    {{ role }}
                  </nz-tag>
                  <span *ngIf="userRoles.length === 0" class="empty-text">{{ 'Kh\xF4ng c\xF3 vai tr\xF2' | translate }}</span>
                </nz-descriptions-item>
                <nz-descriptions-item [nzTitle]="'Quy\u1EC1n h\u1EA1n (Claims)' | translate">
                  <div class="claims-list">
                    <nz-tag *ngFor="let claim of userClaims" [nzColor]="claim === ADMIN_CLAIM ? 'volcano' : 'green'">
                      {{ claim }}
                    </nz-tag>
                  </div>
                  <span *ngIf="userClaims.length === 0" class="empty-text">{{ 'Kh\xF4ng c\xF3 quy\u1EC1n h\u1EA1n' | translate }}</span>
                </nz-descriptions-item>
              </nz-descriptions>
            </nz-card>

            <nz-card [nzTitle]="'Tr\u1EA1ng th\xE1i Admin' | translate" class="info-card" *ngIf="isAdmin">
              <div class="admin-notice">
                <span nz-icon nzType="safety-certificate" nzTheme="twotone" [nzTwotoneColor]="'#52c41a'"></span>
                <p><strong>{{ 'B\u1EA1n \u0111ang c\xF3 quy\u1EC1n Admin t\u1ED1i cao.' | translate }}</strong></p>
                <p>{{ 'H\u1EC7 th\u1ED1ng s\u1EBD b\u1ECF qua m\u1ECDi b\u01B0\u1EDBc ki\u1EC3m tra quy\u1EC1n h\u1EA1n v\xE0 cho ph\xE9p b\u1EA1n truy c\u1EADp t\u1EA5t c\u1EA3 c\xE1c t\xEDnh n\u0103ng.' | translate }}</p>
              </div>
            </nz-card>
          </div>
        </nz-tab>

        <nz-tab [nzTitle]="'C\u1EA5u h\xECnh \u1EE9ng d\u1EE5ng' | translate">
          <div class="tab-content">
            <nz-card [nzTitle]="'Phi\xEAn b\u1EA3n c\u1EA5u h\xECnh' | translate" class="info-card">
              <p>{{ 'Phi\xEAn b\u1EA3n hi\u1EC7n t\u1EA1i:' | translate }} <strong>{{ version }}</strong></p>
              <p>{{ 'Admin Claim:' | translate }} <nz-tag nzColor="volcano">{{ adminClaim }}</nz-tag></p>
            </nz-card>

            <nz-card [nzTitle]="'Danh s\xE1ch Quy\u1EC1n h\u1EA1n \u0111\u1ECBnh ngh\u0129a trong FE' | translate" class="info-card">
              <nz-table #basicTable [nzData]="appClaimsList" nzSize="small" [nzPageSize]="50">
                <thead>
                  <tr>
                    <th>{{ 'M\xF4-\u0111un' | translate }}</th>
                    <th>{{ 'H\xE0nh \u0111\u1ED9ng' | translate }}</th>
                    <th>{{ 'Gi\xE1 tr\u1ECB Claim' | translate }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let data of basicTable.data">
                    <td><strong>{{ data.module }}</strong></td>
                    <td>{{ data.action }}</td>
                    <td><code>{{ data.value }}</code></td>
                  </tr>
                </tbody>
              </nz-table>
            </nz-card>
          </div>
        </nz-tab>
      </nz-tabs>

    </div>
  `, styles: ["/* angular:styles/component:css;70efadc8f01df98a16b477d44f79bf19b355eff90c2a62fef78074449633cbfa;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/src/app/modules/core-infra-auth/authorize-info/authorize-info.component.ts */\n.authorize-info-container {\n  padding: 0;\n}\n.page-header {\n  margin-bottom: 24px;\n}\n.subtitle {\n  color: rgba(0, 0, 0, 0.45);\n  margin-top: -16px;\n}\n.tab-content {\n  padding: 16px 0;\n}\n.info-card {\n  margin-bottom: 24px;\n}\n.claims-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.empty-text {\n  color: rgba(0, 0, 0, 0.25);\n  font-style: italic;\n}\n.admin-notice {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 16px;\n}\n.admin-notice span {\n  font-size: 48px;\n  margin-bottom: 16px;\n}\ncode {\n  background: #f5f5f5;\n  padding: 2px 4px;\n  border-radius: 4px;\n  font-size: 12px;\n}\n/*# sourceMappingURL=authorize-info.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthorizeInfoComponent, { className: "AuthorizeInfoComponent", filePath: "src/app/modules/core-infra-auth/authorize-info/authorize-info.component.ts", lineNumber: 141 });
})();
export {
  AuthorizeInfoComponent
};
//# sourceMappingURL=chunk-DJCKW3HU.js.map
