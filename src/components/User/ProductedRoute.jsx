import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useContext } from 'react';
import AuthContext from '../../redux/auth/AuthContext';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { isLoggingOutRef } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && !isLoggingOutRef.current) {
        window.alert('You need to login to access this page.');
        navigate('/', { state: { fromProtectedRoute: true } });
      }
    });

    return () => unsubscribe();
  }, [auth, navigate, isLoggingOutRef]);

  return children;
};

export default ProtectedRoute;
