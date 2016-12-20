var webpack = require('webpack');
var path = require('path');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('index.js');
 
module.exports = {
     plugins: [
  //   new webpack.optimize.OccurenceOrderPlugin(),
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoErrorsPlugin()
    ],
    //页面入口文件配置
    entry: {
        index : './js/index.js'
    },
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname,'static'),
        // publicpath:'/static',
        filename: '[name].js'
    },
    module: {
    //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.scss$/, loader: 'style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]'},
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=50000'}
        ]
    },
    //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.scss'], //支持require文件后缀省略
    }
};
