# Bundler

## 번들러 개요
- 웹 제작에 필요한 다양한 패키지(scss, pug, babel, ts 등)는 브라우저가 직접 해석하지 못하는 언어
- 여러 패키지를 이용해 브라우저가 해석할 수 있는 형태로 변환하며 이 반복 과정을 **번들러**가 수행

### **Parcel vs Webpack**
- **Parcel**: 구성 없이 자동으로 번들링, 소/중형 프로젝트에 적합
- **Webpack**: 매우 세밀한 구성이 가능하며 중/대형 프로젝트에 적합

## 프로젝트 생성
1. `npm init`으로 프로젝트 초기화
2. `parcel` 설치: `npm install -D parcel`
3. 실행 스크립트 수정 (package.json에 `"scripts"` 추가)
4. `reset.css`, `main.js` 생성
   - `reset.css`: https://www.jsdelivr.com/package/npm/reset-css

## 정적 파일 연결
1. 이미지 등 정적 파일을 프로젝트에 추가한 후 필요한 경우 `.ico` 파일로 변환해 저장
2. `dist` 폴더에서 번들링 결과 확인 가능
3. `npm install -D parcel-plugin-static-files-copy`로 정적 파일 복사 플러그인 설치
4. `package.json`에 `staticPath` 추가
5. 디펜던시 에러 발생으로 `node_modules`와 `package.json` 삭제 후 `npm cache clean` 명령어 실행해서 해결

## Autoprefixer
- **벤더 프리픽스**란: CSS 속성 앞에 붙이는 접두어로, 각 브라우저에서 지원하지 않는 CSS 속성을 처리
- `npm i -D postcss autoprefixer` 명령어로 설치. 만약 설치가 안되면 `npm i -D autoprefixer` 후 `npm i -D postcss`
- `browserslist` 설정을 위해 `.postcssrc.js` 파일을 추가
- 파일명 앞에 `.`을 붙이면 숨김 파일 처리
- **ESM 환경**에서는 CommonJS를 사용해야 하므로 `import` 대신 `require`, `export` 대신 `module.exports`를 사용
  ```javascript
  module.exports = {
    //`.postcssrc.js`
    plugins: [
      require('autoprefixer')
    ]
  };
  ```
- 의존성 에러가 발생하면 버전 문제일 수 있으니 로그 확인 후 해결 필요
    - 강의에서는 postCSS 버전을 다운그레이드(10 → 9) `npm i -D autoprefixer@9`
## Babel
- Babel: 최신 ECMAScript(ES6 이상) 코드를 이전 브라우저에서도 동작하도록 변환해주는 도구

- 설치: `npm i -D @babel/core @babel/preset-env`
- babelrc.js 파일 생성 후 설정
    - 단 강의에서는 이미 browserslist가 존재해 그대로 사용  

```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['> 0.25%', 'not dead'],
      },
    }],
  ],
};
```

- 필요시 `npm i -D @babel/plugin-transform-runtime` 설치 후 .babelrc.js에 플러그인 추가
    - `plugins: ['@babel/plugin-transform-runtime']`

## CLI (Command Line Interface)
- Parcel CLI 명령어
    - serve: 개발용 서버 실행
    - build: 제품 배포용 빌드
- CLI 옵션
    - 결과물 디렉토리: 기본값은 dist. 변경하려면 --out-dir
        - `parcel build index.html --out-dir build/output`
    - 포트 번호: 기본값 1234. 변경하려면 --port 
        - `parcel serve --port 1111`
    - 브라우저에서 자동 열기: 기본값은 false. 자동으로 열리게 하려면 --open
        - `parcel serve --open`
    - 핫 모듈 교체 비활성화 (HMR): 기본값은 활성화. 비활성화하려면 --no-hmr
        - `parcel serve --no-hmr`
    - 캐시 비활성화: 기본값은 캐시 활성화. 비활성화하려면 --no-cache
        - `parcel build --no-cache`