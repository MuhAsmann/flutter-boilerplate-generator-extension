import 'package:flutter/material.dart';
import 'package:template/core/lang/my_localizations.dart';
import 'package:template/core/themes/my_style.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Flutter Boilerplate Generator - Home"),
      ),
      body: SafeArea(
        child: Center(
          child: Text(
            MyLocalizations.home,
            style: MyStyle.lgSemiBold,
          ),
        ),
      ),
    );
  }
}
