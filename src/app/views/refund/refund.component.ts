import { Component, OnInit } from '@angular/core';
import { RefundService } from '../../services/refund/refund.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {
  refundList:[];
  constructor(
    private refund:RefundService,
    private toaster:ToasterService

  ) { }

  ngOnInit() {
    this.getRefundList();
  }

  getRefundList(){
   this.refund.getRefundList().subscribe((res)=>{
     if(res.status==="200"){
     this.refundList=res.data
     console.log(this.refundList);
     }
   })
  };

  changeStatus(id:string){
    this.refund.updateStatus(id).subscribe((res)=>{
      console.log(res);
      if(res.status="200"){
        this.toaster.Success(res.message);
        this.ngOnInit();
      }else{
        this.toaster.Error('Some thing went wrong')
      }
      
    })
  }

}
