import * as React from 'react';
import { usePeopleList } from '../hooks/usePeopleList';

const Home = () => {
  const peopleQuery = usePeopleList();

  return <h1>hello</h1>;
};

export { Home };
