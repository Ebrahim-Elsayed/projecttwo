var icons = ["fa fa-anchor", "fa fa-bolt", "fa fa-bomb", "fa fa-bicycle",
    "fa fa-cube", "fa fa-diamond", "fa fa-leaf", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-bolt", "fa fa-bomb", "fa fa-bicycle",
    "fa fa-cube", "fa fa-diamond", "fa fa-leaf", "fa fa-paper-plane-o"];


// cards board and move
const cardsBoard = document.querySelector('#cards-board'), movesCounter = document.querySelector(".moves");
let moves = 0;
// stars 
const stars = document.querySelector('.stars').childNodes, starsForRate = document.querySelector('.stars');
// Timer
let seconds = 0, minutes = 0, hours = 0;

const timer = document.querySelector(".timer"), hourTimer = document.querySelector(".hour"), minuteTimer = document.querySelector(".minute"), secondsTimer = document.querySelector(".seconds");

let timeCounter;
let timerOn = false;

// Restart
const restart = document.querySelector(".restart");

// Modal
const modal = document.querySelector('.modal')
,ratingModal = document.querySelector('.rating-modal')
,timeModal = document.querySelector('.time-modal')
,btnModal = document.querySelector('.btn-modal')
,movesModal = document.querySelector('.moves-modal');

// playing cards array 
let playingCards = [] , matchedCards = [];
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
creatCardsBoard();
function creatCardsBoard() {
    // To clear the old card board 
    cardsBoard.innerHTML = "";
    // creat new ul element to append it to "cardsBoard"
    const myNewDeck = document.createElement('ul');
    myNewDeck.classList.add('deck');
    // shuffle the icons list
    let shufIcons = shuffle(icons);
    for (let i = 0; i < shufIcons.length; i++) {
        const newLi = document.createElement('li');
        newLi.classList.add('card');
        newLi.innerHTML = `<i class="${shufIcons[i]}"></i>`;
        myNewDeck.appendChild(newLi);
    }
    cardsBoard.append(myNewDeck);
    // add event listener to the cards board
    cardsBoard.addEventListener('click', respondToTheClick);
}

function respondToTheClick(e) {

    let selectedCard = e.target;
    /* to make sure that the clicked target is a card & not an opened/matched card*/
    if (selectedCard.classList.contains("card") && !selectedCard.classList.contains("open", "show", "match")) {

        if (timerOn === false) {
            startTimer();
            timerOn = true;
        }
        // add classes open and show to the selected card
        selectedCard.classList.add("open", "show");
        // add the selected card to playingCards array to check if it's
        // like the next selected card or not
        playingCards.push(selectedCard);
    }
    // checking cards when their are two cards in playingCards array
    if (playingCards.length === 2) {
        
        cardsBoard.classList.add("stop-event");
        movesNum();
        if (playingCards[0].innerHTML === playingCards[1].innerHTML) {
            matched();
        } else {
            
            setTimeout(notMatched, 800);
        }
        wingame();
    }
}

// if cards are matched 
function matched() {
    // add class match to both cards
    playingCards[0].classList.add("match");
    playingCards[1].classList.add("match");
    // push both cards to the matchedCards array
    matchedCards.push(playingCards[0]);
    matchedCards.push(playingCards[1]);
    // remove cards from playingCards array
    playingCards = [];
    // to allow opening and checking two cards again
    cardsBoard.classList.remove("stop-event");
}

function notMatched() {
    playingCards[0].classList.remove("open", "show");
    playingCards[1].classList.remove("open", "show");
    playingCards = [];
    cardsBoard.classList.remove("stop-event");
}

function movesNum() {
    // to increment moves number after opening two cards
    moves++;
    if (moves === 1) {
        movesCounter.innerHTML = `1  Move`;
    } else {
        movesCounter.innerHTML = `${moves}  Moves`;
    }
    starsRating();
}
function starsRating() {
    // if the moves number is between 12 and 19
    if (moves === 12) {
        // change the color of the third star to grey
        stars[5].classList.add('grey');
        // if the moves number is 20 or more 
    } else if (moves === 20) {
        // change the color of the second star to grey
        stars[3].classList.add('grey');
    }
}
function fix(x, y) {
    if (x < 10) {
        return (y.innerHTML = ` 0${x}`);
    } else {
        return (y.innerHTML = ` ${x}`);
    }
}
function startTimer() {
    // to start the timer to avoid delay
    if (seconds == 0) {
        seconds++;
    }

    timeCounter = setInterval(function () {

        hourTimer.innerHTML = `${hours}`;
        minuteTimer.innerHTML = ` ${minutes} `;
        secondsTimer.innerHTML = ` ${seconds} `;
        // fix each part of the timer
        fix(seconds, secondsTimer);
        fix(minutes, minuteTimer);
        fix(hours, hourTimer);

        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        } else if (minutes == 60) {
            hours++;
            minutes = 0;
        }
    }, 1000);
}

// restart game

function restartGame() {
    
    timerOn = false;
    // reset the moves to zero
    moves = 0;
    movesCounter.innerHTML = `0 Moves`;
    // empty both arrays 
    matchedCards = [];
    playingCards = []; 
    creatCardsBoard();
    // to stop the timer
    clearInterval(timeCounter);
    // reset the timer to zero
    seconds = 0;
    minutes = 0;
    hours = 0;
    secondsTimer.innerText = "00";
    minuteTimer.innerText = " 00";
    hourTimer.innerText = "00";
    // reset the color of the stars
    stars[5].classList.remove('grey');
    stars[3].classList.remove('grey');
}

restart.addEventListener("click", restartGame);

// win game

function wingame() {
    //when the player finish the game
    if (matchedCards.length === 16) {
        // to add the stats to the modal
        timeModal.innerText = timer.innerText;
        ratingModal.innerHTML = starsForRate.innerHTML;
        movesModal.innerHTML = movesCounter.innerHTML.slice(0, 3);
        //stop the timer and show the modal
        clearInterval(timeCounter);
        modal.style.display = 'block';
    }
}

btnModal.addEventListener('click', function () {
    // to close the modal and restart the game
    modal.style.display = 'none';
    restartGame();
    timerOn = false;
})
