# 데이터

## 들어가기 전에 참고
- MDN 사이트에서 기술이 없거나 권장하지 않는 메소드, 실험적 메소드들을 확인할 수 있음
- 화살표 함수는 매개변수가 하나인 경우 괄호 생략 가능
- `prototype`이 없는 메소드는 정적 메소드임. 객체에서 직접 사용 불가

## 데이터 타입

### String (문자열)
- 대표 메소드
  - `.indexOf()`: 특정 문자열이 있으면 해당 위치의 인덱스, 없으면 `-1` 반환
  - `.length`: 문자열 길이 반환
  - `.slice(시작 인덱스, 끝 인덱스)`: 문자열을 잘라냄. 끝 인덱스는 포함되지 않음
  - `.replace(찾을 문자열, 바꿀 문자열)`: 문자열 일부를 교체
  - `.match()`: 정규 표현식과 함께 사용
  - `.trim()`: 문자열의 앞뒤 공백 제거

### Number (숫자)
- 대표 메소드
  - `toFixed(소수점 자리 수)`: 소수점을 지정한 자리까지만 표현하고 문자열로 반환
  - `parseInt()`: 문자열을 정수로 변환
  - `parseFloat()`: 문자열을 부동소수점 숫자로 변환
  - `Math` 객체
    - `Math.abs()`: 절대값 반환
    - `Math.min()`, `Math.max()`: 최소값, 최대값 반환
    - `Math.ceil()`: 올림 처리
    - `Math.floor()`: 내림 처리
    - `Math.round()`: 반올림
    - `Math.random()`: 0과 1 사이의 랜덤한 숫자 반환함. 정수가 필요하면 곱셈을 통해 사용

### Boolean (불리언)
- 참/거짓을 나타내는 데이터 타입

### undefined, null
- `undefined`: 변수가 선언만 되고 값이 없을 때
- `null`: 의도적으로 값이 비어 있음
- 차이: `undefined`는 할당되지 않은 상태, `null`은 값이 없음을 의도적으로 설정한 것

### Array (배열)
- 배열은 순서가 있는 데이터 집합
- 대표 메소드
  - `.length`: 배열의 길이를 반환
  - `.find(cb)`: 콜백 함수 조건을 만족하는 첫 번째 요소를 반환
  - `.concat()`: 배열을 이어 붙여 새 배열을 반환함. 원본 배열은 유지
  - `.forEach(cb)`: 각 배열 요소에 대해 콜백 함수를 실행, 반환값 없음
  - `.map(cb)`: 콜백 함수가 적용된 새로운 배열을 반환
    ```javascript
    const fruits = ['apple', 'banana', 'cherry']
    fruits.forEach((fruit, index) => {
      console.log(`${fruit}-${index}`)
    })

    const mappedFruits = fruits.map((fruit, index) => ({
      id: index,
      name: fruit
    }))
    console.log(mappedFruits)
    ```
  - `.filter()`: 조건을 만족하는 요소들로 새 배열을 만듦
    ```javascript
    const numbers = [1, 2, 3, 4]
    const filteredNumbers = numbers.filter(number => number < 3)
    console.log(filteredNumbers) // [1, 2]
    ```
  - `.find()`: 특정 조건을 만족하는 첫 번째 요소를 반환
  - `.findIndex()`: 특정 조건을 만족하는 첫 번째 요소의 인덱스를 반환
  - `.includes()`: 배열에 특정 요소가 포함되어 있는지 확인
  - `.push(), .unshift()`: 배열의 끝이나 앞에 요소를 추가, 원본 배열을 수정
  - `.reverse()`: 배열을 역순으로 정렬, 원본 배열을 수정함.
  - `.splice(인덱스, 삭제할 요소 수, 추가할 요소)`: 배열의 특정 위치에서 요소를 추가하거나 삭제

###  Object (객체)
- 객체는 키-값 쌍으로 데이터를 저장함.
- 대표 메소드
    - Object.assign(대상 객체, 복사할 객체): 객체를 복사하여 새로운 객체로 만듦
        ```javascript
        const userAge = { name: 'juri', age: 95 }
        const userEmail = { email: 'juri.lee.dev@gmail.com' }
        const merged = Object.assign({}, userAge, userEmail)
        console.log(merged) // { name: 'juri', age: 95, email: 'juri.lee.dev@gmail.com' }
        ```
  - Object.keys(객체): 객체의 키들을 배열로 반환함.
    ```javascript
    const user = { name: 'juri', age: 95, email: 'juri.lee.dev@gmail.com' }
    console.log(Object.keys(user)) // ['name', 'age', 'email']
    ```

## 구조 분해 할당 (비구조화 할당)
- 객체나 배열의 속성을 쉽게 추출해 변수로 할당하는 문법
- 기본값을 설정할 수 있음
```javascript
const user = { name: 'juri', age: 95, email: 'juri.lee.dev@gmail.com', address: 'usa' }
const { name, age, email, address = 'korea' } = user
console.log(name, address) // juri, usa
```
## 전개 연산자 (spread operator)
- 배열이나 객체를 펼쳐서 요소를 나열함.
```javascript
const fruits = ['apple', 'banana', 'cherry']
console.log(...fruits) // apple banana cherry
```
## 불변성
- 원시 데이터 타입은 불변성을 가짐. (값이 변하지 않음)
- 참조형 데이터는 불변하지 않음. (값을 참조하는 주소를 통해 변할 수 있음)

## 얕은 복사와 깊은 복사
- 얕은 복사: 참조형 데이터의 1차원만 복사 (Object.assign(), 전개 연산자)
- 깊은 복사: 객체의 모든 중첩 구조를 복사, lodash의 _.cloneDeep() 등을 사용
```javascript
const obj = { a: 1, b: { c: 2 } }
const shallowCopy = { ...obj } // 얕은 복사
const deepCopy = _.cloneDeep(obj) // 깊은 복사
```