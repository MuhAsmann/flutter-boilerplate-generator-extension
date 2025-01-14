import { PubspecTemplate } from "./template/pubspec-template";

export class Writer {
  static pubspecWriter(name: string) {
    return PubspecTemplate.template(name);
  }
}
