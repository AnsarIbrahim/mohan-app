import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCustomers } from '../../../redux/firebase/firebase';
import Navbar from '../../Navbar/Navbar';

const GetCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      const customersData = await getCustomers();
      if (Array.isArray(customersData)) {
        setCustomers(customersData);
      } else if (customersData && typeof customersData === 'object') {
        setCustomers(Object.values(customersData));
      } else {
        setCustomers([]);
      }
    };

    fetchCustomers();
  }, []);

  const handleCardClick = (customer) => {
    navigate('/getCustomer', { state: { customer } });
  };

  return (
    <>
      <Navbar backRoute="/dashboard" />
      <div className="flex flex-wrap justify-center p-4">
        {customers &&
          customers.map((customer, index) => (
            <motion.div
              key={index}
              className="m-4 max-w-xs cursor-pointer overflow-hidden rounded-lg bg-white shadow-xl"
              onClick={() => handleCardClick(customer)}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
          ))}
      </div>
    </>
  );
};

export default GetCustomers;
