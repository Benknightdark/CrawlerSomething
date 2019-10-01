import { Component, OnInit } from '@angular/core';
import { WelcomeService } from './welcome.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  url: string;
  dataSet
  constructor(private service: WelcomeService) { }

  ngOnInit() {
    this.service.getData().subscribe(a => {
      this.dataSet=a;
      console.log(a)
    })
  }
  onClick() {
    const data = { url: this.url };
    const re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (re.test(this.url)) {
      console.log("Valid");
      this.service.addData(data).subscribe(a => {
        console.log(a)
        this.url=''
        alert("已開始爬取")

        this.service.getData().subscribe(a => {
          this.dataSet=a;
          console.log(a)
        })
      },
        error => {
          alert(error.message)
        }
      )
    } else {
      alert("不符合網址格式")
      return;
    }


  }

}
