import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './Menu.css';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const menuPdf = '/Menu.pdf';

function Menu() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); // Current page number
    const [error, setError] = useState(null);

    // Handle successful PDF load
    function onDocumentLoadSuccess({ numPages }) {
        console.log('PDF loaded successfully. Number of pages:', numPages);
        setNumPages(numPages);
        setError(null); // Clear any previous errors
    }

    // Handle PDF load error
    function onDocumentLoadError(error) {
        console.error('Error while loading PDF:', error);
        setError('Failed to load the menu. Please try again later.');
    }

    // Go to the next page
    function goToNextPage() {
        setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
    }

    // Go to the previous page
    function goToPreviousPage() {
        setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
    }

    console.log('Imported PDF:', menuPdf); // Debugging: Check if PDF is imported correctly
    console.log('Worker Source:', pdfjs.GlobalWorkerOptions.workerSrc); // Debugging: Check worker source

    return (
        <div className="menu-container">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <>
                    {/* Back to Home Button */}
                    <button
                        className="back-to-home"
                        onClick={() => {
                            // Add your navigation logic here, e.g., using React Router
                            window.location.href = '/'; // Example: Redirect to home
                        }}
                    >
                        Back to Home
                    </button>
                    <Document
                        file={menuPdf}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                    >
                        <Page
                            pageNumber={pageNumber}
                            renderTextLayer={false} // Disable text layer
                        />
                    </Document>
                    <div className="pagination-controls">
                        <button
                            onClick={goToPreviousPage}
                            disabled={pageNumber <= 1}
                        >
                            Previous
                        </button>
                        <span>
                            Page {pageNumber} of {numPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={pageNumber >= numPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Menu;
