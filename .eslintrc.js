module.exports = {
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
    ],
    parserOptions: {
        project: './tsconfig.eslint.json',
    },
    rules: {
        'linebreak-style': ['error', process.env.NODE_ENV === 'prod' ? 'unix' : 'windows'],
        'no-console': 'off',
        'no-alert': 'off',
        'no-underscore-dangle': 0,
        'class-methods-use-this': ['error', {
            exceptMethods: [
                'render',
                '_render',
                '_createDocumentElement',
                'componentDidMount',
                '_componentDidMount',
                'componentDidUpdate',
                '_componentDidUpdate',
                'componentWillUnmount',
                'getRefs',
                '_compile',
                '_fixPath',
                'back',
                'forward',
                '_searchUsers',
            ],
        }],
        'no-restricted-exports': ['error', { restrictedNamedExports: [] }],
        indent: ['error', 4],
        '@typescript-eslint/indent': 0,
    },
};
