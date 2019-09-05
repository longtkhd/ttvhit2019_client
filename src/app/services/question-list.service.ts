import { Injectable } from '@angular/core';
import { Headers, Http, Jsonp } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import 'rxjs';
import { config } from '../config';

@Injectable()
export class QuestionListService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private heroesUrl = config.Url + '/api/questionlist';

  constructor(private http: Http, private httpClient: HttpClient) { }
  public checkLogin(token: string): Promise<any> {
    var url = this.heroesUrl + '/check';

    this.headers.set('x-access-token', token);
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(err => this.handleError);
  }

  public Update(data): Promise<any> {
    let Url = this.heroesUrl + '/' + data.quesitonList._id;
    let lq = {
      questionList: data.quesitonList,
      questions: data.selectQuestion
    };
    console.log(lq)
    return this.http
      .put(Url, lq, { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  public Add(data): Promise<any> {
    let Url = this.heroesUrl;
    let lq = JSON.stringify({
      questionList: data.quesitonList,
      questions: data.selectQuestion
    });
    return this.http
      .post(Url, lq, { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  public GetQuestions(page: number, limit: number) {
    this.headers.set('x-access-token', localStorage.getItem('token'));
    let url = this.heroesUrl + '/?page=' + page + '&limit=' + limit;
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  public GetQuestionById(id: string) {
    let url = this.heroesUrl + '/' + id;
    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  public DeleteQuestion(id: string) {
    let url = this.heroesUrl + '/' + id;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
