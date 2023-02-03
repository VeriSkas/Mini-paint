import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import classes from './TextMessage.module.scss';

export const TextMessage: FC<{ text: string }> = ({ text }) => {
  const { t } = useTranslation();

  return (
    <div className={classes.TextMessage}>
      <h2>{t(text)}</h2>
    </div>
  );
};
