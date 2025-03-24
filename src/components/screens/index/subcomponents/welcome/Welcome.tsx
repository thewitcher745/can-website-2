import React, { useState, useEffect } from 'react';
import { Button } from 'components/shared/buttons';
import { Container, Title, Subtitle, Description, ButtonContainer } from './Welcome.styled';
import { routes } from 'parameters';

export interface WelcomeProps {
	title: string;
	subtitle?: string;
	description?: string;
}

export const Welcome: React.FunctionComponent<WelcomeProps> = ({ 
	title, 
	subtitle = 'Expert Financial Trading Solutions',
	description = 'Providing professional trading solutions and strategies for businesses and individuals.'
}) => {
	// Animated typing effect for subtitle
	const [typewriterReady, setTypewriterReady] = useState(false);
	
	useEffect(() => {
		// Short delay before starting the typewriter animation
		const timer = setTimeout(() => {
			setTypewriterReady(true);
		}, 1000);
		
		return () => clearTimeout(timer);
	}, []);
	
	return (
		<Container>
			<Title>{title}</Title>
			{typewriterReady ? (
				<Subtitle><span>{subtitle}</span></Subtitle>
			) : (
				<Subtitle>{'\u00A0'}</Subtitle> // Non-breaking space as placeholder
			)}
			<Description>{description}</Description>
			<ButtonContainer>
				<Button 
					variant="primary" 
					size="large"
					href="#services"
				>
					Explore Our Services
				</Button>
				<Button 
					variant="outline" 
					size="large"
					href={routes.contact}
				>
					Get Started
				</Button>
			</ButtonContainer>
		</Container>
	);
};
