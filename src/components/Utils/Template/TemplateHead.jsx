import React from 'react';
import img from '../../../Image/Murgan.jpg';

const TemplateHead = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-around sm:flex-row">
        <div className="flex items-center gap-x-5">
          <div className=" h-20 w-20 rounded-full">
            <img src={img} alt="Murgan" className="rounded-full" />
          </div>
          <div className="flex flex-col p-5">
            <h1 className="font-mono text-2xl font-medium text-red-500">
              Sri Karguvel Ayyanar
            </h1>
            <p className="font-mono text-lg text-blue-700"> Mechine Cuttings</p>
            <p className="font-mono text-xs">423, 16 A</p>
            <p className="font-mono text-xs">RJP Complex</p>
            <p className="font-mono text-xs">Thomas Street</p>
            <p className="font-mono text-xs">Coimbatore</p>
            <a href="tel:+919442391161" className="font-mono text-xs">
              Ph:{' '}
              <span className="font-mono text-xs text-emerald-400">
                {' '}
                9443291161{' '}
              </span>
            </a>
            <a
              href="mailto:mohankarguvel79@gmail.com"
              className="font-mono text-xs"
            >
              Email:{' '}
              <span className="font-mono text-xs text-emerald-400">
                {' '}
                mohankarguvel@gmail.com
              </span>
            </a>
          </div>
        </div>
        <div className="text-sky-600">
          <p className="font-serif text-5xl font-semibold">INVOICE</p>
        </div>
      </div>
      <hr className="mt-7 w-full border-t-red-200 sm:mt-0" />
    </div>
  );
};

export default TemplateHead;
