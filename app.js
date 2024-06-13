const readline = require('readline');

//create rock, paper, scissors game using javascript
//computer is the opponent and can randomly choose rock, paper, or scissors
//player can choose one of the three options rock, paper, or scissors
//play should be warned if they choose wrong option
//at each round player can choose one of the options and should be informed if they win, lose, or draw
//at the each round playaer can choose to play again or stop the game
//the game should keep track of the score and display it at the end of the game
//handle user inputs, putting them in lowercase and informing the user if the option is invalid
//use functions to keep the code clean and organized
//use loops to keep the game running until the player decides to stop
//use variables to keep track of the score
//use conditional statements to determine the winner of each round
//use Math.random() to have the computer randomly choose rock, paper, or scissors
//use console.log() to display the results of each round
//use console.log() to display the final score at the end of the game
//use prompt to get user input
//game rules: rock beats scissors, scissors beats paper, paper beats rock, same choices result in a draw

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getRandomChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getPlayerChoice() {
    return new Promise((resolve, reject) => {
        rl.question("Choose rock, paper, or scissors: ", (choice) => {
            choice = choice.toLowerCase();
            if (["rock", "paper", "scissors"].includes(choice)) {
                resolve(choice);
            } else {
                console.log("Invalid choice. Please choose rock, paper, or scissors.");
                getPlayerChoice().then(resolve);
            }
        });
    });
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "draw";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        return "win";
    } else {
        return "lose";
    }
}

async function playGame() {
    let playerScore = 0;
    let computerScore = 0;

    while (true) {
        const playerChoice = await getPlayerChoice();
        const computerChoice = getRandomChoice();

        console.log(`Player chooses: ${playerChoice}`);
        console.log(`Computer chooses: ${computerChoice}`);

        const result = determineWinner(playerChoice, computerChoice);

        if (result === "win") {
            playerScore++;
            console.log("You win!");
        } else if (result === "lose") {
            computerScore++;
            console.log("You lose!");
        } else {
            console.log("It's a draw!");
        }

        console.log(`Player score: ${playerScore}`);
        console.log(`Computer score: ${computerScore}`);

        const playAgain = await new Promise((resolve, reject) => {
            rl.question("Do you want to play again? (yes/no): ", (answer) => {
                resolve(answer.toLowerCase() === "yes");
            });
        });

        if (!playAgain) {
            break;
        }
    }

    rl.close();

    console.log("Game over!");
    console.log(`Final score: Player ${playerScore} - Computer ${computerScore}`);
}

playGame();

