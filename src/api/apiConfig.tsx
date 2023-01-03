import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDk_pqhC_XlgZYUOJp3KjwsTwNUMrMg_Vw',
  authDomain: 'mini-paint-924ca.firebaseapp.com',
  databaseURL:
    'https://mini-paint-924ca-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'mini-paint-924ca',
  storageBucket: 'mini-paint-924ca.appspot.com',
  messagingSenderId: '416135286735',
  appId: '1:416135286735:web:4f8b38a8f26077856e8cba',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
