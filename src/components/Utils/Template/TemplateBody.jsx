import React from 'react';
import TemplateHead from './TemplateHead';
import TemplateSubHead from './TemplateSubHead';
import TemplateBodyTotal from './TemplateBodyTotal';

const generateData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      no: i,
      date: `2024/01/${i < 10 ? '0' + i : i}`,
      pcs: i,
      cusWeight: i * 2,
      userWeight: i * 3,
      delivery: i * 4,
      wastage: i * 5,
      balance: i * 6,
    });
  }
  return data;
};

const chunkArray = (arr, size) => {
  const result = [];
  while (arr.length) {
    result.push(arr.splice(0, size));
  }
  return result;
};

const TemplateBody = () => {
  const data = generateData();
  const dataChunks = chunkArray(data, 25);
  return (
    <>
      {dataChunks.map((chunk, i) => (
        <div key={i} className="template-body p-2">
          <div className="rounded-xl border-2 border-zinc-400">
            <TemplateHead />
            <TemplateSubHead />
            <div className="flex flex-col items-center justify-center">
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
                      Cus Weight
                    </th>
                    <th className="border border-slate-300 px-3 py-1 pb-2 text-sm">
                      User Weight
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
                        {item.no}
                      </td>
                      <td className="border border-slate-300 px-3 py-1 pb-2  text-center text-sm">
                        {item.date}
                      </td>
                      <td className=" border border-slate-300 py-1 pb-2  text-center text-sm">
                        {item.pcs}
                      </td>
                      <td className=" border border-slate-300 py-1 pb-2  text-center text-sm">
                        {item.cusWeight}
                      </td>
                      <td className=" border border-slate-300 py-1 pb-2  text-center text-sm">
                        {item.userWeight}
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
                      10
                    </td>
                    <td className=" border border-slate-300 py-1 pb-2 text-center text-base">
                      {' '}
                      10
                    </td>
                    <td className=" border border-slate-300 py-1 pb-2 text-center text-base">
                      {' '}
                      10
                    </td>
                    <td className=" border border-slate-300 py-1 pb-2 text-center text-base">
                      {' '}
                      10
                    </td>
                    <td className=" border border-slate-300 py-1 pb-2 text-center text-base">
                      {' '}
                      10
                    </td>
                    <td className=" border border-slate-300 py-1 pb-2 text-center text-base">
                      {' '}
                      10
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <hr className="mt-5 w-full border-t-red-200" />
            <TemplateBodyTotal />
          </div>
        </div>
      ))}
    </>
  );
};

export default TemplateBody;
