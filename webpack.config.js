const path = require("path"); // 전역 모듈
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./js/main.js", // 파일을 읽을 시작하는 진입점
    output: {
        // 결과물로 번들하는 설정
        // path: path.resolve(__dirname, 'dist'), // 절대 경로 필요. __dirname은 현재 경로라고 생각하면 됨(절대 경로)
        clean: true, //
    },
    plugins: [
        // 만들어내는 과정에서 사용할 플러그인(처리방식 등)
        new HtmlPlugin({
            template: "./index.html",
        }),
        new CopyPlugin({
            patterns: [{ from: "static" }],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            { test: /\.js$/, use: ["babel-loader"] },
        ],
    },
    devServer: {
        host: "localhost",
    },
};
