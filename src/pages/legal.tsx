/**
 * Legal
 * 2023-2023
 * v 0.0.2
 * 
 * */
// REACT
import React, { FC } from "react";
// GATSBY
import { HeadFC, graphql } from "gatsby";
// APP
import { Layout, SeoTitle } from "../components/hc";
import { RenderPage } from "../render/hr";

/*
it's necessary to export the Components Page as default
If it's not do, Gatby Router don't find the page and return an error
*/
interface Props {
  data: any;
}

export const Legal: FC<Props> = ({data}) => {
  return<Layout>
    <RenderPage data={data}/>
  </Layout>;
};

export default Legal;

export const Head: HeadFC = ({data}) => <SeoTitle title={data.allMarkdownRemark.edges[0].node.frontmatter.title}/>

export const myQuery = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {categorie: {eq: "legal"}}}) {
      edges {
        node {
          frontmatter {
            categorie
            menu
            lang
            title
          }
          html
        }
      }
    }
  }
`
