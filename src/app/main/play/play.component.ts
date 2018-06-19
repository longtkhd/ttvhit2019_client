import { Component, OnInit, Input } from '@angular/core';
import { PlayService } from '../../services/play.service';
import { SocketService } from '../../socket';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.css'],
    providers: [PlayService, SocketService]
})
export class PlayComponent implements OnInit {
    panelOpenState: boolean = true;
    listQ; //Danh sách câu hỏi
    listP; //Danh sách câu hỏi lập trình
    dem = 0;
    selectedQuestion; // Câu hỏi được lựa chọn
    selectIndex = 0; // Vị trí câu hỏi được lựa chọn
    fullPlay = null; // Thông tin của vòng chơi
    time; // thời gian còn lại của người chơi
    preTime; //Interval Time
    status;
    timeDis = {
        minute: 0,
        seconds: 0
    }
    @Input() socket: SocketService
    studentId;
    constructor(private play: PlayService) { }

    ngOnInit(): void {
        this.studentId = localStorage.getItem('studentId');
        let token = localStorage.getItem('token');
        this.socket.onLogin().subscribe(
            message => {
                this.socket.login({
                    command: 1000,
                    token: token
                })
            }
        )
        this.play.GetQuestion(this.studentId).then(result => {
            if (result.data.status == 0 || result.data.status == 1) {
                this.fullPlay = result;
                this.time = result.data.time;
                this.listQ = result.data.history.questions;
                this.selectedQuestion = result.data.history.questions[0];
                this.listP = result.data.history.problems;
                this.status = true;
                this.run();
            }
            else {
                this.status = false;
            }
        })
        this.socket.onQuestion().subscribe(result => {
            if (result.data.status == 0 || result.data.status == 1) {
                this.time = result.data.time;
                this.listQ = result.data.history.questions;
                // this.selectedQuestion = result.data.history.questions[0];
                this.listP = result.data.history.problems;
                this.status = true;
                this.run();
            }
            else {
                this.status = false;
            }
        })

    }
    run() {
        var self = this;
        clearInterval(this.preTime);
        this.preTime = setInterval(function () {
            if (self.time > 0) {
                self.time--;
                var minute = Math.floor(self.time / 60) ? Math.floor(self.time / 60) : 0;
                var seconds = self.time - minute * 60;
                self.timeDis = {
                    minute: minute,
                    seconds: seconds
                }
            }
            if (self.time >= 0) {
                self.socket.emitAnswer({ comand: 2000, data: self.fullPlay, time: self.time });
            }
            if (self.time == 0) {
                clearInterval(self.preTime);
                self.socket.emitAnswer({ comand: 3000, studentId: self.studentId });

            }
            if (self.time <= 0) {
                clearInterval(self.preTime);
            }
        }, 1000);
    }

    //Chọn câu hỏi
    onSelect(quest, i) {
        this.selectIndex = i;
        this.selectedQuestion = quest;
    }
    //Câu hỏi trước
    Last() {

        if (this.selectIndex != 0) {
            this.selectedQuestion = this.listQ[--this.selectIndex];
        }
    }
    //Câu hỏi tiếp theo
    Next() {
        if (this.selectIndex != (this.listQ.length - 1)) {
            this.selectedQuestion = this.listQ[++this.selectIndex];
        }
    }
    setButton() {
        if (this.selectIndex == 0) {
            return 1;
        }
        else if (this.selectIndex != (this.listQ.length - 1)) {
            return 3;
        }
        else {
            return 2;
        }
    }
    //Chọn câu trả lời
    SelectAns(event) {
        this.selectedQuestion.answer = event.target.innerText;
        this.selectedQuestion.answered = true;
        this.fullPlay.data.time = this.time;
        this.fullPlay.comand = 1000;
        this.socket.emitAnswer(this.fullPlay);
        this.socket.onQuestion().subscribe(result=>{
            if(result.data.status==0||result.data.status==1){
                this.fullPlay = result;
                this.time = result.data.time;
                this.listQ = result.data.history.questions;
                // this.selectedQuestion = result.data.history.questions[0];
                this.listP = result.data.history.problems;
                this.status = true;
                // this.run();
            }
            else{
                this.status = false;
            }
        })

    }

}
