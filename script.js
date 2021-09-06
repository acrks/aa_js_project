function Game() {
    this.lives = 3;
    this.points = 0;
    const numLives = document.getElementById("lives")
    for(let i = 0; i < this.lives; i++) {
        numLives.innerHTML += '<img src = "https://restorationhemproject.org/wp-content/uploads/2018/07/heart-png-8.png">'
    }
    const numPoints = document.getElementById("points")
    numPoints.innerHTML = this.points;
}

Game.miniGames = [this.gameOne, this.gameTwo, this.gameThree]

Game.prototype.gameOne = function(wordToSpell) {
    let wordToGuess = document.getElementById('ui');
    const wordToType = document.getElementById("wordToType")
    wordToType.innerHTML = `${wordToSpell}`
    let that = this;
    wordToGuess.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === "Enter") {
            document.getElementById("ui_enter").click();
            if(wordToGuess.value===wordToSpell) {
                that.winPoints();
            }
            else {
                that.loseLife();
            }
        }
    }); 
}

// Array for now, will convert to object/dictionary in future
Game.STARTERWORDS = ["dog", "cat", "frog", "bongo"]

Game.prototype.loseLife = function() {
    this.lives--;
    const numLives = document.getElementById("lives")
    numLives.innerHTML = ""
    for(let i = 0; i < this.lives; i++) {
        numLives.innerHTML += '<img src = "https://restorationhemproject.org/wp-content/uploads/2018/07/heart-png-8.png">'
    }
}
// Get 100 random words from API
Game.prototype.constructMiniGame = function() {

}

Game.prototype.startGame = function() {
    let that = this;
    setTimeout(that.playLoop(), 10000)

}

// Build visual aid (definition/word type/picture?/)
Game.prototype.buildVisualAid = function() {
    
}

// Goes in a master file?
Game.prototype.playLoop = function() {
    // Add in while function (isOver)
    while(!this.isOver()) {

        let ranNum = this.getRandomNumber(Game.STARTERWORDS.length)
        this.gameOne(Game.STARTERWORDS[ranNum])
    }
    // Choose from games
    // if the game comes back 
}

//Will get number based on what is passed in
// Could refer to random number for game or random number for dictionary
Game.prototype.getRandomNumber = function(argNum) {
    return Math.floor(Math.random() * argNum)
}

Game.prototype.isOver = function() {
    if(this.lives === 0) {
        const playerSpace = getElementById("userInput") 
        playerSpace.innerHTML = "You have zero lives :( <br> Play again?"
    }
}

Game.prototype.winPoints = function () {
    this.points++;
    const numPoints = document.getElementById("points")
    numPoints.innerHTML = this.points;
}

let g = new Game();

let randy = g.getRandomNumber(Game.STARTERWORDS.length)

g.gameOne(Game.STARTERWORDS[randy])
