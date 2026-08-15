import random


def play_game():
    print()
    print("================================")
    print("       WORD GUESSING GAME")
    print("================================")
    print()
    print("Welcome to the game!")

    words = [
        "python",
        "computer",
        "programming",
        "developer",
        "keyboard"
    ]

    secret_word = random.choice(words)

    display_word = ["_"] * len(secret_word)

    attempts = 6
    guessed_letters = []

    print()
    print("Word:", " ".join(display_word))
    print("Attempts remaining:", attempts)

    while "_" in display_word and attempts > 0:

        guess = input("\nGuess a letter: ").lower()

        # Check that the player entered exactly one letter
        if len(guess) != 1 or not guess.isalpha():
            print("Please enter one letter.")
            continue

        # Check for repeated guesses
        if guess in guessed_letters:
            print("You already guessed that letter!")
            continue

        # Remember the guess
        guessed_letters.append(guess)

        # Check if the letter is in the word
        if guess in secret_word:
            print("Correct!")

            for i in range(len(secret_word)):
                if secret_word[i] == guess:
                    display_word[i] = guess

        else:
            print("Wrong!")
            attempts -= 1

        print()
        print("Word:", " ".join(display_word))
        print("Attempts remaining:", attempts)
        print("Guessed letters:", ", ".join(guessed_letters))

    # Win condition
    if "_" not in display_word:
        print()
        print("🎉 Congratulations! You guessed the word!")
        print("The word was:", secret_word)

    # Lose condition
    else:
        print()
        print("💀 Game over!")
        print("The word was:", secret_word)


# Main game loop
while True:
    play_game()

    again = input("\nPlay again? (y/n): ").lower()

    if again != "y":
        print("\nThanks for playing!")
        break