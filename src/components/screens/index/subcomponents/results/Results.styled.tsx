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
    margin-bottom: 60px;
    color: ${colors.offwhite};
    font-size: 2.5rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

export const CarouselWrapper = styled.div`
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
`;

export const Carousel = styled.div`
    display: flex;
    transition: transform 0.5s ease-in-out;
    height: 100%;
`;

export const ResultTitle = styled.h3`
    padding: 20px 20px 10px;
    color: ${colors.offwhite};
    font-size: 1.5rem;
    margin: 0;
    transition: transform 0.3s ease;
`;

export const ResultCard = styled.div`
    flex: 0 0 100%;
    position: relative;
    background-color: ${colors.background2};
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 400px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    @media ${devices.tablet} {
        min-height: 500px;
    }
    
    &:hover {
        ${ResultTitle} {
            transform: translateY(-5px);
        }
    }
`;

export const ResultImage = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: transform 0.3s ease;
    
    @media ${devices.tablet} {
        height: 350px;
    }
    
    ${ResultCard}:hover & {
        transform: scale(1.05);
    }
`;

export const ResultDescription = styled.p`
    padding: 0 20px 20px;
    color: ${colors.body};
    line-height: 1.6;
    font-size: 1rem;
    flex-grow: 1;
`;

export const CarouselControls = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0;
    z-index: 10;
`;

export const ControlButton = styled.button`
    background-color: rgba(20, 20, 20, 0.7);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    color: ${colors.offwhite};
    margin: 0 15px;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    
    &:hover {
        background-color: ${colors.primaryHighlight};
        color: ${colors.offwhite};
        transform: scale(1.1);
    }
    
    &:focus {
        outline: none;
    }
`;

export const IndicatorsContainer = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 10;
`;

interface IndicatorProps {
    isActive: boolean;
}

export const Indicator = styled.button<IndicatorProps>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background-color: ${props => props.isActive ? colors.primaryHighlight : 'rgba(255, 255, 255, 0.2)'};
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        transform: scale(1.2);
    }
    
    &:focus {
        outline: none;
    }
`; 