export interface InputProps {
  label: string;
  type?: string;
  value: string;
  readOnly?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  valid: boolean;
  touched: boolean;
  shouldValidate: boolean;
  errorMessage: string;
}

export interface ButtonProps {
  type?: string;
  onClick?: any;
  disabled?: boolean;
  children?: string;
}

export interface SelectProps {
  onChange: any;
  value: string | '';
  options: { value: string, id: string }[] | [];
  labelText: string;
  type?: string;
}

export interface FormControl {
  value: string;
  type: string;
  label: string;
  errorMessage: string;
  valid: boolean;
  touched: boolean;
  validation: ValidationType;
}

export interface FormControlsAuth {
  email: FormControl;
  password: FormControl;
}

export interface FormControlsSignUp {
  email: FormControl;
  password: FormControl;
  password2: FormControl;
}

export interface ValidationType {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  isEqual?: boolean;
}

export interface Tools {
  [tool: string]: {
    path: string,
    value: string,
  };
}

export interface MousePosition {
  x: number;
  y: number;
}
