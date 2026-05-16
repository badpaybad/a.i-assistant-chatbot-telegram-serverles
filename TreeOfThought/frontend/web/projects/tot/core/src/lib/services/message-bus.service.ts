import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IBaseCommand, IBaseEvent, CommandHandler, EventHandler } from '../interfaces/cqrs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MessageBusService {
  private commandHandlers = new Map<string, CommandHandler>();
  private eventSubjects = new Map<string, Subject<any>>();
  private commandQueues = new Map<string, Promise<void>>();

  /**
   * Register a handler for a specific command queue
   * @param queueName The name of the queue
   * @param handler The function to handle the command
   */
  registerCommandHandler<T extends IBaseCommand>(queueName: string, handler: CommandHandler<T>) {
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
  registerEventHandler<T extends IBaseEvent>(topicName: string, handler: EventHandler<T>) {
    this.on<T>(topicName).subscribe(event => handler(event));
  }

  /**
   * Execute a command on a specific queue. 
   * Commands in the same queue are executed sequentially (FIFO).
   * @param queueName The name of the queue
   * @param command The command object
   */
  async execute<T extends IBaseCommand>(queueName: string, command: T): Promise<void> {
    const handler = this.commandHandlers.get(queueName);
    if (!handler) {
      throw new Error(`[MessageBus] No handler registered for queue "${queueName}"`);
    }

    // Ensure sequential execution per queueName
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
  publish<T extends IBaseEvent>(topicName: string, event: T) {
    if (!this.eventSubjects.has(topicName)) {
      this.eventSubjects.set(topicName, new Subject<any>());
    }
    this.eventSubjects.get(topicName)!.next(event);
  }

  /**
   * Returns an observable for a specific event topic
   * @param topicName The name of the topic
   */
  on<T extends IBaseEvent>(topicName: string): Observable<T> {
    if (!this.eventSubjects.has(topicName)) {
      this.eventSubjects.set(topicName, new Subject<any>());
    }
    return this.eventSubjects.get(topicName)!.asObservable();
  }
}
