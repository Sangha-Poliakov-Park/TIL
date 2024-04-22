const { clear } = require('console');
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const KEY = { UP: 'up', DOWN: 'down', LEFT: 'left', RIGHT: 'right' };

function Worm(x, y, isInitial, isHead) {
    if (isInitial) {
        this.x = Math.floor(x / 2);
        this.y = Math.floor(y / 2);
    } else {
        this.x = x;
        this.y = y;
    }
    this.head = isHead;
}

class Game {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    worms = [];
    score=0;
    interval = 600;
    speed = 10;
    prevKey = null;
    food = null;
    weight=1;
    isGameOver;

    start() {
        this.initialize();
        console.log("일단 방향키를 누르면 시작합니다. 좀 배워야 다른키를 입력받을 수 있겠슈")
        process.stdin.on('keypress', (ch, key) => this.keyPressHandler(ch, key));
        setInterval(()=>this.score+=this.weight,1000);
    }

    initialize() {
        this.worm = new Worm(this.x, this.y, true, true);
        this.worms.push(this.worm);
        this.dropFood();
        this.prevKey = null;
        this.isGameOver = false;
        this.score=0;
        this.weight=1;
        this.interval=600;
        this.speed=10;
    }

    keyPressHandler = (ch, key) => {
        clearInterval(this.moveLoop);
        clearInterval(this.renderLoop);
        if (ch === "q") {
            process.exit();
        }
        if (ch === "r") {
            this.initialize();
        }
        if (this.worms.length > 1) {
            if (this.prevKey == KEY.DOWN && key.name == KEY.UP || this.prevKey == KEY.UP && key.name == KEY.DOWN || this.prevKey == KEY.LEFT && key.name == KEY.RIGHT || this.prevKey == KEY.RIGHT && key.name === KEY.LEFT) {
                key.name = this.prevKey;
            }
        }
        this.moveLoop = setInterval(() => this.play(key.name), this.interval);
        this.prevKey = key.name;
        this.renderLoop=setInterval(()=>this.render(),100);

    }

    play = function (keyName) {
        this.moveWorm(keyName);
        if (this.isGameOver) {
            console.clear();
            console.log("GAME OVER");
            console.log(`총점 : ${this.score}`)
            process.exit();
        }
    }

    moveWorm(keyName) {
        this.worms[0].head = false;
        this.worms.unshift(new Worm(this.worms[0].x, this.worms[0].y, false, true));
        switch (keyName) {
            case "up":
                this.worms[0].y--;
                break;
            case "down":
                this.worms[0].y++;
                break;
            case "left":
                this.worms[0].x--;
                break;
            case "right":
                this.worms[0].x++;
                break;
        }
        let lastWorm = this.worms.pop();

        if (this.isCrashed()) {
            this.isGameOver = true;
        }
        if (this.getFood()) {
            this.dropFood();
            this.worms.push(lastWorm);
            this.interval = Math.floor(this.interval*0.85)
            this.speed= Math.floor(this.speed*1.3);
            this.score+=10;
            this.weight++;
        }
    }

    dropFood() {
        this.food = null
        while (!this.food) {
            let x = Math.floor((Math.random() * (this.x - 2)));
            let y = Math.floor((Math.random() * (this.y - 2)));
            this.food = { 'x': x, 'y': y };
            this.worms.forEach((e) => {
                if (this.food.x == e.x && this.food.y == e.y) {
                    this.food = null;
                }
            })
        }
    }

    getFood() {
        let head = this.worms[0];
        return (head.x == this.food.x && head.y == this.food.y ? true : false);
    }

    isCrashed() {
        let head = this.worms[0];
        let flag = false;
        this.worms.forEach((e) => {
            if (e.head != head.head && e.x == head.x && e.y == head.y) {
                flag = true;
            }
        });
        if (flag) { return true }
        else {
            return (head.x < 0 || head.x >= this.x - 2 || head.y < 0 || head.y >= this.y - 2 ? true : false);
        }
    }

    render() {
        console.clear();
        let ceiling = "┌" + "─".repeat(this.x - 2) + "┐\n";
        let floor = "└" + "─".repeat(this.x - 2) + "┘\n"+`점수 : ${this.score} 속도 : ${this.speed}`;
        let screen = "";
        for (let row = 0; row < this.y - 2; row++) {
            let rowScreen = "";
            for (let col = 0; col < this.x - 2; col++) {
                rowScreen += " "
                this.worms.forEach((e) => {
                    if (row == e.y && col == e.x) {
                        rowScreen = rowScreen.substring(0, rowScreen.length - 1);
                        rowScreen += "▉";
                    }
                })
                if (row == this.food.y && col == this.food.x) {
                    rowScreen = rowScreen.substring(0, rowScreen.length - 1);
                    rowScreen += "◎"
                }
            }
            rowScreen = "│" + rowScreen + "│\n";
            screen += rowScreen;
        }
        console.log(ceiling + screen + floor);
        console.log("나가기 : q버튼")
    }
}
new Game(20, 10).start();