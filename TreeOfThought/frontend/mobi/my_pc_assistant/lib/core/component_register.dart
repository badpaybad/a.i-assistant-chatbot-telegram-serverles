import 'package:flutter/material.dart';

typedef DynamicWidgetBuilder = Widget Function(BuildContext context, {Object? arguments});

class ComponentRegister {
  // Singleton instance
  static final ComponentRegister _instance = ComponentRegister._internal();
  factory ComponentRegister() => _instance;
  ComponentRegister._internal();

  final Map<String, DynamicWidgetBuilder> _registry = {};

  /// Register a widget builder with a unique string key
  void register(String key, DynamicWidgetBuilder builder) {
    _registry[key] = builder;
    debugPrint('[ComponentRegister] Registered component: $key');
  }

  /// Check if a component is registered
  bool isRegistered(String key) => _registry.containsKey(key);

  /// Build a widget by its key, optionally passing arguments
  Widget build(String key, BuildContext context, {Object? arguments}) {
    final builder = _registry[key];
    if (builder == null) {
      debugPrint('[ComponentRegister] Error: Component "$key" not found in register.');
      return Container(
        padding: const EdgeInsets.all(16),
        color: Colors.red.shade50,
        child: Text(
          'Component "$key" not registered!',
          style: const TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
        ),
      );
    }
    return builder(context, arguments: arguments);
  }
}
