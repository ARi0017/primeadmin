import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UsersService } from 'src/app/services/users.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.scss']
})
export class AddEditUsersComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,private user:UsersService,private message:NzMessageService,private route:Router) { }

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
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.user.addUser(this.validateForm.value).subscribe((res)=>{
        console.log(res);
        this.message.success(res.message);
       this.route.navigate(["users"])
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
