import 'package:flutter/material.dart';
import 'pages/sign_in_page.dart';
import 'pages/sign_up_page.dart';
import 'pages/home_page.dart';
import 'pages/hardware_page.dart';
import 'pages/vector_search_page.dart';
import 'package:tot_core/tot_core.dart';
import 'package:tot_buss_files/tot_buss_files.dart';
import 'package:tot_facerecognition/tot_facerecognition.dart';

class AppRoutes {
  static const String signIn = '/sign-in';
  static const String signUp = '/sign-up';
  static const String home = '/home';
  static const String hardware = '/hardware';
  static const String vectorSearch = '/vector-search';
  static const String filesFolders = '/files-folders';
  static const String faceRecognition = '/face-recognition';

  static Map<String, WidgetBuilder> get routes => {
    signIn: (context) => const SignInPage(),
    signUp: (context) => const SignUpPage(),
    home: (context) => const HomePage(),
    hardware: (context) => const HardwarePage(),
    vectorSearch: (context) => const VectorSearchPage(),
    filesFolders: (context) => const TotRouteGuard(
      requiredPermission: 'files.view',
      child: FolderContentPage(),
    ),
    faceRecognition: (context) => const FaceRecognitionPage(),
  };

  static String get initialRoute => signIn;
}
