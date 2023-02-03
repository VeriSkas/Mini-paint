import { FC } from 'react';

import { ButtonProps } from '@interfaces/interfaces';
import classes from './Button.module.scss';

export const Button: FC<ButtonProps> = (props) => {
  const cls = [classes.Button, classes[props.type || '']];
  const clickedBtn = props.onClick ? true : false;

  return (
    <>
      {clickedBtn ? (
        <button
          className={cls.join(' ')}
          onClick={() => props.onClick?.()}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      ) : (
        <button className={cls.join(' ')} disabled={props.disabled}>
          {props.children}
        </button>
      )}
    </>
  );
};
