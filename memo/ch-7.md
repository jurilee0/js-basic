# 정규 표현식
- 참고 문서: https://heropy.blog/2018/10/28/regexp/
- 들어가기 전 프로젝트 세팅(parcel 번들러 추가, 버전 맞추기) 선행

## 정규식의 역할
- 문자 검색, 대체, 추출

**정규표현식 테스트 사이트**
- https://regex101.com/
- 자바스크립트에서 다루는 정규식과 다르게 작동할 수 있으니 작업 환경에서 테스트 필요

### 정규식 생성
- **생성자 함수 방식**: `new RegExp('표현', '옵션')`
- **리터럴 방식**: `/패턴/옵션`
```javascript
const str = `
010-1234-5582
https://velog.io
hello world
`;

const regexp = new RegExp('Hello', 'gi');
// const regexp = /hello/gi;
console.log(str.match(regexp));
```
### 정규식을 다루는 JS 메소드
- `정규식.exec(문자열)`: 일치하는 하나의 정보(Array) 반환
- `정규식.test(문자열)`: 일치 여부(Boolean) 반환
- `문자열.match(정규식)`: 일치하는 문자열의 배열(Array) 반환
- `문자열.search(정규식)`: 일치하는 문자열의 인덱스(Number) 반환
- `문자열.replace(정규식, 대체문자)`: 일치하는 문자열을 대체하고, 대체된 문자열(String) 반환
- `문자열.split(정규식)`: 일치하는 문자열을 분할하여 배열(Array)로 반환
- `생성자_정규식.toString()`: 생성자 함수 방식의 정규식을 리터럴 방식의 문자열로 반환
- `test, match, replace` 사용 빈도 높음

```javascript
const str = 'Hello world!';

// test: 문자열에 특정 패턴이 있는지 확인
const regexTest = /world/;
console.log(regexTest.test(str)); // true

// match: 문자열에서 일치하는 패턴 반환
const regexMatch = /o/g;
console.log(str.match(regexMatch)); // ['o', 'o']

// replace: 패턴에 일치하는 부분을 대체
const replaced = str.replace(/world/, 'JavaScript');
console.log(replaced); // 'Hello JavaScript!'
```
### 옵션 (플래그)
- `g`: global. 모든 문자와 여러 줄 일치
- `i`: ignore case. 대소문자 구분하지 않음
- `m`: multi line. 여러 줄 일치 (각 줄마다 일치)
- `u`: Unicode. 유니코드 사용
- `y`: sticky. 지정된 인덱스에서 1회 일치 (지원 여부 확인 후 사용)

```javascript
const str = `
010-1234-5678
Hello hello
https://velog.io
`;

// g: 전체에서 일치하는 패턴 찾기
const regexG = /hello/g;
console.log(str.match(regexG)); // ['hello']

// i: 대소문자 무시
const regexI = /hello/gi;
console.log(str.match(regexI)); // ['Hello', 'hello']

// m: 여러 줄 모드
const regexM = /^010/gm;
console.log(str.match(regexM)); // ['010']
```
### 표현(패턴)
- `^`: 줄의 시작에서 일치
- `$`: 줄의 끝에서 일치
- `.`: 임의의 한 문자와 일치
- `a|b`: a 또는 b와 일치
- `ab?`: b가 없거나 b와 일치
- `{3}`: 3개와 일치
- `{3,}`: 3개 이상 연속 일치
- `{3,5}`: 3개 이상 5개 이하 연속 일치
- `[abc]`: a 또는 b 또는 c와 일치
- `[a-z]`: a부터 z까지 문자 구간과 일치
- `[A-Z]`: A부터 Z까지 문자 구간과 일치
- `[0-9]`: 0부터 9까지 숫자 구간과 일치
- `[가-힣]`: 가부터 힣까지 문자 구간과 일치
- `\w`: word, 대소문자 영문 52개, 숫자 10개, _에 일치
- `\b`: 경계, 63개 문자에 일치하지 않는 문자 경계
- `\d`: digit, 숫자에 일치
- `\s`: space, 공백에 일치
- `(?=)`: 앞쪽 일치
- `(?<=)`: 뒤쪽 일치
```javascript
let str = `
010-1234-5678
juri.lee.dev@gmail.com
https://velog.io
dog fox
abcdefg
jjjj
https://naver.com
`;

console.log(
  str.match(/g$/g),           // null (줄 끝에 g가 없음)
  str.match(/g$/gm),          // ['g'] (각 줄의 끝에서 찾음)
  str.match(/^j/gim),         // ['j', 'j'] (모든 줄의 시작에서 j 찾음)
  str.match(/fox|dog/g),      // ['dog', 'fox'] (dog 또는 fox 찾음)
  str.match(/https/g),        // ['https', 'https'] (https 찾음)
  str.match(/j{2}/g),         // ['jj'] (j가 연속 2번 나타나는 부분)
  str.match(/\b\w{2,3}\b/g),  // ['dog', 'fox', 'jjj'] (단어 경계에서 2~3글자 찾음)
  str.match(/[0-9]{1,}/g),    // ['010', '1234', '5678'] (숫자 1개 이상 연속된 부분)
  str.match(/.{1,}(?=@)/g),   // ['juri.lee.dev'] (@ 앞에 있는 모든 문자 찾음)
  str.match(/(?<=@).{1,}/g)   // ['gmail.com'] (@ 뒤에 있는 모든 문자 찾음)
);
```