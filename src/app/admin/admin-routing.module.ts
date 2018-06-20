import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user/user.component';
import {ExamineeComponent} from './examinee/examinee.component'
import { QuestionComponent } from './question/question.component';
const routes: Routes = [
    {
        path:'admin',component:AdminComponent,
        children:[
            {path:'examinee',component:ExamineeComponent},
            {path:'user',component:UserComponent},
            {path:'question',component:QuestionComponent},
        ],
       
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoutingAdminModule {}
// export const routedComponents = [AdminComponent];
