

import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: `studio haptein`,
    version: `0.0.1`,
    siteUrl: `https://www.studiohaptein.com`,
    author: `Stanislas Marçais`,
    google: `nostranslate`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    // MANIFEST
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "STUDIOHAPTEIN",
        short_name: "studio haptein",
        start_url: "/",
        icon: "medias/icon.png", // This path is relative to the root of the site.
        crossOrigin: `use-credentials`,
      },
    },
    // IMAGE
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    // FILE GUI
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/medias/visuel`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      }
    },

    // FILE GUI
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "gui",
        path: `${__dirname}/medias/gui/`,
        // Use "mtime" and "inode" to fingerprint files (to check if file has changed)
        fastHash: true,
      }
    },
    // FILE MD
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `md content fr`,
        path: `${__dirname}/medias/markdown_content/fr`,
      },
    },
    `gatsby-transformer-remark`,
  ],
}

export default config
