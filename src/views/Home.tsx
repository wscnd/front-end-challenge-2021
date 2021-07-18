import { SearchIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { PeopleList } from '../components/PeopleList';
import { Select } from '../components/Select';
import { WithPeopleList } from '../components/WithPeopleList';

const Home = () => {
  const [search, setSearch] = React.useState('');

  const options = React.useState(() => [
    { id: 1, name: 'Male', value: 'male' },
    { id: 2, name: 'Female', value: 'female' },
    { id: 3, name: 'Any', value: '' },
  ])[0];

  const [selected, setSelected] = React.useState(options[2]);

  // React.useEffect(() => {
  //   console.log(selected);
  // }, [selected]);

  return (
    <React.Fragment>
      <section className="mb-6">
        <p className=" text-left prose-xl font-semibold text-primary ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, fuga?
          Ducimus porro velit temporibus qui ea nostrum voluptatibus expedita
          eligendi deserunt pariatur! Voluptates amet distinctio voluptatum
          neque culpa aut nam?
        </p>
      </section>
      <section className="grid grid-cols-4 grid-rows-1 gap-4 mb-8 ">
        <div className="col-start-1 col-end-4 flex items-end ">
          <div className="relative text-gray-400 focus-within:text-gray-600  bottom-0 w-full">
            <div className="pointer-events-none absolute inset-y-0 right-4 pr-3 flex items-center">
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

        <div className="grid-start-4">
          <Select selectOptions={[selected, setSelected]} options={options} />
        </div>
      </section>
      <WithPeopleList>
        {(query) => (
          <PeopleList
            search={search}
            query={query}
            filter={{ gender: selected.value }}
          />
        )}
      </WithPeopleList>
    </React.Fragment>
  );
};

export { Home };
