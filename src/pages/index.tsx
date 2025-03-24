import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import useWindowSize from 'hooks/useWindowSize';
import { Layout, LayoutContainer } from 'components/shared';
import { getHome, Welcome, Results, Services, Pricing } from 'components/screens/index';
import { defaultMetaTags } from 'parameters';


interface ServerSideProps {}

const IndexPage: NextPage<ServerSideProps> = (props: ServerSideProps) => {
	const screenSize = useWindowSize();
	const home = getHome({ screenSize });

	return (
		<Layout metaTags={defaultMetaTags}>
			<LayoutContainer>
				<Welcome 
					title={home.welcome.title} 
					subtitle={home.welcome.subtitle}
					description={home.welcome.description}
				/>
				<Services
					title="Our Services"
					services={[
						{
							id: 'service-1',
							title: 'Algorithmic Trading',
							description: 'Custom algorithmic trading solutions designed to optimize your investment strategies and execute trades with precision.',
							icon: '📊'
						},
						{
							id: 'service-2',
							title: 'Risk Management',
							description: 'Comprehensive risk assessment and management plans to protect your investments and minimize potential losses.',
							icon: '🛡️'
						},
						{
							id: 'service-3',
							title: 'Market Analysis',
							description: 'In-depth market analysis and insights to help you make informed trading decisions based on current trends.',
							icon: '📈'
						},
						{
							id: 'service-4',
							title: 'Portfolio Optimization',
							description: 'Strategic portfolio diversification and optimization services to maximize returns while balancing risk.',
							icon: '💼'
						},
						{
							id: 'service-5',
							title: 'Trading Education',
							description: 'Professional trading education and mentorship programs tailored to your skill level and investment goals.',
							icon: '🎓'
						},
						{
							id: 'service-6',
							title: 'Custom Solutions',
							description: 'Bespoke trading solutions and consulting services designed to meet your specific financial objectives.',
							icon: '⚙️'
						}
					]}
				/>
				<Results 
					title="Our Results"
					results={[
						{
							id: 'result-1',
							title: 'Portfolio Performance 2023',
							description: 'Our algorithmic trading strategies delivered an average return of 24.7% in 2023, outperforming the market by 12.3%.',
							image: 'https://picsum.photos/id/101/800/500'
						},
						{
							id: 'result-2',
							title: 'Risk Management Success',
							description: 'Reduced volatility by 18% across client portfolios while maintaining strong returns through our advanced risk management techniques.',
							image: 'https://picsum.photos/id/201/800/500'
						},
						{
							id: 'result-3',
							title: 'Client Satisfaction',
							description: '97% of our clients have remained with us for over 3 years, testament to our consistent performance and excellent service.',
							image: 'https://picsum.photos/id/301/800/500'
						},
						{
							id: 'result-4',
							title: 'Market Adaptation',
							description: 'Our algorithms successfully navigated the recent market turbulence, maintaining positive returns during the sector-wide downturn.',
							image: 'https://picsum.photos/id/401/800/500'
						}
					]}
				/>
				<Pricing
					title="Pricing Plans"
					subtitle="Choose the plan that fits your trading needs and investment goals."
					plans={[
						{
							id: 'basic',
							name: 'Basic',
							price: '$149/mo',
							description: 'Essential trading tools for individual traders.',
							features: [
								{ id: 'b1', text: 'Basic algorithmic trading', included: true },
								{ id: 'b2', text: 'Market analysis reports', included: true },
								{ id: 'b3', text: 'Standard customer support', included: true },
								{ id: 'b4', text: 'Single trading strategy', included: true },
								{ id: 'b5', text: 'Portfolio optimization', included: false },
								{ id: 'b6', text: 'Risk management tools', included: false },
								{ id: 'b7', text: 'Advanced indicators', included: false },
								{ id: 'b8', text: 'Dedicated account manager', included: false }
							]
						},
						{
							id: 'premium',
							name: 'Premium',
							price: '$299/mo',
							description: 'Advanced suite for serious traders and small businesses.',
							features: [
								{ id: 'p1', text: 'Advanced algorithmic trading', included: true },
								{ id: 'p2', text: 'Comprehensive market analysis', included: true },
								{ id: 'p3', text: 'Priority customer support', included: true },
								{ id: 'p4', text: 'Multiple trading strategies', included: true },
								{ id: 'p5', text: 'Portfolio optimization', included: true },
								{ id: 'p6', text: 'Risk management tools', included: true },
								{ id: 'p7', text: 'Advanced indicators', included: false },
								{ id: 'p8', text: 'Dedicated account manager', included: false }
							],
							highlight: true
						},
						{
							id: 'vip',
							name: 'VIP',
							price: '$599/mo',
							description: 'Enterprise-level solutions for professional traders and institutions.',
							features: [
								{ id: 'v1', text: 'Custom algorithmic trading', included: true },
								{ id: 'v2', text: 'Real-time market analysis', included: true },
								{ id: 'v3', text: '24/7 VIP customer support', included: true },
								{ id: 'v4', text: 'Unlimited trading strategies', included: true },
								{ id: 'v5', text: 'Advanced portfolio optimization', included: true },
								{ id: 'v6', text: 'Enterprise risk management', included: true },
								{ id: 'v7', text: 'Proprietary indicators', included: true },
								{ id: 'v8', text: 'Dedicated account manager', included: true }
							]
						}
					]}
				/>
			</LayoutContainer>
		</Layout>
	);
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async () => {
	return {
		props: {

		}
	};
};
