import {
  signInWithEmailAndPassword as signIn,
  signOut as signOutFirebase,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const signInWithEmailAndPassword = (email, password) => {
  return signIn(auth, email, password);
};

export const signOut = () => {
  return signOutFirebase(auth);
};
