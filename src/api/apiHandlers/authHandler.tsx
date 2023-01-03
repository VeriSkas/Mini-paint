import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';

import { localStorageHandler } from '../../shared/localStorage';

import { auth } from '../apiConfig';

export const authHandler = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: UserCredential) => {
      const user = userCredential.user;

      localStorageHandler('setItem', 'uid', user.uid);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
};

export const logOutHandler = () => {
  localStorageHandler('removeItem', 'uid');
  signOut(auth);
};
