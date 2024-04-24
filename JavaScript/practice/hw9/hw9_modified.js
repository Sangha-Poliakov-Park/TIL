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

const PRIZE = { FIRST: 39400000, SECOND: 2700000000, THIRD: 1550000, FOURTH: 50000, FIFTH: 5000, FAIL: 0 };

class Game {
    constructor(speed, frequency, round) {
        this.interval = 1000 / speed;
        this.frequency = frequency;
        this.round = round;
    }

    myLotto = [];
    keyLotto = [];
    winningRecord = [];
    record = { first: 0, second: 0, third: 0, fourth: 0, fifth: 0, fail: 0 };
    ticketCnt = 0;

    start() {
        let loop = null;
        loop = setInterval(() => {
            this.executeRound()
            if (this.round != Infinity) {
                if (this.round == this.getPlayTime()) {
                    clearInterval(loop);
                }
            }
        }, (this.interval));
    }

    initialize() {
        this.myLotto = [];
        this.keyLotto = [];
    }
    executeRound() {
        this.initialize();
        this.generateTickets();
        this.compareTickets();
        this.render();
    }

    generateTickets() {
        this.keyLotto = this.getTicket();
        for (let i = 0; i < this.frequency; i++) {
            this.myLotto.push(this.getTicket());
            this.ticketCnt++;
        }
    }

    getTicket() {
        let ticket = [];
        while (ticket.length != 7) {
            let num = this.raffleNumber();
            if (ticket.find((e) => e == num)) {
                continue;
            } else {
                ticket.push(num);
            }
        }
        return ticket;
    }

    raffleNumber() {
        let num = Math.floor((Math.random() * 45)) + 1;
        return num;
    }

    compareTickets() {
        let exceptBonusKey = this.keyLotto.slice(0, -1);
        let exceptBonus = this.myLotto.map(ticket => ticket.slice(0, -1));
        for (let i = 0; i < this.frequency; i++) {
            let match = 0;
            exceptBonus[i].forEach(
                (myE) => {
                    exceptBonusKey.forEach(
                        (keyE) => { myE == keyE ? match++ : match }
                    )
                }
            )
            this.updateRecord(match, this.myLotto[i]);
        }
    }

    updateRecord(match, ticket) {
        let rank;
        if (match == 6) {
            this.record.first++;
            rank = 1;
        } else if (match == 5 && ticket[6] == this.keyLotto[6]) {
            this.record.second++;
            rank = 2;
        } else {
            switch (match) {
                case 5:
                    this.record.third++;
                    rank = 3;
                    break;
                case 4:
                    this.record.fourth++;
                    rank = 4;
                    break;
                case 3:
                    this.record.fifth++;
                    rank = 5;
                    break;
                default: this.record.fail++;
                    rank = -1
            }
            if (rank != -1) {
                this.winningRecord.unshift({ 'ticket': ticket, 'rank': rank, 'playRound': this.getPlayTime() })
            }
            if (this.winningRecord.length >= 6) {
                this.winningRecord.pop();
            }
        }
    }

    getCost() {
        let ticketCost = 1000;
        let ticketCnt = Object.values(this.record).reduce((acc, e) => acc + e, 0);
        return ticketCost * ticketCnt;
    }

    getPlayTime() {
        let playTime = this.ticketCnt / this.frequency;
        return Math.floor(playTime);
    }

    getIncome() {
        let recordData = Object.values(this.record);
        let prizeData = Object.values(PRIZE);
        return recordData.reduce((acc, value, index) => {
            return acc + value * prizeData[index];
        }, 0)
    }

    render() {
        let year = Math.floor((this.getPlayTime() / 60));
        let income = this.getIncome();
        let cost = this.getCost();
        let myRecord = Object.values(this.record);

        let first = myRecord[0];
        let second = myRecord[1];
        let third = myRecord[2];
        let fourth = myRecord[3];
        let fifth = myRecord[4];
        let fail = myRecord[5];

        let row1 = `제 ${this.getPlayTime()}회차`.padEnd(27, " ") + `│ 총 투자금    :` + `${cost.toLocaleString()}원\n`.padStart(15, " ");
        let row2 = `총 ${this.printRound().toLocaleString()}게임당`.padEnd(26, "  ") + `│ 총 수익금    :` + `${income.toLocaleString()}원\n`.padStart(15, " ")
        let row3 = `1주 ${this.frequency}게임  : 약 ${year}년 경과`.padEnd(23, "  ") + `│ 순이익       :` + `${(income - cost).toLocaleString()}원\n`.padStart(15, " ");
        let row4 = "".padEnd(30, "  ") + `│ 게임당 수익  :` + `${(income / (this.ticketCnt)).toLocaleString()}원\n`.padStart(15, " ") + " ".repeat(30) + `│ 게임당 순익  :` + `${((income - cost) / (this.ticketCnt)).toLocaleString()}원\n`.padStart(15, " ") + "─".repeat(70) + "\n";;

        let prefix = row1 + row2 + row3 + row4;

        let status = `게임상태\n 1등 :` + `${first}건`.padStart(10, " ") + `  (${this.getPercentage(first)}%)\n 2등 :` + `${second}건`.padStart(10, " ") + `  (${this.getPercentage(second)}%)\n 3등 :` + `${third}건`.padStart(10, " ") + `  (${this.getPercentage(third)}%)\n 4등 :` + `${fourth}건`.padStart(10, " ") + `  (${this.getPercentage(fourth)}%)\n 5등 :` + `${fifth}건`.padStart(10, " ") + `  (${this.getPercentage(fifth)}%)\n  꽝 :` + `${fail}건`.padStart(10, " ") + `  (${this.getPercentage(fail)}%)\n` + "─".repeat(70) + "\n";

        let suffix = "최근 당첨 번호 5개\n" + "─".repeat(70) + "\n";
        for (let e of this.winningRecord) {
            let suffixRow = `${e.playRound}회차 번호: ${e.ticket}`
            suffixRow = suffixRow.padEnd(35, " ");
            suffixRow += `등수 : ${e.rank}\n`
            suffix += suffixRow;
        }
        console.clear();
        console.log(prefix + status + suffix);
    }

    getPercentage = (ticketNumber) => {
        return ticketNumber / this.ticketCnt * 100;
    }

    printRound() {
        return (this.round == Infinity) ? "∞ " : this.round;
    }
}

const main = (async () => {
    let speed = parseFloat(await question('배속을 입력하세요 (1~1000):'));
    let frequency = parseInt(await question('회당 게임 :'));
    while (true) {
        var round = parseInt(await question('게임 수 를 입력하세요 (-1입력시 ∞ 번 시행) : '));
        if (round == -1) {
            round = Infinity;
            break;
        }
        if (!(round < -1)) {
            break;
        };
        console.log("잘못된 번호를 입력하셨습니다.")
    }
    new Game(speed, frequency, round).start();
})
main();