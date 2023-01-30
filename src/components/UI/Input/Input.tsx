import { useTranslation } from 'react-i18next';

import { InputProps } from '@interfaces/interfaces';
import { InputTypes } from '@constants/text/text';
import classes from './Input.module.scss';

export const Input = (props: InputProps) => {
  const { t } = useTranslation();

  return (
    <div className={classes.Input}>
      <label htmlFor={props.labelName}>{t(props.labelName)}</label>
      <input
        {...props.register(props.label, { ...props.validation })}
        type={props.type || InputTypes.text}
        id={props.labelName}
      />
      {props.error && <span>{t(props.error)}</span>}
    </div>
  );
};
