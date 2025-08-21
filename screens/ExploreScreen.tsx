import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AssistantsList } from '../components/explore/AssistantsList';
import { PromptsList } from '../components/explore/PromptsList';
import { AdvicesList } from '../components/explore/AdvicesList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PremiumBanner } from '../components/explore/PremiumBanner';
import { ScanInput } from '../components/explore/ScanInput';
import { Header } from '../components/explore/Header';
import SearchInput from '../components/explore/SearchInput';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChatType, useChats } from '../hooks/useChats';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;

const ExploreScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const { createChat, addSystemReply } = useChats();

	const startChat = async (
		message: string,
		type: ChatType,
		title: string,
		sender: 'user' | 'system' = 'system'
	) => {
		const chatId = await createChat(type, title, message, sender);

		navigation.navigate('Chat', { chatId });
	};

	return (
		<SafeAreaView className="flex-1 bg-[#1C1D22]">
			<KeyboardAvoidingView
				className="flex-1"
				behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
			>
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
								startChat(
									`Hello, I am your ${assistant.name}`,
									'AI Assistant',
									assistant.name
								)
							}
						/>

						<PromptsList
							onSelect={(prompt: { question: string }) =>
								startChat(prompt.question, 'Popular Prompt', prompt.question)
							}
						/>

						<AdvicesList
							onSelect={(advice: string) => startChat(advice, 'Tip', advice)}
						/>
					</View>
				</ScrollView>

				<ScanInput
					onSubmit={(text: string) =>
						startChat(text, 'Custom', 'Custom Chat', 'user')
					}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ExploreScreen;
