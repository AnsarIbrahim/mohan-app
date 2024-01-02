import { signInWithEmailAndPassword as signIn } from 'firebase/auth';
import auth from '../firebase/firebase';

export const signInWithEmailAndPassword = (email, password) => {
  return signIn(auth, email, password);
};
