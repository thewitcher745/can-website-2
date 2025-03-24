import styled from '@emotion/styled';
import { colors, devices } from 'parameters';
import Image from 'next/image';

export const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: ${colors.background2};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: all 0.3s ease;

    @media ${devices.tablet} {
        padding: 1rem 4rem;
    }
`;

export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    
    a {
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

export const LogoImage = styled(Image)`
    object-fit: contain;
`;

export const LogoText = styled.span`
    font-family: 'Epilogue', sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    color: ${colors.offwhite};
`;

export const LogoAccent = styled.span`
    font-weight: 800;
    color: ${colors.primaryHighlight};
`;

export const NavLinksContainer = styled.div`
    display: none;
    
    @media ${devices.tablet} {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
`;

export const NavLinkItem = styled.div`
    position: relative;
`;

export const ButtonContainer = styled.div`
    margin-left: 1rem;
`;

// Mobile menu components
export const MobileMenuButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    width: 40px;
    height: 40px;
    padding: 0;
    
    @media ${devices.tablet} {
        display: none;
    }
`;

interface MobileMenuIconProps {
    isOpen: boolean;
}

export const MobileMenuIcon = styled.div<MobileMenuIconProps>`
    position: relative;
    width: 24px;
    height: 2px;
    background-color: ${props => props.isOpen ? 'transparent' : colors.offwhite};
    transition: all 0.3s ease;
    
    &::before, &::after {
        content: '';
        position: absolute;
        width: 24px;
        height: 2px;
        background-color: ${colors.offwhite};
        transition: all 0.3s ease;
    }
    
    &::before {
        transform: ${props => props.isOpen ? 'rotate(45deg)' : 'translateY(-8px)'};
    }
    
    &::after {
        transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'translateY(8px)'};
    }
`;

interface MobileNavLinksContainerProps {
    isOpen: boolean;
}

export const MobileNavLinksContainer = styled.div<MobileNavLinksContainerProps>`
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background-color: ${colors.background2};
    padding: 1.5rem;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${props => props.isOpen ? 1 : 0};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
    z-index: 999;
    
    ${NavLinkItem} {
        margin-bottom: 1rem;
    }
    
    ${ButtonContainer} {
        margin: 0.5rem 0 0 0;
    }
    
    @media ${devices.tablet} {
        display: none;
    }
`; 
