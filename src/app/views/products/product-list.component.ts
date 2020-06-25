import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/Product/product.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/Excel/excel.service';
import * as XLSX from 'ts-xlsx';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  data: any;
  formdata;
  uploadFile: File;
  loginchk;


  sampleExcelLink: any;
  boolValid: boolean;
  file: any;
  arrayBuffer: any;
  exceljsondata: any;
  constructor(private productService: ProductService,
    private excelService: ExcelService,
    private router: Router) {
  }

  ngOnInit() {
    this.getProducts();
  }

  search(productname: string , categoryname: string) {
    const product = {
      'category': categoryname,
      'name': productname,
      'page': '1',
      'size': '10'
     };
    this.productService.getProductList(product).subscribe(data => {
      this.data = data.data[0];
    });
  }

  getProducts() {
    const product = {
      'category': '',
      'name': '',
      'page': '1',
      'size': '10'
     };
    this.productService.getProductList(product).subscribe(data => {
      this.data = data.data[0];
    });
  }

  addProduct() {
    this.router.navigate(['/products-list/add']);
  }
  onDelete(id: any) {
    if (!confirm('Are You Sure ?')) {
      return;
    }

  }
  // Change Status
  onStatus(id: any, is_active: string) {
    if (!confirm('Are You Sure ?')) {
      return;
    }

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
