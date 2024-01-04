import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import {
  getCustomer,
  getCustomerDetail,
} from '../../../redux/firebase/firebase';
import Navbar from '../../Navbar/Navbar';
import Toast from '../../Utils/Toast';

const View = () => {
  const { customerId, detailId } = useParams();
  const [details, setDetails] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    getCustomer(customerId).then(setCustomer);
    getCustomerDetail(customerId, detailId).then(setDetails);
  }, [customerId, detailId]);

  const handleExportClick = () => {
    const customerDetailsElement = document.getElementById('customer-details');
    html2canvas(customerDetailsElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.download = `${customer.name}.jpeg`;
      link.href = imgData;
      link.click();
    });
    setToastMessage('Download successful');
  };

  if (!details || !customer) {
    return <div>Loading...</div>;
  }

  let formattedDate = 'N/A';
  if (typeof details.date === 'string') {
    const [year, month, day] = details.date.split('-');
    formattedDate = `${day}/${month}/${year}`;
  }

  return (
    <>
      <Toast
        message={toastMessage}
        isVisible={!!toastMessage}
        setIsVisible={setToastMessage}
      />

      <Navbar backRoute="/getCustomer" customer={customer} />
      <div className="flex h-screen items-center justify-center">
        <div
          id="customer-details"
          className="m-3 mx-auto max-w-md overflow-hidden rounded-xl bg-white p-5 shadow-md md:max-w-2xl"
        >
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            Name: {customer.name}{' '}
          </h2>
          <p>Email: {customer.email}</p>{' '}
          <div className="relative m-4 rounded-lg bg-white p-4 shadow-md">
            <p className="mb-2">
              <strong className="text-gray-700">Date:</strong> {formattedDate}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Number of Pieces:</strong>{' '}
              {details.numOfPieces}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Total Weight:</strong>{' '}
              {details.totalWeight}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Delivery:</strong>{' '}
              {details.delivery}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Wastage:</strong>{' '}
              {details.wastage}
            </p>
            <p className="mb-2">
              <strong className="text-gray-700">Balance:</strong>{' '}
              {details.balance}
            </p>
            <hr className="my-4" />
          </div>
          <button onClick={handleExportClick}>Download</button>
        </div>
      </div>
    </>
  );
};

export default View;
