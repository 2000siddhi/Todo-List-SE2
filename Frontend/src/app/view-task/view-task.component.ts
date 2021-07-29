import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Project } from '../_models/project.model';
import { AddTask } from '../_models/task-models/add-task.model';
import { TaskGeneric } from '../_models/task-models/task-generic-model';
import { User } from '../_models/user.model';
import { AccountService } from '../_services/account.service';
import { ProjectManagerService } from '../_services/project-manager.service';
import { TaskManagerService } from '../_services/task-manager.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  users:User[];
  projects: Project[];
  subsc:Subscription;
  taskName: string;
  taskDescription : string;
  scheduledDate: string;
  assigneeId: number;
  assignee: string;
  endDate: string;
  priority: number;
  project: number;
  status:number;


  @Input()
  task: TaskGeneric;

  @Input()
  isEdit: Boolean;

  @ViewChild('addTaskForm')addTaskForm:NgForm;
  constructor(
    private taskManagerService:TaskManagerService, 
    private accountService:AccountService,
    private projectService: ProjectManagerService) { }
 

  ngOnInit():void {
   this.subsc= this.taskManagerService.users.subscribe(u =>{console.log("Users are: "+u); this.users=u});
   this.projectService.getAllProjects().subscribe((projects: Project[]) => this.projects = projects);
  }

  ngOnChanges(): void {
    if(this.task != null) {
      console.log(this.task);
      this.taskName = this.task.name;
      this.taskDescription = this.task.description;
      this.scheduledDate = this.task.scheduledDate.toString().split("T")[0];
      this.endDate = this.task.endDate.toString().split("T")[0];
      this.priority = this.task.priority;
      // this.status = this.task.status;
      this.accountService.getUserById(this.task.assignee).subscribe((data: User) => {
        this.assignee = data.email;
      })
      this.project = this.task.projectId ? this.task.projectId : -1;
    }
  }

  ngOnDestroy(){
   
    this.subsc.unsubscribe();
   
  }
 
  processTask(){
    let user;
    this.accountService.currentUser$.subscribe(u => user=u);
    console.log(this.addTaskForm);
    var task = new AddTask({
      taskName:this.addTaskForm.value.taskName,
      description:this.addTaskForm.value.taskDescription,
      assigneeEmail:this.assignee,
      scheduledDate:this.addTaskForm.value.scheduledDate,
      endDate:this.addTaskForm.value.endDate,
      priority: this.priority,
      status: this.status,
      createdByEmail: user.email,
      projectId: this.addTaskForm.value.project == -1 ? null : this.addTaskForm.value.project
    });
    console.log(task);
    if (this.isEdit)
      this.taskManagerService.changeStatus(task, this.task.id);
    else 
      this.taskManagerService.addNewTask(task);
  }
}
