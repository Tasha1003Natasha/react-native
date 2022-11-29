import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import { RegistrationScreen } from "./screens/auth/RegistrationScreen";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { PostsScreen } from "./screens/mainScreen/PostsScreen";
import { ProfileScreen } from "./screens/mainScreen/ProfileScreen";
import { CreateScreen } from "./screens/mainScreen/CreateScreen";
import { Home } from "./screens/mainScreen/Home";

// icons import
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Registration">
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
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons name="post" size={size} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="create" size={size} color={color} />
          ),
        }}
        name="Create"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialIcons name="tag-faces" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
