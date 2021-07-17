import * as React from 'react';
import { WithPeopleList } from '../components/WithPeopleList';
import { PeopleList } from '../components/PeopleList';
import { SearchIcon } from '@heroicons/react/solid';

import { DebounceInput } from 'react-debounce-input';

const Home = () => {
  const [search, setSearch] = React.useState('');

  return (
    <React.Fragment>
      <div className="mb-8">
        <p className=" text-left prose-xl font-semibold ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, fuga?
          Ducimus porro velit temporibus qui ea nostrum voluptatibus expedita
          eligendi deserunt pariatur! Voluptates amet distinctio voluptatum
          neque culpa aut nam?
        </p>
      </div>
      <div>
        <div className="relative text-gray-400 focus-within:text-gray-600 mb-8">
          <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center">
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <DebounceInput
            className="block w-full bg-white py-2 pl-6 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 ring-2 ring-offset-2 ring-offset-secondary  ring-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white focus:border-white sm:text-sm"
            id="search"
            name="search"
            type="search"
            placeholder="Searching"
            minLength={2}
            debounceTimeout={300}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      <WithPeopleList>
        {(query) => <PeopleList search={search} query={query} />}
      </WithPeopleList>
    </React.Fragment>
  );
};

export { Home };
