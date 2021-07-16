import { UseQueryOptions } from 'react-query';
import { Person } from './Person';
import { usePeopleListWithConfig } from '../../hooks/usePeopleList';

export type PersonListQueryOptions = UseQueryOptions<Person[]>;

export type UsePersonList = ReturnType<typeof usePeopleListWithConfig>;
