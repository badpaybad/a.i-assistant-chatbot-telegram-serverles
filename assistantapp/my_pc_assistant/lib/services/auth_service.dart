import 'package:flutter/foundation.dart';
import 'package:flutter_web_auth_2/flutter_web_auth_2.dart';
import 'package:dio/dio.dart';
import '../models/user_model.dart';

class AuthService extends ChangeNotifier {
  UserModel? _currentUser;
  bool _isLoading = false;
  bool _isAuthenticated = false;

  UserModel? get currentUser => _currentUser;
  bool get isAuthenticated => _isAuthenticated;
  bool get isLoading => _isLoading;

  final Dio _dio = Dio();
  
  String _selectedIp = '192.168.4.248';
  String get selectedIp => _selectedIp;

  void setBaseUrl(String ip) {
    _selectedIp = ip;
    notifyListeners();
  }

  String get _baseUrl => 'http://$_selectedIp:5000';

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
      final String authorizeUrl = '$_baseUrl/api/auth/authorize'
          '?client_id=my_pc_assistant'
          '&redirect_uri=$callbackUrlScheme://callback'
          '&response_type=code'
          '&scope=openid profile email'
          '&state=random_state';

      debugPrint('Opening SSO URL: $authorizeUrl');

      final result = await FlutterWebAuth2.authenticate(
        url: authorizeUrl,
        callbackUrlScheme: callbackUrlScheme,
      );

      final Uri callbackUri = Uri.parse(result);
      final String? code = callbackUri.queryParameters['code'];

      if (code != null) {
        debugPrint('SSO Code received: $code');
        
        // Trao đổi code lấy token
        final response = await _dio.post(
          '$_baseUrl/api/auth/token',
          data: {
            'code': code,
            'client_id': 'my_pc_assistant',
            'grant_type': 'authorization_code',
          },
          options: Options(
            contentType: Headers.formUrlEncodedContentType,
          ),
        );

        if (response.statusCode == 200) {
          final data = response.data;
          final String accessToken = data['access_token'];
          
          // Lấy thông tin user (từ /api/auth/me)
          final userResponse = await _dio.get(
            '$_baseUrl/api/auth/me',
            options: Options(
              headers: {'Authorization': 'Bearer $accessToken'},
            ),
          );

          if (userResponse.statusCode == 200) {
            final userData = userResponse.data;
            _currentUser = UserModel(
              id: 'sso_${userData['username']}',
              name: userData['displayName'] ?? userData['username'],
              email: userData['email'],
              profileImageUrl: 'https://i.pravatar.cc/150?u=${userData['username']}',
            );
            _isAuthenticated = true;
            _isLoading = false;
            notifyListeners();
            return true;
          }
        }
      }
      
      _isLoading = false;
      notifyListeners();
      return false;
    } catch (e) {
      debugPrint('SSO Login Error: $e');
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

  void signOut() {
    _currentUser = null;
    _isAuthenticated = false;
    notifyListeners();
  }
}
