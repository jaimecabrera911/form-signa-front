import { ChangeDetectorRef, Component, ContentChildren, Input, OnDestroy, OnInit, ViewChild, forwardRef } from '@angular/core';
import { ActionsMultimediaDirective } from './actions-multimedia.directive';
import { PanelsMultimediaDirective } from './panels-multimedia.directive';
import { AditionalMultimediaDirective } from './aditional-multimedia.directive';
import { DefaultInput } from '../crm-form/default-input';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DetailUploadComponent } from './detail-upload/detail-upload.component';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-multimedia',
    templateUrl: './multimedia.component.html',
    styleUrls: ['./multimedia.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => MultimediaComponent)
        }
    ]
})
export class MultimediaComponent  extends DefaultInput implements OnInit, OnDestroy {

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

    formInit: any = this._formBuilder.group({
        filesUploads: new FormControl()
    });


    constructor(private changeDetectorRef: ChangeDetectorRef,
                private _formBuilder: FormBuilder,
                private matDialog: MatDialog
    ) {
        super();
    }

    ngOnInit(): void {
        this.changeDetectorRef.detectChanges();
        setTimeout(()=>{
            this.onLoadFiles();
        }, 9000);
    }

    onLoadFiles(): void{
        this.dataSource = new MatTableDataSource<any>(this.items);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
    }

    refresh(): any{
        this.onLoadFiles();
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



    updateFilesForm(): void {
        this.writeValue(this.formInit.value.filesUploads);
    }

    uploadFile(item): void {
        if (item === 'UPLOAD_FILES_SHOW') {
            this.uploadFiles = true;
            this.listFiles = false;
        }

        if (item === 'UPLOAD_FILES_HID') {
            this.uploadFiles = false;
            this.listFiles = true;
        }
    }

    ngOnDestroy(): void {
        if (this.dataSource) {
            this.dataSource.disconnect();
        }
    }

    initForm(): void {
    }
}
