import { NgModule } from '@angular/core';
import { MatterialModule } from '../material/material.module';
import {CommonModule} from '@angular/common'
import { RoutingAdminModule } from './admin-routing.module';
import { UserComponent ,QuestionDialog, NoteCom,UpdateDialog} from './user/user.component';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [ MatterialModule,CommonModule,FormsModule,RoutingAdminModule],
    declarations: [UserComponent,QuestionDialog,UpdateDialog,NoteCom, AdminComponent],
    exports: [],
    providers: [],
    entryComponents: [QuestionDialog,UpdateDialog,NoteCom]
})
export class AdminModule { }
