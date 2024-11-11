import React, { useState, useRef, useEffect } from "react";
import { Video, ResizeMode } from "expo-av";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";

const VideoModal = ({ isVisible, videoUri, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const youtubePlayerRef = useRef(null);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowCloseButton(false);
      const timer = setTimeout(() => {
        setShowCloseButton(true);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleReady = () => {
    setLoading(false);
  };

  const { width, height } = Dimensions.get("window");

  const modalWidth = width;
  const modalHeight = height - 250;

  const isYouTubeUrl =
    videoUri.includes("youtube.com") ||
    videoUri.includes("youtu.be") ||
    videoUri.includes("shorts");

  const videoId = extractVideoId(videoUri);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={[styles.container, { width: modalWidth, height: modalHeight }]}>
        {showCloseButton && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="closecircle" size={24} color="white" />
          </TouchableOpacity>
        )}

        {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : isYouTubeUrl && videoId ? (
          <View style={styles.youtubeContainer}>
            <YoutubePlayer
              ref={youtubePlayerRef}
              height={height - 250} // Increase height by 10%
              width={width}
              videoId={videoId}
              play={true}
              onReady={handleReady}
              onError={(e) => {
                console.error("YouTube Error:", e);
                setError("Failed to load video. Please try again later.");
                setLoading(false);
              }}
              webViewProps={{
                injectedJavaScript: `
                  var element = document.getElementsByClassName('container')[0];
                  element.style.position = 'unset';
                  element.style.paddingBottom = 'unset';
                  true;
                `,
              }}
            />
          </View>
        ) : (
          <Video
            ref={video}
            style={styles.video}
            source={{ uri: videoUri }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        )}
      </View>
    </Modal>
  );
};

const extractVideoId = (url) => {
  const videoIdRegex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|shorts\/)([^"&?/\s]{11})/;
  const matches = url.match(videoIdRegex);
  return matches ? matches[1] : null;
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 3, // Increase zIndex to ensure it's on top
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent background
    borderRadius: 12, // Make it circular
    padding: 5,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 1,
  },
  container: {
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 15,
    overflow: "hidden",
  },
  youtubeContainer: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
});

export default VideoModal;
