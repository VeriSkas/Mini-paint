import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { OptionsType, SelectProps } from '@interfaces/interfaces';
import classes from './Select.module.scss';

export const Select: FC<SelectProps> = (props) => {
  const { t } = useTranslation();
  const cls = [classes.Select, props.type ? classes[props.type] : ''];

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
        {props.labelText}
        <select onChange={props.onChange} value={props.value}>
          {props.emptyField ? <option value=""></option> : null}
          {renderOptions(props.options)}
        </select>
      </label>
    </div>
  );
};
