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

class Game {
    constructor(speed, frequency, round) {
        this.interval = 1000 / speed;
        this.frequency = frequency;
        this.speed = speed;
        if (round == -1) {
            this.round = Infinity;
        } else {
            this.round = round;
        }
    }

    playRound = 0;
    myLotto = [];
    keyLotto = [];
    financeRecord = { first: 0, second: 0, third: 0, fourth: 0, fifth: 0, fail: 0 };
    lottoRecord = [];
    totalIncome = 0;
    totalCost = 0;
    loop = null
    ticketCnt = 0;
    ticketCost = 1000;

    start() {
        let loop = setInterval(() => {
            this.executeRound()
            if (this.round != Infinity) {
                if (this.round == this.playRound) {
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
        this.playRound++;
    }
    generateTickets() {
        this.keyLotto = this.getTicket();
        this.totalCost -= this.ticketCost;
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
        this.totalCost += this.ticketCost
        return ticket;
    }

    raffleNumber() {
        let num = Math.floor((Math.random() * 45)) + 1;
        return num;
    }

    compareTickets() {
        let match = 0;
        for (let i = 0; i < this.frequency; i++) {
            let match = 0;
            let myTicket = this.myLotto[i];
            let exceptBonusMine = myTicket.slice(0, -1);
            let exceptBonusKey = this.keyLotto.slice(0, -1);
            exceptBonusMine.forEach(
                (myE) => {
                    exceptBonusKey.forEach(
                        (keyE) => {
                            if (myE == keyE) {
                                match++;
                            }
                        }
                    )
                }
            )
            this.updateRecord(match, myTicket);
        }
    }
    updateRecord(match, myTicket) {
        let rank = null;
        if (match == 6) {
            this.financeRecord.first++;
            rank = 1;
            this.totalIncome += 2700000000;
        } else if (match == 5 && myTicket[6] == this.keyLotto[6]) {
            this.financeRecord.second++;
            rank = 2;
            this.totalIncome += 39400000;
        } else {
            switch (match) {
                case 5:
                    this.financeRecord.third++;
                    rank = 3;
                    this.totalIncome += 1550000;
                    break;
                case 4:
                    this.financeRecord.fourth++;
                    rank = 4;
                    this.totalIncome += 50000;
                    break;
                case 3:
                    this.financeRecord.fifth++;
                    rank = 5;
                    this.totalIncome += 5000;
                    break;
                default: this.financeRecord.fail++;
                    rank = -1
            }
            if (rank != -1) {
                this.lottoRecord.unshift({ 'ticket': myTicket, 'rank': rank, 'playRound': this.playRound })
            }
            if (this.lottoRecord.length >= 6) {
                this.lottoRecord.pop();
            }
        }
    }
    render() {
        let year = Math.floor((this.playRound / 60));
        let income = this.totalIncome;
        let cost = this.totalCost;

        let first = this.financeRecord.first;
        let second = this.financeRecord.second;
        let third = this.financeRecord.third;
        let fourth = this.financeRecord.fourth;
        let fifth = this.financeRecord.fifth;
        let fail = this.financeRecord.fail;

        let row1 = `제 11${this.playRound + 1}회차`;
        row1=row1.padEnd(25, "  ");
        row1 += `| 총 투자금 ${cost}\n`;
        let row2 = `총 ${this.round}게임당`
        row2=row2.padEnd(25, "  ");
        row2 += `| 총 수익금 ${income}\n`
        let row3 = `1주 1${this.frequency}게임 : 약 0${year}년 경과`
        row3=row3.padEnd(28, " ");
        row3 += `| 순이익 ${income - cost}\n`
        let row4 =" "
        row4 = row4.padEnd(24," ");
        row4 += `| 게임당 수익 : ${income / (this.ticketCnt)}\n` + " ".repeat(25-1) + `| 게임당 순익 ${(income - cost) / (this.ticketCnt)}\n`;
        
        let prefix = row1 + row2 + row3 + row4;

        const getPercentage = (finance) => {
            return finance / this.ticketCnt * 100;
        }
        let status = `게임상태\n 1등 :${first}건 (${getPercentage(first)}%)\n 2등 :${second}건 (${getPercentage(second)}%)\n 3등 :${third}건 (${getPercentage(third)}%)\n 4등 :${fourth}건 (${getPercentage(fourth)}%)\n 5등 :${fifth}건 (${getPercentage(fifth)}%)\n 꽝 :${fail}건 (${getPercentage(fail)}%)\n`;

        let suffix = "최근 당첨 번호 5개\n"
        for (let e of this.lottoRecord) {
            suffix += `${e.playRound}회차 번호: ${e.ticket} 등수 : ${e.rank}\n`
        }
        console.clear();
        console.log(prefix + status + suffix);
        console.log(`\n------------------------------------------------\n`)

    }
}


const main = (async () => {
    let speed = parseFloat(await question('배속을 입력하세요 :'));
    let frequency = parseInt(await question('회당 게임:'));
    let round = parseInt(await question('게임 수:'));
    new Game(speed, frequency, round).start();
})

main();

