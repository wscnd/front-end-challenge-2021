import * as React from 'react';
import { useSortContext } from '../context/SortContext';
import type { Person } from '../lib/types/Person';
import type { QueryResult } from '../lib/types/QueryResult';

import {
  filterByGender,
  filterByName,
  filterByNationality,
} from '../lib/utils/mutatePerson';

import { mutatePersonList as orderPersonList } from '../lib/utils/mutatePersonList';

type WithFilteredPersonListProps = {
  pages: QueryResult;
  filters: { gender: string; nationality: string; search: string };
  children: React.FunctionComponent<{ personList: Person[] }>;
};

export const WithFilteredPersonList: React.FunctionComponent<WithFilteredPersonListProps> =
  ({ pages, children, filters }) => {

    const sortOrder = useSortContext()[0];

    React.useEffect(() => {
      console.log('selectedGender:', filters.gender);
      console.log('selectedNationality:', filters.nationality);
    }, [filters.gender, filters.nationality]);

    return children({
      personList: orderPersonList(
        //NOTE: probably expensive?
        pages.results,
        sortOrder.order,
        'name',
      )
        .filter((person) => filterByName(person, filters.search))
        .filter((person) => filterByNationality(person, filters.nationality))
        .filter((person) => filterByGender(person, filters.gender)),
    });
  };
