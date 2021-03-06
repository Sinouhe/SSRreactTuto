const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
    // Infrom webPack we build a bundle for node JS
    target: 'node',
    // root file server app
    entry: './src/index.js',
    // tell webpack where output file generated
    output : {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'build')
    },
    externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);