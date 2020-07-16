const { resolve } = require("path")
module.exports = exports = {
  parser: "@typescript-eslint/parser",
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    parser: "babel-eslint",
  },
  rules: {
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
      },
    ],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    allowArgumentsExplicitlyTypedAsAny: "off",
    "no-async-promise-executor": "error",
    "no-misleading-character-class": "warn",
    "no-prototype-builtins": "off",
    "no-shadow-restricted-names": "off",
    "no-useless-catch": "off",
    "no-with": "off",
    "require-atomic-updates": "off",
    "no-console": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/no-empty-interface": [
      "off",
      { allowSingleExtends: true },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-unused-vars": "off",
    "react/prop-types": ["off"],
    "no-case-declarations": "off",
    "import/no-unresolved": [2, { commonjs: true, amd: true }],
  },
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "eslint-plugin-import",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      // this loads <rootdir>/tsconfig.json to eslint
      typescript: {},
      // If webpack pass, eslint should pass
      webpack: {
        config: resolve(__dirname, "configs/webpack/common.js"),
      },
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
    },
    compilerOptions: {
      moduleResolution: "node",
    },
  },
}
