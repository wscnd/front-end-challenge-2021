import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import type { SetState } from '../lib/types/SetState';
import type { Person } from '../lib/types/Person';
import { XIcon } from '@heroicons/react/solid';

type DisplayPersonProps = {
  openState: SetState<boolean>;
  person: Person | undefined;
};

const DisplayPerson: React.FunctionComponent<DisplayPersonProps> = ({
  openState,
  person,
}) => {
  const [open, setOpen] = openState;

  const closeButtonRef = React.useRef(null);

  if (!person) {
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
              <div className="flex justify-center -mt-24 md:justify-center">
                <img
                  className="flex-shrink-0 object-cover w-20 h-20 sm:w-32 sm:h-32 rounded-full shadow-xl border-3 border-primary bg-bg-2 "
                  src={person.picture.large}
                />
              </div>
              <section className="mt-3 text-center sm:mt-5">
                <Dialog.Title
                  as="h3"
                  className="sm:mb-6 text-xs sm:text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  {`${person.name.title}  ${person.name.last}, ${person.gender} , ${person.dob.age} y.o`}
                </Dialog.Title>
                <Dialog.Description className="mb-6 text-xs md:prose">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
                  aliquam laudantium explicabo pariatur iste dolorem animi vitae
                  error totam. At sapiente aliquam accusamus facere veritatis.
                </Dialog.Description>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="px-2 py-1 sm:py-3 bg-table-bg sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                      <dt className="text-sm  text-primary uppercase font-semibold">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-600 sm:mt-0 ">
                        {`${person.name.first}  ${person.name.last}`}
                      </dd>
                    </div>
                    <div className="px-2 py-1 sm:py-3 bg-white sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                      <dt className="text-sm  text-primary uppercase font-semibold">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-600 sm:mt-0 ">
                        {`${person.email}`}
                      </dd>
                    </div>
                    <div className="px-2 py-1 sm:py-3 bg-table-bg sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                      <dt className="text-sm  text-primary uppercase font-semibold">
                        Gender
                      </dt>
                      <dd className="mt-1 text-sm text-gray-600 capitalize sm:mt-0">
                        {person.gender}
                      </dd>
                    </div>
                    <div className="px-2 py-1 sm:py-3 bg-white sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                      <dt className="text-sm  text-primary uppercase font-semibold">
                        Birthdate
                      </dt>
                      <dd className="mt-1 text-sm text-gray-600 sm:mt-0 ">
                        {`${new Date(person.dob.date).toLocaleDateString()}`}
                      </dd>
                    </div>

                    <div className="px-2 py-1 sm:py-3 bg-table-bg sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                      <dt className="text-sm  text-primary uppercase font-semibold">
                        Phone
                      </dt>
                      <dd className="mt-1 text-sm text-gray-600 capitalize sm:mt-0">
                        {person.phone}
                      </dd>
                    </div>
                    <div className="px-2 py-1 sm:py-3 bg-white sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                      <dt className="text-sm  text-primary uppercase font-semibold">
                        Nationality
                      </dt>
                      <dd className="mt-1 text-sm text-gray-600 sm:mt-0 ">
                        {`${person.nat}`}
                      </dd>
                    </div>
                    <div className="px-2 py-1 sm:py-3 bg-table-bg sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                      <dt className="text-sm  text-primary uppercase font-semibold">
                        Address Line
                      </dt>
                      <dd className="mt-1 text-sm text-gray-600 sm:mt-0 justify">
                        <p>
                          {`${person.location.street.number} ${person.location.street.name} `}
                        </p>
                      </dd>
                      <dt className="text-sm  text-primary uppercase font-semibold">
                        City
                      </dt>
                      <dd className="mt-1 text-sm text-gray-600 sm:mt-0 justify">
                        {person.location.city}
                      </dd>
                      <dt className="text-sm  text-primary uppercase font-semibold">
                        State
                      </dt>
                      <dd className="mt-1 text-sm text-gray-600 sm:mt-0 justify">
                        {person.location.state}
                      </dd>
                      <dt className="text-sm  text-primary uppercase font-semibold">
                        Country
                      </dt>
                      <dd className="mt-1 text-sm text-gray-600 sm:mt-0 justify">
                        {person.location.country}
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { DisplayPerson };
