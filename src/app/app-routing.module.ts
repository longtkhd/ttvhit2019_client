import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { JudgeComponent } from './judge/judge.component';

const routes: Routes = [
    { path: 'judge', component: JudgeComponent },
    // { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    { path: 'login', component: LoginComponent },
    { path: "**", component: ErrorPageComponent },
    // { path: '', loadChildren: './main/main.module#MainModule' },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
