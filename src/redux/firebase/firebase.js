import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyChzPySF_QhRXiY1YT4wl91aXnJbb1OwiE',
  authDomain: 'mohan-app-c4bc3.firebaseapp.com',
  databaseURL:
    'https://mohan-app-c4bc3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'mohan-app-c4bc3',
  storageBucket: 'mohan-app-c4bc3.appspot.com',
  messagingSenderId: '709743714134',
  appId: '1:709743714134:web:66fb8de10ea378b31440f7',
  measurementId: 'G-MZEKXXLXHP',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
