import React from 'react';

const TemplateSubHead = () => {
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between p-2">
          <div className="ml-10">
            <h1 className="font-mono text-sm font-medium text-lime-500">
              BILL TO
            </h1>
            <h2 className="font-mono text-xl font-semibold text-blue-500">
              Alagu
            </h2>
            <p className="font-mono text-xs">
              PH: <span className="text-indigo-300">8248340791</span>
            </p>
            <p className="font-mono text-xs">Coimbatore</p>
          </div>
          <div className="mr-5 flex items-center justify-between space-x-5">
            <div className="">
              <p className="font-mono text-xs">INVOICE #</p>
              <p className="font-mono text-xs">CREATION DATE:</p>
              <p className="font-mono text-xs">LIST OF DATES:</p>
            </div>
            <div className=" text-red-400">
              <p className="font-mono text-xs">INV-001</p>
              <p className="font-mono text-xs">12/12/2021</p>
              <p className="font-mono text-xs">12/12/2021 to 18/12/2021</p>
            </div>
          </div>
        </div>
        <hr className="mb-2 w-full border-t-red-200" />
      </div>
    </>
  );
};

export default TemplateSubHead;
