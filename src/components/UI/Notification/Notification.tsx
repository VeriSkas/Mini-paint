import { useEffect, useState, FC } from 'react';
import { useTranslation } from 'react-i18next';

import { NotificationType } from '@interfaces/interfaces';
import classes from './Notification.module.scss';

export const Notification: FC<NotificationType> = ({
  type: propType,
  text: propText,
}) => {
  const { t } = useTranslation();
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const type: string = propType || 'Success';
  const text: string = propText || 'Success';
  const cls = `${classes.Notification} ${classes[type]}`;

  useEffect(() => {
    const createNotification = (notificationValue: NotificationType) => {
      setNotification(notificationValue);
      hideNotification();
    };

    if (propType && propText) {
      const newNotification: NotificationType = { type, text };

      createNotification(newNotification);
    }
  }, [propType, propText, type, text]);

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
          <h3>{t(type)}</h3>
          <p>{t(propText)}</p>
        </div>
      );
    }
    return null;
  };

  return renderNotification();
};
