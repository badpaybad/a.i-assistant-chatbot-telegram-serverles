import {
  APP_CLAIMS,
  AuthService
} from "./chunk-HOOX2EWX.js";
import {
  NzAvatarComponent,
  NzAvatarModule
} from "./chunk-U4QT5BFJ.js";
import {
  FIREBASE_CONFIG
} from "./chunk-4NPCYEGD.js";
import "./chunk-IRGOCD6C.js";
import {
  NzBreadCrumbComponent,
  NzBreadCrumbItemComponent,
  NzBreadCrumbModule,
  NzContentComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzLayoutModule,
  NzSiderComponent
} from "./chunk-RDMPVVOH.js";
import {
  NzCheckboxComponent,
  NzCheckboxModule,
  NzDividerComponent,
  NzDividerModule,
  NzDropDownModule,
  NzDropdownADirective,
  NzDropdownDirective,
  NzDropdownMenuComponent,
  NzMenuDirective,
  NzMenuItemComponent,
  NzMenuModule,
  NzSubMenuComponent
} from "./chunk-YA5VTMF5.js";
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormModule
} from "./chunk-LFQY2OAB.js";
import {
  API_URL,
  ActivatedRoute,
  AppNotificationService,
  AsyncPipe,
  CommonModule,
  DefaultValueAccessor,
  DomRendererFactory2,
  DomSanitizer,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  HttpBackend,
  HttpClient,
  NZ_CONFIG,
  NavigationEnd,
  NgControlStatus,
  NgControlStatusGroup,
  NgForOf,
  NgIf,
  NonNullableFormBuilder,
  NotificationTemplateService,
  NzButtonComponent,
  NzButtonModule,
  NzColDirective,
  NzIconDirective,
  NzIconModule,
  NzInputDirective,
  NzInputGroupComponent,
  NzInputModule,
  NzRowDirective,
  NzTransitionPatchDirective,
  NzWaveDirective,
  ReactiveFormsModule,
  Router,
  RouterLink,
  RouterOutlet,
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
  TranslateService,
  Validators,
  ant_design_icons_angular_icons_exports,
  bootstrapApplication,
  en_US,
  provideHttpClient,
  provideNzI18n,
  provideRouter,
  provideTranslateService,
  registerLocaleData,
  withInterceptors,
  ɵNgNoValidate
} from "./chunk-XU754HJP.js";
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectionScheduler,
  Component,
  DOCUMENT,
  Directive,
  ElementRef,
  HostListener,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgZone,
  Renderer2,
  RendererFactory2,
  RuntimeError,
  SecurityContext,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  catchError,
  filter,
  importProvidersFrom,
  inject,
  makeEnvironmentProviders,
  performanceMarkFeature,
  provideZoneChangeDetection,
  setClassMetadata,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinvalidFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
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
  __spreadValues
} from "./chunk-MYGOUE3E.js";

// node_modules/zone.js/fesm2015/zone.js
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField2 = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var global = globalThis;
function __symbol__(name) {
  const symbolPrefix = global["__Zone_symbol_prefix"] || "__zone_symbol__";
  return symbolPrefix + name;
}
function initZone() {
  const performance = global["performance"];
  function mark(name) {
    performance && performance["mark"] && performance["mark"](name);
  }
  function performanceMeasure(name, label) {
    performance && performance["measure"] && performance["measure"](name, label);
  }
  mark("Zone");
  const _ZoneImpl = class _ZoneImpl2 {
    constructor(parent, zoneSpec) {
      __publicField2(this, "_parent");
      __publicField2(this, "_name");
      __publicField2(this, "_properties");
      __publicField2(this, "_zoneDelegate");
      this._parent = parent;
      this._name = zoneSpec ? zoneSpec.name || "unnamed" : "<root>";
      this._properties = zoneSpec && zoneSpec.properties || {};
      this._zoneDelegate = new _ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
    }
    static assertZonePatched() {
      if (global["Promise"] !== patches["ZoneAwarePromise"]) {
        throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)");
      }
    }
    static get root() {
      let zone = _ZoneImpl2.current;
      while (zone.parent) {
        zone = zone.parent;
      }
      return zone;
    }
    static get current() {
      return _currentZoneFrame.zone;
    }
    static get currentTask() {
      return _currentTask;
    }
    static __load_patch(name, fn, ignoreDuplicate = false) {
      if (patches.hasOwnProperty(name)) {
        const checkDuplicate = global[__symbol__("forceDuplicateZoneCheck")] === true;
        if (!ignoreDuplicate && checkDuplicate) {
          throw Error("Already loaded patch: " + name);
        }
      } else if (!global["__Zone_disable_" + name]) {
        const perfName = "Zone:" + name;
        mark(perfName);
        patches[name] = fn(global, _ZoneImpl2, _api);
        performanceMeasure(perfName, perfName);
      }
    }
    get parent() {
      return this._parent;
    }
    get name() {
      return this._name;
    }
    get(key) {
      const zone = this.getZoneWith(key);
      if (zone)
        return zone._properties[key];
    }
    getZoneWith(key) {
      let current = this;
      while (current) {
        if (current._properties.hasOwnProperty(key)) {
          return current;
        }
        current = current._parent;
      }
      return null;
    }
    fork(zoneSpec) {
      if (!zoneSpec)
        throw new Error("ZoneSpec required!");
      return this._zoneDelegate.fork(this, zoneSpec);
    }
    wrap(callback, source) {
      if (typeof callback !== "function") {
        throw new Error("Expecting function got: " + callback);
      }
      const _callback = this._zoneDelegate.intercept(this, callback, source);
      const zone = this;
      return function() {
        return zone.runGuarded(_callback, this, arguments, source);
      };
    }
    run(callback, applyThis, applyArgs, source) {
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
      } finally {
        _currentZoneFrame = _currentZoneFrame.parent;
      }
    }
    runGuarded(callback, applyThis = null, applyArgs, source) {
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        try {
          return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
        } catch (error) {
          if (this._zoneDelegate.handleError(this, error)) {
            throw error;
          }
        }
      } finally {
        _currentZoneFrame = _currentZoneFrame.parent;
      }
    }
    runTask(task, applyThis, applyArgs) {
      if (task.zone != this) {
        throw new Error("A task can only be run in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
      }
      const zoneTask = task;
      const { type, data: { isPeriodic = false, isRefreshable = false } = {} } = task;
      if (task.state === notScheduled && (type === eventTask || type === macroTask)) {
        return;
      }
      const reEntryGuard = task.state != running;
      reEntryGuard && zoneTask._transitionTo(running, scheduled);
      const previousTask = _currentTask;
      _currentTask = zoneTask;
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        if (type == macroTask && task.data && !isPeriodic && !isRefreshable) {
          task.cancelFn = void 0;
        }
        try {
          return this._zoneDelegate.invokeTask(this, zoneTask, applyThis, applyArgs);
        } catch (error) {
          if (this._zoneDelegate.handleError(this, error)) {
            throw error;
          }
        }
      } finally {
        const state = task.state;
        if (state !== notScheduled && state !== unknown) {
          if (type == eventTask || isPeriodic || isRefreshable && state === scheduling) {
            reEntryGuard && zoneTask._transitionTo(scheduled, running, scheduling);
          } else {
            const zoneDelegates = zoneTask._zoneDelegates;
            this._updateTaskCount(zoneTask, -1);
            reEntryGuard && zoneTask._transitionTo(notScheduled, running, notScheduled);
            if (isRefreshable) {
              zoneTask._zoneDelegates = zoneDelegates;
            }
          }
        }
        _currentZoneFrame = _currentZoneFrame.parent;
        _currentTask = previousTask;
      }
    }
    scheduleTask(task) {
      if (task.zone && task.zone !== this) {
        let newZone = this;
        while (newZone) {
          if (newZone === task.zone) {
            throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${task.zone.name}`);
          }
          newZone = newZone.parent;
        }
      }
      task._transitionTo(scheduling, notScheduled);
      const zoneDelegates = [];
      task._zoneDelegates = zoneDelegates;
      task._zone = this;
      try {
        task = this._zoneDelegate.scheduleTask(this, task);
      } catch (err) {
        task._transitionTo(unknown, scheduling, notScheduled);
        this._zoneDelegate.handleError(this, err);
        throw err;
      }
      if (task._zoneDelegates === zoneDelegates) {
        this._updateTaskCount(task, 1);
      }
      if (task.state == scheduling) {
        task._transitionTo(scheduled, scheduling);
      }
      return task;
    }
    scheduleMicroTask(source, callback, data, customSchedule) {
      return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, void 0));
    }
    scheduleMacroTask(source, callback, data, customSchedule, customCancel) {
      return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
    }
    scheduleEventTask(source, callback, data, customSchedule, customCancel) {
      return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
    }
    cancelTask(task) {
      if (task.zone != this)
        throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
      if (task.state !== scheduled && task.state !== running) {
        return;
      }
      task._transitionTo(canceling, scheduled, running);
      try {
        this._zoneDelegate.cancelTask(this, task);
      } catch (err) {
        task._transitionTo(unknown, canceling);
        this._zoneDelegate.handleError(this, err);
        throw err;
      }
      this._updateTaskCount(task, -1);
      task._transitionTo(notScheduled, canceling);
      task.runCount = -1;
      return task;
    }
    _updateTaskCount(task, count) {
      const zoneDelegates = task._zoneDelegates;
      if (count == -1) {
        task._zoneDelegates = null;
      }
      for (let i = 0; i < zoneDelegates.length; i++) {
        zoneDelegates[i]._updateTaskCount(task.type, count);
      }
    }
  };
  __publicField2(_ZoneImpl, "__symbol__", __symbol__);
  let ZoneImpl = _ZoneImpl;
  const DELEGATE_ZS = {
    name: "",
    onHasTask: (delegate, _, target, hasTaskState) => delegate.hasTask(target, hasTaskState),
    onScheduleTask: (delegate, _, target, task) => delegate.scheduleTask(target, task),
    onInvokeTask: (delegate, _, target, task, applyThis, applyArgs) => delegate.invokeTask(target, task, applyThis, applyArgs),
    onCancelTask: (delegate, _, target, task) => delegate.cancelTask(target, task)
  };
  class _ZoneDelegate {
    constructor(zone, parentDelegate, zoneSpec) {
      __publicField2(this, "_zone");
      __publicField2(this, "_taskCounts", {
        "microTask": 0,
        "macroTask": 0,
        "eventTask": 0
      });
      __publicField2(this, "_forkDlgt");
      __publicField2(this, "_forkZS");
      __publicField2(this, "_forkCurrZone");
      __publicField2(this, "_interceptDlgt");
      __publicField2(this, "_interceptZS");
      __publicField2(this, "_interceptCurrZone");
      __publicField2(this, "_invokeDlgt");
      __publicField2(this, "_invokeZS");
      __publicField2(this, "_invokeCurrZone");
      __publicField2(this, "_handleErrorDlgt");
      __publicField2(this, "_handleErrorZS");
      __publicField2(this, "_handleErrorCurrZone");
      __publicField2(this, "_scheduleTaskDlgt");
      __publicField2(this, "_scheduleTaskZS");
      __publicField2(this, "_scheduleTaskCurrZone");
      __publicField2(this, "_invokeTaskDlgt");
      __publicField2(this, "_invokeTaskZS");
      __publicField2(this, "_invokeTaskCurrZone");
      __publicField2(this, "_cancelTaskDlgt");
      __publicField2(this, "_cancelTaskZS");
      __publicField2(this, "_cancelTaskCurrZone");
      __publicField2(this, "_hasTaskDlgt");
      __publicField2(this, "_hasTaskDlgtOwner");
      __publicField2(this, "_hasTaskZS");
      __publicField2(this, "_hasTaskCurrZone");
      this._zone = zone;
      this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
      this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
      this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this._zone : parentDelegate._forkCurrZone);
      this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
      this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
      this._interceptCurrZone = zoneSpec && (zoneSpec.onIntercept ? this._zone : parentDelegate._interceptCurrZone);
      this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
      this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
      this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this._zone : parentDelegate._invokeCurrZone);
      this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
      this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
      this._handleErrorCurrZone = zoneSpec && (zoneSpec.onHandleError ? this._zone : parentDelegate._handleErrorCurrZone);
      this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
      this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
      this._scheduleTaskCurrZone = zoneSpec && (zoneSpec.onScheduleTask ? this._zone : parentDelegate._scheduleTaskCurrZone);
      this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
      this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
      this._invokeTaskCurrZone = zoneSpec && (zoneSpec.onInvokeTask ? this._zone : parentDelegate._invokeTaskCurrZone);
      this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
      this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
      this._cancelTaskCurrZone = zoneSpec && (zoneSpec.onCancelTask ? this._zone : parentDelegate._cancelTaskCurrZone);
      this._hasTaskZS = null;
      this._hasTaskDlgt = null;
      this._hasTaskDlgtOwner = null;
      this._hasTaskCurrZone = null;
      const zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
      const parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
      if (zoneSpecHasTask || parentHasTask) {
        this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
        this._hasTaskDlgt = parentDelegate;
        this._hasTaskDlgtOwner = this;
        this._hasTaskCurrZone = this._zone;
        if (!zoneSpec.onScheduleTask) {
          this._scheduleTaskZS = DELEGATE_ZS;
          this._scheduleTaskDlgt = parentDelegate;
          this._scheduleTaskCurrZone = this._zone;
        }
        if (!zoneSpec.onInvokeTask) {
          this._invokeTaskZS = DELEGATE_ZS;
          this._invokeTaskDlgt = parentDelegate;
          this._invokeTaskCurrZone = this._zone;
        }
        if (!zoneSpec.onCancelTask) {
          this._cancelTaskZS = DELEGATE_ZS;
          this._cancelTaskDlgt = parentDelegate;
          this._cancelTaskCurrZone = this._zone;
        }
      }
    }
    get zone() {
      return this._zone;
    }
    fork(targetZone, zoneSpec) {
      return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) : new ZoneImpl(targetZone, zoneSpec);
    }
    intercept(targetZone, callback, source) {
      return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) : callback;
    }
    invoke(targetZone, callback, applyThis, applyArgs, source) {
      return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) : callback.apply(applyThis, applyArgs);
    }
    handleError(targetZone, error) {
      return this._handleErrorZS ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) : true;
    }
    scheduleTask(targetZone, task) {
      let returnTask = task;
      if (this._scheduleTaskZS) {
        if (this._hasTaskZS) {
          returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
        }
        returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
        if (!returnTask)
          returnTask = task;
      } else {
        if (task.scheduleFn) {
          task.scheduleFn(task);
        } else if (task.type == microTask) {
          scheduleMicroTask(task);
        } else {
          throw new Error("Task is missing scheduleFn.");
        }
      }
      return returnTask;
    }
    invokeTask(targetZone, task, applyThis, applyArgs) {
      return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) : task.callback.apply(applyThis, applyArgs);
    }
    cancelTask(targetZone, task) {
      let value;
      if (this._cancelTaskZS) {
        value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
      } else {
        if (!task.cancelFn) {
          throw Error("Task is not cancelable");
        }
        value = task.cancelFn(task);
      }
      return value;
    }
    hasTask(targetZone, isEmpty) {
      try {
        this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
      } catch (err) {
        this.handleError(targetZone, err);
      }
    }
    _updateTaskCount(type, count) {
      const counts = this._taskCounts;
      const prev = counts[type];
      const next = counts[type] = prev + count;
      if (next < 0) {
        throw new Error("More tasks executed then were scheduled.");
      }
      if (prev == 0 || next == 0) {
        const isEmpty = {
          microTask: counts["microTask"] > 0,
          macroTask: counts["macroTask"] > 0,
          eventTask: counts["eventTask"] > 0,
          change: type
        };
        this.hasTask(this._zone, isEmpty);
      }
    }
  }
  class ZoneTask {
    constructor(type, source, callback, options, scheduleFn, cancelFn) {
      __publicField2(this, "type");
      __publicField2(this, "source");
      __publicField2(this, "invoke");
      __publicField2(this, "callback");
      __publicField2(this, "data");
      __publicField2(this, "scheduleFn");
      __publicField2(this, "cancelFn");
      __publicField2(this, "_zone", null);
      __publicField2(this, "runCount", 0);
      __publicField2(this, "_zoneDelegates", null);
      __publicField2(this, "_state", "notScheduled");
      this.type = type;
      this.source = source;
      this.data = options;
      this.scheduleFn = scheduleFn;
      this.cancelFn = cancelFn;
      if (!callback) {
        throw new Error("callback is not defined");
      }
      this.callback = callback;
      const self2 = this;
      if (type === eventTask && options && options.useG) {
        this.invoke = ZoneTask.invokeTask;
      } else {
        this.invoke = function() {
          return ZoneTask.invokeTask.call(global, self2, this, arguments);
        };
      }
    }
    static invokeTask(task, target, args) {
      if (!task) {
        task = this;
      }
      _numberOfNestedTaskFrames++;
      try {
        task.runCount++;
        return task.zone.runTask(task, target, args);
      } finally {
        if (_numberOfNestedTaskFrames === 1 && !global[enableNativeMicrotaskDraining]) {
          drainMicroTaskQueueSynchronously();
        }
        _numberOfNestedTaskFrames--;
      }
    }
    get zone() {
      return this._zone;
    }
    get state() {
      return this._state;
    }
    cancelScheduleRequest() {
      this._transitionTo(notScheduled, scheduling);
    }
    _transitionTo(toState, fromState1, fromState2) {
      if (this._state === fromState1 || this._state === fromState2) {
        this._state = toState;
        if (toState == notScheduled) {
          this._zoneDelegates = null;
        }
      } else {
        throw new Error(`${this.type} '${this.source}': can not transition to '${toState}', expecting state '${fromState1}'${fromState2 ? " or '" + fromState2 + "'" : ""}, was '${this._state}'.`);
      }
    }
    toString() {
      if (this.data && typeof this.data.handleId !== "undefined") {
        return this.data.handleId.toString();
      } else {
        return Object.prototype.toString.call(this);
      }
    }
    // add toJSON method to prevent cyclic error when
    // call JSON.stringify(zoneTask)
    toJSON() {
      return {
        type: this.type,
        state: this.state,
        source: this.source,
        zone: this.zone.name,
        runCount: this.runCount
      };
    }
  }
  const symbolSetTimeout = __symbol__("setTimeout");
  const symbolPromise = __symbol__("Promise");
  const symbolThen = __symbol__("then");
  const enableNativeMicrotaskDraining = __symbol__("enable_native_microtask_draining");
  let _microTaskQueue = [];
  let _isDrainingMicrotaskQueue = false;
  let nativeMicroTaskQueuePromise;
  function nativeScheduleMicroTask(func) {
    var _a;
    if (!nativeMicroTaskQueuePromise && global[symbolPromise]) {
      nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
    }
    if (nativeMicroTaskQueuePromise) {
      const thenFn = (_a = nativeMicroTaskQueuePromise[symbolThen]) != null ? _a : nativeMicroTaskQueuePromise["then"];
      thenFn.call(nativeMicroTaskQueuePromise, func);
    } else {
      global[symbolSetTimeout](func, 0);
    }
  }
  function scheduleMicroTask(task) {
    const isNativeDrainingEnabled = global[enableNativeMicrotaskDraining];
    const shouldDrainWithNative = isNativeDrainingEnabled && _microTaskQueue.length === 0 && !_isDrainingMicrotaskQueue;
    const shouldDrainWithoutNative = !isNativeDrainingEnabled && _numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0;
    if (shouldDrainWithNative || shouldDrainWithoutNative) {
      nativeScheduleMicroTask(drainMicroTaskQueueSynchronously);
    }
    if (task) {
      _microTaskQueue.push(task);
    }
  }
  function drainMicroTaskQueueSynchronously() {
    if (_isDrainingMicrotaskQueue) {
      return;
    }
    _isDrainingMicrotaskQueue = true;
    while (_microTaskQueue.length) {
      const queue = _microTaskQueue;
      _microTaskQueue = [];
      for (const task of queue) {
        try {
          task.zone.runTask(task, null, null);
        } catch (error) {
          _api.onUnhandledError(error);
        }
      }
    }
    if (global[enableNativeMicrotaskDraining]) {
      _isDrainingMicrotaskQueue = false;
      _api.microtaskDrainDone();
    } else {
      _api.microtaskDrainDone();
      _isDrainingMicrotaskQueue = false;
    }
  }
  const NO_ZONE = { name: "NO ZONE" };
  const notScheduled = "notScheduled", scheduling = "scheduling", scheduled = "scheduled", running = "running", canceling = "canceling", unknown = "unknown";
  const microTask = "microTask", macroTask = "macroTask", eventTask = "eventTask";
  const patches = {};
  const _api = {
    symbol: __symbol__,
    currentZoneFrame: () => _currentZoneFrame,
    onUnhandledError: noop,
    microtaskDrainDone: noop,
    scheduleMicroTask,
    showUncaughtError: () => !ZoneImpl[__symbol__("ignoreConsoleErrorUncaughtError")],
    patchEventTarget: () => [],
    patchOnProperties: noop,
    patchMethod: () => noop,
    bindArguments: () => [],
    patchThen: () => noop,
    patchMacroTask: () => noop,
    patchEventPrototype: () => noop,
    getGlobalObjects: () => void 0,
    ObjectDefineProperty: () => noop,
    ObjectGetOwnPropertyDescriptor: () => void 0,
    ObjectCreate: () => void 0,
    ArraySlice: () => [],
    patchClass: () => noop,
    wrapWithCurrentZone: () => noop,
    filterProperties: () => [],
    attachOriginToPatched: () => noop,
    _redefineProperty: () => noop,
    patchCallbacks: () => noop,
    nativeScheduleMicroTask
  };
  let _currentZoneFrame = { parent: null, zone: new ZoneImpl(null, null) };
  let _currentTask = null;
  let _numberOfNestedTaskFrames = 0;
  function noop() {
  }
  performanceMeasure("Zone", "Zone");
  return ZoneImpl;
}
function loadZone() {
  var _a;
  const global2 = globalThis;
  const checkDuplicate = global2[__symbol__("forceDuplicateZoneCheck")] === true;
  if (global2["Zone"] && (checkDuplicate || typeof global2["Zone"].__symbol__ !== "function")) {
    throw new Error("Zone already loaded.");
  }
  (_a = global2["Zone"]) != null ? _a : global2["Zone"] = initZone();
  return global2["Zone"];
}
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ObjectDefineProperty = Object.defineProperty;
var ObjectGetPrototypeOf = Object.getPrototypeOf;
var ObjectCreate = Object.create;
var ArraySlice = Array.prototype.slice;
var ADD_EVENT_LISTENER_STR = "addEventListener";
var REMOVE_EVENT_LISTENER_STR = "removeEventListener";
var ZONE_SYMBOL_ADD_EVENT_LISTENER = __symbol__(ADD_EVENT_LISTENER_STR);
var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = __symbol__(REMOVE_EVENT_LISTENER_STR);
var TRUE_STR = "true";
var FALSE_STR = "false";
var ZONE_SYMBOL_PREFIX = __symbol__("");
function wrapWithCurrentZone(callback, source) {
  return Zone.current.wrap(callback, source);
}
function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
  return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
}
var zoneSymbol = __symbol__;
var isWindowExists = typeof window !== "undefined";
var internalWindow = isWindowExists ? window : void 0;
var _global = isWindowExists && internalWindow || globalThis;
var REMOVE_ATTRIBUTE = "removeAttribute";
function bindArguments(args, source) {
  for (let i = args.length - 1; i >= 0; i--) {
    if (typeof args[i] === "function") {
      args[i] = wrapWithCurrentZone(args[i], source + "_" + i);
    }
  }
  return args;
}
function patchPrototype(prototype, fnNames) {
  const source = prototype.constructor["name"];
  for (let i = 0; i < fnNames.length; i++) {
    const name = fnNames[i];
    const delegate = prototype[name];
    if (delegate) {
      const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name);
      if (!isPropertyWritable(prototypeDesc)) {
        continue;
      }
      prototype[name] = ((delegate2) => {
        const patched = function() {
          return delegate2.apply(this, bindArguments(arguments, source + "." + name));
        };
        attachOriginToPatched(patched, delegate2);
        return patched;
      })(delegate);
    }
  }
}
function isPropertyWritable(propertyDesc) {
  if (!propertyDesc) {
    return true;
  }
  if (propertyDesc.writable === false) {
    return false;
  }
  return !(typeof propertyDesc.get === "function" && typeof propertyDesc.set === "undefined");
}
var isWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
var isNode = !("nw" in _global) && typeof _global.process !== "undefined" && _global.process.toString() === "[object process]";
var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
var isMix = typeof _global.process !== "undefined" && _global.process.toString() === "[object process]" && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
var zoneSymbolEventNames = {};
var enableBeforeunloadSymbol = zoneSymbol("enable_beforeunload");
var wrapFn = function(event) {
  event = event || _global.event;
  if (!event) {
    return;
  }
  let eventNameSymbol = zoneSymbolEventNames[event.type];
  if (!eventNameSymbol) {
    eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol("ON_PROPERTY" + event.type);
  }
  const target = this || event.target || _global;
  const listener = target[eventNameSymbol];
  let result;
  if (isBrowser && target === internalWindow && event.type === "error") {
    const errorEvent = event;
    result = listener && listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
    if (result === true) {
      event.preventDefault();
    }
  } else {
    result = listener && listener.apply(this, arguments);
    if (
      // https://github.com/angular/angular/issues/47579
      // https://www.w3.org/TR/2011/WD-html5-20110525/history.html#beforeunloadevent
      // This is the only specific case we should check for. The spec defines that the
      // `returnValue` attribute represents the message to show the user. When the event
      // is created, this attribute must be set to the empty string.
      event.type === "beforeunload" && // To prevent any breaking changes resulting from this change, given that
      // it was already causing a significant number of failures in G3, we have hidden
      // that behavior behind a global configuration flag. Consumers can enable this
      // flag explicitly if they want the `beforeunload` event to be handled as defined
      // in the specification.
      _global[enableBeforeunloadSymbol] && // The IDL event definition is `attribute DOMString returnValue`, so we check whether
      // `typeof result` is a string.
      typeof result === "string"
    ) {
      event.returnValue = result;
    } else if (result != void 0 && !result) {
      event.preventDefault();
    }
  }
  return result;
};
function patchProperty(obj, prop, prototype) {
  let desc = ObjectGetOwnPropertyDescriptor(obj, prop);
  if (!desc && prototype) {
    const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
    if (prototypeDesc) {
      desc = { enumerable: true, configurable: true };
    }
  }
  if (!desc || !desc.configurable) {
    return;
  }
  const onPropPatchedSymbol = zoneSymbol("on" + prop + "patched");
  if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
    return;
  }
  delete desc.writable;
  delete desc.value;
  const originalDescGet = desc.get;
  const originalDescSet = desc.set;
  const eventName = prop.slice(2);
  let eventNameSymbol = zoneSymbolEventNames[eventName];
  if (!eventNameSymbol) {
    eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol("ON_PROPERTY" + eventName);
  }
  desc.set = function(newValue) {
    let target = this;
    if (!target && obj === _global) {
      target = _global;
    }
    if (!target) {
      return;
    }
    const previousValue = target[eventNameSymbol];
    if (typeof previousValue === "function") {
      target.removeEventListener(eventName, wrapFn);
    }
    originalDescSet == null ? void 0 : originalDescSet.call(target, null);
    target[eventNameSymbol] = newValue;
    if (typeof newValue === "function") {
      target.addEventListener(eventName, wrapFn, false);
    }
  };
  desc.get = function() {
    let target = this;
    if (!target && obj === _global) {
      target = _global;
    }
    if (!target) {
      return null;
    }
    const listener = target[eventNameSymbol];
    if (listener) {
      return listener;
    } else if (originalDescGet) {
      let value = originalDescGet.call(this);
      if (value) {
        desc.set.call(this, value);
        if (typeof target[REMOVE_ATTRIBUTE] === "function") {
          target.removeAttribute(prop);
        }
        return value;
      }
    }
    return null;
  };
  ObjectDefineProperty(obj, prop, desc);
  obj[onPropPatchedSymbol] = true;
}
function patchOnProperties(obj, properties, prototype) {
  if (properties) {
    for (let i = 0; i < properties.length; i++) {
      patchProperty(obj, "on" + properties[i], prototype);
    }
  } else {
    const onProperties = [];
    for (const prop in obj) {
      if (prop.slice(0, 2) == "on") {
        onProperties.push(prop);
      }
    }
    for (let j = 0; j < onProperties.length; j++) {
      patchProperty(obj, onProperties[j], prototype);
    }
  }
}
var originalInstanceKey = zoneSymbol("originalInstance");
function patchClass(className) {
  const OriginalClass = _global[className];
  if (!OriginalClass)
    return;
  _global[zoneSymbol(className)] = OriginalClass;
  _global[className] = function() {
    const a = bindArguments(arguments, className);
    switch (a.length) {
      case 0:
        this[originalInstanceKey] = new OriginalClass();
        break;
      case 1:
        this[originalInstanceKey] = new OriginalClass(a[0]);
        break;
      case 2:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
        break;
      case 3:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
        break;
      case 4:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
        break;
      default:
        throw new Error("Arg list too long.");
    }
  };
  attachOriginToPatched(_global[className], OriginalClass);
  const instance = new OriginalClass(function() {
  });
  let prop;
  for (prop in instance) {
    if (className === "XMLHttpRequest" && prop === "responseBlob")
      continue;
    (function(prop2) {
      if (typeof instance[prop2] === "function") {
        _global[className].prototype[prop2] = function() {
          return this[originalInstanceKey][prop2].apply(this[originalInstanceKey], arguments);
        };
      } else {
        ObjectDefineProperty(_global[className].prototype, prop2, {
          set: function(fn) {
            if (typeof fn === "function") {
              this[originalInstanceKey][prop2] = wrapWithCurrentZone(fn, className + "." + prop2);
              attachOriginToPatched(this[originalInstanceKey][prop2], fn);
            } else {
              this[originalInstanceKey][prop2] = fn;
            }
          },
          get: function() {
            return this[originalInstanceKey][prop2];
          }
        });
      }
    })(prop);
  }
  for (prop in OriginalClass) {
    if (prop !== "prototype" && OriginalClass.hasOwnProperty(prop)) {
      _global[className][prop] = OriginalClass[prop];
    }
  }
}
function copySymbolProperties(src, dest) {
  if (typeof Object.getOwnPropertySymbols !== "function") {
    return;
  }
  const symbols = Object.getOwnPropertySymbols(src);
  symbols.forEach((symbol) => {
    const desc = Object.getOwnPropertyDescriptor(src, symbol);
    Object.defineProperty(dest, symbol, {
      get: function() {
        return src[symbol];
      },
      set: function(value) {
        if (desc && (!desc.writable || typeof desc.set !== "function")) {
          return;
        }
        src[symbol] = value;
      },
      enumerable: desc ? desc.enumerable : true,
      configurable: desc ? desc.configurable : true
    });
  });
}
var shouldCopySymbolProperties = false;
function patchMethod(target, name, patchFn) {
  let proto = target;
  while (proto && !proto.hasOwnProperty(name)) {
    proto = ObjectGetPrototypeOf(proto);
  }
  if (!proto && target[name]) {
    proto = target;
  }
  const delegateName = zoneSymbol(name);
  let delegate = null;
  if (proto && (!(delegate = proto[delegateName]) || !proto.hasOwnProperty(delegateName))) {
    delegate = proto[delegateName] = proto[name];
    const desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
    if (isPropertyWritable(desc)) {
      const patchDelegate = patchFn(delegate, delegateName, name);
      proto[name] = function() {
        return patchDelegate(this, arguments);
      };
      attachOriginToPatched(proto[name], delegate);
      if (shouldCopySymbolProperties) {
        copySymbolProperties(delegate, proto[name]);
      }
    }
  }
  return delegate;
}
function patchMacroTask(obj, funcName, metaCreator) {
  let setNative = null;
  function scheduleTask(task) {
    const data = task.data;
    data.args[data.cbIdx] = function() {
      task.invoke.apply(this, arguments);
    };
    setNative.apply(data.target, data.args);
    return task;
  }
  setNative = patchMethod(obj, funcName, (delegate) => function(self2, args) {
    const meta = metaCreator(self2, args);
    if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === "function") {
      return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
    } else {
      return delegate.apply(self2, args);
    }
  });
}
function attachOriginToPatched(patched, original) {
  patched[zoneSymbol("OriginalDelegate")] = original;
}
function isFunction(value) {
  return typeof value === "function";
}
function isNumber(value) {
  return typeof value === "number";
}
var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
  useG: true
};
var zoneSymbolEventNames2 = {};
var globalSources = {};
var EVENT_NAME_SYMBOL_REGX = new RegExp("^" + ZONE_SYMBOL_PREFIX + "(\\w+)(true|false)$");
var IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol("propagationStopped");
function prepareEventNames(eventName, eventNameToString) {
  const falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
  const trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
  const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
  const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
  zoneSymbolEventNames2[eventName] = {};
  zoneSymbolEventNames2[eventName][FALSE_STR] = symbol;
  zoneSymbolEventNames2[eventName][TRUE_STR] = symbolCapture;
}
function patchEventTarget(_global2, api, apis, patchOptions) {
  const ADD_EVENT_LISTENER = patchOptions && patchOptions.add || ADD_EVENT_LISTENER_STR;
  const REMOVE_EVENT_LISTENER = patchOptions && patchOptions.rm || REMOVE_EVENT_LISTENER_STR;
  const LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.listeners || "eventListeners";
  const REMOVE_ALL_LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.rmAll || "removeAllListeners";
  const zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
  const ADD_EVENT_LISTENER_SOURCE = "." + ADD_EVENT_LISTENER + ":";
  const PREPEND_EVENT_LISTENER = "prependListener";
  const PREPEND_EVENT_LISTENER_SOURCE = "." + PREPEND_EVENT_LISTENER + ":";
  const invokeTask = function(task, target, event) {
    if (task.isRemoved) {
      return;
    }
    const delegate = task.callback;
    if (typeof delegate === "object" && delegate.handleEvent) {
      task.callback = (event2) => delegate.handleEvent(event2);
      task.originalDelegate = delegate;
    }
    let error;
    try {
      task.invoke(task, target, [event]);
    } catch (err) {
      error = err;
    }
    const options = task.options;
    if (options && typeof options === "object" && options.once) {
      const delegate2 = task.originalDelegate ? task.originalDelegate : task.callback;
      target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate2, options);
    }
    return error;
  };
  function globalCallback(context, event, isCapture) {
    event = event || _global2.event;
    if (!event) {
      return;
    }
    const target = context || event.target || _global2;
    const tasks = target[zoneSymbolEventNames2[event.type][isCapture ? TRUE_STR : FALSE_STR]];
    if (tasks) {
      const errors = [];
      if (tasks.length === 1) {
        const err = invokeTask(tasks[0], target, event);
        err && errors.push(err);
      } else {
        const copyTasks = tasks.slice();
        for (let i = 0; i < copyTasks.length; i++) {
          if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
            break;
          }
          const err = invokeTask(copyTasks[i], target, event);
          err && errors.push(err);
        }
      }
      if (errors.length === 1) {
        throw errors[0];
      } else {
        for (let i = 0; i < errors.length; i++) {
          const err = errors[i];
          api.nativeScheduleMicroTask(() => {
            throw err;
          });
        }
      }
    }
  }
  const globalZoneAwareCallback = function(event) {
    return globalCallback(this, event, false);
  };
  const globalZoneAwareCaptureCallback = function(event) {
    return globalCallback(this, event, true);
  };
  function patchEventTargetMethods(obj, patchOptions2) {
    if (!obj) {
      return false;
    }
    let useGlobalCallback = true;
    if (patchOptions2 && patchOptions2.useG !== void 0) {
      useGlobalCallback = patchOptions2.useG;
    }
    const validateHandler = patchOptions2 && patchOptions2.vh;
    let checkDuplicate = true;
    if (patchOptions2 && patchOptions2.chkDup !== void 0) {
      checkDuplicate = patchOptions2.chkDup;
    }
    let returnTarget = false;
    if (patchOptions2 && patchOptions2.rt !== void 0) {
      returnTarget = patchOptions2.rt;
    }
    let proto = obj;
    while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
      proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && obj[ADD_EVENT_LISTENER]) {
      proto = obj;
    }
    if (!proto) {
      return false;
    }
    if (proto[zoneSymbolAddEventListener]) {
      return false;
    }
    const eventNameToString = patchOptions2 && patchOptions2.eventNameToString;
    const taskData = {};
    const nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
    const nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] = proto[REMOVE_EVENT_LISTENER];
    const nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] = proto[LISTENERS_EVENT_LISTENER];
    const nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] = proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
    let nativePrependEventListener;
    if (patchOptions2 && patchOptions2.prepend) {
      nativePrependEventListener = proto[zoneSymbol(patchOptions2.prepend)] = proto[patchOptions2.prepend];
    }
    function buildEventListenerOptions(options, passive) {
      if (!passive) {
        return options;
      }
      if (typeof options === "boolean") {
        return { capture: options, passive: true };
      }
      if (!options) {
        return { passive: true };
      }
      if (typeof options === "object" && options.passive !== false) {
        return __spreadProps(__spreadValues2({}, options), { passive: true });
      }
      return options;
    }
    const customScheduleGlobal = function(task) {
      if (taskData.isExisting) {
        return;
      }
      return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
    };
    const customCancelGlobal = function(task) {
      if (!task.isRemoved) {
        const symbolEventNames = zoneSymbolEventNames2[task.eventName];
        let symbolEventName;
        if (symbolEventNames) {
          symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
        }
        const existingTasks = symbolEventName && task.target[symbolEventName];
        if (existingTasks) {
          for (let i = 0; i < existingTasks.length; i++) {
            const existingTask = existingTasks[i];
            if (existingTask === task) {
              existingTasks.splice(i, 1);
              task.isRemoved = true;
              if (task.removeAbortListener) {
                task.removeAbortListener();
                task.removeAbortListener = null;
              }
              if (existingTasks.length === 0) {
                task.allRemoved = true;
                task.target[symbolEventName] = null;
              }
              break;
            }
          }
        }
      }
      if (!task.allRemoved) {
        return;
      }
      return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
    };
    const customScheduleNonGlobal = function(task) {
      return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
    };
    const customSchedulePrepend = function(task) {
      return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
    };
    const customCancelNonGlobal = function(task) {
      return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
    };
    const customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
    const customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
    const compareTaskCallbackVsDelegate = function(task, delegate) {
      const typeOfDelegate = typeof delegate;
      return typeOfDelegate === "function" && task.callback === delegate || typeOfDelegate === "object" && task.originalDelegate === delegate;
    };
    const compare = (patchOptions2 == null ? void 0 : patchOptions2.diff) || compareTaskCallbackVsDelegate;
    const unpatchedEvents = Zone[zoneSymbol("UNPATCHED_EVENTS")];
    const passiveEvents = _global2[zoneSymbol("PASSIVE_EVENTS")];
    function copyEventListenerOptions(options) {
      if (typeof options === "object" && options !== null) {
        const newOptions = __spreadValues2({}, options);
        if (options.signal) {
          newOptions.signal = options.signal;
        }
        return newOptions;
      }
      return options;
    }
    const makeAddListener = function(nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget2 = false, prepend = false) {
      return function() {
        const target = this || _global2;
        let eventName = arguments[0];
        if (patchOptions2 && patchOptions2.transferEventName) {
          eventName = patchOptions2.transferEventName(eventName);
        }
        let delegate = arguments[1];
        if (!delegate) {
          return nativeListener.apply(this, arguments);
        }
        if (isNode && eventName === "uncaughtException") {
          return nativeListener.apply(this, arguments);
        }
        let isEventListenerObject = false;
        if (typeof delegate !== "function") {
          if (!delegate.handleEvent) {
            return nativeListener.apply(this, arguments);
          }
          isEventListenerObject = true;
        }
        if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
          return;
        }
        const passive = !!passiveEvents && passiveEvents.indexOf(eventName) !== -1;
        const options = copyEventListenerOptions(buildEventListenerOptions(arguments[2], passive));
        const signal = options == null ? void 0 : options.signal;
        if (signal == null ? void 0 : signal.aborted) {
          return;
        }
        if (unpatchedEvents) {
          for (let i = 0; i < unpatchedEvents.length; i++) {
            if (eventName === unpatchedEvents[i]) {
              if (passive) {
                return nativeListener.call(target, eventName, delegate, options);
              } else {
                return nativeListener.apply(this, arguments);
              }
            }
          }
        }
        const capture = !options ? false : typeof options === "boolean" ? true : options.capture;
        const once = options && typeof options === "object" ? options.once : false;
        const zone = Zone.current;
        let symbolEventNames = zoneSymbolEventNames2[eventName];
        if (!symbolEventNames) {
          prepareEventNames(eventName, eventNameToString);
          symbolEventNames = zoneSymbolEventNames2[eventName];
        }
        const symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
        let existingTasks = target[symbolEventName];
        let isExisting = false;
        if (existingTasks) {
          isExisting = true;
          if (checkDuplicate) {
            for (let i = 0; i < existingTasks.length; i++) {
              if (compare(existingTasks[i], delegate)) {
                return;
              }
            }
          }
        } else {
          existingTasks = target[symbolEventName] = [];
        }
        let source;
        const constructorName = target.constructor["name"];
        const targetSource = globalSources[constructorName];
        if (targetSource) {
          source = targetSource[eventName];
        }
        if (!source) {
          source = constructorName + addSource + (eventNameToString ? eventNameToString(eventName) : eventName);
        }
        taskData.options = options;
        if (once) {
          taskData.options.once = false;
        }
        taskData.target = target;
        taskData.capture = capture;
        taskData.eventName = eventName;
        taskData.isExisting = isExisting;
        const data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : void 0;
        if (data) {
          data.taskData = taskData;
        }
        if (signal) {
          taskData.options.signal = void 0;
        }
        const task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
        if (signal) {
          taskData.options.signal = signal;
          const onAbort = () => task.zone.cancelTask(task);
          nativeListener.call(signal, "abort", onAbort, { once: true });
          task.removeAbortListener = () => signal.removeEventListener("abort", onAbort);
        }
        taskData.target = null;
        if (data) {
          data.taskData = null;
        }
        if (once) {
          taskData.options.once = true;
        }
        if (typeof task.options !== "boolean") {
          task.options = options;
        }
        task.target = target;
        task.capture = capture;
        task.eventName = eventName;
        if (isEventListenerObject) {
          task.originalDelegate = delegate;
        }
        if (!prepend) {
          existingTasks.push(task);
        } else {
          existingTasks.unshift(task);
        }
        if (returnTarget2) {
          return target;
        }
      };
    };
    proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
    if (nativePrependEventListener) {
      proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
    }
    proto[REMOVE_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (patchOptions2 && patchOptions2.transferEventName) {
        eventName = patchOptions2.transferEventName(eventName);
      }
      const options = arguments[2];
      const capture = !options ? false : typeof options === "boolean" ? true : options.capture;
      const delegate = arguments[1];
      if (!delegate) {
        return nativeRemoveEventListener.apply(this, arguments);
      }
      if (validateHandler && !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
        return;
      }
      const symbolEventNames = zoneSymbolEventNames2[eventName];
      let symbolEventName;
      if (symbolEventNames) {
        symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
      }
      const existingTasks = symbolEventName && target[symbolEventName];
      if (existingTasks) {
        for (let i = 0; i < existingTasks.length; i++) {
          const existingTask = existingTasks[i];
          if (compare(existingTask, delegate)) {
            existingTasks.splice(i, 1);
            existingTask.isRemoved = true;
            if (existingTasks.length === 0) {
              existingTask.allRemoved = true;
              target[symbolEventName] = null;
              if (!capture && typeof eventName === "string") {
                const onPropertySymbol = ZONE_SYMBOL_PREFIX + "ON_PROPERTY" + eventName;
                target[onPropertySymbol] = null;
              }
            }
            existingTask.zone.cancelTask(existingTask);
            if (returnTarget) {
              return target;
            }
            return;
          }
        }
      }
      return nativeRemoveEventListener.apply(this, arguments);
    };
    proto[LISTENERS_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (patchOptions2 && patchOptions2.transferEventName) {
        eventName = patchOptions2.transferEventName(eventName);
      }
      const listeners = [];
      const tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
        listeners.push(delegate);
      }
      return listeners;
    };
    proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (!eventName) {
        const keys = Object.keys(target);
        for (let i = 0; i < keys.length; i++) {
          const prop = keys[i];
          const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
          let evtName = match && match[1];
          if (evtName && evtName !== "removeListener") {
            this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
          }
        }
        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, "removeListener");
      } else {
        if (patchOptions2 && patchOptions2.transferEventName) {
          eventName = patchOptions2.transferEventName(eventName);
        }
        const symbolEventNames = zoneSymbolEventNames2[eventName];
        if (symbolEventNames) {
          const symbolEventName = symbolEventNames[FALSE_STR];
          const symbolCaptureEventName = symbolEventNames[TRUE_STR];
          const tasks = target[symbolEventName];
          const captureTasks = target[symbolCaptureEventName];
          if (tasks) {
            const removeTasks = tasks.slice();
            for (let i = 0; i < removeTasks.length; i++) {
              const task = removeTasks[i];
              let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
              this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
            }
          }
          if (captureTasks) {
            const removeTasks = captureTasks.slice();
            for (let i = 0; i < removeTasks.length; i++) {
              const task = removeTasks[i];
              let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
              this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
            }
          }
        }
      }
      if (returnTarget) {
        return this;
      }
    };
    attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
    attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
    if (nativeRemoveAllListeners) {
      attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
    }
    if (nativeListeners) {
      attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
    }
    return true;
  }
  let results = [];
  for (let i = 0; i < apis.length; i++) {
    results[i] = patchEventTargetMethods(apis[i], patchOptions);
  }
  return results;
}
function findEventTasks(target, eventName) {
  if (!eventName) {
    const foundTasks = [];
    for (let prop in target) {
      const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
      let evtName = match && match[1];
      if (evtName && (!eventName || evtName === eventName)) {
        const tasks = target[prop];
        if (tasks) {
          for (let i = 0; i < tasks.length; i++) {
            foundTasks.push(tasks[i]);
          }
        }
      }
    }
    return foundTasks;
  }
  let symbolEventName = zoneSymbolEventNames2[eventName];
  if (!symbolEventName) {
    prepareEventNames(eventName);
    symbolEventName = zoneSymbolEventNames2[eventName];
  }
  const captureFalseTasks = target[symbolEventName[FALSE_STR]];
  const captureTrueTasks = target[symbolEventName[TRUE_STR]];
  if (!captureFalseTasks) {
    return captureTrueTasks ? captureTrueTasks.slice() : [];
  } else {
    return captureTrueTasks ? captureFalseTasks.concat(captureTrueTasks) : captureFalseTasks.slice();
  }
}
function patchEventPrototype(global2, api) {
  const Event = global2["Event"];
  if (Event && Event.prototype) {
    api.patchMethod(Event.prototype, "stopImmediatePropagation", (delegate) => function(self2, args) {
      self2[IMMEDIATE_PROPAGATION_SYMBOL] = true;
      delegate && delegate.apply(self2, args);
    });
  }
}
function patchQueueMicrotask(global2, api) {
  api.patchMethod(global2, "queueMicrotask", (delegate) => {
    return function(self2, args) {
      Zone.current.scheduleMicroTask("queueMicrotask", args[0]);
    };
  });
}
var taskSymbol = zoneSymbol("zoneTask");
function patchTimer(window2, setName, cancelName, nameSuffix) {
  let setNative = null;
  let clearNative = null;
  setName += nameSuffix;
  cancelName += nameSuffix;
  const tasksByHandleId = {};
  function scheduleTask(task) {
    const data = task.data;
    data.args[0] = function() {
      return task.invoke.apply(this, arguments);
    };
    const handleOrId = setNative.apply(window2, data.args);
    if (isNumber(handleOrId)) {
      data.handleId = handleOrId;
    } else {
      data.handle = handleOrId;
      data.isRefreshable = isFunction(handleOrId.refresh);
    }
    return task;
  }
  function clearTask(task) {
    const { handle, handleId } = task.data;
    return clearNative.call(window2, handle != null ? handle : handleId);
  }
  setNative = patchMethod(window2, setName, (delegate) => function(self2, args) {
    var _a;
    if (isFunction(args[0])) {
      const options = {
        isRefreshable: false,
        isPeriodic: nameSuffix === "Interval",
        delay: nameSuffix === "Timeout" || nameSuffix === "Interval" ? args[1] || 0 : void 0,
        args
      };
      const callback = args[0];
      args[0] = function timer() {
        try {
          return callback.apply(this, arguments);
        } finally {
          const { handle: handle2, handleId: handleId2, isPeriodic: isPeriodic2, isRefreshable: isRefreshable2 } = options;
          if (!isPeriodic2 && !isRefreshable2) {
            if (handleId2) {
              delete tasksByHandleId[handleId2];
            } else if (handle2) {
              handle2[taskSymbol] = null;
            }
          }
        }
      };
      const task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
      if (!task) {
        return task;
      }
      const { handleId, handle, isRefreshable, isPeriodic } = task.data;
      if (handleId) {
        tasksByHandleId[handleId] = task;
      } else if (handle) {
        handle[taskSymbol] = task;
        if (isRefreshable && !isPeriodic) {
          const originalRefresh = handle.refresh;
          handle.refresh = function() {
            const { zone, state } = task;
            if (state === "notScheduled") {
              task._state = "scheduled";
              zone._updateTaskCount(task, 1);
            } else if (state === "running") {
              task._state = "scheduling";
            }
            return originalRefresh.call(this);
          };
        }
      }
      return (_a = handle != null ? handle : handleId) != null ? _a : task;
    } else {
      return delegate.apply(window2, args);
    }
  });
  clearNative = patchMethod(window2, cancelName, (delegate) => function(self2, args) {
    const id = args[0];
    let task;
    if (isNumber(id)) {
      task = tasksByHandleId[id];
      delete tasksByHandleId[id];
    } else {
      task = id == null ? void 0 : id[taskSymbol];
      if (task) {
        id[taskSymbol] = null;
      } else {
        task = id;
      }
    }
    if (task == null ? void 0 : task.type) {
      if (task.cancelFn) {
        task.zone.cancelTask(task);
      }
    } else {
      delegate.apply(window2, args);
    }
  });
}
function patchCustomElements(_global2, api) {
  const { isBrowser: isBrowser2, isMix: isMix2 } = api.getGlobalObjects();
  if (!isBrowser2 && !isMix2 || !_global2["customElements"] || !("customElements" in _global2)) {
    return;
  }
  const callbacks = [
    "connectedCallback",
    "disconnectedCallback",
    "adoptedCallback",
    "attributeChangedCallback",
    "formAssociatedCallback",
    "formDisabledCallback",
    "formResetCallback",
    "formStateRestoreCallback"
  ];
  api.patchCallbacks(api, _global2.customElements, "customElements", "define", callbacks);
}
function eventTargetPatch(_global2, api) {
  if (Zone[api.symbol("patchEventTarget")]) {
    return;
  }
  const { eventNames, zoneSymbolEventNames: zoneSymbolEventNames3, TRUE_STR: TRUE_STR2, FALSE_STR: FALSE_STR2, ZONE_SYMBOL_PREFIX: ZONE_SYMBOL_PREFIX2 } = api.getGlobalObjects();
  for (let i = 0; i < eventNames.length; i++) {
    const eventName = eventNames[i];
    const falseEventName = eventName + FALSE_STR2;
    const trueEventName = eventName + TRUE_STR2;
    const symbol = ZONE_SYMBOL_PREFIX2 + falseEventName;
    const symbolCapture = ZONE_SYMBOL_PREFIX2 + trueEventName;
    zoneSymbolEventNames3[eventName] = {};
    zoneSymbolEventNames3[eventName][FALSE_STR2] = symbol;
    zoneSymbolEventNames3[eventName][TRUE_STR2] = symbolCapture;
  }
  const EVENT_TARGET = _global2["EventTarget"];
  if (!EVENT_TARGET || !EVENT_TARGET.prototype) {
    return;
  }
  api.patchEventTarget(_global2, api, [EVENT_TARGET && EVENT_TARGET.prototype]);
  return true;
}
function patchEvent(global2, api) {
  api.patchEventPrototype(global2, api);
}
function filterProperties(target, onProperties, ignoreProperties) {
  if (!ignoreProperties || ignoreProperties.length === 0) {
    return onProperties;
  }
  const tip = ignoreProperties.filter((ip) => ip.target === target);
  if (tip.length === 0) {
    return onProperties;
  }
  const targetIgnoreProperties = tip[0].ignoreProperties;
  return onProperties.filter((op) => targetIgnoreProperties.indexOf(op) === -1);
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
  if (!target) {
    return;
  }
  const filteredProperties = filterProperties(target, onProperties, ignoreProperties);
  patchOnProperties(target, filteredProperties, prototype);
}
function getOnEventNames(target) {
  return Object.getOwnPropertyNames(target).filter((name) => name.startsWith("on") && name.length > 2).map((name) => name.substring(2));
}
function propertyDescriptorPatch(api, _global2) {
  if (isNode && !isMix) {
    return;
  }
  if (Zone[api.symbol("patchEvents")]) {
    return;
  }
  const ignoreProperties = _global2["__Zone_ignore_on_properties"];
  let patchTargets = [];
  if (isBrowser) {
    const internalWindow2 = window;
    patchTargets = patchTargets.concat([
      "Document",
      "SVGElement",
      "Element",
      "HTMLElement",
      "HTMLBodyElement",
      "HTMLMediaElement",
      "HTMLFrameSetElement",
      "HTMLFrameElement",
      "HTMLIFrameElement",
      "HTMLMarqueeElement",
      "Worker"
    ]);
    patchFilteredProperties(internalWindow2, getOnEventNames(internalWindow2), ignoreProperties, ObjectGetPrototypeOf(internalWindow2));
  }
  patchTargets = patchTargets.concat([
    "XMLHttpRequest",
    "XMLHttpRequestEventTarget",
    "IDBIndex",
    "IDBRequest",
    "IDBOpenDBRequest",
    "IDBDatabase",
    "IDBTransaction",
    "IDBCursor",
    "WebSocket"
  ]);
  for (let i = 0; i < patchTargets.length; i++) {
    const target = _global2[patchTargets[i]];
    (target == null ? void 0 : target.prototype) && patchFilteredProperties(target.prototype, getOnEventNames(target.prototype), ignoreProperties);
  }
}
function patchBrowser(Zone3) {
  Zone3.__load_patch("timers", (global2) => {
    const set = "set";
    const clear = "clear";
    patchTimer(global2, set, clear, "Timeout");
    patchTimer(global2, set, clear, "Interval");
    patchTimer(global2, set, clear, "Immediate");
  });
  Zone3.__load_patch("requestAnimationFrame", (global2) => {
    patchTimer(global2, "request", "cancel", "AnimationFrame");
    patchTimer(global2, "mozRequest", "mozCancel", "AnimationFrame");
    patchTimer(global2, "webkitRequest", "webkitCancel", "AnimationFrame");
  });
  Zone3.__load_patch("blocking", (global2, Zone4) => {
    const blockingMethods = ["alert", "prompt", "confirm"];
    for (let i = 0; i < blockingMethods.length; i++) {
      const name = blockingMethods[i];
      patchMethod(global2, name, (delegate, symbol, name2) => {
        return function(s, args) {
          return Zone4.current.run(delegate, global2, args, name2);
        };
      });
    }
  });
  Zone3.__load_patch("EventTarget", (global2, Zone4, api) => {
    patchEvent(global2, api);
    eventTargetPatch(global2, api);
    const XMLHttpRequestEventTarget = global2["XMLHttpRequestEventTarget"];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
      api.patchEventTarget(global2, api, [XMLHttpRequestEventTarget.prototype]);
    }
  });
  Zone3.__load_patch("MutationObserver", (global2, Zone4, api) => {
    patchClass("MutationObserver");
    patchClass("WebKitMutationObserver");
  });
  Zone3.__load_patch("IntersectionObserver", (global2, Zone4, api) => {
    patchClass("IntersectionObserver");
  });
  Zone3.__load_patch("FileReader", (global2, Zone4, api) => {
    patchClass("FileReader");
  });
  Zone3.__load_patch("on_property", (global2, Zone4, api) => {
    propertyDescriptorPatch(api, global2);
  });
  Zone3.__load_patch("customElements", (global2, Zone4, api) => {
    patchCustomElements(global2, api);
  });
  Zone3.__load_patch("XHR", (global2, Zone4) => {
    patchXHR(global2);
    const XHR_TASK = zoneSymbol("xhrTask");
    const XHR_SYNC = zoneSymbol("xhrSync");
    const XHR_LISTENER = zoneSymbol("xhrListener");
    const XHR_SCHEDULED = zoneSymbol("xhrScheduled");
    const XHR_URL = zoneSymbol("xhrURL");
    const XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol("xhrErrorBeforeScheduled");
    function patchXHR(window2) {
      const XMLHttpRequest = window2["XMLHttpRequest"];
      if (!XMLHttpRequest) {
        return;
      }
      const XMLHttpRequestPrototype = XMLHttpRequest.prototype;
      function findPendingTask(target) {
        return target[XHR_TASK];
      }
      let oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
      let oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
      if (!oriAddListener) {
        const XMLHttpRequestEventTarget = window2["XMLHttpRequestEventTarget"];
        if (XMLHttpRequestEventTarget) {
          const XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
          oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        }
      }
      const READY_STATE_CHANGE = "readystatechange";
      const SCHEDULED = "scheduled";
      function scheduleTask(task) {
        const data = task.data;
        const target = data.target;
        target[XHR_SCHEDULED] = false;
        target[XHR_ERROR_BEFORE_SCHEDULED] = false;
        const listener = target[XHR_LISTENER];
        if (!oriAddListener) {
          oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        }
        if (listener) {
          oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
        }
        const newListener = target[XHR_LISTENER] = () => {
          if (target.readyState === target.DONE) {
            if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
              const loadTasks = target[Zone4.__symbol__("loadfalse")];
              if (target.status !== 0 && loadTasks && loadTasks.length > 0) {
                const oriInvoke = task.invoke;
                task.invoke = function() {
                  const loadTasks2 = target[Zone4.__symbol__("loadfalse")];
                  for (let i = 0; i < loadTasks2.length; i++) {
                    if (loadTasks2[i] === task) {
                      loadTasks2.splice(i, 1);
                    }
                  }
                  if (!data.aborted && task.state === SCHEDULED) {
                    oriInvoke.call(task);
                  }
                };
                loadTasks.push(task);
              } else {
                task.invoke();
              }
            } else if (!data.aborted && target[XHR_SCHEDULED] === false) {
              target[XHR_ERROR_BEFORE_SCHEDULED] = true;
            }
          }
        };
        oriAddListener.call(target, READY_STATE_CHANGE, newListener);
        const storedTask = target[XHR_TASK];
        if (!storedTask) {
          target[XHR_TASK] = task;
        }
        sendNative.apply(target, data.args);
        target[XHR_SCHEDULED] = true;
        return task;
      }
      function placeholderCallback() {
      }
      function clearTask(task) {
        const data = task.data;
        data.aborted = true;
        return abortNative.apply(data.target, data.args);
      }
      const openNative = patchMethod(XMLHttpRequestPrototype, "open", () => function(self2, args) {
        self2[XHR_SYNC] = args[2] == false;
        self2[XHR_URL] = args[1];
        return openNative.apply(self2, args);
      });
      const XMLHTTPREQUEST_SOURCE = "XMLHttpRequest.send";
      const fetchTaskAborting = zoneSymbol("fetchTaskAborting");
      const fetchTaskScheduling = zoneSymbol("fetchTaskScheduling");
      const sendNative = patchMethod(XMLHttpRequestPrototype, "send", () => function(self2, args) {
        if (Zone4.current[fetchTaskScheduling] === true) {
          return sendNative.apply(self2, args);
        }
        if (self2[XHR_SYNC]) {
          return sendNative.apply(self2, args);
        } else {
          const options = {
            target: self2,
            url: self2[XHR_URL],
            isPeriodic: false,
            args,
            aborted: false
          };
          const task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
          if (self2 && self2[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted && task.state === SCHEDULED) {
            task.invoke();
          }
        }
      });
      const abortNative = patchMethod(XMLHttpRequestPrototype, "abort", () => function(self2, args) {
        const task = findPendingTask(self2);
        if (task && typeof task.type == "string") {
          if (task.cancelFn == null || task.data && task.data.aborted) {
            return;
          }
          task.zone.cancelTask(task);
        } else if (Zone4.current[fetchTaskAborting] === true) {
          return abortNative.apply(self2, args);
        }
      });
    }
  });
  Zone3.__load_patch("geolocation", (global2) => {
    if (global2["navigator"] && global2["navigator"].geolocation) {
      patchPrototype(global2["navigator"].geolocation, ["getCurrentPosition", "watchPosition"]);
    }
  });
  Zone3.__load_patch("PromiseRejectionEvent", (global2, Zone4) => {
    function findPromiseRejectionHandler(evtName) {
      return function(e) {
        const eventTasks = findEventTasks(global2, evtName);
        eventTasks.forEach((eventTask) => {
          const PromiseRejectionEvent = global2["PromiseRejectionEvent"];
          if (PromiseRejectionEvent) {
            const evt = new PromiseRejectionEvent(evtName, {
              promise: e.promise,
              reason: e.rejection
            });
            eventTask.invoke(evt);
          }
        });
      };
    }
    if (global2["PromiseRejectionEvent"]) {
      Zone4[zoneSymbol("unhandledPromiseRejectionHandler")] = findPromiseRejectionHandler("unhandledrejection");
      Zone4[zoneSymbol("rejectionHandledHandler")] = findPromiseRejectionHandler("rejectionhandled");
    }
  });
  Zone3.__load_patch("queueMicrotask", (global2, Zone4, api) => {
    patchQueueMicrotask(global2, api);
  });
}
function patchPromise(Zone3) {
  Zone3.__load_patch("ZoneAwarePromise", (global2, Zone4, api) => {
    const ObjectGetOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;
    const ObjectDefineProperty2 = Object.defineProperty;
    function readableObjectToString(obj) {
      if (obj && obj.toString === Object.prototype.toString) {
        const className = obj.constructor && obj.constructor.name;
        return (className ? className : "") + ": " + JSON.stringify(obj);
      }
      return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }
    const __symbol__2 = api.symbol;
    const _uncaughtPromiseErrors = [];
    const isDisableWrappingUncaughtPromiseRejection = global2[__symbol__2("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] !== false;
    const symbolPromise = __symbol__2("Promise");
    const symbolThen = __symbol__2("then");
    const creationTrace = "__creationTrace__";
    api.onUnhandledError = (e) => {
      if (api.showUncaughtError()) {
        const rejection = e && e.rejection;
        if (rejection) {
          console.error("Unhandled Promise rejection:", rejection instanceof Error ? rejection.message : rejection, "; Zone:", e.zone.name, "; Task:", e.task && e.task.source, "; Value:", rejection, rejection instanceof Error ? rejection.stack : void 0);
        } else {
          console.error(e);
        }
      }
    };
    api.microtaskDrainDone = () => {
      while (_uncaughtPromiseErrors.length) {
        const uncaughtPromiseError = _uncaughtPromiseErrors.shift();
        try {
          uncaughtPromiseError.zone.runGuarded(() => {
            if (uncaughtPromiseError.throwOriginal) {
              throw uncaughtPromiseError.rejection;
            }
            throw uncaughtPromiseError;
          });
        } catch (error) {
          handleUnhandledRejection(error);
        }
      }
    };
    const UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__2("unhandledPromiseRejectionHandler");
    function handleUnhandledRejection(e) {
      api.onUnhandledError(e);
      try {
        const handler = Zone4[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
        if (typeof handler === "function") {
          handler.call(this, e);
        }
      } catch (err) {
      }
    }
    function isThenable(value) {
      return value && typeof value.then === "function";
    }
    function forwardResolution(value) {
      return value;
    }
    function forwardRejection(rejection) {
      return ZoneAwarePromise.reject(rejection);
    }
    const symbolState = __symbol__2("state");
    const symbolValue = __symbol__2("value");
    const symbolFinally = __symbol__2("finally");
    const symbolParentPromiseValue = __symbol__2("parentPromiseValue");
    const symbolParentPromiseState = __symbol__2("parentPromiseState");
    const source = "Promise.then";
    const UNRESOLVED = null;
    const RESOLVED = true;
    const REJECTED = false;
    const REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
      return (v) => {
        try {
          resolvePromise(promise, state, v);
        } catch (err) {
          resolvePromise(promise, false, err);
        }
      };
    }
    const once = function() {
      let wasCalled = false;
      return function wrapper(wrappedFunction) {
        return function() {
          if (wasCalled) {
            return;
          }
          wasCalled = true;
          wrappedFunction.apply(null, arguments);
        };
      };
    };
    const TYPE_ERROR = "Promise resolved with itself";
    const CURRENT_TASK_TRACE_SYMBOL = __symbol__2("currentTaskTrace");
    function resolvePromise(promise, state, value) {
      const onceWrapper = once();
      if (promise === value) {
        throw new TypeError(TYPE_ERROR);
      }
      if (promise[symbolState] === UNRESOLVED) {
        let then = null;
        try {
          if (typeof value === "object" || typeof value === "function") {
            then = value && value.then;
          }
        } catch (err) {
          onceWrapper(() => {
            resolvePromise(promise, false, err);
          })();
          return promise;
        }
        if (state !== REJECTED && value instanceof ZoneAwarePromise && value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) && value[symbolState] !== UNRESOLVED) {
          clearRejectedNoCatch(value);
          resolvePromise(promise, value[symbolState], value[symbolValue]);
        } else if (state !== REJECTED && typeof then === "function") {
          try {
            then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
          } catch (err) {
            onceWrapper(() => {
              resolvePromise(promise, false, err);
            })();
          }
        } else {
          promise[symbolState] = state;
          const queue = promise[symbolValue];
          promise[symbolValue] = value;
          if (promise[symbolFinally] === symbolFinally) {
            if (state === RESOLVED) {
              promise[symbolState] = promise[symbolParentPromiseState];
              promise[symbolValue] = promise[symbolParentPromiseValue];
            }
          }
          if (state === REJECTED && value instanceof Error) {
            const trace = Zone4.currentTask && Zone4.currentTask.data && Zone4.currentTask.data[creationTrace];
            if (trace) {
              ObjectDefineProperty2(value, CURRENT_TASK_TRACE_SYMBOL, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: trace
              });
            }
          }
          for (let i = 0; i < queue.length; ) {
            scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
          }
          if (queue.length == 0 && state == REJECTED) {
            promise[symbolState] = REJECTED_NO_CATCH;
            let uncaughtPromiseError = value;
            try {
              throw new Error("Uncaught (in promise): " + readableObjectToString(value) + (value && value.stack ? "\n" + value.stack : ""));
            } catch (err) {
              uncaughtPromiseError = err;
            }
            if (isDisableWrappingUncaughtPromiseRejection) {
              uncaughtPromiseError.throwOriginal = true;
            }
            uncaughtPromiseError.rejection = value;
            uncaughtPromiseError.promise = promise;
            uncaughtPromiseError.zone = Zone4.current;
            uncaughtPromiseError.task = Zone4.currentTask;
            _uncaughtPromiseErrors.push(uncaughtPromiseError);
            api.scheduleMicroTask();
          }
        }
      }
      return promise;
    }
    const REJECTION_HANDLED_HANDLER = __symbol__2("rejectionHandledHandler");
    function clearRejectedNoCatch(promise) {
      if (promise[symbolState] === REJECTED_NO_CATCH) {
        try {
          const handler = Zone4[REJECTION_HANDLED_HANDLER];
          if (handler && typeof handler === "function") {
            handler.call(this, { rejection: promise[symbolValue], promise });
          }
        } catch (err) {
        }
        promise[symbolState] = REJECTED;
        for (let i = 0; i < _uncaughtPromiseErrors.length; i++) {
          if (promise === _uncaughtPromiseErrors[i].promise) {
            _uncaughtPromiseErrors.splice(i, 1);
          }
        }
      }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
      clearRejectedNoCatch(promise);
      const promiseState = promise[symbolState];
      const delegate = promiseState ? typeof onFulfilled === "function" ? onFulfilled : forwardResolution : typeof onRejected === "function" ? onRejected : forwardRejection;
      zone.scheduleMicroTask(source, () => {
        try {
          const parentPromiseValue = promise[symbolValue];
          const isFinallyPromise = !!chainPromise && symbolFinally === chainPromise[symbolFinally];
          if (isFinallyPromise) {
            chainPromise[symbolParentPromiseValue] = parentPromiseValue;
            chainPromise[symbolParentPromiseState] = promiseState;
          }
          const value = zone.run(delegate, void 0, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ? [] : [parentPromiseValue]);
          resolvePromise(chainPromise, true, value);
        } catch (error) {
          resolvePromise(chainPromise, false, error);
        }
      }, chainPromise);
    }
    const ZONE_AWARE_PROMISE_TO_STRING = "function ZoneAwarePromise() { [native code] }";
    const noop = function() {
    };
    const AggregateError = global2.AggregateError;
    class ZoneAwarePromise {
      static toString() {
        return ZONE_AWARE_PROMISE_TO_STRING;
      }
      static resolve(value) {
        if (value instanceof ZoneAwarePromise) {
          return value;
        }
        return resolvePromise(new this(null), RESOLVED, value);
      }
      static reject(error) {
        return resolvePromise(new this(null), REJECTED, error);
      }
      static withResolvers() {
        const result = {};
        result.promise = new ZoneAwarePromise((res, rej) => {
          result.resolve = res;
          result.reject = rej;
        });
        return result;
      }
      static any(values) {
        if (!values || typeof values[Symbol.iterator] !== "function") {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        const promises = [];
        let count = 0;
        try {
          for (let v of values) {
            count++;
            promises.push(ZoneAwarePromise.resolve(v));
          }
        } catch (err) {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        if (count === 0) {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        let finished = false;
        const errors = [];
        return new ZoneAwarePromise((resolve, reject) => {
          for (let i = 0; i < promises.length; i++) {
            promises[i].then((v) => {
              if (finished) {
                return;
              }
              finished = true;
              resolve(v);
            }, (err) => {
              errors.push(err);
              count--;
              if (count === 0) {
                finished = true;
                reject(new AggregateError(errors, "All promises were rejected"));
              }
            });
          }
        });
      }
      static race(values) {
        let resolve;
        let reject;
        let promise = new this((res, rej) => {
          resolve = res;
          reject = rej;
        });
        function onResolve(value) {
          resolve(value);
        }
        function onReject(error) {
          reject(error);
        }
        for (let value of values) {
          if (!isThenable(value)) {
            value = this.resolve(value);
          }
          value.then(onResolve, onReject);
        }
        return promise;
      }
      static all(values) {
        return ZoneAwarePromise.allWithCallback(values);
      }
      static allSettled(values) {
        const P = this && this.prototype instanceof ZoneAwarePromise ? this : ZoneAwarePromise;
        return P.allWithCallback(values, {
          thenCallback: (value) => ({ status: "fulfilled", value }),
          errorCallback: (err) => ({ status: "rejected", reason: err })
        });
      }
      static allWithCallback(values, callback) {
        let resolve;
        let reject;
        let promise = new this((res, rej) => {
          resolve = res;
          reject = rej;
        });
        let unresolvedCount = 2;
        let valueIndex = 0;
        const resolvedValues = [];
        for (let value of values) {
          if (!isThenable(value)) {
            value = this.resolve(value);
          }
          const curValueIndex = valueIndex;
          try {
            value.then((value2) => {
              resolvedValues[curValueIndex] = callback ? callback.thenCallback(value2) : value2;
              unresolvedCount--;
              if (unresolvedCount === 0) {
                resolve(resolvedValues);
              }
            }, (err) => {
              if (!callback) {
                reject(err);
              } else {
                resolvedValues[curValueIndex] = callback.errorCallback(err);
                unresolvedCount--;
                if (unresolvedCount === 0) {
                  resolve(resolvedValues);
                }
              }
            });
          } catch (thenErr) {
            reject(thenErr);
          }
          unresolvedCount++;
          valueIndex++;
        }
        unresolvedCount -= 2;
        if (unresolvedCount === 0) {
          resolve(resolvedValues);
        }
        return promise;
      }
      constructor(executor) {
        const promise = this;
        if (!(promise instanceof ZoneAwarePromise)) {
          throw new Error("Must be an instanceof Promise.");
        }
        promise[symbolState] = UNRESOLVED;
        promise[symbolValue] = [];
        try {
          const onceWrapper = once();
          executor && executor(onceWrapper(makeResolver(promise, RESOLVED)), onceWrapper(makeResolver(promise, REJECTED)));
        } catch (error) {
          resolvePromise(promise, false, error);
        }
      }
      get [Symbol.toStringTag]() {
        return "Promise";
      }
      get [Symbol.species]() {
        return ZoneAwarePromise;
      }
      then(onFulfilled, onRejected) {
        var _a;
        let C = (_a = this.constructor) == null ? void 0 : _a[Symbol.species];
        if (!C || typeof C !== "function") {
          C = this.constructor || ZoneAwarePromise;
        }
        const chainPromise = new C(noop);
        const zone = Zone4.current;
        if (this[symbolState] == UNRESOLVED) {
          this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
        } else {
          scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
        }
        return chainPromise;
      }
      catch(onRejected) {
        return this.then(null, onRejected);
      }
      finally(onFinally) {
        var _a;
        let C = (_a = this.constructor) == null ? void 0 : _a[Symbol.species];
        if (!C || typeof C !== "function") {
          C = ZoneAwarePromise;
        }
        const chainPromise = new C(noop);
        chainPromise[symbolFinally] = symbolFinally;
        const zone = Zone4.current;
        if (this[symbolState] == UNRESOLVED) {
          this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
        } else {
          scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
        }
        return chainPromise;
      }
    }
    ZoneAwarePromise["resolve"] = ZoneAwarePromise.resolve;
    ZoneAwarePromise["reject"] = ZoneAwarePromise.reject;
    ZoneAwarePromise["race"] = ZoneAwarePromise.race;
    ZoneAwarePromise["all"] = ZoneAwarePromise.all;
    const NativePromise = global2[symbolPromise] = global2["Promise"];
    global2["Promise"] = ZoneAwarePromise;
    const symbolThenPatched = __symbol__2("thenPatched");
    function patchThen(Ctor) {
      const proto = Ctor.prototype;
      const prop = ObjectGetOwnPropertyDescriptor2(proto, "then");
      if (prop && (prop.writable === false || !prop.configurable)) {
        return;
      }
      const originalThen = proto.then;
      proto[symbolThen] = originalThen;
      Ctor.prototype.then = function(onResolve, onReject) {
        const wrapped = new ZoneAwarePromise((resolve, reject) => {
          originalThen.call(this, resolve, reject);
        });
        return wrapped.then(onResolve, onReject);
      };
      Ctor[symbolThenPatched] = true;
    }
    api.patchThen = patchThen;
    function zoneify(fn) {
      return function(self2, args) {
        let resultPromise = fn.apply(self2, args);
        if (resultPromise instanceof ZoneAwarePromise) {
          return resultPromise;
        }
        let ctor = resultPromise.constructor;
        if (!ctor[symbolThenPatched]) {
          patchThen(ctor);
        }
        return resultPromise;
      };
    }
    if (NativePromise) {
      patchThen(NativePromise);
      const nativeTry = NativePromise["try"];
      if (nativeTry && typeof nativeTry === "function") {
        ZoneAwarePromise["try"] = nativeTry;
      }
      patchMethod(global2, "fetch", (delegate) => zoneify(delegate));
    }
    Promise[Zone4.__symbol__("uncaughtPromiseErrors")] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
  });
}
function patchToString(Zone3) {
  Zone3.__load_patch("toString", (global2) => {
    const originalFunctionToString = Function.prototype.toString;
    const ORIGINAL_DELEGATE_SYMBOL = zoneSymbol("OriginalDelegate");
    const PROMISE_SYMBOL = zoneSymbol("Promise");
    const ERROR_SYMBOL = zoneSymbol("Error");
    const newFunctionToString = function toString() {
      if (typeof this === "function") {
        const originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
        if (originalDelegate) {
          if (typeof originalDelegate === "function") {
            return originalFunctionToString.call(originalDelegate);
          } else {
            return Object.prototype.toString.call(originalDelegate);
          }
        }
        if (this === Promise) {
          const nativePromise = global2[PROMISE_SYMBOL];
          if (nativePromise) {
            return originalFunctionToString.call(nativePromise);
          }
        }
        if (this === Error) {
          const nativeError = global2[ERROR_SYMBOL];
          if (nativeError) {
            return originalFunctionToString.call(nativeError);
          }
        }
      }
      return originalFunctionToString.call(this);
    };
    newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
    Function.prototype.toString = newFunctionToString;
    const originalObjectToString = Object.prototype.toString;
    const PROMISE_OBJECT_TO_STRING = "[object Promise]";
    Object.prototype.toString = function() {
      if (typeof Promise === "function" && this instanceof Promise) {
        return PROMISE_OBJECT_TO_STRING;
      }
      return originalObjectToString.call(this);
    };
  });
}
function patchCallbacks(api, target, targetName, method, callbacks) {
  const symbol = Zone.__symbol__(method);
  if (target[symbol]) {
    return;
  }
  const nativeDelegate = target[symbol] = target[method];
  target[method] = function(name, opts, options) {
    if (opts && opts.prototype) {
      callbacks.forEach(function(callback) {
        const source = `${targetName}.${method}::` + callback;
        const prototype = opts.prototype;
        try {
          if (prototype.hasOwnProperty(callback)) {
            const descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);
            if (descriptor && descriptor.value) {
              descriptor.value = api.wrapWithCurrentZone(descriptor.value, source);
              api._redefineProperty(opts.prototype, callback, descriptor);
            } else if (prototype[callback]) {
              prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
            }
          } else if (prototype[callback]) {
            prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
          }
        } catch (e) {
        }
      });
    }
    return nativeDelegate.call(target, name, opts, options);
  };
  api.attachOriginToPatched(target[method], nativeDelegate);
}
function patchUtil(Zone3) {
  Zone3.__load_patch("util", (global2, Zone4, api) => {
    const eventNames = getOnEventNames(global2);
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
    api.patchMacroTask = patchMacroTask;
    const SYMBOL_BLACK_LISTED_EVENTS = Zone4.__symbol__("BLACK_LISTED_EVENTS");
    const SYMBOL_UNPATCHED_EVENTS = Zone4.__symbol__("UNPATCHED_EVENTS");
    if (global2[SYMBOL_UNPATCHED_EVENTS]) {
      global2[SYMBOL_BLACK_LISTED_EVENTS] = global2[SYMBOL_UNPATCHED_EVENTS];
    }
    if (global2[SYMBOL_BLACK_LISTED_EVENTS]) {
      Zone4[SYMBOL_BLACK_LISTED_EVENTS] = Zone4[SYMBOL_UNPATCHED_EVENTS] = global2[SYMBOL_BLACK_LISTED_EVENTS];
    }
    api.patchEventPrototype = patchEventPrototype;
    api.patchEventTarget = patchEventTarget;
    api.ObjectDefineProperty = ObjectDefineProperty;
    api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor;
    api.ObjectCreate = ObjectCreate;
    api.ArraySlice = ArraySlice;
    api.patchClass = patchClass;
    api.wrapWithCurrentZone = wrapWithCurrentZone;
    api.filterProperties = filterProperties;
    api.attachOriginToPatched = attachOriginToPatched;
    api._redefineProperty = Object.defineProperty;
    api.patchCallbacks = patchCallbacks;
    api.getGlobalObjects = () => ({
      globalSources,
      zoneSymbolEventNames: zoneSymbolEventNames2,
      eventNames,
      isBrowser,
      isMix,
      isNode,
      TRUE_STR,
      FALSE_STR,
      ZONE_SYMBOL_PREFIX,
      ADD_EVENT_LISTENER_STR,
      REMOVE_EVENT_LISTENER_STR
    });
  });
}
function patchCommon(Zone3) {
  patchPromise(Zone3);
  patchToString(Zone3);
  patchUtil(Zone3);
}
var Zone2 = loadZone();
patchCommon(Zone2);
patchBrowser(Zone2);

// projects/tot/core/src/lib/auth/claim.guard.ts
var claimGuard = (claimOrClaims, mode = "OR") => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const notification = inject(AppNotificationService);
    const templateService = inject(NotificationTemplateService);
    const translate = inject(TranslateService);
    if (authService.hasClaim(claimOrClaims, mode)) {
      return true;
    }
    const isLoggedIn = authService.isLoggedIn();
    const claimsArray = Array.isArray(claimOrClaims) ? claimOrClaims : [claimOrClaims];
    const claimListStr = claimsArray.join(", ");
    const title = isLoggedIn ? translate.instant("Truy c\u1EADp b\u1ECB t\u1EEB ch\u1ED1i") : translate.instant("Y\xEAu c\u1EA7u \u0111\u0103ng nh\u1EADp");
    let message = "";
    if (isLoggedIn) {
      message = translate.instant("B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp t\xEDnh n\u0103ng. B\u1EA1n c\u1EA7n c\xE1c quy\u1EC1n sau: {{claims}} \u0111\u1EC3 c\xF3 th\u1EC3 truy c\u1EADp t\xEDnh n\u0103ng. Vui l\xF2ng li\xEAn h\u1EC7 v\u1EDBi qu\u1EA3n tr\u1ECB vi\xEAn \u0111\u1EC3 y\xEAu c\u1EA7u c\u1EA5p quy\u1EC1n.", { claims: claimListStr });
    } else {
      message = translate.instant("Vui l\xF2ng \u0111\u0103ng nh\u1EADp \u0111\u1EC3 truy c\u1EADp t\xE0i nguy\xEAn n\xE0y");
    }
    const loginLinkText = translate.instant("Click v\xE0o \u0111\xE2y \u0111\u1EC3 \u0111\u0103ng nh\u1EADp");
    const loginLink = `<a href="/auth/login" style="color: #1890ff; text-decoration: underline;">${loginLinkText}.</a>`;
    const htmlContent = `${message} ${loginLink}`;
    const template = templateService.getTemplate("html");
    if (template) {
      notification.create("error", title, template, { nzData: { content: htmlContent }, nzDuration: 0 });
    } else {
      const ref = notification.error(title, `${message} ${loginLinkText}.`, {
        nzDuration: 0
      });
      ref.onClick.subscribe(() => {
        router.navigate(["/auth/login"]);
        notification.remove(ref.messageId);
      });
    }
    return false;
  };
};

// projects/tot/core/src/lib/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }
  return next(req);
};

// projects/tot/core/src/lib/interceptors/error.interceptor.ts
var errorInterceptor = (req, next) => {
  const notification = inject(AppNotificationService);
  const router = inject(Router);
  const translate = inject(TranslateService);
  return next(req).pipe(catchError((error) => {
    var _a;
    if (error.status === 401) {
      localStorage.removeItem("jwt_token");
      router.navigate(["/auth/login"]);
    }
    const message = ((_a = error.error) == null ? void 0 : _a.message) || error.message || "Unknown error";
    notification.error(translate.instant("Th\xF4ng b\xE1o"), translate.instant(message));
    return throwError(() => error);
  }));
};

// projects/tot/core/src/lib/directives/claim.directive.ts
var _AppClaimDirective = class _AppClaimDirective {
  set appClaimCheck(value) {
    this.claims = value;
    this.updateView();
  }
  set appClaimCheckMode(value) {
    this.mode = value;
    this.updateView();
  }
  set appClaimCheckHide(value) {
    this.hideOnly = value === "" || value === true || value === "true";
    this.updateView();
  }
  constructor() {
    this.templateRef = inject(TemplateRef);
    this.viewContainer = inject(ViewContainerRef);
    this.authService = inject(AuthService);
    this.renderer = inject(Renderer2);
    this.el = inject(ElementRef);
    this.sanitizer = inject(DomSanitizer);
    this.claims = [];
    this.mode = "OR";
    this.hideOnly = false;
    this.denialEl = null;
  }
  ngOnInit() {
    this.claimsSubscription = this.authService.claimsUpdated$.subscribe(() => {
      this.updateView();
    });
  }
  updateView() {
    this.viewContainer.clear();
    this.removeDenialMessage();
    if (this.authService.hasClaim(this.claims, this.mode)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!this.hideOnly) {
      this.renderDenialMessage();
    }
  }
  renderDenialMessage() {
    const claimsArray = Array.isArray(this.claims) ? this.claims.filter((c) => !!c) : this.claims ? [this.claims] : [];
    const claimListStr = claimsArray.length > 0 ? claimsArray.join(", ") : "Y\xEAu c\u1EA7u \u0111\u0103ng nh\u1EADp";
    const div = this.renderer.createElement("div");
    this.renderer.addClass(div, "claim-denied-message");
    this.renderer.setStyle(div, "padding", "12px");
    this.renderer.setStyle(div, "border", "1px solid #ffa39e");
    this.renderer.setStyle(div, "background-color", "#fff1f0");
    this.renderer.setStyle(div, "color", "#cf1322");
    this.renderer.setStyle(div, "border-radius", "8px");
    this.renderer.setStyle(div, "margin", "8px");
    this.renderer.setStyle(div, "box-shadow", "0 2px 4px rgba(0,0,0,0.05)");
    const rawHtml = `
      <div style="display: flex; align-items: flex-start; gap: 10px;">
        <span style="font-size: 18px;">\u{1F6AB}</span>
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 14px; margin-bottom: 2px;">Truy c\u1EADp b\u1ECB h\u1EA1n ch\u1EBF</div>
          <div style="font-size: 12px; line-height: 1.4;">
            ${claimsArray.length > 0 ? `Thi\u1EBFu quy\u1EC1n: <code style="background: white; padding: 1px 4px; border-radius: 3px; border: 1px solid #ffccc7;">${claimListStr}</code>` : "Vui l\xF2ng \u0111\u0103ng nh\u1EADp \u0111\u1EC3 s\u1EED d\u1EE5ng t\xEDnh n\u0103ng n\xE0y."}
          </div>
          <div style="margin-top: 6px; font-size: 12px;">
            <a href="/auth/login" style="color: #1890ff; font-weight: 600; text-decoration: underline;">\u0110\u0103ng nh\u1EADp ngay</a>
          </div>
        </div>
      </div>
    `;
    div.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(rawHtml)) || "";
    const anchor = this.el.nativeElement;
    const parent = this.renderer.parentNode(anchor);
    if (parent && parent.tagName === "UL") {
      const li = this.renderer.createElement("li");
      this.renderer.setStyle(li, "list-style", "none");
      this.renderer.appendChild(li, div);
      this.renderer.insertBefore(parent, li, anchor);
      this.denialEl = li;
    } else if (parent) {
      this.renderer.insertBefore(parent, div, anchor);
      this.denialEl = div;
    }
  }
  removeDenialMessage() {
    if (this.denialEl) {
      const parent = this.renderer.parentNode(this.denialEl);
      if (parent) {
        this.renderer.removeChild(parent, this.denialEl);
      }
      this.denialEl = null;
    }
  }
  ngOnDestroy() {
    var _a;
    this.removeDenialMessage();
    (_a = this.claimsSubscription) == null ? void 0 : _a.unsubscribe();
  }
};
_AppClaimDirective.\u0275fac = function AppClaimDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AppClaimDirective)();
};
_AppClaimDirective.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({ type: _AppClaimDirective, selectors: [["", "appClaimCheck", ""]], inputs: { appClaimCheck: "appClaimCheck", appClaimCheckMode: "appClaimCheckMode", appClaimCheckHide: "appClaimCheckHide" } });
var AppClaimDirective = _AppClaimDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppClaimDirective, [{
    type: Directive,
    args: [{
      selector: "[appClaimCheck]",
      standalone: true
    }]
  }], () => [], { appClaimCheck: [{
    type: Input
  }], appClaimCheckMode: [{
    type: Input
  }], appClaimCheckHide: [{
    type: Input
  }] });
})();

// src/app/layouts/main-layout/main-layout.component.ts
function MainLayoutComponent_li_8_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "Dashboard"));
  }
}
function MainLayoutComponent_li_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 32);
    \u0275\u0275twoWayListener("nzOpenChange", function MainLayoutComponent_li_8_Template_li_nzOpenChange_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.openMap["dashboard"], $event) || (ctx_r2.openMap["dashboard"] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(1, MainLayoutComponent_li_8_ng_template_1_Template, 3, 3, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(3, "ul")(4, "li", 33)(5, "a", 34);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const dashboardTitle_r4 = \u0275\u0275reference(2);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("nzTitle", dashboardTitle_r4);
    \u0275\u0275twoWayProperty("nzOpen", ctx_r2.openMap["dashboard"]);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 3, "CQRS Dashboard"));
  }
}
function MainLayoutComponent_li_9_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "Core Infra Auth"));
  }
}
function MainLayoutComponent_li_9_li_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 33)(1, "a", 42);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, "Qu\u1EA3n l\xFD ACL"));
  }
}
function MainLayoutComponent_li_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 35);
    \u0275\u0275twoWayListener("nzOpenChange", function MainLayoutComponent_li_9_Template_li_nzOpenChange_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.openMap["auth"], $event) || (ctx_r2.openMap["auth"] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(1, MainLayoutComponent_li_9_ng_template_1_Template, 3, 3, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(3, "ul")(4, "li", 33)(5, "a", 36);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "li", 33)(9, "a", 37);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "li", 33)(13, "a", 38);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(16, MainLayoutComponent_li_9_li_16_Template, 4, 3, "li", 39);
    \u0275\u0275elementStart(17, "li", 33)(18, "a", 40);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "li", 33)(22, "a", 41);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const authTitle_r6 = \u0275\u0275reference(2);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("nzTitle", authTitle_r6);
    \u0275\u0275twoWayProperty("nzOpen", ctx_r2.openMap["auth"]);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 8, "Ng\u01B0\u1EDDi d\xF9ng"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 10, "Vai tr\xF2"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(15, 12, "Quy\u1EC1n"));
    \u0275\u0275advance(2);
    \u0275\u0275property("appClaimCheck", ctx_r2.claims.AUTH.MANAGE_ACL);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 14, "\u0110\u1ED5i m\u1EADt kh\u1EA9u"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(24, 16, "Th\xF4ng tin ph\xE2n quy\u1EC1n"));
  }
}
function MainLayoutComponent_li_10_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "Qu\u1EA3n l\xFD t\xE0i li\u1EC7u"));
  }
}
function MainLayoutComponent_li_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 43);
    \u0275\u0275twoWayListener("nzOpenChange", function MainLayoutComponent_li_10_Template_li_nzOpenChange_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.openMap["files"], $event) || (ctx_r2.openMap["files"] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(1, MainLayoutComponent_li_10_ng_template_1_Template, 3, 3, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(3, "ul")(4, "li", 33)(5, "a", 44);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const filesFoldersTitle_r8 = \u0275\u0275reference(2);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("nzTitle", filesFoldersTitle_r8);
    \u0275\u0275twoWayProperty("nzOpen", ctx_r2.openMap["files"]);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 3, "Kh\xE1m ph\xE1 t\u1EC7p tin"));
  }
}
function MainLayoutComponent_li_11_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "M\xF4-\u0111un th\u1EED nghi\u1EC7m"));
  }
}
function MainLayoutComponent_li_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 45);
    \u0275\u0275twoWayListener("nzOpenChange", function MainLayoutComponent_li_11_Template_li_nzOpenChange_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.openMap["test"], $event) || (ctx_r2.openMap["test"] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(1, MainLayoutComponent_li_11_ng_template_1_Template, 3, 3, "ng-template", null, 5, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(3, "ul")(4, "li", 33)(5, "a", 46);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "li", 33)(9, "a", 47);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "li", 33)(13, "a", 48);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "li", 33)(17, "a", 49);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const testTitle_r10 = \u0275\u0275reference(2);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("nzTitle", testTitle_r10);
    \u0275\u0275twoWayProperty("nzOpen", ctx_r2.openMap["test"]);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 6, "Th\u1EED nghi\u1EC7m Firestore"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 8, "Th\u1EED nghi\u1EC7m FCM"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(15, 10, "Th\u1EED nghi\u1EC7m CQRS"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(19, 12, "Th\u1EED nghi\u1EC7m CKEditor"));
  }
}
function MainLayoutComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 50);
    \u0275\u0275listener("mousedown", function MainLayoutComponent_div_12_Template_div_mousedown_0_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onMouseDown($event));
    });
    \u0275\u0275elementEnd();
  }
}
function MainLayoutComponent_ng_container_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 51);
    \u0275\u0275element(2, "nz-avatar", 52);
    \u0275\u0275elementStart(3, "div", 53)(4, "span", 54);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 55);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "button", 56);
    \u0275\u0275listener("click", function MainLayoutComponent_ng_container_32_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.logout());
    });
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const user_r13 = ctx.ngIf;
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSrc", user_r13.picture || "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(user_r13.preferred_username);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r13.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 4, "\u0110\u0103ng xu\u1EA5t"));
  }
}
function MainLayoutComponent_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 57);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "\u0110\u0103ng nh\u1EADp"));
  }
}
function MainLayoutComponent_nz_breadcrumb_38_nz_breadcrumb_item_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-breadcrumb-item")(1, "a", 61);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r14 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", item_r14.url);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, item_r14.label));
  }
}
function MainLayoutComponent_nz_breadcrumb_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "nz-breadcrumb", 58)(1, "nz-breadcrumb-item")(2, "a", 9);
    \u0275\u0275element(3, "span", 59);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, MainLayoutComponent_nz_breadcrumb_38_nz_breadcrumb_item_4_Template, 4, 4, "nz-breadcrumb-item", 60);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r2.breadcrumbs);
  }
}
function MainLayoutComponent_router_outlet_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "router-outlet");
  }
}
var _MainLayoutComponent = class _MainLayoutComponent {
  constructor() {
    this.isCollapsed = false;
    this.currentLang = "vi";
    this.sidebarWidth = 256;
    this.sidebarBorderRight = "1px solid #303030";
    this.breadcrumbs = [];
    this.openMap = {
      dashboard: false,
      auth: false,
      test: false,
      files: false
    };
    this.authService = inject(AuthService);
    this.translate = inject(TranslateService);
    this.router = inject(Router);
    this.activatedRoute = inject(ActivatedRoute);
    this.user$ = this.authService.currentUser$;
    this.claims = APP_CLAIMS;
    this.isResizing = false;
    this.startX = 0;
    this.startWidth = 0;
    this.currentLang = this.translate.currentLang || localStorage.getItem("lang") || "vi";
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      this.updateOpenMap();
    });
    this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    this.updateOpenMap();
  }
  createBreadcrumbs(route, url = "", breadcrumbs = []) {
    const children = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      const snapshot = child.snapshot;
      if (!snapshot)
        continue;
      const routeURL = snapshot.url.map((segment) => segment.path).join("/");
      if (routeURL !== "") {
        url += `/${routeURL}`;
      }
      const label = snapshot.data["breadcrumb"];
      if (label) {
        breadcrumbs.push({ label, url });
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
  updateOpenMap() {
    const url = this.router.url;
    this.openMap["dashboard"] = url.includes("/modules/cqrs-dashboard");
    this.openMap["auth"] = url.includes("/modules/core-infra-auth");
    this.openMap["test"] = url.includes("/modules/test");
    this.openMap["files"] = url.includes("/modules/files-folders");
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    console.log("Sidebar collapsed:", this.isCollapsed);
  }
  switchLanguage(lang) {
    this.translate.use(lang);
    this.currentLang = lang;
    localStorage.setItem("lang", lang);
  }
  hasClaim(claim) {
    return this.authService.hasClaim(claim);
  }
  logout() {
    this.authService.logout();
  }
  onMouseDown(event) {
    if (this.isCollapsed)
      return;
    this.isResizing = true;
    this.startX = event.clientX;
    this.startWidth = this.sidebarWidth;
    document.body.style.cursor = "col-resize";
    event.preventDefault();
  }
  onMouseMove(event) {
    if (!this.isResizing)
      return;
    const deltaX = event.clientX - this.startX;
    const newWidth = this.startWidth + deltaX;
    if (newWidth >= 160 && newWidth <= 600) {
      this.sidebarWidth = newWidth;
    }
  }
  onMouseUp() {
    if (this.isResizing) {
      this.isResizing = false;
      document.body.style.cursor = "default";
    }
  }
};
_MainLayoutComponent.\u0275fac = function MainLayoutComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MainLayoutComponent)();
};
_MainLayoutComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MainLayoutComponent, selectors: [["app-main-layout"]], hostBindings: function MainLayoutComponent_HostBindings(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275listener("mousemove", function MainLayoutComponent_mousemove_HostBindingHandler($event) {
      return ctx.onMouseMove($event);
    }, \u0275\u0275resolveDocument)("mouseup", function MainLayoutComponent_mouseup_HostBindingHandler() {
      return ctx.onMouseUp();
    }, \u0275\u0275resolveDocument);
  }
}, decls: 40, vars: 20, consts: [["langMenu", "nzDropdownMenu"], ["loginBtn", ""], ["dashboardTitle", ""], ["authTitle", ""], ["filesFoldersTitle", ""], ["testTitle", ""], ["nzHasSider", "", 1, "app-layout"], ["nzCollapsible", "", 1, "menu-sidebar", 3, "nzCollapsedChange", "nzWidth", "nzCollapsedWidth", "nzCollapsed", "nzTrigger"], [1, "sidebar-logo"], ["routerLink", "/"], ["src", "assets/logo.png", "alt", "logo"], ["nz-menu", "", "nzTheme", "dark", "nzMode", "inline", 3, "nzInlineCollapsed"], ["nz-submenu", "", "nzIcon", "dashboard", 3, "nzTitle", "nzOpen", "nzOpenChange", 4, "appClaimCheck"], ["nz-submenu", "", "nzIcon", "lock", 3, "nzTitle", "nzOpen", "nzOpenChange", 4, "appClaimCheck"], ["nz-submenu", "", "nzIcon", "folder", 3, "nzTitle", "nzOpen", "nzOpenChange", 4, "appClaimCheck"], ["nz-submenu", "", "nzIcon", "experiment", 3, "nzTitle", "nzOpen", "nzOpenChange", 4, "appClaimCheck"], ["class", "resize-handle", 3, "mousedown", 4, "ngIf"], [1, "app-header"], [1, "header-left"], [1, "header-trigger", 3, "click"], ["nz-icon", "", 3, "nzType"], [1, "header-right"], [1, "lang-selector"], ["nz-dropdown", "", 3, "nzDropdownMenu"], ["nz-icon", "", "nzType", "global"], ["nz-icon", "", "nzType", "down"], ["nz-menu", ""], ["nz-menu-item", "", 3, "click"], [4, "ngIf", "ngIfElse"], [1, "inner-content", "animate-fade-in"], ["class", "app-breadcrumb", 4, "ngIf"], [4, "appClaimCheck"], ["nz-submenu", "", "nzIcon", "dashboard", 3, "nzOpenChange", "nzTitle", "nzOpen"], ["nz-menu-item", "", "nzMatchRouter", ""], ["routerLink", "/modules/cqrs-dashboard"], ["nz-submenu", "", "nzIcon", "lock", 3, "nzOpenChange", "nzTitle", "nzOpen"], ["routerLink", "/modules/core-infra-auth/users"], ["routerLink", "/modules/core-infra-auth/roles"], ["routerLink", "/modules/core-infra-auth/claims"], ["nz-menu-item", "", "nzMatchRouter", "", 4, "appClaimCheck"], ["routerLink", "/modules/core-infra-auth/change-password"], ["routerLink", "/modules/core-infra-auth/authorize-info"], ["routerLink", "/modules/core-infra-auth/acl"], ["nz-submenu", "", "nzIcon", "folder", 3, "nzOpenChange", "nzTitle", "nzOpen"], ["routerLink", "/modules/files-folders"], ["nz-submenu", "", "nzIcon", "experiment", 3, "nzOpenChange", "nzTitle", "nzOpen"], ["routerLink", "/modules/test/firestore"], ["routerLink", "/modules/test/fcm"], ["routerLink", "/modules/test/cqrs"], ["routerLink", "/modules/test/editor"], [1, "resize-handle", 3, "mousedown"], [1, "user-info"], ["nzIcon", "user", 3, "nzSrc"], [1, "user-text"], [1, "username"], [1, "display-name"], ["nz-button", "", "nzType", "link", 3, "click"], ["nz-button", "", "nzType", "primary", "routerLink", "/auth/login"], [1, "app-breadcrumb"], ["nz-icon", "", "nzType", "home"], [4, "ngFor", "ngForOf"], [3, "routerLink"]], template: function MainLayoutComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nz-layout", 6)(1, "nz-sider", 7);
    \u0275\u0275twoWayListener("nzCollapsedChange", function MainLayoutComponent_Template_nz_sider_nzCollapsedChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      \u0275\u0275twoWayBindingSet(ctx.isCollapsed, $event) || (ctx.isCollapsed = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(2, "div", 8)(3, "a", 9);
    \u0275\u0275element(4, "img", 10);
    \u0275\u0275elementStart(5, "h1");
    \u0275\u0275text(6, "Tree Of Thought");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "ul", 11);
    \u0275\u0275template(8, MainLayoutComponent_li_8_Template, 8, 5, "li", 12)(9, MainLayoutComponent_li_9_Template, 25, 18, "li", 13)(10, MainLayoutComponent_li_10_Template, 8, 5, "li", 14)(11, MainLayoutComponent_li_11_Template, 20, 14, "li", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, MainLayoutComponent_div_12_Template, 1, 0, "div", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "nz-layout")(14, "nz-header")(15, "div", 17)(16, "div", 18)(17, "span", 19);
    \u0275\u0275listener("click", function MainLayoutComponent_Template_span_click_17_listener() {
      return ctx.toggleCollapse();
    });
    \u0275\u0275element(18, "span", 20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 21)(20, "div", 22)(21, "a", 23);
    \u0275\u0275element(22, "span", 24);
    \u0275\u0275text(23);
    \u0275\u0275element(24, "span", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "nz-dropdown-menu", null, 0)(27, "ul", 26)(28, "li", 27);
    \u0275\u0275listener("click", function MainLayoutComponent_Template_li_click_28_listener() {
      return ctx.switchLanguage("vi");
    });
    \u0275\u0275text(29, "Ti\u1EBFng Vi\u1EC7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "li", 27);
    \u0275\u0275listener("click", function MainLayoutComponent_Template_li_click_30_listener() {
      return ctx.switchLanguage("en");
    });
    \u0275\u0275text(31, "English");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(32, MainLayoutComponent_ng_container_32_Template, 11, 6, "ng-container", 28);
    \u0275\u0275pipe(33, "async");
    \u0275\u0275template(34, MainLayoutComponent_ng_template_34_Template, 3, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "nz-content")(37, "div", 29);
    \u0275\u0275template(38, MainLayoutComponent_nz_breadcrumb_38_Template, 5, 1, "nz-breadcrumb", 30)(39, MainLayoutComponent_router_outlet_39_Template, 1, 0, "router-outlet", 31);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const langMenu_r15 = \u0275\u0275reference(26);
    const loginBtn_r16 = \u0275\u0275reference(35);
    \u0275\u0275advance();
    \u0275\u0275styleProp("border-right", ctx.isCollapsed ? "none" : ctx.sidebarBorderRight);
    \u0275\u0275property("nzWidth", ctx.sidebarWidth)("nzCollapsedWidth", 80);
    \u0275\u0275twoWayProperty("nzCollapsed", ctx.isCollapsed);
    \u0275\u0275property("nzTrigger", null);
    \u0275\u0275advance(6);
    \u0275\u0275property("nzInlineCollapsed", ctx.isCollapsed);
    \u0275\u0275advance();
    \u0275\u0275property("appClaimCheck", ctx.claims.CQRS_DASHBOARD.VIEW);
    \u0275\u0275advance();
    \u0275\u0275property("appClaimCheck", ctx.claims.AUTH.VIEW_USERS);
    \u0275\u0275advance();
    \u0275\u0275property("appClaimCheck", ctx.claims.FILES_FOLDERS.VIEW);
    \u0275\u0275advance();
    \u0275\u0275property("appClaimCheck", ctx.claims.TEST_MODULE.VIEW);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx.isCollapsed);
    \u0275\u0275advance(6);
    \u0275\u0275property("nzType", ctx.isCollapsed ? "menu-unfold" : "menu-fold");
    \u0275\u0275advance(3);
    \u0275\u0275property("nzDropdownMenu", langMenu_r15);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.currentLang === "vi" ? "Ti\u1EBFng Vi\u1EC7t" : "English", " ");
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(33, 18, ctx.user$))("ngIfElse", loginBtn_r16);
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx.breadcrumbs.length > 0);
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  NgIf,
  RouterOutlet,
  RouterLink,
  NzLayoutModule,
  NzLayoutComponent,
  NzHeaderComponent,
  NzContentComponent,
  NzSiderComponent,
  NzMenuModule,
  NzMenuDirective,
  NzMenuItemComponent,
  NzSubMenuComponent,
  NzIconModule,
  NzIconDirective,
  NzButtonModule,
  NzButtonComponent,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzAvatarModule,
  NzAvatarComponent,
  TranslateModule,
  NzDropDownModule,
  NzDropdownDirective,
  NzDropdownADirective,
  NzDropdownMenuComponent,
  NzBreadCrumbModule,
  NzBreadCrumbComponent,
  NzBreadCrumbItemComponent,
  AppClaimDirective,
  AsyncPipe,
  TranslatePipe
], styles: ['\n.app-layout[_ngcontent-%COMP%] {\n  height: 100vh;\n}\n.menu-sidebar[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 10;\n  min-height: 100vh;\n  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);\n}\n.sidebar-logo[_ngcontent-%COMP%] {\n  position: relative;\n  height: 64px;\n  padding-left: 24px;\n  overflow: hidden;\n  line-height: 64px;\n  background: #001529;\n  transition: all 0.3s;\n}\n.sidebar-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  display: inline-block;\n  height: 32px;\n  vertical-align: middle;\n}\n.sidebar-logo[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin: 0 0 0 12px;\n  color: #fff;\n  font-weight: 600;\n  font-size: 18px;\n  font-family:\n    Avenir,\n    "Helvetica Neue",\n    Arial,\n    Helvetica,\n    sans-serif;\n  vertical-align: middle;\n  transition: opacity 0.3s, width 0.3s;\n}\n.menu-sidebar.ant-layout-sider-collapsed[_ngcontent-%COMP%]   .sidebar-logo[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  opacity: 0;\n  width: 0;\n  margin: 0;\n  overflow: hidden;\n  display: none;\n}\n.nz-header[_ngcontent-%COMP%] {\n  padding: 0;\n  width: 100%;\n  z-index: 2;\n}\n.app-header[_ngcontent-%COMP%] {\n  position: relative;\n  height: 64px;\n  padding: 0;\n  background: #fff;\n  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.header-trigger[_ngcontent-%COMP%] {\n  height: 64px;\n  padding: 0 24px;\n  font-size: 18px;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.header-links[_ngcontent-%COMP%] {\n  margin-left: 12px;\n  display: flex;\n  gap: 20px;\n}\n.nav-link[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.65);\n  font-weight: 500;\n  transition: color 0.3s;\n}\n.nav-link[_ngcontent-%COMP%]:hover {\n  color: #1890ff;\n}\n.header-trigger[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.025);\n}\n.header-right[_ngcontent-%COMP%] {\n  padding-right: 24px;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.lang-selector[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  cursor: pointer;\n}\n.lang-selector[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.65);\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.lang-selector[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #1890ff;\n}\n.user-info[_ngcontent-%COMP%] {\n  margin-right: 16px;\n  display: flex;\n  align-items: center;\n}\n.user-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  margin-left: 12px;\n  line-height: 1.2;\n}\n.username[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.85);\n}\n.display-name[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.45);\n}\n.inner-content[_ngcontent-%COMP%] {\n  padding: 24px;\n  background: #f0f2f5;\n  min-height: calc(100vh - 64px);\n}\n.app-breadcrumb[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  padding: 0;\n  background: transparent;\n  box-shadow: none;\n  border-radius: 0;\n}\n.app-breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.45);\n  transition: color 0.3s;\n  font-size: 13px;\n}\n.app-breadcrumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #1890ff;\n}\n.app-breadcrumb[_ngcontent-%COMP%]   nz-breadcrumb-item[_ngcontent-%COMP%]:last-child   a[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.85);\n  font-weight: 500;\n  pointer-events: none;\n}\n  .ant-breadcrumb {\n  line-height: 1.2 !important;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  font-size: 14px;\n}\n  .ant-breadcrumb-link, \n  .ant-breadcrumb-link > a {\n  display: inline-flex;\n  align-items: center;\n}\n  .ant-breadcrumb-separator {\n  margin: 0 4px !important;\n  color: rgba(0, 0, 0, 0.3) !important;\n  vertical-align: middle;\n}\n.resize-handle[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 6px;\n  cursor: col-resize;\n  z-index: 100;\n  background: transparent;\n  transition: background 0.2s;\n}\n.resize-handle[_ngcontent-%COMP%]:hover {\n  background: rgba(24, 144, 255, 0.5);\n}\n.menu-sidebar.ant-layout-sider-collapsed[_ngcontent-%COMP%]   .ant-menu-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:not([nz-icon]), \n.menu-sidebar.ant-layout-sider-collapsed[_ngcontent-%COMP%]   .ant-menu-submenu-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:not([nz-icon]) {\n  display: none;\n}\n.menu-sidebar.ant-layout-sider-collapsed[_ngcontent-%COMP%]   .ant-menu-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n}\n  .ant-menu-dark .ant-menu-submenu-title {\n  color: rgba(255, 255, 255, 0.65) !important;\n}\n  .ant-menu-dark .ant-menu-submenu-title:hover {\n  color: #fff !important;\n}\n  .ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow {\n  color: rgba(255, 255, 255, 0.65) !important;\n}\n.menu-sidebar[_ngcontent-%COMP%]   .ant-menu-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:not([nz-icon]), \n.menu-sidebar[_ngcontent-%COMP%]   .ant-menu-submenu-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:not([nz-icon]) {\n  color: inherit;\n}\n.app-layout[_ngcontent-%COMP%]:has(.resize-handle:active)   .menu-sidebar[_ngcontent-%COMP%], \n.app-layout[_ngcontent-%COMP%]:has(.resize-handle:active)   .sidebar-logo[_ngcontent-%COMP%], \n.app-layout[_ngcontent-%COMP%]:has(.resize-handle:active)   .sidebar-logo[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  transition: none !important;\n}\n/*# sourceMappingURL=main-layout.component.css.map */'] });
var MainLayoutComponent = _MainLayoutComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MainLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-main-layout", standalone: true, imports: [
      CommonModule,
      RouterOutlet,
      RouterLink,
      NzLayoutModule,
      NzMenuModule,
      NzIconModule,
      NzButtonModule,
      NzAvatarModule,
      TranslateModule,
      NzDropDownModule,
      NzBreadCrumbModule,
      AppClaimDirective
    ], template: `<nz-layout class="app-layout" nzHasSider>
  <nz-sider class="menu-sidebar"
            nzCollapsible
            [nzWidth]="sidebarWidth"
            [nzCollapsedWidth]="80"
            [(nzCollapsed)]="isCollapsed"
            [nzTrigger]="null"
            [style.borderRight]="isCollapsed ? 'none' : sidebarBorderRight">
    <div class="sidebar-logo">
      <a routerLink="/">
        <img src="assets/logo.png" alt="logo">
        <h1>Tree Of Thought</h1>
      </a>
    </div>

    <ul nz-menu nzTheme="dark" nzMode="inline" [nzInlineCollapsed]="isCollapsed">
      <!-- <li nz-menu-item nzMatchRouter>
        <span nz-icon nzType="home"></span>
        <span><a routerLink="/">{{ 'Trang ch\u1EE7' | translate }}</a></span>
      </li>
      <li nz-menu-item nzMatchRouter>
        <span nz-icon nzType="info-circle"></span>
        <span><a routerLink="/about">{{ 'Gi\u1EDBi thi\u1EC7u' | translate }}</a></span>
      </li>
      <li nz-menu-item nzMatchRouter>
        <span nz-icon nzType="phone"></span>
        <span><a routerLink="/contact">{{ 'Li\xEAn h\u1EC7' | translate }}</a></span>
      </li> -->

      <li nz-submenu [nzTitle]="dashboardTitle" nzIcon="dashboard" *appClaimCheck="claims.CQRS_DASHBOARD.VIEW" [(nzOpen)]="openMap['dashboard']">
        <ng-template #dashboardTitle>
          <span>{{ 'Dashboard' | translate }}</span>
        </ng-template>
        <ul>
          <li nz-menu-item nzMatchRouter>
            <a routerLink="/modules/cqrs-dashboard">{{ 'CQRS Dashboard' | translate }}</a>
          </li>
        </ul>
      </li>

      <li nz-submenu [nzTitle]="authTitle" nzIcon="lock" *appClaimCheck="claims.AUTH.VIEW_USERS" [(nzOpen)]="openMap['auth']">
        <ng-template #authTitle>
          <span>{{ 'Core Infra Auth' | translate }}</span>
        </ng-template>
        <ul>
          <li nz-menu-item nzMatchRouter>
            <a routerLink="/modules/core-infra-auth/users">{{ 'Ng\u01B0\u1EDDi d\xF9ng' | translate }}</a>
          </li>
          <li nz-menu-item nzMatchRouter>
            <a routerLink="/modules/core-infra-auth/roles">{{ 'Vai tr\xF2' | translate }}</a>
          </li>
          <li nz-menu-item nzMatchRouter>
            <a routerLink="/modules/core-infra-auth/claims">{{ 'Quy\u1EC1n' | translate }}</a>
          </li>
          <li nz-menu-item nzMatchRouter *appClaimCheck="claims.AUTH.MANAGE_ACL">
            <a routerLink="/modules/core-infra-auth/acl">{{ 'Qu\u1EA3n l\xFD ACL' | translate }}</a>
          </li>
          <li nz-menu-item nzMatchRouter>
            <a routerLink="/modules/core-infra-auth/change-password">{{ '\u0110\u1ED5i m\u1EADt kh\u1EA9u' | translate }}</a>
          </li>
          <li nz-menu-item nzMatchRouter>
            <a routerLink="/modules/core-infra-auth/authorize-info">{{ 'Th\xF4ng tin ph\xE2n quy\u1EC1n' | translate }}</a>
          </li>

        </ul>
      </li>

      <li nz-submenu [nzTitle]="filesFoldersTitle" nzIcon="folder" *appClaimCheck="claims.FILES_FOLDERS.VIEW" [(nzOpen)]="openMap['files']">
        <ng-template #filesFoldersTitle>
          <span>{{ 'Qu\u1EA3n l\xFD t\xE0i li\u1EC7u' | translate }}</span>
        </ng-template>
        <ul>
          <li nz-menu-item nzMatchRouter>
            <a routerLink="/modules/files-folders">{{ 'Kh\xE1m ph\xE1 t\u1EC7p tin' | translate }}</a>
          </li>
        </ul>
      </li>

      <li nz-submenu [nzTitle]="testTitle" nzIcon="experiment" *appClaimCheck="claims.TEST_MODULE.VIEW" [(nzOpen)]="openMap['test']">
        <ng-template #testTitle>
          <span>{{ 'M\xF4-\u0111un th\u1EED nghi\u1EC7m' | translate }}</span>
        </ng-template>
        <ul>
          <li nz-menu-item nzMatchRouter>
            <a routerLink="/modules/test/firestore">{{ 'Th\u1EED nghi\u1EC7m Firestore' | translate }}</a>
          </li>
          <li nz-menu-item nzMatchRouter>
            <a routerLink="/modules/test/fcm">{{ 'Th\u1EED nghi\u1EC7m FCM' | translate }}</a>
          </li>
          <li nz-menu-item nzMatchRouter>
            <a routerLink="/modules/test/cqrs">{{ 'Th\u1EED nghi\u1EC7m CQRS' | translate }}</a>
          </li>
          <li nz-menu-item nzMatchRouter>
            <a routerLink="/modules/test/editor">{{ 'Th\u1EED nghi\u1EC7m CKEditor' | translate }}</a>
          </li>
        </ul>
      </li>
    </ul>
    <div class="resize-handle" (mousedown)="onMouseDown($event)" *ngIf="!isCollapsed"></div>
  </nz-sider>
  <nz-layout>
    <nz-header>
      <div class="app-header">
        <div class="header-left">
          <span class="header-trigger" (click)="toggleCollapse()">
              <span nz-icon [nzType]="isCollapsed ? 'menu-unfold' : 'menu-fold'"></span>
          </span>
          <!-- <div class="header-links">
            <a routerLink="/" class="nav-link">{{ 'Trang ch\u1EE7' | translate }}</a>
            <a routerLink="/about" class="nav-link">{{ 'Gi\u1EDBi thi\u1EC7u' | translate }}</a>
            <a routerLink="/contact" class="nav-link">{{ 'Li\xEAn h\u1EC7' | translate }}</a>
          </div> -->
        </div>
        <div class="header-right">
          <div class="lang-selector">
            <a nz-dropdown [nzDropdownMenu]="langMenu">
              <span nz-icon nzType="global"></span>
              {{ currentLang === 'vi' ? 'Ti\u1EBFng Vi\u1EC7t' : 'English' }}
              <span nz-icon nzType="down"></span>
            </a>
            <nz-dropdown-menu #langMenu="nzDropdownMenu">
              <ul nz-menu>
                <li nz-menu-item (click)="switchLanguage('vi')">Ti\u1EBFng Vi\u1EC7t</li>
                <li nz-menu-item (click)="switchLanguage('en')">English</li>
              </ul>
            </nz-dropdown-menu>
          </div>

          <ng-container *ngIf="user$ | async as user; else loginBtn">
            <span class="user-info">
              <nz-avatar nzIcon="user" [nzSrc]="user.picture || ''"></nz-avatar>
              <div class="user-text">
                <span class="username">{{ user.preferred_username }}</span>
                <span class="display-name">{{ user.name }}</span>
              </div>
            </span>
            <button nz-button nzType="link" (click)="logout()">{{ '\u0110\u0103ng xu\u1EA5t' | translate }}</button>
          </ng-container>
          <ng-template #loginBtn>
            <button nz-button nzType="primary" routerLink="/auth/login">{{ '\u0110\u0103ng nh\u1EADp' | translate }}</button>
          </ng-template>
        </div>
      </div>
    </nz-header>
    <nz-content>
      <div class="inner-content animate-fade-in">
        <nz-breadcrumb class="app-breadcrumb" *ngIf="breadcrumbs.length > 0">
          <nz-breadcrumb-item>
            <a routerLink="/">
              <span nz-icon nzType="home"></span>
            </a>
          </nz-breadcrumb-item>
          <nz-breadcrumb-item *ngFor="let item of breadcrumbs">
            <a [routerLink]="item.url">{{ item.label | translate }}</a>
          </nz-breadcrumb-item>
        </nz-breadcrumb>
        <router-outlet *appClaimCheck=""></router-outlet>
      </div>
    </nz-content>
  </nz-layout>
</nz-layout>
`, styles: ['/* src/app/layouts/main-layout/main-layout.component.css */\n.app-layout {\n  height: 100vh;\n}\n.menu-sidebar {\n  position: relative;\n  z-index: 10;\n  min-height: 100vh;\n  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);\n}\n.sidebar-logo {\n  position: relative;\n  height: 64px;\n  padding-left: 24px;\n  overflow: hidden;\n  line-height: 64px;\n  background: #001529;\n  transition: all 0.3s;\n}\n.sidebar-logo img {\n  display: inline-block;\n  height: 32px;\n  vertical-align: middle;\n}\n.sidebar-logo h1 {\n  display: inline-block;\n  margin: 0 0 0 12px;\n  color: #fff;\n  font-weight: 600;\n  font-size: 18px;\n  font-family:\n    Avenir,\n    "Helvetica Neue",\n    Arial,\n    Helvetica,\n    sans-serif;\n  vertical-align: middle;\n  transition: opacity 0.3s, width 0.3s;\n}\n.menu-sidebar.ant-layout-sider-collapsed .sidebar-logo h1 {\n  opacity: 0;\n  width: 0;\n  margin: 0;\n  overflow: hidden;\n  display: none;\n}\n.nz-header {\n  padding: 0;\n  width: 100%;\n  z-index: 2;\n}\n.app-header {\n  position: relative;\n  height: 64px;\n  padding: 0;\n  background: #fff;\n  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.header-left {\n  display: flex;\n  align-items: center;\n}\n.header-trigger {\n  height: 64px;\n  padding: 0 24px;\n  font-size: 18px;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.header-links {\n  margin-left: 12px;\n  display: flex;\n  gap: 20px;\n}\n.nav-link {\n  color: rgba(0, 0, 0, 0.65);\n  font-weight: 500;\n  transition: color 0.3s;\n}\n.nav-link:hover {\n  color: #1890ff;\n}\n.header-trigger:hover {\n  background: rgba(0, 0, 0, 0.025);\n}\n.header-right {\n  padding-right: 24px;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.lang-selector {\n  margin-right: 8px;\n  cursor: pointer;\n}\n.lang-selector a {\n  color: rgba(0, 0, 0, 0.65);\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.lang-selector a:hover {\n  color: #1890ff;\n}\n.user-info {\n  margin-right: 16px;\n  display: flex;\n  align-items: center;\n}\n.user-text {\n  display: flex;\n  flex-direction: column;\n  margin-left: 12px;\n  line-height: 1.2;\n}\n.username {\n  font-weight: 600;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.85);\n}\n.display-name {\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.45);\n}\n.inner-content {\n  padding: 24px;\n  background: #f0f2f5;\n  min-height: calc(100vh - 64px);\n}\n.app-breadcrumb {\n  margin-bottom: 8px;\n  padding: 0;\n  background: transparent;\n  box-shadow: none;\n  border-radius: 0;\n}\n.app-breadcrumb a {\n  color: rgba(0, 0, 0, 0.45);\n  transition: color 0.3s;\n  font-size: 13px;\n}\n.app-breadcrumb a:hover {\n  color: #1890ff;\n}\n.app-breadcrumb nz-breadcrumb-item:last-child a {\n  color: rgba(0, 0, 0, 0.85);\n  font-weight: 500;\n  pointer-events: none;\n}\n::ng-deep .ant-breadcrumb {\n  line-height: 1.2 !important;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  font-size: 14px;\n}\n::ng-deep .ant-breadcrumb-link,\n::ng-deep .ant-breadcrumb-link > a {\n  display: inline-flex;\n  align-items: center;\n}\n::ng-deep .ant-breadcrumb-separator {\n  margin: 0 4px !important;\n  color: rgba(0, 0, 0, 0.3) !important;\n  vertical-align: middle;\n}\n.resize-handle {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 6px;\n  cursor: col-resize;\n  z-index: 100;\n  background: transparent;\n  transition: background 0.2s;\n}\n.resize-handle:hover {\n  background: rgba(24, 144, 255, 0.5);\n}\n.menu-sidebar.ant-layout-sider-collapsed .ant-menu-item span:not([nz-icon]),\n.menu-sidebar.ant-layout-sider-collapsed .ant-menu-submenu-title span:not([nz-icon]) {\n  display: none;\n}\n.menu-sidebar.ant-layout-sider-collapsed .ant-menu-item a {\n  display: flex;\n  justify-content: center;\n}\n::ng-deep .ant-menu-dark .ant-menu-submenu-title {\n  color: rgba(255, 255, 255, 0.65) !important;\n}\n::ng-deep .ant-menu-dark .ant-menu-submenu-title:hover {\n  color: #fff !important;\n}\n::ng-deep .ant-menu-dark .ant-menu-submenu-title .ant-menu-submenu-arrow {\n  color: rgba(255, 255, 255, 0.65) !important;\n}\n.menu-sidebar .ant-menu-item span:not([nz-icon]),\n.menu-sidebar .ant-menu-submenu-title span:not([nz-icon]) {\n  color: inherit;\n}\n.app-layout:has(.resize-handle:active) .menu-sidebar,\n.app-layout:has(.resize-handle:active) .sidebar-logo,\n.app-layout:has(.resize-handle:active) .sidebar-logo h1 {\n  transition: none !important;\n}\n/*# sourceMappingURL=main-layout.component.css.map */\n'] }]
  }], () => [], { onMouseMove: [{
    type: HostListener,
    args: ["document:mousemove", ["$event"]]
  }], onMouseUp: [{
    type: HostListener,
    args: ["document:mouseup"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MainLayoutComponent, { className: "MainLayoutComponent", filePath: "src/app/layouts/main-layout/main-layout.component.ts", lineNumber: 36 });
})();

// src/app/layouts/auth-layout/auth-layout.component.ts
var _AuthLayoutComponent = class _AuthLayoutComponent {
};
_AuthLayoutComponent.\u0275fac = function AuthLayoutComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AuthLayoutComponent)();
};
_AuthLayoutComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthLayoutComponent, selectors: [["app-auth-layout"]], decls: 3, vars: 0, consts: [[1, "auth-container"], [1, "auth-content"]], template: function AuthLayoutComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275element(2, "router-outlet");
    \u0275\u0275elementEnd()();
  }
}, dependencies: [RouterOutlet], styles: ['\n.auth-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  background: #f0f2f5;\n  background:\n    radial-gradient(\n      circle at top left,\n      #e6f7ff 0%,\n      #ffffff 50%,\n      #f0f5ff 100%);\n  position: relative;\n  overflow: hidden;\n}\n.auth-container[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVirNRn9LqY9hS6969.png);\n  background-repeat: no-repeat;\n  background-position: center 110px;\n  background-size: 100%;\n  opacity: 0.4;\n  pointer-events: none;\n}\n.auth-content[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 440px;\n  padding: 40px;\n  background: #ffffff;\n  border-radius: 20px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n  border: 1px solid #eeeeee;\n  z-index: 1;\n}\n@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)) {\n  .auth-content[_ngcontent-%COMP%] {\n    background: rgba(255, 255, 255, 0.98);\n    backdrop-filter: blur(20px);\n    -webkit-backdrop-filter: blur(20px);\n  }\n}\n/*# sourceMappingURL=auth-layout.component.css.map */'] });
var AuthLayoutComponent = _AuthLayoutComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthLayoutComponent, [{
    type: Component,
    args: [{ selector: "app-auth-layout", standalone: true, imports: [RouterOutlet], template: '<div class="auth-container">\n  <div class="auth-content">\n    <router-outlet></router-outlet>\n  </div>\n</div>\n', styles: ['/* src/app/layouts/auth-layout/auth-layout.component.css */\n.auth-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  background: #f0f2f5;\n  background:\n    radial-gradient(\n      circle at top left,\n      #e6f7ff 0%,\n      #ffffff 50%,\n      #f0f5ff 100%);\n  position: relative;\n  overflow: hidden;\n}\n.auth-container::before {\n  content: "";\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVirNRn9LqY9hS6969.png);\n  background-repeat: no-repeat;\n  background-position: center 110px;\n  background-size: 100%;\n  opacity: 0.4;\n  pointer-events: none;\n}\n.auth-content {\n  width: 100%;\n  max-width: 440px;\n  padding: 40px;\n  background: #ffffff;\n  border-radius: 20px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n  border: 1px solid #eeeeee;\n  z-index: 1;\n}\n@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)) {\n  .auth-content {\n    background: rgba(255, 255, 255, 0.98);\n    backdrop-filter: blur(20px);\n    -webkit-backdrop-filter: blur(20px);\n  }\n}\n/*# sourceMappingURL=auth-layout.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthLayoutComponent, { className: "AuthLayoutComponent", filePath: "src/app/layouts/auth-layout/auth-layout.component.ts", lineNumber: 11 });
})();

// src/app/modules/auth/login/login.component.ts
function LoginComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 26);
    \u0275\u0275element(4, "span", 27);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.ssoClientName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 2, "K\u1EBFt n\u1ED1i an to\xE0n"), " ");
  }
}
function LoginComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementStart(3, "a", 29);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, "Ho\u1EB7c"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 4, "\u0110\u0103ng k\xFD ngay!"));
  }
}
function LoginComponent_ng_template_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "Ho\u1EB7c \u0111\u0103ng nh\u1EADp v\u1EDBi"));
  }
}
var _LoginComponent = class _LoginComponent {
  constructor() {
    this.fb = inject(NonNullableFormBuilder);
    this.authService = inject(AuthService);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.notification = inject(AppNotificationService);
    this.translate = inject(TranslateService);
    this.validateForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      remember: [true]
    });
    this.loading = false;
    this.ssoClientName = null;
    this.ssoRedirectUri = null;
    this.detectSsoContext();
  }
  ngOnInit() {
    const returnUrl = this.route.snapshot.queryParams["returnUrl"];
    this.authService.ssoComplete$.subscribe((complete) => {
      if (complete) {
        console.log("[Login] SSO process complete, handling redirect...");
        this.handleRedirect();
      }
    });
    if (this.authService.isLoggedIn() && !returnUrl) {
      console.log("[Login] User already logged in, redirecting to home");
      this.router.navigate(["/"]);
    }
  }
  detectSsoContext() {
    try {
      const returnUrl = this.route.snapshot.queryParams["returnUrl"];
      console.log("[SSO] returnUrl from queryParams:", returnUrl);
      if (!returnUrl)
        return;
      let fullUrl = returnUrl;
      if (!returnUrl.startsWith("http")) {
        fullUrl = window.location.origin + (returnUrl.startsWith("/") ? "" : "/") + returnUrl;
      }
      console.log("[SSO] Parsing full URL:", fullUrl);
      const url = new URL(fullUrl);
      const params = new URLSearchParams(url.search);
      this.ssoClientName = params.get("client_id");
      this.ssoRedirectUri = params.get("redirect_uri");
      console.log("[SSO] Detected Client ID:", this.ssoClientName);
      if (this.ssoClientName === "my_pc_assistant") {
        this.ssoClientName = "My PC Assistant App";
      }
    } catch (e) {
      console.error("[SSO] Error detecting context:", e);
    }
  }
  handleRedirect() {
    const returnUrl = this.route.snapshot.queryParams["returnUrl"];
    if (returnUrl) {
      window.location.href = returnUrl;
      return true;
    }
    return false;
  }
  async submitForm() {
    var _a;
    if (this.validateForm.valid) {
      this.loading = true;
      try {
        const response = await this.authService.login(this.validateForm.value);
        if (this.handleRedirect())
          return;
        if (response.mustChangePassword) {
          this.notification.warning(this.translate.instant("Y\xEAu c\u1EA7u \u0111\u1ED5i m\u1EADt kh\u1EA9u"), this.translate.instant("B\u1EA1n c\u1EA7n \u0111\u1ED5i m\u1EADt kh\u1EA9u m\u1EB7c \u0111\u1ECBnh tr\u01B0\u1EDBc khi ti\u1EBFp t\u1EE5c"));
          this.router.navigate(["/modules/core-infra-auth/change-password"]);
        } else {
          this.router.navigate(["/"]);
        }
      } catch (e) {
        console.error(e);
        this.notification.error(this.translate.instant("L\u1ED7i"), this.translate.instant(((_a = e.error) == null ? void 0 : _a.message) || "\u0110\u0103ng nh\u1EADp th\u1EA5t b\u1EA1i"));
      } finally {
        this.loading = false;
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  async loginWithGoogle() {
    this.loading = true;
    try {
      const completed = await this.authService.ssoLogin("google");
      if (completed) {
        this.handleRedirect();
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }
  async loginWithMS() {
    this.loading = true;
    try {
      const completed = await this.authService.ssoLogin("ms");
      if (completed) {
        this.handleRedirect();
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }
  async loginWithFacebook() {
    this.loading = true;
    try {
      const completed = await this.authService.ssoLogin("facebook");
      if (completed) {
        this.handleRedirect();
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }
};
_LoginComponent.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoginComponent)();
};
_LoginComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 50, vars: 41, consts: [["dividerText", ""], [1, "login-container", "animate-fade-in"], [1, "login-header"], ["class", "sso-badge glass-card", 4, "ngIf"], ["nz-form", "", 3, "ngSubmit", "formGroup"], [3, "nzErrorTip"], ["nzPrefixIcon", "user", 1, "premium-input"], ["type", "text", "nz-input", "", "formControlName", "username", 3, "placeholder"], ["nzPrefixIcon", "lock", 1, "premium-input"], ["type", "password", "nz-input", "", "formControlName", "password", 3, "placeholder"], ["nz-row", "", 1, "login-form-margin"], ["nz-col", "", 3, "nzSpan"], ["nz-checkbox", "", "formControlName", "remember"], ["nz-col", "", 1, "text-right", 3, "nzSpan"], [1, "login-form-forgot"], ["nz-button", "", "nzHtmlType", "submit", 1, "login-btn", "premium-button", 3, "nzType", "nzLoading"], ["nz-icon", "", "nzType", "arrow-right"], ["class", "register-link", 4, "ngIf"], [3, "nzText"], [1, "sso-social-buttons"], ["nz-button", "", "nzBlock", "", "type", "button", 1, "social-btn", "google", 3, "click"], ["nz-icon", "", "nzType", "google"], ["nz-button", "", "nzBlock", "", "type", "button", 1, "social-btn", "ms", 3, "click"], ["nz-icon", "", "nzType", "windows"], [1, "sso-badge", "glass-card"], [1, "client-name"], [1, "security-check"], ["nz-icon", "", "nzType", "safety-certificate", "nzTheme", "fill"], [1, "register-link"], ["routerLink", "/auth/signup"], [1, "divider-text"]], template: function LoginComponent_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, LoginComponent_div_8_Template, 7, 4, "div", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "form", 4);
    \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_9_listener($event) {
      \u0275\u0275restoreView(_r1);
      $event.preventDefault();
      return \u0275\u0275resetView(ctx.submitForm());
    });
    \u0275\u0275elementStart(10, "nz-form-item")(11, "nz-form-control", 5);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementStart(13, "nz-input-group", 6);
    \u0275\u0275element(14, "input", 7);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "nz-form-item")(17, "nz-form-control", 5);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275elementStart(19, "nz-input-group", 8);
    \u0275\u0275element(20, "input", 9);
    \u0275\u0275pipe(21, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 10)(23, "div", 11)(24, "label", 12)(25, "span");
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 13)(29, "a", 14);
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "button", 15)(33, "span");
    \u0275\u0275text(34);
    \u0275\u0275pipe(35, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(36, "span", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, LoginComponent_div_37_Template, 6, 6, "div", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275element(38, "nz-divider", 18);
    \u0275\u0275template(39, LoginComponent_ng_template_39_Template, 3, 3, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    \u0275\u0275elementStart(41, "div", 19)(42, "button", 20);
    \u0275\u0275listener("click", function LoginComponent_Template_button_click_42_listener() {
      return ctx.loginWithGoogle();
    });
    \u0275\u0275element(43, "span", 21);
    \u0275\u0275text(44);
    \u0275\u0275pipe(45, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "button", 22);
    \u0275\u0275listener("click", function LoginComponent_Template_button_click_46_listener() {
      return ctx.loginWithMS();
    });
    \u0275\u0275element(47, "span", 23);
    \u0275\u0275text(48);
    \u0275\u0275pipe(49, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const dividerText_r3 = \u0275\u0275reference(40);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 19, ctx.ssoClientName ? "\u0110\u0103ng nh\u1EADp SSO" : "\u0110\u0103ng nh\u1EADp"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 21, ctx.ssoClientName ? "B\u1EA1n \u0111ang \u0111\u0103ng nh\u1EADp v\xE0o" : "Nh\u1EADp th\xF4ng tin c\u1EE7a b\u1EA1n \u0111\u1EC3 truy c\u1EADp h\u1EC7 th\u1ED1ng"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx.ssoClientName);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx.validateForm);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzErrorTip", \u0275\u0275pipeBind1(12, 23, "Vui l\xF2ng nh\u1EADp t\xEAn \u0111\u0103ng nh\u1EADp!"));
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(15, 25, "T\xEAn \u0111\u0103ng nh\u1EADp"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzErrorTip", \u0275\u0275pipeBind1(18, 27, "Vui l\xF2ng nh\u1EADp m\u1EADt kh\u1EA9u!"));
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(21, 29, "M\u1EADt kh\u1EA9u"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzSpan", 12);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(27, 31, "Ghi nh\u1EDB t\xF4i"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzSpan", 12);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(31, 33, "Qu\xEAn m\u1EADt kh\u1EA9u"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzType", "primary")("nzLoading", ctx.loading);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(35, 35, ctx.ssoClientName ? "Ti\u1EBFp t\u1EE5c \u0111\u0103ng nh\u1EADp" : "\u0110\u0103ng nh\u1EADp"));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", !ctx.ssoClientName);
    \u0275\u0275advance();
    \u0275\u0275property("nzText", dividerText_r3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(45, 37, "Google"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(49, 39, "Microsoft"), " ");
  }
}, dependencies: [
  CommonModule,
  NgIf,
  ReactiveFormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  FormGroupDirective,
  FormControlName,
  RouterLink,
  NzFormModule,
  NzColDirective,
  NzRowDirective,
  NzFormDirective,
  NzFormItemComponent,
  NzFormControlComponent,
  NzInputModule,
  NzInputDirective,
  NzInputGroupComponent,
  NzButtonModule,
  NzButtonComponent,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzCheckboxModule,
  NzCheckboxComponent,
  NzDividerModule,
  NzDividerComponent,
  NzIconModule,
  NzIconDirective,
  TranslateModule,
  TranslatePipe
], styles: ["\n.login-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.login-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.brand-logo[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  background:\n    linear-gradient(\n      135deg,\n      #1890ff 0%,\n      #096dd9 100%);\n  color: white;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 16px;\n  font-size: 32px;\n  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);\n}\n.login-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 700;\n  margin-bottom: 8px;\n  color: #262626;\n}\n.login-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #8c8c8c;\n  margin-bottom: 0;\n}\n.sso-badge[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  border: 1px solid rgba(24, 144, 255, 0.2);\n  background: rgba(24, 144, 255, 0.05);\n}\n.client-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1890ff;\n  font-size: 16px;\n}\n.security-check[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #52c41a;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.premium-input[_ngcontent-%COMP%]     .ant-input-affix-wrapper {\n  padding: 10px 12px;\n  border-radius: 8px;\n  border: 1.5px solid #f0f0f0;\n  transition: all 0.3s;\n}\n.premium-input[_ngcontent-%COMP%]     .ant-input-affix-wrapper-focused {\n  border-color: #1890ff;\n  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);\n}\n.login-form-margin[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.login-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 44px;\n  font-size: 16px;\n  font-weight: 600;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.register-link[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 16px;\n  color: #8c8c8c;\n}\n.divider-text[_ngcontent-%COMP%] {\n  color: #bfbfbf;\n  font-size: 12px;\n  font-weight: 400;\n}\n.sso-social-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.social-btn[_ngcontent-%COMP%] {\n  height: 40px;\n  border-radius: 8px;\n  border: 1px solid #d9d9d9;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.social-btn[_ngcontent-%COMP%]:hover {\n  background: #fafafa;\n  border-color: #bfbfbf;\n}\n.social-btn.google[_ngcontent-%COMP%]   [nz-icon][_ngcontent-%COMP%] {\n  color: #db4437;\n}\n.social-btn.ms[_ngcontent-%COMP%]   [nz-icon][_ngcontent-%COMP%] {\n  color: #00a4ef;\n}\n/*# sourceMappingURL=login.component.css.map */"] });
var LoginComponent = _LoginComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterLink,
      NzFormModule,
      NzInputModule,
      NzButtonModule,
      NzCheckboxModule,
      NzDividerModule,
      NzIconModule,
      TranslateModule
    ], template: `<div class="login-container animate-fade-in">
  <div class="login-header">
    <!-- <div class="brand-logo">
      <span nz-icon nzType="cluster" nzTheme="outline"></span>
    </div> -->
    <h2>{{ (ssoClientName ? '\u0110\u0103ng nh\u1EADp SSO' : '\u0110\u0103ng nh\u1EADp') | translate }}</h2>
    <p>{{ (ssoClientName ? 'B\u1EA1n \u0111ang \u0111\u0103ng nh\u1EADp v\xE0o' : 'Nh\u1EADp th\xF4ng tin c\u1EE7a b\u1EA1n \u0111\u1EC3 truy c\u1EADp h\u1EC7 th\u1ED1ng') | translate }}</p>
    
    <div *ngIf="ssoClientName" class="sso-badge glass-card">
      <span class="client-name">{{ ssoClientName }}</span>
      <div class="security-check">
        <span nz-icon nzType="safety-certificate" nzTheme="fill"></span>
        {{ 'K\u1EBFt n\u1ED1i an to\xE0n' | translate }}
      </div>
    </div>
  </div>

  <form nz-form [formGroup]="validateForm" (ngSubmit)="$event.preventDefault(); submitForm()">
    <nz-form-item>
      <nz-form-control [nzErrorTip]="'Vui l\xF2ng nh\u1EADp t\xEAn \u0111\u0103ng nh\u1EADp!' | translate">
        <nz-input-group nzPrefixIcon="user" class="premium-input">
          <input type="text" nz-input formControlName="username" [placeholder]="'T\xEAn \u0111\u0103ng nh\u1EADp' | translate" />
        </nz-input-group>
      </nz-form-control>
    </nz-form-item>

    <nz-form-item>
      <nz-form-control [nzErrorTip]="'Vui l\xF2ng nh\u1EADp m\u1EADt kh\u1EA9u!' | translate">
        <nz-input-group nzPrefixIcon="lock" class="premium-input">
          <input type="password" nz-input formControlName="password" [placeholder]="'M\u1EADt kh\u1EA9u' | translate" />
        </nz-input-group>
      </nz-form-control>
    </nz-form-item>

    <div nz-row class="login-form-margin">
      <div nz-col [nzSpan]="12">
        <label nz-checkbox formControlName="remember">
          <span>{{ 'Ghi nh\u1EDB t\xF4i' | translate }}</span>
        </label>
      </div>
      <div nz-col [nzSpan]="12" class="text-right">
        <a class="login-form-forgot">{{ 'Qu\xEAn m\u1EADt kh\u1EA9u' | translate }}</a>
      </div>
    </div>

    <button nz-button nzHtmlType="submit" class="login-btn premium-button" [nzType]="'primary'" [nzLoading]="loading">
      <span>{{ (ssoClientName ? 'Ti\u1EBFp t\u1EE5c \u0111\u0103ng nh\u1EADp' : '\u0110\u0103ng nh\u1EADp') | translate }}</span>
      <span nz-icon nzType="arrow-right"></span>
    </button>
    
    <div class="register-link" *ngIf="!ssoClientName">
      {{ 'Ho\u1EB7c' | translate }} <a routerLink="/auth/signup">{{ '\u0110\u0103ng k\xFD ngay!' | translate }}</a>
    </div>
  </form>

  <nz-divider [nzText]="dividerText"></nz-divider>
  <ng-template #dividerText>
    <span class="divider-text">{{ 'Ho\u1EB7c \u0111\u0103ng nh\u1EADp v\u1EDBi' | translate }}</span>
  </ng-template>

  <div class="sso-social-buttons">
    <button nz-button nzBlock type="button" class="social-btn google" (click)="loginWithGoogle()">
      <span nz-icon nzType="google"></span> {{ 'Google' | translate }}
    </button>
    <button nz-button nzBlock type="button" class="social-btn ms" (click)="loginWithMS()">
      <span nz-icon nzType="windows"></span> {{ 'Microsoft' | translate }}
    </button>
  </div>
</div>
`, styles: ["/* src/app/modules/auth/login/login.component.css */\n.login-container {\n  display: flex;\n  flex-direction: column;\n}\n.login-header {\n  text-align: center;\n  margin-bottom: 32px;\n}\n.brand-logo {\n  width: 64px;\n  height: 64px;\n  background:\n    linear-gradient(\n      135deg,\n      #1890ff 0%,\n      #096dd9 100%);\n  color: white;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 16px;\n  font-size: 32px;\n  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);\n}\n.login-header h2 {\n  font-size: 24px;\n  font-weight: 700;\n  margin-bottom: 8px;\n  color: #262626;\n}\n.login-header p {\n  color: #8c8c8c;\n  margin-bottom: 0;\n}\n.sso-badge {\n  margin-top: 16px;\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  border: 1px solid rgba(24, 144, 255, 0.2);\n  background: rgba(24, 144, 255, 0.05);\n}\n.client-name {\n  font-weight: 600;\n  color: #1890ff;\n  font-size: 16px;\n}\n.security-check {\n  font-size: 12px;\n  color: #52c41a;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.premium-input ::ng-deep .ant-input-affix-wrapper {\n  padding: 10px 12px;\n  border-radius: 8px;\n  border: 1.5px solid #f0f0f0;\n  transition: all 0.3s;\n}\n.premium-input ::ng-deep .ant-input-affix-wrapper-focused {\n  border-color: #1890ff;\n  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);\n}\n.login-form-margin {\n  margin-bottom: 24px;\n}\n.login-btn {\n  width: 100%;\n  height: 44px;\n  font-size: 16px;\n  font-weight: 600;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.register-link {\n  text-align: center;\n  margin-top: 16px;\n  color: #8c8c8c;\n}\n.divider-text {\n  color: #bfbfbf;\n  font-size: 12px;\n  font-weight: 400;\n}\n.sso-social-buttons {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.social-btn {\n  height: 40px;\n  border-radius: 8px;\n  border: 1px solid #d9d9d9;\n  font-weight: 500;\n  transition: all 0.2s;\n}\n.social-btn:hover {\n  background: #fafafa;\n  border-color: #bfbfbf;\n}\n.social-btn.google [nz-icon] {\n  color: #db4437;\n}\n.social-btn.ms [nz-icon] {\n  color: #00a4ef;\n}\n/*# sourceMappingURL=login.component.css.map */\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/modules/auth/login/login.component.ts", lineNumber: 39 });
})();

// src/app/modules/auth/signup/signup.component.ts
var _SignupComponent = class _SignupComponent {
  constructor() {
    this.fb = inject(NonNullableFormBuilder);
    this.authService = inject(AuthService);
    this.router = inject(Router);
    this.notification = inject(AppNotificationService);
    this.translate = inject(TranslateService);
    this.validateForm = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      displayName: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    });
    this.loading = false;
    this.ssoClientName = null;
  }
  ngOnInit() {
    this.authService.ssoComplete$.subscribe((complete) => {
      if (complete) {
        this.router.navigate(["/"]);
      }
    });
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/"]);
    }
  }
  async submitForm() {
    if (this.validateForm.valid) {
      if (this.validateForm.value.password !== this.validateForm.value.confirmPassword) {
        this.notification.error(this.translate.instant("Th\u1EA5t b\u1EA1i"), this.translate.instant("M\u1EADt kh\u1EA9u kh\xF4ng kh\u1EDBp"));
        return;
      }
      this.loading = true;
      try {
        await this.authService.signup(this.validateForm.value);
        this.notification.success(this.translate.instant("Th\xE0nh c\xF4ng"), this.translate.instant("\u0110\u0103ng k\xFD th\xE0nh c\xF4ng. Vui l\xF2ng ki\u1EC3m tra email \u0111\u1EC3 x\xE1c nh\u1EADn v\xE0 sau \u0111\xF3 \u0111\u0103ng nh\u1EADp."));
        this.router.navigate(["/auth/login"]);
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  async signupWithGoogle() {
    this.loading = true;
    try {
      const completed = await this.authService.ssoLogin("google");
      if (completed) {
        this.router.navigate(["/"]);
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }
  async signupWithMS() {
    this.loading = true;
    try {
      const completed = await this.authService.ssoLogin("ms");
      if (completed) {
        this.router.navigate(["/"]);
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }
  async signupWithFacebook() {
    this.loading = true;
    try {
      const completed = await this.authService.ssoLogin("facebook");
      if (completed) {
        this.router.navigate(["/"]);
      }
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }
};
_SignupComponent.\u0275fac = function SignupComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SignupComponent)();
};
_SignupComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SignupComponent, selectors: [["app-signup"]], decls: 62, vars: 63, consts: [[1, "signup-page"], [1, "signup-header"], ["nz-form", "", 3, "ngSubmit", "formGroup"], [3, "nzErrorTip"], ["nzPrefixIcon", "user"], ["type", "text", "nz-input", "", "formControlName", "username", 3, "placeholder"], ["nzPrefixIcon", "mail"], ["type", "email", "nz-input", "", "formControlName", "email", 3, "placeholder"], ["nzPrefixIcon", "idcard"], ["type", "text", "nz-input", "", "formControlName", "displayName", 3, "placeholder"], ["nzPrefixIcon", "lock"], ["type", "password", "nz-input", "", "formControlName", "password", 3, "placeholder"], ["type", "password", "nz-input", "", "formControlName", "confirmPassword", 3, "placeholder"], ["nz-button", "", 1, "signup-form-button", 3, "nzType", "nzLoading"], ["routerLink", "/auth/login"], [3, "nzText"], [1, "sso-buttons"], ["nz-button", "", "nzType", "default", 3, "click", "nzLoading"], ["nz-icon", "", "nzType", "google"], ["nz-icon", "", "nzType", "windows"], ["nz-icon", "", "nzType", "facebook"]], template: function SignupComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "form", 2);
    \u0275\u0275listener("ngSubmit", function SignupComponent_Template_form_ngSubmit_8_listener($event) {
      $event.preventDefault();
      return ctx.submitForm();
    });
    \u0275\u0275elementStart(9, "nz-form-item")(10, "nz-form-control", 3);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementStart(12, "nz-input-group", 4);
    \u0275\u0275element(13, "input", 5);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "nz-form-item")(16, "nz-form-control", 3);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementStart(18, "nz-input-group", 6);
    \u0275\u0275element(19, "input", 7);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "nz-form-item")(22, "nz-form-control", 3);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementStart(24, "nz-input-group", 8);
    \u0275\u0275element(25, "input", 9);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "nz-form-item")(28, "nz-form-control", 3);
    \u0275\u0275pipe(29, "translate");
    \u0275\u0275elementStart(30, "nz-input-group", 10);
    \u0275\u0275element(31, "input", 11);
    \u0275\u0275pipe(32, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "nz-form-item")(34, "nz-form-control", 3);
    \u0275\u0275pipe(35, "translate");
    \u0275\u0275elementStart(36, "nz-input-group", 10);
    \u0275\u0275element(37, "input", 12);
    \u0275\u0275pipe(38, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "button", 13);
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275text(42);
    \u0275\u0275pipe(43, "translate");
    \u0275\u0275elementStart(44, "a", 14);
    \u0275\u0275text(45);
    \u0275\u0275pipe(46, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(47, "nz-divider", 15);
    \u0275\u0275pipe(48, "translate");
    \u0275\u0275elementStart(49, "div", 16)(50, "button", 17);
    \u0275\u0275listener("click", function SignupComponent_Template_button_click_50_listener() {
      return ctx.signupWithGoogle();
    });
    \u0275\u0275element(51, "span", 18);
    \u0275\u0275text(52);
    \u0275\u0275pipe(53, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "button", 17);
    \u0275\u0275listener("click", function SignupComponent_Template_button_click_54_listener() {
      return ctx.signupWithMS();
    });
    \u0275\u0275element(55, "span", 19);
    \u0275\u0275text(56);
    \u0275\u0275pipe(57, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "button", 17);
    \u0275\u0275listener("click", function SignupComponent_Template_button_click_58_listener() {
      return ctx.signupWithFacebook();
    });
    \u0275\u0275element(59, "span", 20);
    \u0275\u0275text(60);
    \u0275\u0275pipe(61, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 25, "\u0110\u0103ng k\xFD"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 27, "Nh\u1EADp th\xF4ng tin c\u1EE7a b\u1EA1n \u0111\u1EC3 b\u1EAFt \u0111\u1EA7u"));
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx.validateForm);
    \u0275\u0275advance(2);
    \u0275\u0275property("nzErrorTip", \u0275\u0275pipeBind1(11, 29, "Vui l\xF2ng nh\u1EADp t\xEAn \u0111\u0103ng nh\u1EADp!"));
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(14, 31, "T\xEAn \u0111\u0103ng nh\u1EADp"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzErrorTip", \u0275\u0275pipeBind1(17, 33, "Vui l\xF2ng nh\u1EADp email!"));
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(20, 35, "Email"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzErrorTip", \u0275\u0275pipeBind1(23, 37, "Vui l\xF2ng nh\u1EADp t\xEAn hi\u1EC3n th\u1ECB!"));
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(26, 39, "T\xEAn hi\u1EC3n th\u1ECB"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzErrorTip", \u0275\u0275pipeBind1(29, 41, "Vui l\xF2ng nh\u1EADp m\u1EADt kh\u1EA9u!"));
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(32, 43, "M\u1EADt kh\u1EA9u"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzErrorTip", \u0275\u0275pipeBind1(35, 45, "Vui l\xF2ng x\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi!"));
    \u0275\u0275advance(3);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(38, 47, "X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzType", "primary")("nzLoading", ctx.loading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(41, 49, "\u0110\u0103ng k\xFD"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(43, 51, "\u0110\xE3 c\xF3 t\xE0i kho\u1EA3n?"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(46, 53, "\u0110\u0103ng nh\u1EADp"));
    \u0275\u0275advance(2);
    \u0275\u0275property("nzText", \u0275\u0275pipeBind1(48, 55, "Ho\u1EB7c \u0111\u0103ng nh\u1EADp v\u1EDBi"));
    \u0275\u0275advance(3);
    \u0275\u0275property("nzLoading", ctx.loading);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(53, 57, "Google"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("nzLoading", ctx.loading);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(57, 59, "Microsoft"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("nzLoading", ctx.loading);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(61, 61, "Facebook"), " ");
  }
}, dependencies: [
  CommonModule,
  ReactiveFormsModule,
  \u0275NgNoValidate,
  DefaultValueAccessor,
  NgControlStatus,
  NgControlStatusGroup,
  FormGroupDirective,
  FormControlName,
  RouterLink,
  NzFormModule,
  NzColDirective,
  NzRowDirective,
  NzFormDirective,
  NzFormItemComponent,
  NzFormControlComponent,
  NzInputModule,
  NzInputDirective,
  NzInputGroupComponent,
  NzButtonModule,
  NzButtonComponent,
  NzTransitionPatchDirective,
  NzWaveDirective,
  NzIconModule,
  NzIconDirective,
  NzDividerModule,
  NzDividerComponent,
  TranslateModule,
  TranslatePipe
], styles: ["\n.signup-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 24px;\n}\n.signup-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n  font-weight: 600;\n}\n.signup-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.45);\n}\n.signup-form-button[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 16px;\n}\n.sso-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.sso-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n/*# sourceMappingURL=signup.component.css.map */"] });
var SignupComponent = _SignupComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SignupComponent, [{
    type: Component,
    args: [{ selector: "app-signup", standalone: true, imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterLink,
      NzFormModule,
      NzInputModule,
      NzButtonModule,
      NzIconModule,
      NzDividerModule,
      TranslateModule
    ], template: `<div class="signup-page">
  <div class="signup-header">
    <h2>{{ '\u0110\u0103ng k\xFD' | translate }}</h2>
    <p>{{ 'Nh\u1EADp th\xF4ng tin c\u1EE7a b\u1EA1n \u0111\u1EC3 b\u1EAFt \u0111\u1EA7u' | translate }}</p>
  </div>

  <form nz-form [formGroup]="validateForm" (ngSubmit)="$event.preventDefault(); submitForm()">
    <nz-form-item>
      <nz-form-control [nzErrorTip]="'Vui l\xF2ng nh\u1EADp t\xEAn \u0111\u0103ng nh\u1EADp!' | translate">
        <nz-input-group nzPrefixIcon="user">
          <input type="text" nz-input formControlName="username" [placeholder]="'T\xEAn \u0111\u0103ng nh\u1EADp' | translate" />
        </nz-input-group>
      </nz-form-control>
    </nz-form-item>

    <nz-form-item>
      <nz-form-control [nzErrorTip]="'Vui l\xF2ng nh\u1EADp email!' | translate">
        <nz-input-group nzPrefixIcon="mail">
          <input type="email" nz-input formControlName="email" [placeholder]="'Email' | translate" />
        </nz-input-group>
      </nz-form-control>
    </nz-form-item>

    <nz-form-item>
      <nz-form-control [nzErrorTip]="'Vui l\xF2ng nh\u1EADp t\xEAn hi\u1EC3n th\u1ECB!' | translate">
        <nz-input-group nzPrefixIcon="idcard">
          <input type="text" nz-input formControlName="displayName" [placeholder]="'T\xEAn hi\u1EC3n th\u1ECB' | translate" />
        </nz-input-group>
      </nz-form-control>
    </nz-form-item>

    <nz-form-item>
      <nz-form-control [nzErrorTip]="'Vui l\xF2ng nh\u1EADp m\u1EADt kh\u1EA9u!' | translate">
        <nz-input-group nzPrefixIcon="lock">
          <input type="password" nz-input formControlName="password" [placeholder]="'M\u1EADt kh\u1EA9u' | translate" />
        </nz-input-group>
      </nz-form-control>
    </nz-form-item>

    <nz-form-item>
      <nz-form-control [nzErrorTip]="'Vui l\xF2ng x\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi!' | translate">
        <nz-input-group nzPrefixIcon="lock">
          <input type="password" nz-input formControlName="confirmPassword" [placeholder]="'X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi' | translate" />
        </nz-input-group>
      </nz-form-control>
    </nz-form-item>

    <button nz-button class="signup-form-button" [nzType]="'primary'" [nzLoading]="loading">{{ '\u0110\u0103ng k\xFD' | translate }}</button>
    {{ '\u0110\xE3 c\xF3 t\xE0i kho\u1EA3n?' | translate }} <a routerLink="/auth/login">{{ '\u0110\u0103ng nh\u1EADp' | translate }}</a>

    <nz-divider [nzText]="('Ho\u1EB7c \u0111\u0103ng nh\u1EADp v\u1EDBi' | translate)"></nz-divider>

    <div class="sso-buttons">
      <button nz-button nzType="default" (click)="signupWithGoogle()" [nzLoading]="loading">
        <span nz-icon nzType="google"></span> {{ 'Google' | translate }}
      </button>
      <button nz-button nzType="default" (click)="signupWithMS()" [nzLoading]="loading">
        <span nz-icon nzType="windows"></span> {{ 'Microsoft' | translate }}
      </button>
      <button nz-button nzType="default" (click)="signupWithFacebook()" [nzLoading]="loading">
        <span nz-icon nzType="facebook"></span> {{ 'Facebook' | translate }}
      </button>
    </div>
  </form>
</div>
`, styles: ["/* src/app/modules/auth/signup/signup.component.css */\n.signup-header {\n  text-align: center;\n  margin-bottom: 24px;\n}\n.signup-header h2 {\n  margin-bottom: 8px;\n  font-weight: 600;\n}\n.signup-header p {\n  color: rgba(0, 0, 0, 0.45);\n}\n.signup-form-button {\n  width: 100%;\n  margin-bottom: 16px;\n}\n.sso-buttons {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.sso-buttons button {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n/*# sourceMappingURL=signup.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SignupComponent, { className: "SignupComponent", filePath: "src/app/modules/auth/signup/signup.component.ts", lineNumber: 31 });
})();

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      { path: "", redirectTo: "modules/cqrs-dashboard", pathMatch: "full" },
      {
        path: "modules/cqrs-dashboard",
        data: { breadcrumb: "CQRS Dashboard" },
        children: [
          {
            path: "",
            loadComponent: () => import("./chunk-QGFQECYR.js").then((m) => m.DashboardComponent)
            // canActivate: [claimGuard(APP_CLAIMS.CQRS_DASHBOARD.VIEW)]
          },
          {
            path: "tracing/:id",
            loadComponent: () => import("./chunk-QGFQECYR.js").then((m) => m.TracingComponent),
            // canActivate: [claimGuard(APP_CLAIMS.CQRS_DASHBOARD.VIEW)],
            data: { breadcrumb: "Tracing" }
          },
          {
            path: "messages/:queueName",
            loadComponent: () => import("./chunk-QGFQECYR.js").then((m) => m.MessageListComponent),
            // canActivate: [claimGuard(APP_CLAIMS.CQRS_DASHBOARD.VIEW)],
            data: { breadcrumb: "Messages" }
          },
          {
            path: "cqrs",
            loadComponent: () => import("./chunk-QGFQECYR.js").then((m) => m.CqrsTestComponent),
            data: { breadcrumb: "CQRS Test" }
          }
        ]
      },
      {
        path: "modules/test",
        data: { breadcrumb: "M\xF4-\u0111un th\u1EED nghi\u1EC7m" },
        children: [
          {
            path: "firestore",
            loadComponent: () => import("./chunk-GGIESCKC.js").then((m) => m.FirestoreTestComponent),
            data: { breadcrumb: "Firestore Test" }
          },
          {
            path: "fcm",
            loadComponent: () => import("./chunk-GGIESCKC.js").then((m) => m.FcmTestComponent),
            data: { breadcrumb: "FCM Test" }
          },
          {
            path: "editor",
            loadComponent: () => import("./chunk-GGIESCKC.js").then((m) => m.EditorTestComponent),
            data: { breadcrumb: "Editor Test" }
          }
        ]
      },
      {
        path: "modules/core-infra-auth",
        data: { breadcrumb: "Core Infra Auth" },
        children: [
          {
            path: "users",
            loadComponent: () => import("./chunk-ZGNCBCHC.js").then((m) => m.UserListComponent),
            canActivate: [claimGuard(APP_CLAIMS.AUTH.VIEW_USERS)],
            data: { breadcrumb: "Ng\u01B0\u1EDDi d\xF9ng" }
          },
          {
            path: "roles",
            loadComponent: () => import("./chunk-ZGNCBCHC.js").then((m) => m.RoleListComponent),
            canActivate: [claimGuard(APP_CLAIMS.AUTH.VIEW_ROLES)],
            data: { breadcrumb: "Vai tr\xF2" }
          },
          {
            path: "claims",
            loadComponent: () => import("./chunk-ZGNCBCHC.js").then((m) => m.ClaimSyncComponent),
            canActivate: [claimGuard(APP_CLAIMS.AUTH.VIEW_CLAIMS)],
            data: { breadcrumb: "Quy\u1EC1n" }
          },
          {
            path: "acl",
            loadComponent: () => import("./chunk-ZGNCBCHC.js").then((m) => m.AclListComponent),
            canActivate: [claimGuard(APP_CLAIMS.AUTH.MANAGE_ACL)],
            data: { breadcrumb: "Qu\u1EA3n l\xFD ACL" }
          },
          {
            path: "change-password",
            loadComponent: () => import("./chunk-ZGNCBCHC.js").then((m) => m.ChangePasswordComponent),
            data: { breadcrumb: "\u0110\u1ED5i m\u1EADt kh\u1EA9u" }
          },
          {
            path: "authorize-info",
            loadComponent: () => import("./chunk-ZGNCBCHC.js").then((m) => m.AuthorizeInfoComponent),
            data: { breadcrumb: "Th\xF4ng tin ph\xE2n quy\u1EC1n" }
          }
        ]
      },
      {
        path: "modules/files-folders",
        data: { breadcrumb: "Qu\u1EA3n l\xFD t\xE0i li\u1EC7u" },
        loadComponent: () => import("./chunk-3H5CKQJF.js").then((m) => m.FilesFolders)
      }
    ]
  },
  {
    path: "auth",
    component: AuthLayoutComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent }
    ]
  }
];

// node_modules/@angular/platform-browser/fesm2022/animations-async.mjs
var ANIMATION_PREFIX = "@";
var _AsyncAnimationRendererFactory = class _AsyncAnimationRendererFactory {
  constructor(doc, delegate, zone, animationType, moduleImpl) {
    __publicField(this, "doc");
    __publicField(this, "delegate");
    __publicField(this, "zone");
    __publicField(this, "animationType");
    __publicField(this, "moduleImpl");
    __publicField(this, "_rendererFactoryPromise", null);
    __publicField(this, "scheduler", null);
    __publicField(this, "injector", inject(Injector));
    __publicField(this, "loadingSchedulerFn", inject(\u0275ASYNC_ANIMATION_LOADING_SCHEDULER_FN, {
      optional: true
    }));
    __publicField(this, "_engine");
    this.doc = doc;
    this.delegate = delegate;
    this.zone = zone;
    this.animationType = animationType;
    this.moduleImpl = moduleImpl;
  }
  ngOnDestroy() {
    var _a;
    (_a = this._engine) == null ? void 0 : _a.flush();
  }
  loadImpl() {
    const loadFn = () => {
      var _a;
      return (_a = this.moduleImpl) != null ? _a : import("./chunk-7KKD64HX.js").then((m) => m);
    };
    let moduleImplPromise;
    if (this.loadingSchedulerFn) {
      moduleImplPromise = this.loadingSchedulerFn(loadFn);
    } else {
      moduleImplPromise = loadFn();
    }
    return moduleImplPromise.catch((e) => {
      throw new RuntimeError(5300, (typeof ngDevMode === "undefined" || ngDevMode) && "Async loading for animations package was enabled, but loading failed. Angular falls back to using regular rendering. No animations will be displayed and their styles won't be applied.");
    }).then(({
      \u0275createEngine,
      \u0275AnimationRendererFactory
    }) => {
      this._engine = \u0275createEngine(this.animationType, this.doc);
      const rendererFactory = new \u0275AnimationRendererFactory(this.delegate, this._engine, this.zone);
      this.delegate = rendererFactory;
      return rendererFactory;
    });
  }
  createRenderer(hostElement, rendererType) {
    var _a, _b;
    const renderer = this.delegate.createRenderer(hostElement, rendererType);
    if (renderer.\u0275type === 0) {
      return renderer;
    }
    if (typeof renderer.throwOnSyntheticProps === "boolean") {
      renderer.throwOnSyntheticProps = false;
    }
    const dynamicRenderer = new DynamicDelegationRenderer(renderer);
    if (((_a = rendererType == null ? void 0 : rendererType.data) == null ? void 0 : _a["animation"]) && !this._rendererFactoryPromise) {
      this._rendererFactoryPromise = this.loadImpl();
    }
    (_b = this._rendererFactoryPromise) == null ? void 0 : _b.then((animationRendererFactory) => {
      var _a2, _b2;
      const animationRenderer = animationRendererFactory.createRenderer(hostElement, rendererType);
      dynamicRenderer.use(animationRenderer);
      (_a2 = this.scheduler) != null ? _a2 : this.scheduler = this.injector.get(ChangeDetectionScheduler, null, {
        optional: true
      });
      (_b2 = this.scheduler) == null ? void 0 : _b2.notify(10);
    }).catch((e) => {
      dynamicRenderer.use(renderer);
    });
    return dynamicRenderer;
  }
  begin() {
    var _a, _b;
    (_b = (_a = this.delegate).begin) == null ? void 0 : _b.call(_a);
  }
  end() {
    var _a, _b;
    (_b = (_a = this.delegate).end) == null ? void 0 : _b.call(_a);
  }
  whenRenderingDone() {
    var _a, _b, _c;
    return (_c = (_b = (_a = this.delegate).whenRenderingDone) == null ? void 0 : _b.call(_a)) != null ? _c : Promise.resolve();
  }
  componentReplaced(componentId) {
    var _a, _b, _c;
    (_a = this._engine) == null ? void 0 : _a.flush();
    (_c = (_b = this.delegate).componentReplaced) == null ? void 0 : _c.call(_b, componentId);
  }
};
__publicField(_AsyncAnimationRendererFactory, "\u0275fac", function AsyncAnimationRendererFactory_Factory(__ngFactoryType__) {
  \u0275\u0275invalidFactory();
});
__publicField(_AsyncAnimationRendererFactory, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _AsyncAnimationRendererFactory,
  factory: _AsyncAnimationRendererFactory.\u0275fac
}));
var AsyncAnimationRendererFactory = _AsyncAnimationRendererFactory;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AsyncAnimationRendererFactory, [{
    type: Injectable
  }], () => [{
    type: Document
  }, {
    type: RendererFactory2
  }, {
    type: NgZone
  }, {
    type: void 0
  }, {
    type: Promise
  }], null);
})();
var DynamicDelegationRenderer = class {
  constructor(delegate) {
    __publicField(this, "delegate");
    __publicField(this, "replay", []);
    __publicField(this, "\u0275type", 1);
    this.delegate = delegate;
  }
  use(impl) {
    this.delegate = impl;
    if (this.replay !== null) {
      for (const fn of this.replay) {
        fn(impl);
      }
      this.replay = null;
    }
  }
  get data() {
    return this.delegate.data;
  }
  destroy() {
    this.replay = null;
    this.delegate.destroy();
  }
  createElement(name, namespace) {
    return this.delegate.createElement(name, namespace);
  }
  createComment(value) {
    return this.delegate.createComment(value);
  }
  createText(value) {
    return this.delegate.createText(value);
  }
  get destroyNode() {
    return this.delegate.destroyNode;
  }
  appendChild(parent, newChild) {
    this.delegate.appendChild(parent, newChild);
  }
  insertBefore(parent, newChild, refChild, isMove) {
    this.delegate.insertBefore(parent, newChild, refChild, isMove);
  }
  removeChild(parent, oldChild, isHostElement, requireSynchronousElementRemoval) {
    this.delegate.removeChild(parent, oldChild, isHostElement, requireSynchronousElementRemoval);
  }
  selectRootElement(selectorOrNode, preserveContent) {
    return this.delegate.selectRootElement(selectorOrNode, preserveContent);
  }
  parentNode(node) {
    return this.delegate.parentNode(node);
  }
  nextSibling(node) {
    return this.delegate.nextSibling(node);
  }
  setAttribute(el, name, value, namespace) {
    this.delegate.setAttribute(el, name, value, namespace);
  }
  removeAttribute(el, name, namespace) {
    this.delegate.removeAttribute(el, name, namespace);
  }
  addClass(el, name) {
    this.delegate.addClass(el, name);
  }
  removeClass(el, name) {
    this.delegate.removeClass(el, name);
  }
  setStyle(el, style, value, flags) {
    this.delegate.setStyle(el, style, value, flags);
  }
  removeStyle(el, style, flags) {
    this.delegate.removeStyle(el, style, flags);
  }
  setProperty(el, name, value) {
    if (this.shouldReplay(name)) {
      this.replay.push((renderer) => renderer.setProperty(el, name, value));
    }
    this.delegate.setProperty(el, name, value);
  }
  setValue(node, value) {
    this.delegate.setValue(node, value);
  }
  listen(target, eventName, callback, options) {
    if (this.shouldReplay(eventName)) {
      this.replay.push((renderer) => renderer.listen(target, eventName, callback, options));
    }
    return this.delegate.listen(target, eventName, callback, options);
  }
  shouldReplay(propOrEventName) {
    return this.replay !== null && propOrEventName.startsWith(ANIMATION_PREFIX);
  }
};
var \u0275ASYNC_ANIMATION_LOADING_SCHEDULER_FN = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "async_animation_loading_scheduler_fn" : "");
function provideAnimationsAsync(type = "animations") {
  performanceMarkFeature("NgAsyncAnimations");
  if (false) {
    type = "noop";
  }
  return makeEnvironmentProviders([{
    provide: RendererFactory2,
    useFactory: () => {
      return new AsyncAnimationRendererFactory(inject(DOCUMENT), inject(DomRendererFactory2), inject(NgZone), type);
    }
  }, {
    provide: ANIMATION_MODULE_TYPE,
    useValue: type === "noop" ? "NoopAnimations" : "BrowserAnimations"
  }]);
}

// node_modules/@angular/common/locales/en.js
var u = void 0;
function plural(val) {
  const n = val, i = Math.floor(Math.abs(val)), v = val.toString().replace(/^[^.]*\.?/, "").length;
  if (i === 1 && v === 0)
    return 1;
  return 5;
}
var en_default = ["en", [["a", "p"], ["AM", "PM"]], [["AM", "PM"]], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], u, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], u, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm\u202Fa", "h:mm:ss\u202Fa", "h:mm:ss\u202Fa z", "h:mm:ss\u202Fa zzzz"], ["{1}, {0}", u, u, u], [".", ",", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"], ["#,##0.###", "#,##0%", "\xA4#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr", plural];

// node_modules/@ngx-translate/http-loader/fesm2022/ngx-translate-http-loader.mjs
var TRANSLATE_HTTP_LOADER_CONFIG = new InjectionToken("TRANSLATE_HTTP_LOADER_CONFIG");
var _TranslateHttpLoader = class _TranslateHttpLoader {
  constructor() {
    __publicField(this, "http");
    __publicField(this, "config");
    this.config = __spreadValues({
      prefix: "/assets/i18n/",
      suffix: ".json",
      enforceLoading: false,
      useHttpBackend: false
    }, inject(TRANSLATE_HTTP_LOADER_CONFIG));
    this.http = this.config.useHttpBackend ? new HttpClient(inject(HttpBackend)) : inject(HttpClient);
  }
  /**
   * Gets the translations from the server
   */
  getTranslation(lang) {
    const cacheBuster = this.config.enforceLoading ? `?enforceLoading=${Date.now()}` : "";
    return this.http.get(`${this.config.prefix}${lang}${this.config.suffix}${cacheBuster}`);
  }
};
__publicField(_TranslateHttpLoader, "\u0275fac", function TranslateHttpLoader_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TranslateHttpLoader)();
});
__publicField(_TranslateHttpLoader, "\u0275prov", /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _TranslateHttpLoader,
  factory: _TranslateHttpLoader.\u0275fac
}));
var TranslateHttpLoader = _TranslateHttpLoader;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslateHttpLoader, [{
    type: Injectable
  }], () => [], null);
})();
function provideTranslateHttpLoader(config = {}) {
  var _a;
  const useBackend = (_a = config.useHttpBackend) != null ? _a : false;
  return [{
    provide: TRANSLATE_HTTP_LOADER_CONFIG,
    useValue: config
  }, {
    provide: TranslateLoader,
    useClass: TranslateHttpLoader,
    deps: [useBackend ? HttpBackend : HttpClient, TRANSLATE_HTTP_LOADER_CONFIG]
  }];
}

// src/environments/environment.ts
var environment = {
  production: false,
  apiBaseUrl: "",
  firebase: {
    apiKey: "AIzaSyAeOXhZrhaadsOIp1e_0tklcnH8H5KfRZ8",
    authDomain: "realtimedbtest-d8c6b.firebaseapp.com",
    databaseURL: "https://realtimedbtest-d8c6b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "realtimedbtest-d8c6b",
    storageBucket: "realtimedbtest-d8c6b.firebasestorage.app",
    messagingSenderId: "787425357847",
    appId: "1:787425357847:web:70987cc599fe6242a92c52",
    vapidKey: "BBsnw8XbQ0yCpHixy3hKt20NuwTBB_Uqz__TdWPVlAEN6LZekJQCNqDO53JpXO5Q1gJ_3Nfrr28RHvKVtXU1tRw"
  }
};

// src/app/app.config.ts
registerLocaleData(en_default);
var nzConfig = {
  notification: {
    nzPlacement: "topRight",
    nzDuration: 0
  }
};
var icons = Object.keys(ant_design_icons_angular_icons_exports).map((key) => ant_design_icons_angular_icons_exports[key]);
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNzI18n(en_US),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    { provide: API_URL, useValue: environment.apiBaseUrl },
    { provide: FIREBASE_CONFIG, useValue: environment.firebase },
    provideTranslateService({
      fallbackLang: "vi"
    }),
    provideTranslateHttpLoader({
      prefix: "./assets/i18n/",
      suffix: ".json"
    }),
    { provide: NZ_CONFIG, useValue: nzConfig },
    importProvidersFrom(FormsModule, NzIconModule.forRoot(icons))
  ]
};

// src/app/app.ts
var _c0 = ["htmlNotification"];
function AppComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 1);
  }
  if (rf & 2) {
    const notification_r1 = ctx.$implicit;
    \u0275\u0275property("innerHTML", (notification_r1 == null ? null : notification_r1.nzData == null ? null : notification_r1.nzData.content) || (notification_r1 == null ? null : notification_r1.options == null ? null : notification_r1.options.nzData == null ? null : notification_r1.options.nzData.content) || (notification_r1 == null ? null : notification_r1.content) || "Notification Content Error", \u0275\u0275sanitizeHtml);
  }
}
var _AppComponent = class _AppComponent {
  constructor() {
    this.templateService = inject(NotificationTemplateService);
    this.translate = inject(TranslateService);
    const savedLang = localStorage.getItem("lang") || "vi";
    this.translate.use(savedLang);
  }
  ngAfterViewInit() {
    this.templateService.registerTemplate("html", this.htmlNotificationTemplate);
  }
};
_AppComponent.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AppComponent)();
};
_AppComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275viewQuery(_c0, 5);
  }
  if (rf & 2) {
    let _t;
    \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.htmlNotificationTemplate = _t.first);
  }
}, decls: 3, vars: 0, consts: [["htmlNotification", ""], [3, "innerHTML"]], template: function AppComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "router-outlet");
    \u0275\u0275template(1, AppComponent_ng_template_1_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
  }
}, dependencies: [RouterOutlet, CommonModule], encapsulation: 2 });
var AppComponent = _AppComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "app-root", standalone: true, imports: [RouterOutlet, CommonModule], template: `<router-outlet></router-outlet>

<ng-template #htmlNotification let-notification>
  <div [innerHTML]="notification?.nzData?.content || notification?.options?.nzData?.content || notification?.content || 'Notification Content Error'"></div>
</ng-template>
` }]
  }], () => [], { htmlNotificationTemplate: [{
    type: ViewChild,
    args: ["htmlNotification"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.ts", lineNumber: 14 });
})();

// src/main.ts
var originalFetch = window.fetch;
window.fetch = function(input, init) {
  const url = typeof input === "string" ? input : input instanceof Request ? input.url : input.toString();
  if (url.includes("telemeter_wasm_bg.wasm")) {
    return originalFetch("/admin/assets/telemeter_wasm_bg.wasm", init);
  }
  return originalFetch(input, init);
};
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
