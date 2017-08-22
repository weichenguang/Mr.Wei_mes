/**
 * Created by Administrator on 2017/8/22.
 */
'use strict';
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    //入口
    entry:{
      main:"./src/main.js"
    },
    // 目标地址
    output:{
      filename:"biuld.js",
      path:path.join(__dirname,"dist")
    },
    //模块
    module:{
      loaders:[
        {
          test:/\.css$/,
          loader:"style-loader!css-loader!autoprefixer-loader"
        },
        {
          test:/\.less$/,
          loader:"style-loader!css-loader!autoprefixer-loader!less-loader"
        },
        {
          test:/\.(jpg|png|svg|ttf)$/,
          loader:"url-loader?limit=4096"
        },
        {
          test:/\.js$/,
          loader:'babel-loader',
          exclude:/node_modules/
        },
        {
          test:/\.vue$/,
          loader:'vue-loader'
        }
      ]
    },
  plugins:[
      new htmlWebpackPlugin({
        template:"./src/index.html"
      })
    ]


}