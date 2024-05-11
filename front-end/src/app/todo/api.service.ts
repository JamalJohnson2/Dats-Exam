import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class APIService {

  constructor(private http: HttpClient) { }

  Get(module: string): Observable<any>{
  return this.http.get(`http://localhost:3001/api/{module}`);
  }
}
