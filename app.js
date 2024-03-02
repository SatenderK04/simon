let userSeq = [];
let gameSeq = [];

let Buttons = ["btn1","btn2","btn3","btn4"];

let started = false;
let level = 0;
let highest = 0;

document.addEventListener("keypress", function(){
    if(started == false){
        started =  true;
        console.log("Game is started");
        levelUp();
    }
});

h2 = document.querySelector("h2");
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 150);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let rndIndx = Math.floor(Math.random() * 4);
    let rndColor = Buttons[rndIndx];
    let rndBtn = document.querySelector(`.${rndColor}`);  // accessing the random button.

    gameSeq.push(rndColor);
    console.log(gameSeq);
    btnFlash(rndBtn);
}

function checkSeq(idx){
    // let idx = level - 1;
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length)
            setTimeout(levelUp, 800);
    }
    else{
        h2.innerHTML = `<b style="color: red"> Game Over! </b> <b style="color:orange">Your score was ${level}</b> <br>Press any key to start again.`;
        h3 = document.querySelector("h3");
        
        if(level > highest){
            highest = level;
            let highScore = document.createElement("h3");
            highScore.innerText = `Highest Score: ${highest}`;

            let previousHighScore = document.querySelector(".high-score");
            if (previousHighScore) {
                document.body.removeChild(previousHighScore);
            }
            highScore.classList.add("high-score");
            document.body.appendChild(highScore);
            // h3.appendChild(highScore);
        }
        
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "rgb(82, 102, 134)";
        }, 200);
        gameReset();
    }
}

function userPressBtn(){
    let btn = this;
    btnFlash(btn);
    let userColor = btn.classList[1]; 
    console.log(userColor);
    userSeq.push(userColor);
    checkSeq(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns){
    btn.addEventListener("click", userPressBtn);
}

function gameReset(){
    userSeq = [];
    gameSeq = [];
    level = 0;
    started = false;
}