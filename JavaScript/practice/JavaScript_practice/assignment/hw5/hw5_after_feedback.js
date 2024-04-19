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
    return (year < 1583 ? false : true)
}

function validateMonth(month) {
    return (month < 1 || month > 12 ? false : true)
}

function validateDate(date, month, year) {
    if ((month == 2 && year % 4 == 0 && year % 100 != 0) || year % 400 == 0) { //윤년
        return (date > 29 || date < 1) ? false : true
    }
    else if (month == 2 && (date > 28 || date < 1)) {
        return false;
    }
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return (date > 31 || date < 1 ? false : true);
        default: return (date > 30 || date < 1 ? false : true);
        }
}

// 율리우스 일수로 요일 계산하기
function getJulian(y, m, d) {
    y += 8000;
    if (m < 3) { y--; m += 12; }
    const julian = (y * 365) + (y / 4) - (y / 100) + (y / 400) - 1200820 + (m * 153 + 3) / 5 - 92 + (d - 1);
    return Math.round(julian % 7) - 1;
}



//main
const main = async () => {
    let validation = {};
    const year = parseInt(await question('연도 :'));
    const month = parseInt(await question('월 :'));
    const date = parseInt(await question('날짜 :'));
    const day = ["월", '화', '수', '목', '금', '토', '일']

    validation[year] = validateYear(year);
    validation[month] = validateMonth(month);
    validation[date] = validateDate(date,month,year);

    if (validation[year] && validation[month] && validation[date]) {
        console.log(`${year}-${month}-${date} ${day[getJulian(year, month, date)]}요일 입니다.`);
    }
    else {
        if (!validation[year]) {
            console.log("연도 입력 오류입니다")
        } else if (!validation[month]) {
            console.log("월 입력 오류 입니다.")
        } else console.log(validation[year], validation[month], validation[date], "날짜 입력 오류입니다.")
    }
}

main();