const images = require("remark-images");
const emoji = require("remark-emoji");

const withMDX = require("@next/mdx")({
  options: {
    mdPlugins: [images, emoji]
  }
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx"],
  webpack: (config, { defaultLoaders, isServer, dev }) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty",
      module: "empty"
    };

    return config;
  }
});
