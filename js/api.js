const API_URL_FOR_GET_DATA = 'https://cors-anywhere.herokuapp.com/https://pastebin.com/raw/u2xYtrMp';



fetch(API_URL_FOR_GET_DATA)
  .then(response => response.json())
  .then(form => {
    renderSimilarField(form);
  })


const form = document.querySelector('.user-form__form');




const createFormField = fieldform => {
  const fieldset = document.createElement('fieldset');
  fieldset.classList.add('form__element');

  const label = document.createElement('label');
  label.classList.add('form__label');
  label.setAttribute('for', fieldform.inputs[0].id);
  label.textContent = fieldform.label;
  fieldset.appendChild(label);

  fieldform.inputs.forEach(input => {
    const inputField = document.createElement('input');
    inputField.classList.add('.form__input');
    inputField.setAttribute('id', input.id);
    inputField.setAttribute('name', input.id);
    inputField.setAttribute('type', input.type);
    inputField.setAttribute('min', input.min);
    inputField.setAttribute('max', input.max);
    inputField.setAttribute('placeholder', input.placeholder);
    fieldset.appendChild(inputField);
  })
  form.appendChild(fieldset);
}


const renderSimilarField = form => {

  form.data.forEach(fieldset => {
    createFormField(fieldset);
  })
}
