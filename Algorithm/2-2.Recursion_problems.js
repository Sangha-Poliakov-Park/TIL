// 제곱에 대한 함수를 구현한다 input (base, power) output power of the base to the exponent

function power(base, exponent) {
    if (exponent == 0) {
        return 1;
    }

    else {
        return power(base, --exponent) * base;
    }
}

//exponent를 power라고 선언해버리면 shadowing 현상으로 매개변수많을 받게된다고 한다.

function factorial(int) {
    if (int == 0) {
        return 1
    }
    return int * factorial(int - 1);
}

//배열의 곱 값 product를 산축하는 함수

function productOfArray(arr) {
    console.log(arr)
    if (arr.length == 0) {
        return 1;
    }
    return productOfArray(arr.slice(1)) * arr[0];
}

//0부터 매개변수까지의 모든 합을 구하는 함수
function recursiveRange(num){
    if (num==0){
        return 0
    }
    return recursiveRange(num-1) + num;
}

//피보나치 수열의 num번째 값을 구하는 함수
function fib(num){
    if(num<=2/* num이 1일때와 2일때를 나누는 것보다 편하다. */){
        return 1;
    }
    return fib(num-1)+fib(num-2)
}

console.log(fib(28));
