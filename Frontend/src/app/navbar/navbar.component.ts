import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name:string;
  constructor(public accountService:AccountService, private router:Router) { 
    
  }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user)=>{
      if(user)
      this.name=user.firstName+" "+user.lastName;
     //console.log(user);
    });
  }

}
