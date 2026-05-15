import {
  slideAnimationEnter,
  slideAnimationLeave
} from "./chunk-SHYS2JTL.js";
import {
  NzResizeObserver
} from "./chunk-FVBTWRWW.js";
import {
  CandyDate,
  DATE_PICKER_POSITION_MAP,
  DEFAULT_DATE_PICKER_POSITIONS,
  DateHelperService,
  NzConnectedOverlayDirective,
  NzI18nModule,
  NzI18nPipe,
  NzI18nService,
  NzOverlayModule,
  cloneDate,
  isValid,
  normalizeRangeValue,
  startOfQuarter,
  wrongSortOrder
} from "./chunk-NRPLV2GT.js";
import {
  AsyncPipe,
  CdkConnectedOverlay,
  DecimalPipe,
  DefaultValueAccessor,
  Directionality,
  ESCAPE,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NZ_FORM_SIZE,
  NZ_FORM_VARIANT,
  NZ_SPACE_COMPACT_ITEM_TYPE,
  NZ_SPACE_COMPACT_SIZE,
  NgControlStatus,
  NgModel,
  NgTemplateOutlet,
  NzButtonComponent,
  NzButtonModule,
  NzConfigService,
  NzFormItemFeedbackIconComponent,
  NzFormNoStatusService,
  NzFormStatusService,
  NzIconDirective,
  NzIconModule,
  NzOutletModule,
  NzSpaceCompactItemDirective,
  NzStringTemplateOutletDirective,
  NzTransitionPatchDirective,
  NzWaveDirective,
  OverlayModule,
  Platform,
  WithConfig,
  _getEventTarget,
  fromEventOutsideAngular,
  generateClassName,
  getStatusClassNames,
  isNil,
  isNotNil,
  requestAnimationFrame,
  takeUntilDestroyed,
  toBoolean,
  valueFunctionProp,
  warn
} from "./chunk-BV7BATNO.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  ReplaySubject,
  Subject,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  booleanAttribute,
  computed,
  distinctUntilChanged,
  forwardRef,
  inject,
  input,
  linkedSignal,
  map,
  merge,
  numberAttribute,
  of,
  setClassMetadata,
  signal,
  withLatestFrom,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵanimateEnter,
  ɵɵanimateLeave,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵinterpolate,
  ɵɵinterpolate1,
  ɵɵinterpolate2,
  ɵɵinterpolate4,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-2BQMWOA2.js";
import {
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-MYGOUE3E.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-time-picker.mjs
var _c0 = ["hourListElement"];
var _c1 = ["minuteListElement"];
var _c2 = ["secondListElement"];
var _c3 = ["use12HoursListElement"];
function NzTimePickerPanelComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 8);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.dateHelper.format(ctx_r0.time == null ? null : ctx_r0.time.value, ctx_r0.format) || "\xA0");
  }
}
function NzTimePickerPanelComponent_Conditional_2_For_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 10);
    \u0275\u0275listener("click", function NzTimePickerPanelComponent_Conditional_2_For_3_Conditional_0_Template_li_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const hour_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectHour(hour_r3));
    });
    \u0275\u0275elementStart(1, "div", 11);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const hour_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ant-picker-time-panel-cell-selected", ctx_r0.isSelectedHour(hour_r3))("ant-picker-time-panel-cell-disabled", hour_r3.disabled);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 5, hour_r3.index, "2.0-0"));
  }
}
function NzTimePickerPanelComponent_Conditional_2_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTimePickerPanelComponent_Conditional_2_For_3_Conditional_0_Template, 4, 8, "li", 9);
  }
  if (rf & 2) {
    const hour_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!(ctx_r0.nzHideDisabledOptions && hour_r3.disabled) ? 0 : -1);
  }
}
function NzTimePickerPanelComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 6, 0);
    \u0275\u0275repeaterCreate(2, NzTimePickerPanelComponent_Conditional_2_For_3_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.hourRange);
  }
}
function NzTimePickerPanelComponent_Conditional_3_For_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 10);
    \u0275\u0275listener("click", function NzTimePickerPanelComponent_Conditional_3_For_3_Conditional_0_Template_li_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const minute_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectMinute(minute_r5));
    });
    \u0275\u0275elementStart(1, "div", 11);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const minute_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ant-picker-time-panel-cell-selected", ctx_r0.isSelectedMinute(minute_r5))("ant-picker-time-panel-cell-disabled", minute_r5.disabled);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 5, minute_r5.index, "2.0-0"));
  }
}
function NzTimePickerPanelComponent_Conditional_3_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTimePickerPanelComponent_Conditional_3_For_3_Conditional_0_Template, 4, 8, "li", 9);
  }
  if (rf & 2) {
    const minute_r5 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!(ctx_r0.nzHideDisabledOptions && minute_r5.disabled) ? 0 : -1);
  }
}
function NzTimePickerPanelComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 6, 1);
    \u0275\u0275repeaterCreate(2, NzTimePickerPanelComponent_Conditional_3_For_3_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.minuteRange);
  }
}
function NzTimePickerPanelComponent_Conditional_4_For_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 10);
    \u0275\u0275listener("click", function NzTimePickerPanelComponent_Conditional_4_For_3_Conditional_0_Template_li_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const second_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.selectSecond(second_r7));
    });
    \u0275\u0275elementStart(1, "div", 11);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const second_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ant-picker-time-panel-cell-selected", ctx_r0.isSelectedSecond(second_r7))("ant-picker-time-panel-cell-disabled", second_r7.disabled);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 5, second_r7.index, "2.0-0"));
  }
}
function NzTimePickerPanelComponent_Conditional_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTimePickerPanelComponent_Conditional_4_For_3_Conditional_0_Template, 4, 8, "li", 9);
  }
  if (rf & 2) {
    const second_r7 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!(ctx_r0.nzHideDisabledOptions && second_r7.disabled) ? 0 : -1);
  }
}
function NzTimePickerPanelComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 6, 2);
    \u0275\u0275repeaterCreate(2, NzTimePickerPanelComponent_Conditional_4_For_3_Template, 1, 1, null, null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.secondRange);
  }
}
function NzTimePickerPanelComponent_Conditional_5_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 10);
    \u0275\u0275listener("click", function NzTimePickerPanelComponent_Conditional_5_For_3_Template_li_click_0_listener() {
      const range_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.select12Hours(range_r9));
    });
    \u0275\u0275elementStart(1, "div", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const range_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ant-picker-time-panel-cell-selected", ctx_r0.isSelected12Hours(range_r9));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(range_r9.value);
  }
}
function NzTimePickerPanelComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 6, 3);
    \u0275\u0275repeaterCreate(2, NzTimePickerPanelComponent_Conditional_5_For_3_Template, 3, 3, "li", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r0.use12HoursRange);
  }
}
function NzTimePickerPanelComponent_Conditional_6_Conditional_1_ng_template_1_Template(rf, ctx) {
}
function NzTimePickerPanelComponent_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275template(1, NzTimePickerPanelComponent_Conditional_6_Conditional_1_ng_template_1_Template, 0, 0, "ng-template", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.nzAddOn);
  }
}
function NzTimePickerPanelComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275conditionalCreate(1, NzTimePickerPanelComponent_Conditional_6_Conditional_1_Template, 2, 1, "div", 13);
    \u0275\u0275elementStart(2, "ul", 14)(3, "li", 15)(4, "a", 16);
    \u0275\u0275listener("click", function NzTimePickerPanelComponent_Conditional_6_Template_a_click_4_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onClickNow());
    });
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "nzI18n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "li", 17)(8, "button", 18);
    \u0275\u0275listener("click", function NzTimePickerPanelComponent_Conditional_6_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onClickOk());
    });
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "nzI18n");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.nzAddOn ? 1 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.nzNowText || \u0275\u0275pipeBind1(6, 3, "Calendar.lang.now"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r0.nzOkText || \u0275\u0275pipeBind1(10, 5, "Calendar.lang.ok"), " ");
  }
}
var _c4 = ["inputElement"];
function NzTimePickerComponent_Conditional_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const prefix_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(prefix_r2);
  }
}
function NzTimePickerComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 1);
    \u0275\u0275template(1, NzTimePickerComponent_Conditional_0_ng_container_1_Template, 2, 1, "ng-container", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx);
  }
}
function NzTimePickerComponent_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "nz-icon", 9);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const suffixIcon_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzType", suffixIcon_r3);
  }
}
function NzTimePickerComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-form-item-feedback-icon", 6);
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("status", ctx_r3.status);
  }
}
function NzTimePickerComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275listener("click", function NzTimePickerComponent_Conditional_8_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onClickClearBtn($event));
    });
    \u0275\u0275element(1, "nz-icon", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r3.nzClearText)("title", ctx_r3.nzClearText);
  }
}
function NzTimePickerComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275animateLeave(function NzTimePickerComponent_ng_template_9_Template_animateleave_cb() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.timepickerAnimationLeave());
    });
    \u0275\u0275animateEnter(function NzTimePickerComponent_ng_template_9_Template_animateenter_cb() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.timepickerAnimationEnter());
    });
    \u0275\u0275elementStart(1, "div", 13)(2, "div", 14)(3, "nz-time-picker-panel", 15);
    \u0275\u0275pipe(4, "async");
    \u0275\u0275twoWayListener("ngModelChange", function NzTimePickerComponent_ng_template_9_Template_nz_time_picker_panel_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.value, $event) || (ctx_r3.value = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function NzTimePickerComponent_ng_template_9_Template_nz_time_picker_panel_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onPanelValueChange($event));
    })("closePanel", function NzTimePickerComponent_ng_template_9_Template_nz_time_picker_panel_closePanel_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closePanel());
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r3.dropdownTimePickerClass());
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r3.nzPopupClassName);
    \u0275\u0275property("format", ctx_r3.nzFormat)("nzHourStep", ctx_r3.nzHourStep)("nzMinuteStep", ctx_r3.nzMinuteStep)("nzSecondStep", ctx_r3.nzSecondStep)("nzDisabledHours", ctx_r3.nzDisabledHours)("nzDisabledMinutes", ctx_r3.nzDisabledMinutes)("nzDisabledSeconds", ctx_r3.nzDisabledSeconds)("nzPlaceHolder", ctx_r3.nzPlaceHolder || \u0275\u0275pipeBind1(4, 21, ctx_r3.i18nPlaceHolder$))("nzHideDisabledOptions", ctx_r3.nzHideDisabledOptions)("nzUse12Hours", ctx_r3.nzUse12Hours)("nzDefaultOpenValue", ctx_r3.nzDefaultOpenValue)("nzAddOn", ctx_r3.nzAddOn)("nzClearText", ctx_r3.nzClearText)("nzNowText", ctx_r3.nzNowText)("nzOkText", ctx_r3.nzOkText)("nzAllowEmpty", ctx_r3.nzAllowEmpty);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.value);
  }
}
var TimeHolder = class {
  constructor() {
    __publicField(this, "selected12Hours");
    __publicField(this, "_value");
    __publicField(this, "_use12Hours", false);
    __publicField(this, "_defaultOpenValue");
    __publicField(this, "_changes", new Subject());
  }
  setMinutes(value, disabled) {
    if (!disabled) {
      this.initValue();
      this.value.setMinutes(value);
      this.update();
    }
    return this;
  }
  setHours(value, disabled) {
    if (!disabled) {
      this.initValue();
      if (this._use12Hours) {
        if (this.selected12Hours === "PM" && value !== 12) {
          this.value.setHours(value + 12);
        } else if (this.selected12Hours === "AM" && value === 12) {
          this.value.setHours(0);
        } else {
          this.value.setHours(value);
        }
      } else {
        this.value.setHours(value);
      }
      this.update();
    }
    return this;
  }
  setSeconds(value, disabled) {
    if (!disabled) {
      this.initValue();
      this.value.setSeconds(value);
      this.update();
    }
    return this;
  }
  setUse12Hours(value) {
    this._use12Hours = value;
    return this;
  }
  get changes() {
    return this._changes.asObservable();
  }
  setValue(value, use12Hours) {
    if (isNotNil(use12Hours)) {
      this._use12Hours = use12Hours;
    }
    if (value !== this.value) {
      this._value = value;
      if (isNotNil(this.value)) {
        if (this._use12Hours && isNotNil(this.hours)) {
          this.selected12Hours = this.hours >= 12 ? "PM" : "AM";
        }
      } else {
        this._clear();
      }
    }
    return this;
  }
  initValue() {
    if (isNil(this.value)) {
      this.setValue(/* @__PURE__ */ new Date(), this._use12Hours);
    }
  }
  clear() {
    this._clear();
    this.update();
  }
  get isEmpty() {
    return !(isNotNil(this.hours) || isNotNil(this.minutes) || isNotNil(this.seconds));
  }
  _clear() {
    this._value = void 0;
    this.selected12Hours = void 0;
  }
  update() {
    if (this.isEmpty) {
      this._value = void 0;
    } else {
      if (isNotNil(this.hours)) {
        this.value.setHours(this.hours);
      }
      if (isNotNil(this.minutes)) {
        this.value.setMinutes(this.minutes);
      }
      if (isNotNil(this.seconds)) {
        this.value.setSeconds(this.seconds);
      }
      if (this._use12Hours) {
        if (this.selected12Hours === "PM" && this.hours < 12) {
          this.value.setHours(this.hours + 12);
        }
        if (this.selected12Hours === "AM" && this.hours >= 12) {
          this.value.setHours(this.hours - 12);
        }
      }
    }
    this.changed();
  }
  changed() {
    this._changes.next(this.value);
  }
  /**
   * @description
   * UI view hours
   * Get viewHours which is selected in `time-picker-panel` and its range is [12, 1, 2, ..., 11]
   */
  get viewHours() {
    return this._use12Hours && isNotNil(this.hours) ? this.calculateViewHour(this.hours) : this.hours;
  }
  setSelected12Hours(value) {
    if (value.toUpperCase() !== this.selected12Hours) {
      this.selected12Hours = value.toUpperCase();
      this.update();
    }
  }
  get value() {
    return this._value || this._defaultOpenValue;
  }
  get hours() {
    var _a;
    return (_a = this.value) == null ? void 0 : _a.getHours();
  }
  get minutes() {
    var _a;
    return (_a = this.value) == null ? void 0 : _a.getMinutes();
  }
  get seconds() {
    var _a;
    return (_a = this.value) == null ? void 0 : _a.getSeconds();
  }
  setDefaultOpenValue(value) {
    this._defaultOpenValue = value;
    return this;
  }
  calculateViewHour(value) {
    const selected12Hours = this.selected12Hours;
    if (selected12Hours === "PM" && value > 12) {
      return value - 12;
    }
    if (selected12Hours === "AM" && value === 0) {
      return 12;
    }
    return value;
  }
};
function makeRange(length, step = 1, start = 0) {
  return new Array(Math.ceil(length / step)).fill(0).map((_, i) => (i + start) * step);
}
var _NzTimePickerPanelComponent = class _NzTimePickerPanelComponent {
  constructor() {
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "elementRef", inject(ElementRef));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "_nzHourStep", 1);
    __publicField(this, "_nzMinuteStep", 1);
    __publicField(this, "_nzSecondStep", 1);
    __publicField(this, "onChange");
    __publicField(this, "onTouch");
    __publicField(this, "_format", "HH:mm:ss");
    __publicField(this, "_disabledHours", () => []);
    __publicField(this, "_disabledMinutes", () => []);
    __publicField(this, "_disabledSeconds", () => []);
    __publicField(this, "_allowEmpty", true);
    __publicField(this, "time", new TimeHolder());
    __publicField(this, "hourEnabled", true);
    __publicField(this, "minuteEnabled", true);
    __publicField(this, "secondEnabled", true);
    __publicField(this, "firstScrolled", false);
    __publicField(this, "enabledColumns", 3);
    __publicField(this, "hourRange");
    __publicField(this, "minuteRange");
    __publicField(this, "secondRange");
    __publicField(this, "use12HoursRange");
    __publicField(this, "hourListElement");
    __publicField(this, "minuteListElement");
    __publicField(this, "secondListElement");
    __publicField(this, "use12HoursListElement");
    __publicField(this, "nzInDatePicker", false);
    // If inside a date-picker, more diff works need to be done
    __publicField(this, "nzAddOn");
    __publicField(this, "nzHideDisabledOptions", false);
    __publicField(this, "nzClearText");
    __publicField(this, "nzNowText");
    __publicField(this, "nzOkText");
    __publicField(this, "nzPlaceHolder");
    __publicField(this, "nzUse12Hours", false);
    __publicField(this, "nzDefaultOpenValue");
    __publicField(this, "closePanel", new EventEmitter());
  }
  set nzAllowEmpty(value) {
    this._allowEmpty = value;
  }
  get nzAllowEmpty() {
    return this._allowEmpty;
  }
  set nzDisabledHours(value) {
    this._disabledHours = value;
    if (this._disabledHours) {
      this.buildHours();
    }
  }
  get nzDisabledHours() {
    return this._disabledHours;
  }
  set nzDisabledMinutes(value) {
    if (isNotNil(value)) {
      this._disabledMinutes = value;
      this.buildMinutes();
    }
  }
  get nzDisabledMinutes() {
    return this._disabledMinutes;
  }
  set nzDisabledSeconds(value) {
    if (isNotNil(value)) {
      this._disabledSeconds = value;
      this.buildSeconds();
    }
  }
  get nzDisabledSeconds() {
    return this._disabledSeconds;
  }
  set format(value) {
    if (isNotNil(value)) {
      this._format = value;
      this.enabledColumns = 0;
      const charSet = new Set(value);
      this.hourEnabled = charSet.has("H") || charSet.has("h");
      this.minuteEnabled = charSet.has("m");
      this.secondEnabled = charSet.has("s");
      if (this.hourEnabled) {
        this.enabledColumns++;
      }
      if (this.minuteEnabled) {
        this.enabledColumns++;
      }
      if (this.secondEnabled) {
        this.enabledColumns++;
      }
      if (this.nzUse12Hours) {
        this.build12Hours();
      }
    }
  }
  get format() {
    return this._format;
  }
  set nzHourStep(value) {
    this._nzHourStep = value || 1;
    this.buildHours();
  }
  get nzHourStep() {
    return this._nzHourStep;
  }
  set nzMinuteStep(value) {
    this._nzMinuteStep = value || 1;
    this.buildMinutes();
  }
  get nzMinuteStep() {
    return this._nzMinuteStep;
  }
  set nzSecondStep(value) {
    this._nzSecondStep = value || 1;
    this.buildSeconds();
  }
  get nzSecondStep() {
    return this._nzSecondStep;
  }
  buildHours() {
    var _a;
    let hourRanges = 24;
    let disabledHours = (_a = this.nzDisabledHours) == null ? void 0 : _a.call(this);
    let startIndex = 0;
    if (this.nzUse12Hours) {
      hourRanges = 12;
      if (disabledHours) {
        if (this.time.selected12Hours === "PM") {
          disabledHours = disabledHours.filter((i) => i >= 12).map((i) => i > 12 ? i - 12 : i);
        } else {
          disabledHours = disabledHours.filter((i) => i < 12 || i === 24).map((i) => i === 24 || i === 0 ? 12 : i);
        }
      }
      startIndex = 1;
    }
    this.hourRange = makeRange(hourRanges, this.nzHourStep, startIndex).map((r) => ({
      index: r,
      disabled: !!disabledHours && disabledHours.indexOf(r) !== -1
    }));
    if (this.nzUse12Hours && this.hourRange[this.hourRange.length - 1].index === 12) {
      const temp = [...this.hourRange];
      temp.unshift(temp[temp.length - 1]);
      temp.splice(temp.length - 1, 1);
      this.hourRange = temp;
    }
  }
  buildMinutes() {
    this.minuteRange = makeRange(60, this.nzMinuteStep).map((r) => ({
      index: r,
      disabled: !!this.nzDisabledMinutes && this.nzDisabledMinutes(this.time.hours).indexOf(r) !== -1
    }));
  }
  buildSeconds() {
    this.secondRange = makeRange(60, this.nzSecondStep).map((r) => ({
      index: r,
      disabled: !!this.nzDisabledSeconds && this.nzDisabledSeconds(this.time.hours, this.time.minutes).indexOf(r) !== -1
    }));
  }
  build12Hours() {
    const isUpperFormat = this._format.includes("A");
    this.use12HoursRange = [{
      index: 0,
      value: isUpperFormat ? "AM" : "am"
    }, {
      index: 1,
      value: isUpperFormat ? "PM" : "pm"
    }];
  }
  buildTimes() {
    this.buildHours();
    this.buildMinutes();
    this.buildSeconds();
    this.build12Hours();
  }
  scrollToTime(delay = 0) {
    if (this.hourEnabled && this.hourListElement) {
      this.scrollToSelected(this.hourListElement.nativeElement, this.time.viewHours, delay, "hour");
    }
    if (this.minuteEnabled && this.minuteListElement) {
      this.scrollToSelected(this.minuteListElement.nativeElement, this.time.minutes, delay, "minute");
    }
    if (this.secondEnabled && this.secondListElement) {
      this.scrollToSelected(this.secondListElement.nativeElement, this.time.seconds, delay, "second");
    }
    if (this.nzUse12Hours && this.use12HoursListElement) {
      const selectedHours = this.time.selected12Hours;
      const index = selectedHours === "AM" ? 0 : 1;
      this.scrollToSelected(this.use12HoursListElement.nativeElement, index, delay, "12-hour");
    }
  }
  selectHour(hour) {
    this.time.setHours(hour.index, hour.disabled);
    if (this._disabledMinutes) {
      this.buildMinutes();
    }
    if (this._disabledSeconds || this._disabledMinutes) {
      this.buildSeconds();
    }
  }
  selectMinute(minute) {
    this.time.setMinutes(minute.index, minute.disabled);
    if (this._disabledSeconds) {
      this.buildSeconds();
    }
  }
  selectSecond(second) {
    this.time.setSeconds(second.index, second.disabled);
  }
  select12Hours(value) {
    this.time.setSelected12Hours(value.value);
    if (this._disabledHours) {
      this.buildHours();
    }
    if (this._disabledMinutes) {
      this.buildMinutes();
    }
    if (this._disabledSeconds) {
      this.buildSeconds();
    }
  }
  scrollToSelected(instance, index, duration = 0, unit) {
    if (!instance) {
      return;
    }
    const transIndex = this.translateIndex(index, unit);
    const currentOption = instance.children[transIndex] || instance.children[0];
    this.scrollTo(instance, currentOption.offsetTop, duration);
  }
  translateIndex(index, unit) {
    var _a, _b, _c;
    if (unit === "hour") {
      return this.calcIndex((_a = this.nzDisabledHours) == null ? void 0 : _a.call(this), this.hourRange.map((item) => item.index).indexOf(index));
    } else if (unit === "minute") {
      return this.calcIndex((_b = this.nzDisabledMinutes) == null ? void 0 : _b.call(this, this.time.hours), this.minuteRange.map((item) => item.index).indexOf(index));
    } else if (unit === "second") {
      return this.calcIndex((_c = this.nzDisabledSeconds) == null ? void 0 : _c.call(this, this.time.hours, this.time.minutes), this.secondRange.map((item) => item.index).indexOf(index));
    } else {
      return this.calcIndex([], this.use12HoursRange.map((item) => item.index).indexOf(index));
    }
  }
  scrollTo(element, to, duration) {
    if (duration <= 0) {
      element.scrollTop = to;
      return;
    }
    const difference = to - element.scrollTop;
    const perTick = difference / duration * 10;
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) {
          return;
        }
        this.scrollTo(element, to, duration - 10);
      });
    });
  }
  calcIndex(array, index) {
    if ((array == null ? void 0 : array.length) && this.nzHideDisabledOptions) {
      return index - array.reduce((pre, value) => pre + (value < index ? 1 : 0), 0);
    } else {
      return index;
    }
  }
  changed() {
    if (this.onChange) {
      this.onChange(this.time.value);
    }
  }
  touched() {
    if (this.onTouch) {
      this.onTouch();
    }
  }
  timeDisabled(value) {
    var _a, _b, _c, _d, _e, _f;
    const hour = value.getHours();
    const minute = value.getMinutes();
    const second = value.getSeconds();
    return ((_b = (_a = this.nzDisabledHours) == null ? void 0 : _a.call(this).indexOf(hour)) != null ? _b : -1) > -1 || ((_d = (_c = this.nzDisabledMinutes) == null ? void 0 : _c.call(this, hour).indexOf(minute)) != null ? _d : -1) > -1 || ((_f = (_e = this.nzDisabledSeconds) == null ? void 0 : _e.call(this, hour, minute).indexOf(second)) != null ? _f : -1) > -1;
  }
  onClickNow() {
    const now = /* @__PURE__ */ new Date();
    if (this.timeDisabled(now)) {
      return;
    }
    this.time.setValue(now);
    this.changed();
    this.closePanel.emit();
  }
  onClickOk() {
    this.time.setValue(this.time.value, this.nzUse12Hours);
    this.changed();
    this.closePanel.emit();
  }
  isSelectedHour(hour) {
    return hour.index === this.time.viewHours;
  }
  isSelectedMinute(minute) {
    return minute.index === this.time.minutes;
  }
  isSelectedSecond(second) {
    return second.index === this.time.seconds;
  }
  isSelected12Hours(value) {
    return value.value.toUpperCase() === this.time.selected12Hours;
  }
  ngOnInit() {
    this.time.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.changed();
      this.touched();
      this.scrollToTime(120);
    });
    this.buildTimes();
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.scrollToTime();
        this.firstScrolled = true;
      });
    });
    fromEventOutsideAngular(this.elementRef.nativeElement, "mousedown").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      event.preventDefault();
    });
  }
  ngOnChanges(changes) {
    const {
      nzUse12Hours,
      nzDefaultOpenValue
    } = changes;
    if (!(nzUse12Hours == null ? void 0 : nzUse12Hours.previousValue) && (nzUse12Hours == null ? void 0 : nzUse12Hours.currentValue)) {
      this.build12Hours();
      this.enabledColumns++;
    }
    if (nzDefaultOpenValue == null ? void 0 : nzDefaultOpenValue.currentValue) {
      this.time.setDefaultOpenValue(this.nzDefaultOpenValue || /* @__PURE__ */ new Date());
    }
  }
  writeValue(value) {
    this.time.setValue(value, this.nzUse12Hours);
    this.buildTimes();
    if (value && this.firstScrolled) {
      this.scrollToTime(120);
    }
    this.cdr.markForCheck();
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouch = fn;
  }
};
__publicField(_NzTimePickerPanelComponent, "\u0275fac", function NzTimePickerPanelComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTimePickerPanelComponent)();
});
__publicField(_NzTimePickerPanelComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTimePickerPanelComponent,
  selectors: [["nz-time-picker-panel"]],
  viewQuery: function NzTimePickerPanelComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5)(_c1, 5)(_c2, 5)(_c3, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.hourListElement = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.minuteListElement = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.secondListElement = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.use12HoursListElement = _t.first);
    }
  },
  hostAttrs: [1, "ant-picker-time-panel"],
  hostVars: 12,
  hostBindings: function NzTimePickerPanelComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-picker-time-panel-column-0", ctx.enabledColumns === 0 && !ctx.nzInDatePicker)("ant-picker-time-panel-column-1", ctx.enabledColumns === 1 && !ctx.nzInDatePicker)("ant-picker-time-panel-column-2", ctx.enabledColumns === 2 && !ctx.nzInDatePicker)("ant-picker-time-panel-column-3", ctx.enabledColumns === 3 && !ctx.nzInDatePicker)("ant-picker-time-panel-narrow", ctx.enabledColumns < 3)("ant-picker-time-panel-placement-bottomLeft", !ctx.nzInDatePicker);
    }
  },
  inputs: {
    nzInDatePicker: [2, "nzInDatePicker", "nzInDatePicker", booleanAttribute],
    nzAddOn: "nzAddOn",
    nzHideDisabledOptions: "nzHideDisabledOptions",
    nzClearText: "nzClearText",
    nzNowText: "nzNowText",
    nzOkText: "nzOkText",
    nzPlaceHolder: "nzPlaceHolder",
    nzUse12Hours: [2, "nzUse12Hours", "nzUse12Hours", booleanAttribute],
    nzDefaultOpenValue: "nzDefaultOpenValue",
    nzAllowEmpty: [2, "nzAllowEmpty", "nzAllowEmpty", booleanAttribute],
    nzDisabledHours: "nzDisabledHours",
    nzDisabledMinutes: "nzDisabledMinutes",
    nzDisabledSeconds: "nzDisabledSeconds",
    format: "format",
    nzHourStep: [2, "nzHourStep", "nzHourStep", numberAttribute],
    nzMinuteStep: [2, "nzMinuteStep", "nzMinuteStep", numberAttribute],
    nzSecondStep: [2, "nzSecondStep", "nzSecondStep", numberAttribute]
  },
  outputs: {
    closePanel: "closePanel"
  },
  exportAs: ["nzTimePickerPanel"],
  features: [\u0275\u0275ProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _NzTimePickerPanelComponent),
    multi: true
  }]), \u0275\u0275NgOnChangesFeature],
  decls: 7,
  vars: 6,
  consts: [["hourListElement", ""], ["minuteListElement", ""], ["secondListElement", ""], ["use12HoursListElement", ""], [1, "ant-picker-header"], [1, "ant-picker-content"], [1, "ant-picker-time-panel-column", 2, "position", "relative"], [1, "ant-picker-footer"], [1, "ant-picker-header-view"], [1, "ant-picker-time-panel-cell", 3, "ant-picker-time-panel-cell-selected", "ant-picker-time-panel-cell-disabled"], [1, "ant-picker-time-panel-cell", 3, "click"], [1, "ant-picker-time-panel-cell-inner"], [1, "ant-picker-time-panel-cell", 3, "ant-picker-time-panel-cell-selected"], [1, "ant-picker-footer-extra"], [1, "ant-picker-ranges"], [1, "ant-picker-now"], [3, "click"], [1, "ant-picker-ok"], ["nz-button", "", "type", "button", "nzSize", "small", "nzType", "primary", 3, "click"], [3, "ngTemplateOutlet"]],
  template: function NzTimePickerPanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzTimePickerPanelComponent_Conditional_0_Template, 3, 1, "div", 4);
      \u0275\u0275elementStart(1, "div", 5);
      \u0275\u0275conditionalCreate(2, NzTimePickerPanelComponent_Conditional_2_Template, 4, 0, "ul", 6);
      \u0275\u0275conditionalCreate(3, NzTimePickerPanelComponent_Conditional_3_Template, 4, 0, "ul", 6);
      \u0275\u0275conditionalCreate(4, NzTimePickerPanelComponent_Conditional_4_Template, 4, 0, "ul", 6);
      \u0275\u0275conditionalCreate(5, NzTimePickerPanelComponent_Conditional_5_Template, 4, 0, "ul", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(6, NzTimePickerPanelComponent_Conditional_6_Template, 11, 7, "div", 7);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.nzInDatePicker ? 0 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.hourEnabled ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.minuteEnabled ? 3 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.secondEnabled ? 4 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzUse12Hours ? 5 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.nzInDatePicker ? 6 : -1);
    }
  },
  dependencies: [NgTemplateOutlet, NzI18nModule, NzButtonModule, NzButtonComponent, NzTransitionPatchDirective, NzWaveDirective, DecimalPipe, NzI18nPipe],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTimePickerPanelComponent = _NzTimePickerPanelComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTimePickerPanelComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "nz-time-picker-panel",
      exportAs: "nzTimePickerPanel",
      template: `
    @if (nzInDatePicker) {
      <div class="ant-picker-header">
        <div class="ant-picker-header-view">{{ dateHelper.format($any(time?.value), format) || '&nbsp;' }}</div>
      </div>
    }
    <div class="ant-picker-content">
      @if (hourEnabled) {
        <ul #hourListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (hour of hourRange; track $index) {
            @if (!(nzHideDisabledOptions && hour.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectHour(hour)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedHour(hour)"
                [class.ant-picker-time-panel-cell-disabled]="hour.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ hour.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (minuteEnabled) {
        <ul #minuteListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (minute of minuteRange; track $index) {
            @if (!(nzHideDisabledOptions && minute.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectMinute(minute)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedMinute(minute)"
                [class.ant-picker-time-panel-cell-disabled]="minute.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ minute.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (secondEnabled) {
        <ul #secondListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (second of secondRange; track $index) {
            @if (!(nzHideDisabledOptions && second.disabled)) {
              <li
                class="ant-picker-time-panel-cell"
                (click)="selectSecond(second)"
                [class.ant-picker-time-panel-cell-selected]="isSelectedSecond(second)"
                [class.ant-picker-time-panel-cell-disabled]="second.disabled"
              >
                <div class="ant-picker-time-panel-cell-inner">{{ second.index | number: '2.0-0' }}</div>
              </li>
            }
          }
        </ul>
      }
      @if (nzUse12Hours) {
        <ul #use12HoursListElement class="ant-picker-time-panel-column" style="position: relative;">
          @for (range of use12HoursRange; track range) {
            <li
              (click)="select12Hours(range)"
              class="ant-picker-time-panel-cell"
              [class.ant-picker-time-panel-cell-selected]="isSelected12Hours(range)"
            >
              <div class="ant-picker-time-panel-cell-inner">{{ range.value }}</div>
            </li>
          }
        </ul>
      }
    </div>
    @if (!nzInDatePicker) {
      <div class="ant-picker-footer">
        @if (nzAddOn) {
          <div class="ant-picker-footer-extra">
            <ng-template [ngTemplateOutlet]="nzAddOn" />
          </div>
        }
        <ul class="ant-picker-ranges">
          <li class="ant-picker-now">
            <a (click)="onClickNow()">
              {{ nzNowText || ('Calendar.lang.now' | nzI18n) }}
            </a>
          </li>
          <li class="ant-picker-ok">
            <button nz-button type="button" nzSize="small" nzType="primary" (click)="onClickOk()">
              {{ nzOkText || ('Calendar.lang.ok' | nzI18n) }}
            </button>
          </li>
        </ul>
      </div>
    }
  `,
      host: {
        class: "ant-picker-time-panel",
        "[class.ant-picker-time-panel-column-0]": `enabledColumns === 0 && !nzInDatePicker`,
        "[class.ant-picker-time-panel-column-1]": `enabledColumns === 1 && !nzInDatePicker`,
        "[class.ant-picker-time-panel-column-2]": `enabledColumns === 2 && !nzInDatePicker`,
        "[class.ant-picker-time-panel-column-3]": `enabledColumns === 3 && !nzInDatePicker`,
        "[class.ant-picker-time-panel-narrow]": `enabledColumns < 3`,
        "[class.ant-picker-time-panel-placement-bottomLeft]": `!nzInDatePicker`
      },
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzTimePickerPanelComponent),
        multi: true
      }],
      imports: [DecimalPipe, NgTemplateOutlet, NzI18nModule, NzButtonModule]
    }]
  }], null, {
    hourListElement: [{
      type: ViewChild,
      args: ["hourListElement", {
        static: false
      }]
    }],
    minuteListElement: [{
      type: ViewChild,
      args: ["minuteListElement", {
        static: false
      }]
    }],
    secondListElement: [{
      type: ViewChild,
      args: ["secondListElement", {
        static: false
      }]
    }],
    use12HoursListElement: [{
      type: ViewChild,
      args: ["use12HoursListElement", {
        static: false
      }]
    }],
    nzInDatePicker: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAddOn: [{
      type: Input
    }],
    nzHideDisabledOptions: [{
      type: Input
    }],
    nzClearText: [{
      type: Input
    }],
    nzNowText: [{
      type: Input
    }],
    nzOkText: [{
      type: Input
    }],
    nzPlaceHolder: [{
      type: Input
    }],
    nzUse12Hours: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDefaultOpenValue: [{
      type: Input
    }],
    closePanel: [{
      type: Output
    }],
    nzAllowEmpty: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDisabledHours: [{
      type: Input
    }],
    nzDisabledMinutes: [{
      type: Input
    }],
    nzDisabledSeconds: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    nzHourStep: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzMinuteStep: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    nzSecondStep: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME = "timePicker";
var NzTimePickerComponent = (() => {
  var _a;
  let _nzVariant_decorators;
  let _nzVariant_initializers = [];
  let _nzVariant_extraInitializers = [];
  let _nzHourStep_decorators;
  let _nzHourStep_initializers = [];
  let _nzHourStep_extraInitializers = [];
  let _nzMinuteStep_decorators;
  let _nzMinuteStep_initializers = [];
  let _nzMinuteStep_extraInitializers = [];
  let _nzSecondStep_decorators;
  let _nzSecondStep_initializers = [];
  let _nzSecondStep_extraInitializers = [];
  let _nzClearText_decorators;
  let _nzClearText_initializers = [];
  let _nzClearText_extraInitializers = [];
  let _nzNowText_decorators;
  let _nzNowText_initializers = [];
  let _nzNowText_extraInitializers = [];
  let _nzOkText_decorators;
  let _nzOkText_initializers = [];
  let _nzOkText_extraInitializers = [];
  let _nzPopupClassName_decorators;
  let _nzPopupClassName_initializers = [];
  let _nzPopupClassName_extraInitializers = [];
  let _nzFormat_decorators;
  let _nzFormat_initializers = [];
  let _nzFormat_extraInitializers = [];
  let _nzUse12Hours_decorators;
  let _nzUse12Hours_initializers = [];
  let _nzUse12Hours_extraInitializers = [];
  let _nzSuffixIcon_decorators;
  let _nzSuffixIcon_initializers = [];
  let _nzSuffixIcon_extraInitializers = [];
  let _nzAllowEmpty_decorators;
  let _nzAllowEmpty_initializers = [];
  let _nzAllowEmpty_extraInitializers = [];
  let _nzBackdrop_decorators;
  let _nzBackdrop_initializers = [];
  let _nzBackdrop_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME);
      __publicField(this, "nzConfigService", inject(NzConfigService));
      __publicField(this, "i18n", inject(NzI18nService));
      __publicField(this, "elementRef", inject(ElementRef));
      __publicField(this, "renderer", inject(Renderer2));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "dateHelper", inject(DateHelperService));
      __publicField(this, "platform", inject(Platform));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "dir", inject(Directionality).valueSignal);
      __publicField(this, "_onChange");
      __publicField(this, "_onTouched");
      __publicField(this, "isNzDisableFirstChange", true);
      __publicField(this, "isInit", false);
      __publicField(this, "focused", false);
      __publicField(this, "inputValue", "");
      __publicField(this, "value", null);
      __publicField(this, "preValue", null);
      __publicField(this, "inputSize");
      __publicField(this, "i18nPlaceHolder$", of(void 0));
      // status
      __publicField(this, "prefixCls", "ant-picker");
      __publicField(this, "statusCls", {});
      __publicField(this, "status", "");
      __publicField(this, "hasFeedback", false);
      __publicField(this, "inputRef");
      __publicField(this, "nzId", null);
      __publicField(this, "nzSize", "default");
      __publicField(this, "nzStatus", "");
      __publicField(this, "nzVariant", __runInitializers(this, _nzVariant_initializers, void 0));
      __publicField(this, "nzHourStep", (__runInitializers(this, _nzVariant_extraInitializers), __runInitializers(this, _nzHourStep_initializers, 1)));
      __publicField(this, "nzMinuteStep", (__runInitializers(this, _nzHourStep_extraInitializers), __runInitializers(this, _nzMinuteStep_initializers, 1)));
      __publicField(this, "nzSecondStep", (__runInitializers(this, _nzMinuteStep_extraInitializers), __runInitializers(this, _nzSecondStep_initializers, 1)));
      __publicField(this, "nzClearText", (__runInitializers(this, _nzSecondStep_extraInitializers), __runInitializers(this, _nzClearText_initializers, "clear")));
      __publicField(this, "nzNowText", (__runInitializers(this, _nzClearText_extraInitializers), __runInitializers(this, _nzNowText_initializers, "")));
      __publicField(this, "nzOkText", (__runInitializers(this, _nzNowText_extraInitializers), __runInitializers(this, _nzOkText_initializers, "")));
      __publicField(this, "nzPopupClassName", (__runInitializers(this, _nzOkText_extraInitializers), __runInitializers(this, _nzPopupClassName_initializers, "")));
      __publicField(this, "nzPlaceHolder", (__runInitializers(this, _nzPopupClassName_extraInitializers), ""));
      __publicField(this, "nzAddOn");
      __publicField(this, "nzDefaultOpenValue");
      __publicField(this, "nzDisabledHours");
      __publicField(this, "nzDisabledMinutes");
      __publicField(this, "nzDisabledSeconds");
      __publicField(this, "nzFormat", __runInitializers(this, _nzFormat_initializers, "HH:mm:ss"));
      __publicField(this, "nzOpen", (__runInitializers(this, _nzFormat_extraInitializers), false));
      __publicField(this, "nzUse12Hours", __runInitializers(this, _nzUse12Hours_initializers, false));
      __publicField(this, "nzSuffixIcon", (__runInitializers(this, _nzUse12Hours_extraInitializers), __runInitializers(this, _nzSuffixIcon_initializers, "clock-circle")));
      __publicField(this, "nzOpenChange", (__runInitializers(this, _nzSuffixIcon_extraInitializers), new EventEmitter()));
      __publicField(this, "nzHideDisabledOptions", false);
      __publicField(this, "nzAllowEmpty", __runInitializers(this, _nzAllowEmpty_initializers, true));
      __publicField(this, "nzDisabled", (__runInitializers(this, _nzAllowEmpty_extraInitializers), false));
      __publicField(this, "nzAutoFocus", false);
      __publicField(this, "nzBackdrop", __runInitializers(this, _nzBackdrop_initializers, false));
      __publicField(this, "nzInputReadOnly", (__runInitializers(this, _nzBackdrop_extraInitializers), false));
      __publicField(this, "formSize", inject(NZ_FORM_SIZE, {
        optional: true
      }));
      __publicField(this, "formVariant", inject(NZ_FORM_VARIANT, {
        optional: true
      }));
      __publicField(this, "hasConfirmed", false);
      __publicField(this, "nzPrefix", input(...ngDevMode ? [void 0, {
        debugName: "nzPrefix"
      }] : []));
      __publicField(this, "nzNeedConfirm", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
        debugName: "nzNeedConfirm"
      } : {}), {
        transform: booleanAttribute
      })));
      __publicField(this, "nzPlacement", input("bottomLeft", ...ngDevMode ? [{
        debugName: "nzPlacement"
      }] : []));
      __publicField(this, "currentPosition", linkedSignal(() => DATE_PICKER_POSITION_MAP[this.nzPlacement()], ...ngDevMode ? [{
        debugName: "currentPosition"
      }] : []));
      __publicField(this, "overlayPositions", computed(() => [this.currentPosition(), ...DEFAULT_DATE_PICKER_POSITIONS], ...ngDevMode ? [{
        debugName: "overlayPositions"
      }] : []));
      __publicField(this, "timepickerAnimationEnter", slideAnimationEnter());
      __publicField(this, "timepickerAnimationLeave", slideAnimationLeave());
      __publicField(this, "finalSize", computed(() => {
        var _a2;
        if ((_a2 = this.formSize) == null ? void 0 : _a2.call(this)) {
          return this.formSize();
        }
        if (this.compactSize) {
          return this.compactSize();
        }
        return this.size();
      }, ...ngDevMode ? [{
        debugName: "finalSize"
      }] : []));
      __publicField(this, "finalVariant", computed(() => {
        var _a2;
        return this.variant() || ((_a2 = this.formVariant) == null ? void 0 : _a2.call(this)) || "outlined";
      }, ...ngDevMode ? [{
        debugName: "finalVariant"
      }] : []));
      __publicField(this, "dropdownTimePickerClass", computed(() => {
        const classList = [this.generateClass("dropdown")];
        const {
          originX,
          originY
        } = this.currentPosition();
        const dir = this.dir();
        if (originX === "start" && originY === "bottom") {
          classList.push(this.generateClass("dropdown-placement-bottomLeft"));
        } else if (originX === "start" && originY === "top") {
          classList.push(this.generateClass("dropdown-placement-topLeft"));
        } else if (originX === "end" && originY === "bottom") {
          classList.push(this.generateClass("dropdown-placement-bottomRight"));
        } else if (originX === "end" && originY === "top") {
          classList.push(this.generateClass("dropdown-placement-topRight"));
        }
        if (dir === "rtl") {
          classList.push(this.generateClass("dropdown-rtl"));
        }
        return classList;
      }, ...ngDevMode ? [{
        debugName: "dropdownTimePickerClass"
      }] : []));
      __publicField(this, "size", signal(this.nzSize, ...ngDevMode ? [{
        debugName: "size"
      }] : []));
      __publicField(this, "variant", signal(this.nzVariant, ...ngDevMode ? [{
        debugName: "variant"
      }] : []));
      __publicField(this, "compactSize", inject(NZ_SPACE_COMPACT_SIZE, {
        optional: true
      }));
      __publicField(this, "nzFormStatusService", inject(NzFormStatusService, {
        optional: true
      }));
      __publicField(this, "nzFormNoStatusService", inject(NzFormNoStatusService, {
        optional: true
      }));
    }
    get origin() {
      return this.elementRef;
    }
    emitValue(value) {
      this.setValue(value, true);
      if (this._onChange) {
        this._onChange(this.value);
      }
      if (this._onTouched) {
        this._onTouched();
      }
    }
    setValue(value, syncPreValue = false) {
      if (syncPreValue) {
        this.preValue = isValid(value) ? new Date(value) : null;
      }
      this.value = isValid(value) ? new Date(value) : null;
      this.inputValue = this.dateHelper.format(value, this.nzFormat);
      this.cdr.markForCheck();
    }
    open() {
      if (this.nzDisabled || this.nzOpen) {
        return;
      }
      this.focus();
      this.nzOpen = true;
      this.nzOpenChange.emit(this.nzOpen);
    }
    close() {
      this.nzOpen = false;
      this.cdr.markForCheck();
      this.nzOpenChange.emit(this.nzOpen);
    }
    updateAutoFocus() {
      if (this.isInit && !this.nzDisabled) {
        if (this.nzAutoFocus) {
          this.renderer.setAttribute(this.inputRef.nativeElement, "autofocus", "autofocus");
        } else {
          this.renderer.removeAttribute(this.inputRef.nativeElement, "autofocus");
        }
      }
    }
    onClickClearBtn(event) {
      event.stopPropagation();
      this.emitValue(null);
    }
    onClickOutside(event) {
      const target = _getEventTarget(event);
      if (!this.elementRef.nativeElement.contains(target)) {
        this.setCurrentValueAndClose();
      }
    }
    onFocus(value) {
      this.focused = value;
      if (!value) {
        if (this.checkTimeValid(this.value)) {
          this.setCurrentValueAndClose();
        } else {
          this.setValue(this.preValue);
          this.close();
        }
      }
    }
    focus() {
      if (this.inputRef.nativeElement) {
        this.inputRef.nativeElement.focus();
      }
    }
    blur() {
      if (this.inputRef.nativeElement) {
        this.inputRef.nativeElement.blur();
      }
    }
    onKeyupEsc() {
      this.setValue(this.preValue);
    }
    onKeyupEnter() {
      if (this.nzOpen && isValid(this.value)) {
        this.setCurrentValueAndClose();
      } else if (!this.nzOpen) {
        this.open();
      }
    }
    onInputChange(str) {
      if (!this.platform.TRIDENT && document.activeElement === this.inputRef.nativeElement) {
        this.open();
        this.parseTimeString(str);
      }
    }
    onPanelValueChange(value) {
      this.setValue(value);
      this.focus();
    }
    closePanel() {
      this.hasConfirmed = true;
      this.inputRef.nativeElement.blur();
    }
    setCurrentValueAndClose() {
      if (this.hasConfirmed || !this.nzNeedConfirm()) {
        this.emitValue(this.value);
        this.hasConfirmed = false;
      } else {
        this.setValue(this.preValue);
      }
      this.close();
    }
    onPositionChange(position) {
      this.currentPosition.set(position.connectionPair);
    }
    ngOnInit() {
      var _a2;
      (_a2 = this.nzFormStatusService) == null ? void 0 : _a2.formStatusChanges.pipe(distinctUntilChanged((pre, cur) => pre.status === cur.status && pre.hasFeedback === cur.hasFeedback), withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : of(false)), map(([{
        status,
        hasFeedback
      }, noStatus]) => ({
        status: noStatus ? "" : status,
        hasFeedback
      })), takeUntilDestroyed(this.destroyRef)).subscribe(({
        status,
        hasFeedback
      }) => {
        this.setStatusStyles(status, hasFeedback);
      });
      this.inputSize = Math.max(8, this.nzFormat.length) + 2;
      this.i18nPlaceHolder$ = this.i18n.localeChange.pipe(map((nzLocale) => nzLocale.TimePicker.placeholder));
    }
    ngOnChanges({
      nzUse12Hours,
      nzFormat,
      nzDisabled,
      nzAutoFocus,
      nzStatus,
      nzSize,
      nzVariant
    }) {
      if (nzUse12Hours && !nzUse12Hours.previousValue && nzUse12Hours.currentValue && !nzFormat) {
        this.nzFormat = "h:mm:ss a";
      }
      if (nzDisabled) {
        const value = nzDisabled.currentValue;
        const input2 = this.inputRef.nativeElement;
        if (value) {
          this.renderer.setAttribute(input2, "disabled", "");
        } else {
          this.renderer.removeAttribute(input2, "disabled");
        }
      }
      if (nzAutoFocus) {
        this.updateAutoFocus();
      }
      if (nzStatus) {
        this.setStatusStyles(this.nzStatus, this.hasFeedback);
      }
      if (nzSize) {
        this.size.set(nzSize.currentValue);
      }
      if (nzVariant) {
        this.variant.set(nzVariant.currentValue);
      }
    }
    parseTimeString(str) {
      const value = this.dateHelper.parseTime(str, this.nzFormat) || null;
      if (isValid(value)) {
        this.value = value;
        this.cdr.markForCheck();
      }
    }
    ngAfterViewInit() {
      this.isInit = true;
      this.updateAutoFocus();
    }
    writeValue(time) {
      let result;
      if (time instanceof Date) {
        result = time;
      } else if (isNil(time)) {
        result = null;
      } else {
        warn('Non-Date type is not recommended for time-picker, use "Date" type.');
        result = new Date(time);
      }
      this.setValue(result, true);
    }
    registerOnChange(fn) {
      this._onChange = fn;
    }
    registerOnTouched(fn) {
      this._onTouched = fn;
    }
    setDisabledState(isDisabled) {
      this.nzDisabled = this.isNzDisableFirstChange && this.nzDisabled || isDisabled;
      this.isNzDisableFirstChange = false;
      this.cdr.markForCheck();
    }
    checkTimeValid(value) {
      var _a2, _b, _c;
      if (!value) {
        return true;
      }
      const disabledHours = (_a2 = this.nzDisabledHours) == null ? void 0 : _a2.call(this);
      const disabledMinutes = (_b = this.nzDisabledMinutes) == null ? void 0 : _b.call(this, value.getHours());
      const disabledSeconds = (_c = this.nzDisabledSeconds) == null ? void 0 : _c.call(this, value.getHours(), value.getMinutes());
      return !((disabledHours == null ? void 0 : disabledHours.includes(value.getHours())) || (disabledMinutes == null ? void 0 : disabledMinutes.includes(value.getMinutes())) || (disabledSeconds == null ? void 0 : disabledSeconds.includes(value.getSeconds())));
    }
    setStatusStyles(status, hasFeedback) {
      this.status = status;
      this.hasFeedback = hasFeedback;
      this.cdr.markForCheck();
      this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
      Object.keys(this.statusCls).forEach((status2) => {
        if (this.statusCls[status2]) {
          this.renderer.addClass(this.elementRef.nativeElement, status2);
        } else {
          this.renderer.removeClass(this.elementRef.nativeElement, status2);
        }
      });
    }
    generateClass(suffix) {
      return generateClassName(this.prefixCls, suffix);
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzVariant_decorators = [WithConfig()];
    _nzHourStep_decorators = [WithConfig()];
    _nzMinuteStep_decorators = [WithConfig()];
    _nzSecondStep_decorators = [WithConfig()];
    _nzClearText_decorators = [WithConfig()];
    _nzNowText_decorators = [WithConfig()];
    _nzOkText_decorators = [WithConfig()];
    _nzPopupClassName_decorators = [WithConfig()];
    _nzFormat_decorators = [WithConfig()];
    _nzUse12Hours_decorators = [WithConfig()];
    _nzSuffixIcon_decorators = [WithConfig()];
    _nzAllowEmpty_decorators = [WithConfig()];
    _nzBackdrop_decorators = [WithConfig()];
    __esDecorate(null, null, _nzVariant_decorators, {
      kind: "field",
      name: "nzVariant",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzVariant" in obj,
        get: (obj) => obj.nzVariant,
        set: (obj, value) => {
          obj.nzVariant = value;
        }
      },
      metadata: _metadata
    }, _nzVariant_initializers, _nzVariant_extraInitializers);
    __esDecorate(null, null, _nzHourStep_decorators, {
      kind: "field",
      name: "nzHourStep",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzHourStep" in obj,
        get: (obj) => obj.nzHourStep,
        set: (obj, value) => {
          obj.nzHourStep = value;
        }
      },
      metadata: _metadata
    }, _nzHourStep_initializers, _nzHourStep_extraInitializers);
    __esDecorate(null, null, _nzMinuteStep_decorators, {
      kind: "field",
      name: "nzMinuteStep",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzMinuteStep" in obj,
        get: (obj) => obj.nzMinuteStep,
        set: (obj, value) => {
          obj.nzMinuteStep = value;
        }
      },
      metadata: _metadata
    }, _nzMinuteStep_initializers, _nzMinuteStep_extraInitializers);
    __esDecorate(null, null, _nzSecondStep_decorators, {
      kind: "field",
      name: "nzSecondStep",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSecondStep" in obj,
        get: (obj) => obj.nzSecondStep,
        set: (obj, value) => {
          obj.nzSecondStep = value;
        }
      },
      metadata: _metadata
    }, _nzSecondStep_initializers, _nzSecondStep_extraInitializers);
    __esDecorate(null, null, _nzClearText_decorators, {
      kind: "field",
      name: "nzClearText",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzClearText" in obj,
        get: (obj) => obj.nzClearText,
        set: (obj, value) => {
          obj.nzClearText = value;
        }
      },
      metadata: _metadata
    }, _nzClearText_initializers, _nzClearText_extraInitializers);
    __esDecorate(null, null, _nzNowText_decorators, {
      kind: "field",
      name: "nzNowText",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzNowText" in obj,
        get: (obj) => obj.nzNowText,
        set: (obj, value) => {
          obj.nzNowText = value;
        }
      },
      metadata: _metadata
    }, _nzNowText_initializers, _nzNowText_extraInitializers);
    __esDecorate(null, null, _nzOkText_decorators, {
      kind: "field",
      name: "nzOkText",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzOkText" in obj,
        get: (obj) => obj.nzOkText,
        set: (obj, value) => {
          obj.nzOkText = value;
        }
      },
      metadata: _metadata
    }, _nzOkText_initializers, _nzOkText_extraInitializers);
    __esDecorate(null, null, _nzPopupClassName_decorators, {
      kind: "field",
      name: "nzPopupClassName",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzPopupClassName" in obj,
        get: (obj) => obj.nzPopupClassName,
        set: (obj, value) => {
          obj.nzPopupClassName = value;
        }
      },
      metadata: _metadata
    }, _nzPopupClassName_initializers, _nzPopupClassName_extraInitializers);
    __esDecorate(null, null, _nzFormat_decorators, {
      kind: "field",
      name: "nzFormat",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzFormat" in obj,
        get: (obj) => obj.nzFormat,
        set: (obj, value) => {
          obj.nzFormat = value;
        }
      },
      metadata: _metadata
    }, _nzFormat_initializers, _nzFormat_extraInitializers);
    __esDecorate(null, null, _nzUse12Hours_decorators, {
      kind: "field",
      name: "nzUse12Hours",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzUse12Hours" in obj,
        get: (obj) => obj.nzUse12Hours,
        set: (obj, value) => {
          obj.nzUse12Hours = value;
        }
      },
      metadata: _metadata
    }, _nzUse12Hours_initializers, _nzUse12Hours_extraInitializers);
    __esDecorate(null, null, _nzSuffixIcon_decorators, {
      kind: "field",
      name: "nzSuffixIcon",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSuffixIcon" in obj,
        get: (obj) => obj.nzSuffixIcon,
        set: (obj, value) => {
          obj.nzSuffixIcon = value;
        }
      },
      metadata: _metadata
    }, _nzSuffixIcon_initializers, _nzSuffixIcon_extraInitializers);
    __esDecorate(null, null, _nzAllowEmpty_decorators, {
      kind: "field",
      name: "nzAllowEmpty",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzAllowEmpty" in obj,
        get: (obj) => obj.nzAllowEmpty,
        set: (obj, value) => {
          obj.nzAllowEmpty = value;
        }
      },
      metadata: _metadata
    }, _nzAllowEmpty_initializers, _nzAllowEmpty_extraInitializers);
    __esDecorate(null, null, _nzBackdrop_decorators, {
      kind: "field",
      name: "nzBackdrop",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzBackdrop" in obj,
        get: (obj) => obj.nzBackdrop,
        set: (obj, value) => {
          obj.nzBackdrop = value;
        }
      },
      metadata: _metadata
    }, _nzBackdrop_initializers, _nzBackdrop_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzTimePickerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-time-picker"]],
    viewQuery: function NzTimePickerComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c4, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.inputRef = _t.first);
      }
    },
    hostAttrs: [1, "ant-picker"],
    hostVars: 16,
    hostBindings: function NzTimePickerComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function NzTimePickerComponent_click_HostBindingHandler() {
          return ctx.open();
        });
      }
      if (rf & 2) {
        \u0275\u0275classProp("ant-picker-large", ctx.finalSize() === "large")("ant-picker-small", ctx.finalSize() === "small")("ant-picker-disabled", ctx.nzDisabled)("ant-picker-focused", ctx.focused)("ant-picker-rtl", ctx.dir() === "rtl")("ant-picker-borderless", ctx.finalVariant() === "borderless")("ant-picker-filled", ctx.finalVariant() === "filled")("ant-picker-underlined", ctx.finalVariant() === "underlined");
      }
    },
    inputs: {
      nzId: "nzId",
      nzSize: "nzSize",
      nzStatus: "nzStatus",
      nzVariant: "nzVariant",
      nzHourStep: "nzHourStep",
      nzMinuteStep: "nzMinuteStep",
      nzSecondStep: "nzSecondStep",
      nzClearText: "nzClearText",
      nzNowText: "nzNowText",
      nzOkText: "nzOkText",
      nzPopupClassName: "nzPopupClassName",
      nzPlaceHolder: "nzPlaceHolder",
      nzAddOn: "nzAddOn",
      nzDefaultOpenValue: "nzDefaultOpenValue",
      nzDisabledHours: "nzDisabledHours",
      nzDisabledMinutes: "nzDisabledMinutes",
      nzDisabledSeconds: "nzDisabledSeconds",
      nzFormat: "nzFormat",
      nzOpen: "nzOpen",
      nzUse12Hours: [2, "nzUse12Hours", "nzUse12Hours", booleanAttribute],
      nzSuffixIcon: "nzSuffixIcon",
      nzHideDisabledOptions: [2, "nzHideDisabledOptions", "nzHideDisabledOptions", booleanAttribute],
      nzAllowEmpty: [2, "nzAllowEmpty", "nzAllowEmpty", booleanAttribute],
      nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
      nzAutoFocus: [2, "nzAutoFocus", "nzAutoFocus", booleanAttribute],
      nzBackdrop: "nzBackdrop",
      nzInputReadOnly: [2, "nzInputReadOnly", "nzInputReadOnly", booleanAttribute],
      nzPrefix: [1, "nzPrefix"],
      nzNeedConfirm: [1, "nzNeedConfirm"],
      nzPlacement: [1, "nzPlacement"]
    },
    outputs: {
      nzOpenChange: "nzOpenChange"
    },
    exportAs: ["nzTimePicker"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _a),
      multi: true
    }, {
      provide: NZ_SPACE_COMPACT_ITEM_TYPE,
      useValue: "picker"
    }]), \u0275\u0275HostDirectivesFeature([NzSpaceCompactItemDirective]), \u0275\u0275NgOnChangesFeature],
    decls: 10,
    vars: 16,
    consts: [["inputElement", ""], [1, "ant-picker-prefix"], [1, "ant-picker-input"], ["type", "text", "autocomplete", "off", 3, "ngModelChange", "focus", "blur", "keyup.enter", "keyup.escape", "size", "placeholder", "ngModel", "disabled", "readOnly"], [1, "ant-picker-suffix"], [4, "nzStringTemplateOutlet"], [3, "status"], [1, "ant-picker-clear"], ["cdkConnectedOverlay", "", "nzConnectedOverlay", "", "cdkConnectedOverlayTransformOriginOn", ".ant-picker-dropdown", 3, "detach", "overlayOutsideClick", "positionChange", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayPositions", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen"], [3, "nzType"], [1, "ant-picker-clear", 3, "click"], ["nzType", "close-circle", "nzTheme", "fill"], [2, "position", "relative"], [1, "ant-picker-panel-container"], ["tabindex", "-1", 1, "ant-picker-panel"], [3, "ngModelChange", "closePanel", "format", "nzHourStep", "nzMinuteStep", "nzSecondStep", "nzDisabledHours", "nzDisabledMinutes", "nzDisabledSeconds", "nzPlaceHolder", "nzHideDisabledOptions", "nzUse12Hours", "nzDefaultOpenValue", "nzAddOn", "nzClearText", "nzNowText", "nzOkText", "nzAllowEmpty", "ngModel"]],
    template: function NzTimePickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275conditionalCreate(0, NzTimePickerComponent_Conditional_0_Template, 2, 1, "span", 1);
        \u0275\u0275elementStart(1, "div", 2)(2, "input", 3, 0);
        \u0275\u0275pipe(4, "async");
        \u0275\u0275twoWayListener("ngModelChange", function NzTimePickerComponent_Template_input_ngModelChange_2_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.inputValue, $event) || (ctx.inputValue = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275listener("focus", function NzTimePickerComponent_Template_input_focus_2_listener() {
          return ctx.onFocus(true);
        })("blur", function NzTimePickerComponent_Template_input_blur_2_listener() {
          return ctx.onFocus(false);
        })("keyup.enter", function NzTimePickerComponent_Template_input_keyup_enter_2_listener() {
          return ctx.onKeyupEnter();
        })("keyup.escape", function NzTimePickerComponent_Template_input_keyup_escape_2_listener() {
          return ctx.onKeyupEsc();
        })("ngModelChange", function NzTimePickerComponent_Template_input_ngModelChange_2_listener($event) {
          return ctx.onInputChange($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "span", 4);
        \u0275\u0275template(6, NzTimePickerComponent_ng_container_6_Template, 2, 1, "ng-container", 5);
        \u0275\u0275conditionalCreate(7, NzTimePickerComponent_Conditional_7_Template, 1, 1, "nz-form-item-feedback-icon", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(8, NzTimePickerComponent_Conditional_8_Template, 2, 2, "span", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, NzTimePickerComponent_ng_template_9_Template, 5, 23, "ng-template", 8);
        \u0275\u0275listener("detach", function NzTimePickerComponent_Template_ng_template_detach_9_listener() {
          return ctx.close();
        })("overlayOutsideClick", function NzTimePickerComponent_Template_ng_template_overlayOutsideClick_9_listener($event) {
          return ctx.onClickOutside($event);
        })("positionChange", function NzTimePickerComponent_Template_ng_template_positionChange_9_listener($event) {
          return ctx.onPositionChange($event);
        });
      }
      if (rf & 2) {
        let tmp_1_0;
        \u0275\u0275conditional((tmp_1_0 = ctx.nzPrefix()) ? 0 : -1, tmp_1_0);
        \u0275\u0275advance(2);
        \u0275\u0275property("size", ctx.inputSize)("placeholder", ctx.nzPlaceHolder || \u0275\u0275pipeBind1(4, 14, ctx.i18nPlaceHolder$));
        \u0275\u0275twoWayProperty("ngModel", ctx.inputValue);
        \u0275\u0275property("disabled", ctx.nzDisabled)("readOnly", ctx.nzInputReadOnly);
        \u0275\u0275attribute("id", ctx.nzId);
        \u0275\u0275advance(4);
        \u0275\u0275property("nzStringTemplateOutlet", ctx.nzSuffixIcon);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.hasFeedback && !!ctx.status ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.nzAllowEmpty && !ctx.nzDisabled && ctx.value ? 8 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("cdkConnectedOverlayHasBackdrop", ctx.nzBackdrop)("cdkConnectedOverlayPositions", ctx.overlayPositions())("cdkConnectedOverlayOrigin", ctx.origin)("cdkConnectedOverlayOpen", ctx.nzOpen);
      }
    },
    dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, NzOutletModule, NzStringTemplateOutletDirective, NzIconModule, NzIconDirective, NzFormItemFeedbackIconComponent, NzTimePickerPanelComponent, NzOverlayModule, NzConnectedOverlayDirective, OverlayModule, CdkConnectedOverlay, AsyncPipe],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTimePickerComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "nz-time-picker",
      exportAs: "nzTimePicker",
      template: `
    @if (nzPrefix(); as prefix) {
      <span class="ant-picker-prefix">
        <ng-container *nzStringTemplateOutlet="prefix">{{ prefix }}</ng-container>
      </span>
    }
    <div class="ant-picker-input">
      <input
        #inputElement
        [attr.id]="nzId"
        type="text"
        [size]="inputSize"
        autocomplete="off"
        [placeholder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
        [(ngModel)]="inputValue"
        [disabled]="nzDisabled"
        [readOnly]="nzInputReadOnly"
        (focus)="onFocus(true)"
        (blur)="onFocus(false)"
        (keyup.enter)="onKeyupEnter()"
        (keyup.escape)="onKeyupEsc()"
        (ngModelChange)="onInputChange($event)"
      />
      <span class="ant-picker-suffix">
        <ng-container *nzStringTemplateOutlet="nzSuffixIcon; let suffixIcon">
          <nz-icon [nzType]="suffixIcon" />
        </ng-container>
        @if (hasFeedback && !!status) {
          <nz-form-item-feedback-icon [status]="status" />
        }
      </span>
      @if (nzAllowEmpty && !nzDisabled && value) {
        <span class="ant-picker-clear" (click)="onClickClearBtn($event)">
          <nz-icon nzType="close-circle" nzTheme="fill" [attr.aria-label]="nzClearText" [attr.title]="nzClearText" />
        </span>
      }
    </div>

    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      cdkConnectedOverlayTransformOriginOn=".ant-picker-dropdown"
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayPositions]="overlayPositions()"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="nzOpen"
      (detach)="close()"
      (overlayOutsideClick)="onClickOutside($event)"
      (positionChange)="onPositionChange($event)"
    >
      <div
        [animate.enter]="timepickerAnimationEnter()"
        [animate.leave]="timepickerAnimationLeave()"
        [class]="dropdownTimePickerClass()"
        style="position: relative"
      >
        <div class="ant-picker-panel-container">
          <div tabindex="-1" class="ant-picker-panel">
            <nz-time-picker-panel
              [class]="nzPopupClassName"
              [format]="nzFormat"
              [nzHourStep]="nzHourStep"
              [nzMinuteStep]="nzMinuteStep"
              [nzSecondStep]="nzSecondStep"
              [nzDisabledHours]="nzDisabledHours"
              [nzDisabledMinutes]="nzDisabledMinutes"
              [nzDisabledSeconds]="nzDisabledSeconds"
              [nzPlaceHolder]="nzPlaceHolder || (i18nPlaceHolder$ | async)"
              [nzHideDisabledOptions]="nzHideDisabledOptions"
              [nzUse12Hours]="nzUse12Hours"
              [nzDefaultOpenValue]="nzDefaultOpenValue"
              [nzAddOn]="nzAddOn"
              [nzClearText]="nzClearText"
              [nzNowText]="nzNowText"
              [nzOkText]="nzOkText"
              [nzAllowEmpty]="nzAllowEmpty"
              [(ngModel)]="value"
              (ngModelChange)="onPanelValueChange($event)"
              (closePanel)="closePanel()"
            />
          </div>
        </div>
      </div>
    </ng-template>
  `,
      host: {
        class: "ant-picker",
        "[class.ant-picker-large]": `finalSize() === 'large'`,
        "[class.ant-picker-small]": `finalSize() === 'small'`,
        "[class.ant-picker-disabled]": `nzDisabled`,
        "[class.ant-picker-focused]": `focused`,
        "[class.ant-picker-rtl]": `dir() === 'rtl'`,
        "[class.ant-picker-borderless]": `finalVariant() === 'borderless'`,
        "[class.ant-picker-filled]": `finalVariant() === 'filled'`,
        "[class.ant-picker-underlined]": `finalVariant() === 'underlined'`,
        "(click)": "open()"
      },
      hostDirectives: [NzSpaceCompactItemDirective],
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzTimePickerComponent),
        multi: true
      }, {
        provide: NZ_SPACE_COMPACT_ITEM_TYPE,
        useValue: "picker"
      }],
      imports: [AsyncPipe, FormsModule, NzOutletModule, NzIconModule, NzFormItemFeedbackIconComponent, NzTimePickerPanelComponent, NzOverlayModule, OverlayModule]
    }]
  }], null, {
    inputRef: [{
      type: ViewChild,
      args: ["inputElement", {
        static: true
      }]
    }],
    nzId: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzStatus: [{
      type: Input
    }],
    nzVariant: [{
      type: Input
    }],
    nzHourStep: [{
      type: Input
    }],
    nzMinuteStep: [{
      type: Input
    }],
    nzSecondStep: [{
      type: Input
    }],
    nzClearText: [{
      type: Input
    }],
    nzNowText: [{
      type: Input
    }],
    nzOkText: [{
      type: Input
    }],
    nzPopupClassName: [{
      type: Input
    }],
    nzPlaceHolder: [{
      type: Input
    }],
    nzAddOn: [{
      type: Input
    }],
    nzDefaultOpenValue: [{
      type: Input
    }],
    nzDisabledHours: [{
      type: Input
    }],
    nzDisabledMinutes: [{
      type: Input
    }],
    nzDisabledSeconds: [{
      type: Input
    }],
    nzFormat: [{
      type: Input
    }],
    nzOpen: [{
      type: Input
    }],
    nzUse12Hours: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSuffixIcon: [{
      type: Input
    }],
    nzOpenChange: [{
      type: Output
    }],
    nzHideDisabledOptions: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAllowEmpty: [{
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
    nzAutoFocus: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzBackdrop: [{
      type: Input
    }],
    nzInputReadOnly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
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
    nzNeedConfirm: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzNeedConfirm",
        required: false
      }]
    }],
    nzPlacement: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzPlacement",
        required: false
      }]
    }]
  });
})();
var _NzTimePickerModule = class _NzTimePickerModule {
};
__publicField(_NzTimePickerModule, "\u0275fac", function NzTimePickerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTimePickerModule)();
});
__publicField(_NzTimePickerModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzTimePickerModule,
  imports: [NzTimePickerComponent, NzTimePickerPanelComponent],
  exports: [NzTimePickerPanelComponent, NzTimePickerComponent]
}));
__publicField(_NzTimePickerModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzTimePickerComponent, NzTimePickerPanelComponent]
}));
var NzTimePickerModule = _NzTimePickerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTimePickerModule, [{
    type: NgModule,
    args: [{
      imports: [NzTimePickerComponent, NzTimePickerPanelComponent],
      exports: [NzTimePickerPanelComponent, NzTimePickerComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-date-picker.mjs
function CalendarFooterComponent_Conditional_1_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate(ctx_r0.extraFooter);
  }
}
function CalendarFooterComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, CalendarFooterComponent_Conditional_1_ng_template_1_Template, 1, 1, "ng-template", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-footer-extra"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.extraFooter);
  }
}
function CalendarFooterComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 3);
    \u0275\u0275listener("click", function CalendarFooterComponent_Conditional_2_Template_a_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.isTodayDisabled ? null : ctx_r0.onClickToday());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate2("", ctx_r0.prefixCls, "-today-btn ", ctx_r0.isTodayDisabled ? ctx_r0.prefixCls + "-today-btn-disabled" : ""));
    \u0275\u0275property("title", \u0275\u0275interpolate(ctx_r0.todayTitle));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.locale.today, " ");
  }
}
function CalendarFooterComponent_Conditional_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function CalendarFooterComponent_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "a", 5);
    \u0275\u0275listener("click", function CalendarFooterComponent_Conditional_3_Conditional_2_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.isTodayDisabled ? null : ctx_r0.onClickToday());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-now"));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-now-btn"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.locale.now, " ");
  }
}
function CalendarFooterComponent_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li")(1, "button", 6);
    \u0275\u0275listener("click", function CalendarFooterComponent_Conditional_3_Conditional_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.okDisabled ? null : ctx_r0.clickOk.emit());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-ok"));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r0.okDisabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.locale.ok, " ");
  }
}
function CalendarFooterComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul");
    \u0275\u0275template(1, CalendarFooterComponent_Conditional_3_ng_container_1_Template, 1, 0, "ng-container", 4);
    \u0275\u0275conditionalCreate(2, CalendarFooterComponent_Conditional_3_Conditional_2_Template, 3, 7, "li", 0);
    \u0275\u0275conditionalCreate(3, CalendarFooterComponent_Conditional_3_Conditional_3_Template, 3, 5, "li", 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-ranges"));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.rangeQuickSelector);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.showNow ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasTimePicker ? 3 : -1);
  }
}
function _forTrack0($index, $item) {
  return this.trackBySelector($item);
}
function DecadeHeaderComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function DecadeHeaderComponent_For_7_Template_button_click_0_listener() {
      const selector_r2 = \u0275\u0275restoreView(_r1).$implicit;
      return \u0275\u0275resetView(selector_r2.onClick());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const selector_r2 = ctx.$implicit;
    \u0275\u0275classMap(selector_r2.className);
    \u0275\u0275domProperty("title", \u0275\u0275interpolate(selector_r2.title || null));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", selector_r2.label, " ");
  }
}
var _c02 = (a0) => ({
  $implicit: a0
});
var _forTrack1 = ($index, $item) => $item.trackByIndex;
function DecadeTableComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 3);
  }
}
function DecadeTableComponent_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r1 = ctx.$implicit;
    \u0275\u0275property("title", cell_r1.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r1.content);
  }
}
function DecadeTableComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "thead")(1, "tr", 2);
    \u0275\u0275conditionalCreate(2, DecadeTableComponent_Conditional_1_Conditional_2_Template, 1, 0, "th", 3);
    \u0275\u0275repeaterCreate(3, DecadeTableComponent_Conditional_1_For_4_Template, 2, 2, "th", 4, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showWeek ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.headRow);
  }
}
function DecadeTableComponent_For_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-week"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r3.weekNum);
  }
}
function DecadeTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function DecadeTableComponent_For_4_For_3_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DecadeTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template, 1, 1, "ng-template", 10);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, cell_r5.value));
  }
}
function DecadeTableComponent_For_4_For_3_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-inner"));
    \u0275\u0275attribute("aria-selected", cell_r5.isSelected)("aria-disabled", cell_r5.isDisabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.content, " ");
  }
}
function DecadeTableComponent_For_4_For_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DecadeTableComponent_For_4_For_3_Case_1_Conditional_0_Template, 1, 4, null, 10)(1, DecadeTableComponent_For_4_For_3_Case_1_Conditional_1_Template, 2, 6, "div", 11);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(cell_r5.cellRender ? 0 : 1);
  }
}
function DecadeTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.fullCellRender, " ");
  }
}
function DecadeTableComponent_For_4_For_3_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DecadeTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template, 2, 1, "ng-container", 12);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.fullCellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, cell_r5.value));
  }
}
function DecadeTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function DecadeTableComponent_For_4_For_3_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275template(3, DecadeTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template, 2, 1, "ng-container", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-value"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cell_r5.content);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-content"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(9, _c02, cell_r5.value));
  }
}
function DecadeTableComponent_For_4_For_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, DecadeTableComponent_For_4_For_3_Case_2_Conditional_1_Template, 1, 4, "ng-container")(2, DecadeTableComponent_For_4_For_3_Case_2_Conditional_2_Template, 4, 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date ant-picker-cell-inner"));
    \u0275\u0275classProp("ant-picker-calendar-date-today", cell_r5.isToday);
    \u0275\u0275advance();
    \u0275\u0275conditional(cell_r5.fullCellRender ? 1 : 2);
  }
}
function DecadeTableComponent_For_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 8);
    \u0275\u0275listener("click", function DecadeTableComponent_For_4_For_3_Template_td_click_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.isDisabled ? null : cell_r5.onClick());
    })("mouseenter", function DecadeTableComponent_For_4_For_3_Template_td_mouseenter_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.onMouseEnter());
    });
    \u0275\u0275conditionalCreate(1, DecadeTableComponent_For_4_For_3_Case_1_Template, 2, 1)(2, DecadeTableComponent_For_4_For_3_Case_2_Template, 3, 6, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const cell_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(cell_r5.classMap);
    \u0275\u0275property("title", cell_r5.title);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = ctx_r1.prefixCls) === "ant-picker" ? 1 : tmp_22_0 === "ant-picker-calendar" ? 2 : -1);
  }
}
function DecadeTableComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 2);
    \u0275\u0275conditionalCreate(1, DecadeTableComponent_For_4_Conditional_1_Template, 2, 4, "td", 5);
    \u0275\u0275repeaterCreate(2, DecadeTableComponent_For_4_For_3_Template, 3, 4, "td", 6, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275classMap(row_r3.classMap);
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r3.weekNum ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r3.dateCells);
  }
}
function YearHeaderComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function YearHeaderComponent_For_7_Template_button_click_0_listener() {
      const selector_r2 = \u0275\u0275restoreView(_r1).$implicit;
      return \u0275\u0275resetView(selector_r2.onClick());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const selector_r2 = ctx.$implicit;
    \u0275\u0275classMap(selector_r2.className);
    \u0275\u0275domProperty("title", \u0275\u0275interpolate(selector_r2.title || null));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", selector_r2.label, " ");
  }
}
function YearTableComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 3);
  }
}
function YearTableComponent_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r1 = ctx.$implicit;
    \u0275\u0275property("title", cell_r1.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r1.content);
  }
}
function YearTableComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "thead")(1, "tr", 2);
    \u0275\u0275conditionalCreate(2, YearTableComponent_Conditional_1_Conditional_2_Template, 1, 0, "th", 3);
    \u0275\u0275repeaterCreate(3, YearTableComponent_Conditional_1_For_4_Template, 2, 2, "th", 4, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showWeek ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.headRow);
  }
}
function YearTableComponent_For_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-week"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r3.weekNum);
  }
}
function YearTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function YearTableComponent_For_4_For_3_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, YearTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template, 1, 1, "ng-template", 10);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, cell_r5.value));
  }
}
function YearTableComponent_For_4_For_3_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-inner"));
    \u0275\u0275attribute("aria-selected", cell_r5.isSelected)("aria-disabled", cell_r5.isDisabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.content, " ");
  }
}
function YearTableComponent_For_4_For_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, YearTableComponent_For_4_For_3_Case_1_Conditional_0_Template, 1, 4, null, 10)(1, YearTableComponent_For_4_For_3_Case_1_Conditional_1_Template, 2, 6, "div", 11);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(cell_r5.cellRender ? 0 : 1);
  }
}
function YearTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.fullCellRender, " ");
  }
}
function YearTableComponent_For_4_For_3_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, YearTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template, 2, 1, "ng-container", 12);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.fullCellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, cell_r5.value));
  }
}
function YearTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function YearTableComponent_For_4_For_3_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275template(3, YearTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template, 2, 1, "ng-container", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-value"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cell_r5.content);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-content"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(9, _c02, cell_r5.value));
  }
}
function YearTableComponent_For_4_For_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, YearTableComponent_For_4_For_3_Case_2_Conditional_1_Template, 1, 4, "ng-container")(2, YearTableComponent_For_4_For_3_Case_2_Conditional_2_Template, 4, 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date ant-picker-cell-inner"));
    \u0275\u0275classProp("ant-picker-calendar-date-today", cell_r5.isToday);
    \u0275\u0275advance();
    \u0275\u0275conditional(cell_r5.fullCellRender ? 1 : 2);
  }
}
function YearTableComponent_For_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 8);
    \u0275\u0275listener("click", function YearTableComponent_For_4_For_3_Template_td_click_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.isDisabled ? null : cell_r5.onClick());
    })("mouseenter", function YearTableComponent_For_4_For_3_Template_td_mouseenter_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.onMouseEnter());
    });
    \u0275\u0275conditionalCreate(1, YearTableComponent_For_4_For_3_Case_1_Template, 2, 1)(2, YearTableComponent_For_4_For_3_Case_2_Template, 3, 6, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const cell_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(cell_r5.classMap);
    \u0275\u0275property("title", cell_r5.title);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = ctx_r1.prefixCls) === "ant-picker" ? 1 : tmp_22_0 === "ant-picker-calendar" ? 2 : -1);
  }
}
function YearTableComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 2);
    \u0275\u0275conditionalCreate(1, YearTableComponent_For_4_Conditional_1_Template, 2, 4, "td", 5);
    \u0275\u0275repeaterCreate(2, YearTableComponent_For_4_For_3_Template, 3, 4, "td", 6, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275classMap(row_r3.classMap);
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r3.weekNum ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r3.dateCells);
  }
}
function QuarterHeaderComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function QuarterHeaderComponent_For_7_Template_button_click_0_listener() {
      const selector_r2 = \u0275\u0275restoreView(_r1).$implicit;
      return \u0275\u0275resetView(selector_r2.onClick());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const selector_r2 = ctx.$implicit;
    \u0275\u0275classMap(selector_r2.className);
    \u0275\u0275domProperty("title", \u0275\u0275interpolate(selector_r2.title || null));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", selector_r2.label, " ");
  }
}
function QuarterTableComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 3);
  }
}
function QuarterTableComponent_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r1 = ctx.$implicit;
    \u0275\u0275property("title", cell_r1.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r1.content);
  }
}
function QuarterTableComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "thead")(1, "tr", 2);
    \u0275\u0275conditionalCreate(2, QuarterTableComponent_Conditional_1_Conditional_2_Template, 1, 0, "th", 3);
    \u0275\u0275repeaterCreate(3, QuarterTableComponent_Conditional_1_For_4_Template, 2, 2, "th", 4, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showWeek ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.headRow);
  }
}
function QuarterTableComponent_For_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-week"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r3.weekNum);
  }
}
function QuarterTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function QuarterTableComponent_For_4_For_3_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, QuarterTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template, 1, 1, "ng-template", 10);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, cell_r5.value));
  }
}
function QuarterTableComponent_For_4_For_3_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-inner"));
    \u0275\u0275attribute("aria-selected", cell_r5.isSelected)("aria-disabled", cell_r5.isDisabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.content, " ");
  }
}
function QuarterTableComponent_For_4_For_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, QuarterTableComponent_For_4_For_3_Case_1_Conditional_0_Template, 1, 4, null, 10)(1, QuarterTableComponent_For_4_For_3_Case_1_Conditional_1_Template, 2, 6, "div", 11);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(cell_r5.cellRender ? 0 : 1);
  }
}
function QuarterTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.fullCellRender, " ");
  }
}
function QuarterTableComponent_For_4_For_3_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, QuarterTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template, 2, 1, "ng-container", 12);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.fullCellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, cell_r5.value));
  }
}
function QuarterTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function QuarterTableComponent_For_4_For_3_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275template(3, QuarterTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template, 2, 1, "ng-container", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-value"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cell_r5.content);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-content"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(9, _c02, cell_r5.value));
  }
}
function QuarterTableComponent_For_4_For_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, QuarterTableComponent_For_4_For_3_Case_2_Conditional_1_Template, 1, 4, "ng-container")(2, QuarterTableComponent_For_4_For_3_Case_2_Conditional_2_Template, 4, 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date ant-picker-cell-inner"));
    \u0275\u0275classProp("ant-picker-calendar-date-today", cell_r5.isToday);
    \u0275\u0275advance();
    \u0275\u0275conditional(cell_r5.fullCellRender ? 1 : 2);
  }
}
function QuarterTableComponent_For_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 8);
    \u0275\u0275listener("click", function QuarterTableComponent_For_4_For_3_Template_td_click_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.isDisabled ? null : cell_r5.onClick());
    })("mouseenter", function QuarterTableComponent_For_4_For_3_Template_td_mouseenter_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.onMouseEnter());
    });
    \u0275\u0275conditionalCreate(1, QuarterTableComponent_For_4_For_3_Case_1_Template, 2, 1)(2, QuarterTableComponent_For_4_For_3_Case_2_Template, 3, 6, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const cell_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(cell_r5.classMap);
    \u0275\u0275property("title", cell_r5.title);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = ctx_r1.prefixCls) === "ant-picker" ? 1 : tmp_22_0 === "ant-picker-calendar" ? 2 : -1);
  }
}
function QuarterTableComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 2);
    \u0275\u0275conditionalCreate(1, QuarterTableComponent_For_4_Conditional_1_Template, 2, 4, "td", 5);
    \u0275\u0275repeaterCreate(2, QuarterTableComponent_For_4_For_3_Template, 3, 4, "td", 6, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275classMap(row_r3.classMap);
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r3.weekNum ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r3.dateCells);
  }
}
function MonthHeaderComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function MonthHeaderComponent_For_7_Template_button_click_0_listener() {
      const selector_r2 = \u0275\u0275restoreView(_r1).$implicit;
      return \u0275\u0275resetView(selector_r2.onClick());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const selector_r2 = ctx.$implicit;
    \u0275\u0275classMap(selector_r2.className);
    \u0275\u0275domProperty("title", \u0275\u0275interpolate(selector_r2.title || null));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", selector_r2.label, " ");
  }
}
function MonthTableComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 3);
  }
}
function MonthTableComponent_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r1 = ctx.$implicit;
    \u0275\u0275property("title", cell_r1.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r1.content);
  }
}
function MonthTableComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "thead")(1, "tr", 2);
    \u0275\u0275conditionalCreate(2, MonthTableComponent_Conditional_1_Conditional_2_Template, 1, 0, "th", 3);
    \u0275\u0275repeaterCreate(3, MonthTableComponent_Conditional_1_For_4_Template, 2, 2, "th", 4, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showWeek ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.headRow);
  }
}
function MonthTableComponent_For_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-week"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r3.weekNum);
  }
}
function MonthTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function MonthTableComponent_For_4_For_3_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MonthTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template, 1, 1, "ng-template", 10);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, cell_r5.value));
  }
}
function MonthTableComponent_For_4_For_3_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-inner"));
    \u0275\u0275attribute("aria-selected", cell_r5.isSelected)("aria-disabled", cell_r5.isDisabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.content, " ");
  }
}
function MonthTableComponent_For_4_For_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, MonthTableComponent_For_4_For_3_Case_1_Conditional_0_Template, 1, 4, null, 10)(1, MonthTableComponent_For_4_For_3_Case_1_Conditional_1_Template, 2, 6, "div", 11);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(cell_r5.cellRender ? 0 : 1);
  }
}
function MonthTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.fullCellRender, " ");
  }
}
function MonthTableComponent_For_4_For_3_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MonthTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template, 2, 1, "ng-container", 12);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.fullCellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, cell_r5.value));
  }
}
function MonthTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function MonthTableComponent_For_4_For_3_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275template(3, MonthTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template, 2, 1, "ng-container", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-value"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cell_r5.content);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-content"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(9, _c02, cell_r5.value));
  }
}
function MonthTableComponent_For_4_For_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, MonthTableComponent_For_4_For_3_Case_2_Conditional_1_Template, 1, 4, "ng-container")(2, MonthTableComponent_For_4_For_3_Case_2_Conditional_2_Template, 4, 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date ant-picker-cell-inner"));
    \u0275\u0275classProp("ant-picker-calendar-date-today", cell_r5.isToday);
    \u0275\u0275advance();
    \u0275\u0275conditional(cell_r5.fullCellRender ? 1 : 2);
  }
}
function MonthTableComponent_For_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 8);
    \u0275\u0275listener("click", function MonthTableComponent_For_4_For_3_Template_td_click_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.isDisabled ? null : cell_r5.onClick());
    })("mouseenter", function MonthTableComponent_For_4_For_3_Template_td_mouseenter_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.onMouseEnter());
    });
    \u0275\u0275conditionalCreate(1, MonthTableComponent_For_4_For_3_Case_1_Template, 2, 1)(2, MonthTableComponent_For_4_For_3_Case_2_Template, 3, 6, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const cell_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(cell_r5.classMap);
    \u0275\u0275property("title", cell_r5.title);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = ctx_r1.prefixCls) === "ant-picker" ? 1 : tmp_22_0 === "ant-picker-calendar" ? 2 : -1);
  }
}
function MonthTableComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 2);
    \u0275\u0275conditionalCreate(1, MonthTableComponent_For_4_Conditional_1_Template, 2, 4, "td", 5);
    \u0275\u0275repeaterCreate(2, MonthTableComponent_For_4_For_3_Template, 3, 4, "td", 6, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275classMap(row_r3.classMap);
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r3.weekNum ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r3.dateCells);
  }
}
function DateHeaderComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function DateHeaderComponent_For_7_Template_button_click_0_listener() {
      const selector_r2 = \u0275\u0275restoreView(_r1).$implicit;
      return \u0275\u0275resetView(selector_r2.onClick());
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const selector_r2 = ctx.$implicit;
    \u0275\u0275classMap(selector_r2.className);
    \u0275\u0275domProperty("title", \u0275\u0275interpolate(selector_r2.title || null));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", selector_r2.label, " ");
  }
}
function DateTableComponent_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 3);
  }
}
function DateTableComponent_Conditional_1_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r1 = ctx.$implicit;
    \u0275\u0275property("title", cell_r1.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r1.content);
  }
}
function DateTableComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "thead")(1, "tr", 2);
    \u0275\u0275conditionalCreate(2, DateTableComponent_Conditional_1_Conditional_2_Template, 1, 0, "th", 3);
    \u0275\u0275repeaterCreate(3, DateTableComponent_Conditional_1_For_4_Template, 2, 2, "th", 4, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.showWeek ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.headRow);
  }
}
function DateTableComponent_For_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-week"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r3.weekNum);
  }
}
function DateTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function DateTableComponent_For_4_For_3_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DateTableComponent_For_4_For_3_Case_1_Conditional_0_ng_template_0_Template, 1, 1, "ng-template", 10);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, cell_r5.value));
  }
}
function DateTableComponent_For_4_For_3_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-cell-inner"));
    \u0275\u0275attribute("aria-selected", cell_r5.isSelected)("aria-disabled", cell_r5.isDisabled);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.content, " ");
  }
}
function DateTableComponent_For_4_For_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DateTableComponent_For_4_For_3_Case_1_Conditional_0_Template, 1, 4, null, 10)(1, DateTableComponent_For_4_For_3_Case_1_Conditional_1_Template, 2, 6, "div", 11);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(cell_r5.cellRender ? 0 : 1);
  }
}
function DateTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.fullCellRender, " ");
  }
}
function DateTableComponent_For_4_For_3_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DateTableComponent_For_4_For_3_Case_2_Conditional_1_ng_container_0_Template, 2, 1, "ng-container", 12);
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.fullCellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, cell_r5.value));
  }
}
function DateTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r5.cellRender, " ");
  }
}
function DateTableComponent_For_4_For_3_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div");
    \u0275\u0275template(3, DateTableComponent_For_4_For_3_Case_2_Conditional_2_ng_container_3_Template, 2, 1, "ng-container", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-value"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cell_r5.content);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date-content"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", cell_r5.cellRender)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(9, _c02, cell_r5.value));
  }
}
function DateTableComponent_For_4_For_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, DateTableComponent_For_4_For_3_Case_2_Conditional_1_Template, 1, 4, "ng-container")(2, DateTableComponent_For_4_For_3_Case_2_Conditional_2_Template, 4, 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r5 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-date ant-picker-cell-inner"));
    \u0275\u0275classProp("ant-picker-calendar-date-today", cell_r5.isToday);
    \u0275\u0275advance();
    \u0275\u0275conditional(cell_r5.fullCellRender ? 1 : 2);
  }
}
function DateTableComponent_For_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 8);
    \u0275\u0275listener("click", function DateTableComponent_For_4_For_3_Template_td_click_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.isDisabled ? null : cell_r5.onClick());
    })("mouseenter", function DateTableComponent_For_4_For_3_Template_td_mouseenter_0_listener() {
      const cell_r5 = \u0275\u0275restoreView(_r4).$implicit;
      return \u0275\u0275resetView(cell_r5.onMouseEnter());
    });
    \u0275\u0275conditionalCreate(1, DateTableComponent_For_4_For_3_Case_1_Template, 2, 1)(2, DateTableComponent_For_4_For_3_Case_2_Template, 3, 6, "div", 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const cell_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(cell_r5.classMap);
    \u0275\u0275property("title", cell_r5.title);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = ctx_r1.prefixCls) === "ant-picker" ? 1 : tmp_22_0 === "ant-picker-calendar" ? 2 : -1);
  }
}
function DateTableComponent_For_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 2);
    \u0275\u0275conditionalCreate(1, DateTableComponent_For_4_Conditional_1_Template, 2, 4, "td", 5);
    \u0275\u0275repeaterCreate(2, DateTableComponent_For_4_For_3_Template, 3, 4, "td", 6, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r3 = ctx.$implicit;
    \u0275\u0275classMap(row_r3.classMap);
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r3.weekNum ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r3.dateCells);
  }
}
function InnerPopupComponent_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "decade-header", 2);
    \u0275\u0275twoWayListener("valueChange", function InnerPopupComponent_Case_2_Template_decade_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.activeDate, $event) || (ctx_r1.activeDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("panelChange", function InnerPopupComponent_Case_2_Template_decade_header_panelChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.panelChange.emit($event));
    })("valueChange", function InnerPopupComponent_Case_2_Template_decade_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.headerChange.emit($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div")(2, "decade-table", 3);
    \u0275\u0275listener("valueChange", function InnerPopupComponent_Case_2_Template_decade_table_valueChange_2_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onChooseDecade($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("value", ctx_r1.activeDate);
    \u0275\u0275property("locale", ctx_r1.locale)("showSuperPreBtn", ctx_r1.enablePrevNext("prev", "decade"))("showSuperNextBtn", ctx_r1.enablePrevNext("next", "decade"))("showNextBtn", false)("showPreBtn", false);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-body"));
    \u0275\u0275advance();
    \u0275\u0275property("activeDate", ctx_r1.activeDate)("value", ctx_r1.value)("locale", ctx_r1.locale)("disabledDate", ctx_r1.disabledDate);
  }
}
function InnerPopupComponent_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "year-header", 2);
    \u0275\u0275twoWayListener("valueChange", function InnerPopupComponent_Case_3_Template_year_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.activeDate, $event) || (ctx_r1.activeDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("panelChange", function InnerPopupComponent_Case_3_Template_year_header_panelChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.panelChange.emit($event));
    })("valueChange", function InnerPopupComponent_Case_3_Template_year_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.headerChange.emit($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div")(2, "year-table", 4);
    \u0275\u0275listener("valueChange", function InnerPopupComponent_Case_3_Template_year_table_valueChange_2_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onChooseYear($event));
    })("cellHover", function InnerPopupComponent_Case_3_Template_year_table_cellHover_2_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cellHover.emit($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("value", ctx_r1.activeDate);
    \u0275\u0275property("locale", ctx_r1.locale)("showSuperPreBtn", ctx_r1.enablePrevNext("prev", "year"))("showSuperNextBtn", ctx_r1.enablePrevNext("next", "year"))("showNextBtn", false)("showPreBtn", false);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-body"));
    \u0275\u0275advance();
    \u0275\u0275property("activeDate", ctx_r1.activeDate)("value", ctx_r1.value)("locale", ctx_r1.locale)("disabledDate", ctx_r1.disabledDate)("selectedValue", ctx_r1.selectedValue)("hoverValue", ctx_r1.hoverValue);
  }
}
function InnerPopupComponent_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "month-header", 2);
    \u0275\u0275twoWayListener("valueChange", function InnerPopupComponent_Case_4_Template_month_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.activeDate, $event) || (ctx_r1.activeDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("panelChange", function InnerPopupComponent_Case_4_Template_month_header_panelChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.panelChange.emit($event));
    })("valueChange", function InnerPopupComponent_Case_4_Template_month_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.headerChange.emit($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div")(2, "month-table", 5);
    \u0275\u0275listener("valueChange", function InnerPopupComponent_Case_4_Template_month_table_valueChange_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onChooseMonth($event));
    })("cellHover", function InnerPopupComponent_Case_4_Template_month_table_cellHover_2_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cellHover.emit($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("value", ctx_r1.activeDate);
    \u0275\u0275property("locale", ctx_r1.locale)("showSuperPreBtn", ctx_r1.enablePrevNext("prev", "month"))("showSuperNextBtn", ctx_r1.enablePrevNext("next", "month"))("showNextBtn", false)("showPreBtn", false);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-body"));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.value)("activeDate", ctx_r1.activeDate)("locale", ctx_r1.locale)("disabledDate", ctx_r1.disabledDate)("selectedValue", ctx_r1.selectedValue)("hoverValue", ctx_r1.hoverValue);
  }
}
function InnerPopupComponent_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "quarter-header", 2);
    \u0275\u0275twoWayListener("valueChange", function InnerPopupComponent_Case_5_Template_quarter_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.activeDate, $event) || (ctx_r1.activeDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("panelChange", function InnerPopupComponent_Case_5_Template_quarter_header_panelChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.panelChange.emit($event));
    })("valueChange", function InnerPopupComponent_Case_5_Template_quarter_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.headerChange.emit($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div")(2, "quarter-table", 6);
    \u0275\u0275listener("valueChange", function InnerPopupComponent_Case_5_Template_quarter_table_valueChange_2_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onChooseQuarter($event));
    })("cellHover", function InnerPopupComponent_Case_5_Template_quarter_table_cellHover_2_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cellHover.emit($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("value", ctx_r1.activeDate);
    \u0275\u0275property("locale", ctx_r1.locale)("showSuperPreBtn", ctx_r1.enablePrevNext("prev", "month"))("showSuperNextBtn", ctx_r1.enablePrevNext("next", "month"))("showNextBtn", false)("showPreBtn", false);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-body"));
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r1.value)("activeDate", ctx_r1.activeDate)("locale", ctx_r1.locale)("disabledDate", ctx_r1.disabledDate)("selectedValue", ctx_r1.selectedValue)("hoverValue", ctx_r1.hoverValue)("cellRender", ctx_r1.dateRender);
  }
}
function InnerPopupComponent_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "date-header", 7);
    \u0275\u0275twoWayListener("valueChange", function InnerPopupComponent_Case_6_Template_date_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.activeDate, $event) || (ctx_r1.activeDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("panelChange", function InnerPopupComponent_Case_6_Template_date_header_panelChange_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.panelChange.emit($event));
    })("valueChange", function InnerPopupComponent_Case_6_Template_date_header_valueChange_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.headerChange.emit($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "div")(2, "date-table", 8);
    \u0275\u0275listener("valueChange", function InnerPopupComponent_Case_6_Template_date_table_valueChange_2_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSelectDate($event));
    })("cellHover", function InnerPopupComponent_Case_6_Template_date_table_cellHover_2_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cellHover.emit($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("value", ctx_r1.activeDate);
    \u0275\u0275property("locale", ctx_r1.locale)("showSuperPreBtn", ctx_r1.panelMode === "week" ? ctx_r1.enablePrevNext("prev", "week") : ctx_r1.enablePrevNext("prev", "date"))("showSuperNextBtn", ctx_r1.panelMode === "week" ? ctx_r1.enablePrevNext("next", "week") : ctx_r1.enablePrevNext("next", "date"))("showPreBtn", ctx_r1.panelMode === "week" ? ctx_r1.enablePrevNext("prev", "week") : ctx_r1.enablePrevNext("prev", "date"))("showNextBtn", ctx_r1.panelMode === "week" ? ctx_r1.enablePrevNext("next", "week") : ctx_r1.enablePrevNext("next", "date"));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-body"));
    \u0275\u0275advance();
    \u0275\u0275property("locale", ctx_r1.locale)("showWeek", ctx_r1.showWeek)("value", ctx_r1.value)("activeDate", ctx_r1.activeDate)("disabledDate", ctx_r1.disabledDate)("cellRender", ctx_r1.dateRender)("selectedValue", ctx_r1.selectedValue)("hoverValue", ctx_r1.hoverValue)("canSelectWeek", ctx_r1.panelMode === "week")("format", ctx_r1.format);
  }
}
function InnerPopupComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-time-picker-panel", 9);
    \u0275\u0275listener("ngModelChange", function InnerPopupComponent_Conditional_7_Template_nz_time_picker_panel_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSelectTime($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("nzInDatePicker", true)("ngModel", ctx_r1.value == null ? null : ctx_r1.value.nativeDate)("format", ctx_r1.timeOptions.nzFormat)("nzHourStep", ctx_r1.timeOptions.nzHourStep)("nzMinuteStep", ctx_r1.timeOptions.nzMinuteStep)("nzSecondStep", ctx_r1.timeOptions.nzSecondStep)("nzDisabledHours", ctx_r1.timeOptions.nzDisabledHours)("nzDisabledMinutes", ctx_r1.timeOptions.nzDisabledMinutes)("nzDisabledSeconds", ctx_r1.timeOptions.nzDisabledSeconds)("nzHideDisabledOptions", !!ctx_r1.timeOptions.nzHideDisabledOptions)("nzDefaultOpenValue", ctx_r1.timeOptions.nzDefaultOpenValue)("nzUse12Hours", !!ctx_r1.timeOptions.nzUse12Hours)("nzAddOn", ctx_r1.timeOptions.nzAddOn);
  }
}
var _c12 = (a0) => ({
  partType: a0
});
var _c22 = () => ({
  partType: "left"
});
var _c32 = () => ({
  partType: "right"
});
function DateRangePopupComponent_Conditional_0_Conditional_4_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function DateRangePopupComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DateRangePopupComponent_Conditional_0_Conditional_4_ng_container_0_Template, 1, 0, "ng-container", 5);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    const tplInnerPopup_r2 = \u0275\u0275reference(3);
    \u0275\u0275property("ngTemplateOutlet", tplInnerPopup_r2)("ngTemplateOutletContext", \u0275\u0275pureFunction1(2, _c12, ctx_r0.datePickerService.activeInput));
  }
}
function DateRangePopupComponent_Conditional_0_Conditional_5_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function DateRangePopupComponent_Conditional_0_Conditional_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function DateRangePopupComponent_Conditional_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DateRangePopupComponent_Conditional_0_Conditional_5_ng_container_0_Template, 1, 0, "ng-container", 5)(1, DateRangePopupComponent_Conditional_0_Conditional_5_ng_container_1_Template, 1, 0, "ng-container", 5);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const tplInnerPopup_r2 = \u0275\u0275reference(3);
    \u0275\u0275property("ngTemplateOutlet", tplInnerPopup_r2)("ngTemplateOutletContext", \u0275\u0275pureFunction0(4, _c22));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", tplInnerPopup_r2)("ngTemplateOutletContext", \u0275\u0275pureFunction0(5, _c32));
  }
}
function DateRangePopupComponent_Conditional_0_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function DateRangePopupComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275element(1, "div");
    \u0275\u0275elementStart(2, "div")(3, "div");
    \u0275\u0275conditionalCreate(4, DateRangePopupComponent_Conditional_0_Conditional_4_Template, 1, 4, "ng-container")(5, DateRangePopupComponent_Conditional_0_Conditional_5_Template, 2, 6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, DateRangePopupComponent_Conditional_0_ng_container_6_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const tplFooter_r3 = \u0275\u0275reference(5);
    \u0275\u0275classMap(\u0275\u0275interpolate2("", ctx_r0.prefixCls, "-range-wrapper ", ctx_r0.prefixCls, "-date-range-wrapper"));
    \u0275\u0275advance();
    \u0275\u0275styleMap(ctx_r0.arrowPosition);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-range-arrow"));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate2("", ctx_r0.prefixCls, "-panel-container ", ctx_r0.showWeek ? ctx_r0.prefixCls + "-week-number" : ""));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-panels"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.hasTimePicker ? 4 : 5);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", tplFooter_r3);
  }
}
function DateRangePopupComponent_Conditional_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function DateRangePopupComponent_Conditional_1_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function DateRangePopupComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 6);
    \u0275\u0275template(2, DateRangePopupComponent_Conditional_1_ng_container_2_Template, 1, 0, "ng-container", 4)(3, DateRangePopupComponent_Conditional_1_ng_container_3_Template, 1, 0, "ng-container", 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    const tplInnerPopup_r2 = \u0275\u0275reference(3);
    const tplFooter_r3 = \u0275\u0275reference(5);
    \u0275\u0275classMap(\u0275\u0275interpolate4("", ctx_r0.prefixCls, "-panel-container ", ctx_r0.showWeek ? ctx_r0.prefixCls + "-week-number" : "", " ", ctx_r0.hasTimePicker ? ctx_r0.prefixCls + "-time" : "", " ", ctx_r0.isRange ? ctx_r0.prefixCls + "-range" : ""));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-panel"));
    \u0275\u0275classProp("ant-picker-panel-rtl", ctx_r0.dir === "rtl");
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", tplInnerPopup_r2);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", tplFooter_r3);
  }
}
function DateRangePopupComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "inner-popup", 7);
    \u0275\u0275listener("panelChange", function DateRangePopupComponent_ng_template_2_Template_inner_popup_panelChange_1_listener($event) {
      const partType_r5 = \u0275\u0275restoreView(_r4).partType;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPanelModeChange($event, partType_r5));
    })("cellHover", function DateRangePopupComponent_ng_template_2_Template_inner_popup_cellHover_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onCellHover($event));
    })("selectDate", function DateRangePopupComponent_ng_template_2_Template_inner_popup_selectDate_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.changeValueFromSelect($event, !ctx_r0.showTime));
    })("selectTime", function DateRangePopupComponent_ng_template_2_Template_inner_popup_selectTime_1_listener($event) {
      const partType_r5 = \u0275\u0275restoreView(_r4).partType;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onSelectTime($event, partType_r5));
    })("headerChange", function DateRangePopupComponent_ng_template_2_Template_inner_popup_headerChange_1_listener($event) {
      const partType_r5 = \u0275\u0275restoreView(_r4).partType;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onActiveDateChange($event, partType_r5));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const partType_r5 = ctx.partType;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-panel"));
    \u0275\u0275classProp("ant-picker-panel-rtl", ctx_r0.dir === "rtl");
    \u0275\u0275advance();
    \u0275\u0275property("showWeek", ctx_r0.showWeek)("endPanelMode", ctx_r0.getPanelMode(ctx_r0.endPanelMode, partType_r5))("partType", partType_r5)("locale", ctx_r0.locale)("showTimePicker", ctx_r0.hasTimePicker)("timeOptions", ctx_r0.getTimeOptions(partType_r5))("panelMode", ctx_r0.getPanelMode(ctx_r0.panelMode, partType_r5))("activeDate", ctx_r0.getActiveDate(partType_r5))("value", ctx_r0.getValue(partType_r5))("disabledDate", ctx_r0.disabledDate)("dateRender", ctx_r0.dateRender)("selectedValue", ctx_r0.datePickerService == null ? null : ctx_r0.datePickerService.value)("hoverValue", ctx_r0.hoverValue)("format", ctx_r0.format);
  }
}
function DateRangePopupComponent_ng_template_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "calendar-footer", 9);
    \u0275\u0275listener("clickOk", function DateRangePopupComponent_ng_template_4_Conditional_0_Template_calendar_footer_clickOk_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onClickOk());
    })("clickToday", function DateRangePopupComponent_ng_template_4_Conditional_0_Template_calendar_footer_clickToday_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onClickToday($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    const tplRangeQuickSelector_r7 = \u0275\u0275reference(7);
    \u0275\u0275property("locale", ctx_r0.locale)("isRange", ctx_r0.isRange)("showToday", ctx_r0.showToday)("showNow", ctx_r0.showNow)("hasTimePicker", ctx_r0.hasTimePicker)("okDisabled", !ctx_r0.isAllowed(ctx_r0.datePickerService == null ? null : ctx_r0.datePickerService.value))("extraFooter", ctx_r0.extraFooter)("rangeQuickSelector", ctx_r0.ranges ? tplRangeQuickSelector_r7 : null);
  }
}
function DateRangePopupComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, DateRangePopupComponent_ng_template_4_Conditional_0_Template, 1, 8, "calendar-footer", 8);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.hasFooter ? 0 : -1);
  }
}
function DateRangePopupComponent_ng_template_6_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 10);
    \u0275\u0275listener("click", function DateRangePopupComponent_ng_template_6_For_1_Template_li_click_0_listener() {
      const name_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onClickPresetRange(ctx_r0.ranges[name_r9]));
    })("mouseenter", function DateRangePopupComponent_ng_template_6_For_1_Template_li_mouseenter_0_listener() {
      const name_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onHoverPresetRange(ctx_r0.ranges[name_r9]));
    })("mouseleave", function DateRangePopupComponent_ng_template_6_For_1_Template_li_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.onPresetRangeMouseLeave());
    });
    \u0275\u0275elementStart(1, "span", 11);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const name_r9 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r0.prefixCls, "-preset"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(name_r9);
  }
}
function DateRangePopupComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DateRangePopupComponent_ng_template_6_For_1_Template, 3, 4, "li", 3, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r0.getObjectKeys(ctx_r0.ranges));
  }
}
var _c42 = ["separatorElement"];
var _c5 = ["pickerInput"];
var _c6 = ["rangePickerInput"];
function NzDatePickerComponent_Conditional_0_Conditional_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "input", 9, 3);
    \u0275\u0275twoWayListener("ngModelChange", function NzDatePickerComponent_Conditional_0_Conditional_0_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.inputValue, $event) || (ctx_r1.inputValue = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("focus", function NzDatePickerComponent_Conditional_0_Conditional_0_Template_input_focus_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onFocus($event));
    })("focusout", function NzDatePickerComponent_Conditional_0_Conditional_0_Template_input_focusout_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onFocusout($event));
    })("ngModelChange", function NzDatePickerComponent_Conditional_0_Conditional_0_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onInputChange($event));
    })("keyup.enter", function NzDatePickerComponent_Conditional_0_Conditional_0_Template_input_keyup_enter_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onKeyupEnter($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, NzDatePickerComponent_Conditional_0_Conditional_0_ng_container_3_Template, 1, 0, "ng-container", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    const tplRightRest_r3 = \u0275\u0275reference(5);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-input"));
    \u0275\u0275advance();
    \u0275\u0275classProp("ant-input-disabled", ctx_r1.nzDisabled);
    \u0275\u0275property("placeholder", \u0275\u0275interpolate(ctx_r1.getPlaceholder()))("disabled", ctx_r1.nzDisabled)("readOnly", ctx_r1.nzInputReadOnly);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.inputValue);
    \u0275\u0275property("size", ctx_r1.inputSize);
    \u0275\u0275attribute("id", ctx_r1.nzId);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", tplRightRest_r3);
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.nzSeparator, " ");
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 13);
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275conditionalCreate(1, NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_5_Conditional_1_Template, 1, 1)(2, NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_5_Conditional_2_Template, 1, 0, "nz-icon", 13);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.nzSeparator ? 1 : 2);
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NzDatePickerComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275template(1, NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", null, 4)(4, "span");
    \u0275\u0275template(5, NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_5_Template, 3, 1, "ng-container", 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div");
    \u0275\u0275template(7, NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_7_Template, 1, 0, "ng-container", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, NzDatePickerComponent_Conditional_0_Conditional_1_ng_container_8_Template, 1, 0, "ng-container", 10);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    const tplRangeInput_r4 = \u0275\u0275reference(3);
    const tplRightRest_r3 = \u0275\u0275reference(5);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-input"));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", tplRangeInput_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction0(18, _c22));
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-range-separator"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-separator"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzSeparator);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-input"));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", tplRangeInput_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction0(19, _c32));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", tplRightRest_r3);
  }
}
function NzDatePickerComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzDatePickerComponent_Conditional_0_Conditional_0_Template, 4, 13, "div", 8)(1, NzDatePickerComponent_Conditional_0_Conditional_1_Template, 9, 20);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r1.isRange ? 0 : 1);
  }
}
function NzDatePickerComponent_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function NzDatePickerComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzDatePickerComponent_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 6);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const inlineMode_r5 = \u0275\u0275reference(7);
    \u0275\u0275property("ngTemplateOutlet", inlineMode_r5);
  }
}
function NzDatePickerComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 14, 5);
    \u0275\u0275listener("click", function NzDatePickerComponent_ng_template_2_Template_input_click_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClickInputBox($event));
    })("focusout", function NzDatePickerComponent_ng_template_2_Template_input_focusout_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFocusout($event));
    })("focus", function NzDatePickerComponent_ng_template_2_Template_input_focus_0_listener($event) {
      const partType_r7 = \u0275\u0275restoreView(_r6).partType;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFocus($event, partType_r7));
    })("keyup.enter", function NzDatePickerComponent_ng_template_2_Template_input_keyup_enter_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onKeyupEnter($event));
    });
    \u0275\u0275twoWayListener("ngModelChange", function NzDatePickerComponent_ng_template_2_Template_input_ngModelChange_0_listener($event) {
      const partType_r7 = \u0275\u0275restoreView(_r6).partType;
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.inputValue[ctx_r1.datePickerService.getActiveIndex(partType_r7)], $event) || (ctx_r1.inputValue[ctx_r1.datePickerService.getActiveIndex(partType_r7)] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function NzDatePickerComponent_ng_template_2_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onInputChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const partType_r7 = ctx.partType;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("placeholder", \u0275\u0275interpolate(ctx_r1.getPlaceholder(partType_r7)))("disabled", ctx_r1.nzDisabled)("readOnly", ctx_r1.nzInputReadOnly)("size", ctx_r1.inputSize);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.inputValue[ctx_r1.datePickerService.getActiveIndex(partType_r7)]);
    \u0275\u0275attribute("id", ctx_r1.nzId);
  }
}
function NzDatePickerComponent_ng_template_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275listener("click", function NzDatePickerComponent_ng_template_4_Conditional_1_Template_span_click_0_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onClickClear($event));
    });
    \u0275\u0275element(1, "nz-icon", 17);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-clear"));
  }
}
function NzDatePickerComponent_ng_template_4_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "nz-icon", 18);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const suffixIcon_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzType", suffixIcon_r9);
  }
}
function NzDatePickerComponent_ng_template_4_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-form-item-feedback-icon", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("status", ctx_r1.status);
  }
}
function NzDatePickerComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div");
    \u0275\u0275conditionalCreate(1, NzDatePickerComponent_ng_template_4_Conditional_1_Template, 2, 3, "span", 8);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275template(3, NzDatePickerComponent_ng_template_4_ng_container_3_Template, 2, 1, "ng-container", 12);
    \u0275\u0275conditionalCreate(4, NzDatePickerComponent_ng_template_4_Conditional_4_Template, 1, 1, "nz-form-item-feedback-icon", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r1.activeBarStyle);
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-active-bar"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.showClear ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx_r1.prefixCls, "-suffix"));
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzSuffixIcon);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.hasFeedback && !!ctx_r1.status ? 4 : -1);
  }
}
function NzDatePickerComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275animateLeave(function NzDatePickerComponent_ng_template_6_Template_animateleave_cb() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(!ctx_r1.nzInline() && ctx_r1.datepickerAnimationLeave());
    });
    \u0275\u0275animateEnter(function NzDatePickerComponent_ng_template_6_Template_animateenter_cb() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(!ctx_r1.nzInline() && ctx_r1.datepickerAnimationEnter());
    });
    \u0275\u0275elementStart(1, "date-range-popup", 19);
    \u0275\u0275listener("panelModeChange", function NzDatePickerComponent_ng_template_6_Template_date_range_popup_panelModeChange_1_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPanelModeChange($event));
    })("calendarChange", function NzDatePickerComponent_ng_template_6_Template_date_range_popup_calendarChange_1_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCalendarChange($event));
    })("resultOk", function NzDatePickerComponent_ng_template_6_Template_date_range_popup_resultOk_1_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onResultOk());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r1.nzPopupStyle);
    \u0275\u0275classMap(ctx_r1.dropdownClass());
    \u0275\u0275classProp("ant-picker-dropdown-range", !ctx_r1.nzInline() && ctx_r1.isRange)("ant-picker-active-left", ctx_r1.datePickerService.activeInput === "left")("ant-picker-active-right", ctx_r1.datePickerService.activeInput === "right");
    \u0275\u0275advance();
    \u0275\u0275property("isRange", ctx_r1.isRange)("inline", ctx_r1.nzInline())("defaultPickerValue", ctx_r1.nzDefaultPickerValue)("showWeek", ctx_r1.nzShowWeekNumber || ctx_r1.nzMode === "week")("panelMode", ctx_r1.panelMode)("locale", ctx_r1.nzLocale == null ? null : ctx_r1.nzLocale.lang)("showToday", ctx_r1.nzMode === "date" && ctx_r1.nzShowToday && !ctx_r1.isRange && !ctx_r1.nzShowTime)("showNow", ctx_r1.nzMode === "date" && ctx_r1.nzShowNow && !ctx_r1.isRange && !!ctx_r1.nzShowTime)("showTime", ctx_r1.nzShowTime)("dateRender", ctx_r1.nzDateRender)("disabledDate", ctx_r1.nzDisabledDate)("disabledTime", ctx_r1.nzDisabledTime)("extraFooter", ctx_r1.extraFooter)("ranges", ctx_r1.nzRanges)("dir", ctx_r1.dir())("format", ctx_r1.nzFormat);
  }
}
function NzDatePickerComponent_ng_template_8_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0);
  }
}
function NzDatePickerComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzDatePickerComponent_ng_template_8_ng_container_0_Template, 1, 0, "ng-container", 10);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const inlineMode_r5 = \u0275\u0275reference(7);
    \u0275\u0275property("ngTemplateOutlet", inlineMode_r5);
  }
}
var PREFIX_CLASS = "ant-picker";
var defaultDisabledTime = {
  nzDisabledHours() {
    return [];
  },
  nzDisabledMinutes() {
    return [];
  },
  nzDisabledSeconds() {
    return [];
  }
};
function getTimeConfig(value, disabledTime) {
  let disabledTimeConfig = disabledTime ? disabledTime(value && value.nativeDate) : {};
  disabledTimeConfig = __spreadValues(__spreadValues({}, defaultDisabledTime), disabledTimeConfig);
  return disabledTimeConfig;
}
function isTimeValidByConfig(value, disabledTimeConfig) {
  let invalidTime = false;
  if (value) {
    const hour = value.getHours();
    const minutes = value.getMinutes();
    const seconds = value.getSeconds();
    const disabledHours = disabledTimeConfig.nzDisabledHours();
    if (disabledHours.indexOf(hour) === -1) {
      const disabledMinutes = disabledTimeConfig.nzDisabledMinutes(hour);
      if (disabledMinutes.indexOf(minutes) === -1) {
        const disabledSeconds = disabledTimeConfig.nzDisabledSeconds(hour, minutes);
        invalidTime = disabledSeconds.indexOf(seconds) !== -1;
      } else {
        invalidTime = true;
      }
    } else {
      invalidTime = true;
    }
  }
  return !invalidTime;
}
function isTimeValid(value, disabledTime) {
  const disabledTimeConfig = getTimeConfig(value, disabledTime);
  return isTimeValidByConfig(value, disabledTimeConfig);
}
function isAllowedDate(value, disabledDate, disabledTime) {
  if (!value) {
    return false;
  }
  if (disabledDate) {
    if (disabledDate(value.nativeDate)) {
      return false;
    }
  }
  if (disabledTime) {
    if (!isTimeValid(value, disabledTime)) {
      return false;
    }
  }
  return true;
}
function transCompatFormat(format) {
  return format && format.replace(/Y/g, "y").replace(/D/g, "d");
}
var _CalendarFooterComponent = class _CalendarFooterComponent {
  constructor() {
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "locale");
    __publicField(this, "showToday", false);
    __publicField(this, "showNow", false);
    __publicField(this, "hasTimePicker", false);
    __publicField(this, "isRange", false);
    __publicField(this, "okDisabled", false);
    __publicField(this, "disabledDate");
    __publicField(this, "extraFooter");
    __publicField(this, "rangeQuickSelector", null);
    __publicField(this, "clickOk", new EventEmitter());
    __publicField(this, "clickToday", new EventEmitter());
    __publicField(this, "prefixCls", PREFIX_CLASS);
    __publicField(this, "isTodayDisabled", false);
    __publicField(this, "todayTitle", "");
  }
  ngOnChanges(changes) {
    const now = /* @__PURE__ */ new Date();
    if (changes.disabledDate) {
      this.isTodayDisabled = !!(this.disabledDate && this.disabledDate(now));
    }
    if (changes.locale) {
      const dateFormat = transCompatFormat(this.locale.dateFormat);
      this.todayTitle = this.dateHelper.format(now, dateFormat);
    }
  }
  onClickToday() {
    const now = new CandyDate();
    this.clickToday.emit(now.clone());
  }
};
__publicField(_CalendarFooterComponent, "\u0275fac", function CalendarFooterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CalendarFooterComponent)();
});
__publicField(_CalendarFooterComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _CalendarFooterComponent,
  selectors: [["calendar-footer"]],
  inputs: {
    locale: "locale",
    showToday: [2, "showToday", "showToday", booleanAttribute],
    showNow: [2, "showNow", "showNow", booleanAttribute],
    hasTimePicker: [2, "hasTimePicker", "hasTimePicker", booleanAttribute],
    isRange: [2, "isRange", "isRange", booleanAttribute],
    okDisabled: [2, "okDisabled", "okDisabled", booleanAttribute],
    disabledDate: "disabledDate",
    extraFooter: "extraFooter",
    rangeQuickSelector: "rangeQuickSelector"
  },
  outputs: {
    clickOk: "clickOk",
    clickToday: "clickToday"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 4,
  vars: 6,
  consts: [[3, "class"], ["role", "button", 3, "class", "title"], [3, "nzStringTemplateOutlet"], ["role", "button", 3, "click", "title"], [4, "ngTemplateOutlet"], [3, "click"], ["nz-button", "", "type", "button", "nzType", "primary", "nzSize", "small", 3, "click", "disabled"]],
  template: function CalendarFooterComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div");
      \u0275\u0275conditionalCreate(1, CalendarFooterComponent_Conditional_1_Template, 2, 4, "div", 0);
      \u0275\u0275conditionalCreate(2, CalendarFooterComponent_Conditional_2_Template, 2, 7, "a", 1);
      \u0275\u0275conditionalCreate(3, CalendarFooterComponent_Conditional_3_Template, 4, 6, "ul", 0);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-footer"));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.extraFooter ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showToday ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasTimePicker || ctx.rangeQuickSelector ? 3 : -1);
    }
  },
  dependencies: [NgTemplateOutlet, NzButtonModule, NzButtonComponent, NzTransitionPatchDirective, NzWaveDirective, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var CalendarFooterComponent = _CalendarFooterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CalendarFooterComponent, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "calendar-footer",
      imports: [NgTemplateOutlet, NzButtonModule, NzStringTemplateOutletDirective],
      template: `
    <div class="{{ prefixCls }}-footer">
      @if (extraFooter) {
        <div class="{{ prefixCls }}-footer-extra">
          <ng-template [nzStringTemplateOutlet]="extraFooter">{{ extraFooter }}</ng-template>
        </div>
      }

      @if (showToday) {
        <a
          class="{{ prefixCls }}-today-btn {{ isTodayDisabled ? prefixCls + '-today-btn-disabled' : '' }}"
          role="button"
          (click)="isTodayDisabled ? null : onClickToday()"
          title="{{ todayTitle }}"
        >
          {{ locale.today }}
        </a>
      }

      @if (hasTimePicker || rangeQuickSelector) {
        <ul class="{{ prefixCls }}-ranges">
          <ng-container *ngTemplateOutlet="rangeQuickSelector" />
          @if (showNow) {
            <li class="{{ prefixCls }}-now">
              <a class="{{ prefixCls }}-now-btn" (click)="isTodayDisabled ? null : onClickToday()">
                {{ locale.now }}
              </a>
            </li>
          }

          @if (hasTimePicker) {
            <li class="{{ prefixCls }}-ok">
              <button
                nz-button
                type="button"
                nzType="primary"
                nzSize="small"
                [disabled]="okDisabled"
                (click)="okDisabled ? null : clickOk.emit()"
              >
                {{ locale.ok }}
              </button>
            </li>
          }
        </ul>
      }
    </div>
  `,
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, {
    locale: [{
      type: Input
    }],
    showToday: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showNow: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hasTimePicker: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isRange: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    okDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabledDate: [{
      type: Input
    }],
    extraFooter: [{
      type: Input
    }],
    rangeQuickSelector: [{
      type: Input
    }],
    clickOk: [{
      type: Output
    }],
    clickToday: [{
      type: Output
    }]
  });
})();
var _DatePickerService = class _DatePickerService {
  constructor() {
    __publicField(this, "initialValue");
    __publicField(this, "value");
    __publicField(this, "activeDate");
    __publicField(this, "activeInput", "left");
    __publicField(this, "arrowLeft", 0);
    __publicField(this, "isRange", false);
    __publicField(this, "valueChange$", new ReplaySubject(1));
    __publicField(this, "emitValue$", new Subject());
    __publicField(this, "inputPartChange$", new Subject());
  }
  initValue(reset = false) {
    if (reset) {
      this.initialValue = this.isRange ? [] : null;
    }
    this.setValue(this.initialValue);
  }
  hasValue(value = this.value) {
    if (Array.isArray(value)) {
      return !!value[0] || !!value[1];
    } else {
      return !!value;
    }
  }
  makeValue(value) {
    if (this.isRange) {
      return value ? value.map((val) => new CandyDate(val)) : [];
    } else {
      return value ? new CandyDate(value) : null;
    }
  }
  setActiveDate(value, hasTimePicker = false, mode = "month") {
    const parentPanels = {
      date: "month",
      month: "year",
      quarter: "year",
      year: "decade"
    };
    if (this.isRange) {
      this.activeDate = normalizeRangeValue(value, hasTimePicker, parentPanels[mode], this.activeInput);
    } else {
      this.activeDate = cloneDate(value);
    }
  }
  setValue(value) {
    this.value = value;
    this.valueChange$.next(this.value);
  }
  getActiveIndex(part = this.activeInput) {
    return {
      left: 0,
      right: 1
    }[part];
  }
  ngOnDestroy() {
    this.valueChange$.complete();
    this.emitValue$.complete();
    this.inputPartChange$.complete();
  }
};
__publicField(_DatePickerService, "\u0275fac", function DatePickerService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DatePickerService)();
});
__publicField(_DatePickerService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _DatePickerService,
  factory: _DatePickerService.\u0275fac
}));
var DatePickerService = _DatePickerService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DatePickerService, [{
    type: Injectable
  }], null, null);
})();
var _AbstractPanelHeader = class _AbstractPanelHeader {
  constructor() {
    __publicField(this, "prefixCls", `ant-picker-header`);
    __publicField(this, "selectors", []);
    __publicField(this, "mode");
    __publicField(this, "value");
    __publicField(this, "locale");
    __publicField(this, "showSuperPreBtn", true);
    __publicField(this, "showSuperNextBtn", true);
    __publicField(this, "showPreBtn", true);
    __publicField(this, "showNextBtn", true);
    __publicField(this, "panelChange", new EventEmitter());
    __publicField(this, "valueChange", new EventEmitter());
  }
  superPreviousTitle() {
    return this.locale.previousYear;
  }
  previousTitle() {
    return this.locale.previousMonth;
  }
  superNextTitle() {
    return this.locale.nextYear;
  }
  nextTitle() {
    return this.locale.nextMonth;
  }
  superPrevious() {
    this.changeValue(this.value.addYears(-1));
  }
  superNext() {
    this.changeValue(this.value.addYears(1));
  }
  previous() {
    this.changeValue(this.value.addMonths(-1));
  }
  next() {
    this.changeValue(this.value.addMonths(1));
  }
  changeValue(value) {
    if (this.value !== value) {
      this.value = value;
      this.valueChange.emit(this.value);
      this.changeMode(this.mode);
      this.render();
    }
  }
  changeMode(mode) {
    this.panelChange.emit({
      mode,
      date: this.value.nativeDate
    });
  }
  render() {
    if (this.value) {
      this.selectors = this.getSelectors();
    }
  }
  ngOnInit() {
    if (!this.value) {
      this.value = new CandyDate();
    }
    this.selectors = this.getSelectors();
  }
  ngOnChanges(changes) {
    if (changes.value || changes.locale) {
      this.render();
    }
  }
  trackBySelector(selector) {
    return `${selector.title}-${selector.label}`;
  }
};
__publicField(_AbstractPanelHeader, "\u0275fac", function AbstractPanelHeader_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AbstractPanelHeader)();
});
__publicField(_AbstractPanelHeader, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _AbstractPanelHeader,
  inputs: {
    value: "value",
    locale: "locale",
    showSuperPreBtn: [2, "showSuperPreBtn", "showSuperPreBtn", booleanAttribute],
    showSuperNextBtn: [2, "showSuperNextBtn", "showSuperNextBtn", booleanAttribute],
    showPreBtn: [2, "showPreBtn", "showPreBtn", booleanAttribute],
    showNextBtn: [2, "showNextBtn", "showNextBtn", booleanAttribute]
  },
  outputs: {
    panelChange: "panelChange",
    valueChange: "valueChange"
  },
  features: [\u0275\u0275NgOnChangesFeature]
}));
var AbstractPanelHeader = _AbstractPanelHeader;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractPanelHeader, [{
    type: Directive
  }], null, {
    value: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    showSuperPreBtn: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showSuperNextBtn: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showPreBtn: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showNextBtn: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    panelChange: [{
      type: Output
    }],
    valueChange: [{
      type: Output
    }]
  });
})();
var _DecadeHeaderComponent = class _DecadeHeaderComponent extends AbstractPanelHeader {
  constructor() {
    super(...arguments);
    __publicField(this, "mode", "decade");
  }
  previous() {
  }
  next() {
  }
  get startYear() {
    return parseInt(`${this.value.getYear() / 100}`, 10) * 100;
  }
  get endYear() {
    return this.startYear + 99;
  }
  superPrevious() {
    this.changeValue(this.value.addYears(-100));
  }
  superNext() {
    this.changeValue(this.value.addYears(100));
  }
  getSelectors() {
    return [{
      className: `${this.prefixCls}-decade-btn`,
      title: "",
      onClick: () => {
      },
      label: `${this.startYear}-${this.endYear}`
    }];
  }
};
__publicField(_DecadeHeaderComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275DecadeHeaderComponent_BaseFactory;
  return function DecadeHeaderComponent_Factory(__ngFactoryType__) {
    return (\u0275DecadeHeaderComponent_BaseFactory || (\u0275DecadeHeaderComponent_BaseFactory = \u0275\u0275getInheritedFactory(_DecadeHeaderComponent)))(__ngFactoryType__ || _DecadeHeaderComponent);
  };
})());
__publicField(_DecadeHeaderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _DecadeHeaderComponent,
  selectors: [["decade-header"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 12,
  vars: 33,
  consts: [["role", "button", "type", "button", "tabindex", "-1", 3, "click", "title"], [1, "ant-picker-super-prev-icon"], [1, "ant-picker-prev-icon"], ["role", "button", "type", "button", 3, "class", "title"], [1, "ant-picker-next-icon"], [1, "ant-picker-super-next-icon"], ["role", "button", "type", "button", 3, "click", "title"]],
  template: function DecadeHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div")(1, "button", 0);
      \u0275\u0275domListener("click", function DecadeHeaderComponent_Template_button_click_1_listener() {
        return ctx.superPrevious();
      });
      \u0275\u0275domElement(2, "span", 1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "button", 0);
      \u0275\u0275domListener("click", function DecadeHeaderComponent_Template_button_click_3_listener() {
        return ctx.previous();
      });
      \u0275\u0275domElement(4, "span", 2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "div");
      \u0275\u0275repeaterCreate(6, DecadeHeaderComponent_For_7_Template, 2, 5, "button", 3, _forTrack0, true);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "button", 0);
      \u0275\u0275domListener("click", function DecadeHeaderComponent_Template_button_click_8_listener() {
        return ctx.next();
      });
      \u0275\u0275domElement(9, "span", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "button", 0);
      \u0275\u0275domListener("click", function DecadeHeaderComponent_Template_button_click_10_listener() {
        return ctx.superNext();
      });
      \u0275\u0275domElement(11, "span", 5);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.prefixCls);
      \u0275\u0275advance();
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superPreviousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.previousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-view"));
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.selectors);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.nextTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superNextTitle()));
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var DecadeHeaderComponent = _DecadeHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DecadeHeaderComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "decade-header",
      template: `<div class="{{ prefixCls }}">
  <button
    [style.visibility]="showSuperPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-prev-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superPreviousTitle() }}"
    (click)="superPrevious()"
  >
    <span class="ant-picker-super-prev-icon"></span>
  </button>
  <button
    [style.visibility]="showPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-prev-btn"
    role="button"
    type="button"
    title="{{ previousTitle() }}"
    tabindex="-1"
    (click)="previous()"
  >
    <span class="ant-picker-prev-icon"></span>
  </button>

  <div class="{{ prefixCls }}-view">
    @for (selector of selectors; track trackBySelector(selector)) {
      <button
        class="{{ selector.className }}"
        role="button"
        type="button"
        title="{{ selector.title || null }}"
        (click)="selector.onClick()"
      >
        {{ selector.label }}
      </button>
    }
  </div>
  <button
    [style.visibility]="showNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ nextTitle() }}"
    (click)="next()"
  >
    <span class="ant-picker-next-icon"></span>
  </button>
  <button
    [style.visibility]="showSuperNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superNextTitle() }}"
    (click)="superNext()"
  >
    <span class="ant-picker-super-next-icon"></span>
  </button>
</div>
`
    }]
  }], null, null);
})();
var _AbstractTable = class _AbstractTable {
  constructor() {
    __publicField(this, "headRow", []);
    __publicField(this, "bodyRows", []);
    __publicField(this, "MAX_ROW", 6);
    __publicField(this, "MAX_COL", 7);
    __publicField(this, "prefixCls", "ant-picker");
    __publicField(this, "value");
    __publicField(this, "locale");
    __publicField(this, "activeDate", new CandyDate());
    __publicField(this, "showWeek", false);
    __publicField(this, "selectedValue", []);
    // Range ONLY
    __publicField(this, "hoverValue", []);
    // Range ONLY
    __publicField(this, "disabledDate");
    __publicField(this, "cellRender");
    __publicField(this, "fullCellRender");
    __publicField(this, "canSelectWeek", false);
    __publicField(this, "valueChange", new EventEmitter());
    __publicField(this, "cellHover", new EventEmitter());
  }
  // Emitted when hover on a day by mouse enter
  render() {
    if (this.activeDate) {
      this.headRow = this.makeHeadRow();
      this.bodyRows = this.makeBodyRows();
    }
  }
  hasRangeValue() {
    var _a, _b;
    return ((_a = this.selectedValue) == null ? void 0 : _a.length) > 0 || ((_b = this.hoverValue) == null ? void 0 : _b.length) > 0;
  }
  getClassMap(cell) {
    return {
      [`ant-picker-cell`]: true,
      [`ant-picker-cell-in-view`]: true,
      [`ant-picker-cell-selected`]: cell.isSelected,
      [`ant-picker-cell-disabled`]: cell.isDisabled,
      [`ant-picker-cell-in-range`]: !!cell.isInSelectedRange,
      [`ant-picker-cell-range-start`]: !!cell.isSelectedStart,
      [`ant-picker-cell-range-end`]: !!cell.isSelectedEnd,
      [`ant-picker-cell-range-start-single`]: !!cell.isStartSingle,
      [`ant-picker-cell-range-end-single`]: !!cell.isEndSingle,
      [`ant-picker-cell-range-hover`]: !!cell.isInHoverRange,
      [`ant-picker-cell-range-hover-start`]: !!cell.isHoverStart,
      [`ant-picker-cell-range-hover-end`]: !!cell.isHoverEnd,
      [`ant-picker-cell-range-hover-edge-start`]: !!cell.isFirstCellInPanel,
      [`ant-picker-cell-range-hover-edge-end`]: !!cell.isLastCellInPanel,
      [`ant-picker-cell-range-start-near-hover`]: !!cell.isRangeStartNearHover,
      [`ant-picker-cell-range-end-near-hover`]: !!cell.isRangeEndNearHover
    };
  }
  ngOnInit() {
    this.render();
  }
  ngOnChanges(changes) {
    if (changes.activeDate && !changes.activeDate.currentValue) {
      this.activeDate = new CandyDate();
    }
    if (changes.disabledDate || changes.locale || changes.showWeek || changes.selectWeek || this.isDateRealChange(changes.activeDate) || this.isDateRealChange(changes.value) || this.isDateRealChange(changes.selectedValue) || this.isDateRealChange(changes.hoverValue)) {
      this.render();
    }
  }
  isDateRealChange(change) {
    if (change) {
      const previousValue = change.previousValue;
      const currentValue = change.currentValue;
      if (Array.isArray(currentValue)) {
        return !Array.isArray(previousValue) || currentValue.length !== previousValue.length || currentValue.some((value, index) => {
          const previousCandyDate = previousValue[index];
          return previousCandyDate instanceof CandyDate ? previousCandyDate.isSameDay(value) : previousCandyDate !== value;
        });
      } else {
        return !this.isSameDate(previousValue, currentValue);
      }
    }
    return false;
  }
  isSameDate(left, right) {
    return !left && !right || left && right && right.isSameDay(left);
  }
};
__publicField(_AbstractTable, "\u0275fac", function AbstractTable_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AbstractTable)();
});
__publicField(_AbstractTable, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _AbstractTable,
  inputs: {
    prefixCls: "prefixCls",
    value: "value",
    locale: "locale",
    activeDate: "activeDate",
    showWeek: [2, "showWeek", "showWeek", booleanAttribute],
    selectedValue: "selectedValue",
    hoverValue: "hoverValue",
    disabledDate: "disabledDate",
    cellRender: "cellRender",
    fullCellRender: "fullCellRender",
    canSelectWeek: [2, "canSelectWeek", "canSelectWeek", booleanAttribute]
  },
  outputs: {
    valueChange: "valueChange",
    cellHover: "cellHover"
  },
  features: [\u0275\u0275NgOnChangesFeature]
}));
var AbstractTable = _AbstractTable;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AbstractTable, [{
    type: Directive
  }], null, {
    prefixCls: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    locale: [{
      type: Input
    }],
    activeDate: [{
      type: Input
    }],
    showWeek: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectedValue: [{
      type: Input
    }],
    hoverValue: [{
      type: Input
    }],
    disabledDate: [{
      type: Input
    }],
    cellRender: [{
      type: Input
    }],
    fullCellRender: [{
      type: Input
    }],
    canSelectWeek: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    valueChange: [{
      type: Output
    }],
    cellHover: [{
      type: Output
    }]
  });
})();
var MAX_ROW = 4;
var MAX_COL = 3;
var _DecadeTableComponent = class _DecadeTableComponent extends AbstractTable {
  get startYear() {
    return parseInt(`${this.activeDate.getYear() / 100}`, 10) * 100;
  }
  get endYear() {
    return this.startYear + 99;
  }
  makeHeadRow() {
    return [];
  }
  makeBodyRows() {
    const decades = [];
    const currentYear = this.value && this.value.getYear();
    const startYear = this.startYear;
    const endYear = this.endYear;
    const previousYear = startYear - 10;
    let index = 0;
    for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
      const row = {
        dateCells: [],
        trackByIndex: rowIndex
      };
      for (let colIndex = 0; colIndex < MAX_COL; colIndex++) {
        const start = previousYear + index * 10;
        const end = previousYear + index * 10 + 9;
        const content = `${start}-${end}`;
        const cell = {
          trackByIndex: colIndex,
          value: this.activeDate.setYear(start).nativeDate,
          content,
          title: content,
          isDisabled: false,
          isSelected: currentYear >= start && currentYear <= end,
          isLowerThanStart: end < startYear,
          isBiggerThanEnd: start > endYear,
          classMap: {},
          onClick() {
          },
          onMouseEnter() {
          }
        };
        cell.classMap = this.getClassMap(cell);
        cell.onClick = () => this.chooseDecade(start);
        index++;
        row.dateCells.push(cell);
      }
      decades.push(row);
    }
    return decades;
  }
  getClassMap(cell) {
    return {
      [`${this.prefixCls}-cell`]: true,
      [`${this.prefixCls}-cell-in-view`]: !cell.isBiggerThanEnd && !cell.isLowerThanStart,
      [`${this.prefixCls}-cell-selected`]: cell.isSelected,
      [`${this.prefixCls}-cell-disabled`]: cell.isDisabled
    };
  }
  chooseDecade(year) {
    this.value = this.activeDate.setYear(year);
    this.valueChange.emit(this.value);
  }
};
__publicField(_DecadeTableComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275DecadeTableComponent_BaseFactory;
  return function DecadeTableComponent_Factory(__ngFactoryType__) {
    return (\u0275DecadeTableComponent_BaseFactory || (\u0275DecadeTableComponent_BaseFactory = \u0275\u0275getInheritedFactory(_DecadeTableComponent)))(__ngFactoryType__ || _DecadeTableComponent);
  };
})());
__publicField(_DecadeTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _DecadeTableComponent,
  selectors: [["decade-table"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 5,
  vars: 1,
  consts: [["cellspacing", "0", "role", "grid", 1, "ant-picker-content"], ["role", "row", 3, "class"], ["role", "row"], ["role", "columnheader"], ["role", "columnheader", 3, "title"], ["role", "gridcell", 3, "class"], ["role", "gridcell", 3, "title", "class"], ["role", "gridcell"], ["role", "gridcell", 3, "click", "mouseenter", "title"], [3, "class", "ant-picker-calendar-date-today"], [3, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [3, "class"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"]],
  template: function DecadeTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "table", 0);
      \u0275\u0275conditionalCreate(1, DecadeTableComponent_Conditional_1_Template, 5, 1, "thead");
      \u0275\u0275elementStart(2, "tbody");
      \u0275\u0275repeaterCreate(3, DecadeTableComponent_For_4_Template, 4, 3, "tr", 1, _forTrack1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.headRow && ctx.headRow.length > 0 ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.bodyRows);
    }
  },
  dependencies: [NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var DecadeTableComponent = _DecadeTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DecadeTableComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "decade-table",
      imports: [NzStringTemplateOutletDirective],
      template: `<table class="ant-picker-content" cellspacing="0" role="grid">
  @if (headRow && headRow.length > 0) {
    <thead>
      <tr role="row">
        @if (showWeek) {
          <th role="columnheader"></th>
        }
        @for (cell of headRow; track $index) {
          <th role="columnheader" [title]="cell.title"> {{ cell.content }}</th>
        }
      </tr>
    </thead>
  }

  <tbody>
    @for (row of bodyRows; track row.trackByIndex) {
      <tr [class]="row.classMap!" role="row">
        @if (row.weekNum) {
          <td role="gridcell" class="{{ prefixCls }}-cell-week"> {{ row.weekNum }}</td>
        }
        @for (cell of row.dateCells; track cell.trackByIndex) {
          <td
            [title]="cell.title"
            role="gridcell"
            [class]="cell.classMap!"
            (click)="cell.isDisabled ? null : cell.onClick()"
            (mouseenter)="cell.onMouseEnter()"
          >
            @switch (prefixCls) {
              @case ('ant-picker') {
                @if (cell.cellRender) {
                  <ng-template
                    [nzStringTemplateOutlet]="cell.cellRender"
                    [nzStringTemplateOutletContext]="{ $implicit: cell.value }"
                  >
                    {{ cell.cellRender }}
                  </ng-template>
                } @else {
                  <div
                    class="{{ prefixCls }}-cell-inner"
                    [attr.aria-selected]="cell.isSelected"
                    [attr.aria-disabled]="cell.isDisabled"
                  >
                    {{ cell.content }}
                  </div>
                }
              }
              @case ('ant-picker-calendar') {
                <div
                  class="{{ prefixCls }}-date ant-picker-cell-inner"
                  [class.ant-picker-calendar-date-today]="cell.isToday"
                >
                  @if (cell.fullCellRender) {
                    <ng-container *nzStringTemplateOutlet="cell.fullCellRender; context: { $implicit: cell.value }">
                      {{ cell.fullCellRender }}
                    </ng-container>
                  } @else {
                    <div class="{{ prefixCls }}-date-value">{{ cell.content }}</div>
                    <div class="{{ prefixCls }}-date-content">
                      <ng-container *nzStringTemplateOutlet="cell.cellRender; context: { $implicit: cell.value }">
                        {{ cell.cellRender }}
                      </ng-container>
                    </div>
                  }
                </div>
              }
            }
          </td>
        }
      </tr>
    }
  </tbody>
</table>
`
    }]
  }], null, null);
})();
var _YearHeaderComponent = class _YearHeaderComponent extends AbstractPanelHeader {
  constructor() {
    super(...arguments);
    __publicField(this, "mode", "year");
  }
  get startYear() {
    return parseInt(`${this.value.getYear() / 10}`, 10) * 10;
  }
  get endYear() {
    return this.startYear + 9;
  }
  superPrevious() {
    this.changeValue(this.value.addYears(-10));
  }
  superNext() {
    this.changeValue(this.value.addYears(10));
  }
  getSelectors() {
    return [{
      className: `${this.prefixCls}-year-btn`,
      title: "",
      onClick: () => {
        this.mode = "decade";
        this.changeMode("decade");
      },
      label: `${this.startYear}-${this.endYear}`
    }];
  }
};
__publicField(_YearHeaderComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275YearHeaderComponent_BaseFactory;
  return function YearHeaderComponent_Factory(__ngFactoryType__) {
    return (\u0275YearHeaderComponent_BaseFactory || (\u0275YearHeaderComponent_BaseFactory = \u0275\u0275getInheritedFactory(_YearHeaderComponent)))(__ngFactoryType__ || _YearHeaderComponent);
  };
})());
__publicField(_YearHeaderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _YearHeaderComponent,
  selectors: [["year-header"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 12,
  vars: 33,
  consts: [["role", "button", "type", "button", "tabindex", "-1", 3, "click", "title"], [1, "ant-picker-super-prev-icon"], [1, "ant-picker-prev-icon"], ["role", "button", "type", "button", 3, "class", "title"], [1, "ant-picker-next-icon"], [1, "ant-picker-super-next-icon"], ["role", "button", "type", "button", 3, "click", "title"]],
  template: function YearHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div")(1, "button", 0);
      \u0275\u0275domListener("click", function YearHeaderComponent_Template_button_click_1_listener() {
        return ctx.superPrevious();
      });
      \u0275\u0275domElement(2, "span", 1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "button", 0);
      \u0275\u0275domListener("click", function YearHeaderComponent_Template_button_click_3_listener() {
        return ctx.previous();
      });
      \u0275\u0275domElement(4, "span", 2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "div");
      \u0275\u0275repeaterCreate(6, YearHeaderComponent_For_7_Template, 2, 5, "button", 3, _forTrack0, true);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "button", 0);
      \u0275\u0275domListener("click", function YearHeaderComponent_Template_button_click_8_listener() {
        return ctx.next();
      });
      \u0275\u0275domElement(9, "span", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "button", 0);
      \u0275\u0275domListener("click", function YearHeaderComponent_Template_button_click_10_listener() {
        return ctx.superNext();
      });
      \u0275\u0275domElement(11, "span", 5);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.prefixCls);
      \u0275\u0275advance();
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superPreviousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.previousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-view"));
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.selectors);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.nextTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superNextTitle()));
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var YearHeaderComponent = _YearHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YearHeaderComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "year-header",
      template: `<div class="{{ prefixCls }}">
  <button
    [style.visibility]="showSuperPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-prev-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superPreviousTitle() }}"
    (click)="superPrevious()"
  >
    <span class="ant-picker-super-prev-icon"></span>
  </button>
  <button
    [style.visibility]="showPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-prev-btn"
    role="button"
    type="button"
    title="{{ previousTitle() }}"
    tabindex="-1"
    (click)="previous()"
  >
    <span class="ant-picker-prev-icon"></span>
  </button>

  <div class="{{ prefixCls }}-view">
    @for (selector of selectors; track trackBySelector(selector)) {
      <button
        class="{{ selector.className }}"
        role="button"
        type="button"
        title="{{ selector.title || null }}"
        (click)="selector.onClick()"
      >
        {{ selector.label }}
      </button>
    }
  </div>
  <button
    [style.visibility]="showNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ nextTitle() }}"
    (click)="next()"
  >
    <span class="ant-picker-next-icon"></span>
  </button>
  <button
    [style.visibility]="showSuperNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superNextTitle() }}"
    (click)="superNext()"
  >
    <span class="ant-picker-super-next-icon"></span>
  </button>
</div>
`
    }]
  }], null, null);
})();
var _YearTableComponent = class _YearTableComponent extends AbstractTable {
  constructor() {
    super(...arguments);
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "MAX_ROW", 4);
    __publicField(this, "MAX_COL", 3);
  }
  makeHeadRow() {
    return [];
  }
  makeBodyRows() {
    const currentYear = this.activeDate && this.activeDate.getYear();
    const startYear = parseInt(`${currentYear / 10}`, 10) * 10;
    const endYear = startYear + 9;
    const previousYear = startYear - 1;
    const years = [];
    let yearValue = 0;
    for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
      const row = {
        dateCells: [],
        trackByIndex: rowIndex
      };
      for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
        const yearNum = previousYear + yearValue;
        const year = this.activeDate.setYear(yearNum);
        const content = this.dateHelper.format(year.nativeDate, "yyyy");
        const isDisabled = this.isDisabledYear(year);
        const cell = {
          trackByIndex: colIndex,
          value: year.nativeDate,
          isDisabled,
          isSameDecade: yearNum >= startYear && yearNum <= endYear,
          isSelected: yearNum === (this.value && this.value.getYear()),
          content,
          title: content,
          classMap: {},
          isLastCellInPanel: year.getYear() === endYear,
          isFirstCellInPanel: year.getYear() === startYear,
          cellRender: valueFunctionProp(this.cellRender, year),
          // Customized content
          fullCellRender: valueFunctionProp(this.fullCellRender, year),
          onClick: () => this.chooseYear(cell.value.getFullYear()),
          // don't use yearValue here,
          onMouseEnter: () => this.cellHover.emit(year)
        };
        this.addCellProperty(cell, year);
        row.dateCells.push(cell);
        yearValue++;
      }
      years.push(row);
    }
    return years;
  }
  getClassMap(cell) {
    return __spreadProps(__spreadValues({}, super.getClassMap(cell)), {
      [`ant-picker-cell-in-view`]: !!cell.isSameDecade
    });
  }
  isDisabledYear(year) {
    if (!this.disabledDate) {
      return false;
    }
    const firstOfMonth = year.setMonth(0).setDate(1);
    for (let date = firstOfMonth; date.getYear() === year.getYear(); date = date.addDays(1)) {
      if (!this.disabledDate(date.nativeDate)) {
        return false;
      }
    }
    return true;
  }
  addCellProperty(cell, year) {
    if (this.hasRangeValue()) {
      const [startHover, endHover] = this.hoverValue;
      const [startSelected, endSelected] = this.selectedValue;
      if (startSelected == null ? void 0 : startSelected.isSameYear(year)) {
        cell.isSelectedStart = true;
        cell.isSelected = true;
      }
      if (endSelected == null ? void 0 : endSelected.isSameYear(year)) {
        cell.isSelectedEnd = true;
        cell.isSelected = true;
      }
      if (startHover && endHover) {
        cell.isHoverStart = startHover.isSameYear(year);
        cell.isHoverEnd = endHover.isSameYear(year);
        cell.isInHoverRange = startHover.isBeforeYear(year) && year.isBeforeYear(endHover);
      }
      cell.isStartSingle = startSelected && !endSelected;
      cell.isEndSingle = !startSelected && endSelected;
      cell.isInSelectedRange = (startSelected == null ? void 0 : startSelected.isBeforeYear(year)) && (year == null ? void 0 : year.isBeforeYear(endSelected));
      cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
      cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
    } else if (year.isSameYear(this.value)) {
      cell.isSelected = true;
    }
    cell.classMap = this.getClassMap(cell);
  }
  chooseYear(year) {
    this.value = this.activeDate.setYear(year);
    this.valueChange.emit(this.value);
    this.render();
  }
};
__publicField(_YearTableComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275YearTableComponent_BaseFactory;
  return function YearTableComponent_Factory(__ngFactoryType__) {
    return (\u0275YearTableComponent_BaseFactory || (\u0275YearTableComponent_BaseFactory = \u0275\u0275getInheritedFactory(_YearTableComponent)))(__ngFactoryType__ || _YearTableComponent);
  };
})());
__publicField(_YearTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _YearTableComponent,
  selectors: [["year-table"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 5,
  vars: 1,
  consts: [["cellspacing", "0", "role", "grid", 1, "ant-picker-content"], ["role", "row", 3, "class"], ["role", "row"], ["role", "columnheader"], ["role", "columnheader", 3, "title"], ["role", "gridcell", 3, "class"], ["role", "gridcell", 3, "title", "class"], ["role", "gridcell"], ["role", "gridcell", 3, "click", "mouseenter", "title"], [3, "class", "ant-picker-calendar-date-today"], [3, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [3, "class"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"]],
  template: function YearTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "table", 0);
      \u0275\u0275conditionalCreate(1, YearTableComponent_Conditional_1_Template, 5, 1, "thead");
      \u0275\u0275elementStart(2, "tbody");
      \u0275\u0275repeaterCreate(3, YearTableComponent_For_4_Template, 4, 3, "tr", 1, _forTrack1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.headRow && ctx.headRow.length > 0 ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.bodyRows);
    }
  },
  dependencies: [NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var YearTableComponent = _YearTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(YearTableComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "year-table",
      imports: [NzStringTemplateOutletDirective],
      template: `<table class="ant-picker-content" cellspacing="0" role="grid">
  @if (headRow && headRow.length > 0) {
    <thead>
      <tr role="row">
        @if (showWeek) {
          <th role="columnheader"></th>
        }
        @for (cell of headRow; track $index) {
          <th role="columnheader" [title]="cell.title"> {{ cell.content }}</th>
        }
      </tr>
    </thead>
  }

  <tbody>
    @for (row of bodyRows; track row.trackByIndex) {
      <tr [class]="row.classMap!" role="row">
        @if (row.weekNum) {
          <td role="gridcell" class="{{ prefixCls }}-cell-week"> {{ row.weekNum }}</td>
        }
        @for (cell of row.dateCells; track cell.trackByIndex) {
          <td
            [title]="cell.title"
            role="gridcell"
            [class]="cell.classMap!"
            (click)="cell.isDisabled ? null : cell.onClick()"
            (mouseenter)="cell.onMouseEnter()"
          >
            @switch (prefixCls) {
              @case ('ant-picker') {
                @if (cell.cellRender) {
                  <ng-template
                    [nzStringTemplateOutlet]="cell.cellRender"
                    [nzStringTemplateOutletContext]="{ $implicit: cell.value }"
                  >
                    {{ cell.cellRender }}
                  </ng-template>
                } @else {
                  <div
                    class="{{ prefixCls }}-cell-inner"
                    [attr.aria-selected]="cell.isSelected"
                    [attr.aria-disabled]="cell.isDisabled"
                  >
                    {{ cell.content }}
                  </div>
                }
              }
              @case ('ant-picker-calendar') {
                <div
                  class="{{ prefixCls }}-date ant-picker-cell-inner"
                  [class.ant-picker-calendar-date-today]="cell.isToday"
                >
                  @if (cell.fullCellRender) {
                    <ng-container *nzStringTemplateOutlet="cell.fullCellRender; context: { $implicit: cell.value }">
                      {{ cell.fullCellRender }}
                    </ng-container>
                  } @else {
                    <div class="{{ prefixCls }}-date-value">{{ cell.content }}</div>
                    <div class="{{ prefixCls }}-date-content">
                      <ng-container *nzStringTemplateOutlet="cell.cellRender; context: { $implicit: cell.value }">
                        {{ cell.cellRender }}
                      </ng-container>
                    </div>
                  }
                </div>
              }
            }
          </td>
        }
      </tr>
    }
  </tbody>
</table>
`
    }]
  }], null, null);
})();
var _QuarterHeaderComponent = class _QuarterHeaderComponent extends AbstractPanelHeader {
  constructor() {
    super(...arguments);
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "mode", "quarter");
  }
  getSelectors() {
    return [{
      className: `${this.prefixCls}-quarter-btn`,
      title: this.locale.yearSelect,
      onClick: () => {
        this.mode = "year";
        this.changeMode("year");
      },
      label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
    }];
  }
};
__publicField(_QuarterHeaderComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275QuarterHeaderComponent_BaseFactory;
  return function QuarterHeaderComponent_Factory(__ngFactoryType__) {
    return (\u0275QuarterHeaderComponent_BaseFactory || (\u0275QuarterHeaderComponent_BaseFactory = \u0275\u0275getInheritedFactory(_QuarterHeaderComponent)))(__ngFactoryType__ || _QuarterHeaderComponent);
  };
})());
__publicField(_QuarterHeaderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _QuarterHeaderComponent,
  selectors: [["quarter-header"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 12,
  vars: 33,
  consts: [["role", "button", "type", "button", "tabindex", "-1", 3, "click", "title"], [1, "ant-picker-super-prev-icon"], [1, "ant-picker-prev-icon"], ["role", "button", "type", "button", 3, "class", "title"], [1, "ant-picker-next-icon"], [1, "ant-picker-super-next-icon"], ["role", "button", "type", "button", 3, "click", "title"]],
  template: function QuarterHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div")(1, "button", 0);
      \u0275\u0275domListener("click", function QuarterHeaderComponent_Template_button_click_1_listener() {
        return ctx.superPrevious();
      });
      \u0275\u0275domElement(2, "span", 1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "button", 0);
      \u0275\u0275domListener("click", function QuarterHeaderComponent_Template_button_click_3_listener() {
        return ctx.previous();
      });
      \u0275\u0275domElement(4, "span", 2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "div");
      \u0275\u0275repeaterCreate(6, QuarterHeaderComponent_For_7_Template, 2, 5, "button", 3, _forTrack0, true);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "button", 0);
      \u0275\u0275domListener("click", function QuarterHeaderComponent_Template_button_click_8_listener() {
        return ctx.next();
      });
      \u0275\u0275domElement(9, "span", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "button", 0);
      \u0275\u0275domListener("click", function QuarterHeaderComponent_Template_button_click_10_listener() {
        return ctx.superNext();
      });
      \u0275\u0275domElement(11, "span", 5);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.prefixCls);
      \u0275\u0275advance();
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superPreviousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.previousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-view"));
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.selectors);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.nextTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superNextTitle()));
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var QuarterHeaderComponent = _QuarterHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuarterHeaderComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "quarter-header",
      template: `<div class="{{ prefixCls }}">
  <button
    [style.visibility]="showSuperPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-prev-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superPreviousTitle() }}"
    (click)="superPrevious()"
  >
    <span class="ant-picker-super-prev-icon"></span>
  </button>
  <button
    [style.visibility]="showPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-prev-btn"
    role="button"
    type="button"
    title="{{ previousTitle() }}"
    tabindex="-1"
    (click)="previous()"
  >
    <span class="ant-picker-prev-icon"></span>
  </button>

  <div class="{{ prefixCls }}-view">
    @for (selector of selectors; track trackBySelector(selector)) {
      <button
        class="{{ selector.className }}"
        role="button"
        type="button"
        title="{{ selector.title || null }}"
        (click)="selector.onClick()"
      >
        {{ selector.label }}
      </button>
    }
  </div>
  <button
    [style.visibility]="showNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ nextTitle() }}"
    (click)="next()"
  >
    <span class="ant-picker-next-icon"></span>
  </button>
  <button
    [style.visibility]="showSuperNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superNextTitle() }}"
    (click)="superNext()"
  >
    <span class="ant-picker-super-next-icon"></span>
  </button>
</div>
`
    }]
  }], null, null);
})();
var _QuarterTableComponent = class _QuarterTableComponent extends AbstractTable {
  constructor() {
    super(...arguments);
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "MAX_ROW", 1);
    __publicField(this, "MAX_COL", 4);
  }
  changeValueFromInside(value) {
    this.activeDate = value.clone();
    this.valueChange.emit(this.activeDate);
    if (!this.activeDate.isSameQuarter(this.value)) {
      this.render();
    }
  }
  makeHeadRow() {
    return [];
  }
  makeBodyRows() {
    const dateCells = [];
    const months = [{
      dateCells,
      trackByIndex: 0
    }];
    let quarterValue = 1;
    for (let colIndex = 1; colIndex <= this.MAX_COL; colIndex++, quarterValue++) {
      const date = this.activeDate.setQuarter(quarterValue);
      const isDisabled = this.isDisabledQuarter(date);
      const content = this.dateHelper.format(date.nativeDate, "[Q]Q");
      const cell = {
        trackByIndex: colIndex,
        value: date.nativeDate,
        isDisabled,
        isSelected: date.isSameQuarter(this.value),
        content,
        title: content,
        classMap: {},
        cellRender: valueFunctionProp(this.cellRender, date),
        fullCellRender: valueFunctionProp(this.fullCellRender, date),
        onClick: () => this.changeValueFromInside(date),
        onMouseEnter: () => this.cellHover.emit(date)
      };
      this.addCellProperty(cell, date);
      dateCells.push(cell);
    }
    return months;
  }
  isDisabledQuarter(quarter) {
    if (!this.disabledDate) {
      return false;
    }
    const firstDayOfQuarter = new CandyDate(startOfQuarter(quarter.nativeDate));
    for (let date = firstDayOfQuarter; date.getQuarter() === quarter.getQuarter(); date = date.addMonths(1)) {
      if (!this.disabledDate(date.nativeDate)) {
        return false;
      }
    }
    return true;
  }
  addCellProperty(cell, month) {
    if (this.hasRangeValue()) {
      const [startHover, endHover] = this.hoverValue;
      const [startSelected, endSelected] = this.selectedValue;
      if (startSelected == null ? void 0 : startSelected.isSameQuarter(month)) {
        cell.isSelectedStart = true;
        cell.isSelected = true;
      }
      if (endSelected == null ? void 0 : endSelected.isSameQuarter(month)) {
        cell.isSelectedEnd = true;
        cell.isSelected = true;
      }
      if (startHover && endHover) {
        cell.isHoverStart = startHover.isSameQuarter(month);
        cell.isHoverEnd = endHover.isSameQuarter(month);
        cell.isLastCellInPanel = month.getQuarter() === 4;
        cell.isFirstCellInPanel = month.getQuarter() === 1;
        cell.isInHoverRange = startHover.isBeforeQuarter(month) && month.isBeforeQuarter(endHover);
      }
      cell.isStartSingle = startSelected && !endSelected;
      cell.isEndSingle = !startSelected && endSelected;
      cell.isInSelectedRange = (startSelected == null ? void 0 : startSelected.isBeforeQuarter(month)) && (month == null ? void 0 : month.isBeforeQuarter(endSelected));
      cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
      cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
    } else if (month.isSameQuarter(this.value)) {
      cell.isSelected = true;
    }
    cell.classMap = this.getClassMap(cell);
  }
};
__publicField(_QuarterTableComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275QuarterTableComponent_BaseFactory;
  return function QuarterTableComponent_Factory(__ngFactoryType__) {
    return (\u0275QuarterTableComponent_BaseFactory || (\u0275QuarterTableComponent_BaseFactory = \u0275\u0275getInheritedFactory(_QuarterTableComponent)))(__ngFactoryType__ || _QuarterTableComponent);
  };
})());
__publicField(_QuarterTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _QuarterTableComponent,
  selectors: [["quarter-table"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 5,
  vars: 1,
  consts: [["cellspacing", "0", "role", "grid", 1, "ant-picker-content"], ["role", "row", 3, "class"], ["role", "row"], ["role", "columnheader"], ["role", "columnheader", 3, "title"], ["role", "gridcell", 3, "class"], ["role", "gridcell", 3, "title", "class"], ["role", "gridcell"], ["role", "gridcell", 3, "click", "mouseenter", "title"], [3, "class", "ant-picker-calendar-date-today"], [3, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [3, "class"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"]],
  template: function QuarterTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "table", 0);
      \u0275\u0275conditionalCreate(1, QuarterTableComponent_Conditional_1_Template, 5, 1, "thead");
      \u0275\u0275elementStart(2, "tbody");
      \u0275\u0275repeaterCreate(3, QuarterTableComponent_For_4_Template, 4, 3, "tr", 1, _forTrack1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.headRow && ctx.headRow.length > 0 ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.bodyRows);
    }
  },
  dependencies: [NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var QuarterTableComponent = _QuarterTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(QuarterTableComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "quarter-table",
      imports: [NzStringTemplateOutletDirective],
      template: `<table class="ant-picker-content" cellspacing="0" role="grid">
  @if (headRow && headRow.length > 0) {
    <thead>
      <tr role="row">
        @if (showWeek) {
          <th role="columnheader"></th>
        }
        @for (cell of headRow; track $index) {
          <th role="columnheader" [title]="cell.title"> {{ cell.content }}</th>
        }
      </tr>
    </thead>
  }

  <tbody>
    @for (row of bodyRows; track row.trackByIndex) {
      <tr [class]="row.classMap!" role="row">
        @if (row.weekNum) {
          <td role="gridcell" class="{{ prefixCls }}-cell-week"> {{ row.weekNum }}</td>
        }
        @for (cell of row.dateCells; track cell.trackByIndex) {
          <td
            [title]="cell.title"
            role="gridcell"
            [class]="cell.classMap!"
            (click)="cell.isDisabled ? null : cell.onClick()"
            (mouseenter)="cell.onMouseEnter()"
          >
            @switch (prefixCls) {
              @case ('ant-picker') {
                @if (cell.cellRender) {
                  <ng-template
                    [nzStringTemplateOutlet]="cell.cellRender"
                    [nzStringTemplateOutletContext]="{ $implicit: cell.value }"
                  >
                    {{ cell.cellRender }}
                  </ng-template>
                } @else {
                  <div
                    class="{{ prefixCls }}-cell-inner"
                    [attr.aria-selected]="cell.isSelected"
                    [attr.aria-disabled]="cell.isDisabled"
                  >
                    {{ cell.content }}
                  </div>
                }
              }
              @case ('ant-picker-calendar') {
                <div
                  class="{{ prefixCls }}-date ant-picker-cell-inner"
                  [class.ant-picker-calendar-date-today]="cell.isToday"
                >
                  @if (cell.fullCellRender) {
                    <ng-container *nzStringTemplateOutlet="cell.fullCellRender; context: { $implicit: cell.value }">
                      {{ cell.fullCellRender }}
                    </ng-container>
                  } @else {
                    <div class="{{ prefixCls }}-date-value">{{ cell.content }}</div>
                    <div class="{{ prefixCls }}-date-content">
                      <ng-container *nzStringTemplateOutlet="cell.cellRender; context: { $implicit: cell.value }">
                        {{ cell.cellRender }}
                      </ng-container>
                    </div>
                  }
                </div>
              }
            }
          </td>
        }
      </tr>
    }
  </tbody>
</table>
`
    }]
  }], null, null);
})();
var _MonthHeaderComponent = class _MonthHeaderComponent extends AbstractPanelHeader {
  constructor() {
    super(...arguments);
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "mode", "month");
  }
  getSelectors() {
    return [{
      className: `${this.prefixCls}-month-btn`,
      title: this.locale.yearSelect,
      onClick: () => {
        this.mode = "year";
        this.changeMode("year");
      },
      label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
    }];
  }
};
__publicField(_MonthHeaderComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275MonthHeaderComponent_BaseFactory;
  return function MonthHeaderComponent_Factory(__ngFactoryType__) {
    return (\u0275MonthHeaderComponent_BaseFactory || (\u0275MonthHeaderComponent_BaseFactory = \u0275\u0275getInheritedFactory(_MonthHeaderComponent)))(__ngFactoryType__ || _MonthHeaderComponent);
  };
})());
__publicField(_MonthHeaderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MonthHeaderComponent,
  selectors: [["month-header"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 12,
  vars: 33,
  consts: [["role", "button", "type", "button", "tabindex", "-1", 3, "click", "title"], [1, "ant-picker-super-prev-icon"], [1, "ant-picker-prev-icon"], ["role", "button", "type", "button", 3, "class", "title"], [1, "ant-picker-next-icon"], [1, "ant-picker-super-next-icon"], ["role", "button", "type", "button", 3, "click", "title"]],
  template: function MonthHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div")(1, "button", 0);
      \u0275\u0275domListener("click", function MonthHeaderComponent_Template_button_click_1_listener() {
        return ctx.superPrevious();
      });
      \u0275\u0275domElement(2, "span", 1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "button", 0);
      \u0275\u0275domListener("click", function MonthHeaderComponent_Template_button_click_3_listener() {
        return ctx.previous();
      });
      \u0275\u0275domElement(4, "span", 2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "div");
      \u0275\u0275repeaterCreate(6, MonthHeaderComponent_For_7_Template, 2, 5, "button", 3, _forTrack0, true);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "button", 0);
      \u0275\u0275domListener("click", function MonthHeaderComponent_Template_button_click_8_listener() {
        return ctx.next();
      });
      \u0275\u0275domElement(9, "span", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "button", 0);
      \u0275\u0275domListener("click", function MonthHeaderComponent_Template_button_click_10_listener() {
        return ctx.superNext();
      });
      \u0275\u0275domElement(11, "span", 5);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.prefixCls);
      \u0275\u0275advance();
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superPreviousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.previousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-view"));
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.selectors);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.nextTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superNextTitle()));
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var MonthHeaderComponent = _MonthHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MonthHeaderComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "month-header",
      template: `<div class="{{ prefixCls }}">
  <button
    [style.visibility]="showSuperPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-prev-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superPreviousTitle() }}"
    (click)="superPrevious()"
  >
    <span class="ant-picker-super-prev-icon"></span>
  </button>
  <button
    [style.visibility]="showPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-prev-btn"
    role="button"
    type="button"
    title="{{ previousTitle() }}"
    tabindex="-1"
    (click)="previous()"
  >
    <span class="ant-picker-prev-icon"></span>
  </button>

  <div class="{{ prefixCls }}-view">
    @for (selector of selectors; track trackBySelector(selector)) {
      <button
        class="{{ selector.className }}"
        role="button"
        type="button"
        title="{{ selector.title || null }}"
        (click)="selector.onClick()"
      >
        {{ selector.label }}
      </button>
    }
  </div>
  <button
    [style.visibility]="showNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ nextTitle() }}"
    (click)="next()"
  >
    <span class="ant-picker-next-icon"></span>
  </button>
  <button
    [style.visibility]="showSuperNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superNextTitle() }}"
    (click)="superNext()"
  >
    <span class="ant-picker-super-next-icon"></span>
  </button>
</div>
`
    }]
  }], null, null);
})();
var _MonthTableComponent = class _MonthTableComponent extends AbstractTable {
  constructor() {
    super(...arguments);
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "MAX_ROW", 4);
    __publicField(this, "MAX_COL", 3);
  }
  makeHeadRow() {
    return [];
  }
  makeBodyRows() {
    const months = [];
    let monthValue = 0;
    for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
      const row = {
        dateCells: [],
        trackByIndex: rowIndex
      };
      for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
        const month = this.activeDate.setMonth(monthValue);
        const isDisabled = this.isDisabledMonth(month);
        const content = this.dateHelper.format(month.nativeDate, "MMM");
        const cell = {
          trackByIndex: colIndex,
          value: month.nativeDate,
          isDisabled,
          isSelected: month.isSameMonth(this.value),
          content,
          title: content,
          classMap: {},
          cellRender: valueFunctionProp(this.cellRender, month),
          // Customized content
          fullCellRender: valueFunctionProp(this.fullCellRender, month),
          onClick: () => this.chooseMonth(cell.value.getMonth()),
          // don't use monthValue here,
          onMouseEnter: () => this.cellHover.emit(month)
        };
        this.addCellProperty(cell, month);
        row.dateCells.push(cell);
        monthValue++;
      }
      months.push(row);
    }
    return months;
  }
  isDisabledMonth(month) {
    if (!this.disabledDate) {
      return false;
    }
    const firstOfMonth = month.setDate(1);
    for (let date = firstOfMonth; date.getMonth() === month.getMonth(); date = date.addDays(1)) {
      if (!this.disabledDate(date.nativeDate)) {
        return false;
      }
    }
    return true;
  }
  addCellProperty(cell, month) {
    if (this.hasRangeValue()) {
      const [startHover, endHover] = this.hoverValue;
      const [startSelected, endSelected] = this.selectedValue;
      if (startSelected == null ? void 0 : startSelected.isSameMonth(month)) {
        cell.isSelectedStart = true;
        cell.isSelected = true;
      }
      if (endSelected == null ? void 0 : endSelected.isSameMonth(month)) {
        cell.isSelectedEnd = true;
        cell.isSelected = true;
      }
      if (startHover && endHover) {
        cell.isHoverStart = startHover.isSameMonth(month);
        cell.isHoverEnd = endHover.isSameMonth(month);
        cell.isLastCellInPanel = month.getMonth() === 11;
        cell.isFirstCellInPanel = month.getMonth() === 0;
        cell.isInHoverRange = startHover.isBeforeMonth(month) && month.isBeforeMonth(endHover);
      }
      cell.isStartSingle = startSelected && !endSelected;
      cell.isEndSingle = !startSelected && endSelected;
      cell.isInSelectedRange = (startSelected == null ? void 0 : startSelected.isBeforeMonth(month)) && (month == null ? void 0 : month.isBeforeMonth(endSelected));
      cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
      cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
    } else if (month.isSameMonth(this.value)) {
      cell.isSelected = true;
    }
    cell.classMap = this.getClassMap(cell);
  }
  chooseMonth(month) {
    this.value = this.activeDate.setMonth(month);
    this.valueChange.emit(this.value);
  }
};
__publicField(_MonthTableComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275MonthTableComponent_BaseFactory;
  return function MonthTableComponent_Factory(__ngFactoryType__) {
    return (\u0275MonthTableComponent_BaseFactory || (\u0275MonthTableComponent_BaseFactory = \u0275\u0275getInheritedFactory(_MonthTableComponent)))(__ngFactoryType__ || _MonthTableComponent);
  };
})());
__publicField(_MonthTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MonthTableComponent,
  selectors: [["month-table"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 5,
  vars: 1,
  consts: [["cellspacing", "0", "role", "grid", 1, "ant-picker-content"], ["role", "row", 3, "class"], ["role", "row"], ["role", "columnheader"], ["role", "columnheader", 3, "title"], ["role", "gridcell", 3, "class"], ["role", "gridcell", 3, "title", "class"], ["role", "gridcell"], ["role", "gridcell", 3, "click", "mouseenter", "title"], [3, "class", "ant-picker-calendar-date-today"], [3, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [3, "class"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"]],
  template: function MonthTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "table", 0);
      \u0275\u0275conditionalCreate(1, MonthTableComponent_Conditional_1_Template, 5, 1, "thead");
      \u0275\u0275elementStart(2, "tbody");
      \u0275\u0275repeaterCreate(3, MonthTableComponent_For_4_Template, 4, 3, "tr", 1, _forTrack1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.headRow && ctx.headRow.length > 0 ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.bodyRows);
    }
  },
  dependencies: [NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var MonthTableComponent = _MonthTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MonthTableComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "month-table",
      imports: [NzStringTemplateOutletDirective],
      template: `<table class="ant-picker-content" cellspacing="0" role="grid">
  @if (headRow && headRow.length > 0) {
    <thead>
      <tr role="row">
        @if (showWeek) {
          <th role="columnheader"></th>
        }
        @for (cell of headRow; track $index) {
          <th role="columnheader" [title]="cell.title"> {{ cell.content }}</th>
        }
      </tr>
    </thead>
  }

  <tbody>
    @for (row of bodyRows; track row.trackByIndex) {
      <tr [class]="row.classMap!" role="row">
        @if (row.weekNum) {
          <td role="gridcell" class="{{ prefixCls }}-cell-week"> {{ row.weekNum }}</td>
        }
        @for (cell of row.dateCells; track cell.trackByIndex) {
          <td
            [title]="cell.title"
            role="gridcell"
            [class]="cell.classMap!"
            (click)="cell.isDisabled ? null : cell.onClick()"
            (mouseenter)="cell.onMouseEnter()"
          >
            @switch (prefixCls) {
              @case ('ant-picker') {
                @if (cell.cellRender) {
                  <ng-template
                    [nzStringTemplateOutlet]="cell.cellRender"
                    [nzStringTemplateOutletContext]="{ $implicit: cell.value }"
                  >
                    {{ cell.cellRender }}
                  </ng-template>
                } @else {
                  <div
                    class="{{ prefixCls }}-cell-inner"
                    [attr.aria-selected]="cell.isSelected"
                    [attr.aria-disabled]="cell.isDisabled"
                  >
                    {{ cell.content }}
                  </div>
                }
              }
              @case ('ant-picker-calendar') {
                <div
                  class="{{ prefixCls }}-date ant-picker-cell-inner"
                  [class.ant-picker-calendar-date-today]="cell.isToday"
                >
                  @if (cell.fullCellRender) {
                    <ng-container *nzStringTemplateOutlet="cell.fullCellRender; context: { $implicit: cell.value }">
                      {{ cell.fullCellRender }}
                    </ng-container>
                  } @else {
                    <div class="{{ prefixCls }}-date-value">{{ cell.content }}</div>
                    <div class="{{ prefixCls }}-date-content">
                      <ng-container *nzStringTemplateOutlet="cell.cellRender; context: { $implicit: cell.value }">
                        {{ cell.cellRender }}
                      </ng-container>
                    </div>
                  }
                </div>
              }
            }
          </td>
        }
      </tr>
    }
  </tbody>
</table>
`
    }]
  }], null, null);
})();
var _DateHeaderComponent = class _DateHeaderComponent extends AbstractPanelHeader {
  constructor() {
    super(...arguments);
    __publicField(this, "dateHelper", inject(DateHelperService));
    __publicField(this, "mode", "date");
  }
  getSelectors() {
    return [{
      className: `${this.prefixCls}-year-btn`,
      title: this.locale.yearSelect,
      onClick: () => {
        this.mode = "year";
        this.changeMode("year");
      },
      label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
    }, {
      className: `${this.prefixCls}-month-btn`,
      title: this.locale.monthSelect,
      onClick: () => {
        this.mode = "month";
        this.changeMode("month");
      },
      label: this.dateHelper.format(this.value.nativeDate, this.locale.monthFormat || "MMM")
    }];
  }
};
__publicField(_DateHeaderComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275DateHeaderComponent_BaseFactory;
  return function DateHeaderComponent_Factory(__ngFactoryType__) {
    return (\u0275DateHeaderComponent_BaseFactory || (\u0275DateHeaderComponent_BaseFactory = \u0275\u0275getInheritedFactory(_DateHeaderComponent)))(__ngFactoryType__ || _DateHeaderComponent);
  };
})());
__publicField(_DateHeaderComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _DateHeaderComponent,
  selectors: [["date-header"]],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 12,
  vars: 33,
  consts: [["role", "button", "type", "button", "tabindex", "-1", 3, "click", "title"], [1, "ant-picker-super-prev-icon"], [1, "ant-picker-prev-icon"], ["role", "button", "type", "button", 3, "class", "title"], [1, "ant-picker-next-icon"], [1, "ant-picker-super-next-icon"], ["role", "button", "type", "button", 3, "click", "title"]],
  template: function DateHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div")(1, "button", 0);
      \u0275\u0275domListener("click", function DateHeaderComponent_Template_button_click_1_listener() {
        return ctx.superPrevious();
      });
      \u0275\u0275domElement(2, "span", 1);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "button", 0);
      \u0275\u0275domListener("click", function DateHeaderComponent_Template_button_click_3_listener() {
        return ctx.previous();
      });
      \u0275\u0275domElement(4, "span", 2);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(5, "div");
      \u0275\u0275repeaterCreate(6, DateHeaderComponent_For_7_Template, 2, 5, "button", 3, _forTrack0, true);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "button", 0);
      \u0275\u0275domListener("click", function DateHeaderComponent_Template_button_click_8_listener() {
        return ctx.next();
      });
      \u0275\u0275domElement(9, "span", 4);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(10, "button", 0);
      \u0275\u0275domListener("click", function DateHeaderComponent_Template_button_click_10_listener() {
        return ctx.superNext();
      });
      \u0275\u0275domElement(11, "span", 5);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.prefixCls);
      \u0275\u0275advance();
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superPreviousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-prev-btn"));
      \u0275\u0275styleProp("visibility", ctx.showPreBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.previousTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-view"));
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.selectors);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.nextTitle()));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(\u0275\u0275interpolate1("", ctx.prefixCls, "-super-next-btn"));
      \u0275\u0275styleProp("visibility", ctx.showSuperNextBtn ? "visible" : "hidden");
      \u0275\u0275domProperty("title", \u0275\u0275interpolate(ctx.superNextTitle()));
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var DateHeaderComponent = _DateHeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DateHeaderComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "date-header",
      template: `<div class="{{ prefixCls }}">
  <button
    [style.visibility]="showSuperPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-prev-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superPreviousTitle() }}"
    (click)="superPrevious()"
  >
    <span class="ant-picker-super-prev-icon"></span>
  </button>
  <button
    [style.visibility]="showPreBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-prev-btn"
    role="button"
    type="button"
    title="{{ previousTitle() }}"
    tabindex="-1"
    (click)="previous()"
  >
    <span class="ant-picker-prev-icon"></span>
  </button>

  <div class="{{ prefixCls }}-view">
    @for (selector of selectors; track trackBySelector(selector)) {
      <button
        class="{{ selector.className }}"
        role="button"
        type="button"
        title="{{ selector.title || null }}"
        (click)="selector.onClick()"
      >
        {{ selector.label }}
      </button>
    }
  </div>
  <button
    [style.visibility]="showNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ nextTitle() }}"
    (click)="next()"
  >
    <span class="ant-picker-next-icon"></span>
  </button>
  <button
    [style.visibility]="showSuperNextBtn ? 'visible' : 'hidden'"
    class="{{ prefixCls }}-super-next-btn"
    role="button"
    type="button"
    tabindex="-1"
    title="{{ superNextTitle() }}"
    (click)="superNext()"
  >
    <span class="ant-picker-super-next-icon"></span>
  </button>
</div>
`
    }]
  }], null, null);
})();
var _DateTableComponent = class _DateTableComponent extends AbstractTable {
  constructor() {
    super(...arguments);
    __publicField(this, "format");
    __publicField(this, "i18n", inject(NzI18nService));
    __publicField(this, "dateHelper", inject(DateHelperService));
  }
  changeValueFromInside(value) {
    this.activeDate = this.activeDate.setYear(value.getYear()).setMonth(value.getMonth()).setDate(value.getDate());
    this.valueChange.emit(this.activeDate);
    if (!this.activeDate.isSameMonth(this.value)) {
      this.render();
    }
  }
  makeHeadRow() {
    const weekDays = [];
    const start = this.activeDate.calendarStart({
      weekStartsOn: this.dateHelper.getFirstDayOfWeek()
    });
    for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
      const day = start.addDays(colIndex);
      weekDays.push({
        trackByIndex: null,
        value: day.nativeDate,
        title: this.dateHelper.format(day.nativeDate, "E"),
        // eg. Tue
        content: this.dateHelper.format(day.nativeDate, this.getVeryShortWeekFormat()),
        // eg. Tu,
        isSelected: false,
        isDisabled: false,
        onClick() {
        },
        onMouseEnter() {
        }
      });
    }
    return weekDays;
  }
  getVeryShortWeekFormat() {
    return this.i18n.getLocaleId().toLowerCase().indexOf("zh") === 0 ? "EEEEE" : "EEEEEE";
  }
  makeBodyRows() {
    var _a;
    const weekRows = [];
    const firstDayOfMonth = this.activeDate.calendarStart({
      weekStartsOn: this.dateHelper.getFirstDayOfWeek()
    });
    for (let week = 0; week < this.MAX_ROW; week++) {
      const weekStart = firstDayOfMonth.addDays(week * 7);
      const row = {
        isActive: false,
        dateCells: [],
        trackByIndex: week
      };
      for (let day = 0; day < 7; day++) {
        const date = weekStart.addDays(day);
        const dateFormat = transCompatFormat((_a = this.format) != null ? _a : this.i18n.getLocaleData("DatePicker.lang.dateFormat", "YYYY-MM-DD"));
        const title = this.dateHelper.format(date.nativeDate, dateFormat);
        const label = this.dateHelper.format(date.nativeDate, "dd");
        const cell = {
          trackByIndex: day,
          value: date.nativeDate,
          label,
          isSelected: false,
          isDisabled: false,
          isToday: false,
          title,
          cellRender: valueFunctionProp(this.cellRender, date),
          // Customized content
          fullCellRender: valueFunctionProp(this.fullCellRender, date),
          content: `${date.getDate()}`,
          onClick: () => this.changeValueFromInside(date),
          onMouseEnter: () => this.cellHover.emit(date)
        };
        this.addCellProperty(cell, date);
        if (this.showWeek && !row.weekNum) {
          row.weekNum = this.dateHelper.getISOWeek(date.nativeDate);
        }
        if (date.isSameDay(this.value)) {
          row.isActive = date.isSameDay(this.value);
        }
        row.dateCells.push(cell);
      }
      row.classMap = {
        [`ant-picker-week-panel-row`]: this.canSelectWeek,
        [`ant-picker-week-panel-row-selected`]: this.canSelectWeek && row.isActive
      };
      weekRows.push(row);
    }
    return weekRows;
  }
  addCellProperty(cell, date) {
    var _a;
    if (this.hasRangeValue() && !this.canSelectWeek) {
      const [startHover, endHover] = this.hoverValue;
      const [startSelected, endSelected] = this.selectedValue;
      if (startSelected == null ? void 0 : startSelected.isSameDay(date)) {
        cell.isSelectedStart = true;
        cell.isSelected = true;
      }
      if (endSelected == null ? void 0 : endSelected.isSameDay(date)) {
        cell.isSelectedEnd = true;
        cell.isSelected = true;
      }
      if (startHover && endHover) {
        cell.isHoverStart = startHover.isSameDay(date);
        cell.isHoverEnd = endHover.isSameDay(date);
        cell.isLastCellInPanel = date.isLastDayOfMonth();
        cell.isFirstCellInPanel = date.isFirstDayOfMonth();
        cell.isInHoverRange = startHover.isBeforeDay(date) && date.isBeforeDay(endHover);
      }
      cell.isStartSingle = startSelected && !endSelected;
      cell.isEndSingle = !startSelected && endSelected;
      cell.isInSelectedRange = (startSelected == null ? void 0 : startSelected.isBeforeDay(date)) && date.isBeforeDay(endSelected);
      cell.isRangeStartNearHover = startSelected && cell.isInHoverRange;
      cell.isRangeEndNearHover = endSelected && cell.isInHoverRange;
    }
    cell.isToday = date.isToday();
    cell.isSelected = date.isSameDay(this.value);
    cell.isDisabled = !!((_a = this.disabledDate) == null ? void 0 : _a.call(this, date.nativeDate));
    cell.classMap = this.getClassMap(cell);
  }
  getClassMap(cell) {
    const date = new CandyDate(cell.value);
    return __spreadProps(__spreadValues({}, super.getClassMap(cell)), {
      [`ant-picker-cell-today`]: !!cell.isToday,
      [`ant-picker-cell-in-view`]: date.isSameMonth(this.activeDate)
    });
  }
};
__publicField(_DateTableComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275DateTableComponent_BaseFactory;
  return function DateTableComponent_Factory(__ngFactoryType__) {
    return (\u0275DateTableComponent_BaseFactory || (\u0275DateTableComponent_BaseFactory = \u0275\u0275getInheritedFactory(_DateTableComponent)))(__ngFactoryType__ || _DateTableComponent);
  };
})());
__publicField(_DateTableComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _DateTableComponent,
  selectors: [["date-table"]],
  inputs: {
    format: "format"
  },
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 5,
  vars: 1,
  consts: [["cellspacing", "0", "role", "grid", 1, "ant-picker-content"], ["role", "row", 3, "class"], ["role", "row"], ["role", "columnheader"], ["role", "columnheader", 3, "title"], ["role", "gridcell", 3, "class"], ["role", "gridcell", 3, "title", "class"], ["role", "gridcell"], ["role", "gridcell", 3, "click", "mouseenter", "title"], [3, "class", "ant-picker-calendar-date-today"], [3, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], [3, "class"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"]],
  template: function DateTableComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "table", 0);
      \u0275\u0275conditionalCreate(1, DateTableComponent_Conditional_1_Template, 5, 1, "thead");
      \u0275\u0275elementStart(2, "tbody");
      \u0275\u0275repeaterCreate(3, DateTableComponent_For_4_Template, 4, 3, "tr", 1, _forTrack1);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.headRow && ctx.headRow.length > 0 ? 1 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.bodyRows);
    }
  },
  dependencies: [NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var DateTableComponent = _DateTableComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DateTableComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "date-table",
      imports: [NzStringTemplateOutletDirective],
      template: `<table class="ant-picker-content" cellspacing="0" role="grid">
  @if (headRow && headRow.length > 0) {
    <thead>
      <tr role="row">
        @if (showWeek) {
          <th role="columnheader"></th>
        }
        @for (cell of headRow; track $index) {
          <th role="columnheader" [title]="cell.title"> {{ cell.content }}</th>
        }
      </tr>
    </thead>
  }

  <tbody>
    @for (row of bodyRows; track row.trackByIndex) {
      <tr [class]="row.classMap!" role="row">
        @if (row.weekNum) {
          <td role="gridcell" class="{{ prefixCls }}-cell-week"> {{ row.weekNum }}</td>
        }
        @for (cell of row.dateCells; track cell.trackByIndex) {
          <td
            [title]="cell.title"
            role="gridcell"
            [class]="cell.classMap!"
            (click)="cell.isDisabled ? null : cell.onClick()"
            (mouseenter)="cell.onMouseEnter()"
          >
            @switch (prefixCls) {
              @case ('ant-picker') {
                @if (cell.cellRender) {
                  <ng-template
                    [nzStringTemplateOutlet]="cell.cellRender"
                    [nzStringTemplateOutletContext]="{ $implicit: cell.value }"
                  >
                    {{ cell.cellRender }}
                  </ng-template>
                } @else {
                  <div
                    class="{{ prefixCls }}-cell-inner"
                    [attr.aria-selected]="cell.isSelected"
                    [attr.aria-disabled]="cell.isDisabled"
                  >
                    {{ cell.content }}
                  </div>
                }
              }
              @case ('ant-picker-calendar') {
                <div
                  class="{{ prefixCls }}-date ant-picker-cell-inner"
                  [class.ant-picker-calendar-date-today]="cell.isToday"
                >
                  @if (cell.fullCellRender) {
                    <ng-container *nzStringTemplateOutlet="cell.fullCellRender; context: { $implicit: cell.value }">
                      {{ cell.fullCellRender }}
                    </ng-container>
                  } @else {
                    <div class="{{ prefixCls }}-date-value">{{ cell.content }}</div>
                    <div class="{{ prefixCls }}-date-content">
                      <ng-container *nzStringTemplateOutlet="cell.cellRender; context: { $implicit: cell.value }">
                        {{ cell.cellRender }}
                      </ng-container>
                    </div>
                  }
                </div>
              }
            }
          </td>
        }
      </tr>
    }
  </tbody>
</table>
`
    }]
  }], null, {
    format: [{
      type: Input
    }]
  });
})();
var _LibPackerModule = class _LibPackerModule {
};
__publicField(_LibPackerModule, "\u0275fac", function LibPackerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LibPackerModule)();
});
__publicField(_LibPackerModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _LibPackerModule,
  imports: [DateHeaderComponent, DateTableComponent, DecadeHeaderComponent, DecadeTableComponent, MonthHeaderComponent, MonthTableComponent, YearHeaderComponent, YearTableComponent, QuarterHeaderComponent, QuarterTableComponent],
  exports: [DateHeaderComponent, DateTableComponent, DecadeHeaderComponent, DecadeTableComponent, MonthHeaderComponent, MonthTableComponent, YearHeaderComponent, YearTableComponent, QuarterHeaderComponent, QuarterTableComponent]
}));
__publicField(_LibPackerModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({}));
var LibPackerModule = _LibPackerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LibPackerModule, [{
    type: NgModule,
    args: [{
      imports: [DateHeaderComponent, DateTableComponent, DecadeHeaderComponent, DecadeTableComponent, MonthHeaderComponent, MonthTableComponent, YearHeaderComponent, YearTableComponent, QuarterHeaderComponent, QuarterTableComponent],
      exports: [DateHeaderComponent, DateTableComponent, DecadeHeaderComponent, DecadeTableComponent, MonthHeaderComponent, MonthTableComponent, YearHeaderComponent, YearTableComponent, QuarterHeaderComponent, QuarterTableComponent]
    }]
  }], null, null);
})();
var _InnerPopupComponent = class _InnerPopupComponent {
  constructor() {
    __publicField(this, "activeDate");
    __publicField(this, "endPanelMode");
    __publicField(this, "panelMode");
    __publicField(this, "showWeek");
    __publicField(this, "locale");
    __publicField(this, "showTimePicker");
    __publicField(this, "timeOptions");
    __publicField(this, "disabledDate");
    __publicField(this, "dateRender");
    __publicField(this, "selectedValue");
    // Range ONLY
    __publicField(this, "hoverValue");
    // Range ONLY
    __publicField(this, "value");
    __publicField(this, "partType");
    __publicField(this, "format");
    __publicField(this, "panelChange", new EventEmitter());
    // TODO: name is not proper
    __publicField(this, "headerChange", new EventEmitter());
    // Emitted when user changed the header's value
    __publicField(this, "selectDate", new EventEmitter());
    // Emitted when the date is selected by click the date panel
    __publicField(this, "selectTime", new EventEmitter());
    __publicField(this, "cellHover", new EventEmitter());
    // Emitted when hover on a day by mouse enter
    __publicField(this, "prefixCls", PREFIX_CLASS);
  }
  /**
   * Hide "next" arrow in left panel,
   * hide "prev" arrow in right panel
   *
   * @param direction
   * @param panelMode
   */
  enablePrevNext(direction, panelMode) {
    return !(!this.showTimePicker && panelMode === this.endPanelMode && (this.partType === "left" && direction === "next" || this.partType === "right" && direction === "prev"));
  }
  onLeave() {
    this.cellHover.emit(null);
  }
  onSelectTime(date) {
    this.selectTime.emit(new CandyDate(date));
  }
  // The value real changed to outside
  onSelectDate(date) {
    const value = date instanceof CandyDate ? date : new CandyDate(date);
    const timeValue = this.timeOptions && this.timeOptions.nzDefaultOpenValue;
    if (!this.value && timeValue) {
      value.setHms(timeValue.getHours(), timeValue.getMinutes(), timeValue.getSeconds());
    }
    this.selectDate.emit(value);
  }
  onChooseMonth(value) {
    this.activeDate = this.activeDate.setMonth(value.getMonth());
    if (this.endPanelMode === "month") {
      this.value = value;
      this.selectDate.emit(value);
    } else {
      this.headerChange.emit(value);
      this.panelChange.emit({
        mode: this.endPanelMode,
        date: value.nativeDate
      });
    }
  }
  onChooseQuarter(value) {
    this.activeDate = this.activeDate.setQuarter(value.getQuarter());
    this.value = value;
    this.selectDate.emit(value);
  }
  onChooseYear(value) {
    this.activeDate = this.activeDate.setYear(value.getYear());
    if (this.endPanelMode === "year") {
      this.value = value;
      this.selectDate.emit(value);
    } else {
      this.headerChange.emit(value);
      this.panelChange.emit({
        mode: this.endPanelMode,
        date: value.nativeDate
      });
    }
  }
  onChooseDecade(value) {
    this.activeDate = this.activeDate.setYear(value.getYear());
    if (this.endPanelMode === "decade") {
      this.value = value;
      this.selectDate.emit(value);
    } else {
      this.headerChange.emit(value);
      this.panelChange.emit({
        mode: "year",
        date: value.nativeDate
      });
    }
  }
  ngOnChanges(changes) {
    if (changes.activeDate && !changes.activeDate.currentValue) {
      this.activeDate = new CandyDate();
    }
    if (changes.panelMode && changes.panelMode.currentValue === "time") {
      this.panelMode = "date";
    }
  }
};
__publicField(_InnerPopupComponent, "\u0275fac", function InnerPopupComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _InnerPopupComponent)();
});
__publicField(_InnerPopupComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _InnerPopupComponent,
  selectors: [["inner-popup"]],
  inputs: {
    activeDate: "activeDate",
    endPanelMode: "endPanelMode",
    panelMode: "panelMode",
    showWeek: [2, "showWeek", "showWeek", booleanAttribute],
    locale: "locale",
    showTimePicker: [2, "showTimePicker", "showTimePicker", booleanAttribute],
    timeOptions: "timeOptions",
    disabledDate: "disabledDate",
    dateRender: "dateRender",
    selectedValue: "selectedValue",
    hoverValue: "hoverValue",
    value: "value",
    partType: "partType",
    format: "format"
  },
  outputs: {
    panelChange: "panelChange",
    headerChange: "headerChange",
    selectDate: "selectDate",
    selectTime: "selectTime",
    cellHover: "cellHover"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 8,
  vars: 8,
  consts: [[3, "mouseleave"], [3, "nzInDatePicker", "ngModel", "format", "nzHourStep", "nzMinuteStep", "nzSecondStep", "nzDisabledHours", "nzDisabledMinutes", "nzDisabledSeconds", "nzHideDisabledOptions", "nzDefaultOpenValue", "nzUse12Hours", "nzAddOn"], [3, "valueChange", "panelChange", "value", "locale", "showSuperPreBtn", "showSuperNextBtn", "showNextBtn", "showPreBtn"], [3, "valueChange", "activeDate", "value", "locale", "disabledDate"], [3, "valueChange", "cellHover", "activeDate", "value", "locale", "disabledDate", "selectedValue", "hoverValue"], [3, "valueChange", "cellHover", "value", "activeDate", "locale", "disabledDate", "selectedValue", "hoverValue"], [3, "valueChange", "cellHover", "value", "activeDate", "locale", "disabledDate", "selectedValue", "hoverValue", "cellRender"], [3, "valueChange", "panelChange", "value", "locale", "showSuperPreBtn", "showSuperNextBtn", "showPreBtn", "showNextBtn"], [3, "valueChange", "cellHover", "locale", "showWeek", "value", "activeDate", "disabledDate", "cellRender", "selectedValue", "hoverValue", "canSelectWeek", "format"], [3, "ngModelChange", "nzInDatePicker", "ngModel", "format", "nzHourStep", "nzMinuteStep", "nzSecondStep", "nzDisabledHours", "nzDisabledMinutes", "nzDisabledSeconds", "nzHideDisabledOptions", "nzDefaultOpenValue", "nzUse12Hours", "nzAddOn"]],
  template: function InnerPopupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275listener("mouseleave", function InnerPopupComponent_Template_div_mouseleave_0_listener() {
        return ctx.onLeave();
      });
      \u0275\u0275elementStart(1, "div");
      \u0275\u0275conditionalCreate(2, InnerPopupComponent_Case_2_Template, 3, 13)(3, InnerPopupComponent_Case_3_Template, 3, 15)(4, InnerPopupComponent_Case_4_Template, 3, 15)(5, InnerPopupComponent_Case_5_Template, 3, 16)(6, InnerPopupComponent_Case_6_Template, 3, 19);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(7, InnerPopupComponent_Conditional_7_Template, 1, 13, "nz-time-picker-panel", 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_2_0;
      \u0275\u0275classProp("ant-picker-datetime-panel", ctx.showTimePicker);
      \u0275\u0275advance();
      \u0275\u0275classMap(\u0275\u0275interpolate2("", ctx.prefixCls, "-", ctx.panelMode, "-panel"));
      \u0275\u0275advance();
      \u0275\u0275conditional((tmp_2_0 = ctx.panelMode) === "decade" ? 2 : tmp_2_0 === "year" ? 3 : tmp_2_0 === "month" ? 4 : tmp_2_0 === "quarter" ? 5 : 6);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.showTimePicker && ctx.timeOptions ? 7 : -1);
    }
  },
  dependencies: [LibPackerModule, DateHeaderComponent, DateTableComponent, DecadeHeaderComponent, DecadeTableComponent, MonthHeaderComponent, MonthTableComponent, YearHeaderComponent, YearTableComponent, QuarterHeaderComponent, QuarterTableComponent, NzTimePickerModule, NzTimePickerPanelComponent, FormsModule, NgControlStatus, NgModel],
  encapsulation: 2,
  changeDetection: 0
}));
var InnerPopupComponent = _InnerPopupComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InnerPopupComponent, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "inner-popup",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <div (mouseleave)="onLeave()" [class.ant-picker-datetime-panel]="showTimePicker">
      <div class="{{ prefixCls }}-{{ panelMode }}-panel">
        @switch (panelMode) {
          @case ('decade') {
            <decade-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'decade')"
              [showSuperNextBtn]="enablePrevNext('next', 'decade')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <decade-table
                [activeDate]="activeDate"
                [value]="value"
                [locale]="locale"
                (valueChange)="onChooseDecade($event)"
                [disabledDate]="disabledDate"
              />
            </div>
          }
          @case ('year') {
            <year-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'year')"
              [showSuperNextBtn]="enablePrevNext('next', 'year')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <year-table
                [activeDate]="activeDate"
                [value]="value"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseYear($event)"
                (cellHover)="cellHover.emit($event)"
              />
            </div>
          }
          @case ('month') {
            <month-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'month')"
              [showSuperNextBtn]="enablePrevNext('next', 'month')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <month-table
                [value]="value"
                [activeDate]="activeDate"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseMonth($event)"
                (cellHover)="cellHover.emit($event)"
              />
            </div>
          }
          @case ('quarter') {
            <quarter-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="enablePrevNext('prev', 'month')"
              [showSuperNextBtn]="enablePrevNext('next', 'month')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <quarter-table
                [value]="value"
                [activeDate]="activeDate"
                [locale]="locale"
                [disabledDate]="disabledDate"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (valueChange)="onChooseQuarter($event)"
                (cellHover)="cellHover.emit($event)"
                [cellRender]="dateRender"
              />
            </div>
          }
          @default {
            <date-header
              [(value)]="activeDate"
              [locale]="locale"
              [showSuperPreBtn]="panelMode === 'week' ? enablePrevNext('prev', 'week') : enablePrevNext('prev', 'date')"
              [showSuperNextBtn]="
                panelMode === 'week' ? enablePrevNext('next', 'week') : enablePrevNext('next', 'date')
              "
              [showPreBtn]="panelMode === 'week' ? enablePrevNext('prev', 'week') : enablePrevNext('prev', 'date')"
              [showNextBtn]="panelMode === 'week' ? enablePrevNext('next', 'week') : enablePrevNext('next', 'date')"
              (panelChange)="panelChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            />
            <div class="{{ prefixCls }}-body">
              <date-table
                [locale]="locale"
                [showWeek]="showWeek"
                [value]="value"
                [activeDate]="activeDate"
                [disabledDate]="disabledDate"
                [cellRender]="dateRender"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                [canSelectWeek]="panelMode === 'week'"
                [format]="format"
                (valueChange)="onSelectDate($event)"
                (cellHover)="cellHover.emit($event)"
              />
            </div>
          }
        }
      </div>
      @if (showTimePicker && timeOptions) {
        <nz-time-picker-panel
          [nzInDatePicker]="true"
          [ngModel]="value?.nativeDate"
          (ngModelChange)="onSelectTime($event)"
          [format]="$any(timeOptions.nzFormat)"
          [nzHourStep]="$any(timeOptions.nzHourStep)"
          [nzMinuteStep]="$any(timeOptions.nzMinuteStep)"
          [nzSecondStep]="$any(timeOptions.nzSecondStep)"
          [nzDisabledHours]="$any(timeOptions.nzDisabledHours)"
          [nzDisabledMinutes]="$any(timeOptions.nzDisabledMinutes)"
          [nzDisabledSeconds]="$any(timeOptions.nzDisabledSeconds)"
          [nzHideDisabledOptions]="!!timeOptions.nzHideDisabledOptions"
          [nzDefaultOpenValue]="$any(timeOptions.nzDefaultOpenValue)"
          [nzUse12Hours]="!!timeOptions.nzUse12Hours"
          [nzAddOn]="$any(timeOptions.nzAddOn)"
        />
      }
    </div>
  `,
      imports: [LibPackerModule, NzTimePickerModule, FormsModule]
    }]
  }], null, {
    activeDate: [{
      type: Input
    }],
    endPanelMode: [{
      type: Input
    }],
    panelMode: [{
      type: Input
    }],
    showWeek: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    locale: [{
      type: Input
    }],
    showTimePicker: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    timeOptions: [{
      type: Input
    }],
    disabledDate: [{
      type: Input
    }],
    dateRender: [{
      type: Input
    }],
    selectedValue: [{
      type: Input
    }],
    hoverValue: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    partType: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    panelChange: [{
      type: Output
    }],
    headerChange: [{
      type: Output
    }],
    selectDate: [{
      type: Output
    }],
    selectTime: [{
      type: Output
    }],
    cellHover: [{
      type: Output
    }]
  });
})();
var _DateRangePopupComponent = class _DateRangePopupComponent {
  constructor() {
    __publicField(this, "datePickerService", inject(DatePickerService));
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "host", inject(ElementRef));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "isRange");
    __publicField(this, "inline", false);
    __publicField(this, "showWeek");
    __publicField(this, "locale");
    __publicField(this, "disabledDate");
    __publicField(this, "disabledTime");
    // This will lead to rebuild time options
    __publicField(this, "showToday");
    __publicField(this, "showNow");
    __publicField(this, "showTime");
    __publicField(this, "extraFooter");
    __publicField(this, "ranges");
    __publicField(this, "dateRender");
    __publicField(this, "panelMode");
    __publicField(this, "defaultPickerValue");
    __publicField(this, "dir", "ltr");
    __publicField(this, "format");
    __publicField(this, "panelModeChange", new EventEmitter());
    __publicField(this, "calendarChange", new EventEmitter());
    __publicField(this, "resultOk", new EventEmitter());
    // Emitted when done with date selecting
    __publicField(this, "prefixCls", PREFIX_CLASS);
    __publicField(this, "endPanelMode", "date");
    __publicField(this, "timeOptions", null);
    __publicField(this, "hoverValue", []);
    // Range ONLY
    __publicField(this, "checkedPartArr", [false, false]);
    __publicField(this, "disabledStartTime", (value) => this.disabledTime && this.disabledTime(value, "start"));
    __publicField(this, "disabledEndTime", (value) => this.disabledTime && this.disabledTime(value, "end"));
  }
  get hasTimePicker() {
    return !!this.showTime;
  }
  get hasFooter() {
    return this.showToday || this.hasTimePicker || !!this.extraFooter || !!this.ranges;
  }
  get arrowPosition() {
    var _a, _b;
    return this.dir === "rtl" ? {
      right: `${(_a = this.datePickerService) == null ? void 0 : _a.arrowLeft}px`
    } : {
      left: `${(_b = this.datePickerService) == null ? void 0 : _b.arrowLeft}px`
    };
  }
  ngOnInit() {
    merge(this.datePickerService.valueChange$, this.datePickerService.inputPartChange$).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.updateActiveDate();
      this.cdr.markForCheck();
    });
    fromEventOutsideAngular(this.host.nativeElement, "mousedown").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => event.preventDefault());
  }
  ngOnChanges(changes) {
    if (changes.showTime || changes.disabledTime) {
      if (this.showTime) {
        this.buildTimeOptions();
      }
    }
    if (changes.panelMode) {
      this.endPanelMode = this.panelMode;
    }
    if (changes.defaultPickerValue) {
      this.updateActiveDate();
    }
  }
  updateActiveDate() {
    const activeDate = this.datePickerService.hasValue() ? this.datePickerService.value : this.datePickerService.makeValue(this.defaultPickerValue);
    this.datePickerService.setActiveDate(activeDate, this.hasTimePicker, this.getPanelMode(this.endPanelMode));
  }
  onClickOk() {
    const inputIndex = {
      left: 0,
      right: 1
    }[this.datePickerService.activeInput];
    const value = this.isRange ? this.datePickerService.value[inputIndex] : this.datePickerService.value;
    this.changeValueFromSelect(value);
    this.resultOk.emit();
  }
  onClickToday(value) {
    this.changeValueFromSelect(value, !this.showTime);
  }
  onCellHover(value) {
    if (!this.isRange) {
      return;
    }
    if (value === null) {
      this.hoverValue = [];
      return;
    }
    const otherInputIndex = {
      left: 1,
      right: 0
    }[this.datePickerService.activeInput];
    const base = this.datePickerService.value[otherInputIndex];
    if (base) {
      if (base.isBeforeDay(value)) {
        this.hoverValue = [base, value];
      } else {
        this.hoverValue = [value, base];
      }
    }
  }
  onPanelModeChange(panelChangeEvent, partType) {
    if (this.isRange) {
      const index = this.datePickerService.getActiveIndex(partType);
      if (index === 0) {
        this.panelMode = [panelChangeEvent.mode, this.panelMode[1]];
      } else {
        this.panelMode = [this.panelMode[0], panelChangeEvent.mode];
      }
      this.panelModeChange.emit({
        mode: this.panelMode,
        date: this.datePickerService.activeDate.map((d) => d.nativeDate)
      });
    } else {
      this.panelMode = panelChangeEvent.mode;
      this.panelModeChange.emit({
        mode: this.panelMode,
        date: panelChangeEvent.date
      });
    }
  }
  onActiveDateChange(value, partType) {
    if (this.isRange) {
      const activeDate = [];
      activeDate[this.datePickerService.getActiveIndex(partType)] = value;
      this.datePickerService.setActiveDate(activeDate, this.hasTimePicker, this.getPanelMode(this.endPanelMode, partType));
    } else {
      this.datePickerService.setActiveDate(value);
    }
  }
  onSelectTime(value, partType) {
    if (this.isRange) {
      const newValue = cloneDate(this.datePickerService.value);
      const index = this.datePickerService.getActiveIndex(partType);
      newValue[index] = this.overrideHms(value, newValue[index]);
      this.datePickerService.setValue(newValue);
    } else {
      const newValue = this.overrideHms(value, this.datePickerService.value);
      this.datePickerService.setValue(newValue);
    }
    this.datePickerService.inputPartChange$.next(null);
    this.buildTimeOptions();
  }
  changeValueFromSelect(value, emitValue = true) {
    if (this.isRange) {
      const selectedValue = cloneDate(this.datePickerService.value);
      const checkedPart = this.datePickerService.activeInput;
      let nextPart = checkedPart;
      selectedValue[this.datePickerService.getActiveIndex(checkedPart)] = value;
      this.checkedPartArr[this.datePickerService.getActiveIndex(checkedPart)] = true;
      this.hoverValue = selectedValue;
      if (emitValue) {
        if (this.inline) {
          nextPart = this.reversedPart(checkedPart);
          if (nextPart === "right") {
            selectedValue[this.datePickerService.getActiveIndex(nextPart)] = null;
            this.checkedPartArr[this.datePickerService.getActiveIndex(nextPart)] = false;
          }
          this.datePickerService.setValue(selectedValue);
          this.calendarChange.emit(selectedValue);
          if (this.isBothAllowed(selectedValue) && this.checkedPartArr[0] && this.checkedPartArr[1]) {
            this.clearHoverValue();
            this.datePickerService.emitValue$.next();
          }
        } else {
          if (wrongSortOrder(selectedValue)) {
            selectedValue.reverse();
          }
          this.datePickerService.setValue(selectedValue);
          if (this.isBothAllowed(selectedValue) && this.checkedPartArr[0] && this.checkedPartArr[1]) {
            this.calendarChange.emit(selectedValue);
            this.clearHoverValue();
            this.datePickerService.emitValue$.next();
          } else if (this.isAllowed(selectedValue)) {
            nextPart = this.reversedPart(checkedPart);
            this.calendarChange.emit([value.clone()]);
          }
        }
      } else {
        this.datePickerService.setValue(selectedValue);
      }
      this.datePickerService.inputPartChange$.next(nextPart);
    } else {
      this.datePickerService.setValue(value);
      this.datePickerService.inputPartChange$.next(null);
      if (emitValue && this.isAllowed(value)) {
        this.datePickerService.emitValue$.next();
      }
    }
    this.buildTimeOptions();
  }
  reversedPart(part) {
    return part === "left" ? "right" : "left";
  }
  getPanelMode(panelMode, partType) {
    if (this.isRange) {
      return panelMode[this.datePickerService.getActiveIndex(partType)];
    } else {
      return panelMode;
    }
  }
  // Get single value or part value of a range
  getValue(partType) {
    if (this.isRange) {
      return (this.datePickerService.value || [])[this.datePickerService.getActiveIndex(partType)];
    } else {
      return this.datePickerService.value;
    }
  }
  getActiveDate(partType) {
    if (this.isRange) {
      return this.datePickerService.activeDate[this.datePickerService.getActiveIndex(partType)];
    } else {
      return this.datePickerService.activeDate;
    }
  }
  isOneAllowed(selectedValue) {
    const index = this.datePickerService.getActiveIndex();
    const disabledTimeArr = [this.disabledStartTime, this.disabledEndTime];
    return isAllowedDate(selectedValue[index], this.disabledDate, disabledTimeArr[index]);
  }
  isBothAllowed(selectedValue) {
    return isAllowedDate(selectedValue[0], this.disabledDate, this.disabledStartTime) && isAllowedDate(selectedValue[1], this.disabledDate, this.disabledEndTime);
  }
  isAllowed(value, isBoth = false) {
    if (this.isRange) {
      return isBoth ? this.isBothAllowed(value) : this.isOneAllowed(value);
    } else {
      return isAllowedDate(value, this.disabledDate, this.disabledTime);
    }
  }
  getTimeOptions(partType) {
    if (this.showTime && this.timeOptions) {
      return this.timeOptions instanceof Array ? this.timeOptions[this.datePickerService.getActiveIndex(partType)] : this.timeOptions;
    }
    return null;
  }
  onClickPresetRange(val) {
    const value = typeof val === "function" ? val() : val;
    if (value) {
      this.datePickerService.setValue([new CandyDate(value[0]), new CandyDate(value[1])]);
      this.datePickerService.emitValue$.next();
    }
  }
  onPresetRangeMouseLeave() {
    this.clearHoverValue();
  }
  onHoverPresetRange(val) {
    if (typeof val !== "function") {
      this.hoverValue = [new CandyDate(val[0]), new CandyDate(val[1])];
    }
  }
  getObjectKeys(obj) {
    return obj ? Object.keys(obj) : [];
  }
  show(partType) {
    const hide = this.showTime && this.isRange && this.datePickerService.activeInput !== partType;
    return !hide;
  }
  clearHoverValue() {
    this.hoverValue = [];
  }
  buildTimeOptions() {
    if (this.showTime) {
      const showTime = typeof this.showTime === "object" ? this.showTime : {};
      if (this.isRange) {
        const value = this.datePickerService.value;
        this.timeOptions = [this.overrideTimeOptions(showTime, value[0], "start"), this.overrideTimeOptions(showTime, value[1], "end")];
      } else {
        this.timeOptions = this.overrideTimeOptions(showTime, this.datePickerService.value);
      }
    } else {
      this.timeOptions = null;
    }
  }
  overrideTimeOptions(origin, value, partial) {
    let disabledTimeFn;
    if (partial) {
      disabledTimeFn = partial === "start" ? this.disabledStartTime : this.disabledEndTime;
    } else {
      disabledTimeFn = this.disabledTime;
    }
    return __spreadValues(__spreadValues({}, origin), getTimeConfig(value, disabledTimeFn));
  }
  overrideHms(newValue, oldValue) {
    newValue = newValue || new CandyDate();
    oldValue = oldValue || new CandyDate();
    return oldValue.setHms(newValue.getHours(), newValue.getMinutes(), newValue.getSeconds());
  }
};
__publicField(_DateRangePopupComponent, "\u0275fac", function DateRangePopupComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DateRangePopupComponent)();
});
__publicField(_DateRangePopupComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _DateRangePopupComponent,
  selectors: [["date-range-popup"]],
  inputs: {
    isRange: [2, "isRange", "isRange", booleanAttribute],
    inline: [2, "inline", "inline", booleanAttribute],
    showWeek: [2, "showWeek", "showWeek", booleanAttribute],
    locale: "locale",
    disabledDate: "disabledDate",
    disabledTime: "disabledTime",
    showToday: [2, "showToday", "showToday", booleanAttribute],
    showNow: [2, "showNow", "showNow", booleanAttribute],
    showTime: "showTime",
    extraFooter: "extraFooter",
    ranges: "ranges",
    dateRender: "dateRender",
    panelMode: "panelMode",
    defaultPickerValue: "defaultPickerValue",
    dir: "dir",
    format: "format"
  },
  outputs: {
    panelModeChange: "panelModeChange",
    calendarChange: "calendarChange",
    resultOk: "resultOk"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 8,
  vars: 1,
  consts: [["tplInnerPopup", ""], ["tplFooter", ""], ["tplRangeQuickSelector", ""], [3, "class"], [4, "ngTemplateOutlet"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["tabindex", "-1"], [3, "panelChange", "cellHover", "selectDate", "selectTime", "headerChange", "showWeek", "endPanelMode", "partType", "locale", "showTimePicker", "timeOptions", "panelMode", "activeDate", "value", "disabledDate", "dateRender", "selectedValue", "hoverValue", "format"], [3, "locale", "isRange", "showToday", "showNow", "hasTimePicker", "okDisabled", "extraFooter", "rangeQuickSelector"], [3, "clickOk", "clickToday", "locale", "isRange", "showToday", "showNow", "hasTimePicker", "okDisabled", "extraFooter", "rangeQuickSelector"], [3, "click", "mouseenter", "mouseleave"], [1, "ant-tag", "ant-tag-blue"]],
  template: function DateRangePopupComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, DateRangePopupComponent_Conditional_0_Template, 7, 18, "div", 3)(1, DateRangePopupComponent_Conditional_1_Template, 4, 13, "div", 3);
      \u0275\u0275template(2, DateRangePopupComponent_ng_template_2_Template, 2, 19, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(4, DateRangePopupComponent_ng_template_4_Template, 1, 1, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(6, DateRangePopupComponent_ng_template_6_Template, 2, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.isRange ? 0 : 1);
    }
  },
  dependencies: [InnerPopupComponent, NgTemplateOutlet, CalendarFooterComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var DateRangePopupComponent = _DateRangePopupComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DateRangePopupComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "date-range-popup",
      template: `
    @if (isRange) {
      <div class="{{ prefixCls }}-range-wrapper {{ prefixCls }}-date-range-wrapper">
        <div class="{{ prefixCls }}-range-arrow" [style]="arrowPosition"></div>
        <div class="{{ prefixCls }}-panel-container {{ showWeek ? prefixCls + '-week-number' : '' }}">
          <div class="{{ prefixCls }}-panels">
            @if (hasTimePicker) {
              <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: datePickerService.activeInput }" />
            } @else {
              <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: 'left' }" />
              <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: 'right' }" />
            }
          </div>
          <ng-container *ngTemplateOutlet="tplFooter" />
        </div>
      </div>
    } @else {
      <div
        class="{{ prefixCls }}-panel-container {{ showWeek ? prefixCls + '-week-number' : '' }} {{
          hasTimePicker ? prefixCls + '-time' : ''
        }} {{ isRange ? prefixCls + '-range' : '' }}"
      >
        <div class="{{ prefixCls }}-panel" [class.ant-picker-panel-rtl]="dir === 'rtl'" tabindex="-1">
          <!-- Single ONLY -->
          <ng-container *ngTemplateOutlet="tplInnerPopup" />
          <ng-container *ngTemplateOutlet="tplFooter" />
        </div>
      </div>
    }

    <ng-template #tplInnerPopup let-partType="partType">
      <div class="{{ prefixCls }}-panel" [class.ant-picker-panel-rtl]="dir === 'rtl'">
        <!-- TODO(@wenqi73) [selectedValue] [hoverValue] types-->
        <inner-popup
          [showWeek]="showWeek"
          [endPanelMode]="getPanelMode(endPanelMode, partType)"
          [partType]="partType"
          [locale]="locale!"
          [showTimePicker]="hasTimePicker"
          [timeOptions]="getTimeOptions(partType)"
          [panelMode]="getPanelMode(panelMode, partType)"
          (panelChange)="onPanelModeChange($event, partType)"
          [activeDate]="getActiveDate(partType)"
          [value]="getValue(partType)"
          [disabledDate]="disabledDate"
          [dateRender]="dateRender"
          [selectedValue]="$any(datePickerService?.value)"
          [hoverValue]="$any(hoverValue)"
          [format]="format"
          (cellHover)="onCellHover($event)"
          (selectDate)="changeValueFromSelect($event, !showTime)"
          (selectTime)="onSelectTime($event, partType)"
          (headerChange)="onActiveDateChange($event, partType)"
        />
      </div>
    </ng-template>

    <ng-template #tplFooter>
      @if (hasFooter) {
        <calendar-footer
          [locale]="locale!"
          [isRange]="isRange"
          [showToday]="showToday"
          [showNow]="showNow"
          [hasTimePicker]="hasTimePicker"
          [okDisabled]="!isAllowed($any(datePickerService?.value))"
          [extraFooter]="extraFooter"
          [rangeQuickSelector]="ranges ? tplRangeQuickSelector : null"
          (clickOk)="onClickOk()"
          (clickToday)="onClickToday($event)"
        />
      }
    </ng-template>

    <!-- Range ONLY: Range Quick Selector -->
    <ng-template #tplRangeQuickSelector>
      @for (name of getObjectKeys(ranges); track name) {
        <li
          class="{{ prefixCls }}-preset"
          (click)="onClickPresetRange(ranges![name])"
          (mouseenter)="onHoverPresetRange(ranges![name])"
          (mouseleave)="onPresetRangeMouseLeave()"
        >
          <span class="ant-tag ant-tag-blue">{{ name }}</span>
        </li>
      }
    </ng-template>
  `,
      imports: [InnerPopupComponent, NgTemplateOutlet, CalendarFooterComponent]
    }]
  }], null, {
    isRange: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    inline: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showWeek: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    locale: [{
      type: Input
    }],
    disabledDate: [{
      type: Input
    }],
    disabledTime: [{
      type: Input
    }],
    showToday: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showNow: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showTime: [{
      type: Input
    }],
    extraFooter: [{
      type: Input
    }],
    ranges: [{
      type: Input
    }],
    dateRender: [{
      type: Input
    }],
    panelMode: [{
      type: Input
    }],
    defaultPickerValue: [{
      type: Input
    }],
    dir: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    panelModeChange: [{
      type: Output
    }],
    calendarChange: [{
      type: Output
    }],
    resultOk: [{
      type: Output
    }]
  });
})();
var POPUP_STYLE_PATCH = {
  position: "relative"
};
var NZ_CONFIG_MODULE_NAME2 = "datePicker";
var NzDatePickerComponent = (() => {
  var _a;
  let _nzVariant_decorators;
  let _nzVariant_initializers = [];
  let _nzVariant_extraInitializers = [];
  let _nzSeparator_decorators;
  let _nzSeparator_initializers = [];
  let _nzSeparator_extraInitializers = [];
  let _nzSuffixIcon_decorators;
  let _nzSuffixIcon_initializers = [];
  let _nzSuffixIcon_extraInitializers = [];
  let _nzBackdrop_decorators;
  let _nzBackdrop_initializers = [];
  let _nzBackdrop_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "nzConfigService", inject(NzConfigService));
      __publicField(this, "datePickerService", inject(DatePickerService));
      __publicField(this, "i18n", inject(NzI18nService));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "renderer", inject(Renderer2));
      __publicField(this, "elementRef", inject(ElementRef));
      __publicField(this, "dateHelper", inject(DateHelperService));
      __publicField(this, "nzResizeObserver", inject(NzResizeObserver));
      __publicField(this, "platform", inject(Platform));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "dir", inject(Directionality).valueSignal);
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME2);
      __publicField(this, "isRange", false);
      // Indicate whether the value is a range value
      __publicField(this, "extraFooter");
      // status
      __publicField(this, "statusCls", {});
      __publicField(this, "status", "");
      __publicField(this, "hasFeedback", false);
      __publicField(this, "panelMode", "date");
      __publicField(this, "isCustomPlaceHolder", false);
      __publicField(this, "isCustomFormat", false);
      __publicField(this, "showTime", false);
      __publicField(this, "isNzDisableFirstChange", true);
      // --- Common API
      __publicField(this, "nzInline", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
        debugName: "nzInline"
      } : {}), {
        transform: booleanAttribute
      })));
      __publicField(this, "nzAllowClear", true);
      __publicField(this, "nzAutoFocus", false);
      __publicField(this, "nzDisabled", false);
      __publicField(this, "nzInputReadOnly", false);
      __publicField(this, "nzOpen");
      __publicField(this, "nzDisabledDate");
      __publicField(this, "nzLocale");
      __publicField(this, "nzPlaceHolder", "");
      __publicField(this, "nzPopupStyle", POPUP_STYLE_PATCH);
      __publicField(this, "nzDropdownClassName", input(...ngDevMode ? [void 0, {
        debugName: "nzDropdownClassName"
      }] : []));
      __publicField(this, "nzSize", "default");
      __publicField(this, "nzStatus", "");
      __publicField(this, "nzFormat");
      __publicField(this, "nzVariant", __runInitializers(this, _nzVariant_initializers, void 0));
      __publicField(this, "nzDateRender", __runInitializers(this, _nzVariant_extraInitializers));
      __publicField(this, "nzDisabledTime");
      __publicField(this, "nzRenderExtraFooter");
      __publicField(this, "nzShowToday", true);
      __publicField(this, "nzMode", "date");
      __publicField(this, "nzShowNow", true);
      __publicField(this, "nzRanges");
      __publicField(this, "nzDefaultPickerValue", null);
      __publicField(this, "nzSeparator", __runInitializers(this, _nzSeparator_initializers, void 0));
      __publicField(this, "nzSuffixIcon", (__runInitializers(this, _nzSeparator_extraInitializers), __runInitializers(this, _nzSuffixIcon_initializers, "calendar")));
      __publicField(this, "nzBackdrop", (__runInitializers(this, _nzSuffixIcon_extraInitializers), __runInitializers(this, _nzBackdrop_initializers, false)));
      __publicField(this, "nzId", (__runInitializers(this, _nzBackdrop_extraInitializers), null));
      __publicField(this, "nzPlacement", "bottomLeft");
      __publicField(this, "nzShowWeekNumber", false);
      __publicField(this, "nzOnPanelChange", new EventEmitter());
      __publicField(this, "nzOnCalendarChange", new EventEmitter());
      __publicField(this, "nzOnOk", new EventEmitter());
      __publicField(this, "nzOnOpenChange", new EventEmitter());
      // ------------------------------------------------------------------------
      // Input API Start
      // ------------------------------------------------------------------------
      __publicField(this, "cdkConnectedOverlay");
      __publicField(this, "panel");
      __publicField(this, "separatorElement");
      __publicField(this, "pickerInput");
      __publicField(this, "rangePickerInputs");
      __publicField(this, "inputSize", 12);
      __publicField(this, "inputWidth");
      __publicField(this, "prefixCls", PREFIX_CLASS);
      __publicField(this, "inputValue");
      __publicField(this, "activeBarStyle", {});
      __publicField(this, "overlayOpen", false);
      // Available when "nzOpen" = undefined
      __publicField(this, "overlayPositions", [...DEFAULT_DATE_PICKER_POSITIONS]);
      __publicField(this, "currentPosition", signal({
        originX: "start",
        originY: "bottom"
      }, ...ngDevMode ? [{
        debugName: "currentPosition"
      }] : []));
      __publicField(this, "datepickerAnimationEnter", slideAnimationEnter());
      __publicField(this, "datepickerAnimationLeave", slideAnimationLeave());
      __publicField(this, "dropdownClass", computed(() => {
        const cls = [];
        if (!this.nzInline()) {
          cls.push(this.generateClass("dropdown"));
          const customCls = this.nzDropdownClassName();
          if (customCls) {
            cls.push(customCls);
          }
          const {
            originX,
            originY
          } = this.currentPosition();
          if (originX === "start" && originY === "bottom") {
            cls.push(this.generateClass("dropdown-placement-bottomLeft"));
          } else if (originX === "start" && originY === "top") {
            cls.push(this.generateClass("dropdown-placement-topLeft"));
          } else if (originX === "end" && originY === "bottom") {
            cls.push(this.generateClass("dropdown-placement-bottomRight"));
          } else if (originX === "end" && originY === "top") {
            cls.push(this.generateClass("dropdown-placement-topRight"));
          }
          if (this.dir() === "rtl") {
            cls.push(this.generateClass("dropdown-rtl"));
          }
        }
        return cls;
      }, ...ngDevMode ? [{
        debugName: "dropdownClass"
      }] : []));
      __publicField(this, "finalSize", computed(() => {
        var _a2;
        if ((_a2 = this.formSize) == null ? void 0 : _a2.call(this)) {
          return this.formSize();
        }
        if (this.compactSize) {
          return this.compactSize();
        }
        return this.size();
      }, ...ngDevMode ? [{
        debugName: "finalSize"
      }] : []));
      __publicField(this, "finalVariant", computed(() => {
        var _a2;
        return this.variant() || ((_a2 = this.formVariant) == null ? void 0 : _a2.call(this)) || "outlined";
      }, ...ngDevMode ? [{
        debugName: "finalVariant"
      }] : []));
      __publicField(this, "size", signal(this.nzSize, ...ngDevMode ? [{
        debugName: "size"
      }] : []));
      __publicField(this, "variant", signal(this.nzVariant, ...ngDevMode ? [{
        debugName: "variant"
      }] : []));
      __publicField(this, "formSize", inject(NZ_FORM_SIZE, {
        optional: true
      }));
      __publicField(this, "formVariant", inject(NZ_FORM_VARIANT, {
        optional: true
      }));
      __publicField(this, "compactSize", inject(NZ_SPACE_COMPACT_SIZE, {
        optional: true
      }));
      __publicField(this, "document", inject(DOCUMENT));
      __publicField(this, "nzFormStatusService", inject(NzFormStatusService, {
        optional: true
      }));
      __publicField(this, "nzFormNoStatusService", inject(NzFormNoStatusService, {
        optional: true
      }));
      // ------------------------------------------------------------------------
      // | Control value accessor implements
      // ------------------------------------------------------------------------
      // NOTE: onChangeFn/onTouchedFn will not be assigned if user not use as ngModel
      __publicField(this, "onChangeFn", () => void 0);
      __publicField(this, "onTouchedFn", () => void 0);
    }
    get nzShowTime() {
      return this.showTime;
    }
    set nzShowTime(value) {
      this.showTime = typeof value === "object" ? value : toBoolean(value);
    }
    get origin() {
      return this.elementRef;
    }
    get realOpenState() {
      return this.isOpenHandledByUser() ? !!this.nzOpen : this.overlayOpen;
    }
    ngAfterViewInit() {
      if (this.nzAutoFocus) {
        this.focus();
      }
      if (this.isRange && this.platform.isBrowser) {
        this.nzResizeObserver.observe(this.elementRef).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.updateInputWidthAndArrowLeft();
        });
      }
      this.datePickerService.inputPartChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((partType) => {
        if (partType) {
          this.datePickerService.activeInput = partType;
        }
        this.focus();
        this.updateInputWidthAndArrowLeft();
      });
      if (this.platform.isBrowser) {
        fromEventOutsideAngular(this.elementRef.nativeElement, "mousedown").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
          if (event.target.tagName.toLowerCase() !== "input") {
            event.preventDefault();
          }
        });
      }
    }
    updateInputWidthAndArrowLeft() {
      var _a2, _b, _c;
      this.inputWidth = ((_b = (_a2 = this.rangePickerInputs) == null ? void 0 : _a2.first) == null ? void 0 : _b.nativeElement.offsetWidth) || 0;
      const baseStyle = {
        position: "absolute",
        width: `${this.inputWidth}px`
      };
      this.datePickerService.arrowLeft = this.datePickerService.activeInput === "left" ? 0 : this.inputWidth + ((_c = this.separatorElement) == null ? void 0 : _c.nativeElement.offsetWidth) || 0;
      if (this.dir() === "rtl") {
        this.activeBarStyle = __spreadProps(__spreadValues({}, baseStyle), {
          right: `${this.datePickerService.arrowLeft}px`
        });
      } else {
        this.activeBarStyle = __spreadProps(__spreadValues({}, baseStyle), {
          left: `${this.datePickerService.arrowLeft}px`
        });
      }
      this.cdr.markForCheck();
    }
    getInput(partType) {
      var _a2, _b;
      if (this.nzInline()) {
        return void 0;
      }
      return this.isRange ? partType === "left" ? (_a2 = this.rangePickerInputs) == null ? void 0 : _a2.first.nativeElement : (_b = this.rangePickerInputs) == null ? void 0 : _b.last.nativeElement : this.pickerInput.nativeElement;
    }
    focus() {
      const activeInputElement = this.getInput(this.datePickerService.activeInput);
      if (this.document.activeElement !== activeInputElement) {
        activeInputElement == null ? void 0 : activeInputElement.focus();
      }
    }
    onFocus(event, partType) {
      event.preventDefault();
      if (partType) {
        this.datePickerService.inputPartChange$.next(partType);
      }
      this.renderClass(true);
    }
    // blur event has not the relatedTarget in IE11, use focusout instead.
    onFocusout(event) {
      event.preventDefault();
      this.onTouchedFn();
      if (!this.elementRef.nativeElement.contains(event.relatedTarget)) {
        this.checkAndClose();
      }
      this.renderClass(false);
    }
    // Show overlay content
    open() {
      if (this.nzInline()) {
        return;
      }
      if (!this.realOpenState && !this.nzDisabled) {
        this.updateInputWidthAndArrowLeft();
        this.overlayOpen = true;
        this.nzOnOpenChange.emit(true);
        this.focus();
        this.cdr.markForCheck();
      }
    }
    close() {
      if (this.nzInline()) {
        return;
      }
      if (this.realOpenState) {
        this.overlayOpen = false;
        this.nzOnOpenChange.emit(false);
      }
    }
    get showClear() {
      return !this.nzDisabled && !this.isEmptyValue(this.datePickerService.value) && this.nzAllowClear;
    }
    checkAndClose() {
      if (!this.realOpenState) {
        return;
      }
      if (this.panel.isAllowed(this.datePickerService.value, true)) {
        if (Array.isArray(this.datePickerService.value) && wrongSortOrder(this.datePickerService.value)) {
          const index = this.datePickerService.getActiveIndex();
          const value = this.datePickerService.value[index];
          this.panel.changeValueFromSelect(value, true);
          return;
        }
        this.updateInputValue();
        this.datePickerService.emitValue$.next();
      } else {
        this.datePickerService.setValue(this.datePickerService.initialValue);
        this.close();
      }
    }
    onClickInputBox(event) {
      event.stopPropagation();
      this.focus();
      if (!this.isOpenHandledByUser()) {
        this.open();
      }
    }
    onOverlayKeydown(event) {
      if (event.keyCode === ESCAPE) {
        this.datePickerService.initValue();
      }
    }
    onPositionChange(position) {
      this.currentPosition.set(position.connectionPair);
    }
    onClickClear(event) {
      event.preventDefault();
      event.stopPropagation();
      this.datePickerService.initValue(true);
      this.datePickerService.emitValue$.next();
    }
    updateInputValue() {
      const newValue = this.datePickerService.value;
      if (this.isRange) {
        this.inputValue = newValue ? newValue.map((v) => this.formatValue(v)) : ["", ""];
      } else {
        this.inputValue = this.formatValue(newValue);
      }
      this.cdr.markForCheck();
    }
    formatValue(value) {
      return this.dateHelper.format(value && value.nativeDate, this.nzFormat);
    }
    onInputChange(value, isEnter = false) {
      if (!this.platform.TRIDENT && this.document.activeElement === this.getInput(this.datePickerService.activeInput) && !this.realOpenState) {
        this.open();
        return;
      }
      const date = this.checkValidDate(value);
      if (date && this.realOpenState) {
        this.panel.changeValueFromSelect(date, isEnter);
      }
    }
    onKeyupEnter(event) {
      this.onInputChange(event.target.value, true);
    }
    checkValidDate(value) {
      const date = new CandyDate(this.dateHelper.parseDate(value, this.nzFormat));
      if (!date.isValid() || value !== this.dateHelper.format(date.nativeDate, this.nzFormat)) {
        return null;
      }
      return date;
    }
    getPlaceholder(partType) {
      return this.isRange ? this.nzPlaceHolder[this.datePickerService.getActiveIndex(partType)] : this.nzPlaceHolder;
    }
    isEmptyValue(value) {
      if (value === null) {
        return true;
      } else if (this.isRange) {
        return !value || !Array.isArray(value) || value.every((val) => !val);
      } else {
        return !value;
      }
    }
    // Whether open state is permanently controlled by user himself
    isOpenHandledByUser() {
      return this.nzOpen !== void 0;
    }
    // ------------------------------------------------------------------------
    // Input API End
    // ------------------------------------------------------------------------
    ngOnInit() {
      var _a2;
      (_a2 = this.nzFormStatusService) == null ? void 0 : _a2.formStatusChanges.pipe(distinctUntilChanged((pre, cur) => {
        return pre.status === cur.status && pre.hasFeedback === cur.hasFeedback;
      }), withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : of(false)), map(([{
        status,
        hasFeedback
      }, noStatus]) => ({
        status: noStatus ? "" : status,
        hasFeedback
      })), takeUntilDestroyed(this.destroyRef)).subscribe(({
        status,
        hasFeedback
      }) => {
        this.setStatusStyles(status, hasFeedback);
      });
      if (!this.nzLocale) {
        this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.setLocale());
      }
      this.datePickerService.isRange = this.isRange;
      this.datePickerService.initValue(true);
      this.datePickerService.emitValue$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        var _a3, _b, _c, _d;
        const granularityComparison = this.showTime ? "second" : "day";
        const value = this.datePickerService.value;
        const datePickerPreviousValue = this.datePickerService.initialValue;
        if (!this.isRange && (value == null ? void 0 : value.isSame(datePickerPreviousValue == null ? void 0 : datePickerPreviousValue.nativeDate, granularityComparison))) {
          this.onTouchedFn();
          return this.close();
        }
        if (this.isRange) {
          const [previousStartDate, previousEndDate] = datePickerPreviousValue;
          const [currentStartDate, currentEndDate] = value;
          if ((previousStartDate == null ? void 0 : previousStartDate.isSame(currentStartDate == null ? void 0 : currentStartDate.nativeDate, granularityComparison)) && (previousEndDate == null ? void 0 : previousEndDate.isSame(currentEndDate == null ? void 0 : currentEndDate.nativeDate, granularityComparison))) {
            this.onTouchedFn();
            return this.close();
          }
        }
        this.datePickerService.initialValue = cloneDate(value);
        if (this.isRange) {
          const vAsRange = value;
          if (vAsRange.length) {
            this.onChangeFn([(_b = (_a3 = vAsRange[0]) == null ? void 0 : _a3.nativeDate) != null ? _b : null, (_d = (_c = vAsRange[1]) == null ? void 0 : _c.nativeDate) != null ? _d : null]);
          } else {
            this.onChangeFn([]);
          }
        } else {
          if (value) {
            this.onChangeFn(value.nativeDate);
          } else {
            this.onChangeFn(null);
          }
        }
        this.onTouchedFn();
        this.close();
      });
      this.inputValue = this.isRange ? ["", ""] : "";
      this.setModeAndFormat();
      this.datePickerService.valueChange$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.updateInputValue();
      });
    }
    ngOnChanges({
      nzStatus,
      nzPlacement,
      nzPopupStyle,
      nzPlaceHolder,
      nzLocale,
      nzFormat,
      nzRenderExtraFooter,
      nzMode,
      nzSize,
      nzVariant
    }) {
      if (nzPopupStyle) {
        this.nzPopupStyle = this.nzPopupStyle ? __spreadValues(__spreadValues({}, this.nzPopupStyle), POPUP_STYLE_PATCH) : POPUP_STYLE_PATCH;
      }
      if (nzPlaceHolder == null ? void 0 : nzPlaceHolder.currentValue) {
        this.isCustomPlaceHolder = true;
      }
      if (nzFormat == null ? void 0 : nzFormat.currentValue) {
        this.isCustomFormat = true;
        this.updateInputValue();
      }
      if (nzLocale) {
        this.setDefaultPlaceHolder();
      }
      if (nzRenderExtraFooter) {
        this.extraFooter = valueFunctionProp(this.nzRenderExtraFooter);
      }
      if (nzMode) {
        this.setDefaultPlaceHolder();
        this.setModeAndFormat();
      }
      if (nzStatus) {
        this.setStatusStyles(this.nzStatus, this.hasFeedback);
      }
      if (nzPlacement) {
        this.setPlacement(this.nzPlacement);
      }
      if (nzSize) {
        this.size.set(nzSize.currentValue);
      }
      if (nzVariant) {
        this.variant.set(nzVariant.currentValue);
      }
    }
    setModeAndFormat() {
      const inputFormats = {
        year: "yyyy",
        quarter: "yyyy-[Q]Q",
        month: "yyyy-MM",
        week: "YYYY-ww",
        date: this.nzShowTime ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd"
      };
      if (!this.nzMode) {
        this.nzMode = "date";
      }
      this.panelMode = this.isRange ? [this.nzMode, this.nzMode] : this.nzMode;
      if (!this.isCustomFormat) {
        this.nzFormat = inputFormats[this.nzMode];
      }
      this.inputSize = Math.max(10, this.nzFormat.length) + 2;
      this.updateInputValue();
    }
    /**
     * Triggered when overlayOpen changes (different with realOpenState)
     *
     * @param open The overlayOpen in picker component
     */
    onOpenChange(open) {
      this.nzOnOpenChange.emit(open);
    }
    writeValue(value) {
      this.setValue(value);
      this.cdr.markForCheck();
    }
    registerOnChange(fn) {
      this.onChangeFn = fn;
    }
    registerOnTouched(fn) {
      this.onTouchedFn = fn;
    }
    setDisabledState(isDisabled) {
      this.nzDisabled = this.isNzDisableFirstChange && this.nzDisabled || isDisabled;
      this.cdr.markForCheck();
      this.isNzDisableFirstChange = false;
    }
    // ------------------------------------------------------------------------
    // | Internal methods
    // ------------------------------------------------------------------------
    // Reload locale from i18n with side effects
    setLocale() {
      this.nzLocale = this.i18n.getLocaleData("DatePicker", {});
      this.setDefaultPlaceHolder();
      this.cdr.markForCheck();
    }
    setDefaultPlaceHolder() {
      if (!this.isCustomPlaceHolder && this.nzLocale) {
        const defaultPlaceholder = {
          year: this.getPropertyOfLocale("yearPlaceholder"),
          quarter: this.getPropertyOfLocale("quarterPlaceholder"),
          month: this.getPropertyOfLocale("monthPlaceholder"),
          week: this.getPropertyOfLocale("weekPlaceholder"),
          date: this.getPropertyOfLocale("placeholder")
        };
        const defaultRangePlaceholder = {
          year: this.getPropertyOfLocale("rangeYearPlaceholder"),
          quarter: this.getPropertyOfLocale("rangeQuarterPlaceholder"),
          month: this.getPropertyOfLocale("rangeMonthPlaceholder"),
          week: this.getPropertyOfLocale("rangeWeekPlaceholder"),
          date: this.getPropertyOfLocale("rangePlaceholder")
        };
        this.nzPlaceHolder = this.isRange ? defaultRangePlaceholder[this.nzMode] : defaultPlaceholder[this.nzMode];
      }
    }
    getPropertyOfLocale(type) {
      return this.nzLocale.lang[type] || this.i18n.getLocaleData(`DatePicker.lang.${type}`);
    }
    // Safe way of setting value with default
    setValue(value) {
      const newValue = this.datePickerService.makeValue(value);
      this.datePickerService.setValue(newValue);
      this.datePickerService.initialValue = cloneDate(newValue);
      this.cdr.detectChanges();
    }
    renderClass(value) {
      if (value) {
        this.renderer.addClass(this.elementRef.nativeElement, "ant-picker-focused");
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, "ant-picker-focused");
      }
    }
    onPanelModeChange(panelChange) {
      this.nzOnPanelChange.emit(panelChange);
    }
    // Emit nzOnCalendarChange when select date by nz-range-picker
    onCalendarChange(value) {
      if (this.isRange && Array.isArray(value)) {
        const rangeValue = value.filter((x) => x instanceof CandyDate).map((x) => x.nativeDate);
        this.nzOnCalendarChange.emit(rangeValue);
      }
    }
    onResultOk() {
      var _a2, _b;
      if (this.isRange) {
        const value = this.datePickerService.value;
        if (value.length) {
          this.nzOnOk.emit([((_a2 = value[0]) == null ? void 0 : _a2.nativeDate) || null, ((_b = value[1]) == null ? void 0 : _b.nativeDate) || null]);
        } else {
          this.nzOnOk.emit([]);
        }
      } else {
        if (this.datePickerService.value) {
          this.nzOnOk.emit(this.datePickerService.value.nativeDate);
        } else {
          this.nzOnOk.emit(null);
        }
      }
    }
    // status
    setStatusStyles(status, hasFeedback) {
      this.status = status;
      this.hasFeedback = hasFeedback;
      this.cdr.markForCheck();
      this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
      Object.keys(this.statusCls).forEach((status2) => {
        if (this.statusCls[status2]) {
          this.renderer.addClass(this.elementRef.nativeElement, status2);
        } else {
          this.renderer.removeClass(this.elementRef.nativeElement, status2);
        }
      });
    }
    setPlacement(placement) {
      const position = DATE_PICKER_POSITION_MAP[placement];
      this.overlayPositions = [position, ...DEFAULT_DATE_PICKER_POSITIONS];
      this.currentPosition.set(position);
    }
    generateClass(suffix) {
      return generateClassName(this.prefixCls, suffix);
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzVariant_decorators = [WithConfig()];
    _nzSeparator_decorators = [WithConfig()];
    _nzSuffixIcon_decorators = [WithConfig()];
    _nzBackdrop_decorators = [WithConfig()];
    __esDecorate(null, null, _nzVariant_decorators, {
      kind: "field",
      name: "nzVariant",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzVariant" in obj,
        get: (obj) => obj.nzVariant,
        set: (obj, value) => {
          obj.nzVariant = value;
        }
      },
      metadata: _metadata
    }, _nzVariant_initializers, _nzVariant_extraInitializers);
    __esDecorate(null, null, _nzSeparator_decorators, {
      kind: "field",
      name: "nzSeparator",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSeparator" in obj,
        get: (obj) => obj.nzSeparator,
        set: (obj, value) => {
          obj.nzSeparator = value;
        }
      },
      metadata: _metadata
    }, _nzSeparator_initializers, _nzSeparator_extraInitializers);
    __esDecorate(null, null, _nzSuffixIcon_decorators, {
      kind: "field",
      name: "nzSuffixIcon",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzSuffixIcon" in obj,
        get: (obj) => obj.nzSuffixIcon,
        set: (obj, value) => {
          obj.nzSuffixIcon = value;
        }
      },
      metadata: _metadata
    }, _nzSuffixIcon_initializers, _nzSuffixIcon_extraInitializers);
    __esDecorate(null, null, _nzBackdrop_decorators, {
      kind: "field",
      name: "nzBackdrop",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzBackdrop" in obj,
        get: (obj) => obj.nzBackdrop,
        set: (obj, value) => {
          obj.nzBackdrop = value;
        }
      },
      metadata: _metadata
    }, _nzBackdrop_initializers, _nzBackdrop_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "ngAcceptInputType_nzShowTime"), __publicField(_a, "ngAcceptInputType_nzMode"), __publicField(_a, "\u0275fac", function NzDatePickerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-date-picker"], ["nz-week-picker"], ["nz-month-picker"], ["nz-quarter-picker"], ["nz-year-picker"], ["nz-range-picker"]],
    viewQuery: function NzDatePickerComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(CdkConnectedOverlay, 5)(DateRangePopupComponent, 5)(_c42, 5)(_c5, 5)(_c6, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.cdkConnectedOverlay = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.panel = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.separatorElement = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.pickerInput = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.rangePickerInputs = _t);
      }
    },
    hostVars: 20,
    hostBindings: function NzDatePickerComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function NzDatePickerComponent_click_HostBindingHandler($event) {
          return ctx.onClickInputBox($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275classProp("ant-picker", true)("ant-picker-range", ctx.isRange)("ant-picker-large", ctx.finalSize() === "large")("ant-picker-small", ctx.finalSize() === "small")("ant-picker-disabled", ctx.nzDisabled)("ant-picker-rtl", ctx.dir() === "rtl")("ant-picker-borderless", ctx.finalVariant() === "borderless")("ant-picker-filled", ctx.finalVariant() === "filled")("ant-picker-underlined", ctx.finalVariant() === "underlined")("ant-picker-inline", ctx.nzInline());
      }
    },
    inputs: {
      nzInline: [1, "nzInline"],
      nzAllowClear: [2, "nzAllowClear", "nzAllowClear", booleanAttribute],
      nzAutoFocus: [2, "nzAutoFocus", "nzAutoFocus", booleanAttribute],
      nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
      nzInputReadOnly: [2, "nzInputReadOnly", "nzInputReadOnly", booleanAttribute],
      nzOpen: [2, "nzOpen", "nzOpen", booleanAttribute],
      nzDisabledDate: "nzDisabledDate",
      nzLocale: "nzLocale",
      nzPlaceHolder: "nzPlaceHolder",
      nzPopupStyle: "nzPopupStyle",
      nzDropdownClassName: [1, "nzDropdownClassName"],
      nzSize: "nzSize",
      nzStatus: "nzStatus",
      nzFormat: "nzFormat",
      nzVariant: "nzVariant",
      nzDateRender: "nzDateRender",
      nzDisabledTime: "nzDisabledTime",
      nzRenderExtraFooter: "nzRenderExtraFooter",
      nzShowToday: [2, "nzShowToday", "nzShowToday", booleanAttribute],
      nzMode: "nzMode",
      nzShowNow: [2, "nzShowNow", "nzShowNow", booleanAttribute],
      nzRanges: "nzRanges",
      nzDefaultPickerValue: "nzDefaultPickerValue",
      nzSeparator: "nzSeparator",
      nzSuffixIcon: "nzSuffixIcon",
      nzBackdrop: "nzBackdrop",
      nzId: "nzId",
      nzPlacement: "nzPlacement",
      nzShowWeekNumber: [2, "nzShowWeekNumber", "nzShowWeekNumber", booleanAttribute],
      nzShowTime: "nzShowTime"
    },
    outputs: {
      nzOnPanelChange: "nzOnPanelChange",
      nzOnCalendarChange: "nzOnCalendarChange",
      nzOnOk: "nzOnOk",
      nzOnOpenChange: "nzOnOpenChange"
    },
    exportAs: ["nzDatePicker"],
    features: [\u0275\u0275ProvidersFeature([DatePickerService, {
      provide: NZ_SPACE_COMPACT_ITEM_TYPE,
      useValue: "picker"
    }, {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => _a)
    }]), \u0275\u0275HostDirectivesFeature([NzSpaceCompactItemDirective]), \u0275\u0275NgOnChangesFeature],
    decls: 9,
    vars: 7,
    consts: [["tplRangeInput", ""], ["tplRightRest", ""], ["inlineMode", ""], ["pickerInput", ""], ["separatorElement", ""], ["rangePickerInput", ""], [3, "ngTemplateOutlet"], ["cdkConnectedOverlay", "", "nzConnectedOverlay", "", 3, "positionChange", "detach", "overlayKeydown", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayOpen", "cdkConnectedOverlayPositions"], [3, "class"], ["autocomplete", "off", 3, "ngModelChange", "focus", "focusout", "keyup.enter", "disabled", "readOnly", "ngModel", "placeholder", "size"], [4, "ngTemplateOutlet"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "nzStringTemplateOutlet"], ["nzType", "swap-right", "nzTheme", "outline"], ["autocomplete", "off", 3, "click", "focusout", "focus", "keyup.enter", "ngModelChange", "disabled", "readOnly", "size", "ngModel", "placeholder"], [3, "status"], [3, "click"], ["nzType", "close-circle", "nzTheme", "fill"], [3, "nzType"], [3, "panelModeChange", "calendarChange", "resultOk", "isRange", "inline", "defaultPickerValue", "showWeek", "panelMode", "locale", "showToday", "showNow", "showTime", "dateRender", "disabledDate", "disabledTime", "extraFooter", "ranges", "dir", "format"]],
    template: function NzDatePickerComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275conditionalCreate(0, NzDatePickerComponent_Conditional_0_Template, 2, 1)(1, NzDatePickerComponent_Conditional_1_Template, 1, 1, null, 6);
        \u0275\u0275template(2, NzDatePickerComponent_ng_template_2_Template, 2, 7, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(4, NzDatePickerComponent_ng_template_4_Template, 5, 11, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(6, NzDatePickerComponent_ng_template_6_Template, 2, 26, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(8, NzDatePickerComponent_ng_template_8_Template, 1, 1, "ng-template", 7);
        \u0275\u0275listener("positionChange", function NzDatePickerComponent_Template_ng_template_positionChange_8_listener($event) {
          return ctx.onPositionChange($event);
        })("detach", function NzDatePickerComponent_Template_ng_template_detach_8_listener() {
          return ctx.close();
        })("overlayKeydown", function NzDatePickerComponent_Template_ng_template_overlayKeydown_8_listener($event) {
          return ctx.onOverlayKeydown($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275conditional(!ctx.nzInline() ? 0 : 1);
        \u0275\u0275advance(8);
        \u0275\u0275property("cdkConnectedOverlayTransformOriginOn", \u0275\u0275interpolate1(".", ctx.prefixCls, "-dropdown"))("cdkConnectedOverlayHasBackdrop", ctx.nzBackdrop)("cdkConnectedOverlayOrigin", ctx.origin)("cdkConnectedOverlayOpen", ctx.realOpenState)("cdkConnectedOverlayPositions", ctx.overlayPositions);
      }
    },
    dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, NgTemplateOutlet, NzOutletModule, NzStringTemplateOutletDirective, NzIconModule, NzIconDirective, NzFormItemFeedbackIconComponent, DateRangePopupComponent, CdkConnectedOverlay, NzOverlayModule, NzConnectedOverlayDirective],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDatePickerComponent, [{
    type: Component,
    args: [{
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      selector: "nz-date-picker,nz-week-picker,nz-month-picker,nz-quarter-picker,nz-year-picker,nz-range-picker",
      exportAs: "nzDatePicker",
      template: `
    @if (!nzInline()) {
      @if (!isRange) {
        <div class="{{ prefixCls }}-input">
          <input
            #pickerInput
            [attr.id]="nzId"
            [class.ant-input-disabled]="nzDisabled"
            [disabled]="nzDisabled"
            [readOnly]="nzInputReadOnly"
            [(ngModel)]="inputValue"
            placeholder="{{ getPlaceholder() }}"
            [size]="inputSize"
            autocomplete="off"
            (focus)="onFocus($event)"
            (focusout)="onFocusout($event)"
            (ngModelChange)="onInputChange($event)"
            (keyup.enter)="onKeyupEnter($event)"
          />
          <ng-container *ngTemplateOutlet="tplRightRest" />
        </div>
      } @else {
        <div class="{{ prefixCls }}-input">
          <ng-container *ngTemplateOutlet="tplRangeInput; context: { partType: 'left' }" />
        </div>
        <div #separatorElement class="{{ prefixCls }}-range-separator">
          <span class="{{ prefixCls }}-separator">
            <ng-container *nzStringTemplateOutlet="nzSeparator; let separator">
              @if (nzSeparator) {
                {{ nzSeparator }}
              } @else {
                <nz-icon nzType="swap-right" nzTheme="outline" />
              }
            </ng-container>
          </span>
        </div>
        <div class="{{ prefixCls }}-input">
          <ng-container *ngTemplateOutlet="tplRangeInput; context: { partType: 'right' }" />
        </div>
        <ng-container *ngTemplateOutlet="tplRightRest" />
      }
    } @else {
      <ng-template [ngTemplateOutlet]="inlineMode" />
    }
    <!-- Input for Range ONLY -->
    <ng-template #tplRangeInput let-partType="partType">
      <input
        #rangePickerInput
        [attr.id]="nzId"
        [disabled]="nzDisabled"
        [readOnly]="nzInputReadOnly"
        [size]="inputSize"
        autocomplete="off"
        (click)="onClickInputBox($event)"
        (focusout)="onFocusout($event)"
        (focus)="onFocus($event, partType)"
        (keyup.enter)="onKeyupEnter($event)"
        [(ngModel)]="inputValue[datePickerService.getActiveIndex(partType)]"
        (ngModelChange)="onInputChange($event)"
        placeholder="{{ getPlaceholder(partType) }}"
      />
    </ng-template>

    <!-- Right operator icons -->
    <ng-template #tplRightRest>
      <div class="{{ prefixCls }}-active-bar" [style]="activeBarStyle"></div>
      @if (showClear) {
        <span class="{{ prefixCls }}-clear" (click)="onClickClear($event)">
          <nz-icon nzType="close-circle" nzTheme="fill" />
        </span>
      }

      <span class="{{ prefixCls }}-suffix">
        <ng-container *nzStringTemplateOutlet="nzSuffixIcon; let suffixIcon">
          <nz-icon [nzType]="suffixIcon" />
        </ng-container>
        @if (hasFeedback && !!status) {
          <nz-form-item-feedback-icon [status]="status" />
        }
      </span>
    </ng-template>

    <ng-template #inlineMode>
      <div
        [class]="dropdownClass()"
        [class.ant-picker-dropdown-range]="!nzInline() && isRange"
        [class.ant-picker-active-left]="datePickerService.activeInput === 'left'"
        [class.ant-picker-active-right]="datePickerService.activeInput === 'right'"
        [style]="nzPopupStyle"
        [animate.enter]="$any(!nzInline() && datepickerAnimationEnter())"
        [animate.leave]="$any(!nzInline() && datepickerAnimationLeave())"
      >
        <date-range-popup
          [isRange]="isRange"
          [inline]="nzInline()"
          [defaultPickerValue]="nzDefaultPickerValue"
          [showWeek]="nzShowWeekNumber || nzMode === 'week'"
          [panelMode]="panelMode"
          (panelModeChange)="onPanelModeChange($event)"
          (calendarChange)="onCalendarChange($event)"
          [locale]="nzLocale?.lang!"
          [showToday]="nzMode === 'date' && nzShowToday && !isRange && !nzShowTime"
          [showNow]="nzMode === 'date' && nzShowNow && !isRange && !!nzShowTime"
          [showTime]="nzShowTime"
          [dateRender]="nzDateRender"
          [disabledDate]="nzDisabledDate"
          [disabledTime]="nzDisabledTime"
          [extraFooter]="extraFooter"
          [ranges]="nzRanges"
          [dir]="dir()"
          [format]="nzFormat"
          (resultOk)="onResultOk()"
        />
      </div>
    </ng-template>

    <!-- Overlay -->
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      cdkConnectedOverlayTransformOriginOn=".{{ prefixCls }}-dropdown"
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="realOpenState"
      [cdkConnectedOverlayPositions]="overlayPositions"
      (positionChange)="onPositionChange($event)"
      (detach)="close()"
      (overlayKeydown)="onOverlayKeydown($event)"
    >
      <ng-container *ngTemplateOutlet="inlineMode" />
    </ng-template>
  `,
      host: {
        "[class.ant-picker]": `true`,
        "[class.ant-picker-range]": `isRange`,
        "[class.ant-picker-large]": `finalSize() === 'large'`,
        "[class.ant-picker-small]": `finalSize() === 'small'`,
        "[class.ant-picker-disabled]": `nzDisabled`,
        "[class.ant-picker-rtl]": `dir() === 'rtl'`,
        "[class.ant-picker-borderless]": `finalVariant() === 'borderless'`,
        "[class.ant-picker-filled]": `finalVariant() === 'filled'`,
        "[class.ant-picker-underlined]": `finalVariant() === 'underlined'`,
        "[class.ant-picker-inline]": `nzInline()`,
        "(click)": "onClickInputBox($event)"
      },
      hostDirectives: [NzSpaceCompactItemDirective],
      providers: [DatePickerService, {
        provide: NZ_SPACE_COMPACT_ITEM_TYPE,
        useValue: "picker"
      }, {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => NzDatePickerComponent)
      }],
      imports: [FormsModule, NgTemplateOutlet, NzOutletModule, NzIconModule, NzFormItemFeedbackIconComponent, DateRangePopupComponent, CdkConnectedOverlay, NzOverlayModule]
    }]
  }], null, {
    nzInline: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzInline",
        required: false
      }]
    }],
    nzAllowClear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAutoFocus: [{
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
    nzInputReadOnly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOpen: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDisabledDate: [{
      type: Input
    }],
    nzLocale: [{
      type: Input
    }],
    nzPlaceHolder: [{
      type: Input
    }],
    nzPopupStyle: [{
      type: Input
    }],
    nzDropdownClassName: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzDropdownClassName",
        required: false
      }]
    }],
    nzSize: [{
      type: Input
    }],
    nzStatus: [{
      type: Input
    }],
    nzFormat: [{
      type: Input
    }],
    nzVariant: [{
      type: Input
    }],
    nzDateRender: [{
      type: Input
    }],
    nzDisabledTime: [{
      type: Input
    }],
    nzRenderExtraFooter: [{
      type: Input
    }],
    nzShowToday: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzMode: [{
      type: Input
    }],
    nzShowNow: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzRanges: [{
      type: Input
    }],
    nzDefaultPickerValue: [{
      type: Input
    }],
    nzSeparator: [{
      type: Input
    }],
    nzSuffixIcon: [{
      type: Input
    }],
    nzBackdrop: [{
      type: Input
    }],
    nzId: [{
      type: Input
    }],
    nzPlacement: [{
      type: Input
    }],
    nzShowWeekNumber: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOnPanelChange: [{
      type: Output
    }],
    nzOnCalendarChange: [{
      type: Output
    }],
    nzOnOk: [{
      type: Output
    }],
    nzOnOpenChange: [{
      type: Output
    }],
    nzShowTime: [{
      type: Input
    }],
    cdkConnectedOverlay: [{
      type: ViewChild,
      args: [CdkConnectedOverlay, {
        static: false
      }]
    }],
    panel: [{
      type: ViewChild,
      args: [DateRangePopupComponent, {
        static: false
      }]
    }],
    separatorElement: [{
      type: ViewChild,
      args: ["separatorElement", {
        static: false
      }]
    }],
    pickerInput: [{
      type: ViewChild,
      args: ["pickerInput", {
        static: false
      }]
    }],
    rangePickerInputs: [{
      type: ViewChildren,
      args: ["rangePickerInput"]
    }]
  });
})();
var _NzMonthPickerComponent = class _NzMonthPickerComponent {
  constructor() {
    __publicField(this, "datePicker", inject(NzDatePickerComponent, {
      host: true
    }));
    this.datePicker.nzMode = "month";
  }
};
__publicField(_NzMonthPickerComponent, "\u0275fac", function NzMonthPickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzMonthPickerComponent)();
});
__publicField(_NzMonthPickerComponent, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzMonthPickerComponent,
  selectors: [["nz-month-picker"]],
  exportAs: ["nzMonthPicker"]
}));
var NzMonthPickerComponent = _NzMonthPickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzMonthPickerComponent, [{
    type: Directive,
    args: [{
      selector: "nz-month-picker",
      exportAs: "nzMonthPicker"
    }]
  }], () => [], null);
})();
var _NzQuarterPickerComponent = class _NzQuarterPickerComponent {
  constructor() {
    __publicField(this, "datePicker", inject(NzDatePickerComponent, {
      host: true
    }));
    this.datePicker.nzMode = "quarter";
  }
};
__publicField(_NzQuarterPickerComponent, "\u0275fac", function NzQuarterPickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzQuarterPickerComponent)();
});
__publicField(_NzQuarterPickerComponent, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzQuarterPickerComponent,
  selectors: [["nz-quarter-picker"]],
  exportAs: ["nzQuarterPicker"]
}));
var NzQuarterPickerComponent = _NzQuarterPickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzQuarterPickerComponent, [{
    type: Directive,
    args: [{
      selector: "nz-quarter-picker",
      exportAs: "nzQuarterPicker"
    }]
  }], () => [], null);
})();
var _NzRangePickerComponent = class _NzRangePickerComponent {
  constructor() {
    __publicField(this, "datePicker", inject(NzDatePickerComponent, {
      host: true
    }));
    this.datePicker.isRange = true;
  }
};
__publicField(_NzRangePickerComponent, "\u0275fac", function NzRangePickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzRangePickerComponent)();
});
__publicField(_NzRangePickerComponent, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzRangePickerComponent,
  selectors: [["nz-range-picker"]],
  exportAs: ["nzRangePicker"]
}));
var NzRangePickerComponent = _NzRangePickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzRangePickerComponent, [{
    type: Directive,
    args: [{
      selector: "nz-range-picker",
      exportAs: "nzRangePicker"
    }]
  }], () => [], null);
})();
var _NzWeekPickerComponent = class _NzWeekPickerComponent {
  constructor() {
    __publicField(this, "datePicker", inject(NzDatePickerComponent, {
      host: true
    }));
    this.datePicker.nzMode = "week";
  }
};
__publicField(_NzWeekPickerComponent, "\u0275fac", function NzWeekPickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzWeekPickerComponent)();
});
__publicField(_NzWeekPickerComponent, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzWeekPickerComponent,
  selectors: [["nz-week-picker"]],
  exportAs: ["nzWeekPicker"]
}));
var NzWeekPickerComponent = _NzWeekPickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzWeekPickerComponent, [{
    type: Directive,
    args: [{
      selector: "nz-week-picker",
      exportAs: "nzWeekPicker"
    }]
  }], () => [], null);
})();
var _NzYearPickerComponent = class _NzYearPickerComponent {
  constructor() {
    __publicField(this, "datePicker", inject(NzDatePickerComponent, {
      host: true
    }));
    this.datePicker.nzMode = "year";
  }
};
__publicField(_NzYearPickerComponent, "\u0275fac", function NzYearPickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzYearPickerComponent)();
});
__publicField(_NzYearPickerComponent, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _NzYearPickerComponent,
  selectors: [["nz-year-picker"]],
  exportAs: ["nzYearPicker"]
}));
var NzYearPickerComponent = _NzYearPickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzYearPickerComponent, [{
    type: Directive,
    args: [{
      selector: "nz-year-picker",
      exportAs: "nzYearPicker"
    }]
  }], () => [], null);
})();
var _NzDatePickerModule = class _NzDatePickerModule {
};
__publicField(_NzDatePickerModule, "\u0275fac", function NzDatePickerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzDatePickerModule)();
});
__publicField(_NzDatePickerModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzDatePickerModule,
  imports: [NzDatePickerComponent, NzMonthPickerComponent, NzYearPickerComponent, NzWeekPickerComponent, NzRangePickerComponent, CalendarFooterComponent, InnerPopupComponent, DateRangePopupComponent, NzQuarterPickerComponent],
  exports: [NzDatePickerComponent, NzRangePickerComponent, NzMonthPickerComponent, NzYearPickerComponent, NzWeekPickerComponent, NzQuarterPickerComponent]
}));
__publicField(_NzDatePickerModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzDatePickerComponent, CalendarFooterComponent, InnerPopupComponent, DateRangePopupComponent]
}));
var NzDatePickerModule = _NzDatePickerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzDatePickerModule, [{
    type: NgModule,
    args: [{
      imports: [NzDatePickerComponent, NzMonthPickerComponent, NzYearPickerComponent, NzWeekPickerComponent, NzRangePickerComponent, CalendarFooterComponent, InnerPopupComponent, DateRangePopupComponent, NzQuarterPickerComponent],
      exports: [NzDatePickerComponent, NzRangePickerComponent, NzMonthPickerComponent, NzYearPickerComponent, NzWeekPickerComponent, NzQuarterPickerComponent]
    }]
  }], null, null);
})();

export {
  NzDatePickerComponent,
  NzRangePickerComponent,
  NzDatePickerModule
};
//# sourceMappingURL=chunk-XPAK6AXI.js.map
