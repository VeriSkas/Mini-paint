import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';

import { auth } from '../apiConfig';

export const signUpHandler = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
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
