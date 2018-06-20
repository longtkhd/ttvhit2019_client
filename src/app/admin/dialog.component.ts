import {Inject,Component} from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';

@Component({
    selector: 'dialog-question',
    template: `
    <div >
    <h1 mat-dialog-title>{{data.name}}</h1>
    <div mat-dialog-content>
      <p>{{data.content}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true" tabindex="2">YES</button>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">NO</button>
    </div>
    </div>
    `,
})
export class DialogQ {

    constructor(
        public dialogRef: MatDialogRef<DialogQ>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

}