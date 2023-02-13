import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { InputProps } from '@interfaces/interfaces';
import { InputTypes } from '@constants/text/text';
import classes from './Input.module.scss';

export const Input: FC<InputProps> = ({
  label,
  labelName,
  type,
  validation,
  register,
  error,
}) => {
  const { t } = useTranslation();

  return (
    <div className={classes.Input}>
      <label htmlFor={labelName}>{t(labelName)}</label>
      <input
        {...register(label, { ...validation })}
        type={type || InputTypes.text}
        id={labelName}
      />
      {error && <span>{t(error)}</span>}
    </div>
  );
};
