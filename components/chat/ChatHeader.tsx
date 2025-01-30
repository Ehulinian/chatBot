import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootStackParamList, "Explore">;

const ChatHeader: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="px-4 flex-row items-center justify-between mb-4">
      <TouchableOpacity onPress={() => Alert.alert("Settings")}>
        <Ionicons name="settings-outline" size={24} color="white" />
      </TouchableOpacity>
      <Text className="text-white text-lg font-bold">Chat</Text>
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={() => Alert.alert("Settings")}
          className="mr-4"
        >
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Explore")}>
          <Entypo name="share-alternative" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
