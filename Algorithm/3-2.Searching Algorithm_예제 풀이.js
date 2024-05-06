// Binary Search에 대한 훈련을 위하여 따로 문제를 찾아 풀이해보았다.
/*
문제 1
제목: 두 개의 동일한 원소 찾기
설명: 주어진 정수 배열에서 두 개의 동일한 원소가 있는지 확인하세요. 만약 있다면 true를, 없다면 false를 반환하세요.
예시:
arr = [1, 2, 3, 4, 5, 3]
출력: true
힌트: 값을 저장하면서 중복된 값이 있는지 확인하세요.
*/
function isPairOfElement(arr) {
    let frequency = {}
    for (element of arr) {
        frequency[element] = ++frequency[element] || 1
    }
    for (i in frequency) {
        if (frequency[i] == 2) {
            return true;
        }
    }
    return false;
}

/*
문제 2
제목: 두 배열의 교집합
설명: 두 개의 정수 배열 arr1과 arr2의 교집합을 찾아서 반환하세요.
예시:
arr1 = [1, 2, 3, 4], arr2 = [3, 4, 5, 6]
출력: [3, 4]
힌트: 한 배열의 요소를 저장하면서 다른 배열에서 찾으세요.
*/

function findIntersection(arr1, arr2) {
    let result = [];
    for (let i in arr1) {
        for (let element of arr2) {
            if (arr1[i] == element) {
                result.push(element);
            }
        }
    }
    return result;
}

//해시 테이블을 이용하면 (O(N+A)) 까지로 낮출 수 있다 아직 배우지는 않은 상태라 Quadratic으로 풀었다.


/*
문제 3

제목: 연속된 원소의 최대 합
설명: 주어진 정수 배열에서 연속된 원소의 최대 합을 찾으세요.
예시:
arr = [1, -2, 3, 4, -1, 2, 1, -5, 4]
출력: 10
힌트: 각 원소를 더해가면서 최대 합을 갱신하세요.
*/
function findAdjestMaxSum(arr) {
    let maxSum = -Infinity;
    let start = 0;
    let end = 0
    let tempSum = 0;
    while (start < arr.length) {
        tempSum += arr[end];
        end++;
        maxSum = Math.max(maxSum, tempSum);
        if (end == arr.length) {
            start++;
            end = start;
            tempSum = 0;
        }
    }
    return maxSum;
}
//Kadane 알고리즘으로 O(N)으로 확인가능하다고 하니 향후 공부해보자.


/*문제 4
제목: 부분 배열의 최댓값
설명: 주어진 정수 배열과 부분 배열의 길이가 주어졌을 때, 부분 배열의 최댓값을 찾아 반환하세요.
예시:
arr = [1, 2, 3, 4, 5, 6], k = 3
출력: 15
힌트: 연속된 k개의 원소를 가진 부분 배열의 합을 찾으세요.
*/


// function getMaxOfSubArray(arr, sizeOfSubArray) {
//     let start = 0;
//     let end = start + sizeOfSubArray-1;
//     let total = -Infinity;
//     let tempSum = 0;

//     while(end<arr.length) {
//         tempSum += arr[start];
//         start++;
//         if (start > end) {
//             end = start + sizeOfSubArray - 1
//             total = Math.max(total, tempSum);
//             tempSum = 0;
//         }
//     }
//     return total;
// }
//슬라이딩 윈도우를 다시 학습 후 코딩해보았다.

function getMaxOfSubArray(arr, sizeSub) {
    let maxSum = -Infinity;
    let currentSum = 0;

    for (let i = 0; i < sizeSub; i++) {
        currentSum += arr[i];
    }
    maxSum = currentSum;
    for (let i = sizeSub; i < arr.length; i++) {
        currentSum = currentSum - arr[i - sizeSub] + arr[i];
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
};

/*
문제 5

제목: 부분 배열의 최소 평균
설명: 주어진 정수 배열과 부분 배열의 길이가 주어졌을 때, 부분 배열의 최소 평균을 찾아 반환하세요.
예시:
arr = [3, 7, 90, 20, 10, 50, 40], k = 3
출력: 3
힌트: 연속된 k개의 원소를 가진 부분 배열의 평균을 계산하세요.
*/
function findLowestAverage(arr, sizeSub) {
    let minAverage = Infinity;
    let currentAverage = 0;
    for (let i = 0; i < sizeSub; i++) {
        currentAverage += arr[i];
        if (i == sizeSub - 1) {
            minAverage = currentAverage;
        }
    }
    for (let i = sizeSub; i < arr.length; i++) {
        currentAverage = currentAverage - arr[i - sizeSub] + arr[i];
        minAverage = Math.min(minAverage, currentAverage);
    }
    return (minAverage/sizeSub)
}


/*
Binary Search 문제


문제 1

제목: 이진 검색 트리에서 k번째 원소 찾기
설명: 이진 검색 트리에서 k번째로 작은 원소를 찾아 반환하세요.
예시:
BST = [1, 2, 3, 4, 5], k = 3
출력: 3
힌트: 중위 순회를 이용하세요.

*/
/*문제 2

제목: 가장 가까운 값 찾기
설명: 정렬된 정수 배열에서 target에 가장 가까운 값을 찾아 반환하세요.
예시:
arr = [1, 3, 5, 7, 9], target = 4
출력: 3
힌트: 이진 검색을 사용하여 가장 가까운 값을 찾으세요.
문제 3
*/
/*
제목: 특정 범위에 속하는 값 찾기
설명: 정렬된 정수 배열에서 low와 high 사이에 속하는 모든 값을 찾아 배열로 반환하세요.
예시:
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9], low = 3, high = 6
출출: [3, 4, 5, 6]
힌트: 이진 검색을 사용하여 low와 high 범위에 속하는 첫 번째와 마지막 값을 찾으세요.

*/

/*문제 4

제목: 정렬된 회전 배열에서 최소값 찾기
설명: 정렬된 회전 배열에서 최소값을 찾아 반환하세요.
예시:
arr = [4, 5, 6, 7, 0, 1, 2]
출출: 0
힌트: 이진 검색을 사용하여 최소값을 찾으세요.
*/

/*
문제 5

제목: 가장 가까운 제곱수 찾기
설명: 주어진 수에 가장 가까운 제곱수를 찾아 반환하세요.
예시:
n = 20
출력: 16
힌트: 제곱수를 생성하면서 이진 검색을 사용하세요.
*/