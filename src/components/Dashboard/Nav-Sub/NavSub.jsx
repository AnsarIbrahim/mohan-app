import React from 'react';
import img from '../../../Image/Murgan.jpg';

const NavSub = () => {
  return (
    <div className="mb-2 flex items-center justify-around pt-2">
      <div className="flex w-full items-center justify-around">
        <div className=" h-48 w-48 rounded-lg">
          <img src={img} alt="Murgan" className="rounded-lg" />
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
    </div>
  );
};

export default NavSub;
