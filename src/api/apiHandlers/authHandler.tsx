import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';

import { ErrorResponse, SuccessLoginResponse } from '../../shared/interfaces';
import { localStorageHandler } from '../../shared/localStorage';
import { auth } from '../apiConfig';

export const authHandler = async (user: {
  email: string,
  password: string,
}) => {
  const { email, password } = user;
  const result = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: UserCredential): SuccessLoginResponse => ({
      user: userCredential.user,
    }))
    .catch((error): ErrorResponse => ({ error }));

  return result;
};

export const logOutHandler = () => {
  localStorageHandler('removeItem', 'uid');
  signOut(auth);
};
