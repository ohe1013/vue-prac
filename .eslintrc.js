module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': 'warn',
        'vue/no-unused-components': 'warn',
        'prettier/prettier': [
            'warn',
            {
                singleQuote: true,
                semi: true,
                tabWidth: 4,
                printWidth: 100,
                singleAttributePerLine: true,
                useTabs: false,
                endOfLine: 'auto',
                proseWrap: 'preserve',
            },
        ],
    },
};
