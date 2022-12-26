import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

let timeId = null;

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  clearTimeout(timeId);

  const { delay, step, amount } = evt.target.elements;
  let stepValue = Number(delay.value);

  // if (delay.value < 1 || step.value < 1 || amount.value < 1) {
  //   Notiflix.Notify.failure(`All fields must be more than zero`);
  //   return;
  // }

  // Notiflix.Notify.success('Please observe the promises appear below');

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, stepValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise #${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise #${position} in ${delay}ms`);
      });
    stepValue += Number(step.value);
  }

  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    timeId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
