import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CmsService } from '../../services/Cms/cms.service';
import { ToasterService } from '../../services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss', '../../../../node_modules/quill/dist/quill.snow.css'],
  encapsulation: ViewEncapsulation.None
})
export class CmsComponent implements OnInit {
  data: any;
  CmsId: any = '';
  IsActive: string = '';
  ModifiedBy: number = 1;
  editorActivate = false;
  content: any = '';
  ContentLongText: any = '';


  constructor(private cmsService: CmsService, private toaster: ToasterService, private router: Router) { }

  ngOnInit() {
    this.cmsService.getCms().subscribe(data => {
      this.data = data.data;
      console.log(this.data);
    })

  }



  getCmsById() {
    let id = {CmsId: this.CmsId}
    console.log(id);
    this.cmsService.getCmsById(id).subscribe(data => {
      this.data = data.data;
      if (id.CmsId == '') {
        this.cmsService.getCms().subscribe(data => {
          this.data = data.data;

        })
      }
    })

  }

  activateEditor(id: any) {
    this.router.navigate(['/cms/', id])

  }



  editCms() {
    console.log('edit');
    this.cmsService.getCms().subscribe(data => {
      this.data = data.data;
      let editData = {
        CmsId: data.data[0].CmsId,
        ContentLongText: this.ContentLongText,

      }
    })


  }



}
