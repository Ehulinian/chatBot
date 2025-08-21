import React from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { useChats } from '../hooks/useChats';
import { MaterialIcons } from '@expo/vector-icons';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

const ChatHistoryScreen: React.FC = () => {
	const { chats, clearChats } = useChats();
	const navigation = useNavigation<NavigationProp>();

	const openChat = (chatId: string) => {
		navigation.navigate('Chat', { chatId });
	};

	const renderItem = ({ item }: { item: any }) => {
		const lastMessage = item.messages[item.messages.length - 1]?.text || '';
		return (
			<TouchableOpacity
				onPress={() => openChat(item.id)}
				className="p-4 border-b border-gray-700"
			>
				<Text className="text-white font-bold">{item.title}</Text>
				<Text className="text-gray-400 mt-1" numberOfLines={1}>
					{lastMessage}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView className="flex-1 bg-[#1C1D22]">
			<TouchableOpacity
				className="p-4 border-b border-gray-700 flex-row items-center justify-center"
				onPress={clearChats}
			>
				<MaterialIcons name="delete" size={20} color="white" />
				<Text className="text-white text-center font-bold ml-2">
					Clean history
				</Text>
			</TouchableOpacity>
			<FlatList
				data={chats}
				renderItem={renderItem}
				keyExtractor={item => item.id}
			/>
		</SafeAreaView>
	);
};

export default ChatHistoryScreen;
