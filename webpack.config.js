const HTMLWebpackPlugin = require( "html-webpack-plugin" )
const { CleanWebpackPlugin } = require( "clean-webpack-plugin" )

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev

const filename = ext => isDev ? `[name].${ ext }` : `[name].[hash].${ ext }`

const babelOptions = preset => {
  const opts = {
    presets: [ '@babel/preset-env' ]
  }

  if ( preset ) opts.presets.push( preset )

  return opts
}

const path = require( "path" )

module.exports = {
  context: path.resolve( __dirname, "src" ),
  entry: [ "@babel/polyfill", "./scripts/index.ts" ],
  output: {
    filename: filename( "bundle.js" ),
    path: path.resolve( __dirname, "dist" )
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new HTMLWebpackPlugin( {
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd
      }
    } ),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions()
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions( "@babel/preset-typescript" )
        }
      }
    ]
  },
  devServer: {
    port: 4200,
    hot: isDev
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  devtool: isDev ? "source-map" : ""
}