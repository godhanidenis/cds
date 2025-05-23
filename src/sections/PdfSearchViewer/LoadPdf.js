import React from 'react';
import PropTypes from 'prop-types';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';

const PdfLoad = ({ PDFUrl, searchPluginInstance, setInitialRender, setCurrentPage, setTotalPages, totalPages }) => {
  const workerUrl = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
  return (
    <>
      <Worker workerUrl={workerUrl}>
        <Viewer
          fileUrl={PDFUrl}
          defaultScale={SpecialZoomLevel.PageFit}
          plugins={[searchPluginInstance]}
          renderMode="canvas"
          renderAhead={totalPages}
          onDocumentLoad={(e) => {
            setTotalPages(e.doc.numPages);
            setInitialRender(true);
          }}
          onPageChange={(e) => {
            setCurrentPage(e.currentPage + 1);
          }}
          enableSmoothScroll={false}
        />
      </Worker>
    </>
  );
};
PdfLoad.propTypes = {
  PDFUrl: PropTypes.string,
  searchText: PropTypes.string,
  setInitialRender: PropTypes.func,
  setTotalPages: PropTypes.func,
  setCurrentPage: PropTypes.func,
  currentMatchIndex: PropTypes.number,
  totalPages: PropTypes.number,
  searchPluginInstance: PropTypes.object
};
export default PdfLoad;
