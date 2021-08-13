import { createContext } from '../context/createContext';
import type { Person } from '../lib/types/Person';
export const [usePersonContext, PersonProvider] = createContext<Person>();
