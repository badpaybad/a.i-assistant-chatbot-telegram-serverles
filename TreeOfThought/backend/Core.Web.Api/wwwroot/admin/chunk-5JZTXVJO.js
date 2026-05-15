import {
  NzPageHeaderComponent,
  NzPageHeaderModule
} from "./chunk-F2HNJKHN.js";
import {
  FirebaseService
} from "./chunk-BRXGOM47.js";
import "./chunk-IRGOCD6C.js";
import {
  NzCardComponent,
  NzCardModule
} from "./chunk-7RCWUD7A.js";
import "./chunk-KMAEKJDE.js";
import {
  NzInputModule
} from "./chunk-OCV5YBAO.js";
import {
  AppNotificationService,
  CommonModule,
  FormsModule,
  HttpClientService,
  NgIf,
  NzButtonComponent,
  NzButtonModule,
  NzTransitionPatchDirective,
  NzWaveDirective
} from "./chunk-LJSHPVT7.js";
import {
  Component,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-2BQMWOA2.js";
import "./chunk-MYGOUE3E.js";

// src/app/modules/test/fcm-test/fcm-test.component.ts
function FcmTestComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "strong");
    \u0275\u0275text(2, "Your Token:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "pre", 7);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.token);
  }
}
function FcmTestComponent_nz_card_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-card", 8)(1, "p");
    \u0275\u0275text(2, "Send a request to the backend to send a push notification back to this device.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 9);
    \u0275\u0275listener("click", function FcmTestComponent_nz_card_8_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.sendSampleNotification());
    });
    \u0275\u0275text(4, " Send Sample Notification ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("nzLoading", ctx_r0.sendingSample);
  }
}
var _FcmTestComponent = class _FcmTestComponent {
  constructor() {
    this.firebase = inject(FirebaseService);
    this.http = inject(HttpClientService);
    this.notification = inject(AppNotificationService);
    this.token = null;
    this.loadingToken = false;
    this.sendingSample = false;
  }
  ngOnInit() {
    this.firebase.onMessageReceived((payload) => {
      var _a, _b;
      this.notification.success(((_a = payload.notification) == null ? void 0 : _a.title) || "FCM Notification", ((_b = payload.notification) == null ? void 0 : _b.body) || "New message received", { nzDuration: 0 });
    });
  }
  async getDeviceToken() {
    this.loadingToken = true;
    try {
      this.token = await this.firebase.getFCMToken();
      if (this.token) {
        this.notification.success("Success", "FCM Token retrieved");
      } else {
        this.notification.warning("Warning", "Could not get FCM token. Make sure you allow notifications.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.loadingToken = false;
    }
  }
  async sendSampleNotification() {
    if (!this.token)
      return;
    this.sendingSample = true;
    try {
      await this.http.post("/api/test/fcm-sample", {
        token: this.token,
        title: "Sample Notification",
        body: "This is a test notification from Tree of Thought backend!"
      });
      this.notification.info("Info", "Sample notification request sent to backend");
    } catch (e) {
      console.error(e);
    } finally {
      this.sendingSample = false;
    }
  }
};
_FcmTestComponent.\u0275fac = function FcmTestComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FcmTestComponent)();
};
_FcmTestComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FcmTestComponent, selectors: [["app-fcm-test"]], decls: 9, vars: 3, consts: [["nzTitle", "FCM Push Notification Test"], [1, "test-content"], ["nzTitle", "Device Registration"], ["nz-button", "", "nzType", "primary", 3, "click", "nzLoading"], ["style", "margin-top: 16px;", 4, "ngIf"], ["nzTitle", "Test Notification", "style", "margin-top: 24px;", 4, "ngIf"], [2, "margin-top", "16px"], [2, "white-space", "pre-wrap", "word-break", "break-all"], ["nzTitle", "Test Notification", 2, "margin-top", "24px"], ["nz-button", "", "nzType", "default", 3, "click", "nzLoading"]], template: function FcmTestComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "nz-page-header", 0);
    \u0275\u0275elementStart(1, "div", 1)(2, "nz-card", 2)(3, "p");
    \u0275\u0275text(4, "Click below to get this device's FCM token and register for push notifications.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 3);
    \u0275\u0275listener("click", function FcmTestComponent_Template_button_click_5_listener() {
      return ctx.getDeviceToken();
    });
    \u0275\u0275text(6, " Get FCM Token ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, FcmTestComponent_div_7_Template, 5, 1, "div", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, FcmTestComponent_nz_card_8_Template, 5, 1, "nz-card", 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275property("nzLoading", ctx.loadingToken);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.token);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx.token);
  }
}, dependencies: [
  CommonModule,
  NgIf,
  FormsModule,
  NzPageHeaderModule,
  NzPageHeaderComponent,
  NzCardModule,
  NzCardComponent,
  NzButtonModule,
  NzButtonComponent,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzInputModule
], styles: ["\n.test-content[_ngcontent-%COMP%] {\n  padding: 24px;\n}\npre[_ngcontent-%COMP%] {\n  background: #f0f0f0;\n  padding: 8px;\n  border-radius: 4px;\n  margin-top: 8px;\n}\n/*# sourceMappingURL=fcm-test.component.css.map */"] });
var FcmTestComponent = _FcmTestComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FcmTestComponent, [{
    type: Component,
    args: [{ selector: "app-fcm-test", standalone: true, imports: [
      CommonModule,
      FormsModule,
      NzPageHeaderModule,
      NzCardModule,
      NzButtonModule,
      NzInputModule
    ], template: `<nz-page-header nzTitle="FCM Push Notification Test">
</nz-page-header>

<div class="test-content">
  <nz-card nzTitle="Device Registration">
    <p>Click below to get this device's FCM token and register for push notifications.</p>
    <button nz-button nzType="primary" (click)="getDeviceToken()" [nzLoading]="loadingToken">
      Get FCM Token
    </button>
    <div *ngIf="token" style="margin-top: 16px;">
      <strong>Your Token:</strong>
      <pre style="white-space: pre-wrap; word-break: break-all;">{{ token }}</pre>
    </div>
  </nz-card>

  <nz-card nzTitle="Test Notification" style="margin-top: 24px;" *ngIf="token">
    <p>Send a request to the backend to send a push notification back to this device.</p>
    <button nz-button nzType="default" (click)="sendSampleNotification()" [nzLoading]="sendingSample">
      Send Sample Notification
    </button>
  </nz-card>
</div>
`, styles: ["/* src/app/modules/test/fcm-test/fcm-test.component.css */\n.test-content {\n  padding: 24px;\n}\npre {\n  background: #f0f0f0;\n  padding: 8px;\n  border-radius: 4px;\n  margin-top: 8px;\n}\n/*# sourceMappingURL=fcm-test.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FcmTestComponent, { className: "FcmTestComponent", filePath: "src/app/modules/test/fcm-test/fcm-test.component.ts", lineNumber: 26 });
})();
export {
  FcmTestComponent
};
//# sourceMappingURL=chunk-5JZTXVJO.js.map
