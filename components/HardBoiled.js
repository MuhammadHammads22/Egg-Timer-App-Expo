import React, { useState } from "react";
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

const HardBoiled = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState("L");
  const [showSizeSelection, setShowSizeSelection] = useState(false);
  const [timer, setTimer] = useState(12);

  const steps = i18n.t('Hard Boiled Steps', { returnObjects: true });

  return (
    <>
      <ImageBackground
        source={require("../assets/images/hardboiledbackground-11.png")}
        style={styles.imageBackground}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={styles.backButton}
              >
                <Image source={require("../assets/images/btnback-arrow.png")} />
              </TouchableOpacity>
              <View style={styles.logoContainer}>
                <Image source={require("../assets/images/Logo.png")} />
              </View>
              <View style={styles.placeholder} />
            </View>

            <View style={styles.innerContainer}>
              <View style={styles.uppperButtonsContainer}>
                <Text style={styles.heading}>{i18n.t('Hard Boiled Eggs')}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.instructionsButton}
                    onPress={() => {
                      setModalVisible(true);
                    }}
                  >
                    <Text style={styles.instructionsText}>{i18n.t('Instructions')}</Text>
                  </TouchableOpacity>
                  <View style={styles.sizeContainer}>
                    <Text style={styles.sizeLabel}>{i18n.t('Size')}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setShowSizeSelection((prev) => !prev);
                      }}
                      style={styles.sizeButton}
                    >
                      <Text style={styles.sizeText}>{selectedSize}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {showSizeSelection && (
                  <View style={styles.sizeSelectionButonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.sizeSelectorButton,
                        {
                          backgroundColor:
                            selectedSize === "M" ? "#FFCD32" : "white",
                        },
                      ]}
                      onPress={() => {
                        setSelectedSize("M");
                        setTimer(10);
                        setShowSizeSelection(false);
                      }}
                    >
                      <Text style={styles.sizeSelectorButonText}>M</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.sizeSelectorButton,
                        {
                          backgroundColor:
                            selectedSize === "L" ? "#FFCD32" : "white",
                        },
                      ]}
                      onPress={() => {
                        setSelectedSize("L");
                        setTimer(12);
                        setShowSizeSelection(false);
                      }}
                    >
                      <Text style={styles.sizeSelectorButonText}>L</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.sizeSelectorButton,
                        {
                          backgroundColor:
                            selectedSize === "XL" ? "#FFCD32" : "white",
                        },
                      ]}
                      onPress={() => {
                        setSelectedSize("XL");
                        setTimer(14);
                        setShowSizeSelection(false);
                      }}
                    >
                      <Text style={styles.sizeSelectorButonText}>XL</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Timer", {
                    heading: i18n.t('Hard Boiled Eggs'),
                    time: timer * 60,
                    subheading: "",
                  });
                }}
                style={styles.startTimerButton}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Image
                    source={require("../assets/images/basic--clock.png")}
                  />
                  <Text style={styles.startTimerButtonText}>{i18n.t('Start Timer')}</Text>
                </View>
                <Text style={styles.startTimerButtonText}>{timer}:00</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Image source={require("../assets/images/xcircle.png")} />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.modalTitle}>{i18n.t('Steps')}</Text>

            <ScrollView contentContainerStyle={styles.modalStepsContainer}>
              {steps.map((step, index) => (
                <View style={styles.modalStepItem} key={index}>
                  <View style={styles.modalStepNumber}>
                    <Text style={styles.modalStepNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.modalStepTextContainer}>
                    <Text style={styles.modalStepText}>
                      {step}
                      {index === 2 && (
                        <Text
                          style={[
                            styles.modalStepText,
                            { fontFamily: "Inter-Bold" },
                          ]}
                        >
                          {timer} {i18n.t('minutes')}
                        </Text>
                      )}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <BottomBar />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "#f2f2f2", // Apply background color to safe area
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
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
    // padding: 8,
    borderRadius: 50,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  placeholder: {
    width: 50, // Same width as the back button to keep the balance
  },

  heading: {
    fontSize: 32,
    fontFamily: "Kaleko-Bold",
    textAlign: "center",
    marginTop: 48,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "semibold",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginTop: 16,
  },
  instructionsButton: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  instructionsText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  sizeSelectorButton: {
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },

  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 30,
    gap: 8,
  },
  sizeLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sizeButton: {
    backgroundColor: "white",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  innerContainer: {
    justifyContent: "space-between",
    flex: 1,
    marginBottom: "25%",
  },

  uppperButtonsContainer: {},

  sizeSelectionButonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 10,
    marginRight: 16,
  },
  sizeSelectorButonText: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
  },

  startTimerButton: {
    marginHorizontal: 16,
    borderRadius: 100,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 8,
  },
  startTimerButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#F2F2F6",
    borderRadius: 10,
    padding: 24,
    elevation: 10,
  },
  modalCloseButton: {
    alignSelf: "flex-end",
  },

  modalTitle: {
    fontSize: 32,
    fontFamily: "Kaleko-Bold",
    textAlign: "center",
    marginBottom: 24,
  },
  modalStepsContainer: {
    paddingBottom: 56,
  },
  modalStepItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  modalStepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFCD32",
    justifyContent: "center",
    alignItems: "center",
    // marginRight: 10,
  },
  modalStepNumberText: {
    color: "black",
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
  modalStepTextContainer: {
    flex: 0.9, // 70% of the width
  },
  modalStepText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
});

export default HardBoiled;
