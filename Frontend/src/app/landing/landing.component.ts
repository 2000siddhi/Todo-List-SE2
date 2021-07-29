import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  username:string;
  password:string;
  rUsername: string;
  rPassword: string;
  firstName: string;
  lastName: string;
  contact: number;
  address: string;
  city: string;
  zip: string;
  state: string;
  country: string;

  name:string;
  constructor(public accountService:AccountService,private router:Router) { }


  isLogin = true;
  isRegister = false;

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user)=>{
      if(user)
      this.name=user.firstName+" "+user.lastName;
     //console.log(user);
    });
  }
   onLogin(){
   this.accountService.login(this.username, this.password);
  }
  onRegister() {
    this.accountService.register(
      this.rUsername,
      this.rPassword,
      this.firstName,
      this.lastName,
      this.contact,
      this.address,
      this.city,
      this.state,
      this.zip,
      this.country
    );
  }

  onRegisterClick() {
    console.log("Move to Register!");
    this.isLogin = false;
    this.isRegister = true;
  }

  onLoginClick() {
    console.log("Move to Login!");
    this.isLogin = true;
    this.isRegister = false;
  }

}
