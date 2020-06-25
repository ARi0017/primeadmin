import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { OrderService } from '../../services/Order/order.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit {
  data: any;
  constructor(private orderService: OrderService,
    private router: Router) {
  }

  ngOnInit() {
    this.getOrders();
  }

//   search(name: string) {
//     const category1 = {
//       'category': name,
//       'page': '1',
//       'size': '10'
//      };
//     this.categoryService.getCategories(category1).subscribe(data => {
//       this.data = data.data[0];
// //console.log(data);
//     });
//   }
  
getOrders() {
//     const category = {
//       'category': '',
//       'page': '1',
//       'size': '10'
//      };
//     this.orderService.getOrders(category).subscribe(data => {
//       this.data = data.data[0];
// //console.log(this.data);
//     });
  }

 

  onDelete(id: any) {
    if (!confirm("Are You Sure ?")) {
      return;
    }

  }
  // Change Status
  onStatus(id: any, is_active: string) {
    if (!confirm("Are You Sure ?")) {
      return;
    }

  }




}
