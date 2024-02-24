import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { FaSignOutAlt, FaUserAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ backRoute, customer }) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = () => {
    setIsLoggingOut(true);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Prevent back button from navigating to the previous page
        window.history.pushState(null, document.title, window.location.href);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      })
      .finally(() => {
        setIsLoggingOut(false);
      });
  };

  const handleBack = () => {
    if (backRoute) {
      navigate(backRoute, { state: { customer } });
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center justify-between bg-blue-500 p-4 text-white">
      {location.pathname !== '/' && (
        <FaArrowLeft onClick={handleBack} className="cursor-pointer" />
      )}
      <h1>Hello Mohan Kumar 👏</h1>
      {isLoggingOut ? (
        <div>Loading...</div>
      ) : (
        <div className="relative">
          <FaUserAlt
            onClick={() => setShowPopup(!showPopup)}
            className="cursor-pointer"
          />
          {showPopup && (
            <div className="absolute right-0 mt-2 w-32 rounded-md bg-white p-2 shadow-lg">
              <div
                className="flex cursor-pointer items-center justify-center text-gray-800"
                onClick={handleSignOut}
              >
                <FaSignOutAlt />
                <span className="ml-2">Sign Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
