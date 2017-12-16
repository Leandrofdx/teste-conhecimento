import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API } from '../app.api';
import { Questions, Ask } from './questions.model';

@Injectable()
export class QuestionsService {

  constructor(private http: HttpClient){}

    questionById(id: string): Observable<Questions[]>{
      return this.http.get<Questions[]>(`${API}/questions/${id}`)
    }
}
