let randomNumber = parseInt((Math.random()*100)+1);

const userInput = document.querySelector('#guessField')
const submit = document.querySelector('#subt')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHigh = document.querySelector('.lowOrHigh')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p')

let prevGuess = []
let numGuess = 1
let playGame = true

if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault()
        const guess = parseInt(userInput.value)
        console.log(guess)
        validateGuess(guess)
    })
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number.')
    }else if(guess>100 || guess<1){
        alert('Please enter a number between 1 and 100.')
    }else{
        prevGuess.push(guess)
        if(numGuess === 10){
            displayGuess(guess)
            displayMessage('Game Over! Random Number Was ' + randomNumber)
            endGame()
        }else{
            checkGuess(guess)
            displayGuess(guess)
        }
    }
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage('Hurray, You Gussed It Right.')
        endGame()
    }else if(guess < randomNumber){
        displayMessage('Oops, It Is Smaller.')
    }else if(guess > randomNumber){
        displayMessage('Oops, It Is Bigger.')
    }
}

function displayGuess(guess){
    userInput.value = ''
    guessSlot.innerHTML += guess
    guessSlot.innerHTML += ' '
    numGuess++;
    remaining.innerHTML = 11 - numGuess
}

function displayMessage(message){
    lowOrHigh.innerHTML = message
}

function endGame(){
    userInput.value = ''
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = '<h2 style="background-color: red; cursor: pointer" id="newGame">Start New Game</h2>'
    startOver.appendChild(p)
    playGame = false;
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', function (e){
        randomNumber = parseInt((Math.random()*100)+1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = 11 - numGuess;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p)
        playGame = true;
    })

}