import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from '../../redux/auth/auth';
import './LoginCard.css';

const LoginCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      await signInWithEmailAndPassword(email.value, password.value);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('mail or password is wrong');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="front flex items-center justify-center rounded-2xl bg-blue-500 text-white">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="mb-4 text-lg font-semibold">Hello 👏 Mohan Kumar</h2>
            <p className="mb-4">Welcome Back 👍</p>
            <button
              className="mb-4 w-[70%] rounded-3xl bg-green-500 px-4  py-2 text-lg font-semibold"
              onClick={() => setIsFlipped(true)}
            >
              Click to Login
            </button>
          </div>
        </div>
        <div className="back flex flex-col items-center justify-center rounded-2xl bg-blue-500 text-white">
          <form className="space-y-4 p-10" onSubmit={handleLogin}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="w-full rounded border border-gray-300 px-4 py-2 text-black"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full rounded border border-gray-300 px-4 py-2 text-black"
            />
            <button
              type="submit"
              className="w-full rounded-lg  bg-green-500 px-4 py-2 font-semibold text-white"
            >
              Sign In
            </button>
          </form>
          <button
            className="w-[50%] rounded-lg  bg-red-500 p-10 px-4 py-2 text-lg font-semibold text-white"
            onClick={() => setIsFlipped(false)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
