let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: {
        main: "./public/brain/main.brain.js",
        index:"./public/brain/index.brain.js",
        login: "./public/brain/login.brain.js",
        register:"./public/brain/register.brain.js"

    },
    output: {
        path: path.resolve(__dirname,"js"),
        filename: "[name].nerve.js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "brain",
            chunks: ["main","index", "login","register"]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "nerve-users",
            chunks: ["login", "register"]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "nerve-index",
            chunks: ["index"]
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react' ,'env']
                },
                exclude: /node_modules/
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
};