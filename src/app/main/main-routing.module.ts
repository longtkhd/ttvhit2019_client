import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import {  MainComponent} from "./main.component";

const routes: Routes = [
    {
        path:'',component:MainComponent,
        children:[
            {path:'play',component:PlayComponent},
            // {path:'',redirectTo:'play',pathMatch:'prefix'}
        ],
       
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoutingMainModule {}
// export const routedComponents = [MainComponent];
