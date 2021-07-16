import { UseQueryOptions } from 'react-query';
import { Person } from './Person';

export type PersonListQueryOptions = UseQueryOptions<Person[]>;
