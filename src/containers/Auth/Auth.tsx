import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { authHandler } from '../../api/apiHandlers/authHandler';
import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import { Notification } from '../../components/UI/Notification/Notification';
import { instanceOfErrorResponse, instanceOfSuccessLoginResponse } from '../../shared/checkObjType';
import {
  ErrorResponse,
  FormControl,
  FormControlsAuth,
  NotificationType,
  SuccessLoginResponse
} from '../../shared/interfaces';
import { localStorageHandler } from '../../shared/localStorage';
import {
  ButtonTypes,
  ErrorMessages,
  InputLabels,
  InputTypes,
  LinkText,
  NotificationTypeString,
  TitleText
} from '../../shared/text/text';
import { validateControl } from '../../shared/validation';
import classes from './Auth.module.scss';

export const Auth = () => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationType | null>(null);
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

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(() => null);

      }, 5000)
    }
  }, [notification])

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
    setFormControls(prevState => ({ ...prevState, ...formControlsCopy }));
  };

  const loginHandler = async () => {
    const userEmail = formControls.email.value;
    const userPassword = formControls.password.value;
    const response: ErrorResponse | SuccessLoginResponse = await authHandler(userEmail, userPassword);

    if (instanceOfErrorResponse(response)) {
      const errorNotification: NotificationType = {
        type: NotificationTypeString.error,
        text: response.error.code,
      }

      setNotification(() => ({ ...errorNotification }));
    } else if (instanceOfSuccessLoginResponse(response)) {
      localStorageHandler('setItem', 'uid', response.user.uid);
    }
  }

  const renderInputs = () => {
    return Object.keys(formControls as FormControlsAuth).map((controlName: string, i) => {
      const control = { ...formControls[controlName as keyof FormControlsAuth] };

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
    <>
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
      {notification ? <Notification {...notification} /> : null}
    </>
  );
};
