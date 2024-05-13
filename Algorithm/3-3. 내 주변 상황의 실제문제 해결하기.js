/*
해결해야 하는 과제.
수업 시작일 :5월 18일 수업 종료일 :8월 10일
수업은 8시간만 들어도 수료할 수 있으므로, 하기 조건만 만족하면 된다.
조건 : 30일 마다 한번씩은 출석을 해주어야 한다.
수업 시작일로부터 30일이 되는 시점을 찾는 알고리즘은 제작한다.
*/

/*
매개변수로는 수업 시작 월, 일을 사용하고 30일을 마지막 매개변수로 사용한다.
5월 31일
6월 30일
7월 31일
8월 31일
*/


// 최초 코드
function showEach30Day1(month, date, term = 30) {
    const LAST_DATE_31 = 31;
    const LAST_DATE_30 = 30;
    let currentMonth = month;
    let currentDate = date;
    let RESULT = [`${currentMonth}월 ${currentDate}일 (첫 출석일)`];

    while (currentMonth != 9) {
        switch (currentMonth) {
            case 5:
            case 7:
            case 8:
                for (let i = 0; i < term; i++) {
                    currentDate++;
                    if (currentDate == LAST_DATE_31) {
                        currentMonth++;
                        currentDate = 0
                    }
                }
                RESULT.push(`${currentMonth}월 ${currentDate}일`)
                break;
            case 6:
                for (let i = 0; i < term; i++) {
                    currentDate++;
                    if (currentDate > LAST_DATE_30) {
                        currentMonth++;
                        currentDate = 1
                    }
                }
                RESULT.push(`${currentMonth}월 ${currentDate}일`)
                break;
        }
    }
    return RESULT;
}
// console.log(showEach30Day1(5, 18))


/*
30일의 의미가 첫 출석 이후 해당 시점을 기준으로 30일 이내 재출석을 해야하는 것으로 생각 하였으나 규정을 보니 

※ 무단결석은 실질적으로 교육이 실시된 횟수나 시간, 일수 등과는 상관없이 첫 결석일을 시작으로 30일 후까지 결석하는 것을 말함
이라고 되있다. 

그래서 결석한 날짜를 기준으로 30일 이후가 되는 시점이 언제인지를 구현해보기로 하였고, 이를 이해 Date 객체의 사용법을 먼저 마스터 하도록 하겠다.
*/

// node로 돌려도 문제 없다. 다만 UTC 기준이다.
function calculateNextAttendanceDate(year, month, date) {
    const LAST_DATE_IS_31 = [1, 3, 5, 7, 8];
    const YEAR = String(year);

    let absenceMonth = month;
    let absenceDate = String(date - 1).padStart(2, '0');
    let result = [];

    if (date === 1) {
        absenceDate = String(LAST_DATE_IS_31.includes(month - 1) ? 31 : 30)
        absenceMonth = month - 1;
    }
    const UTC = new Date(`${YEAR}-${String(absenceMonth)}-${absenceDate}`)
    const lastDay = new Date(UTC.getTime() + 30 * 24 * 60 * 60 * 1000);

    result.push(lastDay.getFullYear() + "년");
    result.push(lastDay.getMonth() + 1 + "월");
    result.push(lastDay.getDate() + "일");
    result = result.join(" ");

    return result;
}
console.log(calculateNextAttendanceDate(2024, 6, 15))



