import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  getCustomerDetail,
  getCustomer,
  deleteCustomerDetail,
} from '../../../redux/firebase/firebase';
import Navbar from '../../Navbar/Navbar';
import Toast from '../../Utils/Toast';

const CustomerFullDetails = () => {
  const params = useParams();
  const { customerId, detailId } = params;
  const [customerDetails, setCustomerDetails] = useState([]);
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  useEffect(() => {
    if (!detailId) {
      console.error('Detail ID is undefined');
      return;
    }

    getCustomer(customerId).then(setCustomer);
    const fetchDetails = async () => {
      try {
        const details = await getCustomerDetail(customerId, detailId);
        if (details) {
          setCustomerDetails((prevDetails) => ({ ...prevDetails, ...details }));
        } else {
          console.error('No details found for this customer');
        }
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [customerId, detailId, customerDetails]);

  const handleEdit = (id) => {
    navigate(`/edit-customer-detail/${customerId}/${detailId}/${id}`);
  };

  const handleDelete = async (detail) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this customer detail?',
    );
    if (confirmDelete) {
      try {
        await deleteCustomerDetail(customerId, detail.cusDate, detail.id);
        if (customerDetails && detail.cusDate && detail.id) {
          const newCustomerDetails = { ...customerDetails };
          if (
            newCustomerDetails[detail.cusDate] &&
            newCustomerDetails[detail.cusDate][detail.id]
          ) {
            delete newCustomerDetails[detail.cusDate][detail.id];
            setCustomerDetails(newCustomerDetails);

            const remainingDetails = Object.values(newCustomerDetails).flat();
            if (remainingDetails.length === 0) {
              setIsDataEmpty(true);
            }
          }
        }
        setToastMessage('Detail deleted successfully');
        setIsToastVisible(true);
      } catch (error) {
        console.error('Error deleting detail:', error);
      }
    }
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        setIsVisible={setIsToastVisible}
      />
      <Navbar backRoute="/getCustomer" customer={customer} />
      <div className="flex w-full justify-center">
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
        </div>
      </div>
      <div className="overflow-x-auto">
        {isDataEmpty ? (
          <p>No data</p>
        ) : (
          <table className="mt-4 w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th>Date</th>
                <th>Pieces</th>
                <th>Cus Weight</th>
                <th>Weight</th>
                <th>Delivery</th>
                <th>Wastage</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {Object.values(customerDetails).length > 0 ? (
                Object.entries(customerDetails).map(
                  ([date, details], index) => {
                    return Object.entries(details).map(
                      ([id, detail], subIndex) => {
                        const key = `${date}-${id}-${subIndex}`;
                        return (
                          <tr key={key} className="cursor-pointer">
                            <td className="whitespace-nowrap px-6 py-4">
                              {detail.cusDate
                                ? detail.cusDate.split('-').reverse().join('-')
                                : ''}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {detail.numOfPieces}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {detail.cusWeight}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {detail.totalWeight}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {detail.delivery}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {detail.wastage}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {detail.balance}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent triggering row's onClick
                                  handleEdit(id);
                                }}
                                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                              >
                                Edit
                              </button>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent triggering row's onClick
                                  handleDelete(detail);
                                }}
                                className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      },
                    );
                  },
                )
              ) : (
                <tr>
                  <td colSpan="8">No details found</td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-gray-200">
              <tr>
                <th>Total</th>
                {/* Add total values based on your data structure */}
              </tr>
            </tfoot>
          </table>
        )}
      </div>
      <div className="flex items-center justify-end bg-white pr-6 pt-2"></div>
    </>
  );
};

export default CustomerFullDetails;
