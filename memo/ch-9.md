# Bundler 2

## webpack

```bash
npm init -y
npm i -D webpack webpack-cli webpack-dev-server@next
```

```json
//package.json 수정
{
    "scripts": {
        "dev": "webpack-dev-server --mode development",
        "build": "webpack --mode production"
    }
}
```

## 파일 생성

-   index.html, js 폴더, webpack.config.js 파일 생성
-   webpack은 Parcel보다 수동으로 세팅할 내용이 많음 (개발 서버 설정, config 작성 등)

## Entry & Output 설정

-   webpack 공식 문서 참고
-   webpack.config.js에서 여러 진입점, 결과물 경로, clean 옵션 등 다양한 설정 가능

```javascript

const path = require('path'); // Node의 path 모듈 사용

module.exports = {
entry: './js/main.js', // 시작 진입점
output: {
path: path.resolve(\_\_dirname, 'public'), // 번들 결과물 절대 경로
clean: true, // 기존 번들 삭제
},
};
```

## Plugin 설정

## HTML 템플릿 생성 플러그인 설정

html-webpack-plugin 사용

```bash
npm i -D html-webpack-plugin
```

```javascript
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
    plugins: [
        new HtmlPlugin({
            template: "./index.html",
        }),
    ],
};
```

## 정적 파일 연결

copy-webpack-plugin 설치

```bash
npm i -D copy-webpack-plugin
```

static 폴더의 정적 파일 복사 설정

```javascript
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "static" }],
        }),
    ],
};
```

이미지, 파비콘 등 정적 파일 추가 시 dist 경로 확인 필요

## CSS 모듈 설정

css-loader와 style-loader 설치

```bash
npm install -D css-loader style-loader
```

webpack에서 CSS 파일을 처리하는 설정

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/, // CSS 파일 로딩 규칙
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};
```

## SCSS 설정

SCSS 사용을 위한 모듈 설치

```bash
npm i -D sass-loader sass
```

main.js에서 SCSS 파일 경로를 import한 후 테스트

## Autoprefixer 설정

postcss 관련 패키지 설치

```bash
npm i -D postcss autoprefixer postcss-loader
```

.postcssrc.js 파일 생성 후 설정

```javascript
module.exports = {
    plugins: [require("autoprefixer")],
};
```

## Babel 설정

Babel 관련 패키지 설치

```bash
npm i -D @babel/core @babel/preset-env @babel/plugin-transform-runtime
npm i -D babel-loader
```

babel.config.js 파일 생성 후 설정

```javascript
module.exports = {
    presets: ["@babel/preset-env"],
    plugins: [["@babel/plugin-transform-runtime"]],
};
```

webpack에서 Babel을 사용하도록 설정 추가

```javascript
module.exports = {
    module: {
        rules: [
            {
                test: /\.s?css$/, // CSS와 SCSS 처리
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.js$/, // JavaScript 파일에 Babel 적용
                use: ["babel-loader"],
            },
        ],
    },
};
```

## Netlify 배포

1. GitHub 저장소에 코드 업로드
2. Netlify 로그인 후 New site from Git 선택
3. 지속적 배포 설정 후 저장소 선택
4. Build command와 Publish directory 설정 후 배포

## npx와 degit 사용

`degit`: 원격 저장소를 로컬로 가져오는 명령어

`npx`: 설치 없이 노드 명령 실행

```bash
npx degit {사용자명/저장소명} 디렉토리명
code . -r # 현재 경로에서 VSCode 실행
```

-   프로젝트 템플릿을 빠르게 가져와 실행할 수 있는 이점 있음
-   명령어를 사용하지 않는 경우에는 ZIP 파일 다운로드 -> 압축 해제 후 경로 이동 -> git init
