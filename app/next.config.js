// /**
//  * @type {import('next').NextConfig}
//  */
//  const nextConfig = [
//     module.exports = {
//         reactStrictMode: false,
//     }
//  ]
  
//   module.exports = nextConfig

module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // delay before rebuilding
    };
    return config;
  },
};