var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [

        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false
            }
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),

        new ExtractTextPlugin("bundle.css"),

        new webpack.optimize.CommonsChunkPlugin({
            name: ["lib"],
            filename: "[name].js",
        }),

        new HtmlWebpackPlugin({
            title: '锦世翔期货大师赛',
            filename:'../index.html',
            template: './www/tpls/index_tpl.html',
            files:{
              chunks: ['index','lib']
            },
            inject:true,
            hash: true
        })
    ],
    //页面入口文件配置
    entry: {
        index: './www/js/index.js',
        lib: ['react', 'react-dom', 'react-router', 'react-redux'],
    },
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname, 'www/static'),
        publicPath: './static/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',query: {compact: false} },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]') },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.scss'], //支持require文件后缀省略
    }
};
