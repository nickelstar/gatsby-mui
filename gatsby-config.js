module.exports = {
    siteMetadata: {
        title: 'Kebabs Worldwide',
        description: `A demo site to show off several technical integrations: Gatsby, AWS Amplify, and the Material UI framework.`,
        author: `Nicholas Gates`,
    },
    plugins: [
        'gatsby-plugin-top-layout',
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        // If you want to use styled components you should add the plugin here.
        // 'gatsby-plugin-styled-components',
        'gatsby-plugin-react-helmet',
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        {
            resolve: `gatsby-plugin-offline`,
            options: {
                precachePages: [`/talkers/`],
            },
        },
        {
            resolve: 'gatsby-plugin-eslint',
            options: {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules|.cache|public|plugins)/,
                stages: ['develop'],
                options: {
                    emitWarning: true,
                    failOnError: false
                }
            }
        },
        {
            resolve: 'gatsby-plugin-material-ui',
            // If you want to use styled components you should change the injection order.
            options: {
                // stylesProvider: {
                //   injectFirst: true,
                // },
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
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },

    ],

};
