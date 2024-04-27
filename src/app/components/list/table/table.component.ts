import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../list-component';

import { TableItems } from 'app/models/table/table-items';
import { ApiService } from 'app/services/api.service';
import { Path } from 'app/components/routers/path';
import { ActionsTable } from 'app/models/table/actions-table';

const ITEMSACTIONS: ActionsTable[] = [
    { opt: 'other', label: 'Creación de partes', route: 'part-form', pathId: true, icon: 'heroicons_outline:pencil', status: true },
    { opt: 'edit', label: 'Editar', icon: 'heroicons_outline:pencil', status: false },
    { opt: 'detail', label: 'Detalle', route: 'detail', pathId: true, icon: 'heroicons_outline:eye', status: true },
    { opt: 'delete', label: 'Eliminar', icon: 'heroicons_outline:eye', status: false }
];

const iterableColumns: TableItems[] = [
    { name: 'subscriptionNumber', label: 'Numero subscripción', idPrimary: true, panel: false },
    { name: 'numberUsers', label: 'Numero usuario', idPrimary: false, panel: false },
    { name: 'contractSigningDate', label: 'Fecha Firma contrato', idPrimary: false, panel: false },
    { name: 'subscriptionStartDate', label: 'Fecha Iniicio subscripción', idPrimary: false, panel: false },
    { name: 'subscriptionEndDate', label: 'Fecha Final subscripción', idPrimary: false, panel: false },
    { name: 'subscriptionCycle', label: 'Ciclo', idPrimary: false, panel: false },
    { name: 'subscriptionCycleTimeQty', label: 'Cantidad ciclo', idPrimary: false, panel: false },
    { name: 'customerInvoiceValue', label: 'Valor factura cliente', idPrimary: false, panel: false },
    { name: 'commissionValue', label: 'Valor comisión', idPrimary: false, panel: false },
    { name: 'invoiceBalance', label: 'Saldo factura', idPrimary: false, panel: false },
    { name: 'status', label: 'Estado', idPrimary: false, panel: false },
    { name: 'actions', label: 'Acciones', idPrimary: false, panel: true, options: ITEMSACTIONS }
];


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    /*
    extends ListComponent
    title = new Path().getModule();
    subtitle = 'Listado Subscripciones';

    public override apiItems$ = this.api.subscriptionService();
    public override colums = iterableColumns;
    public override idTable = 'subscriptionNumber';

    constructor(
        protected api: ApiService,
    ) {
        super(api);
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        console.log('colums: ', this.idTable);
    }

    optionsTable(colums: any, items: any): void {
        console.log('colums: ', colums);
        console.log('items: ', items);
    }
    */

    initForm(): void {
    }

}
