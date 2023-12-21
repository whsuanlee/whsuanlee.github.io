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

// let answer = Math.floor(Math.random()*100)+1;
// let minNum = 1, maxNum = 100;

// console.log(answer);

// $(document).ready(function(){
//     $(".pic-piggy-start").show;
//     $(".pic-piggy-full").hide;
//     $(".pic-piggy-eat").hide;
//     $(".pic-piggy-end").hide;

//     $(".clear").click(function(){
//         console.log("clear");
//         $(".input-guess").val("");

//     })

//     $(".submit").click(function(){
//         console.log("submit");
//         let inputNum = $(".input-guess").val()*1;
    
//         if(inputNum == answer)
//         {
//             $(".result").html("猜對了！");

//             $(".pic-piggy-start").hide;
//             $(".pic-piggy-full").show;
//             $(".pic-piggy-eat").hide;
//             $(".pic-piggy-end").hide;

//             setTimeout(function(){
//                 $(".pic-piggy-start").hide;
//                 $(".pic-piggy-full").hide;
//                 $(".pic-piggy-eat").hide;
//                 $(".pic-piggy-end").show;
//             }, 2100);            
//         }
//         else if(inputNum < answer && inputNum > 1)
//         {
//             minNum = inputNum;
//             $(".result").html("請輸入"+minNum+"~"+maxNum+"之間的數字");

//             $(".pic-piggy-start").hide;
//             $(".pic-piggy-full").hide;
//             $(".pic-piggy-eat").show;
//             $(".pic-piggy-end").hide;

//             setTimeout(function(){
//                 $(".pic-piggy-start").show;
//                 $(".pic-piggy-full").hide;
//                 $(".pic-piggy-eat").hide;
//                 $(".pic-piggy-end").hide;
//             }, 1200);
//         }
//         else if(inputNum > answer && inputNum < 101)
//         {
//             maxNum = inputNum;
//             $(".result").html("請輸入"+minNum+"~"+maxNum+"之間的數字");

//             $(".pic-piggy-start").hide;
//             $(".pic-piggy-full").hide;
//             $(".pic-piggy-eat").show;
//             $(".pic-piggy-end").hide;

//             setTimeout(function(){
//                 $(".pic-piggy-start").show;
//                 $(".pic-piggy-full").hide;
//                 $(".pic-piggy-eat").hide;
//                 $(".pic-piggy-end").hide;
//             }, 1200);
//         }
//         else 
//         {
//             $(".result").html("請輸入1~100之間的數字");

//             $(".pic-piggy-start").hide;
//             $(".pic-piggy-full").hide;
//             $(".pic-piggy-eat").show;
//             $(".pic-piggy-end").hide;

//             setTimeout(function(){
//                 $(".pic-piggy-start").show;
//                 $(".pic-piggy-full").hide;
//                 $(".pic-piggy-eat").hide;
//                 $(".pic-piggy-end").hide;
//             }, 1200);
//         }
//     })
    
//     $("#input-num-1").click(function(){
//         console.log("1");
//         $(".input-guess").val($(".input-guess").val()+"1");
//     })

//     $("#input-num-2").click(function(){
//         console.log("2");
//         $(".input-guess").val($(".input-guess").val()+"2");
//     })

//     $("#input-num-3").click(function(){
//         console.log("3");
//         $(".input-guess").val($(".input-guess").val()+"3");
//     })

//     $("#input-num-4").click(function(){
//         console.log("4");
//         $(".input-guess").val($(".input-guess").val()+"4");
//     })

//     $("#input-num-5").click(function(){
//         console.log("5");
//         $(".input-guess").val($(".input-guess").val()+"5");
//     })

//     $("#input-num-6").click(function(){
//         console.log("6");
//         $(".input-guess").val($(".input-guess").val()+"6");
//     })

//     $("#input-num-7").click(function(){
//         console.log("7");
//         $(".input-guess").val($(".input-guess").val()+"7");
//     })

//     $("#input-num-8").click(function(){
//         console.log("8");
//         $(".input-guess").val($(".input-guess").val()+"8");
//     })

//     $("#input-num-9").click(function(){
//         console.log("9");
//         $(".input-guess").val($(".input-guess").val()+"9");
//     })

//     $("#input-num-0").click(function(){
//         console.log("0");
//         $(".input-guess").val($(".input-guess").val()+"0");
//     })
// })
