import { graphql } from "gatsby";
import React from "react";
import MarkdownRemark from "../models/markdown-remark";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------
export interface BlogPostData {
	markdownRemark: MarkdownRemark
}
export interface BlogPostTemplateProps {
	data: BlogPostData;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Component
// -----------------------------------------------------------------------------------------

const BlogPostTemplate: React.FC<BlogPostData> = (props: BlogPostData) => {
    console.log(props)
	return (

		<div>
			<h1 className="text-3xl font-bold underline">Blog post</h1>

			<div>
				{props.markdownRemark.frontmatter.title}
				{props.markdownRemark.frontmatter.description}
			</div>
		</div>
	);
};

// #endregion Component

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export default BlogPostTemplate;
const pageQuery = graphql`
	query BlogPostBySlug(
		$id: String!
		$previousPostId: String
		$nextPostId: String
	) {
		site {
			siteMetadata {
				title
			}
		}
		markdownRemark(id: { eq: $id }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
			}
		}
		previous: markdownRemark(id: { eq: $previousPostId }) {
			fields {
				slug
			}
			frontmatter {
				title
			}
		}
		next: markdownRemark(id: { eq: $nextPostId }) {
			fields {
				slug
			}
			frontmatter {
				title
			}
		}
	}
`;

// #endregion Exports
