module.exports = {
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
    ],
    parserOptions: {
        project: './tsconfig.eslint.json',
    },
    rules: {
        'linebreak-style': ['error', 'unix'],
        'no-console': 'off',
        'no-alert': 'off',
        'no-underscore-dangle': 0,
        'class-methods-use-this': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    'src/tests/**', 'webpack.config.js', '**/*.test.{ts,tsx,js,jsx}',
                ],
                optionalDependencies: false,
                peerDependencies: false,
            },
        ],
        'no-restricted-exports': ['error', { restrictedNamedExports: [] }],
        indent: ['error', 4],
        '@typescript-eslint/indent': 0,
    },
};
