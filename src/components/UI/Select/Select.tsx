import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { OptionsType, SelectProps } from '@interfaces/interfaces';
import classes from './Select.module.scss';

export const Select: FC<SelectProps> = ({
  onChange,
  value,
  options,
  labelText,
  type,
  emptyField,
}) => {
  const { t } = useTranslation();
  const cls = [classes.Select, type ? classes[type] : ''];

  const renderOptions = (options: OptionsType[] | []) => {
    return options.map((option) => (
      <option key={option.id} value={option.id}>
        {t(option.value)}
      </option>
    ));
  };

  return (
    <div className={cls.join(' ')}>
      <label>
        {labelText}
        <select onChange={onChange} value={value}>
          {emptyField ? <option value=""></option> : null}
          {renderOptions(options)}
        </select>
      </label>
    </div>
  );
};
