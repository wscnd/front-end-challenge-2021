
import { Dispatch, SetStateAction } from "react";
export type SetState<S> = [S, Dispatch<SetStateAction<S>>];