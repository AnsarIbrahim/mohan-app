import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaShare } from 'react-icons/fa6';
import { IoIosCloudDownload } from 'react-icons/io';
import TemplateBody from './TemplateBody';
import Navbar from '../../Navbar/Navbar';
import { getCustomer } from '../../../redux/firebase/firebase';

const TemplateOne = () => {
  const location = useLocation();
  const customerId = location.pathname.split('/').pop();
  const filteredDetails = location.state.details;

  const templateRef = useRef();

  const handleDownload = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const textarea = templateRef.current.querySelector('textarea');
    const text = textarea.value;
    const div = document.createElement('div');
    div.textContent = text;
    div.style.whiteSpace = 'pre-wrap';
    div.style.width = `${textarea.offsetWidth}px`;
    textarea.parentNode.replaceChild(div, textarea);

    const renderAndAddPage = async (element) => {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    };

    const bodies = templateRef.current.querySelectorAll('.template-body');
    for (let i = 0; i < bodies.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }
      await renderAndAddPage(bodies[i]);
    }
    div.parentNode.replaceChild(textarea, div);

    const customer = await getCustomer(customerId);
    const customerName = customer.name;

    pdf.save(`${customerName}.pdf`);
  };

  const handleShare = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const textarea = templateRef.current.querySelector('textarea');
    const text = textarea.value;
    const div = document.createElement('div');
    div.textContent = text;
    div.style.whiteSpace = 'pre-wrap';
    div.style.width = `${textarea.offsetWidth}px`;
    textarea.parentNode.replaceChild(div, textarea);

    const renderAndAddPage = async (element) => {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    };

    const bodies = templateRef.current.querySelectorAll('.template-body');

    for (let i = 0; i < bodies.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }
      await renderAndAddPage(bodies[i]);
    }

    div.parentNode.replaceChild(textarea, div);

    const customer = await getCustomer(customerId);
    const customerName = customer.name;

    const pdfBlob = pdf.output('blob');

    const pdfFile = new File([pdfBlob], `${customerName}.pdf`, {
      type: 'application/pdf',
    });

    if (navigator.share) {
      const shareData = {
        files: [pdfFile],
        title: 'Download PDF',
        text: 'Here is your PDF',
      };

      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error.message);
      }
    } else {
      window.open(URL.createObjectURL(pdfBlob), '_blank');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        <div
          ref={templateRef}
          className="flex items-center justify-center p-5"
          style={{ width: '794px', overflow: 'auto' }}
        >
          <div className="max-h-full w-full overflow-x-auto rounded-xl border-2 border-zinc-400 p-3">
            <TemplateBody customer={customerId} details={filteredDetails} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div
          className="flex items-center justify-around p-5"
          style={{ width: '794px' }}
        >
          <div className="mb-3 mt-3">
            <button
              onClick={handleDownload}
              className="flex flex-col items-center justify-center"
            >
              Download <IoIosCloudDownload className="text-blue-600" />
            </button>
          </div>
          <div className="mb-3 mt-3">
            <button
              className="flex flex-col items-center justify-center"
              onClick={handleShare}
            >
              Share
              <FaShare className="text-green-600" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateOne;
