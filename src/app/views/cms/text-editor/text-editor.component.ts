import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../../services/toaster.service';
import { CmsService } from '../../../services/Cms/cms.service';
import { QuillModule } from 'ngx-quill';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import { Content } from '@angular/compiler/src/render3/r3_ast';


interface HttpParameterCodec  {
  encodeKey(key: string): string
  encodeValue(value: string): string
}

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['../../../../../node_modules/quill/dist/quill.snow.css'],
  encapsulation: ViewEncapsulation.None
})
export class TextEditorComponent implements OnInit, HttpParameterCodec {

  ContentLongText: any = ''
  CmsId: any = '';
  IsActive: number;
  ModifiedBy: number = 1;
  array =  []

  quillEditorRef;
  MaxUploadFileSize = 1000000;

  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }


  getEditorInstance(editorInstance: any) {
    console.log(editorInstance)
    this.quillEditorRef = editorInstance;
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler);
  }


  imageHandler = (image, callback) => {
    const input = <HTMLInputElement> document.getElementById('fileInputField');
    document.getElementById('fileInputField').onchange = () => {
      let file: File;
      file = input.files[0];
      // file type is only image.
      if (/^image\//.test(file.type)) {
        if (file.size > this.MaxUploadFileSize) {
          alert('Image needs to be less than 1MB');
        } else {
          const reader  = new FileReader();
          reader.onload = () =>  {
            const range = this.quillEditorRef.getSelection();
            console.log(reader.result);
            this.cmsService.updateImage({"myFile": reader.result}).subscribe(res => {
              const img = res.data ;

              var obj = {}
              obj["response"] = res.data;
              this.array.push(obj);
              console.log(this.array)


              this.quillEditorRef.clipboard.dangerouslyPasteHTML(range.index, img);


            })

          };
          reader.readAsDataURL(file);
        }
      } else {
          alert('You could only upload images.');
      }
    };

    input.click();
  }

  getContent(event: any){
    this.ContentLongText = event.html;
  }




  constructor(private route: Router, private toaster: ToasterService, private router: ActivatedRoute, private cmsService: CmsService) {
    this.router.paramMap.subscribe(res => {
      this.CmsId = res.get("id");
      console.log('id',this.CmsId)
    });


  }

  ngOnInit() {
    if(this.CmsId) {
      this.getCms()
    }
  }

  getCms() {
    this.cmsService.getCmsById({"CmsId":this.CmsId}).subscribe(res => {
      this.CmsId = res.data[0].CmsId;
      this.ContentLongText = res.data[0].Content;
      this.IsActive = res.data[0].IsActive;
    })
  }

  editCms() {
    const editData = {

        "CmsId": this.CmsId,
        "ContentLongText": this.ContentLongText,
        "ModifiedBy": 1

    }
    if (this.ContentLongText === undefined) {
      console.log('data return',this.array[0].response)
      let imgUrl = this.array[0].response.toString();
      editData["ContentLongText"] = this.ContentLongText
      console.log('file data', editData)
      this.cmsService.updateCms(editData).subscribe(res => {
        console.log(editData)
        console.log(res)
        let status = res.status;
         if (status == 200) {
          this.toaster.Success('Updated Successfully')
          this.array.length = 0;
        }
        else {
          this.toaster.Error('Server Error!');
        }
      },
      err => {
        this.toaster.Error('Something went wrong!');
      }
      )

    } else if (this.ContentLongText !== undefined && this.array.length > 0 ){

      console.log('final', this.ContentLongText);
      editData["ContentLongText"] = this.ContentLongText
      this.cmsService.updateCms(editData).subscribe(res => {
        console.log(editData)
        let status = res.status;
        if (status == 200) {
          this.toaster.Success('Updated Successfully')
          this.array.length = 0;
          console.log(this.array)
        }
        else {
          this.toaster.Error('Server Error!');
        }
      },
      err => {
        this.toaster.Error('Something went wrong!');
      }
      )
    }
     else {
      editData["ContentLongText"] = this.ContentLongText
      this.cmsService.updateCms(editData).subscribe(res => {

        console.log(editData)
        console.log(res)
        let status = res.status;
        if (status == 200) {
          this.toaster.Success('Updated Successfully')
        }
        else {
          this.toaster.Error('Server Error!');
        }
      },
      err => {
        this.toaster.Error('Something went wrong!');
      }
      )
    }


  }



  onReset() {
    this.ContentLongText = '';
  }

}
