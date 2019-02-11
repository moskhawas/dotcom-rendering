module.exports = {
    plugins: [
        'babel-plugin-preval',
        'babel-plugin-dynamic-import-node',
        ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
        '@babel/plugin-proposal-class-properties',
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@root': '.',
                    '@frontend': './packages/frontend',
                },
            },
        ],
    ],
    presets: [
        '@babel/preset-typescript',
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
                useBuiltIns: 'usage',
                modules: false,
            },
        ],
    ],
    env: {
        production: {
            presets: [['@emotion/babel-preset-css-prop', { sourceMap: false }]],
        },
        development: {
            presets: [['@emotion/babel-preset-css-prop', { sourceMap: true }]],
        },
    },
};
