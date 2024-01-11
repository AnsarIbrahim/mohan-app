import React, { useEffect, useState } from 'react';
import { getCustomer } from '../../../redux/firebase/firebase';

const TemplateSubHead = ({ customerId, details }) => {
  const [customer, setCustomer] = useState(null);
  const firstId = details[0].id;
  const lastId = details[details.length - 1].id;

  const convertIdToDate = (id) => {
    const year = id.substring(0, 4);
    const month = id.substring(4, 6);
    const day = id.substring(6, 8);
    return new Date(`${year}-${month}-${day}`);
  };

  const firstDate = convertIdToDate(firstId).toLocaleDateString();
  const lastDate = convertIdToDate(lastId).toLocaleDateString();
  const currentDate = new Date().toLocaleDateString();

  const generateInvoiceNumber = () => {
    return Math.floor(Math.random() * 900 + 100);
  };

  const invoiceNumber = generateInvoiceNumber();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerDetails = await getCustomer(customerId);
        setCustomer(customerDetails);
      } catch (error) {
        console.error('Failed to fetch customer:', error);
      }
    };

    fetchCustomer();
  }, [customerId]);

  if (!customer) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between p-2">
          <div className="ml-10">
            <h1 className="font-mono text-sm font-medium text-lime-500">
              BILL TO
            </h1>
            <h2 className="font-mono text-xl font-semibold text-blue-500">
              {customer && customer.name}
            </h2>
            <p className="font-mono text-xs">
              PH: <span className="text-indigo-300">{customer.phone}</span>
            </p>
            <p className="font-mono text-xs">
              EMAIL: <span className="text-indigo-300">{customer.email}</span>
            </p>
            <p className="font-mono text-xs">Coimbatore</p>
          </div>
          <div className="mr-5 flex items-center justify-between space-x-5">
            <div className="">
              <p className="font-mono text-xs">INVOICE #</p>
              <p className="font-mono text-xs">CREATION DATE:</p>
              <p className="font-mono text-xs">LIST OF DATES:</p>
            </div>
            <div className=" text-red-400">
              <p className="font-mono text-xs">INV-{invoiceNumber}</p>
              <p className="font-mono text-xs">{currentDate}</p>
              <p className="font-mono text-xs">
                {firstDate} to {lastDate}
              </p>
            </div>
          </div>
        </div>
        <hr className="mb-2 w-full border-t-red-200" />
      </div>
    </>
  );
};

export default TemplateSubHead;
