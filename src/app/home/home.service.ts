import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API } from '../app.api';
import { Matters } from './home.model';


@Injectable()
export class HomeService {

   constructor(private http: HttpClient){}

    matters(): Observable<Matters[]>{
      return this.http.get<Matters[]>(`${API}/matters`)
    }
}

