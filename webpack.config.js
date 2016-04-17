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
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.scss'],
        root: [path.resolve(__dirname, "./resources/assets/sass")]
    }
};
