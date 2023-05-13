import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `/uploads/1683484793088_1683448412066_Mahantesh_aicte_removed.pdf.worker.js`;

const PreviewPDF = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  return (
    <div>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <button disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button disabled={pageNumber >= numPages} onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PreviewPDF;
