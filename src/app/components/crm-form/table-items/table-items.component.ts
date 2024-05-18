
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-table-items',
    templateUrl: './table-items.component.html',
    styleUrls: ['./table-items.component.scss']
})
export class TableItemsComponent implements AfterViewInit, OnInit {


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Input() data?: Observable<any>;
    @Input() colums?: any[];
    @Input() searchPanel?: boolean;
    @Input() routeBottom?: string;
    @Input() placeHolderSearch?: string;

    displayedColumns: string[] = [];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
    background: string = '#748EB8';
    color: string = '#FFFFFF';
    pageSizeOptions = [5, 10, 15, 20, 50, 100];

    constructor(
        private router: Router,
        private _liveAnnouncer: LiveAnnouncer
    ) {
    }

    ngAfterViewInit(): void {
        this.getColumnsTable();
        this.getItemsTable();
    }

    ngOnInit(): void {
        this.placeHolderSearch = `Buscar ${this.placeHolderSearch}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    validateResponse(items: any): any {
        return JSON.parse(JSON.stringify(items,
            (key, value) => (value === null) ? '' : value
        ));
    }

    getItemsTable(): void {
        if (this.data) {
            this.data.subscribe({
                next: (elements: any) => {
                    if (elements.data) {
                        const validateItems = this.validateResponse(elements.data);
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        validateItems.forEach((item: any) => { item.enabled ? item.enabled = 'Activo' : item.enabled = 'Inactivo'; });
                        this.configuration(validateItems);
                    }
                }, error: (e: any) => console.error(e)
            });
        } else {
            return;
        }
    }

    configuration(data): void{
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort): void {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    /** Filter */
    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        if (this.dataSource) {
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }
    }

    /** Columnas */
    getColumnsTable(): void {
        for (const val of this.colums) {
            this.displayedColumns.push(val.name);
        }
    }

    routerLink(): void {
        this.router.navigateByUrl(this.routeBottom);
    }

}
