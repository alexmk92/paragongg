var webpack           = require('webpack'),
    pkg               = require('./package.json'),
    path              = require('path'),
    autoprefixer      = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader?includePaths[]=' + path.resolve(__dirname, './resources/assets/sass')
];

module.exports = {
    //devtool: 'source-map',
    context: path.join(__dirname, "resources/assets"),
    entry: {
        app    : "./js/app.js",
        vendor : Object.keys(pkg.dependencies)
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    output: {
        path: __dirname + "/public/build/",
        filename: "js/[name].min.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react'],
                    compact: false
                }
            },
            {
                test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
                loader: 'imports?define=>false&this=>window'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("css/[name].min.css"),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.min.js'),
        //new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: false,
                warnings: false
            },
            sourceMap: false
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ]
};
