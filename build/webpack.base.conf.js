var path = require('path')
var utils = require('./utils')

var projectRoot = path.resolve(__dirname, '../')
const vuxLoader = require('vux-loader')

var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

// 加入webpack对象：
var webpack = require('webpack');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let webpackConfig = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'], // webpack2.0后，设置省略文件类型名称;
        alias: { // 别名
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'page': resolve('src/page'),
            'store': resolve('src/store'),
            'assets': resolve('src/assets'),
            'style': resolve('src/style'),
            'utils': resolve('src/utils'),
            'api': resolve('src/api'),
            'components': resolve('src/components'),
            'node': resolve('node_modules'),
            'lib': resolve('src/lib'),
            'plugins': resolve('src/plugins')
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            // url-loader 和 file-loader负责解决文件的路径引用问题，还有小图片转化为base64形式的问题;
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    // 解析 .vue中的script;
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
              // 支持全局引用scss文件 -- 无效更改，仅供参考，需要其他实现;
            // {
            //     test: /\.scss$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'postcss-loader',
            //         'sass-loader',
            //         {
            //             loader: 'sass-resources-loader',
            //             options: {
            //                 // Provide path to the file with resources
            //                 resources: '../src/styles/main.scss',

            //                 // Or array of paths
            //                 // resources: ['./path/to/vars.scss', './path/to/mixins.scss']
            //             },
            //         },
            //     ],
            // },
        ]
    },
    // 插件使用;
    plugins: [
      // 3. 配置全局使用 jquery
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        "window.jQuery": 'jquery',
      })
    ]
}


module.exports = vuxLoader.merge(webpackConfig, {
    plugins: ['vux-ui', 'progress-bar', 'duplicate-style']
})
