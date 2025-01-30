import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/RootStackParamList";
import { Assistant } from "../../types/Assistant";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type NavigationProp = StackNavigationProp<RootStackParamList, "Chat">;

interface AssistantsListProps {
  onSelect: (assistant: Assistant) => void;
}

export const AssistantsList: React.FC<AssistantsListProps> = ({ onSelect }) => {
  const navigation = useNavigation<NavigationProp>();
  const assistants: Assistant[] = [
    { name: "Lawyer", imageUri: require("../../assets/vmb 1.png") },
    {
      name: "English teacher",
      imageUri: require("../../assets/vmb 1 (1).png"),
    },
    { name: "Psychologist", imageUri: require("../../assets/vmb 1 (2).png") },
  ];

  const handleSelect = (assistant: Assistant) => {
    onSelect(assistant);
    navigation.navigate("Chat", {
      initialMessage: `My name is Chat ${assistant.name}`,
    });
  };

  return (
    <View className="mt-6 mb-6">
      <View className="flex-row justify-between items-center mb-2 px-4">
        <Text className="text-white text-lg font-bold">AI assistants</Text>
        <TouchableOpacity className="flex-row gap-2 items-center">
          <Text className="text-[#CBCBD7]">See All</Text>
          <MaterialCommunityIcons name="greater-than" size={16} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: "row" }}
        className="overflow-visible"
      >
        <View className="flex-row gap-2 px-4">
          {[...assistants, ...assistants].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(item)}
              className="relative bg-[#333338] rounded-xl w-[110px] h-[110px] justify-center items-center"
            >
              <Image
                source={item.imageUri}
                className="absolute bottom-0 resize-cover"
              />
              <LinearGradient
                colors={["#59B0FF", "#925FFF"]}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="p-[1] rounded-[48px] relative top-12"
              >
                <LinearGradient
                  colors={["#448ACA", "#5C34B1"]}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-[48px] w-[110px] h-[26px] flex items-center justify-center"
                >
                  <Text className="text-white font-medium text-center">
                    {item.name}
                  </Text>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
