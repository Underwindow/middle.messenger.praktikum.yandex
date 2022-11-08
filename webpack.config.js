const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

module.exports = {
    entry: './src/index.ts',
    devtool: false,
    devServer: {
        compress: true,
        port: 3000,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json'),
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: 'global',
                        }
                    },
                ],
            },
            {
                test: /\.handlebars$/,
                loader: 'handlebars-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'json'],
        alias: {
            core: path.resolve(__dirname, 'src/core'),
            components: path.resolve(__dirname, 'src/components'),
            utils: path.resolve(__dirname, 'src/utils'),
            pages: path.resolve(__dirname, 'src/pages'),
            styles: path.resolve(__dirname, 'src/styles'),
            services: path.resolve(__dirname, 'src/services'),
            api: path.resolve(__dirname, 'src/api'),
            store: path.resolve(__dirname, 'src/store'),
            handlebars: path.resolve(__dirname, 'node_modules/handlebars/dist/handlebars.min.js'),
        },
        fallback: {
            fs: false,
        },
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './src/favicon.png',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
            },
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
    ],
};
