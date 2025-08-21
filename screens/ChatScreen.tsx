import React, { useEffect, useRef } from 'react';
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import ChatHeader from '../components/chat/ChatHeader';
import ChatMessage from '../components/chat/ChatMessage';
import { useChat } from '../hooks/useChat';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatInput } from '../components/chat/ChatInput';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';

type ChatRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC = () => {
	const route = useRoute<ChatRouteProp>();
	const { chatId } = route.params;
	const { messages, addMessage, streamReply } = useChat(chatId);

	const flatListRef = useRef<FlatList>(null);

	const handleSend = async (text: string) => {
		await addMessage(text, 'user');
		await streamReply();
	};

	useEffect(() => {
		if (flatListRef.current && messages.length > 0) {
			flatListRef.current.scrollToOffset({ offset: 0, animated: true });
		}

		if (messages.length === 1 && messages[0].sender === 'user') {
			streamReply();
		}
	}, [messages]);

	return (
		<SafeAreaView className="flex-1 bg-[#1C1D22] py-4">
			<KeyboardAvoidingView
				className="flex-1"
				behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
			>
				<ChatHeader />
				<FlatList
					className="flex-1"
					ref={flatListRef}
					data={messages}
					renderItem={({ item }) => <ChatMessage message={item} />}
					keyExtractor={(item, index) => index.toString()}
					contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
				/>
				<ChatInput onSubmit={handleSend} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChatScreen;
