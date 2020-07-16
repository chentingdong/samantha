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
  },
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    indent: ["warn", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "no-async-promise-executor": "off",
    "no-misleading-character-class": "off",
    "no-prototype-builtins": "off",
    "no-shadow-restricted-names": "off",
    "no-useless-catch": "off",
    "no-unused-vars": "off",
    "no-with": "off",
    "no-console": "off",
    "require-atomic-updates": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["off"],
    allowArgumentsExplicitlyTypedAsAny: false,
    allowDirectConstAssertionInArrowFunctions: "off",
    "@typescript-eslint/no-empty-interface": [
      "off",
      { allowSingleExtends: true },
    ],
    allowArgumentsExplicitlyTypedAsAny: "off",
  },

  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
  ],
  settings: {
    "import/resolver": {
      // this loads <rootdir>/tsconfig.json to eslint
      typescript: {},
      // If webpack pass, eslint should pass
      webpack: {
        config: "./configs/webpack/common.js",
      },
      node: {
        paths: ["src"],
        extensions: [".js", ".ts", "jsx", "tsx", ".d.ts"],
      },
    },
    compilerOptions: {
      moduleResolution: "node",
    },
  },
}
