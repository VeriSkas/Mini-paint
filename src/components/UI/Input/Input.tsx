import { InputProps } from '@interfaces/interfaces';
import { InputTypes } from '@constants/text/text';
import classes from './Input.module.scss';

export const Input = (props: InputProps) => {
  return (
    <div className={classes.Input}>
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
