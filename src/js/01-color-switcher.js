const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', () => {
  timer.start();
});
refs.stopBtn.addEventListener('click', () => {
  timer.stop();
});

const timer = {
  intervalId: null,
  //   isActive: false,
  start() {
    //     if (this.isActive) {
    //       return;
    //     }
    //     this.isActive = true;

    this.intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
      refs.startBtn.disabled = true;
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    // this.isActive = false;
    refs.startBtn.disabled = false;
  },
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
