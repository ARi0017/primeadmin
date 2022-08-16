import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyaccountRoutingModule } from './myaccount-routing.module';
import { MyaccountComponent } from './myaccount.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModule } from 'src/app/nz.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';


@NgModule({
  declarations: [MyaccountComponent],
  imports: [
    CommonModule,
    MyaccountRoutingModule,
    NzCardModule,CommonModule,
    NzModule,
    FormsModule,
    NzPaginationModule,
    ReactiveFormsModule,
   NzFormModule,
   NzAvatarModule,
   NzIconModule,
   NzMentionModule,
   NzInputModule,
   NzFormModule,
   NzListModule
    

  ]
})
export class MyaccountModule { }
