import { User } from 'firebase/auth';
import { UseFormRegister } from 'react-hook-form';

import { store } from '../store/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface Inputs {
  [key: string]: string;
}

export interface IInput {
  value: string;
  type: string;
  label: string;
  labelName: string;
  validation: {
    [key: string]:
      | { value: number | boolean | RegExp, message: string }
      | ((value: string) => boolean | string),
  };
}

export interface InputProps {
  label: string;
  labelName: string;
  type: string;
  value: string;
  validation: any;
  register: UseFormRegister<Inputs>;
  error: string | undefined;
}

export interface ButtonProps {
  type?: string;
  onClick?: any;
  disabled?: boolean;
  children?: string;
}

export interface DrawBoardProps {
  mouseUp: (position: { x: number, y: number }) => void;
  mouseDown: (position: { x: number, y: number }) => void;
  draw: (
    context: CanvasRenderingContext2D,
    mousePosition: MousePosition
  ) => void;
  takeCanvasData: (canvas: HTMLCanvasElement) => void;
}

export interface SelectProps {
  onChange: any;
  value: string | '';
  options: { value: string, id: string }[] | [];
  labelText: string;
  type?: string;
  emptyField?: boolean;
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
