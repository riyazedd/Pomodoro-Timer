let timeInterval;
let minutes = 25;
let seconds = 0;
let isBreak = false;
let audio=new Audio('sounds/alarm.wav'); //audio object to play when work time or break time is finished

const timerDisplay = $('.display');
const startButton = $('#startTimer');
const resetButton = $('#resetTimer');

startButton.click(startTimer);
resetButton.click(resetTimer);

function startTimer() {
    startButton.prop('disabled', true);
    if (timeInterval) {
        clearInterval(timeInterval);
    }
    if (!isBreak) {
        // If it's not a break time, start work timer
        timeInterval = setInterval(updateTimer, 1000);
    } else {
        // If it's break time, start break timer
        timeInterval = setInterval(breakTimer, 1000);
    }
    audio.pause();
}

//starting work time
function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timeInterval);
            $('h2').text('Take a Break');
            timerDisplay.text('05:00');
            minutes = 5;
            seconds = 0;
            isBreak = true;
            startButton.prop('disabled', false); // Enable start button for the break
            audio.play();
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    timerDisplay.text(`${padTime(minutes)}:${padTime(seconds)}`);
}

//starting break time
function breakTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timeInterval);
            timerDisplay.text('00:00');
            isBreak = false;
            startButton.prop('disabled', false); // Enable start button for the next work session
            audio.play();
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    timerDisplay.text(`${padTime(minutes)}:${padTime(seconds)}`);
}


//resetting the timer
function resetTimer() {
    $('h2').text('Get Working');
    clearInterval(timeInterval);
    minutes = 25;
    seconds = 0;
    isBreak = false;
    startButton.prop('disabled', false);
    timerDisplay.text(`${padTime(minutes)}:${padTime(seconds)}`);
    audio.pause();
}


//padding time (if 1 the show 01)
function padTime(time) {
    return time.toString().padStart(2, '0');
}
