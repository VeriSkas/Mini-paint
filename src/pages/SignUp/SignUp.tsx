import { useState, useEffect, FC } from 'react';

import { Notification } from '@components/UI/Notification/Notification';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { inputs, LinkBtn } from '@constants/constants';
import { Inputs, NotificationType } from '@interfaces/interfaces';
import {
  LinkText,
  NotificationTypeString,
  TitleText,
} from '@constants/text/text';
import { removeError, signUpUser } from '@store/userSlice';
import classes from './SignUp.module.scss';
import { Form } from '@components/UI/Form/Form';

export const SignUp: FC<{ theme: string }> = ({ theme }) => {
  const cls = `${classes.SignUp} ${classes[theme]}`;
  const signUpInputs = [
    { ...inputs.nickname },
    { ...inputs.email },
    { ...inputs.password },
    { ...inputs.password2 },
  ];
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.users.error);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  useEffect(() => {
    error &&
      setNotification({
        type: NotificationTypeString.error,
        text: error,
      });
  }, [error]);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(() => null);
        dispatch(removeError());
      }, 5000);
    }
  }, [error, notification]);

  const onSubmit = (data: Inputs) => {
    const { email, password, nickname } = data;

    dispatch(signUpUser({ nickname, email, password }));
  };

  return (
    <>
      <div className={cls}>
        <div className={classes.SignUpContainer}>
          <Form
            link={LinkBtn.signUpPage}
            submitBtnText={LinkText.signUp}
            inputs={signUpInputs}
            titleText={TitleText.signUp}
            onSubmitHandler={(data: Inputs) => onSubmit(data)}
          />
        </div>
      </div>
      {notification ? <Notification {...notification} /> : null}
    </>
  );
};
