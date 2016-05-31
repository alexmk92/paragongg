const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const sassLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader?includePaths[]=' + path.resolve(__dirname, './resources/assets/sass')
]

module.exports = {
    context: path.join(__dirname, "resources/assets"),
    entry: {
        "app" : "./js/app.js",
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + "/public/build/",
        filename: "js/[name].min.js"
    },
    module: {
        loaders: [
            {
                test: /onload.js?$/,
                loader: 'babel-loader',
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react'],
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react'],
                }
            },
            {
                test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
                loader: 'imports?define=>false&this=>window'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ExtractTextPlugin("css/[name].css")
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ]
};
