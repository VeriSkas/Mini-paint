import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '@components/UI/Button/Button';
import { Input } from '@components/UI/Input/Input';
import { Notification } from '@components/UI/Notification/Notification';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { inputs } from '@constants/constants';
import { Inputs, NotificationType } from '@interfaces/interfaces';
import {
  ButtonTypes,
  ErrorMessages,
  LinkText,
  NotificationTypeString,
  TitleText,
} from '@constants/text/text';
import { removeError, signUpUser } from '@store/userSlice';
import classes from './SignUp.module.scss';

export const SignUp = (props: { theme: string }) => {
  const cls = `${classes.SignUp} ${classes[props.theme]}`;
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.users.error);
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'all',
  });
  const passwordValue = watch('password');
  const password2Value = watch('password2');
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  useEffect(() => {
    if (error) {
      const errorNotification: NotificationType = {
        type: NotificationTypeString.error,
        text: error,
      };

      setNotification(() => ({ ...errorNotification }));
    }
  }, [error]);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(() => null);
        dispatch(removeError());
      }, 5000);
    }
  }, [error, notification]);

  const renderInputs = () => {
    const signUpInputs = [
      { ...inputs.nickname },
      { ...inputs.email },
      { ...inputs.password },
      { ...inputs.password2 },
    ];

    signUpInputs[3].validation.validate = (value) =>
      value === passwordValue || ErrorMessages.inputPassword2;

    return signUpInputs.map((input) => {
      return (
        <Input
          key={input.label}
          type={input.type}
          value={input.value}
          label={input.label}
          labelName={input.labelName}
          validation={input.validation}
          register={register}
          error={
            password2Value === passwordValue && input.label === 'password2'
              ? ''
              : errors[input.label]?.message
          }
        />
      );
    });
  };

  const onSubmit = (data: Inputs) => {
    const email = data.email;
    const password = data.password;
    const nickname = data.nickname;

    dispatch(signUpUser({ nickname, email, password }));
    reset();
  };

  return (
    <>
      <div className={cls}>
        <div className={classes.SignUpContainer}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.SignUpForm}
          >
            <h1>{TitleText.signUp}</h1>
            {renderInputs()}
            <div className={classes.SignUpFormBtns}>
              <Button type={ButtonTypes.success} disabled={!isValid}>
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
