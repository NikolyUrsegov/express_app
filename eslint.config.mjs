import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" }},
  { languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { 'unused-imports': unusedImports },
    rules: {
      "object-curly-spacing": ["error", "always", { objectsInObjects: false }],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "no-trailing-spaces": "error",
      "object-property-newline": ["error", {
        allowAllPropertiesOnSameLine: true
      }],
      "object-curly-newline": ["error", {
        ObjectExpression: {
          consistent: true,
          minProperties: 3
        },
        ObjectPattern: {
          consistent: true,
          minProperties: 4
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 3
        }
      }],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always", prev: "*", next: "return"
        }
      ],
      "quote-props": ["error", "as-needed"],
      "key-spacing": ["error", { afterColon: true }],
      "comma-spacing": ["error", {
        before: false,
        after: true
      }],
      indent: ["error", 2],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      semi: ["error", "never"],
      "comma-dangle": ["error", "never"],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },
  { ignores: [
    "dist/**/*",
    "node_modules/**/*",
    "jest.config.js"
  ]  }
]