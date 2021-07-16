import * as React from 'react';
import { usePeopleListWithConfig } from '../hooks/usePeopleList';
import { UsePersonList } from '../lib/types/PersonQuery';

type WithPeopleProp = {
  children: React.FunctionComponent<UsePersonList>;
};

const WithPeopleList: React.FunctionComponent<WithPeopleProp> = ({
  children,
}) => {
  const peopleQuery = usePeopleListWithConfig(
    {},
    {
      params: {
        results: 30,
      },
    },
  );
  return children(peopleQuery);
};

export { WithPeopleList };
