import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { WelcomeService } from './welcome.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [WelcomeRoutingModule,
    NzInputModule,NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    CommonModule

  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  providers:[WelcomeService]
})
export class WelcomeModule { }
