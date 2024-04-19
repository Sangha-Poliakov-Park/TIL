// 답지 자체가 기본 문법과 코드의 흐름이 분명하여 코딩마다 주석 처리를 함으로써 학습하였다.

const readFile = require("fs").readFileSync;

const HAMLET_PATH = "./hamlet.txt";

const countAlphabetFrequency = (str) => {
  //map 객체로 file의 문자열 데이터를 관리할 것이다.
  const map = {};
  //모든 문자열을 순회하며
  for (let i = 0; i < str.length; i++) {
  // 매 순회시 한 글자를 소문자로 변환 후 letter에 저장한다.
    const letter = str.charAt(i).toLowerCase();
  // !! 자동 형변환 개념을 이용한 분리 작업.
    if (letter >= "a" && letter <= "z") {
  // 프로퍼티를 [] 문법과 || 연산으로 관리한다. -> 연산자와 []를 사용하는데 익숙치 않으므로 숙달하겠다.
  // 프로퍼티가 존재시 프로퍼티의 value +1, 존재하지 않을 시 새로운 프로퍼티 생성후 0을 부여한다.
      map[letter] = (map[letter] || 0) + 1;
    }
  }
  //글자 데이터가 담긴 객체를 반환한다.
  return map;
};

const sumValues = (map) => {
  let total = 0;
  //객체의 프로퍼티를 순회하며 key 변수에 담는다.
  for (const key in map) {
  //key변수의 값을 증감한다.
    total += map[key];
  }
  return total;
};

const calculateAlphabetFrequency = (map) => {
  //전체 글자수를 total에 저장한다.
  const total = sumValues(map);
  //freq를 담을 배열을 생성후
  const frequencyMap = {};
  // 그 값을 map의 property와 똑같이 frequencyMap 객체에 프로퍼티를 저장 후 복사해준다.
  // 퍼센테이지 값으로 저장한다.
  for (const key in map) {
    frequencyMap[key] = (map[key] / total) * 100;
  }
  return frequencyMap;
};

// 소수점 두자리수까지의 문자열을 구현함.
const formatPercentage = (value) => {
  //퍼센테이지의 소수값을 제거
  const integer = Math.floor(value);
  //소수점 3째자리 유무 변수
  const rem = value % 1;
  //String 메소드를 더 숙달할 것
  const remStr = String(rem).slice(2, 4); // 0.12 -> 12
  // ${integer 앞에 공백을 추가함으로써 출력물의 통일성을 유지한다} , slice로 소숫점 2째자리 수까지만 추출했으므로, 소수가 없을때만 0을 뽑는다.
  return `${integer < 10 ? ` ${integer}` : integer}.${rem === 0 ? "00" : remStr}`;
};

const HISTOGRAM_LENGTH = 60;

const formatHistogram = (value) => {
  const targetLength = Math.ceil(value * 2);

  let str = " ";

  for (let i = 0; i < HISTOGRAM_LENGTH - 1; i++) {
    //공백을 함께 추가하여 출력물의 상태를 통일 시킨다.
    str += i < targetLength ? "*" : " ";
  }

  return str;
};

const main = () => {
  //파일을 읽고 String 타입으로 변환한다.
  const file = readFile(HAMLET_PATH, "utf-8");
  //문자열 프로퍼티와 그 갯수를 담고 있는 객체를 받았다.
  const alphabetCountMap = countAlphabetFrequency(file);
  //frequency 객체를 받았다.
  const alphabetFrequencyMap = calculateAlphabetFrequency(alphabetCountMap);

  console.log("+-----------------------------------------------------------------------+");
  console.log("| C | Freq |                               Histogram                    |");
  console.log("+-----------------------------------------------------------------------+");

  //a부터 z까지 범위대로 순회한다(자동 형변환을 더 숙달하자.)
  for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
    const letter = String.fromCharCode(i);
    const frequency = alphabetFrequencyMap[letter] || 0;
    console.log(`| ${letter} |${formatPercentage(frequency)} |${formatHistogram(frequency)}|`);
  }
  console.log("+-----------------------------------------------------------------------+");
};

main();
