import 'dart:math';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import '../main.dart';
import 'local_storage_service.dart';
import 'auth_service.dart';

class NotificationService extends ChangeNotifier {
  static final NotificationService instance = NotificationService._internal();
  factory NotificationService() => instance;
  NotificationService._internal();

  final FirebaseMessaging _fcm = FirebaseMessaging.instance;
  final FlutterLocalNotificationsPlugin _localNotifications = FlutterLocalNotificationsPlugin();

  static const AndroidNotificationChannel _channel = AndroidNotificationChannel(
    'high_importance_channel',
    'High Importance Notifications',
    description: 'This channel is used for important notifications.',
    importance: Importance.high,
  );

  String? _token;
  String? _deviceId;
  String? _pendingRoute;

  String? _lastRegisteredToken;
  String? _lastRegisteredUserId;

  String? get token => _token;
  String? get deviceId => _deviceId;

  void _handleNotificationClick(RemoteMessage message) {
    final title = message.notification?.title ?? '';
    final body = message.notification?.body ?? '';
    final dataString = message.data.toString();
    
    if (kDebugMode) {
      print('Handling notification click: title=$title, body=$body, data=$dataString');
    }

    final isFilesFolders = body.toLowerCase().contains('files-folders') || 
                           title.toLowerCase().contains('files-folders') ||
                           dataString.toLowerCase().contains('files-folders');

    if (isFilesFolders) {
      if (AuthService.instance.isAuthenticated) {
        if (kDebugMode) {
          print('User authenticated. Navigating to /files-folders...');
        }
        navigatorKey.currentState?.pushNamed('/files-folders');
      } else {
        if (kDebugMode) {
          print('User not authenticated. Setting pending route to /files-folders...');
        }
        _pendingRoute = '/files-folders';
      }
    }
  }

  void _showForegroundNotification(RemoteMessage message) {
    final title = message.notification?.title ?? 'New Notification';
    final body = message.notification?.body ?? '';
    final dataString = message.data.toString();

    final isFilesFolders = body.toLowerCase().contains('files-folders') || 
                           title.toLowerCase().contains('files-folders') ||
                           dataString.toLowerCase().contains('files-folders');

    final context = navigatorKey.currentContext;
    if (context == null) return;

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Icon(Icons.notifications_active, color: Colors.amberAccent),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    body,
                    style: const TextStyle(fontSize: 12, color: Colors.white70),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          ],
        ),
        behavior: SnackBarBehavior.floating,
        backgroundColor: const Color(0xFF1E1E2E), // Premium dark theme
        duration: const Duration(seconds: 5),
        action: isFilesFolders
            ? SnackBarAction(
                label: 'Mở',
                textColor: Colors.amberAccent,
                onPressed: () {
                  if (AuthService.instance.isAuthenticated) {
                    navigatorKey.currentState?.pushNamed('/files-folders');
                  } else {
                    _pendingRoute = '/files-folders';
                  }
                },
              )
            : null,
      ),
    );
  }

  Future<void> initialize() async {
    // Cấu hình Local Notifications cho Foreground Status Bar
    const AndroidInitializationSettings initializationSettingsAndroid =
        AndroidInitializationSettings('@mipmap/ic_launcher');
    const DarwinInitializationSettings initializationSettingsIOS =
        DarwinInitializationSettings(
      requestAlertPermission: false,
      requestBadgePermission: false,
      requestSoundPermission: false,
    );
    const InitializationSettings initializationSettings = InitializationSettings(
      android: initializationSettingsAndroid,
      iOS: initializationSettingsIOS,
    );

    await _localNotifications.initialize(
      initializationSettings,
      onDidReceiveNotificationResponse: (NotificationResponse response) {
        final String? payload = response.payload;
        if (payload != null && payload.isNotEmpty) {
          _handleLocalNotificationClick(payload);
        }
      },
    );

    await _localNotifications
        .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(_channel);

    // Yêu cầu quyền thông báo (cho iOS)
    NotificationSettings settings = await _fcm.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    // Sinh hoặc tải device ID từ SharedPreferences (KISS)
    final prefs = LocalStorageService.prefs;
    _deviceId = prefs.getString('fcm_device_id');
    if (_deviceId == null) {
      final ms = DateTime.now().millisecondsSinceEpoch;
      final rand = Random().nextInt(1000000);
      _deviceId = 'mobi_${ms}_$rand';
      await prefs.setString('fcm_device_id', _deviceId!);
    }
    
    if (kDebugMode) {
      print('FCM Device ID: $_deviceId');
    }

    // Lắng nghe khi trạng thái đăng nhập thay đổi để điều hướng tới route đang chờ hoặc đăng ký FCM token
    AuthService.instance.addListener(() {
      final isAuth = AuthService.instance.isAuthenticated;
      final userId = AuthService.instance.currentUser?.id;
      final currentToken = _token;

      // 1. Xử lý deep link đang chờ nếu có
      if (isAuth && _pendingRoute != null) {
        final route = _pendingRoute!;
        _pendingRoute = null;
        if (kDebugMode) {
          print('Auth state changed to authenticated. Navigating to pending route: $route');
        }
        WidgetsBinding.instance.addPostFrameCallback((_) {
          navigatorKey.currentState?.pushNamed(route);
        });
      }

      // 2. Tự động đăng ký FCM token khi đăng nhập thành công hoặc chuyển trạng thái auth
      if (isAuth && currentToken != null && currentToken.isNotEmpty) {
        if (_lastRegisteredToken != currentToken || _lastRegisteredUserId != userId) {
          _lastRegisteredToken = currentToken;
          _lastRegisteredUserId = userId;
          if (kDebugMode) {
            print('Auth Listener: New session/token detected. Registering FCM token dynamically...');
          }
          AuthService.instance.registerFcmTokenWithBackend();
        }
      }
    });

    if (kDebugMode) {
      print('Notification permission status: ${settings.authorizationStatus}');
    }
    
    // Lấy token
    try {
      _token = await _fcm.getToken();
      if (kDebugMode) {
        print('FCM Token: $_token');
      }

      // Đăng ký token với backend nếu đã đăng nhập sẵn
      if (AuthService.instance.isAuthenticated && _token != null && _token!.isNotEmpty) {
        final userId = AuthService.instance.currentUser?.id;
        _lastRegisteredToken = _token;
        _lastRegisteredUserId = userId;
        AuthService.instance.registerFcmTokenWithBackend();
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error getting FCM token: $e');
      }
    }

    // Lắng nghe khi token thay đổi (onTokenRefresh)
    _fcm.onTokenRefresh.listen((newToken) {
      _token = newToken;
      if (kDebugMode) {
        print('FCM Token refreshed: $newToken');
      }
      if (AuthService.instance.isAuthenticated && _token != null && _token!.isNotEmpty) {
        final userId = AuthService.instance.currentUser?.id;
        if (_lastRegisteredToken != _token || _lastRegisteredUserId != userId) {
          _lastRegisteredToken = _token;
          _lastRegisteredUserId = userId;
          AuthService.instance.registerFcmTokenWithBackend();
        }
      }
    });

    // Lắng nghe tin nhắn khi app đang mở (Foreground)
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      if (kDebugMode) {
        print('Got a message whilst in the foreground!');
        print('Message data: ${message.data}');
      }

      if (message.notification != null) {
        if (kDebugMode) {
          print('Message also contained a notification: ${message.notification}');
        }
        _showForegroundNotification(message);
        _showLocalNotification(message); // Đẩy đồng thời lên Status Bar
      }
      notifyListeners();
    });

    // Lắng nghe khi click vào thông báo (Background)
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      if (kDebugMode) {
        print('Message clicked while in background!');
      }
      _handleNotificationClick(message);
    });

    // Xử lý khi app bị tắt hoàn toàn và khởi động từ thông báo (Terminated)
    try {
      final RemoteMessage? initialMessage = await _fcm.getInitialMessage();
      if (initialMessage != null) {
        if (kDebugMode) {
          print('App launched from terminated state via notification!');
        }
        // Delay để Navigator được dựng xong
        Future.delayed(const Duration(milliseconds: 1000), () {
          _handleNotificationClick(initialMessage);
        });
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error getting initial message: $e');
      }
    }
    notifyListeners();
  }

  // Đẩy tin nhắn cục bộ lên Status Bar khi app đang ở Foreground
  Future<void> _showLocalNotification(RemoteMessage message) async {
    final notification = message.notification;
    final android = message.notification?.android;

    if (notification != null) {
      final String payloadData = message.data['body'] ?? message.data['message'] ?? notification.body ?? '';

      await _localNotifications.show(
        notification.hashCode,
        notification.title,
        notification.body,
        NotificationDetails(
          android: AndroidNotificationDetails(
            _channel.id,
            _channel.name,
            channelDescription: _channel.description,
            icon: android?.smallIcon ?? '@mipmap/ic_launcher',
            importance: Importance.max,
            priority: Priority.high,
          ),
          iOS: const DarwinNotificationDetails(
            presentAlert: true,
            presentBadge: true,
            presentSound: true,
          ),
        ),
        payload: payloadData,
      );
    }
  }

  // Xử lý khi người dùng click vào notification trên Status Bar (Foreground)
  void _handleLocalNotificationClick(String payload) {
    if (kDebugMode) {
      print('Local notification clicked in foreground: payload=$payload');
    }
    if (payload.toLowerCase().contains('files-folders')) {
      if (AuthService.instance.isAuthenticated) {
        if (kDebugMode) {
          print('User authenticated. Navigating to /files-folders...');
        }
        navigatorKey.currentState?.pushNamed('/files-folders');
      } else {
        if (kDebugMode) {
          print('User not authenticated. Setting pending route to /files-folders...');
        }
        _pendingRoute = '/files-folders';
      }
    }
  }
}
