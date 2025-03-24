import React from 'react';
import styled from '@emotion/styled';
import { IBlogPost } from 'models/blog';
import { BlogCard } from './BlogCard';
import { devices } from 'parameters';

interface BlogListProps {
  posts: IBlogPost[];
}

const BlogGrid = styled.div`
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

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.colors.body};
`;

export const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  if (!posts.length) {
    return <EmptyState>No blog posts found.</EmptyState>;
  }
  
  return (
    <BlogGrid>
      {posts.map(post => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </BlogGrid>
  );
}; 