import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserBankingService } from 'src/app/services/user-banking.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-createrequest',
  templateUrl: './createrequest.component.html',
  styleUrls: ['./createrequest.component.scss']
})
export class CreaterequestComponent implements OnInit {
  user={transactionType:null,amount:null,remarks:''}
  validateForm!: FormGroup;

  constructor( private fb: FormBuilder,private userbankingservice:UserBankingService,private message:NzMessageService,private route:Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      transactionType: [null, [Validators.required]],
      amount:[null,[Validators.required,]],
      remarks: [null, [Validators.required]],
    });
  }

  // requestSubmit(form:NgForm){
  //   let data={...form.value,transactionType:Number(form.value.transactionType)}
  //   this.userbankingservice.addRequest(data).subscribe((res)=>{
  //     console.log(res)
  //     // this.visible=!this.visible;
  //     form.resetForm();
  //   })
  //   console.log(data);
  // }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.userbankingservice.addRequest(this.validateForm.value).subscribe((res)=>{
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
