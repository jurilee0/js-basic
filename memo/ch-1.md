# Node.js 설치 및 버전 확인

1. Node.js 설치: [Node.js 공식 사이트](https://nodejs.org/en/)
2. 노드 버전 확인:
   ```bash
   node -v
   ```

# 프로젝트 초기화

1. `npm init`으로 프로젝트 초기화:
   ```bash
   npm init -y
   ```

# 패키지 설치

1. **Parcel Bundler** 설치 (개발용 패키지):
   ```bash
   npm install parcel-bundler -D
   ```
   - **참고 자료**: [Parcel 활용법](https://heropy.blog/2018/01/20/parcel-1-start/)

2. **Lodash** 패키지 설치:
   ```bash
   npm install lodash
   ```

# `devDependencies`와 `dependencies`의 차이
- **`devDependencies`**: 개발 환경에서만 필요한 패키지 (`-D` 옵션으로 설치).
- **`dependencies`**: 실제 서비스에 사용되는 패키지.

# 주요 파일 설명

1. **`package.json`**: 프로젝트 명세 파일로, 설치된 패키지 정보와 스크립트 등이 기록됨.
2. **`node_modules`**: 설치된 모든 패키지가 저장되는 폴더. 삭제해도 `npm install`로 복구 가능.
3. **`package-lock.json`**: 패키지의 의존성과 설치된 정확한 버전을 기록한 파일. 자동 생성됨.

# 스크립트 설정

1. `package.json`에 `dev` 스크립트 추가:
   ```json
   "scripts": {
      "dev": "parcel index.html"
   }
   ```

2. **개발 서버 실행**:
   ```bash
   npm run dev
   ```
   - `http://localhost:1234`에서 확인 가능.

3. **Lodash 모듈 사용 예시** (main.js):
   ```javascript
   import _ from 'lodash';

   console.log('hello');
   console.log(_.camelCase('hello world'));
   ```

# 빌드 스크립트 추가

1. `package.json`에 `build` 스크립트 추가:
   ```json
   "scripts": {
      "dev": "parcel index.html",
      "build": "parcel build index.html"
   }
   ```

2. **빌드 실행**:
   ```bash
   npm run build
   ```
   - `dist` 폴더에 난독화된 파일 생성됨.

# 유의적 버전(semantic versioning)

- **메이저 버전**: 기존과 호환되지 않는 큰 변화.
- **마이너 버전**: 호환 가능한 새로운 기능 추가.
- **패치 버전**: 버그 및 오류 수정.

# 버전 관리

1. **특정 패키지 버전 정보 확인**:
   ```bash
   npm info lodash
   ```

2. **특정 버전 설치**:
   ```bash
   npm install lodash@4.17.20
   ```

3. **패키지 업데이트**:
   ```bash
   npm update lodash
   ```

4. **Caret(^) & Tilde(~) 기호의 의미**:
   - `^major.minor.patch`: 마이너 및 패치 버전 자동 업데이트.
   - `~major.minor.patch`: 패치 버전만 자동 업데이트.
   - [참고 자료](https://yiyb-blog.vercel.app/posts/npm-tilde-carrot)

#  `.gitignore` 설정

- **`node_modules`**와 같은 버전 관리를 할 필요 없는 파일은 `.gitignore`에 추가

  ```
  node_modules/
  /dist
  .cache
  ```

# NPM 프로젝트 예제와 패키지 버전 일치시키기

1. 예제의 `package.json`, `package-lock.json` 파일을 raw로 다운로드
   - `package-lock.json`에는 모든 외부 모듈의 버전이 트리 구조로 명시되어 있음.

2. 두 개의 파일을 프로젝트 디렉토리로 옮긴 뒤 다음 명령어 실행:
   ```bash
   npm install
   ```
   - 이 명령어는 `package-lock.json` 파일에 명시된 버전으로 모든 패키지를 설치함.
