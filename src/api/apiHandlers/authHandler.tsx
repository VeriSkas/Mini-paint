import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';

import { auth } from '../apiConfig';

export const authHandler = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: UserCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
};

export const logOutHandler = () => {
  signOut(auth);
};
