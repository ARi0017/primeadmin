import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/Product/product.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/Excel/excel.service';
import * as XLSX from 'ts-xlsx';
import { CategoryService } from '../../services/Category/category.service';
import { ToasterService } from '../../services/toaster.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    selectedproductname: any;
    selectedcategoryname:any;
  data: any;
  formdata;
  uploadFile: File;
  loginchk;
  page: number = 1;
  count: number;
  ProductId: any='';
  IsActive:any ='';
  name: any='';
  url: string;
  sampleExcelLink: any;
  boolValid: boolean;
  file: any;
  arrayBuffer: any;
  exceljsondata: any;
  catdata: any;
  categoryid: any='';
  PageSize:number=10;
  
  constructor(private categoryService: CategoryService,private productService: ProductService,
    private excelService: ExcelService,
    private toaster: ToasterService,
    private router: Router) {
  }

  ngOnInit() {
    this.getProducts(this.page);
    this.getCategories();
  }

  getProducts(page: number) {
    let Product = {categoryid: this.categoryid != "" ? this.categoryid : "0", name: this.name, page: page, Size: this.PageSize};
    this.productService.getProductList(Product).subscribe(data => {
      this.data = data.data[0];
      this.url = data.imgurl;
      this.count = (Object.keys(this.data).length > 0) ? this.data[0].RowCount : 0;
      console.log("Total Data Count",this.count);
    });
  }
  getPagination(page: number){
    this.page = page;
    this.getProducts(this.page );
  }

  getCategories() {
    this.productService.getChildCategories().subscribe(data => {
      this.catdata = data.data[0];
      console.log(this.catdata);
    });
  }
  addProduct() {
    this.router.navigate(['/products-list/add']);
  }
  onDelete(id: any) {
    if (!confirm('Are You Sure ?')) {
      return;
    }
    this.productService.deleteProduct(id).subscribe(data => {
      //  this.data = data.data[0];
        if (data.status == 200) {
          this.toaster.Success("Product Deleted Successfully");
                this.router.navigate(["/products-list"]);
        }
      });
  }
  
  onStatus(id: any, is_active: any) {   
    if (!confirm('Are You Sure ?')) {
      return;
    }
    this.ProductId = id;
    this.IsActive = is_active;
    const prostatus = {
      'ProductId': this.ProductId,
      'IsActive': this.IsActive,
      'CreatedBy': '1'
     };
    this.productService.statusChange(prostatus).subscribe(data => {
      this.data = data.data[0];
      if (data.status == 200) {
        this.toaster.Success("Product Status Updated Successfully");
        this.getProducts(this.page );
      }
    });
  }
  onFileChanged(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
     }
     const fileReader = new FileReader();
     fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
     // console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));

this.exceljsondata = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        console.log(this.exceljsondata);
         this.excelService.excelImport(this.exceljsondata).subscribe(data=>{
          console.log(data);
         })
     }
     fileReader.readAsArrayBuffer(this.file);
  }

}
