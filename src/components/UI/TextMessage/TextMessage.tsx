import { useTranslation } from 'react-i18next';

import classes from './TextMessage.module.scss';

export const TextMessage = (props: { text: string }) => {
  const { t } = useTranslation();

  return (
    <div className={classes.TextMessage}>
      <h2>{t(props.text)}</h2>
    </div>
  );
};
