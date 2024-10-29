import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "./BottomBar";
import { WebView } from "react-native-webview";

const CustomSuccessPage = ({ route }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState(route.params.title || "");
  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (route.params && route.params.title) {
      setTitle(route.params.title);
    }
  }, [route.params]);

  const handleBackPress = () => {
    if (showWebView) {
      setShowWebView(false); // Close WebView when back is pressed
    } else {
      navigation.navigate("Home");
    }
  };

  const openRecipeUrl = () => {
    setShowWebView(true); // Show WebView instead of opening in browser
  };

  return (
    <SafeAreaView style={styles.container}>
      {showWebView ? (
        <View style={styles.container}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000000" />
            </View>
          )}
          {Platform.OS === "web" ? (
            <iframe
              src="https://eggs.ca/"
              style={{ width: "100%", height: "100%" }}
              onLoad={() => setLoading(false)}
            />
          ) : (
            <WebView
              source={{ uri: "https://eggs.ca/" }}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
            />
          )}
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Image
                source={require("../assets/images/Logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.successCard}>
              <Text style={styles.successText}>{title}</Text>
              <Image
                source={require("../assets/images/rectangle-299.png")}
                style={styles.mainImage}
              />
            </View>

            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>
                Explore eggs.ca for even more eggceptional recipes!
              </Text>
            </View>

            <TouchableOpacity style={styles.moreEggsButton} onPress={openRecipeUrl}>
              <Text style={styles.moreEggsText}>Visit eggs.ca</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Image
          source={require("../assets/images/btnback-arrow.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <BottomBar />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10, // Add some top margin
  },
  logo: {
    width: 140, // Reduced from 210
    height: 50, // Reduced from 70
  },
  successCard: {
    backgroundColor: "#FFD700",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    // fontWeight: "bold",
    fontFamily: "Kaleko-Bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  mainImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  sectionTitleContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Kaleko-Bold",
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 28,
    marginBottom: 20,
  },
  recipeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  recipeItem: {
    width: "48%",
    marginBottom: 20,
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  recipeTitle: {
    fontSize: 16,
    fontFamily:'Kaleko-Bold',
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 80,
    left: 30,
    zIndex: 1,
  },
  backIcon: {
    width: 40,
    height: 40,
  },
  moreEggsButton: {
    backgroundColor: "#FFD700",
    width: 250,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  moreEggsText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomSuccessPage;