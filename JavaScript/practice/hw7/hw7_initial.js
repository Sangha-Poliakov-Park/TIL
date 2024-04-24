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

function validateYear(year) {
    return (year > 1583 ? true : false)
}


const getJulianValue = (year, month, day) => {
    let modedY = year + 8000;
    let modedM = month;
    if (modedM < 3) {
        modedY--;
        modedM += 12;
    }
    return (
        modedY * 365 +
        Math.floor(modedY / 4) -
        Math.floor(modedY / 100) +
        Math.floor(modedY / 400) -
        1200820 +
        Math.floor((modedM * 153 + 3) / 5) -
        92 +
        (day - 1)
    );
};

function getMaxDate(month, year) {
    if ((month == 2 && year % 4 == 0 && year % 100 != 0) || year % 400 == 0) { //윤년
        return 29;
    }
    else if (month == 2) {
        return 28;
    }
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return 31;
        default: return 30;
    }
}

function getWeeklyRow(month, year) {
    let weeklyRow = [];
    let weekNo = 0;
    let dayIndex = 0;
    //한 달의 최대 일수 만큼 순회
    for (let i = 0; i < getMaxDate(month, year); i++) {
        //달력 요일과 날짜의 요일이 같으면 숫자등록
        if (dayIndex == ((getJulianValue(year, month, i + 1) % 7))) {
            //1의 자리수 날짜는 정렬을 위해 공백 앞에 더 줌
            if ((i + 1 + "").length == 1) {
                weeklyRow[weekNo] = (weeklyRow[weekNo] || "") + " " + (i + 1) + " ";
            }
            //정렬용 : 10의자리수부터는 그냥 적어줌
            else {
                weeklyRow[weekNo] = (weeklyRow[weekNo] || "") + (i + 1) + " ";
            }
        }
        // 달력요일과 날짜의 요일이 다르면, 같아질때까지 날짜를 계속 1일로 맞춰줘야함
        else {
            weeklyRow[weekNo] = (weeklyRow[weekNo] || "") + "   ";
            i = -1;
        }
        // 달력 요일이 끝까지 가면 월요일로 돌려주고, 작성하는 줄도 줄바꿈해줌
        if (dayIndex % 7 == 6) {
            weekNo++;
            dayIndex = 0;
            continue
        }
        //달력요일 넘겨주기
        dayIndex++;
    }
    return weeklyRow;
}

function task(year) {
    let monthArr = [];

    if (!validateYear(year)) {
        console.log("연도 입력 오류");
        return false;
    }
    for (let i = 0; i < 12; i++) {
        monthArr[i] = getWeeklyRow(i + 1, year)
    }
    return monthArr;
}

//main 
const main = async () => {
    const year = parseInt(await question('연도 :'));
    let calendar = task(year);
    
    //calendar가 잘 등록되었으면 출력실행
    if (calendar) { 
        for (let i = 0; i < 12; i++) {
            console.log("                          ")
            console.log(`-------${i + 1}월 ${year}-------`)
            console.log(` M  T  W  T  F  S  S`)
            for (e of calendar[i]) {
                console.log(e);
            }
        }
    }
}

main();

// 로직을 어떻게 설계할 것인가?
// 입력 값 : year
// 출력 값 : 반복문 순서대로의 월(상수), 월에 해당하는 값이 해당 월 열에 있어야 함.
/* 
로직 : 
1번 : 한 줄을 구현해 낸다.
첫번째 수는 무조건 1이고, 율리우스력으로 요일을 찾을 수 있다.
즉 첫번째 숫자 == 요일 조건문의 루프를 7번 (요일 수) 돌리면 첫번째 이전까지는 공백을 줄 수 있다.

2번
다음 줄 부터는 별다른 고민 없이 7번씩 적어주면 된다.

3번 마지막 일에 도달 했을 때 그 뒤부터 마지막 루프까지는 공백이 되고 출력이 종료된다.

한줄이 구현될때마다 객체를 바꿔준 후 문자열을 집어 넣어 주자. 첫째주 둘째주가 될 수 있또록.

그렇다면 대략적으로
let weeklyRow = [];
let weekNo = 0;
let weekRow = "";
for(let i = 0; i<MaxDate; i++){
if(i%7==day[i/7]){
    weeklyRow[weekNo] = weeklyRow[weekNo]||"  " + "`${i} "
}
if(i%7==0){
    weekNo++;
}
}
이지 않을런지
*/