import { Dispatch, SetStateAction } from "react";

export type Options = {
  id: number;
  name: string;
  value: string
};

type SetState<S> = [S, Dispatch<SetStateAction<S>>];

export type UseSelected = SetState<Options>