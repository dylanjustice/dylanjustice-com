module.exports = {
	siteMetadata: {
		title: `Dylan Justice`,
		author: {
			name: `Dylan Justice`,
			summary: `A personal record of professional lessons learned from developing software. I'll make this fancy later.`,
		},
		description: `Personal Blog`,
		siteUrl: `https://dylanjustice.com`,
		social: {
			twitter: `dylancjustice`,
			linkedIn: `https://www.linkedin.com/in/dylan-c-justice/`,
		},
	},
	graphqlTypegen: {
		typesOutputPath: `./gatsby-types.d.ts`,
	},
	plugins: [
		`gatsby-plugin-image`,
		`gatsby-plugin-ts`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/blog`,
				name: `blog`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: "gatsby-plugin-google-tagmanager",
			options: {
				id: "G-DKW438KHZ4",
				includeInDevelopment: false,
				defaultDataLayer: { platform: "gatsby" }
			},
		},
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "325161812",
        head: false,
        anonymize: true,
        siteSpeedSampleRate: 10,
        cookieDomain: "dylanjustice.com",
        enableWebVitalsTracking: true,
      },
    },
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 630,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
				],
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
				feeds: [
					{
						serialize: ({ query: { site, allMarkdownRemark } }) => {
							return allMarkdownRemark.nodes.map((node) => {
								return Object.assign({}, node.frontmatter, {
									description: node.excerpt,
									date: node.frontmatter.date,
									url: site.siteMetadata.siteUrl + node.fields.slug,
									guid: site.siteMetadata.siteUrl + node.fields.slug,
									custom_elements: [{ "content:encoded": node.html }],
								});
							});
						},
						query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
						output: "/rss.xml",
						title: "Gatsby Starter Blog RSS Feed",
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Gatsby Starter Blog`,
				short_name: `GatsbyJS`,
				start_url: `/`,
				background_color: `#ffffff`,
				// This will impact how browsers show your PWA/website
				// https://css-tricks.com/meta-theme-color-and-trickery/
				// theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
			},
		},
	],
};
