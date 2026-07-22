import {
  CommonModule,
  FormsModule,
  HttpClientService,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgForOf,
  NgIf,
  NgModel,
  NzCheckboxComponent,
  NzCheckboxModule,
  NzOptionComponent,
  NzSelectComponent,
  NzSelectModule,
  NzSpinComponent,
  NzSpinModule,
  TranslocoModule,
  TranslocoPipe
} from "./chunk-IZ4YJLPT.js";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  Subject,
  debounceTime,
  distinctUntilChanged,
  forwardRef,
  inject,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-KKYHHXIP.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-MYGOUE3E.js";

// projects/tot/shared/src/lib/components/tot-autocomplete/tot-autocomplete.component.ts
function TotAutocompleteComponent_ng_container_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "label", 5);
    \u0275\u0275listener("click", function TotAutocompleteComponent_ng_container_2_ng_container_2_Template_label_click_1_listener($event) {
      return $event.preventDefault();
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 6);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzChecked", ctx_r1.isSelected(item_r1));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.getFieldValue(item_r1, ctx_r1.labelField));
  }
}
function TotAutocompleteComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "nz-option", 3);
    \u0275\u0275template(2, TotAutocompleteComponent_ng_container_2_ng_container_2_Template, 4, 2, "ng-container", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzLabel", ctx_r1.getFieldValue(item_r1, ctx_r1.labelField))("nzValue", ctx_r1.getFieldValue(item_r1, ctx_r1.valueField))("nzCustomContent", ctx_r1.mode === "multiple");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.mode === "multiple");
  }
}
function TotAutocompleteComponent_nz_option_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-option", 7);
    \u0275\u0275element(1, "nz-spin", 8);
    \u0275\u0275elementEnd();
  }
}
var _TotAutocompleteComponent = class _TotAutocompleteComponent {
  constructor() {
    this.httpService = inject(HttpClientService);
    this.destroy$ = new Subject();
    this.search$ = new Subject();
    this.apiUrl = "";
    this.params = {};
    this.mode = "default";
    this.placeholder = "Vui l\xF2ng ch\u1ECDn";
    this.labelField = "name";
    this.valueField = "id";
    this.pageSize = 10;
    this.valueChange = new EventEmitter();
    this.options = [];
    this.selectedValue = null;
    this.loading = false;
    this.pageIndex = 1;
    this.hasMore = true;
    this.searchTerm = "";
    this.onChange = () => {
    };
    this.onTouched = () => {
    };
  }
  getCacheKey() {
    const paramsStr = JSON.stringify(this.params || {});
    return `tot_autocomplete_cache_${this.apiUrl}_${paramsStr}`;
  }
  getCache() {
    try {
      const data = sessionStorage.getItem(this.getCacheKey());
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }
  setCache(data) {
    try {
      sessionStorage.setItem(this.getCacheKey(), JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to save to sessionStorage", e);
    }
  }
  ngOnInit() {
    this.search$.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((term) => {
      this.searchTerm = term;
      this.resetAndFetch();
    });
    const cached = this.getCache();
    if (cached.length > 0) {
      this.options = cached.slice(0, this.pageSize);
      this.hasMore = cached.length > this.options.length;
    } else {
      this.fetchData();
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  // ControlValueAccessor methods
  writeValue(value) {
    this.selectedValue = value;
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
  }
  onValueChange(value) {
    this.selectedValue = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }
  onSearch(value) {
    this.search$.next(value);
  }
  onScrollToBottom() {
    if (this.loading)
      return;
    const cached = this.getCache();
    if (!this.searchTerm && cached.length > this.options.length) {
      this.pageIndex++;
      this.options = cached.slice(0, this.pageIndex * this.pageSize);
      this.hasMore = cached.length > this.options.length;
      return;
    }
    if (this.hasMore) {
      this.pageIndex++;
      this.fetchData();
    }
  }
  resetAndFetch() {
    this.pageIndex = 1;
    this.options = [];
    this.hasMore = true;
    this.fetchData();
  }
  async fetchData() {
    var _a;
    if (!this.apiUrl || this.loading)
      return;
    this.loading = true;
    try {
      const queryParams = __spreadProps(__spreadValues({}, this.params), {
        keyword: this.searchTerm,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      const res = await this.httpService.get(this.apiUrl, { params: queryParams });
      const newItems = Array.isArray(res) ? res : (res == null ? void 0 : res.items) || [];
      const total = (_a = res == null ? void 0 : res.total) != null ? _a : 0;
      let allCached = this.getCache();
      newItems.forEach((item) => {
        const val = this.getFieldValue(item, this.valueField);
        if (!allCached.find((c) => this.getFieldValue(c, this.valueField) === val)) {
          allCached.push(item);
        }
      });
      this.setCache(allCached);
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        this.options = allCached.filter((item) => this.getFieldValue(item, this.labelField).toLowerCase().includes(term));
        this.hasMore = false;
      } else {
        this.options = allCached.slice(0, this.pageIndex * this.pageSize);
        if (Array.isArray(res)) {
          this.hasMore = allCached.length > this.options.length;
        } else {
          this.hasMore = this.options.length < total || allCached.length > this.options.length;
        }
      }
    } catch (error) {
      console.error("Error fetching select options:", error);
    } finally {
      this.loading = false;
    }
  }
  // Helper to get nested properties if field is like 'user.name'
  getFieldValue(item, field) {
    if (!item)
      return "";
    return field.split(".").reduce((obj, key) => obj == null ? void 0 : obj[key], item) || "";
  }
  isSelected(item) {
    if (this.selectedValue === null || this.selectedValue === void 0)
      return false;
    const itemValue = this.getFieldValue(item, this.valueField);
    if (this.mode === "multiple" && Array.isArray(this.selectedValue)) {
      return this.selectedValue.includes(itemValue);
    }
    return this.selectedValue === itemValue;
  }
};
_TotAutocompleteComponent.\u0275fac = function TotAutocompleteComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TotAutocompleteComponent)();
};
_TotAutocompleteComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TotAutocompleteComponent, selectors: [["tot-autocomplete"]], inputs: { apiUrl: "apiUrl", params: "params", mode: "mode", placeholder: "placeholder", labelField: "labelField", valueField: "valueField", pageSize: "pageSize" }, outputs: { valueChange: "valueChange" }, features: [\u0275\u0275ProvidersFeature([
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _TotAutocompleteComponent),
    multi: true
  }
])], decls: 4, vars: 11, consts: [[2, "width", "100%", 3, "ngModelChange", "nzOnSearch", "nzScrollToBottom", "nzMode", "nzPlaceHolder", "nzLoading", "nzShowSearch", "nzServerSearch", "ngModel", "nzAllowClear"], [4, "ngFor", "ngForOf"], ["nzDisabled", "", "nzCustomContent", "", 4, "ngIf"], [3, "nzLabel", "nzValue", "nzCustomContent"], [4, "ngIf"], ["nz-checkbox", "", 3, "click", "nzChecked"], [2, "margin-left", "8px"], ["nzDisabled", "", "nzCustomContent", ""], ["nzSimple", ""]], template: function TotAutocompleteComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-select", 0);
    \u0275\u0275pipe(1, "transloco");
    \u0275\u0275twoWayListener("ngModelChange", function TotAutocompleteComponent_Template_nz_select_ngModelChange_0_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.selectedValue, $event) || (ctx.selectedValue = $event);
      return $event;
    });
    \u0275\u0275listener("ngModelChange", function TotAutocompleteComponent_Template_nz_select_ngModelChange_0_listener($event) {
      return ctx.onValueChange($event);
    })("nzOnSearch", function TotAutocompleteComponent_Template_nz_select_nzOnSearch_0_listener($event) {
      return ctx.onSearch($event);
    })("nzScrollToBottom", function TotAutocompleteComponent_Template_nz_select_nzScrollToBottom_0_listener() {
      return ctx.onScrollToBottom();
    });
    \u0275\u0275template(2, TotAutocompleteComponent_ng_container_2_Template, 3, 4, "ng-container", 1)(3, TotAutocompleteComponent_nz_option_3_Template, 2, 0, "nz-option", 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("nzMode", ctx.mode)("nzPlaceHolder", \u0275\u0275pipeBind1(1, 9, ctx.placeholder))("nzLoading", ctx.loading)("nzShowSearch", true)("nzServerSearch", true);
    \u0275\u0275twoWayProperty("ngModel", ctx.selectedValue);
    \u0275\u0275property("nzAllowClear", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx.options);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.loading);
  }
}, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, NgControlStatus, NgModel, NzSelectModule, NzOptionComponent, NzSelectComponent, NzCheckboxModule, NzCheckboxComponent, NzSpinModule, NzSpinComponent, TranslocoModule, TranslocoPipe], styles: ["\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n  .ant-select-item-option-content {\n  display: flex;\n  align-items: center;\n}\n  .ant-select-item-option-selected label[nz-checkbox] .ant-checkbox-inner {\n  background-color: #1890ff;\n  border-color: #1890ff;\n}\n/*# sourceMappingURL=tot-autocomplete.component.css.map */"] });
var TotAutocompleteComponent = _TotAutocompleteComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TotAutocompleteComponent, [{
    type: Component,
    args: [{ selector: "tot-autocomplete", standalone: true, imports: [CommonModule, FormsModule, NzSelectModule, NzCheckboxModule, NzSpinModule, TranslocoModule], providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TotAutocompleteComponent),
        multi: true
      }
    ], template: `<nz-select
  [nzMode]="mode"
  [nzPlaceHolder]="placeholder | transloco"
  [nzLoading]="loading"
  [nzShowSearch]="true"
  [nzServerSearch]="true"
  [(ngModel)]="selectedValue"
  (ngModelChange)="onValueChange($event)"
  (nzOnSearch)="onSearch($event)"
  (nzScrollToBottom)="onScrollToBottom()"
  [nzAllowClear]="true"
  style="width: 100%;"
>
  <ng-container *ngFor="let item of options">
    <nz-option
      [nzLabel]="getFieldValue(item, labelField)"
      [nzValue]="getFieldValue(item, valueField)"
      [nzCustomContent]="mode === 'multiple'"
    >
      <ng-container *ngIf="mode === 'multiple'">
        <label nz-checkbox [nzChecked]="isSelected(item)" (click)="$event.preventDefault()"></label>
        <span style="margin-left: 8px;">{{ getFieldValue(item, labelField) }}</span>
      </ng-container>
    </nz-option>
  </ng-container>

  <nz-option *ngIf="loading" nzDisabled nzCustomContent>
    <nz-spin nzSimple></nz-spin>
  </nz-option>
</nz-select>
`, styles: ["/* projects/tot/shared/src/lib/components/tot-autocomplete/tot-autocomplete.component.css */\n:host {\n  display: block;\n  width: 100%;\n}\n::ng-deep .ant-select-item-option-content {\n  display: flex;\n  align-items: center;\n}\n::ng-deep .ant-select-item-option-selected label[nz-checkbox] .ant-checkbox-inner {\n  background-color: #1890ff;\n  border-color: #1890ff;\n}\n/*# sourceMappingURL=tot-autocomplete.component.css.map */\n"] }]
  }], null, { apiUrl: [{
    type: Input
  }], params: [{
    type: Input
  }], mode: [{
    type: Input
  }], placeholder: [{
    type: Input
  }], labelField: [{
    type: Input
  }], valueField: [{
    type: Input
  }], pageSize: [{
    type: Input
  }], valueChange: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TotAutocompleteComponent, { className: "TotAutocompleteComponent", filePath: "projects/tot/shared/src/lib/components/tot-autocomplete/tot-autocomplete.component.ts", lineNumber: 25 });
})();

export {
  TotAutocompleteComponent
};
//# sourceMappingURL=chunk-PKGODJKK.js.map
