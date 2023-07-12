const word = "developer"; // Cuvântul de ghicit
let guessedLetters = []; // Literele ghicite
let remainingAttempts = 6; // Numărul de încercări rămase

const wordContainer = document.getElementById("word");
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

// Inițializare: afișează cuvântul ca liniuțe
function initializeWord() {
  for (let i = 0; i < word.length; i++) {
    guessedLetters.push("_");
  }
  updateWord();
}

// Actualizare: afișează cuvântul
function updateWord() {
  wordContainer.textContent = guessedLetters.join(" ");
}

// Verifică ghicirea și actualizează starea jocului
function checkGuess() {
  const guess = guessInput.value.toLowerCase();
  guessInput.value = "";

  if (guess.length !== 1 || !guess.match(/[a-z]/)) {
    message.textContent = "Please enter a single lowercase letter.";
    return;
  }

  if (guessedLetters.includes(guess)) {
    message.textContent = "You already guessed that letter.";
    return;
  }

  let letterFound = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guess) {
      guessedLetters[i] = guess;
      letterFound = true;
    }
  }

  if (letterFound) {
    message.textContent = "Good guess!";
  } else {
    message.textContent = "Wrong guess!";
    remainingAttempts--;
  }

  updateWord();

  if (remainingAttempts === 0) {
    endGame(false);
  } else if (!guessedLetters.includes("_")) {
    endGame(true);
  }
}

// Sfârșitul jocului: afișează mesajul și dezactivează intrările
function endGame(won) {
  if (won) {
    message.textContent = "Congratulations! You won!";
  } else {
    message.textContent = `Game over! The word was "${word}".`;
  }

  guessInput.disabled = true;
  submitBtn.disabled = true;
}

// Adaugă evenimentul de click pentru butonul de ghicire
submitBtn.addEventListener("click", checkGuess);

// Inițializare la începutul jocului
initializeWord();