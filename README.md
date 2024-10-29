# Egg Timer App

A customizable timer app for cooking the perfect eggs, built using React Native and Expo.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Project](#running-the-project)

## Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **Yarn** - [Download Yarn here](https://yarnpkg.com/)
- **Expo CLI** - Install globally using:

  ```bash
  npm install -g expo-cli
  ```

## Getting Started

Follow these steps to set up and run the Egg Timer App on your local machine.

### 1. Clone the Repository

Open your terminal and run the following command:

```bash
git clone https://github.com/your-username/egg-timer-app.git
cd egg-timer-app
```

### 2. Install Dependencies

Install all the necessary dependencies using npm or yarn:

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

### 3. Start the Expo Development Server

To start the Expo development server, run:

```bash
# Using npm
npm start

# OR using yarn
yarn start
```

Alternatively, you can use:

```bash
expo start
```

This command will open the Expo Developer Tools in your default web browser.

### 4. Running on a Physical Device

To run the app on your smartphone:

1. Install the **Expo Go** app from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or the [Apple App Store](https://apps.apple.com/app/expo-go/id982107779).
2. In the terminal, after running `npm start`, a QR code will appear.
3. Open the **Expo Go** app on your device.
4. Use the camera or the built-in QR scanner in **Expo Go** to scan the QR code displayed in the Expo Developer Tools in your browser.

Your app should now load on your device!

![Expo Start Screen](https://github.com/kubeshot/egg-timer/blob/main/assets/images/QRScreenshot.png)

### 5. Running on an Emulator or Simulator

To run the app on an emulator or simulator, make sure you have:

- **Android Emulator**: Install [Android Studio](https://developer.android.com/studio) and set up an Android Virtual Device (AVD).
- **iOS Simulator**: Install [Xcode](https://developer.apple.com/xcode/) (macOS only) and set up an iOS simulator.

Then, select the desired emulator or simulator from the Expo Developer Tools page, or run one of the following commands:

```bash
# For Android
expo run:android

# For iOS
expo run:ios
```
