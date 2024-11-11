import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../TopHeadingBar.js";

import { Linking } from "react-native";
import Navbar from "../Navbar.js";



import image11 from "../../assets/images/file021.png";

import WebView from "react-native-webview";

export default function HowTo({ onClose }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState("");

  const handleVideoPress = (videoId) => {
    setCurrentVideoId(videoId); // Directly pass the video ID
    setModalVisible(true);
  };

  const [loading, setLoading] = useState(true);

 return (
    <View style={styles.container}>
      <Header title="How-To's" logoSource={image11} onClose={onClose} />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}

      {/* Conditionally rendering iframe for web and WebView for mobile */}
      {Platform.OS === "web" ? (
        <iframe
          src="https://www.eggs.ca/eggs101"
          style={{ width: "100%", height: "100%" }}
          onLoad={() => setLoading(false)}
        />
      ) : (
        <WebView
          source={{ uri: "https://www.eggs.ca/eggs101" }}
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
  header: {
    marginTop: 20,
    marginBottom: 50,
  },
  headerTitle: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Inter-Bold",
  },
  headerSubtitle: {
    fontSize: 20,
    // fontWeight: "400",
    textAlign: "center",
    fontFamily: "Inter-Regular",
  },
  seriesSection: {
    backgroundColor: "#FFFBE6", // Light yellow background
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  seriesTitle: {
    fontSize: 25,
    // fontWeight: "bold",
    fontFamily: "Inter-SemiBold",

    textAlign: "center",
    marginBottom: 10,
  },
  seriesImage: {
    width: "100%",
    height: 250,
    // marginBottom: 20,
    borderTopLeftRadius: 10, // Apply border radius to the top-left corner
    borderTopRightRadius: 10, // Apply border radius to the top-right corner
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
  articleTitle: {
    fontSize: 23,
    // fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
    marginTop: 20,
    marginBottom: 10,
    left: 0,
  },
  getAppContainer: {
    backgroundColor: "#FFD700",
  },
  topArticleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 8,
  },
  articleSubtitle: {
    fontSize: 18,
    fontFamily: "Inter-Regular",
    marginBottom: 20,
  },
  topArticleSubtitle: {
    fontSize: 17,
    marginBottom: 20,
    marginLeft: 8,
  },
  articleImage: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 10, // Apply border radius to the top-left corner
    borderTopRightRadius: 10, // Apply border radius to the top-right corner
    justifyContent: "center",
    alignItems: "center",
  },
  articleImageBorder: {
    borderTopLeftRadius: 10, // Apply border radius to the top-left corner
    borderTopRightRadius: 10, // Apply border radius to the top-right corner
  },
  videoIcon: {
    width: 50,
    height: 50,
    opacity: 0.8,
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
    height: 250,
    borderTopLeftRadius: 10, // Apply border radius to the top-left corner
    borderTopRightRadius: 10, // Apply border radius to the top-right corner
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
    alignItems: "center",
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
    // fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
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
  moreEggsButton: {
    backgroundColor: "#FFD700",
    width: 200,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  moreEggsText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  topArticles: {
    // backgroundColor:'#CFECF7',
    marginTop: 40,
    marginBottom: 30,
  },
  topArticlesTitle: {
    fontSize: 35,
    // fontWeight: "bold",
    fontFamily: "Inter-Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  articleContent: {
    marginTop: 10,
  },
});
