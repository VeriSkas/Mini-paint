import { IInput } from '@interfaces/interfaces';
import { paths } from './paths';
import {
  ErrorMessages,
  InputLabels,
  InputLabelsName,
  InputTypes,
  LinkText,
} from './text/text';

export const screenWidth = window.innerWidth;
export const screenHeight = window.innerHeight;

export const canvasSize: { width: number, height: number } = {
  width: screenWidth <= 520 ? 300 : 500,
  height: screenHeight <= 930 ? 400 : 600,
};

export const themes: { [key: string]: string } = {
  light: 'Light',
  dark: 'Dark',
};

export const canvasColor = 'rgb(223, 223, 223)';

export const linesWidth: { value: string, id: string }[] = [
  { value: '1px', id: '1px' },
  { value: '2px', id: '2px' },
  { value: '3px', id: '3px' },
  { value: '4px', id: '4px' },
  { value: '5px', id: '5px' },
  { value: '6px', id: '6px' },
  { value: '7px', id: '7px' },
  { value: '8px', id: '8px' },
  { value: '9px', id: '9px' },
  { value: '10px', id: '10px' },
];

const regExpForEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const inputs: { [key: string]: IInput } = {
  email: {
    type: InputTypes.email,
    value: '',
    label: InputLabels.email,
    labelName: InputLabelsName.email,
    validation: {
      required: { value: true, message: ErrorMessages.inputRequired },
      pattern: {
        value: regExpForEmail,
        message: ErrorMessages.inputEmail,
      },
    },
  },
  password: {
    type: InputTypes.password,
    value: '',
    label: InputLabels.password,
    labelName: InputLabelsName.password,
    validation: {
      required: { value: true, message: ErrorMessages.inputRequired },
      minLength: { value: 6, message: ErrorMessages.inputMinLength(6) },
    },
  },
  password2: {
    type: InputTypes.password,
    value: '',
    label: InputLabels.password2,
    labelName: InputLabelsName.password2,
    validation: {
      required: { value: true, message: ErrorMessages.inputRequired },
      minLength: { value: 6, message: ErrorMessages.inputMinLength(6) },
    },
  },
  nickname: {
    type: InputTypes.text,
    value: '',
    label: InputLabels.nickname,
    labelName: InputLabelsName.nickname,
    validation: {
      required: { value: true, message: ErrorMessages.inputRequired },
      minLength: { value: 6, message: ErrorMessages.inputMinLength(6) },
      maxLength: { value: 32, message: ErrorMessages.inputMaxLength(32) },
    },
  },
};

export const LinkBtn = {
  authPage: { to: paths.signUp, text: LinkText.signUp },
  signUpPage: { to: paths.auth, text: LinkText.return },
};
