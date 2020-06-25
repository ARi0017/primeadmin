import { Component, OnInit, Inject } from "@angular/core";
import { navItems } from "../../_nav";
import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute  } from "@angular/router";
import { Product } from '../../models/product';
import { ToasterService } from '../../services/toaster.service';
import { ProductService } from '../../services/Product/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  //styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  Product = new Product(null,null,null,"","","",null,null,null,null,"","",null,null,null,"","","","",null,null,null,null,null,null,null,null,null,null,"","",null);

  parentcategory: object;
  id: any;
  response: any;
  dlFile: any;
  filename: any[];
  constructor(private productService: ProductService,
    //private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService
    ) {
      this.route.paramMap.subscribe(res => {
        this.id = res.get("id");
      });
     }

  ngOnInit() {
    if(this.id){
      this.getProduct();
    }
    this.getParentategories();
  }

  getParentategories(){
    this.productService.getParentategories().subscribe(data => {
      this.parentcategory = data.data[0];
      //console.log(data);
    });
  }
  onSubmit() {
    !this.id ? this.addProduct() : this.editProduct();
  }
  uploadFile(event: any) {
    this.dlFile = event.target.files;
    console.log(this.dlFile);

  }
  getProduct(){
    this.productService.getProductbyid(this.id).subscribe(data => {
      console.log(data);
      this.Product = data.data[0];
      console.log(this.Product);
    });
  }
  editProduct(){
    
    //alert('++++');
    this.filename = [];
    var i = 0;
    if(this.dlFile!= undefined){
    for (let file of this.dlFile) {
      const uploadData = new FormData();
      if (file != undefined) {
        uploadData.append("myFile", file, file.name);
        this.Product.CoverImage = file.name;
        
        this.Product.CreatedBy = 1;
        this.Product.IsFeatured = 1;
        this.Product.ProductId = this.id;
        this.productService.addeditProduct(this.Product).subscribe(
          res => {
            console.log(res.status);
            var status = res.status;
            if (status == 200) {
              this.productService.fileupload(uploadData).subscribe(
                res => {
                  var status = res.status;
                  if (status == 200) {
                    console.log('file uploaded');
                  }
                },
                err => {
                  this.toaster.Error('Something Went Wrong');
                }
              );
              this.toaster.Success("Product Updated Successfully");
              this.router.navigate(["/product-list"]);
            } else {
              this.toaster.Error("Server Error!");
            }
          },
          err => {
            this.toaster.Error("Something Went Wrong");
          }
        );

      }

      this.filename[i] = file.name;
      i++;
    }
  }
  else{
    this.Product.CreatedBy = 1;
    this.Product.IsFeatured = 1;
    this.Product.ProductId = this.id;
    this.productService.addeditProduct(this.Product).subscribe(
      res => {
        console.log(res.status);
        var status = res.status;
        if (status == 200) {
          this.toaster.Success("Product Updated Successfully");
          this.router.navigate(["/product-list"]);
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
  addProduct() {
    this.filename = [];
    var i = 0;
    // this.strDlFileName = "";
    for (let file of this.dlFile) {
      const uploadData = new FormData();
      if (file != undefined) {
        uploadData.append("myFile", file, file.name);
        this.Product.CoverImage = file.name;

        this.Product.ProductId = 0;
        //this.Product.IsFeatured = 1;
        this.Product.CreatedBy = 1;
        
        this.productService.addeditProduct(this.Product).subscribe(
          res => {
            console.log(res.status);
            var status = res.status;
            if (status == 200) {
              this.productService.fileupload(uploadData).subscribe(
                res => {
                  var status = res.status;
                  if (status == 200) {
                    console.log('file uploaded');
                  }
                },
                err => {
                  this.toaster.Error('Something Went Wrong');
                }
              );
              this.toaster.Success("Product Added Successfully");
              this.router.navigate(["/product-list"]);
            } else {
              this.toaster.Error("Server Error!");
            }
          },
          err => {
            this.toaster.Error("Something Went Wrong");
          }
        );

      }

      this.filename[i] = file.name;
      i++;
    }
}
}
