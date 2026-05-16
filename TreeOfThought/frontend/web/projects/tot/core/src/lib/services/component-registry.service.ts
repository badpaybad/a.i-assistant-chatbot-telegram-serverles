import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentRegistryService {
  private registry = new Map<string, Type<any>>();

  /**
   * Register a component with a unique key
   * @param key Unique identifier for the component
   * @param component The component class
   */
  register(key: string, component: Type<any>) {
    if (this.registry.has(key)) {
      console.warn(`[ComponentRegistry] Key "${key}" is already registered. Overwriting...`);
    }
    this.registry.set(key, component);
  }

  /**
   * Get a registered component by key
   * @param key The unique identifier
   */
  get(key: string): Type<any> | undefined {
    return this.registry.get(key);
  }

  /**
   * Check if a component is registered
   * @param key The unique identifier
   */
  has(key: string): boolean {
    return this.registry.has(key);
  }

  /**
   * Remove a registered component
   * @param key The unique identifier
   */
  unregister(key: string) {
    this.registry.delete(key);
  }
}
