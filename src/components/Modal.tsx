import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import type { SetState } from '../lib/types/SetState';
import { XIcon } from '@heroicons/react/solid';
import type { ModalChild, ModalChildProps } from '../lib/types/ModalChild';

type ModalProps<T> = {
  openState: SetState<boolean>;
  content: T | undefined;
  Component: ModalChild<ModalChildProps<T>>;
};

const Modal: <T>(p: ModalProps<T>) => JSX.Element | null = ({
  Component,
  content,
  openState,
}) => {
  const [open, setOpen] = openState;

  const closeButtonRef = React.useRef(null);

  if (!content) {
    return null;
  }

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-10 w-screen overflow-y-scroll "
        initialFocus={closeButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center w-full px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 "
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-100 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-40 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block px-4 pt-5 pb-4 text-left mt-14 align-bottom transition-all transform bg-white shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex justify-end md:justify-end ">
                <button
                  type="button"
                  className="inline-flex justify-center mt-3 bg-white focus:shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:mt-0"
                  onClick={() => setOpen(false)}
                  ref={closeButtonRef}
                >
                  <XIcon className="w-4 h-4 text-primary" aria-hidden="true" />
                </button>
              </div>
              <Component modalContent={content}>
                <Component.ChildHead />

                <section className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="sm:mb-6 text-xs sm:text-lg font-medium leading-6 text-gray-900 uppercase"
                  >
                    <Component.ChildTitle />
                  </Dialog.Title>

                  <Dialog.Description className="mb-6 text-xs md:prose">
                    <Component.ChildDescription />
                  </Dialog.Description>

                  <section className="mt-3 text-center sm:mt-5">
                    <Component.ChildBody />
                  </section>
                </section>
              </Component>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { Modal };
