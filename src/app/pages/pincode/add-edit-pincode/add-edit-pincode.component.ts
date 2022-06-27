import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Pincode } from 'src/app/model/pincode.model';

import { CommonComponent } from "../../common/common.component";
import { PincodeService } from "src/app/services/pincode.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-add-edit-pincode',
  templateUrl: './add-edit-pincode.component.html',
  styleUrls: ['./add-edit-pincode.component.scss']
})
export class AddEditPincodeComponent extends CommonComponent implements OnInit {
  pincodeId: string;
  pincode: Pincode = new Pincode();

  constructor(
    private pincodeService: PincodeService,
    router: Router,
    auth: AuthService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.route.paramMap.subscribe((res) => {
      this.pincodeId = res.get("id");
    });
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }

  ngOnInit(): void {
    if (this.pincodeId) {
      this.getRolebyId();
      this.editConsent();
    } else {
      this.addConsent();
    }
  }


  addPincode(): void {
    //console.log(this.pincode);
    this.pincodeService.addPincode(this.pincode)
      .subscribe((res) => {
        this.message.success(res.message);
        this.router.navigate(["pincodes"]);
      });
  }

  //Get a role details by its id
  getRolebyId() {
    this.pincodeService.getPincodeById(this.pincodeId)
      .subscribe((res) => {
        this.pincode = res.data;
      });
  }


  editPincode(): void {
    //console.log(this.pincode);
    this.pincodeService.updatePincode(this.pincodeId, this.pincode)
      .subscribe((res) => {
        this.message.success(res.message);
        this.router.navigate(["pincodes"]);
      });
  }
}
