var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, "resources/assets"),
    entry: "./js/app.js",
    output: {
        path: __dirname + "/public/js/",
        filename: "bundle.min.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                }
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader"
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.scss'],
        root: [path.resolve(__dirname, "./resources/assets/sass")]
    }
};
