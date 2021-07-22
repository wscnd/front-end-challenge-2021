import { Transition } from '@headlessui/react';
import * as React from 'react';


type ShowRefreshingProps = {
  show: boolean;
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
};

const ShowRefreshing: React.FunctionComponent<ShowRefreshingProps> = ({
  Icon,
  show,
}) => {
  return (
    <Transition
      show={show}
      enter="transition ease-out duration-800"
      enterFrom="transform opacity-0 "
      enterTo="transform opacity-100 "
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 "
      leaveTo="transform opacity-0 "
    >
      <div className="flex justify-center text-primary">
        <div className="flex-shrink-0 animate-spin-h">
          <Icon className="h-10 w-10" aria-hidden="true" />
        </div>
      </div>
    </Transition>
  );
};

export { ShowRefreshing };
