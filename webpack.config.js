const path = require('path');
const root = __dirname;
const webpack = require("webpack");
const pkg = require("./package.json");
const WorkboxPlugin = require('workbox-webpack-plugin');
const {version, codename} = pkg;
const PWA = {version, codename};
//console.log("webpack.optimize.DedupePlugin", webpack)
let mode = "production";
let watch = false;
//mode = "development"; watch=true;
console.log("MODE:", mode)
module.exports = {
  entry: {
    //'cryptix-wallet-worker': './http/cryptix-wallet-worker.js',
    //'cryptix-wallet':'./http/cryptix-wallet.js'
    'wallet-app': './http/wallet-app.js',
    'cryptix-wallet-worker-core': './http/cryptix-wallet-worker-core.js'
  },
  mode,
  watch,
  /*externals_:{
    "/style/style___.js": "/style/style.js",
    "/flow/flow-ux/flow-ux.js": "/flow/flow-ux/flow-ux.js",
    "/cryptix-ux/cryptix-ux.js": "/cryptix-ux/cryptix-ux.js"
  },*/
  resolve: {
    //importsFields: ["browser"],
    //aliasFields: ['browser'],
    alias:{
      "/style/style.js": "/http/style/style.js",
      "/flow/flow-ux/flow-ux.js": path.join(root, "node_modules/@aspectron/flow-ux/flow-ux.js"),
      "/flow/flow-ux/src/flow-format.js": path.join(root, "node_modules/@aspectron/flow-ux/src/flow-format.js"),
      "/flow/flow-ux/src/base-element.js": path.join(root, "node_modules/@aspectron/flow-ux/src/base-element.js"),
      "/flow/flow-ux/src/flow-swipeable.js": path.join(root, "node_modules/@aspectron/flow-ux/src/flow-swipeable.js"),
      "/flow/flow-ux/src/flow-i18n.js": path.join(root, "node_modules/@aspectron/flow-ux/src/flow-i18n.js"),
      "/@cryptix/ux/cryptix-ux.js": path.join(root, "node_modules/@cryptix/ux/cryptix-ux.js"),
      "/@cryptix/grpc-web": path.join(root, "./node_modules/@cryptix/grpc-web"),
      "@aspectron/flow-grpc-web": path.join(root, "./node_modules/@aspectron/flow-grpc-web"),
      //"cryptix-wallet-worker": "../cryptix-wallet-worker",
      //"/cryptix-wallet-worker/cryptix-wallet-worker.js": "../cryptix-wallet-worker/cryptix-wallet-worker.js"
    },
  	fallback: {
  		"path": false,
      "fs": false,
      "Buffer": require.resolve("buffer/"),
      "buffer": require.resolve("buffer/"),
      "url": require.resolve("url/"),
      "assert": require.resolve("assert/"),
      "process": require.resolve("process/browser"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "os": false,
      "nw.gui": false,
      "@cryptix/wallet-worker": require.resolve("./node_modules/@cryptix/wallet-worker")
  	}
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    //library:'_LIB',
    //libraryTarget: "var"
  },
  module: {
    /*rules: [
      // JavaScript / ES6
      {
        test: /\.js?$/,
        //include: path.resolve(__dirname, "../src"),
        use: "babel-loader"
      }
     ]*/
  },
  plugins:[
    //new webpack.optimize.DedupePlugin()
    new webpack.DefinePlugin({
      "window.PWA": JSON.stringify(PWA)
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process',
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /.*/,
          handler: 'NetworkFirst'
        }
      ]
    })
  ],
  stats:{
    //errorDetails:true,
    env:true
  }
}
