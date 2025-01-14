import { safeCapitalize } from "../utils/capitalize";
import { getWorkspace } from "../utils/workspace";

export class PatternContent {
  actualName: string;
  fileName: string;
  constructor(fileName: string) {
    this.actualName = fileName.toLowerCase();
    this.fileName = fileName
      .split("_")
      .map((e) => safeCapitalize(e))
      .join("");
  }
  get dataSource() {
    return `class ${this.fileName}RemoteDataSource{}`;
  }

  get model() {
    return `class ${this.fileName}Model{}`;
  }

  get repository() {
    return `class ${this.fileName}Repository{}`;
  }

  get binding() {
    const workspace = getWorkspace();
    return `import 'package:get/get.dart';
import 'package:${workspace}/modules/${this.actualName}/presentation/controllers/${this.actualName}_controller.dart';

class ${this.fileName}Binding extends Bindings {
  @override
  void dependencies() {
    Get.put<${this.fileName}Controller>(${this.fileName}Controller());
  }
}
`;
  }
  get controller() {
    return `import 'package:get/get.dart';

class ${this.fileName}Controller extends GetxController {}
`;
  }

  get page() {
    return `import 'package:flutter/material.dart';

class ${this.fileName}Page extends StatelessWidget {
  const ${this.fileName}Page({super.key});

  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
`;
  }

  get widget() {
    return `import 'package:flutter/material.dart';

class ${this.fileName}Widget extends StatelessWidget {
  const ${this.fileName}Widget({super.key});

  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
`;
  }
}
