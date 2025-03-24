import React from 'react';
import Link from 'next/link';
import { routes } from 'parameters';
import {
    FooterWrapper,
    FooterContainer,
    FooterSection,
    FooterSectionTitle,
    FooterNavList,
    FooterNavItem,
    ContactItem,
    SocialLinks,
    Copyright
} from './Footer.styled';

/**
 * Footer component with company information and links
 */
export const Footer: React.FC = () => {
    return (
        <FooterWrapper>
            <FooterContainer>
                <FooterSection>
                    <FooterSectionTitle>CAN Trading Solutions</FooterSectionTitle>
                    <p style={{ color: '#B0B0B0', marginBottom: '1rem' }}>
                        Providing professional trading solutions and strategic financial services for businesses and individuals.
                    </p>
                    <SocialLinks>
                        <a href="#" aria-label="Twitter">𝕏</a>
                        <a href="#" aria-label="LinkedIn">in</a>
                        <a href="#" aria-label="Facebook">f</a>
                        <a href="#" aria-label="Instagram">📷</a>
                    </SocialLinks>
                </FooterSection>
                
                <FooterSection>
                    <FooterSectionTitle>Quick Links</FooterSectionTitle>
                    <FooterNavList>
                        <FooterNavItem><a href="#services">Services</a></FooterNavItem>
                        <FooterNavItem><a href="#results">Results</a></FooterNavItem>
                        <FooterNavItem><a href="#pricing">Pricing</a></FooterNavItem>
                        <FooterNavItem><Link href={routes.blog}><a>Blog</a></Link></FooterNavItem>
                        <FooterNavItem><Link href={routes.contact}><a>Contact Us</a></Link></FooterNavItem>
                    </FooterNavList>
                </FooterSection>
                
                <FooterSection>
                    <FooterSectionTitle>About Us</FooterSectionTitle>
                    <p style={{ color: '#B0B0B0', marginBottom: '1rem' }}>
                        CAN Trading Solutions was founded in 2015 with a mission to provide innovative algorithmic trading solutions for individuals and businesses.
                    </p>
                    <p style={{ color: '#B0B0B0' }}>
                        Our team of experts combines financial knowledge with cutting-edge technology to deliver exceptional results.
                    </p>
                </FooterSection>
                
                <FooterSection>
                    <FooterSectionTitle>Contact Info</FooterSectionTitle>
                    <ContactItem>
                        <span>📍</span> 123 Financial District, New York, NY 10005
                    </ContactItem>
                    <ContactItem>
                        <span>📞</span> +1 (555) 123-4567
                    </ContactItem>
                    <ContactItem>
                        <span>✉️</span> info@cantradingsolutions.com
                    </ContactItem>
                    <ContactItem>
                        <span>🕒</span> Monday-Friday: 9am-5pm EST
                    </ContactItem>
                </FooterSection>
            </FooterContainer>
            
            <Copyright>
                &copy; {new Date().getFullYear()} CAN Trading Solutions. All rights reserved.
                <div style={{ marginTop: '0.5rem' }}>
                    <Link href="/privacy-policy"><a style={{ color: '#B0B0B0', marginRight: '1rem' }}>Privacy Policy</a></Link>
                    <Link href="/terms"><a style={{ color: '#B0B0B0' }}>Terms of Service</a></Link>
                </div>
            </Copyright>
        </FooterWrapper>
    );
}; 