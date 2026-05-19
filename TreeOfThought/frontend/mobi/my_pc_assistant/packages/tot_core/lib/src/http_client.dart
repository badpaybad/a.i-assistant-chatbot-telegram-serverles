import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

class HttpClientService {
  static final HttpClientService _instance = HttpClientService._internal();
  static HttpClientService get instance => _instance;
  HttpClientService._internal();

  late Dio _dio;
  String Function()? _baseUrlProvider;
  String? Function()? _tokenProvider;
  
  // Busy notifier for global loading overlays
  final ValueNotifier<bool> isBusy = ValueNotifier<bool>(false);
  
  // Stream controller for global API error messages
  final ValueNotifier<String?> errorNotifier = ValueNotifier<String?>(null);

  void init({
    required String Function() baseUrlProvider,
    required String? Function() tokenProvider,
  }) {
    _baseUrlProvider = baseUrlProvider;
    _tokenProvider = tokenProvider;
    _initDio();
  }

  void _initDio() {
    _dio = Dio(BaseOptions(
      connectTimeout: const Duration(seconds: 15),
      receiveTimeout: const Duration(seconds: 15),
    ));

    // Request/Response & Auth Interceptor
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          // Dynamic baseUrl update
          if (_baseUrlProvider != null) {
            options.baseUrl = _baseUrlProvider!();
          }
          
          // Inject Authorization Bearer token if present
          if (_tokenProvider != null) {
            final token = _tokenProvider!();
            if (token != null && token.isNotEmpty) {
              options.headers['Authorization'] = 'Bearer $token';
            }
          }
          
          debugPrint('[HTTP] Request: ${options.method} ${options.baseUrl}${options.path}');
          isBusy.value = true; // Set loading state
          return handler.next(options);
        },
        onResponse: (response, handler) {
          debugPrint('[HTTP] Response Status: ${response.statusCode}');
          isBusy.value = false; // Hide loading state
          return handler.next(response);
        },
        onError: (DioException e, handler) {
          debugPrint('[HTTP] Error: ${e.message}');
          isBusy.value = false; // Hide loading state
          
          // Formulate generic user-friendly message
          String errorMessage = 'common.error';
          if (e.response != null) {
            final data = e.response?.data;
            if (data is Map && data.containsKey('message')) {
              errorMessage = data['message'].toString();
            } else {
              errorMessage = 'Server error (${e.response?.statusCode})';
            }
          } else {
            errorMessage = 'Network connection failed';
          }
          
          errorNotifier.value = errorMessage; // Dispatch global error notification
          return handler.next(e);
        },
      ),
    );
  }

  Future<Response<T>> get<T>(String path, {Map<String, dynamic>? queryParameters}) async {
    try {
      return await _dio.get<T>(path, queryParameters: queryParameters);
    } catch (e) {
      rethrow;
    }
  }

  Future<Response<T>> post<T>(String path, {dynamic data, Map<String, dynamic>? queryParameters}) async {
    try {
      return await _dio.post<T>(path, data: data, queryParameters: queryParameters);
    } catch (e) {
      rethrow;
    }
  }

  Future<Response<T>> put<T>(String path, {dynamic data, Map<String, dynamic>? queryParameters}) async {
    try {
      return await _dio.put<T>(path, data: data, queryParameters: queryParameters);
    } catch (e) {
      rethrow;
    }
  }

  Future<Response<T>> delete<T>(String path, {dynamic data, Map<String, dynamic>? queryParameters}) async {
    try {
      return await _dio.delete<T>(path, data: data, queryParameters: queryParameters);
    } catch (e) {
      rethrow;
    }
  }

  Future<Response<T>> patch<T>(String path, {dynamic data, Map<String, dynamic>? queryParameters}) async {
    try {
      return await _dio.patch<T>(path, data: data, queryParameters: queryParameters);
    } catch (e) {
      rethrow;
    }
  }
}
