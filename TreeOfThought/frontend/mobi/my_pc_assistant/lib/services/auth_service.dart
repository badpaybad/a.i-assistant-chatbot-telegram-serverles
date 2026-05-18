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
      final Uri authorizeUri = Uri.parse('$_baseUrl/api/auth/authorize').replace(queryParameters: {
        'client_id': 'my_pc_assistant',
        'redirect_uri': '$callbackUrlScheme://callback',
        'response_type': 'code',
        'scope': 'openid profile email',
        'state': 'random_state',
      });
      
      final String authorizeUrl = authorizeUri.toString();

      debugPrint('[SSO] Starting authentication with URL: $authorizeUrl');
      debugPrint('[SSO] Callback Scheme: $callbackUrlScheme');

      final result = await FlutterWebAuth2.authenticate(
        url: authorizeUrl,
        callbackUrlScheme: callbackUrlScheme,
      );

      debugPrint('[SSO] Authentication result received: $result');

      final Uri callbackUri = Uri.parse(result);
      final String? code = callbackUri.queryParameters['code'];

      if (code != null) {
        debugPrint('[SSO] Code received: $code. Exchanging for token...');
        
        // Trao đổi code lấy token
        final response = await _dio.post(
          '$_baseUrl/api/auth/token',
          data: {
            'code': code,
            'client_id': 'my_pc_assistant',
            'grant_type': 'authorization_code',
            'redirect_uri': '$callbackUrlScheme://callback',
          },
          options: Options(
            contentType: Headers.formUrlEncodedContentType,
          ),
        );

        debugPrint('[SSO] Token response status: ${response.statusCode}');
        debugPrint('[SSO] Token response data: ${response.data}');

        if (response.statusCode == 200) {
          final data = response.data;
          final String accessToken = data['access_token'];
          
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
      } else {
        debugPrint('[SSO] No code found in callback URL');
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
        final Uri logoutUri = Uri.parse('$_baseUrl/api/auth/logout').replace(queryParameters: {
          'post_logout_redirect_uri': '$callbackUrlScheme://logout-callback',
        });
        
        debugPrint('[SSO] Starting OIDC logout with URL: ${logoutUri.toString()}');
        
        // Mở trình duyệt để logout ở phía server (OIDC Provider)
        await FlutterWebAuth2.authenticate(
          url: logoutUri.toString(),
          callbackUrlScheme: callbackUrlScheme,
        );
        debugPrint('[SSO] OIDC logout completed');
      }
    } catch (e) {
      debugPrint('[SSO] OIDC Logout info/error: $e');
      // Tiếp tục xóa session cục bộ kể cả khi OIDC logout gặp lỗi hoặc bị hủy
    } finally {
      _currentUser = null;
      _isAuthenticated = false;
      notifyListeners();
    }
  }
}
