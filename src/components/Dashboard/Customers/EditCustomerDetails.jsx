import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  getCustomerDetail,
  editCustomerDetail,
  getCustomer,
} from '../../../redux/firebase/firebase';
import Navbar from '../../Navbar/Navbar';
import Toast from '../../Utils/Toast';

const EditCustomerDetails = () => {
  const params = useParams();
  const { customerId, detailId, id } = params;
  const [detail, setDetail] = useState({});
  const [customer, setCustomer] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const fetchedDetail = await getCustomerDetail(customerId, detailId, id);
        const fetchedCustomer = await getCustomer(customerId);

        if (fetchedDetail) {
          const dateKey = Object.keys(fetchedDetail)[0];
          const detailData = fetchedDetail[dateKey][id];
          if (detailData) {
            setDetail({ ...detailData, id });
          }
        }

        setCustomer(fetchedCustomer);
      } catch (error) {
        console.error('Error fetching detail:', error);
      }
    };

    fetchDetail();
  }, [customerId, detailId, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetail((prevDetail) => ({ ...prevDetail, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const detailToSubmit = { ...detail };
      await editCustomerDetail(customerId, detailId, detailToSubmit);
      setToastMessage('Detail updated successfully');
      setIsToastVisible(true);
      setTimeout(() => {
        navigate(`/customer-full-details/${customerId}/${detailId}`, {
          state: { customer },
        });
      }, 3000);
    } catch (error) {
      console.error('Error updating detail:', error);
    }
  };

  if (!detail || !customer) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        setIsVisible={setIsToastVisible}
      />
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="m-3 w-full max-w-4xl overflow-hidden rounded-xl bg-white p-5 shadow-md md:max-w-5xl lg:max-w-6xl">
          <h2 className="mb-5 text-2xl font-bold text-gray-900">
            Update Details : {customer.name}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block">
              <span className="text-gray-700">Number of Pieces:</span>
              <input
                type="number"
                name="numOfPieces"
                value={detail?.numOfPieces}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Total Weight:</span>
              <input
                type="number"
                name="totalWeight"
                value={detail?.totalWeight}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Delivery:</span>
              <input
                type="text"
                name="delivery"
                value={detail?.delivery}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Wastage:</span>
              <input
                type="number"
                name="wastage"
                value={detail?.wastage}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Balance:</span>
              <input
                type="number"
                name="balance"
                value={detail?.balance}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCustomerDetails;
