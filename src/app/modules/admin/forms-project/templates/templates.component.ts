import { ApiService } from 'app/services/api.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Path } from 'app/components/routers/path';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-templates',
    templateUrl: './templates.component.html',
    styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    title = 'Plantilla formularios';
    subtitle = new Path().getModule();
    pageSizeOptions = [6, 12, 18, 24, 30, 36];
    page = 0;
    size = 6;
    value: any;
    obs: Observable<any>;
    items: any[] = [];
    templatePreview: any[] = [];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

    constructor(private changeDetectorRef: ChangeDetectorRef,
        protected api: ApiService) { }

    ngOnInit(): void {
        this.changeDetectorRef.detectChanges();
        this.api.templatesFormService(1).subscribe({
            next: (elements: any) => {
                if (elements.data) {
                    this.items = elements.data;
                    this.onLoad(this.items);
                }
            }, error: (e: any) => console.error(e)
        });
    }

    onLoad(data: any): void {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
    }

    preview(id: string): void{
        const items: any = this.items.filter((item: any) => item.code === id);
        this.templatePreview = items[0];
        const urlImage = `${environment.urlApp}${items[0].image.formats.small.url}`;
        Object.assign(this.templatePreview, { urlImage: urlImage });
    }

    /** Filter */
    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        if (this.dataSource) {
            this.dataSource.filter = filterValue.trim().toLowerCase();
            this.obs = this.dataSource.connect();
        }
    }

    ngOnDestroy(): void {
        if (this.dataSource) {
            this.dataSource.disconnect();
        }
    }

}
