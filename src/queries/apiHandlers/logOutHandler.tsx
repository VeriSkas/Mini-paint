import { signOut } from 'firebase/auth';

import { localStorageHandler } from '@utils/localStorage';
import { auth } from '../apiConfig';

export const logOutHandler = () => {
  localStorageHandler('removeItem', 'uid');
  signOut(auth);
};
