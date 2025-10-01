 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

 module.exports = {
   entry: {
     app: './src/index.js',
   },
  output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Production',
       template: "./src/template.html",
     }),
     new FaviconsWebpackPlugin({
    logo: "./src/favicon/favicon.png", 
    cache: true,
    inject: true,
    prefix: "assets/", 
    favicons: {
      appName: "Todo List",
      appDescription: "ToDoozle To do list app",
      developerName: "RussTP",
      developerURL: null,
      background: "#000c66",
      theme_color: "#7ec8e3",
      icons: {
        favicons: true,
        appleIcon: true,
        android: true,
        windows: true,
        yandex: false
      }
    }
  })
],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
        filename: 'assets/fonts/[name][ext]'
      }
    },
    ],
  },
};