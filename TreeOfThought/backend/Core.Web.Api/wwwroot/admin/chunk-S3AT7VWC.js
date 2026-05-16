import {
  Injectable,
  Subject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-ZYJZNBYG.js";

// projects/tot/core/src/lib/services/component-registry.service.ts
var _ComponentRegistryService = class _ComponentRegistryService {
  constructor() {
    this.registry = /* @__PURE__ */ new Map();
  }
  /**
   * Register a component with a unique key
   * @param key Unique identifier for the component
   * @param component The component class
   */
  register(key, component) {
    if (this.registry.has(key)) {
      console.warn(`[ComponentRegistry] Key "${key}" is already registered. Overwriting...`);
    }
    this.registry.set(key, component);
  }
  /**
   * Get a registered component by key
   * @param key The unique identifier
   */
  get(key) {
    return this.registry.get(key);
  }
  /**
   * Check if a component is registered
   * @param key The unique identifier
   */
  has(key) {
    return this.registry.has(key);
  }
  /**
   * Remove a registered component
   * @param key The unique identifier
   */
  unregister(key) {
    this.registry.delete(key);
  }
};
_ComponentRegistryService.\u0275fac = function ComponentRegistryService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ComponentRegistryService)();
};
_ComponentRegistryService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ComponentRegistryService, factory: _ComponentRegistryService.\u0275fac, providedIn: "root" });
var ComponentRegistryService = _ComponentRegistryService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ComponentRegistryService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// projects/tot/core/src/lib/constants/registry.constants.ts
var REGISTRY_KEYS = {
  FILES_FOLDERS: "FILES_FOLDERS"
  // Add more keys here as needed
};
var EVENT_TOPICS = {
  FILE_SELECTED: "FILE_SELECTED"
  // Add more topics here as needed
};

// projects/tot/core/src/lib/services/message-bus.service.ts
var _MessageBusService = class _MessageBusService {
  constructor() {
    this.commandHandlers = /* @__PURE__ */ new Map();
    this.eventSubjects = /* @__PURE__ */ new Map();
    this.commandQueues = /* @__PURE__ */ new Map();
  }
  /**
   * Register a handler for a specific command queue
   * @param queueName The name of the queue
   * @param handler The function to handle the command
   */
  registerCommandHandler(queueName, handler) {
    if (this.commandHandlers.has(queueName)) {
      console.warn(`[MessageBus] Command handler for queue "${queueName}" is already registered. Overwriting...`);
    }
    this.commandHandlers.set(queueName, handler);
  }
  /**
   * Register a listener for a specific event topic
   * @param topicName The name of the topic
   * @param handler The function to handle the event
   */
  registerEventHandler(topicName, handler) {
    this.on(topicName).subscribe((event) => handler(event));
  }
  /**
   * Execute a command on a specific queue.
   * Commands in the same queue are executed sequentially (FIFO).
   * @param queueName The name of the queue
   * @param command The command object
   */
  async execute(queueName, command) {
    const handler = this.commandHandlers.get(queueName);
    if (!handler) {
      throw new Error(`[MessageBus] No handler registered for queue "${queueName}"`);
    }
    const previousPromise = this.commandQueues.get(queueName) || Promise.resolve();
    const currentPromise = previousPromise.then(async () => {
      try {
        await handler(command);
      } catch (error) {
        console.error(`[MessageBus] Error executing command in queue "${queueName}":`, error);
        throw error;
      }
    });
    this.commandQueues.set(queueName, currentPromise);
    return currentPromise;
  }
  /**
   * Publish an event to a specific topic (Pub/Sub)
   * @param topicName The name of the topic
   * @param event The event object
   */
  publish(topicName, event) {
    if (!this.eventSubjects.has(topicName)) {
      this.eventSubjects.set(topicName, new Subject());
    }
    this.eventSubjects.get(topicName).next(event);
  }
  /**
   * Returns an observable for a specific event topic
   * @param topicName The name of the topic
   */
  on(topicName) {
    if (!this.eventSubjects.has(topicName)) {
      this.eventSubjects.set(topicName, new Subject());
    }
    return this.eventSubjects.get(topicName).asObservable();
  }
};
_MessageBusService.\u0275fac = function MessageBusService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MessageBusService)();
};
_MessageBusService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MessageBusService, factory: _MessageBusService.\u0275fac, providedIn: "root" });
var MessageBusService = _MessageBusService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MessageBusService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  MessageBusService,
  ComponentRegistryService,
  REGISTRY_KEYS,
  EVENT_TOPICS
};
//# sourceMappingURL=chunk-S3AT7VWC.js.map
