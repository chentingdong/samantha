export default {
  parser: "@typescript-eslint/parser",
  root: true,
  env: {
    node: true,
    es6: true,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
  ],
  settings: {
    "import/resolver": {
      // this loads <rootdir>/tsconfig.json to eslint
      typescript: {},
    },
  },
}
