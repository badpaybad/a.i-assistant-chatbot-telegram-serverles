export interface IBaseMessage {
  trackingId?: string;
  timestamp?: number;
}

export interface IBaseCommand extends IBaseMessage {
  // Command specific fields if any
}

export interface IBaseEvent extends IBaseMessage {
  // Event specific fields if any
}

export type CommandHandler<T extends IBaseCommand = any> = (command: T) => Promise<void> | void;
export type EventHandler<T extends IBaseEvent = any> = (event: T) => Promise<void> | void;

export interface ICommandHandler<T extends IBaseCommand> {
  handle(command: T): Promise<void> | void;
}

export interface IEventHandler<T extends IBaseEvent> {
  handle(event: T): Promise<void> | void;
}
