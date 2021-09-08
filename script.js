class Player {
  constructor(highscore = 0){
    this.lives = 3;
    this.score = 0;
    this.highscore = highscore;
  }

  loseLife() {
    this.lives--;
  }

  winPoints(points) {
    this.score += points;
  }
}

class View {
 constructor(player, game) {
  this.player = player;
  this.game = game;
  this.handleClick = this.handleClick.bind(this)
  this.newGame = this.newGame.bind(this)
  this.createBoard = this.createBoard.bind(this)
  this.createHUD()
  let that = this
  setTimeout(that.createBoard, 5000)
  this.bindEvents()
}

createHUD() {
  this.el = document.getElementById('ui');
  this.reset = document.getElementsByClassName("restartGame")[0]
  this.timeLeft = 7;
  this.timeRemaining = true;  
  const numLives = document.getElementById("lives")
  numLives.innerHTML = "Lives: ";
  for(let i = 0; i < this.player.lives; i++) {
    numLives.innerHTML += '<img src = "https://restorationhemproject.org/wp-content/uploads/2018/07/heart-png-8.png">'
  }
  const numPoints = document.getElementById("points")
  numPoints.innerHTML = this.player.score;
}

createBoard() {
 // Display lives
 if(document.getElementById("play_again").style.display === "initial") {
   document.getElementById("userInput").style.display = "flex"
   document.getElementById("play_again").style.display = "none"
  }
  if(this.player.highscore !== 0) {
    const hs = document.getElementById("highscore")
    hs.style.display = "initial"
    hs.innerText = `High Score: ${this.player.highscore}`
    document.getElementById("")
  }
 document.getElementById("ui").value = null;
 this.timeLeft = this.randomTimeForTimer(this.game.word.length + 2);
 if(this.player.score === 0) this.timeLeft = 700;
  console.log(this.timeLeft)
 document.getElementById("wordToType").innerHTML = `${this.game.word}` 
 this.timer = new Countdown(this.timeLeft, this)
  this.timer.start()
}

bindEvents() {
  // Install a click listener on the board
  this.el.addEventListener("keyup", this.handleClick)
  this.reset.addEventListener("click", this.newGame)
}

randomTimeForTimer(max) {
  return Math.floor(Math.random() * (max - 2) + 2) * 100
}

endOfGame() {
  this.timer.stop()
  if(this.timeRemaining && this.game.checkWord()) {
    this.handleWinPoints();
  }
  else {
    this.handleLostLife();
    if(this.game.isOver(this.player)) {
      this.initiateShutdown();
      return
    }
  }
  this.timeRemaining = true
  this.game = new Game();
  setTimeout(this.createBoard, 5000)
}

initiateShutdown() {
  document.getElementById("lives").innerHTML = "You have no lives left :("
  document.getElementById("wordToType").innerHTML = "Game Over!"
  document.getElementById("userInput").style.display = "none"
  document.getElementById("play_again").style.display = "initial"
}

newGame(e) {
  e.preventDefault();
  if(this.player.score > this.player.highscore) {
    this.player = new Player(this.player.score)
  }
  else{
    this.player = new Player(this.player.highscore);
  }
  this.game = new Game();
  this.createHUD()
  this.createBoard()
}

handleLostLife() {
  this.player.loseLife()
  const numLives = document.getElementById("lives")
  numLives.innerHTML = "Lives: ";
  for(let i = 0; i < this.player.lives; i++) {
    numLives.innerHTML += '<img src = "https://restorationhemproject.org/wp-content/uploads/2018/07/heart-png-8.png">'
}
}

handleWinPoints() {
  let pointsToAdd = (this.timeLeft) - this.timer.usedTime;
  this.player.winPoints(pointsToAdd);
  let numPoints = document.getElementById("points")
  numPoints.innerHTML = this.player.score;
}

handleClick(e){
    e.preventDefault();
    if (e.key === "Enter") {
      document.getElementById("ui_enter").click();
      let wordToGuess = document.getElementById('ui');
      this.game.answer = wordToGuess.value
      this.endOfGame()}; 
}
}

function Countdown(seconds, view) {
  var that = {};

  that.elem = document.getElementById("timerdiv");
  that.seconds = seconds * 100;
  that.totalTime = seconds;
  that.usedTime = 0;
  that.startTime = +new Date();
  that.timer = null;
  that.elem.style.left = "33%"
  that.count = function() {
    that.usedTime = Math.floor((+new Date() - that.startTime) / 10);

    var tt = that.totalTime - that.usedTime;
    if (tt <= 0) {
      that.elem.innerHTML = '0';
      view.timeRemaining = false;
      view.endOfGame();
      clearInterval(that.timer);
    } 
    else {
      var ss = Math.floor(tt / 100) * 100;
      var ms = tt - Math.floor(tt / 100) * 100;
      
      that.elem.innerHTML = `${ss + ms}`;
    }
    if(tt < 100) {
      if(tt < 10) {that.elem.style.left = "45%"}
      else {that.elem.style.left = "40%"}
    } 
    else {
      that.elem.style.left = "32%"
    }
  };
  
  that.init = function() {
    if(that.timer){
      clearInterval(that.timer);
      that.totalTime = seconds * 100;
      that.usedTime = 0;
      that.startTime = +new Date();
      that.timer = null;
    }
  };

  that.start = function() {
    if(!that.timer){
       that.timer = setInterval(that.count, 10);
    }
  };

  that.stop = function() {
    if (that.timer) clearInterval(that.timer);
  };

  return that;
}

function Game() {
  this.word = this.getRandomWord()
}

Game.miniGames = [this.gameOne, this.gameTwo, this.gameThree]

// Array for now, will convert to object/dictionary in future
Game.STARTERWORDS = ["dog", "cat", "frog", "bongo"]


// Get 100 random words from API
Game.prototype.checkWord = function(){
  return this.word === this.answer
}

//Will get number based on what is passed in
// Could refer to random number for game or random number for dictionary
Game.prototype.getRandomWord = function() {
  let ranNum = Math.floor(Math.random() * Game.STARTERWORDS.length)
  return Game.STARTERWORDS[ranNum]
}

Game.prototype.isOver = function(player) {
  if(player.lives === 0) {
    return true
  }
  return false;
}

function LogIn() {
  document.getElementById()
}

document.addEventListener("DOMContentLoaded", () => {
  const g = new Game();
  const p1 = new Player();
  new View(p1, g)
});
