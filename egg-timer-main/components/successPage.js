import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
  ActivityIndicator,
} from "react-native";
import Header from "./TopHeadingBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "./BottomBar";
import i18n from '../i18nConfig';
import { WebView } from 'react-native-webview';

const SuccessPage = ({ route }) => {
  const navigation = useNavigation();
  const { title, heading } = route.params;
  const [pageTitle, setPageTitle] = useState(title || "");
  const [loading, setLoading] = useState(true);
  const [webUrl, setWebUrl] = useState(null);  // New state to manage WebView URL

  useEffect(() => {
    if (route.params && route.params.title) {
      setPageTitle(route.params.title);
    }
  }, [route.params]);

  // Define recipe ideas based on the eggType parameter
  const recipeIdeas = {
    "Soft Boiled Eggs": [
      {
        title: "Perfect Soft Boiled Eggs with Toast Soldiers",
        image: require("../assets/images/EFC-app-soft-boiled-eggs-soft-boiled-eggs-toast-soldiers.jpg"),
        url: "https://www.eggs.ca/recipes/perfect-soft-boiled-eggs-with-toast-soldiers",
      },
      {
        title: "Ramen Eggs",
        image: require("../assets/images/EFC-app-soft-boiled-healthy-ramen.jpg"),
        url: "https://www.eggs.ca/recipes/ramen-eggs-soy-sauce-marinated-eggs",
      },
      {
        title: "Perfect Soft Boiled Eggs ",
        image: require("../assets/images/EFC-app-soft-boiled-eggs-perfect-soft-boiled-egg.jpg"),
        url: "https://www.eggs.ca/recipes/basic-soft-boiled-eggs",
      },
      {
        title: "Pesto Rice Bowl Topped With Soft Boiled Eggs",
        image: require("../assets/images/EFC-app-soft-boiled-eggs-pesto-rice-bowl.jpg"),
        url: "https://www.eggs.ca/recipes/pesto-rice-bowl-topped-with-soft-boiled-eggs",
      },
      {
        title: "Mushroom Tartlets with Soft Boiled Eggs",
        image: require("../assets/images/EFC-app-soft-boiled-egg-tartlets-with-mushroom.jpg"),
        url: "https://www.eggs.ca/recipes/mushroom-onion-and-soft-boiled-egg-tartlets",
      },
      {
        title: "Autumn Farro Bowl with Soft Boiled Egg",
        image: require("../assets/images/EFC-app-soft-boiled-autumn-farro-bowl.jpg"),
        url: "https://www.eggs.ca/recipes/autumn-farro-bowl-with-soft-boiled-egg",
      },
      {
        title: "Mediterranean Salad Bowl",
        image: require("../assets/images/EFC-app-mediterranean-salad-bowl.jpg"),
        url: "https://www.eggs.ca/recipes/mediterranean-salad-bowl",
      },
      {
        title: "Healthy Ramen Bowls",
        image: require("../assets/images/EFC-app-soft-boiled-healthy-ramen.jpg"),
        url: "https://www.eggs.ca/recipes/healthy-ramen-bowls",
      },
    ],
    "Hard Boiled Eggs": [
      {
        title: "Perfect Hard Boiled Eggs",
        image: require("../assets/images/EFC-app-hard-boiled-perfect-hard-boiled-egg.jpg"),
        url: "https://www.eggs.ca/recipes/basic-hard-boiled-eggs",
      },
      {
        title: "Pink Pickled Eggs",
        image: require("../assets/images/EFC=app-hard-boiled-pink-pickled-eggs.jpg"),
        url: "https://www.eggs.ca/recipes/pink-pickled-eggs",
      },
      {
        title: "Perfect Pickled Eggs",
        image: require("../assets/images/EFC-app-hard-boiled-perfect-pickled-eggs.jpg"),
        url: "https://www.eggs.ca/recipes/pickled-eggs",
      },
      {
        title: "Perfect Devilled Eggs",
        image: require("../assets/images/EFC-app-hard-boiled-perfect-devilled-eggs.jpg"),
        url: "https://www.eggs.ca/recipes/basic-devilled-eggs",
      },
      {
        title: "Niçoise Salad",
        image: require("../assets/images/EFC-app-hard-boiled-nicoise-salad.jpg"),
        url: "https://www.eggs.ca/recipes/nicoise-salad",
      },
      {
        title: "Curried Egg Salad Sandwich on Challah Bread",
        image: require("../assets/images/EFC-app-hard-boiled-curried-egg-salad-sandwich.jpg"),
        url: "https://www.eggs.ca/recipes/curried-egg-salad-sandwich-on-challah-bread",
      },
      {
        title: "Baked Scotch Eggs",
        image: require("../assets/images/EFC-app-hard-boiled-baked-scotch-egg.jpg"),
        url: "https://www.eggs.ca/recipes/baked-scotch-eggs",
      },
      {
        title: "Sunrise Egg Salad Melt",
        image: require("../assets/images/EFC-app-hard-boiled-sunrise-egg-salad-melt.jpg"),
        url: "https://www.eggs.ca/recipes/sunrise-egg-salad-melt",
      },
    ],
    "Poached Eggs": [
      {
        title: "Perfect Poached Eggs",
        image: require("../assets/images/EFC-app-paoched-perfect-poached-eggs.jpg"),
        url: "https://www.eggs.ca/recipes/basic-poached-eggs",
      },
      {
        title: "Baked Beans on Toast with Spinach and Poached Eggs",
        image: require("../assets/images/EFC-app-poached-baked-beans-on-toast.jpg"),
        url: "https://www.eggs.ca/recipes/baked-beans-on-toast-with-spinach-and-poached-eggs",
      },
      {
        title: "Mushroom Spaetzle with Poached Egg",
        image: require("../assets/images/EFC-app-poached-mushroom-spaetzle.jpg"),
        url: "https://www.eggs.ca/recipes/mushroom-spaetzle-with-poached-egg",
      },
      {
        title: "Poached Egg, Asparagus, and Bacon Vinaigrette",
        image: require("../assets/images/EFC-app-poached-poached-egg-asparagus-and-bacon-vinaigrette.jpg"),
        url: "https://www.eggs.ca/recipes/poached-egg-asparagus-and-bacon-vinaigrette",
      },
      {
        title: "Pesto Pizza with Poached Eggs",
        image: require("../assets/images/EFC-app-poached-pesto-pizza.jpg"),
        url: "https://www.eggs.ca/recipes/pesto-pizza-with-poached-eggs",
      },
      {
        title: "Indian Spiced Rice with Poached Eggs",
        image: require("../assets/images/EFC-app-paoched-indian-spiced-rice.jpg"),
        url: "https://www.eggs.ca/recipes/indian-spiced-rice-with-poached-eggs",
      },
      {
        title: "Roasted Mediterranean Veggies with Poached Eggs and Feta",
        image: require("../assets/images/EFC-app-poached-roasted-mediterranean-veggies.jpg"),
        url: "https://www.eggs.ca/recipes/roasted-mediterranean-veggies-with-poached-eggs-and-fetaa",
      },
      {
        title: "BLT Eggs Benedict",
        image: require("../assets/images/EFC-app-poached-BLT-eggs-benedict.jpg"),
        url: "https://www.eggs.ca/recipes/blt-eggs-benedict",
      },
    ],
  };

  const mainImages = {
    "Soft Boiled Eggs": require("../assets/images/EFC-app-soft-boiled-eggs-perfect-soft-boiled-egg.jpg"),
    "Hard Boiled Eggs": require("../assets/images/EFC-app-hard-boiled-perfect-hard-boiled-egg.jpg"),
    "Poached Eggs": require("../assets/images/EFC-app-paoched-perfect-poached-eggs.jpg"),
  };


  const exploreMoreUrls = {
    "Soft Boiled Eggs": {
      en: "https://www.eggs.ca/recipe-category/soft-boiled-eggs/",
      fr: "https://www.lesoeufs.ca/categorie-de-recette/les-oeufs-mollets-parfaits/"
    },
    "Hard Boiled Eggs": {
      en: "https://www.eggs.ca/recipe-category/hard-boiled-eggs/",
      fr: "https://www.lesoeufs.ca/categorie-de-recette/les-oeufs-cuits-durs/"
    },
    "Poached Eggs": {
      en: "https://www.eggs.ca/recipe-category/poached-eggs/",
      fr: "https://www.lesoeufs.ca/categorie-de-recette/oeufs-poches/ "
    },
  };

  const handleExploreMorePress = () => {
    const currentLang = i18n.language;
    const lang = currentLang === 'fr' ? 'fr' : 'en';
    const url = exploreMoreUrls[heading][lang];
    openRecipeUrl(url);
  };

  const handleImagePress = (url) => {
    openRecipeUrl(url);
  };

  const openRecipeUrl = (url) => {
    setWebUrl(url); // Set the URL to show the WebView
  };

  const handleBackPress = () => {
    if (webUrl) {
      setWebUrl(null); // Close WebView when back is pressed
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {webUrl ? (
        <View style={styles.container}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000000" />
            </View>
          )}
          {Platform.OS === "web" ? (
            <iframe
              src={webUrl}
              style={{ width: "100%", height: "100%" }}
              onLoad={() => setLoading(false)}
            />
          ) : (
            <WebView
              source={{ uri: webUrl }}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
            />
          )}
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Image
                source={require("../assets/images/Logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.successCard}>
              <Text style={styles.successText}>{pageTitle}</Text>
              <Image
                source={mainImages[heading] || require("../assets/images/EFC-app-soft-boiled-eggs-perfect-soft-boiled-egg.jpg")}
                style={styles.mainImage}
              />
            </View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>{i18n.t('More Delicious Ideas')}</Text>
            </View>
            <View style={styles.recipeGrid}>
              {(recipeIdeas[heading] || []).map((recipe, index) => (
                <TouchableOpacity key={index} style={styles.recipeItem} onPress={() => handleImagePress(recipe.url)}>
                  <Image source={recipe.image} style={styles.recipeImage} />
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.moreEggsButton} onPress={handleExploreMorePress}>
              <Text style={styles.moreEggsText}>
                {i18n.t('Explore More')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Image
          source={require("../assets/images/btnback-arrow.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  logo: {
    width: 140,
    height: 50,
  },
  successCard: {
    backgroundColor: "#FFD700",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    fontFamily: "Kaleko-Bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  mainImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  sectionTitleContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 25,
    fontFamily: "Kaleko-Bold",
  },
  recipeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  recipeItem: {
    width: "48%",
    marginBottom: 20,
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  recipeTitle: {
    fontSize: 16,
    fontFamily: "Kaleko-Bold",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 80,
    left: 30,
    zIndex: 1,
  },
  backIcon: {
    width: 40,
    height: 40,
  },
  moreEggsButton: {
    backgroundColor: "#FFD700",
    width: 250,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 110,
  },
  moreEggsText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default SuccessPage;