import { useEffect, useState, FC } from 'react';

import { Notification } from '@components/UI/Notification/Notification';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { inputs, LinkBtn } from '@constants/constants';
import { Inputs, NotificationType } from '@interfaces/interfaces';
import {
  LinkText,
  NotificationTypeString,
  TitleText,
} from '@constants/text/text';
import { removeError, signInUser } from '@store/userSlice';
import classes from './Auth.module.scss';
import { Form } from '@components/UI/Form/Form';

export const Auth: FC<{ theme: string }> = ({ theme }) => {
  const cls = `${classes.Auth} ${classes[theme]}`;
  const authInputs = [{ ...inputs.email }, { ...inputs.password }];
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
    const { email, password } = data;

    dispatch(signInUser({ email, password }));
  };

  return (
    <>
      <div className={cls}>
        <div className={classes.AuthContainer}>
          <Form
            inputs={authInputs}
            link={LinkBtn.authPage}
            onSubmitHandler={(data: Inputs) => onSubmit(data)}
            titleText={TitleText.auth}
            submitBtnText={LinkText.start}
          />
        </div>
      </div>
      {notification ? <Notification {...notification} /> : null}
    </>
  );
};
