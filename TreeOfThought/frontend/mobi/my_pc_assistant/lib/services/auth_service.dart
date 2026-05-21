import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter_appauth/flutter_appauth.dart';
import 'package:tot_core/tot_core.dart';
import '../models/user_model.dart';
import 'local_storage_service.dart';
import 'notification_service.dart';

class AuthService extends ChangeNotifier implements TotAuthService {
  static final AuthService instance = AuthService._internal();
  factory AuthService() => instance;
  AuthService._internal() {
    tryAutoLogin();
  }

  void tryAutoLogin() {
    try {
      final prefs = LocalStorageService.prefs;
      _selectedIp = prefs.getString('auth_selected_ip') ?? 'localhost:5000';
      _accessToken = prefs.getString('auth_access_token');
      _idToken = prefs.getString('auth_id_token');
      final userJson = prefs.getString('auth_current_user');
      if (userJson != null) {
        _currentUser = UserModel.fromJson(jsonDecode(userJson));
        _isAuthenticated = true;
      }
      debugPrint('[AuthService] tryAutoLogin: isAuthenticated = $_isAuthenticated, ip = $_selectedIp');
    } catch (e) {
      debugPrint('[AuthService] tryAutoLogin failed: $e');
    }
  }

  Future<void> _saveSession() async {
    try {
      final prefs = LocalStorageService.prefs;
      await prefs.setString('auth_selected_ip', _selectedIp);
      if (_accessToken != null) {
        await prefs.setString('auth_access_token', _accessToken!);
      }
      if (_idToken != null) {
        await prefs.setString('auth_id_token', _idToken!);
      }
      if (_currentUser != null) {
        await prefs.setString('auth_current_user', jsonEncode(_currentUser!.toJson()));
      }
    } catch (e) {
      debugPrint('[AuthService] _saveSession failed: $e');
    }
  }

  Future<void> _clearSession() async {
    try {
      final prefs = LocalStorageService.prefs;
      await prefs.remove('auth_access_token');
      await prefs.remove('auth_id_token');
      await prefs.remove('auth_current_user');
    } catch (e) {
      debugPrint('[AuthService] _clearSession failed: $e');
    }
  }

  UserModel? _currentUser;
  bool _isLoading = false;
  bool _isAuthenticated = false;
  String? _idToken;
  String? _accessToken;

  UserModel? get currentUser => _currentUser;
  @override
  bool get isAuthenticated => _isAuthenticated;
  bool get isLoading => _isLoading;
  String? get accessToken => _accessToken;

  final FlutterAppAuth _appAuth = const FlutterAppAuth();
  
  String _selectedIp = 'localhost:5000';
  String get selectedIp => _selectedIp;

  void setBaseUrl(String ip) {
    _selectedIp = ip;
    LocalStorageService.prefs.setString('auth_selected_ip', ip);
    notifyListeners();
  }

  String get baseUrl => _baseUrl;

  String get _baseUrl {
    String ip = _selectedIp.trim();
    if (ip.startsWith('http://') || ip.startsWith('https://')) {
      return ip;
    }
    if (ip.contains(':')) {
      return 'http://$ip';
    }
    return 'http://$ip:5000';
  }

  Future<bool> signIn(String username, String password) async {
    _isLoading = true;
    notifyListeners();
    
    try {
      final token = NotificationService.instance.token;
      final deviceId = NotificationService.instance.deviceId;
      final String appType = Platform.isAndroid ? 'mobi android' : 'mobi ios';

      debugPrint('[Auth] Attempting password login for $username on $_baseUrl...');
      final response = await HttpClientService.instance.post(
        '/api/auth/login',
        data: {
          'username': username,
          'password': password,
          'fcmToken': token,
          'deviceId': deviceId,
          'appType': appType,
        },
      );

      debugPrint('[Auth] Login response status: ${response.statusCode}');

      if (response.statusCode == 200 && response.data != null) {
        final responseData = response.data as Map<String, dynamic>;
        
        final String jwtToken = responseData['token'] as String;
        _accessToken = jwtToken;
        
        debugPrint('[Auth] Login successful. Fetching detailed user info...');
        final userResponse = await HttpClientService.instance.get<Map<String, dynamic>>('/api/auth/me');
        
        if (userResponse.statusCode == 200 && userResponse.data != null) {
          final userData = userResponse.data!;
          final preferredUsername = userData['preferred_username'] ?? userData['sub'];
          _currentUser = UserModel(
            id: userData['sub'] ?? 'auth_$preferredUsername',
            name: userData['name'] ?? preferredUsername,
            email: userData['email'] ?? '',
            profileImageUrl: userData['picture'],
          );
          _isAuthenticated = true;
          await _saveSession();
          _isLoading = false;
          notifyListeners();
          
          debugPrint('[Auth] Password login completed. Session saved for $preferredUsername.');
          return true;
        }
      }
      
      _isLoading = false;
      notifyListeners();
      return false;
    } catch (e) {
      debugPrint('[Auth] Password login failed with error: $e');
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> signInWithSso() async {
    try {
      _isLoading = true;
      notifyListeners();

      final String callbackUrlScheme = 'my-pc-assistant';

      debugPrint('[SSO] Starting OIDC flow with flutter_appauth...');

      final AuthorizationTokenResponse? result = await _appAuth.authorizeAndExchangeCode(
        AuthorizationTokenRequest(
          'my_pc_assistant',
          '$callbackUrlScheme://callback',
          promptValues: ['login'],
          allowInsecureConnections: true,
          serviceConfiguration: AuthorizationServiceConfiguration(
            authorizationEndpoint: '$_baseUrl/api/auth/authorize',
            tokenEndpoint: '$_baseUrl/api/auth/token',
            endSessionEndpoint: '$_baseUrl/api/auth/logout',
          ),
          scopes: ['openid', 'profile', 'email'],
        ),
      );

      if (result != null && result.accessToken != null) {
        final String accessToken = result.accessToken!;
        _accessToken = accessToken; // Save accessToken
        _idToken = result.idToken; // Save idToken for signOut
        
        debugPrint('[SSO] Access token received. Fetching user info...');

        // Lấy thông tin user (từ /api/auth/me)
        final userResponse = await HttpClientService.instance.get<Map<String, dynamic>>('/api/auth/me');

        debugPrint('[SSO] User info status: ${userResponse.statusCode}');

        if (userResponse.statusCode == 200 && userResponse.data != null) {
          final userData = userResponse.data!;
          final username = userData['preferred_username'] ?? userData['sub'];
          _currentUser = UserModel(
            id: 'sso_$username',
            name: userData['name'] ?? username,
            email: userData['email'],
            profileImageUrl: 'https://i.pravatar.cc/150?u=$username',
          );
          _isAuthenticated = true;
          await _saveSession();
          _isLoading = false;
          notifyListeners();
          debugPrint('[SSO] Login successful for $username');

          // Đăng ký FCM Token khi đăng nhập thành công
          await registerFcmTokenWithBackend();

          return true;
        }
      }
      
      _isLoading = false;
      notifyListeners();
      return false;
    } catch (e, stackTrace) {
      debugPrint('[SSO] Login Error: $e');
      debugPrint('[SSO] Stack trace: $stackTrace');
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> signUp(String name, String phone, String password) async {
    // Giả lập gọi API
    await Future.delayed(const Duration(seconds: 2));
    _currentUser = UserModel(
      id: '2',
      name: name,
      email: 'newuser@gmail.com',
      phoneNumber: phone,
      profileImageUrl: 'https://i.pravatar.cc/150?u=new',
    );
    _accessToken = 'mock_jwt_token_for_test';
    _isAuthenticated = true;
    await _saveSession();
    notifyListeners();
  }

  Future<void> signOut() async {
    try {
      if (_isAuthenticated) {
        final String callbackUrlScheme = 'my-pc-assistant';
        debugPrint('[SSO] Starting OIDC logout with flutter_appauth...');
        
        await _appAuth.endSession(
          EndSessionRequest(
            idTokenHint: _idToken,
            postLogoutRedirectUrl: '$callbackUrlScheme://logout-callback',
            allowInsecureConnections: true,
            serviceConfiguration: AuthorizationServiceConfiguration(
              authorizationEndpoint: '$_baseUrl/api/auth/authorize',
              tokenEndpoint: '$_baseUrl/api/auth/token',
              endSessionEndpoint: '$_baseUrl/api/auth/logout',
            ),
          ),
        );
        debugPrint('[SSO] OIDC logout completed');
      }
    } catch (e) {
      debugPrint('[SSO] OIDC Logout info/error: $e');
    } finally {
      _currentUser = null;
      _idToken = null;
      _accessToken = null; // Clear accessToken
      _isAuthenticated = false;
      await _clearSession();
      notifyListeners();
    }
  }

  Future<void> registerFcmTokenWithBackend() async {
    try {
      final token = NotificationService.instance.token;
      final deviceId = NotificationService.instance.deviceId;
      
      if (token == null || token.isEmpty) {
        debugPrint('[Auth] FCM Token is empty or null, skipping registration');
        return;
      }

      final String appType = Platform.isAndroid ? 'mobi android' : 'mobi ios';

      debugPrint('[Auth] Registering FCM token with backend...');
      final response = await HttpClientService.instance.post(
        '/api/auth/register-fcm',
        data: {
          'fcmToken': token,
          'deviceId': deviceId,
          'appType': appType,
        },
      );
      
      debugPrint('[Auth] Register FCM token response status: ${response.statusCode}');
    } catch (e) {
      debugPrint('[Auth] FCM Token register failed: $e');
    }
  }

  @override
  bool hasPermission(String claim) {
    if (!isAuthenticated) return false;
    // MOCK: Everyone has view and share permissions. Only admin has super permissions.
    if (claim == 'files.view' || claim == 'files.share') return true;
    if (claim == 'admin.super') return _currentUser?.email == 'admin@gmail.com';
    return false;
  }

  @override
  bool hasAnyRole(List<String> roles) {
    if (!isAuthenticated) return false;
    final userRoles = _currentUser?.email == 'admin@gmail.com' ? ['admin', 'user'] : ['user'];
    return roles.any((role) => userRoles.contains(role));
  }
}
