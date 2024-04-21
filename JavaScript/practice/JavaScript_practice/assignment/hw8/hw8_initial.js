let score = 0;
let getScoreByTime = 1;
let worm = [];
let loop;
setInterval(() => { score += getScoreByTime }, 1000);

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

function WormHead() {
    this.x = 11;
    this.y = 4;
}

function WormBody() {
    this.x;
    this.y;
}

function Food() {
    let x = 0;
    let y = 0;
    let flag = true;
    while (flag) {
        flag = false;
        x = Math.floor(Math.random() * 20);
        y = Math.floor(Math.random() * 8);
        for (i of worm) {
            if (i.x == x && i.y == y) {
                flag = true;
            }
        }
    }
    this.x = x;
    this.y = y;
}

function getPlayScreen() {
    let screen = "";
    let print = [];
    let blank = " ";
    screen += "총점: "+score + '점, 획득점수: '+getScoreByTime+'\n';
    screen += '┌────────────────────┐' + '\n';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 20; j++) {
            print.push(blank);
        }
        if (food.y == i) {
            print[food.x] = '◎'
        }
        for (e of worm) {
            if (e.y == i) {
                print[e.x] = '▉'
            }
        }
        screen += '│' + print.join("") + '│' + '\n';
        print = [];
    }
    screen += '└────────────────────┘' + '\n';
    screen += 'q를 누르면 종료합니다.\n'
    return screen;
}

function play() {
    console.log(getPlayScreen());
}

worm.push(new WormHead());
let food = new Food();

const main = function () {
    console.log("방향키를 누르면 시작합니다.");
    process.stdin.on('keypress', function (ch, key) {
        clearInterval(loop);
        loop = setInterval(() => {
            switch (key.name) {
                case "up":
                    worm[0].y--;
                    break;
                case "down":
                    worm[0].y++;
                    break;
                case "left":
                    worm[0].x--;
                    break;
                case "right":
                    worm[0].x++;
                    break;
                default : process.exit();
            }
            if (worm.length == 1) {
                worm.push(new WormBody());
            }

            if (worm[0].x == food.x && worm[0].y == food.y) {
                food = new Food();
                worm.push(new WormBody());
                score += 10;
                getScoreByTime += 1;
            }
            
            for (let i = worm.length - 1; i > 0; i--) {
                worm[i].x = worm[i - 1].x;
                worm[i].y = worm[i - 1].y;
            }
            play();
            if (worm[0].x < 0 || worm[0].x > 19 || worm[0].y < 0 || worm[0].y > 8) {
                console.log("Game Over");
                console.log("최종스코어 : " + score);
                console.log("재시작을 하려면 방향키를, 종료하시려면 다른 키 누르세요")
                clearInterval(loop);
                    worm = [];
                    worm.push(new WormHead())
                    food = new Food();
                    score = 0;
                    getScoreByTime = 1;
            }
            else if (key.name == 'q') {
                process.exit();
            }
        }, 250)
    }
    )
}

main();