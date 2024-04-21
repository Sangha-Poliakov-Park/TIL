const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const LOGO =
  "\r\n                    ,----..                        ____   \r\n           .---.   /   /   \\  ,-.----.           ,'  , `. \r\n          /. ./|  /   .     : \\    /  \\       ,-+-,.' _ | \r\n      .--'.  ' ; .   /   ;.  \\;   :    \\   ,-+-. ;   , || \r\n     /__./ \\ : |.   ;   /  ` ;|   | .\\ :  ,--.'|'   |  ;| \r\n .--'.  '   \\' .;   |  ; \\ ; |.   : |: | |   |  ,', |  ': \r\n/___/ \\ |    ' '|   :  | ; | '|   |  \\ : |   | /  | |  || \r\n;   \\  \\;      :.   |  ' ' ' :|   : .  / '   | :  | :  |, \r\n \\   ;  `      |'   ;  \\; /  |;   | |  \\ ;   . |  ; |--'  \r\n  .   \\    .\\  ; \\   \\  ',  / |   | ;\\  \\|   : |  | ,     \r\n   \\   \\   ' \\ |  ;   :    /  :   ' | \\.'|   : '  |/      \r\n    :   '  |--\"    \\   \\ .'   :   : :-'  ;   | |`-'       \r\n     \\   \\ ;        `---`     |   |.'    |   ;/           \r\n      '---\"                   `---'      '---'           ";

const KEYS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
};

class Game {
  x = 0;
  y = 0;

  score = 0;

  direction = null;

  wormArray = [];
  food = null;

  intervalTime = 1000;
  interval = null;

  isGameOver = false;

  constructor(x, y, intervalTime = 250) {
    this.x = x;
    this.y = y;
    this.intervalTime = intervalTime;
  }

  start() {
    this.initialize();
    process.stdin.on('keypress', this.keypressHandler);
  }

  initialize() {
    this.wormArray = [{ x: Math.floor(this.x / 2), y: Math.floor(this.y / 2) }];
    this.isGameOver = false;
    console.clear();
    console.log(LOGO);
    console.log('press arrow key to start, q to quit');
  }

  keypressHandler = (char, evt) => {
    if (char === 'q') process.exit();
    if (!this.interval && char === 'r') {
      this.initialize();
    }

    if (this.isGameOver) return;

    if (Object.values(KEYS).includes(evt.name)) {
      const nextDirection = evt.name;
      if (!this.isBackwardDirection(nextDirection)) {
        this.direction = nextDirection;
      }
      if (!this.interval) {
        this.createFood();
        this.startLoop();
      }
    }
  };

  isBackwardDirection(newDirection) {
    if (!this.direction) return false;
    return (
      (this.direction === KEYS.UP && newDirection === KEYS.DOWN) ||
      (this.direction === KEYS.DOWN && newDirection === KEYS.UP) ||
      (this.direction === KEYS.LEFT && newDirection === KEYS.RIGHT) ||
      (this.direction === KEYS.RIGHT && newDirection === KEYS.LEFT)
    );
  }

  gameOver() {
    clearInterval(this.interval);
    const finalScore = Math.floor(this.score);
    this.interval = null;
    this.wormArray = [];
    this.food = null;
    this.direction = null;
    this.score = 0;
    this.isGameOver = true;
    console.clear();
    console.log('Game Over');
    console.log('your final score is', finalScore);
    console.log('press r to restart, q to quit');
  }

  loopTask = () => {
    this.updateScore();
    this.moveWorm();
    this.render();
  };

  startLoop() {
    this.interval = setInterval(this.loopTask, this.intervalTime);
    this.loopTask();
  }

  updateScore() {
    const weight = this.intervalTime / 1000;
    this.score += this.wormArray.length * weight;
  }

  moveWorm() {
    const head = this.wormArray[0];
    let newHead = { ...head };

    switch (this.direction) {
      case KEYS.UP:
        newHead.y -= 1;
        break;
      case KEYS.DOWN:
        newHead.y += 1;
        break;
      case KEYS.LEFT:
        newHead.x -= 1;
        break;
      case KEYS.RIGHT:
        newHead.x += 1;
        break;
    }

    if (this.checkCollision(newHead)) {
      this.gameOver();
      return;
    }

    if (this.checkFoodConsumption(newHead)) {
      this.wormArray.unshift(newHead);
      this.score += (this.wormArray.length - 1) * 10;
      this.createFood();
      return;
    }

    this.wormArray.unshift(newHead);
    this.wormArray.pop();
  }

  checkCollision(nextHead) {
    if (
      nextHead.x < 0 ||
      nextHead.x >= this.x ||
      nextHead.y < 0 ||
      nextHead.y >= this.y
    ) {
      return true;
    }

    if (this.isWormBody(nextHead)) {
      return true;
    }

    return false;
  }

  checkFoodConsumption(nextHead) {
    if (this.food && this.food.x === nextHead.x && this.food.y === nextHead.y) {
      return true;
    }
    return false;
  }

  createFood() {
    const x = Math.floor(Math.random() * this.x);
    const y = Math.floor(Math.random() * this.y);

    if (this.isWormBody({ x, y })) {
      return this.createFood();
    }

    this.food = { x, y };
  }

  isWormBody({ x, y }) {
    return this.wormArray.some((worm) => worm.x === x && worm.y === y);
  }

  isFood({ x, y }) {
    return this.food.x === x && this.food.y === y;
  }

  render() {
    if (!this.interval) {
      return;
    }

    console.clear();
    console.log(`score: ${Math.floor(this.score)}`);
    console.log('┌' + '─'.repeat(this.x) + '┐');
    for (let y = 0; y < this.y; y++) {
      let row = '│';
      for (let x = 0; x < this.x; x++) {
        if (this.isWormBody({ y, x })) {
          row += '▉';
        } else if (this.food && this.isFood({ x, y })) {
          row += '◎';
        } else {
          row += ' ';
        }
      }
      row += '│';
      console.log(row);
    }
    console.log('└' + '─'.repeat(this.x) + '┘');
    console.log('Press q to quit');
  }
}

function main() {
  const game = new Game(30, 20);
  game.start();
}

main();
