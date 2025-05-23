import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { searchPlugin } from '@react-pdf-viewer/search';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import PdfLoad from './LoadPdf';
import '@react-pdf-viewer/bookmark/lib/styles/index.css';
import './index.css';

const PdfSearchViewer = ({ PDFUrl, searchText }) => {
  const searchPluginInstance = searchPlugin();
  const [matches, setMatches] = useState(0);
  const [initialRender, setInitialRender] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const PDF = useCallback(() => {
    return (
      <PdfLoad
        PDFUrl={PDFUrl}
        searchPluginInstance={searchPluginInstance}
        setInitialRender={setInitialRender}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        setCurrentPage={setCurrentPage}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PDFUrl]);

  useEffect(() => {
    if (PDFUrl && searchText) {
      const pattern = generateRegex(searchText);
      const regex = pattern ? new RegExp(pattern, 'ig') : '';

      searchPluginInstance
        .highlight(regex)
        .then((data) => {
          if (data.length > 0) {
            setTimeout(() => {
              const scrollableContainer = document.getElementsByClassName('rpv-core__inner-pages')[0];
              scrollableContainer.scrollTo({
                top: scrollableContainer.scrollTop - 100,
                behavior: 'smooth'
              });
            }, 10);
          }
          setMatches(data.length);
        })
        .catch((error) => {
          console.error('Failed to highlight search text:', error);
        });
    }
    setInitialRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, initialRender]);

  function createFlexibleRegex(inputString) {
    // Escape any special characters in the input string
    // eslint-disable-next-line no-useless-escape
    const escapedString = inputString.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    // Replace each space with \s* (optional spaces)
    const spaceFlexibleString = escapedString.replace(/\s+/g, '\\s*');

    // Make commas optional, allowing spaces around them
    const commaFlexibleString = spaceFlexibleString.replace(/,/g, '\\s*,?\\s*');

    // Return the final regex
    return new RegExp(commaFlexibleString, 'gi'); // 'g' for global match, 'i' for case-insensitive
  }

  const generateRegex = (searchText) => {
    // const searchedFor = searchText?.type;
    const searchedText = searchText;
    // if (searchedFor === 'Directors/Officers' || searchedFor === 'UBOs') {
    //   const fullName = searchedText.split(',')[0].trim();
    //   const words = fullName.split(/[\s]+/).filter(Boolean);
    //   if (words.length !== 1) {
    //     const firstWord = words[0];
    //     const middleWord = words.slice(1, words.length - 1).join(' ');
    //     const lastWord = words[words.length - 1];

    //     // /(?:FirstName\W*(MiddleName)?\W*LastName|LastName\W*(MiddlName)?\W*FirstName)/gi
    //     return `(?:${firstWord}\\W*(${middleWord})?\\W*${lastWord}|${lastWord}\\W*(${middleWord})?\\W*${firstWord})`;
    //   } else {
    //     return createFlexibleRegex(fullName);
    //   }
    // } else {
    return createFlexibleRegex(searchedText);
    // }

    // Split the string and filter out any empty strings
  };

  return (
    <Box
      sx={{
        width: '100%',
        textAlign: 'center',
        height: 'calc(100vh - 192px)'
      }}
    >
      {PDFUrl ? (
        <PDF />
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="text-white bg-danger w-min whitespace-nowrap px-6 py-2 rounded bg-opacity-95">PDF Data Not Available</span>
        </div>
      )}

      <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
        <Typography>{`Page ${currentPage} / ${totalPages}`}</Typography>

        <Typography>{`Match ${matches}`}</Typography>
      </Box>
    </Box>
  );
};

PdfSearchViewer.propTypes = {
  PDFUrl: PropTypes.string,
  searchText: PropTypes.string
};

export default PdfSearchViewer;
