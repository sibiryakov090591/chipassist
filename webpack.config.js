const title = require("./src/constants/defaults").title;
const logos = require("./src/constants/defaults").logos;
const id = require("./src/constants/defaults").id;
const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const gitRevisionPlugin = new GitRevisionPlugin();
const CreateFileWebpack = require("create-file-webpack");
// const SentryWebpackPlugin = require("@sentry/webpack-plugin");
//const DeleteSourceMapWebpackPlugin = require("delete-sourcemap-webpack-plugin");
// const CleanTerminalPlugin = require("clean-terminal-webpack-plugin");
// For show unused files
//const UnusedWebpackPlugin = require("unused-webpack-plugin");

const isDevServer = !!process.env.DEV_SERVER;
let node_env = "production";
console.log("AWS_BRANCH", process.env.AWS_BRANCH);

switch (process.env.AWS_BRANCH) {
  case "master":
    node_env = "development";
    break;
  default:
    node_env = "production";
    break;
}

const isProd = node_env === "production";
const isDev = !isProd;
console.log(node_env, "PROD:", isProd);

const favicon =
  id === "elfaro"
    ? "src/images/favicons/elfaro-favicon.ico"
    : id === "icsearch"
    ? "src/images/favicons/favicon_icsearch.ico"
    : "src/images/favicons/favicon_chipassist.ico";

const filename = (ext) => (isDevServer ? `[name].${ext}` : `[name].[hash].${ext}`);

const jsLoaders = () => {
  const loaders = [];
  if (isDev) {
    loaders.push("cache-loader");
  }
  loaders.push({
    loader: "ts-loader",
    options: {
      transpileOnly: true,
    },
  });
  if (isDev) {
    //loaders.push("eslint-loader");
  }

  return loaders;
};

module.exports = {
  stats: {
    modules: false,
    colors: true,
    children: false,
    assets: true,
  },
  mode: process.env.NODE_ENV,
  entry: ["./src/index.js"],
  output: {
    filename: filename("js"),
    chunkFilename: filename("chunk.js"),
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@src": path.resolve(__dirname, "src"),
    },
  },
  optimization: {
    minimize: isProd,
    sideEffects: true,
    usedExports: true,
    splitChunks: {
      chunks: "all",
      maxSize: 200000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  devtool: isDev ? "cheap-module-source-map" : "source-map",
  devServer: {
    port: 3000,
    hot: isDev,
    historyApiFallback: true,
    host: "0.0.0.0",
    useLocalIp: true,
    stats: {
      modules: false,
      colors: true,
      children: false,
      assets: false,
    },
  },
  plugins: [
    // new CleanTerminalPlugin({ message: `Build in progress...` }),
    //...(!isProd ? [] : [new DeleteSourceMapWebpackPlugin()]),
    // ...(!isProd
    //   ? []
    //   : [
    //       new SentryWebpackPlugin({
    //         authToken: "db9b5c37cccb45989f8736761da42cf8003ae78f86694460b2d261188ffe3057",
    //         org: "spaceone",
    //         project: "spaceone",
    //         include: "./dist",
    //         release: 2,
    //       }),
    //     ]),
    new CreateFileWebpack({
      path: path.resolve(__dirname, "dist"),
      fileName: "version.txt",
      content: process.env.AWS_COMMIT_ID || gitRevisionPlugin.commithash(),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: isProd ? (id === "icsearch" ? "robots.prod.ics.txt" : "robots.prod.txt") : "robots.dev.txt",
          to: "robots.txt",
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: id === "icsearch" ? "static/sitemap.ics.txt" : "static/sitemap.chip.txt",
          to: "sitemap.txt",
        },
      ],
    }),
    new CopyPlugin({
      patterns: [{ from: logos.fromPath, to: logos.distPath }],
    }),
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(gitRevisionPlugin.version()),
      COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
      BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
    }),
    new Dotenv({ systemvars: true }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}",
      },
    }),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
      template: "src/index.ejs",
      favicon: favicon,
      title: title,
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
        removeRedundantAttributes: isProd,
        useShortDoctype: isProd,
        removeEmptyAttributes: isProd,
        removeStyleLinkTypeAttributes: isProd,
        keepClosingSlash: isProd,
        minifyJS: isProd,
        minifyCSS: isProd,
        minifyURLs: isProd,
      },
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
    // new UnusedWebpackPlugin({
    //   directories: [path.join(__dirname, "src")],
    //   root: __dirname,
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ["file-loader"],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
            },
          },
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "application/octet-stream",
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "image/svg+xml",
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, "src")],
              },
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
