import { Component, OnInit } from '@angular/core';
import { MyaccountService } from 'src/app/services/myaccount.service';


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {
  agentDetailLoading:boolean=false;
  agentDetailArr:any=[];
  constructor(private myAccount:MyaccountService) { }

  ngOnInit(): void {
   this.getCurrentUserDetail();
  }


  getCurrentUserDetail(){
    this.agentDetailLoading=true;
    this.myAccount.agentDetail().subscribe((res)=>{
      console.log(res);
      this.agentDetailArr=res;
      this.agentDetailLoading=false;
    })
  }


}
