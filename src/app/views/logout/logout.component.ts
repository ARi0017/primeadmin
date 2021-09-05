import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: `
    Logout Successful
  `
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
   // console.log("hi");
    localStorage.removeItem('loginchk');
    localStorage.clear();
    this.router.navigate(['']);
  }
}
