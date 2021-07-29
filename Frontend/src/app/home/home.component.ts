import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { TaskManagerService } from '../_services/task-manager.service';
import {map} from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router';
import { TaskGeneric } from '../_models/task-models/task-generic-model';
import { User } from '../_models/user.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  createdBy:TaskGeneric[]=[];
  assignedTo: TaskGeneric[]=[];
  userName:string;
  email:string;
  constructor(private route:ActivatedRoute,private router:Router,private accountService:AccountService,private TMService:TaskManagerService) { }

  ngOnInit(): void {
    
    this.accountService.currentUser$.subscribe((user)=>{
      if(user){
      this.userName=user.firstName;
      this.email=user.email
      }
    
    })
    this.TMService.getCreatedBy(this.email)
    .pipe(map(
      (tasks)=>tasks.slice(0,4)
    ))
    .subscribe(
      tasks=> {
        tasks.map((task) => {
          this.accountService.getUserById(task.assignee)
          .subscribe((data: User) => {
            task.assigneeName = data.firstName;
          })
        })
        this.createdBy=tasks;
      }
    );

    this.TMService.getAssignedTo(this.email)
    .pipe(map(
      (tasks)=>tasks.slice(0,4)
    ))
    .subscribe(
      tasks=> {
        tasks.map((task) => {
          this.accountService.getUserById(task.createdBy)
          .subscribe((data: User) => {
            task.createdByName = data.firstName;
          })
        })
        this.assignedTo=tasks;
      }
    );
   
  }

  toTask(id:number){
    this.router.navigate(['../tasks',id],{relativeTo:this.route});
  }
  
  toAssignedTask(id:number){
    this.router.navigate(['../viewassigned',id],{relativeTo:this.route});
  }
  
}
