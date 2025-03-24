import React from 'react';
import { Container, Title, ServiceGrid, ServiceCard, ServiceIcon, ServiceTitle, ServiceDescription, TitleUnderline } from './Services.styled';

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface ServicesProps {
    title: string;
    services: ServiceItem[];
}

/**
 * Services section component displaying available trading services
 */
export const Services: React.FC<ServicesProps> = ({ 
    title,
    services = []
}) => {
    return (
        <Container id="services">
            <Title>{title}</Title>
            <ServiceGrid>
                {services.map((service) => (
                    <ServiceCard key={service.id}>
                        <ServiceIcon>{service.icon}</ServiceIcon>
                        <ServiceTitle>{service.title}</ServiceTitle>
                        <TitleUnderline />
                        <ServiceDescription>{service.description}</ServiceDescription>
                    </ServiceCard>
                ))}
            </ServiceGrid>
        </Container>
    );
}; 