import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // This function would be replaced with your actual search logic
  const performSearch = (query) => {
    // Placeholder: replace this with actual search logic
    const mockResults = [
      { id: "1", title: "Home", screen: "Home" },
      { id: "2", title: "Hard Boiled Eggs", screen: "HardBoiled" },
      { id: "3", title: "Soft Boiled Eggs", screen: "SoftBoiled" },
      { id: "4", title: "Poached Eggs", screen: "PoachedEggs" },
      { id: "5", title: "How To's", screen: "HowTo" },
      { id: "6", title: "Recipe", screen: "Recipe" },
      { id: "8", title: "Newsletter Signup", screen: "SignUp" },
    ].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

    setSearchResults(mockResults);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Pages..."
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          performSearch(text);
        }}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
            <Text style={styles.resultItem}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  resultItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default SearchScreen;
