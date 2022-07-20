import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzDividerModule, NzSwitchModule, NzTabsModule } from "ng-zorro-antd";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzPopoverModule } from "ng-zorro-antd/popover";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzCalendarModule } from "ng-zorro-antd/calendar";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzSpaceModule } from "ng-zorro-antd/space";
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

const CORE_COMPONENT_MODULES = [
  CommonModule,
  NzLayoutModule,
  NzMenuModule,
  NzFormModule,
  NzMessageModule,
  NzPopconfirmModule,
  NzTableModule,
  NzIconModule,
  NzFormModule,
  NzInputModule,
  NzCollapseModule,
  NzButtonModule,
  NzSelectModule,
  NzDropDownModule,
  NzSelectModule,
  NzFormModule,
  NzCheckboxModule,
  NzTableModule,
  NzDatePickerModule,
  NzRadioModule,
  NzUploadModule,
  NzToolTipModule,
  NzTabsModule,
  NzPopoverModule,
  NzModalModule,
  NzDividerModule,
  NzCalendarModule,
  NzGridModule,
  NzCardModule,
  NzSpaceModule,
  NzSwitchModule,
  NzSpinModule,
  NzEmptyModule,
  NzInputNumberModule
];

@NgModule({
  declarations: [],
  imports: CORE_COMPONENT_MODULES,
  exports: CORE_COMPONENT_MODULES,
})
export class NzModule {}
