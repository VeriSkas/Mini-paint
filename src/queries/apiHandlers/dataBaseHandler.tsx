import { off, onValue, push, ref, set } from 'firebase/database';

import { ImageInDB, UserInfoInDB } from '../../interfaces/interfaces';
import { database } from '../apiConfig';

export const createUser = async (userInfo: UserInfoInDB) => {
  const userRef = ref(database, 'users');
  const newUserRef = push(userRef);

  await set(newUserRef, userInfo);
};

export const getUsers = async (): Promise<UserInfoInDB[]> => {
  const userRef = ref(database, 'users');

  return new Promise((resolve) => {
    const users: UserInfoInDB[] = [];

    onValue(
      userRef,
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();

          users.push({ id: childKey, ...childData });
        });
        resolve(users);
      },
      {
        onlyOnce: true,
      }
    );
  });
};

export const unsubscribeUsers = async () => {
  const userRef = ref(database, 'users');

  off(userRef);
};

export const createImage = async (image: ImageInDB) => {
  const imagesRef = ref(database, 'images');
  const newImageRef = push(imagesRef);

  return await set(newImageRef, image);
};

export const getImages = async (): Promise<ImageInDB[]> => {
  const imagesRef = ref(database, 'images');

  return new Promise((resolve) => {
    const images: ImageInDB[] = [];

    onValue(
      imagesRef,
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();

          images.push({ id: childKey, ...childData });
        });
        resolve(images);
      },
      {
        onlyOnce: true,
      }
    );
  });
};

export const unsubscribeImages = async () => {
  const imagesRef = ref(database, 'images');

  off(imagesRef);
};
