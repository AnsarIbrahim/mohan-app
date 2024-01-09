import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCustomers } from '../../../redux/firebase/firebase';
import './ViewCustomer.css';

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (containerRef.current) {
        if (
          containerRef.current.scrollLeft <
          containerRef.current.scrollWidth - containerRef.current.clientWidth
        ) {
          containerRef.current.scrollLeft += 1;
        } else {
          containerRef.current.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getCustomers().then((data) => {
      if (typeof data === 'object' && data !== null) {
        setCustomers(Object.values(data));
      } else {
        console.error('getCustomers did not return an object:', data);
      }
    });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center overflow-hidden">
        <div
          ref={containerRef}
          className="hide-scrollbar flex  overflow-x-scroll"
        >
          {customers &&
            customers.map((customer, index) => (
              <motion.div
                key={index}
                className="motion-div m-4 max-w-xs cursor-pointer overflow-hidden rounded-lg bg-white shadow-xl"
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
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
        <div className="mb-6 mt-10">
          <Link
            to="/getCustomers"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            View Customers
          </Link>
        </div>
      </div>
    </>
  );
};

export default ViewCustomers;
