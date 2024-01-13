import React from 'react';

const TemplateBodyTotal = ({ recive, issue, waste, balance }) => {
  const textareaRef = React.useRef();
  return (
    <>
      <div className="mb-3 flex items-center justify-around">
        <div className="flex items-center justify-center">
          <textarea
            ref={textareaRef}
            name="text"
            cols="30"
            rows="10"
            className="h-32 w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none"
            placeholder="Enter text here..."
          ></textarea>
        </div>
        <table className="mt-5 w-[50%] table-auto border-separate rounded-lg border border-slate-400">
          <tbody>
            <tr>
              <th className="rounded-lg border border-slate-300 py-1  pb-2 text-sm">
                Received
              </th>
              <td className="rounded-lg border border-slate-300 py-1  pb-2 text-center text-sm">
                {recive}
              </td>
            </tr>
            <tr>
              <th className="rounded-lg border border-slate-300 py-1  pb-2 text-sm">
                Issued
              </th>
              <td className="rounded-lg border border-slate-300 py-1  pb-2 text-center text-sm">
                {issue}
              </td>
            </tr>
            <tr>
              <th className="rounded-lg border border-slate-300 py-1  pb-2 text-sm">
                Wastage
              </th>
              <td className="rounded-lg border border-slate-300 py-1  pb-2 text-center text-sm">
                {waste}
              </td>
            </tr>
            <tr>
              <th className="rounded-lg border border-slate-300 py-1  pb-2 text-sm">
                Balance
              </th>
              <td className="rounded-lg border border-slate-300 py-1  pb-2 text-center text-sm">
                {balance}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TemplateBodyTotal;
