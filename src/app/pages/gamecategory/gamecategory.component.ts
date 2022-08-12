import { Component, OnInit } from '@angular/core';
import { GamecategoryService } from 'src/app/services/gamecategory.service';
import { values } from 'lodash';

@Component({
  selector: 'app-gamecategory',
  templateUrl: './gamecategory.component.html',
  styleUrls: ['./gamecategory.component.scss']
})
export class GamecategoryComponent implements OnInit {
  allCategoryList:any[];
  allCategory:any;

  constructor(private gamecategory:GamecategoryService) { }

  ngOnInit(): void {
    this.allGameCategoryList();
  }


  // allGameCategoryList(){
  //   this.gamecategory.categoryList().subscribe((res)=>{
  //     console.log(res.data);
  //     this.gamecategory=res.data;
  //     this.allGameCategoryListArray=res.data;
  //     this.allCategory=res.data.length;
  // };
  allGameCategoryList(){
    // this.pendingLoading=true;
    this.gamecategory.categoryList().subscribe((res)=>{
      console.log('getlist',res.data);
      this.allCategoryList=res.data;
      // this.pendingLoading=false;
    })
  };
  

}
