import { TextInput, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import EvilIcons from '@expo/vector-icons/EvilIcons';

interface ChatInputProps {
	onSubmit?: (input: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
	const [input, setInput] = useState('');
	const [recording, setRecording] = useState(false);
	const recordingRef = useRef<Audio.Recording | null>(null);

	const handleSubmit = () => {
		if (input.trim()) {
			onSubmit?.(input.trim());
			setInput('');
		}
	};

	const startRecording = async () => {
		const { status } = await Audio.requestPermissionsAsync();
		if (status !== 'granted') return alert('Microphone permission required');
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: true,
			playsInSilentModeIOS: true,
			staysActiveInBackground: false,
		});
		const { recording } = await Audio.Recording.createAsync(
			Audio.RecordingOptionsPresets.HIGH_QUALITY
		);
		recordingRef.current = recording;
		setRecording(true);
	};

	const stopRecording = async () => {
		if (!recordingRef.current) return;
		await recordingRef.current.stopAndUnloadAsync();
		const uri = recordingRef.current.getURI();
		onSubmit?.(`[Voice message]: ${uri}`);
		setRecording(false);
		recordingRef.current = null;
	};

	return (
		<View className="flex-row gap-2 items-center justify-between px-4 pt-4 bg-[#1C1D22]">
			<View className="flex-row items-center bg-[#333338] rounded-xl px-4 w-[302] h-12">
				<MaterialCommunityIcons name="line-scan" size={24} color="white" />
				<TextInput
					placeholder="Enter text here..."
					placeholderTextColor="#a1a1a1"
					className="text-white flex-1"
					value={input}
					onChangeText={setInput}
				/>
				{input.trim() && (
					<TouchableOpacity
						onPress={() => setInput('')}
						className="w-5 h-5 bg-[#4F4F59] rounded-full items-center justify-center"
					>
						<EvilIcons name="close" size={16} color="white" />
					</TouchableOpacity>
				)}
			</View>

			<TouchableOpacity
				onPress={
					input.trim()
						? handleSubmit
						: recording
						? stopRecording
						: startRecording
				}
			>
				<LinearGradient
					colors={['#448ACA', '#5C34B1']}
					className="rounded-2xl w-12 h-12 items-center justify-center"
				>
					{input.trim() ? (
						<FontAwesome6 name="paper-plane" size={24} color="white" />
					) : recording ? (
						<FontAwesome6 name="microphone-alt-slash" size={24} color="white" />
					) : (
						<FontAwesome6 name="microphone" size={24} color="white" />
					)}
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
};
