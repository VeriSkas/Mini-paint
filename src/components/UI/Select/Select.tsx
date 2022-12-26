import { SelectProps } from '../../../shared/interfaces';
import classes from './Select.module.scss';

export const Select = (props: SelectProps) => {
  const renderOptions = (options: { value: string, id: string }[] | []) => {
    return options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.value}
      </option>
    ));
  };

  return (
    <div className={classes.Select}>
      <label>
        {props.labelText}
        <select onChange={props.onChange} value={props.value}>
          <option value=""></option>
          {renderOptions(props.options)}
        </select>
      </label>
    </div>
  );
};
