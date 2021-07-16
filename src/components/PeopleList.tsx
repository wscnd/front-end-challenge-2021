import * as React from 'react';
import { UsePersonList } from '../lib/types/PersonQuery';

const PeopleList: React.FunctionComponent<UsePersonList> = (query) => {
  return (
    <div>
      <h1>People!</h1>
      {query.isFetching ? <span>updating...</span> : null}
      <section>
        {query.isLoading ? (
          <span>loading...</span>
        ) : (
          <ul>
            {!!query.data?.length &&
              query.data.map((person) => (
                <li key={person.id.value}>
                  <span>
                    {person.name.title.toUpperCase()} - {person.name.first}{' '}
                    {person.name.last}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export { PeopleList };
