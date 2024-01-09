const inputGuess = document.querySelector(".input-guess");
const result = document.querySelector(".result");
const submit = document.querySelector(".submit");
const clear = document.querySelector(".clear");
const ans = document.querySelector("#input-ans");
const again = document.querySelector("#input-again");
const piggyStart = document.querySelector(".pic-piggy-start");
const piggyEat = document.querySelector(".pic-piggy-eat");
const piggyFull = document.querySelector(".pic-piggy-full");
const piggyEnd = document.querySelector(".pic-piggy-end");

let saveNum = "";

function handleButtonClick(e) {
  saveNum = inputGuess.value;
  const btnNum = saveNum + e.target.textContent;
  inputGuess.value = btnNum;
}

for (let i = 0; i <= 9; i++) {
  const btn = document.querySelector(`#input-num-${i}`);
  btn.addEventListener("click", handleButtonClick);
}

clear.addEventListener("click", () => {
    inputGuess.value = "";
  });

let answer;
let guessValue;
let minNum =1;
let maxNum = 100;

function randomNumber(){
    answer = Math.floor(Math.random()*100) + 1;
}

randomNumber();

ans.addEventListener('click',() =>{
    result.textContent=`答案是${answer}`;
})

document.addEventListener('DOMContentLoaded', function() {
    piggyStart.style.display = 'block';
    piggyEat.style.display = 'none';
    piggyFull.style.display = 'none';
    piggyEnd.style.display = 'none';
});

again.addEventListener('click', () => {
    randomNumber();
    answer = Math.floor(Math.random()*100) + 1;
    minNum = 1; 
    maxNum = 100;
    result.textContent = "請輸入1~100之間的數字";
    inputGuess.value = "";

    piggyStart.style.display = 'block';
    piggyEat.style.display = 'none';
    piggyFull.style.display = 'none';
    piggyEnd.style.display = 'none';
});

submit.addEventListener('click', () => {
    guessValue = parseInt(inputGuess.value);

if (guessValue < answer && guessValue >= minNum && guessValue <= maxNum) {
    minNum = guessValue;
    result.textContent = `請輸入${minNum}~${maxNum}之間的數字！`;
    inputGuess.value = "";

    piggyStart.style.display = 'none';
    piggyEat.style.display = 'block';
    piggyFull.style.display = 'none';
    piggyEnd.style.display = 'none';

    setTimeout(function () {
        piggyStart.style.display = 'block';
        piggyEat.style.display = 'none';
        piggyFull.style.display = 'none';
        piggyEnd.style.display = 'none';
    }, 1150);
}

else if (guessValue > answer && guessValue >= minNum && guessValue <= maxNum){
    maxNum = guessValue;
    result.textContent = `請輸入${minNum}~${maxNum}之間的數字！`;
    inputGuess.value = "";

    piggyStart.style.display = 'none';
    piggyEat.style.display = 'block';
    piggyFull.style.display = 'none';
    piggyEnd.style.display = 'none';

    setTimeout(function () {
        piggyStart.style.display = 'block';
        piggyEat.style.display = 'none';
        piggyFull.style.display = 'none';
        piggyEnd.style.display = 'none';
    }, 1150);
}

else if (guessValue === answer && guessValue >= minNum && guessValue <= maxNum){
    result.textContent = `恭喜猜對了！`;

    piggyStart.style.display = 'none';
    piggyEat.style.display = 'none';
    piggyFull.style.display = 'block';
    piggyEnd.style.display = 'none';

    setTimeout(function () {
        piggyStart.style.display = 'none';
        piggyEat.style.display = 'none';
        piggyFull.style.display = 'none';
        piggyEnd.style.display = 'block';
    }, 1850);

}
else {
    alert(`請输入 ${minNum} ～ ${maxNum} 之間的數字！`);
    inputGuess.value = "";
}
})

