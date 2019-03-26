module.exports = {
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['cypress'],
  settings: {
    react: {
      version: '16.0',
    },
  },
  env: {
    'cypress/globals': true,
  },
};
