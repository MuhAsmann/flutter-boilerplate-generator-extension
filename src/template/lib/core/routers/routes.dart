part of "pages.dart";

abstract class Routes {
  static const demo = _Path.demo;
  static const home = _Path.home;
  static const aboutMe = _Path.aboutMe;
}

abstract class _Path {
  static const String demo = "/demo";
  static const String home = "/home";
  static const String aboutMe = "/about-me";
}
