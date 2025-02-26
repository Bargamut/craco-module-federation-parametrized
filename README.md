# craco-module-federation-parametrized

## Note

Add module-federation support to your CRA5 project without ejecting and losing update support of react-scripts

![](https://img.shields.io/npm/v/craco-module-federation-parametrized.svg?style=flat)
![](https://img.shields.io/npm/dt/craco-module-federation-parametrized.svg?style=flat)

## Install

```
npm install craco-module-federation-parametrized --save-dev
```

## Usage

1. Add the plugin into your craco.config.js.

- For good old Webpack Module Federtion plugin just leave plugin arguments empty.

```
const cracoModuleFederation = require('craco-module-federation-parametrized');

module.exports = {
    plugins: [{
        plugin: cracoModuleFederation(),
        options: { useNamedChunkIds: true } //THIS LINE IS OPTIONAL
      },
    ]
}
```

- For Module Federaton 2.0 via `@module-federation/enhanced` pass its plugin to `constructor` option:

```
const { ModuleFederationPlugin } = require("@module-federation/enhanced/webpack");
const cracoModuleFederation = require('craco-module-federation-parametrized');

module.exports = {
    plugins: [{
        plugin: cracoModuleFederation({
					constructor: ModuleFederationPlugin
				}),
        options: { useNamedChunkIds: true } //THIS LINE IS OPTIONAL
      },
    ]
}
```


2. create a file named `modulefederation.config.js` in the project root. You should export ModuleFederationPlugin constructor options as json from this module. For example;

```
const deps = require("./package.json").dependencies;

module.exports = {
  name: "app1",
  exposes: {
    "./Button": "./src/Button",
  },
  remotes: {
    app2: "app2@http://localhost:3002/remoteEntry.js",
  },
  filename: "remoteEntry.js",
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
};

```

3. Update the scripts section of your package.json as follows:

```
  ...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "craco:build": "craco build",
    "craco:start": "craco start",
    ...
```

## Testing the plugin locally

There are two test apps in this repository inside test folder (app1 and app2). Install their dependencies on them using yarn (`npm install`) and hit `npm start` on both of them. When you navigate to app1 it should render the exported button from app2 that says `hello from app2`

## License

Licensed under the MIT License, Copyright ©️ 2021 Hasan Ayan. See [LICENSE.md](LICENSE) for more information.
