import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import { FormControl, FormControlsSignUp } from '../../shared/interfaces';
import { ButtonTypes, ErrorMessages, InputLabels, InputTypes, LinkText, TitleText } from '../../shared/text/text';
import { validateControl } from '../../shared/validation';
import classes from './SignUp.module.scss';

export const SignUp = () => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formControls, setFormControls] = useState<FormControlsSignUp>({
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

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const registrHandler = () => {
    
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
  );
};
