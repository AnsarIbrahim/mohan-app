// CustomerEnterDetails.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerEnterDetails = ({ details, customerId }) => {
  const navigate = useNavigate();

  const handleClick = (detailId) => {
    navigate(`/customer-full-details/${customerId}/${detailId}`);
  };

  if (!details) {
    return <p>No details available.</p>;
  }

  const detailsArray = Object.entries(details)
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
    });

  return (
    <div className="overflow-x-auto">
      <table className="mt-4 w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              CusDate
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {detailsArray.map((detail) => {
            const formattedId = `${detail.id.substring(
              6,
              8,
            )}/${detail.id.substring(4, 6)}/${detail.id.substring(0, 4)}`;
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
