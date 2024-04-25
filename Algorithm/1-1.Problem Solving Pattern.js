/*
Frequency Counter
Multiple Pointers
Sliding Window
Divide and Conquer
Dynamic Programming
Greedy Algorithms
Backtrcking 등의 기본 아이디어를 훑어 본다.
*/
'------------------------------------------------------------------------'
//Frequency Counter
/*
객체 혹은 셋을 값/ 값의 빈도수를 모으기 위해 사용한다.
중첩루프나 n^2 복잡도 작업을 회피할 수 있다.
*/

/*
예시 : same이라는 함수는 두 배열을 받았을 때 두번째 배열의 값이 첫번째 배열의 값의 제곱인 값을 포함하고 있을 때 true를 반환한다.(순서 상관 없음) frequency of values는 같아야 한다.

same([1,2,3], [4,1,9]) // true
same([1,2,3], [1,9]) //false
same([1,2,1], [4,4,1])//false(4는 한번 1은 두번 나와야 frequency가 맞다.)
*/

//나의 코딩
same = function (arr1, arr2) {
    if (arr1.length != arr2.length) {
        return false;
    } else {
        const squaredArr1 = arr1.map(e => e **2);

        const freqArr1 = squaredArr1.reduce((freq, e) => {
            freq[e] = ++freq[e] || 1;
            return freq
        }, {})

        const freqArr2 = arr2.reduce((freq, e) => {
            freq[e] = ++freq[e] || 1;
            return freq
        }, {})

        for (index in freqArr1) {
            if (!(freqArr1[index] == freqArr2[index])) {
                return false;
            }
        }
        return true;
    }
}

console.log(same([1, 2, 3], [4, 1, 9])); // true
console.log(same([1,2,3], [1,9]));//false
console.log(same([1,2,1], [4,4,1])); //false

/*
수업 이전 시간 복잡도 : map 메소드에서 n, reduce에서 2n, for in 문에서 n으로 O(4n)의 시간복잡도로 해결했다.
*/

//답지에서 naive알고리즘은 indexOf로 인하여 O(n^2)의 복잡도를 가진다. 그런데 내가 짠 코드보다 보기에는 훨씬 편한듯 하다.

function sameNaive(arr1, arr2){
    if(arr1.length!=arr2.length){
        return false;
    }
    else{
        for(let i=0; i< arr1.length;i++){
            correctIndex =arr2.indexOf(arr1[i]**2);
            if(correctIndex <0){
                return false;
            }
            arr2.splice(correctIndex,1);
        }
        return true;
    }
}

console.log(sameNaive([1, 2, 3], [4, 1, 9])); // true
console.log(sameNaive([1,2,3], [1,9]));//false
console.log(sameNaive([1,2,1], [4,4,1])); //false

/*
답지에서 O(n)으로 가는 과정이 나랑 거의 똑같았다.
나보다 더 나았던 점은 굳이 map메소드 과정을 거치지 않고, for in구문에서 프로퍼티의 제곱하는 로직을 사용한 것이다.
*/

sameUpdated = function (arr1, arr2) {
    if (arr1.length != arr2.length) {
        return false;
    } else {
        // const squaredArr1 = arr1.map(e => e **2); <- 해당 과정을 생략하고

        const freqArr1 = arr1.reduce((freq, e) => {
            freq[e] = ++freq[e] || 1;
            return freq
        }, {})

        const freqArr2 = arr2.reduce((freq, e) => {
            freq[e] = ++freq[e] || 1;
            return freq
        }, {})

        for (index in freqArr1) {

            //답지에서는 in 연산자로 검사 하나를 더 수행했다.
            if(!(index**2 in freqArr2)){
                return false;
            }

            //여기 if 구문에서 어차피 index가 value 값과 동일 하므로
            //제곱의 값을 가지는 index에다가 제곱을 해서 복잡도 n을 한번 더 줄인 것이다.
            if (freqArr1[index] !== freqArr2[index**2]) {
                return false;
            }
        }
        return true;
    }
}

/* 여기서 의문이었던 것은 객체에 대한 in 연산자가 왜 O(n)의 복잡도가 아닌지였다.
이는 해시맵의 속성으로 인해 O(1)의 시간복잡도를 가진다고 하는데 이에 대해 알아보았다.
*/
'-----------------------------해시맵의 시간복잡도--------------------------------------------'
/*
해시맵 : 해시맵의 중심에는 해시함수가 존재한다.
key를 해시함수를 통해 해시 코드로 변환한다.(이후)버킷 배열에 저장한다.(heap메모리에 존재)=> 여기서 디테일하게 들어가면, 서로 다른 키가 같은 해시 값을 가지는 경우 '충돌'이 발생하며 이를 관리하는 매커니즘이 중요해진다.

객체에 in 함수를 쓰게 되면 해당 property를 특정 연산을 거친 코드를 버킷배열의 식별자로 저장할 것으로 추정된다.
ex) property.length % 버킷배열.length가 해시함수로 사용될 수 있다.
따라서 property in object 시 property를 해시함수를 거친 코드를 주소값으로 버킷배열에 접근하므로 평균적으로 O(1)의 시간복잡도를 가지데 된다.
*/