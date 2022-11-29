// import { RegistrationScreen } from "./screens/auth/RegistrationScreen";
// import { LoginScreen } from "./screens/auth/LoginScreen";
// import { PostsScreen } from "./screens/mainScreen/PostsScreen";
// import { ProfileScreen } from "./screens/mainScreen/ProfileScreen";
// import { CreateScreen } from "./screens/mainScreen/CreateScreen";
// import { CommentsScreen } from "./screens/mainScreen/CommentsScreen";

import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React, { useEffect, useCallback, useState } from "react";
import { useRoute } from "./router";
import {} from "react-native";

///////////SplashScreen
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

//  AppLoading
// import AppLoading from "expo-app-loading";
// import * as Font from "expo-font";
// const loadApplication = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//     "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
//     "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
//   });
// };
// const [isReady, setIsReady] = useState(false);

// if (!isReady) {
//   return (
//     <AppLoading
//       startAsync={loadApplication}
//       onFinish={() => setIsReady(true)}
//       onError={console.warn}
//     />
//   );
// }

export default function App() {
  const routing = useRoute(true);

  ///////////SplashScreen
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //   prepare();
  // }, []);

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      {routing}
    </NavigationContainer>
  );
}
