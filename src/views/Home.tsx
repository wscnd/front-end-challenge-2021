import { RefreshIcon, SearchIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Pagination } from '../components/Pagination';
import { PersonList } from '../components/PersonList';
import { Select } from '../components/Select';
import { SetOptions } from '../components/SetOptions';
import { ShowLoading } from '../components/ShowLoading';
import { ShowRefreshing } from '../components/ShowRefreshing';
import { WithFilteredPersonList } from '../components/WithFilteredPersonList';
import { WithPersonListQuery } from '../components/WithPersonListQuery';
import { SortContextProvider } from '../context/SortContext';
import { useCurrentPageFromParams } from '../hooks/useCurrentPageFromParams';
import { useSearchParams } from '../hooks/useSearchParams';

const Home = () => {
  /**
   * NOTE: /?page${page} is used to get  the page number from the URL
   **/
  const page = useSearchParams('page').page ?? '1';

  const maxPages = React.useState(5)[0];

  const { currentPage, setCurrentPage, validateCurrentPage } =
    useCurrentPageFromParams(page, maxPages);

  React.useEffect(() => {
    setCurrentPage(validateCurrentPage(page));
  }, [maxPages, page, validateCurrentPage, setCurrentPage]);

  /**
   * NOTE: Gender filter options
   **/
  const [genderOptions, setGenderOptions] = React.useState([
    {
      name: 'Any',
      value: '',
      id: 0,
    },
  ]);
  const [selectedGender, setSelectedGender] = React.useState(genderOptions[0]);

  /**
   * NOTE: Nationality filter options
   * this is intense and probably overkill
   * it updates on every rendered table to get a new list of nationalities that are returned by the query
   * and used in the table
   **/
  const [nationalityOptions, setNationalityOptions] = React.useState([
    {
      name: 'Any',
      value: '',
      id: 0,
    },
  ]);

  const [selectNationality, setSelectedNationality] = React.useState(
    nationalityOptions[0],
  );

  /**
   * NOTE: Search typed by the user
   **/
  const [search, setSearch] = React.useState('');
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

      {/* Everything below this uses the PersonQuery */}
      <WithPersonListQuery maxPages={maxPages}>
        {({ query, actions }) => {
          return (
            <div className="mb-6">
              <div className="fixed flex items-center pointer-events-none bottom-6 right-6">
                <ShowRefreshing
                  Icon={RefreshIcon}
                  show={query.isFetching && !query.isLoading && query.isFetched}
                />
              </div>

              {/* Set FilterOptions to the Table */}
              <SetOptions
                query={query}
                setOptions={setGenderOptions}
                optionKey="gender"
              />
              <SetOptions
                query={query}
                setOptions={setNationalityOptions}
                optionKey="nat"
              />

              <section>
                <ShowLoading
                  Icon={RefreshIcon}
                  show={
                    query.isFetching && !query.isLoading && !query.isFetched
                  }
                  text={'Loading more...'}
                >
                  {query.data ? (
                    <SortContextProvider>
                      <WithFilteredPersonList
                        pages={query.data}
                        filters={{
                          gender: selectedGender.value,
                          nationality: selectNationality.value,
                          search: search,
                        }}
                      >
                        {({ personList }) => (
                          <PersonList personList={personList} />
                        )}
                      </WithFilteredPersonList>
                    </SortContextProvider>
                  ) : null}
                </ShowLoading>
                <ShowLoading
                  Icon={RefreshIcon}
                  show={query.isLoading}
                  text={'Loading...'}
                />
              </section>

              <div className=" w-full h-10">
                {!query.isLoading ? (
                  <React.Fragment>
                    <Pagination
                      currentPage={currentPage}
                      actions={actions}
                      maxPages={maxPages}
                      isFetching={query.isFetching || query.isLoading} // NOTE: not being used
                    />
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          );
        }}
      </WithPersonListQuery>
    </React.Fragment>
  );
};

export { Home };
