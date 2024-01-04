import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCustomerDetail } from '../../../redux/firebase/firebase';
import Toast from '../../Utils/Toast';

const CustomerDetails = ({ details, customerId }) => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleEditClick = (detailId) => {
    navigate(`/edit-customer-detail/${customerId}/${detailId}`);
  };

  const handleDeleteClick = async (detailId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this customer Details?',
    );
    if (confirmDelete) {
      try {
        await deleteCustomerDetail(customerId, detailId);
        setToastMessage('Detail deleted successfully');
        setIsToastVisible(true);
      } catch (error) {
        console.error('Error deleting detail:', error);
      }
    }
  };

  if (!details) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        setIsVisible={setIsToastVisible}
      />
      <div className="m-3 mx-auto max-w-md overflow-hidden rounded-xl bg-white p-5 shadow-md md:max-w-2xl">
        <h2 className="mb-5 text-2xl font-bold text-gray-900">
          Customer Details
        </h2>
        {Object.entries(details).map(([detailId, detail], index) => {
          let formattedDate = 'N/A';
          if (typeof detail.date === 'string') {
            const [year, month, day] = detail.date.split('-');
            formattedDate = `${day}/${month}/${year}`;
          }
          return (
            <div
              key={index}
              className="relative m-4 rounded-lg bg-white p-4 shadow-md"
            >
              <button
                onClick={() => handleEditClick(detailId)} // Remove customerId from the parameters
                className="absolute right-0 top-0 m-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Edit
              </button>
              <p className="mb-2">
                <strong className="text-gray-700">Date:</strong> {formattedDate}
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">Number of Pieces:</strong>{' '}
                {detail.numOfPieces}
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">Total Weight:</strong>{' '}
                {detail.totalWeight}
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">Delivery:</strong>{' '}
                {detail.delivery}
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">Wastage:</strong>{' '}
                {detail.wastage}
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">Balance:</strong>{' '}
                {detail.balance}
              </p>
              <button
                onClick={() => handleDeleteClick(detailId)}
                className="absolute bottom-10 right-0 m-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                Delete
              </button>
              <hr className="my-4" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CustomerDetails;
