import { signOut } from 'firebase/auth';

import { localStorageHandler } from '@utils/localStorage';
import { auth } from '../apiConfig';

export const logOutHandler = async (): Promise<void> => {
  localStorageHandler('removeItem', 'uid');
  await signOut(auth);
};
