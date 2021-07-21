import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { WithRouterPeopleListQueryTypePaged } from '../lib/types/WithRouterPeopleListQuery';

type PaginationProps = {
  currentPage: string | null;
  actions: WithRouterPeopleListQueryTypePaged['actions'];
  maxPages: number;
  isFetching: boolean;
};

type PreviousOrNextPageProps = {
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  text: string;
  disabled: boolean;
  onClick: () => void;
};

const PreviousOrNextPage: React.FunctionComponent<PreviousOrNextPageProps> = ({
  Icon,
  text,
  disabled,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center pt-4 pr-1 text-sm sm:prose font-semibold  border-t-2 border-transparent text-primary hover:text-gray-700 hover:border-primary disabled:border-transparent disabled:text-gray-200 disabled:cursor-not-allowed"
    >
      <Icon className="w-5 h-5 mr-3 " aria-hidden="true" />
      {text}
    </button>
  );
};

const Pagination: React.FunctionComponent<PaginationProps> = ({
  currentPage,
  actions,
  maxPages,
  isFetching,
}) => {
  const [notHasNextPage, setNotHasNextPage] = React.useState(() => false);

  const [notHasPreviousPage, setNotHasPreviousPage] = React.useState(
    () => false,
  );

  React.useEffect(() => {
    setNotHasNextPage(() => Number(currentPage) >= maxPages - 1 || isFetching);
    setNotHasPreviousPage(
      () =>
        currentPage === null ||
        Number(currentPage) === 0 ||
        Number(currentPage) < 0 ||
        isFetching,
    );
  }, [currentPage, isFetching, maxPages]);

  return (
    <nav className="flex items-center justify-between px-4 border-t border-table-bg sm:px-0">
      <div className="flex flex-1 w-0 -mt-px">
        <Link
          to={{
            pathname: '/',
            search: `?page=${notHasPreviousPage ? 0 : Number(currentPage) - 1}`,
          }}
        >
          <PreviousOrNextPage
            onClick={actions.fetchPreviousPage}
            Icon={ArrowNarrowLeftIcon}
            text="Previous"
            disabled={notHasPreviousPage}
          />
        </Link>
      </div>

      <div className="hidden md:-mt-px md:flex">
        {new Array(maxPages).fill(0).map((_, index) => {
          const pageStyle =
            index === Number(currentPage)
              ? 'inline-flex items-center px-4 pt-4 text-sm font-medium text-primary border-t-2 border-primary'
              : 'inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300 ';
          return (
            <Link
              to={{
                pathname: '/',
                search: `?page=${Number(index)}`,
              }}
              key={index}
            >
              <button
                onClick={() => actions.fetchPage(index)}
                className={pageStyle}
              >
                {index}
              </button>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-end flex-1 w-0 -mt-px">
        <Link
          to={{
            pathname: '/',
            search: `?page=${
              notHasNextPage ? maxPages - 1 : Number(currentPage) + 1
            }`,
          }}
        >
          <PreviousOrNextPage
            onClick={actions.fetchNextPage}
            Icon={ArrowNarrowRightIcon}
            text="Next"
            disabled={notHasNextPage}
          />
        </Link>
      </div>

    </nav>
  );
};

export { Pagination };
