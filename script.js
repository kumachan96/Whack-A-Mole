// console.log(`Hello World 😊 `);

const playButton = document.getElementById("play-btn");
const mainScreen = document.getElementById("main-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");

playButton.addEventListener("click",startGame,false);

function startGame() {
    console.log(`Game started`);
    mainScreen.classList.add("hide");
    gameScreen.classList.remove("hide");
}