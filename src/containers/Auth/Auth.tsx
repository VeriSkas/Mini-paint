import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { authHandler } from '../../api/apiHandlers/authHandler';
import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import { FormControl, FormControlsAuth } from '../../shared/interfaces';
import {
  ButtonTypes,
  ErrorMessages,
  InputLabels,
  InputTypes,
  LinkText,
  TitleText
} from '../../shared/text/text';
import { validateControl } from '../../shared/validation';
import classes from './Auth.module.scss';

export const Auth = () => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formControls, setFormControls] = useState<FormControlsAuth>({
    email: {
      value: '',
      type: InputTypes.email,
      label: InputLabels.email,
      errorMessage: ErrorMessages.inputEmail,
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      },
    },
    password: {
      value: '',
      type: InputTypes.password,
      label: InputLabels.password,
      errorMessage: ErrorMessages.inputPassword,
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6,
      },
    },
  });

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, controlName: string) => {
    const formControlsCopy: FormControlsAuth = { ...formControls };
    const control: FormControl = { ...formControlsCopy[controlName as keyof FormControlsAuth] };
    let isFormValidValue: boolean = true;

    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControlsCopy[controlName as keyof FormControlsAuth] = control;

    Object.keys(formControlsCopy).forEach((name: string) => {
      isFormValidValue = formControlsCopy[name as keyof FormControlsAuth].valid && isFormValidValue;
    });

    setIsFormValid(isFormValidValue);
    setFormControls(prevState => ({...prevState, ...formControlsCopy}));
  };

  const loginHandler = () => {
    const userEmail = formControls.email.value;
    const userPassword = formControls.password.value;

    authHandler(userEmail, userPassword);
  }

  const renderInputs = () => {
    return Object.keys(formControls as FormControlsAuth).map((controlName: string, i) => {
      const control = {...formControls[controlName as keyof FormControlsAuth]};

      return (
        <Input
          key={i}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(event, controlName)}
        />
      );
    });
  };

  return (
    <div className={classes.Auth}>
      <div className={classes.AuthContainer}>
        <form
          onSubmit={submitHandler}
          className={classes.AuthForm}
          >
          <h1>{TitleText.auth}</h1>
          {renderInputs()}
          <div className={classes.AuthFormBtns}>
            <Button
              type={ButtonTypes.success}
              onClick={loginHandler}
              disabled={!isFormValid}
            >
              {LinkText.start}
            </Button>
            <Link to={'/sign-up'}>
              <Button>{LinkText.signUp}</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
