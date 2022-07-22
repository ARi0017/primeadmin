import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { CommissionStatementService } from "src/app/services/commission-statement.service";
import { ICommission } from "src/app/model/common.model";
import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { NgForm } from "@angular/forms";
import { differenceInCalendarDays } from 'date-fns';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-commission-statement',
  templateUrl: './commission-statement.component.html',
  styleUrls: ['./commission-statement.component.scss']
})
export class CommissionStatementComponent extends CommonComponent implements OnInit {

  allCommission: ICommission[] = []
  total: number = 0;
  loading: boolean = false;
  date = {startDate:'',endDate:''};
  today = new Date();
  searchValue = "";
  commissionLength = 0;

  constructor(
    private commissionstatementService: CommissionStatementService,
    private message: NzMessageService,
    router: Router,
    auth: AuthService,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.listConsent();
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }

  ngOnInit(): void {
  }

  getAllCommission() {
    this.loading = true;

    this.commissionstatementService.commissionList(this.pageIndex, this.pageSize, this.sort,this.date.startDate, this.date.endDate)
      .subscribe(res => {
        this.allCommission = res.commissionList;
        this.commissionLength = res.count;
        this.total = res.count;
        this.loading = false;
      });
  }

    //Reset Commission-List without any filter
    reset(): void {
      this.searchValue = "";
      this.pageIndex = 1;
      this.getAllCommission();
    }


      // Can not select days before today and today
  disabledDate = (current: Date): boolean =>

  differenceInCalendarDays(current, this.today) > 0;

  //Search players with date filter
  searchDate(){
      this.loading = true;
      this.commissionstatementService
      .commissionList(this.pageIndex, this.pageSize, this.sort, this.date.startDate, this.date.endDate)
      .subscribe((res) => {
        // console.log(res.playerlist);
        this.allCommission = res.commissionList;
        this.commissionLength = res.count;
        this.total = res.count;
        this.loading = false;

      });
    }

}

