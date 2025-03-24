import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Title, 
    Carousel, 
    ResultCard, 
    ResultImage, 
    ResultTitle, 
    ResultDescription,
    ControlButton,
    CarouselControls,
    CarouselWrapper,
    IndicatorsContainer,
    Indicator
} from './Results.styled';

export interface ResultItem {
    id: string;
    title: string;
    description: string;
    image: string;
}

export interface ResultsProps {
    title: string;
    results: ResultItem[];
}

/**
 * Results section component displaying company performance
 */
export const Results: React.FC<ResultsProps> = ({ 
    title,
    results = []
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    const goToSlide = (index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex(index);
        setTimeout(() => setIsTransitioning(false), 500); // Match transition duration
    };
    
    const nextSlide = () => {
        goToSlide((activeIndex + 1) % results.length);
    };
    
    const prevSlide = () => {
        goToSlide((activeIndex - 1 + results.length) % results.length);
    };
    
    // Auto advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        
        return () => clearInterval(interval);
    }, [activeIndex]);
    
    return (
        <Container id="results">
            <Title>{title}</Title>
            
            <CarouselWrapper>
                <Carousel style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                    {results.map((result) => (
                        <ResultCard key={result.id}>
                            <ResultImage src={result.image} alt={result.title} />
                            <ResultTitle>{result.title}</ResultTitle>
                            <ResultDescription>{result.description}</ResultDescription>
                        </ResultCard>
                    ))}
                </Carousel>
                
                <CarouselControls>
                    <ControlButton onClick={prevSlide} aria-label="Previous result">
                        &#8592;
                    </ControlButton>
                    <ControlButton onClick={nextSlide} aria-label="Next result">
                        &#8594;
                    </ControlButton>
                </CarouselControls>
                
                <IndicatorsContainer>
                    {results.map((_, index) => (
                        <Indicator 
                            key={index} 
                            isActive={index === activeIndex}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </IndicatorsContainer>
            </CarouselWrapper>
        </Container>
    );
}; 