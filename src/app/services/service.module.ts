import { NgModule } from '@angular/core';
import {AuthService} from './auth.service';
import { UserService } from './user.service';
import { PlayService } from './play.service';
@NgModule({
    declarations: [],
    imports: [ ],
    exports: [],
    providers: [AuthService,UserService,PlayService],
})
export class APIModule {}   