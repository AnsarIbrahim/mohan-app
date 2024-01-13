import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerEnterDetails = ({ details, customerId }) => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const detailsArray = details
    ? Object.entries(details)
        .map(([date, detailsOnDate]) => ({
          id: date,
          details: Object.values(detailsOnDate).map((detail) => ({
            ...detail,
            id: Object.keys(detailsOnDate).find(
              (key) => detailsOnDate[key] === detail,
            ),
          })),
        }))
        .sort((a, b) => {
          const aTime = new Date(a.id.split('-').reverse().join('-')).getTime();
          const bTime = new Date(b.id.split('-').reverse().join('-')).getTime();
          return bTime - aTime;
        })
    : [];

  const [filteredDetails, setFilteredDetails] = useState(detailsArray);

  const handleViewClick = () => {
    if (fromDate && toDate && Array.isArray(detailsArray)) {
      const [fromYear, fromMonth, fromDay] = fromDate.split('-').map(Number);
      const [toYear, toMonth, toDay] = toDate.split('-').map(Number);

      const formattedFromDate = new Date(fromYear, fromMonth - 1, fromDay);
      const formattedToDate = new Date(toYear, toMonth - 1, toDay);

      const filtered = detailsArray.filter((detail) => {
        const detailDate = new Date(
          detail.id.substring(0, 4),
          detail.id.substring(4, 6) - 1,
          detail.id.substring(6, 8),
        );

        if (detailDate >= formattedFromDate && detailDate <= formattedToDate) {
          return true;
        } else {
          return false;
        }
      });

      setFilteredDetails(filtered);
    }
  };

  const handleClick = (detailId) => {
    navigate(`/customer-full-details/${customerId}/${detailId}`);
  };

  const handleDownloadClick = (customerId, filteredDetails) => {
    navigate(`/template-invoice/${customerId}`, {
      state: { details: filteredDetails },
    });
  };

  if (!details) {
    return <p>No details available.</p>;
  }

  const handleResetClick = () => {
    setFromDate('');
    setToDate('');
    setFilteredDetails(detailsArray);
  };

  return (
    <div className="overflow-x-auto">
      <div className="mt-2 bg-gray-100 px-4 py-2">
        <div className="mb-1 flex items-center justify-center gap-x-4 text-sm font-bold text-gray-700">
          <button
            onClick={handleResetClick}
            className="ml-4 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Reset
          </button>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button
            onClick={handleViewClick}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            View
          </button>
          <button
            onClick={() => handleDownloadClick(customerId, filteredDetails)}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Download
          </button>
        </div>
      </div>
      <table className="mt-4 w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              CusDate
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {filteredDetails.map((detail) => {
            const formattedId = `${detail.id.substring(
              6,
              8,
            )}-${detail.id.substring(4, 6)}-${detail.id.substring(0, 4)}`;
            return (
              <tr
                key={detail.id}
                onClick={() => handleClick(detail.id)}
                className="cursor-pointer"
              >
                <td className="whitespace-nowrap px-6 py-4">{formattedId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerEnterDetails;
