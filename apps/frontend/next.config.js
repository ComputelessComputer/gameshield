/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // This allows using custom elements in React
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: [
              ['@babel/plugin-transform-react-jsx', { throwIfNamespace: false }]
            ]
          }
        }
      ]
    });
    return config;
  }
};

module.exports = nextConfig;
