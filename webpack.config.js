const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const widgetName = require('./widget.conf.json').Name;

module.exports =
    {
        entry: {
            [widgetName]: './app/widget.tsx',
            hostmock: './mock/host-mock.ts'
        },
        externals: {
            react: "React"
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.less$/,
                    use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }]
                },
                {
                    test: /\.json$/,
                    loader: "json",
                    include: "/resources/"
                },
                {
                    test: /\.(svg|png|jpg|gif)$/,
                    loader: "url-loader",
                    options: {
                        name: "asset/image/[name].[ext]",
                        publicPath: ""
                    }
                }
                
                
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].bundle.js',
            library: 'integration/[name]',
            libraryTarget: 'window'
        },
        plugins: [
            new CleanWebpackPlugin([path.resolve(__dirname, 'dist')], { verbose: false })
        ],
    };