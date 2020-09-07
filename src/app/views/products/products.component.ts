import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute  } from "@angular/router";
import { Product } from '../../models/product';
import { ToasterService } from '../../services/toaster.service';
import { ProductService } from '../../services/Product/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  // ProductId: number, IsCombo: number, CategoryId: number, Name: string, ShortDescription: string, FullDescription: string, Pcs: number, StandardPrice: number,OldPrice: number,
  // Cost: number, CoverImage: string, CoverVideo: string, IsFeatured: number, IsShowOnHomePage: number, DisplayOrder: number = 0, MetaKeyWords: string, MetaDescription: string,
  // MetaTitle: string, Sku: string, IsFreeShipping: number, IsTaxExempt: number, TaxCategoryId: number, DisplayStockAvailability: number, DisplayStockQuantity: number,
  // NotReturnable: number, Weight: number, Length: number, Width: number, Height: number, ProductTags: string, Manufacturer: string, CreatedBy:number, Brand: string,
  // FoodType: string, HSNCode: string, RetailerId: number

  Product = new Product(null,"0",0,null,"","",1,null,null,null,null,null,null,"0","0",0,"","","",null,"0","0",0,"0","0","0",0,0,0,0,"","",null,null, null, null, 0, null);

  parentcategory: object;
  taxcategory: object;
  retailerlist: object;
  id: any = null;
  response: any;
  dlFile: any; vlFile: any;
  filename: any[];
  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService
    ) {
      this.route.paramMap.subscribe(res => {
        this.id = res.get("id");
      });
     }

  ngOnInit() {
    this.getChildCategories();
    this.getTaxCategories();
    this.getRetailers();
    if(this.id){
      this.getProduct();
    }
  }
  backpage() {
    this.router.navigate(['/products-list']);
  }
  getChildCategories(){
    this.productService.getChildCategories().subscribe(data => {
      this.parentcategory = data.data[0];
    });
  }
  getTaxCategories(){
    this.productService.getTaxCategories().subscribe(data => {
      this.taxcategory = data.data[0];
    });
  }
  getRetailers() {
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
    this.productService.getRetailer(retailer).subscribe(data => {
      this.retailerlist = data.data;
    });
  }
  onSubmit() {
    this.filename = [];
    var i = 0;
    if(this.dlFile!= undefined){
      for (let file of this.dlFile) {
        const uploadData = new FormData();
        if (file != undefined) {
          uploadData.append("myFile", file, file.name);
          this.Product.CoverImage = file.name;
          this.productService.fileupload(uploadData).subscribe(
            res => {
              var status = res.status;
              if (status == 200) {
                console.log('Cover Image uploaded. File name: ', this.Product.CoverImage);
              }
            },
            err => {
              this.toaster.Error('Something Went Wrong');
              this.Product.CoverImage = null;
              return;
            }
          );
        }

        this.filename[i] = file.name;
        i++;
      }
    }
    if (this.vlFile!=null){
      for (let file of this.vlFile) {
        const uploadData = new FormData();
        if (file != undefined) {
          uploadData.append("myFile", file, file.name);
        }
        this.Product.CoverVideo = file.name;
        this.productService.fileupload(uploadData).subscribe(
          res => {
            var status = res.status;
            if (status == 200) {
              console.log('Cover Video uploaded. Video name: ', this.Product.CoverVideo);
            }
          },
          err => {
            this.toaster.Error('Something Went Wrong');
            this.Product.CoverVideo = null;
            return;
          }
        );
      }
    }

    this.Product.CreatedBy = 1;
    this.Product.ProductId = this.id != null ? this.id : 0;
    this.productService.addeditProduct(this.Product).subscribe(
      res => {
        console.log(res.status);
        var status = res.status;
        if (status == 200) {
          if (this.Product.ProductId != null)
            this.toaster.Success("Product Updated Successfully");
          else
            this.toaster.Success("Product Inserted Successfully");
          this.router.navigate(["/products-list"]);
        } else {
          this.toaster.Error("Server Error!");
        }
      },
      err => {
        this.toaster.Error("Something Went Wrong");
      }
    );
  }
  messageDl: string; imgURL: any;
  uploadFileImage(event: any) {
    if (event.target.files.length === 0) return;

    this.dlFile = event.target.files;
    console.log(this.dlFile);    

    var mimeType = this.dlFile[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.messageDl = "Only images are supported.";
      return;
    }
    this.messageDl = "";
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      this.url = ""; 
    }
  }
  messageVl: string; vidURL: any;
  uploadFileVideo(event: any) {
    if (event.target.files.length === 0) return;

    this.vlFile = event.target.files;
    console.log(this.vlFile);

    var mimeType = this.vlFile[0].type;
    if (mimeType.match(/video\/*/) == null) {
      this.messageVl = "Only Video are supported.";
      return;
    }
    this.messageVl = "";
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.vidURL = reader.result; 
      this.url = ""; 
    }
  }
  url:any;
  getProduct(){
    this.productService.getProductbyid(this.id).subscribe(data => {
      console.log(data);
      this.Product = data.data[0];
      this.imgURL = this.Product.CoverImage != null ? this.Product.CoverImage : "";
      this.vidURL = this.Product.CoverImage != null ? this.Product.CoverVideo : "";
      this.url = data.imgurl; 
      console.log(this.Product);
    });
  }
   validateForm(){
     if (this.Product.CategoryId == null || this.Product.CategoryId == 0) return true;
     if (this.Product.Name == null || this.Product.Name == "") return true;
     if (this.Product.Sku == null || this.Product.Sku == "") return true;
     if (this.Product.Brand == null || this.Product.Brand == "") return true;
     if (this.Product.Manufacturer == null || this.Product.Manufacturer == "") return true;
     if (this.Product.TaxCategoryId == null || this.Product.TaxCategoryId == 0) return true;
     if (this.Product.Cost == null || this.Product.Cost == 0) return true;
     if (this.Product.StandardPrice == null || this.Product.StandardPrice == 0) return true;
     if (this.Product.DiscountedPrice == null || this.Product.DiscountedPrice == 0) {
      if (this.Product.StandardPrice != null && this.Product.StandardPrice != 0){
        this.Product.DiscountedPrice = this.Product.StandardPrice;
      }
      else
        return true;
     }
     if (this.Product.Pcs == null || this.Product.Pcs == 0) return true;
     if (this.Product.FoodType == null || this.Product.FoodType == "") return true;
     if (this.Product.HSNCode == null || this.Product.HSNCode == "") return true;
     if (this.Product.RetailerId == null || this.Product.RetailerId == 0) return true;
    if (this.dlFile!= undefined && this.messageDl!="") return true;
    if (this.vlFile!= undefined && this.messageVl!="") return true;
   }
}
