import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  AppState,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import BottomBar from "./BottomBar";
import { Audio } from "expo-av";
import * as Notifications from 'expo-notifications';
import i18n from '../i18nConfig';

const { width, height } = Dimensions.get("window");

const AnimatedPath = Animated.createAnimatedComponent(Path);

const createDashedCirclePath = (cx, cy, r, dashCount) => {
  const paths = [];
  for (let i = 0; i < dashCount; i++) {
    const angle = (i / dashCount) * Math.PI * 2 + Math.PI * 1.5;
    const startX = cx + Math.cos(angle) * r;
    const startY = cy + Math.sin(angle) * r;
    const endAngle = ((i + 0.5) / dashCount) * Math.PI * 2 + Math.PI * 1.5;
    const endX = cx + Math.cos(endAngle) * r;
    const endY = cy + Math.sin(endAngle) * r;
    paths.push({
      id: `path-${i}`,
      d: `M${startX},${startY} A${r},${r} 0 0,1 ${endX},${endY}`
    });
  }
  return paths;
};
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Timer = ({ route }) => {
  const navigation = useNavigation();
  const [heading, setHeading] = useState(route.params?.heading || "");
  const [subHeading, setSubHeading] = useState(route.params?.subHeading || "");
  const [timeLeft, setTimeLeft] = useState(route.params?.time || 180);
  const [isPaused, setIsPaused] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const soundRef = useRef(null);
  const [spokeCount, setSpokeCount] = useState(300);
  const spokeAnimations = useRef(
    [...Array(spokeCount)].map(() => new Animated.Value(0))
  ).current;
  const fadeOutAnimation = useRef(new Animated.Value(1)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const circleSize = Math.min(width, height) * 0.9;
  const strokeWidth = 15;
  const radius = (circleSize - strokeWidth) / 2.5;
  const circumference = radius * 2 * Math.PI;

  const [pathsData] = useState(() => 
    createDashedCirclePath(
      circleSize / 2,
      circleSize / 2,
      radius,
      spokeCount
    )
  );


  const appState = useRef(AppState.currentState);
  const endTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const notificationId = useRef(null);
  const lastUpdatedTime = useRef(Date.now());

  const timeLeftRef = useRef(route.params?.time || 180);
  const notificationScheduled = useRef(false);

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

  // useEffect(() => {
  //   setupNotifications();
  //   return () => {
  //     cancelNotification();
  //     if (intervalRef.current) clearInterval(intervalRef.current);
  //     stopSound();
  //   };
  // }, []);

  useEffect(() => {
    setupNotifications();
    return () => {
      cancelNotification();
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopSound();
    };
  }, []);

  useEffect(() => {
    if (route.params) {
      setHeading(route.params.heading || "");
      setSubHeading(route.params.subHeading || "");
      setTimeLeft(route.params.time || 180);
      timeLeftRef.current = route.params.time || 180;
      progress.setValue(0);
      endTimeRef.current = null;
      cancelNotification();
      notificationScheduled.current = false;
      fadeOutAnimation.setValue(1);
    }
  }, [route.params]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
        const now = Date.now();
        const timePassed = (now - lastUpdatedTime.current) / 1000;
        timeLeftRef.current = Math.max(0, timeLeftRef.current - Math.floor(timePassed));
        setTimeLeft(timeLeftRef.current);
  
        const totalTime = route.params.time || 180;
        const elapsedTime = totalTime - timeLeftRef.current;
        const progressValue = elapsedTime / totalTime;
        animateSpokes(progressValue);
  
        if (timeLeftRef.current === 0 && !notificationScheduled.current) {
          cancelNotification();
          triggerNotification();
          notificationScheduled.current = true;
        }
      } else if (nextAppState === "background") {
        // Schedule a notification for the remaining time when the app goes to background
        if (timeLeftRef.current > 0) {
          await scheduleNotification(timeLeftRef.current);
        }
      }
      appState.current = nextAppState;
      lastUpdatedTime.current = Date.now();
    });
  
    return () => {
      subscription.remove();
      cancelNotification();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, route.params.time]);

  useEffect(() => {
    if (!isPaused && timeLeftRef.current > 0) {
      startTimer();
      // if (!notificationScheduled.current) {
      //   scheduleNotification(timeLeftRef.current);
      // }
    } else if (isPaused) {
      // Cancel the notification when paused
      cancelNotification();
    } else if (timeLeftRef.current === 0) {
      playCompletionSound();
      startFadeOutAnimation();
      cancelNotification();
      notificationScheduled.current = false;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timeLeftRef.current, isPaused]);


  const scheduleNotification = async (seconds) => {
    if (seconds > 0 && !isPaused && !notificationScheduled.current) {
      await cancelNotification();
      const currentTime = Date.now();
      const triggerDate = new Date(currentTime + (seconds + 1) * 1000);
      notificationId.current = await Notifications.scheduleNotificationAsync({
        content: {
          title: i18n.t('Timer Alert'),
          body: getTitle(),
          
          sound: 'clucking.wav',
          data: { useCustomSound: true },
        },
        trigger: {
          date: triggerDate,
        },
      });
      notificationScheduled.current = true;
      console.log("Notification scheduled for", triggerDate);
      console.log("current time : ", new Date(currentTime));
      console.log("Notification ID: ", notificationId.current);
    }
  };
  const cancelNotification = async () => {
    if (notificationId.current) {
      await Notifications.cancelScheduledNotificationAsync(notificationId.current);
      notificationId.current = null;
      notificationScheduled.current = false;
      console.log("Notification cancelled");
    }
  };

  const triggerNotification = async () => {
    try {
      console.log("Triggering notification because timer reached zero.");

      await Notifications.scheduleNotificationAsync({
        content: {
          title: i18n.t('Timer Alert'),
          body: getTitle(),
          sound: 'clucking.wav',
          data: { useCustomSound: true },
        },
        trigger: null,
      });


    } catch (error) {
      console.error("Error triggering notification: ", error);
    }
  };

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      updateTimer();
    }, 1000);
  };

  const updateTimer = () => {
    console.log("update timer called", timeLeftRef.current)
    if (!isPaused && timeLeftRef.current > 0) {
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);

      const totalTime = route.params.time || 180;
      const elapsedTime = totalTime - timeLeftRef.current;
      const progress = elapsedTime / totalTime;
      animateSpokes(progress);

      if (timeLeftRef.current === 0) {
        cancelNotification();

        // console.log('triggered')
        triggerNotification();
        if (intervalRef.current) clearInterval(intervalRef.current);
        startFadeOutAnimation();
        playCompletionSound();
        animateSpokes(1);
      }
    }
  };



  const animateSpokes = (progress) => {
    const fadedSpokes = Math.floor(progress * spokeCount);

    spokeAnimations.forEach((anim, index) => {
        const adjustedIndex = (spokeCount - index) % spokeCount;
        Animated.timing(anim, {
            toValue: adjustedIndex < fadedSpokes || progress === 1 ? 1 : 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: Platform.OS === 'ios',  // Avoid using native driver on both platforms
        }).start();
    });
};
  const startFadeOutAnimation = () => {
    Animated.timing(fadeOutAnimation, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  const playCompletionSound = async () => {
    if (soundOn) {
      try {
        if (!soundRef.current) {
          console.log("Loading sound...");
          const { sound } = await Audio.Sound.createAsync(
            require("../assets/clucking.wav"),
            { shouldPlay: false }
          );
          soundRef.current = sound;
        }

        const status = await soundRef.current.getStatusAsync();
        if (!status.isPlaying) {
          console.log("Playing sound...");
          await soundRef.current.playAsync();
        } else {
          console.log("Sound is already playing, not starting again");
        }
      } catch (error) {
        console.log("Error playing sound:", error);
      }
    } else {
      console.log("Sound is off or timer hasn't completed");
      await stopSound();
    }
  };




  const stopSound = async () => {
    if (soundRef.current) {
      try {
        console.log("Pausing sound...");
        await soundRef.current.pauseAsync(); // Pause sound first
        console.log("Stopping sound...");
        await soundRef.current.stopAsync(); // Stop the sound
        console.log("Unloading sound...");
        await soundRef.current.unloadAsync(); // Unload the sound
        console.log("Sound stopped and unloaded successfully");
      } catch (error) {
        console.error("Error stopping sound:", error);
      } finally {
        soundRef.current = null; // Reset sound reference
      }
    } else {
      console.log("No sound to stop (soundRef is null)");
    }
  };




  const stopTimer = async () => {
    try {
      setTimeLeft(0);
      timeLeftRef.current = 0;
      setIsPaused(true);
      await cancelNotification();
      if (intervalRef.current) clearInterval(intervalRef.current);
      await stopSound();
      if (heading === "Custom Timer") {
        navigation.navigate("CustomSuccess", { title: getTitle(), heading });
      } else {
        navigation.navigate("Success", { title: getTitle(), heading });
      }
    } catch (error) {
      console.error("Error stopping timer:", error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getTitle = () => {
    console.log("Headinggggggg",heading);
    if (heading === i18n.t('Hard Boiled Eggs')) {
      return i18n.t('Your hard boiled eggs are done!');
    } else if (heading === i18n.t('Soft Boiled Eggs')) {
      return i18n.t('Your soft boiled eggs are done!');
    } else if (heading === i18n.t('Poached Eggs')) {
      return i18n.t('Your Poached Eggs are done!');
    } else {
      return i18n.t('Your custom timer is done!');
    }
  };
  const renderTimerCircle = () => (
    <Svg width={circleSize} height={circleSize}>
      {pathsData.map((path, index) => (
        <Path
          key={path.id}
          d={path.d}
          stroke={spokeAnimations[index].__getValue() ? "rgb(224, 224, 224)" : "rgb(0, 0, 0)"}
          strokeWidth={strokeWidth}
          fill="none"
        />
      ))}
    </Svg>
);
  const interpolateColor = (animation) => {
    return animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(0, 0, 0)", "rgb(224, 224, 224)"],
    });
  };

  return (
    <View style={styles.overlayContainer}>
      <ImageBackground
        source={require("../assets/images/hardboiledbackground-1.png")}
        style={styles.imageBackground}
      >
        <View style={styles.opacityLayer} />
      </ImageBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Image source={require("../assets/images/btnback-arrow.png")} />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Image source={require("../assets/images/Logo.png")} />
            </View>
            <View style={styles.placeholder} />
          </View>
          <View style={styles.content}>
            <Text style={styles.heading}>{heading}</Text>
            {subHeading !== "" && (
              <View style={styles.instructionsButton}>
                <Text style={styles.instructionsText}>{subHeading}</Text>
              </View>
            )}
            <View
              style={[
                styles.timerContainer,
                
              ]}
            >
            {renderTimerCircle()}

              <View style={styles.timerInnerCircle}>
                <Text style={styles.timerText}>
                  {timeLeft !== 0 ? formatTime(timeLeft) : i18n.t('Done!')}
                </Text>
                <TouchableOpacity
                  onPress={async () => {
                    if (soundOn) {
                      await stopSound(); // Stop sound if it's currently on
                    } else {
                      if (soundRef.current) {
                        await soundRef.current.playAsync(); // Play sound if it's off
                      }
                    }
                    setSoundOn(!soundOn); // Toggle the sound state
                  }}
                  style={styles.soundButton}
                >
                  <Image
                    source={
                      soundOn
                        ? require("../assets/images/group-175.png")  // Sound is on
                        : require("../assets/images/group-1752.png")  // Sound is off
                    }
                  />
                </TouchableOpacity>


              </View>
            </View>
            <View style={styles.buttonContainer}>
              {timeLeft !== 0 ? (
                <>
                  <TouchableOpacity
                    style={styles.cancelTimerButton}
                    onPress={() => {
                      // Set the canceled flag to true
                      setTimeLeft(route.params.time);
                      timeLeftRef.current = route.params.time;
                      setIsPaused(true);
                      progress.setValue(0);
                      endTimeRef.current = null;
                      cancelNotification();
                      animateSpokes(0);
                      fadeOutAnimation.setValue(1);
                      if (intervalRef.current) clearInterval(intervalRef.current);
                    }}
                  >
                    <Text style={[styles.buttonText, { color: "black" }]}>
                      {i18n.t('Cancel')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.pauseTimerButton}
                    onPress={() => {
                      setIsPaused(!isPaused);
                      if (isPaused) {
                        endTimeRef.current = Date.now() + timeLeft * 1000;
                        startTimer();
                        // if (!notificationScheduled.current) {
                        //   scheduleNotification(timeLeft);
                        // }
                      } else {
                        if (intervalRef.current) clearInterval(intervalRef.current);
                      }
                    }}
                  >
                    <Text style={[styles.buttonText, { color: "white" }]}>
                      {isPaused ? i18n.t('Resume Timer') : i18n.t('Pause Timer')}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.pauseTimerButton}
                  onPress={stopTimer}
                >
                  <Text style={[styles.buttonText, { color: "white" }]}>
                    {i18n.t('Stop Timer')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
      <BottomBar />
    </View>
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
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  backButton: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 8,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  placeholder: {
    width: 50,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  heading: {
    fontSize: 32,
    fontFamily: "Kaleko-Bold",
    textAlign: "center",
    marginTop: 48,
  },
  instructionsButton: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  instructionsText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  timerInnerCircle: {
    position: "absolute",
    width: "90%",
    height: "90%",
    borderRadius: 1000,
    backgroundColor: "transparent", // Change this to transparent
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 90,
    fontFamily: "Kaleko-Bold",
    // color: "#DADADA",
  },
  soundButton: {
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  cancelTimerButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 100,
    backgroundColor: "#F2F2F6",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  pauseTimerButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 100,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Timer;