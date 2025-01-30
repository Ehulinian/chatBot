import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ExploreScreen from "../screens/ExploreScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#6C6C76",
          tabBarStyle: {
            backgroundColor: "#1C1D22",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      >
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="explore" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Tasks"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="tasks" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="history" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
