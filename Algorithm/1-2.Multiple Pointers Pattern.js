//정렬된 배열에서 유일한 값의 갯수를 세는 메소드를 구현하라.

// 힌트 없이 하기에 구현

function countUniqueValues(array){
    let count =1;
    let initial = 0;
    let pointer = 0;
    if(array.length==0){
        return 0
    } // 여기서 빈배열은 undefined가 아님을 명심할 것.
    while(pointer<array.length){
        if(array[initial]==array[pointer]){
            pointer++;
        } else{
            count++;
            initial=pointer;
            pointer++;
        }
    }
    return count;;
}

const array = [0,1,2,3,3,3,3,3,3,3,3];
console.log(countUniqueValues(array)) //4

//답지에 비해 불필요한 변수가 많고, while 문 자체의 조건의 흐름 가독성도 떨어진다.

function countUniqueValuesRefactored(array){
    if(array.length ==0){
        return 0;
    }
    let i = 0
    ;
    for(let j =0; j<array.length; j++){
        if(array[i]!==array[j]){
            i+=1;
            array[i] = array[j];//i가 계속해서 이동하되, 순회하는 j 배열로 가므로 영향을 끼치지 않는다. 또한 달라진 value에 대한 정보도 갱신하여 저장할 공간으로 j인덱스는 문제없이 사용될 수 있다.
        }
    }
return i+1
}

console.log(countUniqueValuesRefactored([1,1,1,1,1,2,2,2,2,2,3,3,3,3]))

