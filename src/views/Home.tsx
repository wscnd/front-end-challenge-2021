import * as React from 'react';
import { WithPeopleList } from '../components/WithPeopleList';
import { PeopleList } from '../components/PeopleList';

const Home = () => {
  return (
    <WithPeopleList>{(query) => <PeopleList {...query} />}</WithPeopleList>
  );
};

export { Home };
