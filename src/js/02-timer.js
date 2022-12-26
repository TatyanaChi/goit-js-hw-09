import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  inputRef: document.querySelector('#datetime-picker'),
  timeDays: document.querySelector('.value[data-days]'),
  timeHours: document.querySelector('.value[data-hours]'),
  timeMins: document.querySelector('.value[data-minutes]'),
  timeSecs: document.querySelector('.value[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onInputDate(selectedDates[0]);
  },
};

const fp = flatpickr('#datetime-picker', options);
refs.startBtn.setAttribute('disabled', 'disabled');
let timeId = null;
const INTERVAL = 1000;

function onInputDate(selectedDates) {
  if (selectedDates <= Date.now()) {
    // alert('Please choose a date in the future');
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    refs.startBtn.removeAttribute('disabled', 'disabled');
    onStartedTimer(selectedDates);
  }
}
function onStartedTimer(selectedDates) {
  let timerValueInMs = Date.parse(selectedDates) - Date.now();
  let objTimerValue = convertMs(timerValueInMs);
  refs.startBtn.addEventListener('click', () => {
    refs.startBtn.setAttribute('disabled', 'disabled');
    refs.inputRef.setAttribute('disabled', 'disabled');
    timeId = setInterval(() => {
      if (timerValueInMs <= 0) {
        clearInterval(timeId);
        return;
      }
      objTimerValue = convertMs(timerValueInMs);
      refs.timeDays.textContent = addLeadingZero(objTimerValue.days);
      refs.timeHours.textContent = addLeadingZero(objTimerValue.hours);
      refs.timeMins.textContent = addLeadingZero(objTimerValue.minutes);
      refs.timeSecs.textContent = addLeadingZero(objTimerValue.seconds);
      timerValueInMs -= INTERVAL;
    }, INTERVAL);
  });
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
