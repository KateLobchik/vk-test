const API_URL_FOR_GET_DATA = 'https://raw.githubusercontent.com/KateLobchik/vk-test/master/js/data.json';

fetch(API_URL_FOR_GET_DATA)
  .then(response => response.json())
  .then(form => {
    renderSimilarField(form);
  })


const formContainer = document.querySelector('.tiny-form');


var transliterate = text => {
  text = text
    .replace(/\u0401/g, 'YO')
    .replace(/\u0419/g, 'I')
    .replace(/\u0426/g, 'TS')
    .replace(/\u0423/g, 'U')
    .replace(/\u041A/g, 'K')
    .replace(/\u0415/g, 'E')
    .replace(/\u041D/g, 'N')
    .replace(/\u0413/g, 'G')
    .replace(/\u0428/g, 'SH')
    .replace(/\u0429/g, 'SCH')
    .replace(/\u0417/g, 'Z')
    .replace(/\u0425/g, 'H')
    .replace(/\u042A/g, '')
    .replace(/\u0451/g, 'yo')
    .replace(/\u0439/g, 'i')
    .replace(/\u0446/g, 'ts')
    .replace(/\u0443/g, 'u')
    .replace(/\u043A/g, 'k')
    .replace(/\u0435/g, 'e')
    .replace(/\u043D/g, 'n')
    .replace(/\u0433/g, 'g')
    .replace(/\u0448/g, 'sh')
    .replace(/\u0449/g, 'sch')
    .replace(/\u0437/g, 'z')
    .replace(/\u0445/g, 'h')
    .replace(/\u044A/g, "'")
    .replace(/\u0424/g, 'F')
    .replace(/\u042B/g, 'I')
    .replace(/\u0412/g, 'V')
    .replace(/\u0410/g, 'a')
    .replace(/\u041F/g, 'P')
    .replace(/\u0420/g, 'R')
    .replace(/\u041E/g, 'O')
    .replace(/\u041B/g, 'L')
    .replace(/\u0414/g, 'D')
    .replace(/\u0416/g, 'ZH')
    .replace(/\u042D/g, 'E')
    .replace(/\u0444/g, 'f')
    .replace(/\u044B/g, 'i')
    .replace(/\u0432/g, 'v')
    .replace(/\u0430/g, 'a')
    .replace(/\u043F/g, 'p')
    .replace(/\u0440/g, 'r')
    .replace(/\u043E/g, 'o')
    .replace(/\u043B/g, 'l')
    .replace(/\u0434/g, 'd')
    .replace(/\u0436/g, 'zh')
    .replace(/\u044D/g, 'e')
    .replace(/\u042F/g, 'Ya')
    .replace(/\u0427/g, 'CH')
    .replace(/\u0421/g, 'S')
    .replace(/\u041C/g, 'M')
    .replace(/\u0418/g, 'I')
    .replace(/\u0422/g, 'T')
    .replace(/\u042C/g, "'")
    .replace(/\u0411/g, 'B')
    .replace(/\u042E/g, 'YU')
    .replace(/\u044F/g, 'ya')
    .replace(/\u0447/g, 'ch')
    .replace(/\u0441/g, 's')
    .replace(/\u043C/g, 'm')
    .replace(/\u0438/g, 'i')
    .replace(/\u0442/g, 't')
    .replace(/\u044C/g, "'")
    .replace(/\u0431/g, 'b')
    .replace(/\u044E/g, 'yu');

  return text;
};




// Создание блока fieldset для группировки полей формы
const createFieldset = (fieldset, wrapper) => {
  const oneFieldset = document.createElement('fieldset');
  oneFieldset.classList.add('tiny-form__fieldset');
  oneFieldset.classList.add('tiny-form__fieldset-' + fieldset.id);

  if ('title' in fieldset && fieldset.title === true) {
    const title = document.createElement('h3');
    title.classList.add('tiny-form__fieldset-title');
    title.textContent = fieldset.legend;
    oneFieldset.appendChild(title);
  }

  wrapper.appendChild(oneFieldset);
}


const createFormField = fieldform => {
  const fieldset = document.querySelector('.tiny-form__fieldset-' + fieldform.fieldset);

  const appendedBeforeLatin = (mainInput) => {
    const latinLabel = document.querySelector('.tiny-form__latin-wrapper')
    if (fieldset.contains(latinLabel)) {
      fieldset.insertBefore(mainInput, latinLabel);
    } else {
      fieldset.appendChild(mainInput);
    }
  }

  // Создание label
  const label = document.createElement('label');
  label.classList.add('tiny-form__label');
  label.setAttribute('for', fieldform.inputs[0].id);
  label.textContent = fieldform.label;
  appendedBeforeLatin(label);
  // fieldset.appendChild(label);


  // Создание input
  fieldform.inputs.forEach(input => {
    const min = input.min;
    const max = input.max;
    const type = input.type;

    // Проверка на пустые данные
    const checkAtributeData = (input, atribute) => {
      if (atribute in input) {
        return input[atribute];
      }
      return '';
    }

    // Валидация формы
    const isRequired = (inputField, input) => {
      if ('required' in input && input.required === true) {
        inputField.addEventListener('input', () => {
          inputField.required = true;
        })

        const requiredFields = [];
        requiredFields.push(inputField);

        formContainer.addEventListener('submit', (evt) => {
          evt.preventDefault();
          requiredFields.forEach(field => {
            field.setAttribute('required', 'true');
          });
        })
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

    // Добавления чекбокса и текстового поля для дополнительной информации
    const isChanges = (input, key) => {
      if (key in input && input[key] === true) {
        const changesInputWrapper = document.createElement('div');
        changesInputWrapper.classList.add('tiny-form__changes-wrapper');
        appendedBeforeLatin(changesInputWrapper);

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', 'changes');
        checkbox.classList.add('tiny-form__checkbox');
        checkbox.classList.add('tiny-form__checkbox-changes');
        changesInputWrapper.appendChild(checkbox);
        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for', 'changes');
        checkboxLabel.textContent = 'менялась ранее';
        checkboxLabel.classList.add('tiny-form__label-changes');
        changesInputWrapper.appendChild(checkboxLabel);

        const inputChanges = document.createElement('input');
        inputChanges.classList.add('tiny-form__input');
        inputChanges.classList.add('tiny-form__input-changes');
        inputChanges.classList.add('hidden')
        inputChanges.setAttribute('type', 'text');
        inputChanges.setAttribute('name', 'changes');
        inputChanges.setAttribute('min', checkAtributeData(input, 'min'));
        inputChanges.setAttribute('max', checkAtributeData(input, 'max'));
        inputChanges.setAttribute('placeholder', 'Предыдушая фамилия');
        appendedBeforeLatin(inputChanges);

        checkbox.addEventListener('change', function (evt) {
          inputChanges.classList.toggle('hidden');
        })
      }
    }

    // Добавление атрибутов в input
    const addAtributes = inputName => {
      inputName.setAttribute('type', checkAtributeData(input, 'type'));
      inputName.setAttribute('id', checkAtributeData(input, 'id'));
      inputName.setAttribute('name', checkAtributeData(input, 'id'));
      inputName.setAttribute('min', checkAtributeData(input, 'min'));
      inputName.setAttribute('max', checkAtributeData(input, 'max'));
      inputName.setAttribute('placeholder', checkAtributeData(input, 'placeholder'));
      isRequired(inputName, input);
    }


    // Добавление полей для данных на латинском
    const appendInputWithLatin = mainInput => {
      appendedBeforeLatin(mainInput);
      isChanges(input, 'changes');

      const latinInputWrapper = document.querySelector('.tiny-form__latin-wrapper');

      const latinInputLabel = document.createElement('label');
      latinInputLabel.classList.add('tiny-form__label');
      latinInputLabel.classList.add('tiny-form__label-latin');
      latinInputLabel.setAttribute('for', fieldform.inputs.id + '-latin');
      latinInputLabel.textContent = fieldform.label + ' латиницей';
      latinInputWrapper.appendChild(latinInputLabel);

      const latinInput = document.createElement('input');
      latinInput.classList.add('tiny-form__input');
      latinInput.classList.add('tiny-form__input-latin');
      latinInput.setAttribute('type', checkAtributeData(input, 'type'));
      latinInput.setAttribute('id', checkAtributeData(input, 'id') + '-latin');
      latinInput.setAttribute('name', checkAtributeData(input, 'id') + '-latin');
      latinInput.setAttribute('min', checkAtributeData(input, 'min'));
      latinInput.setAttribute('max', checkAtributeData(input, 'max'));
      latinInput.setAttribute('placeholder', transliterate(checkAtributeData(input, 'placeholder')));
      isRequired(latinInput, input);
      latinInputWrapper.appendChild(latinInput);

      mainInput.addEventListener('input', () => {
        const latinInput = document.querySelector(`#${(checkAtributeData(input, 'id') + '-latin')}`);
        latinInput.value = transliterate(inputField.value);
      })
    }


    // Создание select или input
    const isInputOrSelect = input => {

      // Создание select
      if (input.type === 'select') {
        const selectField = document.createElement('select');

        // Добавление options в select
        const options = Object.entries(input.options)
        options.forEach(option => {
          const oneOption = document.createElement('option');
          oneOption.setAttribute('value', option[0]);
          oneOption.textContent = option[1];

          selectField.appendChild(oneOption);
        })
        selectField.classList.add('tiny-form__input');
        selectField.classList.add('tiny-form__input-select');
        addAtributes(selectField);
        return selectField;
      }

      // Создание input
      const inputField = document.createElement('input');
      inputField.classList.add('tiny-form__input');
      addAtributes(inputField);
      return inputField;
    }

    const addToRowWrapper = (inputField) => {
      const rowWrapper = document.querySelector('.tiny-form__row-wrapper--' + input.row);
      rowWrapper.appendChild(inputField);
    }

    const DirectedInRow = (inputField) => {
      if ("row" in input) {
        const rowWrapper = document.querySelector('.tiny-form__row-wrapper--' + input.row);
        if (!fieldset.contains(rowWrapper)) {
          const rowWrapper = document.createElement('div');
          rowWrapper.classList.add('tiny-form__row-wrapper--' + input.row);
          fieldset.appendChild(rowWrapper);
        }
        addToRowWrapper(inputField);
      } else {
        fieldset.appendChild(inputField);
      }
    }


    const inputField = isInputOrSelect(input);
    validate(inputField, type, min, max);

    // Добавление полей с латаницей или без неё
    if ("latin" in input && input.latin === true) {
      const latinInputWrapper = document.querySelector('.tiny-form__latin-wrapper');
      if (!fieldset.contains(latinInputWrapper)) {
        const latinInputWrapper = document.createElement('div');
        latinInputWrapper.classList.add('tiny-form__latin-wrapper');
        fieldset.appendChild(latinInputWrapper);
      }
      appendInputWithLatin(inputField);
    } else {
      DirectedInRow(inputField);
      isChanges(input, 'changes');
    }
  })
}


const createFormSubmit = (submit, wrapper) => {
  formContainer.setAttribute("action", submit.url)

  const submitButton = document.createElement('button');
  submitButton.classList.add('tiny-form__submit-button');
  submitButton.setAttribute('type', submit.type);
  submitButton.textContent = submit.text;
  wrapper.appendChild(submitButton);

  if ('rights' in submit && submit.rights === true) {
    const rightsWrapper = document.createElement('div');
    rightsWrapper.classList.add('tiny-form__rights-wrapper');
    wrapper.insertBefore(rightsWrapper, submitButton);

    const submitRightsCheckbox = document.createElement('input');
    submitRightsCheckbox.classList.add('tiny-form__checkbox');
    submitRightsCheckbox.classList.add('tiny-form__checkbox-rights');
    submitRightsCheckbox.setAttribute('type', 'checkbox');
    rightsWrapper.appendChild(submitRightsCheckbox);

    const submitCheckboxLabel = document.createElement('label');
    submitCheckboxLabel.classList.add('tiny-form__label-rights');
    submitCheckboxLabel.textContent = submit.rightsText;
    rightsWrapper.appendChild(submitCheckboxLabel);

    formContainer.addEventListener('submit', (evt) => {
      evt.preventDefault();
      submitRightsCheckbox.required = true;
    })
  }
}

const createTheme = () => {
  const themeWrapper = document.createElement('div');
  themeWrapper.classList.add('tiny-form__theme-wrapper');
  themeWrapper.setAttribute('title', 'Изменить тему');
  formContainer.append(themeWrapper);

  const themeButton = document.createElement('input');
  themeButton.classList.add('visible-hidden');
  themeButton.classList.add('tiny-form__theme-checkbox');
  themeButton.setAttribute('type', 'checkbox');
  themeButton.setAttribute('id', 'theme-button');
  themeWrapper.append(themeButton);

  const themelabel = document.createElement('label');
  themelabel.classList.add('tiny-form__theme-label');
  themelabel.setAttribute('for', 'theme-button');
  themeWrapper.append(themelabel);

  themeButton.addEventListener('change', function (evt) {
    formContainer.classList.toggle('tiny-form--dark-theme');
  })
}


const renderSimilarField = form => {
  const inputsWrapper = document.createElement('div');
  inputsWrapper.classList.add('tiny-form__inputs-wrapper');
  formContainer.appendChild(inputsWrapper);
  const submitWrapper = document.createElement('div');
  submitWrapper.classList.add('tiny-form__submit-wrapper');
  formContainer.appendChild(submitWrapper);

  form.fieldsets.forEach(fieldset => {
    createFieldset(fieldset, inputsWrapper);
  });

  form.data.forEach(input => {
    createFormField(input);
  });

  form.submits.forEach(submit => {
    createFormSubmit(submit, submitWrapper);
  });

  if ('theme' in form && form.theme === true) {
    createTheme();
  }
}
