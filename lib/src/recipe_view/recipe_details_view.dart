import 'package:flutter/material.dart';

/// Displays detailed information about a Recipe.
class RecipeDetailsView extends StatelessWidget {
  const RecipeDetailsView({super.key});

  static const routeName = '/recipe';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Recipe Details'),
      ),
      body: const Center(
        child: Text('More Information Here'),
      ),
    );
  }
}
