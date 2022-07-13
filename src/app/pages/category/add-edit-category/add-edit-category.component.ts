import { Component, OnInit } from "@angular/core";
import { Category } from 'src/app/model/category.model';


import { CategoryService } from "src/app/services/category.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/services/auth.service";
import { CommonComponent } from "../../common/common.component";
import { TranslateService } from "@ngx-translate/core";

import { NzUploadFile } from "ng-zorro-antd/upload";


@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent extends CommonComponent implements OnInit {
  categoryId: string = undefined;
  category: Category = new Category();
  fileList: NzUploadFile[] = [];
  loading: Boolean = false;

  constructor(
    private categoryService: CategoryService,
    router: Router,
    auth: AuthService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.route.paramMap.subscribe((res) => {
      this.categoryId = res.get("id");
    });
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }

  
  ngOnInit(): void {
    if(Boolean(this.categoryId)) {
      this.getCategoryById();
    }
  }

  

  async addCategory(): Promise<void> {
    this.loading = true;
    this.category.coverImage = undefined;

    if(this.fileList.length == 1) {
      this.category.coverImage =  await this.getBase64(this.fileList[0]);
      this.fileList = [];
    } else {
      this.message.error("Please select cover image");
      this.loading = false;
      return;
    }

    this.category.isFeatured = this.category.isFeatured ? "1" : "0";
    this.category.isTopMenu = this.category.isTopMenu ? "1" : "0";
    //console.log(this.category);
    this.categoryService.addCategory(this.category)
      .subscribe((res) => {
        this.message.success(res.message);
        this.loading = false;
        this.router.navigate(["categories"]);
      });
    
  }

  getCategoryById(): void {
    this.categoryService.getCategoryById(this.categoryId)
      .subscribe((res)=> {
        this.category = res.data;
        this.category.isFeatured = Boolean(Number(this.category.isFeatured));
        this.category.isTopMenu = Boolean(Number(this.category.isTopMenu));
      });
  }


  async editCategory(): Promise<void> {
    this.loading = true;
    this.category.coverImage = undefined;

    if(this.fileList.length == 1) {
      this.category.coverImage = await this.getBase64(this.fileList[0]);
      this.fileList = [];
    }
    
    // this.category.softDelete = undefined;
    // this.category.createdDate = undefined;
    // this.category.createdBy = undefined;
    // this.category.modifiedDate = undefined;
    // this.category.modifiedBy = undefined;
    this.category.isFeatured = this.category.isFeatured ? "1" : "0";
    this.category.isTopMenu = this.category.isTopMenu ? "1" : "0";
    //console.log(this.category);
    this.categoryService.updateCategory(this.categoryId, this.category)
      .subscribe((res) => {
        this.message.success(res.message);
        this.loading = false;
        this.router.navigate(["categories"]);
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