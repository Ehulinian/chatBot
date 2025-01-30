import React from "react";
import { FlatList } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessage from "../components/chat/ChatMessage";
import { useChat } from "../hooks/useChat";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatInput } from "../components/chat/ChatInput";

const ChatScreen: React.FC = () => {
  const route = useRoute<
    RouteProp<
      {
        params: { chatId: string; initialMessage?: string; sender?: string };
      },
      "params"
    >
  >();
  const { chatId, initialMessage, sender } = route.params;
  const { messages, sendMessage } = useChat(chatId, initialMessage, sender);

  return (
    <SafeAreaView className="flex-1 bg-[#1C1D22] py-4">
      <ChatHeader />
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage message={item} />}
        keyExtractor={(item, index) => index.toString()}
        inverted
      />
      <ChatInput onSubmit={sendMessage} />
    </SafeAreaView>
  );
};

export default ChatScreen;
