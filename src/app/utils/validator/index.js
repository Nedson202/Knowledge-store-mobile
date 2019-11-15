import Validator from 'validatorjs';
import en from 'validatorjs/src/lang/en';

import { VALIDATION_RULES } from '../../settings';

Validator.setMessages('en', en);

export const singleFieldValidation = ({ key, value }) => {
  const validationResponse = { isValid: true };

  if (VALIDATION_RULES[key]) {
    const validation = new Validator({ [key]: value }, { [key]: VALIDATION_RULES[key] });
    validationResponse.isValid = validation.passes();

    if (!validationResponse.isValid) {
      validationResponse.errors = validation.errors.all();
    }
  }

  return validationResponse;
};

export const allFieldsValidation = (data, exclude) => {
  if (exclude) exclude.map(item => delete (VALIDATION_RULES[item]));

  const validation = new Validator(data, VALIDATION_RULES);
  const validationResponse = { isValid: validation.passes() };

  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }

  return validationResponse;
};

export const handleSingleFieldValidation = (formErrors, { name, value }) => {
  const { isValid, errors } = singleFieldValidation({ key: name, value });
  let computeFormErrors = {
    formErrors: {
      ...formErrors,
      [name]: null
    },
    isValid,
  };

  if (!isValid) {
    computeFormErrors = {
      formErrors: {
        ...formErrors,
        [name]: errors[name]
      },
      isValid,
    };
  }

  return computeFormErrors;
};
