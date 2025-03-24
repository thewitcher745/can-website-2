import React from 'react';
import Link from 'next/link';
import { Button as StyledButton, ButtonLink } from './Button.styled';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false, 
  onClick, 
  href, 
  type = 'button',
  disabled = false,
  ...props 
}) => {
  if (href) {
    return (
      <Link href={href} passHref>
        <ButtonLink 
          variant={variant} 
          size={size} 
          fullWidth={fullWidth}
          {...props}
        >
          {children}
        </ButtonLink>
      </Link>
    );
  }
  
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
}; 