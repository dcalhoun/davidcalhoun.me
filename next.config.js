const bsconfig = require("./bsconfig.json");
const withTM = require("next-transpile-modules")(
  ["bs-platform"].concat(bsconfig["bs-dependencies"])
);

module.exports = withTM({
  pageExtensions: ["js", "bs.js"],
  webpack: (config) => {
    return {
      ...config,
      // Mock `fs` module for client packages
      // https://webpack.js.org/configuration/node/#node
      node: {
        fs: "empty",
        module: "empty",
      },
    };
  },
});
