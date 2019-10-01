import { Component, OnInit } from '@angular/core';
import { WelcomeService } from './welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private service:WelcomeService) { }

  ngOnInit() {
    this.service.getData().subscribe(a=>{
      console.log(a)
    })
  }

}
