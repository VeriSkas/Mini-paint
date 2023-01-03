import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';

import { localStorageHandler } from '../../shared/localStorage';
import { auth } from '../apiConfig';
import { createUser } from './dataBaseHandler';

export const signUpHandler = async (
  nickname: string,
  email: string,
  password: string
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential: UserCredential) => {
      const user = userCredential.user;
      const userInfo = {
        uid: user.uid,
        email: user.email,
        nickname,
      };

      localStorageHandler('setItem', 'uid', user.uid);
      createUser(userInfo);
      return { user };
    })
    .catch((error) => ({ error }));

  return result;
};
