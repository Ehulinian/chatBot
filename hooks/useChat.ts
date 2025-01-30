import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Message {
  text: string;
  sender: string;
}

interface Chat {
  id: string;
  type: string;
  messages: Message[];
}

const placeholderMessages = [
  "Lorem ipsum dolor sit amet.",
  "Consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt.",
  "Ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam.",
];

export const useChat = (chatId: string, initialMessage?: string, sender?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  useEffect(() => {
    const loadChat = async () => {
      const storedChats = await AsyncStorage.getItem("chats");
      const chats: Chat[] = storedChats ? JSON.parse(storedChats) : [];
      const chat = chats.find((c) => c.id === chatId);
      if (chat) {
        setMessages(chat.messages);
      }

      if (initialMessage) {
        const newMessage: Message = {
          text: initialMessage,
          sender: sender || "system",
        };
        setMessages((prev) => [...prev, newMessage]);

        const updatedChats = chats.map((chat) =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, newMessage] }
            : chat
        );
        await AsyncStorage.setItem("chats", JSON.stringify(updatedChats));
      }
    };
    loadChat();
  }, [chatId, initialMessage, sender]);

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    const newMessage: Message = { text: input, sender: "user" };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    const storedChats = await AsyncStorage.getItem("chats");
    const chats: Chat[] = storedChats ? JSON.parse(storedChats) : [];
    const updatedChats = chats.map((chat) =>
      chat.id === chatId ? { ...chat, messages: newMessages } : chat
    );
    await AsyncStorage.setItem("chats", JSON.stringify(updatedChats));

    streamReply();
  };

  const streamReply = async () => {
    setIsStreaming(true);
    const reply =
      placeholderMessages[
        Math.floor(Math.random() * placeholderMessages.length)
      ];
    let currentText = "";
    for (let i = 0; i < reply.length; i++) {
      currentText += reply[i];
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (lastMessage && lastMessage.sender === "system") {
          return [
            ...prevMessages.slice(0, -1),
            { ...lastMessage, text: currentText },
          ];
        } else {
          return [...prevMessages, { text: currentText, sender: "system" }];
        }
      });
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    setIsStreaming(false);

    const storedChats = await AsyncStorage.getItem("chats");
    const chats: Chat[] = storedChats ? JSON.parse(storedChats) : [];
    const updatedChats = chats.map((chat) =>
      chat.id === chatId
        ? {
            ...chat,
            messages: [...messages, { text: reply, sender: "system" }],
          }
        : chat
    );
    await AsyncStorage.setItem("chats", JSON.stringify(updatedChats));
  };

  return {
    messages,
    isStreaming,
    sendMessage,
  };
};