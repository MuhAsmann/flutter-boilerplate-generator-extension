import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:template/core/lang/my_localizations.dart';
import 'package:template/core/themes/my_style.dart';
import 'package:template/modules/demo/presentation/controllers/demo_controller.dart';

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
                  Text(MyLocalizations.changeTheme),
                  GestureDetector(
                    onTap: controller.changeTheme,
                    child: Text(
                      MyLocalizations.darkMode,
                      style: MyStyle.mdSemiBold,
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
                    MyLocalizations.changeLanguage,
                  ),
                  GestureDetector(
                    onTap: controller.changeLanguage,
                    child: Text(
                      "Indonesia",
                      style: MyStyle.mdSemiBold,
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
                    MyLocalizations.navigatePage,
                  ),
                  Row(
                    children: [
                      GestureDetector(
                        onTap: controller.navigateToHome,
                        child: Text(
                          MyLocalizations.home,
                          style: MyStyle.mdSemiBold,
                        ),
                      ),
                      const SizedBox(
                        width: 8,
                      ),
                      GestureDetector(
                        onTap: controller.navigateToAbout,
                        child: Text(
                          MyLocalizations.aboutMe,
                          style: MyStyle.mdSemiBold,
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
