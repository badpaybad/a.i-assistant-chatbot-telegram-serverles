import {
  NzCardComponent,
  NzCardModule
} from "./chunk-DTXUN2ZB.js";
import {
  NzColDirective,
  NzGridModule,
  NzRowDirective
} from "./chunk-U7OJRUBM.js";
import {
  NzAutosizeDirective,
  NzInputDirective,
  NzInputModule
} from "./chunk-JPMEC3PG.js";
import {
  AppNotificationService,
  CommonModule,
  DefaultValueAccessor,
  FormsModule,
  HttpClientService,
  NgControlStatus,
  NgIf,
  NgModel,
  NzButtonComponent,
  NzButtonModule,
  NzIconDirective,
  NzIconModule,
  NzTransitionPatchDirective,
  NzWaveDirective,
  TranslateModule,
  TranslatePipe,
  TranslateService
} from "./chunk-OCLTPTCJ.js";
import {
  Component,
  Injectable,
  from,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6BQPXFZE.js";

// src/app/modules/cqrs-dashboard/services/dashboard.service.ts
var DashboardService = class _DashboardService {
  constructor() {
    this.http = inject(HttpClientService);
  }
  getStats() {
    return from(this.http.get("/api/cqrs/dashboard/stats"));
  }
  getQueues() {
    return from(this.http.get("/api/cqrs/dashboard/queues"));
  }
  getMessages(queueName, page = 1, pageSize = 20) {
    return from(this.http.get(`/api/cqrs/dashboard/messages/${queueName}?page=${page}&pageSize=${pageSize}`));
  }
  retryCommand(queueName, messageJson) {
    return from(this.http.post("/api/cqrs/dashboard/retry", { queueName, messageJson }));
  }
  pushMessage(queueName, messageJson) {
    return from(this.http.post("/api/cqrs/dashboard/push", { queueName, messageJson }));
  }
  removeFromDeadLetter(queueName, messageJson) {
    return from(this.http.delete(`/api/cqrs/dashboard/dead-letter/${queueName}?messageJson=${encodeURIComponent(messageJson)}`));
  }
  getTracking(trackingId) {
    return from(this.http.get(`/api/cqrs/dashboard/tracking/${trackingId}`));
  }
  getRecentTracking(params) {
    const query = Object.keys(params).filter((k) => params[k] !== null && params[k] !== void 0 && params[k] !== "").map((k) => `${k}=${encodeURIComponent(params[k])}`).join("&");
    return from(this.http.get(`/api/cqrs/dashboard/tracking/recent?${query}`));
  }
  resendTracking(trackingId) {
    return from(this.http.post(`/api/cqrs/dashboard/tracking/${trackingId}/resend`, {}));
  }
  deleteTracking(trackingId) {
    return from(this.http.delete(`/api/cqrs/dashboard/tracking/${trackingId}`));
  }
  stopWorker(workerId) {
    return from(this.http.post(`/api/cqrs/dashboard/workers/${workerId}/stop`, {}));
  }
  startWorker(workerId) {
    return from(this.http.post(`/api/cqrs/dashboard/workers/${workerId}/start`, {}));
  }
  sendTestCommand(data) {
    return from(this.http.post("/api/Test/cqrs/sample-command", { data }));
  }
  sendTestEvent(data) {
    return from(this.http.post("/api/Test/cqrs/sample-event", { data }));
  }
  getLastActivity() {
    return from(this.http.get("/api/cqrs/dashboard/last-activity"));
  }
  static {
    this.\u0275fac = function DashboardService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardService, factory: _DashboardService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// src/app/modules/cqrs-dashboard/cqrs-test/cqrs-test.component.ts
var _c0 = () => ({ minRows: 3, maxRows: 6 });
function CqrsTestComponent_div_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "nz-card", 4);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementStart(3, "p")(4, "strong");
    \u0275\u0275text(5, "Tracking ID:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "code");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(2, 3, "K\u1EBFt qu\u1EA3 g\u1EA7n nh\u1EA5t"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r0.lastTrackingId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 5, "B\u1EA1n c\xF3 th\u1EC3 quay l\u1EA1i Dashboard v\xE0 t\xECm ki\u1EBFm theo ID n\xE0y \u0111\u1EC3 theo d\xF5i lu\u1ED3ng x\u1EED l\xFD."));
  }
}
var CqrsTestComponent = class _CqrsTestComponent {
  constructor() {
    this.dashboardService = inject(DashboardService);
    this.notification = inject(AppNotificationService);
    this.translate = inject(TranslateService);
    this.commandPayload = '{"message": "Hello from UI Test Command", "timestamp": "' + (/* @__PURE__ */ new Date()).toISOString() + '"}';
    this.eventData = '{"message": "Hello from UI Test Event", "timestamp": "' + (/* @__PURE__ */ new Date()).toISOString() + '"}';
    this.loadingCommand = false;
    this.loadingEvent = false;
    this.lastTrackingId = "";
  }
  sendTestCommand() {
    this.loadingCommand = true;
    this.dashboardService.sendTestCommand(this.commandPayload).subscribe({
      next: (res) => {
        this.lastTrackingId = res.trackingId;
        this.notification.success(this.translate.instant("Th\xE0nh c\xF4ng"), this.translate.instant("\u0110\xE3 g\u1EEDi SampleCommand. Tracking ID: {{id}}", { id: res.trackingId }));
        this.loadingCommand = false;
      },
      error: () => {
        this.notification.error(this.translate.instant("Th\u1EA5t b\u1EA1i"), this.translate.instant("L\u1ED7i khi g\u1EEDi command"));
        this.loadingCommand = false;
      }
    });
  }
  sendTestEvent() {
    this.loadingEvent = true;
    this.dashboardService.sendTestEvent(this.eventData).subscribe({
      next: (res) => {
        this.lastTrackingId = res.trackingId;
        this.notification.success(this.translate.instant("Th\xE0nh c\xF4ng"), this.translate.instant("\u0110\xE3 g\u1EEDi SampleEvent. Tracking ID: {{id}}", { id: res.trackingId }));
        this.loadingEvent = false;
      },
      error: () => {
        this.notification.error(this.translate.instant("Th\u1EA5t b\u1EA1i"), this.translate.instant("L\u1ED7i khi g\u1EEDi event"));
        this.loadingEvent = false;
      }
    });
  }
  static {
    this.\u0275fac = function CqrsTestComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CqrsTestComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CqrsTestComponent, selectors: [["app-cqrs-test"]], decls: 36, vars: 39, consts: [[2, "padding", "24px"], [2, "margin-bottom", "24px"], ["nz-row", "", 3, "nzGutter"], ["nz-col", "", 3, "nzSpan"], [3, "nzTitle"], [2, "margin-bottom", "16px"], ["nz-input", "", 3, "ngModelChange", "ngModel", "nzAutosize"], ["nz-button", "", "nzType", "primary", "nzBlock", "", 3, "click", "nzLoading"], ["nz-icon", "", "nzType", "rocket"], ["nz-icon", "", "nzType", "notification"], ["style", "margin-top: 24px;", 4, "ngIf"], [2, "margin-top", "24px"]], template: function CqrsTestComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
        \u0275\u0275text(2);
        \u0275\u0275pipe(3, "translate");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "div", 3)(6, "nz-card", 4);
        \u0275\u0275pipe(7, "translate");
        \u0275\u0275elementStart(8, "p");
        \u0275\u0275text(9);
        \u0275\u0275pipe(10, "translate");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 5)(12, "label");
        \u0275\u0275text(13);
        \u0275\u0275pipe(14, "translate");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "textarea", 6);
        \u0275\u0275twoWayListener("ngModelChange", function CqrsTestComponent_Template_textarea_ngModelChange_15_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.commandPayload, $event) || (ctx.commandPayload = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "button", 7);
        \u0275\u0275listener("click", function CqrsTestComponent_Template_button_click_16_listener() {
          return ctx.sendTestCommand();
        });
        \u0275\u0275element(17, "span", 8);
        \u0275\u0275text(18);
        \u0275\u0275pipe(19, "translate");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(20, "div", 3)(21, "nz-card", 4);
        \u0275\u0275pipe(22, "translate");
        \u0275\u0275elementStart(23, "p");
        \u0275\u0275text(24);
        \u0275\u0275pipe(25, "translate");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "div", 5)(27, "label");
        \u0275\u0275text(28);
        \u0275\u0275pipe(29, "translate");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "textarea", 6);
        \u0275\u0275twoWayListener("ngModelChange", function CqrsTestComponent_Template_textarea_ngModelChange_30_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.eventData, $event) || (ctx.eventData = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(31, "button", 7);
        \u0275\u0275listener("click", function CqrsTestComponent_Template_button_click_31_listener() {
          return ctx.sendTestEvent();
        });
        \u0275\u0275element(32, "span", 9);
        \u0275\u0275text(33);
        \u0275\u0275pipe(34, "translate");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(35, CqrsTestComponent_div_35_Template, 11, 7, "div", 10);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 19, "Ki\u1EC3m th\u1EED CQRS"));
        \u0275\u0275advance(2);
        \u0275\u0275property("nzGutter", 24);
        \u0275\u0275advance();
        \u0275\u0275property("nzSpan", 12);
        \u0275\u0275advance();
        \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(7, 21, "G\u1EEDi SampleCommand"));
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 23, "Command n\xE0y s\u1EBD \u0111\u01B0\u1EE3c Enqueue v\xE0o queue sample.command"));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 25, "Payload d\u1EEF li\u1EC7u"));
        \u0275\u0275advance(2);
        \u0275\u0275twoWayProperty("ngModel", ctx.commandPayload);
        \u0275\u0275property("nzAutosize", \u0275\u0275pureFunction0(37, _c0));
        \u0275\u0275advance();
        \u0275\u0275property("nzLoading", ctx.loadingCommand);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 27, "G\u1EEDi Command"), " ");
        \u0275\u0275advance(2);
        \u0275\u0275property("nzSpan", 12);
        \u0275\u0275advance();
        \u0275\u0275property("nzTitle", \u0275\u0275pipeBind1(22, 29, "G\u1EEDi SampleEvent"));
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(25, 31, "S\u1EF1 ki\u1EC7n n\xE0y s\u1EBD \u0111\u01B0\u1EE3c Publish v\xE0o topic sample.event"));
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(29, 33, "N\u1ED9i dung s\u1EF1 ki\u1EC7n"));
        \u0275\u0275advance(2);
        \u0275\u0275twoWayProperty("ngModel", ctx.eventData);
        \u0275\u0275property("nzAutosize", \u0275\u0275pureFunction0(38, _c0));
        \u0275\u0275advance();
        \u0275\u0275property("nzLoading", ctx.loadingEvent);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(34, 35, "G\u1EEDi Event"), " ");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.lastTrackingId);
      }
    }, dependencies: [CommonModule, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, NzCardModule, NzCardComponent, NzButtonModule, NzButtonComponent, NzTransitionPatchDirective, NzWaveDirective, NzInputModule, NzInputDirective, NzAutosizeDirective, NzGridModule, NzColDirective, NzRowDirective, NzIconModule, NzIconDirective, TranslateModule, TranslatePipe], styles: ["\nnz-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\nlabel[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 500;\n}\n/*# sourceMappingURL=cqrs-test.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CqrsTestComponent, [{
    type: Component,
    args: [{ selector: "app-cqrs-test", standalone: true, imports: [
      CommonModule,
      FormsModule,
      NzCardModule,
      NzButtonModule,
      NzInputModule,
      NzGridModule,
      NzIconModule,
      TranslateModule
    ], template: `
    <div style="padding: 24px;">
      <h2 style="margin-bottom: 24px;">{{ 'Ki\u1EC3m th\u1EED CQRS' | translate }}</h2>
      
      <div nz-row [nzGutter]="24">
        <div nz-col [nzSpan]="12">
          <nz-card [nzTitle]="'G\u1EEDi SampleCommand' | translate">
            <p>{{ 'Command n\xE0y s\u1EBD \u0111\u01B0\u1EE3c Enqueue v\xE0o queue sample.command' | translate }}</p>
            <div style="margin-bottom: 16px;">
              <label>{{ 'Payload d\u1EEF li\u1EC7u' | translate }}</label>
              <textarea nz-input [(ngModel)]="commandPayload" [nzAutosize]="{ minRows: 3, maxRows: 6 }"></textarea>
            </div>
            <button nz-button nzType="primary" [nzLoading]="loadingCommand" (click)="sendTestCommand()" nzBlock>
              <span nz-icon nzType="rocket"></span> {{ 'G\u1EEDi Command' | translate }}
            </button>
          </nz-card>
        </div>
        
        <div nz-col [nzSpan]="12">
          <nz-card [nzTitle]="'G\u1EEDi SampleEvent' | translate">
            <p>{{ 'S\u1EF1 ki\u1EC7n n\xE0y s\u1EBD \u0111\u01B0\u1EE3c Publish v\xE0o topic sample.event' | translate }}</p>
            <div style="margin-bottom: 16px;">
              <label>{{ 'N\u1ED9i dung s\u1EF1 ki\u1EC7n' | translate }}</label>
              <textarea nz-input [(ngModel)]="eventData" [nzAutosize]="{ minRows: 3, maxRows: 6 }"></textarea>
            </div>
            <button nz-button nzType="primary" [nzLoading]="loadingEvent" (click)="sendTestEvent()" nzBlock>
              <span nz-icon nzType="notification"></span> {{ 'G\u1EEDi Event' | translate }}
            </button>
          </nz-card>
        </div>
      </div>

      <div *ngIf="lastTrackingId" style="margin-top: 24px;">
        <nz-card [nzTitle]="'K\u1EBFt qu\u1EA3 g\u1EA7n nh\u1EA5t' | translate">
          <p><strong>Tracking ID:</strong> <code>{{ lastTrackingId }}</code></p>
          <p>{{ 'B\u1EA1n c\xF3 th\u1EC3 quay l\u1EA1i Dashboard v\xE0 t\xECm ki\u1EBFm theo ID n\xE0y \u0111\u1EC3 theo d\xF5i lu\u1ED3ng x\u1EED l\xFD.' | translate }}</p>
        </nz-card>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;1c2784f98fa591517c95b6c32249948c9d56b8b33b8869b5cc3b50156ce3230a;/work/a.i-assistant-chatbot-telegram-serverles/TreeOfThought/frontend/web/src/app/modules/cqrs-dashboard/cqrs-test/cqrs-test.component.ts */\nnz-card {\n  margin-bottom: 24px;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);\n}\nlabel {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 500;\n}\n/*# sourceMappingURL=cqrs-test.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CqrsTestComponent, { className: "CqrsTestComponent", filePath: "src/app/modules/cqrs-dashboard/cqrs-test/cqrs-test.component.ts", lineNumber: 79 });
})();

export {
  DashboardService,
  CqrsTestComponent
};
//# sourceMappingURL=chunk-K4FHBDBG.js.map
