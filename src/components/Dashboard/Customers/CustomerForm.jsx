import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from 'firebase/firestore';
import { addCustomerDetails } from '../../../redux/firebase/firebase';
import Navbar from '../../Navbar/Navbar';
import Toast from '../../Utils/Toast';

const CustomerForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [customer, setCustomer] = useState(null);
  const [date] = useState(new Date().toISOString().split('T')[0]);
  const [cusDate, setCusDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [numOfPieces, setNumOfPieces] = useState('');
  const [cusWeight, setCusWeight] = useState('');
  const [totalWeight, setTotalWeight] = useState('');
  const [delivery, setDelivery] = useState('');
  const [wastage, setWastage] = useState('');
  const [balance, setBalance] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    const stateCustomer = location.state?.customer;

    if (stateCustomer) {
      setCustomer(stateCustomer);
    } else {
      navigate('/getCustomer');
    }
  }, [location, navigate]);

  const calculateBalance = useCallback(() => {
    const total = parseFloat(totalWeight) || 0;
    const del = parseFloat(delivery) || 0;
    const was = parseFloat(wastage) || 0;

    const bal = total - del - was;
    setBalance(bal.toFixed(2));
  }, [totalWeight, delivery, wastage]);

  useEffect(() => {
    calculateBalance();
  }, [calculateBalance]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!customer || !customer.email) {
      console.error('Customer or customer email is undefined');
      return;
    }

    const detailsId = uuidv4();

    const details = {
      id: detailsId,
      date: new Date(Timestamp.fromDate(new Date(date)).seconds * 1000)
        .toISOString()
        .split('T')[0],
      cusDate: new Date(Timestamp.fromDate(new Date(cusDate)).seconds * 1000)
        .toISOString()
        .split('T')[0],
      numOfPieces,
      cusWeight,
      totalWeight,
      delivery,
      wastage,
      balance,
    };

    try {
      await addCustomerDetails(customer.id, details);
      setToastMessage('Details added successfully');
      setIsToastVisible(true);
      setTimeout(() => {
        navigate('/getCustomer', { state: { customer } });
      }, 3000);
    } catch (error) {
      console.error('Error updating customer: ', error);
    }
  };

  if (!customer) return null;
  return (
    <>
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        setIsVisible={setIsToastVisible}
      />
      <Navbar backRoute="/getCustomer" customer={customer} />
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="m-3 w-full max-w-4xl overflow-hidden rounded-xl bg-white p-5 shadow-md md:max-w-5xl lg:max-w-6xl">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            {customer.name}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block">
              <span className="text-gray-700">Date:</span>
              <input
                type="date"
                value={date}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">CusDate:</span>
              <input
                type="date"
                value={cusDate}
                onChange={(e) => setCusDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Number of Pieces:</span>
              <input
                type="text"
                value={numOfPieces}
                onChange={(e) => setNumOfPieces(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Customer Weight:</span>
              <input
                type="text"
                value={cusWeight}
                onChange={(e) => setCusWeight(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Total Weight:</span>
              <input
                type="text"
                value={totalWeight}
                onChange={(e) => setTotalWeight(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Delivery:</span>
              <input
                type="text"
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Wastage:</span>
              <input
                type="text"
                value={wastage}
                onChange={(e) => setWastage(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Balance:</span>
              <input
                type="text"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerForm;
