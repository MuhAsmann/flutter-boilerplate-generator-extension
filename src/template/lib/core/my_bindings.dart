import 'package:get/get.dart';
import 'package:template/modules/demo/presentation/bindings/demo_binding.dart';

class MyBindings extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<DemoBinding>(() => DemoBinding());
  }
}
