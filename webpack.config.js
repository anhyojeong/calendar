const path = require('path');
const { webpack } = require('webpack');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports ={
    name: 'calendar',
    mode: 'production', //productiondevelopment
    devtool: 'cheap-source-map',

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
                    //'react-refresh/babel'
                ],
            },
            },
            {
                test: /\.css$/,
                //use :['style-loader', 'css-loader'],
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins:[
        new LoaderOptionsPlugin({debug:true}),
        new RefreshWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: 'app.css' }),
    ],
    output: {
        path: path.join(__dirname, 'dist'), //현재 폴더에 dist를 합쳐줌(node가)
        filename: 'app.js',
        publicPath: '/dist/',
    }, //출력
    devServer: {
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true
    },
}