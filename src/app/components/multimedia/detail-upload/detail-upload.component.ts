
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-detail-upload',
    templateUrl: './detail-upload.component.html',
    styleUrls: ['./detail-upload.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailUploadComponent implements OnInit, OnDestroy {

    urlSafe: SafeResourceUrl;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    // eslint-disable-next-line max-len, @typescript-eslint/member-ordering
    urlDoc: string = 'https://view.officeapps.live.com/op/embed.aspx?src=https://stackblitz.com/storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdkpMIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e75389b18343665404852ed4cba8bd25938fa9bd/file-sample_1MB.doc';

    constructor(
        @Inject(MAT_DIALOG_DATA) public file: any,
        public dialogRef: MatDialogRef<DetailUploadComponent>,
        public sanitizer: DomSanitizer
    ) {
    }

    ngOnInit(): void {
        const urlDocument  = `${environment.urlApp}${this.file.file.url}`;
        console.log('urlDocument ',this.file.file.name);
        if(urlDocument){
            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(urlDocument);
        }
    }

    closeModal(): void{
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

}
