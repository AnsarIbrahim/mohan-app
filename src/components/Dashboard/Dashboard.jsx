import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ViewCustomers from './Customers/ViewCustomers';
import NavSub from './Nav-Sub/NavSub';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/add-customers');
  };

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <NavSub />
        <ViewCustomers />
        <div className="mt-10 flex items-center justify-center">
          <div className="w-full max-w-md rounded-lg bg-teal-100 p-6 shadow-lg">
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
      </div>
    </>
  );
};

export default Dashboard;
