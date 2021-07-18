import { SetState } from './SetState';

export type Options = {
  id: number;
  name: string;
  value: string;
};

export type UseSelected = SetState<Options>;
