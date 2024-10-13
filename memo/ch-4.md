
# 객체와 메소드
- 객체 속에 있는 함수는 메소드, 프로퍼티는 멤버라고 함
```javascript
const person = {
  name: 'juri',
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
};
person.greet(); // Hello, my name is juri
```

## 생성자 함수

- 객체를 만드는 함수. 
- 생성자 함수는 첫 글자를 대문자로 시작 (파스칼 표기법)

```javascript
function User(first, last) {
  this.firstName = first;
  this.lastName = last;
}
const user1 = new User('juri', 'lee');
console.log(user1); // User { firstName: 'juri', lastName: 'lee' }
```
### 인스턴스
- 생성자 함수를 통해 만들어진 객체를 인스턴스라고 함
```javascript
User.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};
const user2 = new User('amy', 'clarke');
console.log(user2.getFullName()); // amy clarke
```
### 프로토타입
- 객체는 프로토타입을 통해 상속받을 수 있음
- 프로토타입 체인으로 객체가 가지고 있지 않은 메소드를 찾아올 수 있음

```javascript
console.log(user2.hasOwnProperty('firstName')); // true

// 내장 메소드
const fruits = ['apple', 'banana', 'orange'];
console.log(fruits.includes('banana')); // true
```

### this 키워드
- 일반 함수는 호출 위치에 따라 this가 결정되지만, 화살표 함수는 자신이 선언된 곳의 this를 사용

```javascript
const juri = {
  name: 'juri',
  normal() {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  }
};
juri.normal(); // juri
juri.arrow(); // undefined

const amy = {
  name: 'amy',
  normal: juri.normal,
  arrow: juri.arrow
};
amy.normal(); // amy
amy.arrow(); // undefined
```
### this와 setTimeout
- setTimeout 내부 함수에서 this를 사용하면 this가 다른 값으로 바뀌므로 화살표 함수를 사용해야 함
```javascript
const timer = {
  name: 'juri!!',
  timeout() {
    setTimeout(() => {
      console.log(this.name);
    }, 2000);
  }
};
timer.timeout(); // juri!!
```
### class
-  ES6에서 제공되는 문법. 생성자 함수를 대체하는 방식
```javascript
class UserClass {
  constructor(first, last) {
    this.firstName = first;
    this.lastName = last;
  }
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
const juriClass = new UserClass('juri', 'lee');
console.log(juriClass.getFullName()); // juri lee
```
### 상속(확장)
```javascript
class Vehicle {
  constructor(name, wheel) {
    this.name = name;
    this.wheel = wheel;
  }
}
class Bicycle extends Vehicle {
  constructor(name, wheel) {
    super(name, wheel); // 부모 클래스의 생성자를 호출
  }
}
const myBicycle = new Bicycle('삼천리', 2);
console.log(myBicycle); // Bicycle { name: '삼천리', wheel: 2 }

class Car extends Vehicle {
  constructor(name, wheel, license) {
    super(name, wheel);
    this.license = license;
  }
}
const myCar = new Car('벤츠', 4, true);
console.log(myCar); // Car { name: '벤츠', wheel: 4, license: true }
```
- `extends` 키워드를 사용해 부모 클래스를 확장할 수 있음.
- `super`를 호출해 부모 클래스의 생성자를 실행해야 함