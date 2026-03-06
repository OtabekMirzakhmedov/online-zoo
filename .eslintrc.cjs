module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    env: {
        browser: true,
        es2021: true
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        'no-undef': 'off' // Handled by TypeScript
    }
};
