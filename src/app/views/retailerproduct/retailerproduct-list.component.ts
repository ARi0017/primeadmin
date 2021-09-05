import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { RetailerproductService } from '../../services/Retailerproduct/retailerproduct.service';

@Component({
  selector: 'app-retailerproduct-list',
  templateUrl: './retailerproduct-list.component.html',
})
export class RetailerproductListComponent implements OnInit {
  data: any;
  url: string;
  products: object;
  datacategory: any;
  retailer_id: string = '';
  category_id: string = '';
  product_arr: any[] = [];
  ProdRetailerId: number;
  CreatedBy: number;
  constructor(private retailerproductService: RetailerproductService,
    private router: Router,
    private toaster: ToasterService) {
  }

  ngOnInit() {
    this.getRetailer();
    this.getCategories();
  }



  getRetailer() {
    const retailer = {
      "Name": "",
      "Phone": "",
      "Address": "",
      "Pincode": "",
      "Landmark": "",
      "ContactPerson": "",
      "Page": "1",
      "Size": "10"
    }
    this.retailerproductService.getRetailer(retailer).subscribe(data => {
      this.data = data.data;
    });
  }
  getCategories() {
    const category = {
      'category': '',
      'page': '1',
      'size': '10'
    };
    this.retailerproductService.getCategories(category).subscribe(data => {
      this.datacategory = data.data[0];
    });
  }
  addRetailerproduct() {
    const product = {
      'category': '',
      'name': '',
      'page': '1',
      'size': '10'
    };
    this.retailerproductService.getProductList(product).subscribe(data => {
      this.products = data.data[0];
      this.url = data.Imgurl;
    });
  }
  getProductbyretailerid() {
    const retailer = {
      "RetailerId": this.retailer_id,
      "CategoryId": this.category_id
    }
    this.retailerproductService.getProductbyretailerid(retailer).subscribe(data => {
      this.products = data.data;
      this.url = data.Imgurl;
    });
  }


  addProd(productObj: { product: any, i: number, price: HTMLInputElement, remarks: HTMLInputElement, available: boolean}) {
    if (!this.retailer_id) {
      this.toaster.Warning("Please select a retailer.");
      return;
    }
    if (this.product_arr[productObj.i] != null) {
      // this.product_arr.splice(productObj.i, 1);
      delete (this.product_arr[productObj.i]);
      productObj.price.disabled = false;
      productObj.remarks.disabled = false;
    } else {
      this.product_arr[productObj.i] = {
        RetailerId: this.retailer_id,
        ProductId: productObj.product.ProductId,
        Price: productObj.price.value ? productObj.price.value : productObj.product.Cost,
        Remarks: productObj.remarks.value,
        IsAvailable: productObj.available ? '1' : '0',
        CreatedBy: 1,
        In_RetailerId: 0
      }
      productObj.price.disabled = true;
      productObj.remarks.disabled = true;
    }
    console.log(this.product_arr);
  }

  submitdata() {
    var filtered = this.product_arr.filter(function (el) {
      return el != null;
    });
    this.retailerproductService.addeditRetailerproduct(filtered).subscribe(
      res => {
        console.log(res.status);
        var status = res.status;
        if (status == 200) {
          this.toaster.Success("Retailer Product Added Successfully");
          this.router.navigate(["/retailerproduct-list"]);
        } else {
          this.toaster.Error("Server Error!");
        }
      },
      err => {
        this.toaster.Error("Something Went Wrong");
      }
    );
  }






}
