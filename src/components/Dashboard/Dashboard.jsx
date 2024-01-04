import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import GetCustomers from './Customers/GetCustomers';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/add-customers');
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <GetCustomers />
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center justify-center">
            <button
              onClick={handleCreate}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
            >
              Create New Customer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
