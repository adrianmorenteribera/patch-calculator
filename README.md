# React Native Product Proportions Calculator

This React Native application allows users to manage a list of products and calculate the required quantity of a product based on a given water quantity. The app handles different units of measurement (grams, liters, milliliters) and automatically converts output to higher units when appropriate.

## Features

- **Product Management:** Add, edit, and delete products, each with specific quantity and water references.
- **Proportion Calculation:** Calculate the required product quantity based on the input water amount.
- **Unit Conversion:** Automatically converts quantities to kilograms if over 1000g or to liters if over 1000ml.
- **Themed UI:** Consistent theming across components, with light and dark mode support.

## Getting Started

### Prerequisites

- **Node.js** and **npm/yarn**
- **React Native CLI** or **Expo CLI**
- **Android Studio** or **Xcode** (for Android/iOS development)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/product-proportions-calculator.git
   cd product-proportions-calculator
   ```
   
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
   
3. **Run the app:**
   ```bash
   npm run android  # For Android
   npx run ios      # For iOS
   ```
### File Structure

- **components/**: Reusable UI components like `InputSelector`, `InputNumber`, and `ThemedText`.
- **utils/**: Utility functions like `calculateRequiredProductQuantity` for handling unit conversions.
- **screens/**: Contains screen components such as `HomeScreen` and `ProductList`.
- **assets/**: Images and other static assets.
- **types/**: TypeScript types for better code safety and autocomplete.

### Usage

- **Adding a Product:** Navigate to the "Add Product" screen, fill in the required fields, and save.
- **Calculating Proportions:** On the main screen, select a product, enter the water quantity, and see the calculated product quantity.
- **Editing Products:** On the "Product List" screen, select a product to edit its details.