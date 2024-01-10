import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../Navbar/Navbar';
import { getCustomer } from '../../../redux/firebase/firebase';
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
      <div className="flex flex-wrap justify-center p-4">
        <div className="m-4 max-w-xs overflow-hidden rounded-lg bg-white shadow-xl">
          <motion.div
            className="m-4 max-w-xs cursor-pointer overflow-hidden rounded-lg bg-white shadow-xl"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src={customer.photo}
              alt={customer.name}
              className="h-64 w-full object-cover"
            />
            <div className="mt-2 bg-gray-100 px-4 py-2">
              <div className="mb-1 flex items-center justify-center text-sm font-bold text-gray-700">
                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                  {customer.name}
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
      </div>
      <CustomerEnterDetails
        details={customer.details}
        customerId={customer.id}
      />
    </>
  );
};

export default GetCustomer;
