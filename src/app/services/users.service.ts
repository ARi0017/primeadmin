import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IRole } from "../model/common.model";
import { User } from "../model/user.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  baseUrl = environment;
  constructor(private http: HttpClient) {}

  //Get user list
  userList() {
    return this.http.get<any>(
      `${this.baseUrl.serviceUrl}/users/user-list`
    );
  }

  //Get agent list
  agentList() {
    return this.http.get<any>(
      `${this.baseUrl.serviceUrl}/users/agent-list`
    );
  }
  //Get current Agent details
  agentDetail(){
    return this.http.get<any>(
      `${this.baseUrl.serviceUrl}/users/details`
    );
  }

  //Update status of user
  updateStatus(id: string) {
    return this.http.put<{ message: string }>(
      `${this.baseUrl.serviceUrl}/users/update-status/${id}`,
      {}
    );
  }

  //validate email
  checkEmail(email: string) {
    let params = new HttpParams().append("email", email);

    return this.http.get<{ message: string }>(
      `${this.baseUrl.serviceUrl}/users/check-email`,
      { params }
    );
  }

  //Validate Phone Number
  checkPhone(phone: string) {
    let params = new HttpParams().append("phone", phone);

    return this.http.get<{ message: string }>(
      `${this.baseUrl.serviceUrl}/users/check-phone`,
      { params }
    );
  }

  //Add a new user
  addUser(user: any) {
   console.log(user)
    return this.http.post<any>(
      `${this.baseUrl.serviceUrl}/users/register`,
       user 
    );
  }

  //Get user by its id
  getUser(id: string) {
    return this.http.get<User>(`${this.baseUrl.serviceUrl}/users/user/${id}`);
  }

  //Update user
  updateUser(id: string, user: User) {
    return this.http.put<{ message: string }>(
      `${this.baseUrl.serviceUrl}/users/${id}`,
      { user }
    );
  }

  //Delete user
  deleteUser(id: string) {
    return this.http.delete<{ message: string }>(
      `${this.baseUrl.serviceUrl}/users/${id}`
    );
  }

  //Role Services
  getRole(pageIndex: number, pageSize: number, sort: string) {
    let params = new HttpParams()
      .append("pageIndex", `${pageIndex}`)
      .append("pageSize", `${pageSize}`)
      .append("sort", `${sort}`);
    return this.http.get<{ role: IRole[]; count: number }>(
      `${this.baseUrl.serviceUrl}/roles`,
      { params }
    );
  }

  //Get all role list
  getRoleList() {
    return this.http.get<{ role: { name: string; _id: string }[] }>(
      `${this.baseUrl.serviceUrl}/roles/list`
    );
  }

  //Get role by its id
  getRolebyId(id: string) {
    return this.http.get<IRole>(`${this.baseUrl.serviceUrl}/roles/${id}`);
  }

  //Add a new role
  addRole(role: object) {
    return this.http.post<{ message: string }>(
      `${this.baseUrl.serviceUrl}/roles`,
      role
    );
  }

  //Update a role
  updateRole(role: object, id: string) {
    return this.http.put<{ message: string }>(
      `${this.baseUrl.serviceUrl}/roles/${id}`,
      role
    );
  }

  //Update a role status 
  updateRoleStatus(id: string) {
    return this.http.put<{ message: string }>(
      `${this.baseUrl.serviceUrl}/roles/update-status/${id}`,
      {}
    );
  }

  //Delete a role
  deleteRole(id: string) {
    return this.http.delete<{ message: string }>(
      `${this.baseUrl.serviceUrl}/roles/${id}`,
      {}
    );
  }
}
