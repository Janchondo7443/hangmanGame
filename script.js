const keyBoard = document.getElementById("key-board");
const phraseBoard = document.getElementById("phrase-board");
const attemptBoard = document.getElementById("attempt-board");
const modal = document.getElementById("modal");
const message = document.getElementById("message");

const main = document.getElementById("main")
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const wordBank = [
 "excellent",
 "whenevers",
 "radiologist",
 "regional",
 "emergency",
 "documentation",
 "resistant",
 "priority"
]
const state = {
 answer: "",
 roundStatus: [],
 attempts: 0,
 used: [],
 checkArr: []
}
function selectPhrase() {
 let index = Math.floor(Math.random() * 8);
 for (let i = 0; i < wordBank.length - 3; i++) {
  state.answer = wordBank[index]
 }
 let answer = ""
 answer = state.answer
 let roundStatus = answer.split(" ")
 roundStatus = roundStatus.filter(space => space !== " ")
 state.roundStatus = roundStatus
 let lettersArr = []
 let letters = roundStatus.forEach(word => {
  let letter = {}
  letter.letter = word
  letter.status = false
  lettersArr.push(letter)
 })
 roundStatus = letters
 roundStatus = lettersArr
 state.answer = answer
 state.roundStatus = roundStatus
 state.attempts = 0
 state.used = []
}
selectPhrase()
function buildPhraseboard() {
 let answerArr = state.answer.split("").filter(space => space != " ");

 answerArr.forEach(word => {
  let wordBox = document.createElement("section");
  let lettersArr = []
  lettersArr.push(word)
  lettersArr.forEach(letter => {
   const letterBox = document.createElement("div");
   letterBox.value = letter
   letterBox.className = "answers"
   wordBox.append(letterBox)
  })
  phraseBoard.append(wordBox)
 })
 
}
function buildKeyboard() {
 alphabet.forEach(letter => {
  let key = document.createElement("span");
  key.classList.add("letter");
  key.innerText = letter;
  key.id = letter
  key.value = letter
  key.addEventListener("click", checkGuess, true);
  keyBoard.append(key)
 })
}

function checkGuess(e) {
 
 let { target, key, keyCode } = e
 let { value } = target;
 let letter = validateInput(keyCode, key, value)
 if (state.answer.includes(letter)) {
  updateRoundStatus(letter)
  updatePhraseBoard(letter)
 } else {
  updateAttempts()
 }
 updateKeyBoard(letter)

}

function validateInput(keyCode, key, value) {
 let letter
 if (keyCode) {
  if (keyCode >= 65 && keyCode <= 90 && keyCode !== state.used.includes(letter)) {
   letter = key
  }
 } else {
  letter = value
  state.used = [...state.used, letter]
 }

 return letter
}
function updateRoundStatus(newLetter) {
 state.roundStatus.forEach(letter => {
  if (letter.letter === newLetter) {
   letter.status = true
  }
 })
 checkStatus()
}
function checkStatus() {
 let check = state.roundStatus.every(letterObj => letterObj.status)

 state.roundStatus.forEach(letterObj => {
  if (letterObj.status === false) {

   check = false
  } else {
   check = true
  }
 })

}
const win = () => {
 setTimeout(() => roundOver(
       `
  Orale 🐓`), 50)
}
function updatePhraseBoard(value) {
 let answers = document.getElementsByClassName("answers");
 let arr = [answers, ...answers]
 arr.forEach(answer => answer.value === value ? answer.innerText = value
  : false
 )
let rr = Array.from(answers)
rr.every(el=>el.innerText!=="")?
win()
:
null

}
const updateAttempts = () => {
 state.attempts += 1
 let div = document.createElement("div");
 div.className = "wrong"
 div.innerText = "🤔"
 attemptBoard.append(div)

 if (state.attempts === 6) {
  setTimeout(roundOver(`
            Chinge Su Madre!
            The correct answer is:
            ${state.answer}`), 35)
 }
}
const updateKeyBoard = (letter) => {
 let keyEl = document.getElementById(letter)
 keyEl.style.opacity = 0.5
 keyEl.style.background = "rgb(0, 20, 20)"
 keyEl.style.pointerEvents = "none"
 keyEl.removeEventListener(keyEl, (e) => removeEvent(e))
}
const roundOver = (str) => {
 message.innerText = str
 modal.style.display = "flex"
 message.style = `
        color: rgb(181, 233, 263);
        text-shadow: 0px 5px 15px  black;
        font-size: 2.5rem;
        text-align:center;
     
        `
 modal.opacity = "0.35"
 modal.addEventListener("click", (e) => playAgain(e))
}
const playAgain = () => {
 modal.style.display = "none"
 main.style.opacity = "1"
 main.style.pointerEvents = "all"
 modal.removeEventListener("click", (e) => removeEvent(e))
 renderGame()
}
function removeEvent(el, func) {
 el.removeEventListener("click", func, true)
}

function renderGame() {
 phraseBoard.innerHTML = "";
 keyBoard.innerHTML = "";
 attemptBoard.innerHTML = "";
 message.innerHTML = "";
 selectPhrase()
 buildPhraseboard()
 buildKeyboard()
 window.addEventListener("keydown", (e) => checkGuess(e))
}
renderGame()