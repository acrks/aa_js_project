function Game() {
    
}

// Game.miniGames = [this.gameOne, this.gameTwo, this.gameThree]

// Array for now, will convert to object/dictionary in future


Game.prototype.loseLife = function() {
    this.lives--;
    const numLives = document.getElementById("lives")
    numLives.innerHTML = ""
    for(let i = 0; i < this.lives; i++) {
        numLives.innerHTML += '<img src = "https://restorationhemproject.org/wp-content/uploads/2018/07/heart-png-8.png">'
    }
}
// Get 100 random words from API
// Game.prototype.constructMiniGame = function() {

// }

// Goes in a master file?
Game.prototype.run = function() {
    // Add in while function (isOver)
    if(!this.isOver()) {
        let game = new GameOne()
        if(game) {
            this.winPoints()
            
        }
        else {
            this.loseLife();
        }
    }
    this.run()
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

module.exports = Game;
