/*
학습묵표
1. 무엇이 재귀인지, 어떻게 사용될 수 있는지를 정의한다.
2. 재귀 함수의 두 가지의 가장 중요한 요소를 이해한다.
3. 디버깅을 더 잘하기 위해 call stack을 시각화 하고 재귀함수를 이해한다.
4.helper method recursion, pure recursion을 학습하여 어려운 문제를 풀이해본다
*/

// 강의에서 나온 드래곤 스토리를 직접 구현해보았다.

let arr = [3142, 5799, 6551, 5914];

function countOdd(arr, index) {
    if (index == arr.length) {
        return 0;
    }
    else {
        if (arr[index] % 2 != 0) {
            return countOdd(arr, index+1) + 1;
        }
        else {
            return countOdd(arr, index+1);
        }
    }
}


/*
Call Stack
function은 호출 될시 윗방향으로 쌓여가고, 리턴을 만나거나 함수가 종료되면
컴파일러가 최상위 아이템을 삭제한다.

Recursion 기본 아이디어
Base가 존재하여 순환이 끝나는 부분이 필요하다.
매개 변수가 변화하는 부분이 필요하다.

*/

//Helper Method Recursion
//두 개의 함수가 사용 되며 하나는 주요함수, 하나는 재귀를 처리하는 헬퍼함수
function addOddCollection(arr){
let result = [];
function helper(arr, index = 0){
    if (index == arr.length){
        return;
    } else if(arr[index]%2!=0){
        result.push(arr[index])
    }
    return helper(arr,++index);
}
helper(arr);
return result;
}


//pure recursive
//함수가 자기 자신을 호출하며 모든 중간결과를 매 호출마다 반환 하거나 함수 자체가 모든 매개변수와 상태관리
function addPurelyOddCollection(arr){
    let collection = [];
    
    if(arr.length== 0){
        return[];// 아무것도 선언되어 있지 않으면 undefind를 반환하여 이를 concate 한다
    }
    else if(arr[0]%2!=0){
        collection.push(arr[0]);
    }
    collection = collection.concat(addPurelyOddCollection(arr.slice(1)))
    return collection;
}

