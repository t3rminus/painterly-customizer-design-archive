/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    rootPath: __dirname
  },
  sassOptions: {
    includePaths: ['./styles'],
    prependData: `@use "sass:math"; @use "sass:color"; @import "~@/styles/settings.scss";`,
  },
}

module.exports = nextConfig
