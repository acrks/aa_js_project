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
  this.populateDictionary = this.populateDictionary.bind(this)
  this.displayMessage = this.displayMessage.bind(this)
  this.dictionarr = []
  this.populateDictionary()
  this.createHUD()
  this.createBoard()
  this.bindEvents()
}

populateDictionary() {
  let that = this;
  for(let i = 0; i < 100; i++) {
    $.ajax({
        type: 'GET',
        url: "https://random-words-api.vercel.app/word",
        success(data) {
          let result = data[0].word
          // console.log(data[0].word);
          // console.log(data[0].definition);          
          that.dictionarr.push(result.toLowerCase())
        },
        error() {
          console.error("An error occurred.");
        },
     });
    }
}

createHUD() {
  this.el = document.getElementById('ui');
  this.reset = document.getElementsByClassName("restartGame")[0]
  this.timeLeft = 7;
  this.timeRemaining = true;  
  const numLives = document.getElementById("lives")
  numLives.innerHTML = "Lives: ";
  for(let i = 0; i < this.player.lives; i++) {
    numLives.innerHTML += '<img src = "https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_960_720.png">'
  }
  const numPoints = document.getElementById("points")
  numPoints.innerHTML = this.player.score;
  if(this.player.highscore !== 0) {
    const hs = document.getElementById("highscore")
    hs.style.display = "initial"
    hs.innerText = `High Score: ${this.player.highscore}`
  }
}

createBoard() {
 // Display lives
 if(document.getElementById("play_again").style.display === "initial") {
  document.getElementById("wordToType").style.display = "initial" 
  document.getElementById("userInput").style.display = "flex"
   document.getElementById("play_again").style.display = "none"
   document.getElementById("timercontainer").style.display = "initial"
  }
  this.game.word = this.dictionarr.shift()
 document.getElementById("ui").value = null;
 if(this.game.word === undefined || this.player.score === 0) 
 {this.timeLeft = 700
  this.game.word = Game.STARTERWORDS[Math.floor(Math.random()*Game.STARTERWORDS.length)]}
 else {
  this.timeLeft = this.randomTimeForTimer(this.game.word.length + 2, this.game.word.length - 3);
 }
 document.getElementById("wordToType").innerHTML = `${this.game.word}` 
 this.timer = new Countdown(this.timeLeft, this)
  this.timer.start()
}

bindEvents() {
  // Install a click listener on the board
  this.el.addEventListener("keyup", this.handleClick)
  this.reset.addEventListener("click", this.newGame)
}

randomTimeForTimer(max, min) {
  return Math.floor(Math.random() * (max - min) + min) * 100
}

endOfGame() {
  this.timer.stop()
  let outcome = false;
  if(this.timeRemaining && this.game.checkWord()) {
    outcome = true;
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
  this.displayMessage(outcome)
  setTimeout(this.createBoard, 5000)
}

displayMessage(won) {
  let pointsToAdd = (this.timeLeft) - this.timer.usedTime
  const game = document.getElementById("game_container")
  const timer = document.getElementById("timerdiv")
  const ui = document.getElementById("ui")
  const messagebox = document.getElementById("message")
  const word = document.getElementById("wordToType")
  setTimeout(function() {
    timer.style.zoom = 1;
    game.style.zoom = 1;
    ui.style.width = "40%"
    messagebox.style.display = "none"
    word.style.display = "initial"
  }, 5000)
  timer.style.zoom = 0.5;
  game.style.zoom = 0.5;
  ui.style.width = "10%";
  messagebox.style.display = "flex"
  word.style.display = "none"
  if(won) {
    messagebox.innerHTML = `YOU ${pointsToAdd} POINTS.<br>GET READY FOR THE NEXT ROUND!`}
  else {
    messagebox.innerHTML = `YOU LOST A LIFE!<br>BE CAREFUL, YOU ONLY HAVE ${this.player.lives} LEFT`
  }
}

initiateShutdown() {
  document.getElementById("lives").innerHTML = "You have no lives left :("
  document.getElementById("timercontainer").style.display = "none"
  document.getElementById("wordToType").style.display = "none"
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
    numLives.innerHTML += '<img src = "/Users/aic/Desktop/Coding/aa_js_project/pixel-heart-2779422_960_720.png">'
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
      this.game.answer = wordToGuess.value;
      this.endOfGame()
    }; 
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
      if(tt < 10) {that.elem.style.left = "49%"}
      else {that.elem.style.left = "48%"}
    } 
    else {
      that.elem.style.left = "46%"
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
  // this.word = this.getRandomWord()
}

Game.miniGames = [this.gameOne, this.gameTwo, this.gameThree]

// Array for now, will convert to object/dictionary in future
Game.STARTERWORDS = ["across","against","answer","awhile","between","board","bottom","breakfast","broken","build","building","built","captain","carried","caught","charge","chicken","circus","cities","clothes","company","country","discover","doctor","dollar","during","eighth","enjoy","enough","everybody","example","except","excuse","field","fifth","finish","following","group","happened","harden","heavy","held","hospital","idea","instead","known","laugh","middle","minute","mountain","ninth","ocean","office","parent","peanut","pencil","picnic","police","pretty","prize","quite","radio","raise","really","reason","remember","scare","second","since","slowly","stories","student","sudden","suit","sure","swimming","though","threw","tired","together","tomorrow","toward","tried","trouble","truly","turtle","until","village","visit","wear","whole","whose","women","writing","written","wrote","yell","young"]

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

function startGame() {
  const main = document.getElementById("main_container")
  main.style.display = "initial"
  const startbox = document.getElementById("body")
  startbox.style.display = "none"
  const g = new Game();
  const p1 = new Player();
  new View(p1, g)
}

const start = document.getElementById("startbox")
start.addEventListener("click", startGame)




