import { SelectProps } from '../../../shared/interfaces';
import classes from './Select.module.scss';

export const Select = (props: SelectProps) => {
  const cls = [classes.Select, props.type ? classes[props.type] : ''];
  const renderOptions = (options: { value: string, id: string }[] | []) => {
    return options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.value}
      </option>
    ));
  };

  return (
    <div className={cls.join(' ')}>
      <label>
        {props.labelText}
        <select onChange={props.onChange} value={props.value}>
          {renderOptions(props.options)}
        </select>
      </label>
    </div>
  );
};
