import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { UserBankingService } from 'src/app/services/user-banking.service';
@Component({
  selector: 'app-user-banking',
  templateUrl: './user-banking.component.html',
  styleUrls: ['./user-banking.component.scss']
})
export class UserBankingComponent implements OnInit {
  
  transactionlistArray:any=[];
  pendingTransactionList:any=[];
  user={transactionType:null,amount:null,remarks:''}
  pendingLoading:boolean=false;
  allTransactionLoading:boolean=false;
  allTransaction:number;
  allPending:number;
  date = {startDate:'',endDate:''};

  constructor(private userBanking:UserBankingService) { }

  ngOnInit(): void {
    this.transactionlist();
    this.getPendingTransactionlist();
  }

  transactionlist(){
    this.allTransactionLoading=true;
    this.userBanking.AllUsertransactionlist(this.date.startDate,this.date.endDate).subscribe((res)=>{
      console.log('getlist',res.data);
      this.transactionlistArray=res.data;
      this.allTransaction=res.data.length;
      this.allTransactionLoading=false;
    })
  };

  getPendingTransactionlist(){
    this.pendingLoading=true;
    this.userBanking.UserPendingtransactionlist(this.date.startDate,this.date.endDate).subscribe((res)=>{
      console.log('pendingList',res.data);
      this.pendingTransactionList=res.data;
      this.allPending=res.data.length;
      this.pendingLoading=false;
    })
  };

  updateTransactionStatus(id:any){
    this.userBanking.updateUserTransactionStatus(id).subscribe((res)=>{
      this.ngOnInit();
    })
  }

  // entersearchvalue: string ='';
  // @Output()
  // searchTextChange: EventEmitter<string> = new EventEmitter<string>();
  // searchTextChange(){
  //   this.searchTextChange.emit( this.entersearchvalue)

  // }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }
  searchDate(){
   this.transactionlist();
   this.getPendingTransactionlist();
  }

}
