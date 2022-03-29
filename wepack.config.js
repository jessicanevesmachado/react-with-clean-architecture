const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ".src/main/index.tsx", // informa qual é o primeiro script a ser executado
  output: {
    path: path.join(__dirname, "public/js"), // informa onde o arquivo deve ser gerado
    publicPath: "/public/js/",
    filename: "bundle.js", // informa o nome do arquivo gerado
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", "scss"], // informa quais extensões devem ser consideradas
    alias: {
      "@": path.resolve(__dirname, "src"), // informa que toda a vez que ver o @, vai procurar no src
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss?$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
  devServer: {
    contentBase: "./public",
    writeToDisk: true,
    historyApiFallback: true,
  },

  // aqui informo que uso ele de forma externa, ai ele n gera o react no bundle.js
  external: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  plugins: [new CleanWebpackPlugin()],
};
