const { getLoaders, loaderByName } = require("@craco/craco");

/* NOTE: This is **enhanced** Module Federation plugin */
const { ModuleFederationPlugin } = require("@module-federation/enhanced/webpack");
const cracoModuleFederationPlugin = require("./plugin.js");

module.exports = {
  plugins: [
    {
      plugin: cracoModuleFederationPlugin({
				constructor: ModuleFederationPlugin
			}),
    },
  ],
  webpack: {
		configure: (webpackConfig) => {
			const { hasFoundAny, matches } = getLoaders(webpackConfig, loaderByName('babel-loader'));
						
			if (hasFoundAny) {
				// NOTE: For CRA usage add `.cjs` support to fix logger request crash; loader with `@babel(?:\/|\\{1,2})runtime` exclusion. See: https://github.com/module-federation/core/issues/3137#issuecomment-2458218747
				matches[1].loader.test = /\.(js|mjs|cjs)$/;
			}

			return webpackConfig;
		},
    plugins: {
      remove: ["ModuleScopePlugin"],
    },
  },
};
