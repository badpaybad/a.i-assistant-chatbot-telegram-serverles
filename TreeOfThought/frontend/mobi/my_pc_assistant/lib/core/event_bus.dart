import 'dart:async';
import 'dart:collection';
import 'package:flutter/foundation.dart';

abstract class BaseMessage {
  final String trackingId;
  final DateTime timestamp;

  BaseMessage({String? trackingId})
      : trackingId = trackingId ?? DateTime.now().microsecondsSinceEpoch.toString(),
        timestamp = DateTime.now();
}

abstract class BaseCommand extends BaseMessage {
  final String? queueName;
  BaseCommand({super.trackingId, this.queueName});
}

abstract class BaseEvent extends BaseMessage {
  final String? topicName;
  BaseEvent({super.trackingId, this.topicName});
}

typedef CommandHandler<T extends BaseCommand> = Future<void> Function(T command);
typedef EventHandler<T extends BaseEvent> = void Function(T event);

class CqrsDispatcher {
  static final CqrsDispatcher _instance = CqrsDispatcher._internal();
  static CqrsDispatcher get instance => _instance;
  CqrsDispatcher._internal();

  // Command handlers registry
  final Map<String, CommandHandler<anyCommand>> _commandHandlers = {};
  // Command queue processors
  final Map<String, _CommandQueueProcessor> _processors = {};

  // Event Pub/Sub subscriptions (using Streams)
  final StreamController<BaseEvent> _eventStreamController = StreamController<BaseEvent>.broadcast();
  final Map<String, List<StreamSubscription>> _subscriptions = {};

  /// Send a command to a queue. Processed sequentially (FIFO).
  Future<void> sendAsync<T extends BaseCommand>(T command, {String? queueName}) async {
    final qName = queueName ?? command.queueName ?? command.runtimeType.toString();
    debugPrint('[CQRS] Sending command: ${command.runtimeType} to queue: $qName (TrackingID: ${command.trackingId})');
    
    _processors.putIfAbsent(qName, () => _CommandQueueProcessor(qName, this)).enqueue(command);
  }

  /// Register a sequential Command Handler
  void registerCommandHandler<T extends BaseCommand>(CommandHandler<T> handler, {String? queueName}) {
    final qName = queueName ?? T.toString();
    _commandHandlers[qName] = (BaseCommand cmd) => handler(cmd as T);
    debugPrint('[CQRS] Registered Command Handler for: $qName');
  }

  /// Publish an event to a Topic (Pub/Sub)
  void publishAsync<T extends BaseEvent>(T event, {String? topicName}) {
    final tName = topicName ?? event.topicName ?? event.runtimeType.toString();
    debugPrint('[CQRS] Publishing event: ${event.runtimeType} to topic: $tName (TrackingID: ${event.trackingId})');
    
    // Inject the topic name into the event before dispatching
    _eventStreamController.add(event);
  }

  /// Subscribe to a Topic
  StreamSubscription<T> subscribeToTopic<T extends BaseEvent>(String topicName, void Function(T event) onEvent) {
    debugPrint('[CQRS] Subscribing to topic: $topicName');
    return _eventStreamController.stream
        .where((msg) => msg is T && (msg.topicName == topicName || msg.runtimeType.toString() == topicName))
        .cast<T>()
        .listen(onEvent);
  }

  void dispose() {
    _eventStreamController.close();
    for (var subList in _subscriptions.values) {
      for (var sub in subList) {
        sub.cancel();
      }
    }
    for (var proc in _processors.values) {
      proc.dispose();
    }
  }
}

// Private helper to process commands sequentially for a specific queueName
class _CommandQueueProcessor {
  final String queueName;
  final CqrsDispatcher dispatcher;
  final Queue<BaseCommand> _queue = Queue<BaseCommand>();
  bool _isProcessing = false;
  bool _disposed = false;

  _CommandQueueProcessor(this.queueName, this.dispatcher);

  void enqueue(BaseCommand command) {
    if (_disposed) return;
    _queue.addLast(command);
    _processNext();
  }

  Future<void> _processNext() async {
    if (_isProcessing || _queue.isEmpty || _disposed) return;
    
    _isProcessing = true;
    final command = _queue.removeFirst();
    final handlerKey = command.runtimeType.toString();
    
    try {
      // Find the registered handler for this command type or by queue name
      final handler = dispatcher._commandHandlers[handlerKey] ?? dispatcher._commandHandlers[queueName];
      if (handler != null) {
        debugPrint('[CQRS Queue - $queueName] Processing ${command.runtimeType}...');
        await handler(command);
        debugPrint('[CQRS Queue - $queueName] Completed ${command.runtimeType}.');
      } else {
        debugPrint('[CQRS Queue - $queueName] Warning: No handler found for ${command.runtimeType}.');
      }
    } catch (e) {
      debugPrint('[CQRS Queue - $queueName] Error processing ${command.runtimeType}: $e');
    } finally {
      _isProcessing = false;
      // Trigger the next command in the queue
      _processNext();
    }
  }

  void dispose() {
    _disposed = true;
    _queue.clear();
  }
}

// Utility type definitions to allow type casting safely in the dispatcher map
typedef anyCommand = BaseCommand;
