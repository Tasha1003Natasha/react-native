import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";
/////////////////////////////////////////////////////////
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispach = useDispatch();

  useEffect(() => {
    dispach(authStateChangeUser());
  }, [stateChange]);

  const routing = useRoute(stateChange);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      {routing}
    </NavigationContainer>
  );
};
