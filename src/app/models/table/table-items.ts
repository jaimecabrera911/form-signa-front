import { ActionsTable } from './actions-table';
import { styleColumn } from './style-column';

export interface TableItems {
    name: string;
    name2?: string | boolean;
    id?: string;
    label: string;
    panel?: boolean;
    styleEnable?: boolean;
    styles?: styleColumn[];
    formatDate?: boolean;
    idPrimary?: boolean;
    function?: boolean;
    functionName?: string | boolean;
    view?: boolean;
    edit?: boolean;
    editRoute?: string;
    editModule?: string;
    item?: string | boolean;
    options?: ActionsTable[];
}
