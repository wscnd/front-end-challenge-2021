import { Transition } from '@headlessui/react';
import * as React from 'react';

type ShowLoadingProps = {
  show: boolean;
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  text: string;
};

const ShowLoading: React.FunctionComponent<ShowLoadingProps> = ({
  Icon,
  show,
  text,
  children,
}) => {
  return (
    <React.Fragment>
      {show ? (
        <Transition
          show={show}
          enter="transition ease-out duration-800"
          enterFrom="transform opacity-0 "
          enterTo="transform opacity-100 "
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 "
          leaveTo="transform opacity-0 "
        >
          <div className="flex justify-center text-primary mb-3 mt-3">
            <div className="flex-shrink-0 animate-spin-h">
              <Icon className="w-8 h-8" aria-hidden="true" />
            </div>
            <span className="ml-3 font-bold prose-lg">{text}</span>
          </div>
        </Transition>
      ) : children ? (
        children
      ) : null}
    </React.Fragment>
  );
};

export { ShowLoading };
