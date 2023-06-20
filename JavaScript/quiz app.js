let landing = document.querySelector(".landing");
let details = document.querySelector("details");
let checkedCat, dataFileInput, rightAnswer;
let startBtn = document.querySelector(".landing .start-btn");
let categoryName = document.querySelector(".quiz-container .info h2 span");
let countContainer = document.querySelector(".questions-count");
let questionArea = document.querySelector(".question-area");
let answernArea = document.querySelector(".answer-area");
let controls = document.querySelector(".controls");
let timer = document.querySelector(".controls .timer");
let submitBtn = document.querySelector(".controls .submit-ans");
let nextBtn = document.querySelector(".controls .next");
let results = document.querySelector(".results");
let icons = document.querySelector(".icons");
let rematchIcon = document.querySelector(".icons .rematch");

const uniqueValues = new Set();

function uV(limit, totalValues) {
  do {
    uniqueValues.add(Number((Math.random() * limit).toFixed()));
  } while (uniqueValues.size < totalValues);
  return Array.from(uniqueValues);
}

document.body.onclick = function () {
  details.removeAttribute("open");
};

startBtn.onclick = function () {
  checkedCat = document.querySelector(".landing input:checked");
  dataFileInput = checkedCat.dataset.file;

  landing.remove();
  categoryName.innerHTML = checkedCat.title;

  getRequest();
};

let currentIndex = 0;
let rigthAnswers = 0;
let countdownInterval;
let qCount = 15;
function getRequest() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let jsObject = JSON.parse(this.responseText);
      uV(jsObject.length - 1, qCount);
      let arr = Array.from(uniqueValues);
      console.log(arr);

      getData(jsObject[arr[currentIndex]], qCount);
      countdown(90, qCount);

      submitBtn.onclick = function () {
        rightAnswer = jsObject[arr[currentIndex]].right_answer;
        checkAns(rightAnswer);
        answernArea.style.pointerEvents = "none";
        submitBtn.classList.add("hidden");
        nextBtn.classList.remove("hidden");
        clearInterval(countdownInterval);
      };
      nextBtn.onclick = function () {
        answernArea.style.pointerEvents = "all";
        currentIndex++;
        questionArea.innerHTML = "";
        answernArea.innerHTML = "";
        countContainer.innerHTML = `Question: ${currentIndex + 1} From 15`;
        getData(jsObject[arr[currentIndex]], qCount);
        clearInterval(countdownInterval);
        countdown(90, qCount);
        submitBtn.classList.remove("hidden");
        nextBtn.classList.add("hidden");
      };
    }
  };

  myRequest.open("GET", `../JSON/${dataFileInput}`, true);
  myRequest.send();
}

uV(3, 4);
let z = Array.from(uniqueValues).map((e) => e + 1);

function getData(data, count) {
  if (currentIndex < count) {
    let questionTitle = document.createElement("h3");
    questionTitle.appendChild(document.createTextNode(data.title));
    questionArea.appendChild(questionTitle);

    for (let i = 1; i <= 4; i++) {
      let mainDiv = document.createElement("div");
      mainDiv.className = "answer-box";

      let radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "answers";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.ans = data[`answer_${z[i - 1]}`];
      mainDiv.appendChild(radioInput);
      let label = document.createElement("label");
      label.setAttribute("for", `answer_${i}`);
      label.appendChild(document.createTextNode(data[`answer_${z[i - 1]}`]));
      mainDiv.appendChild(label);

      answernArea.appendChild(mainDiv);
    }
    icons.classList.add("hidden");
  } else if (currentIndex == count) {
    icons.classList.remove("hidden");
    controls.classList.add("hidden");
    countContainer.innerHTML = "Result";
    results.classList.remove("hidden");
    if (rigthAnswers === count) {
      console.log(rigthAnswers);
      results.innerHTML = `<span class="perf">Perfect,</span> All Answers Is Right`;
    } else if (rigthAnswers > count / 2 && rigthAnswers < count) {
      results.innerHTML = `<span class="good">Good,</span> You Answered ${rigthAnswers} From ${qCount}`;
    } else {
      results.innerHTML = `<span class="bad">Bad,</span> You Answered ${rigthAnswers} From ${qCount}`;
    }
  }
  if (currentIndex == count - 1) {
    nextBtn.innerHTML = "Show Results";
  }
}

function checkAns(rAns) {
  let answers = document.getElementsByName("answers");
  let choosenAns;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].dataset.ans === rAns) {
      answers[i].classList.add("correct");
    }
    if (answers[i].checked) {
      choosenAns = answers[i].dataset.ans;
    }
  }
  let correctAns = document.querySelector(".correct + label");
  if (choosenAns == rAns) {
    rigthAnswers++;
    console.log("good");
    correctAns.style.color = "#5fedff";
    document.querySelector("#correct").play();
  } else {
    console.log("wrong");
    setTimeout(() => {
      correctAns.style.color = "#b50000";
    }, 500);
    document.querySelector(".wrong").play();
  }
}

function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      timer.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitBtn.click();
      }
    }, 1000);
  }
}

rematchIcon.onclick = function () {
  uniqueValues.clear();
  currentIndex = 0;
  rigthAnswers = 0;
  // results.innerHTML = "";
  countContainer.innerHTML = `Question: ${currentIndex + 1} From 15`;
  qCount = 15;
  nextBtn.innerHTML = "Next Question";
  results.classList.add("hidden");
  controls.classList.remove("hidden");
  getRequest();
};
