const Game = require("./game");
const View = require("./view");

document.addEventListener("DOMContentLoaded", () => {
    const newGame = new Game();
    const el = document.getElementById("wordToType")
    new View(newGame, el);
  });