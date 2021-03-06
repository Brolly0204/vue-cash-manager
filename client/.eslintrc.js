module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 'off',
    'comma-dangle': 'off',
    'no-shadow': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'import/extensions': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
