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
  const cusWeight = detailsArray
    .reduce((total, detail) => total + Number(detail.cusWeight), 0)
    .toFixed(2);
  const totalWeight = detailsArray
    .reduce((total, detail) => total + Number(detail.totalWeight), 0)
    .toFixed(2);
  const totalDelivery = detailsArray
    .reduce((total, detail) => total + Number(detail.delivery), 0)
    .toFixed(2);
  const totalWastage = detailsArray
    .reduce((total, detail) => total + Number(detail.wastage), 0)
    .toFixed(2);
  const totalBalance = detailsArray
    .reduce((total, detail) => total + Number(detail.balance), 0)
    .toFixed(2);

  return (
    <>
      <Navbar backRoute="/getCustomer" customer={customer} />
      <div className="bg-[#06496E]" ref={tableRef}>
        <h1 className="py-5 text-center text-5xl font-bold text-white">
          Mohan Kumar
        </h1>
        <div className="-mt-20 overflow-x-auto rounded-lg bg-[#064a6ec2] p-36 shadow-lg">
          <table className="w-full table-auto border-separate border-spacing-2 divide-gray-200 rounded-lg border border-slate-400">
            <thead className="bg-[#06496E]">
              <tr>
                <th className="border border-slate-300 px-10 py-9 text-left text-sm font-medium uppercase tracking-wider text-white">
                  Date
                </th>
                <th className="border border-slate-300 px-2 py-9 text-left text-xs font-medium uppercase tracking-wider text-white">
                  Pieces
                </th>
                <th className="border border-slate-300 px-2 py-9 text-left text-xs font-medium uppercase tracking-wider text-white">
                  {customer ? customer.name : 'Loading...'} Weight
                </th>
                <th className="border border-slate-300 px-2 py-9 text-left text-xs font-medium uppercase tracking-wider text-white">
                  Mohan Weight
                </th>
                <th className="border border-slate-300 px-2 py-9 text-left text-xs font-medium uppercase tracking-wider text-white">
                  Delivery
                </th>
                <th className="border border-slate-300 px-2 py-9 text-left text-xs font-medium uppercase tracking-wider text-white">
                  Wastage
                </th>
                <th className="border border-slate-300 px-2 py-9 text-left text-xs font-medium uppercase tracking-wider text-white">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 ">
              {Array.isArray(details) &&
                details.map((detail, index) => (
                  <tr
                    key={index}
                    className={`whitespace-nowrap px-10 py-4 ${
                      index % 2 === 0 ? 'bg-[#8AABBD]' : 'bg-[#fcff3e]'
                    }`}
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '16px',
                      fontStyle: 'bold',
                    }}
                  >
                    <td className="whitespace-nowrap border border-slate-300 px-10 py-4 font-semibold">
                      {detail.date}
                    </td>
                    <td className="whitespace-nowrap border border-slate-300 px-2 py-4 font-semibold">
                      {detail.numOfPieces} pcs
                    </td>
                    <td className="whitespace-nowrap border border-slate-300 px-2 py-4 font-semibold">
                      {detail.cusWeight} gm
                    </td>
                    <td className="whitespace-nowrap border border-slate-300 px-2 py-4 font-semibold">
                      {detail.totalWeight} gm
                    </td>
                    <td className="whitespace-nowrap border border-slate-300 px-2 py-4 font-semibold">
                      {detail.delivery} gm
                    </td>
                    <td className="whitespace-nowrap border border-slate-300 px-2 py-4 font-semibold">
                      {detail.wastage} gm
                    </td>
                    <td className="whitespace-nowrap border border-slate-300 px-2 py-4 font-semibold">
                      {detail.balance} gm
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot className="bg-[#06496E] text-white">
              <tr>
                <th className="border border-slate-300 px-10 py-9 text-left text-sm font-medium uppercase tracking-wider">
                  Total
                </th>
                <td className="whitespace-nowrap border border-slate-300 px-2 py-4">
                  {totalPieces} pcs
                </td>
                <td className="whitespace-nowrap border border-slate-300 px-2 py-4">
                  {cusWeight} gm
                </td>
                <td className="whitespace-nowrap border border-slate-300 px-2 py-4">
                  {totalWeight} gm
                </td>
                <td className="whitespace-nowrap border border-slate-300 px-2 py-4">
                  {totalDelivery} gm
                </td>
                <td className="whitespace-nowrap border border-slate-300 px-2 py-4">
                  {totalWastage} gm
                </td>
                <td className="whitespace-nowrap border border-slate-300 px-2 py-4">
                  {totalBalance} gm
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-center p-3">
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
