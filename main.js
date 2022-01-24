const form = document.querySelector('form');
const button = document.querySelector('#liview-button');
const input = document.querySelector('#url-input');

const handleSubmit = (e) => {
  e.preventDefault();

  try {
    window.open(input.value, '_self');
  } catch (err) {
    console.error(err);
  }
};

form.addEventListener('submit', handleSubmit);
button.addEventListener('click', handleSubmit);
