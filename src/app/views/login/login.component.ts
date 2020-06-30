import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/Customer/customer.service';
import { ToasterService } from '../../services/toaster.service';
//import { CustomerService } from 'src/app/services/Customer/customer.service';
interface Assets {
  status: number;
  data: any;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private toaster: ToasterService,
  ) {
    // const serverURL = 'http://localhost:3000/webservice';
   // const serverURL = 'http://18.224.6.146:3000/webservice';
   const serverURL = 'http://service.onlyalibaba.in:3000/webservice';
    localStorage.setItem('ServerUrl', serverURL);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.customerService.Login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          // console.log(data.data[0][0]);
          console.log(data.data[0][0].FullName);
          localStorage.setItem('name', data.data[0][0].FullName);
          localStorage.setItem('id', data.data[0][0].UserId);
          localStorage.setItem('password', data.data[0][0].UserPassword);
          localStorage.setItem('username', data.data[0][0].UserName);
          localStorage.setItem('phone', data.data[0][0].Phone);
          localStorage.setItem('email', data.data[0][0].EmailId);
          this.router.navigate(['/dashboard']);
          this.toaster.Success("Login Successful");
        },
        error => {
          this.loading = false;
          this.toaster.Error("Login Failed");
        });
  }

}
