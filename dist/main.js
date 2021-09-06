/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module) => {

eval("function Game() {\n    \n}\n\n// Game.miniGames = [this.gameOne, this.gameTwo, this.gameThree]\n\n// Array for now, will convert to object/dictionary in future\n\n\nGame.prototype.loseLife = function() {\n    this.lives--;\n    const numLives = document.getElementById(\"lives\")\n    numLives.innerHTML = \"\"\n    for(let i = 0; i < this.lives; i++) {\n        numLives.innerHTML += '<img src = \"https://restorationhemproject.org/wp-content/uploads/2018/07/heart-png-8.png\">'\n    }\n}\n// Get 100 random words from API\n// Game.prototype.constructMiniGame = function() {\n\n// }\n\n// Goes in a master file?\nGame.prototype.run = function() {\n    // Add in while function (isOver)\n    if(!this.isOver()) {\n        let game = new GameOne()\n        if(game) {\n            this.winPoints()\n            \n        }\n        else {\n            this.loseLife();\n        }\n    }\n    this.run()\n    // Choose from games\n    // if the game comes back \n}\n\n//Will get number based on what is passed in\n// Could refer to random number for game or random number for dictionary\nGame.prototype.getRandomNumber = function(argNum) {\n    return Math.floor(Math.random() * argNum)\n}\n\nGame.prototype.isOver = function() {\n    if(this.lives === 0) {\n        const playerSpace = getElementById(\"userInput\") \n        playerSpace.innerHTML = \"You have zero lives :( <br> Play again?\"\n    }\n}\n\nGame.prototype.winPoints = function () {\n    this.points++;\n    const numPoints = document.getElementById(\"points\")\n    numPoints.innerHTML = this.points;\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst View = __webpack_require__(/*! ./view */ \"./src/view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const newGame = new Game();\n    const el = document.getElementById(\"wordToType\")\n    new View(newGame, el);\n  });\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ (() => {

eval("function View(game, el) {\n    this.lives = 3;\n    this.points = 0;\n    const numLives = document.getElementById(\"lives\")\n    for(let i = 0; i < this.lives; i++) {\n        numLives.innerHTML += '<img src = \"https://restorationhemproject.org/wp-content/uploads/2018/07/heart-png-8.png\">'\n    }\n    const numPoints = document.getElementById(\"points\")\n    numPoints.innerHTML = this.points;\n\n\n      this.game = game;\n      this.el = el;\n      // bind the context for the 'handleClick' function\n      this.handleClick = this.handleClick.bind(this)\n      this.bindEvents()\n    }\n\nView.prototype.bindEvents = function() {\n    // Install an enter listener on the board\n    this.el.addEventListener(\"keypress\", function(event) {\n        if (event.key === 'Enter') {\n            document.getElementById(\"ui_enter\").click();\n            if(this.el.value===wordToSpell) {\n                return true\n            }\n            else {\n                return false;\n            }\n          }\n    })\n  }\n\nView.prototype.handleEnter = function(e){\n    // wordToGuess.addEventListener(\"keyup\", function(event) {\n    //     event.preventDefault();\n    //     if (event.key === \"Enter\") {\n            \n    //     }\n    // }); \n    const el = e.target\n    // Only makeMove if the event target is an li\n    if (el.key === \"Enter\") {\n      this.makeMove(el.value)\n    }\n  }\n\nView.prototype.checkWord = function(el) {\n    document.getElementById(\"ui_enter\").click();\n            if(el===wordToSpell) {\n                return true\n            }\n            else {\n                return false;\n            }\n}\n\n//# sourceURL=webpack:///./src/view.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;