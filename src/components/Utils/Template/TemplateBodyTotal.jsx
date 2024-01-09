import React from 'react';

const TemplateBodyTotal = () => {
  return (
    <>
      <div className="mb-3 flex items-center justify-center">
        <table className="mt-5 w-[50%] table-auto border-separate rounded-lg border border-slate-400">
          <tbody>
            <tr>
              <th className="rounded-lg border border-slate-300 py-1  pb-2 text-sm">
                Received
              </th>
              <td className="rounded-lg border border-slate-300 py-1  pb-2 text-center text-sm">
                100
              </td>
            </tr>
            <tr>
              <th className="rounded-lg border border-slate-300 py-1  pb-2 text-sm">
                Return
              </th>
              <td className="rounded-lg border border-slate-300 py-1  pb-2 text-center text-sm">
                98
              </td>
            </tr>
            <tr>
              <th className="rounded-lg border border-slate-300 py-1  pb-2 text-sm">
                Wastage
              </th>
              <td className="rounded-lg border border-slate-300 py-1  pb-2 text-center text-sm">
                1
              </td>
            </tr>
            <tr>
              <th className="rounded-lg border border-slate-300 py-1  pb-2 text-sm">
                Balance
              </th>
              <td className="rounded-lg border border-slate-300 py-1  pb-2 text-center text-sm">
                1
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TemplateBodyTotal;
