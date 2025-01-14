import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

class MyStyle {
  static TextStyle get _default {
    return GoogleFonts.plusJakartaSans(
      textStyle: TextStyle(
        fontSize: _Size.xs,
        fontWeight: FontWeight.w600,
      ),
    );
  }

  static TextStyle get xsSemiBold => _default.copyWith();
  static TextStyle get smSemiBold => _default.copyWith(fontSize: _Size.sm);
  static TextStyle get mdSemiBold => _default.copyWith(fontSize: _Size.md);
  static TextStyle get lgSemiBold => _default.copyWith(fontSize: _Size.lg);
  static TextStyle get xlSemiBold => _default.copyWith(fontSize: _Size.xl);
}

class _Size {
  static double get xl => 28;
  static double get lg => 20;
  static double get md => 16;
  static double get sm => 12;
  static double get xs => 8;
}
