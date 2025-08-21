import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';

interface ChatMessageProps {
	message: { text: string; sender: string };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
	const copyToClipboard = (text: string) => {
		Clipboard.setStringAsync(text);
		Alert.alert('Copied to clipboard');
	};

	const shareMessage = async (text: string) => {
		if (await Sharing.isAvailableAsync()) {
			try {
				const fileUri = FileSystem.documentDirectory + 'shared-message.txt';
				await FileSystem.writeAsStringAsync(fileUri, text);

				await Sharing.shareAsync(fileUri, {
					dialogTitle: 'Share Message',
					mimeType: 'text/plain',
				});
			} catch (error) {
				console.error('Error sharing message:', error);
				Alert.alert(
					'Error',
					'There was an issue while trying to share the message.'
				);
			}
		} else {
			Alert.alert('Sharing is not available on this device');
		}
	};

	const playAudio = async (uri: string) => {
		try {
			const { sound } = await Audio.Sound.createAsync({ uri });
			await sound.playAsync();
		} catch (error) {
			console.error('Error playing audio:', error);
			Alert.alert('Error', 'Cannot play audio.');
		}
	};

	const isVoiceMessage = message.text.startsWith('[Voice message]:');
	const displayText = isVoiceMessage ? '▶️ Voice message' : message.text;
	const audioUri = isVoiceMessage
		? message.text.replace('[Voice message]: ', '')
		: '';

	return (
		<View
			className={`pl-6 mb-2 ${
				message.sender === 'user' ? 'self-end' : 'self-start'
			}`}
		>
			{message.sender === 'user' ? (
				<LinearGradient
					colors={['#448ACA', '#5C34B1']}
					className="p-2 rounded-tl-lg rounded-bl-lg rounded-tr-lg rounded-br-sm w-[342px]"
				>
					{isVoiceMessage ? (
						<TouchableOpacity onPress={() => playAudio(audioUri)}>
							<Text className="text-white">{displayText}</Text>
						</TouchableOpacity>
					) : (
						<Text className="text-white">{displayText}</Text>
					)}
					<View className="flex-row mt-2 justify-end gap-2">
						<TouchableOpacity
							onPress={() => copyToClipboard(message.text)}
							className="flex-row items-center bg-[#5d7cbe] px-3 py-2 rounded-xl w-[76px] justify-center"
						>
							<MaterialIcons name="content-copy" size={16} color="white" />
							<Text className="text-white ml-1">copy</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => shareMessage(message.text)}
							className="flex-row items-center bg-[#5d7cbe] px-3 py-2 rounded-xl w-[76px] justify-center"
						>
							<Entypo name="share-alternative" size={16} color="white" />
							<Text className="text-white ml-1">share</Text>
						</TouchableOpacity>
					</View>
				</LinearGradient>
			) : (
				<View className="py-3 px-4 bg-[#333338] rounded-tl-lg rounded-bl-sm rounded-tr-lg rounded-br-lg w-[342px]">
					{isVoiceMessage ? (
						<TouchableOpacity onPress={() => playAudio(audioUri)}>
							<Text className="text-white mb-2">{displayText}</Text>
						</TouchableOpacity>
					) : (
						<Text className="text-white mb-2">{displayText}</Text>
					)}
					<View className="flex-row mt-2 gap-2 justify-start">
						<TouchableOpacity
							onPress={() => copyToClipboard(message.text)}
							className="flex-row items-center bg-slate-500 px-3 py-2 rounded-xl w-[76px] justify-center"
						>
							<MaterialIcons name="content-copy" size={16} color="white" />
							<Text className="text-white ml-1">copy</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => shareMessage(message.text)}
							className="flex-row items-center bg-slate-500 px-3 py-2 rounded-xl w-[76px] justify-center"
						>
							<Entypo name="share-alternative" size={16} color="white" />
							<Text className="text-white ml-1">share</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	);
};

export default ChatMessage;
