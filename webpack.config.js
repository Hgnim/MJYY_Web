const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = {
    //mode: 'development',
    mode: 'production',//优化打包输出和构建性能的模式
    entry: {
        'index': './src/init/index.ts',
        'communityPhotoWall':'./src/init/communityPhotoWall.ts',
        '404':'./src/init/404.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出路径
        filename: 'js/[name].[contenthash].js', // 输出文件名
        clean: true, // 清除dist目录
    },
    resolve: {
        //设置类型可以作为模块被引用
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@": path.resolve(__dirname, "src"), //配置@指向src目录
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // 匹配 TypeScript 文件
                use: "ts-loader", // 使用 ts-loader 处理 TypeScript 文件
                exclude: /node_modules/ // 排除 node_modules 文件夹
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    "css-loader",//处理css文件
                    'sass-loader',//编译SCSS文件
                ],
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
                    filename: 'assets/img/[hash:10][ext][query]', // 指定打包路径和文件名
                },
            },
            {
                test: /\.(ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[hash:10][ext][query]', // 指定打包路径和文件名
                },
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // 指定模板文件
            filename: 'index.html', // 输出文件名
            inject: 'head',//插入在head标签
            chunks: ['index'],//插入的入口文件
        }),
        new HtmlWebpackPlugin({
            template: './src/CommunityPhotoWall.html',
            filename: 'CommunityPhotoWall.html',
            inject: 'head',
            chunks: ['communityPhotoWall'],
        }),
        new HtmlWebpackPlugin({
            template: './src/404.html',
            filename: '404.html',
            inject: 'head',
            chunks: ['404'],
        }),

        new MiniCssExtractPlugin(
            {
                filename: 'assets/css/[name].[contenthash].css',
                chunkFilename: 'assets/css/[id].[contenthash].chunk.css',
            }
        ),

        new CopyWebpackPlugin({//复制文件
            patterns: [
                { from: './src/assets/img/copy', to: 'assets/img/copy' },

                { from: './src/assets/md', to: 'assets/md' },
                { from: './src/json', to: 'json' },

                {
                    from: './CNAME', to: '',
                    noErrorOnMissing: true, // 文件不存在时不报错
                },
            ],
        }),
        new WebpackShellPluginNext({//运行外部命令
            //onBuildStart: {//在构建前执行
            onBuildEnd:{//在构建后执行
                scripts: [
                    'echo 开始处理独立的css文件',
                    'npx postcss ./src/assets/css/animation --dir ./dist/assets/css/animation --verbose',
                    'echo 独立的css文件处理完成'
                ],
                blocking: true,//等待命令完成
                parallel: false,//确保命令按顺序运行
            },
            logging: true,
        })
    ],
    optimization: {
        minimize: true, // 开启代码压缩
        minimizer: [
            `...`,
            new CssMinimizerPlugin({
                exclude: /^(?!.*(communityPhotoWall|index).*).*\.css/,//反排除需要压缩的css文件
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
    devServer: {
        static: {//指定dist文件为静态文件来源，用于读取一些用脚本处理的文件
            directory: path.join(__dirname, 'dist')
        },
    },
};