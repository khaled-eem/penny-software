const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/api'),  
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: join(__dirname, 'src', 'main.ts'), 
      tsConfig: join(__dirname, 'tsconfig.json'), 
      assets: [join(__dirname, 'src', 'assets')],  
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
};
