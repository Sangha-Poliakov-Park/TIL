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
    return (minAverage / sizeSub)
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

function findKthMinimumElement(BST, k) {
    const key = k - 1
    BST.sort((a, b) => { a - b });
    return BST[key];
}

/*문제 2

제목: 가장 가까운 값 찾기
설명: 정렬된 정수 배열에서 target에 가장 가까운 값을 찾아 반환하세요.
예시:
arr = [1, 3, 5, 7, 9], target = 4
출력: 3
힌트: 이진 검색을 사용하여 가장 가까운 값을 찾으세요.
*/
function findNearestFromTarget(arr, target, start = 0, end = arr.length - 1) {
    const arrSorted = arr.sort((a, b) => a - b);
    let mid;
    if (arrSorted.indexOf(target)) {
        return target;
    }
    if (start <= end) {
        mid = Math.floor((start + end) / 2)
        if (target < arrSorted[mid]) {
            return findNearestFromTarget(arrSorted, target, start, mid - 1,);
        }
        else if (target > arrSorted[mid]) {
            return findNearestFromTarget(arrSorted, target, mid + 1, end);
        }
        else {
            return
        }
    }
    if (start == end) {
        if (arrSorted[mid] > target) {
            let leftDistance = Math.abs(arrSorted[mid - 1] - target);
            let rightDistance = Math.abs(arrSorted[mid] - target);
            if (rightDistance == leftDistance) {
                return arrSorted[mid - 1]
            }
            return (leftDistance < rightDistance ? arrSorted[mid - 1] : arrSorted[mid]);
        } else {
            let leftDistance = Math.abs(arrSorted[mid] - target);
            let rightDistance = Math.abs(arrSorted[mid + 1] - target);
            if (rightDistance == leftDistance) {
                return arrSorted[mid];
            }
            return (leftDistance < rightDistance ? arrSorted[mid] : arrSorted[mid + 1]);
        }
    }
}
/*
문제 3
제목: 특정 범위에 속하는 값 찾기
설명: 정렬된 정수 배열에서 low와 high 사이에 속하는 모든 값을 찾아 배열로 반환하세요.
예시:
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9], low = 3, high = 6
출력: [3, 4, 5, 6]
힌트: 이진 검색을 사용하여 low와 high 범위에 속하는 첫 번째와 마지막 값을 찾으세요.
*/

// let arr = [1, 2, 3, 4, 5, 6, 7];
function showNumberRangeArray(arr, low, high) {
    const highest = arr.indexOf(high);
    let lowest = arr.indexOf(low);
    let result = [];
    if (lowest == -1 || highest == -1) {
        return "인덱스가 잘못되었습니다."
    }
    for (lowest; lowest <= highest; lowest++) {
        result.push(arr[lowest]);
    }
    return result;
}


/*문제 4

제목: 정렬된 회전 배열에서 최소값 찾기
설명: 정렬된 회전 배열에서 최소값을 찾아 반환하세요.
예시:
arr = [4, 5, 6, 7, 0, 1, 2]
출력: 0
힌트: 이진 검색을 사용하여 최소값을 찾으세요.
*/

/*
개념적과 원리를 다시 이해하자면, 먼저 최초의 arr는 오름차순이든 내림차순이었을 것이다. 
그 다음에 회전을 하여 arr이 등장하게 된다.
회전이 되었다는 말은, 오름차순이 끊어지는 부분이 있다는 것이다 이것을 마치 두개의 블록처럼 생각하면 이해하기가 쉬워진다.

그말은 내가 이진 탐색으로 중앙을 먼저 찾은 후, 그 중앙과 로테이팅이 된 arr의 0번 인덱스를 비교하면, mid가 끊어져 있는 부분에 있는지 아닌지 판별이 가능하다.
예를 들어 오름차순 상황에서  arr[0]과 비교를 했을 때 arr[mid]더 크다면, 이는 끊어진 부분부터 오름차순이 계속 진행되고 있다는 것이다. 
그말은 우측 부분에 반드시 더 낮게 올라가는 부분이 있다는 의미이다. 
1) 배열은 이미 회전되었다는 것을 전제로 하고
2) mid 는 올라가는 부분의 과정에 있으므로 최소값은 우측에 있을수밖에 없다. (정렬된 배열이 좌측으로 회전한 상황인 것).

반면 arr[0]이 arr[mid] 보다 더 크면, mid 이전에 이미 회전된 블록을 깨버린 차순이 시작되었다는 것이다 
따라서 이경우 왼쪽에 최솟값이 있다.
*/


/*
mid 를 구하고 start와 비교해서 좌측 or우측 블록을 살필지 결정한다.

우측 블록인 경우
1) 우측을 봐야 한다면 우선 mid를 min에 담아준다.
2) start를 mid + 1 로 옮기고, end와의 새로운 mid찾는다.
3) 이 새로운 mid의 값이 본래 mid(min)보다 크다면 새로운 mid를 포함한 좌측에는 최소값이 없다. 고로 다시 start를 mid + 1로 옮겨준다.
4) 만약 새로운 mid가 min보다 작아졌다면 이 우측은 무조건 최소값이 아니다. 따라서 end 를 mid -1 로 옮겨 준다.
5) 그러나 start가 end보다 커진 상황이면 의미가 없으므로 반복문의 조건은 start <= end이다   

좌측 블록인 경우
1) 좌측 블록에 최소값이 있는 경우 arr[0] 인덱스의 값은 결코 최소값일 수 없으므로 end를 mid -1로 옮겨준다.
2) 새로운 mid를 구한 후 min과 비교해보고 만약 min보다 크다면 start를 mid +1 로 옮겨준다.
3) 새로운 mid가 작다면 그 mid의 우측은 결코 최소값일 수 없다. 따라서 end를 mid -1 로 옮겨주면서 최소값을 업데이트 하고 start<=end 일때까지 이를 반복한다.
*/

// function findMinimal(arr) {
//     let min = Infinity;
//     let start = 0;
//     let end = arr.length - 1;
//     let mid = Math.floor((end + start) / 2);

//     //우측 블록에 최소값이 있을 때
//     if (arr[0] < arr[mid]) {
//         start = mid + 1;
//         while (start <= end) {
//             mid = Math.floor((end + start) / 2);
//             min = Math.min(min, arr[mid]);
//             if (arr[mid] > min) {
//                 start = mid + 1;
//             } else {
//                 end = mid - 1;
//             }
//         }
//     }
//     else {
//         end = mid -1;
//         while (start <= end) {
//             mid = Math.floor((end + start) / 2);
//             min = Math.min(min, arr[mid]);
//             if (arr[mid] > min) {
//                 start = mid + 1;
//             } else {
//                 end = mid - 1;
//             }
//         }
//     }
//     return min;
// }

function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        let midPoint = Math.floor((left + right) / 2);
        if (nums[midPoint] > nums[right]) left = midPoint + 1;
        else right = midPoint;
    }

    return nums[left];
}


/*
문제 5

제목: 가장 가까운 제곱수 찾기
설명: 주어진 수에 가장 가까운 제곱수를 찾아 반환하세요.
예시:
n = 20
출력: 16
힌트: 제곱수를 생성하면서 이진 검색을 사용하세요. */

//Binary를 어떻게 구현해야할지 모르겠어 단순 알고리즘으로 풀었다.

function searchNearestExponent(n) {
    const N_SQUAR = Math.sqrt(n);
    const LOW = Math.floor(N_SQUAR);
    const HIGH = Math.ceil(N_SQUAR);

    if(N_SQUAR % 1 == 0 ){
        return n;
    }

    else if(Math.abs(N_SQUAR - LOW)<Math.abs(HIGH - N_SQUAR)){
        return LOW*LOW;
    }
    else return HIGH * HIGH
}