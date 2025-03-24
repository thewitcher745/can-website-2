import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { colors, devices } from 'parameters';
import { IBlogPost } from 'models/blog';

interface BlogCardProps {
  post: IBlogPost;
}

const Card = styled.div`
  background-color: ${colors.background2};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: ${colors.body};
`;

const TopicTag = styled.span`
  background-color: rgba(254, 154, 0, 0.1);
  color: ${colors.primaryHighlight};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const Title = styled.h3`
  color: ${colors.offwhite};
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  
  @media ${devices.tablet} {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  color: ${colors.body};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const ReadMore = styled.a`
  color: ${colors.primaryHighlight};
  font-weight: 600;
  text-decoration: none;
  position: relative;
  transition: all 0.2s ease;
  align-self: flex-start;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${colors.primaryHighlight};
    transition: width 0.2s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formattedDate = new Date(post.dateWritten).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <Card>
      <ImageContainer>
        <Image src={post.image} alt={post.title} />
      </ImageContainer>
      <Content>
        <Meta>
          <TopicTag>{post.topic}</TopicTag>
          <span>{formattedDate}</span>
        </Meta>
        <Title>{post.title}</Title>
        <Description>{post.description}</Description>
        <Link href={`/blog/${post.slug}`} passHref>
          <ReadMore>Read More</ReadMore>
        </Link>
      </Content>
    </Card>
  );
}; 