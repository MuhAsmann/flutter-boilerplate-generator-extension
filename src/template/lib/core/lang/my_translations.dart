import 'package:get/get.dart';

class MyTranslations extends Translations {
  @override
  Map<String, Map<String, String>> get keys => {
        'id': {
          'changeTheme': 'Ubah Tema',
          'darkMode': 'Tema Gelap',
          'changeLanguage': 'Ubah Bahasa',
          'navigatePage': 'Pindah Halaman',
          'home': 'Beranda',
          'aboutMe': 'Tentang Saya',
        },
        'en': {
          'changeTheme': 'Change Theme',
          'darkMode': 'Dark Mode',
          'changeLanguage': 'Change Language',
          'navigatePage': 'Navigate Page',
          'home': 'Home',
          'aboutMe': 'About Me',
        }
      };
}
