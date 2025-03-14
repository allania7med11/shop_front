const isSSGBuild = process.env.BUILD_TARGET === 'ssg';

module.exports = {
  output: isSSGBuild ? 'export' : undefined, // Enables static export
  distDir: isSSGBuild ? 'shop_front' : '.next', // Use a custom folder for SSG
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
