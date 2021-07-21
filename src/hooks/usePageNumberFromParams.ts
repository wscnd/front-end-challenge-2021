import * as React from 'react';

const usePageNumberFromParams = (page: string, maxPageNumber: number) => {
  const verifyPageNumber = React.useCallback(
    (page: string) => {
      const pageToNumber = Number(page);
      if (pageToNumber < 1 || Number.isNaN(pageToNumber))
        /* NaN case for letters */ return '1';
      if (pageToNumber > maxPageNumber) return maxPageNumber.toString();
      return page;
    },
    [maxPageNumber],
  );

  const [pageFromUrlParam, setPageFromUrlParam] = React.useState(() => {
    return verifyPageNumber(page);
  });
  return { pageFromUrlParam, setPageFromUrlParam, verifyPageNumber };
};

export { usePageNumberFromParams };
