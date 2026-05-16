import {
  NzBreadCrumbComponent,
  NzBreadCrumbItemComponent,
  NzBreadCrumbModule,
  NzContentComponent,
  NzLayoutComponent,
  NzLayoutModule,
  NzSiderComponent
} from "./chunk-RDMPVVOH.js";
import {
  ComponentRegistryService,
  EVENT_TOPICS,
  MessageBusService,
  REGISTRY_KEYS
} from "./chunk-73BVXEQP.js";
import {
  NzDatePickerComponent,
  NzDatePickerModule,
  NzOptionComponent,
  NzRadioComponent,
  NzRadioGroupComponent,
  NzRadioModule,
  NzSelectComponent,
  NzSelectModule,
  NzTableCellDirective,
  NzTableComponent,
  NzTableModule,
  NzTagComponent,
  NzTagModule,
  NzTbodyComponent,
  NzThMeasureDirective,
  NzTheadComponent,
  NzTrDirective
} from "./chunk-GPAXAT2T.js";
import {
  NzContextMenuService,
  NzDividerComponent,
  NzDividerModule,
  NzDropDownModule,
  NzDropdownMenuComponent,
  NzMenuDirective,
  NzMenuDividerDirective,
  NzMenuItemComponent
} from "./chunk-YA5VTMF5.js";
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormModule
} from "./chunk-LFQY2OAB.js";
import {
  NZ_MODAL_DATA,
  NzModalModule,
  NzModalRef,
  NzModalService
} from "./chunk-FNOQULRR.js";
import {
  CdkConnectedOverlay,
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  CommonModule,
  DatePipe,
  DefaultValueAccessor,
  Directionality,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  HttpClientService,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NgModel,
  NgTemplateOutlet,
  NzAnimationCollapseDirective,
  NzAnimationTreeCollapseDirective,
  NzAnimationTreeCollapseService,
  NzButtonComponent,
  NzButtonModule,
  NzColDirective,
  NzConnectedOverlayDirective,
  NzIconDirective,
  NzIconModule,
  NzInputDirective,
  NzInputGroupComponent,
  NzInputGroupWhitSuffixOrPrefixDirective,
  NzInputModule,
  NzMessageService,
  NzNoAnimationDirective,
  NzOutletModule,
  NzOverlayModule,
  NzRowDirective,
  NzStringTemplateOutletDirective,
  NzTooltipBaseDirective,
  NzTooltipComponent,
  NzTooltipDirective,
  NzTooltipModule,
  NzTransitionPatchDirective,
  NzWaveDirective,
  OverlayModule,
  ReactiveFormsModule,
  Validators,
  WithConfig,
  encodeEntities,
  fromEventOutsideAngular,
  isTooltipEmpty,
  onConfigChangeEventForComponent,
  takeUntilDestroyed,
  ɵNgNoValidate
} from "./chunk-XU754HJP.js";
import {
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgZone,
  Output,
  Pipe,
  Renderer2,
  Subject,
  ViewChild,
  ViewEncapsulation,
  __esDecorate,
  __runInitializers,
  booleanAttribute,
  filter,
  forwardRef,
  inject,
  input,
  linkedSignal,
  numberAttribute,
  output,
  setClassMetadata,
  takeUntil,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵanimateEnter,
  ɵɵanimateLeave,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcomponentInstance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵdomElement,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery,
  ɵɵviewQuerySignal
} from "./chunk-2BQMWOA2.js";
import {
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-MYGOUE3E.js";

// projects/tot/business-files/src/lib/services/files-folders.service.ts
var _FilesFoldersService = class _FilesFoldersService {
  constructor() {
    this.http = inject(HttpClientService);
    this.refreshSubject = new Subject();
    this.selectFolderSubject = new Subject();
    this.refresh$ = this.refreshSubject.asObservable();
    this.selectFolder$ = this.selectFolderSubject.asObservable();
  }
  notifyRefresh(delayMs = 0) {
    if (delayMs > 0) {
      setTimeout(() => this.refreshSubject.next(), delayMs);
    } else {
      this.refreshSubject.next();
    }
  }
  notifySelectFolder(folderId) {
    this.selectFolderSubject.next(folderId);
  }
  getFolderTree() {
    return this.http.get("/api/folders/tree");
  }
  getFolderContent(folderId, pageIndex = 1, pageSize = 10) {
    const baseUrl = folderId ? `/api/folders/${folderId}/content` : "/api/folders/root/content";
    const path = `${baseUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get(path);
  }
  createFolder(name, parentId) {
    return this.http.post("/api/folders", { name, parentId });
  }
  deleteFolder(folderId) {
    return this.http.delete(`/api/folders/${folderId}`);
  }
  moveFolder(folderId, newParentId) {
    return this.http.post("/api/folders/move", { folderId, newParentId });
  }
  uploadFile(folderId, file) {
    const formData = new FormData();
    if (folderId) {
      formData.append("folderId", folderId);
    }
    formData.append("file", file);
    return this.http.post("/api/files/upload", formData);
  }
  deleteFile(fileId) {
    return this.http.delete(`/api/files/${fileId}`);
  }
  moveFile(fileId, newFolderId) {
    return this.http.post("/api/files/move", { fileId, newFolderId });
  }
  setFilePermission(fileId, permission, shareCode, expiredAt) {
    return this.http.post("/api/files/permission", { fileId, permission, shareCode, expiredAt });
  }
  getShareUrl(fileId, durationHours = 24) {
    return this.http.get(`/api/files/${fileId}/share-url?durationHours=${durationHours}`);
  }
  getFileDetail(fileId) {
    return this.http.get(`/api/files/${fileId}`);
  }
  searchFiles(query) {
    return this.http.get(`/api/files/search?query=${query}`);
  }
};
_FilesFoldersService.\u0275fac = function FilesFoldersService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FilesFoldersService)();
};
_FilesFoldersService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _FilesFoldersService, factory: _FilesFoldersService.\u0275fac, providedIn: "root" });
var FilesFoldersService = _FilesFoldersService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilesFoldersService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-highlight.mjs
var _NzHighlightPipe = class _NzHighlightPipe {
  constructor() {
    __publicField(this, "UNIQUE_WRAPPERS", ["##==-open_tag-==##", "##==-close_tag-==##"]);
  }
  transform(value, highlightValue, flags, klass) {
    if (!highlightValue) {
      return value;
    }
    const searchValue = new RegExp(highlightValue.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$&"), flags);
    const wrapValue = value.replace(searchValue, `${this.UNIQUE_WRAPPERS[0]}$&${this.UNIQUE_WRAPPERS[1]}`);
    return encodeEntities(wrapValue).replace(new RegExp(this.UNIQUE_WRAPPERS[0], "g"), klass ? `<span class="${klass}">` : "<span>").replace(new RegExp(this.UNIQUE_WRAPPERS[1], "g"), "</span>");
  }
};
__publicField(_NzHighlightPipe, "\u0275fac", function NzHighlightPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzHighlightPipe)();
});
__publicField(_NzHighlightPipe, "\u0275pipe", /* @__PURE__ */ \u0275\u0275definePipe({
  name: "nzHighlight",
  type: _NzHighlightPipe,
  pure: true
}));
var NzHighlightPipe = _NzHighlightPipe;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzHighlightPipe, [{
    type: Pipe,
    args: [{
      name: "nzHighlight"
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-tree.mjs
var NzTreeNode = class _NzTreeNode {
  /**
   * Init nzTreeNode
   *
   * @param option option user's input
   * @param parent parent node
   * @param service base nzTreeService
   */
  constructor(option, parent = null, service = null) {
    __publicField(this, "_title", "");
    __publicField(this, "key");
    __publicField(this, "level", 0);
    __publicField(this, "origin");
    // Parent Node
    __publicField(this, "parentNode", null);
    __publicField(this, "_icon", "");
    __publicField(this, "_children", []);
    __publicField(this, "_isLeaf", false);
    __publicField(this, "_isChecked", false);
    __publicField(this, "_isSelectable", false);
    __publicField(this, "_isDisabled", false);
    __publicField(this, "_isDisableCheckbox", false);
    __publicField(this, "_isExpanded", false);
    __publicField(this, "_isHalfChecked", false);
    __publicField(this, "_isSelected", false);
    __publicField(this, "_isLoading", false);
    __publicField(this, "canHide", false);
    __publicField(this, "isMatched", false);
    __publicField(this, "service", null);
    __publicField(this, "component");
    /** New added in Tree for easy data access */
    __publicField(this, "isStart");
    __publicField(this, "isEnd");
    var _a;
    if (option instanceof _NzTreeNode) {
      return option;
    }
    this.service = service || null;
    this.origin = option;
    this.key = option.key;
    this.parentNode = parent;
    this._title = option.title || "---";
    this._icon = option.icon || "";
    this._isLeaf = option.isLeaf || false;
    this._children = [];
    this._isChecked = option.checked || false;
    this._isSelectable = option.disabled || option.selectable !== false;
    this._isDisabled = option.disabled || false;
    this._isDisableCheckbox = option.disableCheckbox || false;
    this._isExpanded = option.isLeaf ? false : option.expanded || false;
    this._isHalfChecked = false;
    this._isSelected = !option.disabled && option.selected || false;
    this._isLoading = false;
    this.isMatched = false;
    if (parent) {
      this.level = parent.level + 1;
    } else {
      this.level = 0;
    }
    const s = this.treeService;
    (_a = s == null ? void 0 : s.treeNodePostProcessor) == null ? void 0 : _a.call(s, this);
    if (typeof option.children !== "undefined" && option.children !== null) {
      option.children.forEach((nodeOptions) => {
        if (s && !s.isCheckStrictly && option.checked && !option.disabled && !nodeOptions.disabled && !nodeOptions.disableCheckbox) {
          nodeOptions.checked = option.checked;
        }
        this._children.push(new _NzTreeNode(nodeOptions, this));
      });
    }
  }
  get treeService() {
    return this.service || this.parentNode && this.parentNode.treeService;
  }
  /**
   * auto generate
   * get
   * set
   */
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = value;
    this.update();
  }
  get icon() {
    return this._icon;
  }
  set icon(value) {
    this._icon = value;
    this.update();
  }
  get children() {
    return this._children;
  }
  set children(value) {
    this._children = value;
    this.update();
  }
  get isLeaf() {
    return this._isLeaf;
  }
  set isLeaf(value) {
    this._isLeaf = value;
    this.update();
  }
  get isChecked() {
    return this._isChecked;
  }
  set isChecked(value) {
    this._isChecked = value;
    this.origin.checked = value;
    this.afterValueChange("isChecked");
  }
  get isHalfChecked() {
    return this._isHalfChecked;
  }
  set isHalfChecked(value) {
    this._isHalfChecked = value;
    this.afterValueChange("isHalfChecked");
  }
  get isSelectable() {
    return this._isSelectable;
  }
  set isSelectable(value) {
    this._isSelectable = value;
    this.update();
  }
  get isDisabled() {
    return this._isDisabled;
  }
  set isDisabled(value) {
    this._isDisabled = value;
    this.update();
  }
  get isDisableCheckbox() {
    return this._isDisableCheckbox;
  }
  set isDisableCheckbox(value) {
    this._isDisableCheckbox = value;
    this.update();
  }
  get isExpanded() {
    return this._isExpanded;
  }
  set isExpanded(value) {
    this._isExpanded = value;
    this.origin.expanded = value;
    this.afterValueChange("isExpanded");
    this.afterValueChange("reRender");
  }
  get isSelected() {
    return this._isSelected;
  }
  set isSelected(value) {
    this._isSelected = value;
    this.origin.selected = value;
    this.afterValueChange("isSelected");
  }
  get isLoading() {
    return this._isLoading;
  }
  set isLoading(value) {
    this._isLoading = value;
    this.update();
  }
  setSyncChecked(checked = false, halfChecked = false) {
    this.setChecked(checked, halfChecked);
    if (this.treeService && !this.treeService.isCheckStrictly) {
      this.treeService.conduct(this);
    }
  }
  setChecked(checked = false, halfChecked = false) {
    this.origin.checked = checked;
    this.isChecked = checked;
    this.isHalfChecked = halfChecked;
  }
  setExpanded(value) {
    this._isExpanded = value;
    this.origin.expanded = value;
    this.afterValueChange("isExpanded");
  }
  getParentNode() {
    return this.parentNode;
  }
  getChildren() {
    return this.children;
  }
  /**
   * Support appending child nodes by position. Leaf node cannot be appended.
   */
  addChildren(children, childPos = -1) {
    if (!this.isLeaf) {
      children.forEach((node) => {
        const refreshLevel = (n) => {
          n.getChildren().forEach((c) => {
            c.level = c.getParentNode().level + 1;
            c.origin.level = c.level;
            refreshLevel(c);
          });
        };
        let child = node;
        if (child instanceof _NzTreeNode) {
          child.parentNode = this;
        } else {
          child = new _NzTreeNode(node, this);
        }
        child.level = this.level + 1;
        child.origin.level = child.level;
        refreshLevel(child);
        try {
          childPos === -1 ? this.children.push(child) : this.children.splice(childPos, 0, child);
        } catch {
        }
      });
      this.origin.children = this.getChildren().map((v) => v.origin);
      this.isLoading = false;
    }
    this.afterValueChange("addChildren");
    this.afterValueChange("reRender");
  }
  clearChildren() {
    this.afterValueChange("clearChildren");
    this.children = [];
    this.origin.children = [];
    this.afterValueChange("reRender");
  }
  remove() {
    const parentNode = this.getParentNode();
    if (parentNode) {
      parentNode.children = parentNode.getChildren().filter((v) => v.key !== this.key);
      parentNode.origin.children = parentNode.origin.children.filter((v) => v.key !== this.key);
      this.afterValueChange("remove");
      this.afterValueChange("reRender");
    }
  }
  afterValueChange(key) {
    if (this.treeService) {
      switch (key) {
        case "isChecked":
          this.treeService.setCheckedNodeList(this);
          break;
        case "isHalfChecked":
          this.treeService.setHalfCheckedNodeList(this);
          break;
        case "isExpanded":
          this.treeService.setExpandedNodeList(this);
          break;
        case "isSelected":
          this.treeService.setNodeActive(this);
          break;
        case "clearChildren":
          this.treeService.afterRemove(this.getChildren());
          break;
        case "remove":
          this.treeService.afterRemove([this]);
          break;
        case "reRender":
          this.treeService.flattenTreeData(this.treeService.rootNodes, this.treeService.getExpandedNodeList().map((v) => v.key));
          break;
      }
    }
    this.update();
  }
  update() {
    if (this.component) {
      this.component.markForCheck();
    }
  }
};
function isCheckDisabled(node) {
  const {
    isDisabled,
    isDisableCheckbox
  } = node;
  return !!(isDisabled || isDisableCheckbox);
}
function isInArray(needle, haystack) {
  return haystack.length > 0 && haystack.indexOf(needle) > -1;
}
function getPosition(level, index) {
  return `${level}-${index}`;
}
function getKey(key, pos) {
  if (key !== null && key !== void 0) {
    return key;
  }
  return pos;
}
function flattenTreeData(treeNodeList = [], expandedKeys = []) {
  const expandedKeySet = new Set(expandedKeys === true ? [] : expandedKeys);
  const flattenList = [];
  function dig(list, parent = null) {
    return list.map((treeNode, index) => {
      const pos = getPosition(parent ? parent.pos : "0", index);
      const mergedKey = getKey(treeNode.key, pos);
      treeNode.isStart = [...parent ? parent.isStart : [], index === 0];
      treeNode.isEnd = [...parent ? parent.isEnd : [], index === list.length - 1];
      const flattenNode = {
        parent,
        pos,
        children: [],
        data: treeNode,
        isStart: [...parent ? parent.isStart : [], index === 0],
        isEnd: [...parent ? parent.isEnd : [], index === list.length - 1]
      };
      flattenList.push(flattenNode);
      if (expandedKeys === true || expandedKeySet.has(mergedKey) || treeNode.isExpanded) {
        flattenNode.children = dig(treeNode.children || [], flattenNode);
      } else {
        flattenNode.children = [];
      }
      return flattenNode;
    });
  }
  dig(treeNodeList);
  return flattenList;
}
var _NzTreeBaseService = class _NzTreeBaseService {
  constructor() {
    __publicField(this, "DRAG_SIDE_RANGE", 0.25);
    __publicField(this, "DRAG_MIN_GAP", 2);
    __publicField(this, "isCheckStrictly", false);
    __publicField(this, "isMultiple", false);
    __publicField(this, "selectedNode");
    __publicField(this, "rootNodes", []);
    __publicField(this, "flattenNodes$", new BehaviorSubject([]));
    __publicField(this, "selectedNodeList", []);
    __publicField(this, "expandedNodeList", []);
    __publicField(this, "checkedNodeList", []);
    __publicField(this, "halfCheckedNodeList", []);
    __publicField(this, "matchedNodeList", []);
    /**
     * handle to post process a tree node when it's instantiating, note that its children haven't been initiated yet
     */
    __publicField(this, "treeNodePostProcessor");
  }
  /**
   * reset tree nodes will clear default node list
   */
  initTree(nzNodes) {
    this.rootNodes = nzNodes;
    this.expandedNodeList = [];
    this.selectedNodeList = [];
    this.halfCheckedNodeList = [];
    this.checkedNodeList = [];
    this.matchedNodeList = [];
  }
  flattenTreeData(nzNodes, expandedKeys = []) {
    this.flattenNodes$.next(flattenTreeData(nzNodes, expandedKeys).map((item) => item.data));
  }
  getSelectedNode() {
    return this.selectedNode;
  }
  /**
   * get some list
   */
  getSelectedNodeList() {
    return this.conductNodeState("select");
  }
  /**
   * get checked node keys
   */
  getCheckedNodeKeys() {
    const keys = [];
    const checkedNodes = this.getCheckedNodeList();
    const calc = (nodes) => {
      nodes.forEach((node) => {
        keys.push(node.key);
        if (node.children.length < 1) return;
        calc(node.children);
      });
    };
    calc(checkedNodes);
    return keys;
  }
  /**
   * return checked nodes
   */
  getCheckedNodeList() {
    return this.conductNodeState("check");
  }
  getHalfCheckedNodeList() {
    return this.conductNodeState("halfCheck");
  }
  /**
   * return expanded nodes
   */
  getExpandedNodeList() {
    return this.conductNodeState("expand");
  }
  /**
   * return search matched nodes
   */
  getMatchedNodeList() {
    return this.conductNodeState("match");
  }
  isArrayOfNzTreeNode(value) {
    return value.every((item) => item instanceof NzTreeNode);
  }
  /**
   * set drag node
   */
  setSelectedNode(node) {
    this.selectedNode = node;
  }
  /**
   * set node selected status
   */
  setNodeActive(node) {
    if (!this.isMultiple && node.isSelected) {
      this.selectedNodeList.forEach((n) => {
        if (node.key !== n.key) {
          n.isSelected = false;
        }
      });
      this.selectedNodeList = [];
    }
    this.setSelectedNodeList(node, this.isMultiple);
  }
  /**
   * add or remove node to selectedNodeList
   */
  setSelectedNodeList(node, isMultiple = false) {
    const index = this.getIndexOfArray(this.selectedNodeList, node.key);
    if (isMultiple) {
      if (node.isSelected && index === -1) {
        this.selectedNodeList.push(node);
      }
    } else {
      if (node.isSelected && index === -1) {
        this.selectedNodeList = [node];
      }
    }
    if (!node.isSelected) {
      this.selectedNodeList = this.selectedNodeList.filter((n) => n.key !== node.key);
    }
  }
  /**
   * merge checked nodes
   */
  setHalfCheckedNodeList(node) {
    const index = this.getIndexOfArray(this.halfCheckedNodeList, node.key);
    if (node.isHalfChecked && index === -1) {
      this.halfCheckedNodeList.push(node);
    } else if (!node.isHalfChecked && index > -1) {
      this.halfCheckedNodeList = this.halfCheckedNodeList.filter((n) => node.key !== n.key);
    }
  }
  setCheckedNodeList(node) {
    const index = this.getIndexOfArray(this.checkedNodeList, node.key);
    if (node.isChecked && index === -1) {
      this.checkedNodeList.push(node);
    } else if (!node.isChecked && index > -1) {
      this.checkedNodeList = this.checkedNodeList.filter((n) => node.key !== n.key);
    }
  }
  /**
   * conduct checked/selected/expanded keys
   */
  conductNodeState(type = "check") {
    let resultNodesList = [];
    switch (type) {
      case "select":
        resultNodesList = this.selectedNodeList;
        break;
      case "expand":
        resultNodesList = this.expandedNodeList;
        break;
      case "match":
        resultNodesList = this.matchedNodeList;
        break;
      case "check": {
        resultNodesList = this.checkedNodeList;
        const isIgnore = (node) => {
          const parentNode = node.getParentNode();
          if (parentNode) {
            if (this.checkedNodeList.findIndex((n) => n.key === parentNode.key) > -1) {
              return true;
            } else {
              return isIgnore(parentNode);
            }
          }
          return false;
        };
        if (!this.isCheckStrictly) {
          resultNodesList = this.checkedNodeList.filter((n) => !isIgnore(n));
        }
        break;
      }
      case "halfCheck":
        if (!this.isCheckStrictly) {
          resultNodesList = this.halfCheckedNodeList;
        }
        break;
    }
    return resultNodesList;
  }
  /**
   * set expanded nodes
   */
  setExpandedNodeList(node) {
    if (node.isLeaf) {
      return;
    }
    const index = this.getIndexOfArray(this.expandedNodeList, node.key);
    if (node.isExpanded && index === -1) {
      this.expandedNodeList.push(node);
    } else if (!node.isExpanded && index > -1) {
      this.expandedNodeList.splice(index, 1);
    }
  }
  setMatchedNodeList(node) {
    const index = this.getIndexOfArray(this.matchedNodeList, node.key);
    if (node.isMatched && index === -1) {
      this.matchedNodeList.push(node);
    } else if (!node.isMatched && index > -1) {
      this.matchedNodeList.splice(index, 1);
    }
  }
  /**
   * check state
   *
   * @param isCheckStrictly
   */
  refreshCheckState(isCheckStrictly = false) {
    if (isCheckStrictly) {
      return;
    }
    this.checkedNodeList.forEach((node) => {
      this.conduct(node, isCheckStrictly);
    });
  }
  // reset other node checked state based current node
  conduct(node, isCheckStrictly = false) {
    const isChecked = node.isChecked;
    if (node && !isCheckStrictly) {
      this.conductUp(node);
      this.conductDown(node, isChecked);
    }
  }
  /**
   * 1、children half checked
   * 2、children all checked, parent checked
   * 3、no children checked
   */
  conductUp(node) {
    const parentNode = node.getParentNode();
    if (parentNode) {
      if (!isCheckDisabled(parentNode)) {
        if (parentNode.children.every((child) => isCheckDisabled(child) || !child.isHalfChecked && child.isChecked)) {
          parentNode.isChecked = true;
          parentNode.isHalfChecked = false;
        } else if (parentNode.children.some((child) => child.isHalfChecked || child.isChecked)) {
          parentNode.isChecked = false;
          parentNode.isHalfChecked = true;
        } else {
          parentNode.isChecked = false;
          parentNode.isHalfChecked = false;
        }
      }
      this.setCheckedNodeList(parentNode);
      this.setHalfCheckedNodeList(parentNode);
      this.conductUp(parentNode);
    }
  }
  /**
   * reset child check state
   */
  conductDown(node, value) {
    if (!isCheckDisabled(node)) {
      node.isChecked = value;
      node.isHalfChecked = false;
      this.setCheckedNodeList(node);
      this.setHalfCheckedNodeList(node);
      node.children.forEach((n) => {
        this.conductDown(n, value);
      });
    }
  }
  /**
   * flush after delete node
   */
  afterRemove(nodes) {
    const loopNode = (node) => {
      this.selectedNodeList = this.selectedNodeList.filter((n) => n.key !== node.key);
      this.expandedNodeList = this.expandedNodeList.filter((n) => n.key !== node.key);
      this.checkedNodeList = this.checkedNodeList.filter((n) => n.key !== node.key);
      if (node.children) {
        node.children.forEach((child) => {
          loopNode(child);
        });
      }
    };
    nodes.forEach((n) => {
      loopNode(n);
    });
    this.refreshCheckState(this.isCheckStrictly);
  }
  /**
   * drag event
   */
  refreshDragNode(node) {
    if (node.children.length === 0) {
      this.conductUp(node);
    } else {
      node.children.forEach((child) => {
        this.refreshDragNode(child);
      });
    }
  }
  // reset node level
  resetNodeLevel(node) {
    const parentNode = node.getParentNode();
    if (parentNode) {
      node.level = parentNode.level + 1;
    } else {
      node.level = 0;
    }
    for (const child of node.children) {
      this.resetNodeLevel(child);
    }
  }
  calcDropPosition(event) {
    const {
      clientY
    } = event;
    const {
      top,
      bottom,
      height
    } = event.target.getBoundingClientRect();
    const des = Math.max(height * this.DRAG_SIDE_RANGE, this.DRAG_MIN_GAP);
    if (clientY <= top + des) {
      return -1;
    } else if (clientY >= bottom - des) {
      return 1;
    }
    return 0;
  }
  /**
   * drop
   * 0: inner -1: pre 1: next
   */
  dropAndApply(targetNode, dragPos = -1) {
    if (!targetNode || dragPos > 1) {
      return;
    }
    const treeService = targetNode.treeService;
    const targetParent = targetNode.getParentNode();
    const isSelectedRootNode = this.selectedNode.getParentNode();
    if (isSelectedRootNode) {
      isSelectedRootNode.children = isSelectedRootNode.children.filter((n) => n.key !== this.selectedNode.key);
    } else {
      this.rootNodes = this.rootNodes.filter((n) => n.key !== this.selectedNode.key);
    }
    switch (dragPos) {
      case 0:
        targetNode.addChildren([this.selectedNode]);
        this.resetNodeLevel(targetNode);
        break;
      case -1:
      case 1: {
        const tIndex = dragPos === 1 ? 1 : 0;
        if (targetParent) {
          targetParent.addChildren([this.selectedNode], targetParent.children.indexOf(targetNode) + tIndex);
          const parentNode = this.selectedNode.getParentNode();
          if (parentNode) {
            this.resetNodeLevel(parentNode);
          }
        } else {
          const targetIndex = this.rootNodes.indexOf(targetNode) + tIndex;
          this.rootNodes.splice(targetIndex, 0, this.selectedNode);
          this.rootNodes[targetIndex].parentNode = null;
          this.resetNodeLevel(this.rootNodes[targetIndex]);
        }
        break;
      }
    }
    this.rootNodes.forEach((child) => {
      if (!child.treeService) {
        child.service = treeService;
      }
      this.refreshDragNode(child);
    });
  }
  /**
   * emit Structure
   * eventName
   * node
   * event: MouseEvent / DragEvent
   * dragNode
   */
  formatEvent(eventName, node, event) {
    const emitStructure = {
      eventName,
      node,
      event
    };
    switch (eventName) {
      case "dragstart":
      case "dragenter":
      case "dragover":
      case "dragleave":
      case "drop":
      case "dragend":
        Object.assign(emitStructure, {
          dragNode: this.getSelectedNode()
        });
        break;
      case "click":
      case "dblclick":
        Object.assign(emitStructure, {
          selectedKeys: this.selectedNodeList
        });
        Object.assign(emitStructure, {
          nodes: this.selectedNodeList
        });
        Object.assign(emitStructure, {
          keys: this.selectedNodeList.map((n) => n.key)
        });
        break;
      case "check": {
        const checkedNodeList = this.getCheckedNodeList();
        Object.assign(emitStructure, {
          checkedKeys: checkedNodeList
        });
        Object.assign(emitStructure, {
          nodes: checkedNodeList
        });
        Object.assign(emitStructure, {
          keys: checkedNodeList.map((n) => n.key)
        });
        break;
      }
      case "search":
        Object.assign(emitStructure, {
          matchedKeys: this.getMatchedNodeList()
        });
        Object.assign(emitStructure, {
          nodes: this.getMatchedNodeList()
        });
        Object.assign(emitStructure, {
          keys: this.getMatchedNodeList().map((n) => n.key)
        });
        break;
      case "expand":
        Object.assign(emitStructure, {
          nodes: this.expandedNodeList
        });
        Object.assign(emitStructure, {
          keys: this.expandedNodeList.map((n) => n.key)
        });
        break;
    }
    return emitStructure;
  }
  /**
   * New functions for flatten nodes
   */
  getIndexOfArray(list, key) {
    return list.findIndex((v) => v.key === key);
  }
  /**
   * Render by nzCheckedKeys
   * When keys equals null, just render with checkStrictly
   *
   * @param keys
   * @param checkStrictly
   */
  conductCheck(keys, checkStrictly) {
    this.checkedNodeList = [];
    this.halfCheckedNodeList = [];
    const calc = (nodes) => {
      nodes.forEach((node) => {
        if (keys === null) {
          node.isChecked = !!node.origin.checked;
        } else {
          if (isInArray(node.key, keys || [])) {
            node.isChecked = true;
            node.isHalfChecked = false;
          } else {
            node.isChecked = false;
            node.isHalfChecked = false;
          }
        }
        if (node.children.length > 0) {
          calc(node.children);
        }
      });
    };
    calc(this.rootNodes);
    this.refreshCheckState(checkStrictly);
  }
  conductExpandedKeys(keys = []) {
    const expandedKeySet = new Set(keys === true ? [] : keys);
    this.expandedNodeList = [];
    const calc = (nodes) => {
      nodes.forEach((node) => {
        node.setExpanded(keys === true || expandedKeySet.has(node.key) || node.isExpanded === true);
        if (node.isExpanded) {
          this.setExpandedNodeList(node);
        }
        if (node.children.length > 0) {
          calc(node.children);
        }
      });
    };
    calc(this.rootNodes);
  }
  conductSelectedKeys(keys, isMulti) {
    this.selectedNodeList.forEach((node) => node.isSelected = false);
    this.selectedNodeList = [];
    const calc = (nodes) => nodes.every((node) => {
      if (isInArray(node.key, keys)) {
        node.isSelected = true;
        this.setSelectedNodeList(node);
        if (!isMulti) {
          return false;
        }
      } else {
        node.isSelected = false;
      }
      if (node.children.length > 0) {
        return calc(node.children);
      }
      return true;
    });
    calc(this.rootNodes);
  }
  /**
   * Expand parent nodes by child node
   *
   * @param node
   */
  expandNodeAllParentBySearch(node) {
    const calc = (n) => {
      if (n) {
        n.canHide = false;
        n.setExpanded(true);
        this.setExpandedNodeList(n);
        if (n.getParentNode()) {
          return calc(n.getParentNode());
        }
      }
    };
    calc(node.getParentNode());
  }
};
__publicField(_NzTreeBaseService, "\u0275fac", function NzTreeBaseService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTreeBaseService)();
});
__publicField(_NzTreeBaseService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _NzTreeBaseService,
  factory: _NzTreeBaseService.\u0275fac
}));
var NzTreeBaseService = _NzTreeBaseService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTreeBaseService, [{
    type: Injectable
  }], null, null);
})();
var NzTreeHigherOrderServiceToken = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "nz-tree-higher-order" : "");
var NzTreeBase = class {
  constructor(nzTreeService) {
    __publicField(this, "nzTreeService");
    this.nzTreeService = nzTreeService;
  }
  /**
   * Coerces a value({@link any[]}) to a TreeNodes({@link NzTreeNode[]})
   */
  coerceTreeNodes(value) {
    let nodes = [];
    if (!this.nzTreeService.isArrayOfNzTreeNode(value)) {
      nodes = value.map((item) => new NzTreeNode(item, null, this.nzTreeService));
    } else {
      nodes = value.map((item) => {
        item.service = this.nzTreeService;
        return item;
      });
    }
    return nodes;
  }
  /**
   * Get all nodes({@link NzTreeNode})
   */
  getTreeNodes() {
    return this.nzTreeService.rootNodes;
  }
  /**
   * Get {@link NzTreeNode} with key
   */
  getTreeNodeByKey(key) {
    const nodes = [];
    const getNode = (node) => {
      nodes.push(node);
      node.getChildren().forEach((n) => {
        getNode(n);
      });
    };
    this.getTreeNodes().forEach((n) => {
      getNode(n);
    });
    return nodes.find((n) => n.key === key) || null;
  }
  /**
   * Get checked nodes(merged)
   */
  getCheckedNodeList() {
    return this.nzTreeService.getCheckedNodeList();
  }
  /**
   * Get selected nodes
   */
  getSelectedNodeList() {
    return this.nzTreeService.getSelectedNodeList();
  }
  /**
   * Get half checked nodes
   */
  getHalfCheckedNodeList() {
    return this.nzTreeService.getHalfCheckedNodeList();
  }
  /**
   * Get expanded nodes
   */
  getExpandedNodeList() {
    return this.nzTreeService.getExpandedNodeList();
  }
  /**
   * Get matched nodes(if nzSearchValue is not null)
   */
  getMatchedNodeList() {
    return this.nzTreeService.getMatchedNodeList();
  }
};

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-tree.mjs
function NzTreeIndentComponent_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "span");
  }
  if (rf & 2) {
    const $index_r1 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("ant-tree-indent-unit", !ctx_r1.nzSelectMode)("ant-select-tree-indent-unit", ctx_r1.nzSelectMode)("ant-select-tree-indent-unit-start", ctx_r1.nzSelectMode && ctx_r1.nzIsStart[$index_r1])("ant-tree-indent-unit-start", !ctx_r1.nzSelectMode && ctx_r1.nzIsStart[$index_r1])("ant-select-tree-indent-unit-end", ctx_r1.nzSelectMode && ctx_r1.nzIsEnd[$index_r1])("ant-tree-indent-unit-end", !ctx_r1.nzSelectMode && ctx_r1.nzIsEnd[$index_r1]);
  }
}
var _c0 = ["builtin", ""];
var _c1 = (a0, a1) => ({
  $implicit: a0,
  origin: a1
});
function NzTreeNodeSwitcherComponent_Conditional_0_Conditional_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "nz-icon", 2);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275classProp("ant-select-tree-switcher-icon", ctx_r0.nzSelectMode)("ant-tree-switcher-icon", !ctx_r0.nzSelectMode);
  }
}
function NzTreeNodeSwitcherComponent_Conditional_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTreeNodeSwitcherComponent_Conditional_0_Conditional_0_ng_container_0_Template, 2, 4, "ng-container", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzExpandedIcon)("nzStringTemplateOutletContext", \u0275\u0275pureFunction2(2, _c1, ctx_r0.context, ctx_r0.context.origin));
  }
}
function NzTreeNodeSwitcherComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 0);
  }
  if (rf & 2) {
    \u0275\u0275property("nzSpin", true);
  }
}
function NzTreeNodeSwitcherComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTreeNodeSwitcherComponent_Conditional_0_Conditional_0_Template, 1, 5, "ng-container")(1, NzTreeNodeSwitcherComponent_Conditional_0_Conditional_1_Template, 1, 1, "nz-icon", 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r0.isLoading ? 0 : 1);
  }
}
function NzTreeNodeSwitcherComponent_Conditional_1_Conditional_0_ng_container_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 3);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(4);
    \u0275\u0275property("nzType", ctx_r0.isSwitcherOpen ? "minus-square" : "plus-square");
  }
}
function NzTreeNodeSwitcherComponent_Conditional_1_Conditional_0_ng_container_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 4);
  }
}
function NzTreeNodeSwitcherComponent_Conditional_1_Conditional_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275conditionalCreate(1, NzTreeNodeSwitcherComponent_Conditional_1_Conditional_0_ng_container_0_Conditional_1_Template, 1, 1, "nz-icon", 3)(2, NzTreeNodeSwitcherComponent_Conditional_1_Conditional_0_ng_container_0_Conditional_2_Template, 1, 0, "nz-icon", 4);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isShowLineIcon ? 1 : 2);
  }
}
function NzTreeNodeSwitcherComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NzTreeNodeSwitcherComponent_Conditional_1_Conditional_0_ng_container_0_Template, 3, 1, "ng-container", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r0.nzExpandedIcon)("nzStringTemplateOutletContext", \u0275\u0275pureFunction2(2, _c1, ctx_r0.context, ctx_r0.context.origin));
  }
}
function NzTreeNodeSwitcherComponent_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-icon", 0);
  }
  if (rf & 2) {
    \u0275\u0275property("nzSpin", true);
  }
}
function NzTreeNodeSwitcherComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTreeNodeSwitcherComponent_Conditional_1_Conditional_0_Template, 1, 5, "ng-container")(1, NzTreeNodeSwitcherComponent_Conditional_1_Conditional_1_Template, 1, 1, "nz-icon", 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(!ctx_r0.isLoading ? 0 : 1);
  }
}
function NzTreeNodeTitleComponent_ng_template_0_Template(rf, ctx) {
}
function NzTreeNodeTitleComponent_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span")(1, "span");
    \u0275\u0275element(2, "nz-icon", 4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("ant-tree-icon__open", ctx_r0.isSwitcherOpen)("ant-tree-icon__close", ctx_r0.isSwitcherClose)("ant-tree-icon_loading", ctx_r0.isLoading)("ant-select-tree-iconEle", ctx_r0.selectMode)("ant-tree-iconEle", !ctx_r0.selectMode);
    \u0275\u0275advance();
    \u0275\u0275classProp("ant-select-tree-iconEle", ctx_r0.selectMode)("ant-select-tree-icon__customize", ctx_r0.selectMode)("ant-tree-iconEle", !ctx_r0.selectMode)("ant-tree-icon__customize", !ctx_r0.selectMode);
    \u0275\u0275advance();
    \u0275\u0275property("nzType", ctx_r0.icon);
  }
}
function NzTreeNodeTitleComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, NzTreeNodeTitleComponent_Conditional_1_Conditional_0_Template, 3, 19, "span", 2);
    \u0275\u0275element(1, "span", 3);
    \u0275\u0275pipe(2, "nzHighlight");
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r0.icon && ctx_r0.showIcon ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", \u0275\u0275pipeBind4(2, 2, ctx_r0.title, ctx_r0.matchedValue, "i", "font-highlight"), \u0275\u0275sanitizeHtml);
  }
}
function NzTreeNodeTitleComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-tree-drop-indicator", 1);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("dropPosition", ctx_r0.dragPosition)("level", ctx_r0.context.level);
  }
}
function NzTreeNodeBuiltinComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-tree-node-switcher", 4);
    \u0275\u0275listener("click", function NzTreeNodeBuiltinComponent_Conditional_1_Template_nz_tree_node_switcher_click_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clickExpand($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("nzShowExpand", ctx_r1.nzShowExpand)("nzShowLine", ctx_r1.nzShowLine)("nzExpandedIcon", ctx_r1.nzExpandedIcon)("nzSelectMode", ctx_r1.nzSelectMode)("context", ctx_r1.nzTreeNode)("isLeaf", ctx_r1.isLeaf)("isExpanded", ctx_r1.isExpanded)("isLoading", ctx_r1.isLoading);
  }
}
function NzTreeNodeBuiltinComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-tree-node-checkbox", 5);
    \u0275\u0275listener("click", function NzTreeNodeBuiltinComponent_Conditional_2_Template_nz_tree_node_checkbox_click_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clickCheckbox($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("nzSelectMode", ctx_r1.nzSelectMode)("isChecked", ctx_r1.isChecked)("isHalfChecked", ctx_r1.isHalfChecked)("isDisabled", ctx_r1.isDisabled)("isDisableCheckbox", ctx_r1.isDisableCheckbox);
  }
}
var _c2 = ["nzTreeTemplate"];
var _c3 = () => [];
function NzTreeComponent_Conditional_6_ng_container_1_Template(rf, ctx) {
  var _a, _b;
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "nz-tree-node", 8);
    \u0275\u0275listener("nzExpandChange", function NzTreeComponent_Conditional_6_ng_container_1_Template_nz_tree_node_nzExpandChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzClick", function NzTreeComponent_Conditional_6_ng_container_1_Template_nz_tree_node_nzClick_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzDblClick", function NzTreeComponent_Conditional_6_ng_container_1_Template_nz_tree_node_nzDblClick_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzContextMenu", function NzTreeComponent_Conditional_6_ng_container_1_Template_nz_tree_node_nzContextMenu_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzCheckboxChange", function NzTreeComponent_Conditional_6_ng_container_1_Template_nz_tree_node_nzCheckboxChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzOnDragStart", function NzTreeComponent_Conditional_6_ng_container_1_Template_nz_tree_node_nzOnDragStart_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzOnDragEnter", function NzTreeComponent_Conditional_6_ng_container_1_Template_nz_tree_node_nzOnDragEnter_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzOnDragOver", function NzTreeComponent_Conditional_6_ng_container_1_Template_nz_tree_node_nzOnDragOver_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzOnDragLeave", function NzTreeComponent_Conditional_6_ng_container_1_Template_nz_tree_node_nzOnDragLeave_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzOnDragEnd", function NzTreeComponent_Conditional_6_ng_container_1_Template_nz_tree_node_nzOnDragEnd_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzOnDrop", function NzTreeComponent_Conditional_6_ng_container_1_Template_nz_tree_node_nzOnDrop_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const node_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("icon", node_r3.icon)("title", node_r3.title)("isLoading", node_r3.isLoading)("isSelected", node_r3.isSelected)("isDisabled", node_r3.isDisabled)("isMatched", node_r3.isMatched)("isExpanded", node_r3.isExpanded)("isLeaf", node_r3.isLeaf)("isStart", (_a = node_r3.isStart) != null ? _a : \u0275\u0275pureFunction0(28, _c3))("isEnd", (_b = node_r3.isEnd) != null ? _b : \u0275\u0275pureFunction0(29, _c3))("isChecked", node_r3.isChecked)("isHalfChecked", node_r3.isHalfChecked)("isDisableCheckbox", node_r3.isDisableCheckbox)("isSelectable", node_r3.isSelectable)("canHide", node_r3.canHide)("nzTreeNode", node_r3)("nzSelectMode", ctx_r1.nzSelectMode)("nzShowLine", ctx_r1.nzShowLine)("nzExpandedIcon", ctx_r1.nzExpandedIcon)("nzDraggable", ctx_r1.nzDraggable)("nzCheckable", ctx_r1.nzCheckable)("nzShowExpand", ctx_r1.nzShowExpand)("nzAsyncData", ctx_r1.nzAsyncData)("nzSearchValue", ctx_r1.nzSearchValue)("nzHideUnMatched", ctx_r1.nzHideUnMatched)("nzBeforeDrop", ctx_r1.nzBeforeDrop)("nzShowIcon", ctx_r1.nzShowIcon)("nzTreeTemplate", ctx_r1.nzTreeTemplate || ctx_r1.nzTreeTemplateChild);
  }
}
function NzTreeComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "cdk-virtual-scroll-viewport", 6);
    \u0275\u0275template(1, NzTreeComponent_Conditional_6_ng_container_1_Template, 2, 30, "ng-container", 7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("height", ctx_r1.nzVirtualHeight);
    \u0275\u0275classProp("ant-select-tree-list-holder-inner", ctx_r1.nzSelectMode)("ant-tree-list-holder-inner", !ctx_r1.nzSelectMode);
    \u0275\u0275property("itemSize", ctx_r1.nzVirtualItemSize)("minBufferPx", ctx_r1.nzVirtualMinBufferPx)("maxBufferPx", ctx_r1.nzVirtualMaxBufferPx);
    \u0275\u0275advance();
    \u0275\u0275property("cdkVirtualForOf", ctx_r1.nzFlattenNodes)("cdkVirtualForTrackBy", ctx_r1.trackByFlattenNode);
  }
}
function NzTreeComponent_Conditional_7_For_2_Template(rf, ctx) {
  var _a, _b;
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-tree-node", 10);
    \u0275\u0275listener("nzExpandChange", function NzTreeComponent_Conditional_7_For_2_Template_nz_tree_node_nzExpandChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzClick", function NzTreeComponent_Conditional_7_For_2_Template_nz_tree_node_nzClick_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzDblClick", function NzTreeComponent_Conditional_7_For_2_Template_nz_tree_node_nzDblClick_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzContextMenu", function NzTreeComponent_Conditional_7_For_2_Template_nz_tree_node_nzContextMenu_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzCheckboxChange", function NzTreeComponent_Conditional_7_For_2_Template_nz_tree_node_nzCheckboxChange_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzOnDragStart", function NzTreeComponent_Conditional_7_For_2_Template_nz_tree_node_nzOnDragStart_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzOnDragEnter", function NzTreeComponent_Conditional_7_For_2_Template_nz_tree_node_nzOnDragEnter_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzOnDragOver", function NzTreeComponent_Conditional_7_For_2_Template_nz_tree_node_nzOnDragOver_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzOnDragLeave", function NzTreeComponent_Conditional_7_For_2_Template_nz_tree_node_nzOnDragLeave_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzOnDragEnd", function NzTreeComponent_Conditional_7_For_2_Template_nz_tree_node_nzOnDragEnd_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    })("nzOnDrop", function NzTreeComponent_Conditional_7_For_2_Template_nz_tree_node_nzOnDrop_0_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.eventTriggerChanged($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const node_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("icon", node_r5.icon)("title", node_r5.title)("isLoading", node_r5.isLoading)("isSelected", node_r5.isSelected)("isDisabled", node_r5.isDisabled)("isMatched", node_r5.isMatched)("isExpanded", node_r5.isExpanded)("isLeaf", node_r5.isLeaf)("isStart", (_a = node_r5.isStart) != null ? _a : \u0275\u0275pureFunction0(28, _c3))("isEnd", (_b = node_r5.isEnd) != null ? _b : \u0275\u0275pureFunction0(29, _c3))("isChecked", node_r5.isChecked)("isHalfChecked", node_r5.isHalfChecked)("isDisableCheckbox", node_r5.isDisableCheckbox)("isSelectable", node_r5.isSelectable)("canHide", node_r5.canHide)("nzTreeNode", node_r5)("nzSelectMode", ctx_r1.nzSelectMode)("nzShowLine", ctx_r1.nzShowLine)("nzExpandedIcon", ctx_r1.nzExpandedIcon)("nzDraggable", ctx_r1.nzDraggable)("nzCheckable", ctx_r1.nzCheckable)("nzShowExpand", ctx_r1.nzShowExpand)("nzAsyncData", ctx_r1.nzAsyncData)("nzSearchValue", ctx_r1.nzSearchValue)("nzHideUnMatched", ctx_r1.nzHideUnMatched)("nzBeforeDrop", ctx_r1.nzBeforeDrop)("nzShowIcon", ctx_r1.nzShowIcon)("nzTreeTemplate", ctx_r1.nzTreeTemplate || ctx_r1.nzTreeTemplateChild);
  }
}
function NzTreeComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275repeaterCreate(1, NzTreeComponent_Conditional_7_For_2_Template, 1, 30, "nz-tree-node", 9, \u0275\u0275componentInstance().trackByFlattenNode, true);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("ant-select-tree-list-holder-inner", ctx_r1.nzSelectMode)("ant-tree-list-holder-inner", !ctx_r1.nzSelectMode);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.nzFlattenNodes);
  }
}
var _NzTreeDropIndicatorComponent = class _NzTreeDropIndicatorComponent {
  constructor() {
    __publicField(this, "dropPosition");
    __publicField(this, "level", 1);
    __publicField(this, "direction", "ltr");
    __publicField(this, "style", {});
    __publicField(this, "cdr", inject(ChangeDetectorRef));
  }
  ngOnChanges() {
    this.renderIndicator(this.dropPosition, this.direction);
  }
  renderIndicator(dropPosition, direction = "ltr") {
    const offset = 4;
    const startPosition = direction === "ltr" ? "left" : "right";
    const endPosition = direction === "ltr" ? "right" : "left";
    const style = {
      [startPosition]: `${offset}px`,
      [endPosition]: "0px"
    };
    switch (dropPosition) {
      case -1:
        style.top = `${-3}px`;
        break;
      case 1:
        style.bottom = `${-3}px`;
        break;
      case 0:
        style.bottom = `${-3}px`;
        style[startPosition] = `${offset + 24}px`;
        break;
      default:
        style.display = "none";
        break;
    }
    this.style = style;
    this.cdr.markForCheck();
  }
};
__publicField(_NzTreeDropIndicatorComponent, "\u0275fac", function NzTreeDropIndicatorComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTreeDropIndicatorComponent)();
});
__publicField(_NzTreeDropIndicatorComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTreeDropIndicatorComponent,
  selectors: [["nz-tree-drop-indicator"]],
  hostAttrs: [1, "ant-tree-drop-indicator"],
  hostVars: 2,
  hostBindings: function NzTreeDropIndicatorComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleMap(ctx.style);
    }
  },
  inputs: {
    dropPosition: "dropPosition",
    level: [2, "level", "level", numberAttribute],
    direction: "direction"
  },
  exportAs: ["nzTreeDropIndicator"],
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 0,
  vars: 0,
  template: function NzTreeDropIndicatorComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzTreeDropIndicatorComponent = _NzTreeDropIndicatorComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTreeDropIndicatorComponent, [{
    type: Component,
    args: [{
      selector: "nz-tree-drop-indicator",
      exportAs: "nzTreeDropIndicator",
      template: ``,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        class: "ant-tree-drop-indicator",
        "[style]": "style"
      }
    }]
  }], null, {
    dropPosition: [{
      type: Input
    }],
    level: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    direction: [{
      type: Input
    }]
  });
})();
var _NzTreeIndentComponent = class _NzTreeIndentComponent {
  constructor() {
    __publicField(this, "nzTreeLevel", 0);
    __publicField(this, "nzIsStart", []);
    __publicField(this, "nzIsEnd", []);
    __publicField(this, "nzSelectMode", false);
    __publicField(this, "listOfUnit", []);
  }
  ngOnChanges(changes) {
    const {
      nzTreeLevel
    } = changes;
    if (nzTreeLevel) {
      this.listOfUnit = [...new Array(nzTreeLevel.currentValue || 0)];
    }
  }
};
__publicField(_NzTreeIndentComponent, "\u0275fac", function NzTreeIndentComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTreeIndentComponent)();
});
__publicField(_NzTreeIndentComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTreeIndentComponent,
  selectors: [["nz-tree-indent"]],
  hostVars: 5,
  hostBindings: function NzTreeIndentComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275attribute("aria-hidden", true);
      \u0275\u0275classProp("ant-tree-indent", !ctx.nzSelectMode)("ant-select-tree-indent", ctx.nzSelectMode);
    }
  },
  inputs: {
    nzTreeLevel: "nzTreeLevel",
    nzIsStart: "nzIsStart",
    nzIsEnd: "nzIsEnd",
    nzSelectMode: "nzSelectMode"
  },
  exportAs: ["nzTreeIndent"],
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 2,
  vars: 0,
  consts: [[3, "ant-tree-indent-unit", "ant-select-tree-indent-unit", "ant-select-tree-indent-unit-start", "ant-tree-indent-unit-start", "ant-select-tree-indent-unit-end", "ant-tree-indent-unit-end"]],
  template: function NzTreeIndentComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275repeaterCreate(0, NzTreeIndentComponent_For_1_Template, 1, 12, "span", 0, \u0275\u0275repeaterTrackByIndex);
    }
    if (rf & 2) {
      \u0275\u0275repeater(ctx.listOfUnit);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzTreeIndentComponent = _NzTreeIndentComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTreeIndentComponent, [{
    type: Component,
    args: [{
      selector: "nz-tree-indent",
      exportAs: "nzTreeIndent",
      template: `
    @for (_ of listOfUnit; track $index) {
      <span
        [class.ant-tree-indent-unit]="!nzSelectMode"
        [class.ant-select-tree-indent-unit]="nzSelectMode"
        [class.ant-select-tree-indent-unit-start]="nzSelectMode && nzIsStart[$index]"
        [class.ant-tree-indent-unit-start]="!nzSelectMode && nzIsStart[$index]"
        [class.ant-select-tree-indent-unit-end]="nzSelectMode && nzIsEnd[$index]"
        [class.ant-tree-indent-unit-end]="!nzSelectMode && nzIsEnd[$index]"
      ></span>
    }
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[attr.aria-hidden]": "true",
        "[class.ant-tree-indent]": "!nzSelectMode",
        "[class.ant-select-tree-indent]": "nzSelectMode"
      }
    }]
  }], null, {
    nzTreeLevel: [{
      type: Input
    }],
    nzIsStart: [{
      type: Input
    }],
    nzIsEnd: [{
      type: Input
    }],
    nzSelectMode: [{
      type: Input
    }]
  });
})();
var _NzTreeNodeBuiltinCheckboxComponent = class _NzTreeNodeBuiltinCheckboxComponent {
  constructor() {
    __publicField(this, "nzSelectMode", false);
    __publicField(this, "isChecked");
    __publicField(this, "isHalfChecked");
    __publicField(this, "isDisabled");
    __publicField(this, "isDisableCheckbox");
  }
};
__publicField(_NzTreeNodeBuiltinCheckboxComponent, "\u0275fac", function NzTreeNodeBuiltinCheckboxComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTreeNodeBuiltinCheckboxComponent)();
});
__publicField(_NzTreeNodeBuiltinCheckboxComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTreeNodeBuiltinCheckboxComponent,
  selectors: [["nz-tree-node-checkbox", "builtin", ""]],
  hostVars: 16,
  hostBindings: function NzTreeNodeBuiltinCheckboxComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-select-tree-checkbox", ctx.nzSelectMode)("ant-select-tree-checkbox-checked", ctx.nzSelectMode && ctx.isChecked)("ant-select-tree-checkbox-indeterminate", ctx.nzSelectMode && ctx.isHalfChecked)("ant-select-tree-checkbox-disabled", ctx.nzSelectMode && (ctx.isDisabled || ctx.isDisableCheckbox))("ant-tree-checkbox", !ctx.nzSelectMode)("ant-tree-checkbox-checked", !ctx.nzSelectMode && ctx.isChecked)("ant-tree-checkbox-indeterminate", !ctx.nzSelectMode && ctx.isHalfChecked)("ant-tree-checkbox-disabled", !ctx.nzSelectMode && (ctx.isDisabled || ctx.isDisableCheckbox));
    }
  },
  inputs: {
    nzSelectMode: "nzSelectMode",
    isChecked: [2, "isChecked", "isChecked", booleanAttribute],
    isHalfChecked: [2, "isHalfChecked", "isHalfChecked", booleanAttribute],
    isDisabled: [2, "isDisabled", "isDisabled", booleanAttribute],
    isDisableCheckbox: [2, "isDisableCheckbox", "isDisableCheckbox", booleanAttribute]
  },
  attrs: _c0,
  decls: 1,
  vars: 4,
  template: function NzTreeNodeBuiltinCheckboxComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElement(0, "span");
    }
    if (rf & 2) {
      \u0275\u0275classProp("ant-tree-checkbox-inner", !ctx.nzSelectMode)("ant-select-tree-checkbox-inner", ctx.nzSelectMode);
    }
  },
  encapsulation: 2,
  changeDetection: 0
}));
var NzTreeNodeBuiltinCheckboxComponent = _NzTreeNodeBuiltinCheckboxComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTreeNodeBuiltinCheckboxComponent, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "nz-tree-node-checkbox[builtin]",
      template: `
    <span [class.ant-tree-checkbox-inner]="!nzSelectMode" [class.ant-select-tree-checkbox-inner]="nzSelectMode"></span>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class.ant-select-tree-checkbox]": `nzSelectMode`,
        "[class.ant-select-tree-checkbox-checked]": `nzSelectMode && isChecked`,
        "[class.ant-select-tree-checkbox-indeterminate]": `nzSelectMode && isHalfChecked`,
        "[class.ant-select-tree-checkbox-disabled]": `nzSelectMode && (isDisabled || isDisableCheckbox)`,
        "[class.ant-tree-checkbox]": `!nzSelectMode`,
        "[class.ant-tree-checkbox-checked]": `!nzSelectMode && isChecked`,
        "[class.ant-tree-checkbox-indeterminate]": `!nzSelectMode && isHalfChecked`,
        "[class.ant-tree-checkbox-disabled]": `!nzSelectMode && (isDisabled || isDisableCheckbox)`
      }
    }]
  }], null, {
    nzSelectMode: [{
      type: Input
    }],
    isChecked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isHalfChecked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isDisableCheckbox: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzTreeNodeSwitcherComponent = class _NzTreeNodeSwitcherComponent {
  constructor() {
    __publicField(this, "nzShowExpand");
    __publicField(this, "nzShowLine");
    __publicField(this, "nzExpandedIcon");
    __publicField(this, "nzSelectMode", false);
    __publicField(this, "context");
    __publicField(this, "isLeaf");
    __publicField(this, "isLoading");
    __publicField(this, "isExpanded");
  }
  get isShowLineIcon() {
    return !this.isLeaf && !!this.nzShowLine;
  }
  get isShowSwitchIcon() {
    return !this.isLeaf && !this.nzShowLine;
  }
  get isSwitcherOpen() {
    return !!this.isExpanded && !this.isLeaf;
  }
  get isSwitcherClose() {
    return !this.isExpanded && !this.isLeaf;
  }
};
__publicField(_NzTreeNodeSwitcherComponent, "\u0275fac", function NzTreeNodeSwitcherComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTreeNodeSwitcherComponent)();
});
__publicField(_NzTreeNodeSwitcherComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTreeNodeSwitcherComponent,
  selectors: [["nz-tree-node-switcher"]],
  hostVars: 16,
  hostBindings: function NzTreeNodeSwitcherComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("ant-select-tree-switcher", ctx.nzSelectMode)("ant-select-tree-switcher-noop", ctx.nzSelectMode && ctx.isLeaf)("ant-select-tree-switcher_open", ctx.nzSelectMode && ctx.isSwitcherOpen)("ant-select-tree-switcher_close", ctx.nzSelectMode && ctx.isSwitcherClose)("ant-tree-switcher", !ctx.nzSelectMode)("ant-tree-switcher-noop", !ctx.nzSelectMode && ctx.isLeaf)("ant-tree-switcher_open", !ctx.nzSelectMode && ctx.isSwitcherOpen)("ant-tree-switcher_close", !ctx.nzSelectMode && ctx.isSwitcherClose);
    }
  },
  inputs: {
    nzShowExpand: [2, "nzShowExpand", "nzShowExpand", booleanAttribute],
    nzShowLine: [2, "nzShowLine", "nzShowLine", booleanAttribute],
    nzExpandedIcon: "nzExpandedIcon",
    nzSelectMode: "nzSelectMode",
    context: "context",
    isLeaf: [2, "isLeaf", "isLeaf", booleanAttribute],
    isLoading: [2, "isLoading", "isLoading", booleanAttribute],
    isExpanded: [2, "isExpanded", "isExpanded", booleanAttribute]
  },
  decls: 2,
  vars: 2,
  consts: [["nzType", "loading", 1, "ant-tree-switcher-loading-icon", 3, "nzSpin"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"], ["nzType", "caret-down"], [1, "ant-tree-switcher-line-icon", 3, "nzType"], ["nzType", "file", 1, "ant-tree-switcher-line-icon"]],
  template: function NzTreeNodeSwitcherComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, NzTreeNodeSwitcherComponent_Conditional_0_Template, 2, 1);
      \u0275\u0275conditionalCreate(1, NzTreeNodeSwitcherComponent_Conditional_1_Template, 2, 1);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.isShowSwitchIcon ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzShowLine ? 1 : -1);
    }
  },
  dependencies: [NzIconModule, NzIconDirective, NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTreeNodeSwitcherComponent = _NzTreeNodeSwitcherComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTreeNodeSwitcherComponent, [{
    type: Component,
    args: [{
      selector: "nz-tree-node-switcher",
      template: `
    @if (isShowSwitchIcon) {
      @if (!isLoading) {
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          <nz-icon
            nzType="caret-down"
            [class.ant-select-tree-switcher-icon]="nzSelectMode"
            [class.ant-tree-switcher-icon]="!nzSelectMode"
          />
        </ng-container>
      } @else {
        <nz-icon nzType="loading" [nzSpin]="true" class="ant-tree-switcher-loading-icon" />
      }
    }
    @if (nzShowLine) {
      @if (!isLoading) {
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          @if (isShowLineIcon) {
            <nz-icon [nzType]="isSwitcherOpen ? 'minus-square' : 'plus-square'" class="ant-tree-switcher-line-icon" />
          } @else {
            <nz-icon nzType="file" class="ant-tree-switcher-line-icon" />
          }
        </ng-container>
      } @else {
        <nz-icon nzType="loading" [nzSpin]="true" class="ant-tree-switcher-loading-icon" />
      }
    }
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class.ant-select-tree-switcher]": "nzSelectMode",
        "[class.ant-select-tree-switcher-noop]": "nzSelectMode && isLeaf",
        "[class.ant-select-tree-switcher_open]": "nzSelectMode && isSwitcherOpen",
        "[class.ant-select-tree-switcher_close]": "nzSelectMode && isSwitcherClose",
        "[class.ant-tree-switcher]": "!nzSelectMode",
        "[class.ant-tree-switcher-noop]": "!nzSelectMode && isLeaf",
        "[class.ant-tree-switcher_open]": "!nzSelectMode && isSwitcherOpen",
        "[class.ant-tree-switcher_close]": "!nzSelectMode && isSwitcherClose"
      },
      imports: [NzIconModule, NzOutletModule]
    }]
  }], null, {
    nzShowExpand: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowLine: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzExpandedIcon: [{
      type: Input
    }],
    nzSelectMode: [{
      type: Input
    }],
    context: [{
      type: Input
    }],
    isLeaf: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isLoading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isExpanded: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzTreeNodeTitleComponent = class _NzTreeNodeTitleComponent {
  constructor() {
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "searchValue");
    __publicField(this, "treeTemplate", null);
    __publicField(this, "draggable");
    __publicField(this, "showIcon");
    __publicField(this, "selectMode", false);
    __publicField(this, "context");
    __publicField(this, "icon");
    __publicField(this, "title");
    __publicField(this, "isLoading");
    __publicField(this, "isSelected");
    __publicField(this, "isDisabled");
    __publicField(this, "isMatched");
    __publicField(this, "isExpanded");
    __publicField(this, "isLeaf");
    // Drag indicator
    __publicField(this, "showIndicator", true);
    __publicField(this, "dragPosition");
  }
  get canDraggable() {
    return this.draggable && !this.isDisabled ? true : null;
  }
  get matchedValue() {
    return this.isMatched ? this.searchValue : "";
  }
  get isSwitcherOpen() {
    return this.isExpanded && !this.isLeaf;
  }
  get isSwitcherClose() {
    return !this.isExpanded && !this.isLeaf;
  }
  ngOnChanges(changes) {
    const {
      showIndicator,
      dragPosition
    } = changes;
    if (showIndicator || dragPosition) {
      this.cdr.markForCheck();
    }
  }
};
__publicField(_NzTreeNodeTitleComponent, "\u0275fac", function NzTreeNodeTitleComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTreeNodeTitleComponent)();
});
__publicField(_NzTreeNodeTitleComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTreeNodeTitleComponent,
  selectors: [["nz-tree-node-title"]],
  hostVars: 21,
  hostBindings: function NzTreeNodeTitleComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275attribute("title", ctx.title)("draggable", ctx.canDraggable)("aria-grabbed", ctx.canDraggable);
      \u0275\u0275classProp("draggable", ctx.canDraggable)("ant-select-tree-node-content-wrapper", ctx.selectMode)("ant-select-tree-node-content-wrapper-open", ctx.selectMode && ctx.isSwitcherOpen)("ant-select-tree-node-content-wrapper-close", ctx.selectMode && ctx.isSwitcherClose)("ant-select-tree-node-selected", ctx.selectMode && ctx.isSelected)("ant-tree-node-content-wrapper", !ctx.selectMode)("ant-tree-node-content-wrapper-open", !ctx.selectMode && ctx.isSwitcherOpen)("ant-tree-node-content-wrapper-close", !ctx.selectMode && ctx.isSwitcherClose)("ant-tree-node-selected", !ctx.selectMode && ctx.isSelected);
    }
  },
  inputs: {
    searchValue: "searchValue",
    treeTemplate: "treeTemplate",
    draggable: [2, "draggable", "draggable", booleanAttribute],
    showIcon: [2, "showIcon", "showIcon", booleanAttribute],
    selectMode: "selectMode",
    context: "context",
    icon: "icon",
    title: "title",
    isLoading: [2, "isLoading", "isLoading", booleanAttribute],
    isSelected: [2, "isSelected", "isSelected", booleanAttribute],
    isDisabled: [2, "isDisabled", "isDisabled", booleanAttribute],
    isMatched: [2, "isMatched", "isMatched", booleanAttribute],
    isExpanded: [2, "isExpanded", "isExpanded", booleanAttribute],
    isLeaf: [2, "isLeaf", "isLeaf", booleanAttribute],
    showIndicator: "showIndicator",
    dragPosition: "dragPosition"
  },
  features: [\u0275\u0275NgOnChangesFeature],
  decls: 3,
  vars: 7,
  consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "dropPosition", "level"], [3, "ant-tree-icon__open", "ant-tree-icon__close", "ant-tree-icon_loading", "ant-select-tree-iconEle", "ant-tree-iconEle"], [1, "ant-tree-title", 3, "innerHTML"], [3, "nzType"]],
  template: function NzTreeNodeTitleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzTreeNodeTitleComponent_ng_template_0_Template, 0, 0, "ng-template", 0);
      \u0275\u0275conditionalCreate(1, NzTreeNodeTitleComponent_Conditional_1_Template, 3, 7);
      \u0275\u0275conditionalCreate(2, NzTreeNodeTitleComponent_Conditional_2_Template, 1, 2, "nz-tree-drop-indicator", 1);
    }
    if (rf & 2) {
      \u0275\u0275property("ngTemplateOutlet", ctx.treeTemplate)("ngTemplateOutletContext", \u0275\u0275pureFunction2(4, _c1, ctx.context, ctx.context.origin));
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.treeTemplate ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showIndicator ? 2 : -1);
    }
  },
  dependencies: [NgTemplateOutlet, NzIconModule, NzIconDirective, NzTreeDropIndicatorComponent, NzHighlightPipe],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTreeNodeTitleComponent = _NzTreeNodeTitleComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTreeNodeTitleComponent, [{
    type: Component,
    args: [{
      selector: "nz-tree-node-title",
      template: `
    <ng-template
      [ngTemplateOutlet]="treeTemplate"
      [ngTemplateOutletContext]="{ $implicit: context, origin: context.origin }"
    />
    @if (!treeTemplate) {
      @if (icon && showIcon) {
        <span
          [class.ant-tree-icon__open]="isSwitcherOpen"
          [class.ant-tree-icon__close]="isSwitcherClose"
          [class.ant-tree-icon_loading]="isLoading"
          [class.ant-select-tree-iconEle]="selectMode"
          [class.ant-tree-iconEle]="!selectMode"
        >
          <span
            [class.ant-select-tree-iconEle]="selectMode"
            [class.ant-select-tree-icon__customize]="selectMode"
            [class.ant-tree-iconEle]="!selectMode"
            [class.ant-tree-icon__customize]="!selectMode"
          >
            <nz-icon [nzType]="icon" />
          </span>
        </span>
      }
      <span class="ant-tree-title" [innerHTML]="title | nzHighlight: matchedValue : 'i' : 'font-highlight'"></span>
    }
    @if (showIndicator) {
      <nz-tree-drop-indicator [dropPosition]="dragPosition" [level]="context.level" />
    }
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[attr.title]": "title",
        "[attr.draggable]": "canDraggable",
        "[attr.aria-grabbed]": "canDraggable",
        "[class.draggable]": "canDraggable",
        "[class.ant-select-tree-node-content-wrapper]": `selectMode`,
        "[class.ant-select-tree-node-content-wrapper-open]": `selectMode && isSwitcherOpen`,
        "[class.ant-select-tree-node-content-wrapper-close]": `selectMode && isSwitcherClose`,
        "[class.ant-select-tree-node-selected]": `selectMode && isSelected`,
        "[class.ant-tree-node-content-wrapper]": `!selectMode`,
        "[class.ant-tree-node-content-wrapper-open]": `!selectMode && isSwitcherOpen`,
        "[class.ant-tree-node-content-wrapper-close]": `!selectMode && isSwitcherClose`,
        "[class.ant-tree-node-selected]": `!selectMode && isSelected`
      },
      imports: [NgTemplateOutlet, NzIconModule, NzHighlightPipe, NzTreeDropIndicatorComponent]
    }]
  }], null, {
    searchValue: [{
      type: Input
    }],
    treeTemplate: [{
      type: Input
    }],
    draggable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showIcon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectMode: [{
      type: Input
    }],
    context: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    isLoading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isSelected: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isMatched: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isExpanded: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isLeaf: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    showIndicator: [{
      type: Input
    }],
    dragPosition: [{
      type: Input
    }]
  });
})();
var _NzTreeNodeBuiltinComponent = class _NzTreeNodeBuiltinComponent {
  constructor() {
    __publicField(this, "nzTreeService", inject(NzTreeBaseService));
    __publicField(this, "ngZone", inject(NgZone));
    __publicField(this, "renderer", inject(Renderer2));
    __publicField(this, "el", inject(ElementRef).nativeElement);
    __publicField(this, "cdr", inject(ChangeDetectorRef));
    __publicField(this, "destroyRef", inject(DestroyRef));
    __publicField(this, "icon", "");
    __publicField(this, "title", "");
    __publicField(this, "isLoading", false);
    __publicField(this, "isSelected", false);
    __publicField(this, "isDisabled", false);
    __publicField(this, "isMatched", false);
    __publicField(this, "isExpanded");
    __publicField(this, "isLeaf");
    __publicField(this, "isChecked");
    __publicField(this, "isHalfChecked");
    __publicField(this, "isDisableCheckbox");
    __publicField(this, "isSelectable");
    __publicField(this, "canHide");
    __publicField(this, "isStart", []);
    __publicField(this, "isEnd", []);
    __publicField(this, "nzTreeNode");
    __publicField(this, "nzShowLine");
    __publicField(this, "nzShowExpand");
    __publicField(this, "nzCheckable");
    __publicField(this, "nzAsyncData");
    __publicField(this, "nzHideUnMatched", false);
    __publicField(this, "nzNoAnimation", false);
    __publicField(this, "nzSelectMode", false);
    __publicField(this, "nzShowIcon", false);
    __publicField(this, "nzExpandedIcon");
    __publicField(this, "nzTreeTemplate", null);
    __publicField(this, "nzBeforeDrop");
    __publicField(this, "nzSearchValue", "");
    __publicField(this, "nzDraggable", false);
    __publicField(this, "nzClick", new EventEmitter());
    __publicField(this, "nzDblClick", new EventEmitter());
    __publicField(this, "nzContextMenu", new EventEmitter());
    __publicField(this, "nzCheckboxChange", new EventEmitter());
    __publicField(this, "nzExpandChange", new EventEmitter());
    __publicField(this, "nzOnDragStart", new EventEmitter());
    __publicField(this, "nzOnDragEnter", new EventEmitter());
    __publicField(this, "nzOnDragOver", new EventEmitter());
    __publicField(this, "nzOnDragLeave", new EventEmitter());
    __publicField(this, "nzOnDrop", new EventEmitter());
    __publicField(this, "nzOnDragEnd", new EventEmitter());
    /**
     * drag var
     */
    __publicField(this, "destroy$", new Subject());
    __publicField(this, "dragPos", 2);
    __publicField(this, "dragPosClass", {
      0: "drag-over",
      1: "drag-over-gap-bottom",
      "-1": "drag-over-gap-top"
    });
    __publicField(this, "draggingKey", null);
    __publicField(this, "showIndicator", false);
    this.destroyRef.onDestroy(() => {
      this.destroy$.next();
      this.destroy$.complete();
    });
  }
  /**
   * default set
   */
  get displayStyle() {
    return this.nzSearchValue && this.nzHideUnMatched && !this.isMatched && !this.isExpanded && this.canHide ? "none" : "";
  }
  get isSwitcherOpen() {
    return this.isExpanded && !this.isLeaf;
  }
  get isSwitcherClose() {
    return !this.isExpanded && !this.isLeaf;
  }
  clickExpand(event) {
    event.preventDefault();
    if (!this.isLoading && !this.isLeaf) {
      if (this.nzAsyncData && this.nzTreeNode.children.length === 0 && !this.isExpanded) {
        this.nzTreeNode.isLoading = true;
      }
      this.nzTreeNode.setExpanded(!this.isExpanded);
    }
    this.nzTreeService.setExpandedNodeList(this.nzTreeNode);
    const eventNext = this.nzTreeService.formatEvent("expand", this.nzTreeNode, event);
    this.nzExpandChange.emit(eventNext);
  }
  clickSelect(event) {
    event.preventDefault();
    if (this.isSelectable && !this.isDisabled) {
      this.nzTreeNode.isSelected = !this.nzTreeNode.isSelected;
    }
    this.nzTreeService.setSelectedNodeList(this.nzTreeNode);
    const eventNext = this.nzTreeService.formatEvent("click", this.nzTreeNode, event);
    this.nzClick.emit(eventNext);
  }
  dblClick(event) {
    event.preventDefault();
    const eventNext = this.nzTreeService.formatEvent("dblclick", this.nzTreeNode, event);
    this.nzDblClick.emit(eventNext);
  }
  contextMenu(event) {
    const eventNext = this.nzTreeService.formatEvent("contextmenu", this.nzTreeNode, event);
    this.nzContextMenu.emit(eventNext);
  }
  clickCheckbox(event) {
    event.preventDefault();
    if (this.isDisabled || this.isDisableCheckbox) {
      return;
    }
    this.nzTreeNode.isChecked = !this.nzTreeNode.isChecked;
    this.nzTreeNode.isHalfChecked = false;
    this.nzTreeService.setCheckedNodeList(this.nzTreeNode);
    const eventNext = this.nzTreeService.formatEvent("check", this.nzTreeNode, event);
    this.nzCheckboxChange.emit(eventNext);
  }
  clearDragClass() {
    const dragClass = ["drag-over-gap-top", "drag-over-gap-bottom", "drag-over", "drop-target"];
    dragClass.forEach((e) => this.renderer.removeClass(this.el, e));
  }
  handleDragStart(e) {
    try {
      e.dataTransfer.setData("text/plain", this.nzTreeNode.key);
    } catch {
    }
    this.nzTreeService.setSelectedNode(this.nzTreeNode);
    this.draggingKey = this.nzTreeNode.key;
    const eventNext = this.nzTreeService.formatEvent("dragstart", this.nzTreeNode, e);
    this.nzOnDragStart.emit(eventNext);
  }
  handleDragEnter(e) {
    var _a;
    e.preventDefault();
    this.showIndicator = this.nzTreeNode.key !== ((_a = this.nzTreeService.getSelectedNode()) == null ? void 0 : _a.key);
    this.renderIndicator(2);
    this.ngZone.run(() => {
      const eventNext = this.nzTreeService.formatEvent("dragenter", this.nzTreeNode, e);
      this.nzOnDragEnter.emit(eventNext);
    });
  }
  handleDragOver(e) {
    e.preventDefault();
    const dropPosition = this.nzTreeService.calcDropPosition(e);
    if (this.dragPos !== dropPosition) {
      this.clearDragClass();
      this.renderIndicator(dropPosition);
      if (!(this.dragPos === 0 && this.isLeaf)) {
        this.renderer.addClass(this.el, this.dragPosClass[this.dragPos]);
        this.renderer.addClass(this.el, "drop-target");
      }
    }
    const eventNext = this.nzTreeService.formatEvent("dragover", this.nzTreeNode, e);
    this.nzOnDragOver.emit(eventNext);
  }
  handleDragLeave(e) {
    e.preventDefault();
    this.renderIndicator(2);
    this.clearDragClass();
    const eventNext = this.nzTreeService.formatEvent("dragleave", this.nzTreeNode, e);
    this.nzOnDragLeave.emit(eventNext);
  }
  handleDragDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.ngZone.run(() => {
      this.showIndicator = false;
      this.clearDragClass();
      const node = this.nzTreeService.getSelectedNode();
      if (!node || node && node.key === this.nzTreeNode.key || this.dragPos === 0 && this.isLeaf) {
        return;
      }
      const dropEvent = this.nzTreeService.formatEvent("drop", this.nzTreeNode, e);
      const dragEndEvent = this.nzTreeService.formatEvent("dragend", this.nzTreeNode, e);
      if (this.nzBeforeDrop) {
        this.nzBeforeDrop({
          dragNode: this.nzTreeService.getSelectedNode(),
          node: this.nzTreeNode,
          pos: this.dragPos
        }).subscribe((canDrop) => {
          if (canDrop) {
            this.nzTreeService.dropAndApply(this.nzTreeNode, this.dragPos);
          }
          this.nzOnDrop.emit(dropEvent);
          this.nzOnDragEnd.emit(dragEndEvent);
        });
      } else if (this.nzTreeNode) {
        this.nzTreeService.dropAndApply(this.nzTreeNode, this.dragPos);
        this.nzOnDrop.emit(dropEvent);
      }
    });
  }
  handleDragEnd(e) {
    e.preventDefault();
    this.ngZone.run(() => {
      if (!this.nzBeforeDrop) {
        this.draggingKey = null;
        const eventNext = this.nzTreeService.formatEvent("dragend", this.nzTreeNode, e);
        this.nzOnDragEnd.emit(eventNext);
      } else {
        this.draggingKey = null;
        this.markForCheck();
      }
    });
  }
  /**
   * Listening to dragging events.
   */
  handDragEvent() {
    if (this.nzDraggable) {
      this.destroy$ = new Subject();
      fromEventOutsideAngular(this.el, "dragstart").pipe(takeUntil(this.destroy$)).subscribe((e) => this.handleDragStart(e));
      fromEventOutsideAngular(this.el, "dragenter").pipe(takeUntil(this.destroy$)).subscribe((e) => this.handleDragEnter(e));
      fromEventOutsideAngular(this.el, "dragover").pipe(takeUntil(this.destroy$)).subscribe((e) => this.handleDragOver(e));
      fromEventOutsideAngular(this.el, "dragleave").pipe(takeUntil(this.destroy$)).subscribe((e) => this.handleDragLeave(e));
      fromEventOutsideAngular(this.el, "drop").pipe(takeUntil(this.destroy$)).subscribe((e) => this.handleDragDrop(e));
      fromEventOutsideAngular(this.el, "dragend").pipe(takeUntil(this.destroy$)).subscribe((e) => this.handleDragEnd(e));
    } else {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }
  markForCheck() {
    this.cdr.markForCheck();
  }
  ngOnInit() {
    this.nzTreeNode.component = this;
    fromEventOutsideAngular(this.el, "mousedown").pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (this.nzSelectMode) {
        event.preventDefault();
      }
    });
  }
  ngOnChanges(changes) {
    const {
      nzDraggable
    } = changes;
    if (nzDraggable) {
      this.handDragEvent();
    }
  }
  renderIndicator(dropPosition) {
    this.ngZone.run(() => {
      var _a;
      this.showIndicator = dropPosition !== 2;
      if (this.nzTreeNode.key === ((_a = this.nzTreeService.getSelectedNode()) == null ? void 0 : _a.key) || dropPosition === 0 && this.isLeaf) {
        return;
      }
      this.dragPos = dropPosition;
      this.cdr.markForCheck();
    });
  }
};
__publicField(_NzTreeNodeBuiltinComponent, "\u0275fac", function NzTreeNodeBuiltinComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTreeNodeBuiltinComponent)();
});
__publicField(_NzTreeNodeBuiltinComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzTreeNodeBuiltinComponent,
  selectors: [["nz-tree-node", "builtin", ""]],
  hostVars: 36,
  hostBindings: function NzTreeNodeBuiltinComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("display", ctx.displayStyle);
      \u0275\u0275classProp("ant-select-tree-treenode", ctx.nzSelectMode)("ant-select-tree-treenode-disabled", ctx.nzSelectMode && ctx.isDisabled)("ant-select-tree-treenode-switcher-open", ctx.nzSelectMode && ctx.isSwitcherOpen)("ant-select-tree-treenode-switcher-close", ctx.nzSelectMode && ctx.isSwitcherClose)("ant-select-tree-treenode-checkbox-checked", ctx.nzSelectMode && ctx.isChecked)("ant-select-tree-treenode-checkbox-indeterminate", ctx.nzSelectMode && ctx.isHalfChecked)("ant-select-tree-treenode-selected", ctx.nzSelectMode && ctx.isSelected)("ant-select-tree-treenode-loading", ctx.nzSelectMode && ctx.isLoading)("ant-tree-treenode", !ctx.nzSelectMode)("ant-tree-treenode-disabled", !ctx.nzSelectMode && ctx.isDisabled)("ant-tree-treenode-switcher-open", !ctx.nzSelectMode && ctx.isSwitcherOpen)("ant-tree-treenode-switcher-close", !ctx.nzSelectMode && ctx.isSwitcherClose)("ant-tree-treenode-checkbox-checked", !ctx.nzSelectMode && ctx.isChecked)("ant-tree-treenode-checkbox-indeterminate", !ctx.nzSelectMode && ctx.isHalfChecked)("ant-tree-treenode-selected", !ctx.nzSelectMode && ctx.isSelected)("ant-tree-treenode-loading", !ctx.nzSelectMode && ctx.isLoading)("dragging", ctx.draggingKey === ctx.nzTreeNode.key);
    }
  },
  inputs: {
    icon: "icon",
    title: "title",
    isLoading: [2, "isLoading", "isLoading", booleanAttribute],
    isSelected: [2, "isSelected", "isSelected", booleanAttribute],
    isDisabled: [2, "isDisabled", "isDisabled", booleanAttribute],
    isMatched: [2, "isMatched", "isMatched", booleanAttribute],
    isExpanded: [2, "isExpanded", "isExpanded", booleanAttribute],
    isLeaf: [2, "isLeaf", "isLeaf", booleanAttribute],
    isChecked: [2, "isChecked", "isChecked", booleanAttribute],
    isHalfChecked: [2, "isHalfChecked", "isHalfChecked", booleanAttribute],
    isDisableCheckbox: [2, "isDisableCheckbox", "isDisableCheckbox", booleanAttribute],
    isSelectable: [2, "isSelectable", "isSelectable", booleanAttribute],
    canHide: [2, "canHide", "canHide", booleanAttribute],
    isStart: "isStart",
    isEnd: "isEnd",
    nzTreeNode: "nzTreeNode",
    nzShowLine: [2, "nzShowLine", "nzShowLine", booleanAttribute],
    nzShowExpand: [2, "nzShowExpand", "nzShowExpand", booleanAttribute],
    nzCheckable: [2, "nzCheckable", "nzCheckable", booleanAttribute],
    nzAsyncData: [2, "nzAsyncData", "nzAsyncData", booleanAttribute],
    nzHideUnMatched: [2, "nzHideUnMatched", "nzHideUnMatched", booleanAttribute],
    nzNoAnimation: [2, "nzNoAnimation", "nzNoAnimation", booleanAttribute],
    nzSelectMode: [2, "nzSelectMode", "nzSelectMode", booleanAttribute],
    nzShowIcon: [2, "nzShowIcon", "nzShowIcon", booleanAttribute],
    nzExpandedIcon: "nzExpandedIcon",
    nzTreeTemplate: "nzTreeTemplate",
    nzBeforeDrop: "nzBeforeDrop",
    nzSearchValue: "nzSearchValue",
    nzDraggable: [2, "nzDraggable", "nzDraggable", booleanAttribute]
  },
  outputs: {
    nzClick: "nzClick",
    nzDblClick: "nzDblClick",
    nzContextMenu: "nzContextMenu",
    nzCheckboxChange: "nzCheckboxChange",
    nzExpandChange: "nzExpandChange",
    nzOnDragStart: "nzOnDragStart",
    nzOnDragEnter: "nzOnDragEnter",
    nzOnDragOver: "nzOnDragOver",
    nzOnDragLeave: "nzOnDragLeave",
    nzOnDrop: "nzOnDrop",
    nzOnDragEnd: "nzOnDragEnd"
  },
  exportAs: ["nzTreeBuiltinNode"],
  features: [\u0275\u0275NgOnChangesFeature],
  attrs: _c0,
  decls: 4,
  vars: 22,
  consts: [[3, "nzTreeLevel", "nzSelectMode", "nzIsStart", "nzIsEnd"], [3, "nzShowExpand", "nzShowLine", "nzExpandedIcon", "nzSelectMode", "context", "isLeaf", "isExpanded", "isLoading"], ["builtin", "", 3, "nzSelectMode", "isChecked", "isHalfChecked", "isDisabled", "isDisableCheckbox"], [3, "dblclick", "click", "contextmenu", "icon", "title", "isLoading", "isSelected", "isDisabled", "isMatched", "isExpanded", "isLeaf", "searchValue", "treeTemplate", "draggable", "showIcon", "selectMode", "context", "showIndicator", "dragPosition"], [3, "click", "nzShowExpand", "nzShowLine", "nzExpandedIcon", "nzSelectMode", "context", "isLeaf", "isExpanded", "isLoading"], ["builtin", "", 3, "click", "nzSelectMode", "isChecked", "isHalfChecked", "isDisabled", "isDisableCheckbox"]],
  template: function NzTreeNodeBuiltinComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "nz-tree-indent", 0);
      \u0275\u0275conditionalCreate(1, NzTreeNodeBuiltinComponent_Conditional_1_Template, 1, 8, "nz-tree-node-switcher", 1);
      \u0275\u0275conditionalCreate(2, NzTreeNodeBuiltinComponent_Conditional_2_Template, 1, 5, "nz-tree-node-checkbox", 2);
      \u0275\u0275elementStart(3, "nz-tree-node-title", 3);
      \u0275\u0275listener("dblclick", function NzTreeNodeBuiltinComponent_Template_nz_tree_node_title_dblclick_3_listener($event) {
        return ctx.dblClick($event);
      })("click", function NzTreeNodeBuiltinComponent_Template_nz_tree_node_title_click_3_listener($event) {
        return ctx.clickSelect($event);
      })("contextmenu", function NzTreeNodeBuiltinComponent_Template_nz_tree_node_title_contextmenu_3_listener($event) {
        return ctx.contextMenu($event);
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275property("nzTreeLevel", ctx.nzTreeNode.level)("nzSelectMode", ctx.nzSelectMode)("nzIsStart", ctx.isStart)("nzIsEnd", ctx.isEnd);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzShowExpand ? 1 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.nzCheckable ? 2 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("icon", ctx.icon)("title", ctx.title)("isLoading", ctx.isLoading)("isSelected", ctx.isSelected)("isDisabled", ctx.isDisabled)("isMatched", ctx.isMatched)("isExpanded", ctx.isExpanded)("isLeaf", ctx.isLeaf)("searchValue", ctx.nzSearchValue)("treeTemplate", ctx.nzTreeTemplate)("draggable", ctx.nzDraggable)("showIcon", ctx.nzShowIcon)("selectMode", ctx.nzSelectMode)("context", ctx.nzTreeNode)("showIndicator", ctx.showIndicator)("dragPosition", ctx.dragPos);
    }
  },
  dependencies: [NzTreeIndentComponent, NzTreeNodeSwitcherComponent, NzTreeNodeBuiltinCheckboxComponent, NzTreeNodeTitleComponent],
  encapsulation: 2,
  changeDetection: 0
}));
var NzTreeNodeBuiltinComponent = _NzTreeNodeBuiltinComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTreeNodeBuiltinComponent, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "nz-tree-node[builtin]",
      exportAs: "nzTreeBuiltinNode",
      template: `
    <nz-tree-indent
      [nzTreeLevel]="nzTreeNode.level"
      [nzSelectMode]="nzSelectMode"
      [nzIsStart]="isStart"
      [nzIsEnd]="isEnd"
    />
    @if (nzShowExpand) {
      <nz-tree-node-switcher
        [nzShowExpand]="nzShowExpand"
        [nzShowLine]="nzShowLine"
        [nzExpandedIcon]="nzExpandedIcon"
        [nzSelectMode]="nzSelectMode"
        [context]="nzTreeNode"
        [isLeaf]="isLeaf"
        [isExpanded]="isExpanded"
        [isLoading]="isLoading"
        (click)="clickExpand($event)"
      />
    }
    @if (nzCheckable) {
      <nz-tree-node-checkbox
        builtin
        (click)="clickCheckbox($event)"
        [nzSelectMode]="nzSelectMode"
        [isChecked]="isChecked"
        [isHalfChecked]="isHalfChecked"
        [isDisabled]="isDisabled"
        [isDisableCheckbox]="isDisableCheckbox"
      />
    }
    <nz-tree-node-title
      [icon]="icon"
      [title]="title"
      [isLoading]="isLoading"
      [isSelected]="isSelected"
      [isDisabled]="isDisabled"
      [isMatched]="isMatched"
      [isExpanded]="isExpanded"
      [isLeaf]="isLeaf"
      [searchValue]="nzSearchValue"
      [treeTemplate]="nzTreeTemplate"
      [draggable]="nzDraggable"
      [showIcon]="nzShowIcon"
      [selectMode]="nzSelectMode"
      [context]="nzTreeNode"
      [showIndicator]="showIndicator"
      [dragPosition]="dragPos"
      (dblclick)="dblClick($event)"
      (click)="clickSelect($event)"
      (contextmenu)="contextMenu($event)"
    />
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class.ant-select-tree-treenode]": `nzSelectMode`,
        "[class.ant-select-tree-treenode-disabled]": `nzSelectMode && isDisabled`,
        "[class.ant-select-tree-treenode-switcher-open]": `nzSelectMode && isSwitcherOpen`,
        "[class.ant-select-tree-treenode-switcher-close]": `nzSelectMode && isSwitcherClose`,
        "[class.ant-select-tree-treenode-checkbox-checked]": `nzSelectMode && isChecked`,
        "[class.ant-select-tree-treenode-checkbox-indeterminate]": `nzSelectMode && isHalfChecked`,
        "[class.ant-select-tree-treenode-selected]": `nzSelectMode && isSelected`,
        "[class.ant-select-tree-treenode-loading]": `nzSelectMode && isLoading`,
        "[class.ant-tree-treenode]": `!nzSelectMode`,
        "[class.ant-tree-treenode-disabled]": `!nzSelectMode && isDisabled`,
        "[class.ant-tree-treenode-switcher-open]": `!nzSelectMode && isSwitcherOpen`,
        "[class.ant-tree-treenode-switcher-close]": `!nzSelectMode && isSwitcherClose`,
        "[class.ant-tree-treenode-checkbox-checked]": `!nzSelectMode && isChecked`,
        "[class.ant-tree-treenode-checkbox-indeterminate]": `!nzSelectMode && isHalfChecked`,
        "[class.ant-tree-treenode-selected]": `!nzSelectMode && isSelected`,
        "[class.ant-tree-treenode-loading]": `!nzSelectMode && isLoading`,
        "[class.dragging]": `draggingKey === nzTreeNode.key`,
        "[style.display]": "displayStyle"
      },
      imports: [NzTreeIndentComponent, NzTreeNodeSwitcherComponent, NzTreeNodeBuiltinCheckboxComponent, NzTreeNodeTitleComponent]
    }]
  }], () => [], {
    icon: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    isLoading: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isSelected: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isMatched: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isExpanded: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isLeaf: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isChecked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isHalfChecked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isDisableCheckbox: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isSelectable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    canHide: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    isStart: [{
      type: Input
    }],
    isEnd: [{
      type: Input
    }],
    nzTreeNode: [{
      type: Input
    }],
    nzShowLine: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowExpand: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCheckable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAsyncData: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzHideUnMatched: [{
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
    nzSelectMode: [{
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
    nzExpandedIcon: [{
      type: Input
    }],
    nzTreeTemplate: [{
      type: Input
    }],
    nzBeforeDrop: [{
      type: Input
    }],
    nzSearchValue: [{
      type: Input
    }],
    nzDraggable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzClick: [{
      type: Output
    }],
    nzDblClick: [{
      type: Output
    }],
    nzContextMenu: [{
      type: Output
    }],
    nzCheckboxChange: [{
      type: Output
    }],
    nzExpandChange: [{
      type: Output
    }],
    nzOnDragStart: [{
      type: Output
    }],
    nzOnDragEnter: [{
      type: Output
    }],
    nzOnDragOver: [{
      type: Output
    }],
    nzOnDragLeave: [{
      type: Output
    }],
    nzOnDrop: [{
      type: Output
    }],
    nzOnDragEnd: [{
      type: Output
    }]
  });
})();
var _NzTreeService = class _NzTreeService extends NzTreeBaseService {
};
__publicField(_NzTreeService, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275NzTreeService_BaseFactory;
  return function NzTreeService_Factory(__ngFactoryType__) {
    return (\u0275NzTreeService_BaseFactory || (\u0275NzTreeService_BaseFactory = \u0275\u0275getInheritedFactory(_NzTreeService)))(__ngFactoryType__ || _NzTreeService);
  };
})());
__publicField(_NzTreeService, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _NzTreeService,
  factory: _NzTreeService.\u0275fac
}));
var NzTreeService = _NzTreeService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTreeService, [{
    type: Injectable
  }], null, null);
})();
function NzTreeServiceFactory() {
  const higherOrderService = inject(NzTreeHigherOrderServiceToken, {
    skipSelf: true,
    optional: true
  });
  const treeService = inject(NzTreeService);
  return higherOrderService != null ? higherOrderService : treeService;
}
var NZ_CONFIG_MODULE_NAME = "tree";
var NzTreeComponent = (() => {
  var _a, _b;
  let _classSuper = NzTreeBase;
  let _nzShowIcon_decorators;
  let _nzShowIcon_initializers = [];
  let _nzShowIcon_extraInitializers = [];
  let _nzHideUnMatched_decorators;
  let _nzHideUnMatched_initializers = [];
  let _nzHideUnMatched_extraInitializers = [];
  let _nzBlockNode_decorators;
  let _nzBlockNode_initializers = [];
  let _nzBlockNode_extraInitializers = [];
  return _b = class extends _classSuper {
    constructor() {
      super(inject(NzTreeBaseService));
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME);
      __publicField(this, "dir", inject(Directionality).valueSignal);
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "nzShowIcon", __runInitializers(this, _nzShowIcon_initializers, false));
      __publicField(this, "nzHideUnMatched", (__runInitializers(this, _nzShowIcon_extraInitializers), __runInitializers(this, _nzHideUnMatched_initializers, false)));
      __publicField(this, "nzBlockNode", (__runInitializers(this, _nzHideUnMatched_extraInitializers), __runInitializers(this, _nzBlockNode_initializers, false)));
      __publicField(this, "nzExpandAll", (__runInitializers(this, _nzBlockNode_extraInitializers), false));
      __publicField(this, "nzSelectMode", false);
      __publicField(this, "nzCheckStrictly", false);
      __publicField(this, "nzShowExpand", true);
      __publicField(this, "nzShowLine", false);
      __publicField(this, "nzCheckable", false);
      __publicField(this, "nzAsyncData", false);
      __publicField(this, "nzDraggable", false);
      __publicField(this, "nzMultiple", false);
      __publicField(this, "nzExpandedIcon");
      __publicField(this, "nzVirtualItemSize", 28);
      __publicField(this, "nzVirtualMaxBufferPx", 500);
      __publicField(this, "nzVirtualMinBufferPx", 28);
      __publicField(this, "nzVirtualHeight", null);
      __publicField(this, "nzTreeTemplate");
      __publicField(this, "nzBeforeDrop");
      __publicField(this, "nzData", []);
      __publicField(this, "nzExpandedKeys", []);
      __publicField(this, "nzSelectedKeys", []);
      __publicField(this, "nzCheckedKeys", []);
      __publicField(this, "nzSearchValue", "");
      __publicField(this, "nzSearchFunc");
      __publicField(this, "nzTreeTemplateChild");
      __publicField(this, "cdkVirtualScrollViewport");
      __publicField(this, "nzFlattenNodes", []);
      __publicField(this, "nzExpandedKeysChange", new EventEmitter());
      __publicField(this, "nzSelectedKeysChange", new EventEmitter());
      __publicField(this, "nzCheckedKeysChange", new EventEmitter());
      __publicField(this, "nzSearchValueChange", new EventEmitter());
      __publicField(this, "nzClick", new EventEmitter());
      __publicField(this, "nzDblClick", new EventEmitter());
      __publicField(this, "nzContextMenu", new EventEmitter());
      __publicField(this, "nzCheckboxChange", new EventEmitter());
      __publicField(this, "nzExpandChange", new EventEmitter());
      __publicField(this, "nzOnDragStart", new EventEmitter());
      __publicField(this, "nzOnDragEnter", new EventEmitter());
      __publicField(this, "nzOnDragOver", new EventEmitter());
      __publicField(this, "nzOnDragLeave", new EventEmitter());
      __publicField(this, "nzOnDrop", new EventEmitter());
      __publicField(this, "nzOnDragEnd", new EventEmitter());
      __publicField(this, "HIDDEN_STYLE", {
        width: 0,
        height: 0,
        display: "flex",
        overflow: "hidden",
        opacity: 0,
        border: 0,
        padding: 0,
        margin: 0
      });
      __publicField(this, "HIDDEN_NODE_STYLE", {
        position: "absolute",
        pointerEvents: "none",
        visibility: "hidden",
        height: 0,
        overflow: "hidden"
      });
      __publicField(this, "onChange", () => null);
      __publicField(this, "onTouched", () => null);
    }
    writeValue(value) {
      this.handleNzData(value);
    }
    registerOnChange(fn) {
      this.onChange = fn;
    }
    registerOnTouched(fn) {
      this.onTouched = fn;
    }
    /**
     * Render all properties of nzTree
     *
     * @param changes all changes from @Input
     */
    renderTreeProperties(changes) {
      let useDefaultExpandedKeys = false;
      let expandAll = false;
      const {
        nzData,
        nzExpandedKeys,
        nzSelectedKeys,
        nzCheckedKeys,
        nzCheckStrictly,
        nzExpandAll,
        nzMultiple,
        nzSearchValue
      } = changes;
      if (nzExpandAll) {
        useDefaultExpandedKeys = true;
        expandAll = this.nzExpandAll;
      }
      if (nzMultiple) {
        this.nzTreeService.isMultiple = this.nzMultiple;
      }
      if (nzCheckStrictly) {
        this.nzTreeService.isCheckStrictly = this.nzCheckStrictly;
      }
      if (nzData) {
        this.handleNzData(this.nzData);
      }
      if (nzCheckedKeys) {
        this.handleCheckedKeys(this.nzCheckedKeys);
      }
      if (nzCheckStrictly) {
        this.handleCheckedKeys(null);
      }
      if (nzExpandedKeys || nzExpandAll) {
        useDefaultExpandedKeys = true;
        this.handleExpandedKeys(expandAll || this.nzExpandedKeys);
      }
      if (nzSelectedKeys) {
        this.handleSelectedKeys(this.nzSelectedKeys, this.nzMultiple);
      }
      if (nzSearchValue) {
        if (!(nzSearchValue.firstChange && !this.nzSearchValue)) {
          useDefaultExpandedKeys = false;
          this.handleSearchValue(nzSearchValue.currentValue, this.nzSearchFunc);
          this.nzSearchValueChange.emit(this.nzTreeService.formatEvent("search", null, null));
        }
      }
      const currentExpandedKeys = this.getExpandedNodeList().map((v) => v.key);
      const newExpandedKeys = useDefaultExpandedKeys ? expandAll || this.nzExpandedKeys : currentExpandedKeys;
      this.handleFlattenNodes(this.nzTreeService.rootNodes, newExpandedKeys);
    }
    trackByFlattenNode(_, node) {
      return node.key;
    }
    // Deal with properties
    /**
     * nzData
     *
     * @param value
     */
    handleNzData(value) {
      if (Array.isArray(value)) {
        const data = this.coerceTreeNodes(value);
        this.nzTreeService.initTree(data);
      }
    }
    handleFlattenNodes(data, expandKeys = []) {
      this.nzTreeService.flattenTreeData(data, expandKeys);
    }
    handleCheckedKeys(keys) {
      this.nzTreeService.conductCheck(keys, this.nzCheckStrictly);
    }
    handleExpandedKeys(keys = []) {
      this.nzTreeService.conductExpandedKeys(keys);
    }
    handleSelectedKeys(keys, isMulti) {
      this.nzTreeService.conductSelectedKeys(keys, isMulti);
    }
    handleSearchValue(value, searchFunc) {
      const dataList = flattenTreeData(this.nzTreeService.rootNodes, true).map((v) => v.data);
      const checkIfMatched = (node) => {
        if (searchFunc) {
          return searchFunc(node.origin);
        }
        return !!value && node.title.toLowerCase().includes(value.toLowerCase());
      };
      dataList.forEach((v) => {
        v.isMatched = checkIfMatched(v);
        v.canHide = !v.isMatched;
        if (!v.isMatched) {
          v.setExpanded(false);
          this.nzTreeService.setExpandedNodeList(v);
        } else {
          this.nzTreeService.expandNodeAllParentBySearch(v);
        }
        this.nzTreeService.setMatchedNodeList(v);
      });
    }
    /**
     * Handle emit event
     *
     * @param event
     * handle each event
     */
    eventTriggerChanged(event) {
      const node = event.node;
      switch (event.eventName) {
        case "expand":
          this.renderTree();
          this.nzExpandChange.emit(event);
          break;
        case "click":
          this.nzClick.emit(event);
          break;
        case "dblclick":
          this.nzDblClick.emit(event);
          break;
        case "contextmenu":
          this.nzContextMenu.emit(event);
          break;
        case "check": {
          this.nzTreeService.setCheckedNodeList(node);
          if (!this.nzCheckStrictly) {
            this.nzTreeService.conduct(node);
          }
          const eventNext = this.nzTreeService.formatEvent("check", node, event.event);
          this.nzCheckboxChange.emit(eventNext);
          const checkedKeys = this.nzTreeService.getCheckedNodeKeys();
          this.nzCheckedKeysChange.emit(checkedKeys);
          break;
        }
        case "dragstart":
          if (node.isExpanded) {
            node.setExpanded(!node.isExpanded);
            this.renderTree();
          }
          this.nzOnDragStart.emit(event);
          break;
        case "dragenter": {
          const selectedNode = this.nzTreeService.getSelectedNode();
          if (selectedNode && selectedNode.key !== node.key && !node.isExpanded && !node.isLeaf) {
            node.setExpanded(true);
            this.renderTree();
          }
          this.nzOnDragEnter.emit(event);
          break;
        }
        case "dragover":
          this.nzOnDragOver.emit(event);
          break;
        case "dragleave":
          this.nzOnDragLeave.emit(event);
          break;
        case "dragend":
          this.nzOnDragEnd.emit(event);
          break;
        case "drop":
          this.renderTree();
          this.nzOnDrop.emit(event);
          break;
      }
    }
    /**
     * Click expand icon
     */
    renderTree() {
      this.handleFlattenNodes(this.nzTreeService.rootNodes, this.getExpandedNodeList().map((v) => v.key));
      this.cdr.markForCheck();
    }
    ngOnInit() {
      this.nzTreeService.flattenNodes$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
        var _a;
        this.nzFlattenNodes = !!this.nzVirtualHeight && this.nzHideUnMatched && ((_a = this.nzSearchValue) == null ? void 0 : _a.length) > 0 ? data.filter((d) => !d.canHide) : data;
        this.cdr.markForCheck();
      });
    }
    ngOnChanges(changes) {
      this.renderTreeProperties(changes);
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) != null ? _a : null) : void 0;
    _nzShowIcon_decorators = [WithConfig()];
    _nzHideUnMatched_decorators = [WithConfig()];
    _nzBlockNode_decorators = [WithConfig()];
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
    __esDecorate(null, null, _nzHideUnMatched_decorators, {
      kind: "field",
      name: "nzHideUnMatched",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzHideUnMatched" in obj,
        get: (obj) => obj.nzHideUnMatched,
        set: (obj, value) => {
          obj.nzHideUnMatched = value;
        }
      },
      metadata: _metadata
    }, _nzHideUnMatched_initializers, _nzHideUnMatched_extraInitializers);
    __esDecorate(null, null, _nzBlockNode_decorators, {
      kind: "field",
      name: "nzBlockNode",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzBlockNode" in obj,
        get: (obj) => obj.nzBlockNode,
        set: (obj, value) => {
          obj.nzBlockNode = value;
        }
      },
      metadata: _metadata
    }, _nzBlockNode_initializers, _nzBlockNode_extraInitializers);
    if (_metadata) Object.defineProperty(_b, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_b, "\u0275fac", function NzTreeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _b)();
  }), __publicField(_b, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _b,
    selectors: [["nz-tree"]],
    contentQueries: function NzTreeComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, _c2, 7);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.nzTreeTemplateChild = _t.first);
      }
    },
    viewQuery: function NzTreeComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(CdkVirtualScrollViewport, 5, CdkVirtualScrollViewport);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.cdkVirtualScrollViewport = _t.first);
      }
    },
    hostVars: 20,
    hostBindings: function NzTreeComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-select-tree", ctx.nzSelectMode)("ant-select-tree-show-line", ctx.nzSelectMode && ctx.nzShowLine)("ant-select-tree-icon-hide", ctx.nzSelectMode && !ctx.nzShowIcon)("ant-select-tree-block-node", ctx.nzSelectMode && ctx.nzBlockNode)("ant-tree", !ctx.nzSelectMode)("ant-tree-rtl", ctx.dir() === "rtl")("ant-tree-show-line", !ctx.nzSelectMode && ctx.nzShowLine)("ant-tree-icon-hide", !ctx.nzSelectMode && !ctx.nzShowIcon)("ant-tree-block-node", !ctx.nzSelectMode && ctx.nzBlockNode)("draggable-tree", ctx.nzDraggable);
      }
    },
    inputs: {
      nzShowIcon: [2, "nzShowIcon", "nzShowIcon", booleanAttribute],
      nzHideUnMatched: [2, "nzHideUnMatched", "nzHideUnMatched", booleanAttribute],
      nzBlockNode: [2, "nzBlockNode", "nzBlockNode", booleanAttribute],
      nzExpandAll: [2, "nzExpandAll", "nzExpandAll", booleanAttribute],
      nzSelectMode: [2, "nzSelectMode", "nzSelectMode", booleanAttribute],
      nzCheckStrictly: [2, "nzCheckStrictly", "nzCheckStrictly", booleanAttribute],
      nzShowExpand: [2, "nzShowExpand", "nzShowExpand", booleanAttribute],
      nzShowLine: [2, "nzShowLine", "nzShowLine", booleanAttribute],
      nzCheckable: [2, "nzCheckable", "nzCheckable", booleanAttribute],
      nzAsyncData: [2, "nzAsyncData", "nzAsyncData", booleanAttribute],
      nzDraggable: [2, "nzDraggable", "nzDraggable", booleanAttribute],
      nzMultiple: [2, "nzMultiple", "nzMultiple", booleanAttribute],
      nzExpandedIcon: "nzExpandedIcon",
      nzVirtualItemSize: "nzVirtualItemSize",
      nzVirtualMaxBufferPx: "nzVirtualMaxBufferPx",
      nzVirtualMinBufferPx: "nzVirtualMinBufferPx",
      nzVirtualHeight: "nzVirtualHeight",
      nzTreeTemplate: "nzTreeTemplate",
      nzBeforeDrop: "nzBeforeDrop",
      nzData: "nzData",
      nzExpandedKeys: "nzExpandedKeys",
      nzSelectedKeys: "nzSelectedKeys",
      nzCheckedKeys: "nzCheckedKeys",
      nzSearchValue: "nzSearchValue",
      nzSearchFunc: "nzSearchFunc"
    },
    outputs: {
      nzExpandedKeysChange: "nzExpandedKeysChange",
      nzSelectedKeysChange: "nzSelectedKeysChange",
      nzCheckedKeysChange: "nzCheckedKeysChange",
      nzSearchValueChange: "nzSearchValueChange",
      nzClick: "nzClick",
      nzDblClick: "nzDblClick",
      nzContextMenu: "nzContextMenu",
      nzCheckboxChange: "nzCheckboxChange",
      nzExpandChange: "nzExpandChange",
      nzOnDragStart: "nzOnDragStart",
      nzOnDragEnter: "nzOnDragEnter",
      nzOnDragOver: "nzOnDragOver",
      nzOnDragLeave: "nzOnDragLeave",
      nzOnDrop: "nzOnDrop",
      nzOnDragEnd: "nzOnDragEnd"
    },
    exportAs: ["nzTree"],
    features: [\u0275\u0275ProvidersFeature([NzTreeService, NzAnimationTreeCollapseService, {
      provide: NzTreeBaseService,
      useFactory: NzTreeServiceFactory
    }, {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => _b),
      multi: true
    }]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature],
    decls: 8,
    vars: 7,
    consts: [[1, "ant-tree-treenode"], [1, "ant-tree-indent"], [1, "ant-tree-indent-unit"], [1, "ant-tree-list", 2, "position", "relative"], [3, "ant-select-tree-list-holder-inner", "ant-tree-list-holder-inner", "itemSize", "minBufferPx", "maxBufferPx", "height"], [3, "ant-select-tree-list-holder-inner", "ant-tree-list-holder-inner"], [3, "itemSize", "minBufferPx", "maxBufferPx"], [4, "cdkVirtualFor", "cdkVirtualForOf", "cdkVirtualForTrackBy"], ["builtin", "", 3, "nzExpandChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckboxChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDragEnd", "nzOnDrop", "icon", "title", "isLoading", "isSelected", "isDisabled", "isMatched", "isExpanded", "isLeaf", "isStart", "isEnd", "isChecked", "isHalfChecked", "isDisableCheckbox", "isSelectable", "canHide", "nzTreeNode", "nzSelectMode", "nzShowLine", "nzExpandedIcon", "nzDraggable", "nzCheckable", "nzShowExpand", "nzAsyncData", "nzSearchValue", "nzHideUnMatched", "nzBeforeDrop", "nzShowIcon", "nzTreeTemplate"], ["builtin", "", "animation-tree-collapse", "", 3, "icon", "title", "isLoading", "isSelected", "isDisabled", "isMatched", "isExpanded", "isLeaf", "isStart", "isEnd", "isChecked", "isHalfChecked", "isDisableCheckbox", "isSelectable", "canHide", "nzTreeNode", "nzSelectMode", "nzShowLine", "nzExpandedIcon", "nzDraggable", "nzCheckable", "nzShowExpand", "nzAsyncData", "nzSearchValue", "nzHideUnMatched", "nzBeforeDrop", "nzShowIcon", "nzTreeTemplate"], ["builtin", "", "animation-tree-collapse", "", 3, "nzExpandChange", "nzClick", "nzDblClick", "nzContextMenu", "nzCheckboxChange", "nzOnDragStart", "nzOnDragEnter", "nzOnDragOver", "nzOnDragLeave", "nzOnDragEnd", "nzOnDrop", "icon", "title", "isLoading", "isSelected", "isDisabled", "isMatched", "isExpanded", "isLeaf", "isStart", "isEnd", "isChecked", "isHalfChecked", "isDisableCheckbox", "isSelectable", "canHide", "nzTreeNode", "nzSelectMode", "nzShowLine", "nzExpandedIcon", "nzDraggable", "nzCheckable", "nzShowExpand", "nzAsyncData", "nzSearchValue", "nzHideUnMatched", "nzBeforeDrop", "nzShowIcon", "nzTreeTemplate"]],
    template: function NzTreeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div");
        \u0275\u0275element(1, "input");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(2, "div", 0)(3, "div", 1);
        \u0275\u0275element(4, "div", 2);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(5, "div", 3);
        \u0275\u0275conditionalCreate(6, NzTreeComponent_Conditional_6_Template, 2, 11, "cdk-virtual-scroll-viewport", 4)(7, NzTreeComponent_Conditional_7_Template, 3, 4, "div", 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275styleMap(ctx.HIDDEN_STYLE);
        \u0275\u0275advance();
        \u0275\u0275styleMap(ctx.HIDDEN_NODE_STYLE);
        \u0275\u0275advance(3);
        \u0275\u0275classProp("ant-select-tree-list", ctx.nzSelectMode);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.nzVirtualHeight ? 6 : 7);
      }
    },
    dependencies: [CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, NzAnimationTreeCollapseDirective, NzTreeNodeBuiltinComponent],
    encapsulation: 2,
    changeDetection: 0
  })), _b;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTreeComponent, [{
    type: Component,
    args: [{
      selector: "nz-tree",
      exportAs: "nzTree",
      template: `
    <div>
      <input [style]="HIDDEN_STYLE" />
    </div>
    <div class="ant-tree-treenode" [style]="HIDDEN_NODE_STYLE">
      <div class="ant-tree-indent">
        <div class="ant-tree-indent-unit"></div>
      </div>
    </div>
    <div class="ant-tree-list" [class.ant-select-tree-list]="nzSelectMode" style="position: relative">
      @if (nzVirtualHeight) {
        <cdk-virtual-scroll-viewport
          [class.ant-select-tree-list-holder-inner]="nzSelectMode"
          [class.ant-tree-list-holder-inner]="!nzSelectMode"
          [itemSize]="nzVirtualItemSize"
          [minBufferPx]="nzVirtualMinBufferPx"
          [maxBufferPx]="nzVirtualMaxBufferPx"
          [style.height]="nzVirtualHeight"
        >
          <ng-container *cdkVirtualFor="let node of nzFlattenNodes; trackBy: trackByFlattenNode">
            <nz-tree-node
              builtin
              [icon]="node.icon"
              [title]="node.title"
              [isLoading]="node.isLoading"
              [isSelected]="node.isSelected"
              [isDisabled]="node.isDisabled"
              [isMatched]="node.isMatched"
              [isExpanded]="node.isExpanded"
              [isLeaf]="node.isLeaf"
              [isStart]="node.isStart ?? []"
              [isEnd]="node.isEnd ?? []"
              [isChecked]="node.isChecked"
              [isHalfChecked]="node.isHalfChecked"
              [isDisableCheckbox]="node.isDisableCheckbox"
              [isSelectable]="node.isSelectable"
              [canHide]="node.canHide"
              [nzTreeNode]="node"
              [nzSelectMode]="nzSelectMode"
              [nzShowLine]="nzShowLine"
              [nzExpandedIcon]="nzExpandedIcon"
              [nzDraggable]="nzDraggable"
              [nzCheckable]="nzCheckable"
              [nzShowExpand]="nzShowExpand"
              [nzAsyncData]="nzAsyncData"
              [nzSearchValue]="nzSearchValue"
              [nzHideUnMatched]="nzHideUnMatched"
              [nzBeforeDrop]="nzBeforeDrop"
              [nzShowIcon]="nzShowIcon"
              [nzTreeTemplate]="nzTreeTemplate || nzTreeTemplateChild"
              (nzExpandChange)="eventTriggerChanged($event)"
              (nzClick)="eventTriggerChanged($event)"
              (nzDblClick)="eventTriggerChanged($event)"
              (nzContextMenu)="eventTriggerChanged($event)"
              (nzCheckboxChange)="eventTriggerChanged($event)"
              (nzOnDragStart)="eventTriggerChanged($event)"
              (nzOnDragEnter)="eventTriggerChanged($event)"
              (nzOnDragOver)="eventTriggerChanged($event)"
              (nzOnDragLeave)="eventTriggerChanged($event)"
              (nzOnDragEnd)="eventTriggerChanged($event)"
              (nzOnDrop)="eventTriggerChanged($event)"
            />
          </ng-container>
        </cdk-virtual-scroll-viewport>
      } @else {
        <div
          [class.ant-select-tree-list-holder-inner]="nzSelectMode"
          [class.ant-tree-list-holder-inner]="!nzSelectMode"
        >
          @for (node of nzFlattenNodes; track trackByFlattenNode($index, node)) {
            <nz-tree-node
              builtin
              animation-tree-collapse
              [icon]="node.icon"
              [title]="node.title"
              [isLoading]="node.isLoading"
              [isSelected]="node.isSelected"
              [isDisabled]="node.isDisabled"
              [isMatched]="node.isMatched"
              [isExpanded]="node.isExpanded"
              [isLeaf]="node.isLeaf"
              [isStart]="node.isStart ?? []"
              [isEnd]="node.isEnd ?? []"
              [isChecked]="node.isChecked"
              [isHalfChecked]="node.isHalfChecked"
              [isDisableCheckbox]="node.isDisableCheckbox"
              [isSelectable]="node.isSelectable"
              [canHide]="node.canHide"
              [nzTreeNode]="node"
              [nzSelectMode]="nzSelectMode"
              [nzShowLine]="nzShowLine"
              [nzExpandedIcon]="nzExpandedIcon"
              [nzDraggable]="nzDraggable"
              [nzCheckable]="nzCheckable"
              [nzShowExpand]="nzShowExpand"
              [nzAsyncData]="nzAsyncData"
              [nzSearchValue]="nzSearchValue"
              [nzHideUnMatched]="nzHideUnMatched"
              [nzBeforeDrop]="nzBeforeDrop"
              [nzShowIcon]="nzShowIcon"
              [nzTreeTemplate]="nzTreeTemplate || nzTreeTemplateChild"
              (nzExpandChange)="eventTriggerChanged($event)"
              (nzClick)="eventTriggerChanged($event)"
              (nzDblClick)="eventTriggerChanged($event)"
              (nzContextMenu)="eventTriggerChanged($event)"
              (nzCheckboxChange)="eventTriggerChanged($event)"
              (nzOnDragStart)="eventTriggerChanged($event)"
              (nzOnDragEnter)="eventTriggerChanged($event)"
              (nzOnDragOver)="eventTriggerChanged($event)"
              (nzOnDragLeave)="eventTriggerChanged($event)"
              (nzOnDragEnd)="eventTriggerChanged($event)"
              (nzOnDrop)="eventTriggerChanged($event)"
            />
          }
        </div>
      }
    </div>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [NzTreeService, NzAnimationTreeCollapseService, {
        provide: NzTreeBaseService,
        useFactory: NzTreeServiceFactory
      }, {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzTreeComponent),
        multi: true
      }],
      host: {
        "[class.ant-select-tree]": `nzSelectMode`,
        "[class.ant-select-tree-show-line]": `nzSelectMode && nzShowLine`,
        "[class.ant-select-tree-icon-hide]": `nzSelectMode && !nzShowIcon`,
        "[class.ant-select-tree-block-node]": `nzSelectMode && nzBlockNode`,
        "[class.ant-tree]": `!nzSelectMode`,
        "[class.ant-tree-rtl]": `dir() === 'rtl'`,
        "[class.ant-tree-show-line]": `!nzSelectMode && nzShowLine`,
        "[class.ant-tree-icon-hide]": `!nzSelectMode && !nzShowIcon`,
        "[class.ant-tree-block-node]": `!nzSelectMode && nzBlockNode`,
        "[class.draggable-tree]": `nzDraggable`
      },
      imports: [CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, NzAnimationTreeCollapseDirective, NzTreeNodeBuiltinComponent]
    }]
  }], () => [], {
    nzShowIcon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzHideUnMatched: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzBlockNode: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzExpandAll: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzSelectMode: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCheckStrictly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowExpand: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowLine: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzCheckable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAsyncData: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDraggable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzMultiple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzExpandedIcon: [{
      type: Input
    }],
    nzVirtualItemSize: [{
      type: Input
    }],
    nzVirtualMaxBufferPx: [{
      type: Input
    }],
    nzVirtualMinBufferPx: [{
      type: Input
    }],
    nzVirtualHeight: [{
      type: Input
    }],
    nzTreeTemplate: [{
      type: Input
    }],
    nzBeforeDrop: [{
      type: Input
    }],
    nzData: [{
      type: Input
    }],
    nzExpandedKeys: [{
      type: Input
    }],
    nzSelectedKeys: [{
      type: Input
    }],
    nzCheckedKeys: [{
      type: Input
    }],
    nzSearchValue: [{
      type: Input
    }],
    nzSearchFunc: [{
      type: Input
    }],
    nzTreeTemplateChild: [{
      type: ContentChild,
      args: ["nzTreeTemplate", {
        static: true
      }]
    }],
    cdkVirtualScrollViewport: [{
      type: ViewChild,
      args: [CdkVirtualScrollViewport, {
        read: CdkVirtualScrollViewport
      }]
    }],
    nzExpandedKeysChange: [{
      type: Output
    }],
    nzSelectedKeysChange: [{
      type: Output
    }],
    nzCheckedKeysChange: [{
      type: Output
    }],
    nzSearchValueChange: [{
      type: Output
    }],
    nzClick: [{
      type: Output
    }],
    nzDblClick: [{
      type: Output
    }],
    nzContextMenu: [{
      type: Output
    }],
    nzCheckboxChange: [{
      type: Output
    }],
    nzExpandChange: [{
      type: Output
    }],
    nzOnDragStart: [{
      type: Output
    }],
    nzOnDragEnter: [{
      type: Output
    }],
    nzOnDragOver: [{
      type: Output
    }],
    nzOnDragLeave: [{
      type: Output
    }],
    nzOnDrop: [{
      type: Output
    }],
    nzOnDragEnd: [{
      type: Output
    }]
  });
})();
var _NzTreeModule = class _NzTreeModule {
};
__publicField(_NzTreeModule, "\u0275fac", function NzTreeModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzTreeModule)();
});
__publicField(_NzTreeModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzTreeModule,
  imports: [NzTreeComponent, NzTreeNodeBuiltinComponent, NzTreeIndentComponent, NzTreeNodeSwitcherComponent, NzTreeNodeBuiltinCheckboxComponent, NzTreeNodeTitleComponent, NzTreeDropIndicatorComponent],
  exports: [NzTreeComponent, NzTreeNodeBuiltinComponent, NzTreeIndentComponent]
}));
__publicField(_NzTreeModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzTreeComponent, NzTreeNodeBuiltinComponent, NzTreeNodeSwitcherComponent, NzTreeNodeTitleComponent]
}));
var NzTreeModule = _NzTreeModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzTreeModule, [{
    type: NgModule,
    args: [{
      imports: [NzTreeComponent, NzTreeNodeBuiltinComponent, NzTreeIndentComponent, NzTreeNodeSwitcherComponent, NzTreeNodeBuiltinCheckboxComponent, NzTreeNodeTitleComponent, NzTreeDropIndicatorComponent],
      exports: [NzTreeComponent, NzTreeNodeBuiltinComponent, NzTreeIndentComponent]
    }]
  }], null, null);
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-popover.mjs
var _c02 = (a0) => ({
  $implicit: a0
});
function NzPopoverComponent_ng_template_0_Conditional_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.nzTitle, " ");
  }
}
function NzPopoverComponent_ng_template_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275template(1, NzPopoverComponent_ng_template_0_Conditional_5_ng_container_1_Template, 2, 1, "ng-container", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzTitle)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(2, _c02, ctx_r1.nzTitleContext));
  }
}
function NzPopoverComponent_ng_template_0_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.nzContent, " ");
  }
}
function NzPopoverComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275animateLeave(function NzPopoverComponent_ng_template_0_Template_animateleave_cb() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.zoomAnimationLeave());
    });
    \u0275\u0275animateEnter(function NzPopoverComponent_ng_template_0_Template_animateenter_cb() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.zoomAnimationEnter());
    });
    \u0275\u0275element(1, "div", 3);
    \u0275\u0275elementStart(2, "div", 4)(3, "div", 5)(4, "div");
    \u0275\u0275conditionalCreate(5, NzPopoverComponent_ng_template_0_Conditional_5_Template, 2, 4, "div", 6);
    \u0275\u0275elementStart(6, "div", 7);
    \u0275\u0275template(7, NzPopoverComponent_ng_template_0_ng_container_7_Template, 2, 1, "ng-container", 8);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275styleMap(ctx_r1.nzOverlayStyle);
    \u0275\u0275classMap(ctx_r1._classMap);
    \u0275\u0275classProp("ant-popover-rtl", ctx_r1.dir() === "rtl");
    \u0275\u0275property("nzNoAnimation", !!(ctx_r1.noAnimation == null ? null : ctx_r1.noAnimation.nzNoAnimation == null ? null : ctx_r1.noAnimation.nzNoAnimation()));
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.nzTitle ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzContent)("nzStringTemplateOutletContext", \u0275\u0275pureFunction1(10, _c02, ctx_r1.nzContentContext));
  }
}
var NZ_CONFIG_MODULE_NAME2 = "popover";
var NzPopoverDirective = (() => {
  var _a, _b;
  let _classSuper = NzTooltipBaseDirective;
  let _nzPopoverBackdrop_decorators;
  let _nzPopoverBackdrop_initializers = [];
  let _nzPopoverBackdrop_extraInitializers = [];
  return _b = class extends _classSuper {
    constructor() {
      super(NzPopoverComponent);
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME2);
      /* eslint-disable @angular-eslint/no-input-rename, @angular-eslint/no-output-rename */
      __publicField(this, "arrowPointAtCenter");
      __publicField(this, "title");
      __publicField(this, "titleContext", null);
      __publicField(this, "content");
      __publicField(this, "contentContext", null);
      __publicField(this, "directiveTitle");
      __publicField(this, "trigger", "hover");
      __publicField(this, "placement", "top");
      __publicField(this, "origin");
      __publicField(this, "visible");
      __publicField(this, "mouseEnterDelay");
      __publicField(this, "mouseLeaveDelay");
      __publicField(this, "overlayClassName");
      __publicField(this, "overlayStyle");
      __publicField(this, "overlayClickable");
      __publicField(this, "directiveContent", null);
      __publicField(this, "nzPopoverBackdrop", __runInitializers(this, _nzPopoverBackdrop_initializers, false));
      __publicField(this, "visibleChange", (__runInitializers(this, _nzPopoverBackdrop_extraInitializers), new EventEmitter()));
    }
    getProxyPropertyMap() {
      return __spreadValues({
        nzPopoverBackdrop: ["nzBackdrop", () => this.nzPopoverBackdrop],
        titleContext: ["nzTitleContext", () => this.titleContext],
        contentContext: ["nzContentContext", () => this.contentContext]
      }, super.getProxyPropertyMap());
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) != null ? _a : null) : void 0;
    _nzPopoverBackdrop_decorators = [WithConfig()];
    __esDecorate(null, null, _nzPopoverBackdrop_decorators, {
      kind: "field",
      name: "nzPopoverBackdrop",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzPopoverBackdrop" in obj,
        get: (obj) => obj.nzPopoverBackdrop,
        set: (obj, value) => {
          obj.nzPopoverBackdrop = value;
        }
      },
      metadata: _metadata
    }, _nzPopoverBackdrop_initializers, _nzPopoverBackdrop_extraInitializers);
    if (_metadata) Object.defineProperty(_b, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_b, "\u0275fac", function NzPopoverDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _b)();
  }), __publicField(_b, "\u0275dir", /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _b,
    selectors: [["", "nz-popover", ""]],
    hostVars: 2,
    hostBindings: function NzPopoverDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-popover-open", ctx.visible);
      }
    },
    inputs: {
      arrowPointAtCenter: [2, "nzPopoverArrowPointAtCenter", "arrowPointAtCenter", booleanAttribute],
      title: [0, "nzPopoverTitle", "title"],
      titleContext: [0, "nzPopoverTitleContext", "titleContext"],
      content: [0, "nzPopoverContent", "content"],
      contentContext: [0, "nzPopoverContentContext", "contentContext"],
      directiveTitle: [0, "nz-popover", "directiveTitle"],
      trigger: [0, "nzPopoverTrigger", "trigger"],
      placement: [0, "nzPopoverPlacement", "placement"],
      origin: [0, "nzPopoverOrigin", "origin"],
      visible: [0, "nzPopoverVisible", "visible"],
      mouseEnterDelay: [0, "nzPopoverMouseEnterDelay", "mouseEnterDelay"],
      mouseLeaveDelay: [0, "nzPopoverMouseLeaveDelay", "mouseLeaveDelay"],
      overlayClassName: [0, "nzPopoverOverlayClassName", "overlayClassName"],
      overlayStyle: [0, "nzPopoverOverlayStyle", "overlayStyle"],
      overlayClickable: [0, "nzPopoverOverlayClickable", "overlayClickable"],
      nzPopoverBackdrop: "nzPopoverBackdrop"
    },
    outputs: {
      visibleChange: "nzPopoverVisibleChange"
    },
    exportAs: ["nzPopover"],
    features: [\u0275\u0275InheritDefinitionFeature]
  })), _b;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPopoverDirective, [{
    type: Directive,
    args: [{
      selector: "[nz-popover]",
      exportAs: "nzPopover",
      host: {
        "[class.ant-popover-open]": "visible"
      }
    }]
  }], () => [], {
    arrowPointAtCenter: [{
      type: Input,
      args: [{
        alias: "nzPopoverArrowPointAtCenter",
        transform: booleanAttribute
      }]
    }],
    title: [{
      type: Input,
      args: ["nzPopoverTitle"]
    }],
    titleContext: [{
      type: Input,
      args: ["nzPopoverTitleContext"]
    }],
    content: [{
      type: Input,
      args: ["nzPopoverContent"]
    }],
    contentContext: [{
      type: Input,
      args: ["nzPopoverContentContext"]
    }],
    directiveTitle: [{
      type: Input,
      args: ["nz-popover"]
    }],
    trigger: [{
      type: Input,
      args: ["nzPopoverTrigger"]
    }],
    placement: [{
      type: Input,
      args: ["nzPopoverPlacement"]
    }],
    origin: [{
      type: Input,
      args: ["nzPopoverOrigin"]
    }],
    visible: [{
      type: Input,
      args: ["nzPopoverVisible"]
    }],
    mouseEnterDelay: [{
      type: Input,
      args: ["nzPopoverMouseEnterDelay"]
    }],
    mouseLeaveDelay: [{
      type: Input,
      args: ["nzPopoverMouseLeaveDelay"]
    }],
    overlayClassName: [{
      type: Input,
      args: ["nzPopoverOverlayClassName"]
    }],
    overlayStyle: [{
      type: Input,
      args: ["nzPopoverOverlayStyle"]
    }],
    overlayClickable: [{
      type: Input,
      args: ["nzPopoverOverlayClickable"]
    }],
    nzPopoverBackdrop: [{
      type: Input
    }],
    visibleChange: [{
      type: Output,
      args: ["nzPopoverVisibleChange"]
    }]
  });
})();
var _NzPopoverComponent = class _NzPopoverComponent extends NzTooltipComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "_animationPrefix", "ant-zoom-big");
    __publicField(this, "_prefix", "ant-popover");
    __publicField(this, "nzContentContext", null);
  }
  get hasBackdrop() {
    return this.nzTrigger === "click" ? this.nzBackdrop : false;
  }
  isEmpty() {
    return isTooltipEmpty(this.nzTitle) && isTooltipEmpty(this.nzContent);
  }
};
__publicField(_NzPopoverComponent, "\u0275fac", /* @__PURE__ */ (() => {
  let \u0275NzPopoverComponent_BaseFactory;
  return function NzPopoverComponent_Factory(__ngFactoryType__) {
    return (\u0275NzPopoverComponent_BaseFactory || (\u0275NzPopoverComponent_BaseFactory = \u0275\u0275getInheritedFactory(_NzPopoverComponent)))(__ngFactoryType__ || _NzPopoverComponent);
  };
})());
__publicField(_NzPopoverComponent, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _NzPopoverComponent,
  selectors: [["nz-popover"]],
  exportAs: ["nzPopoverComponent"],
  features: [\u0275\u0275InheritDefinitionFeature],
  decls: 2,
  vars: 6,
  consts: [["overlay", "cdkConnectedOverlay"], ["cdkConnectedOverlay", "", "nzConnectedOverlay", "", 3, "overlayOutsideClick", "detach", "positionChange", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayOpen", "cdkConnectedOverlayPush", "nzArrowPointAtCenter"], [1, "ant-popover", 3, "nzNoAnimation"], [1, "ant-popover-arrow"], [1, "ant-popover-content"], ["role", "tooltip", 1, "ant-popover-inner"], [1, "ant-popover-title"], [1, "ant-popover-inner-content"], [4, "nzStringTemplateOutlet", "nzStringTemplateOutletContext"]],
  template: function NzPopoverComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, NzPopoverComponent_ng_template_0_Template, 8, 12, "ng-template", 1, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275listener("overlayOutsideClick", function NzPopoverComponent_Template_ng_template_overlayOutsideClick_0_listener($event) {
        return ctx.onClickOutside($event);
      })("detach", function NzPopoverComponent_Template_ng_template_detach_0_listener() {
        return ctx.hide();
      })("positionChange", function NzPopoverComponent_Template_ng_template_positionChange_0_listener($event) {
        return ctx.onPositionChange($event);
      });
    }
    if (rf & 2) {
      \u0275\u0275property("cdkConnectedOverlayHasBackdrop", ctx.hasBackdrop)("cdkConnectedOverlayOrigin", ctx.origin)("cdkConnectedOverlayPositions", ctx._positions)("cdkConnectedOverlayOpen", ctx._visible)("cdkConnectedOverlayPush", ctx.cdkConnectedOverlayPush)("nzArrowPointAtCenter", ctx.nzArrowPointAtCenter);
    }
  },
  dependencies: [OverlayModule, CdkConnectedOverlay, NzOverlayModule, NzConnectedOverlayDirective, NzNoAnimationDirective, NzOutletModule, NzStringTemplateOutletDirective],
  encapsulation: 2,
  changeDetection: 0
}));
var NzPopoverComponent = _NzPopoverComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPopoverComponent, [{
    type: Component,
    args: [{
      selector: "nz-popover",
      exportAs: "nzPopoverComponent",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="hasBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPush]="cdkConnectedOverlayPush"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="ant-popover"
        [class.ant-popover-rtl]="dir() === 'rtl'"
        [class]="_classMap"
        [style]="nzOverlayStyle"
        [nzNoAnimation]="!!noAnimation?.nzNoAnimation?.()"
        [animate.enter]="zoomAnimationEnter()"
        [animate.leave]="zoomAnimationLeave()"
      >
        <div class="ant-popover-arrow"></div>
        <div class="ant-popover-content">
          <div class="ant-popover-inner" role="tooltip">
            <div>
              @if (nzTitle) {
                <div class="ant-popover-title">
                  <ng-container *nzStringTemplateOutlet="nzTitle; context: { $implicit: nzTitleContext }">
                    {{ nzTitle }}
                  </ng-container>
                </div>
              }
              <div class="ant-popover-inner-content">
                <ng-container *nzStringTemplateOutlet="nzContent; context: { $implicit: nzContentContext }">
                  {{ nzContent }}
                </ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
      imports: [OverlayModule, NzOverlayModule, NzNoAnimationDirective, NzOutletModule]
    }]
  }], null, null);
})();
var _NzPopoverModule = class _NzPopoverModule {
};
__publicField(_NzPopoverModule, "\u0275fac", function NzPopoverModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzPopoverModule)();
});
__publicField(_NzPopoverModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzPopoverModule,
  imports: [NzPopoverDirective, NzPopoverComponent],
  exports: [NzPopoverDirective, NzPopoverComponent]
}));
__publicField(_NzPopoverModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzPopoverComponent]
}));
var NzPopoverModule = _NzPopoverModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzPopoverModule, [{
    type: NgModule,
    args: [{
      imports: [NzPopoverDirective, NzPopoverComponent],
      exports: [NzPopoverDirective, NzPopoverComponent]
    }]
  }], null, null);
})();

// projects/tot/business-files/src/lib/components/create-folder-popover/create-folder-popover.component.ts
function CreateFolderPopoverComponent_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.buttonText);
  }
}
function CreateFolderPopoverComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "input", 6, 1);
    \u0275\u0275twoWayListener("ngModelChange", function CreateFolderPopoverComponent_ng_template_3_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.name, $event) || (ctx_r1.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function CreateFolderPopoverComponent_ng_template_3_Template_input_keyup_enter_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 7)(4, "button", 8);
    \u0275\u0275listener("click", function CreateFolderPopoverComponent_ng_template_3_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.visible = false);
    });
    \u0275\u0275text(5, "H\u1EE7y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 9);
    \u0275\u0275listener("click", function CreateFolderPopoverComponent_ng_template_3_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275text(7, "T\u1EA1o");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.name);
    \u0275\u0275advance(5);
    \u0275\u0275property("nzLoading", ctx_r1.loading);
  }
}
var _CreateFolderPopoverComponent = class _CreateFolderPopoverComponent {
  constructor() {
    this.parentId = null;
    this.currentFolderName = "T\xE0i li\u1EC7u c\u1EE7a t\xF4i";
    this.buttonType = "primary";
    this.buttonIcon = "folder-add";
    this.buttonText = "";
    this.buttonClass = "";
    this.placement = "bottomRight";
    this.created = new EventEmitter();
    this.visible = false;
    this.name = "";
    this.loading = false;
    this.filesFoldersService = inject(FilesFoldersService);
    this.message = inject(NzMessageService);
  }
  open() {
    this.visible = true;
  }
  async submit() {
    if (!this.name || !this.name.trim()) {
      this.message.error("T\xEAn th\u01B0 m\u1EE5c kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng");
      return;
    }
    const invalidChars = /[\\/:*?"<>|]/;
    if (invalidChars.test(this.name)) {
      this.message.error('T\xEAn th\u01B0 m\u1EE5c kh\xF4ng \u0111\u01B0\u1EE3c ch\u1EE9a c\xE1c k\xFD t\u1EF1 \u0111\u1EB7c bi\u1EC7t: \\ / : * ? " < > |');
      return;
    }
    this.loading = true;
    try {
      await this.filesFoldersService.createFolder(this.name, this.parentId);
      this.message.success("\u0110\xE3 g\u1EEDi y\xEAu c\u1EA7u t\u1EA1o th\u01B0 m\u1EE5c");
      this.visible = false;
      this.name = "";
      this.created.emit();
      this.filesFoldersService.notifyRefresh();
    } catch (error) {
      this.message.error("L\u1ED7i khi t\u1EA1o th\u01B0 m\u1EE5c");
    } finally {
      this.loading = false;
    }
  }
};
_CreateFolderPopoverComponent.\u0275fac = function CreateFolderPopoverComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _CreateFolderPopoverComponent)();
};
_CreateFolderPopoverComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CreateFolderPopoverComponent, selectors: [["app-create-folder-popover"]], inputs: { parentId: "parentId", currentFolderName: "currentFolderName", buttonType: "buttonType", buttonIcon: "buttonIcon", buttonText: "buttonText", buttonClass: "buttonClass", placement: "placement" }, outputs: { created: "created" }, decls: 5, vars: 9, consts: [["contentTemplate", ""], ["folderInput", ""], ["nz-button", "", "nz-popover", "", "nzPopoverTrigger", "click", 3, "nzPopoverVisibleChange", "nzType", "nzPopoverVisible", "nzPopoverTitle", "nzPopoverContent", "nzPopoverPlacement"], ["nz-icon", "", 3, "nzType"], [4, "ngIf"], [1, "popover-content"], ["nz-input", "", "placeholder", "T\xEAn th\u01B0 m\u1EE5c", 3, "ngModelChange", "keyup.enter", "ngModel"], [1, "popover-footer"], ["nz-button", "", "nzType", "default", "nzSize", "small", 3, "click"], ["nz-button", "", "nzType", "primary", "nzSize", "small", 3, "click", "nzLoading"]], template: function CreateFolderPopoverComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 2);
    \u0275\u0275twoWayListener("nzPopoverVisibleChange", function CreateFolderPopoverComponent_Template_button_nzPopoverVisibleChange_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.visible, $event) || (ctx.visible = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275element(1, "span", 3);
    \u0275\u0275template(2, CreateFolderPopoverComponent_span_2_Template, 2, 1, "span", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, CreateFolderPopoverComponent_ng_template_3_Template, 8, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    const contentTemplate_r4 = \u0275\u0275reference(4);
    \u0275\u0275classMap(ctx.buttonClass);
    \u0275\u0275property("nzType", ctx.buttonType);
    \u0275\u0275twoWayProperty("nzPopoverVisible", ctx.visible);
    \u0275\u0275property("nzPopoverTitle", "T\u1EA1o m\u1EDBi folder, trong folder hi\u1EC7n t\u1EA1i: " + ctx.currentFolderName)("nzPopoverContent", contentTemplate_r4)("nzPopoverPlacement", ctx.placement);
    \u0275\u0275advance();
    \u0275\u0275property("nzType", ctx.buttonIcon);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.buttonText);
  }
}, dependencies: [CommonModule, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, NzPopoverModule, NzPopoverDirective, NzButtonModule, NzButtonComponent, NzTransitionPatchDirective, NzWaveDirective, NzIconModule, NzIconDirective, NzInputModule, NzInputDirective], styles: ["\n.popover-content[_ngcontent-%COMP%] {\n  width: 200px;\n}\n.popover-footer[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n/*# sourceMappingURL=create-folder-popover.component.css.map */"] });
var CreateFolderPopoverComponent = _CreateFolderPopoverComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CreateFolderPopoverComponent, [{
    type: Component,
    args: [{
      selector: "app-create-folder-popover",
      standalone: true,
      imports: [
        CommonModule,
        FormsModule,
        NzPopoverModule,
        NzButtonModule,
        NzIconModule,
        NzInputModule
      ],
      template: `
    <button 
      nz-button 
      [nzType]="buttonType" 
      nz-popover
      [(nzPopoverVisible)]="visible"
      nzPopoverTrigger="click"
      [nzPopoverTitle]="'T\u1EA1o m\u1EDBi folder, trong folder hi\u1EC7n t\u1EA1i: ' + currentFolderName"
      [nzPopoverContent]="contentTemplate"
      [nzPopoverPlacement]="placement"
      [class]="buttonClass"
    >
      <span nz-icon [nzType]="buttonIcon"></span>
      <span *ngIf="buttonText">{{ buttonText }}</span>
    </button>

    <ng-template #contentTemplate>
      <div class="popover-content">
        <input 
          nz-input 
          placeholder="T\xEAn th\u01B0 m\u1EE5c" 
          [(ngModel)]="name" 
          (keyup.enter)="submit()"
          #folderInput
        />
        <div class="popover-footer">
          <button nz-button nzType="default" nzSize="small" (click)="visible = false">H\u1EE7y</button>
          <button nz-button nzType="primary" nzSize="small" (click)="submit()" [nzLoading]="loading">T\u1EA1o</button>
        </div>
      </div>
    </ng-template>

    <style>
      .popover-content {
        width: 200px;
      }
      .popover-footer {
        margin-top: 8px;
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
    </style>
  `
    }]
  }], null, { parentId: [{
    type: Input
  }], currentFolderName: [{
    type: Input
  }], buttonType: [{
    type: Input
  }], buttonIcon: [{
    type: Input
  }], buttonText: [{
    type: Input
  }], buttonClass: [{
    type: Input
  }], placement: [{
    type: Input
  }], created: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CreateFolderPopoverComponent, { className: "CreateFolderPopoverComponent", filePath: "projects/tot/business-files/src/lib/components/create-folder-popover/create-folder-popover.component.ts", lineNumber: 67 });
})();

// projects/tot/business-files/src/lib/components/folder-tree/folder-tree.ts
var _c03 = ["treeComponent"];
var _c12 = (a0) => [a0];
var _FolderTreeComponent = class _FolderTreeComponent {
  constructor() {
    this.folderSelected = new EventEmitter();
    this.folderCreated = new EventEmitter();
    this.filesFoldersService = inject(FilesFoldersService);
    this.nzContextMenuService = inject(NzContextMenuService);
    this.modal = inject(NzModalService);
    this.message = inject(NzMessageService);
    this.nodes = [
      {
        title: "T\xE0i li\u1EC7u c\u1EE7a t\xF4i",
        key: "root",
        expanded: true,
        selected: true,
        icon: "folder-open",
        children: []
      }
    ];
    this.selectedNodeKey = "root";
    this.createPopoverVisible = false;
    this.newFolderName = "";
    this.creating = false;
    this.contextNode = null;
  }
  get currentFolderName() {
    var _a;
    if (this.contextNode)
      return this.contextNode.title;
    const selectedNode = (_a = this.treeComponent) == null ? void 0 : _a.getSelectedNodeList()[0];
    return selectedNode ? selectedNode.title : "T\xE0i li\u1EC7u c\u1EE7a t\xF4i";
  }
  get selectedParentId() {
    var _a;
    if (this.contextNode)
      return this.contextNode.key === "root" ? null : this.contextNode.key;
    const selectedNode = (_a = this.treeComponent) == null ? void 0 : _a.getSelectedNodeList()[0];
    if (!selectedNode)
      return null;
    return selectedNode.key === "root" ? null : selectedNode.key;
  }
  ngOnInit() {
    this.loadTree();
    this.refreshSub = this.filesFoldersService.refresh$.subscribe(() => {
      this.loadTree();
    });
    this.selectFolderSub = this.filesFoldersService.selectFolder$.subscribe((folderId) => {
      this.selectAndExpandFolder(folderId);
    });
    setTimeout(() => {
      this.folderSelected.emit(null);
    }, 0);
  }
  ngOnDestroy() {
    var _a, _b;
    (_a = this.refreshSub) == null ? void 0 : _a.unsubscribe();
    (_b = this.selectFolderSub) == null ? void 0 : _b.unsubscribe();
  }
  async loadTree() {
    try {
      const folders = await this.filesFoldersService.getFolderTree();
      this.nodes[0].children = this.mapFoldersToNodes(folders);
      this.nodes[0].selected = this.selectedNodeKey === "root";
      this.nodes = [...this.nodes];
    } catch (error) {
      console.error("Failed to load folder tree", error);
    }
  }
  mapFoldersToNodes(folders) {
    return folders.map((f) => ({
      title: f.name,
      key: f.id,
      isLeaf: !f.children || f.children.length === 0,
      selected: this.selectedNodeKey === f.id,
      children: f.children ? this.mapFoldersToNodes(f.children) : []
    }));
  }
  onEvent(event) {
    if (event.eventName === "click") {
      const node = event.node;
      if (node) {
        this.selectedNodeKey = node.key;
        this.folderSelected.emit(node.key === "root" ? null : node.key);
      }
    }
  }
  onContextMenu(event, menu) {
    this.contextNode = event.node || null;
    this.nzContextMenuService.create(event.event, menu);
  }
  openCreatePopoverFromContext() {
    if (this.contextNode) {
      this.selectedNodeKey = this.contextNode.key;
      this.folderSelected.emit(this.selectedNodeKey === "root" ? null : this.selectedNodeKey);
      this.createPopover.open();
    }
  }
  deleteFolder(node) {
    if (node.key === "root")
      return;
    this.modal.confirm({
      nzTitle: "X\xE1c nh\u1EADn x\xF3a",
      nzContent: `B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a th\u01B0 m\u1EE5c "${node.title}" v\xE0 to\xE0n b\u1ED9 n\u1ED9i dung b\xEAn trong?`,
      nzOkDanger: true,
      nzOnOk: async () => {
        try {
          await this.filesFoldersService.deleteFolder(node.key);
          this.message.success("\u0110\xE3 g\u1EEDi y\xEAu c\u1EA7u x\xF3a th\u01B0 m\u1EE5c");
          this.filesFoldersService.notifyRefresh();
        } catch (error) {
          this.message.error("L\u1ED7i khi x\xF3a th\u01B0 m\u1EE5c");
        }
      }
    });
  }
  renameFolder(node) {
    if (node.key === "root")
      return;
    this.message.info("T\xEDnh n\u0103ng \u0111\u1ED5i t\xEAn \u0111ang \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt");
  }
  selectAndExpandFolder(folderId) {
    const key = folderId || "root";
    this.selectedNodeKey = key;
    const node = this.treeComponent.getTreeNodeByKey(key);
    if (node) {
      node.isSelected = true;
      this.selectedNodeKey = key;
      let parent = node.getParentNode();
      while (parent) {
        parent.isExpanded = true;
        parent = parent.getParentNode();
      }
      this.folderSelected.emit(folderId);
    } else {
      console.warn("Folder node not found:", key);
    }
  }
};
_FolderTreeComponent.\u0275fac = function FolderTreeComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FolderTreeComponent)();
};
_FolderTreeComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FolderTreeComponent, selectors: [["app-folder-tree"]], viewQuery: function FolderTreeComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c03, 5)(CreateFolderPopoverComponent, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.treeComponent = _t.first);
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.createPopover = _t.first);
  }
}, outputs: { folderSelected: "folderSelected", folderCreated: "folderCreated" }, decls: 20, vars: 6, consts: [["treeComponent", ""], ["menu", "nzDropdownMenu"], [1, "tree-container"], [1, "tree-header"], ["buttonType", "text", "buttonIcon", "folder-add", "placement", "bottomRight", 3, "parentId", "currentFolderName"], ["nzShowIcon", "", 3, "nzClick", "nzExpandChange", "nzContextMenu", "nzData", "nzSelectedKeys"], ["nz-menu", ""], ["nz-menu-item", "", 3, "click"], ["nz-icon", "", "nzType", "plus"], ["nz-icon", "", "nzType", "edit"], ["nz-menu-divider", ""], ["nz-menu-item", "", "nzDanger", "", 3, "click"], ["nz-icon", "", "nzType", "delete"]], template: function FolderTreeComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h3");
    \u0275\u0275text(3, "Th\u01B0 m\u1EE5c");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "app-create-folder-popover", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "nz-tree", 5, 0);
    \u0275\u0275listener("nzClick", function FolderTreeComponent_Template_nz_tree_nzClick_5_listener($event) {
      return ctx.onEvent($event);
    })("nzExpandChange", function FolderTreeComponent_Template_nz_tree_nzExpandChange_5_listener($event) {
      return ctx.onEvent($event);
    })("nzContextMenu", function FolderTreeComponent_Template_nz_tree_nzContextMenu_5_listener($event) {
      \u0275\u0275restoreView(_r1);
      const menu_r2 = \u0275\u0275reference(8);
      return \u0275\u0275resetView(ctx.onContextMenu($event, menu_r2));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "nz-dropdown-menu", null, 1)(9, "ul", 6)(10, "li", 7);
    \u0275\u0275listener("click", function FolderTreeComponent_Template_li_click_10_listener() {
      return ctx.openCreatePopoverFromContext();
    });
    \u0275\u0275element(11, "span", 8);
    \u0275\u0275text(12, " Th\xEAm th\u01B0 m\u1EE5c con ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "li", 7);
    \u0275\u0275listener("click", function FolderTreeComponent_Template_li_click_13_listener() {
      return ctx.renameFolder(ctx.contextNode);
    });
    \u0275\u0275element(14, "span", 9);
    \u0275\u0275text(15, " \u0110\u1ED5i t\xEAn ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "li", 10);
    \u0275\u0275elementStart(17, "li", 11);
    \u0275\u0275listener("click", function FolderTreeComponent_Template_li_click_17_listener() {
      return ctx.deleteFolder(ctx.contextNode);
    });
    \u0275\u0275element(18, "span", 12);
    \u0275\u0275text(19, " X\xF3a ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275property("parentId", ctx.selectedParentId)("currentFolderName", ctx.currentFolderName);
    \u0275\u0275advance();
    \u0275\u0275property("nzData", ctx.nodes)("nzSelectedKeys", \u0275\u0275pureFunction1(4, _c12, ctx.selectedNodeKey));
  }
}, dependencies: [
  CommonModule,
  FormsModule,
  NzTreeModule,
  NzTreeComponent,
  NzModalModule,
  NzInputModule,
  NzDropDownModule,
  NzMenuDirective,
  NzMenuItemComponent,
  NzMenuDividerDirective,
  NzDropdownMenuComponent,
  NzButtonModule,
  NzTransitionPatchDirective,
  NzIconModule,
  NzIconDirective,
  NzTooltipModule,
  NzPopoverModule,
  CreateFolderPopoverComponent
], styles: ["\n.tree-container[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.tree-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.tree-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 600;\n}\n  .nz-tree-node-title {\n  font-size: 14px;\n}\n/*# sourceMappingURL=folder-tree.css.map */", "\n.popover-content[_ngcontent-%COMP%] {\n  width: 200px;\n}\n.popover-footer[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n/*# sourceMappingURL=folder-tree.css.map */"] });
var FolderTreeComponent = _FolderTreeComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FolderTreeComponent, [{
    type: Component,
    args: [{ selector: "app-folder-tree", standalone: true, imports: [
      CommonModule,
      FormsModule,
      NzTreeModule,
      NzModalModule,
      NzInputModule,
      NzDropDownModule,
      NzButtonModule,
      NzIconModule,
      NzTooltipModule,
      NzPopoverModule,
      CreateFolderPopoverComponent
    ], template: '<div class="tree-container">\n  <div class="tree-header">\n    <h3>Th\u01B0 m\u1EE5c</h3>\n    <app-create-folder-popover\n      [parentId]="selectedParentId"\n      [currentFolderName]="currentFolderName"\n      buttonType="text"\n      buttonIcon="folder-add"\n      placement="bottomRight"\n    ></app-create-folder-popover>\n  </div>\n  <nz-tree\n    #treeComponent\n    [nzData]="nodes"\n    [nzSelectedKeys]="[selectedNodeKey]"\n    nzShowIcon\n    (nzClick)="onEvent($any($event))"\n    (nzExpandChange)="onEvent($any($event))"\n    (nzContextMenu)="onContextMenu($any($event), menu)"\n  >\n  </nz-tree>\n\n  <nz-dropdown-menu #menu="nzDropdownMenu">\n    <ul nz-menu>\n      <li nz-menu-item (click)="openCreatePopoverFromContext()">\n        <span nz-icon nzType="plus"></span> Th\xEAm th\u01B0 m\u1EE5c con\n      </li>\n      <li nz-menu-item (click)="renameFolder(contextNode!)">\n        <span nz-icon nzType="edit"></span> \u0110\u1ED5i t\xEAn\n      </li>\n      <li nz-menu-divider></li>\n      <li nz-menu-item nzDanger (click)="deleteFolder(contextNode!)">\n        <span nz-icon nzType="delete"></span> X\xF3a\n      </li>\n    </ul>\n  </nz-dropdown-menu>\n\n</div>\n\n<style>\n  .popover-content {\n    width: 200px;\n  }\n  .popover-footer {\n    margin-top: 8px;\n    display: flex;\n    justify-content: flex-end;\n    gap: 8px;\n  }\n</style>\n', styles: ["/* projects/tot/business-files/src/lib/components/folder-tree/folder-tree.css */\n.tree-container {\n  padding: 16px;\n}\n.tree-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.tree-header h3 {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 600;\n}\n::ng-deep .nz-tree-node-title {\n  font-size: 14px;\n}\n/*# sourceMappingURL=folder-tree.css.map */\n", "/* angular:styles/component:css;919fdfca84b012487c20dd19b7e07eee72c17eba4f8e8e370f53f96f830c5cdd;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/projects/tot/business-files/src/lib/components/folder-tree/folder-tree.html */\n.popover-content {\n  width: 200px;\n}\n.popover-footer {\n  margin-top: 8px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n/*# sourceMappingURL=folder-tree.css.map */\n"] }]
  }], null, { folderSelected: [{
    type: Output
  }], folderCreated: [{
    type: Output
  }], treeComponent: [{
    type: ViewChild,
    args: ["treeComponent", { static: false }]
  }], createPopover: [{
    type: ViewChild,
    args: [CreateFolderPopoverComponent]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FolderTreeComponent, { className: "FolderTreeComponent", filePath: "projects/tot/business-files/src/lib/components/folder-tree/folder-tree.ts", lineNumber: 36 });
})();

// projects/tot/business-files/src/lib/components/file-share-modal/file-share-modal.component.ts
function FileShareModalComponent_div_0_div_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25);
    \u0275\u0275element(2, "span", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 27)(4, "h3");
    \u0275\u0275text(5, "Truy c\u1EADp ri\xEAng t\u01B0");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Ch\u1EC9 b\u1EA1n m\u1EDBi c\xF3 quy\u1EC1n xem v\xE0 qu\u1EA3n l\xFD t\u1EC7p n\xE0y. \u0110\xE2y l\xE0 ch\u1EBF \u0111\u1ED9 an to\xE0n nh\u1EA5t.");
    \u0275\u0275elementEnd()()();
  }
}
function FileShareModalComponent_div_0_div_28_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function FileShareModalComponent_div_0_div_28_ng_template_11_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.copyLink((ctx_r1.file == null ? null : ctx_r1.file.url) || ""));
    });
    \u0275\u0275element(1, "span", 34);
    \u0275\u0275text(2, " Sao ch\xE9p ");
    \u0275\u0275elementEnd();
  }
}
function FileShareModalComponent_div_0_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 28);
    \u0275\u0275element(2, "span", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 27)(4, "h3");
    \u0275\u0275text(5, "Truy c\u1EADp c\xF4ng khai");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "B\u1EA5t k\u1EF3 ai c\xF3 \u0111\u01B0\u1EDDng d\u1EABn tr\u1EF1c ti\u1EBFp t\u1EEB GCS \u0111\u1EC1u c\xF3 th\u1EC3 xem t\u1EC7p n\xE0y.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 30)(9, "nz-input-group", 31);
    \u0275\u0275element(10, "input", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, FileShareModalComponent_div_0_div_28_ng_template_11_Template, 3, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const copyButton_r4 = \u0275\u0275reference(12);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275property("nzAddOnAfter", copyButton_r4);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.file == null ? null : ctx_r1.file.url);
  }
}
function FileShareModalComponent_div_0_div_29_div_17_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function FileShareModalComponent_div_0_div_29_div_17_ng_template_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.copyLink(ctx_r1.signedUrl));
    });
    \u0275\u0275element(1, "span", 34);
    \u0275\u0275text(2, " Sao ch\xE9p ");
    \u0275\u0275elementEnd();
  }
}
function FileShareModalComponent_div_0_div_29_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "nz-input-group", 31);
    \u0275\u0275element(2, "input", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, FileShareModalComponent_div_0_div_29_div_17_ng_template_3_Template, 3, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const copySignedButton_r7 = \u0275\u0275reference(4);
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("nzAddOnAfter", copySignedButton_r7);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r1.signedUrl);
  }
}
function FileShareModalComponent_div_0_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 35);
    \u0275\u0275element(2, "span", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 27)(4, "h3");
    \u0275\u0275text(5, "\u0110\u01B0\u1EDDng d\u1EABn t\u1EA1m th\u1EDDi");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "T\u1EA1o m\u1ED9t li\xEAn k\u1EBFt c\xF3 th\u1EDDi h\u1EA1n truy c\u1EADp ng\u1EAFn (Signed URL).");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 37)(9, "span", 38);
    \u0275\u0275text(10, "Hi\u1EC7u l\u1EF1c trong:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "nz-select", 39);
    \u0275\u0275twoWayListener("ngModelChange", function FileShareModalComponent_div_0_div_29_Template_nz_select_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.durationHours, $event) || (ctx_r1.durationHours = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275element(12, "nz-option", 40)(13, "nz-option", 41)(14, "nz-option", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 43);
    \u0275\u0275listener("click", function FileShareModalComponent_div_0_div_29_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.generateSignedUrl());
    });
    \u0275\u0275text(16, " T\u1EA1o Link ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, FileShareModalComponent_div_0_div_29_div_17_Template, 5, 2, "div", 44);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.durationHours);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", 1);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", 24);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", 168);
    \u0275\u0275advance();
    \u0275\u0275property("nzLoading", ctx_r1.generating);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.signedUrl);
  }
}
function FileShareModalComponent_div_0_div_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 45);
    \u0275\u0275element(2, "span", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 27)(4, "h3");
    \u0275\u0275text(5, "Truy c\u1EADp b\u1EA3o m\u1EADt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Y\xEAu c\u1EA7u ng\u01B0\u1EDDi d\xF9ng nh\u1EADp m\xE3 x\xE1c th\u1EF1c v\xE0 gi\u1EDBi h\u1EA1n th\u1EDDi gian truy c\u1EADp.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "form", 47)(9, "div", 48)(10, "div", 49)(11, "nz-form-item")(12, "nz-form-label", 50);
    \u0275\u0275text(13, "M\xE3 b\xED m\u1EADt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "nz-form-control", 51)(15, "nz-input-group", 52);
    \u0275\u0275element(16, "input", 53);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "div", 49)(18, "nz-form-item")(19, "nz-form-label");
    \u0275\u0275text(20, "Ng\xE0y h\u1EBFt h\u1EA1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "nz-form-control");
    \u0275\u0275element(22, "nz-date-picker", 54);
    \u0275\u0275elementEnd()()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275property("formGroup", ctx_r1.secureForm);
  }
}
function FileShareModalComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "div", 5);
    \u0275\u0275element(3, "span", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 7)(5, "div", 8);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 9);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(9, "nz-divider");
    \u0275\u0275elementStart(10, "div", 10)(11, "div", 11);
    \u0275\u0275text(12, "Ch\u1EBF \u0111\u1ED9 chia s\u1EBB");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "nz-radio-group", 12);
    \u0275\u0275twoWayListener("ngModelChange", function FileShareModalComponent_div_0_Template_nz_radio_group_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.shareMode, $event) || (ctx_r1.shareMode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function FileShareModalComponent_div_0_Template_nz_radio_group_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onModeChange($event));
    });
    \u0275\u0275elementStart(14, "label", 13);
    \u0275\u0275element(15, "span", 14);
    \u0275\u0275text(16, " Ri\xEAng t\u01B0 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "label", 13);
    \u0275\u0275element(18, "span", 15);
    \u0275\u0275text(19, " C\xF4ng khai ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "label", 13);
    \u0275\u0275element(21, "span", 16);
    \u0275\u0275text(22, " T\u1EA1m th\u1EDDi ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "label", 13);
    \u0275\u0275element(24, "span", 17);
    \u0275\u0275text(25, " B\u1EA3o m\u1EADt ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "div", 18);
    \u0275\u0275template(27, FileShareModalComponent_div_0_div_27_Template, 8, 0, "div", 19)(28, FileShareModalComponent_div_0_div_28_Template, 13, 2, "div", 19)(29, FileShareModalComponent_div_0_div_29_Template, 18, 6, "div", 19)(30, FileShareModalComponent_div_0_div_30_Template, 23, 1, "div", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 20)(32, "button", 21);
    \u0275\u0275listener("click", function FileShareModalComponent_div_0_Template_button_click_32_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleCancel($event));
    });
    \u0275\u0275text(33, "B\u1ECF qua");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 22);
    \u0275\u0275listener("click", function FileShareModalComponent_div_0_Template_button_click_34_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitForm());
    });
    \u0275\u0275element(35, "span", 23);
    \u0275\u0275text(36, " \xC1p d\u1EE5ng thay \u0111\u1ED5i ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.file == null ? null : ctx_r1.file.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r1.formatSize((ctx_r1.file == null ? null : ctx_r1.file.size) || 0), " \u2022 ", ctx_r1.file == null ? null : ctx_r1.file.mimeType);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.shareMode);
    \u0275\u0275advance();
    \u0275\u0275property("nzValue", "private");
    \u0275\u0275advance(3);
    \u0275\u0275property("nzValue", "public");
    \u0275\u0275advance(3);
    \u0275\u0275property("nzValue", "signed");
    \u0275\u0275advance(3);
    \u0275\u0275property("nzValue", "secure");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.shareMode === "private");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.shareMode === "public");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.shareMode === "signed");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.shareMode === "secure");
    \u0275\u0275advance(4);
    \u0275\u0275property("nzLoading", ctx_r1.submitting);
  }
}
var _FileShareModalComponent = class _FileShareModalComponent {
  constructor() {
    this.modalData = inject(NZ_MODAL_DATA);
    this.file = this.modalData.file;
    this.fb = inject(FormBuilder);
    this.modal = inject(NzModalRef);
    this.filesFoldersService = inject(FilesFoldersService);
    this.message = inject(NzMessageService);
    this.shareMode = "private";
    this.signedUrl = "";
    this.durationHours = 24;
    this.generating = false;
    this.submitting = false;
    this.secureForm = this.fb.group({
      shareCode: ["", [Validators.required]],
      expiredAt: [null]
    });
  }
  ngOnInit() {
    this.fetchFileDetails();
  }
  async fetchFileDetails() {
    var _a;
    if (!((_a = this.file) == null ? void 0 : _a.id))
      return;
    try {
      const latestFile = await this.filesFoldersService.getFileDetail(this.file.id);
      this.file = latestFile;
      this.updateModeFromPermission();
    } catch (error) {
      this.message.error("L\u1ED7i khi t\u1EA3i th\xF4ng tin chi ti\u1EBFt file");
      this.updateModeFromPermission();
    }
  }
  updateModeFromPermission() {
    if (this.file) {
      if (this.file.permission === 1)
        this.shareMode = "public";
      else if (this.file.permission === 2) {
        this.shareMode = "secure";
        this.secureForm.patchValue({
          shareCode: this.file.shareCode || "",
          expiredAt: this.file.expiredAt ? new Date(this.file.expiredAt) : null
        });
      } else {
        this.shareMode = "private";
      }
    }
  }
  onModeChange(mode) {
    this.signedUrl = "";
  }
  async generateSignedUrl() {
    this.generating = true;
    try {
      const res = await this.filesFoldersService.getShareUrl(this.file.id, this.durationHours);
      this.signedUrl = res.url;
      this.message.success("\u0110\xE3 t\u1EA1o link t\u1EA1m th\u1EDDi");
    } catch (error) {
      this.message.error("L\u1ED7i khi t\u1EA1o link t\u1EA1m th\u1EDDi");
    } finally {
      this.generating = false;
    }
  }
  copyLink(url) {
    if (!url)
      return;
    navigator.clipboard.writeText(url).then(() => {
      this.message.success("\u0110\xE3 copy link v\xE0o b\u1ED9 nh\u1EDB t\u1EA1m");
    });
  }
  async submitForm() {
    this.submitting = true;
    try {
      let permission = 0;
      let shareCode = "";
      let expiredAt = null;
      if (this.shareMode === "public") {
        permission = 1;
      } else if (this.shareMode === "secure") {
        if (this.secureForm.invalid) {
          this.message.error("Vui l\xF2ng nh\u1EADp \u0111\u1EA7y \u0111\u1EE7 th\xF4ng tin b\u1EA3o m\u1EADt");
          this.submitting = false;
          return;
        }
        permission = 2;
        shareCode = this.secureForm.value.shareCode;
        expiredAt = this.secureForm.value.expiredAt;
      } else if (this.shareMode === "signed") {
        permission = 0;
      }
      await this.filesFoldersService.setFilePermission(this.file.id, permission, shareCode, expiredAt ? expiredAt.toISOString() : void 0);
      this.message.success("C\u1EADp nh\u1EADt quy\u1EC1n truy c\u1EADp th\xE0nh c\xF4ng");
      this.modal.close(true);
    } catch (error) {
      this.message.error("L\u1ED7i khi c\u1EADp nh\u1EADt quy\u1EC1n truy c\u1EADp");
    } finally {
      this.submitting = false;
    }
  }
  handleCancel(event) {
    event.preventDefault();
    this.modal.close();
  }
  formatSize(bytes) {
    if (bytes === 0)
      return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
};
_FileShareModalComponent.\u0275fac = function FileShareModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FileShareModalComponent)();
};
_FileShareModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FileShareModalComponent, selectors: [["app-file-share-modal"]], decls: 1, vars: 1, consts: [["copyButton", ""], ["copySignedButton", ""], ["class", "share-container", 4, "ngIf"], [1, "share-container"], [1, "header-info"], [1, "file-icon"], ["nz-icon", "", "nzType", "file", "nzTheme", "twotone"], [1, "file-details"], [1, "file-name", "text-truncate"], [1, "file-meta"], [1, "mode-selector"], [1, "section-title"], ["nzButtonStyle", "solid", 1, "full-width-group", 3, "ngModelChange", "ngModel"], ["nz-radio-button", "", 3, "nzValue"], ["nz-icon", "", "nzType", "lock"], ["nz-icon", "", "nzType", "global"], ["nz-icon", "", "nzType", "clock-circle"], ["nz-icon", "", "nzType", "safety"], [1, "mode-content", "mt-4"], ["class", "mode-card animate-in", 4, "ngIf"], [1, "modal-footer", "mt-4"], ["nz-button", "", "nzType", "default", 3, "click"], ["nz-button", "", "nzType", "primary", 1, "ml-2", "save-btn", 3, "click", "nzLoading"], ["nz-icon", "", "nzType", "check"], [1, "mode-card", "animate-in"], [1, "mode-icon", "private"], ["nz-icon", "", "nzType", "lock", "nzTheme", "outline"], [1, "mode-text"], [1, "mode-icon", "public"], ["nz-icon", "", "nzType", "global", "nzTheme", "outline"], [1, "url-copy-box", "mt-3"], [3, "nzAddOnAfter"], ["nz-input", "", "readonly", "", 3, "ngModel"], ["nz-button", "", "nzType", "primary", 3, "click"], ["nz-icon", "", "nzType", "copy"], [1, "mode-icon", "signed"], ["nz-icon", "", "nzType", "link", "nzTheme", "outline"], [1, "duration-selector", "mt-3"], [1, "label"], [2, "width", "140px", 3, "ngModelChange", "ngModel"], ["nzLabel", "1 gi\u1EDD", 3, "nzValue"], ["nzLabel", "24 gi\u1EDD", 3, "nzValue"], ["nzLabel", "7 ng\xE0y", 3, "nzValue"], ["nz-button", "", "nzType", "primary", 1, "ml-2", 3, "click", "nzLoading"], ["class", "url-copy-box mt-3", 4, "ngIf"], [1, "mode-icon", "secure"], ["nz-icon", "", "nzType", "safety", "nzTheme", "outline"], ["nz-form", "", "nzLayout", "vertical", 1, "mt-3", 3, "formGroup"], [1, "row"], [1, "col-6"], ["nzRequired", ""], ["nzErrorTip", "Vui l\xF2ng nh\u1EADp m\xE3"], ["nzPrefixIcon", "key"], ["nz-input", "", "formControlName", "shareCode", "placeholder", "vd: 123456"], ["formControlName", "expiredAt", "nzShowTime", "", 2, "width", "100%"]], template: function FileShareModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, FileShareModalComponent_div_0_Template, 37, 13, "div", 2);
  }
  if (rf & 2) {
    \u0275\u0275property("ngIf", ctx.file);
  }
}, dependencies: [
  CommonModule,
  NgIf,
  FormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  ReactiveFormsModule,
  FormGroupDirective,
  FormControlName,
  NzModalModule,
  NzFormModule,
  NzColDirective,
  NzRowDirective,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormControlComponent,
  NzInputModule,
  NzInputDirective,
  NzInputGroupComponent,
  NzRadioModule,
  NzRadioComponent,
  NzRadioGroupComponent,
  NzDatePickerModule,
  NzDatePickerComponent,
  NzButtonModule,
  NzButtonComponent,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzSelectModule,
  NzOptionComponent,
  NzSelectComponent,
  NzIconModule,
  NzIconDirective,
  NzDividerModule,
  NzDividerComponent
], styles: ['\n.share-container[_ngcontent-%COMP%] {\n  padding: 4px;\n  font-family:\n    "Inter",\n    -apple-system,\n    sans-serif;\n}\n.header-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 8px;\n}\n.file-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  background: #f0f7ff;\n  padding: 12px;\n  border-radius: 12px;\n  display: flex;\n}\n.file-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 16px;\n  color: #1a1a1a;\n  max-width: 300px;\n}\n.file-meta[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #8c8c8c;\n  margin-top: 2px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-weight: 500;\n  font-size: 14px;\n  margin-bottom: 12px;\n  color: #595959;\n}\n.full-width-group[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n}\n.full-width-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center;\n}\n.mode-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  padding: 20px;\n  background: #fdfdfd;\n  border: 1px solid #f0f0f0;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);\n  min-height: 160px;\n}\n.mode-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.mode-icon.private[_ngcontent-%COMP%] {\n  background: #fff1f0;\n  color: #ff4d4f;\n}\n.mode-icon.public[_ngcontent-%COMP%] {\n  background: #f6ffed;\n  color: #52c41a;\n}\n.mode-icon.signed[_ngcontent-%COMP%] {\n  background: #e6f7ff;\n  color: #1890ff;\n}\n.mode-icon.secure[_ngcontent-%COMP%] {\n  background: #f9f0ff;\n  color: #722ed1;\n}\n.mode-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 16px;\n  font-weight: 600;\n  color: #262626;\n}\n.mode-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  color: #8c8c8c;\n  line-height: 1.5;\n}\n.url-copy-box[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  padding: 4px;\n  border-radius: 8px;\n}\n.duration-selector[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.duration-selector[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #595959;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  padding-top: 16px;\n  border-top: 1px solid #f0f0f0;\n}\n.save-btn[_ngcontent-%COMP%] {\n  min-width: 140px;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  margin: 0 -8px;\n}\n.col-6[_ngcontent-%COMP%] {\n  flex: 0 0 50%;\n  padding: 0 8px;\n}\n.mt-3[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.mt-4[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.ml-2[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\n.text-truncate[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.animate-in[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_slide-up 0.3s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slide-up {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=file-share-modal.component.css.map */'] });
var FileShareModalComponent = _FileShareModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FileShareModalComponent, [{
    type: Component,
    args: [{ selector: "app-file-share-modal", standalone: true, imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NzModalModule,
      NzFormModule,
      NzInputModule,
      NzRadioModule,
      NzDatePickerModule,
      NzButtonModule,
      NzSelectModule,
      NzIconModule,
      NzDividerModule
    ], template: `
    <div class="share-container" *ngIf="file">
      <div class="header-info">
        <div class="file-icon">
          <span nz-icon nzType="file" nzTheme="twotone"></span>
        </div>
        <div class="file-details">
          <div class="file-name text-truncate">{{ file?.name }}</div>
          <div class="file-meta">{{ formatSize(file?.size || 0) }} \u2022 {{ file?.mimeType }}</div>
        </div>
      </div>

      <nz-divider></nz-divider>

      <div class="mode-selector">
        <div class="section-title">Ch\u1EBF \u0111\u1ED9 chia s\u1EBB</div>
        <nz-radio-group [(ngModel)]="shareMode" (ngModelChange)="onModeChange($event)" nzButtonStyle="solid" class="full-width-group">
          <label nz-radio-button [nzValue]="'private'">
            <span nz-icon nzType="lock"></span> Ri\xEAng t\u01B0
          </label>
          <label nz-radio-button [nzValue]="'public'">
            <span nz-icon nzType="global"></span> C\xF4ng khai
          </label>
          <label nz-radio-button [nzValue]="'signed'">
            <span nz-icon nzType="clock-circle"></span> T\u1EA1m th\u1EDDi
          </label>
          <label nz-radio-button [nzValue]="'secure'">
            <span nz-icon nzType="safety"></span> B\u1EA3o m\u1EADt
          </label>
        </nz-radio-group>
      </div>

      <div class="mode-content mt-4">
        <!-- Private Mode -->
        <div *ngIf="shareMode === 'private'" class="mode-card animate-in">
          <div class="mode-icon private"><span nz-icon nzType="lock" nzTheme="outline"></span></div>
          <div class="mode-text">
            <h3>Truy c\u1EADp ri\xEAng t\u01B0</h3>
            <p>Ch\u1EC9 b\u1EA1n m\u1EDBi c\xF3 quy\u1EC1n xem v\xE0 qu\u1EA3n l\xFD t\u1EC7p n\xE0y. \u0110\xE2y l\xE0 ch\u1EBF \u0111\u1ED9 an to\xE0n nh\u1EA5t.</p>
          </div>
        </div>

        <!-- Public Mode -->
        <div *ngIf="shareMode === 'public'" class="mode-card animate-in">
          <div class="mode-icon public"><span nz-icon nzType="global" nzTheme="outline"></span></div>
          <div class="mode-text">
            <h3>Truy c\u1EADp c\xF4ng khai</h3>
            <p>B\u1EA5t k\u1EF3 ai c\xF3 \u0111\u01B0\u1EDDng d\u1EABn tr\u1EF1c ti\u1EBFp t\u1EEB GCS \u0111\u1EC1u c\xF3 th\u1EC3 xem t\u1EC7p n\xE0y.</p>
            <div class="url-copy-box mt-3">
              <nz-input-group [nzAddOnAfter]="copyButton">
                <input nz-input [ngModel]="file?.url" readonly />
              </nz-input-group>
              <ng-template #copyButton>
                <button nz-button (click)="copyLink(file?.url || '')" nzType="primary">
                  <span nz-icon nzType="copy"></span> Sao ch\xE9p
                </button>
              </ng-template>
            </div>
          </div>
        </div>

        <!-- Signed URL Mode -->
        <div *ngIf="shareMode === 'signed'" class="mode-card animate-in">
          <div class="mode-icon signed"><span nz-icon nzType="link" nzTheme="outline"></span></div>
          <div class="mode-text">
            <h3>\u0110\u01B0\u1EDDng d\u1EABn t\u1EA1m th\u1EDDi</h3>
            <p>T\u1EA1o m\u1ED9t li\xEAn k\u1EBFt c\xF3 th\u1EDDi h\u1EA1n truy c\u1EADp ng\u1EAFn (Signed URL).</p>
            
            <div class="duration-selector mt-3">
              <span class="label">Hi\u1EC7u l\u1EF1c trong:</span>
              <nz-select [(ngModel)]="durationHours" style="width: 140px">
                <nz-option [nzValue]="1" nzLabel="1 gi\u1EDD"></nz-option>
                <nz-option [nzValue]="24" nzLabel="24 gi\u1EDD"></nz-option>
                <nz-option [nzValue]="168" nzLabel="7 ng\xE0y"></nz-option>
              </nz-select>
              <button nz-button nzType="primary" (click)="generateSignedUrl()" [nzLoading]="generating" class="ml-2">
                T\u1EA1o Link
              </button>
            </div>

            <div *ngIf="signedUrl" class="url-copy-box mt-3">
              <nz-input-group [nzAddOnAfter]="copySignedButton">
                <input nz-input [ngModel]="signedUrl" readonly />
              </nz-input-group>
              <ng-template #copySignedButton>
                <button nz-button (click)="copyLink(signedUrl)" nzType="primary">
                  <span nz-icon nzType="copy"></span> Sao ch\xE9p
                </button>
              </ng-template>
            </div>
          </div>
        </div>

        <!-- Secure Mode -->
        <div *ngIf="shareMode === 'secure'" class="mode-card animate-in">
          <div class="mode-icon secure"><span nz-icon nzType="safety" nzTheme="outline"></span></div>
          <div class="mode-text">
            <h3>Truy c\u1EADp b\u1EA3o m\u1EADt</h3>
            <p>Y\xEAu c\u1EA7u ng\u01B0\u1EDDi d\xF9ng nh\u1EADp m\xE3 x\xE1c th\u1EF1c v\xE0 gi\u1EDBi h\u1EA1n th\u1EDDi gian truy c\u1EADp.</p>
            
            <form nz-form [formGroup]="secureForm" nzLayout="vertical" class="mt-3">
              <div class="row">
                <div class="col-6">
                  <nz-form-item>
                    <nz-form-label nzRequired>M\xE3 b\xED m\u1EADt</nz-form-label>
                    <nz-form-control nzErrorTip="Vui l\xF2ng nh\u1EADp m\xE3">
                      <nz-input-group nzPrefixIcon="key">
                        <input nz-input formControlName="shareCode" placeholder="vd: 123456" />
                      </nz-input-group>
                    </nz-form-control>
                  </nz-form-item>
                </div>
                <div class="col-6">
                  <nz-form-item>
                    <nz-form-label>Ng\xE0y h\u1EBFt h\u1EA1n</nz-form-label>
                    <nz-form-control>
                      <nz-date-picker formControlName="expiredAt" nzShowTime style="width: 100%"></nz-date-picker>
                    </nz-form-control>
                  </nz-form-item>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="modal-footer mt-4">
        <button nz-button nzType="default" (click)="handleCancel($event)">B\u1ECF qua</button>
        <button nz-button nzType="primary" (click)="submitForm()" [nzLoading]="submitting" class="ml-2 save-btn">
          <span nz-icon nzType="check"></span> \xC1p d\u1EE5ng thay \u0111\u1ED5i
        </button>
      </div>
    </div>
  `, styles: ['/* angular:styles/component:css;64b512170887530f4f876bfdf23aeda0eeda1cfac0f1b8e0823c067f1923a09d;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/projects/tot/business-files/src/lib/components/file-share-modal/file-share-modal.component.ts */\n.share-container {\n  padding: 4px;\n  font-family:\n    "Inter",\n    -apple-system,\n    sans-serif;\n}\n.header-info {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 8px;\n}\n.file-icon {\n  font-size: 32px;\n  background: #f0f7ff;\n  padding: 12px;\n  border-radius: 12px;\n  display: flex;\n}\n.file-name {\n  font-weight: 600;\n  font-size: 16px;\n  color: #1a1a1a;\n  max-width: 300px;\n}\n.file-meta {\n  font-size: 13px;\n  color: #8c8c8c;\n  margin-top: 2px;\n}\n.section-title {\n  font-weight: 500;\n  font-size: 14px;\n  margin-bottom: 12px;\n  color: #595959;\n}\n.full-width-group {\n  width: 100%;\n  display: flex;\n}\n.full-width-group label {\n  flex: 1;\n  text-align: center;\n}\n.mode-card {\n  display: flex;\n  gap: 16px;\n  padding: 20px;\n  background: #fdfdfd;\n  border: 1px solid #f0f0f0;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);\n  min-height: 160px;\n}\n.mode-icon {\n  font-size: 24px;\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.mode-icon.private {\n  background: #fff1f0;\n  color: #ff4d4f;\n}\n.mode-icon.public {\n  background: #f6ffed;\n  color: #52c41a;\n}\n.mode-icon.signed {\n  background: #e6f7ff;\n  color: #1890ff;\n}\n.mode-icon.secure {\n  background: #f9f0ff;\n  color: #722ed1;\n}\n.mode-text h3 {\n  margin: 0 0 4px;\n  font-size: 16px;\n  font-weight: 600;\n  color: #262626;\n}\n.mode-text p {\n  margin: 0;\n  font-size: 14px;\n  color: #8c8c8c;\n  line-height: 1.5;\n}\n.url-copy-box {\n  background: #f5f5f5;\n  padding: 4px;\n  border-radius: 8px;\n}\n.duration-selector {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.duration-selector .label {\n  font-size: 13px;\n  color: #595959;\n}\n.modal-footer {\n  display: flex;\n  justify-content: flex-end;\n  padding-top: 16px;\n  border-top: 1px solid #f0f0f0;\n}\n.save-btn {\n  min-width: 140px;\n}\n.row {\n  display: flex;\n  margin: 0 -8px;\n}\n.col-6 {\n  flex: 0 0 50%;\n  padding: 0 8px;\n}\n.mt-3 {\n  margin-top: 12px;\n}\n.mt-4 {\n  margin-top: 16px;\n}\n.ml-2 {\n  margin-left: 8px;\n}\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.animate-in {\n  animation: slide-up 0.3s ease-out;\n}\n@keyframes slide-up {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=file-share-modal.component.css.map */\n'] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FileShareModalComponent, { className: "FileShareModalComponent", filePath: "projects/tot/business-files/src/lib/components/file-share-modal/file-share-modal.component.ts", lineNumber: 225 });
})();

// projects/tot/business-files/src/lib/components/move-modal/move-modal.component.ts
function MoveModalComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275element(1, "span", 8);
    \u0275\u0275elementStart(2, "span", 9);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const node_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("nzType", node_r1.isExpanded ? "folder-open" : "folder");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(node_r1.title);
  }
}
var _MoveModalComponent = class _MoveModalComponent {
  constructor() {
    this.modalData = inject(NZ_MODAL_DATA);
    this.itemId = this.modalData.itemId;
    this.itemType = this.modalData.itemType;
    this.itemName = this.modalData.itemName;
    this.nodes = [
      {
        title: "T\xE0i li\u1EC7u c\u1EE7a t\xF4i",
        key: "root",
        expanded: true,
        icon: "folder-open",
        children: []
      }
    ];
    this.selectedFolderId = null;
    this.loading = false;
    this.filesFoldersService = inject(FilesFoldersService);
    this.modalRef = inject(NzModalRef);
    this.message = inject(NzMessageService);
  }
  ngOnInit() {
    this.loadTree();
  }
  async loadTree() {
    try {
      const folders = await this.filesFoldersService.getFolderTree();
      this.nodes[0].children = this.mapFoldersToNodes(folders);
      this.nodes = [...this.nodes];
    } catch (error) {
      this.message.error("L\u1ED7i khi t\u1EA3i danh s\xE1ch th\u01B0 m\u1EE5c");
    }
  }
  mapFoldersToNodes(folders) {
    return folders.filter((f) => this.itemType === "file" || f.id !== this.itemId).map((f) => ({
      title: f.name,
      key: f.id,
      isLeaf: !f.children || f.children.length === 0,
      children: f.children ? this.mapFoldersToNodes(f.children) : []
    }));
  }
  onNodeClick(event) {
    if (event.node) {
      this.selectedFolderId = event.node.key === "root" ? null : event.node.key;
    }
  }
  async submit() {
    this.loading = true;
    try {
      if (this.itemType === "folder") {
        await this.filesFoldersService.moveFolder(this.itemId, this.selectedFolderId);
      } else {
        await this.filesFoldersService.moveFile(this.itemId, this.selectedFolderId);
      }
      this.message.success("\u0110\xE3 g\u1EEDi y\xEAu c\u1EA7u di chuy\u1EC3n");
      this.filesFoldersService.notifyRefresh();
      this.modalRef.close(true);
    } catch (error) {
      this.message.error("L\u1ED7i khi di chuy\u1EC3n");
    } finally {
      this.loading = false;
    }
  }
  cancel() {
    this.modalRef.close();
  }
};
_MoveModalComponent.\u0275fac = function MoveModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MoveModalComponent)();
};
_MoveModalComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MoveModalComponent, selectors: [["app-move-modal"]], decls: 10, vars: 4, consts: [["nzTreeTemplate", ""], [1, "move-modal-container"], [1, "tree-wrapper"], ["nzShowIcon", "", 3, "nzClick", "nzData", "nzTreeTemplate"], [1, "modal-footer"], ["nz-button", "", "nzType", "default", 3, "click"], ["nz-button", "", "nzType", "primary", 3, "click", "nzLoading", "disabled"], [1, "custom-node"], ["nz-icon", "", "nzTheme", "fill", 2, "color", "#ffca28", 3, "nzType"], [1, "folder-name"]], template: function MoveModalComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "nz-tree", 3);
    \u0275\u0275listener("nzClick", function MoveModalComponent_Template_nz_tree_nzClick_2_listener($event) {
      return ctx.onNodeClick($event);
    });
    \u0275\u0275template(3, MoveModalComponent_ng_template_3_Template, 4, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 4)(6, "button", 5);
    \u0275\u0275listener("click", function MoveModalComponent_Template_button_click_6_listener() {
      return ctx.cancel();
    });
    \u0275\u0275text(7, "H\u1EE7y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 6);
    \u0275\u0275listener("click", function MoveModalComponent_Template_button_click_8_listener() {
      return ctx.submit();
    });
    \u0275\u0275text(9, " Chuy\u1EC3n \u0111\u1EBFn \u0111\xE2y ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const nzTreeTemplate_r2 = \u0275\u0275reference(4);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzData", ctx.nodes)("nzTreeTemplate", nzTreeTemplate_r2);
    \u0275\u0275advance(6);
    \u0275\u0275property("nzLoading", ctx.loading)("disabled", !ctx.selectedFolderId && ctx.selectedFolderId !== null);
  }
}, dependencies: [
  CommonModule,
  NzTreeModule,
  NzTreeComponent,
  NzButtonModule,
  NzButtonComponent,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzIconModule,
  NzIconDirective
], styles: ["\n.move-modal-container[_ngcontent-%COMP%] {\n  padding: 10px;\n}\n.tree-wrapper[_ngcontent-%COMP%] {\n  max-height: 400px;\n  overflow-y: auto;\n  border: 1px solid #f0f0f0;\n  padding: 8px;\n  border-radius: 4px;\n  margin-bottom: 16px;\n}\n.modal-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.custom-node[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n/*# sourceMappingURL=move-modal.component.css.map */"] });
var MoveModalComponent = _MoveModalComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MoveModalComponent, [{
    type: Component,
    args: [{
      selector: "app-move-modal",
      standalone: true,
      imports: [
        CommonModule,
        NzTreeModule,
        NzButtonModule,
        NzIconModule
      ],
      template: `
    <div class="move-modal-container">
      <div class="tree-wrapper">
        <nz-tree
          [nzData]="nodes"
          nzShowIcon
          (nzClick)="onNodeClick($event)"
          [nzTreeTemplate]="nzTreeTemplate"
        >
          <ng-template #nzTreeTemplate let-node let-origin="origin">
            <span class="custom-node">
              <span nz-icon [nzType]="node.isExpanded ? 'folder-open' : 'folder'" nzTheme="fill" style="color: #ffca28"></span>
              <span class="folder-name">{{ node.title }}</span>
            </span>
          </ng-template>
        </nz-tree>
      </div>
      <div class="modal-footer">
        <button nz-button nzType="default" (click)="cancel()">H\u1EE7y</button>
        <button nz-button nzType="primary" (click)="submit()" [nzLoading]="loading" [disabled]="!selectedFolderId && selectedFolderId !== null">
          Chuy\u1EC3n \u0111\u1EBFn \u0111\xE2y
        </button>
      </div>
    </div>

    <style>
      .move-modal-container {
        padding: 10px;
      }
      .tree-wrapper {
        max-height: 400px;
        overflow-y: auto;
        border: 1px solid #f0f0f0;
        padding: 8px;
        border-radius: 4px;
        margin-bottom: 16px;
      }
      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
      .custom-node {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    </style>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MoveModalComponent, { className: "MoveModalComponent", filePath: "projects/tot/business-files/src/lib/components/move-modal/move-modal.component.ts", lineNumber: 69 });
})();

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-collapse.mjs
var _c04 = ["*"];
var _c13 = ["collapseHeader"];
var _c22 = ["collapseIcon"];
function NzCollapsePanelComponent_Conditional_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275element(1, "nz-icon", 9);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const expandedIcon_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("nzType", expandedIcon_r1 || "right")("nzRotate", ctx_r1.active() ? 90 : 0);
  }
}
function NzCollapsePanelComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3, 1);
    \u0275\u0275template(2, NzCollapsePanelComponent_Conditional_2_ng_container_2_Template, 2, 2, "ng-container", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzExpandedIcon);
  }
}
function NzCollapsePanelComponent_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.nzHeader);
  }
}
function NzCollapsePanelComponent_Conditional_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275text(1);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.nzExtra);
  }
}
function NzCollapsePanelComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275template(1, NzCollapsePanelComponent_Conditional_5_ng_container_1_Template, 2, 1, "ng-container", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzStringTemplateOutlet", ctx_r1.nzExtra);
  }
}
var NZ_CONFIG_MODULE_NAME$1 = "collapse";
var NzCollapseComponent = (() => {
  var _a;
  let _nzAccordion_decorators;
  let _nzAccordion_initializers = [];
  let _nzAccordion_extraInitializers = [];
  let _nzBordered_decorators;
  let _nzBordered_initializers = [];
  let _nzBordered_extraInitializers = [];
  let _nzGhost_decorators;
  let _nzGhost_initializers = [];
  let _nzGhost_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "dir", inject(Directionality).valueSignal);
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME$1);
      __publicField(this, "nzAccordion", __runInitializers(this, _nzAccordion_initializers, false));
      __publicField(this, "nzBordered", (__runInitializers(this, _nzAccordion_extraInitializers), __runInitializers(this, _nzBordered_initializers, true)));
      __publicField(this, "nzGhost", (__runInitializers(this, _nzBordered_extraInitializers), __runInitializers(this, _nzGhost_initializers, false)));
      __publicField(this, "nzExpandIconPosition", (__runInitializers(this, _nzGhost_extraInitializers), "start"));
      __publicField(this, "nzSize", "middle");
      __publicField(this, "listOfNzCollapsePanelComponent", []);
      onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME$1, () => this.cdr.markForCheck());
    }
    addPanel(value) {
      this.listOfNzCollapsePanelComponent.push(value);
    }
    removePanel(value) {
      this.listOfNzCollapsePanelComponent.splice(this.listOfNzCollapsePanelComponent.indexOf(value), 1);
    }
    click(collapse) {
      const active = collapse.active();
      if (this.nzAccordion && !active) {
        this.listOfNzCollapsePanelComponent.filter((item) => item !== collapse && item.active()).forEach((item) => item.activate(false));
      }
      collapse.activate(!active);
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzAccordion_decorators = [WithConfig()];
    _nzBordered_decorators = [WithConfig()];
    _nzGhost_decorators = [WithConfig()];
    __esDecorate(null, null, _nzAccordion_decorators, {
      kind: "field",
      name: "nzAccordion",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzAccordion" in obj,
        get: (obj) => obj.nzAccordion,
        set: (obj, value) => {
          obj.nzAccordion = value;
        }
      },
      metadata: _metadata
    }, _nzAccordion_initializers, _nzAccordion_extraInitializers);
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
    __esDecorate(null, null, _nzGhost_decorators, {
      kind: "field",
      name: "nzGhost",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzGhost" in obj,
        get: (obj) => obj.nzGhost,
        set: (obj, value) => {
          obj.nzGhost = value;
        }
      },
      metadata: _metadata
    }, _nzGhost_initializers, _nzGhost_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzCollapseComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-collapse"]],
    hostAttrs: [1, "ant-collapse"],
    hostVars: 14,
    hostBindings: function NzCollapseComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-collapse-icon-placement-start", ctx.nzExpandIconPosition === "start")("ant-collapse-icon-placement-end", ctx.nzExpandIconPosition === "end")("ant-collapse-ghost", ctx.nzGhost)("ant-collapse-borderless", !ctx.nzBordered)("ant-collapse-rtl", ctx.dir() === "rtl")("ant-collapse-small", ctx.nzSize === "small")("ant-collapse-large", ctx.nzSize === "large");
      }
    },
    inputs: {
      nzAccordion: [2, "nzAccordion", "nzAccordion", booleanAttribute],
      nzBordered: [2, "nzBordered", "nzBordered", booleanAttribute],
      nzGhost: [2, "nzGhost", "nzGhost", booleanAttribute],
      nzExpandIconPosition: "nzExpandIconPosition",
      nzSize: "nzSize"
    },
    exportAs: ["nzCollapse"],
    ngContentSelectors: _c04,
    decls: 1,
    vars: 0,
    template: function NzCollapseComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCollapseComponent, [{
    type: Component,
    args: [{
      selector: "nz-collapse",
      exportAs: "nzCollapse",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `<ng-content />`,
      host: {
        class: "ant-collapse",
        "[class.ant-collapse-icon-placement-start]": `nzExpandIconPosition === 'start'`,
        "[class.ant-collapse-icon-placement-end]": `nzExpandIconPosition === 'end'`,
        "[class.ant-collapse-ghost]": `nzGhost`,
        "[class.ant-collapse-borderless]": "!nzBordered",
        "[class.ant-collapse-rtl]": `dir() === 'rtl'`,
        "[class.ant-collapse-small]": `nzSize === 'small'`,
        "[class.ant-collapse-large]": `nzSize === 'large'`
      }
    }]
  }], () => [], {
    nzAccordion: [{
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
    nzGhost: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzExpandIconPosition: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }]
  });
})();
var NZ_CONFIG_MODULE_NAME3 = "collapsePanel";
var NzCollapsePanelComponent = (() => {
  var _a;
  let _nzShowArrow_decorators;
  let _nzShowArrow_initializers = [];
  let _nzShowArrow_extraInitializers = [];
  return _a = class {
    constructor() {
      __publicField(this, "ngZone", inject(NgZone));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "nzCollapseComponent", inject(NzCollapseComponent, {
        host: true
      }));
      __publicField(this, "_nzModuleName", NZ_CONFIG_MODULE_NAME3);
      __publicField(this, "nzActive", input(false, __spreadProps(__spreadValues({}, ngDevMode ? {
        debugName: "nzActive"
      } : {}), {
        transform: booleanAttribute
      })));
      /**
       * @deprecated Will be removed in v22, please use `nzCollapsible` with the value `'disabled'` instead.
       */
      __publicField(this, "nzDisabled", false);
      __publicField(this, "nzShowArrow", __runInitializers(this, _nzShowArrow_initializers, true));
      __publicField(this, "nzExtra", __runInitializers(this, _nzShowArrow_extraInitializers));
      __publicField(this, "nzHeader");
      __publicField(this, "nzExpandedIcon");
      __publicField(this, "nzCollapsible");
      __publicField(this, "nzActiveChange", output());
      /**
       * @description Actual active state of the panel.
       */
      __publicField(this, "active", linkedSignal(() => this.nzActive(), ...ngDevMode ? [{
        debugName: "active"
      }] : []));
      __publicField(this, "collapseHeader", viewChild.required("collapseHeader", {
        read: ElementRef
      }));
      __publicField(this, "collapseIcon", viewChild("collapseIcon", __spreadProps(__spreadValues({}, ngDevMode ? {
        debugName: "collapseIcon"
      } : {}), {
        read: ElementRef
      })));
      onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME3, () => this.cdr.markForCheck());
      this.nzCollapseComponent.addPanel(this);
      this.destroyRef.onDestroy(() => {
        this.nzCollapseComponent.removePanel(this);
      });
    }
    ngAfterViewInit() {
      const icon = this.collapseIcon();
      const header = this.collapseHeader();
      const element = this.nzShowArrow && this.nzCollapsible === "icon" && icon ? icon.nativeElement : header.nativeElement;
      fromEventOutsideAngular(element, "click").pipe(filter(() => !this.nzDisabled && this.nzCollapsible !== "disabled"), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.ngZone.run(() => {
          this.nzCollapseComponent.click(this);
        });
      });
    }
    activate(active) {
      this.active.set(active);
      this.nzActiveChange.emit(active);
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _nzShowArrow_decorators = [WithConfig()];
    __esDecorate(null, null, _nzShowArrow_decorators, {
      kind: "field",
      name: "nzShowArrow",
      static: false,
      private: false,
      access: {
        has: (obj) => "nzShowArrow" in obj,
        get: (obj) => obj.nzShowArrow,
        set: (obj, value) => {
          obj.nzShowArrow = value;
        }
      },
      metadata: _metadata
    }, _nzShowArrow_initializers, _nzShowArrow_extraInitializers);
    if (_metadata) Object.defineProperty(_a, Symbol.metadata, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: _metadata
    });
  })(), __publicField(_a, "\u0275fac", function NzCollapsePanelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _a)();
  }), __publicField(_a, "\u0275cmp", /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _a,
    selectors: [["nz-collapse-panel"]],
    viewQuery: function NzCollapsePanelComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuerySignal(ctx.collapseHeader, _c13, 5, ElementRef)(ctx.collapseIcon, _c22, 5, ElementRef);
      }
      if (rf & 2) {
        \u0275\u0275queryAdvance(2);
      }
    },
    hostAttrs: [1, "ant-collapse-item"],
    hostVars: 6,
    hostBindings: function NzCollapsePanelComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("ant-collapse-no-arrow", !ctx.nzShowArrow)("ant-collapse-item-active", ctx.active())("ant-collapse-item-disabled", ctx.nzDisabled || ctx.nzCollapsible === "disabled");
      }
    },
    inputs: {
      nzActive: [1, "nzActive"],
      nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
      nzShowArrow: [2, "nzShowArrow", "nzShowArrow", booleanAttribute],
      nzExtra: "nzExtra",
      nzHeader: "nzHeader",
      nzExpandedIcon: "nzExpandedIcon",
      nzCollapsible: "nzCollapsible"
    },
    outputs: {
      nzActiveChange: "nzActiveChange"
    },
    exportAs: ["nzCollapsePanel"],
    ngContentSelectors: _c04,
    decls: 9,
    vars: 13,
    consts: [["collapseHeader", ""], ["collapseIcon", ""], ["role", "button", 1, "ant-collapse-header"], ["role", "button", 1, "ant-collapse-expand-icon"], [1, "ant-collapse-title"], [4, "nzStringTemplateOutlet"], [1, "ant-collapse-extra"], ["animation-collapse", "", "leavedClassName", "ant-collapse-panel-hidden", 1, "ant-collapse-panel", 3, "open"], [1, "ant-collapse-body"], [1, "ant-collapse-arrow", 3, "nzType", "nzRotate"]],
    template: function NzCollapsePanelComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275elementStart(0, "div", 2, 0);
        \u0275\u0275conditionalCreate(2, NzCollapsePanelComponent_Conditional_2_Template, 3, 1, "div", 3);
        \u0275\u0275elementStart(3, "span", 4);
        \u0275\u0275template(4, NzCollapsePanelComponent_ng_container_4_Template, 2, 1, "ng-container", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275conditionalCreate(5, NzCollapsePanelComponent_Conditional_5_Template, 2, 1, "div", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 7)(7, "div", 8);
        \u0275\u0275projection(8);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("ant-collapse-collapsible-icon", ctx.nzCollapsible === "icon")("ant-collapse-collapsible-header", ctx.nzCollapsible === "header");
        \u0275\u0275attribute("aria-expanded", ctx.active())("aria-disabled", ctx.nzDisabled || ctx.nzCollapsible === "disabled")("tabindex", ctx.nzDisabled || ctx.nzCollapsible === "disabled" ? -1 : 0);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.nzShowArrow ? 2 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("nzStringTemplateOutlet", ctx.nzHeader);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.nzExtra ? 5 : -1);
        \u0275\u0275advance();
        \u0275\u0275classProp("ant-collapse-panel-active", ctx.active());
        \u0275\u0275property("open", ctx.active());
      }
    },
    dependencies: [NzOutletModule, NzStringTemplateOutletDirective, NzIconModule, NzIconDirective, NzAnimationCollapseDirective],
    encapsulation: 2,
    changeDetection: 0
  })), _a;
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCollapsePanelComponent, [{
    type: Component,
    args: [{
      selector: "nz-collapse-panel",
      exportAs: "nzCollapsePanel",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `
    <div
      #collapseHeader
      role="button"
      [attr.aria-expanded]="active()"
      [attr.aria-disabled]="nzDisabled || nzCollapsible === 'disabled'"
      [attr.tabindex]="nzDisabled || nzCollapsible === 'disabled' ? -1 : 0"
      class="ant-collapse-header"
      [class.ant-collapse-collapsible-icon]="nzCollapsible === 'icon'"
      [class.ant-collapse-collapsible-header]="nzCollapsible === 'header'"
    >
      @if (nzShowArrow) {
        <div role="button" #collapseIcon class="ant-collapse-expand-icon">
          <ng-container *nzStringTemplateOutlet="nzExpandedIcon; let expandedIcon">
            <nz-icon [nzType]="expandedIcon || 'right'" class="ant-collapse-arrow" [nzRotate]="active() ? 90 : 0" />
          </ng-container>
        </div>
      }
      <span class="ant-collapse-title">
        <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
      </span>
      @if (nzExtra) {
        <div class="ant-collapse-extra">
          <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
        </div>
      }
    </div>
    <div
      class="ant-collapse-panel"
      [class.ant-collapse-panel-active]="active()"
      animation-collapse
      [open]="active()"
      leavedClassName="ant-collapse-panel-hidden"
    >
      <div class="ant-collapse-body">
        <ng-content />
      </div>
    </div>
  `,
      host: {
        class: "ant-collapse-item",
        "[class.ant-collapse-no-arrow]": "!nzShowArrow",
        "[class.ant-collapse-item-active]": "active()",
        "[class.ant-collapse-item-disabled]": `nzDisabled || nzCollapsible === 'disabled'`
      },
      imports: [NzOutletModule, NzIconModule, NzAnimationCollapseDirective]
    }]
  }], () => [], {
    nzActive: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "nzActive",
        required: false
      }]
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzShowArrow: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzExtra: [{
      type: Input
    }],
    nzHeader: [{
      type: Input
    }],
    nzExpandedIcon: [{
      type: Input
    }],
    nzCollapsible: [{
      type: Input
    }],
    nzActiveChange: [{
      type: Output,
      args: ["nzActiveChange"]
    }],
    collapseHeader: [{
      type: ViewChild,
      args: ["collapseHeader", __spreadProps(__spreadValues({}, {
        read: ElementRef
      }), {
        isSignal: true
      })]
    }],
    collapseIcon: [{
      type: ViewChild,
      args: ["collapseIcon", __spreadProps(__spreadValues({}, {
        read: ElementRef
      }), {
        isSignal: true
      })]
    }]
  });
})();
var _NzCollapseModule = class _NzCollapseModule {
};
__publicField(_NzCollapseModule, "\u0275fac", function NzCollapseModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzCollapseModule)();
});
__publicField(_NzCollapseModule, "\u0275mod", /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _NzCollapseModule,
  imports: [NzCollapsePanelComponent, NzCollapseComponent],
  exports: [NzCollapsePanelComponent, NzCollapseComponent]
}));
__publicField(_NzCollapseModule, "\u0275inj", /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [NzCollapsePanelComponent]
}));
var NzCollapseModule = _NzCollapseModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzCollapseModule, [{
    type: NgModule,
    args: [{
      imports: [NzCollapsePanelComponent, NzCollapseComponent],
      exports: [NzCollapsePanelComponent, NzCollapseComponent]
    }]
  }], null, null);
})();

// projects/tot/business-files/src/lib/components/file-explorer/file-explorer.ts
function FileExplorerComponent_ng_template_4_span_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275listener("click", function FileExplorerComponent_ng_template_4_span_1_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.clearSearch());
    });
    \u0275\u0275elementEnd();
  }
}
function FileExplorerComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275template(1, FileExplorerComponent_ng_template_4_span_1_Template, 1, 0, "span", 25);
    \u0275\u0275elementStart(2, "span", 26);
    \u0275\u0275listener("click", function FileExplorerComponent_ng_template_4_Template_span_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onSearch());
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.searchQuery || ctx_r3.searchResults.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("nzType", ctx_r3.searching ? "loading" : "search");
  }
}
function FileExplorerComponent_nz_collapse_6_tr_13_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function FileExplorerComponent_nz_collapse_6_tr_13_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const data_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.onSelectFile(data_r8));
    });
    \u0275\u0275text(1, " Ch\xE8n ");
    \u0275\u0275elementEnd();
  }
}
function FileExplorerComponent_nz_collapse_6_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275element(2, "span", 32);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td")(5, "nz-tag");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275template(8, FileExplorerComponent_nz_collapse_6_tr_13_button_8_Template, 2, 0, "button", 33);
    \u0275\u0275elementStart(9, "button", 34);
    \u0275\u0275listener("click", function FileExplorerComponent_nz_collapse_6_tr_13_Template_button_click_9_listener() {
      const data_r8 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.goToFolder(data_r8.folderId));
    });
    \u0275\u0275element(10, "span", 35);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const data_r8 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", data_r8.name, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(data_r8.folderPath);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.selectionMode);
  }
}
function FileExplorerComponent_nz_collapse_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-collapse", 28)(1, "nz-collapse-panel", 29)(2, "nz-table", 30, 3);
    \u0275\u0275listener("nzPageIndexChange", function FileExplorerComponent_nz_collapse_6_Template_nz_table_nzPageIndexChange_2_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.searchPageIndex = $event);
    });
    \u0275\u0275elementStart(4, "thead")(5, "tr")(6, "th");
    \u0275\u0275text(7, "T\xEAn file");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "\u0110\u01B0\u1EDDng d\u1EABn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 31);
    \u0275\u0275text(11, "Thao t\xE1c");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "tbody");
    \u0275\u0275template(13, FileExplorerComponent_nz_collapse_6_tr_13_Template, 11, 3, "tr", 13);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const searchTable_r9 = \u0275\u0275reference(3);
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("nzBordered", false);
    \u0275\u0275advance();
    \u0275\u0275property("nzHeader", "K\u1EBFt qu\u1EA3 t\xECm ki\u1EBFm (" + ctx_r3.searchResults.length + ")")("nzActive", ctx_r3.searchExpanded);
    \u0275\u0275advance();
    \u0275\u0275property("nzData", ctx_r3.searchResults)("nzPageIndex", ctx_r3.searchPageIndex)("nzPageSize", ctx_r3.searchPageSize);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngForOf", searchTable_r9.data);
  }
}
function FileExplorerComponent_nz_breadcrumb_item_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-breadcrumb-item")(1, "a", 11);
    \u0275\u0275listener("click", function FileExplorerComponent_nz_breadcrumb_item_14_Template_a_click_1_listener() {
      const item_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.navigateToFolder(item_r11.id));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r11 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r11.name);
  }
}
function FileExplorerComponent_tr_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275element(2, "span", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "a", 11);
    \u0275\u0275listener("click", function FileExplorerComponent_tr_41_Template_a_click_4_listener() {
      const folder_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      ctx_r3.selectedFolderId = folder_r14.id;
      return \u0275\u0275resetView(ctx_r3.loadContent());
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7, "--");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9, "Th\u01B0 m\u1EE5c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11, "--");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td")(13, "div", 38)(14, "button", 39);
    \u0275\u0275listener("click", function FileExplorerComponent_tr_41_Template_button_click_14_listener() {
      const folder_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openMoveModal(folder_r14, "folder"));
    });
    \u0275\u0275element(15, "span", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 41);
    \u0275\u0275listener("click", function FileExplorerComponent_tr_41_Template_button_click_16_listener() {
      const folder_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.deleteFolder(folder_r14.id));
    });
    \u0275\u0275element(17, "span", 42);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const folder_r14 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(folder_r14.name);
  }
}
function FileExplorerComponent_tr_42_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function FileExplorerComponent_tr_42_button_15_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const file_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onSelectFile(file_r17));
    });
    \u0275\u0275text(1, " Ch\xE8n ");
    \u0275\u0275elementEnd();
  }
}
function FileExplorerComponent_tr_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275element(2, "span", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "a", 44);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td")(14, "div", 38);
    \u0275\u0275template(15, FileExplorerComponent_tr_42_button_15_Template, 2, 0, "button", 45);
    \u0275\u0275elementStart(16, "a", 46);
    \u0275\u0275element(17, "span", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 48);
    \u0275\u0275listener("click", function FileExplorerComponent_tr_42_Template_button_click_18_listener() {
      const file_r17 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openShareModal(file_r17));
    });
    \u0275\u0275element(19, "span", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 39);
    \u0275\u0275listener("click", function FileExplorerComponent_tr_42_Template_button_click_20_listener() {
      const file_r17 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.openMoveModal(file_r17, "file"));
    });
    \u0275\u0275element(21, "span", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 41);
    \u0275\u0275listener("click", function FileExplorerComponent_tr_42_Template_button_click_22_listener() {
      const file_r17 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.deleteFile(file_r17.id));
    });
    \u0275\u0275element(23, "span", 42);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const file_r17 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("href", file_r17.url, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(file_r17.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatSize(file_r17.size));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(file_r17.mimeType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(12, 7, file_r17.createdAt, "dd/MM/yyyy HH:mm"));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r3.selectionMode);
    \u0275\u0275advance();
    \u0275\u0275property("href", file_r17.url, \u0275\u0275sanitizeUrl);
  }
}
var _FileExplorerComponent = class _FileExplorerComponent {
  constructor() {
    this.selectedFolderId = null;
    this.selectionMode = false;
    this.folderCreated = new EventEmitter();
    this.fileSelected = new EventEmitter();
    this.filesFoldersService = inject(FilesFoldersService);
    this.message = inject(NzMessageService);
    this.modal = inject(NzModalService);
    this.messageBus = inject(MessageBusService);
    this.folders = [];
    this.files = [];
    this.loading = false;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.total = 0;
    this.breadcrumbs = [];
    this.createPopoverVisible = false;
    this.newFolderName = "";
    this.creatingFolder = false;
    this.searchQuery = "";
    this.searchResults = [];
    this.searching = false;
    this.searchExpanded = false;
    this.searchPageIndex = 1;
    this.searchPageSize = 5;
  }
  get currentFolderName() {
    if (this.breadcrumbs && this.breadcrumbs.length > 0) {
      return this.breadcrumbs[this.breadcrumbs.length - 1].name;
    }
    return "T\xE0i li\u1EC7u c\u1EE7a t\xF4i";
  }
  ngOnInit() {
    this.refreshSub = this.filesFoldersService.refresh$.subscribe(() => {
      this.loadContent();
    });
  }
  ngOnDestroy() {
    var _a;
    (_a = this.refreshSub) == null ? void 0 : _a.unsubscribe();
  }
  ngOnChanges(changes) {
    if (changes["selectedFolderId"]) {
      this.pageIndex = 1;
      this.loadContent();
    }
  }
  async loadContent() {
    this.loading = true;
    try {
      const response = await this.filesFoldersService.getFolderContent(this.selectedFolderId, this.pageIndex, this.pageSize);
      this.folders = response.folders || [];
      this.files = response.files || [];
      this.total = response.totalFiles || 0;
      this.breadcrumbs = response.breadcrumbs || [];
    } catch (error) {
      this.message.error("L\u1ED7i khi t\u1EA3i n\u1ED9i dung th\u01B0 m\u1EE5c");
    } finally {
      this.loading = false;
    }
  }
  onPageIndexChange(index) {
    this.pageIndex = index;
    this.loadContent();
  }
  onPageSizeChange(size) {
    this.pageSize = size;
    this.loadContent();
  }
  navigateToFolder(folderId) {
    this.selectedFolderId = folderId;
    this.loadContent();
  }
  async onUpload(event) {
    const file = event.target.files[0];
    if (!file)
      return;
    try {
      await this.filesFoldersService.uploadFile(this.selectedFolderId, file);
      this.message.success("\u0110\xE3 g\u1EEDi y\xEAu c\u1EA7u upload file");
      this.filesFoldersService.notifyRefresh();
    } catch (error) {
      this.message.error("L\u1ED7i khi upload file");
    }
  }
  openShareModal(file) {
    const modal = this.modal.create({
      nzTitle: `Chia s\u1EBB file: ${file.name}`,
      nzContent: FileShareModalComponent,
      nzData: { file },
      nzFooter: null
    });
    modal.afterClose.subscribe((result) => {
      if (result) {
        this.loadContent();
      }
    });
  }
  async deleteFile(fileId) {
    this.modal.confirm({
      nzTitle: "X\xE1c nh\u1EADn x\xF3a",
      nzContent: "B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a file n\xE0y?",
      nzOnOk: async () => {
        try {
          await this.filesFoldersService.deleteFile(fileId);
          this.message.success("\u0110\xE3 g\u1EEDi y\xEAu c\u1EA7u x\xF3a file");
          this.filesFoldersService.notifyRefresh();
        } catch (error) {
          this.message.error("L\u1ED7i khi x\xF3a file");
        }
      }
    });
  }
  openMoveModal(item, type) {
    const modal = this.modal.create({
      nzTitle: `Chuy\u1EC3n ${type === "file" ? "file" : "th\u01B0 m\u1EE5c"}: ${item.name}`,
      nzContent: MoveModalComponent,
      nzData: {
        itemId: item.id,
        itemType: type,
        itemName: item.name
      },
      nzFooter: null
    });
    modal.afterClose.subscribe((result) => {
      if (result) {
      }
    });
  }
  async deleteFolder(folderId) {
    this.modal.confirm({
      nzTitle: "X\xE1c nh\u1EADn x\xF3a",
      nzContent: "B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a th\u01B0 m\u1EE5c n\xE0y v\xE0 to\xE0n b\u1ED9 n\u1ED9i dung b\xEAn trong?",
      nzOnOk: async () => {
        try {
          await this.filesFoldersService.deleteFolder(folderId);
          this.message.success("\u0110\xE3 g\u1EEDi y\xEAu c\u1EA7u x\xF3a th\u01B0 m\u1EE5c");
          this.filesFoldersService.notifyRefresh();
        } catch (error) {
          this.message.error("L\u1ED7i khi x\xF3a th\u01B0 m\u1EE5c");
        }
      }
    });
  }
  async onSearch() {
    if (!this.searchQuery || !this.searchQuery.trim()) {
      this.searchResults = [];
      this.searchExpanded = false;
      return;
    }
    this.searching = true;
    try {
      const results = await this.filesFoldersService.searchFiles(this.searchQuery);
      this.searchResults = results || [];
      this.searchExpanded = this.searchResults.length > 0;
      this.searchPageIndex = 1;
      if (this.searchResults.length === 0) {
        this.message.info("Kh\xF4ng t\xECm th\u1EA5y file n\xE0o");
      }
    } catch (error) {
      this.message.error("L\u1ED7i khi t\xECm ki\u1EBFm file");
    } finally {
      this.searching = false;
    }
  }
  goToFolder(folderId) {
    this.filesFoldersService.notifySelectFolder(folderId);
  }
  clearSearch() {
    this.searchQuery = "";
    this.searchResults = [];
    this.searchExpanded = false;
  }
  onSelectFile(file) {
    this.fileSelected.emit(file);
    this.messageBus.publish(EVENT_TOPICS.FILE_SELECTED, file);
  }
  formatSize(bytes) {
    if (bytes === 0)
      return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
};
_FileExplorerComponent.\u0275fac = function FileExplorerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FileExplorerComponent)();
};
_FileExplorerComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FileExplorerComponent, selectors: [["app-file-explorer"]], inputs: { selectedFolderId: "selectedFolderId", selectionMode: "selectionMode" }, outputs: { folderCreated: "folderCreated", fileSelected: "fileSelected" }, features: [\u0275\u0275NgOnChangesFeature], decls: 43, vars: 14, consts: [["suffixTemplate", ""], ["fileInput", ""], ["basicTable", ""], ["searchTable", ""], [1, "explorer-container"], [1, "search-section"], [3, "nzSuffix"], ["type", "text", "nz-input", "", "placeholder", "T\xECm ki\u1EBFm t\xEAn file...", 3, "ngModelChange", "keyup.enter", "ngModel"], ["class", "search-results-collapse", 3, "nzBordered", 4, "ngIf"], [1, "explorer-toolbar"], [1, "toolbar-left"], [3, "click"], ["nz-icon", "", "nzType", "home"], [4, "ngFor", "ngForOf"], [1, "toolbar-right"], ["buttonText", "Th\xEAm m\u1EDBi", "buttonIcon", "folder-add", 2, "margin-right", "8px", 3, "parentId", "currentFolderName"], ["nz-button", "", "nzType", "default", 2, "margin-right", "8px", 3, "click"], ["nz-icon", "", "nzType", "upload"], ["type", "file", 2, "display", "none", 3, "change"], ["nz-button", "", "nzType", "default", 3, "click"], ["nz-icon", "", "nzType", "reload"], ["nzSize", "middle", 3, "nzPageIndexChange", "nzPageSizeChange", "nzData", "nzLoading", "nzFrontPagination", "nzTotal", "nzPageIndex", "nzPageSize"], ["nzWidth", "40px"], ["nzWidth", "150px"], [1, "search-actions"], ["nz-icon", "", "nzType", "close-circle", "class", "clear-btn", "nz-tooltip", "", "nzTooltipTitle", "X\xF3a t\xECm ki\u1EBFm", 3, "click", 4, "ngIf"], ["nz-icon", "", 1, "search-btn", 3, "click", "nzType"], ["nz-icon", "", "nzType", "close-circle", "nz-tooltip", "", "nzTooltipTitle", "X\xF3a t\xECm ki\u1EBFm", 1, "clear-btn", 3, "click"], [1, "search-results-collapse", 3, "nzBordered"], [3, "nzHeader", "nzActive"], ["nzSize", "small", 3, "nzPageIndexChange", "nzData", "nzPageIndex", "nzPageSize"], ["nzWidth", "100px"], ["nz-icon", "", "nzType", "file", 2, "margin-right", "8px"], ["nz-button", "", "nzType", "primary", "nzSize", "small", "style", "margin-right: 8px", 3, "click", 4, "ngIf"], ["nz-button", "", "nzType", "link", "nzSize", "small", "nz-tooltip", "", "nzTooltipTitle", "\u0110i \u0111\u1EBFn th\u01B0 m\u1EE5c", 3, "click"], ["nz-icon", "", "nzType", "arrow-right"], ["nz-button", "", "nzType", "primary", "nzSize", "small", 2, "margin-right", "8px", 3, "click"], ["nz-icon", "", "nzType", "folder", "nzTheme", "fill", 2, "color", "#ffca28"], [1, "action-buttons"], ["nz-button", "", "nzType", "text", "nz-tooltip", "", "nzTooltipTitle", "Di chuy\u1EC3n", 3, "click"], ["nz-icon", "", "nzType", "drag"], ["nz-button", "", "nzType", "text", "nzDanger", "", "nz-tooltip", "", "nzTooltipTitle", "X\xF3a", 3, "click"], ["nz-icon", "", "nzType", "delete"], ["nz-icon", "", "nzType", "file", "nzTheme", "outline", 2, "color", "#1890ff"], ["target", "_blank", 3, "href"], ["nz-button", "", "nzType", "primary", "nzSize", "small", 3, "click", 4, "ngIf"], ["nz-button", "", "nzType", "text", "target", "_blank", "nz-tooltip", "", "nzTooltipTitle", "T\u1EA3i v\u1EC1", 3, "href"], ["nz-icon", "", "nzType", "download"], ["nz-button", "", "nzType", "text", "nz-tooltip", "", "nzTooltipTitle", "Chia s\u1EBB", 3, "click"], ["nz-icon", "", "nzType", "share-alt"], ["nz-button", "", "nzType", "primary", "nzSize", "small", 3, "click"]], template: function FileExplorerComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "nz-input-group", 6)(3, "input", 7);
    \u0275\u0275twoWayListener("ngModelChange", function FileExplorerComponent_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function FileExplorerComponent_Template_input_keyup_enter_3_listener() {
      return ctx.onSearch();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, FileExplorerComponent_ng_template_4_Template, 3, 2, "ng-template", null, 0, \u0275\u0275templateRefExtractor)(6, FileExplorerComponent_nz_collapse_6_Template, 14, 7, "nz-collapse", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 9)(8, "div", 10)(9, "nz-breadcrumb")(10, "nz-breadcrumb-item")(11, "a", 11);
    \u0275\u0275listener("click", function FileExplorerComponent_Template_a_click_11_listener() {
      return ctx.navigateToFolder(null);
    });
    \u0275\u0275element(12, "span", 12);
    \u0275\u0275text(13, " T\xE0i li\u1EC7u c\u1EE7a t\xF4i ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, FileExplorerComponent_nz_breadcrumb_item_14_Template, 3, 1, "nz-breadcrumb-item", 13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 14);
    \u0275\u0275element(16, "app-create-folder-popover", 15);
    \u0275\u0275elementStart(17, "button", 16);
    \u0275\u0275listener("click", function FileExplorerComponent_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      const fileInput_r12 = \u0275\u0275reference(21);
      return \u0275\u0275resetView(fileInput_r12.click());
    });
    \u0275\u0275element(18, "span", 17);
    \u0275\u0275text(19, " T\u1EA3i l\xEAn ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 18, 1);
    \u0275\u0275listener("change", function FileExplorerComponent_Template_input_change_20_listener($event) {
      return ctx.onUpload($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 19);
    \u0275\u0275listener("click", function FileExplorerComponent_Template_button_click_22_listener() {
      return ctx.loadContent();
    });
    \u0275\u0275element(23, "span", 20);
    \u0275\u0275text(24, " L\xE0m m\u1EDBi ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "nz-table", 21, 2);
    \u0275\u0275listener("nzPageIndexChange", function FileExplorerComponent_Template_nz_table_nzPageIndexChange_25_listener($event) {
      return ctx.onPageIndexChange($event);
    })("nzPageSizeChange", function FileExplorerComponent_Template_nz_table_nzPageSizeChange_25_listener($event) {
      return ctx.onPageSizeChange($event);
    });
    \u0275\u0275elementStart(27, "thead")(28, "tr");
    \u0275\u0275element(29, "th", 22);
    \u0275\u0275elementStart(30, "th");
    \u0275\u0275text(31, "T\xEAn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "th");
    \u0275\u0275text(33, "K\xEDch th\u01B0\u1EDBc");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "th");
    \u0275\u0275text(35, "Lo\u1EA1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "th");
    \u0275\u0275text(37, "Ng\xE0y t\u1EA1o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "th", 23);
    \u0275\u0275text(39, "H\xE0nh \u0111\u1ED9ng");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(40, "tbody");
    \u0275\u0275template(41, FileExplorerComponent_tr_41_Template, 18, 1, "tr", 13)(42, FileExplorerComponent_tr_42_Template, 24, 10, "tr", 13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const suffixTemplate_r18 = \u0275\u0275reference(5);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSuffix", suffixTemplate_r18);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx.searchResults.length > 0 || ctx.searching);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngForOf", ctx.breadcrumbs);
    \u0275\u0275advance(2);
    \u0275\u0275property("parentId", ctx.selectedFolderId)("currentFolderName", ctx.currentFolderName);
    \u0275\u0275advance(9);
    \u0275\u0275property("nzData", ctx.files)("nzLoading", ctx.loading)("nzFrontPagination", false)("nzTotal", ctx.total)("nzPageIndex", ctx.pageIndex)("nzPageSize", ctx.pageSize);
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx.folders);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx.files);
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  NzTableModule,
  NzTableComponent,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTheadComponent,
  NzTbodyComponent,
  NzTrDirective,
  NzButtonModule,
  NzButtonComponent,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzIconModule,
  NzIconDirective,
  NzDropDownModule,
  NzTooltipModule,
  NzTooltipDirective,
  NzTagModule,
  NzTagComponent,
  NzModalModule,
  NzBreadCrumbModule,
  NzBreadCrumbComponent,
  NzBreadCrumbItemComponent,
  FormsModule,
  DefaultValueAccessor,
  NgControlStatus,
  NgModel,
  NzInputModule,
  NzInputDirective,
  NzInputGroupComponent,
  NzInputGroupWhitSuffixOrPrefixDirective,
  NzPopoverModule,
  CreateFolderPopoverComponent,
  NzCollapseModule,
  NzCollapsePanelComponent,
  NzCollapseComponent,
  DatePipe
], styles: ["\n.explorer-container[_ngcontent-%COMP%] {\n  background: #fff;\n  padding: 16px;\n  border-radius: 8px;\n  min-height: 100%;\n}\n.search-section[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.search-results-collapse[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  background: #fafafa;\n  border-radius: 8px;\n}\n.search-btn[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: #1890ff;\n  font-size: 16px;\n}\n.search-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.clear-btn[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: #bfbfbf;\n  font-size: 14px;\n  transition: color 0.3s;\n}\n.clear-btn[_ngcontent-%COMP%]:hover {\n  color: #ff4d4f;\n}\n.search-btn.spinning[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.explorer-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid #f0f0f0;\n}\n.toolbar-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.toolbar-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n[nz-icon][_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.text-truncate[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n[_ngcontent-%COMP%]::v-deep   .nz-collapse-header[_ngcontent-%COMP%] {\n  background: #f0f7ff !important;\n  font-weight: 500;\n}\n/*# sourceMappingURL=file-explorer.css.map */"] });
var FileExplorerComponent = _FileExplorerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FileExplorerComponent, [{
    type: Component,
    args: [{ selector: "app-file-explorer", standalone: true, imports: [
      CommonModule,
      NzTableModule,
      NzButtonModule,
      NzIconModule,
      NzDropDownModule,
      NzTooltipModule,
      NzTagModule,
      NzModalModule,
      NzBreadCrumbModule,
      FormsModule,
      NzInputModule,
      NzPopoverModule,
      CreateFolderPopoverComponent,
      NzCollapseModule
    ], template: `<div class="explorer-container">
  <div class="search-section">
    <nz-input-group [nzSuffix]="suffixTemplate">
      <input type="text" nz-input placeholder="T\xECm ki\u1EBFm t\xEAn file..." [(ngModel)]="searchQuery" (keyup.enter)="onSearch()" />
    </nz-input-group>
    <ng-template #suffixTemplate>
      <div class="search-actions">
        <span nz-icon nzType="close-circle" class="clear-btn" *ngIf="searchQuery || searchResults.length > 0" (click)="clearSearch()" nz-tooltip nzTooltipTitle="X\xF3a t\xECm ki\u1EBFm"></span>
        <span nz-icon [nzType]="searching ? 'loading' : 'search'" class="search-btn" (click)="onSearch()"></span>
      </div>
    </ng-template>

    <nz-collapse [nzBordered]="false" class="search-results-collapse" *ngIf="searchResults.length > 0 || searching">
      <nz-collapse-panel [nzHeader]="'K\u1EBFt qu\u1EA3 t\xECm ki\u1EBFm (' + searchResults.length + ')'" [nzActive]="searchExpanded">
        <nz-table 
          #searchTable 
          [nzData]="searchResults" 
          nzSize="small" 
          [nzPageIndex]="searchPageIndex"
          [nzPageSize]="searchPageSize"
          (nzPageIndexChange)="searchPageIndex = $event"
        >
          <thead>
            <tr>
              <th>T\xEAn file</th>
              <th>\u0110\u01B0\u1EDDng d\u1EABn</th>
              <th nzWidth="100px">Thao t\xE1c</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let data of searchTable.data">
              <td>
                <span nz-icon nzType="file" style="margin-right: 8px;"></span>
                {{ data.name }}
              </td>
              <td><nz-tag>{{ data.folderPath }}</nz-tag></td>
              <td>
                <button *ngIf="selectionMode" nz-button nzType="primary" nzSize="small" (click)="onSelectFile(data)" style="margin-right: 8px">
                  Ch\xE8n
                </button>
                <button nz-button nzType="link" nzSize="small" (click)="goToFolder(data.folderId)" nz-tooltip nzTooltipTitle="\u0110i \u0111\u1EBFn th\u01B0 m\u1EE5c">
                  <span nz-icon nzType="arrow-right"></span>
                </button>
              </td>
            </tr>
          </tbody>
        </nz-table>
      </nz-collapse-panel>
    </nz-collapse>
  </div>

  <div class="explorer-toolbar">
    <div class="toolbar-left">
      <nz-breadcrumb>
        <nz-breadcrumb-item>
          <a (click)="navigateToFolder(null)">
            <span nz-icon nzType="home"></span> T\xE0i li\u1EC7u c\u1EE7a t\xF4i
          </a>
        </nz-breadcrumb-item>
        <nz-breadcrumb-item *ngFor="let item of breadcrumbs">
          <a (click)="navigateToFolder(item.id)">{{ item.name }}</a>
        </nz-breadcrumb-item>
      </nz-breadcrumb>
    </div>
    <div class="toolbar-right">
      <app-create-folder-popover
        [parentId]="selectedFolderId"
        [currentFolderName]="currentFolderName"
        buttonText="Th\xEAm m\u1EDBi"
        buttonIcon="folder-add"
        style="margin-right: 8px"
      ></app-create-folder-popover>

      <button nz-button nzType="default" (click)="fileInput.click()" style="margin-right: 8px">
        <span nz-icon nzType="upload"></span> T\u1EA3i l\xEAn
      </button>
      <input #fileInput type="file" style="display: none" (change)="onUpload($event)">
      
      <button nz-button nzType="default" (click)="loadContent()">
        <span nz-icon nzType="reload"></span> L\xE0m m\u1EDBi
      </button>
    </div>
  </div>


  <nz-table 
    #basicTable 
    [nzData]="files" 
    [nzLoading]="loading" 
    nzSize="middle"
    [nzFrontPagination]="false"
    [nzTotal]="total"
    [nzPageIndex]="pageIndex"
    [nzPageSize]="pageSize"
    (nzPageIndexChange)="onPageIndexChange($event)"
    (nzPageSizeChange)="onPageSizeChange($event)"
  >
    <thead>
      <tr>
        <th nzWidth="40px"></th>
        <th>T\xEAn</th>
        <th>K\xEDch th\u01B0\u1EDBc</th>
        <th>Lo\u1EA1i</th>
        <th>Ng\xE0y t\u1EA1o</th>
        <th nzWidth="150px">H\xE0nh \u0111\u1ED9ng</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let folder of folders">
        <td><span nz-icon nzType="folder" nzTheme="fill" style="color: #ffca28"></span></td>
        <td><a (click)="selectedFolderId = folder.id; loadContent()">{{ folder.name }}</a></td>
        <td>--</td>
        <td>Th\u01B0 m\u1EE5c</td>
        <td>--</td>
        <td>
          <div class="action-buttons">
            <button nz-button nzType="text" (click)="openMoveModal(folder, 'folder')" nz-tooltip nzTooltipTitle="Di chuy\u1EC3n">
              <span nz-icon nzType="drag"></span>
            </button>
            <button nz-button nzType="text" nzDanger (click)="deleteFolder(folder.id)" nz-tooltip nzTooltipTitle="X\xF3a">
              <span nz-icon nzType="delete"></span>
            </button>
          </div>
        </td>
      </tr>
      <tr *ngFor="let file of files">
        <td><span nz-icon nzType="file" nzTheme="outline" style="color: #1890ff"></span></td>
        <td><a [href]="file.url" target="_blank">{{ file.name }}</a></td>
        <td>{{ formatSize(file.size) }}</td>
        <td>{{ file.mimeType }}</td>
        <td>{{ file.createdAt | date:'dd/MM/yyyy HH:mm' }}</td>
        <td>
          <div class="action-buttons">
            <button *ngIf="selectionMode" nz-button nzType="primary" nzSize="small" (click)="onSelectFile(file)">
              Ch\xE8n
            </button>
            <a nz-button nzType="text" [href]="file.url" target="_blank" nz-tooltip nzTooltipTitle="T\u1EA3i v\u1EC1">
              <span nz-icon nzType="download"></span>
            </a>
            <button nz-button nzType="text" (click)="openShareModal(file)" nz-tooltip nzTooltipTitle="Chia s\u1EBB">
              <span nz-icon nzType="share-alt"></span>
            </button>
            <button nz-button nzType="text" (click)="openMoveModal(file, 'file')" nz-tooltip nzTooltipTitle="Di chuy\u1EC3n">
              <span nz-icon nzType="drag"></span>
            </button>
            <button nz-button nzType="text" nzDanger (click)="deleteFile(file.id)" nz-tooltip nzTooltipTitle="X\xF3a">
              <span nz-icon nzType="delete"></span>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </nz-table>
</div>
`, styles: ["/* projects/tot/business-files/src/lib/components/file-explorer/file-explorer.css */\n.explorer-container {\n  background: #fff;\n  padding: 16px;\n  border-radius: 8px;\n  min-height: 100%;\n}\n.search-section {\n  margin-bottom: 24px;\n}\n.search-results-collapse {\n  margin-top: 12px;\n  background: #fafafa;\n  border-radius: 8px;\n}\n.search-btn {\n  cursor: pointer;\n  color: #1890ff;\n  font-size: 16px;\n}\n.search-actions {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.clear-btn {\n  cursor: pointer;\n  color: #bfbfbf;\n  font-size: 14px;\n  transition: color 0.3s;\n}\n.clear-btn:hover {\n  color: #ff4d4f;\n}\n.search-btn.spinning {\n  animation: spin 1s linear infinite;\n}\n@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.explorer-toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n  padding-bottom: 16px;\n  border-bottom: 1px solid #f0f0f0;\n}\n.toolbar-left {\n  display: flex;\n  align-items: center;\n}\n.toolbar-right {\n  display: flex;\n  align-items: center;\n}\n.action-buttons {\n  display: flex;\n  gap: 4px;\n}\n[nz-icon] {\n  font-size: 16px;\n}\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n::v-deep .nz-collapse-header {\n  background: #f0f7ff !important;\n  font-weight: 500;\n}\n/*# sourceMappingURL=file-explorer.css.map */\n"] }]
  }], null, { selectedFolderId: [{
    type: Input
  }], selectionMode: [{
    type: Input
  }], folderCreated: [{
    type: Output
  }], fileSelected: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FileExplorerComponent, { className: "FileExplorerComponent", filePath: "projects/tot/business-files/src/lib/components/file-explorer/file-explorer.ts", lineNumber: 45 });
})();

// projects/tot/business-files/src/lib/components/files-folders/files-folders.ts
var _FilesFolders = class _FilesFolders {
  constructor(registry) {
    this.registry = registry;
    this.selectionMode = false;
    this.fileSelected = new EventEmitter();
    this.selectedFolderId = null;
    this.registry.register(REGISTRY_KEYS.FILES_FOLDERS, _FilesFolders);
  }
  onFolderSelected(folderId) {
    this.selectedFolderId = folderId;
  }
  onFolderCreated() {
    if (this.folderTree)
      this.folderTree.loadTree();
    if (this.fileExplorer)
      this.fileExplorer.loadContent();
  }
};
_FilesFolders.\u0275fac = function FilesFolders_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FilesFolders)(\u0275\u0275directiveInject(ComponentRegistryService));
};
_FilesFolders.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FilesFolders, selectors: [["app-files-folders"]], viewQuery: function FilesFolders_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(FolderTreeComponent, 5)(FileExplorerComponent, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.folderTree = _t.first);
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileExplorer = _t.first);
  }
}, inputs: { selectionMode: "selectionMode" }, outputs: { fileSelected: "fileSelected" }, decls: 5, vars: 4, consts: [[1, "files-layout"], ["nzWidth", "280px", "nzTheme", "light", 1, "folder-sider"], [3, "folderSelected", "folderCreated"], [1, "explorer-content"], [3, "fileSelected", "folderCreated", "selectedFolderId", "selectionMode"]], template: function FilesFolders_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-layout", 0)(1, "nz-sider", 1)(2, "app-folder-tree", 2);
    \u0275\u0275listener("folderSelected", function FilesFolders_Template_app_folder_tree_folderSelected_2_listener($event) {
      return ctx.onFolderSelected($event);
    })("folderCreated", function FilesFolders_Template_app_folder_tree_folderCreated_2_listener() {
      return ctx.onFolderCreated();
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "nz-content", 3)(4, "app-file-explorer", 4);
    \u0275\u0275listener("fileSelected", function FilesFolders_Template_app_file_explorer_fileSelected_4_listener($event) {
      return ctx.fileSelected.emit($event);
    })("folderCreated", function FilesFolders_Template_app_file_explorer_folderCreated_4_listener() {
      return ctx.onFolderCreated();
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275classProp("selection-mode", ctx.selectionMode);
    \u0275\u0275advance(4);
    \u0275\u0275property("selectedFolderId", ctx.selectedFolderId)("selectionMode", ctx.selectionMode);
  }
}, dependencies: [
  NzLayoutModule,
  NzLayoutComponent,
  NzContentComponent,
  NzSiderComponent,
  FolderTreeComponent,
  FileExplorerComponent
], styles: ["\n.files-layout[_ngcontent-%COMP%] {\n  height: calc(100vh - 150px);\n  background: #fff;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\n.folder-sider[_ngcontent-%COMP%] {\n  border-right: 1px solid #f0f0f0;\n  height: 100%;\n  overflow-y: auto;\n}\n.explorer-content[_ngcontent-%COMP%] {\n  background: #fff;\n  height: 100%;\n  overflow-y: auto;\n}\n.files-layout.selection-mode[_ngcontent-%COMP%] {\n  height: 600px;\n  box-shadow: none;\n  border: 1px solid #f0f0f0;\n}\n/*# sourceMappingURL=files-folders.css.map */"] });
var FilesFolders = _FilesFolders;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilesFolders, [{
    type: Component,
    args: [{ selector: "app-files-folders", standalone: true, imports: [
      NzLayoutModule,
      FolderTreeComponent,
      FileExplorerComponent
    ], template: '<nz-layout class="files-layout" [class.selection-mode]="selectionMode">\n  <nz-sider nzWidth="280px" nzTheme="light" class="folder-sider">\n    <app-folder-tree (folderSelected)="onFolderSelected($any($event))" (folderCreated)="onFolderCreated()"></app-folder-tree>\n  </nz-sider>\n  <nz-content class="explorer-content">\n    <app-file-explorer \n      [selectedFolderId]="selectedFolderId" \n      [selectionMode]="selectionMode" \n      (fileSelected)="fileSelected.emit($event)"\n      (folderCreated)="onFolderCreated()"\n    ></app-file-explorer>\n  </nz-content>\n</nz-layout>\n', styles: ["/* projects/tot/business-files/src/lib/components/files-folders/files-folders.css */\n.files-layout {\n  height: calc(100vh - 150px);\n  background: #fff;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\n.folder-sider {\n  border-right: 1px solid #f0f0f0;\n  height: 100%;\n  overflow-y: auto;\n}\n.explorer-content {\n  background: #fff;\n  height: 100%;\n  overflow-y: auto;\n}\n.files-layout.selection-mode {\n  height: 600px;\n  box-shadow: none;\n  border: 1px solid #f0f0f0;\n}\n/*# sourceMappingURL=files-folders.css.map */\n"] }]
  }], () => [{ type: ComponentRegistryService }], { folderTree: [{
    type: ViewChild,
    args: [FolderTreeComponent]
  }], fileExplorer: [{
    type: ViewChild,
    args: [FileExplorerComponent]
  }], selectionMode: [{
    type: Input
  }], fileSelected: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FilesFolders, { className: "FilesFolders", filePath: "projects/tot/business-files/src/lib/components/files-folders/files-folders.ts", lineNumber: 18 });
})();
export {
  FilesFolders,
  FilesFoldersService
};
//# sourceMappingURL=chunk-3H5CKQJF.js.map
