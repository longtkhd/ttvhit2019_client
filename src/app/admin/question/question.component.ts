import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {  MatDialog, MatTableDataSource , PageEvent, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DialogQ } from '../dialog.component';
import { QuestionService } from "../../services/quesion.service";
import { Router } from '@angular/router';

@Component({
    selector: 'admin-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
    displayedColumns = ['position', 'content', 'A', 'B', 'C', 'D', 'action'];
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    dataSource;
    count = 0;
    updateRef;
    data = {
        total:10
    }
    pageEvent: PageEvent;
    pageIndex;
    currentPage = 1;
    currentLimit = 10;

    constructor(private queS: QuestionService, public dialog: MatDialog, public snackBar: MatSnackBar,private router:Router) { }

    ngOnInit() {
        let token = localStorage.getItem('token');
        this.queS.checkLogin(token).then(result=>{
            this.SetData(1, 10); 
        }).catch(err=>{
            localStorage.removeItem('token');
            localStorage.removeItem('studentId');
            localStorage.removeItem('name');
            localStorage.removeItem('role');
            this.router.navigate(['login']);
        })
    }
    
    SetData(page, limit) {
        
        this.queS.GetQuestions(page, limit).then(result => {
            this.data = result.data;
            this.dataSource = new MatTableDataSource<Object>(result.data.docs);
        })
    }
    GetIndexPage(event){
        this.queS.GetQuestions((event.pageIndex+1),event.pageSize).then(result=>{
            this.currentPage = (event.pageIndex+1);
            this.currentLimit = event.pageSize;
            this.data = result.data;
            this.dataSource = new MatTableDataSource<Object>(result.data.docs);
        })
    }
    openDialog(title: string, content: string, studentId: string, callback: Function) {
        let dialogRef = this.dialog.open(DialogQ, {
            width: '250px',
            data: { name: title, content: content }

        });

        dialogRef.afterClosed().subscribe(result => {
            return callback(result);
        });
    }
    Open(studentId: string, comand: string) {
        if (comand == 'delete') {
            this.openDialog('Thông báo', 'Bạn có muốn xóa người dùng ' + studentId, studentId, (result) => {
                if (result == true) {
                    this.queS.DeleteQuestion(studentId)
                        .then(resultDelete => {
                            if (resultDelete.code == 1) {
                                this.openSnackBar(resultDelete.message, 'Đóng');
                                this.SetData(this.currentPage,this.currentLimit);
                            } else {
                                this.openSnackBar(resultDelete.message, 'Đóng');
                            }
                        })
                        .catch(err => console.log(err));
                }
            });
        }
    }
    Update(id: string) {
        this.queS.GetQuestionById(id)
        .then(data=>{
            console.log(data.data)
            if(data.code==1){
                this.updateRef = this.dialog.open(EditQuestion, {
                    width: '500px',
                    data: data.data
                });
                this.updateRef.afterClosed().subscribe(result=>{
                    this.queS.Update(result).then(re=>{
                        this.SetData(this.currentPage,this.currentLimit);
                        this.openSnackBar("Cập nhập câu hỏi thành công ", 'Đóng');  
                    })
                });
            }else{
                this.openSnackBar("Bạn không có quyền ", 'Đóng');  
            }
        })
        .catch(err=>{
            this.openSnackBar("Không tìm thấy câu hỏi", 'Đóng');
        })
        
    }
    Add(){
        let data = {
            content: "",
            correctAnswer: "",
            isHaveOption: true,
            isHtml: false,
            options: [
                { numbering: "a", answer: "" }, { numbering: "b", answer: "" },
                { numbering: "b", answer: "" }, { numbering: "b", answer: "" }
            ],
            score:0
        }
         
        this.updateRef = this.dialog.open(AddQuestion, {
            width: '500px',
            data: data
        });
        this.updateRef.afterClosed().subscribe(result=>{
            this.queS.Add(result).then(re=>{
                this.SetData(this.currentPage,this.currentLimit);
                this.openSnackBar("Thêm câu hỏi thành công ", 'Đóng');  
            }).catch(err=>{
                this.openSnackBar("Thêm câu hỏi thất bại ", 'Đóng');  
            })
        });
    }
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }
}
@Component({
    selector: 'dialog-update',
    templateUrl:'update.component.html',
    styleUrls: ['./question.component.css']
})
export class EditQuestion {

    constructor(
        public dialogRef: MatDialogRef<EditQuestion>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
        this.dialogRef.close();
    }

}
@Component({
    selector: 'dialog-add',
    templateUrl:'add.component.html',
    styleUrls: ['./question.component.css']
})
export class AddQuestion {

    constructor(
        public dialogRef: MatDialogRef<AddQuestion>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
        this.dialogRef.close();
    }

}
