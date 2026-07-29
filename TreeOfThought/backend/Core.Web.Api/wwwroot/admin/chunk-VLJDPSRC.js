import {
  CommonModule,
  DatePipe,
  DefaultValueAccessor,
  FormsModule,
  HttpClient,
  NgClass,
  NgControlStatus,
  NgForOf,
  NgIf,
  NgModel,
  NgSwitch,
  NgSwitchCase
} from "./chunk-VPN77PIR.js";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Injectable,
  Input,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-XIF5A4AY.js";
import "./chunk-MYGOUE3E.js";

// projects/tot/elsa-bpnm-workflow/src/lib/services/elsa-workflow.service.ts
var _ElsaWorkflowService = class _ElsaWorkflowService {
  constructor() {
    this.http = inject(HttpClient);
    this.baseUrl = "/api/workflow";
  }
  getDefinitions() {
    return this.http.get(`${this.baseUrl}/definitions`);
  }
  getDefinitionById(id) {
    return this.http.get(`${this.baseUrl}/definitions/${id}`);
  }
  saveDefinition(definition) {
    return this.http.post(`${this.baseUrl}/definitions`, definition);
  }
  deleteDefinition(id) {
    return this.http.delete(`${this.baseUrl}/definitions/${id}`);
  }
  executeWorkflow(definitionId, input = {}) {
    return this.http.post(`${this.baseUrl}/execute`, { definitionId, input });
  }
  getInstances() {
    return this.http.get(`${this.baseUrl}/instances`);
  }
  getInstanceById(id) {
    return this.http.get(`${this.baseUrl}/instances/${id}`);
  }
  getUserTasks() {
    return this.http.get(`${this.baseUrl}/user-tasks`);
  }
  approveUserTask(taskId, reason = "") {
    return this.http.post(`${this.baseUrl}/user-tasks/${taskId}/approve`, { taskId, approved: true, reason });
  }
  rejectUserTask(taskId, reason = "") {
    return this.http.post(`${this.baseUrl}/user-tasks/${taskId}/reject`, { taskId, approved: false, reason });
  }
  getDashboardStats() {
    return this.http.get(`${this.baseUrl}/dashboard/stats`);
  }
  getActivities() {
    return this.http.get(`${this.baseUrl}/activities`);
  }
  getTriggers() {
    return this.http.get(`${this.baseUrl}/triggers`);
  }
};
_ElsaWorkflowService.\u0275fac = function ElsaWorkflowService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ElsaWorkflowService)();
};
_ElsaWorkflowService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ElsaWorkflowService, factory: _ElsaWorkflowService.\u0275fac, providedIn: "root" });
var ElsaWorkflowService = _ElsaWorkflowService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ElsaWorkflowService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// projects/tot/elsa-bpnm-workflow/src/lib/components/bpnm-workflow-designer/bpnm-workflow-designer.component.ts
var _c0 = (a0, a1) => ({ "selected": a0, "trigger-node": a1 });
function BpnmWorkflowDesignerComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275listener("click", function BpnmWorkflowDesignerComponent_div_33_Template_div_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addNode(item_r2));
    });
    \u0275\u0275elementStart(1, "div", 41);
    \u0275\u0275text(2, "\u26A1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 42)(4, "div", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 44);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r2.displayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.description);
  }
}
function BpnmWorkflowDesignerComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275listener("click", function BpnmWorkflowDesignerComponent_div_38_Template_div_click_0_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addNode(item_r5));
    });
    \u0275\u0275elementStart(1, "div", 45);
    \u0275\u0275text(2, "\u2699\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 42)(4, "div", 43);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 44);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r5.displayName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.description);
  }
}
function BpnmWorkflowDesignerComponent__svg_g_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "g");
    \u0275\u0275element(1, "line", 46);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const conn_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("x1", ctx_r2.getNodePosition(conn_r6.sourceNodeId).x + 140)("y1", ctx_r2.getNodePosition(conn_r6.sourceNodeId).y + 40)("x2", ctx_r2.getNodePosition(conn_r6.targetNodeId).x + 10)("y2", ctx_r2.getNodePosition(conn_r6.targetNodeId).y + 40);
  }
}
function BpnmWorkflowDesignerComponent_div_58_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275listener("click", function BpnmWorkflowDesignerComponent_div_58_Template_div_click_0_listener() {
      const node_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectNode(node_r8));
    });
    \u0275\u0275elementStart(1, "div", 48)(2, "span", 49);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 50);
    \u0275\u0275listener("click", function BpnmWorkflowDesignerComponent_div_58_Template_button_click_4_listener($event) {
      const node_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.removeNode(node_r8.id);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(5, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 51)(7, "div", 52);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 53);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 54)(12, "button", 55);
    \u0275\u0275listener("click", function BpnmWorkflowDesignerComponent_div_58_Template_button_click_12_listener($event) {
      const node_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.startConnect(node_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const node_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("left", node_r8.positionX, "px")("top", node_r8.positionY, "px");
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(9, _c0, (ctx_r2.selectedNode == null ? null : ctx_r2.selectedNode.id) === node_r8.id, node_r8.category === "Triggers"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(node_r8.category);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(node_r8.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(node_r8.activityType);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.connectingSourceId === node_r8.id ? "H\u1EE7y n\u1ED1i" : "N\u1ED1i ti\u1EBFp \u2192", " ");
  }
}
function BpnmWorkflowDesignerComponent_div_65_div_1_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 58)(1, "label");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "textarea", 62);
    \u0275\u0275listener("ngModelChange", function BpnmWorkflowDesignerComponent_div_65_div_1_div_13_Template_textarea_ngModelChange_3_listener($event) {
      const propKey_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectedNode.properties[propKey_r11] = $event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const propKey_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(propKey_r11);
    \u0275\u0275advance();
    \u0275\u0275property("ngModel", ctx_r2.selectedNode.properties[propKey_r11]);
  }
}
function BpnmWorkflowDesignerComponent_div_65_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "h3");
    \u0275\u0275text(2, "Ch\u1EC9nh s\u1EEDa Node");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 58)(4, "label");
    \u0275\u0275text(5, "T\xEAn Node");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 59);
    \u0275\u0275twoWayListener("ngModelChange", function BpnmWorkflowDesignerComponent_div_65_div_1_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.selectedNode.name, $event) || (ctx_r2.selectedNode.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 58)(8, "label");
    \u0275\u0275text(9, "Lo\u1EA1i Activity");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 60);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "h4");
    \u0275\u0275text(12, "Thu\u1ED9c t\xEDnh C\u1EA5u h\xECnh (Properties)");
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, BpnmWorkflowDesignerComponent_div_65_div_1_div_13_Template, 4, 2, "div", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.selectedNode.name);
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r2.selectedNode.activityType);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.getObjectKeys(ctx_r2.selectedNode.properties));
  }
}
function BpnmWorkflowDesignerComponent_div_65_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63)(1, "p");
    \u0275\u0275text(2, "B\u1EA5m ch\u1ECDn m\u1ED9t Node tr\xEAn Canvas \u0111\u1EC3 ch\u1EC9nh s\u1EEDa th\xF4ng s\u1ED1 c\u1EA5u h\xECnh.");
    \u0275\u0275elementEnd()();
  }
}
function BpnmWorkflowDesignerComponent_div_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275template(1, BpnmWorkflowDesignerComponent_div_65_div_1_Template, 14, 3, "div", 57)(2, BpnmWorkflowDesignerComponent_div_65_ng_template_2_Template, 3, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const noNodeSelected_r12 = \u0275\u0275reference(3);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.selectedNode)("ngIfElse", noNodeSelected_r12);
  }
}
function BpnmWorkflowDesignerComponent_div_66_div_1_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 68);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 69);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 70);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 4, log_r13.timestamp, "HH:mm:ss.SSS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", log_r13.nodeName, " (", log_r13.activityType, ")");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(log_r13.message);
  }
}
function BpnmWorkflowDesignerComponent_div_66_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 64)(2, "span", 65);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h4");
    \u0275\u0275text(7, "Nh\u1EADt k\xFD Th\u1EF1c thi (Execution Logs)");
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, BpnmWorkflowDesignerComponent_div_66_div_1_div_8_Template, 8, 7, "div", 66);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.lastExecution.status.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.lastExecution.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("ID: ", ctx_r2.lastExecution.id);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.lastExecution.executionLogs);
  }
}
function BpnmWorkflowDesignerComponent_div_66_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63)(1, "p");
    \u0275\u0275text(2, "Ch\u01B0a c\xF3 l\u01B0\u1EE3t ch\u1EA1y th\u1EED n\xE0o. B\u1EA5m n\xFAt ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4, '"Ch\u1EA1y th\u1EED (Run)"');
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " \u1EDF tr\xEAn \u0111\u1EC3 th\u1EF1c thi quy tr\xECnh.");
    \u0275\u0275elementEnd()();
  }
}
function BpnmWorkflowDesignerComponent_div_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275template(1, BpnmWorkflowDesignerComponent_div_66_div_1_Template, 9, 4, "div", 57)(2, BpnmWorkflowDesignerComponent_div_66_ng_template_2_Template, 6, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const noExecution_r14 = \u0275\u0275reference(3);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.lastExecution)("ngIfElse", noExecution_r14);
  }
}
var _BpnmWorkflowDesignerComponent = class _BpnmWorkflowDesignerComponent {
  constructor() {
    this.workflowService = inject(ElsaWorkflowService);
    this.currentDefinition = {
      id: "wf-order-fulfillment-sample",
      definitionId: "order-fulfillment",
      name: "Order Fulfillment Workflow",
      version: 1,
      isPublished: true,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      nodes: [],
      connections: []
    };
    this.activities = [];
    this.triggers = [];
    this.searchTerm = "";
    this.selectedNode = null;
    this.connectingSourceId = null;
    this.activeTab = "properties";
    this.isSaving = false;
    this.isRunning = false;
    this.lastExecution = null;
  }
  ngOnInit() {
    this.loadSampleWorkflow();
    this.loadCatalog();
  }
  loadCatalog() {
    this.workflowService.getActivities().subscribe((acts) => this.activities = acts);
    this.workflowService.getTriggers().subscribe((trigs) => this.triggers = trigs);
  }
  loadSampleWorkflow() {
    this.workflowService.getDefinitionById("wf-order-fulfillment-sample").subscribe({
      next: (def) => {
        if (def) {
          this.currentDefinition = def;
          if (def.nodes.length > 0) {
            this.selectedNode = def.nodes[0];
          }
        }
      },
      error: () => {
        this.currentDefinition.nodes = [
          {
            id: "node-1",
            name: "HTTP Trigger Listener",
            activityType: "HttpTrigger",
            category: "Triggers",
            positionX: 100,
            positionY: 150,
            properties: { path: "/api/orders/webhook", method: "POST" }
          }
        ];
      }
    });
  }
  get filteredTriggers() {
    if (!this.searchTerm)
      return this.triggers;
    return this.triggers.filter((t) => t.displayName.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  get filteredActivities() {
    if (!this.searchTerm)
      return this.activities;
    return this.activities.filter((a) => a.displayName.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  addNode(meta) {
    const newNode = {
      id: "node-" + (this.currentDefinition.nodes.length + 1),
      name: meta.displayName,
      activityType: meta.activityType,
      category: meta.category,
      positionX: 100 + this.currentDefinition.nodes.length * 50 % 600,
      positionY: 150 + Math.floor(this.currentDefinition.nodes.length / 3) * 100,
      properties: {}
    };
    meta.properties.forEach((p) => {
      newNode.properties[p.name] = p.defaultValue || "";
    });
    this.currentDefinition.nodes.push(newNode);
    this.selectNode(newNode);
  }
  removeNode(nodeId) {
    var _a;
    this.currentDefinition.nodes = this.currentDefinition.nodes.filter((n) => n.id !== nodeId);
    this.currentDefinition.connections = this.currentDefinition.connections.filter((c) => c.sourceNodeId !== nodeId && c.targetNodeId !== nodeId);
    if (((_a = this.selectedNode) == null ? void 0 : _a.id) === nodeId) {
      this.selectedNode = null;
    }
  }
  selectNode(node) {
    this.selectedNode = node;
    this.activeTab = "properties";
  }
  startConnect(node) {
    if (!this.connectingSourceId) {
      this.connectingSourceId = node.id;
    } else if (this.connectingSourceId === node.id) {
      this.connectingSourceId = null;
    } else {
      const newConn = {
        id: "conn-" + (this.currentDefinition.connections.length + 1),
        sourceNodeId: this.connectingSourceId,
        targetNodeId: node.id,
        outcome: "Done"
      };
      this.currentDefinition.connections.push(newConn);
      this.connectingSourceId = null;
    }
  }
  getNodePosition(nodeId) {
    const node = this.currentDefinition.nodes.find((n) => n.id === nodeId);
    return node ? { x: node.positionX, y: node.positionY } : { x: 0, y: 0 };
  }
  clearCanvas() {
    this.currentDefinition.nodes = [];
    this.currentDefinition.connections = [];
    this.selectedNode = null;
  }
  saveWorkflow() {
    this.isSaving = true;
    this.workflowService.saveDefinition(this.currentDefinition).subscribe({
      next: (saved) => {
        this.isSaving = false;
        this.currentDefinition = saved;
        alert("\u0110\xE3 l\u01B0u quy tr\xECnh Workflow th\xE0nh c\xF4ng!");
      },
      error: (err) => {
        this.isSaving = false;
        alert("L\u1ED7i khi l\u01B0u quy tr\xECnh: " + (err.message || "Error"));
      }
    });
  }
  runWorkflow() {
    this.isRunning = true;
    this.activeTab = "execution";
    this.workflowService.executeWorkflow(this.currentDefinition.id).subscribe({
      next: (instance) => {
        this.isRunning = false;
        this.lastExecution = instance;
      },
      error: (err) => {
        this.isRunning = false;
        alert("L\u1ED7i khi ch\u1EA1y th\u1EF1c thi quy tr\xECnh: " + (err.message || "Error"));
      }
    });
  }
  getObjectKeys(obj) {
    return obj ? Object.keys(obj) : [];
  }
};
_BpnmWorkflowDesignerComponent.\u0275fac = function BpnmWorkflowDesignerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BpnmWorkflowDesignerComponent)();
};
_BpnmWorkflowDesignerComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BpnmWorkflowDesignerComponent, selectors: [["tot-bpnm-workflow-designer"]], decls: 67, vars: 19, consts: [["noNodeSelected", ""], ["noExecution", ""], [1, "elsa-container"], [1, "top-bar"], [1, "title-area"], [1, "badge"], [1, "version-tag"], [1, "action-buttons"], [1, "btn", "btn-secondary", 3, "click"], [1, "fa", "fa-folder-open"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "fa", "fa-save"], [1, "btn", "btn-success", 3, "click", "disabled"], [1, "fa", "fa-play"], [1, "main-layout"], [1, "sidebar-palette"], [1, "palette-header"], [1, "palette-search"], ["type", "text", "placeholder", "T\xECm ki\u1EBFm Activity, Redis, Kafka...", 3, "ngModelChange", "ngModel"], [1, "palette-categories"], [1, "category-group"], [1, "category-title"], [1, "dot", "trigger-dot"], ["class", "activity-card", 3, "click", 4, "ngFor", "ngForOf"], [1, "dot", "activity-dot"], [1, "canvas-area"], [1, "canvas-toolbar"], [1, "canvas-stat"], [1, "btn-text", 3, "click"], [1, "fa", "fa-trash"], ["id", "designer-canvas", 1, "canvas-grid"], [1, "svg-connections-layer"], [4, "ngFor", "ngForOf"], ["id", "arrow", "viewBox", "0 0 10 10", "refX", "6", "refY", "5", "markerWidth", "6", "markerHeight", "6", "orient", "auto-start-reverse"], ["d", "M 0 0 L 10 5 L 0 10 z", "fill", "#3b82f6"], ["class", "designer-node", 3, "ngClass", "left", "top", "click", 4, "ngFor", "ngForOf"], [1, "right-panel"], [1, "panel-tabs"], [3, "click"], ["class", "panel-content", 4, "ngIf"], [1, "activity-card", 3, "click"], [1, "card-icon", "trigger-icon"], [1, "card-info"], [1, "card-title"], [1, "card-desc"], [1, "card-icon", "activity-icon"], ["stroke", "#3b82f6", "stroke-width", "3", "stroke-dasharray", "6,4", "marker-end", "url(#arrow)"], [1, "designer-node", 3, "click", "ngClass"], [1, "node-header"], [1, "node-type-badge"], [1, "btn-close", 3, "click"], [1, "node-body"], [1, "node-title"], [1, "node-sub"], [1, "node-footer"], [1, "btn-connect", 3, "click"], [1, "panel-content"], [4, "ngIf", "ngIfElse"], [1, "form-group"], ["type", "text", 1, "form-control", 3, "ngModelChange", "ngModel"], ["type", "text", "disabled", "", 1, "form-control", 3, "value"], ["class", "form-group", 4, "ngFor", "ngForOf"], ["rows", "2", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "empty-state"], [1, "execution-header"], [1, "status-badge", 3, "ngClass"], ["class", "log-item", 4, "ngFor", "ngForOf"], [1, "log-item"], [1, "log-time"], [1, "log-name"], [1, "log-msg"]], template: function BpnmWorkflowDesignerComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "div", 5);
    \u0275\u0275text(4, "BPMN Workflow");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 6);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 7)(10, "button", 8);
    \u0275\u0275listener("click", function BpnmWorkflowDesignerComponent_Template_button_click_10_listener() {
      return ctx.loadSampleWorkflow();
    });
    \u0275\u0275element(11, "i", 9);
    \u0275\u0275text(12, " T\u1EA3i quy tr\xECnh m\u1EABu ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 10);
    \u0275\u0275listener("click", function BpnmWorkflowDesignerComponent_Template_button_click_13_listener() {
      return ctx.saveWorkflow();
    });
    \u0275\u0275element(14, "i", 11);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 12);
    \u0275\u0275listener("click", function BpnmWorkflowDesignerComponent_Template_button_click_16_listener() {
      return ctx.runWorkflow();
    });
    \u0275\u0275element(17, "i", 13);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 14)(20, "div", 15)(21, "div", 16)(22, "h3");
    \u0275\u0275text(23, "Th\u01B0 vi\u1EC7n Activities & Triggers");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p");
    \u0275\u0275text(25, "B\u1EA5m ch\u1ECDn \u0111\u1EC3 th\xEAm Node v\xE0o quy tr\xECnh");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 17)(27, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function BpnmWorkflowDesignerComponent_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
      return $event;
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 19)(29, "div", 20)(30, "div", 21);
    \u0275\u0275element(31, "span", 22);
    \u0275\u0275text(32, " Triggers / Webhooks ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, BpnmWorkflowDesignerComponent_div_33_Template, 8, 2, "div", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div", 20)(35, "div", 21);
    \u0275\u0275element(36, "span", 24);
    \u0275\u0275text(37, " Activities & Connectors ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(38, BpnmWorkflowDesignerComponent_div_38_Template, 8, 2, "div", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 25)(40, "div", 26)(41, "span", 27);
    \u0275\u0275text(42, "T\u1ED5ng s\u1ED1 Node: ");
    \u0275\u0275elementStart(43, "strong");
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "span", 27);
    \u0275\u0275text(46, "K\u1EBFt n\u1ED1i: ");
    \u0275\u0275elementStart(47, "strong");
    \u0275\u0275text(48);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "button", 28);
    \u0275\u0275listener("click", function BpnmWorkflowDesignerComponent_Template_button_click_49_listener() {
      return ctx.clearCanvas();
    });
    \u0275\u0275element(50, "i", 29);
    \u0275\u0275text(51, " X\xF3a Canvas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "div", 30);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(53, "svg", 31);
    \u0275\u0275template(54, BpnmWorkflowDesignerComponent__svg_g_54_Template, 2, 4, "g", 32);
    \u0275\u0275elementStart(55, "defs")(56, "marker", 33);
    \u0275\u0275element(57, "path", 34);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(58, BpnmWorkflowDesignerComponent_div_58_Template, 14, 12, "div", 35);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(59, "div", 36)(60, "div", 37)(61, "button", 38);
    \u0275\u0275listener("click", function BpnmWorkflowDesignerComponent_Template_button_click_61_listener() {
      return ctx.activeTab = "properties";
    });
    \u0275\u0275text(62, "C\u1EA5u h\xECnh Node");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "button", 38);
    \u0275\u0275listener("click", function BpnmWorkflowDesignerComponent_Template_button_click_63_listener() {
      return ctx.activeTab = "execution";
    });
    \u0275\u0275text(64, "K\u1EBFt qu\u1EA3 Ch\u1EA1y");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(65, BpnmWorkflowDesignerComponent_div_65_Template, 4, 2, "div", 39)(66, BpnmWorkflowDesignerComponent_div_66_Template, 4, 2, "div", 39);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx.currentDefinition.name || "Tr\xECnh thi\u1EBFt k\u1EBF quy tr\xECnh Elsa");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("v", ctx.currentDefinition.version || 1);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx.isSaving);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.isSaving ? "\u0110ang l\u01B0u..." : "L\u01B0u quy tr\xECnh", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.isRunning);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.isRunning ? "\u0110ang th\u1EF1c thi..." : "Ch\u1EA1y th\u1EED (Run)", " ");
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx.filteredTriggers);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx.filteredActivities);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx.currentDefinition.nodes.length);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.currentDefinition.connections.length);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx.currentDefinition.connections);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx.currentDefinition.nodes);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx.activeTab === "properties");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx.activeTab === "execution");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.activeTab === "properties");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.activeTab === "execution");
  }
}, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, DatePipe], styles: ['\n.elsa-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: calc(100vh - 80px);\n  background-color: #0f172a;\n  color: #f8fafc;\n  font-family:\n    "Inter",\n    system-ui,\n    -apple-system,\n    sans-serif;\n}\n.top-bar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 24px;\n  background: #1e293b;\n  border-bottom: 1px solid #334155;\n}\n.title-area[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.badge[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  color: white;\n  padding: 4px 10px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.version-tag[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 13px;\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.btn[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 6px;\n  border: none;\n  font-weight: 600;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  transition: all 0.2s;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  background: #3b82f6;\n  color: white;\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #475569;\n  color: white;\n}\n.btn-success[_ngcontent-%COMP%] {\n  background: #10b981;\n  color: white;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n  transform: translateY(-1px);\n}\n.main-layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex: 1;\n  overflow: hidden;\n}\n.sidebar-palette[_ngcontent-%COMP%] {\n  width: 320px;\n  background: #1e293b;\n  border-right: 1px solid #334155;\n  display: flex;\n  flex-direction: column;\n}\n.palette-header[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-bottom: 1px solid #334155;\n}\n.palette-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n}\n.palette-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0 0;\n  color: #94a3b8;\n  font-size: 12px;\n}\n.palette-search[_ngcontent-%COMP%] {\n  padding: 12px;\n}\n.palette-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px 12px;\n  background: #0f172a;\n  border: 1px solid #334155;\n  border-radius: 6px;\n  color: white;\n  box-sizing: border-box;\n}\n.palette-categories[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 12px;\n}\n.category-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.category-title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #cbd5e1;\n  margin-bottom: 8px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  display: inline-block;\n}\n.trigger-dot[_ngcontent-%COMP%] {\n  background: #f59e0b;\n}\n.activity-dot[_ngcontent-%COMP%] {\n  background: #3b82f6;\n}\n.activity-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px;\n  background: #0f172a;\n  border: 1px solid #334155;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.activity-card[_ngcontent-%COMP%]:hover {\n  border-color: #3b82f6;\n  background: #1e293b;\n  transform: translateX(2px);\n}\n.card-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n  background: #334155;\n}\n.canvas-area[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  background: #090d16;\n  position: relative;\n}\n.canvas-toolbar[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  background: #0f172a;\n  border-bottom: 1px solid #334155;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.canvas-stat[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #94a3b8;\n}\n.btn-text[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #ef4444;\n  cursor: pointer;\n  font-size: 13px;\n  margin-left: auto;\n}\n.canvas-grid[_ngcontent-%COMP%] {\n  flex: 1;\n  position: relative;\n  overflow: auto;\n  background-image: radial-gradient(#334155 1px, transparent 1px);\n  background-size: 20px 20px;\n}\n.svg-connections-layer[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n.designer-node[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 180px;\n  background: #1e293b;\n  border: 2px solid #334155;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n  cursor: pointer;\n  transition: border-color 0.2s;\n}\n.designer-node.selected[_ngcontent-%COMP%] {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);\n}\n.designer-node.trigger-node[_ngcontent-%COMP%] {\n  border-left: 4px solid #f59e0b;\n}\n.node-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 6px 8px;\n  background: #0f172a;\n  border-bottom: 1px solid #334155;\n}\n.node-type-badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  text-transform: uppercase;\n  color: #94a3b8;\n}\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #94a3b8;\n  cursor: pointer;\n  font-size: 14px;\n}\n.node-body[_ngcontent-%COMP%] {\n  padding: 10px;\n}\n.node-title[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: #f8fafc;\n}\n.node-sub[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #64748b;\n  margin-top: 2px;\n}\n.node-footer[_ngcontent-%COMP%] {\n  padding: 6px;\n  border-top: 1px solid #334155;\n  text-align: center;\n}\n.btn-connect[_ngcontent-%COMP%] {\n  background: #334155;\n  border: none;\n  color: #93c5fd;\n  font-size: 11px;\n  padding: 4px 8px;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.right-panel[_ngcontent-%COMP%] {\n  width: 340px;\n  background: #1e293b;\n  border-left: 1px solid #334155;\n  display: flex;\n  flex-direction: column;\n}\n.panel-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  border-bottom: 1px solid #334155;\n}\n.panel-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 12px;\n  background: #0f172a;\n  border: none;\n  color: #94a3b8;\n  cursor: pointer;\n  font-weight: 600;\n}\n.panel-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: #1e293b;\n  color: #3b82f6;\n  border-bottom: 2px solid #3b82f6;\n}\n.panel-content[_ngcontent-%COMP%] {\n  padding: 16px;\n  overflow-y: auto;\n  flex: 1;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: #cbd5e1;\n  margin-bottom: 4px;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px;\n  background: #0f172a;\n  border: 1px solid #334155;\n  border-radius: 6px;\n  color: white;\n  box-sizing: border-box;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #64748b;\n  margin-top: 40px;\n  font-size: 13px;\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-weight: 600;\n  font-size: 12px;\n}\n.status-badge.completed[_ngcontent-%COMP%] {\n  background: #10b981;\n  color: white;\n}\n.log-item[_ngcontent-%COMP%] {\n  background: #0f172a;\n  padding: 10px;\n  border-radius: 6px;\n  margin-bottom: 8px;\n  font-size: 12px;\n  border-left: 3px solid #3b82f6;\n}\n.log-time[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 11px;\n}\n.log-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #e2e8f0;\n  margin: 2px 0;\n}\n.log-msg[_ngcontent-%COMP%] {\n  color: #94a3b8;\n}\n/*# sourceMappingURL=bpnm-workflow-designer.component.css.map */'] });
var BpnmWorkflowDesignerComponent = _BpnmWorkflowDesignerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BpnmWorkflowDesignerComponent, [{
    type: Component,
    args: [{ selector: "tot-bpnm-workflow-designer", standalone: true, imports: [CommonModule, FormsModule], template: `
    <div class="elsa-container">
      <!-- Top Bar -->
      <div class="top-bar">
        <div class="title-area">
          <div class="badge">BPMN Workflow</div>
          <h2>{{ currentDefinition.name || 'Tr\xECnh thi\u1EBFt k\u1EBF quy tr\xECnh Elsa' }}</h2>
          <span class="version-tag">v{{ currentDefinition.version || 1 }}</span>
        </div>

        <div class="action-buttons">
          <button class="btn btn-secondary" (click)="loadSampleWorkflow()">
            <i class="fa fa-folder-open"></i> T\u1EA3i quy tr\xECnh m\u1EABu
          </button>
          <button class="btn btn-primary" (click)="saveWorkflow()" [disabled]="isSaving">
            <i class="fa fa-save"></i> {{ isSaving ? '\u0110ang l\u01B0u...' : 'L\u01B0u quy tr\xECnh' }}
          </button>
          <button class="btn btn-success" (click)="runWorkflow()" [disabled]="isRunning">
            <i class="fa fa-play"></i> {{ isRunning ? '\u0110ang th\u1EF1c thi...' : 'Ch\u1EA1y th\u1EED (Run)' }}
          </button>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="main-layout">
        <!-- Sidebar Palette: Nodes & Activities -->
        <div class="sidebar-palette">
          <div class="palette-header">
            <h3>Th\u01B0 vi\u1EC7n Activities & Triggers</h3>
            <p>B\u1EA5m ch\u1ECDn \u0111\u1EC3 th\xEAm Node v\xE0o quy tr\xECnh</p>
          </div>

          <div class="palette-search">
            <input type="text" [(ngModel)]="searchTerm" placeholder="T\xECm ki\u1EBFm Activity, Redis, Kafka..." />
          </div>

          <div class="palette-categories">
            <!-- Triggers -->
            <div class="category-group">
              <div class="category-title">
                <span class="dot trigger-dot"></span> Triggers / Webhooks
              </div>
              <div class="activity-card" *ngFor="let item of filteredTriggers" (click)="addNode(item)">
                <div class="card-icon trigger-icon">\u26A1</div>
                <div class="card-info">
                  <div class="card-title">{{ item.displayName }}</div>
                  <div class="card-desc">{{ item.description }}</div>
                </div>
              </div>
            </div>

            <!-- Activities -->
            <div class="category-group">
              <div class="category-title">
                <span class="dot activity-dot"></span> Activities & Connectors
              </div>
              <div class="activity-card" *ngFor="let item of filteredActivities" (click)="addNode(item)">
                <div class="card-icon activity-icon">\u2699\uFE0F</div>
                <div class="card-info">
                  <div class="card-title">{{ item.displayName }}</div>
                  <div class="card-desc">{{ item.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Canvas Workspace -->
        <div class="canvas-area">
          <div class="canvas-toolbar">
            <span class="canvas-stat">T\u1ED5ng s\u1ED1 Node: <strong>{{ currentDefinition.nodes.length }}</strong></span>
            <span class="canvas-stat">K\u1EBFt n\u1ED1i: <strong>{{ currentDefinition.connections.length }}</strong></span>
            <button class="btn-text" (click)="clearCanvas()"><i class="fa fa-trash"></i> X\xF3a Canvas</button>
          </div>

          <div class="canvas-grid" id="designer-canvas">
            <!-- SVG Connections line -->
            <svg class="svg-connections-layer">
              <g *ngFor="let conn of currentDefinition.connections">
                <line
                  [attr.x1]="getNodePosition(conn.sourceNodeId).x + 140"
                  [attr.y1]="getNodePosition(conn.sourceNodeId).y + 40"
                  [attr.x2]="getNodePosition(conn.targetNodeId).x + 10"
                  [attr.y2]="getNodePosition(conn.targetNodeId).y + 40"
                  stroke="#3b82f6"
                  stroke-width="3"
                  stroke-dasharray="6,4"
                  marker-end="url(#arrow)"
                />
              </g>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/>
                </marker>
              </defs>
            </svg>

            <!-- Workflow Nodes -->
            <div
              *ngFor="let node of currentDefinition.nodes; let i = index"
              class="designer-node"
              [ngClass]="{ 'selected': selectedNode?.id === node.id, 'trigger-node': node.category === 'Triggers' }"
              [style.left.px]="node.positionX"
              [style.top.px]="node.positionY"
              (click)="selectNode(node)"
            >
              <div class="node-header">
                <span class="node-type-badge">{{ node.category }}</span>
                <button class="btn-close" (click)="removeNode(node.id); $event.stopPropagation()">\xD7</button>
              </div>
              <div class="node-body">
                <div class="node-title">{{ node.name }}</div>
                <div class="node-sub">{{ node.activityType }}</div>
              </div>
              <div class="node-footer">
                <button class="btn-connect" (click)="startConnect(node); $event.stopPropagation()">
                  {{ connectingSourceId === node.id ? 'H\u1EE7y n\u1ED1i' : 'N\u1ED1i ti\u1EBFp \u2192' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel: Node Property Editor & Execution Result -->
        <div class="right-panel">
          <!-- Tabs -->
          <div class="panel-tabs">
            <button [class.active]="activeTab === 'properties'" (click)="activeTab = 'properties'">C\u1EA5u h\xECnh Node</button>
            <button [class.active]="activeTab === 'execution'" (click)="activeTab = 'execution'">K\u1EBFt qu\u1EA3 Ch\u1EA1y</button>
          </div>

          <!-- Properties Editor Tab -->
          <div class="panel-content" *ngIf="activeTab === 'properties'">
            <div *ngIf="selectedNode; else noNodeSelected">
              <h3>Ch\u1EC9nh s\u1EEDa Node</h3>
              <div class="form-group">
                <label>T\xEAn Node</label>
                <input type="text" [(ngModel)]="selectedNode.name" class="form-control" />
              </div>

              <div class="form-group">
                <label>Lo\u1EA1i Activity</label>
                <input type="text" [value]="selectedNode.activityType" class="form-control" disabled />
              </div>

              <h4>Thu\u1ED9c t\xEDnh C\u1EA5u h\xECnh (Properties)</h4>
              <div class="form-group" *ngFor="let propKey of getObjectKeys(selectedNode.properties)">
                <label>{{ propKey }}</label>
                <textarea
                  rows="2"
                  [ngModel]="selectedNode.properties[propKey]"
                  (ngModelChange)="selectedNode.properties[propKey] = $event"
                  class="form-control"
                ></textarea>
              </div>
            </div>

            <ng-template #noNodeSelected>
              <div class="empty-state">
                <p>B\u1EA5m ch\u1ECDn m\u1ED9t Node tr\xEAn Canvas \u0111\u1EC3 ch\u1EC9nh s\u1EEDa th\xF4ng s\u1ED1 c\u1EA5u h\xECnh.</p>
              </div>
            </ng-template>
          </div>

          <!-- Execution Logs Tab -->
          <div class="panel-content" *ngIf="activeTab === 'execution'">
            <div *ngIf="lastExecution; else noExecution">
              <div class="execution-header">
                <span class="status-badge" [ngClass]="lastExecution.status.toLowerCase()">
                  {{ lastExecution.status }}
                </span>
                <div>ID: {{ lastExecution.id }}</div>
              </div>

              <h4>Nh\u1EADt k\xFD Th\u1EF1c thi (Execution Logs)</h4>
              <div class="log-item" *ngFor="let log of lastExecution.executionLogs">
                <div class="log-time">{{ log.timestamp | date:'HH:mm:ss.SSS' }}</div>
                <div class="log-name">{{ log.nodeName }} ({{ log.activityType }})</div>
                <div class="log-msg">{{ log.message }}</div>
              </div>
            </div>

            <ng-template #noExecution>
              <div class="empty-state">
                <p>Ch\u01B0a c\xF3 l\u01B0\u1EE3t ch\u1EA1y th\u1EED n\xE0o. B\u1EA5m n\xFAt <strong>"Ch\u1EA1y th\u1EED (Run)"</strong> \u1EDF tr\xEAn \u0111\u1EC3 th\u1EF1c thi quy tr\xECnh.</p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `, styles: ['/* angular:styles/component:css;87910ada959453ecdf96d48ae8c9d94c636cc3d903ef1b0e315734742aecf482;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/projects/tot/elsa-bpnm-workflow/src/lib/components/bpnm-workflow-designer/bpnm-workflow-designer.component.ts */\n.elsa-container {\n  display: flex;\n  flex-direction: column;\n  height: calc(100vh - 80px);\n  background-color: #0f172a;\n  color: #f8fafc;\n  font-family:\n    "Inter",\n    system-ui,\n    -apple-system,\n    sans-serif;\n}\n.top-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 24px;\n  background: #1e293b;\n  border-bottom: 1px solid #334155;\n}\n.title-area {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.badge {\n  background: #3b82f6;\n  color: white;\n  padding: 4px 10px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.version-tag {\n  color: #94a3b8;\n  font-size: 13px;\n}\n.action-buttons {\n  display: flex;\n  gap: 10px;\n}\n.btn {\n  padding: 8px 16px;\n  border-radius: 6px;\n  border: none;\n  font-weight: 600;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  transition: all 0.2s;\n}\n.btn-primary {\n  background: #3b82f6;\n  color: white;\n}\n.btn-secondary {\n  background: #475569;\n  color: white;\n}\n.btn-success {\n  background: #10b981;\n  color: white;\n}\n.btn:hover {\n  opacity: 0.9;\n  transform: translateY(-1px);\n}\n.main-layout {\n  display: flex;\n  flex: 1;\n  overflow: hidden;\n}\n.sidebar-palette {\n  width: 320px;\n  background: #1e293b;\n  border-right: 1px solid #334155;\n  display: flex;\n  flex-direction: column;\n}\n.palette-header {\n  padding: 16px;\n  border-bottom: 1px solid #334155;\n}\n.palette-header h3 {\n  margin: 0;\n  font-size: 16px;\n}\n.palette-header p {\n  margin: 4px 0 0 0;\n  color: #94a3b8;\n  font-size: 12px;\n}\n.palette-search {\n  padding: 12px;\n}\n.palette-search input {\n  width: 100%;\n  padding: 8px 12px;\n  background: #0f172a;\n  border: 1px solid #334155;\n  border-radius: 6px;\n  color: white;\n  box-sizing: border-box;\n}\n.palette-categories {\n  flex: 1;\n  overflow-y: auto;\n  padding: 12px;\n}\n.category-group {\n  margin-bottom: 16px;\n}\n.category-title {\n  font-size: 13px;\n  font-weight: 600;\n  color: #cbd5e1;\n  margin-bottom: 8px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  display: inline-block;\n}\n.trigger-dot {\n  background: #f59e0b;\n}\n.activity-dot {\n  background: #3b82f6;\n}\n.activity-card {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px;\n  background: #0f172a;\n  border: 1px solid #334155;\n  border-radius: 8px;\n  margin-bottom: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.activity-card:hover {\n  border-color: #3b82f6;\n  background: #1e293b;\n  transform: translateX(2px);\n}\n.card-icon {\n  font-size: 18px;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n  background: #334155;\n}\n.canvas-area {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  background: #090d16;\n  position: relative;\n}\n.canvas-toolbar {\n  padding: 10px 16px;\n  background: #0f172a;\n  border-bottom: 1px solid #334155;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.canvas-stat {\n  font-size: 13px;\n  color: #94a3b8;\n}\n.btn-text {\n  background: none;\n  border: none;\n  color: #ef4444;\n  cursor: pointer;\n  font-size: 13px;\n  margin-left: auto;\n}\n.canvas-grid {\n  flex: 1;\n  position: relative;\n  overflow: auto;\n  background-image: radial-gradient(#334155 1px, transparent 1px);\n  background-size: 20px 20px;\n}\n.svg-connections-layer {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n.designer-node {\n  position: absolute;\n  width: 180px;\n  background: #1e293b;\n  border: 2px solid #334155;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n  cursor: pointer;\n  transition: border-color 0.2s;\n}\n.designer-node.selected {\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);\n}\n.designer-node.trigger-node {\n  border-left: 4px solid #f59e0b;\n}\n.node-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 6px 8px;\n  background: #0f172a;\n  border-bottom: 1px solid #334155;\n}\n.node-type-badge {\n  font-size: 10px;\n  text-transform: uppercase;\n  color: #94a3b8;\n}\n.btn-close {\n  background: none;\n  border: none;\n  color: #94a3b8;\n  cursor: pointer;\n  font-size: 14px;\n}\n.node-body {\n  padding: 10px;\n}\n.node-title {\n  font-size: 13px;\n  font-weight: 600;\n  color: #f8fafc;\n}\n.node-sub {\n  font-size: 11px;\n  color: #64748b;\n  margin-top: 2px;\n}\n.node-footer {\n  padding: 6px;\n  border-top: 1px solid #334155;\n  text-align: center;\n}\n.btn-connect {\n  background: #334155;\n  border: none;\n  color: #93c5fd;\n  font-size: 11px;\n  padding: 4px 8px;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.right-panel {\n  width: 340px;\n  background: #1e293b;\n  border-left: 1px solid #334155;\n  display: flex;\n  flex-direction: column;\n}\n.panel-tabs {\n  display: flex;\n  border-bottom: 1px solid #334155;\n}\n.panel-tabs button {\n  flex: 1;\n  padding: 12px;\n  background: #0f172a;\n  border: none;\n  color: #94a3b8;\n  cursor: pointer;\n  font-weight: 600;\n}\n.panel-tabs button.active {\n  background: #1e293b;\n  color: #3b82f6;\n  border-bottom: 2px solid #3b82f6;\n}\n.panel-content {\n  padding: 16px;\n  overflow-y: auto;\n  flex: 1;\n}\n.form-group {\n  margin-bottom: 14px;\n}\n.form-group label {\n  display: block;\n  font-size: 12px;\n  color: #cbd5e1;\n  margin-bottom: 4px;\n}\n.form-control {\n  width: 100%;\n  padding: 8px;\n  background: #0f172a;\n  border: 1px solid #334155;\n  border-radius: 6px;\n  color: white;\n  box-sizing: border-box;\n}\n.empty-state {\n  text-align: center;\n  color: #64748b;\n  margin-top: 40px;\n  font-size: 13px;\n}\n.status-badge {\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-weight: 600;\n  font-size: 12px;\n}\n.status-badge.completed {\n  background: #10b981;\n  color: white;\n}\n.log-item {\n  background: #0f172a;\n  padding: 10px;\n  border-radius: 6px;\n  margin-bottom: 8px;\n  font-size: 12px;\n  border-left: 3px solid #3b82f6;\n}\n.log-time {\n  color: #64748b;\n  font-size: 11px;\n}\n.log-name {\n  font-weight: 600;\n  color: #e2e8f0;\n  margin: 2px 0;\n}\n.log-msg {\n  color: #94a3b8;\n}\n/*# sourceMappingURL=bpnm-workflow-designer.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BpnmWorkflowDesignerComponent, { className: "BpnmWorkflowDesignerComponent", filePath: "projects/tot/elsa-bpnm-workflow/src/lib/components/bpnm-workflow-designer/bpnm-workflow-designer.component.ts", lineNumber: 436 });
})();

// projects/tot/elsa-bpnm-workflow/src/lib/components/bpnm-workflow-dashboard/bpnm-workflow-dashboard.component.ts
var _c02 = (a0, a1, a2) => ({ "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30": a0, "bg-blue-500/20 text-blue-400 border border-blue-500/30": a1, "bg-rose-500/20 text-rose-400 border border-rose-500/30": a2 });
function BpnmWorkflowDashboardComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "div", 15)(2, "div", 16)(3, "span", 17);
    \u0275\u0275text(4, "T\u1ED5ng Quy tr\xECnh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 18);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 19);
    \u0275\u0275element(7, "path", 20);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 21);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 22);
    \u0275\u0275text(11, "Definitions kh\u1EA3 d\u1EE5ng trong h\u1EC7 th\u1ED1ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 15)(13, "div", 16)(14, "span", 17);
    \u0275\u0275text(15, "Phi\xEAn \u0110ang Ch\u1EA1y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(17, "svg", 19);
    \u0275\u0275element(18, "path", 24);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(19, "div", 25);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p", 22);
    \u0275\u0275text(22, "Ti\u1EBFn tr\xECnh Active \u0111ang th\u1EF1c thi");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 15)(24, "div", 16)(25, "span", 17);
    \u0275\u0275text(26, "Ch\u1EDD Ph\xEA Duy\u1EC7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 26);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(28, "svg", 19);
    \u0275\u0275element(29, "path", 12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(30, "div", 27);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p", 22);
    \u0275\u0275text(33, "User Tasks c\u1EA7n ph\xEA duy\u1EC7t");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 15)(35, "div", 16)(36, "span", 17);
    \u0275\u0275text(37, "T\u1EC9 L\u1EC7 Th\xE0nh C\xF4ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 28);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(39, "svg", 19);
    \u0275\u0275element(40, "path", 29);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(41, "div", 30);
    \u0275\u0275text(42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "p", 22);
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r0.stats.totalDefinitions);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r0.stats.runningInstances);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r0.stats.pendingUserTasks);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1("", ctx_r0.stats.successRate, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Ho\xE0n th\xE0nh: ", ctx_r0.stats.completedInstances, " / L\u1ED7i: ", ctx_r0.stats.failedInstances);
  }
}
function BpnmWorkflowDashboardComponent_div_17_tr_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 37)(1, "td", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 39);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 40);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 34)(9, "span", 41);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 42);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r2.workflowName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 6, item_r2.startedAt, "medium"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(9, _c02, item_r2.status === "Completed", item_r2.status === "Running", item_r2.status === "Failed"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (item_r2.executionLogs == null ? null : item_r2.executionLogs.length) || 0, " steps ");
  }
}
function BpnmWorkflowDashboardComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "table", 32)(2, "thead", 33)(3, "tr")(4, "th", 34);
    \u0275\u0275text(5, "Instance ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 34);
    \u0275\u0275text(7, "T\xEAn Quy Tr\xECnh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 34);
    \u0275\u0275text(9, "Th\u1EDDi Gian B\u1EAFt \u0110\u1EA7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 34);
    \u0275\u0275text(11, "Tr\u1EA1ng Th\xE1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 34);
    \u0275\u0275text(13, "S\u1ED1 Node Th\u1EF1c Thi");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody", 35);
    \u0275\u0275template(15, BpnmWorkflowDashboardComponent_div_17_tr_15_Template, 13, 13, "tr", 36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r0.stats == null ? null : ctx_r0.stats.recentExecutions);
  }
}
function BpnmWorkflowDashboardComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275text(1, " Ch\u01B0a c\xF3 l\u1ECBch s\u1EED phi\xEAn ch\u1EA1y quy tr\xECnh n\xE0o g\u1EA7n \u0111\xE2y. H\xE3y kh\u1EDFi t\u1EA1o quy tr\xECnh t\u1EA1i m\u1EE5c Tr\xECnh Thi\u1EBFt K\u1EBF. ");
    \u0275\u0275elementEnd();
  }
}
var _BpnmWorkflowDashboardComponent = class _BpnmWorkflowDashboardComponent {
  constructor() {
    this.workflowService = inject(ElsaWorkflowService);
    this.stats = null;
  }
  ngOnInit() {
    this.loadStats();
  }
  loadStats() {
    this.workflowService.getDashboardStats().subscribe({
      next: (res) => this.stats = res,
      error: (err) => console.error("Failed to load dashboard stats:", err)
    });
  }
};
_BpnmWorkflowDashboardComponent.\u0275fac = function BpnmWorkflowDashboardComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BpnmWorkflowDashboardComponent)();
};
_BpnmWorkflowDashboardComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BpnmWorkflowDashboardComponent, selectors: [["tot-bpnm-workflow-dashboard"]], decls: 20, vars: 3, consts: [["noExecutions", ""], [1, "p-6", "space-y-6", "bg-slate-900", "text-white", "min-h-screen"], [1, "flex", "items-center", "justify-between", "border-b", "border-slate-800", "pb-4"], [1, "text-2xl", "font-bold", "text-transparent", "bg-clip-text", "bg-gradient-to-r", "from-blue-400", "to-indigo-300"], [1, "text-sm", "text-slate-400", "mt-1"], [1, "px-4", "py-2", "bg-blue-600", "hover:bg-blue-500", "text-white", "text-sm", "font-medium", "rounded-lg", "shadow", "flex", "items-center", "gap-2", "transition", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"], ["class", "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5", 4, "ngIf"], [1, "bg-slate-800/70", "border", "border-slate-700/60", "rounded-xl", "p-6", "shadow-xl"], [1, "text-lg", "font-semibold", "text-white", "mb-4", "flex", "items-center", "gap-2"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-blue-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"], ["class", "overflow-x-auto", 4, "ngIf", "ngIfElse"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-4", "gap-5"], [1, "bg-slate-800/80", "border", "border-slate-700/60", "rounded-xl", "p-5", "shadow-lg"], [1, "flex", "items-center", "justify-between"], [1, "text-xs", "uppercase", "font-semibold", "text-slate-400", "tracking-wider"], [1, "p-2", "bg-blue-500/10", "text-blue-400", "rounded-lg"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"], [1, "mt-3", "text-3xl", "font-extrabold", "text-white"], [1, "text-xs", "text-slate-400", "mt-1"], [1, "p-2", "bg-emerald-500/10", "text-emerald-400", "rounded-lg"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 10V3L4 14h7v7l9-11h-7z"], [1, "mt-3", "text-3xl", "font-extrabold", "text-emerald-400"], [1, "p-2", "bg-amber-500/10", "text-amber-400", "rounded-lg"], [1, "mt-3", "text-3xl", "font-extrabold", "text-amber-400"], [1, "p-2", "bg-indigo-500/10", "text-indigo-400", "rounded-lg"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "mt-3", "text-3xl", "font-extrabold", "text-indigo-300"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "text-sm", "text-slate-300"], [1, "bg-slate-900/80", "text-xs", "uppercase", "text-slate-400", "border-b", "border-slate-700"], [1, "px-4", "py-3"], [1, "divide-y", "divide-slate-800"], ["class", "hover:bg-slate-700/40 transition", 4, "ngFor", "ngForOf"], [1, "hover:bg-slate-700/40", "transition"], [1, "px-4", "py-3", "font-mono", "text-xs", "text-blue-400"], [1, "px-4", "py-3", "font-medium", "text-white"], [1, "px-4", "py-3", "text-slate-400", "text-xs"], [1, "px-2.5", "py-1", "rounded-full", "text-xs", "font-semibold", 3, "ngClass"], [1, "px-4", "py-3", "text-xs", "text-slate-300"], [1, "text-center", "py-8", "text-slate-400", "text-sm"]], template: function BpnmWorkflowDashboardComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h2", 3);
    \u0275\u0275text(4, " \u{1F4CA} Workflow Dashboard & System Telemetry ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 4);
    \u0275\u0275text(6, " T\u1ED5ng quan hi\u1EC7u n\u0103ng th\u1EF1c thi quy tr\xECnh Elsa BPMN, th\u1ED1ng k\xEA phi\xEAn ch\u1EA1y v\xE0 c\xF4ng vi\u1EC7c ch\u1EDD ph\xEA duy\u1EC7t. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 5);
    \u0275\u0275listener("click", function BpnmWorkflowDashboardComponent_Template_button_click_7_listener() {
      return ctx.loadStats();
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 6);
    \u0275\u0275element(9, "path", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " L\xE0m m\u1EDBi s\u1ED1 li\u1EC7u ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, BpnmWorkflowDashboardComponent_div_11_Template, 45, 6, "div", 8);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(12, "div", 9)(13, "h3", 10);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 11);
    \u0275\u0275element(15, "path", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275text(16, " L\u1ECBch S\u1EED Phi\xEAn Ch\u1EA1y G\u1EA7n \u0110\xE2y (Recent Executions Audit) ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, BpnmWorkflowDashboardComponent_div_17_Template, 16, 1, "div", 13)(18, BpnmWorkflowDashboardComponent_ng_template_18_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const noExecutions_r3 = \u0275\u0275reference(19);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", ctx.stats);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.stats == null ? null : ctx.stats.recentExecutions == null ? null : ctx.stats.recentExecutions.length)("ngIfElse", noExecutions_r3);
  }
}, dependencies: [CommonModule, NgClass, NgForOf, NgIf, DatePipe], encapsulation: 2 });
var BpnmWorkflowDashboardComponent = _BpnmWorkflowDashboardComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BpnmWorkflowDashboardComponent, [{
    type: Component,
    args: [{
      selector: "tot-bpnm-workflow-dashboard",
      standalone: true,
      imports: [CommonModule],
      template: `
    <div class="p-6 space-y-6 bg-slate-900 text-white min-h-screen">
      <!-- Top Title -->
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
            \u{1F4CA} Workflow Dashboard & System Telemetry
          </h2>
          <p class="text-sm text-slate-400 mt-1">
            T\u1ED5ng quan hi\u1EC7u n\u0103ng th\u1EF1c thi quy tr\xECnh Elsa BPMN, th\u1ED1ng k\xEA phi\xEAn ch\u1EA1y v\xE0 c\xF4ng vi\u1EC7c ch\u1EDD ph\xEA duy\u1EC7t.
          </p>
        </div>
        <button 
          (click)="loadStats()"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg shadow flex items-center gap-2 transition"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          L\xE0m m\u1EDBi s\u1ED1 li\u1EC7u
        </button>
      </div>

      <!-- Key Stat Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" *ngIf="stats">
        <div class="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 shadow-lg">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase font-semibold text-slate-400 tracking-wider">T\u1ED5ng Quy tr\xECnh</span>
            <div class="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            </div>
          </div>
          <div class="mt-3 text-3xl font-extrabold text-white">{{ stats.totalDefinitions }}</div>
          <p class="text-xs text-slate-400 mt-1">Definitions kh\u1EA3 d\u1EE5ng trong h\u1EC7 th\u1ED1ng</p>
        </div>

        <div class="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 shadow-lg">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase font-semibold text-slate-400 tracking-wider">Phi\xEAn \u0110ang Ch\u1EA1y</span>
            <div class="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
          </div>
          <div class="mt-3 text-3xl font-extrabold text-emerald-400">{{ stats.runningInstances }}</div>
          <p class="text-xs text-slate-400 mt-1">Ti\u1EBFn tr\xECnh Active \u0111ang th\u1EF1c thi</p>
        </div>

        <div class="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 shadow-lg">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase font-semibold text-slate-400 tracking-wider">Ch\u1EDD Ph\xEA Duy\u1EC7t</span>
            <div class="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
          </div>
          <div class="mt-3 text-3xl font-extrabold text-amber-400">{{ stats.pendingUserTasks }}</div>
          <p class="text-xs text-slate-400 mt-1">User Tasks c\u1EA7n ph\xEA duy\u1EC7t</p>
        </div>

        <div class="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 shadow-lg">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase font-semibold text-slate-400 tracking-wider">T\u1EC9 L\u1EC7 Th\xE0nh C\xF4ng</span>
            <div class="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
          </div>
          <div class="mt-3 text-3xl font-extrabold text-indigo-300">{{ stats.successRate }}%</div>
          <p class="text-xs text-slate-400 mt-1">Ho\xE0n th\xE0nh: {{ stats.completedInstances }} / L\u1ED7i: {{ stats.failedInstances }}</p>
        </div>
      </div>

      <!-- Recent Executions Section -->
      <div class="bg-slate-800/70 border border-slate-700/60 rounded-xl p-6 shadow-xl">
        <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          L\u1ECBch S\u1EED Phi\xEAn Ch\u1EA1y G\u1EA7n \u0110\xE2y (Recent Executions Audit)
        </h3>

        <div class="overflow-x-auto" *ngIf="stats?.recentExecutions?.length; else noExecutions">
          <table class="w-full text-left text-sm text-slate-300">
            <thead class="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th class="px-4 py-3">Instance ID</th>
                <th class="px-4 py-3">T\xEAn Quy Tr\xECnh</th>
                <th class="px-4 py-3">Th\u1EDDi Gian B\u1EAFt \u0110\u1EA7u</th>
                <th class="px-4 py-3">Tr\u1EA1ng Th\xE1i</th>
                <th class="px-4 py-3">S\u1ED1 Node Th\u1EF1c Thi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              <tr *ngFor="let item of stats?.recentExecutions" class="hover:bg-slate-700/40 transition">
                <td class="px-4 py-3 font-mono text-xs text-blue-400">{{ item.id }}</td>
                <td class="px-4 py-3 font-medium text-white">{{ item.workflowName }}</td>
                <td class="px-4 py-3 text-slate-400 text-xs">{{ item.startedAt | date:'medium' }}</td>
                <td class="px-4 py-3">
                  <span 
                    class="px-2.5 py-1 rounded-full text-xs font-semibold"
                    [ngClass]="{
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30': item.status === 'Completed',
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30': item.status === 'Running',
                      'bg-rose-500/20 text-rose-400 border border-rose-500/30': item.status === 'Failed'
                    }"
                  >
                    {{ item.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-xs text-slate-300">
                  {{ item.executionLogs?.length || 0 }} steps
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ng-template #noExecutions>
          <div class="text-center py-8 text-slate-400 text-sm">
            Ch\u01B0a c\xF3 l\u1ECBch s\u1EED phi\xEAn ch\u1EA1y quy tr\xECnh n\xE0o g\u1EA7n \u0111\xE2y. H\xE3y kh\u1EDFi t\u1EA1o quy tr\xECnh t\u1EA1i m\u1EE5c Tr\xECnh Thi\u1EBFt K\u1EBF.
          </div>
        </ng-template>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BpnmWorkflowDashboardComponent, { className: "BpnmWorkflowDashboardComponent", filePath: "projects/tot/elsa-bpnm-workflow/src/lib/components/bpnm-workflow-dashboard/bpnm-workflow-dashboard.component.ts", lineNumber: 131 });
})();

// projects/tot/elsa-bpnm-workflow/src/lib/components/bpnm-user-tasks/bpnm-user-tasks.component.ts
var _c03 = (a0, a1, a2) => ({ "bg-amber-500/20 text-amber-300 border border-amber-500/30": a0, "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30": a1, "bg-rose-500/20 text-rose-300 border border-rose-500/30": a2 });
function BpnmUserTasksComponent_div_11_div_1_div_11_div_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "span", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 25);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const key_r1 = ctx.$implicit;
    const task_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", key_r1, ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(task_r2.taskPayload[key_r1]);
  }
}
function BpnmUserTasksComponent_div_11_div_1_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "div", 21);
    \u0275\u0275text(2, "D\u1EEF Li\u1EC7u Chi Ti\u1EBFt (Task Payload):");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, BpnmUserTasksComponent_div_11_div_1_div_11_div_3_Template, 5, 2, "div", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.getKeys(task_r2.taskPayload));
  }
}
function BpnmUserTasksComponent_div_11_div_1_div_12_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("X\u1EED l\xFD l\xFAc: ", \u0275\u0275pipeBind2(2, 1, task_r2.completedAt, "medium"));
  }
}
function BpnmUserTasksComponent_div_11_div_1_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "span", 27);
    \u0275\u0275text(2, "L\xFD do quy\u1EBFt \u0111\u1ECBnh:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275template(4, BpnmUserTasksComponent_div_11_div_1_div_12_div_4_Template, 3, 4, "div", 28);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngClass", task_r2.status === "Approved" ? "bg-emerald-950/30 border-emerald-800/40 text-emerald-200" : "bg-rose-950/30 border-rose-800/40 text-rose-200");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", task_r2.decisionReason || "Kh\xF4ng c\xF3 ghi ch\xFA", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", task_r2.completedAt);
  }
}
function BpnmUserTasksComponent_div_11_div_1_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function BpnmUserTasksComponent_div_11_div_1_div_13_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      const task_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r2.taskReasons[task_r2.id], $event) || (ctx_r2.taskReasons[task_r2.id] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 32)(3, "button", 33);
    \u0275\u0275listener("click", function BpnmUserTasksComponent_div_11_div_1_div_13_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const task_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onApprove(task_r2.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 6);
    \u0275\u0275element(5, "path", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Ph\xEA Duy\u1EC7t (Approve) ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "button", 35);
    \u0275\u0275listener("click", function BpnmUserTasksComponent_div_11_div_1_div_13_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const task_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onReject(task_r2.id));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 6);
    \u0275\u0275element(9, "path", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " T\u1EEB Ch\u1ED1i (Reject) ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const task_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.taskReasons[task_r2.id]);
  }
}
function BpnmUserTasksComponent_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div")(2, "div", 12)(3, "span", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 14);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "h3", 15);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 16);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, BpnmUserTasksComponent_div_11_div_1_div_11_Template, 4, 1, "div", 17)(12, BpnmUserTasksComponent_div_11_div_1_div_12_Template, 5, 3, "div", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275template(13, BpnmUserTasksComponent_div_11_div_1_div_13_Template, 11, 1, "div", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r2 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(task_r2.workflowName);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(8, _c03, task_r2.status === "Pending", task_r2.status === "Approved", task_r2.status === "Rejected"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", task_r2.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(task_r2.taskName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", task_r2.description, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", task_r2.taskPayload);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", task_r2.status !== "Pending");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", task_r2.status === "Pending");
  }
}
function BpnmUserTasksComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275template(1, BpnmUserTasksComponent_div_11_div_1_Template, 14, 12, "div", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.tasks);
  }
}
function BpnmUserTasksComponent_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 38);
    \u0275\u0275element(2, "path", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 40);
    \u0275\u0275text(4, "Hi\u1EC7n t\u1EA1i kh\xF4ng c\xF3 t\xE1c v\u1EE5 c\xF4ng vi\u1EC7c n\xE0o ch\u1EDD ph\xEA duy\u1EC7t.");
    \u0275\u0275elementEnd()();
  }
}
var _BpnmUserTasksComponent = class _BpnmUserTasksComponent {
  constructor() {
    this.workflowService = inject(ElsaWorkflowService);
    this.tasks = [];
    this.taskReasons = {};
  }
  ngOnInit() {
    this.loadUserTasks();
  }
  loadUserTasks() {
    this.workflowService.getUserTasks().subscribe({
      next: (res) => this.tasks = res,
      error: (err) => console.error("Failed to load user tasks:", err)
    });
  }
  getKeys(obj) {
    return obj ? Object.keys(obj) : [];
  }
  onApprove(taskId) {
    const reason = this.taskReasons[taskId] || "\u0110\xE3 ph\xEA duy\u1EC7t th\xF4ng qua Form UI";
    this.workflowService.approveUserTask(taskId, reason).subscribe({
      next: () => {
        this.loadUserTasks();
      },
      error: (err) => console.error("Approve failed:", err)
    });
  }
  onReject(taskId) {
    const reason = this.taskReasons[taskId] || "\u0110\xE3 t\u1EEB ch\u1ED1i th\xF4ng qua Form UI";
    this.workflowService.rejectUserTask(taskId, reason).subscribe({
      next: () => {
        this.loadUserTasks();
      },
      error: (err) => console.error("Reject failed:", err)
    });
  }
};
_BpnmUserTasksComponent.\u0275fac = function BpnmUserTasksComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BpnmUserTasksComponent)();
};
_BpnmUserTasksComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BpnmUserTasksComponent, selectors: [["tot-bpnm-user-tasks"]], decls: 14, vars: 2, consts: [["emptyTasks", ""], [1, "p-6", "space-y-6", "bg-slate-900", "text-white", "min-h-screen"], [1, "flex", "items-center", "justify-between", "border-b", "border-slate-800", "pb-4"], [1, "text-2xl", "font-bold", "text-transparent", "bg-clip-text", "bg-gradient-to-r", "from-emerald-400", "to-teal-300"], [1, "text-sm", "text-slate-400", "mt-1"], [1, "px-4", "py-2", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "text-sm", "font-medium", "rounded-lg", "shadow", "transition", "flex", "items-center", "gap-2", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"], ["class", "grid grid-cols-1 lg:grid-cols-2 gap-6", 4, "ngIf", "ngIfElse"], [1, "grid", "grid-cols-1", "lg:grid-cols-2", "gap-6"], ["class", "bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between transition hover:border-slate-600", 4, "ngFor", "ngForOf"], [1, "bg-slate-800/90", "border", "border-slate-700", "rounded-xl", "p-5", "shadow-lg", "flex", "flex-col", "justify-between", "transition", "hover:border-slate-600"], [1, "flex", "items-center", "justify-between", "border-b", "border-slate-700/60", "pb-3", "mb-3"], [1, "text-xs", "font-semibold", "text-teal-400", "uppercase", "tracking-wide"], [1, "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-bold", 3, "ngClass"], [1, "text-base", "font-bold", "text-white", "mb-2"], [1, "text-xs", "text-slate-300", "mb-4", "leading-relaxed", "bg-slate-900/50", "p-3", "rounded-lg", "border", "border-slate-800"], ["class", "mb-4 text-xs space-y-1 bg-slate-950/60 p-3 rounded-lg border border-slate-800", 4, "ngIf"], ["class", "mb-4 text-xs p-3 rounded-lg border", 3, "ngClass", 4, "ngIf"], ["class", "mt-4 pt-3 border-t border-slate-700/60 space-y-3", 4, "ngIf"], [1, "mb-4", "text-xs", "space-y-1", "bg-slate-950/60", "p-3", "rounded-lg", "border", "border-slate-800"], [1, "font-semibold", "text-slate-400", "mb-1", "uppercase", "tracking-wider", "text-[10px]"], ["class", "flex justify-between py-0.5 border-b border-slate-800/40 last:border-none", 4, "ngFor", "ngForOf"], [1, "flex", "justify-between", "py-0.5", "border-b", "border-slate-800/40", "last:border-none"], [1, "text-slate-400", "font-mono"], [1, "text-slate-200", "font-medium"], [1, "mb-4", "text-xs", "p-3", "rounded-lg", "border", 3, "ngClass"], [1, "font-semibold"], ["class", "text-[10px] text-slate-400 mt-1", 4, "ngIf"], [1, "text-[10px]", "text-slate-400", "mt-1"], [1, "mt-4", "pt-3", "border-t", "border-slate-700/60", "space-y-3"], ["type", "text", "placeholder", "Nh\u1EADp ghi ch\xFA / l\xFD do ph\xEA duy\u1EC7t ho\u1EB7c t\u1EEB ch\u1ED1i...", 1, "w-full", "bg-slate-900", "border", "border-slate-700", "rounded-lg", "px-3", "py-2", "text-xs", "text-white", "placeholder-slate-500", "focus:outline-none", "focus:border-emerald-500", 3, "ngModelChange", "ngModel"], [1, "flex", "items-center", "gap-3"], [1, "flex-1", "px-4", "py-2", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "font-semibold", "text-xs", "rounded-lg", "shadow", "transition", "flex", "items-center", "justify-center", "gap-1.5", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"], [1, "flex-1", "px-4", "py-2", "bg-rose-600", "hover:bg-rose-500", "text-white", "font-semibold", "text-xs", "rounded-lg", "shadow", "transition", "flex", "items-center", "justify-center", "gap-1.5", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "text-center", "py-16", "bg-slate-800/40", "rounded-xl", "border", "border-slate-800"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-12", "h-12", "text-slate-500", "mx-auto", "mb-3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "text-slate-400", "font-medium", "text-sm"]], template: function BpnmUserTasksComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div")(3, "h2", 3);
    \u0275\u0275text(4, " \u2705 C\xF4ng Vi\u1EC7c & Form Ph\xEA Duy\u1EC7t T\xE1c V\u1EE5 (User Tasks & Approval UI) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 4);
    \u0275\u0275text(6, " Danh s\xE1ch t\xE1c v\u1EE5 c\u1EA7n ng\u01B0\u1EDDi d\xF9ng duy\u1EC7t (Approve / Reject) trong c\xE1c quy tr\xECnh Elsa BPMN Workflow \u0111ang ch\u1EDD. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 5);
    \u0275\u0275listener("click", function BpnmUserTasksComponent_Template_button_click_7_listener() {
      return ctx.loadUserTasks();
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 6);
    \u0275\u0275element(9, "path", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " L\xE0m m\u1EDBi danh s\xE1ch ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, BpnmUserTasksComponent_div_11_Template, 2, 1, "div", 8)(12, BpnmUserTasksComponent_ng_template_12_Template, 5, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const emptyTasks_r5 = \u0275\u0275reference(13);
    \u0275\u0275advance(11);
    \u0275\u0275property("ngIf", ctx.tasks.length)("ngIfElse", emptyTasks_r5);
  }
}, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, DatePipe], encapsulation: 2 });
var BpnmUserTasksComponent = _BpnmUserTasksComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BpnmUserTasksComponent, [{
    type: Component,
    args: [{
      selector: "tot-bpnm-user-tasks",
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: `
    <div class="p-6 space-y-6 bg-slate-900 text-white min-h-screen">
      <!-- Title Bar -->
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            \u2705 C\xF4ng Vi\u1EC7c & Form Ph\xEA Duy\u1EC7t T\xE1c V\u1EE5 (User Tasks & Approval UI)
          </h2>
          <p class="text-sm text-slate-400 mt-1">
            Danh s\xE1ch t\xE1c v\u1EE5 c\u1EA7n ng\u01B0\u1EDDi d\xF9ng duy\u1EC7t (Approve / Reject) trong c\xE1c quy tr\xECnh Elsa BPMN Workflow \u0111ang ch\u1EDD.
          </p>
        </div>
        <button 
          (click)="loadUserTasks()"
          class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg shadow transition flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          L\xE0m m\u1EDBi danh s\xE1ch
        </button>
      </div>

      <!-- Task Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" *ngIf="tasks.length; else emptyTasks">
        <div 
          *ngFor="let task of tasks"
          class="bg-slate-800/90 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between transition hover:border-slate-600"
        >
          <div>
            <!-- Header -->
            <div class="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-3">
              <span class="text-xs font-semibold text-teal-400 uppercase tracking-wide">{{ task.workflowName }}</span>
              <span 
                class="px-2.5 py-0.5 rounded-full text-xs font-bold"
                [ngClass]="{
                  'bg-amber-500/20 text-amber-300 border border-amber-500/30': task.status === 'Pending',
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30': task.status === 'Approved',
                  'bg-rose-500/20 text-rose-300 border border-rose-500/30': task.status === 'Rejected'
                }"
              >
                {{ task.status }}
              </span>
            </div>

            <h3 class="text-base font-bold text-white mb-2">{{ task.taskName }}</h3>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              {{ task.description }}
            </p>

            <!-- Payload Details -->
            <div *ngIf="task.taskPayload" class="mb-4 text-xs space-y-1 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <div class="font-semibold text-slate-400 mb-1 uppercase tracking-wider text-[10px]">D\u1EEF Li\u1EC7u Chi Ti\u1EBFt (Task Payload):</div>
              <div *ngFor="let key of getKeys(task.taskPayload)" class="flex justify-between py-0.5 border-b border-slate-800/40 last:border-none">
                <span class="text-slate-400 font-mono">{{ key }}:</span>
                <span class="text-slate-200 font-medium">{{ task.taskPayload[key] }}</span>
              </div>
            </div>

            <!-- Decision Reason if completed -->
            <div *ngIf="task.status !== 'Pending'" class="mb-4 text-xs p-3 rounded-lg border" [ngClass]="task.status === 'Approved' ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200' : 'bg-rose-950/30 border-rose-800/40 text-rose-200'">
              <span class="font-semibold">L\xFD do quy\u1EBFt \u0111\u1ECBnh:</span> {{ task.decisionReason || 'Kh\xF4ng c\xF3 ghi ch\xFA' }}
              <div class="text-[10px] text-slate-400 mt-1" *ngIf="task.completedAt">X\u1EED l\xFD l\xFAc: {{ task.completedAt | date:'medium' }}</div>
            </div>
          </div>

          <!-- Actions Form (for Pending tasks) -->
          <div *ngIf="task.status === 'Pending'" class="mt-4 pt-3 border-t border-slate-700/60 space-y-3">
            <input 
              type="text" 
              [(ngModel)]="taskReasons[task.id]" 
              placeholder="Nh\u1EADp ghi ch\xFA / l\xFD do ph\xEA duy\u1EC7t ho\u1EB7c t\u1EEB ch\u1ED1i..."
              class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <div class="flex items-center gap-3">
              <button 
                (click)="onApprove(task.id)"
                class="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg shadow transition flex items-center justify-center gap-1.5"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Ph\xEA Duy\u1EC7t (Approve)
              </button>
              <button 
                (click)="onReject(task.id)"
                class="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-lg shadow transition flex items-center justify-center gap-1.5"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                T\u1EEB Ch\u1ED1i (Reject)
              </button>
            </div>
          </div>
        </div>
      </div>

      <ng-template #emptyTasks>
        <div class="text-center py-16 bg-slate-800/40 rounded-xl border border-slate-800">
          <svg class="w-12 h-12 text-slate-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <p class="text-slate-400 font-medium text-sm">Hi\u1EC7n t\u1EA1i kh\xF4ng c\xF3 t\xE1c v\u1EE5 c\xF4ng vi\u1EC7c n\xE0o ch\u1EDD ph\xEA duy\u1EC7t.</p>
        </div>
      </ng-template>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BpnmUserTasksComponent, { className: "BpnmUserTasksComponent", filePath: "projects/tot/elsa-bpnm-workflow/src/lib/components/bpnm-user-tasks/bpnm-user-tasks.component.ts", lineNumber: 111 });
})();

// projects/tot/elsa-bpnm-workflow/src/lib/components/bpnm-workflow-admin/bpnm-workflow-admin.component.ts
var _c04 = (a0, a1, a2) => ({ "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30": a0, "bg-blue-500/20 text-blue-300 border border-blue-500/30": a1, "bg-rose-500/20 text-rose-300 border border-rose-500/30": a2 });
function BpnmWorkflowAdminComponent_div_16_tr_17_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const def_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(def_r2.description);
  }
}
function BpnmWorkflowAdminComponent_div_16_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 23)(1, "td", 24);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 25);
    \u0275\u0275text(4);
    \u0275\u0275template(5, BpnmWorkflowAdminComponent_div_16_tr_17_div_5_Template, 2, 1, "div", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 27)(7, "span", 28);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 29);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 19)(12, "span", 30);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td", 20)(15, "button", 31);
    \u0275\u0275listener("click", function BpnmWorkflowAdminComponent_div_16_tr_17_Template_button_click_15_listener() {
      const def_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onDeleteDefinition(def_r2.id));
    });
    \u0275\u0275text(16, " X\xF3a ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const def_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(def_r2.definitionId || def_r2.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", def_r2.name, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", def_r2.description);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("v", def_r2.version);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", (def_r2.nodes == null ? null : def_r2.nodes.length) || 0, " nodes");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", def_r2.isPublished ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-slate-700 text-slate-400");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", def_r2.isPublished ? "Published" : "Draft", " ");
  }
}
function BpnmWorkflowAdminComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "table", 17)(2, "thead", 18)(3, "tr")(4, "th", 19);
    \u0275\u0275text(5, "ID / Definition");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 19);
    \u0275\u0275text(7, "T\xEAn Quy Tr\xECnh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 19);
    \u0275\u0275text(9, "Phi\xEAn B\u1EA3n (Version)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 19);
    \u0275\u0275text(11, "S\u1ED1 L\u01B0\u1EE3ng Nodes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 19);
    \u0275\u0275text(13, "Tr\u1EA1ng Th\xE1i K\xEDch Ho\u1EA1t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 20);
    \u0275\u0275text(15, "Thao T\xE1c");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody", 21);
    \u0275\u0275template(17, BpnmWorkflowAdminComponent_div_16_tr_17_Template, 17, 7, "tr", 22);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275property("ngForOf", ctx_r2.definitions);
  }
}
function BpnmWorkflowAdminComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1, "Ch\u01B0a c\xF3 Workflow Definition n\xE0o.");
    \u0275\u0275elementEnd();
  }
}
function BpnmWorkflowAdminComponent_div_24_ng_container_17_tr_18_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "span", 46);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 47);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 48);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 49);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("[", \u0275\u0275pipeBind2(3, 5, log_r6.timestamp, "HH:mm:ss"), "]");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", log_r6.nodeName, " (", log_r6.activityType, "):");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(log_r6.message);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(log_r6.status);
  }
}
function BpnmWorkflowAdminComponent_div_24_ng_container_17_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 39)(1, "td", 40)(2, "div", 41)(3, "div", 42);
    \u0275\u0275text(4, "Chi ti\u1EBFt Execution Logs (Audit Trail):");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 43);
    \u0275\u0275template(6, BpnmWorkflowAdminComponent_div_24_ng_container_17_tr_18_div_6_Template, 10, 8, "div", 44);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const inst_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", inst_r5.executionLogs);
  }
}
function BpnmWorkflowAdminComponent_div_24_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "tr", 23)(2, "td", 35);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 36);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 36);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 19)(13, "span", 30);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 20)(16, "button", 37);
    \u0275\u0275listener("click", function BpnmWorkflowAdminComponent_div_24_ng_container_17_Template_button_click_16_listener() {
      const inst_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleLog(inst_r5.id));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(18, BpnmWorkflowAdminComponent_div_24_ng_container_17_tr_18_Template, 7, 1, "tr", 38);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const inst_r5 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(inst_r5.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(inst_r5.workflowName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 8, inst_r5.startedAt, "medium"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(11, 11, inst_r5.finishedAt, "medium") || "-");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(14, _c04, inst_r5.status === "Completed", inst_r5.status === "Running", inst_r5.status === "Failed"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", inst_r5.status, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.selectedInstanceId === inst_r5.id ? "\u1EA8n Logs" : "Xem Logs", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.selectedInstanceId === inst_r5.id);
  }
}
function BpnmWorkflowAdminComponent_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "table", 17)(2, "thead", 18)(3, "tr")(4, "th", 19);
    \u0275\u0275text(5, "Instance ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 19);
    \u0275\u0275text(7, "T\xEAn Quy Tr\xECnh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 19);
    \u0275\u0275text(9, "B\u1EAFt \u0110\u1EA7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 19);
    \u0275\u0275text(11, "Ho\xE0n T\u1EA5t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 19);
    \u0275\u0275text(13, "Tr\u1EA1ng Th\xE1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 20);
    \u0275\u0275text(15, "Chi Ti\u1EBFt Log");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody", 21);
    \u0275\u0275template(17, BpnmWorkflowAdminComponent_div_24_ng_container_17_Template, 19, 18, "ng-container", 34);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275property("ngForOf", ctx_r2.instances);
  }
}
function BpnmWorkflowAdminComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1, "Ch\u01B0a c\xF3 l\u1ECBch s\u1EED phi\xEAn ch\u1EA1y quy tr\xECnh.");
    \u0275\u0275elementEnd();
  }
}
var _BpnmWorkflowAdminComponent = class _BpnmWorkflowAdminComponent {
  constructor() {
    this.workflowService = inject(ElsaWorkflowService);
    this.definitions = [];
    this.instances = [];
    this.selectedInstanceId = null;
  }
  ngOnInit() {
    this.loadAdminData();
  }
  loadAdminData() {
    this.workflowService.getDefinitions().subscribe({
      next: (res) => this.definitions = res,
      error: (err) => console.error("Failed to load definitions:", err)
    });
    this.workflowService.getInstances().subscribe({
      next: (res) => this.instances = res,
      error: (err) => console.error("Failed to load instances:", err)
    });
  }
  onDeleteDefinition(id) {
    if (confirm("B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a b\u1EA3n \u0111\u1ECBnh ngh\u0129a workflow n\xE0y kh\xF4ng?")) {
      this.workflowService.deleteDefinition(id).subscribe({
        next: () => this.loadAdminData(),
        error: (err) => console.error("Failed to delete definition:", err)
      });
    }
  }
  toggleLog(instanceId) {
    this.selectedInstanceId = this.selectedInstanceId === instanceId ? null : instanceId;
  }
};
_BpnmWorkflowAdminComponent.\u0275fac = function BpnmWorkflowAdminComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _BpnmWorkflowAdminComponent)();
};
_BpnmWorkflowAdminComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BpnmWorkflowAdminComponent, selectors: [["tot-bpnm-workflow-admin"]], decls: 27, vars: 4, consts: [["noDefinitions", ""], ["noInstances", ""], [1, "p-6", "space-y-6", "bg-slate-900", "text-white", "min-h-screen"], [1, "flex", "items-center", "justify-between", "border-b", "border-slate-800", "pb-4"], [1, "text-2xl", "font-bold", "text-transparent", "bg-clip-text", "bg-gradient-to-r", "from-purple-400", "to-pink-300"], [1, "text-sm", "text-slate-400", "mt-1"], [1, "px-4", "py-2", "bg-purple-600", "hover:bg-purple-500", "text-white", "text-sm", "font-medium", "rounded-lg", "shadow", "transition", "flex", "items-center", "gap-2", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"], [1, "bg-slate-800/80", "border", "border-slate-700", "rounded-xl", "p-6", "shadow-xl"], [1, "text-lg", "font-bold", "text-white", "mb-4", "flex", "items-center", "gap-2"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-purple-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], ["class", "overflow-x-auto", 4, "ngIf", "ngIfElse"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-pink-400"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "text-sm", "text-slate-300"], [1, "bg-slate-900/80", "text-xs", "uppercase", "text-slate-400", "border-b", "border-slate-700"], [1, "px-4", "py-3"], [1, "px-4", "py-3", "text-right"], [1, "divide-y", "divide-slate-800"], ["class", "hover:bg-slate-700/40 transition", 4, "ngFor", "ngForOf"], [1, "hover:bg-slate-700/40", "transition"], [1, "px-4", "py-3", "font-mono", "text-xs", "text-purple-300"], [1, "px-4", "py-3", "font-semibold", "text-white"], ["class", "text-xs font-normal text-slate-400 mt-0.5", 4, "ngIf"], [1, "px-4", "py-3", "text-xs"], [1, "px-2", "py-0.5", "bg-slate-700", "text-slate-300", "rounded", "font-mono"], [1, "px-4", "py-3", "text-xs", "text-slate-300"], [1, "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-bold", 3, "ngClass"], [1, "px-3", "py-1", "bg-rose-600/80", "hover:bg-rose-500", "text-white", "text-xs", "font-medium", "rounded", "transition", 3, "click"], [1, "text-xs", "font-normal", "text-slate-400", "mt-0.5"], [1, "text-center", "py-8", "text-slate-400", "text-sm"], [4, "ngFor", "ngForOf"], [1, "px-4", "py-3", "font-mono", "text-xs", "text-blue-400"], [1, "px-4", "py-3", "text-xs", "text-slate-400"], [1, "px-3", "py-1", "bg-slate-700", "hover:bg-slate-600", "text-slate-200", "text-xs", "font-medium", "rounded", "transition", 3, "click"], ["class", "bg-slate-950/70 border-b border-slate-800", 4, "ngIf"], [1, "bg-slate-950/70", "border-b", "border-slate-800"], ["colspan", "6", 1, "p-4"], [1, "space-y-2"], [1, "font-bold", "text-xs", "text-purple-300", "uppercase", "tracking-wider"], [1, "space-y-1", "font-mono", "text-xs"], ["class", "p-2 bg-slate-900 rounded border border-slate-800 flex justify-between", 4, "ngFor", "ngForOf"], [1, "p-2", "bg-slate-900", "rounded", "border", "border-slate-800", "flex", "justify-between"], [1, "text-slate-400"], [1, "text-blue-300", "font-semibold"], [1, "text-slate-200", "flex-1", "ml-3"], [1, "text-emerald-400", "font-bold", "ml-2"]], template: function BpnmWorkflowAdminComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div")(3, "h2", 4);
    \u0275\u0275text(4, " \u2699\uFE0F Qu\u1EA3n Tr\u1ECB H\u1EC7 Th\u1ED1ng Workflow (Elsa Admin UI) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 5);
    \u0275\u0275text(6, " Qu\u1EA3n l\xFD c\xE1c b\u1EA3n \u0111\u1ECBnh ngh\u0129a quy tr\xECnh (Definitions), qu\u1EA3n l\xFD phi\xEAn b\u1EA3n (Versioning), k\xEDch ho\u1EA1t quy tr\xECnh v\xE0 ki\u1EC3m tra Execution Logs. ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 6);
    \u0275\u0275listener("click", function BpnmWorkflowAdminComponent_Template_button_click_7_listener() {
      return ctx.loadAdminData();
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 7);
    \u0275\u0275element(9, "path", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " N\u1EA1p l\u1EA1i d\u1EEF li\u1EC7u ");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(11, "div", 9)(12, "h3", 10);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 11);
    \u0275\u0275element(14, "path", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " Danh S\xE1ch Workflow Definitions ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, BpnmWorkflowAdminComponent_div_16_Template, 18, 1, "div", 13)(17, BpnmWorkflowAdminComponent_ng_template_17_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(19, "div", 9)(20, "h3", 10);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(21, "svg", 14);
    \u0275\u0275element(22, "path", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275text(23, " Qu\u1EA3n L\xFD Phi\xEAn Ch\u1EA1y & Execution Logs Audit Trail ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, BpnmWorkflowAdminComponent_div_24_Template, 18, 1, "div", 13)(25, BpnmWorkflowAdminComponent_ng_template_25_Template, 2, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const noDefinitions_r7 = \u0275\u0275reference(18);
    const noInstances_r8 = \u0275\u0275reference(26);
    \u0275\u0275advance(16);
    \u0275\u0275property("ngIf", ctx.definitions.length)("ngIfElse", noDefinitions_r7);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx.instances.length)("ngIfElse", noInstances_r8);
  }
}, dependencies: [CommonModule, NgClass, NgForOf, NgIf, DatePipe], encapsulation: 2 });
var BpnmWorkflowAdminComponent = _BpnmWorkflowAdminComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BpnmWorkflowAdminComponent, [{
    type: Component,
    args: [{
      selector: "tot-bpnm-workflow-admin",
      standalone: true,
      imports: [CommonModule],
      template: `
    <div class="p-6 space-y-6 bg-slate-900 text-white min-h-screen">
      <!-- Title Bar -->
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            \u2699\uFE0F Qu\u1EA3n Tr\u1ECB H\u1EC7 Th\u1ED1ng Workflow (Elsa Admin UI)
          </h2>
          <p class="text-sm text-slate-400 mt-1">
            Qu\u1EA3n l\xFD c\xE1c b\u1EA3n \u0111\u1ECBnh ngh\u0129a quy tr\xECnh (Definitions), qu\u1EA3n l\xFD phi\xEAn b\u1EA3n (Versioning), k\xEDch ho\u1EA1t quy tr\xECnh v\xE0 ki\u1EC3m tra Execution Logs.
          </p>
        </div>
        <button 
          (click)="loadAdminData()"
          class="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg shadow transition flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          N\u1EA1p l\u1EA1i d\u1EEF li\u1EC7u
        </button>
      </div>

      <!-- Definitions Table -->
      <div class="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-xl">
        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          Danh S\xE1ch Workflow Definitions
        </h3>

        <div class="overflow-x-auto" *ngIf="definitions.length; else noDefinitions">
          <table class="w-full text-left text-sm text-slate-300">
            <thead class="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th class="px-4 py-3">ID / Definition</th>
                <th class="px-4 py-3">T\xEAn Quy Tr\xECnh</th>
                <th class="px-4 py-3">Phi\xEAn B\u1EA3n (Version)</th>
                <th class="px-4 py-3">S\u1ED1 L\u01B0\u1EE3ng Nodes</th>
                <th class="px-4 py-3">Tr\u1EA1ng Th\xE1i K\xEDch Ho\u1EA1t</th>
                <th class="px-4 py-3 text-right">Thao T\xE1c</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              <tr *ngFor="let def of definitions" class="hover:bg-slate-700/40 transition">
                <td class="px-4 py-3 font-mono text-xs text-purple-300">{{ def.definitionId || def.id }}</td>
                <td class="px-4 py-3 font-semibold text-white">
                  {{ def.name }}
                  <div class="text-xs font-normal text-slate-400 mt-0.5" *ngIf="def.description">{{ def.description }}</div>
                </td>
                <td class="px-4 py-3 text-xs">
                  <span class="px-2 py-0.5 bg-slate-700 text-slate-300 rounded font-mono">v{{ def.version }}</span>
                </td>
                <td class="px-4 py-3 text-xs text-slate-300">{{ def.nodes?.length || 0 }} nodes</td>
                <td class="px-4 py-3">
                  <span 
                    class="px-2.5 py-0.5 rounded-full text-xs font-bold"
                    [ngClass]="def.isPublished ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700 text-slate-400'"
                  >
                    {{ def.isPublished ? 'Published' : 'Draft' }}
                  </span>
                </td>
                <td class="px-4 py-3 text-right">
                  <button 
                    (click)="onDeleteDefinition(def.id)"
                    class="px-3 py-1 bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-medium rounded transition"
                  >
                    X\xF3a
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ng-template #noDefinitions>
          <div class="text-center py-8 text-slate-400 text-sm">Ch\u01B0a c\xF3 Workflow Definition n\xE0o.</div>
        </ng-template>
      </div>

      <!-- Execution Instances Audit Log -->
      <div class="bg-slate-800/80 border border-slate-700 rounded-xl p-6 shadow-xl">
        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Qu\u1EA3n L\xFD Phi\xEAn Ch\u1EA1y & Execution Logs Audit Trail
        </h3>

        <div class="overflow-x-auto" *ngIf="instances.length; else noInstances">
          <table class="w-full text-left text-sm text-slate-300">
            <thead class="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th class="px-4 py-3">Instance ID</th>
                <th class="px-4 py-3">T\xEAn Quy Tr\xECnh</th>
                <th class="px-4 py-3">B\u1EAFt \u0110\u1EA7u</th>
                <th class="px-4 py-3">Ho\xE0n T\u1EA5t</th>
                <th class="px-4 py-3">Tr\u1EA1ng Th\xE1i</th>
                <th class="px-4 py-3 text-right">Chi Ti\u1EBFt Log</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              <ng-container *ngFor="let inst of instances">
                <tr class="hover:bg-slate-700/40 transition">
                  <td class="px-4 py-3 font-mono text-xs text-blue-400">{{ inst.id }}</td>
                  <td class="px-4 py-3 font-semibold text-white">{{ inst.workflowName }}</td>
                  <td class="px-4 py-3 text-xs text-slate-400">{{ inst.startedAt | date:'medium' }}</td>
                  <td class="px-4 py-3 text-xs text-slate-400">{{ (inst.finishedAt | date:'medium') || '-' }}</td>
                  <td class="px-4 py-3">
                    <span 
                      class="px-2.5 py-0.5 rounded-full text-xs font-bold"
                      [ngClass]="{
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30': inst.status === 'Completed',
                        'bg-blue-500/20 text-blue-300 border border-blue-500/30': inst.status === 'Running',
                        'bg-rose-500/20 text-rose-300 border border-rose-500/30': inst.status === 'Failed'
                      }"
                    >
                      {{ inst.status }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <button 
                      (click)="toggleLog(inst.id)"
                      class="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium rounded transition"
                    >
                      {{ selectedInstanceId === inst.id ? '\u1EA8n Logs' : 'Xem Logs' }}
                    </button>
                  </td>
                </tr>

                <!-- Expanded Logs Row -->
                <tr *ngIf="selectedInstanceId === inst.id" class="bg-slate-950/70 border-b border-slate-800">
                  <td colspan="6" class="p-4">
                    <div class="space-y-2">
                      <div class="font-bold text-xs text-purple-300 uppercase tracking-wider">Chi ti\u1EBFt Execution Logs (Audit Trail):</div>
                      <div class="space-y-1 font-mono text-xs">
                        <div *ngFor="let log of inst.executionLogs" class="p-2 bg-slate-900 rounded border border-slate-800 flex justify-between">
                          <span class="text-slate-400">[{{ log.timestamp | date:'HH:mm:ss' }}]</span>
                          <span class="text-blue-300 font-semibold">{{ log.nodeName }} ({{ log.activityType }}):</span>
                          <span class="text-slate-200 flex-1 ml-3">{{ log.message }}</span>
                          <span class="text-emerald-400 font-bold ml-2">{{ log.status }}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </ng-container>
            </tbody>
          </table>
        </div>

        <ng-template #noInstances>
          <div class="text-center py-8 text-slate-400 text-sm">Ch\u01B0a c\xF3 l\u1ECBch s\u1EED phi\xEAn ch\u1EA1y quy tr\xECnh.</div>
        </ng-template>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BpnmWorkflowAdminComponent, { className: "BpnmWorkflowAdminComponent", filePath: "projects/tot/elsa-bpnm-workflow/src/lib/components/bpnm-workflow-admin/bpnm-workflow-admin.component.ts", lineNumber: 162 });
})();

// projects/tot/elsa-bpnm-workflow/src/lib/components/elsa-studio-wrapper/elsa-studio-wrapper.component.ts
var _ElsaStudioWrapperComponent = class _ElsaStudioWrapperComponent {
  constructor() {
    this.serverUrl = "/api/workflow";
    this.monacoPath = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs";
  }
  ngOnInit() {
    this.loadElsaStudioResources();
  }
  loadElsaStudioResources() {
    const styleId = "elsa-studio-css";
    if (!document.getElementById(styleId)) {
      const link = document.createElement("link");
      link.id = styleId;
      link.rel = "stylesheet";
      link.href = "/assets/elsa-workflows-studio/elsa-workflows-studio.css";
      link.onerror = () => {
        const cdnLink = document.createElement("link");
        cdnLink.rel = "stylesheet";
        cdnLink.href = "https://cdn.jsdelivr.net/npm/@elsa-workflows/elsa-workflows-studio@2.14.0/dist/elsa-workflows-studio/elsa-workflows-studio.css";
        document.head.appendChild(cdnLink);
      };
      document.head.appendChild(link);
    }
    const scriptId = "elsa-studio-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "module";
      script.src = "/assets/elsa-workflows-studio/elsa-workflows-studio.esm.js";
      script.onerror = () => {
        const cdnScript = document.createElement("script");
        cdnScript.type = "module";
        cdnScript.src = "https://cdn.jsdelivr.net/npm/@elsa-workflows/elsa-workflows-studio@2.14.0/dist/elsa-workflows-studio/elsa-workflows-studio.esm.js";
        document.head.appendChild(cdnScript);
      };
      document.head.appendChild(script);
    }
  }
};
_ElsaStudioWrapperComponent.\u0275fac = function ElsaStudioWrapperComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ElsaStudioWrapperComponent)();
};
_ElsaStudioWrapperComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ElsaStudioWrapperComponent, selectors: [["tot-elsa-studio-wrapper"]], inputs: { serverUrl: "serverUrl", monacoPath: "monacoPath" }, decls: 12, vars: 3, consts: [[1, "relative", "min-h-screen", "bg-slate-900", "text-white", "flex", "flex-col"], [1, "p-4", "bg-slate-950/80", "border-b", "border-slate-800", "text-xs", "text-slate-300", "flex", "items-center", "justify-between"], [1, "flex", "items-center", "gap-2"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-400", "animate-pulse"], [1, "font-semibold", "text-white"], [1, "text-slate-500", "font-mono"], [1, "px-2", "py-0.5", "bg-blue-600/30", "text-blue-300", "border", "border-blue-500/30", "rounded", "text-[11px]", "font-mono"], [1, "flex-1", "w-full", "min-h-[780px]", "bg-white", "text-slate-900", "rounded-b-xl", "overflow-hidden", "shadow-2xl"], [1, "w-full", "h-full", "block", "min-h-[780px]"]], template: function ElsaStudioWrapperComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
    \u0275\u0275domElement(3, "span", 3);
    \u0275\u0275domElementStart(4, "span", 4);
    \u0275\u0275text(5, "Official Elsa Studio UI (Web Component Host)");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(6, "span", 5);
    \u0275\u0275text(7);
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(8, "span", 6);
    \u0275\u0275text(9, " @elsa-workflows/elsa-workflows-studio v2.14 ");
    \u0275\u0275domElementEnd()();
    \u0275\u0275domElementStart(10, "div", 7);
    \u0275\u0275domElement(11, "elsa-studio-root", 8);
    \u0275\u0275domElementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("| server-url: ", ctx.serverUrl);
    \u0275\u0275advance(4);
    \u0275\u0275attribute("server-url", ctx.serverUrl)("monaco-lib-path", ctx.monacoPath);
  }
}, dependencies: [CommonModule], encapsulation: 2 });
var ElsaStudioWrapperComponent = _ElsaStudioWrapperComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ElsaStudioWrapperComponent, [{
    type: Component,
    args: [{
      selector: "tot-elsa-studio-wrapper",
      standalone: true,
      imports: [CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      template: `
    <div class="relative min-h-screen bg-slate-900 text-white flex flex-col">
      <!-- Top Info Banner -->
      <div class="p-4 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-300 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-semibold text-white">Official Elsa Studio UI (Web Component Host)</span>
          <span class="text-slate-500 font-mono">| server-url: {{ serverUrl }}</span>
        </div>
        <span class="px-2 py-0.5 bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded text-[11px] font-mono">
          @elsa-workflows/elsa-workflows-studio v2.14
        </span>
      </div>

      <!-- Web Component Container -->
      <div class="flex-1 w-full min-h-[780px] bg-white text-slate-900 rounded-b-xl overflow-hidden shadow-2xl">
        <elsa-studio-root 
          [attr.server-url]="serverUrl"
          [attr.monaco-lib-path]="monacoPath"
          class="w-full h-full block min-h-[780px]"
        >
        </elsa-studio-root>
      </div>
    </div>
  `
    }]
  }], null, { serverUrl: [{
    type: Input
  }], monacoPath: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ElsaStudioWrapperComponent, { className: "ElsaStudioWrapperComponent", filePath: "projects/tot/elsa-bpnm-workflow/src/lib/components/elsa-studio-wrapper/elsa-studio-wrapper.component.ts", lineNumber: 35 });
})();

// projects/tot/elsa-bpnm-workflow/src/lib/components/elsa-workflow-main/elsa-workflow-main.component.ts
function ElsaWorkflowMainComponent_tot_bpnm_workflow_designer_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tot-bpnm-workflow-designer");
  }
}
function ElsaWorkflowMainComponent_tot_elsa_studio_wrapper_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tot-elsa-studio-wrapper");
  }
}
function ElsaWorkflowMainComponent_tot_bpnm_workflow_dashboard_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tot-bpnm-workflow-dashboard");
  }
}
function ElsaWorkflowMainComponent_tot_bpnm_user_tasks_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tot-bpnm-user-tasks");
  }
}
function ElsaWorkflowMainComponent_tot_bpnm_workflow_admin_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tot-bpnm-workflow-admin");
  }
}
var _ElsaWorkflowMainComponent = class _ElsaWorkflowMainComponent {
  constructor() {
    this.activeTab = "designer";
  }
  selectTab(tab) {
    this.activeTab = tab;
  }
};
_ElsaWorkflowMainComponent.\u0275fac = function ElsaWorkflowMainComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ElsaWorkflowMainComponent)();
};
_ElsaWorkflowMainComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ElsaWorkflowMainComponent, selectors: [["tot-elsa-workflow-main"]], decls: 41, vars: 11, consts: [[1, "flex", "flex-col", "min-h-screen", "bg-slate-950", "text-slate-100", "font-sans"], [1, "bg-slate-900/95", "border-b", "border-slate-800", "sticky", "top-0", "z-50", "backdrop-blur-md", "px-6", "py-3", "flex", "items-center", "justify-between", "shadow-xl"], [1, "flex", "items-center", "gap-3"], [1, "w-10", "h-10", "rounded-xl", "bg-gradient-to-tr", "from-blue-600", "via-indigo-500", "to-purple-600", "flex", "items-center", "justify-center", "text-white", "font-black", "text-xl", "shadow-lg", "shadow-indigo-500/20"], [1, "flex", "items-center", "gap-2"], [1, "text-base", "font-bold", "text-white", "tracking-wide"], [1, "px-2", "py-0.5", "bg-blue-500/10", "text-blue-400", "border", "border-blue-500/20", "rounded-full", "text-[10px]", "font-semibold"], [1, "text-[11px]", "text-slate-400"], [1, "flex", "items-center", "gap-1.5", "bg-slate-950/80", "p-1.5", "rounded-2xl", "border", "border-slate-800", "shadow-inner"], ["type", "button", 1, "px-4", "py-2", "rounded-xl", "text-xs", "font-semibold", "transition-all", "duration-200", "flex", "items-center", "gap-2", "outline-none", "focus:ring-2", "focus:ring-blue-500/40", 3, "click", "ngClass"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 4a2 2 0 114 0v1a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2h8zM15 13a2 2 0 114 0v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1a2 2 0 012-2h8z"], ["type", "button", 1, "px-4", "py-2", "rounded-xl", "text-xs", "font-semibold", "transition-all", "duration-200", "flex", "items-center", "gap-2", "outline-none", "focus:ring-2", "focus:ring-cyan-500/40", 3, "click", "ngClass"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"], ["type", "button", 1, "px-4", "py-2", "rounded-xl", "text-xs", "font-semibold", "transition-all", "duration-200", "flex", "items-center", "gap-2", "outline-none", "focus:ring-2", "focus:ring-indigo-500/40", 3, "click", "ngClass"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"], ["type", "button", 1, "px-4", "py-2", "rounded-xl", "text-xs", "font-semibold", "transition-all", "duration-200", "flex", "items-center", "gap-2", "outline-none", "focus:ring-2", "focus:ring-emerald-500/40", 3, "click", "ngClass"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], ["type", "button", 1, "px-4", "py-2", "rounded-xl", "text-xs", "font-semibold", "transition-all", "duration-200", "flex", "items-center", "gap-2", "outline-none", "focus:ring-2", "focus:ring-purple-500/40", 3, "click", "ngClass"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"], [1, "flex-1", "w-full", "relative"], [3, "ngSwitch"], [4, "ngSwitchCase"]], template: function ElsaWorkflowMainComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "div", 3);
    \u0275\u0275text(4, " \u26A1 ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "div", 4)(7, "h1", 5);
    \u0275\u0275text(8, "Elsa BPMN Workflow Suite");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 6);
    \u0275\u0275text(10, ".NET 10 Engine");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p", 7);
    \u0275\u0275text(12, "H\u1EC7 th\u1ED1ng Thi\u1EBFt k\u1EBF, Ph\xEA duy\u1EC7t & Qu\u1EA3n tr\u1ECB Quy tr\xECnh Ph\xE2n t\xE1n (Redis, MongoDB, Kafka, Postgres, RabbitMQ, HTTP, CQRS, Telegram)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "nav", 8)(14, "button", 9);
    \u0275\u0275listener("click", function ElsaWorkflowMainComponent_Template_button_click_14_listener() {
      return ctx.selectTab("designer");
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 10);
    \u0275\u0275element(16, "path", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " Tr\xECnh Thi\u1EBFt K\u1EBF (Designer) ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(18, "button", 12);
    \u0275\u0275listener("click", function ElsaWorkflowMainComponent_Template_button_click_18_listener() {
      return ctx.selectTab("studio");
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(19, "svg", 10);
    \u0275\u0275element(20, "path", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " Official Elsa Studio ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "button", 14);
    \u0275\u0275listener("click", function ElsaWorkflowMainComponent_Template_button_click_22_listener() {
      return ctx.selectTab("dashboard");
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(23, "svg", 10);
    \u0275\u0275element(24, "path", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275text(25, " Dashboard Th\u1ED1ng K\xEA ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(26, "button", 16);
    \u0275\u0275listener("click", function ElsaWorkflowMainComponent_Template_button_click_26_listener() {
      return ctx.selectTab("tasks");
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(27, "svg", 10);
    \u0275\u0275element(28, "path", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275text(29, " C\xF4ng Vi\u1EC7c & Ph\xEA Duy\u1EC7t ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(30, "button", 18);
    \u0275\u0275listener("click", function ElsaWorkflowMainComponent_Template_button_click_30_listener() {
      return ctx.selectTab("admin");
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(31, "svg", 10);
    \u0275\u0275element(32, "path", 19);
    \u0275\u0275elementEnd();
    \u0275\u0275text(33, " Qu\u1EA3n Tr\u1ECB Admin ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(34, "main", 20);
    \u0275\u0275elementContainerStart(35, 21);
    \u0275\u0275template(36, ElsaWorkflowMainComponent_tot_bpnm_workflow_designer_36_Template, 1, 0, "tot-bpnm-workflow-designer", 22)(37, ElsaWorkflowMainComponent_tot_elsa_studio_wrapper_37_Template, 1, 0, "tot-elsa-studio-wrapper", 22)(38, ElsaWorkflowMainComponent_tot_bpnm_workflow_dashboard_38_Template, 1, 0, "tot-bpnm-workflow-dashboard", 22)(39, ElsaWorkflowMainComponent_tot_bpnm_user_tasks_39_Template, 1, 0, "tot-bpnm-user-tasks", 22)(40, ElsaWorkflowMainComponent_tot_bpnm_workflow_admin_40_Template, 1, 0, "tot-bpnm-workflow-admin", 22);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(14);
    \u0275\u0275property("ngClass", ctx.activeTab === "designer" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105 font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx.activeTab === "studio" ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 scale-105 font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx.activeTab === "dashboard" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105 font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx.activeTab === "tasks" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105 font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx.activeTab === "admin" ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105 font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngSwitch", ctx.activeTab);
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "designer");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "studio");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "dashboard");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "tasks");
    \u0275\u0275advance();
    \u0275\u0275property("ngSwitchCase", "admin");
  }
}, dependencies: [
  CommonModule,
  NgClass,
  NgSwitch,
  NgSwitchCase,
  BpnmWorkflowDesignerComponent,
  BpnmWorkflowDashboardComponent,
  BpnmUserTasksComponent,
  BpnmWorkflowAdminComponent,
  ElsaStudioWrapperComponent
], encapsulation: 2 });
var ElsaWorkflowMainComponent = _ElsaWorkflowMainComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ElsaWorkflowMainComponent, [{
    type: Component,
    args: [{
      selector: "tot-elsa-workflow-main",
      standalone: true,
      imports: [
        CommonModule,
        BpnmWorkflowDesignerComponent,
        BpnmWorkflowDashboardComponent,
        BpnmUserTasksComponent,
        BpnmWorkflowAdminComponent,
        ElsaStudioWrapperComponent
      ],
      template: `
    <div class="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
      <!-- Main Navigation Header -->
      <header class="bg-slate-900/95 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md px-6 py-3 flex items-center justify-between shadow-xl">
        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">
            \u26A1
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base font-bold text-white tracking-wide">Elsa BPMN Workflow Suite</h1>
              <span class="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-semibold">.NET 10 Engine</span>
            </div>
            <p class="text-[11px] text-slate-400">H\u1EC7 th\u1ED1ng Thi\u1EBFt k\u1EBF, Ph\xEA duy\u1EC7t & Qu\u1EA3n tr\u1ECB Quy tr\xECnh Ph\xE2n t\xE1n (Redis, MongoDB, Kafka, Postgres, RabbitMQ, HTTP, CQRS, Telegram)</p>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
          <button 
            (click)="selectTab('designer')"
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 outline-none focus:ring-2 focus:ring-blue-500/40"
            [ngClass]="activeTab === 'designer' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105 font-bold' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2h8zM15 13a2 2 0 114 0v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1a2 2 0 012-2h8z"/></svg>
            Tr\xECnh Thi\u1EBFt K\u1EBF (Designer)
          </button>

          <button 
            (click)="selectTab('studio')"
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 outline-none focus:ring-2 focus:ring-cyan-500/40"
            [ngClass]="activeTab === 'studio' 
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 scale-105 font-bold' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            Official Elsa Studio
          </button>

          <button 
            (click)="selectTab('dashboard')"
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 outline-none focus:ring-2 focus:ring-indigo-500/40"
            [ngClass]="activeTab === 'dashboard' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105 font-bold' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            Dashboard Th\u1ED1ng K\xEA
          </button>

          <button 
            (click)="selectTab('tasks')"
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 outline-none focus:ring-2 focus:ring-emerald-500/40"
            [ngClass]="activeTab === 'tasks' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105 font-bold' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            C\xF4ng Vi\u1EC7c & Ph\xEA Duy\u1EC7t
          </button>

          <button 
            (click)="selectTab('admin')"
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 outline-none focus:ring-2 focus:ring-purple-500/40"
            [ngClass]="activeTab === 'admin' 
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105 font-bold' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
            Qu\u1EA3n Tr\u1ECB Admin
          </button>
        </nav>
      </header>

      <!-- Main Dynamic Content Container -->
      <main class="flex-1 w-full relative">
        <ng-container [ngSwitch]="activeTab">
          <tot-bpnm-workflow-designer *ngSwitchCase="'designer'"></tot-bpnm-workflow-designer>
          <tot-elsa-studio-wrapper *ngSwitchCase="'studio'"></tot-elsa-studio-wrapper>
          <tot-bpnm-workflow-dashboard *ngSwitchCase="'dashboard'"></tot-bpnm-workflow-dashboard>
          <tot-bpnm-user-tasks *ngSwitchCase="'tasks'"></tot-bpnm-user-tasks>
          <tot-bpnm-workflow-admin *ngSwitchCase="'admin'"></tot-bpnm-workflow-admin>
        </ng-container>
      </main>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ElsaWorkflowMainComponent, { className: "ElsaWorkflowMainComponent", filePath: "projects/tot/elsa-bpnm-workflow/src/lib/components/elsa-workflow-main/elsa-workflow-main.component.ts", lineNumber: 117 });
})();
export {
  BpnmUserTasksComponent,
  BpnmWorkflowAdminComponent,
  BpnmWorkflowDashboardComponent,
  BpnmWorkflowDesignerComponent,
  ElsaStudioWrapperComponent,
  ElsaWorkflowMainComponent,
  ElsaWorkflowService
};
//# sourceMappingURL=chunk-VLJDPSRC.js.map
