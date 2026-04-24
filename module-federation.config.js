// @ts-check
import { createModuleFederationConfig } from '@module-federation/enhanced/rspack';

/** Remote: consumed by a host as `mfe2` — e.g. `import('mfe2/App')` with remotes `mfe2@http://localhost:3001/remoteEntry.js` */
export default createModuleFederationConfig({
  name: 'mfe2',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App.jsx',
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: '^19.0.0',
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '^19.0.0',
    },
  },
});
