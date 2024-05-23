module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" }
    ],
    "multiline-ternary": ["off"],
    // quotes: [
    //   "error",
    //   "double",
    //   {
    //     allowTemplateLiterals: true,
    //     avoidEscape: true,
    //   },
    // ],
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto"
      }
    ],
    "@typescript-eslint/no-explicit-any": ["off"]
  }
};
