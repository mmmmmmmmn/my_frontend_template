module.exports = {
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
        },
    },
    overrides: [
        {
            files: ['*.js'],
            extends: ['eslint:recommended', 'plugin:prettier/recommended'],
        },
        {
            files: ['*.ts', '*.tsx'],
            extends: [
                'eslint:recommended',
                'plugin:prettier/recommended',
                'prettier/@typescript-eslint',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:react/recommended',
            ],
            plugins: ['@typescript-eslint', 'react', 'react-hooks'],
            parser: '@typescript-eslint/parser',
            rules: {
                '@typescript-eslint/no-empty-function': 2,
                '@typescript-eslint/no-use-before-define': 0, // bug?
                '@typescript-eslint/explicit-function-return-type': 0,
                'react/prop-types': 0,
                'react/react-in-jsx-scope': 0,
                '@typescript-eslint/no-explicit-any': 0,
            },
        },
    ],
};
