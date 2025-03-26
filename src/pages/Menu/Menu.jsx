import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// import { pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min?url';
import './Menu.css';

// Set PDF worker path
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

function Menu() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef(null);

  const menuPdf = '/Menu.pdf';

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages || 1));

  return (
    <div className="menu-app">
      <div className="menu-header">
        <button className="back-button" onClick={() => window.history.back()}>
          &larr; Back
        </button>
        <h1>Our Menu</h1>
      </div>

      <div className="pdf-container" ref={containerRef}>
        <Document
          file={menuPdf}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="loading">Loading menu...</div>}
          error={<div className="error-message">
            Failed to load PDF. <a href={menuPdf} download>Download menu instead</a>
          </div>}
        >
          <Page 
            pageNumber={pageNumber}
            width={containerWidth ? Math.min(containerWidth, 1000) : undefined}
            loading={<div className="loading">Loading page {pageNumber}...</div>}
            error={<div className="error-message">Failed to load page {pageNumber}</div>}
          />
        </Document>

        {numPages && (
          <div className="page-controls">
            <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
              Previous
            </button>
            <span>Page {pageNumber} of {numPages}</span>
            <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;