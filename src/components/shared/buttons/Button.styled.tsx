import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from 'parameters';

// Add the ButtonProps interface
interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'outline' | 'text';
	size?: 'small' | 'medium' | 'large';
	fullWidth?: boolean;
	children?: React.ReactNode;
}

const SIZE_STYLES = {
	small: css`
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
	`,
	medium: css`
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
	`,
	large: css`
		padding: 1rem 2rem;
		font-size: 1.125rem;
	`,
};

const VARIANT_STYLES = {
	primary: css`
		background-color: ${colors.primaryHighlight};
		color: ${colors.offwhite};
		border: none;
		
		&:hover {
			background-color: ${colors.primaryBlue2};
			transform: translateY(-2px);
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
		}
		
		&:active {
			background-color: ${colors.primaryBlue3};
			transform: translateY(0);
			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
		}
	`,
	secondary: css`
		background-color: ${colors.primaryBlue2};
		color: ${colors.offwhite};
		border: none;
		
		&:hover {
			background-color: ${colors.primaryBlue3};
			transform: translateY(-2px);
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
		}
		
		&:active {
			background-color: ${colors.primaryBlue4};
			transform: translateY(0);
			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
		}
	`,
	outline: css`
		background-color: transparent;
		color: ${colors.offwhite};
		border: 2px solid ${colors.offwhite};
		
		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
			transform: translateY(-2px);
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		}
		
		&:active {
			background-color: rgba(255, 255, 255, 0.15);
			transform: translateY(0);
			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		}
	`,
	text: css`
		background-color: transparent;
		color: ${colors.primaryHighlight};
		border: none;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		
		&:hover {
			color: ${colors.primaryBlue2};
			background-color: rgba(255, 255, 255, 0.05);
		}
		
		&:active {
			color: ${colors.primaryBlue3};
		}
	`,
};

export const StyledButton = styled.button<{
	size: keyof typeof SIZE_STYLES;
	variant: keyof typeof VARIANT_STYLES;
	fullWidth?: boolean;
}>`
	border-radius: 0.375rem;
	font-weight: 500;
	transition: all 0.2s ease-in-out;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	
	${({ size }) => SIZE_STYLES[size]}
	${({ variant }) => VARIANT_STYLES[variant]}
	
	&:disabled {
		background-color: ${colors.grey};
		color: ${colors.body};
		cursor: not-allowed;
		transform: none !important;
		box-shadow: none !important;
	}
	
	/* Add a subtle animation for focus state */
	&:focus {
		outline: none;
		box-shadow: 0 0 0 3px rgba(74, 111, 138, 0.4);
	}
`;

export const ButtonLink = styled.a<ButtonProps>`
	font-family: 'Epilogue', sans-serif;
	font-weight: 600;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	width: ${props => (props.fullWidth ? '100%' : 'auto')};
	
	/* Size variants */
	padding: ${props => {
		switch(props.size) {
			case 'small':
				return '0.5rem 1rem';
			case 'large':
				return '1rem 2rem';
			default: // medium
				return '0.75rem 1.5rem';
		}
	}};
	
	font-size: ${props => {
		switch(props.size) {
			case 'small':
				return '0.875rem';
			case 'large':
				return '1.125rem';
			default: // medium
				return '1rem';
		}
	}};
	
	/* Style variants */
	background-color: ${props => {
		switch(props.variant) {
			case 'secondary':
				return colors.primaryBlue1;
			case 'outline':
			case 'text':
				return 'transparent';
			default: // primary
				return colors.primaryHighlight;
		}
	}};
	
	color: ${props => {
		switch(props.variant) {
			case 'outline':
				return colors.primaryHighlight;
			case 'text':
				return colors.primaryHighlight;
			default: // primary, secondary
				return colors.offwhite;
		}
	}};
	
	border: ${props => {
		switch(props.variant) {
			case 'outline':
				return `2px solid ${colors.primaryHighlight}`;
			case 'text':
				return 'none';
			default: // primary, secondary
				return 'none';
		}
	}};
	
	&:hover {
		background-color: ${props => {
			switch(props.variant) {
				case 'secondary':
					return colors.primaryBlue2;
				case 'outline':
					return 'rgba(254, 154, 0, 0.1)';
				case 'text':
					return 'rgba(254, 154, 0, 0.05)';
				default: // primary
					return '#FF8C00';
			}
		}};
		
		transform: ${props => props.variant === 'text' ? 'none' : 'translateY(-2px)'};
		box-shadow: ${props => props.variant === 'text' ? 'none' : '0 5px 15px rgba(0, 0, 0, 0.2)'};
	}
	
	&:active {
		transform: translateY(0);
		box-shadow: none;
	}
	
	&:disabled {
		background-color: ${colors.background2};
		color: ${colors.body};
		cursor: not-allowed;
		border: none;
		box-shadow: none;
		transform: none;
	}
	
	svg {
		margin-right: ${props => props.children ? '0.5rem' : '0'};
	}
`;

// Export StyledButton as Button to fix the import error
export { StyledButton as Button }; 