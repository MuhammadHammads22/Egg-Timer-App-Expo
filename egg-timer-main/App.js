import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import NavigationStack from "./navigation/NavigationStack";
import { StatusBar } from "expo-status-bar";
import * as Localization from "expo-localization";
import { useKeepAwake } from "expo-keep-awake";
import i18n from './i18nConfig';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default function App() {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);

 

  const setupNotifications = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    console.log('Notification permissions granted.');
  };


  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Kaleko-Bold": require("./assets/fonts/Kaleko205Round-Bold.ttf"),
  });

  useKeepAwake();

  useEffect(() => {
    const initializeI18n = () => {
      i18n.locale = Localization.locale.split('-')[0];
      setIsI18nInitialized(true);
    };
    setupNotifications();

    initializeI18n();
  }, []);

  // Add this effect to check for locale changes
  useEffect(() => {
    const checkLocale = setInterval(() => {
      const currentLocale = Localization.locale.split('-')[0];
      if (i18n.locale !== currentLocale) {
        i18n.locale = currentLocale;
        // Force a re-render of the app
        setIsI18nInitialized(false);
        setTimeout(() => setIsI18nInitialized(true), 0);
      }
    }, 1000); // Check every second

    return () => clearInterval(checkLocale);
  }, []);

  if (!fontsLoaded || !isI18nInitialized) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <NavigationStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});