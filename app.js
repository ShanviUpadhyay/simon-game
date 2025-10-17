let gameSeq = [];
let userSeq = [];
let level = 0;
let hs = document.querySelector("h3");

let btns = ["red", "green", "yellow", "purple"];

let started = false;

let h2 = document.querySelector("h2");


document.addEventListener("keypress", function(event) {
  if (started == false) {
    console.log("Game started");
    started = true; 
    levelUp(); 
  }
});

function gameFlash(btn){
  btn.classList.add("flash");
  setTimeout(function(){
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn){
  btn.classList.add("flash");
  setTimeout(function(){
    btn.classList.remove("flash");
  }, 250);
}

function levelUp(){
  userSeq = [];
  level++;
  h2.innerText= `Level ${level}`;
  let randIdx= Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

let highestScore = localStorage.getItem("highScore") || 0;
hs.innerText = "High Score: " + highestScore;

// Update and save high score if player beats it
function highScore(level) {
  if (level > highestScore) {
    highestScore = level;
    localStorage.setItem("highScore", highestScore); // save
  }
  hs.innerText = "High Score: " + highestScore;
}
   

function checkAns(idx){
  if(userSeq[idx] === gameSeq[idx]){
    if(userSeq.length == gameSeq.length){
        setTimeout(levelUp, 1000);
    }
  }else{
    h2.innerHTML= `GameOver! Your score was <b>${level}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor="red";
      setTimeout(function(){
      document.querySelector("body").style.backgroundColor="white";
    },150);
    highScore(level);
    reset();
  }
}

function btnPressed(){
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
  btn.addEventListener("click", btnPressed);
}

function reset(){
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
