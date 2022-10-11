const path = require("path");

function devtoolModuleFilenameTemplate(info) {
  const resource = info.resource
    .replace("webpack://Canvas/", "")
    .replace(/^\.\/node_modules\//, "../../")
    .replace(/^\.\/src\//, "../src/");
  return resource;
}

const base = {
  mode: "development",
  devtool: "source-map",
  entry: {
    Canvas: ["./src/Canvas.tsx"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    devtoolModuleFilenameTemplate,
    library: "ReactConfetti",
    libraryTarget: "umd",
    libraryExport: "default",
    globalObject: 'typeof self !== "undefined" ? self : this',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ["babel-loader"],
        exclude: [/node_modules/],
      },
    ],
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

module.exports = [
  base,
  {
    ...base,
    mode: "production",
    output: {
      ...base.output,
      filename: "[name].min.js",
    },
  },
];
