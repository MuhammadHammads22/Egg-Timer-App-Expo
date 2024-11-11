import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomBar from "./BottomBar";
import { useNavigation } from "@react-navigation/native";
import VideoModal from "./VideoModal";
import { Linking } from "react-native";
import i18n from '../i18nConfig';

const Home = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState("");

  const handleVideoPress = (videoId) => {
    setCurrentVideoId(videoId);
    setModalVisible(true);
  };
  const handleLinkPress = (Uri) => {
    Linking.openURL(Uri);
  };

  const hardBoiledImage = require("../assets/images/btn--hard-boiled.png");
  const softBoiledImage = require("../assets/images/btn--hard-boiled1.png");
  const poachedEggImage = require("../assets/images/btn--hard-boiled2.png");
  const customTimerImage = require("../assets/images/BTN - Hard Boiled.png");

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.container}>
            <Image source={require("../assets/images/Logo.png")} />

            <View style={styles.eggStyleContainer}>
              <Text style={styles.heading}>{i18n.t('letsGetCracking')}</Text>
              <Text style={styles.subHeading}>{i18n.t('chooseEggStyle')}</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("HardBoiled");
                  }}
                  style={styles.eggStyleButton}
                >
                  <Image source={hardBoiledImage} />
                  <Text style={styles.eggStyleButtonText}>{i18n.t('hardBoiled')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SoftBoiled");
                  }}
                  style={styles.eggStyleButton}
                >
                  <Image source={softBoiledImage} />
                  <Text style={styles.eggStyleButtonText}>{i18n.t('softBoiled')}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PoachedEggs");
                  }}
                  style={styles.eggStyleButton}
                >
                  <Image source={poachedEggImage} />
                  <Text style={styles.eggStyleButtonText}>{i18n.t('poached')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CustomTimer");
                  }}
                  style={styles.eggStyleButton}
                >
                  <Image source={customTimerImage} />
                  <Text style={styles.eggStyleButtonText}>{i18n.t('customTimer')}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.videoContainer}>
              <Text style={styles.heading}>{i18n.t('eggceptionalVideos')}</Text>
              <Text style={styles.subHeading}>{i18n.t('watchVideoInstructions')}</Text>

              <TouchableOpacity
                style={styles.videoButton}
                onPress={() =>
                  handleVideoPress("https://www.youtube.com/shorts/DPt0CX7zwFA")
                }
              >
                <Image source={require("../assets/images/btnhardboiled.png")} />
                <View style={styles.videoTextContainer}>
                  <Image source={require("../assets/images/frame-143.png")} />
                  <Text style={styles.videoContainerText}>
                    {i18n.t('howToHardBoilEggs')}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.videoButton}
                onPress={() =>
                  handleVideoPress("https://www.youtube.com/shorts/JHcwHcRCxrk")
                }
              >
                <Image source={require("../assets/images/btn--hard-boiled4.png")} />
                <View style={styles.videoTextContainer}>
                  <Image source={require("../assets/images/frame-143.png")} />
                  <Text style={styles.videoContainerText}>
                    {i18n.t('howToSoftBoilEggs')}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.videoButton}
                onPress={() =>
                  handleVideoPress("https://www.youtube.com/shorts/I-PDJ-uBQwE")
                }
              >
                <Image source={require("../assets/images/btnhardboiled2.png")} />
                <View style={styles.videoTextContainer}>
                  <Image source={require("../assets/images/frame-143.png")} />
                  <Text style={styles.videoContainerText}>
                    {i18n.t('howToPoachEggs')}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.moreVideosButton}
                onPress={() =>
                  handleLinkPress(
                    "https://www.youtube.com/channel/UCq6p--GVSjdVKp_B4zQbqgQ"
                  )
                }
              >
                <Text style={styles.videoContainerText}>
                  {i18n.t('moreHowToVideos')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomBar />
      <VideoModal
        isVisible={modalVisible}
        videoUri={currentVideoId}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f2", // Apply background color to safe area
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  container: {
    flex: 1,
    marginTop: "5%",
    alignItems: "center",
    paddingTop: 25,
  },

  eggStyleContainer: {
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 24,
    gap: 16,
  },

  heading: {
    fontSize: 24,
    fontFamily: "Kaleko-Bold",
  },

  subHeading: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Inter-Regular",
  },

  eggStyleButton: {
    alignItems: "center",
    gap: 8,
  },
  eggStyleButtonText: {
    fontSize: 14,
    fontFamily: "Kaleko-Bold",
  },

  row: {
    flexDirection: "row",
    gap: 16,
  },

  videoContainer: {
    marginTop: 36,
    alignItems: "center",
    width: "100%",
  },
  videoButton: {
    flexDirection: "row",
    // alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 24,
    width: "100%",
  },
  videoTextContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 8,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  videoContainerText: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
  moreVideosButton: {
    width: "95%",
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#FFCD32",
    marginBottom: 130,
    alignItems: "center",
  },
});

export default Home;
