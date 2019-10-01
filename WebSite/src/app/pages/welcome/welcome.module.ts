import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { WelcomeService } from './welcome.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [WelcomeRoutingModule,
    NzInputModule,NzButtonModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  providers:[WelcomeService]
})
export class WelcomeModule { }
