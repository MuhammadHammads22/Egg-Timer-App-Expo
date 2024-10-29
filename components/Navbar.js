import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/images/logoeggsen.png";

export default function Navbar() {
  const navigation = useNavigation();

  const onMenuPress = () => {
    // Implement menu functionality
  };

  const onSearchPress = () => {
    navigation.navigate("Search");
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>

      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <TouchableOpacity onPress={onSearchPress}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    backgroundColor: "#FFD700",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 50,
  },
});
