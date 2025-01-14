import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:template/core/routers/pages.dart';

class DemoController extends GetxController {
  void changeTheme() {
    Get.changeThemeMode(ThemeMode.dark);
  }

  void changeLanguage() {
    Get.updateLocale(const Locale("id"));
  }

  void navigateToHome() {
    Get.toNamed(Routes.home);
  }

  void navigateToAbout() {
    Get.toNamed(Routes.home);
  }
}
