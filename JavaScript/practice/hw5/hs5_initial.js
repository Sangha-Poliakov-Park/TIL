const readline = require('readline');

const question = async (query) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
};


//main
const main = (async () => {
    //사용자 입력
    let year = parseInt(await question('연도 :'));
    let month = parseInt(await question('월 :'));
    let date = parseInt(await question('날짜 :'));
    //유효성 flag
    let flag = checkDate(year, month, date);
    //출력물
    let error = ["연도가 잘못되었습니다", "월이 잘못되었습니다.", "날짜가 잘못되었습니다"]
    let dayList = ['월', '화', '수', '목', '금', '토', '일'];
    
    //유효성 검사
    for (let i = 0; i < flag.length; i++) {
        if (!flag[i]) {
            //오류 발생시 출력 후 실행컨텍스트 팝
            console.log(error[i]);
            return;
        }
    }
    //결과 출력, 율리우스력 함수 실행
    console.log(`${year}-${month}-${date} ${dayList[checkJulian(year, month, date)]}요일 입니다.`);
})();



// 율리우스 일수로 요일 계산하기
function checkJulian(y, m, d) {
    y += 8000;
    if (m < 3) { y--; m += 12; }
    const julian = (y * 365) + (y / 4) - (y / 100) + (y / 400) - 1200820 + (m * 153 + 3) / 5 - 92 + (d - 1);
    return Math.round(julian % 7) - 1;
}



// 날짜 유효성 검사하기
function checkDate(y, m, d) {
    //flag 배열 0 : 연도 유효성 1:월 유효성 2: 일 유효성
    let flag = [true, true, true];
    //렉시컬 스코프 변수 선언
    let year = y;
    let month = m;
    let day = d;

    //연도 검사 즉시실행
    (function checkYear() {
        // 1583년 이하일시 오류
        if (year < 1583) {
            flag[0] = false;
        }
    })();
    //월 검사 즉시실행
    (function checkMonth() {
        if (month < 1 || month > 12) {
            flag[1] = false;
        }
    })();
    //일자 검사 즉시실행
    (function checkDate() {
        switch (month) {
            case 2:
                //윤년일때
                if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                    if (day > 29 || day < 1) { flag = false; break; }
                }
                //윤년아닐때
                else
                    if (day > 28 || day < 1) { flag[2] = false; break; }

            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                if (day > 31 || day < 1) {
                    flag[2] = false; break;
                }
            default:
                if (day > 30 || day < 1) {
                    flag[2] = false;
                }
        }
    }
    )();
    //유효성 flag 배열 반환
    return flag;
}
