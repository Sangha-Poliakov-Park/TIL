// 기본개념 
/*


<상세 내용>
메소드의 개념을 분명히 하고 넘어가야 이해하기가 수월해진다.
또한 '컨텍스트 손실' 의 개념을 이해해야 완전한 숙달이 가능하다.

자바스크립트 엔진은 메소드를 호출할 때 호출 문법을 분석한다.
이는 . 연산자나 []연산자 문법이 있음을 판단하고 발생하는 과정이다.

그러나 다른 변수에 메소드의 주소값을 그대로 할당해버리면, 더 이상 '.'이나 '[]' 연산자를 찾을 수가 없으므로, 객체와의 this 연결이 끊어진다
=> 컨텍스트 손실 이를 기반으로 이해하면 하기 내용으로 정리가 된다.
화살표 콜백함수의 경우 어떤 메소드의 매개변수로 들어 가 있을시, 그 메소드 속으로 들어가는 것이 아닌 외부 함수에서 선언되고 그 반환 값을 넘기는 것에 불과하므로, 해당 외부함수가 참조하는 this를 그대로 부여 받는다. 


<간략 정리>
일반함수 호출 : 전역객체 this 참조 => 함수 호출의 기본 값이다.
메소드 호출 : 해당 메소드를 호출한 객체를 this 참조 => . 연산자를 거쳐서 주소값에 도달했는지 검토된 상태에서 해당 객체로 this를 연결한다. 
생성자 함수 : 새로 생성되는 객체 참조(즉 메소드 생성이후 이를 할당하는 과정에서의 this만 포함하는 것이지, 할당되고 나서부터는 '.'연산자 규칙을 따라 this가 동적으로 변화한다.)
화살표 함수 : 렉시컬 스코프의 컨텍스트의 this를 참조함.
*/
function showThis() {
    return console.log(this);
}

function talk(lang) {
    if (lang === 'kor') {
        return console.log(`저는 ${this.name} 입니다.`);
    } else if (lang === 'ru') {
        return console.log(`Меня зовут ${this.name}`);
    } else
        return console.log(`my name is ${this.name}`);
}

const me = {
    name: '상하',
    talk: talk,
    showThis: showThis
}

const you = {
    name: 'Настя',
    talk: talk
}

//객체의 메소드로 사용되고 있으므로 호출하고 있는 각 객체를 참조한다.
me.showThis();
me.talk();// 상하
you.talk();// Настя

//bind, call 메소드로 this 한정 짓기
const meTalk = talk.bind(me);
meTalk(); // talk의 this가 me로 한정 지었음.

//bind와 call 차이
talk.bind(you)('ru'); //talk의 this를 you로 한정 지었음.
talk.call(you, 'ru');



//혼동되는 예시 1
var a = 6;
var obj = {
    a: 12,
    doSomething: function () { console.log(this.a) }
};
var foo = obj.doSomething;
obj.doSomething(); //12
foo();
/* 
헷갈림을 방지하기 위해, 메소드 or 함수호출의 경우 ()가 따라오고, 나머지는 주소값을 의미한다고 생각하는 훈련을 하자.
설명:
function 객체는 doSomething에서 선언 시 heap 메모리에 저장된다.
foo는 obj.doSomething 와 동일한 function 객체 주소값을 저장한 것일 뿐이지,
obj가 되어서 do Something을 호출하는 것이 아니다.

foo는 단순 변수(global의 프로퍼티)이기 때문에, 이름이 없는 함수 데이터로 찾아가 이를 실행(일반함수 실행)한 것이 된다. 
반면 obj는 그 내부의 메소드 개념으로 무기명 함수객체를 포함한 것이므로 obj가 this가 된다.

함수를 참조할 때에는 그 값의 정체를 (주소값 or 실제 메모리)를 잘 간파해야하며, 그것을 불러오는 방식을 고려해야한다.*/
'----------------------------------------------------------------------------------------------------------------------------------------------'



//혼동되는 예시 2
var input = 1;
function square() {
    let cbFn = function () { console.log(this.input * this.input) };
    cbFn();
};

var obj = {
    input: 3,
    square: square,
};
obj.square(); // 1

//cbFn은 '.' 연산자 없이 호출되므로(메소드가 아니므로) 전역객체를 this로 받는다.



//문제 풀이

//메소드 체이닝 :한 줄의 코드로 setX, setY, 그리고 printCode를 차례대로 호출할 수 있어야 합니다. 
//이를 위해 각 메소드에서 this를 어떻게 반환해야 하는지 코드를 수정하세요.

var code = {
    x: 0,
    y: 0,
    setX: function (newX) {
        this.x = newX;
        return this;
    },
    setY: function (newY) {
        this.y = newY;
        return this;
    },
    printCode: function () {
        console.log(`X: ${this.x}, Y: ${this.y}`);
    }
};

code.setX(10).setY(20).printCode();

/*
  문제 2: 동적 메소드 할당
  아래의 person 객체에서, setAge 메소드를 다른 객체 student에 할당하고 호출한 결과가 student 객체를 반영하도록 만드시오. 
  this의 바인딩을 올바르게 관리하기 위해 필요한 코드를 추가하시오.

*/
var person = {
    age: 25,
    setAge: function (newAge) {
        this.age = newAge;
    }
};

const setAge = person.setAge;//추가한 코드

var student = {
    age: 20,
    setAge: setAge //추가한 코드
};

/*
  문제 4
  Person에서 this를 화살표 함수와 일반 함수로 각각 참조할 때의 차이를 보여주는 예제를 작성하시오. 
  생성자 함수는 showAge 메소드를 포함해야 하며, 이 메소드는 setTimeout을 사용하여 1초 후에 나이를 출력해야 합니다.
  */
function Person(age) {
    this.age = age;
    this.showAge = function () {
        setTimeout(function () {
            console.log("전역 객체의 age를 출력합니다 " + this.age);
        }, 1000)
    }
    this.showAgeArrow = function () {
        setTimeout(() => { console.log("Person객체의 age를 출력합니다 " + this.age) }, 1000);
    }
}

new Person(10).showAge();
new Person(10).showAgeArrow();


/*
문제: 깊이 중첩된 객체 메소드 호출
아래의 객체 구조에서 init 메소드 내에서 start 메소드를 호출하고자 할 때, 
start 메소드 내의 this가 engine 객체를 정확히 참조하도록 코드를 작성해야 한다. 
init 메소드는 특정 조건이 충족되면 start 메소드를 호출한다. 
그러나 직접적인 호출(this.start())로는 this가 engine을 참조하지 않을 수 있으므로 이 문제를 해결하는 코드를 작성하시오.
*/
var car = {
    model: 'Fiesta',
    engine: {
        horsepower: 100,
        start: function () {
            console.log(`Starting the engine with ${this.horsepower} horsepower!`);
        }
    },
 
    init: function () {
        console.log(`Preparing to start ${this.model}.`);
        this.engine.start();//start를 호출 시 engine의 메소드화 하여 this가 engine을 지정할 수 있도록 변경했다.
    }// engine의 프로퍼티였던 init을 car로 옮겨주어 this를 car로 바꾸어 주었다.
}

// init 메소드를 호출하려면 다음과 같이 할 수 있습니다:
car.init();



