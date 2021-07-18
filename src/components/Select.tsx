/* This example requires Tailwind CSS v2.0+ */
import * as React from 'react';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import type { Options, UseSelected } from '../lib/types/Options';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type SelectProps = { selectOptions: UseSelected; options: Options[] };

const Select: React.FunctionComponent<SelectProps> = ({
  selectOptions: [selected, setSelected],
  options,
}) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            Choose Gender
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="cursor-pointer relative w-full py-2 pl-3 pr-10 text-left bg-white border-2 border-transparent rounded-md shadow-sm  ring-2 ring-offset-2 ring-offset-secondary ring-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white focus:border-white sm:text-sm">
              <span className="block text-gray-500 truncate">
                {selected.name}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-2 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-table-bg' : 'text-gray-900',
                        'cursor-pointer select-none relative py-2 pl-3 pr-9',
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-primary',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export { Select };
