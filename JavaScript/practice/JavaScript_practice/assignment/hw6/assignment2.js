const readFile = require('fs').readFileSync;

const HAMLET_PATH = './hamlet.txt';

const test = () => {
  const file = readFile(HAMLET_PATH, 'utf-8');
  return file;
};
const file = test();

//a-z 아스키 :97 -122
//A-Z : 65 - 90
//아스키 보기 "str".codePointAt() 아스키를 문자열로 String.fromCharCode(ASCCII)
function countLetter(list) {
  for (let i = 0; i < file.length; i++) {
    let letter = file.charAt(i).toLowerCase();
    for (let j = 0; j < 26; j++) {
      if (String.fromCharCode(j + 97) == letter) {
        list[j] = list[j] + 1;
      }
    }
  }
  return list;
}

function countTotalLetter(list, totalLetter) {
  for (i of list) {
    totalLetter += i;
  }
  return totalLetter;
}

function updateFrequencyArray(list, totalLetter, frequency) {
  for (let i = 0; i < list.length; i++) {
    frequency[i] = Math.round((list[i] / totalLetter) * 100 * 100) / 100;
  }
  return frequency;
}

function countHistogram(frequency) {
  let star = '*';
  let histogram = [];
  starArr = [];
  for (let i = 0; i < 26; i++) {
    if (frequency[i] % 1 == 0) {
      histogram[i] = frequency[i] * 2;
    } else {
      histogram[i] = Math.ceil(frequency[i] * 2);
    }
  }

  for (let i = 0; i < histogram.length; i++) {
    starArr[i] = '';
    for (let j = 0; j < histogram[i]; j++) {
      starArr[i] += star;
    }
  }
  return starArr;
}

function makeTable(list, frequency, starArr) {
  const table = {};
  for (let i = 0; i < 26; i++) {
    let property = String.fromCharCode(i + 97);
    table[property] = {};
  }
  for (let i = 0; i < 26; i++) {
    function Table() {
      this.C = list[i];
      this.freq = frequency[i];
      this.histogram = starArr[i];
    }
    table[String.fromCharCode(i + 97)] = new Table();
  }
  return table;
}

function main() {
  let list = [];
  let totalLetter = 0;
  let frequency = [];
  let histogram = [];
  let starArr = [];
  for (let i = 0; i < 26; i++) {
    list[i] = 0;
    frequency[i] = 0;
    histogram[i] = 0;
  }

  list = countLetter(list);
  totalLetter = countTotalLetter(list, totalLetter);
  frequency = updateFrequencyArray(list, totalLetter, frequency);
  starArr = countHistogram(frequency);
  let table = makeTable(list, frequency, starArr);
  console.table(table);
}

main();
