import React, { useEffect } from 'react';

const Toast = ({ message, isVisible, setIsVisible }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, setIsVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed right-0 top-10 m-4 rounded bg-green-500 p-2 text-white">
      {message}
    </div>
  );
};

export default Toast;
