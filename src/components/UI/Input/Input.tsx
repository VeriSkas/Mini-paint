import { InputProps } from '../../../shared/interfaces';
import { ErrorMessages, InputTypes } from '../../../shared/text/text';
import classes from './Input.module.scss';

function isInvalid({ valid, touched, shouldValidate }: InputProps): boolean {
  return !valid && shouldValidate && touched;
}

export const Input = (props: InputProps) => {
  const cls: string[] = [classes.Input];

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        type={props.type || InputTypes.text}
        id={props.label}
        value={props.value}
        readOnly={props.readOnly || false}
        onChange={props.onChange}
      />
      {isInvalid(props) ? (
        <span>{props.errorMessage || ErrorMessages.input}</span>
      ) : null}
    </div>
  );
};
