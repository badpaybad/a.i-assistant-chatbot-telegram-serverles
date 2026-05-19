import 'package:flutter/material.dart';

/// Abstract interface representing Authentication and Authorization state.
/// Business modules and the App Shell implement this interface to bridge their specific
/// authentication layers (e.g. JWT-based, OIDC, OAuth2) with generic core components.
abstract class TotAuthService {
  /// Check if the user is authenticated.
  bool get isAuthenticated;

  /// Check if the authenticated user has a specific claim/permission.
  bool hasPermission(String claim);

  /// Check if the authenticated user possesses any of the required roles.
  bool hasAnyRole(List<String> roles);
}

/// Fallback security coordinator in case no service is registered.
class _FallbackAuthService implements TotAuthService {
  const _FallbackAuthService();

  @override
  bool get isAuthenticated => false;

  @override
  bool hasPermission(String claim) => false;

  @override
  bool hasAnyRole(List<String> roles) => false;
}

/// Central Security Context coordinator for managing user access and credentials.
class TotSecurityContext {
  static final TotSecurityContext _instance = TotSecurityContext._internal();
  static TotSecurityContext get instance => _instance;
  TotSecurityContext._internal();

  TotAuthService _authService = const _FallbackAuthService();

  /// Register the application-specific auth provider service.
  void registerAuthService(TotAuthService authService) {
    _authService = authService;
  }

  /// Expose the current registered authentication context.
  TotAuthService get auth => _authService;
}

/// 🛡️ [TotRouteGuard] (equivalent to Angular CanActivate guard)
/// Intercepts navigation to a page. If the user is unauthenticated or unauthorized,
/// it renders the [fallback] view or automatically navigates to a fallback route.
class TotRouteGuard extends StatelessWidget {
  final Widget child;
  final String? requiredPermission;
  final List<String>? requiredRoles;
  final Widget? fallback;

  const TotRouteGuard({
    super.key,
    required this.child,
    this.requiredPermission,
    this.requiredRoles,
    this.fallback,
  });

  @override
  Widget build(BuildContext context) {
    final security = TotSecurityContext.instance.auth;

    // 1. Authenticated check
    if (!security.isAuthenticated) {
      return fallback ?? const DefaultUnauthorizedView();
    }

    // 2. Permission/Claim check
    if (requiredPermission != null && !security.hasPermission(requiredPermission!)) {
      return fallback ?? const DefaultForbiddenView(message: 'Bạn không có quyền truy cập tính năng này.');
    }

    // 3. Role check
    if (requiredRoles != null && !security.hasAnyRole(requiredRoles!)) {
      return fallback ?? const DefaultForbiddenView(message: 'Vai trò của bạn không được phép truy cập trang này.');
    }

    return child;
  }
}

/// 👁️ [TotPermission] (equivalent to Angular permission directive appHasPermission)
/// Shows the [child] widget only if the user possesses the required claims or roles.
/// Otherwise, displays the [fallback] widget (defaults to [SizedBox.shrink] to hide the element completely).
class TotPermission extends StatelessWidget {
  final Widget child;
  final String? claim;
  final List<String>? roles;
  final Widget fallback;

  const TotPermission({
    super.key,
    required this.child,
    this.claim,
    this.roles,
    this.fallback = const SizedBox.shrink(),
  });

  @override
  Widget build(BuildContext context) {
    final security = TotSecurityContext.instance.auth;

    if (!security.isAuthenticated) return fallback;
    if (claim != null && !security.hasPermission(claim!)) return fallback;
    if (roles != null && !security.hasAnyRole(roles!)) return fallback;

    return child;
  }
}

// Default Premium Layouts for Security States

class DefaultUnauthorizedView extends StatelessWidget {
  const DefaultUnauthorizedView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.amber.shade50,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.lock_outline, size: 64, color: Colors.amber),
              ),
              const SizedBox(height: 24),
              const Text(
                'Yêu cầu đăng nhập',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              Text(
                'Vui lòng đăng nhập tài khoản của bạn để truy cập nội dung này.',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey.shade600, fontSize: 14),
              ),
              const SizedBox(height: 32),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                icon: const Icon(Icons.login),
                label: const Text('Đăng nhập ngay'),
                onPressed: () {
                  // Direct navigation back to login or root
                  Navigator.of(context).popUntil((route) => route.isFirst);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class DefaultForbiddenView extends StatelessWidget {
  final String message;
  const DefaultForbiddenView({
    super.key,
    this.message = 'Bạn không có quyền truy cập tài liệu này.',
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Từ chối truy cập'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.red.shade50,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.gpp_bad_outlined, size: 64, color: Colors.red),
              ),
              const SizedBox(height: 24),
              const Text(
                'Không đủ thẩm quyền',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              Text(
                message,
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey.shade600, fontSize: 14),
              ),
              const SizedBox(height: 32),
              OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                icon: const Icon(Icons.arrow_back),
                label: const Text('Quay lại'),
                onPressed: () => Navigator.pop(context),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
