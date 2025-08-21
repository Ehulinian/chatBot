import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Message = {
	text: string;
	sender: 'user' | 'system';
	timestamp: string;
};

export type ChatType = 'AI Assistant' | 'Popular Prompt' | 'Tip' | 'Custom';

export type Chat = {
	id: string;
	type: ChatType;
	title: string;
	messages: Message[];
};

const placeholderReplies = [
	'Lorem ipsum dolor sit amet.',
	'Consectetur adipiscing elit.',
	'Sed do eiusmod tempor incididunt.',
];

export const useChats = () => {
	const [chats, setChats] = useState<Chat[]>([]);

	useEffect(() => {
		const loadChats = async () => {
			const stored = await AsyncStorage.getItem('chats');
			setChats(stored ? JSON.parse(stored) : []);
		};
		loadChats();
	}, []);

	const saveChats = async (updatedChats: Chat[]) => {
		setChats(updatedChats);
		await AsyncStorage.setItem('chats', JSON.stringify(updatedChats));
	};

	const clearChats = async () => {
		setChats([]);
		await AsyncStorage.removeItem('chats');
	};

	const deleteChat = async (chatId: string) => {
		const updatedChats = chats.filter(c => c.id !== chatId);
		await saveChats(updatedChats);
	};

	const createChat = async (
		type: ChatType,
		title: string,
		initialMessage?: string,
		sender: 'user' | 'system' = 'system'
	) => {
		const id = Date.now().toString();
		let text = initialMessage || '';
		if (!initialMessage) {
			switch (type) {
				case 'AI Assistant':
					text = `Hello, I am your AI assistant ${title}`;
					break;
				case 'Popular Prompt':
					text = `Question: ${title}`;
					break;
				case 'Tip':
					text = `Tip: ${title}`;
					break;
				case 'Custom':
					text = '';
					break;
			}
		}

		const newChat: Chat = {
			id,
			type,
			title,
			messages: text
				? [{ text, sender, timestamp: new Date().toISOString() }]
				: [],
		};

		await saveChats([newChat, ...chats]);
		return id;
	};

	const addMessage = async (
		chatId: string,
		text: string,
		sender: 'user' | 'system'
	) => {
		const chat = chats.find(c => c.id === chatId);
		if (!chat) return;

		const newMessage: Message = {
			text,
			sender,
			timestamp: new Date().toISOString(),
		};

		const updatedChat = {
			...chat,
			messages: [...chat.messages, newMessage],
		};

		await saveChats(chats.map(c => (c.id === chatId ? updatedChat : c)));
	};

	const addSystemReply = async (chatId: string) => {
		const reply =
			placeholderReplies[Math.floor(Math.random() * placeholderReplies.length)];
		await addMessage(chatId, reply, 'system');
	};

	return {
		chats,
		createChat,
		addMessage,
		addSystemReply,
		clearChats,
		deleteChat,
	};
};
