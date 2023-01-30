const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@assets': './src/assets',
    '@components': './src/components',
    '@constants': './src/constants',
    '@pages': './src/pages',
    '@hooks': './src/hooks',
    '@queries': './src/queries',
    '@utils': './src/utils',
    '@interfaces': './src/interfaces',
    '@store': './src/store',
    '@types': './src/types',
    '@validation': './src/validation',
    '@styles': './src/constants/styles',
  })(config);

  return config;
};
