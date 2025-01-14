import { PubspecTemplate } from "./contents/pubspec-template";

export class Writer {
  static pubspecWriter(name: string) {
    return PubspecTemplate.template(name);
  }
}
