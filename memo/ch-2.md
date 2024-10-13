# ECMA Script란

- ECMA Script는 자바스크립트의 표준 스크립트 언어로, 최신 문법과 기능을 제공.

# 데이터 타입 확인

```javascript
console.log(typeof "hi");  // "string" 반환
```

- `typeof`는 데이터 타입을 확인할 때 사용.
- **한계**: 객체, 배열, `null`은 모두 `object`로 반환됨.

### 정확한 데이터 타입 확인 함수

```javascript
function getType(data){
    return Object.prototype.toString.call(data).slice(8, -1);
}
```

- `Object.prototype.toString.call()`을 활용하여 정확한 타입을 반환.

### 내보내기 (Export)

```javascript
export default function getType(data){
    return Object.prototype.toString.call(data).slice(8, -1);
}
```

### 불러오기 (Import)

```javascript
import getType from './getType';
```

- 확장자는 생략 가능.
- 경로를 명시하지 않으면 `node_modules`에서 찾음.

# 연산자

1. **산술 연산자**: `+`, `-`, `*`, `/`, `%`
2. **할당 연산자**: `=`, `+=`, `-=`, `*=`, `/=`, `%=`
3. **비교/논리 연산자**: `===`, `!==`, `>`, `<`, `>=`, `<=`, `&&`, `||`
   - `===`는 데이터 타입까지 비교.
   - `==`는 타입 변환을 허용하며 권장되지 않음.
4. **삼항 연산자**:
   ```javascript
   조건 ? true인 경우 반환 : false 인 경우 반환
   ```

# 조건문

### if/else 문

```javascript
if (조건1) {
    // 조건1이 성립하는 경우 실행
} else if (조건2) {
    // 조건1이 성립하지 않고 조건2가 성립하는 경우 실행
} else {
    // 위 조건들이 모두 성립하지 않는 경우 실행
}
```

### switch 문

```javascript
switch (조건) {
    case 1:
        // 조건이 1인 경우 실행
        break;
    case 2:
        // 조건이 2인 경우 실행
        break;
    default:
        // 그 외의 경우 실행
}
```

- **주의**: `break`를 사용해 명시적으로 조건을 멈춰야 함.
- **장점**: 딱 떨어지는 조건에 대해 가독성이 좋음.

# 반복문

### for 문

```javascript
const ul = document.querySelector('ul');

for (let i = 0; i < 10; i++) {
    const li = document.createElement('li');
    li.textContent = `list-${i+1}`;
    li.addEventListener('click', function(){
        console.log(li.textContent);
    });
    ul.appendChild(li);
}
```

- `for`문은 시작 조건, 종료 조건, 변화 조건을 사용해 반복 실행.

# 변수와 유효 범위 (Scope)

1. **var**:
   - 함수 스코프를 가지며, 의도하지 않은 범위에서 사용될 수 있어 권장하지 않음.
   
2. **let**:
   - 블록 스코프를 가지며, 재할당이 가능.
   
3. **const**:
   - 블록 스코프를 가지며, 재할당이 불가능한 상수를 정의.

# 형변환

- **암묵적 형변환**: 자바스크립트에서 자동으로 데이터 타입을 변환하는 경우.
- **명시적 형변환**: 개발자가 직접 데이터 타입을 변환하는 경우.

### == vs ===

- `==`는 타입을 자동으로 변환하여 비교(비권장).
- `===`는 타입까지 엄격하게 비교(권장).

# Truthy와 Falsy

- **Truthy한 값**: `true`로 평가되는 값 (예: `1`, `"hello"`, `[]`, `{}`)
- **Falsy한 값**: `false`로 평가되는 값 (예: `0`, `""`, `null`, `undefined`, `NaN`, `false`)

# NaN (Not-a-Number)

- **NaN**은 "숫자가 아님"을 나타내는 값.
- 숫자로 변환할 수 없는 연산의 결과로 발생.
- **NaN의 특징**:
  - `typeof NaN`은 `"number"`로 반환됨.
  - 자신과 일치하지 않기 때문에 `NaN === NaN`은 `false`임.
  - NaN 여부를 확인하려면 `Number.isNaN()`을 사용:
  
  ```javascript
  Number.isNaN(NaN);  // true
  Number.isNaN(123);  // false
  ```