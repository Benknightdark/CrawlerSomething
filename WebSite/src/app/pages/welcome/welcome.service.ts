import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private http:HttpClient) { }
  getData(){
    return this.http.get("http://localhost:56969/api/ithome/list");
  }
}
