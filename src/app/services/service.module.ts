import { NgModule } from '@angular/core';
import {AuthService} from './auth.service';
import { UserService } from './user.service';
import { PlayService } from './play.service';
import { QuestionService } from './quesion.service';
@NgModule({
    declarations: [],
    imports: [ ],
    exports: [],
    providers: [AuthService,UserService,PlayService,QuestionService],
})
export class APIModule {}   