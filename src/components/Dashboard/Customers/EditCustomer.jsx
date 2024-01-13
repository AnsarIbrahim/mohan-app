import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import { db } from '../../../redux/firebase/firebase';
import { updateCustomer } from '../../../redux/firebase/firebase';
import Navbar from '../../Navbar/Navbar';
import Toast from '../../Utils/Toast';

const EditCustomer = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      const customerRef = ref(db, `customers/${customerId}/details`);
      const snapshot = await get(customerRef);
      if (snapshot.exists()) {
        const customer = snapshot.val();
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.phone);
        if (customer.photo) {
          setPhoto(customer.photo);
        }
      } else {
        console.error(`No customer found with id: ${customerId}`);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const base64data = reader.result;
      setPhoto(base64data);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !phone || !photo) {
      console.error('Name, email, phone, and photo are required');
      return;
    }

    const updatedCustomer = { name, email, phone, photo };

    try {
      await updateCustomer(customerId, updatedCustomer);
      setToastMessage('Customer updated successfully');
      setIsToastVisible(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      console.error('Error updating customer: ', error);
    }
  };

  return (
    <>
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        setIsVisible={setIsToastVisible}
      />
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-2">
        <div className="relative w-full max-w-md rounded-md bg-white p-6 shadow-md">
          <button
            onClick={() => navigate('/dashboard')}
            className="absolute right-3 top-3 rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-700 focus:outline-none"
          >
            X
          </button>
          <h2 className="text-lg font-semibold text-gray-700">Edit Customer</h2>

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-2 flex flex-col">
              <label className="mb-1 text-sm text-gray-600">Name</label>
              <input
                type="text"
                className="mt-1 rounded-lg border-2 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-6 flex flex-col">
              <label className="mb-1 text-sm text-gray-600">Phone</label>{' '}
              <input
                type="tel"
                className="mt-1 rounded-lg border-2 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-6 flex flex-col">
              <label className="mb-1 text-sm text-gray-600">Email</label>
              <input
                type="email"
                className="mt-1 rounded-lg border-2 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6 flex flex-col">
              {' '}
              <label className="mb-1 text-sm text-gray-600">Photo</label>
              <input
                type="file"
                className="mt-1 rounded-lg border-2 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={handleFileChange}
              />
            </div>

            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCustomer;
