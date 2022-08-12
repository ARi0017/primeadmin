import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { NzModule } from 'src/app/nz.module';
import { UsersComponent } from './users.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { NzButtonModule } from 'ng-zorro-antd/button';
// import { NzTableModule } from 'ng-zorro-antd/table';
// import { NzTabsModule } from 'ng-zorro-antd/tabs';
 import { NzPaginationModule } from 'ng-zorro-antd/pagination';
// import { NzIconModule } from 'ng-zorro-antd/icon';
// import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  declarations: [UsersComponent, AddEditUsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NzModule,
    FormsModule,
    NzPaginationModule,
    ReactiveFormsModule,
   NzFormModule 

  ]
})
export class UsersModule { }
