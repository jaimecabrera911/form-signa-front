export interface ActionsTable {
    opt: string;
    label?: string;
    route?: string;
    pathId?: boolean;
    icon?: string;
    status: boolean;
}

export const ITEMSACTIONS: ActionsTable[] = [
    { opt: 'view', status: true },
    { opt: 'edit', status: true },
    { opt: 'detail', status: true },
    { opt: 'delete', status: true }
];
