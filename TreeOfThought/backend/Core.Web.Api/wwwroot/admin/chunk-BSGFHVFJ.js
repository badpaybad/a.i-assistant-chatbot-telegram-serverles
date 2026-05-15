import {
  NzPageHeaderComponent,
  NzPageHeaderModule
} from "./chunk-T7AYP6PJ.js";
import {
  FirebaseService
} from "./chunk-ZEHSEHHV.js";
import "./chunk-3UVI5PPS.js";
import {
  NzCardComponent,
  NzCardModule
} from "./chunk-QYFBAUBB.js";
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormModule
} from "./chunk-PUGAQLK6.js";
import "./chunk-VRSFMCCF.js";
import {
  NzColDirective,
  NzRowDirective
} from "./chunk-F7X6XIUF.js";
import "./chunk-ZHCODCID.js";
import {
  NzAutosizeDirective,
  NzInputDirective,
  NzInputModule
} from "./chunk-UFSNKYN5.js";
import {
  AppNotificationService,
  CommonModule,
  DatePipe,
  DefaultValueAccessor,
  FormsModule,
  HttpClientService,
  JsonPipe,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgForm,
  NgIf,
  NgModel,
  NzButtonComponent,
  NzButtonModule,
  NzTransitionPatchDirective,
  NzWaveDirective,
  ɵNgNoValidate
} from "./chunk-QZSRITVL.js";
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
  ɵɵlistener,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-UJ2IZ7EW.js";
import "./chunk-653SOEEV.js";

// node_modules/uuid/dist/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/uuid/dist/rng.js
var rnds8 = new Uint8Array(16);
function rng() {
  return crypto.getRandomValues(rnds8);
}

// node_modules/uuid/dist/v4.js
function v4(options, buf, offset) {
  if (!buf && !options && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return _v4(options, buf, offset);
}
function _v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random ?? options.rng?.() ?? rng();
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    if (offset < 0 || offset + 16 > buf.length) {
      throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
    }
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// src/app/modules/test/firestore-test/firestore-test.component.ts
var _c0 = () => ({ minRows: 3 });
function FirestoreTestComponent_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "p")(2, "strong");
    \u0275\u0275text(3, "ID:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p")(6, "strong");
    \u0275\u0275text(7, "Time:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "pre");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "json");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "hr");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const res_r1 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", res_r1.requestId);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(9, 3, res_r1.time, "medium"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 6, res_r1.data));
  }
}
function FirestoreTestComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "No results yet.");
    \u0275\u0275elementEnd();
  }
}
var FirestoreTestComponent = class _FirestoreTestComponent {
  constructor() {
    this.firebase = inject(FirebaseService);
    this.http = inject(HttpClientService);
    this.notification = inject(AppNotificationService);
    this.commandName = "sample.command";
    this.payload = '{"message": "Hello from Firestore Test"}';
    this.loading = false;
    this.results = [];
    this.unsubscribes = [];
  }
  async sendCommand() {
    const requestId = v4_default();
    this.loading = true;
    const unsub = this.firebase.subscribeToRequestId(requestId, (data) => {
      this.notification.success("Command Result (Firestore)", `Result for ${requestId}: ${JSON.stringify(data)}`, { nzDuration: 0 });
      this.results.unshift({ requestId, data, time: /* @__PURE__ */ new Date() });
    });
    this.unsubscribes.push(unsub);
    try {
      await this.http.post("/api/test/command", {
        requestId,
        commandName: this.commandName,
        payload: JSON.parse(this.payload)
      });
      this.notification.info("Success", `Command sent. Waiting for Firestore notification... ID: ${requestId}`);
    } catch (e) {
      console.error(e);
      unsub();
    } finally {
      this.loading = false;
    }
  }
  ngOnDestroy() {
    this.unsubscribes.forEach((unsub) => unsub());
  }
  static {
    this.\u0275fac = function FirestoreTestComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FirestoreTestComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FirestoreTestComponent, selectors: [["app-firestore-test"]], decls: 19, vars: 7, consts: [["nzTitle", "Firestore Realtime Notification Test"], [1, "test-content"], ["nzTitle", "Send Command & Wait for Firestore"], ["nz-form", "", "nzLayout", "vertical"], ["nz-input", "", "name", "commandName", 3, "ngModelChange", "ngModel"], ["nz-input", "", "name", "payload", 3, "ngModelChange", "ngModel", "nzAutosize"], ["nz-button", "", "nzType", "primary", 3, "click", "nzLoading"], ["nzTitle", "Recent Results", 2, "margin-top", "24px"], ["class", "result-item", 4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "result-item"]], template: function FirestoreTestComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "nz-page-header", 0);
        \u0275\u0275elementStart(1, "div", 1)(2, "nz-card", 2)(3, "form", 3)(4, "nz-form-item")(5, "nz-form-label");
        \u0275\u0275text(6, "Command Name");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "nz-form-control")(8, "input", 4);
        \u0275\u0275twoWayListener("ngModelChange", function FirestoreTestComponent_Template_input_ngModelChange_8_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.commandName, $event) || (ctx.commandName = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(9, "nz-form-item")(10, "nz-form-label");
        \u0275\u0275text(11, "Payload (JSON)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "nz-form-control")(13, "textarea", 5);
        \u0275\u0275twoWayListener("ngModelChange", function FirestoreTestComponent_Template_textarea_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.payload, $event) || (ctx.payload = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(14, "button", 6);
        \u0275\u0275listener("click", function FirestoreTestComponent_Template_button_click_14_listener() {
          return ctx.sendCommand();
        });
        \u0275\u0275text(15, " Send Command ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(16, "nz-card", 7);
        \u0275\u0275template(17, FirestoreTestComponent_div_17_Template, 14, 8, "div", 8)(18, FirestoreTestComponent_div_18_Template, 2, 0, "div", 9);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.commandName);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.payload);
        \u0275\u0275property("nzAutosize", \u0275\u0275pureFunction0(6, _c0));
        \u0275\u0275advance();
        \u0275\u0275property("nzLoading", ctx.loading);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngForOf", ctx.results);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.results.length === 0);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, NzPageHeaderModule, NzPageHeaderComponent, NzCardModule, NzCardComponent, NzButtonModule, NzButtonComponent, NzTransitionPatchDirective, NzWaveDirective, NzInputModule, NzInputDirective, NzAutosizeDirective, NzFormModule, NzColDirective, NzRowDirective, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormControlComponent, JsonPipe, DatePipe], styles: ["\n.test-content[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n.result-item[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  padding: 8px;\n  background: #f9f9f9;\n  border-radius: 4px;\n}\npre[_ngcontent-%COMP%] {\n  background: #f0f0f0;\n  padding: 8px;\n  border-radius: 4px;\n}\n/*# sourceMappingURL=firestore-test.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FirestoreTestComponent, [{
    type: Component,
    args: [{ selector: "app-firestore-test", standalone: true, imports: [
      CommonModule,
      FormsModule,
      NzPageHeaderModule,
      NzCardModule,
      NzButtonModule,
      NzInputModule,
      NzFormModule
    ], template: `<nz-page-header nzTitle="Firestore Realtime Notification Test">
</nz-page-header>

<div class="test-content">
  <nz-card nzTitle="Send Command & Wait for Firestore">
    <form nz-form nzLayout="vertical">
      <nz-form-item>
        <nz-form-label>Command Name</nz-form-label>
        <nz-form-control>
          <input nz-input [(ngModel)]="commandName" name="commandName" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Payload (JSON)</nz-form-label>
        <nz-form-control>
          <textarea nz-input [(ngModel)]="payload" name="payload" [nzAutosize]="{ minRows: 3 }"></textarea>
        </nz-form-control>
      </nz-form-item>
      <button nz-button nzType="primary" (click)="sendCommand()" [nzLoading]="loading">
        Send Command
      </button>
    </form>
  </nz-card>

  <nz-card nzTitle="Recent Results" style="margin-top: 24px;">
    <div *ngFor="let res of results" class="result-item">
      <p><strong>ID:</strong> {{ res.requestId }}</p>
      <p><strong>Time:</strong> {{ res.time | date:'medium' }}</p>
      <pre>{{ res.data | json }}</pre>
      <hr />
    </div>
    <div *ngIf="results.length === 0">No results yet.</div>
  </nz-card>
</div>
`, styles: ["/* src/app/modules/test/firestore-test/firestore-test.component.css */\n.test-content {\n  padding: 24px;\n}\n.result-item {\n  margin-bottom: 16px;\n  padding: 8px;\n  background: #f9f9f9;\n  border-radius: 4px;\n}\npre {\n  background: #f0f0f0;\n  padding: 8px;\n  border-radius: 4px;\n}\n/*# sourceMappingURL=firestore-test.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FirestoreTestComponent, { className: "FirestoreTestComponent", filePath: "src/app/modules/test/firestore-test/firestore-test.component.ts", lineNumber: 30 });
})();
export {
  FirestoreTestComponent
};
//# sourceMappingURL=chunk-BSGFHVFJ.js.map
