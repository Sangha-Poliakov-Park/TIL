/*
Frequency Counter - sameFrequency
Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.

Your solution MUST have the following complexities:

Time: O(N)

Sample Input:

sameFrequency(182,281) // true
sameFrequency(34,14) // false
sameFrequency(3589578, 5879385) // true
sameFrequency(22,222) // false
*/

function sameFrequency(int1, int2) {
    let str1 = int1.toString();
    let str2 = int2.toString();

    if (str1.length != str2.length) {
        return false;
    }

    let countDigits = {};

    //String 은 유사 배열이므로 for of 문도 사용가능 한점 참고할 것
    for (let i = 0; i < str1.length; i++) {
        let letter = str1[i];
        countDigits[letter] = ++countDigits[letter] || 1;
    }

    for (let i = 0; i < str2.length; i++) {
        let letter = str2[i];
        if (!countDigits[letter]/*==0||objstr1[letter]==undefined 느슨한 비교(loose comparison)를 사용할 것*/) {
            return false;
        }
        countDigits[letter]--;
    }
    return true;
}


/*
Frequency Counter / Multiple Pointers - areThereDuplicates
Implement a function called, areThereDuplicates which accepts a variable number of arguments, and checks whether there are any duplicates among the arguments passed in.  You can solve this using the frequency counter pattern OR the multiple pointers pattern.

Examples:

areThereDuplicates(1, 2, 3) // false
areThereDuplicates(1, 2, 2) // true 
areThereDuplicates('a', 'b', 'c', 'a') // true 
Restrictions:

Time - O(n)

Space - O(n)

Bonus:

Time - O(n log n)

Space - O(1)
*/

function areThereDuplicates(...args) {
    args = args.sort();//sort에서는 콜백함수로 그 기준을 설정하는 것을 놓치지 말자 (a,b)=>if(a<b) return -1; if(a>b) return+1; return 0;
    let start = 0;
    let next = start + 1;
    while (next < args.length) {
        if (args[start] == args[next]) {
            return true;
        }
        start++;
        next++;
    }
    return false;
}
// 주어진 배열이 정렬되어있음을 가정하기 때문에 두개의 포인터를 함께 올려도 문제가 없는 것이다.
// 포인터를 사용할 때에는 주어진 배열이 정렬되어있음을 명심하자.


/*
Multiple Pointers - averagePair
Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches the average target.

Bonus Constraints:

Time: O(N)

Space: O(1)

Sample Input:

averagePair([1,2,3],2.5) // true
averagePair([1,3,3,5,6,7,10,12,19],8) // true
averagePair([-1,0,3,4,5,6], 4.1) // false
averagePair([],4) // false

*/

function averagePair(arr, target) {
    if (!arr.length) {
        return false;
    }
    // arr.sort((a, b) => a<b? -1 : a>b? 1 : 0); 하기와 같이 간소화 할 수 있다. 
    arr.sort((a, b) => a - b);
    let start = 0;
    let end = arr.length - 1;
    while (start < end) {
        let average = (arr[start] + arr[end]) / 2;
        if (average > target) {
            end--;
        } else if (average < target) {
            start++;
        }
        else return true;
    }
    return false;
}


/*
Multiple Pointers - isSubsequence

Write a function called isSubsequence which takes in two strings and checks 
whether the characters in the first string form a subsequence of the characters in the second string. 
In other words, the function should check whether the characters in the first string appear somewhere in the second string, 
without their order changing.

Examples:

    isSubsequence('hello', 'hello world'); // true
    isSubsequence('sing', 'sting'); // true
    isSubsequence('abc', 'abracadabra'); // true
    isSubsequence('abc', 'acb'); // false (order matters)

Your solution MUST have AT LEAST the following complexities:

Time Complexity - O(N + M)

Space Complexity - O(1)
*/

function isSubsequence(str1, str2){
    let start = 0;
    // let end = str1.length-1;

    for(let char of str2){
        if(str1[start] == char){
            start++
        }
    }
    // return start>end ? true : false
    return start ==str1.length;
}
//주석으로 훨씬 더 클린한 코드에 대한 피드백을 작성했다.