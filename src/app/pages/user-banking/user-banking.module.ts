import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBankingRoutingModule } from './user-banking-routing.module';
import { UserBankingComponent } from './user-banking.component';
import { NzModule } from 'src/app/nz.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { NzButtonModule } from 'ng-zorro-antd/button';
// import { NzTableModule } from 'ng-zorro-antd/table';
// import { NzTabsModule } from 'ng-zorro-antd/tabs';
 import { NzPaginationModule } from 'ng-zorro-antd/pagination';
// import { NzIconModule } from 'ng-zorro-antd/icon';
// import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CreaterequestComponent } from './createrequest/createrequest.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';







@NgModule({
  declarations: [UserBankingComponent, CreaterequestComponent],
  imports: [
    CommonModule,
    UserBankingRoutingModule,
    NzModule,
    FormsModule,
    NzPaginationModule,
    ReactiveFormsModule,
   NzFormModule,
   NzCardModule,
   NzDatePickerModule,
   NzToolTipModule
   
   

   
   
  ]
})
export class UserBankingModule {}
