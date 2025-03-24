import styled from '@emotion/styled';
import { colors, devices } from 'parameters';

export const HeadingH1 = styled.h1`
	font-size: 3rem;
	line-height: 1.2;
	margin: 0 0 1.5rem 0;
	font-weight: 800;
	color: ${colors.offwhite};
	letter-spacing: -0.5px;
	
	@media ${devices.tablet} {
		font-size: 3.5rem;
	}
	
	@media ${devices.laptop} {
		font-size: 4rem;
	}
`;

export const HeadingH2 = styled.h2`
	font-size: 2.25rem;
	line-height: 1.3;
	margin: 0 0 1.25rem 0;
	font-weight: 700;
	color: ${colors.offwhite};
	letter-spacing: -0.5px;
	
	@media ${devices.tablet} {
		font-size: 2.5rem;
	}
	
	@media ${devices.laptop} {
		font-size: 3rem;
	}
`;

export const HeadingH3 = styled.h3`
	font-size: 1.75rem;
	line-height: 1.4;
	margin: 0 0 1rem 0;
	font-weight: 600;
	color: ${colors.offwhite};
	
	@media ${devices.tablet} {
		font-size: 2rem;
	}
`;

export const HeadingH4 = styled.h4`
	font-size: 1.5rem;
	line-height: 1.4;
	margin: 0 0 0.75rem 0;
	font-weight: 600;
	color: ${colors.offwhite};
`;

export const HeadingH5 = styled.h5`
	font-size: 1.25rem;
	line-height: 1.5;
	margin: 0 0 0.5rem 0;
	font-weight: 600;
	color: ${colors.offwhite};
`;

export const HeadingH6 = styled.h6`
	font-size: 1rem;
	line-height: 1.5;
	margin: 0 0 0.5rem 0;
	font-weight: 600;
	color: ${colors.offwhite};
`;

export const SubHeading = styled.p`
	font-size: 1.25rem;
	line-height: 1.6;
	margin: -0.75rem 0 2rem 0;
	color: ${colors.body};
	font-weight: 400;
	max-width: 800px;
	
	@media ${devices.tablet} {
		font-size: 1.4rem;
	}
`;

export const SectionTitle = styled.h2`
	font-size: 2.25rem;
	line-height: 1.3;
	margin: 0 0 0.5rem 0;
	font-weight: 700;
	color: ${colors.offwhite};
	position: relative;
	display: inline-block;
	
	&::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -0.75rem;
		width: 80px;
		height: 4px;
		background: ${colors.primaryHighlight};
	}
	
	@media ${devices.tablet} {
		font-size: 2.5rem;
	}
`;

export const AccentHeading = styled.span`
	color: ${colors.primaryHighlight};
`; 