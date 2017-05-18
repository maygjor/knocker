var path = require('path');
var webpack = require('webpack');
module.exports = {
    devServer: {
        inline: true,
        contentBase: './',
        port: 1337
    },
    devtool: 'cheap-module-eval-source-map',
    entry: './brains/js/index.brain.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    output: {
        path: 'public',
        filename: '/javascripts/bundle.min.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
