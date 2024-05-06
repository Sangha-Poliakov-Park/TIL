//가장 기본적인 서치방식은
//선형 검색이데 (반복을 통해 존재하거나, 끝까지 순회 해서 존재하지 않음을 판단)

//대표적인 예시로 JS에 내장된 Array.prototype.IndexOf||Includes 가 있다.

//예를 들어 
/*usernames.includes('str') => boolean
usernames.indexOf('str') =>false일시 -1*/

//Linear Search Pseudocode
/*함수는 array와 value를 받는다
함수를 순회하면서 element가 value와 같은지 확인하고
있을 경우 index가 어디인지 확인하며 찾아지지 않으면 -1을 반환한다
*/

function linearSerch(arr, str) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === str) {
            return i
        }
    }
    return -1
}

//binary serach: 정렬된 배열과 찾고하는 요소의 번호를 리턴한다, 없으면 -1 반환

function binarySearch(arr, element) {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
        let middle = Math.floor((start + end) / 2);
        if (arr[middle] < element) {
            start = middle + 1;
        } else if (arr[middle] > element) {
            end = middle - 1;
        }
        else { return middle };
    }
    return -1
}


//Naive String Match

//더 긴 문자열과 패턴을 가진 짧은 문자열 두개를 갖고 몇번의 짧은 문자열 패턴이 발생하는지?

function countMatch(long, short) {
    let longStart = 0;
    let shortStart=0;
    let counter = 0;

    while (longStart < long.length) {
        if (long[longStart]!=short[shortStart]){
            longStart++;
            shortStart=0;
        } else {
            longStart++
            shortStart++
            if(shortStart==short.length){
                counter++;
                shortStart = 0;
            }
        }
    }
    return counter
}
// KPM 으로 복잡도 N으로 줄일 수 있다, 현재는 O(n*m)