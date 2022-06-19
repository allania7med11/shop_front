module.exports = {
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path/",
        destination: `${process.env.SHOP_BACKEND_URL}/api/:path/`,
      },
    ];
  },
};
