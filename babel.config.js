// @flow
module.exports = {
    plugins: [
        'babel-plugin-preval',
        'babel-plugin-dynamic-import-node',
        ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
        '@babel/plugin-proposal-class-properties',
    ],
    presets: [
        '@babel/preset-flow',
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
            plugins: [['emotion', { sourceMap: false }]],
        },
        development: {
            plugins: [['emotion', { sourceMap: true }]],
        },
    },
};