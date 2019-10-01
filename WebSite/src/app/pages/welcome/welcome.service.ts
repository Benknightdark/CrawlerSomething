import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private http:HttpClient) { }
  getData(){
    return this.http.get(`${environment.apiUrl}/api/ithome/list`);
  }
  addData(data){
    return this.http.post(`${environment.apiUrl}/api/ithome`,data);
  }
}
