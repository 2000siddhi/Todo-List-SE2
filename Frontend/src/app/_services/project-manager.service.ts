import { HttpClient } from '@angular/common/http';
import { Injectable,EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject } from 'rxjs';
import { Project } from '../_models/project.model';
import { AddTask } from '../_models/task-models/add-task.model';
import { TaskGeneric } from '../_models/task-models/task-generic-model';
import { User } from '../_models/user.model';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {
  private baseUrl:string="https://localhost:44380/api/Projects/";
  //createBy=new EventEmitter<TaskCreatedBy[]>();
  users= new ReplaySubject<User[]>(1);
  currentEditTask = new Subject<number>();
  

  constructor(private http:HttpClient,private accountService:AccountService,private toastr:ToastrService) { 
   
  }
  ngOnInit() {
    
  }

  getAllProjects() {
    return this.http.get(this.baseUrl);
  }

  addNewProject(project: Project)
  {
    this.http.post(this.baseUrl, {
      name: project.name
    }, {
      responseType:"json"
    }).subscribe(
      (res)=>{
        //console.log(JSON.parse(res));
        this.toastr.success(`Project ${project.name} Added Successfully!`);
        window.location.reload();
      },
      (err)=>{
        console.log(err);
        
      }
    )
  }

  editProject(project: Project, projectId: number)
  {
    this.http.put(this.baseUrl+projectId, project,{
      responseType: "json"
    }).subscribe(
      (res)=>{
        //console.log(JSON.parse(res));
        this.toastr.success("Project Edited Successfully!");
      },
      (err)=>{
        console.log(err);
        
      }
    )
  }

  deleteProject(id:number)
  {
    this.http.delete(this.baseUrl+id,{
      responseType:"json"
    }).subscribe(
      (res)=>{
        //console.log(JSON.parse(res));
        this.toastr.success("Project Deleted successfully");
      //  setTimeout(function(){
      //   this.toastr.success("Deleted User successfully");
      // },3000);
       window.location.reload();
      },
      (err)=>{
        console.log(err);
        this.toastr.warning("Task is assigned to project ,You cannot delete this project!");
      }
    )
  }
}
