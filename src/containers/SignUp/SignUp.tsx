import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { signUpHandler } from '../../api/apiHandlers/signUpHandler';
import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import { Notification } from '../../components/UI/Notification/Notification';
import { instanceOfErrorResponse } from '../../shared/checkObjType';
import {
  ErrorResponse,
  FormControl,
  FormControlsSignUp,
  NotificationType,
  SuccessLoginResponse
} from '../../shared/interfaces';
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
import classes from './SignUp.module.scss';

export const SignUp = () => {
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formControls, setFormControls] = useState<FormControlsSignUp>({
    nickname: {
      value: '',
      type: InputTypes.text,
      label: InputLabels.nickname,
      errorMessage: ErrorMessages.inputNickname,
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 4,
        maxLength: 32,
      },
    },
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
    password2: {
      value: '',
      type: InputTypes.password,
      label: InputLabels.password2,
      errorMessage: ErrorMessages.inputPassword2,
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6,
        isEqual: true,
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

  const registrHandler = async () => {
    const userNickname = formControls.nickname.value;
    const userEmail = formControls.email.value;
    const userPassword = formControls.password.value;
    const response: ErrorResponse | SuccessLoginResponse = await signUpHandler(userNickname, userEmail, userPassword);

    if (instanceOfErrorResponse(response)) {
      const errorNotification: NotificationType = {
        type: NotificationTypeString.error,
        text: response.error.code,
      }

      setNotification(() => ({ ...errorNotification }));
    }
  }

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, controlName: string) => {
    const formControlsCopy: FormControlsSignUp = { ...formControls };
    const control: FormControl = { ...formControlsCopy[controlName as keyof FormControlsSignUp] };
    let isFormValidValue: boolean = true;
    let password: string | null | undefined;

    control.value = event.target.value;
    password = formControlsCopy.password.value || null;
    control.touched = true;

    if (controlName === InputTypes.password && formControlsCopy.password2.touched) {
      formControlsCopy.password2.valid = validateControl(
        formControlsCopy.password2.value,
        formControlsCopy.password2.validation,
        control.value
      );
    }

    control.valid = validateControl(control.value, control.validation, password);

    formControlsCopy[controlName as keyof FormControlsSignUp] = control;

    Object.keys(formControlsCopy).forEach((name: string) => {
      isFormValidValue = formControlsCopy[name as keyof FormControlsSignUp].valid && isFormValidValue;
    });

    setIsFormValid(isFormValidValue);
    setFormControls(prevState => ({...prevState, ...formControlsCopy}));
  };

  const renderInputs = () => {
    return Object.keys(formControls as FormControlsSignUp).map((controlName: string, i) => {
      const control = {...formControls[controlName as keyof FormControlsSignUp]};

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
      <div className={classes.SignUp}>
        <div className={classes.SignUpContainer}>
          <form onSubmit={submitHandler} className={classes.SignUpForm}>
            <h1>{TitleText.signUp}</h1>
            {renderInputs()}
            <div className={classes.SignUpFormBtns}>
              <Button
                type={ButtonTypes.success}
                onClick={registrHandler}
                disabled={!isFormValid}
              >
                {LinkText.signUp}
              </Button>
              <Link to={'/auth'}>
                <Button>{LinkText.return}</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      {notification ? <Notification {...notification} /> : null}
    </>
  );
};
