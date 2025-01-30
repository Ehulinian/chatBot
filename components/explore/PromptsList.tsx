import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SvgComponent from "../SvgComponent";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/RootStackParamList";
import { Prompt } from "../../types/Prompt";
import { prompts } from "../../helpers/prompts";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type NavigationProp = StackNavigationProp<RootStackParamList, "Chat">;

interface PromptsListProps {
  onSelect: (prompt: Prompt) => void;
}

export const PromptsList: React.FC<PromptsListProps> = ({ onSelect }) => {
  const navigation = useNavigation<NavigationProp>();

  const handleSelect = (prompt: Prompt) => {
    onSelect(prompt);
    navigation.navigate("Chat", {
      initialMessage: prompt.question,
    });
  };

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-4 px-4">
        <Text className="text-white text-xl font-bold">Popular Prompts</Text>
        <TouchableOpacity className="flex-row gap-2 items-center">
          <Text className="text-[#CBCBD7]">See All</Text>
          <MaterialCommunityIcons name="greater-than" size={16} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row px-4 gap-2">
          {prompts.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleSelect(item)}>
              <LinearGradient
                colors={item.gradient}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 0.9, y: 1 }}
                style={{
                  borderRadius: 12,
                  padding: 1,
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                    borderRadius: 12,
                    padding: 12,
                    width: 169,
                    height: 116,
                    justifyContent: "flex-start",
                  }}
                >
                  <LinearGradient
                    colors={item.gradient}
                    style={{
                      borderRadius: 12,
                      width: 32,
                      height: 32,
                      padding: 7,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                  >
                    <SvgComponent width={24} height={24}>
                      {item.icon}
                    </SvgComponent>
                  </LinearGradient>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: 14,
                      marginBottom: 2,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: "#CBCBD7",
                      fontWeight: "400",
                      fontSize: 12,
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
