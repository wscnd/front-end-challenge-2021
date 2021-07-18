import { PlusIcon, RefreshIcon, SearchIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { PeopleList } from '../components/PeopleList';
import { Select } from '../components/Select';
import { ShowLoading } from '../components/ShowLoading';
import { ShowRefreshing } from '../components/ShowRefreshing';
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
  //
  return (
    <React.Fragment>
      <section className="mb-6">
        <p className="font-semibold prose-xl text-left text-primary">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, fuga?
          Ducimus porro velit temporibus qui ea nostrum voluptatibus expedita
          eligendi deserunt pariatur! Voluptates amet distinctio voluptatum
          neque culpa aut nam?
        </p>
      </section>
      <section className="grid grid-cols-4 grid-rows-1 gap-4 mb-8 ">
        <div className="flex items-end col-start-1 col-end-4 ">
          <div className="relative bottom-0 w-full text-gray-400 focus-within:text-gray-600">
            <div className="absolute inset-y-0 flex items-center pr-3 pointer-events-none right-4">
              <SearchIcon className="w-5 h-5" aria-hidden="true" />
            </div>
            <DebounceInput
              className="block w-full py-2 pl-6 pr-3 leading-5 text-gray-900 placeholder-gray-500 bg-white border border-transparent rounded-md ring-2 ring-offset-2 ring-offset-secondary ring-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white focus:border-white sm:text-sm"
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
        {(query) => {
          return (
            <div className="mb-6">
              <div className="fixed flex items-center pointer-events-none bottom-6 right-6">
                <ShowRefreshing
                  Icon={RefreshIcon}
                  show={
                    query.isFetching &&
                    !query.isFetchingNextPage &&
                    !query.isLoading
                  }
                />
              </div>
              <section>
                {query.data?.pages ? (
                  <PeopleList
                    search={search}
                    query={query}
                    pages={query.data.pages}
                    filter={{ gender: selected.value }}
                  />
                ) : null}
                <ShowLoading
                  Icon={RefreshIcon}
                  show={query.isLoading}
                  text={'Loading...'}
                />
              </section>

              <div className="flex justify-center w-full h-10">
                {!query.isFetchingNextPage && !query.isLoading ? (
                  <button
                    type="button"
                    onClick={() => query.fetchNextPage()}
                    disabled={query.isFetching}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 border border-transparent rounded-md shadow-sm disabled:bg-bg-2 disabled:cursor-not-allowed disabled:text-gray-400 text-bg bg-primary hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <PlusIcon
                      className="-ml-0.5 mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Fetch More
                  </button>
                ) : (
                  <ShowLoading
                    Icon={RefreshIcon}
                    show={query.isFetchingNextPage}
                    text={'Loading More...'}
                  />
                )}
              </div>
            </div>
          );
          // ) : null;
        }}
      </WithPeopleList>
    </React.Fragment>
  );
};

export { Home };
