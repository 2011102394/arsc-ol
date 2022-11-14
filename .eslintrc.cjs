module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  // 指定如何解析语法。可以为空，但若不为空，只能配该值
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'vue/no-multiple-template-root': 0,
    'prettier/prettier': 'error',
    // 声明未使用的变量
    '@typescript-eslint/no-unused-vars': 1,
    // 组件名不能是单个单词
    'vue/multi-word-component-names': 0,
    'no-undef': 0,
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-non-null-assertion': 0,
    'vue/no-v-model-argument': 'off',
    'vue/no-v-for-template-key': 0
  }
}
