function View(game, el) {
    this.lives = 3;
    this.points = 0;
    const numLives = document.getElementById("lives")
    for(let i = 0; i < this.lives; i++) {
        numLives.innerHTML += '<img src = "https://restorationhemproject.org/wp-content/uploads/2018/07/heart-png-8.png">'
    }
    const numPoints = document.getElementById("points")
    numPoints.innerHTML = this.points;


      this.game = game;
      this.el = el;
      // bind the context for the 'handleClick' function
      this.handleClick = this.handleClick.bind(this)
      this.bindEvents()
    }

View.prototype.bindEvents = function() {
    // Install an enter listener on the board
    this.el.addEventListener("keypress", function(event) {
        if (event.key === 'Enter') {
            document.getElementById("ui_enter").click();
            if(this.el.value===wordToSpell) {
                return true
            }
            else {
                return false;
            }
          }
    })
  }

View.prototype.handleEnter = function(e){
    // wordToGuess.addEventListener("keyup", function(event) {
    //     event.preventDefault();
    //     if (event.key === "Enter") {
            
    //     }
    // }); 
    const el = e.target
    // Only makeMove if the event target is an li
    if (el.key === "Enter") {
      this.makeMove(el.value)
    }
  }

View.prototype.checkWord = function(el) {
    document.getElementById("ui_enter").click();
            if(el===wordToSpell) {
                return true
            }
            else {
                return false;
            }
}