import { Component, OnInit } from '@angular/core';
import { TaxCategoryService } from '../../services/TaxCategory/tax-category.service';
import { CustomerService } from '../../services/Customer/customer.service';
@Component({
  selector: 'app-agent-tree',
  templateUrl: './agent-tree.component.html',
  styleUrls: ['./agent-tree.component.scss']
})
export class AgentTreeComponent implements OnInit {
  data : any = [];
  alibabaProductSubTotal : any = 0;
  nonalibabaProductSubTotal : any = 0;
  public isCollapsed = false;
  businessLength : any = 0;
  customerId : any;
  keyword = 'AgentName';
  agentTreeList : any;
  agentTreeValue : any;
  //panelOpenState = false;
  constructor(
    private TaxService : TaxCategoryService,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    
    this.getData()

  }
  getData(){
    var addData = {"customername":"","customerphone":"","page":1,"Size":100000000}
    this.agentTreeValue = [
      {
        BusinessVolumn:1200,
        CustomerName: "Rishi"
      },{

        BusinessVolumn:1100,
        CustomerName: "Rishi"
      }
    ] 

    console.log(this.agentTreeValue)
    this.customerService.getCustomerList(addData).subscribe(data => {
      this.data = data.data;
      for(var i of this.data){
        i.flagShow = true;
      }
      console.log(this.data)
      // this.businessLength = res.orderLength
      console.log(this.data)
    })
  }
  agentTree(id:any){
    var addData = {
      "customerId":id
    }
    this.TaxService.AgentTreeTraking(addData).subscribe(data => {
      this.agentTreeList = data.data;
      console.log(this.agentTreeList)
    })
  }

}
