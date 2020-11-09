const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

for (let button of skipButtons) {
    button.addEventListener('click', skip);
};

for (let range of ranges) {
    range.addEventListener('input', onRangeUpdate);
};

video.addEventListener('timeupdate', updateProgress);

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', evt => mouseDown ? scrub(evt) : '');
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    };
};

function updateButton() {
    toggle.textContent = this.paused ? '►' : '⏸';
};

function skip() {
    video.currentTime += parseInt(this.dataset.skip);
};

function onRangeUpdate() {
    video[this.name] = this.value;
};

function updateProgress() {
    const percent = parseFloat(video.currentTime / video.duration * 100, 2);
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(evt) {
    video.currentTime = (evt.offsetX / progress.offsetWidth * video.duration);
};
