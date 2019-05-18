const path = require('path');

const { ANALYZE: analyze } = process.env;

const CACHE_MAX_AGE = 10 * 365.25 * 24 * 60 * 60;

module.exports = {
  siteMetadata: {
    lang: 'ru',
    siteUrl: 'https://govorov.online',

    themeColor: '#ffffff',

    title: 'Николай Говоров',
    author: 'Николай Говоров',
    email: 'nikolay_govorov@bk.ru',
    description: 'Живу в Питере, работаю фронтенд-разработчиком для ВКонтакте',
    authorBirthDate: '1999-09-24',

    job: {
      name: 'SEMrush',
      url: 'https://semrush.com',
    },
  },
  plugins: [
    'gatsby-plugin-postcss',

    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: path.resolve('./src/partials/layout/layout.js'),
      },
    },

    'gatsby-plugin-react-helmet',

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'src', 'pages'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files',
        ],
      },
    },

    'gatsby-plugin-feed',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',

    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        allPageHeaders: [
          `Strict-Transport-Security: max-age=${CACHE_MAX_AGE}; includeSubDomains; preload`,
          'X-Content-Type-Options: nosniff',
          'Content-Security-Policy: connect-src \'self\'; object-src \'none\'; frame-ancestors \'none\'; form-action \'none\'; base-uri \'none\'',
        ],
        headers: (() => {
          const cacheAll = (type, paths) => paths.reduce((acc, url) => ({
            ...acc,

            [url]: [`Cache-Control: ${type}`],
          }), {});

          return {
            // Long-term cache by default.
            ...cacheAll(`max-age=${CACHE_MAX_AGE}`, [ // To cache for 10 years
              '/*.js', '/*.css', '/*.png', '/*.jpg', '/*.webp', 'woff2',
            ]),

            // And here are the exceptions:
            ...cacheAll('must-revalidate, max-age=3600', ['/', '/manifest.json', '/robots.txt', '/rss.xml, /sitemap.xml']),
          };
        })(),
      },
    },

    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$/,
        exclude: /(node_modules|\.cache|public)/,
        options: {
          emitWarning: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        production: analyze,
      },
    },

    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/index.js`,
      },
    },
  ],
};
