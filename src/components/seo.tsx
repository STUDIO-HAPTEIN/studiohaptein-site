
import React, { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby'

interface ISeo {
    title?: string | any;
  }

export const SeoTitle : FC<ISeo> = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <title>{title} {data.site.siteMetadata.title}</title>
  )
}
