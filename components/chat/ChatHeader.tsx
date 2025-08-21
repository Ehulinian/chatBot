// ChatHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { useChats } from '../../hooks/useChats';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Explore'>;
type ChatRouteProp = RouteProp<RootStackParamList, 'Chat'>;

interface ChatHeaderProps {
	onClearChat?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearChat }) => {
	const navigation = useNavigation<NavigationProp>();
	const route = useRoute<ChatRouteProp>();
	const { chatId } = route.params;

	const { deleteChat } = useChats();

	const handleDeleteChat = () => {
		Alert.alert(
			'Delete Chat',
			'Are you sure you want to delete this chat? This action cannot be undone.',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: async () => {
						await deleteChat(chatId);
						navigation.goBack();
					},
				},
			]
		);
	};

	return (
		<View className="px-4 flex-row items-center justify-between mb-4">
			<TouchableOpacity onPress={handleDeleteChat}>
				<Ionicons name="settings-outline" size={24} color="white" />
			</TouchableOpacity>
			<Text className="text-white text-lg font-bold">Chat</Text>
			<View className="flex-row items-center">
				<TouchableOpacity onPress={() => Alert.alert('Опції')} className="mr-4">
					<Ionicons name="options-outline" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate('Explore')}>
					<Entypo name="share-alternative" size={24} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ChatHeader;
