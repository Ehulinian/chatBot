import { JSX } from 'react';

export interface Prompt {
	title: string;
	description: string;
	gradient: [string, string, ...string[]];
	icon: JSX.Element;
	question: string;
}
