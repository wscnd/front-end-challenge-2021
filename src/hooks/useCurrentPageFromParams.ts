import * as React from 'react';

const useCurrentPageFromParams = (page: string, maxPageNumber: number) => {
  const validateCurrentPage = React.useCallback(
    (page: string) => {
      const pageToNumber = Number(page);
      if (pageToNumber < 1 || Number.isNaN(pageToNumber))
        /* NaN case for letters */ return '1';
      if (pageToNumber > maxPageNumber) return maxPageNumber.toString();
      return page;
    },
    [maxPageNumber],
  );

  const [currentPage, setCurrentPage] = React.useState(() => {
    return validateCurrentPage(page);
  });
  return { currentPage, setCurrentPage, validateCurrentPage   };
};

export { useCurrentPageFromParams };
