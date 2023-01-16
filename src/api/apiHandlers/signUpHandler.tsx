import { createUserWithEmailAndPassword } from 'firebase/auth';

import { ErrorResponse, SuccessLoginResponse } from '../../shared/interfaces';
import { auth } from '../apiConfig';
import { createUser } from './dataBaseHandler';

export const signUpHandler = async (userData: {
  email: string,
  nickname: string,
  password: string,
}) => {
  const { nickname, email, password } = userData;

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    const userInfo = {
      uid: user.uid,
      email: user.email,
      nickname,
    };

    createUser(userInfo);

    return { user } as SuccessLoginResponse;
  } catch (error) {
    return { error } as ErrorResponse;
  }
};
