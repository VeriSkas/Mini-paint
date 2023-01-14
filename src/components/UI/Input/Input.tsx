import { InputProps } from '../../../shared/interfaces';
import { InputTypes } from '../../../shared/text/text';
import classes from './Input.module.scss';

export const Input = (props: InputProps) => {
  const cls: string[] = [classes.Input];

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={props.labelName}>{props.labelName}</label>
      <input
        {...props.register(props.label, { ...props.validation })}
        type={props.type || InputTypes.text}
        id={props.labelName}
      />
      {props.error && <span>{props.error}</span>}
    </div>
  );
};
