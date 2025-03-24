import styled from '@emotion/styled';
import { colors, devices } from 'parameters';

export const FooterWrapper = styled.footer`
	background-color: ${colors.background2};
	padding: 2rem 0;
	box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.3);
`;

export const FooterContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 1rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;

	@media ${devices.tablet} {
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
	}
`;

export const FooterSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const FooterSectionTitle = styled.h3`
	color: ${colors.primaryHighlight};
	font-size: 1.2rem;
	font-weight: 600;
	margin-bottom: 1rem;
`;

export const FooterNavList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

export const FooterNavItem = styled.li`
	color: ${colors.offwhite};
	
	a {
		color: ${colors.offwhite};
		text-decoration: none;
		transition: color 0.2s ease;
		
		&:hover {
			color: ${colors.primaryHighlight};
		}
	}
`;

export const ContactItem = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: ${colors.offwhite};
	margin-bottom: 0.5rem;
	
	svg {
		color: ${colors.primaryHighlight};
	}
`;

export const SocialLinks = styled.div`
	display: flex;
	gap: 1rem;
	
	a {
		color: ${colors.offwhite};
		transition: color 0.2s ease;
		
		&:hover {
			color: ${colors.primaryHighlight};
		}
	}
`;

export const Copyright = styled.div`
	margin-top: 2rem;
	padding-top: 1rem;
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	text-align: center;
	color: ${colors.body};
	font-size: 0.9rem;
`; 