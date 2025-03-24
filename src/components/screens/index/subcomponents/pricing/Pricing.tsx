import React from 'react';
import { 
    Container, 
    Title, 
    Subtitle,
    PricingGrid, 
    PlanCard, 
    PlanName, 
    PlanPrice,
    PlanDescription,
    PlanFeatures,
    PlanFeature,
    PlanButton,
    PlanHighlight
} from './Pricing.styled';

export interface PlanFeature {
    id: string;
    text: string;
    included: boolean;
}

export interface PricingPlan {
    id: string;
    name: string;
    price: string;
    description: string;
    features: PlanFeature[];
    highlight?: boolean;
}

export interface PricingProps {
    title: string;
    subtitle?: string;
    plans: PricingPlan[];
}

/**
 * Pricing section component displaying available service tiers
 */
export const Pricing: React.FC<PricingProps> = ({ 
    title,
    subtitle,
    plans = []
}) => {
    return (
        <Container id="pricing">
            <Title>{title}</Title>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
            
            <PricingGrid>
                {plans.map((plan) => (
                    <PlanCard key={plan.id} isHighlighted={plan.highlight}>
                        <PlanName>{plan.name}</PlanName>
                        <PlanPrice>{plan.price}</PlanPrice>
                        <PlanDescription>{plan.description}</PlanDescription>
                        
                        <PlanFeatures>
                            {plan.features.map((feature) => (
                                <PlanFeature 
                                    key={feature.id} 
                                    isIncluded={feature.included}
                                >
                                    {feature.included ? '✓' : '×'} {feature.text}
                                </PlanFeature>
                            ))}
                        </PlanFeatures>
                        
                        {plan.highlight ? (
                            <PlanButton isPrimary>Get Started</PlanButton>
                        ) : (
                            <PlanButton isPrimary={false}>Select Plan</PlanButton>
                        )}
                        
                        {plan.highlight && <PlanHighlight>Most Popular</PlanHighlight>}
                    </PlanCard>
                ))}
            </PricingGrid>
        </Container>
    );
}; 