/*
Sliding Window - maxSubarraySum
Given an array of integers and a number, write a function called maxSubarraySum, which finds the maximum sum of a subarray with the length of the number passed to the function.

Note that a subarray must consist of consecutive elements from the original array. In the first example below, [100, 200, 300] is a subarray of the original array, but [100, 300] is not.

maxSubarraySum([100,200,300,400], 2) // 700
maxSubarraySum([1,4,2,10,23,3,1,0,20], 4)  // 39 
maxSubarraySum([-3,4,0,-2,6,-1], 2) // 5
maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1],2) // 5
maxSubarraySum([2,3], 3) // null
Constraints:

Time Complexity - O(N)

Space Complexity - O(1)
*/

function maxSubarraySum(arr, length) {
    if (arr.length < length || arr.length == 0) {
        return null;
    }

    let start = 0;
    let end = length - 1;
    let sum = 0;
    for (let i = start; i <= end; i++) {
        sum += arr[i];
    }
    let maxSum = sum;

    while (end < arr.length - 1/*하기 로직에 end+1이 있는데 존재하지 않는다면 구할 방법이 없다.*/) {
        sum = sum - arr[start] + arr[end + 1];
        if (maxSum < sum) {
            maxSum = sum;
        }
        start++;
        end++;
    }
    return sum;
}

/*
Sliding Window - minSubArrayLen
Write a function called minSubArrayLen which accepts two parameters - an array of positive integers and a positive integer.

This function should return the minimal length of a contiguous subarray of which the sum is greater than or equal to the integer passed to the function. If there isn't one, return 0 instead.
Examples:

minSubArrayLen([2,3,1,2,4,3], 7) // 2 -> because [4,3] is the smallest subarray
minSubArrayLen([2,1,6,5,4], 9) // 2 -> because [5,4] is the smallest subarray
minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52) // 1 -> because [62] is greater than 52
minSubArrayLen([1,4,16,22,5,7,8,9,10],39) // 3
minSubArrayLen([1,4,16,22,5,7,8,9,10],55) // 5
minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11) // 2
minSubArrayLen([1,4,16,22,5,7,8,9,10],95) // 0
Time Complexity - O(n)

Space Complexity - O(1)

*/

function minSubArrayLen(arr, int) {
    let start = 0;
    let end = 0;
    let min_length = Infinity;
    let total = 0;
    for (end = 0; end < arr.length; end++) {
        total += arr[end];
        while (total >= int && start <= end) {
            min_length = Math.min(min_length, end - start + 1);
            start++;
            total -= arr[start - 1];
        }
    }
    return min_length == Infinity ? 0 : min_length;
}


/*
Sliding Window - findLongestSubstring
Write a function called findLongestSubstring, which accepts a string and returns the length of the longest substring with all distinct characters.

findLongestSubstring('') // 0
findLongestSubstring('rithmschool') // 7
findLongestSubstring('thisisawesome') // 6
findLongestSubstring('thecatinthehat') // 7
findLongestSubstring('bbbbbb') // 1
findLongestSubstring('longestsubstring') // 8
findLongestSubstring('thisishowwedoit') // 6
Time Complexity - O(n)
*/


// function findLongestSubstring(str) {
//     let start = 0;
//     let end = start;
//     let obj = {};
//     let length = 0;
//     let temp = 0;
//     for (end = 0; end < str.length; end++) {
//         let char = str.charAt(end);
//         if (obj[char] == undefined) {
//             obj[char] = end;
//             temp +=1;
//         } else if (obj[char]) {

//             start = obj[char]+1;
//             temp = end - start +1;
//             obj[char] = end;
//         }
//         length = Math.max(length,temp);
//     }
//     return length;
// }

//문제 풀이에 실패하여 정답지를 본 후 다시 코딩해보겠다

function findLongestSubstring(str) {
    let start = 0;
    let obj = {};
    let maxLength = 0;

    for (let end = 0; end < str.length; end++) {
        let char = str.charAt(end);
        if(obj[char]!=undefined && obj[char]>=start){
            start = obj[char]+1;
        } 
        obj[char] = end;
        maxLength = Math.max(maxLength, end - start +1);
    }
    return maxLength;
}

console.log(findLongestSubstring('longestsubstring'));


