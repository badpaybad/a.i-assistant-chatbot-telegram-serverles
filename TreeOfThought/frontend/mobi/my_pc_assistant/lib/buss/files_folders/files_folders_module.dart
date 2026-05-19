import 'package:flutter/material.dart';
import '../../core/component_register.dart';
import '../../core/event_bus.dart';
import 'widgets/file_picker_widget.dart';
import 'models/file_folder_models.dart';

/// Bootstrapper for files_folders module
void initFilesFoldersModule() {
  debugPrint('[FilesFoldersModule] Bootstrapping files_folders business module...');

  // 1. Register components dynamically
  ComponentRegister().register(
    'tot-file-picker',
    (context, {arguments}) => const FilePickerWidget(),
  );

  // 2. Set up CQRS listeners for tracking or custom dynamic flows
  CqrsDispatcher.instance.subscribeToTopic<FileSelectedEvent>('file_selection', (event) {
    debugPrint('[FilesFoldersModule - CQRS Topic Listener] File Selected: ${event.fileName} (${event.filePath})');
  });

  CqrsDispatcher.instance.registerCommandHandler<CreateFolderCommand>((command) async {
    debugPrint('[FilesFoldersModule - CQRS Command Handler] Sequential CreateFolder: ${command.name}');
  }, queueName: 'folder_commands');
  
  debugPrint('[FilesFoldersModule] Bootstrap completed successfully.');
}
