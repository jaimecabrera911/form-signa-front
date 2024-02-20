import { ActionsTable } from './actions-table';

export interface TableItems {
    name: string;
    label: string;
    panel: boolean;
    idPrimary?: boolean;
    options?: ActionsTable[];
}
