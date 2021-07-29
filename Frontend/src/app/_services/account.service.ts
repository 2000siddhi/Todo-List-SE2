import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject } from 'rxjs';
import { Login } from '../_models/login.model';
import { User } from '../_models/user.model';
import {map} from "rxjs/operators"
import { Register } from '../_models/register.model';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl:string="https://localhost:44380/api/Users/"
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();  
  constructor(private http:HttpClient,private toastr:ToastrService,private router:Router) { }

  login(username:string,password:string){
    this.http.post(this.baseUrl+"login",new Login(username,password)).pipe(
      map(
        (user:User)=>{
          this.currentUserSource.next(new User(user));
          localStorage.setItem('user',JSON.stringify(user)); 
        }
      )
    ).subscribe(
      (response)=>{
         this.router.navigate(['home']);
    },
      (error)=>{
        ;
        this.toastr.error(error.error);
      }
      );
  }

  register(username: string, password: string, fName: string, lName: string,
          contact: number, address: string, city: string, state: string, 
          zip: string, country: string){
      this.http.post(
        this.baseUrl, 
        new Register(username, password, fName, lName, contact, address, city, state, zip, country))
        // .pipe(
        //   map(
        //     (user:User)=>{
        //       this.currentUserSource.next(new User(user));
        //       localStorage.setItem('user',JSON.stringify(user)); 
        //     }
        //   )
        // )
        .subscribe(
          (response)=>{
            console.log(response);
            this.toastr.success("Registered Successfully! Please Log in )")
            this.router.navigate(['landing']);
          },
          (error)=>{
            ;
            this.toastr.error(error.error);
          }
        );
  }

  logout(){
    localStorage.setItem('user',null);
    this.currentUserSource.next(null);
    this.router.navigate(['']);

  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user);
    
  }

  getUserById(userId: number) {
    return this.http.get(this.baseUrl + userId);
  }
}
