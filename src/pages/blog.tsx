import React from 'react';
import { NextPage } from 'next';
import styled from '@emotion/styled';
import { Layout } from 'components/shared';
import { BlogList } from 'components/screens/blog';
import { defaultMetaTags, colors } from 'parameters';
import { IBlogPost } from 'models/blog';

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.25rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: ${colors.offwhite};
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: ${colors.body};
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
`;

// Sample blog posts
const BLOG_POSTS: IBlogPost[] = [
  {
    title: 'Understanding Algorithmic Trading Strategies in 2023',
    slug: 'understanding-algorithmic-trading-strategies',
    isFeatured: true,
    highlighted: true,
    topic: 'Development',
    author: 'Sarah Johnson',
    authorEmail: 'sarah@cantradingsolutions.com',
    description: 'Dive into the most effective algorithmic trading strategies that are driving market success in the current financial landscape.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1470&auto=format&fit=crop',
    dateWritten: '2023-10-15',
    content: {} as Document,
    metaTitle: 'Understanding Algorithmic Trading Strategies in 2023',
    metaDescription: 'Learn about modern algorithmic trading approaches that yield results in today\'s volatile markets.',
    metaKeywords: ['algorithmic trading', 'trading strategies', 'financial markets', 'automation'],
    metaImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1470&auto=format&fit=crop',
  },
  {
    title: 'Risk Management in Automated Trading Systems',
    slug: 'risk-management-automated-trading',
    isFeatured: true,
    highlighted: false,
    topic: 'Quality Assurance',
    author: 'Michael Chen',
    authorEmail: 'michael@cantradingsolutions.com',
    description: 'Explore essential risk management techniques to safeguard your investments when using automated trading systems.',
    image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=1470&auto=format&fit=crop',
    dateWritten: '2023-09-28',
    content: {} as Document,
    metaTitle: 'Risk Management in Automated Trading Systems',
    metaDescription: 'Learn how to effectively manage risks in automated trading to protect your investment portfolio.',
    metaKeywords: ['risk management', 'automated trading', 'investment protection', 'trading safeguards'],
    metaImage: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=1470&auto=format&fit=crop',
  },
  {
    title: 'The Impact of Machine Learning on Financial Markets',
    slug: 'machine-learning-impact-financial-markets',
    isFeatured: false,
    highlighted: false,
    topic: 'Development',
    author: 'Alex Torres',
    authorEmail: 'alex@cantradingsolutions.com',
    description: 'How machine learning algorithms are revolutionizing trading decisions and reshaping financial markets worldwide.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop',
    dateWritten: '2023-08-17',
    content: {} as Document,
    metaTitle: 'The Impact of Machine Learning on Financial Markets',
    metaDescription: 'Discover how AI and machine learning are transforming the landscape of financial trading.',
    metaKeywords: ['machine learning', 'artificial intelligence', 'financial markets', 'trading technology'],
    metaImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1470&auto=format&fit=crop',
  },
  {
    title: 'High-Frequency Trading: Opportunities and Challenges',
    slug: 'high-frequency-trading-opportunities-challenges',
    isFeatured: false,
    highlighted: false,
    topic: 'Development',
    author: 'Jessica Park',
    authorEmail: 'jessica@cantradingsolutions.com',
    description: 'A comprehensive look at high-frequency trading, its benefits, risks, and the regulatory landscape shaping its future.',
    image: 'https://images.unsplash.com/photo-1642543492555-733efafd5738?q=80&w=1470&auto=format&fit=crop',
    dateWritten: '2023-07-05',
    content: {} as Document,
    metaTitle: 'High-Frequency Trading: Opportunities and Challenges',
    metaDescription: 'Explore the complex world of high-frequency trading and navigate its unique landscape.',
    metaKeywords: ['high-frequency trading', 'HFT', 'trading technology', 'market automation'],
    metaImage: 'https://images.unsplash.com/photo-1642543492555-733efafd5738?q=80&w=1470&auto=format&fit=crop',
  },
  {
    title: 'Building Resilient Trading Infrastructure',
    slug: 'building-resilient-trading-infrastructure',
    isFeatured: false,
    highlighted: false,
    topic: 'Quality Assurance',
    author: 'Robert Williams',
    authorEmail: 'robert@cantradingsolutions.com',
    description: 'Key considerations for developing robust and reliable technical infrastructure for your trading operations.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop',
    dateWritten: '2023-06-22',
    content: {} as Document,
    metaTitle: 'Building Resilient Trading Infrastructure',
    metaDescription: 'Learn how to create dependable trading systems that can withstand market volatility and technical challenges.',
    metaKeywords: ['trading infrastructure', 'system resilience', 'technical architecture', 'trading systems'],
    metaImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop',
  },
  {
    title: 'Ethical Considerations in Algorithmic Trading',
    slug: 'ethical-considerations-algorithmic-trading',
    isFeatured: false,
    highlighted: false,
    topic: 'Marketing',
    author: 'Emma Rodriguez',
    authorEmail: 'emma@cantradingsolutions.com',
    description: 'Examining the ethical dimensions of algorithmic trading and its broader implications for market fairness and stability.',
    image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=1470&auto=format&fit=crop',
    dateWritten: '2023-05-10',
    content: {} as Document,
    metaTitle: 'Ethical Considerations in Algorithmic Trading',
    metaDescription: 'Delve into the ethical questions surrounding automated trading practices in today\'s markets.',
    metaKeywords: ['ethics', 'algorithmic trading', 'market fairness', 'trading ethics'],
    metaImage: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=1470&auto=format&fit=crop',
  }
];

/**
 * Blog page
 */
const BlogPage: NextPage = () => {
    return (
        <Layout metaTags={{
            ...defaultMetaTags,
            title: 'Blog | CAN Trading Solutions',
            description: 'Latest insights and news about trading and finance',
        }}>
            <BlogContainer>
                <Header>
                    <Title>Our Blog</Title>
                    <Subtitle>
                        Explore the latest insights, trends, and strategies in algorithmic trading
                        and financial technology from our team of experts.
                    </Subtitle>
                </Header>
                <BlogList posts={BLOG_POSTS} />
            </BlogContainer>
        </Layout>
    );
};

export default BlogPage; 