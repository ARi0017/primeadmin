import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamecategoryRoutingModule } from './gamecategory-routing.module';
import { GamecategoryComponent } from './gamecategory.component';


@NgModule({
  declarations: [GamecategoryComponent],
  imports: [
    CommonModule,
    GamecategoryRoutingModule
  ]
})
export class GamecategoryModule { }
