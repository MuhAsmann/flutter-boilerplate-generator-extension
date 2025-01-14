import 'package:get/get.dart';
import 'package:template/modules/demo/presentation/controllers/demo_controller.dart';

class DemoBinding extends Bindings {
  @override
  void dependencies() {
    Get.put<DemoController>(DemoController());
  }
}
