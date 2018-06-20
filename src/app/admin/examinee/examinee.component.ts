import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {  MatDialog, MatTableDataSource , PageEvent, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserService } from '../../services';
import { DialogQ } from '../dialog.component';

/**
 * @title Table with pagination
 */
@Component({
    selector: 'admin-examinee',
    templateUrl: './examinee.component.html',
    styleUrls: ['./examinee.component.css']
})
export class ExamineeComponent implements OnInit {
    displayedColumns = ['position', 'name', 'studentId', 'birthDate', 'phone', 'online', 'action'];
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
    constructor(private user: UserService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.SetData(1, 10);
    }
    SetData(page, limit) {
        
        this.user.GetUsers(page, limit,undefined).then(result => {
            this.data = result.data;
            this.dataSource = new MatTableDataSource<Object>(result.data.docs);
        })
    }
    GetIndexPage(event){
        this.user.GetUsers((event.pageIndex+1),event.pageSize,undefined).then(result=>{
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
                    this.user.DeleteUser(studentId)
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
        if (comand == 'lock') {
            console.log(comand)
            this.openDialog('Thông báo', 'Bạn có muốn thay đổi trạng thái người dùng ' + studentId, studentId, (result) => {
                if (result == true) {
                    this.user.LockUser(studentId)
                        .then(reSultLock => {
                            if (reSultLock.code == 1) {
                                this.SetData(this.currentPage,this.currentLimit);
                                this.openSnackBar(reSultLock.message, 'Đóng');
                                
                            } else {
                                this.openSnackBar(reSultLock.message, 'Đóng');
                            }
                        })
                        .catch(err => {
                            this.openSnackBar('Không tìm thấy người dùng', 'Đóng');
                        });
                }
            });
        }
    }
    CheckEx(play){
        if(play.status==1){
            return 'Đang thi';
        }else{
            return 'Đã thi';
        }
    }
    Update(studentId: string) {
        this.user.GetUserById(studentId)
        .then(data=>{
            if(data.code==1){
                this.updateRef = this.dialog.open(EditExaminee, {
                    width: '500px',
                    data: data.user
                });
                this.updateRef.afterClosed().subscribe(result=>{
                    this.user.Update(result).then(re=>{
                        this.SetData(this.currentPage,this.currentLimit);
                        this.openSnackBar("Cập nhập người dùng thành công ", 'Đóng');  
                    })
                });
            }else{
                this.openSnackBar("Bạn không có quyền ", 'Đóng');  
            }
        })
        .catch(err=>{
            this.openSnackBar("Không tìm thấy người dùng", 'Đóng');
        })
        
    }
    Filter(bol:boolean){
        console.log(bol)
        this.user.GetUsers(this.currentPage,this.currentLimit,bol).then(result => {
            console.log(result)
            this.data = result.data;
            this.dataSource = new MatTableDataSource<Object>(result.data.docs);
        })
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
    styleUrls: ['./examinee.component.css']
})
export class EditExaminee {

    constructor(
        public dialogRef: MatDialogRef<EditExaminee>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
        this.dialogRef.close();
    }

}

