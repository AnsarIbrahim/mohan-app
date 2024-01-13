import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../Navbar/Navbar';
import { getCustomer, deleteCustomer } from '../../../redux/firebase/firebase';
import CustomerEnterDetails from './CustomerEnterDetails';

const GetCustomer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(
    location.state ? location.state.customer : null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customer) {
      getCustomer(customer.id)
        .then((data) => {
          setCustomer(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [customer]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(customer.id);
        navigate('/getCustomers');
      } catch (error) {
        console.error('Failed to delete customer:', error);
      }
    }
  };

  const handleEditClick = () => {
    if (customer) {
      navigate(`/edit-customer/${customer.id}`);
    }
  };

  const handleAddInfoClick = () => {
    if (customer) {
      navigate('/customer-form', { state: { customer } });
    } else {
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar backRoute="/getCustomers" customer={customer} />

      <div className="flex flex-wrap items-center justify-around p-4">
        <div className="ml-4 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
          <button onClick={handleEditClick}>Edit</button>
        </div>
        <div className="m-4 max-w-xs overflow-hidden rounded-lg bg-white shadow-xl">
          <motion.div
            className="m-4 max-w-xs cursor-pointer overflow-hidden rounded-lg bg-white shadow-xl"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src={customer?.photo}
              alt={customer?.name}
              className="h-64 w-full object-cover"
            />
            <div className="mt-2 bg-gray-100 px-4 py-2">
              <div className="mb-1 flex items-center justify-center text-sm font-bold text-gray-700">
                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                  {customer?.name}
                </h2>
              </div>
            </div>
          </motion.div>
          <div className="mt-2 bg-gray-100 px-4 py-2">
            <div className="mb-1 flex items-center justify-center text-sm font-bold text-gray-700">
              <button
                onClick={handleAddInfoClick}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Add Info
              </button>
            </div>
          </div>
        </div>
        <div className="ml-4 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <CustomerEnterDetails
        customerId={customer?.id}
        details={customer?.details}
      />
    </>
  );
};

export default GetCustomer;
