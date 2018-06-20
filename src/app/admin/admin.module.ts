import { NgModule } from '@angular/core';
import { MatterialModule } from '../material/material.module';
import {CommonModule} from '@angular/common'
import { RoutingAdminModule } from './admin-routing.module';
import { UserComponent ,QuestionDialog, NoteCom,UpdateDialog} from './user/user.component';
import {ExamineeComponent, EditExaminee} from './examinee/examinee.component'
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { DialogQ } from './dialog.component';
import { QuestionComponent, EditQuestion, AddQuestion } from './question/question.component';
@NgModule({
    imports: [ MatterialModule,CommonModule,FormsModule,RoutingAdminModule],
    declarations: [UserComponent,AddQuestion,QuestionComponent,QuestionDialog,UpdateDialog,EditQuestion,EditExaminee,DialogQ,NoteCom,ExamineeComponent, AdminComponent],
    exports: [],
    providers: [],
    entryComponents: [QuestionDialog,AddQuestion,DialogQ,UpdateDialog,NoteCom,EditExaminee,EditQuestion]
})
export class AdminModule { }
