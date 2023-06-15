// landing variables
let landing = document.querySelector(".landing");
let playOne = document.querySelector(".landing .one-player");
let playTwo = document.querySelector(".landing .two-players");

// controls variables
let controlsContainer = document.querySelector(".controls");
let firstInput = document.querySelector(".controls .first-input");
let secondtInput = document.querySelector(".controls .second-input");
let startGameBtn = document.querySelector(".controls .start-btn");

// info variables
let info = document.querySelector(".info");
let firstPlayerContainer = document.querySelector(".info > div:first-of-type");
let secondPlayerContainer = document.querySelector(".info > div:last-of-type");
let infoFirstH3 = document.querySelector(".info div:first-of-type h3 span:first-of-type");
let firstPlayerName = document.querySelector(".info h3 .first-name");
console.log(firstPlayerName.innerHTML)
let secondPlayerName = document.querySelector(".info h3 .second-name");
let firstTimer = document.querySelector(
  ".info > div:first-of-type .timer .number"
);
let secondTimer = document.querySelector(
  ".info > div:last-of-type .timer .number"
);
let firstTimerNumber = firstTimer.innerHTML;
let secondTimerNumber = secondTimer.innerHTML;
let firstWrongTries = document.querySelector(
  ".info > div:first-of-type .wrong-tries span"
);
let secondWrongTries = document.querySelector(
  ".info > div:last-of-type .wrong-tries span"
);

// game container variables
let gameContainer = document.querySelector(".game-container");
let cardBox = document.querySelectorAll(".game-container .card-box");
let orderRange = [...Array(cardBox.length).keys()];
let duration = 1000;

// pop up window variables
let popUpWindow = document.querySelector(".pop-up-window");
let popUpWindowText = document.querySelector(".pop-up-window h2");
let rematchIcon = document.querySelector(".pop-up-window .rematch");

// to player status
let stat = false;

// inputs functions
playOne.onclick = function () {
  landing.remove();
  controlsContainer.classList.remove("hidden");
  info.classList.remove("two-players");
  firstInput.focus();

  inputKeyUp(firstInput);
};
playTwo.onclick = function () {
  landing.remove();
  controlsContainer.classList.remove("hidden");
  info.classList.add("two-players");
  infoFirstH3.innerHTML = `First Player:`;
  console.log(infoFirstH3)
  firstInput.focus();
  firstInput.setAttribute("placeholder", "First Player Name");
  secondtInput.classList.remove("hidden");
  firstInput.onkeyup = function (e) {
    if (e.key == "Enter") {
      secondtInput.focus();
    }
  };
  inputKeyUp(secondtInput);
};

function inputKeyUp(inp) {
  inp.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      startGameBtn.click();
    }
  });
}


// start btn function
startGameBtn.addEventListener("click", () => {
  controlsContainer.remove();
  firstPlayerName.innerHTML = firstInput.value || "Unknown";
  console.log(firstPlayerName.innerHTML)
  console.log(infoFirstH3)
  secondPlayerName.innerHTML = secondtInput.value || "Unknown";
  if (!info.classList.contains("two-players")) {
    intervalCountDownOnePlayer(firstTimer);
  } else {
    if (stat == false) {
      startInterval();
      stat = true;
    } else {
      stopInterval();
    }
  }
});



// timer functions
// --interval variables
let firstTimeInterval;
let secondTimeInterval;
let firstTimerValue = 90;
let secondTimerValue = 90;
let first = "First";
let second = "Second";

function firstUpdateTimerDisplay() {
  firstTimer.textContent = firstTimerValue;
}
function secondUpdateTimerDisplay() {
  secondTimer.textContent = secondTimerValue;
}

function startInterval() {
  if (!stat) {
    firstTimeInterval = setInterval(firstTimerInterval, duration);
  } else {
    secondTimeInterval = setInterval(secondTimerInterval, duration);
  }
}
function stopInterval() {
  if (stat) {
    clearInterval(firstTimeInterval);
  } else {
    clearInterval(secondTimeInterval);
  }
}
function firstTimerInterval() {
  firstTimerValue--;
  firstUpdateTimerDisplay();
  dectrementTimer(firstTimerValue, secondtInput, second);
}
function secondTimerInterval() {
  secondTimerValue--;
  secondUpdateTimerDisplay();
  dectrementTimer(secondTimerValue, firstInput, first);
}

function dectrementTimer(timerValue, input, order) {
  if (timerValue == 0) {
    clearInterval(firstTimeInterval);
    clearInterval(secondTimeInterval);
    popUpWindow.classList.remove("hidden");
    popUpWindowText.classList.add("win");
    popUpWindowText.innerHTML = `${input.value || `${order} Player`} Wins`;
  }
  let allMatchedBlocks = [...cardBox].filter((MatchedBlock) =>
    MatchedBlock.classList.contains("has-matched")
  );
  if (allMatchedBlocks.length == 30) {
    stopInterval();
    popUpWindow.classList.remove("hidden");
    popUpWindowText.classList.add("win");
    if (
      parseInt(firstWrongTries.innerHTML) < parseInt(secondWrongTries.innerHTML)
    ) {
      popUpWindowText.innerHTML = `${firstInput.value || "First Player"} Wins`;
    } else if (
      parseInt(secondWrongTries.innerHTML) < parseInt(firstWrongTries.innerHTML)
    ) {
      popUpWindowText.innerHTML = `${
        secondtInput.value || "Second Player"
      } Wins`;
    } else {
      popUpWindowText.classList.remove("win");
      popUpWindowText.innerHTML = "Draw";
    }
  }
}

function intervalCountDownOnePlayer(timer) {
  let count = setInterval(() => {
    timer.innerHTML--;
    if (timer.innerHTML == 0) {
      clearInterval(count);
      popUpWindow.classList.remove("hidden");
      popUpWindowText.classList.add("loss");
      popUpWindowText.classList.remove("win");
      popUpWindowText.innerHTML = "Game Over";
    }
    let allMatchedBlocks = [...cardBox].filter((MatchedBlock) =>
      MatchedBlock.classList.contains("has-matched")
    );
    if (allMatchedBlocks.length == 30) {
      clearInterval(count);
      popUpWindow.classList.remove("hidden");
      popUpWindowText.classList.add("win");
      popUpWindowText.classList.remove("loss");
      popUpWindowText.innerHTML = "You Win";
    }
  }, duration);
}

// game container functions
shuffling(orderRange);

function shuffling(arr) {
  let current = arr.length;
  while (current > 0) {
    let random = Math.floor(Math.random() * current);
    current--;
    [arr[current], arr[random]] = [arr[random], arr[current]];
  }
  return arr;
}

cardBox.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", () => {
    flippe(block);
  });
});

function flippe(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let allFlippedBlocks = [...cardBox].filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatch(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  gameContainer.classList.add("stop-clicking");
  setTimeout(() => {
    gameContainer.classList.remove("stop-clicking");
  }, duration);
}

function checkMatch(firstBlock, secondBlock) {
  if (firstBlock.dataset.img === secondBlock.dataset.img) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-matched");
    secondBlock.classList.add("has-matched");
    firstBlock.classList.add("stop-clicking");
    secondBlock.classList.add("stop-clicking");
    document.getElementById("success").play();

    if (info.classList.contains("two-players")) {
      if (stat) {
        firstPlayerContainer.classList.remove("active");
        secondPlayerContainer.classList.add("active");
        startInterval();
        stopInterval();
        stat = false;
      } else {
        firstPlayerContainer.classList.add("active");
        secondPlayerContainer.classList.remove("active");
        startInterval();
        stopInterval();
        stat = true;
      }
    }

  } else {
    document.getElementById("fail").play();
    setTimeout(() => {
      if (info.classList.contains("two-players")) {
        if (!stat) {
          firstPlayerContainer.classList.add("active");
          secondPlayerContainer.classList.remove("active");
          secondWrongTries.innerHTML = parseInt(secondWrongTries.innerHTML) + 1;
          startInterval();
          stopInterval();
          stat = true;
        } else {
          firstPlayerContainer.classList.remove("active");
          secondPlayerContainer.classList.add("active");
          firstWrongTries.innerHTML = parseInt(firstWrongTries.innerHTML) + 1;
          startInterval();
          stopInterval();
          stat = false;
        }
      } else {
        firstWrongTries.innerHTML = parseInt(firstWrongTries.innerHTML) + 1;
      }

      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

// rematch icon function
rematchIcon.addEventListener("click", () => {
  popUpWindow.classList.add("hidden");
  shuffling(orderRange);
  cardBox.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.classList.remove("has-matched");
    block.classList.remove("is-flipped");
    block.classList.remove("stop-clicking");
  });
  firstTimer.innerHTML =
    firstTimerValue =
    secondTimer.innerHTML =
    secondTimerValue =
      90;
  firstWrongTries.innerHTML = 0;
  secondWrongTries.innerHTML = 0;
  stat = false;
  firstPlayerContainer.classList.add("active");
  secondPlayerContainer.classList.remove("active");
  if (!info.classList.contains("two-players")) {
    intervalCountDownOnePlayer(firstTimer);
  } else {
    startInterval();
    stat = true;
  }
});