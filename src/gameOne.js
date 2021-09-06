const Game = require("./game");

GameOne.STARTERWORDS = ["dog", "cat", "frog", "bongo"]

class GameOne {
    constructor() {
        let wordToSpell = this.getRandomWord();
        const wordToType = document.getElementById("wordToType")
        wordToType.innerHTML = `${wordToSpell}`
    }

}

Game.prototype.getRandomWord = function() {
    let num = Math.floor(Math.random() * GameOne.STARTERWORDS.length)
    return GameOne.STARTERWORDS[num]
}

Game.prototype.gameOne = function() {

}