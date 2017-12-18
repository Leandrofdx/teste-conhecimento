import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API } from '../../app.api';

@Injectable()
export class QuestionsService {

  public acertou = []
  public errou = []

  constructor(private http: HttpClient){}

    questionById(id: string): Observable<any[]>{
      return this.http.get<any[]>(`${API}/questions/${id}`)
    }

    resultado(acertou, errou) {
  		this.acertou =  acertou
  		this.errou = errou
   }

    get qtdAcertou() {
    	return this.acertou
    }

    get qtdErrou() {
    	return this.errou
    }

}
