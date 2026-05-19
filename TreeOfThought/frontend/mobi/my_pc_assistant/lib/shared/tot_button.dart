import 'package:flutter/material.dart';

class TotButton extends StatefulWidget {
  final Future<void> Function()? onPressed;
  final Widget child;
  final Color? color;
  final Color? textColor;
  final double borderRadius;
  final double? width;
  final double height;
  final Widget? icon;
  final BorderSide? border;

  const TotButton({
    super.key,
    required this.onPressed,
    required this.child,
    this.color,
    this.textColor,
    this.borderRadius = 12.0,
    this.width,
    this.height = 48.0,
    this.icon,
    this.border,
  });

  @override
  State<TotButton> createState() => _TotButtonState();
}

class _TotButtonState extends State<TotButton> {
  bool _isLoading = false;

  void _handlePress() async {
    if (widget.onPressed == null || _isLoading) return;

    setState(() {
      _isLoading = true;
    });

    try {
      await widget.onPressed!();
    } catch (e) {
      debugPrint('[TotButton] Error during execution: $e');
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final buttonColor = widget.color ?? theme.colorScheme.primary;
    final contentColor = widget.textColor ?? Colors.white;

    final Widget buttonContent = Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (_isLoading) ...[
          SizedBox(
            width: 18,
            height: 18,
            child: CircularProgressIndicator(
              strokeWidth: 2.0,
              valueColor: AlwaysStoppedAnimation<Color>(contentColor),
            ),
          ),
          const SizedBox(width: 10),
        ] else if (widget.icon != null) ...[
          widget.icon!,
          const SizedBox(width: 8),
        ],
        widget.child,
      ],
    );

    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: buttonColor,
          foregroundColor: contentColor,
          disabledBackgroundColor: buttonColor.withOpacity(0.6),
          disabledForegroundColor: contentColor.withOpacity(0.8),
          elevation: _isLoading ? 0 : 2,
          shadowColor: buttonColor.withOpacity(0.3),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(widget.borderRadius),
            side: widget.border ?? BorderSide.none,
          ),
          padding: const EdgeInsets.symmetric(horizontal: 16),
        ),
        onPressed: (widget.onPressed == null || _isLoading) ? null : _handlePress,
        child: buttonContent,
      ),
    );
  }
}
