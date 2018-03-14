//installed via npm 因此我们希望每次打包后index.html中的路径也会自动加上hash值，解决方法：引入了html-webpack-plugin这一个插件，该插件可以帮助我们根据模板生成html文件。
const htmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const autoprefixer = require('autoprefixer');
const config = {
    context: __dirname,//上下文
    // entry: './src/app.js',
    entry:{
        main: './src/app.js',
        // vendor: ['jquery'] //vendor属性用于配置打包第三方类库，写入数组的类库名将统一打包到一个文件里。
    },
    output: {
        path: __dirname + '/dist',
        // filename: 'bundle.js',
        // filename: '[name].js',
        filename: '[name]-[hash].js',
        // filename: 'js/[name].js',
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                // exclude:`/node_modules/`,
                exclude: path.resolve(__dirname, 'node_modules'),
                // include: `/src/`,
                // include: path.resolve(__dirname,'src'),
                include:[
                    path.resolve(__dirname,'src')
                ],
                loader: 'babel',
                query:{
                    presets:['latest']
                }
            },
           /*  { 
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader',
                loaders:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
             }, */
            {
                test: /\.html$/,
                loader: 'html',
            }, 
            {
                test: /\.ejs$/,
                loader: 'ejs',
            }, 
            {
                test: /\.tpl$/,
                loader: 'ejs-loader',
            }, 
            {
                test: /\.(css|less|scss)$/,
                use: [
                    { loader: 'style' },
                    {
                        loader: 'css',
                        
                        options: {
                            // importLoaders: 1,//query css文件引入的css文件也要经过postcss-loader处理
                            // minimize: true,
                            // sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss',
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            // importLoaders: 1,
                            plugins: () => [
                                require('postcss-import')(),
                                // require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 5 versions',
                                        'Firefox ESR',
                                        // 'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    // flexbox: 'no-2009',
                                }),
                                // px2rem({ remUnit: 75 })
                            ],
                        },
                    },
                    {
                        loader: 'less',
                    },
                    {
                        loader: 'sass',
                    },
                ]
            },
            /* {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file',
                options: {
                    name: 'img/[name].[hash:4].[ext]'
                }
            }, */
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                options: {
                    limit: 8192,
                    name: 'img/[name].[hash:4].[ext]'
                }
            },
            {
                test: /\.(woff|eot|ttf|svg|gif)$/,
                loader: 'url',
                options: {
                    limit: 8192,
                    name: 'font/[name].[hash:4].[ext]'
                }
            },

        ],
        
    },
    plugins: [
        // 同时我们将输出的filename用[name]变量来自动生成文件名，最后我们添加了一个CommonsChunkPlugin的插件，用于提取vendor。
        //并没有修改jQuery的源码。修改CommonsChunkPlugin的配置 names: ['vendor', 'manifest']
        /* new webpack.optimize.CommonsChunkPlugin({
            // name: 'vendor'
            names: ['vendor', 'manifest']
        }), */
        /* new webpack.LoaderOptionsPlugin({
            test: /\.css$/, // may apply this only for some modules
            options: {
                postcss: [
                    require('autoprefixer')({
                        browsers: ['last 5 versions']
                    })
                ]
         }
        }), */
        // new webpack.optimize.UglifyJsPlugin(),
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            // inject:'head',//指定js引用插入的标签 head body等
            title: 'webpack so good',//支持ejs语法
            date: new Date(),
            minify: {

            },
        }),
        /* new htmlWebpackPlugin({
             template: './src/app.js',
            filename:'a.html',
            //inject:'head',//指定js引用插入的标签 head body等
            title:'this is a.html',//支持ejs语法
            date:new Date(),
            minify:{

            },
            chunks: ['main', 'a']
        }),
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'b.html',
            //inject:'head',//指定js引用插入的标签 head body等
            title: 'this is b.html',//支持ejs语法
            date: new Date(),
            minify: {

            },
            chunks: ['main', 'b']
        }),
        new htmlWebpackPlugin({
            template: './index.html',
            filename: 'c.html',
            //inject:'head',//指定js引用插入的标签 head body等
            title: 'this is c.html',//支持ejs语法
            date: new Date(),
            minify: {

            },
            excludeChunks: ['main', 'a'],

        }), */
    ]
};

module.exports = config;