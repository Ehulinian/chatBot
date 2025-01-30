import React from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AssistantsList } from "../components/explore/AssistantsList";
import { PromptsList } from "../components/explore/PromptsList";
import { AdvicesList } from "../components/explore/AdvicesList";
import { SafeAreaView } from "react-native-safe-area-context";
import { PremiumBanner } from "../components/explore/PremiumBanner";
import { ScanInput } from "../components/explore/ScanInput";
import { Header } from "../components/explore/Header";
import SearchInput from "../components/explore/SearchInput";
import { RootStackParamList } from "../types/RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootStackParamList, "Chat">;

const ExploreScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const startChat = (message: string) => {
    navigation.navigate("Chat", {
      initialMessage: message,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1C1D22]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="pt-6 z-10 flex-1"
      >
        <Header />
        <SearchInput />
        <PremiumBanner />
        <View>
          <AssistantsList
            onSelect={(assistant: { name: string }) =>
              startChat(`Hello, I am your ${assistant.name}`)
            }
          />

          <PromptsList
            onSelect={(prompt: { question: string }) =>
              startChat(prompt.question)
            }
          />

          <AdvicesList onSelect={(advice: string) => startChat(advice)} />
        </View>
      </ScrollView>

      <ScanInput onFocus={() => startChat("")} />
    </SafeAreaView>
  );
};

export default ExploreScreen;
