import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/Order/order.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  id:any; master:object; detail:object; DeliveryTime:any = new Date();
  constructor(private route: ActivatedRoute, private orderService: OrderService, private toaster: ToasterService) { 
    this.route.paramMap.subscribe(res => {
      this.id = res.get("id");
    });
    this.OrderWholeData();
  }
  OrderWholeData() {
    const orderid = {"OrderId":this.id}
    // const orderid = {"OrderId":171}
    this.orderService.getOrderWholeData(orderid).subscribe(data => {
      if (data) {
          this.master = data.master[0];
          console.log("Master",this.master);
          this.detail = data.detail;
          console.log("Detail",data.detail);
        }
        else {
          this.toaster.Error("Couldn't fetch detail, server error");
        }
    });
  }
  print(): void {
    let newWin;
    var divToPrint = document.getElementById("invoice-POS");  
    newWin = window.open("");  
    newWin.document.write(divToPrint.outerHTML);  
    newWin.print();  
    newWin.close(); 
}
  ngOnInit() {
    //this.print();
  }

}
