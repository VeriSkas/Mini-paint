import { NotificationType } from '@interfaces/interfaces';

export const LinkText = {
  home: 'Home',
  editor: 'Editor',
  logOut: 'Log out',
  start: 'Let`s start',
  signUp: 'Sign up',
  return: 'Return',
};

export const TitleText = {
  logoTitle: 'Mini-paint',
  auth: 'Authorization',
  signUp: 'Sign up',
  images: 'Images',
  editor: 'Editor',
};

export const ErrorMessages = {
  input: 'Enter right value',
  inputRequired: 'You should enter something',
  inputMinLength: (value: number) =>
    `You should enter ${value} symbols or more`,
  inputMaxLength: (value: number) =>
    `You should enter less then ${value} symbols`,
  inputPassword: 'Enter valid password',
  inputPassword2: 'Your passwords don`t equal',
  inputEmail: 'Enter valid email',
  inputNickname: 'Nickname must contain from 4 to 32 characters ',
  samePicture: 'This picture has already been saved',
  cleanBlank: 'You must draw something',
};

export const SuccessMessages = {
  savePicture: 'Pictures was saved',
};

export const InputTypes = {
  text: 'text',
  email: 'email',
  password: 'password',
};

export const InputLabelsName = {
  email: 'Email',
  nickname: 'Nickname',
  password: 'Password',
  password2: 'Repeat password',
};

export const InputLabels = {
  email: 'email',
  nickname: 'nickname',
  password: 'password',
  password2: 'password2',
  select: 'Choose user',
  selectLine: 'Line width:',
};

export const ButtonTypes = {
  standard: 'standard',
  success: 'success',
};

export const ContentText = {
  noImages: 'There are no images',
};

export const NotificationTypeString = {
  error: 'Error',
  success: 'Success',
};

export const Tooltip = {
  themeToggle: 'Change theme',
};

export const errorNotification: NotificationType = {
  type: NotificationTypeString.error,
  text: ErrorMessages.samePicture,
};

export const successNotification: NotificationType = {
  type: NotificationTypeString.success,
  text: SuccessMessages.savePicture,
};
