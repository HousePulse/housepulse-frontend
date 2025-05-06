// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require("webpack");
const path = require("path");

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx','.js', '.jsx'],
        alias: {
            '@root': path.resolve(__dirname, 'src/'),
            '@store': path.resolve(__dirname, 'src/App/store/'),
            '@assets': path.resolve(__dirname, 'src/App/assets/'),
            '@components': path.resolve(__dirname, 'src/App/components/'),
            '@http': path.resolve(__dirname, 'src/App/http/'),
            '@types_app': path.resolve(__dirname, 'src/App/types/'),
            '@utils': path.resolve(__dirname, 'src/App/utils/'),
        }
    },
    entry: './src/index.tsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        }
                    }
                ]
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
        }),
        // new ForkTsCheckerWebpackPlugin({
        //     async: false,
        //     eslint: {
        //         files: "./src/**/*",
        //     },
        // }),
    ],
    devServer: {
        static: {
            directory: __dirname + '/build',
        },
        compress: true,
        port: 9006,
        client: {
            progress: false,
        },
        host: 'localhost',
    }
}