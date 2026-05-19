import 'package:flutter/foundation.dart';
import 'package:flutter_appauth/flutter_appauth.dart';
import 'package:dio/dio.dart';
import '../models/user_model.dart';

class AuthService extends ChangeNotifier {
  UserModel? _currentUser;
  bool _isLoading = false;
  bool _isAuthenticated = false;
  String? _idToken;

  UserModel? get currentUser => _currentUser;
  bool get isAuthenticated => _isAuthenticated;
  bool get isLoading => _isLoading;

  final Dio _dio = Dio();
  final FlutterAppAuth _appAuth = const FlutterAppAuth();
  
  String _selectedIp = 'localhost:5000';
  String get selectedIp => _selectedIp;

  void setBaseUrl(String ip) {
    _selectedIp = ip;
    notifyListeners();
  }

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

  Future<bool> signIn(String email, String password) async {
    _isLoading = true;
    notifyListeners();
    
    // Giả lập gọi API
    await Future.delayed(const Duration(seconds: 2));
    
    if (email == 'test@gmail.com' && password == '12345678') {
      _currentUser = UserModel(
        id: '1',
        name: 'John Smith',
        email: email,
        profileImageUrl: 'https://i.pravatar.cc/150?u=john',
      );
      _isAuthenticated = true;
      _isLoading = false;
      notifyListeners();
      return true;
    }
    _isLoading = false;
    notifyListeners();
    return false;
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
        _idToken = result.idToken; // Save idToken for signOut
        
        debugPrint('[SSO] Access token received. Fetching user info...');

        // Lấy thông tin user (từ /api/auth/me)
        final userResponse = await _dio.get(
          '$_baseUrl/api/auth/me',
          options: Options(
            headers: {'Authorization': 'Bearer $accessToken'},
          ),
        );

        debugPrint('[SSO] User info status: ${userResponse.statusCode}');

        if (userResponse.statusCode == 200) {
          final userData = userResponse.data;
          final username = userData['preferred_username'] ?? userData['sub'];
          _currentUser = UserModel(
            id: 'sso_$username',
            name: userData['name'] ?? username,
            email: userData['email'],
            profileImageUrl: 'https://i.pravatar.cc/150?u=$username',
          );
          _isAuthenticated = true;
          _isLoading = false;
          notifyListeners();
          debugPrint('[SSO] Login successful for $username');
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
    _isAuthenticated = true;
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
      _isAuthenticated = false;
      notifyListeners();
    }
  }
}
