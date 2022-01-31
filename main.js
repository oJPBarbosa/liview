const form = document.querySelector('form');
const input = document.querySelector('input');
const button = document.querySelector('button');

const isValidURL = (url) => {
  try {
    new URL(url);
  } catch {
    return false;
  }

  const re =
    // eslint-disable-next-line max-len
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  return re.test(url);
};

const handleSubmit = (event) => {
  event.preventDefault();

  const url = input.value;

  if (!isValidURL(url)) {
    return;
  }

  window.open(url, '_self');
};

form.addEventListener('submit', handleSubmit);
button.addEventListener('click', handleSubmit);

button.addEventListener('mouseover', () => {
  const url = input.value;

  if (!url || url === 'http://') {
    button.style.cursor = 'not-allowed';
  } else {
    button.style.cursor = 'pointer';
  }
});

const changeParentBorderColor = (element, color) => {
  element.parentElement.style.border = `2px solid ${color}`;
};

const changeParentShadowColor = (element, color) => {
  element.parentElement.style.boxShadow = `0 10px 15px -3px ${color}`;
};

input.addEventListener('focus', () => {
  changeParentBorderColor(input, '#95959c');
  changeParentShadowColor(input, '#ffffff0d');

  const url = input.value;

  if (!url) {
    input.value = 'http://';
  }
});

input.addEventListener('focusout', () => {
  const url = input.value;

  if (!isValidURL(url) && url !== 'http://' && url !== '') {
    changeParentBorderColor(input, '#cc312a');
    changeParentShadowColor(input, '#cc312a4d');
  } else if (isValidURL(url) && url !== 'http://' && url !== '') {
    changeParentBorderColor(input, '#22c55e');
    changeParentShadowColor(input, '#22c55e4d');
  } else {
    changeParentBorderColor(input, '#646465');
    changeParentShadowColor(input, '#ffffff0d');
  }
});
