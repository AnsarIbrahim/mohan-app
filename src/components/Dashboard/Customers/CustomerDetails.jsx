import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  getCustomerDetail,
  deleteCustomerDetail,
  getCustomer,
} from '../../../redux/firebase/firebase';
import Toast from '../../Utils/Toast';
import Navbar from '../../Navbar/Navbar';

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const { customerId, detailId } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const detailData = await getCustomerDetail(customerId, detailId);
        setDetail(detailData);

        const fetchedCustomer = await getCustomer(customerId);
        setCustomer(fetchedCustomer);
      } catch (error) {
        console.error('Error fetching detail:', error);
      }
    };

    fetchDetail();
  }, [customerId, detailId]);

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
        setTimeout(() => {
          navigate('/getCustomer', { state: { customer } });
        }, 3000);
      } catch (error) {
        console.error('Error deleting detail:', error);
      }
    }
  };

  if (!detail) {
    return <div>Loading...</div>;
  }

  let formattedDate = 'N/A';
  if (typeof detail.date === 'string') {
    const [year, month, day] = detail.date.split('-');
    formattedDate = `${day}/${month}/${year}`;
  }

  return (
    <>
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        setIsVisible={setIsToastVisible}
      />
      <Navbar backRoute="/getCustomer" customer={customer} />
      <div
        id="customer-details"
        className="m-3 mx-auto max-w-md overflow-hidden rounded-xl bg-white p-5 shadow-md md:max-w-2xl"
      >
        <h2 className="mb-5 text-2xl font-bold text-gray-900">
          Customer Details: {customer && customer.name}
        </h2>
        <div
          key={detailId}
          className="relative m-4 rounded-lg bg-white p-4 shadow-md"
        >
          <button
            onClick={() => handleEditClick(detailId)}
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
            <strong className="text-gray-700">Customer Weight:</strong>{' '}
            {detail.cusWeight}
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
            <strong className="text-gray-700">Wastage:</strong> {detail.wastage}
          </p>
          <p className="mb-2">
            <strong className="text-gray-700">Balance:</strong> {detail.balance}
          </p>
          <button
            onClick={() => handleDeleteClick(detailId)}
            className="absolute bottom-0 right-0 m-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Delete
          </button>
          <hr className="my-4" />
          <Link to={`/view/${customerId}/${detailId}`}>
            <button>View</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
