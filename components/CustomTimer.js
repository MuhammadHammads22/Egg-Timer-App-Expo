import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomBar from "./BottomBar";
import { useNavigation } from "@react-navigation/native";
import i18n from '../i18nConfig';

const CustomTimer = () => {
  // console.log(route);
  const navigation = useNavigation();

  const [time, setTime] = useState(180); // Timer starts at 3 minutes (180 seconds)

  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [selectedSeconds, setSelectedSeconds] = useState(0);

  return (
    <>
      {/* Wrapper with opacity overlay */}
      <View style={styles.overlayContainer}>
        <ImageBackground
          source={require("../assets/images/hardboiledbackground-12.png")}
          style={styles.imageBackground}
        >
          {/* Transparent overlay */}
          <View style={styles.opacityLayer} />
        </ImageBackground>

        {/* Main content */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={styles.backButton}
                >
                  <Image
                    source={require("../assets/images/btnback-arrow.png")}
                  />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                  <Image source={require("../assets/images/Logo.png")} />
                </View>
                <View style={styles.placeholder} />
              </View>

              <View style={styles.innerContainer}>
                <View style={styles.uppperButtonsContainer}>
                  <Text style={styles.heading}>{i18n.t('Custom Timer')}</Text>
                </View>
                <View style={styles.labelContainer}>
                  <TouchableOpacity style={styles.label}>
                    <Text style={styles.labelText}>{i18n.t('Minutes')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.label}>
                    <Text style={styles.labelText}>{i18n.t('Seconds')}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.timerContainer}>
                  <View style={styles.timerButtonContainer}>
                    <TouchableOpacity
                      style={styles.timerButton}
                      onPress={() => {
                        if (selectedMinutes > 0) {
                          setSelectedMinutes((prev) => prev - 1);
                        }
                      }}
                    >
                      <Image
                        style={styles.timerButtonImage}
                        source={require("../assets/images/icon.png")}
                      />
                    </TouchableOpacity>

                    <View style={styles.timerValueContainer}>
                      {selectedMinutes < 10 && (
                        <Text style={styles.timerValueLight}>0</Text>
                      )}
                      <Text style={styles.timerValue}>{selectedMinutes}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        if (selectedMinutes < 60) {
                          setSelectedMinutes((prev) => prev + 1);
                        }
                      }}
                      style={styles.timerButton}
                    >
                      <Image
                        style={styles.timerButtonImage}
                        source={require("../assets/images/icon1.png")}
                      />
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text style={styles.semiColon}>:</Text>
                  </View>

                  <View style={styles.timerButtonContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        if (selectedSeconds > 0) {
                          setSelectedSeconds((prev) => prev - 1);
                        }
                      }}
                      style={styles.timerButton}
                    >
                      <Image
                        style={styles.timerButtonImage}
                        source={require("../assets/images/icon.png")}
                      />
                    </TouchableOpacity>

                    <View style={styles.timerValueContainer}>
                      {selectedSeconds < 10 && (
                        <Text style={styles.timerValueLight}>0</Text>
                      )}
                      <Text style={styles.timerValue}>{selectedSeconds}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        if (selectedSeconds < 60) {
                          setSelectedSeconds((prev) => prev + 1);
                        }
                      }}
                      style={styles.timerButton}
                    >
                      <Image
                        style={styles.timerButtonImage}
                        source={require("../assets/images/icon1.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.bottomButtonContainer}>
                  <TouchableOpacity
                    style={styles.cancelTimerButton}
                    onPress={() => {
                      navigation.navigate("Home");
                    }}
                  >
                    <Text style={[styles.bottomButtonText, { color: "black" }]}>
                      {i18n.t('Cancel')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Timer", {
                        heading: i18n.t("Custom Timer"),
                        time: selectedMinutes * 60 + selectedSeconds,
                        subheading: "",
                      });
                    }}
                    style={styles.startTimerButton}
                  >
                    <Text style={[styles.bottomButtonText, { color: "white" }]}>
                      {i18n.t('Start Timer')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>

      <BottomBar />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  overlayContainer: {
    flex: 1,
    position: "relative",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  opacityLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.6)", // Adjust the opacity here
  },
  container: {
    flex: 1,
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
  },
  backButton: {
    backgroundColor: "white",
    borderRadius: 50,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  placeholder: {
    width: 50,
  },
  innerContainer: {
    justifyContent: "space-between",
    flex: 1,
    marginBottom: "30%",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  uppperButtonsContainer: {},

  heading: {
    fontSize: 32,
    fontFamily: "Kaleko-Bold",
    textAlign: "center",
    marginTop: 48,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: "15%",
  },
  label: {
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    marginBottom: 20,
  },
  labelText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },
  timerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
  },
  timerButtonContainer: { alignItems: "center", gap: 20 },
  timerButton: {
    backgroundColor: "#FFCE00",
    borderRadius: 100,
  },
  timerButtonImage: {
    width: 50,
    height: 50,
    resizeMode: "center",
  },

  semiColon: {
    fontSize: 80,
    fontFamily: "Inter-SemiBold",
  },

  timerValueContainer: {
    width: 132,
    height: 144,
    borderWidth: 3,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timerValueLight: {
    fontSize: 80,
    fontFamily: "Inter-Bold",
    color: "#DADADA",
  },
  timerValue: {
    fontSize: 80,
    fontFamily: "Inter-Bold",
  },
  soundButton: {
    marginTop: 16,
  },

  bottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  startTimerButton: {
    flex: 1,
    marginRight: 16,
    marginLeft: 8,
    borderRadius: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  cancelTimerButton: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
    borderRadius: 100,
    backgroundColor: "#F2F2F6",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  bottomButtonText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },
});

export default CustomTimer;

