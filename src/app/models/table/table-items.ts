import { ActionsTable } from './actions-table';
import { styleColumn } from './style-column';

export interface TableItems {
    name: string;
    name2?: string | boolean;
    label: string;
    panel?: boolean;
    styleEnable?: boolean;
    styles?: styleColumn[];
    idPrimary?: boolean;
    options?: ActionsTable[];
}
