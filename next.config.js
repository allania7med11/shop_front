module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  }
};
