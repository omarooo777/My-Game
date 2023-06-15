let mainContainer = document.querySelector(".container-start-page");
let options = document.querySelector(".options");

function hiddenOptions() {
  options.classList.add("hidden");
}


// Start Game Section

let startGame = document.querySelector(".start-game");
let audio = document.querySelector(".audio");

// setTimeout(function() {
//   audio.play()
// }, 1000)

startGame.addEventListener("click", () => {
  hiddenOptions();
  showGames();
  // audio.play();
  // audio.currentTime = 0;
});

function showGames() {
  let startGameContainer = document.querySelector(".start-game-container");
  startGameContainer.classList.remove("hidden");
  // backToTittle(startGameContainer);
}

let link = document.querySelector(".link a");
link.onclick = function() {
  // audio.play()
}

// Settings Section

let settings = document.querySelector(".settings");

settings.addEventListener("click", () => {
  hiddenOptions();
  showSettings();
});

function showSettings() {
  let settingsContainer = document.querySelector(".settings-container");
  settingsContainer.classList.remove("hidden");
  backToTittle(settingsContainer);
}

// play and pause icon

// let playPauseIcon = document.querySelector(".play-pause-icoc i");
// let plauStaus = false;

// playPauseIcon.addEventListener("click", () => {
//   playAndPause();
// });

// function playAndPause() {
//   if (plauStaus === false) {
//     audio.play();
//     // audio.currentTime = 0
//     playPauseIcon.className = "fa-solid fa-pause";
//     plauStaus = true;
//   } else {
//     audio.pause();
//     playPauseIcon.className = "fa-solid fa-play";
//     plauStaus = false;
//   }
// }


// audio volume

let audioVolume = document.getElementById("audio-volume");
audioVolume.addEventListener("change", () => {
  checkVolume();
});

function checkVolume() {
  audio.volume = audioVolume.value / 100;
}

audioVolume.oninput = () => {
  slider();
};

function slider() {
  let valPercent = (audioVolume.value / audioVolume.max) * 100;
  audioVolume.style.background = `linear-gradient(to right, #ff9800 ${valPercent}%, #ccccca ${valPercent}%)`;
}

// plus and minus icons

let minus = document.querySelector(".minus");
let plus = document.querySelector(".plus");

minus.addEventListener("click", function () {
  audioVolume.value = parseInt(audioVolume.value) - 10;
  slider();
  checkVolume();
});

plus.addEventListener("click", function () {
  audioVolume.value = parseInt(audioVolume.value) + 10;
  slider();
  checkVolume();
});

// About Section
let about = document.querySelector(".about");

about.addEventListener("click", () => {
  hiddenOptions();
  showAbout();
});

function showAbout() {
  let aboutContainer = document.querySelector(".about-container");
  aboutContainer.classList.remove("hidden");
  backToTittle(aboutContainer);
}

// creat back to tittle link

let back = document.createElement("h3");
back.classList.add("back");
back.appendChild(document.createTextNode("Back to title"));

back.addEventListener("click", () => {
  audio.pause();
});

function backToTittle(container) {
  container.appendChild(back);
  back.onclick = function () {
    options.classList.remove("hidden");
    container.classList.add("hidden");
  };
}

// /*
//   Advices
//   - Always Check The Console
//   - Take Your Time To Name The Identifiers
//   - DRY

//   Steps To Create The Project
//   [01] Create HTML Markup
//   [02] Add Styling And Separate From Logic
//   [03] Create The App Logic
//   ---- [01] Add Levels
//   ---- [02] Show Level And Seconds
//   ---- [03] Add Array Of Words
//   ---- [04] ِAdd Start Game Button
//   ---- [05] Generate Upcoming Words
//   ---- [06] Disable Copy Word And Paste Event + Focus On Input
//   ---- [07] Start Play Function
//   ---- [08] Start The Time And Count Score
//   ---- [09] Add The Error And Success Messages
//   [04] Your Trainings To Add Features
//   ---- [01] Save Score To Local Storage With Date
//   ---- [02] Choose Levels From Select Box
//   ---- [03] Break The Logic To More Functions
//   ---- [04] Choose Array Of Words For Every Level
//   ---- [05] Write Game Instruction With Dynamic Values
//   ---- [06] Add 3 Seconds For The First Word
// */

// // Array Of Words
// const words = [
//   "Hello",
//   "Programming",
//   "Code",
//   "Javascript",
//   "Town",
//   "Country",
//   "Testing",
//   "Youtube",
//   "Linkedin",
//   "Twitter",
//   "Github",
//   "Leetcode",
//   "Internet",
//   "Python",
//   "Scala",
//   "Destructuring",
//   "Paradigm",
//   "Styling",
//   "Cascade",
//   "Documentation",
//   "Coding",
//   "Funny",
//   "Working",
//   "Dependencies",
//   "Task",
//   "Runner",
//   "Roles",
//   "Test",
//   "Rust",
//   "Playing",
// ];

// const lvls = {
//   Easy: 5,
//   Normal: 10,
//   Hard: 2,
// };

// let lvlName = "Normal";
// let seconds = lvls[lvlName];

// let startBtn = document.querySelector(".start");
// let lvlSpan = document.querySelector(".message .lvl");
// let secondsSpan = document.querySelector(".message .seconds");
// let theWord = document.querySelector(".word");
// let input = document.querySelector(".input-typing");
// let comingWords = document.querySelector(".coming-words");
// let time = document.querySelector(".control .time span");
// let scoreGot = document.querySelector(".control .score .got");
// let scoreTotal = document.querySelector(".control .score .total");
// let finish = document.querySelector(".finish");

// lvlSpan.innerHTML = lvlName;
// secondsSpan.innerHTML = seconds;
// time.innerHTML = seconds * 2;
// scoreTotal.innerHTML = words.length;

// input.onpaste = function () {
//   return false;
// };

// startBtn.onclick = function () {
//   this.remove();
//   input.focus();
//   generateWords();
// };

// function generateWords() {
//   let word = words[Math.floor(Math.random() * words.length)];
//   let wordLength = words.indexOf(word);
//   words.splice(wordLength, 1);
//   theWord.innerHTML = word;
//   comingWords.innerHTML = "";
//   for (let i = 0; i < words.length; i++) {
//     let div = document.createElement("div");
//     div.appendChild(document.createTextNode(words[i]));
//     comingWords.append(div);
//   }
//   startPlay();
//   // input.onkeyup = function (e) {
//   //   if (e.key == "Enter") {
//   //     // console.log(e.key);
//   //     pressEnter();
//   //   }
//   // };
// }

// function startPlay() {
//   if (scoreGot.innerHTML != 0) {
//     time.innerHTML = seconds;
//   }
//   let start = setInterval(function () {
//     time.innerHTML--;
//     if (time.innerHTML == 0) {
//       clearInterval(start);
//       check()
//     };
//     input.onkeyup = function (e) {
//       if (e.key == "Enter") {
//         clearInterval(start);
//         check();
//       }
//     }
//   }, 1000);
// }

// function check() {
//   if (input.value === theWord.innerHTML) {
//     input.value = "";
//     scoreGot.innerHTML++;
//     if (comingWords.children.length > 0) {
//       generateWords();
//     } else {
//       finish.classList.add("good");
//       finish.appendChild(document.createTextNode("Congratulations!"));
//     }
//   } else {
//     input.remove()
//     finish.classList.add("bad");
//     finish.appendChild(document.createTextNode("Game Over"));
//   }
// }
