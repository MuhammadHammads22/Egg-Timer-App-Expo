import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../TopHeadingBar.js";
import Navbar from "../Navbar.js";
import Footer from "../footer.js";

import { WebView } from "react-native-webview";

const image1 = require("../../assets/images/file02.png");


export default function RecipeScreen({ onClose }) {
  const [selectedTab, setSelectedTab] = useState("Breakfast");
  const [searchQuery, setSearchQuery] = useState("");

  const handleMenuPress = () => {
    // Handle menu button press
  };

  const handleSearchPress = (text) => {
    setSearchQuery(text);
  };

  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <Header title="Recipes" logoSource={image1} onClose={onClose} />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}

      {/* Conditionally rendering iframe for web and WebView for mobile */}
      {Platform.OS === "web" ? (
        <iframe
          src="https://www.eggs.ca/recipes/"
          style={{ width: "100%", height: "100%" }}
          onLoad={() => setLoading(false)}
        />
      ) : (
        <WebView
          source={{ uri: "https://www.eggs.ca/recipes/" }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    // padding: 16,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
  title: {
    fontSize: 40,
    // fontWeight: "800",
    fontFamily: "Inter-Bold",
    textAlign: "center",
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Inter-Regular",
    marginBottom: 16,
    color: "#555",
  },
  searchBar: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 30,
    backgroundColor: "#F8F8F8",
    color: "#333",
    fontSize: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: "#FFD700",
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#555",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  recipeList: {
    paddingTop: 16,
  },
  recipeCard: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  recipeImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  recipeName: {
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
  },
  seriesSection: {
    backgroundColor: "#D4F1F4", // Light yellow background
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  seriesTitle: {
    fontSize: 25,
    // fontWeight: "bold",
    fontFamily: "Inter-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  seriesImageContainer: {
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 10, // Apply border radius to the container
    overflow: "hidden", // Ensure image respects container bounds
  },
  seriesImage: {
    width: "100%", // Adjust width to 100% to fit within container bounds
    height: 200, // Set height to ensure consistent aspect ratio
    resizeMode: "cover", // Ensure the image covers the container fully
  },
  articleTitle: {
    fontSize: 24,
    // fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
    marginBottom: 10,
  },
  articleSubtitle: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 0,
    marginBottom: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },

  halloweenTitle: {
    fontSize: 30,
    // fontWeight: "bold",
    fontFamily: "Inter-Bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  halloweenContent: {
    position: "relative",
    justifyContent: "center",
  },
  halloweenImage: {
    width: "100%",
    height: 220,
    borderTopLeftRadius: 10, // Apply border radius to the top-left corner
    borderTopRightRadius: 10, // Apply border radius to the top-right corner
    resizeMode: "cover",
  },
  kidApprovedBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FF4B4B",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  kidApprovedText: {
    color: "#fff",
    fontWeight: "bold",
  },
  halloweenDescription: {
    marginTop: 10,
    // alignItems: "center",
    left: 2,
  },
  halloweenSubtitle: {
    fontSize: 25,
    // fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
    marginBottom: 8,
  },
  halloweenDetails: {
    fontSize: 18,
    marginBottom: 15,
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
  learnMoreButton: {
    backgroundColor: "#000",
    width: 150,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  learnMoreText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  getAppContainer: {
    backgroundColor: "#FFD700",
  },
  getAppSubtitle: {
    fontSize: 26,
    // fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
    marginBottom: 10,
  },
  downloadButton: {
    backgroundColor: "#000",
    width: 150,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  chefsCornerTitle: {
    fontSize: 35,
    // fontWeight: "500",
    fontFamily: "Inter-Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  chefsCornerSubtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    fontFamily: "Inter-Regular",
    marginBottom: 16,
  },
  chefsCornerImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  chefsRecipeTitle: {
    fontSize: 24,
    // fontWeight: "900",
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
    marginBottom: 8,
  },
  chefsRecipeDescription: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    fontFamily: "Inter-Regular",
    marginBottom: 16,
  },
  appetizerSection: {
    backgroundColor: "white",
  },
  categorySection: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 28,
    // fontWeight: "bold",
    fontFamily: "Inter-Bold",
    textAlign: "center",
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "47%",
    marginBottom: 16,
  },
  categoryImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
  },
  moreEggsButton: {
    backgroundColor: "#FFD700",
    width: 220,
    borderRadius: 5,
    marginTop: 30,
    paddingVertical: 10,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  moreEggsText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  searchBarWithIcon: {
    flex: 1,
    color: "#333",
    fontSize: 16,
    marginLeft: 10, // Space between icon and text
  },
});
