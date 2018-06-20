import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { UserService } from "../services/user.service";
import { SocketService } from '../socket/socket.service';
@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    panelOpenState = false;
    token;
    role;
    name;
    studentId;
    session;
    md5;
    socket:SocketService;
    constructor(private router: Router,private user :UserService) { }

    ngOnInit() {
        //   alert('thang')
        this.role = localStorage.getItem('role');
        this.token = localStorage.getItem('token');
        this.name = localStorage.getItem('name');

        if (this.token) {
            this.user
                .checkLogin(this.token)
                .then(res => {
                    if (res.code == 1) {
                        let role = localStorage.getItem('role');
                        if (role === 'admin' && this.checkRole()) {
                        //    location.reload();
                            // this.router.navigate(['admin','user']);
                            
                        } else if (role == 'user' && this.checkRole()) {
                            this.router.navigate(['']);
                        } else {
                            
                            localStorage.removeItem('token');
                            this.router.navigate(['login']);
                        }
                    } else {
                        localStorage.removeItem('token');
                        this.router.navigate(['login']);
                    }
                })
                .catch(err => {
                    localStorage.removeItem('token');
                    this.router.navigate(['login']);
                });
        } else {
            this.router.navigate(['login']);
        }

    }
    LogOut() {
        let token = localStorage.getItem('token');
        if (token) {
           if(this.socket){
            this.socket.disconnect();
               this.socket.onDisconnect().subscribe(result=>{
               });
           }
            localStorage.removeItem('token');
            this.router.navigate(['login']);
        }
    }
    checkRole(){
        this.md5 = new Md5();
        this.studentId = localStorage.getItem('studentId');
        this.session = sessionStorage.getItem('session');
        let s = this.md5.appendStr(this.role+this.studentId).end();
        if(this.session==s){
            return true;
        }
        else{
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            localStorage.removeItem('studentId');
            localStorage.removeItem('name');
            return false;
        }
    }

}
