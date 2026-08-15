import { useEffect, useState } from "react";
import "./App.css";

const WORDS = [
  "python",
  "computer",
  "programming",
  "developer",
  "keyboard",
  "javascript",
  "website",
  "coding",
  "software",
  "internet",
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function App() {
  const [secretWord, setSecretWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [attempts, setAttempts] = useState(6);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const startGame = () => {
    const randomWord =
      WORDS[Math.floor(Math.random() * WORDS.length)];

    setSecretWord(randomWord);
    setGuessedLetters([]);
    setAttempts(6);
    setMessage("");
    setGameOver(false);
    setWon(false);
  };

  useEffect(() => {
    startGame();
  }, []);

  const makeGuess = (letter) => {
    if (gameOver || guessedLetters.includes(letter)) {
      return;
    }

    const newGuessedLetters = [...guessedLetters, letter];

    setGuessedLetters(newGuessedLetters);

    if (secretWord.includes(letter.toLowerCase())) {
      setMessage("Correct! 🎉");
    } else {
      const newAttempts = attempts - 1;

      setAttempts(newAttempts);
      setMessage("Wrong! ❌");

      if (newAttempts === 0) {
        setGameOver(true);
        setMessage(`Game over! The word was "${secretWord}".`);
        return;
      }
    }

    const wordGuessed = secretWord
      .split("")
      .every((letter) =>
        newGuessedLetters.includes(letter.toUpperCase())
      );

    if (wordGuessed) {
      setWon(true);
      setGameOver(true);
      setMessage("Congratulations! You guessed the word! 🎉");
    }
  };

  const displayWord = secretWord
    .split("")
    .map((letter) =>
      guessedLetters.includes(letter.toUpperCase()) ? letter : "_"
    );

  return (
    <main className="app">
      <div className="background-circle circle-one"></div>
      <div className="background-circle circle-two"></div>

      <section className="game-card">

        <div className="game-header">
          <span className="badge">WORD GAME</span>

          <h1>Word Guessing</h1>

          <p>
            Guess the hidden word before you run out of attempts.
          </p>
        </div>

        <div className="stats">

          <div className="stat">
            <span>❤️</span>
            <strong>{attempts}</strong>
            <small>Attempts</small>
          </div>

          <div className="stat">
            <span>🔤</span>
            <strong>{guessedLetters.length}</strong>
            <small>Guessed</small>
          </div>

        </div>

        <div className="word-container">
          {displayWord.map((letter, index) => (
            <span
              className={`letter ${
                letter !== "_" ? "revealed" : ""
              }`}
              key={index}
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="message">
          {message || "Choose a letter to begin!"}
        </div>

        <div className="keyboard">

          {ALPHABET.map((letter) => {

            const alreadyGuessed =
              guessedLetters.includes(letter);

            const isCorrect =
              alreadyGuessed &&
              secretWord.includes(letter.toLowerCase());

            return (
              <button
                key={letter}
                className={`key ${
                  alreadyGuessed ? "used" : ""
                } ${isCorrect ? "correct" : ""}`}
                onClick={() => makeGuess(letter)}
                disabled={alreadyGuessed || gameOver}
              >
                {letter}
              </button>
            );
          })}

        </div>

        {gameOver && (
          <div className={`result ${won ? "win" : "lose"}`}>
            <div className="result-icon">
              {won ? "🏆" : "💀"}
            </div>

            <h2>
              {won ? "You Won!" : "Game Over"}
            </h2>

            {!won && (
              <p>
                The word was{" "}
                <strong>{secretWord}</strong>
              </p>
            )}

            <button
              className="play-again"
              onClick={startGame}
            >
              🔄 Play Again
            </button>
          </div>
        )}

      </section>
    </main>
  );
}

export default App;