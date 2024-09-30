import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const PaymentPage = () => {
  const [pageCount, setPageCount] = useState(null);
  const [price, setPrice] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfBytes = new Uint8Array(e.target.result);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const numPages = pdfDoc.getPageCount();
        setPageCount(numPages);
        setPrice(numPages * 5); // Assuming price per page is 5
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error reading PDF:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {pageCount !== null && <p>Total number of pages: {pageCount}</p>}
      {price !== null && <p> Price: ${price}</p>} 
    </div>
  );
}

export default PaymentPage;