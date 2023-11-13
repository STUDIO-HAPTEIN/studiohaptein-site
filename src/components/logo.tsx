// REACT
import React, { FC } from "react";
// GATSBY
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";

interface ImgProps {
  style?: any;
}



export const LogoBunabet: FC<ImgProps> = ({style}) => {
// export function LogoBunabet = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allFile(filter: {name: {eq: "logo_bunabet"}}) {
          edges {
            node {
              name
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    `
  );
  const name = data.allFile.edges[0].node.name;
  const img = data.allFile.edges[0].node.childImageSharp.gatsbyImageData;
  return <div style={style}>
    <GatsbyImage image={getImage(img)} alt={name}/>
  </div>
}
