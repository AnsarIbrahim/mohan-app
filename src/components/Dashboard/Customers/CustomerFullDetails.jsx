import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerFullDetails = ({ detailId, customerId }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/view-full-details/${customerId}`);
  };

  if (!detailId) {
    return <p>No details available.</p>;
  }

  const detailsArray = [...Object.values(detailId)].sort((a, b) => {
    const aTime = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const bTime = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return aTime - bTime;
  });

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
      <div className="overflow-x-auto">
        <table className="mt-4 w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Pieces
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Cus Weight
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Weight
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
            {detailsArray.map((detail, index) => (
              <tr
                key={index}
                onClick={() =>
                  navigate(`/customer-details/${customerId}/${detail.id}`)
                }
                className="cursor-pointer"
              >
                <td className="whitespace-nowrap px-6 py-4">{detail.date}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {detail.numOfPieces}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {detail.cusWeight}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {detail.totalWeight}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {detail.delivery}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {detail.wastage}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {detail.balance}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Total
              </th>
              <td className="whitespace-nowrap px-6 py-4">{totalPieces}</td>
              <td className="whitespace-nowrap px-6 py-4">{cusWeight}</td>
              <td className="whitespace-nowrap px-6 py-4">{totalWeight}</td>
              <td className="whitespace-nowrap px-6 py-4">{totalDelivery}</td>
              <td className="whitespace-nowrap px-6 py-4">{totalWastage}</td>
              <td className="whitespace-nowrap px-6 py-4">{totalBalance}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex items-center justify-end bg-white pr-6 pt-2">
        <button
          onClick={handleViewClick}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          View
        </button>
      </div>
    </>
  );
};

export default CustomerFullDetails;
