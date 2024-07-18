//  ESlint 检查配置
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    // 指定ESlint的解析器
    parser: "@typescript-eslint/parser",
    // 允许使用ES语法
    ecmaVersion: 2020,
    // 允许使用import
    sourceType: "module",
    // 允许解析JSX
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-unused-vars": 0,
    "operator-linebreak": [2, "after"],
    "@typescript-eslint/no-explicit-any": "off"
  }
};
