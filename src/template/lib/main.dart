import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:template/core/lang/my_translations.dart';
import 'package:template/core/my_bindings.dart';
import 'package:template/core/routers/pages.dart';
import 'package:template/core/themes/my_theme.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Flutter Generator Boilerplate',
      themeMode: ThemeMode.system,
      theme: MyTheme.lightMode,
      darkTheme: MyTheme.darkMode,
      locale: Get.locale,
      initialBinding: MyBindings(),
      translations: MyTranslations(),
      initialRoute: Pages.initialRoute,
      getPages: Pages.routes,
    );
  }
}
