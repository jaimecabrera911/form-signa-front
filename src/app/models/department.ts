import { City } from './city';

export interface Department {
    code: string;
    name: string;
    cities: City[];
}
