// CustomerEnterDetails.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerEnterDetails = ({ details, customerId }) => {
  const navigate = useNavigate();

  const handleClick = (cusDate) => {
    console.log('cusDate', cusDate);
    navigate(`/customer-full-details/${customerId}/${cusDate}`);
  };
  if (!details) {
    return <p>No details available.</p>;
  }

  const detailsArray = Object.entries(details)
    .flatMap(([date, detailsOnDate]) =>
      Object.values(detailsOnDate).map((detail) => ({
        ...detail,
        id: Object.keys(detailsOnDate).find(
          (key) => detailsOnDate[key] === detail,
        ),
      })),
    )
    .reduce((unique, item) => {
      return unique.find((detail) => detail.cusDate === item.cusDate)
        ? unique
        : [...unique, item];
    }, [])
    .sort((a, b) => {
      const aTime = new Date(
        a.cusDate.split('-').reverse().join('-'),
      ).getTime();
      const bTime = new Date(
        b.cusDate.split('-').reverse().join('-'),
      ).getTime();
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
          {detailsArray.map((detail) => (
            <tr
              key={detail.id}
              onClick={() => handleClick(detail.cusDate)}
              className="cursor-pointer"
            >
              <td className="whitespace-nowrap px-6 py-4">{detail.cusDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerEnterDetails;
