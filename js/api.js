const API_URL_FOR_GET_DATA = 'https://cors-anywhere.herokuapp.com/https://pastebin.com/raw/u2xYtrMp';


fetch(API_URL_FOR_GET_DATA)
  .then(response => response.json())
  .then(form => {
    renderSimilarField(form);
  })


const inputsWrapper = document.querySelector('.tiny-form__inputs-wrapper');


const createFormField = fieldform => {
  const fieldset = document.createElement('fieldset');
  fieldset.classList.add('tiny-form__element');

  /* Создание label*/
  const label = document.createElement('label');
  label.classList.add('tiny-form__label');
  label.setAttribute('for', fieldform.inputs[0].id);
  label.textContent = fieldform.label;
  fieldset.appendChild(label);


  /* Создание input*/
  fieldform.inputs.forEach(input => {
    const min = input.min;
    const max = input.max;
    const type = input.type;

    /* Проверка на пустые данные */
    const checkAtributeData = (input, atribute) => {
      if (atribute in input) {
        return input[atribute];
      }
      return '';
    }

    /* Валидация формы */
    const isRequired = (inputField, input) => {
      if ('required' in input && input.required === true) {
        inputField.required = true;
      }
    }

    const validateTextForm = (inputField, min, max) => {
      const valueLength = inputField.value.length;

      if (valueLength < min) {
        inputField.setCustomValidity('Ещё ' + (min - valueLength) + ' симв.');
      } else if (valueLength > max) {
        inputField.setCustomValidity('Удалите лишние ' + (valueLength - max) + ' симв.');
      } else {
        inputField.setCustomValidity('');
      }

      inputField.reportValidity();
    }

    const validateNumberForm = (inputField, min, max) => {
      const valueField = inputField.value;
      if (valueField < min) {
        inputField.setCustomValidity('От ' + min);
      } else if (valueField > max) {
        inputField.setCustomValidity('До ' + max);
      } else {
        inputField.setCustomValidity('');
      }
      inputField.reportValidity();
    }

    const validate = (inputField, type, min, max) => {
      if (type === 'text') {
        inputField.addEventListener('input', () => {
          validateTextForm(inputField, min, max);
        })
      } else if (type === "number") {
        inputField.addEventListener('input', () => {
          validateNumberForm(inputField, min, max);

          inputField.oninput = function () {
            const maxLength = max.toString().length;
            if (this.value.length > maxLength) {
              this.value = this.value.slice(0, maxLength);
            }
          }
        })
      }
    }


    /* Создание select или input*/
    const isInputOrSelect = input => {

      /* Создание select*/
      if (input.type === 'select') {
        const selectField = document.createElement('select');

        /* Добавление options в select*/
        const options = Object.entries(input.options)
        options.forEach(option => {
          const oneOption = document.createElement('option');
          oneOption.setAttribute('value', option[0]);
          oneOption.textContent = option[1];

          selectField.appendChild(oneOption);
        })
        selectField.classList.add('tiny-form__select');
        selectField.setAttribute('id', checkAtributeData(input, 'id'));
        selectField.setAttribute('name', checkAtributeData(input, 'id'));
        isRequired(selectField, input);

        return selectField;
      }

      /* Создание input*/
      const inputField = document.createElement('input');
      inputField.classList.add('tiny-form__input');
      inputField.setAttribute('type', checkAtributeData(input, 'type'));
      inputField.setAttribute('id', checkAtributeData(input, 'id'));
      inputField.setAttribute('name', checkAtributeData(input, 'id'));
      inputField.setAttribute('min', checkAtributeData(input, 'min'));
      inputField.setAttribute('max', checkAtributeData(input, 'max'));
      inputField.setAttribute('placeholder', checkAtributeData(input, 'placeholder'));
      isRequired(inputField, input);
      return inputField;
    }
    const isChanges = (input, key) => {
      if (key in input && input[key] === true) {
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        fieldset.appendChild(checkbox);
        const checkboxLabel = document.createElement('label');
        checkboxLabel.textContent = 'менялась ранее';
        fieldset.appendChild(checkboxLabel);

        const inputChanges = document.createElement('input');
        inputChanges.classList.add('visible-hidden')
        inputChanges.setAttribute('type', 'text');
        inputChanges.setAttribute('name', 'changes');
        inputChanges.setAttribute('min', checkAtributeData(input, 'min'));
        inputChanges.setAttribute('max', checkAtributeData(input, 'max'));
        inputChanges.setAttribute('placeholder', 'Предыдушая фамилия');
        fieldset.appendChild(inputChanges);

        checkbox.addEventListener('change', function (evt) {
          inputChanges.classList.toggle('visible-hidden');
        })
      }
    }

    const inputField = isInputOrSelect(input);
    fieldset.appendChild(inputField);

    validate(inputField, type, min, max);
    console.log('changes' in input);

    isChanges(input, 'changes');
  })


  inputsWrapper.appendChild(fieldset);
}


const renderSimilarField = form => {

  form.data.forEach(fieldset => {
    createFormField(fieldset);
  })
}
