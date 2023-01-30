import { useEffect, useState } from 'react';

import { NotificationType } from '../../../interfaces/interfaces';
import classes from './Notification.module.scss';

export const Notification = (props: NotificationType) => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const type: string = props.type || 'Success';
  const text: string = props.text || 'Success';
  const cls = `${classes.Notification} ${classes[type]}`;

  useEffect(() => {
    const createNotification = (notificationValue: NotificationType) => {
      setNotification(notificationValue);
      hideNotification();
    };

    if (props.type && props.text) {
      const newNotification: NotificationType = { type, text };

      createNotification(newNotification);
    }
  }, [props.type, props.text, type, text]);

  const hideNotification = () => {
    const timeout = setTimeout(() => {
      setNotification(null);
      clearTimeout(timeout);
    }, 5000);
  };

  const renderNotification = () => {
    if (notification) {
      return (
        <div className={cls}>
          <h3>{type}</h3>
          <p>{props.text}</p>
        </div>
      );
    }
    return null;
  };

  return renderNotification();
};
