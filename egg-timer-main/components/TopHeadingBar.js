import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ title, onClose, logoSource }) {
  return (
    <View style={styles.container}>
      <View style={styles.smallTopBar} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image
            source={require("../assets/images/xcircle1.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        <View style={styles.logoAndTextContainer}>
          <Image source={logoSource} style={styles.logo} />
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingTop: "10%",

    // alignItems: "center",
  },
  smallTopBar: {
    width: "85%",
    height: 10,
    backgroundColor: "#BDBDBD",
    alignSelf: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    width: "100%",
    backgroundColor: "#F2F2F2",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  logoAndTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    // fontWeight: '800',
    fontFamily: "Inter-Bold",
    marginLeft: 8,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 20,
    zIndex: 1,
  },
});
