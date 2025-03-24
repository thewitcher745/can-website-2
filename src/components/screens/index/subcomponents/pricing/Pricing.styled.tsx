import styled from '@emotion/styled';
import { colors, devices } from 'parameters';

export const Container = styled.section`
    padding: 80px 20px;
    background-color: transparent;
    position: relative;
    
    @media ${devices.tablet} {
        padding: 100px 40px;
    }
    
    @media ${devices.laptop} {
        padding: 120px 60px;
    }
`;

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    color: ${colors.offwhite};
    font-size: 2.5rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

export const Subtitle = styled.p`
    text-align: center;
    margin-bottom: 60px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    color: ${colors.body};
    font-size: 1.2rem;
`;

export const PricingGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    
    @media ${devices.tablet} {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media ${devices.laptop} {
        grid-template-columns: repeat(3, 1fr);
    }
`;

interface PlanCardProps {
    isHighlighted?: boolean;
}

export const PlanCard = styled.div<PlanCardProps>`
    background-color: ${colors.background2};
    border-radius: 8px;
    padding: ${props => props.isHighlighted ? '40px 30px' : '30px'};
    box-shadow: ${props => props.isHighlighted 
        ? '0 15px 35px rgba(0, 0, 0, 0.4)' 
        : '0 8px 25px rgba(0, 0, 0, 0.2)'};
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transform: ${props => props.isHighlighted ? 'scale(1.05)' : 'none'};
    z-index: ${props => props.isHighlighted ? 2 : 1};
    
    @media ${devices.mobileL} {
        transform: none;
    }
    
    &:hover {
        transform: ${props => props.isHighlighted 
            ? 'scale(1.08) translateY(-10px)' 
            : 'scale(1.03) translateY(-10px)'};
            
        @media ${devices.mobileL} {
            transform: translateY(-10px);
        }
    }
`;

export const PlanName = styled.h3`
    color: ${colors.offwhite};
    font-size: 1.5rem;
    margin: 0 0 10px 0;
    text-align: center;
    font-weight: 600;
`;

export const PlanPrice = styled.div`
    font-size: 2.5rem;
    font-weight: 700;
    color: ${colors.primaryHighlight};
    margin: 0 0 10px 0;
    text-align: center;
`;

export const PlanDescription = styled.p`
    color: ${colors.body};
    margin-bottom: 30px;
    text-align: center;
    font-size: 1rem;
`;

export const PlanFeatures = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 30px 0;
    flex-grow: 1;
`;

interface PlanFeatureProps {
    isIncluded: boolean;
}

export const PlanFeature = styled.li<PlanFeatureProps>`
    padding: 10px 0;
    color: ${props => props.isIncluded ? colors.body : 'rgba(176, 176, 176, 0.5)'};
    font-size: 1rem;
    display: flex;
    align-items: center;
    
    &::before {
        content: ${props => props.isIncluded ? '"✓"' : '"×"'};
        margin-right: 10px;
        color: ${props => props.isIncluded ? colors.primaryHighlight : 'rgba(176, 176, 176, 0.5)'};
        font-weight: bold;
    }
`;

interface PlanButtonProps {
    isPrimary: boolean;
}

export const PlanButton = styled.button<PlanButtonProps>`
    background-color: ${props => props.isPrimary ? colors.primaryHighlight : 'transparent'};
    color: ${props => props.isPrimary ? colors.offwhite : colors.primaryHighlight};
    border: 2px solid ${props => props.isPrimary ? colors.primaryHighlight : colors.primaryHighlight};
    border-radius: 4px;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
    margin-top: auto;
    
    &:hover {
        background-color: ${props => props.isPrimary ? '#FF8C00' : 'rgba(254, 154, 0, 0.1)'};
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    &:active {
        transform: translateY(0);
        box-shadow: none;
    }
    
    &:focus {
        outline: none;
    }
`;

export const PlanHighlight = styled.div`
    position: absolute;
    top: 15px;
    right: -40px;
    background-color: ${colors.primaryHighlight};
    color: ${colors.offwhite};
    font-size: 0.875rem;
    font-weight: 600;
    padding: 8px 40px;
    transform: rotate(45deg);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 3;
`; 