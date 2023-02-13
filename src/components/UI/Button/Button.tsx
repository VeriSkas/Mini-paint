import { FC } from 'react';

import { ButtonProps } from '@interfaces/interfaces';
import classes from './Button.module.scss';

export const Button: FC<ButtonProps> = ({
  type,
  onClick,
  disabled,
  children,
}) => {
  const cls = [classes.Button, classes[type || '']];
  const clickedBtn = onClick ? true : false;

  return (
    <>
      {clickedBtn ? (
        <button
          className={cls.join(' ')}
          onClick={() => onClick?.()}
          disabled={disabled}
        >
          {children}
        </button>
      ) : (
        <button className={cls.join(' ')} disabled={disabled}>
          {children}
        </button>
      )}
    </>
  );
};
