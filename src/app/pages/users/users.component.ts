import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
interface user{
  availableBalance: number
  createdDate: string
  creditLimit: number
  currencyType: string
  email: string
  exposure: number
  id: string
  isActive: boolean
  isAgent: boolean
  name: string
  openingBalance: number
  phone: string
  username: string
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList:user[]=[];
  agentList:user[]=[];
  loading:boolean=false;
  totalUser:number;
  agentLoading:boolean=false;
  totalAgent:number;
  agentDetailLoading:boolean=false;
  agentDetailArr:any=[];

  constructor(private user:UsersService) { }

  ngOnInit(): void {
    this.getUserList();
    this.getAgentList();
    this.getCurrentUserDetail();
  }

  getUserList(){
    this.loading=true;
    this.user.userList().subscribe((res)=>{
      console.log(res.data);
      this.userList=res.data;
      this.totalUser=res.data.length;
      this.loading=false;
    })
  }

  getAgentList(){
    this.agentLoading=true;
    this.user.agentList().subscribe((res)=>{
      console.log(res.data);
      this.agentList=res.data;
      this.totalAgent=res.data.length;
      this.agentLoading=false;
    })
  }

  getCurrentUserDetail(){
    this.agentDetailLoading=true;
    this.user.agentDetail().subscribe((res)=>{
      console.log(res);
      this.agentDetailArr=res;
      this.agentDetailLoading=false;
    })
  }
  
  // User Delete

  userDelete(id:any){
    console.log(id);
    this.user.deleteUser(id).subscribe((res)=>{
      console.log(res);
      this.ngOnInit();
    })
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }


}
