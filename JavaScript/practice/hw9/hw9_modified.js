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
const PRIZE ={FIRST :39400000,SECOND:2700000000,THIRD: 1550000, FOURTH:50000, FIFTH:5000, FAIL:0};

class Game {
    constructor(speed, frequency, round) {
        this.interval = 1000 / speed;
        this.frequency = frequency;
        if (round == -1) {
            this.round = Infinity;
        } else {
            this.round = round;
        }
    }

    myLotto = [];
    keyLotto = [];
    record = {first: 0, second: 0, third: 0, fourth: 0, fifth: 0, fail: 0};
    winningRecord = [];
    loop = null
    ticketCnt = 0;

    start() {
        let loop = setInterval(() => {
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
        this.playRound++;
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
        let rank = -1;
        if (match == 6) {
            this.record.first++;
            rank = 1;
        } else if (match == 5 && myTicket[6] == this.keyLotto[6]) {
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
                this.winningRecord.unshift({ 'ticket': myTicket, 'rank': rank, 'playRound': this.getPlayTime() })
            }
            if (this.winningRecord.length >= 6) {
                this.winningRecord.pop();
            }
        }
    }

    getCost(){
        let ticketCost = 1000;
        let ticketCnt = 0;
        for(let i in this.record){
            ticketCnt+=parseInt(this.record[i]);
        }
        return ticketCost*ticketCnt;
    }

    getPlayTime(){
        let playTime = 0;
        for(let i in this.record){
            playTime+=parseInt(this.record[i]);
        }
        playTime/=this.frequency;
        return Math.floor(playTime);
    }

    getIncome(){
        let income = 0;
        let recordData = Object.values(this.record);
        let prizeData = Object.values(PRIZE);
        for(let i = 0; i<recordData.length; i++){
            income+=recordData[i]*prizeData[i];
        }
        return income;
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

        let row1 = `제 ${this.getPlayTime()}회차`;
        row1=row1.padEnd(27, " ");
        row1 += `│ 총 투자금    :`  
        let row1Last = `${cost.toLocaleString()}원\n`;
        row1 += row1Last.padStart(15, " ")
        let row2 = `총 ${this.printRound().toLocaleString()}게임당`
        row2=row2.padEnd(26, "  ");
        row2 += `│ 총 수익금    :`  
        let row2Last = `${income.toLocaleString()}원\n`
        row2+=row2Last.padStart(15," ")
        let row3 = `1주 ${this.frequency}게임  : 약 ${year}년 경과`
        row3=row3.padEnd(23, "  ");
        row3 += `│ 순이익       :`  
        let row3Last =`${(income - cost).toLocaleString()}원\n`
        row3+= row3Last.padStart(15, " ");
        let row4 =""
        row4 = row4.padEnd(30,"  ");
        row4 += `│ 게임당 수익  :`  
        let row4Money1=`${(income / (this.ticketCnt)).toLocaleString()}원\n` 
        row4+=row4Money1.padStart(15," ");
        row4+=" ".repeat(30) + `│ 게임당 순익  :`
        let row4Money2=`${((income - cost) / (this.ticketCnt)).toLocaleString()}원\n`
        row4+=row4Money2.padStart(15, " ");
        row4+="─".repeat(70)+"\n";
        
        let prefix = row1 + row2 + row3 + row4;

        const getPercentage = (finance) => {
            return finance / this.ticketCnt * 100;
        }
        let status =   `게임상태\n 1등 :`+ `${first}건`.padStart(10, " ") + `  (${getPercentage(first)}%)\n 2등 :`+`${second}건`.padStart(10, " ") +`  (${getPercentage(second)}%)\n 3등 :`+`${third}건`.padStart(10, " ")+ `  (${getPercentage(third)}%)\n 4등 :`+`${fourth}건`.padStart(10, " ") +`  (${getPercentage(fourth)}%)\n 5등 :`+`${fifth}건`.padStart(10, " ") +`  (${getPercentage(fifth)}%)\n  꽝 :`+`${fail}건`.padStart(10, " ")+ `  (${getPercentage(fail)}%)\n`+"─".repeat(70)+"\n";

        let suffix = "최근 당첨 번호 5개\n"+ "─".repeat(70) + "\n";
        for (let e of this.winningRecord) {
            let suffixRow = `${e.playRound}회차 번호: ${e.ticket}` 
            suffixRow = suffixRow.padEnd(35, " ");
            suffixRow+=`등수 : ${e.rank}\n`
            suffix+=suffixRow;
        }
        console.clear();
        console.log(prefix + status + suffix);
    }

    printRound(){
        if(this.round==Infinity){
            return "∞ "
        } else return this.round;
    }
}


const main = (async () => {
    let speed = parseFloat(await question('배속을 입력하세요 (1~1000):'));
    let frequency = parseInt(await question('회당 게임 :'));
    let round;
    while(true){
    round = parseInt(await question('게임 수 를 입력하세요 (-1입력시 ∞ 번 시행) : '));
    if(!(round<-1)) {break};
    console.log("잘못된 번호를 입력하셨습니다.")
    }
    new Game(speed, frequency, round).start();
})

main();

