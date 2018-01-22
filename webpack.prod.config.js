const isProduction = process.env.NODE_ENV == 'production' ? true : false;
console.log("isProduction", isProduction);
const path = require('path');
//记录 ： node-sass 没下载起 https://www.npmjs.com/package/sass-loader
const HtmlWebpackPlugin = require('html-webpack-plugin')
let webpack = require('webpack');
//提取公共文件 =》 commons
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const baseConfig = require("./build/baseConfig.js");
const { dist, host, port, openPage } = baseConfig;

if (isProduction) {
    const rm = require('rimraf')
    rm(path.resolve(__dirname, dist), error => {
        if(error) console.log(error);
    });
}

module.exports = {
    entry: {
        app: './src/entry/index.jsx',
        vendor: ['react',
            'react-dom',
            'redux',
            'react-router-dom',
            'redux-thunk',
            'react-router-redux',
            'react-redux'
        ]
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, dist),
        publicPath: "./"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'utils': path.resolve(__dirname, './src/utils'),
            'apis': path.resolve(__dirname, './src/apis'),
            'mock': path.resolve(__dirname, './src/mock'),
            'routes': path.resolve(__dirname, './src/routes'),
            'component': path.resolve(__dirname, './src/component'),
            'actions': path.resolve(__dirname, './src/actions'),
            'container': path.resolve(__dirname, './src/container'),
            'reducers': path.resolve(__dirname, './src/reducers'),
            'style': path.resolve(__dirname, './src/style'),
            'images': path.resolve(__dirname, './src/images'),
            'star': path.resolve(__dirname, './src/common/star.js')
        }
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        //保证不管再添加任何新的本地依赖，对于每次构建，vendor hash 都应该保持一致
        new webpack.HashedModuleIdsPlugin(),
        //注意，引入顺序在这里很重要。CommonsChunkPlugin 的 'vendor' 实例，必须在 'runtime' 实例之前引入。
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "[name].[chunkhash].js"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new ExtractTextPlugin("[name].[chunkhash].css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: "src/index.html",
            inject: true,
            path: "/static/",
            title: "asdfasd",
            favicon: "./src/images/favicon.ico"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            'jQuery': 'jquery'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        //React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production:
        //如果遇到以上报警使用 UglifyJsPlugin 插件解决
        new webpack.optimize.UglifyJsPlugin({
            sourceMap:true
        })
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!postcss-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!postcss-loader!less-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!postcss-loader!sass-loader"
                })
            },
            {　
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" },
            { test: /\.html$/, use: 'html-loader' },
            { test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]' } // inline base64 URLs for <=8k images, direct URLs for the rest
            ,
            //file-loader
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
            //url-loader 在文件小于limit时，返回url;大于limit时，类似file-loader，直接返回文件
            { test: /\.(woff|woff2)$/, use: 'url-loader?prefix=font/&limit=5000' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' }
        ]
    },
    devtool: isProduction ? '' : 'cheap-module-eval-source-map'
};