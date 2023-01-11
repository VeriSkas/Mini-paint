import { User } from 'firebase/auth';
import { store } from '../store/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

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
  emptyField?: boolean;
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
  nickname: FormControl;
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

export interface UserInfoInDB {
  id?: string;
  uid: string;
  keyInDataBase?: string;
  email: string | null;
  nickname: string;
}

export interface ImageInDB {
  image: string;
  id?: string | null;
  userUID: string;
}

export interface OptionsType {
  value: string;
  id: string;
}

export interface NotificationType {
  type: string;
  text: string;
}

export interface SuccessLoginResponse {
  user: User;
}

export interface ErrorResponse {
  error: any;
}

export interface IInitialStateImages {
  images: ImageInDB[];
  error: null;
  loading: boolean;
}

export interface IInitialStateEditor {
  activeTool: string;
  activeColor: string;
  lineSize: number;
}

export interface IInitialStateUsers {
  users: UserInfoInDB[];
  user: UserInfoInDB | null;
  error: null | string;
  loading: boolean;
}
