
'자바로 풀어본 문제들을 JS로 풀어보는 시간을 가져보았다.'
//1. 여러개의 integer 커맨드를 args로 받은 후 모두 동일하면 equal 출력, 혹은 not equal 출력하기

//O(n^2)로 구현, O(n)으로 줄일수 수 없을까? .
function isIntEqual(...args) {
    for (let i = 0; i < args.length - 1; i++) {
        for (let j = i + 1; j < args.length; j++) {
            if (args[i] != args[j]) {
                return false;
            }
        }
    }
    return true;
}

//어제 배운 Frequency Pattern을 활용해보기로 했다. 객체 프로퍼티로 빈도수 검사를 함으로써 O(n)으로 복잡도를 줄였다.
function insIntEqualRefactored(...args) {
    const freq = args.reduce((freq, e) => {
        freq[e] = ++freq[e] || 1
        return freq;
    }, {})
    return (Object.keys(freq).length == 1 ? true : false);
}
console.log(insIntEqualRefactored(1, 1, 1, 1, 1, 1, 1, 1, 1, 1));//true
console.log(insIntEqualRefactored(1, 1, 1, 1, 2, 1, 1, 5, 1, 1));//false OK!


//>2 대각선을 기준으로 반전된 행렬을 구하는 함수 만들기,행렬의 수는 동일.
//시간 복잡도 O(n^2)
function reflectMatrixDiagnolly(arr) {
    let matrix = arr;
    //첫행부터 바뀌어지는 열의 갯수가 1씩 감소한다는 점을 활용.
    //[a][b]가 존재할시 [b][a]와 바꾸어주어야 한다.
    for (let row = 0; row < matrix.length; row++) {
        for (let col = row + 1; col < matrix.length; col++) {
            //if(row!=col){ => 어차피 col=row+1으로 대각선상에 위치한 좌표는 건드리지 않으므로 필요없는 조건식이다.
            let temp = matrix[col][row];
            matrix[col][row] = matrix[row][col];
            matrix[row][col] = temp;
            //}
        }
    }
    return matrix;
}


//3. 매개변수 n을 진수, 밑이 2인 로그 크지 않은 가장 큰 정수 값을 구하는 알고리즘을 구현하시오.
function lg(n) {
    let exponent = 1;
    let argument = 0;
    /*
    while(true){
        if(n<=exponent){
            break;
        } 굳이 별도로 표기할 이유가 없다 while문 속에 넣으면 될 것이다.*/
    while (n > exponent/*코딩하다 범위를 반대로 정하는 실수를 했는데 놓치지 말것, true여야 계속 시행이다.*/) {
        exponent *= 2;//exponent*2 같은 식으로 실수를 범하지 말것.
        argument++;
    }
    return argument - 1
}

//4. n팩토리얼 구하는 재귀함수 만들기.
function f(num) {
    return (num == 0 ? 1 : num * f(num - 1));
}



// 5. 하기 코드의 잘못된 점 분석하기
function exR2(n) {
    s = exR2(n - 3) + n + exR2(n - 2) + n;
    if (n <= 0) return "";
    return s;
}
"잘못된 점 : s가 리턴문 이전에 선언되었기 때문에 exR2가 재귀될때마다 계속 s에 선언되어있는 expression을 수행한다. 그래서 영원히 return s에 도달하지 못한다."

//옳게 하려면 하기처럼 바꾸면 된다.
function exR2(n) {
    if (n <= 0) return "";
    s = exR2(n - 3) + n + exR2(n - 2) + n;
    return s;
}
    