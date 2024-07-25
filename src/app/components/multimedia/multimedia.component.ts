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
import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class MultimediaComponent extends DefaultInput implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ContentChildren(ActionsMultimediaDirective) children: any;
    @ContentChildren(PanelsMultimediaDirective) panels: any;
    @ContentChildren(AditionalMultimediaDirective) aditional: any;

    @Input() title: string;
    @Input() subtitle?: string;
    @Input() searchPanel?: boolean;
    @Input() items: any[];

    listFiles: boolean = true;
    itemsList: boolean = true;
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

    formEditUpload: FormGroup = new FormGroup({
        dataFile: this._formBuilder.array([])
    });

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private matDialog: MatDialog
    ) {
        super();
    }

    async ngOnInit(): Promise<void> {
        this.changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.itemsList = false;
            this.onLoadFiles();
        }, 9900);
    }

    onLoadFiles(): void {
        if (this.items) {
            this.dataSource = new MatTableDataSource<any>(this.items);
            this.dataSource.paginator = this.paginator;
            this.editFile(this.items);
            this.obs = this.dataSource.connect();
        }
    }

    refresh(): any {
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
        this.editFileGroup(null, false, this.formInit.value.filesUploads);
    }

    addItem(id): void {
        setTimeout(() => {
            this.writeValue(this.formEditUpload.get('dataFile').value);
        }, 1000);
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

    editFile(items): void {
        items?.forEach((element: any, i: number) => {
            this.editFileGroup(element.id, false, null);
        });
    }

    editFileGroup(id, stateDelete, filesUploads): void {
        const itemsFile = this.formEditUpload.get('dataFile') as FormArray;
        const data = this.formEditUpload.get('dataFile').value.filter((item: any) => item.id === id).map((item: any) => item.id);
        if (data[0] !== id) {
            itemsFile.push(this.formEditFile(id, stateDelete, filesUploads));
        }
        setTimeout(() => {
            this.writeValue(this.formEditUpload.get('dataFile').value);
        }, 1000);
    }

    formEditFile(id, stateDelete, filesUploads): FormGroup {
        return this._formBuilder.group({
            id: [id],
            stateDelete: [stateDelete],
            filesUploads: [filesUploads]
        });
    }

    ngOnDestroy(): void {
        if (this.dataSource) {
            this.dataSource.disconnect();
        }
    }

    initForm(): void {
    }
}
