import { City } from './city';

export interface Provider {
    identificationType: string;
    identificationNumber: string;
    name?: string;
    address?: string;
    phone?: string;
    cellPhone?: string;
    email?: string;
    contactNames?: string;
    contactSurnames?: string;
    contactEmail?: string;
    contactPhone?: string;
    contactCellPhone?: string;
    city?: City;
}
