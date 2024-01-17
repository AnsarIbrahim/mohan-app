import React, { useState, useEffect } from 'react';
import TemplateHead from './TemplateHead';
import TemplateSubHead from './TemplateSubHead';
import TemplateBodyTotal from './TemplateBodyTotal';
import { getCustomer } from '../../../redux/firebase/firebase';

const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const TemplateBody = ({ customer, details }) => {
  const [customerName, setCustomerName] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerDetails = await getCustomer(customer);
        setCustomerName(customerDetails);
      } catch (error) {
        console.error('Failed to fetch customer:', error);
      }
    };

    fetchCustomer();
  }, [customer]);

  const allDetails = [].concat(
    ...Object.values(details).map((detailGroup) => detailGroup.details),
  );

  if (!Array.isArray(allDetails) || allDetails.length === 0) {
    return <div>No details available</div>;
  }

  const itemsPerPage = 25;
  const dataChunks = chunkArray(allDetails, itemsPerPage);

  const totalPcs = allDetails
    .reduce((total, item) => total + (Number(item.numOfPieces) || 0), 0)
    .toFixed(2);

  const totalCusWeight = allDetails
    .reduce((total, item) => total + (Number(item.cusWeight) || 0), 0)
    .toFixed(2);

  const totalUserWeight = allDetails
    .reduce((total, item) => total + (Number(item.totalWeight) || 0), 0)
    .toFixed(2);

  const totalDelivery = allDetails
    .reduce((total, item) => total + (Number(item.delivery) || 0), 0)
    .toFixed(2);

  const totalWastage = allDetails
    .reduce((total, item) => total + (Number(item.wastage) || 0), 0)
    .toFixed(2);

  const totalBalance = allDetails
    .reduce((total, item) => total + (Number(item.balance) || 0), 0)
    .toFixed(2);
  return (
    <>
      {dataChunks.map((chunk, j) => (
        <div
          key={j}
          className="template-body w-full p-2"
          style={{ pageBreakAfter: 'always' }}
        >
          <div className="w-full rounded-xl border-2 border-zinc-400">
            <TemplateHead />
            <TemplateSubHead customerId={customer} details={details} />

            <div
              key={j}
              className="justify-center overflow-auto sm:overflow-visible"
            >
              <table className="table-auto border-collapse border border-slate-400">
                <thead className="">
                  <tr className="">
                    <th className="border border-slate-300 py-1 pb-2 text-sm">
                      No
                    </th>
                    <th className="border border-slate-300 py-1 pb-2 text-sm">
                      Date
                    </th>
                    <th className="border border-slate-300 px-3 py-1 pb-2 text-sm">
                      Pcs
                    </th>
                    <th className="border border-slate-300 px-3 py-1 pb-2 text-sm">
                      {customerName && customerName.name} Wgt
                    </th>
                    <th className="border border-slate-300 px-3 py-1 pb-2 text-sm">
                      Mohan Wgt
                    </th>
                    <th className="border border-slate-300 px-3 py-1 pb-2 text-sm">
                      Delivery
                    </th>
                    <th className="border border-slate-300 px-3 py-1 pb-2 text-sm">
                      Wastage
                    </th>
                    <th className="border border-slate-300 px-3 py-1 pb-2 text-sm">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chunk.map((item, index) => (
                    <tr key={index} className="">
                      <td className="border border-slate-300 py-1 pb-2 text-center  text-sm">
                        {index + 1}
                      </td>
                      <td className="border border-slate-300 px-3 py-1 pb-2  text-center text-sm">
                        {item.cusDate.split('-').reverse().join('-')}
                      </td>
                      <td className=" border border-slate-300 py-1 pb-2  text-center text-sm">
                        {item.numOfPieces}
                      </td>
                      <td className=" border border-slate-300 py-1 pb-2  text-center text-sm">
                        {item.cusWeight}
                      </td>
                      <td className=" border border-slate-300 py-1 pb-2  text-center text-sm">
                        {item.totalWeight}
                      </td>
                      <td className=" border border-slate-300 py-1 pb-2  text-center text-sm">
                        {item.delivery}
                      </td>
                      <td className=" border border-slate-300 py-1 pb-2  text-center text-sm">
                        {item.wastage}
                      </td>
                      <td className="border border-slate-300 py-1 pb-2  text-center text-sm">
                        {item.balance}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {j === dataChunks.length - 1 && (
                  <tfoot className="p-3">
                    <tr>
                      <th className=" border border-slate-300 p-2 py-1 pb-2 text-center text-base">
                        Total
                      </th>
                      <td className=" border border-slate-300 py-1 pb-2 text-center text-base">
                        {' '}
                      </td>
                      <td className=" border border-slate-300 py-1 pb-2 text-center text-base">
                        {' '}
                        {totalPcs}
                      </td>
                      <td className=" border border-slate-300 py-1 pb-2 text-center text-base">
                        {' '}
                        {totalCusWeight}
                      </td>
                      <td className=" border border-slate-300 py-1 pb-2 text-center text-base">
                        {' '}
                        {totalUserWeight}
                      </td>
                      <td className=" border border-slate-300 py-1 pb-2 text-center text-base">
                        {' '}
                        {totalDelivery}
                      </td>
                      <td className=" border border-slate-300 py-1 pb-2 text-center text-base">
                        {' '}
                        {totalWastage}
                      </td>
                      <td className=" border border-slate-300 py-1 pb-2 text-center text-base">
                        {' '}
                        {totalBalance}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
            {j === dataChunks.length - 1 && (
              <>
                <hr className="mt-5 w-full border-t-red-200" />
                <TemplateBodyTotal
                  recive={totalUserWeight}
                  issue={totalDelivery}
                  waste={totalWastage}
                  balance={totalBalance}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default TemplateBody;
