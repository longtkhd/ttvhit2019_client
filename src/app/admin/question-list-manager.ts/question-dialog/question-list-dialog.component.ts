import { Component, OnInit, Inject ,} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-question-list-dialog',
  templateUrl: './question-list-dialog.component.html',
  styleUrls: ['./question-list-dialog.component.scss']
})
export class EditAddQuestionListDialogComponent implements OnInit {
  toppings = new FormControl();

  constructor(public dialogRef: MatDialogRef<EditAddQuestionListDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    if(this.data.quesitonList.questions){
      this.toppings.setValue(this.data.quesitonList.questions);

    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  selected($event) {
    this.data.selectQuestion = this.toppings.value;
  }
}
