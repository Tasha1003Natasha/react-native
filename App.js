import { RegistrationScreen } from "./screens/auth/RegistrationScreen";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { PostsScreen } from "./screens/mainScreen/PostsScreen";
import { ProfileScreen } from "./screens/mainScreen/ProfileScreen";
import { CreateScreen } from "./screens/mainScreen/CreateScreen";
import { CommentsScreen } from "./screens/mainScreen/CommentsScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useCallback } from "react";
// import { View } from "react-native";

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const [fontsLoaded] = useFonts({
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
});

// useEffect(() => {
//   async function prepare() {
//     await SplashScreen.preventAutoHideAsync();
//   }
//   prepare();
// }, []);

const onLayoutRootView = useCallback(async () => {
  if (fontsLoaded) {
    await SplashScreen.hideAsync();
  }
}, [fontsLoaded]);

// if (!fontsLoaded) {
//   return null;
// }

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator>
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        // options={{
        //   headerShown: false,
        // }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        // options={{
        //   headerShown: false,
        // }}
        name="Create"
        component={CreateScreen}
      />
      <MainTab.Screen
        // options={{
        //   headerShown: false,
        // }}
        name="Comments"
        component={CommentsScreen}
      />
      <MainTab.Screen
        // options={{
        //   headerShown: false,
        // }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default function App() {
  const routing = useRoute({});

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      {routing}
    </NavigationContainer>
  );
}

// auth
/* <MainStack.Navigator>
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </MainStack.Navigator> */
