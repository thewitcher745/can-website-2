import styled from '@emotion/styled';
import { colors } from 'parameters';

export const Paragraph = styled.p`
	font-size: 1rem;
	line-height: 1.6;
	margin-bottom: 1.5rem;
	color: ${colors.body};
`;

export const LargeParagraph = styled.p`
	font-size: 1.125rem;
	line-height: 1.8;
	margin-bottom: 2rem;
	color: ${colors.body};
`;

export const SmallParagraph = styled.p`
	font-size: 0.875rem;
	line-height: 1.5;
	margin-bottom: 1rem;
	color: ${colors.body};
`;

export const Quote = styled.blockquote`
	font-size: 1.25rem;
	font-style: italic;
	line-height: 1.6;
	margin: 2rem 0;
	padding: 1rem 2rem;
	border-left: 4px solid ${colors.primaryHighlight};
	background-color: rgba(255, 255, 255, 0.05);
	color: ${colors.offwhite};
`;

export const Highlight = styled.span`
	color: ${colors.primaryHighlight};
	font-weight: 600;
`;

export const Caption = styled.figcaption`
	font-size: 0.875rem;
	color: ${colors.body};
	text-align: center;
	margin-top: 0.5rem;
	font-style: italic;
`;

export const ListItem = styled.li`
	font-size: 1rem;
	line-height: 1.6;
	margin-bottom: 0.75rem;
	color: ${colors.body};
`;

export const Link = styled.a`
	color: ${colors.primaryHighlight};
	text-decoration: none;
	border-bottom: 1px solid transparent;
	transition: border-color 0.2s ease;
	
	&:hover {
		border-color: ${colors.primaryHighlight};
	}
`; 