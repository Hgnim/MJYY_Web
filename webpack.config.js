const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',//优化打包输出和构建性能的模式
    entry: {
        'index':'./src/index.html',
        'communityPhotoWall':'./src/CommunityPhotoWall.html'
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出路径
        //filename: 'js/[name].[contenthash].js', // 输出文件名
        clean: true, // 清除dist目录
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    "css-loader",
                ], // 处理css文件
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true, // 压缩html
                            /*sources: {
                                list: [
                                    "...",
                                    {
                                        tag: "img",
                                        attribute: "src",
                                        type: "src",
                                        filter: () => false,//忽略img中的src
                                    },
                                ],
                            }*/

                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024, // 小于3KB的图片转为base64
                    },
                },
                generator: {
                    filename: 'img/[hash:10][ext][query]', // 指定打包路径和文件名
                },
            },
            {
                test: /\.(ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash:10][ext][query]', // 指定打包路径和文件名
                },
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // 指定模板文件
            filename: 'index.html', // 输出文件名
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            template: './src/CommunityPhotoWall.html',
            filename: 'CommunityPhotoWall.html',
            chunks: ['communityPhotoWall']
        }),
        new MiniCssExtractPlugin(
            {
                filename: 'css/[name].[contenthash].css',
                chunkFilename: 'css/[name].[contenthash].chunk.css',
            }
        ),

        new CopyWebpackPlugin({//复制文件
            patterns: [
                { from: './src/img/mjyy-qrcode.png', to: 'img/mjyy-qrcode.png' },
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/md', to: 'md' },
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/json', to: 'json' },
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './CNAME', to: '' },
            ],
        }),
    ],
    optimization: {
        minimize: true, // 开启代码压缩
        minimizer: [
            `...`,
            new CssMinimizerPlugin({
                exclude: /78492f0a1915464b90c8\.css/,
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }), // 压缩css
            new TerserPlugin(), // 压缩js
        ],
    },
};