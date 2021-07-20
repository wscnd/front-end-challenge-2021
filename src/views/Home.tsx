import { RefreshIcon, SearchIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useInfiniteQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/Button';
import { PeopleList } from '../components/PeopleList';
import { Select } from '../components/Select';
import { ShowLoading } from '../components/ShowLoading';
import { ShowRefreshing } from '../components/ShowRefreshing';
import { WithRouterPeopleListQuery } from '../components/WithRouterPeopleListQuery';
import { SortContextProvider } from '../context/SortContext';
import { useSearchParams } from '../hooks/useSearchParams';
import type { Person } from '../lib/types/Person';
import type { QueryResult } from '../lib/types/QueryResult';

const Home = () => {
  const { page } = useSearchParams('page');

  const history = useHistory();

  const [search, setSearch] = React.useState('');

  const queryClient = useInfiniteQuery<QueryResult>('people');

  // NOTE: Gender options
  const genderOptions = React.useState(() => [
    { id: 1, name: 'Male', value: 'male' },
    { id: 2, name: 'Female', value: 'female' },
    { id: 3, name: 'Any', value: '' },
  ])[0];

  const [selectedGender, setSelectedGender] = React.useState(genderOptions[2]);

  // NOTE: Nationality options, this is intense and probably overkill
  const nationalityOptions = React.useMemo(() => {
    const anyNationality = { name: 'Any', value: '', id: 0 };
    return Object.values(
      queryClient.data?.pages
        .reduce(
          (store: Person[], current) => [...store, ...current.results],
          [],
        )
        .reduce(
          (store, person) => ({
            ...store,
            [person.nat]: {
              name: person.nat,
              value: person.nat,
              id: person.nat,
            },
          }),
          { any: anyNationality },
        ) || [anyNationality],
    )?.map((value, index) => ({ ...value, id: index }));
  }, [queryClient.data?.pages]);

  const [selectNationality, setSelectedNationality] = React.useState(
    nationalityOptions[0],
  );

  React.useEffect(() => {
    console.log('nationalityOptions:', nationalityOptions);
  }, [nationalityOptions]);

  React.useEffect(() => {
    console.log('selectNationality:', selectNationality);
  }, [selectNationality]);

  React.useEffect(() => {
    // const pageFromParam = page ? `page=${page}` : '';
    // console.log('pageFromParam:', pageFromParam);
    // console.log('gender: ', selected);
  }, [selectedGender, history, page]);

  return (
    <React.Fragment>
      <section className="mb-6 w-full">
        <span className="font-semibold  prose text-left lg:prose-xl md:prose-lg text-primary ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, fuga?
          Ducimus porro velit temporibus qui ea nostrum voluptatibus expedita
          eligendi deserunt pariatur! Voluptates amet distinctio voluptatum
          neque culpa aut nam?
        </span>
      </section>
      <section className="grid grid-cols-2 grid-rows-2 mb-8 md:grid-cols-5 md:grid-rows-1  md:gap-6 gap-3">
        <div className="flex items-end col-start-1 col-end-3  md:col-end-4 ">
          <div className="relative bottom-0 w-full text-gray-400 focus-within:text-gray-600">
            <div className="absolute inset-y-0 flex items-center pr-3 pointer-events-none right-4">
              <SearchIcon className="w-5 h-5" aria-hidden="true" />
            </div>
            <DebounceInput
              maxLength="25"
              className="block w-full py-3 pl-6 pr-3 leading-5 text-gray-900 placeholder-gray-500 bg-white border border-transparent rounded-md ring-2 ring-offset-2 ring-offset-secondary ring-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white focus:border-white sm:prose-sm lg:prose-lg"
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

        <div className="md:col-start-4 flex flex-col justify-end">
          <Select
            selectOptions={[selectNationality, setSelectedNationality]}
            options={nationalityOptions}
            labelText={'Nationality'}
          />
        </div>
        <div className="md:col-start-5 flex flex-col justify-end">
          <Select
            selectOptions={[selectedGender, setSelectedGender]}
            options={genderOptions}
            labelText={'Gender'}
          />
        </div>
      </section>
      <WithRouterPeopleListQuery>
        {({ query, actions }) => {
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
                  <SortContextProvider>
                    <PeopleList
                      search={search}
                      pages={query.data.pages}
                      filter={{
                        gender: selectedGender.value,
                        nationality: selectNationality.value,
                      }}
                    />
                  </SortContextProvider>
                ) : null}
                <ShowLoading
                  Icon={RefreshIcon}
                  show={query.isLoading}
                  text={'Loading...'}
                />
              </section>

              <div className="flex justify-center w-full h-10">
                {!query.isFetchingNextPage && !query.isLoading ? (
                  <Button
                    disabled={query.isFetching}
                    onClick={actions.fetchMorePeople}
                    text={'Fetch More?'}
                  />
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
        }}
      </WithRouterPeopleListQuery>
    </React.Fragment>
  );
};

export { Home };
