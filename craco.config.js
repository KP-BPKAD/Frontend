// frontend/craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      // Hanya untuk production build, disable ESLint warnings-as-errors
      if (env === 'production') {
        const eslintRule = webpackConfig.module.rules.find(rule =>
          rule.use && rule.use.some(u => u.loader && u.loader.includes('eslint'))
        );
        if (eslintRule) {
          eslintRule.enforce = 'pre';
          eslintRule.use = eslintRule.use.filter(u => !u.loader.includes('eslint'));
        }
      }
      return webpackConfig;
    },
  },
};