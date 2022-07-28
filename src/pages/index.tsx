import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Frontmatter from "../models/frontmatter";
import MarkdownRemark from "../models/markdown-remark";

interface IndexPageProps {
  frontmatter: Frontmatter
}
const IndexPage: React.FunctionComponent = () => {
  const data = useStaticQuery(graphql`
  {
    markdownRemark(frontmatter: {templateKey: {eq: "index-page"} }) {
      frontmatter {
        title,
        description
      }
    }
  }`);

  const markdownRemark: MarkdownRemark = data.markdownRemark;

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello World!</h1>
      <div>
        {markdownRemark.frontmatter.title}
        {markdownRemark.frontmatter.description}
      </div>
    </div>
  )
}

export default IndexPage