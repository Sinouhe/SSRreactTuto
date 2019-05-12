const path = require('path');

module.exports = {
    // Infrom webPack we build a bundle for node JS
    target: 'node',
    // root file server app
    entry: './src/index.js',
    // tell webpack where output file generated
    output : {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'build')
    },
    //tell webpack run babel
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        'react',
                        'stage-0',
                        ['env', { targets: { browsers: ['last 2 versions'] }}]
                    ]
                }
            }
        ]
    }

};