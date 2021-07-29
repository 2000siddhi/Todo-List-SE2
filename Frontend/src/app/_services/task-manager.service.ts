import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject } from 'rxjs';
import { AddTask } from '../_models/task-models/add-task.model';
import { TaskGeneric } from '../_models/task-models/task-generic-model';
import { User } from '../_models/user.model';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  private baseUrl:string="https://localhost:44380/api/ProjectTasks/";
  //createBy=new EventEmitter<TaskCreatedBy[]>();
  users= new ReplaySubject<User[]>(1);
  currentEditTask = new Subject<number>();

  constructor(private http:HttpClient,private accountService:AccountService,private toastr:ToastrService) { 
   
  }
  ngOnInit() {
    
  }
 
  getCreatedBy(email:string){
     return this.http.get<TaskGeneric[]>(this.baseUrl+"createdBy",{
      params:{
        email:email
      }
    });
  }

  getAssignedTo(email:string){
     return this.http.get<TaskGeneric[]>(this.baseUrl+"assignedTo",{
      params:{
        email:email
      }
    });
  }

  getAllUsers(){
    this.http.get<User[]>(this.baseUrl + "allUsers").subscribe(
      (responseUsers)=>{
        this.users.next(responseUsers);
      }
    );
  }

  addNewTask(task:AddTask)
  {
    this.http.post(this.baseUrl+"createTask",task,{
      responseType:"text"
    }).subscribe(
      (res)=>{
        //console.log(JSON.parse(res));
        this.toastr.success("Task Added successfully");
        window.location.reload();
      },
      (err)=>{
        ;
        
      }
    )
  }

  editTask(task: AddTask, taskId: number)
  {
    this.http.post(this.baseUrl+`editTask?id=${taskId}`,task,{
      responseType:"text"
    }).subscribe(
      (res)=>{
        //console.log(JSON.parse(res));
        this.toastr.success(res,"Task Edited successfully");
        window.location.reload();
      },
      (err)=>{
        ;
        
      }
    )
  }

  deleteTask(id:number)
  {
    this.http.delete(`${this.baseUrl}${id}`,{
      responseType:"text"
    }).subscribe(
      (res)=>{
        //console.log(JSON.parse(res));
        this.toastr.success(res,"Task Deleted successfully");
        window.location.reload();
      }, 
      (err)=>{
        ;
      }
    )
  }

  changeStatus(task: AddTask, id: number)
  {
    console.log("in change task");

    console.log(task);
    this.http.put(this.baseUrl+`changeStatus?id=${id}`,task,{
      responseType:"json"
    }).subscribe(
      (res)=>{
        //console.log(JSON.parse(res));
        this.toastr.success("Task chage Edited successfully");
        window.location.reload();
      },
      (err)=>{
        ;
        
      }
    )
  }
}
