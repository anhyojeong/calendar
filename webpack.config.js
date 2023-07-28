const path = require('path');
const { webpack } = require('webpack');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports ={
    name: 'calendar',
    mode: 'development', //production
    devtool: 'eval',

    resolve:{
        extensions: ['.js' , '.jsx']
    },
    entry: {
        app:['./client',]
    }, //입력
    module: {
        rules:[
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                options: {
                presets: [
                    ['@babel/preset-env',{
                        targets : {
                            browsers:['>1% in KR'],
                        },
                        debug : true,
                    }],
                    '@babel/preset-react'],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ],
            },
            },
            {
                test: /\.css$/,
                use :['style-loader', 'css-loader'],
            },
        ],
    },
    plugins:[
        new LoaderOptionsPlugin({debug:true}),
        new RefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./index.html") //template도 꼭 작성해야 함!!
          })
    ],
    output: {
        path: path.join(__dirname, 'docs'), //현재 폴더에 dist를 합쳐줌(node가)
        filename: 'app.js',
        publicPath: '/dist/',
    }, //출력
    devServer: {
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true
    },
}