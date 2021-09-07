class Player {
  constructor(){
    this.lives = 3
    this.points = 0
  }

  loseLife() {
    this.lives--;
  }

  winPoints() {
    this.points++;
  }
}

class View {
 constructor(player, game, el) {
   this.player = player;
   this.game = game;
   this.el = el;
  this.handleClick = this.handleClick.bind(this)
  this.setupBoard()
  this.bindEvents()
  
}

setupBoard() {
 // Display lives
 const numLives = document.getElementById("lives")
 numLives.innerHTML = "";
 for(let i = 0; i < this.player.lives; i++) {
     numLives.innerHTML += '<img src = "https://restorationhemproject.org/wp-content/uploads/2018/07/heart-png-8.png">'
 }
 // Display points
 const numPoints = document.getElementById("points")
 numPoints.innerHTML = this.player.points;
 // Display word
 document.getElementById("wordToType").innerHTML = `${this.game.word}`
}

bindEvents() {
  // Install a click listener on the board
  this.el.addEventListener("keyup", this.handleClick)
}

handleLostLife() {
  this.player.loseLife()
  const numLives = document.getElementById("lives")
  numLives.innerHTML = ""
  for(let i = 0; i < this.player.lives; i++) {
      numLives.innerHTML += '<img src = "https://restorationhemproject.org/wp-content/uploads/2018/07/heart-png-8.png">'
  }
}

handleWinPoints() {
  this.player.winPoints();
  let numPoints = document.getElementById("points")
  numPoints.innerHTML = this.player.points;
}

handleClick(e){
  {
    e.preventDefault();
    if (e.key === "Enter") {
      document.getElementById("ui_enter").click();
      let wordToGuess = document.getElementById('ui');
      this.game.answer = wordToGuess.value
      if(this.game.checkWord()) {
        this.handleWinPoints();
      }
      else {
        this.handleLostLife();
      };
      this.game = new Game();
      this.resetPage()
    }
  };
}

resetPage() {
   // Display lives
  const numLives = document.getElementById("lives")
  numLives.innerHTML = "";
  for(let i = 0; i < this.player.lives; i++) {
    numLives.innerHTML += '<img src = "https://restorationhemproject.org/wp-content/uploads/2018/07/heart-png-8.png">'
  }
 // Display points
  const numPoints = document.getElementById("points")
  numPoints.innerHTML = this.player.points;
 // Display word
  document.getElementById("wordToType").innerHTML = `${this.game.word}`
  document.getElementById("ui").value = null;
}
}

function Game() {
  this.word = this.getRandomWord()
}

Game.miniGames = [this.gameOne, this.gameTwo, this.gameThree]

// Array for now, will convert to object/dictionary in future
Game.STARTERWORDS = ["dog", "cat", "frog", "bongo"]


// Get 100 random words from API
Game.prototype.constructMiniGame = function() {

}

Game.prototype.checkWord = function(){
  return this.word === this.answer
}

//Will get number based on what is passed in
// Could refer to random number for game or random number for dictionary
Game.prototype.getRandomWord = function() {
  let ranNum = Math.floor(Math.random() * Game.STARTERWORDS.length)
  return Game.STARTERWORDS[ranNum]
}

Game.prototype.isOver = function() {
  if(this.lives === 0) {
      const playerSpace = document.getElementById("userInput") 
      playerSpace.innerHTML = "You have zero lives :( <br> Play again?"
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const g = new Game();
  const el = document.getElementById('ui');
  const p1 = new Player();
  new View(p1, g, el)
});
