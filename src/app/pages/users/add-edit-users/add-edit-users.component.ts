import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UsersService } from 'src/app/services/users.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router,ActivatedRoute } from '@angular/router';
import { first } from 'lodash';
@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.scss']
})
export class AddEditUsersComponent implements OnInit {
  validateForm!: FormGroup;
  userId:string=undefined;
  isAgentVal:string='agent';

  constructor(private fb: FormBuilder,private user:UsersService,private message:NzMessageService,private route:Router,private activeroute:ActivatedRoute) { 
    this.activeroute.paramMap.subscribe((res) => {
      this.userId = res.get("id");
      console.log(this.userId);
    });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email:[null,[Validators.required,Validators.email]],
      phone: [null, [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      isAgent:[null,[Validators.required]],
      currencyType:[null,[Validators.required]],
      openingBalance:[null,[Validators.required]],
      creditLimit:[null,[Validators.required]],
      exposure:[null,[Validators.required]],
      masterPassword:[null,[Validators.required]]
    });
    if(this.userId){
      this.getUserbyId();
    }
  }

  
  submitForm(): void {
    if (this.validateForm.valid) {
      let obj={...this.validateForm.value,isAgent:(this.validateForm.value.isAgent==='user'?false:true)}
      if(!this.userId){
        console.log('submit', obj);
      this.user.addUser(obj).subscribe((res)=>{
        console.log(res);
        this.message.success(res.message);
       this.route.navigate(["users"])
      })   
      }
      else if(this.userId){
        console.log('edit',obj)
        this.user.updateUser(this.userId,obj).subscribe((res)=>{
        this.message.success(res.message);
        this.route.navigate(["users"])
        })
      }
      
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  getUserbyId(){
    this.user.getUser(this.userId).subscribe((res)=>{
      let obj={...res[0],isAgent:(res[0].isAgent===false?'user':'agent')};
      this.isAgentVal=obj.isAgent;
      this.validateForm.patchValue(obj);
      
    })
  }
 

}
