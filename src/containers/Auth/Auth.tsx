import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import { Notification } from '../../components/UI/Notification/Notification';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { inputs } from '../../constants/constants';
import { Inputs, NotificationType } from '../../interfaces/interfaces';
import {
  ButtonTypes,
  LinkText,
  NotificationTypeString,
  TitleText,
} from '../../constants/text/text';
import { removeError, signInUser } from '../../store/userSlice';
import classes from './Auth.module.scss';

export const Auth = (props: { theme: string }) => {
  const cls = `${classes.Auth} ${classes[props.theme]}`;
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.users.error);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'all',
  });

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
    const authInputs = [{ ...inputs.email }, { ...inputs.password }];

    return authInputs.map((input) => {
      return (
        <Input
          key={input.label}
          type={input.type}
          value={input.value}
          label={input.label}
          labelName={input.labelName}
          validation={input.validation}
          register={register}
          error={errors[input.label]?.message}
        />
      );
    });
  };

  const onSubmit = (data: Inputs) => {
    const email = data.email;
    const password = data.password;

    dispatch(signInUser({ email, password }));
    reset();
  };

  return (
    <>
      <div className={cls}>
        <div className={classes.AuthContainer}>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.AuthForm}>
            <h1>{TitleText.auth}</h1>
            {renderInputs()}
            <div className={classes.AuthFormBtns}>
              <Button type={ButtonTypes.success} disabled={!isValid}>
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
