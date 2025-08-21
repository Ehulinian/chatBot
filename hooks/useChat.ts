import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chat, Message } from './useChats';

const placeholderMessages = [
	'Lorem ipsum dolor sit amet.',
	'Consectetur adipiscing elit.',
	'Sed do eiusmod tempor incididunt.',
	'Ut labore et dolore magna aliqua.',
	'Ut enim ad minim veniam.',
];

export const useChat = (chatId: string) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isStreaming, setIsStreaming] = useState(false);

	useEffect(() => {
		const loadChat = async () => {
			const stored = await AsyncStorage.getItem('chats');
			const chats: Chat[] = stored ? JSON.parse(stored) : [];
			const chat = chats.find(c => c.id === chatId);
			if (chat) setMessages(chat.messages);
		};
		loadChat();
	}, [chatId]);

	const addMessage = async (text: string, sender: 'user' | 'system') => {
		const newMessage: Message = {
			text,
			sender,
			timestamp: new Date().toISOString(),
		};
		setMessages(prev => [...prev, newMessage]);

		const stored = await AsyncStorage.getItem('chats');
		const chats: Chat[] = stored ? JSON.parse(stored) : [];
		const updatedChats = chats.map(c =>
			c.id === chatId ? { ...c, messages: [...c.messages, newMessage] } : c
		);
		await AsyncStorage.setItem('chats', JSON.stringify(updatedChats));
	};

	const streamReply = async () => {
		setIsStreaming(true);
		const reply =
			placeholderMessages[
				Math.floor(Math.random() * placeholderMessages.length)
			];
		let currentText = '';
		for (let i = 0; i < reply.length; i++) {
			currentText += reply[i];
			setMessages(prev => {
				const last = prev[prev.length - 1];
				if (last && last.sender === 'system') {
					return [...prev.slice(0, -1), { ...last, text: currentText }];
				} else {
					return [
						...prev,
						{
							text: currentText,
							sender: 'system',
							timestamp: new Date().toISOString(),
						},
					];
				}
			});
			await new Promise(res => setTimeout(res, 30));
		}
		setIsStreaming(false);
	};

	return { messages, addMessage, streamReply, isStreaming };
};
