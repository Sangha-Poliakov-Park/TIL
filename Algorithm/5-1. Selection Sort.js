/*
버블소트를 거꾸로한것과 비슷하다.
가장 낮은 값을 앞으로 swap하는 방식이다.
*/

function sortSelection(arr) {
    for (let i = 0; i < arr.length; i++) {
        let lowest = i;
        for (let j = i + 1; j < arr.length; j++) {
            console.log(i, j)
        }
    }
    return arr;
}

sortSelection([32, 22, 10, 19, 17])