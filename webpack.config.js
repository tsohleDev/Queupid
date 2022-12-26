const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const path = require("path");

module.exports = {
  mode: 'development',
  entry: {
    cllent: './src/index.js',
    admin: './src/admin.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test:/\.html$/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, "src", "index.html"),
      Chunks: ['clent']
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: path.resolve(__dirname, "src", "admin.html"),
      chunks: ['admin']
    }),
    new WebpackCdnPlugin({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: 'dist/vue.runtime.min.js'
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'dist/vue-router.min.js'
        },
        {
          name: 'vuex',
          var: 'Vuex',
          path: 'dist/vuex.min.js'
        }
      ],
      publicPath: '/node_modules'
    })
  ]
};