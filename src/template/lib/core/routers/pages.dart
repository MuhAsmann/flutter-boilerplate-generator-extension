import 'package:get/get.dart';
import 'package:template/modules/demo/presentation/bindings/demo_binding.dart';
import 'package:template/modules/demo/presentation/pages/about_page.dart';
import 'package:template/modules/demo/presentation/pages/demo_page.dart';
import 'package:template/modules/demo/presentation/pages/home_page.dart';

part 'routes.dart';

class Pages {
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
