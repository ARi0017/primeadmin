import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { CategoryDropDown } from 'src/app/model/category.model';

import { CommonComponent } from "../../common/common.component";
import { ProductService } from "src/app/services/product.service";
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { NzUploadFile } from 'ng-zorro-antd';




@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent extends CommonComponent implements OnInit {
  productId: string = undefined;
  product: Product = new Product();
  fileList: any[] = [];
  loading: Boolean = false;
  categories: CategoryDropDown[] = [];


  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    router: Router,
    auth: AuthService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.route.paramMap.subscribe((res) => {
      this.productId = res.get("id");
    });
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }

  ngOnInit(): void {
    this.populateCategory();

    if(Boolean(this.productId)) {
      this.getProductById();
    }
  }

  populateCategory(): void {
    this.loading = true;
    this.categoryService.categoryListForDropdown()
      .subscribe((res) =>{
        this.categories = res.data;
        this.loading = false;
      })
  }

  async addProduct(): Promise<void> {
    this.loading = true;
    this.product.image = undefined;

    if(this.fileList.length == 1) {
      this.product.image =  await this.getBase64(this.fileList[0]);
      this.fileList = [];
    } else {
      this.message.error("Please select image");
      return;
    }

    this.product.isShowOnHomePage = this.product.isShowOnHomePage ? "1" : "0";
    this.product.isBestSeller = this.product.isBestSeller ? "1" : "0";
    //console.log(this.product);
    this.productService.addProduct(this.product)
      .subscribe((res) => {
        this.message.success(res.message);
        this.router.navigate(["products"]);
      });
  }

  getProductById(): void {
    this.loading = true;
    this.productService.getProductById(this.productId)
      .subscribe((res) =>{
        this.product = res.data;
        this.product.isShowOnHomePage = Boolean(Number(this.product.isShowOnHomePage));
        this.product.isBestSeller = Boolean(Number(this.product.isBestSeller));
        this.loading = false;
      });
  }

  async editProduct(): Promise<void> {
    this.loading = true;
    this.product.image = undefined;
    
    if(this.fileList.length == 1) {
      this.product.image =  await this.getBase64(this.fileList[0]);
      this.fileList = [];
    }

    this.product.isShowOnHomePage = this.product.isShowOnHomePage ? "1" : "0";
    this.product.isBestSeller = this.product.isBestSeller ? "1" : "0";
    //console.log(this.product);
    this.productService.updateProduct(this.productId, this.product)
      .subscribe((res) => {
        this.message.success(res.message);
        this.router.navigate(["products"]);
      });

  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  getBase64(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      var base64String = "";
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        base64String = reader.result.toString();
        //console.log(base64String);
        resolve(base64String);
      };
      reader.onerror = function (error) {
       // console.log('Error: ', error);
      };
    })
 }
}
