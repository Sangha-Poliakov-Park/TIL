//문자열을 인풋으로 받고 그 문자열을 역순으로 구성한 함수 구현하기

//구현하다보니 자연스럽게 pureRecursion을 사용하게 되었다.
function reverse(str, index = str.length - 1) {
    if (index < 0) {
        return "";
    }
    return str[index] + reverse(str, index - 1);
}

//isPalindrope(좌우 대칭되는 문자열 true false 반환) 구현하기
//1. 멀티플 포인터로 구현 (단순 연습)
function isPalindromePointers(str) {
    let start = 0;
    let end = str.length - 1;
    while (start <= end) {
        if (str[start] == str[end]) {
            start++;
            end--;
        } else return false;
    }
    return true;
}
//2. 재귀함수로 구현
//여기서 재귀함수는 앞서 멀티플 포인트에서의 반복문을 재현한 것과 동일하다. 즉 근본 알고리즘은 멀티플 포인터이다.
function isPalindromeRecursive(str) {
    let start = 0;
    let end = str.length - 1
    function compare(str, start, end) {
        if (start > end) {
            return true;
        }
        else if (str[start] != str[end]) {
            return false;
        } else {
            return compare(str, start + 1, end - 1)
        }
    }
    return compare(str, start, end);
}

// isOdd 함수를 콜백으로 받아, 주어진 배열의 요소 중 홀수가 있는지를 boolean타입으로 반환함.
//isOdd의 초기값을 isOdd로 설정하면 temporal Dead Zone 오류가 발생한다.
//callback 함수를 심화적으로 학습하면서 익혀보자.

//과제 제출시에는 paramete에 isOdd를 반드시 넣는 식으로 제시되어 있어서 isOdd를 그대로 넘기는 식으로 코딩을 바꾸었다. 따로 기록하지는 않겠다.
const isOdd = function (element) { return element % 2 !== 0; }

function someRecursive(arr, callback) {
    const isOddFunc = callback || isOdd;
    if (arr.length == 0) {
        return false
    }
    if (isOdd(arr[0])) {
        return true;
    };
    return someRecursive(arr.slice(1), isOddFunc)
}

/*
다차원 배열의 item을 모두 1차원 배열의 요소로 집어넣는 함수를 구현하라.

// flatten([1, 2, 3, [4, 5] ]) // [1, 2, 3, 4, 5]
// flatten([1, [2, [3, 4], [[5]]]]) // [1, 2, 3, 4, 5]
// flatten([[1],[2],[3]]) // [1,2,3]
// flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]]) // [1,2,3]
*/


//스스로 풀지 못하고 해답을 보았으므로 매일 연습할 것
function flatten(arr) {
    var result = [];
    function helper(subArr) {
        for (let i = 0; i < subArr.length; i++) {
            if (Array.isArray(subArr[i])) {
                helper(subArr[i])
            } else {
                result.push(subArr[i])
            }
        }
    }
    helper(arr);
    return result;
}

/* 
배열의 element의 첫 문자열을 대문자로 변경한다.
*/
//꼭 concat을 사용하여 합칠필요는 없다 애초에 arr자체의 값을 변동하기 때문에 막판에 재작성된 arr을 반환해도 되는 것이다.
function capitalizeFirst(arr, index = 0) {
    if (index >= arr.length) {
        return arr;
    } else {
        arr[index] = arr[index].replace(arr[index].charAt(0), arr[index][0].toUpperCase());
        return capitalizeFirst(arr, index + 1)
    }
}

// 중첩 객체에서의 모든 짝수 값의 합을 구한다.

var obj1 = {
    outer: 2,
    obj: {
        inner: 2,
        otherObj: {
            superInner: 2,
            notANumber: true,
            alsoNotANumber: "yup"
        }
    }
};

var obj2 = {
    a: 2,
    b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
    c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
    d: 1,
    e: { e: { e: 2 }, ee: 'car' }
};
//sum이 초기화 되지만 매번 합산되게끔 구조를 짠 것에 집중해보자
function nestedEvenSum(obj, isEven = element => element % 2 == 0) {
    sum = 0;
    for (let i in obj) {
        if (typeof obj[i] !== "object") {
            if (isEven(obj[i])) {
                sum += obj[i];
            }
        } else {
            sum += nestedEvenSum(obj[i], isEven)
        }
    }
    return sum;
}

//단어들의 배열을 받은 후 각 단어를 모두 대문자화 하여 반환

function capitalizeWords(words, index = 0) {
    if (index >= words.length) {
        return words;
    } else {
        words[index] = words[index].toUpperCase();
        return capitalizeWords(words, ++index);
    }
}

// let words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']


//인풋객체의 숫자를 문자열로 바꾸고 그 결과를 또다른 객체로 리턴하는 함수를 작성 하시오.

let obj = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66
        }
    }
}


//stringifyNumbers(obj)

/*
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/

function stringifyNumbers(obj) {
    let newObj = Object.assign({}, obj)
    for (let i in newObj) {
        if (typeof newObj[i] == 'object') {
            if (Array.isArray(newObj[i])) {
                newObj[i] = [];
            } else {
                newObj[i] = stringifyNumbers(newObj[i])
            };
        } else if (typeof newObj[i] === "number") {
            newObj[i] = newObj[i] + "";
        }
    }
    return newObj
}

//중첩 객체내의 문자열만 배열로 추출해낸다.

//최초에 검색으로 알아낸 부분
function collectStrings(obj) {
    let result = [];
    for (let i in obj) {
        if (typeof obj[i] == "object" && obj[i] !== null && !Array.isArray(obj[i])) {
            result = result.concat(collectStrings(obj[i]));
        } if (typeof obj[i] == "string") {
            result.push(obj[i]);
        }
    }
    return result
}

//복습할 때 concat의 원리를 이해하고 재작성한 부분
//Array.prototpye.push 는 반환 값이 추가가 된 배열의 길이를 반환하므로 result =을 앞에붙일 필요가 없다.

function collectStrings(obj) {
    let result = [];
    for (let index in obj) {
        if (typeof obj[index] !== 'object') {
            result.push(obj[index])
        }
        else {
            //여기서 헷갈리면 안되는 점은 하위 부분을 전부 빠짐없이 result로 담은 배열을 다시 현 루프에서의 배열과 합치시켜 자식과 현 배열을 합친다는 점이다. 
            //즉 자식들의 result는 다시 return되면서 부모의 else 루프 속으로 리턴되며 그 리턴된 result이 부모 result에 합쳐지는 식으로 모든 result객체를 한루프에서 완결 짓고, 첫번째 부모에서 다시 루프를 도는 식이다.
            result = result.concat(collectStrings(obj[index]));
        }
    }

    return result;
}




console.log(collectStrings(obj0))


