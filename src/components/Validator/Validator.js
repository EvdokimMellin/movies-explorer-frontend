export default class FormValidator {
  constructor (settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._submitButton = this._form.querySelector(this._settings.submitButtonSelector);
  }


  _showError (input, errorText) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._settings.inputErrorClass);
    error.textContent = errorText;
  };

  _hideError (input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._settings.inputErrorClass);
    error.textContent = '';
  };

  _toggleInputErrorState (input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  };

  _hasInvalidInput () {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _deactivateButton () {
    this._submitButton.setAttribute('disabled', 'disabled');
  }

  _activateButton () {
    this._submitButton.removeAttribute('disabled');
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._deactivateButton ();
    } else {
      this._activateButton ();
    }
  };



  _setEventListeners () {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._toggleInputErrorState(input);
        this._toggleButtonState();
      });
    });
  };

  resetValidation (initialValidity) {
    this._inputList.forEach((input) => this._hideError(input));
    if (initialValidity) {
      this._activateButton();
    } else {
      this._deactivateButton();
    }
  }

  enableValidation () {
    this._toggleButtonState();
    this._setEventListeners();
  }
}
