module.exports = {
  output: 'export',
  distDir: 'shop_front',
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
