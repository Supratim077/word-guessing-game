// ==========================================
// WORD GUESSING GAME
// ==========================================

// List of possible words
const words = [
    "python",
    "computer",
    "programming",
    "developer",
    "keyboard",
    "javascript",
    "website",
    "coding",
    "software",
    "internet"
];


// ==========================================
// GAME VARIABLES
// ==========================================

let secretWord;
let displayWord;
let attempts;
let guessedLetters = [];


// ==========================================
// HTML ELEMENTS
// ==========================================

const wordDisplay = document.getElementById("word");
const attemptsDisplay = document.getElementById("attempts");
const guessedDisplay = document.getElementById("guessed-letters");
const messageDisplay = document.getElementById("message");
const keyboard = document.getElementById("keyboard");
const restartButton = document.getElementById("restart-button");


// ==========================================
// START GAME
// ==========================================

function startGame() {

    // Choose a random word
    secretWord = words[Math.floor(Math.random() * words.length)];

    // Create hidden version of the word
    displayWord = Array(secretWord.length).fill("_");

    // Give the player 6 attempts
    attempts = 6;

    // Clear previous guesses
    guessedLetters = [];

    // Clear message
    messageDisplay.textContent = "";

    // Create the keyboard
    createKeyboard();

    // Update the screen
    updateScreen();
}


// ==========================================
// CREATE A-Z KEYBOARD
// ==========================================

function createKeyboard() {

    // Clear old keyboard buttons
    keyboard.innerHTML = "";

    // Alphabet
    const letters = "abcdefghijklmnopqrstuvwxyz";

    // Create a button for every letter
    for (const letter of letters) {

        const button = document.createElement("button");

        // Display uppercase letter
        button.textContent = letter.toUpperCase();

        // Add CSS class
        button.classList.add("letter-button");

        // When clicked, make a guess
        button.addEventListener("click", function () {
            makeGuess(letter);
        });

        // Add button to keyboard
        keyboard.appendChild(button);
    }
}


// ==========================================
// UPDATE SCREEN
// ==========================================

function updateScreen() {

    // Show hidden/guessed word
    wordDisplay.textContent = displayWord.join(" ");

    // Show attempts
    attemptsDisplay.textContent = attempts;

    // Show guessed letters
    if (guessedLetters.length === 0) {
        guessedDisplay.textContent = "None";
    } else {
        guessedDisplay.textContent = guessedLetters.join(", ");
    }
}


// ==========================================
// MAKE A GUESS
// ==========================================

function makeGuess(guess) {

    // Make sure guess is lowercase
    guess = guess.toLowerCase();


    // Check if the input is a valid letter
    if (guess.length !== 1 || !/[a-z]/.test(guess)) {

        messageDisplay.textContent =
            "Please choose a valid letter.";

        return;
    }


    // Check if letter was already guessed
    if (guessedLetters.includes(guess)) {

        messageDisplay.textContent =
            "You already guessed that letter!";

        return;
    }


    // Add letter to guessed letters
    guessedLetters.push(guess);


    // Disable the clicked keyboard button
    disableLetterButton(guess);


    // Check if letter exists in secret word
    if (secretWord.includes(guess)) {

        messageDisplay.textContent =
            "Correct! 🎉";


        // Reveal every occurrence of the letter
        for (let i = 0; i < secretWord.length; i++) {

            if (secretWord[i] === guess) {

                displayWord[i] = guess;
            }
        }

    } else {

        // Wrong guess
        messageDisplay.textContent =
            "Wrong! ❌";

        attempts--;
    }


    // Update the screen
    updateScreen();


    // Check if game has ended
    checkGameOver();
}


// ==========================================
// DISABLE USED LETTER
// ==========================================

function disableLetterButton(letter) {

    const buttons =
        document.querySelectorAll(".letter-button");


    buttons.forEach(function (button) {

        if (button.textContent.toLowerCase() === letter) {

            button.disabled = true;
        }
    });
}


// ==========================================
// CHECK GAME OVER
// ==========================================

function checkGameOver() {


    // PLAYER WON
    if (!displayWord.includes("_")) {

        messageDisplay.textContent =
            "🎉 Congratulations! You guessed the word!";


        // Disable entire keyboard
        disableKeyboard();

        return;
    }


    // PLAYER LOST
    if (attempts === 0) {

        messageDisplay.textContent =
            `💀 Game over! The word was "${secretWord}".`;


        // Disable entire keyboard
        disableKeyboard();
    }
}


// ==========================================
// DISABLE ENTIRE KEYBOARD
// ==========================================

function disableKeyboard() {

    const buttons =
        document.querySelectorAll(".letter-button");


    buttons.forEach(function (button) {

        button.disabled = true;
    });
}


// ==========================================
// PLAY AGAIN BUTTON
// ==========================================

restartButton.addEventListener("click", function () {

    startGame();
});


// ==========================================
// START THE FIRST GAME
// ==========================================

startGame();