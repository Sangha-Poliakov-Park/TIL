//Sort 예시

/*
작은 수에서 큰 수로
알파벳 순서대로
개봉 일정 순으로 영화이름을 sorting

각각의 sorting 방식은 상황마다 그 속도가 다르다, 예를 들어 매우 작은 부분만 sorting 해야 할때는 Selection 방식이 훨씬 빠름
*/

//빌트인 메소드를 사용했을 때 하기 내용은 제대로 된 오름차순을 보여주지 않으며
console.log([23, 45, 6, 12, 13].sort());
console.log(['Bubble', 'Canada', 'Algorithm', 'Power'].sort());

/*
MdN 자료를 보면 The default sort order is according to string Unicode code points. 라는 문구에 주목해야한다.
콜백 함수가 존재하지 않는다면 객체 내부의 값은 string으로 변환되어 그 유니코드 순서대로 소팅된다.
*/

//pseudocode
function bubbleSort(arr) {
    let noSwap;
    for (let i = arr.length; i > 0 ; i--) {
        noSwap = true;
        for(let j = 0; j < i-1; j++){
            if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = temp;
            noSwap = false}
        }
        if(noSwap) break;
    }
    return arr;
}
console.log(bubbleSort([37, 45, 29, 8]))