import styled from '@emotion/styled';
import { colors, devices } from 'parameters';

export const TitleUnderline = styled.div`
    height: 2px;
    width: 40px;
    background-color: ${colors.primaryHighlight};
    margin-bottom: 15px;
    transition: width 0.3s ease;
`;

export const Container = styled.section`
    padding: 80px 20px;
    background-color: transparent;
    
    @media ${devices.tablet} {
        padding: 100px 40px;
    }
    
    @media ${devices.laptop} {
        padding: 120px 60px;
    }
`;

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 60px;
    color: ${colors.offwhite};
    font-size: 2.5rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

export const ServiceGrid = styled.div`
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

export const ServiceCard = styled.div`
    background-color: ${colors.background2};
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        
        /* Make underline extend to full width on hover */
        ${TitleUnderline} {
            width: 100%;
        }
    }
`;

export const ServiceIcon = styled.div`
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: ${colors.primaryHighlight};
`;

export const ServiceTitle = styled.h3`
    margin-bottom: 8px;
    color: ${colors.offwhite};
    font-size: 1.5rem;
    font-weight: 600;
`;

export const ServiceDescription = styled.p`
    color: ${colors.body};
    line-height: 1.6;
    font-size: 1rem;
`; 
