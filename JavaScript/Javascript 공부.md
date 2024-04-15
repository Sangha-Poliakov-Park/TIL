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

