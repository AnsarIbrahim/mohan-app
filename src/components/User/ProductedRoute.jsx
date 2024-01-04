import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (!auth.currentUser) {
      window.alert('You need to login to access this page.');
      navigate('/', { state: { fromProtectedRoute: true } });
    }
  }, [auth, navigate]);

  if (!auth.currentUser) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
