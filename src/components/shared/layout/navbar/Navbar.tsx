import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'components/shared/buttons';
import { NavItem } from 'components/shared/typography';
import { routes, colors } from 'parameters';
import { 
    NavbarContainer, 
    LogoContainer, 
    NavLinksContainer, 
    NavLinkItem,
    ButtonContainer,
    LogoText,
    LogoAccent,
    MobileMenuButton,
    MobileMenuIcon,
    MobileNavLinksContainer,
    LogoImage
} from './Navbar.styled';

/**
 * Navbar component for the main site navigation
 */
export const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <NavbarContainer>
            <LogoContainer>
                <Link href={routes.home} passHref>
                    <a>
                        <LogoImage src="/images/logos/can-logo.png" alt="CAN Logo" width={60} height={60} />
                        <LogoText>
                            <LogoAccent>CAN</LogoAccent> Trading Solutions
                        </LogoText>
                    </a>
                </Link>
            </LogoContainer>
            
            <MobileMenuButton onClick={toggleMobileMenu}>
                <MobileMenuIcon isOpen={mobileMenuOpen} />
            </MobileMenuButton>
            
            <NavLinksContainer>
                <NavLinkItem>
                    <NavItem 
                        text="Services" 
                        href={`${routes.home}#services`} 
                        isActive={false}
                    />
                </NavLinkItem>
                <NavLinkItem>
                    <NavItem 
                        text="Results" 
                        href={`${routes.home}#results`} 
                        isActive={false}
                    />
                </NavLinkItem>
                <NavLinkItem>
                    <NavItem 
                        text="Pricing" 
                        href={`${routes.home}#pricing`} 
                        isActive={false}
                    />
                </NavLinkItem>
                <NavLinkItem>
                    <NavItem 
                        text="Blog" 
                        href={routes.blog} 
                        isActive={false}
                    />
                </NavLinkItem>
                <NavLinkItem>
                    <NavItem 
                        text="Contact" 
                        href={routes.contact} 
                        isActive={false}
                    />
                </NavLinkItem>
                <ButtonContainer>
                    <Button 
                        variant="secondary"
                        size="small"
                        href={routes.login}
                    >
                        Log In
                    </Button>
                </ButtonContainer>
            </NavLinksContainer>
            
            {/* Mobile Menu */}
            <MobileNavLinksContainer isOpen={mobileMenuOpen}>
                <NavLinkItem>
                    <NavItem 
                        text="Services" 
                        href={`${routes.home}#services`}
                        isActive={false}
                        onClick={closeMenu}
                    />
                </NavLinkItem>
                <NavLinkItem>
                    <NavItem 
                        text="Results" 
                        href={`${routes.home}#results`}
                        isActive={false}
                        onClick={closeMenu}
                    />
                </NavLinkItem>
                <NavLinkItem>
                    <NavItem 
                        text="Pricing" 
                        href={`${routes.home}#pricing`}
                        isActive={false}
                        onClick={closeMenu}
                    />
                </NavLinkItem>
                <NavLinkItem>
                    <NavItem 
                        text="Blog" 
                        href={routes.blog} 
                        isActive={false}
                        onClick={closeMenu}
                    />
                </NavLinkItem>
                <NavLinkItem>
                    <NavItem 
                        text="Contact" 
                        href={routes.contact} 
                        isActive={false}
                        onClick={closeMenu}
                    />
                </NavLinkItem>
                
                <ButtonContainer>
                    <Button 
                        variant="secondary"
                        size="small"
                        href={routes.login}
                        onClick={closeMenu}
                    >
                        Log In
                    </Button>
                </ButtonContainer>
            </MobileNavLinksContainer>
        </NavbarContainer>
    );
}; 