function View() {
    this.lives = 3;
    this.points = 0;
    const numLives = document.getElementById("lives")
    for(let i = 0; i < this.lives; i++) {
        numLives.innerHTML += '<img src = "https://restorationhemproject.org/wp-content/uploads/2018/07/heart-png-8.png">'
    }
    const numPoints = document.getElementById("points")
    numPoints.innerHTML = this.points;
}