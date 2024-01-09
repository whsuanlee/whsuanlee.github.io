const startBtn = document.querySelector("#start_btn");
const showAnsBtn = document.querySelector("#show_answer_btn");
let answer;
startBtn.addEventListener('click', initGame);

showAnsBtn.addEventListener('click', () => {
    alert(`答案是：${answer}`);
})

function initGame() {
    answer = generateAns();
}

function generateAns() {
    const numArr = [0,1,2,3,4,5,6,7,8,9]
    numArr.sort(() => getRandomArbitrary(-1,1));
    return numArr.slice(0,4).join('') //string
}



function getRandomArbitrary(min, max) {

}

function showHint(msg ='') {
    gameMsgToast.querySelector
}