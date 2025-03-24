import styled from '@emotion/styled';
import { colors } from 'parameters';
import { devices } from 'parameters';

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.25rem;
`;

export const Section = styled.section`
  padding: 4rem 0;
  position: relative;
  
  @media ${devices.tablet} {
    padding: 5rem 0;
  }
  
  @media ${devices.laptop} {
    padding: 6rem 0;
  }
`;

export const SectionDark = styled(Section)`
  background-color: ${colors.background2};
  color: ${colors.offwhite};
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media ${devices.tablet} {
    flex-direction: row;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media ${devices.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media ${devices.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ContentBox = styled.div`
  background-color: ${colors.background2};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const HeroBanner = styled.div`
  position: relative;
  padding: 6rem 0;
  text-align: center;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(10, 10, 10, 0.7) 0%, rgba(30, 30, 30, 0.8) 100%);
    z-index: -1;
  }
  
  @media ${devices.tablet} {
    padding: 8rem 0;
    text-align: left;
  }
`;

export const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 3rem 0;
`; 