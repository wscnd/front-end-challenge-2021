import * as React from 'react';
import { usePeopleListWithConfig } from '../hooks/usePeopleList';

const Home = () => {
  const peopleQuery = usePeopleListWithConfig(
    {},
    {
      params: {
        results: 30,
      },
    },
  );

  return <h1>hello</h1>;
};

export { Home };
