/**
 * Created by Simon on 2016/11/22.
 */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
function resolve(dir) {
    console.log('ppp', process.cwd());// 3个都是/Users/ty/wbPro/personalAll/tarot-koa2-vue2
    console.log('mmm', path.resolve(process.cwd(), dir));
    //3个，分别是：/Users/ty/wbPro/personalAll/tarot-koa2-vue2/config
    //           /Users/ty/wbPro/personalAll/tarot-koa2-vue2/build
    //           /Users/ty/wbPro/personalAll/tarot-koa2-vue2/src
    return path.resolve(process.cwd(), dir);
}

module.exports = {
    devtool: 'source-map',
    // entry: ["babel-polyfill", "./devPkg/main.js"],
    entry: {
        app: path.join(__dirname, '../src/main.js'), // 入口
        vendor: ['vue', 'vue-router'] // 拆分框架代码
    },
    output: {
        path: path.join(__dirname, '../staticc'),
        // publicPath: '/staticc/',
        publicPath: '',
        filename: '[name].js'
    },
    // 寻找模块时的一些缺省设置
    resolve: {
        // 补充扩展名
        extensions: ['.js', '.vue', '.json'],
        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            // 'vue': 'vue/dist/vue.esm.js',
            '@config': resolve('config'),
            '@build': resolve('build'),
            // '@': resolve('client'),//别人的原来写法
            '@': resolve('src'),
        }
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
                loader: 'url-loader',
                query: {
                    limit: 30000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        //  new uglify(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        // new copyPlugin([
        //     { from: "./devPkg/images", to: "./images" }
        // ])
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, '../index.template.ejs')
        }),
    ]
};