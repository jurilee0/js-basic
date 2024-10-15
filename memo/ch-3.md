# JS 함수

## 인수와 매개변수
- **매개변수**: 함수를 정의할 때 선언하는 변수
- **인수**: 함수를 호출할 때 전달하는 실제 값

### return 키워드
- `return`은 함수 내부에서 즉시 값을 반환하고 함수 실행 종료
- `return` 뒤에 있는 코드는 실행되지 않음

```javascript
function sum(a, b) {
    return a + b;
    console.log('이 코드는 실행되지 않음');  // 이 구문은 실행되지 않음
}
console.log(sum(2, 3));  // 5
```

## 함수 선언과 실행
- 함수를 선언한 뒤 호출해야 동작
- 함수 선언: `function name() { }`
- 함수 호출: `name();`

### 함수를 변수에 담아 사용하는 것
- 함수를 여러 번 선언하고 호출하는 것보다, 변수를 사용해 함수를 저장하면 재사용성과 효율성이 높음
- 그러나 반복적으로 사용하지 않는 경우에는 변수로 저장할 필요 없음

```javascript
// 여러 번 호출하는 경우
const multiply = function (x, y) {
    return x * y;
};
console.log(multiply(2, 3));  // 6
console.log(multiply(4, 5));  // 20

// 일회성인 경우에는 굳이 변수에 담지 않아도 됨
console.log((function (x, y) { return x * y })(3, 5));  // 15
```

## 함수 선언 방식 vs 함수 표현식(익명 함수)
- **함수 선언**: 호이스팅에 의해 함수 선언부가 코드 최상단으로 끌어올려짐
- **함수 표현식(익명 함수)**: 호이스팅되지 않음

```javascript
// 함수 선언 방식
function greet() {
    console.log('Hello');
}
greet();  // 정상 작동

// 함수 표현식
const sayHi = function() {
    console.log('Hi');
};
sayHi();  // 정상 작동
```

### arguments 객체
- 함수 내부에서 매개변수를 명시하지 않아도 **`arguments`** 객체를 통해 전달된 인수를 확인할 수 있음
- 하지만 명시적으로 매개변수를 선언하는 것을 권장

```javascript
function showArguments() {
    console.log(arguments);
}
showArguments(1, 2, 3);  // [1, 2, 3]
```

## 화살표 함수 (Arrow Function)
- 화살표 함수는 더 간결하게 함수를 작성할 수 있음
- 중괄호(`{}`)를 생략하면 암묵적으로 `return`

```javascript
const add = (a, b) => a + b;
console.log(add(2, 3));  // 5

// 중괄호가 필요한 경우에는 return 키워드를 명시해야 함
const multiply = (a, b) => {
    return a * b;
};
console.log(multiply(2, 3));  // 6
```

## IIFE(즉시 실행 함수)
- 선언과 동시에 즉시 실행되는 함수
- **방법 1**: `(function() { })();`
- **방법 2**: `(function() { }());`

```javascript
(function () {
    console.log('즉시 실행!');
})();  // 즉시 실행!
```

## 호이스팅(Hoisting)
- 함수 선언부가 코드 최상단으로 끌어올려지는 현상
- **유용성**: 함수가 복잡하거나 긴 경우 함수를 미리 선언해두면 코드 가독성 향상

```javascript
console.log(sum(2, 3));  // 5
function sum(a, b) {
    return a + b;
}
```

## 타이머 함수
- `setTimeout(함수, 시간)`: 일정 시간 후 함수 실행.
- `setInterval(함수, 시간)`: 일정 시간 간격으로 함수 실행.
- `clearTimeout()`: 설정된 타임아웃 함수를 종료.
- `clearInterval()`: 설정된 인터벌 함수를 종료.

```javascript
// 3초 후 실행
setTimeout(() => {
    console.log('3초 후 실행');
}, 3000);

// 1초 간격으로 실행
const interval = setInterval(() => {
    console.log('1초마다 실행');
}, 1000);

// 5초 후 인터벌 종료
setTimeout(() => {
    clearInterval(interval);
}, 5000);
```

## 콜백 함수
- **콜백 함수**는 다른 함수의 인수로 전달되어 특정 작업이 완료된 후 실행되는 함수
- **비동기 처리**나 **순차적인 실행**을 보장할 때 많이 사용

```javascript
function doTask(callback) {
    console.log('작업 실행 중...');
    callback();  // 작업이 끝난 후 콜백 실행
}

function taskCompleted() {
    console.log('작업 완료!');
}

doTask(taskCompleted);
// "작업 실행 중..."
// "작업 완료!"
```

#### 비동기 예제 (콜백 함수 사용)

```javascript
function timeout(cb) {
    setTimeout(() => {
        console.log('3초 후 실행');
        cb();  // 콜백 함수 실행
    }, 3000);
}

timeout(() => {
    console.log('콜백 함수 실행 완료');
});
// "3초 후 실행"
// "콜백 함수 실행 완료"
```

- `setTimeout` 함수가 3초 후 실행되며 그 후에 콜백 함수가 실행되는 구조
- 콜백 함수는 함수가 완료된 후 특정 작업을 처리할 때 유용