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
  this.exitGame = this.exitGame.bind(this)
  this.dictionarr = []
  this.populateDictionary()
  this.createHUD()
  this.createBoard()
  this.bindEvents()
}

populateDictionary() {
  let that = this;
  let alphabet = "abcdefghijklmnopqrstuvwxyz"
  for(let i = 0; i < 100; i++) {
    $.ajax({
        type: 'GET',
        url: "https://random-words-api.vercel.app/word",
        success(data) {
          let outcome = true;
          let result = data[0].word.toLowerCase()
          for(let i = 0; i < result.length; i++) {
            if(!alphabet.includes(result[i])) {
              outcome = false
            }
          }
          if(outcome) {
            that.dictionarr.push(result)
          }        
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
  this.exit = document.getElementsByClassName("exitGame")[0]
  this.timeLeft = 7;
  this.timeRemaining = true;  
  const numLives = document.getElementById("lives")
  numLives.innerHTML = "Lives: ";
  for(let i = 0; i < this.player.lives; i++) {
    numLives.innerHTML += '<img src = "https://raw.githubusercontent.com/acrks/aa_js_project/main/pixel-heart-2779422_960_720.png">'
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
  const ui = document.getElementById("ui")
  ui.focus()
  this.game.word = this.dictionarr.shift()
 document.getElementById("ui").value = null;
 if(this.game.word === undefined || this.player.score === 0) 
 {this.timeLeft = 700
  this.game.word = Game.STARTERWORDS[Math.floor(Math.random()*Game.STARTERWORDS.length)]}
 else {
  this.timeLeft = this.randomTimeForTimer(this.game.word.length, this.game.word.length - 5);
 }
 document.getElementById("wordToType").innerHTML = `${this.game.word}` 
 this.timer = new Countdown(this.timeLeft, this)
  this.timer.start()
}

bindEvents() {
  // Install a click listener on the board
  this.el.addEventListener("keyup", this.handleClick)
  this.reset.addEventListener("click", this.newGame)
  this.exit.addEventListener("click", this.exitGame)
}

exitGame() {
  const goodbye = document.getElementById("play_again")
  goodbye.innerHTML = `<h2><span id = "h1p2">Hate to see you go!</span><br><span id = "h1p1">Your highscore for this session was</span><br><span id = "h1p3">${this.player.highscore}</span></h2>`
  return
}

randomTimeForTimer(max, min) {
  return Math.floor(Math.random() * (max - min) + min) * 100
}

endOfGame() {
  this.timer.stop()
  let outcome = false;
  this.lowerMainMusic()
  if(this.timeRemaining && this.game.checkWord()) {
    outcome = true;
    if(myAudio.currentTime > 0 && myAudio.volume > 0) {
      myWinAudio.play()
    }
    this.handleWinPoints();
  }
  else {
    this.handleLostLife();
    if(this.game.isOver(this.player)) {
      if(myAudio.currentTime > 0 && myAudio.volume > 0) {
        myGameOverAudio.play()
      }
      this.initiateShutdown();
      return
    }
    else {
      if(myAudio.currentTime > 0 && myAudio.volume > 0) {
        myLoseAudio.play()
      }
    }
  }
  this.timeRemaining = true
  this.game = new Game();
  this.displayMessage(outcome)
  setTimeout(this.createBoard, 5000)
}

lowerMainMusic() {
  if(myAudio.volume > 0) {
  myAudio.volume = 0.1
  setTimeout(function () {
    myAudio.volume = 0.5
  }, 2500)
  }
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
    ui.style.display = "initial"
    messagebox.style.display = "none"
    word.style.display = "initial"
    ui.focus()
  }, 5000)
  timer.style.zoom = 0.5;
  game.style.zoom = 0.5;
  ui.style.display = "none"
  messagebox.style.display = "flex"
  word.style.display = "none"
  if(won) {
    if(pointsToAdd === 1) {
      messagebox.innerHTML = `YOU WON ${pointsToAdd} POINT.<br>GET READY FOR THE NEXT ROUND!`
    }
    else {
      messagebox.innerHTML = `YOU WON ${pointsToAdd} POINTS.<br>GET READY FOR THE NEXT ROUND!`
    }
  }
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
  this.player = new Player(this.player.highscore);
  this.game = new Game();
  this.createHUD()
  this.createBoard()
}

handleLostLife() {
  this.player.loseLife()
  const numLives = document.getElementById("lives")
  numLives.innerHTML = "Lives: ";
  for(let i = 0; i < this.player.lives; i++) {
    numLives.innerHTML += '<img src = "https://raw.githubusercontent.com/acrks/aa_js_project/main/pixel-heart-2779422_960_720.png">'
  }
}

handleWinPoints() {
  let pointsToAdd = (this.timeLeft) - this.timer.usedTime;
  this.player.winPoints(pointsToAdd);
  if(this.player.score > this.player.highscore) {
    this.player.highscore = this.player.score
  }
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
  if(player.lives <= 0) {
    return true
  }
  return false;
}

function LogIn() {
  document.getElementById()
}

function handleAudio() {
  if(myAudio.currentTime === 0) {
    myAudio.play()
    myAudio.volume = 0
  }
  const music = document.getElementById("music_buttons")
  if(myAudio.volume === 0) {
    myAudio.volume = 0.5;
    music.style.backgroundImage = "url(https://raw.githubusercontent.com/acrks/aa_js_project/main/audio_off.png)"
  }
  else {
    myGameOverAudio.volume = 0;
    myLoseAudio.volume = 0;
    myWinAudio.volume = 0;
    myAudio.volume = 0;
    music.style.backgroundImage = "url(https://raw.githubusercontent.com/acrks/aa_js_project/main/audio_on.png)"
  }
}

function startGame() {
  const main = document.getElementById("main_container")
  const foot = document.getElementById("footer")
  foot.style.display = "flex"
  main.style.display = "initial"
  const startbox = document.getElementById("body")
  startbox.style.display = "none"
  const g = new Game();
  const p1 = new Player();
  new View(p1, g)
}

function loadPage() {
  loadMusic()
  const music = document.getElementById("music_buttons")
  music.addEventListener("click", handleAudio)
  const start = document.getElementById("startbox")
  start.addEventListener("click", startGame)
}

function loadMusic() {
  myAudio = new Audio('https://raw.githubusercontent.com/acrks/aa_js_project/main/bgmusic.mp3')
  myWinAudio = new Audio('https://raw.githubusercontent.com/acrks/aa_js_project/main/win_music.mp3')
  myLoseAudio = new Audio('https://raw.githubusercontent.com/acrks/aa_js_project/main/lose_music.mp3')
  myGameOverAudio = new Audio('https://raw.githubusercontent.com/acrks/aa_js_project/main/gameover.mp3')
  myWinAudio.volume = 0.5
  myLoseAudio.volume = 0.5
  myGameOverAudio.volume = 0.5
}

loadPage()




