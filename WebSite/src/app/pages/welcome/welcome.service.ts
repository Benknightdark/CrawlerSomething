import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private http:HttpClient) {


   }
  getData(){
    return this.http.get(`${environment.apiUrl}/api/ithome/list`);
  }
  addData(data){
    const headers = new HttpHeaders().set('Content-Type', 'text');

    return this.http.post<string>(`${environment.apiUrl}/api/ithome/`,data);
  }
}
