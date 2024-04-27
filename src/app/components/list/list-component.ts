import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';
import { SwalAlert } from '../alerts/swalAlert';

export interface Documents {
    id: string;
    name: string;
    createdBy: string;
    createdAt: string;
    modifiedAt: string;
    size: string;
    type: string;
}

@Component({
    selector: 'app-list-component',
    template: '<p></p>',
    styleUrls: []
})
export abstract class ListComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(LiveAnnouncer) _liveAnnouncer: LiveAnnouncer;

    swaAlert = new SwalAlert();
    idTable: string;
    sortBy = 'id';
    direction = 'desc';
    page = 0;
    size = 5;
    pageSizeOptions = [5, 10, 15, 20, 50, 100];
    pageEvent?: PageEvent;
    params: Map<string, string> = new Map<string, string>();
    // eslint-disable-next-line @typescript-eslint/naming-convention
    length: number = 0;
    lengthItems: number = 0;
    filters = false;
    search: string = '';
    searchKey: string = '';
    searchForm?: FormGroup;
    preloader = false;
    massive = false;
    selectedAll = false;
    selectedItems: any[] = [];
    selectAllItems: boolean = false;
    elements: MatTableDataSource<any> = new MatTableDataSource<any>([]);
    idElement: string = '';
    value: any = [];
    test: any = [];
    dataElements: any = [];
    displayedColumns: string[] = [];
    apiItems$: Observable<any>;
    background = '#748EB8';
    color = '#FFFFFF';
    abstract colums: any;

    constructor(
        protected api: ApiService
    ) {
    }

    ngOnInit(): void {
        this.getItems();
        this.initForm();
        this.getColumnsTable();
    }


    getItems(): void {
        if (this.apiItems$) {
            this.apiItems$.subscribe({
                next: (data: any) => {
                    if (data.data) {
                        console.log('items:::::::: ', data);
                        this.length = typeof data.meta !== 'undefined' ? data.meta.pagination.total : '';
                        //this.lengthItems = typeof data !== 'undefined' ? data.length : '';
                        this.lengthItems = 0;
                        this.value = data.data;
                        this.test = typeof data[0] !== 'undefined' ? data[0].datas : '';
                        console.log(' this.test:::::::: ',  this.test);
                        this.dataElements = JSON.parse(JSON.stringify(this.value,
                            (key, value) => (value === null) ? '' : value
                        ));
                        console.log('items:', this.dataElements);
                        this.elements = new MatTableDataSource<any>(this.dataElements);
                    }
                },
                error: (e: any) => console.error(e)
            });
        } else {
            return;
        }
    }

    formatData(elements: any, length: any): any {
        const elementsData: any = [];
        for (let i: number = 0; i < length; i++) {
            elementsData.push(elements[i].attributes);
        }
        for (let j: number = 0; j < length; j++) {
            Object.assign(elementsData[j], { id: elements[j].id });
        }
        return elementsData;
    }

    getColumnsTable(): void {
        for (const val of this.colums) {
            this.displayedColumns.push(val.name);
        }
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        if (this.elements) {
            this.elements.filter = filterValue.trim().toLowerCase();
        }
    }


    onChange($event: PageEvent): PageEvent {
        this.page = $event.pageIndex;
        this.size = $event.pageSize;
        this.getItems();
        return $event;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    announceSortChange(sortState: Sort) {
        console.log('short :', sortState);
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    /*
    sortData($event: Sort): void {
        this.sortBy = $event.active;
        this.direction = $event.direction;

        this.getItems();
        console.log('sort ',this.getItems());
    }

    showFilters(): void {
        this.filters = !this.filters;
    }

    searchByKeywords(): void {
        this.params.set(this.searchKey, this.search);
        this.getItems();
    }

    searchItems($event: KeyboardEvent): void {
        this.params.set(this.searchKey, this.search);
        this.getItems();
    }

    searchItemsByFilters(): void {
        this.params.clear();
        this.search = '';
        // eslint-disable-next-line guard-for-in
        for (const controlsKey in this.searchForm.controls) {
            const value = this.searchForm.get(controlsKey).value;
            if (value && value.length > 0) {
                this.params.set(controlsKey, value);
            }
        }
        this.getItems();
    }

    selectAll(): void {
    }

    unSelectItem(element: any): void {
        if (element.selected) {
            this.selectedItems.push(element);
        } else {
            this.selectedItems.splice(this.selectedItems.indexOf(element), 1);
        }
        this.massive = this.selectedItems.length > 0;
    }*/

    //abstract formatData(elements: any, length: any): any;
    abstract initForm(): void;

}
