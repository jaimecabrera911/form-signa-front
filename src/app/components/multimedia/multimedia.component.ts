import { ChangeDetectorRef, Component, ContentChildren, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActionsMultimediaDirective } from './actions-multimedia.directive';
import { PanelsMultimediaDirective } from './panels-multimedia.directive';
import { AditionalMultimediaDirective } from './aditional-multimedia.directive';
import { DefaultInput } from '../crm-form/default-input';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DetailUploadComponent } from './detail-upload/detail-upload.component';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-multimedia',
    templateUrl: './multimedia.component.html',
    styleUrls: ['./multimedia.component.scss']
})
export class MultimediaComponent  implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ContentChildren(ActionsMultimediaDirective) children: any;
    @ContentChildren(PanelsMultimediaDirective) panels: any;
    @ContentChildren(AditionalMultimediaDirective) aditional: any;

    @Input() title: string;
    @Input() subtitle?: string;
    @Input() searchPanel?: boolean;
    @Input() items: any[];

    listFiles: boolean = true;
    uploadFiles: boolean = false;
    pageSizeOptions = [6, 12, 18, 24, 30, 36];
    page = 0;
    size = 6;
    value: any;
    obs: Observable<any>;
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);


    constructor(private changeDetectorRef: ChangeDetectorRef,
               private matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.changeDetectorRef.detectChanges();
        setTimeout(()=>{
            this.onLoadFiles();
        }, 6000);
    }

    onLoadFiles(): void{
        this.dataSource = new MatTableDataSource<any>(this.items);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
    }

    /** Filter */
    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        if (this.dataSource) {
            this.dataSource.filter = filterValue.trim().toLowerCase();
            this.obs = this.dataSource.connect();
        }
    }

    getPreview(file: any): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '100%';
        dialogConfig.data = {
            file: file,
        };
        this.matDialog.open(DetailUploadComponent, dialogConfig);
    }


    uploadFile(item): void {
        if (item === 'UPLOAD_FILES_SHOW') {
            //this.writeValue(true);
            this.uploadFiles = true;
            this.listFiles = false;
            console.log('upl_1');
        } else {
            this.uploadFiles = false;
            this.listFiles = true;
            console.log('upl_2');
        }
    }

    ngOnDestroy(): void {
        if (this.dataSource) {
            this.dataSource.disconnect();
        }
    }
}
