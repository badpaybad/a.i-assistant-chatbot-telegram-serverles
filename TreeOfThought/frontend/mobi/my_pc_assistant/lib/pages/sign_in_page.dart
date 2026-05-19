import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:local_auth/local_auth.dart';
import 'package:provider/provider.dart';
import '../core/app_colors.dart';
import '../core/app_routes.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/custom_button.dart';
import 'package:dio/dio.dart';
import '../services/auth_service.dart';

class SignInPage extends StatefulWidget {
  const SignInPage({super.key});

  @override
  State<SignInPage> createState() => _SignInPageState();
}

class _SignInPageState extends State<SignInPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;
  final LocalAuthentication auth = LocalAuthentication();

  static const List<String> _defaultIps = ['localhost:5000', '192.168.4.248', '10.0.2.2', '118.70.117.208'];

  Future<void> _handleFingerprint() async {
    try {
      final bool canAuthenticateWithBiometrics = await auth.canCheckBiometrics;
      final bool canAuthenticate = canAuthenticateWithBiometrics || await auth.isDeviceSupported();

      if (canAuthenticate) {
        final bool didAuthenticate = await auth.authenticate(
          localizedReason: 'Vui lòng xác thực để đăng nhập',
          options: const AuthenticationOptions(biometricOnly: true),
        );

        if (didAuthenticate) {
          // Giả lập đăng nhập thành công với user test
          if (mounted) {
            context.read<AuthService>().signIn('test@gmail.com', '12345678');
            Navigator.pushReplacementNamed(context, AppRoutes.home);
          }
        }
      }
    } on PlatformException catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Lỗi xác thực: ${e.message}')),
        );
      }
    }
  }

  Future<void> _handleSignIn() async {
    setState(() => _isLoading = true);
    
    final authService = context.read<AuthService>();
    final success = await authService.signIn(
      _emailController.text,
      _passwordController.text,
    );

    setState(() => _isLoading = false);

    if (success) {
      if (mounted) {
        Navigator.pushReplacementNamed(context, AppRoutes.home);
      }
    } else {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Email hoặc mật khẩu không đúng (Thử test@gmail.com / 12345678)')),
        );
      }
    }
  }

  void _showCustomIpDialog(BuildContext context) {
    final controller = TextEditingController();
    final authService = context.read<AuthService>();
    if (!_defaultIps.contains(authService.selectedIp)) {
      controller.text = authService.selectedIp;
    }

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Nhập IP/Port tùy chỉnh'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Nhập IP hoặc tên miền kèm port (nếu có):', style: TextStyle(fontSize: 14)),
            const SizedBox(height: 10),
            TextField(
              controller: controller,
              decoration: const InputDecoration(
                hintText: 'Ví dụ: 127.0.0.1:5000 hoặc localhost',
                border: OutlineInputBorder(),
                isDense: true,
              ),
              autofocus: true,
              keyboardType: TextInputType.url,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Hủy'),
          ),
          ElevatedButton(
            onPressed: () {
              final val = controller.text.trim();
              if (val.isNotEmpty) {
                authService.setBaseUrl(val);
              }
              Navigator.pop(context);
            },
            child: const Text('Xác nhận'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.primary,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: AppColors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Sign in', style: TextStyle(color: AppColors.white, fontWeight: FontWeight.bold)),
      ),
      body: Container(
        margin: const EdgeInsets.only(top: 20),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(40),
            topRight: Radius.circular(40),
          ),
        ),
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(30),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'Welcome Back',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Theme.of(context).colorScheme.primary,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Hello there, sign in to continue',
                style: TextStyle(color: AppColors.grey),
              ),
              const SizedBox(height: 40),
              // Illustration Placeholder
              Center(
                child: Container(
                  width: 150,
                  height: 150,
                  decoration: BoxDecoration(
                    color: AppColors.primary.withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.lock_outline,
                    size: 80,
                    color: Theme.of(context).colorScheme.primary,
                  ),
                ),
              ),
              const SizedBox(height: 20),
              // ADB Reverse Instructions
              Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.blue.shade50.withOpacity(0.9),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.blue.shade200),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.info_outline, color: Colors.blue.shade800, size: 18),
                        const SizedBox(width: 8),
                        Text(
                          'Yêu cầu chạy lệnh adb reverse:',
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                            color: Colors.blue.shade800,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Container(
                      padding: const EdgeInsets.all(8),
                      width: double.infinity,
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.05),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Text(
                        'adb reverse tcp:5000 tcp:5000\nadb reverse --list',
                        style: TextStyle(
                          fontFamily: 'monospace',
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: Colors.black87,
                          height: 1.4,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              // IP Selection Dropdown
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Theme.of(context).colorScheme.primary.withOpacity(0.5)),
                ),
                child: Consumer<AuthService>(
                  builder: (context, authService, child) {
                    final currentIp = authService.selectedIp;
                    final List<DropdownMenuItem<String>> dropdownItems = [
                      const DropdownMenuItem(value: 'localhost:5000', child: Text('Localhost (localhost:5000)')),
                      const DropdownMenuItem(value: '192.168.4.248', child: Text('IP LAN (192.168.4.248)')),
                      const DropdownMenuItem(value: '10.0.2.2', child: Text('Emulator Host (10.0.2.2)')),
                      const DropdownMenuItem(value: '118.70.117.208', child: Text('Public Server (118.70.117.208)')),
                    ];
                    
                    if (!_defaultIps.contains(currentIp)) {
                      dropdownItems.insert(0, DropdownMenuItem(value: currentIp, child: Text('Custom IP: $currentIp')));
                    }
                    
                    dropdownItems.add(const DropdownMenuItem(value: 'custom_trigger', child: Text('Nhập IP/Port tùy chỉnh...')));

                    return DropdownButtonHideUnderline(
                      child: DropdownButton<String>(
                        value: currentIp,
                        isExpanded: true,
                        icon: const Icon(Icons.network_wifi),
                        items: dropdownItems,
                        onChanged: (value) {
                          if (value == 'custom_trigger') {
                            _showCustomIpDialog(context);
                          } else if (value != null) {
                            authService.setBaseUrl(value);
                          }
                        },
                      ),
                    );
                  },
                ),
              ),
              const SizedBox(height: 20),
              CustomTextField(
                hintText: 'Email or Username',
                controller: _emailController,
              ),
              const SizedBox(height: 20),
              CustomTextField(
                hintText: 'Password',
                isPassword: true,
                controller: _passwordController,
              ),
              const SizedBox(height: 20),
              Consumer<AuthService>(
                builder: (context, auth, child) => CustomButton(
                  text: 'Đăng nhập SSO (${auth.selectedIp})',
                  color: Colors.blue.shade700,
                  textColor: Colors.white,
                  icon: Icons.vpn_key,
                  onPressed: () async {
                    final authService = context.read<AuthService>();
                    final success = await authService.signInWithSso();
                    if (success) {
                      if (mounted) {
                        Navigator.pushReplacementNamed(context, AppRoutes.home);
                      }
                    } else {
                      if (mounted) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Đăng nhập SSO thất bại')),
                        );
                      }
                    }
                  },
                ),
              ),
              const SizedBox(height: 10),
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () {},
                  child: const Text(
                    'Forgot your password ?',
                    style: TextStyle(color: AppColors.grey),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              CustomButton(
                text: 'Sign in với mật khẩu',
                isLoading: _isLoading,
                onPressed: _handleSignIn,
              ),
              const SizedBox(height: 30),
              Center(
                child: Column(
                  children: [
                    GestureDetector(
                      onTap: _handleFingerprint,
                      child: Icon(
                        Icons.fingerprint,
                        size: 60,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                    const SizedBox(height: 30),
                    const Divider(),
                    const SizedBox(height: 10),
                    TextButton.icon(
                      onPressed: () async {
                        try {
                          final authService = context.read<AuthService>();
                          final targetIp = authService.selectedIp;
                          final dio = Dio();
                          final response = await dio.get('http://$targetIp:5000/.well-known/openid-configuration').timeout(const Duration(seconds: 5));
                          if (context.mounted) {
                            showDialog(
                              context: context,
                              builder: (context) => AlertDialog(
                                title: Text('OIDC Config from $targetIp'),
                                content: SingleChildScrollView(
                                  child: Text(response.data.toString(), style: const TextStyle(fontSize: 12, fontFamily: 'monospace')),
                                ),
                                actions: [
                                  TextButton(onPressed: () => Navigator.pop(context), child: const Text('Đóng'))
                                ],
                              ),
                            );
                          }
                        } catch (e) {
                          debugPrint('OIDC Check Error: $e');
                          if (context.mounted) {
                            final targetIp = context.read<AuthService>().selectedIp;
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('Lỗi kết nối $targetIp: ${e.toString().split('\n').first}'), 
                                backgroundColor: Colors.red,
                                duration: const Duration(seconds: 10),
                                action: SnackBarAction(label: 'Chi tiết', textColor: Colors.white, onPressed: () {
                                  showDialog(
                                    context: context,
                                    builder: (context) => AlertDialog(
                                      title: const Text('Chi tiết lỗi'),
                                      content: Text(e.toString()),
                                      actions: [TextButton(onPressed: () => Navigator.pop(context), child: const Text('OK'))],
                                    ),
                                  );
                                }),
                              ),
                            );
                          }
                        }
                      },
                      icon: const Icon(Icons.network_check),
                      label: Consumer<AuthService>(
                        builder: (context, auth, child) => Text('Kiểm tra cấu hình OIDC (${auth.selectedIp})'),
                      ),
                    ),
                    const SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text("Don't have an account? "),
                        GestureDetector(
                          onTap: () => Navigator.pushNamed(context, AppRoutes.signUp),
                          child: Text(
                            'Sign Up',
                            style: TextStyle(
                              color: Theme.of(context).colorScheme.primary,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
