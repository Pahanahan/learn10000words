import arr from "./words.js";

let wordsArr = [];
let wordsArrOnlyName = [];

for (let i = 0; i < arr.length; i++) {
  wordsArrOnlyName.push(arr[i].word.name);
}

let learnedWordsArr = [];
let sum;
sum = wordsArr.length + learnedWordsArr.length;
let newWords;

if (localStorage.getItem("wordsArr")) {
  wordsArr = JSON.parse(localStorage.getItem("wordsArr"));
  learnedWordsArr = JSON.parse(localStorage.getItem("learnedWordsArr"));
  sum = wordsArr.length + learnedWordsArr.length;
  if (sum < arr.length) {
    newWords = arr.slice(sum, arr.length);
    wordsArr.push(newWords);
    wordsArr = wordsArr.flat();
  }
} else {
  wordsArr = arr;
}

let mainStartBox = document.querySelector(".main-start__box");
let mainEndBox = document.querySelector(".main-end__box");
let start = document.querySelector(".main__start");
let mainBoxInput = document.querySelector(".main__box-input");
let mainBox2 = document.querySelector(".main__box2");
let mainLearned = document.querySelector(".main-learned");
let mainLearnedBtn = document.querySelector(".main-learned__show");
let mainLearnedList = document.querySelector(".main-learned__list");
let mainForm = document.querySelector(".main__box-form");

let allCurrentAnswers = 0;
let currentRightAnswers = 0;
let currentWrongAnswers = 0;

let randomNumber = Math.floor(Math.random() * 20);

start.addEventListener("click", addBox);
mainLearnedBtn.addEventListener("click", renderLearnedWords);

mainBoxInput.focus();

function addBox() {
  mainBoxInput.value = "";

  let wordsFromArr = [wordsArr[randomNumber].word.name];

  let addText = document.querySelector("#word");
  addText.textContent = wordsFromArr;

  mainForm.addEventListener("submit", checkAnswer);
}

function checkAnswer(event) {
  event.preventDefault();

  let mainBoxInput = document.querySelector(".main__box-input");

  let rightAnswer = [];

  for (let i = 0; i < wordsArr[randomNumber].word.translate.length; i++) {
    rightAnswer.push(wordsArr[randomNumber].word.translate[i]);
  }

  let someRightAnswers = rightAnswer.join(", ");

  let rightHTML = document.querySelector(".main__box2");
  let rightHTML2 = document.querySelector(".main__box3");

  let check = 0;

  let lowerCase = mainBoxInput.value.toLowerCase();

  for (let i = 0; i < rightAnswer.length; i++) {
    if (rightAnswer[i].toString() == lowerCase.trim()) {
      check++;
    } else {
      check += 0;
    }
  }

  if (check > 0) {
    rightHTML.textContent = `Правильный ответ`;
    rightHTML.classList.add("green");
    rightHTML.classList.remove("red");
    rightHTML2.textContent = `Возможные ответы: (${someRightAnswers})`;
    rightHTML2.classList.add("green");
    rightHTML2.classList.remove("red");

    currentRightAnswers++;
    allCurrentAnswers++;
    wordsArr[randomNumber].num += 10;
    wordsArr[randomNumber].memory += 1;
  } else {
    rightHTML.textContent = `Не правильный ответ`;
    rightHTML.classList.add("red");
    rightHTML.classList.remove("green");
    rightHTML2.textContent = `Возможные ответы: (${someRightAnswers})`;
    rightHTML2.classList.add("red");
    rightHTML2.classList.remove("green");

    currentWrongAnswers++;
    allCurrentAnswers++;
    wordsArr[randomNumber].num -= 10;
    wordsArr[randomNumber].memory -= 1;
  }

  randomNumber = Math.floor(Math.random() * 20);

  if (allCurrentAnswers === 10) {
    let numberOfRightAnswers = document.querySelector("#all-current-answers");
    // numberOfRightAnswers.textContent = `Вы ответили правильно ${currentRightAnswers} раз и не правильно ${currentWrongAnswers} раз`;
    numberOfRightAnswers.textContent = `${currentRightAnswers} правильных ответов из 10`;

    setTimeout(() => {
      allCurrentAnswers = 0;
      currentRightAnswers = 0;
      currentWrongAnswers = 0;
    }, 2000);

    deleteResultOfAnswers();

    sortArray();

    addAndDeleteLearnedWords();

    renderLearnedWords();

    changeColorWord();

    saveToLocalStorage();

    mainBoxInput.value = "";

    let addText = document.querySelector("#word");
    addText.textContent = "Нажмите 'Начать изучать'";

    deleteClueAnswers();
  } else {
    setTimeout(() => {
      addBox();
      changeColorWord();
    }, 0);
  }
}

function renderLearnedWords() {
  let wordNumString = learnedWordsArr.length.toString().split("");

  let wordNum = "";

  let numberLength = learnedWordsArr.length;

  if (numberLength === 0) {
    wordNum = "слов";
  } else if (numberLength === 1) {
    wordNum = "слово";
  } else if (numberLength >= 2 && numberLength < 5) {
    wordNum = "слова";
  } else if (numberLength >= 5 && numberLength < 21) {
    wordNum = "слов";
  } else if (numberLength > 21 && numberLength < 100) {
    if (Number(wordNumString[1]) === 0) {
      wordNum = "слов";
    } else if (Number(wordNumString[1]) === 1) {
      wordNum = "слово";
    } else if (Number(wordNumString[1]) >= 2 && Number(wordNumString[1]) < 5) {
      wordNum = "слова";
    } else if (Number(wordNumString[1]) >= 5 && Number(wordNumString[1]) < 9) {
      wordNum = "слов";
    }
  } else if (numberLength >= 100 && numberLength < 1000) {
    if (numberLength === 100) {
      wordNum = "слов";
    } else if (numberLength === 101) {
      wordNum = "слово";
    } else if (numberLength >= 102 && numberLength < 105) {
      wordNum = "слова";
    } else if (numberLength >= 105 && numberLength < 121) {
      wordNum = "слов";
    } else if (numberLength > 121 && numberLength < 1000) {
      if (Number(wordNumString[2]) === 0) {
        wordNum = "слов";
      } else if (Number(wordNumString[2]) === 1) {
        wordNum = "слово";
      } else if (
        Number(wordNumString[2]) >= 2 &&
        Number(wordNumString[2]) < 5
      ) {
        wordNum = "слова";
      } else if (
        Number(wordNumString[2]) >= 5 &&
        Number(wordNumString[2]) < 9
      ) {
        wordNum = "слов";
      }
    }
  } else if (numberLength >= 100 && numberLength < 1000) {
    if (numberLength === 1000) {
      wordNum = "слов";
    } else if (numberLength === 1001) {
      wordNum = "слово";
    } else if (numberLength >= 1002 && numberLength < 1005) {
      wordNum = "слова";
    } else if (numberLength >= 1005 && numberLength < 1021) {
      wordNum = "слов";
    } else if (numberLength > 1021 && numberLength < 10000) {
      if (Number(wordNumString[3]) === 0) {
        wordNum = "слов";
      } else if (Number(wordNumString[3]) === 1) {
        wordNum = "слово";
      } else if (
        Number(wordNumString[3]) >= 2 &&
        Number(wordNumString[3]) < 5
      ) {
        wordNum = "слова";
      } else if (
        Number(wordNumString[3]) >= 5 &&
        Number(wordNumString[3]) < 9
      ) {
        wordNum = "слов";
      }
    }
  }

  let mainLearnedText = document.querySelector(".main-learned__text");
  let mainLearnedList = document.querySelector(".main-learned__list");

  // let percent = (learnedWordsArr.length / 10000) * 100;
  let percent = (learnedWordsArr.length / arr.length) * 100;

  percent = percent.toFixed(2);

  mainLearnedText.textContent = `Всего вы выучили ${learnedWordsArr.length} ${wordNum}`;
  mainLearnedList.textContent = `Или ${percent}% слов (Пока добавленно ${arr.length} слов из 10000)`;

  deleteLearndWordsBox();
}

function deleteResultOfAnswers() {
  setTimeout(() => {
    let numberOfRightAnswers = document.querySelector("#all-current-answers");
    numberOfRightAnswers.textContent = ``;
  }, 6000);
}

function deleteClueAnswers() {
  let rightHTML = document.querySelector(".main__box2");
  let rightHTML2 = document.querySelector(".main__box3");
  setTimeout(() => {
    rightHTML.textContent = "";
    rightHTML2.textContent = "";
  }, 6000);
}

function deleteLearndWordsBox() {
  let mainLearnedText = document.querySelector(".main-learned__text");
  let mainLearnedList = document.querySelector(".main-learned__list");
  setTimeout(() => {
    mainLearnedText.textContent = "";
    mainLearnedList.textContent = "";
  }, 10000);
}

function addAndDeleteLearnedWords() {
  for (let i = 0; i < wordsArr.length; i++) {
    if (wordsArr[i].memory >= 4) {
      learnedWordsArr.push(wordsArr[i].word.name);
    }
  }
  wordsArr = wordsArr.filter((item) => item.memory < 4);
}

function sortArray() {
  wordsArr = wordsArr.sort((a, b) => {
    if (a.num > b.num) {
      return 1;
    } else if (a.num < b.num) {
      return -1;
    }
    return 0;
  });
}

function changeColorWord() {
  document.querySelector("#word").classList.toggle("grey");
}

function saveToLocalStorage() {
  localStorage.setItem("wordsArr", JSON.stringify(wordsArr));
  localStorage.setItem("learnedWordsArr", JSON.stringify(learnedWordsArr));
}

let switchMode = document.getElementById("switchMode");

switchMode.addEventListener("click", changeTheme);

function changeTheme() {
  let theme = document.getElementById("theme");

  if (theme.getAttribute("href") == "css/standart-mode.css") {
    theme.href = "css/citrus-mode.css";
  } else if (theme.getAttribute("href") == "css/citrus-mode.css") {
    theme.href = "css/earth-mode.css";
  } else if (theme.getAttribute("href") == "css/earth-mode.css") {
    theme.href = "css/style-mode.css";
  } else if (theme.getAttribute("href") == "css/style-mode.css") {
    theme.href = "css/unic-mode.css";
  } else if (theme.getAttribute("href") == "css/unic-mode.css") {
    theme.href = "css/beautifull-mode.css";
  } else if (theme.getAttribute("href") == "css/beautifull-mode.css") {
    theme.href = "css/modern-mode.css";
  } else if (theme.getAttribute("href") == "css/modern-mode.css") {
    theme.href = "css/standart-mode.css";
  }
}

// Tests and find Error
console.log(arr);

let arr2 = [];
for (let i = 0; i < arr.length; i++) {
  arr2.push(arr[i].word.name);
}
console.log(arr2);

let set = new Set(arr2);
set = [...set];
console.log(set);

let wordNeedDelete;

for (let i = 0; i < arr.length; i++) {
  let currentWord = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i].word.name === arr[j].word.name) {
      currentWord += 1;
      if (currentWord > 1) {
        wordNeedDelete = arr[i].word.name;
      }
    }
  }
}

console.log(wordNeedDelete ?? `Все работает правильно, дублированных слов нет`);