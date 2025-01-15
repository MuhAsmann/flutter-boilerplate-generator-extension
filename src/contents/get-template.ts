import { safeCapitalize } from "../utils/capitalize";

class GetTemplateCoreFolder {
  actualName: string;
  filename: string;
  constructor(filename: string) {
    this.actualName = filename;
    this.filename = filename
      .split("_")
      .map((e) => safeCapitalize(e))
      .join("");
  }

  get localizations() {
    return `import 'package:get/get.dart';

abstract class ${this.filename}Localizations {
  static String get changeTheme => "changeTheme".tr;
  static String get darkMode => "darkMode".tr;
  static String get changeLanguage => "changeLanguage".tr;
  static String get navigatePage => "navigatePage".tr;
  static String get home => "home".tr;
  static String get aboutMe => "aboutMe".tr;
}
`;
  }
  get translations() {
    return `import 'package:get/get.dart';

class ${this.filename}Translations extends Translations {
  @override
  Map<String, Map<String, String>> get keys => {
        'id': {
          'changeTheme': 'Ubah Tema',
          'darkMode': 'Tema Gelap',
          'changeLanguage': 'Ubah Bahasa',
          'navigatePage': 'Pindah Halaman',
          'home': 'Beranda',
          'aboutMe': 'Tentang Saya',
        },
        'en': {
          'changeTheme': 'Change Theme',
          'darkMode': 'Dark Mode',
          'changeLanguage': 'Change Language',
          'navigatePage': 'Navigate Page',
          'home': 'Home',
          'aboutMe': 'About Me',
        }
      };
}
`;
  }
  get pages() {
    return `import 'package:get/get.dart';
import 'package:${this.actualName}/modules/demo/presentation/bindings/demo_binding.dart';
import 'package:${this.actualName}/modules/demo/presentation/pages/about_page.dart';
import 'package:${this.actualName}/modules/demo/presentation/pages/demo_page.dart';
import 'package:${this.actualName}/modules/demo/presentation/pages/home_page.dart';

part '${this.actualName}_routes.dart';

class ${this.filename}Pages {
  static const String initialRoute = _Path.demo;

  static List<GetPage> routes = [
    GetPage(
      name: _Path.demo,
      page: () => const DemoPage(),
      binding: DemoBinding(),
    ),
    GetPage(
      name: _Path.home,
      page: () => const HomePage(),
      binding: DemoBinding(),
    ),
    GetPage(
      name: _Path.aboutMe,
      page: () => const AboutPage(),
      binding: DemoBinding(),
    ),
  ];
}
`;
  }
  get routes() {
    return `part of "${this.actualName}_pages.dart";

abstract class ${this.filename}Routes {
  static const demo = _Path.demo;
  static const home = _Path.home;
  static const aboutMe = _Path.aboutMe;
}

abstract class _Path {
  static const String demo = "/demo";
  static const String home = "/home";
  static const String aboutMe = "/about-me";
}
`;
  }
  get styles() {
    return `import 'package:flutter/widgets.dart';
import 'package:google_fonts/google_fonts.dart';

class ${this.filename}Styles {
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
`;
  }
  get themes() {
    return `import 'package:flutter/material.dart';

class ${this.filename}Themes {
  static ThemeData get darkMode => ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.blue,
        appBarTheme: AppBarTheme(
          iconTheme: const IconThemeData(color: Colors.white),
          backgroundColor: Colors.grey[900],
          titleTextStyle: const TextStyle(color: Colors.white, fontSize: 20),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.grey[800],
            foregroundColor: Colors.white,
          ),
        ),
      );

  static ThemeData get lightMode => ThemeData(
        brightness: Brightness.light,
        primarySwatch: Colors.blue,
        appBarTheme: const AppBarTheme(
          iconTheme: IconThemeData(color: Colors.white),
          backgroundColor: Colors.blue,
          titleTextStyle: TextStyle(color: Colors.white, fontSize: 20),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue,
            foregroundColor: Colors.white,
          ),
        ),
      );
}
`;
  }
  get bindings() {
    return `import 'package:get/get.dart';
import 'package:${this.actualName}/modules/demo/presentation/bindings/demo_binding.dart';

class ${this.filename}Bindings extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<DemoBinding>(() => DemoBinding());
  }
}
`;
  }
}
class GetTemplateModulesFolder {
  actualName: string;
  filename: string;
  constructor(filename: string) {
    this.actualName = filename;
    this.filename = filename
      .split("_")
      .map((e) => safeCapitalize(e))
      .join("");
  }

  get dataSource() {
    return `class DemoRemoteDataSource {}`;
  }
  get model() {
    return `class DemoModel {}`;
  }
  get repository() {
    return `class DemoRepository {}`;
  }
  get binding() {
    return `import 'package:get/get.dart';
import 'package:${this.actualName}/modules/demo/presentation/controllers/demo_controller.dart';

class DemoBinding extends Bindings {
  @override
  void dependencies() {
    Get.put<DemoController>(DemoController());
  }
}
`;
  }
  get controller() {
    return `import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:${this.actualName}/core/routers/${this.actualName}_pages.dart';

class DemoController extends GetxController {
  void changeTheme() {
    Get.changeThemeMode(ThemeMode.dark);
  }

  void changeLanguage() {
    Get.updateLocale(const Locale("id"));
  }

  void navigateToHome() {
    Get.toNamed(${this.filename}Routes.home);
  }

  void navigateToAbout() {
    Get.toNamed(${this.filename}Routes.home);
  }
}
`;
  }
  get demo() {
    return `import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:${this.actualName}/core/lang/${this.actualName}_localizations.dart';
import 'package:${this.actualName}/core/themes/${this.actualName}_styles.dart';
import 'package:${this.actualName}/modules/demo/presentation/controllers/demo_controller.dart';

class DemoPage extends GetView<DemoController> {
  const DemoPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Flutter Boilerplate Generator - Demo"),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(${this.filename}Localizations.changeTheme),
                  GestureDetector(
                    onTap: controller.changeTheme,
                    child: Text(
                      ${this.filename}Localizations.darkMode,
                      style: ${this.filename}Styles.mdSemiBold,
                    ),
                  ),
                ],
              ),
              const SizedBox(
                height: 16,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    ${this.filename}Localizations.changeLanguage,
                  ),
                  GestureDetector(
                    onTap: controller.changeLanguage,
                    child: Text(
                      "Indonesia",
                      style: ${this.filename}Styles.mdSemiBold,
                    ),
                  ),
                ],
              ),
              const SizedBox(
                height: 16,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    ${this.filename}Localizations.navigatePage,
                  ),
                  Row(
                    children: [
                      GestureDetector(
                        onTap: controller.navigateToHome,
                        child: Text(
                          ${this.filename}Localizations.home,
                          style: ${this.filename}Styles.mdSemiBold,
                        ),
                      ),
                      const SizedBox(
                        width: 8,
                      ),
                      GestureDetector(
                        onTap: controller.navigateToAbout,
                        child: Text(
                          ${this.filename}Localizations.aboutMe,
                          style: ${this.filename}Styles.mdSemiBold,
                        ),
                      ),
                    ],
                  )
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`;
  }
  get about() {
    return `import 'package:flutter/material.dart';
import 'package:${this.actualName}/core/lang/${this.actualName}_localizations.dart';
import 'package:${this.actualName}/core/themes/${this.actualName}_styles.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Flutter Boilerplate Generator - About"),
      ),
      body: SafeArea(
        child: Center(
          child: Text(
            ${this.filename}Localizations.aboutMe,
            style: ${this.filename}Styles.lgSemiBold,
          ),
        ),
      ),
    );
  }
}
`;
  }
  get home() {
    return `import 'package:flutter/material.dart';
import 'package:${this.actualName}/core/lang/${this.actualName}_localizations.dart';
import 'package:${this.actualName}/core/themes/${this.actualName}_styles.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Flutter Boilerplate Generator - Home"),
      ),
      body: SafeArea(
        child: Center(
          child: Text(
            ${this.filename}Localizations.home,
            style: ${this.filename}Styles.lgSemiBold,
          ),
        ),
      ),
    );
  }
}
`;
  }
  get widget() {
    return `import 'package:flutter/material.dart';

class DemoWidget extends StatelessWidget {
  const DemoWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
`;
  }
}

class GetTemplateMain {
  actualName: string;
  filename: string;
  constructor(filename: string) {
    this.actualName = filename;
    this.filename = filename
      .split("_")
      .map((e) => safeCapitalize(e))
      .join("");
  }

  get main() {
    return `import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:${this.actualName}/core/lang/${this.actualName}_translations.dart';
import 'package:${this.actualName}/core/${this.actualName}_bindings.dart';
import 'package:${this.actualName}/core/routers/${this.actualName}_pages.dart';
import 'package:${this.actualName}/core/themes/${this.actualName}_themes.dart';

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
      theme: ${this.filename}Themes.lightMode,
      darkTheme: ${this.filename}Themes.darkMode,
      locale: Get.locale,
      initialBinding: ${this.filename}Bindings(),
      translations: ${this.filename}Translations(),
      initialRoute: ${this.filename}Pages.initialRoute,
      getPages: ${this.filename}Pages.routes,
    );
  }
}
`;
  }
}

export { GetTemplateCoreFolder, GetTemplateModulesFolder, GetTemplateMain };
