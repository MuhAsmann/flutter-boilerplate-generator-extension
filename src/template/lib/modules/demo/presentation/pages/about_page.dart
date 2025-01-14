import 'package:flutter/material.dart';
import 'package:template/core/lang/my_localizations.dart';
import 'package:template/core/themes/my_style.dart';

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
            MyLocalizations.aboutMe,
            style: MyStyle.lgSemiBold,
          ),
        ),
      ),
    );
  }
}
