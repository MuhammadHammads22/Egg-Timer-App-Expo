import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/Home";
import HardBoiled from "../components/HardBoiled";
import SoftBoiled from "../components/SoftBoiled";
import PoachedEggs from "../components/PoachedEggs";
import Timer from "../components/Timer";
import RecipeScreen from "../components/Recipe/recipe";
import HowTo from "../components/How-To's/howTosPage";
import VideoPlayerScreen from "../components/videoPlayerScreen";
import SubscribeScreen from "../components/News Letter Signup/newsLetterSignup";
import SearchScreen from "../components/searchScreenComponent";
import SuccessPage from "../components/successPage";
import CustomTimer from "../components/CustomTimer";
import CustomSuccessPage from "../components/CustomTimerSuccessPage";

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Success"
        component={SuccessPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomSuccess"
        component={CustomSuccessPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HardBoiled"
        component={HardBoiled}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SoftBoiled"
        component={SoftBoiled}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PoachedEggs"
        component={PoachedEggs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Timer"
        component={Timer}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HowTo"
        component={HowTo}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />

      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SubscribeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomTimer"
        component={CustomTimer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
