import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomers } from '../../../redux/firebase/firebase';

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
    <div className="flex flex-wrap justify-center p-4">
      {customers &&
        customers.map((customer, index) => (
          <div
            key={index}
            className="m-4 max-w-xs cursor-pointer overflow-hidden rounded-lg bg-white shadow-xl"
            onClick={() => handleCardClick(customer)}
          >
            <div className="px-4 py-2">
              <h2 className="mb-2 text-2xl font-bold text-gray-800">
                {customer.name}
              </h2>
              <p className="text-gray-600">{customer.email}</p>
            </div>
            <div className="mt-2 bg-gray-100 px-4 py-2">
              <div className="mb-1 flex items-center justify-center text-sm font-bold text-gray-700">
                Click to Add
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default GetCustomers;
