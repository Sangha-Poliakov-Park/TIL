# 자바스크립트 구동

[reference](https://www.freecodecamp.org/news/execution-context-how-javascript-works-behind-the-scenes/)

JavaScript (\<script>)

onclick으로 console.log 출력한다고 치면,
우선 DOM트리 구성을 다 완료한 후, 자바스크립트 엔진이 파싱-컴파일-호이스팅-코드를 읽으며 초기화 및 할당완료함.

이렇게 준비된 상태에서 onclick시 해당 함수 호출.


## 실행 컨텍스트

>생성 과정
컴파일 전 parsing -> 컴파일 -> 컴파일 후 호이스팅 -> 코드의 실행단계 시작 (스크립트를 위에서 아래로 리딩) -> 초기화 및 할당


>정의 : 실행 컨텍스트를 생성한다 $=$ 자바스크립트 엔진이 코드 실행을 하기위해 필요한 모든 데이터를 준비하고 관리하는 과정

>생명 주기 : 보통 웹페이지를 닫거나 다른페이지로 navigation할때 발생

*전역 실행컨텍스트와 함수 실행컨텍스트의 호이스팅은 서로 독립적으로 이루어진다. 전역실행컨텍스트가 호이스팅하는 함수 declaration 은 함수의 메타데이터를 호이스팅 하는 것이고, 함수 실행컨텍스트가 호이스팅 하는 것은 실행을 위해 준비하는 과정이라고 이해하면 이해가 편할 듯 하다.*

```javascript
//실행컨텍스트에 호이스팅됨
function multiply(x, y) {
    return x * y;
}
//실행컨텍스트에 호이스팅됨
function printResult(num) {
    console.log("The result is: " + num);
}
//함수 선언 전체 호이스팅
function calculateAndDisplay() {
     var result = multiply(5, 3); 
    printResult(result);
}

/*하기 calculateAndDisplay() 구동과정
1. 함수, 변수들 호이스팅 및 할당 완료 - 최상위 실행컨텍스트 푸쉬 된 상태.

2. calculateAndDisPlay 호출 - var result 호이스팅 완료 (var이므로 undefined 할당)- 상위 실행컨텍스트에서 참조 가능한 multiply함수 호출

3.multiply 실행컨텍스트push-> 호이스팅할 변수나 함수 없음-> ->console.log 전역실행컨텍스트에서 호출-> 리턴값 생성 후 pop

4. 호이스팅된 result에 값 할당 완료.

5. printResult() 실행 컨텍스트 생성 -> console.log 호출 후 pop-> caculateAndDisplay pop 끝 */

calculateAndDisplay();
```


## 호이스팅
#### 변수
+ var타입 - 변수의 이름을 생성단계에서 메모리에 저장(undefined로 우선 할당), 실제 할당은 실행 단계에서 코드가 해당 변수를 만났을 때 실현.

+ let/const - 변수의 이름은 메모리에 저장 되지만, undefined로 초기화 안됨 (Temporal Dead Zone, TDZ 일시적 사각지대) 초기화전 접근 시 ReferenceError에러 

#### 함수
+ 함수선언(function declaration)
    + 함수의 본체가 모두 호이스팅됨.
    + 따라서 실제 함수 선언 보다 앞에 있어도 문제없이 실행 가능
    + 함수 실행시 새로 생성되는 실행컨텍스트와는 독립적으로 호이스팅.
+ 함수 표현식 (function expression)
    + 변수의 호이스팅 규칙을 따름, 변수의 이름만 우선 호이스팅, 함수 선언위치에서 초기화 및 할당

#### 용어 정리
*실행 컨텍스트*
+ 전역 실행 컨텍스트(Global Execution Context)
    +가장 바깥쪽, 전역 변수와 함수 포함
+ 함수 실행 컨텍스트(Function Execution Context)
    +함수 호출 시 생성
+ eval 실행 컨텍스트 ...?

*컨텍스트 구성요소
+ 변수객체(Variable Object)

+ Scope Chain    
    지역 스코프(Local Scope): 현재 함수 내에서 선언된 변수와 매개변수를 포함.  
    외부 스코프(Outer Scopes): 현재 함수가 정의된 곳의 스코프. 다른 함수나 전역 스코프일 수 있음.  
    전역 스코프(Global Scope): 코드 어디서나 접근 가능한 변수와 함수를 포함합니다.  



## String Interning
자바와는 다르게 문자열이 primitive type이다.
그렇다면 문자열을 담는 변수마다 메모리 할당이 이루어질까 라는 생각이 들었다.
[Java의 경우](/Java/문자열풀.md)

JS는 String Interning으로 문자열 처리의 효율성을 높인다.
[reference](https://softwareengineering.stackexchange.com/questions/325811/memory-usage-of-javascript-string-type-with-identical-values)
알아본 결과, 자바스크립트에서는 String Pool과 같은 명칭은 없고 각 엔진마다의 구조에 따라 엔진 내부 메모리에서 관리된다고 한다. 개발자는 String intern에 개입할 수 없고, 브라우저 엔진의 구현방식에 따라 달라진다고 한다. 다만 Garbage Collector는 참조 대상이 없을 때 마찬가지로 구현된다.

*immutable*
str[0] = '변경문자열' 은 작동하지 않는다.

자바스크립트는 대소문자를 구별(case-sensitive)하므로 null은 Null, NULL등과 다르다.

타입을 나타내는 문자열을 반환하는 typeof 연산자로 null 값을 연산해 보면 null이 아닌 object가 나온다. 이는 자바스크립트의 설계상의 오류이다.

### 따라서 null 타입을 확인할 때 typeof 연산자를 사용하면 안되고 일치 연산자(===)를 사용하여야 한다.

> 타입 연산자  
`let type = typeof 'Hi';`
<mark>반환값은 문자열이므로 비교시 비교 대상을 문자열값으로 지정해야한다.</mark>

str = "큰 따옴표로 감싼 문자열 내의 '작은 따옴표'는 문자열이다.";
str = '작은 따옴표로 감싼 문자열 내의 "큰 따옴표"는 문자열이다.';

## undefined vs null
>undefined
>> 변수 메모리 공간을 만들기만 하고(변수선언만하고) 아무것도 할당한 적이 없을 때.
>null
>> 할당된 혹은 할당할 값 자체가 없을 때.

> QuerySelector에서의 Null 반환
>null은 "존재하지 않거나 유효하지 않은 값"을 의도적으로 표현한 값입니다.
undefined는 변수가 선언되었으나 아직 값을 할당받지 않은 상태를 나타냅니다.

둘의 차이를 명확하게 숙지해야함(애초에 값이 없다는 것이지 이를 참조하는 변수에 대한 설명이 아니기에 )

할당 참조
---

할당
let number = 1;
1) 'number' 변수에 대한 메모리 공간 할당 (메모리 할당은 특정 데이터를 저장할 공간을 예약하는 과정)

2) number에 1 이진코드 저장

참조
let numbers = [1,2,3,4];
1) numbers 메모리 공간 할당
2) 배열 메모리 생성 후 존재, 이를 구성하는 primitive 자료는 해당 메모리에 저장
3) 배열 메모리의 주소값을 number 변수에 저장.

기본자료형으로 모든 데이터를 변수 메모리에 저장 할 시 메모리 문제 등의 문제 발생, 성능 저하


<u>문자열은 참조된다(JAVA와 동일)</u>

String은 원시타입이지만 주소 참조로 값을 전달하는 특징을 가지고 있다. 

원시타입은 불변하므로 String 배열을 사용하여 글자하나하나 바꾸는 것이 불가하다.

Garbage Collection 작동
[Reference](https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_Management)

참조되지 않을 때 Garbage로 Collector에 넘겨짐
``` javascript
var t = "hello"
t = null;
/*"hello" 문자열은 garbage
도달 가능성(reachability)이 사라졌기 때문이다.
*/
```


## 객체 생성

<mark>생성자로 객체 만드는게 아닐경우 프로퍼티 선언 후 ';' 빼야함</mark>

```javascript 
function Student(name, age, gender, greetings = "") {
    this.name = name;
    this.age = age;
    this.gender = gender;
    /* 'Student' 생성자 함수에서 'greetings' 매개변수는 기본값으로  설정한 후,
       'greetings' 함수는 매개변수 'str'을 가지며, 이 매개변수의 기본값을 생성자 함수의 'greetings' 매개변수 값으로 지정한다.
       'greetings' 함수 선언시 매개변수 내부에 greetings만 작성한다면, 이는 지역변수를 생성한 것으로 취급된다. 
       */
    this.greetings = function (str = greetings) { console.log(this.name + " 인사 : " + str); }
}
const sangha = new Student("박상하", 12, "남자", "안녕?");
sangha.greetings();
```
프로퍼티 성질
```javascript
var person = {
  'first-name': 'Ung-mo',
  'last-name': 'Lee',
  gender: 'male'
};

for (var prop in person) {
  console.log(prop + ': ' + person[prop]);
}
```

*for-in 문은 객체의 문자열 키(key)를 순회*
+ 배열에서 사용시 문제 
    + 배열 요소에 배열 프로퍼티까지 순회하는 문제
    + SET 처럼 순회함.

*for-of 로 배열 순회*

```javascript
for (const value of array) {
  console.log(value);

for (const [index, value] of array.entries()) {
  console.log(index, value);
}
```

*참조값 전달*
```javascript
// Pass-by-reference
var foo = {
  val: 10
}

var bar = foo;
console.log(foo.val, bar.val); // 10 10
console.log(foo === bar);      // true

bar.val = 20;
console.log(foo.val, bar.val); // 20 20
console.log(foo === bar);      // true
```

*유효하지 않은 프로퍼티 선언*
```javascript
let student = {
//-가 연산자로 작동, first 변수부터 찾으므로 오류 발생
//모든 프로퍼티 키는 String 값이다.
//''로 표현하든 [] 사이에 넣든 식으로 프로퍼티 표현 가능 
first-name : "James"
}
//access할 때는 [''] 대괄호 안에 따옴표까지 넣어서.

console.student['first-name']
```

>assign으로 immutable 객체 생성시 source의 프로퍼티만 복사한다.  
$\therefore$ 프로퍼티 값이 참조 값인 경우 같은 주소값을 참조한다.  
  primitive인 경우에만 고유한 복사된 프로퍼티를 보유한다.

deep freeze 나중에 한번 더보기


## 함수

함수 선언문도 함수 표현식과 동일하게 함수 리터럴 방식으로 정의되는 것. 다만 함수 선언 후 변수에 함수 참조값을 할당하는 것을 생략했을 뿐임.

익명함수는 호이스팅 되지 않는점 잊지 말 것 

### 일급 객체 <a href="#prototype"> 프로토타입을 이해하고 다시 읽으면 전부 명확하게 보인다</a>
함수들은 Function 클래스의 인스턴스이다.
따라서 변수에 선언하면 해당 객체의 참조값을 pass하고, 생성자로 만들 수 도 있으며, 함수 내에서 불러오기도 가능하다.
new Function(arg1, arg2, ... argN, functionBody)
arg1: parameter 변수, 전부 문자열 타입, 'return sum;' 식으로 (거의 사용 안함)


### 콜백함수
+ Javascript의 메모리관리
[콜스택 - 큐 관계](https://new93helloworld.tistory.com/361)
[원본](https://gist.github.com/jesstelford/9a35d20a2aa044df8bf241e00d7bc2d0)

> 내가 한 이해
>onclick에 자바스크립트 코드가 있다고 치면, onclick이 일어난 후 그 콜백함수가 큐에 저장되어있다가 stack에 있는 다른 함수들의 실행컨텍스트가 전부 pop 되면 들어가서 실행됨

### 리턴
함수는 반환을 생략할 수 있다. 이때 함수는 암묵적으로 undefined를 반환한다.

배열 반환 `return [area, volume]; // 복수 값의 반환`

### arguments
매개변수를 인자로 갖는 배열과 유사한 객체이다.
(객체이나 property key를 별도설정하지 않은 느낌처럼)
length 속성은 있으나 , for...of 사용 불가능

배열로 만들기 -> Function.prototype.call, Function.prototype.apply


*caller* 
자신을 호출한 함수

*length*
매개변수의 갯수
arguments.length는 인자의 갯수(선언된 매개변수의 갯수가 아닌 것)

*name*
함수 이름

### 함수 형태

*즉시실현*  
함수선언시 <sub>단순(){}형태로</sub>  중괄호 뒤에 자동으로 세미콜론이 붙는 자바스크립트 엔진 특성으로 함수실행용()까지 포함하거나 선언문에 괄호를 쳐 세미콜론을 막아줌
$\left( \text{함수선언} \left( \phantom{hi} \right) \right)$  
$\left( \text{함수선언} \right) \left(\phantom{hi} \right)$




##타입 확인

> 1. Object.prototype.toString.call('');
> 2. slice로 필요한 부분 짤라서.
> 3. slice(beginIndex, endIndex) => 추출 범위 [beginIndex, endIndex)

좋은 예시
```html
<!DOCTYPE html>
<html>
<body>
  <p>Hello</p>
  <script>
    function getType(target) {
      return Object.prototype.toString.call(target).slice(8, -1);
    }

    function isString(target) {
      return getType(target) === 'String';
    }

    function isElement(target) {
      return !!(target && target instanceof HTMLElement);
      // 또는 `nodeType`을 사용할 수도 있다.
      // return !!(target && target.nodeType === 1);
    }

    // HTMLElement를 상속받은 모든 DOM 요소에 css 프로퍼티를 추가하고 값을 할당한다.
    function css(elem, prop, val) {
      // type checking
      if (!(isElement(elem) && isString(prop) && isString(val))) {
        throw new TypeError('매개변수의 타입이 맞지 않습니다.');
      }
      elem.style[prop] = val;
    }

    css(document.querySelector('p'), 'color', 'red');
    css(document.querySelector('div'), 'color', 'red');
    // TypeError: 매개변수의 타입이 맞지 않습니다.
  </script>
</body>
</html>
```

<div id="prototype">

## 프로토타입

>나의 해석 (공부전)<del> 
>Function.prototype 은 Function 타입의 prototype이라는 key 명칭을 가진 객체이고 모든 함수는 이 Function 타입의 prototype객체를 부모 객체로 두어 상속 받는다.
반면 Function의 prototype을 키값으로 가지는 객체는 Object의 prototype을 키값으로 가지는 객체를 부모로둔다.</del>

1. new 함수실행; 을 하게되면, new 시점에 텅 비어있는 객체를 생성하고 new 실행이 끝나기 전에 [[PROTOTYPE]] 링크에 생성 함수의 prototype 프로퍼티가 가리키고 있는 객체를 연결한다.

2. 이 객체를 표기하기 위해 생성자.prototype이라 표현하는 것이고, 생성자.prototype 은 다시 Object.prototype을 상속 받는다.

3. 반면 함수 자체는 [[PROTOTYPE]]에 Function.prototype을 링크 시켜놓는다. 다시 이 Function.prototype은 Object.prototype을 상속 받는다.

4. 그렇다면 Function.__proto__는 무엇인가? 놀랍게도 Function.prototype이다

5. 이로 인해 Function이 Object.prototype을 상속 받는 객체임을 알 수 있다.

6. 반면 Object는 Function.prototype을 상속 받는다.
    >> 콘솔에는 .prototype이 생략되어서 헷갈릴 수 있다. 리터럴로 생성한 객체는 Object.prototype을 상속 받는다.

>new MyFunction()으로 생성된 객체 → 상속받는 프로토타입: MyFunction.prototype  
MyFunction.prototype → 상속받는 프로토타입: Object.prototype  
MyFunction (함수로서) → 상속받는 프로토타입: Function.prototype
Function.prototype → 상속받는 프로토타입: Object.prototype

원시타입의 경우 해당 원시타입의 생성자 함수.prototype의 메소드나 프로퍼티를 호출하고자 한다면 그 객체로 잠시 변환되어 사용할 수 있다.

그러나 원시타입 자체는 객체가 아니므로 String타입의 str가 있다고 할 때 str.addFunction = function(){}가 불가하다.

하지만 String.prototype안에 해당 함수를 넣어버리면 호출할 수 있다.

*프로토타입 객체 변경관련 내용*
```javascript
function Person(name) {
  this.name = name;
}

var foo = new Person('Lee');

// 프로토타입 객체의 변경
Person.prototype = { gender: 'male' };

var bar = new Person('Kim');

console.log(foo.gender); // undefined
console.log(bar.gender); // 'male'

console.log(foo.constructor); // ① Person(name)
console.log(bar.constructor); // ② Object()

```

프로토타입의 필드가 객체의 필드와 동일하면 객체의 값으로 할당된다.
*자바의 은닉화 대응되는 개념이다*

## OOP
JS에서 생성자 함수로 객체 생성시(유사 클래스) 객체별로 메소드가 독립적으로 존재하므로 메모리를 많이 차지한다.

Java에서는 메소드는 Method Area에 등록되어 각 인스턴스가 이에 접근을 하는 방식인데 이를 모방할 수 있다.

따라서 JS에서는 메소드 정의를 __prototype__.prototype에 선언하여 클래스들이 공유할 수 있도록 설정해주면 된다.


*더글라스 크락포드의 메소드 추가 제안*

```javascript
/**
 * 모든 생성자 함수의 프로토타입은 Function.prototype이다. 따라서 모든 생성자 함수는 Function.prototype.method()에 접근할 수 있다.
 * @method Function.prototype.method
 * @param ({string}) (name) - (메소드 이름)
 * @param ({function}) (func) - (추가할 메소드 본체)
 */
Function.prototype.method = function (name, func) {
  // 생성자함수의 프로토타입에 동일한 이름의 메소드가 없으면 생성자함수의 프로토타입에 메소드를 추가
  // this: 생성자함수
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
};

/**
 * 생성자 함수
 */
function Person(name) {
  this.name = name;
}

/**
 * 생성자함수 Person의 프로토타입에 메소드 setName을 추가
 */
Person.method('setName', function (name) {
  this.name = name;
});

/**
 * 생성자함수 Person의 프로토타입에 메소드 getName을 추가
 */
Person.method('getName', function () {
  return this.name;
});

var me  = new Person('Lee');
var you = new Person('Kim');
var him = new Person('choi');

console.log(Person.prototype);
// Person { setName: [Function], getName: [Function] }

console.log(me);  // Person { name: 'Lee' }
console.log(you); // Person { name: 'Kim' }
console.log(him); // Person { name: 'choi' }
```

Pseudo Classical Inheritance
``` javascript
//해당함수는 즉시실행 함수이기 떄문에 Parent변수는 바로 Parent 함수 객체를 참조하게 된다.
var Parent = (function () {
//Parent 함수 Function 객체로 생성
  function Parent(name) {
    this.name = name;
  }
  Parent.prototype.sayHi = function () {
    console.log('Hi! ' + this.name);
  };
  //반환하는 것을 명심하자
  return Parent;
}());

/
// 자식 생성자 함수
var Child = (function () {
  function Child(name) {
    this.name = name;
  }
  Child.prototype = new Parent(); 
  Child.prototype.sayHi = function () {
    console.log('안녕하세요! ' + this.name);
  };
  Child.prototype.sayBye = function () {
    console.log('안녕히가세요! ' + this.name);
  };
  return Child;
}());

var child = new Child('child'); 

console.log(child instanceof Parent); // true
console.log(child instanceof Child);  // true

```

직접 구현해본 상속(자식 객체의 이름이 없을시 부모객체의 이름을 상속 받는 코드)

```javascript
let Parent = (function () {
    function Parent(name = "이름 미등록") {
        this.name = name;
    }
    return Parent;
}())


let Child = (function () {
    function Child(name=Child.prototype.name) {
        this.name =name
    }
    Child.prototype = new Parent();
    return Child;
}())

let child = new Child("James");
let anonymous = new Child();

console.log(child.name);
console.log(anonymous.name);
```

**이러한 방식으로는 new를 놓쳤을 때 this가 전역으로 배치되고, new 객체의 prototype을 다시 참조하여 부모 함수의 prototype까지 도달하면서 생각해야 하는등 여러모로 불편함이 많이 느껴졌다.**

**생성자링크도 Child.prototype이 Parent로 생성된 객체로 변화하여 Parent.prototype까지 들러 Parent 함수로 Constructor를 반환하는 문제가 있다.**

따라서 Object.create(상속받고자 하는 프로토타입 객체);를 쓴다. 그러면 매개변수를 [[프로토타입]]으로 가진 객체가 생성된다.

동물 컨셉으로 코드를 짜보았다.
```javascript
let Animal = (function () {
  //생성자에 아무런 조치를 취하지 않았으므로 추상클래스로 작동할 것이다.
    function Animal() {}
    Animal.prototype.name = "이름 미지정"
    Animal.prototype.sayHello = function () { console.log("메소드 미지정") }
    return Animal;
})();

let dog = Object.create(Animal.prototype);
dog.sayHello = function () { console.log("멍멍!"); }

dog.sayHello(); // 멍멍!
console.log(dog.name); //이름 미지정
```

리터럴로 생성한 객체는 Object.create를 할때 그냥 해당 객체를 프로토타입으로 참조하게끔 하면된다.

즉 Pseudo 방식은 new로 객체를 만든 다음 프로토타입으로 지정하여 new 객체의 prototype 체인을 형성하는 것이고,

Object.create 방식은 다이렉트로 prototype체인을 연결해주는 것이라 할 수 있다.

Object.create 폴리필
```javascript
if (!Object.create) {
  Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}
```

*private화*

원하는 변수를 클로저 함수에 연결시켜 힙 메모리로 옮긴 후 다루는 방식이다.
클로저 함수는 객체의 프로퍼티와 계속 연결되어 있기 때문에 GC에서 처리하지 않는다.
```javascript
var Person = function(arg) {
  var name = arg ? arg : ''; // ①

  this.getName = function() {
    return name;
  };

  this.setName = function(arg) {
    name = arg;
  };
}
```

get으로 참조값을 반환하는 경우 외부에서 수정이 가능하므로, 다른 변수에 복사해서 복사본을 건네주는 식으로 코딩해야한다.


상속과 은닉을 동시에 할 수 있는 코드이다.
>제시된 코드
```javascript
var Person = function() {
  var name;
  //Person.prototype 상속 받는 F 함수객체 생성
  var F = function(arg) { name = arg ? arg : ''; };
  F.prototype = {
    getName: function() {return name;},
    setName: function(arg) {name = arg;}
  };
  return F;
}();
```

>내가 한 방식(이러면 new를 쓰지 못하므로 구분하기가 어려울 수 있을듯하다.)
```javascript
var Person = function (arg) {
    var name = arg ? arg : "";
    var object = Object.create(Person.prototype);
    object.getName =function(){return name;};
    object.setName =function(arg){name=arg;};
    /* 주석처럼 하면 함수 객체가 리터럴 객체로 반환되서 프로토타입을 공유하지 않아 취소함.
    object = {
        getName: function () { return name; },
        setName: function (arg) { name = arg }
    }
    */
    return object;
}
```
## global object
*자동 형변환 한후 변화시킴 e.g. null -> 0*
parseFloat()
parseInt()

## Math
```javascript
function isEqual(a, b){
  return Math.abs(a - b) < Number.EPSILON;
}
```
(77).toString(); // '77'
1.23.toString (); // '1.23'
77.toString(); // SyntaxError: Invalid or unexpected token
```javascript
/**
 * @param {number} [fractionDigits] - 0~20 사이의 정수값으로 소숫점 이하 자릿수를 나타낸다. 기본값은 0이며 옵션으로 생략 가능하다.
 * @return {string}
 */
numObj.toFixed([fractionDigits])
//금액처리할 때 좋을듯 함. 반올림 개념임
```