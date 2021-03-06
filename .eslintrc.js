module.exports = {
  parser: "babel-eslint",
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react"],
  rules: {
    'prettier/prettier': 0,
    "react/prop-types": 0
  },
  extends: [
    //"eslint:recommended",
    "plugin:react/recommended",
  ],
};
