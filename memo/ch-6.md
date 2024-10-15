# JS 데이터 활용

## 내보내기와 불러오기
- **내보내기**
  - `export default function () {}`  
  - `default`는 이름 없이 내보낼 수 있으며, 파일에 하나만 존재 가능
  - `export function Named () {}`, `export const something = {}`  
  - `default` 없이 사용된 경우(예: `Named`)에는 이름을 지정해서 내보내기

- **불러오기**
  - `import keyword from 'modules'`  
  - 내가 지정한 `keyword`로 모듈을 불러와 사용
  - `import {}` from 'modules'  
  - 중괄호는 이름을 지정해야 할 때 사용하며, 구조 분해 방식으로 가져올 수 있음
  - `import { Named, Named2 as keyword } from 'modules'`
  - `import * as R from 'getRandom'` // 와일드카드로 모든 모듈을 한 번에 가져옴

## Lodash 활용법
- https://lodash.com/docs/4.17.15
- `_.uniq([배열데이터])`: 배열에서 중복을 제거해 고유한 값만 남김
- `_.uniqBy(배열명, key값)`: 배열의 특정 키 값을 기준으로 고유화된 값만 남김
- `_.unionBy(배열명, 배열명2, 키값)`: 여러 배열 데이터를 고유한 값 기준으로 합침
- `_.find(배열명, 찾을내용)`: 배열에서 찾는 내용을 반환
- `_.findIndex(배열명, 찾을내용)`: 배열에서 찾는 내용의 인덱스를 반환
- `_.remove(배열, 지울내용)`: 배열에서 특정 내용을 찾아 삭제

  ```javascript
  const arr = [1, 2, 2, 3, 4, 4, 5];
  console.log(_.uniq(arr)); // [1, 2, 3, 4, 5]

  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'John' }
  ];
  console.log(_.uniqBy(users, 'name')); // [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}]
    ```
## JSON
- 자바스크립트 데이터를 표현하는 개방형 표준 포맷. `key-value` 쌍으로 구성
- 비동기 통신에서 자주 사용되며, XML을 대체하는 주요 데이터 포맷(예: package.json)
- 큰따옴표("")만 사용 가능하며, undefined 제외 모든 데이터 타입 허용.


```javascript
{
  "name": "juri",
  "age": 95,
  "email": "juri.lee.dev@gmail.com"
}
```
```javascript
import myData from './myData.json';
console.log(myData); // 실제 객체처럼 보이지만 문자 데이터

const user = {
  name: 'juri',
  age: 95,
  email: 'juri.lee.dev@gmail.com'
};
const str = JSON.stringify(user); // JSON 포맷으로 변환
console.log(str); // '{"name":"juri","age":95,"email":"juri.lee.dev@gmail.com"}'
const obj = JSON.parse(str); // JSON을 다시 객체로 변환
console.log(obj); // {name: "juri", age: 95, email: "juri.lee.dev@gmail.com"}
```
## Storage
- 크롬 개발자 도구 > 애플리케이션 > 스토리지
- 브라우저에서 관리되는 일종의 데이터 저장소

**localStorage**
- 데이터가 만료되지 않음.

**SessionStorage**
-  페이지를 닫으면 데이터가 사라짐.

```javascript
localStorage.setItem('key', JSON.stringify({ name: 'juri' })); // 로컬 스토리지에 데이터 저장
const data = JSON.parse(localStorage.getItem('key')); // 로컬 스토리지에서 데이터 조회
console.log(data); // { name: 'juri' }
localStorage.removeItem('key'); // 로컬 스토리지에서 데이터 삭제
localStorage.clear(); // 로컬 스토리지의 모든 값 삭제
```

### lowdb
- Lodash 기반의 작은 JSON 포맷을 DB처럼 활용할 수 있는 패키지

## OMDb API & axios
### OMDb
- https://www.omdbapi.com/
- apikey: 개인별 인증용 키 필요
- URL에서 &, ?: 쿼리스트링을 의미. 속성=값&속성=값 형태로 사용되며 파라미터라고 불림
- 제공 API: `삭제`

### Axios
- https://github.com/axios/axios
- Node.js와 브라우저 환경에서 HTTP 통신을 쉽게 할 수 있도록 도와주는 패키지.

```javascript
import axios from 'axios';

function fetchMovies() {
  axios
    .get('주소+키값') // https 사용 권장
    .then(res => { // 메서드 체이닝 방식
      console.log(res);

      const h1El = document.querySelector('h1');
      const imgEl = document.querySelector('img');

      h1El.textContent = res.data.Search[0].Title;
      imgEl.src = res.data.Search[0].Poster;
    });
}
fetchMovies();
```

## 추가 학습 내용

### 1. 모듈 동적 불러오기
ES6 모듈 시스템에서는 `import`를 정적으로 사용하는 경우가 많지만, 필요할 때만 로드하는 **동적 임포트**도 가능(성능 최적화에 유리)

```javascript
async function loadModule() {
  const module = await import('./module.js');
  module.someFunction();
}
loadModule();
```
### 2. LocalStorage 데이터 자동 만료
localStorage는 기본적으로 만료되지 않지만, 타임스탬프를 저장하여 만료 기능을 구현할 수 있음

```javascript
function setWithExpiry(key, value, ttl) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl, // ttl: 밀리초 단위
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key); // 만료된 데이터 삭제
    return null;
  }
  return item.value;
}
```
### 3. JSON 데이터 처리 팁
JSON.stringify()의 두 번째 매개변수를 사용해 특정 속성만 선택적으로 변환하거나 값을 조정할 수 있음

```javascript
const user = {
  name: 'juri',
  age: 95,
  email: 'juri.lee.dev@gmail.com'
};

const filtered = JSON.stringify(user, ['name', 'email']); // name과 email만 포함
console.log(filtered); // {"name":"juri","email":"juri.lee.dev@gmail.com"}
```
### 4. axios 에러 처리
axios로 네트워크 요청 시 발생할 수 있는 에러를 처리하는 방법

```javascript
axios
  .get('https://api.example.com/data')
  .then(res => console.log(res))
  .catch(error => {
    if (error.response) {
      console.log('서버 응답 에러:', error.response.data);
    } else if (error.request) {
      console.log('요청은 보내졌지만 응답 없음:', error.request);
    } else {
      console.log('기타 에러:', error.message);
    }
  });
  ```