import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors, devices, breakpoints } from 'parameters';

const fadeIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

const typing = keyframes`
	from { width: 0 }
	to { width: 100% }
`;

const blinkCaret = keyframes`
	from, to { border-color: transparent }
	50% { border-color: ${colors.primaryHighlight} }
`;

export const Container = styled.div`
	background-color: ${colors.background1};
	color: ${colors.offwhite};
	padding: 96px 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;

	@media ${devices.laptop} {
		padding: 160px 40px;
		min-height: 80vh;
	}
`;

export const Title = styled.h1`
	font-size: 3.5rem;
	font-weight: 700;
	margin-bottom: 1rem;
	color: ${colors.offwhite};
	text-align: center;
	
	@media (max-width: ${breakpoints.tablet}) {
		font-size: 2.5rem;
	}
`;

export const Subtitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 500;
	margin-bottom: 1.5rem;
	color: ${colors.primaryHighlight};
	text-align: center;
	min-height: 2rem;
	
	span {
		border-right: 0.15em solid ${colors.primaryHighlight};
		white-space: nowrap;
		animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
		overflow: hidden;
		display: inline-block;
		max-width: 100%;
	}
	
	@media (max-width: ${breakpoints.tablet}) {
		font-size: 1.25rem;
	}
	
	@keyframes typing {
		from { width: 0 }
		to { width: 100% }
	}
	
	@keyframes blink-caret {
		from, to { border-color: transparent }
		50% { border-color: ${colors.primaryHighlight} }
	}
`;

export const Description = styled.p`
	font-size: 1.125rem;
	line-height: 1.6;
	margin-bottom: 2rem;
	max-width: 800px;
	text-align: center;
	color: ${colors.offwhite};
	
	@media (max-width: ${breakpoints.tablet}) {
		font-size: 1rem;
		padding: 0 1rem;
	}
`;

export const ButtonContainer = styled.div`
	margin-top: 40px;
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
	justify-content: center;
	animation: ${fadeIn} 1s ease-out 0.9s both;
`;
