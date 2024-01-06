import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import {
  getCustomer,
  getAllCustomerDetails,
} from '../../../redux/firebase/firebase';
import Navbar from '../../Navbar/Navbar';

const ViewFullDetails = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [details, setDetails] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    if (customerId) {
      getCustomer(customerId).then((data) => {
        setCustomer(data);
      });

      getAllCustomerDetails(customerId).then((data) => {
        setDetails(data);
      });
    }
  }, [customerId]);

  const handleDownloadClick = () => {
    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${customer.name}.jpeg`;
      link.click();
    });
  };

  const detailsArray = Array.isArray(details) ? details : [];

  const totalPieces = detailsArray.reduce(
    (total, detail) => total + Number(detail.numOfPieces),
    0,
  );
  const cusWeight = detailsArray.reduce(
    (total, detail) => total + Number(detail.cusWeight),
    0,
  );
  const totalWeight = detailsArray.reduce(
    (total, detail) => total + Number(detail.totalWeight),
    0,
  );
  const totalDelivery = detailsArray.reduce(
    (total, detail) => total + Number(detail.delivery),
    0,
  );
  const totalWastage = detailsArray.reduce(
    (total, detail) => total + Number(detail.wastage),
    0,
  );
  const totalBalance = detailsArray.reduce(
    (total, detail) => total + Number(detail.balance),
    0,
  );

  return (
    <>
      <Navbar backRoute="/getCustomer" customer={customer} />
      <div className="overflow-x-auto rounded-lg bg-white p-6 shadow-lg">
        <table
          ref={tableRef}
          className="w-full table-auto divide-y divide-gray-200"
        >
          <caption className="p-2">
            <h1 className="text-center text-2xl font-bold text-blue-500">
              From Mohan Kumar
            </h1>
          </caption>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Pieces
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
               {customer} Weight
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
               Mohan Weight
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Delivery
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Wastage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Balance
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {Array.isArray(details) &&
              details.map((detail, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-6 py-4">{detail.date}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {detail.numOfPieces} pcs
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {detail.cusWeight} gm
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {detail.totalWeight} gm
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {detail.delivery} gm
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {detail.wastage} gm
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {detail.balance} gm
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Total
              </th>
              <td className="whitespace-nowrap px-6 py-4">{totalPieces} pcs</td>
              <td className="whitespace-nowrap px-6 py-4">{cusWeight} gm</td>
              <td className="whitespace-nowrap px-6 py-4">{totalWeight} gm</td>
              <td className="whitespace-nowrap px-6 py-4">
                {totalDelivery} gm
              </td>
              <td className="whitespace-nowrap px-6 py-4">{totalWastage} gm</td>
              <td className="whitespace-nowrap px-6 py-4">{totalBalance} gm</td>
            </tr>
          </tfoot>
        </table>
        <button
          onClick={handleDownloadClick}
          className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Download
        </button>
      </div>
    </>
  );
};

export default ViewFullDetails;
