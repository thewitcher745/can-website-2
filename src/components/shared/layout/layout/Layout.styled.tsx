import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from 'parameters';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const pulseAnimation = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
`;

interface LayoutWrapperProps {
	isFirstLoad: boolean
}

export const LayoutWrapper = styled.main<LayoutWrapperProps>`
	padding-top: 70px; /* height of fixed header */
	position: relative;
	min-height: 100vh;
	background-color: ${colors.background1};
	color: ${colors.offwhite};
	
	&::before {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(-45deg, 
                    rgba(254,154,0,0.1) 0%, 
                    rgba(20,20,20,0.4) 25%, 
                    rgba(214,128,0,0.1) 50%, 
                    rgba(15,15,15,0.4) 75%, 
                    rgba(254,154,0,0.1) 100%);
		background-size: 400% 400%;
		animation: ${gradientAnimation} 15s ease infinite;
		z-index: -2;
	}
	
	&::after {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: radial-gradient(circle at 30% 20%, rgba(254,154,0,0.08) 0%, transparent 35%),
                      radial-gradient(circle at 70% 60%, rgba(40,40,40,0.15) 0%, transparent 35%),
                      radial-gradient(circle at 40% 80%, rgba(254,154,0,0.08) 0%, transparent 35%),
                      radial-gradient(circle at 80% 40%, rgba(30,30,30,0.15) 0%, transparent 35%);
		z-index: -1;
		animation: ${floatAnimation} 8s ease-in-out infinite;
	}
	
	// Add subtle light effects
	&::before {
		content: '';
		position: fixed;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		width: 200%;
		height: 200%;
		background: transparent;
		z-index: -3;
		
		// Circular highlights
		&::after {
			content: '';
			position: absolute;
			width: 300px;
			height: 300px;
			background: radial-gradient(circle, rgba(254,154,0,0.07) 0%, transparent 70%);
			border-radius: 50%;
			animation: ${pulseAnimation} 10s ease-in-out infinite;
		}
	}

	${props =>
		props?.isFirstLoad &&
		css`
			animation: MainFadeIn 433ms ease 2000ms 1 normal forwards running;
			opacity: 0;
			margin: -16px auto 0 auto;

			@keyframes MainFadeIn {
				to {
					opacity: 1;
					margin: 0 auto 0;
				}
			}
		`}
`
