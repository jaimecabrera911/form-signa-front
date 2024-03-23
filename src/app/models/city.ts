import { State } from './state';

export interface City {
    code: string;
    name: string;
    department: string;
    country: State;
}
