import * as React from 'react';
import { Options } from '../lib/types/Options';
import { UsePersonListPaged } from '../lib/types/PersonQuery';
import { SetState } from '../lib/types/SetState';

type SetOptionsProps = {
  query: UsePersonListPaged;
  setOptions: SetState<Options[]>['1'];
  optionKey: 'nat' | 'gender';
};

const SetOptions = ({ query, setOptions, optionKey }: SetOptionsProps) => {
  const options = React.useMemo(() => {
    const defaultOptions = { name: 'Any', value: '', id: 0 };
    const toSomething = Object.values(
      query.data?.results?.reduce(
        (store, person) => ({
          ...store,
          [`${person[optionKey]}`]: {
            name: person[optionKey],
            value: person[optionKey],
            id: person[optionKey],
          },
        }),
        { any: defaultOptions },
      ) ?? [defaultOptions],
    ).map((value, index) => ({ ...value, id: index }));
    return toSomething;
  }, [query.data?.results, optionKey]);

  React.useEffect(() => {
    if (query.status === 'success') {
      setOptions(options);
    }
  }, [query, options, setOptions]);
  return null;
};

export { SetOptions };
