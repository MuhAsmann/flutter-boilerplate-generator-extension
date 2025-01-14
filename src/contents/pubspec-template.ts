export class PubspecTemplate {
  static template(name: string) {
    const template = `name: ${name}
description: "Flutter Boilerplate Generator Template"
publish_to: "none"
version: 1.0.0+1

environment:
  sdk: ^3.5.4

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  get: ^4.6.6
  google_fonts: ^6.2.1

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^4.0.0

flutter:
  uses-material-design: true
`;

    return template;
  }
}
