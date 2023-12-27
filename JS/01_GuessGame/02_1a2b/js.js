document.addEventListener("DOMContentLoaded", ()=> {
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    const showAnswerBtn = document.getElementById('showAnswerBtn');
    const guessBtn = document.getElementById('guessButton');
    const historyList = document.getElementById('historyList');
    const guessInput = document.querySelector('.input-group input');

    let answer = generateAnswer();
    let attempts = [];
    //生成遊戲
    function generateAnswer() {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          let answerArr = [];

          for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * digits.length);
            answerArr.push(digits[randomIndex]);
            digits.splice(randomIndex, 1);
          }

          return answerArr.join('');
    }

    //遊戲開始
    function startGame() {
        answer = generateAnswer();
        attempts = [];
        historyList.innerHTML = '<li class="list-group-item disabled" aria-disabled="true">歷程</li>';
        guessInput.value = '';
      }

      // 重新開始
      function restartGame() {
        startGame();
      }
      

      //看答案
      function showAnswer() {
        alert(`答案是：${answer}`);
      }

      //檢查輸入值是否符合答案
      function checkGuess() {
        const guess = guessInput.value;
        if (guess.length !== 4 || !isValidNumber(guess)) {
          alert('請輸入四個不重複的數字！');
          return;
        }

        const result = compareGuess(guess);
        attempts.push({ guess, result });

        displayHistory();
        if (result === '4A0B') {
          alert('恭喜你猜對了！');
          startGame();
        }
      }

      function compareGuess(guess) {
        let bulls = 0;
        let cows = 0;

        for (let i = 0; i < 4; i++) {
          if (guess[i] === answer[i]) {
            bulls++;
          } else if (answer.includes(guess[i])) {
            cows++;
          }
        }

        return `${bulls}A${cows}B`;
      }

      function isValidNumber(num) {
        return /^\d{4}$/.test(num) && new Set(num).size === 4;
        
      }
      //歷程
      function displayHistory() {
        const lastAttempt = attempts[attempts.length - 1];
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `${lastAttempt.guess} - ${lastAttempt.result}`;
        historyList.appendChild(listItem);
      }

      startBtn.addEventListener('click', startGame);
      restartBtn.addEventListener('click', restartGame);
      showAnswerBtn.addEventListener('click', showAnswer);
      guessBtn.addEventListener('click', checkGuess);

});