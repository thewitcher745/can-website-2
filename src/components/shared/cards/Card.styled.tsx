import styled from '@emotion/styled';
import { colors } from 'parameters';

interface CardProps {
	elevated?: boolean;
	bordered?: boolean;
	padding?: 'small' | 'medium' | 'large' | 'none';
}

export const Card = styled.div<CardProps>`
	background-color: ${colors.background2};
	border-radius: 8px;
	overflow: hidden;
	position: relative;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	
	padding: ${props => {
		switch (props.padding) {
			case 'small':
				return '1rem';
			case 'large':
				return '2rem';
			case 'none':
				return '0';
			default: // medium
				return '1.5rem';
		}
	}};
	
	box-shadow: ${props => props.elevated 
		? '0 10px 30px rgba(0, 0, 0, 0.3)' 
		: '0 4px 10px rgba(0, 0, 0, 0.15)'};
		
	border: ${props => props.bordered 
		? `1px solid rgba(255, 255, 255, 0.1)` 
		: 'none'};
		
	&:hover {
		${props => props.elevated && `
			transform: translateY(-5px);
			box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
		`}
	}
`;

export const CardHeader = styled.div`
	margin-bottom: 1.25rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	h3, h4 {
		margin: 0;
	}
`;

export const CardBody = styled.div`
	margin-bottom: 1.25rem;
`;

export const CardFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
`;

export const CardImage = styled.div`
	margin: -1.5rem -1.5rem 1.5rem;
	
	img {
		width: 100%;
		height: auto;
		display: block;
	}
`;

export const CardDivider = styled.hr`
	border: 0;
	height: 1px;
	background-color: rgba(255, 255, 255, 0.1);
	margin: 1.5rem 0;
`;

export const CardIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	border-radius: 50%;
	background-color: rgba(254, 154, 0, 0.1);
	color: ${colors.primaryHighlight};
	margin-bottom: 1.25rem;
	font-size: 1.5rem;
`; 