var webpack = require('webpack');

module.exports = {
    entry: './main.js',
    output: {
        path: './dist',
        publicPath: './dist/',
        filename: '[name].build.js'
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     jquery: "jquery",
        //     jQuery: 'jquery'
        // }),
        //提公用js到common.js文件中
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        //压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                loader: 'url-loader?limit=2&name=images/[hash].[ext]',
            },

        ]
    },
    resolve: {
        alias: {
            // marked: '../libs/marked.min.js',
        },
    },

}
//http://stackoverflow.com/questions/30522896/how-to-shim-tinymce-in-webpack
if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#source-map'
}
