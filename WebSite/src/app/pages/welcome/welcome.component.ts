import { Component, OnInit } from '@angular/core';
import { WelcomeService } from './welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  url: string;
  constructor(private service: WelcomeService) { }

  ngOnInit() {
    this.service.getData().subscribe(a => {
      console.log(a)
    })
  }
  onClick() {
    const data = { url: this.url };
    this.service.addData(data).subscribe(a => {
      console.log(a)
      alert("已開始爬取")
    },
      error => {
        alert(error.message)
      }
    )

  }

}
