import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { Layout } from '../../components/layout';
import { PostWrapper } from '../../components/blog/PostWrapper';
import { H3 } from '../../components/typography';

const Blog = ({ data }) => {
	const blogData = data.allSanityPost.edges;

	const seo = {
		title: 'Blog',
	};

	console.log(blogData);

	const postList = blogData.map((post) => {
		return (
			<PostWrapper
				key={post.node._id}
				title={post.node.title}
				excerpt={post.node.excerpt}
				link={post.node.slug.current}
			/>
		);
	});

	return (
		<Layout seo={seo}>
			<Wrapper>
				<H3 textAlign="center">Recent posts</H3>
				{postList}
			</Wrapper>
		</Layout>
	);
};

export default Blog;

export const query = graphql`
	query BlogQuery {
		allSanityPost {
			edges {
				node {
					title
					slug {
						current
					}
					excerpt
					_id
				}
			}
		}
	}
`;

const Wrapper = styled.section`
	max-width: 100ch;
	margin: 0 auto;
	padding: 0 1rem;
`;
