const timerDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
let countdown;

buttons.forEach(button => {
    button.addEventListener('click', startTimer);
});
document.customForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    const mins = this.minutes.value;
    timer(mins * 60)
})


function startTimer() {
    const time = parseInt(this.dataset.time);
    timer(time);
};

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft)
    });
};

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const finishTime = new Date(timestamp);
    const hour = finishTime.getHours();
    const minutes = finishTime.getMinutes();
    endDisplay.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
};
