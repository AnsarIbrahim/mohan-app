import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomerFullDetails from './CustomerFullDetails';
import Navbar from '../../Navbar/Navbar';
import { getCustomer } from '../../../redux/firebase/firebase';

const GetCustomer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(
    location.state ? location.state.customer : null,
  );

  useEffect(() => {
    if (customer) {
      getCustomer(customer.id)
        .then((data) => setCustomer(data))
        .catch((error) => console.error(error));
    }
  }, [customer]);

  const handleAddInfoClick = () => {
    if (customer) {
      navigate('/customer-form', { state: { customer } });
    } else {
    }
  };

  if (!customer) {
    return <div>No customer selected</div>;
  }

  return (
    <>
      <Navbar backRoute="/dashboard" customer={customer} />
      <div className="flex flex-wrap justify-center p-4">
        <div className="m-4 max-w-xs overflow-hidden rounded-lg bg-white shadow-xl">
          <div className="px-4 py-2">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              {customer.name}
            </h2>
            <p className="text-gray-600">{customer.email}</p>
          </div>
          <div className="mt-2 bg-gray-100 px-4 py-2">
            <div className="mb-1 flex items-center justify-center text-sm font-bold text-gray-700">
              <button onClick={handleAddInfoClick}>Add Info</button>
            </div>
          </div>
        </div>
      </div>
      <CustomerFullDetails
        detailId={customer.details}
        customerId={customer.id}
      />
    </>
  );
};

export default GetCustomer;
