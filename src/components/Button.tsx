import { PlusIcon } from '@heroicons/react/solid';
import React from 'react';

type ButtonProps = {
  disabled: boolean;
  onClick?: () => void;
  text: string;
  Icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
};

const Button: React.FunctionComponent<ButtonProps> = ({
  disabled,
  onClick,
  text,
  Icon,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center md:px-3 md:py-1 px-1 py-1 text-xs sm:text-md lg:text-lg font-medium leading-4 border border-transparent rounded-md shadow-sm disabled:bg-bg-2 disabled:cursor-not-allowed disabled:text-gray-400 text-bg bg-primary hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      {Icon ? (
        <Icon
          className="-ml-0.5 mr-2 h-4 w-4 hidden sm:block"
          aria-hidden="true"
        />
      ) : (
        <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
      )}
      {text}
    </button>
  );
};

export { Button };
