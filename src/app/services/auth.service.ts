import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import jwt_decode from "jwt-decode";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url = environment;
 // ipAddr: string;
  constructor(private http: HttpClient, private router: Router) {}

  //Login to admin
  Login(email: string, password: string): any {
    return this.http.post<any>(
      `${this.url.serviceUrl}/users/auth`, 
      {
        username: email,
        password: password,
      },
      { 
        observe: "response"
      }
    );
  }
  //Forgot password request by email
  ForgotPassword(email:string){
    return this.http.post<any>(`${this.url.serviceUrl}/users/forgot-password`,{
      email:email
    })
  };

  //Verify with otp for forgot password
  verifyForgotOtp(email:string,otp:number){
    return this.http.post<any>(`${this.url.serviceUrl}/users/varify/otp`,{
      email:email,
      otp:otp
    })
  };

  //Verify otp in time of login
  verifyOtp(otp: number, email: string) {
    return this.http.post<any>(
      `${this.url.serviceUrl}/users/validate-otp`,
      { email: email, otp: otp },
      { observe: "response" }
    );
  }

  //Resend otp 
  resendOtp(email: string) {
    return this.http.post<any>(`${this.url.serviceUrl}/users/resend-otp`, {
      email: email,
    });
  }

  //Store login token into local-Storage
  loggedIn() {
    return !!localStorage.getItem("token");
  }

  //Delete token in of log-out and nevigate to login page
  logoutUser() {
    localStorage.removeItem("token");
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  //Reset password when password is out-dated
  resetPassword(email: string, oldPassword: string, newPassword: string) {
    return this.http.put<{ message: string }>(
      `${this.url.serviceUrl}/users/change/password`,
      {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      }
    );
  }

  //Reset password in case of forgot-password request
  resetForgotPassword(email:string,newPassword:string){
    return this.http.put<any>(`${this.url.serviceUrl}/users/reset/admin/password`,{
      email:email,
      newPassword:newPassword
    });
  }

  //Get login token from local-storage
  getToken() {
    return localStorage.getItem("token");
  }

  //Get user role by decoding login token
  getUserRole() {
    var roleToken = this.getToken();
    return jwt_decode(roleToken);
  }

  // //Fetch user Ip 
  // fetchUserIp() {
  //   return this.http.get<{ ip: string }>("https://api.ipify.org/?format=json");
  // }

  // //Get user Ip from local-storage
  // getUserIp() {
  //   return localStorage.getItem("userIp");
  // }
}
