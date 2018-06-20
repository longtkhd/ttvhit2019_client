import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatDialog,MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserService } from '../../services';

/**
 * @title Table with pagination
 */
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    displayedColumns = ['position', 'name', 'studentId', 'birthDate', 'phone', 'online', 'action'];
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    dataSource;
    count = 0;
    updateRef;
    constructor(private user: UserService, public dialog: MatDialog, public snackBar: MatSnackBar) { }
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
       this.SetData();
    }
    SetData(){
        this.user.GetAdmins().then(result => {
            this.dataSource =new MatTableDataSource<Object>(result.data); 
            this.dataSource.paginator = this.paginator;
        })
    }
   
    openDialog(title: string, content: string, studentId: string, callback: Function) {
        let dialogRef = this.dialog.open(QuestionDialog, {
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
                                this.SetData();
                            } else {
                                this.openSnackBar(resultDelete.message, 'Đóng');
                            }
                        })
                        .catch(err => console.log(err));
                }
            });
        }
        if (comand == 'lock') {
            this.openDialog('Thông báo', 'Bạn có muốn thay đổi trạng thái người dùng ' + studentId, studentId, (result) => {
                if (result == true) {
                    this.user.LockUser(studentId)
                        .then(reSultLock => {
                            if (reSultLock.code == 1) {
                                this.SetData();
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
    Update(studentId: string) {
        this.user.GetUserById(studentId)
        .then(data=>{
            if(data.code==1){
                this.updateRef = this.dialog.open(UpdateDialog, {
                    width: '500px',
                    data: data.user
                });
                this.updateRef.afterClosed().subscribe(result=>{
                    this.user.Update(result).then(re=>{
                        this.SetData();
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
  
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

}
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
export class QuestionDialog {

    constructor(
        public dialogRef: MatDialogRef<QuestionDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

}
@Component({
    selector: 'dialog-update',
    templateUrl:'update.component.html',
    styleUrls: ['./user.component.css']
})
export class UpdateDialog {

    constructor(
        public dialogRef: MatDialogRef<UpdateDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
        this.dialogRef.close();
    }

}
@Component({
    selector: 'snack-bar-component-example-snack',
    template: ``,
    styles: [``],
})
export class NoteCom {
    constructor(public snackBar: MatSnackBar) { }

    public openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 5000,
        });
    }
}
